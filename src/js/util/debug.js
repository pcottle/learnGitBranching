var _ = require('underscore');

var toGlobalize = {
  Tree: require('../visuals/tree'),
  Visuals: require('../visuals'),
  Git: require('../git'),
  CommandModel: require('../models/commandModel'),
  Levels: require('../git/treeCompare'),
  Constants: require('../util/constants'),
  Collections: require('../models/collections'),
  Async: require('../visuals/animation'),
  AnimationFactory: require('../visuals/animation/animationFactory'),
  Main: require('../app'),
  HeadLess: require('../git/headless'),
  Q: { Q: require('q') },
  RebaseView: require('../views/rebaseView'),
  Views: require('../views'),
  MultiView: require('../views/multiView'),
  ZoomLevel: require('../util/zoomLevel')
};

_.each(toGlobalize, function(module) {
  _.extend(window, module);
});

$(document).ready(function() {
  window.events = toGlobalize.Main.getEvents();
  window.eventBaton = toGlobalize.Main.getEventBaton();
  window.sandbox = toGlobalize.Main.getSandbox();
});

