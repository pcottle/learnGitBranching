exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C1\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugFix;git checkout bugFix",
  "name": {
    "en_US": "Branching in Git",
    "ja": "Gitのブランチ",
    "ko": "Git에서 브랜치 쓰기",
    "fr_FR": "Gérer les branches avec Git",
    "zh_CN": "建立Git分支"
  },
  "hint": {
    "en_US": "Make a new branch with \"git branch [name]\" and check it out with \"git checkout [name]\"",
    "ja": "ブランチの作成（\"git branch [ブランチ名]\"）と、チェックアウト（\"git checkout [ブランチ名]\"）",
    "fr_FR": "Faites une nouvelle branche avec \"git branch [nom]\" positionnez-vous dans celle-ci avec \"git checkout [nom]\"",
    "zh_CN": "用 'git branch [分支名]' 来创建分支，用 'git checkout [分支名]' 切换到分支",
    "ko": "\"git branch [브랜치명]\"으로 새 브랜치를 만들고, \"git checkout [브랜치명]\"로 그 브랜치로 이동하세요"
  },
  "disabledMap": {
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
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Gitのブランチ",
              "",
              "Gitではコミットだけでなく、ブランチもまた信じられないほど軽量です。ブランチとは単に特定のコミットを指示したポインタにしか過ぎません。Gitの達人は決まってこう言うのは、そのためです：",
              "",
              "```",
              "早めに、かつ頻繁にブランチを切りなさい",
              "```",
              "",
              "どれほど多くのブランチを作ってもストレージやメモリを全然使わないので、ブランチを肥大化させるよりも論理的に分割していく方が簡単なのです。",
              "",
              "ブランチとコミットをあわせて使い始めると、これら2つのフィーチャがどのように連動して機能するかがわかるでしょう。ここではとりあえず、ブランチは基本的には「あるコミットとその親のコミットたちを含めた全てのコミット」のことを呼ぶと覚えておいてください。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "では実際にブランチがどのようなものかを見ていきましょう。",
              "",
              "`newImage`という名前の新しいブランチを切ってみることにします。"
            ],
            "afterMarkdowns": [
              "以上。必要な手順はこれだけです。いま作成された`newImage`ブランチは`C1`コミットを指しています。"
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "この新しいブランチに何か変更を加えてみましょう。次のボタンを押してください。"
            ],
            "afterMarkdowns": [
              "あれ？`newImage`ではなくて`master`ブランチが移動してしまいました。これは、私たちが`newImage`のブランチ上で作業していなかったためです。どのブランチで作業しているかは、アスタリスク(*)がついてるかどうかで分かります。"
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "今度は作業したいブランチ名をgitに伝えてみましょう。",
              "",
              "```",
              "git checkout [ブランチ名]",
              "```",
              "",
              "このようにして、コミットする前に新しいブランチへと作業ブランチを移動することができます。"
            ],
            "afterMarkdowns": [
              "できましたね。今度は新しいブランチに対して変更を記録することができました。"
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "OK! もうどんなブランチでも切れますね。このウィンドウを閉じて、",
              "`bugFix`という名前のブランチを作成し、そのブランチをチェックアウトしてみましょう。"
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
              "## Branches Git",
              "",
              "Les branches sous Git sont incroyablement légères aussi. Elles sont simplment des références un commit spécifique -- rien de plus. C'est pourquoi beaucoup d'enthousiastes répètent en cœur :",
              "",
              "```",
              "n'attendez pas pour faire des branches, et faites souvent des branches",
              "```",
              "",
              "Parce qu'il n'y a pas de surcoût (stockage/mémoire) associés aux branches, il est facile de diviser son travail en de nombreuses branches plutôt que d'avoir quelques grosses branches.",
              "",
              "Nous verrons comment les banches et les commits interagissent quand nous les utiliserons ensemble. Pour l'instant, souvenez-vous qu'une branche est un moyen d'exprimer \"Je veux inclure le contenu de ce commit et de tous les commits parents.\""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Regardons à quoi ressemblent les branches en pratique.",
              "",
              "Nous allons nous positionner (checkout) dans une nouvelle branche appellée `newImage`"
            ],
            "afterMarkdowns": [
              "Et voilà, c'est tout ! La branche `newImage` se réfère désormais au commit `C1`"
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Travaillons mainenant dans cette branche. Appuyez sur le bouton ci-dessous."
            ],
            "afterMarkdowns": [
              "Oh non! La branche `master` a bougé mais pas la branche `newImage` ! C'est parce aue nous n'étions pas  \"sur\" la nouvelle branche, comme indiqué par l'asterisque (*) sur `master`"
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Indiquons à git que nous voulons nous positionner sur la branche avec ",
              "",
              "```",
              "git checkout [nom]",
              "```",
              "",
              "Ceci nous positionne sur la nouvelle branche avant de faire un commit avec nos modifications"
            ],
            "afterMarkdowns": [
              "C'est parti ! Nos modifications ont été enregistrées sur la nouvelle branche"
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! Vous êtes fin prêt pour faire des branches. Après la fermeture de cette fenêtre,",
              "faites une nouvelle branche nommée `bugFix` et positionnez-vous sur cette branche"
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
              "## Git Branches",
              "",
              " Git 的分支非常轻量。它们只是简单地指向某个提交纪录——仅此而已。所以许多Git爱好者会念叨：",
              "",
              "```",
              "早点建分支！经常建分支！",
              "```",
              "",
              "创建分支没有储存或内存上的开销，所以按逻辑分解工作比维护单一的代码树要简单。",
              "",
              "同时使用分支和提交时，我们会看到两者如何配合。现在，只要记住使用分支其实就是在说：“我想包含本次提交及所有的父提交记录。”"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "举个例子看看分支究竟是什么。",
              "",
              "这里，我们切换到到名为`newImage`的新分支。"
            ],
            "command": "git branch newImage",
            "afterMarkdowns": [
              "看，这就是建立分支所需的操作啦！`newImage`分支现在指向提交记录`C1`。"
            ],
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "现在让我们修改一下新分支。点击下面的按钮。"
            ],
            "command": "git commit",
            "afterMarkdowns": [
              "啊摔！`master`分支前进了，但`newImage`分支没有哇！这是因为我们没有“在”这个新分支上，这也是为什么星号（*）只在 `master` 上。"
            ],
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "使用如下命令告诉git我们想要切换到新的分支",
              "",
              "```",
              "git checkout [name]",
              "```",
              "",
              "这可以让我们在提交修改之前切换到新的分支。"
            ],
            "command": "git checkout newImage; git commit",
            "afterMarkdowns": [
              "好的嘞！新的分支已经记录了我们的修改。"
            ],
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好啦，你已经准备好使用分支了。当前窗口关闭后，",
              "创建一个叫 `bugFix` 的新分支，然后切换过去。"
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
              "## Git 브랜치",
              "",
              "깃의 브랜치도 놀랍도록 가볍습니다. 브랜치는 특정 커밋에 대한 참조(reference)에 지나지 않습니다. 이런 사실 때문에 수많은 Git 애찬론자들이 자주 이렇게 말하곤 합니다:",
              "",
              "```",
              "브랜치를 서둘러서, 그리고 자주 만드세요",
              "```",
              "",
              "브랜치를 많이 만들어도 메모리나 디스크 공간에 부담이 되지 않기 때문에, 여러분의 작업을 커다른 브랜치로 만들기 보다, 작은 단위로 잘게 나누는 것이 좋습니다.",
              "",
              "브랜치와 커밋을 같이 쓸 때, 어떻게 두 기능이 조화를 이루는지 알아보겠습니다. 하지만 우선은, 단순히 브랜치를 \"하나의 커밋과 그 부모 커밋들을 포함하는 작업 내역\"이라고 기억하시면 됩니다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "브랜치가 어떤 것인지 연습해보죠.",
              "",
              "`newImage`라는 브랜치를 살펴보겠습니다."
            ],
            "afterMarkdowns": [
              "저 그림에 브랜치의 모든 것이 담겨있습니다! 브랜치 `newImage`가 커밋 `C1`를 가리킵니다"
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "이 새로운 브랜치에 약간의 작업을 더해봅시다. 아래 버튼을 눌러주세요"
            ],
            "afterMarkdowns": [
              "앗! `master` 브랜치가 움직이고, `newImage` 브랜치는 이동하지 않았네요! 그건 우리가 새 브랜치 위에 있지 않았었기 때문입니다. 별표(*)가 `master`에 있었던 것이죠."
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "아래의 명령으로 새 브랜치로 이동해 봅시다.",
              "",
              "```",
              "git checkout [브랜치명]",
              "```",
              "",
              "이렇게 하면 변경분을 커밋하기 전에 새 브랜치로 이동하게 됩니다."
            ],
            "afterMarkdowns": [
              "이거죠! 이제 우리의 변경이 새 브랜치에 기록되었습니다!"
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "좋아요! 이제 직접 브랜치 작업을 연습해봅시다. 이 창을 닫고,",
              "`bugFix`라는 새 브랜치를 만드시고, 그 브랜치로 이동해보세요"
            ]
          }
        }
      ]
    }
  }
};
