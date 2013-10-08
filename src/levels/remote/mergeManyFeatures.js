exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C11\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C11\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]},\"side1\":{\"target\":\"C2\",\"id\":\"side1\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side2\":{\"target\":\"C4\",\"id\":\"side2\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side3\":{\"target\":\"C7\",\"id\":\"side3\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"},\"C9\":{\"parents\":[\"C2\",\"C8\"],\"id\":\"C9\"},\"C10\":{\"parents\":[\"C4\",\"C9\"],\"id\":\"C10\"},\"C11\":{\"parents\":[\"C10\",\"C7\"],\"id\":\"C11\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C11\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C9\":{\"parents\":[\"C2\",\"C8\"],\"id\":\"C9\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"},\"C10\":{\"parents\":[\"C4\",\"C9\"],\"id\":\"C10\"},\"C11\":{\"parents\":[\"C10\",\"C7\"],\"id\":\"C11\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git checkout master;git pull;git merge side1;git merge side2;git merge side3;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]},\"side1\":{\"target\":\"C2\",\"id\":\"side1\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side2\":{\"target\":\"C4\",\"id\":\"side2\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side3\":{\"target\":\"C7\",\"id\":\"side3\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"side3\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C8\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Merging with remotes"
  },
  "hint": {
    "en_US": "Pay attention to the goal tree!"
  },
  "compareOnlyMaster": true,
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Why not merge?",
              "",
              "In order to push new updates to the remote, all you need to do is *incorporate* the latest changes from the remote. That means you can either rebase *or* merge in the remote branch (e.g. `o/master`).",
              "",
              "So if you can do either method, why have the lessons focused on rebasing so far? Why is there no love for `merge` when working with remotes?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Theres a lot of debate about the tradeoffs between merging and rebasing in the development community. Here are the general pros / cons of rebasing:",
              "",
              "Pros:",
              "",
              "* Rebasing makes your commit tree look very clean since everything is in a straight line",
              "",
              "Cons:",
              "",
              "* Rebasing modifies the (apparent) history of the commit tree.",
              "",
              "For example, commit `C1` can be rebased *past* `C3`. It then appears that the work for `C1'` came after `C3` when in reality it was completed beforehand.",
              "",
              "Some developers love to preserve history and thus prefer merging. Others (like myself) prefer having a clean commit tree and prefer rebasing. It all comes down to preferences :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "For this level, let's try to solve the previous level but with *merging* instead. It may get a bit hairy but it illustrates the point well"
            ]
          }
        }
      ]
    }
  }
};
