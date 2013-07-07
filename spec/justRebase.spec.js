var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;

var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var compareAnswer = function(headless, expectedJSON) {
  var expectedTree = loadTree(expectedJSON);
  var actualTree = headless.gitEngine.exportTree();

  return TreeCompare.compareTrees(expectedTree, actualTree);
};

var compareAnswerExpect = function(headless, expectedJSON) {
  var equal = compareAnswer(headless, expectedJSON);
  if (!equal) {
    var expectedTree = loadTree(expectedJSON);
    var actualTree = headless.gitEngine.exportTree();
    console.log('expected Tree', expectedTree);
    console.log('actual Tree', actualTree);
    console.log('~~~~~~~~~~~~~~~~~~~~~');
  }
  expect(equal).toBe(true);
};

var expectTree = function(command, expectedJSON) {
  var headless = new HeadlessGit();
  headless.sendCommand(command);
  compareAnswerExpect(headless, expectedJSON);
};

var expectTreeAsync = function(command, expectedJSON) {
  var headless = new HeadlessGit();
  runs(function() {
    headless.sendCommand(command);
  });
  waitsFor(function() {
    return compareAnswer(headless, expectedJSON);
  }, 'trees should be equal', 750);
};

describe('GitEngine', function() {
  it('Rebases', function() {
    expectTreeAsync(
      'gc; git checkout -b side C1; gc; git rebase master',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22master%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

});

