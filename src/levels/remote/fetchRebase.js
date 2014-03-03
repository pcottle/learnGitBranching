exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22o/master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22master%22%5D%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D",
  "solutionCommand": "git clone;git fakeTeamwork;git commit;git pull --rebase;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Diverged History",
    "zh_CN": "分散的历史"
  },
  "hint": {
    "en_US": "check out the ordering from the goal visualization",
    "zh_CN": "检出可视化目标中的顺序"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Diverged Work",
              "",
              "So far we've seen how to `pull` down commits from others and how to `push` up our own changes. It seems pretty simple, so how can people get so confused?",
              "",
              "The difficulty comes in when the history of the repository *diverges*. Before discussing the details of this, let's see an example...",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Imagine you clone a repository on Monday and start dabbling on a side feature. By Friday you are ready to publish your feature -- but oh no! Your coworkers have written a bunch of code during the week that's made your feature out of date (and obsolete). They've also published these commits to the shared remote repository, so now *your* work is based on an *old* version of the project that's no longer relevant.",
              "",
              "In this case, the command `git push` is ambiguous. If you run `git push`, should git change the remote repository back to what it was on Monday? Should it try to add your code in while not removing the new code? Or should it totally ignore your changes since they are totally out of date?",
              "",
              "Because there is so much ambiguity in this situation (where history has diverged), git doesn't allow you to `push` your changes. It actually forces you to incorporate the latest state of the remote before being able to share your work."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "So much talking! Let's see this situation in action"
            ],
            "afterMarkdowns": [
              "See? Nothing happened because the command fails. `git push` fails because your most recent commit `C3` is based off of the remote at `C1`. The remote has since been updated to `C2` though, so git rejects your push"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "How do you resolve this situation? It's easy, all you need to do is base your work off of the most recent version of the remote branch.",
              "",
              "There are a few ways to do this, but the most straightforward is to move your work via rebasing. Let's go ahead and see what that looks like"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Now if we rebase before pushing instead..."
            ],
            "afterMarkdowns": [
              "Boom! We updated our local representation of the remote with `git fetch`, rebased our work to reflect the new changes in the remote, and then pushed them with `git push`"
            ],
            "command": "git fetch; git rebase o/master; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Are there other ways to update my work when the remote repository has been updated? Of course! Let's check out the same thing but with `merge` instead.",
              "",
              "Although `git merge` doesn't move your work (and instead just creates a merge commit), it's a way to tell git that you have incorporated all the changes from the remote. This is because the remote branch is now an *ancestor* of your own branch, meaning your commit reflects all commits in the remote branch.",
              "",
              "Lets see this demonstrated..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Now if we merge instead of rebasing..."
            ],
            "afterMarkdowns": [
              "Boom! We updated our local representation of the remote with `git fetch`, *merged* the new work into our work (to reflect the new changes in the remote), and then pushed them with `git push`"
            ],
            "command": "git fetch; git merge o/master; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Awesome! Is there any way I can do this without typing so many commands?",
              "",
              "Of course -- you already know `git pull` is just shorthand for a fetch and a merge. Conveniently enough, `git pull --rebase` is shorthand for a fetch and a rebase!",
              "",
              "Let's see these shorthand commands at work"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "First with `--rebase`..."
            ],
            "afterMarkdowns": [
              "Same as before! Just a lot shorter"
            ],
            "command": "git pull --rebase; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "And now with regular `pull`"
            ],
            "afterMarkdowns": [
              "Again, exact same as before!"
            ],
            "command": "git pull; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "This workflow of fetching, rebase/merging, and pushing is quite common. In future lessons we will examine more complicated versions of these workflows, but for now let's try this out.",
              "",
              "In order to solve this level, take the following steps:",
              "",
              "* Clone your repo",
              "* Fake some teamwork (1 commit)",
              "* Commit some work yourself (1 commit)",
              "* Publish your work via *rebasing*"
            ]
          }
        }
      ]
    },
   "zh_CN":{
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 分散工作",
              "",
              "到现在我们已经知道了如何从其它地方`pull`,以及如果`push`我们自己的提交对象, 看起来真简单, 但是为何人们还会如此困惑呢?",
              "",
              "困难来自于远端库历史的分散. 在讨论这个问题的细节前, 我们看一个例子...",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "想象一下你周一克隆了一个仓库, 然后在一个特性分支上工作. 到周五时, 你你准备推送你的特性分支 -- 不行的! 你的同事这周写了一堆代码, 使得你的特性分支过期了. 他们已经将代码分享(合并)到远端仓库了, 所以你的工作就变成了基于仓库老版的代码了.",
              "",
              "这种情况下, `git push`就变得模糊了, 如果你执行`git push`, git应该让远端仓库回到星期一那天? 还是直接在新代码的基础上添加你的代码? 或者直接忽略你的提交? ",
              "",
              "因为这情况让问题变得模糊(因为历史的分散性)了, git 不会允许你`push`. 你只能先合并远端最新的代码, 然后才能分享你的工作."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "废话说得真多, 看看实际案例吧!"
            ],
            "afterMarkdowns": [
              "看见了吧? 什么都没有变, 命令失败了! `git push`的失败是因为你最新提交了`C3`(基于远端的`C1`). 而远端已经更新到了`C2`啦, 所以git 拒绝了你的push"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "你如何解决这事儿呢? 很简单, 你需要做的就是使你的工作基于最新的远端分支.",
              "",
              "有好些方法做到这一点呢. 不过最直接的方法就是通过rebase修订你的工作. 我们继续向前,看看这是怎么实现的!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果我们在push之前做rebase呢?"
            ],
            "afterMarkdowns": [
              "轰 啊 轰! 我们用`git fetch`更新了远端在本地的副本, 然后衍合我们的工作以映射远端的新变化, 最后再`git push`"
            ],
            "command": "git fetch; git rebase o/master; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "还有其它的方法应对此种情况吗? 当然了, 我们还可以使用`merge`",
              "",
              "尽管`git merge`不会转移你的工作(相反的它会创建新的合并提交), 它会告诉git 你已经合并了远端的所有变更 -- 远端分支就是你自己分支的祖先, 这意味着, 你的提交反映了远端分支的提交.",
              "",
              "看下演示..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "那如果我们用merge 替换rebase呢?"
            ],
            "afterMarkdowns": [
              "轰哦轰! 我们用`git fetch`更新了远端副本, 然后合并了新变更到我们的工作, 最后我们用`git push`把工作推送回去."
            ],
            "command": "git fetch; git merge o/master; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "漂亮! 有更简单的命令吗?",
              "",
              "当然 -- 就是你所知道`git pull`,  就是fetch 和merge 的简写. 更方便的 -- `git pull --rebase` 就是 fetch 和rebase的简写! ",
              "",
              "让我们简写命令是如何工作的."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "First with `--rebase`..."
            ],
            "afterMarkdowns": [
              "跟之前结果一样, 就是简写啦."
            ],
            "command": "git pull --rebase; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "换用常规的`pull`"
            ],
            "afterMarkdowns": [
              "还是跟以前一样! "
            ],
            "command": "git pull; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "这几个命令 fetching, rebase/merging,  pushing 的工作流很普遍. 后续课程我们会讲解更复杂的工作流, 不过现在我们先尝试下吧.",
              "",
              "要完成本节, 你需要完成以下几步: ",
              "",
              "* Clone your repo",
              "* Fake some teamwork (1 commit)",
              "* Commit some work yourself (1 commit)",
              "* Publish your work via *rebasing*"
            ]
          }
        }
      ]
    }
  }
};
