exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C7\",\"id\":\"master\"},\"bugWork\":{\"target\":\"C2\",\"id\":\"bugWork\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C4\",\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugWork master^^2^",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C7\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C4\",\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Multiple parents",
    "zh_CN": "多个父提交记录"
  },
  "hint": {
    "en_US": "Use `git branch bugWork` with a target commit to create the missing reference.",
    "zh_CN": "使用`git branch bugWork`加上一个目标提交记录来创建消失的引用。"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Specifying Parents",
              "",
              "Like the `~` modifier, the `^` modifier also accepts an optional number after it.",
              "",
              "Rather than specifying the number of generations to go back (what `~` takes), the modifier on `^` specifies which parent reference to follow from a merge commit. Remember that merge commits have multiple parents, so the path to choose is ambiguous.",
              "",
              "Git will normally follow the \"first\" parent upwards from a merge commit, but specifying a number with `^` changes this default behavior.",
              "",
              "Enough talking, let's see it in action.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here we have a merge commit. If we checkout `master^` without the modifier, we will follow the first parent after the merge commit. ",
              "",
              "(*In our visuals, the first parent is positioned directly above the merge commit.*)"
            ],
            "afterMarkdowns": [
              "Easy -- this is what we are all used to."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Now let's try specifying the second parent instead..."
            ],
            "afterMarkdowns": [
              "See? We followed the other parent upwards."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "The `^` and `~` modifiers can make moving around a commit tree very powerful:"
            ],
            "afterMarkdowns": [
              "Lightning fast!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Even crazier, these modifiers can be chained together! Check this out:"
            ],
            "afterMarkdowns": [
              "The same movement as before, but all in one command."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Put it to practice",
              "",
              "To complete this level, create a new branch at the specified destination.",
              "",
              "Obviously it would be easy to specify the commit directly (with something like `C6`), but I challenge you to use the modifiers we talked about instead!"
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
              "### 选择父提交",
              "",
              "和`~`修改符一样，`^`修改符之后也可以跟一个（可选的）数字。",
              "",
              "这不是用来指定向上返回几代（`~`的作用），`^`后的数字指定跟随合并提交记录的哪一个父提交。还记得一个合并提交有多个父提交吧，所有选择哪条路径不是那么清晰。",
              "",
              "Git默认选择跟随合并提交的\"第一个\"父提交，使用`^`后跟一个数字来改变这一默认行为。",
              "",
              "废话不多说，举个例子。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "这里有一个合并提交。如果不加数字修改符直接切换到`master^`，会回到第一个父提交。",
              "",
              "(*在我们的图示中，第一个父提交是指合并提交正上方的那个父提交。*)"
            ],
            "afterMarkdowns": [
              "OK--这恰好是我们想要的。"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "现在来试试选择第二个父提交……"
            ],
            "afterMarkdowns": [
              "看见了吧？我们回到了第二个父提交。"
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "使用`^`和`~`可以自由在在提交树中移动："
            ],
            "afterMarkdowns": [
              "快若闪电！"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "再疯狂点，这些修改符支持链式操作！试一下这个："
            ],
            "afterMarkdowns": [
              "和前面的结果一样，但只用了一条命令。"
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 实践一下",
              "",
              "要完成此关，在指定的目标位置创建一个新的分支。",
              "",
              "很明显可以简单的直接使用提交记录的hash值（比如`C6`），但我要求你使用刚刚讲到的相对引用修饰符！"
            ]
          }
        }
      ]
    }
  }
};
