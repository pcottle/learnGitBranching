exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%7D%2C%22pushed%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22pushed%22%7D%2C%22local%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22local%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22pushed%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git reset HEAD~1;git checkout pushed;git revert HEAD",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"pushed\":{\"target\":\"C2\",\"id\":\"pushed\"},\"local\":{\"target\":\"C3\",\"id\":\"local\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"local\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Reversing Changes in Git",
    "fr_FR": "Annuler des changements avec Git",
    "ko": "Git에서 작업 되돌리기"
  },
  "hint": {
    "en_US": "",
    "fr_FR": "",
    "zh_CN": "",
    "ko": ""
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
    "fr_FR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Annuler des changements avec Git",
              "",
              "Il y a de nombreuses façons d'annuler des changement avec Git. De même que pour les commits, annuler des changements avec Git a à la fois un aspect bas-niveau (gestion dans le 'staging' des fichiers et morceaux de fichiers) et un aspect de plus haut niveau 9comment les changements sont effectivement annulés). Nous allons nous intéresser à ce dernier point.",
              "",
              "Il y a principalement deux façons d'annuler des changements avec Git -- l'une est `git reset` et l'autre est `git revert`. Nous allons maintenant voir chacune de ces façons",
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
              "`git reset` annule des changements en déplaçant la référence en arrière dans le temps sur un commit plus ancien. En ce sens, on peut considérer cela comme une façon de \"réécrire l'histoire\"; `git reset` fait remonter une branche en arrière comme si le(s) commit(s) n'avait jamais eu lieu.",
              "",
              "Regardons à quoi cela ressemble :"
            ],
            "afterMarkdowns": [
              "Bravo ! Git a simplement déplacé la référence de la branche master en la faisant revenir sur `C1`; désormais notre dépôt est dans le même état que si `C2` n'avait jamais eu lieu"
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
              "Bien que le reset marche parfaitement pour les branches locales sur notre propre machine, cette façon de \"réécrire l'histoire\" ne marche pas avec les banches distantes (remote) que d'autres personnes utilisent.",
              "",
              "Pour pouvoir annuler des changements et *partager* ces annulations avec d'autres, nous devons utiliser `git revert`. Regardons comment cela fonctionne"
            ],
            "afterMarkdowns": [
              "Étrangement, un nouveau commit est appaaru en bas sous le commit que nous voulions annuler. C'est parce que ce nouveau commit `C2'` introduit des *modifications* -- celles qui correspondent justement à l'annulation de celles du commit `C2`.",
              "",
              "Avec revert, vous pouvez diffuser (push) vos modifications et les partager avec tout le monde."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour accomplir ce niveau, annulez les deux derniers commits à la fois sur `local` et sur `pushed`.",
              "",
              "Ayez à l'esprit que `pushed` est une branche distante et `local` est une branche locale -- cela devrait vous guider dans le choix de la méthode à employer."
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
    },
    "ko": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git에서 작업 되돌리기",
              "",
              "Git에는 작업한 것을 되돌리는 여러가지 방법이 있습니다. 변경내역을 되돌리는 것도 커밋과 마찬가지로 낮은 수준의 일(개별 파일이나 묶음을 스테이징 하는 것)과 높은 수준의 일(실제 변경이 복구되는 방법)이 있는데요, 여기서는 후자에 집중해 알려드릴게요.",
              "",
              "Git에서 변경한 내용을 되돌리는 방법은 크게 두가지가 있습니다 -- 하나는 `git reset`을 쓰는거고, 다른 하나는 `git revert`를 사용하는 것입니다. 다음 화면에서 하나씩 알아보겠습니다.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git 리셋(reset)",
              "",
              "`git reset`은 브랜치로 하여금 예전의 커밋을 가리키도록 이동시키는 방식으로 변경 내용을 되돌립니다. 이런 관점에서 \"히스토리를 고쳐쓴다\"라고 말할 수 있습니다. 즉, `git reset`은 마치 애초에 커밋하지 않은 것처럼 예전 커밋으로 브랜치를 옮기는 것입니다.",
              "",
              "어떤 그림인지 한번 보죠:"
            ],
            "afterMarkdowns": [
              "그림에서처럼 master 브랜치가 가리키던 커밋을 `C1`로 다시 옮겼습니다; 이러면 로컬 저장소에는 마치 `C2`커밋이 아예 없었던 것과 마찬가지 상태가 됩니다."
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git 리버트(revert)",
              "",
              "각자의 컴퓨터에서 작업하는 로컬 브랜치의 경우 리셋(reset)을 잘 쓸 수 있습니다만, \"히스토리를 고쳐쓴다\"는 점 때문에 다른 사람이 작업하는 리모트 브랜치에는 쓸 수 없습니다.",
              "",
              "변경분을 되돌리고, 이 되돌린 내용을 다른 사람들과 *공유하기* 위해서는, `git revert`를 써야합니다. 예제로 살펴볼게요."
            ],
            "afterMarkdowns": [
              "어색하게도, 우리가 되돌리려고한 커밋의 아래에 새로운 커밋이 생겼습니다. `C2`라는 새로운 커밋에 *변경내용*이 기록되는데요, 이 변경내역이 정확히 `C2` 커밋 내용의 반대되는 내용입니다.",
              "",
              "리버트를 하면 다른 사람들에게도 변경 내역을 밀어(push) 보낼 수 있습니다."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이 레벨을 통과하려면, `local` 브랜치와 `pushed` 브랜치에 있는 최근 두 번의 커밋을 되돌려 보세요.",
              "",
              "`pushed`는 리모트 브랜치이고, `local`은 로컬 브랜치임을 신경쓰셔서 작업하세요 -- 어떤 방법을 선택하실지 떠오르시죠?"
            ]
          }
        }
      ]
    }
  }
};
