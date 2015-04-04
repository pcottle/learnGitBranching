"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var COMMAND_HISTORY_KEY = 'lgb_CommandHistory';
var COMMAND_HISTORY_MAX_LENGTH = 100;
var COMMAND_HISTORY_TO_KEEP = 10;

var _commandHistory = [];
try {
  _commandHistory = JSON.parse(
    localStorage.getItem(COMMAND_HISTORY_KEY) || '[]'
  ) || [];
} catch (e) {
}

function _checkForSize() {
  // if our command line history is too big...
  if (_commandHistory.length > COMMAND_HISTORY_MAX_LENGTH) {
    // grab the last 10
    _commandHistory =
      _commandHistory.slice(0, COMMAND_HISTORY_TO_KEEP);
  }
}

function _saveToLocalStorage() {
  try {
    localStorage.setItem(
      COMMAND_HISTORY_KEY,
      JSON.stringify(_commandHistory)
    );
  } catch (e) {
  }
}

var CommandLineStore = assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{

  getMaxHistoryLength: function() {
    return COMMAND_HISTORY_MAX_LENGTH;
  },

  getCommandHistoryLength: function() {
    return _commandHistory.length;
  },

  getCommandHistory: function() {
    return _commandHistory.slice(0);
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;

    switch (action.type) {
      case ActionTypes.SUBMIT_COMMAND:
        _commandHistory.unshift(String(action.text));
        _checkForSize();
        _saveToLocalStorage();
        shouldInform = true;
        break;
      case ActionTypes.CHANGE_FLIP_TREE_Y:
        break;
    }

    if (shouldInform) {
      CommandLineStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = CommandLineStore;
