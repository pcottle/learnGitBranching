exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C2","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2","changedFiles":["app.js"]}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"secret.env":"modified"}}',
  "compareWorkingChanges": true,
  "solutionCommand": "git restore --staged secret.env;git restore experiment.js;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"staged","secret.env":"staged","experiment.js":"modified"}}',
  "name": {
    "en_US": "Undoing with git restore",
    "zh_CN": "使用 git restore 撤销修改",
    "zh_TW": "使用 git restore 復原變更"
  },
  "hint": {
    "en_US": "Unstage with `git restore --staged secret.env`, throw away the experiment with `git restore experiment.js`, then `git commit`.",
    "zh_CN": "使用 `git restore --staged secret.env` 取消暂存，使用 `git restore experiment.js` 丢弃实验性修改，然后执行 `git commit`。",
    "zh_TW": "使用 `git restore --staged secret.env` 取消預存，使用 `git restore experiment.js` 捨棄實驗性變更，然後執行 `git commit`。"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Undoing with `git restore`",
              "",
              "Everybody makes a little mess sometimes. You stage a file you didn't mean to, or start an experiment you'd rather throw away. `git restore` is the modern, purpose-built undo button for your working directory and staging area.",
              "",
              "It comes in two flavors:",
              "",
              "* `git restore --staged <file>`: **unstage** a file (move it back out of the staging area, keeping your edits)",
              "* `git restore <file>`: **discard** your edits to a file entirely (careful, this throws the changes away!)",
              "",
              "*(These replace the older `git reset HEAD <file>` and `git checkout -- <file>` tricks. Same idea, much clearer names.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Here's the mess on your desk right now:",
              "",
              "```",
              "Changes to be committed:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   secret.env",
              "```",
              "",
              "```",
              "Changes not staged for commit:",
              "  modified:   experiment.js",
              "```",
              "",
              "You want to commit `app.js`, but `secret.env` got staged early by accident (it should be a commit on top), so lets save that for later. Also the `experiment.js` changes did not work so lets throw that out entirely."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Tidy up, then commit:",
              "",
              "* Unstage the secret: `git restore --staged secret.env`",
              "* Discard the experiment: `git restore experiment.js`",
              "* Commit what's left: `git commit`",
              "",
              "That lands one clean commit, with only the work you meant to keep."
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
              "## 使用 `git restore` 撤销修改",
              "",
              "每个人偶尔都会把工作区弄乱一点：可能暂存了不该暂存的文件，也可能开始了一项后来想要丢弃的实验。`git restore` 是专门为工作区和暂存区设计的现代撤销工具。",
              "",
              "它有两种用法：",
              "",
              "* `git restore --staged <file>`：**取消暂存**文件（将文件移出暂存区，但保留你的修改）",
              "* `git restore <file>`：彻底**丢弃**文件修改（请小心，这会删除这些修改！）",
              "",
              "*(它们取代了旧式的 `git reset HEAD <file>` 和 `git checkout -- <file>` 用法。作用相同，但名称清晰得多。)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "现在，你的工作区有点乱：",
              "",
              "```",
              "Changes to be committed:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   secret.env",
              "```",
              "",
              "```",
              "Changes not staged for commit:",
              "  modified:   experiment.js",
              "```",
              "",
              "你只想提交 `app.js`，但 `secret.env` 不小心提前进入了暂存区（它应该留到下一个提交记录），所以先把它留到以后。另外，`experiment.js` 中的修改没有效果，因此把它们全部丢弃。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "整理好工作区，然后提交：",
              "",
              "* 取消暂存敏感文件：`git restore --staged secret.env`",
              "* 丢弃实验性修改：`git restore experiment.js`",
              "* 提交剩余内容：`git commit`",
              "",
              "这样会得到一个干净的提交记录，其中只包含你确实想保留的工作。"
            ]
          }
        }
      ]
    },
    "zh_TW": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 使用 `git restore` 復原變更",
              "",
              "每個人偶爾都會把工作目錄弄亂一點：可能預存了不該預存的檔案，也可能開始了一項後來想要捨棄的實驗。`git restore` 是專門為工作目錄和預存區設計的現代復原工具。",
              "",
              "它有兩種用法：",
              "",
              "* `git restore --staged <file>`：**取消預存**檔案（將檔案移出預存區，但保留你的變更）",
              "* `git restore <file>`：徹底**捨棄**檔案變更（請小心，這會刪除這些變更！）",
              "",
              "*(它們取代了舊式的 `git reset HEAD <file>` 和 `git checkout -- <file>` 用法。作用相同，但名稱清楚得多。)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "現在，你的工作目錄有點亂：",
              "",
              "```",
              "Changes to be committed:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   secret.env",
              "```",
              "",
              "```",
              "Changes not staged for commit:",
              "  modified:   experiment.js",
              "```",
              "",
              "你只想提交 `app.js`，但 `secret.env` 不小心提前進入了預存區（它應該留到下一個 commit），所以先把它留到之後。另外，`experiment.js` 中的變更沒有成功，因此把它們全部捨棄。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "整理好工作目錄，然後提交：",
              "",
              "* 取消預存敏感檔案：`git restore --staged secret.env`",
              "* 捨棄實驗性變更：`git restore experiment.js`",
              "* 提交剩餘內容：`git commit`",
              "",
              "這樣會得到一個乾淨的 commit，其中只包含你確實想保留的工作。"
            ]
          }
        }
      ]
    }
  }
};
