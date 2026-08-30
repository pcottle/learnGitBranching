exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C4\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\",\"localBranchesThatTrackThis\":null},\"o/main\":{\"target\":\"C3\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C3\",\"id\":\"main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git pull",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\",\"localBranchesThatTrackThis\":null},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C3\",\"id\":\"main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git Pullin'",
    "fa": "گیت پول (Git Pull)",
    "zh_CN": "Git Pull",
    "zh_TW": "git pull",
    "es_AR": "git pull",
    "es_ES": "git pull",
    "pt_BR": "Git Pull",
    "gl": "Git Pull",
    "de_DE": "Git Pull",
    "ja": "Git Pull",
    "fr_FR": "Git pull",
    "ro": "Git pull",
    "bg": "Git Pull",
    "ru_RU": "Git pull",
    "uk": "Git pull",
    "ko": "Git pull",
    "vi": "Git pull",
    "sl_SI": "Git Pull",
    "pl": "Git pull",
    "it_IT": "Git Pull",
    "tr_TR": "Git Pull",
    "hu_HU": "Git pull",
    "az": "Git Pull"
  },
  "hint": {
    "en_US": "Just run git pull!",
    "fa": "فقط git pull را اجرا کنید!",
    "zh_CN": "运行 git pull 命令就可以了！",
    "zh_TW": "只要下 git pull 這個指令即可",
    "es_AR": "Simplemente ¡hacé git pull!",
    "es_MX": "Simplemente ¡ejecuta git pull!",
    "es_ES": "Simplemente ¡ejecuta git pull!",
    "pt_BR": "Basta executar git pull!",
    "gl": "Sinxelamente fai git pull!",
    "de_DE": "Führe einfach git pull aus.",
    "ja": "単にgit pullを実行！",
    "fr_FR": "Utilisez facilement git pull !",
    "ro": "Pur și simplu rulează git pull!",
    "bg": "Просто изпълни git pull!",
    "ru_RU": "Запустите комманду git pull !",
    "uk": "Просто виконайте git pull !",
    "ko": "그냥 git pull을 하세요!",
    "vi": "Đơn giản là gõ git pull!",
    "sl_SI": "Samo izvedi git pull!",
    "pl": "Po prostu uruchom git pull!",
    "it_IT": "Semplicemente git pull!",
    "tr_TR": "Sadece git pull komutunu çalıştırın!",
    "hu_HU": "Csak futtasd a git pull-t!",
    "az": "Sadəcə git pull et!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Pull",
              "",
              "Now that we've seen how to fetch data from a remote repository with `git fetch`, let's update our work to reflect those changes!",
              "",
              "There are actually many ways to do this -- once you have new commits available locally, you can incorporate them as if they were just normal commits on other branches. This means you could execute commands like:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "In fact, the workflow of *fetching* remote changes and then *merging* them is so common that git actually provides a command that does both at once! That command is `git pull`.",
              "",
              "*Note:* Git 2.27 introduced a warning when no pull strategy was configured. Since Git 2.34, a bare `git pull` stops on diverged branches in that situation and asks you to choose how to reconcile them. Use `git pull --no-rebase` to merge, or `git pull --rebase` to rebase. In this simulator, `git pull` defaults to the merge behavior."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's first see a `fetch` and a `merge` executed sequentially."
            ],
            "afterMarkdowns": [
              "Boom -- we downloaded `C3` with a `fetch` and then merged in that work with `git merge o/main`. Now our `main` branch reflects the new work from the remote (in this case, named `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What would happen if we used `git pull` instead?"
            ],
            "afterMarkdowns": [
              "The same thing! That should make it very clear that this simulator treats `git pull` as shorthand for `git fetch` followed by a merge of the branch that was just fetched. In real Git, that merge behavior corresponds to `git pull --no-rebase` when branches have diverged."
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "We will explore the details of `git pull` later (including options and arguments), but for now let's try it out in the level.",
              "",
              "Remember -- you can actually solve this level with just `fetch` and `merge`, but it will cost you an extra command :P"
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
              "## Git Pull",
              "",
              "حالا که دیدیم چگونه با `git fetch` داده‌ها را از مخزن ریموت دریافت کنیم، بیایید کار خود را برای بازتاب آن تغییرات به‌روز کنیم!",
              "",
              "در واقع راه‌های زیادی برای انجام این کار وجود دارد -- زمانی که کامیت‌های جدید به صورت محلی در دسترس باشند، می‌توانید آن‌ها را طوری ادغام کنید که گویی کامیت‌های معمولی در شاخه‌های دیگر هستند. این بدان معناست که می‌توانید دستوراتی مانند زیر را اجرا کنید:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* و غیره.",
              "",
              "در واقع، جریان کاری *دریافت* (fetching) تغییرات ریموت و سپس *ادغام* (merging) آن‌ها آنقدر رایج است که گیت در واقع دستوری را ارائه می‌دهد که هر دو کار را همزمان انجام می‌دهد! آن دستور `git pull` است.",
              "",
              "*توجه:* در گیت 2.34 و نسخه‌های جدیدتر، اگر شاخه‌های محلی و ریموت شما واگرا شده باشند و هیچ راهبردی برای pull پیکربندی نشده باشد، `git pull` ساده متوقف می‌شود و از شما می‌خواهد نحوه همگام‌سازی را مشخص کنید. برای ادغام از `git pull --no-rebase` و برای rebase از `git pull --rebase` استفاده کنید. در این شبیه‌ساز، `git pull` به طور پیش‌فرض رفتار ادغام را دارد."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "بیایید ابتدا اجرای متوالی یک `fetch` و یک `merge` را ببینیم."
            ],
            "afterMarkdowns": [
              "بوم -- ما `C3` را با یک `fetch` دانلود کردیم و سپس آن کار را با `git merge o/main` ادغام کردیم. اکنون شاخه `main` ما کار جدید را از ریموت (در این مورد، با نام `origin`) منعکس می‌کند."
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "اگر به جای آن از `git pull` استفاده می‌کردیم چه اتفاقی می‌افتاد؟"
            ],
            "afterMarkdowns": [
              "همان اتفاق! این باید کاملاً روشن کند که `git pull` اساساً مخفف یک `git fetch` است که به دنبال آن ادغام هر شاخه‌ای که تازه دریافت شده است، انجام می‌شود. (در گیت واقعی 2.34+، این معادل `git pull --no-rebase` است زمانی که شاخه‌ها واگرا شده‌اند.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "ما جزئیات `git pull` را بعداً بررسی خواهیم کرد (شامل گزینه‌ها و آرگومان‌ها)، اما در حال حاضر بیایید آن را در این مرحله امتحان کنیم.",
              "",
              "به یاد داشته باشید -- شما در واقع می‌توانید این مرحله را فقط با `fetch` و `merge` حل کنید، اما این کار برای شما یک دستور اضافی هزینه خواهد داشت :P"
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
              "## Git Pull",
              "",
              "Maintenant que vous avez vu comment rapatrier des données depuis un dépôt distant avec `git fetch`, mettons à jour notre copie de travail pour refléter ces changements !",
              "",
              "Il existe en fait beaucoup de façons de faire cela -- une fois que vous avez de nouveaux commits disponibles localement, vous pouvez les incorporer dans votre branche de travail comme s'ils étaient des commits normaux d'autres branches. Cela signifie que pourriez simplement exécuter des commandes comme :",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "En fait, le principe de *rapatrier* (fetch) les branches distantes puis les *fusionner* (merge) est si commun que Git a en réalité une commande pour faire les deux à la fois ! Cette commande est `git pull`.",
              "",
              "*Remarque :* Avec Git 2.34 ou une version ultérieure, si vos branches locale et distante ont divergé et qu’aucune stratégie de pull n’est configurée, un simple `git pull` s’arrête et vous demande comment les réconcilier. Utilisez `git pull --no-rebase` pour une fusion, ou `git pull --rebase` pour un rebase. Dans ce simulateur, `git pull` utilise le comportement de fusion par défaut."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons d'abord un `fetch` puis un `merge` exécutés séquentiellement."
            ],
            "afterMarkdowns": [
              "Boum -- nous avons téléchargé `C3` avec un `fetch` et ensuite nous avons fusionné ce travail dans notre copie avec `git merge o/main`. Maintenant notre branche `main` reflète le nouveau travail du dépôt distant (dans ce cas, nommé `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Que se passerait-il si nous utilisions plutôt `git pull` ?"
            ],
            "afterMarkdowns": [
              "La même chose ! Cela devrait maintenant être clair que `git pull` est surtout un raccourci pour `git fetch` suivi d'un merge de toutes les branches qui viennent d'avoir un fetch. (Dans le vrai git 2.34+, c'est équivalent à `git pull --no-rebase` quand les branches ont divergé.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Nous allons explorer les détails de `git pull` plus tard (y compris options et arguments), mais pour ce niveau pratiquons d'abord la technique de base.",
              "",
              "Rappelez-vous : vous pouvez aussi résoudre ce niveau avec `fetch` et `merge`, mais cela vous coûtera une commande supplémentaire :P"
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
              "## Git Pull",
              "",
              "Ahora que vimos cómo traer datos de un repositorio remoto con `git fetch`, ¡actualicemos nuestro trabajo local para reflejar esos cambios!",
              "",
              "Realmente hay varias formas de hacer esto: una vez que tenés los commits disponibles localmente, podés integrarlos como si fueran commits comunes de otras ramas. Esto significa que podrías ejecutar comandos como:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "De hecho, el flujo de trabajo de *fetchear* cambios remotos y después *mergearlos* es tan común que git incluye un comando que hace ambas cosas de una: ¡`git pull`!",
              "",
              "*Nota:* En Git 2.34 o posterior, si tus ramas local y remota divergieron y no configuraste una estrategia de pull, un `git pull` a secas se detiene y te pide que elijas cómo reconciliarlas. Usá `git pull --no-rebase` para hacer un merge, o `git pull --rebase` para un rebase. En este simulador, `git pull` usa el comportamiento de merge por defecto."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos primero un `fetch` y un `merge` ejecutados secuencialmente."
            ],
            "afterMarkdowns": [
              "Boom: descargamos `C3` con un `fetch` y luego lo mergeamos con `git merge o/main`. Ahora nuestra rama `main` refleja el nuevo trabajo del remoto (en este caso, llamado `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué pasaría si usáramos `git pull` en cambio?"
            ],
            "afterMarkdowns": [
              "¡Lo mismo! Eso debería dejar bien en claro que `git pull` es básicamente un atajo para hacer `git fetch` seguido por un merge con la rama que sea que hayamos bajado. (En el git real 2.34+, esto equivale a `git pull --no-rebase` cuando las ramas han divergido.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Exploraremos los detalles de `git pull` después (incluyendo sus opciones y parámetros), pero por ahora probémoslo en este nivel.",
              "",
              "Acordate: podés resolver este comando simplemente con `fetch` y `merge`, pero eso te costaría un comando extra :P"
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
              "## Git Pull",
              "",
              "Ahora que vimos cómo traer datos de un repositorio remoto con `git fetch`, ¡actualicemos nuestro trabajo local para reflejar esos cambios!",
              "",
              "Realmente hay varias formas de hacer esto: una vez que tienes los commits disponibles localmente, puedes integrarlos como si fueran commits comunes de otras ramas. Esto significa que podrías ejecutar comandos como:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "De hecho, el flujo de trabajo de *fetchear* cambios remotos y después *mergearlos* es tan común que git incluye un comando que hace ambas cosas de una: ¡`git pull`!",
              "",
              "*Nota:* En Git 2.34 o posterior, si tus ramas local y remota han divergido y no has configurado una estrategia de pull, un `git pull` a secas se detiene y te pide que elijas cómo reconciliarlas. Usa `git pull --no-rebase` para hacer un merge, o `git pull --rebase` para un rebase. En este simulador, `git pull` usa el comportamiento de merge por defecto."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos primero un `fetch` y un `merge` ejecutados secuencialmente."
            ],
            "afterMarkdowns": [
              "Zas: descargamos `C3` con un `fetch` y luego lo mergeamos con `git merge o/main`. Ahora nuestra rama `main` refleja el nuevo trabajo del remoto (en este caso, llamado `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué pasaría si en cambio utilizásemos `git pull`?"
            ],
            "afterMarkdowns": [
              "¡Lo mismo! Eso debería dejar muy claro que `git pull` es básicamente un atajo para hacer `git fetch` seguido por un merge con la rama que acabamos de descargar. (En el git real 2.34+, esto equivale a `git pull --no-rebase` cuando las ramas han divergido.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Exploraremos los detalles de `git pull` después (incluyendo sus opciones y parámetros), pero por ahora probémoslo en este nivel.",
              "",
              "Recuerda: puedes ejecutar este comando simplemente con `fetch` y `merge`, pero eso te costaría un comando extra :P"
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
              "## Git Pull",
              "",
              "Ahora que vimos cómo traer datos de un repositorio remoto con `git fetch`, ¡actualicemos nuestro trabajo local para reflejar esos cambios!",
              "",
              "Realmente hay varias formas de hacer esto: una vez que tienes los commits disponibles localmente, puedes integrarlos como si fueran commits comunes de otras ramas. Esto significa que podrías ejecutar comandos como:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "De hecho, el flujo de trabajo de *fetchear* cambios remotos y después *mergearlos* es tan común que git incluye un comando que hace ambas cosas de una: ¡`git pull`!",
              "",
              "*Nota:* En Git 2.34 o posterior, si tus ramas local y remota han divergido y no has configurado una estrategia de pull, un `git pull` a secas se detiene y te pide que elijas cómo reconciliarlas. Usa `git pull --no-rebase` para hacer un merge, o `git pull --rebase` para un rebase. En este simulador, `git pull` usa el comportamiento de merge por defecto."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos primero un `fetch` y un `merge` ejecutados secuencialmente."
            ],
            "afterMarkdowns": [
              "Zas: descargamos `C3` con un `fetch` y luego lo mergeamos con `git merge o/main`. Ahora nuestra rama `main` refleja el nuevo trabajo del remoto (en este caso, llamado `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué pasaría si en cambio utilizásemos `git pull`?"
            ],
            "afterMarkdowns": [
              "¡Lo mismo! Eso debería dejar muy claro que `git pull` es básicamente un atajo para hacer `git fetch` seguido de un merge con la rama que acabamos de descargar. (En el git real 2.34+, esto equivale a `git pull --no-rebase` cuando las ramas han divergido.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Exploraremos los detalles de `git pull` después (incluyendo sus opciones y parámetros), pero por ahora probémoslo en este nivel.",
              "",
              "Recuerda: puedes ejecutar este comando simplemente con `fetch` y `merge`, pero eso te costaría un comando extra :P"
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
              "## Git Pull",
              "",
              "Agora que vimos como baixar dados de um repositório remoto com `git fetch`, vamos atualizar nosso trabalho para refletir essas mudanças!",
              "",
              "Há, na verdade, muitas formas de fazê-lo -- uma vez que você tenha os novos commits disponíveis localmente, você pode incorporá-los como se eles fossem commits normais em outras branches. Isso significa que você pode executar comandos como estes a seguir:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "O fluxo de trabalho de executar *fetch* para baixar as mudanças remotas e depois fazer um *merge* delas é tão comum que o Git na verdade fornece um comando que faz ambas as coisas de uma vez só! Esse comando é o `git pull`.",
              "",
              "*Nota:* No Git 2.34 ou posterior, se as branches local e remota divergirem e nenhuma estratégia de pull estiver configurada, um `git pull` simples será interrompido e pedirá que você escolha como reconciliá-las. Use `git pull --no-rebase` para um merge, ou `git pull --rebase` para um rebase. Neste simulador, `git pull` usa o comportamento de merge por padrão."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos primeiro ver um `fetch` e um `merge` executados sequencialmente."
            ],
            "afterMarkdowns": [
              "Boom -- nós baixamos o `C3` com um `fetch` e então fizemos um merge desse trabalho usando `git merge o/main`. Agora a nossa branch `main` reflete o trabalho realizado no repositório remoto (neste caso, chamado de `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "O que iria acontecer se, em vez disso, usássemos `git pull`?"
            ],
            "afterMarkdowns": [
              "A mesma coisa! Isso deixa bem claro que `git pull` é essencialmente um atalho para `git fetch` seguido de um merge da branch que acabou de ser baixada. (No git real 2.34+, isso equivale a `git pull --no-rebase` quando as branches divergiram.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Vamos explorar os detalhes do `git pull` mais tarde (incluindo opções e parâmetros), mas por enquanto, experimente usá-lo em sua forma mais básica.",
              "",
              "Lembre-se -- você também poderia resolver este nível com um `fetch` e um `merge`, mas isso lhe custaria um comando a mais :P"
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
              "## Git Pull",
              "",
              "Agora que vimos cómo traer os datos dun repositorio remoto con `git fetch`, ¡actualicemos o noso traballo local para reflexar eses cambios!",
              "",
              "Realmente hai varias formas de facer esto: unha vez que teñas os commits dispoñibles localmente, podes integralos coma se foran commits comúns de outras ramas. Esto significa que poderías executar comandos como:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "De feito, o fluxo de traballo de *fetchear* os cambios remotos e depois *mesturalos* é tan común que git inclúe un comando que fai as dúas operacións nunha sola: ¡`giti pull`!",
              "",
              "*Nota:* En Git 2.34 ou posterior, se as ramas local e remota diverxeron e non hai ningunha estratexia de pull configurada, un `git pull` simple deterase e pedirache que escollas como reconcilialas. Usa `git pull --no-rebase` para un merge, ou `git pull --rebase` para un rebase. Neste simulador, `git pull` usa o comportamento de merge por defecto."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vexamos primeiro un `fetch` e un `merge` executados secuencialmente."
            ],
            "afterMarkdowns": [
              "Boom: descargamos `C3` cun `fetch` e logo mesturámolos con `git merge o/main`. Agora a nosa rama `main` reflexa o novo traballo do remoto (neste caso, chamado `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Qué pasaría se usáramos `git pull` en cambio?"
            ],
            "afterMarkdowns": [
              "O mesmo! Iso debería deixar moi claro que `git pull` é basicamente un atallo para `git fetch` seguido dun merge da rama que acabamos de descargar. (No git real 2.34+, isto equivale a `git pull --no-rebase` cando as ramas diverxeron.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Exploraremos os detalles de `git pull` despois (incluíndo as súas operacións e parámetros), pero por agora probarémolo neste nivel.",
              "",
              "Lémbrate: podes resolver este comando sinxelamente con `fetch` e `merge`, pero eso costaríache un comando extra :P"
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
              "## git pull",
              "",
              "現在我們已經知道如何利用 `git fetch` 從 remote 抓取 commit，讓我們來看一下如何將這些 commit 更新到我們的檔案！",
              "",
              "只要在你的 local 有 fetch 到新的 commit，便有很多方法可以做到這件事情，你可以把它們視為在其它 branch 上面的一般的 commit，這表示你可以執行像這樣子的指令:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* 等等‧‧‧",
              "",
              "事實上，一次*下載 (fetch)* remote 的更新並且*合併（merge）* 這些更新在 git 裡面是很常見的事情！這個命令叫作 `git pull`。",
              "",
              "*注意：* 在 Git 2.34 或更新版本中，若本地與遠端分支已產生分歧，且尚未設定 pull 策略，單純的 `git pull` 會停止並要求你選擇如何整合。使用 `git pull --no-rebase` 進行合併，或使用 `git pull --rebase` 進行 rebase。在本模擬器中，`git pull` 預設使用合併行為。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們來看循序執行一個 `fetch` 和一個 `merge` 的樣子"
            ],
            "afterMarkdowns": [
              "看吧! 我們利用 `fetch` 下載了 `C3` 並且利用 `git merge o/main` 來更新資料，現在我們的 `main` branch 跟 remote 同步了（在這個例子中，remote repository 叫作 `origin`）。"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果用 `git pull` 會發生什麼事情？"
            ],
            "afterMarkdowns": [
              "一樣！這應該非常清楚地說明了 `git pull` 本質上是 `git fetch` 和合併剛剛取得的分支的簡寫。（在真實的 git 2.34+ 中，當分支產生分歧時，這等同於 `git pull --no-rebase`。）"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "我們會解釋 `git pull` 的細節（包括可選擇的參數）, 但現在先讓我們在這個關卡試試看！",
              "",
              "記住喔，你可以利用循序執行的方式來執行 `fetch` 以及 `merge` 來完成這個關卡，但是相對於 `git pull`，你就得多打一個指令。:P"
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
              "## Git Pull",
              "",
              "既然我们已经知道了如何用 `git fetch` 获取远程的数据, 现在我们学习如何将这些变化更新到我们的工作当中。",
              "",
              "其实有很多方法的 —— 当远程分支中有新的提交时，你可以像合并本地分支那样来合并远程分支。也就是说就是你可以执行以下命令: ",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* 等等",
              "",
              "实际上，由于先抓取更新再合并到本地分支这个流程很常用，因此 Git 提供了一个专门的命令来完成这两个操作。它就是我们要讲的 `git pull`。",
              "",
              "*注意：* 在 Git 2.34 或更高版本中，如果本地和远程分支已经分叉，并且没有配置 pull 策略，单纯的 `git pull` 会停止并要求你选择如何整合。使用 `git pull --no-rebase` 进行合并，或使用 `git pull --rebase` 进行变基。在本模拟器中，`git pull` 默认使用合并行为。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我们先来看看 `fetch`、`merge` 依次执行的效果"
            ],
            "afterMarkdowns": [
              "我们用 `fetch` 下载了 `C3`, 然后通过 `git merge o/main` 合并了这一提交记录。现在我们的 `main` 分支包含了远程仓库中的更新（在本例中远程仓库名为 `origin`）"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果使用 `git pull` 呢?"
            ],
            "afterMarkdowns": [
              "一样！这应该非常清楚地说明了 `git pull` 本质上是 `git fetch` 后跟一次合并的简写。（在真实的 git 2.34+ 中，当分支产生分歧时，这等同于 `git pull --no-rebase`。）"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "稍后我们会探索一下 `git pull` 的细节(包括选项和参数)，现在咱们先解决这个关卡。",
              "",
              "实际上你完全可以用 `fetch` 和 `merge` 通过本关，但是这会增加你的命令数。 :P"
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
              "## Git Pull",
              "",
              "Jetzt, wo wir wissen, wie wir mit `git fetch` Daten von einem entfernten Repository holen können, wollen wir unsere lokalen Daten aktualisieren, damit sie die Änderungen vom Server beinhalten.",
              "",
              "Tatsächlich gibt es eine Menge Wege dies zu erreichen -- sobald du die neuen Commits lokal verfügbar hast, kannst du sie integrieren wie Commits von ganz normalen anderen Branches. Du kannst also:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* usw. usf. ausführen.",
              "",
              "Änderungen vom Server zu holen und dann in die eigene Arbeit zu mergen wird so häufig benötigt, dass Git einen Befehl kennt, der beides auf einmal erledigt! Das ist `git pull`.",
              "",
              "*Hinweis:* Ab Git 2.34 wird ein einfaches `git pull` bei divergierten Branches abgebrochen, wenn keine Pull-Strategie konfiguriert ist, und fordert dich auf, eine Vorgehensweise zu wählen. Verwende `git pull --no-rebase` für einen Merge oder `git pull --rebase` für ein Rebase. In diesem Simulator verhält sich `git pull` standardmäßig wie ein Merge."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns erst mal ein `fetch` gefolgt von `merge` an:"
            ],
            "afterMarkdowns": [
              "Bämm -- wir haben `C3` mit `fetch` heruntergeladen und dann in unseren Branch mit `git merge o/main` integriert. Nun bildet unser `main` dieselben Inhalte ab, wie sie auf dem entfernten Server (`origin`) liegen."
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was passiert wohl, wenn wir stattdessen `git pull` benutzen?"
            ],
            "afterMarkdowns": [
              "Das Gleiche! Das zeigt deutlich, dass `git pull` im Wesentlichen eine Abkürzung für `git fetch` gefolgt von einem Merge des gerade geholten Branches ist. (Im echten git 2.34+ entspricht das `git pull --no-rebase`, wenn die Branches divergiert haben.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Die Feinheiten von `git pull` werden wir uns später ansehen, für's Erste lass es uns in diesem Level ausprobieren.",
              "",
              "Vergiss nicht -- du kannst diesen Level auch mit `fetch` und `merge` lösen, aber das kostet dich einen Befehl extra. :P"
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
              "## Git Pull",
              "",
              "Acum că am văzut cum să preluăm datele de la un repozitoriu remote cu `git fetch`, hai să actualizăm munca noastră pentru a reflecta acele schimbări!",
              "",
              "Există, de fapt, multe moduri de a face asta -- odată ce ai noi commit-uri disponibile local, le poți integra ca și cum ar fi commit-uri normale pe alte ramuri. Asta înseamnă că poți executa comenzi precum:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "De fapt, fluxul de lucru de *preluare* a schimbărilor remote și apoi *combinarea* lor este atât de comun încât git oferă o comandă care face ambele lucruri deodată! Acea comandă este `git pull`.",
              "",
              "*Notă:* În Git 2.34 sau o versiune ulterioară, dacă ramurile locală și remote au divergut și nu este configurată nicio strategie de pull, un `git pull` simplu se oprește și îți cere să alegi cum să le reconciliezi. Folosește `git pull --no-rebase` pentru un merge sau `git pull --rebase` pentru un rebase. În acest simulator, `git pull` folosește implicit comportamentul de merge."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Să vedem mai întâi un `fetch` și un `merge` executate secvențial."
            ],
            "afterMarkdowns": [
              "Boom -- am descărcat `C3` cu un `fetch` și apoi am combinat acea muncă cu `git merge o/main`. Acum ramura noastră `main` reflectă noua muncă de la remote (în acest caz, numit `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ce s-ar întâmpla dacă am folosi `git pull` în schimb?"
            ],
            "afterMarkdowns": [
              "Același lucru! Asta ar trebui să clarifice că `git pull` este practic un scurtcut pentru `git fetch` urmat de un merge al ramurii care tocmai a fost adusă. (În git real 2.34+, aceasta este echivalentă cu `git pull --no-rebase` când ramurile au divergut.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Vom explora detaliile lui `git pull` mai târziu (inclusiv opțiuni și argumente), dar pentru acum hai să testăm comanda în acest nivel.",
              "",
              "Ține minte -- poți rezolva acest nivel folosind doar `fetch` și `merge`, dar asta te va costa o comandă suplimentară :P"
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
              "## Git Pull",
              "",
              "Сега, когато видяхме как да взимаме данни от отдалечено хранилище с `git fetch`, нека актуализираме нашата работа, за да отразява тези промени!",
              "",
              "Всъщност има много начини да се направи това — след като имате нови комити локално, можете да ги интегрирате, сякаш са обикновени комити от други клонове. Това означава, че можете да изпълните команди като:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* и т.н.",
              "",
              "Всъщност, процесът на *fetch* на отдалечени промени и след това *merge* е толкова често срещан, че git предоставя команда, която прави и двете едновременно! Тази команда е `git pull`.",
              "",
              "*Забележка:* В Git 2.34 или по-нова версия, ако локалният и отдалеченият клон са се разминали и няма конфигурирана pull стратегия, обикновен `git pull` спира и те подканва да избереш как да ги съгласуваш. Използвай `git pull --no-rebase` за сливане или `git pull --rebase` за rebase. В този симулатор `git pull` използва сливане по подразбиране."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Нека първо видим `fetch` и `merge` изпълнени последователно."
            ],
            "afterMarkdowns": [
              "Бум — изтеглихме `C3` с `fetch` и след това го обединихме с `git merge o/main`. Сега нашият клон `main` отразява новата работа от отдалеченото хранилище (в този случай, наречено `origin`)."
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Какво би станало, ако използваме `git pull` вместо това?"
            ],
            "afterMarkdowns": [
              "Същото нещо! Това трябва да изясни, че `git pull` е по същество съкращение за `git fetch`, последвано от сливане на клона, който току-що е бил взет. (В реалния git 2.34+, това е еквивалентно на `git pull --no-rebase`, когато клоновете са се разминали.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ще разгледаме детайлите на `git pull` по-късно (включително опции и аргументи), но за сега нека го изпробваме в този урок.",
              "",
              "Запомнете — можете да решите този урок само с `fetch` и `merge`, но това ще ви струва една допълнителна команда :P"
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
              "## Git Pull",
              "",
              "Теперь, когда мы познакомились с тем, как извлекать данные из удалённого репозитория с помощью `git fetch`, давайте обновим нашу работу, чтобы отобразить все эти изменения!",
              "",
              "Существует множество вариантов решений - как только у вас имеется локальный коммит, вы можете соединить его с другой веткой. Это значит, вы можете выполнить одну из команд:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* и т.д.",
              "",
              "Процедура *скачивания (fetching)*  изменений с удалённой ветки и *объединения (merging)* настолько частая и распространённая, что git предоставляет вместо двух команд - одну! Эта команда  - `git pull`.",
              "",
              "*Примечание:* В Git 2.34 и новее, если локальная и удалённая ветки разошлись и стратегия pull не настроена, простой `git pull` остановится и попросит выбрать способ согласования. Используйте `git pull --no-rebase` для слияния или `git pull --rebase` для перебазирования. В этом симуляторе `git pull` по умолчанию использует слияние."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте рассмотрим, как `fetch` и `merge` выполняются последовательно"
            ],
            "afterMarkdowns": [
              "Опа - мы скачали `C3` с помощью команды `fetch` и затем объединяем эти наработки с помощью `git merge o/main`. Теперь наша ветка `main` отображает изменения с удалённого репозитория (в данном случае — с репозитория `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Что же произойдёт, если вместо этих команд мы воспользуемся `git pull`?"
            ],
            "afterMarkdowns": [
              "То же самое! Это должно чётко показать, что `git pull` — это, по существу, сокращение для `git fetch`, за которым следует слияние только что полученной ветки. (В реальном git 2.34+ это эквивалентно `git pull --no-rebase`, когда ветки расходятся.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Мы изучим детали команды `git pull` чуть позже (включая опции и аргументы вызова команды), а пока что давайте просто попробуем эту команду.",
              "",
              "Помните, вы также можете выполнить этот уровень с помощью команд `fetch` и `merge`, но нужно ли делать так, когда можно воспользоваться всего лишь одной командой ? :P"
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
              "## Git Pull",
              "",
              "今や私たちはリモートリポジトリから`git fetch`でデータを取ってくる方法を知っているので、今度は私たちの作業にその変更を反映することを学びましょう！",
              "",
              "実際には多くの方法があり、ローカルに利用可能なリモートの新しいコミットがある場合、あなたはそのコミットを他のブランチの通常のコミットと同じように、自分の作業に組み込むことができます。これは、あなたが次のようなコマンドを実行することで行えます:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* その他",
              "",
              "実は、リモートの変更を取ってきてマージするという作業の流れはとてもよく行われるので、gitは実際にはその二つを同時に行うコマンドを提供しているのです！それは、`git pull`というコマンドです。",
              "",
              "*注意：* Git 2.34 以降では、ローカルとリモートのブランチが分岐し、pull 戦略が設定されていない場合、単純な `git pull` は停止して統合方法の選択を求めます。マージするには `git pull --no-rebase`、リベースするには `git pull --rebase` を使用してください。このシミュレーターでは、`git pull` はデフォルトでマージの動作を使用します。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "まずは、連続して`fetch`して`merge`する流れの方を見てみましょう。"
            ],
            "afterMarkdowns": [
              "わーお。私たちは`C3`を`fetch`でダウンロードして、`git merge o/main`でこれをマージしました。今や私たちの`main`ブランチに(この場合、`origin`という名前の)リモートの新しい作業内容が反映されています。"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "では、`git pull`では何が起こるのでしょうか？"
            ],
            "afterMarkdowns": [
              "同じ結果です！これにより、`git pull` は基本的に `git fetch` の後にフェッチされたブランチのマージを行うショートカットであることが明確になるはずです。（本物の git 2.34+ では、ブランチが分岐している場合、これは `git pull --no-rebase` に相当します。）"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git pull`の（オプションや引数を含む）詳細はこの後にやりますが、今、このレベルではただ試してみるだけにしておきましょう。",
              "",
              "覚えておいてください。あなたは実際にはこのレベルを`fetch`と`merge`だけでこのレベルを解決することができますが、余計なコマンドのコストがかかるだけです :P"
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
              "## Git Pull",
              "",
              "Тепер, коли ми знаємо як витягувати дані з віддаленого репозиторію за допомогою `git fetch`, спробуймо оновити нашу робочу копію відповідно до цих даних!",
              "",
              "Насправді, є кілька шляхів як цього досягнути -- щойно нові коміти з’явилися локально, Ви можете додавати їх в гілки так само, як звичайні коміти. Це означає що Ви можете виконувати команди:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* тощо.",
              "",
              "Насправді, процес *витягування* віддалених змін й подальший *мерджинг* їх є настільки популярним, що гіт пропонує спеціальну команду, що виконує ці дві дії за один раз! Ця команда називається `git pull`.",
              "",
              "*Примітка:* У Git 2.34 і новіших версіях, якщо локальна та віддалена гілки розійшлися й стратегію pull не налаштовано, простий `git pull` зупиниться та попросить вибрати спосіб узгодження. Використовуйте `git pull --no-rebase` для злиття або `git pull --rebase` для перебазування. У цьому симуляторі `git pull` за замовчуванням використовує злиття."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Спершу виконаймо по черзі `fetch`, а потім `merge`."
            ],
            "afterMarkdowns": [
              "Ка-бум -- ми звантажили `C3` за допомогою `fetch` і потім змерджили їх, використавши `git merge o/main`. Тепер наша гілка `main` відповідає гілці з віддаленого сховища (в цьому випадку, з назвою `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Що трапиться, якщо натомість використати `git pull`?"
            ],
            "afterMarkdowns": [
              "Те саме! Це повинно чітко показати, що `git pull` — це, по суті, скорочення для `git fetch`, за яким слідує злиття щойно отриманої гілки. (У реальному git 2.34+ це еквівалентно `git pull --no-rebase`, коли гілки розходяться.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ми розглянемо `git pull` більш детально пізніше (включаючи різні опції та аргументи), наразі просто спробуймо цю команду.",
              "",
              "Пам’ятайте -- щоб пройти цей рівень, достатньо використати `fetch`, а потім `merge`, але це буде Вам коштувати одну зайву команду :P"
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
              "## Git Pull",
              "",
              "자 우리는 원격 저장소에서 `git fetch`로 어떻게 데이터를 내려 받는지 보았습니다. 이제 우리의 작업을 업데이트해서 변경들을 반영해 봅시다!",
              "",
              "사실 이걸 하는 방법은 여러가지 있습니다 -- 새 커밋들을 로컬에 내려받은 이후에는 그냥 다른 브랜치에있는 일반 커밋처럼 활용할 수 있습니다. 이런 명령들을 실행할 수 있다는 뜻 입니다 :",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* 기타 등등",
              "",
              "사실 원격 저장소의 변경을 *fetch*하고 그이후에 *merge*하는 작업의 과정이 워낙 자주있는 일이라서 git은 이 두가지를 한번에 하는 명령을 제공합니다! 이 명령어는 `git pull` 입니다.",
              "",
              "*참고:* Git 2.34 이상에서는 로컬 브랜치와 리모트 브랜치가 분기되고 pull 전략이 설정되어 있지 않으면, 단순한 `git pull`이 중단되고 통합 방법을 선택하라는 안내가 표시됩니다. 머지하려면 `git pull --no-rebase`를, 리베이스하려면 `git pull --rebase`를 사용하세요. 이 시뮬레이터에서 `git pull`은 기본적으로 머지 동작을 사용합니다."
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
              "Boom -- 우리는 `C3`를 `fetch`로 내려 받고 `git merge o/main`로 우리의 작업으로 병합했습니다. 이제 우리의 `main` 브랜치는 원격 저장소의 새 작업들을 반영하게 됩니다(지금 사례에서 `origin`입니다)."
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "대신에 `git pull`을 사용하면 어떻게 될까요?"
            ],
            "afterMarkdowns": [
              "같은 결과입니다! 이를 통해 `git pull`이 기본적으로 `git fetch` 후 방금 가져온 브랜치를 머지하는 것의 약어임을 명확히 알 수 있습니다. (실제 git 2.34+에서 브랜치가 분기되었을 때, 이는 `git pull --no-rebase`에 해당합니다.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
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
    "vi": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Pull",
              "",
              "Ta đã biết cách dùng `git fetch` để nạp các commit từ kho chứa từ xa, giờ hãy cập nhật công việc của chúng ta để phản ánh những thay đổi đó!",
              "",
              "Thực ra thì có nhiều cách đề làm điều này -- một khi bạn đã có các commit này ở kho chứa cục bộ, bạn có thể hợp nhất chúng như với các commit ở các nhánh khác. Nghĩa là bạn có thể sử dụng các câu lệnh sau:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* vân vân và mây mây",
              "",
              "Thực tế thì, quá trình *nạp* commit từ kho chứa từ xa và *hợp nhất* chúng phổ biết đến nỗi Git cung cấp một câu lệnh để làm cả 2 điều này một lúc! Đó là `git pull`.",
              "",
              "*Lưu ý:* Trong Git 2.34 trở lên, nếu nhánh cục bộ và nhánh từ xa đã phân kỳ và chưa cấu hình chiến lược pull, một lệnh `git pull` đơn giản sẽ dừng lại và yêu cầu bạn chọn cách hợp nhất. Dùng `git pull --no-rebase` để merge hoặc `git pull --rebase` để rebase. Trong trình mô phỏng này, `git pull` mặc định sử dụng hành vi merge."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Trước tiên hãy xem quá trình `nạp` và `hợp nhất` được thực hiện một cách tuần tự."
            ],
            "afterMarkdowns": [
              "Bùùm -- ta tải xuống commit `C3` với lệnh `git fetch` rồi sau đó hợp nhất nó với lệnh `git merge o/main`. Giờ thì nhánh `main` đã phản ánh trạng thái mới từ kho chứa từ xa (trong trường hợp này là `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Nếu thay vì dó ta dùng `git pull` thì điều gì xảy ra?"
            ],
            "afterMarkdowns": [
              "Cũng vậy! Điều đó cho thấy rõ ràng rằng `git pull` về cơ bản là tắt gọn của `git fetch` theo sau là merge bất kỳ nhánh nào vừa được tải về. (Trong git thực 2.34+, điều này tương đương với `git pull --no-rebase` khi các nhánh đã phân kỳ.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ta sẽ tìm hiểu chi tiết về `git pull` sau (bao gồm các tùy chọn và tham số), còn bây giờ thì cứ dùng thử nó ở cấp độ này đã.",
              "",
              "Nhớ rằng -- bạn có thể giải quyết cấp độ này với `fetch` và sau đó `merge`, nhưng mà như thế thì lại tốn thêm một câu lệnh :P"
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
              "## Git Pull",
              "",
              "Sedaj, ko smo videli kako pridobiti podatke iz oddaljenega repozitorija z `git fetch`, posodobimo naše delo, da bo odsevalo te sprememebe!",
              "",
              "V bistvu je več načinov za izvedbo tega -- ko imaš enkrat lokalno na voljo nove commite, jih lahko vključiš, kot da so normalni commiti na drugem branchu. To pomeni, da lahko izvedeš ukaze, kot so:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* itd., itd.",
              "",
              "Pravzaprav je *fetchanje* oddaljenih sprememb in kasneje *merganje* le-teh tako pogosto, da ima git dejansko ukaz, ki naredi oboje! Ukaz je `git pull`.",
              "",
              "*Opomba:* V Git 2.34 ali novejšem se preprost `git pull` ustavi, če sta se lokalna in oddaljena veja razšli in strategija pull ni nastavljena, ter zahteva izbiro načina usklajevanja. Uporabi `git pull --no-rebase` za merge ali `git pull --rebase` za rebase. V tem simulatorju `git pull` privzeto uporablja vedenje merge."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Poglejmo najprej `fetch` in `merge` izvedena zaporedno:"
            ],
            "afterMarkdowns": [
              "Boom -- prenesli smo `C3` s `fetch` in nato mergali delo z `git merge o/main`. Sedaj naš `main` branch odseva spremembe novega dela iz oddaljenega repoztorija (v tem primeru poimenovan `origin`)."
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Kaj bi se zgodilo, če bi namesto tega uporabili `git pull`?"
            ],
            "afterMarkdowns": [
              "Ista stvar! To bi moralo jasno pokazati, da je `git pull` v bistvu bližnjica za `git fetch`, ki mu sledi merge veje, ki je bila pravkar prenesena. (V resničnem git 2.34+ je to enakovredno `git pull --no-rebase`, ko sta se veji razšli.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Kasneje bomo raziskali podrobnosti ukaza `git pull` (vključno z opcijami in argumenti), ampak zaenkrat poizkusimo brez v tej stopnji.",
              "",
              "Pomni -- to stopnjo lahko rešiš s `fetch` in `merge`, ampak boš rabil en dodaten ukaz :P"
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
              "## Git Pull",
              "",
              "Teraz, gdy zobaczyliśmy, jak pobierać dane ze zdalnego repozytorium za pomocą `git fetch`, zaktualizujmy naszą pracę, aby odzwierciedlić te zmiany!",
              "",
              "Istnieje wiele sposobów, aby to zrobić - kiedy masz już nowe commity dostępne lokalnie, możesz je dołączyć tak, jakby były zwykłymi commitami na innych gałęziach. Oznacza to, że możesz wykonywać polecenia takie jak:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* itd., itd.",
              "",
              "W rzeczywistości kolejność działań polegająca na *pobieraniu* zdalnych zmian (fetch), a następnie *łączeniu* ich (merge), jest tak powszechna, że sam Git zapewnia polecenie, które robi obie te rzeczy naraz! Jest to `git pull`.",
              "",
              "*Uwaga:* W Git 2.34 lub nowszym, jeśli lokalna i zdalna gałąź się rozeszły i nie skonfigurowano strategii pull, prosty `git pull` zatrzyma się i poprosi o wybór sposobu uzgodnienia. Użyj `git pull --no-rebase` do scalenia lub `git pull --rebase` do rebase. W tym symulatorze `git pull` domyślnie używa scalenia."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Zobaczmy najpierw `fetch` i `merge` wykonywane jedno po drugim."
            ],
            "afterMarkdowns": [
              "Tadam -- pobraliśmy `C3` za pomocą `fetch`, a następnie połączyliśmy tę pracę za pomocą `git merge o/main`. Teraz nasza gałąź `main` odzwierciedla nową pracę z remote (w tym przypadku o nazwie `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Co by się stało, gdybyśmy zamiast tego użyli `git pull`?"
            ],
            "afterMarkdowns": [
              "To samo! To powinno jasno wskazywać, że `git pull` jest zasadniczo skrótem dla `git fetch` po którym następuje merge właśnie pobranej gałęzi. (W prawdziwym git 2.34+ jest to równoważne `git pull --no-rebase`, gdy gałęzie się rozeszły.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "W szczegóły `git pull` zagłębimy się później (również w opcje i argumenty), ale na tym poziomie po prostu wypróbujmy, jak działa.",
              "",
              "Pamiętaj -- możesz rozwiązać ten poziom, używając tylko `fetch` i `merge`, ale będzie cię to kosztowało dodatkowe polecenie :P"
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
              "## Git Pull",
              "",
              "Ora che abbiamo visto come recuperare dati da un repository remoto con `git fetch`, vediamo di aggiornare il nostro repository affinché rifletta questi cambiamenti!",
              "",
              "Ci sono più modi per fare ciò -- una volta che i nuovi commit sono disponibili localmente, si possono incorporare come se fossero normali commit da altri rami. Questo significa che possiamo eseguire comandi come:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* etc., etc.",
              "",
              "Infatti, il metodo del *recuperare* cambiamenti remoti e poi *fonderli* nel nostro repository è talmente comune che git fornisce un comando che compie entrambi i passi in uno! Quel comando è `git pull`.",
              "",
              "*Nota:* In Git 2.34 o versioni successive, se il ramo locale e quello remoto sono divergenti e non è configurata una strategia di pull, un semplice `git pull` si interrompe e chiede come riconciliarli. Usa `git pull --no-rebase` per un merge o `git pull --rebase` per un rebase. In questo simulatore, `git pull` usa il comportamento di merge come predefinito."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Diamo prima un'occhiata a `fetch` e `merge` eseguiti uno dopo l'altro."
            ],
            "afterMarkdowns": [
              "Boom -- abbiamo scaricato `C3` con un `fetch` e poi fuso assieme il lavoro con `git merge o/main`. Ora il nostro ramo `main` riflette le nuove modifiche dal ramo remoto (in questo caso, chiamato `origin`)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Cosa succederebbe se invece usassimo `git pull`?"
            ],
            "afterMarkdowns": [
              "Lo stesso! Questo dovrebbe rendere chiaro che `git pull` è essenzialmente un'abbreviazione per `git fetch` seguito da un merge del branch appena scaricato. (Nel vero git 2.34+, questo equivale a `git pull --no-rebase` quando i branch hanno divergito.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Esploreremo i dettagli di `git pull` più tardi (incluse le opzioni e i parametri), ma per ora proviamo ad usarlo nel livello.",
              "",
              "Ricorda -- potresti risolvere questo livello eseguendo `fetch` seguito da `merge`, ma ti costerà un comando in più :P"
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
              "## Git Pull",
              "",
              "`git fetch` komutunu kullanarak uzak depodan veri aldığımızı gördük, şimdi bu değişiklikleri yansıtarak çalışmalarımızı güncelleyelim!",
              "",
              "Bunu yapmanın aslında birçok yolu var -- yeni commitler yerel olarak mevcut olduğunda, onları diğer dallarda olduğu gibi dahil edebilirsiniz. Bu, şu komutları çalıştırabileceğiniz anlamına gelir:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* vb.",
              "",
              "Aslında, *fetch* işlemini yapıp ardından *merge* işlemi gerçekleştirmek o kadar yaygın ki, git aslında ikisini bir arada yapan bir komut sunuyor! Bu komut `git pull`.",
              "",
              "*Not:* Git 2.34 ve sonraki sürümlerde, yerel ve uzak dallar ayrışmışsa ve bir pull stratejisi yapılandırılmamışsa, sade bir `git pull` durur ve bunların nasıl uzlaştırılacağını seçmenizi ister. Merge için `git pull --no-rebase`, rebase için `git pull --rebase` kullanın. Bu simülatörde `git pull` varsayılan olarak merge davranışını kullanır."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`fetch` ve `merge` işlemlerini sırasıyla nasıl çalıştırdığımıza bakalım."
            ],
            "afterMarkdowns": [
              "Boom -- `git fetch` komutuyla `C3`'ü indirdik ve ardından `git merge o/main` komutuyla bu işi birleştirdik. Artık `main` dalımız, uzak depodan (bu durumda `origin` olarak adlandırıldı) gelen yeni çalışmaları yansıtıyor."
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "`git pull` kullanırsak ne olur?"
            ],
            "afterMarkdowns": [
              "Aynı şey! Bu, `git pull`'ın esasen `git fetch`'in ardından az önce getirilen dalın merge edilmesinin kısaltması olduğunu açıkça ortaya koymalıdır. (Gerçek git 2.34+'da, dallar birbirinden ayrıldığında bu `git pull --no-rebase`'e eşdeğerdir.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git pull` komutunun detaylarını daha sonra inceleyeceğiz (seçenekler ve argümanlar dahil), ancak şimdilik bunu seviyede deneyelim.",
              "",
              "Unutmayın -- aslında bu seviyeyi sadece `fetch` ve `merge` komutlarıyla çözebilirsiniz, ancak bu size ekstra bir komut maliyetine mal olur :P"
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
              "## Git Pull",
              "",
              "Most, hogy láttuk, hogyan lehet adatokat letölteni egy távoli repóból a `git fetch`-csel, frissítsük a munkánkat, hogy tükrözze ezeket a változtatásokat!",
              "",
              "Valójában sokféleképpen lehet ezt megtenni -- ha már helyben elérhetők az új commitok, beépítheted azokat, mintha csak normál commitok lennének más ágakon. Ez azt jelenti, hogy futtathatod az ilyen parancsokat:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* stb., stb.",
              "",
              "Valójában a távoli változtatások *letöltésének* és majd *merge-lésének* munkafolyamata annyira elterjedt, hogy a git valójában biztosít egy parancsot, amely mindkettőt egyszerre végzi! Ez a parancs a `git pull`.",
              "",
              "*Megjegyzés:* Git 2.34 vagy újabb verzióban, ha a helyi és a távoli ág eltért, és nincs pull-stratégia beállítva, az egyszerű `git pull` leáll, és kéri az összehangolás módjának kiválasztását. Merge-hez használja a `git pull --no-rebase`, rebase-hez pedig a `git pull --rebase` parancsot. Ebben a szimulátorban a `git pull` alapértelmezés szerint merge-et használ."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Először nézzük meg egy egymás után végrehajtott `fetch` és `merge` kombinációját."
            ],
            "afterMarkdowns": [
              "Boom -- letöltöttük a `C3`-t `fetch`-csel, majd beolvasztottuk azt a munkát a `git merge o/main`-nel. Most a `main` águnk tükrözi a remote új munkáját (ebben az esetben `origin` nevű)"
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Mi történne, ha `git pull`-t használnánk helyette?"
            ],
            "afterMarkdowns": [
              "Ugyanaz! Ebből egyértelműen látható, hogy a `git pull` lényegében a `git fetch`, majd az imént lekért ág merge-ének rövidítése. (A valódi git 2.34+-ban, amikor az ágak eltértek egymástól, ez egyenértékű a `git pull --no-rebase`-szel.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "A `git pull` részleteit később fogjuk megvizsgálni (beleértve az opciókat és argumentumokat), de egyelőre próbáljuk ki a szinten.",
              "",
              "Emlékezz -- valójában megoldhatod ezt a szintet csak `fetch` és `merge`-gel is, de ez egy extra parancsba kerül :P"
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
              "## Git Pull",
              "",
              "İndi ki `git fetch` ilə remote repozitoriyadan məlumatı necə fetch etməyi gördük, gəl həmin dəyişiklikləri əks etdirmək üçün işimizi yeniləyək!",
              "",
              "Bunu etməyin əslində bir çox yolu var -- yeni commit-lər lokal olaraq mövcud olan kimi, onları sanki başqa branch-lardakı adi commit-lərmiş kimi daxil edə bilərsən. Bu o deməkdir ki, aşağıdakı kimi əmrləri işlədə bilərsən:",
              "",
              "* `git cherry-pick o/main`",
              "* `git rebase o/main`",
              "* `git merge o/main`",
              "* və s., və s.",
              "",
              "Əslində, remote dəyişikliklərini *fetch edib* sonra onları *merge etmək* iş axını o qədər geniş yayılıb ki, git hər ikisini eyni anda edən bir əmr təqdim edir! Həmin əmr `git pull`-dur.",
              "",
              "*Qeyd:* Git 2.34 və sonrakı versiyalarda, yerli və uzaq budaqlar ayrılıbsa və pull strategiyası konfiqurasiya edilməyibsə, sadə `git pull` dayanır və onları necə uyğunlaşdırmağı seçməyinizi istəyir. Birləşdirmək üçün `git pull --no-rebase`, rebase üçün `git pull --rebase` istifadə edin. Bu simulyatorda `git pull` standart olaraq birləşmə davranışından istifadə edir."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Gəl əvvəlcə ardıcıl işlədilən bir `fetch` və bir `merge`-ə baxaq."
            ],
            "afterMarkdowns": [
              "Bum -- `fetch` ilə `C3`-ü endirdik və sonra həmin işi `git merge o/main` ilə merge etdik. İndi `main` branch-ımız remote-dan (bu halda `origin` adlanan) gələn yeni işi əks etdirir."
            ],
            "command": "git fetch; git merge o/main",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Bunun əvəzinə `git pull` işlətsəydik nə olardı?"
            ],
            "afterMarkdowns": [
              "Eyni şey! Bu, `git pull`-ın mahiyyət etibarilə `git fetch`-dən sonra yeni götürülmüş filialın birləşdirilməsinin qısaltması olduğunu aydın göstərməlidir. (Həqiqi git 2.34+-da, filiallar ayrıldıqda bu `git pull --no-rebase` ilə ekvivalentdir.)"
            ],
            "command": "git pull",
            "beforeCommand": "git fakeCreateRemote; git commit; git fakeTeamwork"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git pull`-un təfərrüatlarını (o cümlədən seçimləri və arqumentləri) sonra araşdıracağıq, amma hələlik gəl onu bölümdə sınayaq.",
              "",
              "Unutma -- bu bölümü əslində təkcə `fetch` və `merge` ilə həll edə bilərsən, amma bu, sənə bir əlavə əmrə başa gələcək :P"
            ]
          }
        }
      ]
    }
  }
};
