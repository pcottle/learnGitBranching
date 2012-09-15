var CommitCollection = Backbone.Collection.extend({
  model: Commit
});

var commitCollection = new CommitCollection();

var CommandCollection = Backbone.Collection.extend({
  model: Command
});

var CommandBuffer = Backbone.Model.extend({
  initialize: function() {
    events.on('gitCommandReady', _.bind(
      this.addCommand, this
    ));

    this.collection = new CommandCollection();
    this.buffer = [];
    this.timeout = null;
    this.delay = 300;
  },

  addCommand: function(command) {
    this.collection.add(command);
    this.buffer.push(command);
    this.touchBuffer();
  },

  touchBuffer: function() {
    // touch buffer just essentially means we just check if our buffer is being
    // processed. if it's not, we immediately process the first item
    // and then set the timeout.
    if (this.timeout) {
      // timeout existence implies its being processed
      return;
    }

    // process first element now
    this.popAndProcess();
    // always set the timeout, regardless of buffer size
    this.setTimeout();
  },


  setTimeout: function() {
    this.timeout = setTimeout(_.bind(function() {
        this.sipFromBuffer();
    }, this), 300);
  },

  popAndProcess: function() {
    var popped = this.buffer.pop();
    events.trigger('processCommand', popped);
  },

  clear: function() {
    clearTimeout(this.timeout);
    this.timeout = null;
  },

  sipFromBuffer: function() {
    if (!this.buffer.length) {
      this.clear();
      return;
    }

    this.popAndProcess();
    if (this.buffer.length) {
      this.setTimeout();
    } else {
      this.clear();
    }
  },

});

var commandBuffer = new CommandBuffer();
