var GitCommands = require('../git/commands');
var Commands = require('../commands');
var SandboxCommands = require('../sandbox/commands');

// more or less a static class
var ParseWaterfall = function(options) {
  options = options || {};
  this.options = options;
  this.shortcutWaterfall = options.shortcutWaterfall || [
    Commands.commands.getShortcutMap()
  ];

  this.instantWaterfall = options.instantWaterfall || [
    GitCommands.instantCommands,
    SandboxCommands.instantCommands
  ];

  // defer the parse waterfall until later...
};

ParseWaterfall.prototype.initParseWaterfall = function() {
  // check for node when testing
  if (!require('../util').isBrowser()) {
    this.parseWaterfall = [Commands.parse];
    return;
  }

  // by deferring the initialization here, we don't require()
  // level too early (which barfs our init)
  this.parseWaterfall = this.options.parseWaterfall || [
    Commands.parse,
    SandboxCommands.parse,
    SandboxCommands.getOptimisticLevelParse(),
    SandboxCommands.getOptimisticLevelBuilderParse()
  ];
};

ParseWaterfall.prototype.clone = function() {
  return new ParseWaterfall({
    shortcutWaterfall: this.shortcutWaterfall.slice(),
    instantWaterfall: this.instantWaterfall.slice(),
    parseWaterfall: this.parseWaterfall.slice()
  });
};

ParseWaterfall.prototype.getWaterfallMap = function() {
  if (!this.parseWaterfall) {
    this.initParseWaterfall();
  }
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
  this.shortcutWaterfall.forEach(function(shortcutMap) {
    commandStr = this.expandShortcut(commandStr, shortcutMap);
  }, this);
  return commandStr;
};

ParseWaterfall.prototype.expandShortcut = function(commandStr, shortcutMap) {
  Object.keys(shortcutMap).forEach(function(vcs) {
    var map = shortcutMap[vcs];
    Object.keys(map).forEach(function(method) {
      var regex = map[method];
      var results = regex.exec(commandStr);
      if (results) {
        commandStr = vcs + ' ' + method + ' ' + commandStr.slice(results[0].length);
      }
    });
  });
  return commandStr;
};

ParseWaterfall.prototype.processAllInstants = function(commandStr) {
  this.instantWaterfall.forEach(function(instantCommands) {
    this.processInstant(commandStr, instantCommands);
  }, this);
};

ParseWaterfall.prototype.processInstant = function(commandStr, instantCommands) {
  instantCommands.forEach(function(tuple) {
    var regex = tuple[0];
    var results = regex.exec(commandStr);
    if (results) {
      // this will throw a result because it's an instant
      tuple[1](results);
    }
  });
};

ParseWaterfall.prototype.parseAll = function(commandStr) {
  if (!this.parseWaterfall) {
    this.initParseWaterfall();
  }

  var toReturn = false;
  this.parseWaterfall.forEach(function(parseFunc) {
    var results = parseFunc(commandStr);
    if (results) {
      toReturn = results;
    }
  }, this);

  return toReturn;
};

exports.ParseWaterfall = ParseWaterfall;
