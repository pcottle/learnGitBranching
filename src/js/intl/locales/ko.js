module.exports = {
  "multiple-parents-name": "다수의 부모",
  "multiple-parents-hint": "`git branch bugWork`를 대상 커밋과 함께 사용해서 부족한 참조를 만드세요",
  "multiple-parents-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 부모를 선택하기",
            "",
            "`~` 수식처럼 `^` 수식 또한 뒤에 숫자를 추가 할 수 있습니다.",
            "",
            "몇개의 세대를 돌아갈지 정하는 것 대신(`~`의 기능) `^`수식은 병합이된 커밋에서 어떤 부모를 참조할지 선택할 수 있습니다. 병합된 커밋들은 다수의 부모를 가지고 있다는것을 기억하시나요? 어떤 부모를 선택할지 예측할 수가 없습니다.",
            "",
            "Git은 보통 병합된 커밋에서 \"첫\"부모를 따라갑니다. 하지만 `^`수식을 를 숫자와 함께 사용하면 앞의 디폴트 동작대로가 아닌 다른 결과가 나타납니다.",
            "",
            "이만 줄이고, 직접 확인해봅시다.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "여기 병합된 커밋이 있습니다. 우리가 `master`를 수식없이 체크아웃한다면 병합된 커밋의 첫 부모를 따라 올라갈 것입니다. ",
            "",
            "(*화면에서는 첫 부모는 병합된 커밋 바로 위에 위치해 있습니다.*)"
          ],
          "afterMarkdowns": [
            "간단하죠 -- 우리한테 익숙한 모습입니다."
          ],
          "command": "git checkout master^",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "자 이제 두번째 부모를 선택해봅시다..."
          ],
          "afterMarkdowns": [
            "보이나요? 다른 부모를 선택해 올라갔습니다."
          ],
          "command": "git checkout master^2",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`^`수식과 `~`수식을 이용해 커밋트리에서 효과적으로 움직일 수 있습니다.:"
          ],
          "afterMarkdowns": [
            "빛처럼 빠르게 말이죠!"
          ],
          "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "더 대단한것은 이 수식들은 같이 사용할 수 있다는 겁니다! 확인해봅시다:"
          ],
          "afterMarkdowns": [
            "앞과 같은 움직임이지만 하나의 명령으로 표현되었습니다."
          ],
          "command": "git checkout HEAD~^2~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 직접 확인해봅시다",
            "",
            "이 레벨을 완료하기 위해서 정해진 목적지에 새 브랜치를 생성하세요.",
            "",
            "물론 커밋을 직접 특정지어주면 아주 쉽겠지만(`C6`과 같이), 수식을 익혀볼겸 배운것을 사용해 도전해 봅시다!"
          ]
        }
      }
    ]
  },
  "branching-name": "Git에서 브랜치 쓰기",
  "branching-hint": "\"git branch [브랜치명]\"으로 새 브랜치를 만들고, \"git checkout [브랜치명]\"로 그 브랜치로 이동하세요",
  "branching-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git 브랜치",
            "",
            "깃의 브랜치도 놀랍도록 가볍습니다. 브랜치는 특정 커밋에 대한 참조(reference)에 지나지 않습니다. 이런 사실 때문에 수많은 Git 애찬론자들이 자주 이렇게 말하곤 합니다:",
            "",
            "```",
            "브랜치를 서둘러서, 그리고 자주 만드세요",
            "```",
            "",
            "브랜치를 많이 만들어도 메모리나 디스크 공간에 부담이 되지 않기 때문에, 여러분의 작업을 커다른 브랜치로 만들기 보다, 작은 단위로 잘게 나누는 것이 좋습니다.",
            "",
            "브랜치와 커밋을 같이 쓸 때, 어떻게 두 기능이 조화를 이루는지 알아보겠습니다. 하지만 우선은, 단순히 브랜치를 \"하나의 커밋과 그 부모 커밋들을 포함하는 작업 내역\"이라고 기억하시면 됩니다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "브랜치가 어떤 것인지 연습해보죠.",
            "",
            "`newImage`라는 브랜치를 살펴보겠습니다."
          ],
          "afterMarkdowns": [
            "저 그림에 브랜치의 모든 것이 담겨있습니다! 브랜치 `newImage`가 커밋 `C1`를 가리킵니다"
          ],
          "command": "git branch newImage",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "이 새로운 브랜치에 약간의 작업을 더해봅시다. 아래 버튼을 눌러주세요"
          ],
          "afterMarkdowns": [
            "앗! `master` 브랜치가 움직이고, `newImage` 브랜치는 이동하지 않았네요! 그건 우리가 새 브랜치 위에 있지 않았었기 때문입니다. 별표(*)가 `master`에 있었던 것이죠."
          ],
          "command": "git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "아래의 명령으로 새 브랜치로 이동해 봅시다.",
            "",
            "```",
            "git checkout [브랜치명]",
            "```",
            "",
            "이렇게 하면 변경분을 커밋하기 전에 새 브랜치로 이동하게 됩니다."
          ],
          "afterMarkdowns": [
            "이거죠! 이제 우리의 변경이 새 브랜치에 기록되었습니다!"
          ],
          "command": "git checkout newImage; git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "좋아요! 이제 직접 브랜치 작업을 연습해봅시다. 이 창을 닫고,",
            "`bugFix`라는 새 브랜치를 만드시고, 그 브랜치로 이동해보세요"
          ]
        }
      }
    ]
  },
  "commits-name": "Git 커밋 소개",
  "commits-hint": "'git commit'이라고 두 번 치세요!",
  "commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git 커밋",
            "커밋은 Git 저장소에 여러분의 디렉토리에 있는 모든 파일에 대한 스냅샷을 기록하는 것입니다. 디렉토리 전체를 복사하여 붙여넣는것과 유사하지만, 훨씬 유용한 방법입니다!",
            "",
            "Git은 가능한 한 커밋을 가볍게 유지하고자 하기때문에, 커밋할 때마다 디렉토리 전체를 복사하진 않습니다. 각 커밋은 저장소의 이전 버전과 다음 버전의 변경내역(\"delta\"라고도 함)을 저장합니다. 그래서 대부분의 커밋이 그 커밋 위의 부모 커밋을 가리킵니다. -- 다음 화면에서 곧 살펴보게 될 것입니다.",
            "",
            "저장소를 복제(clone)하려면 모든 변경분(delta)를 풀어내야 하는데, 이 때문에 명령행 결과로 아래 문구를 볼 수 있습니다.",
            "",
            "`resolving deltas`",
            "",
            "알아야 할 것이 꽤 많습니다만, 일단은 커밋을 프로젝트의 스냅샷들로 생각하면 충분합니다. 커밋은 매우 가볍고 커밋 사이의 전환도 매우 빠르다는 것을 기억해주세요!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "연습할 때 어떻게 보이는지 확인해봅시다. 오른쪽 화면에 git 저장소를 그림으로 표현해 놓았습니다. 현재 두번 커밋한 상태입니다 -- 첫번째 커밋으로 `C0`, 그 다음으로 `C1`이라는 어떤 의미있는 변화가 있는 커밋이 있습니다.",
            "",
            "아래 버튼을 눌러 새로운 커밋을 만들어보세요."
          ],
          "afterMarkdowns": [
            "이렇게 보입니다! 멋지죠. 우리는 방금 저장소 내용을 변경해서 하나의 커밋으로 저장했습니다. 방금 만든 커밋은 부모는 `C1`이고, 어떤 커밋을 기반으로 변경된 것인지를 가리킵니다."
          ],
          "command": "git commit",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "계속해서 직접 한번 해보세요! 이 창을 닫고, 커밋을 두 번 하면 다음 레벨로 넘어갑니다."
          ]
        }
      }
    ]
  },
  "merging-name": "Git에서 브랜치 합치기(Merge)",
  "merging-hint": "말씀드린 순서대로 커밋해주세요 (bugFix에 먼저 커밋하고 master에 커밋)",
  "merging-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 브랜치와 합치기(Merge)",
            "",
            "좋습니다! 지금까지 커밋하고 브랜치를 만드는 방법을 알아봤습니다. 이제 두 별도의 브랜치를 합치는 몇가지 방법을 알아볼 차례입니다. 이제부터 배우는 방법으로 브랜치를 따고, 새 기능을 개발 한 다음 합칠 수 있게 될 것입니다.",
            "",
            "처음으로 살펴볼 방법은 `git merge`입니다. Git의 합치기(merge)는 두 개의 부모(parent)를 가리키는 특별한 커밋을 만들어 냅니다. 두개의 부모가 있는 커밋이라는 것은 \"한 부모의 모든 작업내역과 나머지 부모의 모든 작업, *그리고* 그 두 부모의 모든 부모들의 작업내역을 포함한다\"라는 의미가 있습니다. ",
            "",
            "그림으로 보는게 이해하기 쉬워요. 다음 화면을 봅시다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "여기에 브랜치가 두 개 있습니다. 각 브랜치에 독립된 커밋이 하나씩 있구요. 그 말은 이 저장소에 지금까지 작업한 내역이 나뉘어 담겨 있다는 얘기입니다. 두 브랜치를 합쳐서(merge) 이 문제를 해결해 볼까요?",
            "",
            "`bugFix` 브랜치를 `master` 브랜치에 합쳐(merge) 보겠습니다."
          ],
          "afterMarkdowns": [
            "보셨어요? 우선, `master`가 두 부모가 있는 커밋을 가리키고 있습니다. ",
            "",
            "또, 커밋들의 색이 바뀐 것을 눈치 채셨나요? 이해를 돕기위해 색상으로 구분해 표현했습니다. 각 브랜치는 그 브랜치만의 색상으로 그렸습니다. 브랜치가 합쳐지는 커밋의 경우에는, 그 브랜치들의 색을 조합한 색상으로 표시 했습니다.",
            "",
            "그런식으로 여기에 `bugFix`브랜치 쪽을 제외한 나머지 커밋만 `master` 브랜치의 색으로 칠해져 있습니다. 이걸 고쳐보죠..."
          ],
          "command": "git merge bugFix",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "이제 `master` 브랜치에 `bugFix`를 합쳐(merge) 봅시다:"
          ],
          "afterMarkdowns": [
            "`bugFix`가 `master`의 부모쪽에 있었기 때문에, git이 별다른 일을 할 필요가 없었습니다; 간단히 `bugFix`를 `master`가 붙어 있는 커밋으로 이동시켰을 뿐입니다.",
            "",
            "짜잔! 이제 모든 커밋의 색이 같아졌고, 이는 두 브랜치가 모두 저장소의 모든 작업 내역을 포함하고 있다는 뜻입니다."
          ],
          "command": "git checkout bugFix; git merge master",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "아래 작업을 해서 이 레벨을 통과하세요:",
            "",
            "* `bugFix`라는 새 브랜치를 만듭니다",
            "* `git checkout bugFix`를 입력해 `bugFix` 브랜치로 이동(checkout)합니다.",
            "* 커밋 한 번 하세요",
            "* `git checkout` 명령어를 이용해 `master`브랜치로 돌아갑니다",
            "* 커밋 또 하세요",
            "* `git merge` 명령어로 `bugFix`브랜치를 `master`에 합쳐 넣습니다.",
            "",
            "*아 그리고, \"objective\" 명령어로 이 안내창을 다시 볼 수 있다는 것을 기억해 두세요!*"
          ]
        }
      }
    ]
  },
  "rebasing-name": "리베이스(rebase)의 기본",
  "rebasing-hint": "bugFix 브랜치에서 먼저 커밋하세요",
  "rebasing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git 리베이스(Rebase)",
            "",
            "브랜치끼리의 작업을 접목하는 두번째 방법은 *리베이스(rebase)*입니다. 리베이스는 기본적으로 커밋들을 모아서 복사한 뒤, 다른 곳에 떨궈 놓는 것입니다.",
            "",
            "조금 어렵게 느껴질 수 있지만, 리베이스를 하면 커밋들의 흐름을 보기 좋게 한 줄로 만들 수 있다는 장점이 있습니다. 리베이스를 쓰면 저장소의 커밋 로그와 이력이 한결 깨끗해집니다.",
            "",
            "어떻게 동작하는지 살펴볼까요..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "여기 또 브랜치 두 개가 있습니다; bugFix브랜치가 현재 선택됐다는 점 눈여겨 보세요 (별표 표시)",
            "",
            "bugFix 브랜치에서의 작업을 master 브랜치 위로 직접 옮겨 놓으려고 합니다. 그렇게 하면, 실제로는 두 기능을 따로따로 개발했지만, 마치 순서대로 개발한 것처럼 보이게 됩니다.",
            "",
            "`git rebase` 명령어로 함께 해보죠."
          ],
          "afterMarkdowns": [
            "오! 이제 bugFix 브랜치의 작업 내용이 master의 바로 위에 깔끔한 한 줄의 커밋으로 보이게 됐습니다.",
            "",
            "C3 커밋은 어딘가에 아직 남아있고(그림에서 흐려짐), C3'는 master 위에 올려 놓은 복사본입니다.",
            "",
            "master가 아직 그대로라는 문제가 남아있는데요, 바로 해결해보죠..."
          ],
          "command": "git rebase master",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "우리는 지금 `master` 브랜치를 선택한 상태입니다. `bugFix` 브랜치쪽으로 리베이스 해보겠습니다..."
          ],
          "afterMarkdowns": [
            "보세요! `master`가 `bugFix`의 부모쪽에 있었기 때문에, 단순히 그 브랜치를 더 앞쪽의 커밋을 가리키게 이동하는 것이 전부입니다."
          ],
          "command": "git rebase bugFix",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이하 작업을 하면 이번 레벨을 통과합니다",
            "",
            "* `bugFix`라는 새 브랜치를 만들어 선택하세요",
            "* 커밋 한 번 합니다",
            "* master로 돌아가서 또 커밋합니다",
            "* bugFix를 다시 선택하고 master에 리베이스 하세요",
            "",
            "화이팅!"
          ]
        }
      }
    ]
  },
  "describe-name": "Git describe(묘사)",
  "describe-hint": "다음으로 넘어가고 싶으면 bugFix를 한번 커밋하면 됩니다.",
  "describe-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Git Describe",
            "",
            "커밋 트리에서 태그가 훌륭한 \"닻\"역할을 하기 때문에, git에는 여러분이 가장 가까운 \"닻(태그)\"에 비해 상대적으로 어디에 위치해있는지 *describe(묘사)*해주는 명령어가 있습니다. 이 명령어는 `git describe` 입니다!",
            "",
            "Git describe는 커밋 히스토리에서 앞 뒤로 여러 커밋을 이동하고 나서 커밋 트리에서 방향감각을 다시 찾는데 도움을 줍니다; 이런 상황은 git bisect(문제가 되는 커밋을 찾는 명령어라고 간단히 생각하자)를 하고 나서라던가 휴가를 다녀온 동료의 컴퓨터에 앉는경우가 있습니다."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Git describe 는 다음의 형태를 가지고 있습니다:",
            "",
            "`git describe <ref>`",
            "",
            "`<ref>`에는 commit을 의미하는 그 어떤것이던 쓸 수 있습니다. 만약 ref를 특정 지어주지 않으면, git은 그냥 지금 체크아웃된곳을 사용합니다 (`HEAD`).",
            "",
            "명령어의 출력은 다음과 같은 형태로 나타납니다:",
            "",
            "`<tag>_<numCommits>_g<hash>`",
            "",
            "`tag`는 가장 가까운 부모 태그를 나타냅니다. `numCommits`은 그 태그가 몇 커밋 멀리있는지를 나타냅니다. `<hash>`는 묘사하고있는 커밋의 해시를 나타냅니다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "간단한 예제를 확인해 봅시다. 아래의 트리에서:"
          ],
          "afterMarkdowns": [
            "`git describe master` 명령은 다음을 출력합니다:",
            "",
            "`v1_2_gC2`",
            "",
            "`git describe side`는 다음을 출력합니다:",
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
            "이정도면 git describe를 충분히 활용할 수 있습니다! 이 레벨의 몇 지점을 describe 명령어를 통해 확인해보면서 느낌을 익혀 봅시다.",
            "",
            "준비가 되면 커밋을 한번해서 레벨을 종료하세요. 자유롭게 연습해보세요 :P"
          ]
        }
      }
    ]
  },
  "grabbing-one-commit-name": "딱 한개의 커밋만 가져오기",
  "grabbing-one-commit-hint": "대화식 리베이스(rebase -i)나 or 체리픽(cherry-pick)을 사용하세요",
  "grabbing-one-commit-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 로컬에 쌓인 커밋들",
            "",
            "개발중에 종종 이런 상황이 생깁니다: 잘 띄지 않는 버그를 찾아서 해결하려고, 어떤 부분의 문제인지를 찾기 위해 디버그용 코드와 화면에 정보를 프린트하는 코드 몇 줄 넣습니다. ",
            "",
            "디버깅용 코드나 프린트 명령은 그 브랜치에 들어있습니다. 마침내 버그를 찾아서 고쳤고, 원래 작업하는 브랜치에 합치면 됩니다!",
            "",
            "이제 `bugFix`브랜치의 내용을 `master`에 합쳐 넣으려 하지만, 한 가지 문제가 있습니다. 그냥 간단히 `master`브랜치를 최신 커밋으로 이동시킨다면(fast-forward) 그 불필요한 디버그용 코드들도 함께 들어가 버린다는 문제죠."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "여기에서 Git의 마법이 드러납니다. 이 문제를 해결하는 여러가지 방법이 있습니다만, 가장 간단한 두가지 방법 아래와 같습니다:",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`",
            "",
            "대화형 (-i 옵션) 리베이스(rebase)로는 어떤 커밋을 취하거나 버릴지를 선택할 수 있습니다. 또 커밋의 순서를 바꿀 수도 있습니다. 이 커맨드로 어떤 작업의 일부만 골라내기에 유용합니다.",
            "",
            "체리픽(cherry-pick)은 개별 커밋을 골라서 `HEAD`위에 떨어뜨릴 수 있습니다."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이번 레벨을 통과하기 위해 어떤 방법을 쓰시든 자유입니다만, `master`브랜치가 `bugFix` 브랜치의 커밋을 일부 가져오게 해주세요."
          ]
        }
      }
    ]
  },
  "juggling-commits-name": "커밋들 갖고 놀기",
  "juggling-commits-hint": "첫번째 명령은 git rebase -i HEAD~2 입니다",
  "juggling-commits-start-dialog": {
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
            "이 목표를 달성하기 위해서는 많은 방법이 있는데요(체리픽을 고민중이시죠?), 체리픽은 나중에 더 살펴보기로 하고, 우선은 위의 방법으로 해결해보세요.",
            "",
            "최종적으로, 목표 결과를 눈여겨 보세요 -- 우리가 커밋을 두 번 옮겼기 때문에, 두 커밋 모두 따옴표 표시가 붙어있습니다. 정정한(amend) 커밋은 따옴표가 추가로 하나 더 붙어있습니다."
          ]
        }
      }
    ]
  },
  "juggling-commits2-name": "커밋 갖고 놀기 #2",
  "juggling-commits2-hint": "master를 변경 완료한 커밋으로 이동(forward)시키는 것을 잊지 마세요!",
  "juggling-commits2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 커밋 갖고 놀기 #2",
            "",
            "*만약 이전 레벨의 커밋 갖고 놀기 #1을 풀지 않으셨다면, 계속하기에 앞서서 꼭 풀어보세요*",
            "",
            "이전 레벨에서 보셨듯이 `rebase -i` 명령으로 커밋의 순서를 바꿀 수 있습니다. 정정할 커밋이 바로 직전(top)에 있으면 간단히 --amend로 수정할 수 있고, 그리고 나서 다시 원하는 순서로 되돌려 놓으면 됩니다.",
            "",
            "이번에 한가지 문제는 순서를 꽤 많이 바꿔야한다는 점인데요, 그러다가 리베이스중에 충돌이 날 수 있습니다. 이번에는 다른 방법인 `git cherry-pick`으로 해결해 봅시다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "git cherry-pick으로 HEAD에다 어떤 커밋이든 떨어 뜨려 놓을 수 있다고 알려드린것 기억나세요? (단, 그 커밋이 현재 가리키고 있는 커밋이 아니어야합니다)",
            "",
            "간단한 데모로 다시 알려드리겠습니다:"
          ],
          "afterMarkdowns": [
            "좋아요! 계속할게요"
          ],
          "command": "git cherry-pick C2",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "그럼 이번 레벨에서는 아까와 마찬가지로 `C2` 커밋의 내용을 정정하되, `rebase -i`를 쓰지 말고 해보세요. ^.~"
          ]
        }
      }
    ]
  },
  "tags-name": "Git 태그",
  "tags-hint": "커밋을 직접 또는 태그를 이용해서 체크아웃할수 있습니다!",
  "tags-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git 태그",
            "",
            "이전 강의에서 배웠듯이, 브랜치는 이동하기 쉽습니다. 작업의 완료, 진행에따라 이리저리 이동하면서 서로다른 커밋을 참조하게 됩니다. 브랜치는 쉽게 변하며 임시적인 것입니다 항상 바뀌고 있죠.",
            "",
            "이런 상황에서, 여러분은 여러분의 프로젝트의 역사(작업 이력)에서 중요한 지점들에 *영구적으로* 표시를 할 방법이 없을까 궁금할것입니다. 주요 릴리즈나 큰 브랜치 병합(merge)이 있을때가 그런 상황이겠군요. 이런 상황에 커밋들을 표시할 브랜치보다 영구적인 방법이 있을까요?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "당연히 있습니다! Git 태그는 딱 이런 상황을 위해 존재합니다 -- Git 태그는 특정 커밋들을 브랜치로 참조하듯이 영구적인 \"milestone(이정표)\"으로 표시합니다.",
            "",
            "중요한 점은, Git 태그는 커밋들이 추가적으로 생성되어도 절대 움직이지 않는다는 것입니다. 여러분은 태그를 \"체크아웃\"한 후에 그 태그에서 어떤 작업을 완료할 수 없습니다 -- 태그는 커밋 트리에서 특정 지점을 표시하기위한 닻같은 역할을 합니다.",
            "",
            "자 태그가 무엇을 하는지 예제를 통해 알아봅시다"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            " 프로토타입의 첫 버전인 `C1`에 태그를 만들어 봅시다."
          ],
          "afterMarkdowns": [
            "자! 아주 쉽죠. 우리는 태그의 이름을 `v1`이라고 지었고 커밋 `C1`을 지정해서 참조했습니다. 만약 커밋을 지정해주지 않으면 git은 `HEAD`가 있는지점에 태그를 붙일 것입니다."
          ],
          "command": "git tag v1 C1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이번 레벨에서는 goal에 나타난것과 같이 태그를 만들고 `v1`을 체크아웃하면 됩니다. 분리된 `HEAD` 상태로 변하는것을 확인 해 보십시오 -- 이것은 `v1` 태그에 직접 커밋을 할 수 없기 때문입니다.",
            "",
            "다음 레벨에서는 태그의 더 흥미로운 활용 방법을 확인해 볼 것입니다."
          ]
        }
      }
    ]
  },
  "cherry-pick-name": "Cherry-pick 소개",
  "cherry-pick-hint": "커밋의 이름들로 git cherry-pick 하세요!",
  "cherry-pick-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 작업을 여기저기로 옮기기",
            "",
            "지금까지 우리는 git의 기초를 배웠습니다. -- 커밋을하고, 브랜치를 만들고, 소스 트리 여기저기를 돌아다녔습니다. 이런 개념들을 아는 것만으로도 git repository의 힘을 90%이상 사용하고 개발자들이 필요로하는 작업의 대부분을 할 수 있습니다.",
            "",
            "그 나머지 10% 기능이, 복잡한 작업(또는 작업중 막혔을때)중에 꽤 유용할 수 있습니다. 이제 배워 볼 다음 개념은 \"작업을 여기저로 올기기\" 다시 말해, 개발자들의 언어로 \"이 일은 여기에 저 일은 저기에 두고 싶어\" 정확하고 우아하고 유연하게.",
            "",
            "다소 과해 보일 수 있는데, 간단한 개념입니다."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git 체리-픽 (Cherry-pick)",
            "",
            "이 시리즈의 첫 명령어는 `git cherry-pick` 입니다. 다음 과 같은 형태로 사용합니다:",
            "",
            "* `git cherry-pick <Commit1> <Commit2> <...>`",
            "",
            "현재 위치(`HEAD`) 아래에 있는 일련의 커밋들에대한 복사본을 만들겠다는 것을 간단히 줄인 말입니다. 개인적으로 저는 `cherry-pick`을 아주 좋아합니다 왜냐하면 조금의 마법이 첨가되있고 이해하기 쉽기 때문입니다.",
            "",
            "데모를 확인해봅시다",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "여기 repository가 있습니다. `master`와 master로 복사하고 싶은 작업이 있는 브랜치 `side`가 있습니다. 이것은 rebase를 통해서 할 수 있습니다(이미 배운), 하지만 체리-픽이 이 작업을 어떻게 수행하는지 확인해 봅시다."
          ],
          "afterMarkdowns": [
            "됬습니다! 우리는 `C2`와 `C4` 커밋을 원했고 git이 우리가 원하는 곳 바로 밑에 톡 떨어뜨려 줬습니다. 아주 간단하죠!"
          ],
          "command": "git cherry-pick C2 C4",
          "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이 레벨을 통과하기 위해서는 몇개의 작업을 세개의 브랜치들에서 master로 복사해와야합니다. 어떤 커밋들이 필요한지는 goal을 보고 확인하면 됩니다.",
            ""
          ]
        }
      }
    ]
  },
  "detached-head-name": "HEAD 분리하기",
  "detached-head-hint": "커밋에 있는 라벨(hash)을 활용하세요!",
  "detached-head-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git에서 여기저기로 옮겨다니기",
            "",
            "Git의 고급기능들에 대해 더 알아보기 전에, 여러분의 프로젝트를 표현하는 커밋 트리(commit tree)에서 이동 할 수 있는 여러가지 방법들을 아는것이 중요합니다.",
            "",
            "여기저기 이동하는 것에 익숙해지면, 여러분이 다른 git 명령어들을 사용하는 능력도 아주 좋아질 것입니다!",
            "",
            "",
            "",
            "",
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
            "먼저\"HEAD\"에 대해 이야기해 봅시다. HEAD는 현재 체크아웃된 커밋을 가리킵니다. -- 다시 말하자면 현재 작업중인 커밋입니다.",
            "",
            "HEAD는 항상 작업트리의 가장 최근 커밋을 가리킵니다. 작업트리에 변화를 주는 git 명령어들은 대부분 HEAD를 변경하는것으로 시작합니다.",
            "",
            "일반적으로 HEAD는 브랜치의 이름을 가리키고있습니다(bugFix와 같이). 커밋을 하게 되면, bugFix의 상태가 바뀌고 이 변경은 HEAD를 통해서 확인이 가능합니다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "직접 확인해 봅시다. 여기서 우리는 보이지 않던 HEAD를 커밋전, 후에 드러낼 것입니다."
          ],
          "afterMarkdowns": [
            "보세요! HEAD가 `master`브랜치 아래에 숨어 있던 거군요."
          ],
          "command": "git checkout C1; git checkout master; git commit; git checkout C2",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "### HEAD 분리하기",
            "",
            "HEAD를 분리한다는 것은 HEAD를 브랜치 대신 커밋에 붙이는 것을 의미합니다. 명령을 사용하기 전의 모습은 다음과 같습니다:",
            "",
            "HEAD -> master -> C1",
            ""
          ],
          "afterMarkdowns": [
            "이제는 이렇게 되는군요",
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
            "다음 레벨로 넘어가기 위해서는, HEAD를 `bugfix`에서 분리하고 그 커밋에 붙이세요.",
            "",
            "각 커밋은 그것의 해시값으로 특정지을수 있습니다. 각 커밋의 해시값은 각 커밋을 나타내는 원안에 나타나있습니다."
          ]
        }
      }
    ]
  },
  "interactive-rebase-name": "인터랙티브 리베이스 소개",
  "interactive-rebase-hint": "리베이스할 타겟으로 브랜치나 상대 참조(HEAD~)를 사용할 수 있습니다",
  "interactive-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git 인터렉티브 리베이스(Interactive Rebase)",
            "",
            "Git 체리-픽은 여러분이 원하는 커밋이 무엇인지 알때(각각의 해시값도) 아주 유용합니다 -- 체리-픽이 제공하는 간단함은 아주 매력적입니다.",
            "",
            "하지만 원하는 커밋을 모르는 상황에는 어쩌죠? 고맙게도 git은 이런상황에 대한 대안이 있습니다. 우리는 이럴 때 인터렉티브 리베이스를 사용하면됩니다 -- 리베이스할 일련의 커밋들을 검토할 수 있는 가장 좋은 방법입니다.",
            "",
            "자세히 알아보죠..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "인터렉티브 리베이스가 의미하는 뜻은 `rebase` 명령어를 사용할 때 `-i` 옵션을 같이 사용한다는 것입니다.",
            "",
            "이 옵션을 추가하면, git은 리베이스의 목적지가 되는 곳 아래에 복사될 커밋들을 보여주는 UI를 띄울것 입니다. 각 커밋을 구분할 수 있는 각각의 해시들과 메시지도 보여줍니다.",
            "",
            "\"실제\"git 에서는 UI창을 띄우는것 대신에 `vim`과 같은 텍스트 편집기에서 파일을 엽니다. 저희는 배우는것이 목적이기에 같은 역할을 하는 작은 대화창을 만들어서 대신했습니다."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "인터렉티브 리베이스 대화창이 열리면, 3가지를 할 수 있습니다:",
            "",
            "* 적용할 커밋들의 순서를 UI를 통해 바꿀수 있습니다(여기서는 마우스 드래그앤 드롭으로 가능합니다)",
            "* 원하지 않는 커밋들을 뺄 수 있습니다. 이것은 `pick`을 이용해 지정할 수 있습니다(여기서는 `pick`토글 버튼을 끄는것으로 가능합니다)",
            "* 마지막으로, 커밋을 스쿼시(squash)할 수 있습니다. 불행히도 저희 레벨은 몇개의 논리적 문제들 때문에 지원을 하지 않습니다. 이거에 대해서는 넘어가겠습니다. 요약하자면 커밋을 합칠 수 있습니다",
            "",
            "자! 예시를 확인해 봅시다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "버튼을 누르면 인터렉티브 리베이스 대화창이 뜰것 입니다. 커밋들의 순서를 바꿔보고(커밋을 빼 봐도 됩니다) 결과를 확인해봅시다!"
          ],
          "afterMarkdowns": [
            "Boom! Git이 UI를 통해 명시한 그대로 커밋들을 복사했습니다."
          ],
          "command": "git rebase -i HEAD~4 --aboveAll",
          "beforeCommand": "git commit; git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이번 레벨을 통과하기 위해서 goal에 나타난 순서대로 만들기 위해 인터렉티브 리베이스를 사용해봅시다. `undo`와 `reset`을 통해 했던 실수들은 되돌릴 수 있습니다 :D"
          ]
        }
      }
    ]
  },
  "relative-refs-name": "상대 참조 (^) (Relative Refs)",
  "relative-refs-hint": "(^)연산자를 기억하세요!",
  "relative-refs-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 상대 참조",
            "",
            "Git에서 여기저기 이동할 때 커밋의 해시를 사용하는 방법은 조금 귀찮습니다. 실제로 Git을 사용할 때는 터미널화면 옆에 예쁘장하게 커밋트리가 보이진 않으니까요. 매번 해시를 확인하려고 `git log` 명령어를 치고 있을 겁니다.",
            "",
            "나아가서, 실제 Git에서는 해시들이 훨씬 더 깁니다. 예를 들어  이전 레벨에 소개했던 커밋의 해시는 `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`입니다. 쓰기 쉬워 보이진 않네요....",
            "",
            "다행히도, Git은 똑똑합니다. 해시가 커밋의 고유한 값임을 보여줄 수 있을 만큼만 명시해주면 됩니다. 위의 긴 문자열 대신 `fed2`만 입력해도 되는 겁니다."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "말했듯이, 커밋들을 해시로 구분하고 사용하는것이 아주 편하다고 볼 수는 없습니다. Git의 상대 참조(Relative Ref)가 여기서 등장합니다. 굉장한 기능입니다.",
            "",
            "상대 참조로 우리가 기억할 만한 지점(브랜치 `bugFix`라던가 `HEAD`라던가)에서 출발해서 이동하여 다른 지점에 도달해 작업을 할 수 있습니다.",
            "",
            "상대 커밋은 강력한 기능인데, 여기서 두가지 간단한 방법을 소개하겠습니다.",
            "",
            "* 한번에 한 커밋 위로 움직이는 `^`",
            "* 한번에 여러 커밋 위로 올라가는 `~<num>`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "먼저 캐럿 (^) 연산자 부터 알아보겠습니다. 참조 이름에 하나씩 추가할 때마다, 명시한 커밋의 부모를 찾게 됩니다.",
            "",
            "`master^`는 \"`master`의 부모\"와 같은 의미 입니다.",
            "",
            "`master^^` 는 \"`master`의 조부모(부모의 부모)\"를 의미합니다",
            "",
            "master 위에 있는 부모를 체크아웃 해 봅시다."
          ],
          "afterMarkdowns": [
            "Boom! 됬습니다. 커밋의 해시를 입력하는 것보다 훨씬 쉬운 방법입니다."
          ],
          "command": "git checkout master^",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "또한 참조인 `HEAD`도 상대참조를 위해 사용할 수 있습니다. 커밋트리 위쪽으로 움직이기위해 여러번 사용 해 봅시다."
          ],
          "afterMarkdowns": [
            "쉽군요! 이제 우린 `HEAD^`를 통해 시간을 거슬러 올라갈 수 있습니다."
          ],
          "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
          "beforeCommand": "git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이 레벨을 완료하기 위해서는, `bugFix`의 부모 커밋을 체크아웃 하십시오. 이렇게 하면 `HEAD`가 분리 될 것입니다.",
            "",
            "해시를 이용해서도 할 수 있지만, 상대 참조를 활용하는 것을 연습해 보세요!"
          ]
        }
      }
    ]
  },
  "relative-refs2-name": "상대 참조 #2 (~)",
  "relative-refs2-hint": "이번 레벨을 완료하려면 최소 한번은 직접 참조(해시)를 사용해야 합니다.",
  "relative-refs2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### \"~\" 연산자",
            "",
            "커밋트리에서 위로 여러 단계를 올라가고 싶을 수 있습니다. `^`를 계속 입력해서 올라가는것 말고 좋은 방법이 있습니다. Git 에는 틸드 (~) 연산자가 있습니다.",
            "",
            "",
            " (~) 틸드 연산자는 (선택적) 올라가고 싶은 부모의 갯수가 뒤에 숫자가 옵니다. 직접 확인해 보죠."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "돌아가고 싶은 커밋의 갯수를 `~`뒤의 숫자로 명시해 줍시다."
          ],
          "afterMarkdowns": [
            "Boom! 아주 간결합니다. -- 상대 참조는 대단해요."
          ],
          "command": "git checkout HEAD~4",
          "beforeCommand": "git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 브랜치 강제로 옮기기",
            "",
            "이제 여러분은 상대 참조의 전문가 입니다. 이제 이걸로 무언가를 해봅시다.",
            "",
            "제가 상대 참조를 사용하는 가장 일반적인 방법은 브랜치를 옮길 때 입니다. `-f` 옵션을 이용해서 브랜치를 특정 커밋에 직접적으로 재지정 할 수 있습니다. 이런 식으로 말이죠:",
            "",
            "`git branch -f master HEAD~3`",
            "",
            "(강제로) master 브랜치를 HEAD에서 세번 뒤로 옮겼습니다. (three parents behind HEAD)."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "방금의 커맨드를 직접 확인해 봅시다."
          ],
          "afterMarkdowns": [
            "됬네요! 우리는 상대 참조를 통해 `C1`을 간결한 방법으로 참조할 수 있었고 브랜치 강제(`-f`)를 통해 브랜치를 저 위치로 빠르게 옮길 수 있었습니다."
          ],
          "command": "git branch -f master HEAD~3",
          "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "자 이제 상대 참조와 브랜치 강제의 조합을 봤으니 다음 레벨을 해결해 봅시다.",
            "",
            "이 레벨을 통과하기 위해서, `HEAD`와 `master`와 `bugFix`를 제시되는 골지점으로 옮겨 주십시오."
          ]
        }
      }
    ]
  },
  "reversing-changes-name": "Git에서 작업 되돌리기",
  "reversing-changes-hint": "revert와 reset이 받는 인자가 다름을 기억하세요",
  "reversing-changes-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git에서 작업 되돌리기",
            "",
            "Git에는 작업한 것을 되돌리는 여러가지 방법이 있습니다. 변경내역을 되돌리는 것도 커밋과 마찬가지로 낮은 수준의 일(개별 파일이나 묶음을 스테이징 하는 것)과 높은 수준의 일(실제 변경이 복구되는 방법)이 있는데요, 여기서는 후자에 집중해 알려드릴게요.",
            "",
            "Git에서 변경한 내용을 되돌리는 방법은 크게 두가지가 있습니다 -- 하나는 `git reset`을 쓰는거고, 다른 하나는 `git revert`를 사용하는 것입니다. 다음 화면에서 하나씩 알아보겠습니다.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "## Git 리셋(reset)",
            "",
            "`git reset`은 브랜치로 하여금 예전의 커밋을 가리키도록 이동시키는 방식으로 변경 내용을 되돌립니다. 이런 관점에서 \"히스토리를 고쳐쓴다\"라고 말할 수 있습니다. 즉, `git reset`은 마치 애초에 커밋하지 않은 것처럼 예전 커밋으로 브랜치를 옮기는 것입니다.",
            "",
            "어떤 그림인지 한번 보죠:"
          ],
          "afterMarkdowns": [
            "그림에서처럼 master 브랜치가 가리키던 커밋을 `C1`로 다시 옮겼습니다; 이러면 로컬 저장소에는 마치 `C2`커밋이 아예 없었던 것과 마찬가지 상태가 됩니다."
          ],
          "command": "git reset HEAD~1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "## Git 리버트(revert)",
            "",
            "각자의 컴퓨터에서 작업하는 로컬 브랜치의 경우 리셋(reset)을 잘 쓸 수 있습니다만, \"히스토리를 고쳐쓴다\"는 점 때문에 다른 사람이 작업하는 리모트 브랜치에는 쓸 수 없습니다.",
            "",
            "변경분을 되돌리고, 이 되돌린 내용을 다른 사람들과 *공유하기* 위해서는, `git revert`를 써야합니다. 예제로 살펴볼게요."
          ],
          "afterMarkdowns": [
            "어색하게도, 우리가 되돌리려고한 커밋의 아래에 새로운 커밋이 생겼습니다. `C2`라는 새로운 커밋에 *변경내용*이 기록되는데요, 이 변경내역이 정확히 `C2` 커밋 내용의 반대되는 내용입니다.",
            "",
            "리버트를 하면 다른 사람들에게도 변경 내역을 밀어(push) 보낼 수 있습니다."
          ],
          "command": "git revert HEAD",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이 레벨을 통과하려면, `local` 브랜치와 `pushed` 브랜치에 있는 최근 두 번의 커밋을 되돌려 보세요.",
            "",
            "`pushed`는 리모트 브랜치이고, `local`은 로컬 브랜치임을 신경쓰셔서 작업하세요 -- 어떤 방법을 선택하실지 떠오르시죠?"
          ]
        }
      }
    ]
  },
  "many-rebases-name": "9천번이 넘는 리베이스",
  "many-rebases-hint": "아마도 master를 마지막에 업데이트하는 것이 가장 효율적인 방법일 것입니다...",
  "many-rebases-start-dialog": {
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
  },
  "selective-rebase-name": "브랜치 스파게티",
  "selective-rebase-hint": "이 문제를 해결하는 방법은 여러가지가 있습니다! 체리픽(cherry-pick)이 가장 쉽지만 오래걸리는 방법이고, 리베이스(rebase -i)가 빠른 방법입니다",
  "selective-rebase-start-dialog": {
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
  },
  "clone-name": "Clone 소개",
  "clone-hint": "그냥 git clone 하세요!",
  "clone-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Remote(원격)",
            "",
            "원격 저장소라는것이 사실 그다지 복잡한 개념은 아닙니다. 오늘날의 클라우드 컴퓨팅을 떠올리면 git remote의 이면에 수많은 마법이 부려지고 있을것 같지만, 사실 git remote 또 하나의 컴퓨터에 있는 여러분의 저장소의 복사본일 뿐입니다. 여러분은 일반적으로 인터넷을 통해서 이 또 하나의 컴퓨터와 커밋을 주고 받는등 대화를 할 수 있습니다.",
            "",
            "소개한김에 자랑까지 하자면 원격 저장소는 수많은 장점들이 있습니다:",
            "",
            "- 무엇보다 먼저, 원격 저장소는 백업으로서의 역할을 훌륭하게 수행합니다! 로컬 git 저장소는 파일들을 이전의 상태로 되돌리는 기능을 가지고 있습니다(아시다시피). 하지만 그 모든 정보가 로컬(내PC)에 저장되어 있습니다. 여러분의 git 저장소를 다른 컴퓨터에 복사본을 가지고있으면 로컬 데이터를 다 잃더라도 다른 컴퓨터에 남아있는 복사본으로 다시 출발 할 수 있습니다.",
            "",
            "- 더 중요한 것은, 원격 저장소를 통해 코딩을 다른 사람들과 함께 할 수 있다는것입니다. 여러분의 프로젝트의 복사본이 어느곳에선가 호스트되기때문에 여러분의 친구가 프로젝트에 아주 쉽게 기여할 수 있게됩니다(최근의 변화를 pull하거나).",
            "",
            "원격 저장소에서의 활동을 시각화해주는 웹 사이트들을 사용하는것이 추세입니다 ([Github](https://github.com/) 또는 [Phabricator](http://phabricator.org/)등이 있습니다). 원격 저장소가 _항상_ 이러한 도구들의 중심 뼈대를 이루고있습니다. 그래서 잘 아는것이 중요해요!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 원격 저장소를 생성하는 명령어",
            "",
            "지금까지, Git 브랜치 배우기는 _로컬_ 저장소가 어떻게 활용되는지에 대해 중점적으로 소개해 왔습니다(브랜치, 합병, 리베이스 등등). 이제 원격 저장소를 어떻게 활용하는지에 대해 배워보려고 합니다. 앞으로 이어질 레슨의 환경을 마련할 명령어가 필요합니다. `git clone`가 바로 그 명령어 입니다.",
            "",
            "실제로 `git clone`은 원격 저장소의 복사본을 _로컬_에 생성할때 사용하는 명령어 입니다(github에서 가져올때 라던가). Git 브랜치 배우기에서는 이 명령어를 살짝 다르게 사용합니다 -- `git clone`이 당신의 로컬 저장소에서 원격 저장소를 생성해냅니다. 물론 실제 명령어와 반대로 작동하는 것이지만 클론과 원격 저장소 사이의 연결관계를 이해하는데 도움이되서 이렇게 했습니다. 일단은 그냥 해봅시다.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "천천히 시작해봅시다. 일단 원격저장소가 우리 시각화 자료에서 어떻게 보이는지부터 봅시다.",
            ""
          ],
          "afterMarkdowns": [
            "자! 이제 우리 프로젝트의 원격 저장소를 가지게 되었습니다. 구분을 하기위해 조금 모양이 다른것 말고는 둘이 똑같게 생긴걸 알 수 있습니다 -- 뒤의 레벨에서는 우리가 이 저장소들 사이에서 어떻게 작업을 공유하는지 알아보겠습니다."
          ],
          "command": "git clone",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이 레벨을 통과하기 위해서 `git clone`을 입력하세요. 뒤의 레슨에서 더많은 것들을 배워볼 것입니다."
          ]
        }
      }
    ]
  },
  "fake-teamwork-name": "가짜 팀워크",
  "fake-teamwork-hint": "가장할 커밋의 갯수를 조절할 수 있습니다.",
  "fake-teamwork-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 협동 가장하기",
            "",
            "조금 곤란한일이 생겨버렸습니다 -- 앞으로 배울 레슨들에서 원격 저장소에서 일어난 변경들을 어떻게 로컬로 가져올것인지에 대해 배워 볼것입입니다.",
            "",
            "그런데 여기서 우리는 불가피하게 그 _변경_들을 만들어야 되는데, 원격 저장소가 동료 / 친구 / 협력자등에 의해 특정 브랜치나 여러개의 커밋이 갱신되는 경우를 표현할 필요가 있습니다. 즉 우리는 팀워크를 \"가장\"할 필요가 있는것 입니다.",
            "",
            "이런 문제를 해결하기 위해서 `git fakeTeamwork` 명령을 만들었습니다! 이름이 참 적절하죠? 예시를 통해 확인해봅시다..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`fakeTeamwork`의 기본 행동은 원격 master에 간단히 하나의 커밋을 하는것 입니다."
          ],
          "afterMarkdowns": [
            "자 됬습니다 -- 원격 저장소에 새로운 커밋이 갱신되었습니다. 아직 `git fetch`를 하지 않았기 때문에 로컬로 내려받아지지는 않았습니다."
          ],
          "command": "git fakeTeamwork",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "명령어에 추가할 커밋의 갯수나 어떤 브랜치에 추가할지 지정하는것도 가능합니다. 다음과 같이 명령어 뒤에 추가하면 됩니다."
          ],
          "afterMarkdowns": [
            "하나의 명령어로 팀원이 원격저장소의 `foo` 브랜치에 세개의 커밋을 push한것처럼 가장했습니다."
          ],
          "command": "git fakeTeamwork foo 3",
          "beforeCommand": "git branch foo; git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "뒤의 레벨들이 조금 어렵기 때문에, 이번 레벨에서 여러분에게 조금 많은것을 요구하려고 합니다.",
            "",
            "원격 저장소를 하나 만들고(`git clone`), 원격 저장소에 몇가지 가짜 변경을 만들고 로컬에서 커밋하고 원격의 변경들을 가져오세요. Goal과 같은 결과가 나오면 됩니다. 몇개의 레슨이 하나에 있다고 보면 되겠네요! 도전해봅시다."
          ]
        }
      }
    ]
  },
  "fetch-name": "Git Fetch",
  "fetch-hint": "그냥 git fetch를 하세요!",
  "fetch-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Fetch",
            "",
            "git 원격 작업들은 결국 서로다른 저장소에서 데이터를 _주고_ _받는_것에 불과하다는것을 알 수 있습니다. 우리가 커밋들을 주고 받을수 있는 한, git을 바탕으로하는 모든 종류의 업데이트를 공유할 수 있습니다(작업, 새로운 파일들, 새로운 아이디어, 러브레터 등...).",
            "",
            "이번 레슨에서는 원격 저장소_에서_ 데이터를 가져오는 방법을 배워볼 것입니다 -- 이를 위한 명령어는 `git fetch`라고 불립니다.",
            "",
            "먼저 알아두고 넘어갈것이 있는데 우리가 원격 저장소와 작업을 해서 상태가 변하면 _원격_브랜치들 또한 그 변경들을 반영합니다. 원격 브랜치에대한 이전 레슨을 참고하세요."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`git fetch`의 세부사항을 알아보기 전에 일단 눈으로 먼저 확인해 봅시다! 여기 로컬 저장소에는 없는 두개의 커밋이 있는 원격 저장소가 있습니다."
          ],
          "afterMarkdowns": [
            "됐습니다! 커밋 `C2` 와 `C3`가 우리의 로컬 저장소로 다운로드 되었고, 원격 브랜치 `o/master`가 이것을 반영하기 위해 업데이트 되었습니다."
          ],
          "command": "git fetch",
          "beforeCommand": "git clone; git fakeTeamwork 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### fetch는 무엇을 하는가",
            "",
            "`git fetch`는 두가지의 중요한 단계를 수행합니다. 사실 이 두 단계만을 진행합니다. 그것은 :",
            "",
            "* 원격 저장소에는 있지만 로컬에는 없는 커밋들을 다운로드 받습니다. 그리고... ",
            "* 우리의 원격 브랜치가 가리키는곳을 업데이트합니다 (예를들어, `o/master`)",
            "",
            "`git fetch`는 본질적으로 _로컬_에서 나타내는 원격 저장소의 상태를 _실제_ 원격 저장소의 (지금)상태와 동기화합니다.",
            "",
            "이전 레슨을 기억한다면, 원격 브랜치는 가장 최근 원격 원격저장소와 작업을 했을때를 기준으로 원격 저장소의 상태를 반영한다고 했습니다. `git fetch`가 그러한 작업중에 하나입니다!(역: 원문에서는 talk with remote라고 표현합니다. 원격 저장소와 대화한다고 번역하기 어색해서 의역했습니다.) 원격 브랜치와 `git fetch`의 관계를 분명하게 알게되셨으면 좋겠습니다.",
            "",
            "`git fetch`는 일반적으로 원격 저장소와 인터넷을 통해 접근합니다(`http://` 또는 `git://`와같은 프로토콜로).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### fetch는 무엇을 하지 않는가",
            "",
            "`git fetch`는 그러나, _여러분의_ 로컬 상태는 전혀 바꾸지 않는습니다. 여러분의 `master` 브랜치도 업데이트하지 않고 파일 시스템의 모습이던 그 어떤것도 바꾸지 않습니다.",
            "",
            "이것을 이해하는게 아주 중요한데, 왜냐하면 수 많은 개발자들이 `git fetch`를 하면 자신의 로컬 작업이 변경되어 원격 저장소의 모습을 반영해 업데이트 될것이라고 생각하기 때문입니다. 앞의 과정에 필요한 데이터를 다운로드는 하지만, 실제로 로컬 파일들이나 브랜치를 변경하지는 않습니다. 이것을 하기위한 명령어들은 뒤에서 배우겠습니다 :D",
            "",
            "간단하게 `git fetch`를 다운로드 단계로 생각할 수 있습니다."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "레벨을 마치기 위해, `git fetch`를 수행하고 모든 커밋들을 내려 받으세요!"
          ]
        }
      }
    ]
  },
  "fetch-args-name": "Fetch의 인자들",
  "fetch-args-hint": "커밋 ID가 바뀔수도있으니 주의하세요! \"help level\"을 입력하면 슬라이드들을 다시 읽어볼수 있습니다.",
  "fetch-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git fetch 인자들",
            "",
            "여태까지 우리는 git push 인자들에 대해 배워봤습니다. 이 멋진 `<place>` 인자 그리고 콜론 참조스펙도 말이죠(`<source>:<destination>`). 우리가 알아낸 이 지식을 `git fetch`에도 적용 할 수 있으려나요?",
            "",
            "당연하죠! `git fetch`에 넘기는 인자들은 사실 `git push`의 그것들과 *아주 아주* 비슷합니다. 같은 컨셉으로 적용되지만 방향이 반대일 뿐이죠(커밋을 업로드하는게 아니라 다운받는것이니까요).",
            "",
            "하나씩 차근차근 알아봅시다..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### `<place>` 인자",
            "",
            "git fetch에 다음 명령어와 같이 place를 지정해주면:",
            "",
            "`git fetch origin foo`",
            "",
            "Git은 원격 저장소의 `foo` 브랜치로 가서 현재 로컬에 없는 커밋들을 가져와 로컬의 'o/foo' 브랜치 아래에 추가 할 것입니다.",
            "",
            "직접 확인해봅시다(상기해보죠)."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "place를 지정해주면..."
          ],
          "afterMarkdowns": [
            "커밋들을 `foo`브랜치에서만 내려받은 후 로컬의 `o/foo`브랜치에만 적용합니다."
          ],
          "command": "git fetch origin foo",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "여러분은 분명 궁금할거에요 -- 왜 로컬의 `foo`에 그냥 커밋을 추가하지 않고 로컬의 원격 브랜치 `o/foo`에 커밋들을 추가한거지? <place> 인자는 로컬하고 원격 저장소 모두에 똑같이 있는 곳을 의미한게 아니였나?",
            "",
            "음, git이 이번 상황은 특별히 예외적으로 처리하기 때문입니다. 여러분이 `foo`브랜치에 작업을 했을지도 모르는데 이 명령으로 망쳐서 건드릴지도 모르니까요! 이전에 했던 강의 `git fetch`를 떠올려보면 왜 그런지 느낌이 올겁니다 -- `git fetch`는 로컬의 원격 브랜치가 아닌 브랜치는 갱신하지 않습니다, 커밋들을 내려받기만 합니다(여러분이 확인해보고 나중에 병합할 수 있도록 말이죠).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "\"그렇다면, 이전 강의처럼 source와 destination를 모두 직접 지정해주면 어떻게될까요? 이 명령어로 말이죠 `<source>:<destination>`\"",
            "",
            "여러분이 커밋을 *직접* 로컬 브랜치로 fetch할 열의가 있다면, 네 콜론 참조스펙으로 지정해서 할 수 있습니다. 하지만 체크아웃된 브랜치에 fetch할 수 는 없고 체크아웃되지 않은 브랜치만 가능합니다.",
            "",
            "주의 할점이 하나 있는데 -- `<source>`는 이제 받아올 커밋이 있는 *원격*에 있는 place를 넣어줘야하고 `<destination>`은 그 커밋들을 받아올 *local*의 place를 인자로 넣어줘야 합니다. git push와 정반대로 하는거죠, 데이터를 반대의 방향으로 옮기는 작업이니 이게 더 납득이 갑니다.",
            "",
            "언급한 것 처럼, 실제로 이것을 하는 개발자들은 많지 않습니다. 이것을 소개하는것은 `fetch`와 `push`가 방향이 반대일뿐 컨셉이 비슷하다는것을 표현하기 위해서입니다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "자 이 해괴한 작업을 직접 확인해봅시다:"
          ],
          "afterMarkdowns": [
            "이야! 보셨습니까, git이 `foo~1`을 origin의 place로 지정하고 커밋들을 내려받아 `bar`(로컬 브랜치)에 추가했습니다. `foo`와 `o/foo`는 갱신되지 않는게 확인되나요? destination을 지정해줬기 때문입니다."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "만약 destination이 될 브랜치가 없는 없는 상태에서 명령을 수행하면 어떻게 될까요? 방금의 슬라이드에서 `bar`브랜치가 없는 상태에서 수행해봅시다."
          ],
          "afterMarkdowns": [
            "보이나요, git push 와 똑같습니다. Git이 fetch를 수행하기전에 destination을 로컬에 만들었습니다. git이 push를 수행하기 전에 원격저장소에 destination을 만드는것과 똑같습니다(없을경우에)."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "인자 없이는?",
            "",
            "만약 `git fetch`를 인자없이 수행하면 원격저장소에서 모든 원격 브랜치들로 커밋들을 내려받습니다..."
          ],
          "afterMarkdowns": [
            "간단하지만, 짚고 넘어갑시다."
          ],
          "command": "git fetch",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "좋습니다, 설명은 이정도로 하고! 이번 레벨을 끝내기위해서는 시각화된 골처럼 커밋들을 fetch하면 됩니다. 명령어로 멋지게 해내봅시다!",
            "",
            "fetch 명령에 source와 destination을 모두 지정해줘야 할겁니다. 골 시각화를 잘 보세요 fetch를 하다보면 커밋들의 ID가 바뀔수도있어요!"
          ]
        }
      }
    ]
  },
  "fetch-rebase-name": "엇갈린 히스토리",
  "fetch-rebase-hint": "순서는 goal을 참고하세요",
  "fetch-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 엇갈린 작업",
            "",
            "지금까지 우리는 다른곳에서 커밋을 `pull`해서 내려받고 우리가 만든 변경들을 `push`하는 방법을 배웠습니다. 간단해보이는데, 왜 사람들이 이것 때문에 곤란해 할까요?",
            "",
            "어려움은 저장소의 히스토리가 *엇갈릴 때* 찾아옵니다. 자세히 살펴보기 전에 예제를 확인해봅시다...",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "상상을 해봅시다. 여러분은 월요일에 저장소를 clone해서 부가기능을 만들기 시작했습니다. 금요일쯤 기능을 공개할 준비가 되었습니다 -- 그런데 오 이런! 동료들이 주중에 코딩을 잔뜩해서 여러분이 만든 기능은 프로젝트에 뒤떨어져서 무용지물이 되었습니다. 이 사람들이 그 커밋들을 공유하고있는 원격 저장소에도 공개했습니다, 이제 *여러분의* 작업은 이제 의미가 없는 *구*버전의 프로젝트를 기반으로한 작업이 되어버렸습니다.",
            "",
            "이런 경우, 명령어 `git push`가 할 일이 애매해집니다. `git push`를 수행했을때, git은 원격 저장소를 여러분이 작업했던 월요일의 상태로 되돌려야 할까요? 아니면 새 코드를 건들지 않고 여러분의 코드만 추가해야 되나요? 아니면 여러분의 작업은 뒤 떨어졌기 때문에 완전히 무시해야되나요?",
            "",
            "이렇게 상황이 애매모호하기 때문에(히스토리가 엇갈렸기 때문이죠), git은 여러분이 `push`하지 못하게 합니다. 사실 여러분이 작업을 공유하기전에 원격 저장소의 최신 상태를 합치도록 강제합니다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "너무 떠든거같습니다! 이 상황을 직접 눈으로 확인해봅시다"
          ],
          "afterMarkdowns": [
            "보이죠? 명령어가 실행되지 않아서 아무것도 잃어나지 않습니다. 여러분의 최근 커밋 `C3`가 원격저장소의 `C1`을 기반으로 하기 때문에 `git push`가 실패합니다. 원격 저장소는 `C2`까지 갱신된 상태기때문에 git은 여러분의 push를 거부하게됩니다."
          ],
          "command": "git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "그러면 이 상황을 어떻게 해결할까요? 쉽습니다, 여러분의 작업을 원격 브랜치의 최신상태를 기반으로 하게 만들면 됩니다.",
            "",
            "이렇게 하기위한 방법이 여러가지가 있는데, 가장 간결한 방법은 리베이스를 통해 작업을 옮기는 방법입니다. 예제를 통해 눈으로 확인해 봅시다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "push를 하기전에 리베이스를 하면..."
          ],
          "afterMarkdowns": [
            "Boom! `git fetch`로 원격 저장소의 변경정보를 가져오고, 새 변경들로 우리 작업을 리베이스 했습니다, 이제 `git push`하면 끝!"
          ],
          "command": "git fetch; git rebase o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "다른 방법은 없냐고요? 당연히 있습니다! 같은것을 `merge`로 대신 해봅시다.",
            "",
            "`git merge`가 여러분의 작업을 옮기지는 않지만(merge 커밋을 생성합니다). git에게 원격 저장소의 변경을 합쳤다고 알려주는 방법중에 하나입니다. 이제 원격 브랜치가 여러분 브랜치의 *부모*기 되었기때문입니다, 여러분의 커밋이 원격 브랜치의 모든 커밋을 반영했다는 뜻이죠.",
            "",
            "눈으로 확인해봅시다..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "리베이스대신 병합을하면..."
          ],
          "afterMarkdowns": [
            "Boom! `git fetch`로 원격 저장소의 변경정보를 가져오고, 새 작업을 우리 작업으로 *병합*했습니다 (원격 저장소의 변경을 반영하기 위해서죠), 이제 `git push`하면 끝!"
          ],
          "command": "git fetch; git merge o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "멋집니다! 명령어를 좀더 적게써서 하는 방법은 없나요?",
            "",
            "물론 있습니다 -- 여러분은 `git pull`이 fetch와 merge의 줄임 명령어라는 것은 이미 알고 있을 것입니다. 아주 간단하게, `git pull --rebase`를 하면 fetch와 리베이스를 하는 작업의 줄임 명령어 입니다",
            "",
            "이 줄임 명령어가 잘 작동하는지 확인해 봅시다"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "먼저 `--rebase`와 함께하면..."
          ],
          "afterMarkdowns": [
            "이전과 같습니다! 간결하고요."
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "일반의 `pull`과 사용했을 때는"
          ],
          "afterMarkdowns": [
            "또다시, 이전과 같습니다!"
          ],
          "command": "git pull; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "fetch를 하고 리베이스/병합을 하고 push를 하는 이런 작업흐름은 꽤 흔합니다. 앞으로의 레슨에서는 이런 작업흐름의 복잡한 버전들을 확인해볼 것입니다. 일단은 이것부터 연습해 보죠.",
            "",
            "이번 레벨을 통과하려면, 다음의 단계를 거쳐야 합니다:",
            "",
            "* 여러분의 저장소를 clone 하세요",
            "* 가짜 팀워크를 만드세요 (1개의 커밋)",
            "* 여러분의 작업도 커밋하세요 (1개의 커밋)",
            "* 여러분의 작업을 *리베이스*를 통해 공유하세요"
          ]
        }
      }
    ]
  },
  "merge-many-features-name": "원격 작업과 merge하기",
  "merge-many-features-hint": "goal을 잘 살펴보세요!",
  "merge-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 왜 merge하지 않는거죠?",
            "",
            "새로운 작업들을 원격 저장소로 push하기위해서 여러분은 원격 저장소의 최근 변경들을 *합치기*만 하면 됩니다. 이 말은 즉 원격 브랜치로(예:`o/master`) rebase를 할 수도 merge를 할 수도 있다는 것입니다.",
            "",
            "두가지를 다 할 수 있다면, 왜 지금까지 배운 레슨들은 rebase를 하는것에 집중한거죠? 원격 저장소와 작업을 할때는 왜 `merge`에게 관심을 가져주지 않는건가요?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "개발 커뮤니티에서 merge를 하는것과 rebase 사이의 트레이드 오프에 대해 많은 논의가 이루어지고 있습니다. 여기 rebase의 일반적인 장 / 단점을 소개하겠습니다:",
            "",
            "장점:",
            "",
            "* rebase는 여러분의 커밋 트리를 깔끔하게 정리해서 보기가 좋습니다 모든게 한 줄에 있기때문이죠.",
            "",
            "단점:",
            "",
            "* rebase를 하게 되면 커밋 트리의 (보이는)히스토리를 수정합니다.",
            "",
            "예를 들어, 커밋 `C1`는 *과거*의`C3`로 rebase 될 수 있습니다. `C1'`의 작업이 `C3`의 다음에 있는것으로 보이게 되는겁니다. 실제로는 `C1`이 먼저 완료된거인데 말이죠.",
            "",
            "어떤 개발자들은 이력이 보존되는것을 좋아하기 때문에 merge를 선호합니다. 그 이외는(저 처럼) 커밋 트리가 깔끔한것을 선호해서 rebase를 선호합니다. 자기 입맛에 맞추면 되겠습니다 :D"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이번 레벨에서는 이전의 레벨을 해결 해봅시다. 대신 이번에는 *merge*를 사용하겠습니다. 조금 복잡할 수 있지만 지금 배운 내용의 포인트를 파악하기 좋을것 입니다."
          ]
        }
      }
    ]
  },
  "pull-name": "Git pull",
  "pull-hint": "그냥 git pull을 하세요!",
  "pull-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Pull",
            "",
            "자 우리는 원격 저장소에서 `git fetch`로 어떻게 데이터를 내려 받는지 보았습니다. 이제 우리의 작업을 업데이트해서 변경들을 반영해 봅시다!",
            "",
            "사실 이걸 하는 방법은 여러가지 있습니다 -- 새 커밋들을 로컬에 내려받은 이후에는 그냥 다른 브랜치에있는 일반 커밋처럼 활용할 수 있습니다. 이런 명령들을 실행할 수 있다는 뜻 입니다 :",
            "",
            "* `git cherry-pick o/master`",
            "* `git rebase o/master`",
            "* `git merge o/master`",
            "* 기타 등등",
            "",
            "사실 원격 저장소의 변경을 *fetch*하고 그이후에 *merge*하는 작업의 과정이 워낙 자주있는 일이라서 git은 이 두가지를 한번에 하는 명령을 제공합니다! 이 명령어는 `git pull` 입니다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "먼저 `fetch` 와 `merge`가 차례로 실행되는것을 확인해 봅시다"
          ],
          "afterMarkdowns": [
            "Boom -- 우리는 `C3`를 `fetch`로 내려 받고 `git merge o/master`로 우리의 작업으로 병합했습니다. 이제 우리의 `master` 브랜치는 원격 저장소의 새 작업들을 반영하게 됩니다(지금 사례에서 `origin`입니다)."
          ],
          "command": "git fetch; git merge o/master",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "대신에 `git pull`을 사용하면 어떻게 될까요?"
          ],
          "afterMarkdowns": [
            "똑같은 일이 일이납니다! 이렇게 `git pull`은 본질적으로 `git fetch`후에 내려받은 브랜치를 병합하는 과정의 단축입니다. 확실하게 느껴지죠?."
          ],
          "command": "git pull",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "`git pull`의 세부적인 사항들은 나중에 알아보겠습니다 (옵션과 매개변수등) 지금은 이 레벨에서 일단 시도부터 해 봅시다.",
            "",
            "알고 넘어갑시다 -- 이 레벨을 그냥 `fetch`와 `merge`의 조합으로 해결할 수 있습니다. 하지만 명령어가 추가되겠지요 :P"
          ]
        }
      }
    ]
  },
  "pull-args-name": "pull 인자들",
  "pull-args-hint": "fetch/pull 과 인자들로 새 로컬 브랜치를 생성할수 있다는것을 기억하세요.",
  "pull-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git pull의 인자들",
            "",
            "`git fetch`와 `git push`의 인자들을 다 알았기 때문에, git pull에서 더 설명할게 사실 없습니다 :)",
            "",
            "git pull은 결국 merge가 따라오는 fetch 그 자체이기 때문이죠. git fetch와 *같은* 인자를 사용하며 커밋들을 *어디*로 merge되는지 알면 됩니다.",
            "",
            "정신나간것마냥-복잡한 인자들도 기본적으로는 똑같다고 보면 됩니다. 예시를 살펴봅시다:"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "git에서 다음 명령어들은 같습니다:",
            "",
            "`git pull  origin foo` 는 다음과 같습니다:",
            "",
            "`git fetch origin foo; git merge o/foo`",
            "",
            "그리고...",
            "",
            "`git pull  origin bar~1:bugFix` 는 다음과 같습니다:",
            "",
            "`git fetch origin bar~1:bugFix; git merge bugFix`",
            "",
            "보이죠? git pull은 그저 fetch + merge의 축양형일 뿐이에요, 그리고 git pull은 커밋들이 도착하는곳을 신경씁니다(fetch를 하며 지정된 `destination`인자의 위치로 merge가 수행됩니다).",
            "",
            "직접 확인해봅시다:"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "place를 지정하면, 이전에 fecth를 하던때와 완전히 똑같이 진행되고 fetch한것을 병합합니다."
          ],
          "afterMarkdowns": [
            "보이죠! `master`를 지정해서 우리는 `o/master`에 평소처럼 커밋들을 내려받았습니다. 그다음 우리가 있는 곳으로 `o/master`를 병합했습니다 현재 체크아웃된 브랜치와 *상관없이* 말이죠"
          ],
          "command": "git pull origin master",
          "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "source 와 destination 모두 적용될까요? 추측해보세요! 확인해봅시다:"
          ],
          "afterMarkdowns": [
            "이야, 명령어 하나에 많은게 일어나고있습니다. 로컬에 이름이 `foo`인 새 브랜치를 만들고, 원격 저장소의 master에서 이 브랜치 `foo`에 커밋들을 내려받습니다, 그후 그 브랜치를 우리가 현재 체크아웃한 브랜치 `bar`로 병합했습니다. 오오오!!!"
          ],
          "command": "git pull origin master:foo",
          "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "좋습니다 마무리하기 위해, 골 시각화와 같은 상태로 만들어 주세요. 커밋을 내려받고, 새 브랜치를 만들고, 그 브랜치들을 다른 브랜치로 병합해야 될겁니다, 하지만 명령어는 그렇게 많이 안써도 되죠 :P"
          ]
        }
      }
    ]
  },
  "push-name": "Git push",
  "push-hint": "push를 하기전에 clone을 먼저해야 된다는것을 기억하세요!",
  "push-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Push",
            "",
            "좋아요, 원격 저장소에서의 변화들을 가져오는 방법도 알고 로컬의 내 작업과 합칠줄도 알게되었습니다. 아주 좋아요.. 좋은데 이제 _나의_ 훌륭한 작업을 다른 사람들과 공유하려면 어떻게 해야되는거죠?",
            "",
            "공유된 작업을 내려받는것의 반대는 작업을 업로드해 공유하는것입니다. 그렇다면 `git pull` 당기기의 반대는? `git push` 미는겁니다!",
            "",
            "`git push`는 _여러분의_변경을 정한 원격저장소에 업로드하고 그 원격 저장소가 여러분의 새 커밋들을 합치고 갱신하게 합니다. `git push`가 끝나고 나면, 여러분의 친구들은 원격저장소에서 여러분의 작업을 내려받을수 있게됩니다.",
            "",
            "여러분은 `git push`를 작업을 \"공개\"하는 과정이라고 생각해도 될것입니다. 곧 알아볼 중요한 세부 요소들이 잔뜩 있지만, 일단은 아기 걸음으로 시작해봅시다...",
            "",
            "*노트 -- `git push`를 매개변수 없이 사용하는 디폴트 행동은 `push.default`라 불리는 git의 설정에 따라 결정 됩니다. 이 설정의 기본값은 여러분이 사용하는 git 버전에 따라 다릅니다만, 우리 강의에서는 `upstream`을 값으로 사용합니다. 대단한것은 아니지만, 여러분이 프로젝트를 push하기전에 한번쯤 확인해볼 가치가 있습니다.*"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "여기 원격저장소에는 없는 변경이 있습니다. 이것들을 업로드 해 봅시다!"
          ],
          "afterMarkdowns": [
            "자 됬습니다 -- 원격 저장소가 커밋 `C2`를 받았고, 원격 저장소의 브랜치 `master`가 `C2`라는 지점까지 갱신 되었습니다. 그리고 원격 저장소의 반영인 *우리의* 원격 브랜치 (`o/master`)또한 잘 갱신 되었습니다. 모든게 동기화되어 있습니다!"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이번 레벨을 마치기 위해, 두개의 새 커밋을 원격 저장소에 공유해봅시다. 마음의 준비를 단단히 하세요, 이제부터 강의들이 훨씬 어려워질거니까요!"
          ]
        }
      }
    ]
  },
  "push-args-name": "git push의 인자들",
  "push-args-hint": "대화창의 마지막 슬라이드를 \"objective\"로 다시 볼 수 있습니다.",
  "push-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Push의 인자들",
            "",
            "좋습니다! 여러분은 이제 원격 추적 브랜치도 알고 있기 때문에 이제 git push, fetch, pull이 어떻게 작동하는지에 관한 숨겨져있는 미스테리를 풀어나갈 준비가 되었습니다. 한번에 하나의 명령어를 알아보도록하겠는데 이것들이 가지고있는 컨셉은 아주 비슷해요.",
            "",
            "먼저 `git push`입니다. 여러분은 push를 하면 git이 push를 할 대상으로 원격저장소, 브랜치를 현재 작업중인 브랜치에 설정된 속성(\"추적\" 대상)을 통해 알아낸다는것을 이전 추적 레슨에서 배웠습니다. 이것은 인자를 넣지않고 실행할 때 일어나는것 입니다, 그런데 git push에 다음과 같은 형식으로 선택적으로 인자를 사용할수도 있습니다:",
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
            "`<place>`인자가 무엇을 의미할것 같나요? 세부사항은 알아보기 전에 예시부터 봅시다. 다음 명령어를 보세요:",
            "",
            "`git push origin master`",
            "",
            "해석해 보면:",
            "",
            "*내 저장소에 있는 \"master\"라는 이름의 브랜치로 가서 모든 커밋들을 수집합니다, 그다음 \"origin\"의 \"master\"브랜치로 가서 이 브랜치에 부족한 커밋들을 채워 넣고 완료 되면 알려줍니다.*",
            "",
            "`master`를 \"place\"인자로 지정해서 우리가 git에게 *어디서부터* 커밋이 오는지, 그리고 *어디로* 커밋이 가야하는지 알려줍니다. 두 저장소간에 동기화 작업을 할 \"장소\"를 지정해 주는것이라고 볼 수 있습니다.",
            "",
            "git이 알아야 할 것은 다 알려줬기 때문에(두 인자를 모두 지정했죠), git은 현재 우리가 체크아웃한 브랜치는 무시하고 명령을 수행합니다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "인자를 지정해주는 예제를 눈으로 직접 확인해 봅시다. 이 예제에서 우리가 체크아웃한 곳이 어디인지를 주의하며 봅시다."
          ],
          "afterMarkdowns": [
            "됬네요! 지정해준 인자들에 의해 원격 저장소의 `master`가 갱신 되었습니다."
          ],
          "command": "git checkout C0; git push origin master",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "인자를 지정하지 않으면 어떻게 될까요?"
          ],
          "afterMarkdowns": [
            "명령이 실패하며(보시다시피), `HEAD`가 원격저장소를 추적하는 브랜치에 체크아웃 되있지 않기 때문이죠."
          ],
          "command": "git checkout C0; git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "좋습니다, 이번 레벨에서는 원격저장소의 `foo`, `master`브랜치 모두 갱신해봅시다. 이번 문제는 `git checkout`이 비활성화 되있다는 점이 특징이죠!",
            "",
            "*노트: 원격 브랜치들은 `o/`접두어로 분류되어 있습니다. `origin/`으로 생략없이 표현하면 UI에 안맞아서 이렇게 표현했어요. ",
            "그래서... 원격저장소 이름은 원래처럼 `origin`으로 써주세요.*"
          ]
        }
      }
    ]
  },
  "push-args2-name": "git push 인자 -- 확장판!",
  "push-args2-hint": "혹시 아세요? 패배를 인정하고 \"show solution\"을 입력할 수 있다는 걸요 :P",
  "push-args2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## `<place>` 인자에 대한 세부사항들",
            "",
            "",
            "기억하세요? 이전 강의에서 우리는 `master`를 커밋의 근원이되는 *source*와 목적지가 되는 *destination*으로 명령어의 인자로 넣어줌으로써 지정해줬습니다.",
            "여러분은 이런 생각이 들 수 있어요 -- 내가 source와 destination이 다르길 원하면 어떻게 해야되지? 로컬의 `foo` 브랜치에서 원격의 `bar` 브랜치로 커밋을 push하고 싶으면 어떻게 해야 되지?",
            "",
            "사실 git에서는 그게 불가능합니다... 네 농담이고! 당연 가능합니다 :)... git의 어마무시하게 유연합니다(지나칠정도로요).",
            "",
            "어떻게 하는지는 다음 슬라이드에서 확인해봅시다..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "source와 destination을 모두 지정하기 위해서는, 이렇게 간단히 두개를 콜론을 사이에 두고 표현하면 됩니다.",
            "",
            "`git push origin <source>:<destination>`",
            "",
            "이것을 일반적으로 colon refspec(콜론 참조스펙)이라고 부릅니다. 참조스펙은 그냥 \"git이 알아낼 수 있는 위치\"를 이름 붙여서 말하는거에요 (브랜치 'foo'라던가 HEAD~1 라던가)",
            "",
            "source와 destination을 따로 지정할 수 있게 되면서, 이제 원격관련 명령어를 좀 멋지고 정확히 사용할수 있게 되었어요. 데모를 봅시다!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "기억하세요, `source`는 git이 이해하는 아무 위치를 말합니다.:"
          ],
          "afterMarkdowns": [
            "워 뭔가 잘 안쓸것 같은 명령이지만 잘 됩니다 -- git은 `foo^`의 위치를 알아내서 원격 저장소에 아직 반영되지 않은 커밋들을 업로드하고 destination 브랜치를 갱신했습니다."
          ],
          "command": "git push origin foo^:master",
          "beforeCommand": "git clone; go -b foo; git commit; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "만약 여러분이 push하고 싶은 destination(목적지)가 없으면 어떻게하죠? 아무 문제 없어요! git이 만들 새 브랜치 이름을 지어주면 git이 원격 저장소에 새 브랜치를 만들어 줄거에요."
          ],
          "afterMarkdowns": [
            "좋네요, 번지르르 삐까뻔쩍 :D"
          ],
          "command": "git push origin master:newBranch",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이번 레벨에서는, goal 시각화에 나오는 것처럼 만들어 주세요 인자의 형식은 다음과 같다는걸 기억하세요:",
            "",
            "`<source>:<destination>`"
          ]
        }
      }
    ]
  },
  "push-many-features-name": "Push Master!",
  "push-many-features-hint": "명령어를 undo와 reset으로 되돌릴 수 있다는 것을 잊지마세요",
  "push-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## feature 브랜치 병합하기",
            "",
            "이제 여러분은 fetch, pull, push하는데에 익숙해졌을겁니다. 연마한 기술들을 새로운 상황에서 시험 해봅시다.",
            "",
            "개발자들은 주로 큰 프로젝트를 개발할때 작업을 feature 브랜치(=토픽브랜치 / `master`브랜치가 아닌 작업을위해 임시로 만든 브랜치를 말합니다)들에 하고 준비가 되면 그 작업을 통합합니다. 이전 강의와 비슷한 모습인데(사이드 브랜치들을 원격저장소로 push한것), 여기서 한 단계 더 나아가 봅시다. ",
            "",
            "어떤 개발자들은 `master` 브랜치에 있을때만 push와 pull을 수행합니다 -- 이렇게하면 `master`는 항상 원격 브랜치 (`o/master`)의 상태와 항상 최신의 상태로 유지될 수 있습니다.",
            "",
            "이런 작업흐름은 두가지 작업을 같이하게됩니다 :",
            "",
            "* feature 브랜치의 작업을 master로 통합하는것과",
            "* 원격저장소에서 push하고 pull하는 작업입니다"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "다음을 보고 `master`를 갱신하고 작업을 push하는 방법을 다시 떠올려봅시다."
          ],
          "afterMarkdowns": [
            "여기서 우리는 두개의 명령어를 실행 했습니다 :",
            "",
            "* 우리의 작업을 원격 저장소의 새 커밋들로 리베이스한 후",
            "* 우리 작업을 원격저장소로 push했습니다."
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이번 레벨은 꽤 덩치가 큽니다 -- 문제에대한 대략적인 설명을 해드리겠습니다 :",
            "",
            "* 세개의 feature 브랜치가 있습니다 -- `side1`, `side2` 그리고 `side3` 가 있습니다.",
            "* 각각의 브랜치를 순서에 맞게 원격 저장소로 push하고 싶습니다.",
            "* 원격 저장소가 최근에 갱신된적이 있기때문에 그 작업또한 포함시켜야 합니다.",
            "",
            ":O 이야 할게 많습니다! 행운을 빕니다, 이번 레벨은 많은걸 요구합니다."
          ]
        }
      }
    ]
  },
  "remote-branches-name": "원격 브랜치(remote branch)",
  "remote-branches-hint": "순서에 주의하세요 -- master에서 먼저 커밋하세요!",
  "remote-branches-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git 원격 브랜치",
            "",
            "이제 `git clone`을 직접 확인 해 보셨습니다. 이제 무엇이 변했는지 살펴 봅시다.",
            "",
            "가장 먼저 알아차릴만한 변화는 우리의 로컬 저장소에 `o/master`라고하는 새 브랜치가 생긴겁니다. 이런 종류의 브랜치는 _원격_브랜치라고 불립니다; 원격 브랜치는 특정한 목적을 제공하기 때문에 특별한 속성들이 있습니다.",
            "",
            "원격 브랜치는 원격 저장소의 _상태_를 반영합니다(가장 최근 원격 원격저장소와 작업을 했을때를 기준으로). 원격 브랜치는 로컬에서의 작업과 공개적으로 되고있는 작업의 차이를 이해하는데 도와줍니다 -- 다른 사람들과 작업을 공유하기전에 반드시해야할 과정이죠.",
            "",
            "원격 브랜치는 체크 아웃을 하게 되면 분리된 `HEAD` 모드로 가게되는 특별한 속성이 있습니다. Git은 여러분이 이 브랜치들에서 직접 작업할 수 없기 때문에 일부로 이렇게 합니다; 여러분은 다른곳에 작업을 하고 원격 저장소와 여러분의 작업을 공유해야합니다(그 이후에 원격 브랜치가 갱신됩니다)."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### `o/`가 뭐죠?",
            "",
            "여러분은 원격 브랜치들 앞에 붙는 `o/`가 뭔지 궁금할 것입니다. 음, 원격 브랜치 또한 (필수적인) 이름짓기 규약이 있습니다 -- 다음의 형식으로 나타납니다:",
            "",
            "* `<remote name>/<branch name>`",
            "",
            "이런 이유로, 만약 `o/master`라는 이름의 브랜치를 보게되면, 브랜치의 이름은 `master`이고 원격 저장소의 이름은 `o`인겁니다.",
            "",
            "대부분의 개발자들은 자신의 주 원격 저장소를 `o`가 아닌 `origin`이라고 짓습니다. 사실 보통 다 이렇게 쓰기 때문에 git은 저장소를 `git clone`하게 되면 원격 저장소의 이름을 `origin`이라고 자동으로 설정해놓습니다.",
            "",
            "부득이하게도 `origin`이라는 풀네임은 우리 UI에 안 맞아서 `o`로 간략히 표현하겠습니다 :( 진짜 git을 사용하게되면 여러분의 원격저장소가 아마 `origin`이라고 되있다는것을 알아두세요!",
            "",
            "머리속에 넣기엔 너무 많이 떠든것 같습니다. 직접 확인해 봅시다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "원격 브랜치를 체크아웃하고 무엇이 일어나는지 확인해 봅시다"
          ],
          "afterMarkdowns": [
            "보이는것 처럼, git은 우리를 분리된 `HEAD` 모드로 만들고 새로운 커밋을 추가해도 `o/master`를 갱신하지 않습니다. 이것은 `o/master`가 원격 저장소가 갱신될때만 갱신되기 때문입니다."
          ],
          "command": "git checkout o/master; git commit",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "다음 레벨로 가기 위해서는 `master`에서 한번 커밋하고 `o/master`를 체크아웃 하고 다시 한번 커밋을 하세요. 이를 통해서 원격 브랜치가 어떻게 다르게 작동하는지 알아보고, 원격 브랜치는 원격 저장소의 상태를 반영하기만 한다는것을 이해해 봅시다."
          ]
        }
      }
    ]
  },
  "source-nothing-name": "Source가 없다",
  "source-nothing-hint": "branch 명령이 비활성화 되어있습니다. fetch를 사용해야 되요!",
  "source-nothing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "###`<source>`의 이상함",
            "",
            "Git은 `<source>` 인자를 두가지 방법으로 이상하게 사용합니다. 이 두가지 오용은 여러분이 git push와 git fetch에 `source`에 \"없음\"을 지정할 수 있기 때문에 나타납니다. \"없음\"을 지정하는 방법은 인자로 아무것도 안쓰면 됩니다:",
            "",
            "* `git push origin :side`",
            "* `git fetch origin :bugFix`",
            "",
            "위에 처럼 말이죠, 뭘 할 수 있는지 확인해봅시다..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "\"없음\"을 원격 브랜치로 push하면 무엇을 할까요? 원격저장소의 그 브랜치를 삭제합니다!"
          ],
          "afterMarkdowns": [
            "됬습니다, 원격 저장소의 `foo`브랜치를 성공적으로 삭제했습니다. \"없음\"을 push한다는것이 이것을 이뤘습니다. 흠 말이 되는것 같네요 null을 push했어요..."
          ],
          "command": "git push origin :foo",
          "beforeCommand": "git clone; git push origin master:foo"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "마지막으로, \"nothing\"을 fetch하면 로컬에 새 브랜치를 만듭니다"
          ],
          "afterMarkdowns": [
            "기괴합니다... 뭐어때요. git이 이런데요 뭐!"
          ],
          "command": "git fetch origin :bar",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "이번 레벨은 금방 넘어가는 레벨입니다 -- 원격저장소의 브랜치하나를 삭제하고 `git fetch`를 이요해서 새 브랜치를 만들어보세요!"
          ]
        }
      }
    ]
  },
  "tracking-name": "원격 저장소 추적하기",
  "tracking-hint": "원격 추적하기를 설정하는데에는 두가지 방법이 있습니다!",
  "tracking-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 원격-추적 브랜치",
            "",
            "지난 몇개의 레슨에서 \"마법\"처럼 보일 수 있는게 하나 있었는데, git이 `master`브랜치가 `o/master`와 연관 되어있는걸 안다는 것입니다. 물론 이 두 브랜치가 이름이 비슷하기 때문에 로컬 `master`브랜치가 원격의 `master`브랜치와 연결 되어있다고 하자면 어찌 논리적으로 말이 되긴 합니다만..., 이 연결은 두가지 시나리오를 통해 뚜렷하게 확인이 됩니다:",
            "",
            "* pull 작업을 하는 도중, 커밋들은 `o/master`에 내려받아 지고 그다음 `master` 브랜치로 *merge*됩니다. merge에서 내재된 타겟은 이 연결에서 결정합니다.",
            "* push 작업을 하는 도중, `master` 브랜치의 작업은 원격의 `master`브랜치(로컬에서 `o/master`로 표현되는)로 push 됩니다. push의 *목적지*는 master와 `o/master`의 연결에서 결정됩니다.",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 원격 추적",
            "",
            "간단히 말해서, 이 `master`와 `o/master`사이의 연결은 브랜치의 \"원격 추적\" 속성을 통해 간단하게 설명됩니다. `master`브랜치는 `o/master`브랜치를 추적하도록 설정되어 있습니다 -- 이것은 `master`가 merge와 push할 내재된 목적지가 생겼다는 뜻 입니다.",
            "",
            "여러분은 어떻게 이 속성을 지정해주는 그 어떤 명령어 없이 `master` 브랜치에 설정되있는지 궁금할것 입니다. 사실, 여러분이 git으로 저장소를 clone할때 이 속성이 여러분을 위해 자동으로 설정 됩니다.",
            "",
            "clone을 진행하면서 git은 원격 저장소에있는 모든 브랜치에 대해 로컬에 원격 브랜치를 생성합니다(`o/master`같은것들 말이죠). 그 후 원격 저장소에서 현재 active한 브랜치를 추적하는 로컬 브랜치를 생성합니다, 대부분의 경우 `master`가 됩니다.",
            "",
            "git clone이 완료되면, 여러분은 오로지 하나의 로컬 브랜치를 가지게 됩니다(부담스럽지 않도록) 물론 원격 저장소에있는 여러 다른 브랜치도 여전히 확인할 수 있습니다(호기심이 많으시다면). 로컬, 원격 저장소 양쪽에 최적화 되있는거죠!",
            "",
            "여러분이 clone을 할 때 아래의 명령어를 볼 수도 있는 이유입니다:",
            "",
            "    local branch \"master\" set to track remote branch \"o/master\""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 내 스스로 지정할수도 있나요?",
            "",
            "당연하죠! 여러분은 아무 임의의 브랜치를 `o/master`를 추적하게 만들 수 있습니다. 이렇게 하면 이 브랜치 또한 내재된 push,merge 목적지를 `master`로 할 것입니다. 여러분은 이제 `totallyNotMaster`라는 브랜치에서 `git push`를 수행해서 원격 저장소의 브랜치 `master`로 작업을 push할 수 있습니다!",
            "",
            "이 속성을 설정하는데에는 두가지 방법이 있습니다. 첫 번째는 지정한 원격 브랜치를 참조해서 새로운 브랜치를 생성하여 checkout 하는 방법 입니다. 다음을 실행하면",
            "",
            "`git checkout -b totallyNotMaster o/master`",
            "",
            "`totallyNotMaster`라는 이름의 새 브랜치를 생성하고 `o/master`를 추적하게 설정합니다."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "설명은 충분히 한듯 합니다. 직접 확인해 봅시다! `foo`라는 이름의 새 브랜치를 checkout하고 이것을 원격 저장소의 `master`를 추적하도록 설정하겠습니다."
          ],
          "afterMarkdowns": [
            "보이듯이, 우리는 `o/master`를 `foo` 브랜치를 갱신하기 위한 내재된 merge 타겟으로 사용하고 있습니다. master가 갱신되지 않는다는것을 눈치챘죠?"
          ],
          "command": "git checkout -b foo o/master; git pull",
          "beforeCommand": "git clone; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "git push에도 적용이 됩니다"
          ],
          "afterMarkdowns": [
            "Boom. 브랜치의 이름을 전혀 다른것으로 지었는데도 불구하고 우리 작업이 `master`로 push 되었습니다."
          ],
          "command": "git checkout -b foo o/master; git commit; git push",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 방법 #2",
            "",
            "브랜치에 원격 추적 설정을 하는 또 다른 방법으로는 간단하게 `git branch -u` 옵션을 사용하는 방법이 있습니다. 다음을 실행하면",
            "",
            "`git branch -u o/master foo`",
            "",
            "가 `foo` 브랜치가 `o/master`를 추적하도록 설정합니다. 만약 `foo`가 현재 작업하고 있는 브랜치라면 생략해도 됩니다:",
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
            "자 이 다른 방법이 작동하는 모습을 확인해 봅시다..."
          ],
          "afterMarkdowns": [
            "이전과 같습니다,  좀 더 분명하게 알 수 있느 명령어죠. 좋아요!"
          ],
          "command": "git branch -u o/master foo; git commit; git push",
          "beforeCommand": "git clone; git checkout -b foo"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            " 이번 레벨에서는 로컬의 `master`브랜치가 아닌 다른 브랜치에서 작업을 원격 저장소의 `master`브랜치로 push하세요. 고급 과정이니 더 길게 설명하지는 않을게요 :p"
          ]
        }
      }
    ]
  },
  "sequence-intro-display": "git 기본",
  "sequence-intro-about": "git의 주요 명령어를 깔끔하게 알려드립니다",
  "sequence-rampup-display": "다음 단계로",
  "sequence-rampup-about": "git은 아주 멋져요. 왜 멋진지 알려드립니다",
  "sequence-remote-display": "Push & Pull -- Git 원격 저장소!",
  "sequence-remote-about": "내 코드를 공개할 때가 되었습니다. 코드를 공개해봅시다!",
  "sequence-remote-advanced-display": "\"origin\"그 너머로 -- 고급 Git 원격 저장소",
  "sequence-remote-advanced-about": "자비로운 독재자가 되는게 재밌을 줄 알았겠지만...",
  "sequence-move-display": "코드 이리저리 옮기기",
  "sequence-move-about": "작업 트리를 수정하는건 식은죽 먹기지요 이제",
  "sequence-mixed-display": "종합선물세트",
  "sequence-mixed-about": "Git을 다루는 다양한 팁과 테크닉을 다양하게 알아봅니다",
  "sequence-advanced-display": "고급 문제",
  "sequence-advanced-about": "용기있는 도전자를 위해 준비한 문제입니다",
  "dialogs-level-builder": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 레벨 생성기 입니다. 환영합니다!",
          "",
          "Here are the main steps:",
          "",
          "  * git 명령어로 초기 환경을 만들어주세요",
          "  * 시작 트리를 ```define start```로 정의하세요",
          "  * (최적화된)정답을 만드는 git 명령어들을 입력하세요",
          "  * 골 트리를 ```define goal```로 정의해주세요. 골을 정의하면 정답도 같이 정의됩니다",
          "  * ```define hint```로 원하면 힌트도 정의해줄수 있습니다",
          "  * 문제의 이름을 ```define name```로 수정하세요",
          "  * 시작 글이 필요하다면 ```edit dialog```로 쓸 수 있습니다",
          "  * ```finish```로 여러분의 레벨을 JSON결과로 받을 수 있습니다!"
        ]
      }
    }
  ],
  "dialogs-next-level": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 훌륭합니다!!",
          "",
          "*{numCommands}*개의 명렁으로 레벨을 통과했습니다.; ",
          "모범 답안은 {best}개를 사용합니다."
        ]
      }
    }
  ],
  "dialogs-sandbox": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Git 브랜치 배우기를 시작합니다!",
          "",
          "이 애플리케이션은 git을 쓸 때 필요한 브랜치에 대한 개념을",
          "탄탄히 잡게끔 도와드리기 위해 만들었습니다. 재밌게 사용해주시기를",
          "바라며, 무언가를 배워가신다면 더 기쁘겠습니다!",
          "",
          "이 애플리케이션은 [Peter Cottle](https://github.io/pcottle)님의 [LearnGitBranching](https://pcottle.github.io/learnGitBranching/)를 번역한 것입니다.",
          "아래 데모를 먼저 보셔도 좋습니다.",
          "",
          "<https://pcottle.github.io/learnGitBranching/?demo&locale=ko>"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Git 명령어",
          "",
          "연습 모드에서 쓸 수 있는 다양한 git명령어는 다음과 같습니다",
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
          "## 공유해주세요!",
          "",
          "`export tree` 와 `import tree`로 여러분의 친구들에게 트리를 공유해주세요",
          "",
          "훌륭한 학습 자료가 있으신가요? `build level`로 레벨을 만들어 보시거나, 친구의 레벨을 `import level`로 가져와서 실험해보세요",
          "",
          "이제 레슨을 시작해봅시다..."
        ]
      }
    }
  ],
  "finish-dialog-finished": "와우! 마지막 레벨까지 마쳤습니다. 멋지네요!",
  "finish-dialog-next": "다음 레벨로 넘어갈까요? 레벨 *\"{nextLevel}\"*",
  "finish-dialog-win": "멋져요! 우리의 해답과 일치하거나 우리보다 좀 더 나은 해답입니다.",
  "finish-dialog-lose": "{best}회로 줄일 수 있다면 해보세요. :D",
  "hg-prune-tree": "주의! Mercurial은 공격적으로 가비지 컬렉션을 수행하므로 트리를 정리할 필요가 있습니다.",
  "hg-a-option": "이 앱에선 -A 옵션은 필요 없습니다. 그냥 커밋하세요!",
  "hg-error-no-status": "이 앱을 위한 상태 명령어는 없습니다. 왜냐하면 파일들의 스테이징이 없기 때문입니다. 대신 hg summary를 시도해보세요.",
  "hg-error-need-option": "나는 그 명령어를 위한 {option} 옵션이 필요합니다.",
  "hg-error-log-no-follow": "-f가 없는 hg log는 현재 지원되지 않습니다. -f를 사용하세요.",
  "git-status-detached": "분리된 HEAD!",
  "git-status-onbranch": "분기 지점 {branch}에서",
  "git-status-readytocommit": "커밋을 준비하세요! (이 데모에서는 항상)",
  "git-dummy-msg": "빨리 커밋하세요!",
  "git-error-origin-fetch-uptodate": "이미 최신 상태입니다!",
  "git-error-origin-fetch-no-ff": "당신의 오리진 브랜치가 원격 브랜치와 동기화되지 않았고, 패치를 실행할 수 없습니다.",
  "git-error-origin-push-no-ff": "원격 레포지토리가 당신의 로컬 레포지토리에서 분기하므로, 변경 사항을 업데이트 하는것은 간단한 fast forward가 아닙니다(따라서 push가 거절될 것입니다.). 원격 레포지토리에서의 변경 사항을 내려 받아 이 브랜치에 합쳐라. 그리고 이걸 반복하라. 당신은 git pull 또는 git pull --rebase를 사용해 이를 수행할 수 있다.",
  "git-error-remote-branch": "당신은 원격 브랜치에서 그 명령어를 실행시킬 수 없다.",
  "git-error-origin-required": "그 명령어를 위한 오리진이 필요하다.",
  "git-error-origin-exists": "오리진이 이미 존재합니다! 당신은 새로 만들 수 없습니다.",
  "git-error-branch": "당신은 마스터 브랜치, 당신이 현재 사용중인 브랜치, 또는 브랜치가 아닌 것들을 삭제할 수 없습니다.",
  "git-merge-msg": "{target}을 {current}에 병합하세요.",
  "git-error-rebase-none": "rebase를 하기 위한 커밋이 없습니다! 모든 커밋과 변경 사항들의 병합은 이미 적용되었습니다.",
  "git-result-nothing": "할게 없습니다 ...",
  "git-result-fastforward": "Fast forward 중입니다...",
  "git-result-uptodate": "브랜치가 이미 최신 상태입니다.",
  "git-error-exist": "{ref} 참조가 존재하지 않거나 알 수 없습니다.",
  "git-error-relative-ref": "커밋 {commit}은 {match}를 가지고 있지 않습니다.",
  "git-warning-detached": "주의! 분리된 HEAD 상태",
  "git-warning-add": "이 데모에서는 파일을 추가할 필요가 없습니다.",
  "git-error-options": "당신이 지정한 그 옵션들은 호환되지 않거나 올바르지 않습니다.",
  "git-error-already-exists": "커밋 {commit}은 이미 당신의 변경 내역에 존재합니다. 중단!",
  "git-error-reset-detached": "분리된 HEAD에서 reset할 수 없습니다. 만약 이동시키기를 원한다면 checkout을 사용하세요.",
  "git-warning-hard": "LearnGitBranching에서 reset의 기본 설정은 옵션은 --hard입니다. 우리 레슨에서는 이 옵션을 생략해도 됩니다. 다만 실제 Git의 기본 설정 옵션은 --mixed라는것만 기억하세요.",
  "git-error-staging": "여기엔 파일을 추가하거나 스테이징한다는 개념이 없습니다. 따라서 그 옵션 또는 명령어는 유효하지 않습니다.",
  "git-revert-msg": "{oldCommit}:{oldMsg}를 복구중입니다.",
  "git-error-args-many": "{what}을 위해 최대 {upper}개의 인자를 받습니다.",
  "git-error-args-few": "{what}을 위해 최소 {lower}개의 인자를 받습니다.",
  "git-error-no-general-args": "그 명령어는 일반적으로 인자를 받지 않습니다.",
  "copy-tree-string": "다음 트리 문자열을 복사하세요.",
  "learn-git-branching": "깃 브랜칭을 배워봅시다.",
  "select-a-level": "레벨을 선택하세요.",
  "main-levels-tab": "메인",
  "remote-levels-tab": "원격",
  "branch-name-short": "미안하지만, 우리는 시각적으로 더 좋게 보기위해 짧은 브랜치명이 필요합니다. 당신의 브랜치명은 9자리로 잘라 \"{branch}\"로 만들었습니다.",
  "bad-branch-name": "\"{branch}\"라는 브랜치명은 사용할 수 없습니다.",
  "bad-tag-name": "\"{tag}\"라는 태그명은 사용할 수 없습니다.",
  "option-not-supported": "\"{option}\"(이)라는 옵션은 지원하지 않습니다.",
  "git-usage-command": "git <명령어> [<인자들>]",
  "git-supported-commands": "지원되는 명령어들:",
  "git-usage": "사용법",
  "git-version": "Git Version PCOTILE.1.0",
  "flip-tree-command": "트리 뒤집는중...",
  "refresh-tree-command": "트리 다시 불러오는중...",
  "locale-command": "로케일이 {locale}로 설정되었습니다.",
  "locale-reset-command": "로케일이 {locale}로 초기화 되었습니다.",
  "show-command": "더 많은 정보를 위해 다음 명령어들중 하나를 사용하세요.",
  "show-all-commands": "여기에 사용 가능한 모든 명령어들의 리스트가 있습니다.",
  "cd-command": "디렉토리가 \"/directories/dont/matter/in/this/demo\"로 변경되었습니다.",
  "ls-command": "DontWorryAboutFilesInThisDemo.txt (이_데모에서_파일에_대한_걱정은_하지마세요.txt)",
  "mobile-alert": "LGB는 모바일에서 입력을 받을 수 없습니다. 데스크톱으로 접속하세요! 이것은 가치가 있습니다. :D",
  "share-tree": "친구들과 이 트리를 공유하세요! 그들은 \"import tree\"를 사용해 이를 로드할 수 있습니다.",
  "paste-json": "아래에 JSON blob을 붙여넣으세요.",
  "solved-map-reset": "해결된 지도가 초기화 되었습니다. 당신은 깨끗한 상태에서 시작합니다.",
  "level-cant-exit": "당신은 샌드박스에 있습니다. \"levels\"를 사용하여 레벨을 시작하세요.",
  "level-no-id": "id \"{id}\"에 대한 레벨이 존재하지 않습니다. 레벨 선택 화면을 열어보세요.",
  "undo-stack-empty": "되돌리기 스택이 비었습니다!",
  "already-solved": "당신은 이미 이 레벨을 해결했습니다. \"levels\"를 사용하여 다른 레벨에 도전하거나 \"sandbox\"를 사용하여 샌드박스로 돌아가세요.",
  "solved-level": "해결 완료!!\n:D",
  "command-disabled": "그 Git 명령어는 이 레벨에서 사용할 수 없습니다.",
  "share-json": "이 레벨을 위한 JSON 데이터가 있습니다! 이를 다른 사람들과 공유하거나 Github에서 제게 보내보세요.",
  "want-start-dialog": "당신은 시작 대화창을 지정하지 않았습니다. 추가 하시겠습니까?",
  "want-hint": "당신은 힌트를 지정하지 않았습니다. 추가 하시겠습니까?",
  "prompt-hint": "이 레벨을 위한 힌트를 입력하거나 만약 이를 포함시키고 싶지 않을 경우엔 비워두세요.",
  "prompt-name": "레벨 이름을 입력하세요.",
  "solution-empty": "해답이 비어있습니다. 무언가 잘못되었습니다.",
  "define-start-warning": "시작 지점을 정의하세요... 만약 그것이 먼저 정의된다면 해답과 목표가 덮어씌워질 것입니다.",
  "help-vague-level": "당신은 한 레벨에 들어가 있고, 여러가지 도움 양식들을 사용할 수 있습니다. 레슨에 대해 더 알고싶을 땐 \"help level\", LearnGitBranching을 사용하고 싶을 땐 \"help general\", 또는 레벨을 어떻게 해결해야할지 알고싶을 땐 \"objective\"를 선택하세요.",
  "help-vague-builder": "당신은 한 레벨 생성기에 들어가 있고, 여러가지 도움 양식들을 사용할 수 있습니다. \"help general\" 또는 \"help builder\"를 선택해주세요.",
  "show-goal-button": "목표 보기",
  "hide-goal-button": "목표 숨기기",
  "objective-button": "목적",
  "git-demonstration-title": "Git 데모",
  "goal-to-reach": "목표",
  "goal-only-master": "<span class=\"fwber\">Note:</span> 이 레벨에선 오직 마스터 브랜치만이 검사될 것입니다.. 다른 브랜치들은 단순히 참고용입니다. (아래에 대시 라벨로 보여집니다.). \"hide goal\"을 사용하여 언제든지 창을 숨킬 수 있습니다.",
  "hide-goal": "\"hide goal\"을 사용하여 이 창을 숨길 수 있습니다.",
  "hide-start": "\"hide start\"를 사용하여 이 창을 숨길 수 있습니다.",
  "level-builder": "레벨 생성기",
  "no-start-dialog": "이 레벨을 위한 시작 대화창이 없습니다.",
  "no-hint": "흠, 이 레벨을 위한 힌트가 없어보이는군요.",
  "error-untranslated-key": "{key}를 위한 번역은 아직 존재하지 않습니다 :( 번역에 참여해주세요!",
  "error-untranslated": "이 대화창이나 텍스트는 아직 번역되지 않았습니다. :( 번역에 참여해주세요!"
};
