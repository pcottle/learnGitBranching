var { join } = require('path');
var { readFileSync } = require('fs');

var util = require('../util');
var { strings } = require('../intl/strings');

var easyRegex = /intl\.str\(\s*'([a-zA-Z\-]+)'/g;

var goodKeys = 0;
var validateKey = function(key) {
  if (!strings[key]) {
    console.log('NO KEY for: "', key, '"');
  } else {
    goodKeys++;
  }
};

if (!util.isBrowser()) {
  util.readDirDeep(join(__dirname, '../..')).forEach(function(path) {
    var content = readFileSync(path);
    var match;
    while (match = easyRegex.exec(content)) {
      console.log(match[1])
      validateKey(match[1]);
    }
  });
  console.log(goodKeys + ' good keys found!');
}
