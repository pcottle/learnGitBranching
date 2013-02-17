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
            "A commit in a git repository records a snapshot of the files in your directory. Every file included in the commit is copied from the directory to the repository's *object store*, and an *index* of each file's location is stored with the commit.",
            "",
            "To recreate our directory as recorded in a commit, git reads the objects referenced in the commit's index from the object store and writes them into place in the directory. This makes switching between different development *branches* extremely fast and easy, as no calculations need to be performed.",
            "",
            "Git keeps each commit as lightweight as possible by reusing any objects that have already been stored. Each version of a file is only stored once, even if you move it around within the repository.",
            "",
            "Git will occasionally compress the object store, to save disk space or increase network transfer speeds. This *packing* process creates *deltas* that only store the changes made in each version of a file, instead of complete snapshots.",
            "",
            "When cloning a repository, you often have to unpack or \"resolve\" all these deltas. That's why you might see the command line output:",
            "",
            "`resolving deltas`",
            "",
            "when cloning a repo.",
            "",
            "There is a lot to take in, but for now just remember that commits record a snapshot of the directory, and that switching between snapshots is fast and easy because of this."
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
