exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C2\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git checkout -b bugFix;git commit;git checkout master;git commit;git merge bugFix",
  "name": "Merging in Git",
  "hint": {
    "en_US": "Remember to commit in the order specified (bugFix before master)",
    "zh_CN": "\u8bb0\u5f97\u6309\u7167\u7ed9\u5b9a\u7684\u987a\u5e8f\u6765\u8fdb\u884c\u63d0\u4ea4(commit) \uff08bugFix \u8981\u5728 master \u4e4b\u524d\uff09"
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
              "## Branches and Merging",
              "",
              "Great! We now know how to commit and branch. Now we need to learn some kind of way of combining the work from two different branches together. This will allow us to branch off, develop a new feature, and then combine it back in.",
              "",
              "The first method to combine work that we will examine is `git merge`. Merging in Git creates a special commit that has two unique parents. A commit with two parents essentially means \"I want to include all the work from this parent over here and this one over here, *and* the set of all their parents.\"",
              "",
              "It's easier with visuals, let's check it out in the next view"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here we have two branches; each has one commit that's unique. This means that neither branch includes the entire set of \"work\" in the repository that we have done. Let's fix that with merge.",
              "",
              "We will `merge` the branch `bugFix` into `master`"
            ],
            "afterMarkdowns": [
              "Woah! See that? First of all, `master` now points to a commit that has two parents. If you follow the arrows upstream from `master`, you will hit every commit along the way to the root. This means that `master` contains all the work in the repository now.",
              "",
              "Also, see how the colors of the commits changed? To help with learning, I have included some color coordination. Each branch has a unique color. Each commit turns a color that is the blended combination of all the branches that contain that commit.",
              "",
              "So here we see that the `master` branch color is blended into all the commits, but the `bugFix` color is not. Let's fix that..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's merge `master` into `bugFix`:"
            ],
            "afterMarkdowns": [
              "Since `bugFix` was downstream of `master`, git didn't have to do any work; it simply just moved `bugFix` to the same commit `master` was attached to.",
              "",
              "Now all the commits are the same color, which means each branch contains all the work in the repository! Woohoo"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To complete this level, do the following steps:",
              "",
              "* Make a new branch called `bugFix`",
              "* Checkout the `bugFix` branch with `git checkout bugFix`",
              "* Commit once",
              "* Go back to `master` with `git checkout`",
              "* Commit another time",
              "* Merge the branch `bugFix` into `master` with `git merge`",
              "",
              "*Remember, you can always re-display this dialog with \"help level\"!*"
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
              "## Branches and Merging",
              "",
              "Great! 现在我们已经知道怎么提交和使用分支了。接下来要学的一招是怎么把两个不同分支的工作合并起来。这样做是为了让我们在创建新的分支，开发新的东西之后，把新的东西合并回来。",
              "",
              "我们将要学的第一个组合方法是 `git merge`。在 Git 里进行合并（Merging）会产生一个拥有两个各不相同的父提交的特殊提交（commit）。这个特殊提交本质上就是：“把这两个各不相同的父提交*以及*它们的父提交集合的所有内容都包含进来。”",
              "",
              "听起来可能有点拗口，看看下一张就明白了。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "现在我们有两个分支：每一个都有一个特有的提交。也就是说没有一个分支包含了仓库的所有工作。现在让我们用合并来将它们组合在一起吧。",
              "",
              "我们将要把分支 `bugFix` 合并到 `master` 上"
            ],
            "command": "git merge bugFix master",
            "afterMarkdowns": [
              "哇！看见木有？`master` 分支现在指向了一个拥有两个爸爸的提交。假如你从 `master` 开始沿着箭头走到起点，沿路你可以遍历到所有的提交。这就表明 `master` 包含了仓库里所有的内容了。",
              "",
              "还有，看见各个提交的颜色的变化了吗？为了帮助学习，我添加了一些颜色混合。每个分支都有特定的颜色。每个提交的颜色都是含有这个提交的分支的颜色的混合。",
              "",
              "所以我们可以看见 `master` 分支的颜色是所有提交的颜色的混合，但是 `bugFix` 不是。接下来就改一下这里吧。"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "让我们把 `master` 分支合并到 `bugFix` 吧。"
            ],
            "command": "git merge master bugFix",
            "afterMarkdowns": [
              "因为 `bugFix` 分支在 `master` 分支的上游，所以 git 不用做什么额外的工作，只要把 `master` 分支的最新提交移到 `bugFix` 分支就可以了。",
              "",
              "现在所有的提交的颜色都是一样的啦，这表明现在所有的分支都包含了仓库里所有的东西！走起！"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "想刷过这关，要按照下面的步骤来：",
              "",
              "* 创建一个叫 `bugFix` 的新分支",
              "* 用 `git checkout bugFix` 切换到分支 `bugFix`",
              "* 创建一个提交",
              "* 再用 `git checkout` 切换回 `master` 上",
              "* 创建另外一个提交",
              "* 用 `git merge` 把分支 `bugFix` 合并进 `master` 里",
              "",
              "*友情提示，可以使用 \"help level\" 命令来重新显示这个窗口哦！*"
            ]
          }
        }
      ]
    }
  }
};
