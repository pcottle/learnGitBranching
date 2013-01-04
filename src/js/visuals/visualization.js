var _ = require('underscore');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? Backbone = require('backbone') : Backbone = window.Backbone;

var Collections = require('../models/collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;
var EventBaton = require('../util/eventBaton').EventBaton;

var GitVisuals = require('../visuals').GitVisuals;

var Visualization = Backbone.View.extend({
  initialize: function(options) {
    options = options || {};
    this.options = options;
    this.customEvents = _.clone(Backbone.Events);
    this.containerElement = options.containerElement;

    var _this = this;
    // we want to add our canvas somewhere
    var container = options.containerElement || $('#canvasHolder')[0];
    new Raphael(container, 200, 200, function() {

      // for some reason raphael calls this function with a predefined
      // context...
      // so switch it
      _this.paperInitialize(this, options);
    });
  },

  paperInitialize: function(paper, options) {
    this.treeString = options.treeString;
    this.paper = paper;

    var Main = require('../app');
    this.events = options.events || Main.getEvents();
    // if we dont want to receive keyoard input (directly),
    // make a new event baton so git engine steals something that no one
    // is broadcasting to
    this.eventBaton = (options.noKeyboardInput) ?
      new EventBaton():
      Main.getEventBaton();

    this.commitCollection = new CommitCollection();
    this.branchCollection = new BranchCollection();

    this.gitVisuals = new GitVisuals({
      commitCollection: this.commitCollection,
      branchCollection: this.branchCollection,
      paper: this.paper
    });

    var GitEngine = require('../git').GitEngine;
    this.gitEngine = new GitEngine({
      collection: this.commitCollection,
      branches: this.branchCollection,
      gitVisuals: this.gitVisuals,
      eventBaton: this.eventBaton
    });
    this.gitEngine.init();
    this.gitVisuals.assignGitEngine(this.gitEngine);

    this.myResize();
    this.events.on('resize', this.myResize, this);
    this.gitVisuals.drawTreeFirstTime();

    if (this.treeString) {
      this.gitEngine.loadTreeFromString(this.treeString);
    }

    this.shown = false;
    this.setTreeOpacity(0);
    // reflow needed
    process.nextTick(_.bind(function() {
      this.fadeTreeIn();
    }, this));

    this.customEvents.trigger('gitEngineReady');
    this.customEvents.trigger('paperReady');
  },

  setTreeOpacity: function(level) {
    if (level === 0) {
      this.shown = false;
    }

    $(this.paper.canvas).css('opacity', 0);
  },

  harshSlideChange: function(value) {
  },

  slideOut: function() {
    this.toggleSlide(true);
  },

  slideIn: function() {
    this.toggleSlide(false);
  },

  toggleSlide: function(value) {
    if (!this.containerElement) {
      console.warn('cant slide with absolute positioning');
      return;
    }

    // no classes on svg :-/
    $(this.containerElement).toggleClass('slideOut', value);
  },

  getAnimationTime: function() { return 300; },

  fadeTreeIn: function() {
    this.shown = true;
    $(this.paper.canvas).animate({opacity: 1}, this.getAnimationTime());
  },

  fadeTreeOut: function() {
    this.shown = false;
    $(this.paper.canvas).animate({opacity: 0}, this.getAnimationTime());
  },

  reset: function() {
    this.setTreeOpacity(0);
    if (this.treeString) {
      this.gitEngine.loadTreeFromString(this.treeString);
    } else {
      this.gitEngine.defaultInit();
    }
    this.fadeTreeIn();
  },

  tearDown: function() {
    // hmm -- dont think this will work to unbind the event listener...
    this.events.off('resize', this.myResize, this);
    this.gitVisuals.tearDown();
  },

  die: function() {
    this.fadeTreeOut();
    setTimeout(_.bind(function() {
      if (!this.shown) {
        this.tearDown();
      }
    }, this), this.getAnimationTime());
  },

  myResize: function() {
    var smaller = 1;
    var el = this.el;

    var width = el.clientWidth - smaller;
    var height = el.clientHeight - smaller;

    // if we don't have a container, we need to set our
    // position absolutely to whatever we are tracking
    if (!this.options.containerElement) {
      var left = el.offsetLeft;
      var top = el.offsetTop;

      $(this.paper.canvas).css({
        position: 'absolute',
        left: left + 'px',
        top: top + 'px'
      });
    }

    this.paper.setSize(width, height);
    this.gitVisuals.canvasResize(width, height);
  }
});

exports.Visualization = Visualization;

