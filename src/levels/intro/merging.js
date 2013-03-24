exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C2\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\",\"C2\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git checkout -b bugFix;git commit;git checkout master;git commit;git merge bugFix",
  "name": {
    "en_US": "Merging in Git",
    "fr_FR": "Faire des 'merge' (fusions de branches) avec Git",
    "ko": "Git에서 브랜치 합치기(Merge)",
    "ja": "ブランチとマージ",
    "zh_CN": "Git合并(Merge)"
  },
  "hint": {
    "en_US": "Remember to commit in the order specified (bugFix before master)",
    "ja": "指示された順番でコミットすること（masterの前にbugFixで）",
    "fr_FR": "Pensez à faire des commits dans l'ordre indiqué (bugFix avant master)",
    "zh_CN": "记得按照给定的顺序来进行提交(commit) （bugFix 要在 master 之前）",
    "ko": "말씀드린 순서대로 커밋해주세요 (bugFix에 먼저 커밋하고 master에 커밋)"
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
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## ブランチとマージ",
              "",
              "いい調子ですね。これまでにコミットとブランチについて学びました。そろそろ2つのブランチを1つにまとめるやり方について見ていきましょう。これができれば新しいフィーチャの開発のために新しいブランチを切って、開発が終わったら変更を元のブランチへ統合することができるようになります。",
              "",
              "はじめに紹介するのは、`git merge`を使ったマージのやり方です。mergeコマンドによって、2つの独立した親を持つ特別なコミットを作ることができます。2つの親を持つコミットが持つ意味とは、「全く別々の場所にいるこの親とその親（*かつ*、それらの親の祖先全て）が持つ全ての変更を含んでいますよ」ということです。",
              "",
              "見てみた方が早いので、次の画面で確認してみましょう。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "それぞれ別のコミットを指している2つのブランチがあります。変更が別々のブランチに分散していて統合されていないケースです。これをマージで1つにまとめてみましょう。",
              "",
              "`bugFix`ブランチを`master`ブランチにマージしてみます。"
            ],
            "afterMarkdowns": [
              "わあ。見ましたか？まず初めに、`master`ブランチが2つのコミットを親に持つ新しいコミットを指してますね。`master`から親をたどっていくと、最も古いコミットにたどり着くまでに全てのコミットを含んでいる様が確認できます。これで、全ての変更を含む`master`が完成しました。",
              "",
              "色がどう変わったかにも注目して下さい。学習を助けるために、ブランチ毎に色をつけています。それぞれのブランチは自分の色を持っていて、どのブランチから派生して出てくるか次第でコミットごとの色が決まります。",
              "",
              "今回のコミットには`master`ブランチの色が使われました。しかし`bugFix`ブランチの色がまだ変わってないようなので、これを変えてみましょう。"
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`master`ブランチを`bugFix`ブランチにマージしてみます。"
            ],
            "afterMarkdowns": [
              "`bugFix`ブランチは`master`ブランチの派生元だったので、gitは実際大したことはしていません：`bugFix`ブランチを指していたポインタを`master`が指していたコミットへと移動させただけです。",
              "",
              "これで全てのコミットが同じ色になりました。つまり、リポジトリの中の全ての変更をそれぞれのブランチが持ったことになります。やったね！"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "以下の作業で理解度の確認をしてみましょう。 steps:",
              "",
              "* `bugFix`という名前で新しいブランチを切る",
              "* `git checkout bugFix`コマンドで`bugFix`ブランチをチェックアウトする",
              "* 一回だけコミット",
              "* `git checkout`で`master`へ戻る",
              "* もう1回コミットする",
              "* `git merge`コマンドを使って、`bugFix`ブランチを`master`ブランチへとマージする",
              "",
              "*注：\"help level\"コマンドでこのヘルプにいつでも戻ってこれます*"
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
              "## Branches et Merges",
              "",
                "Super! Nous savons désormais comment faire des commits et de branches. Maintenant nous devons apprendre comment combiner ensemble les contenus de deux branches différentes. Ceci nous permettra de créer une nouvelle branche, développer une nouvelle fonctionnalité sur cette dernière, puis intégrer cette fonctionnalité en combinant le contenu de cette branche de développement à la branche d'origine(master par exemple).",
              "",
              "La première méthode que nous alons voir pour combiner le conenu de deux branches est `git merge`. Faire un 'merge' en git Git crée un commit spécial qui a deux parents. Un commit avec deux parents indique en susbtance \"Je veux inclure le contenu de ce parent et le conenu de cet autre parent, *et* l'ensemble de leurs parents.\"",
              "",
              "C'est plus facile en visualisant, regardons dans la vue suivante"
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
              "Faisons un merge  de `master` dans `bugFix`:"
            ],
            "afterMarkdowns": [
              "Puisque `bugFix` était un descendant de `master`, git n'avait aucun travail à effectuer; il a simplement déplacé `bugFix` au même commit auquel `master` est attaché.",
              "",
              "Maintenant tous les commits sont de la même couleur, ce qui indique que chaque branche contient tout le contenu du dépôt ! Woohoo"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour accomplir ce niveau, effectuez les opérations suivantes :",
              "",
              "* Faites une nouvelle branche appelée `bugFix`",
              "* Positionnez-vous sur la branche `bugFix` avec `git checkout bugFix`",
              "* Faites un commit",
              "* Retournez sur la branche `master` (commande `git checkout`)",
              "* Faites un nouveau commit",
              "* Fusionnez la branche `bugFix` dans `master` avec `git merge`",
              "",
              "*Rappelez-vous que vous pouvez à tout moment réafficher ces indications avec \"help level\"!*"
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
            "command": "git merge bugFix",
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
            "command": "git checkout bugFix; git merge master",
            "afterMarkdowns": [
              "因为 `bugFix` 分支在 `master` 分支的上游，所以 git 不用做什么额外的工作，只要把 `master` 分支的最新提交移到 `bugFix` 分支就可以了。",
              "",
              "现在所有的提交的颜色都是一样的啦，这表明现在所有的分支都包含了仓库里所有的东西！走起！"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
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
    },
    "ko": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 브랜치와 합치기(Merge)",
              "",
              "좋습니다! 지금까지 커밋하고 브랜치를 만드는 방법을 알아봤습니다. 이제 두 별도의 브랜치를 합치는 몇가지 방법을 알아볼 차례입니다. 이제부터 배우는 방법으로 브랜치를 따고, 새 기능을 개발 한 다음 합칠 수 있게 될 것입니다.",
              "",
              "처음으로 살펴볼 방법은 `git merge`입니다. Git의 합치기(merge)는 두 개의 부모(parent)를 가리키는 특별한 커밋을 만들어 냅니다. 두개의 부모가 있는 커밋이라는 것은 \"한 부모의 모든 작업내역과 나머지 부모의 모든 작업, *그리고* 그 두 부모의 모든 부모들의 작업내역을 포함한다\"라는 의미가 있습니다. ",
              "",
              "그림으로 보는게 이해하기 쉬워요. 다음 화면을 봅시다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "여기에 브랜치가 두 개 있습니다. 각 브랜치에 독립된 커밋이 하나씩 있구요. 그 말은 이 저장소에 지금까지 작업한 내역이 나뉘어 담겨 있다는 얘기입니다. 두 브랜치를 합쳐서(merge) 이 문제를 해결해 볼까요?",
              "",
              "`bugFix` 브랜치를 `master` 브랜치에 합쳐(merge) 보겠습니다."
            ],
            "afterMarkdowns": [
              "보셨어요? 우선, `master`가 두 부모가 있는 커밋을 가리키고 있습니다. ",
              "",
              "또, 커밋들의 색이 바뀐 것을 눈치 채셨나요? 이해를 돕기위해 색상으로 구분해 표현했습니다. 각 브랜치는 그 브랜치만의 색상으로 그렸습니다. 브랜치가 합쳐지는 커밋의 경우에는, 그 브랜치들의 색을 조합한 색상으로 표시 했습니다.",
              "",
              "그런식으로 여기에 `bugFix`브랜치 쪽을 제외한 나머지 커밋만 `master` 브랜치의 색으로 칠해져 있습니다. 이걸 고쳐보죠..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "이제 `master` 브랜치에 `bugFix`를 합쳐(merge) 봅시다:"
            ],
            "afterMarkdowns": [
              "`bugFix`가 `master`의 부모쪽에 있었기 때문에, git이 별다른 일을 할 필요가 없었습니다; 간단히 `bugFix`를 `master`가 붙어 있는 커밋으로 이동시켰을 뿐입니다.",
              "",
              "짜잔! 이제 모든 커밋의 색이 같아졌고, 이는 두 브랜치가 모두 저장소의 모든 작업 내역을 포함하고 있다는 뜻입니다."
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "아래 작업을 해서 이 레벨을 통과하세요:",
              "",
              "* `bugFix`라는 새 브랜치를 만듭니다",
              "* `git checkout bugFix`를 입력해 `bugFix` 브랜치로 이동(checkout)합니다.",
              "* 커밋 한 번 하세요",
              "* `git checkout` 명령어를 이용해 `master`브랜치로 돌아갑니다",
              "* 커밋 또 하세요",
              "* `git merge` 명령어로 `bugFix`브랜치를 `master`에 합쳐 넣습니다.",
              "",
              "*아 그리고, \"help level\" 명령어로 이 안내창을 다시 볼 수 있다는 것을 기억해 두세요!*"
            ]
          }
        }
      ]
    }
  }
};
