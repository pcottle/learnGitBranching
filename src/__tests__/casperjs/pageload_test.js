var CasperUtils = require('./casperUtils').CasperUtils;

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
  CasperUtils.getUrlForCommands([
    'git commit',
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount, function then() {
      visibleIDs.forEach(function(id) {
        this.test.assertVisible('#' + id);
      }.bind(this));

      selectors.forEach(function(selector) {
        this.test.assertExists(selector);
      }.bind(this));

    })
    .waitFor(CasperUtils.waits.allCommandsFinished, function then() {
      doneSelectors.forEach(function(selector) {
        this.test.assertExists(selector);
      }.bind(this));
    })
    .then(function() {
      this.test.done();
    });

});

casper.run();
