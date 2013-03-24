exports.level = {
  "compareAllBranchesHashAgnostic": true,
  "disabledMap": {
    "git revert": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22master%22%7D%2C%22one%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22one%22%7D%2C%22two%22%3A%7B%22target%22%3A%22C2%27%27%22%2C%22id%22%3A%22two%22%7D%2C%22three%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22three%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C4%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22two%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout one; git cherry-pick C4 C3 C2; git checkout two; git cherry-pick C5 C4 C3 C2; git branch -f three C2",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\"},\"one\":{\"target\":\"C1\",\"id\":\"one\"},\"two\":{\"target\":\"C1\",\"id\":\"two\"},\"three\":{\"target\":\"C1\",\"id\":\"three\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "ko": "브랜치 스파게티",
    "en_US": "Branch Spaghetti",
    "ja": "ブランチスパゲッティ",
    "zh_CN": "分支浆糊"
  },
  "hint": {
    "en_US": "Make sure to do everything in the proper order! Branch one first, then two, then three",
    "ja": "全て正しい順番で処理すること！oneが最初で、次がtwo、最後にthreeを片付ける。",
    "ko": "이 문제를 해결하는 방법은 여러가지가 있습니다! 체리픽(cherry-pick)이 가장 쉽지만 오래걸리는 방법이고, 리베이스(rebase -i)가 빠른 방법입니다",
    "zh_CN": "确保你是按照正确的顺序来操作！先操作分支 `one`, 然后 `two`, 最后才是 `three`"
  },
  "startDialog": {
    "en_US": {
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
              "Branch `one` needs a re-ordering and a deletion of `C5`. `two` needs pure reordering, and `three` only needs one commit!",
              "",
              "We will let you figure out how to solve this one -- make sure to check out our solution afterwards with `show solution`. "
            ]
          }
        }
      ]
    },
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## ブランチスパゲッティ",
              "",
              "なんということでしょう。今回のレベルクリアのために、やることがたくさんあります。",
              "",
              "いま`master`が指しているコミットの数個前のコミットに、ブランチ`one`、`two`それから`three`があります。何か事情があって、これらの3つのブランチをmasterが指している最新の状態に更新したいケースを考えます。",
              "",
              "ブランチ`one`に対しては、順序の変更と`C5`の削除が必要です。`two`では順序の変更のみ、`three`に対しては1回だけコミットすればOKです。",
              "",
              "`show solution`コマンドで模範解答を確認できますから、こちらも利用してください。 "
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
              "## Branch Spaghetti",
              "",
              "哇塞大神！这关我们要来点不同的！",
              "",
              "现在我们的 `master` 分支是比 `one` `two` 和 `three` 要多几个提交。出于某种原因，我们需要把其他三个分支更新到 master 分支上新近的几个不同提交上。（update these three other brances with modified versions of the last few commits on master）",
              "",
              "分支 `one` 需要重新排序和撤销， `two` 需要完全重排，而 `three` 只需要提交一次。",
              "",
              "慢慢摸索会找到答案的 —— 你完事记得用 `show solution` 看看我们的答案哦。"
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
              "## 브랜치 스파게티",
              "",
              "음, 이번에는 만만치 않습니다!",
              "",
              "여기 `master` 브랜치의 몇 번 이전 커밋에 `one`, `two`,`three` 총 3개의 브랜치가 있습니다. 어떤 이유인지는 몰라도, master의 최근 커밋 몇 개를 나머지 세 개의 브랜치에 반영하려고 합니다.",
              "",
              "`one` 브랜치는 순서를 바꾸고 `C5`커밋을 삭제하고, `two`브랜치는 순서만 바꾸며, `three`브랜치는 하나의 커밋만 가져옵시다!",
              "",
              "자유롭게 이 문제를 풀어보시고 나서 `show solution`명령어로 모범 답안을 확인해보세요."
            ]
          }
        }
      ]
    }
  }
};
