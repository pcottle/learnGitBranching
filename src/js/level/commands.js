var _ = require('underscore');

var regexMap = {
  'show goal': /^show goal$/,
  'hide goal': /^hide goal$/,
  'show solution': /^show solution$/
};

var parse = function(str) {
  var levelMethod;

  _.each(regexMap, function(regex, method) {
    if (regex.test(str)) {
      levelMethod = method;
    }
  });

  return (!levelMethod) ? false : {
    toSet: {
      eventName: 'processLevelCommand',
      method: levelMethod
    }
  };
};

exports.parse = parse;

