var CasperUtils = require('./casperUtils').CasperUtils;

CasperUtils.start(casper,
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
    .wait(500)
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
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      'span[data-intl="learn-git-branching"]',
      "日本語版リポジトリ"
    ))
    .then(CasperUtils.testDone);
}).run();

