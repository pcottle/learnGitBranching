exports.level = {
  "disabledMap": {
    "git cherry-pick": true,
    "git revert": true
  },
  "compareOnlyMasterHashAgnosticWithAsserts": true,
  "goalAsserts": {
    "master": [
      function(data) {
        return data.C2 > data.C3;
      },
      function(data) {
        return data.C2 > data.C1;
      }
    ]
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%27%22%2C%22id%22%3A%22master%22%7D%2C%22newImage%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22newImage%22%7D%2C%22caption%22%3A%7B%22target%22%3A%22C3%27%27%22%2C%22id%22%3A%22caption%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C2%27%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase -i HEAD~2 --solution-ordering C3,C2;git commit --amend;git rebase -i HEAD~2 --solution-ordering C2'',C3';git rebase caption master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"newImage\":{\"target\":\"C2\",\"id\":\"newImage\"},\"caption\":{\"target\":\"C3\",\"id\":\"caption\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"caption\",\"id\":\"HEAD\"}}",
  "name": {
    "ko": "커밋들 갖고 놀기",
    "en_US": "Juggling Commits",
    "de_DE": "Jonglieren mit Commits",
    "fr_FR": "Jongler avec les commits",
    "es_AR": "Haciendo malabares con los commits",
    "pt_BR": "Malabarismo com commits",
    "gl"   : "Argallando cos commits",
    "ja": "コミットをやりくりする",
    "zh_CN": "提交的技巧 #1",
    "zh_TW": "commit 的戲法",
    "ru_RU": "Жонглируем коммитами",
    "uk": "Жонглюємо комітами"
  },
  "hint": {
    "en_US": "The first command is git rebase -i HEAD~2",
    "de_DE": "Der erste Befehl ist git rebase -i HEAD~2",
    "fr_FR": "La première commande est git rebase -i HEAD~2",
    "es_AR": "El primer comando es git rebase -i HEAD~2",
    "pt_BR": "O primeiro comando é git rebase -i HEAD~2",
    "gl"   : "O primeiro comando é git rebase -i HEAD~2",
    "ja": "最初に打つコマンドはgit rebase -i HEAD~2",
    "ko": "첫번째 명령은 git rebase -i HEAD~2 입니다",
    "zh_CN": "第一个命令是 `git rebase -i HEAD~2`",
    "zh_TW": "第一個命令是 'git rebase -i HEAD~2'",
    "ru_RU": "Первой командой должна быть git rebase -i HEAD~2",
    "uk": "Перша команда має бути git rebase -i HEAD~2"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Juggling Commits",
              "",
              "Here's another situation that happens quite commonly. You have some changes (`newImage`) and another set of changes (`caption`) that are related, so they are stacked on top of each other in your repository (aka one after another).",
              "",
              "The tricky thing is that sometimes you need to make a small modification to an earlier commit. In this case, design wants us to change the dimensions of `newImage` slightly, even though that commit is way back in our history!!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "We will overcome this difficulty by doing the following:",
              "",
              "* We will re-order the commits so the one we want to change is on top with `git rebase -i`",
              "* We will `commit --amend` to make the slight modification",
              "* Then we will re-order the commits back to how they were previously with `git rebase -i`",
              "* Finally, we will move master to this updated part of the tree to finish the level (via the method of your choosing)",
              "",
              "There are many ways to accomplish this overall goal (I see you eye-ing cherry-pick), and we will see more of them later, but for now let's focus on this technique.",
              "Lastly, pay attention to the goal state here -- since we move the commits twice, they both get an apostrophe appended. One more apostrophe is added for the commit we amend, which gives us the final form of the tree ",
              "",
              "That being said, I can compare levels now based on structure and relative apostrophe differences. As long as your tree's `master` branch has the same structure and relative apostrophe differences, I'll give full credit"
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
              "## Jongler avec les commits",
              "",
              "Voici une autre situation fréquente. Vous avez certains changements (`newImage`) et un autre groupe de changements (`caption`) qui sont reliés, ils sont donc empilés l'un sur l'autre dans votre dépôt Git (i.e. l'un après l'autre).",
              "",
              "Là où ça se complique c'est lorsque vous devez faire une petite modification dans un commit antérieur. Dans ce cas, les configurations de  `newImage` devront changer un peu, même si ce commit est loin dans notre historique !!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Nous allons régler le problème en faisant ceci :",
              "",
              "* Nous allons réordonner les commits pour que celui que nous voulions changer soit sur le dessus `git rebase -i`",
              "* Nous allons utiliser `commit --amend` pour faire les petites modifications",
              "* Nous allons réordonner les commits dans l'ordre original avec `git rebase -i`",
              "* Finalement, nous allons déplacer master vers la nouvelle tête de l'arbre (avec la méthode de votre choix)",
              "",
              "Il y a plusieurs façons d'atteindre ce but (cherry-pick semble très tentant), mais nous allons parler de cherry-pick plus tard, pour le moment concentrez-vous sur cette technique.",
              "",
              "Pour terminer, Faites attention au but -- Dû au fait que nous déplaçons les commits 2 fois, ils se retrouvent tous les deux avec une apostrophe. Une deuxième apostrophe est ajoutée sur le commit que nous modifions, ce qui nous donne la forme finale de l'arbre.",
              "",
              "Ceci étant dit, je peux comparer le résultat avec la structure et les différentes apostrophes. Tant que votre arbre `master` a la même structure et les différentes apostrophes le niveau sera considéré réussi."
            ]
          }
        },
      ]
    },
    "es_AR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Haciendo malabares con los commits",
              "",
              "Estaes otra situación algo común. Tenés algunos cambios (`newImage`) y otro conjunto de cambios (`caption`) que están relacionados, entonces están apilados en tu repositorio uno encima del otro (es decir, uno después del otro).",
              "",
              "El tema es que a veces tenés que hacer una pequeña modificación a un commit previo. En este caso, la gente de diseño requiere que cambiemos ligeramente las dimensiones de `newImage`, ¡incluso aunque ese commit ya esté atrás en nuestra historia!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Superaremos esta dificultad haciendo lo siguiente:",
              "",
              "* Vamos a reordenar los commits para que el que queremos cambiar quede arriba de todo con `git rebase -i`",
              "* Vamos a hacer `commit --amend` para aplicar la ligera modificación",
              "* Después vamos a reordenar los commits a como estaban con `git rebase -i`",
              "* Finalmente, vamos a mover master a esta parte actualizada de nuestor árbol de commits para terminar el nivel (usando el método que prefieras)",
              "",
              "Hay varias maneras de lograr este objetivo en general (ya te veo haciéndole ojitos al cherry-pick), y veremos algunos más después, pero por ahora concentrémonos en esta técnica.",
              "",
              "Por último, prestá atención al estado final acá -- como movemos los commits dos veces, ambos quedan con un apóstrofe. El commit que corregimos tiene un apóstrofe extra, y así nos queda nuestro árbol final",
              "",
              "Habiendo dicho eso, puedo comparar los niveles basándome ahora en la estructura y las diferencias relativas de apóstrofes. Mientras que tu rama `master` tenga la misma estructura y diferencias relativas de apóstrofes, te voy a dar el puntaje completo"
            ]
          }
        },
      ]
    },
    "pt_BR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Malabarismo com commits",
              "",
              "Aqui está outra situação que acontece com bastante frequência. Você fez algumas mudanças (`newImage`), além de um outro conjunto de mudanças (`caption`) que são relacionadas, de forma que elas estão empilhadas uma após a outra no seu repositório.",
              "",
              "O complicado é que algumas vezes você precisa fazer uma pequena modificação em um commit mais antigo. Neste caso, o pessoal do design quer que modifiquemos um pouco as dimensões da imagem introduzida em `newImage`, apesar de esse commit estar mais para trás no nosso histórico!!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Superaremos essa dificuldade fazendo o seguinte:",
              "",
              "* Reordenaremos os commits de forma que aquele que desejamos esteja no topo, com `git rebase -i`",
              "* Usaremos o comando `git commit --amend` para fazer uma pequena modificação",
              "* Vamos, então, reordenar os commits na mesma ordem que estavam anteriormente com `git rebase -i`",
              "* Finalmente, moveremos o master para essa parte atualizada da árvore para finalizar o nível (usando o método de sua escolha)",
              "",
              "Há muitas formas de alcançar o objetivo final (eu vejo o cherry-pick passando pela sua mente), e veremos mais delas depois, mas por enquanto foquemos nesta técnica.",
              "",
              "Por último, preste atenção no estado do \"objetivo\" aqui -- como nós movemos os commits duas vezes, ambos ficam com um apóstrofo. Um apóstrofo adicional é colocado no commit que sofreu o \"amend\", o que nos dá a forma final da árvore ",
              "",
              "Tendo dito isto, posso avaliar a resposta baseado na estrutura e nas diferenças relativas de número de apóstrofos. Desde que o ramo `master` da sua árvore tenha a mesma estrutura, e o número de apóstrofos seja igual a menos de uma constante, darei a você todos os pontos para esta tarefa"
            ]
          }
        },
      ]
    },
    "gl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Argallando cos commits",
              "",
              "Aquí está outra situación que acontece con bastante frecuencia. Estás facendo algúns cambios (`newImage`), separado do resto de cambios (`caption`) que están relacionados, deste xeito están apilados un enriba do outro no teu repositorio.",
              "",
              "O complicado é que ás veces, poida que precises facer unha pequena nota nun commit máis antigo. Neste caso, a persoa de deseño quere mudar un pouco as dimensións da imaxe introducida en `newImage`, a pesar de que ese commit está máis abaixo no noso histórico!!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Superamos este problema facendo o seguinte:",
              "",
              "* Reordenaremos os commits seleccionando aqueles que desexamos que estén no cambio, con `git rebase -i`",
              "* Empregaremos o comando `git commit --amend` para facer unha pequena modificación",
              "* Imos, entón, reordear os commits na mesma orde na que estaban anteriormente con `git rebase -i`",
              "* Finalmente, moveremos o master para esa parte atualizada da árbore e así finalizar o nivel (usando o método que máis che pete)",
              "",
              "Hai moitas formas de obter o obxectivo final (eu vexo o cherry-pick pasando pola túa cachola), e verémolo máis adiante, pero agora ímonos centrar nesta técnica.",
              "",
              "Por último, preste atención no estado do \"objectivo\" aquí -- como movemos os commits dúas veces, ambos teñen o apóstrofo sumado. O apóstrofo engádese polo commit que nos correximos (amend), o cal danos a forma final da árbore.",
              "",
              "Contado todo esto, a resposta valídase baseándose na estructura e nos diferentes apóstrofes. Cando a rama `master` teña a mesma estructura, e o número de apóstrofos sexa igual, obterás todos os puntos da tarefa."
            ]
          }
        },
      ]
    },
    "de_DE": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Jonglieren mit Commits",
              "",
              "Eine weitere häufig vorkommende Situation: du hast einige Änderungen in `newImage` und weitere Änderungen in `caption`. Die Änderungen hängen voneinander ab, das heißt in diesem Fall `caption` ist ein Nachfolger von `newImage`.",
              "",
              "Nun kann es vorkommen, dass du einen früheren Commit verändern willst. In unserem Fall will die Design-Abteilung, dass die Abmessungen in `newImage` leicht verändert werden, obwohl das mitten in unserer History liegt!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
            "Um das zu schaffen gehen wir wie folgt vor:",
              "",
              "* Wir sortieren die Commits mit `git rebase -i` so um, dass der, den wir ändern wollen, ganz oben liegt.",
              "* Wir verändern den Commit mit `git commit --amend`.",
              "* Dann sortieren wir die Commit mit einem erneuten `git rebase -i` wieder in die alte Reihenfolge.",
              "* Schließlich aktualisieren wir den `master` auf das Ende unseres fertigen Baums, um diesen Level abzuschließen.",
              "",
              "Es gibt sehr viele Wege um das Endziel dieses Levels zu erreichen (ich sehe, du schielst auf `cherry-pick`) und wir werden uns später noch andere ansehen. Aber für's erste lass uns diese Methode ausprobieren.",
              "",
              "Beachte den geschilderten Zielzustand. Da wir die Commits zweimal umsortieren bekommen sie jedesmal ein Apostroph hinzugefügt (weil sie jedesmal kopiert werden). Ein weiteres Apostroph entsteht durch den `commit --amend`.",
              "",
              "Zuguterletzt noch eine Bemerkung: ich kann Level nur auf Struktur und Apostroph-Differenz prüfen. So lange wie dein `master` am Ende dieselbe Struktur und Apostroph-Differenz aufweist wie der Ziel-`master`, ist der Level bestanden."
            ]
          }
        },
      ]
    },
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## コミットをやりくりする",
              "",
              "開発中に頻繁に起こるケースをもう1つ考えます。ある変更（`newImage`）とまた別の変更（`caption`）があって、それらに依存関係があるとします。この一連の変更が一列に積み重なっているとします。",
              "",
              "ここでトリッキーなのは、以前のコミットに対して微修正をかけなければならないケースがあるということです。今回の教材でも、過去のコミットであるにも関わらず`newImage`ブランチに僅かな修正を加えるような設計の修正が入ったとしましょう。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "この困難な状況を、以下の手順で克服することを考えます：",
              "",
              "* `git rebase -i`を使って順番を変更する。これで、変更をかけたいコミットを一番先頭に持ってくる。",
              "* `commit --amend`コマンドで僅かな変更を行う",
              "* `git rebase -i`コマンドを再度使って、先頭に持ってきていたコミットを元に戻す",
              "* 最後に、レベルクリアのためにmasterブランチを先頭に持ってくる",
              "",
              "クリアのための方法はいくつもありますが（cherry-pickを使うこともできます）、別の回答はまた後程の章で見ることにして、今回は上記の方法でやってみることにしましょう。",
              "",
              "最後に、ゴール時点での状態に気を付けてください。今回2回ほどコミットを動かしますから、コミットへのポインタにはアポストロフィ（'）が追加されます。commit --amendコマンドの実行でできたコミットには更にもう1つのアポストロフィが追加されます。 "
            ]
          }
        },
      ]
    },
    "zh_CN": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 提交的技巧 #1",
              "",
              "接下来这种情况也是很常见的：你之前在 `newImage` 分支上进行了一次提交，然后又基于它创建了 `caption` 分支，然后又提交了一次。",
              "",
              "此时你想对的某个以前的提交记录进行一些小小的调整。比如设计师想修改一下 `newImage` 中图片的分辨率，尽管那个提交记录并不是最新的了。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "我们可以通过下面的方法来克服困难：",
              "",
              "* 先用 `git rebase -i` 将提交重新排序，然后把我们想要修改的提交记录挪到最前",
              "* 然后用 `commit --amend` 来进行一些小修改",
              "* 接着再用 `git rebase -i` 来将他们调回原来的顺序",
              "* 最后我们把 master 移到修改的最前端（用你自己喜欢的方法），就大功告成啦！",
              "",
              "当然完成这个任务的方法不止上面提到的一种（我知道你在看 cherry-pick 啦），之后我们会多点关注这些技巧啦，但现在暂时只专注上面这种方法。",
              "最后有必要说明一下目标状态中的那几个`'` —— 我们把这个提交移动了两次，每移动一次会产生一个 `'`；而 C2 上多出来的那个是我们在使用了 amend 参数提交时产生的，所以最终结果就是这样了。",
              "",
              "也就是说，我在对比结果的时候只会对比提交树的结构，对于 `'` 的数量上的不同，并不纳入对比范围内。只要你的 `master` 分支结构与目标结构相同，我就算你通过。"
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
              "## commit 的戲法",
              "",
              "下面這種情況也是經常出現的。例如你之前已經在 `newImage` branch 上做了一些 commit，然後又開了一個 branch 叫做 `caption` ，並且在上面做了一些相關的 commit ，因此它們看起來是一個接著一個的。",
              "",
              "有點棘手的就是有時候你又想在之前的 commit 裡面做一些修改。在這個例子裡面，我們要去稍微修改一下 `newImage` 所指向的 commit，儘管已經是之前的 commit 了 。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "為了克服這個困難，我們可以按照下面的方法來做：",
              "",
              "* 先用 `git rebase -i` 將 commit 重新排序，然後把我們想要修改的 commit 移到最前面",
              "* 然後用 `commit --amend` 來進行一些修改",
              "* 接著再用 `git rebase -i` 來將他們按照最開始的順序重新排好",
              "* 最後我們把 master 移到這個修改的最前端（用你自己喜歡的方法），就大功告成啦！",
              "",
              "當然還有許多方法可以完成這個任務（我知道你在想 cherry-pick 啦），之後我們會多點關注這些技巧啦，但現在暫時只注意上面這種方法。",
              "",
              "啊！最後還要提醒你一下最後所產生的 commit tree，因為我們把 commit 移動了兩次，所以會分別產生一個 apostrophe(單引號） commit。還有一個 apostrophe commit 是因為我們修改 commit 而加進來的。"
            ]
          }
        },
      ]
    },
    "ko": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 커밋들 갖고 놀기",
              "",
              "이번에도 꽤 자주 발생하는 상황입니다. `newImage`와 `caption` 브랜치에 각각의 변경내역이 있고 서로 약간 관련이 있어서, 저장소에 차례로 쌓여있는 상황입니다.",
              "",
              "때로는 이전 커밋의 내용을 살짝 바꿔야하는 골치아픈 상황에 빠지게 됩니다. 이번에는 디자인 쪽에서 우리의 작업이력(history)에서는 이미 한참 전의 커밋 내용에 있는 `newImage`의 크기를 살짝 바꿔달라는 요청이 들어왔습니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이 문제를 다음과 같이 풀어봅시다:",
              "",
              "* `git rebase -i` 명령으로 우리가 바꿀 커밋을 가장 최근 순서로 바꾸어 놓습니다",
              "* `commit --amend` 명령으로 커밋 내용을 정정합니다",
              "* 다시 `git rebase -i` 명령으로 이 전의 커밋 순서대로 되돌려 놓습니다",
              "* 마지막으로, master를 지금 트리가 변경된 부분으로 이동합니다. (편하신 방법으로 하세요)",
              "",
              "이 목표를 달성하기 위해서는 많은 방법이 있는데요(체리픽을 고민중이시죠?), 체리픽은 나중에 더 살펴보기로 하고, 우선은 위의 방법으로 해결해보세요.",
              "",
              "최종적으로, 목표 결과를 눈여겨 보세요 -- 우리가 커밋을 두 번 옮겼기 때문에, 두 커밋 모두 따옴표 표시가 붙어있습니다. 정정한(amend) 커밋은 따옴표가 추가로 하나 더 붙어있습니다."
            ]
          }
        },
      ]
    },
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Жонглируем коммитами",
              "",
              "Вот ещё одна ситуация, которая часто случается. Есть некоторые изменения (`newImage`) и другие изменения (`caption`), которые связаны так, что находятся друг поверх друга в репозитории.",
              "",
              "Штука в том, что иногда нужно внести небольшие изменения в более ранний коммит. В таком случае надо немного поменять `newImage`, несмотря на то, что коммит уже в прошлом!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Преодолеть эти трудности можно следующим образом:",
              "",
              "* Переставить коммит так, чтобы нужный находился наверху при помощи `git rebase -i`",
              "* Внести изменения при помощи `commit --amend`",
              "* Переставить всё обратно при помощи `git rebase -i`",
              "* И наконец, переместить master на изменённую часть дерева, чтобы закончить уровень.",
              "",
              "Это задание можно выполнить несколькими способами (и, гляжу, ты посматриваешь на cherry-picking), но сейчас сосредоточься на вышеописанном методе.",
              "",
              "Обрати внимание на итоговое состояние в этом уровне – так как мы дважды перемещаем коммиты, оба они получат по апострофу. Ещё один апостроф добавляется, когда мы делаем `commit --amend`.",
              "",
              "Важно, чтобы совпадало не только дерево коммитов, но и количество апострофов."
            ]
          }
        },
      ]
    },
    "uk": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Жонглюємо комітами",
              "",
              "Ось інша ситуація, що доволі часто трапляється. В тебе є якісь зміни (`newImage`) та ще якийсь набір комітів (`caption`), які зв’язані між собою, тому вони знаходяться один над одним в твоєму репозиторії (або один за одним).",
              "",
              "Штука в тому що іноді потрібно зробити невелику модифікацію до попереднього коміту. В цьому випадку, дизайнери хочуть щоб ми трохи змінили розміри `newImage`, не зважаючи на те, що цей коміт знаходиться досить глибоко в історії!!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ми поборимо цю складність наступним чином:",
              "",
              "* Ми відсортуємо коміти таким чином, щоб той, який ми хочемо змінити, був останнім за допомогою `git rebase -i`",
              "* Ми виконаємо `commit --amend` щоб внести невелику правку до останнього коміту",
              "* Тоді ми відсортуємо коміти в попередньому порядку, за допомогою `git rebase -i`",
              "* І на останок, ми пересунемо master на змінену частину дерева щоб закінчити цей рівень(ти можеш вибрати метод)",
              "",
              "Насправді є кілька способів як виконати поставлену задачу (Я бачу, ти поглядаєш на cherry-pick), і ми розберемося з ними всіма трохи пізніше, але зараз скористаймося саме цим методом.",
              "Зверни увагу на фінальний стан в цьому рівні -- позаяк ми перемістили коміти двічі, кожен з них отримає по апострофу. Ще один апостроф додасться коли ми виконаємо commit --amend.",
              "",
              "Враховуючи сказане вище, я буду порівнювати дерево як за назвою коміта, так і за кількістю апострофів. Щойно дерево цілей та master співпадуть, ти пройдеш цей рівень."
            ]
          }
        }
      ]
    }
  }
};
