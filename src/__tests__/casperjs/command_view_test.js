var CasperUtils = require('./casperUtils').CasperUtils;

CasperUtils.start(
  casper,
  CasperUtils.getUrlForCommands([
    'asd'
  ]),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)
    .wait(200)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      '#command_c32 div.commandLineResult p',
      'The command "asd" isn\'t supported, sorry!'
    ))
    /*
    .then(CasperUtils.enterCommand('git checkout C1'))
    .wait(800)
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.displayName h3',
      'Introduction Sequence'
    ))
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.seriesView p',
      "A nicely paced introduction to the majority of git commands"
    ))
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Right);
    })
    .wait(700)
    .then(CasperUtils.screenshot.entirePage)
    // Now we have selected the first level
    .then(CasperUtils.asserts.selectorContainsText(
      'div.modalView.inFront div.seriesView p',
      "Introduction to Git Commits"
    ))
    .then(function() {
      this.page.sendEvent('keypress', this.page.event.key.Enter);
    })
    .wait(700)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      'div.levelNameWrapper',
      "Level Introduction to Git Commits"
    ))
    */
    .then(CasperUtils.testDone);
}).run();
