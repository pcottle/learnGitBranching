var _ = require('underscore');
var Backbone = require('backbone');

var Animation = require('./index').Animation;
var PromiseAnimation = require('./index').PromiseAnimation;
var GRAPHICS = require('../../util/constants').GRAPHICS;

/******************
 * This class is responsible for a lot of the heavy lifting around creating an animation at a certain state in time.
 * The tricky thing is that when a new commit has to be "born," say in the middle of a rebase
 * or something, it must animate out from the parent position to it's birth position.

 * These two positions though may not be where the commit finally ends up. So we actually need to take a snapshot of the tree,
 * store all those positions, take a snapshot of the tree after a layout refresh afterwards, and then animate between those two spots.
 * and then essentially animate the entire tree too.
 */

// essentially a static class
var AnimationFactory = function() {

};

var makeCommitBirthAnimation = function(gitVisuals, visNode) {
  var time = GRAPHICS.defaultAnimationTime * 1.0;
  var bounceTime = time * 2;

  var animation = function() {
    // essentially refresh the entire tree, but do a special thing for the commit
    gitVisuals.refreshTree(time);

    visNode.setBirth();
    visNode.parentInFront();
    gitVisuals.visBranchesFront();

    visNode.animateUpdatedPosition(bounceTime, 'bounce');
    visNode.animateOutgoingEdges(time);
  };
  return {
    animation: animation,
    duration: Math.max(time, bounceTime)
  };
};

var makeHighlightAnimation = function(visNode, visBranch) {
  var fullTime = GRAPHICS.defaultAnimationTime * 0.66;
  var slowTime = fullTime * 2.0;

  return {
    animation: function() {
      visNode.highlightTo(visBranch, slowTime, 'easeInOut');
    },
    duration: slowTime * 1.5
  };
};

AnimationFactory.prototype.genCommitBirthAnimation = function(animationQueue, commit, gitVisuals) {
  if (!animationQueue) {
    throw new Error("Need animation queue to add closure to!");
  }

  var visNode = commit.get('visNode');
  var anPack = makeCommitBirthAnimation(gitVisuals, visNode);

  animationQueue.add(new Animation({
    closure: anPack.animation,
    duration: anPack.duration
  }));
};

AnimationFactory.prototype.genCommitBirthPromiseAnimation = function(commit, gitVisuals) {
  var visNode = commit.get('visNode');
  return new PromiseAnimation(makeCommitBirthAnimation(gitVisuals, visNode));
};

AnimationFactory.prototype.highlightEachWithPromise = function(
  chain,
  toHighlight,
  destObj
) {
  _.each(toHighlight, function(commit) {
    chain = chain.then(_.bind(function() {
      return this.playHighlightPromiseAnimation(
        commit,
        destObj
      );
    }, this));
  }, this);
  return chain;
};

AnimationFactory.prototype.playCommitBirthPromiseAnimation = function(commit, gitVisuals) {
  var animation = this.genCommitBirthPromiseAnimation(commit, gitVisuals);
  animation.play();
  return animation.getPromise();
};

AnimationFactory.prototype.playRefreshAnimationAndFinish = function(gitVisuals, animationQueue) {
  var animation = new PromiseAnimation({
    closure: function() {
      gitVisuals.refreshTree();
    }
  });
  animation.play();
  animationQueue.thenFinish(animation.getPromise());
};

AnimationFactory.prototype.playRefreshAnimation = function(gitVisuals) {
  var animation = new PromiseAnimation({
    closure: function() {
      gitVisuals.refreshTree();
    }
  });
  animation.play();
  return animation.getPromise();
};

AnimationFactory.prototype.refreshTree = function(animationQueue, gitVisuals) {
  animationQueue.add(new Animation({
    closure: function() {
      gitVisuals.refreshTree();
    }
  }));
};

AnimationFactory.prototype.genHighlightPromiseAnimation = function(commit, destObj) {
  // could be branch or node
  var visObj = destObj.get('visBranch') || destObj.get('visNode');
  var visNode = commit.get('visNode');
  return new PromiseAnimation(makeHighlightAnimation(visNode, visObj));
};

AnimationFactory.prototype.playHighlightPromiseAnimation = function(commit, destObj) {
  var animation = this.genHighlightPromiseAnimation(commit, destObj);
  animation.play();
  return animation.getPromise();
};

AnimationFactory.prototype.delay = function(animationQueue, time) {
  time = time || GRAPHICS.defaultAnimationTime;
  animationQueue.add(new Animation({
    closure: function() { },
    duration: time
  }));
};

exports.AnimationFactory = AnimationFactory;

