var CasperUtils = require('./casperUtils').CasperUtils;

CasperUtils.start(casper,
  CasperUtils.getUrl(),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)
    .wait(300)
    .then(CasperUtils.enterCommand('git commit'))
    .wait(800)
    .then(CasperUtils.screenshot.entirePage)
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Up);
    })
    .wait(700)
    .then(CasperUtils.screenshot.entirePage)
    // Our command got remembered
    .then(CasperUtils.asserts.selectorMatchesRegex(
      '#commandLineBar p.command',
      // some weird whitespace conversion of non-breaking space
      /git\scommit/g
    ))
    .then(CasperUtils.testDone);
}).run();
