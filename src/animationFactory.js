/******************
 * This class is responsible for a lot of the heavy lifting around creating an animation at a certain state in time.
 * The tricky thing is that when a new commit has to be "born," say in the middle of a rebase
 * or something, it must animate out from the parent position to it's birth position.

 * These two positions though may not be where the commit finally ends up. So we actually need to take a snapshot of the tree,
 * store all those positions, take a snapshot of the tree after a layout refresh afterwards, and then animate between those two spots.
 * and then essentially animate the entire tree too.
 */

// essentially a static class
function AnimationFactory() {

}

AnimationFactory.prototype.genCommitBirthAnimation = function(animationQueue, commit) {
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
  console.log(newSnap);
  return newSnap;
};

AnimationFactory.prototype.genCommitBirthClosureFromSnapshot = function(step) {

  var time = GRAPHICS.defaultAnimationTime * 1.0;
  var bounceTime = time * 2.0;

  var visNode = step.newCommit.get('visNode');
  var afterAttrWithOpacity = this.overrideOpacityDepth2(step.afterSnapshot[visNode.getID()]);
  var afterSnapWithOpacity = this.overrideOpacityDepth3(step.afterSnapshot);

  var animation = function() {
    // TODO -- unhighlight old commit visnode here

    visNode.setBirthFromSnapshot(step.beforeSnapshot);
    visNode.parentInFront();
    gitVisuals.visBranchesFront();

    visNode.animateToAttr(afterAttrWithOpacity, bounceTime, 'bounce');
    visNode.animateOutgoingEdgesToAttr(afterSnapWithOpacity, bounceTime);
  };

  return animation;
};

AnimationFactory.prototype.refreshTree = function(animationQueue) {
  animationQueue.add(new Animation({
    closure: function() {
      console.log('refreshing tree from here');
      gitVisuals.refreshTree();
    }
  }));
};

AnimationFactory.prototype.rebaseAnimation = function(animationQueue, rebaseResponse, gitEngine) {
  // HIGHLIGHTING PART!!!!

  var rebaseSteps = rebaseResponse.rebaseSteps;

  _.each(rebaseSteps, function(rebaseStep) {
    var snapshotPart = this.genFromToSnapshotAnimation(rebaseStep.beforeSnapshot, rebaseStep.afterSnapshot);
    var birthPart = this.genCommitBirthClosureFromSnapshot(rebaseStep);

    var animation = function() {
      snapshotPart();
      birthPart();
    };
        
    animationQueue.add(new Animation({
      closure: animation
    }));

    /*
    rebaseStep.oldCommit
    rebaseStep.newCommit
    rebaseStep.beforeSnapshot
    rebaseStep.afterSnapshot*/
  }, this);
};

AnimationFactory.prototype.genFromToSnapshotAnimation = function(beforeSnapshot, afterSnapshot) {
  return function() {
    console.log('from', beforeSnapshot, 'to', afterSnapshot);
    gitVisuals.animateAllFromAttrToAttr(beforeSnapshot, afterSnapshot);
  };
};
