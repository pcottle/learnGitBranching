exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%7D%2C%22newImage%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22newImage%22%7D%2C%22caption%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22caption%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%27%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout master;git cherry-pick C2;git commit --amend;git cherry-pick C3",
  "disabledMap" : {
    "git revert": true
  },
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"newImage\":{\"target\":\"C2\",\"id\":\"newImage\"},\"caption\":{\"target\":\"C3\",\"id\":\"caption\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"caption\",\"id\":\"HEAD\"}}",
  "compareOnlyMaster": true,
  "name": "Juggling Commits #2",
  "hint": {
      "en_US": "Don't forget to forward master to the updated changes!",
      "zh_CN": "\u522b\u5fd8\u8bb0\u4e86\u5c06 master \u5feb\u8fdb\u5230\u6700\u65b0\u7684\u66f4\u65b0\u4e0a\uff01"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Juggling Commits #2",
              "",
              "*If you haven't completed Juggling Commits #1 (the previous level), please do so before continuing*",
              "",
              "As you saw in the last level, we used `rebase -i` to reorder the commits. Once the commit we wanted to change was on top, we could easily --amend it and re-order back to our preferred order.",
              "",
              "The only issue here is that there is a lot of reordering going on, which can introduce rebase conflicts. Let's look at another method with `git cherry-pick`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Remember that git cherry-pick will plop down a commit from anywhere in the tree onto HEAD (as long as that commit isn't upstream).",
              "",
              "Here's a small refresher demo:"
            ],
            "afterMarkdowns": [
              "Nice! Let's move on"
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "So in this level, let's accomplish the same objective of amending `C2` once but avoid using `rebase -i`. I'll leave it up to you to figure it out! :D"
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
              "## Juggling Commits #2",
              "",
              "*假如你还没有完成 Juggling Commits #1（前一关），这关不让玩哦！*",
              "",
              "如你在上一关所见，我们使用 `rebase -i` 来重排那些提交。只要把我们想要的提交挪到最顶端，我们就可以很容易地改变它，然后把它们重新排成我们想要的顺序。",
              "",
              "但唯一的问题就是这样做就要排很多次，有可能造成衍合冲突（rebase conflicts）。下面就看看用另外一种方法 `git cherry-pick` 是怎么做的吧。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "要在心理牢记 cherry-pick 可以从提交树的任何地方拿一个提交来放在 HEAD 上（尽管那个提交不在上游）。",
              "",
              "下面是一个小小的演示："
            ],
            "command": "git cherry-pick C2",
            "afterMarkdowns": [
              "好滴咧，我们继续"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "那么这关呢，和上一关一样要改变提交 `C2`，但你要避免使用 `rebase -i`。自己想想要怎么解决吧，骚年！ :D"
            ]
          }
        }
      ]
    }
  }
};
