"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = AppConstants.ActionTypes;

var CommandLineActions = {

  submitCommand: function(text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SUBMIT_COMMAND,
      text: text
    });
  }

};

module.exports = CommandLineActions;
