var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var Main = require('../app');
var intl = require('../intl');
var log = require('../log');
var Constants = require('../util/constants');
var KeyboardListener = require('../util/keyboard').KeyboardListener;
var GitError = require('../util/errors').GitError;

var BaseView = Backbone.View.extend({
  getDestination: function() {
    return this.destination || this.container.getInsideElement();
  },

  tearDown: function() {
    this.$el.remove();
    if (this.container) {
      this.container.tearDown();
    }
  },

  renderAgain: function(HTML) {
    // flexibility
    HTML = HTML || this.template(this.JSON);
    this.$el.html(HTML);
  },

  render: function(HTML) {
    this.renderAgain(HTML);
    var destination = this.getDestination();
    $(destination).append(this.el);
  }
});

var ResolveRejectBase = BaseView.extend({
  resolve: function() {
    this.deferred.resolve();
  },

  reject: function() {
    this.deferred.reject();
  }
});

var PositiveNegativeBase = BaseView.extend({
  positive: function() {
    this.navEvents.trigger('positive');
  },

  negative: function() {
    this.navEvents.trigger('negative');
  }
});

var ContainedBase = BaseView.extend({
  getAnimationTime: function() { return 700; },

  show: function() {
    this.container.show();
  },

  hide: function() {
    this.container.hide();
  },

  die: function() {
    this.hide();
    setTimeout(_.bind(function() {
      this.tearDown();
    }, this), this.getAnimationTime() * 1.1);
  }
});

var GeneralButton = ContainedBase.extend({
  tagName: 'a',
  className: 'generalButton uiButton',
  template: _.template($('#general-button').html()),
  events: {
    'click': 'click'
  },

  initialize: function(options) {
    options = options || {};
    this.navEvents = options.navEvents || _.clone(Backbone.Events);
    this.destination = options.destination;
    if (!this.destination) {
      this.container = new ModalTerminal();
    }

    this.JSON = {
      buttonText: options.buttonText || 'General Button',
      wantsWrapper: (options.wantsWrapper !== undefined) ? options.wantsWrapper : true
    };

    this.render();

    if (this.container && !options.wait) {
      this.show();
    }
  },

  click: function() {
    if (!this.clickFunc) {
      this.clickFunc = _.throttle(
        _.bind(this.sendClick, this),
        500
      );
    }
    this.clickFunc();
  },

  sendClick: function() {
    this.navEvents.trigger('click');
  }
});

var ConfirmCancelView = ResolveRejectBase.extend({
  tagName: 'div',
  className: 'confirmCancelView box horizontal justify',
  template: _.template($('#confirm-cancel-template').html()),
  events: {
    'click .confirmButton': 'resolve',
    'click .cancelButton': 'reject'
  },

  initialize: function(options) {
    if (!options.destination) {
      throw new Error('needmore');
    }

    this.destination = options.destination;
    this.deferred = options.deferred || Q.defer();
    this.JSON = {
      confirm: options.confirm || 'Confirm',
      cancel: options.cancel || 'Cancel'
    };

    this.render();
  }
});

var LeftRightView = PositiveNegativeBase.extend({
  tagName: 'div',
  className: 'leftRightView box horizontal center',
  template: _.template($('#left-right-template').html()),
  events: {
    'click .left': 'negative',
    'click .right': 'positive'
  },

  positive: function() {
    this.pipeEvents.trigger('positive');
    LeftRightView.__super__.positive.apply(this);
  },

  negative: function() {
    this.pipeEvents.trigger('negative');
    LeftRightView.__super__.negative.apply(this);
  },

  initialize: function(options) {
    if (!options.destination || !options.events) {
      throw new Error('needmore');
    }

    this.destination = options.destination;

    // we switch to a system where every leftrightview has its own
    // events system to add support for git demonstration view taking control of the
    // click events
    this.pipeEvents = options.events;
    this.navEvents = _.clone(Backbone.Events);

    this.JSON = {
      showLeft: (options.showLeft === undefined) ? true : options.showLeft,
      lastNav: (options.lastNav === undefined) ? false : options.lastNav
    };

    this.render();
  }
});

