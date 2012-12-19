var GitError = require('../util/errors').GitError;
var _ = require('underscore');
var Backbone = require('backbone');

var InteractiveRebaseView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#interactive-rebase-template').html()),

  events: {
    'click #confirmButton': 'confirmed'
  },

  initialize: function(options) {
    this.hasClicked = false;
    this.deferred = options.deferred;

    this.rebaseArray = options.toRebase;

    this.rebaseEntries = new RebaseEntryCollection();
    this.rebaseMap = {};
    this.entryObjMap = {};

    this.rebaseArray.reverse();
    // make basic models for each commit
    _.each(this.rebaseArray, function(commit) {
      var id = commit.get('id');
      this.rebaseMap[id] = commit;
      this.entryObjMap[id] = new RebaseEntry({
        id: id
      });
      this.rebaseEntries.add(this.entryObjMap[id]);
    }, this);

    this.render();

    // show the dialog holder
    this.show();
  },

  show: function() {
    this.toggleVisibility(true);
  },

  hide: function() {
    this.toggleVisibility(false);
  },

  toggleVisibility: function(toggle) {
    $('#dialogHolder').toggleClass('shown', toggle);
  },

  confirmed: function() {
    // we hide the dialog anyways, but they might be fast clickers
    if (this.hasClicked) {
      return;
    }
    this.hasClicked = true;

    // first of all hide
    this.$el.css('display', 'none');

    // get our ordering
    var uiOrder = [];
    this.$('ul#rebaseEntries li').each(function(i, obj) {
      uiOrder.push(obj.id);
    });

    // now get the real array
    var toRebase = [];
    _.each(uiOrder, function(id) {
      // the model
      if (this.entryObjMap[id].get('pick')) {
        toRebase.unshift(this.rebaseMap[id]);
      }
    }, this);

    this.deferred.resolve(toRebase);
    // garbage collection will get us
    this.$el.html('');
  },

  render: function() {
    var json = {
      num: this.rebaseArray.length
    };

    this.$el.html(this.template(json));

    // also render each entry
    var listHolder = this.$('ul#rebaseEntries');
    this.rebaseEntries.each(function(entry) {
      new RebaseEntryView({
        el: listHolder,
        model: entry
      });
    }, this);

    // then make it reorderable..
    listHolder.sortable({
      distance: 5,
      placeholder: 'ui-state-highlight'
    });
  }
});

var RebaseEntry = Backbone.Model.extend({
  defaults: {
    pick: true
  },

  toggle: function() {
    this.set('pick', !this.get('pick'));
  }
});

var RebaseEntryCollection = Backbone.Collection.extend({
  model: RebaseEntry
});

var RebaseEntryView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#interactive-rebase-entry-template').html()),

  toggle: function() {
    this.model.toggle();

    // toggle a class also
    this.listEntry.toggleClass('notPicked', !this.model.get('pick'));
  },

  initialize: function(options) {
    this.render();
  },

  render: function() {
    var json = this.model.toJSON();
    this.$el.append(this.template(this.model.toJSON()));

    // hacky :( who would have known jquery barfs on ids with %'s and quotes
    this.listEntry = this.$el.children(':last');

    this.listEntry.delegate('#toggleButton', 'click', _.bind(function() {
      this.toggle();
    }, this));
  }
});

exports.InteractiveRebaseView = InteractiveRebaseView;

