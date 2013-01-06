var _ = require('underscore');
var Backbone = require('backbone');

// Each level is part of a "sequence;" levels within
// a sequence proceed in order.

var levelSequences = {
  intro: [
    require('../../levels/intro/1'),
    require('../../levels/intro/2')
  ],
  rebase: [
    require('../../levels/rebase/1'),
    require('../../levels/rebase/2')
  ]
};

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
    'goalTree',
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
  })
};

exports.LevelArbiter = LevelArbiter;

