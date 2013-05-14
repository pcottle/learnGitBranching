var _ = require('underscore');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? Backbone = require('backbone') : Backbone = window.Backbone;
var Q = require('q');

var intl = require('../intl');

var AnimationFactoryModule = require('../visuals/animation/animationFactory');
var AnimationQueue = require('../visuals/animation').AnimationQueue;
var TreeCompare = require('./treeCompare').TreeCompare;

var Errors = require('../util/errors');
var GitError = Errors.GitError;
var CommandResult = Errors.CommandResult;

function GitEngine(options) {
  this.rootCommit = null;
  this.refs = {};
  this.HEAD = null;

  this.branchCollection = options.branches;
  this.commitCollection = options.collection;
  this.gitVisuals = options.gitVisuals;

  this.eventBaton = options.eventBaton;
  this.eventBaton.stealBaton('processGitCommand', this.dispatch, this);

  this.animationFactory = options.animationFactory ||
    new AnimationFactoryModule.AnimationFactory();

  // global variable to keep track of the options given
  // along with the command call.
  this.commandOptions = {};
  this.generalArgs = [];

  this.initUniqueID();
}

GitEngine.prototype.initUniqueID = function() {
  // backbone or something uses _.uniqueId, so we make our own here
  this.uniqueId = (function() {
    var n = 0;
    return function(prepend) {
      return prepend? prepend + n++ : n++;
    };
  })();
};

GitEngine.prototype.defaultInit = function() {
  // lol 80 char limit
  var defaultTree = JSON.parse(unescape("%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22type%22%3A%22branch%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22type%22%3A%22commit%22%2C%22parents%22%3A%5B%5D%2C%22author%22%3A%22Peter%20Cottle%22%2C%22createTime%22%3A%22Mon%20Nov%2005%202012%2000%3A56%3A47%20GMT-0800%20%28PST%29%22%2C%22commitMessage%22%3A%22Quick%20Commit.%20Go%20Bears%21%22%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22type%22%3A%22commit%22%2C%22parents%22%3A%5B%22C0%22%5D%2C%22author%22%3A%22Peter%20Cottle%22%2C%22createTime%22%3A%22Mon%20Nov%2005%202012%2000%3A56%3A47%20GMT-0800%20%28PST%29%22%2C%22commitMessage%22%3A%22Quick%20Commit.%20Go%20Bears%21%22%2C%22id%22%3A%22C1%22%7D%7D%2C%22HEAD%22%3A%7B%22id%22%3A%22HEAD%22%2C%22target%22%3A%22master%22%2C%22type%22%3A%22general%20ref%22%7D%7D"));
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
  return false;
};

GitEngine.prototype.isOrigin = function() {
  return false;
};

GitEngine.prototype.exportTree = function() {
  // need to export all commits, their connectivity / messages, branches, and state of head.
  // this would be simple if didn't have circular structures.... :P
  // thus, we need to loop through and "flatten" our graph of objects referencing one another
  var totalExport = {
    branches: {},
    commits: {},
    HEAD: null
  };

  _.each(this.branchCollection.toJSON(), function(branch) {
    branch.target = branch.target.get('id');
    branch.visBranch = undefined;

    totalExport.branches[branch.id] = branch;
  });

  _.each(this.commitCollection.toJSON(), function(commit) {
    // clear out the fields that reference objects and create circular structure
    _.each(Commit.prototype.constants.circularFields, function(field) {
      commit[field] = undefined;
    }, this);

    // convert parents
    var parents = [];
    _.each(commit.parents, function(par) {
      parents.push(par.get('id'));
    });
    commit.parents = parents;

    totalExport.commits[commit.id] = commit;
  }, this);

  var HEAD = this.HEAD.toJSON();
  HEAD.visBranch = undefined;
  HEAD.lastTarget = HEAD.lastLastTarget = HEAD.visBranch = undefined;
  HEAD.target = HEAD.target.get('id');
  totalExport.HEAD = HEAD;

  return totalExport;
};

GitEngine.prototype.printTree = function(tree) {
  tree = tree || this.exportTree();
  TreeCompare.prototype.reduceTreeFields([tree]);

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
  // deep copy in case we use it a bunch
  tree = $.extend(true, {}, tree);

  // first clear everything
  this.removeAll();

  this.instantiateFromTree(tree);

  this.reloadGraphics();
  this.initUniqueID();
};

