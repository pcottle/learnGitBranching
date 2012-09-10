var CommandLineView = Backbone.View.extend({
  initialize: function(options) {
    this.commands = [];

    this.$('#commandTextField').keyup(
      $.proxy(this.keyUp, this)
    );
  },

  keyUp: function(e) {
    console.log(e);

    // we need to capture some of these events
    var keyMap = {
      13: _.bind(function() {
        this.submit();
      }, this)
    };

    if (keyMap[e.which] !== undefined) {
      e.preventDefault();
      keyMap[e.which]();
    }
  },

  addCommand: function(e) {
    e.preventDefault();
    this.submit();
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

  submit: function() {
    var value = this.$('#commandTextField').val();
    this.$('#commandTextField').val('');
    try {
      var command = new Command(value);
      console.log(command);
      // immediately execute for now, will change later
      events.trigger('gitCommandReady', command);
    } catch (err) {
      if (err instanceof CommandProcessError) {
        events.trigger('commandProcessError', err);
      } else if (err instanceof CommandResultError) {

      } else {
        throw err;
      }
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

    events.on('commandResultPrint', _.bind(
      this.commandResultPrint, this
    ));

    this.commandTemplate = ' \
      <p class="commandLine <%= class %>"> \
        <span class="arrows">&gt; &gt; &gt;</span> \
        <%= command %>  \
      </p> \
    ';

    this.resultTemplate = ' \
      <p class="commandResult <%= class %>"> \
        <%= result %>
      </p>
    ';
  },

  addCommand: function(commandText) {
    this.$('#commandDisplay').append(
      _.template(
        this.commandTemplate,
        {
          class: 'pastCommand',
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
          class: 'errorResult',
          result: err.toResult()
        }
      )
    );
  },

  commandResultPrint: function(err) {
    this.$('#commandDisplay').append(
      _.template(
        this.resultTemplate,
        {
          class; 'commandResult',
          result: err.toResult()
        }
      )
    );
  }
});
