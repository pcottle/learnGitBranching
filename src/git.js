var AnimationFactoryModule = require('./animationFactory');
var animationFactory = new AnimationFactoryModule.AnimationFactory();
var Main = require('./main');
var AnimationQueue = require('./async').AnimationQueue;
var InteractiveRebaseView = require('./miscViews').InteractiveRebaseView;

var Errors = require('./errors');
var GitError = Errors.GitError;
var CommandResult = Errors.CommandResult;

// backbone or something uses _.uniqueId, so we make our own here
var uniqueId = (function() {
  var n = 0;
  return function(prepend) {
    return prepend? prepend + n++ : n++;
  };
})();

function GitEngine(options) {
  this.rootCommit = null;
  this.refs = {};
  this.HEAD = null;

  this.branchCollection = options.branches;
  this.commitCollection = options.collection;
  this.gitVisuals = options.gitVisuals;

  // global variable to keep track of the options given
  // along with the command call.
  this.commandOptions = {};
  this.generalArgs = [];

  Main.getEvents().on('processCommand', _.bind(this.dispatch, this));
}

GitEngine.prototype.defaultInit = function() {
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

GitEngine.prototype.printTree = function() {
  var str = escape(JSON.stringify(this.exportTree()));
  return str;
};

GitEngine.prototype.printAndCopyTree = function() {
  window.prompt('Copy the tree string below', this.printTree());
};

GitEngine.prototype.loadTree = function(tree) {
  // deep copy in case we use it a bunch
  tree = $.extend(true, {}, tree);

  // first clear everything
  this.removeAll();

  this.instantiateFromTree(tree);

  this.reloadGraphics();
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

  this.branchCollection.each(function(branch) {
    this.gitVisuals.addBranch(branch);
  }, this);
};

GitEngine.prototype.reloadGraphics = function() {
  // get the root commit, no better way to do it
  var rootCommit = null;
  this.commitCollection.each(function(commit) {
    if (commit.get('id') == 'C0') {
      rootCommit = commit;
    }
  });
  this.gitVisuals.rootCommit = rootCommit;

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

  throw new Error('ruh rho!! unsupported tyep for ' + objID);
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
      msg: 'woah bad branch name!! This is not ok: ' + name
    });
  }
  if (/[hH][eE][aA][dD]/.test(name)) {
    throw new GitError({
      msg: 'branch name of "head" is ambiguous, dont name it that'
    });
  }
  if (name.length > 9) {
    name = name.slice(0, 9);
    this.command.addWarning(
      'Sorry, we need to keep branch names short for the visuals. Your branch ' +
      'name was truncated to 9 characters, resulting in ' + name
    );
  }
  return name;
};

