/**
 * Globals
 */
var events = _.clone(Backbone.Events);

var gitEngine = null;
var gitVisuals = null;

var commandCollection = null;
var commandBuffer = null;

var paper = null;

$(document).ready(function(){
  // the two major collections that affect everything
  var commitCollection = new CommitCollection();  
  commandCollection = new CommandCollection();

  commandBuffer = new CommandBuffer({
    collection: commandCollection
  });

  new CommandPromptView({
    el: $('#commandLineBar'),
    collection: commandCollection
  });
  new CommandLineHistoryView({
    el: $('#commandLineHistory'),
    collection: commandCollection
  });

  gitVisuals = new GitVisuals({
    collection: commitCollection
  });

  gitEngine = new GitEngine({
    collection: commitCollection
  });

  $('#commandTextField').focus();

  // make the canvas for us
  Raphael(10, 10, 200, 200, function() {
    paper = this;
    // needs to be called before raphael ready
    windowResize();
    events.trigger('raphaelReady');
  });

  $(window).resize(windowResize);
  windowResize();
  setTimeout(windowResize, 50);
});

function windowResize() {
  var smaller = 10;

  if (paper && paper.canvas) {
    var el = $('#canvasWrapper')[0];

    var left = el.offsetLeft;
    var top = el.offsetTop;
    var width = el.clientWidth - smaller;
    var height = el.clientHeight - smaller;

    $(paper.canvas).css({
      left: left + 'px',
      top: top + 'px'
    });
    paper.setSize(width, height);
    events.trigger('canvasResize', width, height);
  }
}

