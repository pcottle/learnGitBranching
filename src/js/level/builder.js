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
  'define goal': /^define goal$/,
  'define start': /^define start$/,
  'show start': /^show start$/,
  'hide start': /^hide start$/
};

var parse = util.genParseCommand(regexMap, 'processLevelBuilderCommand');

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

    this.initStartVisualization();

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

  initGoalData: function() {
    // add some default behavior in the beginning
    this.level.goalTreeString = '{"branches":{"master":{"target":"C1","id":"master"},"makeLevel":{"target":"C2","id":"makeLevel"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"makeLevel","id":"HEAD"}}';
    this.level.solutionCommand = 'git checkout -b makeLevel; git commit';
    LevelBuilder.__super__.initGoalData.apply(this, arguments);
  },

  initStartVisualization: function() {
    this.startCanvasHolder = new CanvasTerminalHolder({
      additionalClass: 'startTree'
    });

    this.startVis = new Visualization({
      el: this.startCanvasHolder.getCanvasLocation(),
      containerElement: this.startCanvasHolder.getCanvasLocation(),
      treeString: this.level.startTree,
      noKeyboardInput: true,
      noClick: true
    });
  },

  startDie: function() {
    this.startCanvasHolder.die();
    this.startVis.die();
  },

  startOffCommand: function() {
    Main.getEventBaton().trigger(
      'commandSubmitted',
      'echo "Get Building!!"'
    );
  },

  initParseWaterfall: function(options) {
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

  buildLevel: function(command, deferred) {
    this.exitLevel();

    setTimeout(function() {
      Main.getSandbox().buildLevel(command, deferred);
    }, this.getAnimationTime() * 1.5);
  },

  getInstantCommands: function() {
    return [];
  },

  takeControl: function() {
    Main.getEventBaton().stealBaton('processLevelBuilderCommand', this.processLevelBuilderCommand, this);

    LevelBuilder.__super__.takeControl.apply(this);
  },

  releaseControl: function() {
    Main.getEventBaton().releaseBaton('processLevelBuilderCommand', this.processLevelBuilderCommand, this);

    LevelBuilder.__super__.releaseControl.apply(this);
  },

  showGoal: function() {
    this.startCanvasHolder.slideOut();
    LevelBuilder.__super__.showGoal.apply(this, arguments);
  },

  showStart: function(command, deferred) {
    this.goalCanvasHolder.slideOut();
    this.startCanvasHolder.slideIn();

    setTimeout(function() {
      command.finishWith(deferred);
    }, this.startCanvasHolder.getAnimationTime());
  },

  hideStart: function(command, deferred) {
    this.startCanvasHolder.slideOut();

    setTimeout(function() {
      command.finishWith(deferred);
    }, this.startCanvasHolder.getAnimationTime());
  },

  defineStart: function(command, deferred) {
    this.startDie();

    command.addWarning(
      'Defining start point... solution and goal will be overwritten if they were defined earlier'
    );
    this.reset();
    this.solutionCommand = undefined;

    this.level.startTree = this.mainVis.gitEngine.printTree();
    this.initStartVisualization();

    this.showStart(command, deferred);
  },

  defineGoal: function(command, deferred) {
    this.goalDie();

    if (!this.gitCommandsIssued.length) {
      command.addWarning(
        'Your solution is empty!! something is amiss'
      );
    }

    this.solutionCommand = this.gitCommandsIssued.join(';');
    this.goalTreeString = this.mainVis.gitEngine.printTree();
    this.initGoalVisualization();

    this.showGoal(command, deferred);
  },

  processLevelBuilderCommand: function(command, deferred) {
    var methodMap = {
      'define goal': this.defineGoal,
      'define start': this.defineStart,
      'show start': this.showStart,
      'hide start': this.hideStart
    };

    methodMap[command.get('method')].apply(this, arguments);
  },

  afterCommandDefer: function(defer, command) {
    // we dont need to compare against the goal anymore
    defer.resolve();
  },

  die: function() {
    this.startDie();

    LevelBuilder.__super__.die.apply(this, arguments);

    delete this.startVis;
    delete this.startCanvasHolder;
  }
});

exports.LevelBuilder = LevelBuilder;
