var Q = require('q');
var Backbone = require('backbone');
var GlobalStateActions = require('../../actions/GlobalStateActions');
var GRAPHICS = require('../../util/constants').GRAPHICS;

var Animation = Backbone.Model.extend({
  defaults: {
    duration: GRAPHICS.defaultAnimationTime,
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
    defer: false,
    promiseBased: false
  },

  initialize: function(options) {
    this.set('animations', []);
    if (!options.callback) {
      console.warn('no callback');
    }
  },

  thenFinish: function(promise, deferred) {
    promise.then(function() {
      this.finish();
    }.bind(this));
    promise.fail(function(e) {
      console.log('uncaught error', e);
      throw e;
    });
    this.set('promiseBased', true);
    if (deferred) {
      deferred.resolve();
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
    GlobalStateActions.changeIsAnimating(true);
    this.next();
  },

  finish: function() {
    // release lock here
    GlobalStateActions.changeIsAnimating(false);
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
    setTimeout(function() {
      this.next();
    }.bind(this), duration);
  }
});

var PromiseAnimation = Backbone.Model.extend({
  defaults: {
    deferred: null,
    closure: null,
    duration: GRAPHICS.defaultAnimationTime
  },

  initialize: function(options) {
    if (!options.closure && !options.animation) {
      throw new Error('need closure or animation');
    }
    this.set('closure', options.closure || options.animation);
    this.set('duration', options.duration || this.get('duration'));
    this.set('deferred', options.deferred || Q.defer());
  },

  getPromise: function() {
    return this.get('deferred').promise;
  },

  play: function() {
    // a single animation is just something with a timeout, but now
    // we want to resolve a deferred when the animation finishes
    this.get('closure')();
    setTimeout(function() {
      this.get('deferred').resolve();
    }.bind(this), this.get('duration'));
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
