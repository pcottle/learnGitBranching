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
    "gl"   : "Etiquetas en git",
    "fr_FR": "Git Tags",
    "zh_CN": "Git Tag",
    "zh_TW": "git tag",
    "ru_RU": "git tag",
    "ko"   : "Git 태그",
    "uk"   : "Git Tags"
  },
  "hint": {
    "en_US": "you can either check out the commit directly or simply checkout the tag!",
    "fr_FR": "Vous pouvez faire le checkout sur le commit ou sur le tag !",
    "de_DE": "Du kannst den Checkout entweder direkt auf den Commit oder das Tag machen.",
    "ja"   : "コミットを直接チェックアウトできますが、簡単にタグでチェックアウトすることも可能!",
    "es_AR": "Podés checkoutear directamente el commit, ¡o simplemente el tag!",
    "pt_BR": "Você pode fazer checkout diretamente no commit ou na tag correspondente!",
    "gl"   : "Podes saltar directamente ó commit, ¡ou a etiqueta, que é máis doado!",
    "zh_TW": "你可以直接 checkout 到 commit 上，或是簡單的 checkout 到 tag 上",
    "zh_CN": "你可以直接 checkout 到 commit 上，或是简单地 checkout 到 tag 上",
    "ru_RU": "Можно сделать checkout напрямую на коммит или же на тег",
    "ko"   : "커밋을 직접 또는 태그를 이용해서 체크아웃할수 있습니다!",
    "uk"   : "ти можеш або зробити checkout коміта напряму чи просто зачекаутити таг!"
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
              "Comme appris dans les niveaux précédents, les branches sont faciles à manipuler et se réfèrent aux commits qui ont été faits pour compléter le travail fait sur celles-ci. Les branches sont donc constamment en mouvement.",
              "",
              "Dans ce cas, vous vous demandez peut-être s'il y a un moyen d'ajouter une marque *permanente* dans l'historique de votre projet. Pour des commits comme des livraisons majeures ou d'importantes fusions, existe-t-il une façon plus stable qu'une branche de garder l'état d'une branche à un instant précis ?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Vous l'avez deviné ! Les tags Git offrent cette fonctionnalité : les tags marquent à jamais certains commits comme \"milestone\" (étape clé) auxquels vous pouvez vous référer comme à des branches.",
              "",
              "Encore plus important, il sont définitifs. Vous ne pouvez donc pas rajouter de commit dans un tag : les tags sont un peu comme un pointeur définitif dans l'arbre des commits.",
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
              "Voila, facile non ? Nous nommons le tag `v1` et il pointe vers le commit `C1`. Si vous ne spécifiez pas le commit, le tag pointera là où se trouve `HEAD`."
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
    "gl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Etiquetas en Git",
              "",
              "Como aprendiches nas leccións previas, as ramas pódense mover sinxelamente, e xeralmente refírense a distintos commits según vas completando o código. As ramas mutan con facilidade, soen ser temporais, e sempre cambiantes.",
              "",
              "Se estamos nese caso, podes preguntarte se existe unha forma de marcar *permanentemente* puntos históricos no proxecto. Para cousas como grandes entregas ou grandes merges, ¿existe algunha forma de marcar commits con algo máis permanente que unha rama?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Acertaches seguro, ¡si que existe! As etiquetas de git foron creadas para ese propósito -- elas marcan de forma (relativamente) permanente algún commits coma se fosen \"marcos das fincas\" (\"milestones\") nun campeiro, e podes facer referencias a elas mellor que o catastro.",
              "",
              "É moi importante saber que, as etiquetas non avanzan cando se crean novos commits. Non podes facer \"checkout\" nun tag e completar o traballo de esa etiqueta cun commit amend ou rebasándoo -- as etiquetas existen como áncoras na árbore de commits que están pegadas a certos puntos.",
              "",
              "Vexamos como se comportan as etiquetas na práctica."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Creamos un tag na rama `C1`, que é o noso prototipo da versión 1"
            ],
            "afterMarkdowns": [
              "¡Ahí o tes!. Sinxelo. Nomeamos a etiqueta de `v1` e referenciamos o commit `C1` explícitamente. Se non indicas o commit, git vai empregar o commit onde está situado o `HEAD`."
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar esta tarefa, crea as etiquetas amosadas na visualización do obxectivo, e entón fai checkout en `v1`. Mira que terminas no estado \"Detached HEAD\" -- eso é porque non podes facer commit directamente na etiqueta `v1`.",
              "",
              "No próximo nivel, examinaremos un caso de uso máis interesante para as etiquetas."
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
              "Wie du aus den vorhergehenden Levels weißt sind Branches einfach durch die Gegend zu schieben und zeigen auf verschiedene Commits, während die Arbeit in ihnen fortschreitet. Ein Branch wird oft verändert, manchmal nur temporär, und ist ständig in Bewegung.",
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
              "Peng! Ziemlich einfach. Wir haben das Tag `v1` genannt und lassen es auf `C1` zeigen. Wenn du den Commit weglässt wird das Tag für den Commit erzeugt, auf den `HEAD` zeigt."
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
    },
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Gitのタグ",
              "",
              "私たちは、前回、ブランチが簡単に移動でき、またしばしば異なる作業の完了しているコミットを参照できることを学びました。ブランチは、簡単に変化させることができ、しばしば一時的で、いつも移動しています。",
              "",
              "そのような場合に、もしプロジェクトの歴史的な点に*恒久的*にマークをつける方法があったならと思うかもしれません。例えば、メジャーリリースや大きなマージを行った時などに、そのコミットにブランチより恒久的な印をつける方法はないのでしょうか？",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "それは存在します！Gitのタグは当にそのような場面で最適です。 -- ブランチのように参照でき、「マイルストーン（標識）」のような確かで（多少）永久的な印をコミットにつけます。",
              "",
              "重要なことは、コミットを新たに作ってもタグは動かないということです。あなたは、タグにチェックアウトしてそのタグで作業を完了させるということはできません -- タグは、コミットツリーの特定の地点を指定する錨のようなものとして機能します。",
              "",
              "では、実際にタグがどのように動作するかを見てみましょう。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "私たちのバージョン1の原本となる`C1`にタグを付けてみましょう"
            ],
            "afterMarkdowns": [
              "見てください！とても簡単ですね。私たちは、`v1`という名前のタグを明示的に`C1`コミットに付与しました。もし、コミットを指定しなかった場合、`HEAD`にあるものにタグがつけられることになります。"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルは、ゴールとして提示されている図のようにタグを作り、`v1`にチェックアウトすることで完了します。そうすると、あなたは`HEAD`分離状態になることに気づくでしょう -- これは、あなたが直接`v1`タグにコミットができないことを意味しています。",
              "",
              "次のレベルでは、タグのより興味深い使い方について学びます。"
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
              "## Теги",
              "",
              "В прошлых уроках мы усвоили, что ветки просто двигать туда-сюда и они часто ссылаются на разные коммиты как на изменения данных в ветке. Ветки просто изменить, они часто временны и постоянно меняют своё состояние.",
              "",
              "В таком случае, где взять *постоянную* ссылку на момент в истории изменений? Для таких вещей, как релиз, большие слияния нужно нечто более постоянное, чем ветка.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Такое средство имеется. Git предоставляет нам теги, чья основная задача – ссылаться постоянно на конкретный коммит.",
              "",
              "Важно, что после создания они никогда не сменят своего положения, так что можно с лёгкостью сделать checkout конкретного момента в истории изменений",
              "",
              "Посмотрим на это на практике."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Создадим тег на `C1`, который будет нашей версией 1"
            ],
            "afterMarkdowns": [
              "Готово! Всё просто. Мы назвали тег `v1` и заставили его ссылаться на `C1` явным образом. Если конкретный коммит не указан, гит пометит тегом `HEAD`"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы пройти этот уровень, просто создай теги так, как показано на визуализации, и потом перейди на тег `v1`. Обрати внимание, что ты перейдёшь в состояние `detached HEAD`, так как нельзя сделать коммит прямо в тег `v1`.",
              "",
              "В следующем уровне мы попробуем более интересные способы применения тегов."
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
              "## Git 태그",
              "",
              "이전 강의에서 배웠듯이, 브랜치는 이동하기 쉽습니다. 작업의 완료, 진행에따라 이리저리 이동하면서 서로다른 커밋을 참조하게 됩니다. 브랜치는 쉽게 변하며 임시적인 것입니다 항상 바뀌고 있죠.",
              "",
              "이런 상황에서, 여러분은 여러분의 프로젝트의 역사(작업 이력)에서 중요한 지점들에 *영구적으로* 표시를 할 방법이 없을까 궁금할것입니다. 주요 릴리즈나 큰 브랜치 병합(merge)이 있을때가 그런 상황이겠군요. 이런 상황에 커밋들을 표시할 브랜치보다 영구적인 방법이 있을까요?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "당연히 있습니다! Git 태그는 딱 이런 상황을 위해 존재합니다 -- Git 태그는 특정 커밋들을 브랜치로 참조하듯이 영구적인 \"milestone(이정표)\"으로 표시합니다.",
              "",
              "중요한 점은, Git 태그는 커밋들이 추가적으로 생성되어도 절대 움직이지 않는다는 것입니다. 여러분은 태그를 \"체크아웃\"한 후에 그 태그에서 어떤 작업을 완료할 수 없습니다 -- 태그는 커밋 트리에서 특정 지점을 표시하기위한 닻같은 역할을 합니다.",
              "",
              "자 태그가 무엇을 하는지 예제를 통해 알아봅시다"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              " 프로토타입의 첫 버전인 `C1`에 태그를 만들어 봅시다."
            ],
            "afterMarkdowns": [
              "자! 아주 쉽죠. 우리는 태그의 이름을 `v1`이라고 지었고 커밋 `C1`을 지정해서 참조했습니다. 만약 커밋을 지정해주지 않으면 git은 `HEAD`가 있는지점에 태그를 붙일 것입니다."
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이번 레벨에서는 goal에 나타난것과 같이 태그를 만들고 `v1`을 체크아웃하면 됩니다. 분리된 `HEAD` 상태로 변하는것을 확인 해 보십시오 -- 이것은 `v1` 태그에 직접 커밋을 할 수 없기 때문입니다.",
              "",
              "다음 레벨에서는 태그의 더 흥미로운 활용 방법을 확인해 볼 것입니다."
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
              "## Таги в Git",
              "",
              "Як ти вже знаєш з попередніх уроків, гілки досить просто переносити в інші місця, і вони постійно вказують на різні коміти в процесі того? як ті в них додаються. Гілки легко модифікувати, часто тимчасово, й вони постійно змінюються.",
              "",
              "В такому разі, де взяти *постійне* посилання на момент в історії твого проекту? Для таких речей як релізи чи великі мерджі потрібно щось більш стале ніж гілка.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Є один спосіб! Таги в гіт якраз для цього й були створені -- вони (більш-менш) постійно вказують на певні коміти, й відмічають певні \"віхи\" в житті проекту, на які ти можеш потім посилатись так само як на гілки.",
              "",
              "Але, що важливіше, вони ніколи не переміщуються під час створення нових комітів. Ти не зможеш  \"зачекаутити\" таг а потім закомітити якісь зміни в цей таг -- таги просто відмічають корисні чи символічні місця в дереві комітів.",
              "",
              "Розгляньмо це на практиці"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Спробуймо зробити новий таг на  `C1`, що є прототипом нашої першої версії (вигаданого проекту)"
            ],
            "afterMarkdowns": [
              "Ось і маєш! Все досить просто. Ми назвали наш таг `v1` і він явно посилається на `C1`. Якщо пропустити коміт, git просто відмітить те, на чому знаходиться `HEAD` в данний момент"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Для того щоб пройти цей рівень, достатньо створити кілька тагів, як показано на візуалізації цілей, і потім зачекаутити `v1`. Зауваж, що ти потрапиш в стан `detached HEAD` -- це тому що ти не можеш напряму комітити в таг `v1`.",
              "",
              "В наступному рівні ми розглянемо більш цікавий приклад роботи з тагами."
            ]
          }
        }
      ]
    }
  }
};
