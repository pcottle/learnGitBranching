exports.level = {
    "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C4\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C4\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C5\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C5\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin master^:foo;git push origin foo:master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C4\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git push arguments -- Expanded!",
    "zh_CN": "Git push 参数 2!",
    "zh_TW": "git push 的參數，延伸討論！",
    "es_AR": "¡Más! Parámetros de git push",
    "pt_BR": "Parâmetros do git push -- expandido",
    "de_DE": "Optionen für Git Push -- noch mehr!",
    "ja"   : "Git pushの引数 -- 拡張編!",
    "fr_FR": "Arguments de git push -- toujours plus !",
    "ru_RU": "Аргументы для push -- расширенная версия!",
    "ko"   : "git push 인자 -- 확장판!",
    "uk"   : "Розширені аргументи git push!"
  },
  "hint": {
    "en_US": "Remember you can admit defeat and type in \"show solution\" :P",
    "zh_CN": "如果你失败了, 可以通过 \"show solution\" 找到解决方案 :P",
    "zh_TW": "如果你失敗了，可以利用 \"show solution\" 來找到解答:P",
    "es_AR": "Recordá que podés admitir tu derrota y tipear \"show solution\" para ver la solución :P",
    "pt_BR": "Lembre-se que você pode admitir que foi derrotado e digitar \"show solution\" :P",
    "de_DE": "Vergiss nicht dass du aufgeben kannst, indem du \"show solution\" eingibst :P",
    "ja"   : "降参して解説を見るには\"show solution\"を実行できるのをお忘れなく",
    "fr_FR": "N'oubliez pas que vous pouvez toujours déclarer forfait avec \"show solution\" :P",
    "ru_RU": "Помните, Вы всегда можете признать своё поражение, набрав команду \"show solution\" (показать решение) :P",
    "ko"   : "혹시 아세요? 패배를 인정하고 \"show solution\"을 입력할 수 있다는 걸요 :P",
    "uk"   : "Пам'ятай, ти завжди можеш визнати поразку і підглянути рішення командою \"show solution\" :P"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## `<place>` argument details",
              "",
              "Remember from the previous lesson that when we specified `master` as the place argument for git push, we specified both the *source* of where the commits would come from and the *destination* of where the commits would go.",
              "",
              "You might then be wondering -- what if we wanted the source and destination to be different? What if you wanted to push commits from the `foo` branch locally onto the `bar` branch on remote?",
              "",
              "Well unfortunately that's impossible in git... just kidding! Of course it's possible :)... git has tons and tons of flexibility (almost too much).",
              "",
              "Let's see how in the next slide..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In order to specify both the source and the destination of `<place>`, simply join the two together with a colon:",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "This is commonly referred to as a colon refspec. Refspec is just a fancy name for a location that git can figure out (like the branch `foo` or even just `HEAD~1`)",
              "",
              "Once you are specifying both the source and destination independently, you can get quite fancy and precise with remote commands. Let's see a demo!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Remember, `source` is any location that git will understand:"
            ],
            "afterMarkdowns": [
              "Woah! That's a pretty trippy command but it makes sense -- git resolved `foo^` into a location, uploaded whatever commits that weren't present yet on the remote, and then updated destination."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What if the destination you want to push doesn't exist? No problem! Just give a branch name and git will create the branch on the remote for you."
            ],
            "afterMarkdowns": [
              "Sweet, that's pretty slick :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "For this level, try to get to the end goal state shown in the visualization, and remember the format of:",
              "",
              "`<source>:<destination>`"
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
              "## L'argument `<place>` dans le détail",
              "",
              "Rappelez-vous de notre dernière leçon : quand vous passiez `master` comme argument `<place>` à git push, cela spécifiait à la fois la *source* de provenance des commits et leur *destination*.",
              "",
              "Vous vous demandez peut-être donc : et si nous voulions avoir une source et une destination différentes ? Et si vous voulez envoyez des commits de la branche locale `foo` dans la branche distante `bar` ?",
              "",
              "Malheureusement ce n'est pas possible avec git... Mais non, je plaisante ! Bien sûr que c'est possible :)... git a des tonnes de flexibilité (presque trop).",
              "",
              "Voyons cela au prochain slide..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour spécifier la source et la destination dans `<place>`, on les joint simplement par deux points :",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "On en parle souvent comme d'un \"refspec\". Refspec est juste un nom exotique pour un emplacement que git peut résoudre (comme la branche `foo` ou juste `HEAD~1`)",
              "",
              "Lorsque vous utilisez cette notation permettant de préciser la source et la destination indépendamment, vous pouvez produire des commandes à la fois très sophistiquées et très précises pour travailler avec les dépôts distants. Faisons une démo !"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Rappelez-vous, `source` peut être n'importe quel emplacement que git peut résoudre :"
            ],
            "afterMarkdowns": [
              "Woahou ! C'est une commande très alambiquée mais qui a du sens : git résoud `foo^` en un emplacement, envoie tous les commits qui n'étaient pas encore présents sur le dépôt distant, et met ensuite à jour la branche de destination."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Que se passe-t-il quand la destination du push n'existe pas encore ? Pas de problème ! Donnez simplement un nom de branche et git va créer la branche distante pour vous."
            ],
            "afterMarkdowns": [
              "Cool, c'est habile :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour ce niveau, essayez d'atteindre l'état montré dans la fenêtre d'objectif, et souvenez-vous du format :",
              "",
              "`<source>:<destination>`"
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
              "## Detalles sobre el parámetro `<lugar>`",
              "",
              "Acordate de la lección anterior que cuando especificamos `master` como el parámetro lugar de git push, especificamos tanto el *origen* del que sacar los commits como el *destino* al que enviarlos.",
              "",
              "Podrías estár preguntándote ¿Y si quisieramos que el origen y el destino sean distintos? ¿Si quisieras pushear los commits de la rama local `foo` a la rama `bar` del remote?",
              "",
              "Bueno, lamentablemente eso no se puede hacer en git... ¡Bazinga! Claro que se puede :)... git es extremadísimamente flexible (casi casi que demsiado).",
              "",
              "Veamos cómo hacerlo a continuación..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para especificar tanto el origen como el destino de `<lugar>`, simplemente unilos usando un dos puntos:",
              "",
              "`git push origin <origen>:<destino>`",
              "",
              "Esto se lo suele llamar refspec con dos puntos. Refspec es simplemente un nombre cool para una ubicación que git puede entender (como la rama `foo`, o incluso `HEAD~1`)",
              "",
              "Una vez que especificás tanto el origen como el destino independientemente, podés ponerte bastante cómodo y preciso con los comandos remotos. ¡Veámos una demo!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Recordá: `origen` es cualquier ubicación que git pueda entender:"
            ],
            "afterMarkdowns": [
              "¡Woow! Ese commando es bastante loco, pero tiene sentido: git resolvió `foo^` a una ubicación, subió cualquier commit de ahí que aún no estuviera en el remoto, y luego actualizó el destino."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Y qué hay si el destino que al querés pushear no existe? ¡No hay drama! Simplemente dale un nombre al branch y git se va a encargar de creártelo en el remoto."
            ],
            "afterMarkdowns": [
              "Genial, simplemente fluye :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para este nivel, tratá de llegar al objetivo final, y acordate del formato:",
              "",
              "`<origen>:<destino>`"
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
              "## Detalhes sobre `<lugar>`",
              "",
              "Lembra que na lição anterior especificamos `master` como o parâmetro lugar para o git push? Lá definimos tanto a *origem* de onde os commits viriam quanto o *destino* para onde os commits foram.",
              "",
              "Você pode estar se perguntando -- e se eu quisesse que a origem e o destino fossem diferentes? E se eu quisesse enviar commits do ramo local `foo` para o ramo remoto `bar`?",
              "",
              "Bem, infelizmente isso é impossível no Git... só brincando! Claro que é possível :)... o Git tem muita flexibilidade (até mais do que deveria).",
              "",
              "Veremos como fazê-lo no próximo slide..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para especificar tanto a origem como o destino do `<lugar>`, simplesmente juntamos os dois usando dois-pontos:",
              "",
              "`git push origin <origem>:<destino>`",
              "",
              "Isso é geralmente chamado de \"colon refspec\" (especificação de referência com dois-pontos). Refspec é só um nome extravagante para um local que o Git consiga entender (como o ramo `foo` ou mesmo `HEAD~1`)",
              "",
              "Uma vez que você está especificando tanto a origem como o destino independentemente, você pode ser bastante preciso nos comandos relacionados a repositórios remotos. Vejamos uma demonstração!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lembre-se, `origem` é qualquer lugar que o Git possa entender:"
            ],
            "afterMarkdowns": [
              "Uau! Esse comando é bastante viajado, mas ele faz sentido -- o Git entendeu a referência `foo^`, enviou quaisquer commits que não estavam presentes no repositório remoto, e então atualizou o destino."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "E se o destino para o qual você quiser fazer push não existir? Sem problemas! Dê um nome de ramo e o Git criará o ramo no repositório remoto para você."
            ],
            "afterMarkdowns": [
              "Doce, isso é muito bom :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para este nível, tente chegar ao estado do objetivo mostrado na visualização, e lembre-se do formato:",
              "",
              "`<origem>:<destino>`"
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
              "## `<place>` 這個參數的細節",
              "",
              "回想一下，我們在之前的課程中提到，當我們用 `git push` 並且把 `master`  當作 `<place>` 這個參數的時候，我們就相當於告訴 git 我們的所要更新的 commit 要*從哪裡來*（source） 並且要 *往哪裡去*（destination）。",
              "",
              "你可能會很好奇，當我們的 source 以及 destination 是不同的時候，應該怎麼做？當你想要 push `foo` branch 上面的 commit 到 remote 的 `bar` branch 的時候，應該怎麼做？",
              "",
              "很遺憾地，對於 git 來說這是不可能的...開玩笑的啦！當然是有可能的:)... git 有非常非常大的彈性（太超過了啦）。",
              "",
              "讓我們來看看下一頁..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "為了要指定 `<place>` 的 source 以及 destination，只要利用一個冒號將這兩個連在一起：",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "這通常被稱為一個 colon （冒號） refspec，refspec 只是一個表示 location （位置） 的花俏的名稱，這個位置可以被 git 辨別（例如 `foo` branch 或是 `HEAD~1`）。",
              "",
              "一旦你單獨指定了 source 以及 destination，你可以看到花俏且準確的指令。讓我來來看一個例子！"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "記住， `source` 表示任意可以被 git 辨識的位置："
            ],
            "afterMarkdowns": [
              "哇!這實在是一個很花俏的指令但是確很合理，git 把 `foo^` 解讀成一個位置，並且 push 該位置的 commit 到目前 remote 的 master branch。"
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果你想要 push 的 destination 不存在怎麼辦？沒有問題！只要給一個 branch 的名稱，git 就會在 remote 幫你建立。"
            ],
            "afterMarkdowns": [
              "太讚了，實在非常地簡單:D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "對於這個關卡，想辦法達到這個視覺化的目標，而且要記得格式：",
              "",
              "`<source>:<destination>`"
            ]
          }
        }
      ]
    },
   "zh_CN":{
      "childViews": [
      {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## `<place>` argument details",
              "",
              "还记得之前课程说的吧, 当为 git push 指定 master 为 place 时, 我们可以设置 要提交的来源 和 提交到目的地. ",
              "",
              "你可能想知道 -- 如果来源和目的地不一样呢? ",
              "",
              "好吧, 很不幸 Git 不可能做到... 只是个玩笑! 当然是可能的啦 :) ... Git 拥有超强的灵活性(几乎不能再多了) ",
              "",
              "我们看看下一个幻灯片..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要为 <place> 指定 source 和 destination, 只需要用冒号 `:` 将二者联结.",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "这通常被称为 <colon refspec>, refspec 是一个奇特的名 -- 用于 Git 能识别的位置(比如分支 foo 或者 HEAD~1) ",
              "",
              "一旦你指定了独立的来源和目的地, 你就可以得到花哨而精确的远程命令, 让我们看看演示! "
            ]
          }
        },
      {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "记住, `source` 是 Git 能理解的任何位置:"
            ],
            "afterMarkdowns": [
              "这是个很迷幻的命令, 但它是合理的 -- Git 将 foo^ 解析为一个位置, 上传新提交到远端的目的地.  "
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果你要 push 到的 destination 不存在呢? 没问题! Git 会在远端为你创建这个分支!"
            ],
            "afterMarkdowns": [
              "很赞吧! 干得漂亮! :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "本节练习, 试着达到可视窗口展示的目标, 记住参数格式哟:",
              "",
              "`<source>:<destination>`"
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
              "## Details zum `<Ort>`-Parameter",
              "",
              "Du erinnerst dich von dem vorherigen Level, dass, als wir `master` als \"Ort\" beim `git push` angegeben haben, daraus sowohl die *Quelle* als auch das *Ziel* für die Operation abgeleitet wurden.",
              "",
              "Daher fragst du dich vielleicht -- was wenn wir möchten, dass Quelle und Ziel anders sind? Was wenn du Commits von einem lokalen Branch `foo` in den Branch `bar` auf einem Server schieben möchtest?",
              "",
              "Tja, leider ist das in Git unmöglich .... ein Scherz! Natürlich ist das möglich. Git besitzt tonnenweise Flexibilität (eher zuviel, als zuwenig).",
              "",
              "Und gleich sehen wir, wie das geht ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um sowohl Quelle als auch Ziel im `<Ort>`-Parameter anzugeben, gib sie einfach verbunden mit einem Doppelpunkt ein:",
              "",
              "`git push origin <Quelle>:<Ziel>`",
              "",
              "Das wird üblicherweise Refspec (Referenz-Spezifikation) genannt. Refspec ist nur ein anderer Name für einen Ort, mit dem Git etwas anfangen kann (wie mit Branch `foo` oder mit `HEAD~2`)",
              "",
              "Sobald du Quelle und Ziel separat angibt, kannst du flexibel und präzise entfernte Branches ansteuern. Hier eine Demo:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vergiss nicht, `Quelle` ist jeder mögliche Ort, mit dem Git etwas anfangen kann:"
            ],
            "afterMarkdowns": [
              "Boah! Das ist ein ziemlich abgefahrener Befehl gewesen, aber er ist sinnvoll -- Git hat `foo^` zu einem Commit aufgelöst, alle Commits die bis zu diesem einschließich noch nicht auf dem Server waren hochgeladen und dann dort das Ziel aktualisiert."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was wäre wenn das Ziel des `push` gar nicht existiert? Kein Problem! Wenn das Ziel ein Branch-Name ist, wird Git den Branch auf dem Server einfach anlegen."
            ],
            "afterMarkdowns": [
              "Schick, das ist ziemlich praktisch. :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um dieses Level zu schaffen versuch den dargestellten Zielzustand zu erreichen und vergiss nicht das Format:",
              "",
              "`<Quelle>:<Ziel>`"
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
              "## Подробности аргумента `<пункт назначения>`",
              "",
              "Помните, когда в прошлом занятии мы указали в качестве аргумента ветку `master` для команды git push, мы указали совместно *источник*, откуда будут приходить коммиты, и *пункт назначения (получатель)*, куда коммиты будут уходить.",
              "",
              "Однако, вы, наверное, задаётесь вопросом - а что, если я хочу, чтобы мои источник и получатель коммитов были различными? Что, если мы хотим запушить коммиты из локальной ветки `foo` в ветку `bar` на удалённом репозитории?",
              "",
              "К огромному сожалению, это невозможно сделать средствами git... Да ладно! Я пошутил! Конечно, это возможно :)... git сам по себе достаточно гибок (даже слишком).",
              "",
              "Мы увидим, как именно, на следующем слайде..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "В том случае, когда вам необходимо разделить источник и получатель аргумента `<пункт назначения>`, соедините их вместе, используя двоеточие:",
              "",
              "`git push origin <источник>:<получатель>`",
              "",
              "Обычно это называется `refspec`. Refspec — это всего лишь модное имя для определения местоположения, которое git может распознать (например, ветка `foo` или просто `HEAD~1`)",
              "",
              "Как только вы указали источник и получатель независимо друг от друга, вы можете довольно причудливо и точно использовать команды для работы с удалёнными ветками и репозиториями. Давайте взглянем на демонстрацию!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Помните, `источник` - всего лишь местоположение, которое git должен понять:"
            ],
            "afterMarkdowns": [
              "Вау! Это довольно нетривиальная команда, однако она имеет смысл - git видит в `foo^` не что иное, как местоположение, закачивает все коммиты, которые не присутствуют на удалённом репозитории, и затем обновляет получателя."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "А что если пункт назначения, в который вы хотите запушить, не существует? Без проблем! Укажите имя ветки, и git сам создаст ветку на удалённом репозитории для вас."
            ],
            "afterMarkdowns": [
              "Класс! Довольно легко! :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Для выполнения данного уровня попытайтесь привести своё дерево к такому же виду, как на визуализации. И не забудьте о формате:",
              "",
              "`<источник>:<получатель>`"
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
              "## `<place>` 인자에 대한 세부사항들",
              "",
              "",
              "기억하세요? 이전 강의에서 우리는 `master`를 커밋의 근원이되는 *source*와 목적지가 되는 *destination*으로 명령어의 인자로 넣어줌으로써 지정해줬습니다.",
              "여러분은 이런 생각이 들 수 있어요 -- 내가 source와 destination이 다르길 원하면 어떻게 해야되지? 로컬의 `foo` 브랜치에서 원격의 `bar` 브랜치로 커밋을 push하고 싶으면 어떻게 해야 되지?",
              "",
              "사실 git에서는 그게 불가능합니다... 네 농담이고! 당연 가능합니다 :)... git의 어마무시하게 유연합니다(지나칠정도로요).",
              "",
              "어떻게 하는지는 다음 슬라이드에서 확인해봅시다..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "source와 destination을 모두 지정하기 위해서는, 이렇게 간단히 두개를 콜론을 사이에 두고 표현하면 됩니다.",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "이것을 일반적으로 colon refspec(콜론 참조스펙)이라고 부릅니다. 참조스펙은 그냥 \"git이 알아낼 수 있는 위치\"를 이름 붙여서 말하는거에요 (브랜치 'foo'라던가 HEAD~1 라던가)",
              "",
              "source와 destination을 따로 지정할 수 있게 되면서, 이제 원격관련 명령어를 좀 멋지고 정확히 사용할수 있게 되었어요. 데모를 봅시다!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "기억하세요, `source`는 git이 이해하는 아무 위치를 말합니다.:"
            ],
            "afterMarkdowns": [
              "워 뭔가 잘 안쓸것 같은 명령이지만 잘 됩니다 -- git은 `foo^`의 위치를 알아내서 원격 저장소에 아직 반영되지 않은 커밋들을 업로드하고 destination 브랜치를 갱신했습니다."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "만약 여러분이 push하고 싶은 destination(목적지)가 없으면 어떻게하죠? 아무 문제 없어요! git이 만들 새 브랜치 이름을 지어주면 git이 원격 저장소에 새 브랜치를 만들어 줄거에요."
            ],
            "afterMarkdowns": [
              "좋네요, 번지르르 삐까뻔쩍 :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이번 레벨에서는, goal 시각화에 나오는 것처럼 만들어 주세요 인자의 형식은 다음과 같다는걸 기억하세요:",
              "",
              "`<source>:<destination>`"
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
              "## Детальніше про аргумент `<place>`",
              "",
              "З попереднього уроку нам відомо, що коли ми вказуємо `master` в якості аргумента place для git push, ми задаємо і гілку, *з якої* брати нові коміти, і гілку *до якої* їх буде перенесено.",
              "",
              "Тут ти можеш задуматись, а чи можуть гілки, звідки беремо, і куди переносимо, бути різними? Що, коли потрібно коміти з локальної гілки `foo` перенести у віддалену гілку `bar`?",
              "",
              "Нажаль в git це неможливо... жартую! Звісно, що можливо :)... git просто неймовірно гнучкий (іноді аж занадто).",
              "",
              "Подивімося як це робиться..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Для того, щоб в одному аргументі `<place>` вказати і місце звідки і куди, треба їх просто розділити двокрапкою:",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "Такий запис називають \"colon refspec\". Тут refspec - це просто зручна назва місця, яке git може ідентифікувати (наприклад, гілка `foo` чи просто `HEAD~1`)",
              "",
              "Можливість вказати два різних місця дає велику свободу і гнучкість в роботі з віддаленим репозиторієм. Подивімось демонстрацію!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Пам'ятай, `source` -- це будь-яка назва місця, зрозуміла гіту:"
            ],
            "afterMarkdowns": [
              "Овва! Це доволі незвична команда, але тут все має сенс -- git, знаючи куди вказує `foo^`, завантажив на віддалену сторону ще відсутні там коміти і оновив місце призначення."
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "А що, коли вказаного місця призначення не існує? Нема проблем! Просто вкажи назву гілки і гіт створить її на віддаленому сервері."
            ],
            "afterMarkdowns": [
              "Спритно, еге-ж? :D"
            ],
            "command": "git push origin master:newBranch",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "На цьому рівні спробуй досягти стану ропозиторію, показаного у візуалізації і пам'ятай про формат запису з двокрапкою:",
              "",
              "`<source>:<destination>`"
            ]
          }
        }
      ]
    }
  }
};
