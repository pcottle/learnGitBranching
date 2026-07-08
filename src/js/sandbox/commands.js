var util = require('../util');

var constants = require('../util/constants');
var intl = require('../intl');

var Commands = require('../commands');
var Errors = require('../util/errors');
var CommandProcessError = Errors.CommandProcessError;
var LocaleStore = require('../stores/LocaleStore');
var LocaleActions = require('../actions/LocaleActions');
var LevelStore = require('../stores/LevelStore');
var GlobalStateStore = require('../stores/GlobalStateStore');
var GlobalStateActions = require('../actions/GlobalStateActions');
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

// Commands that are learning tools with no official docs
var customGitCommands = ['fakeTeamwork', 'mergeMR'];

// Descriptions for the sandbox / level commands defined in the regex maps
// below (and in ../level). These power `help {command}` and also show up
// in `show commands`, so commands like `importTreeNow` are no longer
// undocumented (see issue #1234)
var sandboxCommandDescriptions = {
  'help': 'Show the help dialog. Run `help {command}` to get documentation on a specific command',
  'reset': 'Undo all commands entered so far and restore the initial tree',
  'reset solved': 'Reset the solved state of the current level',
  'delay': 'Set a delay (in milliseconds) that runs after each command, e.g. `delay 1000`',
  'clear': 'Clear the entire command history',
  'exit level': 'Exit the current level and return to the sandbox',
  'sandbox': 'Exit the current level and return to the sandbox',
  'level': 'Jump into a level, e.g. `level intro1`, or open the level selection view',
  'levels': 'Open the level selection view',
  'build level': 'Start the level builder to create your own level',
  'export tree': 'Export the current tree as a JSON blob you can save and import later',
  'import tree': 'Import a tree from a JSON blob (opens a text input)',
  'importTreeNow': 'Import a tree immediately from the JSON blob given after the command',
  'import level': 'Import a level from a JSON blob (opens a text input)',
  'importLevelNow': 'Import a level immediately from the JSON blob given after the command',
  'undo': 'Undo the last command',
  'share permalink': 'Generate a shareable permalink of the current tree',
  'show goal': 'Show the goal tree for the current level',
  'hide goal': 'Hide the goal tree',
  'show solution': 'Write the current level\'s solution into the command box (without running it) so you can read, edit, or run it yourself',
  'objective': 'Show the objective of the current level',
  'start dialog': 'Replay the intro dialog of the current level',
  'help level': 'Show help for the current level',
  'help builder': 'Show help for the level builder'
};

