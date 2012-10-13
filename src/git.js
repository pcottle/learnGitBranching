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
  this.id_gen = 0;
  this.branchCollection = options.branches;
  this.commitCollection = options.collection;

  // global variable to keep track of the options given
  // along with the command call.
  this.commandOptions = {};
  this.generalArgs = [];

  events.on('processCommand', _.bind(this.dispatch, this));

  this.init();
}

GitEngine.prototype.init = function() {
  // make an initial commit and a master branch
  this.rootCommit = new Commit({rootCommit: true});
  this.commitCollection.add(this.rootCommit);

  this.refs[this.rootCommit.get('id')] = this.rootCommit;

  var master = this.makeBranch('master', this.rootCommit);
  this.HEAD = new Ref({
    id: 'HEAD',
    target: master
  });
  this.refs[this.HEAD.get('id')] = this.HEAD;

  // commit once to get things going
  this.commit();

  // now we are ready
  events.trigger('gitEngineReady', this);
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
      msg: 'that branch id already exists!'
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

GitEngine.prototype.revertStarter = function() {
  if (this.generalArgs.length !== 1) {
    throw new GitError({
      msg: "Specify the commit to revert to"
    });
  }
  if (this.generalArgs[0] == 'HEAD') {
    throw new GitError({
      msg: "Can't revert to HEAD! That's where you are now"
    });
    return;
  }
  this.revert(this.generalArgs[0]);
};

GitEngine.prototype.revert = function(whichCommit) {
  // first get that commit
  var targetLocation = this.getCommitFromRef(whichCommit);
  var here = this.getCommitFromRef('HEAD');
  // then BFS from here to that commit
  var toUndo = [];
  var queue = [here];
  while (queue.length) {
    var popped = queue.pop();
    if (popped.get('id') == targetLocation.get('id')) {
      // we got all that we needed to get
      break;
    }
    toUndo.push(popped);
    queue = queue.concat(popped.get('parents'));
    queue.sort(this.idSortFunc);
  }

  // now make a bunch of commits on top of where we are
  var base = here;
  toUndo.sort(this.idSortFunc);
  for (var i = 0; i < toUndo.length; i++) {
    var newId = this.rebaseAltId(toUndo[i].get('id'));
    var newCommit = this.makeCommit([base], newId);
    base = newCommit;
  }
  // done! update our location
  this.setLocationTarget('HEAD', base);
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
  if (this.commandOptions['-am'] && (
      this.commandOptions['-a'] || this.commandOptions['-m'])) {
    throw new GitError({
      msg: "You can't have -am with another -m or -a!"
    });
  }

  var msg = null;
  if (this.commandOptions['-a']) {
    this.command.addWarning('No need to add files in this demo');
  }
  if (this.commandOptions['-am']) {
    var args = this.commandOptions['-am'];
    if (args.length > 1) {
      throw new GitError({
        msg: "Commit -am doesn't make sense with more than one arg..."
      });
    }

    this.command.addWarning("Don't worry about adding files in this demo. I'll take " +
      "down your commit message but it's not important");
    msg = args[0];
  }
  if (this.commandOptions['-m']) {
    var args = this.commandOptions['-m'];
    if (args.length > 1) {
      throw new GitError({
        msg: "Specifying a commit message with more than 1 arg doesnt make sense!"
      });
    }

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
  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit);
};

GitEngine.prototype.commit = function() {
  var targetCommit = this.getCommitFromRef(this.HEAD);
  // if we want to ammend, go one above
  if (this.commandOptions['--amend']) {
    targetCommit = this.resolveId('HEAD~1');
  }

  var newCommit = this.makeCommit([targetCommit]);
  if (this.getDetachedHead()) {
    this.command.addWarning('Warning!! Detached HEAD state');
    this.HEAD.set('target', newCommit);
  } else {
    var targetBranch = this.HEAD.get('target');
    targetBranch.set('target', newCommit);
  }
  return newCommit;
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

  var pQueue = [].concat(commit.get('parents') || []);
  pQueue.sort(this.idSortFunc);
  numBack--;

  while (pQueue.length && numBack !== 0) {
    var popped = pQueue.shift(0);
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
    [/^C(\d+)['][^](\d+)$/, function(bits) {
      return 'C' + String(bits[1]) + "'^" + String(bits[2] + 1);
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
        return this.rebaseAltId(newId);
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
  var response = this.rebase(this.generalArgs[0], this.generalArgs[1]);
  if (response === undefined) {
    // was a fastforward or already up to date
    return;
  }

  this.rebaseAnimation(response);
};

GitEngine.prototype.rebaseAnimation = function(response) {
  // TODO: move to animation factory
  var start = function() {
    // maybe search stuff??
  };

  this.animationQueue.add(new Animation({
    closure: start
  }));
  
  // first set all birth positions...
  _.each(response, function(step) {
    step.newCommit.get('visNode').setBirth();
  }, this);

  var fixedOpacity = 0.8;
  // then fix all opacities... ugh
  _.each(response, function(step) {
    _.each(step.snapshot, function(obj) {
      _.each(obj, function(attr) {
        if (attr.opacity !== undefined) {
          attr.opacity = fixedOpacity;
        }
      });
    });
  });

  var time = GRAPHICS.defaultAnimationTime;
  var bounceTime = time * 2.0;

  _.each(response, function(step) {
    this.animationQueue.add(new Animation({
      closure: function() {
        var id = step.newCommit.get('id');
        var vNode = step.newCommit.get('visNode');

        vNode.setBirth();
        vNode.setOutgoingEdgesBirthPosition();

        vNode.animateOutgoingEdgesFromSnapshot(step.snapshot, bounceTime, 'bounce');
        vNode.animateFromAttr(step.snapshot[id], bounceTime, 'bounce');
      },
      duration: Math.max(bounceTime, time)
    }));
  }, this);

  animationFactory.refreshTree(this.animationQueue);
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
    // we need the refresh tree animation to happen, so set the result directly
    // instead of throwing
    this.command.setResult('Fast-forwarding...');
    return;
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

  var animationInfo = [];
  for (var i = 0; i < toRebase.length; i++) {
    var old = toRebase[i];
    var newId = this.rebaseAltId(old.get('id'));
    var newCommit = this.makeCommit([base], newId);

    base = newCommit;

    animationInfo.push({
      oldCommit: old,
      newCommit: newCommit,
      snapshot: gitVisuals.genSnapshot()
    });
  }

  // now we just need to update where we are
  this.setLocationTarget(currentLocation, base);

  // for animation
  return animationInfo;
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
  if (this.isUpstreamOf(targetSource, currentLocation) ||
      this.getCommitFromRef(targetSource) === this.getCommitFromRef(currentLocation)) {
    throw new CommandResult({
      msg: 'Branch already up-to-date'
    });
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setLocationTarget(currentLocation, this.getCommitFromRef(targetSource));
    // get fresh animation to happen
    this.command.setResult('Fast-forwarding...');
    return;
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
    var validId = this.validateBranchName(args[0]);
    this.branch(validId, args[1]);
    this.checkout(validId);
    return;
  }

  if (this.generalArgs.length != 1) {
    throw new GitError({
      msg: 'I expect one argument along with git checkout (dont reference files)'
    });
  }
  this.checkout(this.unescapeQuotes(this.generalArgs[0]));
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
    var names = this.commandOptions['-d'] || this.commandOptions['-D'];

    if (!names.length) {
      throw new GitError({
        msg: 'I expect branch names when deleting'
      });
    }
    _.each(names, function(name) {
      this.deleteBranch(name);
    }, this);
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
}

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
    this[command.get('method') + 'Starter'](); 
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
  if (!this.animationQueue.get('animations').length) {
    this.animationQueue.add(new Animation({
      closure: function() {
        gitVisuals.refreshTree();
      }
    }));
  }

  // animation queue will call the callback when its done
  this.animationQueue.start();
};

GitEngine.prototype.showStarter = function() {
  if (this.generalArgs.length > 1) {
    throw new GitError({
      msg: 'git show with more than 1 argument does not make sense'
    });
  }
  if (this.generalArgs.length == 0) {
    this.generalArgs.push('HEAD');
  }
  this.show(this.generalArgs[0]);
};

GitEngine.prototype.show = function(ref) {
  var commit = this.getCommitFromRef(ref);

  throw new CommandResult({
    msg: commit.getShowEntry()
  });
};

GitEngine.prototype.logStarter = function() {
  if (this.generalArgs.length > 1) {
    throw new GitError({
      msg: "git log with more than 1 argument doesn't make sense"
    });
  }
  if (this.generalArgs.length == 0) {
    this.generalArgs.push('HEAD');
  }
  this.log(this.generalArgs[0]);
};

GitEngine.prototype.log = function(ref) {
  // first get the commit we referenced
  var commit = this.getCommitFromRef(ref);

  // then get as many far back as we can from here, order by commit date
  var toDump = [];
  var pQueue = [commit];

  while (pQueue.length) {
    var popped = pQueue.shift(0);
    toDump.push(popped);

    if (popped.get('parents') && popped.get('parents').length) {
      pQueue = pQueue.concat(popped.get('parents'));
    }
    pQueue.sort(this.idSortFunc);
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

var Branch = Ref.extend({
  defaults: {
    visBranch: null,
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
    visNode: null
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
      '+ Cal, 21-14',
    ].join('\n') + '\n';
  },

  validateAtInit: function() {
    if (!this.get('id')) {
      this.set('id', uniqueId('C'));
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
    var visNode = gitVisuals.addNode(this.get('id'), this);
    this.set('visNode', visNode);
  },

  addEdgeToVisuals: function(parent) {
    gitVisuals.addEdge(this.get('id'), parent.get('id'));
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

