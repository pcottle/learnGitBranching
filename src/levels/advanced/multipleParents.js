exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C7\",\"id\":\"master\"},\"bugWork\":{\"target\":\"C2\",\"id\":\"bugWork\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C4\",\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugWork master^^2^",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C7\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C4\",\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Multiple parents",
    "zh_CN": "多个父提交记录",
    'fr_FR': 'Parents multiples',
    "de_DE": "Mehrere Vorgänger",
    "ja"   : "複数のparent commit",
    "es_AR": "Múltiples padres",
    "pt_BR": "Múltiplos pais",
    "zh_TW": "多個 parent commit"
  },
  "hint": {
    "en_US": "Use `git branch bugWork` with a target commit to create the missing reference.",
    "de_DE": "Nutze `git branch bugWork` mit einem Ziel-Commit um die fehlende Referenz zu erstellen.",
    "ja"   : "`git branch bugWork`を対象のコミットと組み合わせて使い、欠如しているリファレンスを作成",
    'fr_FR': 'Utilisez "git branch bugWork" avec un commit pour créer une référence manquante',
    "zh_CN": "使用`git branch bugWork`加上一个目标提交记录来创建消失的引用。",
    "es_AR": "Usá `git branch bugWork` sobre algún commit para crear la referencia faltante",
    "pt_BR": "Use `git branch bugWork` com um commit alvo para criar a referência que falta",
    "zh_TW": "在一個指定的 commit 上面使用 `git branch bugWork`。"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Specifying Parents",
              "",
              "Like the `~` modifier, the `^` modifier also accepts an optional number after it.",
              "",
              "Rather than specifying the number of generations to go back (what `~` takes), the modifier on `^` specifies which parent reference to follow from a merge commit. Remember that merge commits have multiple parents, so the path to choose is ambiguous.",
              "",
              "Git will normally follow the \"first\" parent upwards from a merge commit, but specifying a number with `^` changes this default behavior.",
              "",
              "Enough talking, let's see it in action.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here we have a merge commit. If we checkout `master^` without the modifier, we will follow the first parent after the merge commit. ",
              "",
              "(*In our visuals, the first parent is positioned directly above the merge commit.*)"
            ],
            "afterMarkdowns": [
              "Easy -- this is what we are all used to."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Now let's try specifying the second parent instead..."
            ],
            "afterMarkdowns": [
              "See? We followed the other parent upwards."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "The `^` and `~` modifiers can make moving around a commit tree very powerful:"
            ],
            "afterMarkdowns": [
              "Lightning fast!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Even crazier, these modifiers can be chained together! Check this out:"
            ],
            "afterMarkdowns": [
              "The same movement as before, but all in one command."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Put it to practice",
              "",
              "To complete this level, create a new branch at the specified destination.",
              "",
              "Obviously it would be easy to specify the commit directly (with something like `C6`), but I challenge you to use the modifiers we talked about instead!"
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
              "### Vorgänger ansteuern",
              "",
              "Wie der Operator `~` akzeptiert auch der Operator `^` eine optionale Anzahl.",
              "",
              "Anstatt der Anzahl von Schritten, die zurückgegangen werden soll (das ist das, was man bei `~` angibt), bezeichnet die Anzahl nach `^` welchem Vorgänger bei einem Merge-Commit gefolgt werden soll. Du erinnerst dich, dass ein Merge-Commit mehrere Vorgänger hat; es gilt also aus diesen auszuwählen.",
              "",
              "Normalerweise folgt Git dem \"ersten\" Vorgänger des Merge-Commit, aber durch Angabe einer Zahl nach dem `^` lässt sich dieses Verhalten ändern.",
              "",
              "Aber genug gequatscht, schauen wir's uns in Aktion an.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
            "Hier sehen wir einen Merge-Commit. Wenn wir einen Checkout von `master^` ohne Zahl machen, wird Git auf den ersten Vorgänger des Commits zurückgehen. ",
              "",
              "*(In unserer Darstellung befindet sich der erste Vorgänger direkt über dem Merge-Commit.)*"
            ],
            "afterMarkdowns": [
            "Simpel -- so kennen wir das."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
            "Jetzt versuchen wir mal stattdessen den zweiten Vorgänger anzugeben ..."
            ],
            "afterMarkdowns": [
            "Gesehen? Wir gehen zu dem anderen Vorgänger zurück."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Die Operatoren `^` und `~` geben uns eine Menge Möglichkeiten für das Navigieren durch den Commit-Baum:"
            ],
            "afterMarkdowns": [
            "Bämm!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
            "Noch abgefahrener: die beiden Operatoren können verkettet werden. Aufgepasst:"
            ],
            "afterMarkdowns": [
            "Gleicher Ablauf wie zuvor, nur alles in einem Befehl."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
            "### Setzen wir's um",
              "",
              "Erstelle einen neuen Branch an dem angegebenen Ziel, um diesen Level abzuschließen.",
              "",
              "Es ist natürlich möglich den Commit einfach direkt anzugeben (also mit sowas wie `C6`), aber ich fordere dich heraus stattdessen die relativen Operatoren zu benutzen!"
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
              "### Determine les Parents",
              "",
              "Comme le symbole `~`, le symbole `^` accepte un numéro après lui.",
              "",
              "Au lieu d'entrer le nombre de générations à remonter (ce que `~` fait), le symbole `^` détermine quel parent est à remonter. Attention, un merge commit a deux parents ce qui peut porter à confusion.",
              "",
              "Normalement Git suit le  \"premier\" parent pour un commit/merge, mais avec un numéro suivi de `^` le comportement par défault est modifié.",
              "",
              "Assez de bla bla, passons à l\'action",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Nous avons un commit/merge. Si nous faisons checkout `master^` sans le symbole, on obtient le premier parent suivant ce commit. ",
              "",
              "(*Dans notre vue, le premier parent se situe juste au dessus du merge.*)"
            ],
            "afterMarkdowns": [
              "Facile -- C\'est ce que nous faisons tout le temps."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Nous allons spécifier le deuxième parent à la place."
            ],
            "afterMarkdowns": [
              "Vous voyez ? Nous suivons le second parent."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Les symboles `^` et `~` permettent de se déplacer de façon très efficace :"
            ],
            "afterMarkdowns": [
              "Boum, vitesse du tonnerre !"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Encore plus fou, ces symboles peuvent être enchainés ! Regardez cela :"
            ],
            "afterMarkdowns": [
              "Le même résultat, mais en une seule commande."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Un peu de pratique",
              "",
              "Pour réussir le niveau, créez une nouvelle branche à la destination indiquée",
              "",
              "Évidement ce serait plus rapide de spécifier le commit (C6 par exemple), mais faites-le plutôt avec les symboles de déplacement dont nous venons de parler !"
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
              "### 选择父提交",
              "",
              "和`~`修改符一样，`^`修改符之后也可以跟一个（可选的）数字。",
              "",
              "这不是用来指定向上返回几代（`~`的作用），`^`后的数字指定跟随合并提交记录的哪一个父提交。还记得一个合并提交有多个父提交吧，所有选择哪条路径不是那么清晰。",
              "",
              "Git默认选择跟随合并提交的\"第一个\"父提交，使用`^`后跟一个数字来改变这一默认行为。",
              "",
              "废话不多说，举个例子。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "这里有一个合并提交。如果不加数字修改符直接切换到`master^`，会回到第一个父提交。",
              "",
              "(*在我们的图示中，第一个父提交是指合并提交正上方的那个父提交。*)"
            ],
            "afterMarkdowns": [
              "OK--这恰好是我们想要的。"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "现在来试试选择第二个父提交……"
            ],
            "afterMarkdowns": [
              "看见了吧？我们回到了第二个父提交。"
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "使用`^`和`~`可以自由在在提交树中移动："
            ],
            "afterMarkdowns": [
              "快若闪电！"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "再疯狂点，这些修改符支持链式操作！试一下这个："
            ],
            "afterMarkdowns": [
              "和前面的结果一样，但只用了一条命令。"
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 实践一下",
              "",
              "要完成此关，在指定的目标位置创建一个新的分支。",
              "",
              "很明显可以简单的直接使用提交记录的hash值（比如`C6`），但我要求你使用刚刚讲到的相对引用修饰符！"
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
              "### Especificando los padres",
              "",
              "Como el modificador de `~`, `^` también acepta un número opcional después de él.",
              "",
              "En lugar de especificar cuántas generaciones hacia atrás ir (como `~`), el modificador de `^` especifica por cuál de las referencias padres seguir en un commit de merge. Recordá que un commit de merge tiene múltiples padres, por lo que el camino a seguir es ambiguo.",
              "",
              "Git normalmente sigue el \"primer\" padre de un commit de merge, pero especificando un número junto con `^` cambia este comportamiento predefinido.",
              "",
              "Demasiada charla, veámoslo en acción.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Acá tenemos un commit de merge. Si hacemos checkout de `master^`, sin modificadores, vamos a seguir al primer padre después del commit de merge. ",
              "",
              "(*En nuestras visualizaciones, el primer padre se ubica directamente arriba del commit de merge.*)"
            ],
            "afterMarkdowns": [
              "Fácil -- esto es a lo que estamos acostumbrados."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ahora tratemos de especificar el segundo padre, en cambio..."
            ],
            "afterMarkdowns": [
              "¿Ves? Seguimos al otro padre hacia arriba."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Los modificadores de `^` y `~` son muy poderosos a la hora de movernos en un árbol:"
            ],
            "afterMarkdowns": [
              "¡Rapidísimo!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Más loco aún, ¡estos modificadores pueden encadenarse entre sí! Mirá esto:"
            ],
            "afterMarkdowns": [
              "El mismo movimiento que antes, pero todo en uno."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Ponelo en práctica",
              "",
              "Para completar este nivel, creá una nueva rama en la ubicación indicada.",
              "",
              "Obviamente sería muy fácil especificar el commit directamente (algo como `C6`), pero te reto a usar los modificadores de los que estuvimos hablando, mejor"
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
              "### Especificando pais",
              "",
              "Assim como o modificador `~`, o modificador `^` também aceita um número opcional depois dele.",
              "",
              "Em vez de especificar o número de gerações a voltar (que é o que o `~` faz), o modificador no `^` especifica qual referência de pai a ser seguida a partir de um commit de merge. Lembre-se que commits de merge possuem múltiplos pais, então o caminho a seguir é ambíguo.",
              "",
              "O Git normalmente subirá o \"primeiro\" pai de um commit de merge, mas especificar um número após o `^` muda esse comportamento padrão.",
              "",
              "Basta de conversa, vejamos o operador em ação.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aqui temos um commit de merge. Se fizermos checkout em `master^` sem especificar um número, vamos seguir o primeiro pai acima do commit de merge. ",
              "",
              "(*Em nossa visualização, o primeiro pai é aquele diretamente acima do commit de merge.*)"
            ],
            "afterMarkdowns": [
              "Fácil -- isso é aquilo com o que já estamos acostumados."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Agora vamos, em vez disso, especificar o segundo pai..."
            ],
            "afterMarkdowns": [
              "Viu? Subimos para o outro pai."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Os modificadores `^` e `~` podem tornar a movimentação ao redor da árvore de commits muito poderosa:"
            ],
            "afterMarkdowns": [
              "Rápido como a luz!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ainda mais louco, esses modificadores podem ser encadeados em conjunto! Veja só:"
            ],
            "afterMarkdowns": [
              "O mesmo movimento que o anterior, mas tudo em um único comando."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Coloque em prática",
              "",
              "Para completar este nível, crie um novo ramo no destino especificado.",
              "",
              "Obviamente seria mais fácil especificar o commit diretamente (com algo como `C6`), mas em vez disso eu desafio você a usar os modificadores sobre os quais falamos!"
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
              "### 選擇 parent commit",
              "",
              "和 `~` 符號一樣，`^` 符號的後面也可以接一個（可選的）數字。",
              "",
              "這不是用來指定往上回去幾代（`~` 的作用），`^` 後面所跟的數字表示我要選擇哪一個 parent commit。還記得一個 merge commit 可以有多個 parent commit 吧，所以當我們要選擇走到哪一個 parent commit 的時候就會比較麻煩了。",
              "",
              "git 預設會選擇 merge commit 的\"第一個\" parent commit，使用 `^` 後面接一個數字可以改變這個預設的行為。",
              "",
              "廢話不多說，舉一個例子。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "這裡有一個 merge commit。如果後面不加數字的話會直接切換到`master^`，也就是說會回到第一個 parent commit。",
              "",
              "(*在我們的圖示中，第一個 parent commit 是指 merge commit 正上方的那一個 parent commit。*)"
            ],
            "afterMarkdowns": [
              "簡單吧！這就是預設的情況。"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "現在來試試選擇第二個 parent commit..."
            ],
            "afterMarkdowns": [
              "看到了嗎？我們回到了第二個 parent commit。"
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "使用`^`和`~`可以自由在 commit tree 中移動："
            ],
            "afterMarkdowns": [
              "簡直就像是電光石火！"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "再瘋狂點，這些符號可以被連在一起！試一下這個："
            ],
            "afterMarkdowns": [
              "和前面的結果一樣，但只用了一條指令。"
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 練習一下",
              "",
              "要完成這一關，在指定的目標位置上面建立一個新的 branch。",
              "",
              "很明顯可以直接使用 commit 的 hash 值（比如 `C6`），但我要求你使用剛剛講到的相對引用的符號！"
            ]
          }
        }
      ]
    }
  }
};
