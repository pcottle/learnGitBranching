var _ = require('underscore');
var { marked } = require('marked');

var Main = require('../app');
var intl = require('../intl');
var Constants = require('../util/constants');
var KeyboardListener = require('../util/keyboard').KeyboardListener;
var debounce = require('../util/debounce');
var throttle = require('../util/throttle');
var { createEvents } = require('../util/eventEmitter');

// Base View class - replacement for Backbone.View
class BaseView {
  constructor(options) {
    options = options || {};
    this.tagName = options.tagName || this.tagName || 'div';
    this.className = options.className || this.className || '';
    this.el = options.el || document.createElement(this.tagName);
    if (this.className && !options.el) {
      this.el.className = this.className;
    }
    this.$el = $(this.el);
    this.options = options;
  }

  $(selector) {
    return this.$el.find(selector);
  }

  getDestination() {
    return this.destination || this.container.getInsideElement();
  }

  tearDown() {
    this.$el.remove();
    if (this.container) {
      this.container.tearDown();
    }
  }

  renderAgain(HTML) {
    HTML = HTML || this.template(this.JSON);
    this.$el.html(HTML);
  }

  render(HTML) {
    this.renderAgain(HTML);
    var destination = this.getDestination();
    $(destination).append(this.el);
  }
}

class ResolveRejectBase extends BaseView {
  resolve() {
    this.deferred.resolve();
  }

  reject() {
    this.deferred.reject();
  }
}

class PositiveNegativeBase extends BaseView {
  positive() {
    this.navEvents.trigger('positive');
  }

  exit() {
    this.navEvents.trigger('exit');
  }

  negative() {
    this.navEvents.trigger('negative');
  }
}

class ContainedBase extends BaseView {
  getAnimationTime() { return 700; }

  show() {
    this.container.show();
  }

  hide() {
    this.container.hide();
  }

  die() {
    this.hide();
    setTimeout(function() {
      this.tearDown();
    }.bind(this), this.getAnimationTime() * 1.1);
  }
}

class GeneralButton extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'a';
    options.className = 'generalButton uiButton';
    super(options);

    this.template = _.template($('#general-button').html());
    this.navEvents = options.navEvents || createEvents();
    this.destination = options.destination;
    if (!this.destination) {
      this.container = new ModalTerminal();
    }

    this.JSON = {
      buttonText: options.buttonText || 'General Button',
      wantsWrapper: (options.wantsWrapper !== undefined) ? options.wantsWrapper : true
    };

    this.render();
    this.$el.on('click', this.click.bind(this));

    if (this.container && !options.wait) {
      this.show();
    }
  }

  click() {
    if (!this.clickFunc) {
      this.clickFunc = throttle(
        this.sendClick.bind(this),
        500
      );
    }
    this.clickFunc();
  }

  sendClick() {
    this.navEvents.trigger('click');
  }
}

class ConfirmCancelView extends ResolveRejectBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'confirmCancelView box horizontal justify';
    super(options);

    if (!options.destination) {
      throw new Error('needmore');
    }

    this.template = _.template($('#confirm-cancel-template').html());
    this.destination = options.destination;
    this.deferred = options.deferred || {};
    this.promise = new Promise(function(resolve, reject) {
      this.deferred.resolve = resolve;
      this.deferred.reject = reject;
    }.bind(this));

    this.JSON = {
      confirm: options.confirm || intl.str('confirm-button'),
      cancel: options.cancel || intl.str('cancel-button'),
      disableCancelButton: !!options.disableCancelButton,
    };

    this.render();
    this.$('.confirmButton').on('click', this.resolve.bind(this));
    this.$('.cancelButton').on('click', this.reject.bind(this));
  }

  getPromise() {
    return this.promise;
  }
}

