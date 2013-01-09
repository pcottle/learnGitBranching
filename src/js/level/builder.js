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

var regexMap = {
  'show goal': /^show goal$/,
  'hide goal': /^hide goal$/,
  'show solution': /^show solution$/
};

var LevelBuilder = Level.extend({
  initialize: function(options) {
    options = options || {};

    this.options = options;
    this.level = {};

    this.level.startDialog = {
      childViews: [{
        type: 'ModalAlert',
        options: {
          markdowns: [
            '## Welcome to the level builder!',
            '',
            'Here are the main steps:',
            '',
            '  * Define the starting tree',
            '  * Enter the series of git commands that compose of the (optimal) solution',
            '  * Define the goal tree, which also defines the solution',
            '  * Enter the command ```finish building``` to specify start dialogs and such'
          ]
        }
      }]
    };

    LevelBuilder.__super__.initialize.apply(this, [options]);

    // we wont be using this stuff, and its to delete to ensure we overwrite all functions that
    // include that functionality
    delete this.treeCompare;
    delete this.solved;
  },

  initName: function() {
    this.levelToolbar = new LevelToolbar({
      name: 'Level Builder'
    });
  },

  initGoalData: function(options) {
    // add some default behavior in the beginning
    this.level.goalTreeString = '{"branches":{"master":{"target":"C1","id":"master"},"makeLevel":{"target":"C2","id":"makeLevel"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"makeLevel","id":"HEAD"}}';
    this.level.solutionCommand = 'git checkout -b makeLevel; git commit';
    LevelBuilder.__super__.initGoalData.apply(this, [options]);
  },

  startOffCommand: function() {
    Main.getEventBaton().trigger(
      'commandSubmitted',
      'echo "Get Building!!"'
    );
  },

  initParseWaterfall: function() {
    LevelBuilder.__super__.initParseWaterfall.apply(this, [options]);

    this.parseWaterfall.addFirst(
      'parseWaterfall',
      parse
    );
    this.parseWaterfall.addFirst(
      'instantWaterfall',
      this.getInstantCommands()
    );
  },

  takeControl: function() {
    Main.getEventBaton().stealBaton('processLevelBuilderCommand', this.processLevelCommand, this);

    LevelBuilder.__super__.takeControl.apply(this);
  },

  releaseControl: function() {
    Main.getEventBaton().releaseBaton('processLevelBuilderCommand', this.processLevelCommand, this);

    LevelBuilder.__super__.releaseControl.apply(this);
  }
});

exports.LevelBuilder = LevelBuilder;
