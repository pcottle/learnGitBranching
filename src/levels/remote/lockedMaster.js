exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null},\"feature\":{\"target\":\"C2\",\"id\":\"feature\",\"remoteTrackingBranchID\":\"o/feature\"},\"o/feature\":{\"target\":\"C2\",\"id\":\"o/feature\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"tags\":{},\"HEAD\":{\"target\":\"feature\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"feature\":{\"target\":\"C2\",\"id\":\"feature\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"tags\":{},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git reset --hard o/master;git checkout -b feature C2; git push origin feature",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"tags\":{},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"tags\":{},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Make the feature branch from the local master before resetting it back to be the same as origin's master",
    "de_DE": "Erstelle einen Feature-Branch ausgehend vom lokalen Master-Branch, bevor du den Master-Branch auf den origin/master zurücksetzt.",
    "ru_RU": "Создайте новую feature ветвь от master перед тем, как откатить изменения в master до состояния o/master.",
    "uk": "Створіть нову feature гілку від локального master перед тим, як відкотити зміни в master до стану o/master.",
    "zh_CN": "从本地的master创建一个feature分支, 然后重置master和origin master保持一致。",
    "es_ES": "Crea la rama feature desde la rama master en local antes de restablecerlo para que sea el mismo que la rama master de origen",
    "pt_BR": "Crie o ramo feature a partir do ramo master no local antes de reestabelecê-lo para que seja o mesmo que o ramo master de origem",
    "fr_FR": "Créer la branche feature à partir du master local, avant de la restaurer dans le même état que o/master",
    "ko"   : "로컬 저장소의 master 브랜치로부터 feature 브랜치를 만드세요. 그리고 o/master와 같아질 수 있도록 로컬 저장소의 master 브랜치를 reset 하세요.",
    "sl_SI": "Naredi feature branch iz lokalnega masterja preden ga ponastaviš, da bo enak kot origin master.",
    "es_AR": "Crea la rama feature desde la rama master en local antes de restablecerlo para que sea el mismo que la rama master de origen."
  },
  "name": {
    "en_US": "Locked Master",
    "de_DE": "Gesperrter Master-Branch",
    "ru_RU": "Заблокированная ветвь master",
    "ru_RU": "Заблокована гілка master",
    "zh_CN": "锁定的Master(Locked Master)",
    "es_ES": "Master bloqueado",
    "pt_BR": "Master bloqueado",
    "fr_FR": "Master verrouillé",
    "ko"   : "잠겨버린 Master",
    "sl_SI": "Zaklenjen Master",
    "es_AR": "Master bloqueado"
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
              "If you work on a large collaborative team its likely that master is locked and requires some Pull Request process to merge changes. If you commit directly to master locally and try pushing you will be greeted with a message similar to this:",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
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
              "The remote rejected the push of commits directly to master because of the policy on master requiring pull requests to instead be used.",
              "",
              "You meant to follow the process creating a branch then pushing that branch and doing a pull request, but you forgot and committed directly to master. Now you are stuck and cannot push your changes."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## The solution",
              "",
              "Create another branch called feature and push that to the remote. Also reset your master back to be in sync with the remote otherwise you may have issues next time you do a pull and someone else's commit conflicts with yours."
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
              "## Gesperrter Master-Branch",
              "",
              "Wenn du in einem großen Team zusammen arbeitest, ist der Master-Branch mit hoher Wahrscheinlichkeit für direkte Änderungen gesperrt. Um Änderungen am Remote-Branch einpflegen zu können, ist ein Pull-Request-Prozess notwendig. Wenn du lokal in deinem Master-Branch einen Commit durchführst und diesen versuchst auf den serverseitigen Master-Branch zu pushen, wirst du folgende Fehlermeldung bekommen:",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
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
              "Auf Grund der serverseitig voreingestellten Richtlinien sind direkte Änderungen am Master-Branch nicht erlaubt, und erfordert einen Pull-Request.",
              "",
              "Um die eigenen lokalen Änderungen in den Master-Branch einbringen zu können, ist es erforderlich einen lokalen Feature-Branch zu erstellen. Dieser Feature-Branch muss dann auf den Server hochgeladen werden, damit dann ein Pull-Request eingeleitet werden kann. Dies wurde vorher durch den direkten Push des Master-Branch nicht berücksichtigt, weswegen man die Änderungen nicht hochladen konnte."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Die Lösung",
              "",
              "Erstelle einen Branch der feature heißt und pushe diesen auf den Server. Setze den lokalen Master-Branch zurück, dass er mit dem Origin-Master-Branch synchron ist. Dies könnte sonst später zu weiteren Komplikationen führen, wenn weiter pulls durchgeführt und Commits von anderen mit deinen in Konflikt stehen."
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
              "如果你是在一个大的合作团队中工作, 很可能是master被锁定了, 需要一些Pull Request流程来合并修改。如果你直接提交(commit)到本地master, 然后试图推送(push)修改, 你将会收到这样类似的信息:",
              "",
              "```",
              " ! [远程服务器拒绝] master -> master (TF402455: 不允许推送(push)这个分支; 你必须使用pull request来更新这个分支.)",
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
              "远程服务器拒绝直接推送(push)提交到master, 因为策略配置要求 pull requests 来提交更新.",
              "",
              "你应该按照流程,新建一个分支, 推送(push)这个分支并申请pull request,但是你忘记并直接提交给了master.现在你卡住并且无法推送你的更新."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 解决办法",
              "",
              "新建一个分支feature, 推送到远程服务器. 然后reset你的master分支和远程服务器保持一致, 否则下次你pull并且他人的提交和你冲突的时候就会有问题."
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
              "Когда вы работаете в составе большой команды разработчиков над проектом, то, вероятнее всего, ветвь `master` будет _заблокирована_. Для внесения изменений в неё в git существует понятие запроса на слияние `Pull Request`. В такой ситуации если вы закоммитите свои наработки непосредственно в `master` ветвь, а после выполните `git push`, то будет сгенерировано сообщение об ошибке:",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```",
              "",
              "```",
              " ! [удалённо отклонено] master -> master (TF402455: Изменение этой ветви запрещены; вы можете использовать pull request для обновления этой ветви.)",
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
              "Удалённый репозиторий отклонил загруженные коммиты непосредственно в `master` ветку потому, что на `master` _настроена политика_, которая требует использование `Pull request` вместо обычного `git push`.",
              "",
              "Эта политика подразумевает процесс создания новой ветви разработки, внесение в неё всех необходимых коммитов, загрузка изменений в удалённый репозиторий и _открытие нового_ `Pull request`. Однако вы забыли про это и закоммитили наработки непосредственно в `master` ветвь. Теперь вы застряли и не можете запушить свои изменения :(. "
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Решение:",
              "",
              "Создайте ещё одну ветвь под названием `feature` и отправьте изменения на удалённый репозиторий. Также не забудьте вернуть вашу локальную `master` ветвь в исходное состояние (чтобы она была синхронизирована с удалённой). В противном случае у вас могут возникнуть проблемы при следующем выполнении `git pull`."
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
              "Коли ви працюєте над проектом в складі великої команди розробників, то, швидше за все, гілка `master` буде _заблокована_. Для внесення до неї змін в git існує поняття запиту на злиття `Pull Request`. В такій ситуації, якщо ви закомітите свої зміни безпосередньо в гілку `master`, а потім виконаєте `git push`, то буде згенероване повідомлення про помилку:",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
              "```",
              "",
              "```",
              " ! [віддалено відхилено] master -> master (TF402455: Зміни (push-запити) цієї гілки заборонені; ви повинні використовувати pull-запит для оновлення цієї гілки.)",
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
              "Віддалений репозиторій відхилив коміти завантажені безпосередньо в гілку `master` через те, що на `master` _налаштована політика_, яка вимагає використання `Pull request` замість звичайного `git push`.",
              "",
              "Ця політика має на увазі процес створення нової гілки розробки, внесення до неї всіх потрібних комітів, завантаження змін в віддалений репозиторій і _відкриття нового_ `Pull request`. Але ви про це забули (чи не знали) і закомітили свої доробки безпосередньо в гілку `master`. Тепер ви застрягли і не можене запушити свої зміни :(. "
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Рішення:",
              "",
              "Створіть ще одну гілку з назвою `feature` і відправте зміни у віддалений репозиторій. Також не забудьте повернути вашу локальну гілку `master` в вихідне положення (щоб вона була синхронізована з віддаленою). Інакше у вас можуть виникнути складнощі при наступному виконанні запиту `git pull`, коли коміти інших розробників конфліктуватимуть з вашими."
              
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
              "Si trabajas en un equipo colaborativo, es probable que la rama `master` esté bloqueada y requiera algún proceso de `Pull Request` para poder `mergear` los cambios. Si haces `commit` directamente a `master` e intentas realizar `push`, recibirás un mensaje similar a este:",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
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
              "Se rechazó el `push` del `commit` a la rama `master` debido a la política en la rama `master` que requiere el uso de `Pull Requests`.",
              "",
              "Trataste de crear una rama y luego hacer `pushs` creando un `Pull Request`, pero te olvidaste e hiciste `commit` directamente a `master`. Ahora estás atascado y no puedes hacer `push` de tus cambios."

            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## La solución",
              "",
              "Crea otra rama llamada `feature` y haz `push` a remoto. También restablece su rama `master` nuevamente para que esté sincronizado con el repositorio remoto; de lo contrario, puedes tener problemas la próxima vez que realices un `pull` y el `commit` de otra persona entre en conflicto con el tuyo."
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
              "Se você trabalha em uma grande equipe colaborativa é provável que o master seja bloqueado e precise de alguns processos de Pull Request para unir mudanças. Se você commitar diretamente para o master localmente e tentar fazer um push você visualizará uma mensagem similar a essa:",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
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
              "O repositório remoto rejeitou o push dos commits diretamente para o master por causa da política do master necessitando do uso dos pull requests.",
              "",
              "Você pretendia seguir o processo de criação de uma ramificação, fazendo um push dessa ramificação e fazendo um pull request, mas você esqueceu e commitou diretamente para o master. Agora você está preso e não consegue publicar suas mudanças."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## A solução",
              "",
              "Crie outro branch chamado feature e faça um push dele para o repositório remoto. Além disso, resete o master de volta a estar sincronizado com o repositório remoto para não ter problemas da próxima vez que fizer um pull e os commits de alguém mais conflitarem com o seu."
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
              "Si vous travaillez dans une équipe de grande taille, il est probable que `master` soit verrouillée, et que le mécanisme de `Pull Request` soit nécessaire pour `merge` des changements. Si vous faites un `commit` directement sur le master local, et essayez de `push`, vous serez reçu avec un message de la sorte :",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
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
              "Le dépôt distant a rejeté le `push` de `commit` directement sur `master`, à cause de la stratégie mise en place sur `master`, imposant plutôt l'usage des `pull requests`.",
              "",
              "Vous étiez censé suivre le processus suivant : créer une branche, `push`, et faire une `pull request`. Mais vous avez oublié et avez fait un `commit` directement sur `master`. Maintenant vous êtes coincé et ne pouvez pas faire un `push` de vos modifications."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## La solution",
              "",
              "Créer une autre branche appelée feature, et poussez la sur le serveur distant. Réinitialisez (`reset`) également votre `master` pour être en cohérence avec l'état du serveur distant, sinon vous pourriez avoir des problèmes la prochaine fois que vous faites un `pull`, et que quelqu'un d'autre `commit` des choses en conflit avec vos modifications."
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
              "규모가 큰 개발팀에서 일하는 경우, 보통 원격저장소의 `master` 브랜치는 잠겨있습니다(locked). 그래서 변경사항을 적용하려면 pull request 과정을 거쳐야하죠. 만약에 여러분이 로컬 저장소의 `master`브랜치에서 커밋을 한 후 `push`하려고 시도한다면, 다음과 같은 오류를 받게 될겁니다. :",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
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
              "원격 저장소는 자신의 `master` 브랜치에 대한 직접적인 커밋을 제한합니다. 왜냐하면 `push` 대신에 pull request가 쓰여야 한다는 규칙이 원격 저장소의 `master` 브랜치에는 적용되어 있기 때문이죠.",
              "",
              "여러분은 브랜치를 따로 만들어 작업한 다음, 그것을 `push`하고 pull request를 하려 했습니다. 하지만 그걸 잊고 실수로 `master` 브랜치에서 직접 커밋을 해버렸네요! 이제 변경 사항을 `push` 하지도 못하고 옴짝달싹 못하는 상황이 되어버렸습니다."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 해결책",
              "",
              "`feature` 라는 이름의 다른 브랜치를 만들어 원격 저장소에 `push` 하세요. 그리고 원격 저장소와 동기화될 수 있도록 로컬 저장소의 `master` 브랜치를 `reset`하세요. 그렇지 않으면 여러분이 다음에 `pull`을 시도할 때 문제가 발생하거나, 다른 협업자들의 커밋이 여러분의 커밋과 충돌할 수도 있습니다."
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
              "Si trabajas en un equipo colaborativo, es probable que la rama `master` esté bloqueada y requiera algún proceso de `Pull Request` para poder `mergear` los cambios. Si haces `commit` directamente a `master` e intentas realizar `push`, recibirás un mensaje similar a este:",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
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
              "Se rechazó el `push` del `commit` a la rama `master` debido a la política en la rama `master` que requiere el uso de `Pull Requests`.",
              "",
              "Trataste de crear una rama y luego hacer `pushs` creando un `Pull Request`, pero te olvidaste e hiciste `commit` directamente a `master`. Ahora estás atascado y no puedes hacer `push` de tus cambios."

            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## La solución",
              "",
              "Crea otra rama llamada `feature` y haz `push` a remoto. También restablece su rama `master` nuevamente para que esté sincronizado con el repositorio remoto; de lo contrario, puedes tener problemas la próxima vez que realices un `pull` y el `commit` de otra persona entre en conflicto con el tuyo."
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
              "Če delaš v veliki ekipi je verjetno, da je master zaklenjen in zahteva Pull Request postopek za merganje sprememb. Če commitaš direktno na master lokalno, poizkusi pushati in dobil boš sporočilo podobno temu:",
              "",
              "```",
              " ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)",
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
              "Oddaljen repo je zavrnil pushanje commitov direktno na master zaradi politike, da se uporabljajo le pull requesti.",
              "",
              "Mišljeno je, da slediš temu procesu, da narediš branch, ga pushaš, nato pa narediš pull request, ampak si pozabil in commital direktno na master. Sedaj si zataknjen in ne moreš pushati svojih sprememb."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Rešitev",
              "",
              "Naredi še en branch imenovan feature in ga pushaj na remote. Prav tako resetiraj master nazaj, da bo v enakem stanju kot na oddaljenem repozitoriju, drugače imaš lahko težave naslednjič, ko boš pullal spremembe in bo konflikt s commitom nekoga drugega."
            ]
          }
        }
      ]
    }
  }
};
