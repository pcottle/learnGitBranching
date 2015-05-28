var _ = require('underscore');
var Backbone = require('backbone');
var Q = require('q');

var util = require('../util');
var Main = require('../app');
var intl = require('../intl');
var Errors = require('../util/errors');

var Visualization = require('../visuals/visualization').Visualization;
var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var Level = require('../level').Level;
var LocaleStore = require('../stores/LocaleStore');
var LevelStore = require('../stores/LevelStore');

var Command = require('../models/commandModel').Command;
var GitShim = require('../git/gitShim').GitShim;

var MultiView = require('../views/multiView').MultiView;

var CanvasTerminalHolder = require('../views').CanvasTerminalHolder;
var ConfirmCancelTerminal = require('../views').ConfirmCancelTerminal;
var NextLevelConfirm = require('../views').NextLevelConfirm;

var MarkdownPresenter = require('../views/builderViews').MarkdownPresenter;
var MultiViewBuilder = require('../views/builderViews').MultiViewBuilder;
var MarkdownGrabber = require('../views/builderViews').MarkdownGrabber;

var regexMap = {
  'define goal': /^define goal$/,
  'define name': /^define name$/,
  'help builder': /^help builder$/,
  'define start': /^define start$/,
  'edit dialog': /^edit dialog$/,
  'show start': /^show start$/,
  'hide start': /^hide start$/,
  'define hint': /^define hint$/,
  'finish': /^finish$/
};

var parse = util.genParseCommand(regexMap, 'processLevelBuilderCommand');

