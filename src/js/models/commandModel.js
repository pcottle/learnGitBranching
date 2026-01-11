// Command model - converted from Backbone to plain ES6 class

var Errors = require('../util/errors');

var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var LevelStore = require('../stores/LevelStore');
var intl = require('../intl');

var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

// Static counter for generating unique cid
var cidCounter = 0;

class Command {
  constructor(options = {}) {
    // Generate unique client ID (like Backbone's cid)
    this.cid = 'c' + cidCounter++;

    // Event listeners storage
    this._events = {};

    // Set defaults
    this.attributes = {
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
    };

    // Apply passed options
    Object.keys(options).forEach(function(key) {
      this.attributes[key] = options[key];
    }, this);

    this.initialize();
  }

  initialize() {
    this.initDefaults();
    this.validateAtInit();

    this.on('change:error', this.errorChanged, this);
    // catch errors on init
    if (this.get('error')) {
      this.errorChanged();
    }

    this.parseOrCatch();
  }

  // Simple event emitter methods
  on(eventName, callback, context) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push({ callback: callback, context: context || this });
  }

  off(eventName, callback) {
    if (!this._events[eventName]) return;
    if (!callback) {
      delete this._events[eventName];
    } else {
      this._events[eventName] = this._events[eventName].filter(function(listener) {
        return listener.callback !== callback;
      });
    }
  }

  trigger(eventName) {
    var listeners = this._events[eventName];
    if (!listeners) return;
    var args = Array.prototype.slice.call(arguments, 1);
    listeners.forEach(function(listener) {
      listener.callback.apply(listener.context, args);
    });
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    var oldValue = this.attributes[key];
    this.attributes[key] = value;
    // Trigger change event if value changed
    if (oldValue !== value) {
      this.trigger('change:' + key, this, value);
      this.trigger('change', this);
    }
  }

  toJSON() {
    return Object.assign({}, this.attributes);
  }

  destroy() {
    // Remove from collection if it has one
    if (this.collection) {
      this.collection.remove(this);
    }
    this.trigger('destroy', this);
  }

  initDefaults() {
    // weird things happen with defaults if you don't
    // make new objects
    this.set('generalArgs', []);
    this.set('supportedMap', {});
    this.set('warnings', []);
  }

  replaceDotWithHead(string) {
    return string.replace(/\./g, 'HEAD');
  }

  /**
   * Since mercurial always wants revisions with
   * -r, we want to just make these general
   * args for git
   */
  appendOptionR() {
    var rOptions = this.getOptionsMap()['-r'] || [];
    this.setGeneralArgs(
      this.getGeneralArgs().concat(rOptions)
    );
  }

  // if order is important
  prependOptionR() {
    var rOptions = this.getOptionsMap()['-r'] || [];
    this.setGeneralArgs(
      rOptions.concat(this.getGeneralArgs())
    );
  }

  mapDotToHead() {
    var generalArgs = this.getGeneralArgs();
    var options = this.getOptionsMap();

    generalArgs = generalArgs.map(function(arg) {
      return this.replaceDotWithHead(arg);
    }, this);
    var newMap = {};
    Object.keys(options).forEach(function(key) {
      var args = options[key];
      newMap[key] = Object.values(args).map(function (arg) {
        return this.replaceDotWithHead(arg);
      }, this);
    }, this);
    this.setGeneralArgs(generalArgs);
    this.setOptionsMap(newMap);
  }

  deleteOptions(options) {
    var map = this.getOptionsMap();
    options.forEach(function(option) {
      delete map[option];
    }, this);
    this.setOptionsMap(map);
  }

  getGeneralArgs() {
    return this.get('generalArgs');
  }

  setGeneralArgs(args) {
    this.set('generalArgs', args);
  }

  setOptionsMap(map) {
    this.set('supportedMap', map);
  }

  getOptionsMap() {
    return this.get('supportedMap');
  }

  acceptNoGeneralArgs() {
    if (this.getGeneralArgs().length) {
      throw new GitError({
        msg: intl.str('git-error-no-general-args')
      });
    }
  }

  argImpliedHead(args, lower, upper, option) {
    // our args we expect to be between {lower} and {upper}
    this.validateArgBounds(args, lower, upper, option);
    // and if it's one, add a HEAD to the back
    this.impliedHead(args, lower);
  }

  oneArgImpliedHead(args, option) {
    this.argImpliedHead(args, 0, 1, option);
  }

  twoArgsImpliedHead(args, option) {
    this.argImpliedHead(args, 1, 2, option);
  }

  threeArgsImpliedHead(args, option) {
    this.argImpliedHead(args, 2, 3, option);
  }

  oneArgImpliedOrigin(args) {
    this.validateArgBounds(args, 0, 1);
    if (!args.length) {
      args.unshift('origin');
    }
  }

  twoArgsForOrigin(args) {
    this.validateArgBounds(args, 0, 2);
  }

  impliedHead(args, min) {
    if(args.length == min) {
      args.push('HEAD');
    }
  }

  // this is a little utility class to help arg validation that happens over and over again
  validateArgBounds(args, lower, upper, option) {
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
  }

  validateAtInit() {
    if (this.get('rawStr') === null) {
      throw new Error('Give me a string!');
    }
    if (!this.get('createTime')) {
      this.set('createTime', new Date().toString());
    }
  }

  setResult(msg) {
    this.set('result', msg);
  }

  finishWith(deferred) {
    this.set('status', 'finished');
    deferred.resolve();
  }

  addWarning(msg) {
    this.get('warnings').push(msg);
    // change numWarnings so the change event fires. This is bizarre -- Backbone can't
    // detect if an array changes, so adding an element does nothing
    this.set('numWarnings', this.get('numWarnings') ? this.get('numWarnings') + 1 : 1);
  }

  parseOrCatch() {
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
        msg: intl.str(
          'git-error-command-not-supported',
          {
            command: this.get('rawStr')
          })
      })
    );
  }

  errorChanged() {
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
  }

  formatError() {
    this.set('result', this.get('error').getMsg());
  }

  expandShortcuts(str) {
    str = this.get('parseWaterfall').expandAllShortcuts(str);
    this.set('rawStr', str);
  }

  processInstants() {
    var str = this.get('rawStr');
    // first if the string is empty, they just want a blank line
    if (!str.length) {
      throw new CommandResult({msg: ""});
    }

    // then instant commands that will throw
    this.get('parseWaterfall').processAllInstants(str);
  }

  parseAll() {
    var rawInput = this.get('rawStr');
    const aliasMap = LevelStore.getAliasMap();
    for (var i = 0; i<Object.keys(aliasMap).length; i++) {
      var alias = Object.keys(aliasMap)[i];
      var searcher = new RegExp(alias + "(\\s|$)", "g");
      if (searcher.test(rawInput)) {
        rawInput = rawInput.replace(searcher, aliasMap[alias] + ' ');
        break;
      }
    }

    var results = this.get('parseWaterfall').parseAll(rawInput);

    if (!results) {
      // nothing parsed successfully
      return false;
    }

    Object.keys(results.toSet).forEach(function(key) {
      var obj = results.toSet[key];
      // data comes back from the parsing functions like
      // options (etc) that need to be set
      this.set(key, obj);
    }, this);
    return true;
  }
}

exports.Command = Command;
