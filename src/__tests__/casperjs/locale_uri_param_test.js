var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrlForCommands([
    'locale fr_FR'
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');
    casper.waitFor(CasperUtils.waits.jsMount)
    .then(CasperUtils.screenshot.entirePage)
    .wait(3000)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      // The title bar on command line history
      'span[data-intl="learn-git-branching"]',
      "APRENDÉ A BRANCHEAR EN GIT"
    ))
    .then(CasperUtils.testDone);

}).run();
