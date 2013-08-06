exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22master%22%7D%2C%22overHere%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22overHere%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase -i overHere",
  "compareOnlyMasterHashAgnostic": true,
  "disabledMap": {
    "git cherry-pick": true
  },
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\"},\"overHere\":{\"target\":\"C1\",\"id\":\"overHere\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "you can use either branches or relative refs (HEAD~) to specify the rebase target"
  },
  "name": {
    "en_US": "Interactive Rebase Intro"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Interactive Rebase",
              "",
              "Git cherry-pick is great when you know which commits you want (_and_ you know their corresponding hashes) -- it's hard to beat the simplicity it provides.",
              "",
              "But what about the situation where you don't know what commits you want? Thankfully git has you covered there as well! We can use interactive rebasing for this -- it's the best way to review a series of commits you're about to rebase.",
              "",
              "Let's dive into the details..."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "All interactive rebase means is using the `rebase` command with the `-i` option.",
              "",
              "If you include this option, git will open up a UI to show you which commits are about to be copied below the target of the rebase. It also shows their commit hashes and messages, which is great for getting a bearing on what's what.",
              "",
              "For \"real\" git, the UI window means opening up a file in a text editor like `vim`. For our purposes, I've built a small dialog window that behaves the same way."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "When the interactive rebase dialog opens, you have the ability to do 3 things:",
              "",
              "* You can reorder commits simply by changing their order in the UI (in our window this means dragging and dropping with the mouse).",
              "* You can choose to completely omit some commits. This is designated by `pick` -- toggling `pick` off means you want to drop the commit.",
              "* Lastly, you can squash commits. Unfortunately our levels don't support this for a few logistical reasons, so I\"ll skip over the details of this. Long story short though -- it allows you to combine commits.",
              "",
              "Great! Lets see an example"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "When you hit the button, an interactive rebase window will appear. Reorder some commits around (or feel free to unpick some) and see the result!"
            ],
            "afterMarkdowns": [
              "Boom! Git copied down commits in the exact same way you specified through the UI"
            ],
            "command": "git rebase -i HEAD~4 --aboveAll",
            "beforeCommand": "git commit; git commit; git commit; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, do an interactive rebase and achieve the order shown in the goal visualization. Remember you can always `undo` or `reset` to fix mistakes :D"
            ]
          }
        }
      ]
    }
  }
};
