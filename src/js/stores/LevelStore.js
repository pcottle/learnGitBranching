"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var _ = require('underscore');
var assign = require('object-assign');
var levelSequences = require('../../levels').levelSequences;
var sequenceInfo = require('../../levels').sequenceInfo;

var _levelMap = {};
var _sequences = [];

var validateLevel = function(level) {
  level = level || {};
  var requiredFields = [
    'name',
    'goalTreeString',
    //'description',
    'solutionCommand'
  ];

  var optionalFields = [
    'hint',
    'disabledMap',
    'startTree'
  ];

  _.each(requiredFields, function(field) {
    if (level[field] === undefined) {
      console.log(level);
      throw new Error('I need this field for a level: ' + field);
    }
  });
};

var unpackSequences = function() {
  _.each(levelSequences, function(levels, levelSequenceName) {
    _sequences.push(levelSequenceName);
    if (!levels || !levels.length) {
      throw new Error('no empty sequences allowed');
    }

    // for this particular sequence...
    _.each(levels, function(level, index) {
      validateLevel(level);

      var id = levelSequenceName + String(index + 1);
      var compiledLevel = assign(
        {},
        level,
        {
          index: index,
          id: id,
          sequenceName: levelSequenceName
        }
      );

      // update our internal data
      _levelMap[id] = compiledLevel;
      levelSequences[levelSequenceName][index] = compiledLevel;
    });
  });
};
unpackSequences();

var ActionTypes = AppConstants.ActionTypes;

var LevelStore = assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;

    switch (action.type) {
      case ActionTypes.RESET_LEVELS_SOLVED:
        shouldInform = true;
        break;
      case ActionTypes.SET_LEVEL_SOLVED:
        shouldInform = true;
        break;
    }

    if (shouldInform) {
      LevelStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = LevelStore;
