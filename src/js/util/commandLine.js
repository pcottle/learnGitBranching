/**
 * Lexing for the in-browser command line.
 *
 * Both the ";" statement splitter and the word tokenizer run through the same
 * scanner so they can never disagree about where a quoted section starts and
 * ends (e.g. `git commit -m "fix; again"` is a single statement).
 *
 * Quoting rules (a small, predictable subset of what a POSIX shell does):
 *   - 'single quotes' keep everything literally up to the next single quote
 *   - "double quotes" keep everything literally, except that \" and \\ are
 *     escapes for a quote / backslash
 *   - a quote only *opens* a quoted section at the start of a word, right
 *     after the "=" of a --long=option, directly behind a short option
 *     (-m"a b"), or straight after another quoted section. Anywhere else it
 *     is an ordinary character, because commit ids such as C2' and C3'' are
 *     perfectly good arguments in this app.
 *   - a quote that is never closed is reported via `unterminated` and the
 *     quote character is treated literally
 */

var WHITESPACE = /\s/;
var LONG_OPTION_WITH_EQUALS = /^--[^=\s]+=$/;
var SHORT_OPTION_CLUSTER = /^-[A-Za-z]+$/;

function isQuote(char) {
  return char === '"' || char === '\'';
}

function mayOpenQuote(word, afterQuotedSection) {
  return afterQuotedSection ||
    word === '' ||
    LONG_OPTION_WITH_EQUALS.test(word) ||
    SHORT_OPTION_CLUSTER.test(word);
}

// reads the quoted section that opens at str[start]. Returns the unquoted
// text and the index just past the closing quote, or null if never closed
function readQuotedSection(str, start) {
  var quote = str[start];
  var value = '';
  for (var i = start + 1; i < str.length; i++) {
    var char = str[i];
    if (char === quote) {
      return { value: value, next: i + 1 };
    }
    if (quote === '"' && char === '\\' &&
        (str[i + 1] === '"' || str[i + 1] === '\\')) {
      value += str[i + 1];
      i++;
      continue;
    }
    value += char;
  }
  return null;
}

/**
 * Scans `str` into statements. Each statement has the raw `text`, the
 * unquoted `tokens` (words), and whether it had an `unterminated` quote.
 * Statements are only split on `separator` (if given) outside of quotes.
 */
function scan(str, separator) {
  var statements = [];
  var tokens = [];
  var word = null; // null means "not currently inside a word"
  var afterQuotedSection = false;
  var unterminated = false;
  var statementStart = 0;

  var endWord = function() {
    if (word !== null) {
      tokens.push(word);
    }
    word = null;
    afterQuotedSection = false;
  };

  var endStatement = function(end) {
    endWord();
    statements.push({
      text: str.slice(statementStart, end),
      tokens: tokens,
      unterminated: unterminated
    });
    tokens = [];
    unterminated = false;
    statementStart = end + 1;
  };

  var i = 0;
  while (i < str.length) {
    var char = str[i];

    if (separator !== undefined && char === separator) {
      endStatement(i);
      i++;
      continue;
    }

    if (WHITESPACE.test(char)) {
      endWord();
      i++;
      continue;
    }

    var current = word === null ? '' : word;
    if (isQuote(char) && mayOpenQuote(current, afterQuotedSection)) {
      var section = readQuotedSection(str, i);
      if (section) {
        word = current + section.value;
        afterQuotedSection = true;
        i = section.next;
        continue;
      }
      unterminated = true;
    }

    word = current + char;
    afterQuotedSection = false;
    i++;
  }
  endStatement(str.length);

  return statements;
}

/**
 * Splits a line like `git commit; git checkout -b "a;b"` into its
 * ";"-separated commands (without consuming ";" that sits inside quotes).
 */
exports.splitStatements = function(str) {
  return scan(str, ';').map(function(statement) {
    return statement.text;
  });
};

/**
 * Breaks a single command into words, removing quotes:
 *   git commit -m "two words"  ->  ['git', 'commit', '-m', 'two words']
 * Returns {tokens: [...], unterminated: boolean}
 */
exports.tokenize = function(str) {
  var statement = scan(str)[0];
  return {
    tokens: statement.tokens,
    unterminated: statement.unterminated
  };
};
