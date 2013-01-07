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

var Level = Sandbox.extend({
  initialize: function(options) {
    options = options || {};
    options.level = options.level || {};

    this.level = options.level;

    this.gitCommandsIssued = 0;
    this.commandsThatCount = this.getCommandsThatCount();
    this.solved = false;

    // possible options on how stringent to be on comparisons go here
    this.treeCompare = new TreeCompare();

    this.initGoalData(options);
    this.initName(options);

    Level.__super__.initialize.apply(this, [options]);
    this.startOffCommand();

    this.handleOpen();
  },

  handleOpen: function() {
    this.options.deferred = this.options.deferred || Q.defer();

    // if there is a multiview in the beginning, open that
    // and let it resolve our deferred
    if (this.level.startDialog) {
      new MultiView(_.extend(
        {},
        this.level.startDialog,
        { deferred: this.options.deferred }
      ));
      return;
    }

    // otherwise, resolve after a 700 second delay
    setTimeout(_.bind(function() {
      this.options.deferred.resolve();
    }, this), this.getAnimationTime() * 1.2);
  },

  initName: function(options) {
    if (!this.level.name || !this.level.id) {
      this.level.name = 'Rebase Classic';
      console.warn('REALLY BAD FORM need ids and names');
    }

    this.levelToolbar = new LevelToolbar({
      name: this.level.name
    });
  },

  initGoalData: function(options) {
    this.goalTreeString = this.level.goalTreeString;
    this.solutionCommand = this.level.solutionCommand;

    if (!this.goalTreeString) {
      console.warn('woah no goal, using random other one');
      this.goalTreeString = '{"branches":{"master":{"target":"C1","id":"master"},"win":{"target":"C2","id":"win"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"win","id":"HEAD"}}';
      this.solutionCommand = 'git checkout -b win; git commit';
    }
    if (!this.solutionCommand) {
      console.warn('no solution provided, really bad form');
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
    Main.getEventBaton().trigger(
      'commandSubmitted',
      'hint; delay 3000; show goal'
    );
  },

  initVisualization: function(options) {
    this.mainVis = new Visualization({
      el: options.el || this.getDefaultVisEl(),
      treeString: options.level.startTree
    });

    this.initGoalVisualization(options);
  },

  initGoalVisualization: function(options) {
    // first we make the goal visualization holder
    this.goalCanvasHolder = new CanvasTerminalHolder();

    // then we make a visualization. the "el" here is the element to
    // track for size information. the container is where the canvas will be placed
    this.goalVis = new Visualization({
      el: this.goalCanvasHolder.getCanvasLocation(),
      containerElement: this.goalCanvasHolder.getCanvasLocation(),
      treeString: this.goalTreeString,
      noKeyboardInput: true,
      noClick: true
    });
  },

  showSolution: function(command, deferred) {
    var confirmDefer = Q.defer();
    var confirmView = new ConfirmCancelTerminal({
      modalAlert: {
        markdowns: [
          '## Are you sure you want to see the solution?',
          '',
          'I believe in you! You can do it'
        ]
      },
      deferred: confirmDefer
    });

    confirmDefer.promise
    .then(_.bind(function() {
      // ok great add the solution command
      Main.getEventBaton().trigger(
        'commandSubmitted',
        'reset;' + this.solutionCommand
      );
      this.hideGoal();
      command.setResult('Solution command added to the command queue...');
    }, this))
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
    this.parseWaterfall = new ParseWaterfall();

    // add our specific functionaity
    this.parseWaterfall.addFirst(
      'parseWaterfall',
      require('../level/commands').parse
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
      this.gitCommandsIssued++;
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
    var solved = this.treeCompare.compareAllBranchesWithinTrees(current, this.goalTreeString);

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

  levelSolved: function(defer) {
    this.solved = true;
    Main.getEvents().trigger('levelSolved', this.level.id);
    this.hideGoal();

    var nextLevel = Main.getLevelArbiter().getNextLevel(this.level.id);
    var numCommands = this.gitCommandsIssued;
    var best = this.getNumSolutionCommands();

    this.mainVis.gitVisuals.finishAnimation()
    .then(function() {
      // TODO if there is no future level...

      // we want to ask if they will move onto the next level...
      var nextDialog = new NextLevelConfirm({
        nextLevelName: nextLevel.name,
        numCommands: numCommands,
        best: best
      });

      return nextDialog.getPromise();
    })
    .then(function() {
      Main.getEventBaton().trigger(
        'commandSubmitted',
        'level ' + nextLevel.id
      );
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
    this.goalCanvasHolder.die();

    this.mainVis.die();
    this.goalVis.die();
    this.releaseControl();

    this.clear();

    delete this.commandCollection;
    delete this.mainVis;
    delete this.goalVis;
    delete this.goalCanvasHolder;
  },

  getInstantCommands: function() {
    var hintMsg = (this.level.hint) ?
      this.level.hint :
      "Hmm, there doesn't seem to be a hint for this level :-/";

    var instants = [
      [/^hint$/, function() {
        throw new Errors.CommandResult({
          msg: hintMsg
        });
      }]
    ];

    if (!this.solutionCommand) {
      instants.push([/^show solution$/, function() {
        throw new Errors.CommandResult({
          msg: 'No solution provided for this level :-/'
        });
      }]);
    }
    return instants;
  },

  reset: function() {
    this.gitCommandsIssued = 0;
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
      'show solution': this.showSolution
    };
    var method = methodMap[command.get('method')];
    if (!method) {
      throw new Error('woah we dont support that method yet', method);
    }

    method.apply(this, [command, defer]);
  }
});

exports.Level = Level;

