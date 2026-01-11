var LeftRightView = require('../views').LeftRightView;
var ModalAlert = require('../views').ModalAlert;
var GitDemonstrationView = require('../views/gitDemonstrationView').GitDemonstrationView;

var BuilderViews = require('../views/builderViews');
var MarkdownPresenter = BuilderViews.MarkdownPresenter;

var KeyboardListener = require('../util/keyboard').KeyboardListener;
var debounce = require('../util/debounce');
var { createEvents } = require('../util/eventEmitter');

class MultiView {
  constructor(options) {
    options = options || {};
    this.tagName = 'div';
    this.className = 'multiView';
    this.el = document.createElement(this.tagName);
    this.el.className = this.className;
    this.$el = $(this.el);

    // ms to debounce the nav functions
    this.navEventDebounce = 550;
    this.deathTime = 700;

    // a simple mapping of what childViews we support
    this.typeToConstructor = {
      ModalAlert: ModalAlert,
      GitDemonstrationView: GitDemonstrationView,
      MarkdownPresenter: MarkdownPresenter
    };

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
    this.deferred = options.deferred || {};
    this.promise = new Promise(function(resolve, reject) {
      this.deferred.resolve = resolve;
      this.deferred.reject = reject;
    }.bind(this));

    this.childViews = [];
    this.currentIndex = 0;

    this.navEvents = createEvents();
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
  }

  $(selector) {
    return this.$el.find(selector);
  }

  onWindowFocus() {
    // nothing here for now...
    // TODO -- add a cool glow effect?
  }

  getAnimationTime() {
    return 700;
  }

  getPromise() {
    return this.promise;
  }

  getPosFunc() {
    return debounce(function() {
      this.navForward();
    }.bind(this), this.navEventDebounce, true);
  }

  getNegFunc() {
    return debounce(function() {
      this.navBackward();
    }.bind(this), this.navEventDebounce, true);
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }

  navForward() {
    // we need to prevent nav changes when a git demonstration view hasnt finished
    if (this.locked) { return; }
    if (this.currentIndex === this.childViews.length - 1) {
      this.hideViewIndex(this.currentIndex);
      this.finish();
      return;
    }

    this.navIndexChange(1);
  }

  navBackward() {
    if (this.currentIndex === 0) {
      return;
    }

    this.navIndexChange(-1);
  }

  navIndexChange(delta) {
    this.hideViewIndex(this.currentIndex);
    this.currentIndex += delta;
    this.showViewIndex(this.currentIndex);
  }

  hideViewIndex(index) {
    this.childViews[index].hide();
  }

  showViewIndex(index) {
    this.childViews[index].show();
  }

  finish() {
    // first we stop listening to keyboard and give that back to UI, which
    // other views will take if they need to
    this.keyboardListener.mute();

    this.childViews.forEach(function(childView) {
      childView.die();
    });

    this.deferred.resolve();
  }

  start() {
    // steal the window focus baton
    this.showViewIndex(this.currentIndex);
  }

  createChildView(viewJSON) {
    var type = viewJSON.type;
    if (!this.typeToConstructor[type]) {
      throw new Error('no constructor for type "' + type + '"');
    }
    var view = new this.typeToConstructor[type](Object.assign(
      {},
      viewJSON.options,
      { wait: true }
    ));
    return view;
  }

  addNavToView(view, index) {
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
  }

  render() {
    // go through each and render... show the first
    this.childViewJSONs.forEach(function(childViewJSON, index) {
      var childView = this.createChildView(childViewJSON);
      this.childViews.push(childView);
      this.addNavToView(childView, index);
    }, this);
  }
}

exports.MultiView = MultiView;

