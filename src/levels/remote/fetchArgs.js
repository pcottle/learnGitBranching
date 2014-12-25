exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C7\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C3\",\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C6\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git fetch origin master~1:foo;git fetch origin foo:master;git checkout foo;git merge master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"C1\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C6\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Fetch arguments",
    "fr_FR": "Arguments de fetch",
    "zh_CN": "Fetch 的参数",
    "zh_TW": "fetch 的參數",
    "es_AR": "Parámetros de fetch",
    "pt_BR": "Parâmetros do fetch",
    "de_DE": "Optionen für Fetch",
    "ja"   : "Fetchの引数"
  },
  "hint": {
    "en_US": "Pay attention how the commit ids may have swapped! You can read slides again with \"help level\"",
    "fr_FR": "Faites attention à la façon dont les ids des commits ont été intervertis ! Vous pouvez lire une nouvelle fois les slides avec \"help level\"",
    "zh_CN": "注意下提交对象的id是如何交换的! 你可以通过`help level`再次切到幻灯片!",
    "zh_TW": "注意 commit 的 id 是怎麼被交換的！你可以透過 `help level` 來閱讀對話視窗！",
    "es_AR": "¡Prestá atención a cómo podrían haberse invertido los ids de los commits! Podés volver a leer toda la lección usando \"help level\"",
    "pt_BR": "Preste atenção em como os identificadores dos commits podem ter trocado! Você pode ler os slides novamente com \"help level\"",
    "de_DE": "Beachte wie die Commit IDs getauscht wurden! Du kannst den Einführungsdialog mit \"help level\" erneut anzeigen",
    "ja"   : "コミットIDの入れ替わりに注意！スライドを復習するには`help level`を実行"
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
              "Donc nous venons de tout apprendre sur les arguments de git push, le paramètre cool `<place>`, et même la ponctuation pour refspecs (`<source>:<destination>`). Pouvons-nous utiliser ces connaissances pour  `git fetch` aussi ?",
              "",
              "Vous l'avez parié ! Les arguments pour `git fetch` sont en fait *très, très* similaires à ceux de `git push`. Il s'agit du même type de concepts mais simplement appliqués dans une direction différente (puisque maintenant vous téléchargez des commits plutôt que les envoyer).",
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
              "Si vous spécifiez un emplacement avec git fetch dans la commande suivante :",
              "",
              "`git fetch origin foo`",
              "",
              "Git va aller à la branche distante `foo`, récupérer tous les commits qui ne sont pas présents localement, et ensuite les faire apparaître dans la branche locale `o/foo`.",
              "",
              "Voyons cela en action (juste pour se rappeler)."
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
              "Nous téléchargeons uniquement les commits de `foo` et les plaçons dans `o/foo`"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Vous vous demandez peut-être -- pourquoi git a fait apparaître ces commits dans la branche distante `o/foo` plutôt que les placer directement dans ma branche locale `foo` ? Je pensais que le paramètre `<place>` était un emplacement qui existait à la fois localement et à distance ?",
              "",
              "Eh bien git fait une exception dans ce cas parce que vous pouvez avoir du travail dans la branche `foo` que vous ne voulez pas gâcher !! Cela est lié à la dernière lesson sur `git fetch` -- cela ne met pas à jour vos branches locales, cela télécharge uniquement les commits (ainsi vous pouvez les inspecter / fusionner plus tard).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Dans ce cas, que ce passe-t-il si je spécifie explicitement la source et la destination `<source>:<destination>` ?\"",
              "",
              "Si vous vous sentez assez passionnés pour rapatrier (fetch) les commits *directement* dans votre branche locale, alors oui vous pouvez préciser cela avec la notation refspec. Vous ne pouvez cependant pas rapatrier les commits dans la branche courante.",
              "",
              "Ici est la seule différence -- à part que `<source>` est maintenant l'emplacement sur le dépôt *distant* et `<destination>` sur le dépôt *local* où rajouter ces commits. C'est l'exact opposé de git push, et cela se tient puisque nous transférons des données dans la direction opposée !",
              "",
              "Cela dit, les développeurs l'utilisent rarement en pratique. Je l'introduis principalement pour concrétiser le fait que `fetch` et `push` sont très similaires, simplement dans des directions opposées."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons cette folie en action :"
            ],
            "afterMarkdowns": [
              "Wow ! Voyez, git a résolu `foo~1` comme un emplacement sur origin et a ensuite téléchargé les commits dans `bar` (qui était une branche local). Remarquez comment `foo` et `o/foo` n'ont pas été mises à jour puisque nous avons spécifié une destination."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Que se passe-t-il si l'emplacement n'existe pas avant que j'exécute la commande ? Voyons cela dans le dernier slide quand `bar` n'existe pas encore."
            ],
            "afterMarkdowns": [
              "Vous voyez, c'est COMME un git push. Git a créé la destination localement avant le fetch, simplement comme il va créer la destination à distance avant le push (si elle n'existe pas)."
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
              "Si `git fetch` ne reçoit pas d'arguments, cela télécharge simplement tous les commits dans toutes les branches distantes..."
            ],
            "afterMarkdowns": [
              "Assez simple, mais faisons-le juste une fois."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, assez parlé ! Pour finir ce niveau, faites simplement un fetch des commits indiqués dans le fenêtre de visualisation de l'objectif. Appropriez-vous ces commandes !",
              "",
              "Vous allez avoir à préciser la source et la destination pour les deux commandes fetch. Faites attention à la fenêtre de visualisation puisque les IDs peuvent avoir changé de position !"
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
              "## Git fetch arguments",
              "",
              "我们刚学习了git push的参数, 特别是`<place>`参数, 更特别的冒号分隔(`<source>:<destination>`). 这些参数可以用于`git fetch`吗?",
              "",
              "你猜中了! git fetch的参数和git push相当相似. 都是相同的概念, 但是方向相反(因为现在你是下载 而非上传)",
              "",
              "我们过一个概念.."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "###  `<place>` 参数",
              "",
              "你可以像如下命令这样为git fetch设置<place>",
              "",
              "`git fetch origin foo`",
              "",
              "Git 会来到远端的`foo`分支, 然后抓取所有不在本地的新提交, 放到本地的分支`o/foo`",
              "",
              "我们看看这个动作(这像是更新器) "
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "通过指定place..."
            ],
            "afterMarkdowns": [
              "我们只下载更新了o/foo"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "你可以想知道 -- 为何git 会将新提交压入到o/foo 而不是 压入到我本地的foo. 我想 <place>参数就是同时存在于本地和远端 的 <place> ",
              "",
              "好吧, 本例中git 有个特殊例外, 因为你可能位于foo 分支, 你也不想弄乱它. 这得联系之前的课程 -- 它不会更新你的本地工作, 它只是下载提交(这样, 稍后你可以检查 或者 合并之).  ",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "如果我们设定了 `<source>:<destination>`会发生什么呢?",
              "",
              "如果你觉得直接更新本地分支很爽, 那你就用冒号refspec吧. 不过, 你不能在检出的分支上干这个事.",
              "",
              "这里只有一个特点 -- `source` 是远端的位置, 而`<destination>`是要放置提交的本地位置, 这真是有趣 -- 这也是传送数据的对立方向! ",
              "",
              "话虽如此, 开发者很少这么做. 我已经介绍了, 概念上fetch/push很相似, 只是它们方向相反.  "
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我们看看更疯狂的例子:"
            ],
            "afterMarkdowns": [
              "哇! 看见了吧, git 将`foo~1` 解析成一个origin的位置, 然后下载到了本地`bar`. 注意foo 和 o/foo都没有得到更新 (因为我们指定了destination)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果 destination 不存在呢? 我们看看上个幻灯片(不含bar)! "
            ],
            "afterMarkdowns": [
              "看见了吧, 它就像是git push. Git会自己确立本地destination, 就像是git在push时, 会自己确立destination(如果它不存在的话)"
            ],
            "command": "git fetch origin foo~1",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "没有参数呢?",
              "",
              "如果 `git fetch` 没有参数, 它会下载所有远端分支.."
            ],
            "afterMarkdowns": [
              "相当简单, 但是值得一次更新!"
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好, 说得太多了! 要完成本节, 抓取可视窗口指定的提交, 使用这些魔幻的命令吧.",
              "",
              "使用fetch时, 你必须指定source/destination. 注意一下可视窗口, 因为提交对象的id可以会被切换哦!"
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
    }
  }
};
