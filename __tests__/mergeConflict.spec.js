var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

var MERGE_START = '{"branches":{"main":{"target":"C2","id":"main"},"feature":{"target":"C3","id":"feature"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"},"conflictMerges":{"feature":["app.js"]}}';
var REBASE_START = '{"branches":{"main":{"target":"C2","id":"main"},"feature":{"target":"C3","id":"feature"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"feature","id":"HEAD"},"conflictMerges":{"main":["app.js"]}}';

function load(str) {
  var headless = new HeadlessGit();
  headless.gitEngine.loadTreeFromString(str);
  return headless;
}
function tree(headless) {
  return headless.gitEngine.exportTree();
}
function lastError(headless, cmd) {
  return new Promise(function(resolve) {
    headless.sendCommand(cmd, { resolve: resolve });
  }).then(function(commands) {
    return commands[commands.length - 1].get('error').get('msg');
  });
}

describe('Merge conflicts', function() {
  it('enters a conflicted state without advancing HEAD', function() {
    var headless = load(MERGE_START);
    return headless.sendCommand('git merge feature').then(function() {
      expect(headless.gitEngine.mergeInProgress).toBeTruthy();
      expect(tree(headless).branches.main.target).toBe('C2');
      expect(headless.gitEngine.workingChanges['app.js']).toBe('unmerged');
    });
  });

  it('reports an authentic conflict message', function() {
    var headless = load(MERGE_START);
    return lastError(headless, 'git merge feature').then(function(msg) {
      expect(msg).toContain('CONFLICT');
      expect(msg).toContain('Automatic merge failed');
    });
  });

  it('refuses to commit while conflicts remain unresolved', function() {
    var headless = load(MERGE_START);
    return headless.sendCommand('git merge feature;git commit').then(function() {
      expect(tree(headless).branches.main.target).toBe('C2');
      expect(headless.gitEngine.mergeInProgress).toBeTruthy();
    });
  });

  it('git add + git merge --continue builds a two-parent merge commit', function() {
    var headless = load(MERGE_START);
    return headless.sendCommand('git merge feature;git add app.js;git merge --continue').then(function() {
      var t = tree(headless);
      var head = t.branches.main.target;
      expect(t.commits[head].parents.sort()).toEqual(['C2', 'C3']);
      expect(headless.gitEngine.mergeInProgress).toBeFalsy();
      expect(Object.keys(headless.gitEngine.workingChanges).length).toBe(0);
    });
  });

  it('git add + git commit also finishes the merge', function() {
    var headless = load(MERGE_START);
    return headless.sendCommand('git merge feature;git add app.js;git commit').then(function() {
      var t = tree(headless);
      expect(t.commits[t.branches.main.target].parents.sort()).toEqual(['C2', 'C3']);
    });
  });

  it('git merge --abort rewinds to before the merge', function() {
    var headless = load(MERGE_START);
    return headless.sendCommand('git merge feature;git merge --abort').then(function() {
      expect(tree(headless).branches.main.target).toBe('C2');
      expect(headless.gitEngine.mergeInProgress).toBeFalsy();
      expect(Object.keys(headless.gitEngine.workingChanges).length).toBe(0);
    });
  });
});

describe('Rebase conflicts', function() {
  it('git rebase + add + --continue replays the work onto the new base', function() {
    var headless = load(REBASE_START);
    return headless.sendCommand('git rebase main;git add app.js;git rebase --continue').then(function() {
      var t = tree(headless);
      var tip = t.branches.feature.target;
      expect(t.commits[tip].parents).toEqual(['C2']);
      expect(t.HEAD.target).toBe('feature');
      expect(headless.gitEngine.rebaseInProgress).toBeFalsy();
    });
  });

  it('git rebase --abort rewinds the rebase', function() {
    var headless = load(REBASE_START);
    return headless.sendCommand('git rebase main;git rebase --abort').then(function() {
      expect(tree(headless).branches.feature.target).toBe('C3');
      expect(headless.gitEngine.rebaseInProgress).toBeFalsy();
    });
  });
});
