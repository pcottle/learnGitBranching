var _ = require('underscore');
var Backbone = require('backbone');
var GRAPHICS = require('../util/constants').GRAPHICS;

var VisBase = require('../visuals/visBase').VisBase;
var TreeCompare = require('../graph/treeCompare');

var randomHueString = function() {
  var hue = Math.random();
  var str = 'hsb(' + String(hue) + ',0.7,1)';
  return str;
};

var VisTag = VisBase.extend({
  defaults: {
    pos: null,
    text: null,
    rect: null,
    isHead: false,

    fill: GRAPHICS.tagFill,
    stroke: GRAPHICS.tagStroke,
    'stroke-width': GRAPHICS.tagStrokeWidth,

    offsetX: GRAPHICS.nodeRadius,
    offsetY: GRAPHICS.nodeRadius,

    vPad: 2,
    hPad: 2,

    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
  },

  validateAtInit: function() {
    if (!this.get('tag')) {
      throw new Error('need a Tag!');
    }
  },

  getID: function() {
    return this.get('tag').get('id');
  },

  initialize: function() {
    this.validateAtInit();

    // shorthand notation for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');
    if (!this.gitEngine) {
      throw new Error('asd wtf');
    }

    this.get('tag').set('visTag', this);
  },

  getCommitPosition: function() {
    var commit = this.gitEngine.getCommitFromRef(this.get('tag'));
    var visNode = commit.get('visNode');

    return visNode.getScreenCoords();
  },

  getDashArray: function() {
    if (!this.get('gitVisuals').getIsGoalVis()) {
      return '';
    }
    return (this.getIsLevelTagCompared()) ? '' : '--';
  },

  getIsGoalAndNotCompared: function() {
    if (!this.get('gitVisuals').getIsGoalVis()) {
      return false;
    }

    return !this.getIsLevelTagCompared();
  },

  /**
   * returns true if we are a Tag that is not being
   * compared in the goal (used in a goal visualization context
   */
  getIsLevelTagCompared: function() {
    // we are not master, so return true if its not just master being compared
    var levelBlob = this.get('gitVisuals').getLevelBlob();
    return !TreeCompare.onlyMasterCompared(levelBlob);
  },

  getTagStackIndex: function() {
    if (this.get('isHead')) {
      // head is never stacked with other Tags
      return 0;
    }

    var myArray = this.getTagStackArray();
    var index = -1;
    _.each(myArray, function(Tag, i) {
      if (Tag.obj == this.get('tag')) {
        index = i;
      }
    }, this);
    return index;
  },

  getTagStackLength: function() {
    if (this.get('isHead')) {
      // head is always by itself
      return 1;
    }

    return this.getTagStackArray().length;
  },

  isTagStackEmpty: function() {
    // useful function for head when computing flip logic
    var arr = this.gitVisuals.tagStackMap[this.getCommitID()];
    return (arr) ?
      arr.length === 0 :
      true;
  },

  getCommitID: function() {
    var target = this.get('tag').get('target');
    return target.get('id');
  },

  getTagStackArray: function() {
    var arr = this.gitVisuals.tagStackMap[this.getCommitID()];
    if (arr === undefined) {
      // this only occurs when we are generating graphics inside of
      // a new Tag instantiation, so we need to force the update
      this.gitVisuals.calcTagStacks();
      return this.getTagStackArray();
    }
    return arr;
  },

  getTextPosition: function() {
    var pos = this.getCommitPosition();

    // then order yourself accordingly. we use alphabetical sorting
    // so everything is independent
    var myPos = this.getTagStackIndex();

    return {
      x: pos.x + this.get('offsetX'),
      y: pos.y + myPos * GRAPHICS.multiTagY + this.get('offsetY')
    };
  },

  getRectPosition: function() {
    var pos = this.getTextPosition();

    // first get text width and height
    var textSize = this.getTextSize();
    return {
      x: pos.x - this.get('hPad'),
      y: pos.y - 0.5 * textSize.h - this.get('vPad')
    };
  },

  getTextSize: function() {
    var getTextWidth = function(visTag) {
      var textNode = (visTag.get('text')) ? visTag.get('text').node : null;
      return (textNode === null) ? 0 : textNode.clientWidth;
    };

    var firefoxFix = function(obj) {
      if (!obj.w) { obj.w = 75; }
      if (!obj.h) { obj.h = 20; }
      return obj;
    };

    var textNode = this.get('text').node;

    var maxWidth = 0;
    _.each(this.getTagStackArray(), function(Tag) {
      maxWidth = Math.max(maxWidth, getTextWidth(
        Tag.obj.get('visTag')
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

    // number of other Tag names we are housing
    var totalNum = this.getTagStackLength();
    return {
      w: textSize.w + vPad * 2,
      h: textSize.h * totalNum + hPad * 2
    };
  },

  getIsRemote: function() {
    return this.get('tag').getIsRemote();
  },

  getName: function() {
    var name = this.get('tag').getName();
    var isRemote = this.getIsRemote();
    var isHg = this.gitEngine.getIsHg();
    
    return name;
  },

  nonTextToFront: function() {
    this.get('rect').toFront();
  },

  textToFront: function() {
    this.get('text').toFront();
  },

  textToFrontIfInStack: function() {
    if (this.getTagStackIndex() !== 0) {
      this.get('text').toFront();
    }
  },

  remove: function() {
    this.removeKeys(['text', 'rect']);
    // also need to remove from this.gitVisuals
    this.gitVisuals.removeVisTag(this);
  },

  handleModeChange: function() {

  },

  genGraphics: function(paper) {
    var textPos = this.getTextPosition();
    var name = this.getName();

    // when from a reload, we dont need to generate the text
    var text = paper.text(textPos.x, textPos.y, String(name));
    text.attr({
      'font-size': 14,
      'font-family': 'Monaco, Courier, font-monospace',
      opacity: this.getTextOpacity(),
      'text-anchor': 'start'
    });
    this.set('text', text);
    var attr = this.getAttributes();

    var rectPos = this.getRectPosition();
    var sizeOfRect = this.getRectSize();
    var rect = paper
      .rect(rectPos.x, rectPos.y, sizeOfRect.w, sizeOfRect.h, 8)
      .attr(attr.rect);
    this.set('rect', rect);

    // set CSS
    var keys = ['text', 'rect'];
    _.each(keys, function(key) {
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
      this.get('text')
    ];

    _.each(objs, function(rObj) {
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

    var commandStr = 'git checkout ' + this.get('tag').get('id');
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
    if (this.getTagStackIndex() !== 0) {
      return 0.0;
    }

    return 1;
  },

  getTextOpacity: function() {
    if (this.get('isHead')) {
      return this.gitEngine.getDetachedHead() ? 1 : 0;
    }

    if (this.getIsGoalAndNotCompared()) {
      return (this.getTagStackIndex() === 0) ? 0.7 : 0.3;
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
        fill: this.get('fill'),
        stroke: this.get('stroke'),
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
    var keys = ['text', 'rect'];
    this.setAttrBase(keys, attr, instant, speed, easing);
  }
});

var VisTagCollection = Backbone.Collection.extend({
  model: VisTag
});

exports.VisTagCollection = VisTagCollection;
exports.VisTag = VisTag;
exports.randomHueString = randomHueString;

