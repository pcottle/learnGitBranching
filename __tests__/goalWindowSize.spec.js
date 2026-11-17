var GoalWindowSize = require('../src/js/util/goalWindowSize');
var levelSequences = require('../src/levels').levelSequences;

var getGoalWindowSize = GoalWindowSize.getGoalWindowSize;
var measureTreeString = GoalWindowSize.measureTreeString;

var screen = { width: 1400, height: 800 };

var treeOf = function(commits, originCommits) {
  var tree = { commits: commits };
  if (originCommits) {
    tree.originTree = { commits: originCommits };
  }
  return JSON.stringify(tree);
};

var chain = function(count) {
  var commits = {};
  for (var i = 0; i < count; i++) {
    commits['C' + i] = { id: 'C' + i, parents: i ? ['C' + (i - 1)] : [] };
  }
  return commits;
};

describe('Goal window sizing', function() {
  it('measures layers and columns of a linear history', function() {
    expect(measureTreeString(treeOf(chain(4)))).toEqual({ layers: 3, columns: 1 });
  });

  it('counts a column for every branch of history', function() {
    var commits = chain(2);
    commits.C2 = { id: 'C2', parents: ['C1'] };
    commits.C3 = { id: 'C3', parents: ['C1'] };
    // a merge only hangs off its first parent, so it adds no column
    commits.C4 = { id: 'C4', parents: ['C3', 'C2'] };
    expect(measureTreeString(treeOf(commits))).toEqual({ layers: 3, columns: 2 });
  });

  it('places origin next to the local repository', function() {
    var measured = measureTreeString(treeOf(chain(3), chain(5)));
    expect(measured).toEqual({ layers: 4, columns: 2 });
  });

  it('understands url-escaped tree strings', function() {
    expect(measureTreeString(escape(treeOf(chain(2))))).toEqual({ layers: 1, columns: 1 });
  });

  it('gives up on trees it cannot read', function() {
    expect(getGoalWindowSize('not a tree', screen)).toBe(null);
    expect(getGoalWindowSize('{}', screen)).toBe(null);
  });

  it('makes shorter goals shorter windows', function() {
    var small = getGoalWindowSize(treeOf(chain(3)), screen);
    var tall = getGoalWindowSize(treeOf(chain(7)), screen);
    expect(small.height).toBeLessThan(tall.height);
    expect(small.height).toBeLessThan(0.75 * screen.height);
  });

  it('makes wider goals wider windows', function() {
    var commits = chain(2);
    for (var i = 2; i < 6; i++) {
      commits['C' + i] = { id: 'C' + i, parents: ['C1'] };
    }
    var narrow = getGoalWindowSize(treeOf(chain(3)), screen);
    var wide = getGoalWindowSize(treeOf(commits), screen);
    expect(narrow.width).toBeLessThan(wide.width);
  });

  it('keeps windows within the minimums and the screen', function() {
    var tiny = getGoalWindowSize(treeOf(chain(1)), screen);
    expect(tiny.width).toBeGreaterThan(GoalWindowSize.MIN_WIDTH - 1);
    expect(tiny.height).toBeGreaterThan(GoalWindowSize.MIN_HEIGHT - 1);

    var huge = getGoalWindowSize(treeOf(chain(40)), screen);
    expect(huge.height).toBeLessThan(GoalWindowSize.MAX_HEIGHT_FRACTION * screen.height + 1);

    var cramped = getGoalWindowSize(treeOf(chain(40)), { width: 100, height: 100 });
    expect(cramped.width).toBe(GoalWindowSize.MIN_WIDTH);
    expect(cramped.height).toBe(GoalWindowSize.MIN_HEIGHT);
  });

  it('can size every level goal', function() {
    Object.keys(levelSequences).forEach(function(sequence) {
      levelSequences[sequence].forEach(function(level) {
        var size = getGoalWindowSize(level.goalTreeString, screen);
        expect(size).not.toBe(null);
        expect(size.height).toBeLessThan(screen.height);
      });
    });
  });
});
