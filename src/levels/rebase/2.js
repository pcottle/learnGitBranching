exports.level = {
  "compareOnlyBranches": true,
  "disabledMap" : {
    "git revert": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22master%22%7D%2C%22one%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22one%22%7D%2C%22two%22%3A%7B%22target%22%3A%22C2%27%27%22%2C%22id%22%3A%22two%22%7D%2C%22three%22%3A%7B%22target%22%3A%22C2%27%27%27%22%2C%22id%22%3A%22three%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C4%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase -i HEAD~4;git branch -f master C5;git branch -f one C2';git rebase -i HEAD~4;git branch -f master C5;git branch -f two C2'';git rebase -i HEAD~4;git branch -f master C5;git branch -f three C2'''",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\"},\"one\":{\"target\":\"C1\",\"id\":\"one\"},\"two\":{\"target\":\"C1\",\"id\":\"two\"},\"three\":{\"target\":\"C1\",\"id\":\"three\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": "Branch Spaghetti",
  "hint": "Make sure to do everything in the proper order! Branch one first, then two, then three",
  "startDialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branch Spaghetti",
            "",
            "WOAHHHhhh Nelly! We have quite the goal to reach in this level.",
            "",
            "Here we have `master` that is a few commits ahead of branches `one` `two` and `three`. For whatever reason, we need to update these three other branches with modified versions of the last few commits on master.",
            "",
            "Branch `one` needs a re-ordering and a deletion. `two` needs pure reordering, and `three` only needs one commit!",
            "",
            "We will let you figure out how to solve this one -- make sure to check out our solution afterwards with `show solution`. "
          ]
        }
      }
    ]
  }
};
