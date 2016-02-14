var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/graph/treeCompare.js');

var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var compareLevelTree = function(headless, levelBlob) {
  var actualTree = headless.gitEngine.printTree();
  return TreeCompare.dispatchFromLevel(levelBlob, actualTree);
};

var compareAnswer = function(headless, expectedJSON) {
  var expectedTree = loadTree(expectedJSON);
  var actualTree = headless.gitEngine.exportTree();

  return TreeCompare.compareTrees(expectedTree, actualTree);
};

var getHeadlessSummary = function(headless) {
  var tree = headless.gitEngine.exportTree();
  TreeCompare.reduceTreeFields([tree]);
  return tree;
};

var expectLevelAsync = function(headless, levelBlob) {
  var command = levelBlob.solutionCommand;
  if (command.indexOf('git rebase -i') !== -1) {
    // dont do interactive rebase levels
    return;
  }

  var hasWarned = false;
  var start;
  runs(function() {
    start = Date.now();
    headless.sendCommand(command);
  });
  waitsFor(function() {
    var diff = (Date.now() - start);
    if (diff > TIME - 10 && !hasWarned) {
      hasWarned = true;
      console.log('this goal tree', loadTree(levelBlob.goalTreeString));
      console.log('not going to match with command', command);
      console.log(getHeadlessSummary(headless));
    }
    var result = compareLevelTree(headless, levelBlob);
    if (result) {
      console.log('solved level ' + levelBlob.name.en_US);
    }
    return result;
  }, 'trees should be equal', TIME);
};

var expectTreeAsync = function(command, expectedJSON, startJSON) {
  var headless = new HeadlessGit();
  var start = Date.now();
  var haveReported = false;

  if (startJSON) {
    headless.gitEngine.loadTreeFromString(startJSON);
  }

  runs(function() {
    headless.sendCommand(command);
  });
  waitsFor(function() {
    var diff = (Date.now() - start);
    if (diff > TIME - 40 && !haveReported) {
      haveReported = true;
      var expected = loadTree(expectedJSON);
      console.log('not going to match', command);
      console.log('expected\n>>>>>>>>\n', expected);
      console.log('\n<<<<<<<<<<<\nactual', getHeadlessSummary(headless));
      console.log('\n<<<<ORIGIN>>>>>\n');
      if (expected.originTree) {
        console.log('expected origin tree:');
        console.log(expected.originTree);
        console.log('\n=========\n');
        console.log('actual origin tree');
        console.log(getHeadlessSummary(headless).originTree);
      }
      console.log(expectedJSON);
      console.log(JSON.stringify(getHeadlessSummary(headless)));
    }
    return compareAnswer(headless, expectedJSON);
  }, 'trees should be equal', 500);
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

