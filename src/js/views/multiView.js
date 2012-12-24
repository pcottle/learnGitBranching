var GitError = require('../util/errors').GitError;
var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var ConfirmCancelView = require('../views').ConfirmCancelView;
var LeftRightView = require('../views').LeftRightView;
var ModalAlert = require('../views').ModalAlert;

var NAV_EVENT_DELAY = 300;

var MultiView = Backbone.View.extend({
  tagName: 'div',
  className: 'multiView',
  // ms to debounce the nav functions
  navEventDelay: 1500,

  // a simple mapping of what childViews we support
  typeToConstructor: {
    ModalAlert: ModalAlert
  },

  initialize: function(options) {
    options = options || {};
    this.childViewJSONs = options.childViews || [{
      type: 'ModalAlert',
      options: {
        markdown: 'Woah wtf!!'
      }
    }, {
      type: 'ModalAlert',
      options: {
        markdown: 'Im second'
      }
    }];

    this.childViews = [];
    this.currentIndex = 0;

    this.navEvents = _.clone(Backbone.Events);
    this.navEvents.on('positive', this.getPosFunc(), this);
    this.navEvents.on('negative', this.getNegFunc(), this);

    this.render();
  },

  getPosFunc: function() {
    return _.debounce(_.bind(function() {
      this.navForward();
    }, this), NAV_EVENT_DELAY, true);
  },

  getNegFunc: function() {
    return _.debounce(_.bind(function() {
      this.navBackward();
    }, this), NAV_EVENT_DELAY, true);
  },

  navForward: function() {
    this.navIndexChange(1);
  },

  navBackward: function() {
    this.navIndexChange(-1);
  },

  navIndexChange: function(delta) {
    console.log('doing nav index change', delta);
    this.hideViewIndex(this.currentIndex);
    this.currentIndex += delta;
    this.showViewIndex(this.currentIndex);
  },

  hideViewIndex: function(index) {
    this.childViews[index].hide();
  },

  showViewIndex: function(index) {
    this.childViews[index].show();
  },

  createChildView: function(viewJSON) {
    var type = viewJSON.type;
    if (!this.typeToConstructor[type]) {
      throw new Error('no constructor for type "' + type + '"');
    }
    var view = new this.typeToConstructor[type](viewJSON.options);
    return view;
  },

  addNavToView: function(view, index) {
    var leftRight = new LeftRightView({
      events: this.navEvents,
      // we want the arrows to be on the same level as the content (not
      // beneath), so we go one level up with getDestination()
      destination: view.getDestination(),
      showLeft: (index !== 0),
      lastNav: (index === this.childViewJSONs.length - 1)
    });
  },

  render: function() {
    // go through each and render... show the first
    _.each(this.childViewJSONs, function(childViewJSON, index) {
      var childView = this.createChildView(childViewJSON);
      this.childViews.push(childView);
      this.addNavToView(childView, index);
    }, this);

    this.showViewIndex(this.currentIndex);
  }
});

exports.MultiView = MultiView;

