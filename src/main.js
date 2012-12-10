var AnimationFactory = require('./animationFactory').AnimationFactory;
var CommandCollection = require('./collections').CommandCollection;
var CommandBuffer = require('./collections').CommandBuffer;
var CommandPromptView = require('./commandViews').CommandPromptView;
var CommandLineHistoryView = require('./commandViews').CommandLineHistoryView;
var Visualization = require('./visuals').Visualization;

/**
 * Globals
 */
var events = _.clone(Backbone.Events);
var ui = null;
var animationFactory = null;

/**
 * Static Classes
 */
animationFactory = new AnimationFactory();

///////////////////////////////////////////////////////////////////////

$(document).ready(function(){
  ui = new UI();
  mainVis = new Visualization({
    el: $('#canvasWrapper')[0]  
  });

  if (/\?demo/.test(window.location.href)) {
    setTimeout(function() {
      events.trigger('submitCommandValueFromEvent', "gc; git checkout HEAD~1; git commit; git checkout -b bugFix; gc; gc; git rebase master; git checkout master; gc; gc; git merge bugFix");
    }, 500);
  }
});

function UI() {
  // static classes
  this.commandCollection = new CommandCollection();

  this.commandBuffer = new CommandBuffer({
    collection: this.commandCollection
  });

  this.commandPromptView = new CommandPromptView({
    el: $('#commandLineBar'),
    collection: this.commandCollection
  });
  this.commandLineHistoryView = new CommandLineHistoryView({
    el: $('#commandLineHistory'),
    collection: this.commandCollection
  });

  $('#commandTextField').focus();
}

exports.getEvents = function() {
  return events;
};
exports.ui = ui;
exports.animationFactory = animationFactory;

