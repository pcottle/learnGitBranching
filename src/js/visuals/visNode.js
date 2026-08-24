var GRAPHICS = require('../util/constants').GRAPHICS;
var VisBase = require('../visuals/visBase').VisBase;

var FILE_CHIP_HEIGHT = 18;
var FILE_CHIP_GAP = 4;
var FILE_CHIP_NODE_GAP = 8;
var FILE_CHIP_CHAR_WIDTH = 7;
var FILE_CHIP_PAD = 7;
var MAX_FILE_CHARS = 18;
var FILE_FONT = 'Menlo, Monaco, Consolas, \'Droid Sans Mono\', monospace';

function truncateFile(path) {
  if (path.length <= MAX_FILE_CHARS) {
    return path;
  }
  return '\u2026' + path.slice(-(MAX_FILE_CHARS - 1));
}

function getChangedFileChipLayout(paths, nodePos, nodeRadius) {
  var sorted = (paths || []).slice().sort();
  var totalHeight = sorted.length * FILE_CHIP_HEIGHT +
    Math.max(0, sorted.length - 1) * FILE_CHIP_GAP;
  return sorted.map(function(path, index) {
    var label = truncateFile(path);
    var width = label.length * FILE_CHIP_CHAR_WIDTH + FILE_CHIP_PAD * 2;
    return {
      path: path,
      label: label,
      x: nodePos.x - nodeRadius - FILE_CHIP_NODE_GAP - width,
      y: nodePos.y - totalHeight / 2 +
        index * (FILE_CHIP_HEIGHT + FILE_CHIP_GAP),
      width: width,
      height: FILE_CHIP_HEIGHT
    };
  });
}

class VisNode extends VisBase {
  constructor(options) {
    var defaults = {
      depth: undefined,
      maxWidth: null,
      outgoingEdges: null,
      circle: null,
      text: null,
      id: null,
      pos: null,
      radius: null,
      commit: null,
      fileChips: [],
      animationSpeed: GRAPHICS.defaultAnimationTime,
      animationEasing: GRAPHICS.defaultEasing,
      fill: GRAPHICS.defaultNodeFill,
      'stroke-width': GRAPHICS.defaultNodeStrokeWidth,
      stroke: GRAPHICS.defaultNodeStroke
    };
    super(Object.assign({}, defaults, options));
    this.initialize();
  }

  getID() {
    return this.get('id');
  }

  validateAtInit() {
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
  }

  initialize() {
    this.validateAtInit();
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');
    this.set('outgoingEdges', []);
  }

  setDepth(depth) {
    this.set('depth', Math.max(this.get('depth') || 0, depth));
  }

  setDepthBasedOn(depthIncrement, offset) {
    if (this.get('depth') === undefined) {
      throw new Error('no depth yet!');
    }
    var pos = this.get('pos');
    pos.y = this.get('depth') * depthIncrement + offset;
  }

