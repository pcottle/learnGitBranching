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
  HeadLess: require('../git/headless')
};

_.each(toGlobalize, function(module) {
  _.extend(window, module);
});

$(document).ready(function() {
  window.events = toGlobalize.Main.getEvents();
  window.mainVis = toGlobalize.Main.getMainVis();
  window.ui = toGlobalize.Main.getMainVis();
});

