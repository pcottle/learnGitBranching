exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null},\"feature\":{\"target\":\"C2\",\"id\":\"feature\",\"remoteTrackingBranchID\":\"o/feature\"},\"o/feature\":{\"target\":\"C2\",\"id\":\"o/feature\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"tags\":{},\"HEAD\":{\"target\":\"feature\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null},\"feature\":{\"target\":\"C2\",\"id\":\"feature\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"tags\":{},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git reset --hard o/main;git checkout -b feature C2; git push origin feature",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"tags\":{},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"tags\":{},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Make the feature branch from the local main before resetting it back to be the same as origin's main",
    "de_DE": "Erstelle einen Feature-Branch ausgehend vom lokalen Main-Branch, bevor du den Main-Branch auf den origin/main zurücksetzt.",
    "ru_RU": "Создайте новую feature ветвь от main перед тем, как откатить изменения в main до состояния o/main.",
    "uk": "Створіть нову feature гілку від локального main перед тим, як відкотити зміни в main до стану o/main.",
    "zh_CN": "从本地的main创建一个feature分支, 然后重置main和origin main保持一致。",
    "zh_TW": "從本地的 main 分支建一個 feature 分支, 且記得要重置(同步sync)本地 main 分支和 origin/main, 讓他們保持一致。",
    "es_ES": "Crea la rama feature desde la rama main en local antes de restablecerlo para que sea el mismo que la rama main de origen",
    "pt_BR": "Crie o ramo feature a partir do ramo main no local antes de reestabelecê-lo para que seja o mesmo que o ramo main de origem",
    "fr_FR": "Créer la branche feature à partir du main local, avant de la restaurer dans le même état que o/main",
    "ko": "로컬 저장소의 main 브랜치로부터 feature 브랜치를 만드세요. 그리고 o/main과 같아질 수 있도록 로컬 저장소의 main 브랜치를 reset 하세요.",
    "sl_SI": "Naredi feature branch iz lokalnega masterja preden ga ponastaviš, da bo enak kot origin main.",
    "es_AR": "Crea la rama feature desde la rama main en local antes de restablecerlo para que sea el mismo que la rama main de origen.",
    "ja": "mainブランチをoriginのmainと同じ状態になるようにリセットする前に、ローカルのmainからfeatureブランチを作成します。",
    "pl": "Stwórz boczną gałąź tematyczną (feature) z lokalnego main, a późnej zsynchronizuj ją z main na origin",
    "vi": "Tạo những nhánh tính năng từ nhánh cục bộ trước khi trả chúng về lại giống như o/main",
    "it_IT": "Crea il ramo per la feature a partire dal main locale prima di resettarlo al pari del main remoto"
  },
  "name": {
    "en_US": "Locked Main",
    "de_DE": "Gesperrter Main-Branch",
    "ru_RU": "Заблокированная ветвь main",
    "uk": "Заблокована гілка main",
    "zh_CN": "锁定的Main(Locked Main)",
    "zh_TW": "被鎖定的 Main(Locked Main)",
    "es_ES": "Main bloqueado",
    "pt_BR": "Main bloqueado",
    "fr_FR": "Main verrouillé",
    "ko": "잠겨버린 main 브랜치",
    "sl_SI": "Zaklenjen Main",
    "es_AR": "Main bloqueado",
    "ja": "ロックされたmain",
    "pl": "Zablokowany main",
    "vi": "Nhánh chính bị khóa (Locked Main)",
    "it_IT": "Main bloccato"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote Rejected!",
              "",
              "If you work on a large collaborative team it's likely that main is locked and requires some Pull Request process to merge changes. If you commit directly to main locally and try pushing you will be greeted with a message similar to this:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Why was it rejected?",
              "",
              "The remote rejected the push of commits directly to main because of the policy on main requiring pull requests to instead be used.",
              "",
              "You meant to follow the process creating a branch then pushing that branch and doing a pull request, but you forgot and committed directly to main. Now you are stuck and cannot push your changes."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## The solution",
              "",
              "Create another branch called feature and push that to the remote. Also reset your main back to be in sync with the remote otherwise you may have issues next time you do a pull and someone else's commit conflicts with yours."
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
              "## Gesperrter Main-Branch",
              "",
              "Wenn du in einem großen Team zusammen arbeitest, ist der Main-Branch mit hoher Wahrscheinlichkeit für direkte Änderungen gesperrt. Um Änderungen am Remote-Branch einpflegen zu können, ist ein Pull-Request-Prozess notwendig. Wenn du lokal in deinem Main-Branch einen Commit durchführst und diesen versuchst auf den serverseitigen Main-Branch zu pushen, wirst du folgende Fehlermeldung bekommen:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Wieso wurde diese Aktion zurückgewiesen?",
              "",
              "Auf Grund der serverseitig voreingestellten Richtlinien sind direkte Änderungen am Main-Branch nicht erlaubt und erfordern einen Pull-Request.",
              "",
              "Um die eigenen lokalen Änderungen in den Main-Branch einbringen zu können, ist es erforderlich einen lokalen Feature-Branch zu erstellen. Dieser Feature-Branch muss dann auf den Server hochgeladen werden, damit dann ein Pull-Request eingeleitet werden kann. Dies wurde vorher durch den direkten Push des Main-Branch nicht berücksichtigt, weswegen man die Änderungen nicht hochladen konnte."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Die Lösung",
              "",
              "Erstelle einen Branch der feature heißt und pushe diesen auf den Server. Setze den lokalen Main-Branch zurück, dass er mit dem Origin-Main-Branch synchron ist. Dies könnte sonst später zu Komplikationen führen, wenn weitere `pull`s durchgeführt und Commits von anderen mit deinen in Konflikt stehen."
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
              "## 远程服务器拒绝!(Remote Rejected)",
              "",
              "如果你是在一个大的合作团队中工作, 很可能是main被锁定了, 需要一些Pull Request流程来合并修改。如果你直接提交(commit)到本地main, 然后试图推送(push)修改, 你将会收到这样类似的信息:",
              "",
              "```",
              " ! [远程服务器拒绝] main -> main (TF402455: 不允许推送(push)这个分支; 你必须使用pull request来更新这个分支.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 为什么会被拒绝?",
              "",
              "远程服务器拒绝直接推送(push)提交到main, 因为策略配置要求 pull requests 来提交更新.",
              "",
              "你应该按照流程,新建一个分支, 推送(push)这个分支并申请pull request,但是你忘记并直接提交给了main.现在你卡住并且无法推送你的更新."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 解决办法",
              "",
              "新建一个分支feature, 推送到远程服务器. 然后reset你的main分支和远程服务器保持一致, 否则下次你pull并且他人的提交和你冲突的时候就会有问题."
            ]
          }
        }
      ]
    },
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote Rejected!",
              "",
              "Когда вы работаете в составе большой команды разработчиков над проектом, то, вероятнее всего, ветвь `main` будет _заблокирована_. Для внесения изменений в неё в git существует понятие запроса на слияние `Pull Request`. В такой ситуации если вы закоммитите свои наработки непосредственно в `main` ветвь, а после выполните `git push`, то будет сгенерировано сообщение об ошибке:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```",
              "",
              "```",
              " ! [удалённо отклонено] main -> main (TF402455: Изменение этой ветви запрещены; вы можете использовать pull request для обновления этой ветви.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Почему произошло отклонение моих изменений?",
              "",
              "Удалённый репозиторий отклонил загруженные коммиты непосредственно в `main` ветку потому, что на `main` _настроена политика_, которая требует использование `Pull request` вместо обычного `git push`.",
              "",
              "Эта политика подразумевает процесс создания новой ветви разработки, внесение в неё всех необходимых коммитов, загрузка изменений в удалённый репозиторий и _открытие нового_ `Pull request`. Однако вы забыли про это и закоммитили наработки непосредственно в `main` ветвь. Теперь вы застряли и не можете запушить свои изменения :(. "
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Решение:",
              "",
              "Создайте ещё одну ветвь под названием `feature` и отправьте изменения на удалённый репозиторий. Также не забудьте вернуть вашу локальную `main` ветвь в исходное состояние (чтобы она была синхронизирована с удалённой). В противном случае у вас могут возникнуть проблемы при следующем выполнении `git pull`."
            ]
          }
        }
      ]
    },
    "uk": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote Rejected!",
              "",
              "Коли ви працюєте над проектом в складі великої команди розробників, то, швидше за все, гілка `main` буде _заблокована_. Для внесення до неї змін в git існує поняття запиту на злиття `Pull Request`. В такій ситуації, якщо ви закомітите свої зміни безпосередньо в гілку `main`, а потім виконаєте `git push`, то буде згенероване повідомлення про помилку:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```",
              "",
              "```",
              " ! [віддалено відхилено] main -> main (TF402455: Зміни (push-запити) цієї гілки заборонені; ви повинні використовувати pull-запит для оновлення цієї гілки.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Чому мої зміни були відхилені?",
              "",
              "Віддалений репозиторій відхилив коміти завантажені безпосередньо в гілку `main` через те, що на `main` _налаштована політика_, яка вимагає використання `Pull request` замість звичайного `git push`.",
              "",
              "Ця політика має на увазі процес створення нової гілки розробки, внесення до неї всіх потрібних комітів, завантаження змін в віддалений репозиторій і _відкриття нового_ `Pull request`. Але ви про це забули (чи не знали) і закомітили свої доробки безпосередньо в гілку `main`. Тепер ви застрягли і не можене запушити свої зміни :(. "
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Рішення:",
              "",
              "Створіть ще одну гілку з назвою `feature` і відправте зміни у віддалений репозиторій. Також не забудьте повернути вашу локальну гілку `main` в вихідне положення (щоб вона була синхронізована з віддаленою). Інакше у вас можуть виникнути складнощі при наступному виконанні запиту `git pull`, коли коміти інших розробників конфліктуватимуть з вашими."

            ]
          }
        }
      ]
    },
    "es_ES": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote Rejected!",
              "",
              "Si trabajas en un equipo colaborativo, es probable que la rama `main` esté bloqueada y requiera algún proceso de `Pull Request` para poder `mergear` los cambios. Si haces `commit` directamente a `main` e intentas realizar `push`, recibirás un mensaje similar a este:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## ¿Por qué fue rechazado?",
              "",
              "Se rechazó el `push` del `commit` a la rama `main` debido a la política en la rama `main` que requiere el uso de `Pull Requests`.",
              "",
              "Trataste de crear una rama y luego hacer `pushs` creando un `Pull Request`, pero te olvidaste e hiciste `commit` directamente a `main`. Ahora estás atascado y no puedes hacer `push` de tus cambios."

            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## La solución",
              "",
              "Crea otra rama llamada `feature` y haz `push` a remoto. También restablece su rama `main` nuevamente para que esté sincronizado con el repositorio remoto; de lo contrario, puedes tener problemas la próxima vez que realices un `pull` y el `commit` de otra persona entre en conflicto con el tuyo."
            ]
          }
        }
      ]
    },
    "pt_BR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote Rejected!",
              "",
              "Se você trabalha em uma grande equipe colaborativa é provável que o main seja bloqueado e precise de alguns processos de Pull Request para unir mudanças. Se você commitar diretamente para o main localmente e tentar fazer um push você visualizará uma mensagem similar a essa:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Por que foi rejeitado?",
              "",
              "O repositório remoto rejeitou o push dos commits diretamente para o main por causa da política do main necessitando do uso dos pull requests.",
              "",
              "Você pretendia seguir o processo de criação de uma ramificação, fazendo um push dessa ramificação e fazendo um pull request, mas você esqueceu e commitou diretamente para o main. Agora você está preso e não consegue publicar suas mudanças."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## A solução",
              "",
              "Crie outro branch chamado feature e faça um push dele para o repositório remoto. Além disso, resete o main de volta a estar sincronizado com o repositório remoto para não ter problemas da próxima vez que fizer um pull e os commits de alguém mais conflitarem com o seu."
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
              "## Remote Rejected!",
              "",
              "Si vous travaillez dans une équipe de grande taille, il est probable que `main` soit verrouillée, et que le mécanisme de `Pull Request` soit nécessaire pour `merge` des changements. Si vous faites un `commit` directement sur le main local, et essayez de `push`, vous serez reçu avec un message de la sorte :",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Pourquoi est-ce rejeté?",
              "",
              "Le dépôt distant a rejeté le `push` de `commit` directement sur `main`, à cause de la stratégie mise en place sur `main`, imposant plutôt l'usage des `pull requests`.",
              "",
              "Vous étiez censé suivre le processus suivant : créer une branche, `push`, et faire une `pull request`. Mais vous avez oublié et avez fait un `commit` directement sur `main`. Maintenant vous êtes coincé et ne pouvez pas faire un `push` de vos modifications."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## La solution",
              "",
              "Créer une autre branche appelée feature, et poussez la sur le serveur distant. Réinitialisez (`reset`) également votre `main` pour être en cohérence avec l'état du serveur distant, sinon vous pourriez avoir des problèmes la prochaine fois que vous faites un `pull`, et que quelqu'un d'autre `commit` des choses en conflit avec vos modifications."
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
              "## 원격저장소 거부! (Remote Rejected!)",
              "",
              "규모가 큰 개발팀에서 일하는 경우, 보통 원격저장소의 `main` 브랜치는 잠겨있습니다(locked). 그래서 변경사항을 적용하려면 pull request 과정을 거쳐야하죠. 만약에 여러분이 로컬 저장소의 `main`브랜치에서 커밋을 한 후 `push`하려고 시도한다면, 다음과 같은 오류를 받게 될겁니다. :",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 왜 거부됐나요?",
              "",
              "원격 저장소는 자신의 `main` 브랜치에 대한 직접적인 커밋을 제한합니다. 왜냐하면 `push` 대신에 pull request가 쓰여야 한다는 규칙이 원격 저장소의 `main` 브랜치에는 적용되어 있기 때문이죠.",
              "",
              "여러분은 브랜치를 따로 만들어 작업한 다음, 그것을 `push`하고 pull request를 하려 했습니다. 하지만 그걸 잊고 실수로 `main` 브랜치에서 직접 커밋을 해버렸네요! 이제 변경 사항을 `push` 하지도 못하고 옴짝달싹 못하는 상황이 되어버렸습니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 해결책",
              "",
              "`feature` 라는 이름의 다른 브랜치를 만들어 원격 저장소에 `push` 하세요. 그리고 원격 저장소와 동기화될 수 있도록 로컬 저장소의 `main` 브랜치를 `reset`하세요. 그렇지 않으면 여러분이 다음에 `pull`을 시도할 때 문제가 발생하거나, 다른 협업자들의 커밋이 여러분의 커밋과 충돌할 수도 있습니다."
            ]
          }
        }
      ]
    },
    "es_AR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote Rejected!",
              "",
              "Si trabajas en un equipo colaborativo, es probable que la rama `main` esté bloqueada y requiera algún proceso de `Pull Request` para poder `mergear` los cambios. Si haces `commit` directamente a `main` e intentas realizar `push`, recibirás un mensaje similar a este:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## ¿Por qué fue rechazado?",
              "",
              "Se rechazó el `push` del `commit` a la rama `main` debido a la política en la rama `main` que requiere el uso de `Pull Requests`.",
              "",
              "Trataste de crear una rama y luego hacer `pushs` creando un `Pull Request`, pero te olvidaste e hiciste `commit` directamente a `main`. Ahora estás atascado y no puedes hacer `push` de tus cambios."

            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## La solución",
              "",
              "Crea otra rama llamada `feature` y haz `push` a remoto. También restablece su rama `main` nuevamente para que esté sincronizado con el repositorio remoto; de lo contrario, puedes tener problemas la próxima vez que realices un `pull` y el `commit` de otra persona entre en conflicto con el tuyo."
            ]
          }
        }
      ]
    },
    "sl_SI": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Oddaljena Zavrnitev!",
              "",
              "Če delaš v veliki ekipi je verjetno, da je main zaklenjen in zahteva Pull Request postopek za merganje sprememb. Če commitaš direktno na main lokalno, poizkusi pushati in dobil boš sporočilo podobno temu:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Zakaj je bil zavrnjen?",
              "",
              "Oddaljen repo je zavrnil pushanje commitov direktno na main zaradi politike, da se uporabljajo le pull requesti.",
              "",
              "Mišljeno je, da slediš temu procesu, da narediš branch, ga pushaš, nato pa narediš pull request, ampak si pozabil in commital direktno na main. Sedaj si zataknjen in ne moreš pushati svojih sprememb."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Rešitev",
              "",
              "Naredi še en branch imenovan feature in ga pushaj na remote. Prav tako resetiraj main nazaj, da bo v enakem stanju kot na oddaljenem repozitoriju, drugače imaš lahko težave naslednjič, ko boš pullal spremembe in bo konflikt s commitom nekoga drugega."
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
              "## リモートが拒否した！",
              "",
              "もしあなたが大規模な共同作業チームで働いている場合、mainがロックされていて、変更をマージするために何らかのプルリクエストの処理が必要になるかもしれません。ローカルで直接mainにコミットしてプッシュしようとすると、以下のようなメッセージに遭遇するでしょう:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## なぜ拒否されたのか？",
              "",
              "mainに対しては直接でのコミットの代わりにプルリクエストを要求するポリシーによって、リモートはmainに直接コミットしようとするプッシュを拒否しました。",
              "",
              "あなたはブランチを作成し、そのブランチをプッシュしてプルリクエストを行うという手順を踏むつもりでしたが、それを忘れてしまい直接mainにコミットしてしまったのです。あなたは行き詰まってしまい、変更をプッシュすることが出来なくなってしまいました。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 解決策",
              "",
              "featureという名前の別のブランチを作成し、リモートにプッシュしてください。またmainをresetしてリモートと同じ状態になるようにしてください。そうしないとあなたが次にプルを実行したときに問題が発生し、他の誰かのコミットがあなたのコミットと競合する恐れがあります。"
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
              "## 遠端伺服器拒絕!(Remote Rejected!)",
              "",
              "如果今天你在一個較大型的多人合作專案，那很有可能 main 是被鎖住的，不允許你直接更動 main，你必須藉由 Pull Request(發PR) 來處理更動。如果你嘗試在本地 main 做提交(commit)然後推送(push)，你可能會收到這個訊息:",
              "",
              "```",
              " ! [遠端伺服器拒絕] main -> main (TF402455: 推送(push)到這個分支是不允許的; 你必須使用 pull request(發PR) 來更新這個分支.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 為什麼會被拒絕推送?(Why was it rejected?)",
              "",
              "因為這時候 main 的政策(規則)是必須透過 pull request(發PR) 才能對 main 做更動，遠端伺服器會拒絕直接 push 到 main 這件事。",
              "",
              "你應該按照流程，首先建一個分支(自己的 branch)，然後推送(push)這個分支並發起 pull request(發PR)，但是你忘記了，並直接提交給了 main，所以現在你的行動停住了，而且你不能推送(push)此次更動。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 解決辦法:",
              "",
              "新建一個叫 feature 的分支，然後推送到遠端伺服器。記得重置(同步一下) 你的 main 分支和遠端伺服器保持一致，不然有可能下一次你拉的時候(pull)會跟別人的提交(commit)產生衝突。"
            ]
          }
        }
      ]
    },
    "pl": {

      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote odrzuca!",
              "",
              "Jeśli pracujesz w dużym zespole, to może się zdarzyć, że main będzie zablokowany i przed scaleniem zmian trzeba będzie zrobić pull request. Jeśli commitujesz bezpośrednio do lokalnego main i spróbujesz zrobić push, to możesz dostać wiadomość podobną do tej:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Skąd to odrzucenie?",
              "",
              "Remote odrzuca pushowanie twoich commitów bezpośrednio do main ze względu na regułę wymagającą korzystania z pull requestów.",
              "",
              "Twoim zamiarem było najpierw stworzyć gałąź, a potem wypchnąć ją do zdalnego repozytorium i zrobić pull request, ale zamiast tego commitujesz bezpośrednio do main. Dlatego masz problem i nie możesz wypchnąć swoich zmian."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Rozwiązanie",
              "",
              "Stwórz inną gałąź, nazywaną często boczną albo tematyczną, a po angielsku: feature (funkcyjną), i wypchnij ją do remote. Zresetuj również swój main, tak aby był zsynchronizowany ze zdalnym repozytorium. Jeśli tego nie zrobisz, to możesz mieć problem następnym razem, kiedy zrobisz pull, a czyjś commit będzie miał konflikt z twoim."
            ]
          }
        }
      ]
    },
    "vi": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Kết nối remote bị từ chối!",
              "",
              "Nếu bạn làm việc trong một nhóm cộng tác lớn, có khả năng nhánh main bị khóa và yêu cầu một số quy" +
              " trình Pull Request để hợp nhất các thay đổi. Nếu bạn commit trực tiếp với nhánh cục bộ và thử" +
              " push, bạn sẽ được chào đón bằng một thông báo tương tự như sau:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Tại sao bị từ chối?",
              "",
              "Remote từ chối push các commit trực tiếp đến main vì chính sách của main yêu cầu các pull" +
              " request được sử dụng thay thế.",
              "",
              "Bạn định tạo một nhánh sau đó đẩy nhánh lên rồi thực hiện pull request theo đúng quy trình, tuy nhiên bạn lại lỡ tay commit trực tiếp vào nhánh main. Bây giờ bạn bị mắc kẹt và không thể đẩy các thay đổi của mình lên."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Giải pháp",
              "",
              "Tạo một nhánh khác được gọi là feature và push nhánh đó đến remote. Đồng thời đặt lại nhánh main" +
              " của bạn để đồng bộ với remote, nếu không bạn có thể gặp sự cố vào lần tiếp theo khi bạn thực hiện" +
              " pull và commit của người khác xung đột với của bạn."
            ]
          }
        }
      ]
    },
    "it_IT": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Rifiuto remoto!",
              "",
              "Se fari parte di un team di grandi dimensioni è probabile che il main sia bloccato e che richieda un processo di Pull Request per fondere il proprio lavoro. Se effettui localmente un commit al main e provi a caricare le modifiche al repository remoto troverai come risposta un messaggio di questo tipo:",
              "",
              "```",
              " ! [remote rejected] main -> main (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Perché è stato rifiutato?",
              "",
              "Il repository remoto ha rifiutato l'invio di commit direttamente al main in quanto per questo ramo è richiesto di effettuare una pull request: una richiesta di includere le nostre modifiche personali nel repository remoto.",
              "",
              "Avresti dovuto seguire il processo di creare un nuovo ramo, fare il push di quel ramo ed effettuare una pull request, ma ti sei scordato e hai effettuato il commit direttamente sul main. Ora sei bloccato e non puoi caricare le tue modifiche."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## La soluzione",
              "",
              "Crea un nuovo ramo chiamato feature e carica quest'ultimo sul repository remoto. Inoltre reimposta il tuo ramo main affinché sia al pari con il remoto altrimenti potresti andare in contro a dei problemi la prossima volta che proverai ad effettuare un pull e i commit di qualcun'altro andranno in conflitto con i tuoi."
            ]
          }
        }
      ]
    },
  }
};
