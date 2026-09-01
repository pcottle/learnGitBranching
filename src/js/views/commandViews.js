// CommandPromptView - converted from Backbone.View to ES6 class

const {getAllCommands} = require('../sandbox/commands');

var Main = require('../app');
var CommandLineStore = require('../stores/CommandLineStore');
var CommandLineActions = require('../actions/CommandLineActions');

var log = require('../log');
var keyboard = require('../util/keyboard');

const allCommands = Object.keys(getAllCommands());
// Lets push a few commands up in the suggestion order,
// which overrides the order from the exportj
const autoCompleteSuggestionOrder = [
  'levels', // above "level"
  'help', // above help level since you might not be in a level
  'show solution', // above show goal since you start with a goal view
  'reset', // over reset solved
  'import level', // over import tree
  // for the git commands, we did an analysis and got a better order.
  // That way cherry pick is not before checkout
  "git commit",
  "git clone",
  "git fakeCreateRemote",
  "git fakeTeamwork",
  "git checkout",
  "git branch",
  "git fetch",
  "git pull",
];

const allCommandsSorted = autoCompleteSuggestionOrder.concat(
  // add the rest that aren't in the list above
  allCommands.map(command => autoCompleteSuggestionOrder.indexOf(command) > 0 ? null : command)
  .filter(command => !!command)
);

/**
 * Compute the longest common prefix of an array of strings.
 * e.g. ['git cherry-pick', 'git clone'] => 'git c'
 */
function longestCommonPrefix(strings) {
  if (!strings || !strings.length) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    let j = 0;
    while (j < prefix.length && j < strings[i].length && prefix[j] === strings[i][j]) {
      j++;
    }
    prefix = prefix.substring(0, j);
    if (!prefix) return '';
  }
  return prefix;
}

class CommandPromptView {
  constructor(options) {
    options = options || {};
    this.el = options.el;
    this.$el = $(this.el);

    // Tab-cycle autocomplete state
    this._tabMatches = null;       // currently matched commands array
    this._tabIndex = -1;           // current index within the cycle (-1 = not yet cycling)
    this._tabLastPrefix = '';      // last prefix used to trigger Tab (used to detect reset)
    this._tabLastFullPrefix = '';  // last full prefix (anything before the final ;) for reassembly

    this.initialize();
  }

  // Scoped jQuery query
  $(selector) {
    return this.$el.find(selector);
  }

  initialize() {
    Main.getEvents().on('commandSubmittedPassive', this.addToCommandHistory, this);

    this.index = -1;
    this.commandParagraph = this.$('#prompt p.command')[0];
    this.focus();

    Main.getEvents().on('rollupCommands', this.rollupCommands, this);
    Main.getEvents().on('commandBox_setText', (value) => this.setInputText(value));

    Main.getEventBaton().stealBaton('keydown', this.onKeyDown, this);
    Main.getEventBaton().stealBaton('keyup', this.onKeyUp, this);
    this.updatePrompt(" ");

    // Setup DOM events
    this.$('#commandTextField').on('blur', this.hideCursor.bind(this));
    this.$('#commandTextField').on('focus', this.showCursor.bind(this));
  }

  blur() {
    this.hideCursor();
  }

  focus() {
    this.$('#commandTextField').focus();
    this.showCursor();
  }

  hideCursor() {
    this.toggleCursor(false);
  }

  showCursor() {
    this.toggleCursor(true);
  }

  toggleCursor(state) {
    $(this.commandParagraph).toggleClass('showCursor', state);
  }

