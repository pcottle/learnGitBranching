var LevelActions = require('../src/js/actions/LevelActions');
var LevelStore = require('../src/js/stores/LevelStore');
var extractLevel = require('../src/js/level/levelModule').extractLevel;
var requireLevel = require('../src/js/level/levelModule').requireLevel;

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

  it('clears all certificate state when solved progress is reset', function() {
    LevelStore.markCertificateSeen();
    LevelStore.setCertificateName('Previous Learner');

    expect(LevelStore.hasSeenCertificate()).toBe(true);
    expect(LevelStore.getCertificateName()).toBe('Previous Learner');

    LevelActions.resetLevelsSolved();

    expect(LevelStore.hasSeenCertificate()).toBe(false);
    expect(LevelStore.getCertificateName()).toBe('');
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

  it('reports completion only after every level is solved', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var levelIDs = [];
    Object.keys(sequenceMap).forEach(function(sequenceName) {
      sequenceMap[sequenceName].forEach(function(level) {
        levelIDs.push(level.id);
      });
    });

    LevelActions.resetLevelsSolved();
    expect(LevelStore.getTotalLevelCount()).toBe(levelIDs.length);
    expect(LevelStore.areAllLevelsSolved()).toBe(false);

    levelIDs.forEach(function(levelID) {
      LevelActions.setLevelSolved(levelID, false);
    });
    expect(LevelStore.getSolvedLevelCount()).toBe(levelIDs.length);
    expect(LevelStore.areAllLevelsSolved()).toBe(true);

    LevelActions.resetLevelsSolved();
  });

  it('returns the next level stub without loading its definition', function() {
    var next = LevelStore.getNextLevel('intro1');
    expect(next.id).toEqual('intro2');
    expect(next.startDialog).toBeUndefined();
  });

  it('lazily loads a full level definition on demand', function(done) {
    var stub = LevelStore.getLevel('intro1');
    expect(stub.startDialog).toBeUndefined();

    LevelStore.loadLevel('intro1').then(function(loaded) {
      expect(loaded).toBe(stub); // merged in place
      expect(loaded.startDialog).toBeDefined();
      expect(loaded.goalTreeString).toBeDefined();
      return LevelStore.loadLevel('intro1'); // already-loaded path
    }).then(function(again) {
      expect(again).toBe(stub);
      // Explicit loads warm exactly one level ahead. Give the fire-and-forget
      // import a turn to settle before checking its in-place metadata object.
      return new Promise(function(resolve) { setTimeout(resolve, 0); });
    }).then(function() {
      expect(LevelStore.getLevel('intro2').startDialog).toBeDefined();
      expect(LevelStore.getLevel('intro3').startDialog).toBeUndefined();
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });

  it('resolves null for an unknown level id', function(done) {
    LevelStore.loadLevel('does-not-exist').then(function(level) {
      expect(level).toBe(null);
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });

  it('prefetches a level definition', function(done) {
    LevelStore.prefetchLevel('rampup1').then(function(level) {
      expect(level).toBe(LevelStore.getLevel('rampup1'));
      expect(level.goalTreeString).toBeDefined();
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });

});

describe('level module interop', function() {
  var level = { name: { en_US: 'A level' } };

  it('unwraps the supported level definition shapes', function() {
    expect(extractLevel({ level: level })).toBe(level);
    expect(extractLevel({ default: { level: level } })).toBe(level);
  });

  it('returns null for unsupported or missing exports', function() {
    expect(extractLevel({ default: level })).toBe(null);
    expect(extractLevel({})).toBe(null);
    expect(extractLevel(null)).toBe(null);
  });

  it('requireLevel throws when a module has no level export', function() {
    expect(function() {
      requireLevel({}, 'intro1');
    }).toThrowError(/did not export a level/);
    expect(requireLevel({ level: level }, 'intro1')).toBe(level);
  });
});
