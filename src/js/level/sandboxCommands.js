var _ = require('underscore');
var util = require('../util');

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
  }],
  [/^echo "(.*?)"$|^echo (.*?)$/, function(bits) {
    var msg = bits[1] || bits[2];
    console.log(bits, msg);
    throw new CommandResult({
      msg: msg
    });
  }]
];

var regexMap = {
  'reset solved': /^reset solved($|\s)/,
  'help': /^help ?(general)?($|\s)/,
  'reset': /^reset$/,
  'delay': /^delay (\d+)$/,
  'clear': /^clear($|\s)/,
  'exit level': /^exit level($|\s)/,
  'sandbox': /^sandbox($|\s)/,
  'level': /^level\s?([a-zA-Z0-9]*)/,
  'levels': /^levels($|\s)/,
  'iosAlert': /^iOS alert($|\s)/,
  'build level': /^build level($|\s)/
};

exports.instantCommands = instantCommands;
exports.parse = util.genParseCommand(regexMap, 'processSandboxCommand');

