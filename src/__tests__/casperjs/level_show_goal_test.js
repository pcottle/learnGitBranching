var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrlForCommands([
    'level intro1 --noIntroDialog --noStartCommand',
  ]),
  function() {
    casper.waitFor(CasperUtils.waits.jsMount)
    .waitFor(CasperUtils.waits.allCommandsFinished)
    .then(CasperUtils.asserts.visibleSelectors([
      'p.commandLine.finished',
      'div.levelNameWrapper'
    ]))
    .then(CasperUtils.screenshot.entirePage)
    .then(function() {
      this.mouse.click('#show-goal');
    })
    .wait(1000)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.visibleSelector('p.helperText'))
    .then(function() {
      var text = this.evaluate(function() {
        return document.querySelector('p.helperText').innerText;
      });
      this.test.assertEquals(
        text,
        'You can hide this window with "hide goal"'
      );
    })
    .then(CasperUtils.testDone);
}).run();

