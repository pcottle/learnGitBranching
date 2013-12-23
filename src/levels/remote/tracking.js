exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22o/master%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D",
  "solutionCommand": "git checkout -b side o/master;git commit;git pull --rebase;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Remote Tracking",
    "de_DE": "Remote Tracking"
  },
  "hint": {
    "en_US": "Remember there are two ways to set remote tracking!",
    "de_DE": "Nicht vergessen, es gibt zwei Arten Remote Tracking einzurichten!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Remote-Tracking branches",
              "",
              "One thing that might have seemed \"magical\" about the last few lessons is that git knew the `master` branch was related to `o/master`. Sure these branches have similar names and it might make logical sense to connect the `master` branch on the remote to the local `master` branch, but this connection is demonstrated clearly in two scenarios:",
              "",
              "* During a pull operation, commits are downloaded onto `o/master` and then *merged* into the `master` branch. The implied target of the merge is determined from this connection.",
              "* During a push operation, work from the `master` branch was pushed onto the remote's `master` branch (which was then represented by `o/master` locally). The *destination* of the push is determined from the connection between `master` and `o/master`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote tracking",
              "",
              "Long story short, this connection between `master` and `o/master` is explained simply by the \"remote tracking\" property of branches. The `master` branch is set to track `o/master` -- this means there is an implied merge target and implied push destination for the `master` branch.",
              "",
              "You may be wondering how this property got set on the `master` branch when you didn't run any commands to specify it. Well, when you clone a repository with git, this property is actually set for you automatically. ",
              "",
              "During a clone, git creates a remote branch for every branch on the remote (aka branches like `o/master`). It then creates a local branch that tracks the currently active branch on the remote, which is `master` in most cases.",
              "",
              "Once git clone is complete, you only have one local branch (so you aren't overwhelmed) but you can see all the different branches on the remote (if you happen to be very curious). It's the best of both worlds!",
              "",
              "This also explains why you may see the following command output when cloning:",
              "",
              "    local branch \"master\" set to track remote branch \"o/master\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Can I specify this myself?",
              "",
              "Yes you can! You can make any arbitrary branch track `o/master`, and if you do so, that branch will have the same implied push destination and merge target as `master`. This means you can run `git push` on a branch named `totallyNotMaster` and have your work pushed to the `master` branch on the remote!",
              "",
              "There are two ways to set this property. The first is to checkout a new branch by using a remote branch as the specified ref. Running",
              "",
              "`git checkout -b totallyNotMaster o/master`",
              "",
              "Creates a new branch named `totallyNotMaster` and sets it to track `o/master`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Enough talking, let's see a demonstration! We will checkout a new branch named `foo` and set it to track `master` on the remote."
            ],
            "afterMarkdowns": [
              "As you can see, we used the implied merge target of `o/master` to update the `foo` branch. Note how master doesn't get updated!!"
            ],
            "command": "git checkout -b foo o/master; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "This also applies for git push"
            ],
            "afterMarkdowns": [
              "Boom. We pushed our work to the `master` on the remote even though our branch was named something totally different"
            ],
            "command": "git checkout -b foo o/master; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Way #2",
              "",
              "Another way to set remote tracking on a branch is to simply use the `git branch -u` option. Running",
              "",
              "`git branch -u o/master foo`",
              "",
              "will set the `foo` branch to track `o/master`. If `foo` is currently checked out you can even leave it off:",
              "",
              "`git branch -u o/master`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see this other way of specifying remote tracking real quick..."
            ],
            "afterMarkdowns": [
              "Same as before, just a more explicit command. Sweet!"
            ],
            "command": "git branch -u o/master foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! For this level let's push work onto the `master` branch on remote while *not* checked out on `master` locally. I'll let you figure out the rest since this is the advanced course :P"
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
              "### Remote Tracking Branches",
              "",
              "In den letzten paar Leveln wirkte es womöglich etwas \"magisch\", dass Git automatisch wusste, dass der Branch `master` irgendwie mit `o/master` verwandt ist. Klar, sie haben ähnliche Namen und daher mag es logisch erscheinen sie in Verbindung zu bringen, aber offensichtlich wird es in zwei Szenarien:",
              "",
              "* Beim `pull` werden Commits in `o/master` heruntergeladen und dann per *Merge* in den Branch `master` gebracht. Aus der Verbindung zwischen den beiden Branches leitet sich das Ziel des Merges ab.",
              "* Beim `push` werden Commits vom `master` auf den `master` auf dem Remote Server geschoben (und die Änderung _danach_ in `o/master` abgebildet). Das *Ziel* des Push wird aus der Verbindung zwischen `master` und `o/master` abgeleitet.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Langer Rede kurzer Sinn, die Verbindung zwischen `master` und `o/master` ist einfach die Eigenschaft des \"Remote Tracking\" dieser Branches. `master` ist so eingestellt, dass er `o/master` trackt -- das heißt es gibt ein implizites Ziel für `pull` und `push` Operationen auf dem `master` Branch.",
              "",
              "Du fragst dich vielleicht wieso diese Eigenschaft auf dem `master` definiert ist, wenn du das doch gar nicht explizit gemacht hast. Naja, beim Clonen eines Repository macht Git das für den `master` automatisch.",
              "",
              "Während des Clonens erstellt Git einen Remote Branch für jeden Branch, den es auf dem Remote Server findet (also Branches wie `o/master`); dann erstellt es für den Branch, auf den auf dem entfernten Server `HEAD` zeigt (meistens `master`) automatisch einen lokalen Branch und stellt ihn so ein, dass er sein Gegenstück auf dem Server trackt. Deswegen hast du beim clonen vielleicht schon mal dies gesehen:",
              "",
              "    local branch \"master\" set to track remote branch \"o/master\""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Kann ich das auch selbst machen?",
              "",
              "Na klar! Du kannst jeden beliebigen Branch so einstellen, dass er `o/master` trackt, und wenn du das tust wird der Branch dieselben impliziten Zielangaben für `push` und `pull` haben wie `master`. Du kannst also `git push` auf dem Branch `absolut_nicht_master` ausführen und deine Commits auf `master` auf dem entfernten Server schieben lassen.",
              "",
              "Es gibt zwei Möglichkeiten diese Eigenschaft zu definieren. Die erste ist, einen neuen lokalen Branch von einem Remote Branch auszuchecken. Wenn man",
              "",
              "    git checkout -b absolut_nicht_master o/master",
              "",
              "eingibt, wir ein neuer lokaler Branch namens `absolut_nicht_master` angelegt, der `o/master` trackt."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Genug gequatscht, schauen wir uns eine Demonstration an! Wir checken einen neuen Branch `foo` aus, so dass er `master` auf dem Server trackt."
            ],
            "afterMarkdowns": [
              "Wie du siehst benutzen wir der implizite Ziel beim `pull` um `foo` zu aktualisieren. Beachte, dass `master` nicht aktualisiert wird."
            ],
            "command": "git checkout -b foo o/master; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Das gilt auch für `git push`."
            ],
            "afterMarkdowns": [
              "Bämm. Wir haben unsere Commits auf den `master` auf dem Server geschoben, obwohl unser lokaler Branch völlig anders heißt."
            ],
            "command": "git checkout -b foo o/master; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Methode 2",
              "",
              "Noch eine Möglichkeit um Remote Tracking auf einem Branch einzustellen, ist einfach `git branch -u` zu benutzen. Wenn man",
              "",
              "    git branch -u o/master foo",
              "",
              "eingibt, wir damit der lokale Branch `foo` so eingestellt, dass er `o/master` trackt. Den Namen des lokalen Branch kannst du auch weglassen, falls du ihn eh aktuell ausgecheckt hast:",
              "",
              "    git branch -u o/master",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns auch diese Methode noch an ..."
            ],
            "afterMarkdowns": [
              "Genau wie vorher, nur ein bisschen ausführlicherer Befehl. Schick!"
            ],
            "command": "git branch -u o/master foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok. In diesem Level muss du Commits auf den `master` auf dem Server schieben, *ohne* den lokalen `master` ausgecheckt zu haben. Den Rest kannst du selbst herausfinden, schließlich ist das hier für Fortgeschrittene. :P"
            ]
          }
        }
      ]
    }
  }
};
