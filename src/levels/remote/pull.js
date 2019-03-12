exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git pull",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git Pullin'",
    "zh_CN": "Git Pull",
    "zh_TW": "git pull",
    "es_AR": "git pull",
    "pt_BR": "Git Pull",
    "gl"   : "Git Pull",
    "de_DE": "Git Pull",
    "ja"   : "Git Pull",
    "fr_FR": "Git pull",
    "ru_RU": "Git pull",
    "uk"   : "Git pull",
    "ko"   : "Git pull"
  },
  "hint": {
    "en_US": "Just run git pull!",
    "zh_CN": "运行 git pull 命令就可以了！",
    "zh_TW": "只要下 git pull 這個指令即可",
    "es_AR": "Simplemente ¡hacé git pull!",
    "pt_BR": "Basta executar git pull!",
    "gl"   : "Sinxelamente fai git pull!",
    "de_DE": "Führe einfach git pull aus.",
    "ja"   : "単にgit pullを実行！",
    "fr_FR": "Utilisez facilement git pull !",
    "ru_RU": "Запустите комманду git pull !",
    "uk"   : "Просто виконай git pull !",
    "ko"   : "그냥 git pull을 하세요!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Pull",
              "",
              "Now that we've seen how to fetch data from a remote repository with `git fetch`, let's update our work to reflect those changes!",
              "",
              "There are actually many ways to do this -- once you have new commits available locally, you can incorporate them as if they were just normal commits on other branches. This means you could execute commands like:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* etc., etc.",
              "",
              "In fact, the workflow of *fetching* remote changes and then *merging* them is so common that git actually provides a command that does both at once! That command is `git pull`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's first see a `fetch` and a `merge` executed sequentially"
            ],
            "afterMarkdowns": [
              "Boom -- we downloaded `C3` with a `fetch` and then merged in that work with `git merge o/master`. Now our `master` branch reflects the new work from the remote (in this case, named `origin`)"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What would happen if we used `git pull` instead?"
            ],
            "afterMarkdowns": [
              "The same thing! That should make it very clear that `git pull` is essentially shorthand for a `git fetch` followed by a merge of whatever branch was just fetched."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "We will explore the details of `git pull` later (including options and arguments), but for now let's try it out in the level.",
              "",
              "Remember -- you can actually solve this level with just `fetch` and `merge`, but it will cost you an extra command :P"
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
              "## Git Pull",
              "",
              "Maintenant que vous avez vu comment rapatrier des données depuis un dépôt distant avec `git fetch`, mettons à jour notre copie de travail pour refléter ces changements !",
              "",
              "Il existe en fait beaucoup de façons de faire cela -- une fois que vous avez de nouveaux commits disponibles localement, vous pouvez les incorporer dans votre branche de travail comme s'ils étaient des commits normaux d'autres branches. Cela signifie que pourriez simplement exécuter des commandes comme :",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* etc., etc.",
              "",
              "En fait, le principe de *rapatrier* (fetch) les branches distantes puis les *fusionner* (merge) est si commun que git a en réalité une commande pour faire les deux à la fois ! Cette commande est `git pull`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons d'abord un `fetch` puis un `merge` exécutés séquentiellement"
            ],
            "afterMarkdowns": [
              "Boum -- nous avons téléchargé `C3` avec un `fetch` et ensuite nous avons fusionné ce travail dans notre copie avec `git merge o/master`. Maintenant notre branche `master` reflète le nouveau travail du dépôt distant (dans ce cas, nommé `origin`)"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Que se passerait-il si nous utilisions plutôt `git pull` ?"
            ],
            "afterMarkdowns": [
              "La même chose ! Cela devrait maintenant être clair que `git pull` est surtout un raccourci pour `git fetch` suivi d'un merge de toutes les branches qui viennent d'avoir un fetch."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Nous allons explorer les détails de `git pull` plus tard (y compris options et arguments), mais pour ce niveau pratiquons d'abord la technique de base.",
              "",
              "Rappelez-vous : vous pouvez aussi résoudre ce niveau avec `fetch` et `merge`, mais cela vous coûtera une commande supplémentaire :P"
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
              "## Git Pull",
              "",
              "Ahora que vimos cómo traer datos de un repositorio remoto con `git fetch`, ¡actualicemos nuestro trabajo local para reflejar esos cambios!",
              "",
              "Realmente hay varias formas de hacer esto: una vez que tenés los commits disponibles localmente, podés integrarlos como si fueran commits comunes de otras ramas. Esto significa que podrías ejecutar comandos como:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* etc., etc.",
              "",
              "De hecho, el flujo de trabajo de *fetchear* cambios remotos y después *mergearlos* es tan común que git incluye un comando que hace ambas cosas de una: ¡`git pull`!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos primero un `fetch` y un `merge` ejecutados secuencialmente"
            ],
            "afterMarkdowns": [
              "Boom: descargamos `C3` con un `fetch` y luego lo mergeamos con `git merge o/master`. Ahora nuestra rama `master` refleja el nuevo trabajo del remoto (en este caso, llamado `origin`)"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué pasaría si usáramos `git pull` en cambio?"
            ],
            "afterMarkdowns": [
              "¡Lo mismo! Eso debería dejar bien en claro que `git pull` es básicamente un atajo para hacer `git fetch` seguido por un merge con la rama que sea que hayamos bajado."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Exploraremos los detalles de `git pull` después (incluyendo sus opciones y parámetros), pero por ahora probémoslo en este nivel.",
              "",
              "Acordate: podés resolver este comando simplemente con `fetch` y `merge`, pero eso te costaría un comando extra :P"
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
              "## Git Pull",
              "",
              "Agora que vimos como baixar dados de um repositório remoto com `git fetch`, vamos atualizar nosso trabalho para refletir essas mudanças!",
              "",
              "Há, na verdade, muitas formas de fazê-lo -- uma vez que você tenha os novos commits disponíveis localmente, você pode incorporá-los como se eles fossem commits normais em outros ramos. Isso significa que você pode executar comandos como estes a seguir:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* etc., etc.",
              "",
              "O fluxo de trabalho de executar *fetch* para baixar as mudanças remotas e depois fazer um *merge* delas é tão comum que o Git na verdade fornece um comando que faz ambas as coisas de uma vez só! Esse comando é o `git pull`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos primeiro ver um `fetch` e um `merge` executados sequencialmente"
            ],
            "afterMarkdowns": [
              "Boom -- nós baixamos o `C3` com um `fetch` e então fizemos um merge desse trabalho usando `git merge o/master`. Agora o nosso ramo `master` reflete o trabalho realizado no repositório remoto (neste caso, chamado de `origin`)"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "O que iria acontecer se, em vez disso, usássemos `git pull`?"
            ],
            "afterMarkdowns": [
              "Exatamente o mesmo! Isso deve tornar bem claro que `git pull` é essencialmente um caminho mais curto para executar um `git fetch` seguido de um merge de seja já qual ramo tiver sido baixado."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Vamos explorar os detalhes do `git pull` mais tarde (incluindo opções e parâmetros), mas por enquanto, experimente usá-lo em sua forma mais básica.",
              "",
              "Lembre-se -- você também poderia resolver este nível com um `fetch` e um `merge`, mas isso lhe custaria um comando a mais :P"
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
              "## Git Pull",
              "",
              "Agora que vimos cómo traer os datos dun repositorio remoto con `git fetch`, ¡actualicemos o noso traballo local para reflexar eses cambios!",
              "",
              "Realmente hai varias formas de facer esto: unha vez que teñas os commits dispoñibles localmente, podes integralos coma se foran commits comúns de outras ramas. Esto significa que poderías executar comandos como:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* etc., etc.",
              "",
              "De feito, o fluxo de traballo de *fetchear* os cambios remotos e depois *mesturalos* é tan común que git inclúe un comando que fai as dúas operacións nunha sola: ¡`giti pull`!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vexamos primeiro un `fetch` e un `merge` executados secuencialmente"
            ],
            "afterMarkdowns": [
              "Boom: descargamos `C3` cun `fetch` e logo mesturámolos con `git merge o/master`. Agora a nosa rama `master` reflexa o novo traballo do remoto (neste caso, chamado `origin`)"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué pasaría se usáramos `git pull` en cambio?"
            ],
            "afterMarkdowns": [
              "¡O mesmo! Eso debía deixar ben claro que `git pull` é básicamente un atallo para facer `git fetch` seguido pola mestura ca rama que houbésemos descargado."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Exploraremos os detalles de `git pull` despois (incluíndo as súas operacións e parámetros), pero por agora probarémolo neste nivel.",
              "",
              "Lémbrate: podes resolver este comando sinxelamente con `fetch` e `merge`, pero eso costaríache un comando extra :P"
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
              "## git pull",
              "",
              "現在我們已經知道如何利用 `git fetch` 從 remote 抓取 commit，讓我們來看一下如何將這些 commit 更新到我們的檔案！",
              "",
              "只要在你的 local 有 fetch 到新的 commit，便有很多方法可以做到這件事情，你可以把它們視為在其它 branch 上面的一般的 commit，這表示你可以執行像這樣子的指令:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* 等等‧‧‧",
              "",
              "事實上，一次*下載 (fetch)* remote 的更新並且*合併（merge）* 這些更新在 git 裡面是很常見的事情！這個命令叫作 `git pull`。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們來看循序執行一個 `fetch` 和一個 `merge` 的樣子"
            ],
            "afterMarkdowns": [
              "看吧! 我們利用 `fetch` 下載了 `C3` 並且利用 `git merge o/master` 來更新資料，現在我們的 `master` branch 跟 remote 同步了（在這個例子中，remote repository 叫作 `origin`）。"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果用 `git pull` 會發生什麼事情？"
            ],
            "afterMarkdowns": [
              "一樣！很明顯地，`git pull` 其實就是 git fetch 跟 git merge 的循序執行的結果，而且 merge 的 branch 就是 fetch 所更新的 branch。"
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "我們會解釋 `git pull` 的細節（包括可選擇的參數）, 但現在先讓我們在這個關卡試試看！",
              "",
              "記住喔，你可以利用循序執行的方式來執行 `fetch` 以及 `merge` 來完成這個關卡，但是相對於 `git pull`，你就得多打一個指令。:P"
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
              "## Git Pull",
              "",
              "既然我们已经知道了如何用 `git fetch` 获取远程的数据, 现在我们学习如何将这些变化更新到我们的工作当中。",
              "",
              "其实有很多方法的 —— 当远程分支中有新的提交时，你可以像合并本地分支那样来合并远程分支。也就是说就是你可以执行以下命令: ",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* 等等",
              "",
              "实际上，由于先抓取更新再合并到本地分支这个流程很常用，因此 Git 提供了一个专门的命令来完成这两个操作。它就是我们要讲的 `git pull`。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我们先来看看 `fetch`、`merge` 依次执行的效果"
            ],
            "afterMarkdowns": [
              "我们用 `fetch` 下载了 `C3`, 然后通过 `git merge o/master` 合并了这一提交记录。现在我们的 `master` 分支包含了远程仓库中的更新（在本例中远程仓库名为 `origin`）"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果使用 `git pull` 呢?"
            ],
            "afterMarkdowns": [
              "同样的结果！这清楚地说明了 `git pull` 就是 git fetch 和 git merge <just-fetched-branch> 的缩写！"
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "稍后我们会探索一下 `git pull` 的细节(包括选项和参数)，现在咱们先解决这个关卡。",
              "",
              "实际上你完全可以用 `fetch` 和 `merge` 通过本关，但是这会增加你的命令数。 :P"
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
              "## Git Pull",
              "",
              "Jetzt, wo wir wissen wie wir mit `git fetch` Daten von einem entfernten Repository holen können, wollen wir unsere lokalen Daten aktualisieren, damit sie die Änderungen vom Server beinhalten.",
              "",
              "Tatsächlich gibt es eine Menge Wege dies zu erreichen -- sobald du die neuen Commits lokal verfügbar hast, kannst du sie integrieren so als wären es Commits von ganz normalen anderen Branches. Du kannst also:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* usw. usf. ausführen.",
              "",
              "Der Ablauf, die Änderungen vom Server zu holen und dann in die eigene Arbeit zu mergen wird so häufig benötigt, dass Git einen Befehl kennt der beides auf einmal erledigt! Das ist `git pull`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns erst mal ein `fetch` gefolgt von `merge` an:"
            ],
            "afterMarkdowns": [
              "Bämm -- wir haben `C3` mit `fetch` heruntergeladen und dann in unseren Branch mit `git merge o/master` integriert. Nun bildet unser `master` dieselben Inhalte ab, wie sie auf dem entfernten Server (`origin`) liegen."
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was passiert wohl, wenn wir stattdessen `git pull` benutzen?"
            ],
            "afterMarkdowns": [
              "Dasselbe in Pink. Das sollte recht deutlich machen, dass `git pull` nur eine Abkürzung für `git fetch` gefolgt von einem Merge des gerade aktualisierten Branches ist."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Die Feinheiten von `git pull` werden wir uns später ansehen, für's Erste lass es uns in diesem Level ausprobieren.",
              "",
              "Vergiss nicht -- du kannst diesen Level auch mit `fetch` und `merge` lösen, aber das kostet dich einen Befehl extra. :P"
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
                          "## Git Pull",
                          "",
                          "Теперь, когда мы познакомились с тем, как извлекать данные из удалённого репозитория с помощью `git fetch`, давайте обновим нашу работу, чтобы отобразить все эти изменения!",
                          "",
                          "Существует множество вариантов решений - как только у вас имеется локальный коммит, вы можете соединить его с другой веткой. Это значит, вы можете выполнить одну из команд:",
                          "",
                          "* `git cherry-pick o/master`",
                          "* `git rebase o/master`",
                          "* `git merge o/master`",
                          "* и т.д.",
                          "",
                          "Процедура *скачивания (fetching)*  изменений с удалённой ветки и *объединения (merging)* настолько частая и распространённая, что git предоставляет вместо двух команд - одну! Эта команда  - `git pull`."
                      ]
                  }
              },
              {
                  "type": "GitDemonstrationView",
                  "options": {
                      "beforeMarkdowns": [
                          "Давайте рассмотрим, как `fetch` и `merge` выполняются последовательно"
                      ],
                      "afterMarkdowns": [
                          "Опа - мы скачали `C3` с помощью команды `fetch` и затем объединяем эти наработки с помощью `git merge o/master`. Теперь наша ветка `master` отображает изменения с удалённого репозитория (в данном случае — с репозитория `origin`)"
                      ],
                      "command": "git fetch; git merge o/master",
                      "beforeCommand": "git clone; git commit; git fakeTeamwork"
                  }
              },
              {
                  "type": "GitDemonstrationView",
                  "options": {
                      "beforeMarkdowns": [
                          "Что же произойдёт, если вместо этих команд мы воспользуемся `git pull`?"
                      ],
                      "afterMarkdowns": [
                          "Абсолютно то же самое! Нужно чётко понимать, что `git pull` существенно уменьшает вашу рутинную работу, если бы вы использовали `git fetch` и последующее слияние (merging) скаченной ветки."
                      ],
                      "command": "git pull",
                      "beforeCommand": "git clone; git commit; git fakeTeamwork"
                  }
              },
              {
                  "type": "ModalAlert",
                  "options": {
                      "markdowns": [
                          "Мы изучим детали команды `git pull` чуть позже (включая опции и аргументы вызова команды), а пока что давайте просто попробуем эту команду.",
                          "",
                          "Помните, вы также можете выполнить этот уровень с помощью команд `fetch` и `merge`, но нужно ли делать так, когда можно воспользоваться всего лишь одной командой ? :P"
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
              "## Git Pull",
              "",
              "今や私たちはリモートリポジトリから`git fetch`でデータを取ってくる方法を知っているので、今度は私たちの作業にその変更を反映することを学びましょう！",
              "",
              "実際には多くの方法があり、ローカルに利用可能なリモートの新しいコミットがある場合、あなたはそのコミットを他のブランチの通常のコミットと同じように、自分の作業に組み込むことができます。これは、あなたが次のようなコマンドを実行することで行えます:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* その他",
              "",
              "実は、リモートの変更を取ってきてマージするという作業の流れはとてもよく行われるので、gitは実際にはその二つを同時に行うコマンドを提供しているのです！それは、`git pull`というコマンドです。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "まずは、連続して`fetch`して`merge`する流れの方を見てみましょう。"
            ],
            "afterMarkdowns": [
              "わーお。私たちは`C3`を`fetch`でダウンロードして、`git merge o/master`でこれをマージしました。今や私たちの`master`ブランチに(この場合、`origin`という名前の)リモートの新しい作業内容が反映されています。"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "では、`git pull`では何が起こるのでしょうか？"
            ],
            "afterMarkdowns": [
              "同じことが起こります！明確に`git pull`は`git fetch`して取ってきたブランチの内容をマージするという流れの短縮系であることが確認できます。"
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git pull`の（オプションや引数を含む）詳細はこの後にやりますが、今、このレベルではただ試してみるだけにしておきましょう。",
              "",
              "覚えておいてください。あなたは実際にはこのレベルを`fetch`と`merge`だけでこのレベルを解決することができますが、余計なコマンドのコストがかかるだけです :P"
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
              "## Git Pull",
              "",
              "Тепер, коли ми знаємо як витягувати дані з віддаленого репозиторію за допомогою `git fetch`, спробуймо оновити нашу робочу копію відповідно до цих данних!",
              "",
              "Насправді, є кілька шляхів як цого досягнути -- щойно нові коміти з’явилися локально, ти можеш додавати їх в бранчі так само, як звичайні коміти. Це означає що ти можеш виконувати команди:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* тощо.",
              "",
              "Насправді, процес *витягування* віддалених змін й подальший *мерджинг* їх є настільки популярним, що гіт пропонує спеціальну команду, що виконує ці дві дії за один раз! Ця команда називається `git pull`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Спершу виконаймо по черзі `fetch`, а потім `merge`"
            ],
            "afterMarkdowns": [
              "Ка-бум -- ми звантажили `C3` за допомогою `fetch` і потім змерджили їх, використавши `git merge o/master`. Тепер наша гілка `master` відповідає гілці з віддаленого сховища (в цьому випадку, з назвою `origin`)"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Що трапиться, якщо натомість використати `git pull`?"
            ],
            "afterMarkdowns": [
              "Те саме! Тепер очевидно що `git pull` -- це просто швидкий спосіб зробити `git fetch`, а потім змерджити завантажену гілку."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ми розглянемо `git pull` більш детально пізніше (включаючи різні опції та аргументи), наразі просто спробуймо цю команду.",
              "",
              "Не забувай -- щоб пройти цей рівень, достатньо використати `fetch`, а потім `merge`, але це буде тобі коштувати одну зайву команду :P"
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
              "## Git Pull",
              "",
              "자 우리는 원격 저장소에서 `git fetch`로 어떻게 데이터를 내려 받는지 보았습니다. 이제 우리의 작업을 업데이트해서 변경들을 반영해 봅시다!",
              "",
              "사실 이걸 하는 방법은 여러가지 있습니다 -- 새 커밋들을 로컬에 내려받은 이후에는 그냥 다른 브랜치에있는 일반 커밋처럼 활용할 수 있습니다. 이런 명령들을 실행할 수 있다는 뜻 입니다 :",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* 기타 등등",
              "",
              "사실 원격 저장소의 변경을 *fetch*하고 그이후에 *merge*하는 작업의 과정이 워낙 자주있는 일이라서 git은 이 두가지를 한번에 하는 명령을 제공합니다! 이 명령어는 `git pull` 입니다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "먼저 `fetch` 와 `merge`가 차례로 실행되는것을 확인해 봅시다"
            ],
            "afterMarkdowns": [
              "Boom -- 우리는 `C3`를 `fetch`로 내려 받고 `git merge o/master`로 우리의 작업으로 병합했습니다. 이제 우리의 `master` 브랜치는 원격 저장소의 새 작업들을 반영하게 됩니다(지금 사례에서 `origin`입니다)."
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "대신에 `git pull`을 사용하면 어떻게 될까요?"
            ],
            "afterMarkdowns": [
              "똑같은 일이 일이납니다! 이렇게 `git pull`은 본질적으로 `git fetch`후에 내려받은 브랜치를 병합하는 과정의 단축입니다. 확실하게 느껴지죠?."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git pull`의 세부적인 사항들은 나중에 알아보겠습니다 (옵션과 매개변수등) 지금은 이 레벨에서 일단 시도부터 해 봅시다.",
              "",
              "알고 넘어갑시다 -- 이 레벨을 그냥 `fetch`와 `merge`의 조합으로 해결할 수 있습니다. 하지만 명령어가 추가되겠지요 :P"
            ]
          }
        }
      ]
    }
  }
};
