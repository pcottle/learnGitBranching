function GitVisuals(options) {
  // the 
  this.commitCollection = options.collection;
  this.visNodeMap = {};
  this.edgeCollection = new VisEdgeCollection();

  this.commitMap = {};
  this.rootCommit = null;

  this.paperReady = false;
  this.paperWidth = null;
  this.paperHeight = null;

  this.commitCollection.on('change', this.collectionChanged, this);
  
  events.on('canvasResize', _.bind(
    this.canvasResize, this
  ));
  events.on('raphaelReady', _.bind(
    this.drawTreeFirstTime, this
  ));
}

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

/***************************************
     == Tree Calculation Parts ==
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

GitVisuals.prototype.refreshTree = function() {
  this.calculateTreeCoords();
  this.animateNodePositions();
  this.animateEdges();
};

GitVisuals.prototype.calculateTreeCoords = function() {
  if (!this.rootCommit) {
    throw new Error('grr, no root commit!');
  }

  this.calcDepth();
  this.calcWidth();
};

GitVisuals.prototype.calcWidth = function() {
  this.maxWidthRecursive(this.rootCommit);
  
  this.assignBoundsRecursive(this.rootCommit, 0, 1);
};

GitVisuals.prototype.maxWidthRecursive = function(commit) {
  var childrenTotalWidth = 0;
  _.each(commit.get('children'), function(child) {
    var childWidth = this.maxWidthRecursive(child);
    childrenTotalWidth += childWidth;
  }, this);

  var maxWidth = Math.max(1, childrenTotalWidth);
  commit.get('visNode').set('maxWidth', maxWidth);
  return maxWidth;
};

GitVisuals.prototype.assignBoundsRecursive = function(commit, min, max) {
  
  // I always center myself within my bounds
  var myWidthPos = (min + max) / 2.0;
  commit.get('visNode').get('pos').x = myWidthPos;
  // TODO get rid of
  // commit.get('visNode').get('pos').x = Math.random();

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
    totalFlex += child.get('visNode').get('maxWidth');
  }, this);

  var prevBound = min;

  // now go through and do everything
  // TODO: order so the max width children are in the middle
  _.each(children, function(child) {
    var flex = child.get('visNode').get('maxWidth');
    var portion = (flex / totalFlex) * myLength;
    var childMin = prevBound;
    var childMax = childMin + portion;
    this.assignBoundsRecursive(child, childMin, childMax);
    prevBound = childMax;
  }, this);
};

GitVisuals.prototype.calcDepth = function() {
  var maxDepth = this.calcDepthRecursive(this.rootCommit, 0);

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

GitVisuals.prototype.animateNodePositions = function() {
  _.each(this.visNodeMap, function(visNode) {
    console.log(visNode);
    visNode.animateUpdatedPosition();
  }, this);
};

GitVisuals.prototype.animateEdges = function() {
  this.edgeCollection.each(function(edge) {
    edge.animateUpdatedPath();
  }, this);
};

GitVisuals.prototype.getDepthIncrement = function(maxDepth) {
  // assume there are at least 7 layers until later
  maxDepth = Math.max(maxDepth, 7);
  var increment = 1.0 / maxDepth;
  return increment;
};

GitVisuals.prototype.calcDepthRecursive = function(commit, depth) {
  console.log('calculating depth recursive for ', commit);

  commit.get('visNode').set('depth', depth);

  var children = commit.get('children');
  var maxDepth = depth;
  for (var i = 0; i < children.length; i++) {
    var d = this.calcDepthRecursive(children[i], depth + 1);
    maxDepth = Math.max(d, maxDepth);
  }

  return maxDepth;
  // TODO for merge commits, a specific fancy schamncy "main" commit line
};

GitVisuals.prototype.canvasResize = function(width, height) {
  this.paperWidth = width;
  this.paperHeight = height;
};

GitVisuals.prototype.addNode = function(id, commit) {
  this.commitMap[id] = commit;
  if (commit.get('rootCommit')) {
    this.rootCommit = commit;
  }

  var visNode = new VisNode({
    id: id,
    commit: commit
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
    head: visNodeHead
  });
  this.edgeCollection.add(edge);

  if (this.paperReady) {
    edge.genGraphics(paper);
  }
};

GitVisuals.prototype.collectionChanged = function() {
  console.log('git visuals... collection was changed');
  // redo stuff
};

GitVisuals.prototype.drawTreeFirstTime = function() {
  this.paperReady = true;
  _.each(this.visNodeMap, function(visNode) {
    visNode.genGraphics(paper);
  }, this);

  this.edgeCollection.each(function(edge) {
    edge.genGraphics(paper);
  }, this);
};


/************************
 * Random util functions, adapted from liquidGraph
 ***********************/
function constructPathStringFromCoords(points,wantsToClose) {
    var pathString = "M" + String(Math.round(points[0].x)) + "," + String(Math.round(points[0].y));
    var lp = points[0];

    _.each(points, function(point) {
        var s = " L" + String(Math.round(point.x)) + "," + String(Math.round(point.y));
        pathString = pathString + s;
    });

    if (wantsToClose) {
        pathString = pathString + " Z";
    }
    return pathString;
};

function randomHueString() {
    var hue = Math.random();
    var str = 'hsb(' + String(hue) + ',0.7,1)';
    return str;
};

function randomGradient() {
    var hue = Math.random()*0.8;
    var color1 = 'hsb(' + String(hue) + ',0.7,1)';
    var color2 = 'hsb(' + String(hue + 0.2) + ',0.9,1)';

    var gradient = String(Math.round(Math.random()*180)) + '-' + color1 + '-' + color2;
    return gradient;
};

function cutePath(paper, pathString, options) {
    options = options || {};
    var wantsToFill = options.wantsToFill;
    var strokeColor = options.strokeColor;
    var fillColor = options.fillColor;

    var path = paper.path(pathString);

    if (!strokeColor) {
        strokeColor = randomHueString();
    }
    if (!fillColor) {
        fillColor = randomHueString();
    }
    path.attr({
        'stroke-width': 2,
        'stroke': strokeColor,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    });

    if (wantsToFill) {
        path.attr('fill',fillColor);
    }
    return path;
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

