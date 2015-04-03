var _ = require('underscore');
var base = require('./base');

describe('GitEngine Levels', function() {
  it('solves levels', function() {
    var sequences = require('../../levels/index').levelSequences;
    _.each(Object.keys(sequences), function(sequenceKey) {
      var levels = sequences[sequenceKey];
      _.each(levels, function(levelBlob, index) {
        console.log('testing level', levelBlob.name.en_US);
        base.expectLevelSolved(levelBlob);
      });
    });
  });
});

