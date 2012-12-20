var _ = require('underscore');
var Backbone = require('backbone');

/**
 * Globals
 */
var events = _.clone(Backbone.Events);
var ui = null;
var mainVis = null;

///////////////////////////////////////////////////////////////////////

var init = function(){
  var Visualization = require('../visuals/visualization').Visualization;

  ui = new UI();
  mainVis = new Visualization({
    el: $('#canvasWrapper')[0]
  });

  if (/\?demo/.test(window.location.href)) {
    setTimeout(function() {
      events.trigger('submitCommandValueFromEvent', "gc; git checkout HEAD~1; git commit; git checkout -b bugFix; gc; gc; git rebase -i HEAD~2; git rebase master; git checkout master; gc; gc; git merge bugFix");
    }, 500);
  }
};

$(document).ready(init);

function UI() {
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
}

exports.getEvents = function() {
  return events;
};

exports.getUI = function() {
  return ui;
};

exports.getMainVis = function() {
  return mainVis;
};

exports.init = init;

