exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C2\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C3\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"C0\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin master;git push origin foo",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"C0\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "disabledMap": {
    "git checkout": true
  },
  "name": {
    "en_US": "Git push arguments",
    "zh_CN": "Git push 参数",
    "de_DE": "Optionen für Git Push"
  },
  "hint": {
    "en_US": "You can always look at the last slide of the dialog with \"objective\"",
    "de_DE": "Du kannst dir die Zielsetzung des Levels immer wieder mit \"objective\" anzeigen lassen"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Push arguments",
              "",
              "Great! Now that you know about remote tracking branches we can start to uncover some of mystery behind how git push, fetch, and pull work. We're going to tackle one command at a time but the concepts between them are very similar.",
              "",
              "First we'll look at `git push`. You learned in the remote tracking lesson that git figured out the remote *and* the branch to push to by looking at the properties of the currently checked out branch (the remote that it \"tracks\"). This is the behavior with no arguments specified, but git push can optionally take arguments in the form of:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "What is a `<place>` parameter you say? We'll dive into the specifics soon, but first an example. Issuing the command:",
              "",
              "`git push origin master`",
              "",
              "translates to this in English:",
              "",
              "*Go to the branch named \"master\" in my repository, grab all the commits, and then go to the branch \"master\" on the remote named \"origin.\" Place whatever commits are missing on that branch and then tell me when you're done.*",
              "",
              "By specifying `master` as the \"place\" argument, we told git where the commits will *come from* and where the commits *will go*. It's essentially the \"place\" or \"location\" to synchronize between the two repositories.",
              "",
              "Keep in mind that since we told git everything it needs to know (by specifying both arguments), it totally ignores where we are checked out!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see an example of specifying the arguments. Note the location where we are checked out in this example."
            ],
            "afterMarkdowns": [
              "There we go! `master` got updated on the remote since we specified those arguments."
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What if we hadn't specified the arguments? What would happen?"
            ],
            "afterMarkdowns": [
              "The command fails (as you can see), since `HEAD` is not checked out on a remote-tracking branch."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, for this level let's update both `foo` and `master` on the remote. The twist is that `git checkout` is disabled for this level!"
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
              "## Push 参数",
              "",
              "Great! Now that you know about remote tracking branches we can start to uncover some of mystery behind how git push, fetch, and pull work. We're going to tackle one command at a time but the concepts between them are very similar.",
              "好! 既然你知道了远端跟踪分支, 我们可以开始揭开隐藏在git push/pull/fetch背后的秘密. ",
              "",
              "首先看看`git push`, 在远端跟踪分支中, 你学到了git 会找出要push的目的地(通过查看检出的分支, 及分支关联到的跟踪分支). 这是无参数的行为, 不过我们也可以为push指定参数:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "What is a `<place>` parameter you say? We'll dive into the specifics soon, but first an example. Issuing the command:",
              "`<place>` 参数意味什么呢? 我们会深入其中的细节, 先看看例子, 这个命令是:",
              "",
              "`git push origin master`",
              "",
              "* 切到master分支, 然后抓取所有的提交, 再将新提交推送到远端的master分支!",
              "",
              "通过指定`master`为<place>参数, 我们告诉git 提交来自于master, 要推送到远端的master. 这种使用方式基本上用于同步两仓库",
              "",
              "谨记, 因为我们通过指定参数告诉了git 所有的事, git 就忽略了我们所检出的分支(转而直接使用参数指定的分支作为source/destination)"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我们看看指定参数的例子. 注意下我们当前检出的位置."
            ],
            "afterMarkdowns": [
              "好了! 通过指定参数, 远端的`master` 得到了更新"
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "不指定参数会发生什么呢?"
            ],
            "afterMarkdowns": [
              "命令失败了! 因为我们所check out 的HEAD没有跟踪分支.  "
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "本节, 我们要更新远端的`foo`和`master`, 在本节中`git checkout` 是被禁用的!"
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
              "## Push-Optionen",
              "",
              "Großartig! Da du dich jetzt mit Remote Tracking Branches auskennst können wir anfangen, die Geheimnisse hinter `git push`, `fetch` und `pull` zu ergründen. Wir werden uns einen Befehl nach dem anderen vornehmen, aber die Funktionsweisen sind sich sehr ähnlich.",
              "",
              "Zunächst schauen wir uns `git push` an. Du hast im Level über Remote Tracking schon mitbekommen, dass Git den Remote Server *und* den Branch herausbekommt, indem es sich die Eigenschaften des aktuell ausgecheckten Branches ansieht (in denen das Remote steht, das der Branch \"trackt\"). Das ist das Verhalten bei keiner Angabe weiterer Optionen -- du kannst bei `git push` aber auch folgende setzen:",
              "",
              "`git push <Remote> <Ort>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Was \"Ort\" sein soll fragst du? Das klären wir später genau, schauen wir uns zunächst ein Beispiel an:",
              "",
              "`git push origin master`",
              "",
              "Das bedeutet im Klartext:",
              "",
              "\"Geh zum Branch namens `master` in meinem Repository, nimm all seine Commits, dann geh zum Branch `master` auf dem Remote namens `origin`. Leg da alles Commits ab die fehlen und sag mir wenn du fertig bist.\"",
              "",
              "Dadurch, dass wir `master` als \"Ort\" angegeben haben, weiß Git *woher* die Commits kommen und *wohin* sie sollen. Es ist im Grunde der Name der Orte, die zwischen zwei Repositorys synchronisiert werden soll.",
              "",
              "Dadurch, dass wir Git alles explizit gesagt haben, was es für die Operation wissen muss (durch Angabe von Remote und Ort) ist es vollkommen egal, was gerade ausgecheckt ist."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns noch ein Beispiel an. Beachte was in diesem Fall gerade ausgecheckt ist."
            ],
            "afterMarkdowns": [
              "Da haben wir's! `master` wurde auf dem Remote aktualisiert, weil wir beide Optionen angegeben haben."
            ],
            "command": "git checkout C0; git push origin master",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was wäre passiert, wenn wir keine Optionen benutzt hätten?"
            ],
            "afterMarkdowns": [
              "Der Befehl schlägt fehlt, da `HEAD` nicht auf einem Branch steht, der ein Remote trackt."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, in diesem Level lass und sowohl `foo` als auch `master` auf dem Remote aktualisieren. Um's spannender zu machen, ist `git checkout` in diesem Level deaktiviert."
            ]
          }
        }
      ]
    }
  }
};
