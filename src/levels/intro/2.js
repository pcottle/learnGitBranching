exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C1\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugFix;git checkout bugFix",
  "name": "Branching in Git",
  "hint": {
      "en_US": "Just type in 'git commit' twice to finish!",
      "zh_CN": "\u6572\u4e24\u6b21 'git commit' \u5c31\u597d\u5566\uff01"
  },
  "disabledMap" : {
    "git revert": true
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Branches",
              "",
              "Branches in Git are incredibly lightweight as well. They are simply references to a specific commit -- nothing more. This is why many Git enthusiasts chant the mantra:",
              "",
              "```",
              "branch early, and branch often",
              "```",
              "",
              "Because there is no storage / memory overhead with making many branches, it's easier to logically divide up your work than have big beefy branches.",
              "",
              "When we start mixing branches and commits, we will see how these two features combine. For now though, just remember that a branch essentially says \"I want to include the work of this commit and all parent commits.\""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see what branches look like in practice.",
              "",
              "Here we will check out a new branch named `newImage`"
            ],
            "afterMarkdowns": [
              "There, that's all there is to branching! The branch `newImage` now refers to commit `C1`"
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's try to put some work on this new branch. Hit the button below"
            ],
            "afterMarkdowns": [
              "Oh no! The `master` branch moved but the `newImage` branch didn't! That's because we weren't \"on\" the new branch, which is why the asterisk (*) was on `master`"
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's tell git we want to checkout the branch with",
              "",
              "```",
              "git checkout [name]",
              "```",
              "",
              "This will put us on the new branch before committing our changes"
            ],
            "afterMarkdowns": [
              "There we go! Our changes were recorded on the new branch"
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! You are all ready to get branching. Once this window closes,",
              "make a new branch named `bugFix` and switch to that branch"
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
              "## Git Commits",
              "在一个使用 git 进行版本控制的仓库里，一次提交（commit）给你目录下所有文件做了一次快照，就好像是做了一次复制粘贴，但 git 做的不只那么简单！",
              "",
              "Git 希望尽可能地让这些提交记录保持轻量，所以每次在你进行提交的时候，它不会就这么复制整个工作目录。实际上它把每次提交都记录为一个相对于上个版本变化的集合，或者说一个\"差异 （delta）\"集。这也是为什么绝大部分提交都有一个父对象（parent commit） -- 迟点你就会在我们的演示中看见了。",
              "",
              "假如你要克隆（clone）一个仓库，你就要去解包（unpack）或者“解决（resolve）”这些差异。所以当你克隆一个仓库时会在命令行下看见这样的命令：",
              "",
              "`resolving deltas`",
              "",
              "要完全理解这些概念可能要花费很多时间，但现在你可以把提交看作是项目的快照，提交非常轻量而且在它们之间切换的时候非常快。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "让我们在练习里好好了解提交是什么玩意。在右边展示的是一个使用 git 管理的（小）仓库。现在有两个提交 —— 一个是初始提交 `C0`，另外一个可能包含了一些有意义修改的提交是`C1`。",
              "",
              "点下面的按钮来生成一个新的提交。"
            ],
            "command": "git commit",
            "afterMarkdowns": [
                "看！碉堡吧！我们刚刚对这个仓库进行了一点修改，并且把这些修改提交了。我们刚刚做的提交有一个爸爸（parent），叫 `C1`，代表这个修改是基于`C1`的。"
            ],
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
                "接下来你可以继续尝试下。在这个窗口关闭之后，提交两遍就可以过关！"
            ]
          }
        }
      ]
    }
  }
};