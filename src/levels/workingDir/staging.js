exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C3","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2","changedFiles":["app.js"]},"C3":{"parents":["C2"],"id":"C3","changedFiles":["styles.css"]}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}',
  "compareWorkingChanges": true,
  "solutionCommand": "git add app.js;git commit;git add styles.css;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"modified","styles.css":"modified"}}',
  "name": {
    "en_US": "The Staging Area",
    "zh_CN": "暂存区 Staging Area",
    "zh_TW": "預存區 Staging Area"
  },
  "hint": {
    "en_US": "Stage a file with `git add <file>`, then snapshot it with `git commit`. Do that twice, once per file.",
    "zh_CN": "使用 `git add <file>` 暂存一个文件，再用 `git commit` 将其保存为快照。每个文件各执行一次，共执行两次。",
    "zh_TW": "使用 `git add <file>` 預存一個檔案，再用 `git commit` 將它儲存為快照。每個檔案各執行一次，共執行兩次。"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## The Staging Area",
              "",
              "So far in this learning experience, we have glossed over the idea of what exactly is involved in actually *making* a commit. You might know that they represent changes to a set of files, but there's actually a bit of process in choosing *which* file changes become *which* commits.",
              "",
              "Git doesn't want to just automatically include all changed files in all commits -- that would be bad! It could include a change you don't want to make permanent, or even something secret like an API key that could leak into GitHub as part of your commit history.",
              "",
              "Thus before a change to a file becomes part of a commit, it has to be specifically selected. Git has three zones for this: your **working directory** (where you edit), the **staging area** (a loading dock for what is in the next commit), and the **repository** (your permanent history).",
              "",
              "You pick *exactly* what rides along in each commit with `git add`. That's how commits stay tidy, and you're never forced to commit everything at once.",
              "",
              "*(For these levels, we will now show which files are part of what commits.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Run `git status` any time to see where things stand. Right now it shows two files you've edited but haven't staged:",
              "",
              "```",
              "Changes not staged for commit:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   styles.css",
              "```",
              "",
              "Stage a single file with `git add app.js`, or grab everything at once with `git add .`. Once a file is staged, `git commit` seals it into a snapshot.",
              "",
              "Got files you never want to commit, like secrets, logs, or build junk? List them in a `.gitignore` file and git will quietly leave them alone."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Your turn! Stage and commit your work **one file at a time**, so each commit stays focused:",
              "",
              "* `git add app.js`, then `git commit`",
              "* `git add styles.css`, then `git commit`",
              "",
              "The filenames beside each goal commit show exactly where each change belongs. Two clean commits and the level is yours."
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
              "## 暂存区 Staging Area",
              "",
              "到目前为止，我们一直没有深入讲解实际创建一个提交记录时究竟发生了什么。你可能知道，提交记录代表一组文件的修改，但要决定哪些文件的修改应该放进哪个提交记录，还需要经过一个选择过程。",
              "",
              "Git 不会自动把所有已修改的文件都放进每个提交记录——那样不好！它可能会包含你不想永久保留的修改，甚至可能把 API 密钥之类的敏感内容随提交历史泄露到 GitHub。",
              "",
              "因此，文件修改在成为提交记录的一部分之前，必须经过明确选择。为此，Git 划分了三个区域：**工作区**（本地文件系统中的项目目录，也就是实际编辑文件的位置）、**暂存区**（记录下一个提交记录将包含哪些修改的区域），以及 **Git 仓库**（保存提交历史和项目元数据的地方）。",
              "",
              "使用 `git add`，你可以精确选择每个提交记录要包含的内容。这样既能让提交记录保持整洁，也不必一次提交所有修改。",
              "",
              "（在接下来的关卡中，我们会显示每个提交记录包含了哪些文件。）"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "随时运行 `git status` 都可以查看当前状态。现在，它会显示两个已经修改、但尚未暂存的文件：",
              "",
              "```",
              "Changes not staged for commit:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   styles.css",
              "```",
              "",
              "使用 `git add app.js` 可以暂存单个文件，使用 `git add .` 则可以一次暂存所有文件。文件进入暂存区后，`git commit` 会将它封存为一份快照。",
              "",
              "如果有些文件永远不想提交，例如敏感文件、日志或构建产物，可以把它们列入 `.gitignore` 文件，Git 就会安静地忽略它们。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "轮到你了！请**一次只暂存并提交一个文件**，让每次提交都保持专注：",
              "",
              "* 执行 `git add app.js`，然后执行 `git commit`",
              "* 执行 `git add styles.css`，然后执行 `git commit`",
              "",
              "目标提交记录旁的文件名清楚地标出了每项修改应该放在哪里。完成两个干净的提交记录，就能通过本关。"
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
              "## 預存區 Staging Area",
              "",
              "到目前為止，我們一直沒有深入說明實際建立一個 commit 時究竟發生了什麼。你可能知道，commit 代表一組檔案的變更，但要決定哪些檔案的變更應該放進哪一個 commit，還需要經過一個選擇的過程。",
              "",
              "Git 不會自動把所有已修改的檔案都放進每個 commit——那樣不好！它可能會包含你不想永久保留的變更，甚至可能把 API 金鑰之類的敏感內容隨 commit 歷史洩漏到 GitHub。",
              "",
              "因此，檔案變更在成為 commit 的一部分之前，必須經過明確選擇。為此，Git 劃分了三個區域：**工作目錄**（本機檔案系統中的專案目錄，也就是實際編輯檔案的位置）、**預存區**（記錄下一個 commit 將包含哪些變更的區域），以及**版本庫**（保存 commit 歷史與專案後設資料的地方）。",
              "",
              "使用 `git add`，你可以精確選擇每個 commit 要包含的內容。這樣既能讓 commit 保持整潔，也不必一次提交所有變更。",
              "",
              "（在接下來的關卡中，我們會顯示每個 commit 包含了哪些檔案。）"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "隨時執行 `git status` 都可以查看目前狀態。現在，它會顯示兩個已經修改、但尚未預存的檔案：",
              "",
              "```",
              "Changes not staged for commit:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   styles.css",
              "```",
              "",
              "使用 `git add app.js` 可以預存單一檔案，使用 `git add .` 則可以一次預存所有檔案。檔案進入預存區後，`git commit` 會將它封存為一份快照。",
              "",
              "如果有些檔案永遠不想提交，例如敏感檔案、日誌或建置產物，可以把它們列入 `.gitignore` 檔案，Git 就會安靜地忽略它們。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "輪到你了！請**一次只預存並提交一個檔案**，讓每次提交都保持專注：",
              "",
              "* 執行 `git add app.js`，然後執行 `git commit`",
              "* 執行 `git add styles.css`，然後執行 `git commit`",
              "",
              "目標 commit 旁的檔案名稱清楚地標出了每項變更應該放在哪裡。完成兩個乾淨的 commit，就能通過本關。"
            ]
          }
        }
      ]
    }
  }
};
