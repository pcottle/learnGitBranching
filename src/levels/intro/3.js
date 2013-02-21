exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C2\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git checkout -b bugFix;git commit;git checkout master;git commit;git merge bugFix",
  "name": "Merging in Git",
  "hint": "Remember to commit in the order specified (bugFix before master)",
  "disabledMap" : {
    "git revert": true
  },
  "startDialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branches and Merging",
            "",
            "Great! We now know how to commit and branch. Now we need to learn some kind of way of combining the work from two different branches together. This will allow us to branch off, develop a new feature, and then combine it back in.",
            "",
            "The first method to combine work that we will examine is `git merge`. Merging in Git creates a special commit that has two unique parents. A commit with two parents essentially means \"I want to include all the work from this parent over here and this one over here, *and* the set of all their parents.\"",
            "",
            "It's easier with visuals, let's check it out in the next view"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Here we have two branches; each has one commit that's unique. This means that neither branch includes the entire set of \"work\" in the repository that we have done. Let's fix that with merge.",
            "",
            "We will `merge` the branch `bugFix` into `master`"
          ],
          "afterMarkdowns": [
            "Woah! See that? First of all, `master` now points to a commit that has two parents. If you follow the arrows upstream from `master`, you will hit every commit along the way to the root. This means that `master` contains all the work in the repository now.",
            "",
            "Also, see how the colors of the commits changed? To help with learning, I have included some color coordination. Each branch has a unique color. Each commit turns a color that is the blended combination of all the branches that contain that commit.",
            "",
            "So here we see that the `master` branch color is blended into all the commits, but the `bugFix` color is not. Let's fix that..."
          ],
          "command": "git merge bugFix",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Let's merge `master` into `bugFix`:"
          ],
          "afterMarkdowns": [
            "Since `bugFix` was downstream of `master`, git didn't have to do any work; it simply just moved `bugFix` to the same commit `master` was attached to.",
            "",
            "Now all the commits are the same color, which means each branch contains all the work in the repository! Woohoo"
          ],
          "command": "git checkout bugFix; git merge master",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "To complete this level, do the following steps:",
            "",
            "* Make a new branch called `bugFix`",
            "* Checkout the `bugFix` branch with `git checkout bugFix`",
            "* Commit once",
            "* Go back to `master` with `git checkout`",
            "* Commit another time",
            "* Merge the branch `bugFix` into `master` with `git merge`",
            "",
            "*Remember, you can always re-display this dialog with \"help level\"!*"
          ]
        }
      }
    ]
  }
};
