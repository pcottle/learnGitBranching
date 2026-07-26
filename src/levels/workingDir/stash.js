exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C1","id":"main"},"feature":{"target":"C2","id":"feature"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"feature","id":"HEAD"}}',
  "solutionCommand": "git stash;git switch -c feature;git stash pop;git add .;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"feature.js":"modified"}}',
  "name": {
    "en_US": "Stashing Work in Progress"
  },
  "hint": {
    "en_US": "Shelve with `git stash`, branch off with `git switch -c feature`, bring it back with `git stash pop`, then `git add .` and `git commit`."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Stashing Work in Progress",
              "",
              "Picture it: you're halfway through editing `feature.js`... and realize you're on `main`, where this work does *not* belong. You can't commit half-finished code, but you don't want to lose it either.",
              "",
              "Enter `git stash`. It shelves your uncommitted changes and hands you back a clean working directory, like nothing ever happened. Your work waits safely on a \"stash stack\" until you're ready for it again."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Here's the rescue routine:",
              "",
              "```",
              "git stash              # shelve the work, clean the working dir",
              "git switch -c feature  # make the branch it belongs on",
              "git stash pop          # bring the work back, right here",
              "```",
              "",
              "`git stash pop` re-applies your shelved changes onto the current branch and removes them from the stack. (Curious what's shelved? `git stash list` shows you.)"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Do it for real. Your edit to `feature.js` is stranded on `main` by mistake, so move it to a new `feature` branch and commit it there:",
              "",
              "* `git stash`",
              "* `git switch -c feature`",
              "* `git stash pop`",
              "* `git add .`, then `git commit`",
              "",
              "When the dust settles, `main` should be untouched and your commit should live on `feature`."
            ]
          }
        }
      ]
    }
  }
};
