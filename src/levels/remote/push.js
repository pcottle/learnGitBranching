exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git clone;git commit;git commit;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Git Pushin'",
    "zh_CN": "Git Pushin'",
    "de_DE": "Git Push"
  },
  "hint": {
    "en_US": "Remember you have to clone before you can push!",
    "zh_CN": "push之前你需要先克隆.",
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