GitEngine.prototype.makeBranch = function(id, target) {
  id = this.validateBranchName(id);
  if (this.refs[id]) {
    throw new GitError({
      msg: 'that branch id either matches a commit hash or already exists!'
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
    id = uniqueId('C');
    while (this.refs[id]) {
      id = uniqueId('C');
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
      msg: "That command accepts no general arguments"
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
      msg: 'I expect at least ' + String(lower) + ' argument(s) ' + what
    });
  }
  if (args.length > upper) {
    throw new GitError({
      msg: 'I expect at most ' + String(upper) + ' argument(s) ' + what
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
    animationFactory.rebaseAnimation(this.animationQueue, response, this, this.gitVisuals);
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

    var newCommit = this.makeCommit([base], newId, {
        commitMessage: 'Reverting ' + this.resolveName(oldCommit) +
          ': "' + oldCommit.get('commitMessage') + '"'
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
      msg: "You can't use --soft because there is no concept of stashing" +
           " changes or staging files, so you will lose your progress." +
           " Try using interactive rebasing (or just rebasing) to move commits."
    });
  }
  if (this.commandOptions['--hard']) {
    this.command.addWarning(
      'Nice! You are using --hard. The default behavior is a hard reset in ' +
      "this demo, so don't worry about specifying the option explicity"
    );
    // dont absorb the arg off of --hard
    this.generalArgs = this.generalArgs.concat(this.commandOptions['--hard']);
  }

  this.validateArgBounds(this.generalArgs, 1, 1);

  if (this.getDetachedHead()) {
    throw new GitError({
      msg: "Cant reset in detached head! Use checkout if you want to move"
    });
  }

  this.reset(this.generalArgs[0]);
};

GitEngine.prototype.reset = function(target) {
  this.setTargetLocation('HEAD', this.getCommitFromRef(target));
};

GitEngine.prototype.cherrypickStarter = function() {
  this.validateArgBounds(this.generalArgs, 1, 1);
  var newCommit = this.cherrypick(this.generalArgs[0]);

  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.cherrypick = function(ref) {
  var commit = this.getCommitFromRef(ref);
  // check if we already have that
  var set = this.getUpstreamSet('HEAD');
  if (set[commit.get('id')]) {
    throw new GitError({
      msg: "We already have that commit in our changes history! You can't cherry-pick it " +
           "if it shows up in git log."
    });
  }

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
      msg: "You can't have -am with another -m or -a!"
    });
  }

  var msg = null;
  var args = null;
  if (this.commandOptions['-a']) {
    this.command.addWarning('No need to add files in this demo');
  }

  if (this.commandOptions['-am']) {
    args = this.commandOptions['-am'];
    this.validateArgBounds(args, 1, 1, '-am');

    this.command.addWarning("Don't worry about adding files in this demo. I'll take " +
      "down your commit message anyways, but you can commit without a message " +
      "in this demo as well");
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
  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
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
    this.command.addWarning('Warning!! Detached HEAD state');
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

GitEngine.prototype.resolveStringRef = function(ref) {
  if (this.refs[ref]) {
    return this.refs[ref];
  }

  // may be something like HEAD~2 or master^^
  var relativeRefs = [
    [/^([a-zA-Z0-9]+)~(\d+)\s*$/, function(matches) {
      return parseInt(matches[2], 10);
    }],
    [/^([a-zA-Z0-9]+)(\^+)\s*$/, function(matches) {
      return matches[2].length;
    }]
  ];

  var startRef = null;
  var numBack = null;
  _.each(relativeRefs, function(config) {
    var regex = config[0];
    var parse = config[1];
    if (regex.test(ref)) {
      var matches = regex.exec(ref);
      numBack = parse(matches);
      startRef = matches[1];
    }
  }, this);

  if (!startRef) {
    throw new GitError({
      msg: 'unknown ref ' + ref
    });
  }
  if (!this.refs[startRef]) {
    throw new GitError({
      msg: 'the ref ' + startRef +' does not exist.'
    });
  }
  var commit = this.getCommitFromRef(startRef);

  return this.numBackFrom(commit, numBack);
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

GitEngine.prototype.numBackFrom = function(commit, numBack) {
  // going back '3' from a given ref is not trivial, for you might have
  // a bunch of merge commits and such. like this situation:
  //
  //      * merge master into new
  //      |\
  //      | \* commit here
  //      |* \ commit there
  //      |  |* commit here
  //      \ /
  //       | * root
  //
  //
  // hence we need to do a BFS search, with the commit date being the
  // value to sort off of (rather than just purely the level)
  if (numBack === 0) {
    return commit;
  }

  // we use a special sorting function here that
  // prefers the later commits over the earlier ones
  var sortQueue = _.bind(function(queue) {
    queue.sort(this.idSortFunc);
    queue.reverse();
  }, this);

  var pQueue = [].concat(commit.get('parents') || []);
  sortQueue(pQueue);
  numBack--;

  while (pQueue.length && numBack !== 0) {
    var popped = pQueue.shift(0);
    var parents = popped.get('parents');

    if (parents && parents.length) {
      pQueue = pQueue.concat(parents);
    }

    sortQueue(pQueue);
    numBack--;
  }

  if (numBack !== 0 || pQueue.length === 0) {
    throw new GitError({
      msg: "Sorry, I can't go that many commits back"
    });
  }
  return pQueue.shift(0);
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

  animationFactory.rebaseAnimation(this.animationQueue, response, this, this.gitVisuals);
};

GitEngine.prototype.rebase = function(targetSource, currentLocation) {
  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation)) {
    this.command.setResult('Branch already up-to-date');

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
    this.command.setResult('Fast-forwarding...');

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
    toRebaseRough.sort(this.idSortFunc);
    toRebaseRough.reverse();
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
      msg: 'Nothing to do... (git throws a "noop" status here); ' +
        'Your source is upstream of your rebase target'
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
    pQueue.sort(this.idSortFunc);
  }

  // throw our merge's real fast and see if we have anything to do
  var toRebase = [];
  _.each(toRebaseRough, function(commit) {
    if (commit.get('parents').length == 1) {
      toRebase.push(commit);
    }
  });

  if (!toRebase.length) {
    throw new GitError({
      msg: 'No commits to rebase! Everything is a merge commit'
    });
  }

  // now do stuff :D since all our validation checks have passed, we are going to defer animation
  // and actually launch the dialog
  this.animationQueue.set('defer', true);

  var callback = _.bind(function(userSpecifiedRebase) {
    // first, they might have dropped everything (annoying)
    if (!userSpecifiedRebase.length) {
      this.command.setResult('Nothing to do...');
      this.animationQueue.start();
      return;
    }

    // finish the rebase crap and animate!
    var animationData = this.rebaseFinish(userSpecifiedRebase, {}, targetSource, currentLocation);
    animationFactory.rebaseAnimation(this.animationQueue, animationData, this, this.gitVisuals);
    this.animationQueue.start();
  }, this);

  new InteractiveRebaseView({
    callback: callback,
    toRebase: toRebase,
    el: $('#dialogHolder')
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

  if (!toRebase.length) {
    throw new GitError({
      msg: 'No Commits to Rebase! Everything else is merge commits or changes already have been applied'
    });
  }

  // now reverse it once more to get it in the right order
  toRebase.reverse();
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
  this.twoArgsImpliedHead(this.generalArgs);

  var newCommit = this.merge(this.generalArgs[0], this.generalArgs[1]);

  if (newCommit === undefined) {
    // its just a fast forwrard
    animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
    return;
  }

  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.merge = function(targetSource, currentLocation) {
  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation) ||
      this.getCommitFromRef(targetSource) === this.getCommitFromRef(currentLocation)) {
    throw new CommandResult({
      msg: 'Branch already up-to-date'
    });
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setTargetLocation(currentLocation, this.getCommitFromRef(targetSource));
    // get fresh animation to happen
    this.command.setResult('Fast-forwarding...');
    return;
  }

  // now the part of making a merge commit
  var parent1 = this.getCommitFromRef(currentLocation);
  var parent2 = this.getCommitFromRef(targetSource);

  // we need a fancy commit message
  var msg = 'Merge ' + this.resolveName(targetSource) +
    ' into ' + this.resolveName(currentLocation);

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
        msg: 'Need a previous location to do - switching'
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
      msg: 'can only checkout branches and commits!'
    });
  }

  this.HEAD.set('target', target);
};

