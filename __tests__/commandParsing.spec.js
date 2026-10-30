var Command = require('../src/js/models/commandModel').Command;
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/graph/treeCompare');

var parse = function(rawStr) {
  return new Command({ rawStr: rawStr });
};

var errorMessage = function(command) {
  var error = command.get('error');
  return error ? error.get('msg') : null;
};

var run = function(commands) {
  var headless = new HeadlessGit();
  return headless.sendCommand(commands).then(function() {
    return headless;
  });
};

// two ways of typing the same thing should leave the repo in the same state
var expectSameTree = function(first, second) {
  return Promise.all([run(first), run(second)]).then(function(results) {
    expect(TreeCompare.compareTrees(
      results[0].gitEngine.exportTree(),
      results[1].gitEngine.exportTree()
    )).toBe(true, '"' + first + '" should match "' + second + '"');
  });
};

describe('Command parsing', function() {
  describe('options that take no value', function() {
    it('leave the word after them as an argument', function() {
      var command = parse('git push --force origin main');
      expect(errorMessage(command)).toBe(null);
      expect(command.getGeneralArgs()).toEqual(['origin', 'main']);
      expect(command.getOptionsMap()['--force']).toEqual([]);
    });

    it('apply to every git command that has flags', function() {
      var cases = {
        'git reset --hard HEAD~1': ['HEAD~1'],
        'git restore --staged app.js': ['app.js'],
        'git merge --no-ff side': ['side'],
        'git merge --squash side': ['side'],
        'git branch -d a b': ['a', 'b'],
        'git branch -m old new': ['old', 'new'],
        'git branch -f main C1': ['main', 'C1'],
        'git tag -d v1 v2': ['v1', 'v2'],
        'git switch --detach C1': ['C1'],
        'git switch --track -c foo o/main': ['o/main'],
        'git rebase -i main side': ['main', 'side'],
        'git rebase -p main side': ['main', 'side'],
        'git pull --rebase origin main': ['origin', 'main'],
        'git fetch --force origin main': ['origin', 'main'],
        'git mergeMR --delete-after-merge feat main': ['feat', 'main']
      };
      Object.keys(cases).forEach(function(rawStr) {
        var command = parse(rawStr);
        expect(errorMessage(command)).toBe(null, rawStr);
        expect(command.getGeneralArgs()).toEqual(cases[rawStr], rawStr);
      });
    });
  });

  describe('options that take a value', function() {
    it('read the next word and leave the rest as arguments', function() {
      var command = parse('git checkout -b feature main');
      expect(command.getOptionsMap()['-b']).toEqual(['feature']);
      expect(command.getGeneralArgs()).toEqual(['main']);

      command = parse('git rebase --onto main C3 C5');
      expect(command.getOptionsMap()['--onto']).toEqual(['main']);
      expect(command.getGeneralArgs()).toEqual(['C3', 'C5']);

      command = parse('git branch -u o/main side');
      expect(command.getOptionsMap()['-u']).toEqual(['o/main']);
      expect(command.getGeneralArgs()).toEqual(['side']);
    });

    it('accept --option=value', function() {
      var command = parse('git rebase --onto=main C3 C5');
      expect(errorMessage(command)).toBe(null);
      expect(command.getOptionsMap()['--onto']).toEqual(['main']);
      expect(command.getGeneralArgs()).toEqual(['C3', 'C5']);
    });

    it('report a missing value', function() {
      ['git commit -m', 'git checkout -b', 'git rebase --onto', 'hg rebase -d'].forEach(function(rawStr) {
        expect(errorMessage(parse(rawStr))).toContain('requires a value', rawStr);
      });
    });

    it('allow the interactive-test hook to go without a value', function() {
      var command = parse('git rebase -i main --interactive-test');
      expect(errorMessage(command)).toBe(null);
      expect(command.getOptionsMap()['--interactive-test']).toEqual([]);
      expect(command.getGeneralArgs()).toEqual(['main']);

      command = parse('git rebase -i main --interactive-test C3,C1');
      expect(command.getOptionsMap()['--interactive-test']).toEqual(['C3,C1']);
      expect(command.getGeneralArgs()).toEqual(['main']);
    });

    it('read apostrophes in commit ids as part of the id', function() {
      var command = parse('git rebase -i HEAD~2 --solution-ordering C2\'\',C3\'');
      expect(command.getOptionsMap()['--solution-ordering']).toEqual(['C2\'\',C3\'']);
      expect(command.getGeneralArgs()).toEqual(['HEAD~2']);
    });
  });

  describe('aliases and clusters', function() {
    it('expose every spelling of an option', function() {
      var options = parse('git switch --create foo').getOptionsMap();
      expect(options['-c']).toEqual(['foo']);
      expect(options['--create']).toEqual(['foo']);

      options = parse('git push -f').getOptionsMap();
      expect(options['--force']).toEqual([]);
      expect(options['-f']).toEqual([]);
    });

    it('split -am into -a and -m', function() {
      var command = parse('git commit -am "hello world"');
      expect(errorMessage(command)).toBe(null);
      expect(command.getOptionsMap()['-a']).toEqual([]);
      expect(command.getOptionsMap()['-m']).toEqual(['hello world']);
      expect(command.getGeneralArgs()).toEqual([]);
    });
  });

  describe('quoting', function() {
    it('keeps a quoted message together without its quotes', function() {
      expect(parse('git commit -m "two words"').getOptionsMap()['-m']).toEqual(['two words']);
      expect(parse('git commit -m \'two words\'').getOptionsMap()['-m']).toEqual(['two words']);
      expect(parse('git commit --message="two words"').getOptionsMap()['-m']).toEqual(['two words']);
    });

    it('reports an unterminated quote', function() {
      expect(errorMessage(parse('git commit -m "oops'))).toContain('never closed');
    });
  });

  describe('errors', function() {
    it('reports unsupported options', function() {
      expect(errorMessage(parse('git commit --bogus'))).toContain('"--bogus" is not supported');
      expect(errorMessage(parse('git commit -z'))).toContain('"-z" is not supported');
      expect(errorMessage(parse('hg commit --bogus'))).toContain('"--bogus" is not supported');
    });

    it('reports a value given to a flag', function() {
      expect(errorMessage(parse('git commit --amend=1'))).toContain('does not take a value');
    });

    it('stops at the first problem', function() {
      var command = parse('git commit --bogus -m');
      expect(errorMessage(command)).toContain('"--bogus"');
    });
  });

  describe('mercurial', function() {
    it('reads -r as a value', function() {
      var command = parse('hg book -r C0 asd');
      expect(command.getOptionsMap()['-r']).toEqual(['C0']);
      expect(command.getGeneralArgs()).toEqual(['asd']);
    });

    it('lets -d be a flag on bookmark', function() {
      var command = parse('hg bookmark -d foo');
      expect(command.getOptionsMap()['-d']).toEqual([]);
      expect(command.getGeneralArgs()).toEqual(['foo']);
    });
  });

  describe('end to end', function() {
    it('treats -f like --force on push, fetch and pull', function() {
      return expectSameTree(
        'git commit; git fakeCreateRemote; git reset HEAD~1; git push -f origin main',
        'git commit; git fakeCreateRemote; git reset HEAD~1; git push --force origin main'
      );
    });

    it('lets flags go before or after positional arguments', function() {
      return Promise.all([
        expectSameTree(
          'git commit; git branch side; git merge side --no-ff',
          'git commit; git branch side; git merge --no-ff side'
        ),
        expectSameTree(
          'git branch -f main C0; git branch side C0',
          'git branch side C0; git branch main C0 -f'
        ),
        expectSameTree(
          'git commit; git reset --hard C0',
          'git commit; git reset C0 --hard'
        )
      ]);
    });

    it('reads options for start points regardless of position', function() {
      return expectSameTree(
        'git checkout -b feature C0',
        'git checkout C0 -b feature'
      );
    });

    it('keeps the remote when --delete-after-merge comes first', function() {
      return expectSameTree(
        'git fakeCreateRemote; git branch feat; git mergeMR feat main --delete-after-merge',
        'git fakeCreateRemote; git branch feat; git mergeMR --delete-after-merge feat main'
      );
    });

    it('uses the commit message from -m, -am and --message', function() {
      return Promise.all([
        'git commit -m "first message"',
        'git commit -am \'first message\'',
        'git commit --message="first message"',
        'git commit -m"first message"'
      ].map(function(command) {
        return run(command).then(function(headless) {
          var commit = headless.gitEngine.getCommitFromRef('HEAD');
          expect(commit.get('commitMessage')).toBe('first message', command);
        });
      }));
    });

    it('does not split a commit message on a semicolon in quotes', function() {
      return run('git commit -m "a; b"; git commit').then(function(headless) {
        expect(Object.keys(headless.gitEngine.exportTree().commits).length).toBe(4);
        var parent = headless.gitEngine.getCommitFromRef('HEAD~1');
        expect(parent.get('commitMessage')).toBe('a; b');
      });
    });

    it('does not run a command that failed to parse', function() {
      return expectSameTree(
        'git commit --bogus; git commit -am; git commit',
        'git commit'
      );
    });

    it('still switches back with - as a plain argument', function() {
      return expectSameTree(
        'git commit; git checkout C0; git checkout -',
        'git commit'
      ).then(function() {
        return expectSameTree(
          'git commit; git switch -c side; git switch main; git switch -',
          'git commit; git switch -c side'
        );
      });
    });

    it('moves a branch with hg bookmark -r in either order', function() {
      return expectSameTree(
        'hg book -r C0 asd',
        'hg book asd -r C0'
      );
    });
  });
});
