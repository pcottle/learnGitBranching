exports.level = {
  "goalTreeString": '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}',
  "solutionCommand": "git clone",
  "name": {
    "en_US": "Clone Intro",
    "zh_CN": "Clone Intro"
  },
  "hint": {
    "en_US": "Just git clone!",
    "zh_CN": "Just git clone!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Remotes",
              "",
              "Remote repositories aren't actually that complicated. In today's world of cloud computing it's easy to think that there's a lot of magic behind git remotes, but they are actually just copies of your repository on another computer. You can typically talk to this other computer through the Internet, which allows you to transfer commits back and forth.",
              "",
              "That being said, remote repositories have a bunch of great properties:",
              "",
              "- First and foremost, remotes serve as a great backup! Local git repositories have the ability to restore files to a previous state (as you know), but all that information is stored locally. By having copies of your git repository on other computers, you can lose all your local data and still pick up where you left off.",
              "",
              "- More importantly, remotes make coding social! Now that a copy of your project is hosted elsewhere, your friends can contribute to your project (or pull in your latest changes) very easily.",
              "",
              "It's become very popular to use websites that visualize activity around remote repos (like [Github](https://github.com/) or [Phabricator](http://phabricator.org/)), but remote repositories _always_ serve as the underlying backbone for these tools. So it's important to understand them!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Our Command to create remotes",
              "",
              "Up until this point, Learn Git Branching has focused on teaching the basics of _local_ repository work (branching, merging, rebasing, etc). However now that we want to learn about remote repository work, we need a command to set up the environment for those lessons. `git clone` will be that command",
              "",
              "Technically, `git clone` in the real world is the command you'll use to create _local_ copies of remote repositories (from github for example). We use this command a bit differently in Learn Git Branching though -- `git clone` actually makes a remote repository out of your local one. Sure it's technically the opposite meaning of the real command, but it helps build the connection between cloning and remote repository work, so let's just run with it for now.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lets start slow and just look at what a remote repository looks like (in our visualization).",
              ""
            ],
            "afterMarkdowns": [
              "There it is! Now we have a remote repository of our project. It looks pretty similar except for some visual changes to make the distinction apparent -- in later levels you'll get to see how we share work across these repositories."
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, simply `git clone` your existing repository. The real learning will come in following lessons."
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
              "## Git Remotes",
              "",
              "远程仓库并不复杂, 在如今的云计算的世界 很容易想到 git remotes背后有很多魔幻, 但是它们只是你的仓库到另个一台计算机上的拷贝. 你可以通过因特网与这台计算机通话 -- 传递后退和前进的提交对象",
              "",
              "话虽如些, 远程仓库却有一系列强大的属性",
              "",
              "- 首先, 远仓是一个强大的备份. 本地仓库也有恢复文件的能力, 但所有的信息都是保存在本地的. 即使你丢失了本地数据, 你仍可以通过远端仓库拷贝拿回你丢失的数据  ",
              "",
              "- 更重要的是, 远端让代码社交化了! 现在你的项目被白拷贝到别的地方了, 你的朋友可以更容易的为你的项目做贡献(或者pull 最新的变更)",
              "",
              "现在使用网站来可视化远端仓库变得越发流行(像 [Github](https://github.com/) or [Phabricator](http://phabricator.org/)), 但远库是这些工具的基石, 理解其概念非常的重要!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 我们创建远端仓库的命令",
              "",
              "直到现在, 教学都聚焦于本地仓库的基本操作. 但我们现在需要学习远端仓库的操作 -- 我们需要一个配置这种环境的命令, 这个命令就是 `git clone`",
              "技术上, `git clone` 在真实的环境下, 会在本地创建一个远端仓库的拷贝(比如从github.com). 在我们的教学中使用这个命令会有一些不同 -- 它会在远端创建一个你本地的拷贝. 这和真实命令的意思相反",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "让我们看看远端仓库的样子.",
              ""
            ],
            "afterMarkdowns": [
              "就是它了! 现在我们有了一个远端仓库. 除了视觉上的一点变化, 它们真的太像了 -- 在后面的课程中, 你会知道怎样在不同的仓库间分享工作. "
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成本节, 简单的 `git clone` 下你的仓库. 后续的课程我们会正式的学习"
            ]
          }
        }
      ]
    }
  }
};

