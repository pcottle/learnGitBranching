exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C3\'","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C3\'","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"},"C2":{"parents":["C1"],"id":"C2"},"C3\'":{"parents":["C2"],"id":"C3\'"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C3\'","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3\'":{"parents":["C2"],"id":"C3\'"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}',
  "solutionCommand": "git fetch;git rebase o/main;git push",
  "startTree": '{"branches":{"main":{"target":"C3","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}',
  "name": {
    "en_US": "Keeping Your Fork in Sync"
  },
  "hint": {
    "en_US": "Catch up to the remote before sharing: `git fetch`, then `git rebase o/main`, then `git push`."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Keeping Your Fork in Sync",
              "",
              "Here's the most common team hiccup: you branch off, do great work... and meanwhile everyone else keeps shipping to the shared repo. By the time you're ready to open your Pull Request, `main` has moved on without you.",
              "",
              "On GitHub this shared repo is often your **upstream**, and your personal copy is your **fork**, but the sync dance is the same either way: grab what's new, replay your work on top, and share it.",
              "",
              "Right now your `o/main` is stale and your commit sits on an old base. If you `git push` like this, git will reject it."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's rehearse the fix. We `git fetch` to update our view of the remote, `git rebase o/main` to replant our work on the latest, and finally `git push`."
            ],
            "afterMarkdowns": [
              "Caught up and shared! Our commit now sits neatly on top of everyone else's work, and the remote accepted the push."
            ],
            "command": "git fetch; git rebase o/main; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "That three-step catch-up is so common that `git pull --rebase` is shorthand for the fetch-and-rebase part, handy once the steps feel natural.",
              "",
              "To finish this level, sync your work with the remote and share it:",
              "",
              "* `git fetch`",
              "* `git rebase o/main`",
              "* `git push`"
            ]
          }
        }
      ]
    }
  }
};
