function EventBaton(options) {
  this.eventMap = {};
  this.options = options || {};
}

// this method steals the "baton" -- aka, only this method will now
// get called. analogous to events.on
// EventBaton.prototype.on = function(name, func, context) {
EventBaton.prototype.stealBaton = function(name, func, context) {
  if (!name) { throw new Error('need name'); }
  if (!func) { throw new Error('need func!'); }

  var listeners = this.eventMap[name] || [];
  listeners.push({
    func: func,
    context: context
  });
  this.eventMap[name] = listeners;
};

EventBaton.prototype.sliceOffArgs = function(num, args) {
  var newArgs = [];
  for (var i = num; i < args.length; i++) {
    newArgs.push(args[i]);
  }
  return newArgs;
};

EventBaton.prototype.trigger = function(name) {
  // arguments is weird and doesnt do slice right
  var argsToApply = this.sliceOffArgs(1, arguments);

  var listeners = this.eventMap[name];
  if (!listeners || !listeners.length) {
    console.warn('no listeners for', name);
    return;
  }

  // call the top most listener with context and such
  var toCall = listeners.slice(-1)[0];
  toCall.func.apply(toCall.context, argsToApply);
};

EventBaton.prototype.getNumListeners = function(name) {
  var listeners = this.eventMap[name] || [];
  return listeners.length;
};

EventBaton.prototype.getListenersThrow = function(name) {
  var listeners = this.eventMap[name];
  if (!listeners || !listeners.length) {
    throw new Error('no one has that baton!' + name);
  }
  return listeners;
};

EventBaton.prototype.passBatonBackSoft = function(name, func, context, args) {
  try {
    return this.passBatonBack(name, func, context, args);
  } catch (e) {
  }
};

EventBaton.prototype.passBatonBack = function(name, func, context, args) {
  // this method will call the listener BEFORE the name/func pair. this
  // basically allows you to put in shims, where you steal batons but pass
  // them back if they don't meet certain conditions
  var listeners = this.getListenersThrow(name);

  var indexBefore;
  listeners.forEach(function(listenerObj, index) {
    // skip the first
    if (index === 0) { return; }
    if (listenerObj.func === func && listenerObj.context === context) {
      indexBefore = index - 1;
    }
  });
  if (indexBefore === undefined) {
    throw new Error('you are the last baton holder! or i didnt find you');
  }
  var toCallObj = listeners[indexBefore];

  toCallObj.func.apply(toCallObj.context, args);
};

EventBaton.prototype.releaseBaton = function(name, func, context) {
  // might be in the middle of the stack, so we have to loop instead of
  // just popping blindly
  var listeners = this.getListenersThrow(name);

  var newListeners = [];
  var found = false;
  listeners.forEach(function(listenerObj) {
    if (listenerObj.func === func && listenerObj.context === context) {
      if (found) {
        console.warn('woah duplicates!!!');
        console.log(listeners);
      }
      found = true;
    } else {
      newListeners.push(listenerObj);
    }
  });

  if (!found) {
    console.log('did not find that function', func, context, name, arguments);
    console.log(this.eventMap);
    throw new Error('cant releasebaton if yu dont have it');
  }
  this.eventMap[name] = newListeners;
};

exports.EventBaton = EventBaton;