class LeftRightView extends PositiveNegativeBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'leftRightView box horizontal center';
    super(options);

    if (!options.destination || !options.events) {
      throw new Error('needmore');
    }

    this.template = _.template($('#left-right-template').html());
    this.destination = options.destination;
    this.pipeEvents = options.events;
    this.navEvents = createEvents();

    this.JSON = {
      showLeft: (options.showLeft === undefined) ? true : options.showLeft,
      lastNav: (options.lastNav === undefined) ? false : options.lastNav
    };

    this.render();
    this.$('div.right').click(this.positive.bind(this));
    this.$('div.left').click(this.negative.bind(this));
    this.$('div.exit').click(this.exit.bind(this));
  }

  exit() {
    this.pipeEvents.trigger('exit');
    PositiveNegativeBase.prototype.exit.call(this);
  }

  positive() {
    this.pipeEvents.trigger('positive');
    PositiveNegativeBase.prototype.positive.call(this);
  }

  negative() {
    this.pipeEvents.trigger('negative');
    PositiveNegativeBase.prototype.negative.call(this);
  }
}

class ModalView {
  constructor(options) {
    options = options || {};
    this.tagName = 'div';
    this.className = 'modalView box horizontal center transitionOpacityLinear';
    this.el = document.createElement(this.tagName);
    this.el.className = this.className;
    this.$el = $(this.el);
    this.template = _.template($('#modal-view-template').html());

    this.shown = false;
    this.render();
  }

  $(selector) {
    return this.$el.find(selector);
  }

  getAnimationTime() { return 700; }

  render() {
    this.$el.html(this.template({}));
    $('body').append(this.el);
  }

  stealKeyboard() {
    Main.getEventBaton().stealBaton('keydown', this.onKeyDown, this);
    Main.getEventBaton().stealBaton('keyup', this.onKeyUp, this);
    Main.getEventBaton().stealBaton('windowFocus', this.onWindowFocus, this);
    Main.getEventBaton().stealBaton('documentClick', this.onDocumentClick, this);
    $('#commandTextField').blur();
  }

  releaseKeyboard() {
    Main.getEventBaton().releaseBaton('keydown', this.onKeyDown, this);
    Main.getEventBaton().releaseBaton('keyup', this.onKeyUp, this);
    Main.getEventBaton().releaseBaton('windowFocus', this.onWindowFocus, this);
    Main.getEventBaton().releaseBaton('documentClick', this.onDocumentClick, this);
    Main.getEventBaton().trigger('windowFocus');
  }

  onWindowFocus(e) {}
  onDocumentClick(e) {}
  onKeyDown(e) { e.preventDefault(); }
  onKeyUp(e) { e.preventDefault(); }

  show() {
    this.toggleZ(true);
    process.nextTick(function() {
      this.toggleShow(true);
    }.bind(this));
  }

  hide() {
    this.toggleShow(false);
    setTimeout(function() {
      if (!this.shown) {
        this.toggleZ(false);
      }
    }.bind(this), this.getAnimationTime());
  }

  getInsideElement() {
    return this.$('.contentHolder');
  }

  toggleShow(value) {
    if (this.shown === value) { return; }

    if (value) {
      Array.from(document.body.children).forEach(function(child) {
        if (child.classList.contains('modalView')) return;
        if (!child.hasAttribute('inert')) child.setAttribute('inert', '');
      });
      this.stealKeyboard();
    } else {
      Array.from(document.body.children).forEach(function(child) {
        if (child.classList.contains('modalView')) return;
        if (child.hasAttribute('inert')) child.removeAttribute('inert');
      });
      this.releaseKeyboard();
    }

    this.shown = value;
    this.$el.toggleClass('show', value);
  }

  toggleZ(value) {
    this.$el.toggleClass('inFront', value);
  }

  tearDown() {
    this.$el.html('');
    $('body')[0].removeChild(this.el);
  }
}

class ModalTerminal extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'modalTerminal box flex1';
    super(options);

    this.template = _.template($('#terminal-window-template').html());
    this.navEvents = options.events || createEvents();
    this.container = new ModalView();
    this.JSON = {
      title: options.title
    };

    this.render();
    this.$('div.inside').on('click', this.onClick.bind(this));
    this.$('div.controls div.close').on('click', this.onCloseButtonClick.bind(this));
  }

  updateTitle(title) {
    this.$('.modal-title').text(title);
  }

  onCloseButtonClick() {
    Main.getEventBaton().trigger('onCloseButtonClick');
  }

  onClick() {
    this.navEvents.trigger('click');
  }

  getInsideElement() {
    return this.$('.inside');
  }
}

