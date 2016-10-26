var _ = require('underscore');
var Q = require('q');

var util = require('../util');
var Main = require('../app');
var intl = require('../intl');
var log = require('../log');

var React = require('react');
var Errors = require('../util/errors');
var Sandbox = require('../sandbox/').Sandbox;
var GlobalStateActions = require('../actions/GlobalStateActions');
var GlobalStateStore = require('../stores/GlobalStateStore');
var LevelActions = require('../actions/LevelActions');
var LevelStore = require('../stores/LevelStore');
var Visualization = require('../visuals/visualization').Visualization;
var DisabledMap = require('../level/disabledMap').DisabledMap;
var GitShim = require('../git/gitShim').GitShim;
var Commands = require('../commands');

var MultiView = require('../views/multiView').MultiView;
var CanvasTerminalHolder = require('../views').CanvasTerminalHolder;
var ConfirmCancelTerminal = require('../views').ConfirmCancelTerminal;
var NextLevelConfirm = require('../views').NextLevelConfirm;
var LevelToolbarView = require('../react_views/LevelToolbarView.jsx');

var TreeCompare = require('../graph/treeCompare');

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
    this.solved = false;
    this.wasResetAfterSolved = false;

    this.initGoalData(options);
    this.initName(options);
    this.on('minimizeCanvas', this.minimizeGoal);
    this.on('resizeCanvas', this.resizeGoal);
    this.isGoalExpanded = false;

    Level.__super__.initialize.apply(this, [options]);
    this.startOffCommand();

    this.handleOpen(options.deferred);
  },

  getIsGoalExpanded: function() {
    return this.isGoalExpanded;
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

    var dialog = $.extend({}, intl.getStartDialog(levelObj));
    // grab the last slide only
    dialog.childViews = dialog.childViews.slice(-1);
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
    this.levelToolbar = React.createElement(
      LevelToolbarView,
      {
        name: name,
        onGoalClick: this.toggleGoal.bind(this),
        onObjectiveClick: this.toggleObjective.bind(this),
        parent: this
      }
    );
    React.render(
      this.levelToolbar,
      document.getElementById('levelToolbarMount')
    );
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
    var method = this.options.command.get('method');
    if (!this.testOption('noStartCommand') && method !== 'importLevelNow') {
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
    var onlyMaster = TreeCompare.onlyMasterCompared(this.level);
    // first we make the goal visualization holder
    this.goalCanvasHolder = new CanvasTerminalHolder({
      text: (onlyMaster) ? intl.str('goal-only-master') : undefined,
      parent: this
    });

    // then we make a visualization. the "el" here is the element to
    // track for size information. the container is where the canvas will be placed
    this.goalVis = new Visualization({
      el: this.goalCanvasHolder.getCanvasLocation(),
      containerElement: this.goalCanvasHolder.getCanvasLocation(),
      treeString: this.level.goalTreeString,
      noKeyboardInput: true,
      smallCanvas: true,
      isGoalVis: true,
      levelBlob: this.level,
      noClick: true
    });

    // If the goal visualization gets dragged to the right side of the screen, then squeeze the main
    // repo visualization a bit to make room. This way, you could have the goal window hang out on
    // the right side of the screen and still see the repo visualization.
    this.goalVis.customEvents.on('drag', function(event, ui) {
      if (ui.position.left > 0.5 * $(window).width()) {
        if (!$('#goalPlaceholder').is(':visible')) {
          $('#goalPlaceholder').show();
          this.mainVis.myResize();
        }
      } else {
        if ($('#goalPlaceholder').is(':visible')) {
          $('#goalPlaceholder').hide();
          this.mainVis.myResize();
        }
      }
    }.bind(this));

    return this.goalCanvasHolder;
  },

  minimizeGoal: function (position, size) {
    this.isGoalExpanded = false;
    this.trigger('goalToggled');
    this.goalVis.hide();
    this.goalWindowPos = position;
    this.goalWindowSize = size;
    if ($('#goalPlaceholder').is(':visible')) {
      $('#goalPlaceholder').hide();
      this.mainVis.myResize();
    }
  },

  resizeGoal: function () {
    if (!this.goalVis) {
      return;
    }
    this.goalVis.myResize();
  },

  showSolution: function(command, deferred) {
    var toIssue = this.level.solutionCommand;
    var issueFunc = function() {
      this.isShowingSolution = true;
      Main.getEventBaton().trigger(
        'commandSubmitted',
        toIssue
      );
      log.showLevelSolution(this.getEnglishName());
    }.bind(this);

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

  toggleObjective: function() {
    Main.getEventBaton().trigger(
      'commandSubmitted',
      'objective'
    );
  },

  toggleGoal: function () {
    if (this.goalCanvasHolder && this.goalCanvasHolder.inDom) {
      this.hideGoal();
    } else {
      this.showGoal();
    }
  },

  showGoal: function(command, defer) {
    this.isGoalExpanded = true;
    this.trigger('goalToggled');
    this.showSideVis(command, defer, this.goalCanvasHolder, this.initGoalVisualization);
    // show the squeezer again we are to the side
    if ($(this.goalVis.el).offset().left > 0.5 * $(window).width()) {
      $('#goalPlaceholder').show();
      this.mainVis.myResize();
    }
  },

  showSideVis: function(command, defer, canvasHolder, initMethod) {
    var safeFinish = function() {
      if (command) { command.finishWith(defer); }
    };
    if (!canvasHolder || !canvasHolder.inDom) {
      canvasHolder = initMethod.apply(this);
    }

    canvasHolder.restore(this.goalWindowPos, this.goalWindowSize);
    setTimeout(safeFinish, canvasHolder.getAnimationTime());
  },

  hideGoal: function(command, defer) {
    this.isGoalExpanded = false;
    this.trigger('goalToggled');
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

    // add our specific functionality
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
      beforeCB: this.beforeCommandCB.bind(this),
      afterCB: this.afterCommandCB.bind(this),
      afterDeferHandler: this.afterCommandDefer.bind(this)
    });
  },

  undo: function() {
    this.gitCommandsIssued.pop();
    Level.__super__.undo.apply(this, arguments);
  },

  beforeCommandCB: function(command) {
    // Alright we actually no-op this in the level subclass
    // so we can tell if the command counted or not... kinda :P
    // We have to save the state in this method since the git
    // engine will change by the time afterCommandCB runs
    this._treeBeforeCommand = this.mainVis.gitEngine.printTree();
  },

  afterCommandCB: function(command) {
    if (this.doesCommandCountTowardsTotal(command)) {
      // Count it as a command AND...
      this.gitCommandsIssued.push(command.get('rawStr'));
      // add our state for undo since our undo pops a command.
      //
      // Ugly inheritance overriding on private implementations ahead!
      this.undoStack.push(this._treeBeforeCommand);
    }
  },

  doesCommandCountTowardsTotal: function(command) {
    if (command.get('error')) {
      // dont count errors towards our count
      return false;
    }

    var matched = false;
    _.each(Commands.commands.getCommandsThatCount(), function(map) {
      _.each(map, function(regex) {
        matched = matched || regex.test(command.get('rawStr'));
      });
    });
    return matched;
  },

  afterCommandDefer: function(defer, command) {
    if (this.solved) {
      command.addWarning(intl.str('already-solved'));
      defer.resolve();
      return;
    }

    var current = this.mainVis.gitEngine.printTree();
    var solved = TreeCompare.dispatchFromLevel(this.level, current);

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
      LevelActions.setLevelSolved(this.level.id);
      log.levelSolved(this.getEnglishName());
    }

    this.hideGoal();

    var nextLevel = LevelStore.getNextLevel(this.level.id);
    var numCommands = this.gitCommandsIssued.length;
    var best = this.getNumSolutionCommands();

    var skipFinishDialog = this.testOption('noFinishDialog') ||
      this.wasResetAfterSolved;
    var skipFinishAnimation = this.wasResetAfterSolved;

    if (!skipFinishAnimation) {
      GlobalStateActions.levelSolved();
    }

    /**
     * Speed up the animation each time we see it.
     */
    var speed = 1.0;
    switch (GlobalStateStore.getNumLevelsSolved()) {
      case 2:
        speed = 1.5;
        break;
      case 3:
        speed = 1.8;
        break;
      case 4:
        speed = 2.1;
        break;
      case 5:
        speed = 2.4;
        break;
    }
    if (GlobalStateStore.getNumLevelsSolved() > 5) {
      speed = 2.5;
    }

    var finishAnimationChain = null;
    if (skipFinishAnimation) {
      var deferred = Q.defer();
      deferred.resolve();
      finishAnimationChain = deferred.promise;
      Main.getEventBaton().trigger(
        'commandSubmitted',
        'echo "level solved!"'
      );
    } else {
      GlobalStateActions.changeIsAnimating(true);
      finishAnimationChain = this.mainVis.gitVisuals.finishAnimation(speed);
      if (this.mainVis.originVis) {
        finishAnimationChain = finishAnimationChain.then(
          this.mainVis.originVis.gitVisuals.finishAnimation(speed)
        );
      }
    }

    if (!skipFinishDialog) {
      finishAnimationChain = finishAnimationChain.then(function() {
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
        log.choseNextLevel(nextLevel.id);
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
      GlobalStateActions.changeIsAnimating(false);
      defer.resolve();
    });
  },

  die: function() {
    React.unmountComponentAtNode(
      document.getElementById('levelToolbarMount')
    );

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
    var getHint = function() {
      var hint = intl.getHint(this.level);
      if (!hint || !hint.length) {
        return intl.str('no-hint');
      }
      return hint;
    }.bind(this);

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
    if (this.solved) {
      this.wasResetAfterSolved = true;
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
