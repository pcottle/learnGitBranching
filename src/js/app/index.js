var _ = require('underscore');
var Backbone = require('backbone');

/**
 * Globals
 */
var events = _.clone(Backbone.Events);
var ui;
var mainVis;
var eventBaton;

///////////////////////////////////////////////////////////////////////

var init = function(){
  var Visualization = require('../visuals/visualization').Visualization;
  var EventBaton = require('../util/eventBaton').EventBaton;

  eventBaton = new EventBaton();
  ui = new UI();
  mainVis = new Visualization({
    el: $('#canvasWrapper')[0]
  });

  // we always want to focus the text area to collect input
  var focusTextArea = function() {
    console.log('focusing text area');
    $('#commandTextField').focus();
  };
  focusTextArea();

  $(window).focus(focusTextArea);
  $(document).click(focusTextArea);

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
      events.trigger('submitCommandValueFromEvent', "gc; git checkout HEAD~1; git commit; git checkout -b bugFix; gc; gc; git rebase -i HEAD~2; git rebase master; git checkout master; gc; gc; git merge bugFix");
    }, 500);
  }
};

$(document).ready(init);

function UI() {
  this.active = true;
  var Collections = require('../models/collections');
  var CommandViews = require('../views/commandViews');

  this.commandCollection = new Collections.CommandCollection();
  this.commandBuffer = new Collections.CommandBuffer({
    collection: this.commandCollection
  });

  this.commandPromptView = new CommandViews.CommandPromptView({
    el: $('#commandLineBar'),
    collection: this.commandCollection
  });
  this.commandLineHistoryView = new CommandViews.CommandLineHistoryView({
    el: $('#commandLineHistory'),
    collection: this.commandCollection
  });

  $('#commandTextField').focus();
  eventBaton.stealBaton('windowFocus', this.onWindowFocus, this);
}

UI.prototype.onWindowFocus = function() {
  this.commandPromptView.focus();
};

exports.getEvents = function() {
  return events;
};

exports.getUI = function() {
  return ui;
};

exports.getMainVis = function() {
  return mainVis;
};

exports.getEventBaton = function() {
  return eventBaton;
};

exports.init = init;

