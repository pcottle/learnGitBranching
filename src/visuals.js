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
    minWidth: GRAPHICS.nodeRadius,
    widthSubtract: GRAPHICS.nodeRadius,
    minHeight: GRAPHICS.nodeRadius,
    heightSubtract: GRAPHICS.nodeRadius
  };
};

GitVisuals.prototype.toScreenCoords = function(pos) {
  if (!this.paperWidth) {
    throw new Error('being called too early for screen coords');
  }
  var bounds = this.getScreenBounds();

  return {
    x: pos.x * (this.paperWidth - bounds.widthSubtract) + bounds.minWidth,
    y: pos.y * (this.paperHeight - bounds.heightSubtract) + bounds.minHeight,
  };
};

GitVisuals.prototype.calculateTreeCoords = function() {


};

GitVisuals.prototype.canvasResize = function(width, height) {
  this.paperWidth = width;
  this.paperHeight = height;
};

GitVisuals.prototype.addNode = function(id, commit) {
  this.commitMap[id] = commit;
  if (commit.get('roomCommit')) {
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
  this.calculateTreeCoords();
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

