exports.level = {
    "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C4\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C4\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C5\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C5\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin master^:foo;git push origin foo:master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C4\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git push arguments -- Expanded!",
    "de_DE": "Optionen fü Git Push -- noch mehr!"
  },
  "hint": {
    "en_US": "Remember you can admit defeat and type in \"show solution\" :P",
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
              "What if the destination you want to push doesn't exist? No problem! Just give a branch name and git will create the branch on the remote for you"
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
