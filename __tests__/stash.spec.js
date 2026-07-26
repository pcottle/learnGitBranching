var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var base = require('./base');
var runCommand = base.runCommand;

var STASH_START = '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"feature.js":"modified"}}';

function loadStash() {
  var headless = new HeadlessGit();
  headless.gitEngine.loadTreeFromString(STASH_START);
  return headless;
}

describe('git stash', function() {
  it('shelves working changes and cleans the working directory', function() {
    var headless = loadStash();
    return headless.sendCommand('git stash').then(function() {
      expect(Object.keys(headless.gitEngine.workingChanges).length).toBe(0);
      expect(headless.gitEngine.stashStack.length).toBe(1);
    });
  });

  it('git stash pop restores the shelved changes', function() {
    var headless = loadStash();
    return headless.sendCommand('git stash;git stash pop').then(function() {
      expect(headless.gitEngine.workingChanges['feature.js']).toBe('modified');
      expect(headless.gitEngine.stashStack.length).toBe(0);
    });
  });

  it('moves work from main onto a new feature branch', function() {
    var headless = loadStash();
    return headless.sendCommand('git stash;git switch -c feature;git stash pop;git add .;git commit').then(function() {
      var tree = headless.gitEngine.exportTree();
      expect(tree.branches.main.target).toBe('C1');
      expect(tree.branches.feature.target).toBe('C2');
      expect(tree.HEAD.target).toBe('feature');
    });
  });

  it('git stash pop on an empty stash reports no entries', function() {
    return runCommand('git stash pop', function(msg) {
      expect(msg).toContain('No stash entries');
    });
  });

  it('git stash with no local changes reports nothing to save', function() {
    return runCommand('git stash', function(msg) {
      expect(msg).toContain('No local changes');
    });
  });

  it('survives an export / reload round-trip so it is undoable', function() {
    var headless = loadStash();
    return headless.sendCommand('git stash').then(function() {
      var treeString = headless.gitEngine.printTree();
      var reloaded = new HeadlessGit();
      reloaded.gitEngine.loadTreeFromString(treeString);
      expect(reloaded.gitEngine.stashStack.length).toBe(1);
      expect(reloaded.gitEngine.changesModelEngaged).toBe(true);
    });
  });
});
