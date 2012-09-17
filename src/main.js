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
  paper = Raphael(10, 10, 200, 200);

  $(window).resize(windowResize);
  windowResize();
  setTimeout(windowResize, 50);
});

function windowResize() {
  if (paper && paper.canvas) {
    var el = $('#canvasWrapper')[0];

    var left = el.offsetLeft;
    var top = el.offsetTop;
    var width = el.clientWidth;
    var height = el.clientHeight;

    $(paper.canvas).css({
      left: left + 'px',
      top: top + 'px'
    });
    paper.setSize(width, height);
  }
  events.trigger('windowResize');
}
