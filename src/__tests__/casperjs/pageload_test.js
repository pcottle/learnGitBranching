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

    casper.waitFor(
      CasperUtils.waits.jsMount
    )

    .then(CasperUtils.multiAssert(
      CasperUtils.asserts.visibleIDs(visibleIDs),
      CasperUtils.asserts.visibleSelectors(selectors)
    ))

    .waitFor(CasperUtils.waits.allCommandsFinished)

    .then(
      CasperUtils.asserts.visibleSelectors(doneSelectors)
    )

    .then(CasperUtils.testDone);

}).run();
