var _ = require('underscore');

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

var regexMap = {
  'help': /^help($|\s)|\?/,
  'reset': /^reset($|\s)/,
  'delay': /^delay (\d+)$/,
  'clear': /^clear($|\s)/
};

var parse = function(str) {
  var sandboxMethod;
  var regexResults;

  _.each(regexMap, function(regex, method) {
    var results = regex.exec(str);
    if (results) {
      sandboxMethod = method;
      regexResults = results;
    }
  });

  return (!sandboxMethod) ? false : {
    toSet: {
      eventName: 'processSandboxCommand',
      method: sandboxMethod,
      regexResults: regexResults
    }
  };
};

exports.instantCommands = instantCommands;
exports.parse = parse;

