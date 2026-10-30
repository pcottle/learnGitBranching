var escapeString = require('../util/escapeString');
var intl = require('../intl');

var Graph = require('../graph');
var Errors = require('../util/errors');
var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var ORIGIN_PREFIX = 'o/';

var crappyUnescape = function(str) {
  return str.replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/");
};

function isColonRefspec(str) {
  return str.indexOf(':') !== -1 && str.split(':').length === 2;
}

var assertIsRef = function(engine, ref) {
  engine.resolveID(ref); // will throw git error if can't resolve
};

var assertRefNoModifiers = function(ref) {
  if (/~|\^/.test(ref)) {
    throw new GitError({
      msg: intl.str('git-error-exist', {ref: ref})
    });
  }
}

var validateBranchName = function(engine, name) {
  return engine.validateBranchName(name);
};

var validateOriginBranchName = function(engine, name) {
  return engine.origin.validateBranchName(name);
};

var validateBranchNameIfNeeded = function(engine, name) {
  if (engine.refs[name]) {
    return name;
  }
  return validateBranchName(engine, name);
};

var assertNotCheckedOut = function(engine, ref) {
  if (!engine.refs[ref]) {
    return;
  }
  if (engine.HEAD.get('target') === engine.refs[ref]) {
    throw new GitError({
      msg: intl.str('git-error-fetch-checked-out', { ref: ref })
    });
  }
};

var assertIsBranch = function(engine, ref) {
  assertIsRef(engine, ref);
  var obj = engine.resolveID(ref);
  if (!obj || obj.get('type') !== 'branch') {
    throw new GitError({
      msg: intl.str('git-error-not-a-branch', { ref: ref })
    });
  }
};

var assertIsRemoteBranch = function(engine, ref) {
  assertIsRef(engine, ref);
  var obj = engine.resolveID(ref);

  if (obj.get('type') !== 'branch' ||
      !obj.getIsRemote()) {
    throw new GitError({
      msg: intl.str('git-error-not-a-remote-branch', { ref: ref })
    });
  }
};

var assertOriginSpecified = function(generalArgs) {
  if (!generalArgs.length) {
    return;
  }
  if (generalArgs[0] !== 'origin') {
    throw new GitError({
      msg: intl.str('git-error-not-a-remote', { remote: generalArgs[0] })
    });
  }
};

var assertBranchIsRemoteTracking = function(engine, branchName) {
  branchName = crappyUnescape(branchName);
  if (!engine.resolveID(branchName)) {
    throw new GitError({
      msg: intl.str('git-error-branch-bang', { branch: branchName })
    });
  }
  var branch = engine.resolveID(branchName);
  if (branch.get('type') !== 'branch') {
    throw new GitError({
      msg: intl.str('git-error-branch-bang', { branch: branchName })
    });
  }

  var tracking = branch.getRemoteTrackingBranchID();
  if (!tracking) {
    throw new GitError({
      msg: intl.str('git-error-not-remote-tracking', { branch: branchName })
    });
  }
  return tracking;
};

