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
  animationFactory = new AnimationFactory();

  // the two major collections that affect everything
  var commitCollection = new CommitCollection();  
  commandCollection = new CommandCollection();
  var branchCollection = new BranchCollection();

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
    commitCollection: commitCollection,
    branchCollection: branchCollection
  });

  gitEngine = new GitEngine({
    collection: commitCollection,
    branches: branchCollection
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

  setTimeout(function() {
    events.trigger('submitCommandValueFromEvent', "gc; gc; gc; gc; gc; gc; git checkout master^^^^; git commit; git checkout -b another; gc; gc; git rebase master");
  }, 500);

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

