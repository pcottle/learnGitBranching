exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C5\":{\"parents\":[\"C3\",\"C4\"],\"id\":\"C5\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git clone;git fakeTeamwork 2;git commit ;git pull",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Faking Teamwork",
    "fr_FR": "Simulation du travail d'équipe",
    "de_DE": "Teamarbeit simulieren",
    "ja"   : "擬似チームワーク",
    "es_AR": "Simulando el trabajo en equipo",
    "pt_BR": "Simulando trabalho em equipe",
    "zh_CN": "模拟团队合作",
    "zh_TW": "模擬團隊合作"
  },
  "hint": {
    "en_US": "remember you can specify the number of commits to fake",
    "fr_FR": "rappelez-vous que vous pouvez spécifier le nombre de commits à simuler",
    "de_DE": "Nicht vergessen, du kannst angeben wieviele Commits simuliert werden sollen.",
    "ja"   : "擬似で作成するコミット数を指定できるのをお忘れなく",
    "es_AR": "Acordate que podés especificar cuántos commits simular",
    "pt_BR": "Lembre-se que você pode especificar quantos commits quer simular",
    "zh_CN": "记住为fake中的commit指定数量",
    "zh_TW": "你要記得指定要送多少個 commit 出去"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Simulating collaboration",
              "",
              "So here is the tricky thing -- for some of these upcoming lessons, we need to teach you how to pull down changes that were introduced in the remote.",
              "",
              "That means we need to essentially \"pretend\" that the remote was updated by one of your coworkers / friends / collaborators, sometimes on a specific branch or a certain number of commits.",
              "",
              "In order to do this, we introduced the aptly-named command `git fakeTeamwork`! It's pretty self explanatory, let's see a demo..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "The default behavior of `fakeTeamwork` is to simply plop down a commit on master"
            ],
            "afterMarkdowns": [
              "There we go -- the remote was updated with a new commit, and we haven't downloaded that commit yet because we haven't run `git fetch`."
            ],
            "command": "git fakeTeamwork",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "You can also specify the number of commits or the branch by appending them to the command"
            ],
            "afterMarkdowns": [
              "With one command we simulated a teammate pushing three commits to the `foo` branch on our remote"
            ],
            "command": "git fakeTeamwork foo 3",
            "beforeCommand": "git branch foo; git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "The upcoming levels are going to be pretty difficult, so we're asking more of you for this level.",
              "",
              "Go ahead and make a remote (with `git clone`), fake some changes on that remote, commit yourself, and then pull down those changes. It's like a few lessons in one!"
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
              "## Simuler la collaboration",
              "",
              "C'est là que cela devient compliqué -- pour certaines des leçons à venir, nous avons besoin de vous enseigner comment récupérer les changements effectués sur le dépôt distant.",
              "",
              "Cela signifie que nous devons \"pretendre\" que le dépôt distant a été modifié par un collègue / ami / collaborateur, à quelque moment sur une branche spécifique ou sur un certain nombre de commits.",
              "",
              "Pour faire cela, nous introduisons à point nommé la commande `git fakeTeamwork` ! Elle est assez significative, voyons une démo ..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Le comportement par défaut de `fakeTeamwork` est de simplement faire apparaître un commit sur master"
            ],
            "afterMarkdowns": [
              "Voilà -- le dépôt distant a été mis-à-jour avec un nouveau commit, et nous n'avons pas encore téléchargé ce commit parce que nous n'avons pas exécuter la commande `git fetch`."
            ],
            "command": "git fakeTeamwork",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vous pouvez aussi spécifier le nombre de commits ou la branche en l'ajoutant à la fin de la commande."
            ],
            "afterMarkdowns": [
              "Avec une seule commande, nous avons simulé un collègue ayant pushé 3 commits à la branche `foo` de notre dépôt distant"
            ],
            "command": "git fakeTeamwork foo 3",
            "beforeCommand": "git branch foo; git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Les niveaux suivants vont devenir assez difficiles, donc nous demandons un peu plus que cela dans ce niveau.",
              "",
              "Vous devrez créer un dépôt distant (avec `git clone`), simuler quelques changements sur ce dépôt, commit les vôtres, et enfin appliquer ces changements dans votre dépôt local (pull). C'est presque plusieurs leçons en une !"
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
              "## Simulando la colaboración",
              "",
              "Entonces, hay algo medio tramposo acá -- para algunas de las lecciones siguientes, necesitamos explicarte cómo bajar cambios introducidos en el repositorio remoto.",
              "",
              "Eso significa que escencialmente tenemos que \"hacer de cuenta\" que el repositorio remoto fue actualizado por alguún colega, amigo o colaborador tuyo, incluso a veces en alguna rama específica o una cantidad determinada de commits.",
              "",
              "Para lograr esto, introdujimos el bien llamado comando ¡`git fakeTeamwork`! Es bastante auto-explicativo: simula trabajo de nuestros colegas. Veamos una demo..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "El comportamiento por default de `fakeTeamwork` es simplemente crear un commit en master"
            ],
            "afterMarkdowns": [
              "Ahí está: el remoto se actualizó con un nuevo commit, y todavía no nos bajamos ese commit porque aún no hicimos `git fetch`."
            ],
            "command": "git fakeTeamwork",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "También podés especificar la cantidad de commits o la ramma agregándolos al comando"
            ],
            "afterMarkdowns": [
              "Con un único comando simulamos que un compañero de equipo pusheó tres commits a la rama `foo` de nuestro remoto"
            ],
            "command": "git fakeTeamwork foo 3",
            "beforeCommand": "git branch foo; git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Los niveles siguientes van a ser algo difíciles, así que vamos a exigirte un poco más en este nivel.",
              "",
              "Animate y creá un remoto (con `git clone`), simulá algunos cambios en ese remoto, commiteá en tu repo local, y luego pulleate esos cambios. ¡Es como varias lecciones en una!"
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
              "## Simulando colaboração",
              "",
              "Neste ponto, temos uma pequena dificuldade -- para algumas das lições a seguir, precisaremos ensinar como fazer pull de mudanças que foram introduzidas no repositório remoto.",
              "",
              "Isso significa que precisaremos essencialmente \"fingir\" que o repositório remoto foi atualizado por algum de seus colegas / amigos / colaboradores, algumas vezes em um ramo específico ou com um certo número de commits.",
              "",
              "Para esta finalidade, criamos o comando fictício `git fakeTeamwork`! Ele é bastante auto-explicativo, vejamos uma demonstração..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "O comportamento padrão do `fakeTeamwork` é simplesmente fazer aparecer um commit no master"
            ],
            "afterMarkdowns": [
              "Aqui vamos nos -- o repositório remoto foi atualizado com um novo commit, e ainda não baixamos esse commit porque não executamos um `git fetch`."
            ],
            "command": "git fakeTeamwork",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Você também pode especificar o número de commits ou o ramo, anexando-os ao comando"
            ],
            "afterMarkdowns": [
              "Com um único comando, nós simulamos um colega enviando 3 commits para o ramo `foo` do repositório remoto"
            ],
            "command": "git fakeTeamwork foo 3",
            "beforeCommand": "git branch foo; git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Os níveis posteriores serão mais difíceis, então estamos pedindo um pouco mais de você neste nível.",
              "",
              "Vá em frente e crie um repositório remoto (chamando `git clone`), simule algumas mudanças no repositório remoto, commite no repositório local, e então faça um pull das mudanças que haviam sido simuladas. É como se fossem várias lições em uma só!"
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
              "## 模擬合作",
              "",
              "接下來的課程有一個很難的事情，我們需要讓你學會如何 pull remote 上的更新 。",
              "",
              "這就表示我們必須要 \"假裝\" remote 被你其中一個同事/ 朋友/ 合作的人在某個特定的 branch 上面送了一些特定的 commit。",
              "",
              "為了要做到這件事情,我們要介紹一個自己設計的指令 `git fakeTeamwork`！ 從字面上就可以很容易地看出來它在幹嘛，讓我們來看一個範例..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`fakeTeamwork` 的預設行為是在送一個 commit 給 master 分支"
            ],
            "afterMarkdowns": [
              "我就說吧！remote 已經藉由一個新的 commit 而更新了，而且因為我們還沒有用 `git fetch`，所以表示我們還沒有下載該 commit。"
            ],
            "command": "git fakeTeamwork",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "你可以在命令的後面指定你要送幾個 commit 或是要送給哪個 branch。"
            ],
            "afterMarkdowns": [
              "我們利用一個指令將三個 commit 送給在 remote 上面的 `foo` branch。"
            ],
            "command": "git fakeTeamwork foo 3",
            "beforeCommand": "git branch foo; git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "接下來的關卡會很困難，所以我們在這個關卡中會問你更多問題。",
              "",
              "現在先把 remote 下載下來（利用 `git clone`），假裝送幾個 commit 給 remote 做更新，然後 pull 這些 commit 下來 。這就好像是幾個教學中的指令的總結！"
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
              "## 仿真协同",
              "",
              "这里有一件棘手的事 -- 接下来的课程中, 我们需要教你如果从远端拉取变更",
              "",
              "这意味着，我们需要假装你的同事、朋友、合作伙伴已经将远端更新到最新了，这些变更有时是一个特别的分支或者确定数目的提交. ",
              "",
              "为了做到这点, 我们引入一个自造命令`git fakeTeamwork`. 它是自解释的, 先看演示.."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`fakeTeamwork` 默认行为就是在在远端master做一个提交."
            ],
            "afterMarkdowns": [
              "成了-- 远端更新了一个新提交. 我们还没有下载它, 因为我们还没有使用`git fetch`."
            ],
            "command": "git fakeTeamwork",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "你可以指定提交的数量, 只需要在命令后接一个数字!"
            ],
            "afterMarkdowns": [
              "通过一个命令，我们就模拟了队友push 3 个提交到远端的foo分支.  "
            ],
            "command": "git fakeTeamwork foo 3",
            "beforeCommand": "git branch foo; git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "接下来的学习会相当的困难，所以在本节我们会询问你很多问题. ",
              "",
              "继续前进 -- 克隆一个远端，再提交一些修改，在你自己的分支上也做一些提交，再pull一下远端. 这看起来包含了好几节的课程."
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
              "## Zusammenarbeit simulieren",
              "",
              "Hier ist das Problem -- für einige der folgenden Level müssen wir lernen, wie man Änderungen vom entfernten Server holt.",
              "",
              "Das heißt wir müssen im Grunde \"so tun\" also ob der Server von einem Kollegen / Freund / Mitarbeiter aktualisiert worden wäre, manchmal ein bestimmter Branch oder eine bestimmte Anzahl von Commits.",
              "",
              "Um das zu tun führen wir den passend benannten Befehl `git fakeTeamwork` ein! Er ist ziemlich selbsterklärend, schauen wir uns ihn an ..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Das normale Verhalten von `fakeTeamwork` ist es, einen Commit auf den entfernten `master` zu machen."
            ],
            "afterMarkdowns": [
              "Da haben wir's -- der Server ist mit einem neuen Commit aktualisiert worden und wir haben ihn noch nicht lokal, weil wir nicht `git fetch` oder `git pull` ausgeführt haben."
            ],
            "command": "git fakeTeamwork",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Du kannst auch angeben wieviele Commits oder auf welchem Branch sie gemacht werden sollen, indem du das an den Befehl anhängst."
            ],
            "afterMarkdowns": [
              "Mit einem Befehlt haben wir simuliert, dass ein Kollege drei Commits auf den  Branch `foo` gepackt hat."
            ],
            "command": "git fakeTeamwork foo 3",
            "beforeCommand": "git branch foo; git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Die kommenden Level werden recht anspruchsvoll, daher verlangen wir auch in diesem Level schon etwas mehr.",
              "",
              "Leg los und erstelle ein Remote (mit `git clone`), simuliere ein paar Änderungen auf dem Server, committe lokal und dann zieh dir die Änderungen vom Server. Das ist wie mehrere Level in einem!"
            ]
          }
        }
      ]
    }
  }
};
