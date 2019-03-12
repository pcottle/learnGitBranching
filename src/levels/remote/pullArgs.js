exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/bar\":{\"target\":\"C1\",\"id\":\"o/bar\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C2\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C5\":{\"parents\":[\"C3\",\"C4\"],\"id\":\"C5\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C6\":{\"parents\":[\"C2\",\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C3\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"bar\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git pull origin bar:foo;git pull origin master:side",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/bar\":{\"target\":\"C1\",\"id\":\"o/bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C3\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"bar\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Pull arguments",
    "zh_CN": "Git pull 的参数",
    "zh_TW": "pull 的參數",
    "es_AR": "Parámetros de pull",
    "pt_BR": "Parâmetros do pull",
    "gl"   : "Parámetros de pull",
    "de_DE": "Optionen für Pull",
    "ja"   : "Pullの引数",
    "fr_FR": "Arguments de pull",
    "ru_RU": "Аргументы для pull",
    "ko"   : "pull 인자들",
    "uk"   : "Аргументи pull"
  },
  "hint": {
    "en_US": "Remember that you can create new local branches with fetch/pull arguments",
    "zh_CN": "记住, 你可以通过 fetch/pull 创建本地分支",
    "zh_TW": "記住，你可以透過 fetch 以及 pull 來建立一個新的 local 的 branch",
    "es_AR": "Acordate de que podés crear nuevas ramas locales usando los parámetros de fetch/pull",
    "pt_BR": "Lembre-se que você pode criar novos ramos locais com parâmetros de fetch/pull",
    "gl"   : "Lémbrate que podes crear novas ramas locais con parámetros de fetch/pull",
    "de_DE": "Du kannst neue lokale Branches mittels fetch / pull erstellen",
    "ja"   : "Fetchとpullの引数を利用してローカルで新規ブランチを作成できるのをお忘れなく",
    "fr_FR": "Vous pouvez aussi créer une nouvelle branche locale avec les arguments de fetch/pull",
    "ru_RU": "Напоминаю, что новые ветки можно создавать и с помощью команд fetch/pull",
    "ko"   : "fetch/pull 과 인자들로 새 로컬 브랜치를 생성할수 있다는것을 기억하세요.",
    "uk"   : "Пам'ятай, що ти можеш створювати нові гілки, використовуючи fetch/pull з аргументами"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git pull arguments",
              "",
              "Now that you know pretty much *everything* there is to know about arguments for `git fetch` and `git push`, there's almost really nothing left to cover for git pull :)",
              "",
              "That's because git pull at the end of the day is *really* just shorthand for a fetch followed by merging in whatever was just fetched. You can think of it as running git fetch with the *same* arguments specified and then merging in *where* those commits ended up.",
              "",
              "This applies even when you use crazy-complicated arguments as well. Let's see some examples:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Here are some equivalent commands in git:",
              "",
              "`git pull  origin foo` is equal to:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "And...",
              "",
              "`git pull  origin bar~1:bugFix` is equal to:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "See? git pull is really just shorthand for fetch + merge, and all git pull cares about is where the commits ended up (the `destination` argument that it figures out during fetch).",
              "",
              "Lets see a demo:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "If we specify the place to fetch, everything happens as before with fetch but we merge in whatever was just fetched"
            ],
            "afterMarkdowns": [
              "See! by specifying `master` we downloaded commits onto `o/master` just as normal. Then we merged `o/master` to our currently checked out location which is *not* the local branch `master`. For this reason it can actually make sense to run git pull multiple times (with the same args) from different locations in order to update multiple branches."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Does it work with source and destination too? You bet! Let's see that:"
            ],
            "afterMarkdowns": [
              "Wow, that's a TON in one command. We created a new branch locally named `foo`, downloaded commits from remote's master onto that branch `foo`, and then merged that branch into our currently checked out branch `bar`. It's over 9000!!!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok to finish up, attain the state of the goal visualization. You'll need to download some commits, make some new branches, and merge those branches into other branches, but it shouldn't take many commands :P"
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
              "## Les arguments de git pull",
              "",
              "Maintenant que vous savez presque *tout* ce qu'il y a à savoir sur les arguments de `git fetch` et `git push`, il n'y a presque plus rien à vous apprendre sur git pull :)",
              "",
              "C'est parce que git pull est en fait *juste* un raccourci pour un fetch suivi d'un merge de tout ce qui vient d'être rapatrié. Vous pouvez vous représenter git pull comme un git fetch avec les *mêmes* arguments, suivi d'un merge qui aura lieu à l'endroit *exact* où ces commits seront arrivés.",
              "",
              "Cela fonctionne même quand vous utilisez des arguments très compliqués. Voyons quelques exemples :"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Voici quelques commandes équivalentes dans git :",
              "",
              "`git pull origin foo` est équivalent à :",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "Et :",
              "",
              "`git pull origin bar~1:bugFix` est équivalent à :",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "Vous voyez ? git pull est au fond un simple un raccourci pour fetch + merge, et tout ce qui lui importe est la destination des commits (l'argument `destination` qu'il utilise durant le fetch).",
              "",
              "Voyons une démonstration :"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Si nous précisons l'emplacement à rapatrier tout se passe comme précédemment, avec fetch, mais en sus nous fusionnons tout ce qui a été rapatrié."
            ],
            "afterMarkdowns": [
              "Vu ? En précisant `master` nous avons téléchargé les commits dans `o/master` comme d'habitude. Puis nous avons fusionné `o/master` avec là où nous sommes, *sans nous soucier* de la branche courante."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Cela fonctionne-t-il aussi bien avec une source et une destination ? Et oui ! Voyons cela :"
            ],
            "afterMarkdowns": [
              "Wow, INCROYABLE tout ce que nous avons fait en une commande. Nous avons créé une branche locale nommée `foo`, téléchargé les commits depuis la branche master distante dans `foo`, et ensuite fusionné cette branche dans notre branche actuelle de travail (checkoutée) `bar` !!!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, pour finir ce niveau reproduisez l'état de la fenêtre Objectif. Vous aurez besoin de télécharger quelques commits, de créer des branches et de les fusionner dans d'autres branches, mais cela ne devrait pas utiliser trop de commandes :P"
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
              "## Parámetros de git pull",
              "",
              "Ahora que sabés prácticamente *todo* lo que hay que saber sobre los parámetros de `git fetch` y `git push`, casi que no queda nada para cubrir de git pull :)",
              "",
              "Eso es porque git pull es simplemente un atajo para hacer un fetch seguido de un merge. Podés pensarlo como correr git fetch con los *mismos* parámetros, y después mergear aquello a donde esos commits hayan ido a parar.",
              "",
              "Esto aplica incluso cuando usás parámetros hiper-rebuscados. Veamos algunos ejemplos:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Estos son algunos comandos equivalentes de git:",
              "",
              "`git pull  origin foo` equivale a:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "Y...",
              "",
              "`git pull  origin bar~1:bugFix` equivale a:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "¿Ves? git pull es simplemente un atajo para un fetch + merge, y todo lo que le importa a git pull es dónde terminaron esos commits (el parámetro `destino` que determina durante el fetch).",
              "",
              "Veamos una demostración:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Si especificamos el lugar del que hacer fetch, todo ocurre como antes, pero sólo mergeamos lo que se fetcheó"
            ],
            "afterMarkdowns": [
              "¡Ves! Especificando `master` bajamos los commits a `o/master` como siempre. Después mergeamos `o/master` a nuestra rama actual, *sin importar* qué había en nuestra copia de trabajo."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Esto funciona con origen y destino, también? ¡Más vale! Veámoslo:"
            ],
            "afterMarkdowns": [
              "Wow, eso es un MONTÓN en un único comando. Creamos una nueva rama local llamada `foo`, descargamos los commits del master del remoto a esta rama `foo`, y después mezclamos esa rama a nuestra rama actual `bar`. ¡¡¡Supera los 9000!!!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "OK: para terminar, alcanzá el estado del objetivo. Vas a necesitar descargar algunos commits, crear algunas ramas nuevas, y mergear esas ramas junto con otras, pero no debería llevar demasiados comandos :P"
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
              "## Parâmetros do git pull",
              "",
              "Agora que você sabe praticamente *tudo* que há para saber sobre parâmetros do `git fetch` e `git push`, não há praticamente nada a se abordar a respeito do  git pull :)",
              "",
              "Isso é porque o git pull no final das contas é *realmente* apenas um atalho para um fetch seguido de um merge em seja lá o que acabou de ser baixado. Você pode pensar nele como rodar o git fetch recebendo os *mesmos* argumentos, seguido de um merge no lugar *onde* esses commits foram parar.",
              "",
              "Isso se aplica mesmo no caso de argumentos loucamente complicados. Vejamos alguns exemplos:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Aqui estão alguns comandos que são equivalente para o Git:",
              "",
              "`git pull  origin foo` é igual a:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "E...",
              "",
              "`git pull  origin bar~1:bugFix` é igual a:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "Viu? O git pull é realmente um atalho para fetch + merge, e tudo com o que o git pull se importa é com onde os commits foram parar (o parâmetro de `destino` que ele descobre durante o fetch).",
              "",
              "Vejamos uma demonstração:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Se especificarmos o lugar onde fazer o fetch, tudo acontece como antes com o fetch, mas fazemos o merge naquilo que acabou de ser baixado"
            ],
            "afterMarkdowns": [
              "Veja! Especificando `master` nós baixamos commits em `o/master` como sempre. Então fizemos um merge de `o/master` com o lugar onde estamos, *independente* daquilo que está atualmente em checkout."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Isso também funciona com origem e destino especificados? Sim, você acertou! Vejamos:"
            ],
            "afterMarkdowns": [
              "Wow, isso é MUITA coisa em um comando só. Nós criamos um novo ramo local chamado `foo`, baixamos commits do master remoto nesse ramo `foo`, e então fizemos um merge dele com o ramo atualmente em checkout, `bar`."
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, para terminar, obtenha o estado da visualização do objetivo. Você vai precisar baixar alguns commits, criar novos ramos, e fazer merge de ramos em outros ramos, mas não deve precisar de muitos comandos para isso :P"
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
              "## Parámetros de git pull",
              "",
              "Agora que sabes prácticamente *todo* o que hai que saber sobre os parámetros de `git fetch` e `git push`, casi que non queda nada para cubrir os de git pull :D",
              "",
              "Eso é porque git pull é sinxelamente un atallo para facer un fetch seguido dun merge. Podes pensalo como executar git fetch cos *mesmos* parámetros, e logo mesturar aquelo onde esos commits houberan ido ficar.",
              "",
              "Esto aplica incluso cando usas parámetros hiper-complexos. Vexamos algúns exemplos:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Estos son algúns comandos equivalentes de git:",
              "",
              "`git pull  origin foo` equivale a:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "E...",
              "",
              "`git pull  origin bar~1:bugFix` equivale a:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "¿Ves? git pull é sinxelamente un atallo para un fetch + merge, e todo o que lle importa a git pull é ónde terminaron eses commits (o parámetro `destino` que indícase durante o fetch).",
              "",
              "Vexamos unha demostración:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Se especificamos o lugar do que facer o fetch, todo ocorre coma antes, pero só mesturamos o que se descargou"
            ],
            "afterMarkdowns": [
              "¡Ves! Indicando `master` baixamos os commits á `o/master` coma sempre. Despois mesturamos `o/master` á nosa rama actual, *sen importar* qué tiñamos na nos copia de traballo."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Esto funciona co orixe e o destino, tamén? ¡Máis lle vale! Vexámolo:"
            ],
            "afterMarkdowns": [
              "Wow, eso es unha CHEA nun único comando. Creamos unha nova rama local chamada `foo`, descargamos os commits do master do remoto a esta rama `foo`, e logo mesturamos esa rama á nosa rama actual `bar`. ¡¡¡Supera os 9000!!!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "OK: para rematar, alcanza o estado do obxectivo. Vase necesitar descargar algúns commits, crear algunhas ramas novas, e mesturar esas ramas xunto con outras, pero non debería levar demasiados domandos :P"
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
              "## git pull 的參數",
              "",
              "現在你已經知道關於 `git fetch` 以及 `git push` 的*任何參數*，但是我們還可以再聊聊 `git pull`:)",
              "",
              "那是因為 `git pull` 到目前為止*的確*只是表示 fetch 之後再 merge 所 fetch 的 commit，你可以把它想成，當使用 `git fetch` 時使用*一樣*的參數，之後再從 fetch 下來的 commit *所放置*的位置做 merge。",
              "",
              "這同樣也適用於當你指定相當複雜的參數，讓我們來看一些例子："
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "對於 git 來說，有一些意義一樣的指令：",
              "",
              "`git pull  origin foo` 相當於：",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "而且...",
              "",
              "`git pull  origin bar~1:bugFix` 相當於：",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "看吧？`git pull` 真的就只是表示 fetch 跟 merge 的一個簡化後的指令，而且 `git pull` 所根據的是這些 commit 要放置的位置（在 fetch 的時候所指定的`destination`）。",
              "",
              "讓我們來看一個例子："
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果我們在 fetch 的時候有指定`位置`的話，跟之前一樣，fetch 所做的事情沒有變，但是我們會 merge 我們剛剛所 fetch 的該`位置`的commit。"
            ],
            "afterMarkdowns": [
              "看吧！指定位置為 `master`，跟平常一樣，我們下載了 commit 並且放到 `o/master` 上，接著，我們會 merge `o/master` 到我們現在的位置，*不管*我們現在所 checkout 的位置在哪裡。"
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "他是不是也可以同時指定 source 以及 destination？你說對了啦！讓我們來看一下："
            ],
            "afterMarkdowns": [
                "哇！這個指令強而有力，我們在 local 建立了一個新的 `foo` branch，下載了 remote 的 `master` 的 commit，並且放到 local 的 `foo` branch，之後 merge `foo` branch 到我們目前所 checkout 的 `bar` branch。這實在是太超過了！！！"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這一關，達到視覺化目標的要求，你需要下載一些 commit，建立一些新的 branch，並且 merge 這些 branch 到其他的 branch 上面，這個關卡不需要打太多的指令:P"
            ]
          }
        }
      ]
    },
    "zh_CN":{
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git pull 参数",
              "",
              "既然你已经掌握关于 `git fetch` 和 `git push` 参数的方方面面了，关于 git pull 几乎没有什么可以讲的了 :)",
              "",
              "因为 git pull 到头来就是 fetch 后跟 merge 的缩写。你可以理解为用同样的参数执行 git fetch，然后再 merge 你所抓取到的提交记录。",
              "",
              "还可以和其它更复杂的参数一起使用, 来看一些例子:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "以下命令在 Git 中是等效的:",
              "",
              "`git pull origin foo` 相当于：",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "还有...",
              "",
              "`git pull origin bar~1:bugFix` 相当于：",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "看到了? git pull 实际上就是 fetch + merge 的缩写, git pull 唯一关注的是提交最终合并到哪里（也就是为 git fetch 所提供的 destination 参数）",
              "",
              "一起来看个例子吧："
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果我们指定要抓取的 place，所有的事情都会跟之前一样发生，只是增加了 merge 操作"
            ],
            "afterMarkdowns": [
              "看到了吧! 通过指定 `master` 我们更新了 `o/master`。然后将 `o/master` merge 到我们的检出位置，**无论**我们当前检出的位置是哪。"
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "pull 也可以用 source:destination 吗? 当然喽, 看看吧:"
            ],
            "afterMarkdowns": [
              " 哇, 这个命令做的事情真多。它先在本地创建了一个叫 `foo` 的分支，从远程仓库中的 master 分支中下载提交记录，并合并到 `foo`，然后再 merge 到我们的当前检出的分支 `bar` 上。操作够多的吧？！"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好啦, 该结束了！请按照目标窗口中的状态进行操作。你需要下载一些提交，然后创建一些新分支，再合并这些分支到其它分支, 但这用不了几个命令 :P "
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
              "## Optionen für Git Pull",
              "",
              "Da du jetzt so ziemlich *alles* kennst, was es an Optionen für `git fetch` und `git push` gibt, ist kaum noch etwas zu Optionen für `git pull` zu sagen. :)",
              "",
              "Das liegt daran, dass `git pull` letztendlich *wirklich* nur eine Abkürzuung für `fetch` gefolgt von einem `merge` von was auch immer gerade heruntergeladen wurde, ist. Denk es dir als ein `git fetch` mit denselben Optionen und einem anschließenden Merge.",
              "",
              "Das trifft sogar zu, wenn du völlig abgedrehte Optionen verwendest. Ein paar Beispiele:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Hier sind einige gleichwertige Befehle in Git:",
              "",
              "`git pull origin foo` ist dasselbe wie:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "Und ...",
              "",
              "`git pull origin bar~1:bugFix` ist dasselbe wie:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "Siehst du? `git pull` ist wirklich nur eine Abkürzung von `fetch` + `merge` und es interessiert sich nur dafür wo die Commits hin sollen (die \"Ziel\"-Option, die es beim `fetch` auswertet).",
              "",
              "Schauen wir uns eine Demonstration an:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Wenn wir den Ort, auf den das `fetch` ausgeführt werden soll, angeben, passiert alles so wie beim `git fetch` aber es wird direkt danach auch ein Merge ausgeführt."
            ],
            "afterMarkdowns": [
              "Siehst du? Da wir `master` angegeben haben sind die Commits in `o/master` heruntergeladen worden. Danach wurde `o/master` gemerged, egal was gerade ausgecheckt war."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Funktioniert das auch wenn man Quelle und Ziel angibt? Aber sicher! Das sehen wir hier:"
            ],
            "afterMarkdowns": [
              "Wow, das ist eine Menge in einem einzelnen Befehl. Wir haben lokal einen neuen Branch namens `foo` erstellt, die Commits vom `master` des Servers dorthin heruntergeladen und ihn danach in unseren aktuell ausgecheckten Commit `bar` gemerged."
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, um's zu Ende zu bringen versuch das Ziel aus der Zielgrafik zu erreichen. Du wirst einige Commits herunterladen, einige neue Branches anlegen und diese in andere mergen müssen, aber das sollte nicht allzuviele Befehle benötigen. :P"
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
              "## Аргументы для pull",
              "",
              "Аргументы для `git pull` не покажутся вам чем-то новым, учитывая, что вы уже знакомы с аргументами для `git fetch` и `git push` :)",
              "",
              "Как мы помним, `git pull` сначала выполняет `git fetch`, а следом сразу `git merge` с той веткой, в которую притянулись обновления командой fetch. Другими словами, это все равно, что выполнить git fetch с теми же аргументами, которые вы указали для pull, а затем выполнить git merge с веткой, указанной в аргументе <приемник> команды pull.",
              "",
              "Рассмотрим на примерах:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Вот примеры абсолютно эквивалентных команд в git:",
              "",
              "`git pull  origin foo` это то же самое, что сделать:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "И еще...",
              "",
              "`git pull  origin bar~1:bugFix` то же, что:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "Как видно, git pull используется, чтобы за одну команду выполнить fetch + merge.",
              "",
              "Посмотрим демонстрацию:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Здесь сначала выполнится fetch с аргументом указанным к pull, а merge выполняется с теми изменениями, которые будут скачаны командой fetch"
            ],
            "afterMarkdowns": [
              "Как видно, мы указали `master`, поэтому как обычно все обновления притянулись на ветку `o/master`. Затем мы слили (merge) обновленную ветку `o/master` с веткой, на которой мы находимся."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Будет ли это работать, если указать `<источник>` и `<приемник>`? Проверим:"
            ],
            "afterMarkdowns": [
              "Ого, сколько всего выполнено всего одной командой!. Мы создали новую ветку `foo` в локальном репозитории, скачали на неё изменения с ветки `master` удаленного репозитория, а затем слили эту ветку с веткой `bar`, на которой мы находились!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "В последнем упражнении необходимо привести дерево к аналогичному в примере. Нужно скачать несколько изменений, создать несколько новых веток, слить одни ветки в другие, но постарайтесь использовать как можно меньше команд. Удачи! :P"
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
              "## Git pull의 인자들",
              "",
              "`git fetch`와 `git push`의 인자들을 다 알았기 때문에, git pull에서 더 설명할게 사실 없습니다 :)",
              "",
              "git pull은 결국 merge가 따라오는 fetch 그 자체이기 때문이죠. git fetch와 *같은* 인자를 사용하며 커밋들을 *어디*로 merge되는지 알면 됩니다.",
              "",
              "정신나간것마냥-복잡한 인자들도 기본적으로는 똑같다고 보면 됩니다. 예시를 살펴봅시다:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "git에서 다음 명령어들은 같습니다:",
              "",
              "`git pull  origin foo` 는 다음과 같습니다:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "그리고...",
              "",
              "`git pull  origin bar~1:bugFix` 는 다음과 같습니다:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "보이죠? git pull은 그저 fetch + merge의 축양형일 뿐이에요, 그리고 git pull은 커밋들이 도착하는곳을 신경씁니다(fetch를 하며 지정된 `destination`인자의 위치로 merge가 수행됩니다).",
              "",
              "직접 확인해봅시다:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "place를 지정하면, 이전에 fecth를 하던때와 완전히 똑같이 진행되고 fetch한것을 병합합니다."
            ],
            "afterMarkdowns": [
              "보이죠! `master`를 지정해서 우리는 `o/master`에 평소처럼 커밋들을 내려받았습니다. 그다음 우리가 있는 곳으로 `o/master`를 병합했습니다 현재 체크아웃된 브랜치와 *상관없이* 말이죠"
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "source 와 destination 모두 적용될까요? 추측해보세요! 확인해봅시다:"
            ],
            "afterMarkdowns": [
              "이야, 명령어 하나에 많은게 일어나고있습니다. 로컬에 이름이 `foo`인 새 브랜치를 만들고, 원격 저장소의 master에서 이 브랜치 `foo`에 커밋들을 내려받습니다, 그후 그 브랜치를 우리가 현재 체크아웃한 브랜치 `bar`로 병합했습니다. 오오오!!!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "좋습니다 마무리하기 위해, 골 시각화와 같은 상태로 만들어 주세요. 커밋을 내려받고, 새 브랜치를 만들고, 그 브랜치들을 다른 브랜치로 병합해야 될겁니다, 하지만 명령어는 그렇게 많이 안써도 되죠 :P"
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
              "## Аргументи git pull",
              "",
              "Зараз, коли ти знаєш майже *все*, що можна знати про аргументи для `git fetch` і `git push`, дійсно майже нема чого розповідати про git pull :)",
              "",
              "Це тому, що git pull, зрештою, *просто* зручне об'єднання fetch і merge. Його можна собі уявляти як git fetch і git merge виконані з *однаковими* аргументами.",
              "",
              "Це працює незалежно від складності переданих аргументів. Розгляньмо:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ось декілька еквівалентних команд git:",
              "",
              "`git pull origin foo` це те саме, що й:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "А...",
              "",
              "`git pull origin bar~1:bugFix` -- це аналог:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "Бачиш? git pull -- це просто зручне скорочення для fetch + merge. А все, про що дбає git pull -- це те, куди в результаті підуть коміти (а про це йому говорить аргумент `destination`).",
              "",
              "Розгляньмо демонстрацію:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Якщо ми вказуємо місце призначення для fetch, fetch виконується як звичайно, але мердж відбудеться з тим, що ми щойно стягнули"
            ],
            "afterMarkdowns": [
              "От бачиш, вказавши `master`, ми звантажили коміти в `o/master`, як завжди. Потім змерджили `o/master` в поточну гілку."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Чи це працює також при вказанні `source` і `destination`? І не сумнівайся! Ось приклад:"
            ],
            "afterMarkdowns": [
              "Ого, стільки роботи однією командою. Ми створили локальну гілку з назвою `foo`, звантажили в неї коміти з віддаленого master, а потім змерджили `foo` в поточну гілку `bar`!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Добре, для завершення спробуй досягти стану репозиторію, показаного на візуалізації. Треба буде звантажити відсутні коміти, створити нові гілки і змерджити їх в інші гілки, але не надто великою кількістю команд! :P"
            ]
          }
        }
      ]
    }
  }
};
