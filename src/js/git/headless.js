var _ = require('underscore');
var Backbone = require('backbone');
var Q = require('q');

var GitEngine = require('../git').GitEngine;
var AnimationFactory = require('../visuals/animation/animationFactory').AnimationFactory;
var GitVisuals = require('../visuals').GitVisuals;
var TreeCompare = require('../git/treeCompare').TreeCompare;
var EventBaton = require('../util/eventBaton').EventBaton;

var Collections = require('../models/collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;
var Command = require('../models/commandModel').Command;

var mock = require('../util/mock').mock;
var util = require('../util');

function getMockFactory() {
  var mockFactory = {};
  var mockReturn = function() {
    return Q.defer().promise;
  };
  for (var key in AnimationFactory) {
    mockFactory[key] = mockReturn;
  }
  // special method that does stuff
  mockFactory.playRefreshAnimationAndFinish = function(gitVisuals, aQueue) {
    aQueue.thenFinish(Q.defer().promise);
  };

  mockFactory.playCommitBirthPromiseAnimation = function(commit, visuals) {
    var d = Q.defer();
    d.resolve();
    // return a resolved promise here
    return d.promise;
  };

  mockFactory.highlightEachWithPromise = function(chain, toRebase, destBranch) {
    // dont add any steps
    return chain;
  };

  return mockFactory;
}

var HeadlessGit = function() {
  this.init();
};

HeadlessGit.prototype.init = function() {
  this.commitCollection = new CommitCollection();
  this.branchCollection = new BranchCollection();

  // here we mock visuals and animation factory so the git engine
  // is headless
  var animationFactory = getMockFactory();
  var gitVisuals = mock(GitVisuals);

  this.gitEngine = new GitEngine({
    collection: this.commitCollection,
    branches: this.branchCollection,
    gitVisuals: gitVisuals,
    animationFactory: animationFactory,
    eventBaton: new EventBaton()
  });
  this.gitEngine.init();
};

HeadlessGit.prototype.sendCommand = function(value, cb) {
  var deferred = Q.defer();
  var chain = deferred.promise;
  util.splitTextCommand(value, function(commandStr) {
    var commandObj = new Command({
      rawStr: commandStr
    });
    var thisDeferred = Q.defer();
    this.gitEngine.dispatch(commandObj, thisDeferred);
    chain = chain.then(thisPromise);
  }, this);
};

exports.HeadlessGit = HeadlessGit;

