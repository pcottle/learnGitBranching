var CommandLineActions = require('../actions/CommandLineActions');
var CommandLineStore = require('../stores/CommandLineStore');

describe('this store', function() {

  it('starts with no entries', function() {
    expect(CommandLineStore.getCommandHistoryLength())
      .toEqual(0);
  });

  it('receives new commands', function() {
    var command = 'git commit; git checkout HEAD';
    CommandLineActions.submitCommand(command);

    expect(CommandLineStore.getCommandHistoryLength())
      .toEqual(1);

    expect(CommandLineStore.getCommandHistory()[0])
      .toEqual(command);
  });

});
