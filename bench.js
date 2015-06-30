"use strict";
var Promise = require('bluebird');
var MyEmitter = require('./emitter');
var NodeEmitter = require('events').EventEmitter;
var ComponentEmitter = require('component-emitter');
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var Benchmark = require('benchmark');
var env = require('jsdom').env;


var html = '<html><body><div id="test"></div></body></html>';

var myEmitter = new MyEmitter;
var nodeEmitter = new NodeEmitter;
var componentEmitter = new ComponentEmitter;
var emitter2 = new EventEmitter2;

function initSuite($test) {
    //setup every handler before we start our test
    var DUM = 'DUMMY_EVENT';
    var dummyHandler = function () {
      1 == 1;
    };
    var NOTDUM = 'NOT_SO_DUMMY_EVENT';
    var notSoDummyHandler = function () {
      for (let i=0; i < 10000; i++) {
        i % 2;
      }
    }

    myEmitter.on(DUM, dummyHandler);
    myEmitter.on(NOTDUM, notSoDummyHandler);
    nodeEmitter.on(DUM, dummyHandler);
    nodeEmitter.on(NOTDUM, notSoDummyHandler);
    componentEmitter.on(DUM, dummyHandler);
    componentEmitter.on(NOTDUM, notSoDummyHandler);
    emitter2.on(DUM, dummyHandler);
    emitter2.on(NOTDUM, notSoDummyHandler);
    $test.on(DUM, dummyHandler);
    $test.on(NOTDUM, notSoDummyHandler);

    return new Promise(function (resolve, reject) {
        var suite = new Benchmark.Suite('events');
        suite
            .add('MyEmitter#Dummmy', function () {
                myEmitter.emit(EVT);
            })
            .add('MyEmitter#Complex', function () {
                myEmitter.emit(EVT);
            })
            .add('NodeEmitter#Dummy', function () {
                nodeEmitter.emit(EVT);
            })
            .add('NodeEmitter#Complex', function () {
                nodeEmitter.emit(EVT);
            })
            .add('ComponentEmitter#Dummy', function () {
                componentEmitter.emit(EVT);
            })
            .add('ComponentEmitter#Complex', function () {
                componentEmitter.emit(EVT);
            })
            .add('EventEmitter2#Dummy', function () {
                emitter2.emit(EVT);
            })
            .add('EventEmitter2#Complex', function () {
                emitter2.emit(EVT);
            })
            .add('jQuery#Dummy', function () {
                $test.trigger(EVT);
            })
            .add('jQuery#Complex', function () {
                $test.trigger(EVT);
            })
            .add('Struts 2 jQuery subscribe#Dummy', function () {
                $test.publish(EVT);
            })
            .add('Struts 2 jQuery subscribe#Complex', function () {
                $test.publish(EVT);
            });

        resolve(suite);
    });
}

function initJQuery() {
    return new Promise(function (resolve, reject) {
        env(html, function (err, window) {
            if (err) {
                reject(err);
                return;
            }
            var jquery = require('jquery')(window);

            require('./jquery-subscribe')(jquery,window);

            resolve(jquery);
        });
    });
}

module.exports = function () {
    return initJQuery()
        .then(function($){
            return initSuite($("#test"));
        });
};
