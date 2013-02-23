exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%7D%2C%22pushed%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22pushed%22%7D%2C%22local%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22local%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22pushed%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git reset HEAD~1;git checkout pushed;git revert HEAD",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"pushed\":{\"target\":\"C2\",\"id\":\"pushed\"},\"local\":{\"target\":\"C3\",\"id\":\"local\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"local\",\"id\":\"HEAD\"}}",
  "name": "Reversing Changes in Git",
  "hint": {
      "en_US": "",
      "zh_CN": ""
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Reversing Changes in Git",
              "",
              "There are many ways to reverse changes in Git. And just like committing, reversing changes in Git has both a low-level component (staging individual files or chunks) and a high-level component (how the changes are actually reversed). Our application will focus on the latter.",
              "",
              "There are two primary ways to undo changes in Git -- one is using `git reset` and the other is using `git revert`. We will look at each of these in the next dialog",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` reverts changes by moving a branch reference backwards in time to an older commit. In this sense you can think of it as \"rewriting history;\" `git reset` will move a branch backwards as if the commit had never been made in the first place.",
              "",
              "Let's see what that looks like:"
            ],
            "afterMarkdowns": [
              "Nice! Git simply moved the master branch reference back to `C1`; now our local repository is in a state as if `C2` had never happened"
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "While reseting works great for local branches on your own machine, it's method of \"rewriting history\" doesn't work for remote branches that others are using.",
              "",
              "In order to reverse changes and *share* those reversed changes with others, we need to use `git revert`. Let's see it in action"
            ],
            "afterMarkdowns": [
              "Weird, a new commit plopped down below the commit we wanted to reverse. That's because this new commit `C2'` introduces *changes* -- it just happens to introduce changes that exactly reverses the commit of `C2`.",
              "",
              "With reverting, you can push out your changes to share with others."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To complete this level, reverse the two most recent commits on both `local` and `pushed`.",
              "",
              "Keep in mind that `pushed` is a remote branch and `local` is a local branch -- that should help you chose your methods."
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
              "## 撤销 Git 里面的变动",
              "",
              "在 Git 里有很多方法撤销（reverse）变动。和 commit 一样，在 Git 里撤销变动同时具有底层次的部分（暂存一些独立的文件或者片段）和高层次的部分（具体到变动是究竟怎么被撤销的）。我们这个应用主要关注后者。",
              "",
              "在 Git 里主要有两种方法来撤销变动 —— 一种是 `git reset`，另外一种是 `git revert`。让我们在下一个窗口逐一了解它们。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` 通过把分支记录回退上一个提交来实现撤销改动。这意味着你可以把它的行为当作是\"重写历史\"。`git reset` 会令分支记录回退，做到最新的提交好像没有提交过一样。",
              "",
              "让我们看看具体的操作："
            ],
            "command": "git reset HEAD~1",
            "afterMarkdowns": [
              "Nice! Git 就简单地把 master 分支的记录移回 `C1`；现在我们的本地仓库就处于好像提交 `C2` 没有发生过的状态了。"
            ],
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "虽然在你机子的本地环境中这样来撤销变更看起来很方便，但是这种“改写历史”的方法对别人用的远端分支是无效的哦！",
              "",
              "为了撤销分支并把这些变动*分享*给别人，我们需要 `git revert`。下面继续看它是怎么运作的。"
            ],
            "command": "git revert HEAD",
            "afterMarkdowns": [
              "怪哉！在我们要撤销的提交之后居然多了一个新提交！这是因为这个新提交 `C2'` 提供了*变动*（introduces changes） —— 刚好是用来撤销 `C2` 这个提交的。",
              "",
              "借助 revert，现在你可以把你的改动分享给别人啦。"
            ],
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要刷过这关，请分别把 `local` 分支和 `pushed` 分支上最近的一个提交撤销掉。",
              "",
              "记住 `pushes` 是一个远程分支，`local` 是一个本地分支 —— 有了这么明显的提示应该知道用哪种方法了吧？"
            ]
          }
        }
      ]
    }
  }
};
