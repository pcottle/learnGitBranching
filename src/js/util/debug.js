var _ = require('underscore');

var toGlobalize = {
  Tree: require('../visuals/tree'),
  Visuals: require('../visuals'),
  Git: require('../git'),
  CommandModel: require('../models/commandModel'),
  Levels: require('../graph/treeCompare'),
  Constants: require('../util/constants'),
  Commands: require('../commands'),
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
  TreeCompare: require('../graph/treeCompare'),
  Level: require('../level'),
  Sandbox: require('../sandbox/'),
  GitDemonstrationView: require('../views/gitDemonstrationView'),
  Markdown: require('markdown'),
  LevelDropdownView: require('../views/levelDropdownView'),
  BuilderViews: require('../views/builderViews'),
  LevelArbiter: require('../level/arbiter'),
  Intl: require('../intl')
};

_.each(toGlobalize, function(module) {
  for (var key in module) {
    window['debug_' + key] = module[key];
  }
});

$(document).ready(function() {
  window.debug_events = toGlobalize.Main.getEvents();
  window.debug_eventBaton = toGlobalize.Main.getEventBaton();
  window.debug_sandbox = toGlobalize.Main.getSandbox();
  window.debug_modules = toGlobalize;
  window.debug_levelDropdown = toGlobalize.Main.getLevelDropdown();
  window.debug_under = _;
  window.debug_copyTree = function() {
    return toGlobalize.Main.getSandbox().mainVis.gitEngine.printAndCopyTree();
  };
});

