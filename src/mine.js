
/**
 * Globals
 */
var ee = null;
var sys = null;
var engine = null;
var graphicsEffects = {};

$(document).ready(function(){
  engine = new Engine();
  ee = new EventEmitter();

  var mcp = Maps("#maps");

  var repulsionBreathe = function(r) {
    sys.parameters({repulsion: r});
  };
  var b = new Breather(repulsionBreathe, 6050, 4000);

  graphicsEffects.edgeStrokeEffect = new GraphicsEffect('edgeStroke', {wait: 1000});
});
/**
 * Extend the Arbiter classes below with my own custom functionality to
 * stop this horrible object cross link stuff
 */
Node.prototype.afterConstruct = function() {
  this.positions = [];
};

Node.prototype.draw = function(ctx, pt) {
  this.drawCircleNode(ctx, pt);
};

Node.prototype.drawCircleNode = function(ctx, pt) {
  ctx.strokeStyle = graphics.nodeEdge;
  ctx.lineWidth = graphics.nodeStrokeWidth;
  ctx.fillStyle = graphics.nodeFill;

  ctx.beginPath();
  ctx.arc(pt.x, pt.y, 10, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

};

/**
 * Edge
 */
Edge.prototype.afterConstruct = function() {
  //this.pastEdges = [];
};

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
 * Breather
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
  var _this = this;
  this.timeout = setTimeout(function() {
    _this.breathe();
  }, this.interval);
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

/**
 * Particle System Engine
 *
 * Handles async stuff like adding the edges, etc
 */
function Engine() {
  this.addEdgeTimeout = null;
  this.edgeClosures = [];
}

Engine.prototype.addEdge = function(node1, node2) {
  this.touchEdgeTimer();

  this.edgeClosures.push(this.edgeClosureFactory(node1, node2));
};

Engine.prototype.edgeClosureFactory = function(node1, node2) {
  var c = function() {
    var e = sys.addEdge(node1, node2);
    if (e) {
      e.afterConstruct();
    }
  };
  return c;
};

Engine.prototype.touchEdgeTimer = function(key) {
  if (this.addEdgeTimeout) {
    return;
  }

  var _this = this;
  this.addEdgeTimeout = setTimeout(function() {
    _this.startEdgeScheduler();
  }, 100);
};

Engine.prototype.startEdgeScheduler = function() {
  // start scheduler
  var s = new Scheduler(this.edgeClosures, time.edgeAddInterval, 'add_edge');
  s.start();

  this.resetEdges();
};

Engine.prototype.resetEdges = function() {
  this.edgeClosures = [];
  this.addEdgeTimeout = null;
};

/**
 * Cover Photo
 */
function CoverPhoto(id, profile_pic_src, cover_photo_src) {
  this.pp_src = profile_pic_src;
  this.cp_src = cover_photo_src;
  this.profile_id = id;

  // this is where I _should_ use templating... but i wont :P
  this.html = '' +
  '<div id="' + id + 'coverphoto" class="coverPhotoWrapper">' +
    '<div class="coverPhotoDiv">' +
      '<img src="' + this.cp_src + '"/>' +
    '</div>' +
  '</div>' +
  '<div id="' + id + 'profilepic" class="profilePicCenter">' + 
    '<div class="profilePicDiv">' +
      '<img src="' + this.pp_src + '"/>' +
    '</div>' +
  '</div>'
  ;

  $('body').append(this.html);
  this.cp_node = $('#' + id + 'coverphoto')[0];
  this.pp_node = $('#' + id + 'profilepic')[0];
};

CoverPhoto.prototype.show = function() {
  var _this = this;
  // let it get drawn first so it animates
  setTimeout(function() {
    _this.toggleShow(true);
  }, 10);
};

CoverPhoto.prototype.hide = function() {
  this.toggleShow(false);
};

CoverPhoto.prototype.toggle = function() {
  $(this.cp_node).toggleClass('visible');
  $(this.pp_node).toggleClass('visible');
};

CoverPhoto.prototype.toggleShow = function(bool) {
  $(this.cp_node).toggleClass('visible', bool);
  $(this.pp_node).toggleClass('visible', bool);
};

var profile_pic_src = 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/368844_545515979_1956877679_n.jpg';
var cover_photo_src = 'https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash3/c0.0.851.315/p851x315/564389_10150741774845980_1149055874_n.jpg';
var c = new CoverPhoto('pcottle', profile_pic_src, cover_photo_src);

c.show();
setTimeout(function() {
  c.hide();
}, 2000);

