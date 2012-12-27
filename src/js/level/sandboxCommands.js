var _ = require('underscore');

var GitCommands = require('../git/commands');
var GitOptionParser = GitCommands.GitOptionParser;

var Errors = require('../util/errors');
var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var sandboxInstantCommands = [
  [/^ls/, function() {
    throw new CommandResult({
      msg: "DontWorryAboutFilesInThisDemo.txt"
    });
  }],
  [/^cd/, function() {
    throw new CommandResult({
      msg: "Directory Changed to '/directories/dont/matter/in/this/demo'"
    });
  }],
  [/^git help($|\s)/, function() {
    // sym link this to the blank git command
    var allCommands = Command.prototype.getSandboxCommands();
    // wow this is hacky :(
    var equivalent = 'git';
    _.each(allCommands, function(bits) {
      var regex = bits[0];
      if (regex.test(equivalent)) {
        bits[1]();
      }
    });
  }],
  [/^git$/, function() {
    var lines = [
      'Git Version PCOTTLE.1.0',
      '<br/>',
      'Usage:',
      _.escape('\t git <command> [<args>]'),
      '<br/>',
      'Supported commands:',
      '<br/>'
    ];
    var commands = GitOptionParser.prototype.getMasterOptionMap();

    // build up a nice display of what we support
    _.each(commands, function(commandOptions, command) {
      lines.push('git ' + command);
      _.each(commandOptions, function(vals, optionName) {
        lines.push('\t ' + optionName);
      }, this);
    }, this);

    // format and throw
    var msg = lines.join('\n');
    msg = msg.replace(/\t/g, '&nbsp;&nbsp;&nbsp;');
    throw new CommandResult({
      msg: msg
    });
  }],
  [/^refresh$/, function() {
    var events = require('../app').getEvents();

    events.trigger('refreshTree');
    throw new CommandResult({
      msg: "Refreshing tree..."
    });
  }],
  [/^rollup (\d+)$/, function(bits) {
    var events = require('../app').getEvents();

    // go roll up these commands by joining them with semicolons
    events.trigger('rollupCommands', bits[1]);
    throw new CommandResult({
      msg: 'Commands combined!'
    });
  }]
];

exports.sandboxInstantCommands = sandboxInstantCommands;