var instantCommands = [
  // Add a third and fourth item in the tuple if you want this to show
  // up in the `show commands` function
  [/^ls( |$)/, function() {
    throw new CommandResult({
      msg: intl.str('ls-command')
    });
  }],
  [/^cd( |$)/, function() {
    throw new CommandResult({
      msg: intl.str('cd-command')
    });
  }],
  // "help general", "help level", "help goal" and "help builder" are
  // handled elsewhere, so don't grab those here
  [/^help +(?!general$|level$|goal$|builder$)(.+)$/, function(bits) {
    showHelpForCommand(bits[1].trim());
  }, 'help {command}', 'show documentation for the given command'],
  [/^git +help +(.+)$/, function(bits) {
    showHelpForCommand(bits[1].trim());
  }],
  [/^(locale|locale reset)$/, function(bits) {
    LocaleActions.changeLocale(
      LocaleStore.getDefaultLocale()
    );

    throw new CommandResult({
      msg: intl.str(
        'locale-reset-command',
        { locale: LocaleStore.getDefaultLocale() }
      )
    });
  }, 'locale', 'change locale from the command line, or reset with `locale reset`'],
  [/^show$/, function(bits) {
    var lines = [
      intl.str('show-command'),
      '<br/>',
      'show commands',
      'show solution',
      'show goal'
    ];

    throw new CommandResult({
      msg: lines.join('\n')
    });
  }, 'show', 'Run `show commands|solution|goal` to see the available commands or aspects of the current level'],
  [/^alias (\w+)="(.+)"$/, function(bits) {
    const alias = bits[1];
    const expansion = bits[2];
    LevelStore.addToAliasMap(alias, expansion);
    throw new CommandResult({
      msg: 'Set alias "'+alias+'" to "'+expansion+'"',
    });
  }, 'alias', 'Run `alias` to map a certain shortcut to an expansion'],
  [/^unalias (\w+)$/, function(bits) {
    const alias = bits[1];
    LevelStore.removeFromAliasMap(alias);
    throw new CommandResult({
      msg: 'Removed alias "'+alias+'"',
    });
  }, 'unalias', 'Opposite of `alias`'],
  [/^locale (\w+)$/, function(bits) {
    LocaleActions.changeLocale(bits[1]);
    throw new CommandResult({
      msg: intl.str(
        'locale-command',
        { locale: bits[1] }
      )
    });
  }],
  [/^flip$/, function() {
    GlobalStateActions.changeFlipTreeY(
      !GlobalStateStore.getFlipTreeY()
    );
    require('../app').getEvents().trigger('refreshTree');
    throw new CommandResult({
      msg: intl.str('flip-tree-command')
    });
  }, 'flip', 'flip the direction of the tree (and commit arrows)'],
  [/^disableLevelInstructions$/, function() {
    GlobalStateActions.disableLevelInstructions();
    throw new CommandResult({
      msg: intl.todo('Level instructions disabled'),
    });
  }, 'disableLevelInstructions', 'Disable the level instructions'],
  [/^refresh$/, function() {
    var events = require('../app').getEvents();

    events.trigger('refreshTree');
    throw new CommandResult({
      msg: intl.str('refresh-tree-command')
    });
  }],
  [/^rollup (\d+)$/, function(bits) {
    var events = require('../app').getEvents();

    // go roll up these commands by joining them with semicolons
    events.trigger('rollupCommands', bits[1]);
    throw new CommandResult({
      msg: 'Commands combined!'
    });
  }],
  [/^echo "(.*?)"$|^echo (.*?)$/, function(bits) {
    var msg = bits[1] || bits[2];
    throw new CommandResult({
      msg: msg
    });
  }, 'echo', 'echo out a string to the terminal output'],
  [/^show +commands$/, function(bits) {
    var allCommands = Object.assign(
      {},
      getAllCommands()
    );
    var allOptions = Commands.commands.getOptionMap();
    var allDescriptions = Commands.commands.getDescriptionMap();
    var commandToOptions = {};
    var commandToDescriptions = {};

    Object.keys(allOptions).forEach(function(vcs) {
      var vcsMap = allOptions[vcs];
      Object.keys(vcsMap).forEach(function(method) {
        var options = vcsMap[method];
        if (options) {
          commandToOptions[vcs + ' ' + method] = Object.keys(options).filter(option => option.length > 1);
        }
      });
    });

    Object.keys(allDescriptions).forEach(function(vcs) {
      var vcsMap = allDescriptions[vcs];
      Object.keys(vcsMap).forEach(function(method) {
        var description = vcsMap[method];
        if (description) {
          commandToDescriptions[vcs + ' ' + method] = description;
        }
      });
    });
    // pull in the descriptions for sandbox / level commands as well
    Object.assign(commandToDescriptions, sandboxCommandDescriptions);
    var selectedInstantCommands = {};
    instantCommands.map(
      tuple => {
        var commandName = tuple[2];
        if (!commandName) {
          return;
        }
        commandToOptions[commandName] = [tuple[3]];
        // add this as a key so we map over it
        allCommands[commandName] = tuple[3];
        // and save it in another map so we can add extra whitespace
        selectedInstantCommands[commandName] = tuple[3];
      },
    );

    var lines = [
      intl.str('show-all-commands'),
      '<br/>'
    ];
    Object.keys(allCommands)
      .forEach(function(command) {
        if (selectedInstantCommands[command]) {
          lines.push('<br/>');
        }
        // Add command name with documentation link for git commands (skip custom commands)
        var commandParts = command.split(' ');
        if (commandParts[0] === 'git' && commandParts[1] && customGitCommands.indexOf(commandParts[1]) === -1) {
          var gitCommand = commandParts[1];
          var docUrl = 'https://git-scm.com/docs/git-' + gitCommand;
          lines.push('<b>' + command + '</b> - <a href="' + docUrl + '" target="_blank" style="color: #87CEEB">📖 Docs</a>');
        } else {
          lines.push('<b>' + command + '</b>');
        }        
        // Add description if available
        if (commandToDescriptions[command]) {
          lines.push('&nbsp;&nbsp;&nbsp;&nbsp;<i>' + commandToDescriptions[command] + '</i>');
        }        
        // Add options
        if (commandToOptions[command]) {
          commandToOptions[command].forEach(option => lines.push('&nbsp;&nbsp;&nbsp;&nbsp;' + option));
        }

        if (selectedInstantCommands[command]) {
          lines.push('<br/>');
        }
      });

    throw new CommandResult({
      msg: lines.join('\n')
    });
  }]
];

