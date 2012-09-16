function GitVisuals() {
  this.collection = commitCollection;

  this.collection.on('change', _.bind(this.collectionChanged, this));
  events.on('drawGitVisuals', _.bind(this.drawVisuals, this));
  events.on('fixNodePositions', _.bind(this.fixNodes, this));
}

GitVisuals.prototype.drawVisuals = function(sys, ctx, canvas) {
  this.drawRefs(sys, ctx, canvas);
};

GitVisuals.prototype.fixNodes = function(sys) {
  this.fixRootCommit(sys);
};

GitVisuals.prototype.drawRefs = function(sys, ctx, canvas) {
  var sFill = graphics.refSelectedFontFill;
  // we need to draw refs here
  var branches = gitEngine.getBranches();
  var detachedHead = gitEngine.getDetachedHead();
  var HEAD = gitEngine.getHead();

  _.forEach(branches, _.bind(function(branch) {
    // get the location of the arbor node and then somehow draw the ref to the side?
    var node = branch.target.get('arborNode');
    var fillStyle = branch.selected ? sFill : undefined;
    this.drawLabel(ctx, sys, node, branch.id, fillStyle);
  }, this));

  if (detachedHead) {
    var node = HEAD.get('target').get('arborNode');
    this.drawLabel(ctx, sys, node, 'HEAD', sFill);
  }
};

GitVisuals.prototype.drawLabel = function(ctx, sys, node, name, fillStyle) {
  fillStyle = fillStyle || graphics.refFontFill;

  var nodePoint = sys.toScreen(node._p);
  // text position
  // TODO: better positioning of text here
  var screenPoint = _.clone(nodePoint);
  screenPoint.x += 100;

  ctx.font = graphics.refFont;
  ctx.fillStyle = fillStyle;
  ctx.fillText(name, screenPoint.x, screenPoint.y);

  // also draw an arrow
  var offset = Math.round(graphics.nodeRadius * 2.5);
  this.drawArrow(ctx, screenPoint, nodePoint, graphics.arrowHeadWidth, offset);
};

GitVisuals.prototype.drawArrow = function(ctx, start, end, headWidth, offset) {
  // TODO only horizontal arrows for now, fix this later
  var end = _.clone(end);
  end.x += offset;

  ctx.lineWidth = graphics.arrowWidth;
  ctx.fillStyle = graphics.arrowFill;
  ctx.strokeStyle = graphics.arrowStroke;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);

  // now do the little arrow head
  ctx.lineTo(end.x + headWidth, end.y + headWidth);
  ctx.lineTo(end.x + headWidth, end.y - headWidth);
  ctx.lineTo(end.x, end.y);

  ctx.stroke();
};

GitVisuals.prototype.collectionChanged = function() {
  // redo the algorithms
};

GitVisuals.prototype.fixRootCommit = function(sys) {
  // get the viewports bottom center
  var bottomPosScreen = {
    x: Math.round($('#viewport').width() * 0.5),
    y: $('#viewport').height() - graphics.nodeRadius * 2.5
  };

  var bottomPos = sys.fromScreen(bottomPosScreen);
  // fix the root commit to the bottom
  gitEngine.rootCommit.get('arborNode').p = bottomPos;
};
