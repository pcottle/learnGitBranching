var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrlForCommands([
    'locale fr_FR',
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)
    .then(CasperUtils.waits.allCommandsFinished)
    .then(CasperUtils.asserts.intlKeyReturns(
      'learn-git-branching',
      "Apprenez Git Branching"
    ))
    .then(CasperUtils.asserts.selectorContainsText(
      'span[data-intl="learn-git-branching"]',
      "APPRENEZ GIT BRANCHING"
    ))
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.testDone);

}).run();
