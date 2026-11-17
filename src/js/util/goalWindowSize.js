// Picks a starting size for the "goal" window from the shape of the goal tree,
// so small goals don't get stretched over most of the screen. Height is chosen
// first (commit layers are spread over the full canvas height, so a short tree
// looks best in a short window), then width (one column per branch of history).

// the toolbar + helper text above the canvas
var CHROME_HEIGHT = 71;
// the tree is padded by GitVisuals.getScreenPadding(); this is the sum of the
// top and bottom padding used by the layout
var CANVAS_PADDING_HEIGHT = 110;
var HEIGHT_PER_LAYER = 100;
// GitVisuals lays out at least this many layers on a small (goal) canvas
var MIN_LAYERS = 2;

var WIDTH_PER_COLUMN = 120;
var WIDTH_PADDING = 140;

var MIN_WIDTH = 340;
var MIN_HEIGHT = 250;
var MAX_WIDTH_FRACTION = 0.6;
var MAX_HEIGHT_FRACTION = 0.95;

var parseTree = function(treeString) {
  if (typeof treeString !== 'string') {
    return treeString;
  }
  try {
    return JSON.parse(unescape(treeString));
  } catch (e) {
    return null;
  }
};

// Mirrors the layout in GitVisuals: the number of layers is the longest chain
// of commits, and the number of columns is the number of leaves once every
// commit is attached only to its first parent.
var measureCommits = function(commits) {
  var ids = Object.keys(commits || {});
  var layersCache = {};
  var hasMainChild = {};

  var layersFor = function(id) {
    if (layersCache[id] !== undefined) {
      return layersCache[id];
    }
    // seed the cache so a malformed (cyclic) tree can't recurse forever
    layersCache[id] = 0;
    var layers = 0;
    ((commits[id] && commits[id].parents) || []).forEach(function(parent) {
      if (commits[parent]) {
        layers = Math.max(layers, layersFor(parent) + 1);
      }
    });
    layersCache[id] = layers;
    return layers;
  };

  var layers = 0;
  ids.forEach(function(id) {
    layers = Math.max(layers, layersFor(id));
    var parents = commits[id].parents || [];
    if (parents.length && commits[parents[0]]) {
      hasMainChild[parents[0]] = true;
    }
  });

  var columns = ids.filter(function(id) {
    return !hasMainChild[id];
  }).length;

  return { layers: layers, columns: Math.max(columns, 1) };
};

var measureTreeString = function(treeString) {
  var tree = parseTree(treeString);
  if (!tree || !tree.commits) {
    return null;
  }
  var local = measureCommits(tree.commits);
  if (!tree.originTree || !tree.originTree.commits) {
    return local;
  }
  // local and origin repos share the canvas side by side
  var origin = measureCommits(tree.originTree.commits);
  return {
    layers: Math.max(local.layers, origin.layers),
    columns: local.columns + origin.columns
  };
};

var clamp = function(value, min, max) {
  return Math.round(Math.max(min, Math.min(value, max)));
};

/**
 * @param {string|Object} treeString the goal tree
 * @param {{width: number, height: number}} viewport the window dimensions
 * @return {{width: number, height: number}|null} null if the tree is unreadable
 */
var getGoalWindowSize = function(treeString, viewport) {
  var measured = measureTreeString(treeString);
  if (!measured) {
    return null;
  }
  viewport = viewport || {};

  var layers = Math.max(measured.layers, MIN_LAYERS);
  var height = CHROME_HEIGHT + CANVAS_PADDING_HEIGHT + HEIGHT_PER_LAYER * layers;
  var width = WIDTH_PADDING + WIDTH_PER_COLUMN * measured.columns;

  var maxHeight = viewport.height ? MAX_HEIGHT_FRACTION * viewport.height : Infinity;
  var maxWidth = viewport.width ? MAX_WIDTH_FRACTION * viewport.width : Infinity;

  return {
    width: clamp(width, MIN_WIDTH, Math.max(maxWidth, MIN_WIDTH)),
    height: clamp(height, MIN_HEIGHT, Math.max(maxHeight, MIN_HEIGHT))
  };
};

exports.getGoalWindowSize = getGoalWindowSize;
exports.measureTreeString = measureTreeString;
exports.MIN_WIDTH = MIN_WIDTH;
exports.MIN_HEIGHT = MIN_HEIGHT;
exports.MAX_HEIGHT_FRACTION = MAX_HEIGHT_FRACTION;
