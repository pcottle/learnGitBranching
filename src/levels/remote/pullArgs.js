exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C6\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/bar\":{\"target\":\"C1\",\"id\":\"o/bar\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C2\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C5\":{\"parents\":[\"C3\",\"C4\"],\"id\":\"C5\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C6\":{\"parents\":[\"C2\",\"C5\"],\"id\":\"C6\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C3\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"bar\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git pull origin bar:foo;git pull origin master:side",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C4\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/bar\":{\"target\":\"C1\",\"id\":\"o/bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C3\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"bar\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Pull arguments"
  },
  "hint": {
    "en_US": "Remember that you can create new local branches with fetch/pull arguments"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git pull arguments",
              "",
              "Now that you know pretty much *everything* there is to know about arguments for `git fetch` and `git push`, there's almost really nothing left to cover for git pull :)",
              "",
              "That's because git pull at the end of the day is *really* just shorthand for a fetch followed by merging in whatever was just fetched. You can think of it as running git fetch with SAME arguments specified and then merging in *where* those commits ended up.",
              "",
              "This applies even when you use crazy-complicated arguments as well. Let's see some examples:"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Here are some equivalent commands in git:",
              "",
              "`git pull  origin foo` is equal to:",
              "",
              "`git fetch origin foo; git merge o/foo`",
              "",
              "And...",
              "",
              "`git pull  origin bar~1:bugFix` is equal to:",
              "",
              "`git fetch origin bar~1:bugFix; git merge bugFix`",
              "",
              "See? git pull is really just shorthand for fetch + merge, and all git pull cares about is where the commits ended up (the `destination` argument that it figures out during fetch)",
              "",
              "Lets see a demo:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "If we specify the place to fetch, everything happens as before with fetch but we merge in whatever was just fetched"
            ],
            "afterMarkdowns": [
              "See! by specifying `master` we downloaded commits onto `o/master` just as normal. Then we merged `o/master` to where we are, *regardless* of what was currently checked out."
            ],
            "command": "git pull origin master",
            "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Does it work with source and destination too? You bet! Let's see that:"
            ],
            "afterMarkdowns": [
              "Wow, that's a TON in one command. We created a new branch locally named `foo`, downloaded commits from remote's master onto that branch `foo`, and then merged that branch into our currently checked out branch `bar`. It's over 9000!!!"
            ],
            "command": "git pull origin master:foo",
            "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok to finish up, attain the state of the goal visualization. You'll need to download some commits, make some new branches, and merge those branches into other branches, but it shouldn't take many commands :P"
            ]
          }
        }
      ]
    }
  }
};
