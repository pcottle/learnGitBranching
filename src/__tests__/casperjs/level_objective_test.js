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
      this.mouse.click('#show-objective');
    })
    .then(CasperUtils.waits.selectorVisible(
      'p.commandLine.processing'
    ))
    .wait(1000)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.visibleSelectors([
      'div.inside',
      'div.modalTerminal'
    ]))
    .then(function() {
      var text = this.evaluate(function() {
        return document.querySelector('div.inside > div > p').innerText;
      });
      this.test.assertEquals(
        text,
        "Go ahead and try it out on your own! After this " +
          "window closes, make two commits to complete the level"
      );
    })
    .then(CasperUtils.testDone);
}).run();

