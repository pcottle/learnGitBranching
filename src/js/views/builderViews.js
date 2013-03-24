var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var util = require('../util');
var intl = require('../intl');
var KeyboardListener = require('../util/keyboard').KeyboardListener;

var Views = require('../views');
var ModalTerminal = Views.ModalTerminal;
var ContainedBase = Views.ContainedBase;


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

    if (options.fromObj) {
      options.fillerText = options.fromObj.options.markdowns.join('\n');
    }

    this.JSON = {
      previewText: options.previewText || 'Preview',
      fillerText: options.fillerText || '## Enter some markdown!\n\n\n'
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

  getExportObj: function() {
    return {
      markdowns: this.exportToArray()
    };
  },

  updatePreview: function() {
    var raw = this.getRawText();
    var HTML = require('markdown').markdown.toHTML(raw);
    this.$('div.insidePreview').html(HTML);
  }
});

var MarkdownPresenter = ContainedBase.extend({
  tagName: 'div',
  className: 'markdownPresenter box vertical',
  template: _.template($('#markdown-presenter').html()),

  initialize: function(options) {
    options = options || {};
    this.deferred = options.deferred || Q.defer();
    this.JSON = {
      previewText: options.previewText || 'Here is something for you',
      fillerText: options.fillerText || '# Yay'
    };

    this.container = new ModalTerminal({
      title: 'Check this out...'
    });
    this.render();

    if (!options.noConfirmCancel) {
      var confirmCancel = new Views.ConfirmCancelView({
        destination: this.getDestination()
      });
      confirmCancel.deferred.promise
      .then(_.bind(function() {
        this.deferred.resolve(this.grabText());
      }, this))
      .fail(_.bind(function() {
        this.deferred.reject();
      }, this))
      .done(_.bind(this.die, this));
    }

    this.show();
  },

  grabText: function() {
    return this.$('textarea').val();
  }
});

var DemonstrationBuilder = ContainedBase.extend({
  tagName: 'div',
  className: 'demonstrationBuilder box vertical',
  template: _.template($('#demonstration-builder').html()),
  events: {
    'click div.testButton': 'testView'
  },

  initialize: function(options) {
    options = options || {};
    this.deferred = options.deferred || Q.defer();
    if (options.fromObj) {
      var toEdit = options.fromObj.options;
      options = _.extend(
        {},
        options,
        toEdit,
        {
          beforeMarkdown: toEdit.beforeMarkdowns.join('\n'),
          afterMarkdown: toEdit.afterMarkdowns.join('\n')
        }
      );
    }

    this.JSON = {};
    this.container = new ModalTerminal({
      title: 'Demonstration Builder'
    });
    this.render();

    // build the two markdown grabbers
    this.beforeMarkdownView = new MarkdownGrabber({
      container: this,
      withoutButton: true,
      fillerText: options.beforeMarkdown,
      previewText: 'Before demonstration Markdown'
    });
    this.beforeCommandView = new TextGrabber({
      container: this,
      helperText: 'The git command(s) to set up the demonstration view (before it is displayed)',
      initialText: options.beforeCommand || 'git checkout -b bugFix'
    });

    this.commandView = new TextGrabber({
      container: this,
      helperText: 'The git command(s) to demonstrate to the reader',
      initialText: options.command || 'git commit'
    });

    this.afterMarkdownView = new MarkdownGrabber({
      container: this,
      withoutButton: true,
      fillerText: options.afterMarkdown,
      previewText: 'After demonstration Markdown'
    });

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
    var MultiView = require('../views/multiView').MultiView;
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

var MultiViewBuilder = ContainedBase.extend({
  tagName: 'div',
  className: 'multiViewBuilder box vertical',
  template: _.template($('#multi-view-builder').html()),
  typeToConstructor: {
    ModalAlert: MarkdownGrabber,
    GitDemonstrationView: DemonstrationBuilder
  },

  events: {
    'click div.deleteButton': 'deleteOneView',
    'click div.testButton': 'testOneView',
    'click div.editButton': 'editOneView',
    'click div.testEntireView': 'testEntireView',
    'click div.addView': 'addView',
    'click div.saveView': 'saveView',
    'click div.cancelView': 'cancel'
  },

  initialize: function(options) {
    options = options || {};
    this.deferred = options.deferred || Q.defer();
    this.multiViewJSON = options.multiViewJSON || {};

    this.JSON = {
      views: this.getChildViews(),
      supportedViews: _.keys(this.typeToConstructor)
    };

    this.container = new ModalTerminal({
      title: 'Build a MultiView!'
    });
    this.render();

    this.show();
  },

  saveView: function() {
    this.hide();
    this.deferred.resolve(this.multiViewJSON);
  },

  cancel: function() {
    this.hide();
    this.deferred.resolve();
  },

  addView: function(ev) {
    var el = ev.target;
    var type = $(el).attr('data-type');

    var whenDone = Q.defer();
    var Constructor = this.typeToConstructor[type];
    var builder = new Constructor({
      deferred: whenDone
    });
    whenDone.promise
    .then(_.bind(function() {
      var newView = {
        type: type,
        options: builder.getExportObj()
      };
      this.addChildViewObj(newView);
    }, this))
    .fail(function() {
      // they dont want to add the view apparently, so just return
    })
    .done();
  },

  testOneView: function(ev) {
    var el = ev.target;
    var index = $(el).attr('data-index');
    var toTest = this.getChildViews()[index];
    var MultiView = require('../views/multiView').MultiView;
    new MultiView({
      childViews: [toTest]
    });
  },

  testEntireView: function() {
    var MultiView = require('../views/multiView').MultiView;
    new MultiView({
      childViews: this.getChildViews()
    });
  },

  editOneView: function(ev) {
    var el = ev.target;
    var index = $(el).attr('data-index');
    var type = $(el).attr('data-type');

    var whenDone = Q.defer();
    var builder = new this.typeToConstructor[type]({
      deferred: whenDone,
      fromObj: this.getChildViews()[index]
    });
    whenDone.promise
    .then(_.bind(function() {
      var newView = {
        type: type,
        options: builder.getExportObj()
      };
      var views = this.getChildViews();
      views[index] = newView;
      this.setChildViews(views);
    }, this))
    .fail(function() { })
    .done();
  },

  deleteOneView: function(ev) {
    var el = ev.target;
    var index = $(el).attr('data-index');
    var toSlice = this.getChildViews();

    var updated = toSlice.slice(0,index).concat(toSlice.slice(index + 1));
    this.setChildViews(updated);
    this.update();
  },

  addChildViewObj: function(newObj, index) {
    var childViews = this.getChildViews();
    childViews.push(newObj);
    this.setChildViews(childViews);
    this.update();
  },

  setChildViews: function(newArray) {
    this.multiViewJSON.childViews = newArray;
  },

  getChildViews: function() {
    return this.multiViewJSON.childViews || [];
  },

  update: function() {
    this.JSON.views = this.getChildViews();
    this.renderAgain();
  }
});

exports.MarkdownGrabber = MarkdownGrabber;
exports.DemonstrationBuilder = DemonstrationBuilder;
exports.TextGrabber = TextGrabber;
exports.MultiViewBuilder = MultiViewBuilder;
exports.MarkdownPresenter = MarkdownPresenter;

