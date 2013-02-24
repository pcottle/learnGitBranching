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
  ZoomLevel: require('../util/zoomLevel'),
  VisBranch: require('../visuals/visBranch'),
  Level: require('../level'),
  Sandbox: require('../level/sandbox'),
  GitDemonstrationView: require('../views/gitDemonstrationView'),
  Markdown: require('markdown'),
  LevelDropdownView: require('../views/levelDropdownView'),
  BuilderViews: require('../views/builderViews'),
  Intl: require('../intl')
};

_.each(toGlobalize, function(module) {
  _.extend(window, module);
});

$(document).ready(function() {
  window.events = toGlobalize.Main.getEvents();
  window.eventBaton = toGlobalize.Main.getEventBaton();
  window.sandbox = toGlobalize.Main.getSandbox();
  window.modules = toGlobalize;
  window.levelDropdown = toGlobalize.Main.getLevelDropdown();
});

