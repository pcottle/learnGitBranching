// The visual staging area: a small panel that shows which files are sitting in
// the working directory versus the staging area, so that `git commit` reads as
// "bundle up these changes and turn them into a circle" rather than as magic.
//
// It only draws itself while a level engages the simulated changes model (see
// GitEngine.changesModelEngaged), so every classic graph-only level is
// untouched and beginners never see the extra UI.

var GRAPHICS = require('../util/constants').GRAPHICS;
var VisBase = require('../visuals/visBase').VisBase;
var delay = require('../util/promise').delay;

var MARGIN = 10;
var PANEL_WIDTH = 168;
var PANEL_PAD = 12;
var ZONE_TITLE_HEIGHT = 24;
var CHIP_HEIGHT = 24;
var CHIP_GAP = 6;
var ZONE_GAP = 8;
var EMPTY_ROW_HEIGHT = 20;

var ZONE_TITLES = {
  working: 'Working Directory',
  staging: 'Staging Area'
};

function sortedPaths(paths) {
  return paths.slice().sort();
}

function makeChips(paths, status) {
  return sortedPaths(paths).map(function(path) {
    return { path: path, status: status };
  });
}

// Pure: turn engine state into "what the panel should show right now".
function getPanelModel(gitEngine) {
  if (!gitEngine || !gitEngine.changesModelEngaged) {
    return { engaged: false, zones: [] };
  }

  var zones = [
    {
      key: 'working',
      title: ZONE_TITLES.working,
      chips: makeChips(gitEngine.getUnstagedChanges(), 'modified')
    },
    {
      key: 'staging',
      title: ZONE_TITLES.staging,
      chips: makeChips(gitEngine.getStagedChanges(), 'staged')
    }
  ];

  return { engaged: true, zones: zones };
}

// a chip keyed purely by path animates from the working zone into the staging
// zone when you `git add` it.
function chipKey(zone, chip) {
  return chip.path;
}

function measureZone(zone) {
  var height = ZONE_TITLE_HEIGHT;
  if (!zone.chips.length) {
    return height + EMPTY_ROW_HEIGHT;
  }
  return height + zone.chips.length * (CHIP_HEIGHT + CHIP_GAP) - CHIP_GAP;
}

// Pure: place the panel and every chip in screen coordinates.
// The panel docks against the left wall of the canvas, next to the terminal
// where the learner is typing. The right hand side is spoken for: every level
// opens with `show goal` (see level/index.js startOffCommand), and that window
// covers the right of the canvas.
function getPanelLayout(model, paperWidth, paperHeight) {
  var panelX = MARGIN;

  if (!model.engaged) {
    return {
      panel: { x: panelX, y: MARGIN, width: PANEL_WIDTH, height: 0 },
      titles: [],
      chips: [],
      empties: []
    };
  }

  // measure first, so the panel can sit centred against the right edge. That
  // keeps it clear of the goal window (top right) and the helper bar (bottom
  // right), both of which the learner can pop open at any time.
  var contentHeight = PANEL_PAD * 2;
  model.zones.forEach(function(zone, zoneIndex) {
    contentHeight += measureZone(zone) + (zoneIndex > 0 ? ZONE_GAP : 0);
  });

  var panel = {
    x: panelX,
    y: Math.round((paperHeight - contentHeight) / 2),
    width: PANEL_WIDTH,
    height: contentHeight
  };

  var titles = [];
  var chips = [];
  var empties = [];
  var y = panel.y + PANEL_PAD;

  model.zones.forEach(function(zone, zoneIndex) {
    if (zoneIndex > 0) {
      y += ZONE_GAP;
    }
    titles.push({
      key: zone.key,
      text: zone.title,
      x: panel.x + PANEL_PAD,
      y: y + ZONE_TITLE_HEIGHT / 2
    });
    y += ZONE_TITLE_HEIGHT;

    if (!zone.chips.length) {
      empties.push({
        key: zone.key,
        x: panel.x + PANEL_PAD,
        y: y + EMPTY_ROW_HEIGHT / 2
      });
      y += EMPTY_ROW_HEIGHT;
      return;
    }

    zone.chips.forEach(function(chip) {
      chips.push({
        key: chipKey(zone, chip),
        path: chip.path,
        status: chip.status,
        zone: zone.key,
        x: panel.x + PANEL_PAD,
        y: y + CHIP_HEIGHT / 2,
        width: PANEL_WIDTH - PANEL_PAD * 2,
        height: CHIP_HEIGHT
      });
      y += CHIP_HEIGHT + CHIP_GAP;
    });
    y -= CHIP_GAP;
  });

  return { panel: panel, titles: titles, chips: chips, empties: empties };
}

