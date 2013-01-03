var _ = require('underscore');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var util = require('../util');
var Main = require('../app');

var Visualization = require('../visuals/visualization').Visualization;
var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var DisabledMap = require('../level/disabledMap').DisabledMap;
var Command = require('../models/commandModel').Command;
var GitShim = require('../git/gitShim').GitShim;

var ModalTerminal = require('../views').ModalTerminal;
var ModalAlert = require('../views').ModalAlert;

var MultiView = require('../views/multiView').MultiView;

var Sandbox = Backbone.View.extend({
  // tag name here is purely vestigial. I made this a view
  // simply to use inheritance and have a nice event system in place
  tagName: 'div',
  initialize: function(options) {
    options = options || {};

    this.initVisualization(options);
    this.initCommandCollection(options);
    this.initParseWaterfall(options);
    this.initGitShim(options);

    if (!options.wait) {
      this.takeControl();
    }
  },

  initVisualization: function(options) {
    this.mainVis = new Visualization({
      el: options.el || $('#canvasWrapper')[0]
    });
  },

  initCommandCollection: function(options) {
    // don't add it to just any collection -- adding to the
    // CommandUI collection will put in history
    this.commandCollection = Main.getCommandUI().commandCollection;
  },

  initParseWaterfall: function(options) {
    this.parseWaterfall = new ParseWaterfall();
    /* DISBALED MAP example!!!
    this.parseWaterfall.addFirst(
      'instantWaterfall',
      new DisabledMap().getInstantCommands()
    );*/
  },

  initGitShim: function(options) {
    /*
    this.gitShim = new GitShim({
      beforeCB: function() { console.log('before'); },
      afterCB: function() { console.log('after'); },
      afterDeferHandler: function(deferred) { deferred.resolve(); },
    });*/
  },

  takeControl: function() {
    // we will be handling commands that are submitted, mainly to add the sanadbox
    // functionality (which is included by default in ParseWaterfall())
    Main.getEventBaton().stealBaton('commandSubmitted', this.commandSubmitted, this);
    // we obviously take care of sandbox commands
    Main.getEventBaton().stealBaton('processSandboxCommand', this.processSandboxCommand, this);

    this.insertGitShim();
  },

  insertGitShim: function() {
    // and our git shim goes in after the git engine is ready so it doesn't steal the baton
    // too early
    if (this.gitShim) {
      this.mainVis.customEvents.on('gitEngineReady', function() {
          this.gitShim.insertShim();
      },this);
    }
  },

  commandSubmitted: function(value) {
    // allow other things to see this command (aka command history on terminal)
    Main.getEvents().trigger('commandSubmittedPassive', value);

    util.splitTextCommand(value, function(command) {
      this.commandCollection.add(new Command({
        rawStr: command,
        parseWaterfall: this.parseWaterfall
      }));
    }, this);
  },

  processSandboxCommand: function(command, deferred) {
    var commandMap = {
      help: this.helpDialog
    };
    var method = commandMap[command.get('method')];
    if (!method) { throw new Error('no method for that wut'); }

    method.apply(this, [command, deferred]);
  },

  helpDialog: function(command, deferred) {
    var helpDialog = new MultiView({
      childViews: require('../dialogs/sandbox').helpDialog
    });
    helpDialog.getPromise().then(_.bind(function() {
      // the view has been closed, lets go ahead and resolve our command
      command.finishWith(deferred);
    }, this))
    .done();
  }
});

exports.Sandbox = Sandbox;

