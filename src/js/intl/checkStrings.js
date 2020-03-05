var { join } = require('path');
var { readFileSync } = require('fs');

var util = require('../util');
var { strings } = require('../intl/strings');

var easyRegex = /intl\.str\(\s*'([a-zA-Z\-]+)'/g;

var allKetSet = new Set(Object.keys(strings));
allKetSet.delete('error-untranslated'); // used in ./index.js

var goodKeySet = new Set();
var validateKey = function(key) {
  if (!strings[key]) {
    console.log('NO KEY for: "', key, '"');
  } else {
    goodKeySet.add(key);
    allKetSet.delete(key);
  }
};

if (!util.isBrowser()) {
  util.readDirDeep(join(__dirname, '../../')).forEach(function(path) {
    var content = readFileSync(path);
    var match;
    while (match = easyRegex.exec(content)) {
      validateKey(match[1]);
    }
  });
  console.log(goodKeySet.size, ' good keys found!');
  console.log(allKetSet.size, ' keys did not use!');
  console.log(allKetSet);
}
