var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

var fs = require('fs');
prompt = require('prompt');

prompt.start();

prompt.get(['command', 'whatItDoes'], function(err, result) {
  var headless = new HeadlessGit();
  headless.sendCommand(result.command);
  setTimeout(function() {
    var testCase = '\t\texpectTreeAsync(\n' +
      "\t\t\t'" + result.command + "',\n" +
      "\t\t\t'" + headless.gitEngine.printTree() + "'\n" +
      "\t\t);\n";

    console.log(testCase);
    // now add it
    var testFile = fs.readFileSync('./remote.spec.js', 'utf8');
    // insert after the last })
    var toSlice = testFile.lastIndexOf('})');
    var partOne = testFile.slice(0, toSlice);
    var partTwo = testFile.slice(toSlice);

    var funcCall = "\tit('" + result.whatItDoes + "', function() {\n" +
      testCase + "\t});\n\n";
    fs.writeFileSync('./remote.spec.js', partOne + funcCall + partTwo);
  }, 100);
});