var regexMap = {
  'reset solved': /^reset solved($|\s)/,
  'help': /^help( +general)?$|^\?$/,
  'reset': /^reset( +--forSolution)?$/,
  'delay': /^delay (\d+)$/,
  'clear': /^clear($|\s)/,
  'exit level': /^exit level($|\s)/,
  'sandbox': /^sandbox($|\s)/,
  'level': /^level\s?([a-zA-Z0-9]*)/,
  'levels': /^levels($|\s)/,
  'mobileAlert': /^mobile alert($|\s)/,
  'build level': /^build +level\s?([a-zA-Z0-9]*)( +--skipIntro)?$/,
  'export tree': /^export +tree$/,
  'importTreeNow': /^importTreeNow($|\s)/,
  'importLevelNow': /^importLevelNow($|\s)/,
  'import tree': /^import +tree$/,
  'import level': /^import +level$/,
  'undo': /^undo($|\s)/,
  'share permalink': /^share( +permalink)?$/
};

var getAllCommands = function() {
  var toDelete = [
    'mobileAlert'
  ];

  var allCommands = Object.assign(
    {},
    require('../level').regexMap,
    regexMap
  );
  var mRegexMap = Commands.commands.getRegexMap();
  Object.keys(mRegexMap).forEach(function(vcs) {
    var map = mRegexMap[vcs];
    Object.keys(map).forEach(function(method) {
      var regex = map[method];
      allCommands[vcs + ' ' + method] = regex;
    });
  });
  toDelete.forEach(function(key) {
    delete allCommands[key];
  });

  return allCommands;
};

// shared handler for `help {command}` and `git help {command}`
var showHelpForCommand = function(target) {
  var lines = getCommandHelpLines(target);
  if (!lines) {
    throw new CommandProcessError({
      msg: intl.todo(
        'No documentation found for "' + target + '"; ' +
        'run `show commands` to see all available commands'
      )
    });
  }

  throw new CommandResult({
    msg: lines.join('\n')
  });
};

// builds the documentation lines for `help {command}`; returns null
// if we have nothing to say about the given command
var getCommandHelpLines = function(target) {
  var vcsRegexMap = Commands.commands.getRegexMap();
  var descriptionMap = Commands.commands.getDescriptionMap();
  var optionMap = Commands.commands.getOptionMap();

  // "help git commit" and "help commit" should both work
  var vcsList = Object.keys(vcsRegexMap);
  var specifiedVcs = null;
  var method = target;
  var split = target.split(/\s+/);
  if (split.length > 1 && vcsList.indexOf(split[0]) !== -1) {
    specifiedVcs = split[0];
    method = split.slice(1).join(' ');
  }

  var lines = null;
  vcsList.forEach(function(vcs) {
    if (specifiedVcs && vcs !== specifiedVcs) {
      return;
    }
    if (!vcsRegexMap[vcs][method]) {
      return;
    }

    lines = lines || [];
    var fullName = vcs + ' ' + method;
    // same documentation link treatment as `show commands`
    if (vcs === 'git' && customGitCommands.indexOf(method) === -1) {
      var docUrl = 'https://git-scm.com/docs/git-' + method;
      lines.push('<b>' + fullName + '</b> - <a href="' + docUrl + '" target="_blank" style="color: #87CEEB">📖 Docs</a>');
    } else {
      lines.push('<b>' + fullName + '</b>');
    }
    var description = descriptionMap[vcs][method];
    if (description) {
      lines.push('&nbsp;&nbsp;&nbsp;&nbsp;<i>' + description + '</i>');
    }
    Object.keys(optionMap[vcs][method] || {})
      .filter(option => option.length > 1)
      .forEach(option => lines.push('&nbsp;&nbsp;&nbsp;&nbsp;' + option));
  });
  if (lines) {
    return lines;
  }

  // maybe it's a sandbox / level command instead
  var description = sandboxCommandDescriptions[target];
  instantCommands.forEach(function(tuple) {
    if (tuple[2] === target && tuple[3]) {
      description = tuple[3];
    }
  });
  if (description) {
    return [
      '<b>' + target + '</b>',
      '&nbsp;&nbsp;&nbsp;&nbsp;<i>' + description + '</i>'
    ];
  }
  return null;
};

exports.getAllCommands = getAllCommands;
exports.getCommandHelpLines = getCommandHelpLines;
exports.instantCommands = instantCommands;
exports.parse = util.genParseCommand(regexMap, 'processSandboxCommand');

// optimistically parse some level and level builder commands; we do this
// so you can enter things like "level intro1; show goal" and not
// have it barf. when the
// command fires the event, it will check if there is a listener and if not throw
// an error

// note: these are getters / setters because the require kills us
exports.getOptimisticLevelParse = function() {
  return util.genParseCommand(
    require('../level').regexMap,
    'processLevelCommand'
  );
};

exports.getOptimisticLevelBuilderParse = function() {
  return util.genParseCommand(
    require('../level/builder').regexMap,
    'processLevelBuilderCommand'
  );
};
