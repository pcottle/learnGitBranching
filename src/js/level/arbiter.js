var _ = require('underscore');
var Backbone = require('backbone');

// Each level is part of a "sequence;" levels within
// a sequence proceed in order.
var levelSequences = require('../levels').levelSequences;
var sequenceInfo = require('../levels').sequenceInfo;

function LevelArbiter() {
  this.levelMap = {};
  this.init();
}

LevelArbiter.prototype.init = function() {
  var previousLevelID;
  _.each(levelSequences, function(levels, levelSequenceName) {
    // for this particular sequence...
    _.each(levels, function(level) {
      this.validateLevel(level);
      this.levelMap[level.id] = level;

      // build up the chaining between levels
      if (previousLevelID) {
        this.levelMap[previousLevelID]['nextLevelID'] = level.id;
      }
      previousLevelID = level.id;
    }, this);
  }, this);
};

LevelArbiter.prototype.validateLevel = function(level) {
  level = level || {};
  var requiredFields = [
    'id',
    'name',
    'goalTreeString',
    'solutionCommand'
  ];

  var optionalFields = [
    'hint',
    'disabledMap'
  ];

  _.each(requiredFields, function(field) {
    if (level[field] === undefined) {
      throw new Error('I need this field for a level: ' + field);
    }
  });
};

LevelArbiter.prototype.getSequences = function() {
  return _.keys(levelSequences);
};

LevelArbiter.prototype.getLevelsInSequence = function(sequenceName) {
  if (!levelSequences[sequenceName]) {
    throw new Error('that sequecne name ' + sequenceName + 'does not exist');
  }
  return levelSequences[sequenceName];
};

LevelArbiter.prototype.getSequenceInfo = function(sequenceName) {
  return sequenceInfo[sequenceName];
};

LevelArbiter.prototype.getLevel = function(id) {
  return this.levelMap[id];
};

LevelArbiter.prototype.getNextLevel = function(id) {
  if (!this.levelMap[id]) {
    throw new Error('that level doesnt exist!');
  }
  var nextID = this.levelMap[id]['nextLevelID'];
  return this.levelMap[nextID];
};

LevelArbiter.prototype.getNextLevelID = function(id) {
  return this.getNextLevel(id)['id'];
};

exports.LevelArbiter = LevelArbiter;

