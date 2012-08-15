/**
 * Util classes
 */

function CommandQueue() {
  this.commands = [];
  this.consumeTimeout = null;

  this.initialDelay = 400;
}

CommandQueue.prototype.add = function(command) {
  this.commands.push(command);
  this.touchTimer();
};

CommandQueue.prototype.touchTimer = function() {
  if (this.consumeTimeout) {
    return;
  }
  this.consumeTimeout = setTimeout(_.bind(function() {
    this.next();
  }, this), this.initialDelay);
};

CommandQueue.prototype.reset = function() {
  this.consumeTimeout = null;
};

CommandQueue.prototype.next = function() {
  if (this.commands.length == 0) {
    this.reset();
    return;
  }

  // execute the top command by passing it into the engine
  var toExecute = this.commands.shift(0);
  var callback = _.bind(function() {
    this.next();
  }, this);
  gitEngine.execute(toExecute, callback);
};



/******************
 * Planning:

 here is the major flow:

 someone types in a command ->
  make a new command object. if error, give immediate feedback, dont append to queue
  if not error ->
    append command object to queue


  Command Queue ->
    consume commands at a certain rate (either instantly if just added, or with an interval
    Execute command -> (usually a git engine thing)
    Wait for git engine command to finish
    when done, execute next command (if more)

  so two levels of Async-ness:
    command queue slowly consumes commands

  GitEngine executes commands, which will have async bits to them (such as popping off commits for a
  rebase)
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
