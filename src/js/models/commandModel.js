var _ = require('underscore');
var Backbone = require('backbone');

var Errors = require('../util/errors');

var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var intl = require('../intl');

var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var Command = Backbone.Model.extend({
  defaults: {
    status: 'inqueue',
    rawStr: null,
    result: '',
    createTime: null,

    error: null,
    warnings: null,
    parseWaterfall: new ParseWaterfall(),

    generalArgs: null,
    supportedMap: null,
    options: null,
    method: null

  },

  initialize: function() {
    this.initDefaults();
    this.validateAtInit();

    this.on('change:error', this.errorChanged, this);
    // catch errors on init
    if (this.get('error')) {
      this.errorChanged();
    }

    this.parseOrCatch();
  },

  initDefaults: function() {
    // weird things happen with defaults if you dont
    // make new objects
    this.set('generalArgs', []);
    this.set('supportedMap', {});
    this.set('warnings', []);
  },

  replaceDotWithHead: function(string) {
    return string.replace(/\./g, 'HEAD');
  },

  /**
   * Since mercurial always wants revisions with
   * -r, we want to just make these general
   * args for git
   */
  appendOptionR: function() {
    var rOptions = this.getOptionsMap()['-r'] || [];
    this.setGeneralArgs(
      this.getGeneralArgs().concat(rOptions)
    );
  },

  // if order is important
  prependOptionR: function() {
    var rOptions = this.getOptionsMap()['-r'] || [];
    this.setGeneralArgs(
      rOptions.concat(this.getGeneralArgs())
    );
  },

  mapDotToHead: function() {
    var generalArgs = this.getGeneralArgs();
    var options = this.getOptionsMap();
    
    generalArgs = _.map(generalArgs, function(arg) {
      return this.replaceDotWithHead(arg);
    }, this);
    var newMap = {};
    _.each(options, function(args, key) {
      newMap[key] = _.map(args, function(arg) {
        return this.replaceDotWithHead(arg);
      }, this);
    }, this);
    this.setGeneralArgs(generalArgs);
    this.setOptionsMap(newMap);
  },

  deleteOptions: function(options) {
    var map = this.getOptionsMap();
    _.each(options, function(option) {
      delete map[option];
    }, this);
    this.setOptionsMap(map);
  },

  getGeneralArgs: function() {
    return this.get('generalArgs');
  },

  setGeneralArgs: function(args) {
    this.set('generalArgs', args);
  },

  setOptionsMap: function(map) {
    this.set('supportedMap', map);
  },

  getOptionsMap: function() {
    return this.get('supportedMap');
  },

  acceptNoGeneralArgs: function() {
    if (this.getGeneralArgs().length) {
      throw new GitError({
        msg: intl.str('git-error-no-general-args')
      });
    }
  },

  oneArgImpliedHead: function(args, option) {
    this.validateArgBounds(args, 0, 1, option);
    // and if it's one, add a HEAD to the back
    if (args.length === 0) {
      args.push('HEAD');
    }
  },

  twoArgsImpliedHead: function(args, option) {
    // our args we expect to be between 1 and 2
    this.validateArgBounds(args, 1, 2, option);
    // and if it's one, add a HEAD to the back
    if (args.length == 1) {
      args.push('HEAD');
    }
  },

  oneArgImpliedOrigin: function(args) {
    this.validateArgBounds(args, 0, 1);
    if (!args.length) {
      args.unshift('origin');
    }
  },

  twoArgsForOrigin: function(args) {
    this.validateArgBounds(args, 0, 2);
  },

  // this is a little utility class to help arg validation that happens over and over again
  validateArgBounds: function(args, lower, upper, option) {
    var what = (option === undefined) ?
      'git ' + this.get('method') :
      this.get('method') + ' ' + option + ' ';
    what = 'with ' + what;

    if (args.length < lower) {
      throw new GitError({
        msg: intl.str(
          'git-error-args-few',
          {
            lower: String(lower),
            what: what
          }
        )
      });
    }
    if (args.length > upper) {
      throw new GitError({
        msg: intl.str(
          'git-error-args-many',
          {
            upper: String(upper),
            what: what
          }
        )
      });
    }
  },

  validateAtInit: function() {
    if (this.get('rawStr') === null) {
      throw new Error('Give me a string!');
    }
    if (!this.get('createTime')) {
      this.set('createTime', new Date().toString());
    }
  },

  setResult: function(msg) {
    this.set('result', msg);
  },

  finishWith: function(deferred) {
    this.set('status', 'finished');
    deferred.resolve();
  },

  addWarning: function(msg) {
    this.get('warnings').push(msg);
    // change numWarnings so the change event fires. This is bizarre -- Backbone can't
    // detect if an array changes, so adding an element does nothing
    this.set('numWarnings', this.get('numWarnings') ? this.get('numWarnings') + 1 : 1);
  },

  parseOrCatch: function() {
    this.expandShortcuts(this.get('rawStr'));
    try {
      this.processInstants();
    } catch (err) {
      Errors.filterError(err);
      // errorChanged() will handle status and all of that
      this.set('error', err);
      return;
    }

    if (this.parseAll()) {
      // something in our parse waterfall succeeded
      return;
    }

    // if we reach here, this command is not supported :-/
    this.set('error', new CommandProcessError({
        msg: 'The command "' + this.get('rawStr') + '" isn\'t supported, sorry!'
      })
    );
  },

  errorChanged: function() {
    var err = this.get('error');
    if (!err) { return; }
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
    this.set('result', this.get('error').getMsg());
  },

  expandShortcuts: function(str) {
    str = this.get('parseWaterfall').expandAllShortcuts(str);
    this.set('rawStr', str);
  },

  processInstants: function() {
    var str = this.get('rawStr');
    // first if the string is empty, they just want a blank line
    if (!str.length) {
      throw new CommandResult({msg: ""});
    }

    // then instant commands that will throw
    this.get('parseWaterfall').processAllInstants(str);
  },

  parseAll: function() {
    var str = this.get('rawStr');
    var results = this.get('parseWaterfall').parseAll(str);

    if (!results) {
      // nothing parsed successfully
      return false;
    }

    _.each(results.toSet, function(obj, key) {
      // data comes back from the parsing functions like
      // options (etc) that need to be set
      this.set(key, obj);
    }, this);
    return true;
  }
});

exports.Command = Command;
