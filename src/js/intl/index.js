var LocaleStore = require('../stores/LocaleStore');

var _ = require('underscore');
var strings = require('../intl/strings').strings;

var getDefaultLocale = LocaleStore.getDefaultLocale;

var fallbackMap = {
  'zh_TW': 'zh_CN'
};

// lets change underscores template settings so it interpolates
// things like "{branchName} does not exist".
var templateSettings = Object.assign({}, _.templateSettings);
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
    return 'NO INTL support for key ' + key + '. this is probably a dev error';
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

  if (typeof strings[key][locale] !== 'string') {
    return strings[key][locale];
  }
  return template(
    strings[key][locale],
    params
  );
};

exports.todo = function(str) {
  return str;
};

exports.getDialog = function(obj) {
  return str(obj.dialog);
};

exports.getHint = function(level) {
  return str(level.hint);
};

exports.getName = function(level) {
  return str(level.name);
};

exports.getDisplayName = function(info) {
  return str(info.displayName);
};

exports.getAbout = function(info) {
  return str(info.about);
};

exports.getStartDialog = function(level) {
  var startDialog = str(level.startDialog);
  if (startDialog) { return startDialog; }

  // this level translation isn't supported yet, so lets add
  // an alert to the front and give the english version.
  var errorAlert = {
    type: 'ModalAlert',
    options: {
      markdown: str('error-untranslated')
    }
  };
  return [errorAlert];
};
