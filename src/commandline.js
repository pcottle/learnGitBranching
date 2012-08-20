/**
 * class Command
 * @desc A parser for commands given
 */
function Command(str) {
  this.fullCommand = null;
  this.options = null;
  this.method = null;

  this.parse(str);
}

Command.prototype.getShortcutMap = function() {
  return {
    'git commit': /^gc/,
    'git add': /^ga/,
    'git checkout': /^gchk/,
    'git rebase': /^gr/
  };
};

Command.prototype.getRegexMap = function() {
  return {
    // ($|\s) means that we either have to end the string
    // after the command or there needs to be a space for options
    commit: /^commit($|\s)/,
    add: /^add($|\s)/,
    checkout: /^checkout($|\s)/,
    rebase: /^rebase($|\s)/,
    reset: /^reset($|\s)/,
    revert: /^revert($|\s)/
  };
};

Command.prototype.parse = function(str) {
  // first check if shortcut exists, and replace, but
  // preserve options if so
  _.each(this.getShortcutMap(), function(regex, method) {
    var results = regex.exec(str);
    if (results) {
      str = method + str.slice(results[0].length);
    }
  });

  // see if begins with git
  if (str.slice(0,3) !== 'git') {
    throw new Error('Git commands only, sorry!');
  }

  // now slice off command part
  this.fullCommand = str.slice('git '.length);

  // see if we support this particular command
  var matched = false;
  _.each(this.getRegexMap(), function(regex, method) {
    if (regex.exec(this.fullCommand)) {
      this.options = this.fullCommand.slice(method.length + 1);
      this.method = method;
      // we should stop iterating, but the regex will only match
      // one command in practice
      matched = true;
    }
  }, this);

  if (!matched) {
    throw new Error(
      "Sorry, this demo does not support that git command: " + this.fullCommand
    );
  }

  this.optionParser = new OptionParser(this.method, this.options);
};

/**
 * OptionParser
 */
function OptionParser(method, options) {
  this.method = metho;d
  this.supportedMap = this.getMasterOptionMap()[method];
  this.unsupportedOptions = [];

  if (this.supportedMap === undefined) {
    throw new Error('No option map for ' + method);
  }

  this.explodeAndSet();
}

OptionParser.prototype.getMasterOptionMap = function() {
  // here a value of false means that we support it, even if its just a pass-through
  // option. If the value is not here (aka will be undefined later), we do not
  // support it
  return {
    commit: {
      '--amend': false,
      '-a': false
    },
    add: {},
    checkout: {},
    reset: {
      '--hard': false,
    },
    rebase: {},
    revert: {}
  };
};

OptionParser.prototype.explodeAndSet = function() {
  var exploded = this.str.split(' ');
  var options =[]; 

  _.each(exploded, function(part) {
    if (part.slice(0,1) == '-') {
      options.push(part);
    }
  });
  _.each(options, function(option) {
    if (this.supportedMap[option] !== undefined) {
      this.supportedMap[option] = true;
    } else {
      this.unsupportedOptions.push(option);
    }
  }, this);
  // done!
};


