var VisBranch = Backbone.Model.extend({
  defaults: {
    pos: null,
    text: null,
    rect: null,
    arrow: null,
    isHead: false,
    flip: 1,

    fill: GRAPHICS.rectFill,
    stroke: GRAPHICS.rectStroke,

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

  initialize: function() {
    this.validateAtInit();
    if (this.get('branch').get('id') == 'HEAD') {
      // switch to a head ref
      this.set('isHead', true);
      this.set('flip', -1);

      this.set('fill', GRAPHICS.headRectFill);
    }
  },

  getCommitPosition: function() {
    var commit = gitEngine.getCommitFromRef(this.get('branch'));
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
    var arr = gitVisuals.branchStackMap[this.get('branch').get('target').get('id')];
    if (arr === undefined) {
      // this only occurs when we are generating graphics inside of
      // a new Branch instantiation, so we need to force the update
      gitVisuals.calcBranchStacks();
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
    }
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

    var tailLength = 30;
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
      return textNode.clientWidth;
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
      h: textSize.h * totalNum + hPad * 2
    };
  },

  getName: function() {
    var name = this.get('branch').get('id');
    var selected = gitEngine.HEAD.get('target').get('id');

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

  genGraphics: function(paper) {
    var textPos = this.getTextPosition();

    var name = this.getName();
    var text = paper.text(textPos.x, textPos.y, String(name));
    text.attr({
      'font-size': 14,
      'font-family': 'Monaco, Courier, font-monospace',
      opacity: this.getTextOpacity()
    });
    this.set('text', text);

    var rectPos = this.getRectPosition();
    var sizeOfRect = this.getRectSize();
    var rect = paper.rect(rectPos.x, rectPos.y, sizeOfRect.w, sizeOfRect.h, 8);
    rect.attr({
      fill: this.get('fill'),
      stroke: this.get('stroke'),
      'stroke-width': GRAPHICS.rectStrokeWidth,
      opacity: this.getNonTextOpacity()
    });
    this.set('rect', rect);

    var arrowPath = this.getArrowPath();
    var arrow = paper.path(arrowPath);
    arrow.attr({
      fill: this.get('fill'),
      stroke: this.get('stroke'),
      'stroke-width': GRAPHICS.rectStrokeWidth,
      opacity: this.getNonTextOpacity()
    });
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
      return gitEngine.getDetachedHead() ? 1 : 0;
    }
    return this.getBranchStackIndex() == 0 ? 1 : 0.0;
  },

  getTextOpacity: function() {
    if (this.get('isHead')) {
      return gitEngine.getDetachedHead() ? 1 : 0;
    }
    return 1;
  },

  animateUpdatedPos: function(speed, easing) {
    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');
    var nonTextOpacity = this.getNonTextOpacity();
    var textOpacity = this.getTextOpacity();

    this.updateName();
    var textPos = this.getTextPosition();
    this.get('text').stop().animate({
      x: textPos.x,
      y: textPos.y,
      opacity: textOpacity
    }, s, e);

    var rectPos = this.getRectPosition();
    var rectSize = this.getRectSize();
    this.get('rect').stop().animate({
      x: rectPos.x,
      y: rectPos.y,
      width: rectSize.w,
      height: rectSize.h,
      opacity: nonTextOpacity,
    }, s, e);

    var arrowPath = this.getArrowPath();
    this.get('arrow').stop().animate({
      path: arrowPath,
      opacity: nonTextOpacity 
    }, s, e);
  }
});


var VisNode = Backbone.Model.extend({
  defaults: {
    depth: undefined,
    maxWidth: null,
    outgoingEdges: null,
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

    this.set('outgoingEdges', []);
  },

  setDepthBasedOn: function(depthIncrement) {
    if (this.get('depth') === undefined) {
      throw new Error('no depth yet!');
    }
    var pos = this.get('pos');
    pos.y = this.get('depth') * depthIncrement;
  },

  getMaxWidthScaled: function() {
    // returns our max width scaled based on if we are visible
    // from a branch or not
    var stat = gitVisuals.getCommitUpstreamStatus(this.get('commit'));
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
  },

  getOpacity: function() {
    var map = {
      'branch': 1,
      'head': GRAPHICS.upstreamHeadOpacity,
      'none': GRAPHICS.upstreamNoneOpacity
    };

    var stat = gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    if (map[stat] === undefined) {
      throw new Error('invalid status');
    }
    return map[stat];
  },

  animateUpdatedPosition: function(speed, easing) {
    var pos = this.getScreenCoords();
    var opacity = this.getOpacity();

    this.get('circle').stop().animate({
        cx: pos.x,
        cy: pos.y,
        opacity: opacity,
        r: this.getRadius()
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
      r: 0,
    });
  },

  animateOutgoingEdges: function(speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.animateUpdatedPath(speed, easing);
    }, this);
  },

  setOutgoingEdgesBirthPosition: function() {
    var parentCoords = this.getParentScreenCoords();
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
    // woof!
    this.get('commit').get('parents')[0].get('visNode').get('circle').toFront();
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

    this.get('tail').get('outgoingEdges').push(this);
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
    // TODO default sizing? fill the arrow head?
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

  getOpacity: function() {
    var stat = gitVisuals.getCommitUpstreamStatus(this.get('tail'));
    var map = {
      'branch': 1,
      'head': GRAPHICS.edgeUpstreamHeadOpacity,
      'none': GRAPHICS.edgeUpstreamNoneOpacity
    };

    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat];
  },

  animateUpdatedPath: function(speed, easing) {
    var newPath = this.getBezierCurve();
    this.animateUpdatedPathFromPath(newPath, speed, easing);
  },

  animateUpdatedPathFromPath: function(newPath, speed, easing) {
    var opacity = this.getOpacity();

    this.get('path').toBack();
    this.get('path').stop().animate({
        path: newPath,
        opacity: opacity
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
