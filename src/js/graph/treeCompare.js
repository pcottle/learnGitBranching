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

TreeCompare.onlyMainCompared = function(levelBlob) {
  var getAroundLintTrue = true;
  switch (getAroundLintTrue) {
    case !!levelBlob.compareOnlyMain:
    case !!levelBlob.compareOnlyMainHashAgnostic:
    case !!levelBlob.compareOnlyMainHashAgnosticWithAsserts:
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
    case !!levelBlob.compareOnlyMain:
      return TreeCompare.compareBranchWithinTrees(
        treeToCompare, goalTreeString, 'main'
      );
    case !!levelBlob.compareAllBranchesAndEnforceBranchCleanup:
      return TreeCompare.compareAllBranchesAndEnforceBranchCleanup(
        treeToCompare, goalTreeString
      );
    case !!levelBlob.compareOnlyBranches:
      return TreeCompare.compareAllBranchesWithinTrees(
        treeToCompare, goalTreeString
      );
    case !!levelBlob.compareAllBranchesHashAgnostic:
      return TreeCompare.compareAllBranchesWithinTreesHashAgnostic(
        treeToCompare, goalTreeString
      );
    case !!levelBlob.compareOnlyMainHashAgnostic:
      return TreeCompare.compareBranchesWithinTreesHashAgnostic(
        treeToCompare, goalTreeString, ['main']
      );
    case !!levelBlob.compareOnlyMainHashAgnosticWithAsserts:
      return TreeCompare.compareBranchesWithinTreesHashAgnostic(
        treeToCompare, goalTreeString, ['main']
      ) && TreeCompare.evalAsserts(treeToCompare, levelBlob.goalAsserts);
    case !!levelBlob.onlyEvaluateAsserts:
      return TreeCompare.evalAsserts(treeToCompare, levelBlob.goalAsserts);
    default:
      return TreeCompare.compareAllBranchesWithinTreesAndHEAD(
        treeToCompare, goalTreeString
      );
  }
};

// would love to have copy properties here.. :(
TreeCompare.compareAllBranchesWithinTreesAndHEAD = function(treeToCompare, goalTree) {
  treeToCompare = this.convertTreeSafe(treeToCompare);
  goalTree = this.convertTreeSafe(goalTree);

  // also compare tags!! for just one level
  return treeToCompare.HEAD.target === goalTree.HEAD.target &&
    this.compareAllBranchesWithinTrees(treeToCompare, goalTree) &&
    this.compareAllTagsWithinTrees(treeToCompare, goalTree);
};

TreeCompare.compareAllBranchesAndEnforceBranchCleanup = function(treeToCompare, goalTree) {
  treeToCompare = this.convertTreeSafe(treeToCompare);
  goalTree = this.convertTreeSafe(goalTree);

  // Unlike compareAllBranchesWithinTrees, here we consider both the branches
  // in the goalTree and the branches in the treeToCompare. This means that
  // we enforce that you clean up any branches that you have locally that
  // the goal does not have. this is helpful when we want to verify that you
  // have deleted branch, for instance.
  var allBranches = Object.assign(
    {},
    treeToCompare.branches,
    goalTree.branches
  );
  return Object.keys(allBranches).every(function(branch) {
    return this.compareBranchWithinTrees(treeToCompare, goalTree, branch);
  }.bind(this));
};


TreeCompare.compareAllBranchesWithinTrees = function(treeToCompare, goalTree) {
  treeToCompare = this.convertTreeSafe(treeToCompare);
  goalTree = this.convertTreeSafe(goalTree);

  /**
   * Disclaimer / reminder!! We only care about branches in the goal tree;
   * if you have extra branches in your source tree thats ok. but that means
   * the arguments here are important -- always call this function with
   * goalTree being the latter argument, since we will discard extra branches
   * from treeToCompare (the first argument).
   */
  return Object.keys(goalTree.branches).every(function(branch) {
    return this.compareBranchWithinTrees(treeToCompare, goalTree, branch);
  }.bind(this));
};

TreeCompare.compareAllTagsWithinTrees = function(treeToCompare, goalTree) {
  treeToCompare = this.convertTreeSafe(treeToCompare);
  goalTree = this.convertTreeSafe(goalTree);
  this.reduceTreeFields([treeToCompare, goalTree]);

  return _.isEqual(treeToCompare.tags, goalTree.tags);
};

TreeCompare.compareBranchesWithinTrees = function(treeToCompare, goalTree, branches) {
  var result = true;
  branches.forEach(function(branchName) {
    result = result && this.compareBranchWithinTrees(treeToCompare, goalTree, branchName);
  }, this);

  return result;
};

TreeCompare.compareBranchWithinTrees = function(treeToCompare, goalTree, branchName) {
  treeToCompare = this.convertTreeSafe(treeToCompare);
  goalTree = this.convertTreeSafe(goalTree);
  this.reduceTreeFields([treeToCompare, goalTree]);

  var recurseCompare = this.getRecurseCompare(treeToCompare, goalTree);
  var branchA = treeToCompare.branches[branchName];
  var branchB = goalTree.branches[branchName];

  return _.isEqual(branchA, branchB) &&
    recurseCompare(treeToCompare.commits[branchA.target], goalTree.commits[branchB.target]);
};

TreeCompare.compareAllBranchesWithinTreesHashAgnostic = function(treeToCompare, goalTree) {
  treeToCompare = this.convertTreeSafe(treeToCompare);
  goalTree = this.convertTreeSafe(goalTree);
  this.reduceTreeFields([treeToCompare, goalTree]);

  var allBranches = Object.assign(
    {},
    treeToCompare.branches,
    goalTree.branches
  );
  var branchNames = Object.keys(allBranches || {});

  return this.compareBranchesWithinTreesHashAgnostic(treeToCompare, goalTree, branchNames);
};

