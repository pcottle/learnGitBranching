var _ = require('underscore');
var intl = require('../intl');

var Errors = require('../util/errors');
var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var shortcutMap = {
  'git commit': /^(gc|git ci)($|\s)/,
  'git add': /^ga($|\s)/,
  'git checkout': /^(go|git co)($|\s)/,
  'git rebase': /^gr($|\s)/,
  'git branch': /^(gb|git br)($|\s)/,
  'git status': /^(gst|gs|git st)($|\s)/,
  'git help': /^git$/
};

var instantCommands = [
  [/^git help($|\s)/, function() {
    var lines = [
      intl.str('git-version'),
      '<br/>',
      intl.str('git-usage'),
      _.escape(intl.str('git-usage-command')),
      '<br/>',
      intl.str('git-supported-commands'),
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
  }]
];

var regexMap = {
  // ($|\s) means that we either have to end the string
  // after the command or there needs to be a space for options
  'git commit': /^git +commit($|\s)/,
  'git add': /^git +add($|\s)/,
  'git checkout': /^git +checkout($|\s)/,
  'git rebase': /^git +rebase($|\s)/,
  'git reset': /^git +reset($|\s)/,
  'git branch': /^git +branch($|\s)/,
  'git revert': /^git +revert($|\s)/,
  'git log': /^git +log($|\s)/,
  'git merge': /^git +merge($|\s)/,
  'git show': /^git +show($|\s)/,
  'git status': /^git +status($|\s)/,
  'git cherry-pick': /^git +cherry-pick($|\s)/
};

var parse = function(str) {
  var method;
  var options;

  // see if we support this particular command
  _.each(regexMap, function(regex, thisMethod) {
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
  var parsedOptions = new GitOptionParser(method, options);
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
 * GitOptionParser
 */
function GitOptionParser(method, options) {
  this.method = method;
  this.rawOptions = options;

  this.supportedMap = this.getMasterOptionMap()[method];
  if (this.supportedMap === undefined) {
    throw new Error('No option map for ' + method);
  }

  this.generalArgs = [];
  this.explodeAndSet();
}

GitOptionParser.prototype.getMasterOptionMap = function() {
  // here a value of false means that we support it, even if its just a
  // pass-through option. If the value is not here (aka will be undefined
  // when accessed), we do not support it.
  return {
    commit: {
      '--amend': false,
      '-a': false, // warning
      '-am': false, // warning
      '-m': false
    },
    status: {},
    log: {},
    add: {},
    'cherry-pick': {},
    branch: {
      '-d': false,
      '-D': false,
      '-f': false,
      '--contains': false
    },
    checkout: {
      '-b': false,
      '-B': false,
      '-': false
    },
    reset: {
      '--hard': false,
      '--soft': false // this will raise an error but we catch it in gitEngine
    },
    merge: {},
    rebase: {
      '-i': false // the mother of all options
    },
    revert: {},
    show: {}
  };
};

GitOptionParser.prototype.explodeAndSet = function() {
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

exports.shortcutMap = shortcutMap;
exports.instantCommands = instantCommands;
exports.parse = parse;
exports.regexMap = regexMap;

