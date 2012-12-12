var toGlobalize = [
  require('./tree'),
  require('./visuals'),
  require('./git'),
  require('./commandModel'),
  require('./levels'),
  require('./constants'),
  require('./collections'),
  require('./async'),
  require('./animationFactory')
];

_.each(toGlobalize, function(module) {
  _.extend(window, module);
});

