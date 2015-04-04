"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var COMMAND_HISTORY_KEY = 'lgb_CommandHistory';

var _commandHistory = [];
try {
  _commandHistory = JSON.parse(
    localStorage.getItem(COMMAND_HISTORY_KEY) || '[]'
  ) || [];
} catch (e) {
}

var _saveToLocalStorage = function() {
  try {
    localStorage.setItem(
      COMMAND_HISTORY_KEY,
      JSON.stringify(_commandHistory)
    );
  } catch (e) {
  }
};

var CommandLineStore = assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{

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
        _commandHistory.push(action.text);
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
