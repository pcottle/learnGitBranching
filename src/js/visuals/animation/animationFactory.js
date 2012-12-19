var _ = require('underscore');
var Backbone = require('backbone');

var Animation = require('./index').Animation;
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

AnimationFactory.prototype.genCommitBirthAnimation = function(animationQueue, commit, gitVisuals) {
  if (!animationQueue) {
    throw new Error("Need animation queue to add closure to!");
  }

  var time = GRAPHICS.defaultAnimationTime * 1.0;
  var bounceTime = time * 2;

  // essentially refresh the entire tree, but do a special thing for the commit
  var visNode = commit.get('visNode');

  var animation = function() {
    // this takes care of refs and all that jazz, and updates all the positions
    gitVisuals.refreshTree(time);

    visNode.setBirth();
    visNode.parentInFront();
    gitVisuals.visBranchesFront();

    visNode.animateUpdatedPosition(bounceTime, 'bounce');
    visNode.animateOutgoingEdges(time);
  };

  animationQueue.add(new Animation({
    closure: animation,
    duration: Math.max(time, bounceTime)
  }));
};

AnimationFactory.prototype.overrideOpacityDepth2 = function(attr, opacity) {
  opacity = (opacity === undefined) ? 1 : opacity;

  var newAttr = {};

  _.each(attr, function(partObj, partName) {
    newAttr[partName] = {};
    _.each(partObj, function(val, key) {
      if (key == 'opacity') {
        newAttr[partName][key] = opacity;
      } else {
        newAttr[partName][key] = val;
      }
    });
  });
  return newAttr;
};

AnimationFactory.prototype.overrideOpacityDepth3 = function(snapShot, opacity) {
  var newSnap = {};

  _.each(snapShot, function(visObj, visID) {
    newSnap[visID] = this.overrideOpacityDepth2(visObj, opacity);
  }, this);
  return newSnap;
};

AnimationFactory.prototype.genCommitBirthClosureFromSnapshot = function(step, gitVisuals) {
  var time = GRAPHICS.defaultAnimationTime * 1.0;
  var bounceTime = time * 1.5;

  var visNode = step.newCommit.get('visNode');
  var afterAttrWithOpacity = this.overrideOpacityDepth2(step.afterSnapshot[visNode.getID()]);
  var afterSnapWithOpacity = this.overrideOpacityDepth3(step.afterSnapshot);

  var animation = function() {
    visNode.setBirthFromSnapshot(step.beforeSnapshot);
    visNode.parentInFront();
    gitVisuals.visBranchesFront();

    visNode.animateToAttr(afterAttrWithOpacity, bounceTime, 'bounce');
    visNode.animateOutgoingEdgesToAttr(afterSnapWithOpacity, bounceTime);
  };

  return animation;
};

AnimationFactory.prototype.refreshTree = function(animationQueue, gitVisuals) {
  animationQueue.add(new Animation({
    closure: function() {
      gitVisuals.refreshTree();
    }
  }));
};

AnimationFactory.prototype.rebaseAnimation = function(animationQueue, rebaseResponse,
                                                      gitEngine, gitVisuals) {

  this.rebaseHighlightPart(animationQueue, rebaseResponse, gitEngine);
  this.rebaseBirthPart(animationQueue, rebaseResponse, gitEngine, gitVisuals);
};

AnimationFactory.prototype.rebaseHighlightPart = function(animationQueue, rebaseResponse, gitEngine) {
  var fullTime = GRAPHICS.defaultAnimationTime * 0.66;
  var slowTime = fullTime * 2.0;

  // we want to highlight all the old commits
  var oldCommits = rebaseResponse.toRebaseArray;
  // we are either highlighting to a visBranch or a visNode
  var visBranch = rebaseResponse.destinationBranch.get('visBranch');
  if (!visBranch) {
    // in the case where we rebase onto a commit
    visBranch = rebaseResponse.destinationBranch.get('visNode');
  }

  _.each(oldCommits, function(oldCommit) {
    var visNode = oldCommit.get('visNode');
    animationQueue.add(new Animation({
      closure: function() {
        visNode.highlightTo(visBranch, slowTime, 'easeInOut');
      },
      duration: fullTime * 1.5
    }));

  }, this);

  this.delay(animationQueue, fullTime * 2);
};

