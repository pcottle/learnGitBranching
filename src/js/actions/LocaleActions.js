"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = AppConstants.ActionTypes;

var LocaleActions = {

  changeLocale: function(newLocale) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CHANGE_LOCALE,
      locale: newLocale
    });
  },

  changeLocaleFromURI: function(newLocale) {
    AppDispatcher.handleURIAction({
      type: ActionTypes.CHANGE_LOCALE,
      locale: newLocale
    });
  },

  changeLocaleFromHeader: function(header) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CHANGE_LOCALE_FROM_HEADER,
      header: header
    });
  }
};

module.exports = LocaleActions;
