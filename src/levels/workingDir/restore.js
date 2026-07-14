exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C2","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}',
  "solutionCommand": "git restore --staged secret.env;git restore experiment.js;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"staged","secret.env":"staged","experiment.js":"modified"}}',
  "name": {
    "en_US": "Undoing with git restore"
  },
  "hint": {
    "en_US": "Unstage with `git restore --staged secret.env`, throw away the experiment with `git restore experiment.js`, then `git commit`."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Undoing with `git restore`",
              "",
              "Everybody makes a little mess sometimes. You stage a file you didn't mean to, or start an experiment you'd rather throw away. `git restore` is the modern, purpose-built undo button for your working directory and staging area.",
              "",
              "It comes in two flavors:",
              "",
              "* `git restore --staged <file>`: **unstage** a file (move it back out of the staging area, keeping your edits)",
              "* `git restore <file>`: **discard** your edits to a file entirely (careful, this throws the changes away!)",
              "",
              "*(These replace the older `git reset HEAD <file>` and `git checkout -- <file>` tricks. Same idea, much clearer names.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Here's the mess on your desk right now:",
              "",
              "```",
              "Changes to be committed:",
              "  modified:   app.js",
              "  modified:   secret.env",
              "",
              "Changes not staged for commit:",
              "  modified:   experiment.js",
              "```",
              "",
              "You want to commit `app.js`, but `secret.env` got staged by accident, and that half-baked `experiment.js` should just disappear."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Tidy up, then commit:",
              "",
              "* Unstage the secret: `git restore --staged secret.env`",
              "* Discard the experiment: `git restore experiment.js`",
              "* Commit what's left: `git commit`",
              "",
              "That lands one clean commit, with only the work you meant to keep."
            ]
          }
        }
      ]
    }
  }
};
