var CommandPromptView = Backbone.View.extend({
  initialize: function(options) {
    this.collection = options.collection;
    this.commands = [];
    this.index = -1;
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
    _.each(value.split(';'), _.bind(function(command) {
      command = command.replace(/^(\s+)/, '');
      command = command.replace(/(\s+)$/, '');
      if (command.length) {
        this.addToCollection(command);
      }
    }, this));
  },

  addToCollection: function(value) {
    var command = new Command({
      rawStr: value
    });
    this.collection.add(command);
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
    'click': 'clicked'
  },

  clicked: function(e) {
    console.log('was clicked');
  },

  initialize: function() {
    this.model.bind('change', this.wasChanged, this);
    this.model.bind('destroy', this.remove, this);
  },

  wasChanged: function(model, changeEvent) {
    console.log('command changed', model, changeEvent);
    // for changes that are just comestic, we actually only want to toggle classes
    // with jquery rather than brutally delete a html of HTML
    var changes = changeEvent.changes;
    var changeKeys = _.keys(changes);
    if (_.difference(changeKeys, ['status']) == 0) {
      this.updateStatus();
    } else if (_.difference(changeKeys, ['error']) == 0) {
      // the above will 
      this.render();
    } else {
      this.render();
    }
  },

  updateStatus: function() {
    var statuses = ['inqueue', 'processing', 'finished'];
    var toggleMap = {};
    _.each(statuses, function(status) {
      toggleMap[status] = false;
    });
    toggleMap[this.model.get('status')] = true;

    var query = this.$('p.commandLine');

    _.each(toggleMap, function(value, key) {
      query.toggleClass(key, value);
    });
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
    this.collection = options.collection;

    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.on('all', this.render, this);

    this.collection.on('change', this.scrollDown, this);
  },

  scrollDown: function() {
    var el = $('#commandLineHistory')[0];
    el.scrollTop = el.scrollHeight;
  },

  addOne: function(command) {
    var view = new CommandView({
      model: command
    });
    this.$('#commandDisplay').append(view.render().el);
    this.scrollDown();
  },

  addAll: function() {
    this.collection.each(this.addOne);
  }
});
