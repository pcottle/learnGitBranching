exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/bar\":{\"target\":\"C1\",\"id\":\"o/bar\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C2\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C5\":{\"parents\":[\"C3\",\"C4\"],\"id\":\"C5\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C6\":{\"parents\":[\"C2\",\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C3\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"bar\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git pull origin bar:foo;git pull origin master:side",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/bar\":{\"target\":\"C1\",\"id\":\"o/bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C3\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"bar\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Pull arguments",
    "zh_CN": "Pull arguments",
    "zh_TW": "pull 的參數",
    "es_AR": "Parámetros de pull",
    "de_DE": "Optionen für Pull"
  },
  "hint": {
    "en_US": "Remember that you can create new local branches with fetch/pull arguments",
    "zh_CN": "记住, 你可以通过fetch/pull创建本地分支",
    "zh_TW": "記住，你可以透過 fetch 以及 pull 來建立一個新的 local 的 branch",
    "es_AR": "Acordate de que podés crear nuevas ramas locales usando los parámetros de fetch/pull",
    "de_DE": "Du kannst neue lokale Branches mittels fetch / pull erstellen"
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
              "See! by specifying `master` we downloaded commits onto `o/master` just as normal. Then we merged `o/master` to where we are, *regardless* of what was currently checked out."
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
              "那是因為 `git pull` 到目前為止*的確*只是表示 fetch 之後再 merge 所 fetch 的 commit， 你可以把它想成，當使用 `git fetch` 時使用*一樣*的參數，之後再從 fetch 下來的 commit *所放置*的位置做 merge。",
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
              "看吧！ 指定位置為 `master`，跟平常一樣，我們下載了 commit 並且放到 `o/master` 上，接著，我們會 merge `o/master` 到我們現在的位置，*不管*我們現在所 checkout 的位置在哪裡。"
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
                "哇！這個指令強而有力，我們在 local 建立了一個新的 `foo` branch，下載了 remote 的 `master` 的 commit，並且放到 local 的 `foo` branch，之後 merge `foo` branch 到我們目前所 checkout 的 `bar` branch。 這實在是在超過了！！！"
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
              "现在你知道关于fetch/push几乎所有的东西了, 不过pull也有一个\"nothing\"呢!:)",
              "",
              "That's because git pull at the end of the day is *really* just shorthand for a fetch followed by merging in whatever was just fetched. You can think of it as running git fetch with SAME arguments specified and then merging in *where* those commits ended up.",
              "因为 git pull 就是fetch后跟merge的缩写. 我可以认为执行git fetch 用了相同的参数, 然后再merge 你所fetch的提交(commit)",
              "",
              "这可以和其它更复杂的参数一起使用, 看看例子:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Here are some equivalent commands in git:",
              "以下命令在git中是等价的:",
              "",
              "`git pull  origin foo` is equal to:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "还有...",
              "",
              "`git pull  origin bar~1:bugFix` is equal to:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "看到了? git pull 实际上就是fetch + merge的缩写, git pull 在乎的是提交在哪里结束(也就是git fetch所确定的destination)",
              "",
              "Lets see a demo:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果我们指定要提取的<place>, 所有的事情都会跟之前一样发生, 除了merge.  "
            ],
            "afterMarkdowns": [
              "看! 通过指定master 我们更新了o/master. 然后我们merge `o/master` 到我们的检出分支(当前检出的任意分支). "
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "这也适用于source / destination 吗? 当然喽, 看看吧:"
            ],
            "afterMarkdowns": [
              " 哇, 这就一个命令. 我们在本地创建了一个叫foo的分支, 远端的master分支, 被下载到了本地foo分支. 然后再merge到我们的当前分支. 终于完啦!9000!!!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好啦, 做作业! 请获取虚拟目标.  你需要下载一些提交,然后创建一些新分支, 再合并这些分支到其它分支, 这花不了几个命令 :P "
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
    }
  }
};
