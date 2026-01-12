var _ = require('lodash-es');
var createDeferred = require('../util/promise').createDeferred;
var { marked } = require('marked');

var Views = require('../views');
var throttle = require('../util/throttle');
var ModalTerminal = Views.ModalTerminal;
var ContainedBase = Views.ContainedBase;

class TextGrabber extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'textGrabber box vertical';
    super(options);

    this.template = _.template($('#text-grabber').html());
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
  }

  getText() {
    return this.$('textarea').val();
  }

  setText(str) {
    this.$('textarea').val(str);
  }
}

class MarkdownGrabber extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'markdownGrabber box horizontal';
    super(options);

    this.template = _.template($('#markdown-grabber-view').html());
    this.deferred = options.deferred || createDeferred();

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
      var buttonDefer = createDeferred();
      buttonDefer.promise
      .then(this.confirmed.bind(this))
      .catch(this.cancelled.bind(this));

      var confirmCancel = new Views.ConfirmCancelView({
        deferred: buttonDefer,
        destination: this.getDestination()
      });
    }

    this.updatePreview();

    // Set up keyup event
    this.$el.on('keyup', 'textarea', this.keyup.bind(this));

    if (!options.wait) {
      this.show();
    }
  }

  confirmed() {
    this.die();
    this.deferred.resolve(this.getRawText());
  }

  cancelled() {
    this.die();
    this.deferred.resolve();
  }

  keyup() {
    if (!this.throttledPreview) {
      this.throttledPreview = throttle(
        this.updatePreview.bind(this),
        500
      );
    }
    this.throttledPreview();
  }

  getRawText() {
    return this.$('textarea').val();
  }

  exportToArray() {
    return this.getRawText().split('\n');
  }

  getExportObj() {
    return {
      markdowns: this.exportToArray()
    };
  }

  updatePreview() {
    var raw = this.getRawText();
    var HTML = marked(raw);
    this.$('div.insidePreview').html(HTML);
  }
}

class MarkdownPresenter extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'markdownPresenter box vertical';
    super(options);

    this.template = _.template($('#markdown-presenter').html());
    this.deferred = options.deferred || createDeferred();
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
      .then(function() {
        this.deferred.resolve(this.grabText());
      }.bind(this))
      .catch(function() {
        this.deferred.reject();
      }.bind(this))
      .then(this.die.bind(this));
    }

    this.show();
  }

  grabText() {
    return this.$('textarea').val();
  }
}

class DemonstrationBuilder extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'demonstrationBuilder box vertical';
    super(options);

    this.template = _.template($('#demonstration-builder').html());
    this.deferred = options.deferred || createDeferred();
    if (options.fromObj) {
      var toEdit = options.fromObj.options;
      options = Object.assign(
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
    var buttonDeferred = createDeferred();
    var confirmCancel = new Views.ConfirmCancelView({
      deferred: buttonDeferred,
      destination: this.getDestination()
    });

    buttonDeferred.promise
    .then(this.confirmed.bind(this))
    .catch(this.cancelled.bind(this));

    // Set up click event for test button
    this.$el.on('click', '.testButton', this.testView.bind(this));
  }

  testView() {
    var MultiView = require('../views/multiView').MultiView;
    new MultiView({
      childViews: [{
        type: 'GitDemonstrationView',
        options: this.getExportObj()
      }]
    });
  }

  getExportObj() {
    return {
      beforeMarkdowns: this.beforeMarkdownView.exportToArray(),
      afterMarkdowns: this.afterMarkdownView.exportToArray(),
      command: this.commandView.getText(),
      beforeCommand: this.beforeCommandView.getText()
    };
  }

  confirmed() {
    this.die();
    this.deferred.resolve(this.getExportObj());
  }

  cancelled() {
    this.die();
    this.deferred.resolve();
  }

  getInsideElement() {
    return this.$('.insideBuilder')[0];
  }
}

class MultiViewBuilder extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'multiViewBuilder box vertical';
    super(options);

    this.template = _.template($('#multi-view-builder').html());
    this.typeToConstructor = {
      ModalAlert: MarkdownGrabber,
      GitDemonstrationView: DemonstrationBuilder
    };

    this.deferred = options.deferred || createDeferred();
    this.multiViewJSON = options.multiViewJSON || {};

    this.JSON = {
      views: this.getChildViews(),
      supportedViews: Object.keys(this.typeToConstructor)
    };

    this.container = new ModalTerminal({
      title: 'Build a MultiView!'
    });
    this.render();

    // Set up click events
    this.$el.on('click', '.deleteButton', this.deleteOneView.bind(this));
    this.$el.on('click', '.testButton', this.testOneView.bind(this));
    this.$el.on('click', '.editButton', this.editOneView.bind(this));
    this.$el.on('click', '.testEntireView', this.testEntireView.bind(this));
    this.$el.on('click', '.addView', this.addView.bind(this));
    this.$el.on('click', '.saveView', this.saveView.bind(this));
    this.$el.on('click', '.cancelView', this.cancel.bind(this));

    this.show();
  }

  saveView() {
    this.hide();
    this.deferred.resolve(this.multiViewJSON);
  }

  cancel() {
    this.hide();
    this.deferred.resolve();
  }

  addView(ev) {
    var el = ev.target;
    var type = $(el).attr('data-type');

    var whenDone = createDeferred();
    var Constructor = this.typeToConstructor[type];
    var builder = new Constructor({
      deferred: whenDone
    });
    whenDone.promise
    .then(function() {
      var newView = {
        type: type,
        options: builder.getExportObj()
      };
      this.addChildViewObj(newView);
    }.bind(this))
    .catch(function() {
      // they don't want to add the view apparently, so just return
    });
  }

  testOneView(ev) {
    var el = ev.target;
    var index = $(el).attr('data-index');
    var toTest = this.getChildViews()[index];
    var MultiView = require('../views/multiView').MultiView;
    new MultiView({
      childViews: [toTest]
    });
  }

  testEntireView() {
    var MultiView = require('../views/multiView').MultiView;
    new MultiView({
      childViews: this.getChildViews()
    });
  }

  editOneView(ev) {
    var el = ev.target;
    var index = $(el).attr('data-index');
    var type = $(el).attr('data-type');

    var whenDone = createDeferred();
    var builder = new this.typeToConstructor[type]({
      deferred: whenDone,
      fromObj: this.getChildViews()[index]
    });
    whenDone.promise
    .then(function() {
      var newView = {
        type: type,
        options: builder.getExportObj()
      };
      var views = this.getChildViews();
      views[index] = newView;
      this.setChildViews(views);
    }.bind(this))
    .catch(function() { });
  }

  deleteOneView(ev) {
    var el = ev.target;
    var index = $(el).attr('data-index');
    var toSlice = this.getChildViews();

    var updated = toSlice.slice(0,index).concat(toSlice.slice(index + 1));
    this.setChildViews(updated);
    this.update();
  }

  addChildViewObj(newObj, index) {
    var childViews = this.getChildViews();
    childViews.push(newObj);
    this.setChildViews(childViews);
    this.update();
  }

  setChildViews(newArray) {
    this.multiViewJSON.childViews = newArray;
  }

  getChildViews() {
    return this.multiViewJSON.childViews || [];
  }

  update() {
    this.JSON.views = this.getChildViews();
    this.renderAgain();
  }
}

exports.MarkdownGrabber = MarkdownGrabber;
exports.DemonstrationBuilder = DemonstrationBuilder;
exports.TextGrabber = TextGrabber;
exports.MultiViewBuilder = MultiViewBuilder;
exports.MarkdownPresenter = MarkdownPresenter;
