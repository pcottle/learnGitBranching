var toGlobalize = {
  Tree: require('../visuals/tree'),
  Visuals: require('../visuals'),
  Git: require('../git'),
  CommandModel: require('../models/commandModel'),
  Levels: require('../levels'),
  Constants: require('../constants'),
  Collections: require('../collections'),
  Async: require('../animation'),
  AnimationFactory: require('../animation/animationFactory'),
  Main: require('../app')
};

_.each(toGlobalize, function(module) {
  _.extend(window, module);
});

window.events = toGlobalize.Main.getEvents();

