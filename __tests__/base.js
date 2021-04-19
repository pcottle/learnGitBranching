var Q = require('q');

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
    // don't do interactive rebase levels
    return;
  }

  return headless.sendCommand(command).then(function() {
    expect(compareLevelTree(headless, levelBlob)).toBeTruthy(
      'Level "' + levelBlob['name']['en_US'] + '" should get solved'
    );
  });
};

var expectTreeAsync = function(command, expectedJSON, startJSON) {
  var headless = new HeadlessGit();

  if (startJSON) {
    headless.gitEngine.loadTreeFromString(startJSON);
  }

  return headless.sendCommand(command).then(function() {
    expect(compareAnswer(headless, expectedJSON)).toBeTruthy();
  });
};

var expectLevelSolved = function(levelBlob) {
  var headless = new HeadlessGit();
  if (levelBlob.startTree) {
    headless.gitEngine.loadTreeFromString(levelBlob.startTree);
  }
  expectLevelAsync(headless, levelBlob);
};

var runCommand = function(command, resultHandler) {
  var headless = new HeadlessGit();
  var deferred = Q.defer();
  var msg = null;

  return headless.sendCommand(command, deferred).then(function() {
    return deferred.promise.then(function(commands) {
      msg = commands[commands.length - 1].get('error').get('msg');
      resultHandler(msg);
    });
  });
};

var TIME = 150;
// useful for throwing garbage and then expecting one commit
var ONE_COMMIT_TREE = '{"branches":{"main":{"target":"C2","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}';

module.exports = {
  loadTree: loadTree,
  compareAnswer: compareAnswer,
  TIME: TIME,
  expectTreeAsync: expectTreeAsync,
  expectLevelSolved: expectLevelSolved,
  ONE_COMMIT_TREE: ONE_COMMIT_TREE,
  runCommand: runCommand
};
