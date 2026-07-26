exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C5","id":"main","remoteTrackingBranchID":null},"feature":{"target":"C4","id":"feature","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C3"],"id":"C4"},"C5":{"parents":["C2"],"id":"C5"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}',
  "solutionCommand": "git merge --squash feature",
  "startTree": '{"branches":{"main":{"target":"C2","id":"main"},"feature":{"target":"C4","id":"feature"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C3"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"}}',
  "name": {
    "en_US": "Pull Requests: Three Ways to Merge"
  },
  "hint": {
    "en_US": "Collapse all of `feature` into one clean commit on `main` with `git merge --squash feature`."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Pull Requests: Three Ways to Merge",
              "",
              "On a real team you rarely `git push` straight to `main`. Instead you open a **Pull Request** (a friendly \"please review and merge my branch\"), and once it's approved, the hosting site (GitHub, GitLab, and friends) merges it for you.",
              "",
              "But *how* it merges is your choice, and each way shapes history a little differently. Let's meet the three buttons you'll see on almost every PR."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "**Option 1: Create a merge commit.** This is plain `git merge --no-ff`, and it ties your branch into `main` with a dedicated merge commit and keeps every commit exactly as it happened."
            ],
            "afterMarkdowns": [
              "Two parents on that new commit, and your whole branch history is preserved. Honest and complete, if a little noisy over time."
            ],
            "command": "git merge --no-ff feature",
            "beforeCommand": "git switch -c feature; git commit; git commit; git switch main; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "**Option 2: Squash and merge.** This flattens *all* of your branch's commits into a single tidy commit on `main` with `git merge --squash`."
            ],
            "afterMarkdowns": [
              "One clean commit lands on `main`, and the scrappy work-in-progress commits stay behind. Popular for keeping `main` easy to read.",
              "",
              "*Heads up: real git leaves the squashed changes **staged** so you can write the message and run `git commit` yourself. Our simulator does that final commit for you in one step.*"
            ],
            "command": "git merge --squash feature",
            "beforeCommand": "git switch -c feature; git commit; git commit; git switch main; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "**Option 3: Rebase and merge.** Replay your commits on top of the latest `main`, then fast-forward, for a perfectly linear history with no merge commit."
            ],
            "afterMarkdowns": [
              "A straight line, every commit kept, zero merge commits. The tidiest history of all, at the cost of rewriting your branch's commit hashes."
            ],
            "command": "git rebase main feature; git switch main; git merge feature",
            "beforeCommand": "git switch -c feature; git commit; git commit; git switch main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Three buttons, three shapes of history. There's no single right answer, just team preference. :D",
              "",
              "For this level, let's practice the **squash** merge. Your `feature` branch has a couple of scrappy commits; collapse them onto `main` as one clean commit.",
              "",
              "To finish, run `git merge --squash feature`."
            ]
          }
        }
      ]
    }
  }
};
