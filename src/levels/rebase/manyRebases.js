exports.level = {
  "compareOnlyMainHashAgnostic": true,
  "disabledMap": {
    "git revert": true,
    "git cherry-pick": true
  },
  "goalTreeString": "%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22main%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22bugFix%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C6%27%22%2C%22id%22%3A%22side%22%7D%2C%22another%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22another%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C6%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  "solutionCommand": "git rebase main bugFix;git rebase bugFix side;git rebase side another;git rebase another main",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"side\":{\"target\":\"C6\",\"id\":\"side\"},\"another\":{\"target\":\"C7\",\"id\":\"another\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C0\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C5\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Rebasing over 9000 times",
    "ar": "إعادة التأسيس أكثر من 9000 مرة",
    "fa": "بیش از ۹۰۰۰ بار ری‌بیس (Rebase) کردن",
    "de_DE": "9000 Rebases unter dem `HEAD`",
    "es_AR": "Rebaseando más de 9000 veces",
    "es_MX": "Rebaseando más de 9000... veces",
    "es_ES": "Rebaseando más de 9000 veces",
    "pt_BR": "Fazendo mais de 9000 rebases",
    "gl": "Facendo máis de 9000 rebases",
    "fr_FR": "Rebaser plus de 1000 fois",
    "ko": "9천번이 넘는 리베이스",
    "ja": "9000回以上のrebase",
    "zh_CN": "多次 Rebase",
    "zh_TW": "N次Rebase",
    "ro": "Rebase de peste 9000 ori",
    "bg": "Rebase над 9000 пъти",
    "ru_RU": "Rebase over 9000 раз",
    "uk": "Rebase over 9000 разів",
    "vi": "Rebase hơn 9000 lần",
    "sl_SI": "Več kot 9000 Rebaseov",
    "it_IT": "Rebasing livello 9000",
    "pl": "Rebase ponad 9000 razy",
    "tr_TR": "9000 kereden fazla rebase işlemi yapmak",
    "hu_HU": "Sok rebase",
    "az": "9000-dən çox dəfə rebase etmək",
    "te_IN": "9000 కంటే ఎక్కువసార్లు rebase చేయడం"
  },
  "hint": {
    "en_US": "Remember, the most efficient way might be to only update main at the end...",
    "ar": "تذكّر، أكثر الطرق كفاءةً قد تكون تحديث الفرع main في النهاية فقط...",
    "fa": "به یاد داشته باشید، کارآمدترین راه ممکن است این باشد که فقط در پایان کار main را به‌روزرسانی کنید...",
    "de_DE": "Nicht vergessen: Nur den main zu aktualisieren könnte die effizienteste Möglichkeit sein ...",
    "es_AR": "Acordate, la manera más eficiente podría ser actualizar main sólo al final...",
    "es_MX": "Recuerda, la manera más eficiente podría ser actualizar main hasta el final...",
    "es_ES": "Recuerda, la manera más eficiente podría ser actualizar main sólo al final...",
    "pt_BR": "Lembre-se, a forma mais eficiente pode ser atualizar a main por último...",
    "gl": "Lembra, a forma máis eficiente pode ser actualizar a rama main ó final...",
    "fr_FR": "Rappelez-vous, la façon la plus efficace peut être de mettre à jour main seulement à la fin...",
    "ja": "最も効率的なやり方はmainを最後に更新するだけかもしれない・・・",
    "ko": "아마도 main을 마지막에 업데이트하는 것이 가장 효율적인 방법일 것입니다...",
    "zh_CN": "记住，最后更新 main 分支可能是最高效的方法……",
    "zh_TW": "要記住喔! 把 main branch 留到最後更新可能是最有效率的方法。",
    "ro": "Amintește-ți, cea mai eficientă metodă ar putea fi să actualizezi main-ul doar la final...",
    "bg": "Помни — най-ефективният подход може да е да обновиш `main` чак накрая...",
    "ru_RU": "Не забудь, что лучше всего сдвинуть мастер в самом конце...",
    "uk": "Пам’ятайте, що краще всього буде перемістити main в самому кінці... ",
    "vi": "Hãy nhớ rằng, cách tốt nhất có thể là cập nhật nhánh `main` sau cùng...",
    "sl_SI": "Pomni, morda je najbolj učinkovit način posodabljanje masterja samo na koncu ...",
    "it_IT": "Ricorda, il modo migliore potrebbe essere di aggiornare il main alla fine...",
    "pl": "Pamiętaj, że najskuteczniejszym sposobem może być aktualizacja `main` dopiero na samym końcu...",
    "tr_TR": "Şunu hatırlamanı isterim ki: belki de en verimli yol işin sonunda maini güncellemektir.",
    "hu_HU": "Ne feledd, a leghatékonyabb módszer talán az, ha a main-t csak a végén frissíted...",
    "az": "Yadında saxla, ən səmərəli yol bəlkə də main-i yalnız sonda yeniləməkdir...",
    "te_IN": "గుర్తుపెట్టుకో, అత్యంత ఎఫిషియెంట్ మార్గం చివర్లో main ను మాత్రమే అప్‌డేట్ చేయడం కావచ్చు..."
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
              "Man, we have a lot of branches going on here! Let's rebase all the work from these branches onto main.",
              "",
              "Upper management is making this a bit trickier though -- they want the commits to all be in sequential order. So this means that our final tree should have `C7'` at the bottom, `C6'` above that, and so on, all in order.",
              "",
              "One handy tip: `git rebase` can take a second argument. `git rebase main bugFix` checks out `bugFix` and rebases it onto `main` in one step -- a shorthand for `git checkout bugFix; git rebase main`.",
              "",
              "If you mess up along the way, feel free to use `reset` to start over again. Be sure to check out our solution and see if you can do it in fewer commands!"
            ]
          }
        }
      ]
    },
    "ar": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### إعادة تأسيس فروع متعددة",
              "",
              "يا إلهي، لدينا الكثير من الفروع هنا! دعنا نُعيد تأسيس كل العمل من هذه الفروع إلى الفرع main.",
              "",
              "غير أن الإدارة العليا تجعل الأمر أصعب قليلاً -- فهي تريد أن تكون جميع عمليات الحفظ مرتبةً بشكل تسلسلي. هذا يعني أن شجرتنا النهائية يجب أن تحتوي على `C7'` في الأسفل، وفوقه `C6'`، وهكذا، كل شيء بالترتيب.",
              "",
              "نصيحة مفيدة: يمكن للأمر `git rebase` أن يأخذ وسيطًا ثانيًا. فالأمر `git rebase main bugFix` ينتقل إلى الفرع `bugFix` ويعيد تأسيسه على `main` في خطوة واحدة -- وهو اختصار لـ `git checkout bugFix; git rebase main`.",
              "",
              "إذا ارتكبت خطأً في الطريق، فلا تتردد في استخدام `reset` للبدء من جديد. تأكد من مراجعة الحل المقترح ومعرفة ما إذا كان بإمكانك تنفيذه بعدد أقل من الأوامر!"
            ]
          }
        }
      ]
    },
    "fa": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ری‌بیس کردن چندین شاخه",
              "",
              "پسر، ما اینجا شاخه‌های زیادی داریم! بیایید تمام کارها را از این شاخه‌ها به main ری‌بیس کنیم.",
              "",
              "با این حال، مدیریت ارشد این کار را کمی پیچیده‌تر کرده است -- آن‌ها می‌خواهند همه کامیت‌ها به ترتیب متوالی باشند. بنابراین این بدان معناست که درخت نهایی ما باید `C7'` را در پایین، `C6'` را بالای آن و به همین ترتیب، همه را به ترتیب داشته باشد.",
              "",
              "یک نکتهٔ کاربردی: دستور `git rebase` می‌تواند آرگومان دومی هم بگیرد. دستور `git rebase main bugFix` در یک مرحله شاخهٔ `bugFix` را چک‌اوت کرده و آن را روی `main` ری‌بیس می‌کند -- که میان‌بری است برای `git checkout bugFix; git rebase main`.",
              "",
              "اگر در طول مسیر دچار اشتباه شدید، با خیال راحت از `reset` برای شروع مجدد استفاده کنید. حتماً راه حل ما را بررسی کنید و ببینید آیا می‌توانید آن را با دستورات کمتری انجام دهید!"
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
              "Che, ¡hay un montón de ramas acá! Rebaseemos todo el trabajo de esas ramas sobre main.",
              "",
              "La gente de administración nos está haciendo las cosas un poco complicadas, igual -- quieren que nuestros commits estén todos en orden secuencial. Esto significa que nuestro árbol final tendría que tener `C7` al final, `C6` antes de ese, y así siguiendo, todos en orden.",
              "",
              "Un tip útil: `git rebase` puede recibir un segundo argumento. `git rebase main bugFix` hace checkout de `bugFix` y la rebasea sobre `main` en un solo paso -- un atajo para `git checkout bugFix; git rebase main`.",
              "",
              "Si hacés líos en el camino, sentite libre de usar `reset` para empezar de nuevo. ¡Asegurate de verificar tu solución y ver si podés hacerla en alguna cantidad menor de commandos!"
            ]
          }
        }
      ]
    },
    "es_MX": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Rebaseando múltiples ramas",
              "",
              "Mira eso, ¡hay un montón de ramas aquí! Hagamos rebase de todo el trabajo de esas ramas hacia main.",
              "",
              "La alta dirección nos está haciendo las cosas un poco más complicadas -- quieren que nuestros commits estén todos en orden secuencial. Esto significa que nuestro árbol final tendría que tener `C7'` al final, `C6'` antes de ese, y así, todos en orden.",
              "",
              "Un consejo útil: `git rebase` puede recibir un segundo argumento. `git rebase main bugFix` hace checkout de `bugFix` y la rebasea sobre `main` en un solo paso -- un atajo para `git checkout bugFix; git rebase main`.",
              "",
              "Si te revuelves durante el camino, siéntete libre de usar `reset` para empezar de nuevo. ¡Asegúrate de verificar nuestra solución y ver si puedes lograrlo en un número menor de comandos!"
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
              "### Rebaseando múltiples ramas",
              "",
              "Fíjate, ¡hay un montón de ramas aquí! Rebaseemos todo el trabajo de esas ramas sobre main.",
              "",
              "La gente de administración nos está haciendo las cosas un poco complicadas, igual -- quieren que nuestros commits estén todos en orden secuencial. Esto significa que nuestro árbol final tendría que tener `C7` al final, `C6` antes de ese, y así siguiendo, todos en orden.",
              "",
              "Un consejo útil: `git rebase` puede recibir un segundo argumento. `git rebase main bugFix` hace checkout de `bugFix` y la rebasea sobre `main` en un solo paso -- un atajo para `git checkout bugFix; git rebase main`.",
              "",
              "Si te haces un lío durante el proceso, siéntete libre de usar `reset` para empezar de nuevo. ¡Asegúrate de verificar tu solución y ver si puedes realizarla en un número inferior de comandos!"
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
              "### Fazendo rebase em múltiplas branches",
              "",
              "Cara, temos um monte de branches aqui! Vamos fazer um rebase de todo o trabalho contido nessas branches para a main.",
              "",
              "No entanto, a cúpula da administração está tornando as coisas mais difíceis -- eles querem que os commits estejam todos em ordem sequencial. Isso significa que a nossa árvore final precisa ter o `C7'` por último, `C6'` acima disso, e assim por diante, tudo ordenado.",
              "",
              "Uma dica útil: o `git rebase` pode receber um segundo argumento. `git rebase main bugFix` faz checkout da `bugFix` e o rebase dela sobre a `main` em um único passo -- um atalho para `git checkout bugFix; git rebase main`.",
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
              "Neno, temos unha chea de ramas aquí! Imos facer rebase de todo o traballo contido nesas ramas para a main.",
              "",
              "A xente de administración estanos a facer as cousas complicadas, igual eles queren que os commits estén todos en orde secuencial. Isto significa que a nosa árbore final precisa ter `C7'` de último, `C6'` inda por riba, está por adiante, todo ordeado.",
              "",
              "Un consello útil: `git rebase` pode recibir un segundo argumento. `git rebase main bugFix` fai checkout da `bugFix` e o rebase dela sobre a `main` nun só paso -- un atallo para `git checkout bugFix; git rebase main`.",
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
              "Dis-donc, nous avons beaucoup de branches par ici ! Rebasons tout le travail de ces branches dans main.",
              "",
              "Les patrons rendent cela encore plus compliqué -- ils veulent que les commits soient faits de manière séquentielle. Cela signifie donc que dans votre arbre final `C7'` est tout en bas, `C6'` juste au-dessus, et ainsi de suite, dans cet ordre.",
              "",
              "Une astuce pratique : `git rebase` peut prendre un second argument. `git rebase main bugFix` fait un checkout de `bugFix` et la rebase sur `main` en une seule étape -- un raccourci pour `git checkout bugFix; git rebase main`.",
              "",
              "Si vous faites une erreur en cours de route, n'hésitez pas à utiliser `reset` pour recommencer. Pensez à comparer votre solution à la nôtre et voyez si vous pouvez le faire en moins de commandes !"
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
              "Wow, wir haben hier ja eine Menge Branches! Lass uns mal die ganze Arbeit, die in diesen Branches steckt, auf den `main` packen, um sie auf Stand zu bringen.",
              "",
              "Die Führungsetage macht die Sache allerdings etwas trickreicher -- sie möchte, dass alle Commits in aufsteigender Reihenfolge geordnet sind. Das heißt unser fertiger Baum sollte `C7` ganz unten haben, darüber `C6` und so weiter und so fort.",
              "",
              "Ein praktischer Tipp: `git rebase` kann ein zweites Argument bekommen. `git rebase main bugFix` checkt `bugFix` aus und rebased ihn in einem Schritt auf den `main` -- eine Abkürzung für `git checkout bugFix; git rebase main`.",
              "",
              "Wenn du irgendwo einen Fehler machst, benütze ruhig `reset` um wieder von vorne anzufangen oder `undo` um einen Schritt zurückzugehen. Schau dir die Lösung an und versuche es in weniger Schritten hinzubekommen."
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
              "さあ、いくつものブランチが出てきます。このブランチたち全てをmainブランチにリベースしましょう。",
              "",
              "おエライさん方が今回の仕事を少しトリッキーにしてくれました -- コミットはすべて一列の連続した状態にしてほしいそうです。つまり私たちが作るリポジトリの最終的なツリーの状態は、`C7'`が最後に来て、`C6'`がその一つ上に来て、、と順に積み重なるイメージです。",
              "",
              "便利なヒント：`git rebase`には2つ目の引数を渡すことができます。`git rebase main bugFix`は、`bugFix`をチェックアウトして`main`にリベースするところまでを一度に行ってくれます。つまり`git checkout bugFix; git rebase main`の省略形です。",
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
              "哇，现在我们这里出现了很多分支呢！让我们把所有这些分支上所做的工作都通过 rebase 合并到 main 分支上吧。",
              "",
              "但是你的领导给你提了点要求 —— 他们希望得到有序的提交历史，也就是我们最终的结果应该是 `C6'` 在 `C7'` 上面， `C5'` 在 `C6'` 上面，依此类推。",
              "",
              "一个实用的小技巧：`git rebase` 命令可以带第二个参数。`git rebase main bugFix` 会先切换到 `bugFix` 分支，再把它 rebase 到 `main` 上，一步到位 —— 相当于 `git checkout bugFix; git rebase main` 的简写。",
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
              "嗨！現在我們有很多 branch 了啦！讓我們做一下 rebase，將這些分支接到 main branch 上吧。",
              "",
              "但是你的主管找了點麻煩，他們希望得到有序的 commit history，也就是我們最終的結果是 `C7'` 在最下面，`C6'` 在它上面，以此類推。",
              "",
              "一個實用的小技巧：`git rebase` 指令可以帶第二個參數。`git rebase main bugFix` 會先 checkout `bugFix`，再將它 rebase 到 `main` 上，一步完成 -- 相當於 `git checkout bugFix; git rebase main` 的簡寫。",
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
              "음, 여기 꽤 여러개의 브랜치가 있습니다! 이 브랜치들의 모든 작업내역을 `main` 브랜치에 리베이스 해볼까요?",
              "",
              "윗선에서 일을 복잡하게 만드네요 -- 그 분들이 이 모든 커밋들을 순서에 맞게 정렬하라고 합니다. 그럼 결국 우리의 최종 목표 트리는 제일 아래에 `C7'` 커밋, 그 위에 `C6'` 커밋, 또 그 위에 순서대로 보여합니다.",
              "",
              "유용한 팁 하나: `git rebase`는 두 번째 인자를 받을 수 있습니다. `git rebase main bugFix`는 `bugFix`를 체크아웃하고 `main`에 리베이스하는 것을 한 번에 해줍니다 -- 즉 `git checkout bugFix; git rebase main`의 축약형입니다.",
              "",
              "만일 작업중에 내용이 꼬인다면, `reset`이라고 쳐서 처음부터 다시 시작할 수 있습니다. 모범 답안을 확인해 보시고, 혹시 더 적은 수의 커맨드로 해결할 수 있는지 알아보세요!"
            ]
          }
        }
      ]
    },
    "ro": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Rebase mai multe ramuri",
              "",
              "Avem o grămadă de ramuri aici! Hai să facem rebase la tot ce s-a lucrat în aceste ramuri pe main.",
              "",
              "Dar șefii ne complică puțin viața -- vor ca toate commit-urile să fie în ordine secvențială. Asta înseamnă că arborele nostru final ar trebui să aibă `C7'` jos, `C6'` deasupra lui și așa mai departe, totul în ordine.",
              "",
              "Un sfat util: `git rebase` poate primi un al doilea argument. `git rebase main bugFix` face checkout pe `bugFix` și îi face rebase pe `main` într-un singur pas -- o prescurtare pentru `git checkout bugFix; git rebase main`.",
              "",
              "Dacă te încurci pe parcurs, nu ezita să folosești `reset` pentru a începe de la capăt. Asigură-te că verifici soluția noastră și vezi dacă poți să o faci cu mai puține comenzi!"
            ]
          }
        }
      ]
    },
    "bg": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Rebase на множество клонове",
              "",
              "Уау, тук имаме доста клонове! Нека прехвърлим (rebase-нем) цялата работа от тези клонове върху `main`.",
              "",
              "Висшето ръководство обаче прави задачата малко по-сложна — искат всички комити да са в строг последователен ред. Това означава, че крайното дърво трябва да има `C7'` най-отдолу, `C6'` над него и така нататък, всичко подред.",
              "",
              "Полезен съвет: `git rebase` може да приеме втори аргумент. `git rebase main bugFix` превключва към `bugFix` и го rebase-ва върху `main` с една стъпка — съкратен запис на `git checkout bugFix; git rebase main`.",
              "",
              "Ако объркаш нещо по пътя, спокойно можеш да използваш `reset`, за да започнеш отначало. Не забравяй да погледнеш нашето решение и да видиш дали можеш да се справиш с по-малко команди!"
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
              "Полезный совет: `git rebase` может принимать второй аргумент. `git rebase main bugFix` переключается на `bugFix` и делает rebase на `main` за один шаг – это сокращение для `git checkout bugFix; git rebase main`.",
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
              "В нас тут до біса гілок! Перенесімо всі зміни з різних гілок в main.",
              "",
              "Але вище керівництво нам не полегшує життя -- вони хочуть, щоб всі коміти були впорядковані. Це означає, що в результаті коміт `C7'` має бути з самого низу, `C6'` трохи вище, і так далі, все за порядком.",
              "",
              "Корисна порада: `git rebase` може приймати другий аргумент. `git rebase main bugFix` переключається на `bugFix` та робить rebase на `main` за один крок -- це скорочення для `git checkout bugFix; git rebase main`.",
              "",
              "Якщо Ви щось зробите не так, сміливо використовуйте `reset` щоб почати спочатку. Подивіться на наш розв’язок і подумайте, чи Ви можете обійтись меншою кількістю команд!"
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
              "### Rebase nhiều nhánh",
              "",
              "Giời ạ, sao mà nhiều nhánh thế không biết! Chuyển hết chúng vào `main` thôi.",
              "",
              "Nhưng mà cha quản lý lại muốn oái oăm hơn cơ -- hắn muốn tất cả commit xếp thẳng hàng. Nghĩa là cây lịch sử của ta sẽ có `C7'` ở cuối, phía trên là `C6'`, và cứ thế theo đúng thứ tự.",
              "",
              "Một mẹo hữu ích: `git rebase` có thể nhận thêm đối số thứ hai. `git rebase main bugFix` sẽ checkout nhánh `bugFix` rồi rebase nó vào `main` chỉ trong một bước -- cách viết tắt của `git checkout bugFix; git rebase main`.",
              "",
              "Nếu mà nhỡ may bạn làm nhầm thì có thể dùng lệnh `reset` để bắt đầu lại. Hãy nhớ đối chiếu với đáp án của chúng tôi xem bạn có thể hoàn thành với ít câu lệnh hơn không!"
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
              "### Rebasing Večih Branchev",
              "",
              "Uf, tu imamo pa res veliko branchev! Pojdimo in rebaseajmo vse delo iz teh branchev na main.",
              "",
              "Toda vodstvo se je odločilo, da le ne bo tako preprosto -- žeijo da so vsi commiti v zaporednem vrstnem redu. To pomeni, da bo naše ciljno drevo moralo imeti `C7'` na dnu, `C6'` nad njim, in tako dalje po vrsti.",
              "",
              "Uporaben nasvet: `git rebase` lahko sprejme drugi argument. `git rebase main bugFix` v enem koraku checkouta `bugFix` in ga rebasea na `main` -- bližnjica za `git checkout bugFix; git rebase main`.",
              "",
              "Če med reševanjem zamočiš, preprosto uporabi `reset`, da začneš znova. Poglej tudi našo rešitev in preveri, če lahko stopnjo rešiš še z manj ukazi!"
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
              "### Rebase wielu gałęzi",
              "",
              "Człowieku, ależ tu pełno gałęzi! Przenieśmy wszystkie prace z tych gałęzi na `main`.",
              "",
              "Kierownictwo trochę utrudnia sprawę -- chcą, aby wszystkie commity były w odpowiedniej kolejności. Oznacza to, że nasze końcowe drzewo powinno mieć `C7'` na dole, `C6'` powyżej i tak dalej.",
              "",
              "Przydatna wskazówka: `git rebase` może przyjąć drugi argument. `git rebase main bugFix` przełącza się na `bugFix` i wykonuje rebase na `main` w jednym kroku -- to skrót dla `git checkout bugFix; git rebase main`.",
              "",
              "Jeśli po drodze namieszasz, nie krępuj się użyć `reset`, aby zacząć od nowa. Przeanalizuj nasze rozwiązanie i sprawdź, czy dasz radę to zrobić, używając mniejszej liczby poleceń!"
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
              "### Fare rebase con più rami",
              "",
              "Hey, qui abbiamo un bel po' di rami! Facciamo un po' di rebase di questi rami nel main.",
              "",
              "I piani alti ci stanno rendendo la vita complicata -- vogliono i commit tutti in ordine progressivo. Questo significa che alla fine il nostro albero avrà `C7'` come ultimo commit, `C6'` sopra di esso, e così via, tutto in ordine.",
              "",
              "Un consiglio utile: `git rebase` può ricevere un secondo argomento. `git rebase main bugFix` fa il checkout di `bugFix` e il rebase sul `main` in un solo passo -- una scorciatoia per `git checkout bugFix; git rebase main`.",
              "",
              "Se ti smarrisci lungo la via, usa `reset` senza problemi per ripartire da capo. Assicurati di raggiungere l'obiettivo e cerca di farlo con il minor numero di comandi!"
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
              "### Birden fazla branch'ı rebase etmek",
              "",
              "Dostum, burada bir sürü branch'imiz var! Hadi bu branch'lerdeki tüm çalışmayı `main`'e rebase edelim.",
              "",
              "Ancak üst yönetim işi biraz zorlaştırıyor -- tüm commit'lerin sıralı olmasını istiyorlar. Yani bu, ağacımızın son halinin en altta `C7'`, onun üstünde `C6'`, vs. sırayla olması gerektiği anlamına geliyor.",
              "",
              "Faydalı bir ipucu: `git rebase` ikinci bir argüman alabilir. `git rebase main bugFix`, tek adımda `bugFix` branch'ine geçer ve onu `main` üzerine rebase eder -- yani `git checkout bugFix; git rebase main` komutlarının kısayoludur.",
              "",
              "Yolda bir şeyleri karıştırırsanız, yeniden başlamak için `reset` kullanmaktan çekinmeyin. Çözümümüze göz atmayı ve bu seviyeyi daha az komutla bitirip bitiremeyeceğinizi denemeyi unutmayın!"
            ]
          }
        }
      ]
    },
    "hu_HU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Több ág rebase-elése",
              "",
              "Hú, sok águnk van itt! Rebase-eljük az összes munkát ezekről az ágakról a main-re.",
              "",
              "A felsőbb vezetés azonban egy kicsit nehezebbé teszi ezt -- azt szeretnék, hogy az összes commit sorban legyen egymás után. Ez azt jelenti, hogy a végső fánkon a `C7'`-nek legyen legalul, a `C6'` fölötte, és így tovább, sorban.",
              "",
              "Egy hasznos tipp: a `git rebase` kaphat egy második argumentumot is. A `git rebase main bugFix` egy lépésben checkoutolja a `bugFix`-et és rebase-eli a `main`-re -- a `git checkout bugFix; git rebase main` rövidítése.",
              "",
              "Ha elrontod útközben, nyugodtan használd a `reset`-et az újrakezdéshez. Feltétlenül nézd meg a megoldásunkat, és nézd meg, hogy kevesebb paranccsal is megoldható-e!"
            ]
          }
        }
      ]
    },
    "az": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Bir neçə Branch-ı Rebase Etmək",
              "",
              "Burda çoxlu branch var! Gəl bu branch-lardakı bütün işi main-ə rebase edək.",
              "",
              "Ancaq yuxarı rəhbərlik işi bir az çətinləşdirir -- onlar bütün commit-lərin ardıcıl sırada olmasını istəyir. Bu o deməkdir ki, son ağacımızda `C7'` ən aşağıda, onun üstündə `C6'` və s. sırayla olmalıdır.",
              "",
              "Faydalı bir məsləhət: `git rebase` ikinci arqument də qəbul edə bilər. `git rebase main bugFix` bir addımda `bugFix`-ə keçir və onu `main` üzərinə rebase edir -- yəni `git checkout bugFix; git rebase main`-in qısa formasıdır.",
              "",
              "Yol boyu səhv etsən, yenidən başlamaq üçün `reset`-dən istifadə et. Həllimizi mütləq yoxla və gör daha az əmrlə edə bilərsənmi!"
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
              "### ఒకటి కంటే ఎక్కువ branches ను Rebase చేయడం",
              "",
              "ఇక్కడ చాలా branches ఉన్నాయి! ఈ branches లోని పని అంతా main కు rebase చేద్దాం.",
              "",
              "కానీ పై డైరెక్షన్ పనిని కొంచెం క్లిష్టంగా చేస్తుంది -- అవి అన్ని commits ను వరుస క్రమంలో ఉంచాలని అనుకుంటున్నాయి. అంటే చివరి tree లో `C7'` కింద, దాని పై `C6'` మరియు అలా ఉండాలి.",
              "",
              "ఉపయోగకరమైన టిప్: `git rebase` రెండో ఆర్గ్యుమెంట్ కూడా తీసుకుంటుంది. `git rebase main bugFix` ఒకే step లో `bugFix` కు వెళ్ళి, దాన్ని `main` పై rebase చేస్తుంది -- అంటే `git checkout bugFix; git rebase main` యొక్క షార్ట్ ఫార్మ్.",
              "",
              "దారిలో తప్పు జరిగితే, మళ్ళీ స్టార్ట్ చేయడానికి `reset` యూజ్ చేయి. మా సొల్యూషన్ చూసి, తక్కువ commands తో చేయగలవో చూడు!"
            ]
          }
        }
      ]
    }
  }
};