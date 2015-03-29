var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrlWithQueryParams({
    locale: 'fr_FR',
  }),
  function() {
    this.test.assertTitle('Learn Git Branching');
    casper.waitFor(CasperUtils.waits.jsMount)
    .then(CasperUtils.asserts.intlKeyReturns(
      'learn-git-branching',
      "Apprenez Git Branching"
    ))
    .then(CasperUtils.asserts.selectorContainsText(
      'span[data-intl="learn-git-branching"]',
      "APPRENEZ GIT BRANCHING"
    ))
    .then(CasperUtils.testDone);

}).run();
