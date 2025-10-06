var Backbone = require('backbone');
var GRAPHICS = require('../util/constants').GRAPHICS;

var VisBase = require('../visuals/visBase').VisBase;
var TreeCompare = require('../graph/treeCompare');

// Accessible, high-contrast color palette (WCAG AA compliant)
// Colors chosen for maximum distinguishability and accessibility
const BRANCH_COLOR_PALETTE = [
  // Blue, Orange, Green, Red, Purple, Teal, Brown, Pink, Gray
  '#0074D9', // Blue
  '#FF851B', // Orange
  '#2ECC40', // Green
  '#FF4136', // Red
  '#B10DC9', // Purple
  '#39CCCC', // Teal
  '#8B4513', // Brown
  '#F012BE', // Pink
  // Additional high-contrast, accessible colors
  '#0055A4', // Deep Blue
  '#FFD700', // Gold (Yellow, high contrast on dark)
  '#228B22', // Forest Green
  '#E67E22', // Carrot Orange
  '#800000', // Maroon
  '#00CED1', // Dark Turquoise
  '#C71585', // Medium Violet Red
  '#FF69B4', // Hot Pink
  '#FFDAB9', // Peach Puff
  '#DC143C', // Crimson
  '#20B2AA', // Light Sea Green
  '#8A2BE2', // Blue Violet
  '#556B2F', // Dark Olive Green
  '#FF6347', // Tomato
  '#4682B4', // Steel Blue
  '#B22222', // Firebrick
  '#00FF7F', // Spring Green
  '#483D8B', // Dark Slate Blue
];

// Map common branch names to fixed colors
const BRANCH_NAME_COLOR_MAP = {
  main: '#00FF7F', // Spring Green
  master: '#0074D9',  // Blue (legacy)
  bugFix: '#4682B4',  // Steel blue
  develop: '#2ECC40', // Green
  feature: '#F012BE', // Pink
  release: '#B10DC9', // Purple
  hotfix: '#39CCCC',  // Teal
};

// Used to assign colors to branches not in the map
let branchColorIndex = 0;
const assignedBranchColors = {};

function getBranchColor(branchName) {
  if (BRANCH_NAME_COLOR_MAP[branchName]) {
    return BRANCH_NAME_COLOR_MAP[branchName];
  }
  if (assignedBranchColors[branchName]) {
    return assignedBranchColors[branchName];
  }
  // Cycle through palette for other branches
  const color = BRANCH_COLOR_PALETTE[branchColorIndex % BRANCH_COLOR_PALETTE.length];
  assignedBranchColors[branchName] = color;
  branchColorIndex++;
  return color;
}

