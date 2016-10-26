var _ = require('underscore');
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
  engine.resolveID(ref); // will throw giterror if cant resolve
};

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
      msg: intl.todo(
        'cannot fetch to ' + ref + ' when checked out on ' + ref
      )
    });
  }
};

var assertIsBranch = function(engine, ref) {
  assertIsRef(engine, ref);
  var obj = engine.resolveID(ref);
  if (!obj || obj.get('type') !== 'branch') {
    throw new GitError({
      msg: intl.todo(
        ref + ' is not a branch'
      )
    });
  }
};

var assertIsRemoteBranch = function(engine, ref) {
  assertIsRef(engine, ref);
  var obj = engine.resolveID(ref);

  if (obj.get('type') !== 'branch' ||
      !obj.getIsRemote()) {
    throw new GitError({
      msg: intl.todo(
        ref + ' is not a remote branch'
      )
    });
  }
};

var assertOriginSpecified = function(generalArgs) {
  if (!generalArgs.length) {
    return;
  }
  if (generalArgs[0] !== 'origin') {
    throw new GitError({
      msg: intl.todo(
        generalArgs[0] + ' is not a remote in your repository! try adding origin that argument'
      )
    });
  }
};

var assertBranchIsRemoteTracking = function(engine, branchName) {
  branchName = crappyUnescape(branchName);
  if (!engine.resolveID(branchName)) {
    throw new GitError({
      msg: intl.todo(branchName + ' is not a branch!')
    });
  }
  var branch = engine.resolveID(branchName);
  if (branch.get('type') !== 'branch') {
    throw new GitError({
      msg: intl.todo(branchName + ' is not a branch!')
    });
  }

  var tracking = branch.getRemoteTrackingBranchID();
  if (!tracking) {
    throw new GitError({
      msg: intl.todo(
        branchName + ' is not a remote tracking branch! I dont know where to push'
      )
    });
  }
  return tracking;
};

