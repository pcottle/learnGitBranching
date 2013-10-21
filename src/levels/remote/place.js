exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git pull origin master --rebase",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C0\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"foo\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "The place argument"
  },
  "disableMap": {
    "git checkout": true
  },
  "hint": {
    "en_US": "Look at the goal vis and decide between a rebase pull or a merge pull!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Push & Pull arguments",
              "",
              "So far we haven't shown this but the git fetch, push, and pull commands actually take arguments! We needed to cover a lot of other material before diving into these arguments (since they are somewhat complicated) but hopefully it'll be clear going forwards.",
              "",
              "The most common expanded format of these commands is:",
              "",
              "`git push <remote> <place>`",
              "",
              "Where `<remote>` is the remote specified (`origin` in our case) and `<place>` is where you want the commits to come from (or where they should go).",
              "",
              "For example, the command:",
              "",
              "`git push origin master`",
              "",
              "really says:",
              "",
              "*Go to the branch named \"master\", grab all the commits, and then go put those on the branch named \"master\" on the remote named \"origin\"*",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "By specifying both `<remote>` and `<place>`, we have actually told git *all* that it needs to know in order to execute the entire command. This means that it completely ignores what branch  you are currently checked out on.",
              "",
              "Git also doesn't need any of the implied information through remote-tracking since it knows `<place>` will be where commits come from, where they go, and what gets merged where."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Details on <place>",
              "",
              "I should clarify what I mean by `<place>` since you won't see that type of terminology in any of the git man-pages (which, by the way, are quite overwhelming). I'm using `<place>` to refer to a location that exists both on the remote *and* in the local repository.",
              "",
              "`<place>` is where commits come from and where they go for *either* pushing or pulling. So when you say:",
              "",
              "`git push origin master`",
              "",
              "You are really specifying `master` as the source locally and `master` as the destination on the remote for the push. Similarly,",
              "",
              "`git pull origin foo`",
              "",
              "means fetching the commits from `foo` on the remote and merging them into the local branch `foo`.",
              "",
              "There's one more level of complexity we will cover (which you might be able to guess from this slide(, but let's first get comfortable with these arguments.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Just as a quick demo -- checking out a different branch but specifying the full arguments"
            ],
            "afterMarkdowns": [
              "Notice how `master` got updated and `foo` didn't change at all!"
            ],
            "command": "git checkout -b foo; git pull origin master",
            "beforeCommand": "git clone; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To solve this level, pull the new teamwork commits down, rebase on those, and then push!",
              "",
              "We've disabled checking out branches for this level so you'll have to fully specify everything :D"
            ]
          }
        }
      ]
    }
  }
};
