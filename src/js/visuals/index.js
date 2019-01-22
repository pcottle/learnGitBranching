var Q = require('q');

var intl = require('../intl');
var GRAPHICS = require('../util/constants').GRAPHICS;
var debounce = require('../util/debounce');
var GlobalStateStore = require('../stores/GlobalStateStore');

var VisNode = require('../visuals/visNode').VisNode;
var VisBranch = require('../visuals/visBranch').VisBranch;
var VisBranchCollection = require('../visuals/visBranch').VisBranchCollection;
var VisTag = require('../visuals/visTag').VisTag;
var VisTagCollection = require('../visuals/visTag').VisTagCollection;
var VisEdge = require('../visuals/visEdge').VisEdge;
var VisEdgeCollection = require('../visuals/visEdge').VisEdgeCollection;

function GitVisuals(options) {
  options = options || {};
  this.options = options;
  this.visualization = options.visualization;
  this.commitCollection = options.commitCollection;
  this.branchCollection = options.branchCollection;
  this.tagCollection = options.tagCollection;
  this.visNodeMap = {};

  this.visEdgeCollection = new VisEdgeCollection();
  this.visBranchCollection = new VisBranchCollection();
  this.visTagCollection = new VisTagCollection();
  this.commitMap = {};

  this.rootCommit = null;
  this.branchStackMap = null;
  this.tagStackMap = null;
  this.upstreamBranchSet = null;
  this.upstreamTagSet = null;
  this.upstreamHeadSet = null;

  this.paper = options.paper;
  this.gitReady = false;

  this.branchCollection.on('add', this.addBranchFromEvent, this);
  this.branchCollection.on('remove', this.removeBranch, this);

  this.tagCollection.on('add', this.addTagFromEvent, this);
  this.tagCollection.on('remove', this.removeTag, this);

  this.deferred = [];

  this.flipFraction = 0.65;

  var Main = require('../app');
  var that = this;
  this._onRefreshTree = function() { that.refreshTree(); };
  Main.getEvents().on('refreshTree', this._onRefreshTree, this);
}

GitVisuals.prototype.defer = function(action) {
  this.deferred.push(action);
};

GitVisuals.prototype.deferFlush = function() {
  this.deferred.forEach(function(action) {
    action();
  }, this);
  this.deferred = [];
};

GitVisuals.prototype.resetAll = function() {
  // make sure to copy these collections because we remove
  // items in place and underscore is too dumb to detect length change
  var edges = this.visEdgeCollection.toArray();
  edges.forEach(function(visEdge) {
    visEdge.remove();
  }, this);

  var branches = this.visBranchCollection.toArray();
  branches.forEach(function(visBranch) {
    visBranch.remove();
  }, this);

  var tags = this.visTagCollection.toArray();
  tags.forEach(function(visTag) {
    visTag.remove();
  }, this);

  Object.values(this.visNodeMap).forEach(function(visNode) {
    visNode.remove();
  }, this);

  this.visEdgeCollection.reset();
  this.visBranchCollection.reset();
  this.visTagCollection.reset();

  this.visNodeMap = {};
  this.rootCommit = null;
  this.commitMap = {};
};

GitVisuals.prototype.tearDown = function() {
  this.resetAll();
  this.paper.remove();
  // Unregister the refresh tree listener so we don't accumulate
  // these over time. However we aren't calling tearDown in
  // some places... but this is an improvement
  var Main = require('../app');
  Main.getEvents().removeListener('refreshTree', this._onRefreshTree);
};

GitVisuals.prototype.assignGitEngine = function(gitEngine) {
  this.gitEngine = gitEngine;
  this.initHeadBranch();
  this.deferFlush();
};

