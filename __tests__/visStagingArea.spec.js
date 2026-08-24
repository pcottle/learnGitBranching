var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var VisStagingArea = require('../src/js/visuals/visStagingArea');
var getChangedFileChipLayout =
  require('../src/js/visuals/visNode').getChangedFileChipLayout;

var STAGING_START = '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"modified","styles.css":"modified"}}';

function loadEngaged() {
  var headless = new HeadlessGit();
  headless.gitEngine.loadTreeFromString(STAGING_START);
  return headless.gitEngine;
}

function zoneByKey(model, key) {
  return model.zones.filter(function(zone) {
    return zone.key === key;
  })[0];
}

function chipPaths(zone) {
  return zone.chips.map(function(chip) {
    return chip.path;
  });
}

describe('getPanelModel', function() {
  it('is not engaged for a classic level, so the panel stays hidden', function() {
    var gitEngine = new HeadlessGit().gitEngine;
    var model = VisStagingArea.getPanelModel(gitEngine);

    expect(model.engaged).toBe(false);
    expect(model.zones).toEqual([]);
  });

  it('is engaged when the level seeds workingChanges', function() {
    var model = VisStagingArea.getPanelModel(loadEngaged());

    expect(model.engaged).toBe(true);
  });

  it('puts modified files in the working directory zone', function() {
    var model = VisStagingArea.getPanelModel(loadEngaged());

    expect(chipPaths(zoneByKey(model, 'working'))).toEqual(['app.js', 'styles.css']);
  });

  it('moves a file to the staging zone once it is staged', function() {
    var gitEngine = loadEngaged();
    gitEngine.addFiles(['app.js']);

    var model = VisStagingArea.getPanelModel(gitEngine);

    expect(chipPaths(zoneByKey(model, 'working'))).toEqual(['styles.css']);
    expect(chipPaths(zoneByKey(model, 'staging'))).toEqual(['app.js']);
  });

  it('sorts chips by path so the layout is stable across refreshes', function() {
    var gitEngine = loadEngaged();
    gitEngine.workingChanges = { 'zebra.js': 'modified', 'alpha.js': 'modified' };

    var zone = zoneByKey(VisStagingArea.getPanelModel(gitEngine), 'working');

    expect(chipPaths(zone)).toEqual(['alpha.js', 'zebra.js']);
  });

});

describe('commit changedFiles', function() {
  function loadHeadless() {
    var headless = new HeadlessGit();
    headless.gitEngine.loadTreeFromString(STAGING_START);
    return headless;
  }

  it('records the staged files on the commit itself', function() {
    var headless = loadHeadless();
    return headless.sendCommand('git add app.js;git commit').then(function() {
      expect(headless.gitEngine.exportTree().commits.C2.changedFiles)
        .toEqual(['app.js']);
    });
  });

  it('records files that commit -a staged on the fly', function() {
    var headless = loadHeadless();
    return headless.sendCommand('git commit -a').then(function() {
      expect(headless.gitEngine.exportTree().commits.C2.changedFiles)
        .toEqual(['app.js', 'styles.css']);
    });
  });

  it('keeps each commit file bundle independent', function() {
    var headless = loadHeadless();
    return headless.sendCommand('git add app.js;git commit;git add styles.css;git commit').then(function() {
      var commits = headless.gitEngine.exportTree().commits;
      expect(commits.C2.changedFiles).toEqual(['app.js']);
      expect(commits.C3.changedFiles).toEqual(['styles.css']);
    });
  });

  it('omits the metadata on a classic disengaged commit', function() {
    var headless = new HeadlessGit();
    return headless.sendCommand('git commit').then(function() {
      expect(headless.gitEngine.exportTree().commits.C2.changedFiles)
        .toBeUndefined();
    });
  });

  it('survives an export and reload round trip', function() {
    var headless = loadHeadless();
    return headless.sendCommand('git add app.js;git commit').then(function() {
      var reloaded = new HeadlessGit();
      reloaded.gitEngine.loadTreeFromString(
        headless.gitEngine.exportTreeString()
      );
      expect(reloaded.gitEngine.exportTree().commits.C2.changedFiles)
        .toEqual(['app.js']);
    });
  });

  it('is reported by git show instead of the classic fake diff', function() {
    var headless = loadHeadless();
    return headless.sendCommand('git add app.js;git commit').then(function() {
      var output = headless.gitEngine.refs.C2.getShowEntry();
      expect(output).toContain('Files changed:');
      expect(output).toContain('app.js');
      expect(output).not.toContain('bigGameResults.html');
    });
  });
});

