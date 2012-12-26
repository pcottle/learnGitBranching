var _ = require('underscore');
var Backbone = require('backbone');

var Main = require('../app');

/**
  * This class supports a few things we need for levels:
    ~ A disabled map (to prevent certain git commands from firing)
    ~ A post-git command hook (to compare the git tree against the solution)
    ~ Extra level-specific commands (like help, hint, etc) that are async
**/

function InputWaterfall(options) {
  options = options || {};
  this.listenEvent = options.listenEvent || 'processCommand';
  this.disabledMap = options.disabledMap || {};

  console.log('made');

  this.listen();
}

InputWaterfall.prototype.listen = function() {
  Main.getEvents().on(this.listenEvent, this.process, this);
};

InputWaterfall.prototype.mute = function() {
  Main.getEvents().off(this.listenEvent, this.process, this);
};

InputWaterfall.prototype.process = function(command, callback) {
  console.log('processing');
  // for now, just immediately fire it
  Main.getEvents().trigger('processGitCommand', command, callback);
};

exports.InputWaterfall = InputWaterfall;

