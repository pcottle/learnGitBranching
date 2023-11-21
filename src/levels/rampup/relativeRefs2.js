exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C6\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C0\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"C1\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch -f main C6;git checkout HEAD~1;git branch -f bugFix HEAD~1",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C4\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C5\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"C2\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "You'll need to use at least one direct reference (hash) to complete this level",
    "fr_FR": "Vous aurez besoin d'utiliser au moins une référence directe (hash) pour compléter ce niveau.",
    "zh_CN": "这一关至少要用到一次直接引用 (即哈希值)",
    "zh_TW": "這一關至少要用到一次直接參考（hash）",
    "es_AR": "Vas a necesitar usar al menos una referencia directa (hash) para completar este nivel",
    "es_ES": "Vas a necesitar usar al menos una referencia directa (hash) para completar este nivel",
    "pt_BR": "Você precisará usar pelo menos uma referência direta (hash) para completar este nível",
    "gl": "Precisarás usar polo menos unha referencia directa (hash) para completar este nivel",
    "de_DE": "Du musst mindestens einen Hash benutzen, um dieses Level zu schaffen",
    "ja": "このレベルをクリアするには少なくとも一つの直接リファレンス（hash）を使用する必要があります",
    "ru_RU": "Понадобится использовать как минимум одну прямую ссылку (хеш), чтобы пройти этот уровень",
    "ko": "이번 레벨을 완료하려면 최소 한번은 직접 참조(해시)를 사용해야 합니다.",
    "uk": "Тобі потрібно використати як мінімум одне пряме посилання (хеш) щоб пройти цей рівень",
    "vi": "Bạn sẽ cần dùng ít nhất một tham chiếu trực tiếp (mã băm) để hoàn thành cấp độ này",
    "sl_SI": "Moral boš uporabiti vsaj eno direktno referenco (hash) za dokončanje te stopnje.",
    "it_IT":
      "Dovrai usare almeno un riferimento diretto (hash) per completare questo livello",
    "pl": "Aby ukończyć ten poziom, musisz użyć co najmniej jednej bezpośredniej referencji (hasza).",
  },
  "name": {
    "en_US": "Relative Refs #2 (~)",
    "de_DE": "Relative Referenzen #2 (~)",
    "ja": "相対リファレンス　その２ (~)",
    "es_AR": "Referencias relativas #2 (~)",
    "es_ES": "Referencias relativas #2 (~)",
    "es_MX": "Referencias relativas #2 (~)",
    "pt_BR": "Referências relativas #2 (~)",
    "gl": "Referencias relativas #2 (~)",
    "fr_FR": "Références relatives #2 (~)",
    "zh_CN": "相对引用2（~）",
    "zh_TW": "相對引用二（~）",
    "ru_RU": 'Относительные ссылки №2',
    "ko": "상대 참조 #2 (~)",
    "uk": "Відносні посилання №2",
    "vi": "Tham chiếu tương đối #2 (~)",
    "sl_SI": "Relativne Reference #2 (~)",
    "it_IT": "Riferimenti relativi #2 (~)",
    "pl": "Referencje względne #2 (~)"
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
              "The tilde operator (optionally) takes in a trailing number that specifies the number of parents you would like to ascend. Let's see it in action."
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
              "`git branch -f main HEAD~3`",
              "",
              "moves (by force) the main branch to three parents behind HEAD.",
              "",
              "*Note: In a real git environment `git branch -f command` is not allowed for your current branch.*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see that previous command in action."
            ],
            "afterMarkdowns": [
              "There we go! Relative refs gave us a concise way to refer to `C1` and branch forcing (`-f`) gave us a way to quickly move a branch to that location."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Now that you have seen relative refs and branch forcing in combination, let's use them to solve the next level.",
              "",
              "To complete this level, move `HEAD`, `main`, and `bugFix` to their goal destinations shown."
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
              "¡Boom! Bien conciso -- las referencias relativas la rompen."
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
              "Ahora que conocés todo sobre las referencias relativas, *usémoslas* para algo.",
              "",
              "Una de las formas más comunes en que uso las referencias relativas es para mover las ramas. Podés reasignar directamente una rama a un commit usando la opción `-f`. Así que algo como:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "Mueve (forzadamente) la rama main tres padres atrás de HEAD."
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
              "¡Ahí vamos! Las referencias relativas nos dieron una manera concisa de referenciar a `C1`, y forzar la rama (`-f`) nos dio una manera rápida de mover la rama a esa ubicación"
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ahora que viste las referencias relativas y el forzar ramas combinados, usémoslos para resolver el siguiente nivel.",
              "",
              "Para completar este nivel, mové `HEAD`, `main` y `bugFix` a sus destinos finales."
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
              "### El operador \"~\"",
              "",
              "Digamos que quieres moverte un montón de niveles atrás en tu árbol de commits. Podría ser tedioso escribir `^` muchas veces, por lo que git tiene el operador ~.",
              "",
              "",
              "El operador ~ (opcionalmente) toma una cantidad que especifica la cantidad de padres que quieres volver hacia atrás. Veámoslo en acción"
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
              "¡Zas! Bien conciso -- las referencias relativas la rompen."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forzando las ramas",
              "",
              "Ahora que eres un experto en las referencias relativas, *usémoslas* para algo.",
              "",
              "Una de las formas más comunes en que uso las referencias relativas es para mover las ramas. Puedes reasignar directamente una rama a un commit usando la opción `-f`. Algo así como:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "Mueve (forzadamente) la rama main tres padres por detrás de HEAD."
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
              "¡Allá vamos! Las referencias relativas nos proporcionaron una manera concisa de referenciar a `C1`, y forzar la rama (`-f`) nos dio una manera rápida de mover la rama a esa ubicación"
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ahora que viste las referencias relativas y el forzar ramas combinados, usémoslos para resolver el siguiente nivel.",
              "",
              "Para completar este nivel, mueve `HEAD`, `main` y `bugFix` a sus destinos finales."
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
              "### El operador \"~\"",
              "",
              "Digamos que quieres moverte un montón de niveles atrás en tu árbol de commits. Podría ser tedioso escribir `^` muchas veces y por eso Git tiene el operador ~.",
              "",
              "",
              "El operador ~ (opcionalmente) toma la cantidad especificada de padres que quieres volver hacia atrás. Veámoslo en acción"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Especifiquemos una cantidad de confirmaciones hacia atrás con `~`."
            ],
            "afterMarkdowns": [
              "¡Vientos! Genial -- las referencias relativas son lo mejor."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forzando las ramas",
              "",
              "Ahora que eres un experto en las referencias relativas, *usémoslas* para algo.",
              "",
              "Una de las formas más comunes en que uso las referencias relativas es para mover las ramas. Puedes reasignar directamente una rama a un commit usando la opción `-f`. Algo así como:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "Mueve (forzadamente) la rama main tres padres por detrás de HEAD."
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
              "¡Allá vamos! Las referencias relativas nos proporcionaron una manera breve de referenciar a `C1` y forzar la rama (`-f`) nos dio una manera rápida de mover la rama a esa ubicación"
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ahora que viste las referencias relativas y el forzar ramas combinados, usémoslos para resolver el siguiente nivel.",
              "",
              "Para completar este nivel, mueve `HEAD`, `main` y `bugFix` a sus destinos finales."
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
              "### O operador \"~\"",
              "",
              "Digamos que você queira se mover vários níveis para cima na árvore de commits. Pode ser entediante digitar `^` várias vezes, e por isso o Git possui também o operador til (`~`).",
              "",
              "",
              "Um número pode ser passado (opcionalmente) após o operador til, especificando o número de ancestrais que você deseja subir. Vamos vê-lo em ação"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos especificar um número de commits para trás com `~`."
            ],
            "afterMarkdowns": [
              "Boom! Tão conciso -- referências relativas são incríveis."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forçando os ramos",
              "",
              "Agora que você é um especialista em referências relativas, vamos *usá-las* de fato para alguma coisa.",
              "",
              "Uma das situações mais comuns na qual eu uso referências relativas é quando quero trocar ramos de lugar. Você pode redefinir diretamente o commit para o qual um ramo aponta com a opção `-f`. Desta forma, o seguinte comando:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "Move (à força) o ramo main 3 ancestrais acima do HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vejamos o comando anterior em ação"
            ],
            "afterMarkdowns": [
              "Aqui vamos nós! As referências relativas nos deram uma forma concisa de nos referirmos ao `C1`, e a movimentação de ramos (com `-f`) nos deu uma forma de apontar rapidamente um ramo para esse local."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Agora que você viu referências relativas e movimentação de ramos combinadas, vamos usá-las para resolver o próximo nível.",
              "",
              "Para completar este nível, mova o `HEAD` e os ramos `main` e `bugFix` para os destinos mostrados no objetivo."
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
              "### O operador \"~\"",
              "",
              "Digamos que queres moverte un montón de commits cara atrás nunha árbore de git. Sería moi tedioso escribir `^` moitas veces, e por iso que git tamén ten o operador (`~`).",
              "",
              "",
              "Pódeselle pasar un número (opcionalmente) despois da tilde, especificando o número de commits que se quere mover cara atrás. Mira como é en acción."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Imos especificar un número de commits cara atrás con `~`."
            ],
            "afterMarkdowns": [
              "¡Veeeña! Ben apuntado -- as referencias relativas son a leche."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forzando as ramas",
              "",
              "Agora que eres un especialista en referencias relativas, imos *usalas* para algunha cousiña.",
              "",
              "Un dos usos máis comúns para o uso das referencias relativas é para movelas ramas de lugar. Ti podes reasignar directamente unha rama a un commit usando a opción `-f`. Así que con algo coma:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "Move (de forma forzosa) a rama main 3 commits enriba do HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vexamos o comando anterior en acción"
            ],
            "afterMarkdowns": [
              "¡Agora é o a nosa quenda! As referencias relativas nos darán unha forma concisa de nos referír a `C1`, e forzar a rama (con `-f`) deunos unha forma rápida de movela rama `main` a esa posición."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Xa viches as referencias relativas e o movemento de ramas combinadas, ímolas usar para resolver o próximo exercicio.",
              "",
              "Para completar este nivel, mova o `HEAD` e as ramas `main` e `bugFix` para os destinos mostrados no obxectivo."
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
              "### L'opérateur \"~\"",
              "",
              "Imaginons que vous souhaitiez remonter beaucoup de niveaux dans l'arbre des commits. Cela peut être ennuyeux d'utiliser `^` plusieurs fois, c'est pourquoi Git a aussi l'opérateur tilde (~).",
              "",
              "",
              "L'opérateur tilde prend optionnellement à sa suite un nombre qui spécifie le nombre de parents que vous souhaitez remonter. Voyons cela en action."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Spécifions le nombre de commits en arrière avec `~`."
            ],
            "afterMarkdowns": [
              "Boum ! Tellement rapide ! Les références relatives sont géniales."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forcer les branches",
              "",
              "Vous êtes maintenant un expert des références relatives, alors servons-nous en.",
              "",
              "L'une des principales raisons pour lesquelles j'utilise les références relatives est qu'elles permettent de réorganiser les branches. Vous pouvez directement réassigner les branches à un commit avec l'option `-f`. Ainsi la commande suivante :",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "bouge (de force) la branche main à trois parents derrière HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons l'effet de la précédente commande."
            ],
            "afterMarkdowns": [
              "On y est ! Les références relatives nous donnent une méthode concise pour référencer `C1` et le forçage de branche (`-f`) nous donne une méthode rapide pour déplacer une branche à cet emplacement."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Maintenant que vous avez vu les références relatives et le forçage de branche, utilisons-les pour résoudre le niveau suivant.",
              "",
              "Pour compléter ce niveau, bouger `HEAD`, `main`, et `bugFix` à leurs destinations désignées."
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
              "Nehmen wir an, du willst viele Schritte im Commit-Baum zurückgehen. Dann wird es schnell mühsam immer wieder `^` einzugeben; deswegen gibt es in Git den Tilde-Operator `~`.",
              "",
              "Der Tilde-Operator akzeptiert optional eine Zahl, mit der du angeben kannst, wie viele Vorgänger du zurückgehen willst. Keine Anzahl anzugeben, bewirkt dasselbe wie `~1`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Geben wir mit `~` an, wie viele Commits wir zurückgehen wollen."
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
              "Das Verschieben von Branches ist einer der häufigsten Anwendungsfälle dafür. Du kannst einen Branchnamen direkt auf einen bestimmten Commit setzen (_ohne_ ihn vorher ausgecheckt haben zu müssen!), indem du den Parameter `-f` benutzt. So in etwa:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "Das bewegt (erzwungenermaßen) den `main` auf den Commit drei Vorgänger vor `HEAD`."
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
              "Das war's schon! Relative Referenzen ermöglichen es uns den Commit `C1` sehr einfach anzugeben und `git branch -f` ermöglicht es uns, den Branch sehr schnell auf diesen Commit zu setzen."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Jetzt wo du relative Referenzen und erzwungenes Branching in Kombination gesehen hast können wir damit den nächsten Level bewältigen.",
              "",
              "Bewege `HEAD`, `main` und `bugFix` an die jeweils angegebenen Positionen, um diesen Level abzuschließen."
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
              "### “~”操作符",
              "",
              "如果你想在提交树中向上移动很多步的话，敲那么多 `^` 貌似也挺烦人的，Git 当然也考虑到了这一点，于是又引入了操作符 `~`。",
              "",
              "",
              "该操作符后面可以跟一个数字（可选，不跟数字时与 `^` 相同，向上移动一次），指定向上移动多少次。咱们还是通过实际操作看一下吧"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "咱们用 `~<num>` 一次后退四步。"
            ],
            "afterMarkdowns": [
              "多么的简洁 —— 相对引用就是方便啊！"
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 强制修改分支位置",
              "",
              "你现在是相对引用的专家了，现在用它来做点实际事情。",
              "",
              "我使用相对引用最多的就是移动分支。可以直接使用 `-f` 选项让分支指向另一个提交。例如:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "上面的命令会将 main 分支强制指向 HEAD 的第 3 级 parent 提交。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "现在咱们来演示一下刚才的命令："
            ],
            "afterMarkdowns": [
              "这就对了! 相对引用为我们提供了一种简洁的引用提交记录 `C1` 的方式， 而 `-f` 则容许我们将分支强制移动到那个位置。"
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "既然你已经看过相对引用与强制移动分支的演示了，那么赶快使用这些技巧来挑战这一关吧！",
              "",
              "要完成此关，移动 `HEAD`，`main` 和 `bugFix` 到目标所示的位置。"
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
              "假設需要在 commit tree 中向上移動多個 commit。使用太多 `^` 會非常討人厭，所以 Git 也加入了波浪（~）符號。",
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
              "`git branch -f main HEAD~3`",
              "",
              "（強制）移動 main 指向從 HEAD 往上數的第三個 parent commit。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這一關，移動 `HEAD`，`main` 和 `bugFix` 到目標所示的位置。"
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
              "###\"~\" 演算子",
              "",
              "コミットツリーの中で複数の段階上へ移動したいとします。毎回毎回`^`と打つのは面倒くさくなるかもしれませんので、gitにはチルダの演算子も備わっています。",
              "",
              "",
              "チルダ演算子のあとには、上へ移動したい親コミットの数を表す数字もオプションでつけられます。実際の動作を見てみましょう。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "遡る前のコミット数を`~`で指定しましょう。"
            ],
            "afterMarkdowns": [
              "よっしゃ！効率が良いですね -- 相対リファレンスはなんと便利です。"
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "###ブランチの強制",
              "",
              "今はあなたも相対リファレンスの達人なので、実践的な使い方を覚えましょう。",
              "",
              "相対リファレンスのよくある使い方としてあるのは、ブランチの移動です。`-f`オプションを使ってブランチを直接コミットに関連付けられます。次のようになります",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "mainブランチを（強制的に）HEADより親三代前へと移動します。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "先ほどのコマンドの動作を見てみましょう。"
            ],
            "afterMarkdowns": [
              "できました！相対リファレンスを使うことで、手短く`C1`を指定することができ、`-f`でブランチを強制的にそこへ移動することができました。"
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "相対リファレンスとブランチの強制関連付けを見ましたので、いまここでそれらの方法を使ってみましょう。",
              "",
              "このレベルをクリアするには`HEAD`、`main`、`bugFix`をゴールで指定されている目的位置まで移動してください。"
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
              "### Оператор \"~\"",
              "",
              "Предположим, нужно переместиться на много шагов назад по дереву. Было бы неудобно печатать `^` несколько раз (или несколько десятков раз), так что Git поддерживает также оператор тильда (~).",
              "",
              "",
              "К тильде (опционально) можно добавить количество родительских коммитов, через которые нужно пройти. Посмотрим, как это работает."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Укажем после `~` число коммитов, через которые надо пройти."
            ],
            "afterMarkdowns": [
              "Оп! Очевидно, относительные ссылки прекрасны."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Перемещение ветки (branch forcing)",
              "",
              "Теперь мы разбираемся в относительных ссылках, так что можно реально использовать их для дела.",
              "",
              "Одна из наиболее распространённых целей, для которых используются относительные ссылки - это перемещение веток. Можно напрямую прикрепить ветку к коммиту при помощи опции `-f`. Например, команда:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "Переместит (принудительно) ветку `main` на три родителя назад от `HEAD`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Посмотрим, как работает эта команда"
            ],
            "afterMarkdowns": [
              "Вуаля! Относительная ссылка дала нам возможность просто сослаться на `C1`, а branch forcing (`-f`) позволил быстро переместить указатель ветки на этот коммит."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Мы рассмотрели относительные ссылки и branch forcing вкупе, так что теперь пришло время пройти следующий уровень.",
              "",
              "Чтобы пройти этот уровень, передвинь `HEAD`, `main` и `bugFix` так, как показано на визуализации."
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
              "### \"~\" 연산자",
              "",
              "커밋트리에서 위로 여러 단계를 올라가고 싶을 수 있습니다. `^`를 계속 입력해서 올라가는것 말고 좋은 방법이 있습니다. Git 에는 틸드 (~) 연산자가 있습니다.",
              "",
              "",
              " (~) 틸드 연산자는 (선택적) 올라가고 싶은 부모의 갯수가 뒤에 숫자가 옵니다. 직접 확인해 보죠."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "돌아가고 싶은 커밋의 갯수를 `~`뒤의 숫자로 명시해 줍시다."
            ],
            "afterMarkdowns": [
              "Boom! 아주 간결합니다. -- 상대 참조는 대단해요."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 브랜치 강제로 옮기기",
              "",
              "이제 여러분은 상대 참조의 전문가 입니다. 이제 이걸로 무언가를 해봅시다.",
              "",
              "제가 상대 참조를 사용하는 가장 일반적인 방법은 브랜치를 옮길 때 입니다. `-f` 옵션을 이용해서 브랜치를 특정 커밋에 직접적으로 재지정 할 수 있습니다. 이런 식으로 말이죠:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "(강제로) main 브랜치를 HEAD에서 세번 뒤로 옮겼습니다. (three parents behind HEAD)."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "방금의 커맨드를 직접 확인해 봅시다."
            ],
            "afterMarkdowns": [
              "됐네요! 우리는 상대 참조를 통해 `C1`을 간결한 방법으로 참조할 수 있었고 브랜치 강제(`-f`)를 통해 브랜치를 저 위치로 빠르게 옮길 수 있었습니다."],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "자 이제 상대 참조와 브랜치 강제의 조합을 봤으니 다음 레벨을 해결해 봅시다.",
              "",
              "이 레벨을 통과하기 위해서, `HEAD`와 `main`과 `bugFix`를 제시되는 골지점으로 옮겨 주십시오."
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
              "### Оператор \"~\"",
              "",
              "Уявімо, що тобі потрібно піднятися досить високо вгору в дереві комітів. Було б трохи напряжно набирати `^` багато разів, тому Git також має оператор тильда(~).",
              "",
              "",
              "До оператор тильда (не обов’язково) можна дописати справа число, що вказує на яку кількість предків потрібно піднятися вверх. Подивимось на практиці"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте вкажемо на яку кількість комітів повернутися з `~`."
            ],
            "afterMarkdowns": [
              "Ка-бум! Так коротко -- відносні посилання прекрасні."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Форсуємо гілку",
              "",
              "Тепер ти експерт в відносних посиланнях, давай же *використаємо* їх для справи.",
              "",
              "Один з найуживаніших прийомів де я використовую відносні посилання це переміщення гілок. Ти можеш напряму переспрямувати бранч на якийсь коміт використавши опцію `-f` (force, тобто насильно). Щось на зразок:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "Переміщує (насильно) гілку main на три предки позад HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте подивимось на попередню команду в дії"
            ],
            "afterMarkdowns": [
              "Ось і маєш! Відносні посилання дають нам зручний спосіб доступу до коміту `C1`, крім того форсування бранчів (`-f`) дає нам можливість швидко перемістити гілку на цей коміт"
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Тепер, коли ти побачив відносні посилання та форсування гілок в купі, давай використаємо це щоб пройти поточний рівень.",
              "",
              "Щоб пройти цей рівень, перемісти `HEAD`, `main` та `bugFix` так як показано в візуалізації."
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
              "### Toán tử \"~\"",
              "",
              "Giả sử bạn muốn leo lên nhiều cấp trong Git. Dùng `^` vài lần thì tù lắm, nên Git đã có dấu ngã (~) cho việc đó.",
              "",
              "",
              "Theo sau toán tử ngã (~) là số lượng cha ông mà bạn muốn leo lên (không bắt buộc). Xem thử làm thật thì thế nào nào."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hãy chỉ định số lượng commit với `~`."
            ],
            "afterMarkdowns": [
              "BÙUM! Quá chuẩn luôn -- tham chiếu tương đối tuyệt vời."
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
              "Giờ thì bạn là cao thủ về tham chiếu tương đối rồi, *làm* thật thôi chứ nhỉ.",
              "",
              "Tôi thì hay thường dùng tham chiếu tương đối để dịch chuyển nhánh. Bạn có thể trực tiếp gán lại nhánh cho commit với cú pháp `-f`. Kiểu như thế này:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "dịch chuyển (ép buộc) nhánh main lên 3 commit phía trên HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Xem thử cái lệnh trên hoạt động sao nào."
            ],
            "afterMarkdowns": [
              "Đóóóó! Tham chiếu tương đối cho chúng ta một cách chuẩn xác để trỏ tới `C1` và ép nhánh bằng (`-f`) để dịch chuyển nhanh chóng nhánh tới đó."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Bây giờ khi bạn đã biết về các tham chiếu tương đối và ép buộc nhánh, hãy sử dụng chúng để giải quyết cấp độ tiếp theo",
              "",
              "Để hoàn thành cấp độ này, chuyển `HEAD`, `main`, và `bugFix` đến mục tiêu được xác định của chúng."
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
              "### Operator \"~\"",
              "",
              "Recimo, da se želiš premakniti veliko stopenj višje po drevesu commitov. Malo je nerodno večkrat tipkati `^`, zato ima Git tudi tilda (~) operator.",
              "",
              "",
              "Tilda operator (opcijsko) sprejme številko, ki določi, koliko staršev bi se rad povzpel po drevesu. Poglejmo to v praksi."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Določimo število prejšnjih commitov z `~`."
            ],
            "afterMarkdowns": [
              "Boom! Tako jedrnato -- relativne reference so super."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forcanje Branchev",
              "",
              "Sedaj si strokovnjak za relativne reference, zato jih končno *uporabimo* za nekaj.",
              "",
              "Eden izmed najpogostejših načinov, kjer uporabljam relativne reference je za premikanje branchev naokoli. Direktno lahko premakneš branch na nek commit z `-f` opcijo. Takole nekako:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "premakne (s force-om) main branch tri commite za HEAD."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Poglejmo si prejšnji ukaz v praksi."
            ],
            "afterMarkdowns": [
              "Tako ja! Relativne reference so nam dale jedrnat način s katerim se lahko nanašamo na `C1` in branch force-anje (`-f`) nam je omogočilo, da hitro prestavimo branch na to lokacijo."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Sedaj ko smo si pogledali relativne reference in force branchanje v kombinaciji, uporabimo to, da rešimo naslednjo stopnjo.",
              "",
              "Za dokončanje te stopnje, premakni `HEAD`, `main` in `bugFix` na njihove ciljne prikazane destinacije."
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
              "### Operator \"~\"",
              "",
              "Powiedzmy, że chcesz przejść o wiele poziomów wstecz na drzewie commitów. Wielokrotne wpisywanie `^` może być męczące. Na tę okazję Git ma również operator - tyldę (~).",
              "",
              "",
              "Do operatora tyldy możesz (opcjonalnie) dodać numer, który określa, o jaką liczbę rodziców chcesz się cofnąć. Zobaczmy, jak to działa."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Podajmy liczbę commitów, które chcemy przeskoczyć, za `~`."
            ],
            "afterMarkdowns": [
              "Tadam! Ale szybko - referencje względne są czadowe."
            ],
            "command": "git checkout HEAD~4",
            "beforeCommand": "git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Forsowanie gałęzi",
              "",
              "Jesteś teraz ekspertem ds. referencji. *Wykorzystajmy* je do czegoś.",
              "",
              "Jednym z najczęstszych sposobów, w jaki korzystam z referencji względnych, są działania na gałęziach. Możesz bezpośrednio przypisać gałąź do commita za pomocą opcji `-f`. Na przykład tak:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "przenosi (na siłę) gałąź `main` trzy commity wstecz - za HEADa."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Zobaczmy, jak działa poprzednie polecenie."
            ],
            "afterMarkdowns": [
              "Proszę bardzo! Referencje względne umożliwiły ci odnieść się w zwięzły sposób do `C1`, a forsowanie gałęzi (`-f`) pozwoliło na szybkie przeniesienie gałęzi w to konkretne miejsce."
            ],
            "command": "git branch -f main HEAD~3",
            "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Teraz, gdy wiesz już, jak połączyć referencje względne i forsowanie gałęzi, użyj ich do rozwiązania następnego poziomu.",
              "",
              "Aby ukończyć ten poziom, przenieś `HEAD`, `main` oraz `bugFix` do wskazanych celów."
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
              '### L\'operatore "~"',
              "",
              "Nel caso in cui voglia risalire di più livelli l'albero dei commit, è una seccatura aggiungere `^` per ogni salto, per questo Git ha l'operatore tilde(~).",
              "",
              "",
              "A questo operatore si può (facoltativamente) aggiungere un numero che specifica di quanti livelli si vuole risalire l'albero dei commit. Vediamolo in azione.",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Specifichiamo il numero di commit con `~`.",
            ],
            afterMarkdowns: ["Fatto! Breve ed efficace -- i riferimenti relativi sono stupendi."],
            command: "git checkout HEAD~4",
            beforeCommand: "git commit; git commit; git commit",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "### Forzatura dei rami (branch forcing)",
              "",
              "Ormai sei un esperto di riferimenti relativi, quindi facciamone realmente *uso* per qualcosa.",
              "",
              "Uno dei motivi più comuni per cui uso i riferimenti relativi è per spostare i rami. E' possibile assegnare un ramo a un commit con l'opzione  `-f`. Per esempio:",
              "",
              "`git branch -f main HEAD~3`",
              "",
              "sposta (con la forza) il ramo main al terzo antenato di HEAD.",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: ["Vediamolo in azione."],
            afterMarkdowns: [
              "Ecco qua! I riferimenti relativi ci permettono facilmente di specificare `C1` e il branch forcing (`-f`) ci da modo di spostare rapidamente il ramo su quella posizione.",
            ],
            command: "git branch -f main HEAD~3",
            beforeCommand:
              "git commit; git commit; git commit; git checkout -b bugFix",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Ora che hai visto i riferimenti relativi e il branch forcing, usiamoli per completare il prossimo livello.",
              "",
              "Per completare questo livello, sposta `HEAD`, `main`, e `bugFix` alla loro destinazione finale mostrata nell'obiettivo.",
            ],
          },
        },
      ],
    },

  }
};
