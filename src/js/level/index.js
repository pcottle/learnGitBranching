var _ = require('underscore');
var Backbone = require('backbone');
var Q = require('q');

var util = require('../util');
var Main = require('../app');
var intl = require('../intl');
var log = require('../log');

var Errors = require('../util/errors');
var Sandbox = require('../level/sandbox').Sandbox;
var Constants = require('../util/constants');

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
  'show goal': /^(show goal|goal|help goal)$/,
  'hide goal': /^hide goal$/,
  'show solution': /^show solution($|\s)/,
  'objective': /^(objective|assignment)$/
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
        intl.getStartDialog(this.level),
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

  objectiveDialog: function(command, deferred, levelObj) {
    levelObj = (levelObj === undefined) ? this.level : levelObj;

    if (!levelObj || !levelObj.startDialog) {
      command.set('error', new Errors.GitError({
        msg: intl.str('no-start-dialog')
      }));
      deferred.resolve();
      return;
    }

    var dialog = _.clone(intl.getStartDialog(levelObj));
    // grab the last slide only
    dialog.childViews = dialog.childViews.splice(-1);
    new MultiView(_.extend(
      dialog,
      { deferred: deferred }
    ));

    // when its closed we are done
    deferred.promise.then(function() {
      command.set('status', 'finished');
    });
  },

  startDialog: function(command, deferred) {
    if (!this.level.startDialog) {
      command.set('error', new Errors.GitError({
        msg: intl.str('no-start-dialog')
      }));
      deferred.resolve();
      return;
    }

    this.handleOpen(deferred);
    deferred.promise.then(function() {
      command.set('status', 'finished');
    });
  },

  getEnglishName: function() {
    return this.level.name.en_US;
  },

  initName: function() {
    var name = intl.getName(this.level);

    this.levelToolbar = new LevelToolbar({
      name: name
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
    return this.goalCanvasHolder;
  },

  showSolution: function(command, deferred) {
    var toIssue = this.level.solutionCommand;
    var issueFunc = _.bind(function() {
      this.isShowingSolution = true;
      Main.getEventBaton().trigger(
        'commandSubmitted',
        toIssue
      );
      log.showLevelSolution(this.getEnglishName());
    }, this);

    var commandStr = command.get('rawStr');
    if (!this.testOptionOnString(commandStr, 'noReset')) {
      toIssue = 'reset --forSolution; ' + toIssue;
    }
    if (this.testOptionOnString(commandStr, 'force')) {
      issueFunc();
      command.finishWith(deferred);
      return;
    }

    // allow them for force the solution
    var confirmDefer = Q.defer();
    var dialog = intl.getDialog(require('../dialogs/confirmShowSolution'))[0];
    var confirmView = new ConfirmCancelTerminal({
      markdowns: dialog.options.markdowns,
      deferred: confirmDefer
    });

    confirmDefer.promise
    .then(issueFunc)
    .fail(function() {
      command.setResult("");
    })
    .done(function() {
     // either way we animate, so both options can share this logic
     setTimeout(function() {
        command.finishWith(deferred);
      }, confirmView.getAnimationTime());
    });
  },

  showGoal: function(command, defer) {
    this.showSideVis(command, defer, this.goalCanvasHolder, this.initGoalVisualization);
  },

  showSideVis: function(command, defer, canvasHolder, initMethod) {
    var safeFinish = function() {
      if (command) { command.finishWith(defer); }
    };
    if (!canvasHolder || !canvasHolder.inDom) {
      canvasHolder = initMethod.apply(this);
    }

    canvasHolder.slideIn();
    setTimeout(safeFinish, canvasHolder.getAnimationTime());
  },

  hideGoal: function(command, defer) {
    this.hideSideVis(command, defer, this.goalCanvasHolder);
  },

  hideSideVis: function(command, defer, canvasHolder, vis) {
    var safeFinish = function() {
      if (command) { command.finishWith(defer); }
    };

    if (canvasHolder && canvasHolder.inDom) {
      canvasHolder.die();
      setTimeout(safeFinish, canvasHolder.getAnimationTime());
    } else {
      safeFinish();
    }
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
      beforeCB: _.bind(this.beforeCommandCB, this),
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

  undo: function() {
    this.gitCommandsIssued.pop();
    Level.__super__.undo.apply(this, arguments);
  },

  afterCommandCB: function(command) {
    if (command.get('error')) {
      // dont count errors towards our count
      return;
    }

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
      command.addWarning(intl.str('already-solved'));
      defer.resolve();
      return;
    }

    // TODO refactor this ugly ass switch statement...
    // BIG TODO REALLY REFACTOR HAX HAX
    // ok so lets see if they solved it...
    var current = this.mainVis.gitEngine.exportTree();
    var solved;
    if (this.level.compareOnlyMaster) {
      solved = this.treeCompare.compareBranchWithinTrees(current, this.level.goalTreeString, 'master');
    } else if (this.level.compareOnlyBranches) {
      solved = this.treeCompare.compareAllBranchesWithinTrees(current, this.level.goalTreeString);
    } else if (this.level.compareAllBranchesHashAgnostic) {
      solved = this.treeCompare.compareAllBranchesWithinTreesHashAgnostic(current, this.level.goalTreeString);
    } else if (this.level.compareOnlyMasterHashAgnostic) {
      solved = this.treeCompare.compareBranchesWithinTreesHashAgnostic(current, this.level.goalTreeString, ['master']);
    } else if (this.level.compareOnlyMasterHashAgnosticWithAsserts) {
      solved = this.treeCompare.compareBranchesWithinTreesHashAgnostic(current, this.level.goalTreeString, ['master']);
      solved = solved && this.treeCompare.evalAsserts(
        current,
        this.level.goalAsserts
      );
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
    if (!this.isShowingSolution) {
      Main.getEvents().trigger('levelSolved', this.level.id);
      log.levelSolved(this.getEnglishName());
    }

    this.hideGoal();

    var nextLevel = Main.getLevelArbiter().getNextLevel(this.level.id);
    var numCommands = this.gitCommandsIssued.length;
    var best = this.getNumSolutionCommands();

    Constants.GLOBAL.isAnimating = true;
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
      Constants.GLOBAL.isAnimating = false;
      defer.resolve();
    });
  },

  die: function() {
    this.levelToolbar.die();

    this.hideGoal();
    this.mainVis.die();
    this.releaseControl();

    this.clear();

    delete this.commandCollection;
    delete this.mainVis;
    delete this.goalVis;
    delete this.goalCanvasHolder;
  },

  getInstantCommands: function() {
    var getHint = _.bind(function() {
      var hint = intl.getHint(this.level);
      if (!hint || !hint.length) {
        return intl.str('no-hint');
      }
      return hint;
    }, this);

    return [
      [/^help$|^\?$/, function() {
        throw new Errors.CommandResult({
          msg: intl.str('help-vague-level')
        });
      }],
      [/^hint$/, function() {
        throw new Errors.CommandResult({
          msg: getHint()
        });
      }]
    ];
  },

  reset: function(command, deferred) {
    this.gitCommandsIssued = [];

    var commandStr = (command) ? command.get('rawStr') : '';
    if (!this.testOptionOnString(commandStr, 'forSolution')) {
      this.isShowingSolution = false;
    }
    this.solved = false;
    Level.__super__.reset.apply(this, arguments);
  },

  buildLevel: function(command, deferred) {
    this.exitLevel();
    setTimeout(function() {
      Main.getSandbox().buildLevel(command, deferred);
    }, this.getAnimationTime() * 1.5);
  },

  importLevel: function(command, deferred) {
    this.exitLevel();
    setTimeout(function() {
      Main.getSandbox().importLevel(command, deferred);
    }, this.getAnimationTime() * 1.5);
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
      'help level': this.startDialog,
      'objective': this.objectiveDialog
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
