exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git clone;git commit;git commit;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Git Pushin'",
    "zh_CN": "Git Pushin'",
    "zh_TW": "git push",
    "es_AR": "git push",
    "de_DE": "Git Push"
  },
  "hint": {
    "en_US": "Remember you have to clone before you can push!",
    "zh_CN": "push之前你需要先克隆.",
    "zh_TW": "push 之前你需要先 clone",
    "es_AR": "¡Acordate que tenés que clonar antes de pushear!",
    "de_DE": "Denk dran, dass du einen Clone brauchst bevor du Pushen kannst!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Push",
              "",
              "Ok, so I've fetched changes from remote and incorporated them into my work locally. That's great and all... but how do I share _my_ awesome work with everyone else?",
              "",
              "Well, the way to upload shared work is the opposite of downloading shared work. And what's the opposite of `git pull`? `git push`!",
              "",
              "`git push` is responsible for uploading _your_ changes to a specified remote and updating that remote to incorporate your new commits. Once `git push` completes, all your friends can then download  your work from the remote.",
              "",
              "You can think of `git push` as a command to \"publish\" your work. It has a bunch of subtleties that we will get into shortly, but let's start with baby steps."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here we have some changes that the remote does not have. Let's upload them!"
            ],
            "afterMarkdowns": [
              "There we go -- the remote received commit `C2`, the branch `master` on the remote was updated to point at `C2`, and our *own* reflection of the remote (`o/master`) was updated as well. Everything is in sync!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, simply share two new commits with the remote. Strap in though, because these lessons are about to get a lot harder!"
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
              "## git push",
              "",
              "Ok, entonces ya bajé los cambios de un repositorio remoto y los integré en mi trabajo localmente. Esto es genial y todo... pero ¿cómo comparto _mis_ cambios con el resto?",
              "",
              "Bueno, la forma de subir el trabajo compartido es la opuesta a cómo descargar trabajo. Y ¿qué es lo opuesto a `git pull`? ¡`git push`!",
              "",
              "`git push` es el responsable de subir _tus_ cambios a un remoto específico y de actualizar ese remoto para incluir tus nuevos commits. Cuando `git push` termina, todos tus amigos pueden descargar tu trabajo del remoto.",
              "",
              "Podés pensar en `git push` como un comando para \"publicar\" tu trabajo. Tiene un par de sutilezas con las que vamos a meternos pronto, pero empecemos de a poco."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Acá tenemos algunos cambios que nuestro remoto no tiene. ¡Subámoslos!"
            ],
            "afterMarkdowns": [
              "Ahí está: el remoto recibió el commit `C2`, la rama `master` de ese remoto se actualizó para apuntar a `C2`, y nuestro *propio* reflejo del remoto (`o/master`) también fue actualizado. ¡Todo está en sincronía!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente compartí dos nuevos commits con el remoto. Igual, no te confíes, ¡ya se van a complicar las lecciones!"
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
              "## Git Push",
              "",
              "ok，現在我已經從 remote 下載了一些更新，並且把它們 merge 到我的 local 上面的 branch，這聽起來實在太讚了...，但是我要如何分享_我_所做的更新給其它人呢?",
              "",
              "喔，其實上傳並且分享更新跟下載更新並且 merge 是相反的兩件事情，那什麼是 `git pull` 的相反呢？ 那就是 `git push`！",
              "",
              "`git push` 負責上傳_你的_ commit 到特定 remote 上面並且做出相對應的更新，只要做完了 `git push`，所有你的朋友都可以從 remote 上面下載你所送出去的 commit。",
              "",
              "你可以把 `git push` 當作是一個\"發佈\"你的工作進度的指令，還有一些我們即將要講到的細節，但是先讓我們從一些簡單的步驟開始。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "這裡我們有了一些 remote 所沒有的 commit。讓我們來上傳它們吧！"
            ],
            "afterMarkdowns": [
              "我說的沒錯吧！remote 收到了 commit `C2`，同時在 remote 上的 `master` branch 也一起更新並且指向 `C2`，同時我們*自己的* `o/master` 也一併更新了！"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這個關卡，只要上傳兩個新的 commit 給 remote，不要太得意忘形喔！因為這些課程將會愈來愈難！"
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
              "## Git Push",
              "",
              "太棒了, 我们已经学习了从远端获取|合并工作到我们的本地工作.但是我们如果分享工作呢?",
              "",
              "好吧, 上载工作正好同下载工作相反, 那与`git pull`相反的命令是什么? `git push`! ",
              "",
              "`git push` 负责将你的提交上传到远端, 一旦`git push`完成, 你的朋友就可以在远端下载你的工作了! ",
              "",
              "你可以将`git push`视为发布你工作的命令. 它有一些特别的地方, 稍后我们会了解到, 我们开始吧."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "这里我们有一个变更, 而远端却没有, 我们先上传吧!"
            ],
            "afterMarkdowns": [
              "到了, 远端收到的了`C2`提交, 远端的`master`分支 也被更新并指到了`C2`,我们的远端代表(o/master)也同样被更新了. 所有的东西都被同步了!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成本节, 需要向远端分享两提交. 戒骄戒躁，课程还会更难哦! "
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
              "## Git Push",
              "",
              "Nun hab ich also Änderungen vom entfernten Server geholt und in meine lokale Arbeit integriert. Das ist schön und gut ... aber wie teile ich _meine_ Wahnsinns-Entwicklungen mit allen anderen?",
              "",
              "Naja, das Hochladen von Zeug ist das Gegenteil zum Herunterladen von Zeug. Und was ist das Gegenteil von `git pull`? Genau, `git push`!",
              "",
              "`git push` ist dafür verantwortlich _deine_ Änderungen zu einem bestimmten entfernten Server hochzuladen und dort zu integrieren. Sobald das `git push` durch ist, können alle deine Freunde diese Änderungen zu sich herunterladen.",
              "",
              "Du kannst dir `git push` als einen Befehl zum \"Veröffentlichen\" deiner Arbeit vorstellen. Es gibt da noch ein paar Feinheiten, aber lass uns mal mit kleinen Schritten anfangen."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hier haben wir ein paar Änderungen, die auf dem Remote noch fehlen. Und hoch damit!"
            ],
            "afterMarkdowns": [
              "Na bitte -- das Remote hat den Commit `C2` bekommen, der `master` auf dem Remote ist entsprechend aktualisiert worden und unsere *eigene* Abbildung des `master` auf dem Remote namens `o/master` wurde auch aktualisiert. Alles im Lot!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level zu schaffen musst du einfach nur zwei neue Commits auf das Remote bringen. Aber stell dich schon mal darauf ein, dass die nächsten Level anspruchsvoller werden!"
            ]
          }
        }
      ]
    }
  }
};
