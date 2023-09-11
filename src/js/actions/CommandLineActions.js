"use strict";

var AppConstants = require("../constants/AppConstants");
var AppDispatcher = require("../dispatcher/AppDispatcher");

var ActionTypes = AppConstants.ActionTypes;

var CommandLineActions = {
  submitCommand: function (text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SUBMIT_COMMAND,
      text: text,
    });
  },
  importantfuncition: function () {
    console.log("important work");
  },
  secondImportantFunction: function () {
    console.log("here");
  },
};

module.exports = CommandLineActions;
