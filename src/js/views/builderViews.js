var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var util = require('../util');
var KeyboardListener = require('../util/keyboard').KeyboardListener;

var Views = require('../views');
var ModalTerminal = Views.ModalTerminal;
var ContainedBase = Views.ContainedBase;

var MarkdownGrabber = ContainedBase.extend({
  tagName: 'div',
  className: 'MarkdownGrabber box horizontal',
  template: _.template($('#markdown-grabber-view').html()),
  events: {
    'keyup textarea': 'keyup'
  },

  initialize: function(options) {
    options = options || {};
    this.deferred = options.deferred || Q.defer();
    this.options = options;
    this.JSON = {};

    this.container = new ModalTerminal({
      title: options.title || 'Enter some markdown'
    });
    this.render();

    if (!options.withoutButton) {
      // do button stuff
      var buttonDefer = Q.defer();
      buttonDefer.promise
      .then(_.bind(function() {
        this.confirmed();
      }, this))
      .fail(_.bind(function() {
        this.cancelled();
      }, this))
      .done();
      var confirmCancel = new Views.ConfirmCancelView({
        deferred: buttonDefer,
        destination: this.getDestination()
      });
    }

    this.updatePreview();

    if (!options.wait) {
      this.show();
    }
  },

  confirmed: function() {
    this.die();
    this.deferred.resolve(this.getRawText());
  },

  cancelled: function() {
    this.die();
    this.deferred.resolve();
  },

  keyup: function() {
    if (!this.throttledPreview) {
      this.throttledPreview = _.throttle(
        _.bind(this.updatePreview, this),
        500
      );
    }
    this.throttledPreview();
  },

  getRawText: function() {
    return this.$('textarea').val();
  },

  updatePreview: function() {
    var raw = this.getRawText();
    var HTML = require('markdown').markdown.toHTML(raw);
    this.$('div.insidePreview').html(HTML);
  }
});

exports.MarkdownGrabber = MarkdownGrabber;