TreeCompare.compareBranchesWithinTreesHashAgnostic = function(treeToCompare, goalTree, branches) {
  // we can't DRY unfortunately here because we need a special _.isEqual function
  // for both the recursive compare and the branch compare
  treeToCompare = this.convertTreeSafe(treeToCompare);
  goalTree = this.convertTreeSafe(goalTree);
  this.reduceTreeFields([treeToCompare, goalTree]);

  // get a function to compare branch objects without hashes
  var compareBranchObjs = function(branchA, branchB) {
    if (!branchA || !branchB) {
      return false;
    }

    // don't mess up the rest of comparison
    branchA = Object.assign({}, branchA);
    branchB = Object.assign({}, branchB);
    branchA.target = this.getBaseRef(branchA.target);
    branchB.target = this.getBaseRef(branchB.target);

    return _.isEqual(branchA, branchB);
  }.bind(this);
  // and a function to compare recursively without worrying about hashes
  var recurseCompare = this.getRecurseCompareHashAgnostic(treeToCompare, goalTree);

  var result = true;
  branches.forEach(function(branchName) {
    var branchA = treeToCompare.branches[branchName];
    var branchB = goalTree.branches[branchName];

    result = result && compareBranchObjs(branchA, branchB) &&
      recurseCompare(treeToCompare.commits[branchA.target], goalTree.commits[branchB.target]);
  }, this);
  return result;
};

TreeCompare.evalAsserts = function(tree, assertsPerBranch) {
  var result = true;
  Object.keys(assertsPerBranch).forEach(function(branchName) {
    var asserts = assertsPerBranch[branchName];
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
  var numCommits = 0;
  while (queue.length) {
    var commitRef = queue.pop();
    data[this.getBaseRef(commitRef)] = this.getNumHashes(commitRef);
    queue = queue.concat(tree.commits[commitRef].parents);
    numCommits++;
  }
  data['__num_commits_upstream'] = numCommits;

  var result = true;
  asserts.forEach(function(assert) {
    try {
      result = result && assert(data);
    } catch (err) {
      console.warn('error during assert', err);
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
  throw new Error('couldn\'t parse ref ' + ref);
};

TreeCompare.getBaseRef = function(ref) {
  var idRegex = /^C(\d+)/;
  var bits = idRegex.exec(ref);
  if (!bits) { throw new Error('no regex matchy for ' + ref); }
  // no matter what hash this is (aka C1', C1'', C1'^3, etc) we
  // return C1
  return 'C' + bits[1];
};

TreeCompare.getRecurseCompareHashAgnostic = function(treeToCompare, goalTree) {
  // here we pass in a special comparison function to pass into the base
  // recursive compare.

  // some buildup functions
  var getStrippedCommitCopy = function(commit) {
    if (!commit) { return {}; }
    return Object.assign(
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
  return this.getRecurseCompare(treeToCompare, goalTree, {isEqual: isEqual});
};

TreeCompare.getRecurseCompare = function(treeToCompare, goalTree, options) {
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
    for (var index = 0; index < maxNumParents; index++) {
      var pAid = commitA.parents[index];
      var pBid = commitB.parents[index];

      // if treeToCompare or goalTree doesn't have this parent,
      // then we get an undefined child which is fine when we pass into _.isEqual
      var childA = treeToCompare.commits[pAid];
      var childB = goalTree.commits[pBid];

      result = result && recurseCompare(childA, childB);
    }
    // if each of our children recursively are equal, we are good
    return result;
  };
  return recurseCompare;
};

TreeCompare.lowercaseTree = function(tree) {
  if (tree.HEAD) {
    tree.HEAD.target = tree.HEAD.target.toLocaleLowerCase();
  }

  var branches = tree.branches || {};
  tree.branches = {};
  Object.keys(branches).forEach(function(name) {
    var obj = branches[name];
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

  trees.forEach(function(tree) {
    Object.keys(treeDefaults).forEach(function(key) {
      var val = treeDefaults[key];
      if (tree[key] === undefined) {
        tree[key] = val;
      }
    });
  });

  // this function saves only the specified fields of a tree
  var saveOnly = function(tree, treeKey, saveFields, sortFields) {
    var objects = tree[treeKey];
    Object.keys(objects).forEach(function(objKey) {
      var obj = objects[objKey];
      // our blank slate to copy over
      var blank = {};
      saveFields.forEach(function(field) {
        if (obj[field] !== undefined) {
          blank[field] = obj[field];
        } else if (defaults[field] !== undefined) {
          blank[field] = defaults[field];
        }
      });

      Object.values(sortFields || {}).forEach(function(field) {
        // also sort some fields
        if (obj[field]) {
          obj[field].sort();
          blank[field] = obj[field];
        }
      });
      tree[treeKey][objKey] = blank;
    });
  };

  trees.forEach(function(tree) {
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

TreeCompare.compareTrees = function(treeToCompare, goalTree) {
  treeToCompare = this.convertTreeSafe(treeToCompare);
  goalTree = this.convertTreeSafe(goalTree);

  // now we need to strip out the fields we don't care about, aka things
  // like createTime, message, author
  this.reduceTreeFields([treeToCompare, goalTree]);

  return _.isEqual(treeToCompare, goalTree);
};

module.exports = TreeCompare;
