var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var util = require('../util');
var KeyboardListener = require('../util/keyboard').KeyboardListener;
var Main = require('../app');

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var BaseView = require('../views').BaseView;

var LevelDropdownView = ContainedBase.extend({
  tagName: 'div',
  className: 'levelDropdownView box vertical',
  template: _.template($('#level-dropdown-view').html()),

  initialize: function(options) {
    options = options || {};
    this.JSON = {};

    this.navEvents = _.clone(Backbone.Events);
    this.navEvents.on('clickedID', _.debounce(
      _.bind(this.loadLevelID, this),
      300,
      true
    ));

    this.sequences = Main.getLevelArbiter().getSequences();
    this.container = new ModalTerminal({
      title: 'Select a Level'
    });
    this.render();
    this.buildSequences();

    if (!options.wait) {
      this.show();
    }
  },

  loadLevelID: function(id) {
    Main.getEventBaton().trigger(
      'commandSubmitted',
      'level ' + id
    );
    this.hide();
  },

  updateSolvedStatus: function() {
    _.each(this.seriesViews, function(view) {
      view.updateSolvedStatus();
    }, this);
  },

  buildSequences: function() {
    this.seriesViews = [];
    _.each(this.sequences, function(sequenceName) {
      this.seriesViews.push(new SeriesView({
        destination: this.$el,
        name: sequenceName,
        navEvents: this.navEvents
      }));
    }, this);
  }
});

var SeriesView = BaseView.extend({
  tagName: 'div',
  className: 'seriesView box flex1 vertical',
  template: _.template($('#series-view').html()),
  events: {
    'click div.levelIcon': 'click'
  },

  initialize: function(options) {
    this.name = options.name || 'intro';
    this.navEvents = options.navEvents;
    this.info = Main.getLevelArbiter().getSequenceInfo(this.name);
    this.levels = Main.getLevelArbiter().getLevelsInSequence(this.name);

    this.levelIDs = [];
    _.each(this.levels, function(level) {
      this.levelIDs.push(level.id);
    }, this);

    this.destination = options.destination;
    this.JSON = {
      displayName: this.info.displayName,
      about: this.info.about,
      ids: this.levelIDs
    };

    this.render();
    this.updateSolvedStatus();
  },

  updateSolvedStatus: function() {
    // this is a bit hacky, it really should be some nice model
    // property changing but it's the 11th hour...
    var toLoop = this.$('div.levelIcon').each(function(index, el) {
      var id = el.id;
      $(el).toggleClass('solved', Main.getLevelArbiter().isLevelSolved(id));
    });
  },

  click: function(ev) {
    console.log(ev.srcElement);
    console.log(ev.srcElement.id);
    if (!ev || !ev.srcElement || !ev.srcElement.id) {
      console.warn('wut, no id'); return;
    }

    var id = ev.srcElement.id;
    this.navEvents.trigger('clickedID', id);
  }
});

exports.LevelDropdownView = LevelDropdownView;