var LevelBuilder = Level.extend({
  initialize: function(options) {
    options = options || {};
    options.level = {};
    this.options = options;

    var locale = LocaleStore.getLocale();
    options.level.startDialog = {};
    options.level.startDialog[locale] = {
      childViews: intl.getDialog(require('../dialogs/levelBuilder'))
    };

    // if we are editing a level our behavior is a bit different
    var editLevelJSON;
    if (options.editLevel) {
      LevelStore.getLevel(options.editLevel);
      options.level = editLevelJSON;
    }

    LevelBuilder.__super__.initialize.apply(this, [options]);
    if (!options.editLevel) {
      this.startDialogObj = undefined;
      this.definedGoal = false;
    } else {
      this.startDialogObj = editLevelJSON.startDialog[locale];
      this.definedGoal = true;
    }

    // we wont be using this stuff, and it is deleted to ensure we overwrite all functions that
    // include that functionality
    delete this.treeCompare;
    delete this.solved;
  },

  initName: function() {
  },

  initGoalData: function() {
    // add some default behavior in the beginning if we are not editing
    if (!this.options.editLevel) {
      this.level.goalTreeString = '{"branches":{"master":{"target":"C1","id":"master"},"makeLevel":{"target":"C2","id":"makeLevel"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"makeLevel","id":"HEAD"}}';
      this.level.solutionCommand = 'git checkout -b makeLevel; git commit';
    }
    LevelBuilder.__super__.initGoalData.apply(this, arguments);
  },

  /**
   * need custom handlers since we have two visualizations >___<
   */
  minimizeGoal: function (position, size) {
    this.doBothVis('hide');
    this.goalWindowPos = position;
    this.goalWindowSize = size;
    if ($('#goalPlaceholder').is(':visible')) {
      $('#goalPlaceholder').hide();
      this.mainVis.myResize();
    }
  },

  doBothVis: function(method) {
    if (this.startVis) {
      this.startVis[method].call(this.startVis);
    }
    if (this.goalVis) {
      this.goalVis[method].call(this.goalVis);
    }
  },

  resizeGoal: function () {
    this.doBothVis('myResize');
  },

  initStartVisualization: function() {
    this.startCanvasHolder = new CanvasTerminalHolder({
      parent: this,
      additionalClass: 'startTree',
      text: intl.str('hide-start')
    });

    this.startVis = new Visualization({
      el: this.startCanvasHolder.getCanvasLocation(),
      containerElement: this.startCanvasHolder.getCanvasLocation(),
      treeString: this.level.startTree,
      noKeyboardInput: true,
      smallCanvas: true,
      noClick: true
    });
    return this.startCanvasHolder;
  },

  startOffCommand: function() {
    Main.getEventBaton().trigger(
      'commandSubmitted',
      'echo :D'
    );
  },

  objectiveDialog: function(command, deferred) {
    var args = [
      command,
      deferred,
      (this.startDialogObj === undefined) ?
        null :
        {
          startDialog: {
            'en_US': this.startDialogObj
          }
        }
    ];
    LevelBuilder.__super__.objectiveDialog.apply(this, args);
  },

  initParseWaterfall: function(options) {
    LevelBuilder.__super__.initParseWaterfall.apply(this, [options]);

    this.parseWaterfall.addFirst(
      'parseWaterfall',
      parse
    );
    this.parseWaterfall.addFirst(
      'instantWaterfall',
      this.getInstantCommands()
    );
  },

  buildLevel: function(command, deferred) {
    this.exitLevel();

    setTimeout(function() {
      Main.getSandbox().buildLevel(command, deferred);
    }, this.getAnimationTime() * 1.5);
  },

  getInstantCommands: function() {
    return [
      [/^help$|^\?$/, function() {
        throw new Errors.CommandResult({
          msg: intl.str('help-vague-builder')
        });
      }]
    ];
  },

  takeControl: function() {
    Main.getEventBaton().stealBaton('processLevelBuilderCommand', this.processLevelBuilderCommand, this);

    LevelBuilder.__super__.takeControl.apply(this);
  },

  releaseControl: function() {
    Main.getEventBaton().releaseBaton('processLevelBuilderCommand', this.processLevelBuilderCommand, this);

    LevelBuilder.__super__.releaseControl.apply(this);
  },

  showGoal: function() {
    this.hideStart();
    LevelBuilder.__super__.showGoal.apply(this, arguments);
  },

  showStart: function(command, deferred) {
    this.hideGoal();
    this.showSideVis(command, deferred, this.startCanvasHolder, this.initStartVisualization);
  },

  resetSolution: function() {
    this.gitCommandsIssued = [];
    this.level.solutionCommand = undefined;
  },

  hideStart: function(command, deferred) {
    this.hideSideVis(command, deferred, this.startCanvasHolder);
  },

  defineStart: function(command, deferred) {
    this.hideStart();

    command.addWarning(intl.str('define-start-warning'));
    this.resetSolution();

    this.level.startTree = this.mainVis.gitEngine.printTree();
    this.mainVis.resetFromThisTreeNow(this.level.startTree);

    this.showStart(command, deferred);
  },

  defineGoal: function(command, deferred) {
    this.hideGoal();

    if (!this.gitCommandsIssued.length) {
      command.set('error', new Errors.GitError({
        msg: intl.str('solution-empty')
      }));
      deferred.resolve();
      return;
    }

    this.definedGoal = true;
    this.level.solutionCommand = this.gitCommandsIssued.join(';');
    this.level.goalTreeString = this.mainVis.gitEngine.printTree();
    this.initGoalVisualization();

    this.showGoal(command, deferred);
  },

  defineName: function(command, deferred) {
    this.level.name = {
      'en_US': prompt(intl.str('prompt-name'))
    };

    if (command) { command.finishWith(deferred); }
  },

  defineHint: function(command, deferred) {
    this.level.hint = {
      'en_US': prompt(intl.str('prompt-hint'))
    };
    if (command) { command.finishWith(deferred); }
  },

  editDialog: function(command, deferred) {
    var whenDoneEditing = Q.defer();
    this.currentBuilder = new MultiViewBuilder({
      multiViewJSON: this.startDialogObj,
      deferred: whenDoneEditing
    });
    whenDoneEditing.promise
    .then(function(levelObj) {
      this.startDialogObj = levelObj;
    }.bind(this))
    .fail(function() {
      // nothing to do, they dont want to edit it apparently
    })
    .done(function() {
      if (command) {
        command.finishWith(deferred);
      } else {
        deferred.resolve();
      }
    });
  },

  finish: function(command, deferred) {
    if (!this.options.editLevel && (!this.gitCommandsIssued.length || !this.definedGoal)) {
      command.set('error', new Errors.GitError({
        msg: intl.str('solution-empty')
      }));
      deferred.resolve();
      return;
    }

    while (!this.level.name) {
      this.defineName();
    }

    var masterDeferred = Q.defer();
    var chain = masterDeferred.promise;

    if (this.level.hint === undefined) {
      var askForHintDeferred = Q.defer();
      chain = chain.then(function() {
        return askForHintDeferred.promise;
      });

      // ask for a hint if there is none
      var askForHintView = new ConfirmCancelTerminal({
        markdowns: [
          intl.str('want-hint')
        ]
      });
      askForHintView.getPromise()
      .then(this.defineHint.bind(this))
      .fail(function() {
        this.level.hint = {'en_US': ''};
      }.bind(this))
      .done(function() {
        askForHintDeferred.resolve();
      });
    }

    if (this.startDialogObj === undefined) {
      var askForStartDeferred = Q.defer();
      chain = chain.then(function() {
        return askForStartDeferred.promise;
      });

      var askForStartView = new ConfirmCancelTerminal({
        markdowns: [
          intl.str('want-start-dialog')
        ]
      });
      askForStartView.getPromise()
      .then(function() {
        // oh boy this is complex
        var whenEditedDialog = Q.defer();
        // the undefined here is the command that doesnt need resolving just yet...
        this.editDialog(undefined, whenEditedDialog);
        return whenEditedDialog.promise;
      }.bind(this))
      .fail(function() {
        // if they dont want to edit the start dialog, do nothing
      })
      .done(function() {
        askForStartDeferred.resolve();
      });
    }

    chain = chain.done(function() {
      // ok great! lets just give them the goods
      new MarkdownPresenter({
        fillerText: JSON.stringify(this.getExportObj(), null, 2),
        previewText: intl.str('share-json')
      });
      command.finishWith(deferred);
    }.bind(this));

    masterDeferred.resolve();
  },

  getExportObj: function() {
    var compiledLevel = _.extend(
      {},
      this.level
    );
    // the start dialog now is just our help intro thing
    delete compiledLevel.startDialog;
    if (this.startDialogObj) {
      compiledLevel.startDialog = {'en_US': this.startDialogObj};
    }
    return compiledLevel;
  },

  processLevelBuilderCommand: function(command, deferred) {
    var methodMap = {
      'define goal': this.defineGoal,
      'define start': this.defineStart,
      'show start': this.showStart,
      'hide start': this.hideStart,
      'finish': this.finish,
      'define hint': this.defineHint,
      'define name': this.defineName,
      'edit dialog': this.editDialog,
      'help builder': LevelBuilder.__super__.startDialog
    };
    if (!methodMap[command.get('method')]) {
      throw new Error('woah we dont support that method yet');
    }

    methodMap[command.get('method')].apply(this, arguments);
  },

  afterCommandDefer: function(defer, command) {
    // we dont need to compare against the goal anymore
    defer.resolve();
  },

  die: function() {
    this.hideStart();
    LevelBuilder.__super__.die.apply(this, arguments);

    delete this.startVis;
    delete this.startCanvasHolder;
  }
});

exports.LevelBuilder = LevelBuilder;
exports.regexMap = regexMap;
