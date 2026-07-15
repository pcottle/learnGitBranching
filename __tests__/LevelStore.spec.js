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
    LevelActions.setLevelSolved(firstLevel.id, false);
    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(true);
    LevelActions.resetLevelsSolved();
    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(false);
  });

  it('can solve a level with best status and then reset', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var firstLevel = sequenceMap[
      Object.keys(sequenceMap)[0]
    ][0];
  
    expect(LevelStore.isLevelBest(firstLevel.id))
      .toEqual(false);
    LevelActions.setLevelSolved(firstLevel.id, true);
    expect(LevelStore.isLevelBest(firstLevel.id))
      .toEqual(true);
    LevelActions.resetLevelsSolved();
    expect(LevelStore.isLevelBest(firstLevel.id))
      .toEqual(false);
  });


  it('can export and import solved progress', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var firstLevel = sequenceMap[
      Object.keys(sequenceMap)[0]
    ][0];
    var secondLevel = sequenceMap[
      Object.keys(sequenceMap)[0]
    ][1];

    LevelActions.setLevelSolved(firstLevel.id, true);
    LevelActions.setLevelSolved(secondLevel.id, false);

    var exportedProgress = LevelStore.exportLevelProgress();
    LevelActions.resetLevelsSolved();

    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(false);
    LevelStore.importLevelProgress(exportedProgress);
    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(true);
    expect(LevelStore.isLevelBest(firstLevel.id))
      .toEqual(true);
    expect(LevelStore.isLevelSolved(secondLevel.id))
      .toEqual(true);
    expect(LevelStore.isLevelBest(secondLevel.id))
      .toEqual(false);

    LevelActions.resetLevelsSolved();
  });

  it('can import legacy solved progress', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var firstLevel = sequenceMap[
      Object.keys(sequenceMap)[0]
    ][0];

    LevelStore.importLevelProgress(JSON.stringify({
      [firstLevel.id]: true
    }));

    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(true);

    LevelActions.resetLevelsSolved();
  });
  

});
