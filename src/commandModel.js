var Command = Backbone.Model.extend({
  defaults: {
    status: 'inqueue',
    rawStr: null,
    result: '',

    error: null,
    warnings: null,

    generalArgs: null,
    supportedMap: null,
    options: null,
    method: null,

    createTime: null
  },

  validateAtInit: function() {
    // weird things happen with defaults if you dont
    // make new objects
    this.set('generalArgs', []);
    this.set('supportedMap', {});
    this.set('warnings', []);

    if (this.get('rawStr') === null) {
      throw new Error('Give me a string!');
    }
    if (!this.get('createTime')) {
      this.set('createTime', new Date().toString());
    }


    this.on('change:error', this.errorChanged, this);
    // catch errors on init
    if (this.get('error')) {
      this.errorChanged();
    }
  },

  setResult: function(msg) {
    this.set('result', msg);
  },

  addWarning: function(msg) {
    this.get('warnings').push(msg);
    // change numWarnings so the change event fires. This is bizarre -- Backbone can't
    // detect if an array changes, so adding an element does nothing
    this.set('numWarnings', this.get('numWarnings') ? this.get('numWarnings') + 1 : 1);
  },

  getFormattedWarnings: function() {
    if (!this.get('warnings').length) {
      return '';
    }
    var i = '<i class="icon-exclamation-sign"></i>';
    return '<p>' + i + this.get('warnings').join('</p><p>' + i) + '</p>';
  },

  initialize: function() {
    this.validateAtInit();
    this.parseOrCatch();
  },

  parseOrCatch: function() {
    try {
      this.parse();
    } catch (err) {
      if (err instanceof CommandProcessError ||
          err instanceof GitError ||
          err instanceof CommandResult ||
          err instanceof Warning) {
        // errorChanged() will handle status and all of that
        this.set('error', err);
      } else {
        throw err;
      }
    }
  },

  errorChanged: function() {
    var err = this.get('error');
    if (err instanceof CommandProcessError ||
        err instanceof GitError) {
      this.set('status', 'error');
    } else if (err instanceof CommandResult) {
      this.set('status', 'finished');
    } else if (err instanceof Warning) {
      this.set('status', 'warning');
    }
    this.formatError();
  },

  formatError: function() {
    this.set('result', this.get('error').toResult());
  },

  getShortcutMap: function() {
    return {
      'git commit': /^gc($|\s)/,
      'git add': /^ga($|\s)/,
      'git checkout': /^gchk($|\s)/,
      'git rebase': /^gr($|\s)/,
      'git branch': /^gb($|\s)/
    };
  },

  getRegexMap: function() {
    return {
      // ($|\s) means that we either have to end the string
      // after the command or there needs to be a space for options
      commit: /^commit($|\s)/,
      add: /^add($|\s)/,
      checkout: /^checkout($|\s)/,
      rebase: /^rebase($|\s)/,
      reset: /^reset($|\s)/,
      branch: /^branch($|\s)/,
      revert: /^revert($|\s)/,
      log: /^log($|\s)/,
      merge: /^merge($|\s)/,
      show: /^show($|\s)/,
      status: /^status($|\s)/,
      'cherry-pick': /^cherry-pick($|\s)/
    };
  },

  getSandboxCommands: function() {
    return [
      [/^ls/, function() {
        throw new CommandResult({
          msg: "DontWorryAboutFilesInThisDemo.txt"
        });
      }],
      [/^cd/, function() {
        throw new CommandResult({
          msg: "Directory Changed to '/directories/dont/matter/in/this/demo'"
        });
      }],
      [/^git$/, function() {
        var lines = [
          'Git Version PCOTTLE.1.0',
          '<br/>',
          'Usage:',
          _.escape('\t git <command> [<args>]'),
          '<br/>',
          'Supported commands:',
          '<br/>',
        ];
        var commands = OptionParser.prototype.getMasterOptionMap();

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
      }],
      [/^refresh$/, function() {
        events.trigger('refreshTree');
        throw new CommandResult({
          msg: "Refreshing tree..."
        });
      }],
      [/^rollup (\d+)$/, function(bits) {
        // go roll up these commands by joining them with semicolons
        events.trigger('rollupCommands', bits[1]);
        throw new CommandResult({
          msg: 'Commands combined!'
        });
      }]
    ];
  },

  parse: function() {
    var str = this.get('rawStr');
    // first if the string is empty, they just want a blank line
    if (!str.length) {
      throw new CommandResult({msg: ""});
    }

    // then check if it's one of our sandbox commands
    _.each(this.getSandboxCommands(), function(tuple) {
      var regex = tuple[0];
      var results = regex.exec(str);
      if (results) {
        tuple[1](results);
      }
    });

    // then check if shortcut exists, and replace, but
    // preserve options if so
    _.each(this.getShortcutMap(), function(regex, method) {
      var results = regex.exec(str);
      if (results) {
        str = method + ' ' + str.slice(results[0].length);
      }
    });

    // see if begins with git
    if (str.slice(0,3) !== 'git') {
      throw new CommandProcessError({
        msg: 'That command is not supported, sorry!'
      });
    }

    // ok, we have a (probably) valid command. actually parse it
    this.gitParse(str);
  },

  gitParse: function(str) {
    // now slice off command part
    var fullCommand = str.slice('git '.length);

    // see if we support this particular command
    _.each(this.getRegexMap(), function(regex, method) {
      if (regex.exec(fullCommand)) {
        this.set('options', fullCommand.slice(method.length + 1));
        this.set('method', method);
        // we should stop iterating, but the regex will only match
        // one command in practice. we could stop iterating if we used
        // jqeurys for each but im using underscore (for no real reason other
        // than style)
      }
    }, this);

    if (!this.get('method')) {
      throw new CommandProcessError({
        msg: "Sorry, this demo does not support that git command: " + fullCommand
      });
    }

    // parse off the options and assemble the map / general args
    var optionParser = new OptionParser(this.get('method'), this.get('options'));

    // steal these away so we can be completely JSON
    this.set('generalArgs', optionParser.generalArgs);
    this.set('supportedMap', optionParser.supportedMap);
  },
});

/**
 * OptionParser
 */
function OptionParser(method, options) {
  this.method = method;
  this.rawOptions = options;

  this.supportedMap = this.getMasterOptionMap()[method];
  if (this.supportedMap === undefined) {
    throw new Error('No option map for ' + method);
  }

  this.generalArgs = [];
  this.explodeAndSet();
}

OptionParser.prototype.getMasterOptionMap = function() {
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
      '-f': false
    },
    checkout: {
      '-b': false,
      '-B': false
    },
    reset: {
      '--hard': false,
      '--soft': false, // this will raise an error but we catch it in gitEngine
    },
    merge: {},
    rebase: {
      '-i': false // the mother of all options
    },
    revert: {},
    show: {}
  };
};

OptionParser.prototype.explodeAndSet = function() {
  // split on spaces, except when inside quotes

  var exploded = this.rawOptions.match(/('.*?'|".*?"|\S+)/g) || [];

  for (var i = 0; i < exploded.length; i++) {
    var part = exploded[i];
    if (part.slice(0,1) == '-') {
      // it's an option, check supportedMap
      if (this.supportedMap[part] === undefined) {
        throw new CommandProcessError({
          msg: 'The option "' + part + '" is not supported'
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

  // done!
};

// command entry is for the commandview
var CommandEntry = Backbone.Model.extend({
  defaults: {
    text: ''
  },
  localStorage: new Backbone.LocalStorage('CommandEntries')
});

