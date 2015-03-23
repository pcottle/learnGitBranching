var CasperHelp = require('./casperHelp').CasperHelp;

var visibleIDs = [
  'commandLineHistory',
  'terminal',
  'interfaceWrapper',
  'mainVisSpace',
  'commandLineBar'
];

var selectors = [
  'div.visBackgroundColor',
  'p.commandLine'
];

var doneSelectors = [
  'p.finished'
];

casper.start(
  CasperHelp.getUrlForCommands([
    'git commit',
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperHelp.waits.jsMount, function then() {
      visibleIDs.forEach(function(id) {
        this.test.assertVisible('#' + id);
      }.bind(this));

      selectors.forEach(function(selector) {
        this.test.assertExists(selector);
      }.bind(this));

      this.test.done();
    })
    .waitFor(CasperHelp.waits.allCommandsFinished, function then() {
      doneSelectors.forEach(function(selector) {
        this.test.assertExists(selector);
      }.bind(this));
    });

});

casper.run();
