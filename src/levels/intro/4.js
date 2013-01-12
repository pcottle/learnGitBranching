exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22bugFix%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout -b bugFix;git commit;git checkout master;git commit;git checkout bugFix;git rebase master",
  "name": "Rebase Introduction",
  "hint": "Make sure you commit from bugFix first",
  "startDialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Rebase",
            "",
            "The second way of combining work between branches is *rebasing.* Rebasing essentially takes a set of commits, \"copies\" them, and plops them down somewhere else.",
            "",
            "While this sounds confusing, the advantage of rebasing is that it can be used to make a nice linear sequence of commits. The commit log / history of the repository will be a lot cleaner if only rebasing is allowed.",
            "",
            "Let's see it in action..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Here we have two branches yet again; note that the bugFix branch is currently selected (note the asterisk)",
            "",
            "We would like to move our work from bugFix directly onto the work from master. That way it woud look like these two features were developed sequentially, when in reality they were developed in parallel.",
            "",
            "Let's do that with the `git rebase` command"
          ],
          "afterMarkdowns": [
            "Awesome! Now the work from our bugFix branch is right on top of master and we have a nice linear sequence of commits.",
            "",
            "Note that the commit C3 still exists somewhere (it has a faded appearance in the tree), and C3' is the \"copy\" that we rebased onto master.",
            "",
            "The only problem is that master hasn't been updated either, let's do that now..."
          ],
          "command": "git rebase master",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Now we are checked out on the `master` branch. Let's do ahead and rebase onto `bugFix`..."
          ],
          "afterMarkdowns": [
            "There! Since `master` was downstream of `bugFix`, git simply moved the `master` branch reference forward in history."
          ],
          "command": "git rebase bugFix",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "To complete this level, do the following",
            "",
            "* Checkout a new branch named `bugFix`",
            "* Commit once",
            "* Go back to master and commit again",
            "* Check out bugFix again and rebase onto master",
            "",
            "Good luck!"
          ]
        }
      }
    ]
  }
};
