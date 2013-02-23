exports.level = {
  "name": 'Introduction to Git Commits',
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git commit;git commit",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
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
              "## Git Commits",
              "A commit in a git repository records a snapshot of all the files in your directory. It\'s like a giant copy and paste, but even better!",
              "",
              "Git wants to keep commits as lightweight as possible though, so it doesn't just copy the entire directory every time you commit. It actually stores each commit as a set of changes, or a \"delta\", from one version of the repository to the next. That\'s why most commits have a parent commit above them -- you\'ll see this later in our visualizations.",
              "",
              "In order to clone a repository, you have to unpack or \"resolve\" all these deltas. That's why you might see the command line output:",
              "",
              "`resolving deltas`",
              "",
              "when cloning a repo.",
              "",
              "It's a lot to take in, but for now you can think of commits as snapshots of the project. Commits are very light and switching between them is wicked fast!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see what this looks like in practice. On the right we have a visualization of a (small) git repository. There are two commits right now -- the first initial commit, `C0`, and one commit after that `C1` that might have some meaningful changes.",
              "",
              "Hit the button below to make a new commit"
            ],
            "afterMarkdowns": [
              "There we go! Awesome. We just made changes to the repository and saved them as a commit. The commit we just made has a parent, `C1`, which references which commit it was based off of."
            ],
            "command": "git commit",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Go ahead and try it out on your own! After this window closes, make two commits to complete the level"
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
