var VisBranch = Backbone.Model.extend({
  defaults: {
    pos: null,
    text: null,
    rect: null,
    arrow: null,
    offsetX: GRAPHICS.nodeRadius * 4.75,
    offsetY: 0,
    arrowInnerMargin: 8,
    arrowLength: 15,
    arrowRatio: 3.5,
    arrowEdgeHeight: 5,
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

  initialize: function() {
    this.validateAtInit();
  },

  getCommitPosition: function() {
    var commit = this.get('branch').get('target');
    var visNode = commit.get('visNode');
    return visNode.getScreenCoords();
  },

  getTextPosition: function() {
    var pos = this.getCommitPosition();
    return {
      x: pos.x + this.get('offsetX'),
      y: pos.y + this.get('offsetY')
    };
  },

  getRectPosition: function() {
    var pos = this.getTextPosition();
    // first get text width and height
    var textSize = this.getTextSize();
    return {
      x: pos.x - 0.5 * textSize.w - this.get('hPad'),
      y: pos.y - 0.5 * textSize.h - this.get('vPad')
    }
  },

  getArrowPath: function() {
    var offset2d = function(pos, x, y) {
      return {
        x: pos.x + x,
        y: pos.y + y
      };
    };
    var coords = function(pos) {
      return String(Math.round(pos.x)) + ',' + String(Math.round(pos.y));
    };


    // worst variable names evar
    // start at rect corner
    var overlap = 5;
    var startPos = offset2d(this.getRectPosition(), overlap, this.get('arrowInnerMargin'));
    // first the beginning of the head
    var next = offset2d(startPos, -this.get('arrowLength'), 0);
    // head side point
    var next2 = offset2d(next, 0, -this.get('arrowEdgeHeight'));
    // head point
    var next3 = offset2d(this.getTextPosition(),
      -this.get('arrowLength') * this.get('arrowRatio'), 0);

    // get the next three points in backwards order
    var end = offset2d(this.getRectPosition(), overlap, this.getRectSize().h - this.get('arrowInnerMargin'));
    var beforeEnd = offset2d(end, -this.get('arrowLength'), 0);
    var beforeBeforeEnd = offset2d(beforeEnd, 0, this.get('arrowEdgeHeight'));

    var pathStr = '';
    pathStr += 'M' + coords(startPos) + ' ';
    _.each([next, next2, next3, beforeBeforeEnd, beforeEnd, end], function(pos) {
      pathStr += 'L' + coords(pos) + ' ';
    }, this);
    pathStr += 'z';
    return pathStr;
  },

  getTextSize: function() {
    var textNode = this.get('text').node;
    var w = textNode.clientWidth;
    var h = textNode.clientHeight;
    return {
      w: textNode.clientWidth,
      h: textNode.clientHeight
    };
  },

  getRectSize: function() {
    var textSize = this.getTextSize();
    // enforce padding
    var vPad = this.get('vPad');
    var hPad = this.get('hPad');
    return {
      w: textSize.w + vPad * 2,
      h: textSize.h + hPad * 2
    };
  },

  getName: function() {
    var name = this.get('branch').get('id');
    var selected = gitEngine.HEAD.get('target').get('id');

    var add = (selected == name) ? '*' : '';
    return name + add;
  },

  genGraphics: function(paper) {
    var textPos = this.getTextPosition();

    var name = this.getName();
    var text = paper.text(textPos.x, textPos.y, String(name));
    text.attr({
      'font-size': 16
    });
    this.set('text', text);

    var rectPos = this.getRectPosition();
    var sizeOfRect = this.getRectSize();
    var rect = paper.rect(rectPos.x, rectPos.y, sizeOfRect.w, sizeOfRect.h, 8);
    rect.attr({
      fill: GRAPHICS.rectFill,
      stroke: GRAPHICS.rectStroke,
      'stroke-width': GRAPHICS.rectStrokeWidth
    });
    this.set('rect', rect);

    var arrowPath = this.getArrowPath();
    var arrow = paper.path(arrowPath);
    arrow.attr({
      fill: GRAPHICS.rectFill,
      stroke: GRAPHICS.rectStroke,
      'stroke-width': GRAPHICS.rectStrokeWidth
    });
    this.set('arrow', arrow);

    rect.toFront();
    text.toFront();
  },

  animateUpdatedPos: function(speed, easing) {
    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    var textPos = this.getTextPosition();
    this.get('text').attr({
      text: this.getName()
    });
    this.get('text').stop().animate({
      x: textPos.x,
      y: textPos.y
    }, s, e);

    var rectPos = this.getRectPosition();
    var rectSize = this.getRectSize();
    this.get('rect').stop().animate({
      x: rectPos.x,
      y: rectPos.y,
      width: rectSize.w,
      height: rectSize.h
    }, s, e);

    var arrowPath = this.getArrowPath();
    this.get('arrow').stop().animate({
      path: arrowPath
    }, s, e);
  }
});


var VisNode = Backbone.Model.extend({
  defaults: {
    depth: undefined,
    id: null,
    pos: null,
    radius: null,
    commit: null,
    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
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
  },

  setDepthBasedOn: function(depthIncrement) {
    if (this.get('depth') === undefined) {
      throw new Error('no depth yet!');
    }
    var pos = this.get('pos');
    pos.y = this.get('depth') * depthIncrement;
  },

  animateUpdatedPosition: function(speed, easing) {
    var pos = this.getScreenCoords();
    this.get('circle').stop().animate({
        cx: pos.x,
        cy: pos.y
      },
      speed !== undefined ? speed : this.get('animationSpeed'),
      easing || this.get('animationEasing')
    );
  },

  getScreenCoords: function() {
    var pos = this.get('pos');
    return gitVisuals.toScreenCoords(pos);
  },

  getRadius: function() {
    return this.get('radius') || GRAPHICS.nodeRadius;
  },

  genGraphics: function(paper) {
    var pos = this.getScreenCoords();
    var circle = cuteSmallCircle(paper, pos.x, pos.y, {
      radius: this.getRadius()
    });
    this.set('circle', circle);
  }
});

var VisEdge = Backbone.Model.extend({
  defaults: {
    tail: null,
    head: null,
    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
  },

  validateAtInit: function() {
    required = ['tail', 'head'];
    _.each(required, function(key) {
      if (!this.get(key)) {
        throw new Error(key + ' is required!');
      }
    }, this);
  },

  initialize: function() {
    this.validateAtInit();
  },

  genSmoothBezierPathString: function(tail, head) {
    var tailPos = tail.getScreenCoords();
    var headPos = head.getScreenCoords();
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
    tailPos = offset(tailPos, -1, tail.getRadius());
    headPos = offset(headPos, 1, head.getRadius());

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
    // TODO default sizing
    var delta = GRAPHICS.arrowHeadSize || 10;
    str += ' L' + coords(offset2d(headPos, -delta, delta));
    str += ' L' + coords(offset2d(headPos, delta, delta));
    str += ' L' + coords(headPos);

    return str;
  },

  getBezierCurve: function() {
    return this.genSmoothBezierPathString(this.get('tail'), this.get('head'));
  },

  genGraphics: function(paper) {
    var pathString = this.getBezierCurve();
    var path = cutePath(paper, pathString);
    path.toBack();
    this.set('path', path);
  },

  animateUpdatedPath: function(speed, easing) {
    var newPath = this.getBezierCurve();
    this.get('path').toBack();
    this.get('path').stop().animate({
        path: newPath
      },
      speed !== undefined ? speed : this.get('animationSpeed'),
      easing || this.get('animationEasing')
    );
  },

});

var VisEdgeCollection = Backbone.Collection.extend({
  model: VisEdge
});

var VisBranchCollection = Backbone.Collection.extend({
  model: VisBranch
});
