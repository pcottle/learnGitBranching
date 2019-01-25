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
    "gl"   : "Introuducción a cherry-pick",
    "zh_CN": "Git Cherry-pick",
    "zh_TW": "介紹 cherry-pick",
    "ru_RU": "Введение в Cherry-pick",
    "ko"   : "Cherry-pick 소개",
    "uk": "Знайомство з cherry-pick"
  },
  "hint": {
    "fr_FR": "git cherry-pick suivi par les noms de commits",
    "en_US": "git cherry-pick followed by commit names!",
    "de_DE": "git cherry-pick gefolgt von Commit-Namen.",
    "ja"   : "git cherry-pickの後にコミット名を追加",
    "es_AR": "git cherry-pick seguido de los nombres de los commits",
    "pt_BR": "git cherry-pick seguido dos nomes dos commits",
    "gl"   : "git cherry-pick seguido das referencias a commits",
    "zh_CN": "git cherry-pick 后面要跟提交的名字",
    "zh_TW": "git cherry-pick 後面要接著 commit 的名稱",
    "ru_RU": "git cherry-pick основывается на именах коммитов!",
    "ko"   : "커밋의 이름들로 git cherry-pick 하세요!",
    "uk": "git cherry-pick базується на іменах комітів!"
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
              "Nous avons maintenant pratiqué les bases de git -- commits, branches, et déplacements dans l'arbre des commits. Ces seuls concepts sont suffisants pour utiliser 90% du pouvoir des dépôts git et satisfaire les principaux besoins des développeurs.",
              "",
              "Les 10% restants, cependant, peuvent être assez utiles pour les systèmes assez complexes (ou quand vous vous êtes mis tout seul dans le pétrin). Le prochain concept que nous allons aborder est \"le déplacement de travail\" (moving work around) -- en d'autres termes, c'est une façon pour les développeurs de dire  \"Je veux ce travail ici et cet autre là.\".",
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
              " `git cherry-pick <Commit1> <Commit2> <...>`",
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
              "## Movendo o trabalho por aí",
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
    "gl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Movendo traballo por ahí",
              "",
              "Ata agora cubrimos o uso básico de git -- facer commit, crear ramas, e moverse pola árbore. Estes conceptos chegan para aproveitar o 90% do poder dos repositorios de git e cubrilas necesidades principais dos desenvolvedores.",
              "",
              "O 10% restante, ademáis, poden ser extremadamente útiles nos fluxos de traballo complexos (ou cando te meteches nalgún problema complicado). O próximo concepto que imos abordar é \"movendo o traballo por ahí\" -- noutras verbas, unha forma que teñen os desenvolvedores de dicir \"eu quero este traballo aquí, e aquel alí\" de forma precisa, elocuente e flexible.",
              "",
              "Eso pode ser moito, pero os conceptos son simples."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "O primeiro comando desta serie é `git cherry-pick`. O comando emprégase da seguinte forma:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "Trátase dunha forma bastante directa de dicir que queres copiar unha serie de commits sobre a túa ubicación actual (`HEAD`). Eu persoalmente adoro `cherry-pick` porque hai moita maxia envolta e é  un funcionamento sinxelo de entender.",
              "",
              "Vexamos unha demostración!",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aquí está un repositorio onde hai algún traballo na rama `side` que desexamos copiar para a rama `master`. Iso podería ser obtido por medio dun rebase (que xa aprendemos), pero imos ver como o resolve cherry-pick."
            ],
            "afterMarkdowns": [
              "¡Eso é! Queríamos os commits `C2` e `C4` e git insertounos por baixo de nós. ¡Moi sinxelo!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, copia algo de traballo das outras ramas na master. Podes ver qué commits queremos copiar na visualización do obxectivo.",
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
              "## 整理提交记录",
              "",
              "到现在我们已经学习了 Git 的基础知识 —— 提交、分支以及在提交树上移动。 这些概念涵盖了 Git 90% 的功能，同样也足够满足开发者的日常需求 ",
              "",
              "然而, 剩余的 10% 在处理复杂的工作流时(或者当你陷入困惑时）可能就显得尤为重要了。接下来要讨论的这个话题是“整理提交记录” —— 开发人员有时会说“我想要把这个提交放到这里, 那个提交放到刚才那个提交的后面”, 而接下来就讲的就是它的实现方式，非常清晰、灵活，还很生动。",
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
              "今まででは、gitの基本をひたすら見てきました -- コミットしたりブランチを派生したり、そしてソースツリーの中の色々な場所に移動することなどです。これらの概念だけで、gitリポジトリの力を90%使いこなすことができ、開発者の主な需要を満たしています。",
              "",
              "しかし最後の10%はより複雑なワークフローやちょっとトラブった時にとても役にたちます。これから取り上げる次の課題は「作業内容の移動」 –- 詳しく言えば、「この作業はここに置き、その作業はそこに置きたい」と言う開発者のために、優しく具体的で正確にその方法をお教えしましょう。",
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
              "このシリーズの一つ目のコマンドは、`git cherry-pick`。このコマンドの使い方は、次の形になります:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "現在の位置(`HEAD`)の下に一連のコミットをコピーしたいという意を単純に表す方法です。分かりにくいところが少ないので、個人的に私がとても好きなコマンドです。",
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
              "このリポジトリには、現在`side`ブランチから`master`にコピーしたいコードがあります。この前に学んだrebaseコマンドでも実現可能ですが、ここではcherry-pickの動作を見ていきましょう。"
            ],
            "afterMarkdowns": [
              "これだけで終わりです！コミット`C2` と `C4`を取得したかったわけですが、gitが現在の位置の直下に落としてくれました。単純ですね！"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルをクリアするには、３つのブランチからmasterにコードをコピーしてください。どのコミットを取得するかについてはゴールのツリーをみてください。",
              ""
            ]
          }
        }
      ]
    },
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Поперемещаем изменения",
              "",
              "Итак, мы уже освоили основы Git: коммиты, ветки, перемещение по дереву изменений. Уже этих знаний достаточно, чтобы овладеть 90% мощью Git-репозиториев и покрыть нужды разработчиков.",
              "",
              "А оставшиеся 10% будут очень полезны при сложных workflow (или если ты попал в сложную ситуацию). Теперь речь пойдёт о перемещении изменений — возможности, позволяющей разработчику сказать \"Хочу, чтобы эти изменения были вот тут, а вот эти — вон там\" и получить точные, правильные результаты, не теряя при этом гибкости разработки.",
              "",
              "На первый взгляд запутанно, но на самом деле всё просто."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "Первая из таких команд - это `git cherry-pick`. Она выглядит вот так:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "Это очень простой и прямолинейный способ сказать, что ты хочешь копировать несколько коммитов на место, где сейчас находишься (`HEAD`). Мы обожаем `cherry-pick` за то, что в нём очень мало магии и его очень просто понять и применять.",
              "",
              "Посмотрим на демонстрацию.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Вот репозиторий, где есть некие изменения в ветке `side`, которые мы хотим применить и в ветку `master`. Мы можем сделать это при помощи команды rebase, которую мы уже прошли, но давай посмотрим, как cherry-pick справится с этой задачей."
            ],
            "afterMarkdowns": [
              "Вуаля! Мы хотели перенести коммиты `C2` и `C4`, Git дал нам их там, где они нужны. Всё просто!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы пройти этот уровень, просто скопируй изменения из этих трёх веток в мастер. Чтобы понять, какие коммиты копировать, посмотри на визуализацию уровня.",
              ""
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
              "## 작업을 여기저기로 옮기기",
              "",
              "지금까지 우리는 git의 기초를 배웠습니다. -- 커밋을하고, 브랜치를 만들고, 소스 트리 여기저기를 돌아다녔습니다. 이런 개념들을 아는 것만으로도 git repository의 힘을 90%이상 사용하고 개발자들이 필요로하는 작업의 대부분을 할 수 있습니다.",
              "",
              "그 나머지 10% 기능이, 복잡한 작업(또는 작업중 막혔을때)중에 꽤 유용할 수 있습니다. 이제 배워 볼 다음 개념은 \"작업을 여기저로 올기기\" 다시 말해, 개발자들의 언어로 \"이 일은 여기에 저 일은 저기에 두고 싶어\" 정확하고 우아하고 유연하게.",
              "",
              "다소 과해 보일 수 있는데, 간단한 개념입니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git 체리-픽 (Cherry-pick)",
              "",
              "이 시리즈의 첫 명령어는 `git cherry-pick` 입니다. 다음 과 같은 형태로 사용합니다:",
              "",
              "* `git cherry-pick <Commit1> <Commit2> <...>`",
              "",
              "현재 위치(`HEAD`) 아래에 있는 일련의 커밋들에대한 복사본을 만들겠다는 것을 간단히 줄인 말입니다. 개인적으로 저는 `cherry-pick`을 아주 좋아합니다 왜냐하면 조금의 마법이 첨가되있고 이해하기 쉽기 때문입니다.",
              "",
              "데모를 확인해봅시다",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "여기 repository가 있습니다. `master`와 master로 복사하고 싶은 작업이 있는 브랜치 `side`가 있습니다. 이것은 rebase를 통해서 할 수 있습니다(이미 배운), 하지만 체리-픽이 이 작업을 어떻게 수행하는지 확인해 봅시다."
            ],
            "afterMarkdowns": [
              "됬습니다! 우리는 `C2`와 `C4` 커밋을 원했고 git이 우리가 원하는 곳 바로 밑에 톡 떨어뜨려 줬습니다. 아주 간단하죠!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이 레벨을 통과하기 위해서는 몇개의 작업을 세개의 브랜치들에서 master로 복사해와야합니다. 어떤 커밋들이 필요한지는 goal을 보고 확인하면 됩니다.",
              ""
            ]
          }
        }
      ]
    },
    "uk": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Переміщуємо зміни",
              "",
              "Поки що ми розглядали основи git -- як працювати з комітами та гілками й переміщення по дереву комітів. Цього вже достатньо щоб використовувати 90% фунцкій гіт та мати змогу ефективно працювати з гіт як розробник.",
              "",
              "Решта 10%, тим не менш, можуть бути надзвичайно корисними при роботі зі складними робочими процесами (workflow), чи коли ти чи ще хтось щось зробили не так і ти хочеш це виправити. Наступна концепція з якою ми познайомимось це \"перенесення змін\" -- іншими словами, це можливість розробника переміщувати коміти між гілками в простий та зручний спосіб.",
              "",
              "Це може видаватися складним, але насправді це дуже проста концепція."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Cherry-pick",
              "",
              "Перша команда в цій серії називається `git cherry-pick`. Вона має наступну форму:",
              "",
              "* `git cherry-pick <Коміт1> <Коміт2> <...>`",
              "",
              "Це надзвичайно простий спосіб вказати гіту що потрібно скопіювати серію комітів до поточного розташування (`HEAD`). Персонально я обожнюю `cherry-pick` за його прямолінійнсть, це дуже зрозуміла концепція що не використовує прихованої магії",
              "",
              "Давайте подивимось на практиці!",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ми бачимо репозиторій де є певні зміни в гілці `side` які ми хочемо скопіювати в  `master`. Для цього можна використати rebase (який ми вже вивчили), але подивимось як з цим впорається cherry-pick."
            ],
            "afterMarkdowns": [
              "Овва! Ми хотіли коміти `C2` та `C4` і git додав їх до поточного розташування. Просто й доступно!"
            ],
            "command": "git cherry-pick C2 C4",
            "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти це рівень, просто скопіюй якісь зміни з трьох гілок показаних на діаграмі в master. В візуалізації видно які коміти потрібно скопіювати.",
              ""
            ]
          }
        }
      ]
    }
  }
};
