var _ = require('underscore');
var constants = require('../util/constants');
var util = require('../util');

var strings = require('../intl/strings').strings;

var str = exports.str = function(key, params) {
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

  var locale = util.getLocale();
  if (!strings[key]) {
    console.warn('NO INTL support for key ' + key);
    return 'NO INTL support for key ' + key;
  }

  if (!strings[key][locale]) {
    if (key !== 'error-untranslated') {
      return str('error-untranslated');
    }
    return 'No translation for that key ' + key;
  }

  // TODO - interpolation
  return strings[key][locale];
};

var getStartDialog = exports.getStartDialog = function(level) {
  if (!level || !level.startDialog) {
    throw new Error('start dialog doesnt exist in that blob');
  }
  if (!level.startDialog.en) {
    console.warn('WARNING!! This dialog does not have intl support: ', level);
  }
  var locale = util.getLocale();
  if (level.startDialog[locale]) {
    return level.startDialog[locale];
  }

  // we need to return english but add their locale error
  var startCopy = _.clone(level.startDialog.en || level.startDialog);
  var errorAlert = {
    type: 'ModalAlert',
    options: {
      markdown: str('error-untranslated')
    }
  };

  startCopy.childViews.unshift(errorAlert);
  return startCopy;
};


