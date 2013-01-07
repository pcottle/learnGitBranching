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
    'click div.command > a.uiButton': 'positive'
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

    this.navEvents = _.clone(Backbone.Events);
    this.navEvents.on('positive', this.positive, this);
    this.keyboardListener = new KeyboardListener({
      events: this.navEvents,
      aliasMap: {
        enter: 'positive',
        right: 'positive'
      },
      wait: true
    });

    if (!options.wait) {
      this.show();
    }

    // show the canvas once we slide down
    this.visFinished = false;
    setTimeout(_.bind(this.initVis, this), this.getAnimationTime());
  },

  takeControl: function() {
    this.hasControl = true;
    this.keyboardListener.listen();
  },

  releaseControl: function() {
    if (!this.hasControl) { return; }
    this.hasControl = false;
    this.keyboardListener.mute();
  },

  reset: function() {
    this.mainVis.reset();
    this.demonstrated = false;
    this.$el.toggleClass('demonstrated', false);
  },

  positive: function() {
    if (this.demonstrated) {
      return;
    }

    this.$el.toggleClass('demonstrated', true);
    this.dispatchCommand(this.JSON.command);
    this.demonstrated = true;
    this.releaseControl();
  },

  dispatchCommand: function(value) {
    util.splitTextCommand(value, function(commandStr) {
      var command = new Command({
        rawStr: commandStr
      });
      this.mainVis.gitEngine.dispatch(command, Q.defer());
    }, this);
  },

  hide: function() {
    this.releaseControl();
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
      el: this.$('div.visHolder')[0],
      noKeyboardInput: true,
      noClick: true,
      smallCanvas: true,
      zIndex: 300
    });
    this.mainVis.customEvents.on('paperReady', _.bind(function() {
      this.visFinished = true;
    }, this));
  }
});

exports.GitDemonstrationView = GitDemonstrationView;

