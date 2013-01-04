var _ = require('underscore');
var Backbone = require('backbone');
var Q = require('q');

var util = require('../util');
var Main = require('../app');

var Sandbox = require('../level/sandbox').Sandbox;

var Visualization = require('../visuals/visualization').Visualization;
var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var DisabledMap = require('../level/disabledMap').DisabledMap;
var Command = require('../models/commandModel').Command;
var GitShim = require('../git/gitShim').GitShim;

var ModalTerminal = require('../views').ModalTerminal;
var ModalAlert = require('../views').ModalAlert;
var MultiView = require('../views/multiView').MultiView;

var TreeCompare = require('../git/treeCompare').TreeCompare;

var Level = Sandbox.extend({
  initialize: function(options) {
    options = options || {};
    options.level = options.level || {};

    this.gitCommandsIssued = 0;
    this.commandsThatCount = this.getCommandsThatCount();
    this.solved = false;

    // possible options on how stringent to be on comparisons go here
    this.treeCompare = new TreeCompare();

    this.goalTreeString = options.level.goalTree;
    if (!this.goalTreeString) {
      console.warn('woah no goal, using random other one');
      this.goalTreeString = '{"branches":{"master":{"target":"C1","id":"master"},"win":{"target":"C2","id":"win"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"win","id":"HEAD"}}';
    }

    Sandbox.prototype.initialize.apply(this, [options]);
  },

  initVisualization: function(options) {
    if (!options.level.startTree) {
      console.warn('No start tree specified for this level!!! using default...');
    }
    this.mainVis = new Visualization({
      el: options.el || this.getDefaultVisEl(),
      treeString: options.level.startTree
    });

    this.initGoalVisualization(options);
  },

  getDefaultGoalVisEl: function() {
    return $('#commandLineHistory');
  },

  initGoalVisualization: function(options) {
    // first we make the goal visualization holder

    // then we make a visualization. the "el" here is the element to
    // track for size information. the container is where the canvas will be placed
    this.goalVis = new Visualization({
      el: options.goalEl || this.getDefaultGoalVisEl(),
      treeString: this.goalTreeString,
      wait: true,
      slideOut: true
    });
    this.goalVis.customEvents.on('paperReady', _.bind(function() {
      // this is tricky. at this point we have a canvas that has 0
      // opacity but its floating in front of our command history. we need
      // to move it out without an animation and then give it an opacity of 1
      this.goalVis.setTreeOpacity(1);
    }, this));
  },

  initParseWaterfall: function(options) {
    this.parseWaterfall = new ParseWaterfall();

    // if we want to disable certain commands...
    if (options.level.disabledMap) {
      // disable these other commands
      this.parseWaterfall.addFirst(
        'instantWaterfall',
        new DisabledMap({
          disabledMap: options.level.disabledMap
        }).getInstantCommands()
      );
    }

  },

  initGitShim: function(options) {
    // ok we definitely want a shim here
    this.gitShim = new GitShim({
      afterCB: _.bind(this.afterCommandCB, this),
      afterDeferHandler: _.bind(this.afterCommandDefer, this)
    });
  },

  getCommandsThatCount: function() {
    var GitCommands = require('../git/commands');
    var toCount = [
      'git commit',
      'git checkout',
      'git rebase',
      'git reset',
      'git branch',
      'git revert',
      'git merge',
      'git cherry-pick'
    ];
    var myRegexMap = {};
    _.each(toCount, function(method) {
      if (!GitCommands.regexMap[method]) { throw new Error('wut no regex'); }

      myRegexMap[method] = GitCommands.regexMap[method];
    });
    return myRegexMap;
  },

  afterCommandCB: function(command) {
    var matched = false;
    _.each(this.commandsThatCount, function(regex) {
      matched = matched || regex.test(command.get('rawStr'));
    });
    if (matched) {
      this.gitCommandsIssued++;
    }
  },

  afterCommandDefer: function(defer, command) {
    if (this.solved) {
      command.addWarning(
        "You've already solved this level, try other levels with 'show levels'" +
        "or go back to the sandbox with 'sandbox'"
      );
      defer.resolve();
      return;
    }

    // ok so lets see if they solved it...
    var current = this.mainVis.gitEngine.exportTree();
    var solved = this.treeCompare.compareTrees(current, this.goalTreeString);

    if (!solved) {
      defer.resolve();
      return;
    }

    // woohoo!!! they solved the level, lets animate and such
    this.levelSolved(defer);
  },

  levelSolved: function(defer) {
    this.solved = true;
    this.mainVis.gitVisuals.finishAnimation()
    .then(function() {
      defer.resolve();
    });
  },

  getInstantCommands: function() {

  },

  parse: function() {

  }
});

exports.Level = Level;

