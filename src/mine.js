/**
 * Globals
 */
var events = _.clone(Backbone.Events);

var sys = null;
var graphicsEffects = {};

var gitEngine = null;
var gitVisuals = null;

var commandCollection = null;
var commandBuffer = null;

$(document).ready(function(){
  sys = arbor.ParticleSystem(4000, 200, 0.5, false, 55, 0.005, 'verlet');
  sys.renderer = Renderer('#viewport');

  // the two major collections that affect everything
  var commitCollection = new CommitCollection();  
  commandCollection = new CommandCollection();

  commandBuffer = new CommandBuffer({
    collection: commandCollection
  });

  new CommandPromptView({
    el: $('#commandLineBar'),
    collection: commandCollection
  });
  new CommandLineHistoryView({
    el: $('#commandLineHistory'),
    collection: commandCollection
  });

  gitEngine = new GitEngine({
    collection: commitCollection
  });
  gitVisuals = new GitVisuals({
    collection: commitCollection
  });

  $('#commandTextField').focus();
});


/**
 * Extend the Arbiter classes below with my own custom functionality.
 */

Node.prototype.draw = function(ctx, pt) {
  this.drawCircleNode(ctx, pt);
};

Node.prototype.drawCircleNode = function(ctx, pt) {
  ctx.strokeStyle = graphics.nodeEdge;
  ctx.lineWidth = graphics.nodeStrokeWidth;
  ctx.fillStyle = graphics.nodeFill;
  var radius = graphics.nodeRadius;

  ctx.beginPath();
  ctx.arc(pt.x, pt.y, radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

/**
 * Edge
 */
Edge.prototype.draw = function(ctx, pt1, pt2) {
   this.drawLine(ctx, pt1, pt2); 
};

Edge.prototype.drawLine = function(ctx, pt1, pt2, opacityPercent) {
  var color = new Color(graphics.edgeStroke);
  color.a = color.a * (opacityPercent === undefined ? 1 : opacityPercent);

  ctx.lineWidth = graphics.edgeWidth + 1;
  ctx.strokeStyle = color.toRGBA();
  ctx.fillStyle = null;

  ctx.beginPath();
  ctx.moveTo(pt1.x, pt1.y);
  ctx.lineTo(pt2.x, pt2.y);
  ctx.stroke();
};

