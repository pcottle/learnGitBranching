exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"C3\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git checkout bugFix^",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Relative Refs (^)",
    "fr_FR": "Références relatives (^)",
    "ja"   : "相対リファレンス (^)",
    "zh_CN": "相对引用（^）",
    "zh_TW": "相對引用（^）",
    "es_AR": "Referencias relativas (^)",
    "pt_BR": "Referências relativas (^)",
    "gl"   : "Referencias relativas (^)",
    "de_DE": "Relative Referenzen (^)",
    "ru_RU": "Относительные ссылки (^)",
    "ko"   : "상대 참조 (^) (Relative Refs)",
    "uk": "Відносні посилання"
  },
  "hint": {
    "en_US": "Remember the Caret (^) operator!",
    "fr_FR": "Rappelez-vous de l'opérateur circonflexe (^)",
    "ja"   : "相対リファレンス(^)を思い出して！",
    "de_DE": "Denk an den Dach-Operator (^)!",
    "es_AR": "¡No te olvides del operador ^!",
    "pt_BR": "Não se esqueça do operador circunflexo (^)",
    "gl"   : "Non se esqueza do operador circunflexo (^)",
    "zh_CN": "记住操作符（^）！",
    "zh_TW": "不要忘記插入（^）符號！",
    "ru_RU": "Не забудь оператор `^`",
    "ko"   : "(^)연산자를 기억하세요!",
    "uk": "Не забудь оператор `^`"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Relative Refs",
              "",
              "Moving around in Git by specifying commit hashes can get a bit tedious. In the real world you won't have a nice commit tree visualization next to your terminal, so you'll have to use `git log` to see hashes.",
              "",
              "Furthermore, hashes are usually a lot longer in the real Git world as well. For instance, the hash of the commit that introduced the previous level is `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Doesn't exactly roll off the tongue...",
              "",
              "The upside is that Git is smart about hashes. It only requires you to specify enough characters of the hash until it uniquely identifies the commit. So I can type `fed2` instead of the long string above."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Like I said, specifying commits by their hash isn't the most convenient thing ever, which is why Git has relative refs. They are awesome!",
              "",
              "With relative refs, you can start somewhere memorable (like the branch `bugFix` or `HEAD`) and work from there.",
              "",
              "Relative commits are powerful, but we will introduce two simple ones here:",
              "",
              "* Moving upwards one commit at a time with `^`",
              "* Moving upwards a number of times with `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's look at the Caret (^) operator first. Each time you append that to a ref name, you are telling Git to find the parent of the specified commit.",
              "",
              "So saying `master^` is equivalent to \"the first parent of `master`\".",
              "",
              "`master^^` is the grandparent (second-generation ancestor) of `master`",
              "",
              "Let's check out the commit above master here"
            ],
            "afterMarkdowns": [
              "Boom! Done. Way easier than typing the commit hash"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "You can also reference `HEAD` as a relative ref. Let's use that a couple of times to move upwards in the commit tree"
            ],
            "afterMarkdowns": [
              "Easy! We can travel backwards in time with `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To complete this level, check out the parent commit of `bugFix`. This will detach `HEAD`.",
              "",
              "You can specify the hash if you want, but try using relative refs instead!"
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
              "## Références relatives",
              "",
              "Se déplacer dans Git en spécifiant des identifiants de commits (hashes) peut être un peu agaçant. Dans le monde réel vous n'aurez pas une vue sur un joli arbre des commits à côté de votre terminal, ainsi vous aurez à utiliser `git log` pour connaître les identifiants.",
              "",
              "De plus, les identifiants sont plus longs dans le vrai monde de Git qu'ici. Par exemple, l'identifiant du commit introduit au précédent niveau était `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Difficilement mémorisable ...",
              "",
              "Le côté positif est que Git est intelligent avec les identifiants. Vous avez seulement à spécifier les premiers caractères de l'identifiant jusqu'à ce qu'il reconnaisse exactement le commit. Ainsi je peux taper `fed2` au lieu de la longue chaîne ci-dessus."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Comme je l'ai dit, spécifier un commit par son identifiant n'est pas très pratique, c'est pourquoi Git a des références relatives. Elles sont géniales !",
              "",
              "Avec les références relatives vous pouvez commencer par vous placer à un endroit mémorisable (comme la branche `bugFix` ou `HEAD`) et travailler depuis ici.",
              "",
              "Les commits relatifs sont puissants, et on va en introduire deux simples ici :",
              "",
              "* Revenir d'un commit en arrière avec `^`",
              "* Revenir de plusieurs en arrière avec `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Regardons l'opérateur circonflexe (^) d'abord. Chaque fois que vous le faites suivre un nom de référence, vous êtes en train de demander à Git de trouver le parent du commit spécifié.",
              "",
              "Ainsi, `master^` est équivalent à \"le premier parent de `master`\".",
              "",
              "`master^^` est le grand-parent (ancêtre de seconde génération) de `master`",
              "",
              "Faisons un checkout du commit avant master."
            ],
            "afterMarkdowns": [
              "Boum ! Fini. Bien plus facile qu'écrire l'identifiant du commit."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vous pouvez aussi utiliser `HEAD` comme une référence relative. Utilisons cela plusieurs fois pour remonter l'arbre des commits."
            ],
            "afterMarkdowns": [
              "Facile ! Nous pouvons voyager dans le temps avec `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour compléter ce niveau, faites un checkout du commit parent de `bugFix`. Cela va détacher `HEAD`.",
              "",
              "Vous pouvez spécifier l'identifiant du commit si vous voulez, mais essayez plutôt d'utiliser les références relatives !"
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
              "## Relative Referenzen",
              "",
              "Es kann etwas mühselig werden, sich in einem Commit-Baum mittels Angabe der Hashes zu bewegen. Im echten Leben hat man normalerweise keine hübsche Visualisierung des Baumes neben seinem Terminal, also benutzt man `git log` um die Hashes zu sehen.",
              "",
              "Außerdem sind die echten Hashes sehr viel länger und nicht fortlaufend nummeriert. Beispielsweise heißt der Hash, mit dem ich den letzten Level committet habe, in echt `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Nicht gerade einprägsam ...",
              "",
              "Zum Glück ist Git intelligent wenn es um die Hashes geht. Du musst nur soviele Zeichen eines Hashes angeben, bis der Hash eindeutig ist. Ich kann also `fed2` eingeben anstatt die komplette Zeichenkette tippen zu müssen."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wie ich schon sagte: Commits über ihren Hash zu referenzieren ist nicht gerade der bequemste Weg. Weshalb es in Git relative Referenzen gibt. Welche super sind!",
              "",
              "Mit relativen Referenzen kann man bei einem leicht zu merkenden Bezeichner anfangen (zum Beispiel dem Branch-Namen `bugFix` oder der Referenz `HEAD`) und sich von dort vorarbeiten.",
              "",
              "Relative Referenzierung von Commits kann komplex sein, aber wir starten mit zwei einfachen Beispielen:",
              "",
              "* Geh einen Commit zurück mit `^`",
              "* Geh eine bestimmte Anzahl von Commits zurück mit `~<Anzahl>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns zuerst den Dach-Operator (`^`) an. Jedes mal wenn du ihn hinter einen Referenz-Namen setzt, sagst du Git damit, dass es zum Vorgänger des angegebenen Commits gehen soll.",
              "",
              "Das heißt `master^` ist gleichbedeutend mit \"direkter Vorgänger des Commits, auf den `master` zeigt\".",
              "",
              "`master^^` ist also der Vorgänger des Vorgängers von `master`.",
              "",
              "Wir checken jetzt mal den Commit vor `master` aus:"
            ],
            "afterMarkdowns": [
              "Bämm! Fertig. Einfacher, als den Commit-Hash zu tippen (oder zu kopieren)."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Du kannst auch `HEAD` als Basis für relative Referenzen benutzen. Lass uns das ein paar Mal verwenden, um uns im Commit-Baum nach oben zu bewegen."
            ],
            "afterMarkdowns": [
              "Das war einfach. Wir reisen mit `HEAD^` in der Zeit zurück."
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um dieses Level abzuschließen musst du den direkten Vorgänger von `bugFix` auschecken. Dadurch wirst du `HEAD` von `bugFix` abkoppeln.",
              "",
              "Du kannst natürlich den Hash angeben, aber versuch doch relative Referenzen zu benutzen!"
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
              "## Referencias relativas",
              "",
              "Moverse por git usando los hashes de los commits puede volverse un tanto tedioso. En el mundo real no vas a tener una visualización de commits tan linda en la terminal, así que vas a tener que usar `git log` para ver los hashes.",
              "",
              "Peor aún, los hashes en general son mucho más largos en el git real, también. Por ejemplo, el hash del commit que introduje en el nivel anterior es `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. No es algo particularmente fácil de nombrar...",
              "",
              "Lo copado es que git es bastante astuto con los hashes. Sólo requiere que especifiques una cantidad de caracteres suficientes para identificar unívocamente al commit. Entonces, yo podría simplemente tipear `fed2` en lugar de esa cadena larga de arriba."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Como ya dije, especificar los commits por su hash no es la manera más conveniente, y por eso git tiene referencias relativas. ¡Son geniales!",
              "",
              "Con las referencias relativas podés arrancar de algún lugar recordable (como la rama `bugFix`, o `HEAD`) y manejarte desde ahí.",
              "",
              "Los commits relativos son poderosos, pero ahora vamos a presentar sólo dos formas simples:",
              "",
              "* Moverse un commit atrás con `^`",
              "* Moverse una cantidad de commits atrás con `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos el operador ^ primero. Cada vez que le agregás eso al nombre de una referencia, le estás diciendo a git que use el padre del commit especificado.",
              "",
              "Entonces, decir `master^` es equivalente a \"el primer padre de `master`\".",
              "",
              "`master^^` es el _abuelo_ (segunda generación de ancestros) de `master`",
              "",
              "Veamos el commit que está antes de master acá"
            ],
            "afterMarkdowns": [
              "¡Boom! Ahí está. Mucho más simple que tipear el hash de ese commit"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "También podés referenciar a `HEAD` como una referencia relativa. Usémoslo un par de veces para movernos hacia atrás en nuestro árbol"
            ],
            "afterMarkdowns": [
              "¡Fácil! Podemos volver en el tiempo con `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, checkouteá el padre del commit de `bugFix`. Esto va a detachear a `HEAD`.",
              "",
              "Podés especificar el hash si querés, pero mejor ¡tratá de usar la referencia relativa!"
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
              "## Referências relativas",
              "",
              "Mover-se pela árvore do Git especificando o hash do commit pode se tornar um pouco entediante. No mundo real, você não terá à sua disposição essa bonita visualização da árvore ao lado do seu terminal, então você terá de usar o comando `git log` para ver os hashes.",
              "",
              "Além disso, os hashes são geralmente muito maiores no mundo real. Por exemplo, o hash do commit que introduziu o nível de exercícios anterior é `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Não é algo exatamente fácil de lembrar.",
              "",
              "O que salva é que o Git é inteligente com os hashes. Ele só exige que você especifique a quantidade de caracteres do hash suficiente para identificar unicamente o commit. Então eu posso digitar apenas `fed2` em vez da grande string acima."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Como eu disse, especificar commits pelo hash não é a sempre o mais conveniente, e é por isso que o Git suporta referências relativas. Elas são fantásticas!",
              "",
              "Com referências relativas, você pode começar a partir de um ponto fácil de lembrar (como o ramo `bugFix` ou o `HEAD`) e referenciar a partir dali.",
              "",
              "Commits relativos são poderosos, mas vamos introduzir apenas dois tipos simples aqui:",
              "",
              "* Mover para cima um commit por vez com `^`",
              "* Mover para cima um número de vezes com `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos dar uma olhada no operador circunflexo (^) primeiro. Cada vez que você adicioná-lo a um nome de referência, você está dizendo ao Git para encontrar o pai do commit especificado.",
              "",
              "Então, dizer `master^` é equivalente a \"o primeiro pai do `master`\".",
              "",
              "`master^^` é o avô (ancestral de segunda geração) do `master`",
              "",
              "Vamos fazer checkout do commit logo acima do master"
            ],
            "afterMarkdowns": [
              "Boom! Pronto. Muito mais fácil que digitar o hash do commit"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Você também pode usar o `HEAD` como parte de uma referência relativa. Vamos usar isso para nos mover para cima algumas vezes na árvore de commits"
            ],
            "afterMarkdowns": [
              "Fácil! Podemos viajar para trás no tempo com `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar esse nível, faça checkout do commit pai de `bugFix`. Isso soltará o `HEAD`.",
              "",
              "Você pode especificar o hash se quiser, mas tente usar referências relativas em vez disso!"
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
              "## Referencias relativas",
              "",
              "Moverse por a árbore de git usando os códigos hash dos commits pode volverse un pouco tedioso. Neste mundo real non vas ter unha visualización dos commits tan bonita no terminal, así que vas ter que usar `git log` para ver cada código hash.",
              "",
              "Inda peor, os códigos hash són xeralmente moito máis grandes no mundo real. Por exemplo, o hash do commit que introduxemos no nivel anterior é `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Non é algo sinxelo de lembrar.",
              "",
              "O bo é que git aínda afina cos hashes. El só precisa que expecifiques a cantidade mínima de caracteres suficientes para identificar unívocamente ó commit. Entón eu podo escribir `fed2` e non o hash completo."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Como xa dixemos, indicar os commits polo seu código hash non é a forma máis convinte, e é por eso que git ten referencias relativas. ¡Son a caña!",
              "",
              "Cas referencias relativas, podes comezar por un punto sinxelo de lembrar (como a rama `bugFix` ou o `HEAD`) e referenciar a partir de ahí.",
              "",
              "Os commits relativos son poderosos, pero agora imos presentar só dous formas sinxelas:",
              "",
              "* Moverse un commit por riba con `^`",
              "* Mover unha cantidade de commits atrás con `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Votémoslle unha ollada o operador (^) primeiro. Cada vez que o engadimos a unha referencia, estaslle dicindo a commit que queres o pai de esa referencia.",
              "",
              "Entón, dicir `master^` é equivalente a \"o primeiro pai do `master`\".",
              "",
              "`master^^` é o avó (ancestral de segunda xeración) do `master`",
              "",
              "Imos facer checkout do commit que está enriba de master"
            ],
            "afterMarkdowns": [
              "Boom! Ahí o tes. Moito máis rápido que por o hash do commit"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Tamén podes usar o `HEAD` como parte dunha referencia relativa. Ímolo utilizar para nos mover uns commits cara arriba na árbore."
            ],
            "afterMarkdowns": [
              "¡Chupado! Podemos viaxar cara atrás no tempo con `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, fai checkout do commit pai de `bugFix`. Iso soltará o `HEAD`.",
              "",
              "¡Podes indicar o hash que queiras, pero intenta empregar as referencias relativas, é moito mellor!"
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
              "## 相对引用",
              "",
              "通过指定提交记录哈希值的方式在 Git 中移动不太方便。在实际应用时，并没有像本程序中这么漂亮的可视化提交树供你参考，所以你就不得不用 `git log` 来查查看提交记录的哈希值。",
              "",
              "并且哈希值在真实的 Git 世界中也会更长（译者注：基于 SHA-1，共 40 位）。例如前一关的介绍中的提交记录的哈希值可能是 `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`。舌头都快打结了吧...",
              "",
              "比较令人欣慰的是，Git 对哈希的处理很智能。你只需要提供能够唯一标识提交记录的前几个字符即可。因此我可以仅输入`fed2` 而不是上面的一长串字符。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "正如我前面所说，通过哈希值指定提交记录很不方便，所以 Git 引入了相对引用。这个就很厉害了!",
              "",
              "使用相对引用的话，你就可以从一个易于记忆的地方（比如 `bugFix` 分支或 `HEAD`）开始计算。",
              "",
              "相对引用非常给力，这里我介绍两个简单的用法：",
              "",
              "* 使用 `^` 向上移动 1 个提交记录",
              "* 使用 `~<num>` 向上移动多个提交记录，如 `~3`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "首先看看操作符 (^)。把这个符号加在引用名称的后面，表示让 Git 寻找指定提交记录的父提交。",
              "",
              "所以 `master^` 相当于“`master` 的父节点”。",
              "",
              "`master^^` 是 `master` 的第二个父节点",
              "",
              "现在咱们切换到 master 的父节点"
            ],
            "afterMarkdowns": [
              "搞定。这种方式是不是比输入哈希值方便多了？！"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "你也可以将 `HEAD` 作为相对引用的参照。下面咱们就用 `HEAD` 在提交树中向上移动几次。"
            ],
            "afterMarkdowns": [
              "很简单吧？！我们可以一直使用 `HEAD^` 向上移动。"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成此关，切换到 `bugFix` 的父节点。这会进入分离 `HEAD` 状态。",
              "",
              "如果你愿意的话，使用哈希值也可以过关，但请尽量使用相对引用！"
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
              "## 相對引用",
              "",
              "如果要在 git 中移動，透過指定 commit 的 hash 值的方式會變得比較麻煩。在實際例子中，你的終端機上面不會出現漂亮且具備視覺效果的 commit tree，所以你不得不用 `git log` 來查詢 hash 值。",
              "",
              "另外，hash 值的長度在真實的 git 環境中很長。舉個例子，前一個關卡的介紹中的 commit 的 hash 值是 `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`。舌頭不要打結了...",
              "",
              "幸運的是，git 對於處理 hash 值很有一套。你只需要提供能夠唯一辨識出該 commit 的前幾個字元就可以了。所以，我可以只輸入 `fed2` 而不是上面的一長串字元。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "我說過，透過 hash 值來指定 commit 不是很方便，所以 git 加入了相對引用。這個就很厲害了!",
              "",
              "使用相對引用，你可以從一個易於記憶的地方（比如說 branch 名稱 `bugFix` 或 `HEAD`）開始工作。",
              "",
              "相對引用非常好用，這裡我介紹兩個簡單的用法：",
              "",
              "* 使用 `^` 向上移動一個 commit",
              "* 使用 `~<num>` 向上移動多個 commit"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "首先看看插入（^）這一個符號。把這個符號接在某一個 reference 後面，就表示你告訴 git 去找到該 reference 所指向的 commit 的 parent commit。",
              "",
              "所以 `master^` 相當於 \"`master` 的 parent commit\"。",
              "",
              " `master^^` 是 `master` 的 grandparent commit（往前推兩代）",
              "",
              "切換到 master的 parent commit"
            ],
            "afterMarkdowns": [
              "看吧！完成了。這種方式比輸入代表 commit 的 hash 值簡單多了！"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "你也可以把 `HEAD` 當作相對引用。以下指令使用 `HEAD` 在 commit tree 中向上移動數次。"
            ],
            "afterMarkdowns": [
              "簡單吧！我們可以一直使用 `HEAD^` 向上移動。"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這一關，切換到 `bugFix` 的 parent commit。這會分離出 `HEAD`。",
              "",
              "如果你願意的話，透過直接指定 hash 值的方式也可以過關，但是還是試試看相對引用吧！"
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
              "## 相対リファレンス",
              "",
              "コミットのハッシュを利用してgitの中で移動するのも少し疲れる時もあります。現実の世界では、このチュートリアルのようにターミナルの隣に見やすいツリーのビジュアライズがないので、ハッシュを見るには`git log`を使う必要があります。",
              "",
              "その上、実際のハッシュはこちらで見たものよりずっと長いです。例えば、先ほどのレベルの紹介のコミットハッシュは`fed2da64c0efc5293610bdd892f82a58e8cbc5d8`です。少し覚えにくいですね...",
              "",
              "そのため、gitでは手短くコミットを指定する方法があります。ユニークな存在だと確認できるだけのハッシュの字数を入力すれば良いです -- 上記の長い文字列の代わりに`fed2`を入力するだけで済みます。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "先ほど言いましたように、ハッシュでコミットを指定するのがめんどくさくなる時もあるので、gitには相対リファレンスという素晴らしい機能があります。",
              "",
              "相対リファレンスを使うことで、覚えやすい位置（例えば`bugFix`ブランチや`HEAD`）から始め、そのところから相対的な位置を指定できます。",
              "",
              "相対コミットは強力ですが、ここでは二つをご紹介します:",
              "",
              "* 一つずつ上へ移動させる`^`（カレット）",
              "* 複数回上へ移動させる `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "まずはカレット(^)から始めましょう。リファレンス名にカレットを追加すると、指定コミットの親コミットを見つけるようにとgitに命令を出しています。",
              "",
              "なので `master^`と記述すれば、\"`master`の一個上の親\"、という意味になります。",
              "",
              "そして`master^^`とはその親の一つの上のコミット(２代前の親)を指します。",
              "",
              "masterの上のコミットをここで見てみましょう"
            ],
            "afterMarkdowns": [
              "やりました！コミットハッシュを書くよりずっと簡単ですね。"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`HEAD`を相対リファレンスとして参照することもできます。 ここで数回そのコマンドを使い、コミットツリーの中で上へと移動しましょう。"
            ],
            "afterMarkdowns": [
              "簡単ですね!`HEAD^`で時間を巻き戻せます。"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルをクリアするには、`bugFix`の親コミットをチェックアウトしてください。その操作により`HEAD`が分離されます。",
              "",
              "ハッシュを使用してもいいですが、その代わりに相対リファレンスを試してみましょう！"
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
              "## Относительные ссылки",
              "",
              "Передвигаться по дереву Git при помощи указания хешей коммитов немного неудобно. В реальной ситуации у вас вряд ли будет красивая визуализация дерева в терминале, так что придётся каждый раз использовать `git log`, чтобы найти хеш нужного коммита",
              "",
              "Более того, хеши в реальном репозитории Git намного более длинные. Например, хеш для коммита, который приведён в предыдущем уровне - `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Не очень просто для произношения =)",
              "",
              "Хорошая новость в том, что Git достаточно умён в работе с хешами. Ему нужны лишь первые несколько символов для того, чтобы идентифицировать конкретный коммит. Так что можно написать просто `fed2` вместо колбасы выше."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Как мы уже говорили, указание на коммит при помощи его хеша - не самый удобный способ, поэтому Git поддерживает относительные ссылки и они прекрасны!",
              "",
              "С относительными ссылками можно начать с какого-либо удобного места (например, с ветки `bugFix` или от HEAD) и двигаться от него",
              "",
              "Относительные ссылки - мощный инструмент, но мы покажем два простых способа использования:",
              "",
              "* Перемещение на один коммит назад `^`",
              "* Перемещение на <num> коммитов назад `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Для начала рассмотрим оператор каретки (^). Когда мы добавляем его к имени ссылки, Git воспринимает это как указание найти родителя указанного коммита.",
              "",
              "Так что `master^` означает \"первый предок ветки `master`\".",
              "",
              "`master^^` означает предок предка ветки `master`",
              "",
              "Получим предка ветки `master` на практике"
            ],
            "afterMarkdowns": [
              "Опачки! Готово. Сильно проще, чем поиск и указание хеша."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Можно также использовать `HEAD` как относительную ссылку. Попробуем пройти несколько раз назад по дереву коммитов"
            ],
            "afterMarkdowns": [
              "Изи! Мы можем путешествовать во времени при помощи `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы пройти этот уровень, переместись на первого родителя ветки `bugFix`. Это отделит `HEAD` от ветки.",
              "",
              "Конечно, можно указать хеш, но надо попробовать использовать относительные ссылки!"
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
              "## 상대 참조",
              "",
              "Git에서 여기저기 이동할 때 커밋의 해시를 사용하는 방법은 조금 귀찮습니다. 실제로 Git을 사용할 때는 터미널화면 옆에 예쁘장하게 커밋트리가 보이진 않으니까요. 매번 해시를 확인하려고 `git log` 명령어를 치고 있을 겁니다.",
              "",
              "나아가서, 실제 Git에서는 해시들이 훨씬 더 깁니다. 예를 들어  이전 레벨에 소개했던 커밋의 해시는 `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`입니다. 쓰기 쉬워 보이진 않네요....",
              "",
              "다행히도, Git은 똑똑합니다. 해시가 커밋의 고유한 값임을 보여줄 수 있을 만큼만 명시해주면 됩니다. 위의 긴 문자열 대신 `fed2`만 입력해도 되는 겁니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "말했듯이, 커밋들을 해시로 구분하고 사용하는것이 아주 편하다고 볼 수는 없습니다. Git의 상대 참조(Relative Ref)가 여기서 등장합니다. 굉장한 기능입니다.",
              "",
              "상대 참조로 우리가 기억할 만한 지점(브랜치 `bugFix`라던가 `HEAD`라던가)에서 출발해서 이동하여 다른 지점에 도달해 작업을 할 수 있습니다.",
              "",
              "상대 커밋은 강력한 기능인데, 여기서 두가지 간단한 방법을 소개하겠습니다.",
              "",
              "* 한번에 한 커밋 위로 움직이는 `^`",
              "* 한번에 여러 커밋 위로 올라가는 `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "먼저 캐럿 (^) 연산자 부터 알아보겠습니다. 참조 이름에 하나씩 추가할 때마다, 명시한 커밋의 부모를 찾게 됩니다.",
              "",
              "`master^`는 \"`master`의 부모\"와 같은 의미 입니다.",
              "",
              "`master^^` 는 \"`master`의 조부모(부모의 부모)\"를 의미합니다",
              "",
              "master 위에 있는 부모를 체크아웃 해 봅시다."
            ],
            "afterMarkdowns": [
              "Boom! 됬습니다. 커밋의 해시를 입력하는 것보다 훨씬 쉬운 방법입니다."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "또한 참조인 `HEAD`도 상대참조를 위해 사용할 수 있습니다. 커밋트리 위쪽으로 움직이기위해 여러번 사용 해 봅시다."
            ],
            "afterMarkdowns": [
              "쉽군요! 이제 우린 `HEAD^`를 통해 시간을 거슬러 올라갈 수 있습니다."
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이 레벨을 완료하기 위해서는, `bugFix`의 부모 커밋을 체크아웃 하십시오. 이렇게 하면 `HEAD`가 분리 될 것입니다.",
              "",
              "해시를 이용해서도 할 수 있지만, 상대 참조를 활용하는 것을 연습해 보세요!"
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
              "## Відносні посилання",
              "",
              "Пересуватися по гіту використовуючи хеш комітів може бути трохи напряжно. В справжньому гіті в тебе не буде візуалізації дерева комітів в терміналі, тому доведеться використовувати `git log` щоб подивится хеші комітів.",
              "",
              "Більше того, хеші як правило набагато довші в справжньому гіті. Типовий хеш виглядає як `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Без мнемонік не обійтися)...",
              "",
              "З іншого боку git дуже розумно працює з хешами. Він просить вказати рівно стільки літер, скільки потрібно щоб відрізнити один коміт від іншого. Отже, замість довгого хеша зверху можна просто набрати `fed2`."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Як було сказано, вказувати коміти за хешем не найзручніша річ, через це git підтримує відносні посилання. Вони реально круті!",
              "",
              "З відносними посиланнями ти можеш почати з якогось зручного місця  (наприклад гілки `bugFix` чи посилання `HEAD`) й вказати потрібний коміт відносно цього посилання",
              "",
              "Відносні коміти є дуже потужним інструментом, але ми почнемо з двох простих прикладів:",
              "",
              "* Йдемо вверх на один коміт за допомогою `^`",
              "* Йдемо вверх на кілька комітів за допомогою `~<число>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Розберемось спочатку з оператором каретки (^). Кожна каретка додана до посилання (напр. до імені коміту) вказує git що потрібно знайти батька посилання до якого застосована каретка.",
              "",
              "Тож `master^` тотожнє до \"перший предок посилання `master`\".",
              "",
              "`master^^` це дідусь (предок другого покоління) посилання `master`",
              "",
              "Давайте перейдемо на коміт трохи вище від master:"
            ],
            "afterMarkdowns": [
              "Бум! Готово. Трохи простіше ніж набирати хеш коміту"
            ],
            "command": "git checkout master^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ти також можеш використовувати `HEAD` з відносними посиланнями. Давай використаємо це щоб трошки піднятися по дереву."
            ],
            "afterMarkdowns": [
              "Просто! Ми можемо переміщуватись назад в часі з `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти цей рівень перемістись на першого предка гілки `bugFix`. Ти опинишся в стані `detach HEAD`.",
              "",
              "Ти, звичайно, можеш вказати хеш, але натомість спробуй користуватися відносними посиланнями!"
            ]
          }
        }
      ]
    }
  }
};
