var _ = require('underscore');
var Backbone = require('backbone');
var Q = require('q');

var intl = require('../intl');

var AnimationFactory = require('../visuals/animation/animationFactory').AnimationFactory;
var AnimationQueue = require('../visuals/animation').AnimationQueue;
var TreeCompare = require('../graph/treeCompare');

var Graph = require('../graph');
var Errors = require('../util/errors');
var Main = require('../app');
var Commands = require('../commands');
var GitError = Errors.GitError;
var CommandResult = Errors.CommandResult;

var ORIGIN_PREFIX = 'o/';
var TAB = '&nbsp;&nbsp;&nbsp;';
var SHORT_CIRCUIT_CHAIN = 'STAPH';

function catchShortCircuit(err) {
  if (err !== SHORT_CIRCUIT_CHAIN) {
    throw err;
  }
}

function GitEngine(options) {
  this.rootCommit = null;
  this.refs = {};
  this.HEAD = null;
  this.origin = null;
  this.mode = 'git';
  this.localRepo = null;

  this.branchCollection = options.branches;
  this.tagCollection = options.tags;
  this.commitCollection = options.collection;
  this.gitVisuals = options.gitVisuals;

  this.eventBaton = options.eventBaton;
  this.eventBaton.stealBaton('processGitCommand', this.dispatch, this);

  // poor man's dependency injection. we cant reassign
  // the module variable because its get clobbered :P
  this.animationFactory = (options.animationFactory) ?
    options.animationFactory : AnimationFactory;

  this.initUniqueID();
}

GitEngine.prototype.initUniqueID = function() {
  // backbone or something uses _ .uniqueId, so we make our own here
  this.uniqueId = (function() {
    var n = 0;
    return function(prepend) {
      return prepend ? prepend + n++ : n++;
    };
  })();
};

GitEngine.prototype.handleModeChange = function(vcs, callback) {
  if (this.mode === vcs) {
    // dont fire event aggressively
    callback();
    return;
  }
  Main.getEvents().trigger('vcsModeChange', {mode: vcs});
  var chain = this.setMode(vcs);
  if (this.origin) {
    this.origin.setMode(vcs, function() {});
  }

  if (!chain) {
    callback();
    return;
  }
  // we have to do it async
  chain.then(callback);
};

GitEngine.prototype.getIsHg = function() {
  return this.mode === 'hg';
};

GitEngine.prototype.setMode = function(vcs) {
  var switchedToHg = (this.mode === 'git' && vcs === 'hg');
  this.mode = vcs;
  if (!switchedToHg) {
    return;
  }
  // if we are switching to mercurial then we have some
  // garbage collection and other tidying up to do. this
  // may or may not require a refresh so lets check.
  var deferred = Q.defer();
  deferred.resolve();
  var chain = deferred.promise;

  // this stuff is tricky because we dont animate when
  // we didnt do anything, but we DO animate when
  // either of the operations happen. so a lot of
  // branching ahead...
  var neededUpdate = this.updateAllBranchesForHg();
  if (neededUpdate) {
    chain = chain.then(function() {
      return this.animationFactory.playRefreshAnimationSlow(this.gitVisuals);
    }.bind(this));

    // ok we need to refresh anyways, so do the prune after
    chain = chain.then(function() {
      var neededPrune = this.pruneTree();
      if (!neededPrune) {
        return;
      }
      return this.animationFactory.playRefreshAnimation(this.gitVisuals);
    }.bind(this));

    return chain;
  }

  // ok might need prune though
  var pruned = this.pruneTree();
  if (!pruned) {
    // do sync
    return;
  }

  return this.animationFactory.playRefreshAnimation(this.gitVisuals);
};

GitEngine.prototype.assignLocalRepo = function(repo) {
  this.localRepo = repo;
};

GitEngine.prototype.defaultInit = function() {
  var defaultTree = Graph.getDefaultTree();
  this.loadTree(defaultTree);
};

GitEngine.prototype.init = function() {
  // make an initial commit and a master branch
  this.rootCommit = this.makeCommit(null, null, {rootCommit: true});
  this.commitCollection.add(this.rootCommit);

  var master = this.makeBranch('master', this.rootCommit);
  this.HEAD = new Ref({
    id: 'HEAD',
    target: master
  });
  this.refs[this.HEAD.get('id')] = this.HEAD;

  // commit once to get things going
  this.commit();
};

GitEngine.prototype.hasOrigin = function() {
  return !!this.origin;
};

GitEngine.prototype.isOrigin = function() {
  return !!this.localRepo;
};

GitEngine.prototype.exportTreeForBranch = function(branchName) {
  // this method exports the tree and then prunes everything that
  // is not connected to branchname
  var tree = this.exportTree();
  // get the upstream set
  var set = Graph.getUpstreamSet(this, branchName);
  // now loop through and delete commits
  var commitsToLoop = tree.commits;
  tree.commits = {};
  _.each(commitsToLoop, function(commit, id) {
    if (set[id]) {
      // if included in target branch
      tree.commits[id] = commit;
    }
  });

  var branchesToLoop = tree.branches;
  tree.branches = {};
  _.each(branchesToLoop, function(branch, id) {
    if (id === branchName) {
      tree.branches[id] = branch;
    }
  });

  tree.HEAD.target = branchName;
  return tree;
};

GitEngine.prototype.exportTree = function() {
  // need to export all commits, their connectivity / messages, branches, and state of head.
  // this would be simple if didn't have circular structures.... :P
  // thus, we need to loop through and "flatten" our graph of objects referencing one another
  var totalExport = {
    branches: {},
    commits: {},
    tags: {},
    HEAD: null
  };

  _.each(this.branchCollection.toJSON(), function(branch) {
    branch.target = branch.target.get('id');
    delete branch.visBranch;

    totalExport.branches[branch.id] = branch;
  });

  _.each(this.commitCollection.toJSON(), function(commit) {
    // clear out the fields that reference objects and create circular structure
    _.each(Commit.prototype.constants.circularFields, function(field) {
      delete commit[field];
    }, this);

    // convert parents
    var parents = [];
    _.each(commit.parents, function(par) {
      parents.push(par.get('id'));
    });
    commit.parents = parents;

    totalExport.commits[commit.id] = commit;
  }, this);

  _.each(this.tagCollection.toJSON(), function(tag) {
    delete tag.visTag;
    tag.target = tag.target.get('id');

    totalExport.tags[tag.id] = tag;
  }, this);

  var HEAD = this.HEAD.toJSON();
  HEAD.lastTarget = HEAD.lastLastTarget = HEAD.visBranch = HEAD.visTag = undefined;
  HEAD.target = HEAD.target.get('id');
  totalExport.HEAD = HEAD;

  if (this.hasOrigin()) {
    totalExport.originTree = this.origin.exportTree();
  }

  return totalExport;
};

GitEngine.prototype.printTree = function(tree) {
  tree = tree || this.exportTree();
  TreeCompare.reduceTreeFields([tree]);

  var str = JSON.stringify(tree);
  if (/'/.test(str)) {
    // escape it to make it more copy paste friendly
    str = escape(str);
  }
  return str;
};

GitEngine.prototype.printAndCopyTree = function() {
  window.prompt(
    intl.str('Copy the tree string below'),
    this.printTree()
  );
};

GitEngine.prototype.loadTree = function(tree) {
  // deep copy in case we use it a bunch. lol awesome copy method
  tree = JSON.parse(JSON.stringify(tree));

  // first clear everything
  this.removeAll();

  this.instantiateFromTree(tree);

  this.reloadGraphics();
  this.initUniqueID();
};

GitEngine.prototype.loadTreeFromString = function(treeString) {
  this.loadTree(JSON.parse(unescape(this.crappyUnescape(treeString))));
};

GitEngine.prototype.instantiateFromTree = function(tree) {
  // now we do the loading part
  var createdSoFar = {};

  _.each(tree.commits, function(commitJSON) {
    var commit = this.getOrMakeRecursive(tree, createdSoFar, commitJSON.id, this.gitVisuals);
    this.commitCollection.add(commit);
  }, this);

  _.each(tree.branches, function(branchJSON) {
    var branch = this.getOrMakeRecursive(tree, createdSoFar, branchJSON.id, this.gitVisuals);

    this.branchCollection.add(branch, {silent: true});
  }, this);

  _.each(tree.tags, function(tagJSON) {
    var tag = this.getOrMakeRecursive(tree, createdSoFar, tagJSON.id, this.gitVisuals);

    this.tagCollection.add(tag, {silent: true});
  }, this);

  var HEAD = this.getOrMakeRecursive(tree, createdSoFar, tree.HEAD.id, this.gitVisuals);
  this.HEAD = HEAD;

  this.rootCommit = createdSoFar['C0'];
  if (!this.rootCommit) {
    throw new Error('Need root commit of C0 for calculations');
  }
  this.refs = createdSoFar;

  this.gitVisuals.gitReady = false;
  this.branchCollection.each(function(branch) {
        this.gitVisuals.addBranch(branch);
      }, this);
  this.tagCollection.each(function(tag) {
        this.gitVisuals.addTag(tag);
      }, this);

  if (tree.originTree) {
    var treeString = JSON.stringify(tree.originTree);
    // if we dont have an animation queue (like when loading
    // right away), just go ahead and make an empty one
    this.animationQueue = this.animationQueue || new AnimationQueue({
      callback: function() {}
    });
    this.makeOrigin(treeString);
  }
};

GitEngine.prototype.makeOrigin = function(treeString) {
  if (this.hasOrigin()) {
    throw new GitError({
      msg: intl.str('git-error-origin-exists')
    });
  }
  treeString = treeString || this.printTree(this.exportTreeForBranch('master'));

  // this is super super ugly but a necessary hack because of the way LGB was
  // originally designed. We need to get to the top level visualization from
  // the git engine -- aka we need to access our own visuals, then the
  // visualization and ask the main vis to create a new vis/git pair. Then
  // we grab the gitengine out of that and assign that as our origin repo
  // which connects the two. epic
  var masterVis = this.gitVisuals.getVisualization();
  var originVis = masterVis.makeOrigin({
    localRepo: this,
    treeString: treeString
  });

  // defer the starting of our animation until origin has been created
  this.animationQueue.set('promiseBased', true);
  originVis.customEvents.on('gitEngineReady', function() {
    this.origin = originVis.gitEngine;
    originVis.gitEngine.assignLocalRepo(this);
    this.syncRemoteBranchFills();
    // and then here is the crazy part -- we need the ORIGIN to refresh
    // itself in a separate animation. @_____@
    this.origin.externalRefresh();
    this.animationFactory.playRefreshAnimationAndFinish(this.gitVisuals, this.animationQueue);
  }, this);

  var originTree = JSON.parse(unescape(treeString));
  // make an origin branch for each branch mentioned in the tree if its
  // not made already...
  _.each(originTree.branches, function(branchJSON, branchName) {
    if (this.refs[ORIGIN_PREFIX + branchName]) {
      // we already have this branch
      return;
    }

    var originTarget = this.findCommonAncestorWithRemote(
      branchJSON.target
    );

    // now we have something in common, lets make the tracking branch
    var remoteBranch = this.makeBranch(
      ORIGIN_PREFIX + branchName,
      this.getCommitFromRef(originTarget)
    );

    this.setLocalToTrackRemote(this.refs[branchJSON.id], remoteBranch);
  }, this);
};

