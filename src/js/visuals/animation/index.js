var Q = require('q');
var GlobalStateActions = require('../../actions/GlobalStateActions');
var GRAPHICS = require('../../util/constants').GRAPHICS;

var animationDefaults = {
  duration: GRAPHICS.defaultAnimationTime,
  closure: null
};

class Animation {
  constructor(options = {}) {
    this._events = {};
    this.attributes = Object.assign({}, animationDefaults, options);
    this.validateAtInit();
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    if (typeof key === 'object') {
      Object.assign(this.attributes, key);
    } else {
      this.attributes[key] = value;
    }
    return this;
  }

  on(eventName, callback, context) {
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push({ callback, context: context || this });
  }

  trigger(eventName, ...args) {
    var listeners = this._events[eventName];
    if (listeners) listeners.forEach(l => l.callback.apply(l.context, args));
  }

  validateAtInit() {
    if (!this.get('closure')) {
      throw new Error('give me a closure!');
    }
  }

  run() {
    this.get('closure')();
  }
}

var animationQueueDefaults = {
  animations: null,
  index: 0,
  callback: null,
  defer: false,
  promiseBased: false
};

class AnimationQueue {
  constructor(options = {}) {
    this._events = {};
    this.attributes = Object.assign({}, animationQueueDefaults, options);
    this.set('animations', []);
    if (!options.callback) {
      console.warn('no callback');
    }
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    if (typeof key === 'object') {
      Object.assign(this.attributes, key);
    } else {
      this.attributes[key] = value;
    }
    return this;
  }

  on(eventName, callback, context) {
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push({ callback, context: context || this });
  }

  trigger(eventName, ...args) {
    var listeners = this._events[eventName];
    if (listeners) listeners.forEach(l => l.callback.apply(l.context, args));
  }

  thenFinish(promise, deferred) {
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
  }

  add(animation) {
    if (!(animation instanceof Animation)) {
      throw new Error("Need animation not something else");
    }

    this.get('animations').push(animation);
  }

  start() {
    this.set('index', 0);

    // set the global lock that we are animating
    GlobalStateActions.changeIsAnimating(true);
    this.next();
  }

  finish() {
    // release lock here
    GlobalStateActions.changeIsAnimating(false);
    this.get('callback')();
  }

  next() {
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
}

var promiseAnimationDefaults = {
  deferred: null,
  closure: null,
  duration: GRAPHICS.defaultAnimationTime
};

class PromiseAnimation {
  constructor(options = {}) {
    this._events = {};
    this.attributes = Object.assign({}, promiseAnimationDefaults, options);

    if (!options.closure && !options.animation) {
      throw new Error('need closure or animation');
    }
    this.set('closure', options.closure || options.animation);
    this.set('duration', options.duration || this.get('duration'));
    this.set('deferred', options.deferred || Q.defer());
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    if (typeof key === 'object') {
      Object.assign(this.attributes, key);
    } else {
      this.attributes[key] = value;
    }
    return this;
  }

  on(eventName, callback, context) {
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push({ callback, context: context || this });
  }

  trigger(eventName, ...args) {
    var listeners = this._events[eventName];
    if (listeners) listeners.forEach(l => l.callback.apply(l.context, args));
  }

  getPromise() {
    return this.get('deferred').promise;
  }

  play() {
    // a single animation is just something with a timeout, but now
    // we want to resolve a deferred when the animation finishes
    this.get('closure')();
    setTimeout(function() {
      this.get('deferred').resolve();
    }.bind(this), this.get('duration'));
  }

  then(func) {
    return this.get('deferred').promise.then(func);
  }

  static fromAnimation(animation) {
    return new PromiseAnimation({
      closure: animation.get('closure'),
      duration: animation.get('duration')
    });
  }
}

exports.Animation = Animation;
exports.PromiseAnimation = PromiseAnimation;
exports.AnimationQueue = AnimationQueue;
