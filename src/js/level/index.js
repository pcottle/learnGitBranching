var _ = require('underscore');
var Backbone = require('backbone');
var Q = require('q');

var util = require('../util');
var Main = require('../app');

var Errors = require('../util/errors');
var Sandbox = require('../level/sandbox').Sandbox;

var Visualization = require('../visuals/visualization').Visualization;
var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var DisabledMap = require('../level/disabledMap').DisabledMap;
var Command = require('../models/commandModel').Command;
var GitShim = require('../git/gitShim').GitShim;

var MultiView = require('../views/multiView').MultiView;
var CanvasTerminalHolder = require('../views').CanvasTerminalHolder;
var ConfirmCancelTerminal = require('../views').ConfirmCancelTerminal;
var NextLevelConfirm = require('../views').NextLevelConfirm;
var LevelToolbar = require('../views').LevelToolbar;

var TreeCompare = require('../git/treeCompare').TreeCompare;

var regexMap = {
  'help level': /^help level$/,
  'start dialog': /^start dialog$/,
  'show goal': /^show goal$/,
  'hide goal': /^hide goal$/,
  'show solution': /^show solution($|\s)/
};

var parse = util.genParseCommand(regexMap, 'processLevelCommand');

var Level = Sandbox.extend({
  initialize: function(options) {
    options = options || {};
    options.level = options.level || {};

    this.level = options.level;

    this.gitCommandsIssued = [];
    this.commandsThatCount = this.getCommandsThatCount();
    this.solved = false;

    this.treeCompare = new TreeCompare();

    this.initGoalData(options);
    this.initName(options);

    Level.__super__.initialize.apply(this, [options]);
    this.startOffCommand();

    this.handleOpen(options.deferred);
  },

  handleOpen: function(deferred) {
    deferred = deferred || Q.defer();

    // if there is a multiview in the beginning, open that
    // and let it resolve our deferred
    if (this.level.startDialog && !this.testOption('noIntroDialog')) {
      new MultiView(_.extend(
        {},
        this.level.startDialog,
        { deferred: deferred }
      ));
      return;
    }

    // otherwise, resolve after a 700 second delay to allow
    // for us to animate easily
    setTimeout(function() {
      deferred.resolve();
    }, this.getAnimationTime() * 1.2);
  },

  startDialog: function(command, deferred) {
    if (!this.level.startDialog) {
      command.set('error', new Errors.GitError({
        msg: 'There is no start dialog to show for this level!'
      }));
      deferred.resolve();
      return;
    }

    this.handleOpen(deferred);
    deferred.promise.then(function() {
      command.set('status', 'finished');
    });
  },

  initName: function() {
    if (!this.level.name || !this.level.id) {
      this.level.name = 'Rebase Classic';
      console.warn('REALLY BAD FORM need ids and names');
    }

    this.levelToolbar = new LevelToolbar({
      name: this.level.name
    });
  },

  initGoalData: function(options) {
    if (!this.level.goalTreeString || !this.level.solutionCommand) {
      throw new Error('need goal tree and solution');
    }
  },

  takeControl: function() {
    Main.getEventBaton().stealBaton('processLevelCommand', this.processLevelCommand, this);

    Level.__super__.takeControl.apply(this);
  },

  releaseControl: function() {
    Main.getEventBaton().releaseBaton('processLevelCommand', this.processLevelCommand, this);

    Level.__super__.releaseControl.apply(this);
  },

  startOffCommand: function() {
    if (!this.testOption('noStartCommand')) {
      Main.getEventBaton().trigger(
        'commandSubmitted',
        'hint; delay 2000; show goal'
      );
    }
  },

  initVisualization: function(options) {
    this.mainVis = new Visualization({
      el: options.el || this.getDefaultVisEl(),
      treeString: options.level.startTree
    });

    this.initGoalVisualization();
  },

  initGoalVisualization: function() {
    // first we make the goal visualization holder
    this.goalCanvasHolder = new CanvasTerminalHolder();

    // then we make a visualization. the "el" here is the element to
    // track for size information. the container is where the canvas will be placed
    this.goalVis = new Visualization({
      el: this.goalCanvasHolder.getCanvasLocation(),
      containerElement: this.goalCanvasHolder.getCanvasLocation(),
      treeString: this.level.goalTreeString,
      noKeyboardInput: true,
      noClick: true
    });
  },

  showSolution: function(command, deferred) {
    var toIssue = this.level.solutionCommand;
    var issueFunc = function() {
      Main.getEventBaton().trigger(
        'commandSubmitted',
        toIssue
      );
    };

    var commandStr = command.get('rawStr');
    if (!this.testOptionOnString(commandStr, 'noReset')) {
      toIssue = 'reset; ' + toIssue;
    }
    if (this.testOptionOnString(commandStr, 'force')) {
      issueFunc();
      command.finishWith(deferred);
      return;
    }

    // allow them for force the solution
    var confirmDefer = Q.defer();
    var confirmView = new ConfirmCancelTerminal({
      markdowns: [
        '## Are you sure you want to see the solution?',
        '',
        'I believe in you! You can do it'
      ],
      deferred: confirmDefer
    });

    confirmDefer.promise
    .then(issueFunc)
    .fail(function() {
      command.setResult("Great! I'll let you get back to it");
    })
    .done(function() {
     // either way we animate, so both options can share this logic
     setTimeout(function() {
        command.finishWith(deferred);
      }, confirmView.getAnimationTime());
    });
  },

  showGoal: function(command, defer) {
    this.goalCanvasHolder.slideIn();

    if (!command || !defer) { return; }
    setTimeout(function() {
      command.finishWith(defer);
    }, this.goalCanvasHolder.getAnimationTime());
  },

  hideGoal: function(command, defer) {
    this.goalCanvasHolder.slideOut();
    if (!command || !defer) { return; }

    setTimeout(function() {
      command.finishWith(defer);
    }, this.goalCanvasHolder.getAnimationTime());
  },

  initParseWaterfall: function(options) {
    Level.__super__.initParseWaterfall.apply(this, [options]);

    // add our specific functionaity
    this.parseWaterfall.addFirst(
      'parseWaterfall',
      parse
    );

    this.parseWaterfall.addFirst(
      'instantWaterfall',
      this.getInstantCommands()
    );

    // if we want to disable certain commands...
    if (options.level.disabledMap) {
      // disable these other commands
      this.parseWaterfall.addFirst(
        'instantWaterfall',
        new DisabledMap({
          disabledMap: options.level.disabledMap
        }).getInstantCommands()
      );
    }
  },

  initGitShim: function(options) {
    // ok we definitely want a shim here
    this.gitShim = new GitShim({
      afterCB: _.bind(this.afterCommandCB, this),
      afterDeferHandler: _.bind(this.afterCommandDefer, this)
    });
  },

  getCommandsThatCount: function() {
    var GitCommands = require('../git/commands');
    var toCount = [
      'git commit',
      'git checkout',
      'git rebase',
      'git reset',
      'git branch',
      'git revert',
      'git merge',
      'git cherry-pick'
    ];
    var myRegexMap = {};
    _.each(toCount, function(method) {
      if (!GitCommands.regexMap[method]) { throw new Error('wut no regex'); }

      myRegexMap[method] = GitCommands.regexMap[method];
    });
    return myRegexMap;
  },

  afterCommandCB: function(command) {
    var matched = false;
    _.each(this.commandsThatCount, function(regex) {
      matched = matched || regex.test(command.get('rawStr'));
    });
    if (matched) {
      this.gitCommandsIssued.push(command.get('rawStr'));
    }
  },

  afterCommandDefer: function(defer, command) {
    if (this.solved) {
      command.addWarning(
        "You've already solved this level, try other levels with 'show levels'" +
        "or go back to the sandbox with 'sandbox'"
      );
      defer.resolve();
      return;
    }

    // ok so lets see if they solved it...
    var current = this.mainVis.gitEngine.exportTree();
    var solved;
    if (this.level.compareOnlyMaster) {
      solved = this.treeCompare.compareBranchWithinTrees(current, this.level.goalTreeString, 'master');
    } else if (this.level.compareOnlyBranches) {
      solved = this.treeCompare.compareAllBranchesWithinTrees(current, this.level.goalTreeString);
    } else {
      solved = this.treeCompare.compareAllBranchesWithinTreesAndHEAD(current, this.level.goalTreeString);
    }

    if (!solved) {
      defer.resolve();
      return;
    }

    // woohoo!!! they solved the level, lets animate and such
    this.levelSolved(defer);
  },

  getNumSolutionCommands: function() {
    // strip semicolons in bad places
    var toAnalyze = this.level.solutionCommand.replace(/^;|;$/g, '');
    return toAnalyze.split(';').length;
  },

  testOption: function(option) {
    return this.options.command && new RegExp('--' + option).test(this.options.command.get('rawStr'));
  },

  testOptionOnString: function(str, option) {
    return str && new RegExp('--' + option).test(str);
  },

  levelSolved: function(defer) {
    this.solved = true;
    Main.getEvents().trigger('levelSolved', this.level.id);
    this.hideGoal();

    var nextLevel = Main.getLevelArbiter().getNextLevel(this.level.id);
    var numCommands = this.gitCommandsIssued.length;
    var best = this.getNumSolutionCommands();

    var skipFinishDialog = this.testOption('noFinishDialog');
    var finishAnimationChain = this.mainVis.gitVisuals.finishAnimation();
    if (!skipFinishDialog) {
      finishAnimationChain = finishAnimationChain
      .then(function() {
        // we want to ask if they will move onto the next level
        // while giving them their results...
        var nextDialog = new NextLevelConfirm({
          nextLevel: nextLevel,
          numCommands: numCommands,
          best: best
        });

        return nextDialog.getPromise();
      });
    }

    finishAnimationChain
    .then(function() {
      if (!skipFinishDialog && nextLevel) {
        Main.getEventBaton().trigger(
          'commandSubmitted',
          'level ' + nextLevel.id
        );
      }
    })
    .fail(function() {
      // nothing to do, we will just close
    })
    .done(function() {
      defer.resolve();
    });
  },

  die: function() {
    this.levelToolbar.die();

    this.goalDie();
    this.mainVis.die();
    this.releaseControl();

    this.clear();

    delete this.commandCollection;
    delete this.mainVis;
    delete this.goalVis;
    delete this.goalCanvasHolder;
  },

  goalDie: function() {
    this.goalCanvasHolder.die();
    this.goalVis.die();
  },

  getInstantCommands: function() {
    var hintMsg = (this.level.hint) ?
      this.level.hint :
      "Hmm, there doesn't seem to be a hint for this level :-/";

    return [
      [/^help$|^\?$/, function() {
        throw new Errors.CommandResult({
          msg: 'You are in a level, so multiple forms of help are available. Please select either ' +
               '"help level" or "help general"'
        });
      }],
      [/^hint$/, function() {
        throw new Errors.CommandResult({
          msg: hintMsg
        });
      }],
      [/^build level$/, function() {
        throw new Errors.GitError({
          msg: "You can't build a level inside a level! Please exit level first"
        });
      }]
    ];
  },

  reset: function() {
    this.gitCommandsIssued = [];
    this.solved = false;
    Level.__super__.reset.apply(this, arguments);
  },

  startLevel: function(command, deferred) {
    this.exitLevel();

    setTimeout(function() {
      Main.getSandbox().startLevel(command, deferred);
    }, this.getAnimationTime() * 1.5);
    // wow! that was simple :D
  },

  exitLevel: function(command, deferred) {
    this.die();

    if (!command || !deferred) {
      return;
    }

    setTimeout(function() {
      command.finishWith(deferred);
    }, this.getAnimationTime());

    // we need to fade in the sandbox
    Main.getEventBaton().trigger('levelExited');
  },

  processLevelCommand: function(command, defer) {
    var methodMap = {
      'show goal': this.showGoal,
      'hide goal': this.hideGoal,
      'show solution': this.showSolution,
      'start dialog': this.startDialog,
      'help level': this.startDialog
    };
    var method = methodMap[command.get('method')];
    if (!method) {
      throw new Error('woah we dont support that method yet', method);
    }

    method.apply(this, [command, defer]);
  }
});

exports.Level = Level;
exports.regexMap = regexMap;
