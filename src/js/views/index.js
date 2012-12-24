var GitError = require('../util/errors').GitError;
var _ = require('underscore');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var BaseView = Backbone.View.extend({
  getDestination: function() {
    return this.destination || this.container.getInsideElement();
  },

  tearDown: function() {
    this.$el.html('');
    if (this.container) {
      this.container.tearDown();
    }
  },

  render: function(HTML) {
    // flexibility
    var destination = this.getDestination();
    HTML = HTML || this.template(this.JSON);

    this.$el.html(HTML);
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
  show: function() {
    this.container.show();
  },

  hide: function() {
    this.container.hide();
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
    if (!options.destination || !options.deferred) {
      throw new Error('needmore');
    }

    this.destination = options.destination;
    this.deferred = options.deferred;
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

  initialize: function(options) {
    if (!options.destination || !options.events) {
      throw new Error('needmore');
    }

    this.destination = options.destination;
    this.navEvents = options.events;
    this.JSON = {
      showLeft: (options.showLeft === undefined) ? true : options.showLeft,
      lastNav: (options.lastNav === undefined) ? false : options.lastNav
    };

    this.render();
  }
});

var ModalView = Backbone.View.extend({
  tagName: 'div',
  className: 'modalView box horizontal center transitionOpacity',
  template: _.template($('#modal-view-template').html()),

  initialize: function(options) {
    this.render();
  },

  render: function() {
    // add ourselves to the DOM
    this.$el.html(this.template({}));
    $('body').append(this.el);
  },

  show: function() {
    this.toggleZ(true);
    this.toggleShow(true);
  },

  hide: function() {
    this.toggleShow(false);
    // TODO -- do this in a way where it wont
    // bork if we call it back down. these views should
    // be one-off though so...
    setTimeout(_.bind(function() {
      this.toggleZ(false);
    }, this), 700);
  },

  getInsideElement: function() {
    return this.$('.contentHolder');
  },

  toggleShow: function(value) {
    this.$el.toggleClass('show', value);
  },

  toggleZ: function(value) {
    this.$el.toggleClass('inFront', value);
  },

  tearDown: function() {
    this.hide();
  }
});

var ModalTerminal = ContainedBase.extend({
  tagName: 'div',
  className: 'box flex1',
  template: _.template($('#terminal-window-template').html()),

  initialize: function(options) {
    options = options || {};

    this.container = new ModalView();
    this.JSON = {
      title: options.title || 'Heed This Warning!'
    };

    this.render();
  },

  getInsideElement: function() {
    return this.$('#inside');
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

    this.container = new ModalTerminal({
      title: 'Alert!'
    });
    this.render();
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

exports.ModalView = ModalView;
exports.ModalTerminal = ModalTerminal;
exports.ModalAlert = ModalAlert;
exports.ContainedBase = ContainedBase;
exports.ConfirmCancelView = ConfirmCancelView;
exports.LeftRightView = LeftRightView;

