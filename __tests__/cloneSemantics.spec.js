var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/graph/treeCompare');
var intl = require('../src/js/intl');

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

// A remote whose default branch is NOT "main" -- proves the clone default is
// read generically from originTree.HEAD.target rather than hardcoded to main.
var NON_MAIN_DEFAULT_ORIGIN = {
  branches: {
    trunk: { target: 'C1', id: 'trunk' },
    feature: { target: 'C2', id: 'feature' }
  },
  commits: {
    C0: { parents: [], id: 'C0', rootCommit: true },
    C1: { parents: ['C0'], id: 'C1' },
    C2: { parents: ['C1'], id: 'C2' }
  },
  HEAD: { target: 'trunk', id: 'HEAD' }
};
var NON_MAIN_DEFAULT_START = JSON.stringify({
  // the local placeholder's own branch name is irrelevant pre-clone (it's
  // hidden and gets discarded), so deliberately keep it "main" to prove
  // cloneFromOrigin doesn't just recycle whatever the placeholder was named
  branches: { main: { target: 'C0', id: 'main' } },
  commits: { C0: { parents: [], id: 'C0', rootCommit: true } },
  HEAD: { target: 'main', id: 'HEAD' },
  originTree: NON_MAIN_DEFAULT_ORIGIN,
  clonePending: true
});

