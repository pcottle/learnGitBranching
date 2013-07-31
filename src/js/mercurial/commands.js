var _ = require('underscore');
var intl = require('../intl');

var GitCommands = require('../git/commands');

var commandConfig = {
  commit: {
    regex: /^hg +commit($|\s)/,
    options: [
      '--amend',
      '-m'
    ],
    execute: function(engine, command) {
      return GitCommands.commandConfig.commit.execute(engine, command);
    }
  }
};

exports.commandConfig = commandConfig;
