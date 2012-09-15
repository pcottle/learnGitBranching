
// backbone or something uses _.uniqueId, so we make our own here
var uniqueId = (function() {
  var n = 0;
  return function(prepend) {
    return prepend? prepend + n++ : n++;
  };
})();

function GitEngine() {
  this.rootCommit = null;
  this.refs = {};
  this.HEAD = null;
  this.id_gen = 0;
  this.branches = [];
  this.collection = commitCollection;

  // global variable to keep track of the options given
  // along with the command call.
  this.commandOptions = {};
  this.generalArgs = [];

  events.on('gitCommandReady', _.bind(this.dispatch, this));

  this.init();
}

GitEngine.prototype.init = function() {
  // make an initial commit and a master branch
  this.rootCommit = new Commit({rootCommit: true});
  commitCollection.add(this.rootCommit);

  this.refs[this.rootCommit.get('id')] = this.rootCommit;

  var master = this.makeBranch('master', this.rootCommit);
  this.HEAD = new Ref({
    id: 'HEAD',
    target: master
  });
  this.refs[this.HEAD.get('id')] = this.HEAD;

  // commit once to get things going
  this.commit();
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
  return name;
};

GitEngine.prototype.makeBranch = function(id, target) {
  id = this.validateBranchName(id);
  if (this.refs[id]) {
    throw new GitError({
      msg: 'that branch id already exists!'
    });
  }

  var branch = new Branch({
    target: target,
    id: id
  });
  this.branches.push(branch);
  this.refs[branch.get('id')] = branch;
  return branch;
};

GitEngine.prototype.getHead = function() {
  return _.clone(this.HEAD);
};

GitEngine.prototype.getBranches = function() {
  var toReturn = [];
  _.each(this.branches, function(branch) {
    toReturn.push({
      id: branch.get('id'),
      selected: this.HEAD.get('target') === branch,
      target: branch.get('target')
    });
  }, this);
  return toReturn;
};

GitEngine.prototype.printBranches = function() {
  var branches = this.getBranches();
  var result = '';
  _.each(branches, function(branch) {
    result += (branch.selected ? '* ' : '') + branch.id + '\n';
  });
  throw new CommandResult({
    msg: result
  });
};

GitEngine.prototype.logBranches = function() {
  var branches = this.getBranches();
  _.each(branches, function(branch) {
    console.log((branch.selected ? '* ' : '') + branch.id);
  });
};

GitEngine.prototype.makeCommit = function(parents, id) {
  var commit = new Commit({
    parents: parents,
    id: id
  });
  this.refs[commit.get('id')] = commit;
  this.collection.add(commit);
  return commit;
};

GitEngine.prototype.acceptNoGeneralArgs = function() {
  if (this.generalArgs.length) {
    throw new GitError({
      msg: "That command accepts no general arguments"
    });
  }
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
    events.trigger('commandProcessWarn',
      'Nice! You are using --hard. The default behavior is a hard reset in ' +
      "this demo, so don't worry about specifying the option explicity"
    );
    // dont absorb the arg off of --hard
    this.generalArgs = this.generalArgs.concat(this.commandOptions['--hard']);
  }
  if (this.generalArgs.length !== 1) {
    throw new GitError({
      msg: "Specify the commit to reset to (1 argument)"
    });
  }
  if (this.getDetachedHead()) {
    throw new GitError({
      msg: "Cant reset in detached head! Use checkout if you want to move"
    });
  }
  this.reset(this.generalArgs[0]);
};

GitEngine.prototype.reset = function(target) {
  this.setLocationTarget('HEAD', this.getCommitFromRef(target));
};

GitEngine.prototype.commitStarter = function() {
  this.acceptNoGeneralArgs();
  if (this.commandOptions['-a']) {
    events.trigger('commandProcessWarn', 'No need to add files in this demo');
  }
  if (this.commandOptions['-am']) {
    events.trigger('commandProcessWarn', "Don't worry about adding files or commit messages in this demo");
  }
  this.commit();
};

GitEngine.prototype.commit = function() {
  var targetCommit = this.getCommitFromRef(this.HEAD);
  // if we want to ammend, go one above
  if (this.commandOptions['--amend']) {
    targetCommit = this.resolveId('HEAD~1');
  }

  var newCommit = this.makeCommit([targetCommit]);
  if (this.getDetachedHead()) {
    events.trigger('commandProcessWarn', 'Warning!! Detached HEAD state');
    this.HEAD.set('target', newCommit);
  } else {
    var targetBranch = this.HEAD.get('target');
    targetBranch.set('target', newCommit);
  }
};

