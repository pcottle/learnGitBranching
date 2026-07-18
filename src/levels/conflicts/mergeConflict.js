exports.level = {
  "compareAllBranchesHashAgnostic": true,
  "goalTreeString": '{"branches":{"main":{"target":"C4","id":"main"},"feature":{"target":"C3","id":"feature"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}',
  "solutionCommand": "git merge feature;git add app.js;git merge --continue",
  "startTree": '{"branches":{"main":{"target":"C2","id":"main"},"feature":{"target":"C3","id":"feature"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"},"conflictMerges":{"feature":["app.js"]}}',
  "name": {
    "en_US": "When Merges Collide"
  },
  "hint": {
    "en_US": "`git merge feature` conflicts, then `git add app.js` to mark it resolved and `git merge --continue` to finish (or `git merge --abort` to bail out)."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## When Merges Collide",
              "",
              "Most merges just work. But when two branches change **the same lines** of the same file, git can't decide who's right, so it stops and asks *you*. That's a merge conflict. It's not an error; it's git being careful."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "First, a refresher. When branches touch *different* things, `git merge` ties them together with zero drama:"
            ],
            "afterMarkdowns": [
              "One merge commit, two parents, everyone's happy. Now let's see what happens when both sides edit the same file..."
            ],
            "command": "git merge feature",
            "beforeCommand": "git switch -c feature; git commit; git switch main; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "When lines collide, git pauses the merge and writes **both** versions into the file, wrapped in markers:",
              "",
              "```",
              "<<<<<<< HEAD",
              "color = blue;",
              "=======",
              "color = green;",
              ">>>>>>> feature",
              "```",
              "",
              "Everything above `=======` is your side (`HEAD`); everything below is theirs (`feature`). To resolve, you edit the file down to the version you want, delete the markers, and save.",
              "",
              "*(Our simulator can't show real file contents, so it just tracks that `app.js` is conflicted, but the workflow is exactly the real thing.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Once the file looks right, you tell git you're done:",
              "",
              "```",
              "git add app.js         # mark the conflict resolved",
              "git merge --continue   # finish the merge commit",
              "```",
              "",
              "Changed your mind halfway through? `git merge --abort` rewinds to just before the merge, no harm done. And `git status` will always remind you which files still need attention."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Your turn! Merging `feature` into `main` will collide on `app.js`. Resolve it and complete the merge:",
              "",
              "* `git merge feature`: this one conflicts",
              "* `git add app.js`: mark it resolved",
              "* `git merge --continue`: seal the merge commit"
            ]
          }
        }
      ]
    }
  }
};
