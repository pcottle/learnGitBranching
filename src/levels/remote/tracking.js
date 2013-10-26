exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22o/master%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D",
  "solutionCommand": "git checkout -b side o/master;git commit;git pull --rebase;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Remote Tracking"
  },
  "hint": {
    "en_US": "Remember there are two ways to set remote tracking!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Remote-Tracking branches",
              "",
              "One thing that might have seemed \"magical\" about the last few lessons is that git knew the `master` branch was related to `o/master`. Sure these branches have similar names and it might make logical sense to connect the `master` branch on the remote to the local `master` branch, but this connection is demonstrated clearly in two scenarios:",
              "",
              "* During a pull operation, commits are downloaded onto `o/master` and then *merged* into the `master` branch. The implied target of the merge is determined from this connection.",
              "* During a push operation, work from the `master` branch was pushed onto the remote's `master` branch (which was then represented by `o/master` locally). The *destination* of the push is determined from the connection between `master` and `o/master`.",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote tracking",
              "",
              "Long story short, this connection between `master` and `o/master` is explained simply by the \"remote tracking\" property of branches. The `master` branch is set to track `o/master` -- this means there is an implied merge target and implied push destination for the `master` branch.",
              "",
              "You may be wondering how this property got set on the `master` branch when you didn't run any commands to specify it. Well, when you clone a repository with git, this property is actually set for you automatically. ",
              "",
              "During a clone, git creates a remote branch for every branch on the remote (aka branches like `o/master`) and then, for each remote branch, creates a local branch to *track* that remote branch (aka `master`). Thats why you may have seen the following command output:",
              "",
              "    local branch \"master\" set to track remote branch \"o/master\"",
              "",
              "When running `git clone`."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Can I specify this myself?",
              "",
              "Yes you can! You can make any arbitrary branch track `o/master`, and if you do so, that branch will have the same implied push destination and merge target as `master`. This means you can run `git push` on a branch named `totallyNotMaster` and have your work pushed to the `master` branch on the remote!",
              "",
              "There are two ways to set this property. The first is to checkout a new branch by using a remote branch as the specified ref. Running",
              "",
              "`git checkout -b totallyNotMaster o/master`",
              "",
              "Creates a new branch named `totallyNotMaster` and sets it to track `o/master`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Enough talking, let's see a demonstration! We will checkout a new branch named `foo` and set it to track `master` on the remote."
            ],
            "afterMarkdowns": [
              "As you can see, we used the implied merge target of `o/master` to update the `foo` branch. Note how master doesn't get updated!!"
            ],
            "command": "git checkout -b foo o/master; git pull",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "This also applies for git push"
            ],
            "afterMarkdowns": [
              "Boom. We pushed our work to the `master` on the remote even though our branch was named something totally different"
            ],
            "command": "git checkout -b foo o/master; git commit; git push",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Way #2",
              "",
              "Another way to set remote tracking on a branch is to simply use the `git branch -u` option. Running",
              "",
              "`git branch -u o/master foo`",
              "",
              "will set the `foo` branch to track `o/master`. If `foo` is currently checked out you can even leave it off:",
              "",
              "`git branch -u o/master`",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see this other way of specifying remote tracking real quick..."
            ],
            "afterMarkdowns": [
              "Same as before, just a more explicit command. Sweet!"
            ],
            "command": "git branch -u o/master foo; git commit; git push",
            "beforeCommand": "git clone; git checkout -b foo"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok! For this level let's push work onto the `master` branch on remote while *not* checked out on `master` locally. I'll let you figure out the rest since this is the advanced course :P"
            ]
          }
        }
      ]
    }
  }
};
