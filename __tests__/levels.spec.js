var base = require('./base');

describe('GitEngine Levels', function() {
  it('solves levels', function() {
    var sequences = require('../src/levels/index').levelSequences;
    Object.keys(sequences).forEach(function(sequenceKey) {
      var levels = sequences[sequenceKey];
      Object.keys(levels).forEach(function(index) {
        var levelBlob = levels[index];
        console.log('testing level', levelBlob.name.en_US);
        base.expectLevelSolved(levelBlob);
      }.bind(this));
    });
  });
});

