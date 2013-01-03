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
    this.solved = false;
    // possible options on how stringent to be go here
    this.treeCompare = new TreeCompare();

    this.goalTreeString = options.level.goalTree;
    if (!this.goalTreeString) {
      console.warn('woah no goal, using random other one');
      this.goalTreeString = '{"branches":{"master":{"target":"C2","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C30"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}';
      //this.goalTreeString = '{"branches":{"master":{"target":"C2","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}';
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
  },

  initParseWaterfall: function(options) {
    this.parseWaterfall = new ParseWaterfall();

    // if we want to disable certain commands...
    if (options.level.disabledMap) {
      // disable these other commands
      this.parseWaterfall.addFirst(
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

  afterCommandCB: function(command) {
    // TODO check if error, but not warning
    this.gitCommandsIssued++;
  },

  afterCommandDefer: function(defer) {
    if (this.solved) { return; }
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
    this.mainVis.gitVisuals.finishAnimation()
    .then(function() {
      defer.resolve();
    });
  }
});

exports.Level = Level;

