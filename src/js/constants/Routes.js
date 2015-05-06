var assign = require('object-assign');
var keyMirror = require('../util/keyMirror');

module.exports = keyMirror({
  NUX: null,
  LOADING: null,
  SEQUENCE_SELECT: null,
  LEVEL_SELECT: null,
});

module.exports.getRouteWithParams = function(id, params) {
  return assign({id: id}, params);
};

module.exports.getRouteForID = function(id) {
  return {
    id: id,
  };
};
