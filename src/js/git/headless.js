var _ = require('underscore');
var Backbone;
// horrible hack to get localStorage Backbone plugin
if (!require('../util').isBrowser()) {
  Backbone = require('backbone');
} else {
  Backbone = window.Backbone;
}

var GitEngine = require('../git').GitEngine;
var AnimationFactory = require('../visuals/animation/animationFactory').AnimationFactory;
var GitVisuals = require('../visuals').GitVisuals;
var TreeCompare = require('../git/treeCompare').TreeCompare;

var Collections = require('../models/collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;
var Command = require('../models/commandModel').Command;

var mock = require('../util/mock').mock;
var util = require('../util');

var HeadlessGit = function() {
  this.init();
};

HeadlessGit.prototype.init = function() {
  this.commitCollection = new CommitCollection();
  this.branchCollection = new BranchCollection();
  this.treeCompare = new TreeCompare();

  // here we mock visuals and animation factory so the git engine
  // is headless
  var animationFactory = mock(AnimationFactory);
  var gitVisuals = mock(GitVisuals);

  this.gitEngine = new GitEngine({
    collection: this.commitCollection,
    branches: this.branchCollection,
    gitVisuals: gitVisuals,
    animationFactory: animationFactory,
    events: _.clone(Backbone.Events)
  });
  this.gitEngine.init();
};

HeadlessGit.prototype.sendCommand = function(value) {
  util.splitTextCommand(value, function(commandStr) {
    var commandObj = new Command({
      rawStr: commandStr
    });
    console.log('dispatching command "', commandStr, '"');
    var done = function() {};
    this.gitEngine.dispatch(commandObj, done);
  }, this);
};

exports.HeadlessGit = HeadlessGit;

