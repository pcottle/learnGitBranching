exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3A%22o/main%22%7D%2C%22o/main%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22o/main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3A%22o/main%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D",
  "solutionCommand": "git checkout -b side o/main;git commit;git pull --rebase;git push",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Remote Tracking",
    "zh_CN": "远程追踪",
    "zh_TW": "remote tracking",
    "es_AR": "Trackeando remotos",
    "es_ES": "Trackeando remotos",
    "pt_BR": "Seguindo remotos",
    "gl": "Traceando os remotos",
    "de_DE": "Remote Tracking",
    "ja": "リモートのトラッキング",
    "fr_FR": "Suivi de branche distante",
    "ru_RU": "Слежка за удалённым репозиторием",
    "ko": "원격 저장소 추적하기",
    "uk": "Слідкуємо за віддаленим репозиторієм",
    "vi": "Theo dõi từ xa",
    "sl_SI": "Sledenje Oddaljenega Repota",
    "pl": "Śledzenie zdalnych repo",
    "it_IT": "Tracciamento remoto"
  },
  "hint": {
    "en_US": "Remember there are two ways to set remote tracking!",
    "zh_CN": "记住，有两种设置 remote tracking 的方法!",
    "zh_TW": "記住喔，有兩個方式可以去設定 remote tracking",
    "es_AR": "¡Acordate de que hay dos formas de trackear un remoto!",
    "es_ES": "¡Recuerda que hay dos formas de trackear un remoto!",
    "pt_BR": "Lembre-se que há duas formas de seguir um ramo remoto!",
    "gl": "¡Lembrate de que hai dúas formas de seguir unha rama remota!",
    "de_DE": "Nicht vergessen, es gibt zwei Arten Remote Tracking einzurichten!",
    "ja": "リモートトラッキングを設定する方法が二つあるのをお忘れなく!",
    "fr_FR": "Rappelez-vous qu'il existe deux façons de configurer le suivi de branche distante !",
    "ru_RU": "Помни, есть два способа установить слежку за удалённым репозиторием!",
    "ko": "원격 추적하기를 설정하는데에는 두가지 방법이 있습니다!",
    "uk": "Пам'ятай, є два способи слідкувати за віддаленим репозиорієм!",
    "vi": "Hãy nhớ rằng, có 2 cách để thiết lập theo dõi từ xa!",
    "sl_SI": "Spomni se, da obstajata dva načina za sledenje oddaljenega repota.",
    "pl": "Pamiętaj, zdalne repo można śledzić na dwa sposoby!",
    "it_IT": "Ricorda che ci sono due modi per impostare il tracciamento remoto!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Remote-Tracking branches",
              "",
              "One thing that might have seemed \"magical\" about the last few lessons is that git knew the `main` branch was related to `o/main`. Sure these branches have similar names and it might make logical sense to connect the `main` branch on the remote to the local `main` branch, but this connection is demonstrated clearly in two scenarios:",
              "",
              "* During a pull operation, commits are downloaded onto `o/main` and then *merged* into the `main` branch. The implied target of the merge is determined from this connection.",
              "* During a push operation, work from the `main` branch was pushed onto the remote's `main` branch (which was then represented by `o/main` locally). The *destination* of the push is determined from the connection between `main` and `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote tracking",
              "",
              "Long story short, this connection between `main` and `o/main` is explained simply by the \"remote tracking\" property of branches. The `main` branch is set to track `o/main` -- this means there is an implied merge target and implied push destination for the `main` branch.",
              "",
              "You may be wondering how this property got set on the `main` branch when you didn't run any commands to specify it. Well, when you clone a repository with git, this property is actually set for you automatically. ",
              "",
              "During a clone, git creates a remote branch for every branch on the remote (aka branches like `o/main`). It then creates a local branch that tracks the currently active branch on the remote, which is `main` in most cases.",
              "",
              "Once git clone is complete, you only have one local branch (so you aren't overwhelmed) but you can see all the different branches on the remote (if you happen to be very curious). It's the best of both worlds!",
              "",
              "This also explains why you may see the following command output when cloning:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Can I specify this myself?",
              "",
              "Yes you can! You can make any arbitrary branch track `o/main`, and if you do so, that branch will have the same implied push destination and merge target as `main`. This means you can run `git push` on a branch named `totallyNotMain` and have your work pushed to the `main` branch on the remote!",
              "",
              "There are two ways to set this property. The first is to checkout a new branch by using a remote branch as the specified ref. Running",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "Creates a new branch named `totallyNotMain` and sets it to track `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Enough talking, let's see a demonstration! We will checkout a new branch named `foo` and set it to track `main` on the remote."
            ],
            "afterMarkdowns": [
              "As you can see, we used the implied merge target of `o/main` to update the `foo` branch. Note how main doesn't get updated!!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "This also applies for git push."
            ],
            "afterMarkdowns": [
              "Boom. We pushed our work to the `main` on the remote even though our branch was named something totally different."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Way #2",
              "",
              "Another way to set remote tracking on a branch is to simply use the `git branch -u` option. Running",
              "",
              "`git branch -u o/main foo`",
              "",
              "will set the `foo` branch to track `o/main`. If `foo` is currently checked out you can even leave it off:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see this other way of specifying remote tracking real quick..."
            ],
            "afterMarkdowns": [
              "Same as before, just a more explicit command. Sweet!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! For this level let's push work onto the `main` branch on remote while *not* checked out on `main` locally. You should instead create a branch named `side` which the goal diagram will show."
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
              "### Le suivi des branches distantes",
              "",
              "Dans les dernières leçons, Git savait que la branche `main` était reliée à `o/main`, et cela a pu vous paraître \"magique\". Il est certain que ces deux branches ont des noms similaires et il peut être logique de croire que la branche locale `main` est liée à la branche distante `main`, mais la relation n'est avérée que dans deux scénarios :",
              "",
              "* Pendant un pull, les commits sont téléchargés dans `o/main` et ensuite *fusionnés* (merge) dans la branche `main`. La cible impliquée dans cette fusion est déterminée par cette relation.",
              "* Pendant un push, le travail de la branche `main` a été envoyé sur la branche distante `main` (qui est localement représentée par `o/main`). La *destination* du push est déterminée par la relation entre `main` and `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote tracking",
              "",
              "Pour faire court, cette relation entre `main` et `o/main` est simplement portée par la propriété \"remote tracking\" (suivi distant) des branches. La branche `main` est configurée pour suivre `o/main` : cela signifie qu'il y a une cible de fusion et une destination d'envoi implicites pour la branche `main`.",
              "",
              "Vous vous demandez peut-être comment cette propriété a été configurée pour la branche `main` alors que vous n'avez exécuté aucune commande pour le faire. Eh bien, quand vous clonez un dépôt avec Git, cette propriété est configurée automatiquement. ",
              "",
              "Pendant le clonage, Git crée une branche distante pour chaque branche du dépôt distant (c'est à dire des branches comme `o/main`). Il crée ensuite une branche locale qui suit la branche actuellement active sur le dépôt distant, qui se trouve être `main` dans la plupart des cas.",
              "",
              "Une fois que git clone est terminé, vous avez seulement une branche locale (comme ça vous n'êtes pas submergé) mais vous pouvez voir toutes les branches distantes (si vous êtes très curieux). C'est le compromis idéal !",
              "",
              "Cela explique aussi pourquoi vous avez peut-être vu la sortie suivante pendant le clonage :",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Puis-je configurer cette relation moi-même ?",
              "",
              "Absolument ! Vous pouvez suivre `o/main` depuis n'importe quelle branche, et si vous le faîtes, cette branche va avoir la même destination de push et cible de merge que pour `main`. Cela signifie que vous pouvez exécuter `git push` sur une branche nommée `totallyNotMain` mais envoyer tout de même votre travail sur la branche `main` du dépôt distant !",
              "",
              "Il y a deux façons de configurer cette propriété. La première est de créer une nouvelle branche en la branchant immédiatement sur la branche distante, à l'aide de `git checkout -b` :",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "Cette commande crée une nouvelle branche nommée `totallyNotMain` et la configure pour suivre `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Assez parlé, faisons une démonstration ! Nous allons nous placer sur une nouvelle branche nommée `foo` et la configurer pour suivre `main` du dépôt distant."
            ],
            "afterMarkdowns": [
              "Comme vous pouvez le voir, nous avons utilisé la cible de fusion déclarée pour `o/main` afin de mettre à jour la branche `foo`. Remarquez que la branche `main` n'a pas été mise à jour !!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Cela s'applique aussi pour git push :"
            ],
            "afterMarkdowns": [
              "Boum. Nous avons envoyé notre travail sur `main` vers le dépôt distant alors que notre branche avait un nom totalement différent."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Méthode n°2",
              "",
              "Une autre façon de configurer le suivi d'une branche est d'utiliser l'option `git branch -u`. La commande est alors :",
              "",
              "`git branch -u o/main foo`",
              "",
              "Ce qui va configurer la branche `foo` (déjà existante) en la faisant suivre `o/main`. Si `foo` est la branche courante, vous pouvez même ne pas la préciser :",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons cette autre manière de paramètrer le suivi d'une branche distante..."
            ],
            "afterMarkdowns": [
              "C'est la même chose, et c'est juste un peu plus explicite. Cool !"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok ! Pour ce niveau, envoyons notre travail sur la branche distante `main` en ne se trouvant *pas* sur la branche `main` locale. Je vous laisse chercher comment faire, puisque c'est une leçon de niveau avancé :P"
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
              "### Ramas que trackean remotos",
              "",
              "Una de las cosas que pueden haber parecido \"mágicas\" de las últimas lecciones es que git sabía que la rama `main` estaba relacionada con `o/main`. Obviamente, estas ramas tienen nombres parecidos, y podría parecer lógico conectar la rama `main` del remoto con la rama `main` local, pero esta conexión es bien evidente en dos escenarios:",
              "",
              "* Durante una operación de pull, los commits se descargan a `o/main` y después se *mergean* a la rama `main`. El objetivo implícito del merge se determina con esta conexión.",
              "* Durante un push, el trabajo de la rama `main` se sube a la rama `main` del remoto (que estaba representada localmente por `o/main`). El *destino* del push se determina con esta conexión entre `main` y `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Trackeando remotos",
              "",
              "Haciéndola corta, esta conexión entre `main` y `o/main` se explica simplemente por la propiedad de \"trackear (seguir) remotos\" de las ramas. La rama `main` está configurada para trackear `o/main` -- osea, que hay un objetivo implícito para el merge y un destino implícito para de la rama `main`.",
              "",
              "Podrías estar pensando cómo esa propiedad apareció en tu rama `main` si vos no corriste ningún comando para especificarlo. Bueno, cuando clonás un repositorio con git, esta propiedad se asigna por vos automáticamente.",
              "",
              "Durante un clone, git crea una rama remota por cada rama en el remoto (por ejemplo, ramas como `o/main`). Pero después crea una rama local que trackea la rama activa del remote, que suele ser `main`.",
              "",
              "Una vez completado el git clone, sólo tenés una única rama local (para que no te asustes) pero podés ver todas las ramas del remoto (si fueras tan curioso). ¡Es lo mejor de ambos mundos!",
              "",
              "Esto también explica por qué podrías ver un mensaje como este durante la clonación:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\"",
              "",
              "    rama local \"main\" establecida para trackear la rama remota \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Puedo especificarlo yo?",
              "",
              "¡Claro que sí! Podés hacer que cualquier rama que quieras trackee `o/main`, y si lo hicieras, esa rama va a tener el mismo destino implícito de push y objetivo implícito de merge que `main`. Eso significa que podés correr `git push` en una rama llamada `absolutamenteNoEsMain` y ¡que tu trabajo se pushee a la rama `main` del remoto!",
              "",
              "Hay dos formas de establecer esta propiedad. La primera es checkoutear una nueva rama usando una rama remota como la referencia especificada. Ejecutar",
              "",
              "`git checkout -b absolutamenteNoEsMain o/main`",
              "",
              "Crea una nueva rama llamada `absolutamenteNoEsMain` y la hace trackear a `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Suficiente charla, ¡veamos una demo! Vamos a checkoutear una nueva rama llamada `foo` y hacer que trackee a `main` en el remoto."
            ],
            "afterMarkdowns": [
              "Como podés ver, usamos el objetivo implícito de merge `o/main` para actualizar la rama `foo`. ¡Notá cómo `main` no fue actualizada!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lo mismo aplica para git push."
            ],
            "afterMarkdowns": [
              "Boom. Pusheamos nuestro trabajo a la rama `main` del remoto incluso cuando nuestra rama se llamaba totalmente distinto."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forma número 2",
              "",
              "Otra forma de especificar la rama a trackear es usar la opción `git branch -u`. Ejecutando",
              "",
              "`git branch -u o/main foo`",
              "",
              "establecemos que la rama `foo` trackee a `o/main`. Si encima estás parado en `foo`, incluso podés obviarlo:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos rápidamente esta otra forma de especificar la rama a trackear..."
            ],
            "afterMarkdowns": [
              "Lo mismo que antes, sólo que con un comando bastante más explícito. ¡Una belleza!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¡Ok! Para este nivel, pusheá tu trabajo a la rama `main` del remoto *sin* estar parado sobre `main` localmente. Te dejo que te des cuenta del resto solo, que para algo este es el curso avanzado :P"
            ]
          }
        }
      ]
    },
    "es_ES": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Ramas que trackean remotos",
              "",
              "Una de las cosas que te pueden haber parecido \"mágicas\" de las últimas lecciones es que git sabía que la rama `main` estaba relacionada con `o/main`. Obviamente, estas ramas tienen nombres parecidos, y podría parecer lógico conectar la rama `main` del remoto con la rama `main` local, pero esta conexión es bien evidente en dos escenarios:",
              "",
              "* Durante una operación de pull, los commits se descargan a `o/main` y después se *mergean* a la rama `main`. El objetivo implícito del merge se determina con esta conexión.",
              "* Durante un push, el trabajo de la rama `main` se sube a la rama `main` del remoto (que estaba representada localmente por `o/main`). El *destino* del push se determina con esta conexión entre `main` y `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Trackeando remotos",
              "",
              "Resumiendo, esta conexión entre `main` y `o/main` se explica simplemente por la propiedad de \"trackear (seguir) remotos\" de las ramas. La rama `main` está configurada para trackear `o/main` -- osea, que hay un objetivo implícito para el merge y un destino implícito para de la rama `main`.",
              "",
              "Podrías estar pensando cómo esa propiedad apareció en tu rama `main` si no ejecutaste ningún comando para especificarlo. Bueno, cuando clonas un repositorio con git, esta propiedad es asignada por ti automáticamente.",
              "",
              "Durante un clone, git crea una rama remota por cada rama en el remoto (por ejemplo, ramas como `o/main`). Pero después crea una rama local que trackea la rama activa del remote, que suele ser `main`.",
              "",
              "Una vez completado el git clone, sólo tienes una única rama local (para que no te asustes) pero puedes ver todas las ramas del remoto (si fueses curioso). ¡Es lo mejor de ambos mundos!",
              "",
              "Esto también explica por qué podrías ver un mensaje como este durante la clonación:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\"",
              "",
              "    rama local \"main\" establecida para trackear la rama remota \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Puedo especificarlo yo?",
              "",
              "¡Claro que sí! Puedes hacer que cualquier rama que quieras trackee `o/main`, y si lo hicieras, esa rama va a tener el mismo destino implícito de push y objetivo implícito de merge que `main`. Eso significa que puedes ejecutar `git push` en una rama llamada `absolutamenteNoEsMain` y ¡que tu trabajo se pushee a la rama `main` del remoto!",
              "",
              "Hay dos formas de establecer esta propiedad. La primera es hacer checkout sobre una nueva rama usando una rama remota como la referencia especificada. Ejecutar",
              "",
              "`git checkout -b absolutamenteNoEsMain o/main`",
              "",
              "Crea una nueva rama llamada `absolutamenteNoEsMain` y la hace trackear a `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Basta de charla, ¡veamos un ejemplo! Vamos a hacer checkout de una nueva rama llamada `foo` y hacer que trackee a `main` en el remoto."
            ],
            "afterMarkdowns": [
              "Como puedes ver, usamos el objetivo implícito de merge `o/main` para actualizar la rama `foo`. ¡Observa cómo `main` no fue actualizada!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lo mismo aplica para git push."
            ],
            "afterMarkdowns": [
              "Zas. Hacemos push de nuestro trabajo a la rama `main` del remoto incluso cuando nuestra rama se llamaba totalmente distinto."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forma número 2",
              "",
              "Otra forma de especificar la rama a trackear es usar la opción `git branch -u`. Ejecutando",
              "",
              "`git branch -u o/main foo`",
              "",
              "establecemos que la rama `foo` trackee a `o/main`. Si encima estás parado en `foo`, incluso puedes obviarlo:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos rápidamente esta otra forma de especificar la rama a trackear..."
            ],
            "afterMarkdowns": [
              "Lo mismo que antes, sólo que con un comando bastante más explícito. ¡Muy útil!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¡Perfecto! Para este nivel, haz push de tu trabajo a la rama `main` del remoto *sin* estar parado sobre `main` localmente. Te dejo que te des cuenta del resto solo, que para algo este es el curso avanzado :P"
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
              "### Seguindo ramos remotos",
              "",
              "Uma coisa que pode ter parecido \"mágica\" nas lições passadas é que o Git sabia que o ramo `main` estava relacionado com o `o/main`. Certamente esses ramos possuem nomes similares, e tem todo sentido lógico conectar o ramo `main` do lado remoto com o ramo `main` local, mas essa conexão é demonstrada claramente em dois cenários:",
              "",
              "* Durante uma operação de pull, os commits são baixados em `o/main` e então são *mergidos* no ramo `main`. O alvo do merge é determinado a partir dessa conexão.",
              "* Durante uma operação de push, o trabalho do ramo `main` local é enviado para o ramo `main` remoto (que é representado localmente por `o/main`). O *destino* do push é determinado da conexão entre `main` e `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote tracking",
              "",
              "Resumindo a história, essa conexão entre `main` e `o/main` é explicada pela propriedade de \"remote tracking\" dos ramos. O ramo `main` é configurado para seguir o ramo `o/main` -- isso significa que existe um alvo implícito de merge e um destino implícito de push para o ramo `main`.",
              "",
              "Você pode estar se perguntando como essa propriedade foi configurada no ramo `main` se você não executou nenhum comando ordenando que isso fosse feito. Bem, quando você clona um repositório com o Git, essa propriedade é configurada para você automaticamente. ",
              "",
              "Durante a clonagem, o Git cria um ramo remoto para cada ramo que existe no repositório remoto (ou seja, ramos como o `o/main`). Ele cria então um ramo local que segue o ramo atualmente ativo no repositório remoto, que geralmente é o `main`.",
              "",
              "Uma vez que a clonagem esteja completa, você terá apenas um único ramo local (para que você não seja sobrecarregado), mas você pode ver todos os ramos diferentes que existem no repositório remoto (caso você esteja curioso). É o melhor dos dois mundos!",
              "",
              "Isso também explica porque você vê a seguinte mensagem quando clona um repositório:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Posso eu mesmo especificar isso?",
              "",
              "Sim, você pode! Você pode fazer com que qualquer ramo arbitrário siga o `o/main`, e se você fizer isso, esse ramo terá o mesmo destino de push implícito que e o mesmo alvo de merge que o `main`. Isso significa que você pode executar `git push` em um ramo chamado `realmenteNaoSouOMain` e ainda assim ter seu trabalho enviado ao ramo `main` do repositório remoto!",
              "",
              "Há duas formas de configurar essa propriedade. A primeira consiste em fazer checkout de um novo ramo usando o ramo remoto como especificação de referência. Executar",
              "",
              "`git checkout -b realmenteNaoSouOMain o/main`",
              "",
              "Cria um novo ramo chamado `realmenteNaoSouOMain` e o configura para seguir o `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Já foi conversa o suficiente, vamos ver uma demonstração! Vamos fazer checkout de um novo ramo chamado `foo` e configurá-lo para seguir o `main` do repositório remoto."
            ],
            "afterMarkdowns": [
              "Como você pode ver, usamos o alvo implícito de merge do `o/main` para atualizar o ramo `foo`. Veja como o main local não sofreu atualização!!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Isso também se aplica ao git push."
            ],
            "afterMarkdowns": [
              "Boom. Nós enviamos nosso trabalho para o ramo remoto `main` ainda que nosso ramo local tivesse um nome completamente diferente."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forma #2",
              "",
              "Outra maneira de configurar remote tracking em um ramo é utilizando `git branch -u`. Executando",
              "",
              "`git branch -u o/main foo`",
              "",
              "configuraremos o ramo local `foo` para seguir o `o/main`. Se `foo` for o que estiver atualmente em checkout, você pode inclusive omiti-lo:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vejamos outra forma realmente rápida de configurar remote tracking..."
            ],
            "afterMarkdowns": [
              "O mesmo de antes, apenas um comando mais explícito. Doce!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! Para este nível, vamos fazer push no ramo remoto `main` *sem estar* em um checkout do `main` local. Vou deixar você descobrir o resto, já que isto é um curso avançado :P"
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
              "### Ramas que trackean os remotos",
              "",
              "Unha das cousas que poden semellar \"máxicas\" das últimas leccións é que git sabía que a rama `main` estaba relacionada co `o/main`. Obviamente, estas ramas teñen nomes semellantes, e podería semellar lóxico conectar a rama `main` do remoto ca rama `main` local, pero esta conexión é ben evidente nos dous escenarios:",
              "",
              "* Durante unha operación de pull, os commits descarganse ó `o/main` e logo *mesturanse* á rama `main`. O obxectivo implícito do merge determinase con esta conexión.",
              "* Durante un push, o traballo da rama `main` súbese á rama `main` do remoto (que estaba representada localmente por `o/main`). O *destino* do push determinouse con esta conexión entre `main` e `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Trackeando remotos",
              "",
              "Facéndoa curta, esta conexión entre `main` e `o/main` ensínase pola propiedade de \"trackear (seguir) remotos\" das ramas. A rama `main` está configurada para trackear `o/main` -- o que quere dicir, que hai un obxectivo implícito para o merge e un destino implícito para a rama  `main`.",
              "",
              "Poderías estar pensando cómo esa propiedade apareceu na túa rama `main` se ti non executaches ningún comando para especificalo. Bueno, cando clonas un repositorio co git, esta propiedade asignase por ti automáticamente.",
              "",
              "Durante un clone, git crea unha rama remota por cada rama no remoto (por exemplo, ramas como `o/main`). Pero despois crea unha rama local que trakea a rama activa do remoto, que habitúa ser `main`.",
              "",
              "Una vez completado o git clone, só tés unha única rama local (para que non te asustes) pero podes ver todalas ramas que do remoto (se fora tan curioso). ¡É o mellor de ámbolos dous mundos!",
              "",
              "Esto tamén explica por qué poderías ver unha mensaxe como este durante a clonación:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\"",
              "",
              "    rama local \"main\" establecida para trackear a rama remota \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Podo especificalo eu?",
              "",
              "¡Claro que sí! Podes facer que calquera rama que quixeras seguir `o/main`, e se o fixeras, esa rama vai ter o mesmo destino implícito de push e  obxectivo implícito de merge que `main`. Eso significa que podes executar `git push` nunha rama chamada `nonMain` e ¡que o teu traballo se empurre á rama `main` do remoto!",
              "",
              "Hai dúas formas de establecer esta propiedade. A primeira é facer checkout a unha nova rama empregando unha rama remota como a referencia especificada. Executar",
              "",
              "`git checkout -b nonMain o/main`",
              "",
              "Crea unha nova rama chamada `nonMain` e persigue a `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Suficiente charla, ¡vexamos unha demo! Imos facer checkout a unha nova rama chamada `foo` e facer que siga a `main` no remoto."
            ],
            "afterMarkdowns": [
              "Como podes ver, empregamos o obxectivo implícito de merge `o/main` para actualizar a rama `foo`. ¡Nota como `main` non foi actualizada!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "O mismo aplica para git push."
            ],
            "afterMarkdowns": [
              "Boom. Empurramos o noso traballo á rama `main` do remoto incluso cando a nosa rama se chamaba totalmete distinto."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forma número 2",
              "",
              "Outra forma de especificar a rama a seguir é usar a opción `git branch -u`. Executando",
              "",
              "`git branch -u o/main foo`",
              "",
              "establecemos que a rama `foo` segue a `o/mater`. Se por riba estás parado en `foo`, incluso podes obvialo:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vexamos rápidamente está outra forma de especificar a rama a seguir..."
            ],
            "afterMarkdowns": [
              "O mesmo que antes, só que un comando bastante máis explícito. ¡Unha cousa preciosa!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¡Ok! Para este nivel, empurra o teu traballo á rama `main` do remoto *sen* estar parado sobre `main` localmente. Déixote que te decates do resto ti só, que para algo estás nun nivel avanzado :P"
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
              "### remote tracking branch",
              "",
              "在之前的課程中，有一件事情看起來很\"神奇\"，那就是 git 知道 `main` branch 是對應到 `o/main` branch。當然這些 branch 有類似的名稱，所以可以大概猜到， local 的 `main` branch 可以對應到 remote 的 `main branch`，但是我們是在兩種情況下可以確定有這個對應關係：",
              "",
              "* 在使用 `pull` 的時候，下載 commit 到 `o/main`，並且 `merge` 這些 commit 到 `main` branch，這就表示這個 merge 的目標是決定於這個對應關係。",
              "* 在使用 `push` 的時候，在 `main` branch 上面的 commit 被 push 到 remote 上面的 `main` branch （它在 local 被表示成 `o/main`），這就表示 push 的目標是決定於 `main` 以及 `o/main` 之間的對應關係。",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote tracking",
              "",
              "長話短說，我們可以用 branch 上面的 \"remote tracking\" 特性來表示介於 `main` 以及 `o/main` 的對應關係，`main` branch 被設定用來追蹤（track） `o/main`，這就表示對於 `main` branch 來說的話，有一個 merge 的目標以及 push 的目標。",
              "",
              "你可能會覺得很奇怪，當你沒有下任何指令去設定的時候，關於 `main` branch 的對應關係是如何被設定的。喔！其實當你 clone 一個 repo 的時候，其實就已經自動幫你做設定了。 ",
              "",
              "在做 clone 的時候，git 會針對每一個在 remote 上面的 branch 建立一個 branch （例如 `o/main`），之後它會建立一個 local branch 來追蹤目前在 remote 上面的 active branch，在大部份的情況下，幾乎都是設定 `main` branch。",
              "",
              "一旦 git 完成這個動作，你就只會有一個 local branch ，但是你可以看到所有在 remote 上面的不同的 branch，對於 local 和 remote 來說的話，這樣子是最好的！",
              "",
              "這也解釋了為什麼當你 clone 的時候可能會看到以下被輸出的指令：",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 我可以自己設定嗎？",
              "",
              "是的你可以！你可以設定任何的 branch 來 track `o/main`， 假如你真的這麼做的話，那麼該 branch 的 push 及 merge 的目標就會跟 `main` 一樣。這就表示說你可以在 `totallyNotMain` branch 上面執行 `git push`，並且 push 你的 commit 到 remote 的 `main` branch！",
              "",
              "有兩個方式可以設定，第一個就是藉由參考一個 remote branch 來 checkout 一個新的 branch。執行",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "建立一個新的 `totallyNotMain` branch 並且它會 track `o/main`。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "說的好多，我們現在來看一個例子！我們會 checkout 一個新的 `foo` branch，而且該 branch 會被用來 track remote 上的 `main` branch。"
            ],
            "afterMarkdowns": [
              "就像你看到的，當 `o/main` 更新的時候，`foo` branch 也跟著一起被更新，要注意 main 並沒有被更新！"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "同樣適用於 `git push`"
            ],
            "afterMarkdowns": [
              "哇，即使我們的 branch 名稱完全一點關係都沒有，但我們還是 push 了 commit 到 remote 的 `main` branch 上面。"
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 方法 #2",
              "",
              "另外一個設定 remote tracking 的方法是使用 `git branch -u` 這一個指令，執行",
              "",
              "`git branch -u o/main foo`",
              "",
              "你就會看到 `foo` branch 被設定成 track `o/main`，如果你現在已經 checkout 到 foo 這個 branch 上面了，你就可以省略掉它：",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我們來看這個快速設定 remote tracking 的方法..."
            ],
            "afterMarkdowns": [
              "跟之前一樣，就只是一個更加明確的指令，讚啦！"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好！在這個關卡中，我們要 push 我們的 commit 到 remote 上面的 `main` branch，但是我們*不* checkout 到 local 的 `main` branch。因為這是一個進階的課程，所以我會讓你明白其它的東西。:P"
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
              "### 远程跟踪分支",
              "",
              "在前几节课程中有件事儿挺神奇的，Git 好像知道 `main` 与 `o/main` 是相关的。当然这些分支的名字是相似的，可能会让你觉得是依此将远程分支 main 和本地的 main 分支进行了关联。这种关联在以下两种情况下可以清楚地得到展示：",
              "",
              "* pull 操作时, 提交记录会被先下载到 o/main 上，之后再合并到本地的 main 分支。隐含的合并目标由这个关联确定的。",
              "* push 操作时, 我们把工作从 `main` 推到远程仓库中的 `main` 分支(同时会更新远程分支 `o/main`) 。这个推送的目的地也是由这种关联确定的！",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 远程跟踪",
              "",
              "直接了当地讲，`main` 和 `o/main` 的关联关系就是由分支的“remote tracking”属性决定的。`main` 被设定为跟踪 `o/main` —— 这意味着为 `main` 分支指定了推送的目的地以及拉取后合并的目标。",
              "",
              "你可能想知道 `main` 分支上这个属性是怎么被设定的，你并没有用任何命令指定过这个属性呀！好吧, 当你克隆仓库的时候, Git 就自动帮你把这个属性设置好了。",
              "",
              "当你克隆时, Git 会为远程仓库中的每个分支在本地仓库中创建一个远程分支（比如 `o/main`）。然后再创建一个跟踪远程仓库中活动分支的本地分支，默认情况下这个本地分支会被命名为 `main`。",
              "",
              "克隆完成后，你会得到一个本地分支（如果没有这个本地分支的话，你的目录就是“空白”的），但是可以查看远程仓库中所有的分支（如果你好奇心很强的话）。这样做对于本地仓库和远程仓库来说，都是最佳选择。",
              "",
              "这也解释了为什么会在克隆的时候会看到下面的输出：",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\"",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 我能自己指定这个属性吗？",
              "",
              "当然可以啦！你可以让任意分支跟踪 `o/main`, 然后该分支会像 `main` 分支一样得到隐含的 push 目的地以及 merge 的目标。 这意味着你可以在分支 `totallyNotMain` 上执行 `git push`，将工作推送到远程仓库的 `main` 分支上。",
              "",
              "有两种方法设置这个属性，第一种就是通过远程分支切换到一个新的分支，执行: ",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "就可以创建一个名为 `totallyNotMain` 的分支，它跟踪远程分支 `o/main`。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "闲话少说，咱们先看看演示！我们切换到一个名叫 `foo` 的新分支，让其跟踪远程仓库中的 `main`"
            ],
            "afterMarkdowns": [
              "正如你所看到的, 我们使用了隐含的目标 `o/main` 来更新 `foo` 分支。需要注意的是 main 并未被更新！"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "git push 同样适用"
            ],
            "afterMarkdowns": [
              "我们将一个并不叫 `main` 的分支上的工作推送到了远程仓库中的 `main` 分支上"
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 第二种方法",
              "",
              "另一种设置远程追踪分支的方法就是使用：`git branch -u` 命令，执行：",
              "",
              "`git branch -u o/main foo`",
              "",
              "这样 `foo` 就会跟踪 `o/main` 了。如果当前就在 foo 分支上, 还可以省略 foo：",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "看看这种方式的实际的效果..."
            ],
            "afterMarkdowns": [
              "跟之前一样, 但这个命令更明确！"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "OK! 本节我们在**不**切换到 `main` 分支的情况下将工作推送到的远程仓库中的 `main` 分支上。因为这是高级课程, 就不做过多的提示了! :P"
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
              "### Remote Tracking Branches",
              "",
              "In den letzten paar Leveln wirkte es womöglich etwas \"magisch\", dass Git automatisch wusste, dass der Branch `main` irgendwie mit `o/main` verwandt ist. Klar, sie haben ähnliche Namen und daher mag es logisch erscheinen sie in Verbindung zu bringen, aber offensichtlich wird es in zwei Szenarien:",
              "",
              "* Beim `pull` werden Commits in `o/main` heruntergeladen und dann per *Merge* in den Branch `main` gebracht. Aus der Verbindung zwischen den beiden Branches leitet sich das Ziel des Merges ab.",
              "* Beim `push` werden Commits vom `main` auf den `main` des Remote Servers geschoben (und die Änderung _danach_ im lokalen `o/main` Branch abgebildet). Das *Ziel* des Push wird aus der Verbindung zwischen `main` und `o/main` abgeleitet.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Langer Rede kurzer Sinn, die Verbindung zwischen `main` und `o/main` ist einfach die Eigenschaft des \"Remote Tracking\" von Branches. `main` ist so eingestellt, dass er `o/main` trackt -- das heißt es gibt ein implizites Ziel für `pull` und `push` Operationen auf dem `main` Branch.",
              "",
              "Du fragst dich vielleicht wieso diese Eigenschaft auf dem `main` definiert ist, wenn du das doch gar nicht explizit gemacht hast. Naja, beim Clonen eines Repository macht Git das für den `main` automatisch.",
              "",
              "Während des Clonens erstellt Git einen Remote Branch für jeden Branch, den es auf dem Remote Server findet (also Branches wie `o/main`); dann erstellt es für den Branch, auf den auf dem entfernten Server `HEAD` zeigt (meistens `main`) automatisch einen lokalen Branch und stellt ihn so ein, dass er sein Gegenstück auf dem Server trackt. Deswegen hast du beim Clonen vielleicht schon mal dies gesehen:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Kann ich das auch selbst machen?",
              "",
              "Na klar! Du kannst jeden beliebigen Branch so einstellen, dass er `o/main` trackt, und wenn du das tust wird der Branch dieselben impliziten Zielangaben für `push` und `pull` haben wie `main`. Du kannst also `git push` auf dem Branch `absolut_nicht_main` ausführen und deine Commits auf `main` des entfernten Servers schieben lassen.",
              "",
              "Es gibt zwei Möglichkeiten diese Eigenschaft zu definieren. Die erste ist, einen neuen lokalen Branch von einem Remote Branch auszuchecken. Wenn man",
              "",
              "    git checkout -b absolut_nicht_main o/main",
              "",
              "eingibt, wird ein neuer lokaler Branch namens `absolut_nicht_main` angelegt, der `o/main` trackt."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Genug gequatscht, schauen wir uns eine Demonstration an! Wir checken einen neuen Branch `foo` aus, so dass er `main` auf dem Server trackt."
            ],
            "afterMarkdowns": [
              "Wie du siehst, benutzen wir das implizite Ziel beim `pull` um `foo` zu aktualisieren. Beachte, dass `main` nicht aktualisiert wird."
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Das gilt auch für `git push`."
            ],
            "afterMarkdowns": [
              "Bämm. Wir haben unsere Commits auf den `main` auf dem Server geschoben, obwohl unser lokaler Branch völlig anders heißt."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Methode 2",
              "",
              "Noch eine Möglichkeit um Remote Tracking auf einem Branch einzustellen, ist `git branch -u`. Wenn man",
              "",
              "    git branch -u o/main foo",
              "",
              "eingibt, wird damit der lokale Branch `foo` so eingestellt, dass er `o/main` trackt. Den Namen des lokalen Branch kannst du auch weglassen, falls du ihn eh aktuell ausgecheckt hast:",
              "",
              "    git branch -u o/main",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns auch diese Methode noch an ..."
            ],
            "afterMarkdowns": [
              "Genau wie vorher, nur ist der Befehl ein bisschen eindeutiger. Schick!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok. In diesem Level musst du Commits auf den `main` auf dem Server schieben, *ohne* den lokalen `main` ausgecheckt zu haben. Den Rest kannst du selbst herausfinden, schließlich ist das hier für Fortgeschrittene. :P"
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
              "### Удалённые-отслеживаемые ветки",
              "",
              "Единственное, что могло бы показаться вам \"магией\" в нескольких предыдущих уроках - это то, как git знает, что ветка `main` соответствует `o/main`. Конечно, эти ветки имеют схожие имена и связь между локальной и удалённой ветками `main` выглядит вполне логично, однако, эта связь наглядно продемонстрирована в двух сценариях:",
              "",
              "* Во время операции pull коммиты скачиваются в ветку `o/main` и затем *соединяются* в ветку `main`. Подразумеваемая цель слияния определяется исходя из этой связи.",
              "* Во время операции push наработки из ветки `main` закачиваются на удалённую ветку `main` (которая в локальном представлении выглядит как `o/main`). *Пункт назначения* операции push определяется исходя из связи между `main` и `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Удалённые-отслеживаемые ветки",
              "",
              "Короче, связь между `main` и `o/main` объясняется не иначе как свойство \"удалённое отслеживание\" веток. Ветка `main` настроена так, чтобы следить за `o/main` -- это подразумевает наличие источника для merge и пункта назначения для push в контексте ветки `main`.",
              "",
              "Вы, должно быть, удивлены, как это отслеживание появилось на ветке `main`, если мы не запускали ни одной специфической команды. На самом деле, когда вы клонируете репозиторий, это слежение включается автоматически.",
              "",
              "В процессе клонирования git локально создаёт удалённые ветки для каждой ветки с удалённого репозитория (такие как `o/main`). Затем он - git - создаёт локальные ветки, которые отслеживают текущую, активную ветку на удалённом репозитории. В большинстве случаев - это `main`.",
              "",
              "К тому моменту как `git clone` завершит своё выполнение, у вас будет лишь одна локальная ветка (так что вы ещё не сильно перегружены), но, если вам будет интересно, вы сможете увидеть все удалённые ветки (при желании).",
              "",
              "Именно это объясняет, почему сразу после клонирования вы видите в консоли надпись:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\"",
              "",
              "    (локальная ветка \"main\" теперь следит за удалённой веткой \"o/main\") "
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### А могу ли я сделать это самостоятельно?",
              "",
              "Само собой! Вы можете сказать любой из веток, чтобы она отслеживала `o/main`, и если вы так сделаете, эта ветка будет иметь такой же пункт назначения для push и merge как и локальная ветка `main`. Это значит, что вы можете выполнить `git push`, находясь на ветке `totallyNotMain`, и все ваши наработки с ветки `totallyNotMain` будут закачены на ветку `main` удалённого репозитория!",
              "",
              "Есть два способа сделать это. Первый - это выполнить checkout для новой ветки, указав удалённую ветку в качестве ссылки. Для этого необходимо выполнить команду",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              ", которая создаст новую ветку с именем `totallyNotMain` и укажет ей следить за `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Хватит болтовни, давайте взглянем на демонстрацию! Мы выполним checkout для новой ветки `foo` и укажем ей, чтобы она отслеживала `main` с удалённого репозитория."
            ],
            "afterMarkdowns": [
              "Как вы увидели, мы использовали `o/main`, чтобы обновить ветку `foo`. Обратите внимание, как обновился `main`!!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Это работает также и для git push."
            ],
            "afterMarkdowns": [
              "Оп! Мы закачали наши наработки на ветку `main` нашего удалённого репозитория. При том, что наша локальная ветка называется абсолютно по-другому."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Способ №2",
              "",
              "Другой способ указать ветке отслеживать удалённую ветку — это просто использовать команду `git branch -u`. Выполнив команду",
              "",
              "`git branch -u o/main foo`",
              "",
              "вы укажете ветке `foo` следить за `o/main`. А если вы ещё при этом находитесь на ветке `foo`, то её можно не указывать:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Как видно, второй способ указать слежение за веткой намного быстрее..."
            ],
            "afterMarkdowns": [
              "Словом, всё как и раньше, просто отдельная, специальная команда. Здорово!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Отлично! Для выполнения этого уровня давайте выполним push наших наработок в ветку `main` на удалённом репозитории, при этом *не* скачивая и не создавая ветку `main` локально. Я объясню вам оставшееся чуть позже, т.к. это продвинутый курс :P"
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
              "### リモートトラッキングブランチ",
              "",
              "もしかしたら直近の幾つかの章で、「魔法」の様に見えた現象があるかもしれません:gitが`main`ブランチは`o/main`に関連していることを知っていたということです。確かにこれらのブランチは似た名前を持っていて、リモートの`main`ブランチとローカルの`main`ブランチを繋ぐ論理的な意味を成すかもしれません。以下の2例がこれらブランチが明確に繋がっている事を示します:",
              "",
              "* プルの実行時は、コミットを`o/main`上にダウンロードし、`main`ブランチにそれを*マージ*します。マージのターゲットはこの繋がりから求められます。",
              "* プッシュの実行時は、`main`ブランチの作業はリモートの`main`ブランチにプッシュされます（その後に`o/main`によってローカルに反映されています）。プッシュ先の決定は、`main`と`o/main`の繋がりから求められます。",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## リモートトラッキング",
              "",
              "端的に言えば、`main`と`o/main`の繋がりの正体はそれぞれのブランチの\"remote traking\"というプロパティです。`main`ブランチは`o/main`に追跡するように設定されているのです。これは、`main`ブランチのための暗黙のプッシュ先と暗黙の取り込み先が存在することを意味します。",
              "",
              "特にそのような設定を行うコマンドを走らせていないのに、`main`ブランチにこのプロパティが設定されていたことに疑問を持つかもしれません。そう、gitによってリポジトリをクローンした時、gitはこのプロパティを自動的に設定してくれるのです。",
              "",
              "クローンしている間、gitはリモートブランチをリモートリポジトリのブランチ全てに対して作ります（`o/main`のように）。その後、リモート上でアクティブなブランチを追跡するローカルブランチを作成します。多くの場合それは`main`ブランチになります。",
              "",
              "gitのクローンが完了した時、一つのローカルブランチしか存在しません（なので、情報量に圧倒される事はありません）。しかし、全てのリモートのブランチを見ることもできるのです（もしあなたが十分な好奇心を持っていれば、ですが）。いわゆるwin-winの関係ですね！",
              "",
              "クローン中に次のような出力が表示されることの説明にもなりますね:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 自分でトラッキング元を設定できますか？",
              "",
              "はい、できます！`o/main`を追跡するブランチを作成できますし、そのブランチは`main`と同じ暗黙のプッシュ先とマージターゲットを持ちます。例えば`tottallyNotMain`という名前のブランチで`git push`を走らせ、リモートの`main`ブランチにプッシュするといったことができるということを意味しています！",
              "",
              "このプロパティを設定するには2つの方法があります。一つ目は、リモートブランチをリファレンスとして新しいブランチをチェックアウトするというものです。例えば",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "を実行する事で`totallyNotMain`という名前のブランチを新しく作り、`o/main`への追跡プロパティを設定します。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "説明は十分でしょう、デモを見ていきましょう！`foo`という名前の新しいブランチをチェックアウトし、リモートの`main`への追跡プロパティを設定してみます。"
            ],
            "afterMarkdowns": [
              "見ての通り、暗黙の取り込み先である`o/main`を使って`foo`ブランチを更新しました。`main`が更新されないことに注意してください！！"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "これは`git push`にも適用されます"
            ],
            "afterMarkdowns": [
              "わーお。全く違う名前がつけられているブランチですが、リモートの`main`に内容をプッシュできました。"
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 二番目の方法",
              "",
              "ブランチのリモートトラッキングを設定するもう一つの方法は、単に`git branch -u`オプションを使うというものです。例えば",
              "",
              "`git branch -u o/main foo`",
              "",
              "を実行する事で`foo`ブランチが`o/main`を追跡するように設定できます。もし、`foo`が現在チェックアウトしているブランチだった場合、以下のように省略することができます:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "もう一つの方法でリモートトラッキングを指定する様子を見てみましょう..."
            ],
            "afterMarkdowns": [
              "前回と一緒で、より明示的なコマンドですね。とてもいい感じです！"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "OK！このレベルでは、ローカルで`main`にチェックアウトしていない状態で、リモートの`main`ブランチに作業をプッシュしてみましょう。これは高度な課題ですから、理解するのに少し時間をおく必要があると言っておきます:P"
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
              "### 원격-추적 브랜치",
              "",
              "지난 몇개의 레슨에서 \"마법\"처럼 보일 수 있는게 하나 있었는데, git이 `main`브랜치가 `o/main`와 연관 되어있는걸 안다는 것입니다. 물론 이 두 브랜치가 이름이 비슷하기 때문에 로컬 `main`브랜치가 원격의 `main`브랜치와 연결 되어있다고 하자면 어찌 논리적으로 말이 되긴 합니다만..., 이 연결은 두가지 시나리오를 통해 뚜렷하게 확인이 됩니다:",
              "",
              "* pull 작업을 하는 도중, 커밋들은 `o/main`에 내려받아 지고 그다음 `main` 브랜치로 *merge*됩니다. merge에서 내재된 타겟은 이 연결에서 결정합니다.",
              "* push 작업을 하는 도중, `main` 브랜치의 작업은 원격의 `main`브랜치(로컬에서 `o/main`로 표현되는)로 push 됩니다. push의 *목적지*는 main와 `o/main`의 연결에서 결정됩니다.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 원격 추적",
              "",
              "간단히 말해서, 이 `main`와 `o/main`사이의 연결은 브랜치의 \"원격 추적\" 속성을 통해 간단하게 설명됩니다. `main`브랜치는 `o/main`브랜치를 추적하도록 설정되어 있습니다 -- 이것은 `main`가 merge와 push할 내재된 목적지가 생겼다는 뜻 입니다.",
              "",
              "여러분은 어떻게 이 속성을 지정해주는 그 어떤 명령어 없이 `main` 브랜치에 설정되있는지 궁금할것 입니다. 사실, 여러분이 git으로 저장소를 clone할때 이 속성이 여러분을 위해 자동으로 설정 됩니다.",
              "",
              "clone을 진행하면서 git은 원격 저장소에있는 모든 브랜치에 대해 로컬에 원격 브랜치를 생성합니다(`o/main`같은것들 말이죠). 그 후 원격 저장소에서 현재 active한 브랜치를 추적하는 로컬 브랜치를 생성합니다, 대부분의 경우 `main`가 됩니다.",
              "",
              "git clone이 완료되면, 여러분은 오로지 하나의 로컬 브랜치를 가지게 됩니다(부담스럽지 않도록) 물론 원격 저장소에있는 여러 다른 브랜치도 여전히 확인할 수 있습니다(호기심이 많으시다면). 로컬, 원격 저장소 양쪽에 최적화 되있는거죠!",
              "",
              "여러분이 clone을 할 때 아래의 명령어를 볼 수도 있는 이유입니다:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 내 스스로 지정할수도 있나요?",
              "",
              "당연하죠! 여러분은 아무 임의의 브랜치를 `o/main`를 추적하게 만들 수 있습니다. 이렇게 하면 이 브랜치 또한 내재된 push,merge 목적지를 `main`로 할 것입니다. 여러분은 이제 `totallyNotMain`라는 브랜치에서 `git push`를 수행해서 원격 저장소의 브랜치 `main`로 작업을 push할 수 있습니다!",
              "",
              "이 속성을 설정하는데에는 두가지 방법이 있습니다. 첫 번째는 지정한 원격 브랜치를 참조해서 새로운 브랜치를 생성하여 checkout 하는 방법 입니다. 다음을 실행하면",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "`totallyNotMain`라는 이름의 새 브랜치를 생성하고 `o/main`를 추적하게 설정합니다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "설명은 충분히 한듯 합니다. 직접 확인해 봅시다! `foo`라는 이름의 새 브랜치를 checkout하고 이것을 원격 저장소의 `main`를 추적하도록 설정하겠습니다."
            ],
            "afterMarkdowns": [
              "보이듯이, 우리는 `o/main`를 `foo` 브랜치를 갱신하기 위한 내재된 merge 타겟으로 사용하고 있습니다. main이 갱신되지 않는다는것을 눈치챘죠?"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "git push에도 적용이 됩니다"
            ],
            "afterMarkdowns": [
              "Boom. 브랜치의 이름을 전혀 다른것으로 지었는데도 불구하고 우리 작업이 `main`로 push 되었습니다."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 방법 #2",
              "",
              "브랜치에 원격 추적 설정을 하는 또 다른 방법으로는 간단하게 `git branch -u` 옵션을 사용하는 방법이 있습니다. 다음을 실행하면",
              "",
              "`git branch -u o/main foo`",
              "",
              "가 `foo` 브랜치가 `o/main`를 추적하도록 설정합니다. 만약 `foo`가 현재 작업하고 있는 브랜치라면 생략해도 됩니다:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "자 이 다른 방법이 작동하는 모습을 확인해 봅시다..."
            ],
            "afterMarkdowns": [
              "이전과 같습니다,  좀 더 분명하게 알 수 있는 명령어죠. 좋아요!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              " 이번 레벨에서는 로컬의 `main`브랜치가 아닌 다른 브랜치에서 작업을 원격 저장소의 `main`브랜치로 push하세요. 고급 과정이니 더 길게 설명하지는 않을게요 :p"
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
              "### Гілки віддаленого стеження",
              "",
              "Одна з речей в попередніх уроках, яка могла виглядати, наче \"магія\" -- це те, що гіт якось знає, що локальна гілка `main` відповідає віддаленій `o/main`. Звичайно, ці гілки мають схожі назви, і виглядає логічним співставити віддалену гілку `main` з локальною `main`, однак цей зв'язок найкраще видно в двох випадках:",
              "",
              "* Під час операції `pull`, коміти попадають в `o/main`, а вже потім *мерджаться* в локальний `main`. Гілка в яку відбудеться мердж якраз і визначається цим зв'язком.",
              "* Під час операції `push`, коміти з гілки `main` переносяться у віддалений `main` (який локально представлений як `o/main`). *Гілка-призначення* для `push` визначена зв'язком між `main` і `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Гілки віддаленого стеження",
              "",
              "В двох словах, цей зв'язок між `main` та `o/main` і є тим \"віддаленим стеженням\", визначеним для гілки. Гілка `main` налаштована стежити за `o/main` -- це визначає неявну ціль для мерджу і неявне призначення під час операції `push` для гілки `main`.",
              "",
              "Ви можете подумати, а як же такий зв'язок було встановлено, якщо я не виконував жодної команди? Ну, коли гіт клонує репозиторій, він встановлює цей зв'язок автоматично.",
              "",
              "Під час клонування гіт створює гілки для стеження за кожною гілкою віддаленого репозиторію (напр. `o/main`). Потім він створює локальну гілку, що пов'язана і стежить за активною гілкою у віддаленому репозиторії, яка в більшості випадків називається `main`.",
              "",
              "Після закінчення клонування у вас буде лише одна локальна гілка (щоб не перевантажувати) але ви можете переглянути всі віддалені гілки (якщо буде цікаво). Такий собі розумний компроміс!",
              "",
              "Це пояснює чому ви бачите наступне повідомлення під час клонування:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### А можу я сам вибирати?",
              "",
              "Так, можеш! Ти можеш вибрати довільну гілку, яка слідкуватиме за `o/main`, і тоді для цієї гілки `push` та `merge` автоматично працюватимуть з `main`. Це означає, що виконання `git push` в гілці з назвою `totallyNotMain` (зовсім не main) може зберегти локальні коміти у віддалену гілку `main`!",
              "",
              "Є два шляхи встановити такий зв'язок. Перший - створити нову гілку з явним вказанням зв'язку (за ким слідкувати). Виконання",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "створить гілку `totallyNotMain`, яка слідкує за `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Досить розмов, подивімось в дії! Створімо нову гілку `foo` і змусьмо її слідкувати за віддаленою гілкою `main`."
            ],
            "afterMarkdowns": [
              "Як видно з результату, при оновленні `foo` було використано автоматичний зв'язок з `o/main` під час операції `merge`. Зверніть увагу, `main` не було оновлено!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Це також справджується і для git push."
            ],
            "afterMarkdowns": [
              "Ка-бум!. Ми запушили наші зміни у віддалений `main`, незважаючи на те, що локальна гілка називалась зовсім по-іншому."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Спосіб №2",
              "",
              "Інший спосіб вказати за якою віддаленою гілкою слідкувати -- просто використовувати опцію `git branch -u`. Виконання",
              "",
              "`git branch -u o/main foo`",
              "",
              "змусить гілку `foo` слідкувати за `o/main`. Якщо `foo` є поточною гілкою, її можна навіть не вказувати:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Подивімось на цей спосіб швидко вказати віддалену гілку для відслідковування..."
            ],
            "afterMarkdowns": [
              "Як і перший спосіб, але своя окрема команда."
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Гаразд! На цьому рівні збережімо свою роботу у віддалену гілку `main` *без* переходу на локальну `main`. Про решту здогадайся сам, раз ти вже дойшов до цього рівня :P"
            ]
          }
        }
      ]
    },
    "vi": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Theo dõi nhánh từ xa",
              "",
              "Trong những bài học vừa qua có một điểu có vẻ như là \"ma thuật\" đó là Git lại biết được nhánh `main` có liên kết đến nhánh `o/main`. Dù các nhánh này có tên giống nhau và có vẻ hợp lý để kết nối nhánh `main` trên remote với nhánh `main` trên local, nhưng điều này được thể hiện rõ ràng qua hai tình huống sau:",
              "",
              "* Trong quá trình thực hiện thao tác kéo, các commit được tải xuống nhánh `o/main` và sau đó *hợp nhất* vào nhánh `main`. Mục tiêu hợp nhất dược ngầm định bởi kết nối này.",
              "* Trong quá trình thực hiện thao tác đẩy, thảnh quả trên nhánh `main` được đẩy lên nhánh `main` từ xa (sau đó được biểu thị bằng nhánh `o/main` ở kho chứa cục bộ). *Đích đến* của lệnh đẩy được xác định bằng kết nối giữa nhánh `main` và nhánh `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Theo dõi từ xa",
              "",
              "Nói tóm lại, kết nối giữa nhánh `main` và nhánh `o/main` đơn giản được giải thích bằng thuộc tính \"theo dõi từ xa\" (\"remote tracking\") của các nhánh. Nhánh `main` được thiết lập để theo dõi nhánh `o/main` -- Điều này có nghĩa là có điểm đến ngụ ý cho việc hợp nhất (merge) và đẩy lên (push) của nhánh `main`.",
              "",
              "Có thể bạn sẽ thắc mắc rằng tại sao thuộc tính này được thiết lập lên nhánh `main` trong khi bạn chẳng hề chạy một câu lệnh nào chỉ định điều này. Chà, khi bạn dùng Git để nhân bản kho chứa, thì thuộc tính này đã được tự động thiết lập cho bạn rồi. ",
              "",
              "Trong quá trình thực hiện nhân bản, Git tạo ra nhánh từ xa trên kho chứa cục bộ cho tất cả các nhánh trên kho chứa từ xa (các nhánh như `o/main`). Sau đó nó sẽ tạo một nhánh cục bộ theo dõi nhánh hoạt động hiện tại của kho chứa từ xa, đa phần các trường hợp là nhánh `main`.",
              "",
              "Một khi quá trình nhân bản hoàn thành, bạn sẽ chỉ có một nhánh cục bộ (để bạn không thấy quá tải) nhưng bạn có thể thấy tất cả các nhánh trên kho chứa từ xa (phòng trường hợp bạn thấy tò mò). Đây là phương án tối ưu!",
              "",
              "Điều này giải thích việc sau khi nhân bản bạn có thể thấy dòng lệnh sau xuất hiện:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Tôi có thể tự chỉ định chứ?",
              "",
              "Tất nhiên là được chứ! Bạn có thế khiến bất kỳ nhánh nào theo dõi nhánh `o/main`, và nếu bạn làm vậy, nhánh đó sẽ được được chỉ định đích của lệnh đẩy và mục tiêu hợp nhất giống như nhánh `main`. Điều này có nghĩa là bạn có thể chạy lệnh `git push` trên nhánh có tên là `totallyNotMain` và thành quả của bạn sẽ được đẩy lên nhánh `main` ở kho chứa từ xa!",
              "",
              "Có 2 cách để thiết lập thuộc tính này. Cách đầu tiên là chuyển sang một nhánh mới từ một nhánh từ xa bằng cách thực hiện",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "Tạo ra một nhánh mới `totallyNotMain` và thiết lập cho nó theo dõi nhánh `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Nói vậy là đủ rồi, hãy xem thử một mô tả nào! Ta sẽ chuyển sang một nhánh tên là `foo` và thiết lập cho nó theo dõi nhánh `main` trên kho chứa từ xa."
            ],
            "afterMarkdowns": [
              "Như bạn đã thấy, chúng tôi đã sử dụng mục tiêu ngầm `o / main` để cập nhật nhánh `foo`. Để ý rằng nhánh `main` không được cập nhật!!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Điều này cũng được áp dụng cho lệnh git push."
            ],
            "afterMarkdowns": [
              "Bùùm. Ta đã đẩy thành quả lên nhánh `main` ở kho chứa tù xa mặc dù nhánh của ta có tên hoàn toàn khác biệt"
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Cách thứ #2",
              "",
              "Cách khác để thiết lập theo dõi trên một nhánh đó là sử dụng lệnh `git branch -u`. Thực hiện",
              "",
              "`git branch -u o/main foo`",
              "",
              "sẽ thiết lập nhánh `foo` theo dõi nhánh `o/main`. Nếu nhánh `foo` đang được `HEAD` trỏ tới bạn có thể bỏ tham số này:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hãy xem thử cách này để thiết lập theo dõi..."
            ],
            "afterMarkdowns": [
              "Y hệt như trước, nhưng biểu hiện rõ ràng hơn. Tuyệt!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Được rồi! Ở cấp độ này hãy để thành quả lên nhánh `main` trên kho lưu trữ từ xa mà không chuyển sang nhánh `main` tại kho chứa cục bộ. Hãy tự tìm ra cách nhé, giờ là khóa học nâng cao rồi :P"
            ]
          }
        }
      ]
    },
    "sl_SI": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Sledenje oddaljenih branchev",
              "",
              "Stvar, ki se je morda zdela \"čarobna\" v zadnjih lekcijah je, da je git vedel, da je `main` branch povezan z `o/main`. Seveda imata brancha podobno ime in morda deluje logično, da se poveže `main` branch na oddaljenem repotu z lokalnim `main` branchem, toda ta povezava je jasno predstavljena v dveh scenarijih:",
              "",
              "* Med pull operacijo so commiti preneseni na `o/main` in nato *zmergani* v `main` branch. Implicirana tarča merga je določena iz te povezave.",
              "* Med push operacijo je delo iz `main` brancha naloženo na oddaljen `main` branch (ki je bil prej predstavljen kot `o/main` lokalno). *Destinacija* pusha je določena iz povezave med `main` in `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Sledenje oddaljenega repota",
              "",
              "Če povzamem, ta povezava med `main` in `o/main` je preprosto razložena z lastnostnjo \"oddaljenega sledenja\" branchev. `main` branch je nastavljen, da sledi `o/main` -- to pomeni, da obstaja impliciran cilj merga in impliciran cilj pusha za `main` branch.",
              "",
              "Morda se sprašuješ, kako se je nastavila ta lastnost na `main` branchu, čeprav nisi izvedel nobenega ukaza za to. No, ko kloniraš repo z gitom, je ta lastnost v bistvu nastavljena zate avtomatično. ",
              "",
              "Med kloniranjem git ustvari oddaljen branch za vsak branch na oddaljenem repotu (branchi kot `o/main`). Nato ustvari lokalen branch, ki sledi trenutno aktivnemu branchu na oddaljenem repotu, ki je v večini primerov `main`.",
              "",
              "Ko git clone zaključi, imaš samo en lokalen branch (da nisi zasipan), ampak lahko vidiš vse različne branche na oddaljenem repotu (če si zelo radoveden). Najboljše iz obeh svetov!",
              "",
              "To tudi razloži, zakaj lahko vidiš sledeč izpis ukaza med kloniranjem:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Ali ga lahko določim sam?",
              "",
              "Seveda se da! Narediš lahko, da bilokateri branch sledi `o/main`. V tem primeru bo imel ta branch enak impliciran cilj za push in merge kot `main`. To pomeni, da lahko poženeš `git push` na branchu poimenovanem `splohNiMain` in pushas svoje delo na `main` branch na oddaljenem repotu!",
              "",
              "Obstajata dva načina, da nastaviš to lastnost. Prvi je, da checkoutaš nov branch z uporabo oddaljenega brancha kot določeno referenca. Izvedba",
              "",
              "`git checkout -b splohNiMain o/main`",
              "",
              "Ustvari nov branch imenovan `splohNiMain` in nastavi, da sledi `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Dovolj besedičenja, poglejmo primer! Checkoutali bomo nov branch poimenovan `foo` in ga nastavili, da sledi `main` na oddaljenem repotu."
            ],
            "afterMarkdowns": [
              "Kot lahko vidiš, smo uporabili impliciran cilj mergea `o/main`, da posodobi `foo` branch. Opazi, kako se main ne posodobi!!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "To velja tudi za git push."
            ],
            "afterMarkdowns": [
              "Boom. Naše delo smo naložili na `main` na oddaljenem repotu, čeprav je ime našega brancha nekaj povsem drugega."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Način #2",
              "",
              "Še en način, da se nastavi oddaljeno sledenje na branchu, je, da se uporabi `git branch -u` opcija. Izvedba",
              "",
              "`git branch -u o/main foo`",
              "",
              "bo nastavila `foo` branch, da sledi `o/main`. Če je `foo` trenutno checkoutan, ga lahko celo izpustiš",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Poglejmo si na hitro še ta drug način določanja oddaljenega sledenja ..."
            ],
            "afterMarkdowns": [
              "Enako kot prej, le bolj natančno. Lepa!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! Za to stopnjo pushajmo delo na `main` branch na oddaljenem repotu, medtem ko lokalno *nismo* na `masterju`. Ostalo prepustim tebi, ker je to vseeno napredna stopnja :P"
            ]
          }
        }
      ]
    },
    "ta_IN": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### தூரத்திலுள்ள கிளையை கண்காணித்தல்",
              "",
              "கடந்த சில பாடங்களில் கிட் `main` மற்றும் `o/main` தொடர்பை கிட் அறிந்திருந்தது ஒரு  \"தந்திரம் போன்று\" தோன்றி இருக்கலாம்.  நிச்சயமாக இரு கிளைகளுக்கும் ஒத்த பெயர்கள் உள்ளன, மேலும் தொலைதூரத்தில் உள்ள  `main` கிளையை நமது கணினில் உள்ள  `main` கிளையுடன் இணைக்க இது சரியான காரணமாக தெரியலாம், ஆனால் இந்த இணைப்பு இரண்டு காரணிகளில் தெளிவாக நிரூபிக்கப்பட்டுள்ளது:",
              "",
              "* புல் செயல்பாட்டின் போது, கமிட்ஸ் `o/main` மீது பதிவிறக்கம் செய்யப்பட்டு `main` உடன் *ஒன்றிணைக்கப்படுகின்றது *.  கிளைகளுக்கு இடையிலான இணைப்பின் மறைமுக இலக்கு இந்த தொடர்பினால்  தீர்மானிக்கப்படுகிறது.",
              "* புஸ் செயல்பாட்டின் பொது, `main` கிளையில் உள்ள மாற்றங்கள் தூரத்திலுள்ள `main` கிளைக்கு தள்ளப்படிகிரது (அது பின்னர் `o/main` என்று நம்மிடத்தில் குறித்துக்காட்டப்படும்).`main` மற்றும் `o/main` இடையிலான தொடர்பினை பொருத்து புஸ் செயலின் இலக்கு தீர்மானிக்கப்படுகிறது.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## தொலைதூர இலக்கை கண்காணித்தல்",
              "",
              "சுருக்கமாக கூரினால், `main` மற்றும் `o/main` இடையிலான தொடர்பு  \"remote tracking\" குணத்தினால் விளக்கப்பட்டுகிறது. `main` கிளை `o/main` கிளையை கண்காணிக்குமாரு  அமைக்கப்பட்டுள்ளது  -- என்றால் இணைப்பிற்க்கான இலக்கும் புஸ்க்கான இலக்கும் மறைமுகமாக குறிக்கப்பட்டுள்ளது.",
              "",
              "எந்த ஓரு கட்டளையும் கொடுக்கப்படாமல் இந்த குணம் எப்படி  கிடைத்தது  என்ற குழப்பன் வேண்டாம்,  அது நீங்கள் ஒரு களஞ்சியத்தை நகல் எடுக்கும் போது  தானாக பொறுத்த படுகிறது. ",
              "",
              "நகல் எடுக்கும் பொலுது, கிட் தூரத்திலுள்ள கிளைகளுக்கும் ஒரு கிளையை உருவாக்குகிறது (`o/main` கிளையை போன்று).  பின்பு அது தூரத்தில் நடைமுறையில் உள்ள கிளையை கண்காணிக்கும் படி ஒரு கிளையை நமது இடத்தில் உருவாக்கும், அது பொதுவாக `main`ஆக இருக்கும்.",
              "",
              "நகால் எடுத்த பின்பு, நம்மிடம் உள்ள கிளை மட்டும் மீதம் இருக்கும் (எனவே நீங்கள் அதிகபடியாக எதையும் பெரவில்லை) ஆயினும் தேவைப்பட்டால் நீங்கள் தூரத்தில் உள்ள அனைத்து கிளைகளையும் காணலாம்.  இது இரு நிளைககளிலும் சிறந்தது!",
              "",
              "இதுதான் பின் வரும் கட்டளை நகல் எடுக்கும் போது பதிவு செயப்படுவதன் காரனம்:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### இதை நானே குறிப்பிட முடியுமா?",
              "",
              "ஆமாம் கண்டிப்பாக!  உங்களால் எந்த ஒரு கிளையையும் `o/main` கண்காணிக்கும் படி அமைக்க முடியும், அப்படி செய்தால் அதிலும் இணைப்பிற்க்கான இலக்கு மற்றும்  புஸ்க்கான இலக்கு் இரண்டும் மறைமுகமாக `main`ஐ குறிக்கும் படி இருக்கும்.  அதலான் `totallyNotMain` கிளையில் செய்யப்படும் `git push` தூரத்தில் உள்ள `main` கிளையில் மாற்றங்களை இணைத்துவிடும்.",
              "",
              "இதனை இரண்டு வகையாக செய்யலாம். முதலாவதாக புதிய கிளையை பின் வரும் கட்டளை கொண்டு பதிப்பித்தல்",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "அல்லது `totallyNotMain` என்ற கிளையை உருவாக்கி `o/main` கண்காணிக்கு படி அமைத்தல்."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "விளக்கங்கள் போதும், இப்போது செயல்முறையை காண்போம்! `foo` கிளையை `main` கண்காணிக்கு படி பதிப்பிப்போம்."
            ],
            "afterMarkdowns": [
              "நீங்கள் பார்ப்பதை போன்று, `foo` கிளை `o/main`ஐ மறைமுக இணை்ப்பு இல்க்காக அமைக்கப்பட்டுள்ளது.  எவ்வளவு `main` புதுப்பிக்கப்படவில்லை என்பதை நினைவில் கொள்க!!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "கிட் புஸ்-ஐயும் செயல் படுத்துங்கள்."
            ],
            "afterMarkdowns": [
              "சிரப்பு. நமது  கிளைக்கு முற்றிலும் வேறுபட்ட பெயரிடப்பட்டிருந்தாலும், நமது மாற்றங்களை தொலைதூரத்தில் உள்ள `main`தள்ளினோம்."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### வழி #2",
              "",
              "தூரத்திலுள்ள கிளையை கண்காணிக்கும் மற்றும் ஒரு முறை `git branch -u`ஐ பயன்படுத்துவது.  பின்வருமாரு கட்டளையிட்டு",
              "",
              "`git branch -u o/main foo`",
              "",
              "இது `foo` `o/main`ஐ கண்காணிக்கும் படி செய்யும்.  `foo` ஏற்க்கனவே பதிப்பிட பட்டு இருந்தால் அதையும் நீ்ங்கள் உள்ளீடாக தர அவசியம் இல்லை:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "இப்போது இந்த இரண்டாவது முறையை விரைவாக காண்போம்..."
            ],
            "afterMarkdowns": [
              "முன்பு குறிப்பிட்டது போன்றுதான், மேலும் சற்று வெளிப்படையன கட்டளையாக!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "சரி! இந்த நிலைக்கு நாம் தூரத்தில் உள்ள `main` கிளைக்கு அதனை பதிப்பிடாமல் மாற்றங்களை தள்ளுவோம்.  இது உயர்நிலை பாட பகுதி என்பதால் அதை எவ்வாரு செய்யலாம் என்பது உங்களிடமெ விட்டு விடுகின்றேன் :P"
            ]
          }
        }
      ]
    },
    "pl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Gałęzie śledzące",
              "",
              "Może ci się wydawać od kilku lekcji, że Git jakoś \"magicznie\" wie, że gałąź `main` jest powiązana z `o/main`. Co prawda nazwy tych gałęzi są podobne i, logicznie rzecz biorąc, `main` na zdalnym repo można skojarzyć z lokalną gałęzią `main`, ale na dwóch przykładach pokażemy, jak to działa w rzeczywistości:",
              "",
              "* Podczas operacji pull commity są pobierane do `o/main`, a następnie za pomocą *merge* scalane z gałęzią `main`. Na podstawie tego połączenia określa się pośrednio cel scalania.",
              "* Podczas operacji push praca z gałęzi `main` jest wypychana do zdalnej gałęzi `main` (lokalnie reprezentowanej przez `o/main`). *Cel* polecenia push jest określony przez połączenie pomiędzy `main` a `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote tracking",
              "",
              "Żeby nie przedłużać: połączenie pomiędzy `main` i `o/main` da się wyjaśnić po prostu jedną z właściwości gałęzi: \"remote tracking\". Gałąź `main` ma ustawione śledzenie gałęzi `o/main` -- a to oznacza, że dla operacji merge i push określony jest domyślny cel.",
              "",
              "Może się zastanawiasz, jak to się stało, że `main` ma już ustawione śledzenie, skoro nie robiliśmy tego żadnym poleceniem. Otóż, kiedy klonujesz repozytorium w Gicie, ta właściwość jest ustawiana za ciebie automatycznie. ",
              "",
              "Przy klonowaniu Git tworzy zdalną gałąź dla każdej z gałęzi zdalnego repozytorium (czyli gałęzie takie jak `o/main`). Następnie tworzy lokalną gałąź, która śledzi aktualnie aktywną gałąź na zdalnym repo - czyli najczęściej `main`.",
              "",
              "Po zakończeniu klonowania lokalnie masz tylko jedną gałąź (żeby nie zawracać sobie niepotrzebnie głowy), ale możesz zobaczyć wszystkie gałęzie na zdalnym repozytorium (jeśli aż tak cię to ciekawi). To idealne dwa w jednym!",
              "",
              "A przy okazji to wyjaśnia, dlaczego przy klonowaniu możesz zobaczyć:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### A czy mogę to określić samodzielnie?",
              "",
              "Jasne, że tak! Możesz kazać dowolnej gałęzi śledzić `o/main`, i w takim wypadku będzie miała taki sam domyślny cel operacji push i merge co `main`. To znaczy, że możesz zrobić `git push` na gałęzi o nazwie `totallyNotMain`, a twoja praca i tak zostanie wypchnięta do gałęzi `main` w zdalnym repozytorium!",
              "",
              "Są dwa sposoby ustawienia tej właściwości. Pierwszym jest checkout nowej gałęzi wykorzystujący zdalną gałąź jako określoną referencję. Polecenie",
              "",
              "`git checkout -b totallyNotMain o/main`",
              "",
              "tworzy nową gałąź o nazwie `totallyNotMain` i każe jej śledzić `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Dość gadania, pora zobaczyć, jak to działa! Będziemy checkoutować nową gałąź o nazwie `foo` i każemy jej śledzić `main` na zdalnym repozytorium."
            ],
            "afterMarkdowns": [
              "Jak widzisz, użyliśmy domyślnego celu scalania `o/main`, żeby zaktualizować gałąź `foo`. Zwróć uwagę, że `main` się nie aktualizuje!!!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Dotyczy to również git push."
            ],
            "afterMarkdowns": [
              "Tadam! Wypchnęliśmy naszą pracę do `main` na `remote`, mimo że nasza gałąź nazywała się zupełnie inaczej."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Sposób #2",
              "",
              "Inny sposób na ustawienie remote tracking na branchu to po prostu użycie opcji `git branch -u`. Polecenie",
              "",
              "`git branch -u o/main foo`",
              "",
              "spowoduje, że gałąź `foo` będzie śledzić `o/main`. Jeśli aktualnie wybraną gałęzią jest `foo`, to możesz nawet pominąć jej nazwę:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Spójrzmy jeszcze szybko, jak to wygląda w praktyce..."
            ],
            "afterMarkdowns": [
              "Tak samo jak poprzednio, tylko wyraźniej, widać to w poleceniu. Pięknie!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Oki! Na tym poziomie wypchnijmy (push) pracę do gałęzi `main` na zdalnym repozytorium, *nie* checkoutując `main` lokalnie. Wymyśl samodzielnie, jak to zrobić. To przecież zaawansowana część kursu :P"
            ]
          }
        }
      ]
    },
    "it_IT": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Rami che tracciano il remoto",
              "",
              "Una cosa che può esser sembrata \"magica\" riguardo le ultime lezioni è come git sapesse che il ramo `main` fosse connesso a `o/main`. Certo questi rami hanno dei nomi simili e avrebbe senso collegare il ramo `main` sul repository remoto al ramo `main` locale, ma questa connessione è chiaramente dimostrata in due scenari:",
              "",
              "* Durante un'operazione di pull, i commit sono scaricati su `o/main` e poi *fusi* al ramo `main`. Il destinatario del merge è determinato da questa connessione.",
              "* Durante un'operazione di push, il lavoro proveniente dal ramo `main` è stato caricato sul ramo `main` remoto (rappresentato localmente da `o/main`). La *destinazione* del push è determinata dalla connessione tra `main` e `o/main`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Tracciamento remoto",
              "",
              "Per farla breve, questa connessione tra `main` e `o/main` viene spiegata facilmente dalla proprietà di \"tracciamento remoto\" dei rami. Il ramo `main` è impostato per tracciare `o/main` -- questo significa che sono presenti un destinatario implicito della fusione e una destinazione implicita del push per il ramo `main`.",
              "",
              "Potresti chiederti come questa proprietà è stata impostata sul ramo `main` quando tu non hai eseguito alcun comando per specificarlo. Quando cloni un repository con git, questa proprietà viene impostata automaticamente.",
              "",
              "Durante un clone, git crea un ramo remoto per ciascun ramo presente sul repository remoto (aka rami come `o/main`). Crea poi un ramo locale che traccia il ramo attivo al momento sul remoto, che risulta essere `main` nella maggior parte dei casi.",
              "",
              "Una volta terminato git clone, di questi rimane solo un ramo locale (per non sovraccaricarti) ma puoi vedere tutti i vari rami presenti sul remoto (in caso tu fossi curioso). È come prendere due piccioni con una fava!",
              "",
              "Questo spiega inoltre perché potresti ricevere questo output durante la clonazione:",
              "",
              "    local branch \"main\" set to track remote branch \"o/main\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Posso specificarlo io?",
              "",
              "Sì che puoi! Puoi decidere arbitrariamente di far tracciare a qualsiasi ramo `o/main`, e se lo fai, quel ramo avrà le stesse destinazioni implicite per push e merge di `main`. Ciò significa che puoi eseguire `git push` su un ramo chiamato `perNienteIlMain` e vedere il tuo lavoro caricato sul ramo `main` nel repository remoto!",
              "",
              "Ci sono due modi per impostare questa proprietà. Il primo è creare il nuovo ramo tramite checkout specificando un ramo remoto come riferimento. Eseguire",
              "",
              "`git checkout -b perNienteIlMain o/main`",
              "",
              "Crea un nuovo ramo chiamato `perNienteIlMain` e lo imposta a tracciare `o/main`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Abbiamo parlato abbastanza, vediamo una dimostrazione! Creeremo tramite checkout un nuovo ramo chiamato `foo` e verrà impostato a tracciare `main` sul remoto."
            ],
            "afterMarkdowns": [
              "Come puoi vedere, abbiamo usato il destinatario implicito di `o/main` per aggiornare il ramo `foo`. Se vedi il main non è stato aggiornato!!"
            ],
            "command": "git checkout -b foo o/main; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lo stesso vale per git push."
            ],
            "afterMarkdowns": [
              "Boom. Abbiamo caricato il nostro lavoro al ramo `main` sul repository remoto nonostante il nostro ramo avesse un nome totalmente diverso."
            ],
            "command": "git checkout -b foo o/main; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Way #2",
              "",
              "Un altro modo per impostare il tracciamento remoto su un ramo è tramite l'opzione `git branch -u`. Eseguire",
              "",
              "`git branch -u o/main foo`",
              "",
              "imposterà il ramo `foo` a tracciare `o/main`. Se stiamo attualmente lavorando su `foo` possiamo ometterlo:",
              "",
              "`git branch -u o/main`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vediamo al volo quest'altro metodo per specificare il tracciamento remoto..."
            ],
            "afterMarkdowns": [
              "Come prima, solo tramite un comando più esplicito. Bene dai!"
            ],
            "command": "git branch -u o/main foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! Per qusto livello carica del lavoro sul ramo `main` del remoto mentre *non* sei attualmente sul ramo `main` locale. Al resto devi arrivarci tu, d'altronde questo è il corso avanzato :P"
            ]
          }
        }
      ]
    }
  }
};
