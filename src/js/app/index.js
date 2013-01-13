var _ = require('underscore');
var Backbone = require('backbone');

var Constants = require('../util/constants');
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

  $(window).on('resize', _.throttle(function(e) {
    var width = $(window).width();
    var height = $(window).height();
    eventBaton.trigger('windowSizeCheck', {w: width, h: height});
  }, 500));
  eventBaton.stealBaton('docKeydown', function() { });
  eventBaton.stealBaton('docKeyup', function() { });

  /**
    * I am disabling this for now, it works on desktop but is
      hacky on iOS mobile and god knows the behavior on android...
  // zoom level measure, I wish there was a jquery event for this :/
  require('../util/zoomLevel').setupZoomPoll(function(level) {
    eventBaton.trigger('zoomChange', level);
  }, this);

  eventBaton.stealBaton('zoomChange', function(level) {
    if (level > Constants.VIEWPORT.maxZoom ||
        level < Constants.VIEWPORT.minZoom) {
      var Views = require('../views');
      var view = new Views.ZoomAlertWindow({level: level});
    }
  });
  */

  eventBaton.stealBaton('windowSizeCheck', function(size) {
    if (size.w < Constants.VIEWPORT.minWidth ||
        size.h < Constants.VIEWPORT.minHeight) {
      var Views = require('../views');
      var view = new Views.WindowSizeAlertWindow();
    }
  });

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

  // demo functionality
  if (/\?demo/.test(window.location.href)) {
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
  }
  if (/command=/.test(window.location.href)) {
    var commandRaw = window.location.href.split('command=')[1].split('&')[0];
    var command = unescape(commandRaw);
    sandbox.mainVis.customEvents.on('gitEngineReady', function() {
      eventBaton.trigger('commandSubmitted', command);
    });
  }
  if (/(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent)) {
    setTimeout(function() {
      eventBaton.trigger('commandSubmitted', 'iOS alert');
    }, 600);
  }
};

$(document).ready(init);

/**
  * the UI method simply bootstraps the command buffer and
  * command prompt views. It only interacts with user input
  * and simply pipes commands to the main events system
**/
function CommandUI() {
  var Collections = require('../models/collections');
  var CommandViews = require('../views/commandViews');

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

