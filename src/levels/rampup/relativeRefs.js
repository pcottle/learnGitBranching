exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"C3\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git checkout bugFix^",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Relative Refs (^)",
    "fr_FR": "Références relatives (^)",
    "ja": "相対リファレンス (^)",
    "zh_CN": "相对引用（^）",
    "zh_TW": "相對引用（^）",
    "es_AR": "Referencias relativas (^)",
    "es_MX": "Referencias relativas (^)",
    "es_ES": "Referencias relativas (^)",
    "pt_BR": "Referências relativas (^)",
    "gl": "Referencias relativas (^)",
    "de_DE": "Relative Referenzen (^)",
    "ru_RU": "Относительные ссылки (^)",
    "ko": "상대 참조 (^) (Relative Refs)",
    "uk": "Відносні посилання",
    "vi": "Tham chiếu tương đối (^)",
    "sl_SI": "Relativne Reference (^)",
    "it_IT": "Riferimenti relativi (^)",
    "pl": "Referencje względne (^)",
  },
  "hint": {
    "en_US": "Remember the Caret (^) operator!",
    "fr_FR": "Rappelez-vous de l'opérateur circonflexe (^)",
    "ja": "相対リファレンス(^)を思い出して！",
    "de_DE": "Denk an den Dach-Operator (^)!",
    "es_AR": "¡No te olvides del operador ^!",
    "es_ES": "¡No te olvides del operador ^!",
    "pt_BR": "Não se esqueça do operador circunflexo (^)",
    "gl": "Non se esqueza do operador circunflexo (^)",
    "zh_CN": "记住操作符（^）！",
    "zh_TW": "不要忘記插入（^）符號！",
    "ru_RU": "Не забудь оператор `^`",
    "ko": "(^)연산자를 기억하세요!",
    "uk": "Не забудь оператор `^`",
    "vi": "Đừng quên dấu mũ (^)!",
    "sl_SI": "Spomni se na (^) operator!",
    "it_IT": "Ricorda l'operatore Caret(^)... l'accento circonflesso!",
    "pl": "Pamiętaj o operatorze wstawienia (^)!",
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
              "So saying `main^` is equivalent to \"the first parent of `main`\".",
              "",
              "`main^^` is the grandparent (second-generation ancestor) of `main`",
              "",
              "Let's check out the commit above main here."
            ],
            "afterMarkdowns": [
              "Boom! Done. Way easier than typing the commit hash."
            ],
            "command": "git checkout main^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "You can also reference `HEAD` as a relative ref. Let's use that a couple of times to move upwards in the commit tree."
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
              "Se déplacer dans Git en spécifiant des identifiants de commits (hashes) peut être un peu agaçant. Dans le monde réel vous n'aurez pas une vue sur un joli arbre des commits à côté de votre terminal, et vous devrez donc utiliser `git log` pour connaître les identifiants.",
              "",
              "De plus, les identifiants sont plus longs dans le vrai monde de Git qu'ici. Par exemple, l'identifiant du commit introduit au précédent niveau était `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Difficilement mémorisable...",
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
              "Avec les références relatives vous pouvez commencer par vous placer à un endroit mémorisable (comme la branche `bugFix` ou `HEAD`) et travailler depuis cet endroit.",
              "",
              "Les commits relatifs sont puissants, et on va en présenter deux simples ici :",
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
              "Ainsi, `main^` est équivalent à \"le premier parent de `main`\".",
              "",
              "`main^^` est le grand-parent (ancêtre de seconde génération) de `main`",
              "",
              "Faisons un checkout du commit avant main."
            ],
            "afterMarkdowns": [
              "Boum ! Fini. Bien plus facile que d'écrire l'identifiant du commit."
            ],
            "command": "git checkout main^",
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
              "Das heißt `main^` ist gleichbedeutend mit \"direkter Vorgänger des Commits, auf den `main` zeigt\".",
              "",
              "`main^^` ist also der Vorgänger des Vorgängers von `main`.",
              "",
              "Wir checken jetzt mal den Commit vor `main` aus:"
            ],
            "afterMarkdowns": [
              "Bämm! Fertig. Einfacher, als den Commit-Hash zu tippen (oder zu kopieren)."
            ],
            "command": "git checkout main^",
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
              "Entonces, decir `main^` es equivalente a \"el primer padre de `main`\".",
              "",
              "`main^^` es el _abuelo_ (segunda generación de ancestros) de `main`",
              "",
              "Veamos el commit que está antes de main acá."
            ],
            "afterMarkdowns": [
              "¡Boom! Ahí está. Mucho más simple que tipear el hash de ese commit."
            ],
            "command": "git checkout main^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "También podés referenciar a `HEAD` como una referencia relativa. Usémoslo un par de veces para movernos hacia atrás en nuestro árbol."
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
    "es_ES": {
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
              "Lo interesante es que git es bastante astuto con los hashes. Sólo requiere que especifiques una cantidad de caracteres suficientes para identificar unívocamente al commit. Entonces, yo podría simplemente tipear `fed2` en lugar de esa cadena larga de arriba."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Como ya dije, especificar los commits por su hash no es la manera más conveniente, y por eso git tiene referencias relativas. ¡Son geniales!",
              "",
              "Con las referencias relativas puedes arrancar de algún lugar recordable (como la rama `bugFix`, o `HEAD`) y trabajar desde ahí.",
              "",
              "Los commits relativos son poderosos, pero ahora vamos a presentar sólo dos formas simples:",
              "",
              "* Moverse un commit hacia atrás con `^`",
              "* Moverse una cantidad de commits hacia atrás con `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos el operador ^ primero. Cada vez que le agregas eso al nombre de una referencia, le estás diciendo a git que use el padre del commit especificado.",
              "",
              "Entonces, decir `main^` es equivalente a \"el primer padre de `main`\".",
              "",
              "`main^^` es el _abuelo_ (segunda generación de ancestros) de `main`",
              "",
              "Veamos el commit que está antes de main aquí."
            ],
            "afterMarkdowns": [
              "¡Zas! Ahí está. Mucho más simple que escribir el hash de ese commit."
            ],
            "command": "git checkout main^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "También puedes referenciar a `HEAD` como una referencia relativa. Usémoslo un par de veces para movernos hacia atrás en nuestro árbol."
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
              "Para completar este nivel, haz checkout sobre el padre del commit de `bugFix`. Esto va a detachear a `HEAD`.",
              "",
              "Puedes especificar el hash si quieres, pero mejor ¡trata de usar la referencia relativa!"
            ]
          }
        }
      ]
    },
    "es_MX": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Referencias relativas",
              "",
              "Moverse por ahí en Git usando los hashes de los commits puede volverse un tanto tedioso. En el mundo real no vas a tener una visualización de commits tan linda en la terminal, así que vas a tener que usar `git log` para ver los hashes.",
              "",
              "Peor aún, los hashes en general son mucho más largos en el git real, también. Por ejemplo, el hash del commit que introduje en el nivel anterior es `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. No es algo particularmente fácil de nombrar...",
              "",
              "Lo interesante es que Git es bastante astuto con los hashes. Sólo requiere que especifiques una cantidad de caracteres suficientes para identificar unívocamente al commit. Entonces, yo podría simplemente tipear `fed2` en lugar de esa larga cadena de arriba."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Como ya dije, especificar los commits por su hash no es la manera más conveniente y por eso Git tiene referencias relativas. ¡Son geniales!",
              "",
              "Con las referencias relativas puedes arrancar de algún lugar memoralbe (como la rama `bugFix`, o `HEAD`) y trabajar desde ahí.",
              "",
              "Los commits relativos son poderosos, pero ahora vamos a presentar sólo dos formas simples:",
              "",
              "* Moverse un commit hacia atrás con `^`",
              "* Moverse una cantidad de commits hacia atrás con `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos el operador ^ primero. Cada vez que le agregas eso al nombre de una referencia, le estás diciendo a git que use el padre del commit especificado.",
              "",
              "Entonces, `main^` quiere decir que es equivalente a \"el primer padre de `main`\".",
              "",
              "`main^^` es el _abuelo_ (segunda generación de ancestros) de `main`",
              "",
              "Veamos el commit que está antes de main aquí."
            ],
            "afterMarkdowns": [
              "Vientos! Ahí está. Mucho más simple que escribir el hash de ese commit."
            ],
            "command": "git checkout main^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "También puedes referenciar a `HEAD` como una referencia relativa. Usémoslo un par de veces para movernos hacia atrás en nuestro árbol."
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
              "Para completar este nivel, haz checkout sobre el padre del commit de `bugFix`. Esto va a detachear a `HEAD`.",
              "",
              "Puedes especificar el hash si quieres, pero mejor ¡trata de usar la referencia relativa!"
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
              "Então, dizer `main^` é equivalente a \"o primeiro pai do `main`\".",
              "",
              "`main^^` é o avô (ancestral de segunda geração) do `main`",
              "",
              "Vamos fazer checkout do commit logo acima do main."
            ],
            "afterMarkdowns": [
              "Boom! Pronto. Muito mais fácil que digitar o hash do commit."
            ],
            "command": "git checkout main^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Você também pode usar o `HEAD` como parte de uma referência relativa. Vamos usar isso para nos mover para cima algumas vezes na árvore de commits."
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
              "Entón, dicir `main^` é equivalente a \"o primeiro pai do `main`\".",
              "",
              "`main^^` é o avó (ancestral de segunda xeración) do `main`",
              "",
              "Imos facer checkout do commit que está enriba de main."
            ],
            "afterMarkdowns": [
              "Boom! Ahí o tes. Moito máis rápido que por o hash do commit."
            ],
            "command": "git checkout main^",
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
              "首先看看操作符 (^)。把这个符号加在引用名称的后面，表示让 Git 寻找指定提交记录的 parent 提交。",
              "",
              "所以 `main^` 相当于“`main` 的 parent 节点”。",
              "",
              "`main^^` 是 `main` 的第二个 parent 节点",
              "",
              "现在咱们切换到 main 的 parent 节点"
            ],
            "afterMarkdowns": [
              "搞定。这种方式是不是比输入哈希值方便多了？！"
            ],
            "command": "git checkout main^",
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
              "要完成此关，切换到 `bugFix` 的 parent 节点。这会进入分离 `HEAD` 状态。",
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
              "所以 `main^` 相當於 \"`main` 的 parent commit\"。",
              "",
              " `main^^` 是 `main` 的 grandparent commit（往前推兩代）",
              "",
              "切換到 main的 parent commit"
            ],
            "afterMarkdowns": [
              "看吧！完成了。這種方式比輸入代表 commit 的 hash 值簡單多了！"
            ],
            "command": "git checkout main^",
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
              "なので `main^`と記述すれば、\"`main`の一個上の親\"、という意味になります。",
              "",
              "そして`main^^`とはその親の一つの上のコミット(２代前の親)を指します。",
              "",
              "mainの上のコミットをここで見てみましょう"
            ],
            "afterMarkdowns": [
              "やりました！コミットハッシュを書くよりずっと簡単ですね。"
            ],
            "command": "git checkout main^",
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
              "* Перемещение на несколько коммитов назад `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Для начала рассмотрим оператор каретки (^). Когда мы добавляем его к имени ссылки, Git воспринимает это как указание найти родителя указанного коммита.",
              "",
              "Так что `main^` означает \"первый родитель ветки `main`\".",
              "",
              "`main^^` означает прародитель (родитель родителя) `main`",
              "",
              "Давайте переключимся на коммит Выше `main`"
            ],
            "afterMarkdowns": [
              "Опачки! Готово. Сильно проще, чем поиск и указание хеша."
            ],
            "command": "git checkout main^",
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
              "상대 참조로 우리가 기억할 만한 지점(브랜치 `bugFix`라든가 `HEAD`라든가)에서 출발해서 이동하여 다른 지점에 도달해 작업을 할 수 있습니다.",
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
              "`main^`는 \"`main`의 부모\"와 같은 의미 입니다.",
              "",
              "`main^^` 는 \"`main`의 조부모(부모의 부모)\"를 의미합니다",
              "",
              "main 위에 있는 부모를 체크아웃 해 봅시다."
            ],
            "afterMarkdowns": [
              "Boom! 됐습니다. 커밋의 해시를 입력하는 것보다 훨씬 쉬운 방법입니다."
            ],
            "command": "git checkout main^",
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
              "Тож `main^` тотожнє до \"перший предок посилання `main`\".",
              "",
              "`main^^` це дідусь (предок другого покоління) посилання `main`",
              "",
              "Давайте перейдемо на коміт трохи вище від main:"
            ],
            "afterMarkdowns": [
              "Бум! Готово. Трохи простіше ніж набирати хеш коміту"
            ],
            "command": "git checkout main^",
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
    },
    "vi": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Tham chiếu tương đối",
              "",
              "Dịch chuyển trong Git bằng cách chỉ định mã băm (hash) của commit cỏ vẻ hơi buồn tẻ. Trong đời thực thì sẽ không có mô tả Git trực quan ngay bên cạnh terminal của bạn đâu, nên nếu bạn muốn nhìn mã băm của commit thì phải dùng `git log` thôi.",
              "",
              "Hơn nữa, mã băm thực tế thường dài hơn rất nhiều. Ví dụ, mã băm của commit được giới thiệu trong phần trước là `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Đọc mà xoắn hết cả lưỡi...",
              "",
              "Được cái là Git cũng khá thông minh về mã băm. Chỉ cần cung cấp kí tự mã băm đủ để phân biệt với các commit khác. Cho nên tôi có thể đơn giản chỉ cần gõ `fed2` thay vì cái chuỗi dài ngoằng phía trên."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Như tôi đã nói, xác định commit bằng mã băm chẳng hề thuận tiện tẹo nào, đó là tại sao Git có những `tham chiếu tương đối`. Chúng rất tuyệt vời!",
              "",
              "Với tham chiếu tương đối, bạn có thể bắt đầu từ những nơi có thể ghi nhớ được (như là nhánh `bugFix` hoặc `HEAD`) và làm việc trên đó.",
              "",
              "Những commit tương đối (relative commits) rất mạnh mẽ, nhưng chúng tôi sẽ chỉ giới thiệu 2 loại đơn giản sau:",
              "",
              "* Dịch chuyển lên 1 commit mỗi lần với `^`",
              "* Dịch chuyển lên nhiều commit mỗi lần với `~<số>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Xem thử cái dấu mũ (^) trước nào. Mỗi lần bạn nối nó với một cái tên tham chiếu, bạn đang ra lệnh cho Git tìm kiếm cha của một commit cụ thể.",
              "",
              "Cho nên `main^` nghĩa là \"cha đầu tiên của `main`\".",
              "",
              "`main^^` là ông nội (tổ tiên thế hệ 2) của `main`",
              "",
              "Thử nhảy sang commit trước main nào"
            ],
            "afterMarkdowns": [
              "BÙUM! Đã xong. Đơn giản hơn gõ mã băm nhiều."
            ],
            "command": "git checkout main^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Bạn cũng có thể dùng `HEAD` như là tham chiếu tương đối. Thử dùng nó để leo commit vài lần nào."
            ],
            "afterMarkdowns": [
              "Game là dễ! Du hành ngược thời gian với `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Để hoàn thành cấp độ này, nhảy sang cha của `bugFix`. Tức là tháo `HEAD`.",
              "",
              "Nếu muốn thì bạn có thể dùng mã băm, nhưng thế thì còn gì vui nữa dùng tham chiếu tương đối đi!"
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
              "## Relativne Reference",
              "",
              "Premikanje po Gitu z določanjem hashev commitov je lahko včasih nerodno. V praksi ne boš imel na voljo lepe vizualizacije drevesa zraven ukaznega terminala, zato boš moral uporabljati `git log`, da boš videl hashe.",
              "",
              "Hashi so ponavadi v praksi tudi veliko daljši. Naprimer, hash commita, predstavljenega v prejšnji stopnji, je `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Ni ravno preprosto za izgovoriti ...",
              "",
              "Pozitivna stran je, da je Git pameten glede hashev. Zahteva, da napišeš le toliko znakov hasha, da lahko prepozna unikaten commit. Tako lahko napišem `fed2`, namesto dolge verzije zgoraj."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Kot sem rekel, izbiranje commitov po njihovih hashih ni ravno najpriročnejša stvar na svetu, zato ima Git relativne reference. In te so super!",
              "",
              "Z relativni referencami lahko izhajaš iz nekje (npr. branch `bugFix` ali `HEAD`) in delaš od tam.",
              "",
              "Relativni commiti so močni in obsegajoči, ampak tu bomo predstavili dva preprosta:",
              "",
              "* Premikanje navzgor en commit naenkrat z `^`",
              "* Premikanje navzgor n-krat z `~<n>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Poglejmo najprej operator `^`. Vsakič, ko pripneš to imenu reference, poveš Gitu, naj najde starša tega commita.",
              "",
              "Torej `main^` je isto kot \"prvi starš brancha `main`\".",
              "",
              "`main^^` je stari starš (prednik druge generacije) `main`.",
              "",
              "Checkoutajmo sedaj commit nad masterjem."
            ],
            "afterMarkdowns": [
              "Boom! Narejeno. Veliko enostavneje kot tipkanje hasha commita."
            ],
            "command": "git checkout main^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Prav tako se lahko sklicuješ na `HEAD` kot relativno referenco. Uporabimo to nekajkrat, da se pomakenmo višje po drevesu commitov."
            ],
            "afterMarkdowns": [
              "Enostavno! Lahko potujemo nazaj v čas z `HEAD^`."
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Za dokončanje te stopnje, checkoutaj starša commita `bugFix`. To bo ločilo `HEAD`.",
              "",
              "Hash lahko določiš, če želiš, ampak probaj raje z relativnimi referencami!"
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
              "## Referencje względne",
              "",
              "Poruszanie się w Gicie poprzez określanie haszy commitów może być trochę nudne. W prawdziwym świecie nie zobaczysz ładnej wizualizacji drzewa commitów obok swojego terminala (chyba, że używasz Forka lub TortoiseGita). Musisz użyć `git log`, aby zobaczyć hasze.",
              "",
              "Co więcej, hasze są zazwyczaj o wiele dłuższe w prawdziwym Gicie. Na przykład hash commita, który był na początku poprzedniego poziomu, to `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Spróbuj to przeczytać!",
              "",
              "Plusem jest to, że Git sprytnie radzi sobie z haszami. Wymaga jedynie podania tylu znaków hasza, ile potrzebuje, aby jednoznacznie zidentyfikować konkretny commit. Dlatego mogę wpisać jedynie `fed2` zamiast długiego łańcucha powyżej."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Jak już powiedzieliśmy, wybieranie commitów, używając ich hasza, nie jest najprzyjemniejszą rzeczą w życiu, dlatego Git ma referencje względne. Są niesamowite!",
              "",
              "Korzystając z referencji względnych, możesz zacząć od miejsca, które zapamiętasz (jak np. gałąź `bugFix` lub `HEAD`), i pracować stamtąd.",
              "",
              "Relatywne commity są potężne, ale pokażemy tu tylko dwie proste sytuacje:",
              "",
              "* Poruszanie się wstecz o jeden commit za pomocą `^`",
              "* Poruszanie się wstecz o ileś commitów z `~<num>`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Spójrzmy najpierw na operator karety / daszek (^). Za każdym razem, gdy dodajesz go do referencji względnej, mówisz Gitowi, aby znalazł rodzica określonego commita.",
              "",
              "Wpisując zatem `main^`, mamy na myśli \"pierwszego rodzica z gałęzi `main`\".",
              "",
              "`main^^` to dziadek (przodek drugiego stopnia) gałęzi `main`.",
              "",
              "Zcheckoutujmy commit powyżej `main`:"
            ],
            "afterMarkdowns": [
              "Tadam! Gotowe! O wiele łatwiej niż wpisując hasz commita."
            ],
            "command": "git checkout main^",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Możesz również odwołać się do `HEAD` jako referencji względnej. Użyjmy tego kilka razy, aby przesunąć się w górę drzewa commitów."
            ],
            "afterMarkdowns": [
              "Łatwizna! Możemy cofać się w czasie, używając `HEAD^`"
            ],
            "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            "beforeCommand": "git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Aby ukończyć ten poziom, checkoutuj commita-rodzica z gałęzi `bugFix`. To spowoduje odczepienie `HEADa`.",
              "",
              "Możesz wybrać commita po haszu, jeżeli chcesz, ale spróbuj wykorzystać nowe umiejętności i użyć referencji względnej!"
            ]
          }
        }
      ]
    },
    "it_IT": {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Riferimenti relativi",
              "",
              "Spostarsi in Git specificando l'hash dei commit può essere una scocciatura. Nella vita vera non avrai un bell'albero con tutti i commit sullo schermo, dovrai usare `git log` per vedere gli hash.",
              "",
              "Inoltre, gli hash sono solitamente molto più lunghi. Per esempio, l'hash del commit nel livello precedente è `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Non così semplice da ricordare...",
              "",
              "La nota positiva è che Git è furbo con gli hash. Richiede un numero di caratteri dell'hash tali da poter identificare in modo univoco il commit. Posso scrivere `fed2` invece dell'hash completo.",
            ],
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Come detto prima, specificare un commit tramite l'hash non è assolutamente il modo migliore, ragion per cui Git ha i riferimenti relativi. Sono stupendi!",
              "",
              "Tramite i riferimenti relativi, puoi partire da un punto facile da ricordare (per esempio dal ramo `bugFix` o `HEAD`) e procedere da lì.",
              "",
              "Questi riferimenti sono strumenti potenti, introduciamo i più semplici:",
              "",
              "* Risalire di un commit alla volta con `^`",
              "* Risalire di tot commit alla volta con `~<num>`",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Diamo un occhiata all'operatore (^) chiamato Caret o accento circonflesso. Ogni volta che lo aggiungi a un riferimento, stai dicendo a Git di cercare il genitore del commit specificato.",
              "",
              'Quindi, dire `main^` è equivalente a dire "il primo genitore di `main`".',
              "",
              "`main^^` è il nonno (antenato di seconda generazione) di `main`",
              "",
              "Selezioniamo il commit sopra main.",
            ],
            afterMarkdowns: [
              "Colpito! Fatto. Mille volte meglio che scrivere l'hash.",
            ],
            command: "git checkout main^",
            beforeCommand: "git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Puoi considerare `HEAD` come un riferimento relativo. Usiamolo un paio di volte per risalire l'albero dei commit.",
            ],
            afterMarkdowns: [
              "Facile! Possiamo viaggiare in dietro nel tempo con `HEAD^`",
            ],
            command:
              "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
            beforeCommand: "git commit; git commit",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Per completare questo livello, seleziona il commit padre di `bugFix`. Questo provocherà una detached `HEAD`.",
              "",
              "Puoi usare l'hash se vuoi, ma prova a usare i riferimenti relativi!",
            ],
          },
        },
      ],
    },

  }
};
