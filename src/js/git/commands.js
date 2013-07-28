var _ = require('underscore');
var intl = require('../intl');

var Commands = require('../commands');
var Errors = require('../util/errors');
var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var instantCommands = [
  [/^(git help($|\s)|git$)/, function() {
    var lines = [
      intl.str('git-version'),
      '<br/>',
      intl.str('git-usage'),
      _.escape(intl.str('git-usage-command')),
      '<br/>',
      intl.str('git-supported-commands'),
      '<br/>'
    ];
    var commands = Commands.getOptionMap();
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
  }]
];

var parse = function(str) {
  var method;
  var options;

  // see if we support this particular command
  _.each(Commands.getRegexMap(), function(regex, thisMethod) {
    if (regex.exec(str)) {
      options = str.slice(thisMethod.length + 1);
      method = thisMethod.slice('git '.length);
    }
  });

  if (!method) {
    return false;
  }

  // we support this command!
  // parse off the options and assemble the map / general args
  var parsedOptions = new CommandOptionParser(method, options);
  return {
    toSet: {
      generalArgs: parsedOptions.generalArgs,
      supportedMap: parsedOptions.supportedMap,
      method: method,
      options: options,
      eventName: 'processGitCommand'
    }
  };
};

/**
 * CommandOptionParser
 */
function CommandOptionParser(method, options) {
  this.method = method;
  this.rawOptions = options;

  this.supportedMap = Commands.getOptionMap()[method];
  if (this.supportedMap === undefined) {
    throw new Error('No option map for ' + method);
  }

  this.generalArgs = [];
  this.explodeAndSet();
}

var optionMap = {};
Commands.loop(function(config, name) {
  var displayName = config.displayName || name;
  if (optionMap[displayName] !== undefined) {
    return;
  }

  var thisMap = {};
  _.each(config.options, function(option) {
    thisMap[option] = false;
  });
  optionMap[displayName] = thisMap;
});

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

exports.instantCommands = instantCommands;
exports.parse = parse;

