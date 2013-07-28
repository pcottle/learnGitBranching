var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;

var _ = require('underscore');
var TIME = 150;

var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var compareLevelTree = function(headless, levelBlob) {
  var actualTree = headless.gitEngine.exportTree();
  return TreeCompare.dispatchFromLevel(levelBlob, actualTree);
};

var expectTreeAsync = function(headless, levelBlob) {
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

var expectLevelSolved = function(levelBlob) {
  var headless = new HeadlessGit();
  if (levelBlob.startTree) {
    headless.gitEngine.loadTreeFromString(levelBlob.startTree);
  }
  expectTreeAsync(headless, levelBlob);
};

describe('GitEngine Levels', function() {
  it('solves levels', function() {
    var sequences = require('../src/levels/index').levelSequences;
    _.each(Object.keys(sequences), function(sequenceKey) {
      var levels = sequences[sequenceKey];
      _.each(levels, function(levelBlob) {
        expectLevelSolved(levelBlob);
      });
    });
  });
});

