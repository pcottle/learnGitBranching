var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var util = require('../util');
var KeyboardListener = require('../util/keyboard').KeyboardListener;

var Views = require('../views');
var ModalTerminal = Views.ModalTerminal;
var ContainedBase = Views.ContainedBase;

var MultiView = require('../views/multiView').MultiView;

var TextGrabber = ContainedBase.extend({
  tagName: 'div',
  className: 'textGrabber box vertical',
  template: _.template($('#text-grabber').html()),

  initialize: function(options) {
    options = options || {};
    this.JSON = {
      helperText: options.helperText || 'Enter some text'
    };

    this.container = options.container || new ModalTerminal({
      title: 'Enter some text'
    });
    this.render();
    if (options.initialText) {
      this.setText(options.initialText);
    }

    if (!options.wait) {
      this.show();
    }
  },

  getText: function() {
    return this.$('textarea').val();
  },

  setText: function(str) {
    this.$('textarea').val(str);
  }
});

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
        destination: this
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
    this.beforeCommandView = new TextGrabber({
      container: this,
      helperText: 'The git command(s) to set up the demonstration view (before it is displayed)',
      initialText: 'git checkout -b bugFix'
    });

    this.commandView = new TextGrabber({
      container: this,
      helperText: 'The git command(s) to demonstrate to the reader',
      initialText: 'git commit'
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
    new MultiView({
      childViews: [{
        type: 'GitDemonstrationView',
        options: this.getExportObj()
      }]
    });
  },

  getExportObj: function() {
    return {
      beforeMarkdowns: this.beforeMarkdownView.exportToArray(),
      afterMarkdowns: this.afterMarkdownView.exportToArray(),
      command: this.commandView.getText(),
      beforeCommand: this.beforeCommandView.getText()
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
exports.TextGrabber = TextGrabber;

