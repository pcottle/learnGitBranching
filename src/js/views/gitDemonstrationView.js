var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var util = require('../util');
var KeyboardListener = require('../util/keyboard').KeyboardListener;
var Command = require('../models/commandModel').Command;

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;

var Visualization = require('../visuals/visualization').Visualization;

var GitDemonstrationView = ContainedBase.extend({
  tagName: 'div',
  className: 'gitDemonstrationView box horizontal',
  template: _.template($('#git-demonstration-view').html()),

  events: {
    'click div.command > p.uiButton': 'positive'
  },

  initialize: function(options) {
    options = options || {};
    this.options = options;
    this.JSON = _.extend(
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
      return require('markdown').markdown.toHTML(markdowns.join('\n'));
    };

    this.JSON.beforeHTML = convert(this.JSON.beforeMarkdowns);
    this.JSON.afterHTML = convert(this.JSON.afterMarkdowns);

    this.container = new ModalTerminal({
      title: options.title || 'Git Demonstration'
    });
    this.render();
    this.checkScroll();

    this.navEvents = _.clone(Backbone.Events);
    this.navEvents.on('positive', this.positive, this);
    this.navEvents.on('negative', this.negative, this);
    this.keyboardListener = new KeyboardListener({
      events: this.navEvents,
      aliasMap: {
        enter: 'positive',
        right: 'positive',
        left: 'negative'
      },
      wait: true
    });

    this.visFinished = false;
    this.initVis();

    if (!options.wait) {
      this.show();
    }
  },

  receiveMetaNav: function(navView, metaContainerView) {
    var _this = this;
    navView.navEvents.on('positive', this.positive, this);
    this.metaContainerView = metaContainerView;
  },

  checkScroll: function() {
    var children = this.$('div.demonstrationText').children();
    var heights = _.map(children, function(child) { return child.clientHeight; });
    var totalHeight = _.reduce(heights, function(a, b) { return a + b; });
    if (totalHeight < this.$('div.demonstrationText').height()) {
      this.$('div.demonstrationText').addClass('noLongText');
    }
  },

  dispatchBeforeCommand: function() {
    if (!this.options.beforeCommand) {
      return;
    }

    // here we just split the command and push them through to the git engine
    util.splitTextCommand(this.options.beforeCommand, function(commandStr) {
      this.mainVis.gitEngine.dispatch(new Command({
        rawStr: commandStr
      }), Q.defer());
    }, this);
    // then harsh refresh
    this.mainVis.gitVisuals.refreshTreeHarsh();
  },

  takeControl: function() {
    this.hasControl = true;
    this.keyboardListener.listen();

    if (this.metaContainerView) { this.metaContainerView.lock(); }
  },

  releaseControl: function() {
    if (!this.hasControl) { return; }
    this.hasControl = false;
    this.keyboardListener.mute();

    if (this.metaContainerView) { this.metaContainerView.unlock(); }
  },

  reset: function() {
    this.mainVis.reset();
    this.dispatchBeforeCommand();
    this.demonstrated = false;
    this.$el.toggleClass('demonstrated', false);
    this.$el.toggleClass('demonstrating', false);
  },

  positive: function() {
    if (this.demonstrated || !this.hasControl) {
      // dont do anything if we are demonstrating, and if
      // we receive a meta nav event and we aren't listening,
      // then dont do anything either
      return;
    }
    this.demonstrated = true;
    this.demonstrate();
  },

  demonstrate: function() {
    this.$el.toggleClass('demonstrating', true);

    var whenDone = Q.defer();
    this.dispatchCommand(this.JSON.command, whenDone);
    whenDone.promise.then(_.bind(function() {
      this.$el.toggleClass('demonstrating', false);
      this.$el.toggleClass('demonstrated', true);
      this.releaseControl();
    }, this));
  },

  negative: function(e) {
    if (this.$el.hasClass('demonstrating')) {
      return;
    }
    this.keyboardListener.passEventBack(e);
  },

  dispatchCommand: function(value, whenDone) {
    var commands = [];
    util.splitTextCommand(value, function(commandStr) {
      commands.push(new Command({
        rawStr: commandStr
      }));
    }, this);

    var chainDeferred = Q.defer();
    var chainPromise = chainDeferred.promise;

    _.each(commands, function(command, index) {
      chainPromise = chainPromise.then(_.bind(function() {
        var myDefer = Q.defer();
        this.mainVis.gitEngine.dispatch(command, myDefer);
        return myDefer.promise;
      }, this));
      chainPromise = chainPromise.then(function() {
        return Q.delay(300);
      });
    }, this);

    chainPromise = chainPromise.then(function() {
      whenDone.resolve();
    });

    chainDeferred.resolve();
  },

  tearDown: function() {
    this.mainVis.tearDown();
    GitDemonstrationView.__super__.tearDown.apply(this);
  },

  hide: function() {
    this.releaseControl();
    this.reset();
    if (this.visFinished) {
      this.mainVis.setTreeIndex(-1);
      this.mainVis.setTreeOpacity(0);
    }

    this.shown = false;
    GitDemonstrationView.__super__.hide.apply(this);
  },

  show: function() {
    this.takeControl();
    if (this.visFinished) {
      setTimeout(_.bind(function() {
        if (this.shown) {
          this.mainVis.setTreeIndex(300);
          this.mainVis.showHarsh();
        }
      }, this), this.getAnimationTime() * 1);
    }

    this.shown = true;
    GitDemonstrationView.__super__.show.apply(this);
  },

  die: function() {
    if (!this.visFinished) { return; }

    GitDemonstrationView.__super__.die.apply(this);
  },

  initVis: function() {
    this.mainVis = new Visualization({
      el: this.$('div.visHolder div.visHolderInside')[0],
      noKeyboardInput: true,
      noClick: true,
      smallCanvas: true,
      zIndex: -1
    });
    this.mainVis.customEvents.on('paperReady', _.bind(function() {
      this.visFinished = true;
      this.dispatchBeforeCommand();
      if (this.shown) {
        // show the canvas once its done if we are shown
        this.show();
      }
    }, this));
  }
});

exports.GitDemonstrationView = GitDemonstrationView;

