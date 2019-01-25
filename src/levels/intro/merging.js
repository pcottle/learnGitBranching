exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C2\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\",\"C2\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git checkout -b bugFix;git commit;git checkout master;git commit;git merge bugFix",
  "name": {
    "en_US": "Merging in Git",
    "de_DE": "Mergen in git",
    "es_AR": "Mergeando en Git",
    "pt_BR": "Merge no Git",
    "gl"   : "Merge en Git",
    "fr_FR": "Faire des 'merge' (fusions de branches) avec Git",
    "ko": "Git에서 브랜치 합치기(Merge)",
    "ja"　　　: "ブランチとマージ",
    "zh_CN": "Git Merge",
    "zh_TW": "git 中的 merge",
    "ru_RU": "Слияния веток в Git",
    "uk": "Злиття гілок в Git"
  },
  "hint": {
    "en_US": "Remember to commit in the order specified (bugFix before master)",
    "de_DE": "Denk dran in der angegebenen Reihenfolge zu committen (erst bugFix, dann master)",
    "ja"　　　: "指示された順番でコミットすること（masterの前にbugFixで）",
    "es_AR": "Acordate de commitear en el orden especificado (bugFix antes de master)",
    "pt_BR": "Lembre-se de commitar na ordem especificada (bugFix antes de master)",
    "gl"   : "Lembrate de facer commit na orde específica (bugFix antes de master)",
    "fr_FR": "Pensez à faire des commits dans l'ordre indiqué (bugFix avant master)",
    "zh_CN": "要按目标窗口中指定的顺序进行提交（bugFix 先于 master）",
    "zh_TW": "記住按指定的順序 commit（bugFix 比 master 優先）",
    "ko": "말씀드린 순서대로 커밋해주세요 (bugFix에 먼저 커밋하고 master에 커밋)",
    "ru_RU": "Не забудь делать коммиты в правильном порядке (сначала bugFix, потом master)",
    "uk": "Не забудь робити коміти в правильному порядку (спочатку bugFix, а вже потім master)"
  },
  "disabledMap": {
    "git revert": true
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Branches and Merging",
              "",
              "Great! We now know how to commit and branch. Now we need to learn some kind of way of combining the work from two different branches together. This will allow us to branch off, develop a new feature, and then combine it back in.",
              "",
              "The first method to combine work that we will examine is `git merge`. Merging in Git creates a special commit that has two unique parents. A commit with two parents essentially means \"I want to include all the work from this parent over here and this one over here, *and* the set of all their parents.\"",
              "",
              "It's easier with visuals, let's check it out in the next view"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here we have two branches; each has one commit that's unique. This means that neither branch includes the entire set of \"work\" in the repository that we have done. Let's fix that with merge.",
              "",
              "We will `merge` the branch `bugFix` into `master`"
            ],
            "afterMarkdowns": [
              "Woah! See that? First of all, `master` now points to a commit that has two parents. If you follow the arrows up the commit tree from `master`, you will hit every commit along the way to the root. This means that `master` contains all the work in the repository now.",
              "",
              "Also, see how the colors of the commits changed? To help with learning, I have included some color coordination. Each branch has a unique color. Each commit turns a color that is the blended combination of all the branches that contain that commit.",
              "",
              "So here we see that the `master` branch color is blended into all the commits, but the `bugFix` color is not. Let's fix that..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's merge `master` into `bugFix`:"
            ],
            "afterMarkdowns": [
              "Since `bugFix` was an ancestor of `master`, git didn't have to do any work; it simply just moved `bugFix` to the same commit `master` was attached to.",
              "",
              "Now all the commits are the same color, which means each branch contains all the work in the repository! Woohoo!"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To complete this level, do the following steps:",
              "",
              "* Make a new branch called `bugFix`",
              "* Checkout the `bugFix` branch with `git checkout bugFix`",
              "* Commit once",
              "* Go back to `master` with `git checkout`",
              "* Commit another time",
              "* Merge the branch `bugFix` into `master` with `git merge`",
              "",
              "*Remember, you can always re-display this dialog with \"objective\"!*"
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
              "## Branches und Mergen",
              "",
              "Super! Wir wissen jetzt, wie man committet und einen Branch anlegt. Jetzt müssen wir nur noch rauskriegen, wie man die Arbeit, die in verschiedenen Branches steckt, zusammenführen kann. Dann können wir einen neuen Branch erstellen, darin ein neues Feature entwickeln, und das dann in den ursprünglichen Branch integrieren.",
              "",
              "Die einfachste Methode, mit der man Branches zusammenführen kann, ist `git merge`. Das Mergen erzeugt in git einen speziellen Commit, der zwei Vorgänger hat. Ein solcher Commit bedeutet im Prinzip \"ich möchte alle Arbeit von dem Vorgänger hier und dem dort *und* allen ihren jeweiligen Vorgängern miteinander kombinieren\".",
              "",
              "Grafisch dargestellt ist es einfacher zu verstehen, lass es uns mal ansehen"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hier haben wir zwei Branches; jeder besteht jeweils aus einem eigenen Commit. Das bedeutet, dass keiner der beiden Branches alle Inhalte des gesamten Repositorys kennt. Das werden wir mit einem Merge ändern.",
              "",
              "Wir werden den Branch `bugFix` in `master` integrieren"
            ],
            "afterMarkdowns": [
              "Wow! Hast du das gesehen? Zunächst mal zeigt `master` jetzt auf einen Commit mit zwei Vorgängern. Wenn du den beiden Pfeilen immer weiter folgst, kommst du an jedem Commit im Repository vorbei. Das heißt `master` enthält jetzt alles, was es im Repository gibt.",
              "",
              "Siehst du außerdem wie sich die Farben der Commits verändert haben? Um die Vorgänge zu verdeutlichen hab ich etwas Farbe ins Spiel gebracht. Jeder Branch hat seine eindeutige Farbe. Jeder Merge Commit bekommt als Farbe eine Mischung aus den Farben seiner Vorgänger.",
              "",
              "Wir sehen also, dass die Farbe des Branch `master` in alle Commits gemischt wurde, die von `bugFix` aber nicht. Ändern wir das ..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Mergen wir `master` in `bugFix`:"
            ],
            "afterMarkdowns": [
              "Da `bugFix` ein Vorgänger von `master` war, musste git hier kaum etwas tun; es verschiebt `bugFix` einfach auf den Commit, auf den auch `master` zeigt.",
              "",
              "Jetzt haben alle Commits dieselbe Farbe, das heißt jeder Branch enthält die Informationen des gesamten Repositorys! Juhu!"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Führe folgendes aus, um diesen Level zu schaffen:",
              "",
              "* Lege einen neuen Branch `bugFix` an",
              "* Checke `bugFix` aus mittels `git checkout bugFix`",
              "* Mach einen Commit",
              "* Geh mit `git checkout` zum `master` zurück",
              "* Mach noch einen Commit",
              "* Merge den Branch `bugFix` in `master` mit `git merge`",
              "",
              "*Denk dran, du kannst diese Meldung mit dem Befehl `objective` so oft anzeigen, wie du willst!*"
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
              "## ブランチとマージ",
              "",
              "いい調子ですね。これまでにコミットとブランチについて学びました。そろそろ2つのブランチを1つにまとめるやり方について見ていきましょう。これができれば新しい機能の開発のために新しいブランチを切って、開発が終わったら変更を元のブランチへ統合することができるようになります。",
              "",
              "はじめに紹介するのは、`git merge`を使ったマージのやり方です。mergeコマンドによって、2つの独立した親を持つ特別なコミットを作ることができます。2つの親を持つコミットが持つ意味とは、「全く別々の場所にいる2つの親（*かつ*、それらの親の祖先全て）が持つ全ての変更を含んでいますよ」ということです。",
              "",
              "見てみた方が早いので、次の画面で確認してみましょう。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "それぞれ別のコミットを指している2つのブランチがあります。変更が別々のブランチに分散していて統合されていないケースです。これをマージで1つにまとめてみましょう。",
              "",
              "`bugFix`ブランチを`master`ブランチにマージしてみます。"
            ],
            "afterMarkdowns": [
              "わあ、見ましたか？まず初めに、`master`ブランチが2つのコミットを親に持つ新しいコミットを指してますね。`master`から親をたどっていくと、最も古いコミットにたどり着くまでに全てのコミットを含んでいる様が確認できます。これで、全ての変更を含む`master`が完成しました。",
              "",
              "色がどう変わったかにも注目して下さい。学習を助けるために、ブランチ毎に色をつけています。それぞれのブランチは自分の色を持っていて、どのブランチから派生して出てくるか次第でコミットごとの色が決まります。",
              "",
              "今回のコミットには`master`ブランチの色が使われました。しかし`bugFix`ブランチの色がまだ変わってないようなので、これを変えてみましょう。"
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`master`ブランチを`bugFix`ブランチにマージしてみます。"
            ],
            "afterMarkdowns": [
              "`bugFix`ブランチは`master`ブランチの派生元だったので、gitは実際大したことはしていません。`bugFix`ブランチを指していたポインタを`master`が指していたコミットへと移動させただけです。",
              "",
              "これで全てのコミットが同じ色になりました。つまり、リポジトリの中の全ての変更をそれぞれのブランチが持ったことになります。やったね！"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "以下の作業で理解度の確認をしてみましょう:",
              "",
              "* `bugFix`という名前で新しいブランチを切る",
              "* `git checkout bugFix`コマンドで`bugFix`ブランチに切り替える",
              "* 一回だけコミット",
              "* `git checkout`で`master`へ戻る",
              "* もう1回コミットする",
              "* `git merge`コマンドを使って、`bugFix`ブランチを`master`ブランチへとマージする",
              "",
              "*注：\"objective\"コマンドでこのヘルプにいつでも戻ってこれます*"
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
              "## Mergeando ramas",
              "",
              "¡Genial! Ya sabemos cómo commitear y cómo crear ramas. Ahora tenemos que aprender algún modo de unificar el trabajo de dos ramas diferentes.  Esto nos va a permitir abrir una nueva rama de desarrollo, implementar alguna nueva funcionalidad, y después unirla de nuevo con el trabajo principal.",
              "",
              "El primer método para combinarlas que vamos a explorar es `git merge`. Mergear en Git crea un commit especial que tiene dos padres diferentes. Un commit con dos padres escencialmente significa \"Quiero incluir todo el trabajo de este padre de acá y este otro padre de acá, *y* del conjunto de todos sus ancestros\"",
              "",
              "Es más simple visualizarlo, veámoslo a continuación"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Acá tenemos dos ramas, y cada una tiene un commit que le es único. Esto significa que ninguna de las ramas incluye \"todo el trabajo\" que hay en nuestro repositorio. Hagamos un merge para solucionar eso.",
              "",
              "Vamos a `merge`ar la rama `bugFix` a `master`"
            ],
            "afterMarkdowns": [
              "¡Wooow! ¿Viste eso? Primero que nada, `master` ahora apunta a un commit que tiene dos padres. Si seguís las flechas por el árbol de commits empezando desde `master` vas a cruzarte con cada commit del repositorio hasta llegar a la raíz. Esto significa que `master` ahora contiene todo el trabajo que hay en el repositorio.",
              "",
              "Además, ¿viste cómo cambiaron los colores de los commits? Para ayudar al aprendizaje, incluí algunas convenciones de colores. Cada rama tiene un color propio. Cada commmit se vuelve del color resultante de mezclar los colores de todas las ramas que lo contienen.",
              "",
              "Así que acá vemos que el color de la rama `master` participa en la mezcla de todos los commits, pero que el de `bugFix` no. Arreglemos eso..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Mergeemos `master` a `bugFix`:"
            ],
            "afterMarkdowns": [
              "Como `bugFix` era un ancestro de `master`, git no tuvo que hacer ningún trabajo; simplemente movió `bugFix` al mismo commit al que estaba anexado `master`.",
              "",
              "Ahora todos los commits son del mismo color, lo que significa que cada rama contiene todo el trabajo que hay en el repositorio. ¡Wiii!"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, seguí estos pasos:",
              "",
              "* Creá una nueva rama, llamada `bugFix`",
              "* Checkouteá la rama `bugFix` usando `git checkout bugFix`",
              "* Hacé un commit",
              "* Volvé a `master` con `git checkout`",
              "* Hacé otro commit",
              "* Mergeá la rama `bugFix` a `master` usando `git merge`",
              "",
              "*Acordate: siempre podés volver a ver este mensaje tipeando \"objective\"!*"
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
              "## Branches e Merge",
              "",
              "Ótimo! Agora sabemos como commitar e criar ramos. Agora precisamos aprender uma forma de combinar o trabalho de dois ramos diferentes. Isso nos permitirá ramificar, desenvolver um novo recurso, e então combiná-lo de volta.",
              "",
              "O primeiro método para combinar trabalho que vamos examinar é o `git merge`. O merge do Git cria um commit especial que possui dois pais únicos. Um commit com dois pais essencialmente significa \"Quero incluir todo o trabalho deste pai aqui com o daquele outro pai ali, *e* com o do conjunto de todos os seus ancestrais.\"",
              "",
              "É mais fácil com uma visualização, vamos ver logo a seguir"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aqui nós temos dois ramos; cada um tem um commit que é único. Isso significa que nenhum ramo inclui o conjunto do \"trabalho\" que foi realizado no repositório. Vamos consertar isso com um merge.",
              "",
              "Vamos juntar o ramo `bugFix` no `master`"
            ],
            "afterMarkdowns": [
              "Uau! Viu isso? Antes de tudo, o `master` agora aponta para um commit que possui dois pais. Se você seguir as setas subindo a árvore de commits a partir do `master`, você será capaz de encontrar, ao longo do caminho até a raiz, qualquer um dos commits. Isso significa que o `master` contém todo o trabalho realizado no repositório até o momento.",
              "",
              "Além disso, viu como as cores dos commits mudaram? Para ajudá-lo a aprender, eu incluí uma legenda. Cada ramo tem uma cor única. Cada commit tem a cor resultante da mistura das cores de todos os ramos que o contém.",
              "",
              "Aqui vemos que a cor do ramo `master` está misturada em todos os commits, mas a cor do `bugFix` não está. Vamos corrigir isso..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos juntar o `master` no `bugFix`:"
            ],
            "afterMarkdowns": [
              "Como o `bugFix` é um ancestral do `master`, o git não teve trabalho nenhum; ele só precisou mover o `bugFix` para o mesmo commit do `master`.",
              "",
              "Agora todos os commits possuem a mesma cor, o que significa que ambos os ramos contém todo o trabalho realizado no repositório! Eba!"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nível, faça o seguinte:",
              "",
              "* Crie um novo ramo chamado `bugFix`",
              "* Faça checkout no ramo `bugFix` com `git checkout bugFix`",
              "* Faça um commit",
              "* Volte ao `master` com `git checkout`",
              "* Faça um novo commit",
              "* Junte o ramo `bugFix` no `master` com `git merge`",
              "",
              "*Lembre-se, você pode sempre mostrar esta mensagem novamente com o comando \"objective\"!*"
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
              "## Ramas e merges",
              "",
              "¡Xenial! Agora sabemos como facer commits e crear ramas. Agora precisamos aprender unha forma de combinar o traballo de dúas ramas diferentes. Iso permitiríanos ramificar, facer un novo cambio, e entón mesturalo de volta.",
              "",
              "O primeiro comando para mesturar o traballo que imos ver é `git merge`. O merge de Git crea un commit especial que ten dous pais únicos. Un commit con dous pais significa \"Quero incluír todo o traballo deste pai cos cambios do outro pai, *e* o conxunto de tódolos ancestros.\"",
              "",
              "É máis doado con unha visualización, ímolo ver na seguinte vista."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aquí nos temos dúas ramas; cada unha ten un commit que é único. Isto significa que ningunha rama inclúe o conxunto de \"traballo\" feito no noso repositorio. Imos arranxar esto cun merge.",
              "",
              "Imos xuntar a rama `bugFix` na `master`"
            ],
            "afterMarkdowns": [
              "¡Uah! ¿Viches? Antes de todo, `master` agora apunta a un commit que ten dous pais. Se ti sigues as frechas subindo a árbore de commits a partir de `master`, serás capaz de ver tódolos commits ata a raíz, calquera de eles. Isto significa que a rama `master` contén todo o traballo realizado no repositorio ata ese momento.",
              "",
              "Ademáis, ¿viches como cambiaron as cores dos commits? Para axudarte a aprender, hai unha lenda. Cada rama ten unha única cor. Cada commit ten a cor resultante de mesturar as cores de tódalas ramas que contén.",
              "",
              "Aquí vemos que a  rama `master` está mesturada en todos os commits, pero a cor da rama `bugFix` non o está. Imos arranxar eso..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Imos mesturar a rama `master` en `bugFix`:"
            ],
            "afterMarkdowns": [
              "Como o `bugFix` é un ancestro de `master`, o git non ten traballo que facer; el só ten que mover o punteiro de `bugFix` para o mesmo commit que `master`.",
              "",
              "Agora tódolos commits teñen a mesma cor, o que significa que ambas ramas teñen o mesmo traballo no repositorios! Iepa!"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, fai o seguinte:",
              "",
              "* Crea unha nova ramara chamada `bugFix`",
              "* Fai checkout da rama `bugFix` con `git checkout bugFix`",
              "* Fai un commit",
              "* Volve á rama `master` con `git checkout`",
              "* Fai un novo commit",
              "* Xunta a rama `bugFix` en `master` con `git merge`",
              "",
              "¡Recorda, podes amosar esta mensaxe novamente co comando \"objective\"!"
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
              "## Branches et Merges",
              "",
                "Super ! Nous savons désormais comment faire des commits et des branches. Maintenant nous devons apprendre comment combiner ensemble les contenus de deux branches différentes. Ceci nous permettra de créer une nouvelle branche, développer une nouvelle fonctionnalité sur cette dernière, puis intégrer cette fonctionnalité en combinant le contenu de cette branche de développement à la branche d'origine (master par exemple).",
              "",
              "La première méthode que nous allons voir pour combiner le contenu de deux branches est `git merge`. Faire un 'merge' avec Git crée un commit spécial qui a deux parents. Un commit avec deux parents indique en susbtance \"Je veux inclure le contenu de ce parent et le contenu de cet autre parent, *et* l'ensemble de leurs parents.\"",
              "",
              "C'est plus facile en visualisant, regardons dans la vue suivante"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ici nous avons deux branches ; chacune a un commit qui lui est propre. Cela signifie qu'aucune des deux branches n'inclut la totalité du \"travail\" qui a été fait dans le dépôt. Arrangeons-cela avec merge.",
              "",
              "Nous allons `merge` («fusionner») la branche `bugFix` dans `master`"
            ],
            "afterMarkdowns": [
              "Youhou ! Vous avez vu ça ? Avant tout, `master` pointe donc maintenant sur un commit qui a deux parents. Si vous remontez l'enchaînement des flèches depuis `master`, vous allez passez par tous les commits jusqu'à la racine. Cela signifie que `master` contient maintenant tout le travail du dépôt.",
              "",
              "Par ailleurs, avez-vous remarqué les nouvelles couleurs des commits ? Pour faciliter l'apprentissage, j'ai inclus une certaine logique dans la coloration. Chaque branche a une unique couleur. Chaque commit est de la couleur de toutes les branches qui le contiennent.",
              "",
              "Ici nous voyons que la couleur de `master` est intégrée à tous les commits, sauf ceux de `bugFix`. Réparons-cela ..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Faisons un merge  de `master` dans `bugFix`:"
            ],
            "afterMarkdowns": [
              "Puisque `bugFix` était un descendant de `master`, git n'avait aucun travail à effectuer; il a simplement déplacé `bugFix` au même commit auquel `master` est attaché.",
              "",
              "Maintenant tous les commits sont de la même couleur, ce qui indique que chaque branche contient tout le contenu du dépôt ! Woohoo!"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour accomplir ce niveau, effectuez les opérations suivantes :",
              "",
              "* Faites une nouvelle branche appelée `bugFix`",
              "* Positionnez-vous sur la branche `bugFix` avec `git checkout bugFix`",
              "* Faites un commit",
              "* Retournez sur la branche `master` (commande `git checkout`)",
              "* Faites un nouveau commit",
              "* Fusionnez la branche `bugFix` dans `master` avec `git merge`",
              "",
              "*Rappelez-vous que vous pouvez à tout moment réafficher ces indications avec \"objective\"!*"
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
              "## 分支与合并",
              "",
              "太好了! 我们已经知道如何提交以及如何使用分支了。接下来咱们看看如何将两个分支合并到一起。就是说我们新建一个分支，在其上开发某个新功能，开发完成后再合并回主线。",
              "",
              "咱们先来看一下第一种方法 —— `git merge`。在 Git 中合并两个分支时会产生一个特殊的提交记录，它有两个父节点。翻译成自然语言相当于：“我要把这两个父节点本身及它们所有的祖先都包含进来。”",
              "",
              "通过图示更容易理解一些，咱们到下一页看一下。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我们准备了两个分支，每个分支上各有一个独有的提交。这意味着没有一个分支包含了我们修改的所有内容。咱们通过合并这两个分支来解决这个问题。",
              "",
              "我们要把 `bugFix` 合并到 `master` 里"
            ],
            "command": "git merge bugFix",
            "afterMarkdowns": [
              "哇哦！看见了吗？首先，`master` 现在指向了一个拥有两个父节点的提交记录。假如从 `master` 开始沿着箭头向上看，在到达起点的路上会经过所有的提交记录。这意味着 `master` 包含了对代码库的所有修改。↓↓↓",
              "",
              "还有，看见各个提交记录的颜色变化了吗？为了帮助学习理解，我引入了颜色搭配。每个分支都有不同的颜色，而每个提交记录的颜色是所有包含该提交记录的分支的颜色混合之后的颜色。",
              "",
              "所以，`master` 分支的颜色被混入到所有的提交记录，但 `bugFix` 没有。下面咱们让它也改变一下颜色。"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "咱们再把 `master` 分支合并到 `bugFix`："
            ],
            "command": "git checkout bugFix; git merge master",
            "afterMarkdowns": [
              "因为 `master` 继承自 `bugFix`，Git 什么都不用做，只是简单地把 `bugFix` 移动到 `master` 所指向的那个提交记录。",
              "",
              "现在所有提交记录的颜色都一样了，这表明每一个分支都包含了代码库的所有修改！大功告成！"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要想通过这一关，需要以下几步：",
              "",
              "* 创建新分支 `bugFix`",
              "* 用 `git checkout bugFix` 命令切换到该分支",
              "* 提交一次",
              "* 用 `git checkout master` 切换回 `master`",
              "* 再提交一次",
              "* 用 `git merge` 把 `bugFix` 合并到 `master`",
              "",
              "* 你随时都可以用“objective”命令来打开这个对话框！*"
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
              "## branch 以及 merge",
              "",
              "太好了! 我們已經知道怎麼使用 commit 和 branch 了。接下來要學的一招是如何合併（merge）兩個不同 branch 的工作。這讓我們可以建立一個新的 branch ，並且在上面開發新功能，然後合併回 master branch。",
              "",
              "`git merge` 是我們要學習 merge 的第一個方法。該 merge 會產生一個特殊的 commit，它包含兩個唯一 parent commit。一個 commit 如果有兩個 parent commit 的話，那就表示：「我想把這兩個 parent commit 本身及它們的 所有的 parent commit 都包含進來。」",
              "",
              "有圖有真相，看看下面的圖就明白了。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "在這裡，我們有兩個 branch：各自都有一個唯一的 commit。這意味著沒有一個 branch 包含我們對文件的所有修改。讓我們 merge 這兩個 branch 來解決這個問題。",
              "",
              "我們要 merge `bugFix` 到 `master` "
            ],
            "command": "git merge bugFix",
            "afterMarkdowns": [
              "哇！看見了沒有？首先，`master` 現在指向一個 commit，這個 commit 有兩個 parent commit。假如從 `master` 開始沿著箭頭向上走，在到達起點的路上會經過所有的 commit。這說明了現在 `master` 紀錄了對文件的所有修改。",
              "",
              "還有，看見各個 commit 的顏色變化了嗎？為了幫助學習，我混合了顏色。每個 branch 都有特定的顏色。每個 commit 的顏色都變成了含有此 commit 的所有 branch 的混合色。",
              "",
              "所以，`master` branch 的顏色被混入到所有的 commit，但 `bugFix` 沒有。接下來就改一下這裡吧。"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們 merge  `master` branch 到 `bugFix` 吧。"
            ],
            "command": "git checkout bugFix; git merge master",
            "afterMarkdowns": [
              "因為 `bugFix` branch只是 `master` branch 的 parent，git 什麼都不用做，只是簡單地把 `bugfix` branch 移動到 `master` 指向的 commit。",
              "",
              "現在所有的 commit 的顏色都是一樣的啦，這表示每一個 branch 都包含了所有文件的修改！太厲害了啦！"
            ],
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "想完成這一關，執行以下的操作：",
              "",
              "* 建立新的 branch，叫做 `bugFix` ",
              "* 用 `git checkout bugFix` 切換到 `bugFix` branch",
              "* commit 一次",
              "* 用 `git checkout` 切換回 `master` branch",
              "* 再 commit 一次",
              "* 用 `git merge`  將 `bugFix` merge 到 `master`",
              "",
              "*記住，你可以用 \"objective\" 指令來重新顯示這個對話框！*"
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
              "## 브랜치와 합치기(Merge)",
              "",
              "좋습니다! 지금까지 커밋하고 브랜치를 만드는 방법을 알아봤습니다. 이제 두 별도의 브랜치를 합치는 몇가지 방법을 알아볼 차례입니다. 이제부터 배우는 방법으로 브랜치를 따고, 새 기능을 개발 한 다음 합칠 수 있게 될 것입니다.",
              "",
              "처음으로 살펴볼 방법은 `git merge`입니다. Git의 합치기(merge)는 두 개의 부모(parent)를 가리키는 특별한 커밋을 만들어 냅니다. 두개의 부모가 있는 커밋이라는 것은 \"한 부모의 모든 작업내역과 나머지 부모의 모든 작업, *그리고* 그 두 부모의 모든 부모들의 작업내역을 포함한다\"라는 의미가 있습니다. ",
              "",
              "그림으로 보는게 이해하기 쉬워요. 다음 화면을 봅시다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "여기에 브랜치가 두 개 있습니다. 각 브랜치에 독립된 커밋이 하나씩 있구요. 그 말은 이 저장소에 지금까지 작업한 내역이 나뉘어 담겨 있다는 얘기입니다. 두 브랜치를 합쳐서(merge) 이 문제를 해결해 볼까요?",
              "",
              "`bugFix` 브랜치를 `master` 브랜치에 합쳐(merge) 보겠습니다."
            ],
            "afterMarkdowns": [
              "보셨어요? 우선, `master`가 두 부모가 있는 커밋을 가리키고 있습니다. ",
              "",
              "또, 커밋들의 색이 바뀐 것을 눈치 채셨나요? 이해를 돕기위해 색상으로 구분해 표현했습니다. 각 브랜치는 그 브랜치만의 색상으로 그렸습니다. 브랜치가 합쳐지는 커밋의 경우에는, 그 브랜치들의 색을 조합한 색상으로 표시 했습니다.",
              "",
              "그런식으로 여기에 `bugFix`브랜치 쪽을 제외한 나머지 커밋만 `master` 브랜치의 색으로 칠해져 있습니다. 이걸 고쳐보죠..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "이제 `master` 브랜치에 `bugFix`를 합쳐(merge) 봅시다:"
            ],
            "afterMarkdowns": [
              "`bugFix`가 `master`의 부모쪽에 있었기 때문에, git이 별다른 일을 할 필요가 없었습니다; 간단히 `bugFix`를 `master`가 붙어 있는 커밋으로 이동시켰을 뿐입니다.",
              "",
              "짜잔! 이제 모든 커밋의 색이 같아졌고, 이는 두 브랜치가 모두 저장소의 모든 작업 내역을 포함하고 있다는 뜻입니다."
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "아래 작업을 해서 이 레벨을 통과하세요:",
              "",
              "* `bugFix`라는 새 브랜치를 만듭니다",
              "* `git checkout bugFix`를 입력해 `bugFix` 브랜치로 이동(checkout)합니다.",
              "* 커밋 한 번 하세요",
              "* `git checkout` 명령어를 이용해 `master`브랜치로 돌아갑니다",
              "* 커밋 또 하세요",
              "* `git merge` 명령어로 `bugFix`브랜치를 `master`에 합쳐 넣습니다.",
              "",
              "*아 그리고, \"objective\" 명령어로 이 안내창을 다시 볼 수 있다는 것을 기억해 두세요!*"
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
              "## Ветки и слияния",
              "",
              "Ок! Мы уже знаем, как создавать ветки и коммитить наши изменения. Теперь надо понять, как объединять изменения из двух разных веток. Очень удобно создать ветку, сделать свою часть работы в ней и потом объединить изменения из своей ветки с общими.",
              "",
              "Первый способ объединения изменений, который мы рассмотрим - это `git merge` - слияние или просто мердж. Слияния в Git создают особый вид коммита, который имеет сразу двух родителей. Коммит с двумя родителями обычно означает, что мы хотим объединить изменения из одного коммита с другим коммитом и всеми их родительскими коммитами.",
              "",
              "Слишком запутанно =) На схеме всё проще и понятнее."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Вот у нас две ветки, каждая содержит по одному уникальному коммиту. Это означает, что ни одна из веток не содержит полный набор \"работ\", выполненных в этом репозитории. Можно исправить эту ситуацию, выполнив слияние.",
              "",
              "Мы сделаем `merge` ветки `bugFix` в ветку `master`"
            ],
            "afterMarkdowns": [
              "Что мы видим? Во-первых, ветка `master` теперь указывает на коммит, у которого два родителя. Если проследовать по стрелкам от этого коммита, вы пройдёте через каждый коммит в дереве прямиком к началу. Это означает, что теперь в ветке `master` содержатся все изменения репозитория.",
              "",
              "Во-вторых, обрати внимание, как изменились цвета коммитов. Мы ввели цветовую дифференциацию, чтобы помочь пониманию. У каждой ветки — свой цвет. Каждый коммит становится того цвета, какого его ветка. Если в нём изменения сразу двух веток - он становится цветом, смешанным из цветов родительских веток.",
              "",
              "И вот мы видим, что цвет ветки `master` подмешан к каждому коммиту, а ветки `bugFix` - нет. Это можно поправить."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Смерджим ветку `master` в ветку `bugFix`"
            ],
            "afterMarkdowns": [
              "Так как ветка `bugFix` была предшественницей `master`, Git не делал ничего, только сдвинул `bugFix` на тот же коммит, где находится `master`",
              "",
              "Теперь все коммиты одного цвета, что означает, что каждая ветка содержит все изменения репозитория! Поздравляем!"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы пройти этот уровень, сделай следующее:",
              "",
              "* Создай новую ветку под названием `bugFix`",
              "* Переключись на новую ветку `bugFix` командой `git checkout bugFix`",
              "* Сделай один коммит",
              "* Вернись на ветку `master` при помощи `git checkout`",
              "* Сделай ещё один коммит",
              "* Слей ветку `bugFix` с веткой `master` при помощи `git merge`",
              "",
              "* Если что-то пошло не так - можешь подглядеть в эту шпаргалку командой \"objective\"!*"
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
              "## Гілки та їх Злиття",
              "",
              "Чудово! Ми знаємо як комітити та створювати гілки. Тепер потрібно навчитися в якийсь спосіб поєднувати інфу з двох чи більше гілок. Це дозволить нам відгілкуватись, зробити нову фічу, й потім інтегрувати її назад.",
              "",
              "Перший спосіб об’єднувати робочу інфу з яким ми розберемось це `git merge`. Команда merge (злити) в Git створює спеціальний коміт який має двох унікальних батьків. Коміт з двома батьками в приниципі просто значить що в нього включена інфа з обох батьків і всіх їх попередників.",
              "",
              "Це простіше сприймається візуально, тому розберемо це в наступному слайді"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Тут ми маємо дві гілки; кожна з них містить унікальний коміт. Це означає що жодна з них не містить повного набору \"робочої інфи\" в цьому репозиторії. Давайте зіллємо всю інфу докупи за допомогою merge.",
              "",
              "Ми `змержимо` гілку `bugFix` в `master`"
            ],
            "afterMarkdowns": [
              "Нічого собі! Ви це бачили? По-перше, `master` тепер вказує на коміт з двома батьками. Якщо ти піднімешся вверх з цього коміту по дереву, починаючи з `master`, на шляху ти зустрінеш кожен коміт аж до кореневого. Це означає що гілка `master` тепер містить всю інфу в цьому репозиторії.",
              "",
              "А ти помітив як змінилися кольори комітів? Для кращого розуміння процесу я додав певну кольорову диференціацію. Кожен бранч виділено окремим кольором. Колір кожного коміту це суміш кольорів всіх гілок що місять цей коміт.",
              "",
              "Тож ми бачимо що колір гілки `master` містять всі коміти, але не колір `bugFix`. Давайте виправимо це..."
            ],
            "command": "git merge bugFix",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давай змержимо `master` в `bugFix`:"
            ],
            "afterMarkdowns": [
              "Так як `bugFix` є нащадком `master`, git'у не потрібно нічого робити; він просто пересунув `bugFix` на тей самий коміт, на якому знаходиться `master`.",
              "",
              "Тепер всі коміти одного кольору, що означає що кожен бранч включає в собі всю корисну інфу яка є в цьому репозиторії! Ура!"
            ],
            "command": "git checkout bugFix; git merge master",
            "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти цей рівень виконай наступні кроки:",
              "",
              "* Зроби нову гілку (branch) з назвою `bugFix`",
              "* Перейди на кілку `bugFix` за допомогою `git checkout bugFix`",
              "* Зроби один коміт",
              "* Повернись до `master` за допомогою `git checkout`",
              "* Зроби ще один коміт",
              "* Змерджи (злий) гілку `bugFix` в `master` за допомогою `git merge`",
              "",
              "*Не забувай, ти можеш завжди повернутися до цього діалогу за допомогою \"objective\"!*"
            ]
          }
        }
      ]
    }
  }
};
