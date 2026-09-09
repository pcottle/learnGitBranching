var undoBookkeeping = require('../src/js/level/undoBookkeeping');

// Regression test for issue #1298 ("Undo Bug in Juggling Commits #1"): after
// a few undo/redo cycles, commits went missing and further undos couldn't
// bring them back.
//
// Level (src/js/level/index.js) keeps two arrays in lockstep: undoStack
// (tree snapshots to restore) and gitCommandsIssued (command strings, used
// for the git-golf command count and level-completion tracking). The actual
// bug lived in that class's undo()/afterCommandCB(), but that file also
// requires a .jsx React view, which this test runner can't transpile -- so
// the lockstep logic was pulled into its own plain module
// (level/undoBookkeeping.js) that Level now delegates to. This tests that
// module directly.
function issueCommand(state, rawStr, newTree, counts) {
  var treeBefore = state.tree;
  if (newTree !== undefined) {
    state.tree = newTree;
  }
  undoBookkeeping.recordCommand({
    gitCommandsIssued: state.gitCommandsIssued,
    undoStack: state.undoStack,
    treeBefore: treeBefore,
    treeAfter: state.tree,
    rawStr: rawStr,
    counts: counts === undefined ? true : counts
  });
}

function undo(state) {
  if (undoBookkeeping.shouldPopIssuedCommand(state.undoStack)) {
    state.gitCommandsIssued.pop();
  }
  var toRestore = state.undoStack.pop();
  if (toRestore !== undefined) {
    state.tree = toRestore;
  }
}

function makeState() {
  return { tree: 'TREE_0', gitCommandsIssued: [], undoStack: [] };
}

describe('Level undo bookkeeping (issue #1298)', function() {
  it('does not push undo state for a command that left the tree unchanged', function() {
    var state = makeState();

    // a command that "counts" by name (e.g. an interactive rebase the user
    // cancelled) but doesn't actually change the tree
    issueCommand(state, 'git rebase -i HEAD~2' /* no newTree: unchanged */);

    expect(state.gitCommandsIssued.length).toBe(0);
    expect(state.undoStack.length).toBe(0);
  });

  it('keeps gitCommandsIssued and undoStack in lockstep across undo', function() {
    var state = makeState();

    issueCommand(state, 'git commit', 'TREE_1');
    issueCommand(state, 'git commit', 'TREE_2');
    expect(state.gitCommandsIssued.length).toBe(2);
    expect(state.undoStack.length).toBe(2);

    undo(state);
    expect(state.gitCommandsIssued.length).toBe(1);
    expect(state.undoStack.length).toBe(1);
    expect(state.tree).toBe('TREE_1');

    undo(state);
    expect(state.gitCommandsIssued.length).toBe(0);
    expect(state.undoStack.length).toBe(0);
    expect(state.tree).toBe('TREE_0');
  });

  it('does not drop a gitCommandsIssued entry when undo is called with nothing left to undo', function() {
    var state = makeState();

    issueCommand(state, 'git commit', 'TREE_1');
    undo(state);
    expect(state.gitCommandsIssued.length).toBe(0);

    // undoStack is now empty; calling undo again must be a safe no-op
    undo(state);
    expect(state.gitCommandsIssued.length).toBe(0);
    expect(state.tree).toBe('TREE_0');
  });

  it('never lets gitCommandsIssued outrun the real number of undoable states', function() {
    // the scenario that actually bites: commands that count towards the
    // total without changing the tree (cancelled/no-op interactive rebases)
    // interleaved with real changes and undos -- "a couple of wrong
    // commands, undo, then the real ones" in practice
    var state = makeState();

    issueCommand(state, 'git rebase -i HEAD~2' /* cancelled: no tree change */);
    issueCommand(state, 'git commit', 'TREE_1');
    issueCommand(state, 'git rebase -i HEAD~2' /* cancelled again */);
    issueCommand(state, 'git commit --amend', 'TREE_2');

    expect(state.gitCommandsIssued.length).toBe(state.undoStack.length);

    undo(state);
    undo(state);
    expect(state.gitCommandsIssued.length).toBe(state.undoStack.length);
    expect(state.tree).toBe('TREE_0');
  });
});
