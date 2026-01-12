var _ = require('lodash-es');
var LocaleStore = require('../stores/LocaleStore');

var util = require('../util');
var debounce = require('../util/debounce');
var intl = require('../intl');
var log = require('../log');
var KeyboardListener = require('../util/keyboard').KeyboardListener;
var Main = require('../app');
var LevelStore = require('../stores/LevelStore');
var { createEvents } = require('../util/eventEmitter');

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var BaseView = require('../views').BaseView;

var LEVELS = require('../../levels');

class LevelDropdownView extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'levelDropdownView box vertical';
    super(options);

    this.template = _.template($('#level-dropdown-view').html());
    this.events = {
      'click div.levelDropdownTab': 'onTabClick'
    };

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

    this.navEvents = createEvents();
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

    // Bind events manually
    this.$el.on('click', 'div.levelDropdownTab', this.onTabClick.bind(this));

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
  }

  render() {
    this.container.updateTitle(
      intl.str('select-a-level')
    );
    this.updateTabNames([
      intl.str('main-levels-tab'),
      intl.str('remote-levels-tab')
    ]);
    ContainedBase.prototype.render.call(this);
    this.buildSequences();
  }

  onTabClick(ev) {
    var srcElement = ev.target || ev.srcElement;
    var id = $(srcElement).attr('data-id');
    if (id === this.JSON.selectedTab) {
      return;
    }
    this.selectedTab = id;
    this.updateTabTo(id);
  }

  updateTabTo(id) {
    this.JSON.selectedTab = id;
    this.render();
    if (this.selectedID) {
      this.selectedSequence = this.getSequencesOnTab()[0];
      this.selectedIndex = 0;
      this.updateSelectedIcon();
    }
  }

  updateTabNames(names) {
    for(var index = 0; index < names.length; ++index) {
      this.JSON.tabs[index].name = names[index];
    }
  }

  positive() {
    if (!this.selectedID) {
      return;
    }
    this.loadLevelID(this.selectedID);
  }

  left() {
    if (this.turnOnKeyboardSelection()) {
      return;
    }
    this.leftOrRight(-1);
  }

  updateSelectedIcon() {
    this.selectedID = this.getSelectedID();
    this.selectIconByID(this.selectedID);
  }

  leftOrRight(delta) {
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
  }

  right() {
    if (this.turnOnKeyboardSelection()) {
      return;
    }
    this.leftOrRight(1);
  }

  up() {
    if (this.turnOnKeyboardSelection()) {
      return;
    }
    this.selectedSequence = this.getPreviousSequence();
    this.downOrUp();
  }

  down() {
    if (this.turnOnKeyboardSelection()) {
      return;
    }
    this.selectedSequence = this.getNextSequence();
    this.downOrUp();
  }

  downOrUp() {
    this.selectedIndex = this.boundIndex(this.selectedIndex, this.getCurrentSequence());
    this.deselectIconByID(this.selectedID);
    this.updateSelectedIcon();
  }

  turnOnKeyboardSelection() {
    if (!this.selectedID) {
      this.selectFirst();
      return true;
    }
    return false;
  }

  turnOffKeyboardSelection() {
    if (!this.selectedID) { return; }
    this.deselectIconByID(this.selectedID);
    this.selectedID = undefined;
    this.selectedIndex = undefined;
    this.selectedSequence = undefined;
  }

  getTabIndex() {
    var ids = this.JSON.tabs.map(function(tab) {
      return tab.id;
    });
    return ids.indexOf(this.JSON.selectedTab);
  }

  switchToTabIndex(index) {
    var tabID = this.JSON.tabs[index].id;
    this.updateTabTo(tabID);
  }

  wrapIndex(index, arr) {
    index = (index >= arr.length) ? 0 : index;
    index = (index < 0) ? arr.length - 1 : index;
    return index;
  }

  boundIndex(index, arr) {
    index = (index >= arr.length) ? arr.length - 1 : index;
    index = (index < 0) ? 0 : index;
    return index;
  }

  getSequencesOnTab() {
    return this.sequences.filter(function(sequenceName) {
      var tab = LEVELS.getTabForSequence(sequenceName);
      return tab === this.JSON.selectedTab;
    }, this);
  }

  getNextSequence() {
    var current = this.getSequenceIndex(this.selectedSequence);
    var desired = this.wrapIndex(current + 1, this.getSequencesOnTab());
    return this.getSequencesOnTab()[desired];
  }

  getPreviousSequence() {
    var current = this.getSequenceIndex(this.selectedSequence);
    var desired = this.wrapIndex(current - 1, this.getSequencesOnTab());
    return this.getSequencesOnTab()[desired];
  }

  getSequenceIndex(name) {
    var index = this.getSequencesOnTab().indexOf(name);
    if (index < 0) { throw new Error('didnt find'); }
    return index;
  }

  getIndexForID(id) {
    return LevelStore.getLevel(id).index;
  }

  selectFirst() {
    var firstID = this.sequenceToLevels[this.getSequencesOnTab()[0]][0].id;
    this.selectIconByID(firstID);
    this.selectedIndex = 0;
    this.selectedSequence = this.getSequencesOnTab()[0];
  }

  getCurrentSequence() {
    return this.sequenceToLevels[this.selectedSequence];
  }

  getSelectedID() {
    return this.sequenceToLevels[this.selectedSequence][this.selectedIndex].id;
  }

  selectIconByID(id) {
    this.toggleIconSelect(id, true);
  }

  deselectIconByID(id) {
    this.toggleIconSelect(id, false);
  }

  toggleIconSelect(id, value) {
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
  }

  negative() {
    this.hide();
  }

  testOption(str) {
    return this.currentCommand && new RegExp('--' + str).test(this.currentCommand.get('rawStr'));
  }

  show(deferred, command) {
    this.currentCommand = command;
    // doing the update on show will allow us to fade which will be nice
    this.updateSolvedStatus();

    this.showDeferred = deferred;
    this.keyboardListener.listen();
    ContainedBase.prototype.show.call(this);
  }

  hide() {
    if (this.showDeferred) {
      this.showDeferred.resolve();
    }
    this.showDeferred = undefined;
    this.keyboardListener.mute();
    this.turnOffKeyboardSelection();

    ContainedBase.prototype.hide.call(this);
  }

  loadLevelID(id) {
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
  }

  updateSolvedStatus() {
    this.seriesViews.forEach(function(view) {
      view.updateSolvedStatus();
    }, this);
  }

  buildSequences() {
    this.seriesViews = [];
    this.getSequencesOnTab().forEach(function(sequenceName) {
      this.seriesViews.push(new SeriesView({
        destination: this.$el,
        name: sequenceName,
        navEvents: this.navEvents
      }));
    }, this);
  }
}

