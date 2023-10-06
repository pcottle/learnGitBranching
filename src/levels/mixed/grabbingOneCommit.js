exports.level = {
  "compareOnlyMainHashAgnosticWithAsserts": true,
  "goalAsserts": {
    "main": [
      function (data) {
        return data.C4 > data.C1;
      }
    ]
  },
  "disabledMap": {
    "git revert": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22main%22%7D%2C%22debug%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22debug%22%7D%2C%22printf%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22printf%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase -i main --solution-ordering C4; git rebase bugFix main",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\"},\"debug\":{\"target\":\"C2\",\"id\":\"debug\"},\"printf\":{\"target\":\"C3\",\"id\":\"printf\"},\"bugFix\":{\"target\":\"C4\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "name": {
    "ko": "딱 한 개의 커밋만 가져오기",
    "en_US": "Grabbing Just 1 Commit",
    "fr_FR": "Choisir seulement 1 commit",
    "de_DE": "Einen Commit pflücken",
    "es_AR": "Tomando un único commit",
    "es_ES": "Tomando un único commit",
    "es_MX": "Tomando un único commit",
    "pt_BR": "Pegando um único commit",
    "gl": "Escollendo un único commit",
    "ja": "一つのコミットのみを取得",
    "zh_CN": "只取一个提交记录",
    "zh_TW": "只取一個 commit",
    "ru_RU": "Выберем один коммит.",
    "uk": "Вибираємо всього один коміт",
    "vi": "Chỉ lấy 1 commit",
    "sl_SI": "Izbiranje Samo Enega Commita",
    "it_IT": "Prendi solo 1 Commit",
    "pl": "Wzięcie tylko 1 commita",
    "tr_TR": "Sadece 1 commit'i yakalamak"
  },
  "hint": {
    "en_US": "Remember, interactive rebase or cherry-pick is your friend here",
    "de_DE": "Vergiss nicht: Hier kommst du mit interaktivem Rebase oder Cherry-Picking weiter",
    "fr_FR": "Souvenez-vous, les rebases interactifs ou cherry-pick sont vos amis ici.",
    "es_AR": "Acordate, el rebase interactivo o cherry-pick son tus amigos acá",
    "es_ES": "Recuerda, el rebase interactivo y el cherry-pick son tus amigos",
    "pt_BR": "Lembre-se, o rebase interativo ou o cherry-pick são seus amigos aqui",
    "gl": "Recorda, o rebase interativo ou cherry-pick é un dos teus colegas aquí",
    "ja": "このレベルではインタラクティブモードのrebaseやcherry-pickがクリアのカギです",
    "ko": "대화식 리베이스(rebase -i)나 or 체리픽(cherry-pick)을 사용하세요",
    "zh_CN": "你有两个朋友，cherry-pick 和 rebase -i",
    "zh_TW": "記住，使用互動式的 rebase 或者 cherry-pick 會很有幫助",
    "ru_RU": "Не забывай, что интерактивный rebase и cherry-pick – это твои друзья!",
    "uk": "Не забувай, що інтерактивний rebase та cherry-pick -- це твої друзі!",
    "vi": "Hãy nhớ 2 anh bạn tương tác rebase và cherry-pick",
    "sl_SI": "Pomni, interaktivni rebase ali cherry-pick sta tu tvoja prijatelja.",
    "it_IT": "Ricorda, rebase interattivo o cherry-pick sono tuoi amici",
    "pl": "Pamiętaj, że znasz już interaktywny rebase oraz cherry-pick",
    "tr_TR": "Unutmayın interactive rebase ve cherry-pick buradaki en iyi dostlarınız."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Locally stacked commits",
              "",
              "Here's a development situation that often happens: I'm trying to track down a bug but it is quite elusive. In order to aid in my detective work, I put in a few debug commands and a few print statements.",
              "",
              "All of these debugging / print statements are in their own commits. Finally I track down the bug, fix it, and rejoice!",
              "",
              "Only problem is that I now need to get my `bugFix` back into the `main` branch. If I simply fast-forwarded `main`, then `main` would get all my debug statements which is undesirable. There has to be another way..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "We need to tell git to copy only one of the commits over. This is just like the levels earlier on moving work around -- we can use the same commands:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "To achieve this goal."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "This is a later level so we will leave it up to you to decide which command you want to use, but in order to complete the level, make sure `main` receives the commit that `bugFix` references."
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
              "## Les commits empilés localement",
              "",
              "Voici une situation qui arrive souvent : j'ai un bug assez difficile à trouver et corriger. Pour localiser la source du problème je rajoute des commandes et prints de debug à travers le code.",
              "",
              "Tous ces debug se retrouvent dans une branche particulière. Je trouve le bug et le répare, comme toujours !",
              "",
              "Le problème c'est que je ne peux pas faire de merge ou rebase, car tous ces commits de debug seront dans le main. Il doit y avoir une autre façon..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour réussir ce niveau, nous avons besoin de dire à Git quel commit particulier recopier. C'est comme pour le niveau précédent : nous pouvons utiliser les mêmes commandes :",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "C'est un niveau avancé, donc à vous de choisir quelle commande utiliser, mais pour réussir ce niveau, assurez-vous que `main` reçoive le même commit que `bugFix` référence."
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
              "## Commits localmente stackeados",
              "",
              "Esta es una escena que suele pasar cuando uno desarrolla: estoy tratando de encontrar un bug bastante escurridizo. Para ayudar en mi tarea de detective, agrego un par de comandos de debug, y algunas sentencias para imprimir el estado de mi sistema.",
              "",
              "Todas estas cosas de imprimir y debuggear estan en su propia rama. Finalmente encuentro el problema, lo soluciono, ¡y disfruto!",
              "",
              "El único problema es que ahora necesito llevar mi `bugFix` a la rama `main`. Si simplemente fast-forwardeo `main`, entonces `main` va a tener todos mis agregados de debugging, que es indeseado. Tiene que haber otro modo..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Necesitamos decirle a git que sólo copie uno de los commits. Esto es tal como los niveles anteriores de mover commits por ahí -- podemos usar los mismos comandos:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "Para conseguir este resultado."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este es un nivel más avanzado, así que está en vos decidir cuál de los dos comandos querés usar, pero para completar el nivel asegurate de que `main` recibe el commit que `bugFix` referencia."
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
              "## Commits localmente stackeados",
              "",
              "Esta es una escena que suele pasar cuando uno desarrolla: estoy tratando de encontrar un bug bastante escurridizo. Para ayudar en mi tarea de detective, agrego un par de comandos de debug, y algunas sentencias para imprimir el estado de mi sistema.",
              "",
              "Todas estas cosas de imprimir y debuggear estan en su propia rama. Finalmente encuentro el problema, lo soluciono, ¡y disfruto!",
              "",
              "El único problema es que ahora necesito llevar mi `bugFix` a la rama `main`. Si simplemente fast-forwardeo `main`, entonces `main` va a tener todos mis agregados de debugging, lo cual no es deseable. Tiene que haber otro modo..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Necesitamos decirle a git que sólo copie uno de los commits. Esto es tal como los niveles anteriores de mover commits por ahí -- podemos usar los mismos comandos:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "Para conseguir este resultado."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este es un nivel más avanzado, así que debes decidir cuál de los dos comandos quieres usar, pero para completar el nivel asegurate de que `main` recibe el commit que `bugFix` referencia."
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
              "## Commits localmente apilados",
              "",
              "Esta es una situación que suele pasar cuando uno desarrolla: estoy tratando de encontrar un bug bastante escurridizo. Para ayudar en mi tarea de detective, agrego un par de comandos de depuración y algunas sentencias para imprimir el estado de mi sistema.",
              "",
              "Todas estas cosas de imprimir y depurar estan en su propia rama. Finalmente encuentro el problema, lo soluciono y ¡disfruto!",
              "",
              "El único problema es que ahora necesito llevar mi `bugFix` a la rama `main`. Si simplemente fast-forwardeo `main`, entonces `main` va a tener todos mis agregados de depuración, lo cual no es deseable. Tiene que haber otro modo..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Necesitamos decirle a Git que sólo copie uno de los commits. Esto es tal como los niveles anteriores de mover commits por ahí -- podemos usar los mismos comandos:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "Para conseguir este resultado."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este es un nivel más avanzado, así que debes decidir cuál de los dos comandos quieres usar, pero para completar el nivel asegurate de que `main` recibe el commit que `bugFix` referencia."
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
              "## Commits empilhados localmente",
              "",
              "Aqui está uma situação de acontece frequentemente com desenvolvedores: Estou tentando encontrar um bug, mas ele é escorregadio. Para auxiliar meu trabalho de detetive, eu coloco alguns comandos de debug e prints.",
              "",
              "Todos esses comandos de debug e mensagens estão em seus próprios ramos. Finalmente eu encontro o bug, corrijo, e me regozijo!",
              "",
              "O único problema é que agora eu preciso devolver o meu `bugFix` ao ramo `main`. Se eu simplesmente der um fast-forward no `main`, então o `main` terminará contendo todos os comandos de debug, o que é indesejável. Deve existir alguma outra forma..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Precisamos dizer ao git para copiar somente um dos commits. Esta situação é exatamente a mesma dos níveis anteriores a respeito de como mover trabalho -- podemos usar os mesmos comandos:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "Para alcançar o objetivo."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este é um nível avançado, então vamos deixar para você a decisão de qual comando usar, mas para completar este nível, certifique-se de que o `main` receba o commit referenciado por `bugFix`."
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
              "## Commits apilados localmente",
              "",
              "Aquí estamos nunha situación que acontece de cotio con desenvolvedores: Estou intentando atopar un erro, mais é escorredizo. Para axudar ó meu traballo de detective, eu coloco algúns comandos de debug e prints.",
              "",
              "¡Todos esos comandos de debug e mensaxes están nas súas ramas propias. Finalmente eu atopo o erro, arránxoo e reorganizo!",
              "",
              "O único problema é que agora eu preciso devolver o meu `bugFix` á rama `main`. Se eu fixera simplemente un fast-forward en `main`, entón o `main` rematará contendo tódolos comandos de debug, o que é indesexable. Debe existir algunha outra forma..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Precisamos decirlle a git que copie só os commits que nos interesa. Esta situación é exatamente a mesma dos niveis anteriores respecto de como mover o traballo -- podemos usar os mesmos comandos:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "Para acadar o objetivo."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Este é un nivel avanzado, entón imos deixarche a decisión de qué comando empregar, pero para completar este nivel, asegurate de que a rama `main` colla o commit referenciado por `bugFix`."
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
              "## Lokale Commit-Haufen",
              "",
              "Folgende Situation habe ich beim Entwickeln des Öfteren: Ich bin auf der Suche nach einem Bug, aber er ist echt schwer zu finden. Um ihm auf die Spur zu kommen schreibe ich mehrere Debug-Kommandos und print-Befehle in den Code.",
              "",
              "Die committe ich auch immer wieder, je weiter die Suche mich trägt; natürlich in einem lokalen Branch. Schließlich finde ich den Bug, fixe ihn und freue mich!",
              "",
              "Einziges Problem ist, dass ich diesen `bugFix` jetzt zurück in den `main` kriegen muss. Wenn ich einfach den `main` vorspule oder meinen Branch hinein merge, bekäme der `main` auch die ganzen Debug-Befehle, was nicht gewünscht ist. Das muss anders gehen ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wir müssten Git sagen können, dass es nur einen Commit herüber kopieren soll. Das ist genauso wie die Level vorhin zum Code-Verschieben. Wir können dieselben Befehle benutzen:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Da dies ein späterer Level ist, überlasse ich es dir zu entscheiden, welchen Befehl du benutzen willst. Aber um das Level zu schaffen musst du irgendwie sicherstellen, dass `main` den Commit bekommt, auf den `bugFix` zeigt."
            ]
          }
        }
      ]
    },
    // INTL out of sync :(
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## ローカルに積み上がったコミット",
              "",
              "実際の開発ではこういうケースがよくあります：「バグの原因調査を試みているがバグの再現性がかなり低い。調査の補助のために、いくつかのデバッグ用の命令やprint文を差し込んでいる。」",
              "",
              "これらのデバッグ用のコードはバグ修正用のブランチにコミットされています。そしてついにバグの原因を突き止めて、修正した！やった！",
              "",
              "あとは`bugFix`ブランチを`main`ブランチに統合できればOK。そこで単純に`main`をfast-forwardすればよいかというと、それでは`main`ブランチの中にデバッグ用のコードも混入してしまいます。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "ここでGitの魔法が力を発揮します。解決のためにはいくつかの方法がありますが、最も素直な解決方法は2つあって：",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "インタラクティブモードの（`-i`オプションつきの）rebaseによって、保持したいコミットと破棄したいコミットを選り分けることができます。コミットの順序を変更することも可能です。この方法は、一部の変更をどこかへやってしまいたい時に便利です。",
              "",
              "もう一方のcherry-pickを使うと、持っていきたいコミットを選んで`HEAD`の先にストンと落とすことができます。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "後半の章ですのでどう解決するかをもう自分で考えることができると思います。このレベルをクリアするためには、`bugFix`が持っているコミットを`main`ブランチが受け取る必要がある点には注意してください。"
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
              "## 本地栈式提交",
              "",
              "来看一个在开发中经常会遇到的情况：我正在解决某个特别棘手的 Bug，为了便于调试而在代码中添加了一些调试命令并向控制台打印了一些信息。",
              "",
              "这些调试和打印语句都在它们各自的提交记录里。最后我终于找到了造成这个 Bug 的根本原因，解决掉以后觉得沾沾自喜！",
              "",
              "最后就差把 `bugFix` 分支里的工作合并回 `main` 分支了。你可以选择通过 fast-forward 快速合并到 `main` 分支上，但这样的话 `main` 分支就会包含我这些调试语句了。你肯定不想这样，应该还有更好的方式……"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "实际我们只要让 Git 复制解决问题的那一个提交记录就可以了。跟之前我们在“整理提交记录”中学到的一样，我们可以使用",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "来达到目的。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "由于我们刚刚闯过类似的关卡，所以要不要再尝试一次就看你自己了。但是如果你想试一把的话，确保 `main` 分支能得到 `bugFix` 分支上的相关提交。"
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
              "## 在 local 的堆疊的 commit",
              "",
              "有一個經常發生的情況：我在追蹤一個有點棘手的 bug，但是它實在太難抓出來了，在不得已的情況下我加入了一些 debug 的指令，並且做了一些 commit。",
              "",
              "所有的這些 debug 的指令都只在 `bugFix` 這個 branch 裡面。最後我終於找到這個 bug，並且 fix 掉它，接著撒花慶祝一下！",
              "",
              "現在唯一的問題就是要把我在 `bugFix` branch 裡面所做的修改 merge 回 `main` branch。我可以簡單地透過 fast-forward 來 merge ，但這樣的話 `main` branch 就會包含這些含有 debug 指令的 commit 了。我相信一定有其它方法..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "我們需要告訴 git 只去複製其中一個 commit。 這種情況跟之前的關卡有一點類似，我們可以使用一樣的指令",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "來完成這個目的。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "這一個關卡是比較後面的關卡，你可以隨意決定你要選擇使用哪個指令，但是 `bugFix` 所指向的那個 commit 一定要可以被 `main` branch 包含到。"
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
              "## 로컬에 쌓인 커밋들",
              "",
              "개발 중에 종종 이런 상황이 생깁니다: 눈에 잘 띄지 않는 버그를 찾아서 해결하려고, 어떤 부분의 문제인지를 찾기 위해 디버그용 코드와 화면에 정보를 프린트하는 코드 몇 줄 넣습니다. ",
              "",
              "디버깅용 코드나 프린트 명령은 그 브랜치에 들어있습니다. 마침내 버그를 찾아서 고쳤고, 원래 작업하는 브랜치에 합치면 됩니다!",
              "",
              "이제 `bugFix`브랜치의 내용을 `main`에 합쳐 넣으려 하지만, 한 가지 문제가 있습니다. 그냥 간단히 `main`브랜치를 최신 커밋으로 이동시킨다면(fast-forward) 그 불필요한 디버그용 코드들도 함께 들어가 버린다는 문제죠."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "여기에서 Git의 마법이 드러납니다. 이 문제를 해결하는 여러가지 방법이 있습니다만, 가장 간단한 두가지 방법 아래와 같습니다:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "대화형 (-i 옵션) 리베이스(rebase)로는 어떤 커밋을 취하거나 버릴지를 선택할 수 있습니다. 또 커밋의 순서를 바꿀 수도 있습니다. 이 커맨드로 어떤 작업의 일부만 골라내기에 유용합니다.",
              "",
              "체리픽(cherry-pick)은 개별 커밋을 골라서 `HEAD`위에 떨어뜨릴 수 있습니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이번 레벨을 통과하기 위해 어떤 방법을 쓰시든 자유입니다만, `main`브랜치가 `bugFix` 브랜치의 커밋을 일부 가져오게 해주세요."
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
              "Вот ситуация, которая часто случается при разработке: мы пытаемся отследить ошибку, но она не очень очевидна. Для того, чтобы достичь успеха на этом поприще, мы используем несколько команд для отладки и вывода",
              "",
              "Каждая отладочная команда (команды) вывода находится в своём коммите. В итоге мы нашли ошибку, исправили её и порадовались!",
              "",
              "Но проблема в том, что мы хотим добавить в `main` только исправление ошибки из ветки `bugFix`. Если мы воспользуемся простым fast-forward, то в `main` попадут также отладочные команды. Должен быть другой способ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Надо заставить git копировать только один из коммитов. Это почти как в предыдущем уровне – мы можем использовать уже известные нам команды: ",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "Чтобы достичь желаемого результата."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "В этом уровне тебе решать, какую команду использовать, но чтобы закончить уровень, убедись, что в ветку `main` попал коммит, на который ссылается `bugFix`."
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
              "## Локально складені коміти",
              "",
              "Ось ситуація з життя рядового програміста: я намагаюся відслідкувати баг, але це не завжди вдається. Щоб допомогти собі, я додаю кілька дебаг-команд та ще кілька println'ів.",
              "",
              "Всі ці команди для відлагодження та виводу данних знаходяться в своїх власних комітах. Врешті-решт я знаходжу баг, фікшу його та щиро радію!",
              "",
              "От тільки лишається проблема, що потрібно мій фікс перенести з `bugFix` назад в гілку `main`. Якщо я просто зроблю фастфорвард (fast-forwarded) в `main`, тоді в `main` потраплять всі мої println'и, що є зайвим. Має бути інший шлях..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ми маємо сказати гіту скопіювати лише один коміт. Це все те ж саме, що й у попередніх рівнях, і ми можемо використати ті ж самі команди:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "для досягнення мети."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "На цьому рівні тобі вирішувати якими командами користуватися, але щоб пройти цей рівень, впевнись що в `main` потрапить коміт, на який посилається `bugFix`."
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
              "## Commit xếp chồng cục bộ",
              "",
              "Có tình huống thế này thường hay xảy ra trong quá trình phát triển: Tôi đang cố dò lỗi nhưng mà nó lại khá khó tìm. Để hỗ trợ cho việc này, tôi thêm vào vài dòng lệnh gỡ lỗi và lệnh in.",
              "",
              "Mấy lệnh gỡ lỗi và in này nằm yên trong commit của chúng. Cuối cùng thì tôi cũng tìm ra lỗi, gỡ xong, ngon rồi!",
              "",
              "Bây giờ thì lại phải đưa `bugFix` trở về nhánh `main`. Nếu mà đơn giản dùng fast-forwarded lên `main`, thì `main` lại có tất cả các lệnh gỡ lỗi kia, chẳng muốn chút nào. Phải có cách khác chứ nhỉ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ta cần phải bảo Git chỉ sao chép 1 commit thôi. Điều này giống với cấp độ trước về điều chỉnh vị trí -- ta có thể dùng các câu lệnh tương tự:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "Để đạt được mục tiêu này."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Bây giờ là cấp độ cao hơn rồi nên bạn hãy tự quyết định nên dùng câu lệnh nào, nhưng để hoàn thành được cấp độ, hãy đàm bảo rằng `main` nhận được commit mà `bugFix` tham chiếu tới."
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
              "## Lokalno naloženi commiti",
              "",
              "Tu je razvijalska situacija, ki se zgodi pogosto: Hočem najti bug, ampak se kar izmika. V pomoč mojemu detektivskemu delu, sem dodal nekaj ukazov za debuggiranje in izpis.",
              "",
              "Vsi te ukazi za debuggiranje / izpisovanje so v svojih commitih. Končno odkrijem bug, ga popravim in se veselim!",
              "",
              "Edini problem je, da morem sedaj spraviti moj `bugFix` nazaj v `main` branch. Če uporabim samo fast-forward na `masterju`, potem bi `main` vseboval vse moje debug vrstice, česar si ne želim. Mora obstajati še neka druga pot ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Gitu moramo povedati naj skopira čez samo en commit. To je podobno stopnjam prej, ko smo premikali delo okoli -- uporabimo lahko iste ukaze:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "da dosežemo ta cilj."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Tebi prepuščam, da se odločiš, kateri ukaz boš uporabil, da končaš stopnjo. Poskrbi samo, da `main` dobi commit na katerega kaže `bugFix` referenca."
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
              "## Lokalnie nałożone commity",
              "",
              "Oto sytuacja, która często się zdarza podczas pisania kodu: próbuję wytropić buga, ale jest on nieuchwytny. Aby pomóc sobie w poszukiwaniach, dodaję kilka poleceń debugowania i kilka instrukcji print.",
              "",
              "Wszystkie te polecenia debugowania / drukowania znajdują się w osobnych commitach. W końcu namierzam błąd, naprawiam go i cieszę się!",
              "",
              "Jedynym problemem jest to, że teraz muszę przywrócić mój `bugFix` do gałęzi `main`. Jeśli po prostu zrobiłbym fast-foward `main`, wtedy `main` dostałby wszystkie moje deklaracje debugowania, a tego bym nie chciał. Musi być na to inny sposób..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Musimy powiedzieć Gitowi, żeby skopiował tylko jeden z commitów. Dokładnie w ten sam sposób jak we wcześniejszych poziomach z przenoszeniem pracy -- używając tych samych poleceń:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "aby osiągnać ten cel."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Jest to wyższy poziom, więc pozostawimy ci decyzję, której komendy chcesz użyć, ale aby ukończyć poziom, upewnij się, że `main` otrzyma commit, do którego odwołuje się `bugFix`."
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
              "## Commit impilati localmente",
              "",
              "Ecco una situazione che accade spesso in fase di sviluppo: Sto cercando di scovare un bug. Per aiutarmi nel mio lavoro di detective, inserisco alcuni comandi per il debug e alcune print per fare stampe.",
              "",
              "Questi comandi aggiunti per il debug vengono salvati con un commit loro dedicato. Finalmente riesco a beccare il bug, sistemo il tutto, e brindo!",
              "",
              "Ora l'unico problema è che devo salvare il lavoro di `bugFix` nel ramo `main`. Se eseguo un semplice fast-forwarded `main`, allora il `main` andrebbe a prendere anche tutto ciò che è stato aggiunto per il debug. Se solo ci fosse un altro modo...",
            ],
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Dobbiamo dire a Git di fare la copia di un solo commit. Questo assomiglia a quanto visto in precedenza -- possiamo riusare gli stessi comandi:",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "Per raggiungere l'obiettivo.",
            ],
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Questo è un livello più avanzato, lascerò a te la libertà di decidere quale comando usare, ma per concludere il livello, assicurati che `main` riceva il commit puntato da `bugFix`.",
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
              "## Yerel Olarak Birikmiş Commitler",
              "",
              "Şu sıkça karşılaşılan bir geliştirme senaryosudur: Bir hatayı izlemeye çalışıyorum, ancak bu hata oldukça belirsiz. Dedektiflik çalışmalarıma yardımcı olmak için bazı hata ayıklama komutları ve yazdırma ifadeleri eklerim.",
              "",
              "Bu hata ayıklama veya yazdırma ifadeleri, her biri kendi commit'lerine sahiptir. Sonunda hatayı bulurum, düzeltirim ve sevinirim!",
              "",
              "Tek sorun şu ki şimdi `bugFix` branch'imi `main` branch'imden almalıyım. Eğer sadece `main` branch'ini süratle ileri alırsam, `main` branch'i tüm hata ayıklama ifadelerimi alır ki bu istenmeyen bir durumdur. Bunun için başka bir yol bulunmalıdır..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git'e sadece bir commit'i kopyalamasını söylememiz gerekiyor. Bu, daha önce yaptığımız işleri taşımak için yaptığımız işlemler gibi, orada kullandığımız;",
              "",
              "* `git rebase -i`",
              "* `git cherry-pick`",
              "",
              "komutlarını burada da kullanabiliriz."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Bu biraz daha ileri bir seviye olduğundan hangi komutu kullanmak istediğiniz size kalmış, ancak `main` branch'inin `bugFix` tarafından atılan ve `main`'e atıfta bulunan commit'i alması gerektiğini unutmayın."
            ]
          }
        }
      ]
    },
  }
};
