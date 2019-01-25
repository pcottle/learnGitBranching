exports.level = {
  "compareOnlyMasterHashAgnostic": true,
  "disabledMap": {
    "git revert": true,
    "git cherry-pick": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C6%27%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C6%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase master bugFix;git rebase bugFix side;git rebase side another;git rebase another master",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C2\",\"id\":\"master\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"side\":{\"target\":\"C6\",\"id\":\"side\"},\"another\":{\"target\":\"C7\",\"id\":\"another\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C0\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C5\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Rebasing over 9000 times",
    "de_DE": "10000 Rebases unter dem `HEAD`",
    "es_AR": "Rebaseando más de 9000 veces",
    "pt_BR": "Fazendo mais de 9000 rebases",
    "gl"   : "Facendo máis de 9000 rebases",
    "fr_FR": "Rebaser plus de 1000 fois",
    "ko": "9천번이 넘는 리베이스",
    "ja"   : "9000回以上のrebase",
    "zh_CN": "多次 Rebase",
    "zh_TW": "N次Rebase",
    "ru_RU": "Rebase over 9000 раз",
    "uk"   : "Rebase over 9000 разів"
  },
  "hint": {
    "en_US": "Remember, the most efficient way might be to only update master at the end...",
    "de_DE": "Nicht vergessen: die effizienteste Möglichkeit könnte sein, schließlich einfach nur den master zu aktualisieren ...",
    "es_AR": "Acordate, la manera más eficiente podría ser actualizar master sólo al final...",
    "pt_BR": "Lembre-se, a forma mais eficiente pode ser atualizar o master por último...",
    "gl"   : "Lembra, a forma máis eficiente pode ser actualizar a rama master ó final...",
    "fr_FR": "Rappelez-vous, la façon la plus efficace peut être de mettre à jour master seulement à la fin ...",
    "ja"   : "最も効率的なやり方はmasterを最後に更新するだけかもしれない・・・",
    "ko": "아마도 master를 마지막에 업데이트하는 것이 가장 효율적인 방법일 것입니다...",
    "zh_CN": "记住，最后更新 master 分支可能是最高效的方法……",
    "zh_TW": "要記住喔! 把 master branch 留到最後更新可能是最有效率的方法。",
    "ru_RU": "Не забудь, что лучше всего сдвинуть мастер в самом конце...",
    "uk"   : "Не забувай, що краще всього буде перемістити master в самому кінці... "
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Rebasing Multiple Branches",
              "",
              "Man, we have a lot of branches going on here! Let's rebase all the work from these branches onto master.",
              "",
              "Upper management is making this a bit trickier though -- they want the commits to all be in sequential order. So this means that our final tree should have `C7'` at the bottom, `C6'` above that, and so on, all in order.",
              "",
              "If you mess up along the way, feel free to use `reset` to start over again. Be sure to check out our solution and see if you can do it in fewer commands!"
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
              "### Rebaseando múltiples ramas",
              "",
              "Man, ¡hay un montón de ramas acá! Rebaseemos todo el trabajo de esas ramas sobre master.",
              "",
              "La gente de administración nos está haciendo las cosas un poco complicadas, igual -- quieren que nuestros commits estén todos en orden secuencial. Esto significa que nuestro árbol final tendría que tener `C7` al final, `C6` antes de ese, y así siguiendo, todos en orden.",
              "",
              "Si hacés líos en el camino, sentite libre de usar `reset` para empezar de nuevo. ¡Asegurate de verificar tu solución y ver si podés hacerla en alguna cantidad menor de commandos!"
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
              "### Fazendo rebase em múltiplos ramos",
              "",
              "Cara, temos um monte de ramos aqui! Vamos fazer um rebase de todo o trabalho contido nesses ramos para o master.",
              "",
              "No entanto, a cúpula da administração está tornando as coisas mais difíceis -- eles querem que os commits estejam todos em ordem sequencial. Isso significa que a nossa árvore final precisa ter o `C7'` por último, `C6'` acima disso, e assim por diante, tudo ordenado.",
              "",
              "Se você fizer besteira, sinta-se livre para usar o comando `reset` para recomeçar do zero. Depois lembre de olhar nossa solução do gabarito para ver se consegue resolver a tarefa usando menos comandos!"
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
              "### Fazendo rebase en múltiples ramas",
              "",
              "Neno, temos unha chea de ramas aquí! Imos facer rebase de todo o traballo contido nesas ramas para a master.",
              "",
              "A xente de administración estanos a facer as cousas complicadas, igual eles queren que os commits estén todos en orde secuencial. Isto significa que a nosa árbore final precisa ter `C7'` de último, `C6'` inda por riba, está por adiante, todo ordeado.",
              "",
              "Se te fas un lio polo camiño, síntete ceibe para usar o comando `reset` para comezar de cero outra vez. Despois lembra ollar a nosa solución para ver se consegues resolver a tarefa usando menos comandos!"
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
              "### Rebaser plusieurs branches",
              "",
              "Dis-donc, nous avons beaucoup de branches par ici ! Rebasons tout le travail de ces branches dans master.",
              "",
              "Les patrons rendent cela encore plus compliqué -- ils veulent que les commits soient fait de manière séquentielle. Cela signifie donc que dans votre arbre final `C7'` est tout en bas, `C6'` juste au-dessus, et ainsi de suite, tout dans cet ordre.",
              "",
              "Si vous faites une erreur en chemin, n'hésitez pas à utiliser `reset` pour recommencer. Pensez à comparer votre solution à la notre et voyez si vous pouvez le faire en moins de commandes !"
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
              "### Mehrere Branches rebasen",
              "",
              "Wow, wir haben hier ja eine Menge Branches! Lass uns mal die ganze Arbeit, die in diesen Branches steckt, auf den `master` packen, um sie auf Stand zu bringen.",
              "",
              "Die Führungsetage macht die Sache allerdings etwas trickreicher -- die möchten, dass alle Commits in aufsteigender Reihenfolge geordnet sind. Das heißt unser fertiger Baum sollte `C7` ganz unten haben, darüber `C6` und so weiter und so fort.",
              "",
              "Wenn du irgendwo einen Fehler machst, benütze ruhig `reset` um wieder von vorne anzufangen oder `undo` um einen Schritt zurückzugehen. Schau dir die Lösung an und versuch es in weniger Schritten hinzubekommen."
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
              "### 複数のブランチをリベースする",
              "",
              "さあ、いくつものブランチが出てきます。このブランチたち全てをmasterブランチにリベースしましょう。",
              "",
              "おエライさん方が今回の仕事を少しトリッキーにしてくれました -- コミットはすべて一列の連続した状態にしてほしいそうです。つまり私たちが作るリポジトリの最終的なツリーの状態は、`C7'`が最後に来て、`C6'`がその一つ上に来て、、と順に積み重なるイメージです。",
              "",
              "試行錯誤してツリーが汚くなってきたら、`reset`コマンドを使ってツリーの状態を初期化してください。模範解答をチェックして、それよりも簡単なコマンドで済ませられるかどうかを考えるのも忘れずに！"
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
              "### 多分支 rebase",
              "",
              "哥们儿，我们准备了很多分支！咱们把这些分支 rebase 到 master 上吧。",
              "",
              "但是你的领导给你提了点要求 —— 他们希望得到有序的提交历史，也就是我们最终的结果应该是 `C6'` 在 `C7'` 上面， `C5'` 在 `C6'` 上面，依此类推。",
              "",
              "即使你搞砸了也没关系，用 `reset` 命令就可以重新开始了。记得看看我们提供的答案，看你能否使用更少的命令来完成任务！"
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
    "ko": {
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
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Rebase на нескольких ветках",
              "",
              "У нас тут куча веток! Было бы круто перенести все изменения из них в мастер.",
              "",
              "Но начальство усложняет нашу задачу тем, что желает видеть все коммиты по порядку. Так что коммит `С7'` должен идти после коммита `С6'` и так далее.",
              "",
              "Если что-то пойдёт не так – не надо стесняться использовать `reset`, чтобы начать всё с чистого листа. Постарайся сделать как можно меньше манипуляций!"
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
              "### Ребейсимо кілька гілок",
              "",
              "В нас тут до біса гілок! Перенесімо всі зміни з різних гілок в master.",
              "",
              "Але вище керівництво нам не полегшує життя -- вони хочуть, щоб всі коміти були впорядковані. Це означає, що в результаті коміт `C7'` має бути з самого низу, `C6'` трохи вище, і так далі, все за порядком.",
              "",
              "Якщо ти щось зробиш не так, сміливо використовуй `reset` щоб почати спочатку. Подивись на наш розв’язок і подумай, чи ти можеш обійтись меншою кількістю команд!"
            ]
          }
        }
      ]
    }
  }
};
