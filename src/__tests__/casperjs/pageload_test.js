var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrlForCommands([
    'git commit',
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)

    .then(CasperUtils.multiAssert(
      CasperUtils.asserts.visibleIDs([
        'commandLineHistory',
        'terminal',
        'interfaceWrapper',
        'mainVisSpace',
        'commandLineBar'
      ]),
      CasperUtils.asserts.visibleSelectors([
        'div.visBackgroundColor',
        'p.commandLine'
      ])
    ))

    .waitFor(CasperUtils.waits.allCommandsFinished)

    .then(
      CasperUtils.asserts.visibleSelectors(['p.finished'])
    )

    .then(CasperUtils.testDone);

}).run();
