exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C7\",\"id\":\"master\"},\"bugWork\":{\"target\":\"C2\",\"id\":\"bugWork\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C4\",\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git branch bugWork master^^2^",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C7\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C4\",\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Multiple parents"
  },
  "hint": {
    "en_US": "Use `git branch bugWork` with a target commit to create the missing reference."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Specifying Parents",
              "",
              "Like the `~` modifier, the `^` modifier also accepts an optional number after it.",
              "",
              "Rather than specifying the number of generations to go back (what `~` takes), the modifier on `^` specifies which parent reference to follow from a merge commit. Remember that merge commits have multiple parents, so the path to choose is ambiguous.",
              "",
              "Git will normally follow the \"first\" parent upwards from a merge commit, but specifying a number with `^` changes this default behavior.",
              "",
              "Enough talking, let's see it in action.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here we have a merge commit. If we checkout `master^` without the modifier, we will follow the first parent after the merge commit. ",
              "",
              "(*In our visuals, the first parent is positioned directly above the merge commit.*)"
            ],
            "afterMarkdowns": [
              "Easy -- this is what we are all used to."
            ],
            "command": "git checkout master^",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Now let's try specifying the second parent instead..."
            ],
            "afterMarkdowns": [
              "See? We followed the other parent upwards."
            ],
            "command": "git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "The `^` and `~` modifiers can make moving around a commit tree very powerful:"
            ],
            "afterMarkdowns": [
              "Lightning fast!"
            ],
            "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Even crazier, these modifiers can be chained together! Check this out:"
            ],
            "afterMarkdowns": [
              "The same movement as before, but all in one command."
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Put it to practice",
              "",
              "To complete this level, create a new branch at the specified destination.",
              "",
              "Obviously it would be easy to specify the commit directly (with something like `C6`), but I challenge you to use the modifiers we talked about instead!"
            ]
          }
        }
      ]
    }
  }
};

