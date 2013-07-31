var _ = require('underscore');
var intl = require('../intl');

var GitCommands = require('../git/commands');

var hgCommandConfig = {
  commit: {
    regex: /^hg +commit($|\s)/,
    options: [
      '--amend',
      '-m'
    ],
    execute: function(engine, command) {
      return GitCommands.gitCommandConfig.commit.execute(engine, command);
    }
  }
};

exports.hgCommandConfig = hgCommandConfig;
