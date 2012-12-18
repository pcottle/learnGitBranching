var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;
var treeCompare = new TreeCompare();

var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var compareAnswer = function(headless, expectedJSON) {
  var expectedTree = loadTree(expectedJSON);
  var actualTree = headless.gitEngine.exportTree();

  var equal = treeCompare.compareTrees(expectedTree, actualTree);
  expect(equal).toBe(true);
};

var expectTree = function(command, expectedJSON) {
  var headless = new HeadlessGit();
  headless.sendCommand(command);
  compareAnswer(headless, expectedJSON);
};

describe('GitEngine', function() {
  it('Commits', function() {
    expectTree(
      'git commit',
      '{"branches":{"master":{"target":"C2","id":"master","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"id":"C1"},"C2":{"type":"commit","parents":["C1"],"id":"C2"}},"HEAD":{"id":"HEAD","target":"master","type":"general ref"}}'
    );
  });

  it('Checkouts', function() {
    expectTree(
      'git checkout -b side',
      '{"branches":{"master":{"target":"C1","id":"master"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  it('Rebases', function() {
    expectTree(
      'gc; git checkout -b side C1; gc; git rebase master',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22master%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Reverts', function() {
    expectTree(
      'git revert HEAD',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%27%22%2C%22id%22%3A%22master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C1%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Merges', function() {
    expectTree(
      'gc; git checkout -b side C1; gc; git merge master',
      '{"branches":{"master":{"target":"C2","id":"master"},"side":{"target":"C4","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  it('Resets', function() {
    expectTree(
      'git commit; git reset HEAD~1',
      '{"branches":{"master":{"target":"C1","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}'
    );
  });

  it('Branches', function() {
    expectTree(
      'git branch side C0',
      '{"branches":{"master":{"target":"C1","id":"master"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}'
    );
  });

  it('Deletes branches', function() {
    expectTree(
      'git branch side; git branch -d side',
      '{"branches":{"master":{"target":"C1","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}'
    );
  });

  it('Ammends commits', function() {
    expectTree(
      'git commit --amend',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%27%22%2C%22id%22%3A%22master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Cherry picks', function() {
    expectTree(
      'git checkout -b side C0; gc; git cherry-pick C1',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C1%27%22%2C%22id%22%3A%22side%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C1%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Forces branches', function() {
    expectTree(
      'git checkout -b side; git branch -f side C0',
      '{"branches":{"master":{"target":"C1","id":"master"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  it('Rebases only new commits to destination', function() {
    expectTree(
      'git checkout -b side C0; gc; gc;git cherry-pick C1;git rebase master',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C1%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

});