GitEngine.prototype.resolveId = function(idOrTarget) {
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
      return parseInt(matches[2]);
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
  var start = this.resolveId(ref);
  // works for both HEAD and just a single layer. aka branch
  while (start.get('type') !== 'commit') {
    start = start.get('target');
  }
  return start;
};

GitEngine.prototype.setLocationTarget = function(ref, target) {
  var ref = this.getOneBeforeCommit(ref);
  ref.set('target', target);
}

GitEngine.prototype.getOneBeforeCommit = function(ref) {
  // you can call this command on HEAD in detached, HEAD, or on a branch
  // and it will return the ref that is one above a commit. aka
  // it resolves HEAD to something that we can move the ref with
  var start = this.resolveId(ref);
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
  if (numBack == 0) {
    return commit;
  }

  var pQueue = [].concat(commit.get('parents'));
  pQueue.sort(this.idSortFunc);
  numBack--;

  while (pQueue.length && numBack !== 0) {
    var popped = pQueue.shift(0);
    console.log(popped);
    pQueue = pQueue.concat(popped.get('parents'));
    pQueue.sort(this.idSortFunc);
    numBack--;
  }

  if (numBack !== 0 || pQueue.length == 0) {
    throw new GitError({
      msg: "Sorry, I can't go that many commits back"
    });
  }
  return pQueue.shift(0);
};

GitEngine.prototype.rebaseAltId = function(id) {
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
    [/^C(\d+)['][^](\d+)$/, function(bits) {
      return 'C' + String(bits[1]) + "'^" + String(bits[2] + 1);
    }]
  ];

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
    [/^C(\d+)['][^](\d+)$/, function(bits) {
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
  }

  return getNumToSort(cA.get('id')) - getNumToSort(cB.get('id'));
};

GitEngine.prototype.rebaseStarter = function() {
  if (this.generalArgs.length > 2) {
    throw new GitError({
      msg: 'rebase with more than 2 arguments doesnt make sense!'
    });
  }
  if (!this.generalArgs.length) {
    throw new GitError({
      msg: 'Give me a branch to rebase onto!'
    });
  }
  if (this.generalArgs.length == 1) {
    this.generalArgs.push('HEAD');
  }
  this.rebase(this.generalArgs[0], this.generalArgs[1]);
};

GitEngine.prototype.rebase = function(targetSource, currentLocation) {
  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation)) {
    throw new CommandResult({
      msg: 'Branch already up-to-date'
    });
  }
  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setLocationTarget(currentLocation, this.getCommitFromRef(targetSource));
    throw new CommandResult({
      msg: 'Fast-forwarding...'
    });
  }

  // now the part of actually rebasing.
  // We need to get the downstream set of targetSource first.
  // then we BFS from currentLocation, using the downstream set as our stopping point.
  // we need to BFS because we need to include all commits below
  // pop these commits on top of targetSource and modify their ids with quotes

  var stopSet = this.getUpstreamSet(targetSource)

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
    // keep searching
    pQueue = pQueue.concat(popped.get('parents'));
    pQueue.sort(this.idSortFunc);
  }

  // now we have the all the commits between currentLocation and the set of target.
  // we need to throw out merge commits
  var toRebase = [];
  _.each(toRebaseRough, function(commit) {
    if (commit.get('parents').length == 1) {
      toRebase.push(commit);
    }
  });

  // now sort
  toRebase.sort(this.idSortFunc);
  // now pop all of these commits onto targetLocation
  var base = this.getCommitFromRef(targetSource);

  for (var i = 0; i < toRebase.length; i++) {
    var old = toRebase[i];
    var newId = this.rebaseAltId(old.get('id'));
    var newCommit = this.makeCommit([base], newId);
    base = newCommit;
  }

  // now we just need to update where we are
  this.setLocationTarget(currentLocation, base);
  // done! haha
};

GitEngine.prototype.mergeStarter = function() {
  if (this.generalArgs.length > 2) {
    throw new GitError({
      msg: 'merge with more than 2 arguments doesnt make sense!'
    });
  }
  if (!this.generalArgs.length) {
    throw new GitError({
      msg: 'Give me a branch to merge into!'
    });
  }
  if (this.generalArgs.length == 1) {
    this.generalArgs.push('HEAD');
  }

  if (_.include(this.generalArgs, 'HEAD') && this.getDetachedHead()) {
    throw new GitError({
      msg: 'Cant merge things referencing HEAD when you are in detached head!'
    });
  }

  this.merge(this.generalArgs[0], this.generalArgs[1]);
};