GitEngine.prototype.makeRemoteBranchIfNeeded = function(branchName) {
  if (this.refs[ORIGIN_PREFIX + branchName]) {
    return;
  }
  // if its not a branch on origin then bounce
  var source = this.origin.resolveID(branchName);
  if (source.get('type') !== 'branch') {
    return;
  }

  return this.makeRemoteBranchForRemote(branchName);
};

GitEngine.prototype.makeBranchIfNeeded = function(branchName) {
  if (this.refs[branchName]) {
    return;
  }
  var where = this.findCommonAncestorForRemote(
    this.getCommitFromRef('HEAD').get('id')
  );

  return this.validateAndMakeBranch(branchName, this.getCommitFromRef(where));
};

GitEngine.prototype.makeRemoteBranchForRemote = function(branchName) {
  var target = this.origin.refs[branchName].get('target');
  var originTarget = this.findCommonAncestorWithRemote(
    target.get('id')
  );
  return this.makeBranch(
    ORIGIN_PREFIX + branchName,
    this.getCommitFromRef(originTarget)
  );
};

GitEngine.prototype.findCommonAncestorForRemote = function(myTarget) {
  // like the method below but opposite
  while (!this.origin.refs[myTarget]) {
    var parents = this.refs[myTarget].get('parents');
    myTarget = parents[0].get('id');
  }
  return myTarget;
};

GitEngine.prototype.findCommonAncestorWithRemote = function(originTarget) {
  // now this is tricky -- our remote could have commits that we do
  // not have. so lets go upwards until we find one that we have
  while (!this.refs[originTarget]) {
    var parents = this.origin.refs[originTarget].get('parents');
    originTarget = parents[0].get('id');
  }
  return originTarget;
};

GitEngine.prototype.makeBranchOnOriginAndTrack = function(branchName, target) {
  var remoteBranch = this.makeBranch(
    ORIGIN_PREFIX + branchName,
    this.getCommitFromRef(target)
  );

  if (this.refs[branchName]) { // not all remote branches have tracking ones
    this.setLocalToTrackRemote(this.refs[branchName], remoteBranch);
  }

  var originTarget = this.findCommonAncestorForRemote(
    this.getCommitFromRef(target).get('id')
  );
  this.origin.makeBranch(
    branchName,
    this.origin.getCommitFromRef(originTarget)
  );
};

GitEngine.prototype.setLocalToTrackRemote = function(localBranch, remoteBranch) {
  localBranch.setRemoteTrackingBranchID(remoteBranch.get('id'));

  if (!this.command) {
    // during init we have no command
    return;
  }

  var msg = 'local branch "' +
    localBranch.get('id') +
    '" set to track remote branch "' +
    remoteBranch.get('id') +
    '"';
  this.command.addWarning(intl.todo(msg));
};

GitEngine.prototype.getOrMakeRecursive = function(
  tree,
  createdSoFar,
  objID,
  gitVisuals
) {
  if (createdSoFar[objID]) {
    // base case
    return createdSoFar[objID];
  }

  var getType = function(tree, id) {
    if (tree.commits[id]) {
      return 'commit';
    } else if (tree.branches[id]) {
      return 'branch';
    } else if (id == 'HEAD') {
      return 'HEAD';
    } else if (tree.tags[id]) {
      return 'tag';
    }
    throw new Error("bad type for " + id);
  };

  // figure out what type
  var type = getType(tree, objID);

  if (type == 'HEAD') {
    var headJSON = tree.HEAD;
    var HEAD = new Ref(_.extend(
      tree.HEAD,
      {
        target: this.getOrMakeRecursive(tree, createdSoFar, headJSON.target)
      }
    ));
    createdSoFar[objID] = HEAD;
    return HEAD;
  }

  if (type == 'branch') {
    var branchJSON = tree.branches[objID];

    var branch = new Branch(_.extend(
      tree.branches[objID],
      {
        target: this.getOrMakeRecursive(tree, createdSoFar, branchJSON.target)
      }
    ));
    createdSoFar[objID] = branch;
    return branch;
  }

  if (type == 'tag') {
    var tagJSON = tree.tags[objID];

    var tag = new Tag(_.extend(
      tree.tags[objID],
      {
        target: this.getOrMakeRecursive(tree, createdSoFar, tagJSON.target)
      }
    ));
    createdSoFar[objID] = tag;
    return tag;
  }

  if (type == 'commit') {
    // for commits, we need to grab all the parents
    var commitJSON = tree.commits[objID];

    var parentObjs = [];
    _.each(commitJSON.parents, function(parentID) {
      parentObjs.push(this.getOrMakeRecursive(tree, createdSoFar, parentID));
    }, this);

    var commit = new Commit(_.extend(
      commitJSON,
      {
        parents: parentObjs,
        gitVisuals: this.gitVisuals
      }
    ));
    createdSoFar[objID] = commit;
    return commit;
  }

  throw new Error('ruh rho!! unsupported type for ' + objID);
};

GitEngine.prototype.tearDown = function() {
  if (this.tornDown) {
    return;
  }
  this.eventBaton.releaseBaton('processGitCommand', this.dispatch, this);
  this.removeAll();
  this.tornDown = true;
};

GitEngine.prototype.reloadGraphics = function() {
  // get the root commit
  this.gitVisuals.rootCommit = this.refs['C0'];
  // this just basically makes the HEAD branch. the head branch really should have been
  // a member of a collection and not this annoying edge case stuff... one day
  this.gitVisuals.initHeadBranch();

  // when the paper is ready
  this.gitVisuals.drawTreeFromReload();

  this.gitVisuals.refreshTreeHarsh();
};

GitEngine.prototype.removeAll = function() {
  this.branchCollection.reset();
  this.tagCollection.reset();
  this.commitCollection.reset();
  this.refs = {};
  this.HEAD = null;
  this.rootCommit = null;

  if (this.origin) {
    // we will restart all this jazz during init from tree
    this.origin.gitVisuals.getVisualization().tearDown();
    delete this.origin;
    this.gitVisuals.getVisualization().clearOrigin();
  }

  this.gitVisuals.resetAll();
};

GitEngine.prototype.getDetachedHead = function() {
  // detached head is if HEAD points to a commit instead of a branch...
  var target = this.HEAD.get('target');
  var targetType = target.get('type');
  return targetType !== 'branch';
};