describe('getChangedFileChipLayout', function() {
  it('sorts files and places visible chips to the left of a commit', function() {
    var layout = getChangedFileChipLayout(
      ['styles.css', 'app.js'],
      { x: 300, y: 200 },
      17
    );

    expect(layout.map(function(chip) { return chip.path; }))
      .toEqual(['app.js', 'styles.css']);
    layout.forEach(function(chip) {
      expect(chip.x + chip.width).toBeLessThan(300 - 17);
    });
  });

  it('truncates long labels while retaining the full path', function() {
    var path = 'src/components/reallyLongFilename.js';
    var chip = getChangedFileChipLayout([path], { x: 300, y: 200 }, 17)[0];

    expect(chip.path).toBe(path);
    expect(chip.label.length).toBeLessThan(path.length);
  });
});

describe('getPanelLayout', function() {
  var PAPER_WIDTH = 800;
  var PAPER_HEIGHT = 600;

  function layoutFor(gitEngine) {
    return VisStagingArea.getPanelLayout(
      VisStagingArea.getPanelModel(gitEngine),
      PAPER_WIDTH,
      PAPER_HEIGHT
    );
  }

  it('docks the panel against the left wall, clear of the goal window', function() {
    var layout = layoutFor(loadEngaged());

    expect(layout.panel.x).toBe(VisStagingArea.MARGIN);
  });

  it('centres the panel vertically, clearing the goal window and the helper bar', function() {
    var layout = layoutFor(loadEngaged());
    var centre = layout.panel.y + layout.panel.height / 2;

    expect(Math.abs(centre - PAPER_HEIGHT / 2)).toBeLessThan(1);
  });

  it('does not jump sideways when showing the goal shrinks the canvas', function() {
    var model = VisStagingArea.getPanelModel(loadEngaged());
    var wide = VisStagingArea.getPanelLayout(model, PAPER_WIDTH, PAPER_HEIGHT);
    // showing the goal window narrows the main paper to roughly this width
    var narrow = VisStagingArea.getPanelLayout(model, 586, PAPER_HEIGHT);

    expect(narrow.panel.x).toBe(wide.panel.x);
    expect(narrow.panel.width).toBe(wide.panel.width);
  });

  it('gives every chip a distinct row inside the panel', function() {
    var layout = layoutFor(loadEngaged());

    expect(layout.chips.length).toBe(2);
    var ys = layout.chips.map(function(chip) { return chip.y; });
    expect(ys[0]).not.toBe(ys[1]);
    layout.chips.forEach(function(chip) {
      expect(chip.y).toBeGreaterThan(layout.panel.y);
      expect(chip.y).toBeLessThan(layout.panel.y + layout.panel.height);
    });
  });

  it('keys a chip by its path alone so it animates from working into staging', function() {
    var gitEngine = loadEngaged();
    gitEngine.addFiles(['app.js']);

    var layout = layoutFor(gitEngine);
    var keys = layout.chips.map(function(chip) { return chip.key; });

    expect(keys).toContain('app.js');
    expect(keys).toContain('styles.css');
  });

  it('grows the panel taller as files pile up', function() {
    var small = layoutFor(loadEngaged());

    var gitEngine = loadEngaged();
    gitEngine.workingChanges = {
      'a.js': 'modified', 'b.js': 'modified', 'c.js': 'modified',
      'd.js': 'modified', 'e.js': 'modified'
    };
    var big = layoutFor(gitEngine);

    expect(big.panel.height).toBeGreaterThan(small.panel.height);
  });

  it('produces no layout at all when the model is disengaged', function() {
    var layout = layoutFor(new HeadlessGit().gitEngine);

    expect(layout.chips).toEqual([]);
  });
});
