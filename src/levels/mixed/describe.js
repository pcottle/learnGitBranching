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
    "gl"   : "Git Describe",
    "zh_TW": "git describe",
    "zh_CN": "Git Describe",
    "ru_RU": "Git describe",
    "ko"   : "Git describe(묘사)",
    "uk"   : "Git Describe"
  },
  "hint": {
    "en_US": "Just commit once on bugFix when you're ready to move on",
    "fr_FR": "Faites un commit sur bugFix quand vous êtes prêt",
    "de_DE": "Committe nur einmal auf bugFix, wenn du soweit bist",
    "ja"   : "次に進む準備が整ったなら、bugFixに対して一回commitしてください",
    "es_AR": "Simplemente commiteá una vez en bugFix cuando estés listo para seguir",
    "pt_BR": "Simplesmente commite uma vez em bugFix quando quiser parar de experimentar",
    "gl"   : "Simplemente fai commit en bugFix cando estés listo para continuar.",
    "zh_TW": "當你要移動的時候，只要在 bugFix 上面 commit 就好了",
    "zh_CN": "当你准备好时，在 bugFix 分支上面提交一次就可以了",
    "ru_RU": "Когда закончишь, просто сделай commit",
    "ko"   : "다음으로 넘어가고 싶으면 bugFix를 한번 커밋하면 됩니다.",
    "uk"   : "Просто зроби один коміт в bugFix коли ти будеш готовий іти далі"
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
              "Parce ce que les tags sont de très bonnes références dans le code, git à une commande pour *décrire* (describe) la différence entre le commit et le tag le plus récent. Cette commande s'appelle `git describe` !",
              "",
              "Git describe peut vous aider lorsque vous vous êtes beaucoup déplacé; cela peut arriver après un git bisect (chercher l'apparition d'un bug) ou lorsque vous revenez de vacances après 3 semaines sur l'ordinateur d'un collègue."
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
              "où `<ref>` est un n'importe quelle chose que git peut résoudre en un commit. Si vous ne spécifiez pas de ref, `HEAD` est pris par défaut.",
              "",
              "Le résultat de la commande ressemble à :",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "où `tag` est le tag le plus proche dans l'historique, `numCommits` le nombre de commits avec le tag, et `<hash>` le hash/identifiant du commit décrit."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Regardons un petit exemple. Prenons cet arbre :"
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
              "### Git Describe",
              "",
              "由于标签在代码库中起着“锚点”的作用，Git 还为此专门设计了一个命令用来**描述**离你最近的锚点（也就是标签），它就是 `git describe`！",
              "",
              "Git Describe 能帮你在提交历史中移动了多次以后找到方向；当你用 `git bisect`（一个查找产生 Bug 的提交记录的指令）找到某个提交记录时，或者是当你坐在你那刚刚度假回来的同事的电脑前时， 可能会用到这个命令。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git describe` 的​​语法是：",
              "",
              "`git describe <ref>`",
              "",
              "`<ref>` 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会以你目前所检出的位置（`HEAD`）。",
              "",
              "它输出的结果是这样的：",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "`tag` 表示的是离 `ref` 最近的标签， `numCommits` 是表示这个 `ref` 与 `tag` 相差有多少个提交记录， `hash` 表示的是你所给定的 `ref` 所表示的提交记录哈希值的前几位。",
              "",
              "当 `ref` 提交记录上有某个标签时，则只输出标签名称"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "让我们来看一个例子，对于下面的提交树："
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
              "`git describe` 就是这样了！试着在这个关卡指定几个位置来感受一下这个命令吧！",
              "",
              "当你准备进行下一关时，只要提交一次就可以通过这个关卡。算是我们送你的一个小礼物吧 :P"
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
    "gl" : {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Git Describe",
              "",
              "Como as tags fan a función de \"áncora\" no repositorio, Git ten un comando para *describir* ónde podes estar ti en relación á \"áncora\" (tag) máis próxima. Ese comando chámase `git describe`!",
              "",
              "Git describe pode axudar a recuperar a túa posición despois de mover moitos commits para atrás ou para adiante na historia; esto pode suceder depois de que fagas un git bisect (unha búsqueda para atopar erros) ou cando te sentas no ordenador dun colega que chegou das vacacións."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git describe lánzase do seguinte xeito:",
              "",
              "`git describe <ref>`",
              "",
              "Onde `<ref>` é qualquera cousa que git poida resolver como unha referencia a un commit. Se non especificas a ref, git usará o commit actual no que se esté traballando (`HEAD`).",
              "",
              "A resposta do comando é algo semellante a esto:",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "Onde `tag` é a tag anterior máis próxima na historia, `numCommits` é o número de commits de distancia ó tag, e `<hash>` é o hash do commit no que estamos."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vexamos un exemplo rápido. Para a árbore de abaixo:"
            ],
            "afterMarkdowns": [
              "O comando `git describe master` daría a saída:",
              "",
              "`v1_2_gC2`",
              "",
              "Mentres que `git describe side` daría:",
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
              "¡Básicamente é iso do que trata git describe! Intenta descubrir algúns locais da árbore para sentir como se comporta o comando.",
              "",
              "Cando estés listo, fai un commit para que o nivel remate. Esa é a gracia."
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
              "`<Tag-Name>` ist dabei der nächstliegende Tag in den Vorgänger-Commits, `<Anzahl Commits>` zeigt an, wieviele Commits dieses Tag entfernt ist und `<Hash>` ist das SHA des Commits, auf den HEAD zeigt.",
              "",
              "**Achtung**: `<Anzahl Commits>` und `<Hash>` erscheint nur, wenn HEAD nicht auf ein Tag zeigt. `git describe` verarbeitet standardmässig nur annotierte Tags. Um nicht annotierte tags zu sehen, verwende bitte`git describe --tags`."
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
    },
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Git Describe",
              "",
              "タグは、ソースリストの優秀な「アンカー（標識）」として作用するので、Gitには最も近く関係のある「アンカー」（タグの別名）を*記述するため*のコマンドがあります。そして、そのコマンドは`git describe`と呼ばれています！",
              "",
              "Gitの`describe`は、あなたが大量のコミットの中を移動するとき、今どこにいるかを知るのを助けてくれます（このような状況は、例えばあなたがデバッグ検索コマンドの一つ`git bisect`を走らせ終わった後や、同僚が休暇から帰ってきて自分の席に座るときに起こります）。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Gitの`describe`は、以下の形式をとります:",
              "",
              "`git describe <参照>`",
              "",
              "`<参照>`には、Gitが解釈可能なコミットの参照表現（ブランチやタグの指定、コミットハッシュなど）をいれます。もし、何も入力しなかった場合、Gitは現在の位置のコミット（`HEAD`）を使います。",
              "",
              "コマンドの結果は以下のようになります:",
              "",
              "`<タグ>_<コミット数>_g<ハッシュ>`",
              "",
              "`<タグ>`には履歴の一番最新のタグ名が、`<コミット数>`にはそのタグから幾つのコミットがあったか、`<ハッシュ>`はそのコミットのハッシュがそれぞれ入ります。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "軽い例を見てみましょう。この木においての例は以下のようになります:"
            ],
            "afterMarkdowns": [
              "コマンド`git describe master`の結果は以下のようになります:",
              "",
              "`v1_2_gC2`",
              "",
              "さらに`git describe side`の結果は以下のようになります:",
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
              "`describe`によってGitの情報が簡潔に全て記述されます！このレベルでは、このコマンドの感触をつかむため幾つかの場所で`describe`をしてみてください。",
              "",
              "終わったら、最新のコミットに行き一度コミットを行えばこのレベルを終了することができます。この先では、いくつかの挑戦課題を用意しています :P"
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
              "### Git Describe",
              "",
              "Теги являются прекрасными ориентирами в истории изменений, поэтому в git есть команда, которая показывает, как далеко текущее состоянии от ближайшего тега. И эта команда называется `git describe`",
              "",
              "Git describe помогает сориентироваться после отката на много коммитов по истории изменений. Такое может случиться, когда вы сделали `git bisect` или если вы недавно вернулись из отпуска =)"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git describe выглядит примерно так:",
              "",
              "`git describe <ref>`",
              "",
              "Где `ref` — это что-либо, что указывает на конкретный коммит. Если не указать `ref`, то git будет считать, что указано текущее положение (`HEAD`).",
              "",
              "Вывод команды выглядит примерно так:",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "Где `tag` – это ближайший тег в истории изменений, `numCommits` – это на сколько далеко мы от этого тега, а `hash` – это хеш коммита, который описывается."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Посмотрим на простой пример. Для дерева, показанного ниже:"
            ],
            "afterMarkdowns": [
              "Команда `git describe master` выведет:",
              "",
              "`v1_2_gC2`",
              "",
              "Тогда как `git describe side` выведет:",
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
              "Это, в общем-то, всё, что можно сказать про `git describe`. Попробуй выполнить команду на нескольких коммитах.",
              "",
              "Как только наиграешься, просто сделай один коммит, и уровень будет пройден."
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
              "### Git Describe",
              "",
              "커밋 트리에서 태그가 훌륭한 \"닻\"역할을 하기 때문에, git에는 여러분이 가장 가까운 \"닻(태그)\"에 비해 상대적으로 어디에 위치해있는지 *describe(묘사)*해주는 명령어가 있습니다. 이 명령어는 `git describe` 입니다!",
              "",
              "Git describe는 커밋 히스토리에서 앞 뒤로 여러 커밋을 이동하고 나서 커밋 트리에서 방향감각을 다시 찾는데 도움을 줍니다; 이런 상황은 git bisect(문제가 되는 커밋을 찾는 명령어라고 간단히 생각하자)를 하고 나서라던가 휴가를 다녀온 동료의 컴퓨터에 앉는경우가 있습니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git describe 는 다음의 형태를 가지고 있습니다:",
              "",
              "`git describe <ref>`",
              "",
              "`<ref>`에는 commit을 의미하는 그 어떤것이던 쓸 수 있습니다. 만약 ref를 특정 지어주지 않으면, git은 그냥 지금 체크아웃된곳을 사용합니다 (`HEAD`).",
              "",
              "명령어의 출력은 다음과 같은 형태로 나타납니다:",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "`tag`는 가장 가까운 부모 태그를 나타냅니다. `numCommits`은 그 태그가 몇 커밋 멀리있는지를 나타냅니다. `<hash>`는 묘사하고있는 커밋의 해시를 나타냅니다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "간단한 예제를 확인해 봅시다. 아래의 트리에서:"
            ],
            "afterMarkdowns": [
              "`git describe master` 명령은 다음을 출력합니다:",
              "",
              "`v1_2_gC2`",
              "",
              "`git describe side`는 다음을 출력합니다:",
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
              "이정도면 git describe를 충분히 활용할 수 있습니다! 이 레벨의 몇 지점을 describe 명령어를 통해 확인해보면서 느낌을 익혀 봅시다.",
              "",
              "준비가 되면 커밋을 한번해서 레벨을 종료하세요. 자유롭게 연습해보세요 :P"
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
              "### Git Describe",
              "",
              "Через те, що таги є такими чудовими \"орієнтирами\" по коду, git також має команду *описати* (describe) де ти є відносно найближчого \"орієнтира\" (тобто тага). І ця команда називається `git describe`!",
              "",
              "Git describe допоможе тобі знайти себе після того як ти перестрибнеш на кілька комітів по історії вперед чи назад; це може статися після того як ти закінчив git bisect (пошук-дебаггер) чи коли тебе попросили підійти до колеги, котрий щойно прийшов з відпустки."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git describe має наступну форму:",
              "",
              "`git describe <посилання>`",
              "",
              "Де `<посилання>` -- це будь-що, що вказує на конкретний коміт. Якщо ти не вкажеш посилання, git використає поточну локацію (`HEAD`).",
              "",
              "Вивід команди виглядає як:",
              "",
              "`<таг>_<к-ть комітів>_g<хеш>`",
              "",
              "де `таг` -- це найближчий попередній таг з історії; `к-ть комітів` -- це наскільки далеко цей таг в історії, а `<хеш>` -- це хеш коміту, який описується."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Розгляньмо короткий приклад. Для дерева нижче:"
            ],
            "afterMarkdowns": [
              "Команда `git describe master` виведе:",
              "",
              "`v1_2_gC2`",
              "",
              "коли `git describe side` виведе:",
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
              "Ось і все що ти маєш знати про git describe. Спробуй виконати describe для різних місць в дереві комітів щоб набити руку.",
              "",
              "Як будеш готовий, просто закоміть щось щоб закінчити цей рівень. Трохи шари :P"
            ]
          }
        }
      ]
    }
  }
};
