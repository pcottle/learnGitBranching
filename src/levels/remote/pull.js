exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git pull",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git Pullin'",
    "zh_CN": "Git Pull",
    "zh_TW": "git pull'",
    "es_AR": "git pull",
    "pt_BR": "Git Pull",
    "de_DE": "Git Pull",
    "ja"   : "Git Pull",
    "fr_FR": "Git pull"
  },
  "hint": {
    "en_US": "Just run git pull!",
    "zh_CN": "只要运行 git pull 命令!",
    "zh_TW": "只要下 git pull 這個指令即可",
    "es_AR": "Simplemente ¡hacé git pull!",
    "pt_BR": "Basta executar git pull!",
    "de_DE": "Führe einfach git pull aus.",
    "ja"   : "単にgit pullを実行！",
    "fr_FR": "Utilisez facilement git pull !"
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
              "Maintenant que vous avez vu comment rapatriez des données depuis un dépôt distant avec `git fetch`, mettons à jour notre copie de travail pour refléter ces changements !",
              "",
              "Il existe en fait beaucoup de façons de faire cela -- une fois que vous avez de nouveaux commits disponibles localements, vous pouvez les incorporer comme s'ils étaient des commits normaux d'autres branches. Cela signifie que pourriez juste exécuter des commandes comme :",
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
              "Boum -- nous avons téléchargé `C3` avec un `fetch` et ensuite nous avons fusionné ce travail dans notre copie avec `git merge o/master`. Maintenant nôtre branche `master` reflète le nouveau travail du dépôt distant (dans ce cas, nommé `origin`)"
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
              "Nous allons explorer les détails de `git pull` plus tard (y compris options et arguments), mais essayons d'abord cela dans notre niveau.",
              "",
              "Rappelez-vous -- vous pouvez aussi résoudre ce niveau avec `fetch` et `merge`, mais cela vous coûtera une commande supplémentaire :P"
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
              "事實上，一次*下載 (fetch)* remote 的更新並且*合併（merge）* 這些更新在 git 裡面是很常見的事情！ 這個命令叫作 `git pull`。"
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
              "现在我们已经知道了如何用`git fetch` 获取远端的变化, 现在我们学习如果将这些变化更新到我们的工作.",
              "",
              "其实有很多方法的 -- 只要我在本地有新的提交, 你可以像合并其它分支那样合并远端分支. 具体说就是你可以执行以下命令: ",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* etc, etc",
              "",
              "实际上, fetch / merge 变更是这样的普通, 以至于git 提供了一个实际两个功能的命令 -- `git pull`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我们先顺序执行`fetch`,`merge` "
            ],
            "afterMarkdowns": [
              "我们用`fetch`下载了`C3`, 然后通过`git merge o/master`合并了这一提交. 现在我们的`master`分支映射到了远端的新工作"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果使用`git pull`呢?"
            ],
            "afterMarkdowns": [
              "同样的结果! 这清楚的说明了`git pull`就是git fetch再跟一个merge的缩写! "
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "稍后我们会扫一下`git pull`的细节(选项和参数), 现在我们先完成作业.",
              "",
              "记住, 你可以用fetch/merge 通过本节, 但是这会增加你的命令.:P"
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
              "* usw. usf. ausfúhren.",
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
    }
  }
};
