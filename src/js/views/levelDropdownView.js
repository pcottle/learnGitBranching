var _ = require('underscore');
var Q = require('q');
var Backbone = require('backbone');
var LocaleStore = require('../stores/LocaleStore');

var util = require('../util');
var debounce = require('../util/debounce');
var intl = require('../intl');
var log = require('../log');
var KeyboardListener = require('../util/keyboard').KeyboardListener;
var Main = require('../app');
var LevelStore = require('../stores/LevelStore');

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var BaseView = require('../views').BaseView;

var LEVELS = require('../../levels');

var LevelDropdownView = ContainedBase.extend({
  tagName: 'div',
  className: 'levelDropdownView box vertical',
  template: _.template($('#level-dropdown-view').html()),
  events: {
    'click div.levelDropdownTab': 'onTabClick'
  },

  initialize: function(options) {
    options = options || {};
    var queryParams = util.parseQueryString(
      window.location.href
    );
    this.JSON = {
      selectedTab: queryParams.defaultTab || 'main',
      tabs: [{
        id: 'main',
        name: intl.str('main-levels-tab')
      }, {
        id: 'remote',
        name: intl.str('remote-levels-tab')
      }]
    };

    this.navEvents = Object.assign({}, Backbone.Events);
    this.navEvents.on('clickedID', debounce(
      this.loadLevelID.bind(this),
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

    this.sequences = LevelStore.getSequences();
    this.sequenceToLevels = LevelStore.getSequenceToLevels();

    this.container = new ModalTerminal({
      title: intl.str('select-a-level')
    });

    // Lol WTF. For some reason we cant use this.render.bind(this) so
    // instead setup a lame callback version. The CasperJS tests
    // fail otherwise.
    var that = this;
    LocaleStore.subscribe(function() {
      that.render.apply(that);
    });
    LevelStore.subscribe(function() {
      that.render();
    });
    this.render();
    if (!options.wait) {
      this.show();
    }
  },

  render: function() {
    this.container.updateTitle(
      intl.str('select-a-level')
    );
    this.updateTabNames([
      intl.str('main-levels-tab'),
      intl.str('remote-levels-tab')
    ]);
    LevelDropdownView.__super__.render.apply(this, arguments);
    this.buildSequences();
  },

  onTabClick: function(ev) {
    var srcElement = ev.target || ev.srcElement;
    var id = $(srcElement).attr('data-id');
    if (id === this.JSON.selectedTab) {
      return;
    }
    this.selectedTab = id;
    this.updateTabTo(id);
  },

  updateTabTo: function(id) {
    this.JSON.selectedTab = id;
    this.render();
    if (this.selectedID) {
      this.selectedSequence = this.getSequencesOnTab()[0];
      this.selectedIndex = 0;
      this.updateSelectedIcon();
    }
  },

  updateTabNames: function(names) {
    for(var index = 0; index < names.length; ++index) {
      this.JSON.tabs[index].name = names[index];
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

  updateSelectedIcon: function() {
    this.selectedID = this.getSelectedID();
    this.selectIconByID(this.selectedID);
  },

  leftOrRight: function(delta) {
    this.deselectIconByID(this.selectedID);
    var index = this.selectedIndex + delta;

    var sequence = this.getCurrentSequence();
    var tabs = this.JSON.tabs;
    // switch tabs now if needed / possible
    if (index >= sequence.length &&
        this.getTabIndex() + 1 < tabs.length) {
      this.switchToTabIndex(this.getTabIndex() + 1);
      this.selectedIndex = 0;
    } else if (index < 0 &&
               this.getTabIndex() - 1 >= 0) {
      this.switchToTabIndex(this.getTabIndex() - 1);
      this.selectedIndex = 0;
    } else {
      this.selectedIndex = this.wrapIndex(
        this.selectedIndex + delta, this.getCurrentSequence()
      );
    }
    this.updateSelectedIcon();
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
    this.updateSelectedIcon();
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

  getTabIndex: function() {
    var ids = this.JSON.tabs.map(function(tab) {
      return tab.id;
    });
    return ids.indexOf(this.JSON.selectedTab);
  },

  switchToTabIndex: function(index) {
    var tabID = this.JSON.tabs[index].id;
    this.updateTabTo(tabID);
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

  getSequencesOnTab: function() {
    return this.sequences.filter(function(sequenceName) {
      var tab = LEVELS.getTabForSequence(sequenceName);
      return tab === this.JSON.selectedTab;
    }, this);
  },

  getNextSequence: function() {
    var current = this.getSequenceIndex(this.selectedSequence);
    var desired = this.wrapIndex(current + 1, this.getSequencesOnTab());
    return this.getSequencesOnTab()[desired];
  },

  getPreviousSequence: function() {
    var current = this.getSequenceIndex(this.selectedSequence);
    var desired = this.wrapIndex(current - 1, this.getSequencesOnTab());
    return this.getSequencesOnTab()[desired];
  },

  getSequenceIndex: function(name) {
    var index = this.getSequencesOnTab().indexOf(name);
    if (index < 0) { throw new Error('didnt find'); }
    return index;
  },

  getIndexForID: function(id) {
    return LevelStore.getLevel(id).index;
  },

  selectFirst: function() {
    var firstID = this.sequenceToLevels[this.getSequencesOnTab()[0]][0].id;
    this.selectIconByID(firstID);
    this.selectedIndex = 0;
    this.selectedSequence = this.getSequencesOnTab()[0];
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

    // also go find the series and update the about
    this.seriesViews.forEach(function(view) {
      if (view.levelIDs.indexOf(id) === -1) {
        return;
      }
      view.updateAboutForLevelID(id);
    }, this);
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
      var level = LevelStore.getLevel(id);
      var name = level.name.en_US;
      log.levelSelected(name);
    }
    this.hide();
  },

  updateSolvedStatus: function() {
    this.seriesViews.forEach(function(view) {
      view.updateSolvedStatus();
    }, this);
  },

  buildSequences: function() {
    this.seriesViews = [];
    this.getSequencesOnTab().forEach(function(sequenceName) {
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
    'mouseenter div.levelIcon': 'enterIcon'
  },

  initialize: function(options) {
    this.name = options.name || 'intro';
    this.navEvents = options.navEvents;
    this.info = LevelStore.getSequenceInfo(this.name);
    this.levels = LevelStore.getLevelsInSequence(this.name);

    this.levelIDs = [];
    var firstLevelInfo = null;
    this.levels.forEach(function(level) {
      if (firstLevelInfo === null) {
        firstLevelInfo = this.formatLevelAbout(level.id);
      }
      this.levelIDs.push(level.id);
    }, this);

    this.destination = options.destination;
    // use a non-breaking space to prevent the level from bouncing around
    // from missing strings
    this.JSON = {
      displayName: intl.getIntlKey(this.info, 'displayName'),
      about: intl.getIntlKey(this.info, 'about') || "&nbsp;",
      levelInfo: firstLevelInfo,
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
      $(el).toggleClass('solved', LevelStore.isLevelSolved(id));
    });
  },

  getEventID: function(ev) {
    var element = ev.target;
    return $(element).attr('data-id');
  },

  setAbout: function(content) {
    this.$('p.levelInfo').text(content);
  },

  enterIcon: function(ev) {
    var id = this.getEventID(ev);
    this.updateAboutForLevelID(id);
  },

  updateAboutForLevelID: function(id) {
    this.setAbout(this.formatLevelAbout(id));
  },

  formatLevelAbout: function(id) {
    var level = LevelStore.getLevel(id);
    return this.getLevelNumberFromID(id) +
      ': ' +
      intl.getName(level);
  },

  getLevelNumberFromID: function(id) {
    // hack -- parse out the level number from the ID
    return id.replace(/[^0-9]/g, '');
  },

  click: function(ev) {
    var id = this.getEventID(ev);
    this.navEvents.trigger('clickedID', id);
  }
});

exports.LevelDropdownView = LevelDropdownView;
