var _ = require('underscore');
var Backbone = require('backbone');

var Main = require('../app');
var GitCommands = require('../git/commands');

var Errors = require('../util/errors');
var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

/**
  * This class supports a few things we need for levels:
    ~ A disabled map (to prevent certain git commands from firing)
    ~ A post-git command hook (to compare the git tree against the solution)
    ~ Extra level-specific commands (like help, hint, etc) that are async
**/

function InputWaterfall(options) {
  options = options || {};
  this.listenEvent = options.listenEvent || 'processCommand';
  this.disabledMap = options.disabledMap || {
    'git cherry-pick': true,
    'git rebase': true
  };

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
  console.log('processing', command.get('rawStr'));

  if (this.checkDisabledMap(command)) {
    callback();
    return;
  }
  // for now, just immediately fire it
  Main.getEvents().trigger('processGitCommand', command, callback);
};

InputWaterfall.prototype.sliceGitOff = function(str) {
  return str.slice('git '.length);
};

InputWaterfall.prototype.checkDisabledMap = function(command) {
  try {
    this.loopDisabledMap(command);
  } catch(err) {
    command.set('error', err);
    return true;
  }
  // not needed explicitly, but included for clarity
  return false;
};

InputWaterfall.prototype.loopDisabledMap = function(command) {
  var toTest = this.sliceGitOff(command.get('rawStr'));
  var regexMap = GitCommands.getRegexMap();

  _.each(this.disabledMap, function(val, disabledGitCommand) {
    disabledGitCommand = this.sliceGitOff(disabledGitCommand);

    var regex = regexMap[disabledGitCommand];
    if (!regex) {
      console.warn('wut, no regex for command', disabledGitCommand);
      return;
    }

    if (regex.test(toTest)) {
      throw new GitError({
        msg: 'That git command is disabled for this level!'
      });
    }
  }, this);
};

exports.InputWaterfall = InputWaterfall;