class ModalAlert extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    super(options);

    this.template = _.template($('#modal-alert-template').html());
    this.options = options;
    this.JSON = {
      title: options.title || 'Something to say',
      text: options.text || 'Here is a paragraph',
      markdown: options.markdown
    };

    if (options.markdowns) {
      this.JSON.markdown = options.markdowns.join('\n');
    }

    this.container = new ModalTerminal({});
    this.render();

    if (!options.wait) {
      this.show();
    }
  }

  render() {
    var HTML = (this.JSON.markdown) ?
      marked(this.JSON.markdown) :
      this.template(this.JSON);
    if (this.options._dangerouslyInsertHTML) {
      HTML += this.options._dangerouslyInsertHTML;
    }
    ContainedBase.prototype.render.call(this, HTML);
  }

  getDestination() {
    return this.container.getInsideElement();
  }
}

class ConfirmCancelTerminal {
  constructor(options) {
    options = options || {};

    this.deferred = options.deferred || {};
    this.promise = new Promise(function(resolve, reject) {
      this.deferred.resolve = resolve;
      this.deferred.reject = reject;
    }.bind(this));

    this.modalAlert = new ModalAlert(Object.assign(
      {},
      { markdown: '#you sure?' },
      options
    ));

    var buttonDefer = new Promise(function(resolve, reject) {
      this.confirmCancel = new ConfirmCancelView({
        deferred: { resolve: resolve, reject: reject },
        destination: this.modalAlert.getDestination()
      });
    }.bind(this));
    this.buttonDefer = buttonDefer;

    buttonDefer
    .then(this.deferred.resolve)
    .catch(this.deferred.reject)
    .then(function() {
      this.close();
    }.bind(this));

    this.navEvents = createEvents();
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
  }

  positive() {
    this.buttonDefer.resolve();
  }

  negative() {
    this.buttonDefer.reject();
  }

  getAnimationTime() { return 700; }

  show() {
    this.modalAlert.show();
  }

  hide() {
    this.modalAlert.hide();
  }

  getPromise() {
    return this.deferred.promise;
  }

  close() {
    this.keyboardListener.mute();
    this.modalAlert.die();
  }
}

class NextLevelConfirm extends ConfirmCancelTerminal {
  constructor(options) {
    options = options || {};
    var nextLevelName = (options.nextLevel) ?
      intl.getName(options.nextLevel) :
      '';

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
    var extraHTML;
    if (options.nextLevel) {
      markdown = markdown + intl.str('finish-dialog-next', {nextLevel: nextLevelName});
    } else {
      extraHTML = '<p class="catchadream">' + intl.str('finish-dialog-finished') +
        ' (ﾉ^_^)ﾉ (ﾉ^_^)ﾉ (ﾉ^_^)ﾉ' +
        '</p>';
    }

    options = Object.assign(
      {},
      options,
      {
        markdown: markdown,
        _dangerouslyInsertHTML: extraHTML
      }
    );

    super(options);
  }
}

class ViewportAlert {
  constructor(options) {
    this.grabBatons();
    this.modalAlert = new ModalAlert({
      markdowns: this.markdowns
    });
    this.modalAlert.show();
  }

  grabBatons() {
    Main.getEventBaton().stealBaton(this.eventBatonName, this.batonFired, this);
  }

  releaseBatons() {
    Main.getEventBaton().releaseBaton(this.eventBatonName, this.batonFired, this);
  }

  finish() {
    this.releaseBatons();
    this.modalAlert.die();
  }
}

class WindowSizeAlertWindow extends ViewportAlert {
  constructor(options) {
    // Set properties before super() since super calls grabBatons
    options = options || {};
    super(options);
  }

  // These are accessed by parent constructor via grabBatons
  get eventBatonName() { return 'windowSizeCheck'; }
  get markdowns() {
    return [
      '## That window size is not supported :-/',
      'Please resize your window back to a supported size',
      '',
      '(and of course, pull requests to fix this are appreciated :D)'
    ];
  }

  batonFired(size) {
    if (size.w > Constants.VIEWPORT.minWidth &&
        size.h > Constants.VIEWPORT.minHeight) {
      this.finish();
    }
  }
}