GitEngine.prototype.validateBranchName = function(name) {
  // Lets escape some of the nasty characters
  name = name.replace(/&#x2F;/g,"\/");
  name = name.replace(/\s/g, '');
  // And then just make sure it starts with alpha-numeric,
  // can contain a slash or dash, and then ends with alpha
  if (
    !/^(\w+[.\/\-]?)+\w+$/.test(name) ||
    name.search('o/') === 0
  ) {
    throw new GitError({
      msg: intl.str(
        'bad-branch-name',
        { branch: name }
      )
    });
  }
  if (/^[cC]\d+$/.test(name)) {
    throw new GitError({
      msg: intl.str(
        'bad-branch-name',
        { branch: name }
      )
    });
  }
  if (/[hH][eE][aA][dD]/.test(name)) {
    throw new GitError({
      msg: intl.str(
        'bad-branch-name',
        { branch: name }
      )
    });
  }
  if (name.length > 9) {
    name = name.slice(0, 9);
    this.command.addWarning(
      intl.str(
        'branch-name-short',
        { branch: name }
      )
    );
  }
  return name;
};

GitEngine.prototype.validateAndMakeBranch = function(id, target) {
  id = this.validateBranchName(id);
  if (this.refs[id]) {
    throw new GitError({
      msg: intl.str(
        'bad-branch-name',
        { branch: id }
      )
    });
  }

  return this.makeBranch(id, target);
};

GitEngine.prototype.validateAndMakeTag = function(id, target) {
  id = this.validateBranchName(id);
  if (this.refs[id]) {
    throw new GitError({
      msg: intl.str(
        'bad-tag-name',
        { tag: name }
      )
    });
  }

  this.makeTag(id, target);
};

GitEngine.prototype.makeBranch = function(id, target) {
  if (this.refs[id]) {
    throw new Error('woah already have that');
  }

  var branch = new Branch({
    target: target,
    id: id
  });
  this.branchCollection.add(branch);
  this.refs[branch.get('id')] = branch;
  return branch;
};

GitEngine.prototype.makeTag = function(id, target) {
  if (this.refs[id]) {
    throw new Error('woah already have that');
  }

  var tag = new Tag({
    target: target,
    id: id
  });
  this.tagCollection.add(tag);
  this.refs[tag.get('id')] = tag;
  return tag;
};

GitEngine.prototype.getHead = function() {
  return _.clone(this.HEAD);
};

GitEngine.prototype.getTags = function() {
  var toReturn = [];
  this.tagCollection.each(function(tag) {
    toReturn.push({
      id: tag.get('id'),
      target: tag.get('target'),
      remote: tag.getIsRemote(),
      obj: tag
    });
  }, this);
  return toReturn;
};

GitEngine.prototype.getBranches = function() {
  var toReturn = [];
  this.branchCollection.each(function(branch) {
    toReturn.push({
      id: branch.get('id'),
      selected: this.HEAD.get('target') === branch,
      target: branch.get('target'),
      remote: branch.getIsRemote(),
      obj: branch
    });
  }, this);
  return toReturn;
};

GitEngine.prototype.getRemoteBranches = function() {
  var all = this.getBranches();
  return _.filter(all, function(branchJSON) {
    return branchJSON.remote === true;
  });
};

GitEngine.prototype.getLocalBranches = function() {
  var all = this.getBranches();
  return _.filter(all, function(branchJSON) {
    return branchJSON.remote === false;
  });
};

GitEngine.prototype.printBranchesWithout = function(without) {
  var commitToBranches = this.getUpstreamBranchSet();
  var commitID = this.getCommitFromRef(without).get('id');

  var toPrint = [];
  _.each(commitToBranches[commitID], function(branchJSON) {
    branchJSON.selected = this.HEAD.get('target').get('id') == branchJSON.id;
    toPrint.push(branchJSON);
  }, this);
  this.printBranches(toPrint);
};

GitEngine.prototype.printBranches = function(branches) {
  var result = '';
  _.each(branches, function(branch) {
    result += (branch.selected ? '* ' : '') + branch.id + '\n';
  });
  throw new CommandResult({
    msg: result
  });
};

GitEngine.prototype.printTags = function(tags) {
  var result = '';
  _.each(tags, function(tag) {
    result += tag.id + '\n';
  });
  throw new CommandResult({
    msg: result
  });
};

GitEngine.prototype.printRemotes = function(options) {
  var result = '';
  if (options.verbose) {
    result += 'origin (fetch)\n';
    result += TAB + 'git@github.com:pcottle/foo.git' + '\n\n';
    result += 'origin (push)\n';
    result += TAB + 'git@github.com:pcottle/foo.git';
  } else {
    result += 'origin';
  }
  throw new CommandResult({
    msg: result
  });
};

GitEngine.prototype.getUniqueID = function() {
  var id = this.uniqueId('C');

  var hasID = function(idToCheck) {
    // loop through and see if we have it locally or
    // remotely
    if (this.refs[idToCheck]) {
      return true;
    }
    if (this.origin && this.origin.refs[idToCheck]) {
      return true;
    }
    return false;
  }.bind(this);

  while (hasID(id)) {
    id = this.uniqueId('C');
  }
  return id;
};

GitEngine.prototype.makeCommit = function(parents, id, options) {
  // ok we need to actually manually create commit IDs now because
  // people like nikita (thanks for finding this!) could
  // make branches named C2 before creating the commit C2
  if (!id) {
    id = this.getUniqueID();
  }

  var commit = new Commit(_.extend({
      parents: parents,
      id: id,
      gitVisuals: this.gitVisuals
    },
    options || {}
  ));

  this.refs[commit.get('id')] = commit;
  this.commitCollection.add(commit);
  return commit;
};

GitEngine.prototype.revert = function(whichCommits) {
  // resolve the commits we will rebase
  var toRevert = _.map(whichCommits, function(stringRef) {
    return this.getCommitFromRef(stringRef);
  }, this);

  var deferred = Q.defer();
  var chain = deferred.promise;
  var destBranch = this.resolveID('HEAD');

  chain = this.animationFactory.highlightEachWithPromise(
    chain,
    toRevert,
    destBranch
  );

  var base = this.getCommitFromRef('HEAD');
  // each step makes a new commit
  var chainStep = function(oldCommit) {
    var newId = this.rebaseAltID(oldCommit.get('id'));
    var commitMessage = intl.str('git-revert-msg', {
      oldCommit: this.resolveName(oldCommit),
      oldMsg: oldCommit.get('commitMessage')
    });
    var newCommit = this.makeCommit([base], newId, {
      commitMessage: commitMessage
    });
    base = newCommit;

    return this.animationFactory.playCommitBirthPromiseAnimation(
      newCommit,
      this.gitVisuals
    );
  }.bind(this);

  // set up the promise chain
  _.each(toRevert, function(commit) {
    chain = chain.then(function() {
      return chainStep(commit);
    });
  }, this);

  // done! update our location
  chain = chain.then(function() {
    this.setTargetLocation('HEAD', base);
    return this.animationFactory.playRefreshAnimation(this.gitVisuals);
  }.bind(this));

  this.animationQueue.thenFinish(chain, deferred);
};

GitEngine.prototype.reset = function(target) {
  this.setTargetLocation('HEAD', this.getCommitFromRef(target));
};

GitEngine.prototype.setupCherrypickChain = function(toCherrypick) {
  // error checks are all good, lets go!
  var deferred = Q.defer();
  var chain = deferred.promise;
  var destinationBranch = this.resolveID('HEAD');

  chain = this.animationFactory.highlightEachWithPromise(
    chain,
    toCherrypick,
    destinationBranch
  );

  var chainStep = function(commit) {
    var newCommit = this.cherrypick(commit);
    return this.animationFactory.playCommitBirthPromiseAnimation(
      newCommit,
      this.gitVisuals
    );
  }.bind(this);

  _.each(toCherrypick, function(arg) {
    chain = chain.then(function() {
      return chainStep(arg);
    });
  }, this);

  this.animationQueue.thenFinish(chain, deferred);
};

/*************************************
 * Origin stuff!
 ************************************/

GitEngine.prototype.checkUpstreamOfSource = function(
  target,
  source,
  targetBranch,
  sourceBranch,
  errorMsg
) {
  // here we are downloading some X number of commits from source onto
  // target. Hence target should be strictly upstream of source

  // lets first get the upstream set from source's dest branch
  var upstream = Graph.getUpstreamSet(source, sourceBranch);

  var targetLocationID = target.getCommitFromRef(targetBranch).get('id');
  if (!upstream[targetLocationID]) {
    throw new GitError({
      msg: errorMsg || intl.str('git-error-origin-fetch-no-ff')
    });
  }
};

GitEngine.prototype.getTargetGraphDifference = function(
  target,
  source,
  targetBranch,
  sourceBranch,
  options
) {
  options = options || {};
  sourceBranch = source.resolveID(sourceBranch);

  var targetSet = Graph.getUpstreamSet(target, targetBranch);
  var sourceStartCommit = source.getCommitFromRef(sourceBranch);

  var sourceTree = source.exportTree();
  var sourceStartCommitJSON = sourceTree.commits[sourceStartCommit.get('id')];

  if (targetSet[sourceStartCommitJSON.id]) {
    // either we throw since theres no work to be done, or we return an empty array
    if (options.dontThrowOnNoFetch) {
      return [];
    } else {
      throw new GitError({
        msg: intl.str('git-error-origin-fetch-uptodate')
      });
    }
  }

  // ok great, we have our starting point and our stopping set. lets go ahead
  // and traverse upwards and keep track of depth manually
  sourceStartCommitJSON.depth = 0;
  var difference = [];
  var toExplore = [sourceStartCommitJSON];

  var pushParent = function(parentID) {
    if (targetSet[parentID]) {
      // we already have that commit, lets bounce
      return;
    }

    var parentJSON = sourceTree.commits[parentID];
    parentJSON.depth = here.depth + 1;
    toExplore.push(parentJSON);
  };

  while (toExplore.length) {
    var here = toExplore.pop();
    difference.push(here);
    _.each(here.parents, pushParent);
  }

  // filter because we werent doing graph search
  var differenceUnique = Graph.getUniqueObjects(difference);
  /**
   * Ok now we have to determine the order in which to make these commits.
   * We used to just sort by depth because we were lazy but that is incorrect
   * since it doesnt represent the actual dependency tree of the commits.
   *
   * So here is what we are going to do -- loop through the differenceUnique
   * set and find a commit that has _all_ its parents in the targetSet. Then
   * decide to make that commit first, expand targetSet, and then rinse & repeat
   */
  var inOrder = [];
  var allParentsMade = function(node) {
    var allParents = true;
    node.parents.forEach(function(parent) {
      allParents = allParents && targetSet[parent];
    });
    return allParents;
  };

  while (differenceUnique.length) {
    for (var i = 0; i < differenceUnique.length; i++) {
      if (!allParentsMade(differenceUnique[i])) {
        // This commit cannot be made since not all of its dependencies are
        // satisfied.
        continue;
      }

      var makeThis = differenceUnique[i];
      inOrder.push(makeThis);
      // remove the commit
      differenceUnique.splice(i, 1);
      // expand target set
      targetSet[makeThis.id] = true;
    }
  }
  return inOrder;
};

GitEngine.prototype.push = function(options) {
  options = options || {};

  if (options.source === "") {
    // delete case
    this.pushDeleteRemoteBranch(
      this.refs[ORIGIN_PREFIX + options.destination],
      this.origin.refs[options.destination]
    );
    return;
  }

  var sourceBranch = this.refs[options.source];
  if (!this.origin.refs[options.destination]) {
    this.makeBranchOnOriginAndTrack(
      options.destination,
      this.getCommitFromRef(sourceBranch)
    );
    // play an animation now since we might not have to fast forward
    // anything... this is weird because we are punting an animation
    // and not resolving the promise but whatever
    this.animationFactory.playRefreshAnimation(this.origin.gitVisuals);
    this.animationFactory.playRefreshAnimation(this.gitVisuals);
  }
  var branchOnRemote = this.origin.refs[options.destination];
  var sourceLocation = this.resolveID(options.source || 'HEAD');

  // first check if this is even allowed by checking the sync between
  if (!options.force) {
    this.checkUpstreamOfSource(
      this,
      this.origin,
      branchOnRemote,
      sourceLocation,
      intl.str('git-error-origin-push-no-ff')
    );
  }

  var commitsToMake = this.getTargetGraphDifference(
    this.origin,
    this,
    branchOnRemote,
    sourceLocation,
    /* options */ {
      dontThrowOnNoFetch: true,
    }
  );
  if (!commitsToMake.length) {
    if (!options.force) {
      // We are already up to date, and we cant be deleting
      // either since we dont have --force
      throw new GitError({
        msg: intl.str('git-error-origin-fetch-uptodate')
      });
    } else {
      var sourceCommit = this.getCommitFromRef(sourceBranch);
      var originCommit = this.getCommitFromRef(branchOnRemote);
      if (sourceCommit.id === originCommit.id) {
        // This is essentially also being up to date
        throw new GitError({
          msg: intl.str('git-error-origin-fetch-uptodate')
        });
      }
      // Otherwise fall through! We will update origin
      // and essentially delete the commit
    }
  }

  // now here is the tricky part -- the difference between local master
  // and remote master might be commits C2, C3, and C4, but the remote
  // might already have those commits. In this case, we dont need to
  // make them, so filter these out
  commitsToMake = _.filter(commitsToMake, function(commitJSON) {
    return !this.origin.refs[commitJSON.id];
  }, this);

  var makeCommit = function(id, parentIDs) {
    // need to get the parents first. since we order by depth, we know
    // the dependencies are there already
    var parents = _.map(parentIDs, function(parentID) {
      return this.origin.refs[parentID];
    }, this);
    return this.origin.makeCommit(parents, id);
  }.bind(this);

  // now make the promise chain to make each commit
  var chainStep = function(id, parents) {
    var newCommit = makeCommit(id, parents);
    return this.animationFactory.playCommitBirthPromiseAnimation(
      newCommit,
      this.origin.gitVisuals
    );
  }.bind(this);

  var deferred = Q.defer();
  var chain = deferred.promise;

  _.each(commitsToMake, function(commitJSON) {
    chain = chain.then(function() {
      return this.animationFactory.playHighlightPromiseAnimation(
        this.refs[commitJSON.id],
        branchOnRemote
      );
    }.bind(this));

    chain = chain.then(function() {
      return chainStep(
        commitJSON.id,
        commitJSON.parents
      );
    });
  }, this);

  chain = chain.then(function() {
    var localLocationID = this.getCommitFromRef(sourceLocation).get('id');
    var remoteCommit = this.origin.refs[localLocationID];
    this.origin.setTargetLocation(branchOnRemote, remoteCommit);
    // unhighlight local
    this.animationFactory.playRefreshAnimation(this.gitVisuals);
    return this.animationFactory.playRefreshAnimation(this.origin.gitVisuals);
  }.bind(this));

  // HAX HAX update master and remote tracking for master
  chain = chain.then(function() {
    var localCommit = this.getCommitFromRef(sourceLocation);
    this.setTargetLocation(this.refs[ORIGIN_PREFIX + options.destination], localCommit);
    return this.animationFactory.playRefreshAnimation(this.gitVisuals);
  }.bind(this));

  if (!options.dontResolvePromise) {
    this.animationQueue.thenFinish(chain, deferred);
  }
};

GitEngine.prototype.pushDeleteRemoteBranch = function(
  remoteBranch,
  branchOnRemote
) {
  if (branchOnRemote.get('id') === 'master') {
    throw new GitError({
      msg: intl.todo('You cannot delete master branch on remote!')
    });
  }
  // ok so this isn't too bad -- we basically just:
  // 1) instruct the remote to delete the branch
  // 2) kill off the remote branch locally
  // 3) find any branches tracking this remote branch and set them to not track
  var id = remoteBranch.get('id');
  this.origin.deleteBranch(branchOnRemote);
  this.deleteBranch(remoteBranch);
  this.branchCollection.each(function(branch) {
    if (branch.getRemoteTrackingBranchID() === id) {
      branch.setRemoteTrackingBranchID(null);
    }
  }, this);

  // animation needs to be triggered on origin directly
  this.origin.pruneTree();
  this.origin.externalRefresh();
};

GitEngine.prototype.fetch = function(options) {
  options = options || {};
  var didMakeBranch;

  // first check for super stupid case where we are just making
  // a branch with fetch...
  if (options.destination && options.source === '') {
    this.validateAndMakeBranch(
      options.destination,
      this.getCommitFromRef('HEAD')
    );
    return;
  } else if (options.destination && options.source) {
    didMakeBranch = didMakeBranch || this.makeRemoteBranchIfNeeded(options.source);
    didMakeBranch = didMakeBranch || this.makeBranchIfNeeded(options.destination);
    options.didMakeBranch = didMakeBranch;

    return this.fetchCore([{
        destination: options.destination,
        source: options.source
      }],
      options
    );
  }
  // get all remote branches and specify the dest / source pairs
  var allBranchesOnRemote = this.origin.branchCollection.toArray();
  var sourceDestPairs = _.map(allBranchesOnRemote, function(branch) {
    var branchName = branch.get('id');
    didMakeBranch = didMakeBranch || this.makeRemoteBranchIfNeeded(branchName);

    return {
      destination: branch.getPrefixedID(),
      source: branchName
    };
  }, this);
  options.didMakeBranch = didMakeBranch;
  return this.fetchCore(sourceDestPairs, options);
};

GitEngine.prototype.fetchCore = function(sourceDestPairs, options) {
  // first check if our local remote branch is upstream of the origin branch set.
  // this check essentially pretends the local remote branch is in origin and
  // could be fast forwarded (basic sanity check)
  _.each(sourceDestPairs, function(pair) {
    this.checkUpstreamOfSource(
      this,
      this.origin,
      pair.destination,
      pair.source
    );
  }, this);

  // then we get the difference in commits between these two graphs
  var commitsToMake = [];
  _.each(sourceDestPairs, function(pair) {
    commitsToMake = commitsToMake.concat(this.getTargetGraphDifference(
      this,
      this.origin,
      pair.destination,
      pair.source,
      _.extend(
        {},
        options,
        {dontThrowOnNoFetch: true}
      )
    ));
  }, this);

  if (!commitsToMake.length && !options.dontThrowOnNoFetch) {
    throw new GitError({
      msg: intl.str('git-error-origin-fetch-uptodate')
    });
  }

  // we did this for each remote branch, but we still need to reduce to unique
  // and sort. in this particular app we can never have unfected remote
  // commits that are upstream of multiple branches (since the fakeTeamwork
  // command simply commits), but we are doing it anyways for correctness
  commitsToMake = Graph.getUniqueObjects(commitsToMake);
  commitsToMake = Graph.descendSortDepth(commitsToMake);

  // now here is the tricky part -- the difference between local master
  // and remote master might be commits C2, C3, and C4, but we
  // might already have those commits. In this case, we dont need to
  // make them, so filter these out
  commitsToMake = _.filter(commitsToMake, function(commitJSON) {
    return !this.refs[commitJSON.id];
  }, this);

  var makeCommit = function(id, parentIDs) {
    // need to get the parents first. since we order by depth, we know
    // the dependencies are there already
    var parents = _.map(parentIDs, function(parentID) {
      return this.refs[parentID];
    }, this);
    return this.makeCommit(parents, id);
  }.bind(this);

  // now make the promise chain to make each commit
  var chainStep = function(id, parents) {
    var newCommit = makeCommit(id, parents);
    return this.animationFactory.playCommitBirthPromiseAnimation(
      newCommit,
      this.gitVisuals
    );
  }.bind(this);

  var deferred = Q.defer();
  var chain = deferred.promise;
  if (options.didMakeBranch) {
    chain = chain.then(function() {
      this.animationFactory.playRefreshAnimation(this.origin.gitVisuals);
      return this.animationFactory.playRefreshAnimation(this.gitVisuals);
    }.bind(this));
  }

  var originBranchSet = this.origin.getUpstreamBranchSet();
  _.each(commitsToMake, function(commitJSON) {
    // technically we could grab the wrong one here
    // but this works for now
    var originBranch = originBranchSet[commitJSON.id][0].obj;
    var localBranch = this.refs[originBranch.getPrefixedID()];

    chain = chain.then(function() {
      return this.animationFactory.playHighlightPromiseAnimation(
        this.origin.refs[commitJSON.id],
        localBranch
      );
    }.bind(this));

    chain = chain.then(function() {
      return chainStep(
        commitJSON.id,
        commitJSON.parents
      );
    });
  }, this);

  chain = chain.then(function() {
    // update all the destinations
    _.each(sourceDestPairs, function(pair) {
      var ours = this.refs[pair.destination];
      var theirCommitID = this.origin.getCommitFromRef(pair.source).get('id');
      // by definition we just made the commit with this id,
      // so we can grab it now
      var localCommit = this.refs[theirCommitID];
      this.setTargetLocation(ours, localCommit);
    }, this);

    // unhighlight origin by refreshing
    this.animationFactory.playRefreshAnimation(this.origin.gitVisuals);
    return this.animationFactory.playRefreshAnimation(this.gitVisuals);
  }.bind(this));

  if (!options.dontResolvePromise) {
    this.animationQueue.thenFinish(chain, deferred);
  }
  return {
    chain: chain,
    deferred: deferred
  };
};

GitEngine.prototype.pull = function(options) {
  options = options || {};
  var localBranch = this.getOneBeforeCommit('HEAD');

  // no matter what fetch
  var pendingFetch = this.fetch({
    dontResolvePromise: true,
    dontThrowOnNoFetch: true,
    source: options.source,
    destination: options.destination
  });

  if (!pendingFetch) {
    // short circuited for some reason
    return;
  }

  var destBranch = this.refs[options.destination];
  // then either rebase or merge
  if (options.isRebase) {
    this.pullFinishWithRebase(pendingFetch, localBranch, destBranch);
  } else {
    this.pullFinishWithMerge(pendingFetch, localBranch, destBranch);
  }
};

GitEngine.prototype.pullFinishWithRebase = function(
  pendingFetch,
  localBranch,
  remoteBranch
) {
  var chain = pendingFetch.chain;
  var deferred = pendingFetch.deferred;
  chain = chain.then(function() {
    if (this.isUpstreamOf(remoteBranch, localBranch)) {
      this.command.set('error', new CommandResult({
        msg: intl.str('git-result-uptodate')
      }));
      throw SHORT_CIRCUIT_CHAIN;
    }
  }.bind(this));

  // delay a bit after the intense refresh animation from
  // fetch
  chain = chain.then(function() {
    return this.animationFactory.getDelayedPromise(300);
  }.bind(this));

  chain = chain.then(function() {
    // highlight last commit on o/master to color of
    // local branch
    return this.animationFactory.playHighlightPromiseAnimation(
      this.getCommitFromRef(remoteBranch),
      localBranch
    );
  }.bind(this));

  chain = chain.then(function() {
    pendingFetch.dontResolvePromise = true;

    // Lets move the git pull --rebase check up here.
    if (this.isUpstreamOf(localBranch, remoteBranch)) {
      this.setTargetLocation(
        localBranch,
        this.getCommitFromRef(remoteBranch)
      );
      this.checkout(localBranch);
      return this.animationFactory.playRefreshAnimation(this.gitVisuals);
    }

    try {
      return this.rebase(remoteBranch, localBranch, pendingFetch);
    } catch (err) {
      this.filterError(err);
      if (err.getMsg() !== intl.str('git-error-rebase-none')) {
        throw err;
      }
      this.setTargetLocation(
        localBranch,
        this.getCommitFromRef(remoteBranch)
      );
      this.checkout(localBranch);
      return this.animationFactory.playRefreshAnimation(this.gitVisuals);
    }
  }.bind(this));
  chain = chain.fail(catchShortCircuit);

  this.animationQueue.thenFinish(chain, deferred);
};

GitEngine.prototype.pullFinishWithMerge = function(
  pendingFetch,
  localBranch,
  remoteBranch
) {
  var chain = pendingFetch.chain;
  var deferred = pendingFetch.deferred;

  chain = chain.then(function() {
    if (this.mergeCheck(remoteBranch, localBranch)) {
      this.command.set('error', new CommandResult({
        msg: intl.str('git-result-uptodate')
      }));
      throw SHORT_CIRCUIT_CHAIN;
    }
  }.bind(this));

  // delay a bit after the intense refresh animation from
  // fetch
  chain = chain.then(function() {
    return this.animationFactory.getDelayedPromise(300);
  }.bind(this));

  chain = chain.then(function() {
    // highlight last commit on o/master to color of
    // local branch
    return this.animationFactory.playHighlightPromiseAnimation(
      this.getCommitFromRef(remoteBranch),
      localBranch
    );
  }.bind(this));

  chain = chain.then(function() {
    // highlight commit on master to color of remote
    return this.animationFactory.playHighlightPromiseAnimation(
      this.getCommitFromRef(localBranch),
      remoteBranch
    );
  }.bind(this));

  // delay and merge
  chain = chain.then(function() {
    return this.animationFactory.getDelayedPromise(700);
  }.bind(this));
  chain = chain.then(function() {
    var newCommit = this.merge(remoteBranch);
    if (!newCommit) {
      // it is a fast forward
      return this.animationFactory.playRefreshAnimation(this.gitVisuals);
    }

    return this.animationFactory.playCommitBirthPromiseAnimation(
      newCommit,
      this.gitVisuals
    );
  }.bind(this));
  chain = chain.fail(catchShortCircuit);

  this.animationQueue.thenFinish(chain, deferred);
};

GitEngine.prototype.fakeTeamwork = function(numToMake, branch) {
  var makeOriginCommit = function() {
    var id = this.getUniqueID();
    return this.origin.receiveTeamwork(id, branch, this.animationQueue);
  }.bind(this);

  var chainStep = function() {
    var newCommit = makeOriginCommit();
    return this.animationFactory.playCommitBirthPromiseAnimation(
      newCommit,
      this.origin.gitVisuals
    );
  }.bind(this);

  var deferred = Q.defer();
  var chain = deferred.promise;

  _.each(_.range(numToMake), function(i) {
    chain = chain.then(function() {
      return chainStep();
    });
  });
  this.animationQueue.thenFinish(chain, deferred);
};

GitEngine.prototype.receiveTeamwork = function(id, branch, animationQueue) {
  this.checkout(this.resolveID(branch));
  var newCommit = this.makeCommit([this.getCommitFromRef('HEAD')], id);
  this.setTargetLocation(this.HEAD, newCommit);

  return newCommit;
};

GitEngine.prototype.cherrypick = function(commit) {
  // alter the ID slightly
  var id = this.rebaseAltID(commit.get('id'));

  // now commit with that id onto HEAD
  var newCommit = this.makeCommit([this.getCommitFromRef('HEAD')], id);
  this.setTargetLocation(this.HEAD, newCommit);

  return newCommit;
};

GitEngine.prototype.commit = function(options) {
  options = options || {};
  var targetCommit = this.getCommitFromRef(this.HEAD);
  var id = null;

  // if we want to amend, go one above
  if (options.isAmend) {
    targetCommit = this.resolveID('HEAD~1');
    id = this.rebaseAltID(this.getCommitFromRef('HEAD').get('id'));
  }

  var newCommit = this.makeCommit([targetCommit], id);
  if (this.getDetachedHead() && this.mode === 'git') {
    this.command.addWarning(intl.str('git-warning-detached'));
  }

  this.setTargetLocation(this.HEAD, newCommit);
  return newCommit;
};

GitEngine.prototype.resolveName = function(someRef) {
  // first get the obj
  var obj = this.resolveID(someRef);
  if (obj.get('type') == 'commit') {
    return 'commit ' + obj.get('id');
  }
  if (obj.get('type') == 'branch') {
    return 'branch "' + obj.get('id') + '"';
  }
  // we are dealing with HEAD
  return this.resolveName(obj.get('target'));
};

GitEngine.prototype.resolveID = function(idOrTarget) {
  if (idOrTarget === null || idOrTarget === undefined) {
    throw new Error('Dont call this with null / undefined');
  }

  if (typeof idOrTarget !== 'string') {
    return idOrTarget;
  }
  return this.resolveStringRef(idOrTarget);
};

GitEngine.prototype.resolveRelativeRef = function(commit, relative) {
  var regex = /([~\^])(\d*)/g;
  var matches;

  while (matches = regex.exec(relative)) {
    var next = commit;
    var num = matches[2] ? parseInt(matches[2], 10) : 1;

    if (matches[1] == '^') {
      next = commit.getParent(num-1);
    } else {
      while (next && num--) {
        next = next.getParent(0);
      }
    }

    if (!next) {
      var msg = intl.str('git-error-relative-ref', {
        commit: commit.id,
        match: matches[0]
      });
      throw new GitError({
        msg: msg
      });
    }

    commit = next;
  }

  return commit;
};

GitEngine.prototype.resolveStringRef = function(ref) {
  ref = this.crappyUnescape(ref);
  if (this.refs[ref]) {
    return this.refs[ref];
  }

  // Attempt to split ref string into a reference and a string of ~ and ^ modifiers.
  var startRef = null;
  var relative = null;
  var regex = /^([a-zA-Z0-9]+)(([~\^]\d*)*)/;
  var matches = regex.exec(ref);
  if (matches) {
    startRef = matches[1];
    relative = matches[2];
  } else {
    throw new GitError({
      msg: intl.str('git-error-exist', {ref: ref})
    });
  }

  if (!this.refs[startRef]) {
    throw new GitError({
      msg: intl.str('git-error-exist', {ref: ref})
    });
  }
  var commit = this.getCommitFromRef(startRef);

  if (relative) {
    commit = this.resolveRelativeRef( commit, relative );
  }

  return commit;
};

GitEngine.prototype.getCommitFromRef = function(ref) {
  var start = this.resolveID(ref);

  // works for both HEAD and just a single layer. aka branch
  while (start.get('type') !== 'commit') {
    start = start.get('target');
  }
  return start;
};

GitEngine.prototype.getType = function(ref) {
  return this.resolveID(ref).get('type');
};

GitEngine.prototype.setTargetLocation = function(ref, target) {
  if (this.getType(ref) == 'commit') {
    // nothing to do
    return;
  }

  // sets whatever ref is (branch, HEAD, etc) to a target. so if
  // you pass in HEAD, and HEAD is pointing to a branch, it will update
  // the branch to that commit, not the HEAD
  ref = this.getOneBeforeCommit(ref);
  ref.set('target', target);
};

GitEngine.prototype.updateBranchesFromSet = function(commitSet) {
  if (!commitSet) {
    throw new Error('need commit set here');
  }
  // commitSet is the set of commits that are stale or moved or whatever.
  // any branches POINTING to these commits need to be moved!

  // first get a list of what branches influence what commits
  var upstreamSet = this.getUpstreamBranchSet();

  var branchesToUpdate = {};
  // now loop over the set we got passed in and find which branches
  // that means (aka intersection)
  _.each(commitSet, function(val, id) {
    _.each(upstreamSet[id], function(branchJSON) {
        branchesToUpdate[branchJSON.id] = true;
    });
  }, this);

  var branchList = _.map(branchesToUpdate, function(val, id) {
    return id;
  });
  return this.updateBranchesForHg(branchList);
};

GitEngine.prototype.updateAllBranchesForHgAndPlay = function(branchList) {
  return this.updateBranchesForHg(branchList) &&
    this.animationFactory.playRefreshAnimationSlow(this.gitVisuals);
};

GitEngine.prototype.updateAllBranchesForHg = function() {
  var branchList = this.branchCollection.map(function(branch) {
    return branch.get('id');
  });
  return this.updateBranchesForHg(branchList);
};

GitEngine.prototype.syncRemoteBranchFills = function() {
  this.branchCollection.each(function(branch) {
    if (!branch.getIsRemote()) {
      return;
    }
    var originBranch = this.origin.refs[branch.getBaseID()];
    if (!originBranch.get('visBranch')) {
      // testing mode doesnt get this
      return;
    }
    var originFill = originBranch.get('visBranch').get('fill');
    branch.get('visBranch').set('fill', originFill);
  }, this);
};

GitEngine.prototype.updateBranchesForHg = function(branchList) {
  var hasUpdated = false;
  _.each(branchList, function(branchID) {
    // ok now just check if this branch has a more recent commit available.
    // that mapping is easy because we always do rebase alt id --
    // theres no way to have C3' and C3''' but no C3''. so just
    // bump the ID once -- if thats not filled in we are updated,
    // otherwise loop until you find undefined
    var commitID = this.getCommitFromRef(branchID).get('id');
    var altID = this.getBumpedID(commitID);
    if (!this.refs[altID]) {
      return;
    }
    hasUpdated = true;

    var lastID;
    while (this.refs[altID]) {
      lastID = altID;
      altID = this.rebaseAltID(altID);
    }

    // last ID is the one we want to update to
    this.setTargetLocation(this.refs[branchID], this.refs[lastID]);
  }, this);

  if (!hasUpdated) {
    return false;
  }
  return true;
};

GitEngine.prototype.updateCommitParentsForHgRebase = function(commitSet) {
  var anyChange = false;
  _.each(commitSet, function(val, commitID) {
    var commit = this.refs[commitID];
    var thisUpdated = commit.checkForUpdatedParent(this);
    anyChange = anyChange || thisUpdated;
  }, this);
  return anyChange;
};

GitEngine.prototype.pruneTreeAndPlay = function() {
  return this.pruneTree() &&
    this.animationFactory.playRefreshAnimationSlow(this.gitVisuals);
};

GitEngine.prototype.pruneTree = function() {
  var set = this.getUpstreamBranchSet();
  // dont prune commits that HEAD depends on
  var headSet = Graph.getUpstreamSet(this, 'HEAD');
  _.each(headSet, function(val, commitID) {
    set[commitID] = true;
  });

  var toDelete = [];
  this.commitCollection.each(function(commit) {
    // nothing cares about this commit :(
    if (!set[commit.get('id')]) {
      toDelete.push(commit);
    }
  }, this);

  if (!toDelete.length) {
    // returning nothing will perform
    // the switch sync
    return;
  }
  if (this.command) {
    this.command.addWarning(intl.str('hg-prune-tree'));
  }

  _.each(toDelete, function(commit) {
    commit.removeFromParents();
    this.commitCollection.remove(commit);

    var ID = commit.get('id');
    this.refs[ID] = undefined;
    delete this.refs[ID];

    var visNode = commit.get('visNode');
    if (visNode) {
      visNode.removeAll();
    }
  }, this);

  return true;
};

GitEngine.prototype.getUpstreamBranchSet = function() {
  return this.getUpstreamCollectionSet(this.branchCollection);
};

GitEngine.prototype.getUpstreamTagSet = function() {
  return this.getUpstreamCollectionSet(this.tagCollection);
};

GitEngine.prototype.getUpstreamCollectionSet = function(collection) {
  // this is expensive!! so only call once in a while
  var commitToSet = {};

  var inArray = function(arr, id) {
    var found = false;
    _.each(arr, function(wrapper) {
      if (wrapper.id == id) {
        found = true;
      }
    });

    return found;
  };

  var bfsSearch = function(commit) {
    var set = [];
    var pQueue = [commit];
    while (pQueue.length) {
      var popped = pQueue.pop();
      set.push(popped.get('id'));

      if (popped.get('parents') && popped.get('parents').length) {
        pQueue = pQueue.concat(popped.get('parents'));
      }
    }
    return set;
  };

  collection.each(function(ref) {
    var set = bfsSearch(ref.get('target'));
    _.each(set, function(id) {
      commitToSet[id] = commitToSet[id] || [];

      // only add it if it's not there, so hue blending is ok
      if (!inArray(commitToSet[id], ref.get('id'))) {
        commitToSet[id].push({
          obj: ref,
          id: ref.get('id')
        });
      }
    });
  });

  return commitToSet;
};

GitEngine.prototype.getUpstreamHeadSet = function() {
  var set = Graph.getUpstreamSet(this, 'HEAD');
  var including = this.getCommitFromRef('HEAD').get('id');

  set[including] = true;
  return set;
};

GitEngine.prototype.getOneBeforeCommit = function(ref) {
  // you can call this command on HEAD in detached, HEAD, or on a branch
  // and it will return the ref that is one above a commit. aka
  // it resolves HEAD to something that we can move the ref with
  var start = this.resolveID(ref);
  if (start === this.HEAD && !this.getDetachedHead()) {
    start = start.get('target');
  }
  return start;
};

GitEngine.prototype.scrapeBaseID = function(id) {
  var results = /^C(\d+)/.exec(id);

  if (!results) {
    throw new Error('regex failed on ' + id);
  }

  return 'C' + results[1];
};

/*
 * grabs a bumped ID that is NOT currently reserved
 */
GitEngine.prototype.rebaseAltID = function(id) {
  var newID = this.getBumpedID(id);
  while (this.refs[newID]) {
    newID = this.getBumpedID(newID);
  }
  return newID;
};

GitEngine.prototype.getMostRecentBumpedID = function(id) {
  var newID = id;
  var lastID;
  while (this.refs[newID]) {
    lastID = newID;
    newID = this.getBumpedID(newID);
  }
  return lastID;
};

GitEngine.prototype.getBumpedID = function(id) {
  // this function alters an ID to add a quote to the end,
  // indicating that it was rebased.
  var regexMap = [
    [/^C(\d+)[']{0,2}$/, function(bits) {
      // this id can use another quote, so just add it
      return bits[0] + "'";
    }],
    [/^C(\d+)[']{3}$/, function(bits) {
      // here we switch from C''' to C'^4
      return bits[0].slice(0, -3) + "'^4";
    }],
    [/^C(\d+)['][\^](\d+)$/, function(bits) {
      return 'C' + String(bits[1]) + "'^" + String(Number(bits[2]) + 1);
    }]
  ];

  // for loop for early return (instead of _.each)
  for (var i = 0; i < regexMap.length; i++) {
    var regex = regexMap[i][0];
    var func = regexMap[i][1];
    var results = regex.exec(id);
    if (results) {
      return func(results);
    }
  }
  throw new Error('could not modify the id ' + id);
};

GitEngine.prototype.idSortFunc = function(cA, cB) {
  // commit IDs can come in many forms:
  //  C4
  //  C4' (from a rebase)
  //  C4'' (from multiple rebases)
  //  C4'^3 (from a BUNCH of rebases)

  var scale = 1000;

  var regexMap = [
    [/^C(\d+)$/, function(bits) {
      // return the 4 from C4
      return scale * bits[1];
    }],
    [/^C(\d+)([']+)$/, function(bits) {
      // return the 4 from C4, plus the length of the quotes
      return scale * bits[1] + bits[2].length;
    }],
    [/^C(\d+)['][\^](\d+)$/, function(bits) {
      return scale * bits[1] + Number(bits[2]);
    }]
  ];

  var getNumToSort = function(id) {
    for (var i = 0; i < regexMap.length; i++) {
      var regex = regexMap[i][0];
      var func = regexMap[i][1];
      var results = regex.exec(id);
      if (results) {
        return func(results);
      }
    }
    throw new Error('Could not parse commit ID ' + id);
  };

  return getNumToSort(cA.get('id')) - getNumToSort(cB.get('id'));
};

GitEngine.prototype.dateSortFunc = function(cA, cB) {
  var dateA = new Date(cA.get('createTime'));
  var dateB = new Date(cB.get('createTime'));
  if (dateA - dateB === 0) {
    // hmmmmm this still needs fixing. we need to know basically just WHEN a commit was created, but since
    // we strip off the date creation field, when loading a tree from string this fails :-/
    // there's actually no way to determine it...
    //c.warn('WUT it is equal');
    //c.log(cA, cB);
    return GitEngine.prototype.idSortFunc(cA, cB);
  }
  return dateA - dateB;
};

GitEngine.prototype.hgRebase = function(destination, base) {
  var deferred = Q.defer();
  var chain = this.rebase(destination, base, {
    dontResolvePromise: true,
    deferred: deferred
  });

  // was upstream or something
  if (!chain) {
    return;
  }

  // ok lets grab the merge base first
  var commonAncestor = this.getCommonAncestor(destination, base);
  var baseCommit = this.getCommitFromRef(base);
  // we need everything BELOW ourselves...
  var downstream = this.getDownstreamSet(base);
  // and we need to go upwards to the stop set
  var stopSet = Graph.getUpstreamSet(this, destination);
  var upstream = this.getUpstreamDiffSetFromSet(stopSet, base);

  // and NOWWWwwww get all the descendants of this set
  var moreSets = [];
  _.each(upstream, function(val, id) {
    moreSets.push(this.getDownstreamSet(id));
  }, this);

  var masterSet = {};
  masterSet[baseCommit.get('id')] = true;
  _.each([upstream, downstream].concat(moreSets), function(set) {
    _.each(set, function(val, id) {
      masterSet[id] = true;
    });
  });

  // we also need the branches POINTING to master set
  var branchMap = {};
  var upstreamSet = this.getUpstreamBranchSet();
  _.each(masterSet, function(val, commitID) {
    // now loop over that commits branches
    _.each(upstreamSet[commitID], function(branchJSON) {
      branchMap[branchJSON.id] = true;
    });
  });

  var branchList = _.map(branchMap, function(val, id) {
    return id;
  });

  chain = chain.then(function() {
    // now we just moved a bunch of commits, but we havent updated the
    // dangling guys. lets do that and then prune
    var anyChange = this.updateCommitParentsForHgRebase(masterSet);
    if (!anyChange) {
      return;
    }
    return this.animationFactory.playRefreshAnimationSlow(this.gitVisuals);
  }.bind(this));

  chain = chain.then(function() {
    return this.updateAllBranchesForHgAndPlay(branchList);
  }.bind(this));

  chain = chain.then(function() {
    // now that we have moved branches, lets prune
    return this.pruneTreeAndPlay();
  }.bind(this));

  this.animationQueue.thenFinish(chain, deferred);
};

GitEngine.prototype.rebase = function(targetSource, currentLocation, options) {
  // first some conditions
  debugger;
  if (this.isUpstreamOf(targetSource, currentLocation)) {
    this.command.setResult(intl.str('git-result-uptodate'));

    // git for some reason always checks out the branch you are rebasing,
    // no matter the result of the rebase
    this.checkout(currentLocation);

    // returning instead of throwing makes a tree refresh
    return;
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setTargetLocation(currentLocation, this.getCommitFromRef(targetSource));
    // we need the refresh tree animation to happen, so set the result directly
    // instead of throwing
    this.command.setResult(intl.str('git-result-fastforward'));

    this.checkout(currentLocation);
    return;
  }

  // now the part of actually rebasing.
  // We need to get the downstream set of targetSource first.
  // then we BFS from currentLocation, using the downstream set as our stopping point.
  // we need to BFS because we need to include all commits below
  // pop these commits on top of targetSource and modify their ids with quotes
  var stopSet = Graph.getUpstreamSet(this, targetSource);
  var toRebaseRough = this.getUpstreamDiffFromSet(stopSet, currentLocation);
  return this.rebaseFinish(toRebaseRough, stopSet, targetSource, currentLocation, options);
};

GitEngine.prototype.getUpstreamDiffSetFromSet = function(stopSet, location) {
  var set = {};
  _.each(this.getUpstreamDiffFromSet(stopSet, location), function(commit) {
    set[commit.get('id')] = true;
  });
  return set;
};

GitEngine.prototype.getUpstreamDiffFromSet = function(stopSet, location) {
  var result = Graph.bfsFromLocationWithSet(this, location, stopSet);
  result.sort(this.dateSortFunc);
  return result;
};

GitEngine.prototype.getInteractiveRebaseCommits = function(targetSource, currentLocation) {
  var stopSet = Graph.getUpstreamSet(this, targetSource);
  var toRebaseRough = [];

  // standard BFS
  var pQueue = [this.getCommitFromRef(currentLocation)];

  while (pQueue.length) {
    var popped = pQueue.pop();

    if (stopSet[popped.get('id')]) {
      continue;
    }

    toRebaseRough.push(popped);
    pQueue = pQueue.concat(popped.get('parents'));
    pQueue.sort(this.dateSortFunc);
  }

  // throw out merge's real fast and see if we have anything to do
  var toRebase = [];
  _.each(toRebaseRough, function(commit) {
    if (commit.get('parents').length == 1) {
      toRebase.push(commit);
    }
  });

  if (!toRebase.length) {
    throw new GitError({
      msg: intl.str('git-error-rebase-none')
    });
  }

  return toRebase;
};

GitEngine.prototype.rebaseInteractiveTest = function(targetSource, currentLocation, options) {
  options = options || {};

  // Get the list of commits that would be displayed to the user
  var toRebase = this.getInteractiveRebaseCommits(targetSource, currentLocation);

  var rebaseMap = {};
  _.each(toRebase, function(commit) {
    var id = commit.get('id');
    rebaseMap[id] = commit;
  });

  var rebaseOrder;
  if (options['interactiveTest'].length === 0) {
    // If no commits were explicitly specified for the rebase, act like the user didn't change anything
    // in the rebase dialog and hit confirm
    rebaseOrder = toRebase;
  } else {
    // Get the list and order of commits specified
    var idsToRebase = options['interactiveTest'][0].split(',');

    // Verify each chosen commit exists in the list of commits given to the user
    var extraCommits = [];
    rebaseOrder = [];
    _.each(idsToRebase, function(id) {
      if (id in rebaseMap) {
        rebaseOrder.push(rebaseMap[id]);
      } else {
        extraCommits.push(id);
      }
    });

    if (extraCommits.length > 0) {
      throw new GitError({
        msg: intl.todo('Hey those commits dont exist in the set!')
      });
    }
  }

  this.rebaseFinish(rebaseOrder, {}, targetSource, currentLocation);
};

GitEngine.prototype.rebaseInteractive = function(targetSource, currentLocation, options) {
  options = options || {};

  // there are a reduced set of checks now, so we can't exactly use parts of the rebase function
  // but it will look similar.
  var toRebase = this.getInteractiveRebaseCommits(targetSource, currentLocation);

  // now do stuff :D since all our validation checks have passed, we are going to defer animation
  // and actually launch the dialog
  this.animationQueue.set('defer', true);

  var deferred = Q.defer();
  deferred.promise
  .then(function(userSpecifiedRebase) {
    // first, they might have dropped everything (annoying)
    if (!userSpecifiedRebase.length) {
      throw new CommandResult({
        msg: intl.str('git-result-nothing')
      });
    }

    // finish the rebase crap and animate!
    this.rebaseFinish(userSpecifiedRebase, {}, targetSource, currentLocation);
  }.bind(this))
  .fail(function(err) {
    this.filterError(err);
    this.command.set('error', err);
    this.animationQueue.start();
  }.bind(this))
  .done();

  // If we have a solution provided, set up the GUI to display it by default
  var initialCommitOrdering;
  if (options.initialCommitOrdering && options.initialCommitOrdering.length > 0) {
    var rebaseMap = {};
    _.each(toRebase, function(commit) {
      rebaseMap[commit.get('id')] = true;
    });

    // Verify each chosen commit exists in the list of commits given to the user
    initialCommitOrdering = [];
    _.each(options.initialCommitOrdering[0].split(','), function(id) {
      if (!rebaseMap[id]) {
        throw new GitError({
          msg: intl.todo('Hey those commits dont exist in the set!')
        });
      }
      initialCommitOrdering.push(id);
    });
  }

  var InteractiveRebaseView = require('../views/rebaseView').InteractiveRebaseView;
  // interactive rebase view will reject or resolve our promise
  new InteractiveRebaseView({
    deferred: deferred,
    toRebase: toRebase,
    initialCommitOrdering: initialCommitOrdering,
    aboveAll: options.aboveAll
  });
};

GitEngine.prototype.filterRebaseCommits = function(
  toRebaseRough,
  stopSet,
  options
) {
  var changesAlreadyMade = {};
  _.each(stopSet, function(val, key) {
    changesAlreadyMade[this.scrapeBaseID(key)] = true;
  }, this);
  var uniqueIDs = {};

  // resolve the commits we will rebase
  return _.filter(toRebaseRough, function(commit) {
    // no merge commits, unless we preserve
    if (commit.get('parents').length !== 1 && !options.preserveMerges) {
      return false;
    }

    // we ALSO need to throw out commits that will do the same changes. like
    // if the upstream set has a commit C4 and we have C4', we dont rebase the C4' again.
    var baseID = this.scrapeBaseID(commit.get('id'));
    if (changesAlreadyMade[baseID]) {
      return false;
    }

    // make unique
    if (uniqueIDs[commit.get('id')]) {
      return false;
    }

    uniqueIDs[commit.get('id')] = true;
    return true;
  }, this);
};

GitEngine.prototype.getRebasePreserveMergesParents = function(oldCommit) {
  var oldParents = oldCommit.get('parents');
  return _.map(oldParents, function(parent) {
    var oldID = parent.get('id');
    var newID = this.getMostRecentBumpedID(oldID);
    return this.refs[newID];
  }, this);
};

GitEngine.prototype.rebaseFinish = function(
  toRebaseRough,
  stopSet,
  targetSource,
  currentLocation,
  options
) {
  options = options || {};
  // now we have the all the commits between currentLocation and the set of target to rebase.
  var destinationBranch = this.resolveID(targetSource);
  var deferred = options.deferred || Q.defer();
  var chain = options.chain || deferred.promise;

  var toRebase = this.filterRebaseCommits(toRebaseRough, stopSet, options);
  if (!toRebase.length) {
    throw new GitError({
      msg: intl.str('git-error-rebase-none')
    });
  }

  chain = this.animationFactory.highlightEachWithPromise(
    chain,
    toRebase,
    destinationBranch
  );

  // now pop all of these commits onto targetLocation
  var base = this.getCommitFromRef(targetSource);
  var hasStartedChain = false;
  // each step makes a new commit
  var chainStep = function(oldCommit) {
    var newId = this.rebaseAltID(oldCommit.get('id'));
    var parents;
    if (!options.preserveMerges || !hasStartedChain) {
      // easy logic since we just have a straight line
      parents = [base];
    } else { // preserving merges
      // we always define the parent for the first commit to plop,
      // otherwise search for most recent parents
      parents = (hasStartedChain) ?
        this.getRebasePreserveMergesParents(oldCommit) :
        [base];
    }

    var newCommit = this.makeCommit(parents, newId);
    base = newCommit;
    hasStartedChain = true;

    return this.animationFactory.playCommitBirthPromiseAnimation(
      newCommit,
      this.gitVisuals
    );
  }.bind(this);

  // set up the promise chain
  _.each(toRebase, function(commit) {
    chain = chain.then(function() {
      return chainStep(commit);
    });
  }, this);

  chain = chain.then(function() {
    if (this.resolveID(currentLocation).get('type') == 'commit') {
      // we referenced a commit like git rebase C2 C1, so we have
      // to manually check out C1'
      this.checkout(base);
    } else {
      // now we just need to update the rebased branch is
      this.setTargetLocation(currentLocation, base);
      this.checkout(currentLocation);
    }
    return this.animationFactory.playRefreshAnimation(this.gitVisuals);
  }.bind(this));

  if (!options.dontResolvePromise) {
    this.animationQueue.thenFinish(chain, deferred);
  }
  return chain;
};

GitEngine.prototype.mergeCheck = function(targetSource, currentLocation) {
  var sameCommit = this.getCommitFromRef(targetSource) ===
    this.getCommitFromRef(currentLocation);
  return this.isUpstreamOf(targetSource, currentLocation) || sameCommit;
};

GitEngine.prototype.merge = function(targetSource, options) {
  options = options || {};
  var currentLocation = 'HEAD';

  // first some conditions
  if (this.mergeCheck(targetSource, currentLocation)) {
    throw new CommandResult({
      msg: intl.str('git-result-uptodate')
    });
  }

  if (this.isUpstreamOf(currentLocation, targetSource) && !options.noFF) {
    // just set the target of this current location to the source
    this.setTargetLocation(currentLocation, this.getCommitFromRef(targetSource));
    // get fresh animation to happen
    this.command.setResult(intl.str('git-result-fastforward'));
    return;
  }

  // now the part of making a merge commit
  var parent1 = this.getCommitFromRef(currentLocation);
  var parent2 = this.getCommitFromRef(targetSource);

  // we need a fancy commit message
  var msg = intl.str(
    'git-merge-msg',
    {
      target: this.resolveName(targetSource),
      current: this.resolveName(currentLocation)
    }
  );
  // since we specify parent 1 as the first parent, it is the "main" parent
  // and the node will be displayed below that branch / commit / whatever
  var mergeCommit = this.makeCommit(
    [parent1, parent2],
    null,
    {
      commitMessage: msg
    }
  );

  this.setTargetLocation(currentLocation, mergeCommit);
  return mergeCommit;
};

GitEngine.prototype.checkout = function(idOrTarget) {
  var target = this.resolveID(idOrTarget);
  if (target.get('id') === 'HEAD') {
    // git checkout HEAD is a
    // meaningless command but i used to do this back in the day
    return;
  }

  var type = target.get('type');
  // check if this is an origin branch, and if so go to the commit referenced
  if (type === 'branch' && target.getIsRemote()) {
    target = this.getCommitFromRef(target.get('id'));
  }

  if (type !== 'branch' && type !== 'tag' && type !== 'commit') {
    throw new GitError({
      msg: intl.str('git-error-options')
    });
  }
  if (type === 'tag') {
    target = target.get('target');
  }

  this.HEAD.set('target', target);
};

GitEngine.prototype.forceBranch = function(branchName, where) {
  branchName = this.crappyUnescape(branchName);
  // if branchname doesn't exist...
  if (!this.refs[branchName]) {
    this.branch(branchName, where);
  }

  var branch = this.resolveID(branchName);

  if (branch.get('type') !== 'branch') {
    throw new GitError({
      msg: intl.str('git-error-options')
    });
  }
  if (branch.getIsRemote()) {
    throw new GitError({
      msg: intl.str('git-error-remote-branch')
    });
  }

  var whereCommit = this.getCommitFromRef(where);

  this.setTargetLocation(branch, whereCommit);
};

GitEngine.prototype.branch = function(name, ref) {
  var target = this.getCommitFromRef(ref);
  var newBranch = this.validateAndMakeBranch(name, target);

  ref = this.resolveID(ref);
  if (this.isRemoteBranchRef(ref)) {
    this.setLocalToTrackRemote(newBranch, ref);
  }
};

GitEngine.prototype.isRemoteBranchRef = function(ref) {
  var resolved = this.resolveID(ref);
  if (resolved.get('type') !== 'branch') {
    return false;
  }
  return resolved.getIsRemote();
};

GitEngine.prototype.tag = function(name, ref) {
  var target = this.getCommitFromRef(ref);
  this.validateAndMakeTag(name, target);
};

GitEngine.prototype.describe = function(ref) {
  var startCommit = this.getCommitFromRef(ref);
  // ok we need to BFS from start upwards until we hit a tag. but
  // first we need to get a reverse mapping from tag to commit
  var tagMap = {};
  _.each(this.tagCollection.toJSON(), function(tag) {
    tagMap[tag.target.get('id')] = tag.id;
  });

  var pQueue = [startCommit];
  var foundTag;
  var numAway = [];
  while (pQueue.length) {
    var popped = pQueue.pop();
    var thisID = popped.get('id');
    if (tagMap[thisID]) {
      foundTag = tagMap[thisID];
      break;
    }
    // ok keep going
    numAway.push(popped.get('id'));

    var parents = popped.get('parents');
    if (parents && parents.length) {
      pQueue = pQueue.concat(parents);
      pQueue.sort(this.dateSortFunc);
    }
  }

  if (!foundTag) {
    throw new GitError({
      msg: intl.todo('Fatal: no tags found upstream')
    });
  }

  if (numAway.length === 0) {
    throw new CommandResult({
      msg: foundTag
    });
  }

  // then join
  throw new CommandResult({
    msg: foundTag + '_' + numAway.length + '_g' + startCommit.get('id')
  });
};

GitEngine.prototype.validateAndDeleteBranch = function(name) {
  // trying to delete, lets check our refs
  var target = this.resolveID(name);

  if (target.get('type') !== 'branch' ||
      target.get('id') == 'master' ||
      this.HEAD.get('target') === target) {
    throw new GitError({
      msg: intl.str('git-error-branch')
    });
  }

  // now we know it's a branch
  var branch = target;
  // if its remote
  if (target.getIsRemote()) {
    throw new GitError({
      msg: intl.str('git-error-remote-branch')
    });
  }
  this.deleteBranch(branch);
};

GitEngine.prototype.deleteBranch = function(branch) {
  this.branchCollection.remove(branch);
  this.refs[branch.get('id')] = undefined;
  delete this.refs[branch.get('id')];
  // also in some cases external engines call our delete, so
  // verify integrity of HEAD here
  if (this.HEAD.get('target') === branch) {
    this.HEAD.set('target', this.refs['master']);
  }

  if (branch.get('visBranch')) {
    branch.get('visBranch').remove();
  }
};

GitEngine.prototype.crappyUnescape = function(str) {
  return str.replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/");
};

GitEngine.prototype.filterError = function(err) {
 if (!(err instanceof GitError ||
      err instanceof CommandResult)) {
    throw err;
  }
};

// called on a origin repo from a local -- simply refresh immediately with
// an animation
GitEngine.prototype.externalRefresh = function() {
  this.animationQueue = new AnimationQueue({
    callback: function() {}
  });
  this.animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
  this.animationQueue.start();
};

GitEngine.prototype.dispatch = function(command, deferred) {
  this.command = command;
  var vcs = command.get('vcs');
  var executeCommand = function() {
    this.dispatchProcess(command, deferred);
  }.bind(this);
  // handle mode change will either execute sync or
  // animate during tree pruning / etc
  this.handleModeChange(vcs, executeCommand);
};

GitEngine.prototype.dispatchProcess = function(command, deferred) {
  // set up the animation queue
  var whenDone = function() {
    command.finishWith(deferred);
  }.bind(this);
  this.animationQueue = new AnimationQueue({
    callback: whenDone
  });

  var vcs = command.get('vcs');
  var methodName = command.get('method').replace(/-/g, '');

  try {
    Commands.commands.execute(vcs, methodName, this, this.command);
  } catch (err) {
    this.filterError(err);
    // short circuit animation by just setting error and returning
    command.set('error', err);
    deferred.resolve();
    return;
  }

  var willStartAuto = this.animationQueue.get('defer') ||
    this.animationQueue.get('promiseBased');

  // only add the refresh if we didn't do manual animations
  if (!this.animationQueue.get('animations').length && !willStartAuto) {
    this.animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
  }

  // animation queue will call the callback when its done
  if (!willStartAuto) {
    this.animationQueue.start();
  }
};

GitEngine.prototype.show = function(ref) {
  var commit = this.getCommitFromRef(ref);

  throw new CommandResult({
    msg: commit.getShowEntry()
  });
};

GitEngine.prototype.status = function() {
  // UGLY todo
  var lines = [];
  if (this.getDetachedHead()) {
    lines.push(intl.str('git-status-detached'));
  } else {
    var branchName = this.HEAD.get('target').get('id');
    lines.push(intl.str('git-status-onbranch', {branch: branchName}));
  }
  lines.push('Changes to be committed:');
  lines.push('');
  lines.push(TAB + 'modified: cal/OskiCostume.stl');
  lines.push('');
  lines.push(intl.str('git-status-readytocommit'));

  var msg = '';
  _.each(lines, function(line) {
    msg += '# ' + line + '\n';
  });

  throw new CommandResult({
    msg: msg
  });
};

GitEngine.prototype.logWithout = function(ref, omitBranch) {
  // slice off the ^branch
  omitBranch = omitBranch.slice(1);
  this.log(ref, Graph.getUpstreamSet(this, omitBranch));
};

GitEngine.prototype.log = function(ref, omitSet) {
  // omit set is for doing stuff like git log branchA ^branchB
  omitSet = omitSet || {};
  // first get the commit we referenced
  var commit = this.getCommitFromRef(ref);

  // then get as many far back as we can from here, order by commit date
  var toDump = [];
  var pQueue = [commit];

  var seen = {};

  while (pQueue.length) {
    var popped = pQueue.shift(0);
    if (seen[popped.get('id')] || omitSet[popped.get('id')]) {
      continue;
    }
    seen[popped.get('id')] = true;

    toDump.push(popped);

    if (popped.get('parents') && popped.get('parents').length) {
      pQueue = pQueue.concat(popped.get('parents'));
    }
  }

  // now go through and collect logs
  var bigLogStr = '';
  _.each(toDump, function(c) {
    bigLogStr += c.getLogEntry();
  }, this);

  throw new CommandResult({
    msg: bigLogStr
  });
};

GitEngine.prototype.getCommonAncestor = function(ancestor, cousin) {
  if (this.isUpstreamOf(cousin, ancestor)) {
    throw new Error('Dont use common ancestor if we are upstream!');
  }

  var upstreamSet = Graph.getUpstreamSet(this, ancestor);
  // now BFS off of cousin until you find something

  var queue = [this.getCommitFromRef(cousin)];
  while (queue.length) {
    var here = queue.pop();
    if (upstreamSet[here.get('id')]) {
      return here;
    }
    queue = queue.concat(here.get('parents'));
  }
  throw new Error('something has gone very wrong... two nodes arent connected!');
};

GitEngine.prototype.isUpstreamOf = function(child, ancestor) {
  child = this.getCommitFromRef(child);

  // basically just do a completely BFS search on ancestor to the root, then
  // check for membership of child in that set of explored nodes
  var upstream = Graph.getUpstreamSet(this, ancestor);
  return upstream[child.get('id')] !== undefined;
};

GitEngine.prototype.getDownstreamSet = function(ancestor) {
  var commit = this.getCommitFromRef(ancestor);

  var ancestorID = commit.get('id');
  var queue = [commit];

  var exploredSet = {};
  exploredSet[ancestorID] = true;

  var addToExplored = function(child) {
    exploredSet[child.get('id')] = true;
    queue.push(child);
  };

  while (queue.length) {
    var here = queue.pop();
    var children = here.get('children');

    _.each(children, addToExplored);
  }
  return exploredSet;
};

var Ref = Backbone.Model.extend({
  initialize: function() {
    if (!this.get('target')) {
      throw new Error('must be initialized with target');
    }
    if (!this.get('id')) {
      throw new Error('must be given an id');
    }
    this.set('type', 'general ref');

    if (this.get('id') == 'HEAD') {
      this.set('lastLastTarget', null);
      this.set('lastTarget', this.get('target'));
      // have HEAD remember where it is for checkout -
      this.on('change:target', this.targetChanged, this);
    }
  },

  getIsRemote: function() {
    return false;
  },

  getName: function() {
    return this.get('id');
  },

  targetChanged: function(model, targetValue, ev) {
    // push our little 3 stack back. we need to do this because
    // backbone doesn't give you what the value WAS, only what it was changed
    // TO
    this.set('lastLastTarget', this.get('lastTarget'));
    this.set('lastTarget', targetValue);
  },

  toString: function() {
    return 'a ' + this.get('type') + 'pointing to ' + String(this.get('target'));
  }
});

var Branch = Ref.extend({
  defaults: {
    visBranch: null,
    remoteTrackingBranchID: null,
    remote: false
  },

  initialize: function() {
    Ref.prototype.initialize.call(this);
    this.set('type', 'branch');
  },

  /**
   * Here is the deal -- there are essentially three types of branches
   * we deal with:
   * 1) Normal local branches (that may track a remote branch)
   * 2) Local remote branches (o/master) that track an origin branch
   * 3) Origin branches (master) that exist in origin
   *
   * With that in mind, we change our branch model to support the following
   */
  setRemoteTrackingBranchID: function(id) {
    this.set('remoteTrackingBranchID', id);
  },

  getRemoteTrackingBranchID: function() {
    return this.get('remoteTrackingBranchID');
  },

  getPrefixedID: function() {
    if (this.getIsRemote()) {
      throw new Error('im already remote');
    }
    return ORIGIN_PREFIX + this.get('id');
  },

  getBaseID: function() {
    if (!this.getIsRemote()) {
      throw new Error('im not remote so cant get base');
    }
    return this.get('id').replace(ORIGIN_PREFIX, '');
  },

  getIsRemote: function() {
    if (typeof this.get('id') !== 'string') {
      debugger;
    }
    return this.get('id').slice(0, 2) === ORIGIN_PREFIX;
  }
});

var Commit = Backbone.Model.extend({
  defaults: {
    type: 'commit',
    children: null,
    parents: null,
    author: 'Peter Cottle',
    createTime: null,
    commitMessage: null,
    visNode: null,
    gitVisuals: null
  },

  constants: {
    circularFields: ['gitVisuals', 'visNode', 'children']
  },

  getLogEntry: function() {
    // for now we are just joining all these things with newlines which
    // will get placed by paragraph tags. Not really a fan of this, but
    // it's better than making an entire template and all that jazz
    return [
      'Author: ' + this.get('author'),
      'Date: ' + this.get('createTime'),
      '<br/>',
      this.get('commitMessage'),
      '<br/>',
      'Commit: ' + this.get('id')
    ].join('\n' ) + '\n';
  },

  getShowEntry: function() {
    // same deal as above, show log entry and some fake changes
    return [
      this.getLogEntry(),
      'diff --git a/bigGameResults.html b/bigGameResults.html',
      '--- bigGameResults.html',
      '+++ bigGameResults.html',
      '@@ 13,27 @@ Winner, Score',
      '- Stanfurd, 14-7',
      '+ Cal, 21-14'
    ].join('\n') + '\n';
  },

  validateAtInit: function() {
    if (!this.get('id')) {
      throw new Error('Need ID!!');
    }

    if (!this.get('createTime')) {
      this.set('createTime', new Date().toString());
    }
    if (!this.get('commitMessage')) {
      this.set('commitMessage', intl.str('git-dummy-msg'));
    }

    this.set('children', []);

    // root commits have no parents
    if (!this.get('rootCommit')) {
      if (!this.get('parents') || !this.get('parents').length) {
        throw new Error('needs parents');
      }
    }
  },

  addNodeToVisuals: function() {
    var visNode = this.get('gitVisuals').addNode(this.get('id'), this);
    this.set('visNode', visNode);
  },

  addEdgeToVisuals: function(parent) {
    this.get('gitVisuals').addEdge(this.get('id'), parent.get('id'));
  },

  getParent: function(parentNum) {
    if (this && this.attributes && this.attributes.parents) {
      return this.attributes.parents[parentNum];
    } else {
      return null;
    }
  },

  removeFromParents: function() {
    _.each(this.get('parents'), function(parent) {
      parent.removeChild(this);
    }, this);
  },

  checkForUpdatedParent: function(engine) {
    var parents = this.get('parents');
    if (parents.length > 1) {
      return;
    }
    var parent = parents[0];
    var parentID = parent.get('id');
    var newestID = engine.getMostRecentBumpedID(parentID);

    if (parentID === newestID) {
      // BOOM done, its already updated
      return;
    }

    // crap we have to switch
    var newParent = engine.refs[newestID];

    this.removeFromParents();
    this.set('parents', [newParent]);
    newParent.get('children').push(this);

    // when we run in test mode, our visnode and
    // visuals will be undefined so we need to check for their existence
    var visNode = this.get('visNode');
    if (visNode) {
      visNode.removeAllEdges();
    }

    var gitVisuals = this.get('gitVisuals');
    if (gitVisuals) {
      gitVisuals.addEdge(this.get('id'), newestID);
    }

    return true;
  },

  removeChild: function(childToRemove) {
    var newChildren = [];
    _.each(this.get('children'), function(child) {
      if (child !== childToRemove) {
        newChildren.push(child);
      }
    }, this);
    this.set('children', newChildren);
  },

  isMainParent: function(parent) {
    var index = this.get('parents').indexOf(parent);
    return index === 0;
  },

  initialize: function(options) {
    this.validateAtInit();
    this.addNodeToVisuals();

    _.each(this.get('parents'), function(parent) {
      parent.get('children').push(this);
      this.addEdgeToVisuals(parent);
    }, this);
  }
});

var Tag = Ref.extend({
  defaults: {
    visTag: null
  },

  initialize: function() {
    Ref.prototype.initialize.call(this);
    this.set('type', 'tag');
  }
});

exports.GitEngine = GitEngine;
exports.Commit = Commit;
exports.Branch = Branch;
exports.Tag = Tag;
exports.Ref = Ref;
