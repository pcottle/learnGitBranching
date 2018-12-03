var locales = require('../../locales');
exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C6%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git cherry-pick C3 C4 C7",
  "compareOnlyMasterHashAgnostic": true,
  "disabledMap": {
    "git rebase": true
  },
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"side\":{\"target\":\"C5\",\"id\":\"side\"},\"another\":{\"target\":\"C7\",\"id\":\"another\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C1\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": locales.str('cherry-pick-name'),
  "hint": locales.str('cherry-pick-hint'),
  "startDialog": locales.str('cherry-pick-start-dialog')
};
