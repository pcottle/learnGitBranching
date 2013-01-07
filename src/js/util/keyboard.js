var _ = require('underscore');
var Backbone = require('backbone');

var Main = require('../app');

var mapKeycodeToKey = function(keycode) {
  // HELP WANTED -- internationalize? Dvorak? I have no idea
  var keyMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    27: 'esc',
    13: 'enter'
  };
  return keyMap[keycode];
};

function KeyboardListener(options) {
  this.events = options.events || _.clone(Backbone.Events);
  this.aliasMap = options.aliasMap || {};

  this.keydownListener = _.bind(this.keydown, this);
  if (!options.wait) {
    this.listen();
  }
}

KeyboardListener.prototype.listen = function() {
  Main.getEventBaton().stealBaton('docKeydown', this.keydownListener, this);
};

KeyboardListener.prototype.mute = function() {
  Main.getEventBaton().releaseBaton('docKeydown', this.keydownListener, this);
};

KeyboardListener.prototype.keydown = function(e) {
  var which = e.which;

  var key = mapKeycodeToKey(which);
  if (key === undefined) {
    return;
  }

  this.fireEvent(key);
};

KeyboardListener.prototype.fireEvent = function(eventName) {
  eventName = this.aliasMap[eventName] || eventName;
  this.events.trigger(eventName);
};

exports.KeyboardListener = KeyboardListener;
exports.mapKeycodeToKey = mapKeycodeToKey;

