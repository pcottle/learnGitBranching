exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C1\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin :foo;git fetch origin :bar",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Source of nothing",
    "zh_CN": "没有 source 的 source",
    "zh_TW": "沒有 source",
    "es_AR": "Origen de nada",
    "pt_BR": "Origem vazia",
    "gl"   : "Orixen de nada",
    "de_DE": "Die Quelle des Nichts",
    "ja"   : "無のsource",
    "fr_FR": "Source de rien du tout",
    "ru_RU": "Пустой источник",
    "ko"   : "Source가 없다",
    "uk"   : "Нема джерела"
  },
  "hint": {
    "en_US": "The branch command is disabled for this level so you'll have to use fetch!",
    "zh_CN": "本关的 branch 命令被禁用了，你只能用 fetch！",
    "zh_TW": "在本關卡中，不允許使用 branch 指令，因此你只能使用 fetch！",
    "es_AR": "El comando branch está deshabilitado para este nivel, así que ¡vas a tener que usar fetch!",
    "pt_BR": "O comando branch está desabilitado para este nível, então você terá de usar o fetch!",
    "gl"   : "O comando branch está deshabilitado para este nivel, entón terás que empregar o comando fetch!",
    "de_DE": "Der branch Befehl ist für diesen Level inaktiv, du musst also fetch benutzen",
    "ja"   : "このレベルではbranchコマンドが無効になっているのでfetchを使うしかない！",
    "fr_FR": "La commande branch est désactivée pour ce niveau, vous devrez donc utiliser fetch !",
    "ru_RU": "Команда branch недоступна на этом упражнении, пользуйтесь командой fetch!",
    "ko"   : "branch 명령이 비활성화 되어있습니다. fetch를 사용해야 되요!",
    "uk"   : "Команда branch недоступна на цьому уроці, користуйся командою fetch!",
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Oddities of `<source>`",
              "",
              "Git abuses the `<source>` parameter in two weird ways. These two abuses come from the fact that you can technically specify \"nothing\" as a valid `source` for both git push and git fetch. The way you specify nothing is via an empty argument:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Let's see what these do..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What does pushing \"nothing\" to a remote branch do? It deletes it!"
            ],
            "afterMarkdowns": [
              "There, we successfully deleted the `foo` branch on remote by pushing the concept of \"nothing\" to it. That kinda makes sense..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finally, fetching \"nothing\" to a place locally actually makes a new branch"
            ],
            "afterMarkdowns": [
              "Very odd / bizarre, but whatever. That's git for you!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "This is a quick level -- just delete one remote branch and create a new branch with `git fetch` to finish!"
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
              "### Les bizarreries de `<source>`",
              "",
              "Git permet de faire deux choses contre-intuitives avec le paramètre `<source>`. Ces deux astuces viennent du fait que vous pouvez techniquement ne *rien* spécifier comme `source` valide pour git push et git fetch. Autrement dit laisser vide la partie gauche de la refspec (avant le deux-points) :",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Voyons ce que cela fait ..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Qu'est-ce que produit l'envoi de \"rien\" sur une branche distante ? Cela la détruit !"
            ],
            "afterMarkdowns": [
              "Ici, nous avons brillamment supprimé  la branche `foo` du dépôt distant en lui envoyant le concept de \"rien\". Cela paraît à peu près logique..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ensuite, un fetch de \"rien\" dans un emplacement local crée une nouvelle branche."
            ],
            "afterMarkdowns": [
              "Très étrange, mais peu importe. C'est git !"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "L'exercice pour ce niveau est simple : supprimez d'abord une branche distante puis terminez en en créant une nouvelle (locale) avec `git fetch` !"
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
              "### Rarezas de `<origen>`",
              "",
              "Git abusa del parámetro `<origen>` de dos extrañas maneras. Estos dos abusos vienen del hecho de que tecnicamente podés especificar \"la nada\" como un `origen` válido tanto para git push como para git fetch. El modo de especificar la nada es a través de un parámetro vacío:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Veamos qué hacen estos..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué hace el pushear \"nada\" a una rama remota? ¡La elimina!"
            ],
            "afterMarkdowns": [
              "Ahí está, borramos la rama `foo` exitosamente del remoto pusheándole el concepto de \"nada\". Tiene algo de sentido..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finalmente, fetchear \"nada\" a un lugar local en realidad crea una nueva rama"
            ],
            "afterMarkdowns": [
              "Bastante bizarro, pero, meh, da igual. Así es git."
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este es un nivel rápido: simplemente borrá una rama remota y creá una nueva usando `git fetch` para completarlo."
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
              "### Coisas estranhas do `<origem>`",
              "",
              "O Git abusa do parâmetro `<origem>` de duas formas estranhas. Esses dois abusos vem do fato de que tecnicamente você pode especificar \"nada\" como uma `origem` válida tanto para o git push como para o git fetch. A forma como você especifica \"nada\" é por meio de um argumento vazio:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Vejamos o que esses comandos fazem..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "O que fazer push de \"coisa nenhuma\" para um ramo remoto significa? Deletar o ramo!"
            ],
            "afterMarkdowns": [
              "Aqui, excluímos com sucesso o ramo `foo` do repositório remoto por meio de um push de \"coisa nenhuma\" direcionado a ele. Até que faz sentido..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finalmente, fazer um fetch de \"coisa nenhuma\" para uma referência local cria um novo ramo"
            ],
            "afterMarkdowns": [
              "Bastante estranho / bizarro, mas de qualquer forma. É assim que o Git é!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este é um nível rápido de resolver -- basta remover um ramo remoto com `git push` e criar um novo ramo local com `git fetch` para terminar!"
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
              "### Rarezas do `<orixe>`",
              "",
              "Git abusa do parámetro `<orixe>` de dúas maneiras extranas. Estos dous abusos veñen do feito de que técnicamente podes especificar \"á nada\" como un `orixe` válido tanto para git push como para git fetch. O modo de especificar a nada é a través dun parámetro vacío:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Vexamos qué fan..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué fai cando se empurra a \"nada\" a unha rama remota? ¡Eliminaa!"
            ],
            "afterMarkdowns": [
              "Ahí está, borramos a rama `foo` exitosamente do remoto empurrando o concepto da \"nada\". Ten algo de sentido..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finalmente, descargar a \"nada\" a un lugar local na realidade crea unha nova rama"
            ],
            "afterMarkdowns": [
              "Bastante bizarro, pero, meh, da igual. Así é git."
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este é un nivel rápido: simplemente borra unha rama remota e crea unha nova empregando `git fetch` para completalo."
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
              "###`<source>` 奇怪的地方",
              "",
              "在兩個奇怪的情況下，git 不使用 `<source>` 參數，事實上，在`git push`以及`git fetch`的情況下，可以允許你\"不用\"指定` source`，你可以藉由把參數留空，來表示你不想指定 source：",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "讓我們來看看這些在做什麼..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "當*沒有*指定 source 的時候，`push` 對於 remote branch 做了什麼？`push`把它刪除掉了！"
            ],
            "afterMarkdowns": [
              "看吧，我們藉由把 source \"留空\"，成功用 `push` 刪除了 `foo` branch，這合理吧..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "最後，對於 `fetch` 來說，source \"留空\" 表示我們要在 local 上建立一個新的 branch。"
            ],
            "afterMarkdowns": [
              "很奇怪吧！但那正是 git 為你做的事情！"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "這是一個很簡單的關卡，只需要利用 `git push` 刪除一個 remote 的 branch，並且利用 `git fetch` 建立一個新的 local 的 branch！"
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
              "### 古怪的 `<source>`",
              "",
              "Git 有两种关于 `<source>` 的用法是比较诡异的，即你可以在 git push 或 git fetch 时不指定任何 `source`，方法就是仅保留冒号和 destination 部分，source 部分留空。",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "我们分别来看一下这两条命令的作用……"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果 push 空 <source> 到远程仓库会如何呢？它会删除远程仓库中的分支！"
            ],
            "afterMarkdowns": [
              "就是这样子, 我们通过给 push 传空值 source，成功删除了远程仓库中的 `foo` 分支, 这真有意思..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果 fetch 空 <source> 到本地，会在本地创建一个新分支。"
            ],
            "afterMarkdowns": [
              "很神奇吧！但无论怎么说, 这就是 Git！"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "这个关卡很容易 —— 只要删除一个远程的分支, 再用 `git fetch` 在本地创建一个新分支就可以了！"
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
              "### Die Eigentümlichkeiten von `<Quelle>`",
              "",
              "Git \"missbraucht\" den `<Quelle>`-Parameter in zwei Fällen. Diese rühren daher, dass man technisch gesehen \"nichts\" als gültige `<Quelle>` sowohl für `git push` als auch für `git fetch` angeben kann. Das macht man so:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Schauen wir, was das bewirkt ..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was passiert, wenn man \"nichts\" auf einen entfernten Branch pusht? Er wird gelöscht!"
            ],
            "afterMarkdowns": [
              "Und schon haben wir `foo` erfolgreich auf dem Remote gelöscht, weil wir \"Leere\" darauf geschoben haben. Ist auf seine Weise irgendwie logisch ..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Und weiter: indem man \"nichts\" von einem Remote in sein lokales Repository zieht, erstellt man tatsächlich einen neuen Branch."
            ],
            "afterMarkdowns": [
              "Ziemlich abgefahren / bizarr, aber was soll's. Das ist halt Git."
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Das ist ein kurzer Level -- lösch einfach den Remote Branch und erstelle einen neuen Branch mit `git fetch`, um ihn zu lösen."
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
              "### Странный `<источник>`",
              "",
              "Git использует параметр `<источник>` странным образом. Странность заключается в том, что Вы можете оставить пустым параметр `<источник>` для команд git push и git fetch:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Посмотрим, что же из этого выйдет..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Что же будет с веткой, на которую мы делаем git push с пустым аргументом `<источник>`? Она будет удалена!"
            ],
            "afterMarkdowns": [
              "Как видите, мы удалили ветку `foo` в удаленном репозитории, попытавшить протолкнуть(git push) в неё \"ничего\"."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Наконец, если мы попытаемся притянуть изменения(git fetch) из \"ничего\" к нам в локальный репозиторий, то это создаст у нас новую ветку"
            ],
            "afterMarkdowns": [
              "Вот такой вот чудной git!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Это легкое упражнение - нужно всего лишь удалить одну ветку в удаленном репозитории и создать новую ветку в локальном, с помощью команд `git push` и `git fetch` соответственно!"
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
              "###`<source>`의 이상함",
              "",
              "Git은 `<source>` 인자를 두가지 방법으로 이상하게 사용합니다. 이 두가지 오용은 여러분이 git push와 git fetch에 `source`에 \"없음\"을 지정할 수 있기 때문에 나타납니다. \"없음\"을 지정하는 방법은 인자로 아무것도 안쓰면 됩니다:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "위에 처럼 말이죠, 뭘 할 수 있는지 확인해봅시다..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "\"없음\"을 원격 브랜치로 push하면 무엇을 할까요? 원격저장소의 그 브랜치를 삭제합니다!"
            ],
            "afterMarkdowns": [
              "됬습니다, 원격 저장소의 `foo`브랜치를 성공적으로 삭제했습니다. \"없음\"을 push한다는것이 이것을 이뤘습니다. 흠 말이 되는것 같네요 null을 push했어요..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "마지막으로, \"nothing\"을 fetch하면 로컬에 새 브랜치를 만듭니다"
            ],
            "afterMarkdowns": [
              "기괴합니다... 뭐어때요. git이 이런데요 뭐!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이번 레벨은 금방 넘어가는 레벨입니다 -- 원격저장소의 브랜치하나를 삭제하고 `git fetch`를 이요해서 새 브랜치를 만들어보세요!"
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
              "### Неочевидні способи використання `<source>`",
              "",
              "Git має два хитрі способи використання `<source>`. Обидва випливають з факту, що формально (і цілком легально) ти можеш не вказувати джерело (`source`) як для git push так і для git fetch. Ось, як саме ти можеш це зробити:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Погляньмо, що в результаті вийде..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Що буде, якщо спробувати запушити \"ніщо\" у гілку віддаленого репозиторію? Git її видалить!"
            ],
            "afterMarkdowns": [
              "Ось, ми успішно видалили гілку `foo` на віддаленому сервері, запушивши в неї \"ніщо\". Ну, ніби все правильно..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "І останнє, звантаження \"нічого\" в локальний репозиторій створює нову гілку"
            ],
            "afterMarkdowns": [
              "Дуже дивно, але такий він, git!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Це швидкий рівень -- просто видали одну віддалену гілку і створи нову локальну гілку, використовуючи `git fetch`!"
            ]
          }
        }
      ]
    }
  }
};
