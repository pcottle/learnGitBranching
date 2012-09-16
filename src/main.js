/**
 * Globals
 */
var events = _.clone(Backbone.Events);

var gitEngine = null;
var gitVisuals = null;

var commandCollection = null;
var commandBuffer = null;

$(document).ready(function(){
  sys = arbor.ParticleSystem(4000, 200, 0.5, false, 55, 0.005, 'verlet');
  sys.renderer = Renderer('#viewport');

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
});

