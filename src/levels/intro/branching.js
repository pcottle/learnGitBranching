var locales = require('../../locales');
exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C1\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugFix;git checkout bugFix",
  "name": locales.str('branching-name'),
  "hint": locales.str('branching-hint'),
  "startDialog": locales.str('branching-start-dialog'),
  "disabledMap": {
    "git revert": true
  }
};
