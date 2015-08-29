var _ = require('underscore');
var Backbone = require('backbone');
var GRAPHICS = require('../util/constants').GRAPHICS;

var VisBase = require('../visuals/visBase').VisBase;

var VisNode = VisBase.extend({
  defaults: {
    depth: undefined,
    maxWidth: null,
    outgoingEdges: null,

    circle: null,
    text: null,

    id: null,
    pos: null,
    radius: null,

    commit: null,
    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing,

    fill: GRAPHICS.defaultNodeFill,
    'stroke-width': GRAPHICS.defaultNodeStrokeWidth,
    stroke: GRAPHICS.defaultNodeStroke
  },

  getID: function() {
    return this.get('id');
  },

  validateAtInit: function() {
    if (!this.get('id')) {
      throw new Error('need id for mapping');
    }
    if (!this.get('commit')) {
      throw new Error('need commit for linking');
    }

    if (!this.get('pos')) {
      this.set('pos', {
        x: Math.random(),
        y: Math.random()
      });
    }
  },

  initialize: function() {
    this.validateAtInit();
    // shorthand for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');

    this.set('outgoingEdges', []);
  },

  setDepth: function(depth) {
    // for merge commits we need to max the depths across all
    this.set('depth', Math.max(this.get('depth') || 0, depth));
  },

  setDepthBasedOn: function(depthIncrement, offset) {
    if (this.get('depth') === undefined) {
      throw new Error('no depth yet!');
    }
    var pos = this.get('pos');
    pos.y = this.get('depth') * depthIncrement + offset;
  },

  getMaxWidthScaled: function() {
    // returns our max width scaled based on if we are visible
    // from a branch or not
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    var map = {
      branch: 1,
      tag: 1,
      head: 0.3,
      none: 0.1
    };
    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat] * this.get('maxWidth');
  },

  toFront: function() {
    this.get('circle').toFront();
    this.get('text').toFront();
  },

  getOpacity: function() {
    var map = {
      'branch': 1,
      'tag' : 1,
      'head': GRAPHICS.upstreamHeadOpacity,
      'none': GRAPHICS.upstreamNoneOpacity
    };

    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    if (map[stat] === undefined) {
      throw new Error('invalid status');
    }
    return map[stat];
  },

  getTextScreenCoords: function() {
    return this.getScreenCoords();
  },

  getAttributes: function() {
    var pos = this.getScreenCoords();
    var textPos = this.getTextScreenCoords();
    var opacity = this.getOpacity();
    var dashArray = (this.getIsInOrigin()) ?
      GRAPHICS.originDash : '';

    return {
      circle: {
        cx: pos.x,
        cy: pos.y,
        opacity: opacity,
        r: this.getRadius(),
        fill: this.getFill(),
        'stroke-width': this.get('stroke-width'),
        'stroke-dasharray': dashArray,
        stroke: this.get('stroke')
      },
      text: {
        x: textPos.x,
        y: textPos.y,
        opacity: opacity
      }
    };
  },

  animatePositionTo: function(visNode, speed, easing) {
    var attributes = this.getAttributes();
    var destAttributes = visNode.getAttributes();

    // TODO make not hardcoded
    attributes.circle = destAttributes.circle;
    attributes.text = destAttributes.text;
    this.animateToAttr(attributes, speed, easing);
  },

  highlightTo: function(visObj, speed, easing) {
    // a small function to highlight the color of a node for demonstration purposes
    var color = visObj.get('fill');

    var attr = {
      circle: {
        fill: color,
        stroke: color,
        'stroke-dasharray': '',
        'stroke-width': this.get('stroke-width') * 5
      },
      text: {}
    };

    this.animateToAttr(attr, speed, easing);
  },

  animateUpdatedPosition: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToSnapshot: function(snapShot, speed, easing) {
    if (!snapShot[this.getID()]) {
      return;
    }
    this.animateToAttr(snapShot[this.getID()], speed, easing);
  },

  setAttr: function(attr, instant, speed, easing) {
    var keys = ['text', 'circle'];
    this.setAttrBase(keys, attr, instant, speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    VisBase.prototype.animateToAttr.apply(this, arguments);
    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    if (easing == 'bounce' &&
        attr.circle && attr.circle.cx !== undefined &&
        attr.text && attr.text.x !== undefined ) {
      // animate the x attribute without bouncing so it looks like there's
      // gravity in only one direction. Just a small animation polish
      this.get('circle').animate(attr.circle.cx, s, 'easeInOut');
      this.get('text').animate(attr.text.x, s, 'easeInOut');
    }
  },

  getScreenCoords: function() {
    var pos = this.get('pos');
    return this.gitVisuals.toScreenCoords(pos);
  },

  getRadius: function() {
    return this.get('radius') || GRAPHICS.nodeRadius;
  },

  getParentScreenCoords: function() {
    return this.get('commit').get('parents')[0].get('visNode').getScreenCoords();
  },

  setBirthPosition: function() {
    // utility method for animating it out from underneath a parent
    var parentCoords = this.getParentScreenCoords();

    this.get('circle').attr({
      cx: parentCoords.x,
      cy: parentCoords.y,
      opacity: 0,
      r: 0
    });
    this.get('text').attr({
      x: parentCoords.x,
      y: parentCoords.y,
      opacity: 0
    });
  },

  setBirthFromSnapshot: function(beforeSnapshot) {
    // first get parent attribute
    // woof this is pretty bad data access...
    var parentID = this.get('commit').get('parents')[0].get('visNode').getID();
    var parentAttr = beforeSnapshot[parentID];

    // then set myself faded on top of parent
    this.get('circle').attr({
      opacity: 0,
      r: 0,
      cx: parentAttr.circle.cx,
      cy: parentAttr.circle.cy
    });

    this.get('text').attr({
      opacity: 0,
      x: parentAttr.text.x,
      y: parentAttr.text.y
    });

    // then do edges
    var parentCoords = {
      x: parentAttr.circle.cx,
      y: parentAttr.circle.cy
    };
    this.setOutgoingEdgesBirthPosition(parentCoords);
  },

  setBirth: function() {
    this.setBirthPosition();
    this.setOutgoingEdgesBirthPosition(this.getParentScreenCoords());
  },

  setOutgoingEdgesOpacity: function(opacity) {
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.setOpacity(opacity);
    });
  },

  animateOutgoingEdgesToAttr: function(snapShot, speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      var attr = snapShot[edge.getID()];
      edge.animateToAttr(attr);
    }, this);
  },

  animateOutgoingEdges: function(speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.animateUpdatedPath(speed, easing);
    }, this);
  },

  animateOutgoingEdgesFromSnapshot: function(snapshot, speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      var attr = snapshot[edge.getID()];
      edge.animateToAttr(attr, speed, easing);
    }, this);
  },

  setOutgoingEdgesBirthPosition: function(parentCoords) {
    _.each(this.get('outgoingEdges'), function(edge) {
      var headPos = edge.get('head').getScreenCoords();
      var path = edge.genSmoothBezierPathStringFromCoords(parentCoords, headPos);
      edge.get('path').stop();
      edge.get('path').attr({
        path: path,
        opacity: 0
      });
    }, this);
  },

  parentInFront: function() {
    // woof! talk about bad data access
    this.get('commit').get('parents')[0].get('visNode').toFront();
  },

  getFontSize: function(str) {
    if (str.length < 3) {
      return 12;
    } else if (str.length < 5) {
      return 10;
    } else {
      return 8;
    }
  },

  getFill: function() {
    // first get our status, might be easy from this
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    if (stat == 'head') {
      return GRAPHICS.headRectFill;
    } else if (stat == 'tag') {
      return GRAPHICS.orphanNodeFill;
    } else if (stat == 'none') {
      return GRAPHICS.orphanNodeFill;
    }

    // now we need to get branch hues
    return this.gitVisuals.getBlendedHuesForCommit(this.get('commit'));
  },

  attachClickHandlers: function() {
    if (this.get('gitVisuals').options.noClick) {
      return;
    }
    var commandStr = 'git checkout ' + this.get('commit').get('id');
    var Main = require('../app');
    _.each([this.get('circle'), this.get('text')], function(rObj) {
      rObj.click(function() {
        Main.getEventBaton().trigger('commandSubmitted', commandStr);
      });
      $(rObj.node).css('cursor', 'pointer');
    });
  },

  setOpacity: function(opacity) {
    opacity = (opacity === undefined) ? 1 : opacity;

    // set the opacity on my stuff
    var keys = ['circle', 'text'];
    _.each(keys, function(key) {
      this.get(key).attr({
        opacity: opacity
      });
    }, this);
  },

  remove: function() {
    this.removeKeys(['circle'], ['text']);
    // needs a manual removal of text for whatever reason
    var text = this.get('text');
    if (text) {
      text.remove();
    }

    this.gitVisuals.removeVisNode(this);
  },

  removeAll: function() {
    this.remove();
    this.removeAllEdges();
  },

  removeAllEdges: function() {
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.remove();
    }, this);
  },

  getExplodeStepFunc: function(speed) {
    if (!speed) {
      throw new Error('need speed by now');
    }
    var circle = this.get('circle');

    // decide on a speed
    var speedMag = 20 / speed;
    // aim upwards
    var angle = Math.PI + Math.random() * 1 * Math.PI;
    var gravity = (1 / 5) * speed;
    var drag = (1 / 100) * speed;

    var vx = speedMag * Math.cos(angle);
    var vy = speedMag * Math.sin(angle);
    var x = circle.attr('cx');
    var y = circle.attr('cy');

    var maxWidth = this.gitVisuals.paper.width;
    var maxHeight = this.gitVisuals.paper.height;
    var elasticity = 0.8 / speed;
    var dt = 1.0;

    var stepFunc = function() {
      // lol epic runge kutta here... not
      vy += gravity * dt - drag * vy;
      vx -= drag * vx;
      x += vx * dt;
      y += vy * dt;

      if (x < 0 || x > maxWidth) {
        vx = elasticity * -vx;
        x = (x < 0) ? 0 : maxWidth;
      }
      if (y < 0 || y > maxHeight) {
        vy = elasticity * -vy;
        y = (y < 0) ? 0 : maxHeight;
      }

      circle.attr({
        cx: x,
        cy: y
      });
      // continuation calculation
      if ((vx * vx + vy * vy) < 0.1 && Math.abs(y - maxHeight) <= 0.1) {
        // dont need to animate anymore, we are on ground
        return false;
      }
      // keep animating!
      return true;
    };
    return stepFunc;
  },

  makeCircle: function(paper) {
    var pos = this.getScreenCoords();
    return paper.circle(
      pos.x,
      pos.y,
      this.getRadius()
    ).attr(this.getAttributes().circle);
  },

  makeText: function(paper) {
    var textPos = this.getTextScreenCoords();
    return paper.text(textPos.x, textPos.y, String(this.get('id')));
  },

  genGraphics: function() {
    var paper = this.gitVisuals.paper;
    var circle = this.makeCircle(paper);
    var text = this.makeText(paper);

    text.attr({
      'font-size': this.getFontSize(this.get('id')),
      'font-weight': 'bold',
      'font-family': 'Monaco, Courier, font-monospace',
      opacity: this.getOpacity()
    });

    this.set('circle', circle);
    this.set('text', text);

    this.attachClickHandlers();
  }
});

exports.VisNode = VisNode;
