"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = AppConstants.ActionTypes;

var _isAnimating = false;
var _flipTreeY = false;
var _numLevelsSolved = 0;
var _disableLevelInstructions = false;
var _isSolvingLevel = false;

var GlobalStateStore = Object.assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{
  getIsAnimating: function() {
    return _isAnimating;
  },

  getIsSolvingLevel: function() {
    return _isSolvingLevel;
  },

  getFlipTreeY: function() {
    return _flipTreeY;
  },

  getNumLevelsSolved: function() {
    return _numLevelsSolved;
  },

  getShouldDisableLevelInstructions: function() {
    return _disableLevelInstructions;
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;

    switch (action.type) {
      case ActionTypes.SET_IS_SOLVING_LEVEL:
        _isSolvingLevel = action.isSolvingLevel;
        shouldInform = true;
        break;
      case ActionTypes.CHANGE_IS_ANIMATING:
        _isAnimating = action.isAnimating;
        shouldInform = true;
        break;
      case ActionTypes.CHANGE_FLIP_TREE_Y:
        _flipTreeY = action.flipTreeY;
        shouldInform = true;
        break;
      case ActionTypes.LEVEL_SOLVED:
        _numLevelsSolved++;
        shouldInform = true;
        break;
      case ActionTypes.DISABLE_LEVEL_INSTRUCTIONS:
        _disableLevelInstructions = true;
        shouldInform = true;
        break;
    }

    if (shouldInform) {
      GlobalStateStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = GlobalStateStore;