var ModalView = Backbone.View.extend({
  tagName: 'div',
  className: 'modalView box horizontal center transitionOpacityLinear',
  template: _.template($('#modal-view-template').html()),

  getAnimationTime: function() { return 700; },

  initialize: function(options) {
    this.shown = false;
    this.render();
  },

  render: function() {
    // add ourselves to the DOM
    this.$el.html(this.template({}));
    $('body').append(this.el);
    // this doesnt necessarily show us though...
  },

  stealKeyboard: function() {
    Main.getEventBaton().stealBaton('keydown', this.onKeyDown, this);
    Main.getEventBaton().stealBaton('keyup', this.onKeyUp, this);
    Main.getEventBaton().stealBaton('windowFocus', this.onWindowFocus, this);
    Main.getEventBaton().stealBaton('documentClick', this.onDocumentClick, this);

    // blur the text input field so keydown events will not be caught by our
    // preventDefaulters, allowing people to still refresh and launch inspector (etc)
    $('#commandTextField').blur();
  },

  releaseKeyboard: function() {
    Main.getEventBaton().releaseBaton('keydown', this.onKeyDown, this);
    Main.getEventBaton().releaseBaton('keyup', this.onKeyUp, this);
    Main.getEventBaton().releaseBaton('windowFocus', this.onWindowFocus, this);
    Main.getEventBaton().releaseBaton('documentClick', this.onDocumentClick, this);

    Main.getEventBaton().trigger('windowFocus');
  },

  onWindowFocus: function(e) {
    //console.log('window focus doing nothing', e);
  },

  onDocumentClick: function(e) {
    //console.log('doc click doing nothing', e);
  },

  onKeyDown: function(e) {
    e.preventDefault();
  },

  onKeyUp: function(e) {
    e.preventDefault();
  },

  show: function() {
    this.toggleZ(true);
    // on reflow, change our class to animate. for whatever
    // reason if this is done immediately, chrome might combine
    // the two changes and lose the ability to animate and it looks bad.
    process.nextTick(_.bind(function() {
      this.toggleShow(true);
    }, this));
  },

  hide: function() {
    this.toggleShow(false);
    setTimeout(_.bind(function() {
      // if we are still hidden...
      if (!this.shown) {
        this.toggleZ(false);
      }
    }, this), this.getAnimationTime());
  },

  getInsideElement: function() {
    return this.$('.contentHolder');
  },

  toggleShow: function(value) {
    // this prevents releasing keyboard twice
    if (this.shown === value) { return; }

    if (value) {
      this.stealKeyboard();
    } else {
      this.releaseKeyboard();
    }

    this.shown = value;
    this.$el.toggleClass('show', value);
  },

  toggleZ: function(value) {
    this.$el.toggleClass('inFront', value);
  },

  tearDown: function() {
    this.$el.html('');
    $('body')[0].removeChild(this.el);
  }
});

var ModalTerminal = ContainedBase.extend({
  tagName: 'div',
  className: 'modalTerminal box flex1',
  template: _.template($('#terminal-window-template').html()),
  events: {
    'click div.inside': 'onClick'
  },

  initialize: function(options) {
    options = options || {};
    this.navEvents = options.events || _.clone(Backbone.Events);

    this.container = new ModalView();
    this.JSON = {
      title: options.title || 'Heed This Warning!'
    };

    this.render();
  },

  onClick: function() {
    this.navEvents.trigger('click');
  },

  getInsideElement: function() {
    return this.$('.inside');
  }
});

var ModalAlert = ContainedBase.extend({
  tagName: 'div',
  template: _.template($('#modal-alert-template').html()),

  initialize: function(options) {
    options = options || {};
    this.JSON = {
      title: options.title || 'Something to say',
      text: options.text || 'Here is a paragraph',
      markdown: options.markdown
    };

    if (options.markdowns) {
      this.JSON.markdown = options.markdowns.join('\n');
    }

    this.container = new ModalTerminal({
      title: 'Alert!'
    });
    this.render();

    if (!options.wait) {
      this.show();
    }
  },

  render: function() {
    var HTML = (this.JSON.markdown) ?
      require('markdown').markdown.toHTML(this.JSON.markdown) :
      this.template(this.JSON);

    // call to super, not super elegant but better than
    // copy paste code
    ModalAlert.__super__.render.apply(this, [HTML]);
  }
});

