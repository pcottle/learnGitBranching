var _ = require('underscore');
var Backbone = require('backbone');

var util = require('../util');
var Main = require('../app');

var Visualization = require('../visuals/visualization').Visualization;
var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var DisabledMap = require('../level/disabledMap').DisabledMap;
var Command = require('../models/commandModel').Command;

var ModalTerminal = require('../views').ModalTerminal;
var ModalAlert = require('../views').ModalAlert;

var MultiView = require('../views/multiView').MultiView;

function Sandbox(options) {
  options = options || {};

  this.mainVis = new Visualization({
    el: options.el || $('#canvasWrapper')[0]
  });

  // don't add it to just any collection -- adding to the
  // CommandUI collection will put in history
  this.commandCollection = Main.getCommandUI().commandCollection;

  this.parseWaterfall = new ParseWaterfall();
  this.parseWaterfall.addFirst(
    'instantWaterfall',
    new DisabledMap().getInstantCommands()
  );

  if (!options.defer) {
    this.takeControl();
  }
}

Sandbox.prototype.takeControl = function() {
  Main.getEventBaton().stealBaton('commandSubmitted', this.commandSubmitted, this);
  Main.getEvents().on('processSandboxCommand', this.processSandboxCommand, this);
};

Sandbox.prototype.commandSubmitted = function(value) {
  // allow other things to see this command
  Main.getEvents().trigger('commandSubmittedPassive', value);

  util.splitTextCommand(value, function(command) {
    this.commandCollection.add(new Command({
      rawStr: command,
      parseWaterfall: this.parseWaterfall
    }));
  }, this);
};

Sandbox.prototype.processSandboxCommand = function(command, callback) {
  var commandMap = {
    help: this.helpDialog
  };
  var method = commandMap[command.get('method')];
  if (!method) { throw new Error('no method for that wut'); }

  method.apply(this, [command, callback]);
};

Sandbox.prototype.helpDialog = function(command, callback) {
  var helpDialog = new MultiView({
    childViews: require('../dialogs/sandbox').helpDialog
  });
  helpDialog.getPromise().then(_.bind(function() {
    // the view has been closed, lets go ahead and resolve our command
    command.set('status', 'finished');
    callback();
  }, this))
  .done();
};

exports.Sandbox = Sandbox;

