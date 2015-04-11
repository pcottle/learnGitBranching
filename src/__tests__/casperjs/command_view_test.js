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
    .then(CasperUtils.enterCommand('git commit'))
    .wait(100)
    .then(CasperUtils.asserts.selectorContainsText(
      '#command_c34 p.commandLine span:nth-child(2)',
      'git commit'
    ))
    .wait(700)
    .then(CasperUtils.enterCommand('git checkout C1'))
    .then(CasperUtils.enterCommand('git commit'))
    .wait(2000)
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.asserts.selectorContainsText(
      '#commandDisplay div.commandLineWarnings p span',
      "Warning!! Detached HEAD state"
    ))
    .then(CasperUtils.testDone);
}).run();
