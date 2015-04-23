"use strict";

/**
 * Our own flavor of keyMirror since I get some weird
 * obscure error when trying to import the react lib one.
 */
var keyMirror = function(obj) {
  var result = {};
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    result[key] = key;
  }
  return result;
};

module.exports = keyMirror;
