var GitError = require('../util/errors').GitError;
var _ = require('lodash-es');
var createDeferred = require('../util/promise').createDeferred;

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var ConfirmCancelView = require('../views').ConfirmCancelView;

var intl = require('../intl');

require('jquery-ui/ui/widget');
require('jquery-ui/ui/scroll-parent');
require('jquery-ui/ui/data');
require('jquery-ui/ui/widgets/mouse');
// jquery-ui/ui/ie removed - IE support no longer needed
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/plugin');
require('jquery-ui/ui/safe-active-element');
require('jquery-ui/ui/safe-blur');
require('jquery-ui/ui/widgets/draggable');

class InteractiveRebaseView extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    super(options);

    this.template = _.template($('#interactive-rebase-template').html());
    this.deferred = options.deferred;
    this.rebaseMap = {};
    this.entryObjMap = {};
    this.options = options;

    this.rebaseEntries = new RebaseEntryCollection();
    options.toRebase.reverse();
    options.toRebase.forEach(function(commit) {
      var id = commit.get('id');
      this.rebaseMap[id] = commit;

      this.entryObjMap[id] = new RebaseEntry({
        id: id
      });
      this.rebaseEntries.add(this.entryObjMap[id]);
    }, this);

    this.container = new ModalTerminal({
      title: intl.str('interactive-rebase-title')
    });
    this.render();
    this.show();

    if (options.aboveAll) {
      $('#canvasHolder').css('display', 'none');
    }
  }

  restoreVis() {
    $('#canvasHolder').css('display', 'inherit');
  }

  confirm() {
    this.die();
    if (this.options.aboveAll) {
      this.restoreVis();
    }

    var uiOrder = [];
    this.$('ul.rebaseEntries li').each(function(i, obj) {
      uiOrder.push(obj.id);
    });

    var toRebase = [];
    uiOrder.forEach(function(id) {
      if (this.entryObjMap[id].get('pick')) {
        toRebase.unshift(this.rebaseMap[id]);
      }
    }, this);
    toRebase.reverse();

    this.deferred.resolve(toRebase);
    this.$el.html('');
  }

  render() {
    var json = {
      num: Object.keys(this.rebaseMap).length,
      solutionOrder: this.options.initialCommitOrdering
    };

    var destination = this.container.getInsideElement();
    this.$el.html(this.template(json));
    $(destination).append(this.el);

    var listHolder = this.$('ul.rebaseEntries');
    this.rebaseEntries.each(function(entry) {
      new RebaseEntryView({
        el: listHolder,
        model: entry
      });
    }, this);

    listHolder.sortable({
      axis: 'y',
      placeholder: 'rebaseEntry transitionOpacity ui-state-highlight',
      appendTo: 'parent'
    });

    this.makeButtons();
  }

  cancel() {
    this.hide();
    if (this.options.aboveAll) {
      this.restoreVis();
    }
    this.deferred.resolve([]);
  }

  makeButtons() {
    var deferred = createDeferred();
    deferred.promise
    .then(function() {
      this.confirm();
    }.bind(this))
    .catch(function() {
      this.cancel();
    }.bind(this));

    new ConfirmCancelView({
      destination: this.$('.confirmCancel'),
      deferred: deferred,
      disableCancelButton: !!this.options.aboveAll,
    });
  }
}

class RebaseEntry {
  constructor(options = {}) {
    this._events = {};
    this.attributes = {
      pick: true,
      id: options.id
    };
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    var oldValue = this.attributes[key];
    this.attributes[key] = value;
    if (oldValue !== value) {
      this.trigger('change:' + key, this, value);
      this.trigger('change', this);
    }
  }

  on(eventName, callback, context) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push({ callback: callback, context: context || this });
  }

  trigger(eventName) {
    var listeners = this._events[eventName];
    if (!listeners) return;
    var args = Array.prototype.slice.call(arguments, 1);
    listeners.forEach(function(listener) {
      listener.callback.apply(listener.context, args);
    });
  }

  toggle() {
    this.set('pick', !this.get('pick'));
  }

  toJSON() {
    return Object.assign({}, this.attributes);
  }
}

class RebaseEntryCollection {
  constructor() {
    this._events = {};
    this.models = [];
    this.length = 0;
  }

  add(model) {
    this.models.push(model);
    this.length = this.models.length;
    this.trigger('add', model, this);
  }

  each(callback, context) {
    this.models.forEach(callback, context);
  }

  on(eventName, callback, context) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push({ callback: callback, context: context || this });
  }

  trigger(eventName) {
    var listeners = this._events[eventName];
    if (!listeners) return;
    var args = Array.prototype.slice.call(arguments, 1);
    listeners.forEach(function(listener) {
      listener.callback.apply(listener.context, args);
    });
  }
}

class RebaseEntryView {
  constructor(options) {
    this.el = options.el;
    this.$el = $(this.el);
    this.model = options.model;
    this.tagName = 'li';
    this.template = _.template($('#interactive-rebase-entry-template').html());

    this.render();
  }

  $(selector) {
    return this.$el.find(selector);
  }

  toggle() {
    this.model.toggle();
    this.listEntry.toggleClass('notPicked', !this.model.get('pick'));
  }

  render() {
    this.$el.append(this.template(this.model.toJSON()));
    this.listEntry = this.$el.children(':last');

    this.listEntry.delegate('#toggleButton', 'click', function() {
      this.toggle();
    }.bind(this));
  }
}

exports.InteractiveRebaseView = InteractiveRebaseView;
