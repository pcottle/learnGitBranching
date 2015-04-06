var CasperUtils = require('./casperUtils').CasperUtils;

casper.start(
  CasperUtils.getUrl(),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)
    .wait(300)
    .then(CasperUtils.enterCommand('levels'))
    .wait(800)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.toolbar',
      'Select a level'
    ))
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.displayName h3',
      'Introduction Sequence'
    ))
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.seriesView p',
      "A nicely paced introduction to the majority of git commands"
    ))
    // Hit right 5 times
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Right);
    })
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Right);
    })
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Right);
    })
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Right);
    })
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Right);
    })
    .wait(300)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.displayName h3',
      "Push & Pull -- Git Remotes!"
    ))
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.seriesView p',
      "Clone Intro"
    ))
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Enter);
    })
    .wait(700)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      'div.levelNameWrapper',
      "Level Clone Intro"
    ))
    .then(CasperUtils.testDone);

}).run();
