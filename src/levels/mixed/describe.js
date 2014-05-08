exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C4\",\"id\":\"side\",\"remoteTrackingBranchID\":null},\"bugFix\":{\"target\":\"C7\",\"id\":\"bugFix\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"tags\":{\"v0\":{\"target\":\"C0\",\"id\":\"v0\",\"type\":\"tag\"},\"v1\":{\"target\":\"C3\",\"id\":\"v1\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git commit ",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C4\",\"id\":\"side\",\"remoteTrackingBranchID\":null},\"bugFix\":{\"target\":\"C6\",\"id\":\"bugFix\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"tags\":{\"v0\":{\"target\":\"C0\",\"id\":\"v0\",\"type\":\"tag\"},\"v1\":{\"target\":\"C3\",\"id\":\"v1\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Git Describe",
    "de_DE": "Git Describe",
    "es_AR": "Git Describe",
    "zh_TW": "git describe"
  },
  "hint": {
    "en_US": "Just commit once on bugFix when you're ready to move on",
    "de_DE": "Committe nur einmal auf bugFix, wenn du soweit bist",
    "es_AR": "Simplemente commiteá una vez en bugFix cuando estés listo para seguir",
    "zh_TW": "當你要移動的時候，只要在 bugFix 上面 commit 就好了"
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
