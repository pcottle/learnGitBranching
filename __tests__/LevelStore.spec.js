var LevelActions = require('../src/js/actions/LevelActions');
var LevelStore = require('../src/js/stores/LevelStore');

describe('this store', function() {

  it('has sequences and levels', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    Object.keys(sequenceMap).forEach(function(levelSequence) {
      expect(LevelStore.getSequences().indexOf(levelSequence) >= 0)
        .toEqual(true);

      sequenceMap[levelSequence].forEach(function(level) {
        expect(LevelStore.getLevel(level.id)).toEqual(level);
      }.bind(this));
    }.bind(this));
  });

  it('can solve a level and then reset', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var firstLevel = sequenceMap[
      Object.keys(sequenceMap)[0]
    ][0];

    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(false);
    LevelActions.setLevelSolved(firstLevel.id);
    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(true);
    LevelActions.resetLevelsSolved();
    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(false);
  });

});
