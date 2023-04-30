exports.level = {
  "compareAllBranchesAndEnforceBranchCleanup": true,
  "disabledMap": {
    "git branch": true,
    "git checkout": true,
    "git switch": true
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C1\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin :foo;git fetch origin :bar",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Source of nothing",
    "zh_CN": "没有 source 的 source",
    "zh_TW": "沒有 source",
    "es_AR": "Origen de nada",
    "es_ES": "Origen de nada",
    "pt_BR": "Origem vazia",
    "gl": "Orixen de nada",
    "de_DE": "Die Quelle des Nichts",
    "ja": "無のsource",
    "fr_FR": "Source de rien du tout",
    "ru_RU": "Пустой источник",
    "ko": "Source가 없다",
    "uk": "Нема джерела",
    "vi": "Không có nguồn",
    "sl_SI": "Izvor Ničesar",
    "pl": "Źródło nicości",
    "it_IT": "Fonte del nulla"
  },
  "hint": {
    "en_US": "The branch command is disabled for this level so you'll have to use fetch!",
    "zh_CN": "本关的 branch 命令被禁用了，你只能用 fetch！",
    "zh_TW": "在本關卡中，不允許使用 branch 指令，因此你只能使用 fetch！",
    "es_AR": "El comando branch está deshabilitado para este nivel, así que ¡vas a tener que usar fetch!",
    "es_ES": "El comando branch está deshabilitado para este nivel, así que ¡vas a tener que usar fetch!",
    "pt_BR": "O comando branch está desabilitado para este nível, então você terá de usar o fetch!",
    "gl": "O comando branch está deshabilitado para este nivel, entón terás que empregar o comando fetch!",
    "de_DE": "Der branch Befehl ist für diesen Level inaktiv, du musst also fetch benutzen",
    "ja": "このレベルではbranchコマンドが無効になっているのでfetchを使うしかない！",
    "fr_FR": "La commande branch est désactivée pour ce niveau, vous devrez donc utiliser fetch !",
    "ru_RU": "Команда branch недоступна на этом упражнении, пользуйтесь командой fetch!",
    "ko": "branch 명령이 비활성화 되어있습니다. fetch를 사용해야 돼요!",
    "uk": "Команда branch недоступна на цьому уроці, користуйся командою fetch!",
    "vi": "Lệnh branch đã bị vô hiệu hóa ở cấp độ này nên bạn sẽ phải dùng fetch!",
    "sl_SI": "Ukaz za branchanje je v tej stopnji onemogočen, zato boš moral uporabiti fetch!",
    "pl": "Polecenie branch jest zablokowane na tym poziomie, musisz skorzystać z fetch!",
    "it_IT": "Il comando branch è disabilitato per questo livello quindi dovrai usare fetch!"
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
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finally, fetching \"nothing\" to a place locally actually makes a new branch."
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
              "Voyons ce que cela fait..."
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
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ensuite, un fetch de \"rien\" dans un emplacement local crée une nouvelle branche."
            ],
            "afterMarkdowns": [
              "Très étrange, mais peu importe. C'est Git !"
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
              "Git abusa del parámetro `<origen>` de dos extrañas maneras. Estos dos abusos vienen del hecho de que técnicamente podés especificar \"la nada\" como un `origen` válido tanto para git push como para git fetch. El modo de especificar la nada es a través de un parámetro vacío:",
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
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finalmente, fetchear \"nada\" a un lugar local en realidad crea una nueva rama."
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
    "es_ES": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Rarezas de `<origen>`",
              "",
              "Git abusa del parámetro `<origen>` de dos extrañas maneras. Estos dos abusos vienen del hecho de que técnicamente puedes especificar \"la nada\" como un `origen` válido tanto para git push como para git fetch. El modo de especificar la nada es a través de un parámetro vacío:",
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
              "¿Qué hace el hacer push de \"nada\" a una rama remota? ¡La elimina!"
            ],
            "afterMarkdowns": [
              "Ahí está, eliminamos la rama `foo` exitosamente del remoto haciendo push con \"nada\". Tiene algo de sentido..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finalmente, hacer fetch de \"nada\" a un lugar local en realidad crea una nueva rama."
            ],
            "afterMarkdowns": [
              "Bastante extraño, pero bueno, da igual. Así es git."
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este es un nivel breve: simplemente elimina una rama remota y crea una nueva usando `git fetch` para completarlo."
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
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finalmente, fazer um fetch de \"coisa nenhuma\" para uma referência local cria um novo ramo."
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
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finalmente, descargar a \"nada\" a un lugar local na realidade crea unha nova rama."
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
            "beforeCommand": "git clone; git push origin main:foo"
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
    "zh_CN": {
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
            "beforeCommand": "git clone; git push origin main:foo"
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
              "Git \"missbraucht\" den `<Quelle>`-Parameter in zwei Fällen. Dies rührt daher, dass man technisch gesehen \"nichts\" als gültige `<Quelle>` sowohl für `git push` als auch für `git fetch` angeben kann. Das macht man so:",
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
            "beforeCommand": "git clone; git push origin main:foo"
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
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### `<source>`の変わり種",
              "",
              "Gitは`git push`や`git fetch`の引数としてsourceに何も指定しないことで悪用することができます。",
              "",
              "何も指定しない方法は次のようにsourceに空の引数を渡すことです。",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "こうするとどうなるでしょうか..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "リモートブランチに「無」をpushするとどうなるでしょうか？",
              "",
              "結果はそのブランチが削除されてしまいます！"
            ],
            "afterMarkdowns": [
              "「無」という概念をブランチに押し付けることで、リモートの`foo`ブランチを削除することに成功しました。"
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "最後に「無」をローカル上に`fetch`すると、実際に新しいブランチが作られます。"
            ],
            "afterMarkdowns": [
              "非常に奇妙ですが、気にする程のことでもありません。"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルは難しくありません！リモートのブランチを削除して`git fetch`で新しいブランチを作成するだけで完了します。"
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
            "beforeCommand": "git clone; git push origin main:foo"
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
              "됐습니다, 원격 저장소의 `foo`브랜치를 성공적으로 삭제했습니다. \"없음\"을 push한다는것이 이것을 이뤘습니다. 흠 말이 되는것 같네요 null을 push했어요..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin main:foo"
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
              "이번 레벨은 금방 넘어가는 레벨입니다 -- 원격저장소의 브랜치하나를 삭제하고 `git fetch`를 이용해서 새 브랜치를 만들어보세요!"
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
            "beforeCommand": "git clone; git push origin main:foo"
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
    },
    "vi": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Sự kỳ quặc của `<nguồn>`",
              "",
              "Git lợi dụng tham số `<nguồn>` theo 2 cách khá dị. Hai cách lợi dụng này bắt nguồn từ thực tế là bạn có thể \"không chỉ định\" `nguồn` cho cả git push và git fetch. Bạn có thể làm điều này bằng cách để trống tham số như sau:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Hãy xem thử 2 câu lệnh này làm việc gì..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Nếu ta đẩy \"không gì cả\" lên một nhánh từ xa thì nó sẽ làm gì? Nó xóa nhánh đó!"
            ],
            "afterMarkdowns": [
              "Đó, ta đã xóa thành công nhánh `foo` trên kho chứa từ xa bằng cách đẩy \"không gì cả\" lên nó. Khá là hợp lý..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Cuối cùng, nạp \"không gì cả\" vào một kho chứa cục bộ thực tế sẽ tạo ra một nhánh mới"
            ],
            "afterMarkdowns": [
              "Khá là quái và dị. Nhưng mà đó là những gì Git làm!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ở cấp độ đơn giản này -- bạn chỉ cần xóa một nhánh từ xa và tạo ra một nhánh mới với `git fetch` để hoàn thành!"
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
              "### Čudnosti `<izvora>`",
              "",
              "Git zlorablja `<izvor>` parameter na dva čudna načina. Te dve zlorabi nastaneta iz dejstva, da lahko tehnično določiš \"nič\" kot veljaven `izvor` za git push in git fetch. Način, da določiš nič je z uporabo praznega argumenta:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Poglejmo, kaj to naredi ..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Kaj naredi pushanje \"ničesar\" na oddaljen branch? Izbriše ga!"
            ],
            "afterMarkdowns": [
              "Tako, uspešno smo izbrisali `foo` branch na oddaljenem repotu s konceptom pushanja \"ničesar\" nanj. To ima nekako smisel ..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "In končno, fetchanje \"ničesar\" lokalno dejansko naredi nov branch."
            ],
            "afterMarkdowns": [
              "Zelo čudno / bizarno, ampak kakorkoli. Tak je git!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To je hitra stopnja -- samo izbriši en oddaljen branch in naredi novega z `git fetch`, da zaključiš!"
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
              "### Osobliwości `<source>`",
              "",
              "Git pozwala wykorzystać parametr `<source>` (źródło) na dwa osobliwe sposoby. Oba są dziwaczne dlatego, że - technicznie rzecz biorąc - możesz określić \"nic\" jako poprawne `źródło` zarówno dla `git push`, jak i `git fetch`. Tę \"nicość\" określasz za pomocą pustego argumentu:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Zobaczmy, co z tego wyniknie..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Co daje wypchnięcie \"nicości\" na zdalną gałąź? Usuwa ją!"
            ],
            "afterMarkdowns": [
              "Oto właśnie usunęliśmy skutecznie gałąź `foo` na zdalnym repozytorium, wypychając do niej ideę \"nicości\". To nawet ma jakiś sens..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Natomiast ściągnięcie \"nicości\" za pomocą fetch do lokalnego miejsca tworzy nową gałąź."
            ],
            "afterMarkdowns": [
              "Osobliwe i dziwaczne, ale nic nie poradzisz... Git tak ma!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To jest krótki poziom -- żeby go ukończyć, po prostu usuń jedną zdalną gałąź i stwórz jedną nową, używając `git fetch`!"
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
              "### Stranezze di `<source>`",
              "",
              "Git abusa del parametro `<source>` in due strani modi. Questi due abusi derivano dal fatto che tu puoi tecnicamente specificare \"nulla\" come una fonte valida sia per git push che per git fetch. Si può fare ciò lasciando il parametro vuoto:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Vediamo cosa fanno questi..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "In cosa consiste il caricare \"nulla\" ad un ramo remoto? Lo elimina!"
            ],
            "afterMarkdowns": [
              "Ecco, abbiamo eliminato con successo il ramo `foo` avendovi caricato il concetto di \"nulla\". Ha senso effettivamente..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin main:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Infine, scaricare il \"nulla\" in una posizione locale va a creare un nuovo ramo."
            ],
            "afterMarkdowns": [
              "Molto strano, ma vabbé. Questo e altro da git!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Questo è un livello rapido -- elimina un ramo remoto e creane uno localmente tramite `git fetch` per terminare il livello!"
            ]
          }
        }
      ]
    }
  }
};
