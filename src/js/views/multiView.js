var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var ConfirmCancelView = require('../views').ConfirmCancelView;
var LeftRightView = require('../views').LeftRightView;
var ModalAlert = require('../views').ModalAlert;
var GitDemonstrationView = require('../views/gitDemonstrationView').GitDemonstrationView;

var BuilderViews = require('../views/builderViews');
var MarkdownPresenter = BuilderViews.MarkdownPresenter;

var KeyboardListener = require('../util/keyboard').KeyboardListener;
var GitError = require('../util/errors').GitError;

var MultiView = Backbone.View.extend({
  tagName: 'div',
  className: 'multiView',
  // ms to debounce the nav functions
  navEventDebounce: 550,
  deathTime: 700,

  // a simple mapping of what childViews we support
  typeToConstructor: {
    ModalAlert: ModalAlert,
    GitDemonstrationView: GitDemonstrationView,
    MarkdownPresenter: MarkdownPresenter
  },

  initialize: function(options) {
    options = options || {};
    this.childViewJSONs = options.childViews || [{
      type: 'ModalAlert',
      options: {
        markdown: 'Woah wtf!!'
      }
     }, {
       type: 'GitDemonstrationView',
       options: {
         command: 'git checkout -b side; git commit; git commit'
       }
     }, {
      type: 'ModalAlert',
      options: {
        markdown: 'Im second'
      }
    }];
    this.deferred = options.deferred || Q.defer();

    this.childViews = [];
    this.currentIndex = 0;

    this.navEvents = _.clone(Backbone.Events);
    this.navEvents.on('negative', this.getNegFunc(), this);
    this.navEvents.on('positive', this.getPosFunc(), this);
    this.navEvents.on('quit', this.finish, this);
    this.navEvents.on('exit', this.finish, this);

    this.keyboardListener = new KeyboardListener({
      events: this.navEvents,
      aliasMap: {
        left: 'negative',
        right: 'positive',
        enter: 'positive',
        esc: 'quit'
      }
    });

    this.render();
    if (!options.wait) {
      this.start();
    }
  },

  onWindowFocus: function() {
    // nothing here for now...
    // TODO -- add a cool glow effect?
  },

  getAnimationTime: function() {
    return 700;
  },

  getPromise: function() {
    return this.deferred.promise;
  },

  getPosFunc: function() {
    return _.debounce(_.bind(function() {
      this.navForward();
    }, this), this.navEventDebounce, true);
  },

  getNegFunc: function() {
    return _.debounce(_.bind(function() {
      this.navBackward();
    }, this), this.navEventDebounce, true);
  },

  lock: function() {
    this.locked = true;
  },

  unlock: function() {
    this.locked = false;
  },

  navForward: function() {
    // we need to prevent nav changes when a git demonstration view hasnt finished
    if (this.locked) { return; }
    if (this.currentIndex === this.childViews.length - 1) {
      this.hideViewIndex(this.currentIndex);
      this.finish();
      return;
    }

    this.navIndexChange(1);
  },

  navBackward: function() {
    if (this.currentIndex === 0) {
      return;
    }

    this.navIndexChange(-1);
  },

  navIndexChange: function(delta) {
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

  finish: function() {
    // first we stop listening to keyboard and give that back to UI, which
    // other views will take if they need to
    this.keyboardListener.mute();

    _.each(this.childViews, function(childView) {
      childView.die();
    });

    this.deferred.resolve();
  },

  start: function() {
    // steal the window focus baton
    this.showViewIndex(this.currentIndex);
  },

  createChildView: function(viewJSON) {
    var type = viewJSON.type;
    if (!this.typeToConstructor[type]) {
      throw new Error('no constructor for type "' + type + '"');
    }
    var view = new this.typeToConstructor[type](_.extend(
      {},
      viewJSON.options,
      { wait: true }
    ));
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
    if (view.receiveMetaNav) {
      view.receiveMetaNav(leftRight, this);
    }
  },

  render: function() {
    // go through each and render... show the first
    _.each(this.childViewJSONs, function(childViewJSON, index) {
      var childView = this.createChildView(childViewJSON);
      this.childViews.push(childView);
      this.addNavToView(childView, index);
    }, this);
  }
});

exports.MultiView = MultiView;

