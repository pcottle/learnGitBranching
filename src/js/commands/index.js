var _ = require('underscore');
var intl = require('../intl');

var Errors = require('../util/errors');
var GitCommands = require('../git/commands');
var MercurialCommands = require('../mercurial/commands');
var CommandProcessError = Errors.CommandProcessError;
var CommandResult = Errors.CommandResult;

var commandConfigs = {
  'git': GitCommands.commandConfig,
  'hg': MercurialCommands.commandConfig
};

var commands = {
  execute: function(vcs, name, engine, commandObj) {
    if (!commandConfigs[vcs][name]) {
      throw new Error('i dont have a command for ' + name);
    }
    commandConfigs[vcs][name].execute.call(this, engine, commandObj);
  },

  getShortcutMap: function() {
    var map = {'git': {}, 'hg': {}};
    this.loop(function(config, name, vcs) {
      if (!config.sc) {
        return;
      }
      map[vcs][name] = config.sc;
    }, this);
    return map;
  },

  getOptionMap: function() {
    var optionMap = {'git': {}, 'hg': {}};
    this.loop(function(config, name, vcs) {
      var displayName = config.displayName || name;
      var thisMap = {};
      // start all options off as disabled
      _.each(config.options, function(option) {
        thisMap[option] = false;
      });
      optionMap[vcs][displayName] = thisMap;
    });
    return optionMap;
  },

  getRegexMap: function() {
    var map = {'git': {}, 'hg': {}};
    this.loop(function(config, name, vcs) {
      var displayName = config.displayName || name;
      map[vcs][displayName] = config.regex;
    });
    return map;
  },

  /**
   * which commands count for the git golf game
   */
  getCommandsThatCount: function() {
    var counted = {'git': {}, 'hg': {}};
    this.loop(function(config, name, vcs) {
      if (config.dontCountForGolf) {
        return;
      }
      counted[vcs][name] = config.regex;
    });
    return counted;
  },

  loop: function(callback, context) {
    _.each(commandConfigs, function(commandConfig, vcs) {
      _.each(commandConfig, function(config, name) {
        callback(config, name, vcs);
      });
    });
  }
};

var parse = function(str) {
  var vcs;
  var method;
  var options;

  // see if we support this particular command
  _.each(commands.getRegexMap(), function (map, thisVCS) {
    _.each(map, function(regex, thisMethod) {
      if (regex.exec(str)) {
        vcs = thisVCS;
        method = thisMethod;
        options = str.slice(vcs.length + 1 + method.length + 1);
      }
    });
  });

  if (!method) {
    return false;
  }

  // we support this command!
  // parse off the options and assemble the map / general args
  var parsedOptions = new CommandOptionParser(vcs, method, options);
  return {
    toSet: {
      generalArgs: parsedOptions.generalArgs,
      supportedMap: parsedOptions.supportedMap,
      vcs: vcs,
      method: method,
      options: options,
      eventName: 'processGitCommand'
    }
  };
};

/**
 * CommandOptionParser
 */
function CommandOptionParser(vcs, method, options) {
  this.vcs = vcs;
  this.method = method;
  this.rawOptions = options;

  this.supportedMap = commands.getOptionMap()[vcs][method];
  if (this.supportedMap === undefined) {
    throw new Error('No option map for ' + method);
  }

  this.generalArgs = [];
  this.explodeAndSet();
}

CommandOptionParser.prototype.explodeAndSet = function() {
  // TODO -- this is ugly
  // split on spaces, except when inside quotes
  var exploded = this.rawOptions.match(/('.*?'|".*?"|\S+)/g) || [];
  for (var i = 0; i < exploded.length; i++) {
    var part = exploded[i];

    if (part.slice(0,1) == '-') {
      // it's an option, check supportedMap
      if (this.supportedMap[part] === undefined) {
        throw new CommandProcessError({
          msg: intl.str(
            'option-not-supported',
            { option: part }
          )
        });
      }

      // go through and include all the next args until we hit another option or the end
      var optionArgs = [];
      var next = i + 1;
      while (next < exploded.length && exploded[next].slice(0,1) != '-') {
        optionArgs.push(exploded[next]);
        next += 1;
      }
      i = next - 1;

      // **phew** we are done grabbing those. theseArgs is truthy even with an empty array
      this.supportedMap[part] = optionArgs;
    } else {
      // must be a general arg
      this.generalArgs.push(part);
    }
  }
};

exports.commands = commands;
exports.parse = parse;