// Chip colors match the staged and modified groups in `git status`.
var STATUS_FILL = {
  modified: '#FF851B',
  staged: '#2ECC40'
};

var FONT_FAMILY = 'Menlo, Monaco, Consolas, \'Droid Sans Mono\', monospace';
var TITLE_FONT_SIZE = 12;
var CHIP_FONT_SIZE = 12;
var MAX_CHIP_CHARS = 17;

function truncatePath(path) {
  if (path.length <= MAX_CHIP_CHARS) {
    return path;
  }
  return path.substr(0, MAX_CHIP_CHARS - 1) + '…';
}

class VisStagingArea extends VisBase {
  constructor(options) {
    var defaults = {
      animationSpeed: GRAPHICS.defaultAnimationTime,
      animationEasing: GRAPHICS.defaultEasing
    };
    super(Object.assign({}, defaults, options));
    this.initialize();
  }

  initialize() {
    this.gitVisuals = this.get('gitVisuals');
    this.paper = null;
    this.panel = null;
    this.titleEls = {};
    this.emptyEls = {};
    this.chipEls = {};
    // keys the panel must keep on screen because a commit animation is about
    // to fly them into the new commit circle
    this.slurping = null;
  }

  getGitEngine() {
    // the engine is assigned to GitVisuals after construction
    return this.gitVisuals.gitEngine;
  }

  getModel() {
    return getPanelModel(this.getGitEngine());
  }

  getLayout() {
    return getPanelLayout(
      this.getModel(),
      this.paper.width,
      this.paper.height
    );
  }

  genGraphics(paper) {
    this.paper = paper;
    this.panel = paper.rect(0, 0, PANEL_WIDTH, 0, 8).attr({
      fill: '#FFF',
      'fill-opacity': 0.3,
      stroke: '#FFF',
      'stroke-width': 2,
      opacity: 0
    });
    this.refresh(0);
  }

  makeChip(chip) {
    var rect = this.paper.rect(
      chip.x, chip.y - chip.height / 2, chip.width, chip.height, 8
    ).attr({
      fill: STATUS_FILL[chip.status],
      stroke: '#FFF',
      'stroke-width': 2,
      opacity: 0
    });
    var text = this.paper.text(
      chip.x + chip.width / 2, chip.y, truncatePath(chip.path)
    ).attr({
      'font-size': CHIP_FONT_SIZE,
      'font-weight': 'bold',
      'font-family': FONT_FAMILY,
      opacity: 0
    });
    return { rect: rect, text: text };
  }

  makeLabel(x, y, str) {
    return this.paper.text(x, y, str).attr({
      'font-size': TITLE_FONT_SIZE,
      'font-weight': 'bold',
      'font-family': FONT_FAMILY,
      // left-align titles against the panel padding
      'text-anchor': 'start',
      // black text on a light fill, same as the branch and tag labels
      fill: '#000',
      opacity: 0
    });
  }

  removeChip(key) {
    var els = this.chipEls[key];
    if (!els) {
      return;
    }
    els.rect.remove();
    els.text.remove();
    delete this.chipEls[key];
  }

  // Redraw the panel from current engine state. Safe to call at any time.
  refresh(speed) {
    if (!this.paper || !this.panel) {
      return;
    }
    var layout = this.getLayout();
    var engaged = layout.chips.length > 0 || layout.titles.length > 0;
    var s = (speed === undefined) ? this.get('animationSpeed') : speed;

    if (!engaged) {
      // classic level: hide the panel entirely and drop every chip
      this.panel.stop().attr({ opacity: 0 });
      Object.keys(this.chipEls).forEach(function(key) {
        this.removeChip(key);
      }, this);
      Object.keys(this.titleEls).forEach(function(key) {
        this.titleEls[key].remove();
        delete this.titleEls[key];
      }, this);
      Object.keys(this.emptyEls).forEach(function(key) {
        this.emptyEls[key].remove();
        delete this.emptyEls[key];
      }, this);
      return;
    }

    this.animateEl(this.panel, {
      x: layout.panel.x,
      y: layout.panel.y,
      width: layout.panel.width,
      height: layout.panel.height,
      opacity: 1
    }, s);

    this.syncTitles(layout, s);
    this.syncEmpties(layout, s);
    this.syncChips(layout, s);
    this.toFront();
  }

  animateEl(el, attr, speed) {
    el.stop();
    if (!speed) {
      el.attr(attr);
    } else {
      el.animate(attr, speed, this.get('animationEasing'));
    }
  }

