exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C1\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugFix;git checkout bugFix",
  "hint": "Make a new branch with \"git branch [name]\" and check it out with \"git checkout [name]\"",
  "name": "Branching in Git",
  "startDialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Branches",
            "",
            "Branches in Git are incredibly lightweight as well. They are simply references to a specific commit -- nothing more. This is why many Git enthusiasts chant the mantra:",
            "",
            "```",
            "branch early, and branch often",
            "```",
            "",
            "Because there is no storage / memory overhead with making many branches, it's easier to logically divide up your work than have big beefy branches.",
            "",
            "When we start mixing branches and commits, we will see how these two features combine. For now though, just remember that a branch essentially says \"I want to include the work of this commit and all parent commits.\""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Let's see what branches look like in practice.",
            "",
            "Here we will check out a new branch named `newImage`"
          ],
          "afterMarkdowns": [
            "There, that's all there is to branching! The branch `newImage` now refers to commit `C1`"
          ],
          "command": "git branch newImage",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Let's try to put some work on this new branch. Hit the button below"
          ],
          "afterMarkdowns": [
            "Oh no! The `master` branch moved but the `newImage` branch didn't! That's because we weren't \"on\" the new branch, which is why the asterisk (*) was on `master`"
          ],
          "command": "git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Let's tell git we want to checkout the branch with",
            "",
            "```",
            "git checkout [name]",
            "```",
            "",
            "This will put us on the new branch before committing our changes"
          ],
          "afterMarkdowns": [
            "There we go! Our changes were recorded on the new branch"
          ],
          "command": "git checkout newImage; git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok! You are all ready to get branching. Once this window closes,",
            "make a new branch named `bugFix` and switch to that branch"
          ]
        }
      }
    ]
  }
};