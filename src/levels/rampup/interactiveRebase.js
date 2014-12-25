exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22master%22%7D%2C%22overHere%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22overHere%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase -i overHere --solution-ordering C3,C5,C4",
  "compareOnlyMasterHashAgnostic": true,
  "disabledMap": {
    "git cherry-pick": true
  },
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\"},\"overHere\":{\"target\":\"C1\",\"id\":\"overHere\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "you can use either branches or relative refs (HEAD~) to specify the rebase target",
    "es_AR": "podés usar tanto ramas como referencias relativas (HEAD~) para especificar el objetivo del rebase",
    "pt_BR": "Você pode usar ou ramos ou referências relativas (HEAD~) para especificar o alvo do rebase",
    "de_DE": "Du kannst entweder Branches oder relative Ref-Angaben (z.B. HEAD~) benutzen, um das Ziel des Rebase anzugeben.",
    "fr_FR": "Vous pouvez utiliser soit les branches, soit les références relatives (HEAD~) pour spéficier la cible à rebaser",
    "zh_CN": "你可以使用 branch 或者是相对位置（HEAD~）來指定 rebase 的目标",
    "zh_TW": "你可以指定 branch 或者是相對位置（HEAD~）來表示 rebase 的目標"
  },
  "name": {
    "en_US": "Interactive Rebase Intro",
    "es_AR": "Introducción al rebase interactivo",
    "pt_BR": "Introdução ao rebase interativo",
    "de_DE": "Einführung Interactive Rebase",
    "ja"   : "インタラクティブrebase入門",
    "fr_FR": "Introduction à rebase",
    "zh_CN": "Rebase 交互命令介绍 ",
    "zh_TW": "介紹互動式的 rebase"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Interactive Rebase",
              "",
              "Git cherry-pick is great when you know which commits you want (_and_ you know their corresponding hashes) -- it's hard to beat the simplicity it provides.",
              "",
              "But what about the situation where you don't know what commits you want? Thankfully git has you covered there as well! We can use interactive rebasing for this -- it's the best way to review a series of commits you're about to rebase.",
              "",
              "Let's dive into the details..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "All interactive rebase means is using the `rebase` command with the `-i` option.",
              "",
              "If you include this option, git will open up a UI to show you which commits are about to be copied below the target of the rebase. It also shows their commit hashes and messages, which is great for getting a bearing on what's what.",
              "",
              "For \"real\" git, the UI window means opening up a file in a text editor like `vim`. For our purposes, I've built a small dialog window that behaves the same way."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "When the interactive rebase dialog opens, you have the ability to do 3 things:",
              "",
              "* You can reorder commits simply by changing their order in the UI (in our window this means dragging and dropping with the mouse).",
              "* You can choose to completely omit some commits. This is designated by `pick` -- toggling `pick` off means you want to drop the commit.",
              "* Lastly, you can squash commits. Unfortunately our levels don't support this for a few logistical reasons, so I'll skip over the details of this. Long story short, though -- it allows you to combine commits.",
              "",
              "Great! Let's see an example."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "When you hit the button, an interactive rebase window will appear. Reorder some commits around (or feel free to unpick some) and see the result!"
            ],
            "afterMarkdowns": [
              "Boom! Git copied down commits in the exact same way you specified through the UI"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, do an interactive rebase and achieve the order shown in the goal visualization. Remember you can always `undo` or `reset` to fix mistakes :D"
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
              "## Git Interactive Rebase",
              "",
              "Git cherry-pick est pratique quand vous savez exactement quels commits vous voulez (_et_ que vous connaissez leurs identifiants) -- il est difficile de battre la simplicité qu'il procure.",
              "",
              "Mais que faire quand vous ne connaissez pas les identifiants des commits ? Heureusement git a pensé à vous dans pour ce cas-là ! Nous pouvons utiliser un rebase interactif pour cela -- c'est la meilleure façon de reconsidérer une série de commits que vous vous apprêtez à rebaser.",
              "",
              "Allons un peu plus dans les détails ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Tout rebase interactif signifie utiliser la commande `rebase` avec l'option `-i`.",
              "",
              "Si vous mettez cette option, git va ouvrir une interface graphique pour vous montrer quels commits vont être copiés en dessous de la cible sur laquelle vous rebasez. Elle vous montre aussi les identifiants et commentaires des commits, ce qui est pratique pour s'orienter parmi les commits.",
              "",
              "Pour le \"vrai\" git, l'interface graphique correspond en fait à ouvrir un fichier dans un éditeur de texte comme `vim`. Pour notre exemple, j'ai construit une petite fenêtre de dialogue qui se comporte de la même façon."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Quand le rebase interactif s'ouvre, vous avez la possibilité de faire 3 choses :",
              "",
              "* Vous pouvez réarranger les commits simplement en changeant leur ordre dans l'interface graphique (dans notre fenêtre de dialogue, cela signifie déplacer les objets dedans avec la souris -- drag and drop).",
              "* Vous pouvez omettre certains commits. Cela est désigné par  `pick` -- cliquer sur `pick` désélectionne/resélectionne le commit.",
              "* Enfin, vous pouvez écraser des commits. Malheureusement notre niveau ne supporte pas cette option, nous allons donc sauter les détails concernant cette possibilité. Pour faire court, cela vous permet de mélanger des commits.",
              "",
              "Super ! Voyons un exemple."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Quand vous activez le bouton, une fenêtre de rebase interactif va s'ouvrir. Reordonnez quelques commits (ou supprimez-en certains) et regardez le résultat !"
            ],
            "afterMarkdowns": [
              "Boum ! Git a copié les commits de la même manière que vous l'aviez spécifié."
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour finir ce niveau, faites un rebase intractif et atteignez l'ordre indiqué dans le fenêtre d'objectif. Souvenez-vous que vous pouvez toujours exécuter les commandes `undo` ou `reset` pour réparer vos erreurs :D"
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
              "## git interactive rebase",
              "",
              "當你知道你要複製哪些 commit（而且你也知道他們所對應的 hash 值），那麼 `git cherry-pick`  很適合你。",
              "",
              "但是如果你不知道你要的是哪些 commit 呢？ 很幸運的是，git 也有考慮到這個問題喔！我們可以用互動式的 rebase 來做到，當你想要檢查你想要的 commit 的時候，這會是最好的方法。",
              "",
              "讓我們來看一下這些細節..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "互動式的 rebase 相當於使用 rebase 這個指令的時候，後面加上一個 `-i` 的選項。",
              "",
              "如果你有包含了這個選項，git 就會打開一個 UI，讓你知道說有哪些 commit 會被複製下來，它也會告訴你它們的 hash 值以及可以讓你知道它們是什麼的訊息。",
              "",
              "在\"實務上\"，UI 會利用一個編輯器（例如 vim）打開一個檔案，對於我們來說，我已經設計了一個有同樣功能的對話視窗。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "當互動式的 rebase 的對話視窗打開之後，你就可以做到三件事情：",
              "",
              "* 你可以藉由改變這些 commit 在 UI 的位置（在我們的視窗中，可以透過滑鼠去拖拉），來重新排序它們的順序。",
              "* 你可以選擇完全忽略掉某些 commit，可以用滑鼠按一下，使它變暗，就表示你要忽略掉該 commit。",
              "* 最後, 你可以把 commit 合併在一起，但基於某些理由，在我們的關卡裡面並沒有這個功能。",
              "",
              "太棒了！讓我們來看一個例子！"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "當你按下按鈕的時候，一個互動式的 rebase 的視窗就會跳出來，重新排序一些 commit（大膽忽略掉某些 commit），然後看一下結果吧！"
            ],
            "afterMarkdowns": [
              "看吧！ git 根據你所選擇的 commit，把它們複製了下來。"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這個關卡，使用互動式的 rebase，並且完成視覺化目標所表示 commit 的順序，記住！你可以經常使用 `undo` 或者 `reset` 來修正你的一些錯誤:D"
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
              "## Git Interactive Rebase",
              "",
              "如果你知道你所需要的提交对象(相应的hash), 那用Git cherry-pick 就非常方便了 -- 很难有简单的方式了",
              "",
              "但是如果你不清楚你想要的提交对象的hash呢? 幸好git 帮你想到了这一点, 我们可以利用交互rebase -- 如果你想衍合一系列的提交, 这就是最方便的方法了",
              "",
              "让我们看看细节.."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "交互式rebase 指的是rebase 后跟一个参数: `-i`",
              "",
              "如果你包含了这个选项, git 会开启一个UI 并 展示出将要被复制到目标的提交对象, 它也会显示它们的提交hash 和 信息",
              "",
              "真实的git , UI 窗口指的是在类似于vim的文本编辑器中打开一个文件. 考虑到我们的目标, 我建立了一个小型的会话窗口以完成相同的事儿."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "当rebase会话窗口打开时, 你能做3件事:",
              "",
              "* 你可以在UI中做 提交对象的排序(在我们的窗口中, 这意味着你可以拖放完成这点)",
              "* 你可以忽略某些提交 -- pick 会变暗",
              "* 最后, 你可以合并提交. 遗憾的是我们的课程不支持此功能.",
              "",
              "好! 看看例子"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "当你点这个按钮时, 一个交互式的rebase窗口就会出现. 对提交对象做个排序, 再看看结果"
            ],
            "afterMarkdowns": [
              "按照你指定的方式, git 克隆了这些提交"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成本节, 做一个交互式的rebase , 实现虚拟目标窗口中提示的提交顺序. 记住,  你随时都可以用`undo`, `reset`修复你的错误"
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
              "## git rebase interactivo",
              "",
              "git cherry-pick es genial cuando sabés cuáles commits querés (_y_ sabés sus hashes) -- es dificil superar la simpleza que provee.",
              "",
              "Pero ¿qué pasa cuando no sabés qué commits querés? Por suerte ¡git te cubre en esta situación, también! Podemos usar el rebase interactivo para esto -- es la mejor manera de revisar una serie de commits que estás por rebasear.",
              "",
              "Entremos en los detalles..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Todo rebase interactivo significa usar el comando `rebase` con la opción `-i`.",
              "",
              "Si incluís esta opción, git abrirá una UI para mostrarte qué commits están a punto de ser copiados sobre el objetivo del rebase. También muestra sus hashes y mensajes, que ayuda mucho para saber qué es cada commit.",
              "",
              "Para el git \"de verdad\", la UI signfica abrir un archivo en un editor de textos como `vim`. Para nuestro propósito, hice una pequeña interfaz que se comporta de ese mismo modo."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Cuando el diálogo de rebase interactivo se abre, tenés la capacidad de hacer 3 cosas:",
              "",
              "* Podés reordenar los commits con solamente cambiar su orden en la UI (en nuestra ventana, eso significa hacer drag & drop con el mouse).",
              "* Podés elegir ignorar completamente algunos commits. Esto se designa con `pick` -- no hacerle `pick` a algún commit significa que querés ignorarlo.",
              "* Finalmente, podés _squashear_ commits. Desafortunadamente, nuestros niveles no soportan esto por cuestiones logísticas, por lo que voy a ahorrarte los detalles. Haciéndola corta, te permite combinar varios commits en uno solo.",
              "",
              "¡Genial! Veamos un ejemplo."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Cuando apretes el botón, va a aparecer una ventana de rebase interactivo. Reordená los commits (sentite libre de ignorar alguno, también) ¡y mirá el resultado!"
            ],
            "afterMarkdowns": [
              "¡Boom! Git copió los commits exactamente de la misma manera que lo especificaste en la UI"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar el nivel, hacé un rebase interactivo y alcanzá el orden que se muestra en la visualización objetivo. Acordate que siempre podés hacer `undo` y `reset` para arreglar errores :D"
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
              "## Rebase Interativo do Git",
              "",
              "O cherry-pick é ótimo quando você sabe de antemão quais commits você quer (_e_ você sabe os hashes correspondentes) -- é difícil bater a simplicidade que ele oferece.",
              "",
              "Mas e quando você não sabe quais commits você quer? Felizmente o git pode te ajudar nesta situação também! Podemos usar o rebase interativo para isso -- trata-se da melhor forma de rever uma série de commits sobre os quais você está prestes a fazer um rebase.",
              "",
              "Mergulhemos nos detalhes..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "O rebase interativo é simplesmente o comando `rebase` com a opção `-i`.",
              "",
              "Se você incluir essa opção, o git abrirá uma interface para mostrar quais commits estão prestes a serem copiados abaixo do alvo do rebase. Ele também mostra os hashes e as mensagens dos commits, o que é ótimo para ter noção do que é o que.",
              "",
              "No git \"de verdade\", a interface nada mais é que um arquivo aberto em um editor de texto (por exemplo o `vim`). Para os nossos propósitos, eu montei uma pequena janela que se comporta da mesma forma."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Quando a janela de rebase interativo abrir, você pode fazer 3 coisas diferentes:",
              "",
              "* Você pode reordenar os commits simplesmente mudando sua ordem na interface (na nossa janela isso significa arrastar e soltar com o mouse).",
              "* Você pode escolher simplesmente omitir alguns commits. Para isso, clique no botão `pick` -- deixar o `pick` desligado significa que você quer descartar o commit.",
              "* Por fim, você pode \"esmagar\" (fazer squash) nos commits. Infelizmente, nosso tutorial não será capaz de cobrir essa funcionalidade por alguns motivos logísticos, então vamos pular os detalhes disto. Em resumo, no entanto, o squash permite que você combine commits.",
              "",
              "Ótimo! Vejamos um exemplo."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Quando você clicar o botão, uma janela de rebase interativo se abrirá. Reordene alguns commits da forma como você preferir (ou sinta-se livre para desmarcar o `pick` de alguns) e veja o resultado!"
            ],
            "afterMarkdowns": [
              "Boom! O Git copiou alguns commits exatamente da mesma forma que você os especificou na janela"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para finalizar este nível, faça um rebase interativo e obtenha a ordem mostrada na visualização do objetivo. Lembre-se que você pode usar os comandos `undo` ou `reset` para corrigir erros :D"
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
              "## Interaktiver Rebase",
              "",
              "Cherry-pick ist großartig wenn du genau weißt, welche Commits du willst (_und_ ihre jeweiligen Hashes kennst) -- es ist dann schwer an Einfachheit zu überbieten.",
              "",
              "Aber wie sieht es aus, wenn du die Commits nicht genau kennst, die du brauchst? Zum Glück bietet Git auch dafür eine Lösung an. Das können wir mit interaktivem Rebase machen -- die beste Art sich eine Serie von Commits in einem Rebase genau anzusehen.",
              "",
              "Schauen wir uns die Details an ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Interaktives Rebase bedeutet einfach nur, dass man dem `rebase` Befehl die Option `-i` hinzufügt.",
              "",
              "Wenn du das machst, zeigt Git dir jeden einzelnen Commit, der durch den Rebase kopiert werden würde. Es zeigt dir die Hashes und Kommentare, was gut ist um einen Überblick zu bekommen.",
              "",
              "In echtem Git besteht dieser Dialog daraus, die Commits in einem Text-Editor angezeigt zu bekommen. Für unsere Zwecke hab ich ein kleines Dialog-Fenster gebaut, dass sich ähnlich verhält."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wenn sich der Dialog für den interaktiven Rebase öffnet, kannst du drei Dinge tun:",
              "",
              "* Du kannst die Reihenfolge der Commits durch Ziehen und Ablegen ändern.",
              "* Du kannst Git sagen, einen Commit beim Rebase zu ignorieren -- im Dialog durch die Schaltfläche `pick` dargestellt.",
              "* Außerdem kannst du Commit zusammenfassen (squash). Leider wird das hier nicht unterstützt, aber in echtem Git fasst es Commits zu einem zusammen.",
              "",
              "Super! Schauen wir uns ein Beispiel an."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Wenn du die Schaltfläche anklickst wird sich der Rebase-Dialog öffnen. Veränder die Reihenfolge der Commits oder klick bei einigen auf `pick` und schau dir das Ergebnis an."
            ],
            "afterMarkdowns": [
              "Bämm! Git hat die Commits genau so kopiert, wie du es ausgewählt hast."
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um dieses Level zu schaffen mach einen interaktiven Rebase, um genau doie Reihenfolge zu erzeugen die im Ziel-Baum angezeigt wird. Denk daran, dass du jederzeit mit `undo` oder `reset` Fehler rückgängig machen kannst. :D"
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
              "## Git インタラクティブrebase",
              "",
              "どのコミットを操りたいか（そしてそれを指定するハッシュ）がわかる時にGit cherry-pickはとても便利で、その簡単さはとてもありがたいです。 ",
              "",
              "しかし、どのコミットを操りたいかがわからない時はどうでしょう？ありがたいことに、そんな時にぴったりのコマンドがgitにその備わっています。このためにgitのインタラクティブrebaseを使えます。rebaseしたい一連のコミットを一括で見るベストな方法です。",
              "",
              "具体的に見てみましょう..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "インタラクティブrebaseとは単に、`rebase`コマンドに`-i`オプションを合わせて使うことです。",
              "",
              "このオプションをつければ、gitがインタフェースを開き、どのコミットがrebase対象の下にコピーされるかを確認できます。それらのコミットのハッシュやメッセージも表示され、rebaseの概要を一眼で見るのに便利です。",
              "",
              "\"ホンモノ\"のgitでは、その「インターフェース」とは`vim`などのテキストエディタの中でファイルが開くだけです。ここでコンセプトを見せるために同じような動作をする小さなダイアログウィンドウを作りました。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "インタラクティブrebaseダイアログが開くと、３つの操作から選べます:",
              "",
              "* UIウィンドウのなかで順番を調整するだけでコミットの順番を変えられます（こちらのダイアログでは、マウスでドラッグアンドドロップで操作します）。",
              "* 特定のコミットを丸ごと除くこともできます。除きたいコミットを指定するには`pick`をオフにします。",
              "* 最後に、コミットを組み合わせられます。技術的に制限があるため、あいにくこちらのレベルには出てきませんがのでその詳細の説明を省きますが、短く言いますと、複数のコミットを一つにまとめることができる機能です。",
              "",
              "さて、例を見てみましょう。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "ボタンを押せば、インタラクティブrebaseウィンドウが現れます。コミットの順番を変更したり、`pick`を外したりしてみて、その結果を見てみましょう！"
            ],
            "afterMarkdowns": [
              "よっしゃー。gitがUIで指定されたようにコミットをコピーしました！"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルをクリアするにはインタラクティブrebaseを実行し、ゴールのビジュアライズに表示されている順番を実現しましょう。ミスがあれば`undo`や`reset`で修正できるのをお忘れなく。"
            ]
          }
        }
      ]
    }
  }
};
