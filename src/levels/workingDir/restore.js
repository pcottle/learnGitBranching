exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C2","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2","changedFiles":["app.js"]}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"secret.env":"modified"}}',
  "compareWorkingChanges": true,
  "solutionCommand": "git restore --staged secret.env;git restore experiment.js;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"staged","secret.env":"staged","experiment.js":"modified"}}',
  "name": {
    "en_US": "Undoing with git restore",
    "zh_CN": "使用 git restore 撤销修改",
    "zh_TW": "使用 git restore 復原變更",
    "pt_BR": "Desfazendo com git restore",
    "ru_RU": "Отмена изменений с помощью git restore",
    "tr_TR": "git restore ile Geri Alma"
  },
  "hint": {
    "en_US": "Unstage with `git restore --staged secret.env`, throw away the experiment with `git restore experiment.js`, then `git commit`.",
    "zh_CN": "使用 `git restore --staged secret.env` 取消暂存，使用 `git restore experiment.js` 丢弃实验性修改，然后执行 `git commit`。",
    "zh_TW": "使用 `git restore --staged secret.env` 取消暫存，使用 `git restore experiment.js` 捨棄實驗性變更，然後執行 `git commit`。",
    "pt_BR": "Tire do staging com `git restore --staged secret.env`, jogue fora o experimento com `git restore experiment.js` e depois faça `git commit`.",
    "ru_RU": "Уберите из подготовленной области с помощью `git restore --staged secret.env`, отбросьте эксперимент командой `git restore experiment.js`, а затем выполните `git commit`.",
    "tr_TR": "`git restore --staged secret.env` ile stage'den çıkarın, `git restore experiment.js` ile denemeyi çöpe atın, sonra `git commit` yapın."
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
              "每個人偶爾都會把工作目錄弄亂一點：可能暫存了不該暫存的檔案，也可能開始了一項後來想要捨棄的實驗。`git restore` 是專門為工作目錄和暫存區設計的現代復原工具。",
              "",
              "它有兩種用法：",
              "",
              "* `git restore --staged <file>`：**取消暫存**檔案（將檔案移出暫存區，但保留你的變更）",
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
              "你只想提交 `app.js`，但 `secret.env` 不小心提前進入了暫存區（它應該留到下一個 commit），所以先把它留到之後。另外，`experiment.js` 中的變更沒有成功，因此把它們全部捨棄。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "整理好工作目錄，然後提交：",
              "",
              "* 取消暫存敏感檔案：`git restore --staged secret.env`",
              "* 捨棄實驗性變更：`git restore experiment.js`",
              "* 提交剩餘內容：`git commit`",
              "",
              "這樣會得到一個乾淨的 commit，其中只包含你確實想保留的工作。"
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
              "## Desfazendo com `git restore`",
              "",
              "Todo mundo faz uma pequena bagunça de vez em quando. Você adiciona ao staging um arquivo sem querer, ou começa um experimento que prefere jogar fora. O `git restore` é o botão de desfazer moderno, feito sob medida para o seu diretório de trabalho e para a área de staging.",
              "",
              "Ele vem em dois sabores:",
              "",
              "* `git restore --staged <arquivo>`: **tira do staging** um arquivo (move ele de volta para fora da área de staging, mantendo as suas edições)",
              "* `git restore <arquivo>`: **descarta** completamente as suas edições em um arquivo (cuidado, isso joga as mudanças fora!)",
              "",
              "*(Esses comandos substituem os truques mais antigos `git reset HEAD <arquivo>` e `git checkout -- <arquivo>`. Mesma ideia, com nomes muito mais claros.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Esta é a bagunça que está na sua mesa agora:",
              "",
              "```",
              "Mudanças a serem commitadas:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   secret.env",
              "```",
              "",
              "```",
              "Mudanças não adicionadas ao staging:",
              "  modified:   experiment.js",
              "```",
              "",
              "Você quer commitar o `app.js`, mas o `secret.env` foi parar no staging cedo demais por acidente (ele deveria ser um commit em cima desse), então vamos guardá-lo para depois. Além disso, as mudanças do `experiment.js` não funcionaram, então vamos jogá-las fora por completo."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Arrume a bagunça e depois commite:",
              "",
              "* Tire o segredo do staging: `git restore --staged secret.env`",
              "* Descarte o experimento: `git restore experiment.js`",
              "* Commite o que sobrou: `git commit`",
              "",
              "Isso resulta em um único commit limpo, apenas com o trabalho que você queria manter."
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
              "## Отмена изменений с помощью `git restore`",
              "",
              "Каждый иногда немного напортачит. Вы случайно подготовили файл, который не хотели, или начали эксперимент, который лучше выбросить. `git restore` — это современная, специально созданная кнопка «отменить» для вашей рабочей директории и области подготовленных файлов.",
              "",
              "Она бывает в двух вариантах:",
              "",
              "* `git restore --staged <файл>`: **убрать** файл из области подготовленных файлов (вернуть его обратно, сохранив все правки)",
              "* `git restore <файл>`: полностью **отменить** все изменения в файле (осторожно, это безвозвратно удаляет правки!)",
              "",
              "*(Эти команды заменяют старые приёмы `git reset HEAD <файл>` и `git checkout -- <файл>`. Смысл тот же, но имена гораздо понятнее.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Вот какой беспорядок сейчас у вас на столе:",
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
              "Вы хотите закоммитить `app.js`, но `secret.env` случайно попал в подготовленную область раньше времени (он должен быть отдельным коммитом сверху), так что давайте отложим его на потом. Также изменения в `experiment.js` не сработали, так что давайте выбросим их совсем."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Приведите всё в порядок, затем закоммитьте:",
              "",
              "* Уберите секретный файл из подготовленной области: `git restore --staged secret.env`",
              "* Отбросьте изменения в эксперименте: `git restore experiment.js`",
              "* Закоммитьте то, что осталось: `git commit`",
              "",
              "В результате получится один аккуратный коммит, содержащий только ту работу, которую вы действительно хотели сохранить."
            ]
          }
        }
      ]
    },
    "tr_TR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## `git restore` ile Geri Alma",
              "",
              "Herkes ara sıra ortalığı biraz dağıtır. İstemediğiniz bir dosyayı stage'lersiniz ya da sonradan çöpe atmak isteyeceğiniz bir denemeye girişirsiniz. `git restore`, working directory ve staging area için özel olarak tasarlanmış modern geri alma düğmesidir.",
              "",
              "İki farklı tadı vardır:",
              "",
              "* `git restore --staged <file>`: bir dosyayı **stage'den çıkarır** (düzenlemelerinizi koruyarak staging area'nın dışına geri taşır)",
              "* `git restore <file>`: bir dosyadaki düzenlemelerinizi tamamen **atar** (dikkat, bu değişiklikleri çöpe atar!)",
              "",
              "*(Bunlar eski `git reset HEAD <file>` ve `git checkout -- <file>` numaralarının yerini alıyor. Fikir aynı, isimler çok daha net.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Şu anda masanızdaki dağınıklık şöyle:",
              "",
              "```",
              "Commit edilecek değişiklikler:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   secret.env",
              "```",
              "",
              "```",
              "Commit için stage'lenmemiş değişiklikler:",
              "  modified:   experiment.js",
              "```",
              "",
              "`app.js` dosyasını commit'lemek istiyorsunuz, ama `secret.env` yanlışlıkla erkenden stage'lenmiş (onun üstte ayrı bir commit olması gerekiyor), o yüzden onu sonraya saklayalım. Ayrıca `experiment.js` değişiklikleri işe yaramadı, öyleyse onları tamamen çöpe atalım."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ortalığı toplayın, sonra commit'leyin:",
              "",
              "* Gizli dosyayı stage'den çıkarın: `git restore --staged secret.env`",
              "* Denemeyi atın: `git restore experiment.js`",
              "* Kalanı commit'leyin: `git commit`",
              "",
              "Bu, yalnızca saklamak istediğiniz çalışmayı içeren tertemiz tek bir commit bırakır."
            ]
          }
        }
      ]
    }
  }
};
