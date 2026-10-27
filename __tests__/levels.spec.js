var base = require('./base');

describe('GitEngine Levels', function() {
  var branchingLevel = require('../src/levels/intro/branching').level;

  it('teaches git switch in the introductory branching lesson', function() {
    expect(branchingLevel.solutionCommand).toContain('git switch');
    expect(branchingLevel.hint.en_US).toContain('git switch');
    expect(JSON.stringify(branchingLevel.startDialog.en_US)).toContain('git switch');
    expect(JSON.stringify(branchingLevel.startDialog.en_US)).not.toContain('experimental');
  });

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
