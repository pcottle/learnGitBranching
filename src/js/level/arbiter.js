var _ = require('underscore');
var Backbone = require('backbone');

// Each level is part of a "sequence;" levels within
// a sequence proceed in order.
var levelSequences = require('../../levels').levelSequences;
var sequenceInfo = require('../../levels').sequenceInfo;

var Main = require('../app');

function LevelArbiter() {
  this.levelMap = {};
  this.levelSequences = levelSequences;
  this.sequences = [];
  this.init();

  var solvedMap;
  try {
    solvedMap = JSON.parse(localStorage.getItem('solvedMap') || '{}');
  } catch (e) {
    console.warn('local storage failed', e);
    // throw e;
  }
  this.solvedMap = solvedMap || {};

  Main.getEvents().on('levelSolved', this.levelSolved, this);
}

LevelArbiter.prototype.init = function() {
  var previousLevelID;
  _.each(this.levelSequences, function(levels, levelSequenceName) {
    this.sequences.push(levelSequenceName);
    if (!levels || !levels.length) {
      throw new Error('no empty sequences allowed');
    }

    // for this particular sequence...
    _.each(levels, function(level, index) {
      this.validateLevel(level);

      var id = levelSequenceName + String(index + 1);
      var compiledLevel = _.extend(
        {},
        level,
        {
          index: index,
          id: id,
          sequenceName: levelSequenceName
        }
      );

      // update our internal data
      this.levelMap[id] = compiledLevel;
      this.levelSequences[levelSequenceName][index] = compiledLevel;
    }, this);
  }, this);
};

LevelArbiter.prototype.isLevelSolved = function(id) {
  if (!this.levelMap[id]) {
    throw new Error('that level doesnt exist!');
  }
  return Boolean(this.solvedMap[id]);
};

LevelArbiter.prototype.levelSolved = function(id) {
  // called without an id when we reset solved status
  if (!id) { return; }

  this.solvedMap[id] = true;
  this.syncToStorage();
};

LevelArbiter.prototype.resetSolvedMap = function() {
  this.solvedMap = {};
  this.syncToStorage();
  Main.getEvents().trigger('levelSolved');
};

LevelArbiter.prototype.syncToStorage = function() {
  try {
    localStorage.setItem('solvedMap', JSON.stringify(this.solvedMap));
  } catch (e) {
    console.warn('local storage fialed on set', e);
  }
};

LevelArbiter.prototype.validateLevel = function(level) {
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

LevelArbiter.prototype.getSequenceToLevels = function() {
  return this.levelSequences;
};

LevelArbiter.prototype.getSequences = function() {
  return _.keys(this.levelSequences);
};

LevelArbiter.prototype.getLevelsInSequence = function(sequenceName) {
  if (!this.levelSequences[sequenceName]) {
    throw new Error('that sequecne name ' + sequenceName + 'does not exist');
  }
  return this.levelSequences[sequenceName];
};

LevelArbiter.prototype.getSequenceInfo = function(sequenceName) {
  return sequenceInfo[sequenceName];
};

LevelArbiter.prototype.getLevel = function(id) {
  return this.levelMap[id];
};

LevelArbiter.prototype.getNextLevel = function(id) {
  if (!this.levelMap[id]) {
    console.warn('that level doesnt exist!!!');
    return null;
  }

  // meh, this method could be better. It's a tradeoff between
  // having the sequence structure be really simple JSON
  // and having no connectivity information between levels, which means
  // you have to build that up yourself on every query
  var level = this.levelMap[id];
  var sequenceName = level.sequenceName;
  var sequence = this.levelSequences[sequenceName];

  var nextIndex = level.index + 1;
  if (nextIndex < sequence.length) {
    return sequence[nextIndex];
  }

  var nextSequenceIndex = this.sequences.indexOf(sequenceName) + 1;
  if (nextSequenceIndex < this.sequences.length) {
    var nextSequenceName = this.sequences[nextSequenceIndex];
    return this.levelSequences[nextSequenceName][0];
  }

  // they finished the last level!
  return null;
};

exports.LevelArbiter = LevelArbiter;

