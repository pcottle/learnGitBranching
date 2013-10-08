exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22foo%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22foo%22%2C%22remoteTrackingBranchID%22%3A%22o/foo%22%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22o/master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22master%22%5D%7D%2C%22o/foo%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22o/foo%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22foo%22%5D%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22foo%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22foo%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22foo%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D",
  "solutionCommand": "git pull origin foo --rebase;git push origin foo",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"foo\"]},\"side\":{\"target\":\"C3\",\"id\":\"side\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"side\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"foo\":{\"target\":\"C2\",\"id\":\"foo\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Specifying Remote/Branch"
  },
  "hint": {
    "en_US": "Review the intro dialogs if you get stuck!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Specifying `<remote>/<branch>`",
              "",
              "One thing that might have seemed \"magical\" is that git knew to rebase our `master` branch onto `o/master`. How did it what branch we wanted? What if we wanted to rebase onto another branch or upload our work to a different branch name?",
              "",
              "Git knows to rebase onto `o/master` because the `master` branch is set up to *track* `o/master`. So yes, this is another branch property you have to understand -- when you clone a repository, git sets up a the remote branches (like `o/master`) and branches that *track* those remote branches (for instance, `master`).",
              "",
              "This way when you push and pull, you can simply leave off any arguments and git knows where to put your work."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "However, you can actually specify the remote and the branch name on the remote if you wish to. The command takes the format:",
              "",
              "* `git push <remote> <branch>`",
              "* `git pull <remote> <branch>`",
              "",
              "Let's see a demonstration"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "I can `pull` down changes onto a totally separate branch..."
            ],
            "afterMarkdowns": [
              "See! The `side` branch was updated with work from `o/master` while the `master` branch was not updated at all."
            ],
            "command": "git checkout side; git pull origin master",
            "beforeCommand": "git clone; git fakeTeamwork; git branch side"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "I can also push to a different branch as well..."
            ],
            "afterMarkdowns": [
              "Here we pushed commits *from* the `side` branch onto the `master` branch on the remote. We did this by specifying the destination of our push.",
              "",
              "Notice how `o/master` is updated but *not* the `master` branch!"
            ],
            "command": "git push origin master",
            "beforeCommand": "git clone; git checkout -b side; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, this level is a bit tricky. Let's pull down work from the `foo` branch on remote, rebase our work on top of that, and publish that work back.",
              "",
              "Let's do all of this while *not* on the `foo` branch though, just because we can!"
            ]
          }
        }
      ]
    }
  }
};
