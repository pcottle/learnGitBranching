exports.level = {
  "name": 'Introduction to Git Commits',
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git commit;git commit",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "hint": "Just type in 'git commit' twice to finish!",
  "startDialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Commits",
            "",
            "A commit in git is a recorded set of changes that you have made -- for instance, it's the 10 lines you added for a new feature or a new image added to the assets folder.",
            "",
            "Because git commits are simply *delta*'s (or changes between states) rather than entire copies of the repository, they make Git's version control quite lightweight and efficient. The days of copying your entire codebase onto an external hard drive are over!",
            "",
            "The only tricky thing is that if you want to download an entire codebase, you have to download every single commit (essentially the history of the repository) and apply them all on top of each other to get the current version. This is why you might see the command line output:",
            "",
            "```",
            "Resolving Deltas...",
            "```",
            "",
            "When you clone a git repo. Git essentially replays the entire development history on your computer in a few seconds, leaving you (at the end) with the current version of the repository!"
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
