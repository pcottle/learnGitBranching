var _ = require('underscore');
var Backbone = require('backbone');
var Q = require('q');

var util = require('../util');
var Main = require('../app');

var Visualization = require('../visuals/visualization').Visualization;
var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var Level = require('../level').Level;

var Command = require('../models/commandModel').Command;
var GitShim = require('../git/gitShim').GitShim;

var MultiView = require('../views/multiView').MultiView;
var CanvasTerminalHolder = require('../views').CanvasTerminalHolder;
var ConfirmCancelTerminal = require('../views').ConfirmCancelTerminal;
var NextLevelConfirm = require('../views').NextLevelConfirm;
var LevelToolbar = require('../views').LevelToolbar;

var LevelBuilder = Level.extend({
  initialize: function(options) {
    options = options || {};
    this.options = options;
    this.level = {};

    this.levelToolbar = new LevelToolbar({
      name: 'Level Builder'
    });

    this.level.startDialog = {
    };

    // call our grandparent, not us
    Level.__super__.initialize.apply(this, [options]);
  },

  takeControl: function() {
    Main.getEventBaton().stealBaton('processLevelBuilderCommand', this.processLevelCommand, this);

    LevelBuilder.__super__.takeControl.apply(this);
  },

  releaseControl: function() {
    Main.getEventBaton().releaseBaton('processLevelBuilderCommand', this.processLevelCommand, this);

    LevelBuilder.__super__.releaseControl.apply(this);
  },
});

exports.LevelBuilder = LevelBuilder;
