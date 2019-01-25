exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%7D%2C%22pushed%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22pushed%22%7D%2C%22local%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22local%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22pushed%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git reset HEAD~1;git checkout pushed;git revert HEAD",
  "compareOnlyBranches": true,
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"pushed\":{\"target\":\"C2\",\"id\":\"pushed\"},\"local\":{\"target\":\"C3\",\"id\":\"local\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"local\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Reversing Changes in Git",
    "de_DE": "Änderungen in Git rückgängig machen",
    "ja"   : "変更を元に戻す",
    "fr_FR": "Annuler des changements avec Git",
    "es_AR": "Revirtiendo cambios en git",
    "pt_BR": "Revertendo mudanças no Git",
    "gl"   : "Revertindo cambios en git",
    "ko"   : "Git에서 작업 되돌리기",
    "zh_CN": "撤销变更",
    "zh_TW": "在 git 中取消修改 ",
    "ru_RU": "Отмена изменений в Git",
    "uk": "Відміна змін в Git"
  },
  "hint": {
    "en_US": "Notice that revert and reset take different arguments.",
    "de_DE": "Beachte, dass revert und reset unterschiedliche Argumente benötigen",
    "fr_FR": "Notez que `revert` et `reset` n'ont pas les mêmes arguments.",
    "es_AR": "Notá que revert y reset toman parámetros distintos",
    "pt_BR": "Lembre que revert e reset recebem parâmetros diferentes",
    "gl"   : "Lembra que revert e reset usan parámetros distintos",
    "zh_CN": "注意 revert 和 reset 使用的参数不同。",
    "zh_TW": "注意 revert 和 reset 使用不同的參數。",
    "ko": "revert와 reset이 받는 인자가 다름을 기억하세요",
    "ja"   : "revertとresetとで引数が異なることに注意。",
    "ru_RU": "Обрати внимание, что revert и reset принимают разные параметры.",
    "uk": "Зверни увагу на те що revert та reset приймають різні параметри"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Reversing Changes in Git",
              "",
              "There are many ways to reverse changes in Git. And just like committing, reversing changes in Git has both a low-level component (staging individual files or chunks) and a high-level component (how the changes are actually reversed). Our application will focus on the latter.",
              "",
              "There are two primary ways to undo changes in Git -- one is using `git reset` and the other is using `git revert`. We will look at each of these in the next dialog",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` reverts changes by moving a branch reference backwards in time to an older commit. In this sense you can think of it as \"rewriting history;\" `git reset` will move a branch backwards as if the commit had never been made in the first place.",
              "",
              "Let's see what that looks like:"
            ],
            "afterMarkdowns": [
              "Nice! Git moved the master branch reference back to `C1`; now our local repository is in a state as if `C2` had never happened."
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "While resetting works great for local branches on your own machine, its method of \"rewriting history\" doesn't work for remote branches that others are using.",
              "",
              "In order to reverse changes and *share* those reversed changes with others, we need to use `git revert`. Let's see it in action"
            ],
            "afterMarkdowns": [
              "Weird, a new commit plopped down below the commit we wanted to reverse. That's because this new commit `C2'` introduces *changes* -- it just happens to introduce changes that exactly reverses the commit of `C2`.",
              "",
              "With reverting, you can push out your changes to share with others."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To complete this level, reverse the most recent commit on both `local` and `pushed`. You will revert two commits total (one per branch).",
              "",
              "Keep in mind that `pushed` is a remote branch and `local` is a local branch -- that should help you choose your methods."
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
              "## Revirtiendo cambios en git",
              "",
              "Hay varias maneras de revertir cambios en git. Y, tal como al commitear, revertir cambios en git tiene tanto un componente de bajo nivel (indexar archivos o fragmentos individualmente) como un componente de alto nivel (cómo son efectivamente revertidos los cambios). Nuestra aplicación se va a concentrar en esto último.",
              "",
              "Hay dos formas principales de deshacer cambios en git -- uno es usando `git reset` y el otro es usando `git revert`. Vamos a ver cada uno de esos a continuación",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` revierte los cambios moviendo la referencia de una rama hacia atrás en el tiempo a un commit anterior. En este sentido podés pensarlo como \"reescribir la historia\". `git reset` va a mover la rama hacia atrás, como si el commit nunca se hubiera hecho.",
              "",
              "Veamos cómo es eso:"
            ],
            "afterMarkdowns": [
              "¡Genial! git simplemente movió la referencia de la rama master atrás hacia `C1`. Ahora tu repositorio local está en un estado como si `C2` nunca hubiera ocurrido"
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "Mientras que resetear los cambios funciona genial para ramas locales en tu máquina, su método de \"reescribir la historia\" no funciona para ramas remotas que otros están usando.",
              "",
              "Para revertir cambios y *compartir* esa _revertida_ con otros, necesitamos usar `git revert`. Veámoslo en acción"
            ],
            "afterMarkdowns": [
              "Extraño. Hay un nuevo commit aplicado sobre el que queríamos revertir. Eso es porque este nuevo commit `C2'` introduce *cambios* - sólo que esos cambios son exactamente los necesarios para revertir los que introdujo `C2`.",
              "",
              "Cuando usás revert, podés pushear ese cambio para compartirlo con otros."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, revertí los dos commits más recientes, tanto en `local` como en `pushed`.",
              "",
              "Tené en cuenta que `pushed` es una rama remota y `local` es una rama local -- eso debería ayudarte a elegir qué métodos usar."
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
              "## Revertendo Mudanças no Git",
              "",
              "Existem várias maneiras de reverter mudanças no Git. E assim como o ato de commitar, reverter mudanças no Git também tem um componente de baixo nível (a preparação, ou staging, de arquivos ou trechos de arquivos individuais) e um componente de alto nível (como as mudanças são, de fato, revertidas). Aqui vamos focar neste último ponto.",
              "",
              "Há duas maneiras principais de desfazer mudanças no Git -- uma delas é usando `git reset`, e a outra é usando `git revert`. Vamos olhar cada uma delas na próxima janela",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "O comando `git reset` reverte mudanças movendo para trás no tempo (para um commit mais antigo) a referência do ramo. Desta forma, você pode pensar nessa operação como uma \"reescrita do histórico\"; o `git reset` vai mover o ramo para trás como se o commit nunca tivesse existido.",
              "",
              "Vejamos como funciona:"
            ],
            "afterMarkdowns": [
              "Legal! O Git simplesmente moveu a referência do ramo master de volta para `C1`; agora o nosso repositório local está em um estado como se o `C2` nunca tivesse acontecido"
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "Embora o reset funcione muito bem em ramos locais no seu próprio computador, o método utilizado de \"reescrever o histórico\" não funciona com ramos remotos que outras pessoas estejam usando.",
              "",
              "Para reverter mudanças e conseguir *compartilhar* essas mudanças com os outros, precisamos usar o `git revert`. Vejamo-lo em ação"
            ],
            "afterMarkdowns": [
              "Estranho, um novo commit surgiu abaixo do commit que queríamos reverter. Isso é porque o novo commit `C2'` introduz *mudanças* -- acontece que as mudanças que ele introduz revertem exatamente aquelas do commit `C2`.",
              "",
              "Com o `revert`, você pode fazer `push` das suas mudanças para compartilhá-las com os outros."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nível, reverta os dois commits mais recentes tanto em `local` como em `pushed`.",
              "",
              "Tenha em mente que `pushed` é um ramo remoto, e `local` é um ramo local -- isso deve ajudá-lo a escolher o método apropriado."
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
              "## Revertindo cambios en Git",
              "",
              "Existen varias formas de revertir os cambios en git. E, como cando se fai commit, desfacer cambios supon unha operación de baixo nivel (a indexación de arquivos ou trozos de eles) e unha operación de alto nivel (desfacer os cambios xa aplicados). Aquí ímonos enfocar neste último punto.",
              "",
              "Hai dúas formas de desfacer os cambios en git -- unha delas é `git reset`, e a outra é usando `git revert`. Imos comparalas na próxima ventá.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "O comando `git reset` desfai os cambios movendo a referencia dunha rama cara un commit máis antigo na rama. Desta forma, podes pensar nesta operación como \"reescritura do histórico\"; o `git reset` vai movela rama cara atrás, como se ós commits nunca antes se fixeran.",
              "",
              "Vexamos o seu funcionamento:"
            ],
            "afterMarkdowns": [
              "¡Bye bye! Git moveu a referencia da rama master cara atrás, ata o commit `C1`; agora o teu repositorio local está coma se o commit `C2` nunca acontecera."
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "Mentres que resetear os cambios funciona xenial para as ramas locales na túa máquina, o método utilizado de \"reescribir o histórico\" non funciona con ramas remotas que outra xente usa.",
              "",
              "Para revervir os cambios e *compartir* eses cambios ca outra xente, precisamos usar `git revert`. Atende a cómo funciona"
            ],
            "afterMarkdowns": [
              "Estrano, xurdíu un novo commit por baixo do commit que queriamos desfacer. Iso é porque o novo commit `C2'` engadíu *cambios* -- o que pasa é que o commit desfai exactamente os cambios feitos no commit `C2`.",
              "",
              "Con `revert`, ti podes facer `push` dos teus cambios para compartilos cos outros."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, reverte os dous commits máis recentes tanto en `local` como en `pushed`.",
              "",
              "Ten en mente que `pushed` é unha rama remota, e `local` é unha rama local -- Iso poida que te axude a aplicar o método apropriado."
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
              "## Änderungen in Git rückgängig machen",
              "",
              "Es gibt viele Möglichkeiten, Änderungen in Git zurückzunehmen. Und ebenso wie das Committen hat auch das rückgängig Machen eine Basis-Komponente (Dateien und Inhalte vormerken) und einen übergeordneten Aspekt (wie die Änderungen tatsächlich zurückgenommen werden). Diese Applikation beschäftigt sich wiederum mit den übergeordneten Vorgängen.",
              "",
              "Es gibt grundsätzlich zwei Arten in Git etwas rückgängig zu machen -- einerseits `git reset` und andererseit `git revert`. Wir schauen uns beide mal an.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` nimm Änderungen zurück, indem es eine Branch-Referenz auf einen anderen Commit setzt. Es ist ein bisschen (aber nicht wirklich) wie \"Geschichte umschreiben\"; `git reset` bewegt einen Branch auf einen anderen Commit, als hätte er nie anders ausgesehen.",
              "",
              "Schauen wir, wie das aussieht:"
            ],
            "afterMarkdowns": [
              "Schick! Git hat den `master` einfach auf `C1` gesetzt; unser lokales Repository sieht nun so aus, als hätte `C2` nie stattgefunden."
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "Obwohl `git reset` super im lokalen Kontext funktioniert, ist der Ansatz vom \"Umschreiben\" der Commit-Geschichte nicht geeignet für Branches, die auf einem Server liegen und auch von anderen benutzt werden.",
              "",
              "Um Änderungen rückgängig zu machen und das mit anderen zu *teilen* müssen wir `git revert` benutzen. Schauen wir uns das in Aktion an."
            ],
            "afterMarkdowns": [
              "Komisch, es ist ein neuer Commit entstanden. Das liegt daran, dass `C2'` genau die *Änderungen* enthält, die die Änderungen aus `C2` aufheben.",
              "",
              "Durch Reverten kannst du das Zurücknehmen von Änderungen mit anderen teilen."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level abzuschließen musst du sowohl auf `local` also auch auf `pushed` jeweils die zwei letzten Commits zurücknehmen.",
              "",
              "Vergiss nicht, dass `pushed` auch auf einem Server liegt und `local` ein rein lokaler Branch ist -- das sollte dir helfen, die richtige Methode zu wählen."
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
              "## 変更を元に戻す",
              "",
              "Gitでは変更を元に戻す方法がたくさんあります。コミットと同じように、低レベルな動作（ファイル別だったりファイルの中の一部だったり）も高レベルな動作（変更のまとまりのキャンセル）もできます。このアプリケーションでは後者の方法について紹介します。",
              "",
              "基本的な巻き戻しの方法は2つあります -- 一つは`git reset`を使う方法で、もう1つは`git revert`を使う方法です。次のダイアログで一つ一つを見ていきます。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset`はブランチのポインタを後方に移動することで変更のキャンセルを実現します。履歴を上書きするような動作だと思うと良いでしょうか。`git reset`はそもそも前のコミットなんかなかったかのように、ブランチのポインタを元に戻してくれます。",
              "",
              "どういう感じか見てみましょう。"
            ],
            "afterMarkdowns": [
              "いいですね！Gitは単純にmasterブランチへのポインタを`C1`へ戻しました。これでこのローカルリポジトリにはまるで`C2`なんて無かったかのように変更をキャンセルできました。"
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "自分のマシン上のブランチではさっきの`git reset`でうまくいきましたが、この「履歴を上書きする」手段は、他の人も使っているリモートにあるリポジトリに対しては使うことができません。",
              "",
              "変更を巻き戻して他の人とそれを共有するためには、`git revert`を使う必要があります。今度はこれを見てみましょう。"
            ],
            "afterMarkdowns": [
              "あれ、おかしいな。巻き戻したいと思ってたコミットの下に新しいコミットが出来上がってしまったみたいです。なぜか。これは、この新しい`C2'`コミットは`C2`へ戻すのに必要な内容を確かに変更して巻き戻していたのです。",
              "",
              "こんな風にして、巻き戻した内容を他人と共有するためにはrevertを使います。"
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "この章の仕上げに、`local`と`pushed`の両方の直近のコミットを巻き戻してみましょう。",
              "",
              "`pushed`はリモートのブランチで、`local`はローカルであることに注意。正しくコマンドを使い分けましょう。"
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
              "## Annuler des changements avec Git",
              "",
              "Il y a de nombreuses façons d'annuler des changements avec Git. De même que pour les commits, annuler des changements avec Git est à la fois un aspect bas-niveau (gestion des fichiers et morceaux de fichiers) et un aspect de plus haut niveau (comment les changements sont effectivement annulés). Nous allons nous intéresser à ce dernier point.",
              "",
              "Il y a principalement deux façons d'annuler des changements avec Git : l'une est `git reset` et l'autre est `git revert`. Nous allons maintenant voir chacune de ces façons.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` annule des changements en déplaçant la référence en arrière dans le temps sur un commit plus ancien. En ce sens, on peut considérer cela comme une façon de \"réécrire l'histoire\"; `git reset` fait remonter une branche en arrière comme si le(s) commit(s) n'avait jamais eu lieu.",
              "",
              "Regardons à quoi cela ressemble :"
            ],
            "afterMarkdowns": [
              "Bravo ! Git a simplement déplacé la référence de la branche master en la faisant revenir sur `C1`; désormais notre dépôt est dans le même état que si `C2` n'avait jamais eu lieu"
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "Bien que le reset marche parfaitement pour les branches locales sur notre propre machine, cette façon de \"réécrire l'histoire\" ne marche pas avec les banches distantes (remote) que d'autres personnes utilisent.",
              "",
              "Pour pouvoir annuler des changements et *partager* ces annulations avec d'autres, nous devons utiliser `git revert`. Regardons comment cela fonctionne"
            ],
            "afterMarkdowns": [
              "Étrangement, un nouveau commit est apparu en bas sous le commit que nous voulions annuler. C'est parce que ce nouveau commit `C2'` introduit des *modifications* -- celles qui correspondent justement à l'annulation de celles du commit `C2`.",
              "",
              "Avec revert, vous pouvez diffuser (push) vos modifications et les partager avec tout le monde."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour accomplir ce niveau, annulez les derniers commits à la fois sur `local` et sur `pushed`. Vous devez annuler en tout 2 commits (un pour chaque branche).",
              "",
              "Ayez à l'esprit que `pushed` est une branche distante et `local` est une branche locale ; cela devrait vous guider dans le choix de la méthode à employer."
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
              "## 撤销变更",
              "",
              "在 Git 里撤销变更的方法很多。和提交一样，撤销变更由底层部分（暂存区的独立文件或者片段）和上层部分（变更到底是通过哪种方式被撤销的）组成。我们这个应用主要关注的是后者。",
              "",
              "主要有两种方法用来撤销变更 —— 一是 `git reset`，还有就是 `git revert`。接下来咱们逐个进行讲解。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` 通过把分支记录回退几个提交记录来实现撤销改动。你可以将这想象成“改写历史”。`git reset` 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。",
              "",
              "让我们来看看演示："
            ],
            "command": "git reset HEAD~1",
            "afterMarkdowns": [
              "漂亮! Git 把 master 分支移回到 `C1`；现在我们的本地代码库根本就不知道有 `C2` 这个提交了。",
              "",
              "（译者注：在reset后， `C2` 所做的变更还在，但是处于未加入暂存区状态。）"
            ],
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "虽然在你的本地分支中使用 `git reset` 很方便，但是这种“改写历史”的方法对大家一起使用的远程分支是无效的哦！",
              "",
              "为了撤销更改并**分享**给别人，我们需要使用 `git revert`。来看演示："
            ],
            "command": "git revert HEAD",
            "afterMarkdowns": [
              "奇怪！在我们要撤销的提交记录后面居然多了一个新提交！这是因为新提交记录 `C2'` 引入了**更改** —— 这些更改刚好是用来撤销 `C2` 这个提交的。也就是说 `C2'` 的状态与 `C1` 是相同的。",
              "",
              "revert 之后就可以把你的更改推送到远程仓库与别人分享啦。"
            ],
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成此关，分别撤销 `local` 分支和 `pushed` 分支上的最近一次提交。共需要撤销两个提交（每个分支一个）。",
              "",
              "记住 `pushed` 是远程分支，`local` 是本地分支 —— 这么说你应该知道用分别哪种方法了吧？"
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
              "## 取消 git 的修改",
              "",
              "在 git 裡面取消修改的方法很多。和 commit 一樣，在 git 裡面取消修改同時具有底層的部份（暫存一些獨立的文件或者片段）和高層的部份（修改是如何被取消）。我們主要講的重點是後者。",
              "",
              "在 git 裡主要用兩種方法來取消修改，一種是 `git reset`，另外一種是 `git revert`。讓我們在下一個對話視窗中逐一瞭解它們。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` 把分支的參考點退回到上一個 commit 來取消修改。你可以認為這是在\"重寫歷史\"。`git reset` 往回移動 branch，原來的 branch 所指向的 commit 好像從來沒有存在過一樣。",
              "",
              "讓我們來看看要怎麼操作："
            ],
            "command": "git reset HEAD~1",
            "afterMarkdowns": [
              "太好了! Git 把 master branch 簡單地移回到 `C1`；現在在我們的 local 已經退回到沒有 commit 過 `C2` 的狀態了。"
            ],
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "雖然在你的 local branch 中使用 `git reset` 很方便，但是這種「改寫歷史」的方法對別人的 remote branch 是無效的哦！",
              "",
              "為了取消修改並且把這個狀態*分享*給別人，我們需要使用 `git revert`。舉個例子"
            ],
            "command": "git revert HEAD",
            "afterMarkdowns": [
              "很奇怪吧！在我們要取消的 commit 後面居然多了一個新的 commit！這是因為新的 commit `C2'` 引入了*修改*——用來表示我們取消 `C2` 這個 commit 的修改。",
              "",
              "多虧了 revert，現在可以把你的修改分享給別人啦。"
            ],
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這一關，分別取消 `local` branch 和 `pushed` branch 上的最近的一次 commit。",
              "",
              "記住 `pushed` 是一個 remote branch，`local` 是一個 local branch，有了這麼明顯的提示應該知道要用哪種方法了吧？"
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
              "## Git에서 작업 되돌리기",
              "",
              "Git에는 작업한 것을 되돌리는 여러가지 방법이 있습니다. 변경내역을 되돌리는 것도 커밋과 마찬가지로 낮은 수준의 일(개별 파일이나 묶음을 스테이징 하는 것)과 높은 수준의 일(실제 변경이 복구되는 방법)이 있는데요, 여기서는 후자에 집중해 알려드릴게요.",
              "",
              "Git에서 변경한 내용을 되돌리는 방법은 크게 두가지가 있습니다 -- 하나는 `git reset`을 쓰는거고, 다른 하나는 `git revert`를 사용하는 것입니다. 다음 화면에서 하나씩 알아보겠습니다.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git 리셋(reset)",
              "",
              "`git reset`은 브랜치로 하여금 예전의 커밋을 가리키도록 이동시키는 방식으로 변경 내용을 되돌립니다. 이런 관점에서 \"히스토리를 고쳐쓴다\"라고 말할 수 있습니다. 즉, `git reset`은 마치 애초에 커밋하지 않은 것처럼 예전 커밋으로 브랜치를 옮기는 것입니다.",
              "",
              "어떤 그림인지 한번 보죠:"
            ],
            "afterMarkdowns": [
              "그림에서처럼 master 브랜치가 가리키던 커밋을 `C1`로 다시 옮겼습니다; 이러면 로컬 저장소에는 마치 `C2`커밋이 아예 없었던 것과 마찬가지 상태가 됩니다."
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git 리버트(revert)",
              "",
              "각자의 컴퓨터에서 작업하는 로컬 브랜치의 경우 리셋(reset)을 잘 쓸 수 있습니다만, \"히스토리를 고쳐쓴다\"는 점 때문에 다른 사람이 작업하는 리모트 브랜치에는 쓸 수 없습니다.",
              "",
              "변경분을 되돌리고, 이 되돌린 내용을 다른 사람들과 *공유하기* 위해서는, `git revert`를 써야합니다. 예제로 살펴볼게요."
            ],
            "afterMarkdowns": [
              "어색하게도, 우리가 되돌리려고한 커밋의 아래에 새로운 커밋이 생겼습니다. `C2`라는 새로운 커밋에 *변경내용*이 기록되는데요, 이 변경내역이 정확히 `C2` 커밋 내용의 반대되는 내용입니다.",
              "",
              "리버트를 하면 다른 사람들에게도 변경 내역을 밀어(push) 보낼 수 있습니다."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이 레벨을 통과하려면, `local` 브랜치와 `pushed` 브랜치에 있는 최근 두 번의 커밋을 되돌려 보세요.",
              "",
              "`pushed`는 리모트 브랜치이고, `local`은 로컬 브랜치임을 신경쓰셔서 작업하세요 -- 어떤 방법을 선택하실지 떠오르시죠?"
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
              "## Отмена изменений в Git",
              "",
              "Есть много путей для отмены изменений в Git. Так же как и коммит, отмена изменений в Git возможна и на низком уровне (добавление в коммит отдельных файлов и наборов строк), и на высоком (как изменения реально отменяются). Сейчас сфокусируемся на высокоуровневой части.",
              "",
              "Есть два основных способа отмены изменений в Git: первый - это `git reset`, а второй - `git revert`. Попробуем оба на следующем шаге.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` отменяет изменения, перенося ссылку на ветку назад, на более старый коммит. Это своего рода \"переписывание истории\"; `git reset` перенесёт ветку назад, как будто некоторых коммитов вовсе и не было.",
              "",
              "Посмотрим, как это работает:"
            ],
            "afterMarkdowns": [
              "Неплохо! Git просто перенёс ссылку на `master` обратно на коммит `C1`. Теперь наш локальный репозиторий в состоянии, как будто `C2` никогда не существовал."
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "Reset отлично работает на локальных ветках, в локальных репозиториях. Но этот метод переписывания истории не сработает на удалённых ветках, которые используют другие пользователи.",
              "",
              "Чтобы отменить изменения и поделиться отменёнными изменениями с остальными, надо использовать `git revert`. Посмотрим, как это работает"
            ],
            "afterMarkdowns": [
              "Забавно, появился новый коммит. Дело в том, что новый коммит `C2'` просто содержит изменения, полностью противоположные тем, что сделаны в коммите `C2`.",
              "",
              "После `revert` можно сделать `push` и поделиться изменениями с остальными."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы пройти этот уровень, отмени два последних коммита и в `local`, и в `pushed`",
              "",
              "Помни, что `pushed` - это remote ветка, а `local` - это локальная ветка. Это поможет выбрать способ отмены изменений."
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
              "## Відміна змін в Git",
              "",
              "Є декілька шляхів відмини змін в Git. І так само як і коміти, зміни в гіт можна відміняти використовуючи або низькорівневі методи (додавання в коміт окремих файлів) так і високорівневі. Ми зосередемось на останніх.",
              "",
              "Є два основні шляхи відміни змін в Git -- перший це використовувати `git reset` й інший це `git revert`. В наступному слайді ми подивимося на кожний з них",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Reset",
              "",
              "`git reset` відміняє зміни переміщуючи вказівник гілки назад в історії на старіший коміт. В принципі, можна вважати що це певне \"переписування історії;\" Коли `git reset` перемістить гілку назад буде здаватися, що відмінений коміт взагалі ніколи не створювався.",
              "",
              "Давайте подивимося, як це виглядає:"
            ],
            "afterMarkdowns": [
              "Чудово! Git перемістив посилання гілки master назад до `C1`; тепер наш локальний репозиторій в такому стані, наче коміту `C2` ніколи не було."
            ],
            "command": "git reset HEAD~1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## Git Revert",
              "",
              "Команда reset чудово працює для локальних бранчів на власному комп’ютері, але так як вона спричиняє \"переписування історії\", її не можна використовувати в ситуації коли кілька користувачів працюють з цим бранчем",
              "",
              "Для того щоб відкотити зміни й потім *поділитися* цими відкоченими змінами з друзями, потрібно використовувати `git revert`. Давай подивимось на прикладі"
            ],
            "afterMarkdowns": [
              "Дивно, був створений новий коміт, нижче того коміту який ми хотіли відкотити. Це сталося тому що новий коміт `C2'` містить *зміни*  які повністю протилежні змінам `C2`.",
              "",
              "Після revert, ти зможеш зробити push щоб поділитися гілкою з іншими."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти цей рівень відміни два останні коміти на гілках `local` та `pushed`.",
              "",
              "Зауваж, що `pushed` це віддалена гілка, а `local` це локальна гілка -- це має допомогти з вибором методу."
            ]
          }
        }
      ]
    }
  }
};
