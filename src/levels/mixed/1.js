exports.level = {
  "compareOnlyMasterHashAgnostic": true,
  "disabledMap" : {
    "git revert": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22master%22%7D%2C%22debug%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22debug%22%7D%2C%22printf%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22printf%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout master;git cherry-pick C4",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"debug\":{\"target\":\"C2\",\"id\":\"debug\"},\"printf\":{\"target\":\"C3\",\"id\":\"printf\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "name": "Grabbing Just 1 Commit",
  "hint": {
      "en_US": "Remember, interactive rebase or cherry-pick is your friend here",
      "zh_CN": "\u8bb0\u4f4f\uff0c\u4ea4\u4e92\u5f0f rebase \u6216\u8005 cherry-pick \u4f1a\u5f88\u6709\u5e2e\u52a9"
    },
  "startDialog": {
    "en_US": {
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
    },
    "zh_CN": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 本地栈式提交 (Locally stacked commits)",
              "",
              "设想一下一个经常发生的场景：我在追踪一个有点棘手的 bug，为了更好地排查，我添加了一些 debug 语句和打印语句。",
              "",
              "所有的这些调试和打印语句到只在它们的分支里。最终我终于找到这个 bug，揪出来 fix 掉，然后撒花庆祝！",
              "",
              "但有个问题就是现在我要把 `bugFix` 分支的工作合并回 `master` 分支上，我可以简单地快进（fast-forward） `master` 分支，但这样的话 `master` 分支就会包含我这些调试语句了。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "现在就是 Git 大显神通的时候啦。我们有几种方法来解决这个问题，但最直接的方法是：",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "交互（`-i`）衍合允许你选择哪些提交是要被保留，哪些要被舍弃。它允许你将提交重新排序。假如你要舍弃一些工作，这个会帮上很大的忙。",
              "",
              "Cherry-picking 能让你选择单独一个提交并且把它放到 `HEAD` 的最前端。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
                "本关是可选关卡，玩不玩随便你。但是如果你坚持要刷，确保 `master` 分支能拿到 `bugFix` 分支的相关提交（references）。"
            ]
          }
        }
      ]
    }
  }
};
