var _ = require('underscore');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? Backbone = require('backbone') : Backbone = window.Backbone;

var CommandEntryCollection = require('../models/collections').CommandEntryCollection;
var Main = require('../app');
var Command = require('../models/commandModel').Command;
var CommandEntry = require('../models/commandModel').CommandEntry;

var Errors = require('../util/errors');
var Warning = Errors.Warning;

var util = require('../util');

var CommandPromptView = Backbone.View.extend({
  initialize: function(options) {
    this.collection = options.collection;

    // uses local storage
    this.commands = new CommandEntryCollection();
    this.commands.fetch({
      success: _.bind(function() {
        // reverse the commands. this is ugly but needs to be done...
        var commands = [];
        this.commands.each(function(c) {
          commands.push(c);
        });

        commands.reverse();
        this.commands.reset();

        _.each(commands, function(c) {
          this.commands.add(c);
        }, this);
      }, this)
    });

    this.index = -1;
    this.listening = false;

    this.commandSpan = this.$('#prompt span.command')[0];
    this.commandCursor = this.$('#prompt span.cursor')[0];

    // this is evil, but we will refer to HTML outside the view
    // and attach a click event listener so we can focus / unfocus
    $(document).delegate('#commandLineHistory', 'click', _.bind(function() {
      this.focus();
    }, this));


    $(document).delegate('#commandTextField', 'blur', _.bind(function() {
      this.blur();
    }, this));

    Main.getEvents().on('processCommandFromEvent', this.addToCollection, this);
    Main.getEvents().on('submitCommandValueFromEvent', this.submitValue, this);
    Main.getEvents().on('rollupCommands', this.rollupCommands, this);

    // hacky timeout focus
    setTimeout(_.bind(function() {
      this.focus();
    }, this), 100);
  },

  events: {
    'keydown #commandTextField': 'onKey',
    'keyup #commandTextField': 'onKeyUp',
    'blur #commandTextField': 'hideCursor',
    'focus #commandTextField': 'showCursor'
  },

  blur: function() {
    this.listening = false;
    this.hideCursor();
  },

  focus: function() {
    this.listening = true;
    this.$('#commandTextField').focus();
    this.showCursor();
  },

  hideCursor: function() {
    this.toggleCursor(false);
  },

  showCursor: function() {
    this.toggleCursor(true);
  },

  toggleCursor: function(state) {
    $(this.commandCursor).toggleClass('shown', state);
  },

  onKey: function(e) {
    if (!this.listening) {
      return;
    }

    var el = e.srcElement;
    this.updatePrompt(el);
  },

  onKeyUp: function(e) {
    if (!this.listening) {
      return;
    }

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
      .replace(/\n/g,'');
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
    Main.getEvents().trigger('commandScrollDown');
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
    // partially edited command, but i doubt that is much in this demo
    if (this.index >= this.commands.length || this.index < 0) {
      this.clear();
      this.index = -1;
      return;
    }

    // yay! we actually can display something
    var commandEntry = this.commands.toArray()[this.index].get('text');
    this.setTextField(commandEntry);
  },

  clearLocalStorage: function() {
    this.commands.each(function(c) {
      Backbone.sync('delete', c, function() { });
    }, this);
    localStorage.setItem('CommandEntries', '');
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
    this.submitValue(value);
  },

  rollupCommands: function(numBack) {
    var which = this.commands.toArray().slice(1, Number(numBack) + 1);
    which.reverse();

    var str = '';
    _.each(which, function(commandEntry) {
      str += commandEntry.get('text') + ';';
    }, this);

    console.log('the str', str);

    var rolled = new CommandEntry({text: str});
    this.commands.unshift(rolled);
    Backbone.sync('create', rolled, function() { });
  },

  submitValue: function(value) {
    // we should add if it's not a blank line and this is a new command...
    // or if we edited the command
    var shouldAdd = (value.length && this.index == -1) ||
      ((value.length && this.index !== -1 &&
      this.commands.toArray()[this.index].get('text') !== value));

    if (shouldAdd) {
      var commandEntry = new CommandEntry({text: value});
      this.commands.unshift(commandEntry);

      // store to local storage
      Backbone.sync('create', commandEntry, function() { });

      // if our length is too egregious, reset
      if (this.commands.length > 100) {
        this.clearLocalStorage();
      }
    }
    this.index = -1;

    util.splitTextCommand(value, function(command) {
      this.addToCollection(command);
    }, this);
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
    // with jquery rather than brutally delete a html. doing so allows us
    // to nicely fade things
    var changes = changeEvent.changes;
    var changeKeys = _.keys(changes);
    if (_.difference(changeKeys, ['status']).length === 0) {
      this.updateStatus();
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

    Main.getEvents().on('issueWarning', this.addWarning, this);
    Main.getEvents().on('commandScrollDown', this.scrollDown, this);
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
      t.scrollTop = t.scrollHeight;
      return;
    }
    if (cD.clientHeight > t.clientHeight) {
      $(t).css('overflow-y', 'scroll');
      $(t).css('overflow-x', 'hidden');
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

exports.CommandPromptView = CommandPromptView;
exports.CommandLineHistoryView = CommandLineHistoryView;

