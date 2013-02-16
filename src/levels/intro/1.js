exports.level = {
  "name": 'Introduction to Git Commits',
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git commit;git commit",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "hint": "Just type in 'git commit' twice to finish!",
  "disabledMap" : {
    "git revert": true
  },
  "startDialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Commits",
            "A commit in git specifies the state of the repository. This state encodes what each file looks like, so you can think of it as a snapshot of everything you're working on.",
            "",
            "Git wants to keep commits as lightweight as possible though, so it doesn't just copy the entire directory every time you commit. It actually stores each commit as a set of changes, or a \"delta\", from one version of the repository to the next.",
            "",
            "In order to clone a repository, you have to unpack or \"resolve\" all these deltas. That's why you might see the command line output:",
            "",
            "`resolving deltas`",
            "",
            "when cloning a repo.",
            "",
            "It's a tricky concept, but for now you can think of commits as snapshots of the directory that are stored as deltas. Combining all the deltas together inside an empty folder gives you the full repository!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Let's see what this looks like in practice. On the right we have a visualization of a (small) git repository. There are two commits right now -- the first initial commit, `C0`, and one commit after that `C1` that might have some meaningful changes.",
            "",
            "Hit the button below to make a new commit"
          ],
          "afterMarkdowns": [
            "There we go! Awesome. We just made changes to the repository and saved them as a commit. The commit we just made has a parent, `C1`, which references which commit it was based off of."
          ],
          "command": "git commit",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Go ahead and try it out on your own! After this window closes, make two commits to complete the level"
          ]
        }
      }
    ]
  }
};
