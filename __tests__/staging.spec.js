var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;
var runCommand = base.runCommand;
var TreeCompare = require('../src/js/graph/treeCompare');
var Commands = require('../src/js/commands').commands;
var stagingLevel = require('../src/levels/workingDir/staging').level;
var restoreLevel = require('../src/levels/workingDir/restore').level;

var STAGING_START = '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"modified","styles.css":"modified"}}';

function loadStaging() {
  var headless = new HeadlessGit();
  headless.gitEngine.loadTreeFromString(STAGING_START);
  return headless;
}

function mainTarget(headless) {
  return headless.gitEngine.exportTree().branches.main.target;
}

function solves(headless, level) {
  return TreeCompare.dispatchFromLevel(level, headless.gitEngine.printTree());
}

describe('Staging area', function() {
  it('engages the changes model from a startTree with workingChanges', function() {
    var headless = loadStaging();
    expect(headless.gitEngine.changesModelEngaged).toBe(true);
    expect(headless.gitEngine.getUnstagedChanges().sort()).toEqual(['app.js', 'styles.css']);
  });

  it('git add stages a single file', function() {
    var headless = loadStaging();
    return headless.sendCommand('git add app.js').then(function() {
      expect(headless.gitEngine.workingChanges['app.js']).toBe('staged');
      expect(headless.gitEngine.workingChanges['styles.css']).toBe('modified');
    });
  });

  it('git add . stages everything', function() {
    var headless = loadStaging();
    return headless.sendCommand('git add .').then(function() {
      expect(headless.gitEngine.getStagedChanges().sort()).toEqual(['app.js', 'styles.css']);
    });
  });

  it('git commit refuses when nothing is staged and makes no commit', function() {
    var headless = loadStaging();
    var before = mainTarget(headless);
    return headless.sendCommand('git commit').then(function() {
      expect(mainTarget(headless)).toBe(before);
    });
  });

  it('git commit records staged files and clears them', function() {
    var headless = loadStaging();
    return headless.sendCommand('git add app.js;git commit').then(function() {
      expect(mainTarget(headless)).toBe('C2');
      expect(headless.gitEngine.exportTree().commits.C2.changedFiles).toEqual(['app.js']);
      expect(headless.gitEngine.workingChanges['app.js']).toBeUndefined();
      expect(headless.gitEngine.workingChanges['styles.css']).toBe('modified');
    });
  });

  it('git commit -a stages all modified files first', function() {
    var headless = loadStaging();
    return headless.sendCommand('git commit -a').then(function() {
      expect(mainTarget(headless)).toBe('C2');
      expect(headless.gitEngine.exportTree().commits.C2.changedFiles)
        .toEqual(['app.js', 'styles.css']);
      expect(Object.keys(headless.gitEngine.workingChanges).length).toBe(0);
    });
  });

  it('git restore --staged unstages; git restore discards', function() {
    var headless = loadStaging();
    return headless.sendCommand('git add app.js;git restore --staged app.js').then(function() {
      expect(headless.gitEngine.workingChanges['app.js']).toBe('modified');
      return headless.sendCommand('git restore styles.css');
    }).then(function() {
      expect(headless.gitEngine.workingChanges['styles.css']).toBeUndefined();
    });
  });

  it('stays engaged after the working tree is clean (persistent flag)', function() {
    var headless = loadStaging();
    return headless.sendCommand('git add app.js;git commit;git add styles.css;git commit').then(function() {
      expect(mainTarget(headless)).toBe('C3');
      expect(headless.gitEngine.changesModelEngaged).toBe(true);
      expect(Object.keys(headless.gitEngine.workingChanges).length).toBe(0);
    });
  });
});

describe('Staging model is opt-in (regression guards)', function() {
  it('git add still refuses on a classic (disengaged) engine', function() {
    return runCommand('git add foo.js', function(msg) {
      expect(msg).toContain('staging');
    });
  });

  it('plain git commit on a disengaged engine still commits normally', function() {
    return expectTreeAsync('git commit', base.ONE_COMMIT_TREE);
  });

  it('a disengaged exportTree contains none of the changes-model keys', function() {
    var headless = new HeadlessGit();
    return headless.sendCommand('git commit').then(function() {
      var tree = headless.gitEngine.exportTree();
      ['changesModelEngaged', 'workingChanges']
        .forEach(function(key) {
          expect(tree.hasOwnProperty(key)).toBe(false);
        });
      expect(tree.commits.C2.hasOwnProperty('changedFiles')).toBe(false);
    });
  });
});

describe('Staging level goals', function() {
  it('requires each file to land in its intended commit', function() {
    var headless = loadStaging();
    return headless.sendCommand(stagingLevel.solutionCommand).then(function() {
      expect(solves(headless, stagingLevel)).toBe(true);
    });
  });

  it('rejects the same graph when the committed files are swapped', function() {
    var headless = loadStaging();
    return headless.sendCommand(
      'git add styles.css;git commit;git add app.js;git commit'
    ).then(function() {
      expect(mainTarget(headless)).toBe('C3');
      expect(solves(headless, stagingLevel)).toBe(false);
    });
  });

  it('requires the restore level to reach the exact final working state', function() {
    var correct = new HeadlessGit();
    var unfinished;
    var wrongFiles;
    correct.gitEngine.loadTreeFromString(restoreLevel.startTree);
    return correct.sendCommand(restoreLevel.solutionCommand).then(function() {
      expect(solves(correct, restoreLevel)).toBe(true);

      unfinished = new HeadlessGit();
      unfinished.gitEngine.loadTreeFromString(restoreLevel.startTree);
      return unfinished.sendCommand(
        'git restore --staged secret.env;git commit'
      );
    }).then(function() {
      expect(solves(unfinished, restoreLevel)).toBe(false);

      wrongFiles = new HeadlessGit();
      wrongFiles.gitEngine.loadTreeFromString(restoreLevel.startTree);
      return wrongFiles.sendCommand(
        'git restore experiment.js;git commit'
      );
    }).then(function() {
      expect(mainTarget(wrongFiles)).toBe('C2');
      expect(solves(wrongFiles, restoreLevel)).toBe(false);
    });
  });
});

describe('Staging command count', function() {
  it('counts add and restore commands toward the level score', function() {
    var counted = Commands.getCommandsThatCount().git;
    expect(counted.add.test('git add app.js')).toBe(true);
    expect(counted.restore.test('git restore experiment.js')).toBe(true);
  });
});

describe('Copied commits keep changedFiles', function() {
  it('cherry-pick carries the file label onto the copy', function() {
    var headless = loadStaging();
    return headless.sendCommand(
      'git add app.js;git commit;git checkout -b other C0;git cherry-pick C2'
    ).then(function() {
      var commits = headless.gitEngine.exportTree().commits;
      expect(commits["C2'"].changedFiles).toEqual(['app.js']);
    });
  });

  it('rebase carries the file label onto each replayed commit', function() {
    var headless = loadStaging();
    return headless.sendCommand(
      'git add app.js;git commit;' +
      'git checkout -b other C0;git add styles.css;git commit;' +
      'git checkout main;git rebase other'
    ).then(function() {
      var commits = headless.gitEngine.exportTree().commits;
      expect(commits["C2'"].changedFiles).toEqual(['app.js']);
    });
  });

  it('revert carries the file label onto the inverse commit', function() {
    var headless = loadStaging();
    return headless.sendCommand(
      'git add app.js;git commit;git revert C2'
    ).then(function() {
      var commits = headless.gitEngine.exportTree().commits;
      expect(commits["C2'"].changedFiles).toEqual(['app.js']);
    });
  });
});
