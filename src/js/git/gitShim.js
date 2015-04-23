var Q = require('q');

var Main = require('../app');
var MultiView = require('../views/multiView').MultiView;

function GitShim(options) {
  options = options || {};

  // these variables are just functions called before / after for
  // simple things (like incrementing a counter)
  this.beforeCB = options.beforeCB || function() {};
  this.afterCB = options.afterCB || function() {};

  // these guys handle an optional async process before the git
  // command executes or afterwards. If there is none,
  // it just resolves the deferred immediately
  var resolveImmediately = function(deferred) {
    deferred.resolve();
  };
  this.beforeDeferHandler = options.beforeDeferHandler || resolveImmediately;
  this.afterDeferHandler = options.afterDeferHandler || resolveImmediately;
  this.eventBaton = options.eventBaton || Main.getEventBaton();
}

GitShim.prototype.insertShim = function() {
  this.eventBaton.stealBaton('processGitCommand', this.processGitCommand, this);
};

GitShim.prototype.removeShim = function() {
  this.eventBaton.releaseBaton('processGitCommand', this.processGitCommand, this);
};

GitShim.prototype.processGitCommand = function(command, deferred) {
  this.beforeCB(command);

  // ok we make a NEW deferred that will, upon resolution,
  // call our afterGitCommandProcessed. This inserts the 'after' shim
  // functionality. we give this new deferred to the eventBaton handler
  var newDeferred = Q.defer();
  newDeferred.promise
  .then(function() {
    // give this method the original defer so it can resolve it
    this.afterGitCommandProcessed(command, deferred);
  }.bind(this))
  .done();

  // now our shim owner might want to launch some kind of deferred beforehand, like
  // a modal or something. in order to do this, we need to defer the passing
  // of the event baton backwards, and either resolve that promise immediately or
  // give it to our shim owner.
  var passBaton = function() {
    // punt to the previous listener
    this.eventBaton.passBatonBack('processGitCommand', this.processGitCommand, this, [command, newDeferred]);
  }.bind(this);

  var beforeDefer = Q.defer();
  beforeDefer.promise
  .then(passBaton)
  .done();

  // if we didnt receive a defer handler in the options, this just
  // resolves immediately
  this.beforeDeferHandler(beforeDefer, command);
};

GitShim.prototype.afterGitCommandProcessed = function(command, deferred) {
  this.afterCB(command);

  // again we can't just resolve this deferred right away... our shim owner might
  // want to insert some promise functionality before that happens. so again
  // we make a defer
  var afterDefer = Q.defer();
  afterDefer.promise
  .then(function() {
    deferred.resolve();
  })
  .done();

  this.afterDeferHandler(afterDefer, command);
};

exports.GitShim = GitShim;