class SeriesView extends BaseView {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'seriesView box flex1 vertical';
    super(options);

    this.template = _.template($('#series-view').html());
    this.events = {
      'click a.levelIcon': 'click',
      'mouseenter a.levelIcon': 'enterIcon'
    };

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

    // Bind events manually
    this.$el.on('click', 'a.levelIcon', this.click.bind(this));
    this.$el.on('mouseenter', 'a.levelIcon', this.enterIcon.bind(this));

    this.updateSolvedStatus();
  }

  updateSolvedStatus() {
    // this is a bit hacky, it really should be some nice model
    // property changing but it's the 11th hour...
    this.$('a.levelIcon').each(function() {
      var $el = $(this);
      var id = $el.attr('data-id');
      var isSolved = LevelStore.isLevelSolved(id);
      var isBest = LevelStore.isLevelBest(id);
      $el.toggleClass('solved', isSolved);
      $el.toggleClass('best', isBest);
    });
  }

  getEventID(ev) {
    var element = ev.target;
    return $(element).attr('data-id');
  }

  setAbout(content) {
    this.$('p.levelInfo').text(content);
  }

  enterIcon(ev) {
    var id = this.getEventID(ev);
    this.updateAboutForLevelID(id);
  }

  updateAboutForLevelID(id) {
    this.setAbout(this.formatLevelAbout(id));
  }

  formatLevelAbout(id) {
    var level = LevelStore.getLevel(id);
    return this.getLevelNumberFromID(id) +
      ': ' +
      intl.getName(level);
  }

  getLevelNumberFromID(id) {
    // hack -- parse out the level number from the ID
    return id.replace(/[^0-9]/g, '');
  }

  click(ev) {
    var id = this.getEventID(ev);
    this.navEvents.trigger('clickedID', id);
  }
}

exports.LevelDropdownView = LevelDropdownView;
