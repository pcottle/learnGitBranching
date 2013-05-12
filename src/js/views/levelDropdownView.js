var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var util = require('../util');
var intl = require('../intl');
var log = require('../log');
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
      title: intl.str('select-a-level')
    });

    this.render();

    Main.getEvents().on('resetMapSolved', this.render, this);
    Main.getEvents().on('localeChanged', this.render, this);

    if (!options.wait) {
      this.show();
    }
  },

  render: function() {
    LevelDropdownView.__super__.render.apply(this, arguments);
    this.buildSequences();
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
    var index = this.sequences.indexOf(name);
    if (index < 0) { throw new Error('didnt find'); }
    return index;
  },

  getIndexForID: function(id) {
    return Main.getLevelArbiter().getLevel(id).index;
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

  testOption: function(str) {
    return this.currentCommand && new RegExp('--' + str).test(this.currentCommand.get('rawStr'));
  },

  show: function(deferred, command) {
    this.currentCommand = command;
    // doing the update on show will allow us to fade which will be nice
    this.updateSolvedStatus();

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
    if (!this.testOption('noOutput')) {
      Main.getEventBaton().trigger(
        'commandSubmitted',
        'level ' + id
      );
      var level = Main.getLevelArbiter().getLevel(id);
      var name = level.name.en_US;
      log.levelSelected(name);
    }
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
    'click div.levelIcon': 'click',
    'mouseenter div.levelIcon': 'enterIcon',
    'mouseleave div.levelIcon': 'leaveIcon'
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
    // use a non-breaking space to prevent the level from bouncing around
    // from missing strings
    this.JSON = {
      displayName: intl.getIntlKey(this.info, 'displayName'),
      about: intl.getIntlKey(this.info, 'about') || "&nbsp;",
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

  getEventID: function(ev) {
    var element = ev.target;
    return $(element).attr('data-id');
  },

  resetAbout: function() {
    this.$('p.about').text(intl.getIntlKey(this.info, 'about'))
      .css('font-style', 'inherit');
  },

  setAbout: function(content) {
    this.$('p.about').text(content).css('font-style', 'italic');
  },

  enterIcon: function(ev) {
    var id = this.getEventID(ev);
    var level = Main.getLevelArbiter().getLevel(id);
    this.setAbout(intl.getName(level));
  },

  leaveIcon: function() {
    this.resetAbout();
  },

  click: function(ev) {
    var id = this.getEventID(ev);
    this.navEvents.trigger('clickedID', id);
  }
});

exports.LevelDropdownView = LevelDropdownView;