class ZoomAlertWindow extends ViewportAlert {
  constructor(options) {
    if (!options || !options.level) { throw new Error('need level'); }
    super(options);
    this._level = options.level;
  }

  get eventBatonName() { return 'zoomChange'; }
  get markdowns() {
    return [
      '## That zoom level of ' + this._level + ' is not supported :-/',
      'Please zoom back to a supported zoom level with Ctrl + and Ctrl -',
      '',
      '(and of course, pull requests to fix this are appreciated :D)'
    ];
  }

  batonFired(level) {
    if (level <= Constants.VIEWPORT.maxZoom &&
        level >= Constants.VIEWPORT.minZoom) {
      this.finish();
    }
  }
}

class CanvasTerminalHolder extends BaseView {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'canvasTerminalHolder box flex1';
    super(options);

    this.template = _.template($('#terminal-window-bare-template').html());
    this.parent = options.parent;
    this.minHeight = options.minHeight || 200;
    this.destination = $('body');
    this.JSON = {
      title: options.title || intl.str('goal-to-reach'),
      text: options.text || intl.str('hide-goal')
    };

    this.render();
    this.inDom = true;

    this.$terminal = this.$el.find('.terminal-window-holder').first();
    this.$terminal.height(0.8 * $(window).height());
    this.$terminal.draggable({
      cursor: 'move',
      handle: '.toolbar',
      containment: '#interfaceWrapper',
      scroll: false
    });

    $(window).on('resize', debounce(this.recalcLayout.bind(this), 300));
    this.$('div.wrapper').on('click', this.onClick.bind(this));

    if (options.additionalClass) {
      this.$el.addClass(options.additionalClass);
    }
  }

  getAnimationTime() { return 700; }

  onClick() {
    this.die();
  }

  die() {
    this.minimize();
    this.inDom = false;

    setTimeout(function() {
      this.tearDown();
    }.bind(this), this.getAnimationTime());
  }

  minimize() {
    this.parent.trigger('minimizeCanvas', {
      left: this.$terminal.css('left'),
      top: this.$terminal.css('top')
    }, {
      width: this.$terminal.css('width'),
      height: this.$terminal.css('height')
    });

    this.$terminal.animate({
      height: '0px',
      opacity: 0
    }, this.getAnimationTime());
  }

  restore(pos, size) {
    var self = this;
    pos = pos || { top: this.$terminal.css('top'), left: this.$terminal.css('left') };
    size = size || { width: this.$terminal.css('width'), height: this.$terminal.css('height') };

    this.$terminal.css({
      top: pos.top,
      left: pos.left,
      width: size.width,
      height: '0px',
      opacity: '0'
    });

    this.$terminal.animate({
      height: size.height,
      opacity: 1
    }, this.getAnimationTime(), function() {
        self.recalcLayout();
    });
  }

  recalcLayout() {
    var parent = this.parent,
        leftOffset = 0,
        topOffset = 0,
        heightOffset = 0,
        width = this.$terminal.outerWidth(),
        height = this.$terminal.outerHeight(),
        left = this.$terminal.offset().left,
        top = this.$terminal.offset().top,
        right = ($(window).width() - (left + width)),
        bottom = ($(window).height() - (top + height)),
        minHeight = 0.75 * $(window).height(),
        maxHeight = 0.95 * $(window).height();

    if (top < 0) { topOffset = -top; }
    if (left < 0) { leftOffset = -left; }
    if (right < 0) { leftOffset = right; }
    if (bottom < 0) { topOffset = bottom; }
    if (height < minHeight) { heightOffset = minHeight - height; }
    if (height > maxHeight) { heightOffset = maxHeight - height; }

    left = Math.max(left + leftOffset, 0);
    top = Math.max(top + topOffset, 0);
    height = Math.max(height + heightOffset, minHeight);

    this.$terminal.animate({
      right: right + 'px',
      top: top + 'px',
      height: height + 'px'
    }, this.getAnimationTime(), function () {
        parent.trigger('resizeCanvas');
    });
  }

  getCanvasLocation() {
    return this.$('div.inside')[0];
  }
}

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

exports.CanvasTerminalHolder = CanvasTerminalHolder;
exports.NextLevelConfirm = NextLevelConfirm;