GitEngine.prototype.loadTreeFromString = function(treeString) {
  this.loadTree(JSON.parse(unescape(treeString)));
};

GitEngine.prototype.instantiateFromTree = function(tree) {
  // now we do the loading part
  var createdSoFar = {};

  _.each(tree.commits, function(commitJSON) {
    var commit = this.getOrMakeRecursive(tree, createdSoFar, commitJSON.id);
    this.commitCollection.add(commit);
  }, this);

  _.each(tree.branches, function(branchJSON) {
    var branch = this.getOrMakeRecursive(tree, createdSoFar, branchJSON.id);

    this.branchCollection.add(branch, {silent: true});
  }, this);

  var HEAD = this.getOrMakeRecursive(tree, createdSoFar, tree.HEAD.id);
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

GitEngine.prototype.getOrMakeRecursive = function(tree, createdSoFar, objID) {
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
  this.eventBaton.releaseBaton('processGitCommand', this.dispatch, this);
  this.removeAll();
};

GitEngine.prototype.removeAll = function() {
  this.branchCollection.reset();
  this.commitCollection.reset();
  this.refs = {};
  this.HEAD = null;
  this.rootCommit = null;

  this.gitVisuals.resetAll();
};

GitEngine.prototype.getDetachedHead = function() {
  // detached head is if HEAD points to a commit instead of a branch...
  var target = this.HEAD.get('target');
  var targetType = target.get('type');
  return targetType !== 'branch';
};

GitEngine.prototype.validateBranchName = function(name) {
  name = name.replace(/\s/g, '');
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
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

GitEngine.prototype.makeBranch = function(id, target) {
  id = this.validateBranchName(id);
  if (this.refs[id]) {
    throw new GitError({
      msg: intl.str(
        'bad-branch-name',
        { branch: name }
      )
    });
  }

  var branch = new Branch({
    target: target,
    id: id
  });
  this.branchCollection.add(branch);
  this.refs[branch.get('id')] = branch;
  return branch;
};

GitEngine.prototype.getHead = function() {
  return _.clone(this.HEAD);
};

GitEngine.prototype.getBranches = function() {
  var toReturn = [];
  this.branchCollection.each(function(branch) {
    toReturn.push({
      id: branch.get('id'),
      selected: this.HEAD.get('target') === branch,
      target: branch.get('target'),
      obj: branch
    });
  }, this);
  return toReturn;
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

GitEngine.prototype.makeCommit = function(parents, id, options) {
  // ok we need to actually manually create commit IDs now because
  // people like nikita (thanks for finding this!) could
  // make branches named C2 before creating the commit C2
  if (!id) {
    id = this.uniqueId('C');
    while (this.refs[id]) {
      id = this.uniqueId('C');
    }
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

GitEngine.prototype.acceptNoGeneralArgs = function() {
  if (this.generalArgs.length) {
    throw new GitError({
      msg: intl.str('git-error-no-general-args')
    });
  }
};

GitEngine.prototype.validateArgBounds = function(args, lower, upper, option) {
  // this is a little utility class to help arg validation that happens over and over again
  var what = (option === undefined) ?
    'git ' + this.command.get('method') :
    this.command.get('method') + ' ' + option + ' ';
  what = 'with ' + what;

  if (args.length < lower) {
    throw new GitError({
      msg: intl.str(
        'git-error-args-few',
        {
          lower: String(lower),
          what: what
        }
      )
    });
  }
  if (args.length > upper) {
    throw new GitError({
      msg: intl.str(
        'git-error-args-many',
        {
          upper: String(upper),
          what: what
        }
      )
    });
  }
};

GitEngine.prototype.oneArgImpliedHead = function(args, option) {
  // for log, show, etc
  this.validateArgBounds(args, 0, 1, option);
  if (args.length === 0) {
    args.push('HEAD');
  }
};

GitEngine.prototype.twoArgsImpliedHead = function(args, option) {
  // our args we expect to be between 1 and 2
  this.validateArgBounds(args, 1, 2, option);
  // and if it's one, add a HEAD to the back
  if (args.length == 1) {
    args.push('HEAD');
  }
};

GitEngine.prototype.revertStarter = function() {
  this.validateArgBounds(this.generalArgs, 1, NaN);

  var response = this.revert(this.generalArgs);

  if (response) {
    this.animationFactory.rebaseAnimation(this.animationQueue, response, this, this.gitVisuals);
  }
};

GitEngine.prototype.revert = function(whichCommits) {
  // for each commit, we want to revert it
  var toRebase = [];
  _.each(whichCommits, function(stringRef) {
    toRebase.push(this.getCommitFromRef(stringRef));
  }, this);

  // we animate reverts now!! we use the rebase animation though so that's
  // why the terminology is like it is
  var animationResponse = {};
  animationResponse.destinationBranch = this.resolveID(toRebase[0]);
  animationResponse.toRebaseArray = toRebase.slice(0);
  animationResponse.rebaseSteps = [];

  var beforeSnapshot = this.gitVisuals.genSnapshot();
  var afterSnapshot;

  // now make a bunch of commits on top of where we are
  var base = this.getCommitFromRef('HEAD');
  _.each(toRebase, function(oldCommit) {
    var newId = this.rebaseAltID(oldCommit.get('id'));

    var commitMessage = intl.str(
      'git-revert-msg',
      {
        oldCommit: this.resolveName(oldCommit),
        oldMsg: oldCommit.get('commitMessage')
      }
    );

    var newCommit = this.makeCommit([base], newId, {
      commitMessage: commitMessage
    });

    base = newCommit;

    // animation stuff
    afterSnapshot = this.gitVisuals.genSnapshot();
    animationResponse.rebaseSteps.push({
      oldCommit: oldCommit,
      newCommit: newCommit,
      beforeSnapshot: beforeSnapshot,
      afterSnapshot: afterSnapshot
    });
    beforeSnapshot = afterSnapshot;
  }, this);
  // done! update our location
  this.setTargetLocation('HEAD', base);

  // animation
  return animationResponse;
};

GitEngine.prototype.resetStarter = function() {
  if (this.commandOptions['--soft']) {
    throw new GitError({
      msg: intl.str('git-error-staging')
    });
  }
  if (this.commandOptions['--hard']) {
    this.command.addWarning(
      intl.str('git-warning-hard')
    );
    // dont absorb the arg off of --hard
    this.generalArgs = this.generalArgs.concat(this.commandOptions['--hard']);
  }

  this.validateArgBounds(this.generalArgs, 1, 1);

  if (this.getDetachedHead()) {
    throw new GitError({
      msg: intl.str('git-error-reset-detached')
    });
  }

  this.reset(this.generalArgs[0]);
};

GitEngine.prototype.reset = function(target) {
  this.setTargetLocation('HEAD', this.getCommitFromRef(target));
};

GitEngine.prototype.cherrypickStarter = function() {
  this.validateArgBounds(this.generalArgs, 1, Number.MAX_VALUE);

  var set = this.getUpstreamSet('HEAD');
  // first resolve all the refs (as an error check)
  _.each(this.generalArgs, function(arg) {
    var commit = this.getCommitFromRef(arg);
    // and check that its not upstream
    if (set[commit.get('id')]) {
      throw new GitError({
        msg: intl.str(
          'git-error-already-exists',
          { commit: commit.get('id') }
        )
      });
    }
  }, this);
  // error checks are all good, lets go!

  // hack up the rebase response to animate this better
  var animationResponse = {};
  animationResponse.destinationBranch = this.resolveID('HEAD');
  animationResponse.toRebaseArray = [];
  animationResponse.rebaseSteps = [];

  // now lets start going through
  var beforeSnapshot = this.gitVisuals.genSnapshot();
  var afterSnapshot;
  var newCommit;
  _.each(this.generalArgs, function(arg) {
    var oldCommit = this.getCommitFromRef(arg);
    animationResponse.toRebaseArray.push(oldCommit);

    newCommit = this.cherrypick(arg);

    afterSnapshot = this.gitVisuals.genSnapshot();
    animationResponse.rebaseSteps.push({
      oldCommit: oldCommit,
      newCommit: newCommit,
      beforeSnapshot: beforeSnapshot,
      afterSnapshot: this.gitVisuals.genSnapshot()
    });
    beforeSnapshot = afterSnapshot;
  }, this);

  this.animationFactory.rebaseAnimation(this.animationQueue, animationResponse, this, this.gitVisuals);
};

GitEngine.prototype.cherrypick = function(ref) {
  var commit = this.getCommitFromRef(ref);

  // alter the ID slightly
  var id = this.rebaseAltID(commit.get('id'));

  // now commit with that id onto HEAD
  var newCommit = this.makeCommit([this.getCommitFromRef('HEAD')], id);
  this.setTargetLocation(this.HEAD, newCommit);

  return newCommit;
};

GitEngine.prototype.commitStarter = function() {
  this.acceptNoGeneralArgs();
  if (this.commandOptions['-am'] && (
      this.commandOptions['-a'] || this.commandOptions['-m'])) {
    throw new GitError({
      msg: intl.str('git-error-options')
    });
  }

  var msg = null;
  var args = null;
  if (this.commandOptions['-a']) {
    this.command.addWarning(intl.str('git-warning-add'));
  }

  if (this.commandOptions['-am']) {
    args = this.commandOptions['-am'];
    this.validateArgBounds(args, 1, 1, '-am');
    msg = args[0];
  }

  if (this.commandOptions['-m']) {
    args = this.commandOptions['-m'];
    this.validateArgBounds(args, 1, 1, '-m');
    msg = args[0];
  }

  var newCommit = this.commit();
  if (msg) {
    msg = msg
      .replace(/&quot;/g, '"')
      .replace(/^"/g, '')
      .replace(/"$/g, '');

    newCommit.set('commitMessage', msg);
  }
  this.animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.commit = function() {
  var targetCommit = this.getCommitFromRef(this.HEAD);
  var id = null;

  // if we want to ammend, go one above
  if (this.commandOptions['--amend']) {
    targetCommit = this.resolveID('HEAD~1');
    id = this.rebaseAltID(this.getCommitFromRef('HEAD').get('id'));
  }

  var newCommit = this.makeCommit([targetCommit], id);
  if (this.getDetachedHead()) {
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
      var msg = intl.str(
        'git-error-relative-ref',
        {
          commit: commit.id,
          match: matches[0]
        }
      );
      throw new GitError({
        msg: msg
      });
    }

    commit = next;
  }

  return commit;
};

GitEngine.prototype.resolveStringRef = function(ref) {
  if (this.refs[ref]) {
    return this.refs[ref];
  }
  // case insensitive also
  if (this.refs[ref.toUpperCase()]) {
    return this.refs[ref.toUpperCase()];
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

GitEngine.prototype.getUpstreamBranchSet = function() {
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

  this.branchCollection.each(function(branch) {
    var set = bfsSearch(branch.get('target'));
    _.each(set, function(id) {
      commitToSet[id] = commitToSet[id] || [];

      // only add it if it's not there, so hue blending is ok
      if (!inArray(commitToSet[id], branch.get('id'))) {
        commitToSet[id].push({
          obj: branch,
          id: branch.get('id')
        });
      }
    });
  });

  return commitToSet;
};

GitEngine.prototype.getUpstreamHeadSet = function() {
  var set = this.getUpstreamSet('HEAD');
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

GitEngine.prototype.rebaseAltID = function(id) {
  // this function alters an ID to add a quote to the end,
  // indicating that it was rebased. it also checks existence
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

  // for loop for early return
  for (var i = 0; i < regexMap.length; i++) {
    var regex = regexMap[i][0];
    var func = regexMap[i][1];
    var results = regex.exec(id);
    if (results) {
      var newId = func(results);
      // if this id exists, continue down the rabbit hole
      if (this.refs[newId]) {
        return this.rebaseAltID(newId);
      } else {
        return newId;
      }
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
    //console.warn('WUT it is equal');
    //console.log(cA, cB);
    return GitEngine.prototype.idSortFunc(cA, cB);
  }
  return dateA - dateB;
};

GitEngine.prototype.rebaseInteractiveStarter = function() {
  var args = this.commandOptions['-i'];
  this.twoArgsImpliedHead(args, ' -i');

  this.rebaseInteractive(args[0], args[1]);
};

GitEngine.prototype.rebaseStarter = function() {
  if (this.commandOptions['-i']) {
    this.rebaseInteractiveStarter();
    return;
  }

  this.twoArgsImpliedHead(this.generalArgs);

  var response = this.rebase(this.generalArgs[0], this.generalArgs[1]);

  if (response === undefined) {
    // was a fastforward or already up to date. returning now
    // will trigger the refresh animation by not adding anything to
    // the animation queue
    return;
  }

  this.animationFactory.rebaseAnimation(this.animationQueue, response, this, this.gitVisuals);
};

GitEngine.prototype.rebase = function(targetSource, currentLocation) {
  // first some conditions
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
  var stopSet = this.getUpstreamSet(targetSource);

  // now BFS from here on out
  var toRebaseRough = [];
  var pQueue = [this.getCommitFromRef(currentLocation)];

  while (pQueue.length) {
    var popped = pQueue.pop();

    // if its in the set, dont add it
    if (stopSet[popped.get('id')]) {
      continue;
    }

    // it's not in the set, so we need to rebase this commit
    toRebaseRough.push(popped);
    toRebaseRough.sort(this.dateSortFunc);

    // keep searching
    pQueue = pQueue.concat(popped.get('parents'));
  }

  return this.rebaseFinish(toRebaseRough, stopSet, targetSource, currentLocation);
};

GitEngine.prototype.rebaseInteractive = function(targetSource, currentLocation) {
  // there are a reduced set of checks now, so we can't exactly use parts of the rebase function
  // but it will look similar.

  // first if we are upstream of the target
  if (this.isUpstreamOf(currentLocation, targetSource)) {
    throw new GitError({
      msg: intl.str('git-result-nothing')
    });
  }

  // now get the stop set
  var stopSet = this.getUpstreamSet(targetSource);

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

  // now do stuff :D since all our validation checks have passed, we are going to defer animation
  // and actually launch the dialog
  this.animationQueue.set('defer', true);

  var deferred = Q.defer();
  deferred.promise
  .then(_.bind(function(userSpecifiedRebase) {
    // first, they might have dropped everything (annoying)
    if (!userSpecifiedRebase.length) {
      throw new CommandResult({
        msg: intl.str('git-result-nothing')
      });
    }

    // finish the rebase crap and animate!
    var animationData = this.rebaseFinish(userSpecifiedRebase, {}, targetSource, currentLocation);
    this.animationFactory.rebaseAnimation(this.animationQueue, animationData, this, this.gitVisuals);
    this.animationQueue.start();
  }, this))
  .fail(_.bind(function(err) {
    this.filterError(err);
    this.command.set('error', err);
    this.animationQueue.start();
  }, this))
  .done();

  var InteractiveRebaseView = require('../views/rebaseView').InteractiveRebaseView;
  // interactive rebase view will reject or resolve our promise
  new InteractiveRebaseView({
    deferred: deferred,
    toRebase: toRebase
  });
};

GitEngine.prototype.rebaseFinish = function(toRebaseRough, stopSet, targetSource, currentLocation) {
  // now we have the all the commits between currentLocation and the set of target to rebase.
  var animationResponse = {};
  animationResponse.destinationBranch = this.resolveID(targetSource);

  // we need to throw out merge commits
  var toRebase = [];
  _.each(toRebaseRough, function(commit) {
    if (commit.get('parents').length == 1) {
      toRebase.push(commit);
    }
  });

  // we ALSO need to throw out commits that will do the same changes. like
  // if the upstream set has a commit C4 and we have C4', we dont rebase the C4' again.
  // get this by doing ID scraping
  var changesAlreadyMade = {};
  _.each(stopSet, function(val, key) {
    changesAlreadyMade[this.scrapeBaseID(key)] = val; // val == true
  }, this);

  // now get rid of the commits that will redo same changes
  toRebaseRough = toRebase;
  toRebase = [];
  _.each(toRebaseRough, function(commit) {
    var baseID = this.scrapeBaseID(commit.get('id'));
    if (!changesAlreadyMade[baseID]) {
      toRebase.push(commit);
    }
  }, this);

  toRebaseRough = toRebase;
  toRebase = [];
  // finally, make the set unique
  var uniqueIDs = {};
  _.each(toRebaseRough, function(commit) {
    if (uniqueIDs[commit.get('id')]) { return; }

    uniqueIDs[commit.get('id')] = true;
    toRebase.push(commit);
  }, this);

  if (!toRebase.length) {
    throw new GitError({
      msg: intl.str('git-error-rebase-none')
    });
  }

  animationResponse.toRebaseArray = toRebase.slice(0);

  // now pop all of these commits onto targetLocation
  var base = this.getCommitFromRef(targetSource);

  // do the rebase, and also maintain all our animation info during this
  animationResponse.rebaseSteps = [];
  var beforeSnapshot = this.gitVisuals.genSnapshot();
  var afterSnapshot;
  _.each(toRebase, function(old) {
    var newId = this.rebaseAltID(old.get('id'));

    var newCommit = this.makeCommit([base], newId);
    base = newCommit;

    // animation info
    afterSnapshot = this.gitVisuals.genSnapshot();
    animationResponse.rebaseSteps.push({
      oldCommit: old,
      newCommit: newCommit,
      beforeSnapshot: beforeSnapshot,
      afterSnapshot: afterSnapshot
    });
    beforeSnapshot = afterSnapshot;
  }, this);

  if (this.resolveID(currentLocation).get('type') == 'commit') {
    // we referenced a commit like git rebase C2 C1, so we have
    // to manually check out C1'

    var steps = animationResponse.rebaseSteps;
    var newestCommit = steps[steps.length - 1].newCommit;

    this.checkout(newestCommit);
  } else {
    // now we just need to update the rebased branch is
    this.setTargetLocation(currentLocation, base);
    this.checkout(currentLocation);
  }

  // for animation
  return animationResponse;
};

GitEngine.prototype.mergeStarter = function() {
  this.validateArgBounds(this.generalArgs, 1, 1);

  var newCommit = this.merge(this.generalArgs[0]);

  if (newCommit === undefined) {
    // its just a fast forwrard
    this.animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
    return;
  }

  this.animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.merge = function(targetSource) {
  var currentLocation = 'HEAD';

  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation) ||
      this.getCommitFromRef(targetSource) === this.getCommitFromRef(currentLocation)) {
    throw new CommandResult({
      msg: intl.str('git-result-uptodate')
    });
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
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

GitEngine.prototype.checkoutStarter = function() {
  var args = null;
  if (this.commandOptions['-b']) {
    if (this.generalArgs.length) {
      throw new GitError({
        msg: intl.str('git-error-options')
      });
    }

    // the user is really trying to just make a branch and then switch to it. so first:
    args = this.commandOptions['-b'];
    this.twoArgsImpliedHead(args, '-b');

    var validId = this.validateBranchName(args[0]);
    this.branch(validId, args[1]);
    this.checkout(validId);
    return;
  }

  if (this.commandOptions['-']) {
    // get the heads last location
    var lastPlace = this.HEAD.get('lastLastTarget');
    if (!lastPlace) {
      throw new GitError({
        msg: intl.str('git-result-nothing')
      });
    }
    this.HEAD.set('target', lastPlace);
    return;
  }

  if (this.commandOptions['-B']) {
    args = this.commandOptions['-B'];
    this.twoArgsImpliedHead(args, '-B');

    this.forceBranch(args[0], args[1]);
    this.checkout(args[0]);
    return;
  }

  this.validateArgBounds(this.generalArgs, 1, 1);

  this.checkout(this.unescapeQuotes(this.generalArgs[0]));
};

GitEngine.prototype.checkout = function(idOrTarget) {
  var target = this.resolveID(idOrTarget);
  if (target.get('id') === 'HEAD') {
    // git checkout HEAD is a
    // meaningless command but i used to do this back in the day
    return;
  }

  var type = target.get('type');
  if (type !== 'branch' && type !== 'commit') {
    throw new GitError({
      msg: intl.str('git-error-options')
    });
  }

  this.HEAD.set('target', target);
};

GitEngine.prototype.branchStarter = function() {
  var args = null;
  // handle deletion first
  if (this.commandOptions['-d'] || this.commandOptions['-D']) {
    var names = this.commandOptions['-d'] || this.commandOptions['-D'];
    this.validateArgBounds(names, 1, NaN, '-d');

    _.each(names, function(name) {
      this.deleteBranch(name);
    }, this);
    return;
  }

  if (this.commandOptions['--contains']) {
    args = this.commandOptions['--contains'];
    this.validateArgBounds(args, 1, 1, '--contains');
    this.printBranchesWithout(args[0]);
    return;
  }

  if (this.commandOptions['-f']) {
    args = this.commandOptions['-f'];
    this.twoArgsImpliedHead(args, '-f');

    // we want to force a branch somewhere
    this.forceBranch(args[0], args[1]);
    return;
  }


  if (this.generalArgs.length === 0) {
    this.printBranches(this.getBranches());
    return;
  }

  this.twoArgsImpliedHead(this.generalArgs);
  this.branch(this.generalArgs[0], this.generalArgs[1]);
};

GitEngine.prototype.forceBranch = function(branchName, where) {
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

  var whereCommit = this.getCommitFromRef(where);

  this.setTargetLocation(branch, whereCommit);
};

GitEngine.prototype.branch = function(name, ref) {
  var target = this.getCommitFromRef(ref);
  this.makeBranch(name, target);
};

GitEngine.prototype.deleteBranch = function(name) {
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

  this.branchCollection.remove(branch);
  this.refs[branch.get('id')] = undefined;
  delete this.refs[branch.get('id')];

  if (branch.get('visBranch')) {
    branch.get('visBranch').remove();
  }
};

GitEngine.prototype.unescapeQuotes = function(str) {
  return str.replace(/&#x27;/g, "'");
};

GitEngine.prototype.filterError = function(err) {
 if (!(err instanceof GitError ||
      err instanceof CommandResult)) {
    throw err;
  }
};

GitEngine.prototype.dispatch = function(command, deferred) {
  // current command, options, and args are stored in the gitEngine
  // for easy reference during processing.
  this.command = command;
  this.commandOptions = command.get('supportedMap');
  this.generalArgs = command.get('generalArgs');

  // set up the animation queue
  var whenDone = _.bind(function() {
    command.finishWith(deferred);
  }, this);
  this.animationQueue = new AnimationQueue({
    callback: whenDone
  });

  try {
    var methodName = command.get('method').replace(/-/g, '') + 'Starter';
    this[methodName]();
  } catch (err) {
    this.filterError(err);
    // short circuit animation by just setting error and returning
    command.set('error', err);
    deferred.resolve();
    return;
  }

  // only add the refresh if we didn't do manual animations
  if (!this.animationQueue.get('animations').length && !this.animationQueue.get('defer')) {
    this.animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
  }

  // animation queue will call the callback when its done
  if (!this.animationQueue.get('defer')) {
    this.animationQueue.start();
  }
};

GitEngine.prototype.showStarter = function() {
  this.oneArgImpliedHead(this.generalArgs);

  this.show(this.generalArgs[0]);
};

GitEngine.prototype.show = function(ref) {
  var commit = this.getCommitFromRef(ref);

  throw new CommandResult({
    msg: commit.getShowEntry()
  });
};

GitEngine.prototype.statusStarter = function() {
  var lines = [];
  if (this.getDetachedHead()) {
    lines.push(intl.str('git-status-detached'));
  } else {
    var branchName = this.HEAD.get('target').get('id');
    lines.push(intl.str('git-status-onbranch', {branch: branchName}));
  }
  lines.push('Changes to be committed:');
  lines.push('');
  lines.push('&nbsp;&nbsp;&nbsp; modified: cal/OskiCostume.stl');
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

GitEngine.prototype.logStarter = function() {
  if (this.generalArgs.length == 2) {
    // do fancy git log branchA ^branchB
    if (this.generalArgs[1][0] == '^') {
      this.logWithout(this.generalArgs[0], this.generalArgs[1]);
    } else {
      throw new GitError({
        msg: intl.str('git-error-options')
      });
    }
  }

  this.oneArgImpliedHead(this.generalArgs);
  this.log(this.generalArgs[0]);
};

GitEngine.prototype.logWithout = function(ref, omitBranch) {
  // slice off the ^branch
  omitBranch = omitBranch.slice(1);
  this.log(ref, this.getUpstreamSet(omitBranch));
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

GitEngine.prototype.addStarter = function() {
  throw new CommandResult({
    msg: intl.str('git-error-staging')
  });
};

GitEngine.prototype.getCommonAncestor = function(ancestor, cousin) {
  if (this.isUpstreamOf(cousin, ancestor)) {
    throw new Error('Dont use common ancestor if we are upstream!');
  }

  var upstreamSet = this.getUpstreamSet(ancestor);
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
  var upstream = this.getUpstreamSet(ancestor);
  return upstream[child.get('id')] !== undefined;
};

GitEngine.prototype.getUpstreamSet = function(ancestor) {
  var commit = this.getCommitFromRef(ancestor);
  var ancestorID = commit.get('id');
  var queue = [commit];

  var exploredSet = {};
  exploredSet[ancestorID] = true;

  var addToExplored = function(rent) {
    exploredSet[rent.get('id')] = true;
    queue.push(rent);
  };

  while (queue.length) {
    var here = queue.pop();
    var rents = here.get('parents');

    _.each(rents, addToExplored);
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
    origin: null
  },

  getIsRemote: function() {
    return this.get('origin') !== null;
  },

  initialize: function() {
    Ref.prototype.initialize.call(this);
    this.set('type', 'branch');
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

exports.GitEngine = GitEngine;
exports.Commit = Commit;
exports.Branch = Branch;
exports.Ref = Ref;

