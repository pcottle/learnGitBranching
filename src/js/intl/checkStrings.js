var { join } = require('path');
var { readFileSync } = require('fs');

var util = require('../util');
var { strings } = require('../intl/strings');

var canonicalLocale = 'en_US';
var easyRegex = /intl\.str\(\s*'([a-zA-Z\-]+)'/g;

var allKetSet = new Set(Object.keys(strings));
allKetSet.delete('error-untranslated'); // used in ./index.js

var goodKeySet = new Set();
var validationErrors = [];

var validateTranslations = function() {
  Object.keys(strings).forEach(function(key) {
    var translations = strings[key];
    var canonicalValue = translations[canonicalLocale];

    if (typeof canonicalValue !== 'string' || !canonicalValue.trim()) {
      validationErrors.push(
        'Missing or invalid ' + canonicalLocale + ' translation for key "' + key + '"'
      );
    }

    Object.keys(translations).forEach(function(locale) {
      if (locale === '__desc__') { return; }

      var value = translations[locale];
      if (typeof value !== 'string' || !value.trim()) {
        validationErrors.push(
          'Invalid translation for key "' + key + '" and locale "' + locale + '"'
        );
      }
    });
  });
};

var validateKey = function(key) {
  if (!strings[key]) {
    validationErrors.push('No translation key for "' + key + '"');
  } else {
    goodKeySet.add(key);
    allKetSet.delete(key);
  }
};

if (!util.isBrowser()) {
  validateTranslations();
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

  if (validationErrors.length) {
    validationErrors.forEach(function(error) {
      console.error(error);
    });
    process.exitCode = 1;
  }
}
