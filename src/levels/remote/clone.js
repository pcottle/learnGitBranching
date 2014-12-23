exports.level = {
  "goalTreeString": '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}',
  "solutionCommand": "git clone",
  "name": {
    "en_US": "Clone Intro",
    "fr_FR": "Introduction à clone",
    "de_DE": "Clone Einführung",
    "ja"   : "Clone入門",
    "es_AR": "Introducción a clone",
    "pt_BR": "Introdução à clonagem",
    "zh_CN": "介绍 Clone",
    "zh_TW": "介紹 clone"
  },
  "hint": {
    "en_US": "Just git clone!",
    "fr_FR": "Simplement git clone !",
    "de_DE": "Einfach git clone ausführen!",
    "ja"   : "単にgit clone!",
    "zh_CN": "只要 git clone!",
    "es_AR": "Simplemente hacé git clone!",
    "pt_BR": "Basta fazer um git clone!",
    "zh_TW": "只要 git clone 就好了"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Remotes",
              "",
              "Remote repositories aren't actually that complicated. In today's world of cloud computing it's easy to think that there's a lot of magic behind git remotes, but they are actually just copies of your repository on another computer. You can typically talk to this other computer through the Internet, which allows you to transfer commits back and forth.",
              "",
              "That being said, remote repositories have a bunch of great properties:",
              "",
              "- First and foremost, remotes serve as a great backup! Local git repositories have the ability to restore files to a previous state (as you know), but all that information is stored locally. By having copies of your git repository on other computers, you can lose all your local data and still pick up where you left off.",
              "",
              "- More importantly, remotes make coding social! Now that a copy of your project is hosted elsewhere, your friends can contribute to your project (or pull in your latest changes) very easily.",
              "",
              "It's become very popular to use websites that visualize activity around remote repos (like [Github](https://github.com/) or [Phabricator](http://phabricator.org/)), but remote repositories _always_ serve as the underlying backbone for these tools. So it's important to understand them!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Our Command to create remotes",
              "",
              "Up until this point, Learn Git Branching has focused on teaching the basics of _local_ repository work (branching, merging, rebasing, etc). However now that we want to learn about remote repository work, we need a command to set up the environment for those lessons. `git clone` will be that command",
              "",
              "Technically, `git clone` in the real world is the command you'll use to create _local_ copies of remote repositories (from github for example). We use this command a bit differently in Learn Git Branching though -- `git clone` actually makes a remote repository out of your local one. Sure it's technically the opposite meaning of the real command, but it helps build the connection between cloning and remote repository work, so let's just run with it for now.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lets start slow and just look at what a remote repository looks like (in our visualization).",
              ""
            ],
            "afterMarkdowns": [
              "There it is! Now we have a remote repository of our project. It looks pretty similar except for some visual changes to make the distinction apparent -- in later levels you'll get to see how we share work across these repositories."
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, simply `git clone` your existing repository. The real learning will come in following lessons."
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
              "## Git Remotes",
              "",
              "Les dépôts distants (remote repositories) ne sont pas si compliqués que ça. Dans l'ère actuelle du cloud computing il est facile de croire qu'il y a un peu de magie derrière les branches distantes, mais elles sont en fait juste des copies de votre dépôt local sur un autre ordinateur. Vous pouvez donc vous connecter à cet ordinateur par Internet, ce qui vous permet de transférer les commits en retard et en avance.",
              "",
              "Cela dit, les branches distantes ont plusieurs propriétés puissantes :",
              "",
              "- Avant toute chose, le dépôt distant sert de sauvegarde ! Le dépôt local de git a la capacité de restaurer des fichiers à un état précédent (comme vous le savez), mais toutes les informations sont stockées localement. En ayant des copies de votre dépôt git sur d'autres ordinateurs, vous pouvez perdre vos données et toujours repartir de là où vous en étiez resté.",
              "",
              "- Plus important encore, les dépôts distants sociabilisent le projet ! Maintenant qu'il est hébergé quelque part ailleurs, vos amis peuvent y contribuer facilement (ou récupérer vos derniers changements).",
              "",
              "Il est devenu courant de visualiser l'activité sur dépôt distant via des sites internet (commen [Github](https://github.com/) ou [Phabricator](http://phabricator.org/)), mais les dépôts distants servent  _toujours_ de colonne vertébrale à ce système. C'est donc important de les comprendre !"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Les commandes pour créer des dépôts distants",
              "",
              "Jusqu'à maintenant, Learn Git Branching s'est surtout concentrésur l'apprentissage des bases du travail sur un dépôt _local_ (branch, merge, rebase, etc). Cependant maintenant nous voulons savoir comment travailler sur les dépôts distants, nous avons besoin d'une commande pour l'environnement de ces leçons. `git clone` sera cette commande",
              "",
              "Techniquement, `git clone` dans le monde réel sera la commande que vous utiliserez pour créer des copies _locales_ des dépôts distants (de github par exemple). Nous utilisons cette commande un peu différemment dans Learn Git Branching car `git clone` crée ici un dépôt distant à partir de votre dépôt local. Il est certain qu'il s'agit donc du sens opposé de la commande originale, mais cela aide à construire la connexion entre le clonage et le travail sur le dépôt distant, travaillons donc avec cela pour l'instant.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Commençons doucement et regardons à quoi ressemble un dépôt distant (dans notre visualisation).",
              ""
            ],
            "afterMarkdowns": [
              "Nous y sommes ! Maintenant nous avons un dépôt distant de notre projet. Cela ressemble fortement à d'habitude, en dehors de quelques changements pour rendre compte des différences -- dans les niveaux suivants vous allez voir comment partager le travail entre ces dépôts."
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour finir ce niveau, faites simplement un `git clone` du dépôt existant. Le réel apprentissage arrivera dans les prochaines leçons."
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
              "## Git Remotes",
              "",
              "Los repositorios remotos no son _tan_ complicados. En el mundo actual de la computación en la nube es bastante facil pensar que hay un montón de magia detrás de los remotes de git, pero en realidad sólo son copias de tu repositorio en otra computadora. Típicamente vas a hablar con esta otra computadora a través de Internet, lo que permite transferir commits de un lado a otro.",
              "",
              "Habiendo dicho eso, los repositorios remotos tienen un par de propiedades copadas:",
              "",
              "- Primero y principal, los remotos ¡son un genial backup! Los repositorios locales de git tienen la habilidad de restaurar archivos a un estado previo (como ya sabés), pero toda esa información está almacenada localmente. Al tener copias de tu repositorio git en otras computadoras, podés perder todos tus datos locales y aún así retomar de donde habías dejado.",
              "",
              "- Más importante, ¡los remotos sociabilizan la programación! Ahora que hay una copia de tu proyecto hosteada en otro lugar, tus amigos pueden contribuir a tu proyecto (o bajarse los últimos cambios) de un modo muy sencillo.",
              "",
              "Se volvió bastante popular el uso de sitios web que muestran la actividad de los repositorios (como [Github](https://github.com/) or [Phabricator](http://phabricator.org/)), pero esos repositorios remotos _siempre_ sirven como el la base subyacente de esas herramientas. Así que ¡es importante entenderlos!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Nuestro comando para crear remotos",
              "",
              "Hasta este punto, Learn Git Branching se centró en eseñar las bases del trabajo _local_ con repositorios (branchear, mergear, rebasear, etc). Sin embargo, ahora que queremos aprender sobre el trabajo con repositorios remotos, necesitamos un comando para inicializar nuestro entorno para esas lecciones. Ese comando será `git clone`",
              "",
              "Técnicamente, `git clone` en el mundo real es el comando que usarías para crear copias _locales_ de un repositorio remoto (uno de GitHub, por ejemplo). Acá usamos este comando de un modo un tanto distinto, en cambio -- `git clone` va a crear un repositorio remoto a partir del tuyo local. Estamos de acuerdo en que es el significado técnicamente opuesto al del comando real, pero ayuda bastante a entender la conexión entre el clonado y el trabajo en un repositorio remoto, así que vamos a vivir con ello por ahora.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Comencemos despacio y simplemente veamos cómo se ve un repositorio remoto en nuestra visualización.",
              ""
            ],
            "afterMarkdowns": [
              "¡Ahí está! Ahora tenemos un repositorio remoto de nuestro proyecto. Parece bastante similar, salvando algunos cambios visuales para hacer evidente la distinción -- en niveles posteriores vas a ver cómo compartir trabajo entre estos repositorios."
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente hacé `git clone` de tu repositorio existente. El verdadero aprendizaje viene en las próximas lecciones."
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
              "## Remotos no Git",
              "",
              "Repositórios remotos não são algo muito complicado. Nos dias atuais de computação em nuvem, seria fácil pensar que existiria muita mágica por trás dos remotos do Git, mas não é o caso -- eles são na verdade apenas cópias do seu repositório em outro computador. Você pode geralmente comunicar-se com esse outro computador por meio da Internet, o que permite que você transfira commits de um lado para o outro.",
              "",
              "Tendo dito isto, repositórios remotos tem uma série de propriedades interessantes:",
              "",
              "- Primeiro e antes de tudo, repositórios remotos servem como um ótimo backup! Repositórios Git locais possuem a habilidade de restaurar um arquivo para um estado anterior (como você sabe), mas toda a informação está guardada localmente. Tendo cópias do seu repositório Git em outros computadores, mesmo se você perder todos os seus dados locais, ainda terá como recomeçar do mesmo ponto de onde você tinha parado.",
              "",
              "- Ainda mais importante, repositórios remotos tornam o desenvolvimento uma atividade social! Agora que uma cópia do seu projeto está hospedada em outro lugar, seus amigos podem contribuir para o seu projeto (ou obter as suas últimas alterações) de uma forma bastante simples.",
              "",
              "Está se tornando bastante popular o uso de websites para visualizar a atividade em repositórios (como o [Github](https://github.com/) ou o [Phabricator](http://phabricator.org/)), mas o recurso de repositórios remotos _sempre_ serve como mecanismo base para essas ferramentas. Então é importante entender como ele funciona!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Nosso comando para criar remotos",
              "",
              "Até este ponto, o Learn Git Branching focou em ensinar o básico a respeito de trabalho em repositórios _locais_ (branch, merge, rebase, etc). Entretanto, agora que queremos aprender como repositórios remotos funcionam, precisamos de um comando para configurar o ambiente para essas lições. Esse comando será o `git clone`.",
              "",
              "Tecnicamente, o `git clone` do mundo real é um comando que se usa para criar cópias _locais_  de repositório remotos (do GitHub para o seu computador, por exemplo). Todavia, por motivos logísticos, nós usaremos esse comando de uma forma um pouco diferente no Learn Git Branching -- aqui o `git clone` criará um repositório remoto a partir do repositório local. Certamente, esse comportamento é exatamente o oposto do comando real, mas apesar disso ele ajuda a formar a conexão mental entre a clonagem e a forma como repositórios remotos funcionam, então vamos usá-lo dessa forma mesmo por enquanto.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos começar devagar e apenas olhar como um repositório remoto se parece na nossa visualização.",
              ""
            ],
            "afterMarkdowns": [
              "Aqui está ele! Agora temos um repositório remoto do nosso projeto. Ele é muito parecido exceto por algumas mudanças visuais para tornar a distinção factível -- nas tarefas a seguir veremos como compartilhar trabalho entre esses repositórios."
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nível, simplesmente chame o comando `git clone`. Você aprenderá algo de verdade somente nas próximas lições."
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
              "## Git Remotes",
              "",
              "remote (遠端) repository 並不會很難了解. 藉由現在的雲端運算，可以很輕易地了解到在 git remote 裡面有很多有趣的事情，但它們其實其實就只是你的或者是其它電腦上的 repository 的副本。你可以輕易地透過網路去發送你的 commit 給其它的電腦。",
              "",
              "也就是說， remote repository 有很多有趣的地方：",
              "",
              "- 第一，remote 是用來備份的! 本地端的 git 有能力可以回復文件到前一個狀態 (你知道的)，但是全部的資訊還是儲存在本地端。如果你在其它的電腦上面有你的 git repository 的副本，則你可以在資料不小心遺失的時候進行救援備份",
              "",
              "- 更重要的是, remote 讓大家一起來 coding！現在你的 project 放在 remote 上面，你的朋友可以很容易地對你的 project 做出貢獻（或者是 pull 你最後的修改） 。",
              "",
              "使用網站去對 remote repository 做視覺化非常流行（例如 [Github](https://github.com/） 或者是 [Phabricator]（http://phabricator.org/）），但這背後最大的功臣是 remote repository，因此我們務必要了解它。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 我們去建立 remotes 的指令",
              "",
              "到目前為止，Learn Git Branching 著重在解釋本地端的工作（branching, merging, rebasing 以及其它指令）， 但是我們現在想要學習針對 remote 的指令，我們需要一個指令去建立環境，`git clone` 就是我們需要的指令",
              "",
              "技術上來說， `git clone` 表示你想要把遠端的 repository 複製一份下來放在本地端（ 例如從 github 複製）。 雖然 `git clone` 實際上是把遠端的 repository 複製下來放在本地端，在 Learn Git Branching 中，我們用的這個指令會有一點不同。雖然他跟真實的指令的意思相反，但是它可以建立起本地端以及遠端的一個連結，現在讓我們看看如何使用它吧。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們慢慢來，並且看看 remote repository 是長什麼樣子（在我們的視覺化圖形中）。",
              ""
            ],
            "afterMarkdowns": [
              "就是那樣！現在我們有了一個放置了我們 project 的 remote repository。除了一些視覺上的改變之外，它們看起來很像，在之後的關卡中你就會看到我們如何分享我們的工作到這些 repository 上面。"
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這個關卡，只要打 `git clone，其它的學習會在後面的關卡中出現。"
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
              "## Git Remotes",
              "",
              "远程仓库并不复杂, 在如今的云计算的世界 很容易想到 git remotes背后有很多魔幻, 但是它们只是你的仓库到另个一台计算机上的拷贝. 你可以通过因特网与这台计算机通话 -- 传递后退和前进的提交对象",
              "",
              "话虽如些, 远程仓库却有一系列强大的属性",
              "",
              "- 首先, 远仓是一个强大的备份. 本地仓库也有恢复文件的能力, 但所有的信息都是保存在本地的. 即使你丢失了本地数据, 你仍可以通过远端仓库拷贝拿回你丢失的数据  ",
              "",
              "- 更重要的是, 远端让代码社交化了! 现在你的项目被拷贝到别的地方了, 你的朋友可以更容易的为你的项目做贡献(或者pull 最新的变更)",
              "",
              "现在使用网站来可视化远端仓库变得越发流行(像 [Github](https://github.com/) or [Phabricator](http://phabricator.org/)), 但远库是这些工具的基石, 理解其概念非常的重要!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 我们创建远端仓库的命令",
              "",
              "直到现在, 教学都聚焦于本地仓库的基本操作. 但我们现在需要学习远端仓库的操作 -- 我们需要一个配置这种环境的命令, 这个命令就是 `git clone`",
              "技术上, `git clone` 在真实的环境下, 会在本地创建一个远端仓库的拷贝(比如从github.com). 在我们的教学中使用这个命令会有一些不同 -- 它会在远端创建一个你本地的拷贝. 这和真实命令的意思相反",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "让我们看看远端仓库的样子.",
              ""
            ],
            "afterMarkdowns": [
              "就是它了! 现在我们有了一个远端仓库. 除了视觉上的一点变化, 它们真的太像了 -- 在后面的课程中, 你会知道怎样在不同的仓库间分享工作. "
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成本节, 简单的 `git clone` 下你的仓库. 后续的课程我们会正式的学习"
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
              "## Git Remotes",
              "",
              "Entfernte Repositorys sind nicht weiter kompliziert. In dieser Welt des Cloud Computings könnte man vielleicht glauben, dass hinter entfernten Git-Repositorys eine Menge Magie steckt, aber es sind einfach nur Kopien eines Repositorys auf einem anderen Rechner. Du kannst mit diesem Rechner typischerweise über das Internet kommunizieren, was es dir ermöglicht Commits hin und her zu schicken.",
              "",
              "Nichts desto weniger haben entfernte Repositorys eine Menge toller Eigenschaften:",
              "",
              "- Vor allem: sie sind ein super Backup! Lokale Git-Repositorys können deine Arbeitskopie ein jeden beliebigen früheren Zustand versetzen (wie du ja weißt), aber all diese Informationen liegen eben bei dir lokal. Wenn es Kopien von deinem Repository auf anderen Rechnern gibt, kannst du ruhig all deine Daten verlieren und trotzdem genau da weitermachen, wo du aufgehört hast.",
              "",
              "- Noch wichtiger: Remotes geben dem Entwickeln eine soziale Komponente! Wenn eine Kopie deines Projekts woanders liegt können deine Freunde sehr einfach etwas zu dem Projekt beitragen (oder sich deine neuesten Änderungen holen).",
              "",
              "Websites, die die Aktivitäten um diese entfernten Repositorys darstellen (wie [Github](https://github.com/) oder [Phabricator](http://phabricator.org/)) erfreuen sich zunehmender Beliebtheit, aber entfernte Repositorys sind _immer_ das Rückgrat für diese Werkzeuge. Deshalb ist es wichtig, sie zu verstehen."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Der Befehl um ein Remote zu erstellen",
              "",
              "Bis jetzt hat sich Learn Git Branching darauf konzentriert, die Grundlagen der _lokalen_ Arbeit mit Repositorys zu vermitteln (Branche anlegen, zusammenführen, Rebasen etc). Jetzt wollen wir allerdings lernen mit entfernten Repositorys zu arbeiten und brauchen für die Level eine entsprechende Umgebung. Die schaffen wir mit `git clone`.",
              "",
              "In der Realität ist `git clone` eigentlich der Befehl, mit dem du eine _lokale_ Kopie eines _entfernten_ Repositorys erstellst (das zum Beispiel auf Github liegt). Wir benutzen diesen Befehl in Learn Git Branching allerdings ein wenig anders -- hier macht `git clone` tatsächlich eine Kopie von deinem lokalen Repository auf einem \"entfernten Server\". Klar, das ist eigentlich genau das Gegenteil von dem was der echte Befehl macht, aber es hilft den Zusammenhang zwischen Cloning und der Arbeit mit entfernten Repositorys herzustellen, also machen wir's einfach so.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Fangen wir langsam an und schauen nur wie ein entferntes Repository in unserer Darstellung aussieht.",
              ""
            ],
            "afterMarkdowns": [
              "Da ist es! Jetzt haben wir ein entferntes Repository unseres Projektes. Es sieht so aus wie das lokale, nur mit ein paar Änderungen in der Darstellung -- in späteren Leveln wirst du sehen, wie man Änderungen zwischen den Repositorys austauschen kann."
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level abzuschließen führ einfach `git clone` auf deinem bestehenden Repository aus. Alles weitere kommt in den nächsten Leveln."
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
              "## Gitリモート",
              "",
              "リモートのレポジトリというのはそんなに複雑なものでもありません。クラウドコンピューティングが普及している現在の世界では、gitリモートの裏には何か不思議な仕組みが動いていると思いやすいのですが、実は別のコンピューター上に保存されているあなたのレポジトリーのコピーにすぎません。普通の場合では、インターネットを媒体に使いこの別のコンピューターと対話し、コミットを交互にやり取りすることができます。",
              "",
              "とはいえ、リモートレポジトリにはいくつかの素晴らしい特徴があります:",
              "",
              "- まず、リモートはバックアップの役割を果たします。ご存知の通り、ローカルのgitレポジトリは以前の状態にファイルを復帰する機能を持っているのですが、その情報はすべてローカルに保存されています。gitレポジトリを別のコンピューターにも保存することで、ローカルのデーターがすべて失われたとしても、保存状態からコーディングを続けられます。",
              "",
              "- それよりも大切に、リモートではコードをよりソーシャル的に公開できます!プロジェクトのコピーが別の場所に保存されているため、友達などが簡単にそのプロジェクトに参加したり最近の変更をpullしたりできます。",
              "",
              "最近ではリモートレポジトリに関するデーターをビジュアル的に表示するウェブサイト([Github](https://github.com/)や[Phabricator](http://phabricator.org/)など)の使用が人気を集めていますが、レモートレポジトリは_いつでも_そのウェブサイトの裏に使われています。なので理解する必要があります。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## リモートを作成するコマンド",
              "",
              "今までLearn Git Branchingでは_ローカル_レポジトリの様々な作業（branch, merge, rebaseなど）に焦点を当ててきました。しかし、これからはリモートレポジトリの作業を学びますので、レッスンのために環境をセットアップする必要があります。そのコマンドは`git clone`になります。",
              "",
              "普通の場合では`git clone`はリモートレポジトリ（githubなどから）を_ローカル_にコピーする時に使います。しかしLearn Git Branchingでは少し違ったように使います -- ここでは`git clone`が_ローカルレポジトリ_をリモートにコピーします。本当のコマンドの逆の動作になっているのですが、このようにcloneとリモートレポジトリのつながりが見えてきますので今のところは例として使いましょう。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "最初の一歩として、ビジュアライズでレモートレポジトリを見てみましょう。",
              ""
            ],
            "afterMarkdowns": [
              "できました! プロジェクトのリモートレポジトリが保存されました。結構似ているのですが、その違いを明らかにするために少しだけビジュアルを工夫しました -- これからのレベルではこれらのレポジトリの間で作業をどう共有するか見ていきます。"
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルをクリアするには、`git clone`で既存のレポジトリのクローンを作成します。次のレッスンでより詳細に見ていきます。"
            ]
          }
        }
      ]
    }
  }
};

