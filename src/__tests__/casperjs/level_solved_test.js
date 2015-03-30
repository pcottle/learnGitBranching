var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrlForCommands([
    'level intro1 --noIntroDialog --noStartCommand',
    'git commit',
    'git commit'
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');
    casper.waitFor(CasperUtils.waits.jsMount)
    .wait(1000)
    .waitFor(CasperUtils.waits.allCommandsFinished)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.testDone);

}).run();
