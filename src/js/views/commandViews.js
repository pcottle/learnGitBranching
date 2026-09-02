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
  allCommands.filter(command => autoCompleteSuggestionOrder.indexOf(command) === -1)
);

// Keycodes used in keydown handlers
const KEY_TAB = 9;
const KEY_BACKSPACE = 8;
const KEY_U = 85; // Ctrl+U: clear line
const KEY_W = 87; // Ctrl+W: delete word

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

/**
 * Split a command line value into the prefix before the last ';' and the
 * last command token. Single source of truth for ';' parsing.
 */
function splitCommands(value) {
  const parts = value.split(';');
  const lastCommand = parts[parts.length - 1]
    .replace(/\s\s+/g, ' ')
    .replace(/^\s/, '');
  const prefixBeforeLast = parts.length > 1
    ? parts.slice(0, -1).join(';') + ';'
    : '';
  return { lastCommand, prefixBeforeLast };
}

/**
 * The prompt renders spaces as non-breaking so that the fake cursor lines up
 * with the real characters; the hint has to do the same or the two get out
 * of sync.
 */
function shadowSafeText(text) {
  return text.replace(/ /g, '\u00a0').replace(/\n/g, '');
}

/**
 * Render the grey inline autocomplete hint into #shadow.
 *
 * #shadow sits directly on top of the real prompt text, so the characters
 * the user already typed still need to be laid out (they push the suggested
 * remainder over to the right spot) but must not be painted -- otherwise we
 * draw a second, semi-transparent copy of every typed character on top of
 * the real one, which reads as blurry / doubled text. Hence the hidden
 * span for the typed part.
 *
 * We also use textContent rather than innerHTML: the typed text is
 * arbitrary user input (anything before a ';' ends up here verbatim) and
 * the real prompt escapes it, so the hint has to escape it too -- both to
 * keep the two copies the same width and to keep markup out of the DOM.
 */
