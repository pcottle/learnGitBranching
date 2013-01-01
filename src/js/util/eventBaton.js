var _ = require('underscore');

function EventBaton() {
  this.eventMap = {};
}

// this method steals the "baton" -- aka, only this method will now
// get called. analogous to events.on
// EventBaton.prototype.on = function(name, func, context) {
EventBaton.prototype.stealBaton = function(name, func, context) {
  if (!name) { throw new Error('need name'); }

  var listeners = this.eventMap[name] || [];
  listeners.push({
    func: func,
    context: context
  });
  this.eventMap[name] = listeners;
};

EventBaton.prototype.trigger = function(name) {
  // arguments is weird and doesnt do slice right
  var argsToApply = [];
  for (var i = 1; i < arguments.length; i++) {
    argsToApply.push(arguments[i]);
  }

  var listeners = this.eventMap[name];
  if (!listeners) {
    console.warn('no listeners for', name);
    return;
  }
  // call the top most listener with context and such
  var toCall = listeners.slice(-1)[0];
  toCall.func.apply(toCall.context, argsToApply);
};

EventBaton.prototype.releaseBaton = function(name, func, context) {
  if (!name) { throw new Error('need name'); }
  // might be in the middle of the stack
  var listeners = this.eventMap[name];
  if (!listeners || !listeners.length) {
    throw new Error('no one has that baton!' + name);
  }

  var newListeners = [];
  var found = false;
  _.each(listeners, function(listenerObj) {
    if (listenerObj.func === func) {
      found = true;
    } else {
      newListeners.push(listenerObj);
    }
  }, this);

  if (!found) {
    throw new Error('did not find that function', func, context, name, arguments);
  }
  this.eventMap[name] = newListeners;
};

exports.EventBaton = EventBaton;

