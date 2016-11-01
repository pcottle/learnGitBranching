var _ = require('underscore');

// static class...
var TreeCompare = {};

TreeCompare.dispatchFromLevel = function(levelBlob, treeToCompare) {
  var goalTreeString = levelBlob.goalTreeString;
  if (typeof treeToCompare !== 'string') {
    console.warn('NEED to pass in string!! gah');
  }
  return TreeCompare.dispatch(levelBlob, goalTreeString, treeToCompare);
};

TreeCompare.onlyMasterCompared = function(levelBlob) {
  var getAroundLintTrue = true;
  switch (getAroundLintTrue) {
    case !!levelBlob.compareOnlyMaster:
    case !!levelBlob.compareOnlyMasterHashAgnostic:
    case !!levelBlob.compareOnlyMasterHashAgnosticWithAsserts:
      return true;
    default:
      return false;
  }
};

TreeCompare.dispatch = function(levelBlob, goalTreeString, treeToCompare) {
  var goalTree = this.convertTreeSafe(goalTreeString);
  treeToCompare = this.convertTreeSafe(treeToCompare);
  if (typeof goalTree.originTree !== typeof treeToCompare.originTree) {
    // origin status does not match
    return false;
  }
  var shallowResult = this.dispatchShallow(
    levelBlob, goalTree, treeToCompare
  );
  if (!shallowResult || !goalTree.originTree) {
    // we only have one level (or failed on shallow), punt
    return shallowResult;
  }

  var originBlob = (levelBlob.originCompare) ?
    levelBlob.originCompare : levelBlob;
  // compare origin trees
  return shallowResult && this.dispatchShallow(
    originBlob, goalTree.originTree, treeToCompare.originTree
  );
};

TreeCompare.dispatchShallow = function(levelBlob, goalTreeString, treeToCompare) {
  var getAroundLintTrue = true;
  // i actually prefer this to else if
  switch (getAroundLintTrue) {
    case !!levelBlob.compareOnlyMaster:
      return TreeCompare.compareBranchWithinTrees(
        treeToCompare, goalTreeString, 'master'
      );
    case !!levelBlob.compareOnlyBranches:
      return TreeCompare.compareAllBranchesWithinTrees(
        treeToCompare, goalTreeString
      );
    case !!levelBlob.compareAllBranchesHashAgnostic:
      return TreeCompare.compareAllBranchesWithinTreesHashAgnostic(
        treeToCompare, goalTreeString
      );
    case !!levelBlob.compareOnlyMasterHashAgnostic:
      return TreeCompare.compareBranchesWithinTreesHashAgnostic(
        treeToCompare, goalTreeString, ['master']
      );
    case !!levelBlob.compareOnlyMasterHashAgnosticWithAsserts:
      return TreeCompare.compareBranchesWithinTreesHashAgnostic(
        treeToCompare, goalTreeString, ['master']
      ) && TreeCompare.evalAsserts(treeToCompare, levelBlob.goalAsserts);
    default:
      return TreeCompare.compareAllBranchesWithinTreesAndHEAD(
        treeToCompare, goalTreeString
      );
  }
};

// would love to have copy properties here.. :(
TreeCompare.compareAllBranchesWithinTreesAndHEAD = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  // also compare tags!! for just one level
  return treeA.HEAD.target === treeB.HEAD.target &&
    this.compareAllBranchesWithinTrees(treeA, treeB) &&
    this.compareAllTagsWithinTrees(treeA, treeB);
};

TreeCompare.compareAllBranchesWithinTrees = function(treeA, treeB) {
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

TreeCompare.compareAllTagsWithinTrees = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);
  this.reduceTreeFields([treeA, treeB]);

  return _.isEqual(treeA.tags, treeB.tags);
};

TreeCompare.compareBranchesWithinTrees = function(treeA, treeB, branches) {
  var result = true;
  _.each(branches, function(branchName) {
    result = result && this.compareBranchWithinTrees(treeA, treeB, branchName);
  }, this);

  return result;
};

TreeCompare.compareBranchWithinTrees = function(treeA, treeB, branchName) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);
  this.reduceTreeFields([treeA, treeB]);

  var recurseCompare = this.getRecurseCompare(treeA, treeB);
  var branchA = treeA.branches[branchName];
  var branchB = treeB.branches[branchName];

  return _.isEqual(branchA, branchB) &&
    recurseCompare(treeA.commits[branchA.target], treeB.commits[branchB.target]);
};

