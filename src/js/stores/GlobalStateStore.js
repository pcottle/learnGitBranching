"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;

var _isAnimating = false;
var _flipTreeY = false;
var _numLevelsSolved = 0;

var GlobalStateStore = assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{
  getIsAnimating: function() {
    return _isAnimating;
  },

  getFlipTreeY: function() {
    return _flipTreeY;
  },

  getNumLevelsSolved: function() {
    return _numLevelsSolved;
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;

    switch (action.type) {
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
    }

    if (shouldInform) {
      GlobalStateStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = GlobalStateStore;
