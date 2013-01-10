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
  className: 'markdownGrabber box horizontal',
  template: _.template($('#markdown-grabber-view').html()),
  events: {
    'keyup textarea': 'keyup'
  },

  initialize: function(options) {
    options = options || {};
    this.deferred = options.deferred || Q.defer();
    this.JSON = {
      previewText: options.previewText || 'Preview'
    };

    this.container = options.container || new ModalTerminal({
      title: options.title || 'Enter some markdown'
    });
    this.render();

    if (!options.withoutButton) {
      // do button stuff
      var buttonDefer = Q.defer();
      buttonDefer.promise
      .then(_.bind(this.confirmed, this))
      .fail(_.bind(this.cancelled, this))
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

  exportToArray: function() {
    return this.getRawText().split('\n');
  },

  updatePreview: function() {
    var raw = this.getRawText();
    var HTML = require('markdown').markdown.toHTML(raw);
    this.$('div.insidePreview').html(HTML);
  }
});

var DemonstrationBuilder = ContainedBase.extend({
  tagName: 'div',
  className: 'demonstrationBuilder box vertical',
  template: _.template($('#demonstration-builder').html()),

  initialize: function(options) {
    options = options || {};
    this.deferred = options.deferred || Q.defer();

    this.JSON = {};
    this.container = new ModalTerminal({
      title: 'Demonstration Builder'
    });
    this.render();

    // build the two markdown grabbers
    this.beforeMarkdownView = new MarkdownGrabber({
      container: this,
      withoutButton: true,
      previewText: 'Before demonstration Markdown'
    });
    this.afterMarkdownView = new MarkdownGrabber({
      container: this,
      withoutButton: true,
      previewText: 'After demonstration Markdown'
    });

    // the test button
    var testButton = new Views.GeneralButton({
      destination: this.$('div.buttons')[0],
      buttonText: 'Test View'
    });
    testButton.navEvents.on('click', this.testView, this);

    // build confirm button
    var buttonDeferred = Q.defer();
    var confirmCancel = new Views.ConfirmCancelView({
      deferred: buttonDeferred,
      destination: this.getDestination()
    });

    buttonDeferred.promise
    .then(_.bind(this.confirmed, this))
    .fail(_.bind(this.cancelled, this))
    .done();
  },

  testView: function() {
    var module = require('../views/gitDemonstrationView');
    new module.GitDemonstrationView(this.getExportObj());
  },

  getExportObj: function() {
    return {
      beforeMarkdowns: this.beforeMarkdownView.exportToArray(),
      afterMarkdowns: this.afterMarkdownView.exportToArray(),
      gitCommand: 'git commit'
    };
  },

  confirmed: function() {
    this.die();
    this.deferred.resolve(this.getExportObj());
  },

  cancelled: function() {
    this.die();
    this.deferred.resolve();
  },

  getInsideElement: function() {
    return this.$('.insideBuilder')[0];
  }
});

exports.MarkdownGrabber = MarkdownGrabber;
exports.DemonstrationBuilder = DemonstrationBuilder;

