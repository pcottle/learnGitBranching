/**
 * Globals
 */
var events = _.clone(Backbone.Events);
var ui = null;
var mainVis = null;

///////////////////////////////////////////////////////////////////////

$(document).ready(function(){
  var Visuals = require('./visuals');

  ui = new UI();
  mainVis = new Visuals.Visualization({
    el: $('#canvasWrapper')[0]  
  });

  if (/\?demo/.test(window.location.href)) {
    setTimeout(function() {
      events.trigger('submitCommandValueFromEvent', "gc; git checkout HEAD~1; git commit; git checkout -b bugFix; gc; gc; git rebase master; git checkout master; gc; gc; git merge bugFix");
    }, 500);
  }
});

function UI() {
  var Collections = require('./collections');
  var CommandViews = require('./commandViews');

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

