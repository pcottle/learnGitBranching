var CommandPromptView = Backbone.View.extend({
  initialize: function(options) {
    this.collection = options.collection;
    this.commands = [];
    this.index = -1;

    this.commandSpan = this.$('#prompt span.command')[0];
    this.commandCursor = this.$('#prompt span.cursor')[0];

    // this is evil, but we will refer to HTML outside the document
    // and attach a click event listener
    $(document).delegate('#commandLineHistory', 'click', _.bind(function() {
      this.focus();
    }, this));
  },

  events: {
    'keydown #commandTextField': 'onKey',
    'keyup #commandTextField': 'onKeyUp'
  },

  focus: function() {
    this.$('#commandTextField').focus();
  },

  onKey: function(e) {
    var el = e.srcElement;
    this.updatePrompt(el)
  },

  onKeyUp: function(e) {
    this.onKey(e);

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
      this.onKey(e);
    }
  },

  badHtmlEncode: function(text) {
    return text.replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/</g,'&lt;')
      .replace(/ /g,'&nbsp;')
      .replace(/\n/g,'')
  },

  updatePrompt: function(el) {
    // i WEEEPPPPPPpppppppppppp that this reflow takes so long. it adds this
    // super annoying delay to every keystroke... I have tried everything
    // to make this more performant. getting the srcElement from the event,
    // getting the value directly from the dom, etc etc. yet still,
    // there's a very annoying and sightly noticeable command delay.
    // try.github.com also has this, so I'm assuming those engineers gave up as
    // well...

    var val = this.badHtmlEncode(el.value);
    this.commandSpan.innerHTML = val;

    // now mutate the cursor...
    this.cursorUpdate(el.value.length, el.selectionStart, el.selectionEnd);
    // and scroll down due to some weird bug
    events.trigger('commandScrollDown');
  },

  cursorUpdate: function(commandLength, selectionStart, selectionEnd) {
    // 10px for monospaced font...
    var widthPerChar = 10;

    var numCharsSelected = Math.max(1, selectionEnd - selectionStart);
    var width = String(numCharsSelected * widthPerChar) + 'px';

    // now for positioning
    var numLeft = Math.max(commandLength - selectionStart, 0);
    var left = String(-numLeft * widthPerChar) + 'px';
    // one reflow? :D
    $(this.commandCursor).css({
      width: width,
      left: left
    });
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
    _.each(value.split(';'), _.bind(function(command, index) {
      command = command.replace(/^(\s+)/, '');
      command = command.replace(/(\s+)$/, '');
      command = _.escape(command);

      if (index > 0 && !command.length) {
        return;
      }

      this.addToCollection(command);
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
  },

  initialize: function() {
    this.model.bind('change', this.wasChanged, this);
    this.model.bind('destroy', this.remove, this);
  },

  wasChanged: function(model, changeEvent) {
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
        result: '',
        formattedWarnings: this.model.getFormattedWarnings()
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

    events.on('issueWarning', this.addWarning, this);
    events.on('commandScrollDown', this.scrollDown, this);
  },

  addWarning: function(msg) {
    var err = new Warning({
      msg: msg
    });

    var command = new Command({
      error: err,
      rawStr: 'Warning:'
    });

    this.collection.add(command);
  },

  scrollDown: function() {
    // if commandDisplay is ever bigger than #terminal, we need to
    // add overflow-y to terminal and scroll down
    var cD = $('#commandDisplay')[0];
    var t = $('#terminal')[0];

    if ($(t).hasClass('scrolling')) {
      console.log('scrolling');
      console.log(t.scrollHeight);
      console.log(t.scrollTop);
      t.scrollTop = t.scrollHeight;
      return;
    }
    if (cD.clientHeight > t.clientHeight) {
      $(t).css('overflow-y', 'scroll');
      $(t).addClass('scrolling');
      t.scrollTop = t.scrollHeight;
    }
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
