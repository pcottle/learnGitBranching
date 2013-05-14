var _ = require('underscore');
var Backbone = require('backbone');
var GRAPHICS = require('../util/constants').GRAPHICS;

var VisBase = require('../visuals/visBase').VisBase;

var randomHueString = function() {
  var hue = Math.random();
  var str = 'hsb(' + String(hue) + ',0.7,1)';
  return str;
};

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
      throw new Error('asd wtf');
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

    this.set('flip', this.getFlipBool(commit, visNode));
    return visNode.getScreenCoords();
  },

  getFlipBool: function(commit, visNode) {
    var threshold = this.get('gitVisuals').getFlipPos();
    var overThreshold = (visNode.get('pos').x > threshold);

    // easy logic first
    if (!this.get('isHead')) {
      if (this.getIsRemote()) {
        return (overThreshold) ? 1 : -1;
      } else {
        return (overThreshold) ? -1 : 1;
      }
    }

    // now for HEAD....
    if (overThreshold) {
      // if by ourselves, then feel free to squeeze in. but
      // if other branches are here, then we need to show separate
      return (this.isBranchStackEmpty()) ? -1 : 1;
    } else {
      return (this.isBranchStackEmpty()) ? 1 : -1;
    }
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

  isBranchStackEmpty: function() {
    // useful function for head when computing flip logic
    var arr = this.gitVisuals.branchStackMap[this.getCommitID()];
    return (arr) ?
      arr.length === 0 :
      true;
  },

  getCommitID: function() {
    var target = this.get('branch').get('target');
    if (target.get('type') === 'branch') {
      // for HEAD
      target = target.get('target');
    }
    return target.get('id');
  },

  getBranchStackArray: function() {
    var arr = this.gitVisuals.branchStackMap[this.getCommitID()];
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
      var textNode = (visBranch.get('text')) ? visBranch.get('text').node : null;
      return (textNode === null) ? 0 : textNode.clientWidth;
    };

    var firefoxFix = function(obj) {
      if (!obj.w) { obj.w = 75; }
      if (!obj.h) { obj.h = 20; }
      return obj;
    };

    var textNode = this.get('text').node;
    if (this.get('isHead')) {
      // HEAD is a special case
      return firefoxFix({
        w: textNode.clientWidth,
        h: textNode.clientHeight
      });
    }

    var maxWidth = 0;
    _.each(this.getBranchStackArray(), function(branch) {
      maxWidth = Math.max(maxWidth, getTextWidth(
        branch.obj.get('visBranch')
      ));
    });

    return firefoxFix({
      w: maxWidth,
      h: textNode.clientHeight
    });
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

  getIsRemote: function() {
    return this.get('branch').getIsRemote();
  },

  getName: function() {
    var name = this.get('branch').getName();
    var selected = this.get('branch') === this.gitEngine.HEAD.get('target');

    var after = (selected) ? '*' : '';
    return name + after;
  },

  nonTextToFront: function() {
    this.get('arrow').toFront();
    this.get('rect').toFront();
  },

  textToFront: function() {
    this.get('text').toFront();
  },

  textToFrontIfInStack: function() {
    if (this.getBranchStackIndex() !== 0) {
      this.get('text').toFront();
    }
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

    this.attachClickHandlers();
    rect.toFront();
    text.toFront();
  },

  attachClickHandlers: function() {
    if (this.get('gitVisuals').options.noClick) {
      return;
    }
    var commandStr = 'git checkout ' + this.get('branch').get('id');
    var Main = require('../app');
    var objs = [this.get('rect'), this.get('text'), this.get('arrow')];

    _.each(objs, function(rObj) {
      rObj.click(function() {
        Main.getEventBaton().trigger('commandSubmitted', commandStr);
      });
      $(rObj.node).css('cursor', 'pointer');
    });
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
    var dashArray = (this.getIsRemote()) ? '--' : '';

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
        'stroke-dasharray': dashArray,
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

var VisBranchCollection = Backbone.Collection.extend({
  model: VisBranch
});

exports.VisBranchCollection = VisBranchCollection;
exports.VisBranch = VisBranch;
exports.randomHueString = randomHueString;

