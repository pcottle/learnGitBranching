var _ = require('underscore');

var Command = require('../models/commandModel').Command;

describe('commands', function() {
  it('replaces . with HEAD correctly', function() {
    var testCases = {
      '.^': 'HEAD^',
      '.': 'HEAD',
      '.~4': 'HEAD~4'
    };

    var c = new Command({rawStr: 'foo'});
    _.each(testCases, function(expected, input) {
      var actual = c.replaceDotWithHead(input);
      expect(actual).toBe(expected);
    });
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
    _.each(testCases, function(tCase) {
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
    });
  });
});

