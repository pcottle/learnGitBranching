exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C4\",\"id\":\"side\",\"remoteTrackingBranchID\":null},\"bugFix\":{\"target\":\"C7\",\"id\":\"bugFix\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"tags\":{\"v0\":{\"target\":\"C0\",\"id\":\"v0\",\"type\":\"tag\"},\"v1\":{\"target\":\"C3\",\"id\":\"v1\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git commit ",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C4\",\"id\":\"side\",\"remoteTrackingBranchID\":null},\"bugFix\":{\"target\":\"C6\",\"id\":\"bugFix\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"tags\":{\"v0\":{\"target\":\"C0\",\"id\":\"v0\",\"type\":\"tag\"},\"v1\":{\"target\":\"C3\",\"id\":\"v1\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Git Describe",
    "fr_FR": "Git describe",
    "de_DE": "Git Describe",
    "ja"   : "Git Describe",
    "es_AR": "Git Describe",
    "pt_BR": "Git Describe",
    "zh_TW": "git describe",
    "zh_CN": "git describe"
  },
  "hint": {
    "en_US": "Just commit once on bugFix when you're ready to move on",
    "fr_FR": "Faites un commit sur bugFix quand vous êtes pret",
    "de_DE": "Committe nur einmal auf bugFix, wenn du soweit bist",
    "ja"   : "次に進む用意が整えれば、bugFixに対して一回commitしてください",
    "es_AR": "Simplemente commiteá una vez en bugFix cuando estés listo para seguir",
    "pt_BR": "Simplesmente commite uma vez em bugFix quando quiser parar de experimentar",
    "zh_TW": "當你要移動的時候，只要在 bugFix 上面 commit 就好了",
    "zh_CN": "当你要移动的时候，只要在 bugFix 上面 commit 就好了"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Git Describe",
              "",
              "Because tags serve as such great \"anchors\" in the codebase, git has a command to *describe* where you are relative to the closest \"anchor\" (aka tag). And that command is called `git describe`!",
              "",
              "Git describe can help you get your bearings after you've moved many commits backwards or forwards in history; this can happen after you've completed a git bisect (a debugging search) or when sitting down at a coworkers computer who just got back from vacation."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git describe takes the form of:",
              "",
              "`git describe <ref>`",
              "",
              "Where `<ref>` is anything git can resolve into a commit. If you don't specify a ref, git just uses where you're checked out right now (`HEAD`).",
              "",
              "The output of the command looks like:",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "Where `tag` is the closest ancestor tag in history, `numCommits` is how many commits away that tag is, and `<hash>` is the hash of the commit being described."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's look at a quick example. For this tree below:"
            ],
            "afterMarkdowns": [
              "The command `git describe master` would output:",
              "",
              "`v1_2_gC2`",
              "",
              "Whereas `git describe side` would output:",
              "",
              "`v2_1_gC4`"
            ],
            "command": "git tag v2 C3",
            "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "That's pretty much all there is to git describe! Try describing a few of the locations in this level to get a feel for the command.",
              "",
              "Once you're ready, just go ahead and commit once to finish the level. We're giving you a freebie :P"
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
              "### Git describe",
              "",
              "Parce ce que les tags sont de très bonne références dans le code, git à une commande pour *décrire* (describe) la différence entre le commit et le tag le plus récent. Cette commande s'appelle `git describe`!",
              "",
              "Git describe peut vous aider lorsque vous vous êtes beaucoup déplacé ; cela peut arriver après un git bisect (chercher l'apparition d'un bug) ou lorsque vous revenez de vacance après 3 semaines sur l'ordinateur d'un collègue."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git describe s'écrit comme suit :",
              "",
              "`git describe <ref>`",
              "",
              "où `<ref>` est un n'importe quelle chose que git peut résoudre en un commit. Si vous ne specifiez pas de ref, `HEAD` est pris par défault.",
              "",
              "Le résultat de la commande ressemble à :",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "où `tag` est le tag le plus proche dans l'historique, `numCommits` le nombre de commit avec le tag, et `<hash>` le hash/identifiant du commit décrit."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Regardons un petit exemple. Prennons cet arbre :"
            ],
            "afterMarkdowns": [
              "La commande`git describe master` donne le résultat :",
              "",
              "`v1_2_gC2`",
              "",
              "alors que `git describe side` donne :",
              "",
              "`v2_1_gC4`"
            ],
            "command": "git tag v2 C3",
            "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ceci résume bien git describe ! Amusez-vous à utiliser cette commande avec d'autres endroits dans ce niveau pour bien comprendre describe.",
              "",
              "Lorsque vous serez prêt, faites simplement un commit pour finir le niveau. Un petit niveau bonus :P"
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
              "### git describe",
              "",
              "因為 tag 在 commit tree 上表示的是一個錨點，git 有一個指令可以用來*顯示*離你最近的錨點（也就是 tag），而且這個指令叫做 `git describe`！",
              "",
              "當你已經完成了一個 `git bisect`（一個找尋有 bug 的 commit 的指令），或者是當你使用的是你跑去度假的同事的電腦時， `git describe` 可以幫助你了解你離最近的 tag 差了多少個 commit。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git describe` 的使用方式：",
              "",
              "`git describe <ref>`",
              "",
              "`<ref>` 是任何一個可以被 git 解讀成 commit 的位置，如果你沒有指定的話，git 會以你目前所在的位置為準（`HEAD`）。",
              "",
              "指令的輸出就像這樣：",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "`<tag>` 表示的是離 `<ref>` 最近的 tag， `numCommits` 是表示這個 tag 離 `<ref>` 有多少個 commit， `<hash>` 表示的是你所給定的 `<ref>` 所表示的 commit 的前七個 id。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們來看一個例子，對於下面的 tree："
            ],
            "afterMarkdowns": [
              "`git describe master` 會輸出：",
              "",
              "`v1_2_gC2`",
              "",
              "`git describe side` 會輸出：",
              "",
              "`v2_1_gC4`"
            ],
            "command": "git tag v2 C3",
            "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git describe` 就是這樣了！試著在這個關卡指定幾個位置來感受一下這個指令吧！",
              "",
              "當你完成的時候，只要一個 commit 就可以結束這個關卡，我們會給你一個免費贈品:P"
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
              "### git describe",
              "",
              "因为 tag 在 commit tree 上表示的是一个锚点，git 有一个指令可以用来*显示*离你最近的锚点（也就是 tag），而且这个指令叫做 `git describe`！",
              "",
              "当你已经完成了一个 `git bisect`（一个找寻有 bug 的 commit 的指令），或者是当你使用的是你跑去度假的同事的电脑时， `git describe` 可以帮助你了解你离最近的 tag 差了多少个 commit。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git describe` 的​​使用方式：",
              "",
              "`git describe <ref>`",
              "",
              "`<ref>` 是任何一个可以被 git 解读成 commit 的位置，如果你没有指定的话，git 会以你目前所在的位置为准（`HEAD`）。",
              "",
              "指令的输出就像这样：",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "`<tag>` 表示的是离 `<ref>` 最近的 tag， `numCommits` 是表示这个 tag 离 `<ref>` 有多少个 commit， `<hash>` 表示的是你所给定的 `<ref>` 所表示的commit 的前七个id。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "让我们来看一个例子，对于下面的 tree："
            ],
            "afterMarkdowns": [
              "`git describe master` 会输出：",
              "",
              "`v1_2_gC2`",
              "",
              "`git describe side` 会输出：",
              "",
              "`v2_1_gC4`"
            ],
            "command": "git tag v2 C3",
            "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git describe` 就是这样了！试着在这个关卡指定几个位置来感受一下这个指令吧！",
              "",
              "当你完成的时候，只要一个 commit 就可以结束这个关卡，我们会给你一个免费赠品:P"
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
              "### Git Describe",
              "",
              "Como los tags sirven tanto para marcar \"hitos\" en el código, git tiene un comando para *describir* (_describe_) dónde estás relativo al \"hito\" más cercano (digamos, \"tag\"). Y ese comamndo se llama ¡`git describe`!",
              "",
              "Git describe puede ayudarte a saber dónde estás después de que te hayas movido varios commits hacia adelante o atrás en la historia. Esto puede pasarte después de que termines un git bisect (una búsqueda que te ayuda a debuggear problemas) o cuando te sentás en la computadora de un compañero de trabajo que recién vuelve de unas vacaciones."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git describe tiene la siguiente forma:",
              "",
              "`git describe <ref>`",
              "",
              "Donde `<ref>` es cualquier cosa que git puede resolver a un commit. Si no especificás ninguna referencia, git simplemente usa el commit en que estás parado ahora (`HEAD`).",
              "",
              "La salida de ese comando se ve así:",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "Donde `tag` es el tag más cercano en la historia, `numCommits` dice a cuántos commits de ese tag estás, y `<hash>` es el hash del commit que estás describiendo."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos un ejemplo breve. Para este árbol de commits:"
            ],
            "afterMarkdowns": [
              "El comando `git describe master` mostraría:",
              "",
              "`v1_2_gC2`",
              "",
              "Mientras que `git describe side` debería mostrar:",
              "",
              "`v2_1_gC4`"
            ],
            "command": "git tag v2 C3",
            "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¡Eso es prácticamente todo lo que hay sobre git describe! Probá describiendo algunas referencias en este nivel para amigarte con el comando.",
              "",
              "Cuando estés listo, hacé un commit para terminar el nivel. Te estamos dando una gratis :P"
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
              "### Git Describe",
              "",
              "Devido ao fato de as tags servirem como \"âncoras\" tão boas no código, o Git tem um comando para *descrever* onde você está com relação à \"âncora\" (tag) mais próxima. Esse comando é chamado `git describe`!",
              "",
              "O git describe pode ajudar a recuperar a sua orientação depois de você ter se movido muitos commits para trás ou para frente no histórico; isso pode acontecer depois de você completar um git bisect (uma busca para debug) ou quando se sentar no computador de um colega que acabou de voltar de férias."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "O git describe é chamado da seguinte forma:",
              "",
              "`git describe <ref>`",
              "",
              "Onde `<ref>` é qualquer coisa que o git possa resolver como uma referência a um commit. Se você não especificar o ref, o Git usa simplesmente o commit atual (`HEAD`).",
              "",
              "A saída do comando é mais ou menos assim:",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "Onde `tag` é a tag ancestral mais próxima no histórico, `numCommits` é o número de commits de distância da tag, e `<hash>` é o hash do commit sendo descrito."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vejamos um exemplo rápido. Para a árvore abaixo:"
            ],
            "afterMarkdowns": [
              "O comando `git describe master` daria a saída:",
              "",
              "`v1_2_gC2`",
              "",
              "Enquanto `git describe side` daria:",
              "",
              "`v2_1_gC4`"
            ],
            "command": "git tag v2 C3",
            "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "É basicamente disso que se trata o git describe! Tente descrever alguns locais da árvore para sentir como o comando se comporta.",
              "",
              "Uma vez que você estiver satisfeito, apenas faça um commit que o nível será finalizado. Essa é de graça :P"
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
              "### Git Describe",
              "",
              "Weil Tags so super als \"Anker\" im Repository dienen können bietet Git einen Befehl um zu *beschreiben* wo du dich relativ zum nächsten \"Anker\" (also Tag) befindest. Und der heißt `git describe`.",
              "",
              "Er hilft dir dabei, dir einen Überblick zu verschaffen nachdem du viele Commits im Log zurück- oder vorgegangen bist; das kann vorkommen nachdem du ein `git bisect` (eine Fehlersuche) abgeschlossen hast oder wenn du dich an den Rechner eines Kollegen setzt, der gerade aus dem Urlaub gekommen ist."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Der Befehl ist folgendermaßen aufgebaut:",
              "",
              "`git describe <Ref-Name>`",
              "",
              "Dabei ist `<Ref-Name>` jeder beliebige Name, der einem Commit zugeordnet ist (Branch, Tag etc). Wenn du keinen angibst benutzt Git `HEAD`, also den aktuellen Checkout.",
              "",
              "Die Befehlsausgabe sieht so aus:",
              "",
              "`<Tag-Name>_<Anzahl Commits>_g<Hash>`",
              "",
              "`<Tag-Name>` ist dabei der nächstliegende Tag in den Vorgänger-Commits, `<Anzahl Commits>` zeigt an, wieviele Commits dieses Tag entfernt ist und `<Hash>` ist das SHA des Commits, auf den das Tag zeigt."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns das schnell an einem Beispiel an. Für den folgenden Baum:"
            ],
            "afterMarkdowns": [
              "Der Befehl `git describe master` würde folgendes ausgeben:",
              "",
              "`v1_2_gC2`",
              "",
              "Wohingegen `git describe side` dies ausgeben würde:",
              "",
              "`v2_1_gC4`"
            ],
            "command": "git tag v2 C3",
            "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Das ist so ziemlich alles, was es über `git describe` zu wissen gibt. Versuch ein paar Orte in diesem Level damit auszugeben, um ein Gefühl dafür zu bekommen.",
              "",
              "Sobald du fertig bist, mach einfach einen Commit um den Level abzuschließen. Der geht auf's Haus. :P"
            ]
          }
        }
      ]
    }
  }
};
