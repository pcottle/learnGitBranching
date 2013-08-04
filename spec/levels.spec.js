var _ = require('underscore');
var base = require('./base');

describe('GitEngine Levels', function() {
  it('solves levels', function() {
    var sequences = require('../src/levels/index').levelSequences;
    _.each(Object.keys(sequences), function(sequenceKey) {
      var levels = sequences[sequenceKey];
      _.each(levels, function(levelBlob) {
        base.expectLevelSolved(levelBlob);
      });
    });
  });
});

