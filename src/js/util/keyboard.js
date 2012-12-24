var _ = require('underscore');
var Backbone = require('backbone');

function KeyboardListener(options) {
  this.events = options.events || _.clone(Backbone.Events);
  this.aliasMap = options.aliasMap || {};

  this.keyMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    27: 'esc',
    13: 'enter'
  };
  this.keydownListener = _.bind(this.keydown, this);

  this.listen();
}

KeyboardListener.prototype.listen = function() {
  $(document).bind('keydown', this.keydownListener);
};

KeyboardListener.prototype.mute = function() {
  $(document).unbind('keydown', this.keydownListener);
};

KeyboardListener.prototype.keydown = function(e) {
  var which = e.which;
  console.log('key which', which);

  if (this.keyMap[which] === undefined) {
    return;
  }
  this.fireEvent(this.keyMap[which]);
};

KeyboardListener.prototype.fireEvent = function(eventName) {
  eventName = this.aliasMap[eventName] || eventName;
  this.events.trigger(eventName);
};

exports.KeyboardListener = KeyboardListener;

