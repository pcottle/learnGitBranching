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

    var newCommit = engine.commit();
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

  noComma: 123
};

module.exports = Commands;
