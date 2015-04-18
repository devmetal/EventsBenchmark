/**
 * Created by AdiReka on 2015.04.18..
 */
var app = require('express')();
var server = require('http').Server(app);
var io  = require('socket.io')(server);
var Suite = require('./bench');

server.listen(5051,function(){
    console.log('App listening on 5051');
});

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    console.log('User Connected!');

    Suite().then(function(suite){
        socket.emit('ready');
        console.log('Suite is ready');

        suite.on('cycle',function(event){
            socket.emit('cycle',{msg:String(event.target)});
            console.log(String(event.target));
        });

        suite.on('complete',function(){
            socket.emit('complete',{
                'msg':'Fastest is ' + this.filter('fastest').pluck('name')
            });
            console.log(this.filter('fastest').pluck('name'));
        });

        socket.on('run',function(){
            console.log('Suite started!');
            socket.emit('started');
            suite.run(true);
        });

        socket.on('disconnect',function(){
            suite.abort();
            suite.off('cycle');
            suite.off('complete');
            delete suite;
            console.log('User disconnected');
        });
    })
    .catch(function(err){
        socket.emit('error',{msg:'Service currently unavilable!'});
        console.log("Error happend");
        console.log(err);
    });
});