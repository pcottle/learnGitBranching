exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C2","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2","changedFiles":["app.js"]}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"secret.env":"modified"}}',
  "compareWorkingChanges": true,
  "solutionCommand": "git restore --staged secret.env;git restore experiment.js;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"staged","secret.env":"staged","experiment.js":"modified"}}',
  "name": {
    "en_US": "Undoing with git restore",
    "de_DE": "Rückgängig machen mit git restore",
    "zh_CN": "使用 git restore 撤销修改",
    "zh_TW": "使用 git restore 復原變更",
    "pt_BR": "Desfazendo com git restore",
    "ru_RU": "Отмена изменений с помощью git restore",
    "tr_TR": "git restore ile Geri Alma",
    "vi": "Hoàn tác bằng git restore",
    "uk": "Скасування змін за допомогою git restore",
    "te_IN": "git restore తో అన్‌డూ చేయడం",
    "es_ES": "Deshacer con git restore"
  },
  "hint": {
    "en_US": "Unstage with `git restore --staged secret.env`, throw away the experiment with `git restore experiment.js`, then `git commit`.",
    "de_DE": "Entferne `secret.env` aus der Staging Area mit `git restore --staged secret.env`, verwerfe die Änderungen an experiment mit `git restore experiment.js`, dann mach einen Commit mit `git commit`.",
    "zh_CN": "使用 `git restore --staged secret.env` 取消暂存，使用 `git restore experiment.js` 丢弃实验性修改，然后执行 `git commit`。",
    "zh_TW": "使用 `git restore --staged secret.env` 取消暫存，使用 `git restore experiment.js` 捨棄實驗性變更，然後執行 `git commit`。",
    "pt_BR": "Tire do staging com `git restore --staged secret.env`, jogue fora o experimento com `git restore experiment.js` e depois faça `git commit`.",
    "ru_RU": "Уберите из подготовленной области с помощью `git restore --staged secret.env`, отбросьте эксперимент командой `git restore experiment.js`, а затем выполните `git commit`.",
    "tr_TR": "`git restore --staged secret.env` ile stage'den çıkarın, `git restore experiment.js` ile denemeyi çöpe atın, sonra `git commit` yapın.",
    "vi": "Loại bỏ khỏi staging với `git restore --staged secret.env`, vứt bỏ thử nghiệm với `git restore experiment.js`, sau đó `git commit`.",
    "uk": "Приберіть файл з індексу за допомогою `git restore --staged secret.env`, відкиньте експеримент командою `git restore experiment.js`, а потім виконайте `git commit`.",
    "te_IN": "`git restore --staged secret.env` తో stage నుండి తీసివేయి, `git restore experiment.js` తో experiment ను పారేయి, తర్వాత `git commit` చేయి.",
    "es_ES": "Quita `secret.env` de staging con `git restore --staged secret.env`, descarta el experimento con `git restore experiment.js`, y luego haz `git commit`."
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
    "de_DE": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Rückgängig machen mit `git restore`",
              "",
              "Jeder ist mal unachtsam und verursacht etwas Chaos. Man fügt versehentlich eine Datei zur Staging Area hinzu oder macht ein kleines Experiment, das man lieber wieder verwirft. `git restore` ist der moderne, genau dafür gemachte Weg solche Sachen rückgängig zu machen. Er ist nutzbar im Arbeitsbereich und in der Staging Area.",
              "",
              "Du kannst es auf zwei Arten nutzen:",
              "",
              "* `git restore --staged <Datei>`: **entferne** eine Datei aus der Staging Area, wobei die Änderung an der Datei aber erhalten bleibt.",
              "* `git restore <Datei>`: **verwerfe** deine Änderungen komplett (sei vorsichtig, alle deine Änderungen sind dann wirklich weg!)",
              "",
              "*(Diese zwei Befehle ersetzen die älteren `git reset HEAD <Datei>` und `git checkout -- <Datei>` Tricks. Gleiche Funktion, aber klarere Namen.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wir haben hier so ein kleines Durcheinander:",
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
              "Du möchtest `app.js` committen, aber hast `secret.env` auch versehentlich in die Staging Area geschoben (es müsste eigentlich zum Commit davor gehören), aber lass uns das später machen. Außerdem hast du ein kleines Experiment in `experiment.js` probiert. Aber das hat nicht so geklappt, wie du es dir vorgestellt hast, also lass uns das komplett verwerfen."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Kümmere dich um das kleine Chaos, dann committe:",
              "",
              "* Entferne das secret aus der Staging Area: `git restore --staged secret.env`",
              "* Verwerfe das kleine Experiment: `git restore experiment.js`",
              "* Committe den Rest: `git commit`",
              "",
              "Das resultiert in einem sauberen Commit, der nur das enthält, was du wirklich drin haben wolltest."
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
              "## Hoàn tác với `git restore`",
              "",
              "Ai cũng có lúc tạo ra vài mớ hỗn độn. Bạn đưa nhầm một tệp vào staging hoặc bắt đầu một thử nghiệm mà bạn muốn vứt bỏ. `git restore` là nút hoàn tác hiện đại, được thiết kế chuyên dụng cho thư mục làm việc và khu vực staging của bạn.",
              "",
              "Nó có hai biến thể chính:",
              "",
              "* `git restore --staged <file>`: **đưa tệp ra khỏi staging** (chuyển nó ra khỏi khu vực staging, nhưng vẫn giữ nguyên các chỉnh sửa của bạn)",
              "* `git restore <file>`: **hủy bỏ hoàn toàn** các chỉnh sửa của bạn đối với một tệp (cẩn thận, thao tác này sẽ xóa sạch các thay đổi!)",
              "",
              "*(Các lệnh này thay thế cho các mẹo cũ `git reset HEAD <file>` và `git checkout -- <file>`. Cùng một ý tưởng nhưng tên gọi rõ ràng hơn nhiều.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Đây là mớ hỗn độn trên bàn làm việc của bạn lúc này:",
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
              "Bạn muốn commit `app.js`, nhưng `secret.env` bị đưa vào staging sớm do sơ ý (nó nên là một commit phía trên), vì vậy hãy để dành nó cho sau. Ngoài ra, các thay đổi trong `experiment.js` không hoạt động nên hãy vứt bỏ hoàn toàn nó đi."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Dọn dẹp lại, sau đó commit:",
              "",
              "* Đưa tệp bí mật ra khỏi staging: `git restore --staged secret.env`",
              "* Hủy bỏ bản thử nghiệm: `git restore experiment.js`",
              "* Commit phần còn lại: `git commit`",
              "",
              "Thao tác đó tạo ra một commit sạch sẽ, chỉ chứa công việc mà bạn thực sự muốn giữ lại."
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
              "İki çeşidi vardır:",
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
              "İşte şu anda masanızdaki dağınıklık:",
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
              "`app.js` dosyasını commit'lemek istiyorsunuz, ama `secret.env` kazara erkenden stage'lendi (onun üstte gelen bir commit olması gerekiyor), o yüzden onu sonraya saklayalım. Ayrıca `experiment.js` değişiklikleri işe yaramadı, o yüzden onları tamamen çöpe atalım."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ortalığı toparlayın, sonra commit'leyin:",
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
    },
    "uk": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Скасування змін за допомогою `git restore`",
              "",
              "Кожен іноді створює невеликий безлад. Ви можете випадково підготувати не той файл або розпочати експеримент, який захочете відкинути. `git restore` — це сучасна, спеціально створена кнопка скасування для вашого робочого каталогу та області підготовлених файлів (індексу).",
              "",
              "Вона має два основних застосування:",
              "",
              "* `git restore --staged <файл>`: **прибрати з індексу** файл (перемістити його назад з області підготовлених файлів, зберігши ваші зміни)",
              "* `git restore <файл>`: повністю **відкинути** ваші зміни у файлі (будьте обережні, це видаляє зміни безповоротно!)",
              "",
              "*(Ці команди замінюють старі прийоми `git reset HEAD <файл>` та `git checkout -- <файл>`. Суть та сама, але назви значно зрозуміліші.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ось який безлад зараз на вашому робочому столі:",
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
              "Ви хочете закомітити `app.js`, але `secret.env` випадково потрапив до підготовлених файлів зарано (він має бути окремим комітом зверху), тому давайте збережемо його на потім. Також зміни в `experiment.js` не спрацювали, тож давайте повністю відкинемо їх."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Наведіть лад, а потім зробіть коміт:",
              "",
              "* Приберіть секретний файл з індексу: `git restore --staged secret.env`",
              "* Відкиньте експеримент: `git restore experiment.js`",
              "* Закомітьте те, що залишилося: `git commit`",
              "",
              "Це створить один чистий коміт, що містить лише ту роботу, яку ви дійсно хотіли зберегти."
            ]
          }
        }
      ]
    },
    "te_IN": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## `git restore` తో అన్‌డూ చేయడం",
              "",
              "ప్రతి ఒక్కరూ కొంచెం గందరగోళం చెందుతారు. ఉద్దేశ్యం లేకుండా ఫైల్ stage చేస్తావు, లేదా పారేయాలనుకునే experiment స్టార్ట్ చేస్తావు. `git restore` మీ వర్కింగ్ డైరెక్టరీ మరియు staging ఏరియా కోసం ఆధునిక, ప్రత్యేకంగా రూపొందించిన అన్‌డూ బటన్.",
              "",
              "ఇది రెండు రకాలుగా పనిచేస్తుంది:",
              "",
              "* `git restore --staged <file>`: ఫైల్ ను **unstage** చేస్తుంది (staging ఏరియా నుండి వెనక్కి తీసుకెళ్తుంది, మీ edits ను keep చేస్తుంది)",
              "* `git restore <file>`: ఫైల్ కు మీ edits ను పూర్తిగా **discard** చేస్తుంది (జాగ్రత్త, ఇది మార్పులను పారేస్తుంది!)",
              "",
              "*(ఇవి పాత `git reset HEAD <file>` మరియు `git checkout -- <file>` trick లను రీప్లేస్ చేస్తాయి. అదే idea, చాలా క్లియర్ పేర్లు.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "మీ టర్న్! మీ పనిని **ఒక్కో ఫైల్** చొప్పున stage చేసి commit చేయి, తద్వారా ప్రతి commit focused గా ఉంటుంది:",
              "",
              "* `git add app.js`, తర్వాత `git commit`",
              "* `git add styles.css`, తర్వాత `git commit`",
              "",
              "ప్రతి commit లక్ష్యం పక్కన ఉన్న ఫైల్ పేర్లు ప్రతి మార్పు ఎక్కడ ఉందో చూపిస్తాయి. రెండు clean commits మరియు level నీదే.",
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
              "## Deshacer con `git restore`",
              "",
              "Todos cometemos errores de vez en cuando. Puedes haber agregado un archivo al staging por accidente, o empezar un experimento que luego quieras descartar. `git restore` es el botón de deshacer moderno, diseñado específicamente para tu directorio de trabajo y área de staging.",
              "",
              "Viene en dos variantes:",
              "",
              "* `git restore --staged <archivo>`: **quitar del staging** un archivo (lo mueve de vuelta fuera del área de staging, manteniendo tus ediciones)",
              "* `git restore <archivo>`: **descartar** completamente tus ediciones en un archivo (¡cuidado, esto elimina los cambios!)",
              "",
              "*(Estos comandos reemplazan los antiguos trucos `git reset HEAD <archivo>` y `git checkout -- <archivo>`. La idea es la misma, pero con nombres mucho más claros.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Aquí está el desorden en tu escritorio ahora mismo:",
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
              "Quieres hacer commit de `app.js`, pero `secret.env` se agregó al staging por accidente (debería ir en un commit posterior), así que lo dejaremos para después. Además, los cambios en `experiment.js` no funcionaron, así que los descartaremos por completo."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ordena el desorden y luego haz commit:",
              "",
              "* Quita el archivo secreto del staging: `git restore --staged secret.env`",
              "* Descarta el experimento: `git restore experiment.js`",
              "* Haz commit de lo que queda: `git commit`",
              "",
              "Esto dará como resultado un único commit limpio, que solo contiene el trabajo que realmente querías conservar."
            ]
          }
        }
      ]
    }
  },
};
