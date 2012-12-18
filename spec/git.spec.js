var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;
var treeCompare = new TreeCompare();

var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var compareAnswer = function(headless, expectedJSON) {
  var expectedTree = loadTree(expectedJSON);
  var actualTree = headless.gitEngine.exportTree()

  var equal = treeCompare.compareTrees(expectedTree, actualTree);
  expect(equal).toBe(true);
};

var expectCommandToProduceTree = function(command, expectedJSON) {
  var headless = new HeadlessGit();
  headless.sendCommand(command);
  compareAnswer(headless, expectedJSON);
};

describe('GitEngine', function() {
  it('Should commit off of head', function() {

    expectCommandToProduceTree(
      'git commit',
      '{"branches":{"master":{"target":"C2","id":"master","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"id":"C1"},"C2":{"type":"commit","parents":["C1"],"id":"C2"}},"HEAD":{"id":"HEAD","target":"master","type":"general ref"}}'
    );
  });
});
