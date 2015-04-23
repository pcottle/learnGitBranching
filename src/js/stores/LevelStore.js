"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var _ = require('underscore');
var assign = require('object-assign');
var levelSequences = require('../../levels').levelSequences;
var sequenceInfo = require('../../levels').sequenceInfo;

var ActionTypes = AppConstants.ActionTypes;
var SOLVED_MAP_STORAGE_KEY = 'solvedMap';

var _levelMap = {};
var _solvedMap = {};
var _sequences = [];

try {
  _solvedMap = JSON.parse(
    localStorage.getItem(SOLVED_MAP_STORAGE_KEY) || '{}'
  ) || {};
} catch (e) {
  console.warn('local storage failed', e);
}

function _syncToStorage() {
  try {
    localStorage.setItem(SOLVED_MAP_STORAGE_KEY, JSON.stringify(_solvedMap));
  } catch (e) {
    console.warn('local storage failed on set', e);
  }
}

var validateLevel = function(level) {
  level = level || {};
  var requiredFields = [
    'name',
    'goalTreeString',
    //'description',
    'solutionCommand'
  ];

  _.each(requiredFields, function(field) {
    if (level[field] === undefined) {
      console.log(level);
      throw new Error('I need this field for a level: ' + field);
    }
  });
};

/**
 * Unpack the level sequences.
 */
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

var LevelStore = assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{
  getSequenceToLevels: function() {
    return levelSequences;
  },

  getSequences: function() {
    return _.keys(levelSequences);
  },

  getLevelsInSequence: function(sequenceName) {
    if (!levelSequences[sequenceName]) {
      throw new Error('that sequecne name ' + sequenceName + 'does not exist');
    }
    return levelSequences[sequenceName];
  },

  getSequenceInfo: function(sequenceName) {
    return sequenceInfo[sequenceName];
  },

  getLevel: function(id) {
    return _levelMap[id];
  },

  getNextLevel: function(id) {
    if (!_levelMap[id]) {
      console.warn('that level doesnt exist!!!');
      return null;
    }

    // meh, this method could be better. It's a tradeoff between
    // having the sequence structure be really simple JSON
    // and having no connectivity information between levels, which means
    // you have to build that up yourself on every query
    var level = _levelMap[id];
    var sequenceName = level.sequenceName;
    var sequence = levelSequences[sequenceName];

    var nextIndex = level.index + 1;
    if (nextIndex < sequence.length) {
      return sequence[nextIndex];
    }

    var nextSequenceIndex = _sequences.indexOf(sequenceName) + 1;
    if (nextSequenceIndex < _sequences.length) {
      var nextSequenceName = _sequences[nextSequenceIndex];
      return levelSequences[nextSequenceName][0];
    }

    // they finished the last level!
    return null;
  },

  isLevelSolved: function(levelID) {
    if (!_levelMap[levelID]) {
      throw new Error('that level doesnt exist!');
    }
    return !!_solvedMap[levelID];
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;

    switch (action.type) {
      case ActionTypes.RESET_LEVELS_SOLVED:
        _solvedMap = {};
        _syncToStorage();
        shouldInform = true;
        break;
      case ActionTypes.SET_LEVEL_SOLVED:
        _solvedMap[action.levelID] = true;
        _syncToStorage();
        shouldInform = true;
        break;
    }

    if (shouldInform) {
      LevelStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = LevelStore;
