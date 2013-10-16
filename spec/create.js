var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

var prompt = require('prompt');

prompt.start();

prompt.get(['command'], function(err, result) {
  var headless = new HeadlessGit();
  headless.sendCommand(result.command);
  setTimeout(function() {
    console.log(headless.gitEngine.printTree());
  }, 100);
});