GitVisuals.prototype.getVisualization = function() {
  return this.visualization;
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
  // if we are flipping the tree, the helper bar gets in the way
  var topFactor = (GlobalStateStore.getFlipTreeY()) ? 3 : 1.5;

  // for now we return the node radius subtracted from the walls
  return {
    widthPadding: GRAPHICS.nodeRadius * 1.5,
    topHeightPadding: GRAPHICS.nodeRadius * topFactor,
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

GitVisuals.prototype.getIsGoalVis = function() {
  return !!this.options.isGoalVis;
};

GitVisuals.prototype.getLevelBlob = function() {
  return this.visualization.options.levelBlob || {};
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

  var x = shrink(pos.x, this.paper.width, padding.widthPadding);
  var y =
    asymShrink(pos.y, this.paper.height, padding.topHeightPadding, padding.bottomHeightPadding);

  if (GlobalStateStore.getFlipTreeY()) {
    y = this.paper.height - y;
  }

  return {x: x, y: y};
};

GitVisuals.prototype.animateAllAttrKeys = function(keys, attr, speed, easing) {
  var deferred = Q.defer();

  var animate = function(visObj) {
    visObj.animateAttrKeys(keys, attr, speed, easing);
  };

  this.visBranchCollection.each(animate);
  this.visEdgeCollection.each(animate);
  this.visTagCollection.each(animate);
  Object.values(this.visNodeMap).forEach(animate);

  var time = (speed !== undefined) ? speed : GRAPHICS.defaultAnimationTime;
  setTimeout(function() {
    deferred.resolve();
  }, time);

  return deferred.promise;
};

GitVisuals.prototype.finishAnimation = function(speed) {
  speed = speed || 1.0;
  if (!speed) {
    throw new Error('need speed by time i finish animation' + speed);
  }

  var _this = this;
  var deferred = Q.defer();
  var animationDone = Q.defer();
  var defaultTime = GRAPHICS.defaultAnimationTime;
  var nodeRadius = GRAPHICS.nodeRadius;

  var textString = intl.str('solved-level');
  var text = null;
  var makeText = function() {
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
  }.bind(this);

  // this is a BIG ANIMATION but it ends up just being
  // a sweet chain of promises but is pretty nice. this is
  // after I discovered promises / deferred's. Unfortunately
  // I wrote a lot of the git stuff before promises, so
  // that's somewhat ugly

  deferred.promise
  // first fade out everything but circles
  .then(function() {
    return this.animateAllAttrKeys(
      { exclude: ['circle'] },
      { opacity: 0 },
      defaultTime * 1.1 / speed
    );
  }.bind(this))
  // then make circle radii bigger
  .then(function() {
    return this.animateAllAttrKeys(
      { exclude: ['arrow', 'rect', 'path', 'text'] },
      { r: nodeRadius * 2 },
      defaultTime * 1.5 / speed
    );
  }.bind(this))
  // then shrink em super fast
  .then(function() {
    return this.animateAllAttrKeys(
      { exclude: ['arrow', 'rect', 'path', 'text'] },
      { r: nodeRadius * 0.75 },
      defaultTime * 0.5 / speed
    );
  }.bind(this))
  // then explode them and display text
  .then(function() {
    makeText();
    return this.explodeNodes(speed);
  }.bind(this))
  .then(function() {
    return this.explodeNodes(speed);
  }.bind(this))
  // then fade circles (aka everything) in and back
  .then(function() {
    return this.animateAllAttrKeys(
      { exclude: ['arrow', 'rect', 'path', 'text'] },
      {},
      defaultTime * 1.25
    );
  }.bind(this))
  // then fade everything in and remove text
  .then(function() {
    text.animate({ opacity: 0 }, defaultTime, undefined, undefined, function() {
      text.remove();
    });
    return this.animateAllAttrKeys(
      {},
      {}
    );
  }.bind(this))
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

GitVisuals.prototype.explodeNodes = function(speed) {
  var deferred = Q.defer();
  var funcs = [];
  Object.values(this.visNodeMap).forEach(function(visNode) {
    funcs.push(visNode.getExplodeStepFunc(speed));
  });

  var interval = setInterval(function() {
    // object creation here is a bit ugly inside a loop,
    // but the alternative is to just OR against a bunch
    // of booleans which means the other stepFuncs
    // are called unnecessarily when they have almost
    // zero speed. would be interesting to see performance differences
    var keepGoing = [];
    funcs.forEach(function(func) {
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
    if (idsToOmit.includes(id)) {
      return;
    }

    if (!fromSnapshot[id] || !toSnapshot[id]) {
      // its actually ok it doesn't exist yet
      return;
    }
    obj.animateFromAttrToAttr(fromSnapshot[id], toSnapshot[id]);
  };

  this.visBranchCollection.each(animate);
  this.visEdgeCollection.each(animate);
  this.visTagCollection.each(animate);
  Object.values(this.visNodeMap).forEach(animate);
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
  Object.values(this.visNodeMap).forEach(function(visNode) {
    snapshot[visNode.get('id')] = visNode.getAttributes();
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    snapshot[visBranch.getID()] = visBranch.getAttributes();
  }, this);

  this.visEdgeCollection.each(function(visEdge) {
    snapshot[visEdge.getID()] = visEdge.getAttributes();
  }, this);

  this.visTagCollection.each(function(visTag) {
    snapshot[visTag.getID()] = visTag.getAttributes();
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
  // this method can only contain things that don't rely on graphics
  if (!this.rootCommit) {
    throw new Error('grr, no root commit!');
  }

  this.calcUpstreamSets();
  this.calcBranchStacks();
  this.calcTagStacks();

  this.calcDepth();
  this.calcWidth();
};

GitVisuals.prototype.calcGraphicsCoords = function() {
  this.visBranchCollection.each(function(visBranch) {
    visBranch.updateName();
  });
  this.visTagCollection.each(function(visTag) {
    visTag.updateName();
  });
};

GitVisuals.prototype.calcUpstreamSets = function() {
  this.upstreamBranchSet = this.gitEngine.getUpstreamBranchSet();
  this.upstreamHeadSet = this.gitEngine.getUpstreamHeadSet();
  this.upstreamTagSet = this.gitEngine.getUpstreamTagSet();
};

GitVisuals.prototype.getCommitUpstreamBranches = function(commit) {
  return this.branchStackMap[commit.get('id')];
};

GitVisuals.prototype.getBlendedHuesForCommit = function(commit) {
  var branches = this.upstreamBranchSet[commit.get('id')];
  if (!branches) {
    throw new Error('that commit doesn\'t have upstream branches!');
  }

  return this.blendHuesFromBranchStack(branches);
};

GitVisuals.prototype.blendHuesFromBranchStack = function(branchStackArray) {
  var hueStrings = [];
  branchStackArray.forEach(function(branchWrapper) {
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
  var tag = this.upstreamTagSet;

  if (branch[id]) {
    return 'branch';
  } else if (tag[id]) {
    return 'tag';
  } else if (head[id]) {
    return 'head';
  } else {
    return 'none';
  }
};

GitVisuals.prototype.calcTagStacks = function() {
  var tags = this.gitEngine.getTags();
  var map = {};
  tags.forEach(function(tag) {
      var thisId = tag.target.get('id');

      map[thisId] = map[thisId] || [];
      map[thisId].push(tag);
      map[thisId].sort(function(a, b) {
          var aId = a.obj.get('id');
          var bId = b.obj.get('id');
          return aId.localeCompare(bId);
        });
    });
  this.tagStackMap = map;
};

GitVisuals.prototype.calcBranchStacks = function() {
  var branches = this.gitEngine.getBranches();
  var map = {};
  branches.forEach(function(branch) {
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
  commit.get('children').forEach(function(child) {
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

GitVisuals.prototype.assignBoundsRecursive = function(commit, min, max) {
  // I always position myself within my bounds
  var myWidthPos = (max + min) / 2.0;
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
  children.forEach(function(child) {
    if (child.isMainParent(commit)) {
      totalFlex += child.get('visNode').getMaxWidthScaled();
    }
  }, this);

  var prevBound = min;
  children.forEach(function(child, index) {
    if (!child.isMainParent(commit)) {
      return;
    }

    var flex = child.get('visNode').getMaxWidthScaled();
    var portion = (flex / totalFlex) * myLength;

    var childMin = prevBound;
    var childMax = childMin + portion;

    this.assignBoundsRecursive(child, childMin, childMax);
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
  Object.values(this.visNodeMap).forEach(function(visNode) {
    visNode.setDepthBasedOn(depthIncrement, this.getHeaderOffset());
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
  Object.values(this.visNodeMap).forEach(function(visNode) {
    visNode.animateUpdatedPosition(speed);
  }, this);
};

GitVisuals.prototype.addBranchFromEvent = function(branch, collection, index) {
  var action = function() {
    this.addBranch(branch);
  }.bind(this);

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
    this.defer(function() {
      visBranch.genGraphics(this.paper);
    }.bind(this));
  }
};

GitVisuals.prototype.addTagFromEvent = function(tag, collection, index) {
  var action = function() {
    this.addTag(tag);
  }.bind(this);

  if (!this.gitEngine || !this.gitReady) {
    this.defer(action);
  } else {
    action();
  }
};

GitVisuals.prototype.addTag = function(tag) {
  var visTag = new VisTag({
    tag: tag,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });

  this.visTagCollection.add(visTag);
  if (this.gitReady) {
    visTag.genGraphics(this.paper);
  } else {
    this.defer(function() {
      visTag.genGraphics(this.paper);
    }.bind(this));
  }
};

GitVisuals.prototype.removeVisBranch = function(visBranch) {
  this.visBranchCollection.remove(visBranch);
};

GitVisuals.prototype.removeVisTag = function(visTag) {
  this.visTagCollection.remove(visTag);
};


GitVisuals.prototype.removeVisNode = function(visNode) {
  delete this.visNodeMap[visNode.getID()];
};

GitVisuals.prototype.removeVisEdge = function(visEdge) {
  this.visEdgeCollection.remove(visEdge);
};

GitVisuals.prototype.animateRefs = function(speed) {
  this.visBranchCollection.each(function(visBranch) {
    visBranch.animateUpdatedPos(speed);
  }, this);
  this.visTagCollection.each(function(visTag) {
    visTag.animateUpdatedPos(speed);
  }, this);
};

GitVisuals.prototype.animateEdges = function(speed) {
  this.visEdgeCollection.each(function(edge) {
    edge.animateUpdatedPath(speed);
  }, this);
};

GitVisuals.prototype.getMinLayers = function() {
  return (this.options.smallCanvas) ? 2 : 7;
};

GitVisuals.prototype.getDepthIncrement = function(maxDepth) {
  // assume there are at least a number of layers until later
  // to have better visuals
  maxDepth = Math.max(maxDepth, this.getMinLayers());
  // if we have a header, reserve space for that
  var vSpace = 1.0 - this.getHeaderOffset();
  var increment = vSpace / maxDepth;
  return increment;
};

GitVisuals.prototype.shouldHaveHeader = function() {
  return this.gitEngine.isOrigin() || this.gitEngine.hasOrigin();
};

GitVisuals.prototype.getHeaderOffset = function() {
  return (this.shouldHaveHeader()) ? 0.05 : 0;
};

GitVisuals.prototype.calcDepthRecursive = function(commit, depth) {
  commit.get('visNode').setDepth(depth);

  var children = commit.get('children');
  var maxDepth = depth;
  children.forEach(function(child) {
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
  this.resizeFunc = debounce(
    function(width, height) {
      this.refreshTree();
    }.bind(this),
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
  this.visTagsFront();
};

GitVisuals.prototype.visNodesFront = function() {
  Object.values(this.visNodeMap).forEach(function(visNode) {
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

GitVisuals.prototype.visTagsFront = function() {
  this.visTagCollection.each(function(vTag) {
    vTag.nonTextToFront();
    vTag.textToFront();
  });

  this.visTagCollection.each(function(vTag) {
    vTag.textToFrontIfInStack();
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

  Object.values(this.visNodeMap).forEach(function(visNode) {
    visNode.genGraphics(this.paper);
  }, this);

  this.visEdgeCollection.each(function(edge) {
    edge.genGraphics(this.paper);
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    visBranch.genGraphics(this.paper);
  }, this);

  this.visTagCollection.each(function(visTag) {
    visTag.genGraphics(this.paper);
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

  hueStrings.forEach(function(hueString) {
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
