"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = AppConstants.ActionTypes;

var GlobalStateActions = {

  changeIsAnimating: function(isAnimating) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CHANGE_IS_ANIMATING,
      isAnimating: isAnimating
    });
  },

  levelSolved: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LEVEL_SOLVED,
    });
  },

  disableLevelInstructions: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DISABLE_LEVEL_INSTRUCTIONS,
    });
  },

  changeFlipTreeY: function(flipTreeY) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CHANGE_FLIP_TREE_Y,
      flipTreeY: flipTreeY
    });
  }

};

module.exports = GlobalStateActions;
