var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

// Regression tests for the undo/reset parent-order bug (issues #613, #1298).
//
// undo/reset snapshot the live tree to a string and later reload it. That
// snapshot must preserve each merge commit's real parent order, otherwise the
// tree comes back mirrored and `git checkout HEAD^` walks to the wrong parent.
//
// The sequence below builds a merge commit C5 whose real parents are
// ['C4', 'C3'] (first parent = main's C4, second = the merged side's C3), i.e.
// deliberately NOT alphabetical.
var MERGE_SETUP =
  'git commit; git checkout -b side; git commit; ' +
  'git checkout main; git commit; git merge side';

describe('undo/reset serialization', function() {
  it('exportTreeString preserves merge parent order across a reload', function() {
    var live = new HeadlessGit();
    return live.sendCommand(MERGE_SETUP).then(function() {
      // sanity: the live merge commit has non-alphabetical parents
      expect(live.gitEngine.exportTree().commits.C5.parents).toEqual(['C4', 'C3']);

      // the faithful snapshot (what undo now stores) round-trips unchanged
      var snapshot = live.gitEngine.exportTreeString();
      var reloaded = new HeadlessGit();
      reloaded.gitEngine.loadTreeFromString(snapshot);
      expect(reloaded.gitEngine.exportTree().commits.C5.parents).toEqual(['C4', 'C3']);
    });
  });

  it('printTree still sorts parents (needed for order-independent goal matching)', function() {
    var live = new HeadlessGit();
    return live.sendCommand(MERGE_SETUP).then(function() {
      // printTree runs reduceTreeFields, which sorts parents. That is correct
      // for goal comparison but was the source of the undo bug when reused for
      // state snapshots.
      var sorted = JSON.parse(unescape(live.gitEngine.printTree()));
      expect(sorted.commits.C5.parents).toEqual(['C3', 'C4']);
    });
  });

  it('HEAD^ resolves to the true first parent after a reload', function() {
    var live = new HeadlessGit();
    return live.sendCommand(MERGE_SETUP).then(function() {
      var reloaded = new HeadlessGit();
      reloaded.gitEngine.loadTreeFromString(live.gitEngine.exportTreeString());
      return reloaded.sendCommand('git checkout HEAD^').then(function() {
        // first parent of the merge is main's C4, so HEAD^ must land on C4
        expect(reloaded.gitEngine.exportTree().HEAD.target).toBe('C4');
      });
    });
  });
});
