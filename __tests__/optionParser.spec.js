var OptionParser = require('../src/js/commands/optionParser');
var Commands = require('../src/js/commands');

var specs = OptionParser.normalizeOptions([
  '--amend',
  { names: ['-a', '--all'] },
  { names: ['-m', '--message'], args: 1 },
  { names: ['--maybe'], args: '?' },
  { names: ['-n'] }
]);

var parse = function(words) {
  return OptionParser.parseArguments(specs, words);
};

describe('Option parser', function() {
  describe('normalizeOptions', function() {
    it('treats plain strings as flags', function() {
      expect(OptionParser.normalizeOptions(['-a', '--all'])).toEqual([
        { names: ['-a'], args: 0 },
        { names: ['--all'], args: 0 }
      ]);
    });

    it('handles commands without options', function() {
      expect(OptionParser.normalizeOptions(undefined)).toEqual([]);
    });

    it('rejects duplicate names, bad names and bad arities', function() {
      expect(function() {
        OptionParser.normalizeOptions(['-a', { names: ['-a', '--all'] }]);
      }).toThrow();
      expect(function() {
        OptionParser.normalizeOptions(['a']);
      }).toThrow();
      expect(function() {
        OptionParser.normalizeOptions(['-']);
      }).toThrow();
      expect(function() {
        OptionParser.normalizeOptions([{ names: [] }]);
      }).toThrow();
      expect(function() {
        OptionParser.normalizeOptions([{ names: ['-a'], args: 2 }]);
      }).toThrow();
    });

    it('is happy with every declared git and hg command', function() {
      var optionMap = Commands.commands.getOptionMap();
      expect(Object.keys(optionMap.git).length).toBeGreaterThan(10);
      expect(Object.keys(optionMap.hg).length).toBeGreaterThan(5);
    });
  });

  describe('flags and positionals', function() {
    it('collects positionals in order', function() {
      var result = parse(['a', 'b', 'c']);
      expect(result.args).toEqual(['a', 'b', 'c']);
      expect(result.options).toEqual({});
      expect(result.error).toBe(null);
    });

    it('never lets a flag swallow the word after it', function() {
      var result = parse(['--amend', 'origin', 'main']);
      expect(result.args).toEqual(['origin', 'main']);
      expect(result.options['--amend']).toEqual([]);
    });

    it('records every alias of an option', function() {
      var result = parse(['--all']);
      expect(result.options['-a']).toEqual([]);
      expect(result.options['--all']).toEqual([]);
      expect(result.options['-a']).toBe(result.options['--all']);
    });

    it('omits options that were not given', function() {
      expect(parse(['-a']).options['-n']).toBeUndefined();
    });

    it('lets options and positionals interleave', function() {
      var result = parse(['x', '-a', 'y', '--amend', 'z']);
      expect(result.args).toEqual(['x', 'y', 'z']);
      expect(Object.keys(result.options).sort()).toEqual(['--all', '--amend', '-a']);
    });

    it('treats a lone dash as a positional argument', function() {
      expect(parse(['-']).args).toEqual(['-']);
    });

    it('treats everything after -- as positional', function() {
      var result = parse(['-a', '--', '-n', '--amend', '--']);
      expect(result.args).toEqual(['-n', '--amend', '--']);
      expect(Object.keys(result.options)).toEqual(['-a', '--all']);
    });
  });

  describe('values', function() {
    it('reads a value from the next word', function() {
      var result = parse(['-m', 'hello', 'world']);
      expect(result.options['-m']).toEqual(['hello']);
      expect(result.options['--message']).toEqual(['hello']);
      expect(result.args).toEqual(['world']);
    });

    it('reads --long=value and attached short values', function() {
      expect(parse(['--message=hello']).options['-m']).toEqual(['hello']);
      expect(parse(['--message=']).options['-m']).toEqual(['']);
      expect(parse(['--message=a=b']).options['-m']).toEqual(['a=b']);
      expect(parse(['-mhello']).options['-m']).toEqual(['hello']);
      expect(parse(['-m-x']).options['-m']).toEqual(['-x']);
    });

    it('accumulates repeated options', function() {
      expect(parse(['-m', 'a', '--message', 'b']).options['-m']).toEqual(['a', 'b']);
      expect(parse(['-a', '-a']).options['-a']).toEqual([]);
    });

    it('requires a value', function() {
      var result = parse(['-m']);
      expect(result.error).toBeTruthy();
      expect(result.error.get('msg')).toContain('"-m"');
      expect(parse(['--message']).error.get('msg')).toContain('"--message"');
    });

    it('does not take another option as a detached value', function() {
      expect(parse(['-m', '-a']).error).toBeTruthy();
      expect(parse(['-m', '--amend']).error).toBeTruthy();
      expect(parse(['-m', '-a']).options['-a']).toBeUndefined();
    });

    it('rejects values given to flags', function() {
      var result = parse(['--amend=yes']);
      expect(result.error.get('msg')).toContain('"--amend"');
    });

    it('optionally takes a value', function() {
      expect(parse(['--maybe']).options['--maybe']).toEqual([]);
      expect(parse(['--maybe', 'x']).options['--maybe']).toEqual(['x']);
      expect(parse(['--maybe', '-a']).options['--maybe']).toEqual([]);
      expect(parse(['--maybe=x']).options['--maybe']).toEqual(['x']);
      var result = parse(['--maybe', 'x', 'y']);
      expect(result.args).toEqual(['y']);
    });
  });

  describe('short option clusters', function() {
    it('splits clusters of flags', function() {
      var result = parse(['-an']);
      expect(Object.keys(result.options).sort()).toEqual(['--all', '-a', '-n']);
    });

    it('lets the last option of a cluster take a value', function() {
      var result = parse(['-am', 'hello']);
      expect(result.options['-a']).toEqual([]);
      expect(result.options['-m']).toEqual(['hello']);
      expect(result.args).toEqual([]);

      expect(parse(['-amhello']).options['-m']).toEqual(['hello']);
    });

    it('requires a value for a trailing value option', function() {
      expect(parse(['-am']).error).toBeTruthy();
      expect(parse(['-am', '-n']).error).toBeTruthy();
    });

    it('reports unsupported options in a cluster', function() {
      var result = parse(['-az']);
      expect(result.error.get('msg')).toContain('"-az"');
    });

    it('does not treat a value-taking option as a cluster member', function() {
      // -m swallows the rest of the word, so the n is part of the value
      expect(parse(['-mn']).options['-m']).toEqual(['n']);
      expect(parse(['-mn']).options['-n']).toBeUndefined();
    });
  });

  describe('errors', function() {
    it('reports unsupported long and short options', function() {
      expect(parse(['--nope']).error.get('msg')).toContain('"--nope"');
      expect(parse(['-z']).error.get('msg')).toContain('"-z"');
      expect(parse(['--nope=1']).error.get('msg')).toContain('"--nope"');
    });

    it('does not mistake inherited object keys for options', function() {
      expect(parse(['--constructor']).error).toBeTruthy();
      expect(parse(['--__proto__']).error).toBeTruthy();
    });
  });
});
