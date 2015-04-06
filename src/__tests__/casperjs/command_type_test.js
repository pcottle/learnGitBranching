var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrl(),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)
    .wait(300)
    .then(CasperUtils.enterCommand('level intro1'))
    .wait(1500)
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView div h2',
      'Git Commits'
    ))
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.inside p',
      "A commit in a git repository records a snapshot of all the files in your directory. It's like a giant copy and paste, but even better!"
    ))
    .then(CasperUtils.screenshot.entirePage)
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Escape);
    })
    .wait(700)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      'div.levelNameWrapper',
      "Level Introduction to Git Commits"
    ))
    .then(CasperUtils.testDone);

}).run();
