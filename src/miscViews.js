var InteractiveRebaseView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#interactive-rebase-template').html()),

  events: {
    'click #confirmButton': 'confirmed'
  },

  initialize: function(options) {
    this.hasClicked = false;
    this.rebaseCallback = options.callback;

    this.rebaseArray = options.toRebase;

    this.rebaseEntries = new RebaseEntryCollection();
    this.rebaseMap = {};
    this.entryObjMap = {};

    // make basic models for each commit
    _.each(this.rebaseArray, function(commit) {
      var id = commit.get('id');
      this.rebaseMap[id] = commit;
      this.entryObjMap[id] = new RebaseEntry({
        id: id
      });
      this.rebaseEntries.add(this.entryObjMap[id]);
    }, this);

    // stuff
    this.render();
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
        toRebase.push(this.rebaseMap[id]);
      }
    }, this);

    this.rebaseCallback(toRebase);  

    this.$el.html('');
    // kill ourselves?
    delete this;
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
  },

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
    this.$el.append(this.template(this.model.toJSON()));
    
    // have to build some of this stuff up manually, lame.
    // backbone needs a collectionview, this is ugly
    var id = '#' + this.model.get('id');
    this.listEntry = this.$(id);

    this.$(id + ' #toggleButton').on('click', _.bind(function() {
      this.toggle();
    }, this));
  }
});