var ConfirmCancelTerminal = Backbone.View.extend({
  initialize: function(options) {
    options = options || {};

    this.deferred = options.deferred || Q.defer();
    this.modalAlert = new ModalAlert(_.extend(
      {},
      { markdown: '#you sure?' },
      options
    ));

    var buttonDefer = Q.defer();
    this.buttonDefer = buttonDefer;
    this.confirmCancel = new ConfirmCancelView({
      deferred: buttonDefer,
      destination: this.modalAlert.getDestination()
    });

    // whenever they hit a button. make sure
    // we close and pass that to our deferred
    buttonDefer.promise
    .then(this.deferred.resolve)
    .fail(this.deferred.reject)
    .done(_.bind(function() {
      this.close();
    }, this));

    // also setup keyboard
    this.navEvents = _.clone(Backbone.Events);
    this.navEvents.on('positive', this.positive, this);
    this.navEvents.on('negative', this.negative, this);
    this.keyboardListener = new KeyboardListener({
      events: this.navEvents,
      aliasMap: {
        enter: 'positive',
        esc: 'negative'
      }
    });

    if (!options.wait) {
      this.modalAlert.show();
    }
  },

  positive: function() {
    this.buttonDefer.resolve();
  },

  negative: function() {
    this.buttonDefer.reject();
  },

  getAnimationTime: function() { return 700; },

  show: function() {
    this.modalAlert.show();
  },

  hide: function() {
    this.modalAlert.hide();
  },

  getPromise: function() {
    return this.deferred.promise;
  },

  close: function() {
    this.keyboardListener.mute();
    this.modalAlert.die();
  }
});

var NextLevelConfirm = ConfirmCancelTerminal.extend({
  initialize: function(options) {
    options = options || {};
    var nextLevelName = (options.nextLevel) ?
      intl.getName(options.nextLevel) :
      '';

    // lol hax
    var markdowns = intl.getDialog(require('../dialogs/nextLevel'))[0].options.markdowns;
    var markdown = markdowns.join('\n');
    markdown = intl.template(markdown, {
      numCommands: options.numCommands,
      best: options.best
    });

    if (options.numCommands <= options.best) {
      markdown = markdown + '\n\n' + intl.str('finish-dialog-win');
    } else {
      markdown = markdown + '\n\n' + intl.str('finish-dialog-lose', {best: options.best});
    }

    markdown = markdown + '\n\n';
    if (options.nextLevel) {
      markdown = markdown + intl.str('finish-dialog-next', {nextLevel: nextLevelName});
    } else {
      markdown = markdown + intl.str('finish-dialog-finished');
    }

    options = _.extend(
      {},
      options,
      { markdown: markdown }
    );

    NextLevelConfirm.__super__.initialize.apply(this, [options]);
  }
});

var ViewportAlert = Backbone.View.extend({
  initialize: function(options) {
    this.grabBatons();
    this.modalAlert = new ModalAlert({
      markdowns: this.markdowns
    });
    this.modalAlert.show();
  },

  grabBatons: function() {
    Main.getEventBaton().stealBaton(this.eventBatonName, this.batonFired, this);
  },

  releaseBatons: function() {
    Main.getEventBaton().releaseBaton(this.eventBatonName, this.batonFired, this);
  },

  finish: function() {
    this.releaseBatons();
    this.modalAlert.die();
  }
});

var WindowSizeAlertWindow = ViewportAlert.extend({
  initialize: function(options) {
    this.eventBatonName = 'windowSizeCheck';
    this.markdowns = [
      '## That window size is not supported :-/',
      'Please resize your window back to a supported size',
      '',
      '(and of course, pull requests to fix this are appreciated :D)'
    ];
    WindowSizeAlertWindow.__super__.initialize.apply(this, [options]);
  },

  batonFired: function(size) {
    if (size.w > Constants.VIEWPORT.minWidth &&
        size.h > Constants.VIEWPORT.minHeight) {
      this.finish();
    }
  }
});

