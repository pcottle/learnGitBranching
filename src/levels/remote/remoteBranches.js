exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"C4\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git commit;git checkout o/master;git commit",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Remote Branches",
    "zh_CN": "Remote Branches",
    "de_DE": "Branches auf entfernten Servern"
  },
  "hint": {
    "en_US": "Pay attention to the ordering -- commit on master first!",
    "zh_CN": "Pay attention to the ordering -- commit on master first!",
    "de_DE": "Beachte die Sortierung -- committe zuerst auf dem master!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Remote Branches",
              "",
              "Now that you've seen `git clone` in action, let's dive into what actually changed.",
              "",
              "The first thing you may have noticed is that a new branch appeared in our local repository called `o/master`. This type of branch is called a _remote_ branch; remote branches have special properties because they serve a unique purpose.",
              "",
              "Remote branches reflect the _state_ of remote repositories (since you last talked to those remote repositories). They help you understand the difference between your local work and what work is public -- a critical step to take before sharing your work with others.",
              "",
              "Remote branches have the special property that when you check them out, you are put into detached `HEAD` mode. Git does this on purpose because you can't work on these branches directly; you have to work elsewhere and then share your work with the remote (after which your remote branches will be updated)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### What is `o/`?",
              "",
              "You maybe wondering what the leading `o/` is for on these remote branches. Well, remote branches also have a (required) naming convention -- they are displayed in the format of:",
              "",
              "* `<remote name>/<branch name>`",
              "",
              "Hence, if you look at a branch named `o/master`, the branch name is `master` and the name of the remote is `o`.",
              "",
              "Most developers actually name their main remote `origin`, not `o`. This is so common that git actually sets up your remote to be named `origin` when you `git clone` a repository.",
              "",
              "Unfortunately the full name of `origin` does not fit in our UI, so we use `o` as shorthand :( Just remember when you're using real git, your remote is probably going to be named `origin`!",
              "",
              "That's a lot to take in, so let's see all this in action."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lets check out a remote branch and see what happens"
            ],
            "afterMarkdowns": [
              "As you can see, git put us into detached `HEAD` mode and then did not update `o/master` when we added a new commit. This is because `o/master` will only update when the remote updates."
            ],
            "command": "git checkout o/master; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, commit once off of `master` and once after checking out `o/master`. This will help drive home how remote branches behave differently, and they only update to reflect the state of the remote."
            ]
          }
        }
      ]
    },
    "de_DE": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Branches auf entfernten Servern",
              "",
              "Nun da du `git clone` in Aktion gesehen hast, lass uns tiefer in die Materie eintauchen.",
              "",
              "Das erste, was dir wahrscheinlich aufgefallen ist, ist dass ein neuer Branch in unserem lokalen Repository aufgetaucht ist, namens `o/master`. Diese Art von Branch nennt sich _Remote_ Branch; er hat besondere Eigenschaften, weil er einem bestimmten Zweck dient.",
              "",
              "Ein Remote Branch bildet den Zustand des entsprechenden Branch in einem entfernten Repository ab (dem Zustand in dem der Branch war, als du das letzte mal das entfernte Repository angesprochen hast). Er hilft dir, den Unterschied zwischen deinem lokalen Branch und dem Gegenstück auf dem Server zu sehen -- eine nötige Information, bevor du deine Arbeit mit anderen teilen kannst.",
              "",
              "Remote Branches besitzen die besondere Eigenschaft dein Repository in den \"Detached `HEAD`\" Zustand zu versetzen, wenn du sie auscheckst. Git macht das absichtlich so, denn du kannst nicht direkt auf Remote Branches arbeiten; du musst auf Kopien von ihnen arbeiten und deine Änderungen von dort auf den entfernten Server schieben (wonach der Remote Branch dann auch bei dir aktualisiert wird)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Was heißt `o/`?",
              "",
              "Du fragst dich vielleicht was das `o/` am Anfang des Namens des Remote Branch bedeuten soll. Nun, Namen von Remote Branches folgen einer (zwingenden) Konvention -- sie werden mit diesem Format gebildet:",
              "",
              "* `<Name des Remote>/<Name des Branches>`",
              "",
              "Wenn du also einen Remote Branch namens `o/master` hast, ist es eine Abbildung des Branches `master` auf dem Server, der in deinem Repository als `origin` bekannt ist.",
              "",
              "Die meisten Entwickler nennen das Haupt-Remote tatsächlich `origin` und nicht `o`. Das ist so verbreitet, dass Git den entfernten Server von dem man ein `git clone` macht tatsächlich als `origin` im Clone speichert.",
              "",
              "Leider passt der ganze Name, `origin`, nicht in unsere Darstellung, deshalb benutzen wir hier kurz `o`. :( Merk dir einfach: wenn du echtes Git benutzt werden die Remotes meistens `origin` heißen!",
              "",
              "So, das war eine Menge zu verdauen, schauen wir uns das in Aktion an."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Checken wir mal einen Remote Branch aus und schauen was passiert"
            ],
            "afterMarkdowns": [
              "Wie du siehst setzt uns Git in den \"Detached `HEAD`\" Modus und aktualisiert dann nach dem Commit nicht den Branch `o/master`. Das liegt daran, dass der Remote Branch nur aktualisiert wird, wenn sich der entsprechende Branch auf dem Remote verändert."
            ],
            "command": "git checkout o/master; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level zu bewältigen musst du einen Commit in `master` machen und einen nachdem du `o/master` ausgecheckt hast. Das illustriert noch einmal wie sich Branches und Remote Branches unterschiedlich verhalten und dass letztere sich nur verändern, wenn sich ihr Zustand auf dem entfernten Server ändert."
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
              "## Git 远端分支",
              "",
              "现在你看过`git clone`的执行了, 让我们深入下去看看发生了什么?",
              "",
              "第一件事, 你应该注意到在我们的本地仓库出现了一个新的分支`o/master` , 这种类型的分支叫 _remote_ branch (就叫远端分支好了), 远端分支拥有一些用于特别目的的特殊属性.",
              "",
              "远程分支反映了无端仓库的状态(你上次和远端仓库通信的时刻). 这会帮助你理解本地工作与公共工作的不同 -- 这是你与别人分享工作前很重要的一步.",
              "",
              "检出远端分支时, 有一个特别的属性 -- 你会被置于一个分离式的`HEAD`. 因为你不能在这些分支上直接操作, 你必须在别的地方完成你的工作, 再与远端分享你的工作. "
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### What is `o/`?",
              "",
              "你可能想知道这些远端分支的头`o/` 意味着什么. 好吧, 远端分支有一个全名规范 -- 它们以这样的格式显示: ",
              "",
              "* `<remote name>/<branch name>`",
              "",
              "提示, 如果你看到一个分支命名为`o/master`, 那分支名就是`master`, 远端的名就是 `o`. ",
              "",
              "大多数的开发者会将它们的远端命名为`origin`, 而非`o`. 这是如此的普遍, 以致于当你用`git clone` 时,得到的仓库名就是 `origin`",
              "",
              "不幸的是, 我们的UI不适用`origin`, 我们使用缩写`o`, :) 记住, 当你使用真正的git时, 你的远程仓库很可能被命名为`origin`! ",
              "",
              "说了这么多, 让我们看看实例."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果检出remote分支, 会发生什么呢?"
            ],
            "afterMarkdowns": [
              "正如你所见, git 处于了分离`HEAD`, 当添加新的提交时, `o/master`不被更新, 这是因为`o/master` 仅伴随远端更新而更新."
            ],
            "command": "git checkout o/master; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "尝试完成本节, 在`master`上做一个提交, 再检出`o/master`后再做一提交. 这展示了远端分支行为上的不同, 他们的更新只是反映了远端的状态."
            ]
          }
        }
      ]
    }
  }
};

