var _ = require('underscore');

// static class...
function TreeCompare() {

}

TreeCompare.prototype.compareAllBranchesWithinTreesAndHEAD = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  return treeA.HEAD.target == treeB.HEAD.target && this.compareAllBranchesWithinTrees(treeA, treeB);
};

TreeCompare.prototype.compareAllBranchesWithinTrees = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  var allBranches = _.extend(
    {},
    treeA.branches,
    treeB.branches
  );

  var result = true;
  _.uniq(allBranches, function(info, branch) {
    result = result && this.compareBranchWithinTrees(treeA, treeB, branch);
  }, this);
  return result;
};

TreeCompare.prototype.compareBranchesWithinTrees = function(treeA, treeB, branches) {
  var result = true;
  _.each(branches, function(branchName) {
    result = result && this.compareBranchWithinTrees(treeA, treeB, branchName);
  }, this);

  return result;
};

TreeCompare.prototype.compareBranchWithinTrees = function(treeA, treeB, branchName) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);
  this.reduceTreeFields([treeA, treeB]);

  var recurseCompare = this.getRecurseCompare(treeA, treeB);
  var branchA = treeA.branches[branchName];
  var branchB = treeB.branches[branchName];

  return _.isEqual(branchA, branchB) &&
    recurseCompare(treeA.commits[branchA.target], treeB.commits[branchB.target]);
};

TreeCompare.prototype.compareAllBranchesWithinTreesHashAgnostic = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);
  this.reduceTreeFields([treeA, treeB]);

  var allBranches = _.extend(
    {},
    treeA.branches,
    treeB.branches
  );
  var branchNames = [];
  _.each(allBranches, function(obj, name) { branchNames.push(name); });

  return this.compareBranchesWithinTreesHashAgnostic(treeA, treeB, branchNames);
};

TreeCompare.prototype.compareBranchesWithinTreesHashAgnostic = function(treeA, treeB, branches) {
  // we can't DRY unfortunately here because we need a special _.isEqual function
  // for both the recursive compare and the branch compare
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);
  this.reduceTreeFields([treeA, treeB]);

  // get a function to compare branch objects without hashes
  var compareBranchObjs = _.bind(function(branchA, branchB) {
    if (!branchA || !branchB) {
      return false;
    }

    // dont mess up the rest of comparison
    branchA = _.clone(branchA);
    branchB = _.clone(branchB);
    branchA.target = this.getBaseRef(branchA.target);
    branchB.target = this.getBaseRef(branchB.target);

    return _.isEqual(branchA, branchB);
  }, this);
  // and a function to compare recursively without worrying about hashes
  var recurseCompare = this.getRecurseCompareHashAgnostic(treeA, treeB);

  var result = true;
  _.each(branches, function(branchName) {
    var branchA = treeA.branches[branchName];
    var branchB = treeB.branches[branchName];

    result = result && compareBranchObjs(branchA, branchB) &&
      recurseCompare(treeA.commits[branchA.target], treeB.commits[branchB.target]);
  }, this);
  return result;
};

TreeCompare.prototype.getBaseRef = function(ref) {
  var idRegex = /^C(\d+)/;
  var bits = idRegex.exec(ref);
  if (!bits) { throw new Error('no regex matchy for ' + ref); }
  // no matter what hash this is (aka C1', C1'', C1'^3, etc) we
  // return C1
  return 'C' + bits[1];
};

TreeCompare.prototype.getRecurseCompareHashAgnostic = function(treeA, treeB) {
  // here we pass in a special comparison function to pass into the base
  // recursive compare.

  // some buildup functions
  var getStrippedCommitCopy = _.bind(function(commit) {
    return _.extend(
      {},
      commit,
      {id: this.getBaseRef(commit.id)
    });
  }, this);

  var isEqual = function(commitA, commitB) {
    return _.isEqual(
      getStrippedCommitCopy(commitA),
      getStrippedCommitCopy(commitB)
    );
  };
  return this.getRecurseCompare(treeA, treeB, {isEqual: isEqual});
};

TreeCompare.prototype.getRecurseCompare = function(treeA, treeB, options) {
  options = options || {};

  // we need a recursive comparison function to bubble up the branch
  var recurseCompare = function(commitA, commitB) {
    // this is the short-circuit base case
    var result = options.isEqual ?
      options.isEqual(commitA, commitB) : _.isEqual(commitA, commitB);
    if (!result) {
      return false;
    }

    // we loop through each parent ID. we sort the parent ID's beforehand
    // so the index lookup is valid. for merge commits this will duplicate some of the
    // checking (because we aren't doing graph search) but it's not a huge deal
    var allParents = _.unique(commitA.parents.concat(commitB.parents));
    _.each(allParents, function(pAid, index) {
      var pBid = commitB.parents[index];

      // if treeA or treeB doesn't have this parent,
      // then we get an undefined child which is fine when we pass into _.isEqual
      var childA = treeA.commits[pAid];
      var childB = treeB.commits[pBid];

      result = result && recurseCompare(childA, childB);
    }, this);
    // if each of our children recursively are equal, we are good
    return result;
  };
  return recurseCompare;
};

TreeCompare.prototype.convertTreeSafe = function(tree) {
  if (typeof tree == 'string') {
    return JSON.parse(unescape(tree));
  }
  return tree;
};

TreeCompare.prototype.reduceTreeFields = function(trees) {
  var commitSaveFields = [
    'parents',
    'id',
    'rootCommit'
  ];
  var commitSortFields = ['children', 'parents'];
  var branchSaveFields = [
    'target',
    'id'
  ];

  // this function saves only the specified fields of a tree
  var saveOnly = function(tree, treeKey, saveFields, sortFields) {
    var objects = tree[treeKey];
    _.each(objects, function(obj, objKey) {
      // our blank slate to copy over
      var blank = {};
      _.each(saveFields, function(field) {
        if (obj[field] !== undefined) {
          blank[field] = obj[field];
        }
      });

      _.each(sortFields, function(field) {
        // also sort some fields
        if (obj[field]) {
          obj[field].sort();
          blank[field] = obj[field];
        }
      });
      tree[treeKey][objKey] = blank;
    });
  };

  _.each(trees, function(tree) {
    saveOnly(tree, 'commits', commitSaveFields, commitSortFields);
    saveOnly(tree, 'branches', branchSaveFields);

    tree.HEAD = {
      target: tree.HEAD.target,
      id: tree.HEAD.id
    };
  });
};

TreeCompare.prototype.compareTrees = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  // now we need to strip out the fields we don't care about, aka things
  // like createTime, message, author
  this.reduceTreeFields([treeA, treeB]);

  return _.isEqual(treeA, treeB);
};

exports.TreeCompare = TreeCompare;

