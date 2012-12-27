var _ = require('underscore');

var GitCommands = require('../git/commands');
var GitOptionParser = GitCommands.GitOptionParser;

var Errors = require('../util/errors');
var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var instantCommands = [
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

exports.instantCommands = instantCommands;
