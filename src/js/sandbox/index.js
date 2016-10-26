var Q = require('q');
var Backbone = require('backbone');

var util = require('../util');
var intl = require('../intl');
var Main = require('../app');
var Errors = require('../util/errors');

var Visualization = require('../visuals/visualization').Visualization;
var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var DisabledMap = require('../level/disabledMap').DisabledMap;
var Command = require('../models/commandModel').Command;
var GitShim = require('../git/gitShim').GitShim;
var LevelActions = require('../actions/LevelActions');
var LevelStore = require('../stores/LevelStore');

var Views = require('../views');
var ModalTerminal = Views.ModalTerminal;
var ModalAlert = Views.ModalAlert;
var BuilderViews = require('../views/builderViews');
var MultiView = require('../views/multiView').MultiView;

var Sandbox = Backbone.View.extend({
  // tag name here is purely vestigial. I made this a view
  // simply to use inheritance and have a nice event system in place
  tagName: 'div',
  initialize: function(options) {
    options = options || {};
    this.options = options;

    this.initVisualization(options);
    this.initCommandCollection(options);
    this.initParseWaterfall(options);
    this.initGitShim(options);
    this.initUndoStack(options);

    if (!options.wait) {
      this.takeControl();
    }
  },

  getDefaultVisEl: function() {
    return $('#mainVisSpace')[0];
  },

  getAnimationTime: function() { return 700 * 1.5; },

  initVisualization: function(options) {
    this.mainVis = new Visualization({
      el: options.el || this.getDefaultVisEl()
    });
  },

  initUndoStack: function(options) {
    this.undoStack = [];
  },

  initCommandCollection: function(options) {
    // don't add it to just any collection -- adding to the
    // CommandUI collection will put in history
    this.commandCollection = Main.getCommandUI().commandCollection;
  },

  initParseWaterfall: function(options) {
    this.parseWaterfall = new ParseWaterfall();
  },

  initGitShim: function(options) {
    this.gitShim = new GitShim({
      beforeCB: this.beforeCommandCB.bind(this)
    });
  },

  takeControl: function() {
    // we will be handling commands that are submitted, mainly to add the sandbox
    // functionality (which is included by default in ParseWaterfall())
    Main.getEventBaton().stealBaton('commandSubmitted', this.commandSubmitted, this);
    // we obviously take care of sandbox commands
    Main.getEventBaton().stealBaton('processSandboxCommand', this.processSandboxCommand, this);

    // a few things to help transition between levels and sandbox
    Main.getEventBaton().stealBaton('levelExited', this.levelExited, this);

    this.insertGitShim();
  },

  releaseControl: function() {
    // we will be handling commands that are submitted, mainly to add the sanadbox
    // functionality (which is included by default in ParseWaterfall())
    Main.getEventBaton().releaseBaton('commandSubmitted', this.commandSubmitted, this);
    // we obviously take care of sandbox commands
    Main.getEventBaton().releaseBaton('processSandboxCommand', this.processSandboxCommand, this);
    // a few things to help transition between levels and sandbox
    Main.getEventBaton().releaseBaton('levelExited', this.levelExited, this);

    this.releaseGitShim();
  },

  releaseGitShim: function() {
    if (this.gitShim) {
      this.gitShim.removeShim();
    }
  },

  insertGitShim: function() {
    // and our git shim goes in after the git engine is ready so it doesn't steal the baton
    // too early
    if (this.gitShim) {
      this.mainVis.customEvents.on('gitEngineReady', function() {
          this.gitShim.insertShim();
      },this);
    }
  },

  beforeCommandCB: function(command) {
    this.pushUndo();
  },

  pushUndo: function() {
    // go ahead and push the three onto the stack
    this.undoStack.push(this.mainVis.gitEngine.printTree());
  },

  undo: function(command, deferred) {
    var toRestore = this.undoStack.pop();
    if (!toRestore) {
      command.set('error', new Errors.GitError({
        msg: intl.str('undo-stack-empty')
      }));
      deferred.resolve();
      return;
    }

    this.mainVis.reset(toRestore);
    setTimeout(function() {
      command.finishWith(deferred);
    }, this.mainVis.getAnimationTime());
  },

  commandSubmitted: function(value) {
    // allow other things to see this command (aka command history on terminal)
    Main.getEvents().trigger('commandSubmittedPassive', value);

    util.splitTextCommand(value, function(command) {
      this.commandCollection.add(new Command({
        rawStr: command,
        parseWaterfall: this.parseWaterfall
      }));
    }, this);
  },

  startLevel: function(command, deferred) {
    var regexResults = command.get('regexResults') || [];
    var desiredID = regexResults[1] || '';
    var levelJSON = LevelStore.getLevel(desiredID);

    // handle the case where that level is not found...
    if (!levelJSON) {
      command.addWarning(
        intl.str(
          'level-no-id',
          { id: desiredID }
        )
      );
      Main.getEventBaton().trigger('commandSubmitted', 'levels');

      command.set('status', 'error');
      deferred.resolve();
      return;
    }

    // we are good to go!! lets prep a bit visually
    this.hide();
    this.clear();

    // we don't even need a reference to this,
    // everything will be handled via event baton :DDDDDDDDD
    var whenLevelOpen = Q.defer();
    var Level = require('../level').Level;

    this.currentLevel = new Level({
      level: levelJSON,
      deferred: whenLevelOpen,
      command: command
    });

    whenLevelOpen.promise.then(function() {
      command.finishWith(deferred);
    });
  },

  buildLevel: function(command, deferred) {
    this.hide();
    this.clear();

    var whenBuilderOpen = Q.defer();
    var LevelBuilder = require('../level/builder').LevelBuilder;

    var regexResults = command.get('regexResults') || [];
    var toEdit = regexResults[1] || false;
    this.levelBuilder = new LevelBuilder({
      deferred: whenBuilderOpen,
      editLevel: toEdit
    });
    whenBuilderOpen.promise.then(function() {
      command.finishWith(deferred);
    });
  },

  exitLevel: function(command, deferred) {
    command.addWarning(
      intl.str('level-cant-exit')
    );
    command.set('status', 'error');
    deferred.resolve();
  },

  showLevels: function(command, deferred) {
    var whenClosed = Q.defer();
    Main.getLevelDropdown().show(whenClosed, command);
    whenClosed.promise.done(function() {
      command.finishWith(deferred);
    });
  },

  resetSolved: function(command, deferred) {
    LevelActions.resetLevelsSolved();
    command.addWarning(
      intl.str('solved-map-reset')
    );
    command.finishWith(deferred);
  },

  processSandboxCommand: function(command, deferred) {
    // I'm tempted to do cancel case conversion, but there are
    // some exceptions to the rule
    var commandMap = {
      'reset solved': this.resetSolved,
      'undo': this.undo,
      'help general': this.helpDialog,
      'help': this.helpDialog,
      'reset': this.reset,
      'delay': this.delay,
      'clear': this.clear,
      'exit level': this.exitLevel,
      'level': this.startLevel,
      'sandbox': this.exitLevel,
      'levels': this.showLevels,
      'mobileAlert': this.mobileAlert,
      'build level': this.buildLevel,
      'export tree': this.exportTree,
      'import tree': this.importTree,
      'importTreeNow': this.importTreeNow,
      'import level': this.importLevel,
      'importLevelNow': this.importLevelNow,
    };

    var method = commandMap[command.get('method')];
    if (!method) { throw new Error('no method for that wut'); }

    method.apply(this, [command, deferred]);
  },

  hide: function() {
    this.mainVis.hide();
  },

  levelExited: function() {
    this.show();
  },

  show: function() {
    this.mainVis.show();
  },

  importLevelNow: function(command, deferred) {
    var options = command.get('regexResults') || [];
    if (options.length < 2) {
      command.set('error', new Errors.GitError({
        msg: intl.str('git-error-options')
      }));
      command.finishWith(deferred);
      return;
    }
    var string = options.input.replace(/importLevelNow\s+/g, '');
    var Level = require('../level').Level;
    try {
      var levelJSON = JSON.parse(unescape(string));
      var whenLevelOpen = Q.defer();
      this.currentLevel = new Level({
        level: levelJSON,
        deferred: whenLevelOpen,
        command: command
      });
      this.hide();

      whenLevelOpen.promise.then(function() {
        command.finishWith(deferred);
      });
    } catch(e) {
      command.set('error', new Errors.GitError({
        msg: 'Something went wrong ' + String(e)
      }));
      throw e;
    }
    command.finishWith(deferred);
  },

  importTreeNow: function(command, deferred) {
    var options = command.get('regexResults') || [];
    if (options.length < 2) {
      command.set('error', new Errors.GitError({
        msg: intl.str('git-error-options')
      }));
      command.finishWith(deferred);
    }
    var string = options.input.replace(/importTreeNow\s+/g, '');
    try {
      this.mainVis.gitEngine.loadTreeFromString(string);
    } catch (e) {
      command.set('error', new Errors.GitError({
        msg: String(e)
      }));
    }
    command.finishWith(deferred);
  },

  importTree: function(command, deferred) {
    var jsonGrabber = new BuilderViews.MarkdownPresenter({
      previewText: intl.str('paste-json'),
      fillerText: ' '
    });
    jsonGrabber.deferred.promise
    .then(function(treeJSON) {
      try {
        this.mainVis.gitEngine.loadTree(JSON.parse(treeJSON));
      } catch(e) {
        this.mainVis.reset();
        new MultiView({
          childViews: [{
            type: 'ModalAlert',
            options: {
              markdowns: [
                '## Error!',
                '',
                'Something is wrong with that JSON! Here is the error:',
                '',
                String(e)
              ]
            }
          }]
        });
      }
    }.bind(this))
    .fail(function() { })
    .done(function() {
      command.finishWith(deferred);
    });
  },

  importLevel: function(command, deferred) {
    var jsonGrabber = new BuilderViews.MarkdownPresenter({
      previewText: intl.str('paste-json'),
      fillerText: ' '
    });

    jsonGrabber.deferred.promise
    .then(function(inputText) {
      var Level = require('../level').Level;
      try {
        var levelJSON = JSON.parse(inputText);
        var whenLevelOpen = Q.defer();
        this.currentLevel = new Level({
          level: levelJSON,
          deferred: whenLevelOpen,
          command: command
        });
        this.hide();

        whenLevelOpen.promise.then(function() {
          command.finishWith(deferred);
        });
      } catch(e) {
        new MultiView({
          childViews: [{
            type: 'ModalAlert',
            options: {
              markdowns: [
                '## Error!',
                '',
                'Something is wrong with that level JSON, this happened:',
                '',
                String(e)
              ]
            }
          }]
        });
        command.finishWith(deferred);
      }
    }.bind(this))
    .fail(function() {
      command.finishWith(deferred);
    })
    .done();
  },

  exportTree: function(command, deferred) {
    var treeJSON = JSON.stringify(this.mainVis.gitEngine.exportTree(), null, 2);

    var showJSON = new MultiView({
      childViews: [{
        type: 'MarkdownPresenter',
        options: {
          previewText: intl.str('share-tree'),
          fillerText: treeJSON,
          noConfirmCancel: true
        }
      }]
    });
    showJSON.getPromise()
    .then(function() {
      command.finishWith(deferred);
    })
    .done();
  },

  clear: function(command, deferred) {
    Main.getEvents().trigger('clearOldCommands');
    if (command && deferred) {
      command.finishWith(deferred);
    }
  },

  mobileAlert: function(command, deferred) {
    alert(intl.str('mobile-alert'));
    command.finishWith(deferred);
  },

  delay: function(command, deferred) {
    var amount = parseInt(command.get('regexResults')[1], 10);
    setTimeout(function() {
      command.finishWith(deferred);
    }, amount);
  },

  reset: function(command, deferred) {
    this.mainVis.reset();
    this.initUndoStack();

    setTimeout(function() {
      command.finishWith(deferred);
    }, this.mainVis.getAnimationTime());
  },

  helpDialog: function(command, deferred) {
    var helpDialog = new MultiView({
      childViews: intl.getDialog(require('../dialogs/sandbox'))
    });
    helpDialog.getPromise().then(function() {
      // the view has been closed, lets go ahead and resolve our command
      command.finishWith(deferred);
    }.bind(this))
    .done();
  }
});

exports.Sandbox = Sandbox;

