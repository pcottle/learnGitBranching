var intl = require('../intl');

var Commands = require('../commands');

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
  // piped into a parse waterfall to disable certain git commands
  // :D
  var instants = [];
  var onMatch = function() {
    throw new GitError({
      msg: intl.str('command-disabled')
    });
  };

  Object.keys(this.disabledMap).forEach(function(disabledCommand) {
    // XXX get hold of vcs from disabledMap
    var vcs = 'git';
    disabledCommand = disabledCommand.slice(vcs.length + 1);
    var gitRegex = Commands.commands.getRegexMap()[vcs][disabledCommand];
    if (!gitRegex) {
      throw new Error('wuttttt this disbaled command' + disabledCommand +
        ' has no regex matching');
    }
    instants.push([gitRegex, onMatch]);
  }.bind(this));
  return instants;
};

exports.DisabledMap = DisabledMap;

