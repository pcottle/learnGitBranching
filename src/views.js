var CommandLineView = Backbone.View.extend({
  initialize: function(options) {
    this.commands = [];
    this.index = -1;

    this.$('#commandTextField').keyup(
      $.proxy(this.keyUp, this)
    );

    events.on('commandConsumed', _.bind(
      this.parseOrCatch, this
    ));
  },

  keyUp: function(e) {
    // we need to capture some of these events.
    // WARNING: this key map is not internationalized :(
    var keyMap = {
      // enter
      13: _.bind(function() {
        this.submit();
      }, this),
      // up
      38: _.bind(function() {
        this.commandSelectChange(1);
      }, this),
      // down
      40: _.bind(function() {
        this.commandSelectChange(-1);
      }, this)
    };

    if (keyMap[e.which] !== undefined) {
      e.preventDefault();
      keyMap[e.which]();
    }
  },

  commandSelectChange: function(delta) {
    this.index += delta;
    
    // if we are over / under, display blank line
    if (this.index >= this.commands.length || this.index < 0) {
      this.clear();
      this.index = -1;
      return;
    }

    // yay! we actually can display something
    this.setTextField(this.commands[this.index]);
  },

  processError: function(err) {
    // in this demo, every command that's not a git command will
    // throw an exception. Some of these errors might be just to
    // short-circuit the normal programatic flow, so we handle them
    // here
    if (err instanceof CommandProcessError) {
        events.trigger('commandProcessError', err);
    } else if (err instanceof CommandResult) {
        events.trigger('commandResultPrint', err);
    } else {
      throw err;
    }
  },

  setTextField: function(value) {
    this.$('#commandTextField').val(value);
  },

  clear: function() {
    this.setTextField('');
  },

  submit: function() {
    var value = this.$('#commandTextField').val().replace('\n', '');
    this.clear();

    if (value.length) {
      this.commands.unshift(value);
    }
    this.index = -1;

    events.trigger('commandConsumed', value);
  },

  parseOrCatch: function(value) {
    try {
      var command = new Command(value);
      console.log(command);
      events.trigger('gitCommandReady', command);
    } catch (err) {
      this.processError(err);
    }
  }
});

var CommandLineHistoryView = Backbone.View.extend({
  initialize: function(options) {
    events.on('commandConsumed', _.bind(
      this.addCommand, this
    ));

    events.on('commandProcessError', _.bind(
      this.commandError, this
    ));

    events.on('commandProcessWarn', _.bind(
      this.commandWarn, this
    ));

    events.on('commandResultPrint', _.bind(
      this.commandResultPrint, this
    ));

    // TODO: move these to a real template system
    this.commandTemplate = ' \
      <p class="commandLine <%= className %>"> \
        <span class="arrows">&gt; &gt; &gt;</span> \
        <%= command %>  \
      </p> \
    ';

    this.resultTemplate = ' \
      <p class="commandLine <%= className %>"> \
        <%= result %> \
      </p> \
    ';
  },

  addCommand: function(commandText) {
    this.$('#commandDisplay').append(
      _.template(
        this.commandTemplate,
        {
          className: 'pastCommand',
          command: commandText
        }
      )
    );
  },

  commandError: function(err) {
    this.$('#commandDisplay').append(
      _.template(
        this.resultTemplate,
        {
          className: 'errorResult',
          result: err.toResult()
        }
      )
    );
  },

  commandWarn: function(msg) {
    this.$('#commandDisplay').append(
      _.template(
        this.resultTemplate,
        {
          className: 'commandWarn',
          result: msg
        }
      )
    );
  },

  commandResultPrint: function(err) {
    if (!err.msg.length) {
      // blank lines
      return;
    }
    this.$('#commandDisplay').append(
      _.template(
        this.resultTemplate,
        {
          className: 'commandResult',
          result: err.toResult()
        }
      )
    );
  }
});
