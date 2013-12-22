exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git pull",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git Pullin'",
    "de_DE": "Git Pull"
  },
  "hint": {
    "en_US": "Just run git pull!",
    "de_DE": "Führe einfach git pull aus."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Pull",
              "",
              "Now that we've seen how to fetch data from a remote repository with `git fetch`, lets update our work to reflect those changes!",
              "",
              "There are actually many ways to do this -- once you have new commits available locally, you can incorporate them as if they were just normal commits on other branches. This means you could execute commands like:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* etc, etc",
              "",
              "In fact, the workflow of *fetching* remote changes and then *merging* them is so common that git actually make a command that does both at once! That command is `git pull`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's first see a `fetch` and a `merge` executed sequentially"
            ],
            "afterMarkdowns": [
              "Boom -- we downloaded `C3` with a `fetch` and then merged in that work with `git merge o/master`. Now our `master` branch reflects the new work from the remote (in this case, named `origin`)"
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What would happen if we used `git pull` instead?"
            ],
            "afterMarkdowns": [
              "The same thing! That should make it very clear that `git pull` is essentially shorthand for a `git fetch` followed by a merge of whatever branch was just fetched."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "We will explore the details of `git pull` later (including options and arguments), but for now let's try it out in the level.",
              "",
              "Remember -- you can actually solve this level with just `fetch` and `merge`, but it will cost you an extra command :P"
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
              "## Git Pull",
              "",
              "Jetzt, wo wir wissen wie wir mit `git fetch` Daten von einem entfernten Repository holen können, wollen wir unsere lokalen Daten aktualisieren, damit sie die Änderungen vom Server beinhalten.",
              "",
              "Tatsächlich gibt es eine Menge Wege dies zu erreichen -- sobald du die neuen Commits lokal verfügbar hast, kannst du sie integrieren so als wären es Commits von ganz normalen anderen Branches. Du kannst also:",
              "",
              "* `git cherry-pick o/master`",
              "* `git rebase o/master`",
              "* `git merge o/master`",
              "* usw. usf. ausfúhren.",
              "",
              "Der Ablauf, die Änderungen vom Server zu holen und dann in die eigene Arbeit zu mergen wird so häufig benötigt, dass Git einen Befehl kennt der beides auf einmal erledigt! Das ist `git pull`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns erst mal ein `fetch` gefolgt von `merge` an:"
            ],
            "afterMarkdowns": [
              "Bämm -- wir haben `C3` mit `fetch` heruntergeladen und dann in unseren Branch mit `git merge o/master` integriert. Nun bildet unser `master` dieselben Inhalte ab, wie sie auf dem entfernten Server (`origin`) liegen."
            ],
            "command": "git fetch; git merge o/master",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was passiert wohl, wenn wir stattdessen `git pull` benutzen?"
            ],
            "afterMarkdowns": [
              "Dasselbe in Pink. Das sollte recht deutlich machen, dass `git pull` nur eine Abkürzung für `git fetch` gefolgt von einem Merge des gerade aktualisierten Branches ist."
            ],
            "command": "git pull",
            "beforeCommand": "git clone; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Die Feinheiten von `git pull` werden wir uns später ansehen, für's Erste lass es uns in diesem Level ausprobieren.",
              "",
              "Vergiss nicht -- du kannst diesen Level auch mit `fetch` und `merge` lösen, aber das kostet dich einen Befehl extra. :P"
            ]
          }
        }
      ]
    }
  }
};