GitEngine.prototype.branchStarter = function() {
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
    var args = this.commandOptions['--contains'];
    this.validateArgBounds(args, 1, 1, '--contains');
    this.printBranchesWithout(args[0]);
    return;
  }

  if (this.commandOptions['-f']) {
    var args = this.commandOptions['-f'];
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
      msg: "Can't force move anything but a branch!!"
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
  if (target.get('type') !== 'branch') {
    throw new GitError({
      msg: "You can't delete things that arent branches with branch command"
    });
  }
  if (target.get('id') == 'master') {
    throw new GitError({
      msg: "You can't delete the master branch!"
    });
  }
  if (this.HEAD.get('target') === target) {
    throw new GitError({
      msg: "Cannot delete the branch you are currently on"
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

GitEngine.prototype.dispatch = function(command, callback) {
  // current command, options, and args are stored in the gitEngine
  // for easy reference during processing.
  this.command = command;
  this.commandOptions = command.get('supportedMap');
  this.generalArgs = command.get('generalArgs');

  // set up the animation queue
  var whenDone = _.bind(function() {
    command.set('status', 'finished');
    callback();
  }, this);
  this.animationQueue = new AnimationQueue({
    callback: whenDone
  });

  command.set('status', 'processing');
  try {
    var methodName = command.get('method').replace(/-/g, '') + 'Starter';
    this[methodName]();
  } catch (err) {
    if (err instanceof GitError ||
        err instanceof CommandResult) {
      // short circuit animation by just setting error and returning
      command.set('error', err);
      callback();
      return;
    } else {
      throw err;
    }
  }

  // only add the refresh if we didn't do manual animations
  if (!this.animationQueue.get('animations').length && !this.animationQueue.get('defer')) {
    animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
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
    lines.push('Detached Head!');
  } else {
    var branchName = this.HEAD.get('target').get('id');
    lines.push('On branch ' + branchName);
  }
  lines.push('Changes to be committed:');
  lines.push('');
  lines.push('&nbsp;&nbsp;&nbsp; modified: cal/OskiCostume.stl');
  lines.push('');
  lines.push('Ready to commit! (as always in this demo)');

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
        msg: 'I need a not branch (^branchName) when getting two arguments!'
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
    msg: "This demo is meant to demonstrate git branching, so don't worry about " +
         "adding / staging files. Just go ahead and commit away!"
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
    visBranch: null
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
      this.set('commitMessage', 'Quick Commit. Go Bears!');
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

