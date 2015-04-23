var escapeString = require('../util/escapeString');
var constants = require('../util/constants');

exports.parseQueryString = function(uri) {
  // from http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
  var params = {};
  uri.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) { params[$1] = $3; }
  );
  return params;
};

exports.isBrowser = function() {
  var inBrowser = String(typeof window) !== 'undefined';
  return inBrowser;
};

exports.splitTextCommand = function(value, func, context) {
  func = func.bind(context);
  value.split(';').forEach(function(command, index) {
    command = escapeString(command);
    command = command
      .replace(/^(\s+)/, '')
      .replace(/(\s+)$/, '')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'");

    if (index > 0 && !command.length) {
      return;
    }
    func(command);
  });
};

exports.genParseCommand = function(regexMap, eventName) {
  return function(str) {
    var method;
    var regexResults;

    Object.keys(regexMap).forEach(function(_method) {
      var results = regexMap[_method].exec(str);
      if (results) {
        method = _method;
        regexResults = results;
      }
    });

    return (!method) ? false : {
      toSet: {
        eventName: eventName,
        method: method,
        regexResults: regexResults
      }
    };
  };
};
