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
  this.events = options.events;
  this.aliasMap = options.aliasMap || {};

  if (!options.wait) {
    this.listen();
  }
}

KeyboardListener.prototype.listen = function() {
  if (this.listening) {
    return;
  }
  this.listening = true;
  Main.getEventBaton().stealBaton('docKeydown', this.keydown, this);
};

KeyboardListener.prototype.mute = function() {
  this.listening = false;
  Main.getEventBaton().releaseBaton('docKeydown', this.keydown, this);
};

KeyboardListener.prototype.keydown = function(e) {
  var which = e.which || e.keyCode;

  var key = mapKeycodeToKey(which);
  if (key === undefined) {
    return;
  }

  this.fireEvent(key, e);
};

KeyboardListener.prototype.fireEvent = function(eventName, e) {
  eventName = this.aliasMap[eventName] || eventName;
  this.events.trigger(eventName, e);
};

KeyboardListener.prototype.passEventBack = function(e) {
  Main.getEventBaton().passBatonBackSoft('docKeydown', this.keydown, this, [e]);
};

exports.KeyboardListener = KeyboardListener;
exports.mapKeycodeToKey = mapKeycodeToKey;

