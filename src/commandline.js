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
    'git rebase': /^gr/,
    'git branch': /^gb/
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
    branch: /^branch($|\s)/,
    revert: /^revert($|\s)/
  };
};

Command.prototype.getSandboxCommands = function() {
  return [
    [/^ls/, function() {
      throw new CommandResult("\
        DontWorryAboutFilesInThisDemo.txt\
      ");
    }],
    [/^cd/, function() {
      throw new CommandResult("\
        Directory Changed to '/directories/dont/matter/in/this/demo' \
      ");
    }],
    [/^git$/, function() {
      throw new CommandResult(_.escape("\
        Git Version \n \
        PCOTTLE.1.0 \
        Usage: \n \
          git <command> [<args>] \
      "));
    }]
  ];
};

Command.prototype.parse = function(str) {
  // first if the string is empty, they just want a blank line
  if (!str.length) {
    throw new CommandResult("");
  }

  // then check if it's one of our sandbox commands
  _.each(this.getSandboxCommands(), function(tuple) {
    var regex = tuple[0];
    if (regex.exec(str)) {
      tuple[1]();
    }
  });

  // then check if shortcut exists, and replace, but
  // preserve options if so
  _.each(this.getShortcutMap(), function(regex, method) {
    var results = regex.exec(str);
    if (results) {
      str = method + str.slice(results[0].length);
    }
  });

  // see if begins with git
  if (str.slice(0,3) !== 'git') {
    throw new CommandProcessError('Git commands only, sorry!');
  }

  // ok, we have a (probably) valid command. actually parse it
  this.gitParse(str);
};

Command.prototype.gitParse = function(str) {
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
    throw new CommandProcessError(
      "Sorry, this demo does not support that git command: " + this.fullCommand
    );
  }

  this.optionParser = new OptionParser(this.method, this.options);
};

/**
 * OptionParser
 */
function OptionParser(method, options) {
  this.method = method;
  this.options = options;

  this.supportedMap = this.getMasterOptionMap()[method];
  this.unsupportedOptions = [];

  if (this.supportedMap === undefined) {
    throw new Error('No option map for ' + method);
  }

  this.explodeAndSet();
}

OptionParser.prototype.getMasterOptionMap = function() {
  // here a value of false means that we support it, even if its just a
  // pass-through option. If the value is not here (aka will be undefined
  // when accessed), we do not support it.
  return {
    commit: {
      '--amend': false,
      '-a': false
    },
    add: {},
    branch: {
      '-d': false,
      '-D': false
    },
    checkout: {},
    reset: {
      '--hard': false,
    },
    rebase: {},
    revert: {}
  };
};

OptionParser.prototype.explodeAndSet = function() {
  var exploded = this.options.split(' ');
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


