var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? Backbone = require('backbone') : Backbone = window.Backbone;

var Commit = require('../git').Commit;
var Branch = require('../git').Branch;
var Tag = require('../git').Tag;

var Command = require('../models/commandModel').Command;
var CommandEntry = require('../models/commandModel').CommandEntry;
var TIME = require('../util/constants').TIME;

var CommitCollection = Backbone.Collection.extend({
  model: Commit
});

var CommandCollection = Backbone.Collection.extend({
  model: Command
});

var BranchCollection = Backbone.Collection.extend({
  model: Branch
});

var TagCollection = Backbone.Collection.extend({
  model: Tag
});

var CommandEntryCollection = Backbone.Collection.extend({
  model: CommandEntry,
  localStorage: (Backbone.LocalStorage) ? new Backbone.LocalStorage('CommandEntries') : null
});

var CommandBuffer = Backbone.Model.extend({
  defaults: {
    collection: null
  },

  initialize: function(options) {
    options.collection.bind('add', this.addCommand, this);

    this.buffer = [];
    this.timeout = null;
  },

  addCommand: function(command) {
    this.buffer.push(command);
    this.touchBuffer();
  },

  touchBuffer: function() {
    // touch buffer just essentially means we just check if our buffer is being
    // processed. if it's not, we immediately process the first item
    // and then set the timeout.
    if (this.timeout) {
      // timeout existence implies its being processed
      return;
    }
    this.setTimeout();
  },


  setTimeout: function() {
    this.timeout = setTimeout(_.bind(function() {
        this.sipFromBuffer();
    }, this), TIME.betweenCommandsDelay);
  },

  popAndProcess: function() {
    var popped = this.buffer.shift(0);

    // find a command with no error (aka unprocessed)
    while (popped.get('error') && this.buffer.length) {
      popped = this.buffer.shift(0);
    }
    if (!popped.get('error')) {
      this.processCommand(popped);
    } else {
      // no more commands to process
      this.clear();
    }
  },

  processCommand: function(command) {
    command.set('status', 'processing');

    var deferred = Q.defer();
    deferred.promise.then(_.bind(function() {
      this.setTimeout();
    }, this));

    var eventName = command.get('eventName');
    if (!eventName) {
      throw new Error('I need an event to trigger when this guy is parsed and ready');
    }

    var Main = require('../app');
    var eventBaton = Main.getEventBaton();

    var numListeners = eventBaton.getNumListeners(eventName);
    if (!numListeners) {
      var Errors = require('../util/errors');
      command.set('error', new Errors.GitError({
        msg: 'That command is valid, but not supported in this current environment!' +
             ' Try entering a level or level builder to use that command'
      }));
      deferred.resolve();
      return;
    }

    Main.getEventBaton().trigger(eventName, command, deferred);
  },

  clear: function() {
    clearTimeout(this.timeout);
    this.timeout = null;
  },

  sipFromBuffer: function() {
    if (!this.buffer.length) {
      this.clear();
      return;
    }

    this.popAndProcess();
  }
});

exports.CommitCollection = CommitCollection;
exports.CommandCollection = CommandCollection;
exports.BranchCollection = BranchCollection;
exports.TagCollection = TagCollection;
exports.CommandEntryCollection = CommandEntryCollection;
exports.CommandBuffer = CommandBuffer;

