// Level's undo bookkeeping, pulled out of level/index.js so it can be unit
// tested without pulling in the React view files that class also imports
// (level/index.js requires a .jsx view, which the plain jasmine test runner
// can't transpile -- see levelUndoBookkeeping.spec.js).
//
// Level tracks two parallel arrays that must stay in lockstep:
//   - undoStack: tree snapshots to restore, one per undoable command
//   - gitCommandsIssued: the raw command strings, used for the git-golf
//     command count and level-completion tracking
//
// Regression fix for issue #1298 ("Undo Bug in Juggling Commits #1"): both
// bugs below let the two arrays drift apart, which is what made commits
// "disappear" and stay gone even after undoing everything.

// Only push undo state for a command that both counts towards the total AND
// actually changed the tree. Previously this pushed unconditionally for any
// counted command, so a command that counted but left the tree unchanged
// (e.g. a cancelled/no-op interactive rebase) still pushed a real undo entry
// pointing at a tree identical to the one already there.
function recordCommand({ gitCommandsIssued, undoStack, treeBefore, treeAfter, rawStr, counts }) {
  if (!counts) {
    return;
  }
  if (treeBefore === treeAfter) {
    return;
  }
  gitCommandsIssued.push(rawStr);
  undoStack.push(treeBefore);
}

// Sandbox.undo() (the base class) already pops undoStack itself and
// restores the tree, or errors out harmlessly if undoStack is empty. This
// only decides whether gitCommandsIssued should ALSO lose an entry.
// Previously gitCommandsIssued.pop() ran unconditionally in Level.undo(), so
// calling undo with an empty undoStack (nothing left to restore) still
// silently discarded an entry from gitCommandsIssued -- desyncing the two
// arrays' lengths from then on.
function shouldPopIssuedCommand(undoStack) {
  return undoStack.length > 0;
}

exports.recordCommand = recordCommand;
exports.shouldPopIssuedCommand = shouldPopIssuedCommand;