var commandConfig = {
  commit: {
    sc: /^(gc|git ci)($|\s)/,
    regex: /^git +commit($|\s)/,
    options: [
      '--amend',
      '-a',
      '-am',
      '-m'
    ],
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      command.acceptNoGeneralArgs();

      if (commandOptions['-am'] && (
          commandOptions['-a'] || commandOptions['-m'])) {
        throw new GitError({
          msg: intl.str('git-error-options')
        });
      }

      var msg = null;
      var args = null;
      if (commandOptions['-a']) {
        command.addWarning(intl.str('git-warning-add'));
      }

      if (commandOptions['-am']) {
        args = commandOptions['-am'];
        command.validateArgBounds(args, 1, 1, '-am');
        msg = args[0];
      }

      if (commandOptions['-m']) {
        args = commandOptions['-m'];
        command.validateArgBounds(args, 1, 1, '-m');
        msg = args[0];
      }

      if (commandOptions['--amend']) {
        args = commandOptions['--amend'];
        command.validateArgBounds(args, 0, 0, '--amend');
      }

      var newCommit = engine.commit({
        isAmend: !!commandOptions['--amend']
      });
      if (msg) {
        msg = msg
          .replace(/&quot;/g, '"')
          .replace(/^"/g, '')
          .replace(/"$/g, '');

        newCommit.set('commitMessage', msg);
      }

      var promise = engine.animationFactory.playCommitBirthPromiseAnimation(
        newCommit,
        engine.gitVisuals
      );
      engine.animationQueue.thenFinish(promise);
    }
  },

  cherrypick: {
    displayName: 'cherry-pick',
    regex: /^git +cherry-pick($|\s)/,
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();

      command.validateArgBounds(generalArgs, 1, Number.MAX_VALUE);

      var set = Graph.getUpstreamSet(engine, 'HEAD');
      // first resolve all the refs (as an error check)
      var toCherrypick = _.map(generalArgs, function(arg) {
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

  pull: {
    regex: /^git +pull($|\s)/,
    options: [
      '--rebase'
    ],
    execute: function(engine, command) {
      if (!engine.hasOrigin()) {
        throw new GitError({
          msg: intl.str('git-error-origin-required')
        });
      }

      var commandOptions = command.getOptionsMap();
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
        var refspecParts = firstArg.split(':');
        source = refspecParts[0];
        destination = validateBranchNameIfNeeded(
          engine,
          crappyUnescape(refspecParts[1])
        );
        assertNotCheckedOut(engine, destination);
      } else if (firstArg) {
        source = firstArg;
        assertIsBranch(engine.origin, source);
        // get o/master locally if master is specified
        destination = engine.origin.refs[source].getPrefixedID();
      } else {
        // cant be detached
        if (engine.getDetachedHead()) {
          throw new GitError({
            msg: intl.todo('Git pull can not be executed in detached HEAD mode if no remote branch specified!')
          });
        }
        // ok we need to get our currently checked out branch
        // and then specify source and dest
        var branch = engine.getOneBeforeCommit('HEAD');
        var branchName = branch.get('id');
        assertBranchIsRemoteTracking(engine, branchName);
        destination = branch.getRemoteTrackingBranchID();
        source = destination.replace(ORIGIN_PREFIX, '');
      }

      engine.pull({
        source: source,
        destination: destination,
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
          branch = 'master';
          numToMake = 1;
          break;

        // git fakeTeamwork 10 or git fakeTeamwork foo
        case 1:
          if (isNaN(parseInt(generalArgs[0], 10))) {
            branch = validateOriginBranchName(engine, generalArgs[0]);
            numToMake = 1;
          } else {
            numToMake = parseInt(generalArgs[0], 10);
            branch = 'master';
          }
          break;

        case 2:
          branch = validateOriginBranchName(engine, generalArgs[0]);
          if (isNaN(parseInt(generalArgs[1], 10))) {
            throw new GitError({
              msg: 'Bad numeric argument: ' + generalArgs[1]
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
    execute: function(engine, command) {
      command.acceptNoGeneralArgs();
      engine.makeOrigin(engine.printTree());
    }
  },

  remote: {
    regex: /^git +remote($|\s)/,
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
    execute: function(engine, command) {
      if (!engine.hasOrigin()) {
        throw new GitError({
          msg: intl.str('git-error-origin-required')
        });
      }

      var source;
      var destination;
      var generalArgs = command.getGeneralArgs();
      command.twoArgsForOrigin(generalArgs);
      assertOriginSpecified(generalArgs);

      var firstArg = generalArgs[1];
      if (firstArg && isColonRefspec(firstArg)) {
        var refspecParts = firstArg.split(':');
        source = refspecParts[0];
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
        // get o/master locally if master is specified
        destination = engine.origin.refs[source].getPrefixedID();
      }
      if (source) { // empty string fails this check
        assertIsRef(engine.origin, source);
      }

      engine.fetch({
        source: source,
        destination: destination
      });
    }
  },

  branch: {
    sc: /^(gb|git br)($|\s)/,
    regex: /^git +branch($|\s)/,
    options: [
      '-d',
      '-D',
      '-f',
      '-a',
      '-r',
      '-u',
      '--contains'
    ],
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();

      var args = null;
      // handle deletion first
      if (commandOptions['-d'] || commandOptions['-D']) {
        var names = commandOptions['-d'] || commandOptions['-D'];
        names = names.concat(generalArgs);
        command.validateArgBounds(names, 1, Number.MAX_VALUE, '-d');

        _.each(names, function(name) {
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
          engine.refs[branch],
          engine.refs[remoteBranch]
        );
        return;
      }

      if (commandOptions['--contains']) {
        args = commandOptions['--contains'];
        command.validateArgBounds(args, 1, 1, '--contains');
        engine.printBranchesWithout(args[0]);
        return;
      }

      if (commandOptions['-f']) {
        args = commandOptions['-f'].concat(generalArgs);
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
    dontCountForGolf: true,
    sc: /^ga($|\s)/,
    regex: /^git +add($|\s)/,
    execute: function() {
      throw new CommandResult({
        msg: intl.str('git-error-staging')
      });
    }
  },

  reset: {
    regex: /^git +reset($|\s)/,
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
        // dont absorb the arg off of --hard
        generalArgs = generalArgs.concat(commandOptions['--hard']);
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
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();

      command.validateArgBounds(generalArgs, 1, Number.MAX_VALUE);
      engine.revert(generalArgs);
    }
  },

  merge: {
    regex: /^git +merge($|\s)/,
    options: [
      '--no-ff'
    ],
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();
      command.validateArgBounds(generalArgs, 1, 1);

      var newCommit = engine.merge(
        generalArgs[0],
        { noFF: !!commandOptions['--no-ff'] }
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

  log: {
    dontCountForGolf: true,
    regex: /^git +log($|\s)/,
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();

      if (generalArgs.length == 2) {
        // do fancy git log branchA ^branchB
        if (generalArgs[1][0] == '^') {
          engine.logWithout(generalArgs[0], generalArgs[1]);
        } else {
          throw new GitError({
            msg: intl.str('git-error-options')
          });
        }
      }

      command.oneArgImpliedHead(generalArgs);
      engine.log(generalArgs[0]);
    }
  },

  show: {
    dontCountForGolf: true,
    regex: /^git +show($|\s)/,
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();
      command.oneArgImpliedHead(generalArgs);
      engine.show(generalArgs[0]);
    }
  },

  rebase: {
    sc: /^gr($|\s)/,
    options: [
      '-i',
      '--solution-ordering',
      '--interactive-test',
      '--aboveAll',
      '-p',
      '--preserve-merges'
    ],
    regex: /^git +rebase($|\s)/,
    execute: function(engine, command) {
      var commandOptions = command.getOptionsMap();
      var generalArgs = command.getGeneralArgs();

      if (commandOptions['-i']) {
        var args = commandOptions['-i'].concat(generalArgs);
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

      command.twoArgsImpliedHead(generalArgs);
      engine.rebase(generalArgs[0], generalArgs[1], {
        preserveMerges: commandOptions['-p'] || commandOptions['--preserve-merges']
      });
    }
  },

  status: {
    dontCountForGolf: true,
    sc: /^(gst|gs|git st)($|\s)/,
    regex: /^git +status($|\s)/,
    execute: function(engine) {
      // no parsing at all
      engine.status();
    }
  },

  checkout: {
    sc: /^(go|git co)($|\s)/,
    regex: /^git +checkout($|\s)/,
    options: [
      '-b',
      '-B',
      '-'
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

      if (commandOptions['-']) {
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

      if (commandOptions['-B']) {
        args = commandOptions['-B'].concat(generalArgs);
        command.twoArgsImpliedHead(args, '-B');

        engine.forceBranch(args[0], args[1]);
        engine.checkout(args[0]);
        return;
      }

      command.validateArgBounds(generalArgs, 1, 1);

      engine.checkout(engine.crappyUnescape(generalArgs[0]));
    }
  },

  push: {
    regex: /^git +push($|\s)/,
    options: [
      '--force'
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

      // git push is pretty complex in terms of
      // the arguments it wants as well... get ready!
      var generalArgs = command.getGeneralArgs();
      command.twoArgsForOrigin(generalArgs);
      assertOriginSpecified(generalArgs);

      var firstArg = generalArgs[1];
      if (firstArg && isColonRefspec(firstArg)) {
        var refspecParts = firstArg.split(':');
        source = refspecParts[0];
        destination = validateBranchName(engine, refspecParts[1]);
        if (source === "" && !engine.origin.refs[destination]) {
          throw new GitError({
            msg: intl.todo(
              'cannot delete branch ' + options.destination + ' which doesnt exist'
            )
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
          destination = engine.refs[remoteBranch].getBaseID();
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
        force: !!commandOptions['--force']
      });
    }
  },

  describe: {
    regex: /^git +describe($|\s)/,
    execute: function(engine, command) {
      // first if there are no tags, we cant do anything so just throw
      if (engine.tagCollection.toArray().length === 0) {
        throw new GitError({
          msg: intl.todo(
            'fatal: No tags found, cannot describe anything.'
          )
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
    execute: function(engine, command) {
      var generalArgs = command.getGeneralArgs();
      if (generalArgs.length === 0) {
        var tags = engine.getTags();
        engine.printTags(tags);
        return;
      }

      command.twoArgsImpliedHead(generalArgs);
      engine.tag(generalArgs[0], generalArgs[1]);
    }
  }
};

var instantCommands = [
  [/^(git help($|\s)|git$)/, function() {
    var lines = [
      intl.str('git-version'),
      '<br/>',
      intl.str('git-usage'),
      _.escape(intl.str('git-usage-command')),
      '<br/>',
      intl.str('git-supported-commands'),
      '<br/>'
    ];

    var commands = require('../commands').commands.getOptionMap()['git'];
    // build up a nice display of what we support
    _.each(commands, function(commandOptions, command) {
      lines.push('git ' + command);
      _.each(commandOptions, function(vals, optionName) {
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

