/**
 * Globals
 */
var events = _.clone(Backbone.Events);
var sys = null;
var graphicsEffects = {};
var gitEngine = null;
var gitVisuals = null;

$(document).ready(function(){
  sys = arbor.ParticleSystem(4000, 500, 0.5, false, 55, 0.005, 'verlet');
  sys.renderer = Renderer('#viewport');

  new CommandLineView({
    el: $('#commandLineBar')
  });
  new CommandLineHistoryView({
    el: $('#commandLineHistory')
  });

  gitEngine = new GitEngine();
  gitVisuals = new GitVisuals();

  var repulsionBreathe = function(r) {
    sys.parameters({repulsion: r});
  };
  var b = new Breather(repulsionBreathe, 6050, 4000);

  graphicsEffects.edgeStrokeEffect = new GraphicsEffect('edgeStroke', {wait: 1000});
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


/**
 * class GraphicsEffect
 */
function GraphicsEffect(gKey, options) {
  this.baseColor = graphics[gKey];

  this.closure = (function(base_color) {
    var oSetter = function(o) {
      var color = new Color(base_color);
      color.a *= o;
      graphics[gKey] = color.toRGBA();
    };
    return oSetter;
  })(this.baseColor);

  this.breather = new Breather(
    this.closure,
    options.midpoint || 0.9,
    options.amp || 0.85,
    options.period || 0.1,
    options.wait || 0
  );
}

GraphicsEffect.prototype.pause = function() {
  this.breather.stop();
};

GraphicsEffect.prototype.resume = function() {
  this.breather.next();
};

/**
 * class Breather
 */
function Breather(closure, baseline, delta, period, wait) {
  this.delta = delta;
  this.baseline = baseline;
  this.closure = closure;

  this.t = 0;
  this.interval = 1/40 * 1000; // 40fps

  var period_in_seconds = period || time.breathePeriod;
  this.period = 2 * Math.PI * 1000 * period_in_seconds;

  this.interpolationFunction = TWEEN.Easing.Cubic.EaseInOut;

  if (wait) {
    var _this = this;
    setTimeout(function() {
      _this.start();
    }, wait);
  } else {
    this.start();
  }
}

Breather.prototype.start = function() {
  this.t = 0;
  this.next();
};

Breather.prototype.next = function() {
  this.timeout = setTimeout(
    $.proxy(function() {
      this.breathe();
    }, this),
  this.interval);
};

Breather.prototype.stop = function() {
  clearTimeout(this.timeout);
};

Breather.prototype.breathe = function() {
  this.t += this.interval;

  var value = Math.sin(this.t / this.period) * this.delta + this.baseline;
  this.closure(value);

  this.next();
};

