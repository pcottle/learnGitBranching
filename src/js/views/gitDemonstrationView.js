var _ = require('underscore');
var createDeferred = require('../util/promise').createDeferred;
var delay = require('../util/promise').delay;
var { marked } = require('marked');

var util = require('../util');
var intl = require('../intl');
var KeyboardListener = require('../util/keyboard').KeyboardListener;
var Command = require('../models/commandModel').Command;
var { createEvents } = require('../util/eventEmitter');

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;

var Visualization = require('../visuals/visualization').Visualization;
var HeadlessGit = require('../git/headless');

class GitDemonstrationView extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'gitDemonstrationView box horizontal';
    super(options);

    this.template = _.template($('#git-demonstration-view').html());
    this.events = {
      'click div.command > p.uiButton:not([target="reset"])': 'positive',
      'click div.command > p[target="reset"]': 'onResetButtonClick',
    };

    this.options = options;
    this.JSON = Object.assign(
      {
        beforeMarkdowns: [
          '## Git Commits',
          '',
          'Awesome!'
        ],
        command: 'git commit',
        afterMarkdowns: [
          'Now you have seen it in action',
          '',
          'Go ahead and try the level!'
        ]
      },
      options
    );

    var convert = function(markdowns) {
      return marked(markdowns.join('\n'));
    };

    this.JSON.beforeHTML = convert(this.JSON.beforeMarkdowns);
    this.JSON.afterHTML = convert(this.JSON.afterMarkdowns);

    this.container = new ModalTerminal({
      title: options.title || intl.str('git-demonstration-title')
    });
    this.render();
    this.checkScroll();

    // Initialize visualization BEFORE binding events that use mainVis
    this.visFinished = false;
    this.initVis();

    // Bind events AFTER mainVis is created
    this.$el.on('click', 'div.command > p.uiButton:not([target="reset"])', this.positive.bind(this));
    this.$el.on('click', 'div.command > p[target="reset"]', this.onResetButtonClick.bind(this));

    this.navEvents = createEvents();
    this.navEvents.on('positive', this.positive, this);
    this.navEvents.on('negative', this.negative, this);
    this.navEvents.on('exit', this.exit, this);
    this.navEvents.on('onResetButtonClick', this.onResetButtonClick, this);
    this.keyboardListener = new KeyboardListener({
      events: this.navEvents,
      aliasMap: {
        enter: 'positive',
        right: 'positive',
        left: 'negative'
      },
      wait: true
    });

    if (!options.wait) {
      this.show();
    }
  }

  exit() {
    alert('exittt');
  }

  receiveMetaNav(navView, metaContainerView) {
    navView.navEvents.on('positive', this.positive, this);
    navView.navEvents.on('exit', this.exit, this);
    this.metaContainerView = metaContainerView;
  }

  checkScroll() {
    var children = this.$('div.demonstrationText').children().toArray();
    var heights = children.map(function(child) { return child.clientHeight; });
    var totalHeight = heights.reduce(function(a, b) { return a + b; });
    if (totalHeight < this.$('div.demonstrationText').height()) {
      this.$('div.demonstrationText').addClass('noLongText');
    }
  }

  dispatchBeforeCommand() {
    if (!this.options.beforeCommand) {
      return;
    }

    var whenHaveTree = createDeferred();
    HeadlessGit.getTreeQuick(this.options.beforeCommand, whenHaveTree);
    whenHaveTree.promise.then(function(tree) {
      this.mainVis.gitEngine.loadTree(tree);
      this.mainVis.gitVisuals.refreshTreeHarsh();
    }.bind(this));
  }

  takeControl() {
    this.hasControl = true;
    this.keyboardListener.listen();

    if (this.metaContainerView) { this.metaContainerView.lock(); }
  }

  releaseControl() {
    if (!this.hasControl) { return; }
    this.hasControl = false;
    this.keyboardListener.mute();

    if (this.metaContainerView) { this.metaContainerView.unlock(); }
  }

  reset() {
    this.mainVis.reset();
    this.dispatchBeforeCommand();
    this.demonstrated = false;
    this.$el.toggleClass('demonstrated', false);
    this.$el.toggleClass('demonstrating', false);
  }

  positive() {
    if (this.demonstrated || !this.hasControl) {
      // don't do anything if we are demonstrating, and if
      // we receive a meta nav event and we aren't listening,
      // then don't do anything either
      return;
    }
    this.demonstrated = true;
    this.demonstrate();
  }

  onResetButtonClick() {
    this.takeControl();
    this.reset();
  }

  demonstrate() {
    this.$el.toggleClass('demonstrating', true);

    var whenDone = createDeferred();
    this.dispatchCommand(this.JSON.command, whenDone);
    whenDone.promise.then(function() {
      this.$el.toggleClass('demonstrating', false);
      this.$el.toggleClass('demonstrated', true);
      this.releaseControl();
    }.bind(this));
  }

  negative(e) {
    if (this.$el.hasClass('demonstrating')) {
      return;
    }
    this.keyboardListener.passEventBack(e);
  }

  dispatchCommand(value, whenDone) {
    var commands = [];
    util.splitTextCommand(value, function(commandStr) {
      commands.push(new Command({
        rawStr: commandStr
      }));
    }, this);

    var chainPromise = Promise.resolve();

    commands.forEach(function(command, index) {
      chainPromise = chainPromise.then(function() {
        return new Promise(function(resolve) {
          this.mainVis.gitEngine.dispatch(command, { resolve: resolve });
        }.bind(this));
      }.bind(this));
      chainPromise = chainPromise.then(function() {
        return delay(300);
      });
    }, this);

    chainPromise = chainPromise.then(function() {
      whenDone.resolve();
    });
  }

  tearDown() {
    this.mainVis.tearDown();
    ContainedBase.prototype.tearDown.call(this);
  }

  hide() {
    this.releaseControl();
    this.reset();
    if (this.visFinished) {
      this.mainVis.setTreeIndex(-1);
      this.mainVis.setTreeOpacity(0);
    }

    this.shown = false;
    ContainedBase.prototype.hide.call(this);
  }

  show() {
    this.takeControl();
    if (this.visFinished) {
      setTimeout(function() {
        if (this.shown) {
          this.mainVis.setTreeIndex(300);
          this.mainVis.showHarsh();
        }
      }.bind(this), this.getAnimationTime() * 1.5);
    }

    this.shown = true;
    ContainedBase.prototype.show.call(this);
  }

  die() {
    if (!this.visFinished) { return; }

    ContainedBase.prototype.die.call(this);
  }

  initVis() {
    this.mainVis = new Visualization({
      el: this.$('div.visHolder div.visHolderInside')[0],
      noKeyboardInput: true,
      noClick: true,
      smallCanvas: true,
      zIndex: -1
    });
    this.mainVis.customEvents.on('paperReady', function() {
      this.visFinished = true;
      this.dispatchBeforeCommand();
      if (this.shown) {
        // show the canvas once its done if we are shown
        this.show();
      }
    }.bind(this));
  }
}

exports.GitDemonstrationView = GitDemonstrationView;