  getMaxWidthScaled() {
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    var map = {
      branch: 1,
      tag: 1,
      head: 0.3,
      none: 0.1
    };
    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat] * this.get('maxWidth');
  }

  toFront() {
    this.get('circle').toFront();
    this.get('text').toFront();
    // chips last so a label mid-flight never hides behind its own circle
    this.get('fileChips').forEach(function(chip) {
      chip.rect.toFront();
      chip.text.toFront();
    });
  }

  getOpacity() {
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
  }

  getTextScreenCoords() {
    return this.getScreenCoords();
  }

  getAttributes() {
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
  }

  animatePositionTo(visNode, speed, easing) {
    var attributes = this.getAttributes();
    var destAttributes = visNode.getAttributes();
    attributes.circle = destAttributes.circle;
    attributes.text = destAttributes.text;
    this.animateToAttr(attributes, speed, easing);
    this.animateChangedFilePositions(speed, easing);
  }

  highlightTo(visObj, speed, easing) {
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
  }

  animateUpdatedPosition(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
    this.animateChangedFilePositions(speed, easing);
  }

  animateFromAttrToAttr(fromAttr, toAttr, speed, easing) {
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  }

  animateToSnapshot(snapShot, speed, easing) {
    if (!snapShot[this.getID()]) {
      return;
    }
    this.animateToAttr(snapShot[this.getID()], speed, easing);
    this.animateChangedFilePositions(speed, easing);
  }

  setAttr(attr, instant, speed, easing) {
    var keys = ['text', 'circle'];
    this.setAttrBase(keys, attr, instant, speed, easing);
  }

  animateToAttr(attr, speed, easing) {
    VisBase.prototype.animateToAttr.apply(this, arguments);
    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    if (easing == 'bounce' &&
        attr.circle && attr.circle.cx !== undefined &&
        attr.text && attr.text.x !== undefined ) {
      this.get('circle').animate(attr.circle.cx, s, 'easeInOut');
      this.get('text').animate(attr.text.x, s, 'easeInOut');
    }
  }

  getScreenCoords() {
    var pos = this.get('pos');
    return this.gitVisuals.toScreenCoords(pos);
  }

  getRadius() {
    return this.get('radius') || GRAPHICS.nodeRadius;
  }

  getParentScreenCoords() {
    return this.get('commit').get('parents')[0].get('visNode').getScreenCoords();
  }

  setBirthPosition() {
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
  }

  setBirthFromSnapshot(beforeSnapshot) {
    var parentID = this.get('commit').get('parents')[0].get('visNode').getID();
    var parentAttr = beforeSnapshot[parentID];

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

    var parentCoords = {
      x: parentAttr.circle.cx,
      y: parentAttr.circle.cy
    };
    this.setOutgoingEdgesBirthPosition(parentCoords);
  }

  setBirth() {
    this.setBirthPosition();
    this.setOutgoingEdgesBirthPosition(this.getParentScreenCoords());
  }

  setOutgoingEdgesOpacity(opacity) {
    this.get('outgoingEdges').forEach(function(edge) {
      edge.setOpacity(opacity);
    });
  }

  animateOutgoingEdgesToAttr(snapShot, speed, easing) {
    this.get('outgoingEdges').forEach(function(edge) {
      var attr = snapShot[edge.getID()];
      edge.animateToAttr(attr);
    }, this);
  }

  animateOutgoingEdges(speed, easing) {
    this.get('outgoingEdges').forEach(function(edge) {
      edge.animateUpdatedPath(speed, easing);
    }, this);
  }

  animateOutgoingEdgesFromSnapshot(snapshot, speed, easing) {
    this.get('outgoingEdges').forEach(function(edge) {
      var attr = snapshot[edge.getID()];
      edge.animateToAttr(attr, speed, easing);
    }, this);
  }

  setOutgoingEdgesBirthPosition(parentCoords) {
    this.get('outgoingEdges').forEach(function(edge) {
      var headPos = edge.get('head').getScreenCoords();
      var path = edge.genSmoothBezierPathStringFromCoords(parentCoords, headPos);
      edge.get('path').stop();
      edge.get('path').attr({
        path: path,
        opacity: 0
      });
    }, this);
  }

  parentInFront() {
    this.get('commit').get('parents')[0].get('visNode').toFront();
  }

  getFontSize(str) {
    if (str.length < 3) {
      return 12;
    } else if (str.length < 5) {
      return 10;
    } else {
      return 8;
    }
  }

  getFill() {
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    if (stat == 'head') {
      return GRAPHICS.headRectFill;
    } else if (stat == 'tag') {
      return GRAPHICS.orphanNodeFill;
    } else if (stat == 'none') {
      return GRAPHICS.orphanNodeFill;
    }
    return this.gitVisuals.getBlendedHuesForCommit(this.get('commit'));
  }

  attachClickHandlers() {
    if (this.get('gitVisuals').options.noClick) {
      return;
    }
    var commandStr = 'git checkout ' + this.get('commit').get('id');
    var Main = require('../app');
    [this.get('circle'), this.get('text')].forEach(function(rObj) {
      rObj.click(function() {
        Main.getEventBaton().trigger('commandSubmitted', commandStr);
      });
      $(rObj.node).css('cursor', 'pointer');
    });
  }

  setOpacity(opacity) {
    opacity = (opacity === undefined) ? 1 : opacity;
    var keys = ['circle', 'text'];
    keys.forEach(function(key) {
      this.get(key).attr({
        opacity: opacity
      });
    }, this);
    this.get('fileChips').forEach(function(chip) {
      chip.rect.attr({ opacity: opacity });
      chip.text.attr({ opacity: opacity });
    });
  }

  remove() {
    this.get('fileChips').forEach(function(chip) {
      chip.rect.remove();
      chip.text.remove();
    });
    this.set('fileChips', []);
    this.removeKeys(['circle'], ['text']);
    var text = this.get('text');
    if (text) {
      text.remove();
    }
    this.gitVisuals.removeVisNode(this);
  }

  removeAll() {
    this.remove();
    this.removeAllEdges();
  }

  removeAllEdges() {
    this.get('outgoingEdges').forEach(function(edge) {
      edge.remove();
    }, this);
  }

  getExplodeStepFunc(speed) {
    if (!speed) {
      throw new Error('need speed by now');
    }
    var circle = this.get('circle');

    var speedMag = 20 / speed;
    var angle = Math.PI + Math.random() * 1 * Math.PI;
    var gravity = (1 / 5) * speed;
    var drag = (1 / 100) * speed;

    var vx = speedMag * Math.cos(angle);
    var vy = speedMag * Math.sin(angle);
    var x = circle.attr('cx');
    var y = circle.attr('cy');

    var maxWidth = this.gitVisuals.paper.width;
    var maxHeight = this.gitVisuals.paper.height - circle.attrs.r;
    var elasticity = 0.8 / speed;
    var dt = 1.0;

    var stepFunc = function() {
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
      if ((vx * vx + vy * vy) < 0.1 && Math.abs(y - maxHeight) <= 0.1) {
        return false;
      }
      return true;
    };
    return stepFunc;
  }

  makeCircle(paper) {
    var pos = this.getScreenCoords();
    return paper.circle(
      pos.x,
      pos.y,
      this.getRadius()
    ).attr(this.getAttributes().circle);
  }

  makeText(paper) {
    var textPos = this.getTextScreenCoords();
    return paper.text(textPos.x, textPos.y, String(this.get('id')));
  }

  getChangedFileLayout() {
    return getChangedFileChipLayout(
      this.get('commit').get('changedFiles'),
      this.getScreenCoords(),
      this.getRadius()
    );
  }

  genChangedFileGraphics(paper, hidden) {
    var clickable = !this.get('gitVisuals').options.noClick;
    var commandStr = 'git show ' + this.get('commit').get('id');
    var Main = require('../app');
    var chips = this.getChangedFileLayout().map(function(layout) {
      var rect = paper.rect(
        layout.x,
        layout.y,
        layout.width,
        layout.height,
        5
      ).attr({
        fill: '#2ECC40',
        stroke: '#FFFFFF',
        'stroke-width': 1.5,
        opacity: hidden ? 0 : this.getOpacity()
      });
      var text = paper.text(
        layout.x + layout.width / 2,
        layout.y + layout.height / 2,
        layout.label
      ).attr({
        'font-size': 10,
        'font-family': FILE_FONT,
        fill: '#111111',
        opacity: hidden ? 0 : this.getOpacity()
      });

      [rect, text].forEach(function(rObj) {
        $(rObj.node).attr('title', layout.path);
        if (clickable) {
          $(rObj.node).css('cursor', 'pointer');
          rObj.click(function() {
            Main.getEventBaton().trigger('commandSubmitted', commandStr);
          });
        }
      });
      return { path: layout.path, rect: rect, text: text };
    }, this);
    this.set('fileChips', chips);
  }

  animateChangedFilePositions(speed, easing, extraAttr) {
    speed = speed !== undefined ? speed : this.get('animationSpeed');
    easing = easing || this.get('animationEasing');
    extraAttr = extraAttr || {};
    var chipsByPath = {};
    this.get('fileChips').forEach(function(chip) {
      chipsByPath[chip.path] = chip;
    });
    this.getChangedFileLayout().forEach(function(layout) {
      var chip = chipsByPath[layout.path];
      if (!chip) {
        return;
      }
      chip.rect.stop().animate(Object.assign({
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height
      }, extraAttr), speed, easing);
      chip.text.stop().animate(Object.assign({
        x: layout.x + layout.width / 2,
        y: layout.y + layout.height / 2
      }, extraAttr), speed, easing);
    });
  }

  animateChangedFileOpacity(opacity, speed) {
    this.get('fileChips').forEach(function(chip) {
      chip.rect.stop().animate({ opacity: opacity }, speed);
      chip.text.stop().animate({ opacity: opacity }, speed);
    });
  }

  showChangedFiles(speed) {
    // move and reveal in ONE tween -- a separate opacity animation would
    // stop() an in-flight position animation and strand the chips wherever
    // the canvas last laid them out
    this.animateChangedFilePositions(
      speed !== undefined ? speed : 150,
      undefined,
      { opacity: this.getOpacity() }
    );
  }

  genGraphics(paper, options) {
    options = options || {};
    paper = paper || this.gitVisuals.paper;
    var circle = this.makeCircle(paper);
    var text = this.makeText(paper);

    text.attr({
      'font-size': this.getFontSize(this.get('id')),
      'font-weight': 'bold',
      'font-family': 'Menlo, Monaco, Consolas, \'Droid Sans Mono\', monospace',
      opacity: this.getOpacity()
    });

    this.set('circle', circle);
    this.set('text', text);
    this.genChangedFileGraphics(paper, !!options.hideChangedFiles);

    this.attachClickHandlers();
  }
}

exports.VisNode = VisNode;
exports.getChangedFileChipLayout = getChangedFileChipLayout;
