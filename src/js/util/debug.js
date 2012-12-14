var toGlobalize = {
  Tree: require('../visuals/tree'),
  Visuals: require('../visuals'),
  Git: require('../git'),
  CommandModel: require('../models/commandModel'),
  Levels: require('../levels'),
  Constants: require('../util/constants'),
  Collections: require('../models/collections'),
  Async: require('../visuals/animation'),
  AnimationFactory: require('../visuals/animationFactory'),
  Main: require('../app')
};

_.each(toGlobalize, function(module) {
  _.extend(window, module);
});

window.events = toGlobalize.Main.getEvents();

