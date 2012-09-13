function GitVisuals() {
  this.collection = commitCollection;

  this.collection.on('change', _.bind(this.collectionChanged, this));
  events.on('drawGitVisuals', _.bind(this.drawVisuals, this));
}

GitVisuals.prototype.drawVisuals = function(sys, ctx, canvas) {
  // we need to draw refs here
  var branches = gitEngine.getBranches();
  var detachedHead = gitEngine.getDetachedHead();
  var HEAD = gitEngine.getHead();

  _.forEach(branches, _.bind(function(branch) {
    // get the location of the arbor node and then somehow draw the ref to the side?
    var node = branch.target.get('arborNode');
    var nodePoint = sys.toScreen(node._p);

    // text position
    // TODO: better positioning of text here
    var screenPoint = _.clone(nodePoint);
    screenPoint.x += 100;

    ctx.font = graphics.refFont;
    ctx.fillStyle = graphics.refFontFill;
    ctx.fillText(branch.id, screenPoint.x, screenPoint.y);

    // also draw an arrow
    var offset = Math.round(graphics.nodeRadius * 2.5);
    this.drawArrow(ctx, screenPoint, nodePoint, graphics.arrowHeadWidth, offset);
  }, this));
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
