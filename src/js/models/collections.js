// Collections - converted from Backbone to plain ES6 classes

var Commit = require('../git').Commit;
var Branch = require('../git').Branch;
var Tag = require('../git').Tag;

var Command = require('../models/commandModel').Command;
var TIME = require('../util/constants').TIME;

var intl = require('../intl');

// Base Collection class with event support
class BaseCollection {
  constructor(models) {
    this._events = {};
    this.models = [];
    this.length = 0;
    if (models && models.length) {
      models.forEach(function(model) {
        this.add(model);
      }, this);
    }
  }

  // Event emitter methods
  on(eventName, callback, context) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push({ callback: callback, context: context || this });
  }

  // Alias for on() - Backbone uses bind as well
  bind(eventName, callback, context) {
    this.on(eventName, callback, context);
  }

  off(eventName, callback) {
    if (!this._events[eventName]) return;
    if (!callback) {
      delete this._events[eventName];
    } else {
      this._events[eventName] = this._events[eventName].filter(function(listener) {
        return listener.callback !== callback;
      });
    }
  }

  trigger(eventName) {
    var listeners = this._events[eventName];
    if (!listeners) return;
    var args = Array.prototype.slice.call(arguments, 1);
    listeners.forEach(function(listener) {
      listener.callback.apply(listener.context, args);
    });
  }

  add(model, options) {
    options = options || {};
    this.models.push(model);
    this.length = this.models.length;
    // Set collection reference on model for destroy()
    if (model) {
      model.collection = this;
    }
    if (!options.silent) {
      this.trigger('add', model, this);
    }
  }

  remove(model) {
    var index = this.models.indexOf(model);
    if (index > -1) {
      this.models.splice(index, 1);
      this.length = this.models.length;
      this.trigger('remove', model, this);
    }
  }

  at(index) {
    return this.models[index];
  }

  toArray() {
    return this.models.slice();
  }

  forEach(callback, context) {
    this.models.forEach(callback, context);
  }

  // Backbone/Underscore alias
  each(callback, context) {
    this.forEach(callback, context);
  }

  map(callback, context) {
    return this.models.map(callback, context);
  }

  filter(callback, context) {
    return this.models.filter(callback, context);
  }

  find(callback, context) {
    return this.models.find(callback, context);
  }

  reset(models) {
    this.models = [];
    this.length = 0;
    if (models && models.length) {
      models.forEach(function(model) {
        this.add(model);
      }, this);
    }
    this.trigger('reset', this);
  }

  toJSON() {
    return this.models.map(function(model) {
      if (model && typeof model.toJSON === 'function') {
        return model.toJSON();
      }
      return model;
    });
  }
}

class CommitCollection extends BaseCollection {
  constructor(models) {
    super(models);
  }
}

class CommandCollection extends BaseCollection {
  constructor(models) {
    super(models);
  }
}

class BranchCollection extends BaseCollection {
  constructor(models) {
    super(models);
  }
}

class TagCollection extends BaseCollection {
  constructor(models) {
    super(models);
  }
}

class CommandBuffer {
  constructor(options) {
    this._events = {};
    this.collection = options.collection;
    this.collection.bind('add', this.addCommand, this);

    this.buffer = [];
    this.timeout = null;
  }

  // Event emitter methods (same as BaseCollection)
  on(eventName, callback, context) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push({ callback: callback, context: context || this });
  }

  off(eventName, callback) {
    if (!this._events[eventName]) return;
    if (!callback) {
      delete this._events[eventName];
    } else {
      this._events[eventName] = this._events[eventName].filter(function(listener) {
        return listener.callback !== callback;
      });
    }
  }

  trigger(eventName) {
    var listeners = this._events[eventName];
    if (!listeners) return;
    var args = Array.prototype.slice.call(arguments, 1);
    listeners.forEach(function(listener) {
      listener.callback.apply(listener.context, args);
    });
  }

  get(key) {
    return this[key];
  }

  set(key, value) {
    this[key] = value;
  }

  addCommand(command) {
    this.buffer.push(command);
    this.touchBuffer();
  }

  touchBuffer() {
    // touch buffer just essentially means we just check if our buffer is being
    // processed. if it's not, we immediately process the first item
    // and then set the timeout.
    if (this.timeout) {
      // timeout existence implies its being processed
      return;
    }
    this.setTimeout();
  }

  setTimeout() {
    this.timeout = setTimeout(function() {
        this.sipFromBuffer();
    }.bind(this), TIME.betweenCommandsDelay);
  }

  popAndProcess() {
    var popped = this.buffer.shift(0);

    // find a command with no error (aka unprocessed)
    while (popped.get('error') && this.buffer.length) {
      popped = this.buffer.shift(0);
    }
    if (!popped.get('error')) {
      this.processCommand(popped);
    } else {
      // no more commands to process
      this.clear();
    }
  }

  processCommand(command) {
    command.set('status', 'processing');

    var promise = new Promise(function(resolve) {
      var eventName = command.get('eventName');
      if (!eventName) {
        throw new Error('I need an event to trigger when this guy is parsed and ready');
      }

      var Main = require('../app');
      var eventBaton = Main.getEventBaton();

      var numListeners = eventBaton.getNumListeners(eventName);
      if (!numListeners) {
        var Errors = require('../util/errors');
        command.set('error', new Errors.GitError({
          msg: intl.str('error-command-currently-not-supported')
        }));
        resolve();
        return;
      }

      Main.getEventBaton().trigger(eventName, command, { resolve: resolve });
    });

    promise.then(function() {
      this.setTimeout();
    }.bind(this));
  }

  clear() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  sipFromBuffer() {
    if (!this.buffer.length) {
      this.clear();
      return;
    }

    this.popAndProcess();
  }
}

exports.CommitCollection = CommitCollection;
exports.CommandCollection = CommandCollection;
exports.BranchCollection = BranchCollection;
exports.TagCollection = TagCollection;
exports.CommandBuffer = CommandBuffer;
