exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C3","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}',
  "solutionCommand": "git add app.js;git commit;git add styles.css;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"modified","styles.css":"modified"}}',
  "name": {
    "en_US": "The Staging Area"
  },
  "hint": {
    "en_US": "Stage a file with `git add <file>`, then snapshot it with `git commit`. Do that twice, once per file."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## The Staging Area",
              "",
              "Before a change becomes a commit, it makes a pit stop. Git has three zones: your **working directory** (where you edit), the **staging area** (a loading dock for the next commit), and the **repository** (your permanent history).",
              "",
              "You pick *exactly* what rides along in each commit with `git add`. That's how commits stay tidy, and you're never forced to commit everything at once.",
              "",
              "*(Our simulator keeps this simple: it tracks which files changed, not their contents.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Run `git status` any time to see where things stand. Right now it shows two files you've edited but haven't staged:",
              "",
              "```",
              "Changes not staged for commit:",
              "  modified:   app.js",
              "  modified:   styles.css",
              "```",
              "",
              "Stage a single file with `git add app.js`, or grab everything at once with `git add .`. Once a file is staged, `git commit` seals it into a snapshot.",
              "",
              "Got files you never want to commit, like secrets, logs, or build junk? List them in a `.gitignore` file and git will quietly leave them alone."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Your turn! Stage and commit your work **one file at a time**, so each commit stays focused:",
              "",
              "* `git add app.js`, then `git commit`",
              "* `git add styles.css`, then `git commit`",
              "",
              "Two clean commits and the level is yours."
            ]
          }
        }
      ]
    }
  }
};
