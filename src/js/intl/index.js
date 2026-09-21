var LocaleStore = require('../stores/LocaleStore');
var AppConstants = require('../constants/AppConstants');

var _ = require('underscore');
var enStrings = require('./generated/en_US').strings;
var generatedLoaders = require('./generated/loaders').loaders;
var fetchLocale = require('./localeLoader').fetchLocale;

var getDefaultLocale = LocaleStore.getDefaultLocale;

// Locale string tables currently in memory; en_US is always present as the
// synchronous fallback, everything else streams in via loadLocale().
var stringsByLocale = { en_US: enStrings };
var pendingLocaleLoads = {};

var fallbackMap = {
  'zh_TW': 'zh_CN',
  'es_MX': 'es_ES'
};

function hasKey(key) {
  return Object.prototype.hasOwnProperty.call(enStrings, key);
}

function stringFor(key, locale) {
  var data = stringsByLocale[locale];
  return data ? data[key] : undefined;
}

/**
 * Dynamically import a locale's string table (resolves immediately if it is
 * already loaded or has no loader).
 * @param {string} locale
 * @returns {Promise<Object|null>}
 */
function loadSingleLocale(locale) {
  if (!locale || stringsByLocale[locale] || !generatedLoaders[locale]) {
    return Promise.resolve(stringsByLocale[locale] || null);
  }
  if (!pendingLocaleLoads[locale]) {
    pendingLocaleLoads[locale] = fetchLocale(generatedLoaders[locale]).then(function(data) {
      delete pendingLocaleLoads[locale];
      if (data) {
        stringsByLocale[locale] = data;
        // re-render so the localized copy replaces the en_US fallback
        LocaleStore.emit(AppConstants.CHANGE_EVENT);
      }
      return data;
    });
  }
  return pendingLocaleLoads[locale];
}

var loadLocale = exports.loadLocale = function(locale) {
  var fallbackLocale = fallbackMap[locale];
  if (!fallbackLocale) {
    return loadSingleLocale(locale);
  }

  // Regional fallbacks are useful only if their tables are in memory when
  // str() performs its synchronous lookup. Load the one intentional fallback
  // alongside the active locale rather than pulling every related locale.
  return Promise.all([
    loadSingleLocale(locale),
    loadSingleLocale(fallbackLocale)
  ]).then(function(results) {
    return results[0];
  });
};


// lets change underscores template settings so it interpolates
// things like "{branchName} does not exist".
var templateSettings = Object.assign({}, _.templateSettings);
templateSettings.interpolate = /\{(.+?)\}/g;
var template = exports.template = function(str, params) {
  return _.template(str, templateSettings)(params);
};

var str = exports.str = function(key, params) {
  params = params || {};
  // this function takes a key like "error-branch-delete"
  // and parameters like {branchName: 'bugFix', num: 3}.
  //
  // it sticks those into a translation string like:
  //   'en': 'You can not delete the branch {branchName} because' +
  //         'you are currently on that branch! This is error number + {num}'
  //
  // to produce:
  //
  // 'You can not delete the branch bugFix because you are currently on that branch!
  //  This is error number 3'

  var locale = LocaleStore.getLocale();
  if (!hasKey(key)) {
    console.warn('NO INTL support for key ' + key);
    return 'NO INTL support for key ' + key + '. this is probably a dev error';
  }

  // make sure the requested locale eventually makes it into memory
  loadLocale(locale);

  var value = stringFor(key, locale);
  if (!value) {
    // try falling back to another locale if in the map
    locale = fallbackMap[locale] || getDefaultLocale();
    value = stringFor(key, locale);
  }

  if (!value) {
    if (key !== 'error-untranslated') {
      return str('error-untranslated');
    }
    return 'No translation for the key "' + key + '"';
  }

  return template(
    value,
    params
  );
};

var getIntlKey = exports.getIntlKey = function(obj, key, overrideLocale) {
  if (!obj || !obj[key]) {
    throw new Error('that key ' + key + ' doesn\'t exist in this blob ' + obj);
  }
  if (!obj[key][getDefaultLocale()]) {
    console.warn(
      'WARNING!! This blob does not have intl support:',
      obj,
      'for this key',
      key
    );
  }

  var locale = overrideLocale || LocaleStore.getLocale();
  return obj[key][locale];
};

exports.getDialog = function(obj) {
  return getIntlKey(obj, 'dialog') || obj.dialog[getDefaultLocale()];
};

exports.getHint = function(level) {
  if (!getIntlKey(level, 'hint')) {
    return getIntlKey(level, 'hint', getDefaultLocale()) + ' -- ' + str('error-untranslated');
  }
  return getIntlKey(level, 'hint');
};

exports.getName = function(level) {
  if (!getIntlKey(level, 'name')) {
    return getIntlKey(level, 'name', getDefaultLocale()) + ' -- ' + str('error-untranslated');
  }
  return getIntlKey(level, 'name');
};

exports.getStartDialog = function(level) {
  var startDialog = getIntlKey(level, 'startDialog');
  if (startDialog) { return startDialog; }

  // this level translation isn't supported yet, so lets add
  // an alert to the front and give the english version.
  var errorAlert = {
    type: 'ModalAlert',
    options: {
      markdown: str('error-untranslated')
    }
  };
  var startCopy = Object.assign(
    {},
    level.startDialog[getDefaultLocale()] || level.startDialog
  );
  startCopy.childViews.unshift(errorAlert);

  return startCopy;
};
