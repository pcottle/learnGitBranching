exports.level = {
  "disabledMap" : {
    "git cherry-pick": true,
    "git revert": true
  },
  "compareOnlyMaster": true,
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%27%22%2C%22id%22%3A%22master%22%7D%2C%22newImage%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22newImage%22%7D%2C%22caption%22%3A%7B%22target%22%3A%22C3%27%27%22%2C%22id%22%3A%22caption%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C2%27%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase -i HEAD~2;git commit --amend;git rebase -i HEAD~2;git rebase caption master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"newImage\":{\"target\":\"C2\",\"id\":\"newImage\"},\"caption\":{\"target\":\"C3\",\"id\":\"caption\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"caption\",\"id\":\"HEAD\"}}",
  "name": "Juggling Commits",
  "hint": "The first command is git rebase -i HEAD~2",
  "startDialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Juggling Commits",
            "",
            "Here's another situation that happens quite commonly. You have some changes (`newImage`) and another set of changes (`caption`) that are related, so they are stacked on top of each other in your repository (aka one after another).",
            "",
            "The tricky thing is that sometimes you need to make a small modification to an earlier commit. In this case, design wants us to change the dimensions of `newImage` slightly, even though that commit is way back in our history!!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "We will overcome this difficulty by doing the following:",
            "",
            "* We will re-order the commits so the one we want to change is on top with `git rebase -i`",
            "* We will `commit --amend` to make the slight modification",
            "* Then we will re-order the commits back to how they were previously with `git rebase -i`",
            "* Finally, we will move master to this updated part of the tree to finish the level (via your method of choosing)",
            "",
            "There are many ways to accomplish this overall goal (I see you eye-ing cherry-pick), and we will see more of them later, but for now let's focus on this technique."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Lastly, pay attention to the goal state here -- since we move the commits twice, they both get an apostrophe appended. One more apostrophe is added for the commit we amend, which gives us the final form of the tree "
          ]
        }
      }
    ]
  }
};

