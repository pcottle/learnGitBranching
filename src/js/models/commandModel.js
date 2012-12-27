var _ = require('underscore');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? Backbone = require('backbone') : Backbone = window.Backbone;

var Errors = require('../util/errors');
var GitCommands = require('../git/commands');
var GitOptionParser = GitCommands.GitOptionParser;

var sandboxInstantCommands = require('../level/sandboxCommands').sandboxInstantCommands;

var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

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
      Errors.filterError(err);
      // errorChanged() will handle status and all of that
      this.set('error', err);
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

  parse: function() {
    var str = this.get('rawStr');
    // first if the string is empty, they just want a blank line
    if (!str.length) {
      throw new CommandResult({msg: ""});
    }

    str = GitCommands.expandShortcut(str);
    this.set('rawStr', str);

    // then check if it's one of our sandbox commands
    _.each(sandboxInstantCommands, function(tuple) {
      var regex = tuple[0];
      var results = regex.exec(str);
      if (results) {
        // this will throw a result
        tuple[1](results);
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
    _.each(GitCommands.getRegexMap(), function(regex, method) {
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
    var options = new GitOptionParser(this.get('method'), this.get('options'));

    // steal these away so we can be completely JSON
    this.set('generalArgs', options.generalArgs);
    this.set('supportedMap', options.supportedMap);
  }
});

// command entry is for the commandview
var CommandEntry = Backbone.Model.extend({
  defaults: {
    text: ''
  },
  // stub out if no plugin available
  localStorage: (Backbone.LocalStorage) ? new Backbone.LocalStorage('CommandEntries') : null
});

exports.CommandEntry = CommandEntry;
exports.Command = Command;
