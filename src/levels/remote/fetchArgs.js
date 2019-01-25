exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C7\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C3\",\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C6\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git fetch origin master~1:foo;git fetch origin foo:master;git checkout foo;git merge master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"C1\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C6\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Fetch arguments",
    "fr_FR": "Arguments de fetch",
    "zh_CN": "Git fetch 的参数",
    "zh_TW": "fetch 的參數",
    "es_AR": "Parámetros de fetch",
    "pt_BR": "Parâmetros do fetch",
    "gl"   : "Parámetros de fetch",
    "de_DE": "Optionen für Fetch",
    "ja"   : "Fetchの引数",
    "ru_RU": "Аргументы для fetch",
    "ko"   : "Fetch의 인자들",
    "uk"   : "Аргументи для fetch"
  },
  "hint": {
    "en_US": "Pay attention how the commit ids may have swapped! You can read slides again with \"help level\"",
    "fr_FR": "Faites attention à la façon dont les ids des commits ont été intervertis ! Vous pouvez lire une nouvelle fois les slides avec \"help level\"",
    "zh_CN": "注意下提交对象的 id 是如何交换的! 你可以通过 `help level` 重新阅读本关卡的所有对话框!",
    "zh_TW": "注意 commit 的 id 是怎麼被交換的！你可以透過 `help level` 來閱讀對話視窗！",
    "es_AR": "¡Prestá atención a cómo podrían haberse invertido los ids de los commits! Podés volver a leer toda la lección usando \"help level\"",
    "pt_BR": "Preste atenção em como os identificadores dos commits podem ter trocado! Você pode ler os slides novamente com \"help level\"",
    "gl"   : "Preste atención en como poderían invertirse os ids dos commits! Podes volver ler toda a lección usando \"help level\"",
    "de_DE": "Beachte wie die Commit IDs getauscht wurden! Du kannst den Einführungsdialog mit \"help level\" erneut anzeigen",
    "ja"   : "コミットIDの入れ替わりに注意！スライドを復習するには`help level`を実行",
    "ru_RU": "Обратите внимание на то, как номера коммитов могут меняться! Вы можете прочесть слайды вновь, воспользовавшись командой \"help level\"",
    "ko"   : "커밋 ID가 바뀔수도있으니 주의하세요! \"help level\"을 입력하면 슬라이드들을 다시 읽어볼수 있습니다.",
    "uk"   : "Зверни увагу на те, що номери комітів можуть змінюватися! Слайди уроку можна переглянути ще раз командою \"help level\""
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git fetch arguments",
              "",
              "So we've just learned all about git push arguments, this cool `<place>` parameter, and even colon refspecs (`<source>:<destination>`). Can we use all this knowledge for `git fetch` as well?",
              "",
              "You betcha! The arguments for `git fetch` are actually *very, very* similar to those for `git push`. It's the same type of concepts but just applied in the opposite direction (since now you are downloading commits rather than uploading).",
              "",
              "Let's go over the concepts one at a time..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### The `<place>` parameter",
              "",
              "If you specify a place with git fetch like in the following command:",
              "",
              "`git fetch origin foo`",
              "",
              "Git will go to the `foo` branch on the remote, grab all the commits that aren't present locally, and then plop them down onto the `o/foo` branch locally.",
              "",
              "Let's see this in action (just as a refresher)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "By specifying a place..."
            ],
            "afterMarkdowns": [
              "We download only the commits from `foo` and place them on `o/foo`"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "You might be wondering -- why did git plop those commits onto the `o/foo` remote branch rather than just plopping them onto my local `foo` branch? I thought the `<place>` parameter is a place that exists both locally and on the remote?",
              "",
              "Well git makes a special exception in this case because you might have work on the `foo` branch that you don't want to mess up!! This ties into the earlier lesson on `git fetch` -- it doesn't update your local non-remote branches, it only downloads the commits (so you can inspect / merge them later).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Well in that case, what happens if I explicitly define both the source and destination with `<source>:<destination>`?\"",
              "",
              "If you feel passionate enough to fetch commits *directly* onto a local branch, then yes you can specify that with a colon refspec. You can't fetch commits onto a branch that is checked out, but otherwise git will allow this.",
              "",
              "Here is the only catch though -- `<source>` is now a place on the *remote* and `<destination>` is a *local* place to put those commits. It's the exact opposite of git push, and that makes sense since we are transferring data in the opposite direction!",
              "",
              "That being said, developers rarely do this in practice. I'm introducing it mainly as a way to conceptualize how `fetch` and `push` are quite similar, just in opposite directions."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see this craziness in action:"
            ],
            "afterMarkdowns": [
              "Wow! See, git resolved `foo~1` as a place on the origin and then downloaded those commits to `bar` (which was a local branch). Notice how `foo` and `o/foo` were not updated since we specified a destination."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What if the destination doesn't exist before I run the command? Let's see the last slide but without `bar` existing beforehand."
            ],
            "afterMarkdowns": [
              "See, it's JUST like git push. Git made the destination locally before fetching, just like git will make the destination on remote before pushing (if it doesn't exist)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "No args?",
              "",
              "If `git fetch` receives no arguments, it just downloads all the commits from the remote onto all the remote branches..."
            ],
            "afterMarkdowns": [
              "Pretty simple, but worth going over just once."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, enough talking! To finish this level, fetch just the specified commits in the goal visualization. Get fancy with those commands!",
              "",
              "You will have to specify the source and destination for both fetch commands. Pay attention to the goal visualization since the IDs may be switched around!"
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
              "## Les arguments de git fetch",
              "",
              "Nous savons maintenant tout ce qu'il y a à savoir sur les arguments de git push, y compris le paramètre `<place>` et la ponctuation pour refspecs (`<source>:<destination>`). Pouvons-nous utiliser ces connaissances avec `git fetch` également ?",
              "",
              "Bien sûr ! Les arguments de `git fetch` sont en fait *très, très* similaires à ceux de `git push`. Il s'agit des mêmes concepts mais simplement appliqués dans le sens opposé (puisque maintenant vous récupérez des commits plutôt que de les envoyer).",
              "",
              "Voyons ces concepts un par un..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Le paramètre `<place>`",
              "",
              "Si vous spécifiez un emplacement à git fetch, comme dans la commande suivante :",
              "",
              "`git fetch origin foo`",
              "",
              "Git va aller à la branche distante `foo`, récupérer tous les commits qui ne sont pas présents localement, puis les rapatrier dans la branche locale `o/foo`.",
              "",
              "Voyons cela en action (juste pour réviser)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "En spécifiant un emplacement..."
            ],
            "afterMarkdowns": [
              "Nous téléchargeons uniquement les commits de `foo` et les plaçons dans `o/foo`."
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Vous vous posez peut-être la question : pourquoi git a-t-il fait apparaître ces commits dans la branche distante `o/foo` plutôt que les placer directement dans ma branche locale `foo` ? Je croyais que le paramètre `<place>` était un emplacement qui existait à la fois localement et sur le dépôt distant ?",
              "",
              "En fait git fait une exception dans ce cas parce que vous pourriez avoir du travail en cours dans la branche `foo` que vous ne voulez pas écraser !! Cela provient de ce que nous avions vu dans la leçon précédente sur `git fetch` : cette commande ne met pas à jour vos branches locales, elle télécharge uniquement les commits (pour que vous puissiez les inspecter et/ou les fusionner plus tard).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Bon, mais dans ce cas, que se passe-t-il si je spécifie explicitement la source et la destination avec `<source>:<destination>` ?\"",
              "",
              "Si vous vous sentez assez déterminé pour rapatrier (fetch) des commits *directement* dans votre branche locale, alors oui vous pouvez préciser cela avec la notation refspec. Vous ne pouvez cependant pas rapatrier les commits dans la branche courante.",
              "",
              "Il y a un petit piège cependant : dans ce cas précis `<source>` est l'emplacement sur le dépôt *distant* et `<destination>` l'emplacement sur le dépôt *local* où seront placés ces commits. C'est l'exact opposé de git push, et cela se tient puisque nous transférons des données dans le sens opposée !",
              "",
              "Cela dit, les développeurs utilisent rarement cette syntaxe en pratique. Je l'introduis principalement pour concrétiser le fait que `fetch` et `push` sont très similaires, fonctionnant simplement dans des sens opposées."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons ce délire en action :"
            ],
            "afterMarkdowns": [
              "Wow ! Vous voyez, git a résolu `foo~1` comme un emplacement sur origin et a ensuite téléchargé les commits dans `bar` (qui était une branche locale). Remarquez aussi que `foo` et `o/foo` n'ont pas été mises à jour puisque nous avons spécifié une destination."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Que se passe-t-il si l'emplacement n'existe pas avant que j'exécute la commande ? Voyons cela dans ce dernier slide, en nous mettant dans la situation où `bar` n'existe pas encore."
            ],
            "afterMarkdowns": [
              "Vous voyez, c'est COMME un git push. Git a créé la destination localement avant le fetch, exactement comme avec push il crée au préalable la destination sur le dépôt distant (si elle n'existe pas)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Pas d'arguments ?",
              "",
              "Si `git fetch` ne reçoit pas d'arguments, cela télécharge simplement tous les commits du dépôt distant au sein de toutes les branches distantes..."
            ],
            "afterMarkdowns": [
              "Assez simple, mais ce n'était pas inutile de voir en action."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, assez parlé ! Pour finir ce niveau, faites simplement un fetch des commits indiqués dans la fenêtre de visualisation de l'objectif. Faites-vous plaisir !",
              "",
              "Vous devrez préciser la source et la destination pour les deux commandes fetch. Faites attention à l'objectif puisque les IDs peuvent avoir été intervertis !"
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
              "## Parámetros de git fetch",
              "",
              "Entonces, recién aprendimos todo sobre los parámetros de push, este parámetro `<lugar>` copado, e incluso las referencias separadas por dos puntos (`<origen>:<destino>`). ¿Podremos usar todo ese conocimiento para `git fetch`, también?",
              "",
              "¡Dalo por hecho! Los parámetros para `git fetch` son realmente *muy, muy* similares a los de `git push`. Es el mismo tipo de conceptos, pero aplicados en la dirección opuesta (dado que ahora estás bajando commits en lugar de subirlos).",
              "",
              "Veamos los conceptos de a uno a la vez..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### El parámetro `<lugar>`",
              "",
              "Si especificás un lugar con git fetch como en el comando siguiente:",
              "",
              "`git fetch origin foo`",
              "",
              "Git va a ir a la rama `foo` en el remoto, va a traer todos los commits que no estén presentes localmente, y luego los aplicará sobre la rama `o/foo` localmente.",
              "",
              "Veámoslo en acción (refresquemos el concepto)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Especificando un lugar..."
            ],
            "afterMarkdowns": [
              "Sólo bajamos los commits de `foo` y los ubicamos en `o/foo`"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Te podrás estar preguntando \"¿Por qué git aplicó esos commits sobre la rama `origin/foo` en lugar de aplicarlos sobre la rama `foo` local? Pensé que el parámetro `<lugar>` era un lugar que existía tanto local como remotamente\"",
              "",
              "Bueno, git hace una excepción especial en este caso, porque vos podrías tener trabajo en la rama `foo` que no quieras mezclar. Esto refiere a la lección anterior sobre `git fetch` - no actualiza tus ramas locales no-remotas, sólo descarga los commits (para que pueadas verlos o mergearlos después).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Bueno, y, en ese caso, ¿qué pasa si explícitamente defino el origen y destino con `<origen>:<destino>`?\"",
              "",
              "Si te sentís lo suficientemente seguro como para traer commits *directamente* a una rama local, entonces, sí, podés especificarlo usando una referencia con dos puntos. No podés traer commits a una rama que tengas checkouteada, pero en cualquier otro caso git te lo va a permitir.",
              "",
              "Este es el único problemita, igual: `<origen>` es ahora un lugar en el *remoto*, y `<destino>` es un lugar *local* en donde poner esos commits. Es exactamente lo opuesto a git push, y eso tiene sentido dado que ¡estamos transfiriendo los datos en la dirección opuesta!",
              "",
              "Habiendo dicho esto, dificilmente alguien use esto en la práctica. Lo estoy presentando principalmente como un modo de conceptualizar que `fetch` y `push` son bastante similares, sólo que en direcciones opuestas."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos esta locura en acción:"
            ],
            "afterMarkdowns": [
              "¡Wow! Mirá: git resolvió `foo~1` como un lugar en el origin y bajó esos commits a `bar` (que era una rama local). Notá como `foo` y `o/foo` no fueron actualizados, dado que especificamos un destino."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué pasa si el destino no existe antes de que corra este comando? Veamos el último ejemplo pero sin que `bar` exista de antemano."
            ],
            "afterMarkdowns": [
              "Mirá: es IGUAL que git push. Git creó el destino localmente antes de hacer el fetch, tal como git creará el destino en el remoto antes de pushear (si no existiera)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Sin argumentos?",
              "",
              "Si `git fetch` no recibe ningún argumento, simplemente descarga todos los commits del remoto a todas las ramas remotas..."
            ],
            "afterMarkdowns": [
              "Bastante simple, pero vale la pena verlo al menos una vez."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Bueno, demasiada charla. Para completar este nivel, fetcheáte sólo los commits especificados en la visualización del objetivo. ¡Amigate con esos comandos!",
              "",
              "Vas a tener que especificar el origen y el destino para ambos comandos fetch. Prestá atención al objetivo dado que ¡los IDs pueden estar invertidos!"
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
              "## Parâmetros do git fetch",
              "",
              "Então acabamos de aprender tudo sobre os parâmetros do git push, inclusive sobre esse parâmetro bacana chamado `<lugar>`, e até mesmo sobre colon refspecs (`<origem>:<destino>`). Será que poderíamos aplicar todo esse conhecimento também ao `git fetch`?",
              "",
              "Você adivinhou! Os parâmetros do `git fetch` são na verdade *muito, muito* similares aos do `git push`. Trata-se do mesmo tipo de conceito, só que aplicado na direção oposta (já que agora é um download em vez de um upload).",
              "",
              "Vamos aos conceitos um por vez..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### O parâmetro `<lugar>`",
              "",
              "Se você passar um lugar ao git fetch, como no seguinte comando:",
              "",
              "`git fetch origin foo`",
              "",
              "O Git vai ao ramo remoto `foo` e pega todos os commits que não estão presentes localmente, jogando-os no ramo local `o/foo`.",
              "",
              "Vejamo-lo em ação (só para refrescar a memória)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Especificando um lugar..."
            ],
            "afterMarkdowns": [
              "Baixamos só os commits de `foo` e colocamos em `o/foo`"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Você pode estar se perguntando -- por que o Git colocou os commits no ramo remoto `o/foo` em vez de simplesmente jogá-los no meu ramo local `foo`? Eu pensei que o parâmetro fosse um `<lugar>` que existisse tanto no repositório local como no remoto?",
              "",
              "Bem, o Git tem uma exceção especial neste caso, porque pode ser que exista trabalho seu no ramo local `foo` que você não queira bagunçar!! Esse fato é relacionado com o abordado na lição anterior sobre o `git fetch` -- ele não atualiza ramos locais não-remotos, ele apenas baixa os commits (de forma que você possa inspecioná-los e/ou realizar um merge posteriormente).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Bem, neste caso, o que acontece se eu definir explicitamente tanto a origem como o destino, com `<origem>:<destino>`?\"",
              "",
              "Se você estiver apaixonado o suficiente para baixar commits *diretamente* em um ramo local, então sim, você pode especificar esse comportamento com um colon refspec. Você só não pode baixar commits em um ramo que esteja atualmente em checkout, mas se não estiver, o Git permitirá o fetch.",
              "",
              "Aqui está o único detalhe -- `<origem>` agora é uma referência *remota* e `<destino>` é uma referência *local* de onde colocar esses commits. É exatamente o oposto do git push, e realmente faz sentido, já que estamos transferindo os dados na direção oposta!",
              "",
              "Tendo dito isto, desenvolvedores raramente fazem isso na prática. Estou introduzindo essa informação mais como uma forma de conceitualizar a forma como `fetch` e `push` são tão similares, apenas em direções opostas."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vejamos essa loucura em ação:"
            ],
            "afterMarkdowns": [
              "Wow! Viu, o Git entendeu o `foo~1` como um lugar de origin e baixou os commits para o ramo local `bar`. Veja como `foo` e `o/foo` não foram atualizados, já que especificamos outro destino."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "E se o destino não existir antes de eu executar o comando? Vamos rever o último slide, mas em uma situação na qual o `bar` não existe de antemão."
            ],
            "afterMarkdowns": [
              "Viu? Funciona EXATAMENTE como o git push. O Git criou o destino localmente antes do fetch, da mesma forma como o Git cria o destino (se ele não existir) no repositório remoto durante um push."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Sem parâmetros?",
              "",
              "Se o `git fetch` não receber argumentos, ele simplesmente baixa todos os commits do repositório remoto em todos os ramos remotos..."
            ],
            "afterMarkdowns": [
              "Bastante simples, mas importante de rever ao menos uma vez."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, chega de conversa! Para completar este nível, faça fetch apenas dos commits especificados na visualização do objetivo. Capriche nos comandos!",
              "",
              "Você terá de especificar tanto a origem como o destino em ambos os comandos de fetch. Preste atenção na janela de visualização, já que os identificadores podem trocar!"
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
              "## Parámetros de fetch",
              "",
              "Entonces, aprendido todo sobre os parámetros de push, este parámetro `<lugar>` molón, e incluso as referencias separadas por dous puntos (`<orixe>:<destino>`). ¿Poderemos empregar todo este coñecemento para `git fetch` tamén?",
              "",
              "¡Home claro! Os parámetros para `git fetch` son realmente *moi, moi* semellantes os de `git push`. É o mesmo tipo de conceptos, pero aplicados na dirección contraria (xa que agora estás baixando os commits en lugar de subilos).",
              "",
              "Vexamos os conceptos dunha puntada..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### O parámetro `<lugar>`",
              "",
              "Se especificar o lugar co git fetch como no comando seguinte:",
              "",
              "`git fetch origin foo`",
              "",
              "Git vai ir á rama `foo` no remoto, vai traer tódolos commits que non estén presentes localmente, e logo aplicaráos sobre a rama `o/foo` localmente.",
              "",
              "Vexámolo en acción (refresquemos o concepto)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Especificando un lugar..."
            ],
            "afterMarkdowns": [
              "Sólo baixamos os commits de `foo` e os poñemos en `o/foo`"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Poderás preguntarte \"¿Por qué git aplicou eses commits sobre a rama `origin/foo` e non os aplicou sobre a rama `foo` local? Lembra que o parámetro `<lugar>` era un lugar que existía tanto no local como no remoto.\"",
              "",
              "Bueno, git fai unha excepción especial neste caso, xa que poderías ter traballo na rama `foo` que non quixeras mesturar. Esto refírese á lección anterior sobre `git fetch` - non actualiza as túas ramas locais non-remotas, só descarga os commits (para que poidas velos ou mesturalos despois).", 
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Bueno, e, neste caso, ¿qué pasa se explícitamente definimos o orixe e destino con `<origen>:<destino>`?\"",
              "",
              "Se te sentes o suficientemente seguro como para traer os commits *directamente* da rama local, entón, sí, podes especificalo empregando a referencia con dous puntos. Non podes traer commits a unha rama que non teñas, pero en calquera outro caso, git vaino facer.",
              "",
              "Este é o único problema, igual: `<orixe>` é agora un lugar no *remoto*, e `<destino>` é un lugar *local* onde poñer esos commits. É exactamente o oposto a git push, e eso ten sentido xa que ¡estamos enviando os datos no sentido contrario!",
              "",
              "Dito esto, difícilmente alguén use esto na práctica. Estouno presentando principalmente como un modo de traballar no que `fetch` e `push` son moi semellantes, só que en direccións opostas."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vexamos esta locura en acción"
            ],
            "afterMarkdowns": [
              "¡Wow! Mira: git resolveu `foo~1` como un lugar no que a orixe descargou eses commits a `bar` (que era unha rama local). Nota como `foo` e `o/foo` non foron actualizados, xa que especificamos o destino."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué pasa si o destino non existe antes de lanzar este comando? Vexamos o último exemplo pero sin que `bar` exista de antemán."
            ],
            "afterMarkdowns": [
              "Mira: é IGUAL que git push. Git creou o destino localmente antes de facer o fetch, tal e como git creará o destino no remoto antes de empurrar (se non existiran)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Sen argumentos?",
              "",
              "Se `git fetch` non recibe ningún argumento, simplemente descarga tódolos commits do remoto a tódalas ramas remotas..."
            ],
            "afterMarkdowns": [
              "Moi sinxelo, pero vale a pena velo ó menos unha vez."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Bueno, moitas verbas. Para rematar o nivel, descarga só os commits especificados na visualización do obxectivo. ¡Faite colega destes comandos!",
              "",
              "Vas ter que especificar a orixe e o destino para ámbolos dous comandos fetch. Presta atención ó objetivo dado que ¡os IDs poden estar invertidos!"
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
              "## git fetch 的參數",
              "",
              "我們剛學到了所有關於 git push 的參數，有非常棒的 `<place>` 參數，甚至是 colon refspecs（`<source>:<destination>`），我們可不可以也同樣套用到 `git fetch` 上面？",
              "",
              "你猜對了！`git fetch` 的參數*非常非常*類似 `git push`，一樣的概念，但方向不同（因為你在下載 commit，而不是在上傳 commit）。",
              "",
              "讓我們一次講一個概念..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "###`<place>` 參數",
              "",
              "對於 `git fetch`，如果你特別指定了一個 `<place>`：",
              "",
              "`git fetch origin foo`",
              "",
              "git 會到 remote 上的 `foo` branch，抓下所有不在 local 上的 commit，然後將它們放到 local 的 `o/foo` branch。",
              "",
              "讓我們實際看一下（就只是一個*更新*的方法）。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "指定一個 `<place>`..."
            ],
            "afterMarkdowns": [
              "我們只下載了 `foo` 上的 commit，並且把它們放到 `o/foo`。"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "你也許會感到奇怪，為什麼 git 是把這些 commit 放到 `o/foo` branch 而不是放到我的 local 的 `foo` branch？ 我認為，`<place>` 參數是表示一個位置，這個位置同時存在 local 跟 remote 上？",
              "",
              "因為你可能已經 checkout 到 `foo` branch 上，而且你不想要打亂上面的 commit，因此 git 才會特別這樣做！！這就又回到之前的 `git fetch` 的課程，它並不會放到你的 local 上的 branch (該 branch 沒有對應到任何的 remote branch)，它只會下載 commit 到 local 上且表示 remote 的 branch（所以你之後可以觀察或者 merge 它們）。",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"在該例子當中，如果我特別透過 `<source>:<destination>` 來指定 source 以及 destination，會發生什麼事情？\"",
              "",
              "如果你很想要把 fetch 回來的 commit *直接*放到 local branch，那麼你就可以利用一個 colon refspec 來做到。你不能夠把 fetch 回來的 commit 放到你目前正 checkout 的 branch，如果不是的話，git 就會允許你這麼做。",
              "",
              "這裡只有一個重點，`<source>` 現在是一個在 *remote* 上的 branch，而且 `<destination>` 是一個放置這些 commit 的 *local* 的位置。它剛好就是 `git push` 的相反，而且因為我們在相反方向傳遞資料，所以這也很合理！",
              "",
              "其實，程式設計師很少會想要做這個，我主要是強調 `fetch` 以及 `push` 的概念是很類似的，就只是方向相反而已。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們來實際看一下這個瘋狂的事情："
            ],
            "afterMarkdowns": [
                "哇！看到了吧，git 把  `foo~1` 解讀成一個在 origin 上的位置，而且把該位置上面的 commit 下載到 `bar`（這是一個 local branch）上面，注意，因為我們有指定目的地，因此 `foo` 跟 `o/foo` 並沒有被更新。"
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果我在執行這個指令之前，destination 不存在的話會怎樣？我們回到上一個例子，但這一次事前並沒有 `bar` 這個 branch 的存在。"
            ],
            "afterMarkdowns": [
              "看到了吧，這就像是 `git push`，在 fetch 之前，git 會自己建立 destination，就好像是在 push 之前， git 會建立 remote 上的 destination 一樣（如果它不存在的話）。"
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "沒有參數的情況？",
              "",
              "如果使用 `git fetch` 的時候，沒有指定任何的參數，那就相當於它會下載 remote 上面的所有的 commit，並且把這些 commit 放到 local 上面所有對應到 remote 的 branch..."
            ],
            "afterMarkdowns": [
              "超簡單，但是所有的更新只做一次，很值得。"
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好的，講了好多！要完成這一關，fetch 視覺化的目標所指定的 commit，好好玩這些指令吧！",
              "",
              "對於兩個 fetch 的指令，你必須要指定 source 以及 destination，注意一下視覺化的目標，因為 commit 的 id 可以被交換！"
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
              "## Git fetch 的参数",
              "",
              "我们刚学习了 git push 的参数，很酷的 `<place>` 参数，还有用冒号分隔的 refspecs（`<source>:<destination>`）。 这些参数可以用于 `git fetch` 吗？",
              "",
              "你猜中了！`git fetch` 的参数和 `git push` 极其相似。他们的概念是相同的，只是方向相反罢了（因为现在你是下载，而非上传）",
              "",
              "让我们逐个讨论下这些概念……"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "###  `<place>` 参数",
              "",
              "如果你像如下命令这样为 git fetch 设置 <place> 的话：",
              "",
              "`git fetch origin foo`",
              "",
              "Git 会到远程仓库的 `foo` 分支上，然后获取所有本地不存在的提交，放到本地的 `o/foo` 上。",
              "",
              "来看个例子（还是前面的例子，只是命令不同了）"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "通过指定 place..."
            ],
            "afterMarkdowns": [
              "我们只下载了远程仓库中 `foo` 分支中的最新提交记录，并更新了 o/foo"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "你可能会好奇 —— 为何 Git 会将新提交放到 `o/foo` 而不是放到我本地的 foo 分支呢？之前不是说这样的 <place> 参数就是同时应用于本地和远程的位置吗？",
              "",
              "好吧, 本例中 Git 做了一些特殊处理，因为你可能在 foo 分支上的工作还未完成，你也不想弄乱它。还记得在 `git fetch` 课程里我们讲到的吗 —— 它不会更新你的本地的非远程分支, 只是下载提交记录（这样, 你就可以对远程分支进行检查或者合并了）。",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "“如果我们指定 `<source>:<destination>` 会发生什么呢？”",
              "",
              "如果你觉得直接更新本地分支很爽，那你就用冒号分隔的 refspec 吧。不过，你不能在当前检出的分支上干这个事，但是其它分支是可以的。",
              "",
              "这里有一点是需要注意的 —— `source` 现在指的是远程仓库中的位置，而 `<destination>` 才是要放置提交的本地仓库的位置。它与 git push 刚好相反，这是可以讲的通的，因为我们在往相反的方向传送数据。",
              "",
              "理论上虽然行的通，但开发人员很少这么做。我在这里介绍它主要是为了从概念上说明 `fetch` 和 `push` 的相似性，只是方向相反罢了。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "来看个疯狂的例子："
            ],
            "afterMarkdowns": [
              "哇! 看见了吧, Git 将 `foo~1` 解析成一个 origin 仓库的位置，然后将那些提交记录下载到了本地的 `bar` 分支（一个本地分支）上。注意由于我们指定了目标分支，`foo` 和 `o/foo` 都没有被更新。"
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果执行命令前目标分支不存在会怎样呢？我们看一下上个对话框中没有 bar 分支的情况。"
            ],
            "afterMarkdowns": [
              "看见了吧，跟 git push 一样，Git 会在 fetch 前自己创建立本地分支, 就像是 Git 在 push 时，如果远程仓库中不存在目标分支，会自己在建立一样。"
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "没有参数呢?",
              "",
              "如果 `git fetch` 没有参数，它会下载所有的提交记录到各个远程分支……"
            ],
            "afterMarkdowns": [
              "相当简单，但是仅需更新一次，值得你去做！"
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好, 说得太多了！要完成本关，抓取目标窗口中指定的提交记录，使用这些魔幻的命令吧！",
              "",
              "使用 fetch 时, 你必须指定 source 和 destination。 注意一下目标窗口, 因为提交对象的 ID 可能会变哦!"
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
              "## Git Fetch Optionen",
              "",
              "Nun haben wir also alles über `git push` Optionen gelernt, diesen coolen `<Ort>`-Parameter, and sogar über mit Doppelpunkt getrennte Ref-Spezifikationen (`<Quelle>:<Ziel>`). Können wir all dieses neu erworbene Wissen auch auf `git fetch` anwenden?",
              "",
              "Jede Wette! Die Optionen für `git fetch` sind wirklicht *sehr, sehr* ähnlich denen von `git push`. Es sind dieselben Verfahren, nur in die andere Richtung angewendet (da man bei `fetch` herunterlädt anstatt hochzuladen).",
              "",
              "Gehen wir die verschiedenen Verfahrensweise mal eine nach der anderen durch ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Der Parameter `<Ort>`",
              "",
              "Wenn du, wie folgt, einen \"Ort\" bei `git fetch` angibst:",
              "",
              "`git fetch origin foo`",
              "",
              "wird Git zum Branch `foo` auf dem Remote gehen, dort alle Änderungen holen, die es lokal noch nicht gibt, und sie an den lokalen Branch `o/foo` anhängen.",
              "",
              "Schauen wir uns das mal live an (nur zur Wiederholung)"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Durch Angabe eines Ortes ..."
            ],
            "afterMarkdowns": [
              "... laden wir die fehlenden Commits von `foo` und packen sie auf `o/foo` drauf."
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Du wunderst dich vielleicht warum Git diese Commits auf den `o/foo` Branch gepacht hat, anstatt einfach direkt auf den lokalen Branch `foo`? Zeigt der Parameter `<Ort>` nicht einen Ort an, der sowohl lokal als auch entfernt existiert?",
              "",
              "Nun ja, Git geht diesen Schritt weil du auf `foo` ja noch Commits haben könntest, die nicht auf dem Server sind, und da will es nichts durcheinander bringen. Ähnlich wie beim früheren Level zu `git fetch` -- es aktualisiert nicht deine lokalen Arbeits-Branches, es lädt die Commits nur in die `o` (bzw. `origin`) Branches, damit du sie dir in Ruhe anschauen und integrieren kannst.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wenn das so ist, was passiert dann wenn ich explizit Quelle und Ziel im Ort angebe?",
              "",
              "Wenn du Commits wirklich per `fetch` *direkt* auf einen lokalen Branch holen willst, dann, ja, kannst du das mit einer Ref-Spezifikation erreichen. Das funktioniert nicht mit deinem gerade ausgecheckten Branch, aber davon abgesehen lässt Git es zu.",
              "",
              "Nur ein Haken -- `<Quelle>` bezeichnet jetzt einen Ort auf dem *entfernten* Server und `<Ziel>` ist ein *lokaler* Ort, wo die Commits hin sollen. Es ist genau umgekehrt wie bei `git push` und das ist logisch, denn wir übertragen die Daten ja auch in die umgekehrte Richtung!",
              "",
              "Davon abgesehen benutzt man das in der Praxis kaum. Ich zeige das vor allem um zu verdeutlichen, wie `fetch` und `push` sehr ähnlich sind, nur in entgegengesetzten Richtungen."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns den Quatsch mal in Aktion an:"
            ],
            "afterMarkdowns": [
              "Wow! Siehst du, git löst `foo~1` als Ort auf dem Server `origin` auf und lädt dessen Commits herunter in `bar` hinein. Beachte wie `foo` und `o/foo` *nicht* aktualisiert wurden, da wir ein Ziel angegeben haben."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was ist denn wenn das Ziel nicht existiert, für das ich den Befehl ausführe? Schauen wir uns das letzte Beispiel noch mal an, nur dass `bar` jetzt noch nicht existiert."
            ],
            "afterMarkdowns": [
              "Siehst du, es ist *genau* wie `git push`. Git erstellt das Ziel lokal bevor es den `fetch` ausführt, genauso wie Git erst das Ziel auf dem Remote erstellt, befor es pusht (falls das Ziel nicht existiert)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Keine Optionen?",
              "",
              "Wenn bei `git fetch` keine Optionen angegeben werden, lädt es einfach alle Commits vom Remote auf die lokalen Abbildungen aller Remote Branches ..."
            ],
            "afterMarkdowns": [
              "Ziemlich einfach, aber man sollte es mal gesehen haben."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, genug gelabert! Um den Level zu schaffen musst du nur die im Zielbild angegebenen Commits per `fetch` holen. Sei kreativ mit den Befehlen!",
              "",
              "Du wirst Quelle und Ziel bei beiden `fetch` Befehlen angeben müssen. Schau dir das Zielbild gut an, da die IDs vertauscht sein könnten!"
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
              "## Аргументы git fetch",
              "",
              "Итак, мы только что изучили всё, что касается аргументов git push, мы узнали о параметре `<пункт назначения>`, и даже об аргументе, задающем отдельно источник и получатель коммитов (`<источник>:<получатель>`). Можем ли мы применить все эти полученные знания для команды `git fetch` ?",
              "",
              "Ещё бы! Аргументы для команды `git fetch` на самом деле *очень, очень* похожи на те, что мы использовали в `git push`. В данном случае применяется тот же подход, только в противоположном направлении (так как теперь вы скачиваете коммиты, а не закачиваете их).",
              "",
              "Давайте ознакомимся с принципами один за одним..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Параметр `<пункт назначения>`",
              "",
              "Если вы указываете пункт назначения в команде git fetch, например так, как в следующем примере:",
              "",
              "`git fetch origin foo`",
              "",
              "Git отправится в ветку `foo` на удалённом репозитории, соберёт с собой все коммиты, которые не присутствуют локально, и затем поместит их в локальную ветку под названием `o/foo`.",
              "",
              "Давайте взглянем на всё это в действии (чтобы освежить в памяти)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Указывая пункт назначения..."
            ],
            "afterMarkdowns": [
              "мы скачиваем только коммиты с ветки `foo` и помещаем их в `o/foo`"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Вы, должно быть, спрашиваете себя — зачем git поместил эти коммиты в ветку `o/foo` вместо того, чтобы разместить их в локальной ветке `foo` ? Ведь я думал о параметре `<пункт назначения>`, как о месте, ветке, которая существует в обоих - локальном и удалённом репозитории. Верно?",
              "",
              "На самом деле, в данном случае git делает исключение, потому что вы, возможно, работаете над веткой `foo`, которую не хотите привести в беспорядок!! Об этом упоминалось в ранних уроках по `git fetch` - эта команда не обновляет ваши локальные 'не удалённые', она лишь скачивает коммиты (соответственно, вы можете инспектировать / объединять их позже).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Что же тогда произойдёт, если я явно укажу оба параметра: и источник и получатель, пользуясь синтаксисом `<источник>:<получатель>` ?\"",
              "",
              "Если вы уверены в том, что хотите закачать коммиты *прямиком* в вашу локальную ветку, тогда да, вы можете явно указать источник и получатель через двоеточние. Вы можете воспользоваться таким приёмом лишь для ветки, на которой вы не находитесь в настоящий момент `checkout`.",
              "",
              "Теперь у нас `<источник>` - это место на *удалённом репозитории*, а `<получатель>` - место в *локальном* репозитории, в который следует помещать коммиты. Аргументы в точности до наоборот повторяют git push, и немудрено, ведь теперь мы переносим данные в обратном направлении!",
              "",
              "Как уже было сказано, разработчики редко используют такой подход на практике. Целью демонстрации этой возможности было показать, насколько схожи концептуально `fetch` и `push`. Их отличие лишь в направлении переноса данных."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте взглянем на всё это в действии:"
            ],
            "afterMarkdowns": [
              "Ого! Видите, git распознал `foo~1` как место в origin и затем скачал эти коммиты в `bar`, которая является локальной веткой. Обратите внимание, что ветки `foo` и `o/foo` не изменились, так как в аргументах мы явно указали получателя."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "А что, если ветка-получатель не существует на момент запуска команды? Давайте ещё раз взглянем на предыдущий слайд, но на этот раз ветки `bar` ещё не существует."
            ],
            "afterMarkdowns": [
              "Видите, поведение совсем такое же, как и у git push. Git создал ветку-получатель локально прежде чем скачивать данные. Всё как и в случае, когда git создаёт получателя в удалённом репозитории, когда мы закачиваем изменения (если получатель не существует)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "А если вообще без аргументов ?",
              "",
              "Если команда `git fetch` выполняется без аргументов, она скачивает все-все коммиты с удалённого репозитория и помещает их в соответствующие удалённо-локальные ветки в локальном репозитории..."
            ],
            "afterMarkdowns": [
              "Достаточно просто, после того как мы пережили все эти технические тонкости."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ладно, достаточно болтовни! Чтобы выполнить этот уровень, скачайте лишь определённые коммиты так, как представлено в визуализации цели. Пофантазируйте с этими командами!",
              "",
              "Вам следует явно указывать источник и получателя для обеих команд fetch. Обратите внимание на визуализацию цели, так как ID-шники могут меняться!"
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
              "## Git fetch 인자들",
              "",
              "여태까지 우리는 git push 인자들에 대해 배워봤습니다. 이 멋진 `<place>` 인자 그리고 콜론 참조스펙도 말이죠(`<source>:<destination>`). 우리가 알아낸 이 지식을 `git fetch`에도 적용 할 수 있으려나요?",
              "",
              "당연하죠! `git fetch`에 넘기는 인자들은 사실 `git push`의 그것들과 *아주 아주* 비슷합니다. 같은 컨셉으로 적용되지만 방향이 반대일 뿐이죠(커밋을 업로드하는게 아니라 다운받는것이니까요).",
              "",
              "하나씩 차근차근 알아봅시다..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### `<place>` 인자",
              "",
              "git fetch에 다음 명령어와 같이 place를 지정해주면:",
              "",
              "`git fetch origin foo`",
              "",
              "Git은 원격 저장소의 `foo` 브랜치로 가서 현재 로컬에 없는 커밋들을 가져와 로컬의 'o/foo' 브랜치 아래에 추가 할 것입니다.",
              "",
              "직접 확인해봅시다(상기해보죠)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "place를 지정해주면..."
            ],
            "afterMarkdowns": [
              "커밋들을 `foo`브랜치에서만 내려받은 후 로컬의 `o/foo`브랜치에만 적용합니다."
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "여러분은 분명 궁금할거에요 -- 왜 로컬의 `foo`에 그냥 커밋을 추가하지 않고 로컬의 원격 브랜치 `o/foo`에 커밋들을 추가한거지? <place> 인자는 로컬하고 원격 저장소 모두에 똑같이 있는 곳을 의미한게 아니였나?",
              "",
              "음, git이 이번 상황은 특별히 예외적으로 처리하기 때문입니다. 여러분이 `foo`브랜치에 작업을 했을지도 모르는데 이 명령으로 망쳐서 건드릴지도 모르니까요! 이전에 했던 강의 `git fetch`를 떠올려보면 왜 그런지 느낌이 올겁니다 -- `git fetch`는 로컬의 원격 브랜치가 아닌 브랜치는 갱신하지 않습니다, 커밋들을 내려받기만 합니다(여러분이 확인해보고 나중에 병합할 수 있도록 말이죠).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"그렇다면, 이전 강의처럼 source와 destination를 모두 직접 지정해주면 어떻게될까요? 이 명령어로 말이죠 `<source>:<destination>`\"",
              "",
              "여러분이 커밋을 *직접* 로컬 브랜치로 fetch할 열의가 있다면, 네 콜론 참조스펙으로 지정해서 할 수 있습니다. 하지만 체크아웃된 브랜치에 fetch할 수 는 없고 체크아웃되지 않은 브랜치만 가능합니다.",
              "",
              "주의 할점이 하나 있는데 -- `<source>`는 이제 받아올 커밋이 있는 *원격*에 있는 place를 넣어줘야하고 `<destination>`은 그 커밋들을 받아올 *local*의 place를 인자로 넣어줘야 합니다. git push와 정반대로 하는거죠, 데이터를 반대의 방향으로 옮기는 작업이니 이게 더 납득이 갑니다.",
              "",
              "언급한 것 처럼, 실제로 이것을 하는 개발자들은 많지 않습니다. 이것을 소개하는것은 `fetch`와 `push`가 방향이 반대일뿐 컨셉이 비슷하다는것을 표현하기 위해서입니다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "자 이 해괴한 작업을 직접 확인해봅시다:"
            ],
            "afterMarkdowns": [
              "이야! 보셨습니까, git이 `foo~1`을 origin의 place로 지정하고 커밋들을 내려받아 `bar`(로컬 브랜치)에 추가했습니다. `foo`와 `o/foo`는 갱신되지 않는게 확인되나요? destination을 지정해줬기 때문입니다."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "만약 destination이 될 브랜치가 없는 없는 상태에서 명령을 수행하면 어떻게 될까요? 방금의 슬라이드에서 `bar`브랜치가 없는 상태에서 수행해봅시다."
            ],
            "afterMarkdowns": [
              "보이나요, git push 와 똑같습니다. Git이 fetch를 수행하기전에 destination을 로컬에 만들었습니다. git이 push를 수행하기 전에 원격저장소에 destination을 만드는것과 똑같습니다(없을경우에)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "인자 없이는?",
              "",
              "만약 `git fetch`를 인자없이 수행하면 원격저장소에서 모든 원격 브랜치들로 커밋들을 내려받습니다..."
            ],
            "afterMarkdowns": [
              "간단하지만, 짚고 넘어갑시다."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "좋습니다, 설명은 이정도로 하고! 이번 레벨을 끝내기위해서는 시각화된 골처럼 커밋들을 fetch하면 됩니다. 명령어로 멋지게 해내봅시다!",
              "",
              "fetch 명령에 source와 destination을 모두 지정해줘야 할겁니다. 골 시각화를 잘 보세요 fetch를 하다보면 커밋들의 ID가 바뀔수도있어요!"
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
              "## Аргументи git fetch",
              "",
              "Отже, ми вже вивчили все про аргументи git push, про корисний параметр `<place>` і про формат запису з двокрапкою (`<source>:<destination>`). Чи знадобляться нам ці зання при вивченні `git fetch`?",
              "",
              "Ще б пак! Аргументи для `git fetch` насправді *дуже, дуже* схожі на `git push`. Принцип той самий, з точністю до напрямку (бо ми звантважуємо коміти, а не завантажуємо).",
              "",
              "Розгляньмо це крок за кроком..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Параметр `<place>`",
              "",
              "Якщо вказати параметр `<place>` для команди git fetch, наприклад, так:",
              "",
              "`git fetch origin foo`",
              "",
              "git піде у віддалену гілку `foo`, візьме всі коміти, яких немає локально і закине в локальну гілку `o/foo`.",
              "",
              "Подивімось на це в дії (просто щоб пригадати)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Вказуючи `<place>`..."
            ],
            "afterMarkdowns": [
              "Ми звантажуємо коміти лише з `foo` і кладемо їх в `o/foo`"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ти можеш спитати, чому git закинув ці коміти в гілку `o/foo` замість того, щоб покласти їх відразу в локальну гілку `foo`? Я думав, що параметр `<place>` одночасно вказує місце звідки взяти і куди поставити?",
              "",
              "Ну, git робить невеликий виняток в цьому випадку, оскільки ти, ймовірно, маєш якусь роботу в `foo`, і не хочеш там нічого зіпсувати! Пригадай з попереднього уроку про `git fetch` -- він не оновлює твої локальні (не віддалені -- без `o/`) гілки, він тільки звантажує коміти (так, щоб їх можна було переглянути/змерджити пізніше).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Ну, в такому разі, що буде, якщо явно вказати і джерело і призначення `<source>:<destination>`?\"",
              "",
              "Якщо ти почуваєшся достатньо впевненим і хочеш звантажити віддалені коміти *прямо* в свою локальну гілку, тоді -- справді, ти можеш так написати, використавши синтаксис з двокрапкою. Єдиний виняток -- таким способом не можна витягувати зміни в поточну локальну гілку, в будь-яку іншу -- без проблем.",
              "",
              "Тепер в нас `<source>` вказує на *віддалений репозиторій*, а `<destination>` -- на *локальне* місце, куди звантажаться коміти. Це повна протилежність тому, як було в git push, що, зрештою, має сенс, адже ми передаємо дані у протилежному напрямку!",
              "",
              "Насправді, розробники рідко використовують такий спосіб на практиці. І він показаний тут лише для повноти описання наскільки `fetch` і `push` схожі, відрізняючись лише напрямом дії."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Подивімось на це божевілля в дії:"
            ],
            "afterMarkdowns": [
              "Ого! Дивись, git прийняв `foo~1` за джерело, і звантажив коміти в `bar` (локальна гілка). Зауваж, що `foo` і `o/foo` не оновлювались, оскільки ми явно вказали звідки і куди передавати коміти."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "А якщо вказаного місця призначення не існує на момент виконання команди? Погляньмо на попередній слайд, але без гілки `bar`."
            ],
            "afterMarkdowns": [
              "Бачиш, все як і в випадку з git push. Git створив локальну гілку-призначення перед звантаженням, так само як створить гілку-призначення на віддаленій стороні перед пушем (якщо її не існувало, звичайно)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Без аргументів?",
              "",
              "Якщо `git fetch` запущено без аргументів, він просто звантажить всі коміти з віддаленого репозиторія в віддалені (`o/`) гілки..."
            ],
            "afterMarkdowns": [
              "Все дуже просто, але варто було згадати ще раз."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Гаразд, годі балакати! Щоб пройти цей рівень, звантаж лише вказані на візуалізації коміти. Прояви фантазію, підбираючи команди!",
              "",
              "Тобі потрібно вказати і джерело і призначення для обидвох fetch-команд. Слідкуй за змінами на візуалізації, ID комітів можуть змінюватися!"
            ]
          }
        }
      ]
    }
  }
};
