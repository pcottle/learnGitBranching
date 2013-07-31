var _ = require('underscore');
var intl = require('../intl');

var GitCommands = require('../git/commands');
var Errors = require('../util/errors');

var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var commandConfig = {
  commit: {
    regex: /^hg +(commit|ci)($|\s)/,
    options: [
      '--amend',
      '-A',
      '-m'
    ],
    delegate: function(engine, command) {
      var options = command.getSupportedMap();
      console.log(options);
      if (options['-A']) {
        command.addWarning(intl.str('hg-a-option'));
      }

      return {
        vcs: 'git',
        name: 'commit'
      };
    }
  },

  status: {
    regex: /^hg +status *$/,
    execute: function(engine, command) {
      throw new GitError({
        msg: intl.str('hg-error-no-status')
      });
    }
  },

  'export': {
    regex: /^hg +export($|\s)/,
    delegate: function(engine, command) {
      command.mapDotToHead();
      return {
        vcs: 'git',
        name: 'show'
      };
    }
  },

  log: {
    regex: /^hg +log *$/,
    delegate: function(engine, command) {
      command.mapDotToHead();
      return {
        vcs: 'git',
        name: 'log'
      };
    }
  },

  bookmarks: {
    // NO OPTIONS for this command, -r goes
    // to the bookmark command instead
    regex: /^hg (bookmarks|book) *$/,
    delegate: function(engine, command) {
      return {
        vcs: 'git',
        name: 'branch'
      };
    }
  },

  bookmark: {
    regex: /^hg (bookmark|book)($|\s)/,
    options: [
      '-r',
      '-m',
      '-f',
      '-d'
    ],
    delegate: function(engine, command) {
      var options = command.getSupportedMap();
      var generalArgs = command.getGeneralArgs();
      var branchName;
      var rev;

      if (options['-r']) {
        // we specified a revision with -r but
        // need to flip the order
        branchName = options['-r'][1] || '';
        rev = options['-r'][0] || '';
        command.setSupportedMap({
          '-b': [branchName, rev]
        });
        return {
          vcs: 'git',
          name: 'checkout'
        };
      } else if (options['-f']) {
        // TODO sid0 -- also assuming that
        // bookmark -f <REV> <name> is
        // the order here
        branchName = options['-f'][1] || '';
        rev = options['-f'][0] || '';
        command.setSupportedMap({
          '-f': [branchName, rev]
        });
        return {
          vcs: 'git',
          name: 'branch'
        };
      } else if (options['-d']) {
        return {
          vcs: 'git',
          name: 'branch'
        };
      } else if (options['-m']) {
        // TODO sid0 -- order is -r <oldname> <newname>
        var oldName = options['-m'][0] || '';
        var newName = options['-m'][1] || '';
        return {multiDelegate: [{
          vcs: 'git',
          name: 'checkout',
          options: {
            '-b': [newName, oldName]
          }
        }, {
          vcs: 'git',
          name: 'branch',
          options: {
            '-d': [oldName]
          }
        }]};
      }

      return {
        vcs: 'git',
        name: 'branch'
      };
    }
  },

  ammend: {
    regex: /^hg +ammend *$/,
    delegate: function(engine, command) {
      command.setOptionMap({
        '--amend': true
      });
      return {
        vcs: 'hg',
        name: 'commit'
      };
    }
  },

  summary: {
    regex: /^hg +(summary|sum) *$/,
    delegate: function(engine, command) {
      return {
        vcs: 'git',
        name: 'branch'
      };
    }
  }
};

exports.commandConfig = commandConfig;
