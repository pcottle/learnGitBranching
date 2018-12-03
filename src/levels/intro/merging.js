var locales = require('../../locales');
exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C2\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\",\"C2\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git checkout -b bugFix;git commit;git checkout master;git commit;git merge bugFix",
  "name": locales.str('merging-name'),
  "hint": locales.str('merging-hint'),
  "startDialog": locales.str('merging-start-dialog'),
  "disabledMap": {
    "git revert": true
  }
};
