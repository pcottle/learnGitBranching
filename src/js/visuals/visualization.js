var _ = require('underscore');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? Backbone = require('backbone') : Backbone = window.Backbone;

var Collections = require('../models/collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;

var GitVisuals = require('../visuals').GitVisuals;

var Visualization = Backbone.View.extend({
  initialize: function(options) {
    var _this = this;
    this.customEvents = _.clone(Backbone.Events);

    new Raphael(10, 10, 200, 200, function() {

      // for some reason raphael calls this function with a predefined
      // context...
      // so switch it
      _this.paperInitialize(this, options);
    });
  },

  paperInitialize: function(paper, options) {
    options = options || {};
    this.treeString = options.treeString;
    this.paper = paper;

    var Main = require('../app');
    this.events = options.events || Main.getEvents();
    this.eventBaton = options.eventBaton || Main.getEventBaton();

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
    $(window).on('resize', _.bind(this.myResize, this));
    this.gitVisuals.drawTreeFirstTime();

    if (this.treeString) {
      this.gitEngine.loadTreeFromString(this.treeString);
    }

    this.setTreeOpacity(0);
    this.fadeTreeIn();

    this.customEvents.trigger('gitEngineReady');
  },

  setTreeOpacity: function(level) {
    $(this.paper.canvas).css('opacity', 0);
  },

  fadeTreeIn: function() {
    $(this.paper.canvas).animate({opacity: 1}, 300);
  },

  myResize: function() {
    var smaller = 1;
    var el = this.el;

    var left = el.offsetLeft;
    var top = el.offsetTop;
    var width = el.clientWidth - smaller;
    var height = el.clientHeight - smaller;

    $(this.paper.canvas).css({
      left: left + 'px',
      top: top + 'px'
    });
    this.paper.setSize(width, height);
    this.gitVisuals.canvasResize(width, height);
  }
});

exports.Visualization = Visualization;