TreeCompare.compareAllBranchesWithinTreesHashAgnostic = function(treeA, treeB) {
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

TreeCompare.compareBranchesWithinTreesHashAgnostic = function(treeA, treeB, branches) {
  // we can't DRY unfortunately here because we need a special _.isEqual function
  // for both the recursive compare and the branch compare
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);
  this.reduceTreeFields([treeA, treeB]);

  // get a function to compare branch objects without hashes
  var compareBranchObjs = function(branchA, branchB) {
    if (!branchA || !branchB) {
      return false;
    }

    // dont mess up the rest of comparison
    branchA = _.clone(branchA);
    branchB = _.clone(branchB);
    branchA.target = this.getBaseRef(branchA.target);
    branchB.target = this.getBaseRef(branchB.target);

    return _.isEqual(branchA, branchB);
  }.bind(this);
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

TreeCompare.evalAsserts = function(tree, assertsPerBranch) {
  var result = true;
  _.each(assertsPerBranch, function(asserts, branchName) {
    result = result && this.evalAssertsOnBranch(tree, branchName, asserts);
  }, this);
  return result;
};

TreeCompare.evalAssertsOnBranch = function(tree, branchName, asserts) {
  tree = this.convertTreeSafe(tree);

  // here is the outline:
  // * make a data object
  // * go to the branch given by the key
  // * traverse upwards, storing the amount of hashes on each in the data object
  // * then come back and perform functions on data

  if (!tree.branches[branchName]) {
    return false;
  }

  var branch = tree.branches[branchName];
  var queue = [branch.target];
  var data = {};
  while (queue.length) {
    var commitRef = queue.pop();
    data[this.getBaseRef(commitRef)] = this.getNumHashes(commitRef);
    queue = queue.concat(tree.commits[commitRef].parents);
  }

  var result = true;
  _.each(asserts, function(assert) {
    try {
      result = result && assert(data);
    } catch (err) {
      console.warn('error during assert', err);
      console.log(err);
      result = false;
    }
  });

  return result;
};

TreeCompare.getNumHashes = function(ref) {
  var regexMap = [
    [/^C(\d+)([']{0,3})$/, function(bits) {
      if (!bits[2]) {
        return 0;
      }
      return bits[2].length;
    }],
    [/^C(\d+)['][\^](\d+)$/, function(bits) {
      return Number(bits[2]);
    }]
  ];

  for (var i = 0; i < regexMap.length; i++) {
    var regex = regexMap[i][0];
    var func = regexMap[i][1];
    var results = regex.exec(ref);
    if (results) {
      return func(results);
    }
  }
  throw new Error('couldnt parse ref ' + ref);
};

TreeCompare.getBaseRef = function(ref) {
  var idRegex = /^C(\d+)/;
  var bits = idRegex.exec(ref);
  if (!bits) { throw new Error('no regex matchy for ' + ref); }
  // no matter what hash this is (aka C1', C1'', C1'^3, etc) we
  // return C1
  return 'C' + bits[1];
};

TreeCompare.getRecurseCompareHashAgnostic = function(treeA, treeB) {
  // here we pass in a special comparison function to pass into the base
  // recursive compare.

  // some buildup functions
  var getStrippedCommitCopy = function(commit) {
    if (!commit) { return {}; }
    return _.extend(
      {},
      commit,
      {
        id: this.getBaseRef(commit.id),
        parents: null
      }
    );
  }.bind(this);

  var isEqual = function(commitA, commitB) {
    return _.isEqual(
      getStrippedCommitCopy(commitA),
      getStrippedCommitCopy(commitB)
    );
  };
  return this.getRecurseCompare(treeA, treeB, {isEqual: isEqual});
};

TreeCompare.getRecurseCompare = function(treeA, treeB, options) {
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
    var maxNumParents = Math.max(commitA.parents.length, commitB.parents.length);
    _.each(_.range(maxNumParents), function(index) {
      var pAid = commitA.parents[index];
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

TreeCompare.lowercaseTree = function(tree) {
  if (tree.HEAD) {
    tree.HEAD.target = tree.HEAD.target.toLocaleLowerCase();
  }

  var branches = tree.branches;
  tree.branches = {};
  _.each(branches, function(obj, name) {
    obj.id = obj.id.toLocaleLowerCase();
    tree.branches[name.toLocaleLowerCase()] = obj;
  });
  return tree;
};

TreeCompare.convertTreeSafe = function(tree) {
  if (typeof tree !== 'string') {
    return tree;
  }
  tree = JSON.parse(unescape(tree));
  // ok we are almost done -- but we need to case insensitive
  // certain fields. so go ahead and do that.
  // handle HEAD target first
  this.lowercaseTree(tree);
  if (tree.originTree) {
    tree.originTree = this.lowercaseTree(tree.originTree);
  }
  return tree;
};

TreeCompare.reduceTreeFields = function(trees) {
  var commitSaveFields = [
    'parents',
    'id',
    'rootCommit'
  ];
  var branchSaveFields = [
    'target',
    'id',
    'remoteTrackingBranchID'
  ];
  var tagSaveFields = [
    'target',
    'id'
  ];

  var commitSortFields = ['children', 'parents'];
  // for backwards compatibility, fill in some fields if missing
  var defaults = {
    remoteTrackingBranchID: null
  };
  // also fill tree-level defaults
  var treeDefaults = {
    tags: {}
  };

  _.each(trees, function(tree) {
    _.each(treeDefaults, function(val, key) {
      if (tree[key] === undefined) {
        tree[key] = val;
      }
    });
  });

  // this function saves only the specified fields of a tree
  var saveOnly = function(tree, treeKey, saveFields, sortFields) {
    var objects = tree[treeKey];
    _.each(objects, function(obj, objKey) {
      // our blank slate to copy over
      var blank = {};
      _.each(saveFields, function(field) {
        if (obj[field] !== undefined) {
          blank[field] = obj[field];
        } else if (defaults[field] !== undefined) {
          blank[field] = defaults[field];
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
    saveOnly(tree, 'tags', tagSaveFields);

    tree.HEAD = {
      target: tree.HEAD.target,
      id: tree.HEAD.id
    };
    if (tree.originTree) {
      this.reduceTreeFields([tree.originTree]);
    }
  }, this);
};

TreeCompare.compareTrees = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  // now we need to strip out the fields we don't care about, aka things
  // like createTime, message, author
  this.reduceTreeFields([treeA, treeB]);

  return _.isEqual(treeA, treeB);
};

module.exports = TreeCompare;
