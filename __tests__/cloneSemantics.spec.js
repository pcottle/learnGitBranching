var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/graph/treeCompare');

// A single-branch remote: C0 <- C1 (main)
var SINGLE_BRANCH_START = JSON.stringify({
  branches: { main: { target: 'C0', id: 'main' } },
  commits: { C0: { parents: [], id: 'C0', rootCommit: true } },
  HEAD: { target: 'main', id: 'HEAD' },
  originTree: {
    branches: { main: { target: 'C1', id: 'main' } },
    commits: {
      C0: { parents: [], id: 'C0', rootCommit: true },
      C1: { parents: ['C0'], id: 'C1' }
    },
    HEAD: { target: 'main', id: 'HEAD' }
  },
  clonePending: true
});

// A multi-branch remote: main, feature, and dev all pointing at different commits
var MULTI_BRANCH_ORIGIN = {
  branches: {
    main: { target: 'C1', id: 'main' },
    feature: { target: 'C2', id: 'feature' },
    dev: { target: 'C0', id: 'dev' }
  },
  commits: {
    C0: { parents: [], id: 'C0', rootCommit: true },
    C1: { parents: ['C0'], id: 'C1' },
    C2: { parents: ['C1'], id: 'C2' }
  },
  HEAD: { target: 'main', id: 'HEAD' }
};
var MULTI_BRANCH_START = JSON.stringify({
  branches: { main: { target: 'C0', id: 'main' } },
  commits: { C0: { parents: [], id: 'C0', rootCommit: true } },
  HEAD: { target: 'main', id: 'HEAD' },
  originTree: MULTI_BRANCH_ORIGIN,
  clonePending: true
});

describe('Opt-in clone semantics', function() {
  it('legacy git clone still makes a remote out of the local repo (unaffected)', function() {
    return expectTreeAsync(
      'git clone',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('opt-in clone copies the single-branch remote into the local repo', function() {
    return expectTreeAsync(
      'git clone',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}',
      SINGLE_BRANCH_START
    );
  });

  it('only clones the remote default branch locally, tracking o/main; other remote branches only get remote-tracking refs', function() {
    return expectTreeAsync(
      'git clone',
      JSON.stringify({
        branches: {
          main: { target: 'C1', id: 'main', remoteTrackingBranchID: 'o/main' },
          'o/main': { target: 'C1', id: 'o/main', remoteTrackingBranchID: null },
          'o/feature': { target: 'C2', id: 'o/feature', remoteTrackingBranchID: null },
          'o/dev': { target: 'C0', id: 'o/dev', remoteTrackingBranchID: null }
        },
        commits: {
          C0: { parents: [], id: 'C0', rootCommit: true },
          C1: { parents: ['C0'], id: 'C1' },
          C2: { parents: ['C1'], id: 'C2' }
        },
        HEAD: { target: 'main', id: 'HEAD' },
        originTree: MULTI_BRANCH_ORIGIN
      }),
      MULTI_BRANCH_START
    );
  });

  it('clears clonePending after cloning and leaves the remote untouched', function() {
    var headless = new HeadlessGit();
    headless.gitEngine.loadTreeFromString(SINGLE_BRANCH_START);

    expect(headless.gitEngine.clonePending).toBe(true);
    expect(headless.gitEngine.hasOrigin()).toBe(true);

    var originBefore = headless.gitEngine.origin.printTree();

    return headless.sendCommand('git clone').then(function() {
      expect(headless.gitEngine.clonePending).toBe(false);
      expect(headless.gitEngine.hasOrigin()).toBe(true);
      expect(headless.gitEngine.origin.printTree()).toBe(originBefore);

      // clonePending should not leak into the exported tree once cleared
      var exported = headless.gitEngine.exportTree();
      expect(exported.clonePending).toBeUndefined();
    });
  });

  it('does not crash when the origin becomes ready asynchronously, as it does in the real (non-headless) visualization', function(done) {
    // headless.js's mock fires 'gitEngineReady' synchronously, which masks a
    // real bug: in the actual browser, Visualization defers paperInitialize
    // (and therefore 'gitEngineReady') to the next tick via process.nextTick,
    // so GitEngine#makeOrigin's origin-branch-creation loop must not run
    // until that callback fires, or `this.origin` is still null when it
    // walks `this.origin.refs` for a branch whose commit isn't in our own
    // refs yet (e.g. a fresh clonePending load with a multi-branch remote).
    var headless = new HeadlessGit();
    var mockVis = headless.gitEngine.gitVisuals.getVisualization();
    var realMakeOrigin = mockVis.makeOrigin.bind(mockVis);
    mockVis.makeOrigin = function(options) {
      var result = realMakeOrigin(options);
      var realOn = result.customEvents.on.bind(result.customEvents);
      result.customEvents.on = function(key, cb, context) {
        setTimeout(function() {
          realOn(key, cb, context);
        }, 0);
      };
      return result;
    };

    // this must not throw synchronously (it used to, before this.origin was
    // guaranteed to be set before the branch-creation loop ran)
    headless.gitEngine.loadTreeFromString(MULTI_BRANCH_START);

    setTimeout(function() {
      expect(headless.gitEngine.hasOrigin()).toBe(true);
      expect(headless.gitEngine.doesRefExist('o/main')).toBe(true);
      expect(headless.gitEngine.doesRefExist('o/feature')).toBe(true);
      expect(headless.gitEngine.doesRefExist('o/dev')).toBe(true);
      done();
    }, 10);
  });

  it('supports resetting back to a clonePending snapshot and re-cloning', function() {
    var headless = new HeadlessGit();
    headless.gitEngine.loadTreeFromString(SINGLE_BRANCH_START);

    return headless.sendCommand('git clone').then(function() {
      expect(headless.gitEngine.clonePending).toBe(false);

      // simulate a level reset: reload the original (still clonePending) startTree
      headless.gitEngine.loadTreeFromString(SINGLE_BRANCH_START);
      expect(headless.gitEngine.clonePending).toBe(true);
      expect(headless.gitEngine.hasOrigin()).toBe(true);

      return headless.sendCommand('git clone').then(function() {
        expect(headless.gitEngine.clonePending).toBe(false);
        var actualTree = headless.gitEngine.printTree();
        expect(TreeCompare.compareTrees(
          actualTree,
          '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
        )).toBe(true);
      });
    });
  });
});
