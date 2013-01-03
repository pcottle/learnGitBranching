var _ = require('underscore');
var Q = require('q');

var Main = require('../app');

function GitShim(options) {
  options = options || {};
  this.beforeCB = options.beforeCB || function() {};
  this.afterCB = options.afterCB || function() {};

  this.eventBaton = options.eventBaton || Main.getEventBaton();
}

GitShim.prototype.insertShim = function() {
  console.log('stealing baton');
  this.eventBaton.stealBaton('processGitCommand', this.processGitCommand, this);
  console.log(this.eventBaton);
};

GitShim.prototype.processGitCommand = function(command, deferred) {
  console.log('in before');
  this.beforeCB();

  // ok we make a NEW deferred and pass it back
  var newDeferred = Q.defer();
  newDeferred.promise.then(_.bind(function() {
    // give this method the original defer so it can resolve it
    this.afterGitCommandProcessed(command, deferred);
  }, this));

  // punt to the previous listener
  this.eventBaton.passBatonBack('processGitCommand', this.processGitCommand, this, [command, newDeferred]);
};

GitShim.prototype.afterGitCommandProcessed = function(command, deferred) {
  this.afterCB();
  deferred.resolve();
};

exports.GitShim = GitShim;

