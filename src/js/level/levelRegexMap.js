// The regex map for level commands, split out from level/index.js so it can be
// required without pulling in the level's React/JSX views (handy for the parse
// waterfall and for tests). Keep in sync with the method map in level/index.js.
var regexMap = {
  'help level': /^help level$/,
  'start dialog': /^start dialog$/,
  'show goal': /^(show goal|goal|help goal)$/,
  'hide goal': /^hide goal$/,
  'show solution': /^show solution($|\s)/,
  'objective': /^(objective|assignment)$/
};

exports.regexMap = regexMap;
