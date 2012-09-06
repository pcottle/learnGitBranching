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

  submit: function() {
    var value = this.$('#commandTextField').val();
    this.$('#commandTextField').val('');
    events.trigger('commandConsumed', value);

    if (!value.length) {
      // return early, just want a blank line
    }
    console.log('the value');
    console.log(value);

    try {
      var command = new Command(value);
      console.log(command);
      // immediately execute for now TODO
      gitEngine.dispatch(command);
    } catch (e) {
      alert('Error with that command: ' + String(e));
    }
  }
});

var CommandLineHistoryView = Backbone.View.extend({
  initialize: function(options) {
    events.on('commandConsumed', _.bind(
      this.addCommand, this
    ));

    this.commandTemplate = ' \
      <p class="commandLine <%= name %>"> \
        <span class="arrows">&gt; &gt; &gt;</span> \
        <%= command %>  \
      </p> \
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
  }
});
