exports.level = {
  "compareOnlyMasterHashAgnostic": true,
  "disabledMap": {
    "git revert": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C6%27%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C6%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout bugFix;git rebase master;git checkout side;git rebase bugFix;git checkout another;git rebase side;git rebase another master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"side\":{\"target\":\"C6\",\"id\":\"side\"},\"another\":{\"target\":\"C7\",\"id\":\"another\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C0\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C5\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "ko": "9천번이 넘는 리베이스",
    "en_US": "Rebasing over 9000 times",
    "zh_CN": "衍合一百遍啊一百遍"
  },
  "hint": {
    "en_US": "Remember, the most efficient way might be to only update master at the end...",
    "ko": "아마도 master를 마지막에 업데이트하는 것이 가장 효율적인 방법일 것입니다...",
    "zh_CN": "记住，可能最终最高效的方法就是更新主分支（master）……"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Rebasing Multiple Branches",
              "",
              "Man, we have a lot of branches going on here! Let's rebase all the work from these branches onto master.",
              "",
              "Upper management is making this a bit trickier though -- they want the commits to all be in sequential order. So this means that our final tree should have `C7'` at the bottom, `C6'` above that, etc etc, etc all in order.",
              "",
              "If you mess up along the way, feel free to use `reset` to start over again. Be sure to check out our solution and see if you can do it in fewer commands!"
            ]
          }
        }
      ]
    },
    "zh_CN": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 多分支衍合",
              "",
              "呐，现在我们有很多分支啦！让我们把这些分支的工作衍合到 master 分支上吧。",
              "",
              "但是上头（upper management）找了点麻烦 —— 他们要希望提交历史是有序的，也就是我们最终的结果是 `C7'` 在最底部，`C6'` 在它上面，以此类推。",
              "",
              "假如你搞砸了，没所谓的（虽然我不会告诉你用 `reset` 可以重新开始）。记得最后要看看我们的答案，并和你的对比下，看谁敲的命令更少哦！"
            ]
          }
        }
      ]
    },
    "ko": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 여러 브랜치를 리베이스(rebase)하기 ",
              "",
              "음, 여기 꽤 여러개의 브랜치가 있습니다! 이 브랜치들의 모든 작업내역을 master에 리베이스 해볼까요?",
              "",
              "윗선에서 일을 복잡하게 만드네요 -- 그 분들이 이 모든 커밋들을 순서에 맞게 정렬하라고 합니다. 그럼 결국 우리의 최종 목표 트리는 제일 아래에 `C7'` 커밋, 그 위에 `C6'` 커밋, 또 그 위에 순서대로 보여합니다.",
              "",
              "만일 작업중에 내용이 꼬인다면, `reset`이라고 쳐서 처음부터 다시 시작할 수 있습니다. 모범 답안을 확인해 보시고, 혹시 더 적은 수의 커맨드로 해결할 수 있는지 알아보세요!"
            ]
          }
        }
      ]
    }
  }
};