function renderShadowHint(shadowEl, typed, remainder) {
  shadowEl.innerHTML = '';
  if (!remainder) {
    return;
  }

  const typedSpan = document.createElement('span');
  typedSpan.className = 'shadowTyped';
  typedSpan.textContent = shadowSafeText(typed);
  shadowEl.appendChild(typedSpan);

  const remainderSpan = document.createElement('span');
  remainderSpan.textContent = shadowSafeText(remainder);
  shadowEl.appendChild(remainderSpan);
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
    // Cache shadow element instead of re-querying on every keystroke
    this.shadowEl = document.querySelector('#shadow');
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

    const { lastCommand, prefixBeforeLast } = splitCommands(el.value);

    // Step 1: update the shadow hint (grey preview of the first match's suffix)
    this._updateShadowHint(el.value, lastCommand);

    // Key-specific handlers only fire on true keydown events
    if (e.type !== 'keydown') {
      this.updatePrompt(el);
      return;
    }

    // Classify the key once, then dispatch flat
    const isTab = e.keyCode === KEY_TAB;
    const isClearLine = e.keyCode === KEY_U && e.ctrlKey;
    const isDeleteWord = (e.keyCode === KEY_W && e.ctrlKey) ||
                        (e.keyCode === KEY_BACKSPACE && e.altKey);

    if (isTab || isClearLine || isDeleteWord) {
      e.preventDefault();
    }

    // Step 2: Tab-completion logic (has its own state machine, don't reset on Tab)
    if (isTab) {
      this._handleTab(el, lastCommand, prefixBeforeLast);
    } else {
      // any non-Tab keydown: reset Tab-cycle state
      this._tabMatches = null;
      this._tabIndex = -1;
      this._tabLastPrefix = lastCommand;
      this._tabLastFullPrefix = prefixBeforeLast;
    }

    // Ctrl+U: clear the line
    if (isClearLine) {
      el.value = '';
      el.selectionStart = el.selectionEnd = 0;
    }

    // Ctrl+W or Alt+Backspace: delete up to previous word
    if (isDeleteWord) {
      this._handleDeleteWord(el);
    }

    this.updatePrompt(el);
  }

  onKeyUp(e) {
    // Bug fix: was calling this.onKeyDown(e) which ran the entire keydown
    // pipeline 2-3 times per keystroke (triple DOM reflow). Now just sync
    // shadow hint + prompt directly.
    const el = e.target;
    const { lastCommand } = splitCommands(el.value);
    this._updateShadowHint(el.value, lastCommand);

    const keyToFuncMap = {
      enter: () => this.submit(),
      up: () => this.commandSelectChange(1),
      down: () => this.commandSelectChange(-1),
    };

    var key = keyboard.mapKeycodeToKey(e.which || e.keyCode);
    if (keyToFuncMap[key] !== undefined) {
      e.preventDefault();
      keyToFuncMap[key]();
    }

    this.updatePrompt(el);
  }

  // -- Shadow hint --

  _updateShadowHint(currentValue, lastCommand) {
    this.shadowEl.innerHTML = '';
    if (!lastCommand.length) return;

    for (const c of allCommandsSorted) {
      if (c.startsWith(lastCommand)) {
        renderShadowHint(this.shadowEl, currentValue, c.substring(lastCommand.length));
        break;
      }
    }
  }

  // -- Tab completion (Linux-style: LCP on first press, cycle on repeats) --

  _handleTab(el, lastCommand, prefixBeforeLast) {
    // Prefix changed -> reset matches
    if (lastCommand !== this._tabLastPrefix ||
        prefixBeforeLast !== this._tabLastFullPrefix) {
      this._tabMatches = null;
      this._tabIndex = -1;
    }

    // Empty input: nothing to complete
    if (lastCommand.length === 0) {
      this._tabLastPrefix = lastCommand;
      this._tabLastFullPrefix = prefixBeforeLast;
      return;
    }

    // Lazily collect matches
    if (this._tabMatches === null) {
      this._tabMatches = allCommandsSorted.filter(c => c.startsWith(lastCommand));
      this._tabIndex = -1;
    }

    const matches = this._tabMatches;

    // No matches: nothing to do
    if (matches.length === 0) {
      this._tabLastFullPrefix = prefixBeforeLast;
      return;
    }

    // Single match: complete fully
    if (matches.length === 1) {
      el.value = prefixBeforeLast + matches[0];
      this.shadowEl.innerHTML = '';
      this._tabIndex = 0;
      this._tabLastPrefix = matches[0];
      this._tabLastFullPrefix = prefixBeforeLast;
      return;
    }

    // Multiple matches
    if (this._tabIndex === -1) {
      // First Tab: try expanding to LCP
      const lcp = longestCommonPrefix(matches);

      if (lcp.length > lastCommand.length) {
        // LCP is longer than input — expand and stay in "first Tab" state
        el.value = prefixBeforeLast + lcp;
        this._tabLastPrefix = lcp;
        const remain = matches[0].substring(lcp.length) || '';
        renderShadowHint(this.shadowEl, el.value, remain);
        this._tabMatches = allCommandsSorted.filter(c => c.startsWith(lcp));
        this._tabIndex = -1;
        this._tabLastFullPrefix = prefixBeforeLast;
        return;
      }

      // LCP equals input — enter the cycle with the first match
      this._tabIndex = 0;
    } else {
      // Repeated Tab: advance to the next match (wrap around)
      this._tabIndex = (this._tabIndex + 1) % matches.length;
    }

    el.value = prefixBeforeLast + matches[this._tabIndex];
    this.shadowEl.innerHTML = '';
    this._tabLastPrefix = matches[this._tabIndex];
    this._tabLastFullPrefix = prefixBeforeLast;
  }

  // -- Shortcut: Ctrl+W / Alt+Backspace — delete the previous word --
  //
  // Bug fix: old code computed lastSpaceIndex from textBeforeCursor.trimEnd()
  // but sliced the original untrimmed string. Backward scan avoids the
  // index mismatch.

  _handleDeleteWord(el) {
    const cursorPos = el.selectionStart;
    const textBeforeCursor = el.value.substring(0, cursorPos);

    // Scan backwards: skip trailing whitespace, then skip the word
    let end = textBeforeCursor.length;
    while (end > 0 && /\s/.test(textBeforeCursor[end - 1])) end--;
    let start = end;
    while (start > 0 && !/\s/.test(textBeforeCursor[start - 1])) start--;

    if (start > 0) {
      el.value = textBeforeCursor.substring(0, start) + el.value.substring(cursorPos);
      el.selectionStart = el.selectionEnd = start;
    } else {
      // No word boundary found, clear to start
      el.value = el.value.substring(cursorPos);
      el.selectionStart = el.selectionEnd = 0;
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
      // Empty input: show a single space with the cursor
      this._setPromptHTML(' ', 0, 1);
      return;
    }

    if (selectionStart === selectionEnd) {
      // No selection: append a space at cursor position for display
      this._setPromptHTML(text + ' ', selectionStart, selectionEnd + 1);
      return;
    }

    if (selectionStart === undefined || selectionEnd === undefined) {
      // I donno what this is for
      this._setPromptHTML(text, Math.max(text.length - 1, 0), text.length);
      return;
    }

    this._setPromptHTML(text, selectionStart, selectionEnd);
  }

  _setPromptHTML(text, selectionStart, selectionEnd) {
    const before = text.substring(0, selectionStart);
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
