var locales = require('../../locales');
exports.level = {
  "compareOnlyMasterHashAgnosticWithAsserts": true,
  "goalAsserts": {
    "master": [
      function(data) {
        return data.C4 > data.C1;
      }
    ]
  },
  "disabledMap": {
    "git revert": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22master%22%7D%2C%22debug%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22debug%22%7D%2C%22printf%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22printf%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase -i master --solution-ordering C4; git rebase bugFix master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"debug\":{\"target\":\"C2\",\"id\":\"debug\"},\"printf\":{\"target\":\"C3\",\"id\":\"printf\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "name": locales.str('grabbing-one-commit-name'),
  "hint": locales.str('grabbing-one-commit-hint'),
  "startDialog": locales.str('grabbing-one-commit-start-dialog')
};
