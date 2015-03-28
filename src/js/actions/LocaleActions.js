'use strict';

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = AppConstants.ActionTypes;

var LocaleActions = {

  changeLocale: function(newLocale) {
    console.log('firingt his off', newLocale);
    AppDispatcher.handleViewAction({
      type: ActionTypes.CHANGE_LOCALE,
      locale: newLocale
    });
  },
};

module.exports = LocaleActions;
