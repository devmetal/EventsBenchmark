/**
 * Created by AdiReka on 2015.04.17..
 */
var MyEmitter = require('./emitter');
var NodeEmitter = require('events').EventEmitter;
var ComponentEmitter = require('component-emitter');
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var Benchmark = require('benchmark');
var env = require('jsdom').env;

var EVT = 'ON_SOMETHING';
var html = '<html><body><div id="test"></div></body></html>';

var $test = null;
var myEmitter = new MyEmitter;
var nodeEmitter = new NodeEmitter;
var componentEmitter = new ComponentEmitter;
var emitter2 = new EventEmitter2;

var suite = new Benchmark.Suite('events');
suite
.add('MyEmitter',function() {
    myEmitter.on(EVT,function(){1==1});
    myEmitter.emit(EVT);
    myEmitter.off(EVT);
})
.add('NodeEmitter',function() {
    nodeEmitter.on(EVT,function(){1==1});
    nodeEmitter.emit(EVT);
    nodeEmitter.removeAllListeners(EVT);
})
.add('ComponentEmitter',function(){
    componentEmitter.on(EVT,function(){1==1});
    componentEmitter.emit(EVT);
    componentEmitter.off(EVT);
})
.add('EventEmitter2',function(){
    emitter2.on(EVT,function(){1==1});
    emitter2.emit(EVT);
    emitter2.removeAllListeners(EVT);
})
.add('jQuery',function(){
    $test.bind(EVT,function(){1==1});
    $test.trigger(EVT);
    $test.unbind(EVT);
})
.add('Struts 2 jQuery subscribe',function(){
    $test.createTopic(EVT);
    $test.subscribe(EVT,function(){1==1});
    $test.publish(EVT);
    $test.destroyTopic(EVT);
})
.on('cycle',function(event){
    console.log(String(event.target));
})
.on('complete',function(){
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

env(html,function(err,window){
    $ = require('jquery')(window);
    require('./jquery-subscribe')($,window);
    $test = $("#test");
    suite.run(true);
});
