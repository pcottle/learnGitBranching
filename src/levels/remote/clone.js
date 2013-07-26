exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"remoteTrackingBranch\":null,\"remote\":false,\"target\":\"C1\",\"id\":\"master\",\"type\":\"branch\"}},\"commits\":{\"C0\":{\"type\":\"commit\",\"parents\":[],\"author\":\"Peter Cottle\",\"createTime\":\"Fri Jul 26 2013 15:56:22 GMT-0700 (PDT)\",\"commitMessage\":\"Quick commit. Go Bears!\",\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"type\":\"commit\",\"parents\":[\"C0\"],\"author\":\"Peter Cottle\",\"createTime\":\"Fri Jul 26 2013 15:56:22 GMT-0700 (PDT)\",\"commitMessage\":\"Quick commit. Go Bears!\",\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\",\"type\":\"general ref\"}}}",
  "solutionCommand": "git clone",
  "name": {
    "en_US": "Clone Intro"
  },
  "hint": {
    "en_US": "Just git clone!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Remotes",
              "",
              "Remote repositories are copies of your project that are hosted elsewhere (typically on the internet). They do a bunch of great things for you:",
              "",
              "- First and foremost, they serve as a great backup! Git repositories obviously have the ability to restore files, but they rely on the filesystem working being in a valid state. Even if your entire laptop blows, your remote repositories will still work great.",
              "",
              "- They also make coding social! Now that a copy of your project is hosted elsewhere, your friends can contribute to your project (or pull in your latest changes) very easily.",
              "",
              "It's become very popular to use websites that visualize activity around remote repos (like [Github](https://github.com/) or [Phabricator](http://phabricator.org/)), but remote repositories _always_ serve as the underlying backbone for these tools. So it's important to understand them!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lets start slow and just look at what a remote repository looks like (in our visualization).",
              "",
              "`git clone` (in the real world) is the command you'll use to create _local_ copies of remote repositories (from github say), but we use it here to simply launch the visualization into a state where there's a remote and local copy.",
              "",
              "",
              "",
              ""
            ],
            "afterMarkdowns": [
              "There it is! Now we have a remote repository of our project. It looks pretty similar except for some visual changes to make the distinction apparent"
            ],
            "command": "git clone",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, simply `git clone` your existing repository. The real learning will come in following lessons"
            ]
          }
        }
      ]
    }
  }
};

