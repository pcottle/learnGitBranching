exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C7\",\"id\":\"master\"},\"bugWork\":{\"target\":\"C2\",\"id\":\"bugWork\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C4\",\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugWork master^^2^",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C7\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C4\",\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Multiple parents",
    "zh_CN": "两个父节点",
    'fr_FR': 'Parents multiples',
    "de_DE": "Mehrere Vorgänger",
    "ja"   : "複数の親",
    "es_AR": "Múltiples padres",
    "pt_BR": "Múltiplos pais",
    "gl"   : "Múltiples pais",
    "zh_TW": "多個 parent commit",
    "ru_RU": "Здоровая семья, или несколько родителей",
    "ko"   : "다수의 부모",
    'uk': 'Декілька батьків'
  },
  "hint": {
    "en_US": "Use `git branch bugWork` with a target commit to create the missing reference.",
    "de_DE": "Nutze `git branch bugWork` mit einem Ziel-Commit um die fehlende Referenz zu erstellen.",
    "ja"   : "`git branch bugWork`を対象のコミットと組み合わせて使い、欠如しているリファレンスを作成しましょう",
    'fr_FR': 'Utilisez "git branch bugWork" avec un commit pour créer une référence manquante',
    "zh_CN": "使用 `git branch bugWork` 加上一个目标提交记录来创建消失的引用。",
    "es_AR": "Usá `git branch bugWork` sobre algún commit para crear la referencia faltante",
    "pt_BR": "Use `git branch bugWork` com um commit alvo para criar a referência que falta",
    "gl"   : "Usa `git branch bugWork` sobre calquera commit para crear a referencia que falta",
    "zh_TW": "在一個指定的 commit 上面使用 `git branch bugWork`。",
    "ru_RU": "`git branch bugWork` на нужном коммите поможет создать нужную ссылку.",
    "ko"   : "`git branch bugWork`를 대상 커밋과 함께 사용해서 부족한 참조를 만드세요",
    'uk': 'Використай "git branch bugWork" на потрібному коміті щоб створити потрібне посилання'
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
              "### Détermine les parents",
              "",
              "Comme le symbole `~`, le symbole `^` accepte un numéro après lui.",
              "",
              "Au lieu d'entrer le nombre de générations à remonter (ce que `~` fait), le symbole `^` détermine quel parent est à remonter. Attention, un merge commit a deux parents ce qui peut porter à confusion.",
              "",
              "Normalement Git suit le \"premier\" parent pour un commit/merge, mais avec un numéro suivi de `^` le comportement par défaut est modifié.",
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
              "Pour réussir le niveau, créez une nouvelle branche à la destination indiquée.",
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
              "### 选择父提交记录",
              "",
              "操作符 `^` 与 `~` 符一样，后面也可以跟一个数字。",
              "",
              "但是该操作符后面的数字与 `~` 后面的不同，并不是用来指定向上返回几代，而是指定合并提交记录的某个父提交。还记得前面提到过的一个合并提交有两个父提交吧，所以遇到这样的节点时该选择哪条路径就不是很清晰了。",
              "",
              "Git 默认选择合并提交的“第一个”父提交，在操作符 `^` 后跟一个数字可以改变这一默认行为。",
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
              "这里有一个合并提交记录。如果不加数字修改符直接检出 `master^`，会回到第一个父提交记录。",
              "",
              "(*在我们的图示中，第一个父提交记录是指合并提交记录正上方的那个提交记录。*)"
            ],
            "afterMarkdowns": [
              "这正是我们都已经习惯的方法。"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "现在来试试选择另一个父提交……"
            ],
            "afterMarkdowns": [
              "看见了吧？我们回到了另外一个父提交上。"
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "使用 `^` 和 `~` 可以自由地在提交树中移动，非常给力："
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
              "更厉害的是，这些操作符还支持链式操作！试一下这个："
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
              "### 课后小练习",
              "",
              "要完成此关，在指定的目标位置创建一个新的分支。",
              "",
              "很明显可以简单地直接使用提交记录的哈希值（比如 `C6`），但我要求你使用刚刚讲到的相对引用修饰符！"
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

    "gl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Especificando pais",
              "",
              "Tanto o modificador `~`, como o modificador `^` aceptan un número opcional despois del.",
              "",
              "Mellor que especificar o número de commits que percorrer cara atrás (que é o que o `~` fai), o modificador sobre `^` especifica  qué referencia do pai vai ser seguida dende o commit con merge. Lembra qué os commits do merge teñen varios pais, entón o camiño a seguir é ambiguo.",
              "",
              "Git normalmente seguirá ó \"primeiro\" pai de un commit de merge, pero especificando un número co `^` muda o comportamento do pai.",
              "",
              "Xa chega de faladoiros, vexamos o comando en acción.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aquí temos un commit do merge. Se fixéramos checkout en `master^` sen especificar un número, imos seguir ó primeiro pai enriba do commit do merge. ",
              "",
              "(*Na nosa vista, o primeiro pai é aquel directamente enriba do commit do merge.*)"
            ],
            "afterMarkdowns": [
              "Sinxelo, eso é aquelo co que xa estamos acostumados."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Agora imos, en vez de iso, especificar o segundo pai..."
            ],
            "afterMarkdowns": [
              "¿Viches? Subimos para o outro pai."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Os modificadores `^` e `~` pódense mover ao redor da árbore de commits con moito poder:"
            ],
            "afterMarkdowns": [
              "Rápido coma a luz!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aínda máis tolo, eses modificadores poden ser encadeados en conxunto! Olla ahí:"
            ],
            "afterMarkdowns": [
              "O mesmo movemento feito antes, pero feito nun só comando."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Pono na práctica",
              "",
              "Para completar este nível, crea unha nova rama no destino especificado.",
              "",
              "Obviamente sería máis sinxelo especificar o commit diretamente (algo como `C6`), pero en vez de facer eso, ¡podes usar os modificadores dos que falamos!"
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
    },
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Определение родителей",
              "",
              "Так же как тильда (~), каретка (^) принимает номер после себя.",
              "",
              "Но в отличие от количества коммитов, на которые нужно откатиться назад (как делает `~`), номер после `^` определяет, на какого из родителей мерджа надо перейти. Учитывая, что мерджевый коммит имеет двух родителей, просто указать ^ нельзя.",
              "",
              "Git по умолчанию перейдёт на \"первого\" родителя коммита, но указание номера после `^` изменяет это поведение.",
              "",
              "Посмотрим, как это работает.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Вот мерджевый коммит. Если мы перейдём на `master^` без номера, то попадём на первого родителя.",
              "",
              "(*На нашей визуализации первый родитель находится прямо над коммитом*)"
            ],
            "afterMarkdowns": [
              "Просто - прямо как мы любим."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Теперь попробуем перейти на второго родителя."
            ],
            "afterMarkdowns": [
              "Вот. Мы на втором родительском коммите."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Модификаторы `^` и `~` сильно помогают перемещаться по дереву коммитов:"
            ],
            "afterMarkdowns": [
              "Быстро как Флэш!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Более того, эти модификаторы можно применять вместе. Например, так:"
            ],
            "afterMarkdowns": [
              "Сделаем то же самое, что перед этим, только в одну команду."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### На практике",
              "",
              "Чтобы пройти этот уровень, создай ветку в указанном месте.",
              "",
              "Очевидно, что (в данном случае) будет проще указать коммит напрямую, но для того, чтобы закрепить пройденное, используй модификаторы, о которых мы говорили выше."
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
              "### 親の指定",
              "",
              "`~`修飾子と同じように、`^`修飾子も後に任意の番号を置くことができます。",
              "",
              "指定した数だけ遡る（これは`~`の場合の機能）のではなく、`^`はマージコミットからどの親を選択するかを指定できます。マージコミットは複数の親で構成されるので、選択する経路が曖昧であることを覚えておいてください。",
              "",
              "Gitは通常、マージコミットから「一つ目」の親、マージされた側のブランチの親を選びます。しかし、`^`で数を指定することでこのデフォルトの動作を変えることができます。",
              "",
              "では、実際の動作を見ていきましょう。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "ここに、マージコミットがあります。もし、指定無しに`master^`でチェックアウトした場合、私たちは一番目の親に移動することになります。",
              "",
              "(*私たちのツリーでは、一番目の親はマージコミットのちょうど上に位置しています。*)"
            ],
            "afterMarkdowns": [
              "簡単ですね -- これがデフォルトの動作になります。"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "それでは代わりに二つ目の親を指定してみます"
            ],
            "afterMarkdowns": [
              "見ましたか？私たちは他の親に移ることができました。"
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`^`修飾子と`~`修飾子は、コミット履歴を辿るのを強力に補助してくれます:"
            ],
            "afterMarkdowns": [
              "超高速ですね！"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "より素晴らしいことに、これらの修飾子は連鎖させることができます！これを見てください:"
            ],
            "afterMarkdowns": [
              "前と同じ移動ですが、なんと一つのコマンドでできています。"
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 練習課題",
              "",
              "このレベルをクリアするためには、まず新しいブランチを指定したように作成します。",
              "",
              "明らかに直接コミットを指定した方が（`C6`というように）簡単ですが、私は今まで述べたような修飾子を使う方法で挑戦してもらいたいと思います。"
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
              "### 부모를 선택하기",
              "",
              "`~` 수식처럼 `^` 수식 또한 뒤에 숫자를 추가 할 수 있습니다.",
              "",
              "몇개의 세대를 돌아갈지 정하는 것 대신(`~`의 기능) `^`수식은 병합이된 커밋에서 어떤 부모를 참조할지 선택할 수 있습니다. 병합된 커밋들은 다수의 부모를 가지고 있다는것을 기억하시나요? 어떤 부모를 선택할지 예측할 수가 없습니다.",
              "",
              "Git은 보통 병합된 커밋에서 \"첫\"부모를 따라갑니다. 하지만 `^`수식을 를 숫자와 함께 사용하면 앞의 디폴트 동작대로가 아닌 다른 결과가 나타납니다.",
              "",
              "이만 줄이고, 직접 확인해봅시다.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "여기 병합된 커밋이 있습니다. 우리가 `master`를 수식없이 체크아웃한다면 병합된 커밋의 첫 부모를 따라 올라갈 것입니다. ",
              "",
              "(*화면에서는 첫 부모는 병합된 커밋 바로 위에 위치해 있습니다.*)"
            ],
            "afterMarkdowns": [
              "간단하죠 -- 우리한테 익숙한 모습입니다."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "자 이제 두번째 부모를 선택해봅시다..."
            ],
            "afterMarkdowns": [
              "보이나요? 다른 부모를 선택해 올라갔습니다."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`^`수식과 `~`수식을 이용해 커밋트리에서 효과적으로 움직일 수 있습니다.:"
            ],
            "afterMarkdowns": [
              "빛처럼 빠르게 말이죠!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "더 대단한것은 이 수식들은 같이 사용할 수 있다는 겁니다! 확인해봅시다:"
            ],
            "afterMarkdowns": [
              "앞과 같은 움직임이지만 하나의 명령으로 표현되었습니다."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 직접 확인해봅시다",
              "",
              "이 레벨을 완료하기 위해서 정해진 목적지에 새 브랜치를 생성하세요.",
              "",
              "물론 커밋을 직접 특정지어주면 아주 쉽겠지만(`C6`과 같이), 수식을 익혀볼겸 배운것을 사용해 도전해 봅시다!"
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
              "### Вибираємо Попередників",
              "",
              "Так само як і модифікатор `~`, модифікатор `^` також приймає необов’язкове число після нього.",
              "",
              "Замість того, щоб вказувати кількість генерацій щоб переміститись назад  (те що робить `~`), число після `^` вказує на яке батьківське посилання мерджу потрібно перейти. Зауважте що так як мерджевий коміт має декілька батьків, використання '^' без числа є неоднозначним.",
              "",
              "Git зазвичай перейде на \"першого\" з батьків вверх з мерджевого коміту, але вказання числа після  `^` змінює цю поведінку. ",
              "",
              "Годі ляси точити, перевірмо як це працює в дії.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ось ми маємо мерджевий коміт. Якщо зробимо checkout `master^` без числа, ми потрапимо на першого з предків ",
              "",
              "(*В нашій візуалізації перший предок знаходиться прямо над мерджевим комітом*)"
            ],
            "afterMarkdowns": [
              "Легко -- те до чого ми всі звикли."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Тепер спробуймо натомість вказати другого батька..."
            ],
            "afterMarkdowns": [
              "Бачиш? Ми перейшли до другого батька вверх."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Модифікатори `^` та `~` дозволяють легко пересуватися деревом комітів:"
            ],
            "afterMarkdowns": [
              "Супер швидко!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Більше того, ці модифікатори можна використовувати разом! Заціни:"
            ],
            "afterMarkdowns": [
              "Те саме, що й перед цим, але однією командою."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Практика",
              "",
              "Щоб завершити цей рівень, створи нову гілку на вказаному місці.",
              "",
              "Очевидно, що в данному випадку досить легко вказати коміт напряму (щось на зразок checkout `C6`), але для закріплення матеріалу використай модифікатори, про які ми щойно говорили!"
            ]
          }
        }
      ]
    }
  }
};
