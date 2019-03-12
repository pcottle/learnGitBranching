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
    "gl"   : "Podes usar ramas ou referencias relativas (HEAD~) para especificar o obxectivo do rebase",
    "de_DE": "Du kannst entweder Branches oder relative Ref-Angaben (z.B. HEAD~) benutzen, um das Ziel des Rebase anzugeben.",
    "fr_FR": "Vous pouvez utiliser soit les branches, soit les références relatives (HEAD~) pour spécifier la cible à rebaser",
    "zh_CN": "branch 或者是相对位置（HEAD~）都可以用來指定 rebase 的目标",
    "zh_TW": "你可以指定 branch 或者是相對位置（HEAD~）來表示 rebase 的目標",
    "ru_RU": "Можно использовать либо ветки, либо относительные ссылки (HEAD~), чтобы указать цель для Rebase",
    "ja"   : "リベースする対象の指定には、ブランチ名や相対リファレンス(HEAD~)が使えます",
    "ko"   : "리베이스할 타겟으로 브랜치나 상대 참조(HEAD~)를 사용할 수 있습니다",
    "uk"   : "ти можеш використовувати гілки чи відносні посилання (HEAD~) щоб вказувати ціль для rebase"
  },
  "name": {
    "en_US": "Interactive Rebase Intro",
    "es_AR": "Introducción al rebase interactivo",
    "pt_BR": "Introdução ao rebase interativo",
    "gl"   : "Introducción ó rebase interativo",
    "de_DE": "Einführung Interactive Rebase",
    "ja"   : "インタラクティブrebase入門",
    "fr_FR": "Introduction à rebase",
    "zh_CN": "交互式 rebase",
    "zh_TW": "介紹互動式的 rebase",
    "ru_RU": "Введение в интерактивный Rebase",
    "ko"   : "인터랙티브 리베이스 소개",
    "uk"   : "Знайомство з інтерактивним rebase"
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
              "Mais que faire quand vous ne connaissez pas les identifiants des commits ? Heureusement git a pensé à vous pour ce cas-là ! Nous pouvons utiliser un rebase interactif pour cela -- c'est la meilleure façon de reconsidérer une série de commits que vous vous apprêtez à rebaser.",
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
              "* Vous pouvez omettre certains commits. Cela est désigné par `pick` : cliquer sur `pick` désélectionne/resélectionne le commit.",
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
              "Pour finir ce niveau, faites un rebase interactif et atteignez l'ordre indiqué dans le fenêtre d'objectif. Souvenez-vous que vous pouvez toujours exécuter les commandes `undo` ou `reset` pour réparer vos erreurs :D"
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
              "## 交互式的 rebase",
              "",
              "当你知道你所需要的提交记录（**并且**还知道这些提交记录的哈希值）时, 用 cherry-pick 再好不过了 —— 没有比这更简单的方式了。",
              "",
              "但是如果你不清楚你想要的提交记录的哈希值呢? 幸好 Git 帮你想到了这一点, 我们可以利用交互式的 rebase —— 如果你想从一系列的提交记录中找到想要的记录, 这就是最好的方法了",
              "",
              "咱们具体来看一下……"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "交互式 rebase 指的是使用带参数 `--interactive` 的 rebase 命令, 简写为 `-i`",
              "",
              "如果你在命令后增加了这个选项, Git 会打开一个 UI 界面并列出将要被复制到目标分支的备选提交记录，它还会显示每个提交记录的哈希值和提交说明，提交说明有助于你理解这个提交进行了哪些更改。",
              "",
              "在实际使用时，所谓的 UI 窗口一般会在文本编辑器 —— 如 Vim —— 中打开一个文件。 考虑到课程的初衷，我弄了一个对话框来模拟这些操作。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "当 rebase UI界面打开时, 你能做3件事:",
              "",
              "* 调整提交记录的顺序（通过鼠标拖放来完成）",
              "* 删除你不想要的提交（通过切换 `pick` 的状态来完成，关闭就意味着你不想要这个提交记录）",
              "* 合并提交。 遗憾的是由于某种逻辑的原因，我们的课程不支持此功能，因此我不会详细介绍这个操作。简而言之，它允许你把多个提交记录合并成一个。",
              "",
              "接下来咱们看个实例"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "当你点击下面的按钮时，会出现一个交互对话框。对提交记录做个排序（当然你也可以删除某些提交），点击确定看结果"
            ],
            "afterMarkdowns": [
              "Git 严格按照你在对话框中指定的方式进行了复制。"
            ],
            "command": "git rebase -i HEAD~4",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要通过本关, 做一次交互式的 rebase，整理成目标窗口中的提交顺序。 记住，你随时都可以用 `undo`、`reset` 修正错误，这是不会记入步数的 :D"
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
    "gl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Rebase Interativo en Git",
              "",
              "Empregar cherry-pick é xenial cando coñeces qué commits queres (_e_ coñeces os seus códigos hash) -- é difícil mellorar a súa simplicidade.",
              "",
              "Pero ¿qué pasa cando non sabes qué commits son os que queres? Por sorte, ¡git cúbrete nesta situación tamén! Podemos empregar o rebase interactivo para esto -- é a mellor forma de revisar unha serie de commits que estás a rebasar.",
              "",
              "Mergullémonos nos detalles..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "O rebase interativo é o comando `rebase` coa opción `-i`.",
              "",
              "Se ti inclúes esta opción, o git abrirá unha interfaz para mostrar qué commits están hábiles para ser copiados sobre o obxectivo do rebase. Tamén amosa os seus códigos hash e mensaxes dos commits, o cal axuda moito para saber qué é cada commit.",
              "",
              "En git \"de verdade\", a interfaz significa abrir un arquivo de texto nun editor (por exemplo `vim`). Para os nosos propósitos, aquí aparecerá unha pequena ventá que se comporta do mesmo xeito."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Cando a xanela de rebase interativo abra, poderás facer 3 cousas distintas:",
              "",
              "* Podes reordenar os commits simplemente cambiando a súa orde na interface (na nosa ventá significa arrastrar e soltar os commits).",
              "* Podes escoller a opción de omitir algúns commits. Para iso, pincha no botón `pick` -- deixar o `pick` desligado significa que queres descartar o commit.",
              "* Ademáis, ti podes \"esmagar\" (fazer squash) nos commits. Tristemente, este tutorial non será capaz de cubrir esa funcionalidade por algúns motivos loxísticos, entón imos pulir algúns detalles ó respecto. Resumindo, o squash permite combinar commits.",
              "",
              "¡Xenial! Vexamos un exemplo."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Cando pinches o botón, unha ventá de rebase interativo abrirase. Reordena algúns commits da forma que ti prefieras (ou se o prefires desmarca o `pick` de algúns) e mira o seu resultado!"
            ],
            "afterMarkdowns": [
              "¡Veña! Git copiou algúns commits exatamente da mesma forma que o indicaches na ventá"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para finalizar este nivel, fai un rebase interativo e obteñaa a orde amosada na visualización do obxectivo. Lembra que podes usar os comandos `undo` ou `reset` para correxir erros :D"
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
              "Um dieses Level zu schaffen mach einen interaktiven Rebase, um genau die Reihenfolge zu erzeugen die im Ziel-Baum angezeigt wird. Denk daran, dass du jederzeit mit `undo` oder `reset` Fehler rückgängig machen kannst. :D"
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
              "どのコミットを操りたいか（そしてそれを指定するハッシュ）がわかる時に`git cherry-pick`はとても便利で、その簡単さはとてもありがたいです。 ",
              "",
              "しかし、どのコミットを操りたいかがわからない時はどうでしょう？ありがたいことに、そんな時にぴったりのコマンドがgitに備わっています。このためにgitのインタラクティブrebaseを使えます。rebaseしたい一連のコミットを一括で見るベストな方法です。",
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
              "* 最後に、コミットを組み合わせられます。技術的に制限があり再現できないのでその詳細な説明を省きますが、短く言いますと、複数のコミットを一つにまとめることができる機能です。",
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
    },
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Interactive Rebase",
              "",
              "Git cherry-pick прекрасен, когда точно известно, какие коммиты нужны (и известны их точные хеши)",
              "",
              "Но как быть в случае, когда точно не известно какие коммиты нужны? К счастью, Git позаботился о таких ситуациях! Можно использовать интерактивный rebase для этого - лучший способ отобрать набор коммитов для rebase.",
              "",
              "Углубимся в детали."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Всё, что нужно для интерактивного rebase - это опция `-i`",
              "",
              "Если добавить эту опцию, Git откроет интерфейс просмотра того, какие коммиты готовы к копированию на цель rebase (target). Также показываются хеши коммитов и комментарии к ним, так что можно легко понять что к чему.",
              "",
              "Для \"реального\" Git, этот интерфейс означает просто открытие файла в редакторе типа vim. Для этой обучалки, я сделал небольшое диалоговое окно, которое по сути делает то же, что и редактор."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "После открытия окна интерактивного rebase есть три варианта для каждого коммита:",
              "",
              "* Можно сменить положение коммита по порядку, переставив строчку с ним в редакторе (у нас в окошке строку с коммитом можно перенести просто мышкой).",
              "* Можно \"выкинуть\" коммит из ребейза. Для этого есть `pick` - переключение его означает, что нужно выкинуть коммит.",
              "* Наконец, можно соединить коммиты. В этом уровне игры у нас не реализована эта возможность, но, вкратце, при помощи этой функции можно объединять изменения двух коммитов.",
              "",
              "Ну что ж, посмотрим на примеры!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "После нажатия на эту кнопку появится окно интерактивного rebase. Переставь несколько коммитов (или удали кое-какие) и посмотри, что получится в итоге!"
            ],
            "afterMarkdowns": [
              "Бах! Git скопировал коммиты в точности так, как было указано через интерфейс!"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы пройти этот уровень, переставь коммиты при помощи интерактивного rebase в таком порядке, как указано на визуализации. На всякий случай, помни, что всегда можно исправить ошибку, вызвав команду undo или reset."
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
              "## Git 인터렉티브 리베이스(Interactive Rebase)",
              "",
              "Git 체리-픽은 여러분이 원하는 커밋이 무엇인지 알때(각각의 해시값도) 아주 유용합니다 -- 체리-픽이 제공하는 간단함은 아주 매력적입니다.",
              "",
              "하지만 원하는 커밋을 모르는 상황에는 어쩌죠? 고맙게도 git은 이런상황에 대한 대안이 있습니다. 우리는 이럴 때 인터렉티브 리베이스를 사용하면됩니다 -- 리베이스할 일련의 커밋들을 검토할 수 있는 가장 좋은 방법입니다.",
              "",
              "자세히 알아보죠..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "인터렉티브 리베이스가 의미하는 뜻은 `rebase` 명령어를 사용할 때 `-i` 옵션을 같이 사용한다는 것입니다.",
              "",
              "이 옵션을 추가하면, git은 리베이스의 목적지가 되는 곳 아래에 복사될 커밋들을 보여주는 UI를 띄울것 입니다. 각 커밋을 구분할 수 있는 각각의 해시들과 메시지도 보여줍니다.",
              "",
              "\"실제\"git 에서는 UI창을 띄우는것 대신에 `vim`과 같은 텍스트 편집기에서 파일을 엽니다. 저희는 배우는것이 목적이기에 같은 역할을 하는 작은 대화창을 만들어서 대신했습니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "인터렉티브 리베이스 대화창이 열리면, 3가지를 할 수 있습니다:",
              "",
              "* 적용할 커밋들의 순서를 UI를 통해 바꿀수 있습니다(여기서는 마우스 드래그앤 드롭으로 가능합니다)",
              "* 원하지 않는 커밋들을 뺄 수 있습니다. 이것은 `pick`을 이용해 지정할 수 있습니다(여기서는 `pick`토글 버튼을 끄는것으로 가능합니다)",
              "* 마지막으로, 커밋을 스쿼시(squash)할 수 있습니다. 불행히도 저희 레벨은 몇개의 논리적 문제들 때문에 지원을 하지 않습니다. 이거에 대해서는 넘어가겠습니다. 요약하자면 커밋을 합칠 수 있습니다",
              "",
              "자! 예시를 확인해 봅시다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "버튼을 누르면 인터렉티브 리베이스 대화창이 뜰것 입니다. 커밋들의 순서를 바꿔보고(커밋을 빼 봐도 됩니다) 결과를 확인해봅시다!"
            ],
            "afterMarkdowns": [
              "Boom! Git이 UI를 통해 명시한 그대로 커밋들을 복사했습니다."
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이번 레벨을 통과하기 위해서 goal에 나타난 순서대로 만들기 위해 인터렉티브 리베이스를 사용해봅시다. `undo`와 `reset`을 통해 했던 실수들은 되돌릴 수 있습니다 :D"
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
              "## Інтерактивний Rebase",
              "",
              "Git cherry-pick зручно користуватись, коли ти знаєш які коміти тобі потрібні (_і_ ти знаєш їхні хеші) -- важко вигадати щось простіше.",
              "",
              "Але що робити в ситуації, коли ти не знаєш які коміти потрібні? На щастя git може впоратись і з цим! Для цього випадку використовують інтерактивний rebase -- це найкращий спосіб перевірити серію комітів які потрібно заребейсити.",
              "",
              "Розглянемо це детальніше..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Інтерактивний rebase це насправді команда  `rebase` з опцією `-i`.",
              "",
              "Якщо додати цю опцію, git відкриє діалог в якому покаже які коміти будуть скопійовані до кінцевого призначення. Він також покаже хеші комітів та їхні повідомлення, що допоможе розібратися що й до чого.",
              "",
              "В \"справжньому\" git, замість UI вікна відкриється файл в сконфігурованому текстовому редакторі, можливо `vim`. Для цього туторіалу я створив невеличке діалогове вікно що поводиться приблизно так само."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Коли відкриється вікно інтерактивного rebase ти можеш зробити три речі:",
              "",
              "* Ти можеш переставити коміти між собою просто змінивши їх порядок в діалозі (в нашому вікні ти зможеш перетягнути їх мишкою).",
              "* Ти можеш повністю пропустити якісь коміти. В туторіалі потрібно вимкнути опцію `pick`, але в справжньому гіт потрібно просто видалити відповідний рядок.",
              "* Також можна розчавити (squash) якісь коміти. На жаль наш туторіал не підтримує цю фічу (так як ми не підтримуємо роботу з файлами), але це дуже зручна опція в справжньому гіт. За її допомогою можна декілька різніх комітів об’єднати в один.",
              "",
              "Чудово! Розгляньмо це на прикладі"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Коли ти натиснеш кнопку, відкриється вікно інтерактивного rebase. Перестав якісь коміти (можеш пропустити якісь якщо хочеш), і подивись що вийде!"
            ],
            "afterMarkdowns": [
              "Ка-бум! Git cкопіював коміти відповідно до того що було вказано в UI"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти цей рівень за допомогою інтерактивного rebase впорядкуй коміти як показано на візуалізації. Пам’ятай що ти завжди можеш використати `undo` чи `reset` щоб виправити помилку :D"
            ]
          }
        }
      ]
    }
  }
};
