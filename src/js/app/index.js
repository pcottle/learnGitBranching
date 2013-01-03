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
  var EventBaton = require('../util/eventBaton').EventBaton;

  eventBaton = new EventBaton();
  commandUI = new CommandUI();
  sandbox = new Sandbox();

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

  // zoom level measure, I wish there was a jquery event for this :/
  require('../util/zoomLevel').setupZoomPoll(function(level) {
    eventBaton.trigger('zoomChange', level);
  }, this);

  eventBaton.stealBaton('zoomChange', function(level) {
    if (level > Constants.VIEWPORT.maxZoom ||
        level < Constants.VIEWPORT.minZoom) {
      var Views = require('../views');
      var view = new Views.ZoomAlertWindow();
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

  /* hacky demo functionality */
  if (/\?demo/.test(window.location.href)) {
    setTimeout(function() {
      eventBaton.trigger('commandSubmitted', "gc; git checkout HEAD~1; git commit; git checkout -b bugFix; gc; gc; git rebase -i HEAD~2; git rebase master; git checkout master; gc; gc; git merge bugFix");
    }, 500);
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

exports.init = init;

