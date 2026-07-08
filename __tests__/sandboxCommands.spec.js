var SandboxCommands = require('../src/js/sandbox/commands');
var GitCommands = require('../src/js/git/commands');

describe('Sandbox Commands', function() {
  describe('help {command}', function() {
    var getHelpTuple = function() {
      return SandboxCommands.instantCommands.filter(function(tuple) {
        return tuple[2] === 'help {command}';
      })[0];
    };

    it('is registered as an instant command', function() {
      expect(getHelpTuple()).toBeTruthy();
    });

    it('documents git commands with description, options and docs link', function() {
      var lines = SandboxCommands.getCommandHelpLines('commit');
      var joined = lines.join('\n');
      expect(joined).toContain('git commit');
      expect(joined).toContain('git-scm.com/docs/git-commit');
      expect(joined).toContain('--amend');
    });

    it('works with an explicit "git" prefix too', function() {
      var lines = SandboxCommands.getCommandHelpLines('git commit');
      expect(lines.join('\n')).toContain('git commit');
    });

    it('skips the docs link for custom teaching commands', function() {
      var lines = SandboxCommands.getCommandHelpLines('fakeTeamwork');
      var joined = lines.join('\n');
      expect(joined).toContain('git fakeTeamwork');
      expect(joined).not.toContain('git-scm.com');
    });

    it('documents sandbox commands like importTreeNow', function() {
      var lines = SandboxCommands.getCommandHelpLines('importTreeNow');
      var joined = lines.join('\n');
      expect(joined).toContain('importTreeNow');
      expect(joined).toContain('Import a tree immediately');
    });

    it('documents instant commands like echo', function() {
      var lines = SandboxCommands.getCommandHelpLines('echo');
      expect(lines.join('\n')).toContain('echo out a string');
    });

    it('returns null for unknown commands', function() {
      expect(SandboxCommands.getCommandHelpLines('lolwat')).toBe(null);
    });

    it('does not intercept the reserved help forms', function() {
      var regex = getHelpTuple()[0];
      expect(regex.test('help')).toBe(false);
      expect(regex.test('help general')).toBe(false);
      expect(regex.test('help level')).toBe(false);
      expect(regex.test('help goal')).toBe(false);
      expect(regex.test('help builder')).toBe(false);
      expect(regex.test('?')).toBe(false);

      expect(regex.test('help commit')).toBe(true);
      expect(regex.test('help git commit')).toBe(true);
      expect(regex.test('help undo')).toBe(true);
    });

    it('registers a "git help {command}" form too', function() {
      var tuple = SandboxCommands.instantCommands.filter(function(t) {
        return t[0].test('git help commit');
      })[0];
      expect(tuple).toBeTruthy();
    });

    it('leaves bare "git" and "git help" to the general git help', function() {
      var generalHelp = GitCommands.instantCommands.filter(function(t) {
        return t[0].test('git help');
      })[0];
      expect(generalHelp).toBeTruthy();
      expect(generalHelp[0].test('git')).toBe(true);
      // but the specific form should no longer be swallowed by it
      expect(generalHelp[0].test('git help commit')).toBe(false);
    });
  });

  describe('show solution', function() {
    // NOTE: we can't require('../level') here -- it pulls in JSX views that the
    // jasmine harness doesn't transpile -- so we exercise the level regexMap
    // through the same genParseCommand helper the real parse waterfall uses.
    var util = require('../src/js/util');
    var levelRegexMap = require('../src/js/level/levelRegexMap').regexMap;
    var levelParse = util.genParseCommand(levelRegexMap, 'processLevelCommand');

    it('parses as a level command routed to processLevelCommand', function() {
      var result = levelParse('show solution');
      expect(result).toBeTruthy();
      expect(result.toSet.eventName).toBe('processLevelCommand');
      expect(result.toSet.method).toBe('show solution');
    });

    it('is documented as writing the solution into the command box', function() {
      var lines = SandboxCommands.getCommandHelpLines('show solution');
      expect(lines).toBeTruthy();
      expect(lines.join('\n')).toContain('command box');
    });
  });
});
