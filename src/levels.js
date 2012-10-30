// static class...
function LevelEngine() {

}

LevelEngine.prototype.compareBranchesWithinTrees = function(treeA, treeB, branches) {
  var result = true;
  _.each(branches, function(branchName) {
    result = result && this.compareBranchWithinTrees(treeA, treeB, branchName);
  }, this);

  return result;
};

LevelEngine.prototype.compareBranchWithinTrees = function(treeA, treeB, branchName) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  this.stripTreeFields([treeA, treeB]);

  // we need a recursive comparison function to bubble up the  branch
  var recurseCompare = function(commitA, commitB) {
    // this is the short-circuit base case
    var result = _.isEqual(commitA, commitB);
    if (!result) {
      return false;
    }

    // we loop through each parent ID. we sort the parent ID's beforehand
    // so the index lookup is valid
    _.each(commitA.parents, function(pAid, index) {
      var pBid = commitB.parents[index];

      var childA = treeA.commits[pAid];
      var childB = treeB.commits[pBid];

      result = result && recurseCompare(childA, childB);
    }, this);
    // if each of our children recursively are equal, we are good
    return result;
  };

  var branchA = treeA.branches[branchName];
  var branchB = treeB.branches[branchName];

  return _.isEqual(branchA, branchB) &&
    recurseCompare(treeA.commits[branchA.target], treeB.commits[branchB.target]);
};

LevelEngine.prototype.convertTreeSafe = function(tree) {
  if (typeof tree == 'string') {
    return JSON.parse(unescape(tree));
  }
  return tree;
};

LevelEngine.prototype.stripTreeFields = function(trees) {
  var stripFields = ['createTime', 'author', 'commitMessage'];
  var sortFields = ['children', 'parents'];

  _.each(trees, function(tree) {
    _.each(tree.commits, function(commit) {
      _.each(stripFields, function(field) {
        commit[field] = undefined;
      });
      _.each(sortFields, function(field) {
        if (commit[field]) {
          commit[field] = commit[field].sort();
        }
      });
    });
  });
};

LevelEngine.prototype.compareTrees = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  // now we need to strip out the fields we don't care about, aka things
  // like createTime, message, author
  this.stripTreeFields([treeA, treeB]);

  return _.isEqual(treeA, treeB);
};

var levelEngine = new LevelEngine();

