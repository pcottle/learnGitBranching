var TreeCompare = require('../src/js/graph/treeCompare');

var loadTree = function(treeString) {
  return TreeCompare.convertTreeSafe(treeString);
};

var testMethod = function(compareMethod, goalTreeString, cases, options) {
  cases = cases || {};
  options = options || {};
  if (!options.dontCompareGoal) {
    // always expect the goal to compare to itself correctly
    cases[goalTreeString] = true;
  }

  Object.keys(cases).forEach(function(actualTree) {
    var value = cases[actualTree];
    var isEqual = TreeCompare.dispatch(compareMethod, goalTreeString, actualTree);
    if (isEqual !== value) {
      console.log('this goal tree', loadTree(goalTreeString));
      console.log('did not match this tree', loadTree(actualTree));
      console.log('for this value', value);
    }
    expect(isEqual).toBe(value);
  }.bind(this));
};

describe('Tree Compare', function() {
  it('will return false early if goal missing origin', function() {
    testMethod(
      {}, // checked for all methods
      '{}', // no origin tree
      {
        '{"originTree":{}}': false
      }, {
        dontCompareGoal: true
      }
    );
  });

  it('will return false early if current missing origin', function() {
    testMethod(
      {}, // checked for all methods
      '{"originTree":{}}',
      {
        '{}': false
      }, {
        dontCompareGoal: true
      }
    );
  });

  it('deep compares on origin tree', function() {
    testMethod(
      {}, // checked for all methods so this doesnt matter
      // state with originTree
      '{"branches":{"master":{"target":"C1","id":"master"},"o/master":{"target":"C1","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"remoteTrackingBranch":null,"remote":false,"target":"C1","id":"master","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 09:58:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 09:58:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"}},"HEAD":{"target":"master","id":"HEAD","type":"general ref"}}}',
      {
        // different cases for origin tree too
        '{"branches":{"MaStEr":{"target":"C1","id":"MaStEr"},"o/master":{"target":"C1","id":"o/MaStEr"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"MaStEr","id":"HEAD"},"originTree":{"branches":{"MaStEr":{"remoteTrackingBranch":null,"remote":false,"target":"C1","id":"MaStEr","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 09:58:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 09:58:50 GMT-0800 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"}},"HEAD":{"target":"MaStEr","id":"HEAD","type":"general ref"}}}': true,
        // one extra commit in origin
        '{"branches":{"master":{"target":"C1","id":"master"},"o/master":{"target":"C1","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"remoteTrackingBranch":null,"remote":false,"target":"C2","id":"master","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 10:24:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 10:24:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"},"C2":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 10:24:55 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C2"}},"HEAD":{"target":"master","id":"HEAD","type":"general ref"}}}': false,
        // extra commit local
        '{"branches":{"master":{"target":"C2","id":"master"},"o/master":{"target":"C1","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"remoteTrackingBranch":null,"remote":false,"target":"C1","id":"master","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:31:20 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:31:20 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"}},"HEAD":{"target":"master","id":"HEAD","type":"general ref"}}}': false
      }
    );
  });

  it('uses originCompare for the origin comparison results', function() {
    testMethod({
        // compare all branches and head locally, but only master remotely
        originCompare: {
          compareOnlyMaster: true
        }
      },
      // start with a local / origin with two branches
      '{"branches":{"master":{"target":"C3","id":"master"},"side":{"target":"C2","id":"side"},"o/master":{"target":"C3","id":"o/master"},"o/side":{"target":"C2","id":"o/side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"remoteTrackingBranch":null,"remote":false,"target":"C3","id":"master","type":"branch"},"side":{"remoteTrackingBranch":null,"remote":false,"target":"C2","id":"side","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"},"C2":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C2"},"C3":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C3"}},"HEAD":{"target":"master","id":"HEAD","type":"general ref"}}}',
      {
        // committing remotely on other branch is fine
        '{"branches":{"master":{"target":"C3","id":"master"},"side":{"target":"C2","id":"side"},"o/master":{"target":"C3","id":"o/master"},"o/side":{"target":"C2","id":"o/side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"remoteTrackingBranch":null,"remote":false,"target":"C3","id":"master","type":"branch"},"side":{"remoteTrackingBranch":null,"remote":false,"target":"C4","id":"side","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"},"C2":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C2"},"C3":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C3"},"C4":{"type":"commit","parents":["C2"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:35:38 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C4"}},"HEAD":{"target":"side","id":"HEAD","type":"general ref"}}}': true,
        // but committing on master is not ok
        '{"branches":{"master":{"target":"C3","id":"master"},"side":{"target":"C2","id":"side"},"o/master":{"target":"C3","id":"o/master"},"o/side":{"target":"C2","id":"o/side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"remoteTrackingBranch":null,"remote":false,"target":"C5","id":"master","type":"branch"},"side":{"remoteTrackingBranch":null,"remote":false,"target":"C4","id":"side","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"},"C2":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C2"},"C3":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C3"},"C4":{"type":"commit","parents":["C2"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:35:38 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C4"},"C5":{"type":"commit","parents":["C3"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:37:44 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C5"}},"HEAD":{"target":"master","id":"HEAD","type":"general ref"}}}': false
      }
    );
  });

  it('has default behavior to check all branches and master', function() {
    testMethod(
      {}, // default method, which is compare all branches and HEAD
      "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
      {
        // side branch that is checked out
        '{"branches":{"master":{"target":"C2","id":"master"},"side":{"target":"C3","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"side","id":"HEAD"}}': false,
        // different cases of branches
        '{"branches":{"mAsTeR":{"target":"C3","id":"mAsTeR"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"mAsTeR","id":"HEAD"}}': true,
        // head detached
        '{"branches":{"master":{"target":"C3","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"C2","id":"HEAD"}}': false
      }
    );
  });

  it('compares only master', function() {
    testMethod(
      { compareOnlyMaster: true },
      "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
      {
        // side branch that is checked out
        '{"branches":{"master":{"target":"C3","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"}}': true,
        // head detached
        '{"branches":{"master":{"target":"C3","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"C2","id":"HEAD"}}': true
      }
    );
  });

  it('compares all branches with hash agnostic', function() {
    var selectiveRebaseGoal = require('../src/levels/rebase/selectiveRebase').level.goalTreeString;
    testMethod(
      { compareAllBranchesHashAgnostic: true },
      selectiveRebaseGoal,
      {
        // almost done with level
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22master%22%7D%2C%22one%22%3A%7B%22target%22%3A%22C2%27%5E4%22%2C%22id%22%3A%22one%22%7D%2C%22two%22%3A%7B%22target%22%3A%22C3%27%27%22%2C%22id%22%3A%22two%22%7D%2C%22three%22%3A%7B%22target%22%3A%22C2%27%27%22%2C%22id%22%3A%22three%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C2%27%5E4%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%5E4%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C4%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22two%22%2C%22id%22%3A%22HEAD%22%7D%7D': false,
        // done with level, tons of extra amends
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22master%22%7D%2C%22one%22%3A%7B%22target%22%3A%22C2%27%5E4%22%2C%22id%22%3A%22one%22%7D%2C%22two%22%3A%7B%22target%22%3A%22C2%27%5E5%22%2C%22id%22%3A%22two%22%7D%2C%22three%22%3A%7B%22target%22%3A%22C2%27%27%22%2C%22id%22%3A%22three%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C2%27%5E4%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%5E4%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C4%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%2C%22C2%27%5E5%22%3A%7B%22parents%22%3A%5B%22C3%27%27%22%5D%2C%22id%22%3A%22C2%27%5E5%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22two%22%2C%22id%22%3A%22HEAD%22%7D%7D': true,
        // head checked out
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22master%22%7D%2C%22one%22%3A%7B%22target%22%3A%22C2%27%5E4%22%2C%22id%22%3A%22one%22%7D%2C%22two%22%3A%7B%22target%22%3A%22C2%27%5E5%22%2C%22id%22%3A%22two%22%7D%2C%22three%22%3A%7B%22target%22%3A%22C2%27%27%22%2C%22id%22%3A%22three%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C2%27%5E4%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%5E4%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C4%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%2C%22C2%27%5E5%22%3A%7B%22parents%22%3A%5B%22C3%27%27%22%5D%2C%22id%22%3A%22C2%27%5E5%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22HEAD%22%7D%7D': true,
        // head checked out and master forced one up
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C4%22%2C%22id%22%3A%22master%22%7D%2C%22one%22%3A%7B%22target%22%3A%22C2%27%5E4%22%2C%22id%22%3A%22one%22%7D%2C%22two%22%3A%7B%22target%22%3A%22C2%27%5E5%22%2C%22id%22%3A%22two%22%7D%2C%22three%22%3A%7B%22target%22%3A%22C2%27%27%22%2C%22id%22%3A%22three%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C2%27%5E4%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%5E4%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C4%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%2C%22C2%27%5E5%22%3A%7B%22parents%22%3A%5B%22C3%27%27%22%5D%2C%22id%22%3A%22C2%27%5E5%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22HEAD%22%7D%7D': false
      }
    );
  });

  it('compares only master with hash agnostic', function() {
    var manyRebaseGoal = require('../src/levels/rebase/manyRebases').level.goalTreeString;
    testMethod(
      { compareOnlyMasterHashAgnostic: true },
      manyRebaseGoal,
      {
        // almost done with level
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C6%27%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C6%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D': false,
        // right form but master not FF-ed
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C6%27%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C6%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C6%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22another%22%2C%22id%22%3A%22HEAD%22%7D%7D': false,
        // master FF-ed and solved
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C6%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C6%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D': true,
        // HEAD checked out after solve
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C6%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C6%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22C6%22%2C%22id%22%3A%22HEAD%22%7D%7D': true
      }
    );
  });

  it('compares only master with hash agnostic and asserts', function() {
    var jugglingGoal = require('../src/levels/mixed/jugglingCommits').level.goalTreeString;
    testMethod(
      {
        compareOnlyMasterHashAgnosticWithAsserts: true,
        'goalAsserts': {
          'master': [
            function(data) {
              return data.C2 > data.C3;
            },
            function(data) {
              return data.C2 > data.C1;
            }
          ]
        }
      },
      jugglingGoal,
      {
        // level solved with a bunch of extra dangling commits
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%27%22%2C%22id%22%3A%22master%22%7D%2C%22newImage%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22newImage%22%7D%2C%22caption%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22caption%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C2%27%5E4%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%5E4%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C2%27%5E4%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D': true,
        // level with the number of hashes being equal when we want more
        '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%5E7%22%2C%22id%22%3A%22master%22%7D%2C%22newImage%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22newImage%22%7D%2C%22caption%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22caption%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C2%27%5E4%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%5E4%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C2%27%5E4%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%2C%22C3%27%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%27%27%22%7D%2C%22C2%27%5E5%22%3A%7B%22parents%22%3A%5B%22C3%27%27%27%22%5D%2C%22id%22%3A%22C2%27%5E5%22%7D%2C%22C2%27%5E6%22%3A%7B%22parents%22%3A%5B%22C3%27%27%27%22%5D%2C%22id%22%3A%22C2%27%5E6%22%7D%2C%22C2%27%5E7%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%5E7%22%7D%2C%22C3%27%5E4%22%3A%7B%22parents%22%3A%5B%22C2%27%5E7%22%5D%2C%22id%22%3A%22C3%27%5E4%22%7D%2C%22C3%27%5E5%22%3A%7B%22parents%22%3A%5B%22C2%27%5E7%22%5D%2C%22id%22%3A%22C3%27%5E5%22%7D%2C%22C3%27%5E6%22%3A%7B%22parents%22%3A%5B%22C2%27%5E7%22%5D%2C%22id%22%3A%22C3%27%5E6%22%7D%2C%22C3%27%5E7%22%3A%7B%22parents%22%3A%5B%22C2%27%5E7%22%5D%2C%22id%22%3A%22C3%27%5E7%22%7D%2C%22C3%27%5E8%22%3A%7B%22parents%22%3A%5B%22C2%27%5E7%22%5D%2C%22id%22%3A%22C3%27%5E8%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D': false
      }
    );
  });
});


