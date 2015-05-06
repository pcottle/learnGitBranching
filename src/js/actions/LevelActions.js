"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = AppConstants.ActionTypes;

var LevelActions = {

  setLevelSolved: function(levelID) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SET_LEVEL_SOLVED,
      levelID: levelID
    });
  },

  resetLevelsSolved: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RESET_LEVELS_SOLVED
    });
  }

};

module.exports = LevelActions;
