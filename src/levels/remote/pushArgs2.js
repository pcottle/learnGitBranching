exports.level = {
    "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C4\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C4\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C5\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C5\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin master^:foo;git push origin foo:master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C4\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git push arguments -- Expanded!",
    "zh_CN": "Git push 参数2!"
  },
  "hint": {
    "en_US": "Remember you can admit defeat and type in \"show solution\" :P",
    "zh_CN": "如果你失败了, 可以通过 \"show solution\" 找到解决方案 :P"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## `<place>` argument details",
              "",
              "Remember from the previous lesson that when we specified `master` as the place argument for git push, we specified both the *source* of where the commits would come from and the *destination* of where the commits would go.",
              "",
              "You might then be wondering -- what if we wanted the source and destination to be different? What if you wanted to push commits from the `foo` branch locally onto the `bar` branch on remote?",
              "",
              "Well unfortunately that's impossible in git... just kidding! Of course it's possible :)... git has tons and tons of flexibility (almost too much).",
              "",
              "Let's see how in the next slide..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In order to specify both the source and the destination of `<place>`, simply join the two together with a colon:",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "This is commonly referred to as a colon refspec. Refspec is just a fancy name for a location that git can figure out (like the branch `foo` or even just `HEAD~1`)",
              "",
              "Once you are specifying both the source and destination independently, you can get quite fancy and precise with remote commands. Let's see a demo!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Remember, `source` is any location that git will understand:"
            ],
            "afterMarkdowns": [
              "Woah! That's a pretty trippy command but it makes sense -- git resolved `foo^` into a location, uploaded whatever commits that weren't present yet on the remote, and then updated destination."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What if the destination you want to push doesn't exist? No problem! Just give a branch name and git will create the branch on the remote for you"
            ],
            "afterMarkdowns": [
              "Sweet, that's pretty slick :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "For this level, try to get to the end goal state shown in the visualization, and remember the format of:",
              "",
              "`<source>:<destination>`"
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
              "## `<place>` argument details",
              "",
              "还记得之前课程说的吧, 当为git push 指定master为place时,我们可以设置 要提交的来源 和 提交到目的地. ",
              "",
              "你可能想知道-- 如果来源和目的地不一样呢?  ",
              "",
              "好吧, 很不幸git 不可能做到... 只是个玩笑! 当然是可能的啦:)... git拥有超强的灵活性(几乎不能再多了) ",
              "",
              "我们看看下一个幻灯片..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要为<place> 指定 source 和 destination, 只需要用冒号`:`将二者联结.",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "这通常被称为<colon refspec>, refspec是一个奇特的名-- 用于git 能识别的位置(比如分支foo 或者 HEAD~1) ",
              "",
              "一旦你指定了独立的来源和目的地, 你就可以得到花哨而精确的远程命令, 让我们看看演示! "
            ]
          }
        },
      {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "记住, `source` 是git 能理解任何位置:"
            ],
            "afterMarkdowns": [
              " 这是个很迷幻的命令, 但它是合理的 --  git 将foo^解析 为位置, 上传新提交到远端的目的地.  "
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果你要push到的destination不存在呢? 没问题! git 会在远端为你创建这个分支!"
            ],
            "afterMarkdowns": [
              "甜蜜吧! 干得漂亮!:D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "本节练习, 试着达到可视窗口展示的目标, 记住参数格式哟:",
              "",
              "`<source>:<destination>`"
            ]
          }
        }
      ]
    }
  }
};
