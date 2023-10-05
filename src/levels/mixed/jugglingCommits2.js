exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22main%22%7D%2C%22newImage%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22newImage%22%7D%2C%22caption%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22caption%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%27%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout main;git cherry-pick C2;git commit --amend;git cherry-pick C3",
  "disabledMap": {
    "git revert": true
  },
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\"},\"newImage\":{\"target\":\"C2\",\"id\":\"newImage\"},\"caption\":{\"target\":\"C3\",\"id\":\"caption\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"caption\",\"id\":\"HEAD\"}}",
  "compareOnlyMainHashAgnosticWithAsserts": true,
  "goalAsserts": {
    "main": [
      function (data) {
        return data.C2 > data.C3;
      },
      function (data) {
        return data.C2 > data.C1;
      }
    ]
  },
  "name": {
    "ko": "커밋 갖고 놀기 #2",
    "en_US": "Juggling Commits #2",
    "fr_FR": "Jongler avec les commits #2",
    "es_AR": "Haciendo malabares con los commits #2",
    "es_ES": "Haciendo malabares con los commits #2",
    "es_MX": "Malabareando con las confirmaciones #2",
    "pt_BR": "Malabarismo com commits #2",
    "gl": "Argallando cos commits #2",
    "de_DE": "Jonglieren mit Commits Teil 2",
    "ja": "コミットをやりくりする その2",
    "zh_CN": "提交的技巧 #2",
    "zh_TW": "commit 的戲法 #2",
    "ru_RU": "Жонглируем коммитами №2",
    "uk": "Жонглюємо комітами #2",
    "vi": "Tung hứng commit #2",
    "sl_SI": "Žongliranje s Commiti #2",
    "it_IT": "Giocoliere di commit #2",
    "pl": "Żonglowanie commitami #2",
    "tr_TR": "Commit Hokkabazlığı #2",
  },
  "hint": {
    "en_US": "Don't forget to forward main to the updated changes!",
    "fr_FR": "N'oubliez pas d'appliquer les changements depuis la branche main",
    "es_AR": "¡No te olvides de avanzar main a los cambios actualizados!",
    "es_ES": "¡No te olvides de avanzar main a los cambios actualizados!",
    "es_MX": "¡No te olvides de avanzar main a los cambios actualizados!",
    "pt_BR": "Não se esqueça de avançar a referência do main para as mudanças efetuadas!",
    "gl":    "¡Non te esquezas de avanzar main ós cambios actualizados!",
    "de_DE": "Vergiss nicht den main auf die aktuelle Version vorzuspulen",
    "ja":    "mainのポインタを先に進めることを忘れずに！",
    "ko":    "main을 변경 완료한 커밋으로 이동(forward)시키는 것을 잊지 마세요!",
    "zh_CN": "别忘记了将 main 快进到最新的更新上！",
    "zh_TW": "別忘記了將 main 推到最新的 commit 上面！",
    "ru_RU": "Не забудь переместить main на последние изменения.",
    "uk":    "Не забудь перемістити main на останні зміни!",
    "vi":    "Đừng quên đẩy nhánh main lên cập nhật mới nhất!",
    "sl_SI": "Ne pozabi prestaviti main naprej na posodobljene spremembe.",
    "it_IT": "Non dimenticare di avanzare il main verso le ultime modifiche aggiornate!",
    "pl":    "Nie zapomnij sforwardować maina do najnowszych zmian!",
    "tr_TR": "Main'i yaptığınız değişikliklere ilerletmeyi unutmayın!",
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Juggling Commits #2",
              "",
              "*If you haven't completed Juggling Commits #1 (the previous level), please do so before continuing*",
              "",
              "As you saw in the last level, we used `rebase -i` to reorder the commits. Once the commit we wanted to change was on top, we could easily --amend it and re-order back to our preferred order.",
              "",
              "The only issue here is that there is a lot of reordering going on, which can introduce rebase conflicts. Let's look at another method with `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Remember that git cherry-pick will plop down a commit from anywhere in the tree onto HEAD (as long as that commit isn't an ancestor of HEAD).",
              "",
              "Here's a small refresher demo:"
            ],
            "afterMarkdowns": [
              "Nice! Let's move on."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "So in this level, let's accomplish the same objective of amending `C2` once but avoid using `rebase -i`. I'll leave it up to you to figure it out! :D",
              "",
              "Remember, the exact number of apostrophe's (') on the commit are not important, only the relative differences. For example, I will give credit to a tree that matches the goal tree but has one extra apostrophe everywhere."
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
              "## Jongler avec les commits #2",
              "",
              "*Si vous n'avez pas fait le défi Jongler avec les commits #1 (le niveau précédent), vous devriez le faire avant de continuer*",
              "",
              "Comme vu dans le niveau précédent, nous utilisons `rebase -i` pour réordonner les commits. Une fois que le commit à modifier est celui à la tête, nous pouvons facilement faire un --amend et réordonner dans l'ordre voulu.",
              "",
              "La difficulté ici est qu'il y a beaucoup de changements, ce qui peut introduire des conflits de rebase. Essayons avec l'autre méthode `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "N'oubliez pas que git cherry-pick va prendre un commit de n'importe où dans l'arbre de Git et le mettre devant HEAD (sauf s'il est un ancêtre de HEAD).",
              "",
              "Un petit rappel :"
            ],
            "afterMarkdowns": [
              "Bien ! Continuons."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Dans ce niveau, nous voulons modifier `C2` sans utiliser `rebase -i`. À vous maintenant de trouver comment ! :D",
              "",
              "Petit rappel, le nombre exact d'apostrophes (') sur le commit n'est pas important. Par exemple, nous donnerons les points à une structure qui colle au résultat mais qui a une apostrophe en trop partout."
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
              "## Haciendo malabares con los commits #2",
              "",
              "*Si no completaste Haciendo malabares con los commits #1 (el nivel anterior), hacelo antes de continuar*",
              "",
              "Como viste en el último nivel, usamos `rebase -i` para reordenar los commits. Una vez que el commit que queríamos cambiar estaba arriba de todo, pudimos `--amend`earlo fácilmente y reordenarlo a como queríamos.",
              "",
              "El único problema con esto es que hay mucho reordenamiento, que puede generar conflictos al rebasear. Veamos otro método usando `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Acordate de que git cherry-pick va a traer un commit de cualquier parte del árbol sobre HEAD (siempre que ese otro commit no sea un ancestro de HEAD).",
              "",
              "Una pequeña demo para refrescar la idea:"
            ],
            "afterMarkdowns": [
              "¡Bien! Sigamos..."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Entonces, en este nivel vamos a lograr el mismo objetivo de corregir `C2`, pero sin usar `rebase -i`. Te dejo a vos el darte cuenta cómo :D",
              "",
              "Acordate, la cantidad exacta de apóstrofes (') en el commit no es importante, sólo la diferencia relativa. Por ejemplo, le voy a dar puntaje a un árbol que matchee el objetivo pero cuyos commits tengan todos un apóstrofe extra."
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
              "## Haciendo malabares con los commits #2",
              "",
              "*Si no completaste Haciendo malabares con los commits #1 (el nivel anterior), hazlo antes de continuar*",
              "",
              "Como viste en el último nivel, usamos `rebase -i` para reordenar los commits. Una vez que el commit que queríamos cambiar se encontraba arriba de todo, pudimos `--amend`earlo fácilmente y reordenarlo a como queríamos.",
              "",
              "El único problema con esto es que hay mucho reordenamiento, que puede generar conflictos al rebasear. Veamos otro método usando `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Recuerda que git cherry-pick va a traer un commit de cualquier parte del árbol sobre HEAD (siempre que ese otro commit no sea un ancestro de HEAD).",
              "",
              "Una pequeña demo para refrescar la idea:"
            ],
            "afterMarkdowns": [
              "¡Bien! Sigamos..."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Entonces, en este nivel vamos a lograr el mismo objetivo de corregir `C2`, pero sin usar `rebase -i`. Te dejo a ti el darte cuenta cómo :D",
              "",
              "Recuerda, la cantidad exacta de apóstrofes (') en el commit no es importante, sólo la diferencia relativa. Por ejemplo, le voy a dar una puntuación a un árbol que coincida con el objetivo pero cuyos commits tengan todos un apóstrofe extra."
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
              "## Malabareando con las confirmaciones #2",
              "",
              "*Si no completaste Malabareando con las confirmaciones #1 (el nivel anterior), hazlo antes de continuar*",
              "",
              "Como viste en el último nivel, usamos `rebase -i` para reordenar las confirmaciones. Una vez que la confirmación que queríamos cambiar se encontraba arriba de todo, pudimos `--amend` (enmendarlo) fácilmente y reordenarlo a como queríamos.",
              "",
              "El único problema con esto es que hay mucho reordenamiento, que puede generar conflictos al rebasear. Veamos otro método usando `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Recuerda que git cherry-pick va a traer un commit de cualquier parte del árbol sobre HEAD (siempre que ese otro commit no sea un ancestro de HEAD).",
              "",
              "Una pequeña demostración para refrescar la idea:"
            ],
            "afterMarkdowns": [
              "¡Bien! Sigamos..."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Entonces, en este nivel vamos a lograr el mismo objetivo de corregir `C2`, pero sin usar `rebase -i`. Te dejo a ti el darte cuenta cómo :D",
              "",
              "Recuerda, la cantidad exacta de apóstrofes (') en el commit no es importante, sólo la diferencia relativa. Por ejemplo, le voy a dar puntos a un árbol que coincida con el objetivo pero cuyos commits tengan todos un apóstrofe extra."
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
              "## Malabarismo com commits #2",
              "",
              "*Caso você não tenha completado o nível anterior (Malabarismo com commits #1), por favor faça-o antes de continuar*",
              "",
              "Como você viu no nível anterior, usamos `rebase -i` para reordenar os commits. Uma vez que o commit que queríamos mudar estava no topo, pudemos facilmente usar o `--amend` e depois reordená-lo de volta para obter nossa ordem preferida.",
              "",
              "O único problema aqui é que há muita reordenação ocorrendo, o que pode introduzir conflitos de rebase. Vamos dar uma olhada em outro método, usando o `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lembre-se que o git cherry-pick copiará um commit de qualquer lugar na árvore sob o HEAD (desde que esse commit não seja um ancestral do HEAD).",
              "",
              "Aqui está uma demonstração para refrescar sua memória:"
            ],
            "afterMarkdowns": [
              "Ótimo! Vamos em frente."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Então, neste nível, vamos alcançar o mesmo objetivo de fazer \"amend\" no `C2`, mas evitaremos usar o `rebase -i`. Agora vou deixar com você a tarefa de descobrir como fazer! :D",
              "",
              "Lembre-se, o número exato de apóstrofos (') nos commits não é importante, apenas as diferenças relativas. Por exemplo, darei todos os pontos nesta tarefa se você obtiver o mesmo resultado da árvore da visualização de objetivo com um apóstrofo extra em todos os commits."
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
              "## Argallando cos commits #2",
              "",
              "*No caso de non ter rematado o tema anterior (Argallando cos commits #1), por favor faino antes de continuar*.",
              "",
              "Como puideches ver no anterior tema, usamos `rebase -i` para reordear os commits. Unha vez que atopamos o commit que queriamos modificar, puidemos empregar sinxelamente o `--amend`, e depois reordenalo de volta para obter a nosa orde preferida.",
              "",
              "O único problema aquí é que hai moita reordenación ocorrendo, o que pode introducir conflitos no rebase. Imos votar unha ollada a outro método, o uso de `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lembra que `git cherry-pick` copiará un commit de qualquera lugar na árbore enriba do HEAD (sempre e cando non sexa ancestro do HEAD).",
              "",
              "Aquí está unha demostración para que refresques a memoria:"
            ],
            "afterMarkdowns": [
              "¡A tope! Seguimos."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Entón, neste nivel, imos completar o mesmo obxectivo que facendo \"amend\" no `C2`, pero evitando facer o `rebase -i`. Agora deixámoste que lle des os miolos para sacar o exercicio! :D",
              "",
              "Recorda, o número exacto de apóstrofos (') nos commits non é importante, só as diferencias relativas. Por exemplo, levarás todos os puntos desta tarefa se obtés o mesmo resultado da árbore que se mostra na visualización do exercicio con un apóstrofo extra en tódolos commits."
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
              "## Jonglieren mit Commits Teil 2",
              "",
              "Du solltest \"Jonglieren mit Commits\" (den vorherigen Level) bestanden haben, bevor du dich an diesem hier versuchst.",
              "",
              "Wie du im letzten Level gesehen hast, haben wir `git rebase -i` genutzt, um die Commits neu anzuordnen. Sobald der Commit, den wir ändern wollten, ganz oben war, konnten wir ihn einfach mit `git commit --amend` anpassen. Danach haben wir die alte Reihenfolge wiederhergestellt.",
              "",
              "Das einzige Problem ist hier, dass da eine Menge Umsortieren stattfindet, was zu Rebase-Konflikten führen kann. Schauen wir uns also eine Methode mit `git cherry-pick` an."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Wie du dich erinnerst, macht `git cherry-pick` eine Kopie des angegebenen Commits und fügt sie an `HEAD` an (es sei denn der Commit ist ein Vorgänger von `HEAD`).",
              "",
              "Hier eine kleine Demo zur Erinnerung:"
            ],
            "afterMarkdowns": [
              "Schick! Und weiter geht's."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In diesem Level ist das Ziel wieder, den Commit `C2` zu modifizieren, diesmal aber ohne `git rebase -i` zu benutzen. Ich überlass es dir herauszufinden, wie das gehen soll. :D",
              "",
              "Nicht vergessen, die genaue Anzahl von Kopien (d.h. Apostrophen) ist nicht ausschlaggebend, nur die Differenz. Der Level ist zum Beispiel auch gelöst, wenn dein fertiger Baum dieselbe Struktur wie der Ziel-Baum hat, aber *überall* ein Apostroph mehr aufweist."
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
              "## コミットをやりくりする その2",
              "",
              "*注：この一つ前のレベル「コミットをやりくりする」をクリアしていない人は、まずそちらの問題をクリアしてきてください！*",
              "",
              "前回見てきたように、コミット順序の変更のために、私たちは`rebase -i`コマンドを利用しました。ツリーの先頭に変更対象のコミットがあれば、--amendオプションを使うことで容易に変更を書きかえて、元の順序に戻すことができます。",
              "",
              "この場合に心配なことが一つだけあって、それは複数回の順序の変更が行われるので、rebaseのコンフリクト（衝突）が起こりうることです。こういうケースへの対策として、`git cherry-pick`を使った別の解決法について考えてみましょう。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "git cherry-pickを使うと、ツリーの中から複数のコミットを選んで、HEADの下に新しく作ることができましたね。",
              "",
              "簡単なデモを見てみましょう："
            ],
            "afterMarkdowns": [
              "できました！次へ進みましょう"
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルでは、`C2`をamendすることで前回と同じ目的を達成しましょう。但し`rebase -i`は使わずにクリアしてください。どんな方法で進めるかはあなたにおまかせします！:D"
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
              "## 提交的技巧 #2",
              "",
              "*如果你还没有完成“提交的技巧 #1”（前一关）的话，请先通过以后再来！*",
              "",
              "正如你在上一关所见到的，我们可以使用 `rebase -i` 对提交记录进行重新排序。只要把我们想要的提交记录挪到最前端，我们就可以很轻松的用 `--amend` 修改它，然后把它们重新排成我们想要的顺序。",
              "",
              "但这样做就唯一的问题就是要进行两次排序，而这有可能造成由 rebase 而导致的冲突。下面还是看看 `git cherry-pick` 是怎么做的吧。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "要在心里牢记 cherry-pick 可以将提交树上任何地方的提交记录取过来追加到 HEAD 上（只要不是 HEAD 上游的提交就没问题）。",
              "",
              "来看看这个例子："
            ],
            "command": "git cherry-pick C2",
            "afterMarkdowns": [
              "看到了吧？我们继续"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "这一关的目标和上一关一样，通过 `--amend` 改变提交记录 `C2`，但你不能用 `rebase -i`。自己想想要怎么解决吧！ :D",
              "",
              "对了，提交记录上面的`'`的数量并不重要，只是引用的不同而已。也就是说如果你的最终结果在某个提交记录上多了个`'`，我也会算你通过的。"
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
              "## commit 的戲法 #2",
              "",
              "*假如你還沒有完成 commit 的戲法 #1（前面那一個關卡），請先完成之後再來這一關！*",
              "",
              "如你在上一個關卡所看到的，我們使用 `rebase -i` 來重新排列那些 commit。只要把我們想要修改的 commit 移到最前面，我們就可以很容易地重新修改它，然後再把它們重新排成我們想要的順序。",
              "",
              "但唯一的問題就是這樣做就要排很多次，有可能造成 rebase conflict。下面就看看用另外一種方法 `git cherry-pick` 是怎麼做的吧！"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "要記住喔！ cherry-pick 可以從 commit tree 的任何地方拿一個 commit 來放在 HEAD 上（只要那個 commit 不是 HEAD 的 parent）。",
              "",
              "下面是一個簡單清楚的 demo："
            ],
            "command": "git cherry-pick C2",
            "afterMarkdowns": [
              "太棒了，我們繼續吧！"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "在這一關和上一關一樣要去修改一個 commit 叫做`C2`，但你要避免使用 `rebase -i`。自己想想看要怎麼解決吧！"
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
              "## 커밋 갖고 놀기 #2",
              "",
              "*만약 이전 레벨의 커밋 갖고 놀기 #1을 풀지 않으셨다면, 계속하기에 앞서서 꼭 풀어보세요*",
              "",
              "이전 레벨에서 보셨듯이 `rebase -i` 명령으로 커밋의 순서를 바꿀 수 있습니다. 정정할 커밋이 바로 직전(top)에 있으면 간단히 --amend로 수정할 수 있고, 그리고 나서 다시 원하는 순서로 되돌려 놓으면 됩니다.",
              "",
              "이번에 한가지 문제는 순서를 꽤 많이 바꿔야한다는 점인데요, 그러다가 리베이스중에 충돌이 날 수 있습니다. 이번에는 다른 방법인 `git cherry-pick`으로 해결해 봅시다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "git cherry-pick으로 HEAD에다 어떤 커밋이든 떨어 뜨려 놓을 수 있다고 알려드린것 기억나세요? (단, 그 커밋이 현재 가리키고 있는 커밋이 아니어야합니다)",
              "",
              "간단한 데모로 다시 알려드리겠습니다:"
            ],
            "afterMarkdowns": [
              "좋아요! 계속할게요"
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "그럼 이번 레벨에서는 아까와 마찬가지로 `C2` 커밋의 내용을 정정하되, `rebase -i`를 쓰지 말고 해보세요. ^.~"
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
              "## Жонглируем коммитами №2",
              "",
              "*Перед прохождением этого уровня обязательно надо пройти предыдущий уровень – 'Жонглируем коммитами №1'*",
              "",
              "В прошлом уровне мы использовали `rebase -i`, чтобы переставлять коммиты. Как только нужный нам коммит оказывался в конце, мы могли спокойно изменить его при помощи `--amend` и переставить обратно.",
              "",
              "Единственная проблема тут - это множество перестановок, которые могут спровоцировать конфликты. Посмотрим, как с этой же задачей справится cherry-pick."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Важно помнить, что cherry-pick поместит любой коммит сразу после HEAD (только если этот коммит не является предком HEAD)",
              "",
              "Вот небольшое демо для напоминания:"
            ],
            "afterMarkdowns": [
              "Ок! Едем дальше!"
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Итак, в этом уровне нужно достичь того же эффекта, но без использования `rebase -i`. Остальное – по усмотрению.",
              "",
              "Важно, чтобы совпадало не только дерево коммитов, но и количество апострофов."
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
              "## Жонглюємо комітами #2",
              "",
              "*Якщо ти ще не пройшов Жонглюємо комітами #1 (попередній рівень), будь ласка, зроби це перед тим як продовжити*",
              "",
              "Як ти бачив в попередньому рівні, ми використали `rebase -i` щоб впорядкувати набір комітів. Як тільки потрібний коміт опиняється вгорі, його досить легко змінити за допомогою --amend й потім відсортувати коміти в попередньому порядку.",
              "",
              "Єдина проблема з таким підходом полягає в тому, що виконується досить багато перестановок комітів, що може призвести до конфліктів при виконанні rebase. Спробуймо інший підхід який використовує `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Не забувай, що git cherry-pick вставить коміт з будь-якого місця в HEAD (якщо це не коміт-предок HEAD).",
              "",
              "Ось невелике демо, щоб пригадати:"
            ],
            "afterMarkdowns": [
              "Добре! Продовжуємо"
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Отже, в цьому рівні досягнімо тієї ж мети -- модифікації `C2` -- але без використання `rebase -i`. Я думаю, ти розберешся як це зробити! :D",
              "",
              "Зверни увагу, що точне число апострофів (') в коміті не важливе, важлива тільки відносна різниця. Наприклад, якщо кожен коміт буде містити додатковий апостроф, я все одно зарахую такий розв’язок."
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
              "## Tung hứng Commit #2",
              "",
              "*Nếu bạn vẫn chưa hoàn thành Tung hứng Commit #1 (cấp độ trước), hãy làm nó trước khi tiếp tục*",
              "",
              "Như bạn đã thấy ở cấp độ trước, ta dùng `rebase -i` để sắp xếp lại các commit. Một khi commit mà ta muốn sửa đã ở trên cùng, ta có thể dễ dàng --chỉnh sửa (amend) nó và sau đó sắp xếp lại trật tự lúc trước.",
              "",
              "Nhưng mà vẫn tồn tại vấn đề khi mà ta sắp xếp quá nhiều, điều này có thể dẫn đến xung đột khi rebase. Thử dùng cách khác với `git cherry-pick` nào."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hãy nhớ rằng cherry-pick sẽ thả commit ở bất cứ đâu xuống dưới HEAD (miễn là nó không phải cha ông hay tổ tiên gì của HEAD).",
              "",
              "Hãy xem thử minh họa nhỏ sau:"
            ],
            "afterMarkdowns": [
              "Hay! Tiếp tục nào"
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Vậy thì ở cấp độ này, hãy làm hoàn thành mục tiêu tương tự là chỉnh sửa `C2` một lần nhưng hãy tránh dùng `rebase -i`. Tự tìm cách đi nhé! :D",
              "",
              "Nhớ rằng, số lượng dấu nháy đơn (') trên commit không quan trọng, quan trọng là sự khác biệt tương đối. Nói cách khác, kể cả bất cứ commit nào của bạn có thêm một đấu(') tôi vẫn công nhận đáp án của bạn"
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
              "## Žongliranje s Commiti #2",
              "",
              "Če še nisi končal Žongliranje s Commiti #1 (prejšnjo stopnjo), jo končaj pred nadaljevanjem",
              "",
              "Kot si videl v prejšnji stopnji, smo uporabili `rebase -i` za preureditev commitov. Ko je bil commit, ki smo ga želeli spremeniti, na vrhu, smo preprosto uporabili --amend in preuredili nazaj v naše željeno stanje.",
              "",
              "Edini problem tu je, da je veliko prerazporejanja, kar lahko povzroči rebase konflikte. Poglejmo si še eno drugo tehniko imenovano `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Git cherry-pick bo skopiral commit iz bilokaterega mesta na drevesu na HEAD (seveda dokler ni ta commit že prednik HEAD).",
              "",
              "Tu je mali osvežitveni primer:"
            ],
            "afterMarkdowns": [
              "Odlično! Nadaljujmo ..."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Torej v tej stopnji bi radi enako spremenili `C2`, ampak tokrat brez uporabe `rebase -i`. Kako to narediti, prepustim tebi! :D",
              "",
              "Točno število opuščajev (') na commitu ni pomembno, pomembna je samo relativna sprememba. Naprimer, vse točko bom dal tudi za drevo, ki ustreza ciljenmu drevesu, a ima povsod dodaten opuščaj."
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
              "## Żonglowanie commitami #2",
              "",
              "*Ukończ poprzedni poziom Żonglowania commitami przed przejściem dalej*",
              "",
              "Na poprzednim poziomie użyliśmy `rebase -i`, aby zmienić kolejność commitów. Kiedy commit, który chcieliśmy zmienić, był już na górze, mogliśmy łatwo to zrobić (`--amend`), a następnie przywrócić do odpowiedniej kolejności.",
              "",
              "Jedynym problemem jest to, że dokonuje się wiele zmian w kolejności, co może powodować konflikty podczas rebase'u. Przyjrzyjmy się innej metodzie korzystającej z `git cherry-pick`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Pamiętaj, że `git cherry-pick` zrzuci commit z dowolnego miejsca drzewa na HEAD (o ile ten commit nie jest przodkiem HEAD).",
              "",
              "Oto małe demo na odświeżenie pamięci:"
            ],
            "afterMarkdowns": [
              "Ładnie! Ruszajmy dalej."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Więc na tym poziomie osiągnijmy ten sam cel zmiany `C2`, ale unikając użycia `rebase -i`. Zostawię ci to do rozgryzienia! :D",
              "",
              "Pamiętaj, że dokładna liczba apostrofów (') nie jest ważna, tylko względne różnice. Na przykład, uznam drzewo, które pasuje do drzewa celu, ale ma wszędzie jeden dodatkowy apostrof."
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
              "## Giocoliere di commit #2",
              "",
              "*Se non hai completato Giocoliere di commit #1 (il livello precedente), sei pregato di farlo prima di proseguire*",
              "",
              "Come hai visto nell'ultimo livello, abbiamo usato `rebase -i` per riordinare i commit. Una volta che il commit che volevamo modificare era in cima, abbiamo potuto facilmente fare --amend per poi ritornare nell'ordine di partenza.",
              "",
              "L'unico problema qui è che ci sono tanti riordini da fare, che può portare a conflitti nel rebase. Vediamo di farlo attraverso il metodo `git cherry-pick`.",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Ricorda che git cherry-pick creerà un qualsiasi commit del repository su HEAD (a condizione che il commit non sia un antenato di HEAD).",
              "",
              "Qui un breve demo per rinfrescare la memoria:",
            ],
            afterMarkdowns: ["Grande! Andiamo avanti."],
            command: "git cherry-pick C2",
            beforeCommand:
              "git checkout -b bugFix; git commit; git checkout main; git commit",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "In questo livello, dobbiamo fare amend di `C2` una volta, evitando di usare `rebase -i`. Lascerò a te il compito di scoprire come farlo! :D",
              "",
              "Ricorda, il numero esatto di apostrofi sul commit non sono importanti, solo le differenze tra essi. Per esempio, considererò l'albero che corrisponde a quello della soluzione ma che ha un apostrofo extra dappertutto.",
            ],
          },
        },
      ],
    },
    "tr_TR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Commit Hokkabazlığı #2",
              "",
              "*Eğer Commit Hokkabazlığı #1'i (bir önceki level) bitirmediyseniz, devam etmeden önce lütfen önce o bölümü bitirin*",
              "",
              "Bir önceki seviyeden hatırlayacağınız gibi, `rebase -i` kullanarak commit'leri yeniden sıralayabiliyorduk. Değiştirmek istediğimiz commit en üstte olduğunda, onu kolayca düzeltebilir `--amend` ve tercih ettiğimiz sıraya yeniden düzenleyebilirdik.",
              "",
              "Tek sorun şu ki, birçok yeniden sıralama yapıldığında, bu yeniden sıralama çatışmalarını ortaya çıkarabilir. Başka bir yöntemi, git cherry-pick ile inceleyelim."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Unutmayın ki git cherry-pick, HEAD'in herhangi bir yerinde (bu commit, HEAD'in atası değilse) bulunan bir commit'i HEAD üzerine bırakacaktır.",
              "",
              "İşte küçük bir hatırlatma demosu:"
            ],
            "afterMarkdowns": [
              "Harika! Devam Edelim."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Bu seviyede, `C2` commit'ini düzeltmek için `rebase -i` kullanmadan aynı sonuca ulaşmaya çalışın. Nasıl ulaşabileceğimizi size bırakıyorum! :D",
              "",
              "Unutmayın, commit'lerdeki tırnakların (') tam olarak eşleşmesi önemli değil, yalnızca göreceli farklar önemlidir. Örneğin, hedef ağaçla eşleşen ancak her yerde ekstra bir tırnak bulunan bir ağaçtan da puan alınabilir."
            ]
          }
        }
      ]
    },
  }
};
