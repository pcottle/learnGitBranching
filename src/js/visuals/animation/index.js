var _ = require('underscore');
var Q = require('q');
var Backbone = require('backbone');
var GLOBAL = require('../../util/constants').GLOBAL;

var Animation = Backbone.Model.extend({
  defaults: {
    duration: 300,
    closure: null
  },

  validateAtInit: function() {
    if (!this.get('closure')) {
      throw new Error('give me a closure!');
    }
  },

  initialize: function(options) {
    this.validateAtInit();
  },

  run: function() {
    this.get('closure')();
  }
});

var AnimationQueue = Backbone.Model.extend({
  defaults: {
    animations: null,
    index: 0,
    callback: null,
    defer: false
  },

  initialize: function(options) {
    this.set('animations', []);
    if (!options.callback) {
      console.warn('no callback');
    }
  },

  add: function(animation) {
    if (!animation instanceof Animation) {
      throw new Error("Need animation not something else");
    }

    this.get('animations').push(animation);
  },

  start: function() {
    this.set('index', 0);

    // set the global lock that we are animating
    GLOBAL.isAnimating = true;
    this.next();
  },

  finish: function() {
    // release lock here
    GLOBAL.isAnimating = false;
    this.get('callback')();
  },

  next: function() {
    // ok so call the first animation, and then set a timeout to call the next.
    // since an animation is defined as taking a specific amount of time,
    // we can simply just use timeouts rather than promises / deferreds.

    // for graphical displays that require an unknown amount of time, use deferreds
    // but not animation queue (see the finishAnimation for that)
    var animations = this.get('animations');
    var index = this.get('index');
    if (index >= animations.length) {
      this.finish();
      return;
    }

    var next = animations[index];
    var duration = next.get('duration');

    next.run();

    this.set('index', index + 1);
    setTimeout(_.bind(function() {
      this.next();
    }, this), duration);
  }
});

var PromiseAnimation = Backbone.Model.extend({
  defaults: {
    deferred: null,
    closure: null,
    duration: 300
  },

  initialize: function(options) {
    if (!options.closure) {
      throw new Error('need closure');
    }
    // TODO needed?
    this.set('deferred', options.deferred || Q.defer());
  },

  play: function() {
    // a single animation is just something with a timeout, but now
    // we want to resolve a deferred when the animation finishes
    this.get('closure')();
    setTimeout(_.bind(function() {
      this.get('deferred').resolve();
    }, this), this.get('duration'));
  },

  then: function(func) {
    return this.get('deferred').promise.then(func);
  }
});

PromiseAnimation.fromAnimation = function(animation) {
  return new PromiseAnimation({
    closure: animation.get('closure'),
    duration: animation.get('duration')
  });
};

exports.Animation = Animation;
exports.PromiseAnimation = PromiseAnimation;
exports.AnimationQueue = AnimationQueue;
