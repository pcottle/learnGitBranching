var Visualization = Backbone.View.extend({
  initialize: function(options) {
    var _this = this;
    Raphael(10, 10, 200, 200, function() {
      // for some reason raphael calls this function with a predefined
      // context...
      // so switch it
      paper = this;
      _this.paperInitialize(this);
    });
  },

  paperInitialize: function(paper, options) {
    this.paper = paper;
    this.commitCollection = new CommitCollection();
    this.branchCollection = new BranchCollection();

    this.gitVisuals = new GitVisuals({
      commitCollection: this.commitCollection,
      branchCollection: this.branchCollection
    });

    gitEngine = new GitEngine({
      collection: this.commitCollection,
      branches: this.branchCollection,
      gitVisuals: this.gitVisuals
    });
    this.gitEngine = gitEngine;
    this.gitVisuals.assignGitEngine(this.gitEngine);

    // needs to be called before raphael ready
    this.myResize();
    this.gitVisuals.drawTreeFirstTime();
  },

  myResize: function() {
    var smaller = 10;
    var el = this.el;

    var left = el.offsetLeft;
    var top = el.offsetTop;
    var width = el.clientWidth - smaller;
    var height = el.clientHeight - smaller;

    $(this.paper.canvas).css({
      left: left + 'px',
      top: top + 'px'
    });
    paper.setSize(width, height);
    this.gitVisuals.canvasResize(width, height);
  }

});

function GitVisuals(options) {
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

  this.paperReady = false;
  this.paperWidth = null;
  this.paperHeight = null;

  this.branchCollection.on('add', this.addBranchFromEvent, this);
  this.branchCollection.on('remove', this.removeBranch, this);
  this.deferred = [];
  
  events.on('refreshTree', _.bind(
    this.refreshTree, this
  ));
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
  this.visEdgeCollection.each(function(visEdge) {
    visEdge.remove();
  }, this);
  this.visBranchCollection.each(function(visBranch) {
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
  var headBranch = new VisBranch({
    branch: this.gitEngine.HEAD,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });

  this.visBranchCollection.add(headBranch);
};

GitVisuals.prototype.getScreenBounds = function() {
  // for now we return the node radius subtracted from the walls
  return {
    widthPadding: GRAPHICS.nodeRadius * 1.5,
    heightPadding: GRAPHICS.nodeRadius * 1.5
  };
};

GitVisuals.prototype.toScreenCoords = function(pos) {
  if (!this.paperWidth) {
    throw new Error('being called too early for screen coords');
  }
  var bounds = this.getScreenBounds();

  var shrink = function(frac, total, padding) {
    return padding + frac * (total - padding * 2);
  };

  return {
    x: shrink(pos.x, this.paperWidth, bounds.widthPadding),
    y: shrink(pos.y, this.paperHeight, bounds.heightPadding)
  };
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

  this.visBranchCollection.each(function(visBranch) {
    animate(visBranch);
  });
  this.visEdgeCollection.each(function(visEdge) {
    animate(visEdge);
  });
  _.each(this.visNodeMap, function(visNode) {
    animate(visNode);
  });
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
  if (!this.paperReady) {
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
  
  this.assignBoundsRecursive(this.rootCommit, 0, 1);
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

GitVisuals.prototype.assignBoundsRecursive = function(commit, min, max) {
  
  // I always center myself within my bounds
  var myWidthPos = (min + max) / 2.0;
  commit.get('visNode').get('pos').x = myWidthPos;

  if (commit.get('children').length == 0) {
    return;
  }

  // i have a certain length to divide up
  var myLength = max - min;
  // I will divide up that length based on my children's max width in a
  // basic box-flex model
  var totalFlex = 0;
  var children = commit.get('children');
  _.each(children, function(child) {
    totalFlex += child.get('visNode').getMaxWidthScaled();
  }, this);

  var prevBound = min;

  // now go through and do everything
  // TODO: order so the max width children are in the middle!!
  _.each(children, function(child) {
    var flex = child.get('visNode').getMaxWidthScaled();
    var portion = (flex / totalFlex) * myLength;
    var childMin = prevBound;
    var childMax = childMin + portion;
    this.assignBoundsRecursive(child, childMin, childMax);
    prevBound = childMax;
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

GitVisuals.prototype.turnOnPaper = function() {
  this.paperReady = false;
};

// does making an accessor method make it any less hacky? that is the true question
GitVisuals.prototype.turnOffPaper = function() {
  this.paperReady = true;
};

GitVisuals.prototype.addBranchFromEvent = function(branch, collection, index) {
  var action = _.bind(function() {
    this.addBranch(branch);
  }, this);

  if (!this.gitEngine) {
    this.defer(action);
  } else {
    action();
  }
};

GitVisuals.prototype.addBranch = function(branch, paperOverride) {
  // TODO
  var visBranch = new VisBranch({
    branch: branch,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });

  this.visBranchCollection.add(visBranch);
  if (!paperOverride && this.paperReady) {
    visBranch.genGraphics(paper);
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

GitVisuals.prototype.getDepthIncrement = function(maxDepth) {
  // assume there are at least 7 layers until later
  maxDepth = Math.max(maxDepth, 7);
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
  // TODO for merge commits, a specific fancy schamncy "main" commit line
};

GitVisuals.prototype.canvasResize = function(width, height) {
  this.paperWidth = width;
  this.paperHeight = height;

  // refresh when we are ready
  if (GLOBAL.isAnimating) {
    events.trigger('processCommandFromEvent', 'refresh');
  } else {
    this.refreshTree();
  }
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

  if (this.paperReady) {
    visNode.genGraphics(paper);
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

  if (this.paperReady) {
    edge.genGraphics(paper);
  }
};

GitVisuals.prototype.collectionChanged = function() {
  // TODO ?
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
  });

  this.visBranchCollection.each(function(vBranch) {
    vBranch.textToFront();
  });
};

GitVisuals.prototype.drawTreeFromReload = function() {
  this.paperReady = true;
  this.calcTreeCoords();

  this.visBranchCollection.each(function(visBranch) {
    visBranch.genGraphics(paper, {
      fromReload: true
    });
  }, this);
};

GitVisuals.prototype.drawTreeFirstTime = function() {
  this.paperReady = true;
  this.calcTreeCoords();

  _.each(this.visNodeMap, function(visNode) {
    visNode.genGraphics(paper);
  }, this);

  this.visEdgeCollection.each(function(edge) {
    edge.genGraphics(paper);
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    visBranch.genGraphics(paper);
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

function randomHueString() {
    var hue = Math.random();
    var str = 'hsb(' + String(hue) + ',0.7,1)';
    return str;
};

function cuteSmallCircle(paper, x, y, options) {
    var options = options || {};
    var wantsSameColor = options.sameColor;
    var radius = options.radius || 4;

    var c = paper.circle(x, y, radius, radius);
    if (!wantsSameColor) {
        c.attr("fill","hsba(0.5,0.8,0.7,1)");
    } else {
        c.attr("fill","hsba(" + String(Math.random()) + ",0.8,0.7,1)");
    }

    c.attr("stroke","#FFF");
    c.attr("stroke-width",2);
    return c;
};

