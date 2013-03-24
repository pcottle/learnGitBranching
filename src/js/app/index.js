var _ = require('underscore');
var Backbone = require('backbone');

var constants = require('../util/constants');
var util = require('../util');

/**
 * Globals
 */
var events = _.clone(Backbone.Events);
var commandUI;
var sandbox;
var eventBaton;
var levelArbiter;
var levelDropdown;

///////////////////////////////////////////////////////////////////////

var init = function() {
  /**
    * There is a decent amount of bootstrapping we need just to hook
    * everything up. The init() method takes on these responsibilities,
    * including but not limited to:
    *   - setting up Events and EventBaton
    *   - calling the constructor for the main visualization
    *   - initializing the command input bar
    *   - handling window.focus and zoom events
  **/
  var Sandbox = require('../level/sandbox').Sandbox;
  var Level = require('../level').Level;
  var EventBaton = require('../util/eventBaton').EventBaton;
  var LevelArbiter = require('../level/arbiter').LevelArbiter;
  var LevelDropdownView = require('../views/levelDropdownView').LevelDropdownView;

  eventBaton = new EventBaton();
  commandUI = new CommandUI();
  sandbox = new Sandbox();
  levelArbiter = new LevelArbiter();
  levelDropdown = new LevelDropdownView({
    wait: true
  });

  events.on('localeChanged', intlRefresh);

  initRootEvents(eventBaton);
  initDemo(sandbox);
};

var intlRefresh = function() {
  if (!window.$) { return; }
  $('span.intl-aware').each(function(i, el) {
    var intl = require('../intl');
    var key = $(el).attr('data-intl');
    $(el).text(intl.str(key).toUpperCase());
  });
};

var initRootEvents = function(eventBaton) {
  // we always want to focus the text area to collect input
  var focusTextArea = function() {
    $('#commandTextField').focus();
  };
  focusTextArea();

  $(window).focus(function(e) {
    eventBaton.trigger('windowFocus', e);
  });
  $(document).click(function(e) {
    eventBaton.trigger('documentClick', e);
  });
  $(document).bind('keydown', function(e) {
    eventBaton.trigger('docKeydown', e);
  });
  $(document).bind('keyup', function(e) {
    eventBaton.trigger('docKeyup', e);
  });
  $(window).on('resize', function(e) {
    events.trigger('resize', e);
  });

  eventBaton.stealBaton('docKeydown', function() { });
  eventBaton.stealBaton('docKeyup', function() { });

  // the default action on window focus and document click is to just focus the text area
  eventBaton.stealBaton('windowFocus', focusTextArea);
  eventBaton.stealBaton('documentClick', focusTextArea);

  // but when the input is fired in the text area, we pipe that to whoever is
  // listenining
  var makeKeyListener = function(name) {
    return function() {
      var args = [name];
      _.each(arguments, function(arg) {
        args.push(arg);
      });
      eventBaton.trigger.apply(eventBaton, args);
    };
  };

  $('#commandTextField').on('keydown', makeKeyListener('keydown'));
  $('#commandTextField').on('keyup', makeKeyListener('keyup'));
  $(window).trigger('resize');
};

var initDemo = function(sandbox) {
  var params = util.parseQueryString(window.location.href);

  // being the smart programmer I am (not), I dont include a true value on demo, so
  // I have to check if the key exists here
  if (params.hasOwnProperty('demo')) {
    sandbox.mainVis.customEvents.on('gitEngineReady', function() {
      eventBaton.trigger(
        'commandSubmitted',
        [
          "git commit; git checkout -b bugFix C1; git commit; git merge master; git checkout master; git commit; git rebase bugFix;",
          "delay 1000; reset;",
          "level rebase1 --noFinishDialog --noStartCommand --noIntroDialog;",
          "delay 2000; show goal; delay 1000; hide goal;",
          "git checkout bugFix; git rebase master; git checkout side; git rebase bugFix;",
          "git checkout another; git rebase side; git rebase another master;",
          "help; levels"
        ].join(''));
    });
  } else if (!params.hasOwnProperty('NODEMO')) {
    sandbox.mainVis.customEvents.on('gitEngineReady', function() {
      eventBaton.trigger(
        'commandSubmitted',
        [
          "git help;",
          "delay 1000;",
          "help;",
          "levels"
        ].join(''));
    });
  }

  if (params.locale !== undefined && params.locale.length) {
    constants.GLOBAL.locale = params.locale;
    events.trigger('localeChanged');
  }

  if (params.command) {
    var command = unescape(params.command);
    sandbox.mainVis.customEvents.on('gitEngineReady', function() {
      eventBaton.trigger('commandSubmitted', command);
    });
  }

  if (/(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent) || /android/i.test(navigator.userAgent)) {
    sandbox.mainVis.customEvents.on('gitEngineReady', function() {
      eventBaton.trigger('commandSubmitted', 'mobile alert');
    });
  }
};

if (require('../util').isBrowser()) {
  // this file gets included via node sometimes as well
  $(document).ready(init);
}

/**
  * the UI method simply bootstraps the command buffer and
  * command prompt views. It only interacts with user input
  * and simply pipes commands to the main events system
**/
function CommandUI() {
  var Views = require('../views');
  var Collections = require('../models/collections');
  var CommandViews = require('../views/commandViews');

  var mainHelprBar = new Views.MainHelperBar();

  this.commandCollection = new Collections.CommandCollection();
  this.commandBuffer = new Collections.CommandBuffer({
    collection: this.commandCollection
  });

  this.commandPromptView = new CommandViews.CommandPromptView({
    el: $('#commandLineBar')
  });

  this.commandLineHistoryView = new CommandViews.CommandLineHistoryView({
    el: $('#commandLineHistory'),
    collection: this.commandCollection
  });
}

exports.getEvents = function() {
  return events;
};

exports.getSandbox = function() {
  return sandbox;
};

exports.getEventBaton = function() {
  return eventBaton;
};

exports.getCommandUI = function() {
  return commandUI;
};

exports.getLevelArbiter = function() {
  return levelArbiter;
};

exports.getLevelDropdown = function() {
  return levelDropdown;
};

exports.init = init;

