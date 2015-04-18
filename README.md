EventsBenchmark
===============

This is a very simple benchmarking test for some event handling solution.
Inspired by: [EventEmitter2](https://github.com/asyncly/EventEmitter2 "EventEmitter2") benchmarks.

My idea was i comparing the my very simple event emitter based on component-emitter, with the nodejs
eventemitter and the component-emitter and eventemitter2.

My Results On My Machine
------------------------

    MyEmitter x 851,091 ops/sec ±0.53% (98 runs sampled)
    NodeEmitter x 898,932 ops/sec ±0.39% (94 runs sampled)
    ComponentEmitter x 248,386 ops/sec ±0.34% (96 runs sampled)
    EventEmitter2 x 1,313,486 ops/sec ±1.26% (93 runs sampled)
    jQuery x 10,713 ops/sec ±2.02% (92 runs sampled)
    Struts 2 jQuery subscribe x 8,169 ops/sec ±1.39% (97 runs sampled)
    Fastest is EventEmitter2

