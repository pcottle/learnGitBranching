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
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Like the `~` modifier, the `^` modifier also accepts an optional number after it. Rather than specifying a number of generations to go back, it specifies which parent reference to follow from a merge commit. The first parent is the one that was referenced by HEAD when the merge was done, and on this site will always be directly above the child.",
              "",
              "",
              ""
            ],
            "afterMarkdowns": [
              "",
              "",
              ""
            ],
            "command": "git checkout master^; git checkout master^2",
            "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "The `^` and `~` modifiers may be combined. When this is done, they are processed from the left to the right.",
              "",
              ""
            ],
            "afterMarkdowns": [
              "The first `~` goes back one generation to C6, adding `^2` follows the reference to C5, and the final `~2` then goes back two additional generations to reach the ultimate destination.",
              ""
            ],
            "command": "git checkout HEAD~^2~2",
            "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
          }
        }
      ]
    }
  }
};
