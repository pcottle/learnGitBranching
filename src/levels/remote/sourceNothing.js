exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"bar\":{\"target\":\"C1\",\"id\":\"bar\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin :foo;git fetch origin :bar",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Source of nothing",
    "zh_CN": "没有source"
  },
  "hint": {
    "en_US": "The branch command is disabled for this level so you'll have to use fetch!",
    "zh_CN": "本节的分支命令被禁用了, 你只能使用fetch! "
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Oddities of `<source>`",
              "",
              "Git abuses the `<source>` parameter in two weird ways. These two abuses come from the fact that you can technically specify \"nothing\" as a valid `source` for both git push and git fetch. The way you specify nothing is via an empty argument:",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "Let's see what these do..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What does pushing \"nothing\" to a remote branch do? It deletes it!"
            ],
            "afterMarkdowns": [
              "There, we successfully deleted the `foo` branch on remote by pushing the concept of \"nothing\" to it. That kinda makes sense..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Finally, fetching \"nothing\" to a place locally actually makes a new branch"
            ],
            "afterMarkdowns": [
              "Very odd / bizarre, but whatever. That's git for you!"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "This is a quick level -- just delete one remote branch and create a new branch with `git fetch` to finish!"
            ]
          }
        }
      ]
    },
   "zh_CN":{
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 奇葩的`<source>`",
              "",
              "Git abuses the `<source>` parameter in two weird ways. These two abuses come from the fact that you can technically specify \"nothing\" as a valid `source` for both git push and git fetch. The way you specify nothing is via an empty argument:",
              "有两种罕见的情况, git 不需要 `<source>`. 这基于这样一个事实-- 技术上说就是你不指定<source>. 这是通过空参数实现的",
              "",
              "* `git push origin :side`",
              "* `git fetch origin :bugFix`",
              "",
              "我们看看这是怎么进行的..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果给push传一个空参数会如何呢? 远端会删除分支! "
            ],
            "afterMarkdowns": [
              "就是这样子, 我们通过给push传空值source, 成功删除了远端的`foo`分支, 这真有意思..."
            ],
            "command": "git push origin :foo",
            "beforeCommand": "git clone; git push origin master:foo"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果给fetch传空<source>, 那本地会创建一个新分支."
            ],
            "afterMarkdowns": [
              "很神奇吧! 但无论怎么说, 这就是git !"
            ],
            "command": "git fetch origin :bar",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "快速测试 -- 删除远端的分支, 再在本地创建新的分支! "
            ]
          }
        }
      ]
    }
  }
};
