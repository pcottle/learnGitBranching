exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C4\",\"id\":\"side\",\"remoteTrackingBranchID\":null},\"bugFix\":{\"target\":\"C7\",\"id\":\"bugFix\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"tags\":{\"v0\":{\"target\":\"C0\",\"id\":\"v0\",\"type\":\"tag\"},\"v1\":{\"target\":\"C3\",\"id\":\"v1\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git commit ",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C4\",\"id\":\"side\",\"remoteTrackingBranchID\":null},\"bugFix\":{\"target\":\"C6\",\"id\":\"bugFix\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C3\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"}},\"tags\":{\"v0\":{\"target\":\"C0\",\"id\":\"v0\",\"type\":\"tag\"},\"v1\":{\"target\":\"C3\",\"id\":\"v1\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Git Describe"
  },
  "hint": {
    "en_US": "Just commit once on bugFix when you're ready to move on"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Git Describe",
              "",
              "Because tags serve as such great \"anchors\" in the codebase, git has a command to *describe* where you are relative to the closest \"anchor\" (aka tag). And that command is called `git describe`!",
              "",
              "Git describe can help you get your bearings after you've moved many commits backwards or forwards in history; this can happen after you've completed a git bisect (a debugging search) or when sitting down at a coworkers computer who just got back from vacation."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Git describe takes the form of:",
              "",
              "`git describe <ref>`",
              "",
              "Where `<ref>` is anything git can resolve into a commit. If you don't specify a ref, git just uses where you're checked out right now (`HEAD`).",
              "",
              "The output of the command looks like:",
              "",
              "`<tag>_<numCommits>_g<hash>`",
              "",
              "Where `tag` is the closest ancestor tag in history, `numCommits` is how many commits away that tag is, and `<hash>` is the hash of the commit being described."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's look at a quick example. For this tree below:"
            ],
            "afterMarkdowns": [
              "The command `git describe master` would output:",
              "",
              "`v1_2_gC2`",
              "",
              "Whereas `git describe side` would output:",
              "",
              "`v2_1_gC4`"
            ],
            "command": "git tag v2 C3",
            "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "That's pretty much all there is to git describe! Try describing a few of the locations in this level to get a feel for the command.",
              "",
              "Once you're ready, just go ahead and commit once to finish the level. We're giving you a freebie :P"
            ]
          }
        }
      ]
    }
  }
};