describe('Opt-in clone semantics', function() {
  it('git fakeCreateRemote makes a remote out of the local repo', function() {
    return expectTreeAsync(
      'git fakeCreateRemote',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('rejects git clone without a pending remote and leaves the tree unchanged', function() {
    var headless = new HeadlessGit();
    var beforeClone = headless.gitEngine.exportTreeString();

    return new Promise(function(resolve) {
      headless.sendCommand('git clone', { resolve: resolve });
    }).then(function(commands) {
      var error = commands[commands.length - 1].get('error');
      // compare via intl.str so the assertion holds regardless of what
      // locale earlier specs left the LocaleStore in
      expect(error.get('msg')).toBe(
        intl.str('git-error-clone-no-pending-remote')
      );
      expect(headless.gitEngine.exportTreeString()).toBe(beforeClone);
    });
  });

  it('rejects a second git clone with an "already cloned" error, not the fakeCreateRemote hint', function() {
    var headless = new HeadlessGit();
    headless.gitEngine.loadTreeFromString(SINGLE_BRANCH_START);

    return headless.sendCommand('git clone').then(function() {
      expect(headless.gitEngine.clonePending).toBe(false);
      var afterClone = headless.gitEngine.exportTreeString();

      return new Promise(function(resolve) {
        headless.sendCommand('git clone', { resolve: resolve });
      }).then(function(commands) {
        var error = commands[commands.length - 1].get('error');
        expect(error.get('msg')).toBe(
          intl.str('git-error-clone-already-cloned')
        );
        expect(headless.gitEngine.exportTreeString()).toBe(afterClone);
      });
    });
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

  it('clones a non-main default branch generically (trunk, not main)', function() {
    // proves the clone default comes from originTree.HEAD.target, not a
    // hardcoded "main" -- and that no local "main" or "feature" branch is
    // created just because the placeholder happened to be named "main"
    return expectTreeAsync(
      'git clone',
      JSON.stringify({
        branches: {
          trunk: { target: 'C1', id: 'trunk', remoteTrackingBranchID: 'o/trunk' },
          'o/trunk': { target: 'C1', id: 'o/trunk', remoteTrackingBranchID: null },
          'o/feature': { target: 'C2', id: 'o/feature', remoteTrackingBranchID: null }
        },
        commits: {
          C0: { parents: [], id: 'C0', rootCommit: true },
          C1: { parents: ['C0'], id: 'C1' },
          C2: { parents: ['C1'], id: 'C2' }
        },
        HEAD: { target: 'trunk', id: 'HEAD' },
        originTree: NON_MAIN_DEFAULT_ORIGIN
      }),
      NON_MAIN_DEFAULT_START
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

  it('does not crash when the origin becomes ready asynchronously, as it does in the real (non-headless) visualization', function() {
    // headless.js's mock fires 'gitEngineReady' synchronously, which masks a
    // real bug: in the actual browser, Visualization defers paperInitialize
    // (and therefore 'gitEngineReady') to the next tick via process.nextTick,
    // so GitEngine#makeOrigin's origin-branch-creation loop must not run
    // until that callback fires, or `this.origin` is still null when it
    // walks `this.origin.refs` for a branch whose commit isn't in our own
    // refs yet (e.g. a fresh clonePending load with a multi-branch remote).
    //
    // Deferred via a microtask (Promise.resolve().then), not a timer, so the
    // test can await the exact same promise that fulfills the deferral --
    // no fixed delay to guess at or race against.
    var headless = new HeadlessGit();
    var mockVis = headless.gitEngine.gitVisuals.getVisualization();
    var realMakeOrigin = mockVis.makeOrigin.bind(mockVis);
    var readyDeferred;
    var readyPromise = new Promise(function(resolve) { readyDeferred = resolve; });

    mockVis.makeOrigin = function(options) {
      var result = realMakeOrigin(options);
      var realOn = result.customEvents.on.bind(result.customEvents);
      result.customEvents.on = function(key, cb, context) {
        Promise.resolve().then(function() {
          realOn(key, cb, context);
          readyDeferred();
        });
      };
      return result;
    };

    // this must not throw synchronously (it used to, before this.origin was
    // guaranteed to be set before the branch-creation loop ran)
    headless.gitEngine.loadTreeFromString(MULTI_BRANCH_START);

    return readyPromise.then(function() {
      expect(headless.gitEngine.hasOrigin()).toBe(true);
      expect(headless.gitEngine.doesRefExist('o/main')).toBe(true);
      expect(headless.gitEngine.doesRefExist('o/feature')).toBe(true);
      expect(headless.gitEngine.doesRefExist('o/dev')).toBe(true);
    });
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

  // Sandbox#undo and Level#undo both work by snapshotting
  // gitEngine.exportTreeString() right before a command dispatches
  // (beforeCommandCB), then restoring it via gitEngine.loadTreeFromString()
  // if the user undoes (see sandbox/index.js and level/index.js). That
  // restore is exactly what Visualization#reset(toRestore) does under the
  // hood. Driving the *actual* Sandbox/Level "undo" instant command would
  // require a live DOM + jQuery + a constructed Sandbox/Level (headless.js
  // deliberately mocks all of that away for pure GitEngine tests, and no
  // existing test in this suite instantiates a real Sandbox/Level either),
  // which is well outside a targeted clone-semantics follow-up. So this
  // test reproduces the exact snapshot/restore mechanics undo relies on --
  // the same approach __tests__/undoParentOrder.spec.js already uses for
  // the merge-parent-order undo bug -- rather than the reset()-of-a-static-
  // constant shortcut the test above takes.
  it('git clone; undo; git clone -- restores the exact pre-clone snapshot and clones again cleanly', function() {
    var headless = new HeadlessGit();
    headless.gitEngine.loadTreeFromString(SINGLE_BRANCH_START);

    // exactly what beforeCommandCB captures right before "git clone" dispatches
    var beforeClone = headless.gitEngine.exportTreeString();

    return headless.sendCommand('git clone').then(function() {
      expect(headless.gitEngine.clonePending).toBe(false);

      // "undo": restore the pre-clone snapshot, exactly like Sandbox#undo /
      // Level#undo do via mainVis.reset(toRestore) -> loadTreeFromString
      headless.gitEngine.loadTreeFromString(beforeClone);

      expect(headless.gitEngine.clonePending).toBe(true);
      expect(headless.gitEngine.hasOrigin()).toBe(true);
      // the restored local placeholder is the exact pre-clone state, not
      // just "clonePending happens to be true again"
      expect(TreeCompare.compareTrees(
        headless.gitEngine.printTree(),
        beforeClone
      )).toBe(true);

      // cloning again after undo must succeed the same way
      return headless.sendCommand('git clone').then(function() {
        expect(headless.gitEngine.clonePending).toBe(false);
        expect(TreeCompare.compareTrees(
          headless.gitEngine.printTree(),
          '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
        )).toBe(true);
      });
    });
  });
});
