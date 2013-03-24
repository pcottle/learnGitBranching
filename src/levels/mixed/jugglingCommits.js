exports.level = {
  "disabledMap": {
    "git cherry-pick": true,
    "git revert": true
  },
  "compareOnlyMasterHashAgnosticWithAsserts": true,
  "goalAsserts": {
    "master": [
      function(data) {
        return data.C2 > data.C3;
      },
      function(data) {
        return data.C2 > data.C1;
      }
    ]
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%27%22%2C%22id%22%3A%22master%22%7D%2C%22newImage%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22newImage%22%7D%2C%22caption%22%3A%7B%22target%22%3A%22C3%27%27%22%2C%22id%22%3A%22caption%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%2C%22C2%27%27%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C2%27%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase -i HEAD~2;git commit --amend;git rebase -i HEAD~2;git rebase caption master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"newImage\":{\"target\":\"C2\",\"id\":\"newImage\"},\"caption\":{\"target\":\"C3\",\"id\":\"caption\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"caption\",\"id\":\"HEAD\"}}",
  "name": {
    "ko": "커밋들 갖고 놀기",
    "en_US": "Juggling Commits",
    "ja": "Juggling Commits",
    "zh_CN": "提交变换戏法"
  },
  "hint": {
    "en_US": "The first command is git rebase -i HEAD~2",
    "ja": "最初に打つコマンドはgit rebase -i HEAD~2",
    "ko": "첫번째 명령은 git rebase -i HEAD~2 입니다",
    "zh_CN": "第一个命令是 'git rebase -i HEAD~2'"
  },
  "startDialog": {
    "en_US": {
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
              "* Finally, we will move master to this updated part of the tree to finish the level (via the method of your choosing)",
              "",
              "There are many ways to accomplish this overall goal (I see you eye-ing cherry-pick), and we will see more of them later, but for now let's focus on this technique."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Lastly, pay attention to the goal state here -- since we move the commits twice, they both get an apostrophe appended. One more apostrophe is added for the commit we amend, which gives us the final form of the tree ",
              "",
              "That being said, I can compare levels now based on structure and relative apostrophe differences. As long as your tree's `master` branch has the same structure and relative apostrophe differences, I'll give full credit"
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
              "## Commitsをやりくりする",
              "",
              "開発中に頻繁に起こるケースをもう1つ考えます。ある変更（`newImage`）とまた別の変更（`caption`）があって、それらに依存関係があるとします。この一連の変更が一列に積み重なっているとします。",
              "",
              "ここでトリッキーなのは、以前のコミットに対して微修正をかけなければならないケースがあるということです。今回の教材でも、過去のコミットであるにも関わらず`newImage`ブランチに僅かな修正を加えるような設計の修正が入ったとしましょう。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "この困難な状況を、以下の手順で克服することを考えます：",
              "",
              "* `git rebase -i`を使って順番を変更する。これで、変更をかけたいコミットを一番先頭に持ってくる。",
              "* `commit --amend`コマンドで僅かな変更を行う",
              "* `git rebase -i`コマンドを再度使って、先頭に持ってきていたコミットを元に戻す",
              "* 最後に、レベルクリアのためにmasterブランチを先頭に持ってくる",
              "",
              "クリアのための方法はいくつもありますが（cherry-pickを使うこともできます）、別の回答はまた後程の章で見ることにんして、今回は上記の方法でやってみることにしましょう。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "最後に、ゴール時点での状態に気を付けてください。今回2回ほどコミットを動かしますから、コミットへのポインタにはアポストロフィ（'）が追加されます。commit --amendコマンドの実行でできたコミットには更にもう1つのアポストロフィが追加されます。 "
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
              "## 提交变换戏法",
              "",
              "下面这种情况也是经常出现的。例如你之前已经在 `newImage` 分支上做了一些提交，然后又在 `caption` 分支上做了一些相关的提交，因此它们看起来是一个连一个的（stacked on top of each other in your repository）。",
              "",
              "有点棘手的就是有时候你又想往先前的提交里做些小改动。呐，现在就是设计师想要我们去轻微改变下 `newImage` 的内容（change the dimensions slightly），尽管那个提交是很久很久以前的了。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "为了实现他的愿望，我们可以按照下面的方法来做：",
              "",
              "* 先用 `git rebase -i` 将提交重新排序，然后把我们想要修改的提交挪到最前",
              "* 然后用 `commit --amend` 来进行一些小修改",
              "* 接着再用 `git rebase -i` 来将他们按最开始的顺序重新排好",
              "* 最后我们把 master 移到修改的最前端（用你自己喜欢的方法），就大功告成啦！",
              "",
              "当然还有许多方法可以完成这个任务（我知道你在看 cherry-pick 啦），之后我们会多点关注这些技巧啦，但现在暂时只专注上面这种方法。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "啊最后还要提醒你一下最终的形式 —— 因为我们把这个提交移动了两次，所以会分别产生一个省略提交（both get an apostrophe appended）。还有一个省略提交是因为我们为了实现最终效果去修改提交而添加的。"
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
              "## 커밋들 갖고 놀기",
              "",
              "이번에도 꽤 자주 발생하는 상황입니다. `newImage`와 `caption` 브랜치에 각각의 변경내역이 있고 서로 약간 관련이 있어서, 저장소에 차례로 쌓여있는 상황입니다.",
              "",
              "때로는 이전 커밋의 내용을 살짝 바꿔야하는 골치아픈 상황에 빠지게 됩니다. 이번에는 디자인 쪽에서 우리의 작업이력(history)에서는 이미 한참 전의 커밋 내용에 있는 `newImage`의 크기를 살짝 바꿔달라는 요청이 들어왔습니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이 문제를 다음과 같이 풀어봅시다:",
              "",
              "* `git rebase -i` 명령으로 우리가 바꿀 커밋을 가장 최근 순서로 바꾸어 놓습니다",
              "* `commit --amend` 명령으로 커밋 내용을 정정합니다",
              "* 다시 `git rebase -i` 명령으로 이 전의 커밋 순서대로 되돌려 놓습니다",
              "* 마지막으로, master를 지금 트리가 변경된 부분으로 이동합니다. (편하신 방법으로 하세요)",
              "",
              "이 목표를 달성하기 위해서는 많은 방법이 있는데요(체리픽을 고민중이시죠?), 체리픽은 나중에 더 살펴보기로 하고, 우선은 위의 방법으로 해결해보세요."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "최종적으로, 목표 결과를 눈여겨 보세요 -- 우리가 커밋을 두 번 옮겼기 때문에, 두 커밋 모두 따옴표 표시가 붙어있습니다. 정정한(amend) 커밋은 따옴표가 추가로 하나 더 붙어있습니다."
            ]
          }
        }
      ]
    }
  }
};
