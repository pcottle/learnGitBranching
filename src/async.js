/**
 * Util classes
 */


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


function Scheduler(closures, interval, type) {
  if (!closures || !closures.length || !interval || !type) {
    throw new Error('invalid params');
  }

  this.done = false;
  this.closures = closures;
  this.interval = interval;
  this.type = type;
  this.timeOut = null;
  this.index = 0;

  ee.addListener('scheduler_stop', this.stopSchedule, this);
}

Scheduler.prototype.start = function() {
  // set the first interval
  this.index = 0;
  this.done = false;
  this.setNext();
};

Scheduler.prototype.setNext = function(interval) {
  var _this = this;
  this.timeOut = setTimeout(function() {
    _this.step();
  }, interval || this.interval);
};

Scheduler.prototype.stopSchedule = function(type) {
  console.log('received event signal');
  if (type == 'all' || type == this.type) {
    // either of these should work...
    this.done = true;
    clearTimeout(this.timeOut);
  }
};

Scheduler.prototype.step = function() {
  if (this.done) {
    return;
  }

  var results = this.closures[this.index]() || {};
  this.index++;

  if (results.done || this.index >= this.closures.length) {
    this.done = true;
    return;
  }
  this.setNext(results.interval);
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
