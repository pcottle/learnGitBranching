exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C3\",\"id\":\"main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"C4\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git commit;git checkout o/main;git commit",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Remote Branches",
    "zh_CN": "远程分支",
    "zh_TW": "remote branch （遠端分支）",
    "es_AR": "Ramas remotas",
    "es_MX": "Ramas remotas",
    "es_ES": "Ramas remotas",
    "pt_BR": "Ramos remotos",
    "gl": "Ramas remotas",
    "de_DE": "Branches auf entfernten Servern",
    "ja": "リモートのブランチ",
    "fr_FR": "Les branches distantes",
    "ru_RU": "Удалённые ветки",
    "ko": "원격 브랜치(remote branch)",
    "uk": "Віддалені гілки",
    "vi": "Nhánh từ xa",
    "sl_SI": "Oddaljeni Branchi",
    "pl": "Zdalne gałęzie",
    "it_IT": "Rami Remoti"
  },
  "hint": {
    "en_US": "Pay attention to the ordering -- commit on main first!",
    "zh_CN": "注意顺序 —— 先在 main 分支上提交!",
    "zh_TW": "注意順序的問題喔！先在 main branch 上面送 commit",
    "es_AR": "Prestá atención al orden: ¡commiteá sobre main primero!",
    "es_MX": "Presta atención al orden: ¡haz commit sobre main primero!",
    "es_ES": "Presta atención al orden: ¡haz commit sobre main primero!",
    "pt_BR": "Preste atenção na ordem: commite no main primeiro!",
    "gl": "Preta atención á orde: fai commit no main primeiro",
    "de_DE": "Beachte die Sortierung -- committe zuerst auf dem main!",
    "ja": "順番に注意 -- まずmainに対してcommitしましょう",
    "fr_FR": "Prêtez attention à l'ordre -- les commits sur main d'abord !",
    "ru_RU": "Уделяйте внимание очерёдности -- сперва commit на main",
    "ko": "순서에 주의하세요: main 브랜치 에서 먼저 커밋하세요!",
    "uk": "Звертайте увагу на послідовність -- спочатку коміт в мастер!",
    "vi": "Chú ý đến thứ tự -- commit trên nhánh main trước!",
    "sl_SI": "Bodi pozoren na vrsti red -- commitaj najprej na main!",
    "pl": "Zwróć uwagę na kolejność -- najpierw zatwierdzaj na main",
    "it_IT": "Presta attenzione all'ordine -- fai prima un commit sul main!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Remote Branches",
              "",
              "Now that you've seen `git clone` in action, let's dive into what actually changed.",
              "",
              "The first thing you may have noticed is that a new branch appeared in our local repository called `o/main`. This type of branch is called a _remote_ branch; remote branches have special properties because they serve a unique purpose.",
              "",
              "Remote branches reflect the _state_ of remote repositories (since you last talked to those remote repositories). They help you understand the difference between your local work and what work is public -- a critical step to take before sharing your work with others.",
              "",
              "Remote branches have the special property that when you check them out, you are put into detached `HEAD` mode. Git does this on purpose because you can't work on these branches directly; you have to work elsewhere and then share your work with the remote (after which your remote branches will be updated).",
              "",
              "To be clear: Remote branches are on your _local_ repository, not on the remote repository."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### What is `o/`?",
              "",
              "You may be wondering what the leading `o/` is for on these remote branches. Well, remote branches also have a (required) naming convention -- they are displayed in the format of:",
              "",
              "* `<remote name>/<branch name>`",
              "",
              "Hence, if you look at a branch named `o/main`, the branch name is `main` and the name of the remote is `o`.",
              "",
              "Most developers actually name their main remote `origin`, not `o`. This is so common that git actually sets up your remote to be named `origin` when you `git clone` a repository.",
              "",
              "Unfortunately the full name of `origin` does not fit in our UI, so we use `o` as shorthand :( Just remember when you're using real git, your remote is probably going to be named `origin`!",
              "",
              "That's a lot to take in, so let's see all this in action."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lets check out a remote branch and see what happens."
            ],
            "afterMarkdowns": [
              "As you can see, git put us into detached `HEAD` mode and then did not update `o/main` when we added a new commit. This is because `o/main` will only update when the remote updates."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, commit once off of `main` and once after checking out `o/main`. This will help drive home how remote branches behave differently, and they only update to reflect the state of the remote."
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
              "## Les branches distantes de Git",
              "",
              "Maintenant que nous avons vu `git clone` en action, plongeons dans ce qui a changé.",
              "",
              "La première chose que vous avez peut-être remarquée est qu'une nouvelle branche est apparue dans votre dépôt local appelée `o/main`. Ce type de branche est appelée une branche _distante_ ; les branches distantes ont des propriétés spécifiques car elles servent à un but précis.",
              "",
              "Les branches distantes reflètent _l'état_ des dépôts distants (depuis la dernière fois où vous avez parlé avec ceux-ci). Elles vous aident à comprendre les différences entre votre travail et le travail public -- une étape critique à effectuer avant de partager son travail avec les autres.",
              "",
              "Les branches distantes ont une propriété particulière: quand vous vous rendez dessus (checkout), `HEAD` est détaché. Git fait cela car vous ne pouvez pas travailler sur ces branches directement ; vous devez travailler ailleurs et ensuite partager votre travail avec le dépôt distant (après quoi vos branches distantes seront mises à jour)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Qu'est-ce que `o/`?",
              "",
              "Vous vous demandez peut-être ce qu'est le préfixe `o/` devant ces branches distantes. En pratique, les branches distantes ont aussi une convention de nommage (obligatoire) -- elles sont affichées avec le format :",
              "",
              "* `<nom dépôt distant>/<nom de la branche>`",
              "",
              "Donc, si vous regardez une branche nommée `o/main`, le nom de la branche est `main` et le nom du dépôt distant est `o`.",
              "",
              "La plupart des développeurs nomment leur principal dépôt distant `origin`, pas `o`. C'est si commun que Git configure en fait votre dépôt local pour être nommé `origin` quand vous faîtes un `git clone` du dépôt.",
              "",
              "Malheureusement le nom complet `origin` ne rentre pas dans notre interface graphique et nous utilisons donc `o` comme raccourci :( Rappelez-vous juste que quand vous utilisez le vrai Git, votre dépôt distant est probablement nommé `origin`!",
              "",
              "Cela fait beaucoup d'un coup, donc voyons cela en action."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Rendons-nous sur une branche et regardons ce qui se passe."
            ],
            "afterMarkdowns": [
              "Comme vous pouvez le voir, Git nous a mis dans le mode \"detached\" (cf. `HEAD`) puis n'a pas mis à jour `o/main` quand nous avons ajouté un nouveau commit. C'est parce que `o/main` va se mettre à jour uniquement quand le dépôt distant sera mis à jour."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour finir ce niveau, faites un commit à partir de `main` puis un autre après vous être rendu dans `o/main`. Cela va nous aider à comprendre la différence de comportement des branches distantes, et le fait qu'elles se mettent à jour uniquement pour refléter l'état du dépôt distant."
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
              "## Ramas remotas de git",
              "",
              "Ahora que viste `git clone` en acción, ahondemos en lo que realmente cambió.",
              "",
              "Lo primero que habrás notado es que apareció una nueva rama en tu repositorio local llamada `o/main`. A este tipo de ramas se las llama ramas _remotas_. Las ramas remotas tienen propiedades especiales porque sirven un propósito específico.",
              "",
              "Las ramas remotas reflejan el _estado_ de los repositorios remotos (cómo estaban la última vez que hablaste con ellos). Te ayudan a entender las diferencias entre tu trabajo local y el trabajo que ya está publicado - un paso crítico antes de compartir tu trabajo con el resto.",
              "",
              "Las ramas remotas tienen la propiedad especial de que cuando las checkouteás, pasás al modo detached `HEAD`. Git lo hace a propósito porque no podés trabajar en esas ramas directamente: tenés que trabajar en algún otro lado y después compartir tu trabajo con el remoto (tras lo que tus ramas remotas se actualizarán)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué es `o/`?",
              "",
              "Podrías estar preguntándote qué significa ese `o/` al principio de las ramas remotas. Bueno, las ramas remotas también tienen una convención de nombres obligatoria -- se las muestra con el formato:",
              "",
              "* `<nombre del remoto>/<nombre de la rama>`",
              "",
              "Entonces, si mirás una rama llamada `o/main`, el nombre de la rama es `main`, y el nombre del remoto es `o`.",
              "",
              "La mayoría llama `origin` a su remoto en lugar de `o`. Esto es tan común que git efectivamente crea tu remoto llamándolo `origin` cuando hacés `git clone` de un repositorio.",
              "",
              "Desafortunadamente el nombre `origin` completo no entra en nuestra UI, así que usamos `o` para abreviar :( Simplemente recordá que cuando uses el git real, tu remoto ¡probablemente se llame `origin`!",
              "",
              "Hay mucho para procesar, así que veámoslo en acción."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Checkouteemos una rama remota a ver qué pasa."
            ],
            "afterMarkdowns": [
              "Como ves, git nos puso en el modo detached `HEAD` y no actualizó `o/main` cuando creamos un nuevo commit. Esto es porque `o/main` sólo va a actualizarse cuando el remoto se actualice."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, commiteá una vez sobre `main` y una después de checkoutear `o/main`. Esto te va a ayudar a caer en cómo las ramas remotas funcionan distinto, y que sólo se actualizan para reflejar el estado del remoto."
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
              "## Ramas remotas de git",
              "",
              "Ahora que viste `git clone` en acción, profundicemos en lo que realmente cambió.",
              "",
              "Lo primero que habrás notado es que apareció una nueva rama en nuestro repositorio local llamada `o/main`. A este tipo de ramas se les llama ramas _remotas_. Las ramas remotas tienen propiedades especiales porque sirven para un propósito específico.",
              "",
              "Las ramas remotas reflejan el _estado_ de los repositorios remotos (como estaban la última vez que te comunicaste con ellos). Te ayudan a entender las diferencias entre tu trabajo local y el trabajo que ya está publicado (un paso crítico antes de compartir tu trabajo con los demás).",
              "",
              "Las ramas remotas tienen la propiedad especial de que cuando haces checkout sobre ellas, pasas al modo detached `HEAD`. Git lo hace a propósito porque no puedes trabajar en esas ramas directamente; tienes que trabajar en algún otro lado y después compartir tu trabajo con el remoto (tras lo cual tus ramas remotas serán actualizadas).",
              "",
              "Para ser claros: Las ramas remotas están en tu repositorio local, no en el repositorio remoto"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué es `o/`?",
              "",
              "Podrías estar preguntándote qué significa ese `o/` al principio de las ramas remotas. Bueno, las ramas remotas también tienen una convención de nombres obligatoria -- se muestran con el siguiente formato:",
              "",
              "* `<nombre del remoto>/<nombre de la rama>`",
              "",
              "Entonces, si observas una rama llamada `o/main`, el nombre de la rama es `main`, y el nombre del remoto es `o`.",
              "",
              "Realmente, la mayoría de los desarrolladores llaman `origin` a su remoto en lugar de `o`. Esto es tan común que git directamente crea tu remoto llamándolo `origin` cuando haces `git clone` de un repositorio.",
              "",
              "Desafortunadamente, el nombre `origin` no cabe en nuestra UI (interfaz de usuario), así que usamos `o` para abreviar :( Simplemente recuerda que cuando uses el git real, tu remoto ¡probablemente se llame `origin`!",
              "",
              "Eso es mucho para digerir, así que veámoslo en acción."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hagamos checkout sobre una rama remota y veamos qué pasa."
            ],
            "afterMarkdowns": [
              "Como puedes ver, git nos puso en el modo detached `HEAD` y no actualizó `o/main` cuando creamos un nuevo commit. Esto es porque `o/main` sólo va a actualizarse cuando el remoto se actualice."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para terminar este nivel, haz un commit sobre `main` y uno después de hacer checkout a `o/main`. Esto te va a ayudar a aprender cómo se comportan las ramas remotas, y que sólo se actualizan para reflejar el estado del remoto."
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
              "## Ramas remotas de git",
              "",
              "Ahora que viste `git clone` en acción, ahondemos en lo que realmente cambió.",
              "",
              "Lo primero que habrás notado es que apareció una nueva rama en tu repositorio local llamada `o/main`. A este tipo de ramas se las llama ramas _remotas_. Las ramas remotas tienen propiedades especiales porque sirven un propósito específico.",
              "",
              "Las ramas remotas reflejan el _estado_ de los repositorios remotos (cómo estaban la última vez que hablaste con ellos). Te ayudan a entender las diferencias entre tu trabajo local y el trabajo que ya está publicado - un paso crítico antes de compartir tu trabajo con los demás.",
              "",
              "Las ramas remotas tienen la propiedad especial de que cuando haces checkout sobre ellas, pasas al modo detached `HEAD`. Git lo hace a propósito porque no puedes trabajar en esas ramas directamente: tienes que trabajar en algún otro lado y después compartir tu trabajo con el remoto (tras lo que tus ramas remotas se actualizarán)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué es `o/`?",
              "",
              "Podrías estar preguntándote qué significa ese `o/` al principio de las ramas remotas. Bueno, las ramas remotas también tienen una convención de nombres obligatoria -- se muestran con el formato:",
              "",
              "* `<nombre del remoto>/<nombre de la rama>`",
              "",
              "Entonces, si observas una rama llamada `o/main`, el nombre de la rama es `main`, y el nombre del remoto es `o`.",
              "",
              "La mayoría de los desarrolladores llaman `origin` a su remoto en lugar de `o`. Esto es tan común que git efectivamente crea tu remoto llamándolo `origin` cuando haces `git clone` de un repositorio.",
              "",
              "Desafortunadamente el nombre `origin` completo no entra en nuestra UI (interfaz de usuario), así que usamos `o` para abreviar :(Simplemente recuerda que cuando uses el git real, tu remoto ¡probablemente se llame `origin`!",
              "",
              "Queda mucho por aprender, así que veámoslo en acción."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hagamos checkout sobre una rama remota a ver qué pasa."
            ],
            "afterMarkdowns": [
              "Como ves, git nos puso en el modo detached `HEAD` y no actualizó `o/main` cuando creamos un nuevo commit. Esto ocurre porque `o/main` sólo va a actualizarse cuando el remoto se actualice."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, haz commit una vez sobre `main` y otra vez después de checkoutear `o/main`. Esto te va a ayudar a aprender cómo las ramas remotas funcionan distinto, y que sólo se actualizan para reflejar el estado del remoto."
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
              "## Ramos Remotos no Git",
              "",
              "Agora que vimos o `git clone` em ação, vamos estudar aquilo que realmente mudou.",
              "",
              "A primeira coisa que você pode ter percebido é que um novo ramo chamado `o/main` aparece no nosso repositório local. Esse tipo de ramo é chamado de ramo _remoto_; ramos remotos possuem propriedades especiais pois eles servem a um propósito único.",
              "",
              "Ramos remotos refletem o _estado_ de repositórios remotos (desde a última vez na qual você falou com eles). Eles ajudam a entender as diferenças entre o trabalho local e o trabalho atualmente público -- um passo crítico a ser dado antes de compartilhar seu trabalho com os outros.",
              "",
              "Ramos remotos possuem a propriedade especial de, ao sofrerem um checkout, colocarem o repositório em modo \"Detached HEAD\". O Git faz isso de propósito, porque você não pode trabalhar nesses ramos diretamente; você é obrigado a trabalhar em outro lugar e só então compartilhar seu trabalho com o remoto (depois disso, os ramos remotos serão atualizados)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### O que é `o/`?",
              "",
              "Você pode estar se perguntando o que o `o/` no início do nome dos ramos remotos significa. Bem, ramos remotos possuem uma convenção obrigatória de nomes -- eles são mostrados no seguinte formato:",
              "",
              "* `<nome do repositório remoto>/<nome do ramo>`",
              "",
              "Então, se o ramo remoto é chamado `o/main`, o nome do ramo é `main` e o nome do repositório remoto é `o`.",
              "",
              "A maioria dos desenvolvedores na verdade chama o repositório remoto principal de `origin`, e não de `o`. Isso é tão comum que o Git define por padrão o nome `origin` para o repositório remoto quando você usa o comando `git clone` para clonar um repositório.",
              "",
              "Infelizmente o nome completo `origin` não cabe na nossa tela, então usamos `o` como uma abreviação :( Apenas lembre-se que no Git de verdade, o repositório remoto provavelmente será chamado `origin` em vez de `o`!",
              "",
              "É muita informação de uma só vez, então vamos dar uma pausa e ver um pouco de ação."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos fazer checkout de um ramo remoto e ver o que acontece."
            ],
            "afterMarkdowns": [
              "Como você pode ver, o Git nos colocou no modo \"Detached HEAD\", e não atualizou o `o/main` quando adicionamos um novo commit. Isso é porque o `o/main` só será atualizado quando o repositório remoto for atualizado."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nível, commite uma vez em `main`, e outra vez depois de fazer checkout em `o/main`. Isso vai ajudá-lo a sentir como os ramos remotos se comportam de forma diferente, e como eles apenas se atualizam para refletir o estado do repositório remoto."
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
              "## Ramas remotas de git",
              "",
              "Agora que viches `git clone` en acción, mergullémonos no que realmente mudou.",
              "",
              "O primeiro que notarías é que apareceu unha nova rama no teu repositorio local chamada `o/main`. A este tipo de ramas chámaselle ramas _remotas_. As ramas remotas teñén propiedades especiais porque serven para un propósito específico.",
              "",
              "As ramas remotas reflexan o _estado_ dos repositorios remotos (como estaban á última vez que falaches con eles). Axúdante a entender as diferencias entre o teu traballo local e o teu traballo que xa está publicado - un paso crítico antes de compartir o teu traballo cos demáis.",
              "",
              "As ramas remotas teñen a propiedade especial de que cando fas checkout, pasas o modo detached `HEAD`. Git faino a drede porque non podes traballar nesas ramas directamente: tes que traballar nalgún outro lado e despois compartir o teu traballo co remoto (tras o que as túas ramas remotas actualizaranse)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### ¿Qué é `o/`?",
              "",
              "Poderías estar a preguntarte qué significa ese `o/` ó principio das ramas remotas. Bueno, as ramas remotas tamén teñen unha convención de nomes obligatoria -- se as amosas co formato:",
              "",
              "* `<nome do remoto>/<nome da rama>`",
              "",
              "Entonces, se miras unha rama chamada `o/main`, o nome da rama é `main`, e o nome do remoto é `o`.",
              "",
              "A maioría dos desenvolvedores chaman `origin` ó seu remoto no lugar de `o`. Esto é tan común que git efectivamente crea o teu remoto chamandoo `origin` cando fas `git clone` dun repositorio.",
              "",
              "Desafortunadamente o nome `origin` completo non entra na nosa  UI, así que empregaremos `o` para acortar: (Sinxelamente recorda que cando uses git na vida real, o teu remote ¡probablemente se chame `origin`!)",
              "",
              "Hai moito para procesar, así que vexámolo en acción."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Fagamos checkout a unha rama remota a ver qué pasa."
            ],
            "afterMarkdowns": [
              "Como ves, git púxonos no modo detached `HEAD` e non actualizou `o/mater` cando creamos un novo commit. Esto é porque `o/mater` só vai actualizarse cando o remoto se actualice."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, fai commit unha vez sobre `mater` e despois de facer o checkout a `o/main`. Esto vaite axudar a entender cómo funcionan as ramas remotas, e que só se actualizan para reflexar o estado do remoto."
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
              "## git remote branch",
              "",
              "現在你已經知道 `git clone` 在幹嘛了，讓我們仔細看看到底發生了什麼事。",
              "",
              "你首先看到的是在你的本地端（local repository）出現了一個新的 branch 叫作 `o/main`，這種型態的 branch 叫作 remote branch （遠端分支），因為特殊的需求，因此 remote branch 有特殊的性質。",
              "",
              "remote branch 反應了 remote repository 的狀態（因為你最後接觸的是這些 remote repository），最重要的是，在你想要分享你的 commit 給其他人時，你必須知道你現在的 commit 跟 remote repository 有哪些不同，而 remote branch 的狀態就是在告訴你這些資訊。",
              "",
              "remote branch 有特別的特性，當你移動到 remote branch 時，你就進入到分離 `HEAD` 的狀態，git 這樣做的原因是告訴你不能夠直接影響這些 branch。你必須要在其它的 branch 工作，並且分享到 remote （分享之後，你的 remote branch 就會被更新）。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 什麼是 `o/`?",
              "",
              "你也許會對於 remote branch 前面的 `o/` 感到困惑，喔！remote branch 也（需要） 一個命名法則，或者是一般表示 remote branch 的格式。",
              "",
              "* `<remote 名稱>/<branch 名稱>`",
              "",
              "因此，當你看到一個 branch 叫做 `o/main`，就表示這個 branch 叫做 main，而且這個 remote 的名稱叫作 `o`。",
              "",
              "很多程式設計師實際上會把他們的 remote 命名為 `origin`，而不是 `o`，這在 git 是很常見的事情，因為當你使用 `git clone` 時，git 會自動把你的 remote 命名為 `origin`。",
              "",
              "但是很不幸的是 `origin` 並沒有辦法完全顯示在我們的 UI 上面，所以我們用 `o` 來簡化它（只要記住當你使用 git 的時候，實際上是命名為 `origin`）。",
              "",
              "有很多事情需要說明，現在讓我們來看看吧！"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們移動到（checkout）一個 remote branch 並且看一下會發生什麼事情"
            ],
            "afterMarkdowns": [
              "就像你看到的， git 讓我們進到 detached `HEAD` 狀態，同時，當我們加入一個新的 commit 時，`o/main` 都沒有更新，這是因為只有當 remote 更新的時候，`o/main` 才會更新。"
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這一關，先在 main branch 上面做一次 commit，再移動到 `o/main` 上做一次 commit，這有助於我們了解到 remote branch 的不同，它們只會反應 remote 的狀態。"
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
              "## Branches auf entfernten Servern",
              "",
              "Nun da du `git clone` in Aktion gesehen hast, lass uns tiefer in die Materie eintauchen.",
              "",
              "Dir ist wahrscheinlich als Erstes aufgefallen, dass ein neuer Branch namens `o/main` in unserem lokalen Repository aufgetaucht ist. Diese Art von Branch nennt sich _Remote_ Branch; er hat besondere Eigenschaften, weil er einem bestimmten Zweck dient.",
              "",
              "Ein Remote Branch bildet den Zustand des entsprechenden Branch in einem entfernten Repository ab (dem Zustand in dem der Branch war, als du das letzte Mal das entfernte Repository angesprochen hast). Er hilft dir, den Unterschied zwischen deinem lokalen Branch und dem Gegenstück auf dem Server zu sehen -- eine nötige Information, bevor du deine Arbeit mit anderen teilen kannst.",
              "",
              "Remote Branches besitzen die besondere Eigenschaft dein Repository in den \"Detached `HEAD`\" Zustand zu versetzen, wenn du sie auscheckst. Git macht das absichtlich so, denn du kannst nicht direkt auf Remote Branches arbeiten; du musst auf Kopien von ihnen arbeiten und deine Änderungen von dort auf den entfernten Server schieben (wonach der Remote Branch dann auch bei dir aktualisiert wird)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Was heißt `o/`?",
              "",
              "Du fragst dich vielleicht was das `o/` am Anfang des Namens des Remote Branch bedeuten soll. Nun, Namen von Remote Branches folgen einer (zwingenden) Konvention -- sie werden mit diesem Format gebildet:",
              "",
              "* `<Name des Remote>/<Name des Branches>`",
              "",
              "Wenn du also einen Remote Branch namens `o/main` hast, ist es eine Abbildung des Branches `main` auf dem Server, der in deinem Repository als `o` bekannt ist.",
              "",
              "Die meisten Entwickler nennen das Haupt-Remote eigentlich `origin` und nicht `o`. Das ist so verbreitet, dass Git den entfernten Server, von dem man ein `git clone` macht, standardmäßig als `origin` im Clone speichert.",
              "",
              "Leider passt der ganze Name, `origin`, nicht in unsere Darstellung, deshalb benutzen wir hier kurz `o`. :( Merk dir einfach: wenn du echtes Git benutzt, werden die Remotes meistens `origin` heißen!",
              "",
              "So, das war eine Menge zu verdauen. Schauen wir uns das in Aktion an."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Checken wir mal einen Remote Branch aus und schauen was passiert."
            ],
            "afterMarkdowns": [
              "Wie du siehst setzt uns Git in den \"Detached `HEAD`\" Modus und aktualisiert dann nach dem Commit nicht den Branch `o/main`. Das liegt daran, dass der Remote Branch nur aktualisiert wird, wenn sich der entsprechende Branch auf dem Remote verändert."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level zu bewältigen, musst du einen Commit in `main` machen und einen, nachdem du `o/main` ausgecheckt hast. Das illustriert noch einmal wie sich Branches und Remote Branches unterschiedlich verhalten und dass letztere sich nur verändern, wenn sich ihr Zustand auf dem entfernten Server ändert."
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
              "## 远程分支",
              "",
              "既然你已经看过 `git clone` 命令了，咱们深入地看一下发生了什么。",
              "",
              "你可能注意到的第一个事就是在我们的本地仓库多了一个名为 `o/main` 的分支, 这种类型的分支就叫**远程**分支。由于远程分支的特性导致其拥有一些特殊属性。",
              "",
              "远程分支反映了远程仓库(在你上次和它通信时)的**状态**。这会有助于你理解本地的工作与公共工作的差别 —— 这是你与别人分享工作成果前至关重要的一步.",
              "",
              "远程分支有一个特别的属性，在你切换到远程分支时，自动进入分离 HEAD 状态。Git 这么做是出于不能直接在这些分支上进行操作的原因, 你必须在别的地方完成你的工作, （更新了远程分支之后）再用远程分享你的工作成果。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### 为什么有 `o/`？",
              "",
              "你可能想问这些远程分支的前面的 `o/` 是什么意思呢？好吧, 远程分支有一个命名规范 —— 它们的格式是: ",
              "",
              "* `<remote name>/<branch name>`",
              "",
              "因此，如果你看到一个名为 `o/main` 的分支，那么这个分支就叫 `main`，远程仓库的名称就是 `o`。",
              "",
              "大多数的开发人员会将它们主要的远程仓库命名为 `origin`，并不是 `o`。这是因为当你用 `git clone` 某个仓库时，Git 已经帮你把远程仓库的名称设置为 `origin` 了",
              "",
              "不过 `origin` 对于我们的 UI 来说太长了，因此不得不使用简写 `o` :) 但是要记住, 当你使用真正的 Git 时, 你的远程仓库默认为 `origin`! ",
              "",
              "说了这么多，让我们看看实例。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果切换到远程分支会怎么样呢？"
            ],
            "afterMarkdowns": [
              "正如你所见，Git 变成了分离 HEAD 状态，当添加新的提交时 `o/main` 也不会更新。这是因为 `o/main` 只有在远程仓库中相应的分支更新了以后才会更新。"
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要通过本关，在 `main` 分支上做一次提交；然后切换到 `o/main`，再做一提交。这有助于你理解远程分支的不同，他们的更新只是反映了远程的状态。"
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
              "## リモートのブランチ",
              "",
              "あなたは今や`git clone`の動作を知ったことでしょうから、次は実際に詳細を見てみましょう。",
              "",
              "まず、もしかしたらもう気付いているかもしれないですが、私たちのローカルリポジトリにo/mainという名前の新しいブランチが追加されています。このようなブランチは、 _リモート_ ブランチと呼ばれます。リモートブランチは、その固有の役割を担うために特別なプロパティを持っています。",
              "",
              "リモートブランチは、リモートリポジトリの _状態_ を反映します（あなたがそのリモートリポジトリから変更を最後に問い合わせてからの）。",
              "",
              "リモートブランチは、あなたがチェックアウトするとき、`HEAD`が分離された状態になるという特殊な性質を持っています。Gitはこの上での動作を保証しません。なぜこのようになるかというと、リモートブランチ上での直接の作業はできないからなのです。あなたは、別の場所で作業をし、その後でリモートブランチに共有するようにしなければなりません（その後であなたのリモートブランチは更新されます）。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### `o/`とは何か?",
              "",
              "あなたは、リモートブランチが`o/`で始まることに驚くかもしれません。そう、リモートブランチには固有の（必要な）命名規則も存在するのです。 -- これは次のようなフォーマットで表示されます:",
              "",
              "* `<リモート名>/<ブランチ名>`",
              "",
              "これに基づいて、`o/main`と名付けられたブランチを見てみると、`main`はブランチの名前、`o`はリモートの名前であることが分かります。",
              "",
              "多くの開発者は、実際にはメインのリモート名として`o`ではなく`origin`を使います。これは一般的には、Gitが`git clone`した時に`origin`という名前をリモートに付与するためです。",
              "",
              "残念ながら、`origin`という長い名前は私たちのUIには合いませんでした。なので、私たちは短い`o`を使っています（覚えておいてもらいたいのは、実際のGitでは、リモートはおそらく`origin`と名付けられるであろうということです！）",
              "",
              "理解すべきことはたくさんあるので、ひとまず全ての動作を見てみましょう。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "リモートブランチをチェックアウトすると何が起こるかを見てみましょう"
            ],
            "afterMarkdowns": [
              "見ていた通り、`o/main`に移ってから新しいコミットをしても`HEAD`が分離状態になり`o/main`は更新されていません。これは、`o/main`がリモートの更新時のみ更新されるからです。"
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルを終えるには、まずコミットを`main`に一回行い、その後`o/main`にチェックアウトしてからもう一度コミットをします。これは、リモートブランチがどれほど違った動きをするか、そしてリモートブランチがリモートの状態を反映する時しか更新されないことを理解するのに役立つでしょう。"
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
              "## Удалённые ветки в Git",
              "",
              "Теперь, когда вы уже увидели `git clone` в действии, давайте углубимся в детали и посмотрим что же на самом деле изменилось.",
              "",
              "Во-первых, вы должны были заметить, что у нас в локальном репозитории появилась новая ветка с именем `o/main`. Такой тип ветки называется _удалённой_ веткой. Поскольку удалённые ветки играют важную и уникальную роль, они обладают рядом специальных свойств.",
              "",
              "Удалённые ветки отражают _состояние_ удалённых репозиториев (с того момента, как вы обращались к этим удалённым репозиториям в последний раз). Они позволяют вам отслеживать и видеть разницу между вашими локальными наработками и тем, что было сделано другими участниками - важный шаг, который необходимо делать, прежде чем делиться своими наработками с другими.",
              "",
              "Важным свойством удалённых веток является тот факт, что когда вы извлекаете их, вы отделяете (detaching) `HEAD`. Git делает это потому, что вы не можете работать непосредственно в этих ветках; сперва вам необходимо сделать наработки где-либо, а уж затем делиться ими с удалёнными репозиториями (после чего ваши удалённые ветки будут обновлены)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Что такое `o/` в названии ветки?",
              "",
              "Вы, наверное, догадались, что первый символ `o/` в названии ветки служит для обозначения именно удалённых веток. Да. Удалённые ветки также имеют (обязательное) правило именования - они отображаются в формате:",
              "",
              "* `<удалённый репозиторий>/<имя ветки>`",
              "",
              "Следовательно, если вы взглянете на имя ветки `o/main`, то здесь `main` - это имя ветки, а `o` - это имя удалённого репозитория.",
              "",
              "Большинство разработчиков именуют свои главные удалённые репозитории не как `o`, а как `origin`. Также общепринятым является именование удалённого репозитория как `origin`, когда вы клонируете репозиторий командой `git clone`.",
              "",
              "К сожалению, полное имя `origin` не помещается на элементах дизайна наших уроков, поэтому мы используем краткое `o` :( Просто помните, когда вы пользуетесь git в реальном проекте, ваш удалённый репозиторий скорее всего будет называться `origin`!",
              "",
              "Давайте посмотрим на всё это в действии."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте извлечём (check out) удалённую ветку и посмотрим что произойдёт"
            ],
            "afterMarkdowns": [
              "Как вы можете видеть, git отделил (detached) `HEAD` и не обновил `o/main`, когда мы добавили новый коммит. Всё потому, что `o/main` обновится тогда и только тогда, когда обновится сам удалённый репозиторий."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Для завершения уровня выполните коммит единожды на `main`, а затем на `o/main` (предварительно переключившись на эту ветку). Это наглядно продемонстрирует поведение удалённых веток, а также покажет, как изменения влияют на состояние удалённых репозиториев."
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
              "## Git 원격 브랜치",
              "",
              "이제 `git clone`을 직접 확인 해 보셨습니다. 이제 무엇이 변했는지 살펴 봅시다.",
              "",
              "가장 먼저 알아차릴만한 변화는 우리의 로컬 저장소에 `o/main`라고하는 새 브랜치가 생긴겁니다. 이런 종류의 브랜치는 _원격_브랜치라고 불립니다; 원격 브랜치는 특정한 목적을 제공하기 때문에 특별한 속성들이 있습니다.",
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
              "이런 이유로, 만약 `o/main`라는 이름의 브랜치를 보게되면, 브랜치의 이름은 `main`이고 원격 저장소의 이름은 `o`인겁니다.",
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
              "보이는것 처럼, git은 우리를 분리된 `HEAD` 모드로 만들고 새로운 커밋을 추가해도 `o/main`를 갱신하지 않습니다. 이것은 `o/main`가 원격 저장소가 갱신될때만 갱신되기 때문입니다."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "다음 레벨로 가기 위해서는 `main`에서 한번 커밋하고 `o/main`를 체크아웃 하고 다시 한번 커밋을 하세요. 이를 통해서 원격 브랜치가 어떻게 다르게 작동하는지 알아보고, 원격 브랜치는 원격 저장소의 상태를 반영하기만 한다는것을 이해해 봅시다."
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
              "## Віддалені гілки",
              "",
              "Тепер, коли ти познайомився з `git clone` в дії, розгляньмо деталі й подивімося, що дійсно змінилося.",
              "",
              "Перше, що ти міг помітити -- це те, що з’явився новий бранч з назвою `o/main`. Такі гілки називаються  _віддаленими_ (remote); віддалені гілки в гіт відіграють в певному сенсі унікальну роль, тому в них є деякі спеціальні властивості, непритаманні іншим гілкам.",
              "",
              "Віддалені гілки відображають _стан_ віддалених репозиторіїв (точніше, стан віддаленого репо на момент останньої синхронізації). Вони дозволяють  відрізняти та відслідковувати локальні зміни та зміни інших учасників, що є дуже важливим для успішної синхронізації роботи між різними репозиторіями.",
              "",
              "Важливою властивістю віддалених гілок є те, що коли перейти на них, ти опинишся в стані `detached HEAD`. Git робить це спеціально, так як неможливо працювати з ними напряму; ти маєш працювати в локальній гілці й по необхідності синхронізуватися з віддаленим репозиторієм (після чого віддалену гілку буде оновлено)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Що за `o/`? Або Римський салют",
              "",
              "Ти, можливо, здогадуєшся для чого потрібен префікс `o/` на віддалених гілках. Так, існує (примусове) правило іменування віддалених гілок  -- вони відображаються в форматі:",
              "",
              "* `<ім’я віддаленого репо>/<ім’я гілки>`",
              "",
              "Отже, якщо розглянути гілку з назвою `o/main`, то ім’я гілки -- це `main` а ім’я віддаленого репозиторію -- це `o`.",
              "",
              "Більшість розробників насправді називають ім’я головного віддаленого репозиторію `origin` (початок), а не `o`. Це настільки поширена практика, що гіт автоматично називає віддалений репозиторій `origin` коли ти його клонуєш.",
              "",
              "На жаль повністю ім’я `origin` не влазить в наш UI, натомість ми будемо використовувати коротше `o` :( Просто не забудь, коли будеш використовувати звичайний гіт, що твій віддалений репо скоріш за все називається `origin`!",
              "",
              "Це багато інформації, погляньмо як це працює на прикладі."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Зробімо checkout віддаленої гілки й подивімось, що буде"
            ],
            "afterMarkdowns": [
              "Як бачиш, git перейшов в стан `detached HEAD` і не оновив `o/main` коли ми зробили новий коміт. Це тому, що `o/main` буде оновлено лише тоді, коли буде оновлено віддалений репозиторій."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти цей рівень, зроби один коміт в `main`, а потім переключись в `o/main` і закомітся ще раз. Це наглядно продемонструє поведінку віддалених гілок, а також покаже як зміни впливають на стан віддаленого репозиторію."
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
              "## Nhánh Git từ xa",
              "",
              "Giờ bạn đã thấy cách thức hoạt động của `git clone`, cùng xem xét kỹ hơn những gì đã xảy ra.",
              "",
              "Điều đầu tiên mà có thể bạn để ý là một nhánh mới xuất hiện trong kho chứa cục bộ của ta là `o/main`. Loại nhánh này được gọi là nhánh _từ xa_ (_remote_); nhánh từ xa có những thuộc tính đặc biệt vì chúng phục vụ một mục đích duy nhất.",
              "",
              "Nhánh từ xa phản ánh _trạng thái_ (_state_) của kho chứa từ xa (kể từ lần cuối cùng bạn tương tác với kho chứa từ xa). Chúng giúp bạn hiểu về sự khác biệt giữa công việc trên kho chứa cục bộ với kho chứa từ xa -- một bước quan trọng trước khi chia sẻ công việc của bạn với người khác.",
              "",
              "Nhánh từ xa có một thuộc tính đặc biệt đó là khi bạn chuyển sang chúng, bạn sẽ vào trạng thái tách rời `HEAD`. Mục đích của Git là để bạn không thể làm việc trực tiếp trên nhánh từ xa; bạn phải làm việc ở nơi khác và chia sẻ thành quả lên kho chứa từ xa (sau đó nhánh từ xa sẽ được cập nhật).",
              "",
              "Nói rõ một chút: Các nhánh từ xa nằm trên kho lưu trữ cục bộ của bạn, không phải trên kho lưu trữ từ xa."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### `o/` là gì vậy?",
              "",
              "Có thể bạn sẽ thắc mắc về ký tự `o/` ở đầu tên nhánh từ xa có ý nghĩa gì. Chà, tên nhánh từ xa cũng có (ràng buộc) quy tắc đặt tên -- chúng được hiển thị dưới dạng:",
              "",
              "* `<tên kho chứa từ xa>/<tên nhánh>`",
              "",
              "Do đó, đối với `o/main` thì `main` là tên nhánh còn `o` là tên kho chứa từ xa.",
              "",
              "Thực tế thì hầu hết các nhà phát triển đặt tên kho chứa từ xa là `origin` chứ không phải `o`. Nó trở thành thông lệ đến nỗi Git đặt tên `origin` cho kho chứa từ xa khi bạn dùng `git clone` để sao chép một kho chứa.",
              "",
              "Đáng tiếc là `origin` không khớp trong giao diện của chúng tôi, nên chúng tôi đành phải viết tắt là `o` :( Nhưng hãy nhớ rằng khi dùng Git thật sự thì chắc hẳn tên của kho chứa từ xa sẽ là `origin`!",
              "",
              "Lý thuyết hơi nhiều rồi, đi vào thực hành thôi."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hãy thử chuyển sang nhánh từ xa xem điều gì xảy ra."
            ],
            "afterMarkdowns": [
              "Như bạn thấy, Git đưa ta vào trạng thái tách rời `HEAD` và không cập nhật nhánh `o/main` khi ta thêm một commit. Đó là bởi vì `o/main` chỉ cập nhật khi kho chứa từ xa cập nhật."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Để hoàn thành cấp độ này, commit một lần trên `main` và một lần nữa sau khi chuyển sang `o/main`. Điều này sẽ giúp ta hiểu cách nhánh từ xa hành xử, chúng chỉ cập nhật để phản ánh trạng thái của kho chứa từ xa."
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
              "## Git Oddaljeni Branchi",
              "",
              "Sedaj ko smo videli `git clone` v praksi se poglobimo v dejanske spremembe.",
              "",
              "Prva stvar, ki si jo morda opazil je, da se je pojavil nov branch na našem lokalnem repotu imenovan `o/main`. Temu tipu brancha pravimo _oddaljen_ (remote) branch; oddaljeni branchi imajo posebne lastnosti, ker služijo določenim namenom.",
              "",
              "Oddaljeni branchi odražajo _stanje_ oddaljenega repozitorija (od kar si nazadnje komuniciral z oddaljenim repotom). To ti morda pomaga razumeti razliko med tvojim lokalnim delom in delom, ki je javno -- ključni korak, preden deliš svoje delo z ostalimi.",
              "",
              "Oddaljeni branchi imajo posebno lastnost, da ko jih checkoutaš, si postavljen v stanje z ločenim `HEAD-om`. Git naredi to zanalašč, ker ne moreš delati neposredno na teh branchih; moreš delati drugje in nato deliti svoje delo z oddaljenim repotom (po tem bodo oddaljeni branchi bili posodobljeni)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Kaj je `o/`?",
              "",
              "Morda se sprašuješ, kaj je ta `o/` spredaj pred oddaljenmi branchi. Tudi oddaljeni branchi imajo (zahtevano) pravilo za poimenovanje -- predstavljeni so v sledečem formatu:",
              "",
              "* `<ime oddaljenega repota>/<ime brancha>`",
              "",
              "Posledično, če pogledamo branch poimenovan `o/main`, je ime brancha `main`, ime oddaljenega repota pa `o`.",
              "",
              "Večina razvijalcev v bistvu poimenuje njihov glavni oddaljeni repozitorij `origin`, ne `o`. To je takoj pogosto, da git ubistvu nastavi tvoj oddaljen repo z imenom `origin` ko izvedeš `git clone` nad repozitorijem.",
              "",
              "Nažalost polno ime `origin` ne paše v naš prikaz, zato uporabljamo `o` kot bližnjico :( Samo zapomni si, ko uporabljaš pravi git, bo tvoj oddaljen repo verjetno poimenovan `origin`!",
              "",
              "To je kar veliko za razumeti, zato si poglejmo stvar v akciji."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Checkoutajmo oddaljen branch in poglejmo kaj se zgodi."
            ],
            "afterMarkdowns": [
              "Kot lahko vidiš, nas git postavi v stanje ločenega `HEAD-a` in ne posodobi `o/main`, ko dodamo nov commit. To je zato, ker se bo `o/main` posodobil šele, ko se bo posodobil oddaljen repo."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Za dokončanje te stopnje, commitaj enkrat iz `main` in enkrat, ko checkoutaš `o/main`. To ti bo pomagalo osvojiti, kako se oddaljeni branchi obnašajo drugače in se posodobijo le da odražajo stanje na oddaljenem repozitoriju."
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
              "## Zdalne gałęzie Git",
              "",
              "Teraz, gdy zobaczyliśmy już, jak działa `git clone`, przyjrzyjmy się temu, co faktycznie się zmieniło.",
              "",
              "Pierwszą rzeczą, która mogła ci się rzucić w oczy, jest to, że w naszym lokalnym repozytorium pojawiła się nowa gałąź o nazwie `o/main`. Ten typ gałęzi nazywany jest gałęzią _zdalną_. Gałęzie zdalne mają specjalne właściwości, ponieważ służą do wyjątkowego celu.",
              "",
              "Zdalne gałęzie odzwierciedlają _stan_ zdalnych repozytoriów (od czasu ostatniej komunikacji z nimi). Pomagają zrozumieć różnicę między pracą lokalną a dostępną publicznie -- to niezwykle ważna sprawa przed udostępnieniem swojej pracy innym.",
              "",
              "Zdalne gałęzie mają specjalną właściwość. Kiedy je checkoutujesz, Git wprowdza cię w tryb odłączonego `HEADa`. Robi to celowo, ponieważ nie możesz pracować bezpośrednio na tych gałęziach; musisz pracować w innym miejscu, a następnie udostępnić swoją pracę zdalnie (i wtedy twoje zdalne gałęzie zostaną zaktualizowane)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Czym jest `o/`?",
              "",
              "Możesz się zastanawiać, do czego służy początkowy znak `o/` w zdalnych gałęziach. Otóż zdalne gałęzie również mają (wymaganą) konwencję nazewnictwa -- są wyświetlane w formacie:",
              "",
              "* `<remote name>/<branch name>`",
              "",
              "Więc jeśli spojrzysz na gałąź o nazwie `o/main`, nazwą gałęzi (branch name) jest `main`, a nazwą zdalną (remote name) jest `o`.",
              "",
              "Większość programistów w rzeczywistości nazywa główną (main) zdalną gałąź `origin`, a nie `o`. Jest to tak powszechne, że Git w praktyce sam ustawia zdalną nazwę na `origin`, kiedy wykonujesz `git clone` na repozytorium.",
              "",
              "Niestety pełna nazwa `origin` nie zmieści się w naszym interfejsie, więc używamy `o` jako skrótu :( Pamiętaj więc, że kiedy używasz prawdziwego Gita, twoja zdalna nazwa najprawdopodobniej brzmi `origin`!",
              "",
              "To dużo do przyswojenia, więc przyjrzyjmy się, jak to wszystko działa."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Wyciągnijmy (check out) zdalną gałąź i zobaczmy, co się stanie."
            ],
            "afterMarkdowns": [
              "Jak widzisz, git przełączył nas w tryb odłączonego `HEADa` i nie zaktualizował `o/main`, kiedy dodaliśmy nowy commit. Dzieje się tak, ponieważ `o/main` zaktualizuje się tylko przy aktualizacji zdalnego repozytorium."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Aby ukończyć ten poziom, zrób jeden commit z `main` i drugi, po przełączeniu się (check out) na `o/main`. Pomoże ci to zrozumieć różnice w zachowaniu zdalnych gałęzi i zapamiętać, że aktualizują się wyłącznie, aby odzwierciedlić stan zdalnego repozytorium."
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
              "## Rami remoti di Git",
              "",
              "Adesso che hai visto `git clone` in azione, approfondiamo cosa effettivamente è cambiato.",
              "",
              "Come potrai aver notato un nuovo ramo è apparso nel nostro repository locale chiamato `o/main`. Questo tipo di ramo è chiamato ramo remoto; i rami remoti hanno proprietà speciali perché servono ad un unico scopo.",
              "",
              "I rami remoti riflettono lo _stato_ dei repository remoti (dall'ultima volta che hai comunicato con quei repository remoti). Ti aiutano a capire la differenza tra il tuo lavoro locale e quello pubblico -- un passo fondamentale da compiere prima di condividere il tuo lavoro con gli altri.",
              "",
              "I rami remoti hanno la proprietà speciale che quando li controlli, `HEAD` viene passato nella modalità di distacco. Git utilizza questa modalità affinché tu non possa lavorare direttamente su questi rami; ma dovrai lavorare altrove per poi condividere il tuo lavoro con il remoto (dopodiché i tuoi rami remoti verranno aggiornati)."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### Cos'è `o/`?",
              "",
              "Ti starai chiedendo a cosa serve `o/` su questi rami remoti. Bene, i rami remoti hanno anche un nome convenzionale (obbligatorio) -- vengono visualizzati nel formato:",
              "",
              "* `<remote name>/<branch name>`",
              "",
              "Quindi, se guardi ad un ramo chiamato `o/main`, il nome del ramo è `main` e il nome del remoto è `o`.",
              "",
              "La maggior parte degli sviluppatori in realtà nomina il loro main remoto `origin`, non `o`. Questo è così comune che git in realtà configura il remoto per essere chiamato `origin` quando viene eseguito `git clone` su un repository.",
              "",
              "Sfortunatamente il nome completo di `origin` non si adatta alla nostra interfaccia utente, quindi usiamo `o` come abbreviazione :( Ricorda solo che quando userai git realmente, il tuo remoto probabilmente si chiamerà `origin`!",
              "",
              "C'è ancora molto da fare, quindi vediamo quanto detto in azione."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Controlliamo un ramo remoto e vediamo cosa succede."              
            ],
            "afterMarkdowns": [
              "Come puoi vedere, git ci ha messo in modalità `HEAD` distaccata e poi non ha aggiornato `o/main` quando abbiamo aggiunto un nuovo commit. Questo perché `o/main` si aggiornerà solo quando lo farà anche il remoto."
            ],
            "command": "git checkout o/main; git commit",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Per completare questo livello, fai un commit una volta dal `main` e una volta dopo aver eseguito il checkout su `o/main`. Questo ti aiuterà a capire come i rami remoti si comportano differentemente, e si aggiornano solo per riflettere lo stato del remoto"
            ]
          }
        }
      ]
    }
  }
};
