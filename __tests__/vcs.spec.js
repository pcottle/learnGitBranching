var Command = require('../src/js/models/commandModel').Command;

describe('commands', function() {
  it('replaces . with HEAD correctly', function() {
    var testCases = {
      '.^': 'HEAD^',
      '.': 'HEAD',
      '.~4': 'HEAD~4'
    };

    var c = new Command({rawStr: 'foo'});
    Object.keys(testCases).forEach(function(input) {
      var expected = testCases[input];
      var actual = c.replaceDotWithHead(input);
      expect(actual).toBe(expected);
    }.bind(this));
  });

  it('maps options and general args', function() {
    var testCases = [{
      args: ['.~4', 'HEAD^'],
      options: {
        '--amend': ['.'],
        '-m': ['"oh hai"']
      },
      gitArgs: ['HEAD~4', 'HEAD^'],
      gitOptions: {
        '--amend': ['HEAD'],
        '-m': ['"oh hai"']
      }
    }];

    var c = new Command({rawStr: 'foo'});
    testCases.forEach(function(tCase) {
      c.setOptionsMap(tCase.options);
      c.setGeneralArgs(tCase.args);
      c.mapDotToHead();

      var j = JSON.stringify;
      expect(
        j(c.getGeneralArgs())
      ).toBe(
        j(tCase.gitArgs)
      );

      expect(
        j(c.getOptionsMap())
      ).toBe(
        j(tCase.gitOptions)
      );
    }.bind(this));
  });
});

