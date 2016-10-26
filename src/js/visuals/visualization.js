var _ = require('underscore');
var Backbone = require('backbone');

var Collections = require('../models/collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;
var TagCollection = Collections.TagCollection;
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
      // raphael calls with paper as this for some inane reason...
      var paper = this;
      // use process.nextTick to go from sync to async
      process.nextTick(function() {
        _this.paperInitialize(paper, options);
      });
    });
  },

  paperInitialize: function(paper, options) {
    this.treeString = options.treeString;
    this.paper = paper;

    var Main = require('../app');
    // if we dont want to receive keyboard input (directly),
    // make a new event baton so git engine steals something that no one
    // is broadcasting to
    this.eventBaton = (options.noKeyboardInput) ?
      new EventBaton({noInput: true}) :
      Main.getEventBaton();

    this.commitCollection = new CommitCollection();
    this.branchCollection = new BranchCollection();
    this.tagCollection = new TagCollection();

    this.gitVisuals = new GitVisuals({
      commitCollection: this.commitCollection,
      branchCollection: this.branchCollection,
      tagCollection: this.tagCollection,
      paper: this.paper,
      noClick: this.options.noClick,
      isGoalVis: this.options.isGoalVis,
      smallCanvas: this.options.smallCanvas,
      visualization: this
    });

    var GitEngine = require('../git').GitEngine;
    this.gitEngine = new GitEngine({
      collection: this.commitCollection,
      branches: this.branchCollection,
      tags: this.tagCollection,
      gitVisuals: this.gitVisuals,
      eventBaton: this.eventBaton
    });
    this.gitEngine.init();
    this.gitVisuals.assignGitEngine(this.gitEngine);

    this.myResize();

    $(window).on('resize', function() {
      this.myResize();
    }.bind(this));

    // If the visualization is within a draggable container, we need to update the
    // position whenever the container is moved.
    this.$el.parents('.ui-draggable').on('drag', function(event, ui) {
      this.customEvents.trigger('drag', event, ui);
      this.myResize();
    }.bind(this));

    this.gitVisuals.drawTreeFirstTime();
    if (this.treeString) {
      this.gitEngine.loadTreeFromString(this.treeString);
    }
    if (this.options.zIndex) {
      this.setTreeIndex(this.options.zIndex);
    }

    this.shown = false;
    this.setTreeOpacity(0);
    // reflow needed
    process.nextTick(this.fadeTreeIn.bind(this));

    this.customEvents.trigger('gitEngineReady');
    this.customEvents.trigger('paperReady');
  },

  clearOrigin: function() {
    delete this.originVis;
  },

  makeOrigin: function(options) {
    // oh god, here we go. We basically do a bizarre form of composition here,
    // where this visualization actually contains another one of itself.
    this.originVis = new Visualization(_.extend(
      {},
      // copy all of our options over, except...
      this.options,
      {
        // never accept keyboard input or clicks
        noKeyboardInput: true,
        noClick: true,
        treeString: options.treeString
      }
    ));
    // if the z index is set on ours, carry that over
    this.originVis.customEvents.on('paperReady', function() {
      var value = $(this.paper.canvas).css('z-index');
      this.originVis.setTreeIndex(value);
    }.bind(this));

    // return the newly created visualization which will soon have a git engine
    return this.originVis;
  },

  originToo: function(methodToCall, args) {
    if (!this.originVis) {
      return;
    }
    var callMethod = function() {
      this.originVis[methodToCall].apply(this.originVis, args);
    }.bind(this);

    if (this.originVis.paper) {
      callMethod();
      return;
    }
    // this is tricky -- sometimes we already have paper initialized but
    // our origin vis does not (since we kill that on every reset).
    // in this case lets bind to the custom event on paper ready
    this.originVis.customEvents.on('paperReady', callMethod);
  },

  setTreeIndex: function(level) {
    $(this.paper.canvas).css('z-index', level);
    this.originToo('setTreeIndex', arguments);
  },

  setTreeOpacity: function(level) {
    if (level === 0) {
      this.shown = false;
    }

    $(this.paper.canvas).css('opacity', level);
    this.originToo('setTreeOpacity', arguments);
  },

  getAnimationTime: function() { return 300; },

  fadeTreeIn: function() {
    this.shown = true;
    if (!this.paper) {
      return;
    }
    $(this.paper.canvas).animate({opacity: 1}, this.getAnimationTime());

    this.originToo('fadeTreeIn', arguments);
  },

  fadeTreeOut: function() {
    this.shown = false;
    if (this.paper && this.paper.canvas) {
      $(this.paper.canvas).animate({opacity: 0}, this.getAnimationTime());
    }
    this.originToo('fadeTreeOut', arguments);
  },

  hide: function() {
    this.fadeTreeOut();
    // remove click handlers by toggling visibility
    setTimeout(function() {
      $(this.paper.canvas).css('visibility', 'hidden');
    }.bind(this), this.getAnimationTime());
    this.originToo('hide', arguments);
  },

  show: function() {
    $(this.paper.canvas).css('visibility', 'visible');
    setTimeout(this.fadeTreeIn.bind(this), 10);
    this.originToo('show', arguments);
    this.myResize();
  },

  showHarsh: function() {
    $(this.paper.canvas).css('visibility', 'visible');
    this.setTreeOpacity(1);
    this.originToo('showHarsh', arguments);
    this.myResize();
  },

  resetFromThisTreeNow: function(treeString) {
    this.treeString = treeString;
    // do the same but for origin tree string
    var oTree = this.getOriginInTreeString(treeString);
    if (oTree) {
      var oTreeString = this.gitEngine.printTree(oTree);
      this.originToo('resetFromThisTreeNow', [oTreeString]);
    }
  },

  getOriginInTreeString: function(treeString) {
    var tree = JSON.parse(unescape(treeString));
    return tree.originTree;
  },

  reset: function(tree) {
    var treeString = tree || this.treeString;
    this.setTreeOpacity(0);
    if (treeString) {
      this.gitEngine.loadTreeFromString(treeString);
    } else {
      this.gitEngine.defaultInit();
    }
    this.fadeTreeIn();

    if (this.originVis) {
      if (treeString) {
        var oTree = this.getOriginInTreeString(treeString);
        this.originToo('reset', [JSON.stringify(oTree)]);
      } else {
        // easy
        this.originToo('reset', arguments);
      }
    }
  },

  tearDown: function(options) {
    options = options || {};

    this.gitEngine.tearDown();
    this.gitVisuals.tearDown();
    delete this.paper;
    this.originToo('tearDown', arguments);
  },

  die: function() {
    this.fadeTreeOut();
    setTimeout(function() {
      if (!this.shown) {
        this.tearDown({fromDie: true});
      }
    }.bind(this), this.getAnimationTime());
    this.originToo('die', arguments);
  },

  myResize: function() {
    if (!this.paper) { return; }

    var smaller = 1;
    var el = this.el;

    var width = el.clientWidth - smaller;
    var height = el.clientHeight - smaller;

    // if we don't have a container, we need to set our
    // position absolutely to whatever we are tracking
    if (!this.containerElement) {
      var left = this.$el.offset().left;
      var top = this.$el.offset().top;

      $(this.paper.canvas).css({
        position: 'absolute',
        left: left + 'px',
        top: top + 'px'
      });
    } else {
      // set position to absolute so we all stack nicely
      $(this.paper.canvas).css({
        position: 'absolute'
      });
    }

    this.paper.setSize(width, height);
    this.gitVisuals.canvasResize(width, height);
    this.originToo('myResize', arguments);
  }
});

exports.Visualization = Visualization;

