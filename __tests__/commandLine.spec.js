var commandLine = require('../src/js/util/commandLine');
var util = require('../src/js/util');

describe('Command line lexing', function() {
  describe('tokenize', function() {
    var words = function(str) {
      return commandLine.tokenize(str).tokens;
    };

    it('splits on runs of whitespace', function() {
      expect(words('git   commit \t -a')).toEqual(['git', 'commit', '-a']);
    });

    it('returns no words for blank input', function() {
      expect(words('')).toEqual([]);
      expect(words('   ')).toEqual([]);
    });

    it('keeps quoted text together and removes the quotes', function() {
      expect(words('git commit -m "two words"')).toEqual(['git', 'commit', '-m', 'two words']);
      expect(words('git commit -m \'two words\'')).toEqual(['git', 'commit', '-m', 'two words']);
    });

    it('keeps the other kind of quote literal inside quotes', function() {
      expect(words('-m "it\'s"')).toEqual(['-m', 'it\'s']);
      expect(words('-m \'say "hi"\'')).toEqual(['-m', 'say "hi"']);
    });

    it('supports \\" and \\\\ escapes inside double quotes only', function() {
      expect(words('-m "say \\"hi\\""')).toEqual(['-m', 'say "hi"']);
      expect(words('-m "a\\\\b"')).toEqual(['-m', 'a\\b']);
      expect(words('-m "a\\nb"')).toEqual(['-m', 'a\\nb']);
      expect(words('-m \'a\\\'')).toEqual(['-m', 'a\\']);
    });

    it('keeps empty quoted words', function() {
      expect(words('git fetch origin ""')).toEqual(['git', 'fetch', 'origin', '']);
    });

    it('opens quotes after = and after short options', function() {
      expect(words('--message="a b"')).toEqual(['--message=a b']);
      expect(words('-m"a b"')).toEqual(['-ma b']);
      expect(words('"a"\'b c\'')).toEqual(['ab c']);
    });

    it('treats quotes inside a word as ordinary characters', function() {
      expect(words('git checkout C2\'')).toEqual(['git', 'checkout', 'C2\'']);
      expect(words('--solution-ordering C2\'\',C3\'')).toEqual(['--solution-ordering', 'C2\'\',C3\'']);
      expect(words('git rebase C3\'\' C2\'')).toEqual(['git', 'rebase', 'C3\'\'', 'C2\'']);
    });

    it('reports a quote that is never closed', function() {
      var result = commandLine.tokenize('git commit -m "oops');
      expect(result.unterminated).toBe(true);
      expect(result.tokens).toEqual(['git', 'commit', '-m', '"oops']);
      expect(commandLine.tokenize('git commit -m "fine"').unterminated).toBe(false);
    });
  });

  describe('splitStatements', function() {
    it('splits on semicolons', function() {
      expect(commandLine.splitStatements('git commit;git branch foo')).toEqual([
        'git commit',
        'git branch foo'
      ]);
    });

    it('keeps a trailing empty statement like String.split does', function() {
      expect(commandLine.splitStatements('git commit;')).toEqual(['git commit', '']);
      expect(commandLine.splitStatements('')).toEqual(['']);
    });

    it('does not split on semicolons inside quotes', function() {
      expect(commandLine.splitStatements('git commit -m "a; b"; git commit')).toEqual([
        'git commit -m "a; b"',
        ' git commit'
      ]);
      expect(commandLine.splitStatements('echo \'a;b\';ls')).toEqual(['echo \'a;b\'', 'ls']);
    });

    it('is not fooled by apostrophes in commit ids', function() {
      expect(commandLine.splitStatements('git checkout C2\'; git checkout C3\'')).toEqual([
        'git checkout C2\'',
        ' git checkout C3\''
      ]);
    });

    it('still splits after a quote that is never closed', function() {
      expect(commandLine.splitStatements('git commit -m "oops; git commit')).toEqual([
        'git commit -m "oops',
        ' git commit'
      ]);
    });
  });

  describe('util.splitTextCommand', function() {
    var split = function(value) {
      var commands = [];
      util.splitTextCommand(value, function(command) {
        commands.push(command);
      });
      return commands;
    };

    it('trims and unescapes each statement', function() {
      expect(split('  git commit -m "hi"  ; git branch foo')).toEqual([
        'git commit -m "hi"',
        'git branch foo'
      ]);
    });

    it('keeps quoted semicolons inside a single command', function() {
      expect(split('git commit -m "a; b";git commit')).toEqual([
        'git commit -m "a; b"',
        'git commit'
      ]);
    });

    it('drops empty statements after the first', function() {
      expect(split('git commit;;  ;')).toEqual(['git commit']);
      expect(split('')).toEqual(['']);
    });
  });
});