var ZoomAlertWindow = ViewportAlert.extend({
  initialize: function(options) {
    if (!options || !options.level) { throw new Error('need level'); }

    this.eventBatonName = 'zoomChange';
    this.markdowns = [
      '## That zoom level of ' + options.level + ' is not supported :-/',
      'Please zoom back to a supported zoom level with Ctrl + and Ctrl -',
      '',
      '(and of course, pull requests to fix this are appreciated :D)'
    ];
    ZoomAlertWindow.__super__.initialize.apply(this, [options]);
  },

  batonFired: function(level) {
    if (level <= Constants.VIEWPORT.maxZoom &&
        level >= Constants.VIEWPORT.minZoom) {
      this.finish();
    }
  }
});

var LevelToolbar = BaseView.extend({
  tagName: 'div',
  className: 'levelToolbarHolder',
  template: _.template($('#level-toolbar-template').html()),

  initialize: function(options) {
    options = options || {};
    this.JSON = {
      name: options.name || 'Some level! (unknown name)'
    };

    this.beforeDestination = $($('#commandLineHistory div.toolbar')[0]);
    this.render();

    if (!options.wait) {
      process.nextTick(_.bind(this.show, this));
    }
  },

  getAnimationTime: function() { return 700; },

  render: function() {
    var HTML = this.template(this.JSON);

    this.$el.html(HTML);
    this.beforeDestination.after(this.el);
  },

  die: function() {
    this.hide();
    setTimeout(_.bind(function() {
      this.tearDown();
    }, this), this.getAnimationTime());
  },

  hide: function() {
    this.$('div.toolbar').toggleClass('hidden', true);
  },

  show: function() {
    this.$('div.toolbar').toggleClass('hidden', false);
  }
});

var HelperBar = BaseView.extend({
  tagName: 'div',
  className: 'helperBar transitionAll',
  template: _.template($('#helper-bar-template').html()),
  events: {
    'click a': 'onClick'
  },

  onClick: function(ev) {
    var target = ev.target;
    var id = $(target).attr('data-id');
    var funcName = 'on' + id[0].toUpperCase() + id.slice(1) + 'Click';
    this[funcName].call(this);
  },

  show: function() {
    this.$el.toggleClass('show', true);
  },

  hide: function() {
    this.$el.toggleClass('show', false);
    if (this.deferred) {
      this.deferred.resolve();
    }
  },

  getItems: function() {
    return [];
  },

  setupChildren: function() {
  },

  fireCommand: function(command) {
    Main.getEventBaton().trigger('commandSubmitted', command);
  },

  showDeferMe: function(otherBar) {
    this.hide();

    var whenClosed = Q.defer();
    otherBar.deferred = whenClosed;
    whenClosed.promise.then(_.bind(function() {
      this.show();
    }, this));
    otherBar.show();
  },

  onExitClick: function() {
    this.hide();
  },

  initialize: function(options) {
    options = options || {};
    this.destination = $('body');

    this.JSON = {
      items: this.getItems()
    };
    this.render();
    this.setupChildren();

    if (!options.wait) {
      this.show();
    }
  }
});

var IntlHelperBar = HelperBar.extend({
  getItems: function() {
    return [{
      text: 'Git Branching',
      id: 'english'
    }, {
      text: '日本語版リポジトリ',
      id: 'japanese'
    }, {
      text: 'Git 브랜치 배우기',
      id: 'korean'
    }, {
      text: '学习Git分支',
      id: 'chinese'
    }, {
      text: 'Français(e)',
      id: 'french'
    }, {
      icon: 'signout',
      id: 'exit'
    }];
  },

  fireCommand: function() {
    log.viewInteracted('intlSelect');
    HelperBar.prototype.fireCommand.apply(this, arguments);
  },

  onJapaneseClick: function() {
    this.fireCommand('locale ja; levels');
    this.hide();
  },

  onEnglishClick: function() {
    this.fireCommand('locale en_US; levels');
    this.hide();
  },

  onKoreanClick: function() {
    this.fireCommand('locale ko; levels');
    this.hide();
  },

  onFrenchClick: function() {
    this.fireCommand('locale fr_FR; levels');
    this.hide();
  },

  onChineseClick: function() {
    this.fireCommand('locale zh_CN; levels');
    this.hide();
  }
});

