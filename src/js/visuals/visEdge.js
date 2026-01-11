var GRAPHICS = require('../util/constants').GRAPHICS;

var VisBase = require('../visuals/visBase').VisBase;
var GlobalStateStore = require('../stores/GlobalStateStore');

class VisEdge extends VisBase {
  constructor(options) {
    var defaults = {
      tail: null,
      head: null,
      animationSpeed: GRAPHICS.defaultAnimationTime,
      animationEasing: GRAPHICS.defaultEasing
    };
    super(Object.assign({}, defaults, options));
    this.initialize();
  }

  validateAtInit() {
    var required = ['tail', 'head'];
    required.forEach(function(key) {
      if (!this.get(key)) {
        throw new Error(key + ' is required!');
      }
    }, this);
  }

  getID() {
    return this.get('tail').get('id') + '.' + this.get('head').get('id');
  }

  initialize() {
    this.validateAtInit();

    // shorthand for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');

    this.get('tail').get('outgoingEdges').push(this);
  }

  remove() {
    this.removeKeys(['path']);
    this.gitVisuals.removeVisEdge(this);
  }

  genSmoothBezierPathString(tail, head) {
    var tailPos = tail.getScreenCoords();
    var headPos = head.getScreenCoords();
    return this.genSmoothBezierPathStringFromCoords(tailPos, headPos);
  }

  genSmoothBezierPathStringFromCoords(tailPos, headPos) {
    // we need to generate the path and control points for the bezier. format
    // is M(move abs) C (curve to) (control point 1) (control point 2) (final point)
    // the control points have to be __below__ to get the curve starting off straight.

    var flipFactor = (GlobalStateStore.getFlipTreeY()) ? -1 : 1;
    var coords = function(pos) {
      return String(Math.round(pos.x)) + ',' + String(Math.round(pos.y));
    };
    var offset = function(pos, dir, delta) {
      delta = delta || GRAPHICS.curveControlPointOffset;
      return {
        x: pos.x,
        y: pos.y + flipFactor * delta * dir
      };
    };
    var offset2d = function(pos, x, y) {
      return {
        x: pos.x + x,
        y: pos.y + flipFactor * y
      };
    };

    // first offset tail and head by radii
    tailPos = offset(tailPos, -1, this.get('tail').getRadius());
    headPos = offset(headPos, 1, this.get('head').getRadius() * 1.15);

    var str = '';
    // first move to bottom of tail
    str += 'M' + coords(tailPos) + ' ';
    // start bezier
    str += 'C';
    // then control points above tail and below head
    str += coords(offset(tailPos, -1)) + ' ';
    str += coords(offset(headPos, 1)) + ' ';
    // now finish
    str += coords(headPos);

    // arrow head
    var delta = GRAPHICS.arrowHeadSize || 10;
    str += ' L' + coords(offset2d(headPos, -delta, delta));
    str += ' L' + coords(offset2d(headPos, delta, delta));
    str += ' L' + coords(headPos);

    // then go back, so we can fill correctly
    str += 'C';
    str += coords(offset(headPos, 1)) + ' ';
    str += coords(offset(tailPos, -1)) + ' ';
    str += coords(tailPos);

    return str;
  }

  getBezierCurve() {
    return this.genSmoothBezierPathString(this.get('tail'), this.get('head'));
  }

  getStrokeColor() {
    return GRAPHICS.visBranchStrokeColorNone;
  }

  setOpacity(opacity) {
    opacity = (opacity === undefined) ? 1 : opacity;

    this.get('path').attr({opacity: opacity});
  }

  genGraphics(paper) {
    var pathString = this.getBezierCurve();

    var path = paper.path(pathString).attr({
      'stroke-width': GRAPHICS.visBranchStrokeWidth,
      'stroke': this.getStrokeColor(),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'fill': this.getStrokeColor()
    });
    path.toBack();
    this.set('path', path);
  }

  getOpacity() {
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('tail'));
    var map = {
      'branch': 1,
      'tag': 1,
      'head': GRAPHICS.edgeUpstreamHeadOpacity,
      'none': GRAPHICS.edgeUpstreamNoneOpacity
    };

    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat];
  }

  getAttributes() {
    var newPath = this.getBezierCurve();
    var opacity = this.getOpacity();
    return {
      path: {
        path: newPath,
        opacity: opacity
      }
    };
  }

  animateUpdatedPath(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  }

  animateFromAttrToAttr(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  }

  animateToAttr(attr, speed, easing) {
    if (speed === 0) {
      this.get('path').attr(attr.path);
      return;
    }

    this.get('path').toBack();
    this.get('path').stop();
    this.get('path').animate(
      attr.path,
      speed !== undefined ? speed : this.get('animationSpeed'),
      easing || this.get('animationEasing')
    );
  }
}

class VisEdgeCollection {
  constructor() {
    this._events = {};
    this.models = [];
    this.length = 0;
  }
  add(model) {
    this.models.push(model);
    this.length = this.models.length;
  }
  remove(model) {
    var index = this.models.indexOf(model);
    if (index > -1) {
      this.models.splice(index, 1);
      this.length = this.models.length;
    }
  }
  reset() {
    this.models = [];
    this.length = 0;
  }
  each(callback, context) {
    this.models.forEach(callback, context);
  }
  toArray() {
    return this.models.slice();
  }
  on(eventName, callback, context) {
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push({ callback, context: context || this });
  }
  trigger(eventName, ...args) {
    var listeners = this._events[eventName];
    if (listeners) listeners.forEach(l => l.callback.apply(l.context, args));
  }
}

exports.VisEdgeCollection = VisEdgeCollection;
exports.VisEdge = VisEdge;
