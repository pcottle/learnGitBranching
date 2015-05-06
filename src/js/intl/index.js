var LocaleStore = require('../stores/LocaleStore');

var _ = require('underscore');
var strings = require('../intl/strings').strings;

var getDefaultLocale = LocaleStore.getDefaultLocale;

var fallbackMap = {
  'zh_TW': 'zh_CN'
};

// lets change underscores template settings so it interpolates
// things like "{branchName} does not exist".
var templateSettings = _.clone(_.templateSettings);
templateSettings.interpolate = /\{(.+?)\}/g;
var template = exports.template = function(str, params) {
  return _.template(str, params, templateSettings);
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
  if (!strings[key]) {
    console.warn('NO INTL support for key ' + key);
    return 'NO INTL support for key ' + key;
  }

  if (!strings[key][locale]) {
    // try falling back to another locale if in the map
    locale = fallbackMap[locale] || getDefaultLocale();
  }

  if (!strings[key][locale]) {
    if (key !== 'error-untranslated') {
      return str('error-untranslated');
    }
    return 'No translation for the key "' + key + '"';
  }

  return template(
    strings[key][locale],
    params
  );
};

var getIntlKey = exports.getIntlKey = function(obj, key) {
  if (!obj || !obj[key]) {
    throw new Error('that key ' + key + 'doesnt exist in this blob' + obj);
  }
  if (!obj[key][getDefaultLocale()]) {
    console.warn(
      'WARNING!! This blob does not have intl support:',
      obj,
      'for this key',
      key
    );
  }

  return obj[key][LocaleStore.getLocale()];
};

exports.todo = function(str) {
  return str;
};

exports.getDialog = function(obj) {
  return getIntlKey(obj, 'dialog') || obj.dialog[getDefaultLocale()];
};

exports.getHint = function(level) {
  return getIntlKey(level, 'hint') || str('error-untranslated');
};

exports.getName = function(level) {
  return getIntlKey(level, 'name') || str('error-untranslated');
};

exports.getStartDialog = function(level) {
  var startDialog = getIntlKey(level, 'startDialog');
  if (startDialog) { return startDialog; }

  // this level translation isnt supported yet, so lets add
  // an alert to the front and give the english version.
  var errorAlert = {
    type: 'ModalAlert',
    options: {
      markdown: str('error-untranslated')
    }
  };
  var startCopy = _.clone(
    level.startDialog[getDefaultLocale()] || level.startDialog
  );
  startCopy.childViews.unshift(errorAlert);

  return startCopy;
};
