/**
 * Node-only utility (used by scripts like src/js/intl/checkStrings). Kept in
 * its own module so the browser bundle never pulls in `fs`/`path`.
 */
var { readdirSync, lstatSync } = require('fs');
var { join } = require('path');

exports.readDirDeep = function(dir) {
  var paths = [];
  readdirSync(dir).forEach(function(path) {
    var aPath = join(dir, path);
    if (lstatSync(aPath).isDirectory()) {
      paths.push(...exports.readDirDeep(aPath));
    } else {
      paths.push(aPath);
    }
  });
  return paths;
};
