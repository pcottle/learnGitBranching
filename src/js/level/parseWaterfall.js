var _ = require('underscore');

var GitCommands = require('../git/commands');
var SandboxCommands = require('../level/SandboxCommands');

// more or less a static class
function ParseWaterfall(options) {
  this.shortcutWaterfall = [
    GitCommands.shortcutMap
  ];

  this.instantWaterfall = [
    GitCommands.instantCommands,
    SandboxCommands.instantCommands
  ];

  this.parseWaterfall = [
    GitCommands.parse
  ];
}

ParseWaterfall.prototype.expandAllShortcuts = function(commandStr) {
  _.each(this.shortcutWaterfall, function(shortcutMap) {
    commandStr = this.expandShortcut(commandStr, shortcutMap);
  }, this);
  return commandStr;
};

ParseWaterfall.prototype.expandShortcut = function(commandStr, shortcutMap) {
  _.each(shortcutMap, function(regex, method) {
    var results = regex.exec(commandStr);
    if (results) {
      commandStr = method + ' ' + commandStr.slice(results[0].length);
    }
  });
  return commandStr;
};

ParseWaterfall.prototype.processAllInstants = function(commandStr) {
  _.each(this.instantWaterfall, function(instantCommands) {
    this.processInstant(commandStr, instantCommands);
  }, this);
};

ParseWaterfall.prototype.processInstant = function(commandStr, instantCommands) {
  console.log('processing', commandStr, 'with', instantCommands);
  _.each(instantCommands, function(tuple) {
    var regex = tuple[0];
    console.log('the regex', regex);
    var results = regex.exec(commandStr);
    if (results) {
      console.log('results', results);
      // this will throw a result
      tuple[1](results);
    }
  });
};

ParseWaterfall.prototype.parseAll = function(commandStr) {
  var toReturn = false;
  _.each(this.parseWaterfall, function(parseFunc) {
    var results = parseFunc(commandStr);
    if (results) {
      toReturn = results;
    }
  }, this);

  return toReturn;
};

exports.ParseWaterfall = ParseWaterfall;
