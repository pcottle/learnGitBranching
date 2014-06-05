exports.level = {
    "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C4\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C4\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C5\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C5\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin master^:foo;git push origin foo:master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C4\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git push arguments -- Expanded!",
    "zh_CN": "Git push 参数2!",
    "zh_TW": "git push 的參數，延伸討論！",
    "es_AR": "¡Más! Parámetros de git push",
    "de_DE": "Optionen fü Git Push -- noch mehr!"
  },
  "hint": {
    "en_US": "Remember you can admit defeat and type in \"show solution\" :P",
    "zh_CN": "如果你失败了, 可以通过 \"show solution\" 找到解决方案 :P",
    "zh_TW": "如果你失敗了，可以利用 \"show solution\" 來找到解答:P",
    "es_AR": "Recordá que podés admitir tu derrota y tipear \"show solution\" para ver la solución :P",
    "de_DE": "Vergiss nicht dass du aufgeben kannst, indem du \"show solution\" eingibst :P"
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
              "為了要指定 `<place>` 的 source 以及 destination，只要利用一個分號將這兩個連在一起：",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "這通常被稱為一個 colon （分號） refspec. refspec 只是一個表示 location （位置） 的花俏的名稱，這個位置可以被 git 辨別（例如 `foo` branch 或是 `HEAD~1`）。",
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
              "哇!這實在是一個很花俏的指令但是確很合理，git 把 `foo^` 解讀成一個位置，並且 push 該位置的 commit 到目前 remote 的 master branch。 "
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
              "还记得之前课程说的吧, 当为git push 指定master为place时,我们可以设置 要提交的来源 和 提交到目的地. ",
              "",
              "你可能想知道-- 如果来源和目的地不一样呢?  ",
              "",
              "好吧, 很不幸git 不可能做到... 只是个玩笑! 当然是可能的啦:)... git拥有超强的灵活性(几乎不能再多了) ",
              "",
              "我们看看下一个幻灯片..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要为<place> 指定 source 和 destination, 只需要用冒号`:`将二者联结.",
              "",
              "`git push origin <source>:<destination>`",
              "",
              "这通常被称为<colon refspec>, refspec是一个奇特的名-- 用于git 能识别的位置(比如分支foo 或者 HEAD~1) ",
              "",
              "一旦你指定了独立的来源和目的地, 你就可以得到花哨而精确的远程命令, 让我们看看演示! "
            ]
          }
        },
      {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "记住, `source` 是git 能理解任何位置:"
            ],
            "afterMarkdowns": [
              " 这是个很迷幻的命令, 但它是合理的 --  git 将foo^解析 为位置, 上传新提交到远端的目的地.  "
            ],
            "command": "git push origin foo^:master",
            "beforeCommand": "git clone; go -b foo; git commit; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果你要push到的destination不存在呢? 没问题! git 会在远端为你创建这个分支!"
            ],
            "afterMarkdowns": [
              "甜蜜吧! 干得漂亮!:D"
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
    }
  }
};
