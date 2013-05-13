var _ = require('underscore');
var Q = require('q');
var Backbone = require('backbone');

var GRAPHICS = require('../util/constants').GRAPHICS;
var GLOBAL = require('../util/constants').GLOBAL;

var Collections = require('../models/collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;

var VisNode = require('../visuals/visNode').VisNode;
var VisBranch = require('../visuals/visBranch').VisBranch;
var VisBranchCollection = require('../visuals/visBranch').VisBranchCollection;
var VisEdge = require('../visuals/visEdge').VisEdge;
var VisEdgeCollection = require('../visuals/visEdge').VisEdgeCollection;

function GitVisuals(options) {
  options = options || {};
  this.options = options;
  this.commitCollection = options.commitCollection;
  this.branchCollection = options.branchCollection;
  this.visNodeMap = {};

  this.visEdgeCollection = new VisEdgeCollection();
  this.visBranchCollection = new VisBranchCollection();
  this.commitMap = {};

  this.rootCommit = null;
  this.branchStackMap = null;
  this.upstreamBranchSet = null;
  this.upstreamHeadSet = null;

  this.paper = options.paper;
  this.gitReady = false;

  this.branchCollection.on('add', this.addBranchFromEvent, this);
  this.branchCollection.on('remove', this.removeBranch, this);
  this.deferred = [];

  this.flipFraction = 0.65;

  var Main = require('../app');
  Main.getEvents().on('refreshTree', this.refreshTree, this);
}

GitVisuals.prototype.defer = function(action) {
  this.deferred.push(action);
};

GitVisuals.prototype.deferFlush = function() {
  _.each(this.deferred, function(action) {
    action();
  }, this);
  this.deferred = [];
};

GitVisuals.prototype.resetAll = function() {
  // make sure to copy these collections because we remove
  // items in place and underscore is too dumb to detect length change
  var edges = this.visEdgeCollection.toArray();
  _.each(edges, function(visEdge) {
    visEdge.remove();
  }, this);

  var branches = this.visBranchCollection.toArray();
  _.each(branches, function(visBranch) {
    visBranch.remove();
  }, this);

  _.each(this.visNodeMap, function(visNode) {
    visNode.remove();
  }, this);

  this.visEdgeCollection.reset();
  this.visBranchCollection.reset();

  this.visNodeMap = {};
  this.rootCommit = null;
  this.commitMap = {};
};

GitVisuals.prototype.tearDown = function() {
  this.resetAll();
  this.paper.remove();
};

GitVisuals.prototype.assignGitEngine = function(gitEngine) {
  this.gitEngine = gitEngine;
  this.initHeadBranch();
  this.deferFlush();
};

GitVisuals.prototype.initHeadBranch = function() {
  // it's unfortaunte we have to do this, but the head branch
  // is an edge case because it's not part of a collection so
  // we can't use events to load or unload it. thus we have to call
  // this ugly method which will be deleted one day

  // seed this with the HEAD pseudo-branch
  this.addBranchFromEvent(this.gitEngine.HEAD);
};

GitVisuals.prototype.getScreenPadding = function() {
  // for now we return the node radius subtracted from the walls
  return {
    widthPadding: GRAPHICS.nodeRadius * 1.5,
    topHeightPadding: GRAPHICS.nodeRadius * 1.5,
    // we pad the bottom a lot more so the branches wont go off screen
    bottomHeightPadding: GRAPHICS.nodeRadius * 5
  };
};

GitVisuals.prototype.getPosBoundaries = function() {
  if (this.gitEngine.hasOrigin()) {
    return {
      min: 0,
      max: 0.5
    };
  } else if (this.gitEngine.isOrigin()) {
    return {
      min: 0.5,
      max: 1
    };
  }
  return {
    min: 0,
    max: 1
  };
};

GitVisuals.prototype.getFlipPos = function() {
  var bounds = this.getPosBoundaries();
  var min = bounds.min;
  var max = bounds.max;
  return this.flipFraction * (max - min) + min;
};

GitVisuals.prototype.toScreenCoords = function(pos) {
  if (!this.paper.width) {
    throw new Error('being called too early for screen coords');
  }
  var padding = this.getScreenPadding();

  var shrink = function(frac, total, padding) {
    return padding + frac * (total - padding * 2);
  };

  var asymShrink = function(frac, total, paddingTop, paddingBelow) {
    return paddingTop + frac * (total - paddingBelow - paddingTop);
  };

  return {
    x: shrink(pos.x, this.paper.width, padding.widthPadding),
    y: asymShrink(pos.y, this.paper.height, padding.topHeightPadding, padding.bottomHeightPadding)
  };
};

GitVisuals.prototype.animateAllAttrKeys = function(keys, attr, speed, easing) {
  var deferred = Q.defer();

  var animate = function(visObj) {
    visObj.animateAttrKeys(keys, attr, speed, easing);
  };

  this.visBranchCollection.each(animate);
  this.visEdgeCollection.each(animate);
  _.each(this.visNodeMap, animate);

  var time = (speed !== undefined) ? speed : GRAPHICS.defaultAnimationTime;
  setTimeout(function() {
    deferred.resolve();
  }, time);

  return deferred.promise;
};

GitVisuals.prototype.finishAnimation = function() {
  var _this = this;
  var deferred = Q.defer();
  var animationDone = Q.defer();
  var defaultTime = GRAPHICS.defaultAnimationTime;
  var nodeRadius = GRAPHICS.nodeRadius;

  var textString = 'Solved!!\n:D';
  var text = null;
  var makeText = _.bind(function() {
    text = this.paper.text(
      this.paper.width / 2,
      this.paper.height / 2,
      textString
    );
    text.attr({
      opacity: 0,
      'font-weight': 500,
      'font-size': '32pt',
      'font-family': 'Monaco, Courier, font-monospace',
      stroke: '#000',
      'stroke-width': 2,
      fill: '#000'
    });
    text.animate({ opacity: 1 }, defaultTime);
  }, this);

  // this is a BIG ANIMATION but it ends up just being
  // a sweet chain of promises but is pretty nice. this is
  // after I discovered promises / deferred's. Unfortunately
  // I wrote a lot of the git stuff before promises, so
  // that's somewhat ugly

  deferred.promise
  // first fade out everything but circles
  .then(_.bind(function() {
    return this.animateAllAttrKeys(
      { exclude: ['circle'] },
      { opacity: 0 },
      defaultTime * 1.1
    );
  }, this))
  // then make circle radii bigger
  .then(_.bind(function() {
    return this.animateAllAttrKeys(
      { exclude: ['arrow', 'rect', 'path', 'text'] },
      { r: nodeRadius * 2 },
      defaultTime * 1.5
    );
  }, this))
  // then shrink em super fast
  .then(_.bind(function() {
    return this.animateAllAttrKeys(
      { exclude: ['arrow', 'rect', 'path', 'text'] },
      { r: nodeRadius * 0.75 },
      defaultTime * 0.5
    );
  }, this))
  // then explode them and display text
  .then(_.bind(function() {
    makeText();
    return this.explodeNodes();
  }, this))
  .then(_.bind(function() {
    return this.explodeNodes();
  }, this))
  // then fade circles (aka everything) in and back
  .then(_.bind(function() {
    return this.animateAllAttrKeys(
      { exclude: ['arrow', 'rect', 'path', 'text'] },
      {},
      defaultTime * 1.25
    );
  }, this))
  // then fade everything in and remove text
  .then(_.bind(function() {
    text.animate({ opacity: 0 }, defaultTime, undefined, undefined, function() {
      text.remove();
    });
    return this.animateAllAttrKeys(
      {},
      {}
    );
  }, this))
  .then(function() {
    animationDone.resolve();
  })
  .fail(function(reason) {
    console.warn('animation error' + reason);
  })
  .done();

  // start our animation chain right away
  deferred.resolve();
  return animationDone.promise;
};

GitVisuals.prototype.explodeNodes = function() {
  var deferred = Q.defer();
  var funcs = [];
  _.each(this.visNodeMap, function(visNode) {
    funcs.push(visNode.getExplodeStepFunc());
  });

  var interval = setInterval(function() {
    // object creation here is a bit ugly inside a loop,
    // but the alternative is to just OR against a bunch
    // of booleans which means the other stepFuncs
    // are called unnecessarily when they have almost
    // zero speed. would be interesting to see performance differences
    var keepGoing = [];
    _.each(funcs, function(func) {
      if (func()) {
        keepGoing.push(func);
      }
    });

    if (!keepGoing.length) {
      clearInterval(interval);
      // next step :D wow I love promises
      deferred.resolve();
      return;
    }

    funcs = keepGoing;
  }, 1/40);

  return deferred.promise;
};

GitVisuals.prototype.animateAllFromAttrToAttr = function(fromSnapshot, toSnapshot, idsToOmit) {
  var animate = function(obj) {
    var id = obj.getID();
    if (_.include(idsToOmit, id)) {
      return;
    }

    if (!fromSnapshot[id] || !toSnapshot[id]) {
      // its actually ok it doesnt exist yet
      return;
    }
    obj.animateFromAttrToAttr(fromSnapshot[id], toSnapshot[id]);
  };

  this.visBranchCollection.each(animate);
  this.visEdgeCollection.each(animate);
  _.each(this.visNodeMap, animate);
};

/***************************************
     == BEGIN Tree Calculation Parts ==
       _  __    __  _
       \\/ /    \ \//_
        \ \     /   __|   __
         \ \___/   /_____/ /
          |        _______ \
          \  ( )   /      \_\
           \      /
            |    |
            |    |
  ____+-_=+-^    ^+-=_=__________

^^ I drew that :D

 **************************************/

GitVisuals.prototype.genSnapshot = function() {
  this.fullCalc();

  var snapshot = {};
  _.each(this.visNodeMap, function(visNode) {
    snapshot[visNode.get('id')] = visNode.getAttributes();
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    snapshot[visBranch.getID()] = visBranch.getAttributes();
  }, this);

  this.visEdgeCollection.each(function(visEdge) {
    snapshot[visEdge.getID()] = visEdge.getAttributes();
  }, this);

  return snapshot;
};

GitVisuals.prototype.refreshTree = function(speed) {
  if (!this.gitReady || !this.gitEngine.rootCommit) {
    return;
  }

  // this method can only be called after graphics are rendered
  this.fullCalc();

  this.animateAll(speed);
};

GitVisuals.prototype.refreshTreeHarsh = function() {
  this.fullCalc();

  this.animateAll(0);
};

GitVisuals.prototype.animateAll = function(speed) {
  this.zIndexReflow();

  this.animateEdges(speed);
  this.animateNodePositions(speed);
  this.animateRefs(speed);
};

GitVisuals.prototype.fullCalc = function() {
  this.calcTreeCoords();
  this.calcGraphicsCoords();
};

GitVisuals.prototype.calcTreeCoords = function() {
  // this method can only contain things that dont rely on graphics
  if (!this.rootCommit) {
    throw new Error('grr, no root commit!');
  }

  this.calcUpstreamSets();
  this.calcBranchStacks();

  this.calcDepth();
  this.calcWidth();
};

GitVisuals.prototype.calcGraphicsCoords = function() {
  this.visBranchCollection.each(function(visBranch) {
    visBranch.updateName();
  });
};

GitVisuals.prototype.calcUpstreamSets = function() {
  this.upstreamBranchSet = this.gitEngine.getUpstreamBranchSet();
  this.upstreamHeadSet = this.gitEngine.getUpstreamHeadSet();
};

GitVisuals.prototype.getCommitUpstreamBranches = function(commit) {
  return this.branchStackMap[commit.get('id')];
};

GitVisuals.prototype.getBlendedHuesForCommit = function(commit) {
  var branches = this.upstreamBranchSet[commit.get('id')];
  if (!branches) {
    throw new Error('that commit doesnt have upstream branches!');
  }

  return this.blendHuesFromBranchStack(branches);
};

GitVisuals.prototype.blendHuesFromBranchStack = function(branchStackArray) {
  var hueStrings = [];
  _.each(branchStackArray, function(branchWrapper) {
    var fill = branchWrapper.obj.get('visBranch').get('fill');

    if (fill.slice(0,3) !== 'hsb') {
      // crap! convert
      var color = Raphael.color(fill);
      fill = 'hsb(' + String(color.h) + ',' + String(color.l);
      fill = fill + ',' + String(color.s) + ')';
    }

    hueStrings.push(fill);
  });

  return blendHueStrings(hueStrings);
};

GitVisuals.prototype.getCommitUpstreamStatus = function(commit) {
  if (!this.upstreamBranchSet) {
    throw new Error("Can't calculate this yet!");
  }

  var id = commit.get('id');
  var branch = this.upstreamBranchSet;
  var head = this.upstreamHeadSet;

  if (branch[id]) {
    return 'branch';
  } else if (head[id]) {
    return 'head';
  } else {
    return 'none';
  }
};

GitVisuals.prototype.calcBranchStacks = function() {
  var branches = this.gitEngine.getBranches();
  var map = {};
  _.each(branches, function(branch) {
    var thisId = branch.target.get('id');

    map[thisId] = map[thisId] || [];
    map[thisId].push(branch);
    map[thisId].sort(function(a, b) {
      var aId = a.obj.get('id');
      var bId = b.obj.get('id');
      if (aId == 'master' || bId == 'master') {
        return aId == 'master' ? -1 : 1;
      }
      return aId.localeCompare(bId);
    });
  });
  this.branchStackMap = map;
};

GitVisuals.prototype.calcWidth = function() {
  this.maxWidthRecursive(this.rootCommit);

  var bounds = this.getPosBoundaries();
  this.assignBoundsRecursive(
    this.rootCommit,
    bounds.min,
    bounds.max
  );
};

GitVisuals.prototype.maxWidthRecursive = function(commit) {
  var childrenTotalWidth = 0;
  _.each(commit.get('children'), function(child) {
    // only include this if we are the "main" parent of
    // this child
    if (child.isMainParent(commit)) {
      var childWidth = this.maxWidthRecursive(child);
      childrenTotalWidth += childWidth;
    }
  }, this);

  var maxWidth = Math.max(1, childrenTotalWidth);
  commit.get('visNode').set('maxWidth', maxWidth);
  return maxWidth;
};

GitVisuals.prototype.assignBoundsRecursive = function(commit, min, max, centerFrac) {
  centerFrac = (centerFrac === undefined) ? 0.5 : centerFrac;
  // I always position myself within my bounds
  var myWidthPos = min + (max - min) * centerFrac;
  commit.get('visNode').get('pos').x = myWidthPos;

  if (commit.get('children').length === 0) {
    return;
  }

  // i have a certain length to divide up
  var myLength = max - min;
  // I will divide up that length based on my children's max width in a
  // basic box-flex model
  var totalFlex = 0;
  var children = commit.get('children');
  _.each(children, function(child) {
    if (child.isMainParent(commit)) {
      totalFlex += child.get('visNode').getMaxWidthScaled();
    }
  }, this);

  // TODO: refactor into another method
  var getCenterFrac = function(index, centerFrac) {
    if (myLength < 0.99) {
      if (children.length < 2) {
        return centerFrac;
      } else {
        return 0.5;
      }
    }
    if (children.length < 2) {
      return 0.5;
    }
    // we introduce a VERY specific rule here, to push out
    // the first "divergence" of the graph
    if (index === 0) {
      return 1/3;
    } else if (index === children.length - 1) {
      return 2/3;
    }
    return centerFrac;
  };

  var prevBound = min;
  _.each(children, function(child, index) {
    if (!child.isMainParent(commit)) {
      return;
    }

    var flex = child.get('visNode').getMaxWidthScaled();
    var portion = (flex / totalFlex) * myLength;
    var thisCenterFrac = getCenterFrac(index, centerFrac);

    var childMin = prevBound;
    var childMax = childMin + portion;

    this.assignBoundsRecursive(child, childMin, childMax, thisCenterFrac);
    prevBound = childMin + portion;
  }, this);
};

GitVisuals.prototype.calcDepth = function() {
  var maxDepth = this.calcDepthRecursive(this.rootCommit, 0);
  if (maxDepth > 15) {
    // issue warning
    console.warn('graphics are degrading from too many layers');
  }

  var depthIncrement = this.getDepthIncrement(maxDepth);
  _.each(this.visNodeMap, function(visNode) {
    visNode.setDepthBasedOn(depthIncrement);
  }, this);
};

/***************************************
     == END Tree Calculation ==
       _  __    __  _
       \\/ /    \ \//_
        \ \     /   __|   __
         \ \___/   /_____/ /
          |        _______ \
          \  ( )   /      \_\
           \      /
            |    |
            |    |
  ____+-_=+-^    ^+-=_=__________

^^ I drew that :D

 **************************************/

GitVisuals.prototype.animateNodePositions = function(speed) {
  _.each(this.visNodeMap, function(visNode) {
    visNode.animateUpdatedPosition(speed);
  }, this);
};

GitVisuals.prototype.addBranchFromEvent = function(branch, collection, index) {
  var action = _.bind(function() {
    this.addBranch(branch);
  }, this);

  if (!this.gitEngine || !this.gitReady) {
    this.defer(action);
  } else {
    action();
  }
};

GitVisuals.prototype.addBranch = function(branch) {
  var visBranch = new VisBranch({
    branch: branch,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });

  this.visBranchCollection.add(visBranch);
  if (this.gitReady) {
    visBranch.genGraphics(this.paper);
  } else {
    this.defer(_.bind(function() {
      visBranch.genGraphics(this.paper);
    }, this));
  }
};

GitVisuals.prototype.removeVisBranch = function(visBranch) {
  this.visBranchCollection.remove(visBranch);
};

GitVisuals.prototype.removeVisNode = function(visNode) {
  this.visNodeMap[visNode.getID()] = undefined;
};

GitVisuals.prototype.removeVisEdge = function(visEdge) {
  this.visEdgeCollection.remove(visEdge);
};

GitVisuals.prototype.animateRefs = function(speed) {
  this.visBranchCollection.each(function(visBranch) {
    visBranch.animateUpdatedPos(speed);
  }, this);
};

GitVisuals.prototype.animateEdges = function(speed) {
  this.visEdgeCollection.each(function(edge) {
    edge.animateUpdatedPath(speed);
  }, this);
};

GitVisuals.prototype.getMinLayers = function() {
  return (this.options.smallCanvas) ? 4 : 7;
};

GitVisuals.prototype.getDepthIncrement = function(maxDepth) {
  // assume there are at least a number of layers until later
  // to have better visuals
  maxDepth = Math.max(maxDepth, this.getMinLayers());
  var increment = 1.0 / maxDepth;
  return increment;
};

GitVisuals.prototype.calcDepthRecursive = function(commit, depth) {
  commit.get('visNode').setDepth(depth);

  var children = commit.get('children');
  var maxDepth = depth;
  _.each(children, function(child) {
    var d = this.calcDepthRecursive(child, depth + 1);
    maxDepth = Math.max(d, maxDepth);
  }, this);

  return maxDepth;
};

// we debounce here so we aren't firing a resize call on every resize event
// but only after they stop
GitVisuals.prototype.canvasResize = function(width, height) {
  if (!this.resizeFunc) {
    this.genResizeFunc();
  }
  this.resizeFunc(width, height);
};

GitVisuals.prototype.genResizeFunc = function() {
  this.resizeFunc = _.debounce(
    _.bind(function(width, height) {

      // refresh when we are ready if we are animating som ething
      if (false && GLOBAL.isAnimating) {
        var Main = require('../app');
        Main.getEventBaton().trigger('commandSubmitted', 'refresh');
      } else {
        this.refreshTree();
      }
    }, this),
    200,
    true
  );
};

GitVisuals.prototype.addNode = function(id, commit) {
  this.commitMap[id] = commit;
  if (commit.get('rootCommit')) {
    this.rootCommit = commit;
  }

  var visNode = new VisNode({
    id: id,
    commit: commit,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });
  this.visNodeMap[id] = visNode;

  if (this.gitReady) {
    visNode.genGraphics(this.paper);
  }
  return visNode;
};

GitVisuals.prototype.addEdge = function(idTail, idHead) {
  var visNodeTail = this.visNodeMap[idTail];
  var visNodeHead = this.visNodeMap[idHead];

  if (!visNodeTail || !visNodeHead) {
    throw new Error('one of the ids in (' + idTail +
                    ', ' + idHead + ') does not exist');
  }

  var edge = new VisEdge({
    tail: visNodeTail,
    head: visNodeHead,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });
  this.visEdgeCollection.add(edge);

  if (this.gitReady) {
    edge.genGraphics(this.paper);
  }
};

GitVisuals.prototype.zIndexReflow = function() {
  this.visNodesFront();
  this.visBranchesFront();
};

GitVisuals.prototype.visNodesFront = function() {
  _.each(this.visNodeMap, function(visNode) {
    visNode.toFront();
  });
};

GitVisuals.prototype.visBranchesFront = function() {
  this.visBranchCollection.each(function(vBranch) {
    vBranch.nonTextToFront();
    vBranch.textToFront();
  });

  this.visBranchCollection.each(function(vBranch) {
    vBranch.textToFrontIfInStack();
  });
};

GitVisuals.prototype.drawTreeFromReload = function() {
  this.gitReady = true;
  // gen all the graphics we need
  this.deferFlush();

  this.calcTreeCoords();
};

GitVisuals.prototype.drawTreeFirstTime = function() {
  this.gitReady = true;
  this.calcTreeCoords();

  _.each(this.visNodeMap, function(visNode) {
    visNode.genGraphics(this.paper);
  }, this);

  this.visEdgeCollection.each(function(edge) {
    edge.genGraphics(this.paper);
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    visBranch.genGraphics(this.paper);
  }, this);

  this.zIndexReflow();
};


/************************
 * Random util functions, some from liquidGraph
 ***********************/
function blendHueStrings(hueStrings) {
  // assumes a sat of 0.7 and brightness of 1

  var x = 0;
  var y = 0;
  var totalSat = 0;
  var totalBright = 0;
  var length = hueStrings.length;

  _.each(hueStrings, function(hueString) {
    var exploded = hueString.split('(')[1];
    exploded = exploded.split(')')[0];
    exploded = exploded.split(',');

    totalSat += parseFloat(exploded[1]);
    totalBright += parseFloat(exploded[2]);
    var hue = parseFloat(exploded[0]);

    var angle = hue * Math.PI * 2;
    x += Math.cos(angle);
    y += Math.sin(angle);
  });

  x = x / length;
  y = y / length;
  totalSat = totalSat / length;
  totalBright = totalBright / length;

  var hue = Math.atan2(y, x) / (Math.PI * 2); // could fail on 0's
  if (hue < 0) {
    hue = hue + 1;
  }
  return 'hsb(' + String(hue) + ',' + String(totalSat) + ',' + String(totalBright) + ')';
}

exports.GitVisuals = GitVisuals;

