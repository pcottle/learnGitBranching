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

  // make the canvas for us
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

function windowResize() {
  var smaller = 10;
  var el = $('#canvasWrapper')[0];

  var left = el.offsetLeft;
  var top = el.offsetTop;
  var width = el.clientWidth - smaller;
  var height = el.clientHeight - smaller;

  if (paper && paper.canvas) {
    $(paper.canvas).css({
      left: left + 'px',
      top: top + 'px'
    });
    paper.setSize(width, height);
  }
  events.trigger('canvasResize', width, height);
}

