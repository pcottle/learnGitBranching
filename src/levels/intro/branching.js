exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C1\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugFix;git checkout bugFix",
  "name": {
    "en_US": "Branching in Git",
    "de_DE": "Branches in Git",
    "ja"   : "Gitのブランチ",
    "ko": "Git에서 브랜치 쓰기",
    "es_AR": "Brancheando en Git",
    "pt_BR": "Ramos no Git",
    "gl"   : "Ramas en Git",
    "fr_FR": "Gérer les branches avec Git",
    "zh_CN": "Git Branch",
    "zh_TW": "建立 git branch",
    "ru_RU": "Ветвление в Git",
    "uk": "Розгалуження в Git"
  },
  "hint": {
    "en_US": "Make a new branch with \"git branch <branch-name>\" and check it out with \"git checkout <branch-name>\"",
    "de_DE": 'Lege mit "git branch <Name>" einen neuen Branch an und checke ihn mit "git checkout <Name> aus',
    "ja"   : "ブランチの作成（\"git branch [ブランチ名]\"）と、チェックアウト（\"git checkout [ブランチ名]\"）",
    "es_AR": "Hacé una nueva rama con \"git branch [nombre]\" y cambiá a ella con \"git checkout [nombre]\"",
    "pt_BR": "Crie um novo ramo com \"git branch [nome]\" e mude para ele com \"git checkout [nome]\"",
    "gl"   : "Crea unha nova rama con \"git branch [nome]\" e cambiate a ela facendo \"git checkout [nome]\"",
    "fr_FR": "Faites une nouvelle branche avec \"git branch [nom]\" positionnez-vous dans celle-ci avec \"git checkout [nom]\"",
    "zh_CN": "用 'git branch <分支名>' 来创建分支，用 'git checkout <分支名>' 来切换到分支",
    "zh_TW": "用 'git branch [ branch 名稱]' 來建立 branch，用 'git checkout [ branch 名稱]' 切換到該 branch",
    "ko": "\"git branch [브랜치명]\"으로 새 브랜치를 만들고, \"git checkout [브랜치명]\"로 그 브랜치로 이동하세요",
    "ru_RU": "Создай новую ветку при помощи \"git branch [name]\" и перейди на неё при помощи \"git checkout [name]\"",
    "uk": "Створи нову гілку за допомогою \"git branch [ім’я]\" й перейди на неї за допомогою \"git checkout [ім’я]\""
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
              "Branches in Git are incredibly lightweight as well. They are simply pointers to a specific commit -- nothing more. This is why many Git enthusiasts chant the mantra:",
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
              "Here we will create a new branch named `newImage`"
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
              "git checkout <name>",
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
              "make a new branch named `bugFix` and switch to that branch.",
              "",
              "By the way, here's a shortcut: if you want to create a new ",
              "branch AND check it out at the same time, you can simply ",
              "type `git checkout -b [yourbranchname]`."
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
              "## Branches in Git",
              "",
              "Branches sind in Git extrem schlank. Sie sind einfach Verweise auf einen bestimmten Commit -- das ist alles. Es ist unter Git-Enthusiasten deshalb gängige Praxis, früh und oft Branches anzulegen.",
              "",
              "Da das Anlegen von Branches keinen Plattenplatz und Speicher verbraucht, liegt es nahe die Arbeit in kleine logische Häppchen aufzuteilen, anstatt mit wenigen großen, monolithischen Branches zu hantieren.",
              "",
              "Wir werden sehen wie Commits und Branches zusammengehören sobald wir anfangen mit beiden zu arbeiten. Bis hierhin merk dir einfach, dass ein Branch im Prinzip bedeutet \"ich möchte die Arbeit, die in diesem Commit und seinen Vorgängern steckt, sichern\"."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
            "Schauen wir mal, wie Branches in der Praxis aussehen.",
              "",
              "Wir legen einen neuen Branch an und nennen ihn `issue`:"
            ],
            "afterMarkdowns": [
              "Und das war's auch schon, mehr ist es nicht. Der Branch `issue` zeigt nun auf den Commit `C1`."
            ],
            "command": "git branch issue",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lass uns mal ein wenig auf dem neuen Branch arbeiten. Machen wir einen Commit:"
            ],
            "afterMarkdowns": [
              "Oi! Der Branch `master` hat sich verändert, aber der Branch `issue` nicht. Das liegt daran, dass wir nicht \"auf\" dem neuen Branch waren, weshalb das Sternchen `*` auch hinter `master` steht."
            ],
            "command": "git commit",
            "beforeCommand": "git branch issue"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Sagen wir Git also erst mal auf welchem Branch wir arbeiten wollen, und zwar mit",
              "",
              "```",
              "git checkout <Name>",
              "```",
              "",
              "Das wird uns auf den neuen Branch bringen bevor wir unsere Änderungen committen."
            ],
            "afterMarkdowns": [
              "Und fertig! Unsere Änderungen wurden im neuen Branch gespeichert."
            ],
            "command": "git checkout issue; git commit",
            "beforeCommand": "git branch issue"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Cool! Jetzt bist du soweit, selbst Branches anzulegen. Wenn dieses Fenster geschlossen wurde, leg einen neuen Branch namens `bugFix` an und schalte auf diesen um."
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
              "Gitではコミットだけでなく、ブランチもまた信じられないほど軽量です。ブランチとは単に特定のコミットを指示したポインタにしか過ぎません。Gitの達人が決まってこう言うのは、そのためです：",
              "",
              "```",
              "早めに、かつ頻繁にブランチを切りなさい",
              "```",
              "",
              "どれほど多くのブランチを作ってもストレージやメモリを全然使わないので、ブランチを肥大化させるよりも論理的に分割していく方が簡単なのです。",
              "",
              "ブランチとコミットをあわせて使い始めると、これら2つの機能がどのように連動して機能するかがわかるでしょう。ここではとりあえず、ブランチは基本的には「あるコミットとその親のコミットたちを含めた全てのコミット」のことを呼ぶと覚えておいてください。"
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
              "あらら、`newImage`ではなくて`master`ブランチが移動してしまいました。これは、私たちが`newImage`のブランチ上で作業していなかったためです。どのブランチで作業しているかは、アスタリスク(*)がついてるかどうかで分かります。"
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
              "はい、これでもうどんなブランチでも切れますね。このウィンドウを閉じて、",
              "`bugFix`という名前のブランチを作成し、そのブランチをチェックアウトしてみましょう。"
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
              "## Ramas en Git",
              "",
              "Las ramas (branches) en Git son increíblemente livianas. Son sólo referencias a un commit específico - nada más. Por esto es que tantos entusiastas de Git siguen el mantra:",
              "",
              "```",
              "brancheá temprano, y brancheá seguido",
              "```",
              "",
              "Como no hay consumo extra de alamcenamiento ni memoria al hacer varias ramas, es más fácil dividir lógicamente tu trabajo que tener un par de ramas grandes.",
              "",
              "Cuando empecemos a mezclar ramas y commits, vamos a ver cómo se combinan estas dos herramientas. Por ahora, en cambio, simplemente recordá que una rama escencialmente dice \"Quiero incluir el trabajo de este commit y todos su ancestros\"."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos cómo se ven las ramas en práctica.",
              "",
              "Acá vamos a crear una rama nueva llamada `newImage`"
            ],
            "afterMarkdowns": [
              "Ahí está, ¡eso es todo lo que hay que hacer para branchear! La rama `newImage` ahora referencia al commit `C1`"
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Pongamos algo de trabajo en esta nueva rama. Apretá el botón de acá abajo"
            ],
            "afterMarkdowns": [
              "¡Uh, no! ¡La rama `master` avanzó, pero `newImage` no! Eso es porque no estábamos \"en\" la rama nueva, y por eso el asterisco (*) estaba en `master`"
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Digámosle a git que queremos checkoutear esa rama con",
              "",
              "```",
              "git checkout [name]",
              "```",
              "",
              "Esto va a situarnos en esa rama antes de commitear nuestros cambios"
            ],
            "afterMarkdowns": [
              "¡Ahí estamos! Nuestros cambios se registraron en nuestra nueva rama"
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¡Ok! Ya estás listo para manejar ramas. Cuando se cierre esta ventana,",
              "creá una nueva rama llamada `bugFix` y cambiate a ella"
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
              "## Ramos no Git",
              "",
              "Ramos no Git também são incrivelmente leves. Eles são simplesmente referências a um commit específico -- e nada mais. É por isso que muitos entusiastas do Git entoam o mantra:",
              "",
              "```",
              "ramifique cedo, ramifique sempre",
              "```",
              "",
              "Devido a não existir sobrecarga de armazenamento / memória associada à criação de ramos, é mais fácil dividir logicamente o seu trabalho do que ter ramos grandes e gordos.",
              "",
              "Quando começarmos a misturar ramos e commits, vamos ver como esses dois recursos combinam bem. Por enquanto, só lembre que um ramo diz essencialmente \"Quero incluir o trabalho deste commit e de todos os seus ancestrais\"."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vejamos como os ramos funcionam na prática.",
              "",
              "Aqui vamos criar um novo ramo chamado `newImage`"
            ],
            "afterMarkdowns": [
              "Veja, é só isso que você tem que fazer para ramificar! O ramo `newImage` agora se refere ao commit `C1`"
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos tentar colocar algum trabalho neste novo ramo. Clique no botão abaixo"
            ],
            "afterMarkdowns": [
              "Ah não! O ramo `master` se moveu mas o `newImage` não! Isso é porque o novo ramo não era o \"ativo\", e é por isso que o asterisco (*) estava no `master`"
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos contar ao git que queremos fazer checkout no ramo com:",
              "",
              "```",
              "git checkout [nome]",
              "```",
              "",
              "Isso vai nos situar no ramo antes de commitarmos nossas mudanças"
            ],
            "afterMarkdowns": [
              "Aqui vamos nós! Nossas mudanças foram gravadas no novo ramo"
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! Vocês estão todos prontos para ramificar. Assim que esta janela fechar,",
              "crie um novo ramo chamado `bugFix` e mude para esse ramo"
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
              "## Ramas en Git",
              "",
              "As Ramas en Git son tamén increiblemente liviás. Elas sinxelamente son referencias a un mesmo commit específico, e nada máis. É por iso que moitos entusiastas do Git entonan o mantra:",
              "",
              "```",
              "ramifica cedo, ramifica sempre",
              "```",
              "",
              "Debido a non existir sobrecarga de memoria facendo moitas ramas, é máis sinxelo dividir a lóxica do teu traballo en ramas que ter unha enorme.",
              "",
              "Cando comezamos a mesturar ramas e commits imos ver como eses dous recursos combínanse ben. Por agora lembra que unha rama esencialmente di \"Quero incluír o traballo deste commit e de todos os seus ancestros\"."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vexamos cómo as ramas funcionan na práctica.",
              "",
              "Aquí imos crear unha nova rama chamada `newImage`"
            ],
            "afterMarkdowns": [
              "Mira, solo tes que poñer eso para crear unha rama! A rama `newImage` agora apunta ó commit `C1`"
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Imos intentar colocar algún traballo nesta nova rama. Pincha no botón de abaixo"
            ],
            "afterMarkdowns": [
              "¡Bueno home! A rama `master` moveuse pero a rama `newImage` non! Eso é porque a nova rama non era a \"actual\", e é por iso que o asterisco (*) ficaba na rama `master`"
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ímoslle decir a Git que nos queremos mover á rama con:",
              "",
              "```",
              "git checkout [nome]",
              "```",
              "",
              "Esto vainos levar á rama que tiñamos antes de facer os nosos cambios."
            ],
            "afterMarkdowns": [
              "¡Imos alá! Os nosos cambios foron grabados na nova rama."
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¡Ok! Estas preparado para facer ramas. Así que podes pechar a ventá,",
              "crear unha rama chamada `bugFix` e moverte para esa rama.",
              "",
              "Inda así, hai un atallo: se ti quixeras crear unha nova ",
              "rama e moverte a ela ó mesmo tempo, ti podes escribir simplemente ",
              "`git checkout -b [a-tua- rama]`."
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
              "Les branches sous Git sont incroyablement légères. Elles sont simplement des références sur un commit spécifique -- rien de plus. C'est pourquoi beaucoup d'enthousiastes répètent en cœur :",
              "",
              "```",
              "des branches le plus tôt possible, et des branches souvent",
              "```",
              "",
              "Parce qu'il n'y a pas de surcoût (stockage/mémoire) associé aux branches, il est facile de diviser son travail en de nombreuses branches plutôt que d'avoir quelques grosses branches.",
              "",
              "Nous verrons comment les branches et les commits interagissent quand nous les utiliserons ensemble. Pour l'instant, souvenez-vous qu'une branche est un moyen d'exprimer \"Je veux inclure le contenu de ce commit et de tous les commits parents.\""
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
              "Oh non! La branche `master` a bougé mais pas la branche `newImage` ! C'est parce que nous n'étions pas  \"sur\" la nouvelle branche, comme indiqué par l'astérisque (*) sur `master`"
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
              "Cela nous positionne sur la nouvelle branche avant de faire un commit avec nos modifications"
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
    "zh_TW": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## git 的 branch",
              "",
              " git 的 branch 非常不佔空間。它們只是一個指向某個 commit 的 reference，就這麼簡單。所以許多 git 的愛好者會建議：",
              "",
              "```",
              "早點建立 branch！經常建立 branch！",
              "```",
              "",
              "因為建立 branch 不怎麼會佔用到硬碟空間或者是記憶體，所以你可以把你目前的工作分成好幾個 branch，這比只用一個 branch 要來的好。",
              "",
              "同時使用 branch 和 commit 時，我們待會可以看到兩者如何配合。現在，只要記住使用 branch 其實就是在說：「我想要包含這一次的 commit 以及它的所有 parent 的 commit。」"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "舉一個例子來看看 branch 到底是什麼。",
              "",
              "這裡，我們建立一個名稱為 `newImage` 的新的 branch。"
            ],
            "command": "git branch newImage",
            "afterMarkdowns": [
              "看吧！這就是建立 branch 所需的操作啦！ `newImage` branch 現在指向 commit `C1`。"
            ],
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "現在讓我們這個新的 branch 做一些操作。點擊下面的按鈕。"
            ],
            "command": "git commit",
            "afterMarkdowns": [
              "太奇怪了啦！ `master` branch 前進了，但 `newImage` branch 沒有前進！這是因為我們沒有「在」這個新的 branch 上，這也是為什麼星號（*）會在 `master` 上。"
            ],
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "使用如下指令告訴 git 我們想要切換到新的 branch",
              "",
              "```",
              "git checkout [name]",
              "```",
              "",
              "這可以讓我們在 commit 之前切換到新的 branch。"
            ],
            "command": "git checkout newImage; git commit",
            "afterMarkdowns": [
              "太好了！新的 branch 已經記錄了我們的修改。"
            ],
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好啦，你已經準備好使用 branch 了。當目前的視窗關閉後，",
              "建立一個叫 `bugFix` 的新的 branch，然後切換過去。"
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
    },
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Ветвление в Git",
              "",
              "Ветки в Git, как и коммиты, невероятно легковесны. Это просто ссылки на определённый коммит — ничего более. Вот почему многие фанаты Git повторяют мантру",
              "",
              "```",
              "делай ветки сразу, делай ветки часто",
              "```",
              "",
              "Так как создание множества веток никак не отражается на памяти или жестком диске, удобнее и проще разбивать свою работу на много маленьких веток, чем хранить все изменения в одной огромной ветке.",
              "",
              "Чуть позже мы попробуем использовать ветки и коммиты, и вы увидите, как две эти возможности сочетаются. Можно сказать, что созданная ветка хранит изменения текущих коммитов и всех его родителей."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Посмотрим, что такое ветки на практике",
              "",
              "Создадим здесь новую ветку с именем newImage"
            ],
            "afterMarkdowns": [
              "Вот и всё, ребята! Ветка newImage теперь указывает на коммит C1"
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Теперь попробуем сделать некоторые изменения в этой ветке. Для этого нажми кнопку ниже."
            ],
            "afterMarkdowns": [
              "О-оу! Ветка master сдвинулась, тогда как ветка newImage - нет! Всё из-за того, что мы не переключились на новую ветку, а остались в старой, о чём говорит звёздочка около ветки master"
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Сообщим Git, что хотим выбрать ветку",
              "",
              "```",
              "git checkout [name]",
              "```",
              "",
              "Эта команда перенесёт нас на новую ветку в момент, когда мы ещё не коммитили изменения"
            ],
            "afterMarkdowns": [
              "Вот так! Наши изменения записаны уже в новую ветку"
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ну что ж, теперь ты готов к работе с ветками. Как только это окно закроется,",
              "создай ветку с именем bugFix и переключись на неё"
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
              "## Гілки в Git",
              "",
              "Гілки в Git також є дивовижно легкими. Вони є просто посиланнями на конкретний коміт, нічого більше. Через це багато Git-ентузіастів повторюють мантру:",
              "",
              "```",
              "роби гілки завчасно, роби гілки часто",
              "```",
              "",
              "Через те, що сворення нових гілок ніяк не впливає на використання пам’яті чи дискового простору, набагато простіше розділити свою роботу на кілька логічно зв’язаних по функціоналу гілок, ніж працювати з величезними гілками.",
              "",
              "Коли ми почнемо використовувати гілки та коміти, ми побачимо, як вони поєднуються між собою. Але зараз просто запам’ятай, що гілка просто зберігає роботу теперішнього коміту і всіх його попередників."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте на практиці подивимось, як виглядають гілки в Git.",
              "",
              "Зараз ми створимо нову гілку `newImage`."
            ],
            "afterMarkdowns": [
              "Ось і все, що треба знати про гілки. Гілка `newImage` тепер посилається на коміт `C1`."
            ],
            "command": "git branch newImage",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте спробуємо додати якусь інформацію до цієї нової гілки. Натисни кнопку внизу."
            ],
            "afterMarkdowns": [
              "От халепа! Гілка `master` просунулася вперед, але гілка `newImage` \u2014 ні! Це тому, що ми були не \"на новій гілці\". Через це зірочка (*) була поруч з  `master`."
            ],
            "command": "git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте вкажемо Git, що ми хочемо перейти на нову гілку за допомогою",
              "",
              "```",
              "git checkout [ім’я]",
              "```",
              "",
              "Ця команда перекине нас на нову гілку до того, як ми закомітимо наші зміни."
            ],
            "afterMarkdowns": [
              "Ось і все! Наші зміни були записані в нову гілку."
            ],
            "command": "git checkout newImage; git commit",
            "beforeCommand": "git branch newImage"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Тепер ти готовий до створення гілок. Як тільки це вікно пропаде, ",
              "зроби нову гілку з назвою `bugFix` та перейди на неї."
            ]
          }
        }
      ]
    }
  }
};
