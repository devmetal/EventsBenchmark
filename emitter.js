/**
 * Created by AdiReka on 2015.04.17..
 */
var assign = require('object-assign');

function EventEmitter(){}
EventEmitter.prototype = assign({},EventEmitter.prototype,{

    on:function(evt,callback){
        this.callbacks = this.callbacks || {};
        (this.callbacks[evt] = this.callbacks[evt] || []).push(callback);
        return this;
    },

    emit:function(evt,data) {
        this.callbacks = this.callbacks || {};
        var callbacks = this.callbacks[evt];
        if (callbacks) {
            var n = callbacks.length;
            for (var i = 0; i<n; i++) {
                callbacks[i].apply(this,data);
            }
        }

        return this;
    },

    off:function(evt,callback) {
        this.callbacks = this.callbacks || {};
        if (arguments.length === 1) {
            delete this.callbacks[evt];
            return this;
        } else {
            var callbacks = this.callbacks[evt];
            if (!callbacks) {
                return this;
            }

            var n = callbacks.length;
            for (var i = 0; i<n; i++) {
                if (callbacks[i] === callback) {
                    callbacks.splice(i,1);
                    return this;
                }
            }
        }
    }
});

module.exports = EventEmitter;
