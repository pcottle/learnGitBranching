/**
 * Util classes
 */

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

  //console.log(this.type + ' is stepping with index ' + this.index);
  var results = this.closures[this.index]() || {};
  this.index++;

  if (results.done || this.index >= this.closures.length) {
    this.done = true;
    return;
  }
  this.setNext(results.interval);
};

/**
 * Constants....!!!
 */
var constants = {
  clickDragMass: 20,
  baseMass: 1,
};

var time = {
  edgeAddInterval: 200,
  breathePeriod: 0.3
};

/**
 * Graphics style
 */
var graphics = {
  // colors
  edgeStroke: 'rgba(94%, 96%, 98%, 0.5)', // '#EFF5FB',
  nodeEdge: 'rgba(94%, 96%, 98%, 0.9)', // '#EFF5FB',
  nodeFill: '#0066cc',

  // widths
  nodeStrokeWidth: 15,
  edgeWidth: 2,
};

function randomString(string_length) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}
