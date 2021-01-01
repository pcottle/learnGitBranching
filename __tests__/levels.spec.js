var base = require('./base');

describe('GitEngine Levels', function() {
  var sequences = require('../src/levels/index').levelSequences;
  Object.keys(sequences).forEach(function(sequenceKey) {
    var levels = sequences[sequenceKey];
    Object.keys(levels).forEach(function(index) {
      var levelBlob = levels[index];
      it('solves level ' + levelBlob['name']['en_US'] + ' in sequence ' + sequenceKey, function() {
        base.expectLevelSolved(levelBlob);
      });
    }.bind(this));
  });
});
