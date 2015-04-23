var sys = require('sys');
var util = require('../util');
var child_process = require('child_process');
var strings = require('../intl/strings').strings;

var searchCommand = 'grep -C 2 -r "intl.str(" ../../';
var genBadKeyCommand = function(key) {
  return 'grep -r "' + key + '" ../../';
};

var easyRegex = /intl.str\('([a-zA-Z\-]+)'/g;
var hardRegex = /\s+'([a-z\-]+)',/g;

var findKey = function(badKey) {
  child_process.exec(genBadKeyCommand(badKey), function(err, output) {
    console.log(output);
  });
};

var goodKeys = 0;
var validateKey = function(key) {
  if (!strings[key]) {
    console.log('NO KEY for: "', key, '"');
    findKey(key);
  } else {
    goodKeys++;
  }
};

var processLines = function(lines) {
  lines.forEach(function(line) {
    var results = easyRegex.exec(line);
    if (results && results[1]) {
      validateKey(results[1]);
      return;
    }
    // could be a multi-liner
    results = hardRegex.exec(line);
    if (results && results[1]) {
      validateKey(results[1]);
    }
  });
};

if (!util.isBrowser()) {
  child_process.exec(
    searchCommand,
    function(err, output) {
      processLines(output.split('\n'));
      console.log(goodKeys + ' good keys found!');
    }
  );
}