  onKeyDown(e) {
    var el = e.target;

    const shadowEl = document.querySelector('#shadow');

    const currentValue = el.value;
    const allCommand = currentValue.split(';');
    const lastCommand = allCommand[allCommand.length - 1]
      .replace(/\s\s+/g, ' ').replace(/^\s/, '');
    // everything before the last command (keep earlier commands intact when using ';' separator)
    const prefixBeforeLast = allCommand.slice(0, -1).join(';') +
      (allCommand.length > 1 ? ';' : '');

    // ---- Step 1: update the shadow hint (grey preview of the first match's suffix) ----
    shadowEl.innerHTML = '';
    if (lastCommand.length) {
      for (const c of allCommandsSorted) {
        if (c.startsWith(lastCommand)) {
          shadowEl.innerHTML = (currentValue + c.replace(lastCommand, '')).replace(/ /g, '&nbsp;');
          break;
        }
      }
    }

    // ---- Step 2: Tab-completion logic (Linux-style: LCP on first press, cycle on repeats) ----
    if (e.keyCode === 9 && e.type === 'keydown') {
      e.preventDefault();

      // Prefix changed (user edited input or it is not a repeated Tab) -> reset matches
      if (lastCommand !== this._tabLastPrefix ||
          prefixBeforeLast !== this._tabLastFullPrefix) {
        this._tabMatches = null;
        this._tabIndex = -1;
      }

      if (lastCommand.length === 0) {
        // empty input: nothing to do, just record state
        this._tabLastPrefix = lastCommand;
        this._tabLastFullPrefix = prefixBeforeLast;
      } else {
        // collect all commands matching the current prefix
        if (this._tabMatches === null) {
          this._tabMatches = allCommandsSorted.filter(
            c => c.startsWith(lastCommand)
          );
          this._tabIndex = -1;
        }

        const matches = this._tabMatches;

        if (matches.length === 0) {
          // no matches: do nothing
        } else if (matches.length === 1) {
          // only one match: complete it fully
          el.value = prefixBeforeLast + matches[0];
          // after completing, clear the shadow hint
          shadowEl.innerHTML = '';
          this._tabIndex = 0;
        } else {
          // multiple matches
          if (this._tabIndex === -1) {
            // first Tab: complete up to the longest common prefix
            const lcp = longestCommonPrefix(matches);
            if (lcp.length > lastCommand.length) {
              // a longer common prefix exists, fill it in
              el.value = prefixBeforeLast + lcp;
              // record the new prefix we just expanded to
              this._tabLastPrefix = lcp;
              // update the shadow hint with the first match's remainder
              const remain = matches[0].substring(lcp.length) || '';
              if (remain) {
                shadowEl.innerHTML = (el.value + remain).replace(/ /g, '&nbsp;');
              } else {
                shadowEl.innerHTML = '';
              }
              // re-filter _tabMatches against the new LCP so subsequent Tabs cycle correctly
              this._tabMatches = allCommandsSorted.filter(
                c => c.startsWith(lcp)
              );
              this._tabIndex = -1;
            } else {
              // LCP equals the input itself: enter the cycle, show first match
              this._tabIndex = 0;
              el.value = prefixBeforeLast + matches[0];
              shadowEl.innerHTML = '';
            }
          } else {
            // repeated Tab: advance to the next match (cycle)
            this._tabIndex = (this._tabIndex + 1) % matches.length;
            el.value = prefixBeforeLast + matches[this._tabIndex];
            shadowEl.innerHTML = '';
          }
        }

        // update prefix record (when we've landed on a concrete command)
        if (this._tabIndex >= 0) {
          this._tabLastPrefix = matches[this._tabIndex];
        }
        this._tabLastFullPrefix = prefixBeforeLast;
      }
    } else if (e.type === 'keydown') {
      // any non-Tab keydown: reset Tab-cycle state (prefix effectively changed)
      this._tabMatches = null;
      this._tabIndex = -1;
      this._tabLastPrefix = lastCommand;
      this._tabLastFullPrefix = prefixBeforeLast;
    }

    // lets also handle control + U to clear the line
    if (e.keyCode === 85 && e.ctrlKey && e.type === 'keydown') {
      e.preventDefault();
      el.value = '';
      el.selectionStart = el.selectionEnd = 0;
    }

     // handle control + W to delete up to previous word
    const isDeleteWord = (
      e.keyCode === 87 && e.ctrlKey && e.type === 'keydown'
    ) || (
      // handle alt + backspace to delete up to previous word
      e.keyCode === 8 && e.altKey && e.type === 'keydown'
    );
    if (isDeleteWord) {
      e.preventDefault();
      const cursorPos = el.selectionStart;
      const textBeforeCursor = el.value.substring(0, cursorPos);
      // Find the last word boundary
      const lastSpaceIndex = textBeforeCursor.trimEnd().lastIndexOf(' ');
      if (lastSpaceIndex >= 0) {
        el.value = el.value.substring(0, lastSpaceIndex + 1) +
                  el.value.substring(cursorPos);
        el.selectionStart = el.selectionEnd = lastSpaceIndex + 1;
      } else {
        // If no space found, clear to start
        el.value = el.value.substring(cursorPos);
        el.selectionStart = el.selectionEnd = 0;
      }
    }
    this.updatePrompt(el);
  }

