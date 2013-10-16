var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var compareLevelTree = function(headless, levelBlob) {
  var actualTree = headless.gitEngine.exportTree();
  return TreeCompare.dispatchFromLevel(levelBlob, actualTree);
};

var compareAnswer = function(headless, expectedJSON) {
  var expectedTree = loadTree(expectedJSON);
  var actualTree = headless.gitEngine.exportTree();

  return TreeCompare.compareTrees(expectedTree, actualTree);
};

var expectLevelAsync = function(headless, levelBlob) {
  var command = levelBlob.solutionCommand;
  if (command.indexOf('git rebase -i') !== -1) {
    // dont do interactive rebase levels
    return;
  }

  var start;
  runs(function() {
    start = Date.now();
    headless.sendCommand(command);
  });
  waitsFor(function() {
    var diff = (Date.now() - start);
    if (diff > TIME - 10) {
      console.log('not going to match', command);
    }
    var result = compareLevelTree(headless, levelBlob);
    if (result) {
      console.log('solved level ' + levelBlob.name.en_US);
    }
    return result;
  }, 'trees should be equal', TIME);
};

var expectTreeAsync = function(command, expectedJSON) {
  var headless = new HeadlessGit();
  var start = Date.now();
  var haveReported = false;

  runs(function() {
    headless.sendCommand(command);
  });
  waitsFor(function() {
    var diff = (Date.now() - start);
    if (diff > TIME - 20 && !haveReported) {
      haveReported = true;
      console.log('not going to match', command);
      console.log('expected\n>>>>>>>>\n', loadTree(expectedJSON));
      console.log('\n<<<<<<<<<<<\nactual', headless.gitEngine.exportTree());
      console.log('\n<<<<ORIGIN>>>>>\n');
      console.log(loadTree(expectedJSON).originTree, '\n==========\n', headless.gitEngine.exportTree().originTree);
    }
    return compareAnswer(headless, expectedJSON);
  }, 'trees should be equal', 100);
};

var expectLevelSolved = function(levelBlob) {
  var headless = new HeadlessGit();
  if (levelBlob.startTree) {
    headless.gitEngine.loadTreeFromString(levelBlob.startTree);
  }
  expectLevelAsync(headless, levelBlob);
};

var TIME = 150;
// useful for throwing garbage and then expecting one commit
var ONE_COMMIT_TREE = '{"branches":{"master":{"target":"C2","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}';

module.exports = {
  loadTree: loadTree,
  compareAnswer: compareAnswer,
  TIME: TIME,
  expectTreeAsync: expectTreeAsync,
  expectLevelSolved: expectLevelSolved,
  ONE_COMMIT_TREE: ONE_COMMIT_TREE
};

