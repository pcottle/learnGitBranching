var GitError = require('../util/errors').GitError;
var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var ConfirmCancelView = require('../views').ConfirmCancelView;
var LeftRightView = require('../views').LeftRightView;

var InteractiveRebaseView = ContainedBase.extend({
  tagName: 'div',
  template: _.template($('#interactive-rebase-template').html()),

  createRebaseEntries: function() {
    this.rebaseMap = {};
    this.entryObjMap = {};
    this.rebaseEntries = new RebaseEntryCollection();
    
    // If we are displaying a solution, we potentially only want to pick certain commits, and reorder
    // the ones that are picked. The commits we want to pick and the order are contained in the options.initialCommitOrdering,
    // the list of all the commits that are part of the rebase are in options.toRebase
    var commitsToUse = this.options.initialCommitOrdering === undefined ? this.options.toRebase
                                                                        : this.options.initialCommitOrdering;

    _.each(commitsToUse, function(commit) {
      var id = commit.get('id');
      this.rebaseMap[id] = commit;

      // make basic models for each commit
      this.entryObjMap[id] = new RebaseEntry({
        id: id,
        pick: true
      });
      this.rebaseEntries.add(this.entryObjMap[id]);
    }, this);
    
    // If we are using the initialCommitOrdering, we might not have picked all of the commits,
    // but we would still want to see the other unpicked ones. Just show them as unpicked by default
    if (this.options.initialCommitOrdering !== undefined) {
      _.each(this.options.toRebase, function(commit) {
        var id = commit.get('id');
        
        if (!(id in this.rebaseMap)) {
          this.rebaseMap[id] = commit;

          // make basic models for each commit
          this.entryObjMap[id] = new RebaseEntry({
            id: id,
            pick: false
          });
        }
        this.rebaseEntries.add(this.entryObjMap[id]);
      }, this);
    }
  },
  
  initialize: function(options) {
    this.deferred = options.deferred;
    this.options = options;
    
    this.createRebaseEntries();

    this.container = new ModalTerminal({
      title: 'Interactive Rebase'
    });
    this.render();

    // show the dialog holder
    this.show();

    if (options.aboveAll) {
      // TODO fix this :(
      $('#canvasHolder').css('display', 'none');
    }
  },

  restoreVis: function() {
    // restore the absolute position canvases
    $('#canvasHolder').css('display', 'inherit');
  },

  confirm: function() {
    this.die();
    if (this.options.aboveAll) {
      this.restoreVis();
    }

    // get our ordering
    var uiOrder = [];
    this.$('ul.rebaseEntries li').each(function(i, obj) {
      uiOrder.push(obj.id);
    });

    // now get the real array
    var toRebase = [];
    _.each(uiOrder, function(id) {
      // the model pick check
      if (this.entryObjMap[id].get('pick')) {
        toRebase.unshift(this.rebaseMap[id]);
      }
    }, this);
    toRebase.reverse();

    this.deferred.resolve(toRebase);
    // garbage collection will get us
    this.$el.html('');
  },

  render: function() {
    var json = {
      num: _.keys(this.rebaseMap).length
    };

    var destination = this.container.getInsideElement();
    this.$el.html(this.template(json));
    $(destination).append(this.el);

    // also render each entry
    var listHolder = this.$('ul.rebaseEntries');
    this.rebaseEntries.each(function(entry) {
      new RebaseEntryView({
        el: listHolder,
        model: entry
      });
    }, this);

    // then make it reorderable..
    listHolder.sortable({
      axis: 'y',
      placeholder: 'rebaseEntry transitionOpacity ui-state-highlight',
      appendTo: 'parent'
    });

    this.makeButtons();
  },

  cancel: function() {
    // empty array does nothing, just like in git
    this.hide();
    if (this.options.aboveAll) {
      this.restoreVis();
    }
    this.deferred.resolve([]);
  },

  makeButtons: function() {
    // control for button
    var deferred = Q.defer();
    deferred.promise
    .then(_.bind(function() {
      this.confirm();
    }, this))
    .fail(_.bind(function() {
      this.cancel();
    }, this))
    .done();

    // finally get our buttons
    new ConfirmCancelView({
      destination: this.$('.confirmCancel'),
      deferred: deferred
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
    this.listEntry.toggleClass('notPicked', !this.model.get('pick'));

    this.listEntry.delegate('#toggleButton', 'click', _.bind(function() {
      this.toggle();
    }, this));
  }
});

exports.InteractiveRebaseView = InteractiveRebaseView;
