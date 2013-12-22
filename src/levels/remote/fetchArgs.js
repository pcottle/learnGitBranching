exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C7\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C3\",\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C6\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git fetch origin master~1:foo;git fetch origin foo:master;git checkout foo;git merge master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"C1\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C6\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Fetch arguments",
    "de_DE": "Optionen für Fetch"
  },
  "hint": {
    "en_US": "Pay attention how the commit ids may have swapped! You can read slides again with \"help level\"",
    "de_DE": "Beachte wie die Commit IDs getauscht wurden! Du kannst den Einführungsdialog mit \"help level\" erneut anzeigen"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git fetch arguments",
              "",
              "So we've just learned all about git push arguments, this cool `<place>` parameter, and even colon refspecs (`<source>:<destination>`). Can we use all this knowledge for `git fetch` as well?",
              "",
              "You betcha! The arguments for `git fetch` are actually *very, very* similar to those for `git push`. It's the same type of concepts but just applied in the opposite direction (since now you are downloading commits rather than uploading).",
              "",
              "Let's go over the concepts one at a time..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### The `<place>` parameter",
              "",
              "If you specify a place with git fetch like in the following command:",
              "",
              "`git fetch origin foo`",
              "",
              "Git will go to the `foo` branch on the remote, grab all the commits that aren't present locally, and then plop them down onto the `o/foo` branch locally.",
              "",
              "Let's see this in action (just as a refresher)"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "By specifying a place..."
            ],
            "afterMarkdowns": [
              "We download only the commits from `foo` and place them on `o/foo`"
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "You might be wondering -- why did git plop those commits onto the `o/foo` remote branch rather than just plopping them onto my local `foo` branch? I thought the `<place>` parameter is a place that exists both locally and on the remote?",
              "",
              "Well git makes a special exception in this case because you might have work on the `foo` branch that you don't want to mess up!! This ties into the earlier lesson on `git fetch` -- it doesn't update your local non-remote branches, it only downloads the commits (so you can inspect / merge them later).",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "\"Well in that case, what happens if I explicitly define both the source and destination with `<source>:<destination>`?\"",
              "",
              "If you feel passionate enough to fetch commits *directly* onto a local branch, then yes you can specify that with a colon refspec. You can't fetch commits onto a branch that is checked out, but otherwise git will allow this.",
              "",
              "Here is the only catch though -- `<source>` is now a place on the *remote* and `<destination>` is a *local* place to put those commits. It's the exact opposite of git push, and that makes sense since we are transferring data in the opposite direction!",
              "",
              "That being said, developers rarely do this in practice. I'm introducing it mainly as a way to conceptualize how `fetch` and `push` are quite similar, just in opposite directions"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see this craziness in action:"
            ],
            "afterMarkdowns": [
              "Wow! See, git resolved `foo~1` as a place on the origin and then downloaded those commits to `bar` (which was a local branch). Notice how `foo` and `o/foo` were not updated since we specified a destination"
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What if the destination doesnt exist before I run the command? Lets see the last slide but without `bar` existing beforehand"
            ],
            "afterMarkdowns": [
              "See, it's JUST like git push. Git made the destination locally before fetching, just like git will make the destination on remote before pushing (if it doesn't exist)"
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "No args?",
              "",
              "If `git fetch` receives no arguments, it just downloads all the commits from the remote onto all the remote branches..."
            ],
            "afterMarkdowns": [
              "Pretty simple, but worth going over just once"
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, enough talking! To finish this level, fetch just the specified commits in the goal visualization. Get fancy with those commands!",
              "",
              "You will have to specify the source and destination for both fetch commands. Pay attention to the goal visualization since the IDs may be switched around!"
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
              "## Git Fetch Optionen",
              "",
              "Nun haben wir also alles über `git push` Optionen gelernt, diesen coolen `<Ort>`-Parameter, and sogar über mit Doppelpunkt getrennte Ref-Spezifikationen (`<Quelle>:<Ziel>`). Können wir all dieses neu erworbene Wissen auch auf `git fetch` anwenden?",
              "",
              "Jede Wette! Die Optionen für `git fetch` sind wirklicht *sehr, sehr* ähnlich denen von `git push`. Es sind dieselben Verfahren, nur in die andere Richtung angewendet (da man bei `fetch` herunterlädt anstatt hochzuladen).",
              "",
              "Gehen wir die verschiedenen Verfahrensweise mal eine nach der anderen durch ..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Der Parameter `<Ort>`",
              "",
              "Wenn du, wie folgt, einen \"Ort\" bei `git fetch` angibst:",
              "",
              "`git fetch origin foo`",
              "",
              "wird Git zum Branch `foo` auf dem Remote gehen, dort alle Änderungen holen, die es lokal noch nicht gibt, und sie an den lokalen Branch `o/foo` anhängen.",
              "",
              "Schauen wir uns das mal live an (nur zur Wiederholung)"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Durch Angabe eines Ortes ..."
            ],
            "afterMarkdowns": [
              "... laden wir die fehlenden Commits von `foo` und packen sie auf `o/foo` drauf."
            ],
            "command": "git fetch origin foo",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Du wunderst dich vielleicht warum Git diese Commits auf den `o/foo` Branch gepacht hat, anstatt einfach direkt auf den lokalen Branch `foo`? Zeigt der Parameter `<Ort>` nicht einen Ort an, der sowohl lokal als auch entfernt existiert?",
              "",
              "Nun ja, Git geht diesen Schritt weil du auf `foo` ja noch Commits haben könntest, die nicht auf dem Server sind, und da will es nichts durcheinander bringen. Ähnlich wie beim früheren Level zu `git fetch` -- es aktualisiert nicht deine lokalen Arbeits-Branches, es lädt die Commits nur in die `o` (bzw. `origin`) Branches, damit du sie dir in Ruhe anschauen und integrieren kannst.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wenn das so ist, was passiert dann wenn ich explizit Quelle und Ziel im Ort angebe?",
              "",
              "Wenn du Commits wirklich per `fetch` *direkt* auf einen lokalen Branch holen willst, dann, ja, kannst du das mit einer Ref-Spezifikation erreichen. Das funktioniert nicht mit deinem gerade ausgecheckten Branch, aber davon abgesehen lässt Git es zu.",
              "",
              "Nur ein Haken -- `<Quelle>` bezeichnet jetzt einen Ort auf dem *entfernten* Server und `<Ziel>` ist ein *lokaler* Ort, wo die Commits hin sollen. Es ist genau umgekehrt wie bei `git push` und das ist logisch, denn wir übertragen die Daten ja auch in die umgekehrte Richtung!",
              "",
              "Davon abgesehen benutzt man das in der Praxis kaum. Ich zeige das vor allem um zu verdeutlichen, wie `fetch` und `push` sehr ähnlich sind, nur in entgegengesetzten Richtungen."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns den Quatsch mal in Aktion an:"
            ],
            "afterMarkdowns": [
              "Wow! Siehst du, git löst `foo~1` als Ort auf dem Server `origin` auf und lädt dessen Commits herunter in `bar` hinein. Beachte wie `foo` und `o/foo` *nicht* aktualisiert wurden, da wir ein Ziel angegeben haben."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was ist denn wenn das Ziel nicht existiert, für das ich den Befehl ausführe? Schauen wir uns das letzte Beispiel noch mal an, nur dass `bar` jetzt noch nicht existiert."
            ],
            "afterMarkdowns": [
              "Siehst du, es ist *genau* wie `git push`. Git erstellt das Ziel lokal bevor es den `fetch` ausführt, genauso wie Git erst das Ziel auf dem Remote erstellt, befor es pusht (falls das Ziel nicht existiert)."
            ],
            "command": "git fetch origin foo~1:bar",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Keine Optionen?",
              "",
              "Wenn bei `git fetch` keine Optionen angegeben werden, lädt es einfach alle Commits vom Remote auf die lokalen Abbildungen aller Remote Branches ..."
            ],
            "afterMarkdowns": [
              "Ziemlich einfach, aber man sollte es mal gesehen haben."
            ],
            "command": "git fetch",
            "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, genug gelabert! Um den Level zu schaffen musst du nur die im Zielbild angegebenen Commits per `fetch` holen. Sei kreativ mit den Befehlen!",
              "",
              "Du wirst Quelle und Ziel bei beiden `fetch` Befehlen angeben müssen. Schau dir das Zielbild gut an, da die IDs vertauscht sein könnten!"
            ]
          }
        }
      ]
    }
  }
};
