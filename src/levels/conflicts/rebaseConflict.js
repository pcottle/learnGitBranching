exports.level = {
  "compareAllBranchesHashAgnostic": true,
  "goalTreeString": '{"branches":{"main":{"target":"C2","id":"main"},"feature":{"target":"C3\'","id":"feature"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C3\'":{"parents":["C2"],"id":"C3\'"}},"tags":{},"HEAD":{"target":"feature","id":"HEAD"}}',
  "solutionCommand": "git rebase main;git add app.js;git rebase --continue",
  "startTree": '{"branches":{"main":{"target":"C2","id":"main"},"feature":{"target":"C3","id":"feature"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"feature","id":"HEAD"},"conflictMerges":{"main":["app.js"]}}',
  "name": {
    "en_US": "Conflicts While Rebasing"
  },
  "hint": {
    "en_US": "`git rebase main` conflicts, then `git add app.js` and `git rebase --continue` (the same verbs as a merge; `git rebase --abort` bails out)."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Conflicts While Rebasing",
              "",
              "You just tamed a *merge* conflict. Good news: conflicts during a **rebase** work almost exactly the same way, and you already know all the moves.",
              "",
              "*(This is a bonus round. If rebasing still feels shaky, feel free to skip it and circle back later.)*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "As a warm-up, here's a normal, conflict-free rebase that replays `feature` on top of the latest `main`:"
            ],
            "afterMarkdowns": [
              "Clean and linear. But when a replayed commit touches the same lines `main` changed, git has to stop and ask you to sort it out..."
            ],
            "command": "git rebase main",
            "beforeCommand": "git switch -c feature; git commit; git switch main; git commit; git switch feature"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git rebase` replays your commits one at a time onto the new base. If a replay collides with someone else's change, git pauses, exactly like a merge conflict.",
              "",
              "The resolution rhythm is identical; only the command name changes:",
              "",
              "```",
              "git add app.js          # mark the conflict resolved",
              "git rebase --continue   # replay the rest",
              "```",
              "",
              "If it all goes sideways, `git rebase --abort` puts everything back exactly as it was. Those `--continue` / `--abort` verbs are the *universal* way out of any conflict in git."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Your `feature` branch is built on an old `main`, and `main` has since changed `app.js`. Rebase onto the latest `main`, settle the clash, and finish:",
              "",
              "* `git rebase main`: this conflicts",
              "* `git add app.js`: mark it resolved",
              "* `git rebase --continue`: replay your work on top"
            ]
          }
        }
      ]
    }
  }
};
