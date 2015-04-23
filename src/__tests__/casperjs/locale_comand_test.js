var CasperUtils = require('./casperUtils').CasperUtils;

CasperUtils.start(casper,
  CasperUtils.getUrlForCommands([
    'locale fr_FR',
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)
    .waitFor(CasperUtils.waits.allCommandsFinished)
    .then(CasperUtils.asserts.selectorContainsText(
      'span[data-intl="learn-git-branching"]',
      "APPRENEZ GIT BRANCHING"
    ))
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.testDone);

}).run();