var CommandsHelperBar = HelperBar.extend({
  getItems: function() {
    return [{
      text: 'Levels',
      id: 'levels'
    }, {
      text: 'Reset',
      id: 'reset'
    }, {
      text: 'Undo',
      id: 'undo'
    }, {
      text: 'Help',
      id: 'help'
    }, {
      icon: 'signout',
      id: 'exit'
    }];
  },

  fireCommand: function() {
    log.viewInteracted('helperBar');
    HelperBar.prototype.fireCommand.apply(this, arguments);
  },

  onLevelsClick: function() {
    this.fireCommand('levels');
  },

  onResetClick: function() {
    this.fireCommand('reset');
  },

  onUndoClick: function() {
    this.fireCommand('undo');
  },

  onHelpClick: function() {
    this.fireCommand('help general; git help');
  }
});

var MainHelperBar = HelperBar.extend({
  getItems: function() {
    return [{
      icon: 'question-sign',
      id: 'commands'
    }, {
      icon: 'globe',
      id: 'intl'
    }];
  },

  onIntlClick: function() {
    this.showDeferMe(this.intlHelper);
    log.viewInteracted('openIntlBar');
  },

  onCommandsClick: function() {
    this.showDeferMe(this.commandsHelper);
    log.viewInteracted('openCommandsBar');
  },

  setupChildren: function() {
    this.commandsHelper = new CommandsHelperBar({ wait: true });
    this.intlHelper = new IntlHelperBar({ wait: true});
  }
});

var CanvasTerminalHolder = BaseView.extend({
  tagName: 'div',
  className: 'canvasTerminalHolder box flex1',
  template: _.template($('#terminal-window-bare-template').html()),
  events: {
    'click div.wrapper': 'onClick'
  },

  initialize: function(options) {
    options = options || {};
    this.destination = $('body');
    this.JSON = {
      title: options.title || intl.str('goal-to-reach'),
      text: options.text || intl.str('hide-goal')
    };

    this.render();
    this.inDom = true;

    if (options.additionalClass) {
      this.$el.addClass(options.additionalClass);
    }
  },

  getAnimationTime: function() { return 700; },

  onClick: function() {
    this.die();
  },

  die: function() {
    this.slideOut();
    this.inDom = false;

    setTimeout(_.bind(function() {
      this.tearDown();
    }, this), this.getAnimationTime());
  },

  slideOut: function() {
    this.slideToggle(true);
  },

  slideIn: function() {
    this.slideToggle(false);
  },

  slideToggle: function(value) {
    this.$('div.terminal-window-holder').toggleClass('slideOut', value);
  },

  getCanvasLocation: function() {
    return this.$('div.inside')[0];
  }
});

exports.BaseView = BaseView;
exports.GeneralButton = GeneralButton;
exports.ModalView = ModalView;
exports.ModalTerminal = ModalTerminal;
exports.ModalAlert = ModalAlert;
exports.ContainedBase = ContainedBase;
exports.ConfirmCancelView = ConfirmCancelView;
exports.LeftRightView = LeftRightView;
exports.ZoomAlertWindow = ZoomAlertWindow;
exports.ConfirmCancelTerminal = ConfirmCancelTerminal;
exports.WindowSizeAlertWindow = WindowSizeAlertWindow;

exports.MainHelperBar = MainHelperBar;

exports.CanvasTerminalHolder = CanvasTerminalHolder;
exports.LevelToolbar = LevelToolbar;
exports.NextLevelConfirm = NextLevelConfirm;

