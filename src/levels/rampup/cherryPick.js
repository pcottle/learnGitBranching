exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C6%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git cherry-pick C3 C4 C7",
  "compareOnlyMasterHashAgnostic": true,
  "disabledMap": {
    "git rebase": true
  },
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"side\":{\"target\":\"C5\",\"id\":\"side\"},\"another\":{\"target\":\"C7\",\"id\":\"another\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C1\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "fr_FR": "Introduction à cherry-pick",
    "en_US": "Cherry-pick Intro",
    "de_DE": "Einführung Cherry-picking",
    "ja"   : "cherry-pick入門",
    "es_AR": "Introducción a cherry-pick",
    "pt_BR": "Introdução ao cherry-pick",
    "zh_CN": "介绍 Cherry-pick",
    "zh_TW": "介紹 cherry-pick"
  },
  "hint": {
    "fr_FR": "git cherry-pick suivis par les noms de commits",
    "en_US": "git cherry-pick followed by commit names!",
    "de_DE": "git cherry-pick gefolgt von Commit-Namen.",
    "ja"   : "git cherry-pickの後にコミット名を追加",
    "es_AR": "git cherry-pick seguido de los nombres de los commits",
    "pt_BR": "git cherry-pick seguido dos nomes dos commits",
    "zh_CN": "git cherry-pick 后面跟着 commit 的名字",
    "zh_TW": "git cherry-pick 後面要接著 commit 的名稱"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Moving Work Around",
              "",
              "So far we've covered the basics of git -- committing, branching, and moving around in the source tree. Just these concepts are enough to leverage 90% of the power of git repositories and cover the main needs of developers.",
              "",
              "That remaining 10%, however, can be quite useful during complex workflows (or when you've gotten yourself into a bind). The next concept we're going to cover is \"moving work around\" -- in other words, it's a way for developers to say \"I want this work here and that work there\" in precise, eloquent, flexible ways.",
              "",
              "This may seem like a lot, but it's a simple concept."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "The first command in this series is called `git cherry-pick`. It takes on the following form:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "It's a very straightforward way of saying that you would like to copy a series of commits below your current location (`HEAD`). I personally love `cherry-pick` because there is very little magic involved and it's easy to understand.",
              "",
              "Let's see a demo!",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here's a repository where we have some work in branch `side` that we want to copy to `master`. This could be accomplished through a rebase (which we have already learned), but let's see how cherry-pick performs."
            ],
            "afterMarkdowns": [
              "That's it! We wanted commits `C2` and `C4` and git plopped them down right below us. Simple as that!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To complete this level, simply copy some work from the three branches shown into master. You can see which commits we want by looking at the goal visualization.",
              ""
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
              "## Déplacer votre travail",
              "",
              "Nous avons maintenant pratiqué les bases de git -- commits, branches, et déplacements dans l'arbre des commits. Ces seuls concepts sont suffisants pour utiliser 90% du pouvoir des dépôt git et satisfaire les principaux besoins des développeurs.",
              "",
              "Les 10% restants, cependant, peuvent être assez utiles pour systèmes assez complexes (ou quand vous vous êtes mis tout seul dans le pétrin). Le prochain concept que nous allons aborder est \"le déplacement de travail\" (moving work around) -- en d'autres termes, c'est une façon des développeurs de dire  \"Je veux ce travail ici et cet autre là.\".",
              "",
              "Cela peut sembler compliqué, mais c'est un concept simple."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "La première commande de cette série est `git cherry-pick`. Elle a le prototype suivant :",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "C'est une manière simple de dire qu'on voudrait copier une série de commits en-dessous de notre emplacement actuel (`HEAD`). Personnellement, j'adore `cherry-pick` parce qu'il y a un petit peu de magie dedans, et parce que c'est facile à comprendre.",
              "",
              "Faisons une démonstration !",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ici le dépôt que nous avons contient du travail dans la branche `side`, que nous voulons copier dans `master`. Cela pourrait être fait avec un rebase (que nous avons déjà appris), mais voyons comment cherry-pick fonctionne."
            ],
            "afterMarkdowns": [
              "Voilà ! Nous voulions les commits `C2` et `C4` et git les a fait apparaître juste sous nos jambes. Aussi simple que ça !"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour finir ce niveau, copiez simplement le travail désigné dans la branche master. Vous pouvez voir les commits que nous souhaitons avoir en regardant dans la fenêtre d'objectif.",
              ""
            ]
          }
        }
      ]
    },
    "es_AR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Moviendo el trabajo por ahí",
              "",
              "Hasta ahora cubrimos lo básico de git -- commitear, branchear, y movernos por el árbol de commits. Estos conceptos alcanzan para aprovechar el 90% del poder de los repositorios de git y cubrir las necesidades principales de los desarrolladores.",
              "",
              "El 10% restante, sin embargo, puede ser bastante útil en flujos de trabajo complejos (o cuando te metiste en algún problema complicado). El próximo concepto que vamos a cubrir es el de \"mover el trabajo por ahí\" -- en otras palabras, una forma que tienen los desarrolladores de decir \"Quiero este trabajo allá y este otro allá\" de una manera precisa, elocuente y flexible.",
              "",
              "Puede parecer un montón, pero es un concepto bastante simple."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "El primer comando en esta serie se llama `git cherry-pick`. Tiene la siguiente forma:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "Es una manera bastante directa de decir que querés copiar una serie de commits sobre tu ubicación actual (`HEAD`). Personalmente amo `cherry-pick` porque hay muy poca magia involucrada y es bastante simple de entender.",
              "",
              "¡Veamos una demo!",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Acá tenemos un repositorio con algo de trabajo en la rama `side` que queremos copiar a `master`. Podríamos lograrlo con un rebase (y ya aprendimos cómo), pero veamos cómo se comporta cherry-pick."
            ],
            "afterMarkdowns": [
              "¡Eso es todo! Queríamos los commits `C2` y `C4` y git los aplicó justo donde estábamos. ¡Tan simple como eso!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente copiá algo de trabajo desde otras tres ramas a master. Podés ver qué commits queremos en la visualización del objetivo.",
              ""
            ]
          }
        }
      ]
    },
    "pt_BR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Movendo trabalho por aí",
              "",
              "Por enquanto nós abordamos o básico do Git -- commitar, criar ramos, e mover-se pela árvore. Apenas esses conceitos já são suficientes para utilizar 90% do poder dos repositórios Git, e cobrem as principais necessidades dos desenvolvedores.",
              "",
              "Os 10% restantes, entretanto, podem ser extremamente úteis em fluxos de trabalho complexos (ou quando você estiver em uma enrascada). O próximo conceito que vamos abordar é \"movendo trabalho por aí\" -- em outras palavras, veremos as formas como o desenvolvedor pode dizer \"eu quero este trabalho aqui, e aquele ali\" de formas precisas, eloquentes e flexíveis.",
              "",
              "Isso pode parecer muito, mas os conceitos são simples."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "O primeiro comando desta série é o `git cherry-pick`. Ele é chamado da seguinte forma:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "Trata-se de uma forma bastante direta de dizer que você gostaria de copiar uma série de commits abaixo do seu local atual (`HEAD`). Eu pessoalmente amo o  `cherry-pick` porque há muito pouca mágica envolvida e é fácil de entender o funcionamento.",
              "",
              "Vejamos uma demonstração!",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aqui está um repositório onde temos algum trabalho no ramo `side` que desejamos copiar para o `master`. Isso poderia ser obtido por meio de um rebase (que já aprendemos), mas vamos ver como o cherry-pick se sai."
            ],
            "afterMarkdowns": [
              "É isso! Queríamos os commits `C2` e `C4` e o git os inseriu logo abaixo de nós. Simples assim!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nível, simplesmente copie algum trabalho dos outros três ramos para o master. Você pode ver quais commits queremos copiar na visualização do objetivo.",
              ""
            ]
          }
        }
      ]
    },
    "zh_TW": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "移動 commit",
              "",
              "目前為止我們已經講了 git 的基礎，這些基礎包括 commit、branch 以及在 commit tree 中移動，只要有這些概念你就能發揮 git 90% 的功力，而且對於程式設計師來說，這樣就很夠了。",
              "",
              "而剩下的 10%，在很複雜的專案上面，是非常有用的（或者當你陷入困惑時），我們下一個要講的概念是 \"移動 commit\"，換句話說，當你會這個非常有彈性的招數之後，你就可以說\"我想要把這個 commit 放這裡，而那個 commit 放在那裡\"。",
              "",
              "這看起來很複雜，但其實它很簡單。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## git cherry-pick",
              "",
              "我們要講的第一個指令叫作 `git cherry-pick`，它的用法如下：",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "當你想要複製幾個 commit 並且接在你目前的位置（`HEAD`）下面的時候，這會是一個非常直接的方式。我個人非常喜歡用 `cherry-pick`，因為它並不複雜，很容易就可以了解。",
              "",
              "讓我們來看一個例子！",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "這裡有一個 repo，在 `side` branch 中，我們有一些 commit 想要複製到 `master` branch 上，這可以透過一個 rebase 來完成（我們之前已經學到了），但是讓我們看看 `git cherry-pick` 怎麼做。"
            ],
            "afterMarkdowns": [
              "就是那樣！我們複製了 `C2` 以及 `C4` 並且把它們放到我們的後面，很簡單吧！"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這個關卡，只需要從三個 branch 複製幾個 commit 到 `master` 下面，你可以從視覺化的目標看到我們需要哪些 commit。",
              ""
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
              "## 转移工作区",
              "",
              "到现在我们已经学习了git的基础命令 -- commit, branch, checkout. 这些概念实现了git 90% 的功能, 同样也满足了开发者的主要需求 ",
              "",
              "然而, 剩余的10% 可能在处理复杂的工作流时(或者当你陷入困惑时), 非常的重要. 我们会在下一个概念中涉及'转移工作区', 换句话说, 这是开发者表达'我想要把这个工作放这里, 那个工作也放这里', 精确的说, 这是很灵活的方式    ",
              "",
              "看起来内容很多, 其实概念相当简单"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "本系列的第一个命令是`git cherry-pick`, 命令形式为: ",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "这是一种很直接的推进方式 -- 如果你想将一些提交复制到你当前的位置`HEAD`下面, 我个人喜欢`cherry-pick` 的原因是, 其概念非常简单 ",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "现在有一个仓库, 我们想将`side`分支下的工作复制到`master`分支, 我们可以通过`rebase`完成这一点(已经学过了哈), 但是这里我们想通过`cherry-pick`来完成."
            ],
            "afterMarkdowns": [
              "这是它啦, 我们需要的是提交对象`C2` 和 `C4` ,所以 git 将被它们抓取到当前分支下了. 就是这么简单!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "请完成这节测试, 只需要简单的将分支的工作复制到 master.  如果想看我们所需要的提交对象, 你可以打开虚拟目标窗口(`show goal`)",
              ""
            ]
          }
        }
      ]
    },
    "de_DE": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Inhalte verschieben",
              "",
              "Bis jetzt haben wir uns die Grundlagen von Git angeschaut -- comitten, verzweigen und sich im Commit-Baum bewegen. Nur damit lässt sich schon 90% der Macht von Git-Repositories nutzen und die meisten Anforderungen von Entwicklern erfüllen.",
              "",
              "Die übrigen 10% jedoch können in komplexeren Abläufen sehr hilfreich sein (oder wenn man sich in eine schwierige Lage manövriert hat). Das nächste was wir uns anschauen, ist, Inhalte durch den Commit-Baum zu schieben. Es gibt dem Entwickler die Möglichkeit in präziser, eloquenter Manier zu sagen \"Ich will diese Inhalte hier und diese dort haben\".",
              "",
              "Das klingt vielleicht nach einer Menge, aber es ist sehr einfach."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## git cherry-pick",
              "",
              "Der erste Befehl in dieser Serie ist `git cherry-pick`. Er sieht so aus:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "Er ist eine einfache Möglichkeit um auszudrücken, dass du eine Folge von Commits unter deinen aktuellen Checkout (also `HEAD`) hängen möchtest. Ich persönlich liebe `cherry-pick`, weil es wenig Magic enthält und einfach zu verstehen ist.",
              "",
              "Schauen wir's uns mal an.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hier haben wir ein Repository mit einigem Zeugs im Branch `side`, das wir in den Branch `master` kopieren wollen. Das könnten wir mit einem Rebase machen (wie bereits gesehen), aber schauen wir mal wie das mit `cherry-pick` geht."
            ],
            "afterMarkdowns": [
              "Das war's! Wir wollten die commits `C2` und `C4` und Git hat die einfach unter unseren aktuellen Checkout kopiert. So einfach ist das."
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level zu schaffen musst du einfach nur einige Commits aus den drei gezeigten Branches in den `master` kopieren. Der Zielbaum zeigt dir, welche.",
              ""
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
              "## コードの移動",
              "",
              "今まででは、gitの基本をひたすら見てきました -- コミット、ブランチ、そしてソースツリーの中でいろいろなポジションへのアクセス。これらの概念だけで、gitレポジトリの力を90%使いこなすことができ、開発者の主なニーズを満たしています。",
              "",
              "しかし最後の10%はより複雑なワークフローやちょっとトラブった時にとても役に立つこともある。これから取り上げる次の課題は「コードの移動」– つまり開発者が、このコードをここに置き、そのコードをそこに置きたい、と安易、かつ具体的に表す方法です。",
              "",
              "ちょっと複雑に聞こえるかもしれませんが、概念は簡単です。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "このシリーズの一つ目のコマンドは、`git cherry-pick`。次の形になります:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "現在の位置(`HEAD`)より下の一連のコミットをコピーしたいという意を単純に表す方法です。分かりにくいところが少ないので、個人的に私がとても好きなコマンドです。",
              "",
              "デモを見ていきましょう!",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "このレポジトリには、現在`side`ブランチから`master`にコピーしたいコードがあります。この前学んできたrebaseコマンドでは実現可能ですが、cherry-pickの動作を見ていきましょう。"
            ],
            "afterMarkdowns": [
              "それだけで終わりです! コミット`C2` と `C4`を取得したかったーそしてgitが現在の位置の直下に落としました。単純ですね!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルをクリアするには、３つのブランチからmasterにコードをコピーしてください。どのコミットを取得するかについてはゴールのビジュアライズをみてください。",
              ""
            ]
          }
        }
      ]
    }
  }
};
