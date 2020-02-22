exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C9%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22feature%22%3A%7B%22target%22%3A%22C7%22%2C%22id%22%3A%22feature%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22fix%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22fix%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22base%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22base%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C6%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C8%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C8%22%7D%2C%22C9%22%3A%7B%22parents%22%3A%5B%22C8%22%5D%2C%22id%22%3A%22C9%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git commit;git commit;git checkout c1;git checkout -b feature;git commit;git commit;git checkout c2;git checkout -b fix;git commit;git branch base c1;git revert c2;git checkout feature;git commit;git checkout master;git commit;git commit",
  "name": {
    "en_US": "intro-final",
    "fr_FR": "intro-final"
  },
  "hint": {
    "en_US": "",
    "fr_FR": ""
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Objectifs",
              "",
              "On mélange un peu tout! ",
              "",
              "Créez toute les branch nécessaires, les commits dans le bon ordre.",
              "",
              "Le commit c2' représente l'annulation du commit c2. ",
              "",
              ""
            ]
          }
        }
      ]
    },
    "fr_FR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Objectifs",
              "",
              "On mélange un peu tout! ",
              "",
              "Créez toute les branch nécessaires, les commits dans le bon ordre.",
              "",
              "Le commit c2' représente l'annulation du commit c2. ",
              "",
              ""
            ]
          }
        }
      ]
    }

  }
};
