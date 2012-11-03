/**
 * Globals
 */
var events = _.clone(Backbone.Events);

var gitEngine = null;
var gitVisuals = null;

var commandCollection = null;
var commandBuffer = null;
var animationFactory = null;

var paper = null;

$(document).ready(function(){
  initUI();
  var mainVis = new Visualization({
    el: $('#canvasWrapper')[0]  
  });

  if (/\?demo/.test(window.location.href)) {
    setTimeout(function() {
      events.trigger('submitCommandValueFromEvent', "gc; git checkout HEAD~1; git commit; git checkout -b bugFix; gc; gc; git rebase master; git checkout master; gc; gc; git merge bugFix");
    }, 500);
  }
});

function initUI() {
  // static classes
  animationFactory = new AnimationFactory();
  commandCollection = new CommandCollection();

  commandBuffer = new CommandBuffer({
    collection: commandCollection
  });

  commandPromptView = new CommandPromptView({
    el: $('#commandLineBar'),
    collection: commandCollection
  });
  commandLineHistoryView = new CommandLineHistoryView({
    el: $('#commandLineHistory'),
    collection: commandCollection
  });

  $('#commandTextField').focus();
}

