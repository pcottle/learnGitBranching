exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22bugFix%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout -b bugFix;git commit;git checkout master;git commit;git checkout bugFix;git rebase master",
  "name": {
    "en_US": "Rebase Introduction",
    "ja": "Rebaseの解説",
    "fr_FR": "Introduction à rebase",
    "ko": "리베이스(rebase)의 기본",
    "zh_CN": "Rebase简介"
  },
  "hint": {
    "en_US": "Make sure you commit from bugFix first",
    "ja": "初めにbugFixを指した状態でコミットする",
    "fr_FR": "Assurez-vous de bien faire votre en premier votre commit sur bugFix",
    "ko": "bugFix 브랜치에서 먼저 커밋하세요",
    "zh_CN": "确保你先在 bugFix 分支进行提交"
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
              "## Git Rebase",
              "",
              "The second way of combining work between branches is *rebasing.* Rebasing essentially takes a set of commits, \"copies\" them, and plops them down somewhere else.",
              "",
              "While this sounds confusing, the advantage of rebasing is that it can be used to make a nice linear sequence of commits. The commit log / history of the repository will be a lot cleaner if only rebasing is allowed.",
              "",
              "Let's see it in action..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here we have two branches yet again; note that the bugFix branch is currently selected (note the asterisk)",
              "",
              "We would like to move our work from bugFix directly onto the work from master. That way it would look like these two features were developed sequentially, when in reality they were developed in parallel.",
              "",
              "Let's do that with the `git rebase` command"
            ],
            "afterMarkdowns": [
              "Awesome! Now the work from our bugFix branch is right on top of master and we have a nice linear sequence of commits.",
              "",
              "Note that the commit C3 still exists somewhere (it has a faded appearance in the tree), and C3' is the \"copy\" that we rebased onto master.",
              "",
              "The only problem is that master hasn't been updated either, let's do that now..."
            ],
            "command": "git rebase master",
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Now we are checked out on the `master` branch. Let's do ahead and rebase onto `bugFix`..."
            ],
            "afterMarkdowns": [
              "There! Since `master` was downstream of `bugFix`, git simply moved the `master` branch reference forward in history."
            ],
            "command": "git rebase bugFix",
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To complete this level, do the following",
              "",
              "* Checkout a new branch named `bugFix`",
              "* Commit once",
              "* Go back to master and commit again",
              "* Check out bugFix again and rebase onto master",
              "",
              "Good luck!"
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
              "## Git Rebase",
              "",
              "ブランチを一つにまとめる方法として前回はマージを紹介しましたが、今回紹介するリベースを使うこともできます。リベースの動作は、マージするコミットのコピーをとって、どこかにストンと落とすというイメージです。",
              "",
              "ピンと来ないかもしれませんが、リベースのメリットは一本の連続したシーケンシャルなコミットに整形できることです。リベースだけ使っていると、コミットのログや履歴が非常にクリーンな状態に保たれます。",
              "",
              "早速実際にどう動くのかを見てみましょう。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "前回と同様の2つのブランチを考えます：仮にいまbugFixブランチをチェックアウトしているとします。（アスタリスクつきのもの）",
              "",
              "bugFixに入ってる作業内容をそのまま直接masterブランチ上の内容に移動したいとします。こうすることで、実際には並行して開発された2つの別々のブランチ上のフィーチャを、あたかも1本のブランチ上でシーケンシャルに開発されていたかのように見せることができます。",
              "",
              "`git rebase`コマンドでそれをやってみましょう。"
            ],
            "afterMarkdowns": [
              "できた！これでbugFixブランチの作業内容はmasterブランチのすぐ先に移動したので、見た目が一本になってスッキリしました。",
              "",
              "気を付けてほしいのは、C3コミットはどこかに残ってるということ（ツリーの中で半透明にしてあります）、そしてC3'は（C3との接続が切れているC3の）コピーがmasterブランチ上に作られているということです。",
              "",
              "一つ問題が残ってて、masterブランチがまだ最新化されていませんね。ちょっと直してみましょう。。"
            ],
            "command": "git rebase master",
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "masterブランチはチェックアウトしてあります。この状態からmasterブランチを`bugFix`へとリベースしてみましょう。"
            ],
            "afterMarkdowns": [
              "できた！`master`は`bugFix`の直前のコミットだったので、gitは単純に`master`ブランチのポインタを前に進めただけでした。"
            ],
            "command": "git rebase bugFix",
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "以下の作業で理解度の確認をしてみましょう。",
              "",
              "* `bugFix`という名前の新しいブランチをチェックアウトする",
              "* 一回だけコミット",
              "* masterブランチに戻ってもう1回コミット",
              "* bugFixをもう1回チェックアウトして、master上にリベース",
              "",
              "幸運を祈る！"
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
              "## Git Rebase",
              "",
              "La seconde façon de combiner les contenus de deux branches est *rebase*. Rebase prend un enselble de commits, les \"recopie\", et les ajoute en bout de chaine à un autre endroit.",
              "",
              "Bien que cela puisse sembler compliqué, l'avantage de rebase est de permettre d'obtenir une simple séquence linéeire de commits. Les logs/l'historique du dépôt seront bien plus propres si seul rebase est autorisé (plutôt que merge).",
              "",
              "Voyons rebase en action…"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ici nous avons encore une fois deux branches; notez que nous sommes sur la branche bugFix (cf. l'asterisque)",
              "",
              "Nous voudrions transferer notre travail sur la branche 'bugFix' directement sur le travail dans 'master'. Ainsi on aurait l'impression que ces deux travaux ont été développés séquentiellement alors qu'en réalité ils ont été réalisés en parallèle.",
              "",
              "Faisons cela avec la commande `git rebase`"
            ],
            "afterMarkdowns": [
              "Super! Désormais, le travail de la branche 'bugFix' est juste en haut de la branche 'master' et non avons une belle séquence linéaire de commits.",
              "",
              "Notez que le commit C3 existe toujours quelquepart (il est en grisé sur l'arbre), et C3' est la  \"copie\" que nous avons créée sur master avec rebase.",
              "",
              "Le seul problème est que master n'a pas été mis à jour, faisons cela maintenant…"
            ],
            "command": "git rebase master",
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Nous sommes désormais positionnés sur la branche `master`. Continuons en faisant le rebase sur `bugFix`…",
              "Et voilà ! Puisque `master` était un ascendant de `bugFix`, git a simplement déplacé la référence de la branche `master` en avant dans le temps."
            ],
            "command": "git rebase bugFix",
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour acomplir ce niveau, faites les opérations suivantes",
              "",
              "* Positionnez-vous (checkout) sur une nouvelle branche nommée `bugFix`",
              "* Faites un commit",
              "* Retournez sur master et faites un nouveau commit",
              "* Positionnez-vous à nouveau sur bugFix et faites un rebase sur master",
              "",
              "Bonne chance !"
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
              "## Git Rebase",
              "",
              "*rebasing*是在分支之间合并工作的第二种方法。Rebasing就是取出一系列的提交记录，\"复制\"它们，然后把在别的某个地方放下来。",
              "",
              "虽然听上去难以理解，rebasing 的优势是可以创造更线性的提交历史。假如只允许使用rebasing，代码库的提交日志/历史会更好看。",
              "",
              "让我们亲身体会下……"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "这里，还是有两个分支；注意当前分支是 bugFix（看那颗星）",
              "",
              "我们想要把 bugfix 里面的工作直接移到 master 分支上。使用这个方法，两个分支的功能看起来像是按顺序开发，实际上它们是平行开发的。",
              "",
              "用 `git rebase`实现此目标"
            ],
            "command": "git rebase master",
            "afterMarkdowns": [
              "碉堡吧，现在 bugFix 分支上的工作在 master 的最前端，同时我们也得到了一个更线性的提交序列。",
              "",
              "注意，提交记录 C3 仍然存在（阴影的那货就是你了，还看什么看），而我们已经将 C3 复制到了master。",
              "",
              "现在唯一的问题是 master 分支还没有更新……下面就来更新它吧"
            ],
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "现在，切换到 `master` 分支。接下来就把它 rebase 到 `bugFix` 吧……"
            ],
            "command": "git rebase bugFix",
            "afterMarkdowns": [
              "完成！因为 `master` 是 `bugFix` 的下游，所以 git 只把 `master` 分支的记录前移到 `bugFix` 上。"
            ],
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "想完成此关，执行以下操作：",
              "",
              "* 新建`bugFix`分支",
              "* 提交一次",
              "* 切换回 master 分支再提交一次",
              "* 再次切换到 bugFix 分支，rebase 到 master 上",
              "",
              "祝你好运啦！"
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
              "## Git 리베이스(Rebase)",
              "",
              "브랜치끼리의 작업을 접목하는 두번째 방법은 *리베이스(rebase)*입니다. 리베이스는 기본적으로 커밋들을 모아서 복사한 뒤, 다른 곳에 떨궈 놓는 것입니다.",
              "",
              "조금 어려게 느껴질 수 있지만, 리베이스를 하면 커밋들의 흐름을 보기 좋게 한 줄로 만들 수 있다는 장점이 있습니다. 리베이스를 쓰면 저장소의 커밋 로그와 이력이 한결 깨끗해집니다.",
              "",
              "어떻게 동작하는지 살펴볼까요..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "여기 또 브랜치 두 개가 있습니다; bugFix브랜치가 현재 선택됐다는 점 눈여겨 보세요 (별표 표시)",
              "",
              "bugFix 브랜치에서의 작업을 master 브랜치 위로 직접 옮겨 놓으려고 합니다. 그렇게 하면, 실제로는 두 기능을 따로따로 개발했지만, 마치 순서대로 개발한 것처럼 보이게 됩니다.",
              "",
              "`git rebase` 명령어로 함께 해보죠."
            ],
            "afterMarkdowns": [
              "오! 이제 bugFix 브랜치의 작업 내용이 master의 바로 위에 깔끔한 한 줄의 커밋으로 보이게 됐습니다.",
              "",
              "C3 커밋은 어딘가에 아직 남아있고(그림에서 흐려짐), C3'는 master 위에 올려 놓은 복사본입니다.",
              "",
              "master가 아직 그대로라는 문제가 남아있는데요, 바로 해결해보죠..."
            ],
            "command": "git rebase master",
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "우리는 지금 `master` 브랜치를 선택한 상태입니다. `bugFix` 브랜치쪽으로 리베이스 해보겠습니다..."
            ],
            "afterMarkdowns": [
              "보세요! `master`가 `bugFix`의 부모쪽에 있었기 때문에, 단순히 그 브랜치를 더 앞쪽의 커밋을 가리키게 이동하는 것이 전부입니다."
            ],
            "command": "git rebase bugFix",
            "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이하 작업을 하면 이번 레벨을 통과합니다",
              "",
              "* `bugFix`라는 새 브랜치를 만들어 선택하세요",
              "* 커밋 한 번 합니다",
              "* master로 돌아가서 또 커밋합니다",
              "* bugFix를 다시 선택하고 master에 리베이스 하세요",
              "",
              "화이팅!"
            ]
          }
        }
      ]
    }
  }
};
