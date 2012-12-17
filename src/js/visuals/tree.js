if (!require('../util').isBrowser()) {
  var _ = require('underscore');
  var Backbone = require('backbone');
}

var GRAPHICS = require('../util/constants').GRAPHICS;

var randomHueString = function() {
  var hue = Math.random();
  var str = 'hsb(' + String(hue) + ',0.7,1)';
  return str;
};

var VisBase = Backbone.Model.extend({
  removeKeys: function(keys) {
    _.each(keys, function(key) {
      if (this.get(key)) {
        this.get(key).remove();
      }
    }, this);
  }
});

var VisBranch = VisBase.extend({
  defaults: {
    pos: null,
    text: null,
    rect: null,
    arrow: null,
    isHead: false,
    flip: 1,

    fill: GRAPHICS.rectFill,
    stroke: GRAPHICS.rectStroke,
    'stroke-width': GRAPHICS.rectStrokeWidth,

    offsetX: GRAPHICS.nodeRadius * 4.75,
    offsetY: 0,
    arrowHeight: 14,
    arrowInnerSkew: 0,
    arrowEdgeHeight: 6,
    arrowLength: 14,
    arrowOffsetFromCircleX: 10,

    vPad: 5,
    hPad: 5,

    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
  },

  validateAtInit: function() {
    if (!this.get('branch')) {
      throw new Error('need a branch!');
    }
  },

  getID: function() {
    return this.get('branch').get('id');
  },

  initialize: function() {
    this.validateAtInit();

    // shorthand notation for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');
    if (!this.gitEngine) {
      console.log('throw damnit');
      throw new Error('asd');
    }

    this.get('branch').set('visBranch', this);
    var id = this.get('branch').get('id');

    if (id == 'HEAD') {
      // switch to a head ref
      this.set('isHead', true);
      this.set('flip', -1);

      this.set('fill', GRAPHICS.headRectFill);
    } else if (id !== 'master') {
      // we need to set our color to something random
      this.set('fill', randomHueString());
    }
  },

  getCommitPosition: function() {
    var commit = this.gitEngine.getCommitFromRef(this.get('branch'));
    var visNode = commit.get('visNode');
    return visNode.getScreenCoords();
  },

  getBranchStackIndex: function() {
    if (this.get('isHead')) {
      // head is never stacked with other branches
      return 0;
    }

    var myArray = this.getBranchStackArray();
    var index = -1;
    _.each(myArray, function(branch, i) {
      if (branch.obj == this.get('branch')) {
        index = i;
      }
    }, this);
    return index;
  },

  getBranchStackLength: function() {
    if (this.get('isHead')) {
      // head is always by itself
      return 1;
    }

    return this.getBranchStackArray().length;
  },

  getBranchStackArray: function() {
    var arr = this.gitVisuals.branchStackMap[this.get('branch').get('target').get('id')];
    if (arr === undefined) {
      // this only occurs when we are generating graphics inside of
      // a new Branch instantiation, so we need to force the update
      this.gitVisuals.calcBranchStacks();
      return this.getBranchStackArray();
    }
    return arr;
  },

  getTextPosition: function() {
    var pos = this.getCommitPosition();

    // then order yourself accordingly. we use alphabetical sorting
    // so everything is independent
    var myPos = this.getBranchStackIndex();
    return {
      x: pos.x + this.get('flip') * this.get('offsetX'),
      y: pos.y + myPos * GRAPHICS.multiBranchY + this.get('offsetY')
    };
  },

  getRectPosition: function() {
    var pos = this.getTextPosition();
    var f = this.get('flip');

    // first get text width and height
    var textSize = this.getTextSize();
    return {
      x: pos.x - 0.5 * textSize.w - this.get('hPad'),
      y: pos.y - 0.5 * textSize.h - this.get('vPad')
    };
  },

  getArrowPath: function() {
    // should make these util functions...
    var offset2d = function(pos, x, y) {
      return {
        x: pos.x + x,
        y: pos.y + y
      };
    };
    var toStringCoords = function(pos) {
      return String(Math.round(pos.x)) + ',' + String(Math.round(pos.y));
    };
    var f = this.get('flip');

    var arrowTip = offset2d(this.getCommitPosition(),
      f * this.get('arrowOffsetFromCircleX'),
      0
    );
    var arrowEdgeUp = offset2d(arrowTip, f * this.get('arrowLength'), -this.get('arrowHeight'));
    var arrowEdgeLow = offset2d(arrowTip, f * this.get('arrowLength'), this.get('arrowHeight'));

    var arrowInnerUp = offset2d(arrowEdgeUp,
      f * this.get('arrowInnerSkew'),
      this.get('arrowEdgeHeight')
    );
    var arrowInnerLow = offset2d(arrowEdgeLow,
      f * this.get('arrowInnerSkew'),
      -this.get('arrowEdgeHeight')
    );

    var tailLength = 49;
    var arrowStartUp = offset2d(arrowInnerUp, f * tailLength, 0);
    var arrowStartLow = offset2d(arrowInnerLow, f * tailLength, 0);

    var pathStr = '';
    pathStr += 'M' + toStringCoords(arrowStartUp) + ' ';
    var coords = [
      arrowInnerUp,
      arrowEdgeUp,
      arrowTip,
      arrowEdgeLow,
      arrowInnerLow,
      arrowStartLow
    ];
    _.each(coords, function(pos) {
      pathStr += 'L' + toStringCoords(pos) + ' ';
    }, this);
    pathStr += 'z';
    return pathStr;
  },

  getTextSize: function() {
    var getTextWidth = function(visBranch) {
      var textNode = visBranch.get('text').node;
      return (textNode === null) ? 1 : textNode.clientWidth;
    };

    var textNode = this.get('text').node;
    if (this.get('isHead')) {
      // HEAD is a special case
      return {
        w: textNode.clientWidth,
        h: textNode.clientHeight
      };
    }

    var maxWidth = 0;
    _.each(this.getBranchStackArray(), function(branch) {
      maxWidth = Math.max(maxWidth, getTextWidth(
        branch.obj.get('visBranch')
      ));
    });

    return {
      w: maxWidth,
      h: textNode.clientHeight
    };
  },

  getSingleRectSize: function() {
    var textSize = this.getTextSize();
    var vPad = this.get('vPad');
    var hPad = this.get('hPad');
    return {
      w: textSize.w + vPad * 2,
      h: textSize.h + hPad * 2
    };
  },

  getRectSize: function() {
    var textSize = this.getTextSize();
    // enforce padding
    var vPad = this.get('vPad');
    var hPad = this.get('hPad');

    // number of other branch names we are housing
    var totalNum = this.getBranchStackLength();
    return {
      w: textSize.w + vPad * 2,
      h: textSize.h * totalNum * 1.1 + hPad * 2
    };
  },

  getName: function() {
    var name = this.get('branch').get('id');
    var selected = this.gitEngine.HEAD.get('target').get('id');

    var add = (selected == name) ? '*' : '';
    return name + add;
  },

  nonTextToFront: function() {
    this.get('arrow').toFront();
    this.get('rect').toFront();
  },

  textToFront: function() {
    this.get('text').toFront();
  },

  getFill: function() {
    // in the easy case, just return your own fill if you are:
    // - the HEAD ref
    // - by yourself (length of 1)
    // - part of a multi branch, but your thing is hidden
    if (this.get('isHead') ||
        this.getBranchStackLength() == 1 ||
        this.getBranchStackIndex() !== 0) {
      return this.get('fill');
    }

    // woof. now it's hard, we need to blend hues...
    return this.gitVisuals.blendHuesFromBranchStack(this.getBranchStackArray());
  },

  remove: function() {
    this.removeKeys(['text', 'arrow', 'rect']);
    // also need to remove from this.gitVisuals
    this.gitVisuals.removeVisBranch(this);
  },

  genGraphics: function(paper) {
    var textPos = this.getTextPosition();
    var name = this.getName();
    var text;

    // when from a reload, we dont need to generate the text
    text = paper.text(textPos.x, textPos.y, String(name));
    text.attr({
      'font-size': 14,
      'font-family': 'Monaco, Courier, font-monospace',
      opacity: this.getTextOpacity()
    });
    this.set('text', text);

    var rectPos = this.getRectPosition();
    var sizeOfRect = this.getRectSize();
    var rect = paper
      .rect(rectPos.x, rectPos.y, sizeOfRect.w, sizeOfRect.h, 8)
      .attr(this.getAttributes().rect);
    this.set('rect', rect);

    var arrowPath = this.getArrowPath();
    var arrow = paper
      .path(arrowPath)
      .attr(this.getAttributes().arrow);
    this.set('arrow', arrow);

    rect.toFront();
    text.toFront();
  },

  updateName: function() {
    this.get('text').attr({
      text: this.getName()
    });
  },

  getNonTextOpacity: function() {
    if (this.get('isHead')) {
      return this.gitEngine.getDetachedHead() ? 1 : 0;
    }
    return this.getBranchStackIndex() === 0 ? 1 : 0.0;
  },

  getTextOpacity: function() {
    if (this.get('isHead')) {
      return this.gitEngine.getDetachedHead() ? 1 : 0;
    }
    return 1;
  },

  getAttributes: function() {
    var nonTextOpacity = this.getNonTextOpacity();
    var textOpacity = this.getTextOpacity();
    this.updateName();

    var textPos = this.getTextPosition();
    var rectPos = this.getRectPosition();
    var rectSize = this.getRectSize();

    var arrowPath = this.getArrowPath();

    return {
      text: {
        x: textPos.x,
        y: textPos.y,
        opacity: textOpacity
      },
      rect: {
        x: rectPos.x,
        y: rectPos.y,
        width: rectSize.w,
        height: rectSize.h,
        opacity: nonTextOpacity,
        fill: this.getFill(),
        stroke: this.get('stroke'),
        'stroke-width': this.get('stroke-width')
      },
      arrow: {
        path: arrowPath,
        opacity: nonTextOpacity,
        fill: this.getFill(),
        stroke: this.get('stroke'),
        'stroke-width': this.get('stroke-width')
      }
    };
  },

  animateUpdatedPos: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('text').attr(attr.text);
      this.get('rect').attr(attr.rect);
      this.get('arrow').attr(attr.arrow);
      return;
    }

    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    this.get('text').stop().animate(attr.text, s, e);
    this.get('rect').stop().animate(attr.rect, s, e);
    this.get('arrow').stop().animate(attr.arrow, s, e);
  }
});


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

  setDepthBasedOn: function(depthIncrement) {
    if (this.get('depth') === undefined) {
      debugger;
      throw new Error('no depth yet!');
    }
    var pos = this.get('pos');
    pos.y = this.get('depth') * depthIncrement;
  },

  getMaxWidthScaled: function() {
    // returns our max width scaled based on if we are visible
    // from a branch or not
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    var map = {
      branch: 1,
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

    return {
      circle: {
        cx: pos.x,
        cy: pos.y,
        opacity: opacity,
        r: this.getRadius(),
        fill: this.getFill(),
        'stroke-width': this.get('stroke-width'),
        stroke: this.get('stroke')
      },
      text: {
        x: textPos.x,
        y: textPos.y,
        opacity: opacity
      }
    };
  },

  highlightTo: function(visObj, speed, easing) {
    // a small function to highlight the color of a node for demonstration purposes
    var color = visObj.get('fill');

    var attr = {
      circle: {
        fill: color,
        stroke: color,
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

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('circle').attr(attr.circle);
      this.get('text').attr(attr.text);
      return;
    }

    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    this.get('circle').stop().animate(attr.circle, s, e);
    this.get('text').stop().animate(attr.text, s, e);

    // animate the x attribute without bouncing so it looks like there's
    // gravity in only one direction. Just a small animation polish
    this.get('circle').animate(attr.circle.cx, s, 'easeInOut');
    this.get('text').animate(attr.text.x, s, 'easeInOut');
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
    // woof bad data access. TODO
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
      edge.get('path').stop().attr({
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
    } else if (stat == 'none') {
      return GRAPHICS.orphanNodeFill;
    }

    // now we need to get branch hues
    return this.gitVisuals.getBlendedHuesForCommit(this.get('commit'));
  },

  attachClickHandlers: function() {
    var commandStr = 'git show ' + this.get('commit').get('id');
    var Main = require('../app');
    _.each([this.get('circle'), this.get('text')], function(rObj) {
      rObj.click(function() {
        Main.getEvents().trigger('processCommandFromEvent', commandStr);
      });
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
    this.get('text').remove();

    this.gitVisuals.removeVisNode(this);
  },

  removeAll: function() {
    this.remove();
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.remove();
    }, this);
  },

  genGraphics: function() {
    var paper = this.gitVisuals.paper;

    var pos = this.getScreenCoords();
    var textPos = this.getTextScreenCoords();

    var circle = paper.circle(
      pos.x,
      pos.y,
      this.getRadius()
    ).attr(this.getAttributes().circle);

    var text = paper.text(textPos.x, textPos.y, String(this.get('id')));
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

var VisEdge = VisBase.extend({
  defaults: {
    tail: null,
    head: null,
    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
  },

  validateAtInit: function() {
    var required = ['tail', 'head'];
    _.each(required, function(key) {
      if (!this.get(key)) {
        throw new Error(key + ' is required!');
      }
    }, this);
  },

  getID: function() {
    return this.get('tail').get('id') + '.' + this.get('head').get('id');
  },

  initialize: function() {
    this.validateAtInit();

    // shorthand for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');

    this.get('tail').get('outgoingEdges').push(this);
  },

  remove: function() {
    this.removeKeys(['path']);
    this.gitVisuals.removeVisEdge(this);
  },

  genSmoothBezierPathString: function(tail, head) {
    var tailPos = tail.getScreenCoords();
    var headPos = head.getScreenCoords();
    return this.genSmoothBezierPathStringFromCoords(tailPos, headPos);
  },

  genSmoothBezierPathStringFromCoords: function(tailPos, headPos) {
    // we need to generate the path and control points for the bezier. format
    // is M(move abs) C (curve to) (control point 1) (control point 2) (final point)
    // the control points have to be __below__ to get the curve starting off straight.

    var coords = function(pos) {
      return String(Math.round(pos.x)) + ',' + String(Math.round(pos.y));
    };
    var offset = function(pos, dir, delta) {
      delta = delta || GRAPHICS.curveControlPointOffset;
      return {
        x: pos.x,
        y: pos.y + delta * dir
      };
    };
    var offset2d = function(pos, x, y) {
      return {
        x: pos.x + x,
        y: pos.y + y
      };
    };

    // first offset tail and head by radii
    tailPos = offset(tailPos, -1, this.get('tail').getRadius());
    headPos = offset(headPos, 1, this.get('head').getRadius());

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
  },

  getBezierCurve: function() {
    return this.genSmoothBezierPathString(this.get('tail'), this.get('head'));
  },

  getStrokeColor: function() {
    return GRAPHICS.visBranchStrokeColorNone;
  },

  setOpacity: function(opacity) {
    opacity = (opacity === undefined) ? 1 : opacity;

    this.get('path').attr({opacity: opacity});
  },

  genGraphics: function(paper) {
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
  },

  getOpacity: function() {
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('tail'));
    var map = {
      'branch': 1,
      'head': GRAPHICS.edgeUpstreamHeadOpacity,
      'none': GRAPHICS.edgeUpstreamNoneOpacity
    };

    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat];
  },

  getAttributes: function() {
    var newPath = this.getBezierCurve();
    var opacity = this.getOpacity();
    return {
      path: {
        path: newPath,
        opacity: opacity
      }
    };
  },

  animateUpdatedPath: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('path').attr(attr.path);
      return;
    }

    this.get('path').toBack();
    this.get('path').stop().animate(
      attr.path,
      speed !== undefined ? speed : this.get('animationSpeed'),
      easing || this.get('animationEasing')
    );
  }
});

var VisEdgeCollection = Backbone.Collection.extend({
  model: VisEdge
});

var VisBranchCollection = Backbone.Collection.extend({
  model: VisBranch
});

exports.VisEdgeCollection = VisEdgeCollection;
exports.VisBranchCollection = VisBranchCollection;
exports.VisNode = VisNode;
exports.VisEdge = VisEdge;
exports.VisBranch = VisBranch;

