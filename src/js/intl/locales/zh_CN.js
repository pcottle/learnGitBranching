module.exports = {
  "multiple-parents-name": "两个父节点",
  "multiple-parents-hint": "使用 `git branch bugWork` 加上一个目标提交记录来创建消失的引用。",
  "multiple-parents-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 选择父提交记录",
            "",
            "操作符 `^` 与 `~` 符一样，后面也可以跟一个数字。",
            "",
            "但是该操作符后面的数字与 `~` 后面的不同，并不是用来指定向上返回几代，而是指定合并提交记录的某个父提交。还记得前面提到过的一个合并提交有两个父提交吧，所以遇到这样的节点时该选择哪条路径就不是很清晰了。",
            "",
            "Git 默认选择合并提交的“第一个”父提交，在操作符 `^` 后跟一个数字可以改变这一默认行为。",
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
            "这里有一个合并提交记录。如果不加数字修改符直接检出 `master^`，会回到第一个父提交记录。",
            "",
            "(*在我们的图示中，第一个父提交记录是指合并提交记录正上方的那个提交记录。*)"
          ],
          "afterMarkdowns": [
            "这正是我们都已经习惯的方法。"
          ],
          "command": "git checkout master^",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "现在来试试选择另一个父提交……"
          ],
          "afterMarkdowns": [
            "看见了吧？我们回到了另外一个父提交上。"
          ],
          "command": "git checkout master^2",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "使用 `^` 和 `~` 可以自由地在提交树中移动，非常给力："
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
            "更厉害的是，这些操作符还支持链式操作！试一下这个："
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
            "### 课后小练习",
            "",
            "要完成此关，在指定的目标位置创建一个新的分支。",
            "",
            "很明显可以简单地直接使用提交记录的哈希值（比如 `C6`），但我要求你使用刚刚讲到的相对引用修饰符！"
          ]
        }
      }
    ]
  },
  "branching-name": "Git Branch",
  "branching-hint": "用 'git branch <分支名>' 来创建分支，用 'git checkout <分支名>' 来切换到分支",
  "branching-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Branch",
            "",
            " Git 的分支也非常轻量。它们只是简单地指向某个提交纪录 —— 仅此而已。所以许多 Git 爱好者传颂：",
            "",
            "```",
            "早建分支！多用分支！",
            "```",
            "",
            "这是因为即使创建再多分的支也不会造成储存或内存上的开销，并且按逻辑分解工作到不同的分支要比维护那些特别臃肿的分支简单多了。",
            "",
            "在将分支和提交记录结合起来后，我们会看到两者如何协作。现在只要记住使用分支其实就相当于在说：“我想基于这个提交以及它所有的父提交进行新的工作。”"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "咱们通过实际操作来看看分支是什么样子的。",
            "",
            "接下来，我们将要创建一个到名为 `newImage` 的分支。"
          ],
          "command": "git branch newImage",
          "afterMarkdowns": [
            "看到了吗，创建分支就是这么容易！新创建的分支 `newImage` 指向的是提交记录 `C1`。"
          ],
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "现在咱们试着往新分支里提交一些东西。点击下面的按钮"
          ],
          "command": "git commit",
          "afterMarkdowns": [
            "哎呀！为什么 `master` 分支前进了，但 `newImage` 分支还待在原地呢？！这是因为我们没有“在”这个新分支上，看到 `master` 分支上的那个星号（*）了吗？这表示当前所在的分支是 `master`。"
          ],
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "现在咱们告诉 Git 我们想要切换到新的分支上",
            "",
            "```",
            "git checkout <name>",
            "```",
            "",
            "下面的命令会让我们在提交修改之前先切换到新的分支上"
          ],
          "command": "git checkout newImage; git commit",
          "afterMarkdowns": [
            "这就对了！我们的修改已经保存到新的分支里了。"
          ],
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "OK，你们都已经准备好使用分支了。当前窗口关闭后，",
            "创建一个名为 `bugFix` 的新分支，然后切换过去。",
            "",
            "对了，有个更简洁的方式：如果你想创建一个新的分支同时切换到新创建的分支的话，可以通过 `git checkout -b <your-branch-name>` 来实现。"
          ]
        }
      }
    ]
  },
  "commits-name": "Git Commit",
  "commits-hint": "执行两次 'git commit' 就可以过关了！",
  "commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Commit",
            "Git 仓库中的提交记录保存的是你的目录下所有文件的快照，就像是把整个目录复制，然后再粘贴一样，但比复制粘贴优雅许多！",
            "",
            "Git 希望提交记录尽可能地轻量，因此在你每次进行提交时，它并不会盲目地复制整个目录。条件允许的情况下，它会将当前版本与仓库中的上一个版本进行对比，并把所有的差异打包到一起作为一个提交记录。",
            "",
            "Git 还保存了提交的历史记录。这也是为什么大多数提交记录的上面都有父节点的原因 —— 我们会在图示中用箭头来表示这种关系。对于项目组的成员来说，维护提交历史对大家都有好处。",
            "",
            "关于提交记录太深入的东西咱们就不再继续探讨了，现在你可以把提交记录看作是项目的快照。提交记录非常轻量，可以快速地在这些提交记录之间切换！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "咱们来实际操作一下，看看提交记录是怎样的。右边展示了一个（小型）Git 代码库。当前有两个提交记录 —— 初始提交 `C0` 和其后可能包含某些有用修改的提交 `C1`。",
            "",
            "点击下面的按钮创建一个新的提交记录。"
          ],
          "afterMarkdowns": [
            "好了！非常棒！我们刚才修改了代码库，并把这些修改保存成了一个提交记录 `C2`。`C2` 的父节点是 `C1`，父节点是当前提交中变更的基础。"
          ],
          "command": "git commit",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "接下来自己试一试吧。当前窗口关闭后，完成两次提交就可以过关！"
          ]
        }
      }
    ]
  },
  "merging-name": "Git Merge",
  "merging-hint": "要按目标窗口中指定的顺序进行提交（bugFix 先于 master）",
  "merging-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 分支与合并",
            "",
            "太好了! 我们已经知道如何提交以及如何使用分支了。接下来咱们看看如何将两个分支合并到一起。就是说我们新建一个分支，在其上开发某个新功能，开发完成后再合并回主线。",
            "",
            "咱们先来看一下第一种方法 —— `git merge`。在 Git 中合并两个分支时会产生一个特殊的提交记录，它有两个父节点。翻译成自然语言相当于：“我要把这两个父节点本身及它们所有的祖先都包含进来。”",
            "",
            "通过图示更容易理解一些，咱们到下一页看一下。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "我们准备了两个分支，每个分支上各有一个独有的提交。这意味着没有一个分支包含了我们修改的所有内容。咱们通过合并这两个分支来解决这个问题。",
            "",
            "我们要把 `bugFix` 合并到 `master` 里"
          ],
          "command": "git merge bugFix",
          "afterMarkdowns": [
            "哇哦！看见了吗？首先，`master` 现在指向了一个拥有两个父节点的提交记录。假如从 `master` 开始沿着箭头向上看，在到达起点的路上会经过所有的提交记录。这意味着 `master` 包含了对代码库的所有修改。↓↓↓",
            "",
            "还有，看见各个提交记录的颜色变化了吗？为了帮助学习理解，我引入了颜色搭配。每个分支都有不同的颜色，而每个提交记录的颜色是所有包含该提交记录的分支的颜色混合之后的颜色。",
            "",
            "所以，`master` 分支的颜色被混入到所有的提交记录，但 `bugFix` 没有。下面咱们让它也改变一下颜色。"
          ],
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "咱们再把 `master` 分支合并到 `bugFix`："
          ],
          "command": "git checkout bugFix; git merge master",
          "afterMarkdowns": [
            "因为 `master` 继承自 `bugFix`，Git 什么都不用做，只是简单地把 `bugFix` 移动到 `master` 所指向的那个提交记录。",
            "",
            "现在所有提交记录的颜色都一样了，这表明每一个分支都包含了代码库的所有修改！大功告成！"
          ],
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要想通过这一关，需要以下几步：",
            "",
            "* 创建新分支 `bugFix`",
            "* 用 `git checkout bugFix` 命令切换到该分支",
            "* 提交一次",
            "* 用 `git checkout master` 切换回 `master`",
            "* 再提交一次",
            "* 用 `git merge` 把 `bugFix` 合并到 `master`",
            "",
            "* 你随时都可以用“objective”命令来打开这个对话框！*"
          ]
        }
      }
    ]
  },
  "rebasing-name": "Git Rebase",
  "rebasing-hint": "先在 bugFix 分支上进行提交",
  "rebasing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Rebase",
            "",
            "第二种合并分支的方法是 `git rebase`。Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。",
            "",
            "Rebase 的优势就是可以创造更线性的提交历史，这听上去有些难以理解。如果只允许使用 Rebase 的话，代码库的提交历史将会变得异常清晰。",
            "",
            "咱们还是实际操作一下吧……"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "还是准备了两个分支；注意当前所在的分支是 bugFix（星号标识的是当前分支）",
            "",
            "我们想要把 bugFix 分支里的工作直接移到 master 分支上。移动以后会使得两个分支的功能看起来像是按顺序开发，但实际上它们是并行开发的。",
            "",
            "咱们这次用 `git rebase` 实现此目标"
          ],
          "command": "git rebase master",
          "afterMarkdowns": [
            "怎么样？！现在 bugFix 分支上的工作在 master 的最顶端，同时我们也得到了一个更线性的提交序列。",
            "",
            "注意，提交记录 C3 依然存在（树上那个半透明的节点），而 C3' 是我们 Rebase 到 master 分支上的 C3 的副本。",
            "",
            "现在唯一的问题就是 master 还没有更新，下面咱们就来更新它吧……"
          ],
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "现在我们切换到了 `master` 上。把它 rebase 到 `bugFix` 分支上……"
          ],
          "command": "git rebase bugFix",
          "afterMarkdowns": [
            "好了！由于 `bugFix` 继承自 `master`，所以 Git 只是简单的把 `master` 分支的引用向前移动了一下而已。"
          ],
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成此关，执行以下操作：",
            "",
            "* 新建并切换到 `bugFix` 分支",
            "* 提交一次",
            "* 切换回 master 分支再提交一次",
            "* 再次切换到 bugFix 分支，rebase 到 master 上",
            "",
            "祝你好运！"
          ]
        }
      }
    ]
  },
  "describe-name": "Git Describe",
  "describe-hint": "当你准备好时，在 bugFix 分支上面提交一次就可以了",
  "describe-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Git Describe",
            "",
            "由于标签在代码库中起着“锚点”的作用，Git 还为此专门设计了一个命令用来**描述**离你最近的锚点（也就是标签），它就是 `git describe`！",
            "",
            "Git Describe 能帮你在提交历史中移动了多次以后找到方向；当你用 `git bisect`（一个查找产生 Bug 的提交记录的指令）找到某个提交记录时，或者是当你坐在你那刚刚度假回来的同事的电脑前时， 可能会用到这个命令。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "`git describe` 的​​语法是：",
            "",
            "`git describe <ref>`",
            "",
            "`<ref>` 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会以你目前所检出的位置（`HEAD`）。",
            "",
            "它输出的结果是这样的：",
            "",
            "`<tag>_<numCommits>_g<hash>`",
            "",
            "`tag` 表示的是离 `ref` 最近的标签， `numCommits` 是表示这个 `ref` 与 `tag` 相差有多少个提交记录， `hash` 表示的是你所给定的 `ref` 所表示的提交记录哈希值的前几位。",
            "",
            "当 `ref` 提交记录上有某个标签时，则只输出标签名称"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "让我们来看一个例子，对于下面的提交树："
          ],
          "afterMarkdowns": [
            "`git describe master` 会输出：",
            "",
            "`v1_2_gC2`",
            "",
            "`git describe side` 会输出：",
            "",
            "`v2_1_gC4`"
          ],
          "command": "git tag v2 C3",
          "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "`git describe` 就是这样了！试着在这个关卡指定几个位置来感受一下这个命令吧！",
            "",
            "当你准备进行下一关时，只要提交一次就可以通过这个关卡。算是我们送你的一个小礼物吧 :P"
          ]
        }
      }
    ]
  },
  "grabbing-one-commit-name": "只取一个提交记录",
  "grabbing-one-commit-hint": "你有两个朋友，cherry-pick 和 rebase -i",
  "grabbing-one-commit-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 本地栈式提交",
            "",
            "来看一个在开发中经常会遇到的情况：我正在解决某个特别棘手的 Bug，为了便于调试而在代码中添加了一些调试命令并向控制台打印了一些信息。",
            "",
            "这些调试和打印语句都在它们各自的提交记录里。最后我终于找到了造成这个 Bug 的根本原因，解决掉以后觉得沾沾自喜！",
            "",
            "最后就差把 `bugFix` 分支里的工作合并回 `master` 分支了。你可以选择通过 fast-forward 快速合并到 `master` 分支上，但这样的话 `master` 分支就会包含我这些调试语句了。你肯定不想这样，应该还有更好的方式……"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "实际我们只要让 Git 复制解决问题的那一个提交记录就可以了。跟之前我们在“整理提交记录”中学到的一样，我们可以使用",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`",
            "",
            "来达到目的。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "由于我们刚刚闯过类似的关卡，所以要不要再尝试一次就看你自己了。但是如果你想试一把的话，确保 `master` 分支能得到 `bugFix` 分支上的相关提交。"
          ]
        }
      }
    ]
  },
  "juggling-commits-name": "提交的技巧 #1",
  "juggling-commits-hint": "第一个命令是 `git rebase -i HEAD~2`",
  "juggling-commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 提交的技巧 #1",
            "",
            "接下来这种情况也是很常见的：你之前在 `newImage` 分支上进行了一次提交，然后又基于它创建了 `caption` 分支，然后又提交了一次。",
            "",
            "此时你想对的某个以前的提交记录进行一些小小的调整。比如设计师想修改一下 `newImage` 中图片的分辨率，尽管那个提交记录并不是最新的了。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "我们可以通过下面的方法来克服困难：",
            "",
            "* 先用 `git rebase -i` 将提交重新排序，然后把我们想要修改的提交记录挪到最前",
            "* 然后用 `commit --amend` 来进行一些小修改",
            "* 接着再用 `git rebase -i` 来将他们调回原来的顺序",
            "* 最后我们把 master 移到修改的最前端（用你自己喜欢的方法），就大功告成啦！",
            "",
            "当然完成这个任务的方法不止上面提到的一种（我知道你在看 cherry-pick 啦），之后我们会多点关注这些技巧啦，但现在暂时只专注上面这种方法。",
            "最后有必要说明一下目标状态中的那几个`'` —— 我们把这个提交移动了两次，每移动一次会产生一个 `'`；而 C2 上多出来的那个是我们在使用了 amend 参数提交时产生的，所以最终结果就是这样了。",
            "",
            "也就是说，我在对比结果的时候只会对比提交树的结构，对于 `'` 的数量上的不同，并不纳入对比范围内。只要你的 `master` 分支结构与目标结构相同，我就算你通过。"
          ]
        }
      }
    ]
  },
  "juggling-commits2-name": "提交的技巧 #2",
  "juggling-commits2-hint": "别忘记了将 master 快进到最新的更新上！",
  "juggling-commits2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 提交的技巧 #2",
            "",
            "*如果你还没有完成“提交的技巧 #1”（前一关）的话，请选通过以后再来！*",
            "",
            "正如你在上一关所见到的，我们可以使用 `rebase -i` 对提交记录进行重新排序。只要把我们想要的提交记录挪到最前端，我们就可以很轻松的用 `--amend` 修改它，然后把它们重新排成我们想要的顺序。",
            "",
            "但这样做就唯一的问题就是要进行两次排序，而这有可能造成由 rebase 而导致的冲突。下面还是看看 `git cherry-pick` 是怎么做的吧。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "要在心里牢记 cherry-pick 可以将提交树上任何地方的提交记录取过来追加到 HEAD 上（只要不是 HEAD 上游的提交就没问题）。",
            "",
            "来看看这个例子："
          ],
          "command": "git cherry-pick C2",
          "afterMarkdowns": [
            "看到了吧？我们继续"
          ],
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "这一关的目标和上一关一样，通过 `--amend` 改变提交记录 `C2`，但你不能用 `rebase -i`。自己想想要怎么解决吧！ :D",
            "",
            "对了，提交记录上面的`'`的数量并不重要，只是引用的不同而已。也就是说如果你的最终结果在某个提交记录上多了个`'`，我也会算你通过的。"
          ]
        }
      }
    ]
  },
  "tags-name": "Git Tag",
  "tags-hint": "你可以直接 checkout 到 commit 上，或是简单地 checkout 到 tag 上",
  "tags-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Tags",
            "",
            "相信通过前面课程的学习你已经发现了：分支很容易被人为移动，并且当有新的提交时，它也会移动。分支很容易被改变，大部分分支还只是临时的，并且还一直在变。",
            "",
            "你可能会问了：有没有什么可以*永远*指向某个提交记录的标识呢，比如软件发布新的大版本，或者是修正一些重要的 Bug 或是增加了某些新特性，有没有比分支更好的可以永远指向这些提交的方法呢？",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "当然有了！Git 的 tag 就是干这个用的啊，它们可以（在某种程度上 —— 因为标签可以被删除后重新在另外一个位置创建同名的标签）永久地将某个特定的提交命名为里程碑，然后就可以像分支一样引用了。",
            "",
            "更难得的是，它们并不会随着新的提交而移动。你也不能检出到某个标签上面进行修改提交，它就像是提交树上的一个锚点，标识了某个特定的位置。",
            "",
            "咱们来看看标签到底是什么样。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "咱们先建立一个标签，指向提交记录 `C1`，表示这是我们 1.0 版本。"
          ],
          "afterMarkdowns": [
            "很容易吧！我们将这个标签命名为 `v1`，并且明确地让它指向提交记录 `C1`，如果你不指定提交记录，Git 会用 `HEAD` 所指向的位置。"
          ],
          "command": "git tag v1 C1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "在这个关卡中，按照目标建立两个标签，然后检出到 `v1` 上面，要注意你会进到分离 `HEAD` 的状态 —— 这是因为不能直接在`v1` 上面做 commit。",
            "",
            "在下个关卡中我们会介绍更多关于标签的有趣的应用。"
          ]
        }
      }
    ]
  },
  "cherry-pick-name": "Git Cherry-pick",
  "cherry-pick-hint": "git cherry-pick 后面要跟提交的名字",
  "cherry-pick-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 整理提交记录",
            "",
            "到现在我们已经学习了 Git 的基础知识 —— 提交、分支以及在提交树上移动。 这些概念涵盖了 Git 90% 的功能，同样也足够满足开发者的日常需求 ",
            "",
            "然而, 剩余的 10% 在处理复杂的工作流时(或者当你陷入困惑时）可能就显示尤为重要了。接下来要讨论的这个话题是“整理提交记录” —— 开发人员有时会说“我想要把这个提交放到这里, 那个提交放到刚才那个提交的后面”, 而接下来就讲的就是它的实现方式，非常清晰、灵活，还很生动。",
            "",
            "看起来挺复杂, 其实是个很简单的概念。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Cherry-pick",
            "",
            "本系列的第一个命令是 `git cherry-pick`, 命令形式为: ",
            "",
            "* `git cherry-pick <提交号>...`",
            "",
            "如果你想将一些提交复制到当前所在的位置（`HEAD`）下面的话， Cherry-pick 是最直接的方式了。我个人非常喜欢 `cherry-pick`，因为它特别简单。",
            "",
            "咱们还是通过例子来看一下！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "这里有一个仓库, 我们想将 `side` 分支上的工作复制到 `master` 分支，你立刻想到了之前学过的 `rebase` 了吧？但是咱们还是看看 `cherry-pick` 有什么本领吧。"
          ],
          "afterMarkdowns": [
            "这就是了！我们只需要提交记录 `C2` 和 `C4`，所以 Git 就将被它们抓过来放到当前分支下了。 就是这么简单!"
          ],
          "command": "git cherry-pick C2 C4",
          "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要通过此关, 只需要简单的将三个分支中的提交记录复制到 master 上就可以了。目标窗口展示了我们想要哪些提交记录，如果你不小心关掉了的话，通过 `show goal` 命令可以打开，左上角也有“显示目标按钮”",
            ""
          ]
        }
      }
    ]
  },
  "detached-head-name": "分离 HEAD",
  "detached-head-hint": "使用提交记录上的标签（哈希值）来指定提交记录！",
  "detached-head-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 在提交树上移动",
            "",
            "在接触 Git 更高级功能之前，我们有必要先学习在你项目的提交树上前后移动的几种方法。",
            "",
            "一旦熟悉了如何在 Git 提交树上移动，你驾驭其它命令的能力也将水涨船高！",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## HEAD",
            "",
            "我们首先看一下 “HEAD”。 HEAD 是一个对当前检出记录的符号引用 —— 也就是指向你正在其基础上进行工作的提交记录。",
            "",
            "HEAD 总是指向当前分支上最近一次提交记录。大多数修改提交树的 Git 命令都是从改变 HEAD 的指向开始的。",
            "",
            "HEAD 通常情况下是指向分支名的（如 bugFix）。在你提交时，改变了 bugFix 的状态，这一变化通过 HEAD 变得可见。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "下面咱们通过实际操作看一下。我们将会观察提交前后 HEAD 的位置。"
          ],
          "afterMarkdowns": [
            "看到了吗？ HEAD 指向了 `master`，随着提交向前移动。",
            "",
            "（译者注：实际这些命令并不是真的在查看 HEAD 指向，看下一屏就了解了。如果想看 HEAD 指向，可以通过 `cat .git/HEAD` 查看，",
            "如果 HEAD 指向的是一个引用，还可以用 `git symbolic-ref HEAD` 查看它的指向。但是该程序不支持这两个命令）"
          ],
          "command": "git checkout C1; git checkout master; git commit; git checkout C2",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "### 分离的 HEAD",
            "",
            "分离的 HEAD 就是让其指向了某个具体的提交记录而不是分支名。在命令执行之前的状态如下所示： ",
            "",
            "HEAD -> master -> C1",
            "",
            "HEAD 指向 master， master 指向 C1"
          ],
          "afterMarkdowns": [
            "现在变成了",
            "",
            "HEAD -> C1"
          ],
          "command": "git checkout C1",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "想完成此关，从 `bugFix` 分支中分离出 HEAD 并让其指向一个提交记录。",
            "",
            "通过哈希值指定提交记录。每个提交记录的哈希值显示在代表提交记录的圆圈中。"
          ]
        }
      }
    ]
  },
  "interactive-rebase-name": "交互式 rebase",
  "interactive-rebase-hint": "branch 或者是相对位置（HEAD~）都可以用來指定 rebase 的目标",
  "interactive-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 交互式的 rebase",
            "",
            "当你你知道你所需要的提交记录（**并且**还知道这些提交记录的哈希值）时, 用 cherry-pick 再好不过了 —— 没有比这更简单的方式了。",
            "",
            "但是如果你不清楚你想要的提交记录的哈希值呢? 幸好 Git 帮你想到了这一点, 我们可以利用交互式的 rebase —— 如果你想从一系列的提交记录中找到想要的记录, 这就是最好的方法了",
            "",
            "咱们具体来看一下……"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "交互式 rebase 指的是使用带参数 `--interactive` 的 rebase 命令, 简写为 `-i`",
            "",
            "如果你在命令后增加了这个选项, Git 会打开一个 UI 界面并列出将要被复制到目标分支的备选提交记录，它还会显示每个提交记录的哈希值和提交说明，提交说明有助于你理解这个提交进行了哪些更改。",
            "",
            "在实际使用时，所谓的 UI 窗口一般会在文本编辑器 —— 如 Vim —— 中打开一个文件。 考虑到课程的初衷，我弄了一个对话框来模拟这些操作。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "当 rebase UI界面打开时, 你能做3件事:",
            "",
            "* 调整提交记录的顺序（通过鼠标拖放来完成）",
            "* 删除你不想要的提交（通过切换 `pick` 的状态来完成，关闭就意味着你不想要这个提交记录）",
            "* 合并提交。 遗憾的是由于某种逻辑的原因，我们的课程不支持此功能，因此我不会详细介绍这个操作。简而言之，它允许你把多个提交记录合并成一个。",
            "",
            "接下来咱们看个实例"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "当你点击下面的按钮时，会出现一个交互对话框。对提交记录做个排序（当然你也可以删除某些提交），点击确定看结果"
          ],
          "afterMarkdowns": [
            "Git 严格按照你在对话框中指定的方式进行了复制。"
          ],
          "command": "git rebase -i HEAD~4",
          "beforeCommand": "git commit; git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要通过本关, 做一次交互式的 rebase，整理成目标窗口中的提交顺序。 记住，你随时都可以用 `undo`、`reset` 修正错误，这是不会记入步数的 :D"
          ]
        }
      }
    ]
  },
  "relative-refs-name": "相对引用（^）",
  "relative-refs-hint": "记住操作符（^）！",
  "relative-refs-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 相对引用",
            "",
            "通过指定提交记录哈希值的方式在 Git 中移动不太方便。在实际应用时，并没有像本程序中这么漂亮的可视化提交树供你参考，所以你就不得不用 `git log` 来查查看提交记录的哈希值。",
            "",
            "并且哈希值在真实的 Git 世界中也会更长（译者注：基于 SHA-1，共 40 位）。例如前一关的介绍中的提交记录的哈希值可能是 `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`。舌头都快打结了吧...",
            "",
            "比较令人欣慰的是，Git 对哈希的处理很智能。你只需要提供能够唯一标识提交记录的前几个字符即可。因此我可以仅输入`fed2` 而不是上面的一长串字符。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "正如我前面所说，通过哈希值指定提交记录很不方便，所以 Git 引入了相对引用。这个就很厉害了!",
            "",
            "使用相对引用的话，你就可以从一个易于记忆的地方（比如 `bugFix` 分支或 `HEAD`）开始计算。",
            "",
            "相对引用非常给力，这里我介绍两个简单的用法：",
            "",
            "* 使用 `^` 向上移动 1 个提交记录",
            "* 使用 `~<num>` 向上移动多个提交记录，如 `~3`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "首先看看操作符 (^)。把这个符号加在引用名称的后面，表示让 Git 寻找指定提交记录的父提交。",
            "",
            "所以 `master^` 相当于“`master` 的父节点”。",
            "",
            "`master^^` 是 `master` 的第二个父节点",
            "",
            "现在咱们切换到 master 的父节点"
          ],
          "afterMarkdowns": [
            "搞定。这种方式是不是比输入哈希值方便多了？！"
          ],
          "command": "git checkout master^",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "你也可以将 `HEAD` 作为相对引用的参照。下面咱们就用 `HEAD` 在提交树中向上移动几次。"
          ],
          "afterMarkdowns": [
            "很简单吧？！我们可以一直使用 `HEAD^` 向上移动。"
          ],
          "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
          "beforeCommand": "git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成此关，切换到 `bugFix` 的父节点。这会进入分离 `HEAD` 状态。",
            "",
            "如果你愿意的话，使用哈希值也可以过关，但请尽量使用相对引用！"
          ]
        }
      }
    ]
  },
  "relative-refs2-name": "相对引用2（~）",
  "relative-refs2-hint": "这一关至少要用到一次直接引用 (即哈希值)",
  "relative-refs2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### “~”操作符",
            "",
            "如果你想在提交树中向上移动很多步的话，敲那么多 `^` 貌似也挺烦人的，Git 当然也考虑到了这一点，于是又引入了操作符 `~`。",
            "",
            "",
            "该操作符后面可以跟一个数字（可选，不跟数字时与 `^` 相同，向上移动一次），指定向上移动多少次。咱们还是通过实际操作看一下吧"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "咱们用 `~<num>` 一次后退四步。"
          ],
          "afterMarkdowns": [
            "多么的简洁 —— 相对引用就是方便啊！"
          ],
          "command": "git checkout HEAD~4",
          "beforeCommand": "git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 强制修改分支位置",
            "",
            "你现在是相对引用的专家了，现在用它来做点实际事情。",
            "",
            "我使用相对引用最多的就是移动分支。可以直接使用 `-f` 选项让分支指向另一个提交。例如:",
            "",
            "`git branch -f master HEAD~3`",
            "",
            "上面的命令会将 master 分支强制指向 HEAD 的第 3 级父提交。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "现在咱们来演示一下刚才的命令："
          ],
          "afterMarkdowns": [
            "这就对了! 相对引用为我们提供了一种简洁的引用提交记录 `C1` 的方式， 而 `-f` 则容许我们将分支强制移动到那个位置。"
          ],
          "command": "git branch -f master HEAD~3",
          "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "既然你已经看过相对引用与强制移动分支的演示了，那么赶快使用这些技巧来挑战这一关吧！",
            "",
            "要完成此关，移动 `HEAD`，`master` 和 `bugFix` 到目标所示的位置。"
          ]
        }
      }
    ]
  },
  "reversing-changes-name": "撤销变更",
  "reversing-changes-hint": "注意 revert 和 reset 使用的参数不同。",
  "reversing-changes-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 撤销变更",
            "",
            "在 Git 里撤销变更的方法很多。和提交一样，撤销变更由底层部分（暂存区的独立文件或者片段）和上层部分（变更到底是通过哪种方式被撤销的）组成。我们这个应用主要关注的是后者。",
            "",
            "主要有两种方法用来撤销变更 —— 一是 `git reset`，还有就是 `git revert`。接下来咱们逐个进行讲解。",
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
            "`git reset` 通过把分支记录回退几个提交记录来实现撤销改动。你可以将这想象成“改写历史”。`git reset` 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。",
            "",
            "让我们来看看演示："
          ],
          "command": "git reset HEAD~1",
          "afterMarkdowns": [
            "漂亮! Git 把 master 分支移回到 `C1`；现在我们的本地代码库根本就不知道有 `C2` 这个提交了。",
            "",
            "（译者注：在reset后， `C2` 所做的变更还在，但是处于未加入暂存区状态。）"
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
            "虽然在你的本地分支中使用 `git reset` 很方便，但是这种“改写历史”的方法对大家一起使用的远程分支是无效的哦！",
            "",
            "为了撤销更改并**分享**给别人，我们需要使用 `git revert`。来看演示："
          ],
          "command": "git revert HEAD",
          "afterMarkdowns": [
            "奇怪！在我们要撤销的提交记录后面居然多了一个新提交！这是因为新提交记录 `C2'` 引入了**更改** —— 这些更改刚好是用来撤销 `C2` 这个提交的。也就是说 `C2'` 的状态与 `C1` 是相同的。",
            "",
            "revert 之后就可以把你的更改推送到远程仓库与别人分享啦。"
          ],
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成此关，分别撤销 `local` 分支和 `pushed` 分支上的最近一次提交。共需要撤销两个提交（每个分支一个）。",
            "",
            "记住 `pushed` 是远程分支，`local` 是本地分支 —— 这么说你应该知道用分别哪种方法了吧？"
          ]
        }
      }
    ]
  },
  "many-rebases-name": "多次 Rebase",
  "many-rebases-hint": "记住，最后更新 master 分支可能是最高效的方法……",
  "many-rebases-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 多分支 rebase",
            "",
            "哥们儿，我们准备了很多分支！咱们把这些分支 rebase 到 master 上吧。",
            "",
            "但是你的领导给你提了点要求 —— 他们希望得到有序的提交历史，也就是我们最终的结果应该是 `C6'` 在 `C7'` 上面， `C5'` 在 `C6'` 上面，依此类推。",
            "",
            "即使你搞砸了也没关系，用 `reset` 命令就可以重新开始了。记得看看我们提供的答案，看你能否使用更少的命令来完成任务！"
          ]
        }
      }
    ]
  },
  "selective-rebase-name": "纠缠不清的分支",
  "selective-rebase-hint": "确保你是按照正确的顺序来操作！先操作分支 `one`, 然后 `two`, 最后才是 `three`",
  "selective-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 纠缠不清的分支",
            "",
            "哇塞大神！这关我们要来点不同的！",
            "",
            "现在我们的 `master` 分支是比 `one`、`two` 和 `three` 要多几个提交。出于某种原因，我们需要把 `master` 分支上最近的几次提交做不同的调整后，分别添加到各个的分支上。",
            "",
            "`one` 需要重新排序并删除 `C5`，`two` 仅需要重排排序，而 `three` 只需要提交一次。",
            "",
            "慢慢来，你会找到答案的 —— 记得通关之后用 `show solution` 看看我们的答案哦。"
          ]
        }
      }
    ]
  },
  "clone-name": "Git Clone",
  "clone-hint": "只要 git clone 就可以了!",
  "clone-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 远程仓库",
            "",
            "远程仓库并不复杂, 在如今的云计算盛行的世界很容易把远程仓库想象成一个富有魔力的东西, 但实际上它们只是你的仓库在另个一台计算机上的拷贝。你可以通过因特网与这台计算机通信 —— 也就是增加或是获取提交记录",
            "",
            "话虽如此, 远程仓库却有一系列强大的特性",
            "",
            "- 首先也是最重要的的点, 远程仓库是一个强大的备份。本地仓库也有恢复文件到指定版本的能力, 但所有的信息都是保存在本地的。有了远程仓库以后，即使丢失了本地所有数据, 你仍可以通过远程仓库拿回你丢失的数据。",
            "",
            "- 还有就是, 远程让代码社交化了! 既然你的项目被托管到别的地方了, 你的朋友可以更容易地为你的项目做贡献(或者拉取最新的变更)",
            "",
            "现在用网站来对远程仓库进行可视化操作变得越发流行了(像 [Github](https://github.com/) 或 [Phabricator](http://phabricator.org/)), 但远程仓库**永远**是这些工具的顶梁柱, 因此理解其概念非常的重要!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 我们创建远程仓库的命令",
            "",
            "直到现在, 教程都聚焦于**本地**仓库的操作（branch、merge、rebase 等等）。但我们现在需要学习远程仓库的操作 —— 我们需要一个配置这种环境的命令, 它就是 `git clone`。",
            "从技术上来讲，`git clone` 命令在真实的环境下的作用是在**本地**创建一个远程仓库的拷贝（比如从 github.com）。 但在我们的教程中使用这个命令会有一些不同 —— 它会在远程创建一个你本地仓库的副本。显然这和真实命令的意思刚好相反，但是它帮咱们把本地仓库和远程仓库关联到了一起，在教程中就凑合着用吧。",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "咱们慢慢来，先看看远程仓库（在图示中）的样子。",
            ""
          ],
          "afterMarkdowns": [
            "就是它了! 现在我们有了一个自己项目的远程仓库。除了远程仓库使用虚线之外, 它们几乎没有什么差别 —— 在后面的关卡中, 你将会学习怎样在本地仓库和远程仓库间分享工作成果。"
          ],
          "command": "git clone",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成本关, 用 `git clone` 复制下你的仓库就可以了。后续的课程我们会正式地学习"
          ]
        }
      }
    ]
  },
  "fake-teamwork-name": "模拟团队合作",
  "fake-teamwork-hint": "记住你可以指定仿真提交的个数",
  "fake-teamwork-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 模拟团队合作",
            "",
            "这里有一件棘手的事 —— 为了接下来的课程, 我们需要先教你如何制造远程仓库的变更。",
            "",
            "这意味着，我们需要“假装”你的同事、朋友、合作伙伴更新了远程仓库，有可能是某个特定的分支，或是几个提交记录。",
            "",
            "为了做到这点，我们引入一个自造命令 `git fakeTeamwork`！它的名称已经说明了一切，先看演示.."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`fakeTeamwork` 默认操作就是在远程仓库的 master 分支上做一次提交。"
          ],
          "afterMarkdowns": [
            "完成了 —— 远程仓库增加了一个新提交，我们还没有下载它，因为我们还没有执行 `git fetch`。"
          ],
          "command": "git fakeTeamwork",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "你还可以指定提交的分支或是数量，只需要在命令后加上它们就可以了。"
          ],
          "afterMarkdowns": [
            "通过一个命令，我们就模拟队友推送了 3 个提交记录到远程仓库的 foo 分支。"
          ],
          "command": "git fakeTeamwork foo 3",
          "beforeCommand": "git branch foo; git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "接下来的关卡会相当的困难，所以在本关会让你做许多事情，先来热热身。",
            "",
            "克隆一个远程仓库（用 `git clone`），再在刚创建的远程仓库中模拟一些修改，然后在你自己的本地分支上做一些提交，再拉取远程仓库的变更。这看起来像是包含了好几节的课程。"
          ]
        }
      }
    ]
  },
  "fetch-name": "Git Fetch",
  "fetch-hint": "只需要运行 git fetch 命令!",
  "fetch-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Fetch",
            "",
            "Git 远程仓库相当的操作实际可以归纳为两点：向远程仓库传输数据以及从远程仓库获取数据。既然我们能与远程仓库同步，那么就可以分享任何能被 Git 管理的更新（因此可以分享代码、文件、想法、情书等等）。",
            "",
            "本节课我们将学习如何从远程仓库获取数据 —— 命令如其名，它就是 `git fetch`。",
            "",
            "你会看到当我们从远程仓库获取数据时, 远程分支也会更新以反映最新的远程仓库。在上一了我们已经提及过这一点了。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "在解释 `git fetch` 前，我们先看看实例。这里我们有一个远程仓库, 它有两个我们本地仓库中没有的提交。"
          ],
          "afterMarkdowns": [
            "就是这样了! `C2`,`C3` 被下载到了本地仓库，同时远程分支 `o/master` 也被更新，反映到了这一变化"
          ],
          "command": "git fetch",
          "beforeCommand": "git clone; git fakeTeamwork 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### git fetch 做了些什么",
            "",
            "`git fetch` 完成了仅有的但是很重要的两步:",
            "",
            "* 从远程仓库下载本地仓库中缺失的提交记录",
            "* 更新远程分支指针(如 `o/master`)",
            "",
            "`git fetch` 实际上将本地仓库中的远程分支更新成了远程仓库相应分支最新的状态。",
            "",
            "如果你还记得上一节课程中我们说过的，远程分支反映了远程仓库在你**最后一次与它通信时**的状态，`git fetch` 就是你与远程仓库通信的方式了！希望我说的够明白了，你已经了解 `git fetch` 与远程分支之间的关系了吧。",
            "",
            "`git fetch` 通常通过互联网（使用 `http://` 或 `git://` 协议) 与远程仓库通信。",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### git fetch 不会做的事",
            "",
            "`git fetch` 并不会改变你本地仓库的状态。它不会更新你的 `master` 分支，也不会修改你磁盘上的文件。",
            "",
            "理解这一点很重要，因为许多开发人员误以为执行了 `git fetch` 以后，他们本地仓库就与远程仓库同步了。它可能已经将进行这一操作所需的所有数据都下载了下来，但是**并没有**修改你本地的文件。我们在后面的课程中将会讲解能完成该操作的命令 :D",
            "",
            "所以, 你可以将 `git fetch` 的理解为单纯的下载操作。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成本关，只需用 `git fetch` 下载所有的提交！"
          ]
        }
      }
    ]
  },
  "fetch-args-name": "Git fetch 的参数",
  "fetch-args-hint": "注意下提交对象的 id 是如何交换的! 你可以通过 `help level` 重新阅读本关卡的所有对话框!",
  "fetch-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git fetch 的参数",
            "",
            "我们刚学习了 git push 的参数，很酷的 `<place>` 参数，还有用冒号分隔的 refspecs（`<source>:<destination>`）。 这些参数可以用于 `git fetch` 吗？",
            "",
            "你猜中了！`git fetch` 的参数和 `git push` 极其相似。他们的概念是相同的，只是方向相反罢了（因为现在你是下载，而非上传）",
            "",
            "让我们逐个讨论下这些概念……"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "###  `<place>` 参数",
            "",
            "如果你像如下命令这样为 git fetch 设置 <place> 的话：",
            "",
            "`git fetch origin foo`",
            "",
            "Git 会到远程仓库的 `foo` 分支上，然后获取所有本地不存在的提交，放到本地的 `o/foo` 上。",
            "",
            "来看个例子（还是前面的例子，只是命令不同了）"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "通过指定 place..."
          ],
          "afterMarkdowns": [
            "我们只下载了远程仓库中 `foo` 分支中的最新提交记录，并更新了 o/foo"
          ],
          "command": "git fetch origin foo",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "你可能会好奇 —— 为何 Git 会将新提交放到 `o/foo` 而不是放到我本地的 foo 分支呢？之前不是说这样的 <place> 参数就是同时应用于本地和远程的位置吗？",
            "",
            "好吧, 本例中 Git 做了一些特殊处理，因为你可能在 foo 分支上的工作还未完成，你也不想弄乱它。还记得在 `git fetch` 课程里我们讲到的吗 —— 它不会更新你的本地的非远程分支, 只是下载提交记录（这样, 你就可以对远程分支进行检查或者合并了）。",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "“如果我们指定 `<source>:<destination>` 会发生什么呢？”",
            "",
            "如果你觉得直接更新本地分支很爽，那你就用冒号分隔的 refspec 吧。不过，你不能在当前检出的分支上干这个事，但是其它分支是可以的。",
            "",
            "这里有一点是需要注意的 —— `source` 现在指的是远程仓库中的位置，而 `<destination>` 才是要放置提交的本地仓库的位置。它与 git push 刚好相反，这是可以讲的通的，因为我们在往相反的方向传送数据。",
            "",
            "理论上虽然行的通，但开发人员很少这么做。我在这里介绍它主要是为了从概念上说明 `fetch` 和 `push` 的相似性，只是方向相反罢了。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "来看个疯狂的例子："
          ],
          "afterMarkdowns": [
            "哇! 看见了吧, Git 将 `foo~1` 解析成一个 origin 仓库的位置，然后将那些提交记录下载到了本地的 `bar` 分支（一个本地分支）上。注意由于我们指定了目标分支，`foo` 和 `o/foo` 都没有被更新。"
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果执行命令前目标分支不存在会怎样呢？我们看一下上个对话框中没有 bar 分支的情况。"
          ],
          "afterMarkdowns": [
            "看见了吧，跟 git push 一样，Git 会在 fetch 前自己创建立本地分支, 就像是 Git 在 push 时，如果远程仓库中不存在目标分支，会自己在建立一样。"
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "没有参数呢?",
            "",
            "如果 `git fetch` 没有参数，它会下载所有的提交记录到各个远程分支……"
          ],
          "afterMarkdowns": [
            "相当简单，但是仅需更新一次，值得你去做！"
          ],
          "command": "git fetch",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "好, 说得太多了！要完成本关，抓取目标窗口中指定的提交记录，使用这些魔幻的命令吧！",
            "",
            "使用 fetch 时, 你必须指定 source 和 destination。 注意一下目标窗口, 因为提交对象的 ID 可能会变哦!"
          ]
        }
      }
    ]
  },
  "fetch-rebase-name": "偏离的提交历史",
  "fetch-rebase-hint": "按照目标中的提交树的顺序进行检出",
  "fetch-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 偏离的工作",
            "",
            "现在我们已经知道了如何从其它地方 `pull` 提交记录，以及如何 `push` 我们自己的变更。看起来似乎没什么难度，但是为何还会让人们如此困惑呢？",
            "",
            "困难来自于远程库提交历史的**偏离**。在讨论这个问题的细节前，我们先来看一个例子……",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "假设你周一克隆了一个仓库，然后开始研发某个新功能。到周五时，你新功能开发测试完毕，可以发布了。但是 —— 天啊！你的同事这周写了一堆代码，还改了许多你的功能中使用的 API，这些变动会导致你新开发的功能变得不可用。但是他们已经将那些提交推送到远程仓库了，因此你的工作就变成了基于项目**旧版**的代码，与远程仓库最新的代码不匹配了。",
            "",
            "这种情况下, `git push` 就不知道该如何操作了。如果你执行 `git push`，Git 应该让远程仓库回到星期一那天的状态吗？还是直接在新代码的基础上添加你的代码，异或由于你的提交已经过时而直接忽略你的提交？",
            "",
            "因为这情况（历史偏离）有许多的不确定性，Git 是不会允许你 `push` 变更的。实际上它会强制你先合并远程最新的代码，然后才能分享你的工作。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "说了这么多，咱们还是看看实际案例吧！"
          ],
          "afterMarkdowns": [
            "看见了吧？什么都没有变，因为命令失败了！`git push` 失败是因为你最新提交的 `C3` 基于远程分支中的 `C1`。而远程仓库中该分支已经更新到 `C2` 了，所以 Git 拒绝了你的推送请求。"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "那该如何解决这个问题呢？很简单，你需要做的就是使你的工作基于最新的远程分支。",
            "",
            "有许多方法做到这一点呢，不过最直接的方法就是通过 rebase 调整你的工作。咱们继续，看看怎么 rebase！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果我们在 push 之前做 rebase 呢？"
          ],
          "afterMarkdowns": [
            "我们用 `git fetch` 更新了本地仓库中的远程分支，然后用 rebase 将工们的工作移动到最新的提交记录下，最后再用 `git push` 推送到远程仓库。"
          ],
          "command": "git fetch; git rebase o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "还有其它的方法可以在远程仓库变更了以后更新我的工作吗? 当然有，我们还可以使用 `merge`",
            "",
            "尽管 `git merge` 不会移动你的工作（它会创建新的合并提交），但是它会告诉 Git 你已经合并了远程仓库的所有变更。这是因为远程分支现在是你本地分支的祖先，也就是说你的提交已经包含了远程分支的所有变化。",
            "",
            "看下演示..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "咱们们用 merge 替换 rebase 来试一下……"
          ],
          "afterMarkdowns": [
            "我们用 `git fetch` 更新了本地仓库中的远程分支，然后**合并**了新变更到我们的本地分支（为了包含远程仓库的变更），最后我们用 `git push` 把工作推送到远程仓库"
          ],
          "command": "git fetch; git merge o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "很好！但是要敲那么多命令，有没有更简单一点的？",
            "",
            "当然 —— 前面已经介绍过 `git pull` 就是 fetch 和 merge 的简写，类似的 `git pull --rebase` 就是 fetch 和 rebase 的简写！",
            "",
            "让我们看看简写命令是如何工作的。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "这次用 `--rebase`……"
          ],
          "afterMarkdowns": [
            "跟之前结果一样，但是命令更短了。"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "换用常规的 `pull`"
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
            "由 fetch、rebase/merge 和 push 组成的工作流很普遍。后续课程我们会讲解更复杂的工作流，不过现在我们先解决这个关卡吧。",
            "",
            "要完成本关，你需要完成以下几步：",
            "",
            "* 克隆你的仓库",
            "* 模拟一次远程提交（fakeTeamwork）",
            "* 完成一次本地提交",
            "* 用 *rebase* 发布你的工作"
          ]
        }
      }
    ]
  },
  "merge-many-features-name": "合并远程仓库",
  "merge-many-features-hint": "注意目标树!",
  "merge-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 为什么不用 merge 呢?",
            "",
            "为了 push 新变更到远程仓库，你要做的就是**包含**远程仓库中最新变更。意思就是只要你的本地分支包含了远程分支（如 `o/master`）中的最新变更就可以了，至于具体是用 rebase 还是 merge，并没有限制。",
            "",
            "那么既然没有规定限制，为何前面几节都在着重于 rebase 呢？为什么在操作远程分支时不喜欢用 `merge` 呢？",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "在开发社区里，有许多关于 merge 与 rebase 的讨论。以下是关于 rebase 的优缺点：",
            "",
            "优点:",
            "",
            "* Rebase 使你的提交树变得很干净, 所有的提交都在一条线上",
            "",
            "缺点:",
            "",
            "* Rebase 修改了提交树的历史",
            "",
            "比如, 提交 C1 可以被 rebase 到 C3 之后。这看起来 C1 中的工作是在 C3 之后进行的，但实际上是在 C3 之前。",
            "",
            "一些开发人员喜欢保留提交历史，因此更偏爱 merge。而其他人（比如我自己）可能更喜欢干净的提交树，于是偏爱 rebase。仁者见仁，智者见智。 :D"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "本关，我们还是解决上一关卡中的问题，但是要用 merge 替换 rebase。这显然有点画蛇添足，但这只是为了更好的说明上面的观点。"
          ]
        }
      }
    ]
  },
  "pull-name": "Git Pull",
  "pull-hint": "运行 git pull 命令就可以了！",
  "pull-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Pull",
            "",
            "既然我们已经知道了如何用 `git fetch` 获取远程的数据, 现在我们学习如何将这些变化更新到我们的工作当中。",
            "",
            "其实有很多方法的 —— 当远程分支中有新的提交时，你可以像合并本地分支那样来合并远程分支。也就是说就是你可以执行以下命令: ",
            "",
            "* `git cherry-pick o/master`",
            "* `git rebase o/master`",
            "* `git merge o/master`",
            "* 等等",
            "",
            "实际上，由于先抓取更新再合并到本地分支这个流程很常用，因此 Git 提供了一个专门的命令来完成这两个操作。它就是我们要讲的 `git pull`。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "我们先来看看 `fetch`、`merge` 依次执行的效果"
          ],
          "afterMarkdowns": [
            "我们用 `fetch` 下载了 `C3`, 然后通过 `git merge o/master` 合并了这一提交记录。现在我们的 `master` 分支包含了远程仓库中的更新（在本例中远程仓库名为 `origin`）"
          ],
          "command": "git fetch; git merge o/master",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果使用 `git pull` 呢?"
          ],
          "afterMarkdowns": [
            "同样的结果！这清楚地说明了 `git pull` 就是 git fetch 和 git merge <just-fetched-branch> 的缩写！"
          ],
          "command": "git pull",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "稍后我们会探索一下 `git pull` 的细节(包括选项和参数)，现在咱们先解决这个关卡。",
            "",
            "实际上你完全可以用 `fetch` 和 `merge` 通过本关，但是这会增加你的命令数。 :P"
          ]
        }
      }
    ]
  },
  "pull-args-name": "Git pull 的参数",
  "pull-args-hint": "记住, 你可以通过 fetch/pull 创建本地分支",
  "pull-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git pull 参数",
            "",
            "既然你已经掌握关于 `git fetch` 和 `git push` 参数的方方面面了，关于 git pull 几乎没有什么可以讲的了 :)",
            "",
            "因为 git pull 到头来就是 fetch 后跟 merge 的缩写。你可以理解为用同样的参数执行 git fetch，然后再 merge 你所抓取到的提交记录。",
            "",
            "还可以和其它更复杂的参数一起使用, 来看一些例子:"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "以下命令在 Git 中是等效的:",
            "",
            "`git pull origin foo` 相当于：",
            "",
            "`git fetch origin foo; git merge o/foo`",
            "",
            "还有...",
            "",
            "`git pull origin bar~1:bugFix` 相当于：",
            "",
            "`git fetch origin bar~1:bugFix; git merge bugFix`",
            "",
            "看到了? git pull 实际上就是 fetch + merge 的缩写, git pull 唯一关注的是提交最终合并到哪里（也就是为 git fetch 所提供的 destination 参数）",
            "",
            "一起来看个例子吧："
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果我们指定要抓取的 place，所有的事情都会跟之前一样发生，只是增加了 merge 操作"
          ],
          "afterMarkdowns": [
            "看到了吧! 通过指定 `master` 我们更新了 `o/master`。然后将 `o/master` merge 到我们的检出位置，**无论**我们当前检出的位置是哪。"
          ],
          "command": "git pull origin master",
          "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "pull 也可以用 source:destination 吗? 当然喽, 看看吧:"
          ],
          "afterMarkdowns": [
            " 哇, 这个命令做的事情真多。它先在本地创建了一个叫 `foo` 的分支，从远程仓库中的 master 分支中下载提交记录，并合并到 `foo`，然后再 merge 到我们的当前检出的分支 `bar` 上。操作够多的吧？！"
          ],
          "command": "git pull origin master:foo",
          "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "好啦, 该结束了！请按照目标窗口中的状态进行操作。你需要下载一些提交，然后创建一些新分支，再合并这些分支到其它分支, 但这用不了几个命令 :P "
          ]
        }
      }
    ]
  },
  "push-name": "Git Push",
  "push-hint": "推送之前需要先克隆",
  "push-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Push",
            "",
            "OK，我们已经学过了如何从远程仓库获取更新并合并到本地的分支当中。这非常棒……但是我如何与大家分享**我的**成果呢？",
            "",
            "嗯，上传自己分享内容与下载他人的分享刚好相反，那与 `git pull` 相反的命令是什么呢？`git push`！",
            "",
            "`git push` 负责将**你的**变更上传到指定的远程仓库，并在远程仓库上合并你的新提交记录。一旦 `git push` 完成, 你的朋友们就可以从这个远程仓库下载你分享的成果了！",
            "",
            "你可以将 `git push` 想象成发布你成果的命令。它有许多应用技巧，稍后我们会了解到，但是咱们还是先从基础的开始吧……",
            "",
            "*注意 —— `git push` 不带任何参数时的行为与 Git 的一个名为 `push.default` 的配置有关。它的默认值取决于你正使用的 Git 的版本，但是在教程中我们使用的是 `upstream`。",
            "这没什么太大的影响，但是在你的项目中进行推送之前，最好检查一下这个配置。*"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "这里我们准备了一些远程仓库中没有的提交记录, 咱们开始先上传吧!"
          ],
          "afterMarkdowns": [
            "过去了, 远程仓库接收了 `C2`，远程仓库中的 `master` 分支也被更新到指向 `C2` 了，我们的远程分支 (o/master) 也同样被更新了。所有的分支都同步了！"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成本关，需要向远程仓库分享两个提交记录。拿出十二分精神吧，后面的课程还会更难哦！"
          ]
        }
      }
    ]
  },
  "push-args-name": "Git push 的参数",
  "push-args-hint": "你可以利用“objective”来阅读对话窗口的最后一页",
  "push-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Push 的参数",
            "",
            "很好! 既然你知道了远程跟踪分支，我们可以开始揭开 git push、fetch 和 pull 的神秘面纱了。我们会逐个介绍这几个命令，它们在理念上是非常相似的。",
            "",
            "首先来看 `git push`。在远程跟踪课程中，你已经学到了 Git 是通过当前检出分支的属性来确定远程仓库以及要 push 的目的地的。这是未指定参数时的行为，我们可以为 push 指定参数，语法是：",
            "",
            "`git push <remote> <place>`",
            "",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "`<place>` 参数是什么意思呢？我们稍后会深入其中的细节, 先看看例子, 这个命令是:",
            "",
            "`git push origin master`",
            "",
            "把这个命令翻译过来就是：",
            "",
            "*切到本地仓库中的“master”分支，获取所有的提交，再到远程仓库“origin”中找到“master”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。*",
            "",
            "我们通过“place”参数来告诉 Git 提交记录来自于 master, 要推送到远程仓库中的 master。它实际就是要同步的两个仓库的位置。",
            "",
            "需要注意的是，因为我们通过指定参数告诉了 Git 所有它需要的信息, 所以它就忽略了我们所检出的分支的属性！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "我们看看指定参数的例子。注意下我们当前检出的位置。"
          ],
          "afterMarkdowns": [
            "好了! 通过指定参数, 远程仓库中的 `master` 分支得到了更新。"
          ],
          "command": "git checkout C0; git push origin master",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果不指定参数会发生什么呢?"
          ],
          "afterMarkdowns": [
            "命令失败了（正如你看到的，什么也没有发生）! 因为我们所检出的 HEAD 没有跟踪任何分支。"
          ],
          "command": "git checkout C0; git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "本关我们要更新远程仓库中的 `foo` 和 `master`, 但是 `git checkout` 被禁用了！",
            "",
            "*注意：远程分支使用 `o/` 开头是因为 `origin/` 对于 UI 来说太长了。不用太在意这个，直接用 `origin` 作为远程仓库的名称就可以了。*",
            ""
          ]
        }
      }
    ]
  },
  "push-args2-name": "Git push 参数 2",
  "push-args2-hint": "如果你认输的话，可以通过“show solution”查看解决方案 :P",
  "push-args2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## `<place>`参数详解",
            "",
            "还记得之前课程说的吧，当为 git push 指定 place 参数为 `master` 时，我们同时指定了提交记录的来源和去向。",
            "",
            "你可能想问 —— 如果来源和去向分支的名称不同呢？比如你想把本地的 `foo` 分支推送到远程仓库中的 `bar` 分支。",
            "",
            "哎，很遗憾 Git 做不到…… 开个玩笑，别当真！当然是可以的啦 :) Git 拥有超强的灵活性（有点过于灵活了）",
            "",
            "接下来咱们看看是怎么做的……"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要同时为源和目的地指定 `<place>` 的话，只需要用冒号 `:` 将二者连起来就可以了：",
            "",
            "`git push origin <source>:<destination>`",
            "",
            "这个参数实际的值是个 refspec，“refspec” 是一个自造的词，意思是 Git 能识别的位置（比如分支 `foo` 或者 `HEAD~1`）",
            "",
            "一旦你指定了独立的来源和目的地，就可以组织出言简意赅的远程操作命令了，让我们看看演示！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "记住，`source` 可以是任何 Git 能识别的位置："
          ],
          "afterMarkdowns": [
            "这是个另人困惑的命令，但是它确实是可以运行的 —— Git 将 `foo^` 解析为一个位置，上传所有未被包含到远程仓库里 `master` 分支中的提交记录。"
          ],
          "command": "git push origin foo^:master",
          "beforeCommand": "git clone; go -b foo; git commit; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果你要推送到的目的分支不存在会怎么样呢？没问题！Git 会在远程仓库中根据你提供的名称帮你创建这个分支！"
          ],
          "afterMarkdowns": [
            "很赞吧！它是不是很聪明？！ :D"
          ],
          "command": "git push origin master:newBranch",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "在这个关卡中，试着完成目标窗口展示的提交树，记住参数格式哟：",
            "",
            "`<source>:<destination>`"
          ]
        }
      }
    ]
  },
  "push-many-features-name": "推送主分支",
  "push-many-features-hint": "你随时都可以使用 undo 或 reset 命令。",
  "push-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 合并特性分支",
            "",
            "既然你应该很熟悉 fetch、pull、push 了，现在我们要通过一个新的工作流来测试你的这些技能。",
            "",
            "在大型项目中开发人员通常会在（从 `master` 上分出来的）特性分支上工作，工作完成后只做一次集成。这跟前面课程的描述很相像（把 side 分支推送到远程仓库），不过本节我们会深入一些.",
            "",
            "但是有些开发人员只在 master 上做 push、pull —— 这样的话 master 总是最新的，始终与远程分支 (o/master) 保持一致。",
            "",
            "对于接下来这个工作流，我们集成了两个步骤：",
            "",
            "* 将特性分支集成到 `master` 上",
            "* 推送并更新远程分支"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "让我们看看如何快速的更新 `master` 分支并推送到远程。"
          ],
          "afterMarkdowns": [
            "我们执行了两个命令: ",
            "",
            "* 将我们的工作 rebase 到远程分支的最新提交记录",
            "* 向远程仓库推送我们的工作"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "这个关卡的 Boss 很厉害 —— 以下是通关提示：",
            "",
            "* 这里共有三个特性分支 —— `side1` `side2` 和 `side3`",
            "* 我需要将这三分支按顺序推送到远程仓库",
            "* 因为远程仓库已经被更新过了，所以我们还要把那些工作合并过来",
            "",
            ":O 紧张了？祝你好运！完成了本关, 你就向目标又迈近了一大步啦！"
          ]
        }
      }
    ]
  },
  "remote-branches-name": "远程分支",
  "remote-branches-hint": "注意顺序 —— 先在 master 分支上提交!",
  "remote-branches-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 远程分支",
            "",
            "既然你已经看过 `git clone` 命令了，咱们深入地看一下发生了什么。",
            "",
            "你可能注意到的第一个事就是在我们的本地仓库多了一个名为 `o/master` 的分支, 这种类型的分支就叫**远程**分支。由于远程分支的特性导致其拥有一些特殊属性。",
            "",
            "远程分支反映了远程仓库(在你上次和它通信时)的**状态**。这会有助于你理解本地的工作与公共工作的差别 —— 这是你与别人分享工作成果前至关重要的一步.",
            "",
            "远程分支有一个特别的属性，在你检出时自动进入分离 HEAD 状态。Git 这么做是出于不能直接在这些分支上进行操作的原因, 你必须在别的地方完成你的工作, （更新了远程分支之后）再用远程分享你的工作成果。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 为什么有 `o/`？",
            "",
            "你可能想问这些远程分支的前面的 `o/` 是什么意思呢？好吧, 远程分支有一个命名规范 —— 它们的格式是: ",
            "",
            "* `<remote name>/<branch name>`",
            "",
            "因此，如果你看到一个名为 `o/master` 的分支，那么这个分支就叫 `master`，远程仓库的名称就是 `o`。",
            "",
            "大多数的开发人员会将它们主要的远程仓库命名为 `origin`，并不是 `o`。这是因为当你用 `git clone` 某个仓库时，Git 已经帮你把远程仓库的名称设置为 `origin` 了",
            "",
            "不过 `origin` 对于我们的 UI 来说太长了，因此不得不使用简写 `o` :) 但是要记住, 当你使用真正的 Git 时, 你的远程仓库默认为 `origin`! ",
            "",
            "说了这么多，让我们看看实例。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果检出远程分支会怎么样呢？"
          ],
          "afterMarkdowns": [
            "正如你所见，Git 变成了分离 HEAD 状态，当添加新的提交时 `o/master` 也不会更新。这是因为 `o/master` 只有在远程仓库中相应的分支更新了以后才会更新。"
          ],
          "command": "git checkout o/master; git commit",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要通过本关，在 `master` 分支上做一次提交；然后检出 `o/master`，再做一提交。这有助于你理解远程分支的不同，他们的更新只是反映了远程的状态。"
          ]
        }
      }
    ]
  },
  "source-nothing-name": "没有 source 的 source",
  "source-nothing-hint": "本关的 branch 命令被禁用了，你只能用 fetch！",
  "source-nothing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 古怪的 `<source>`",
            "",
            "Git 有两种关于 `<source>` 的用法是比较诡异的，即你可以在 git push 或 git fetch 时不指定任何 `source`，方法就是仅保留冒号和 destination 部分，source 部分留空。",
            "",
            "* `git push origin :side`",
            "* `git fetch origin :bugFix`",
            "",
            "我们分别来看一下这两条命令的作用……"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果 push 空 <source> 到远程仓库会如何呢？它会删除远程仓库中的分支！"
          ],
          "afterMarkdowns": [
            "就是这样子, 我们通过给 push 传空值 source，成功删除了远程仓库中的 `foo` 分支, 这真有意思..."
          ],
          "command": "git push origin :foo",
          "beforeCommand": "git clone; git push origin master:foo"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果 fetch 空 <source> 到本地，会在本地创建一个新分支。"
          ],
          "afterMarkdowns": [
            "很神奇吧！但无论怎么说, 这就是 Git！"
          ],
          "command": "git fetch origin :bar",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "这个关卡很容易 —— 只要删除一个远程的分支, 再用 `git fetch` 在本地创建一个新分支就可以了！"
          ]
        }
      }
    ]
  },
  "tracking-name": "远程追踪",
  "tracking-hint": "记住，有两种设置 remote tracking 的方法!",
  "tracking-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 远程跟踪分支",
            "",
            "在前几节课程中有件事儿挺神奇的，Git 好像知道 `master` 与 `o/master` 是相关的。当然这些分支的名字是相似的，可能会让你觉得是依此将远程分支 master 和本地的 master 分支进行了关联。这种关联在以下两种情况下可以清楚地得到展示：",
            "",
            "* pull 操作时, 提交记录会被先下载到 o/master 上，之后再合并到本地的 master 分支。隐含的合并目标由这个关联确定的。",
            "* push 操作时, 我们把工作从 `master` 推到远程仓库中的 `master` 分支(同时会更新远程分支 `o/master`) 。这个推送的目的地也是由这种关联确定的！",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 远程跟踪",
            "",
            "直接了当地讲，`master` 和 `o/master` 的关联关系就是由分支的“remote tracking”属性决定的。`master` 被设定为跟踪 `o/master` —— 这意味着为 `master` 分支指定了推送的目的地以及拉取后合并的目标。",
            "",
            "你可能想知道 `master` 分支上这个属性是怎么被设定的，你并没有用任何命令指定过这个属性呀！好吧, 当你克隆仓库的时候, Git 就自动帮你把这个属性设置好了。",
            "",
            "当你克隆时, Git 会为远程仓库中的每个分支在本地仓库中创建一个远程分支（比如 `o/master`）。然后再创建一个跟踪远程仓库中活动分支的本地分支，默认情况下这个本地分支会被命名为 `master`。",
            "",
            "克隆完成后，你会得到一个本地分支（如果没有这个本地分支的话，你的目录就是“空白”的），但是可以查看远程仓库中所有的分支（如果你好奇心很强的话）。这样做对于本地仓库和远程仓库来说，都是最佳选择。",
            "",
            "这也解释了为什么会在克隆的时候会看到下面的输出：",
            "",
            "    local branch \"master\" set to track remote branch \"o/master\"",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 我能自己指定这个属性吗？",
            "",
            "当然可以啦！你可以让任意分支跟踪 `o/master`, 然后该分支会像 `master` 分支一样得到隐含的 push 目的地以及 merge 的目标。 这意味着你可以在分支 `totallyNotMaster` 上执行 `git push`，将工作推送到远程仓库的 `master` 分支上。",
            "",
            "有两种方法设置这个属性，第一种就是通过远程分支检出一个新的分支，执行: ",
            "",
            "`git checkout -b totallyNotMaster o/master`",
            "",
            "就可以创建一个名为 `totallyNotMaster` 的分支，它跟踪远程分支 `o/master`。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "闲话少说，咱们先看看演示！我们检出一个名叫 `foo` 的新分支，让其跟踪远程仓库中的 `master`"
          ],
          "afterMarkdowns": [
            "正如你所看到的, 我们使用了隐含的目标 `o/master` 来更新 `foo` 分支。需要注意的是 master 并未被更新！"
          ],
          "command": "git checkout -b foo o/master; git pull",
          "beforeCommand": "git clone; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "git push 同样适用"
          ],
          "afterMarkdowns": [
            "我们将一个并不叫 `master` 的分支上的工作推送到了远程仓库中的 `master` 分支上"
          ],
          "command": "git checkout -b foo o/master; git commit; git push",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 第二种方法",
            "",
            "另一种设置远程追踪分支的方法就是使用：`git branch -u` 命令，执行：",
            "",
            "`git branch -u o/master foo`",
            "",
            "这样 `foo` 就会跟踪 `o/master` 了。如果当前就在 foo 分支上, 还可以省略 foo：",
            "",
            "`git branch -u o/master`",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "看看这种方式的实际的效果..."
          ],
          "afterMarkdowns": [
            "跟之前一样, 但这个命令更明确！"
          ],
          "command": "git branch -u o/master foo; git commit; git push",
          "beforeCommand": "git clone; git checkout -b foo"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "OK! 本节我们在**不**检出 `master` 分支的情况下将工作推送到的远程仓库中的 `master` 分支上。因为这是高级课程, 就不做过多的提示了! :P"
          ]
        }
      }
    ]
  },
  "sequence-intro-display": "基础篇",
  "sequence-intro-about": "循序渐进地介绍 Git 主要命令",
  "sequence-rampup-display": "高级篇",
  "sequence-rampup-about": "要开始介绍 Git 的超棒特性了，快来吧！",
  "sequence-remote-display": "Push & Pull —— Git 远程仓库！",
  "sequence-remote-about": "是时候分享你的代码了，让编码变得社交化吧",
  "sequence-remote-advanced-display": "关于 origin 和它的周边 —— Git 远程仓库高级操作",
  "sequence-remote-advanced-about": "做一名仁慈的独裁者一定会很有趣……",
  "sequence-move-display": "移动提交记录",
  "sequence-move-about": "自由修改提交树",
  "sequence-mixed-display": "杂项",
  "sequence-mixed-about": "Git 技术、技巧与贴士大集合",
  "sequence-advanced-display": "高级话题",
  "sequence-advanced-about": "只为真正的勇士！",
  "dialogs-confirm": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 确定要看答案吗？",
          "",
          "相信自己，你可以的！"
        ]
      }
    }
  ],
  "dialogs-level-builder": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 欢迎使用关卡生成器！",
          "",
          "关键步骤如下：",
          "",
          "  * 用 Git 命令建立初始环境",
          "  * 用 ```define start``` 命令定义初始提交树",
          "  * 输入一系列 Git 命令作为（最佳）答案",
          "  * 用 ```define goal``` 命令定义目标提交树。定义目标的同时也定义了答案",
          "  * （选做）还可以用 ```define hint``` 命令定义提示",
          "  * 用 ```define name``` 命令设置关卡名称",
          "  * （选做）还可以用 ```edit dialog``` 定义一个漂亮的开始对话框",
          "  * 用 ```finish``` 命令就可以输出你的关卡的JSON数据了！"
        ]
      }
    }
  ],
  "dialogs-next-level": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 好样的！",
          "",
          "你用 *{numCommands}* 条命令通过了这一关；",
          "我们的答案要用 {best} 条命令。"
        ]
      }
    }
  ],
  "dialogs-sandbox": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 欢迎光临 Learn Git Branching",
          "",
          "你对 Git 感兴趣吗？那么算是来对地方了！",
          "“Learning Git Branching” 可以说是目前为止最好的教程了，在沙盒里你能执行相应的命令，还能看到每个命令的执行情况；",
          "通过一系列刺激的关卡挑战，逐步深入的学习 Git 的强大功能，在这个过程中你可能还会发现一些有意思的事情。",
          "",
          "关闭这个对话框以后，你会看到我们提供的许多关卡。如果你是初学者，从第一关开始逐个向后挑战就是了。",
          "而如果你已经入门了，可以略过前面，直接挑战后面更有难度的关卡。",
          "",
          "### 演示",
          "",
          "如果你还没看过演示，请[到此](?demo)查看。",
          "",
          "PS：想直接进入沙盒？ 在 URL 后头加上 `?NODEMO` 就可以了，试一下[这个链接](?NODEMO)："
        ]
      }
    }
  ],
  "finish-dialog-finished": "Wow！你通关了！",
  "finish-dialog-next": "要不要试试下一关 *“{nextLevel}”*？",
  "finish-dialog-win": "太强了！你的答案符合标准答案甚至更好。",
  "finish-dialog-lose": "试试看你能否在 {best} 步之内搞定 :D",
  "hg-prune-tree": "注意！ Mercurial 会进行主动垃圾回收，需要将你的提交树縮小。",
  "hg-a-option": "对本 App 而言，-A 选项并非必须项，直接 commit 就好！",
  "hg-error-no-status": "本 App 没有 status 命令哦，因为根本没有 stage 缓存文件。可以用 hg summary 代替哦",
  "hg-error-need-option": "我需要该命令使用 {option} 选项呢。",
  "hg-error-log-no-follow": "暂不支持没有-f 选项的 hg log 命令，请补充 -f 选项吧",
  "git-status-detached": "游离的 Head（Detached head）！",
  "git-status-onbranch": "当前分支 {branch}",
  "git-status-readytocommit": "可以提交啦！（在这个程序中无须修改文件，一直可以提交）",
  "git-dummy-msg": "快速提交。Coding 4ever！",
  "git-error-origin-fetch-uptodate": "已经是最新的了",
  "git-error-origin-fetch-no-ff": "你的 origin 仓库中的分支与远程分支的不同步了，无法执行 fetch 命令",
  "git-error-origin-push-no-ff": "远程仓库与你的本地仓库产生了分歧，故此上传操作无法通过 Fast-forward 实现（因此你的 push 被拒绝了）。请 pull 下来远程仓库里最新的更改，与这个分支合并之后再试一次。你可以通过 git pull 或 git pull --rebase 实现。",
  "git-error-remote-branch": "你不能在远程分支上执行这个命令。",
  "git-error-origin-required": "该命令需要一个 origin",
  "git-error-origin-exists": "origin 已存在。你不能重复创建",
  "git-error-branch": "你不能删除主分支（master），或者你当前所在的分支，或者其它连分支也不是的东西。",
  "git-merge-msg": "合并 {target} 到 {current}",
  "git-error-rebase-none": "没有可以 rebase 的提交记录！可能是合并提交，或者已经 rebase 过了。",
  "git-result-nothing": "什么也没发生...",
  "git-result-fastforward": "快速前进...",
  "git-result-uptodate": "分支已经是最新啦",
  "git-error-exist": "引用 {ref} 不存在。",
  "git-error-relative-ref": "{commit} 提交并没有 {match}",
  "git-warning-detached": "警告！现在是分离 HEAD 状态",
  "git-warning-add": "此程序中不需要添加文件",
  "git-error-options": "你所指定的参数不兼容或者不准确",
  "git-error-already-exists": "{commit} 提交已经存在于你的改动集里，已忽略！",
  "git-error-reset-detached": "不能在分离的 HEAD 里重置！用 checkout 吧",
  "git-warning-hard": "在本程序中默认的行为是 --hard 硬重置，可以尽情省略掉那个选项以避免麻烦！但是要记录 Git 中默认的是 --mixed。",
  "git-error-staging": "没有添加、缓存文件的必要，所以该选项或者命令是不合法的。",
  "git-revert-msg": "撤销 {oldCommit}：{oldMsg}",
  "git-error-args-many": "{what} 期望最多 {upper} 个参数",
  "git-error-args-few": "{what} 期望最少 {lower} 个参数",
  "git-error-no-general-args": "该命令不接收参数",
  "copy-tree-string": "拷贝下面的树字符串",
  "learn-git-branching": "学习 Git 分支",
  "select-a-level": "选择一关",
  "main-levels-tab": "主要",
  "remote-levels-tab": "远程",
  "branch-name-short": "抱歉，为了显示的需要，我们需要一个短些的分支名称。您使用的名称将被截断到9个字符，即 \"{branch}\"",
  "bad-branch-name": "不能给分支起这个名字 \"{branch}\"",
  "bad-tag-name": "该标签名 “{tag}” 不被接受。",
  "option-not-supported": "不支持选项 \"{option}\"",
  "git-usage-command": "git <命令> [<参数>]",
  "git-supported-commands": "支持的命令有:",
  "git-usage": "使用:",
  "git-version": "Git 版本 PCOTTLE.1.0",
  "flip-tree-command": "翻转树中...",
  "refresh-tree-command": "正在刷新树结构...",
  "locale-command": "语言更改为 {locale}",
  "locale-reset-command": "语言重置为默认的 {locale}",
  "show-command": "请使用以下命令以了解更多：",
  "show-all-commands": "该列表列出了所有可用的指令：",
  "cd-command": "目录切换到 \"/directories/dont/matter/in/this/demo\"",
  "ls-command": "在本程序中无须考虑文件问题.txt",
  "mobile-alert": "无法在移动设备/平板上调出键盘 :( 请试试桌面版 :D",
  "share-tree": "与你的好友分享提交树！他们可以用 \"import tree\" 加载它",
  "paste-json": "在下边粘贴一个 JSON 串",
  "solved-map-reset": "解决列表已重置，您现在可以从头开始了",
  "level-cant-exit": "您没在关卡中而是在沙盒中，要开始关卡请输入 \"levels\"",
  "level-no-id": "没找到 id 为 \"{id}\" 的关卡！打开关卡选择框",
  "undo-stack-empty": "还没有什么可以撤销",
  "already-solved": "你已经解决了本关，输入 \"levels\" 尝试其他关卡，或者输入 \"sandbox\" 回到沙盒中",
  "solved-level": "恭喜过关！！",
  "command-disabled": "本关不允许使用该命令！",
  "share-json": "这是一个关卡定义 JSON ！您可以分享它或者发到我的 Github 上",
  "want-start-dialog": "您还没有定义一开始的介绍，是否添加一个？",
  "want-hint": "您还没有定义提示，是否添加一个？",
  "prompt-hint": "请输入关卡提示，如果没有请留空",
  "prompt-name": "请输入关卡名称",
  "solution-empty": "你的解法是空的!! 可能是程序出错了",
  "define-start-warning": "定义开始点... 解决方法和目标会被新的替代",
  "help-vague-level": "您正在关卡中，这里有多种形式的帮助，请选择 \"help level\" (关卡帮助)或 \"help general\" (一般帮助)",
  "help-vague-builder": "您正在进行关卡构建中，这里有多种形式的帮助，请选择 \"help general\" (一般帮助)或 \"help builder\" (关卡构建帮助)",
  "show-goal-button": "显示目标",
  "hide-goal-button": "隐藏目标",
  "objective-button": "提示",
  "git-demonstration-title": "Git示范",
  "goal-to-reach": "目标",
  "goal-only-master": "<span class=\"fwber\">注意:</span>本关卡中，只检查 master 分支，其他分支只是用作 reference 存在（以虚线标签表示）。照常，你可以用 “hide goal” 来隐藏此窗口。",
  "hide-goal": "你可以通过 \"hide goal\" 命令关闭这个窗口",
  "hide-start": "你可以通过 \"hide start\" 命令关闭这个窗口",
  "level-builder": "关卡生成器",
  "no-start-dialog": "这个关卡没有介绍！",
  "no-hint": "呃……，这关好像没有提示 :-/",
  "error-untranslated-key": "还没翻译 {key} :( 请在 Github 上贡献您的翻译!",
  "error-untranslated": "这段对话还没有被翻译成您的语言 :( 欢迎在 Github 上贡献您的翻译!"
};
