/**
 * Globals
 */
var events = _.clone(Backbone.Events);

var gitEngine = null;
var gitVisuals = null;

var commandCollection = null;
var commandBuffer = null;

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

  $(window).resize(windowResize);
  windowResize();
  setTimeout(windowResize, 50);
});

function windowResize() {
  var el = $('#canvasWrapper')[0];
  $('#treeCanvas').height(el.clientHeight - 10).width(el.clientWidth - 10);
}
