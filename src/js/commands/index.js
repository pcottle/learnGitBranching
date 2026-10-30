var intl = require('../intl');

var Errors = require('../util/errors');
var commandLine = require('../util/commandLine');
var OptionParser = require('./optionParser');
var GitCommands = require('../git/commands');
var MercurialCommands = require('../mercurial/commands');

var CommandProcessError = Errors.CommandProcessError;
var CommandResult = Errors.CommandResult;

var commandConfigs = {
  'git': GitCommands.commandConfig,
  'hg': MercurialCommands.commandConfig
};

var optionSpecs = null;

var commands = {
  execute: function(vcs, name, engine, commandObj) {
    if (!commandConfigs[vcs][name]) {
      throw new Error('i don\'t have a command for ' + name);
    }
    var config = commandConfigs[vcs][name];
    if (config.delegate) {
      return this.delegateExecute(config, engine, commandObj);
    }

    config.execute.call(this, engine, commandObj);
  },

  delegateExecute: function(config, engine, commandObj) {
    // we have delegated to another vcs command, so lets
    // execute that and get the result
    var result = config.delegate.call(this, engine, commandObj);

    if (result.multiDelegate) {
      // we need to do multiple delegations with
      // a different command at each step
      result.multiDelegate.forEach(function(delConfig) {
        // copy command, and then set opts
        commandObj.setOptionsMap(delConfig.options || {});
        commandObj.setGeneralArgs(delConfig.args || []);

        commandConfigs[delConfig.vcs][delConfig.name].execute.call(this, engine, commandObj);
      }, this);
    } else {
      config = commandConfigs[result.vcs][result.name];
      // commandObj is PASSED BY REFERENCE
      // and modified in the function
      commandConfigs[result.vcs][result.name].execute.call(this, engine, commandObj);
    }
  },

  blankMap: function() {
    return {git: {}, hg: {}};
  },

  getShortcutMap: function() {
    var map = this.blankMap();
    this.loop(function(config, name, vcs) {
      if (!config.sc) {
        return;
      }
      map[vcs][name] = config.sc;
    }, this);
    return map;
  },

  /**
   * The normalized option specs ({names, args}) for every command, keyed
   * like the other maps. Built once, since the configs never change.
   */
  getOptionSpecs: function() {
    if (!optionSpecs) {
      optionSpecs = this.blankMap();
      this.loop(function(config, name, vcs) {
        var displayName = config.displayName || name;
        optionSpecs[vcs][displayName] = OptionParser.normalizeOptions(config.options);
      });
    }
    return optionSpecs;
  },

  /**
   * Every option name each command understands (aliases included), e.g.
   * {git: {commit: {'-m': false, '--message': false, ...}}}. Used for help.
   */
  getOptionMap: function() {
    var optionMap = this.blankMap();
    var specs = this.getOptionSpecs();
    Object.keys(specs).forEach(function(vcs) {
      Object.keys(specs[vcs]).forEach(function(displayName) {
        var thisMap = {};
        specs[vcs][displayName].forEach(function(spec) {
          spec.names.forEach(function(name) {
            thisMap[name] = false;
          });
        });
        optionMap[vcs][displayName] = thisMap;
      });
    });
    return optionMap;
  },

  getRegexMap: function() {
    var map = this.blankMap();
    this.loop(function(config, name, vcs) {
      var displayName = config.displayName || name;
      map[vcs][displayName] = config.regex;
    });
    return map;
  },

  getDescriptionMap: function() {
    var map = this.blankMap();
    this.loop(function(config, name, vcs) {
      var displayName = config.displayName || name;
      if (config.descriptionKey) {
        map[vcs][displayName] = intl.str(config.descriptionKey);
      }
    });
    return map;
  },
  /**
   * which commands count for the git golf game
   */
  getCommandsThatCount: function() {
    var counted = this.blankMap();
    this.loop(function(config, name, vcs) {
      if (config.dontCountForGolf) {
        return;
      }
      counted[vcs][name] = config.regex;
    });
    return counted;
  },

  loop: function(callback, context) {
    Object.keys(commandConfigs).forEach(function(vcs) {
      var commandConfig = commandConfigs[vcs];
      Object.keys(commandConfig).forEach(function(name) {
        var config = commandConfig[name];
        callback(config, name, vcs);
      });
    });
  }
};

var parse = function(str) {
  var vcs;
  var method;

  // see if we support this particular command
  var regexMap = commands.getRegexMap();
  Object.keys(regexMap).forEach(function (thisVCS) {
    var map = regexMap[thisVCS];
    Object.keys(map).forEach(function(thisMethod) {
      var regex = map[thisMethod];
      if (regex.exec(str)) {
        vcs = thisVCS;
        method = thisMethod;
      }
    });
  });

  if (!method) {
    return false;
  }

  // we support this command! every valid regex has to have the parts of
  // <vcs> <command> <stuff>, so the words after the first two are the
  // options and arguments that the command's option specs know how to read
  var lexed = commandLine.tokenize(str);
  var options = lexed.tokens.slice(2);
  var parsed;
  if (lexed.unterminated) {
    parsed = {
      options: {},
      args: [],
      error: new CommandProcessError({
        msg: intl.str('command-unterminated-quote', { command: str })
      })
    };
  } else {
    parsed = OptionParser.parseArguments(
      commands.getOptionSpecs()[vcs][method],
      options
    );
  }

  return {
    toSet: {
      generalArgs: parsed.args,
      supportedMap: parsed.options,
      error: parsed.error,
      vcs: vcs,
      method: method,
      options: options,
      eventName: 'processGitCommand'
    }
  };
};

exports.commands = commands;
exports.parse = parse;
