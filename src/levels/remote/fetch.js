exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"o/main\":{\"target\":\"C5\",\"id\":\"o/main\"},\"o/bugFix\":{\"target\":\"C7\",\"id\":\"o/bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C6\":{\"parents\":[\"C3\"],\"id\":\"C6\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C5\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C7\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C3\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git fetch",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"o/main\":{\"target\":\"C2\",\"id\":\"o/main\"},\"o/bugFix\":{\"target\":\"C3\",\"id\":\"o/bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C5\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C7\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C3\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git Fetchin'",
    "fr_FR": "Git fetch",
    "de_DE": "Git Fetch",
    "ja": "Git Fetch",
    "es_AR": "git fetch",
    "es_MX": "Git fetch",
    "es_ES": "git fetch",
    "pt_BR": "Git Fetch",
    "gl": "Git Fetch",
    "zh_CN": "Git Fetch",
    "zh_TW": "git fetch",
    "ru_RU": "Git fetch",
    "uk": "Git fetch",
    "ko": "Git Fetch",
    "vi": "Git Fetch",
    "sl_SI": "Git Fetch",
    "pl": "Git fetch",
    "it_IT": "Git Fetch"
  },
  "hint": {
    "en_US": "just run git fetch!",
    "fr_FR": "Exécuter juste git fetch",
    "de_DE": "Einfach git fetch ausführen!",
    "ja": "単にgit fetchを実行！",
    "es_AR": "Simplemente ¡hacé git fetch!",
    "es_MX": "Simplemente ¡escribe git fetch!",
    "es_ES": "Simplemente ¡escribe git fetch!",
    "pt_BR": "Simplesmente chame git fetch!",
    "gl": "¡Sinxelamente fai git fetch!",
    "zh_CN": "只需要运行 git fetch 命令!",
    "zh_TW": "只要下 git fetch 指令",
    "ru_RU": "Просто выполните git fetch!",
    "uk": "Просто виконай git fetch!",
    "ko": "그냥 git fetch를 하세요!",
    "vi": "Gõ git fetch là được!",
    "sl_SI": "Le izvedi git fetch!",
    "pl": "Po prostu uruchom git fetch!",
    "it_IT": "Semplicemente git fetch!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Fetch",
              "",
              "Working with git remotes really just boils down to transferring data _to_ and _from_ other repositories. As long as we can send commits back and forth, we can share any type of update that is tracked by git (and thus share work, new files, new ideas, love letters, etc.).",
              "",
              "In this lesson we will learn how to fetch data _from_ a remote repository -- the command for this is conveniently named `git fetch`.",
              "",
              "You'll notice that as we update our representation of the remote repository, our _remote_ branches will update to reflect that new representation. This ties into the previous lesson on remote branches."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Before getting into the details of `git fetch`, let's see it in action! Here we have a remote repository that contains two commits that our local repository does not have."
            ],
            "afterMarkdowns": [
              "There we go! Commits `C2` and `C3` were downloaded to our local repository, and our remote branch `o/main` was updated to reflect this."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### What fetch does",
              "",
              "`git fetch` performs two main steps, and two main steps only. It:",
              "",
              "* downloads the commits that the remote has but are missing from our local repository, and...",
              "* updates where our remote branches point (for instance, `o/main`)",
              "",
              "`git fetch` essentially brings our _local_ representation of the remote repository into synchronization with what the _actual_ remote repository looks like (right now).",
              "",
              "If you remember from the previous lesson, we said that remote branches reflect the state of the remote repositories _since_ you last talked to those remotes. `git fetch` is the way you talk to these remotes! Hopefully the connection between remote branches and `git fetch` is apparent now.",
              "",
              "`git fetch` usually talks to the remote repository through the Internet (via a protocol like `http://` or `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### What fetch doesn't do",
              "",
              "`git fetch`, however, does not change anything about _your_ local state. It will not update your `main` branch or change anything about how your file system looks right now.",
              "",
              "This is important to understand because a lot of developers think that running `git fetch` will make their local work reflect the state of the remote. It may download all the necessary data to do that, but it does _not_ actually change any of your local files. We will learn commands in later lessons to do just that :D",
              "",
              "So at the end of the day, you can think of running `git fetch` as a download step."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish the level, simply `git fetch` and download all the commits!"
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
              "## Git Fetch",
              "",
              "Travailler avec les dépôts Git distants se résume en pratique à transférer nos données _depuis_ et _vers_ ces autres dépôts. Etant donné que nous pouvons envoyer des commits en avance et en retard, nous pouvons partager tous les types de mises à jour qui sont gérés par Git (et donc partager notre travail, de nouveaux fichiers, de nouvelles idées, des lettres d'amour, etc.).",
              "",
              "Dans cette leçon nous allons apprendre comment rapporter (fetch) des données _depuis_ un dépôt distant vers le nôtre : la commande pour cela est astucieusement dénommée `git fetch`.",
              "",
              "Vous allez remarquer qu'au moment où nous mettons à jour notre version du dépôt distant, nos branches _distantes_ vont se mettre à jour pour refléter cette nouvelle représentation. Cela est lié à la leçon précédente sur les branches distantes."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Avant d'entrer dans les détails de `git fetch`, voyons-le en action ! Ici nous avons un dépôt distant qui contient deux commits que notre dépôt local n'a pas."
            ],
            "afterMarkdowns": [
              "Voilà ! Les commits `C2` et `C3` ont été téléchargés dans notre dépôt local, et notre branche distante `o/main` a été mise à jour pour refléter cela."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Ce que fetch fait",
              "",
              "`git fetch` procède en deux étapes principales, ni plus ni moins. Cela :",
              "",
              "* télécharge les commits que le dépôt distant possède mais qui ne sont pas dans le nôtre, puis...",
              "* met à jour nos branches distantes (par exemple, `o/main`).",
              "",
              "`git fetch` prend en fait notre représentation _locale_ du dépôt distant pour la synchroniser avec ce à quoi le dépôt distant ressemble _réellement_ (à ce moment-là).",
              "",
              "Si vous vous rappelez de la précédente leçon, nous avons dit que les branches distantes reflètent l'état du dépôt distant _depuis_ la dernière fois où vous avez parlé à ces branches distantes. `git fetch` est le moyen de parler à ces branches distantes ! La relation entre `git fetch` et les branches distantes devrait vous sembler claire maintenant.",
              "",
              "`git fetch` contacte le dépôt distant par Internet (via un protocole comme `http://` ou `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Ce que fetch ne fait pas",
              "",
              "`git fetch`, cependant, ne change rien à _votre_ état local. Il ne met pas à jour votre branche `main` et ne va pas changer quelque chose aux fichiers qui se trouvent actuellement dans votre répertoire de travail.",
              "",
              "C'est important à comprendre car beaucoup de développeurs pensent qu'exécuter `git fetch` va mettre leur dépôt local dans le même état que le distant. Cela peut télécharger toutes les données nécessaires pour le faire, mais cela ne change en réalité _rien_ sur vos fichiers locaux. Les prochains niveaux seront justement dédiés aux commandes qui permettent de le faire :D",
              "",
              "Finalement, vous pouvez vous représenter `git fetch` comme une étape de téléchargement."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour finir ce niveau, exécuter simplement `git fetch` et téléchargez tous les commits !"
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
              "## Git Fetch",
              "",
              "Trabajar con remotos en git en realidad se reduce a transferir datos _de_ y _hacia_ otros repositorios. Mientras podamos mandar commits de un lado al otro, podemos compartir cualquier tipo de actualización registrada por git (y, por ende, compartir trabajo, archivos nuevos, ideas nuevas, cartas de amor, etc).",
              "",
              "En esta lección aprenderemos cómo traer (hacer `fetch`) datos _desde_ un repositorio remoto - el comando para esto se llama, convenientemente, `git fetch`).",
              "",
              "Vas a notar que a medida que actualicemos nuestra representación de nuestro repositorio remoto, nuestras ramas _remotas_ van a actualizarse para reflejar esa nueva representación. Esto está ligado a la lección anterior sobre ramas remotas."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Antes de entrar en los detalles de `git fetch`, veámoslo en acción. Acá tenemos un repositorio remoto que contiene dos commits que nuestro repositorio local no tiene."
            ],
            "afterMarkdowns": [
              "¡Ahí vamos! Bajamos los commits `C2` y `C3` a nuestro repositorio local, y nuestra rama remota `o/main` fue actualizada para reflejar este cambio."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué hace fetch?",
              "",
              "`git fetch` hace dos simples pasos, y sólo dos simples pasos:",
              "",
              "* baja los commits que el remoto tiene pero no están en nuestro repositorio local, y...",
              "* actualiza a dónde apuntan nuestras ramas remotas (por ejemplo, `o/main`)",
              "",
              "`git fetch` esencialmente sincroniza nuestra representación _local_ del repositorio remoto con el _verdadero_ estado del repositorio remoto (en este momento).",
              "",
              "Si recordás la lección anterior, dijimos que las ramas remotas reflejan el estado de los repositorios remotos _desde_ la última vez que hablaste con ellos. ¡`git fetch` es la manera en que hablás con esos remotos! Espero que ahora esté clara la conexión entre las ramas remotas y `git fetch`.",
              "",
              "Usualmente, `git fetch` habla con el repositorio a través de internet (usando un protocolo como `http://` o `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué *no* hace fetch?",
              "",
              "Sin embargo, `git fetch` no modifica en absoluto _tu_ estado local. No va a actualizar tu rama `main` ni va a cambiar nada sobre cómo se ve tu sistema de archivos en este momento.",
              "",
              "Es importante entender esto, porque un montón de desarrolladores piensan que correr `git fetch` hará que su estado local refleje el estado del remoto. `git fetch` puede descargar los datos necesarios para hacerlo, pero *no* cambia ninguno de tus archivos locales. Vamos a aprender otros comandos para hacer eso más adelante :D",
              "",
              "Entonces, después de todo, podés pensar a `git fetch` como un paso de descarga."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente corré `git fetch` y bajate todos los commits."
            ]
          }
        }
      ]
    },
    "es_MX": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Fetch",
              "",
              "Trabajar con remotos en git en realidad se reduce a transferir datos _de_ y _hacia_ otros repositorios. Mientras podamos mandar commits de un lado a otro, podemos compartir cualquier tipo de actualización monitoreada por git (y, por lo tanto, compartir trabajo, archivos nuevos, ideas nuevas, cartas de amor, etc.).",
              "",
              "En esta lección vamos a aprender cómo traer datos _desde_ un repositorio remoto - el comando para esto se llama, `git fetch`.",
              "",
              "Vas a notar que a medida que actualicemos nuestra representación del repositorio remoto, nuestras ramas _remotas_ van a actualizarse para reflejar esa nueva representación. Esto va ligado a la lección anterior sobre ramas remotas."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Antes de entrar en los detalles de `git fetch`, veámoslo en acción. Aquí tenemos un repositorio remoto que contiene dos commits que nuestro repositorio local no tiene."
            ],
            "afterMarkdowns": [
              "¡Ahí está! Descargamos los commits `C2` y `C3` a nuestro repositorio local, y nuestra rama remota `o/main` fue actualizada para reflejar este cambio."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué hace fetch?",
              "",
              "`git fetch` hace principalmente dos pasos, y sólo esos dos pasos:",
              "",
              "* descarga los commits que el remoto tiene pero no están en nuestro repositorio local, y...",
              "* actualiza a dónde apuntan nuestras ramas remotas (por ejemplo, `o/main`)",
              "",
              "`git fetch` escencialmente pone nuestra representación _local_ del repositorio remoto en sincronía con el _verdadero_ estado del repositorio remoto (en ese momento).",
              "",
              "Si recuerdas la lección anterior, dijimos que las ramas remotas reflejan el estado de los repositorios remotos _desde_ la última vez que te comunicaste con ellos. ¡`git fetch` es la manera con la que te comunicas con esos remotos! Espero que la relación entre las ramas remotas y `git fetch` sea evidente ahora.",
              "",
              "`git fetch` usualmente habla con el repositorio remoto a través de internet (mediante un protocolo como `http://` o `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué *no* hace fetch?",
              "",
              "Sin embargo, `git fetch` no modifica en nada _tu_ estado local. No va a actualizar tu rama `main` ni va a cambiar nada sobre cómo se ve tu sistema de archivos en ese momento.",
              "",
              "Es importante entender esto, porque un montón de desarrolladores piensan que correr `git fetch` hará que su trabajo local refleje el estado del remoto. Puede que `git fetch` descargue los datos necesarios para hacerlo, pero realmente *no* cambia ninguno de tus archivos locales. Vamos a aprender otros comandos para hacer eso más adelante. :D",
              "",
              "Así que, a fin de cuentas, puedes imaginar a `git fetch` como un proceso de descarga."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente ejecuta `git fetch` y descarga todos los commits."
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
              "## Git Fetch",
              "",
              "Trabajar con remotos en git en realidad se reduce a transferir datos _de_ y _hacia_ otros repositorios. Mientras podamos mandar commits de un lado al otro, podemos compartir cualquier tipo de actualización registrada por git (y, por ende, compartir trabajo, archivos nuevos, ideas nuevas, cartas de amor, etc).",
              "",
              "En esta lección aprenderemos cómo traer (hacer `fetch`) datos _desde_ un repositorio remoto - el comando para esto se llama, convenientemente, `git fetch`).",
              "",
              "Vas a notar que a medida que actualicemos nuestra representación de nuestro repositorio remoto, nuestras ramas _remotas_ van a actualizarse para reflejar esa nueva representación. Esto está ligado a la lección anterior sobre ramas remotas."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Antes de entrar en los detalles de `git fetch`, veámoslo en acción. Aquí tenemos un repositorio remoto que contiene dos commits que nuestro repositorio local no tiene."
            ],
            "afterMarkdowns": [
              "¡Allá vamos! Bajamos los commits `C2` y `C3` a nuestro repositorio local, y nuestra rama remota `o/main` fue actualizada para reflejar este cambio."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué hace fetch?",
              "",
              "`git fetch` hace dos simples pasos, y sólo dos simples pasos:",
              "",
              "* baja los commits que el remoto tiene pero no están en nuestro repositorio local, y...",
              "* actualiza a dónde apuntan nuestras ramas remotas (por ejemplo, `o/main`)",
              "",
              "`git fetch` escencialmente sincroniza nuestra representación _local_ del repositorio remoto con el _verdadero_ estado del repositorio remoto (en este momento).",
              "",
              "Si recuerdas la lección anterior, dijimos que las ramas remotas reflejan el estado de los repositorios remotos _desde_ la última vez que hablaste con ellos. ¡`git fetch` es la manera en la que hablas con esos remotos! Espero que ahora esté clara la conexión entre las ramas remotas y `git fetch`.",
              "",
              "Usualmente, `git fetch` habla con el repositorio a través de internet (usando un protocolo como `http://` o `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué *no* hace fetch?",
              "",
              "Sin embargo, `git fetch` no modifica en absoluto _tu_ estado local. No va a actualizar tu rama `main` ni va a cambiar nada sobre cómo se ve tu sistema de archivos en este momento.",
              "",
              "Es importante entender esto, porque un montón de desarrolladores piensan que correr `git fetch` hará que su estado local refleje el estado del remoto. `git fetch` puede descargar los datos necesarios para hacerlo, pero *no* cambia ninguno de tus archivos locales. Vamos a aprender otros comandos para hacer eso más adelante :D",
              "",
              "Entonces, después de todo, puedes pensar sobre `git fetch` como un proceso de descarga."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente ejecuta `git fetch` y bájate todos los commits."
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
              "## Git Fetch",
              "",
              "Trabalhar com remotos no Git, no final das contas, se resume a transferir dados _de_ e _para_ outros repositórios. Desde que possamos enviar commits para um lado e para o outro, poderemos compartilhar qualquer tipo de atualização que seja gerenciada pelo Git (e portanto compartilhar trabalho, novos arquivos, novas ideias, cartas de amor, etc).",
              "",
              "Nesta lição vamos aprender como baixar dados _de_ um repositório remoto -- o comando para isso é convenientemente chamado de `git fetch`.",
              "",
              "Você perceberá que conforme atualizarmos a representação do repositório remoto, nossos ramos _remotos_ atualizar-se-ão para refletir essa nova representação. Isso tem a ver com o que vimos na lição anterior sobre ramos remotos."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Antes de entrar nos detalhes do `git fetch`, vejamo-no em ação! Aqui temos um repositório remoto que contém dois commits que nosso repositório local não possui."
            ],
            "afterMarkdowns": [
              "Lá vamos nós! Os commits `C2` e `C3` foram baixados para o nosso repositório local, e nosso ramo remoto `o/main` foi atualizado para refletir esse fato."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### O que o fetch faz",
              "",
              "O `git fetch` realiza dois passos principais, e somente estes dois passos principais. Ele:",
              "",
              "* Baixa os commits que o repositório remoto possui mas que estão faltando no repositório local, e...",
              "* Atualiza a referência para a qual os ramos remotos (por exemplo, `o/main`) estão apontando",
              "",
              "O `git fetch` essencialmente faz com que nossa representação _local_ do repositório remoto fique sincronizada com a forma com que o repositório remoto _de fato_ se parece (naquele momento).",
              "",
              "Se você lembrar da lição anterior, nós dissemos que os ramos remotos refletem o estado dos repositórios remotos _desde a última vez_ na qual você falou com esses repositórios. O `git fetch` é a única forma de falar com esses repositórios remotos! Espero que a conexão entre os ramos remotos e o `git fetch` esteja clara agora.",
              "",
              "O `git fetch` geralmente conversa com o repositório remoto por meio da Internet (usando um protocolo como `http://` ou `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### O que o fetch NÃO faz",
              "",
              "O `git fetch`, no entanto, não muda nada do estado _local_ do repositório. Ele não atualiza o seu ramo `main` nem muda nada na forma como o seu sistema de arquivos está no momento.",
              "",
              "É importante entender isso, pois muitos desenvolvedores pensam que executar `git fetch` fará com que o trabalho local reflita o estado do repositório remoto. Ele pode até baixar todos os dados necessários para fazê-lo, mas ele _não_ muda de fato nenhum dos arquivos locais. Vamos aprender comandos para fazê-lo nas lições a seguir :D",
              "",
              "No final das contas, você pode pensar no `git fetch` como um passo de download."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para terminar este nível, simplesmente execute `git fetch` e baixe todos os commits!"
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
              "## Git Fetch",
              "",
              "Traballar con respositorios remotos en Git, a fin de contas, resúmese en transferir datos _dun_ repositorio _cara_ outros repositorios. Dende que podemos enviar commits dun lado cara o outro, poderemos compartir calquera tipo de actualización que sexa xerada por git (e polo tanto compartir o traballo, novos arquivos, novas ideas, cartas de amor, etc).",
              "",
              "Nesta lección imos aprender como baixar os cambios _dun_ repositorio remoto -- o comando para iso é `git fetch`.",
              "",
              "Percibirás que conforme atualizamos a representación do repositorio remoto, as nosas ramas _remotas_ actualizaranse para reflexar a nova representación. Iso ten que ver co que vimos na lección anterior sobre as ramas remotas."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ántes de entrar nos detalles de `git fetch`, vexámolo en acción! Aquí temos un repositorio remoto que contén dous commits que o noso repositorio local non ten."
            ],
            "afterMarkdowns": [
              "Alá imos! Os commits `C2` e `C3` baixáronse ó noso repositorio local, e a nosa rama `o/main` actualizouse para reflexar ese cambio."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### O que fai o fetch",
              "",
              "`git fetch` fai dous pasos pasos principais, e soamente estes dous pasos princpipais. Son:",
              "",
              "* Baixa os commits que o repositório remoto contén pero non temos nos no noso repositoiro local, e...",
              "* Actualiza a referencia nas ramas remotas (por exemplo, `o/main`) nas que se está apuntando",
              "",
              "`git fetch` esencialmente fai que a nosa representación _local_ do repositorio remoto se sincronice ca forma que posúe o repositorio remoto, _de feito_ parecese (nese momento).",
              "",
              "Se ti lembras a lección anterior, nos dixemos que as ramas remotas reflexan o estado dos repositorios remotos _dende a última vez_ na que ti fixeches un commit dese repositorio. O `git fetch` é a única forma de falar con eses repositorios remotos! Agardo que a conexión entre as ramas remotas e o `git fetch` esté clara dabondo agora.",
              "",
              "`git fetch` xeralmente fala co repositorio remoto por medio da rede (usando un protocolo como `http://`, `git://` ou `ssh`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### O que fetch NON fai",
              "",
              "`git fetch`, por agora, non cambia nada no estado _local_ do repositorio. El solo actualiza a rama `main` sen facer cambios na forma de cómo está o teu sistema de arquivos nese momento.",
              "",
              "É importante entender iso, xa que moitos desenvolvedores pensan que executar `git fetch` fará que o traballo local se vexa modificado polo repositorio remoto. El pode que baixara todos os cambios necesarios para facelo, pero, o comando _non_ cambia cómo están os teus arquivos locais. Imos aprender comandos para facer esas conexións :D",
              "",
              "A fin de contas, ti podes pensar en `git fetch` como unha descarga."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para rematar este nivel, so executa `git fetch` e baixa todos os commits!"
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
              "## git fetch",
              "",
              "透過 git remote 其實就是把資料接收或傳送到其它的 repository，只要我們可以將資料傳進及傳出，我們就可以分享任何被 git 所追蹤的 repository 的更新（例如分享工作進度，新的檔案，新的想法，以及情書等等...）。",
              "",
              "在這個教學中，我們會學習到如何從 remote repository 來 fetch （抓取）資料，這個指令叫作 `git fetch`。",
              "",
              "你將會注意到當我們的 remote repository 更新的時候，相對應的 _remote_ branch 也會反映該更新，這個跟我們之前所提到的 remote branch 的特性是吻合的。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "在講到 `git fetch` 的細節之前，我們要先來看一下例子！在這裡我們有一個新增了兩個 commit 的 remote repository，而且我們的 local repository 並沒有包含這兩個 commit。"
            ],
            "afterMarkdowns": [
              "看吧！commit `C2` 以及 `C3` 已經被下載到我們的 local repository，而且我們的 remote branch `o/main` 也更新了。"
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### fetch 做了什麼",
              "",
              "`git fetch` 只有執行了兩個主要步驟，包含：",
              "",
              "* 下載 remote 有的 commit，但是在我們的 local repository 是沒有該 commit。還有...",
              "* 更新我們 remote branch 所指向的地方（例如， `o/main`）",
              "",
              "基本上，`git fetch` 同步了我們的 local repository 以及 remote repository 的最新狀態。",
              "",
              "假如你還記得之前的教學的話，我們說過 remote branch 反映了 remote repository 的狀態，原因在於說你最後接觸的是這些 remote repository，而你就是利用 `git fetch` 來接觸這些 remote repository！現在 remote branch 跟 `git fetch` 的關係已經很明顯了。",
              "",
              "`git fetch` 通常是透過網路來跟 remote 溝通（透過一個 protocol （協定），例如 `http://` 或者是 `git://`）。",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### fetch 沒有做的事情",
              "",
              "然而，`git fetch` 並不會影響到在你的 local repository 中的 `main` branch，他並不會將你的 `main` branch 更新到最新的狀態。",
              "",
              "這個觀念很重要，因為很多程式設計師以為 `git fetch` 可以讓他們在 local repository 上面的工作跟 remote repository 的工作可以同步。它是會下載同步所需的資料，但是不會更新任何的檔案，我們會在後面的教學中提到如何做到這件事情。:D",
              "",
              "因此，你可以把 `git fetch` 想成是在下載資料。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這一關，只要透過 `git fetch` 並且下載全部的 commit 即可！"
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
              "## Git Fetch",
              "",
              "Git 远程仓库相当的操作实际可以归纳为两点：向远程仓库传输数据以及从远程仓库获取数据。既然我们能与远程仓库同步，那么就可以分享任何能被 Git 管理的更新（因此可以分享代码、文件、想法、情书等等）。",
              "",
              "本节课我们将学习如何从远程仓库获取数据 —— 命令如其名，它就是 `git fetch`。",
              "",
              "你会看到当我们从远程仓库获取数据时, 远程分支也会更新以反映最新的远程仓库。在上一节课程中我们已经提及过这一点了。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "在解释 `git fetch` 前，我们先看看实例。这里我们有一个远程仓库, 它有两个我们本地仓库中没有的提交。"
            ],
            "afterMarkdowns": [
              "就是这样了! `C2`,`C3` 被下载到了本地仓库，同时远程分支 `o/main` 也被更新，反映到了这一变化"
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### git fetch 做了些什么",
              "",
              "`git fetch` 完成了仅有的但是很重要的两步:",
              "",
              "* 从远程仓库下载本地仓库中缺失的提交记录",
              "* 更新远程分支指针(如 `o/main`)",
              "",
              "`git fetch` 实际上将本地仓库中的远程分支更新成了远程仓库相应分支最新的状态。",
              "",
              "如果你还记得上一节课程中我们说过的，远程分支反映了远程仓库在你**最后一次与它通信时**的状态，`git fetch` 就是你与远程仓库通信的方式了！希望我说的够明白了，你已经了解 `git fetch` 与远程分支之间的关系了吧。",
              "",
              "`git fetch` 通常通过互联网（使用 `http://` 或 `git://` 协议) 与远程仓库通信。",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### git fetch 不会做的事",
              "",
              "`git fetch` 并不会改变你本地仓库的状态。它不会更新你的 `main` 分支，也不会修改你磁盘上的文件。",
              "",
              "理解这一点很重要，因为许多开发人员误以为执行了 `git fetch` 以后，他们本地仓库就与远程仓库同步了。它可能已经将进行这一操作所需的所有数据都下载了下来，但是**并没有**修改你本地的文件。我们在后面的课程中将会讲解能完成该操作的命令 :D",
              "",
              "所以, 你可以将 `git fetch` 的理解为单纯的下载操作。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成本关，只需用 `git fetch` 下载所有的提交！"
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
              "## Git Fetch",
              "",
              "In Git mit entfernten Repositorys zu arbeiten lässt sich wirklich auf das Hin- und Zurückübertragen von Daten reduzieren. Solange wir Commits hin und her schicken können, können wir jede Art Update teilen, das von Git getrackt wird (und somit Arbeit, neue Dateien, neue Ideen, Liebesbriefe etc. teilen).",
              "",
              "In diesem Level werden wir lernen, wie man Daten _von_ einem entfernten Repository holt -- der entsprechende Befehl heißt `git fetch`.",
              "",
              "Dir wird auffallen, dass mit der Aktualisierung unserer Darstellung des entfernten Repositorys die _Remote_ Branches auf den neuesten Stand gebracht werden. Das passt zum vorherigen Level über Remote Branches."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Bevor wir uns die Einzelheiten von `git fetch` ansehen wollen wir es mal in Aktion sehen. Wir haben hier ein entferntes Repository, das zwei Commits hat, die in unserem lokalen Repository fehlen."
            ],
            "afterMarkdowns": [
              "Das war's! Die Commits `C2` und `C3` wurden zu unserem Repository heruntergeladen und unser Remote Branch `o/main` wurde aktualisiert."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Was Fetch tut",
              "",
              "`git fetch` führt genau zwei Schritte aus:",
              "",
              "* Es lädt die Commits herunter, die im lokalen Repository fehlen, und ...",
              "* aktualisiert die Remote Branches wo nötig (zum Beispiel `o/main`).",
              "",
              "`git fetch` synchronisiert im Prinzip unsere _lokale_ Abbildung des entfernten Repositorys mit dem, wie das entfernte Repository _tatsächlich_ aussieht (in diesem Moment).",
              "",
              "Wie du dich vielleicht erinnerst, haben wir im letzten Level gesagt, dass die Remote Branches den Zustand der Branches auf dem entfernten Repository darstellen _seit_ du das letzte Mal dieses Repository angesprochen hast. `git fetch` ist die Methode mit der du das Repository ansprichst! Der Zusammenhang zwischen Remote Branches und `git fetch` ist damit hoffentlich klar.",
              "",
              "`git fetch` kommuniziert mit dem entfernten Repository in der Regel über das Internet (über ein Protokoll wie `http://` oder `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Was Fetch nicht tut",
              "",
              "`git fetch` ändert allerdings überhaupt nichts an _deinen_ lokalen Branches. Es aktualisiert nicht deinen `main` oder ändert irgendetwas an deinem Checkout.",
              "",
              "Das ist wichtig zu wissen, denn eine Menge Entwickler glauben, wenn sie `git fetch` ausführen, würden ihre lokalen Branches auf den Stand des entfernten Repositorys gebracht. Es lädt zwar alle Daten herunter, damit man diese Aktualisierung durchführen kann, aber es ändert _nichts_ an deinen lokalen Branches. Wir werden in späteren Level Befehle genau dafür kennenlernen. :D",
              "",
              "Am Ende des Tages kannst du dir `git fetch` also als den Download-Schritt vorstellen."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level zu schaffen musst du einfach nur `git fetch` ausführen, um alle Commits herunterzuladen!"
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
              "## Git Fetch",
              "",
              "リモートGitを用いた作業は、本当にただ単なる他のリポジトリ _への_ 、または他のリポジトリ _からの_ データの転送に集約されます。コミットを転送できる限り、Gitで管理されている全ての種類の更新が共有できます（例えば作業や、新しいファイル、新しいアイデア、ラブレターなどです）。",
              "",
              "このレベルでは、リモートリポジトリ _から_ データを取ってくる方法を学びます -- このコマンドは`git fetch`と名付けられています。",
              "",
              "リモートリポジトリの情報を私たちが更新するように、 _リモート_ ブランチも情報を更新することができることが分かるでしょう。これは前のレッスンでのリモートブランチの働きに結びつきます。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`git fetch`の説明に入る前に、その動作を見てみましょう。ここに、ローカルリポジトリにない二個のコミットを含んでいるリモートブランチがあります。"
            ],
            "afterMarkdowns": [
              "やりました！`C2`、`C3`コミットがローカルリポジトリにダウンロードされ、`o/main`リモートブランチに反映されました。"
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### fetchとはどのようなものか",
              "",
              "`git fetch`は、主に二つのステップだけで動作します。それは以下のようなものです:",
              "",
              "* リモートにあってローカルリポジトリにないコミットをダウンロードする",
              "* リモートブランチの位置を更新する（例えば、`o/main`）",
              "",
              "`git fetch`は本質的には、 _実際_ のリモートリポジトリと同じように見えるような形でリモートリポジトリの _ローカル_ の情報に同期します（ちょうど今のように）。",
              "",
              "前のレッスンでのことを覚えていると思いますが、リモートブランチはリモートと最後に同期した時点での状態を保持しているという話をしました。`git fetch`はそのリモートと同期する方法なのです！これでリモートブランチと`git fetch`の関係性は明らかになったでしょう？",
              "",
              "`git fetch`は、通常インターネットを通してリモートリポジトリと対話します（`http://`または`git://`プロトコル経由で）。",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### fetchがしてくれないもの",
              "",
              "`git fetch`は、しかしながら、 _あなたの_ ローカルの状態は変更しません。あなたの`main`ブランチや他のもの、今現在のあなたのファイルシステムが見せているものを更新しないのです。",
              "",
              "これは理解する上で重要なことです。なぜなら、多くの技術者は`git fetch`がリモートの状態をローカルの作業場に反映してくれると思っているからです。必要なデータはダウンロードされるかもしれませんが、ローカルのファイルを実際に変更するというようなことは _してくれない_ のです。私たちは、この後のレッスンでもこのようなコマンドを学びます :D",
              "",
              "なので、この1日が終わる頃には、あなたは`git fetch`のダウンロードステップの動作が分かるようになるでしょう。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルを終えるには、単に`git fetch`を実行し、全てのコミットをダウンロードしてください。"
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
              "## Git Fetch",
              "",
              "Работа с удалёнными git репозиториями сводится к передаче данных _в_ и _из_ других репозиториев. До тех пор, пока мы можем отправлять коммиты туда-обратно, мы можем делиться любыми изменениями, которые отслеживает git (следовательно, делиться новыми файлами, свежими идеями, любовными письмами и т.д.).",
              "",
              "В этом уроке вы научитесь тому, как извлекать данные _из_ удалённого репозитория - и для этого у нас есть соответствующая команда `git fetch`.",
              "",
              "Вы увидите, что как только мы изменим представление нашего удалённого репозитория, наши _удалённые_ ветки обновятся соответствующим образом и отобразят это представление. Это связывает воедино предыдущий урок про удалённые репозитории."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Прежде чем углубляться в детали команды `git fetch`, давайте взглянем на её визуализацию в действии! Здесь у нас имеется удалённый репозиторий, который содержит в себе два коммита, отсутствующих в нашем локальном репозитории."
            ],
            "afterMarkdowns": [
              "Вот и всё! Коммиты `C2` и `C3` были успешно скачаны в наш локальный репозиторий, и наша удалённая ветка `o/main` отобразила эти изменения соответствующим образом."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Что делает fetch",
              "",
              "`git fetch` выполняет две и только две основные операции. А именно:",
              "",
              "* связывается с указанным удалённым репозиторием и забирает все те данные проекта, которых у вас ещё нет, при этом...",
              "* у вас должны появиться ссылки на все ветки из этого удалённого репозитория (например, `o/main`)",
              "",
              "Фактически, `git fetch` синхронизирует _локальное_ представление удалённых репозиториев с тем, что является _актуальным_ на текущий момент времени.",
              "",
              "Насколько вы помните, в предыдущем уроке мы сказали, что удалённые ветки отображают состояние удалённых репозиториев _на тот момент_ когда вы 'общались' с ними в последний раз. `git fetch` является тем механизмом, который даёт вам возможность общаться с удалёнными репозиториями! Надеюсь, что связь между удалёнными ветками и командой `git fetch` теперь прояснилась.",
              "",
              "`git fetch` обычно 'общается' с удалёнными репозиториями посредством Интернета (через такие протоколы, как `http://` или `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Чего fetch не делает",
              "",
              "Важно отметить, что команда `git fetch` забирает данные в ваш _локальный_ репозиторий, но не сливает их с какими-либо вашими наработками и не модифицирует то, над чем вы работаете в данный момент.",
              "",
              "Важно это помнить и понимать, потому что многие разработчики думают, что, запустив команду `git fetch`, они приведут всю свою локальную работу к такому же виду, как и на удалённом репозитории. Команда всего лишь скачивает все необходимые данные, но вам потребуется вручную слить эти данные с вашими, когда вы будете готовы. В следующих уроках мы научимся это делать :D",
              "",
              "Одним словом, вы можете относиться к `git fetch` как к процедуре скачивания."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы выполнить уровень, просто запустите `git fetch` и скачайте все коммиты!"
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
              "## Git Fetch",
              "",
              "Робота з віддаленими git-репозиторіями зводиться до передачі данних _до_ та _з_ інших репозиторіїв. Можливість передавати коміти дозволяє нам ділитися будь-якою інформацією, що відслідковується gitом (а отже, виконаною роботою, новими файлами, ідеями, листами, тощо).",
              "",
              "На цьому уроці ми навчимося витягати дані _з_ віддаленого репозиторію -- команда, що відповідає за це, зручно називається `git fetch` (fetch - англ. витягнути чи дістати).",
              "",
              "Зауваж, що коли ми оновлюємо наш віддалений репозиторій, наші _віддалені_ гілки теж оновляться. Про це ми говорили на попередньому уроці."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Перед тим, як почати розбиратися з `git fetch`, спробуймо його в дії! Тут ми маємо віддалений репозиторій, що містить два коміти, яких немає в нашому локальному сховищі."
            ],
            "afterMarkdowns": [
              "Ось, маєш! Коміти `C2` та `C3` було завантажено до нашого локального сховища й наша віддалена гілка `o/main` була відповідно оновлена."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Що робить fetch",
              "",
              "`git fetch` виконує дві основні дії, і тільки дві дії. Він:",
              "",
              "* звантажує коміти, які містить віддалене сховище, але яких немає в локальному сховищі, та...",
              "* оновлює посилання віддаленого бранчу (наприклад, `o/main`)",
              "",
              "Якщо коротко, `git fetch` приводить репрезентацію віддаленого репозиторію в локальному сховищі до _актуального_ стану справжнього віддаленого репозиторію.",
              "",
              "Якщо ти пам’ятаєш з попереднього уроку, ми тоді зауважили, що віддалені гілки відображають стан віддаленого репозиторію _від_ останнього разу, коли ми синхронізувались з віддаленим репозиторієм. `git fetch` якраз і відповідає за синхронізацію з віддаленим сховищем! Сподіваюсь, що зв’язок між віддаленими гілками `git fetch` тепер є очевидним.",
              "",
              "Як правило, `git fetch` працює з віддаленими сховищами через інтернет (через протоколи `http://` чи `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Чого не робить fetch",
              "",
              "Тим не менш, `git fetch` нічого не змінює в _твоєму_ локальному стані. Він не оновить твою гілку `main` і не змінить того, як наразі виглядає локальна файлова система.",
              "",
              "Це важливо зрозуміти, тому що багато розробників думають, що `git fetch` оновить їхні локальні данні до стану віддаленого репозиторію. Він дійсно звантажить всі потрібні дані, щоб це зробити, але він _не змінить_ автоматично жодних локальних файлів. Ми вивчимо команди, які це роблять, в наступних уроках :D",
              "",
              "Отже, зрештою, ти можеш вважати що `git fetch` просто звантажує нову інформацію з віддаленого сховища."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти цей рівень просто виконай `git fetch` і звантаж всі коміти!"
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
              "## Git Fetch",
              "",
              "git 원격 작업들은 결국 서로다른 저장소에서 데이터를 _주고_ _받는_것에 불과하다는것을 알 수 있습니다. 우리가 커밋들을 주고 받을수 있는 한, git을 바탕으로하는 모든 종류의 업데이트를 공유할 수 있습니다(작업, 새로운 파일들, 새로운 아이디어, 러브레터 등...).",
              "",
              "이번 레슨에서는 원격 저장소_에서_ 데이터를 가져오는 방법을 배워볼 것입니다 -- 이를 위한 명령어는 `git fetch`라고 불립니다.",
              "",
              "먼저 알아두고 넘어갈것이 있는데 우리가 원격 저장소와 작업을 해서 상태가 변하면 _원격_브랜치들 또한 그 변경들을 반영합니다. 원격 브랜치에대한 이전 레슨을 참고하세요."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`git fetch`의 세부사항을 알아보기 전에 일단 눈으로 먼저 확인해 봅시다! 여기 로컬 저장소에는 없는 두개의 커밋이 있는 원격 저장소가 있습니다."
            ],
            "afterMarkdowns": [
              "됐습니다! 커밋 `C2` 와 `C3`가 우리의 로컬 저장소로 다운로드 되었고, 원격 브랜치 `o/main`가 이것을 반영하기 위해 업데이트 되었습니다."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### fetch는 무엇을 하는가",
              "",
              "`git fetch`는 두가지의 중요한 단계를 수행합니다. 사실 이 두 단계만을 진행합니다. 그것은 :",
              "",
              "* 원격 저장소에는 있지만 로컬에는 없는 커밋들을 다운로드 받습니다. 그리고... ",
              "* 우리의 원격 브랜치가 가리키는곳을 업데이트합니다 (예를들어, `o/main`)",
              "",
              "`git fetch`는 본질적으로 _로컬_에서 나타내는 원격 저장소의 상태를 _실제_ 원격 저장소의 (지금)상태와 동기화합니다.",
              "",
              "이전 레슨을 기억한다면, 원격 브랜치는 가장 최근 원격 원격저장소와 작업을 했을때를 기준으로 원격 저장소의 상태를 반영한다고 했습니다. `git fetch`가 그러한 작업중에 하나입니다!(역: 원문에서는 talk with remote라고 표현합니다. 원격 저장소와 대화한다고 번역하기 어색해서 의역했습니다.) 원격 브랜치와 `git fetch`의 관계를 분명하게 알게되셨으면 좋겠습니다.",
              "",
              "`git fetch`는 일반적으로 원격 저장소와 인터넷을 통해 접근합니다(`http://` 또는 `git://`와같은 프로토콜로).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### fetch는 무엇을 하지 않는가",
              "",
              "`git fetch`는 그러나, _여러분의_ 로컬 상태는 전혀 바꾸지 않습니다. 여러분의 `main` 브랜치도 업데이트하지 않고 파일 시스템의 모습이던 그 어떤것도 바꾸지 않습니다.",
              "",
              "이것을 이해하는게 아주 중요한데, 왜냐하면 수 많은 개발자들이 `git fetch`를 하면 자신의 로컬 작업이 변경되어 원격 저장소의 모습을 반영해 업데이트 될것이라고 생각하기 때문입니다. 앞의 과정에 필요한 데이터를 다운로드는 하지만, 실제로 로컬 파일들이나 브랜치를 변경하지는 않습니다. 이것을 하기위한 명령어들은 뒤에서 배우겠습니다 :D",
              "",
              "간단하게 `git fetch`를 다운로드 단계로 생각할 수 있습니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "레벨을 마치기 위해, `git fetch`를 수행하고 모든 커밋들을 내려 받으세요!"
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
              "## Git Fetch",
              "",
              "Làm việc với git remote về căn bản là chuyển giao dữ liệu qua và lại giữa các kho chứa. Miễn là ta có thể chia sẻ qua lại các commit, ta có thể chia sẻ bất kỳ cập nhật gì được theo dõi bở Git (và từ đó chia sẻ thành quả, tập tin mới, ý tưởng mới, thư tình, các kiểu con đà điểu.).",
              "",
              "Ở bài học này ta sẽ học cách lấy dữ liệu về từ một kho chứa từ xa -- lệnh đó là `git fetch`.",
              "",
              "Bạn sẽ nhận thấy rằng khi ta cập nhật đại điện kho chứa từ xa, nhánh _từ xa_ của ta cũng được cập nhật để phản ánh đại diện đó. Điều này liên quan đến bài học trước về nhánh từ xa."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Trước khi đi vào chi tiết về `git fetch`, hãy xem cách nó hoạt động! Ở đây ta có một kho chứa từ xa trong đó chứa 2 commit mà kho chứa cục bộ của ta không có."
            ],
            "afterMarkdowns": [
              "Đó! Commit `C2` và `C3` đã được tải xuống kho chứa cục bộ của ta, và nhánh từ xa `o/main` của ta đã được cập nhật để phản ánh điều này."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Fetch làm gì",
              "",
              "`git fetch` thực hiện 2 bước chính, và chỉ 2 bước chính. Nó:",
              "",
              "* tải xuống commit có trên kho chứa từ xa mà kho chứa cục bộ của ta không có, và...",
              "* cập nhật nơi mà nhánh từ xa của ta trỏ tới (ví dụ nhánh `o/main`)",
              "",
              "Về căn bản thì `git fetch` đưa đại diện _cục bộ_ của kho chứa từ xa của ta về trạng thái đồng bộ với trạng thái _thực tế_ của kho chứa từ xa (ngay lúc này).",
              "",
              "Nếu bạn còn nhớ thì trong bài học trước, chúng tôi có đề cập rằng nhánh từ xa phản ánh trạng thái của kho chứa từ xa kể từ lần cuối bạn tương tác với các nhánh từ xa đó. `git fetch` chính là cách để tương tác với các nhánh từ xa! Hy vọng chúng tôi đã làm sáng tỏ sự liên kết giữa nhánh từ xa và `git fetch`.",
              "",
              "`git fetch` thường tương tác với kho chứa từ xa bằng Internet (thông qua các giao thức như `http://` hoặc `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Fetch không làm gì",
              "",
              "Tuy nhiên, `git fetch` không hề thay đổi trạng thái kho chứa _cục bộ_ của bạn. Nó sẽ không cập nhật nhánh `main` hay thay đổi bất kỳ điều gì trong hệ thống tập tin hiện tại của bạn.",
              "",
              "Điều này rất quan trọng, vì nhiều nhà phát triển nghĩ rằng `git fetch` sẽ làm kho chứa cục bộ của họ phản ánh trạng thái của kho chứa từ xa. Nó có thể tải xuống tất cả dữ liệu cần thiết, nhưng nó thực tế không thay đổi bất cứ thứ gì trên tập tin cục bộ của bạn. Ta sẽ học lệnh để làm điều đó sau :D",
              "",
              "Nói tóm lại, bạn có thể coi `git fetch` thuần túy như một bước tải xuống."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Để hoàn thành cấp độ này, đơn giản hãy gõ `git fetch` để tải xuống tất cả commit!"
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
              "## Git Fetch",
              "",
              "Delanje z git oddaljnemi repoti je v bistvu le premikanje podatkov na in z drugih repozitorijev. Dokler lahko pošiljamo commite naprej in nazaj, lahko delimo bilokakšno posodobitev, kateri git sledi (in posledično delimo delo, nove datoteke, nove ideje, ljubezenska pisma, itd.).",
              "",
              "V tej lekciji se bomo naučili kako fetchat (prenesti) podatke iz oddaljenega repozitorija -- ukaz za to je poimenovan `git fetch`.",
              "",
              "Opazil boš, da ko posodobimo našo predstavitev oddaljenega repota, se bo naš oddaljen branch posodobil in imel nove spremembe. To se navezuje na prejšnjo lekcijo o oddaljenih repozitorijih."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Preden se spustimo v podrobnosti `git fetch` ga poglejmo v akciji! Tu imamo oddaljen repozitorij, ki vsebuje dva commita, ki jih naš lokalen repozitorij nima."
            ],
            "afterMarkdowns": [
              "Tako! Commita `C2` in `C3` sta bila prenesena v naš lokalen repozitorij in naš oddaljen branch `o/main` je bil posodobljen, da to odraža."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Kaj fetch naredi",
              "",
              "`git fetch` naredi dve stvari. In sicer:",
              "",
              "* prenese commite, ki jih ima oddaljeni repo ampak manjkajo v našem lokalnem in ...",
              "* posodobi, kam kaže naš oddaljeni branch (naprimer `o/main`)",
              "",
              "`git fetch` v bistvu našo lokalno predstavitev oddaljenega repozitorija uskladi z dejanskim stanjem na oddaljenem repozitoriju.",
              "",
              "Če se spomneš še iz prejšnje lekcije smo rekli, da oddaljeni branchi odsevajo stanje na oddaljenih repozitorijih, odkar si komuniciral z njimi. `git fetch` je način, da komuniciraš z njimi! Upam, da je sedaj povezava med oddaljenimi repozitoriji in `git fetch` jasna.",
              "",
              "`git fetch` ponavadi komunicira z oddaljenimi repozitoriji preko interneta (s protokolom kot sta `http://` ali `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Kaj fetch ne naredi",
              "",
              "`git fetch` ne spremeni ničesar glede tvojega lokalnega stanja. Ne bo posodobil tvojega `main` brancha ali spremenil česarkoli v tvojih datotekah.",
              "",
              "To je pomembno razumeti, ker veliko razvijalcev misli, da bo `git fetch` posodobil njihovo lokalno stanje s stanjem na oddaljenem repozitoriju. Lahko bo prenesel vse potrebne podatke, da to izvede, ampak v bistvu _ne_ spremeni tvojih datotek. V kasnejših lekcijah se bomo naučili ukaze, ki pa naredijo točno to. :D",
              "",
              "Torej na koncu dneva, izvajanje `git fetch` si lahko predstavljate kot korak za prenašanje."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Za dokončanje te stopnje uporabi `git fetch` in prenesi vse commite!"
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
              "## Git fetch",
              "",
              "Praca ze zdalnymi Gitami tak naprawdę sprowadza się do przesyłania danych _do_ i _z_ innych repozytoriów. Tak długo jak możemy przesyłać zatwierdzenia tam i z powrotem, możemy udostępniać wszelkiego rodzaju aktualizacje śledzone przez Git (a tym samym dzielić się pracą, nowymi plikami, pomysłami, listami miłosnymi itp.).",
              "",
              "W tej lekcji nauczymy się, jak pobierać dane _ze_ zdalnego repozytorium -- polecenie to nosi nazwę `git fetch`.",
              "",
              "Zauważysz, że gdy aktualizujemy reprezentację zdalnego repozytorium, nasze _zdalne_ gałęzie zostaną zaktualizowane, aby odzwierciedlić tę nową reprezentację. Wiąże się to z poprzednią lekcją dotyczącą zdalnych gałęzi."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Zanim przejdziemy do szczegółów polecenia `git fetch`, zobaczmy, jak działa! Mamy tu zdalne repozytorium, zawierające dwa commity, których nie ma w naszym lokalnym repozytorium."
            ],
            "afterMarkdowns": [
              "No to jedziemy! Commity `C2` i `C3` zostały pobrane do naszego lokalnego repozytorium, a zdalna gałąź `o/main` została zaktualizowana, aby to odzwierciedlić."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Co robi fetch",
              "",
              "`git fetch` wykonuje dwie rzeczy:",
              "",
              "* pobiera commity, które są w zdalnym repozytorium, ale których brakuje w naszym lokalnym repozytorium i...",
              "* aktualizuje miejsca, które wskazują nasze zdalne gałęzie (na przykład `o/main`)",
              "",
              "`git fetch` zasadniczo synchronizuje _lokalną_ reprezentację zdalnego repozytorium z tym, jak w _rzeczywistości_ zdalne repozytorium wygląda (w danej chwili).",
              "",
              "Jak pamiętasz z poprzedniej lekcji, powiedzieliśmy, że zdalne gałęzie odzwierciedlają stan zdalnych repozytoriów od czasu ostatniej komunikacji nimi. `git fetch` to sposób, w jaki rozmiawiasz z tymi repozytoriami! Mamy nadzieję, że związek między zdalnymi gałęziami a `git fetch` jest teraz jasny.",
              "",
              "`git fetch` zwykle komunikuje się ze zdalnym repozytorium przez internet (za pośrednictwem protokołu takiego jak `http://` lub `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Czego fetch nie robi",
              "",
              "Zauważ, że `git fetch` nie zmienia nic w _twoim_ stanie lokalnym. Nie zaktualizuje twojej gałęzi `main` ani nie zmieni niczego w wyglądzie twojego systemu plików.",
              "",
              "Zrozumienie tego to ważna sprawa! Wielu programistów uważa, że uruchomienie `git fetch` spowoduje, że ich lokalna praca będzie odzwierciedlać stan zdalny. Mimo że `git fetch` pobiera wszystkie niezbędne do tego dane, _nie zmienia_ żadnego z plików lokalnych. Poleceń, które służą właśnie do tego celu, nauczymy się później. :D",
              "",
              "Dlatego, podsumowując to wszystko, możesz myśleć o `git fetch` jako pobieraniu."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Aby ukończyć ten poziom, po prostu użyj polecenia `git fetch` i pobierz wszystkie commity!"
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
              "## Git Fetch",
              "",
              "Lavorare con git remoto consiste essenzialmente nel trasferimento di dati _verso_ e _da_ altri repository. Fino a che possiamo inviare commit avanti e indietro, possiamo condividere qualsiasi tipo di aggiornamento tracciabile da git (e quindi condividere lavoro, nuovi file, nuove idee, letterine d'amore, etc.).",
              "",
              "In questa lezione vedremo come recuperare dati _da_ un repository remoto -- il comando per fare ciò è `git fetch`.",
              "",
              "Man mano che aggiorneremo la nostra rappresentazione del repository remoto, noterai che i nostri rami _remoti_ si aggiorneranno per riflettere quella nuova rappresentazione. Questo si collega alla lezione precedente sui rami remoti."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Prima di addentrarci nei dettagli di `git fetch`, vediamolo in azione! Qui abbiamo un repository remoto contenente due commit che il nostro repository locale non ha."
            ],
            "afterMarkdowns": [
              "Ecco fatto! I commit `C2` e `C3` sono stati scaricati nel nostro repository locale, e il nostro ramo remoto `o/main` è stato aggiornato per riflettere questo cambiamento."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone; git fakeTeamwork 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Cosa fa git fetch",
              "",
              "`git fetch` compie unicamente queste due azioni:",
              "",
              "* scarica i commit presenti in remoto ma assenti dal nostro repository locale, e...",
              "* aggiorna dove puntano i nostri rami remoti (ad esempio, `o/main`)",
              "",
              "`git fetch` essenzialmente porta la nostra rappresentazione _locale_ del repository remoto al pari con lo stato _attuale_ dello stesso (in questo momento).",
              "",
              "Se ti ricordi, nella lezione precedente abbiamo visto che i rami remoti riflettono lo stato del repository remoto dall'_ultima volta_ in cui hai comunicato con esso. `git fetch` è il modo per comunicare con i repository remoti! Ora il legame tra i rami remoti e `git fetch` dovrebbe essere più chiaro.",
              "",
              "`git fetch` generalmente comunica con il repository remoto attraverso Internet (tramite un protocollo come `http://` o `git://`).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Cosa non fa git fetch",
              "",
              "`git fetch`, però, non effettua modifiche a ciò che è già presente in locale sul _tuo_ sistema. Non aggiornerà il tuo ramo `main` e non apporterà modifiche ai tuoi file.",
              "",
              "Questo è importante da comprendere in quanto molti sviluppatori pensano che eseguire `git fetch` porterà il loro lavoro a riflettere lo stato del repository remoto. Va a scaricare tutti i dati necessari per farlo, ma _non_ va a modificare effettivamente alcun file locale. Impareremo nelle prossime lezioni i comandi per fare proprio questo :D",
              "",
              "In fin dei conti, puoi considerare `git fetch` come una fase di download di dati."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Per completare il livello, digita `git fetch` per scaricare tutti i commit!"
            ]
          }
        }
      ]
    },
  }
};
