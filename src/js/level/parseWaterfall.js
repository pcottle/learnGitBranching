var _ = require('underscore');

var GitCommands = require('../git/commands');
var SandboxCommands = require('../level/SandboxCommands');

// more or less a static class
function ParseWaterfall(options) {
  options = options || {};
  this.shortcutWaterfall = options.shortcutWaterfall || [
    GitCommands.shortcutMap
  ];

  this.instantWaterfall = options.instantWaterfall || [
    GitCommands.instantCommands,
    SandboxCommands.instantCommands
  ];

  this.parseWaterfall = options.parseWaterfall || [
    GitCommands.parse,
    SandboxCommands.parse
  ];
}

ParseWaterfall.prototype.clone = function() {
  return new ParseWaterfall({
    shortcutWaterfall: this.shortcutWaterfall.slice(),
    instantWaterfall: this.instantWaterfall.slice(),
    parseWaterfall: this.parseWaterfall.slice()
  });
};

ParseWaterfall.prototype.getWaterfallMap = function() {
  return {
    shortcutWaterfall: this.shortcutWaterfall,
    instantWaterfall: this.instantWaterfall,
    parseWaterfall: this.parseWaterfall
  };
};

ParseWaterfall.prototype.addFirst = function(which, value) {
  if (!which || !value) {
    throw new Error('need to know which!!!');
  }
  this.getWaterfallMap()[which].unshift(value);
};

ParseWaterfall.prototype.addLast = function(which, value) {
  this.getWaterfallMap()[which].push(value);
};

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
  _.each(instantCommands, function(tuple) {
    var regex = tuple[0];
    var results = regex.exec(commandStr);
    if (results) {
      // this will throw a result because it's an instant
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