var commandConfig = {
  commit: {
    sc: /^(gc|git ci)($|\s)/,
    regex: /^git +commit($|\s)/,
    descriptionKey: 'command-description-commit',
    options: [
      '--amend',
      { names: ['-a', '--all'] },
      { names: ['-m', '--message'], args: 1 }
    ],
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      command.acceptNoGeneralArgs();

      var msg = null;
      var args = null;
      var stageAll = !!commandOptions['-a'];
      if (stageAll && !engine.changesModelEngaged) {
        // classic levels have no real staging, so -a is a no-op worth flagging
        command.addWarning(intl.str('git-warning-add'));
      }

      if (commandOptions['-m']) {
        args = commandOptions['-m'];
        command.validateArgBounds(args, 1, 1, '-m');
        msg = args[0];
      }

      var newCommit = engine.commit({
        isAmend: !!commandOptions['--amend'],
        all: stageAll
      });
      if (msg) {
        newCommit.set('commitMessage', msg);
      }

      // Hold on to the chips this commit swallowed before anything repaints.
      // The same serialized metadata drives the commit labels and goal check.
      var committedFiles = newCommit.get('changedFiles') || [];
      if (committedFiles.length) {
        engine.gitVisuals.beginSlurp(committedFiles, newCommit);
      }

      var promise = engine.animationFactory.playCommitBirthPromiseAnimation(
        newCommit,
        engine.gitVisuals
      );

      if (committedFiles.length) {
        // the staged files gather into the circle while it is being born,
        // which is the whole point: a commit is just a bundle of changes
        promise = Promise.all([
          promise,
          Promise.resolve(engine.gitVisuals.slurpChangesIntoCommit(newCommit))
        ]);
      }
      engine.animationQueue.thenFinish(promise);
    }
  },

  cherrypick: {
    displayName: 'cherry-pick',
    regex: /^git +cherry-pick($|\s)/,
    descriptionKey: 'command-description-cherrypick',
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();

      command.validateArgBounds(generalArgs, 1, Number.MAX_VALUE);

      var set = Graph.getUpstreamSet(engine, 'HEAD');
      // first resolve all the refs (as an error check)
      var toCherrypick = generalArgs.map(function (arg) {
        var commit = engine.getCommitFromRef(arg);
        // and check that its not upstream
        if (set[commit.get('id')]) {
          throw new GitError({
            msg: intl.str(
              'git-error-already-exists',
              { commit: commit.get('id') }
            )
          });
        }
        return commit;
      }, this);

      engine.setupCherrypickChain(toCherrypick);
    }
  },

  gc: {
    displayName: 'gc',
    regex: /^git +gc($|\s)/,
    descriptionKey: 'command-description-gc',
    execute: function(engine, command) {
      engine.pruneTree(false);
    }
  },

  pull: {
    regex: /^git +pull($|\s)/,
    descriptionKey: 'command-description-pull',
    options: [
      { names: ['--force', '-f'] },
      '--rebase'
    ],
    execute: function(engine, command) {
      if (!engine.hasOrigin()) {
        throw new GitError({
          msg: intl.str('git-error-origin-required')
        });
      }

      var commandOptions = command.getOptionsMap();
      var force = !!commandOptions['--force'];
      var generalArgs = command.getGeneralArgs();
      command.twoArgsForOrigin(generalArgs);
      assertOriginSpecified(generalArgs);
      // here is the deal -- git pull is pretty complex with
      // the arguments it wants. You can
      //   A) specify the remote branch you want to
      //      merge & fetch, in which case it completely
      //      ignores the properties of branch you are on, or
      //
      //  B) specify no args, in which case it figures out
      //     the branch to fetch from the remote tracking
      //     and merges those in, or
      //
      //  C) specify the colon refspec like fetch, where it does
      //     the fetch and then just merges the dest

      var source;
      var destination;
      var firstArg = generalArgs[1];
      // COPY PASTA validation code from fetch. maybe fix this?
      if (firstArg && isColonRefspec(firstArg)) {
        if (firstArg[0] == '+') {
          force = true;
          firstArg = firstArg.substr(1);
        }
        var refspecParts = firstArg.split(':');
        source = refspecParts[0];
        assertRefNoModifiers(source);
        destination = validateBranchNameIfNeeded(
          engine,
          crappyUnescape(refspecParts[1])
        );
        assertNotCheckedOut(engine, destination);
      } else if (firstArg) {
        source = firstArg;
        assertIsBranch(engine.origin, source);
        // get o/main locally if main is specified
      } else {
        // can't be detached
        if (engine.getDetachedHead()) {
          throw new GitError({
            msg: intl.str('git-error-pull-detached')
          });
        }
        // ok we need to get our currently checked out branch
        // and then specify source and dest
        var branch = engine.getOneBeforeCommit('HEAD');
        var branchName = branch.get('id');
        assertBranchIsRemoteTracking(engine, branchName);
        source = branch.getRemoteTrackingBranchID().replace(ORIGIN_PREFIX, '');
      }

      engine.pull({
        source: source,
        destination: destination,
        force: force,
        isRebase: !!commandOptions['--rebase']
      });
    }
  },

  fakeTeamwork: {
    regex: /^git +fakeTeamwork($|\s)/,
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();
      if (!engine.hasOrigin()) {
        throw new GitError({
          msg: intl.str('git-error-origin-required')
        });
      }

      command.validateArgBounds(generalArgs, 0, 2);
      var branch;
      var numToMake;

      // allow formats of: git fakeTeamwork 2 or git fakeTeamwork side 3
      switch (generalArgs.length) {
        // git fakeTeamwork
        case 0:
          branch = 'main';
          numToMake = 1;
          break;

        // git fakeTeamwork 10 or git fakeTeamwork foo
        case 1:
          if (isNaN(parseInt(generalArgs[0], 10))) {
            branch = validateOriginBranchName(engine, generalArgs[0]);
            numToMake = 1;
          } else {
            numToMake = parseInt(generalArgs[0], 10);
            branch = 'main';
          }
          break;

        case 2:
          branch = validateOriginBranchName(engine, generalArgs[0]);
          if (isNaN(parseInt(generalArgs[1], 10))) {
            throw new GitError({
              msg: intl.str('git-error-bad-numeric-argument', { arg: generalArgs[1] })
            });
          }
          numToMake = parseInt(generalArgs[1], 10);
          break;

      }

      // make sure its a branch and exists
      var destBranch = engine.origin.resolveID(branch);
      if (destBranch.get('type') !== 'branch') {
        throw new GitError({
          msg: intl.str('git-error-options')
        });
      }

      engine.fakeTeamwork(numToMake, branch);
    }
  },

  clone: {
    regex: /^git +clone *?$/,
    descriptionKey: 'command-description-clone',
    execute: function(engine, command) {
      command.acceptNoGeneralArgs();
      if (!engine.clonePending) {
        if (engine.hasOrigin()) {
          // e.g. running `git clone` twice in a clone level -- suggesting
          // fakeCreateRemote here would just error with "origin exists"
          throw new GitError({
            msg: intl.str('git-error-clone-already-cloned')
          });
        }
        throw new GitError({
          msg: intl.str('git-error-clone-no-pending-remote')
        });
      }

      engine.cloneFromOrigin();
    }
  },

  fakeCreateRemote: {
    regex: /^git +fakeCreateRemote *?$/,
    descriptionKey: 'command-description-fakeCreateRemote',
    execute: function(engine, command) {
      command.acceptNoGeneralArgs();
      engine.makeOrigin(engine.printTree());
    }
  },

  remote: {
    regex: /^git +remote($|\s)/,
    descriptionKey: 'command-description-remote',
    options: [
      '-v'
    ],
    execute: function(engine, command) {
      command.acceptNoGeneralArgs();
      if (!engine.hasOrigin()) {
        throw new CommandResult({
          msg: ''
        });
      }

      engine.printRemotes({
        verbose: !!command.getOptionsMap()['-v']
      });
    }
  },

  fetch: {
    regex: /^git +fetch($|\s)/,
    descriptionKey: 'command-description-fetch',
    options: [
      { names: ['--force', '-f'] }
    ],
    execute: function(engine, command) {
      if (!engine.hasOrigin()) {
        throw new GitError({
          msg: intl.str('git-error-origin-required')
        });
      }

      var source;
      var destination;
      var commandOptions = command.getOptionsMap();
      var force = !!commandOptions['--force'];
      var generalArgs = command.getGeneralArgs();
      command.twoArgsForOrigin(generalArgs);
      assertOriginSpecified(generalArgs);

      var firstArg = generalArgs[1];
      if (firstArg && isColonRefspec(firstArg)) {
        if (firstArg[0] == '+') {
          force = true;
          firstArg = firstArg.substr(1);
        }
        var refspecParts = firstArg.split(':');
        source = refspecParts[0];
        assertRefNoModifiers(source);
        destination = validateBranchNameIfNeeded(
          engine,
          crappyUnescape(refspecParts[1])
        );
        assertNotCheckedOut(engine, destination);
      } else if (firstArg) {
        // here is the deal -- its JUST like git push. the first arg
        // is used as both the destination and the source, so we need
        // to make sure it exists as the source on REMOTE. however
        // technically we have a destination here as the remote branch
        source = firstArg;
        assertIsBranch(engine.origin, source);
        // get o/main locally if main is specified
      }
      if (source) { // empty string fails this check
        assertIsRef(engine.origin, source);
      }

      engine.fetch({
        source: source,
        destination: destination,
        force: force
      });
    }
  },

  branch: {
    sc: /^(gb|git br)($|\s)/,
    regex: /^git +branch($|\s)/,
    descriptionKey: 'command-description-branch',
    options: [
      { names: ['-d', '--delete'] },
      '-D',
      { names: ['-m', '--move'] },
      '-M',
      { names: ['-f', '--force'] },
      { names: ['-a', '--all'] },
      { names: ['-r', '--remotes'] },
      { names: ['-u', '--set-upstream-to'], args: 1 },
      { names: ['--contains'], args: 1 }
    ],
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();

      var args = null;
      // handle deletion first
      if (commandOptions['-d'] || commandOptions['-D']) {
        command.validateArgBounds(generalArgs, 1, Number.MAX_VALUE, '-d');

        generalArgs.forEach(function(name) {
          engine.validateAndDeleteBranch(name);
        });
        return;
      }

      if (commandOptions['-u']) {
        args = commandOptions['-u'].concat(generalArgs);
        command.validateArgBounds(args, 1, 2, '-u');
        var remoteBranch = crappyUnescape(args[0]);
        var branch = args[1] || engine.getOneBeforeCommit('HEAD').get('id');

        // some assertions, both of these have to exist first
        assertIsRemoteBranch(engine, remoteBranch);
        assertIsBranch(engine, branch);
        engine.setLocalToTrackRemote(
          engine.resolveID(branch),
          engine.resolveID(remoteBranch)
        );
        return;
      }

      if (commandOptions['--contains']) {
        args = commandOptions['--contains'];
        command.validateArgBounds(args, 1, 1, '--contains');
        engine.printBranchesWithout(args[0]);
        return;
      }

      if (commandOptions['-m'] || commandOptions['-M']) {
        var force = !!commandOptions['-M'];
        args = generalArgs;
        command.validateArgBounds(args, 1, 2, '-m');

        var oldName, newName;
        if (args.length === 1) {
          // git branch -m <newname>: rename current branch
          var headTarget = engine.HEAD.get('target');
          if (headTarget.get('type') !== 'branch') {
            throw new GitError({
              msg: intl.str('git-error-head-not-branch')
            });
          }
          oldName = headTarget.get('id');
          newName = args[0];
        } else {
          // git branch -m <oldname> <newname>
          oldName = args[0];
          newName = args[1];
        }

        engine.renameBranch(oldName, newName, force);
        return;
      }

      if (commandOptions['-f']) {
        args = generalArgs;
        command.twoArgsImpliedHead(args, '-f');

        // we want to force a branch somewhere
        engine.forceBranch(args[0], args[1]);
        return;
      }

      if (generalArgs.length === 0) {
        var branches;
        if (commandOptions['-a']) {
          branches = engine.getBranches();
        } else if (commandOptions['-r']) {
          branches = engine.getRemoteBranches();
        } else {
          branches = engine.getLocalBranches();
        }
        engine.printBranches(branches);
        return;
      }

      command.twoArgsImpliedHead(generalArgs);
      engine.branch(generalArgs[0], generalArgs[1]);
    }
  },

  add: {
    sc: /^ga($|\s)/,
    regex: /^git +add($|\s)/,
    descriptionKey: 'command-description-add',
    options: [
      { names: ['-A', '--all'] },
      { names: ['-u', '--update'] }
    ],
    execute: function(engine, command) {
      if (!engine.changesModelEngaged) {
        // classic graph-only levels have no working directory to stage
        throw new CommandResult({
          msg: intl.str('git-error-staging')
        });
      }
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();
      // '.', -A and -u all mean "stage everything"
      var stageAll = !!commandOptions['-A'] || !!commandOptions['-u'] ||
        generalArgs.indexOf('.') !== -1;
      engine.addFiles(stageAll ? null : generalArgs);
    }
  },

  restore: {
    regex: /^git +restore($|\s)/,
    descriptionKey: 'command-description-restore',
    options: [
      { names: ['--staged', '-S'] }
    ],
    execute: function(engine, command) {
      if (!engine.changesModelEngaged) {
        // no working directory in the classic levels, so nothing to restore
        throw new CommandResult({
          msg: intl.str('git-error-staging')
        });
      }
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();
      var staged = !!commandOptions['--staged'];
      engine.restoreFiles(generalArgs, { staged: staged });
    }
  },

  reset: {
    regex: /^git +reset($|\s)/,
    descriptionKey: 'command-description-reset',
    options: [
      '--hard',
      '--soft'
    ],
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();

      if (commandOptions['--soft']) {
        throw new GitError({
          msg: intl.str('git-error-staging')
        });
      }
      if (commandOptions['--hard']) {
        command.addWarning(
          intl.str('git-warning-hard')
        );
      }

      command.validateArgBounds(generalArgs, 1, 1);

      if (engine.getDetachedHead()) {
        throw new GitError({
          msg: intl.str('git-error-reset-detached')
        });
      }

      engine.reset(generalArgs[0]);
    }
  },

  revert: {
    regex: /^git +revert($|\s)/,
    descriptionKey: 'command-description-revert',
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();

      command.validateArgBounds(generalArgs, 1, Number.MAX_VALUE);
      engine.revert(generalArgs);
    }
  },

  merge: {
    regex: /^git +merge($|\s)/,
    descriptionKey: 'command-description-merge',
    options: [
      '--no-ff',
      '--squash'
    ],
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();

      var generalArgs = command.getGeneralArgs();
      command.validateArgBounds(generalArgs, 1, 1);

      var newCommit = engine.merge(
        generalArgs[0],
        {
          noFF: !!commandOptions['--no-ff'],
          squash: !!commandOptions['--squash']
        }
      );

      if (newCommit === undefined) {
        // its just a fast forward
        engine.animationFactory.refreshTree(
          engine.animationQueue, engine.gitVisuals
        );
        return;
      }

      engine.animationFactory.genCommitBirthAnimation(
        engine.animationQueue, newCommit, engine.gitVisuals
      );
    }
  },

  mergeMR: {
    regex: /^git +merge[MP]R($|\s)/,
    options: ['--delete-after-merge'],
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();
      var commandOptions = command.getOptionsMap();
      if (!engine.hasOrigin()) {
        throw new GitError({
          msg: intl.str('git-error-origin-required'),
        });
      }

      command.validateArgBounds(generalArgs, 2, 2);

      var fromBranch = validateOriginBranchName(engine, generalArgs[0]);
      var intoBranch = validateOriginBranchName(engine, generalArgs[1]);

      var origin = engine.origin;

      origin.checkout(intoBranch);
      var mergeCommit = origin.merge(fromBranch, { noFF: true });

      origin.animationFactory.genCommitBirthAnimation(
        origin.animationQueue,
        mergeCommit,
        origin.gitVisuals
      );

      if (commandOptions['--delete-after-merge']) {
        origin.validateAndDeleteBranch(fromBranch);
      }

      origin.checkout('main');

      origin.animationFactory.playRefreshAnimationAndFinish(
        origin.gitVisuals,
        origin.animationQueue
      );
    }
  },

  revlist: {
    dontCountForGolf: true,
    displayName: 'rev-list',
    regex: /^git +rev-list($|\s)/,
    descriptionKey: 'command-description-revlist',
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();
      command.validateArgBounds(generalArgs, 1);

      engine.revlist(generalArgs);
    }
  },

  log: {
    dontCountForGolf: true,
    regex: /^git +log($|\s)/,
    descriptionKey: 'command-description-log',
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();

      command.impliedHead(generalArgs, 0);
      engine.log(generalArgs);
    }
  },

  show: {
    dontCountForGolf: true,
    regex: /^git +show($|\s)/,
    descriptionKey: 'command-description-show',
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();
      command.oneArgImpliedHead(generalArgs);
      engine.show(generalArgs[0]);
    }
  },

  rebase: {
    sc: /^gr($|\s)/,
    descriptionKey: 'command-description-rebase',
    options: [
      '-i',
      { names: ['--solution-ordering'], args: 1 },
      // with no value: behave as if the user confirmed the rebase dialog
      { names: ['--interactive-test'], args: '?' },
      '--aboveAll',
      { names: ['-p', '--preserve-merges'] },
      { names: ['--onto'], args: 1 }
    ],
    regex: /^git +rebase($|\s)/,
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();

      if (commandOptions['-i']) {
        var args = generalArgs;
        command.twoArgsImpliedHead(args, ' -i');

        if (commandOptions['--interactive-test']) {
          engine.rebaseInteractiveTest(
            args[0],
            args[1], {
              interactiveTest: commandOptions['--interactive-test']
            }
          );
        } else {
          engine.rebaseInteractive(
            args[0],
            args[1], {
              aboveAll: !!commandOptions['--aboveAll'],
              initialCommitOrdering: commandOptions['--solution-ordering']
            }
          );
        }
        return;
      }

      if (commandOptions['--onto']) {
        var args = commandOptions['--onto'].concat(generalArgs);
        command.threeArgsImpliedHead(args, ' --onto');

        engine.rebaseOnto(args[0], args[1], args[2], {
          preserveMerges: !!commandOptions['-p']
        });

        return;
      }

      command.twoArgsImpliedHead(generalArgs);
      engine.rebase(generalArgs[0], generalArgs[1], {
        preserveMerges: !!commandOptions['-p']
      });
    }
  },

  status: {
    dontCountForGolf: true,
    sc: /^(gst|gs|git st)($|\s)/,
    regex: /^git +status($|\s)/,
    descriptionKey: 'command-description-status',
    execute: function(engine) {
      // no parsing at all
      engine.status();
    }
  },

  checkout: {
    sc: /^(go|git co)($|\s)/,
    regex: /^git +checkout($|\s)/,
    descriptionKey: 'command-description-checkout',
    options: [
      { names: ['-b'], args: 1 },
      { names: ['-B'], args: 1 }
    ],
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();

      var args = null;
      if (commandOptions['-b']) {
        // the user is really trying to just make a
        // branch and then switch to it. so first:
        args = commandOptions['-b'].concat(generalArgs);
        command.twoArgsImpliedHead(args, '-b');

        var validId = engine.validateBranchName(args[0]);
        engine.branch(validId, args[1]);
        engine.checkout(validId);
        return;
      }

      if (commandOptions['-B']) {
        args = commandOptions['-B'].concat(generalArgs);
        command.twoArgsImpliedHead(args, '-B');

        engine.forceBranch(args[0], args[1]);
        engine.checkout(args[0]);
        return;
      }

      if (generalArgs.length === 1 && generalArgs[0] === '-') {
        // get the heads last location
        var lastPlace = engine.HEAD.get('lastLastTarget');
        if (!lastPlace) {
          throw new GitError({
            msg: intl.str('git-result-nothing')
          });
        }
        engine.HEAD.set('target', lastPlace);
        return;
      }

      command.validateArgBounds(generalArgs, 1, 1);

      engine.checkout(engine.crappyUnescape(generalArgs[0]));
    }
  },

  push: {
    regex: /^git +push($|\s)/,
    descriptionKey: 'command-description-push',
    options: [
      { names: ['--force', '-f'] },
      { names: ['--delete', '-d'] }
    ],
    execute: function(engine, command) {
      if (!engine.hasOrigin()) {
        throw new GitError({
          msg: intl.str('git-error-origin-required')
        });
      }

      var options = {};
      var destination;
      var source;
      var sourceObj;
      var commandOptions = command.getOptionsMap();
      var force = !!commandOptions['--force'];
      var isDelete = !!commandOptions['--delete'];

      // git push is pretty complex in terms of
      // the arguments it wants as well... get ready!
      var generalArgs = command.getGeneralArgs();

      command.twoArgsForOrigin(generalArgs);
      assertOriginSpecified(generalArgs);
      var firstArg = generalArgs[1];

      if(isDelete) {
        if(!firstArg) {
          throw new GitError({
            msg: intl.str('git-error-delete-no-refs')
          });
        }

        if(isColonRefspec(firstArg)) {
          throw new GitError({
            msg: intl.str('git-error-delete-plain-refs')
          });
        }

        // transform delete target ref to delete colon refspec
        firstArg = ":"+firstArg;
      }

      if (firstArg && isColonRefspec(firstArg)) {
        if (firstArg[0] == '+') {
          force = true;
          firstArg = firstArg.substr(1);
        }
        var refspecParts = firstArg.split(':');
        source = refspecParts[0];
        destination = validateBranchName(engine, refspecParts[1]);
        if (source === "" && !engine.origin.resolveID(destination)) {
          throw new GitError({
            msg: intl.str('git-error-delete-nonexistent', { branch: options.destination })
          });
        }
      } else {
        if (firstArg) {
          // we are using this arg as destination AND source. the dest branch
          // can be created on demand but we at least need this to be a source
          // locally otherwise we will fail
          assertIsRef(engine, firstArg);
          sourceObj = engine.resolveID(firstArg);
        } else {
          // since they have not specified a source or destination, then
          // we source from the branch we are on (or HEAD)
          sourceObj = engine.getOneBeforeCommit('HEAD');
        }
        source = sourceObj.get('id');

        // HOWEVER we push to either the remote tracking branch we have
        // OR a new named branch if we aren't tracking anything
        if (sourceObj.getRemoteTrackingBranchID &&
            sourceObj.getRemoteTrackingBranchID()) {
          assertBranchIsRemoteTracking(engine, source);
          var remoteBranch = sourceObj.getRemoteTrackingBranchID();
          destination = engine.resolveID(remoteBranch).getBaseID();
        } else {
          destination = validateBranchName(engine, source);
        }
      }
      if (source) {
        assertIsRef(engine, source);
      }

      engine.push({
        // NOTE -- very important! destination and source here
        // are always, always strings. very important :D
        destination: destination,
        source: source,
        force: force
      });
    }
  },

  describe: {
    regex: /^git +describe($|\s)/,
    descriptionKey: 'command-description-describe',
    execute: function(engine, command) {
      // first if there are no tags, we can't do anything so just throw
      if (engine.tagCollection.toArray().length === 0) {
        throw new GitError({
          msg: intl.str('git-error-describe-no-tags')
        });
      }

      var generalArgs = command.getGeneralArgs();
      command.oneArgImpliedHead(generalArgs);
      assertIsRef(engine, generalArgs[0]);

      engine.describe(generalArgs[0]);
    }
  },

  tag: {
    regex: /^git +tag($|\s)/,
    descriptionKey: 'command-description-tag',
    options: [
      { names: ['-d', '--delete'] }
    ],
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();
      var commandOptions = command.getOptionsMap();

      if (commandOptions['-d']) {
        // like "git branch -d", this takes any number of tags
        var tagIDs = generalArgs;
        if (!tagIDs.length) {
          throw new GitError({
            msg: intl.str('git-error-no-tag-to-remove')
          });
        }

        // look up every tag before removing any, so a typo in one name
        // doesn't leave the deletion half done
        var tagsToRemove = tagIDs.map(function(tagID) {
          var tagToRemove = engine.tagCollection.find(function(tag) {
            return tag.get('id') === tagID;
          });

          if (tagToRemove === undefined) {
            throw new GitError({
              msg: intl.str('git-error-no-tag-to-remove')
            });
          }
          return tagToRemove;
        });

        tagsToRemove.forEach(function(tag) {
          engine.tagCollection.remove(tag);
          delete engine.refs[tag.get('id')];
        });

        engine.gitVisuals.refreshTree();
        return;
      }

      if (generalArgs.length === 0) {
        var tags = engine.getTags();
        engine.printTags(tags);
        return;
      }

      command.twoArgsImpliedHead(generalArgs);
      engine.tag(generalArgs[0], generalArgs[1]);
    }
  },

  switch: {
    sc: /^(gsw|git sw)($|\s)/,
    regex: /^git +switch($|\s)/,
    descriptionKey: 'command-description-switch',
    options: [
      { names: ['-c', '--create'], args: 1 },
      { names: ['-C', '--force-create'], args: 1 },
      // the actual tracking is set up by engine.branch() below, which links
      // to a remote start-point automatically (the same path
      // "git checkout -b <branch> <remote>" already uses)
      { names: ['-t', '--track'] },
      { names: ['-d', '--detach'] }
    ],
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();
      var commandOptions = command.getOptionsMap();

      let createOption = commandOptions['-c'];
      if (createOption) {
        // the user is really trying to just make a
        // branch and then switch to it. so first:
        let args = createOption.concat(generalArgs)
        command.twoArgsImpliedHead(args, '-c');

        let validId = engine.validateBranchName(args[0]);
        engine.branch(validId, args[1]);
        engine.checkout(validId);
        return;
      }
      let fcOption = commandOptions['-C'];
      if (fcOption) {
        let args = fcOption.concat(generalArgs);
        command.twoArgsImpliedHead(args, '-C');

        let validId = engine.validateBranchName(args[0]);
        engine.forceBranch(validId, args[1]);
        engine.checkout(validId);
        return;
      }

      if (generalArgs.length === 1 && generalArgs[0] === '-') {
        // get the heads last location
        var lastPlace = engine.HEAD.get('lastLastTarget');
        if (!lastPlace) {
          throw new GitError({
            msg: intl.str('git-result-nothing')
          });
        }
        engine.HEAD.set('target', lastPlace);
        return;
      }

      if (commandOptions['-d']) {
        // "-d" / "--detach" explicitly asks to check out a commit-ish and
        // leave HEAD detached there
        command.validateArgBounds(generalArgs, 1, 1, '-d');
        engine.checkout(engine.crappyUnescape(generalArgs[0]));
        return;
      }

      command.validateArgBounds(generalArgs, 1, 1);

      // Unlike "git checkout", "git switch" will not silently leave you on a
      // detached HEAD. If the target isn't a branch (i.e. it's a commit or a
      // tag), refuse and point the user at "--detach", matching real git.
      var target = engine.crappyUnescape(generalArgs[0]);
      if (engine.getType(target) !== 'branch') {
        throw new GitError({
          msg: intl.str('git-error-switch-detach', { ref: generalArgs[0] })
        });
      }

      engine.checkout(target);
    }
  }
};

