var CasperUtils = require('./casperUtils').CasperUtils;

var levels = require('../../levels');

var numLevelSequences = Object.keys(levels.levelSequences).length;

var getLevelIconIDs = function(levelID) {
  var level = levels.levelSequences[levelID];
  var numLevels = Object.keys(level).length;

  // We index at 1 for the level icons
  var result = [];
  for (var i = 1; i <= numLevels; i++) {
    result.push('levelIcon-' + levelID + i);
  }
  return result;
};
var flattenArray = function(a, b) { return a.concat(b);};

var levelIconIDsForPages = function(start, end) {
  return Object.keys(levels.levelSequences).slice(start, end)
    .map(getLevelIconIDs)
    .reduce(flattenArray);
};

casper.start(
  CasperUtils.getUrlForCommands([
    'levels',
  ]),
  function() {

    casper.waitFor(CasperUtils.waits.jsMount)
    .waitFor(CasperUtils.waits.commandVisible)
    .wait(1000)
    .then(
      CasperUtils.multiAssert(
        CasperUtils.asserts.visibleSelectors([
          'div.levelDropdownView'
        ]),
        CasperUtils.asserts.visibleIDs(
          levelIconIDsForPages(0, 5)
        )
      )
    )
    .then(CasperUtils.screenshot.entirePage)
    .then(function() {
      this.mouse.click('div[data-id="remote"]');
    })
    .wait(1000)
    .then(CasperUtils.asserts.visibleIDs(
      levelIconIDsForPages(5, numLevelSequences)
    ))
    .then(CasperUtils.screenshot.entirePage)
    .then(CasperUtils.testDone);
}).run();
