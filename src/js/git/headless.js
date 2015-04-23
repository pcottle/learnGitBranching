var Backbone = require('backbone');
var Q = require('q');

var GitEngine = require('../git').GitEngine;
var AnimationFactory = require('../visuals/animation/animationFactory').AnimationFactory;
var GitVisuals = require('../visuals').GitVisuals;
var TreeCompare = require('../graph/treeCompare');
var EventBaton = require('../util/eventBaton').EventBaton;

var Collections = require('../models/collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;
var TagCollection = Collections.TagCollection;
var Command = require('../models/commandModel').Command;

var mock = require('../util/mock').mock;
var util = require('../util');

function getMockFactory() {
  var mockFactory = {};
  var mockReturn = function() {
    var d = Q.defer();
    // fall through!
    d.resolve();
    return d.promise;
  };
  for (var key in AnimationFactory) {
    mockFactory[key] = mockReturn;
  }

  mockFactory.playRefreshAnimationAndFinish = function(gitVisuals, aQueue) {
    aQueue.finish();
  };
  mockFactory.refreshTree = function(aQueue, gitVisuals) {
    aQueue.finish();
  };

  mockFactory.highlightEachWithPromise = function(chain, toRebase, destBranch) {
    // dont add any steps
    return chain;
  };

  return mockFactory;
}

function getMockVisualization() {
  return {
    makeOrigin: function(options) {
      var localRepo = options.localRepo;
      var treeString = options.treeString;

      var headless = new HeadlessGit();
      headless.gitEngine.loadTreeFromString(treeString);
      return {
        customEvents: {
          on: function(key, cb, context) {
            cb.apply(context, []);
          }
        },
        gitEngine: headless.gitEngine
      };
    }
  };
}

var HeadlessGit = function() {
  this.init();
};

HeadlessGit.prototype.init = function() {
  this.commitCollection = new CommitCollection();
  this.branchCollection = new BranchCollection();
  this.tagCollection = new TagCollection();

  // here we mock visuals and animation factory so the git engine
  // is headless
  var animationFactory = getMockFactory();
  var gitVisuals = mock(GitVisuals);
  // add some stuff for origin making
  var mockVis = getMockVisualization();
  gitVisuals.getVisualization = function() {
    return mockVis;
  };

  this.gitEngine = new GitEngine({
    collection: this.commitCollection,
    branches: this.branchCollection,
    tags: this.tagCollection,
    gitVisuals: gitVisuals,
    animationFactory: animationFactory,
    eventBaton: new EventBaton()
  });
  this.gitEngine.init();
};

// horrible hack so we can just quickly get a tree string for async git
// operations, aka for git demonstration views
var getTreeQuick = function(commandStr, getTreePromise) {
  var deferred = Q.defer();
  var headless = new HeadlessGit();
  headless.sendCommand(commandStr, deferred);
  deferred.promise.then(function() {
    getTreePromise.resolve(headless.gitEngine.exportTree());
  });
};

HeadlessGit.prototype.sendCommand = function(value, entireCommandPromise) {
  var deferred = Q.defer();
  var chain = deferred.promise;
  var startTime = new Date().getTime();

  util.splitTextCommand(value, function(commandStr) {
    chain = chain.then(function() {
      var commandObj = new Command({
        rawStr: commandStr
      });

      var thisDeferred = Q.defer();
      this.gitEngine.dispatch(commandObj, thisDeferred);
      return thisDeferred.promise;
    }.bind(this));
  }, this);

  chain.then(function() {
    var nowTime = new Date().getTime();
    if (entireCommandPromise) {
      entireCommandPromise.resolve();
    }
  });

  chain.fail(function(err) {
    console.log('!!!!!!!! error !!!!!!!');
    console.log(err);
    console.log(err.stack);
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
  });
  deferred.resolve();
};

exports.HeadlessGit = HeadlessGit;
exports.getTreeQuick = getTreeQuick;