  onKeyUp(e) {
    this.onKeyDown(e);

    // we need to capture some of these events.
    var keyToFuncMap = {
      enter: function() {
        this.submit();
      }.bind(this),
      up: function() {
        this.commandSelectChange(1);
      }.bind(this),
      down: function() {
        this.commandSelectChange(-1);
      }.bind(this)
    };

    var key = keyboard.mapKeycodeToKey(e.which || e.keyCode);
    if (keyToFuncMap[key] !== undefined) {
      e.preventDefault();
      keyToFuncMap[key]();
      this.onKeyDown(e);
    }
  }

  badHtmlEncode(text) {
    return text.replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/</g,'&lt;')
      .replace(/ /g,'&nbsp;')
      .replace(/\n/g,'');
  }

  updatePrompt(el) {
    el = el || {};  // firefox
    // i WEEEPPPPPPpppppppppppp that this reflow takes so long. it adds this
    // super annoying delay to every keystroke... I have tried everything
    // to make this more performant. getting the srcElement from the event,
    // getting the value directly from the dom, etc etc. yet still,
    // there's a very annoying and sightly noticeable command delay.
    // try.github.com also has this, so I'm assuming those engineers gave up as
    // well...
    var text = $('#commandTextField').val();

    // Alright so we have our initial value for what we want the
    // command line to contain. We need to next split into the
    // parse with the cursor and without
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    if (!text.length) {
      text = ' ';
      selectionStart = 0;
      selectionEnd = 1;
    } else if (selectionStart === selectionEnd) {
      // Lets pretend they have selected the end character to make the cursor
      // shown
      text += ' ';
      selectionEnd += 1;
    } else if (selectionStart === undefined || selectionEnd === undefined) {
      // I donno what this is for
      selectionStart = Math.max(text.length - 1, 0);
      selectionEnd = text.length;
    }

    var before = text.substring(0, selectionStart);
    var middle = text.substring(selectionStart, selectionEnd);
    var end = text.substring(selectionEnd, text.length);

    // Then just make three spans and slap it in.
    var finalHTML = '<span>' + this.badHtmlEncode(before) + '</span>' +
      '<span class="commandCursor">' + this.badHtmlEncode(middle) + '</span>' +
      '<span>' + this.badHtmlEncode(end) + '</span>';
    this.commandParagraph.innerHTML = finalHTML;
    // and scroll down due to some weird bug
    Main.getEvents().trigger('commandScrollDown');
  }

  commandSelectChange(delta) {
    this.index += delta;

    // if we are over / under, display blank line. yes this eliminates your
    // partially edited command, but i doubt that is much in this demo
    if (this.index >= CommandLineStore.getCommandHistoryLength() || this.index < 0) {
      this.clear();
      this.index = -1;
      return;
    }

    // yay! we actually can display something
    var commandEntry = CommandLineStore.getCommandHistory()[this.index];
    this.setTextField(commandEntry);
  }

  setTextField(value) {
    this.$('#commandTextField').val(value);
  }

  // Drop some text into the command box and focus it, without submitting --
  // used by the level `show solution` command (see level/index.js)
  setInputText(value) {
    this.setTextField(value);
    var el = this.$('#commandTextField')[0];
    if (el) {
      el.focus();
      el.selectionStart = el.selectionEnd = value.length;
      this.updatePrompt(el);
    }
    this.showCursor();
  }

  clear() {
    this.setTextField('');
  }

  submit() {
    var value = this.$('#commandTextField').val().replace('\n', '');
    this.clear();

    this.submitCommand(value);
    this.index = -1;
  }

  rollupCommands(numBack) {
    var which = CommandLineStore.getCommandHistory().slice(1, Number(numBack) + 1);
    which.reverse();

    var str = '';
    which.forEach(function(text) {
      str += text + ';';
    }, this);

    CommandLineActions.submitCommand(str);
  }

  addToCommandHistory(value) {
    // we should add the command to our local storage history
    // if it's not a blank line and this is a new command...
    // or if we edited the command in place in history
    var shouldAdd = (value.length && this.index === -1) ||
      ((value.length && this.index !== -1 &&
      CommandLineStore.getCommandHistory()[this.index] !== value));

    if (!shouldAdd) {
      return;
    }

    CommandLineActions.submitCommand(value);
    log.commandEntered(value);
  }

  submitCommand(value) {
    Main.getEventBaton().trigger('commandSubmitted', value);
  }
}

exports.CommandPromptView = CommandPromptView;