  syncTitles(layout, speed) {
    var seen = {};
    layout.titles.forEach(function(title) {
      seen[title.key] = true;
      if (!this.titleEls[title.key]) {
        this.titleEls[title.key] = this.makeLabel(title.x, title.y, title.text);
      }
      this.animateEl(this.titleEls[title.key], {
        x: title.x, y: title.y, opacity: 0.8
      }, speed);
    }, this);

    Object.keys(this.titleEls).forEach(function(key) {
      if (!seen[key]) {
        this.titleEls[key].remove();
        delete this.titleEls[key];
      }
    }, this);
  }

  syncEmpties(layout, speed) {
    var seen = {};
    layout.empties.forEach(function(empty) {
      seen[empty.key] = true;
      if (!this.emptyEls[empty.key]) {
        this.emptyEls[empty.key] = this.paper.text(empty.x, empty.y, 'clean').attr({
          'font-size': CHIP_FONT_SIZE,
          'font-family': FONT_FAMILY,
          'text-anchor': 'start',
          fill: '#000',
          opacity: 0
        });
      }
      this.animateEl(this.emptyEls[empty.key], {
        x: empty.x, y: empty.y, opacity: 0.45
      }, speed);
    }, this);

    Object.keys(this.emptyEls).forEach(function(key) {
      if (!seen[key]) {
        this.emptyEls[key].remove();
        delete this.emptyEls[key];
      }
    }, this);
  }

  syncChips(layout, speed) {
    var seen = {};
    layout.chips.forEach(function(chip) {
      seen[chip.key] = true;
      var els = this.chipEls[chip.key];
      if (!els) {
        // brand new chip: build it in place, then fade it up
        els = this.makeChip(chip);
        this.chipEls[chip.key] = els;
      }
      this.animateEl(els.rect, {
        x: chip.x,
        y: chip.y - chip.height / 2,
        width: chip.width,
        height: chip.height,
        fill: STATUS_FILL[chip.status],
        opacity: 1
      }, speed);
      this.animateEl(els.text, {
        x: chip.x + chip.width / 2,
        y: chip.y,
        opacity: 1
      }, speed);
    }, this);

    Object.keys(this.chipEls).forEach(function(key) {
      // a chip the commit animation still owns must stay put until it flies
      if (seen[key] || (this.slurping && this.slurping[key])) {
        return;
      }
      this.removeChip(key);
    }, this);
  }

  // Hold on to the chips a commit just swallowed so they can fly into it,
  // instead of blinking out when the engine clears the staging area.
  beginSlurp(paths) {
    this.slurping = {};
    paths.forEach(function(path) {
      this.slurping[path] = true;
    }, this);
  }

  // Fly every held chip into the new commit circle, together, then drop them.
  slurpIntoCommit(visNode) {
    var held = this.slurping || {};
    var keys = Object.keys(held).filter(function(key) {
      return !!this.chipEls[key];
    }, this);

    if (!keys.length) {
      this.slurping = null;
      return Promise.resolve();
    }

    var target = visNode.getScreenCoords();
    var radius = visNode.getRadius();
    var time = GRAPHICS.defaultAnimationTime;

    keys.forEach(function(key) {
      var els = this.chipEls[key];
      // converge on the commit, shrinking down into the circle
      this.animateEl(els.rect, {
        x: target.x - radius,
        y: target.y - radius,
        width: radius * 2,
        height: radius * 2,
        opacity: 0
      }, time);
      this.animateEl(els.text, {
        x: target.x,
        y: target.y,
        opacity: 0
      }, time);
    }, this);

    var that = this;
    return delay(time).then(function() {
      keys.forEach(function(key) {
        that.removeChip(key);
      });
      that.slurping = null;
      that.refresh();
    });
  }

  toFront() {
    if (!this.panel) {
      return;
    }
    this.panel.toFront();
    Object.keys(this.titleEls).forEach(function(key) {
      this.titleEls[key].toFront();
    }, this);
    Object.keys(this.emptyEls).forEach(function(key) {
      this.emptyEls[key].toFront();
    }, this);
    Object.keys(this.chipEls).forEach(function(key) {
      this.chipEls[key].rect.toFront();
      this.chipEls[key].text.toFront();
    }, this);
  }

  remove() {
    Object.keys(this.chipEls).forEach(function(key) {
      this.removeChip(key);
    }, this);
    Object.keys(this.titleEls).forEach(function(key) {
      this.titleEls[key].remove();
    }, this);
    Object.keys(this.emptyEls).forEach(function(key) {
      this.emptyEls[key].remove();
    }, this);
    this.titleEls = {};
    this.emptyEls = {};
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
    }
  }
}

exports.VisStagingArea = VisStagingArea;
exports.MARGIN = MARGIN;
exports.PANEL_WIDTH = PANEL_WIDTH;
exports.getPanelModel = getPanelModel;
exports.getPanelLayout = getPanelLayout;
