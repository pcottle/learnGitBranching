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

    Main.getEvents().on('levelSolved', this.updateSolvedStatus, this);

    this.navEvents = _.clone(Backbone.Events);
    this.navEvents.on('clickedID', _.debounce(
      _.bind(this.loadLevelID, this),
      300,
      true
    ));
    this.navEvents.on('negative', this.negative, this);
    this.navEvents.on('positive', this.positive, this);
    this.navEvents.on('left', this.left, this);
    this.navEvents.on('right', this.right, this);
    this.navEvents.on('up', this.up, this);
    this.navEvents.on('down', this.down, this);

    this.keyboardListener = new KeyboardListener({
      events: this.navEvents,
      aliasMap: {
        esc: 'negative',
        enter: 'positive'
      },
      wait: true
    });

    this.sequences = Main.getLevelArbiter().getSequences();
    this.sequenceToLevels = Main.getLevelArbiter().getSequenceToLevels();

    this.container = new ModalTerminal({
      title: 'Select a Level'
    });
    this.render();
    this.buildSequences();

    if (!options.wait) {
      this.show();
    }
  },

  positive: function() {
    if (!this.selectedID) {
      return;
    }
    this.loadLevelID(this.selectedID);
  },

  left: function() {
    if (this.turnOnKeyboardSelection()) {
      return;
    }
    this.leftOrRight(-1);
  },

  leftOrRight: function(delta) {
    this.deselectIconByID(this.selectedID);
    this.selectedIndex = this.wrapIndex(this.selectedIndex + delta, this.getCurrentSequence());
    this.selectedID = this.getSelectedID();
    this.selectIconByID(this.selectedID);
  },

  right: function() {
    if (this.turnOnKeyboardSelection()) {
      return;
    }
    this.leftOrRight(1);
  },

  up: function() {
    if (this.turnOnKeyboardSelection()) {
      return;
    }
    this.selectedSequence = this.getPreviousSequence();
    this.downOrUp();
  },

  down: function() {
    if (this.turnOnKeyboardSelection()) {
      return;
    }
    this.selectedSequence = this.getNextSequence();
    this.downOrUp();
  },

  downOrUp: function() {
    this.selectedIndex = this.boundIndex(this.selectedIndex, this.getCurrentSequence());
    this.deselectIconByID(this.selectedID);
    this.selectedID = this.getSelectedID();
    this.selectIconByID(this.selectedID);
  },

  turnOnKeyboardSelection: function() {
    if (!this.selectedID) {
      this.selectFirst();
      return true;
    }
    return false;
  },

  turnOffKeyboardSelection: function() {
    if (!this.selectedID) { return; }
    this.deselectIconByID(this.selectedID);
    this.selectedID = undefined;
    this.selectedIndex = undefined;
    this.selectedSequence = undefined;
  },

  wrapIndex: function(index, arr) {
    index = (index >= arr.length) ? 0 : index;
    index = (index < 0) ? arr.length - 1 : index;
    return index;
  },

  boundIndex: function(index, arr) {
    index = (index >= arr.length) ? arr.length - 1 : index;
    index = (index < 0) ? 0 : index;
    return index;
  },

  getNextSequence: function() {
    var current = this.getSequenceIndex(this.selectedSequence);
    var desired = this.wrapIndex(current + 1, this.sequences);
    return this.sequences[desired];
  },

  getPreviousSequence: function() {
    var current = this.getSequenceIndex(this.selectedSequence);
    var desired = this.wrapIndex(current - 1, this.sequences);
    return this.sequences[desired];
  },

  getSequenceIndex: function(name) {
    var index;
    _.each(this.sequences, function(_name, _index) {
      if (_name == name) {
        index = _index;
      }
    });
    if (index === undefined) { throw new Error('didnt find'); }
    return index;
  },

  getIndexForID: function(id) {
    var index;
    var levels = this.sequenceToLevels[this.selectedSequence];
    _.each(levels, function(level, _index) {
      if (level.id == id) {
        index = _index;
      }
    });
    return index;
  },

  selectFirst: function() {
    var firstID = this.sequenceToLevels[this.sequences[0]][0].id;
    this.selectIconByID(firstID);
    this.selectedIndex = 0;
    this.selectedSequence = this.sequences[0];
  },

  getCurrentSequence: function() {
    return this.sequenceToLevels[this.selectedSequence];
  },

  getSelectedID: function() {
    return this.sequenceToLevels[this.selectedSequence][this.selectedIndex].id;
  },

  selectIconByID: function(id) {
    this.toggleIconSelect(id, true);
  },

  deselectIconByID: function(id) {
    this.toggleIconSelect(id, false);
  },

  toggleIconSelect: function(id, value) {
    this.selectedID = id;
    var selector = '#levelIcon-' + id;
    $(selector).toggleClass('selected', value);
  },

  negative: function() {
    this.hide();
  },

  show: function(deferred) {
    this.showDeferred = deferred;
    this.keyboardListener.listen();
    LevelDropdownView.__super__.show.apply(this);
  },

  hide: function() {
    if (this.showDeferred) {
      this.showDeferred.resolve();
    }
    this.showDeferred = undefined;
    this.keyboardListener.mute();
    this.turnOffKeyboardSelection();

    LevelDropdownView.__super__.hide.apply(this);
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
      var id = $(el).attr('data-id');
      $(el).toggleClass('solved', Main.getLevelArbiter().isLevelSolved(id));
    });
  },

  click: function(ev) {
    if (!ev || !ev.srcElement) {
      console.warn('wut, no id'); return;
    }

    var id = $(ev.srcElement).attr('data-id');
    this.navEvents.trigger('clickedID', id);
  }
});

exports.LevelDropdownView = LevelDropdownView;

