exports.level = {
  "name": {
    "en_US": "Introduction to Git Commits",
    "fr_FR": "Introduction aux commits avec Git",
    'ko': 'Git 커밋 소개'
  },
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git commit;git commit",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "Just type in 'git commit' twice to finish!",
    "fr_FR": "Il suffit de saisir 'git commit' deux fois pour réussir !",
    "zh_CN": "敲两次 'git commit' 就好啦！",
    "ko": "'git commit'이라고 두 번 치세요!"
  },
  "disabledMap": {
    "git revert": true
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Commits",
              "A commit in a git repository records a snapshot of all the files in your directory. It's like a giant copy and paste, but even better!",
              "",
              "Git wants to keep commits as lightweight as possible though, so it doesn't just copy the entire directory every time you commit. It actually stores each commit as a set of changes, or a \"delta\", from one version of the repository to the next. That's why most commits have a parent commit above them -- you'll see this later in our visualizations.",
              "",
              "In order to clone a repository, you have to unpack or \"resolve\" all these deltas. That's why you might see the command line output:",
              "",
              "`resolving deltas`",
              "",
              "when cloning a repo.",
              "",
              "It's a lot to take in, but for now you can think of commits as snapshots of the project. Commits are very light and switching between them is wicked fast!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see what this looks like in practice. On the right we have a visualization of a (small) git repository. There are two commits right now -- the first initial commit, `C0`, and one commit after that `C1` that might have some meaningful changes.",
              "",
              "Hit the button below to make a new commit"
            ],
            "afterMarkdowns": [
              "There we go! Awesome. We just made changes to the repository and saved them as a commit. The commit we just made has a parent, `C1`, which references which commit it was based off of."
            ],
            "command": "git commit",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Go ahead and try it out on your own! After this window closes, make two commits to complete the level"
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
              "## Commits Git",
              "Un commit dans un dépôt (repository) git enregistre une image (snapshot) de tous les fichiers du repertoire. Comme un Copier-Coller g'eant, mais en bien mieux !",
              "",
              "Git fait en sorte que les commits soient aussi légers que possible donc il ne recopie pas tous le répertoire à chaque commit. En fait, git n'enregistre que l'ensemble des changments (\"delta\") depuis la version précédante du dépôt. C'est pour cette raison que la plupart des commits ont un commit parent -- ainsi que nous le verrons plus tard.",
              "",
              "Pour cloner un dépôt, il faut décompresser (\"résoudre\") tous ces deltas. C'est la raison pour laquelle la commande écrit :",
              "",
              "`resolving deltas`",
              "",
              "lorsque l'on clone un dépôt.",
              "",
              "C'est beaucoup à absorber, mais pour l'instant vous pouvez considérer les commits comme des snapshots du projet. Les commits sont tr légers et passer de l'un à l'autre est très rapide !"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons à quoi cela ressemble en pratique. Sur la droite, on peut visualiser un (petit) dépôt git. Il y a pour l'instant deux commits -- le premier commit initial, `C0`, et un commit suivant `C1` qui aurait des changements significatifs.",
              "",
              "Appuyez sur le bouton ci-dessous pour faire un nouveau commit"
            ],
            "afterMarkdowns": [
              "C'est parti ! Super. Nous venons de faire des modifications sur le dépôt et de saugevarder celles-ci dans un commit. Ce commit que nous venons de faire a un parent, `C1`, qui référence le commit sur lequel il est basé."
            ],
            "command": "git commit",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Allez-y et essayez par vous-même ! Après la fermeture de cettefenêtre, faites deux commits pour terminer ce niveau."
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
              "## Git 커밋",
              "커밋은 Git 저장소에 여러분의 디렉토리에 있는 모든 파일에 대한 스냅샷을 기록하는 것입니다. 디렉토리 전체에 대한 복사해 붙이기와 비슷하지만 훨씬 유용합니다!",
              "",
              "Git은 커밋을 가능한한 가볍게 유지하고자 해서, 커밋할 때마다 디렉토리 전체를 복사하는 일은 하지 않습니다. 각 커밋은 저장소의 이전 버전과 다음 버전의 변경내역(\"delta\"라고도 함)을 저장합니다. 그래서 대부분의 커밋이 그 커밋 위에 부모 커밋을 가리키고 있게 되는 것입니다. -- 곧 그림으로 된 화면에서 살펴보게 될 것입니다.",
              "",
              "저장소를 복제(clone)하려면, 그 모든 변경분(delta)를 풀어내야하는데, 그 때문에 명령행 결과로 아래와 같이 보게됩니다. ",
              "",
              "`resolving deltas`",
              "",
              "알아야할 것이 꽤 많습니다만, 일단은 커밋을 프로젝트의 각각의 스냅샷들로 생각하시는 걸로 충분합니다. 커밋은 매우 가볍고 커밋 사이의 전환도 매우 빠르다는 것을 기억해주세요!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "연습할 때 어떻게 보이는지 확인해보죠. 오른쪽 화면에 git 저장소를 그림으로 표현해 놓았습니다. 현재 두번 커밋한 상태입니다 -- 첫번째 커밋으로 `C0`, 그 다음으로 `C1`이라는 어떤 의미있는 변화가 있는 커밋이 있습니다.",
              "",
              "아래 버튼을 눌러 새로운 커밋을 만들어보세요"
            ],
            "afterMarkdowns": [
              "이렇게 보입니다! 멋지죠. 우리는 방금 저장소 내용을 변경해서 한번의 커밋으로 저장했습니다. 방금 만든 커밋은 부모는 `C1`이고, 어떤 커밋을 기반으로 변경된 것인지를 가리킵니다."
            ],
            "command": "git commit",
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "계속해서 직접 한번 해보세요! 이 창을 닫고, 커밋을 두 번 하면 다음 레벨로 넘어갑니다"
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
              "## Git Commits",
              "在一个使用 git 进行版本控制的仓库里，一次提交（commit）给你目录下所有文件做了一次快照，就好像是做了一次复制粘贴，但 git 做的不只那么简单！",
              "",
              "Git 希望尽可能地让这些提交记录保持轻量，所以每次在你进行提交的时候，它不会就这么复制整个工作目录。实际上它把每次提交都记录为一个相对于上个版本变化的集合，或者说一个\"差异 （delta）\"集。这也是为什么绝大部分提交都有一个父对象（parent commit） -- 迟点你就会在我们的演示中看见了。",
              "",
              "假如你要克隆（clone）一个仓库，你就要去解包（unpack）或者“解决（resolve）”这些差异。所以当你克隆一个仓库时会在命令行下看见这样的命令：",
              "",
              "`resolving deltas`",
              "",
              "要完全理解这些概念可能要花费很多时间，但现在你可以把提交看作是项目的快照，提交非常轻量而且在它们之间切换的时候非常快。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "让我们在练习里好好了解提交是什么玩意。在右边展示的是一个使用 git 管理的（小）仓库。现在有两个提交 —— 一个是初始提交 `C0`，另外一个可能包含了一些有意义修改的提交是`C1`。",
              "",
              "点下面的按钮来生成一个新的提交。"
            ],
            "command": "git commit",
            "afterMarkdowns": [
              "看！碉堡吧！我们刚刚对这个仓库进行了一点修改，并且把这些修改提交了。我们刚刚做的提交有一个爸爸（parent），叫 `C1`，代表这个修改是基于`C1`的。"
            ],
            "beforeCommand": ""
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "接下来你可以继续尝试下。在这个窗口关闭之后，提交两遍就可以过关！"
            ]
          }
        }
      ]
    }
  }
};
