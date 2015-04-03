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

  changeFlipTreeY: function(flipTreeY) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CHANGE_FLIP_TREE_Y,
      flipTreeY: flipTreeY
    });
  }

};

module.exports = GlobalStateActions;
