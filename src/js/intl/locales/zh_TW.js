module.exports = {
  "multiple-parents-name": "多個 parent commit",
  "multiple-parents-hint": "在一個指定的 commit 上面使用 `git branch bugWork`。",
  "multiple-parents-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 選擇 parent commit",
            "",
            "和 `~` 符號一樣，`^` 符號的後面也可以接一個（可選的）數字。",
            "",
            "這不是用來指定往上回去幾代（`~` 的作用），`^` 後面所跟的數字表示我要選擇哪一個 parent commit。還記得一個 merge commit 可以有多個 parent commit 吧，所以當我們要選擇走到哪一個 parent commit 的時候就會比較麻煩了。",
            "",
            "git 預設會選擇 merge commit 的\"第一個\" parent commit，使用 `^` 後面接一個數字可以改變這個預設的行為。",
            "",
            "廢話不多說，舉一個例子。",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "這裡有一個 merge commit。如果後面不加數字的話會直接切換到`master^`，也就是說會回到第一個 parent commit。",
            "",
            "(*在我們的圖示中，第一個 parent commit 是指 merge commit 正上方的那一個 parent commit。*)"
          ],
          "afterMarkdowns": [
            "簡單吧！這就是預設的情況。"
          ],
          "command": "git checkout master^",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "現在來試試選擇第二個 parent commit..."
          ],
          "afterMarkdowns": [
            "看到了嗎？我們回到了第二個 parent commit。"
          ],
          "command": "git checkout master^2",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "使用`^`和`~`可以自由在 commit tree 中移動："
          ],
          "afterMarkdowns": [
            "簡直就像是電光石火！"
          ],
          "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "再瘋狂點，這些符號可以被連在一起！試一下這個："
          ],
          "afterMarkdowns": [
            "和前面的結果一樣，但只用了一條指令。"
          ],
          "command": "git checkout HEAD~^2~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 練習一下",
            "",
            "要完成這一關，在指定的目標位置上面建立一個新的 branch。",
            "",
            "很明顯可以直接使用 commit 的 hash 值（比如 `C6`），但我要求你使用剛剛講到的相對引用的符號！"
          ]
        }
      }
    ]
  },
  "branching-name": "建立 git branch",
  "branching-hint": "用 'git branch [ branch 名稱]' 來建立 branch，用 'git checkout [ branch 名稱]' 切換到該 branch",
  "branching-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git 的 branch",
            "",
            " git 的 branch 非常不佔空間。它們只是一個指向某個 commit 的 reference，就這麼簡單。所以許多 git 的愛好者會建議：",
            "",
            "```",
            "早點建立 branch！經常建立 branch！",
            "```",
            "",
            "因為建立 branch 不怎麼會佔用到硬碟空間或者是記憶體，所以你可以把你目前的工作分成好幾個 branch，這比只用一個 branch 要來的好。",
            "",
            "同時使用 branch 和 commit 時，我們待會可以看到兩者如何配合。現在，只要記住使用 branch 其實就是在說：「我想要包含這一次的 commit 以及它的所有 parent 的 commit。」"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "舉一個例子來看看 branch 到底是什麼。",
            "",
            "這裡，我們建立一個名稱為 `newImage` 的新的 branch。"
          ],
          "command": "git branch newImage",
          "afterMarkdowns": [
            "看吧！這就是建立 branch 所需的操作啦！ `newImage` branch 現在指向 commit `C1`。"
          ],
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "現在讓我們這個新的 branch 做一些操作。點擊下面的按鈕。"
          ],
          "command": "git commit",
          "afterMarkdowns": [
            "太奇怪了啦！ `master` branch 前進了，但 `newImage` branch 沒有前進！這是因為我們沒有「在」這個新的 branch 上，這也是為什麼星號（*）會在 `master` 上。"
          ],
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "使用如下指令告訴 git 我們想要切換到新的 branch",
            "",
            "```",
            "git checkout [name]",
            "```",
            "",
            "這可以讓我們在 commit 之前切換到新的 branch。"
          ],
          "command": "git checkout newImage; git commit",
          "afterMarkdowns": [
            "太好了！新的 branch 已經記錄了我們的修改。"
          ],
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "好啦，你已經準備好使用 branch 了。當目前的視窗關閉後，",
            "建立一個叫 `bugFix` 的新的 branch，然後切換過去。"
          ]
        }
      }
    ]
  },
  "commits-name": "介紹 git commit ",
  "commits-hint": "輸入兩次 'git commit' 就可以完成！",
  "commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git commit",
            "一個 commit 在 git repo 中會記錄目錄下所有文件的快照。感覺像是大量的複製和貼上，但 git 的速度更快！",
            "",
            "git 希望 commit 儘可能地不占空間，所以每次進行 commit 的時候，它不會單純地複製整個目錄。實際上它把每次 commit 視為從目前的版本到下一個版本的變化量，或者說一個 \"（delta）\"。",
            "",
            "git 會保存 commit 的歷史紀錄，所以，絕大部分的 commit 的上面都會有 parent commit，在我們的圖形表示中，箭頭方向表示從 parent commit 到所對應的 child commit，保存這樣子的一個歷史紀錄是非常有用的。",
            "",
            "要學的東西有很多，但現在你可以把 commit 當作是當下的 project 的快照。commit 不佔空間且可以快速切換！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "在實例中學習 commit。右邊是一個（小）git repository。當前有兩個 commit，一開始的 commit `C0` 以及 `C1` 這一個 commit 來表示之後可能的一些修改。",
            "",
            "點擊下面的按鈕生成新的 commit。"
          ],
          "command": "git commit",
          "afterMarkdowns": [
            "看吧！很厲害！我們對於文件做了一些修改，並且把這些修改表示成一個 commit。剛剛做的 commit `C2` 有一個 parent commit `C1`，代表此次修改是從那裡過來的。"
          ],
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "接下來你可以隨便測試。當目前的視窗關閉之後，輸入兩次 commit 就可以過關！"
          ]
        }
      }
    ]
  },
  "merging-name": "git 中的 merge",
  "merging-hint": "記住按指定的順序 commit（bugFix 比 master 優先）",
  "merging-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## branch 以及 merge",
            "",
            "太好了! 我們已經知道怎麼使用 commit 和 branch 了。接下來要學的一招是如何合併（merge）兩個不同 branch 的工作。這讓我們可以建立一個新的 branch ，並且在上面開發新功能，然後合併回 master branch。",
            "",
            "`git merge` 是我們要學習 merge 的第一個方法。該 merge 會產生一個特殊的 commit，它包含兩個唯一 parent commit。一個 commit 如果有兩個 parent commit 的話，那就表示：「我想把這兩個 parent commit 本身及它們的 所有的 parent commit 都包含進來。」",
            "",
            "有圖有真相，看看下面的圖就明白了。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "在這裡，我們有兩個 branch：各自都有一個唯一的 commit。這意味著沒有一個 branch 包含我們對文件的所有修改。讓我們 merge 這兩個 branch 來解決這個問題。",
            "",
            "我們要 merge `bugFix` 到 `master` "
          ],
          "command": "git merge bugFix",
          "afterMarkdowns": [
            "哇！看見了沒有？首先，`master` 現在指向一個 commit，這個 commit 有兩個 parent commit。假如從 `master` 開始沿著箭頭向上走，在到達起點的路上會經過所有的 commit。這說明了現在 `master` 紀錄了對文件的所有修改。",
            "",
            "還有，看見各個 commit 的顏色變化了嗎？為了幫助學習，我混合了顏色。每個 branch 都有特定的顏色。每個 commit 的顏色都變成了含有此 commit 的所有 branch 的混合色。",
            "",
            "所以，`master` branch 的顏色被混入到所有的 commit，但 `bugFix` 沒有。接下來就改一下這裡吧。"
          ],
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們 merge  `master` branch 到 `bugFix` 吧。"
          ],
          "command": "git checkout bugFix; git merge master",
          "afterMarkdowns": [
            "因為 `bugFix` branch只是 `master` branch 的 parent，git 什麼都不用做，只是簡單地把 `bugfix` branch 移動到 `master` 指向的 commit。",
            "",
            "現在所有的 commit 的顏色都是一樣的啦，這表示每一個 branch 都包含了所有文件的修改！太厲害了啦！"
          ],
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "想完成這一關，執行以下的操作：",
            "",
            "* 建立新的 branch，叫做 `bugFix` ",
            "* 用 `git checkout bugFix` 切換到 `bugFix` branch",
            "* commit 一次",
            "* 用 `git checkout` 切換回 `master` branch",
            "* 再 commit 一次",
            "* 用 `git merge`  將 `bugFix` merge 到 `master`",
            "",
            "*記住，你可以用 \"objective\" 指令來重新顯示這個對話框！*"
          ]
        }
      }
    ]
  },
  "rebasing-name": "介紹 rebase",
  "rebasing-hint": "你要先在 bugFix branch 進行 commit",
  "rebasing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git rebase",
            "",
            "*rebasing* 是 merge branch 的第二種方法。rebasing 就是取出一連串的 commit，\"複製\"它們，然後把它們接在別的地方。",
            "",
            "雖然聽起來難以理解，rebasing 的優點是可以建立更線性的 commit history。假如只允許使用 rebasing 的話，則我們的 repo 中的 commit log 或者是 commit history 會更加簡潔好看。",
            "",
            "讓我們親身體會一下..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "這裡，還是有兩個 branch；注意目前我們所在的 branch 是 bugFix（看那顆星啦）",
            "",
            "我們想要把在 bugfix 所做的修改直接移到 master branch上。使用 rebasing 的話，兩個 branch 看起來像是依序按順序進行修改，實際上它們的修改是平行進行的。",
            "",
            "用 `git rebase` 來實現吧"
          ],
          "command": "git rebase master",
          "afterMarkdowns": [
            "很厲害吧！現在 bugFix branch 上的工作在 master branch 的最前端，同時我們也得到了一個更加線性的 commit 順序。",
            "",
            "注意，本來的 commit C3 沒有消失（在圖上面呈現陰影），而我們\"複製\" C3，將它的副本 C3' 接在 master branch 的後面。",
            "",
            "現在唯一的問題是 master branch 還沒有更新...我們接下來就更新它吧！"
          ],
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "現在，切換到 `master` branch。接下來就把它 rebase 到 `bugFix` 上面吧..."
          ],
          "command": "git rebase bugFix",
          "afterMarkdowns": [
            "完成！因為 `master` branch 是 `bugFix` 的 parent，所以 git 只是把 `master` branch 往前移動到 `bugFix` 上。"
          ],
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "想完成這一關，執行以下操作：",
            "",
            "* 建立 `bugFix` branch",
            "* commit 一次",
            "* 切換回 master branch 再 commit 一次",
            "* 再次切換到 bugFix branch，接著 rebase bugFix 這個 branch 到 master branch 上",
            "",
            "祝你好運啦！"
          ]
        }
      }
    ]
  },
  "describe-name": "git describe",
  "describe-hint": "當你要移動的時候，只要在 bugFix 上面 commit 就好了",
  "describe-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### git describe",
            "",
            "因為 tag 在 commit tree 上表示的是一個錨點，git 有一個指令可以用來*顯示*離你最近的錨點（也就是 tag），而且這個指令叫做 `git describe`！",
            "",
            "當你已經完成了一個 `git bisect`（一個找尋有 bug 的 commit 的指令），或者是當你使用的是你跑去度假的同事的電腦時， `git describe` 可以幫助你了解你離最近的 tag 差了多少個 commit。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "`git describe` 的使用方式：",
            "",
            "`git describe <ref>`",
            "",
            "`<ref>` 是任何一個可以被 git 解讀成 commit 的位置，如果你沒有指定的話，git 會以你目前所在的位置為準（`HEAD`）。",
            "",
            "指令的輸出就像這樣：",
            "",
            "`<tag>_<numCommits>_g<hash>`",
            "",
            "`<tag>` 表示的是離 `<ref>` 最近的 tag， `numCommits` 是表示這個 tag 離 `<ref>` 有多少個 commit， `<hash>` 表示的是你所給定的 `<ref>` 所表示的 commit 的前七個 id。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們來看一個例子，對於下面的 tree："
          ],
          "afterMarkdowns": [
            "`git describe master` 會輸出：",
            "",
            "`v1_2_gC2`",
            "",
            "`git describe side` 會輸出：",
            "",
            "`v2_1_gC4`"
          ],
          "command": "git tag v2 C3",
          "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "`git describe` 就是這樣了！試著在這個關卡指定幾個位置來感受一下這個指令吧！",
            "",
            "當你完成的時候，只要一個 commit 就可以結束這個關卡，我們會給你一個免費贈品:P"
          ]
        }
      }
    ]
  },
  "grabbing-one-commit-name": "只取一個 commit",
  "grabbing-one-commit-hint": "記住，使用互動式的 rebase 或者 cherry-pick 會很有幫助",
  "grabbing-one-commit-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 在 local 的堆疊的 commit",
            "",
            "有一個經常發生的情況：我在追蹤一個有點棘手的 bug，但是它實在太難抓出來了，在不得已的情況下我加入了一些 debug 的指令，並且做了一些 commit。",
            "",
            "所有的這些 debug 的指令都只在 `bugFix` 這個 branch 裡面。最後我終於找到這個 bug，並且 fix 掉它，接著撒花慶祝一下！",
            "",
            "現在唯一的問題就是要把我在 `bugFix` branch 裡面所做的修改 merge 回 `master` branch。我可以簡單地透過 fast-forward 來 merge ，但這樣的話 `master` branch 就會包含這些含有 debug 指令的 commit 了。我相信一定有其它方法..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "我們需要告訴 git 只去複製其中一個 commit。 這種情況跟之前的關卡有一點類似，我們可以使用一樣的指令",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`",
            "",
            "來完成這個目的。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "這一個關卡是比較後面的關卡，你可以隨意決定你要選擇使用哪個指令，但是 `bugFix` 所指向的那個 commit 一定要可以被 `master` branch 包含到。"
          ]
        }
      }
    ]
  },
  "juggling-commits-name": "commit 的戲法",
  "juggling-commits-hint": "第一個命令是 'git rebase -i HEAD~2'",
  "juggling-commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## commit 的戲法",
            "",
            "下面這種情況也是經常出現的。例如你之前已經在 `newImage` branch 上做了一些 commit，然後又開了一個 branch 叫做 `caption` ，並且在上面做了一些相關的 commit ，因此它們看起來是一個接著一個的。",
            "",
            "有點棘手的就是有時候你又想在之前的 commit 裡面做一些修改。在這個例子裡面，我們要去稍微修改一下 `newImage` 所指向的 commit，儘管已經是之前的 commit 了 。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "為了克服這個困難，我們可以按照下面的方法來做：",
            "",
            "* 先用 `git rebase -i` 將 commit 重新排序，然後把我們想要修改的 commit 移到最前面",
            "* 然後用 `commit --amend` 來進行一些修改",
            "* 接著再用 `git rebase -i` 來將他們按照最開始的順序重新排好",
            "* 最後我們把 master 移到這個修改的最前端（用你自己喜歡的方法），就大功告成啦！",
            "",
            "當然還有許多方法可以完成這個任務（我知道你在想 cherry-pick 啦），之後我們會多點關注這些技巧啦，但現在暫時只注意上面這種方法。",
            "",
            "啊！最後還要提醒你一下最後所產生的 commit tree，因為我們把 commit 移動了兩次，所以會分別產生一個 apostrophe(單引號） commit。還有一個 apostrophe commit 是因為我們修改 commit 而加進來的。"
          ]
        }
      }
    ]
  },
  "juggling-commits2-name": "commit 的戲法 #2",
  "juggling-commits2-hint": "別忘記了將 master 推到最新的 commit 上面！",
  "juggling-commits2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## commit 的戲法 #2",
            "",
            "*假如你還沒有完成 commit 的戲法 #1（前面那一個關卡），請先完成之後再來這一關！*",
            "",
            "如你在上一個關卡所看到的，我們使用 `rebase -i` 來重新排列那些 commit。只要把我們想要修改的 commit 移到最前面，我們就可以很容易地重新修改它，然後再把它們重新排成我們想要的順序。",
            "",
            "但唯一的問題就是這樣做就要排很多次，有可能造成 rebase conflict。下面就看看用另外一種方法 `git cherry-pick` 是怎麼做的吧！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "要記住喔！ cherry-pick 可以從 commit tree 的任何地方拿一個 commit 來放在 HEAD 上（只要那個 commit 不是 HEAD 的 parent）。",
            "",
            "下面是一個簡單清楚的 demo："
          ],
          "command": "git cherry-pick C2",
          "afterMarkdowns": [
            "太棒了，我們繼續吧！"
          ],
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "在這一關和上一關一樣要去修改一個 commit 叫做`C2`，但你要避免使用 `rebase -i`。自己想想看要怎麼解決吧！"
          ]
        }
      }
    ]
  },
  "tags-name": "git tag",
  "tags-hint": "你可以直接 checkout 到 commit 上，或是簡單的 checkout 到 tag 上",
  "tags-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git tag",
            "",
            "就像你之前學到的一樣，branch 很容易被移動，而且當有新的 commit 時，又會再移動，branch 經常指向不同的 commit，branch 很容易改變。",
            "",
            "你可能會有疑問，有沒有什麼方法可以*永遠*有一個指向 commit 的記號，例如，表示重大的軟體釋出，或者是修正很大的 bug，有沒有其它比 branch 更好的方法，可以永遠地指向這些 commit？",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "你說對了！git tag 可以解決這個問題，它們可以永遠地指向某個特定的 commit，就像是表示一個\"里程碑\"一樣。",
            "",
            "更重要的是，當有新的 commit 時，它們也不會移動，你不可以 \"checkout\" 到 tag 上面 commit，tag 的存在就像是一個在 commit tree 上的表示特定訊息的一個錨。",
            "",
            "讓我們來實際看一下 tag 長什麼樣子..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們試著建立一個 tag，指向 commit `C1`，表示這是我們第一個版本。"
          ],
          "afterMarkdowns": [
            "看吧！非常容易，我們命名這個 tag 叫做 `v1`，並且讓它指向 commit `C1`，如果你離開了該 commit，git 會根據 `HEAD` 所指向的位置才分辨。"
          ],
          "command": "git tag v1 C1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "在這個關卡中，建立一個如視覺化目標裡面的 tag，然後 checkout 到 `v1` 上面，要注意你會進到分離 `HEAD` 的狀態，這是因為你不能夠直接在 `v1` 上面做 commit。",
            "",
            "在下個關卡中我們會介紹更多 tag 的應用..."
          ]
        }
      }
    ]
  },
  "cherry-pick-name": "介紹 cherry-pick",
  "cherry-pick-hint": "git cherry-pick 後面要接著 commit 的名稱",
  "cherry-pick-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "移動 commit",
            "",
            "目前為止我們已經講了 git 的基礎，這些基礎包括 commit、branch 以及在 commit tree 中移動，只要有這些概念你就能發揮 git 90% 的功力，而且對於程式設計師來說，這樣就很夠了。",
            "",
            "而剩下的 10%，在很複雜的專案上面，是非常有用的（或者當你陷入困惑時），我們下一個要講的概念是 \"移動 commit\"，換句話說，當你會這個非常有彈性的招數之後，你就可以說\"我想要把這個 commit 放這裡，而那個 commit 放在那裡\"。",
            "",
            "這看起來很複雜，但其實它很簡單。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git cherry-pick",
            "",
            "我們要講的第一個指令叫作 `git cherry-pick`，它的用法如下：",
            "",
            "* `git cherry-pick <Commit1> <Commit2> <...>`",
            "",
            "當你想要複製幾個 commit 並且接在你目前的位置（`HEAD`）下面的時候，這會是一個非常直接的方式。我個人非常喜歡用 `cherry-pick`，因為它並不複雜，很容易就可以了解。",
            "",
            "讓我們來看一個例子！",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "這裡有一個 repo，在 `side` branch 中，我們有一些 commit 想要複製到 `master` branch 上，這可以透過一個 rebase 來完成（我們之前已經學到了），但是讓我們看看 `git cherry-pick` 怎麼做。"
          ],
          "afterMarkdowns": [
            "就是那樣！我們複製了 `C2` 以及 `C4` 並且把它們放到我們的後面，很簡單吧！"
          ],
          "command": "git cherry-pick C2 C4",
          "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這個關卡，只需要從三個 branch 複製幾個 commit 到 `master` 下面，你可以從視覺化的目標看到我們需要哪些 commit。",
            ""
          ]
        }
      }
    ]
  },
  "detached-head-name": "分離 HEAD",
  "detached-head-hint": "使用 commit 上的標籤（hash）來幫助你！",
  "detached-head-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 在 git 中前後移動",
            "",
            "在接觸 git 的更多進階的主題之前，我們先學習用不同的方法在你的 project 中的 commit tree 上面移動。",
            "",
            "一旦能夠熟練地在 commit tree 中隨意地移動，你使用其它的 git 指令也會更厲害！",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## HEAD",
            "",
            "我們首先看一下 \"HEAD\"，HEAD 是一個 reference，它是指向目前所 checkout 的 commit，基本上，其實就是你目前所在的 commit。",
            "",
            "在 commit tree 中，HEAD 總是指向最近的一次commit。大部份 git 的指令如果要修改 commit tree 的狀態的話，都會先改變 HEAD 所指向的 commit。",
            "",
            "HEAD 通常指向一個 branch 的名稱（比如 bugFix）。當你 commit 的時候，改變了 bugFix 的狀態，這一個變化可以從 HEAD 的改變中看到。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "在實際的例子中。我們將會觀察 commit 前後 HEAD 的位置。"
          ],
          "afterMarkdowns": [
            "看吧！HEAD 一直藏在 `master` 分支的後面。"
          ],
          "command": "git checkout C1; git checkout master; git commit; git checkout C2",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "### 分離 HEAD",
            "",
            "分離 HEAD 就是讓其指向一個 commit 而不是 branch 的名稱。這是指令執行之前的樣子：",
            "",
            "HEAD -> master -> C1",
            ""
          ],
          "afterMarkdowns": [
            "現在變成了",
            "",
            "HEAD -> C1"
          ],
          "command": "git checkout C1",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "想要完成這一個關卡，從 `bugFix` 分離出 HEAD 並且讓它指向一個 commit。",
            "",
            "通過 hash 值可以指定 commit。每個 commit 的 hash 值顯示在各自的圓圈中。"
          ]
        }
      }
    ]
  },
  "interactive-rebase-name": "介紹互動式的 rebase",
  "interactive-rebase-hint": "你可以指定 branch 或者是相對位置（HEAD~）來表示 rebase 的目標",
  "interactive-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git interactive rebase",
            "",
            "當你知道你要複製哪些 commit（而且你也知道他們所對應的 hash 值），那麼 `git cherry-pick`  很適合你。",
            "",
            "但是如果你不知道你要的是哪些 commit 呢？ 很幸運的是，git 也有考慮到這個問題喔！我們可以用互動式的 rebase 來做到，當你想要檢查你想要的 commit 的時候，這會是最好的方法。",
            "",
            "讓我們來看一下這些細節..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "互動式的 rebase 相當於使用 rebase 這個指令的時候，後面加上一個 `-i` 的選項。",
            "",
            "如果你有包含了這個選項，git 就會打開一個 UI，讓你知道說有哪些 commit 會被複製下來，它也會告訴你它們的 hash 值以及可以讓你知道它們是什麼的訊息。",
            "",
            "在\"實務上\"，UI 會利用一個編輯器（例如 vim）打開一個檔案，對於我們來說，我已經設計了一個有同樣功能的對話視窗。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "當互動式的 rebase 的對話視窗打開之後，你就可以做到三件事情：",
            "",
            "* 你可以藉由改變這些 commit 在 UI 的位置（在我們的視窗中，可以透過滑鼠去拖拉），來重新排序它們的順序。",
            "* 你可以選擇完全忽略掉某些 commit，可以用滑鼠按一下，使它變暗，就表示你要忽略掉該 commit。",
            "* 最後, 你可以把 commit 合併在一起，但基於某些理由，在我們的關卡裡面並沒有這個功能。",
            "",
            "太棒了！讓我們來看一個例子！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "當你按下按鈕的時候，一個互動式的 rebase 的視窗就會跳出來，重新排序一些 commit（大膽忽略掉某些 commit），然後看一下結果吧！"
          ],
          "afterMarkdowns": [
            "看吧！ git 根據你所選擇的 commit，把它們複製了下來。"
          ],
          "command": "git rebase -i HEAD~4 --aboveAll",
          "beforeCommand": "git commit; git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這個關卡，使用互動式的 rebase，並且完成視覺化目標所表示 commit 的順序，記住！你可以經常使用 `undo` 或者 `reset` 來修正你的一些錯誤:D"
          ]
        }
      }
    ]
  },
  "relative-refs-name": "相對引用（^）",
  "relative-refs-hint": "不要忘記插入（^）符號！",
  "relative-refs-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 相對引用",
            "",
            "如果要在 git 中移動，透過指定 commit 的 hash 值的方式會變得比較麻煩。在實際例子中，你的終端機上面不會出現漂亮且具備視覺效果的 commit tree，所以你不得不用 `git log` 來查詢 hash 值。",
            "",
            "另外，hash 值的長度在真實的 git 環境中很長。舉個例子，前一個關卡的介紹中的 commit 的 hash 值是 `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`。舌頭不要打結了...",
            "",
            "幸運的是，git 對於處理 hash 值很有一套。你只需要提供能夠唯一辨識出該 commit 的前幾個字元就可以了。所以，我可以只輸入 `fed2` 而不是上面的一長串字元。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "我說過，透過 hash 值來指定 commit 不是很方便，所以 git 加入了相對引用。這個就很厲害了!",
            "",
            "使用相對引用，你可以從一個易於記憶的地方（比如說 branch 名稱 `bugFix` 或 `HEAD`）開始工作。",
            "",
            "相對引用非常好用，這裡我介紹兩個簡單的用法：",
            "",
            "* 使用 `^` 向上移動一個 commit",
            "* 使用 `~<num>` 向上移動多個 commit"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "首先看看插入（^）這一個符號。把這個符號接在某一個 reference 後面，就表示你告訴 git 去找到該 reference 所指向的 commit 的 parent commit。",
            "",
            "所以 `master^` 相當於 \"`master` 的 parent commit\"。",
            "",
            " `master^^` 是 `master` 的 grandparent commit（往前推兩代）",
            "",
            "切換到 master的 parent commit"
          ],
          "afterMarkdowns": [
            "看吧！完成了。這種方式比輸入代表 commit 的 hash 值簡單多了！"
          ],
          "command": "git checkout master^",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "你也可以把 `HEAD` 當作相對引用。以下指令使用 `HEAD` 在 commit tree 中向上移動數次。"
          ],
          "afterMarkdowns": [
            "簡單吧！我們可以一直使用 `HEAD^` 向上移動。"
          ],
          "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
          "beforeCommand": "git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這一關，切換到 `bugFix` 的 parent commit。這會分離出 `HEAD`。",
            "",
            "如果你願意的話，透過直接指定 hash 值的方式也可以過關，但是還是試試看相對引用吧！"
          ]
        }
      }
    ]
  },
  "relative-refs2-name": "相對引用二（~）",
  "relative-refs2-hint": "這一關至少要用到一次直接參考（hash）",
  "relative-refs2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### \"~\" 符號",
            "",
            "假設需要在 commit tree 中向上移動多個 commit。使用太多 `^` 會非常討人厭，所以 Git 也加入了波浪（~）符號。",
            "",
            "",
            "波浪符號後面可以選擇一個數字（你也可以不選擇），該數字可以告訴 Git 我要向上移動多少個 commit 。舉個例子"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "使用 `~` 一次往上移動多個 commit。"
          ],
          "afterMarkdowns": [
            "哇！太簡潔了 -- 相對引用真的很好用！"
          ],
          "command": "git checkout HEAD~4",
          "beforeCommand": "git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Branch forcing",
            "",
            "你現在是相對引用的高手了，現在用它來實際做點事情。",
            "",
            "我使用相對引用最多的就是移動分支。你可以使用 `-f` 選項直接讓分支指向另一個 commit。舉個例子:",
            "",
            "`git branch -f master HEAD~3`",
            "",
            "（強制）移動 master 指向從 HEAD 往上數的第三個 parent commit。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這一關，移動 `HEAD`，`master` 和 `bugFix` 到目標所示的位置。"
          ]
        }
      }
    ]
  },
  "reversing-changes-name": "在 git 中取消修改 ",
  "reversing-changes-hint": "注意 revert 和 reset 使用不同的參數。",
  "reversing-changes-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 取消 git 的修改",
            "",
            "在 git 裡面取消修改的方法很多。和 commit 一樣，在 git 裡面取消修改同時具有底層的部份（暫存一些獨立的文件或者片段）和高層的部份（修改是如何被取消）。我們主要講的重點是後者。",
            "",
            "在 git 裡主要用兩種方法來取消修改，一種是 `git reset`，另外一種是 `git revert`。讓我們在下一個對話視窗中逐一瞭解它們。",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "## Git Reset",
            "",
            "`git reset` 把分支的參考點退回到上一個 commit 來取消修改。你可以認為這是在\"重寫歷史\"。`git reset` 往回移動 branch，原來的 branch 所指向的 commit 好像從來沒有存在過一樣。",
            "",
            "讓我們來看看要怎麼操作："
          ],
          "command": "git reset HEAD~1",
          "afterMarkdowns": [
            "太好了! Git 把 master branch 簡單地移回到 `C1`；現在在我們的 local 已經退回到沒有 commit 過 `C2` 的狀態了。"
          ],
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "## Git Revert",
            "",
            "雖然在你的 local branch 中使用 `git reset` 很方便，但是這種「改寫歷史」的方法對別人的 remote branch 是無效的哦！",
            "",
            "為了取消修改並且把這個狀態*分享*給別人，我們需要使用 `git revert`。舉個例子"
          ],
          "command": "git revert HEAD",
          "afterMarkdowns": [
            "很奇怪吧！在我們要取消的 commit 後面居然多了一個新的 commit！這是因為新的 commit `C2'` 引入了*修改*——用來表示我們取消 `C2` 這個 commit 的修改。",
            "",
            "多虧了 revert，現在可以把你的修改分享給別人啦。"
          ],
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這一關，分別取消 `local` branch 和 `pushed` branch 上的最近的一次 commit。",
            "",
            "記住 `pushed` 是一個 remote branch，`local` 是一個 local branch，有了這麼明顯的提示應該知道要用哪種方法了吧？"
          ]
        }
      }
    ]
  },
  "many-rebases-name": "N次Rebase",
  "many-rebases-hint": "要記住喔! 把 master branch 留到最後更新可能是最有效率的方法。",
  "many-rebases-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### rebase 多個 branch",
            "",
            "嗨！現在我們有很多 branch 了啦！讓我們做一下 rebase，將這些分支接到 master branch 上吧。",
            "",
            "但是你的主管找了點麻煩，他們希望得到有序的 commit history，也就是我們最終的結果是 `C7'` 在最下面，`C6'` 在它上面，以此類推。",
            "",
            "假如你搞砸了，沒有關係啦！你用 `reset` 就可以重新開始！記得看看我們提供的答案，看你是否能夠使用更少的指令完成這一關！"
          ]
        }
      }
    ]
  },
  "selective-rebase-name": "branch 漿糊",
  "selective-rebase-hint": "確認你是按照正確的順序來操作！先操作 branch  `one`, 然後 `two`, 最後才是 `three`",
  "selective-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branch Spaghetti",
            "",
            "哇塞大神！這關我們要來點不同的！",
            "",
            "現在我們的 `master` branch 是比 `one` `two` 和 `three` 這三個 branch 多了幾個 commit。由於某種原因，我們需要將 master 所新增的幾個 commit 套用到其它三個 branch 上面。",
            "",
            "`one` branch 需要重新排序和取消 `C5` 這一個 commit， `two` 需要完全重排，而 `three` 只需要再一個 commit。",
            "",
            "我們會讓你知道如何解決這個問題，之後請記得用 `show solution` 看看我們的答案喔。"
          ]
        }
      }
    ]
  },
  "clone-name": "介紹 clone",
  "clone-hint": "只要 git clone 就好了",
  "clone-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Remotes",
            "",
            "remote (遠端) repository 並不會很難了解. 藉由現在的雲端運算，可以很輕易地了解到在 git remote 裡面有很多有趣的事情，但它們其實其實就只是你的或者是其它電腦上的 repository 的副本。你可以輕易地透過網路去發送你的 commit 給其它的電腦。",
            "",
            "也就是說，remote repository 有很多有趣的地方：",
            "",
            "- 第一，remote 是用來備份的! 本地端的 git 有能力可以回復文件到前一個狀態 (你知道的)，但是全部的資訊還是儲存在本地端。如果你在其它的電腦上面有你的 git repository 的副本，則你可以在資料不小心遺失的時候進行救援備份",
            "",
            "- 更重要的是, remote 讓大家一起來 coding！現在你的 project 放在 remote 上面，你的朋友可以很容易地對你的 project 做出貢獻（或者是 pull 你最後的修改） 。",
            "",
            "使用網站去對 remote repository 做視覺化非常流行（例如 [Github](https://github.com/） 或者是 [Phabricator]（http://phabricator.org/）），但這背後最大的功臣是 remote repository，因此我們務必要了解它。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 我們去建立 remotes 的指令",
            "",
            "到目前為止，Learn Git Branching 著重在解釋本地端的工作（branching, merging, rebasing 以及其它指令）， 但是我們現在想要學習針對 remote 的指令，我們需要一個指令去建立環境，`git clone` 就是我們需要的指令",
            "",
            "技術上來說， `git clone` 表示你想要把遠端的 repository 複製一份下來放在本地端（ 例如從 github 複製）。 雖然 `git clone` 實際上是把遠端的 repository 複製下來放在本地端，在 Learn Git Branching 中，我們用的這個指令會有一點不同。雖然他跟真實的指令的意思相反，但是它可以建立起本地端以及遠端的一個連結，現在讓我們看看如何使用它吧。",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們慢慢來，並且看看 remote repository 是長什麼樣子（在我們的視覺化圖形中）。",
            ""
          ],
          "afterMarkdowns": [
            "就是那樣！現在我們有了一個放置了我們 project 的 remote repository。除了一些視覺上的改變之外，它們看起來很像，在之後的關卡中你就會看到我們如何分享我們的工作到這些 repository 上面。"
          ],
          "command": "git clone",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這個關卡，只要打 `git clone，其它的學習會在後面的關卡中出現。"
          ]
        }
      }
    ]
  },
  "fake-teamwork-name": "模擬團隊合作",
  "fake-teamwork-hint": "你要記得指定要送多少個 commit 出去",
  "fake-teamwork-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 模擬合作",
            "",
            "接下來的課程有一個很難的事情，我們需要讓你學會如何 pull remote 上的更新。",
            "",
            "這就表示我們必須要 \"假裝\" remote 被你其中一個同事/ 朋友/ 合作的人在某個特定的 branch 上面送了一些特定的 commit。",
            "",
            "為了要做到這件事情,我們要介紹一個自己設計的指令 `git fakeTeamwork`！ 從字面上就可以很容易地看出來它在幹嘛，讓我們來看一個範例..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`fakeTeamwork` 的預設行為是在送一個 commit 給 master 分支"
          ],
          "afterMarkdowns": [
            "我就說吧！remote 已經藉由一個新的 commit 而更新了，而且因為我們還沒有用 `git fetch`，所以表示我們還沒有下載該 commit。"
          ],
          "command": "git fakeTeamwork",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "你可以在命令的後面指定你要送幾個 commit 或是要送給哪個 branch。"
          ],
          "afterMarkdowns": [
            "我們利用一個指令將三個 commit 送給在 remote 上面的 `foo` branch。"
          ],
          "command": "git fakeTeamwork foo 3",
          "beforeCommand": "git branch foo; git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "接下來的關卡會很困難，所以我們在這個關卡中會問你更多問題。",
            "",
            "現在先把 remote 下載下來（利用 `git clone`），假裝送幾個 commit 給 remote 做更新，然後 pull 這些 commit 下來 。這就好像是幾個教學中的指令的總結！"
          ]
        }
      }
    ]
  },
  "fetch-name": "git fetch",
  "fetch-hint": "只要下 git fetch 指令",
  "fetch-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git fetch",
            "",
            "透過 git remote 其實就是把資料接收或傳送到其它的 repository，只要我們可以將資料傳進及傳出，我們就可以分享任何被 git 所追蹤的 repository 的更新（例如分享工作進度，新的檔案，新的想法，以及情書等等...）。",
            "",
            "在這個教學中，我們會學習到如何從 remote repository 來 fetch （抓取）資料，這個指令叫作 `git fetch`。",
            "",
            "你將會注意到當我們的 remote repository 更新的時候，相對應的 _remote_ branch 也會反應該更新，這個跟我們之前所提到的 remote branch 的特性是吻合的。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "在講到 `git fetch` 的細節之前，我們要先來看一下例子！在這裡我們有一個新增了兩個 commit 的 remote repository，而且我們的 local repository 並沒有包含這兩個 commit。"
          ],
          "afterMarkdowns": [
            "看吧！commit `C2` 以及 `C3` 已經被下載到我們的 local repository，而且我們的 remote branch `o/master` 也更新了。"
          ],
          "command": "git fetch",
          "beforeCommand": "git clone; git fakeTeamwork 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### fetch 做了什麼",
            "",
            "`git fetch` 只有執行了兩個主要步驟，包含：",
            "",
            "* 下載 remote 有的 commit，但是在我們的 local repository 是沒有該 commit。還有...",
            "* 更新我們 remote branch 所指向的地方（例如， `o/master`）",
            "",
            "基本上，`git fetch` 同步了我們的 local repository 以及 remote repository 的最新狀態。",
            "",
            "假如你還記得之前的教學的話，我們說過 remote branch 反應了 remote repository 的狀態，原因在於說你最後接觸的是這些 remote repository，而你就是利用 `git fetch` 來接觸這些 remote repository！現在 remote branch 跟 `git fetch` 的關係已經很明顯了。",
            "",
            "`git fetch` 通常是透過網路來跟 remote 溝通（透過一個 protocol （協定），例如 `http://` 或者是 `git://`）。",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### fetch 沒有做的事情",
            "",
            "然而，`git fetch` 並不會影響到在你的 local repository 中的 `master` branch，他並不會將你的 `master` branch 更新到最新的狀態。",
            "",
            "這個觀念很重要，因為很多程式設計師以為 `git fetch` 可以讓他們在 local repository 上面的工作跟 remote repository 的工作可以同步。它是會下載同步所需的資料，但是不會更新任何的檔案，我們會在後面的教學中提到如何做到這件事情。:D",
            "",
            "因此，你可以把 `git fetch` 想成是在下載資料。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這一關，只要透過 `git fetch` 並且下載全部的 commit 即可！"
          ]
        }
      }
    ]
  },
  "fetch-args-name": "fetch 的參數",
  "fetch-args-hint": "注意 commit 的 id 是怎麼被交換的！你可以透過 `help level` 來閱讀對話視窗！",
  "fetch-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git fetch 的參數",
            "",
            "我們剛學到了所有關於 git push 的參數，有非常棒的 `<place>` 參數，甚至是 colon refspecs（`<source>:<destination>`），我們可不可以也同樣套用到 `git fetch` 上面？",
            "",
            "你猜對了！`git fetch` 的參數*非常非常*類似 `git push`，一樣的概念，但方向不同（因為你在下載 commit，而不是在上傳 commit）。",
            "",
            "讓我們一次講一個概念..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "###`<place>` 參數",
            "",
            "對於 `git fetch`，如果你特別指定了一個 `<place>`：",
            "",
            "`git fetch origin foo`",
            "",
            "git 會到 remote 上的 `foo` branch，抓下所有不在 local 上的 commit，然後將它們放到 local 的 `o/foo` branch。",
            "",
            "讓我們實際看一下（就只是一個*更新*的方法）。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "指定一個 `<place>`..."
          ],
          "afterMarkdowns": [
            "我們只下載了 `foo` 上的 commit，並且把它們放到 `o/foo`。"
          ],
          "command": "git fetch origin foo",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "你也許會感到奇怪，為什麼 git 是把這些 commit 放到 `o/foo` branch 而不是放到我的 local 的 `foo` branch？ 我認為，`<place>` 參數是表示一個位置，這個位置同時存在 local 跟 remote 上？",
            "",
            "因為你可能已經 checkout 到 `foo` branch 上，而且你不想要打亂上面的 commit，因此 git 才會特別這樣做！！這就又回到之前的 `git fetch` 的課程，它並不會放到你的 local 上的 branch (該 branch 沒有對應到任何的 remote branch)，它只會下載 commit 到 local 上且表示 remote 的 branch（所以你之後可以觀察或者 merge 它們）。",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "\"在該例子當中，如果我特別透過 `<source>:<destination>` 來指定 source 以及 destination，會發生什麼事情？\"",
            "",
            "如果你很想要把 fetch 回來的 commit *直接*放到 local branch，那麼你就可以利用一個 colon refspec 來做到。你不能夠把 fetch 回來的 commit 放到你目前正 checkout 的 branch，如果不是的話，git 就會允許你這麼做。",
            "",
            "這裡只有一個重點，`<source>` 現在是一個在 *remote* 上的 branch，而且 `<destination>` 是一個放置這些 commit 的 *local* 的位置。它剛好就是 `git push` 的相反，而且因為我們在相反方向傳遞資料，所以這也很合理！",
            "",
            "其實，程式設計師很少會想要做這個，我主要是強調 `fetch` 以及 `push` 的概念是很類似的，就只是方向相反而已。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們來實際看一下這個瘋狂的事情："
          ],
          "afterMarkdowns": [
            "哇！看到了吧，git 把  `foo~1` 解讀成一個在 origin 上的位置，而且把該位置上面的 commit 下載到 `bar`（這是一個 local branch）上面，注意，因為我們有指定目的地，因此 `foo` 跟 `o/foo` 並沒有被更新。"
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果我在執行這個指令之前，destination 不存在的話會怎樣？我們回到上一個例子，但這一次事前並沒有 `bar` 這個 branch 的存在。"
          ],
          "afterMarkdowns": [
            "看到了吧，這就像是 `git push`，在 fetch 之前，git 會自己建立 destination，就好像是在 push 之前， git 會建立 remote 上的 destination 一樣（如果它不存在的話）。"
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "沒有參數的情況？",
            "",
            "如果使用 `git fetch` 的時候，沒有指定任何的參數，那就相當於它會下載 remote 上面的所有的 commit，並且把這些 commit 放到 local 上面所有對應到 remote 的 branch..."
          ],
          "afterMarkdowns": [
            "超簡單，但是所有的更新只做一次，很值得。"
          ],
          "command": "git fetch",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "好的，講了好多！要完成這一關，fetch 視覺化的目標所指定的 commit，好好玩這些指令吧！",
            "",
            "對於兩個 fetch 的指令，你必須要指定 source 以及 destination，注意一下視覺化的目標，因為 commit 的 id 可以被交換！"
          ]
        }
      }
    ]
  },
  "fetch-rebase-name": "diverged history",
  "fetch-rebase-hint": "確認視覺化的目標中的順序",
  "fetch-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Diverged Work",
            "",
            "到目前為止我們已經知道如何 `pull` 其他人所送的 commit，而且也知道如何 `push` 我們自己的 commit，感覺很簡單，但是為什麼有人看起來很困惑？",
            "",
            "當 repo 的歷史紀錄是 *diverge（branch 走向不同）* 的狀態時就會很棘手，在討論這個之前，讓我們先來看一個例子...",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "想像一下你在星期一的時候 clone 了一個 repo，並且開始在設計一個功能，在星期五的時候你準備好要發佈你的新功能，但是非常不幸地，你的同事已經寫了一連串的程式碼並且已經將 commit 發佈到 remote，所以現在*你的*進度是在一個比較*舊*的版本的後面（如果與 remote 比較的話啦！）。",
            "",
            "在這種情況底下，使用 `git push` 會有問題，如果你使用 `git push`，那麼 git 應該要把 remote 退回到星期一的狀態？它應該要把你所寫好的程式碼一起更新進去，同時不會影響你的同事寫好的程式碼？或者是他應該要因為版本比較舊而完全忽略你的程式碼？",
            "",
            "因為在這種情況下會很麻煩（當 git 歷史紀錄被 diverge 了），所以 git 不會允許你 `push` 你的 commit。在你上傳你的 commit 之前，它實際上會先強迫你先跟 remote 同步。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "講太多了啦！讓我們實際看一下這個情況。"
          ],
          "afterMarkdowns": [
            "看到了沒？因為指令失敗了，所以沒有任何事情發生。 `git push` 失敗的原因是因為你最近的 commit `C3` 是在 `C1` 的後面，但是 remote 那邊是 `C2` 在 `C1` 的後面，所以 git 才會拒絕你的 push。"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "你要如何解決這種情況？很簡單，你只需要把 `C3` 接在 remote 最新的版本 `C2` 的後面就可以了。",
            "",
            "有一些方法可以做到，但是最直接的方式是用 rebase，我們來做看看。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "在我們 push 之前，先來做 rebase..."
          ],
          "afterMarkdowns": [
            "看吧！我們利用 `git fetch` 下載了 remote 上面的 commit，並且 rebase 我們的 commit，使得我們的 commit 可以接在 remote 上面最新的版本的後面，接著透過 `git push` 就可以上傳更新了。"
          ],
          "command": "git fetch; git rebase o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "在 remote 已經率先更新之後，還有沒有其它方法可以上傳我們的 commit？當然有阿！我們這次利用 `merge` 來做看看！",
            "",
            "雖然 `git merge` 並不會去移動你的 commit（反而會產生一個 merge commit），這是一個告訴 git 你已經下載了 remote 上面的 commit 並且在 local repo 中已經做完 merge，而因為 remote branch 上的最新的 commit 現在已經是 merge commit 的一個 *ancestor*，這就表示你的 commit 已經包含了在 remote branch 上的所有 commit。",
            "",
            "讓我們來看一下這種情況..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "現在假設我們不是用 rebase，而是用 merge..."
          ],
          "afterMarkdowns": [
            "看吧！我們藉由 `git fetch` 把 remote 上的 commit 下載下來，並且 *merged* 該 commit 到我們目前的 branch（這樣就表示我們產生的 merge commit 有包含了 remote　上的 commit），接著再透過 `git push` 上傳到 remote。"
          ],
          "command": "git fetch; git merge o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "太棒了! 有沒有其它可以不用打這麼多指令的方法？",
            "",
            "當然有阿！你已經知道 `git pull` 就是表示一個 fetch 跟一個 merge。 有一個指令非常方便，那就是 `git pull --rebase`，它表示的是一個 fetch 以及一個 rebase。",
            "",
            "我們來看如何使用這個簡化後的指令。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "首先 `--rebase`..."
          ],
          "afterMarkdowns": [
            "跟之前一樣！只是少打了很多指令。"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "現在用一般的 `pull`"
          ],
          "afterMarkdowns": [
            "又來了，剛好跟之前的一樣！"
          ],
          "command": "git pull; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "fetch，rebase/merge，以及 push 的流程是幾乎一樣的。在之後的教學中我們會看到比這些流程更複雜的版本。但是現在讓我們先牛刀小試一下。",
            "",
            "為了要完成這一關，請按照下面的步驟：",
            "",
            "* clone 你的 repo",
            "* 假裝送一個 commit 給 remote",
            "* 送一個 commit 給 local repo",
            "* 透過 *rebase* 送自己的 commit"
          ]
        }
      }
    ]
  },
  "merge-many-features-name": "merge with remotes",
  "merge-many-features-hint": "注意最後要完成的目標！",
  "merge-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 為何不要 merge？",
            "",
            "為了要 push 新的 commit 給 remote，你只需要做的是先同步 remote 的更新，那就表示你可以使用 rebase *或者*是 merge remote branch （例如，`o/master`）。",
            "",
            "所以假如你已經學會使用其中一個方式了，那為什麼我們到目前為止還在強調 `rebase`？為什麼當提到 remote 的時候，反而 `merge` 比較沒有受到關注？",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "在程式發展的社群中，關於 `merge` 以及 `rebase` 的孰優孰劣有很多的爭論。這裡我們會提到關於 `rebase` 的優點及缺點：",
            "",
            "優點：",
            "",
            "* `rebase` 使得你的 commit tree 看起來更為簡潔，因為任何的 commit 都在一條直線上面。",
            "",
            "缺點：",
            "",
            "* `rebase` 修改了 commit tree 的歷史紀錄。",
            "",
            "舉例來說，我們可以 rebase commit `C1`，將 `C1` 接在*過去的* `C3` 上面，那麼就可以表現出 `C1` 是出現在 `C3` 的後面。",
            "",
            "有一些程式設計師喜歡保留歷史紀錄，因此他們會比較喜歡 `merge`; 其他人（例如我自己）比較喜歡一個簡潔的 commit tree，因此他們比較喜歡 `rebase`。這些都是擇你所愛。:D"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "在這個關卡中，我們面對的是之前關卡的題目，但是我們採用的是 `merge`，這可能會讓你感覺到有點困難，但是確實有講到重點。"
          ]
        }
      }
    ]
  },
  "pull-name": "git pull",
  "pull-hint": "只要下 git pull 這個指令即可",
  "pull-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git pull",
            "",
            "現在我們已經知道如何利用 `git fetch` 從 remote 抓取 commit，讓我們來看一下如何將這些 commit 更新到我們的檔案！",
            "",
            "只要在你的 local 有 fetch 到新的 commit，便有很多方法可以做到這件事情，你可以把它們視為在其它 branch 上面的一般的 commit，這表示你可以執行像這樣子的指令:",
            "",
            "* `git cherry-pick o/master`",
            "* `git rebase o/master`",
            "* `git merge o/master`",
            "* 等等‧‧‧",
            "",
            "事實上，一次*下載 (fetch)* remote 的更新並且*合併（merge）* 這些更新在 git 裡面是很常見的事情！這個命令叫作 `git pull`。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們來看循序執行一個 `fetch` 和一個 `merge` 的樣子"
          ],
          "afterMarkdowns": [
            "看吧! 我們利用 `fetch` 下載了 `C3` 並且利用 `git merge o/master` 來更新資料，現在我們的 `master` branch 跟 remote 同步了（在這個例子中，remote repository 叫作 `origin`）。"
          ],
          "command": "git fetch; git merge o/master",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果用 `git pull` 會發生什麼事情？"
          ],
          "afterMarkdowns": [
            "一樣！很明顯地，`git pull` 其實就是 git fetch 跟 git merge 的循序執行的結果，而且 merge 的 branch 就是 fetch 所更新的 branch。"
          ],
          "command": "git pull",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "我們會解釋 `git pull` 的細節（包括可選擇的參數）, 但現在先讓我們在這個關卡試試看！",
            "",
            "記住喔，你可以利用循序執行的方式來執行 `fetch` 以及 `merge` 來完成這個關卡，但是相對於 `git pull`，你就得多打一個指令。:P"
          ]
        }
      }
    ]
  },
  "pull-args-name": "pull 的參數",
  "pull-args-hint": "記住，你可以透過 fetch 以及 pull 來建立一個新的 local 的 branch",
  "pull-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git pull 的參數",
            "",
            "現在你已經知道關於 `git fetch` 以及 `git push` 的*任何參數*，但是我們還可以再聊聊 `git pull`:)",
            "",
            "那是因為 `git pull` 到目前為止*的確*只是表示 fetch 之後再 merge 所 fetch 的 commit，你可以把它想成，當使用 `git fetch` 時使用*一樣*的參數，之後再從 fetch 下來的 commit *所放置*的位置做 merge。",
            "",
            "這同樣也適用於當你指定相當複雜的參數，讓我們來看一些例子："
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "對於 git 來說，有一些意義一樣的指令：",
            "",
            "`git pull  origin foo` 相當於：",
            "",
            "`git fetch origin foo; git merge o/foo`",
            "",
            "而且...",
            "",
            "`git pull  origin bar~1:bugFix` 相當於：",
            "",
            "`git fetch origin bar~1:bugFix; git merge bugFix`",
            "",
            "看吧？`git pull` 真的就只是表示 fetch 跟 merge 的一個簡化後的指令，而且 `git pull` 所根據的是這些 commit 要放置的位置（在 fetch 的時候所指定的`destination`）。",
            "",
            "讓我們來看一個例子："
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果我們在 fetch 的時候有指定`位置`的話，跟之前一樣，fetch 所做的事情沒有變，但是我們會 merge 我們剛剛所 fetch 的該`位置`的commit。"
          ],
          "afterMarkdowns": [
            "看吧！指定位置為 `master`，跟平常一樣，我們下載了 commit 並且放到 `o/master` 上，接著，我們會 merge `o/master` 到我們現在的位置，*不管*我們現在所 checkout 的位置在哪裡。"
          ],
          "command": "git pull origin master",
          "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "他是不是也可以同時指定 source 以及 destination？你說對了啦！讓我們來看一下："
          ],
          "afterMarkdowns": [
            "哇！這個指令強而有力，我們在 local 建立了一個新的 `foo` branch，下載了 remote 的 `master` 的 commit，並且放到 local 的 `foo` branch，之後 merge `foo` branch 到我們目前所 checkout 的 `bar` branch。這實在是太超過了！！！"
          ],
          "command": "git pull origin master:foo",
          "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這一關，達到視覺化目標的要求，你需要下載一些 commit，建立一些新的 branch，並且 merge 這些 branch 到其他的 branch 上面，這個關卡不需要打太多的指令:P"
          ]
        }
      }
    ]
  },
  "push-name": "git push",
  "push-hint": "push 之前你需要先 clone",
  "push-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Push",
            "",
            "ok，現在我已經從 remote 下載了一些更新，並且把它們 merge 到我的 local 上面的 branch，這聽起來實在太讚了...，但是我要如何分享_我_所做的更新給其它人呢？",
            "",
            "喔，其實上傳並且分享更新跟下載更新並且 merge 是相反的兩件事情，那什麼是 `git pull` 的相反呢？ 那就是 `git push`！",
            "",
            "`git push` 負責上傳_你的_ commit 到特定 remote 上面並且做出相對應的更新，只要做完了 `git push`，所有你的朋友都可以從 remote 上面下載你所送出去的 commit。",
            "",
            "你可以把 `git push` 當作是一個\"發佈\"你的工作進度的指令，還有一些我們即將要講到的細節，但是先讓我們從一些簡單的步驟開始。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "這裡我們有了一些 remote 所沒有的 commit。讓我們來上傳它們吧！"
          ],
          "afterMarkdowns": [
            "我說的沒錯吧！remote 收到了 commit `C2`，同時在 remote 上的 `master` branch 也一起更新並且指向 `C2`，同時我們*自己的* `o/master` 也一併更新了！"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這個關卡，只要上傳兩個新的 commit 給 remote，不要太得意忘形喔！因為這些課程將會愈來愈難！"
          ]
        }
      }
    ]
  },
  "push-args-name": "git push 的參數",
  "push-args-hint": "你可以利用 \"objective\" 來閱讀對話視窗的最後一頁",
  "push-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## push 的參數",
            "",
            "太好了！現在你已經明白了 remote tracking，我們可以開始聊 git push、fetch 以及 pull 的一些有趣的地方，我們一次會講解一個指令，但是它們之間的概念是很類似的。",
            "",
            "首先我們來看一下 `git push`，你已經在 remote tracking 的課程中學習到 git 是根據目前 checkout 的 branch 所 track 的 remote branch 來做 push，這是在沒有任何的參數的情況下的預設動作，但是 git push 允許我們可以加上一些參數：",
            "",
            "`git push <remote> <place>`",
            "",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "`<place>` 這個參數表示什麼? 我們等一下會提到細節，但是先來看一個例子，執行以下的指令：",
            "",
            "`git push origin master`",
            "",
            "將這段解釋成中文：",
            "",
            "*先到我的 repo 中的 \"master\" branch，抓下所有的 commit，然後到叫作 \"origin\" 的 remote 的 \"master\" branch，檢查 remote 的 commit 有沒有跟我的 repo 一致，如果沒有，就更新。*",
            "",
            "將 `master` 當作 \"place\" 這個參數，我們告訴 git 這些 commit 是*從哪裡來的*，而且它們要*往哪裡去*。對於要同步兩個 repo， \"place\" 或者是 \"location\" 是非常重要的。",
            "",
            "要記住喔，因為我們告訴 git 它所要知道的（有兩個參數），因此它才不會管你現在所 checkout 的 branch！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們來看一個有加上參數的例子，在這個例子中，要特別注意到我們所 checkout 的位置。"
          ],
          "afterMarkdowns": [
            "我說的沒錯吧！因為我們加上了參數，所以在 remote 上的 `master` branch 更新了。"
          ],
          "command": "git checkout C0; git push origin master",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "假如我們沒有特別指令參數會發生什麼事情？"
          ],
          "afterMarkdowns": [
            "指令會失敗（就像你看到的），因為 `HEAD` 並沒有指向一個有 track remote branch 的 branch 上面阿。"
          ],
          "command": "git checkout C0; git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "好的，在這個關卡中，我們要更新在 remote 上的 `foo` 以及 `master` branch，比較遺憾的是 `git checkout` 在這個關卡中是不被允許的喔！"
          ]
        }
      }
    ]
  },
  "push-args2-name": "git push 的參數，延伸討論！",
  "push-args2-hint": "如果你失敗了，可以利用 \"show solution\" 來找到解答:P",
  "push-args2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## `<place>` 這個參數的細節",
            "",
            "回想一下，我們在之前的課程中提到，當我們用 `git push` 並且把 `master`  當作 `<place>` 這個參數的時候，我們就相當於告訴 git 我們的所要更新的 commit 要*從哪裡來*（source） 並且要 *往哪裡去*（destination）。",
            "",
            "你可能會很好奇，當我們的 source 以及 destination 是不同的時候，應該怎麼做？當你想要 push `foo` branch 上面的 commit 到 remote 的 `bar` branch 的時候，應該怎麼做？",
            "",
            "很遺憾地，對於 git 來說這是不可能的...開玩笑的啦！當然是有可能的:)... git 有非常非常大的彈性（太超過了啦）。",
            "",
            "讓我們來看看下一頁..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "為了要指定 `<place>` 的 source 以及 destination，只要利用一個冒號將這兩個連在一起：",
            "",
            "`git push origin <source>:<destination>`",
            "",
            "這通常被稱為一個 colon （冒號） refspec，refspec 只是一個表示 location （位置） 的花俏的名稱，這個位置可以被 git 辨別（例如 `foo` branch 或是 `HEAD~1`）。",
            "",
            "一旦你單獨指定了 source 以及 destination，你可以看到花俏且準確的指令。讓我來來看一個例子！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "記住， `source` 表示任意可以被 git 辨識的位置："
          ],
          "afterMarkdowns": [
            "哇!這實在是一個很花俏的指令但是確很合理，git 把 `foo^` 解讀成一個位置，並且 push 該位置的 commit 到目前 remote 的 master branch。"
          ],
          "command": "git push origin foo^:master",
          "beforeCommand": "git clone; go -b foo; git commit; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "如果你想要 push 的 destination 不存在怎麼辦？沒有問題！只要給一個 branch 的名稱，git 就會在 remote 幫你建立。"
          ],
          "afterMarkdowns": [
            "太讚了，實在非常地簡單:D"
          ],
          "command": "git push origin master:newBranch",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "對於這個關卡，想辦法達到這個視覺化的目標，而且要記得格式：",
            "",
            "`<source>:<destination>`"
          ]
        }
      }
    ]
  },
  "push-many-features-name": "push master！",
  "push-many-features-hint": "你隨時都可以使用 undo 或 reset 指令。",
  "push-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## merge feature branch",
            "",
            "現在你已經很熟悉 fetch、pull 以及 push，讓我們來針對一個新的問題來應用這些技巧。",
            "",
            "在一個大型的專案裡面，程式設計師經常會在 feature branch（有別於 master branch）上面做開發，之後等開發完之後，在一次 merge 回去。這跟之前的課程是很類似的（其它的 branch 被 push 到 remote），但是現在我們還要再多介紹一個步驟。",
            "",
            "某些程式設計師只針對 `master` branch 進行 push 或者是 pull。這樣子的話 `master` 一直都保持跟 remote （`o/master`） 同步。",
            "",
            "所以針對這個問題我們結合了兩件事情：",
            "",
            "* merge feature branch 到`master` branch，並且",
            "* push remote 以及 pull remote"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們馬上來實際看一下如何更新 `master` 並且 push 到 remote。"
          ],
          "afterMarkdowns": [
            "我們在這裡執行兩個指令:",
            "",
            "* rebase 我們的 branch 到 remote 的新的 commit 上面，並且",
            "* 發佈到 remote 上面"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "這個關卡很複雜，這裡有一些提示：",
            "",
            "* 總共有三個 feature branch，分別是 `side1`，`side2` 以及 `side3`",
            "* 我們想要將這三個 branch 分別 push 到 remote。",
            "* 但是 remote 已經被事先更新過了，所以我們必須要先同步那些更新。",
            "",
            ":O 很好！祝你好運，完成這個關卡是一個很重要的步驟。"
          ]
        }
      }
    ]
  },
  "remote-branches-name": "remote branch （遠端分支）",
  "remote-branches-hint": "注意順序的問題喔！先在 master branch 上面送 commit",
  "remote-branches-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git remote branch",
            "",
            "現在你已經知道 `git clone` 在幹嘛了，讓我們仔細看看到底發生了什麼事。",
            "",
            "你首先看到的是在你的本地端（local repository）出現了一個新的 branch 叫作 `o/master`，這種型態的 branch 叫作 remote branch （遠端分支），因為特殊的需求，因此 remote branch 有特殊的性質。",
            "",
            "remote branch 反應了 remote repository 的狀態（因為你最後接觸的是這些 remote repository），最重要的是，在你想要分享你的 commit 給其他人時，你必須知道你現在的 commit 跟 remote repository 有哪些不同，而 remote branch 的狀態就是在告訴你這些資訊。",
            "",
            "remote branch 有特別的特性，當你移動到 remote branch 時，你就進入到分離 `HEAD` 的狀態，git 這樣做的原因是告訴你不能夠直接影響這些 branch。你必須要在其它的 branch 工作，並且分享到 remote （分享之後，你的 remote branch 就會被更新）。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 什麼是 `o/`?",
            "",
            "你也許會對於 remote branch 前面的 `o/` 感到困惑，喔！remote branch 也（需要） 一個命名法則，或者是一般表示 remote branch 的格式。",
            "",
            "* `<remote 名稱>/<branch 名稱>`",
            "",
            "因此，當你看到一個 branch 叫做 `o/master`，就表示這個 branch 叫做 master，而且這個 remote 的名稱叫作 `o`。",
            "",
            "很多程式設計師實際上會把他們的 remote 命名為 `origin`，而不是 `o`，這在 git 是很常見的事情，因為當你使用 `git clone` 時，git 會自動把你的 remote 命名為 `origin`。",
            "",
            "但是很不幸的是 `origin` 並沒有辦法完全顯示在我們的 UI 上面，所以我們用 `o` 來簡化它（只要記住當你使用 git 的時候，實際上是命名為 `origin`）。",
            "",
            "有很多事情需要說明，現在讓我們來看看吧！"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "讓我們移動到（checkout）一個 remote branch 並且看一下會發生什麼事情"
          ],
          "afterMarkdowns": [
            "就像你看到的， git 讓我們進到 detached `HEAD` 狀態，同時，當我們加入一個新的 commit 時，`o/master` 都沒有更新，這是因為只有當 remote 更新的時候，`o/master` 才會更新。"
          ],
          "command": "git checkout o/master; git commit",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "要完成這一關，先在 master branch 上面做一次 commit，再移動到 `o/master` 上做一次 commit，這有助於我們了解到 remote branch 的不同，它們只會反應 remote 的狀態。"
          ]
        }
      }
    ]
  },
  "source-nothing-name": "沒有 source",
  "source-nothing-hint": "在本關卡中，不允許使用 branch 指令，因此你只能使用 fetch！",
  "source-nothing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "###`<source>` 奇怪的地方",
            "",
            "在兩個奇怪的情況下，git 不使用 `<source>` 參數，事實上，在`git push`以及`git fetch`的情況下，可以允許你\"不用\"指定` source`，你可以藉由把參數留空，來表示你不想指定 source：",
            "",
            "* `git push origin :side`",
            "* `git fetch origin :bugFix`",
            "",
            "讓我們來看看這些在做什麼..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "當*沒有*指定 source 的時候，`push` 對於 remote branch 做了什麼？`push`把它刪除掉了！"
          ],
          "afterMarkdowns": [
            "看吧，我們藉由把 source \"留空\"，成功用 `push` 刪除了 `foo` branch，這合理吧..."
          ],
          "command": "git push origin :foo",
          "beforeCommand": "git clone; git push origin master:foo"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "最後，對於 `fetch` 來說，source \"留空\" 表示我們要在 local 上建立一個新的 branch。"
          ],
          "afterMarkdowns": [
            "很奇怪吧！但那正是 git 為你做的事情！"
          ],
          "command": "git fetch origin :bar",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "這是一個很簡單的關卡，只需要利用 `git push` 刪除一個 remote 的 branch，並且利用 `git fetch` 建立一個新的 local 的 branch！"
          ]
        }
      }
    ]
  },
  "tracking-name": "remote tracking",
  "tracking-hint": "記住喔，有兩個方式可以去設定 remote tracking",
  "tracking-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### remote tracking branch",
            "",
            "在之前的課程中，有一件事情看起來很\"神奇\"，那就是 git 知道 `master` branch 是對應到 `o/master` branch。當然這些 branch 有類似的名稱，所以可以大概猜到， local 的 `master` branch 可以對應到 remote 的 `master branch`，但是我們是在兩種情況下可以確定有這個對應關係：",
            "",
            "* 在使用 `pull` 的時候，下載 commit 到 `o/master`，並且 `merge` 這些 commit 到 `master` branch，這就表示這個 merge 的目標是決定於這個對應關係。",
            "* 在使用 `push` 的時候，在 `master` branch 上面的 commit 被 push 到 remote 上面的 `master` branch （它在 local 被表示成 `o/master`），這就表示 push 的目標是決定於 `master` 以及 `o/master` 之間的對應關係。",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Remote tracking",
            "",
            "長話短說，我們可以用 branch 上面的 \"remote tracking\" 特性來表示介於 `master` 以及 `o/master` 的對應關係，`master` branch 被設定用來追蹤（track） `o/master`，這就表示對於 `master` branch 來說的話，有一個 merge 的目標以及 push 的目標。",
            "",
            "你可能會覺得很奇怪，當你沒有下任何指令去設定的時候，關於 `master` branch 的對應關係是如何被設定的。喔！其實當你 clone 一個 repo 的時候，其實就已經自動幫你做設定了。 ",
            "",
            "在做 clone 的時候，git 會針對每一個在 remote 上面的 branch 建立一個 branch （例如 `o/master`），之後它會建立一個 local branch 來追蹤目前在 remote 上面的 active branch，在大部份的情況下，幾乎都是設定 `master` branch。",
            "",
            "一旦 git 完成這個動作，你就只會有一個 local branch ，但是你可以看到所有在 remote 上面的不同的 branch，對於 local 和 remote 來說的話，這樣子是最好的！",
            "",
            "這也解釋了為什麼當你 clone 的時候可能會看到以下被輸出的指令：",
            "",
            "    local branch \"master\" set to track remote branch \"o/master\""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 我可以自己設定嗎？",
            "",
            "是的你可以！你可以設定任何的 branch 來 track `o/master`， 假如你真的這麼做的話，那麼該 branch 的 push 及 merge 的目標就會跟 `master` 一樣。這就表示說你可以在 `totallyNotMaster` branch 上面執行 `git push`，並且 push 你的 commit 到 remote 的 `master` branch！",
            "",
            "有兩個方式可以設定，第一個就是藉由參考一個 remote branch 來 checkout 一個新的 branch。執行",
            "",
            "`git checkout -b totallyNotMaster o/master`",
            "",
            "建立一個新的 `totallyNotMaster` branch 並且它會 track `o/master`。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "說的好多，我們現在來看一個例子！我們會 checkout 一個新的 `foo` branch，而且該 branch 會被用來 track remote 上的 `master` branch。"
          ],
          "afterMarkdowns": [
            "就像你看到的，當 `o/master` 更新的時候，`foo` branch 也跟著一起被更新，要注意 master 並沒有被更新！"
          ],
          "command": "git checkout -b foo o/master; git pull",
          "beforeCommand": "git clone; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "同樣適用於 `git push`"
          ],
          "afterMarkdowns": [
            "哇，即使我們的 branch 名稱完全一點關係都沒有，但我們還是 push 了 commit 到 remote 的 `master` branch 上面。"
          ],
          "command": "git checkout -b foo o/master; git commit; git push",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 方法 #2",
            "",
            "另外一個設定 remote tracking 的方法是使用 `git branch -u` 這一個指令，執行",
            "",
            "`git branch -u o/master foo`",
            "",
            "你就會看到 `foo` branch 被設定成 track `o/master`，如果你現在已經 checkout 到 foo 這個 branch 上面了，你就可以省略掉它：",
            "",
            "`git branch -u o/master`",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "我們來看這個快速設定 remote tracking 的方法..."
          ],
          "afterMarkdowns": [
            "跟之前一樣，就只是一個更加明確的指令，讚啦！"
          ],
          "command": "git branch -u o/master foo; git commit; git push",
          "beforeCommand": "git clone; git checkout -b foo"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "好！在這個關卡中，我們要 push 我們的 commit 到 remote 上面的 `master` branch，但是我們*不* checkout 到 local 的 `master` branch。因為這是一個進階的課程，所以我會讓你明白其它的東西。:P"
          ]
        }
      }
    ]
  },
  "sequence-intro-display": "基礎篇",
  "sequence-intro-about": "循序漸進地介紹 git 主要命令",
  "sequence-rampup-display": "進階篇",
  "sequence-rampup-about": "接下來是 git 非常厲害的地方！相信你已經迫不及待了吧！",
  "sequence-remote-display": "Push & Pull -- Git Remotes!",
  "sequence-remote-about": "是時候分享你的程式碼了",
  "sequence-remote-advanced-display": "關於 origin 和其它 repo，git remote 的進階指令",
  "sequence-remote-advanced-about": "而且你會覺得做一個仁慈的獨裁者會很有趣...",
  "sequence-move-display": "調整提交順序",
  "sequence-move-about": "自由修改提交樹",
  "sequence-mixed-display": "活用 git 的指令",
  "sequence-mixed-about": "git 的技術，招數與技巧",
  "sequence-advanced-display": "進階主題",
  "sequence-advanced-about": "來成為真正的強者吧！",
  "dialogs-confirm": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 確定偷看解答嗎？",
          "",
          "我相信你！你可以的"
        ]
      }
    }
  ],
  "dialogs-level-builder": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 歡迎使用關卡編輯器！",
          "",
          "主要步驟如下：",
          "",
          "  * 使用 git 指令建立初始環境",
          "  * 使用 ```define start``` 指令定義起始樹",
          "  * 輸入一系列 git 命令，編好答案",
          "  * 使用 ```define goal``` 指令定義目標樹。定義目標的同時定義答案",
          "  * 還可以用 ```define hint``` 指令定義一個提示",
          "  * 用 ```define name``` 修改名稱",
          "  * 還可以用 ```edit dialog``` 定義一個漂亮的開始對話視窗",
          "  * 輸入 ```finish``` 即可將您的關卡輸出為 JSON！"
        ]
      }
    }
  ],
  "dialogs-next-level": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 太棒了！",
          "",
          "您用了 *{numCommands}* 個指令完成這一關，",
          "我們的解答用了 {best} 個。"
        ]
      }
    }
  ],
  "dialogs-sandbox": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 歡迎光臨 Learn Git Branching!",
          "",
          "本應用旨在幫助初學者領會 git 分支背後的強大概念。",
          "希望你能喜歡這個應用，並學到知識！",
          "",
          "# 演示！",
          "",
          "如果你還沒看過演示，請到此查看：",
          "",
          "[https://pcottle.github.io/learnGitBranching/?demo](https://pcottle.github.io/learnGitBranching/?demo)",
          "",
          "厭煩這個對話視窗嗎？在 URL 後頭加上 `?NODEMO` 就看不到它了，也可以直接點下邊這個連結：",
          "",
          "[https://pcottle.github.io/learnGitBranching/?NODEMO](https://pcottle.github.io/learnGitBranching/?NODEMO)"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Git 命令",
          "",
          "在沙盒模式中，你有很多指令可用。包括：",
          "",
          " * commit",
          " * branch",
          " * checkout",
          " * cherry-pick",
          " * reset",
          " * revert",
          " * rebase",
          " * merge"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 分享即關懷",
          "",
          "使用 `export tree` 和 `import tree` 與朋友分享 Git 樹",
          "",
          "有個好課程可以分享？試試用 `build level` 創建一個關卡，或者 `import level` 試試朋友的。",
          "",
          "言歸正傳，讓我們先從 `levels` 開始……"
        ]
      }
    }
  ],
  "finish-dialog-finished": "我的天啊！您解開了最後一關，太強了！",
  "finish-dialog-next": "下一關是*「{nextLevel}」*，您要繼續闖關嗎？",
  "finish-dialog-win": "太強了，您的答案符合我們的預期甚至更好！",
  "finish-dialog-lose": "試試看您是否能在 {best} 步内搞定 :D",
  "hg-prune-tree": "注意！ Mercurial 會積極地做垃圾收集，而且會因此把你的 tree 給縮小。",
  "hg-a-option": "對於這個 app 來說，-A 選項並不是必須的，只需要 commit 就好！",
  "hg-error-no-status": "本 App 没有 status 命令哦，因为根本没有 stage 缓存文件。可以用 hg summary 代替哦",
  "hg-error-need-option": "我需要該命令使用 {option} 選項呢。",
  "hg-error-log-no-follow": "暫不支持沒有-f 選項的 hg log 命令，請補充 -f 選項吧",
  "git-status-detached": "分離 Head！",
  "git-status-onbranch": "切換到 branch {branch}",
  "git-status-readytocommit": "準備 commit！（在這個 demo 裡面可以一直 commit）",
  "git-dummy-msg": "快速 commit。上啊熊！",
  "git-error-origin-fetch-uptodate": "已經是最新的了",
  "git-error-origin-fetch-no-ff": "你的 origin 分支已經失去了與 remote 遠端分支的同步，所以無法執行 fetch 命令",
  "git-error-origin-push-no-ff": "遠端倉庫與你的本地倉庫產生了分歧，故此上傳操作無法通過簡單地快進實現（因此你的 push 被拒絕了）。請 pull 下來遠端裡最新的更改，與本地合併之後再試一次。你可以通過 git pull 或 git pull --rebase 實現。",
  "git-error-remote-branch": "你不能在遠端分支上執行這個命令呀。",
  "git-error-origin-required": "該命令需要一個 origin",
  "git-error-origin-exists": "origin 遠端已存在。你不能重複創建",
  "git-error-branch": "你不能刪除 master branch，或者你當前所在的 branch，或者其它連 branch 都不是的東西。",
  "git-merge-msg": "將 {target} 併入 {current}",
  "git-error-rebase-none": "沒有需要 rebase 的 commit！每個都是一個 merge commit 或者修改已經被寫入了",
  "git-result-nothing": "沒什麼事情要做...",
  "git-result-fastforward": "快速前進...",
  "git-result-uptodate": "branch 已經是最新啦",
  "git-error-exist": "索引 {ref} 不存在，或者找不到。",
  "git-error-relative-ref": "commit {commit} 並沒有 {match}",
  "git-warning-detached": "注意喔！現在的狀態是分離 Head",
  "git-warning-add": "此 demo 中不需要再加入檔案",
  "git-error-options": "您指定了不相容或錯誤的選項",
  "git-error-already-exists": "commit {commit} 已經在你的修改的集合裡，正在停止！",
  "git-error-reset-detached": "不能在分離 HEAD 的狀態中重來！用 checkout 來移動吧",
  "git-warning-hard": "預設的行為是 --hard reset，儘量省略掉那個選項吧！",
  "git-error-staging": "沒有加入、或者暫存 (staging) 文件的必要，所以改選項或者命令是不合法的。",
  "git-revert-msg": "還原 {oldCommit}：{oldMsg}",
  "git-error-args-many": "{what} 期望最多 {upper} 個參數",
  "git-error-args-few": "{what} 期望最少 {lower} 個參數",
  "git-error-no-general-args": "該指令不接受一般參數",
  "copy-tree-string": "複製下方的樹狀字串",
  "learn-git-branching": "學習 git 分支",
  "select-a-level": "選擇其中一關",
  "main-levels-tab": "主要",
  "remote-levels-tab": "遠端",
  "branch-name-short": "抱歉，為了顯示的需要，我們需要一個短一點的 branch 名稱。您使用的將會被截斷到剩下9個字元，即\"{branch}\"",
  "bad-branch-name": "不能给 branch 起這個名字 \"{branch}\"",
  "bad-tag-name": "該標籤名 “{tag}” 不被接受。",
  "option-not-supported": "不支援的選項 \"{option}\"",
  "git-usage-command": "git <指令> [<參數>]",
  "git-supported-commands": "支援的指令有：",
  "git-usage": "用法：",
  "git-version": "Git 版本 PCOTTLE.1.0",
  "flip-tree-command": "翻轉樹中...",
  "refresh-tree-command": "正在更新樹狀結構...",
  "locale-command": "語系設為 {locale}",
  "locale-reset-command": "還原為預設語系 {locale}",
  "show-command": "請使用下列其中一個指令取得更多資訊：",
  "show-all-commands": "這份清單列出所有可用指令：",
  "cd-command": "目錄切換到 \"/directories/dont/matter/in/this/demo\"",
  "ls-command": "DontWorryAboutFilesInThisDemo.txt （譯註：在 demo 裡不用擔心檔案）",
  "mobile-alert": "無法在行動裝置上叫出鍵盤，請改用桌面版！",
  "share-tree": "與你的好友分享這棵樹！他們可以用 \"import tree\" 來載入它",
  "paste-json": "在下方貼上一串 JSON",
  "solved-map-reset": "過關地圖已經重新設置，您現在從零開始了",
  "level-cant-exit": "您沒在關卡中！您在沙盒中，要開始關卡請輸入 \"levels\"",
  "level-no-id": "找不到 id 為 \"{id}\" 的關卡！開啟關卡選擇視窗",
  "undo-stack-empty": "還沒有什麼可以取消",
  "already-solved": "你已經解决了本關，輸入 \"levels\" 嘗試其他關卡，或者輸入 \"sandbox\" 回到沙盒中",
  "solved-level": "恭喜，本關解決了！！",
  "command-disabled": "本關禁止使用該 git 指令！",
  "share-json": "這是本關的 JSON！您可以分享給別人，或是送到 Github 上給我",
  "want-start-dialog": "尚未指定開始對話視窗，是否立即新增？",
  "want-hint": "尚未指定提示，是否立即新增？",
  "prompt-hint": "請輸入關卡提示，或者故意留空",
  "prompt-name": "請輸入關卡名稱",
  "solution-empty": "您的解法是空的！這一定是哪裡出錯了",
  "define-start-warning": "正在定義起始點...先前定義的解法和目標會被覆蓋掉",
  "help-vague-level": "您正在進行關卡中，這裡有多種不同型式的幫助，請選擇 \"help level\" 來了解這個關卡，或者是選擇 \"help general\" 來學習如何使用 Learn GitBranching，或者是選擇 \"objective\" 來學習如何解決這個關卡",
  "help-vague-builder": "您正在進行關卡構建中，這裡有多種不同型式的幫助，請選擇 \"help general\" （一般幫助）或 \"help builder\" （製造關卡的幫助）",
  "show-goal-button": "顯示目標",
  "hide-goal-button": "隱藏目標",
  "objective-button": "提示",
  "git-demonstration-title": "Git示範",
  "goal-to-reach": "目標",
  "goal-only-master": "在這個關卡中，只有 master branch 會被檢查，別的 branch 只是用來做為 reference （下面用虛線符號表示）。一如往常，你可以利用 \"hide goal\" 來隱藏這個對話視窗",
  "hide-goal": "你可以透過 \"hide goal\" 關閉這個視窗",
  "hide-start": "你可以透過 \"hide start\" 關閉這個視窗",
  "level-builder": "關卡產生器",
  "no-start-dialog": "這關沒有介紹!",
  "no-hint": "嗯‧‧‧這關沒有提示 :-/",
  "error-untranslated-key": "還沒翻譯 {key} :( 請在 Github 上貢獻您的翻譯!",
  "error-untranslated": "這段對話尚未翻成您的語言 :( 歡迎到 Github 貢獻翻譯！"
};
