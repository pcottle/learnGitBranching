var TreeCompare = require('../src/js/graph/treeCompare');
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

var fs = require('fs');
prompt = require('prompt');

function getFile(truthy) {
  var filename = (truthy) ?
    './git.spec.js' :
    './remote.spec.js';
  return fs.readFileSync(filename, 'utf8');
}

function writeFile(truthy, content) {
  var filename = (truthy) ?
    './git.spec.js' :
    './remote.spec.js';

  fs.writeFileSync(filename, content);
}

prompt.start();

prompt.get(
  ['command', 'whatItDoes', 'intoGitSpec'],
  function(err, result) {
    var headless = new HeadlessGit();
    headless.sendCommand(result.command);
    setTimeout(function() {
      var testCase = '\t\texpectTreeAsync(\n' +
        "\t\t\t'" + result.command + "',\n" +
        "\t\t\t'" + headless.gitEngine.printTree() + "'\n" +
        "\t\t);\n";

      console.log(testCase);
      // now add it
      var testFile = getFile(result.intoGitSpec);
      // insert after the last })
      var toSlice = testFile.lastIndexOf('})');
      var partOne = testFile.slice(0, toSlice);
      var partTwo = testFile.slice(toSlice);

      var funcCall = "\tit('" + result.whatItDoes + "', function() {\n" +
        testCase + "\t});\n\n";
      writeFile(result.intoGitSpec, partOne + funcCall + partTwo);
    }, 100);
  }
);

