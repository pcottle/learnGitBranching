exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C0\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"C1\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch -f master C6;git checkout HEAD~1;git branch -f bugFix HEAD~1",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C5\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"C2\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "You'll need to use at least one direct reference (hash) to complete this level",
    "zh_CN": "这一关至少要用到一次直接引用(hash)",
    "zh_TW": "這一關至少要用到一次直接參考（hash）",
    "es_AR": "Vas a necesitar usar al menos una referencia directa (hash) para completar este nivel",
    "de_DE": "Du musst mindestens einen Hash benutzen, um dieses Level zu schaffen"
  },
  "name": {
    "en_US": "Relative Refs #2 (~)",
    "de_DE": "Relative Referenzen #2 (~)",
    "es_AR": "Referencias relativas #2 (~)",
    "zh_CN": "相对引用2(~)",
    "zh_TW": "相對引用二（~）"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### The \"~\" operator",
              "",
              "Say you want to move a lot of levels up in the commit tree. It might be tedious to type `^` several times, so Git also has the tilde (~) operator.",
              "",
              "",
              "The tilde operator (optionally) takes in a trailing number that specifies the number of parents you would like to ascend. Let's see it in action"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's specify a number of commits back with `~`."
            ],
            "afterMarkdowns": [
              "Boom! So concise -- relative refs are great."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Branch forcing",
              "",
              "You're an expert on relative refs now, so let's actually *use* them for something.",
              "",
              "One of the most common ways I use relative refs is to move branches around. You can directly reassign a branch to a commit with the `-f` option. So something like:",
              "",
              "`git branch -f master HEAD~3`",
              "",
              "Moves (by force) the master branch to three parents behind HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see that previous command in action"
            ],
            "afterMarkdowns": [
              "There we go! Relative refs gave us a concise way to refer to `C1` and branch forcing (`-f`) gave us a way to quickly move a branch to that location"
            ],
            "command": "git branch -f master HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Now that you have seen relative refs and branch forcing in combination, lets use them to solve the next level.",
              "",
              "To complete this level, move `HEAD`, `master`, and `bugFix` to their goal destinations shown."
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
              "### El operador \"~\"",
              "",
              "Digamos que querés moverte un montón de niveles atrás en tu árbol de commits. Podría ser tedioso tipear `^` muchas veces, por lo que git tiene el operador ~.",
              "",
              "",
              "El operador ~ (opcionalmente) toma una cantidad que especifica la cantidad de padres que querés volver hacia atrás. Veámoslo en acción"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Especifiquemos una cantidad de commits hacia atrás con `~`."
            ],
            "afterMarkdowns": [
              "¡Boom! Bien consiso -- las referencias relativas la rompen."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forzando los branches",
              "",
              "Ahora que sos un experto en las referencias relativas, *usémoslas* para algo.",
              "",
              "Una de las formas más comunes en que uso las referencias relativas es para mover las ramas. Podés reasignar directamente una rama a un commit usando la opción `-f`. Así que algo como:",
              "",
              "`git branch -f master HEAD~3`",
              "",
              "Mueve (forzadamente) la rama master tres padres atrás de HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos ese comando previo en acción"
            ],
            "afterMarkdowns": [
              "¡Ahí vamos! Las referencias relativas nos dieron una manera consisa de referenciar a `C1`, y forzar la rama (`-f`) nos dio una manera rápida de mover la rama a esa ubicación"
            ],
            "command": "git branch -f master HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ahora que viste las referencias relativas y el forzar ramas combinados, usémoslos para resolver el siguiente nivel.",
              "",
              "Para completar este nivel, mové `HEAD`, `master` y `bugFix` a sus destinos finales."
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
              "### Der \"~\"-Operator",
              "",
              "Nehem wir an du willst viele Schritte im Commit-Baum zurückgehen. Dann wird es schnell mühsam immer wieder `^` einzugeben; deswegen gibt es in Git den Tilde-Operator `~`.",
              "",
              "Der Tilde-Operator akzeptiert optional eine Zahl, mit der du angeben kannst vieviele Vorgänger zu zurückgehen willst. Keine Anzahl anzugeben bewirkt dasselbe wie `~1`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Geben wir mit `~` an wiviele Commits wir zurückgehen wollen"
            ],
            "afterMarkdowns": [
              "Peng! So einfach -- relative Referenzen sind super."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Erzwungene Branches",
              "",
              "Du bist jetzt Experte in Sachen relative Referenzen, also lass sie uns mal richtig einsetzen.",
              "",
              "Das Verschieben von Branches ist einer der häufigsten Anwendungsfälle dafür. Du kannst einen Branchnamen direkt auf einen bestimmten Commit setzen (_ohne_ ihne vorher ausgecheckt haben zu müssen!) indem du den Parameter `-f` benutzt. So in etwa:",
              "",
              "`git branch -f master HEAD~3`",
              "",
              "Das bewegt (erzwungenermaßen) den `master` auf den Commit drei Vorgänger vor `HEAD`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns das mal in Aktion an:"
            ],
            "afterMarkdowns": [
              "Das war's schon! Relative Referenzen ermüglichen es uns den Commit `C1` sehr einfach anzugeben und `git branch -f` ermöglicht es uns, den Branch sehr schnell auf diesen Commit zu setzen."
            ],
            "command": "git branch -f master HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Jetzt wo du relative Referenzen und erzwungenes Branching in Kombination gesehen hast können wir damit den nächsten Level bewältigen.",
              "",
              "Bewege `HEAD`, `master` und `bugFix` an die jeweils angegebenen Positionen, um diesen Level abzuschließen."
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
              "### The \"~\" operator",
              "",
              "假设需要在提交树中向上移动很多步。使用多个`^`非常无聊，所以Git也引入了波浪(~)操作符。",
              "",
              "",
              "波浪操作符后面可以（可选地）跟一个数字，指定向上移动多少次。看个例子"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "使用`~`一次后退多步."
            ],
            "afterMarkdowns": [
              "唰！如此简洁--相对引用就是好啊！"
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Branch forcing",
              "",
              "你现在是相对引用的高手了，现在*用*他来实际做点事情。",
              "",
              "我使用相对引用最多的就是移动分支。你可以使用`-f`选项把直接让分支指向另一个提交。举个例子:",
              "",
              "`git branch -f master HEAD~3`",
              "",
              "（强制）移动master指向HEAD的第3级父提交。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成此关，移动`HEAD`，`master`和`bugFix`到目标所示的位置。"
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
              "### \"~\" 符號",
              "",
              "假設需要在 commit tree 中向上移動多個 commit。使用太多 `^` 會非常討人厭，所以 git 也加入了波浪（~）符號。",
              "",
              "",
              "波浪符號後面可以選擇一個數字（你也可以不選擇），該數字可以告訴 Git 我要向上移動多少個 commit 。舉個例子"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "使用 `~` 一次往上移動多個 commit。"
            ],
            "afterMarkdowns": [
              "哇！太簡潔了 -- 相對引用真的很好用！"
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Branch forcing",
              "",
              "你現在是相對引用的高手了，現在用它來實際做點事情。",
              "",
              "我使用相對引用最多的就是移動分支。你可以使用 `-f` 選項直接讓分支指向另一個 commit。舉個例子:",
              "",
              "`git branch -f master HEAD~3`",
              "",
              "（強制）移動 master 指向從 HEAD 往上數的第三個 parent commit。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這一關，移動 `HEAD`，`master` 和 `bugFix` 到目標所示的位置。"
            ]
          }
        }
      ]
    }
  }
};
