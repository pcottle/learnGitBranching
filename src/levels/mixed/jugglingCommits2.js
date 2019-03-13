exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%7D%2C%22newImage%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22newImage%22%7D%2C%22caption%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22caption%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%27%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout master;git cherry-pick C2;git commit --amend;git cherry-pick C3",
  "disabledMap": {
    "git revert": true
  },
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"newImage\":{\"target\":\"C2\",\"id\":\"newImage\"},\"caption\":{\"target\":\"C3\",\"id\":\"caption\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"caption\",\"id\":\"HEAD\"}}",
  "compareOnlyMasterHashAgnosticWithAsserts": true,
  "goalAsserts": {
    "master": [
      function(data) {
        return data.C2 >= data.C3;
      },
      function(data) {
        return data.C2 > data.C1;
      }
    ]
  },
  "name": {
    "ko": "커밋 갖고 놀기 #2",
    "en_US": "Juggling Commits #2",
    "fr_FR": "Jongler avec les commits #2",
    "es_AR": "Haciendo malabares con los commits #2",
    "pt_BR": "Malabarismo com commits #2",
    "gl"   : "Argallando cos commits #2",
    "de_DE": "Jonglieren mit Commits Teil 2",
    "ja": "コミットをやりくりする その2",
    "zh_CN": "提交的技巧 #2",
    "zh_TW": "commit 的戲法 #2",
    "ru_RU": "Жонглируем коммитами №2",
    "uk": "Жонглюємо комітами #2"
  },
  "hint": {
    "en_US": "Don't forget to forward master to the updated changes!",
    "fr_FR": "N'oubliez pas d'appliquer les changements depuis la branche master",
    "es_AR": "¡No te olvides de avanzar master a los cambios actualizados!",
    "pt_BR": "Não se esqueça de avançar a referência do master para as mudanças efetuadas!",
    "gl"   : "¡Non te esquezas de avanzar master ós cambios actualizados!",
    "de_DE": "Vergiss nicht den master auf die aktuelle Version vorzuspulen",
    "ja": "masterのポインタを先に進めることを忘れずに！",
    "ko": "master를 변경 완료한 커밋으로 이동(forward)시키는 것을 잊지 마세요!",
    "zh_CN": "别忘记了将 master 快进到最新的更新上！",
    "zh_TW": "別忘記了將 master 推到最新的 commit 上面！",
    "ru_RU": "Не забудь переместить master на последние изменения.",
    "uk": "Не забудь перемістити master на останні зміни!"
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
              "The only issue here is that there is a lot of reordering going on, which can introduce rebase conflicts. Let's look at another method with `git cherry-pick`"
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
              "Nice! Let's move on"
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "So in this level, let's accomplish the same objective of amending `C2` once but avoid using `rebase -i`. I'll leave it up to you to figure it out! :D",
              "",
              "Remember, the exact number of apostrophe's (') on the commit are not important, only the relative differences. For example, I will give credit to a tree that matches the goal tree but has one extra apostrophe everywhere"
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
              "La difficulté ici est qu'il y a beaucoup de changements, ce qui peut introduire des conflits de rebase. Essayons avec l'autre méthode `git cherry-pick`"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "N'oubliez pas que git cherry-pick va prendre un commit de n'importe où dans l'arbre de git et le mettre devant HEAD (sauf s'il est un ancêtre de HEAD).",
              "",
              "Un petit rappel :"
            ],
            "afterMarkdowns": [
              "Bien ! continuons."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
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
              "El único problema con esto es que hay mucho reordenamiento, que puede generar conflictos al rebasear. Veamos otro método usando `git cherry-pick`"
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
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Entonces, en este nivel vamos a lograr el mismo objetivo de corregir `C2`, pero sin usar `rebase -i`. Te dejo a vos el darte cuenta cómo :D",
              "",
              "Acordate, la cantidad exacta de apóstrofes (') en el commit no es importante, sólo la diferencia relativa. Por ejemplo, le voy a dar puntaje a un árbol que matchee el objetivo pero cuyos commits tengan todos un apóstrofe extra"
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
              "O único problema aqui é que há muita reordenação ocorrendo, o que pode introduzir conflitos de rebase. Vamos dar uma olhada em outro método, usando o `git cherry-pick`"
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
              "Ótimo! Vamos em frente"
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Então, neste nível, vamos alcançar o mesmo objetivo de fazer \"amend\" no `C2`, mas evitaremos usar o `rebase -i`. Agora vou deixar com você a tarefa de descobrir como fazer! :D",
              "",
              "Lembre-se, o número exato de apóstrofos (') nos commits não é importante, apenas as diferenças relativas. Por exemplo, darei todos os pontos nesta tarefa se você obtiver o mesmo resultado da árvore da visualização de objetivo com um apóstrofo extra em todos os commits"
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
              "O único problema aquí é que hai moita reordenación ocorrendo, o que pode introducir conflitos no rebase. Imos votar unha ollada a outro método, o uso de `git cherry-pick`"
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
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
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
              "Wie du im letzten Level gesehen hast haben wir `git rebase -i` genutzt, um die Commits neu anzuordnen. Sobald der Commit, den wir ändern wollte, ganz oben war, konnten wir das auch einfach mit `git commit --amend` tun. Danach haben wir die alte Reihenfolge wiederhergestellt.",
              "",
              "Das einzige Problem ist hier, dass da eine Menge Umsortieren stattfindet, was zu Rebase-Konflikten führen kann. Schauen wir uns also eine Methode mit `git cherry-pick` an."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Wie du dich erinnerst macht `git cherry-pick` eine Kopie des angegebenen Commits und fügt sie an `HEAD` an (es sei denn der Commit ist ein Vorgänger von `HEAD`).",
              "",
              "Hier eine kleine Demo zur Erinnerung:"
            ],
            "afterMarkdowns": [
              "Schick! Und weiter geht's."
            ],
            "command": "git cherry-pick C2",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In diesem Level geht es also auch um das Ziel den Commit `C2` zu modifizieren, aber ohne `git rebase -i` zu benutzen. Ich überlass es dir herauszufinden, wie das gehen soll. :D",
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
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
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
              "*如果你还没有完成“提交的技巧 #1”（前一关）的话，请选通过以后再来！*",
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
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
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
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
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
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
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
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
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
              "Єдина проблема з таким підходом полягає в тому, що виконується досить багато перестановок комітів, що може призвести до конфліктів при виконанні rebase. Спробуймо інший підхід який використовує `git cherry-pick`"
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
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
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
    }
  }
};
