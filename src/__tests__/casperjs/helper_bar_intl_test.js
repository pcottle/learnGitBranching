var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrl(),
  function() {

    casper.waitFor(CasperUtils.waits.jsMount)
    .then(CasperUtils.asserts.visibleSelectors([
      'a.intl',
      'a.commands',
      'a.fb',
      'div.helperBar'
    ]))
    .then(CasperUtils.screenshot.entirePage)
    .then(function() {
      this.mouse.click('a.intl');
    })
    .waitFor(CasperUtils.waits.selectorVisible(
      'a.english'
    ))
    .wait(1000)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.visibleSelectors([
      'a.english',
      'a.korean',
      'a.japanese',
      'a.simpchinese'
    ]))
    .then(function() {
      this.mouse.click('a.japanese');
    })
    .wait(500)
    .then(function() {
      // Successfully changed locale
      this.test.assertEvalEquals(function() {
        return debug_Intl_getLocale();
      }, 'ja');
    })
    .then(CasperUtils.testDone);
}).run();

