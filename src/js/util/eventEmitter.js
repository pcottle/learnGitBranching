// EventEmitter - replacement for Backbone.Events
// Provides on, off, trigger, once, and listenTo methods

class EventEmitter {
  constructor() {
    this._events = {};
    this._listeningTo = [];
  }

  on(eventName, callback, context) {
    if (!eventName || !callback) return this;

    var events = eventName.split(/\s+/);
    events.forEach(function(event) {
      if (!this._events[event]) {
        this._events[event] = [];
      }
      this._events[event].push({
        callback: callback,
        context: context || this
      });
    }, this);
    return this;
  }

  // Alias for on
  bind(eventName, callback, context) {
    return this.on(eventName, callback, context);
  }

  off(eventName, callback, context) {
    if (!eventName) {
      this._events = {};
      return this;
    }

    var events = eventName.split(/\s+/);
    events.forEach(function(event) {
      if (!this._events[event]) return;

      if (!callback) {
        delete this._events[event];
        return;
      }

      this._events[event] = this._events[event].filter(function(listener) {
        // Keep listener if callbacks differ
        var callbacksDiffer = listener.callback !== callback;
        // Keep listener if context was provided and contexts differ
        var contextsDiffer = context && listener.context !== context;
        // Remove only when callbacks match AND (no context provided OR contexts match)
        return callbacksDiffer || contextsDiffer;
      });
    }, this);
    return this;
  }

  // Alias for off
  unbind(eventName, callback, context) {
    return this.off(eventName, callback, context);
  }

  trigger(eventName) {
    if (!eventName) return this;

    var args = Array.prototype.slice.call(arguments, 1);
    var events = eventName.split(/\s+/);

    events.forEach(function(event) {
      var listeners = this._events[event];
      if (!listeners) return;

      listeners.forEach(function(listener) {
        listener.callback.apply(listener.context, args);
      });
    }, this);
    return this;
  }

  once(eventName, callback, context) {
    var self = this;
    var onceCallback = function() {
      self.off(eventName, onceCallback);
      callback.apply(this, arguments);
    };
    return this.on(eventName, onceCallback, context);
  }

  listenTo(obj, eventName, callback) {
    if (!obj || !obj.on) return this;
    obj.on(eventName, callback, this);
    this._listeningTo.push({ obj: obj, event: eventName, callback: callback });
    return this;
  }

  stopListening(obj, eventName, callback) {
    this._listeningTo = this._listeningTo.filter(function(listening) {
      if (obj && listening.obj !== obj) return true;
      if (eventName && listening.event !== eventName) return true;
      if (callback && listening.callback !== callback) return true;

      listening.obj.off(listening.event, listening.callback, this);
      return false;
    }, this);
    return this;
  }
}

// Factory to create a standalone events object (like Backbone.Events)
function createEvents() {
  return new EventEmitter();
}

// Mixin to add event methods to any object
function mixinEvents(obj) {
  var emitter = new EventEmitter();
  obj.on = emitter.on.bind(emitter);
  obj.off = emitter.off.bind(emitter);
  obj.trigger = emitter.trigger.bind(emitter);
  obj.once = emitter.once.bind(emitter);
  obj.bind = emitter.bind.bind(emitter);
  obj.unbind = emitter.unbind.bind(emitter);
  obj.listenTo = emitter.listenTo.bind(emitter);
  obj.stopListening = emitter.stopListening.bind(emitter);
  obj._events = emitter._events;
  return obj;
}

exports.EventEmitter = EventEmitter;
exports.createEvents = createEvents;
exports.mixinEvents = mixinEvents;
