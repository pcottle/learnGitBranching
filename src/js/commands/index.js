var _ = require('underscore');
var Q = require('q');

var intl = require('../intl');

var Errors = require('../util/errors');
var GitError = Errors.GitError;
var CommandResult = Errors.CommandResult;

var Commands = {
  commit: function(engine, command) {
    var commandOptions = command.getSupportedMap();
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

    var newCommit = engine.commit({
      isAmend: commandOptions['--amend']
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
  },

  cherrypick: function(engine, command) {
    var commandOptions = command.getSupportedMap();
    var generalArgs = command.getGeneralArgs();

    command.validateArgBounds(generalArgs, 1, Number.MAX_VALUE);

    var set = engine.getUpstreamSet('HEAD');
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
  },

  pull: function(engine, command) {
    if (!engine.hasOrigin()) {
      throw new GitError({
        msg: intl.str('git-error-origin-required')
      });
    }

    var commandOptions = command.getSupportedMap();
    command.acceptNoGeneralArgs();
    engine.pull({
      isRebase: commandOptions['--rebase']
    });
  },

  fakeTeamwork: function(engine, command) {
    var generalArgs = command.getGeneralArgs();
    if (!engine.hasOrigin()) {
      throw new GitError({
        msg: intl.str('git-error-origin-required')
      });
    }

    command.validateArgBounds(generalArgs, 0, 2);
    // allow formats of: git Faketeamwork 2 or git Faketeamwork side 3
    var branch = (engine.origin.refs[generalArgs[0]]) ?
      generalArgs[0] : 'master';
    var numToMake = parseInt(generalArgs[0], 10) || generalArgs[1] || 1;

    // make sure its a branch and exists
    var destBranch = engine.origin.resolveID(branch);
    if (destBranch.get('type') !== 'branch') {
      throw new GitError({
        msg: intl.str('git-error-options')
      });
    }
      
    engine.fakeTeamwork(numToMake, branch);
  },

  clone: function(engine, command) {
    command.acceptNoGeneralArgs();
    engine.makeOrigin(engine.printTree());
  },

  fetch: function(engine, command) {
    if (!engine.hasOrigin()) {
      throw new GitError({
        msg: intl.str('git-error-origin-required')
      });
    }
    command.acceptNoGeneralArgs();
    engine.fetch();
  },

  branch: function(engine, command) {
    var commandOptions = command.getSupportedMap();
    var generalArgs = command.getGeneralArgs();

    var args = null;
    // handle deletion first
    if (commandOptions['-d'] || commandOptions['-D']) {
      var names = commandOptions['-d'] || commandOptions['-D'];
      command.validateArgBounds(names, 1, Number.MAX_VALUE, '-d');

      _.each(names, function(name) {
        engine.deleteBranch(name);
      });
      return;
    }

    if (commandOptions['--contains']) {
      args = commandOptions['--contains'];
      command.validateArgBounds(args, 1, 1, '--contains');
      engine.printBranchesWithout(args[0]);
      return;
    }

    if (commandOptions['-f']) {
      args = commandOptions['-f'];
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
  },

  add: function() {
    throw new CommandResult({
      msg: intl.str('git-error-staging')
    });
  },

  reset: function(engine, command) {
    var commandOptions = command.getSupportedMap();
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
  },

  revert: function(engine, command) {
    var generalArgs = command.getGeneralArgs();

    command.validateArgBounds(generalArgs, 1, Number.MAX_VALUE);
    engine.revert(generalArgs);
  },

  merge: function(engine, command) {
    var generalArgs = command.getGeneralArgs();
    command.validateArgBounds(generalArgs, 1, 1);

    var newCommit = engine.merge(generalArgs[0]);

    if (newCommit === undefined) {
      // its just a fast forwrard
      engine.animationFactory.refreshTree(
        engine.animationQueue, engine.gitVisuals
      );
      return;
    }

    engine.animationFactory.genCommitBirthAnimation(
      engine.animationQueue, newCommit, engine.gitVisuals
    );
  },

  log: function(engine, command) {
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
  },

  show: function(engine, command) {
    var generalArgs = command.getGeneralArgs();
    command.oneArgImpliedHead(generalArgs);
    engine.show(generalArgs[0]);
  },

  rebase: function(engine, command) {
    var commandOptions = command.getSupportedMap();
    var generalArgs = command.getGeneralArgs();

    if (commandOptions['-i']) {
      var args = commandOptions['-i'];
      command.twoArgsImpliedHead(args, ' -i');
      engine.rebaseInteractive(args[0], args[1]);
      return;
    }

    command.twoArgsImpliedHead(generalArgs);
    engine.rebase(generalArgs[0], generalArgs[1]);
  },

  status: function(engine) {
    // no parsing at all
    engine.status();
  },

  checkout: function(engine, command) {
    var commandOptions = command.getSupportedMap();
    var generalArgs = command.getGeneralArgs();

    var args = null;
    if (commandOptions['-b']) {
      if (generalArgs.length) {
        throw new GitError({
          msg: intl.str('git-error-options')
        });
      }

      // the user is really trying to just make a branch and then switch to it. so first:
      args = commandOptions['-b'];
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
      args = commandOptions['-B'];
      command.twoArgsImpliedHead(args, '-B');

      engine.forceBranch(args[0], args[1]);
      engine.checkout(args[0]);
      return;
    }

    command.validateArgBounds(generalArgs, 1, 1);

    engine.checkout(engine.crappyUnescape(generalArgs[0]));
  },

  push: function(engine, command) {
    if (!engine.hasOrigin()) {
      throw new GitError({
        msg: intl.str('git-error-origin-required')
      });
    }
    command.acceptNoGeneralArgs();
    engine.push();
  },

  noComma: 123
};

module.exports = Commands;