AnimationFactory.prototype.rebaseBirthPart = function(animationQueue, rebaseResponse,
                                                      gitEngine, gitVisuals) {
  var rebaseSteps = rebaseResponse.rebaseSteps;

  var newVisNodes = [];
  _.each(rebaseSteps, function(step) {
    var visNode = step.newCommit.get('visNode');

    newVisNodes.push(visNode);
    visNode.setOpacity(0);
    visNode.setOutgoingEdgesOpacity(0);
  }, this);

  var previousVisNodes = [];
  _.each(rebaseSteps, function(rebaseStep, index) {
    var toOmit = newVisNodes.slice(index + 1);

    var snapshotPart = this.genFromToSnapshotAnimation(
      rebaseStep.beforeSnapshot,
      rebaseStep.afterSnapshot,
      toOmit,
      previousVisNodes,
      gitVisuals
    );
    var birthPart = this.genCommitBirthClosureFromSnapshot(rebaseStep, gitVisuals);

    var animation = function() {
      snapshotPart();
      birthPart();
    };

    animationQueue.add(new Animation({
      closure: animation,
      duration: GRAPHICS.defaultAnimationTime * 1.5
    }));

    previousVisNodes.push(rebaseStep.newCommit.get('visNode'));
  }, this);

  // need to delay to let bouncing finish
  this.delay(animationQueue);

  this.refreshTree(animationQueue, gitVisuals);
};

AnimationFactory.prototype.delay = function(animationQueue, time) {
  time = time || GRAPHICS.defaultAnimationTime;
  animationQueue.add(new Animation({
    closure: function() { },
    duration: time
  }));
};

AnimationFactory.prototype.genSetAllCommitOpacities = function(visNodes, opacity) {
  // need to slice for closure
  var nodesToAnimate = visNodes.slice(0);

  return function() {
    _.each(nodesToAnimate, function(visNode) {
      visNode.setOpacity(opacity);
      visNode.setOutgoingEdgesOpacity(opacity);
    });
  };
};

AnimationFactory.prototype.stripObjectsFromSnapshot = function(snapShot, toOmit) {
  var ids = [];
  _.each(toOmit, function(obj) {
    ids.push(obj.getID());
  });

  var newSnapshot = {};
  _.each(snapShot, function(val, key) {
    if (_.include(ids, key)) {
      // omit
      return;
    }
    newSnapshot[key] = val;
  }, this);
  return newSnapshot;
};

AnimationFactory.prototype.genFromToSnapshotAnimation = function(
  beforeSnapshot,
  afterSnapshot,
  commitsToOmit,
  commitsToFixOpacity,
  gitVisuals) {

  // we want to omit the commit outgoing edges
  var toOmit = [];
  _.each(commitsToOmit, function(visNode) {
    toOmit.push(visNode);
    toOmit = toOmit.concat(visNode.get('outgoingEdges'));
  });

  var fixOpacity = function(obj) {
    if (!obj) { return; }
    _.each(obj, function(attr, partName) {
      obj[partName].opacity = 1;
    });
  };

  // HORRIBLE loop to fix opacities all throughout the snapshot
  _.each([beforeSnapshot, afterSnapshot], function(snapShot) {
    _.each(commitsToFixOpacity, function(visNode) {
      fixOpacity(snapShot[visNode.getID()]);
      _.each(visNode.get('outgoingEdges'), function(visEdge) {
        fixOpacity(snapShot[visEdge.getID()]);
      });
    });
  });

  return function() {
    gitVisuals.animateAllFromAttrToAttr(beforeSnapshot, afterSnapshot, toOmit);
  };
};

exports.AnimationFactory = AnimationFactory;

