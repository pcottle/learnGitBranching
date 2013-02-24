var _ = require('underscore');
var intl = require('../intl');

var GitCommands = require('../git/commands');

var Errors = require('../util/errors');
var GitError = Errors.GitError;

function DisabledMap(options) {
  options = options || {};
  this.disabledMap = options.disabledMap || {
    'git cherry-pick': true,
    'git rebase': true
  };
}

DisabledMap.prototype.getInstantCommands = function() {
  // this produces an array of regex / function pairs that can be
  // piped into a parse waterfall to disable certain git commmands
  // :D
  var instants = [];
  var onMatch = function() {
    throw new GitError({
      msg: intl.str('command-disabled')
    });
  };

  _.each(this.disabledMap, function(val, disabledCommand) {
    var gitRegex = GitCommands.regexMap[disabledCommand];
    if (!gitRegex) {
      throw new Error('wuttttt this disbaled command' + disabledCommand +
        ' has no regex matching');
    }
    instants.push([gitRegex, onMatch]);
  });
  return instants;
};

exports.DisabledMap = DisabledMap;

