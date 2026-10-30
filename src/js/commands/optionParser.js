/**
 * A small getopt-style option parser for the simulated git / hg commands.
 *
 * Commands declare their options in their config (see git/commands.js):
 *
 *   options: [
 *     '--amend',                                        // a flag
 *     { names: ['-a', '--all'] },                       // a flag with aliases
 *     { names: ['-m', '--message'], args: 1 },          // takes a value
 *     { names: ['--interactive-test'], args: '?' }      // optional value
 *   ]
 *
 * and the parser turns the words that follow "git <command>" into
 *   - `options`: a map of option name -> array of values. A flag maps to
 *     `[]`, and every alias of an option maps to the *same* array, so callers
 *     can look an option up by any of its names. Options that were not given
 *     are simply absent from the map. Repeating an option appends to its array.
 *   - `args`: the remaining positional arguments, in order.
 *   - `error`: a CommandProcessError (or null) for unknown options and
 *     missing / unexpected values.
 *
 * Supported syntax, matching what people expect from a real CLI:
 *   --name value, --name=value, -n value, -nvalue
 *   -ab    (clusters of short flags, optionally ending in one that takes a value)
 *   --     (everything after it is a positional argument)
 *   -      (a lone dash is a positional argument, e.g. `git switch -`)
 * Options and positional arguments may be interleaved. A detached value is
 * the next word, but only if that word does not look like another option
 * (`git commit -m -a` is an error, not a commit with the message "-a"); a
 * value that starts with "-" can be attached instead (--message=-a, -m-a).
 * With `args: 1` a missing value is an error, with `args: '?'` it is not.
 */
var intl = require('../intl');
var Errors = require('../util/errors');

var CommandProcessError = Errors.CommandProcessError;

var ARGS_NONE = 0;
var ARGS_ONE = 1;
var ARGS_OPTIONAL = '?';

/**
 * Turns the declarative `options` of a command config into a list of
 * {names: [...], args: 0 | 1 | '?'} specs.
 */
function normalizeOptions(declared) {
  var seen = {};
  return (declared || []).map(function(option) {
    var spec = (typeof option === 'string') ? { names: [option] } : option;
    var args = spec.args === undefined ? ARGS_NONE : spec.args;
    if ([ARGS_NONE, ARGS_ONE, ARGS_OPTIONAL].indexOf(args) === -1) {
      throw new Error('Unsupported option arity ' + args);
    }
    if (!spec.names || !spec.names.length) {
      throw new Error('Every option needs at least one name');
    }

    spec.names.forEach(function(name) {
      if (!/^-{1,2}[^-\s=][^\s=]*$/.test(name)) {
        throw new Error('Invalid option name ' + name);
      }
      if (seen[name]) {
        throw new Error('Option ' + name + ' is declared twice');
      }
      seen[name] = true;
    });
    return { names: spec.names.slice(), args: args };
  });
}

function buildLookup(specs) {
  var lookup = Object.create(null);
  specs.forEach(function(spec) {
    spec.names.forEach(function(name) {
      lookup[name] = spec;
    });
  });
  return lookup;
}

function makeError(msg) {
  return new CommandProcessError({ msg: msg });
}

/**
 * @param {Array} specs - the result of normalizeOptions
 * @param {string[]} words - everything after "git <command>"
 * @returns {{options: Object, args: string[], error: (Error|null)}}
 */
function parseArguments(specs, words) {
  var lookup = buildLookup(specs);
  var options = {};
  var args = [];
  var i;

  var record = function(spec, values) {
    var list = options[spec.names[0]];
    if (!list) {
      list = [];
      spec.names.forEach(function(name) {
        options[name] = list;
      });
    }
    values.forEach(function(value) {
      list.push(value);
    });
  };

  var result = function(error) {
    return { options: options, args: args, error: error || null };
  };

  var looksLikeOption = function(word) {
    return word.length > 1 && word[0] === '-';
  };

  // records `spec`, reading its value (if it takes one) from `attached` or
  // from the next word. Returns an error if the value is missing.
  var recordWithValue = function(spec, displayName, attached) {
    if (spec.args === ARGS_NONE) {
      if (attached !== null) {
        return makeError(intl.str('option-takes-no-value', { option: displayName }));
      }
      record(spec, []);
    } else if (attached !== null) {
      record(spec, [attached]);
    } else {
      var upcoming = words[i + 1];
      if (upcoming !== undefined && !looksLikeOption(upcoming)) {
        record(spec, [upcoming]);
        i++;
      } else if (spec.args === ARGS_OPTIONAL) {
        record(spec, []);
      } else {
        return makeError(intl.str('option-requires-value', { option: displayName }));
      }
    }
    return null;
  };

  var error;
  for (i = 0; i < words.length; i++) {
    var word = words[i];

    if (word === '--') {
      args = args.concat(words.slice(i + 1));
      break;
    }
    if (!looksLikeOption(word)) {
      args.push(word);
      continue;
    }

    var isLong = word.slice(0, 2) === '--';
    var equalsAt = word.indexOf('=');
    var hasAttached = isLong && equalsAt !== -1;
    var name = hasAttached ? word.slice(0, equalsAt) : word;
    var attached = hasAttached ? word.slice(equalsAt + 1) : null;
    var spec = lookup[name];

    if (spec) {
      // a complete, declared option name
      error = recordWithValue(spec, name, attached);
      if (error) {
        return result(error);
      }
      continue;
    }

    if (isLong) {
      return result(makeError(intl.str('option-not-supported', { option: name })));
    }

    // a cluster of short options like -am; the last one may take a value,
    // which is either the rest of the word (-mfoo) or the next word
    for (var j = 1; j < word.length; j++) {
      var shortName = '-' + word[j];
      var shortSpec = lookup[shortName];
      if (!shortSpec) {
        return result(makeError(intl.str('option-not-supported', { option: word })));
      }
      var rest = word.slice(j + 1);
      if (shortSpec.args === ARGS_NONE) {
        record(shortSpec, []);
        continue;
      }
      error = recordWithValue(shortSpec, shortName, rest || null);
      if (error) {
        return result(error);
      }
      break;
    }
  }

  return result();
}

exports.normalizeOptions = normalizeOptions;
exports.parseArguments = parseArguments;
