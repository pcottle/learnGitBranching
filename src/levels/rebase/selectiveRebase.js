exports.level = {
  "compareAllBranchesHashAgnostic": true,
  "disabledMap": {
    "git revert": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22master%22%7D%2C%22one%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22one%22%7D%2C%22two%22%3A%7B%22target%22%3A%22C2%27%27%22%2C%22id%22%3A%22two%22%7D%2C%22three%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22three%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C4%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22two%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git checkout one; git cherry-pick C4 C3 C2; git checkout two; git cherry-pick C5 C4 C3 C2; git branch -f three C2",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\"},\"one\":{\"target\":\"C1\",\"id\":\"one\"},\"two\":{\"target\":\"C1\",\"id\":\"two\"},\"three\":{\"target\":\"C1\",\"id\":\"three\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "ko": "브랜치 스파게티",
    "en_US": "Branch Spaghetti",
    "fr_FR": "Branche spaghetti",
    "de_DE": "Branch-Spaghetti",
    "es_AR": "Enslada de branches",
    "pt_BR": "Espaguete de ramos",
    "gl"   : "Espaguete de ramas",
    "ja": "ブランチスパゲッティ",
    "zh_CN": "纠缠不清的分支",
    "zh_TW": "branch 漿糊",
    "ru_RU": "Спутанные ветки",
    "uk"   : "Макарони з гілок"
  },
  "hint": {
    "en_US": "Make sure to do everything in the proper order! Branch one first, then two, then three",
    "fr_FR": "Faites attention à tout faire dans le bon ordre ! La branche one d'abord, puis la seconde, puis la troisième",
    "de_DE": "Stelle sicher, dass du alles in der richtigen Reihenfolge machst! Branche erst one, dann two, dann three.",
    "es_AR": "¡Asegurate de hacer las cosas en el orden correcto! Brancheá `one` primero, después `two`, y después `three`.",
    "pt_BR": "Certifique-se de fazer tudo na ordem correta! Crie o ramo `one` primeiro, depois `two`, depois `three`.",
    "gl"   : "¡Afiánzate de facer as cousas no orde correcto! Crea ramas `one` de primeiras, e logo `two` e `three`.",
    "ja": "全て正しい順番で処理すること！oneが最初で、次がtwo、最後にthreeを片付ける。",
    "ko": "이 문제를 해결하는 방법은 여러가지가 있습니다! 체리픽(cherry-pick)이 가장 쉽지만 오래걸리는 방법이고, 리베이스(rebase -i)가 빠른 방법입니다",
    "zh_CN": "确保你是按照正确的顺序来操作！先操作分支 `one`, 然后 `two`, 最后才是 `three`",
    "zh_TW": "確認你是按照正確的順序來操作！先操作 branch  `one`, 然後 `two`, 最後才是 `three`",
    "ru_RU": "Убедись, что у нас всё по порядку! Сначала ветка `one`, потом `two` и только потом `three`",
    "uk":    "Переконайся, що все йде за порядком! Спершу гілка `one`, потім `two`, і тільки потім `three`"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Branch Spaghetti",
              "",
              "WOAHHHhhh Nelly! We have quite the goal to reach in this level.",
              "",
              "Here we have `master` that is a few commits ahead of branches `one` `two` and `three`. For whatever reason, we need to update these three other branches with modified versions of the last few commits on master.",
              "",
              "Branch `one` needs a re-ordering and a deletion of `C5`. `two` needs pure reordering, and `three` only needs one commit!",
              "",
              "We will let you figure out how to solve this one -- make sure to check out our solution afterwards with `show solution`. "
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
              "## Branche spaghetti",
              "",
              "WOAHHHhhh ! Nous avons pas mal d'objectifs dans ce niveau.",
              "",
              "Actuellement nous avons `master` qui se situe quelques commits devant les branches `one` `two` et `three`. Pour une raison quelconque, nous avons besoin de mettre ces trois branches à jour avec les modifications des derniers commits sur master.",
              "",
              "La branche `one` a besoin d'une réorganisation et de la suppression de `C5`. `two` doit simplement être réordonnée, et `three` ne nécessite qu'un commit !",
              "",
              "Nous vous laissons imaginer la solution pour ce niveau; comparez avec notre solution après-coup avec la commande `show solution`. "
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
              "## Ensalada de branches",
              "",
              "¡WOAHHHhhh Nelly! Tenemos un _pequeño_ objetivo al que llegar en este nivel.",
              "",
              "Tenemos un `master` que está algunos commits adelante de `one`, `two` y `three`. Por alguna razón, necesitamos actualizar esas tres ramas con versiones modificadas de los últimos commits de master.",
              "",
              "La rama `one` necesita reordenarse, y eliminar `C5`. `two` necesita sólo reordenamiento, y `three` ¡sólo necesita un commit!",
              "",
              "Te vamos a dejar darte cuenta cómo resolver este -- asegurate de mirar la solución, después, usando `show solution`. "
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
              "## Espaguete de ramos",
              "",
              "Uhuuuuu Nelly! Temos um belo de um objetivo para alcançar neste nível.",
              "",
              "Temos aqui um `master` que está alguns commits atrás dos ramos `one`, `two` e `three`. Seja lá por qual razão, precisamos atualizar esses três outros ramos com versões modificadas dos últimos commits do master.",
              "",
              "O ramo `one` precisa de uma reordenação e da exclusão do `C5`. O `two` precisa apenas de reordenação. O `three` precisa de um único commit!",
              "",
              "Vamos deixar você descobrir como resolver esta tarefa -- mas não deixe de ver a nossa solução depois com o comando `show solution`. "
            ]
          }
        }
      ]
    },
    "gl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Espaguete de ramas",
              "",
              "¡Íscalle lura! Temos un _pequeno_ obxectivo que acadar neste nivel.",
              "",
              "Temos aquí un `master` que está algúns commits por detrás das ramas `one`, `two` e `three`. Por algunha razón, precisamos atualizar esas tres ramas con versións modificadas dos últimos commits de master.",
              "",
              "A rama `one` precisa de unha reordenación, e votar fora a `C5`. O `two` precisa apenas de reordenacións. O `three` precisa dun único commit!",
              "",
              "Ímoste deixar resolver o problema por ti mesmo -- pero non deixes de ver a nosa solución, para eso escrebe `show solution`. "
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
              "## Branch-Spaghetti",
              "",
              "Puh! Wir haben ein ganz schön schweres Ziel für dieses Level.",
              "",
              "Wir haben hier einen `master`, der ein paar Commits weiter ist als die Branche `one`, `two` und `three`. Aus welchem Grund auch immer müssen wir diese drei anderen Branches mit modifizierten Versionen der paar letzten Commits von `master` aktualisieren.",
              "",
              "Branch `one` benötigt eine Umsortierung und `C5` muss gelöscht werden. `two` muss nur umsortiert werden und `three` braucht nur einen Commit!",
              "",
              "Ich lass dich diese Aufgabe selbst lösen -- schau dir hinterher auf jeden Fall die Lösung mit `show solution` an."
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
              "## ブランチスパゲッティ",
              "",
              "なんということでしょう。今回のレベルクリアのために、やることがたくさんあります。",
              "",
              "いま`master`が指しているコミットの数個前のコミットに、ブランチ`one`、`two`それから`three`があります。何か事情があって、これらの3つのブランチをmasterが指している最新の状態に更新したいケースを考えます。",
              "",
              "ブランチ`one`に対しては、順序の変更と`C5`の削除が必要です。`two`では順序の変更のみ、`three`に対しては1回だけコミットすればOKです。",
              "",
              "`show solution`コマンドで模範解答を確認できますから、こちらも利用してください。 "
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
              "## 纠缠不清的分支",
              "",
              "哇塞大神！这关我们要来点不同的！",
              "",
              "现在我们的 `master` 分支是比 `one`、`two` 和 `three` 要多几个提交。出于某种原因，我们需要把 `master` 分支上最近的几次提交做不同的调整后，分别添加到各个的分支上。",
              "",
              "`one` 需要重新排序并删除 `C5`，`two` 仅需要重排排序，而 `three` 只需要提交一次。",
              "",
              "慢慢来，你会找到答案的 —— 记得通关之后用 `show solution` 看看我们的答案哦。"
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
    "ko": {
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
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Спутанные ветки",
              "",
              "УОУ! В этом уровне придётся попотеть!",
              "",
              "У нас тут по несколько коммитов в ветках `one`, `two` и `three`. Не важно почему, но нам надо видоизменить эти три ветки при помощи более поздних коммитов из ветки `master`.",
              "",
              "Ветка `one` нуждается в изменении порядка и удалении `C5`. `two` требует полного перемешивания, а `three` хочет получить только один коммит",
              "",
              "Как пройти этот уровень – решать тебе, а как найдёшь решение – сравни его с нашим при помощи `show solution`."
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
              "## Макарони з гілок",
              "",
              "Ооо Неля! Ну й завданнячко.",
              "",
              "Ми маємо гілку `master`, яка на кілька комітів попереду гілок `one`, `two` та `three`. З незрозумілих причин, нам потрібно оновити ці гілки більш пізніми змінами з мастеру.",
              "",
              "Гілку `one` потрібно впорядкувати і видалити `C5`. Гілку `two` також потрібно впорядкувати, а в гілку `three` потрібно додати ще один коміт!",
              "",
              "Ми повністю покладаємось на тебе -- порівняй свій розв’зок з нашим, який можна подивитись командою `show solution`. "
            ]
          }
        }
      ]
    }
  }
};