var instantCommands = [
  // "git help {command}" is handled over in the sandbox commands, so only
  // grab the bare forms here
  [/^git +help *$|^git *$/, function() {
    var lines = [
      intl.str('git-version'),
      '<br/>',
      intl.str('git-usage'),
      escapeString(intl.str('git-usage-command')),
      '<br/>',
      intl.str('git-supported-commands'),
      '<br/>'
    ];

    var commands = require('../commands').commands.getOptionMap()['git'];
    var descriptions = require('../commands').commands.getDescriptionMap()['git'];
    // Commands that are learning tools with no official docs
    var customCommands = ['fakeTeamwork', 'mergeMR'];    
    // build up a nice display of what we support
    Object.keys(commands).forEach(function(command) {
      var commandOptions = commands[command];      
      // Add command name with documentation link (skip for custom commands)
      if (customCommands.indexOf(command) === -1) {
        var docUrl = 'https://git-scm.com/docs/git-' + command;
        lines.push('<b>git ' + command + '</b> - <a href="' + docUrl + '" target="_blank" style="color: #87CEEB">📖 Docs</a>');
      } else {
        lines.push('<b>git ' + command + '</b>');
      } 
      // Add description if available
      if (descriptions[command]) {
        lines.push('\t <i>' + descriptions[command] + '</i>');
      }
      // Add options
      Object.keys(commandOptions).forEach(function(optionName) {
        lines.push('\t ' + optionName);
      }, this);
    }, this);

    // format and throw
    var msg = lines.join('\n');
    msg = msg.replace(/\t/g, '&nbsp;&nbsp;&nbsp;');
    throw new CommandResult({
      msg: msg
    });
  }]
];

exports.commandConfig = commandConfig;
exports.instantCommands = instantCommands;