// Deprecated: kept for API compatibility, but now takes branchName
var randomHueString = function(branchName) {
  return getBranchColor(branchName || '');
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
      this.refreshOffset();

      this.set('fill', GRAPHICS.headRectFill);
    } else {
      // Use accessible color palette for branches
      this.set('fill', randomHueString(this.get('branch').get('id')));
    }
  },

  getCommitPosition: function() {
    var commit = this.gitEngine.getCommitFromRef(this.get('branch'));
    var visNode = commit.get('visNode');

    this.set('flip', this.getFlipValue(commit, visNode));
    this.refreshOffset();
    return visNode.getScreenCoords();
  },

  getDashArray: function() {
    if (!this.get('gitVisuals').getIsGoalVis()) {
      return '';
    }
    return (this.getIsLevelBranchCompared()) ? '' : '--';
  },

  getIsGoalAndNotCompared: function() {
    if (!this.get('gitVisuals').getIsGoalVis()) {
      return false;
    }

    return !this.getIsLevelBranchCompared();
  },

  /**
   * returns true if we are a branch that is not being
   * compared in the goal (used in a goal visualization context
   */
  getIsLevelBranchCompared: function() {
    if (this.getIsMain()) {
      return true; // main always compared
    }
    // we are not main, so return true if its not just main being compared
    var levelBlob = this.get('gitVisuals').getLevelBlob();
    return !TreeCompare.onlyMainCompared(levelBlob);
  },

  getIsMain: function() {
    return this.get('branch').get('id') == 'main';
  },

  getFlipValue: function(commit, visNode) {
    var threshold = this.get('gitVisuals').getFlipPos();
    var overThreshold = (visNode.get('pos').x > threshold);

    // easy logic first
    if (commit.get('id') === 'C0') {
      return -1;
    }
    if (!this.get('isHead')) {
      return (overThreshold) ? -1 : 1;
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

  refreshOffset: function() {
    var baseOffsetX = GRAPHICS.nodeRadius * 4.75;
    var offsetY = 33;
    var deltaX = 10;
    if (this.get('flip') === 1) {
      this.set('offsetY', -offsetY);
      this.set('offsetX', baseOffsetX - deltaX);
    } else {
      this.set('offsetY', offsetY);
      this.set('offsetX', baseOffsetX - deltaX);
    }
  },

  getArrowTransform: function() {
    if (this.get('flip') === 1) {
      return 't-2,-20R-35';
    } else {
      return 't2,20R-35';
    }
  },

  getBranchStackIndex: function() {
    if (this.get('isHead')) {
      // head is never stacked with other branches
      return 0;
    }

    var myArray = this.getBranchStackArray();
    var index = -1;
    myArray.forEach(function(branch, i) {
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
    coords.forEach(function(pos) {
      pathStr += 'L' + toStringCoords(pos) + ' ';
    }, this);
    pathStr += 'z';
    return pathStr;
  },

  getTextSize: function() {
    var getTextWidth = function(visBranch) {
      var textNode = (visBranch.get('text')) ? visBranch.get('text').node : null;
      return (textNode === null) ? 0 : textNode.getBoundingClientRect().width;
    };

    var firefoxFix = function(obj) {
      if (!obj.w) { obj.w = 75; }
      if (!obj.h) { obj.h = 20; }
      return obj;
    };

    var textNode = this.get('text').node;
    if (this.get('isHead')) {
      // HEAD is a special case
      var size = textNode.getBoundingClientRect();
      return firefoxFix({
        w: size.width,
        h: size.height
      });
    }

    var maxWidth = 0;
    this.getBranchStackArray().forEach(function(branch) {
      maxWidth = Math.max(maxWidth, getTextWidth(
        branch.obj.get('visBranch')
      ));
    });

    return firefoxFix({
      w: maxWidth,
      h: textNode.getBoundingClientRect().height,
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
    var isRemote = this.getIsRemote();
    var isHg = this.gitEngine.getIsHg();

    if (name === 'HEAD' && isHg) {
      name = '.';
    }

    var after = (selected && !this.getIsInOrigin() && !isRemote) ? '*' : '';
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

  handleModeChange: function() {

  },

  genGraphics: function(paper) {
    var textPos = this.getTextPosition();
    var name = this.getName();

    // when from a reload, we don't need to generate the text
    var text = paper.text(textPos.x, textPos.y, String(name));
    text.attr({
      'font-size': 14,
      'font-family': 'Menlo, Monaco, Consolas, \'Droid Sans Mono\', monospace',
      opacity: this.getTextOpacity()
    });
    this.set('text', text);
    var attr = this.getAttributes();

    var rectPos = this.getRectPosition();
    var sizeOfRect = this.getRectSize();
    var rect = paper
      .rect(rectPos.x, rectPos.y, sizeOfRect.w, sizeOfRect.h, 8)
      .attr(attr.rect);
    this.set('rect', rect);

    var arrowPath = this.getArrowPath();
    var arrow = paper
      .path(arrowPath)
      .attr(attr.arrow);
    this.set('arrow', arrow);

    // set CSS
    var keys = ['text', 'rect', 'arrow'];
    keys.forEach(function(key) {
      $(this.get(key).node).css(attr.css);
    }, this);

    this.attachClickHandlers();
    rect.toFront();
    text.toFront();
  },

  attachClickHandlers: function() {
    if (this.get('gitVisuals').options.noClick) {
      return;
    }
    var objs = [
      this.get('rect'),
      this.get('text'),
      this.get('arrow')
    ];

    objs.forEach(function(rObj) {
      rObj.click(this.onClick.bind(this));
    }, this);
  },

  shouldDisableClick: function() {
    return this.get('isHead') && !this.gitEngine.getDetachedHead();
  },

  onClick: function() {
    if (this.shouldDisableClick()) {
      return;
    }

    var commandStr = 'git checkout ' + this.gitEngine.resolveNameNoPrefix(this.get('branch'))
    var Main = require('../app');
    Main.getEventBaton().trigger('commandSubmitted', commandStr);
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
    if (this.getBranchStackIndex() !== 0) {
      return 0.0;
    }

    return 1;
  },

  getTextOpacity: function() {
    if (this.get('isHead')) {
      return this.gitEngine.getDetachedHead() ? 1 : 0;
    }

    if (this.getIsGoalAndNotCompared()) {
      return (this.getBranchStackIndex() === 0) ? 0.7 : 0.3;
    }

    return 1;
  },

  getStrokeWidth: function() {
    if (this.getIsGoalAndNotCompared()) {
      return this.get('stroke-width') / 5.0;
    }

    return this.get('stroke-width');
  },

  getAttributes: function() {
    var textOpacity = this.getTextOpacity();
    this.updateName();

    var textPos = this.getTextPosition();
    var rectPos = this.getRectPosition();
    var rectSize = this.getRectSize();

    var arrowPath = this.getArrowPath();
    var dashArray = this.getDashArray();
    var cursorStyle = (this.shouldDisableClick()) ?
      'auto' :
      'pointer';

    return {
      css: {
        cursor: cursorStyle
      },
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
        opacity: this.getNonTextOpacity(),
        fill: this.getFill(),
        stroke: this.get('stroke'),
        'stroke-dasharray': dashArray,
        'stroke-width': this.getStrokeWidth()
      },
      arrow: {
        path: arrowPath,
        opacity: this.getNonTextOpacity(),
        fill: this.getFill(),
        stroke: this.get('stroke'),
        transform: this.getArrowTransform(),
        'stroke-dasharray': dashArray,
        'stroke-width': this.getStrokeWidth()
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

  setAttr: function(attr, instant, speed, easing) {
    var keys = ['text', 'rect', 'arrow'];
    this.setAttrBase(keys, attr, instant, speed, easing);
  }
});

var VisBranchCollection = Backbone.Collection.extend({
  model: VisBranch
});

exports.VisBranchCollection = VisBranchCollection;
exports.VisBranch = VisBranch;
exports.randomHueString = randomHueString;
exports.BRANCH_COLOR_PALETTE = BRANCH_COLOR_PALETTE;
exports.branchColorIndex = branchColorIndex;
exports.assignedBranchColors = assignedBranchColors;
exports.BRANCH_NAME_COLOR_MAP = BRANCH_NAME_COLOR_MAP;
