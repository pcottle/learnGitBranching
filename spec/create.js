var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

var fs = require('fs');
prompt = require('prompt');

prompt.start();

prompt.get(['command', 'whatItDoes'], function(err, result) {
  var headless = new HeadlessGit();
  headless.sendCommand(result.command);
  setTimeout(function() {
    var testCase = '\texpectTreeAsync(' +
      "\t\t'" + result.command + "'," +
      "\t\t'" + headless.gitEngine.printTree() + "'" +
      "\t);";

    console.log(testCase);
    // now add it
    var testFile = fs.readFileSync('./remote.spec.js', 'utf8');
    // insert after the last })
    var toSlice = testFile.lastIndexOf('})');
    var partOne = testFile.slice(0, toSlice);
    var partTwo = testFile.slice(toSlice);

    var funcCall = "it('" + result.whatItDoes + "', function() {\n" +
      testCase + "\n});";
    fs.writeFileSync('./remote.spec.js', partOne + funcCall + partTwo);
  }, 100);
});

