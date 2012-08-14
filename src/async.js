/**
 * Util classes
 */


/* 
    var e = sys.addEdge(node1, node2);
*/

function Scheduler(closures, options) {
  if (!closures || !closures.length) {
    throw new Error('invalid params');
  }

  this.closures = closures;

  this.options = options || {};
  this.interval = this.options.interval || 400;

  this.done = false;
  this.timeOut = null;
  this.index = 0;
}

Scheduler.prototype.start = function() {
  // set the first interval
  this.index = 0;
  this.done = false;
  this.setNext();
};

Scheduler.prototype.setNext = function(interval) {
  this.timeOut = setTimeout(_.bind(function() {
      this.step();
  }, this),
  interval || this.interval);
};

Scheduler.prototype.finish = function() {
  this.done = true;
  clearTimeout(this.timeOut);
  this.timeOut = null;

  if (this.options.callback) {
    this.options.callback();
  }
};

Scheduler.prototype.step = function() {
  if (this.done) {
    return;
  }

  var results = this.closures[this.index]() || {};
  this.index++;

  if (results.done || this.index >= this.closures.length) {
    this.finish();
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
    setTimeout(_.bind(function() {
      this.start();
    }, this), wait);
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
    _.bind(function() {
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
