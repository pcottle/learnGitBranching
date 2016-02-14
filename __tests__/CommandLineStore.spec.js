var CommandLineActions = require('../src/js/actions/CommandLineActions');
var CommandLineStore = require('../src/js/stores/CommandLineStore');

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
    var newCommand = 'echo "yo dude";';
    CommandLineActions.submitCommand(newCommand);

    expect(CommandLineStore.getCommandHistoryLength())
      .toEqual(2);

    expect(CommandLineStore.getCommandHistory()[0])
      .toEqual(newCommand);
    expect(CommandLineStore.getCommandHistory()[1])
      .toEqual(command);
  });

  it('slices after max length', function() {
    var maxLength = CommandLineStore.getMaxHistoryLength();
    var numOver = 10;
    for (var i = 0; i < maxLength + numOver; i++) {
      CommandLineActions.submitCommand('commandNum' + i);
    }
    var numNow = 11 + numOver;
    expect(
      CommandLineStore.getCommandHistoryLength()
    ).toEqual(numNow);

    expect(
      CommandLineStore.getCommandHistory()[0]
    ).toEqual('commandNum109');

    expect(
      CommandLineStore.getCommandHistory()[numNow - 1]
    ).toEqual('commandNum89');
  });

});
