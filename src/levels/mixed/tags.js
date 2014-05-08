exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C3\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\",\"C4\"],\"id\":\"C5\"}},\"tags\":{\"v1\":{\"target\":\"C2\",\"id\":\"v1\",\"type\":\"tag\"},\"v0\":{\"target\":\"C1\",\"id\":\"v0\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"C2\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git tag v1 side~1;git tag v0 master~2;git checkout v1",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C3\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\",\"C4\"],\"id\":\"C5\"}},\"tags\":{},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Git Tags",
    "de_DE": "Git Tags",
    "es_AR": "Tags en git",
    "zh_TW": "git tag"
  },
  "hint": {
    "en_US": "you can either check out the commit directly or simply checkout the tag!",
    "de_DE": "Du kannst den Checkout entweder direkt auf den Commit oder das Tag machen.",
    "es_AR": "Podés checkoutear directamente el commit, ¡o simplemente el tag!",
    "zh_TW": "你可以直接 checkout 到 commit 上，或是簡單的 checkout 到 tag 上"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Tags",
              "",
              "As you have learned from previous lessons, branches are easy to move around and often refer to different commits as work is completed on them. Branches are easily mutated, often temporary, and always changing.",
              "",
              "If that's the case, you may be wondering if there's a way to *permanently* mark historical points in your project's history. For things like major releases and big merges, is there any way to mark these commits with something more permanent than a branch?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "You bet there is! Git tags support this exact use case -- they (somewhat) permanently mark certain commits as \"milestones\" that you can then reference like a branch.",
              "",
              "More importantly though, they never move as more commits are created. You can't \"check out\" a tag and then complete work on that tag -- tags exist as anchors in the commit tree that designate certain spots.",
              "",
              "Let's see what tags look like in practice."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's try making a tag at `C1` which is our version 1 prototype"
            ],
            "afterMarkdowns": [
              "There! Quite easy. We named the tag `v1` and referenced the commit `C1` explicitly. If you leave the commit off, git will just use whatever `HEAD` is at"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "For this level just create the tags in the goal visualization and then check `v1` out. Notice how you go into detached `HEAD` state -- this is because you can't commit directly onto the `v1` tag.",
              "",
              "In the next level we'll examine a more interesting use case for tags."
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
              "## git tag",
              "",
              "就像你之前學到的一樣，branch 很容易被移動，而且當有新的 commit 時，又會再移動，branch 經常指向不同的 commit，branch 很容易改變。",
              "",
              "你可能會有疑問，有沒有什麼方法可以*永遠*有一個指向 commit 的記號，例如，表示重大的軟體釋出，或者是修正很大的 bug，有沒有其它比 branch 更好的方法，可以永遠地指向這些 commit？",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "你說對了！git tag 可以解決這個問題，它們可以永遠地指向某個特定的 commit，就像是表示一個\"里程碑\"一樣。",
              "",
              "更重要的是，當有新的 commit 時，它們也不會移動，你不可以 \"checkout\" 到 tag 上面 commit，tag 的存在就像是一個在 commit tree 上的表示特定訊息的一個錨。",
              "",
              "讓我們來實際看一下 tag 長什麼樣子..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們試著建立一個 tag，指向 commit `C1`，表示這是我們第一個版本。"
            ],
            "afterMarkdowns": [
              "看吧！非常容易，我們命名這個 tag 叫做 `v1`，並且讓它指向 commit `C1`，如果你離開了該 commit，git 會根據 `HEAD` 所指向的位置才分辨。"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "在這個關卡中，建立一個如視覺化目標裡面的 tag，然後 checkout 到 `v1` 上面，要注意你會進到分離 `HEAD` 的狀態，這是因為你不能夠直接在 `v1` 上面做 commit。",
              "",
              "在下個關卡中我們會介紹更多 tag 的應用..."
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
              "## Tags en git",
              "",
              "Como aprendiste en lecciones anteriores, las ramas pueden moverse fácilmente, y en general van referenciando distintos commits a medida que el trabajo se va completando en ellas. Las ramas cambian fácilmente, suelen ser temporales, y siempre cambiantes.",
              "",
              "Si ese es el caso, te podrías estar preguntando si hay una manera de marcar *permanentemente* puntos en la historia de tu proyecto. Para cosas como releases mayores o grandes merges, ¿hay algún modo de marcar esos commits con algo más permanente que un branch?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¡Seguro que hay! Los tags de git soportan exactamente este caso de uso -- marcan (bastante) permanentemente determinados commits como \"hitos\" que podés referenciar como a un branch.",
              "",
              "Aún más importante, los tags no avanzan cuando se crean nuevos commits. No podés \"checkoutear\" un tag y completar el trabajo en ese tag - los tags son marcas fijas en el árbol de commits que designan ciertos puntos.",
              "",
              "Veamos cómo se ven los tags en práctica..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Creemos un tag en `C1`, que es nuestro prototipo de la versión 1"
            ],
            "afterMarkdowns": [
              "¡Ahí está! Bastante simple. Nombramos al tag `v1` y referenciamos explícitamente al commit `C1`. Si no especificás el commit, git va a usar al apuntado por `HEAD`"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para este nivel, simplemente creá los tags en la visualización final y después checkouteá `v1`. Notá cómo entrás en el estado detached -- esto es porque no podés commitear directamente sobre el tag `v1`.",
              "",
              "En el próximo nivel vamos a examinar un caso de uso más interesante para los tags."
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
              "## Git Tags",
              "",
              "Wie du aus den vorhergehenden Levels weißt sind Branches einfach durch die Gegend zu schieben und zeigen of auf verschiedene Commits, während die Arbeit in ihnen fortschreitet. Ein Branch wird oft verändert, manchmal nur temporär, und ist ständig in Bewegung.",
              "",
              "Da das so ist fragst du dich vielleicht, ob es nicht eine Möglichkeit gibt, eine bestimmte Stelle in deiner Projekt-History *permanent* zu kennzeichnen. Kann man nicht zum Beispiel für große Releases und Meilensteine nicht einen Commit mit etwas festerem kennzeichnen, als mit einem Branch-Namen?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Aber klar! In Git gibt es genau zu diesem Zweck Tags -- sie kennzeichnen einen Commit (ziemlich) permanent als Meilenstein oder ähnliches, und man kann sie ansprechen wie Branch-Namen.",
              "",
              "Noch viel wichtiger, Tags verändern nicht ihre Position wenn man Commits hinzufügt. Du kannst ein Tag nicht in diesem Sinne auschecken und dann Modifikationen darauf committen. Tags sind Anker im Commit-Baum, die bestimmte Stellen anzeigen.",
              "",
              "Lass uns anschauen wie Tags in der Praxis funktionieren."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
            "Lass uns ein Tag bei `C1` anlegen und damit die Version 1 unseres Prototyps markieren."
            ],
            "afterMarkdowns": [
              "Peng! Ziemlich einfach. Wir haben das Tag `v1` genannt und lassen es auf `C1` zeigen. Wenn du den Commit weglässt wir das Tag für den Commit erzeugt, auf den `HEAD` zeigt."
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level zu schaffen, erstelle einfach die Tags wie sie in der Zielbeschreibung stehen und mach dann einen Checkout auf `v1`. Beachte wie du dabei in den \"Detached HEAD\" Zustand gehst -- das liegt daran, dass du keine Commits direkt auf das `v1` Tag machen kannst.",
              "",
              "Im nächsten Level schauen wir uns dann interessantere Anwendungsfälle für Tags an."
            ]
          }
        }
      ]
    }
  }
};
