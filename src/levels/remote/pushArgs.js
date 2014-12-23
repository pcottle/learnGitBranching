exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C2\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C3\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"C0\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin master;git push origin foo",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"C0\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "disabledMap": {
    "git checkout": true
  },
  "name": {
    "en_US": "Git push arguments",
    "zh_CN": "Git push 的参数",
    "zh_TW": "git push 的參數",
    "es_AR": "Parámetros de git push",
    "pt_BR": "Parâmetros do git push",
    "de_DE": "Optionen für Git Push",
    "ja"   : "Git pushの引数",
    "fr_FR": "Paramètres de git push"
  },
  "hint": {
    "en_US": "You can always look at the last slide of the dialog with \"objective\"",
    "zh_CN": "你可以利用 \"objective\" 来阅读对话窗口的最后一页",
    "zh_TW": "你可以利用 \"objective\" 來閱讀對話視窗的最後一頁",
    "es_AR": "Siempre podés ver el último mensaje tipeando \"objective\"",
    "pt_BR": "Você sempre pode rever o último slide com o comando \"objective\"",
    "de_DE": "Du kannst dir die Zielsetzung des Levels immer wieder mit \"objective\" anzeigen lassen",
    "ja"   : "ダイアログの最後のスライドを参照するには\"objective\"を実行",
    "fr_FR": "Vous pouvez toujours regarder le dernier slide des dialogues en tapant \"objective\"."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Push arguments",
              "",
              "Great! Now that you know about remote tracking branches we can start to uncover some of mystery behind how git push, fetch, and pull work. We're going to tackle one command at a time but the concepts between them are very similar.",
              "",
              "First we'll look at `git push`. You learned in the remote tracking lesson that git figured out the remote *and* the branch to push to by looking at the properties of the currently checked out branch (the remote that it \"tracks\"). This is the behavior with no arguments specified, but git push can optionally take arguments in the form of:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "What is a `<place>` parameter you say? We'll dive into the specifics soon, but first an example. Issuing the command:",
              "",
              "`git push origin master`",
              "",
              "translates to this in English:",
              "",
              "*Go to the branch named \"master\" in my repository, grab all the commits, and then go to the branch \"master\" on the remote named \"origin.\" Place whatever commits are missing on that branch and then tell me when you're done.*",
              "",
              "By specifying `master` as the \"place\" argument, we told git where the commits will *come from* and where the commits *will go*. It's essentially the \"place\" or \"location\" to synchronize between the two repositories.",
              "",
              "Keep in mind that since we told git everything it needs to know (by specifying both arguments), it totally ignores where we are checked out!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see an example of specifying the arguments. Note the location where we are checked out in this example."
            ],
            "afterMarkdowns": [
              "There we go! `master` got updated on the remote since we specified those arguments."
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What if we hadn't specified the arguments? What would happen?"
            ],
            "afterMarkdowns": [
              "The command fails (as you can see), since `HEAD` is not checked out on a remote-tracking branch."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, for this level let's update both `foo` and `master` on the remote. The twist is that `git checkout` is disabled for this level!"
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
              "## Les arguments de push",
              "",
              "Bien ! Maintenant que vous connaissez le suivi des branches, nous pouvons fouiller ce qui se cache derrière le fonctionnement de push, fetch, et pull. Nous allons aborder une commande à la fois, mais elles sontt très similaires.",
              "",
              "En premier lieu regardons `git push`. Vous avez appris dans la leçon sur le suivi des branches que git détermine le dépôt distant *et* la branche à envoyer en regardant les propriétés de la branche courante (i.e. la branche qu'elle \"suit\" -- track). C'est le comportement quand aucun argument n'est spécifié, mais git peut optionnellement prendre des arguments de la forme :",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Quel est le paramètre `<place>`? Nous allons voir ces particularités bientôt, mais d'abord un exemple. Exécuter la commande :",
              "",
              "`git push origin master`",
              "",
              "translates to this in English:",
              "",
              "*Va dans la branche \"master\" de mon dépôt, récupère tous les commits, et ensuite va dans la branche distante \"master\" sur le dépôt nommé \"origin\". Cela place tous les commits manquants sur cette branche puis me notifie quand c'est terminé.*",
              "",
              "En spécifiant `master` comme argument \"place\", nous avons dit à git *d'où* les commits venaient et où ils *allaient*. C'est en fait \"l'emplacment\" à synchroniser entre les deux dépôts.",
              "",
              "Gardez à l'esprit que nous avons dit à git tout ce dont il a besoin (en précisant les deux arguments), il ignore totalement quelle est la branche courante !"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons un exemple d'arguments. Notez la branche courante dans cet exemple."
            ],
            "afterMarkdowns": [
              "Voilà ! `master` a été mise à joure puisque nous avons spécifié ces arguments."
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Et si nous n'avions pas mis d'arguments ? Que ce serait-il passé ?"
            ],
            "afterMarkdowns": [
              "La commande échoue (comme vous pouvez le voir), car `HEAD` ne se trouve pas sur une branche configurée pour suivre une branche distante."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, pour ce niveau mettez à jour `foo` et `master` sur le dépôt distant. La difficulté est que `git checkout` est désactivée pour ce niveau !"
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
              "## Parámetros de push",
              "",
              "¡Genial! Ahora que sabés acerca de las ramas que trackean remotos podemos empezar a develar algo del misterio detrás de git push, fetch y pull. Vamos a atacar de a un comando a la vez, pero los conceptos entre ellos son muy similares.",
              "",
              "Veamos primero `git push`. Ya aprendiste en la lección sobre ramas remotas que git determinó el remoto *y* la rama a la que pushear mirando las propiedades de la rama actual (el remoto al que \"trackea\"). Este es el comportamiento default para cuando no se especifican parámetros, pero git push toma, opcionalmente, parámetros de la forma:",
              "",
              "`git push <remoto> <lugar>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¿Qué será este parámetro `<lugar>`, te preguntarás? Ya vamos a entrar en detalle, pero primero un ejemplo. Correr el comando:",
              "",
              "`git push origin master`",
              "",
              "se traduce así al español:",
              "",
              "*Andá a la rama llamada \"master\" en mi repositorio, agarrá todos los commits, y después andá a la rama \"master\" del remoto llamado \"origin\". Aplicá ahí todos los commits que falten, y avisame cuando termines.*",
              "",
              "Especificando `master` como el parámetro \"lugar\", le dijimos a git de dónde traer los commits, y a dónde mandarlos. Es, básicamente, el \"lugar\" o \"ubicación\" que sincronizar entre ambos repositorios.",
              "",
              "Tené en cuenta que, como le dijimos a git todo lo que necesitaba saber (especificando ambos parámetros), ¡ignora totalmente dónde estamos parados en este momento¡"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos un ejemplo especificando los parámetros. Notá en dónde estamos parados en este ejemplo."
            ],
            "afterMarkdowns": [
              "¡Ahí está! Se actualizó `master` en el remoto, porque especificamos esos parámetros."
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Y si no especificabamos los parámetros? ¿Qué hubiera pasado?"
            ],
            "afterMarkdowns": [
              "El comando falla (como podés ver), porque `HEAD` no está sobre ninguna rama que trackee algún remoto."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok. Para este nivel, actualicemos tanto `foo` como `master` en el remoto. El tema está en que ¡tenemos deshabilitado `git checkout` en este nivel!"
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
              "## Parâmetros do push",
              "",
              "Ótimo! Agora que você sabe sobre remote tracking de ramos, podemos começar a revelar um pouco do mistério por trás de como o push, o fetch e o pull funcionam. Vamos lidar com um comando por vez, mas os conceitos são bastante similares.",
              "",
              "Primeiro, vamos abordar o `git push`. Você aprendeu na lição sobre remote tracking que o Git descobria o repositório remoto *e* o ramo correspondente onde fazer o push olhando nas propriedades do ramo que está atualmente em checkout (verificando o ramo remoto que ele \"segue\"). Este é o comportamento quando nenhum parâmetro é especificado, mas o git push pode opcionalmente receber parâmetros na seguinte forma:",
              "",
              "`git push <repositório remoto> <lugar>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Você deve estar se perguntando: o que é esse parâmetro `<lugar>`? Vamos discutir as especifidades em breve, mas vejamos primeiro um exemplo. Executar o comando:",
              "",
              "`git push origin master`",
              "",
              "pode ser traduzido para o seguinte em Português:",
              "",
              "*Vá ao ramo chamado \"master\" no meu repositório local, pegue todos os commits, então vá ao ramo \"master\" no repositório remoto chamado \"origin\". Coloque quaisquer commits que estiverem faltando nesse ramo, e então me diga quando estiver pronto.*",
              "",
              "Especificando `master` como parâmetro \"lugar\", dizemos ao Git de onde os commits *vão vir* e para onde os commits *irão*. É essencialmente o \"lugar\" onde sincronizar entre os dois repositórios.",
              "",
              "Tenha em mente que já que contamos ao Git tudo que ele precisa saber (especificando ambos os parâmetros), ele ignora totalmente o checkout atual!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vejamos um exemplo especificando os argumentos. Preste atenção no commit que sofreu checkout neste exemplo."
            ],
            "afterMarkdowns": [
              "Aqui vamos nós! O `master` foi atualizado no repositório remoto, já que especificamos os parâmetros."
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "E se eu não especificasse parâmetros? O que aconteceria?"
            ],
            "afterMarkdowns": [
              "O comando falha (como você pode ver), já que o `HEAD` não havia sofrido checkout para um ramo com propriedade de remote-tracking definida."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, neste nível vamos atualizar tanto o `foo` como o `master` no repositório remoto. Porém desabilitamos o comando `git checkout` para dificultar um pouco a tarefa!"
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
              "## push 的參數",
              "",
              "太好了！現在你已經明白了 remote tracking，我們可以開始聊 git push、fetch 以及 pull 的一些有趣的地方，我們一次會講解一個指令，但是它們之間的概念是很類似的。",
              "",
              "首先我們來看一下 `git push`，你已經在 remote tracking 的課程中學習到 git 是根據目前 checkout 的 branch 所 track 的 remote branch 來做 push，這是在沒有任何的參數的情況下的預設動作，但是 git push 允許我們可以加上一些參數：",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`<place>` 這個參數表示什麼? 我們等一下會提到細節，但是先來看一個例子，執行以下的指令：",
              "",
              "`git push origin master`",
              "",
              "將這段解釋成中文：",
              "",
              "*先到我的 repo 中的 \"master\" branch，抓下所有的 commit，然後到叫作 \"origin\" 的 remote 的 \"master\" branch，檢查 remote 的 commit 有沒有跟我的 repo 一致，如果沒有，就更新。*",
              "",
              "將 `master` 當作 \"place\" 這個參數，我們告訴 git 這些 commit 是*從哪裡來的*，而且它們要*往哪裡去*。對於要同步兩個 repo， \"place\" 或者是 \"location\" 是非常重要的。",
              "",
              "要記住喔，因為我們告訴 git 它所要知道的（有兩個參數），因此它才不會管你現在所 checkout 的 branch！"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們來看一個有加上參數的例子，在這個例子中，要特別注意到我們所 checkout 的位置。"
            ],
            "afterMarkdowns": [
              "我說的沒錯吧！因為我們加上了參數，所以在 remote 上的 `master` branch 更新了"
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "假如我們沒有特別指令參數會發生什麼事情？"
            ],
            "afterMarkdowns": [
              "指令會失敗（就像你看到的），因為 `HEAD` 並沒有指向一個有 track remote branch 的 branch 上面阿。"
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好的，在這個關卡中，我們要更新在 remote 上的 `foo` 以及 `master` branch，比較遺憾的是 `git checkout` 在這個關卡中是不被允許的喔！"
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
              "## Push 参数",
              "",
              "好! 既然你知道了远端跟踪分支, 我们可以开始揭开隐藏在git push/pull/fetch背后的秘密. ",
              "",
              "首先看看`git push`, 在远端跟踪分支中, 你学到了git 会找出要push的目的地(通过查看检出的分支, 及分支关联到的跟踪分支). 这是无参数的行为, 不过我们也可以为push指定参数:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`<place>` 参数意味什么呢? 我们会深入其中的细节, 先看看例子, 这个命令是:",
              "",
              "`git push origin master`",
              "",
              "* 切到master分支, 然后抓取所有的提交, 再将新提交推送到远端的master分支!",
              "",
              "通过指定`master`为<place>参数, 我们告诉git 提交来自于master, 要推送到远端的master. 这种使用方式基本上用于同步两仓库",
              "",
              "谨记, 因为我们通过指定参数告诉了git 所有的事, git 就忽略了我们所检出的分支(转而直接使用参数指定的分支作为source/destination)"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我们看看指定参数的例子. 注意下我们当前检出的位置."
            ],
            "afterMarkdowns": [
              "好了! 通过指定参数, 远端的`master` 得到了更新"
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "不指定参数会发生什么呢?"
            ],
            "afterMarkdowns": [
              "命令失败了! 因为我们所check out 的HEAD没有跟踪分支.  "
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "本节, 我们要更新远端的`foo`和`master`, 在本节中`git checkout` 是被禁用的!"
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
              "## Push-Optionen",
              "",
              "Großartig! Da du dich jetzt mit Remote Tracking Branches auskennst können wir anfangen, die Geheimnisse hinter `git push`, `fetch` und `pull` zu ergründen. Wir werden uns einen Befehl nach dem anderen vornehmen, aber die Funktionsweisen sind sich sehr ähnlich.",
              "",
              "Zunächst schauen wir uns `git push` an. Du hast im Level über Remote Tracking schon mitbekommen, dass Git den Remote Server *und* den Branch herausbekommt, indem es sich die Eigenschaften des aktuell ausgecheckten Branches ansieht (in denen das Remote steht, das der Branch \"trackt\"). Das ist das Verhalten bei keiner Angabe weiterer Optionen -- du kannst bei `git push` aber auch folgende setzen:",
              "",
              "`git push <Remote> <Ort>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Was \"Ort\" sein soll fragst du? Das klären wir später genau, schauen wir uns zunächst ein Beispiel an:",
              "",
              "`git push origin master`",
              "",
              "Das bedeutet im Klartext:",
              "",
              "\"Geh zum Branch namens `master` in meinem Repository, nimm all seine Commits, dann geh zum Branch `master` auf dem Remote namens `origin`. Leg da alles Commits ab die fehlen und sag mir wenn du fertig bist.\"",
              "",
              "Dadurch, dass wir `master` als \"Ort\" angegeben haben, weiß Git *woher* die Commits kommen und *wohin* sie sollen. Es ist im Grunde der Name der Orte, die zwischen zwei Repositorys synchronisiert werden soll.",
              "",
              "Dadurch, dass wir Git alles explizit gesagt haben, was es für die Operation wissen muss (durch Angabe von Remote und Ort) ist es vollkommen egal, was gerade ausgecheckt ist."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns noch ein Beispiel an. Beachte was in diesem Fall gerade ausgecheckt ist."
            ],
            "afterMarkdowns": [
              "Da haben wir's! `master` wurde auf dem Remote aktualisiert, weil wir beide Optionen angegeben haben."
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was wäre passiert, wenn wir keine Optionen benutzt hätten?"
            ],
            "afterMarkdowns": [
              "Der Befehl schlägt fehlt, da `HEAD` nicht auf einem Branch steht, der ein Remote trackt."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, in diesem Level lass und sowohl `foo` als auch `master` auf dem Remote aktualisieren. Um's spannender zu machen, ist `git checkout` in diesem Level deaktiviert."
            ]
          }
        }
      ]
    }
  }
};