GitEngine.prototype.merge = function(targetSource, currentLocation) {
  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation)) {
    throw new CommandResult({
      msg: 'Branch already up-to-date'
    });
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setLocationTarget(currentLocation, this.getCommitFromRef(targetSource));
    throw new CommandResult({
      msg: 'Fast-forwarding...'
    });
  }

  // now the part of making a merge commit
  var parent1 = this.getCommitFromRef(currentLocation);
  var parent2 = this.getCommitFromRef(targetSource);

  var commit = this.makeCommit([parent1, parent2]);
  this.setLocationTarget(currentLocation, commit)
};

GitEngine.prototype.checkoutStarter = function() {
  if (this.commandOptions['-b']) {
    // the user is really trying to just make a branch and then switch to it. so first:
    var args = this.commandOptions['-b'];
    if (!args.length) {
      throw new GitError({
        msg: 'I expect a branch name with "checkout -b"!!'
      });
    }
    if (args.length > 2) {
      throw new GitError({
        msg: 'Only two args max with checkout -b please (the new name and target branch)'
      });
    }

    // we are good!
    if (args.length == 1) {
      args.push('HEAD');
    }
    this.branch(args[0], args[1]);
    this.checkout(args[0]);
    return;
  }

  if (this.generalArgs.length != 1) {
    throw new GitError({
      msg: 'I expect one argument along with git checkout (dont reference files)'
    });
  }
  this.checkout(this.generalArgs[0]);
};

GitEngine.prototype.checkout = function(idOrTarget) {
  var target = this.resolveId(idOrTarget);
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
    if (!this.generalArgs.length) {
      throw new GitError({
        msg: 'I expect branch names when deleting'
      });
    }
    _.each(this.generalArgs, function(name) {
      this.deleteBranch(name);
    });
    return;
  }

  var len = this.generalArgs.length;
  if (len > 2) {
    throw new GitError({
      msg: 'git branch with more than two general args does not make sense!'
    });
  }


  if (len == 0) {
    this.printBranches();
    return;
  }
  
  if (len == 1) {
    // making a branch from where we are now
    this.generalArgs.push('HEAD');
  }
  this.branch(this.generalArgs[0], this.generalArgs[1]);
};

GitEngine.prototype.branch = function(name, ref) {
  var target = this.getCommitFromRef(ref);
  this.makeBranch(name, target);
};

GitEngine.prototype.deleteBranch = function(name) {
  // trying to delete, lets check our refs
  var target = this.resolveId(name);
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

  var id = target.get('id');
  target.delete();
  delete this.refs[id];
};

GitEngine.prototype.dispatch = function(commandObj) {
  this.commandOptions = commandObj.optionParser.supportedMap;
  this.generalArgs = commandObj.optionParser.generalArgs;

  this[commandObj.method + 'Starter'](); 
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
    queue.concat(here.get('parents'));
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
  var queue = [commit];

  var exploredSet = {};
  while (queue.length) {
    var here = queue.pop();
    var rents = here.get('parents');

    _.each(rents, function(rent) {
      exploredSet[rent.get('id')] = true;
      queue.push(rent);
    });
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
  },

  toString: function() {
    return 'a ' + this.get('type') + 'pointing to ' + String(this.get('target'));
  },

  delete: function() {
    console.log('DELETING ' + this.get('type') + ' ' + this.get('id'));
  }
});

var Branch  = Ref.extend({
  initialize: function() {
    Ref.prototype.initialize.call(this);
    this.set('type', 'branch');
  }
});

var Commit = Backbone.Model.extend({
  defaults: {
    type: 'commit',
    children: []
  },

  validateAtInit: function() {
    if (!this.get('id')) {
      this.set('id', uniqueId('C'));
    }

    // root commits have no parents
    if (this.get('rootCommit')) {
      this.set('parents', []);
    } else {
      if (!this.get('parents') || !this.get('parents').length) {
        throw new Error('needs parents');
      }
    }
  },

  addNodeToVisuals: function() {
    this.set('arborNode', sys.addNode(this.get('id')));
  },

  addEdgeToVisuals: function(parent) {
    sys.addEdge(this.get('arborNode'), parent.get('arborNode'));
  },

  initialize: function() {
    this.validateAtInit();
    this.addNodeToVisuals();

    _.each(this.get('parents'), function(parent) {
      parent.get('children').push(this);
      this.addEdgeToVisuals(parent);
    }, this);
  }
});

