var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;
var runCommand = base.runCommand;

var STAGING_START = '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"modified","styles.css":"modified"}}';

function loadStaging() {
  var headless = new HeadlessGit();
  headless.gitEngine.loadTreeFromString(STAGING_START);
  return headless;
}

function mainTarget(headless) {
  return headless.gitEngine.exportTree().branches.main.target;
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
      expect(headless.gitEngine.workingChanges['app.js']).toBeUndefined();
      expect(headless.gitEngine.workingChanges['styles.css']).toBe('modified');
    });
  });

  it('git commit -a stages all modified files first', function() {
    var headless = loadStaging();
    return headless.sendCommand('git commit -a').then(function() {
      expect(mainTarget(headless)).toBe('C2');
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
      ['changesModelEngaged', 'workingChanges', 'stashStack', 'mergeInProgress', 'conflictMerges']
        .forEach(function(key) {
          expect(tree.hasOwnProperty(key)).toBe(false);
        });
    });
  });
});
