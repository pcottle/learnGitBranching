function GitEngine() {
  this.detachedHead = false;
}

GitEngine.prototype.commit = function() {

};

GitEngine.prototype.execute = function(command, callback) {
  // execute command, and when it's finished, call the callback
  // we still need to figure this out

  var closures = this.getClosuresForCommand(command);
  // make a scheduler based on all the closures, and pass in our callback
  var s = new Scheduler(closures, {
    callback: callback
  });
  s.start();
};

GitEngine.prototype.getClosuresForCommand = function(command) {
  var numbers = [1,2,3,4,5,6,7,8,9,10];
  var closures = [];
  _.each(numbers, function(num) {
    var c = function() {
      console.log(num);
    };
    closures.push(c);
  });
  return closures;
};

var Commit = Backbone.Model.extend({
  initialize: function() {
    // validation / defaults
    if (!this.get('name')) {
      this.set('name', _.uniqueId('C'));
    }
    if (!this.get('parent') && !this.get('rootCommit')) {
      throw new Error('needs parent commit');
    }
    // make a node and start drawing? this is a major TODO
  },

  draw: function() {

  }
});


function CommandQueue() {
  this.commands = [];
  this.consumeTimeout = null;

  this.initialDelay = 400;
}

CommandQueue.prototype.add = function(command) {
  this.commands.push(command);
  this.touchTimer();
};

CommandQueue.prototype.touchTimer = function() {
  if (this.consumeTimeout) {
    return;
  }
  this.consumeTimeout = setTimeout(_.bind(function() {
    this.next();
  }, this), this.initialDelay);
};

CommandQueue.prototype.reset = function() {
  this.consumeTimeout = null;
};

CommandQueue.prototype.next = function() {
  if (this.commands.length == 0) {
    this.reset();
    return;
  }

  // execute the top command by passing it into the engine
  var toExecute = this.commands.shift(0);
  var callback = _.bind(function() {
    this.next();
  }, this);
  gitEngine.execute(toExecute, callback);
};



/******************
 * Planning:

 here is the major flow:

 someone types in a command ->
  make a new command object. if error, give immediate feedback, dont append to queue
  if not error ->
    append command object to queue


  Command Queue ->
    consume commands at a certain rate (either instantly if just added, or with an interval
    Execute command -> (usually a git engine thing)
    Wait for git engine command to finish
    when done, execute next command (if more)

  so two levels of Async-ness:
    command queue slowly consumes commands

  GitEngine executes commands, which will have async bits to them (such as popping off commits for a
  rebase)
*/
