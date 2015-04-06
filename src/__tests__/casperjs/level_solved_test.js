var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrlForCommands([
    'level intro1 --noIntroDialog --noStartCommand',
    'show goal',
    'git commit',
    'git commit'
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');
    casper.waitFor(CasperUtils.waits.jsMount)
    .wait(2000)
    .then(CasperUtils.screenshot.entirePage)
    .waitFor(CasperUtils.waits.allCommandsFinished)
    // Have to wait for balls to stop bouncing
    .wait(5000)
    .wait(5000)
    .wait(5000)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView div.inside h2',
      "Great Job!!"
    ))
    .then(CasperUtils.testDone);

}).run();
