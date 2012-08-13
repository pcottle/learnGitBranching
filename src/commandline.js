/**
 * class Command
 * @desc A parser for commands given
 */
function Command(str) {
  this.rawCommand = str;
  this.results = {
    msgs: []
  };
  this.command = null;

  this.parse(str);
}

Command.prototype.getShortcutMap = function() {
  return {
    gc: 'git commit',
    ga: 'git add',
    gchk: 'git checkout',
    gr: 'git rebase'
  };
};

Command.prototype.getRegexMap = function() {
  return {
    commit: /^commit /,
    add: /^add /,
    checkout: /^checkout /,
    rebase: /^rebase /,
    reset: /^reset /
  };
};

Command.prototype.parse = function(str) {
  // first check if shortcut exists, and replace
  str = this.getShortcutMap()[str] || str;

  // see if begins with git
  if (str.slice(0,3) !== 'git') {
    return this.nonGitCommand();
  }

  // now slice off command part
  this.command = str.slice(4);

  //TODO: underscore.js here
  _.each(this.getRegexMap(), function(regex, method) {
    if (regex.exec(this.command)) {
      this.options = this.command.slice(method.length + 1);
      // break out here
      this[method]();
      return false;
    }
  }, this);

  this.results.msgs.push('The git command "' + this.command +
    '" is not supported, sorry!');
};

Command.prototype.nonGitCommand = function() {
  this.results.error = {
    msg: 'Git only commands, sorry!'
  };
};

Command.prototype.commit = function() {
  this.results.msgs.push(
    'Commiting with options "' + this.options + '"'
  );

  // commit for us means simply either ammending the current commit
  // or just popping a new commit on top 
  var optionMap = {
    // supported options
    '--amend': false, 
    // pass through options, dont care but shouldnt fatal
    '-a': false,
    '-c': false,
    '-C': false
  };

  this.options = new OptionParser(this.command, optionMap);
  this.results.exec = function(gitEngine) {
    gitEngine.commit(optionMap);
  };
};

Command.prototype.add = function() {
  this.results.msgs.push(
    "This demo is meant to demonstrate git branching, so don't worry " +
    "about adding / staging files. Just go ahead and commit away!"
  );
};

Command.prototype.checkout = function() {

};

Command.prototype.rebase = function() {

};

Command.reset = function() {

};

/**
 * OptionParser
 */
function OptionParser(str, supportedMap) {
  this.str = str;
  this.supportedMap = supportedMap;
  this.results = {
    unsupportedOptions: []
  };

  this.explodeAndSet();
}

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
      this.results.unsupportedOptions.push(option);
    }
  }, this);
  // done!
};


