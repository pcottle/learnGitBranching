
var log = function(category, action, label) {
  window._gaq = window._gaq || [];
  window._gaq.push(['_trackEvent', category, action, label]);
  //console.log('just logged ', [category, action, label].join('|'));
};

exports.viewInteracted = function(viewName) {
  log('views', 'interacted', viewName);
};

exports.showLevelSolution = function(levelName) {
  log('levels', 'showedLevelSolution', levelName);
};

exports.levelSelected = function(levelName) {
  log('levels', 'levelSelected', levelName);
};

exports.levelSolved = function(levelName) {
  log('levels', 'levelSolved', levelName);
};

exports.commandEntered = function(value) {
  log('commands', 'commandEntered', value);
};

