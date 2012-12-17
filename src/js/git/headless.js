if (!require('../util').isBrowser()) {
  var _ = require('underscore');
  var Backbone = require('backbone');
}

var GitEngine = require('../git').GitEngine;
var AnimationFactory = require('../visuals/animation/animationFactory').AnimationFactory;
var GitVisuals = require('../visuals').GitVisuals;

var Collections = require('../models/collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;

var mock = require('../util/mock').mock;

var HeadlessGit = function() {
  this.init();
};

HeadlessGit.prototype.init = function() {
  this.commitCollection = new CommitCollection();
  this.branchCollection = new BranchCollection();

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

exports.HeadlessGit = HeadlessGit;

