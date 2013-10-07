exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C5\":{\"parents\":[\"C3\",\"C4\"],\"id\":\"C5\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git clone;git fakeTeamwork 2;git commit ;git pull",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Faking Teamwork"
  },
  "hint": {
    "en_US": "remember you can specify the number of commits to fake"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Simulating collaboration",
              "",
              "So here is the tricky thing -- for some of these upcoming lessons, we need to teach you how to pull down changes that were introduced in the remote.",
              "",
              "That means we need to essentially \"pretend\" that the remote was updated by one of your coworkers / friends / collaborators, sometimes on a specific branch or a certain number of commits.",
              "",
              "In order to do this, we introduced the aptly-named command `git fakeTeamwork`! It's pretty self explanatory, let's see a demo..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "The default behavior of `fakeTeamwork` is to simply plop down a commit on master"
            ],
            "afterMarkdowns": [
              "There we go -- the remote was updated with a new commit, and we haven't downloaded that commit yet because we haven't run `git fetch`."
            ],
            "command": "git fakeTeamwork",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "You can also specify the number of commits or the branch by appending them to the command"
            ],
            "afterMarkdowns": [
              "With one command we simulated a teammate pushing three commits to the `foo` branch on our remote"
            ],
            "command": "git fakeTeamwork foo 3",
            "beforeCommand": "git branch foo; git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "The upcoming levels are going to be pretty difficult, so we're asking more of you for this level.",
              "",
              "Go ahead and make a remote (with `git clone`), fake some changes on that remote, commit yourself, and then pull down those changes. It's like a few lessons in one!"
            ]
          }
        }
      ]
    }
  }
};
