exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"C4\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git checkout C4",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Detach yo' HEAD",
    "es_AR": "Desatacheá tu HEAD",
    "zh_CN": "分离HEAD",
    "zh_TW": "分離 HEAD",
    "de_DE": "Den Kopf abtrennen"
  },
  "hint": {
    "en_US": "Use the label (hash) on the commit for help!",
    "es_AR": "¡Usá la etiqueta (hash) sobre el commit para ayudarte!",
    "de_DE": "Benutze den Bezeichner (den Hash) des Commits.",
    "zh_TW": "使用 commit 上的標籤（hash）來幫助你！",
    "zh_CN": "使用提交记录上的标签(hash)来求助！"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Moving around in Git",
              "",
              "Before we get to some of the more advanced features of Git, it's important to understand different ways to move through the commit tree that represents your project.",
              "",
              "Once you're comfortable moving around, your powers with other git commands will be amplified!",
              "",
              "",
              "",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## HEAD",
              "",
              "First we have to talk about \"HEAD\". HEAD is the symbolic name for the currently checked out commit -- it's essentially what commit you're working on top of.",
              "",
              "HEAD always points to the most recent commit which is reflected in the working tree. Most git commands which make changes to the working tree will start by changing HEAD.",
              "",
              "Normally HEAD points to a branch name (like bugFix). When you commit, the status of bugFix is altered and this change is visible through HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see this in action. Here we will reveal HEAD before and after a commit."
            ],
            "afterMarkdowns": [
              "See! HEAD was hiding underneath our `master` branch all along."
            ],
            "command": "git checkout C1; git checkout master; git commit; git checkout C2",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Detaching HEAD",
              "",
              "Detaching HEAD just means attaching it to a commit instead of a branch. This is what it looks like beforehand:",
              "",
              "HEAD -> master -> C1",
              ""
            ],
            "afterMarkdowns": [
              "And now it's",
              "",
              "HEAD -> C1"
            ],
            "command": "git checkout C1",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To complete this level, let's detach HEAD from `bugFix` and attach it to the commit instead.",
              "",
              "Specify this commit by its hash. The hash for each commit is displayed on the circle that represents the commit."
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
              "## Moviéndose por ahí con Git",
              "",
              "Antes de meternos en algunas de las funcionalidades más avanzadas de git, es importante entender las distintas maneras de moverse por el árbol de commits que representa tu proyecto.",
              "",
              "Una vez que estés cómodo moviendote por ahí, tus poderes con los otros comandos de git ¡van a amplificarse!",
              "",
              "",
              "",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## HEAD",
              "",
              "Primero tenemos que hablar de \"HEAD\". HEAD es el nombre simbólico del commit actualmente checkouteado -- es, básicamente, el commit sobre el que estás trabajando.",
              "",
              "HEAD siempre apunta al commit más reciente, reflejado en el árbol de commits. La mayoría de los comandos de git que hacen cambios al árbol de commits empiezan modificando HEAD.",
              "",
              "Normalmente HEAD apunta al nombre de una rama (como bugFix). Cuando commiteás, el estado de bugFix se altera y este cambio es visible a través de HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamoslo en acción. Acá vamos a ver a HEAD antes y después de un commit."
            ],
            "afterMarkdowns": [
              "¡Ves! HEAD estuvo oculta bajo nuestra rama `master` todo este tiempo."
            ],
            "command": "git checkout C1; git checkout master; git commit; git checkout C2",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Detacheando HEAD",
              "",
              "Detachear (_des-adjuntar_) HEAD simplemente significa adjuntarla a un commit en lugar de a un branch. Así es como se ve de antemano:",
              "",
              "HEAD -> master -> C1",
              ""
            ],
            "afterMarkdowns": [
              "Y así queda ahora:",
              "",
              "HEAD -> C1"
            ],
            "command": "git checkout C1",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, detacheemos HEAD de `bugFix` y ataccheemosla al commit, en cambio.",
              "",
              "Especificá este commit por su hash. El hash de cada commit se muestra en el círculo que lo representa."
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
              "## Navigation durch Git",
              "",
              "Bevor wir uns einige fortgeschrittene Konzepte in Git ansehen ist es wichtig, verschiedene Wege zum Navigieren durch den Commit-Baum, der das Projekt enthält, zu kennen.",
              "",
              "Sobald du das drauf hast, vergrößern sich deine Möglichkeiten in allen anderen Git-Befehlen.",
              "",
              "",
              "",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## HEAD",
              "",
              "Erst mal müssen wir über `HEAD` reden. `HEAD` ist ein Alias für den Commit, der gerade ausgecheckt ist -- es ist im Prinzip der Commit, an den du deinen nächsten Commit hängst.",
              "",
              "`HEAD` zeigt immer auf den neuesten Commit. Die meisten Git-Befehle, die den Baum verändern, fangen damit an dass sie `HEAD` verschieben.",
              "",
              "Normalerweise zeigt `HEAD` auf einen Branch-Namen (z.B. `bugFix`). Wenn du einen Commit machst, wird `bugFix` auf diesen Commit geschoben, und `HEAD` (da es auf `bugFix` zeigt) automatisch auch."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns das mal in Aktion an. Wir werden hier `HEAD` vor und nach dem Commit anzeigen."
            ],
            "afterMarkdowns": [
              "Siehst du? `HEAD` war die ganze Zeit unter `master` versteckt."
            ],
            "command": "git checkout C1; git checkout master; git commit; git checkout C2",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### HEAD abkoppeln",
              "",
              "`HEAD` abzukoppeln bedeutet, es direkt an einen bestimmten Commit zu hängen, anstatt an einen Branch. Wir gelangen dadurch in den \"detached HEAD state\". So sieht's vorher aus:",
              "",
              "`HEAD` -> `master` -> `C1`",
              ""
            ],
            "afterMarkdowns": [
              "Und jetzt:",
              "",
              "`HEAD` -> `C1`"
            ],
            "command": "git checkout C1",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level abzuschließen, lass uns mal `HEAD` von `bugFix` abkoppeln und an den Commit hängen.",
              "",
              "Gib den Commit mit seinem Hash an. Der Hash jedes Commits steht in dem Kreis, der den Commit darstellt."
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
              "## 在Git中前后移动",
              "",
              "在接触Git的更多高级主题之前，我们先学习用不同的方法在代表你的项目的提交记录树上前后移动。",
              "",
              "一旦能够熟练地在Git中前进后退，你使用其他git命令的威力也会被放大！",
              "",
              "",
              "",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## HEAD",
              "",
              "我们首先看一下\"HEAD\". HEAD是当前提交记录的符号名称 -- 其实就是你正在其基础进行工作的提交记录。",
              "",
              "HEAD总是指向最近一次提交记录，表现为当前工作树。大多数修改工作树的git命令都开始于改变HEAD指向。",
              "",
              "HEAD通常指向分支名（比如bugFix）。你提交时，改变了bugFix的状态，这一变化通过HEAD变得可见。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "在实例中看一下。我们将会观察提交前后HEAD的位置。"
            ],
            "afterMarkdowns": [
              "看! HEAD一直藏在`master`分支后面。"
            ],
            "command": "git checkout C1; git checkout master; git commit; git checkout C2",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### 分离 HEAD",
              "",
              "分离HEAD就是让其指向一个提交记录而不是分支名。这是命令执行之前的样子： ",
              "",
              "HEAD -> master -> C1",
              ""
            ],
            "afterMarkdowns": [
              "现在变成了",
              "",
              "HEAD -> C1"
            ],
            "command": "git checkout C1",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "想完成此关，从`bugFix`分离出HEAD并让其指向一个提交记录。",
              "",
              "通过hash值指定提交记录。每个提交记录的hash值显示在代表提交记录的圆圈中。"
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
              "## 在 git 中前後移動",
              "",
              "在接觸 git 的更多進階的主題之前，我們先學習用不同的方法在你的 project 中的 commit tree 上面移動。",
              "",
              "一旦能夠熟練地在 commit tree 中隨意地移動，你使用其它的 git 指令也會更厲害！",
              "",
              "",
              "",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## HEAD",
              "",
              "我們首先看一下 \"HEAD\"，HEAD 是一個 reference，它是指向目前所 checkout 的 commit，基本上，其實就是你目前所在的 commit。",
              "",
              "在 commit tree 中，HEAD 總是指向最近的一次commit。大部份 git 的指令如果要修改 commit tree 的狀態的話，都會先改變 HEAD 所指向的 commit。",
              "",
              "HEAD 通常指向一個 branch 的名稱（比如 bugFix）。當你 commit 的時候，改變了 bugFix 的狀態，這一個變化可以從 HEAD 的改變中看到。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "在實際的例子中。我們將會觀察 commit 前後 HEAD 的位置。"
            ],
            "afterMarkdowns": [
              "看吧！HEAD 一直藏在 `master` 分支的後面。"
            ],
            "command": "git checkout C1; git checkout master; git commit; git checkout C2",
            "beforeCommand": ""
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### 分離 HEAD",
              "",
              "分離 HEAD 就是讓其指向一個 commit 而不是 branch 的名稱。這是指令執行之前的樣子：",
              "",
              "HEAD -> master -> C1",
              ""
            ],
            "afterMarkdowns": [
              "現在變成了",
              "",
              "HEAD -> C1"
            ],
            "command": "git checkout C1",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "想要完成這一個關卡，從 `bugFix` 分離出 HEAD 並且讓它指向一個 commit。",
              "",
              "通過 hash 值可以指定 commit。每個 commit 的 hash 值顯示在各自的圓圈中。"
            ]
          }
        }
      ]
    }
  }
};
