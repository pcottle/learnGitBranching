exports.level = {
  "compareOnlyMaster": true,
  "disabledMap" : {
    "git revert": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22master%22%7D%2C%22debug%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22debug%22%7D%2C%22printf%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22printf%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout master;git cherry-pick C4",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"debug\":{\"target\":\"C2\",\"id\":\"debug\"},\"printf\":{\"target\":\"C3\",\"id\":\"printf\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "name": "Grabbing Just 1 Commit",
  "hint": "Remember, interactive rebase or cherry-pick is your friend here",
  "startDialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Locally stacked commits",
            "",
            "Here's a development situation that often happens: I'm trying to track down a bug but it is quite elusive. In order to aid in my detective work, I put in a few debug commands and a few print statements.",
            "",
            "All of these debugging / print statements are in their own branches. Finally I track down the bug, fix it, and rejoice!",
            "",
            "Only problem is that I now need to get my `bugFix` back into the `master` branch! I could simply fast-forward `master`, but then `master` would get all my debug statements."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "This is where the magic of Git comes in. There are a few ways to do this, but the two most straightforward ways are:",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`",
            "",
            "Interactive (the `-i`) rebasing allows you to chose which commits you want to keep or discard. It also allows you to reorder commits. This can be helpful if you want to toss out some work.",
            "",
            "Cherry-picking allows you to pick individual commits and plop them down on top of `HEAD`"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "This is a later level so we will leave it up to you to decide, but in order to complete the level, make sure `master` receives the commit that `bugFix` references."
          ]
        }
      }
    ]
  }
};
