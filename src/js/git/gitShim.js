var _ = require('underscore');
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

  this.beforeDeferHandler = function(deferred) {
    var view = new MultiView({
    });
    view.getPromise()
    .then(function() {
      return Q.delay(700);
    })
    .then(function() {
      deferred.resolve();
    })
    .done();
  };

  this.eventBaton = options.eventBaton || Main.getEventBaton();
}

GitShim.prototype.insertShim = function() {
  this.eventBaton.stealBaton('processGitCommand', this.processGitCommand, this);
};

GitShim.prototype.processGitCommand = function(command, deferred) {
  console.log('in before');
  this.beforeCB(command);

  // ok we make a NEW deferred that will, upon resolution,
  // call our afterGitCommandProcessed. This inserts the 'after' shim
  // functionality. we give this new deferred to the eventBaton handler
  var newDeferred = Q.defer();
  newDeferred.promise.then(_.bind(function() {
    // give this method the original defer so it can resolve it
    this.afterGitCommandProcessed(command, deferred);
  }, this));

  // now our shim owner might want to launch some kind of deferred beforehand, like
  // a modal or something. in order to do this, we need to defer the passing
  // of the event baton backwards, and either resolve that promise immediately or
  // give it to our shim owner.
  var passBaton = _.bind(function() {
    // punt to the previous listener
    this.eventBaton.passBatonBack('processGitCommand', this.processGitCommand, this, [command, newDeferred]);
  }, this);

  var beforeDefer = Q.defer();
  beforeDefer.promise.then(passBaton);

  // if we didnt receive a defer handler in the options, this just
  // resolves immediately
  this.beforeDeferHandler(beforeDefer);
};

GitShim.prototype.afterGitCommandProcessed = function(command, deferred) {
  this.afterCB(command);
  deferred.resolve();
};

exports.GitShim = GitShim;

