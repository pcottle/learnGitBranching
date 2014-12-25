exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C3\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\",\"C4\"],\"id\":\"C5\"}},\"tags\":{\"v1\":{\"target\":\"C2\",\"id\":\"v1\",\"type\":\"tag\"},\"v0\":{\"target\":\"C1\",\"id\":\"v0\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"C2\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git tag v1 side~1;git tag v0 master~2;git checkout v1",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C3\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\",\"C4\"],\"id\":\"C5\"}},\"tags\":{},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Git Tags",
    "de_DE": "Git Tags",
    "ja"   : "Gitのタグ",
    "es_AR": "Tags en git",
    "pt_BR": "Tags no Git",
    "fr_FR": "Git Tags",
    "zh_CN": "Git Tags",
    "zh_TW": "git tag"
  },
  "hint": {
    "en_US": "you can either check out the commit directly or simply checkout the tag!",
    "fr_FR": "Vous pouvez faire le checkout sur le commit ou sur le tag !",
    "de_DE": "Du kannst den Checkout entweder direkt auf den Commit oder das Tag machen.",
    "ja"   : "コミットを直接チェックアウトできますが、簡単にタグでチェックアウトすることも可能!",
    "es_AR": "Podés checkoutear directamente el commit, ¡o simplemente el tag!",
    "pt_BR": "Você pode fazer checkout diretamente no commit ou na tag correspondente!",
    "zh_TW": "你可以直接 checkout 到 commit 上，或是簡單的 checkout 到 tag 上",
    "zh_CN": "你可以直接 checkout 到 commit 上，或是简单的 checkout 到 tag 上"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Tags",
              "",
              "As you have learned from previous lessons, branches are easy to move around and often refer to different commits as work is completed on them. Branches are easily mutated, often temporary, and always changing.",
              "",
              "If that's the case, you may be wondering if there's a way to *permanently* mark historical points in your project's history. For things like major releases and big merges, is there any way to mark these commits with something more permanent than a branch?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "You bet there is! Git tags support this exact use case -- they (somewhat) permanently mark certain commits as \"milestones\" that you can then reference like a branch.",
              "",
              "More importantly though, they never move as more commits are created. You can't \"check out\" a tag and then complete work on that tag -- tags exist as anchors in the commit tree that designate certain spots.",
              "",
              "Let's see what tags look like in practice."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's try making a tag at `C1` which is our version 1 prototype"
            ],
            "afterMarkdowns": [
              "There! Quite easy. We named the tag `v1` and referenced the commit `C1` explicitly. If you leave the commit off, git will just use whatever `HEAD` is at"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "For this level just create the tags in the goal visualization and then check `v1` out. Notice how you go into detached `HEAD` state -- this is because you can't commit directly onto the `v1` tag.",
              "",
              "In the next level we'll examine a more interesting use case for tags."
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
              "## Git Tags",
              "",
              "Comme apris dans les niveaux précédents, les branches sont faciles à manipuler et réfèrent aux commits qui ont été fait pour compléter le travail fait sur celles-ci. Les branches sont donc constamment en mouvement.",
              "",
              "Dans ce cas, vous vous demandez peut-être s'il y a un moyen d'ajouter une marque *permanente* dans l'historique de votre projet. Pour des commits comme des release majeures ou d'importants merge, existe-t-il une façon plus stable qu'une branche de garder l'état d'une branche à un instant précis ?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Vous l'avez deviné ! Git tags offre cette fonctionnalité -- les tags marquent à jamais certains commits comme \"milestone\" auxquels vous pouvez vous référez comme à des branches.",
              "",
              "Encore plus important, il sont définitifs. Vous ne pouvez donc pas rajouter de commit dans un tag -- les tags sont un peu comme un pointeur définitif dans l'arbre des commits.",
              "",
              "Voyons les tags en pratique."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Essayons de faire un tag sur C1 (qui représente la version 1 de notre prototype)"
            ],
            "afterMarkdowns": [
              "Voila, facile non ? Nous nommons le tag `v1` et il pointe vers le commit  `C1`. Si vous ne spécifiez pas le commit, le tag pointera là où se trouve `HEAD`."
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour ce niveau, créez simplement les tags visibles dans les objectifs puis faites un checkout sur le tag `v1`. Remarquez comment vous vous retrouvez dans l'état `HEAD` détachée -- c'est parce que vous ne pouvez pas commiter sur le tag `v1`.",
              "",
              "Dans les niveaux suivants vous verrez un cas plus intéressant d'utilisation des tags."
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
              "## git tag",
              "",
              "就像你之前學到的一樣，branch 很容易被移動，而且當有新的 commit 時，又會再移動，branch 經常指向不同的 commit，branch 很容易改變。",
              "",
              "你可能會有疑問，有沒有什麼方法可以*永遠*有一個指向 commit 的記號，例如，表示重大的軟體釋出，或者是修正很大的 bug，有沒有其它比 branch 更好的方法，可以永遠地指向這些 commit？",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "你說對了！git tag 可以解決這個問題，它們可以永遠地指向某個特定的 commit，就像是表示一個\"里程碑\"一樣。",
              "",
              "更重要的是，當有新的 commit 時，它們也不會移動，你不可以 \"checkout\" 到 tag 上面 commit，tag 的存在就像是一個在 commit tree 上的表示特定訊息的一個錨。",
              "",
              "讓我們來實際看一下 tag 長什麼樣子..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們試著建立一個 tag，指向 commit `C1`，表示這是我們第一個版本。"
            ],
            "afterMarkdowns": [
              "看吧！非常容易，我們命名這個 tag 叫做 `v1`，並且讓它指向 commit `C1`，如果你離開了該 commit，git 會根據 `HEAD` 所指向的位置才分辨。"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "在這個關卡中，建立一個如視覺化目標裡面的 tag，然後 checkout 到 `v1` 上面，要注意你會進到分離 `HEAD` 的狀態，這是因為你不能夠直接在 `v1` 上面做 commit。",
              "",
              "在下個關卡中我們會介紹更多 tag 的應用..."
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
              "## git tag",
              "",
              "就像你之前学到的一样，branch 很容易被移动，而且当有新的 commit 时，又会再移动，branch 经常指向不同的 commit，branch 很容易改变。",
              "",
              "你可能会有疑问，有没有什么方法可以*永远*有一个指向 commit 的记号，例如，表示重大的软体释出，或者是修正很大的 bug，有没有其它比 branch 更好的方法，可以永远地指向这些 commit？",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "你说对了！git tag 可以解决这个问题，它们可以永远地指向某个特定的 commit，就像是表示一个\"里程碑\"一样。",
              "",
              "更重要的是，当有新的 commit 时，它们也不会移动，你不可以 \"checkout\" 到 tag 上面 commit，tag 的存在就像是一个在 commit tree 上的表示特定讯息的一个锚。",
              "",
              "让我们来实际看一下 tag 长什么样子..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "让我们试着建立一个 tag，指向 commit `C1`，表示这是我们第一个版本。"
            ],
            "afterMarkdowns": [
              "看吧！非常容易，我们命名这个 tag 叫做`v1`，并且让它指向 commit `C1`，如果你离开了该 commit，git 会根据 `HEAD` 所指向的位置才分辨。"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "在这个关卡中，建立一个如视觉化目标里面的 tag，然后 checkout 到 `v1` 上面，要注意你会进到分离 `HEAD` 的状态，这是因为你不能够直接在`v1` 上面做 commit。",
              "",
              "在下个关卡中我们会介绍更多 tag 的应用..."
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
              "## Tags en git",
              "",
              "Como aprendiste en lecciones anteriores, las ramas pueden moverse fácilmente, y en general van referenciando distintos commits a medida que el trabajo se va completando en ellas. Las ramas cambian fácilmente, suelen ser temporales, y siempre cambiantes.",
              "",
              "Si ese es el caso, te podrías estar preguntando si hay una manera de marcar *permanentemente* puntos en la historia de tu proyecto. Para cosas como releases mayores o grandes merges, ¿hay algún modo de marcar esos commits con algo más permanente que un branch?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¡Seguro que hay! Los tags de git soportan exactamente este caso de uso -- marcan (bastante) permanentemente determinados commits como \"hitos\" que podés referenciar como a un branch.",
              "",
              "Aún más importante, los tags no avanzan cuando se crean nuevos commits. No podés \"checkoutear\" un tag y completar el trabajo en ese tag - los tags son marcas fijas en el árbol de commits que designan ciertos puntos.",
              "",
              "Veamos cómo se ven los tags en práctica..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Creemos un tag en `C1`, que es nuestro prototipo de la versión 1"
            ],
            "afterMarkdowns": [
              "¡Ahí está! Bastante simple. Nombramos al tag `v1` y referenciamos explícitamente al commit `C1`. Si no especificás el commit, git va a usar al apuntado por `HEAD`"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para este nivel, simplemente creá los tags en la visualización final y después checkouteá `v1`. Notá cómo entrás en el estado detached -- esto es porque no podés commitear directamente sobre el tag `v1`.",
              "",
              "En el próximo nivel vamos a examinar un caso de uso más interesante para los tags."
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
              "## Tags no Git",
              "",
              "Como você aprendeu nas lições anteriores, ramos são fáceis de mover e geralmente vão se referindo a diferentes commits conforme você vai trabalhando no código. Ramos são facilmente mutáveis, frequentemente temporários, e estão sempre mudando.",
              "",
              "Se este é o caso, você pode estar se perguntando se não existe uma forma de marcar *permanentemente* pontos históricos do projeto. Para coisas como grandes releases ou grandes merges, existe alguma forma de marcar commits com algo mais permanente que um ramo?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Você acertou a aposta, existe sim! As tags do Git foram criadas exatamente para esse caso de uso -- elas marcam de forma (relativamente) permanente certos commits como se fossem \"pedras de kilometragem\" (\"milestones\") em uma estrada, e você pode referenciá-las exatamente como faz com ramos.",
              "",
              "O mais importante, no entanto, é que elas nunca se movem sozinhas quando novos commits são criados. Você pode fazer \"checkout\" em uma tag e então completar trabalho nessa tag -- tags existem como âncoras na árvore de commits que estão atreladas a certos pontos.",
              "",
              "Vejamos como as tags se comportam na prática."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Criemos uma tag em `C1`, que é nosso protótipo da versão 1"
            ],
            "afterMarkdowns": [
              "Aqui! Bem fácil. Nós chamamos a tag de `v1` e referenciamos o commit `C1` explicitamente. Se você chamar o comando sem especificar um commit, o git vai usar seja lá qual commit para o qual o `HEAD` estiver apontando"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar esta tarefa, simplesmente crie as tags mostradas na visualização do objetivo, e então faça checkout em `v1`. Veja que você vai para o estado \"Detached HEAD\" -- isso é devido ao fato de que você não pode commitar diretamente na tag `v1`.",
              "",
              "No próximo nível, examinaremos mais um caso de uso interessante para as tags."
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
              "## Git Tags",
              "",
              "Wie du aus den vorhergehenden Levels weißt sind Branches einfach durch die Gegend zu schieben und zeigen of auf verschiedene Commits, während die Arbeit in ihnen fortschreitet. Ein Branch wird oft verändert, manchmal nur temporär, und ist ständig in Bewegung.",
              "",
              "Da das so ist fragst du dich vielleicht, ob es nicht eine Möglichkeit gibt, eine bestimmte Stelle in deiner Projekt-History *permanent* zu kennzeichnen. Kann man nicht zum Beispiel für große Releases und Meilensteine nicht einen Commit mit etwas festerem kennzeichnen, als mit einem Branch-Namen?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Aber klar! In Git gibt es genau zu diesem Zweck Tags -- sie kennzeichnen einen Commit (ziemlich) permanent als Meilenstein oder ähnliches, und man kann sie ansprechen wie Branch-Namen.",
              "",
              "Noch viel wichtiger, Tags verändern nicht ihre Position wenn man Commits hinzufügt. Du kannst ein Tag nicht in diesem Sinne auschecken und dann Modifikationen darauf committen. Tags sind Anker im Commit-Baum, die bestimmte Stellen anzeigen.",
              "",
              "Lass uns anschauen wie Tags in der Praxis funktionieren."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
            "Lass uns ein Tag bei `C1` anlegen und damit die Version 1 unseres Prototyps markieren."
            ],
            "afterMarkdowns": [
              "Peng! Ziemlich einfach. Wir haben das Tag `v1` genannt und lassen es auf `C1` zeigen. Wenn du den Commit weglässt wir das Tag für den Commit erzeugt, auf den `HEAD` zeigt."
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level zu schaffen, erstelle einfach die Tags wie sie in der Zielbeschreibung stehen und mach dann einen Checkout auf `v1`. Beachte wie du dabei in den \"Detached HEAD\" Zustand gehst -- das liegt daran, dass du keine Commits direkt auf das `v1` Tag machen kannst.",
              "",
              "Im nächsten Level schauen wir uns dann interessantere Anwendungsfälle für Tags an."
            ]
          }
        }
      ]
    }
  }
};
