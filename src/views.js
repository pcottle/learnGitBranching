var CommandPromptView = Backbone.View.extend({
  initialize: function(options) {
    this.commands = [];
    this.index = -1;

    events.on('commandSubmitted', _.bind(
      this.parseOrCatch, this
    ));

    events.on('processErrorGeneral', _.bind(
      this.processError, this
    ));
  },

  events: {
    'keyup #commandTextField': 'keyUp'
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
    
    // if we are over / under, display blank line. yes this eliminates your
    // partially written command, but i doubt that is much in this demo
    if (this.index >= this.commands.length || this.index < 0) {
      this.clear();
      this.index = -1;
      return;
    }

    // yay! we actually can display something
    this.setTextField(this.commands[this.index]);
  },

  processError: function(err) {
    // TODO move this somewhere else!!! it's awkward here

    // in this demo, every command that's not a git command will
    // throw an exception. Some of these errors might be just to
    // short-circuit the normal programatic flow and print stuff,
    // so we handle them here
    if (err instanceof CommandProcessError) {
        events.trigger('commandProcessError', err);
    } else if (err instanceof CommandResult) {
        events.trigger('commandResultPrint', err);
    } else if (err instanceof GitError) {
        events.trigger('commandGitError', err);
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

    // if we are entering a real command, add it to our history
    if (value.length) {
      this.commands.unshift(value);
    }
    this.index = -1;

    // split commands on semicolon
    _.each(value.split(';'), function(command) {
      command = command.replace(/^(\s+)/, '');
      command = command.replace(/(\s+)$/, '');
      if (command.length) {
        events.trigger('commandSubmitted', command);
      }
    });
  },

  parseOrCatch: function(value) {
    // TODO: move this also
    try {
      // parse validation
      var command = new Command({
        rawStr: value
      });
      // gitCommandReady actually gives it to the gitEngine for dispatch
      events.trigger('gitCommandReady', command);
    } catch (err) {
      events.trigger('processErrorGeneral', err);
    }
  }
});


// This is the view for all commands -- it will represent
// their status (inqueue, processing, finished, error),
// their value ("git commit --amend"),
// and the result (either errors or warnings or whatever)
var CommandView = Backbone.View.extend({
  tagName: 'div',
  model: Command,
  template: _.template($('#command-template').html()),

  events: {
    'click': 'alert'
  },

  alert: function() { alert('clicked!' + this.get('status')); },

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  },

  render: function() {
    var json = _.extend(
      {
        resultType: '',
        result: ''
      },
      this.model.toJSON()
    );
    this.$el.html(this.template(json));
    return this;
  },

  remove: function() {
    $(this.el).hide();
  }
});


var CommandLineHistoryView = Backbone.View.extend({
  initialize: function(options) {
    events.on('commandSubmitted', _.bind(
      this.addCommand, this
    ));

    events.on('commandProcessError', _.bind(
      this.commandError, this
    ));

    // TODO special errors for git?
    events.on('commandGitError', _.bind(
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
    if (!err.get('msg') || !err.get('msg').length) {
      console.log(err);
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
