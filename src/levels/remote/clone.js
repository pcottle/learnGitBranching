// The pre-existing remote for this lesson: a two-commit history on main,
// with the local repo just a hidden clonePending placeholder until the
// learner runs `git clone`. Shared between the level's own startTree and
// the "git clone" GitDemonstrationView's beforeTree below, so the demo
// shows the exact same remote -> local clone the learner is about to do,
// instead of drifting from the level's actual starting state.
var CLONE_START_TREE = {
  "branches": {"main": {"target": "C0", "id": "main"}},
  "commits": {"C0": {"parents": [], "id": "C0", "rootCommit": true}},
  "HEAD": {"target": "main", "id": "HEAD"},
  "originTree": {
    "branches": {"main": {"target": "C1", "id": "main"}},
    "commits": {
      "C0": {"parents": [], "id": "C0", "rootCommit": true},
      "C1": {"parents": ["C0"], "id": "C1"}
    },
    "HEAD": {"target": "main", "id": "HEAD"}
  },
  "clonePending": true
};

exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "startTree": JSON.stringify(CLONE_START_TREE),
  "solutionCommand": "git clone",
  "name": {
    "en_US": "Clone Intro",
    "fa": "مقدمه Clone",
    "fr_FR": "Introduction à clone",
    "de_DE": "Einführung in Clone",
    "ja": "Clone入門",
    "es_AR": "Introducción a clone",
    "es_MX": "Introducción a clone",
    "es_ES": "Introducción a clone",
    "pt_BR": "Introdução à clonagem",
    "gl": "Introducción a clone",
    "zh_CN": "Git Clone",
    "zh_TW": "介紹 clone",
    "ro": "Introducere în clonare",
    "bg": "Въведение в clone",
    "ru_RU": "Введение в клонирование",
    "ko": "Clone 소개",
    "uk": "Знайомство з clone",
    "vi": "Giới thiệu về clone",
    "sl_SI": "Uvod v Git Clone",
    "pl": "Wstęp do klonowania (clone)",
    "it_IT": "Introduzione al clone",
    "tr_TR": "Clone Tanıtımı",
    "hu_HU": "Clone bevezetés",
    "az": "Clone-a giriş"
  },
  "hint": {
    "en_US": "Just git clone!",
    "fa": "فقط git clone کن!",
    "fr_FR": "Simplement git clone !",
    "de_DE": "Einfach git clone ausführen!",
    "ja": "単にgit clone!",
    "zh_CN": "只要 git clone 就可以了!",
    "es_AR": "Simplemente hacé git clone!",
    "es_MX": "Simplemente haz git clone!",
    "es_ES": "¡Simplemente escribe `git clone`!",
    "pt_BR": "Basta fazer um git clone!",
    "gl": "¡Chega con facer git clone!",
    "zh_TW": "只要 git clone 就好了",
    "ro": "Doar git clone!",
    "bg": "Просто изпълни git clone!",
    "ru_RU": "Простой git clone!",
    "ko": "그냥 git clone 하세요!",
    "uk": "Просто git clone!",
    "vi": "Đơn giản là git clone!",
    "sl_SI": "Preprosto samo git clone!",
    "pl": "Po prostu git clone!",
    "it_IT": "Semplicemente git clone!",
    "tr_TR": "Sadece git clone yapın!",
    "hu_HU": "Csak git clone!",
    "az": "Sadəcə git clone et!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Remotes",
              "",
              "Remote repositories aren't actually that complicated. In today's world of cloud computing it's easy to think that there's a lot of magic behind git remotes, but they are actually just copies of your repository on another computer. You can typically talk to this other computer through the Internet, which allows you to transfer commits back and forth.",
              "",
              "That being said, remote repositories have a bunch of great properties:",
              "",
              "- First and foremost, remotes serve as a great backup! Local git repositories have the ability to restore files to a previous state (as you know), but all that information is stored locally. By having copies of your git repository on other computers, you can lose all your local data and still pick up where you left off.",
              "",
              "- More importantly, remotes make coding social! Now that a copy of your project is hosted elsewhere, your friends can contribute to your project (or pull in your latest changes) very easily.",
              "",
              "It's become very popular to use websites that visualize activity around remote repos (like [GitHub](https://github.com/)), but remote repositories _always_ serve as the underlying backbone for these tools. So it's important to understand them!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Our Command to start working with remotes",
              "",
              "Up until this point, Learn Git Branching has focused on teaching the basics of _local_ repository work (branching, merging, rebasing, etc). However now that we want to learn about remote repository work, we need a command to set up the environment for those lessons. `git clone` will be that command.",
              "",
              "Just like the real `git clone`, we've set up a remote repository for this lesson, and running `git clone` will pull it down into your local repository. From here on, `o/main` in your local repo refers to where the remote's `main` branch was at the time you cloned it.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Lets start slow and just look at what a remote repository looks like (in our visualization) before we clone it.",
              ""
            ],
            "afterMarkdowns": [
              "There it is! Now you have your own local copy of the project, cloned from the remote. It looks pretty similar except for some visual changes to make the distinction apparent -- in later levels you'll get to see how we share work across these repositories."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, simply `git clone` the remote repository we've set up for you. The real learning will come in following lessons."
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
              "## ریموت‌های گیت (Git Remotes)",
              "",
              "مخازن ریموت در واقع آنقدرها هم پیچیده نیستند. در دنیای امروزی رایانش ابری، می‌توان به سادگی تصور کرد که جادوی زیادی پشت ریموت‌های گیت وجود دارد، اما آن‌ها در واقع فقط کپی‌هایی از مخازن شما در یک کامپیوتر دیگر هستند. شما معمولاً می‌توانید از طریق اینترنت با این کامپیوتر دیگر صحبت کنید، که به شما اجازه می‌دهد کامیت‌ها را به رفت و برگشت منتقل کنید.",
              "",
              "با این حال، مخازن ریموت دارای تعدادی ویژگی عالی هستند:",
              "",
              "- اول و مهمتر از همه، ریموت‌ها به عنوان یک پشتیبان عالی عمل می‌کنند! مخازن گیت محلی همانطور که می‌دانید قابلیت بازگرداندن فایل‌ها به وضعیت قبلی را دارند، اما تمام آن اطلاعات به صورت محلی ذخیره می‌شود. با داشتن کپی‌هایی از مخزن گیت خود در کامپیوترهای دیگر، می‌توانید تمام داده‌های محلی خود را از دست بدهید و همچنان از جایی که کار را متوقف کردید ادامه دهید.",
              "",
              "- مهمتر از آن، ریموت‌ها کدنویسی را اجتماعی می‌کنند! حالا که کپی پروژه شما در جای دیگری میزبانی می‌شود، دوستان شما می‌توانند به راحتی در پروژه شما مشارکت کنند (یا آخرین تغییرات شما را دریافت کنند).",
              "",
              "استفاده از وب‌سایت‌هایی که فعالیت در اطراف مخازن ریموت را به تصویر می‌کشند (مانند [GitHub](https://github.com/)) بسیار محبوب شده است، اما مخازن ریموت _همیشه_ به عنوان ستون فقرات زیربنایی برای این ابزارها عمل می‌کنند. بنابراین درک آن‌ها مهم است!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## دستور ما برای شروع کار با ریموت‌ها",
              "",
              "تا این لحظه، Learn Git Branching بر آموزش مبانی کار با مخزن _محلی_ (شاخه سازی، ادغام، ری‌بیس و غیره) متمرکز شده است. با این حال، اکنون که می‌خواهیم در مورد کار با مخزن ریموت یاد بگیریم، به دستوری برای راه‌اندازی محیط برای آن درس‌ها نیاز داریم. آن دستور `git clone` خواهد بود.",
              "",
              "درست مثل `git clone` واقعی، ما برای این درس یک مخزن ریموت از قبل آماده کرده‌ایم و اجرای `git clone` آن را به مخزن محلی شما دانلود می‌کند. از اینجا به بعد، `o/main` در مخزن محلی شما نشان می‌دهد که شاخه‌ی `main` ریموت در لحظه‌ی clone کردن کجا بوده است."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "بیایید آهسته شروع کنیم و فقط ببینیم یک مخزن ریموت چگونه به نظر می‌رسد (در تصویرسازی ما)، پیش از این‌که آن را clone کنیم.",
              ""
            ],
            "afterMarkdowns": [
              "ایناهاش! حالا شما یک نسخه محلی از پروژه دارید که از ریموت clone شده است. به نظر می‌رسد بسیار شبیه به آن است، به جز برخی تغییرات بصری تا تمایز آن آشکار شود -- در مراحل بعدی خواهید دید که چگونه کار را بین این مخازن به اشتراک می‌گذاریم."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "برای پایان این مرحله، کافیست مخزن ریموتی که برایتان آماده کرده‌ایم را `git clone` کنید. یادگیری واقعی در درس‌های بعدی خواهد آمد."
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
              "## Git Remotes",
              "",
              "Les dépôts distants (remote repositories) ne sont pas si compliqués que ça. Dans l'ère actuelle du cloud computing il est facile de croire qu'il y a un peu de magie derrière les branches distantes, mais elles sont en fait juste des copies de votre dépôt local sur un autre ordinateur. Vous pouvez donc vous connecter à cet ordinateur par Internet, ce qui vous permet de transférer les commits en retard et en avance.",
              "",
              "Cela dit, les branches distantes ont plusieurs propriétés puissantes :",
              "",
              "- Tout d'abord, le dépôt distant sert de sauvegarde ! Le dépôt local de Git a la capacité de restaurer des fichiers à un état précédent (comme vous le savez), mais toutes les informations sont stockées localement. En ayant des copies de votre dépôt Git sur d'autres ordinateurs, vous pouvez perdre vos données et toujours repartir de là où vous en étiez resté.",
              "",
              "- Plus important encore, les dépôts distants sociabilisent le projet ! Maintenant qu'il est hébergé quelque part ailleurs, vos amis peuvent y contribuer facilement (ou récupérer vos derniers changements).",
              "",
              "Il est devenu courant de visualiser l'activité sur dépôt distant via des sites internet (comme [GitHub](https://github.com/)), mais les dépôts distants servent _toujours_ de colonne vertébrale à ce système. Il est donc important de les comprendre !"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Notre commande pour commencer à travailler avec les dépôts distants",
              "",
              "Jusqu'à maintenant, Learn Git Branching s'est surtout concentré sur l'apprentissage des bases du travail sur un dépôt _local_ (branch, merge, rebase, etc). Cependant maintenant que nous voulons savoir comment travailler sur les dépôts distants, nous avons besoin d'une commande pour l'environnement de ces leçons. `git clone` sera cette commande.",
              "",
              "Tout comme le vrai `git clone`, nous avons mis en place un dépôt distant pour cette leçon, et exécuter `git clone` va le rapatrier dans votre dépôt local. À partir de maintenant, `o/main` dans votre dépôt local indique où se trouvait la branche `main` du dépôt distant au moment où vous l'avez clonée.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Commençons doucement et regardons à quoi ressemble un dépôt distant (dans notre visualisation) avant de le cloner.",
              ""
            ],
            "afterMarkdowns": [
              "Nous y sommes ! Maintenant vous avez votre propre copie locale du projet, clonée depuis le dépôt distant. Cela ressemble fortement à ce que nous avons d'habitude, en dehors de quelques changements pour rendre compte des différences -- dans les niveaux suivants vous allez voir comment partager le travail entre ces dépôts."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour finir ce niveau, faites simplement un `git clone` du dépôt distant que nous avons préparé pour vous. Le réel apprentissage arrivera dans les prochaines leçons."
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
              "## Git Remotes",
              "",
              "Los repositorios remotos no son _tan_ complicados. En el mundo actual de la computación en la nube es bastante facil pensar que hay un montón de magia detrás de los remotes de git, pero en realidad sólo son copias de tu repositorio en otra computadora. Típicamente vas a hablar con esta otra computadora a través de Internet, lo que permite transferir commits de un lado a otro.",
              "",
              "Habiendo dicho eso, los repositorios remotos tienen un par de propiedades copadas:",
              "",
              "- Primero y principal, los remotos ¡son un genial backup! Los repositorios locales de git tienen la habilidad de restaurar archivos a un estado previo (como ya sabés), pero toda esa información está almacenada localmente. Al tener copias de tu repositorio git en otras computadoras, podés perder todos tus datos locales y aún así retomar de donde habías dejado.",
              "",
              "- Más importante, ¡los remotos sociabilizan la programación! Ahora que hay una copia de tu proyecto hosteada en otro lugar, cualquiera puede contribuir a tu proyecto (o bajarse los últimos cambios) de un modo muy sencillo.",
              "",
              "Se volvió bastante popular el uso de sitios web que muestran la actividad de los repositorios (como [GitHub](https://github.com/)), pero esos repositorios remotos _siempre_ sirven como la base subyacente de esas herramientas. Así que ¡es importante entenderlos!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Nuestro comando para empezar a trabajar con remotos",
              "",
              "Hasta este punto, Learn Git Branching se centró en enseñar las bases del trabajo _local_ con repositorios (branchear, mergear, rebasear, etc). Sin embargo, ahora que queremos aprender sobre el trabajo con repositorios remotos, necesitamos un comando para inicializar nuestro entorno para esas lecciones. Ese comando será `git clone`",
              "",
              "Tal como el `git clone` real, ya preparamos un repositorio remoto para esta lección, y al ejecutar `git clone` lo vas a bajar a tu repositorio local. De acá en adelante, `o/main` en tu repo local indica dónde estaba la rama `main` del remoto en el momento en que lo cloneaste.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Comencemos despacio y simplemente veamos cómo se ve un repositorio remoto en nuestra visualización antes de clonarlo.",
              ""
            ],
            "afterMarkdowns": [
              "¡Ahí está! Ahora tenés tu propia copia local del proyecto, clonada desde el remoto. Parece bastante similar, salvando algunos cambios visuales para hacer evidente la distinción -- en niveles posteriores vas a ver cómo compartir trabajo entre estos repositorios."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente hacé `git clone` del repositorio remoto que preparamos para vos. El verdadero aprendizaje viene en las próximas lecciones."
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
              "## Git Remotes",
              "",
              "Los repositorios remotos no son realmente _tan_ complicados. En el mundo actual de la computación en la nube es facil pensar que hay un montón de magia detrás de los git remotes, pero en realidad sólo son copias de tu repositorio en otra computadora. Típicamente vas a comunicarte con esta otra computadora a través de Internet, lo que te permite transferir commits de un lado a otro.",
              "",
              "Habiendo dicho eso, los repositorios remotos tienen un montón de propiedades geniales:",
              "",
              "- Primero y principalmente, los remotes ¡funcionan como un respaldo increible! Los repositorios locales de git tienen la habilidad de restaurar archivos a un estado previo (como ya sabes), pero toda esa información se encuentra almacenada localmente. Al tener copias de tu repositorio git en otras computadoras, puedes perder todos tus datos locales y aún así retomar el trabajo en donde lo dejaste.",
              "",
              "- Más importante, ¡los remotes hacen más social la programación! Ahora que hay una copia de tu proyecto almacenada en otro lugar, tus amigos pueden contribuir a tu proyecto (u obtener los últimos cambios) de un modo muy sencillo.",
              "",
              "Se ha vuelto bastante popular el uso de sitios web que muestran la actividad de los repositorios (como [GitHub](https://github.com/)), pero los repositorios remotos _siempre_ sirven como la base subyacente de esas herramientas. Así que ¡es importante entenderlos!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Nuestro comando para empezar a trabajar con remotes",
              "",
              "Hasta este punto, Learn Git Branching se ha centrado en enseñar las bases del trabajo con repositorios _locales_ (manejo de ramas, mezclar, rebasear, etc). Sin embargo, ahora que queremos aprender sobre el trabajo con repositorios remotos, necesitamos un comando para inicializar nuestro entorno para esas lecciones. Ese comando será `git clone`.",
              "",
              "Tal como el `git clone` real, ya preparamos un repositorio remoto para esta lección, y al ejecutar `git clone` lo vas a descargar a tu repositorio local. De aquí en adelante, `o/main` en tu repo local indica dónde estaba la rama `main` del remoto en el momento en que lo clonaste.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Comencemos despacio y simplemente veamos cómo se ve un repositorio remoto en nuestro caso antes de clonarlo.",
              ""
            ],
            "afterMarkdowns": [
              "¡Ahí está! Ahora tienes tu propia copia local del proyecto, clonada desde el remoto. Se ve bastante similar, excepto por algunos cambios visuales para hacer evidente la distinción -- en niveles posteriores vas a ver cómo compartir trabajo entre estos repositorios."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente ejecuta `git clone` sobre el repositorio remoto que preparamos para ti. El verdadero aprendizaje viene en las próximas lecciones."
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
              "## Git Remotes",
              "",
              "Los repositorios remotos no son _tan_ complicados. En el mundo actual de la computación en la nube es bastante facil pensar que hay un montón de magia detrás de los remotes de git, pero en realidad sólo son copias de tu repositorio en otra computadora. Típicamente vas a hablar con esta otra computadora a través de Internet, lo que permite transferir commits de un lado a otro.",
              "",
              "Habiendo dicho eso, los repositorios remotos tienen un par de propiedades interesantes:",
              "",
              "- Primero y principal, los remotos ¡son un backup genial! Los repositorios locales de git tienen la habilidad de restaurar archivos a un estado previo (como ya sabes), pero toda esa información se encuentra almacenada localmente. Al tener copias de tu repositorio git en otras computadoras, puedes perder todos tus datos locales y aún así retomar el trabajo en el punto donde lo habías dejado.",
              "",
              "- Más importante, ¡los remotos sociabilizan la programación! Ahora que hay una copia de tu proyecto hosteada en otro lugar, tus amigos pueden contribuir a tu proyecto (o bajarse los últimos cambios) de un modo muy sencillo.",
              "",
              "Se volvió bastante popular el uso de sitios web que muestran la actividad de los repositorios (como [GitHub](https://github.com/)), pero esos repositorios remotos _siempre_ sirven como la base subyacente de esas herramientas. Así que ¡es importante entenderlos!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Nuestro comando para empezar a trabajar con remotos",
              "",
              "Hasta este punto, Learn Git Branching se centró en enseñar las bases del trabajo _local_ con repositorios (crear ramas, mergear, rebasear, etc). Sin embargo, ahora que queremos aprender sobre el trabajo con repositorios remotos, necesitamos un comando para inicializar nuestro entorno para esas lecciones. Ese comando será `git clone`",
              "",
              "Igual que el `git clone` real, hemos preparado un repositorio remoto para esta lección, y ejecutar `git clone` lo descargará a tu repositorio local. A partir de ahora, `o/main` en tu repositorio local indica dónde estaba la rama `main` del remoto en el momento en que lo clonaste.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Comencemos despacio y simplemente veamos cómo se ve un repositorio remoto en nuestra visualización antes de clonarlo.",
              ""
            ],
            "afterMarkdowns": [
              "¡Ahí está! Ahora tienes tu propia copia local del proyecto, clonada desde el remoto. Parece bastante similar, salvando algunos cambios visuales para hacer evidente la distinción -- en niveles posteriores vas a ver cómo compartir trabajo entre estos repositorios."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente ejecuta `git clone` sobre el repositorio remoto que hemos preparado para ti. El verdadero aprendizaje viene en las próximas lecciones."
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
              "## Remotos no Git",
              "",
              "Repositórios remotos não são algo muito complicado. Nos dias atuais de computação em nuvem, seria fácil pensar que existiria muita mágica por trás dos remotos do Git, mas não é o caso -- eles são na verdade apenas cópias do seu repositório em outro computador. Você pode geralmente comunicar-se com esse outro computador por meio da Internet, o que permite que você transfira commits de um lado para o outro.",
              "",
              "Tendo dito isto, repositórios remotos tem uma série de propriedades interessantes:",
              "",
              "- Primeiro e antes de tudo, repositórios remotos servem como um ótimo backup! Repositórios Git locais possuem a habilidade de restaurar um arquivo para um estado anterior (como você sabe), mas toda a informação está guardada localmente. Tendo cópias do seu repositório Git em outros computadores, mesmo se você perder todos os seus dados locais, ainda terá como recomeçar do mesmo ponto de onde você tinha parado.",
              "",
              "- Ainda mais importante, repositórios remotos tornam o desenvolvimento uma atividade social! Agora que uma cópia do seu projeto está hospedada em outro lugar, seus amigos podem contribuir para o seu projeto (ou obter as suas últimas alterações) de uma forma bastante simples.",
              "",
              "Está se tornando bastante popular o uso de websites para visualizar a atividade em repositórios (como o [GitHub](https://github.com/)), mas o recurso de repositórios remotos _sempre_ serve como mecanismo base para essas ferramentas. Então é importante entender como ele funciona!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Nosso comando para começar a trabalhar com remotos",
              "",
              "Até este ponto, o Learn Git Branching focou em ensinar o básico a respeito de trabalho em repositórios _locais_ (branch, merge, rebase, etc). Entretanto, agora que queremos aprender como repositórios remotos funcionam, precisamos de um comando para configurar o ambiente para essas lições. Esse comando será o `git clone`.",
              "",
              "Assim como o `git clone` de verdade, já preparamos um repositório remoto para esta lição, e executar `git clone` vai baixá-lo para o seu repositório local. Daqui em diante, `o/main` no seu repositório local indica onde estava a branch `main` do remoto no momento em que você o clonou.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vamos começar devagar e apenas olhar como um repositório remoto se parece na nossa visualização antes de cloná-lo.",
              ""
            ],
            "afterMarkdowns": [
              "Aqui está ele! Agora você tem sua própria cópia local do projeto, clonada a partir do repositório remoto. Ele é muito parecido exceto por algumas mudanças visuais para tornar a distinção factível -- nas tarefas a seguir veremos como compartilhar trabalho entre esses repositórios."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nível, simplesmente execute o comando `git clone` no repositório remoto que preparamos para você. Você aprenderá algo de verdade somente nas próximas lições."
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
              "## Repositorios remotos en Git",
              "",
              "Os repositorios remotos non son complicados en git. Actualmente ca computación na nube, pódese pensar que hai moita maxia tras os repositorios remotos de git, pero para nada é así -- en verdade son copias do repositorio, pero noutra máquina. Ti podes comunicarte xeralmente con esa outra máquina por medio de internet, o que permite que mandes commits de un repositorio cara o outro.",
              "",
              "Dito isto, os repositorios remotos teñen propiedades interesantes:",
              "",
              "- Primeiro e antes de todo, os repositorios remotos serven como unha copia de seguranza! Os repositorios locais posúen a habilidade de restaurar un arquivo nun estado anterior (como xa sabes), pero toda á información está gardada. Tendo copias do repositorio noutras máquinas, incluso poderías perder tódolos datos da túa computadora, e comenzar a traballar no punto onde o deixaches no último commit.",
              "",
              "- Máis importante aún, ¡os repositorios remotos fan que o desenvolvemento sexa social! Agora que existe unha copia do teu código noutro lugar, os teus amigos poden contribuír no teu proxecto (ou obter os últimos cambios) dunha forma moi simple.",
              "",
              "Hai webs moi populares onde se pode ver a actividade dos repositorios (como [GitHub](https://github.com/)), pero estes recursos remotos _sempre_ axudan como mecanismo de base para esas ferramentas. ¡Entón é importante saber cómo funcionan!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## O noso comando para comezar a traballar con remotos",
              "",
              "Ata este punto, Learn Git Branching enfocouse en ensinar o básico respecto do traballo en repositorios _locais_ (branch, merge, rebase, etc). Entretanto, agora que queremos aprender como os repositorios remotos funcionan, precisamos dun comando para configurar o entorno para esas leccións. Este comando será `git clone`.",
              "",
              "Igual có `git clone` real, xa preparamos un repositorio remoto para esta lección, e executar `git clone` descargarao ao teu repositorio local. A partir de agora, `o/main` no teu repo local indica onde estaba a rama `main` do remoto no momento en que o clonaches.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Imos comenzar a modo, e só ollar cómo un repositorio remoto semellase á nosa visualización antes de clonalo.",
              ""
            ],
            "afterMarkdowns": [
              "¡Aquí o tes! Agora tes a túa propia copia local do proxecto, clonada dende o remoto. El é moi parecido exceto por algúns cambios visuais para ter a unha distinción visible -- nas tarefas a seguir veremos como compartir o traballo entre eses repositorios."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, escribe o comando `git clone` sobre o repositorio remoto que preparamos para ti. Aprenderás algo de verdade sóamente nas próximas leccións."
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
              "## Git Remotes",
              "",
              "remote (遠端) repository 並不會很難了解. 藉由現在的雲端運算，可以很輕易地了解到在 git remote 裡面有很多有趣的事情，但它們其實其實就只是你的或者是其它電腦上的 repository 的副本。你可以輕易地透過網路去發送你的 commit 給其它的電腦。",
              "",
              "也就是說，remote repository 有很多有趣的地方：",
              "",
              "- 第一，remote 是用來備份的! 本地端的 git 有能力可以回復文件到前一個狀態 (你知道的)，但是全部的資訊還是儲存在本地端。如果你在其它的電腦上面有你的 git repository 的副本，則你可以在資料不小心遺失的時候進行救援備份",
              "",
              "- 更重要的是, remote 讓大家一起來 coding！現在你的 project 放在 remote 上面，你的朋友可以很容易地對你的 project 做出貢獻（或者是 pull 你最後的修改） 。",
              "",
              "使用網站去對 remote repository 做視覺化非常流行（例如 [GitHub](https://github.com/) 或者是 [Phabricator](http://phabricator.org/)），但這背後最大的功臣是 remote repository，因此我們務必要了解它。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 我們用來開始使用 remote 的指令",
              "",
              "到目前為止，Learn Git Branching 著重在解釋本地端的工作（branching, merging, rebasing 以及其它指令）， 但是我們現在想要學習針對 remote 的指令，我們需要一個指令去建立環境，`git clone` 就是我們需要的指令",
              "",
              "就像真正的 `git clone` 一樣，我們已經為這堂課準備好了一個 remote repository，執行 `git clone` 就會把它下載到你的本地端 repository。從現在開始，你本地端的 `o/main` 代表你 clone 當下 remote 的 `main` 分支所在的位置。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們慢慢來，並且看看 remote repository 是長什麼樣子（在我們的視覺化圖形中），然後再 clone 它。",
              ""
            ],
            "afterMarkdowns": [
              "就是那樣！現在你有了一份自己的本地端專案副本，從 remote clone 而來。除了一些視覺上的改變之外，它們看起來很像，在之後的關卡中你就會看到我們如何分享我們的工作到這些 repository 上面。"
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這個關卡，只要對我們為你準備好的 remote repository 打 `git clone`，其它的學習會在後面的關卡中出現。"
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
              "## 远程仓库",
              "",
              "远程仓库并不复杂, 在如今的云计算盛行的世界很容易把远程仓库想象成一个富有魔力的东西, 但实际上它们只是你的仓库在另个一台计算机上的拷贝。你可以通过因特网与这台计算机通信 —— 也就是增加或是获取提交记录",
              "",
              "话虽如此, 远程仓库却有一系列强大的特性",
              "",
              "- 首先也是最重要的的点, 远程仓库是一个强大的备份。本地仓库也有恢复文件到指定版本的能力, 但所有的信息都是保存在本地的。有了远程仓库以后，即使丢失了本地所有数据, 你仍可以通过远程仓库拿回你丢失的数据。",
              "",
              "- 还有就是, 远程让代码社交化了! 既然你的项目被托管到别的地方了, 你的朋友可以更容易地为你的项目做贡献(或者拉取最新的变更)",
              "",
              "现在用网站来对远程仓库进行可视化操作变得越发流行了(像 [GitHub](https://github.com/)), 但远程仓库**永远**是这些工具的顶梁柱, 因此理解其概念非常的重要!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 我们用来开始使用远程仓库的命令",
              "",
              "直到现在, 教程都聚焦于**本地**仓库的操作（branch、merge、rebase 等等）。但我们现在需要学习远程仓库的操作 —— 我们需要一个配置这种环境的命令, 它就是 `git clone`。",
              "就像真正的 `git clone` 一样，我们已经为这节课准备好了一个远程仓库，执行 `git clone` 就会把它下载到你的本地仓库。从现在开始，你本地仓库中的 `o/main` 表示你 clone 那一刻远程 `main` 分支所在的位置。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "咱们慢慢来，先看看远程仓库（在图示中）的样子，然后再 clone 它。",
              ""
            ],
            "afterMarkdowns": [
              "就是它了! 现在你有了一份属于自己的本地项目副本，是从远程仓库 clone 来的。除了远程仓库使用虚线之外, 它们几乎没有什么差别 —— 在后面的关卡中, 你将会学习怎样在本地仓库和远程仓库间分享工作成果。"
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成本关, 对我们为你准备好的远程仓库执行 `git clone` 就可以了。后续的课程我们会正式地学习"
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
              "## Git Remotes",
              "",
              "Entfernte Repositorys sind nicht weiter kompliziert. In dieser Welt des Cloud Computings könnte man vielleicht glauben, dass hinter entfernten Git-Repositorys eine Menge Magie steckt, aber es sind einfach nur Kopien eines Repositorys auf einem anderen Rechner. Du kannst mit diesem Rechner typischerweise über das Internet kommunizieren, was es dir ermöglicht Commits hin und her zu schicken.",
              "",
              "Nichts desto weniger haben entfernte Repositorys eine Menge toller Eigenschaften:",
              "",
              "- Vor allem: Sie sind ein super Backup! Lokale Git-Repositorys können deine Arbeitskopie in jeden beliebigen früheren Zustand versetzen (wie du ja weißt), aber all diese Informationen liegen eben bei dir lokal. Wenn es Kopien von deinem Repository auf anderen Rechnern gibt, kannst du ruhig all deine Daten verlieren und trotzdem genau da weitermachen, wo du aufgehört hast.",
              "",
              "- Noch wichtiger: Remotes geben dem Entwickeln eine soziale Komponente! Wenn eine Kopie deines Projekts woanders liegt, können deine Freunde sehr einfach etwas zu dem Projekt beitragen (oder sich deine neuesten Änderungen holen).",
              "",
              "Websites, die die Aktivitäten um diese entfernten Repositorys darstellen (wie [GitHub](https://github.com/)) erfreuen sich zunehmender Beliebtheit. Aber entfernte Repositorys sind _immer_ das Rückgrat für diese Werkzeuge. Deshalb ist es wichtig, sie zu verstehen."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Der Befehl, um mit Remotes zu arbeiten",
              "",
              "Bis jetzt hat sich Learn Git Branching darauf konzentriert, die Grundlagen der _lokalen_ Arbeit mit Repositorys zu vermitteln (Branche anlegen, zusammenführen, Rebasen etc). Jetzt wollen wir allerdings lernen mit entfernten Repositorys zu arbeiten und brauchen für die Level eine entsprechende Umgebung. Die schaffen wir mit `git clone`.",
              "",
              "Genau wie das echte `git clone` haben wir für diese Lektion bereits ein entferntes Repository vorbereitet, und `git clone` auszuführen lädt es in dein lokales Repository herunter. Von hier an zeigt `o/main` in deinem lokalen Repository, wo sich der `main`-Branch des entfernten Repositorys zum Zeitpunkt des Klonens befand.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Fangen wir langsam an und schauen uns erst mal an, wie ein entferntes Repository in unserer Darstellung aussieht, bevor wir es klonen.",
              ""
            ],
            "afterMarkdowns": [
              "Da ist es! Jetzt hast du deine eigene lokale Kopie des Projekts, geklont vom entfernten Repository. Es sieht so aus wie das entfernte, nur mit ein paar Änderungen in der Darstellung -- in späteren Leveln wirst du sehen, wie man Änderungen zwischen den Repositorys austauschen kann."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um dieses Level abzuschließen, führ einfach `git clone` auf dem entfernten Repository aus, das wir für dich vorbereitet haben. Alles weitere kommt in den nächsten Leveln."
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
              "## Gitリモート",
              "",
              "リモートのリポジトリというのはそんなに複雑なものでもありません。クラウドコンピューティングが普及している現在の世界では、gitリモートの裏には何か不思議な仕組みが動いていると思いやすいのですが、実は別のコンピュータ上に保存されているあなたのリポジトリのコピーにすぎません。通常、インターネットを媒体に使って別のコンピュータと対話し、コミットを交互にやり取りすることができます。",
              "",
              "とはいえ、リモートリポジトリにはいくつかの素晴らしい特徴があります:",
              "",
              "- まず、リモートはバックアップの役割を果たします。ご存知の通り、ローカルのgitリポジトリは以前の状態にファイルを復帰する機能を持っているのですが、その情報はすべてローカルに保存されています。gitリポジトリを別のコンピュータにも保存することで、ローカルのデータがすべて失われたとしても、保存状態からコーディングを続けられます。",
              "",
              "- それよりも大切なこととして、リモートではコードをより一般的に公開できます！プロジェクトのコピーが別の場所に保存されているため、友達などが簡単にそのプロジェクトに参加したり最近の変更をpullしたりできます。",
              "",
              "最近ではリモートリポジトリに関するデータをビジュアル的に表示するウェブサイト([GitHub](https://github.com/)や[Phabricator](http://phabricator.org/)など)の使用が人気を集めていますが、リモートリポジトリは _そのいずれの_ ウェブサイトの裏にも使われています。なので理解する必要があります。"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## リモートで作業を始めるためのコマンド",
              "",
              "今までLearn Git Branchingでは _ローカル_ リポジトリの様々な作業（branch, merge, rebaseなど）に焦点を当ててきました。しかし、これからはリモートリポジトリの作業を学びますので、レッスンのために環境をセットアップする必要があります。そのコマンドは`git clone`になります。",
              "",
              "本物の `git clone` と同じように、このレッスン用にリモートリポジトリをあらかじめ用意してあります。`git clone` を実行すると、それがローカルリポジトリにダウンロードされます。これ以降、ローカルリポジトリの `o/main` は、クローンした時点でのリモートの `main` ブランチの位置を表します。",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "まずはゆっくりと、クローンする前にリモートリポジトリがビジュアライズでどう見えるか見てみましょう。",
              ""
            ],
            "afterMarkdowns": [
              "できました! これで、リモートからクローンした、あなた自身のローカルコピーができました。結構似ているのですが、その違いを明らかにするために少しだけビジュアルを工夫しました -- これからのレベルではこれらのリポジトリの間で作業をどう共有するか見ていきます。"
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルをクリアするには、私たちが用意したリモートリポジトリに対して `git clone` を実行するだけです。次のレッスンでより詳細に見ていきます。"
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
              "## Git Remotes",
              "",
              "Repozitoriile remote nu sunt chiar atât de complicate. In lumea de astazi a cloud-ului, e ușor să crezi ca exista multă magie in spatele remote-urilor git, dar ele sunt de fapt doar copii ale repozitoriului tău pe un alt calculator. De obicei poți comunica cu acest alt calculator prin intermediul internetului, ceea ce iți permite să transferi commit-uri in ambele sensuri.",
              "",
              "Asta fiind spus, repo-urile remote au o serie de proprietăți interesante:",
              "",
              "- In primul rand, remote-urile sunt un backup excelent! Repositoriile git locale au capacitatea de a restaura fișiere la o stare anterioară (așa cum știi), dar toate informațiile sunt stocate local. Având copii ale repositoriului tău git pe alte calculatoare, poți pierde toate datele locale și totuși să continui de unde ai rămas.",
              "",
              "- Mai important, remote-urile fac ca programarea să fie socială! Acum că o copie a proiectului tău este găzduită în altă parte, prietenii tăi pot contribui cu ușurință la proiectul tău (sau pot obține ultimele tale modificări).",
              "",
              "A devenit foarte popular să folosești site-uri care vizualizează activitatea din jurul repo-urilor remote (cum ar fi [GitHub](https://github.com/)), dar repo-urile remote _întotdeauna_ servesc ca baza pentru aceste instrumente. Așa că este important să le înțelegi!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Comanda noastră pentru a începe să lucrăm cu remote-uri",
              "",
              "Până acum, Learn Git Branching s-a concentrat pe învățarea elementelor de bază ale lucrului cu repo-uri _locale_ (branching, merging, rebasing etc). Cu toate acestea, acum că vrem să învățăm despre lucrul cu repo-uri remote, avem nevoie de o comandă pentru a configura mediul pentru aceste lecții. Această comandă va fi `git clone`.",
              "",
              "La fel ca `git clone`-ul real, am pregătit deja un repo remote pentru această lecție, iar rularea `git clone` îl va descărca în repo-ul tău local. De acum înainte, `o/main` din repo-ul tău local arată unde se afla branch-ul `main` al remote-ului în momentul în care l-ai clonat.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Să începem încet și să vedem cum arată un repo remote în vizualizarea noastră înainte să îl clonăm.",
              ""
            ],
            "afterMarkdowns": [
              "Iată-l! Acum ai propria ta copie locală a proiectului, clonată de pe remote. Arată foarte asemănător, cu câteva diferențe vizuale pentru a face distincția clară -- în nivelurile următoare vei vedea cum împărtășim munca între aceste repo-uri."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pentru a finaliza acest nivel, pur și simplu execută `git clone` pe repo-ul remote pe care l-am pregătit pentru tine. Învățarea adevărată va veni în lecțiile următoare."
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
              "## Git Remotes",
              "",
              "Отдалечените (remote) хранилища всъщност не са толкова сложни. В днешния свят на облачните технологии е лесно човек да си помисли, че зад Git remotes стои някаква магия, но те всъщност са просто копия на твоето хранилище, намиращи се на друг компютър. Обикновено комуникираш с този друг компютър през интернет, което ти позволява да изпращаш и получаваш комити.",
              "",
              "Казано това, отдалечените хранилища имат няколко страхотни предимства:",
              "",
              "- На първо място, remotes служат като отличен бекъп! Локалните Git хранилища могат да възстановяват файлове до предишно състояние (както вече знаеш), но цялата тази информация се пази локално. Ако имаш копия на хранилището си на други компютри, можеш да загубиш всички локални данни и въпреки това да продължиш от мястото, където си спрял.",
              "",
              "- Още по-важно — remotes правят програмирането социално! След като копие на проекта ти се намира някъде другаде, приятелите ти могат лесно да допринасят към него (или да изтеглят последните ти промени).",
              "",
              "Много популярно е използването на уебсайтове, които визуализират активността около отдалечени хранилища (като [GitHub](https://github.com/)), но отдалечените хранилища _винаги_ са основата, върху която стъпват тези инструменти. Затова е важно да ги разбираме!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Командата за да започнем работа с remote хранилища",
              "",
              "До този момент Learn Git Branching се фокусираше върху основите на работата с _локални_ хранилища (бранчове, merge, rebase и т.н.). Сега обаче ще започнем да учим как се работи с отдалечени хранилища, а за това ни е нужна команда, която да подготви средата. Тази команда е `git clone`.",
              "",
              "Точно като истинската `git clone`, вече сме подготвили отдалечено хранилище за този урок, а изпълнението на `git clone` ще го изтегли в локалното ти хранилище. Оттук нататък `o/main` в локалното ти хранилище показва къде е бил клонът `main` на отдалеченото хранилище в момента, в който си го клонирал.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Нека започнем бавно и просто да видим как изглежда едно отдалечено хранилище (в нашата визуализация), преди да го клонираме.",
              ""
            ],
            "afterMarkdowns": [
              "Ето го! Вече имаш своя локална копия на проекта, клонирана от отдалеченото хранилище. Изглежда почти същото, с някои визуални разлики, които да подчертаят разграничението — в следващите нива ще видиш как споделяме работа между тези хранилища."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "За да завършиш това ниво, просто изпълни `git clone` върху отдалеченото хранилище, което подготвихме за теб. Истинското учене предстои в следващите уроци."
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
              "## Удалённые репозитории в Git",
              "",
              "На самом деле удалённые репозитории в Git не так сложны, как кажутся на первый взгляд. Кажется, что в современном мире облачных вычислений под термином «удалённый репозиторий» подразумевается что-то сложное и загадочное. Однако, удалённые репозитории — это всего-навсего копии вашего репозитория, хранящиеся на другом компьютере. Обычно вы можете связываться с этим другим компьютером через Интернет, что позволяет вам передавать коммиты туда и сюда.",
              "",
              "Как уже было сказано, удалённые репозитории обладают рядом замечательных свойств:",
              "",
              "- В первую очередь, удалённые репозитории - это замечательное средство резервного копирования! Насколько вам известно, локальные репозитории способны восстанавливать файлы, используя предыдущие состояния, но вся эта информация хранится локально. Потеряв все свои локальные данные, вы способны восстановить их при наличии копии своего репозитория на другом компьютере.",
              "",
              "- Что ещё более важно, удалённые репозитории позволяют сделать процесс разработки более социальным! Теперь, когда копия вашего проекта размещена в другом месте, ваши друзья запросто могут внести свой вклад в ваш проект или забрать последние и актуальные изменения.",
              "",
              "Набирает популярность использование web-сайтов для визуализации активности удалённых репозиториев (например, [GitHub](https://github.com/)), однако удалённые репозитории _всегда_ выступают в качестве базы для таких инструментов. Поэтому так важно понимать, как устроены удалённые репозитории!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Наша команда для начала работы с удалённым репозиторием",
              "",
              "До настоящего момента мы были сфокусированы на изучении основ работы с _локальным_ репозиторием (ветвление, слияние, перемещение и т.д.). Однако теперь, когда мы хотим научиться работать с удалёнными репозиториями, нам нужны новые команды для настройки рабочей среды для этих упражнений. Такой командой нам послужит `git clone`",
              "",
              "Точно как настоящая `git clone`, мы уже подготовили удалённый репозиторий для этого урока, и выполнение `git clone` скачает его в ваш локальный репозиторий. С этого момента `o/main` в вашем локальном репозитории показывает, где находилась ветка `main` удалённого репозитория в момент клонирования.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте начнём постепенное изучение и взглянем на то, что собой представляет удалённый репозиторий (в нашем представлении), прежде чем мы его склонируем.",
              ""
            ],
            "afterMarkdowns": [
              "Вот так! Теперь у вас есть собственная локальная копия проекта, склонированная с удалённого репозитория. Выглядит всё довольно одинаковым за исключением некоторых визуальных различий - в последующих уровнях вы увидите, как мы разделяем работу по этим репозиториям."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы завершить уровень, просто выполните `git clone` для удалённого репозитория, который мы для вас подготовили. Настоящее обучение появится в последующих уроках."
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
              "## Git Remote(원격)",
              "",
              "원격 저장소라는 것이 사실 그다지 복잡한 개념은 아닙니다. 오늘날의 클라우드 컴퓨팅을 떠올리면 git remote의 이면에 수많은 마법이 부려지고 있을 것 같지만, 사실 git remote 또 하나의 컴퓨터에 있는 여러분의 저장소의 복사본일 뿐입니다. 여러분은 일반적으로 인터넷을 통해서 이 또 하나의 컴퓨터와 커밋을 주고받는 등의 대화를 할 수 있습니다.",
              "",
              "소개한 김에 자랑까지 하자면 원격 저장소는 수많은 장점이 있습니다:",
              "",
              "- 무엇보다 먼저, 원격 저장소는 백업으로서의 역할을 훌륭하게 수행합니다! 로컬 git 저장소는 파일들을 이전의 상태로 되돌리는 기능을 가지고 있습니다(아시다시피). 하지만 그 모든 정보가 로컬(내 PC)에 저장되어 있습니다. 여러분의 git 저장소를 다른 컴퓨터가 복사본으로 가지고 있으면 로컬 데이터를 다 잃더라도 다른 컴퓨터에 남아있는 복사본으로 다시 출발 할 수 있습니다.",
              "",
              "- 더 중요한 것은, 원격 저장소를 통해 코딩을 다른 사람들과 함께 할 수 있다는 것입니다. 여러분의 프로젝트의 복사본이 어느 곳에선가 호스트되기 때문에 여러분의 친구가 프로젝트에 아주 쉽게 기여할 수 있게 됩니다(최근의 변화를 pull하거나).",
              "",
              "원격 저장소에서의 활동을 시각화해주는 웹 사이트들을 사용하는 것이 추세입니다. ([GitHub](https://github.com/) 또는 [Phabricator](http://phabricator.org/)등이 있습니다). 원격 저장소가 _항상_ 이러한 도구들의 중심 뼈대를 이루고 있습니다. 그래서 잘 아는 것이 중요해요!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 원격 저장소 작업을 시작하는 명령어",
              "",
              "지금까지, Git 브랜치 배우기는 _로컬_ 저장소가 어떻게 활용되는지에 대해 중점적으로 소개해 왔습니다(브랜치, 합병, 리베이스 등등). 이제 원격 저장소를 어떻게 활용하는지에 대해 배워보려고 합니다. 앞으로 이어질 레슨의 환경을 마련할 명령어가 필요합니다. `git clone`이 바로 그 명령어입니다.",
              "",
              "실제 `git clone`과 마찬가지로, 이번 레슨을 위해 원격 저장소를 이미 준비해 두었습니다. `git clone`을 실행하면 그것을 로컬 저장소로 내려받게 됩니다. 이제부터 로컬 저장소의 `o/main`은 clone한 시점에 원격의 `main` 브랜치가 어디에 있었는지를 나타냅니다.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "천천히 시작해봅시다. clone하기 전에 일단 원격저장소가 우리 시각화 자료에서 어떻게 보이는지부터 봅시다.",
              ""
            ],
            "afterMarkdowns": [
              "자! 이제 원격 저장소에서 clone한, 여러분만의 로컬 복사본을 가지게 되었습니다. 구분을 하기위해 조금 모양이 다른것 말고는 둘이 똑같게 생긴걸 알 수 있습니다 -- 뒤의 레벨에서는 우리가 이 저장소들 사이에서 어떻게 작업을 공유하는지 알아보겠습니다."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이 레벨을 통과하기 위해서, 저희가 준비해 둔 원격 저장소에 `git clone`을 입력하세요. 뒤의 레슨에서 더많은 것들을 배워볼 것입니다."
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
              "## Віддалені репозиторії",
              "",
              "Віддалені репозиторії не є дуже складними. В сучасному світі, де на кожному кроці можна зустріти \"хмарні обчислення\", може видатися, що концепція віддалених репозиторіїв є дуже складною, але насправді вони -- просто звичайні копії Вашого репозиторію на віддаленому комп’ютері. Зазвичай з цим віддаленим комп’ютером можна зв’язатися через інтернет, що дозволяє обмінюватись комітами.",
              "",
              "Приймаючи до уваги все сказане вище, віддалені репозиторії мають купу чудових властивостей:",
              "",
              "- В першу чергу, віддалені сервери -- це завжди чудова резервна копія! Локальний репозиторій дає можливість відкотитися до попереднього стану, але вся інформація зберігається локально. Маючи копії свого репозиторію на віддалених машинах, Ви можете пережити втрату жорсткого диску чи пошкодження даних і продовжити працювати з того місця, на якому закінчили.",
              "",
              "- Що не менш важливо, віддалені репозиторії роблять програмування соціальним! Коли копія Вашого проекту розміщена в мережі, Ваші друзі мають змогу допомогти Вашому проекту (чи стягнути останні зміни) без зайвих зусиль.",
              "",
              "Стало дуже популярним користуватися веб-сайтами, що візуалізують активність на віддалених репозиторіях (наприклад [GitHub](https://github.com/)), але віддалені репозиторії _завжди_ слугують як основа цих сервісів. Тому важливо розуміти їх!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Команда, з якою починаємо роботу з віддаленими репозиторіями",
              "",
              "До цього моменту, Learn Git Branching концентрувало увагу на основах роботи з _локальним_ репозиторієм (гілкування, злиття гілок, ребейс, тощо). Однак тепер, коли ми вчимо віддалені репозиторії, нам потрібно налаштувати середовище для подальших уроків. `git clone` впорається з цим завданням.",
              "",
              "Так само як справжня `git clone`, ми вже підготували віддалений репозиторій для цього уроку, і виконання `git clone` завантажить його у ваш локальний репозиторій. Відтепер `o/main` у вашому локальному репозиторії показує, де була гілка `main` віддаленого репозиторію на момент клонування.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Низький старт - просто подивімося, як віддалений репозиторій виглядає (в нашій візуалізації), перш ніж ми його клонуємо.",
              ""
            ],
            "afterMarkdowns": [
              "Ось і все! Тепер у вас є власна локальна копія проекту, склонована з віддаленого репозиторію. Він виглядає досить схоже, хіба що деякі візуальні елементи інші, щоб краще показати різницю -- в наступних рівнях Ви навчитеся ділитися роботою між цими репозиторіями."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти цей рівень, просто зробіть `git clone` віддаленого репозиторію, який ми підготували для вас. Справжні знання Ви отримаєте в подальших рівнях."
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
              "## Git Remotes (Kho lưu trữ từ xa)",
              "",
              "Thực ra thì kho chứa từ xa cũng không khó hiểu lắm đâu. Giờ đây, đâu đâu cũng thấy điện toán đám mây nên ai ai cũng tưởng git remote nó là cái gì đó ma thuật lắm, nhưng chúng thực ra chỉ là những bản sao chép kho chứa của bạn lên máy tính khác. Bạn có thể giao tiếp với chúng qua internet, từ đó mà chuyển giao commit qua lại.",
              "",
              "Vì lẽ đó mà kho chứa từ xa có những đặc tính tuyệt vời:",
              "",
              "- Trước hết, có tác dụng như là bản sao dự phòng! Bạn đã biết rằng kho cục bộ có thể khôi phục trở lại trạng thái trước đó, nhưng tất cả thông tin đó chỉ được lưu trữ cục bộ. Bằng cách sao chép toàn bộ kho chứa của bạn lên máy tính ở xa, một khi dữ liệu trong máy tính bị mất, bạn vẫn có thể tiếp tục làm việc như chưa có gì xảy ra.",
              "",
              "- Quan trọng hơn nữa, kho chứa từ xa khiến lập trình có tính cộng đồng hơn! Bây giờ bản sao dự án của bạn đã được lưu trữ ở nơi khác, bạn bè của bạn có thể đóng góp (hoặc kéo về cập nhật mới nhất) dự án của bạn rất dễ dàng.",
              "",
              "Trực quan hóa các kho lưu trữ từ xa bằng cách sử dụng các trang web đang trở nên phổ biến hơn (như [GitHub](https://github.com/)), nhưng các kho lưu trữ từ xa _luôn luôn_ là trụ cột của các công cụ này, vì vậy điều quan trọng là phải hiểu khái niệm này!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Câu lệnh của chúng tôi để bắt đầu làm việc với kho lưu trữ từ xa",
              "",
              "Cho đến bây giờ, Học Nhánh Git đã tập trung dạy về làm việc trên kho chứa _cục bộ_ (rẽ nhánh `branch`, hợp nhánh `merge`, dịch chuyển nhánh `rebase`,...). Nhưng bây giờ ta lại muốn học về làm việc trên kho lưu trữ từ xa, ta cần một câu lệnh để cài đặt môi trường cho những bài học này. Đó là `git clone`.",
              "",
              "Giống như `git clone` thật, chúng tôi đã chuẩn bị sẵn một kho lưu trữ từ xa cho bài học này, và chạy `git clone` sẽ tải nó về kho chứa cục bộ của bạn. Từ đây trở đi, `o/main` trong kho chứa cục bộ của bạn cho biết nhánh `main` của kho từ xa nằm ở đâu vào thời điểm bạn clone nó.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Nào cùng khởi động bằng cách nhìn xem kho lưu trữ từ xa trông như thế nào (trong mô tả của chúng tôi) trước khi ta clone nó.",
              ""
            ],
            "afterMarkdowns": [
              "Nó đây rồi! Giờ bạn đã có bản sao cục bộ của riêng mình, được clone từ kho từ xa. Nhìn nó cũng khá tương tự chỉ là được minh họa khác biệt một chút -- đến các cấp độ sau ta sẽ tìm hiểu thêm về cách thức trao đổi nội dung giữa các kho chứa này."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Để hoàn thành cấp độ này chỉ cần đơn giản gõ lệnh `git clone` để sao chép kho lưu trữ từ xa mà chúng tôi đã chuẩn bị cho bạn. Ta sẽ học sâu hơn ở các bài học sau."
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
              "## Oddaljeni Git",
              "",
              "Oddaljeno repozitoriji sploh niso tako zakomplicirani. V današnjem svetu oblačnih storitev si lahko kdo predstavlja, da je veliko čarovnije za oddaljnim Gitom, a gre preprosto za tvoj repozitorij na drugem računalniku. Ponavadi lahko komuniciraš s tem računalnikom preko interneta, ki ti omogoča da prenašaš commite naprej in nazaj.",
              "",
              "Poleg tega imajo oddaljeni repozitoriji tudi veliko super lastnosti:",
              "",
              "- Prvič, oddaljenost služi za odlično rezervo! Lokalni git repozitoriji imajo možnost obnovitve datotek v prejšnje stanje (kot že veš), ampak vse te informacije so shranjene lokalno. S tem da imaš shranjene kopije gita na drugih računalnikih, lahko izgubiš vse tvoje lokalne podatke, pa imaš še zmeraj opcijo nadaljevati, kjer si ostal.",
              "",
              "- Še pomembneje, kodiranje lahko naredijo družabno! Sedaj, ko je kopija tvojega projekta nekje objavljena, lahko tvoji prijatelji pomagajo tvojemu projektu (ali pridobijo zadnje spremembe) zelo enostavno.",
              "",
              "Uporaba strani, ki vizualizirajo oddaljene repozitorije je postala zelo popularna (npr. [GitHub](https://github.com/)), ampak bistvo teh strani vseeno predstavljajo oddaljeni repozitoriji. Zato je pomembno, da jih razumemo!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Naš ukaz za začetek dela z oddaljenimi repozitoriji",
              "",
              "Do te točke, se je Learn Git Branching osredotočil na učenje osnov dela na lokalnih repozitorijih (branching, merging, rebasing, itd). Ampak sedaj, ko se hočemo naučiti še o delu na oddaljenih repozitorijih, potrebujemo ukaz, da postavi okolje za te lekcije. `git clone` bo ta ukaz.",
              "",
              "Tako kot pravi `git clone`, smo za to lekcijo že pripravili oddaljen repozitorij, izvedba `git clone` pa ga bo prenesla v tvoj lokalni repozitorij. Od tu naprej `o/main` v tvojem lokalnem repozitoriju kaže, kje je bila veja `main` oddaljenega repozitorija v trenutku, ko si ga kloniral.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Začnimo počasi in poglejmo, kako izgleda oddaljen repozitorij (v naši vizualizaciji), preden ga kloniramo.",
              ""
            ],
            "afterMarkdowns": [
              "Evo ga! Zdaj imaš svojo lokalno kopijo projekta, klonirano iz oddaljenega repozitorija. Izgleda precej podoben razen nekaj vizualnih sprememb, da se opazi razlika -- v kasnejših stopnjah boš spoznal, kako si delimo delo preko teh repozitorijev."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Za dokončanje te stopnje, uporabi `git clone` na oddaljenem repozitoriju, ki smo ga pripravili zate. Pravo učenje pride v lekcijah, ki sledijo."
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
              "## Zdalny Git",
              "",
              "Zdalne repozytoria nie są w rzeczywistości bardzo skomplikowane. W dzisiejszym, działającym w chmurze, świecie łatwo jest uznać, że za zdalnym Gitem kryje jakaś wielka magia, ale w rzeczywistości są to tylko kopie twojego repozytorium na innym komputerze. Zazwyczaj możesz połączyć się z nim przez internet, co umożliwia przesyłanie commitów tam i z powrotem. ",
              "",
              "Ale oczywiście zdalne repozytoria mają kilka świetnych właściwości:",
              "",
              "- Przede wszystkim zdalne repozytoria służą jako świetna kopia zapasowa! Lokalne repozytoria Git (jak już wiesz) mają możliwość przywracania plików do poprzedniego stanu, ale wszystkie te informacje są przechowywane lokalnie. Mając kopie repozytorium Git na innych komputerach, nawet jeśli stracisz wszystkie swoje dane lokalne, i tak możesz kontynuować pracę od tego samego miejsca.",
              "",
              "- Co ważniejsze, zdalne repozytoria sprawiają, że kodowanie jest społeczne! Teraz, gdy kopia twojego projektu jest umieszczona gdzie indziej, twoi znajomi mogą bardzo łatwo wnieść swój wkład do twojego projektu (lub pobrać najnowsze zmiany).",
              "",
              "Bardzo popularne stało się korzystanie ze stron internetowych, które wizualizują aktywność w zdalnych repozytoriach (takich jak [GitHub](https://github.com/)), ale podstawą tych narzędzi _zawsze_ są zdalne repozytoria. Dlatego ważne jest, aby je zrozumieć!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Nasze polecenie do rozpoczęcia pracy ze zdalnymi repozytoriami",
              "",
              "Do tego momentu kurs Learn Git Branching skupiał się na nauczaniu podstaw pracy z repozytoriami _lokalnymi_ (branch, merge, rebase itp.). Jednak teraz, gdy chcemy dowiedzieć się więcej o pracy ze zdalnym repozytorium, potrzebujemy polecenia, aby skonfigurować środowisko tych lekcji. Tym poleceniem będzie `git clone`.",
              "",
              "Podobnie jak prawdziwe `git clone`, przygotowaliśmy już zdalne repozytorium na potrzeby tej lekcji, a uruchomienie `git clone` pobierze je do twojego lokalnego repozytorium. Od tego momentu `o/main` w twoim lokalnym repozytorium wskazuje, gdzie znajdowała się gałąź `main` zdalnego repozytorium w chwili sklonowania.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Zacznijmy powoli i spójrzmy tylko, jak wygląda zdalne repozytorium (w naszej wizualizacji), zanim je sklonujemy.",
              ""
            ],
            "afterMarkdowns": [
              "No i jest! Teraz masz własną lokalną kopię projektu, sklonowaną ze zdalnego repozytorium. Wygląda dość podobnie, z wyjątkiem pewnych wizualnych zmian pomagających odróżnić je od zdalnego -- na kolejnych poziomach zobaczysz, jak udostępniamy pracę w tych repozytoriach."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Aby ukończyć ten poziom, po prostu wpisz `git clone` na zdalnym repozytorium, które dla ciebie przygotowaliśmy. Czas na prawdziwą naukę przyjdzie w kolejnych lekcjach."
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
              "## Git Remoto",
              "",
              "I repository remoti non sono così tanto complicati. Nell'odierno mondo del cloud computing è facile pensare che vi sia una sorta di magia dietro i remote di git, ma in effetti sono solo copie del tuo repository in un altro computer. Puoi comunicare con quest'altro computer tramite Internet, consentendoti di trasferire commit dall'uno all'altro.",
              "",
              "Detto ciò, i repository remoti hanno diverse proprietà interessanti:",
              "",
              "- Prima di tutto, un repository remoto può servire come backup! Con i repository git locali si possono riportare file ad uno stato precedente (come sai), ma tutte le informazioni sono memorizzate localmente. Avendo copie del tuo repository git in altri computer, tu potresti perdere tutti i tuoi dati locali e riprenderli da dove avevi interrotto.",
              "",
              "- Seconda cosa, ancora più importante, l'utilizzo di repository remoti introduce al coding sociale! Ora che una copia del tuo progetto è ospitata anche altrove, i tuoi amici possono contribuire al tuo progetto molto agevolmente (o recuperare le tue ultime modifiche) .",
              "",
              "E' diventato molto popolare l'utilizzo di siti web che mostrano le attività di repository remoti (come [GitHub](https://github.com/)), ma questi repository _sempre_ rappresentano la base sottostante per questi strumenti. Per cui è importante conoscerli a fondo!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Il nostro comando per iniziare a lavorare con i repository remoti",
              "",
              "Finora, Learn Git Branching si è focalizzato nell'insegnare le basi del lavoro _locale_ sui repository (creazione di rami, fusione, rebasing, etc). Tuttavia, ora che vogliamo esplorare il lavoro con i repository remoti, abbiamo bisogno di un comando per impostare l'ambiente per tali lezioni. Questo comando sarà `git clone`.",
              "",
              "Proprio come il vero `git clone`, abbiamo già preparato un repository remoto per questa lezione, ed eseguire `git clone` lo scaricherà nel tuo repository locale. Da qui in poi, `o/main` nel tuo repository locale indica dove si trovava il branch `main` del repository remoto nel momento in cui l'hai clonato.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Partendo lentamente, esaminiamo come un repository remoto appare nella nostra visualizzazione prima di clonarlo.",
              ""
            ],
            "afterMarkdowns": [
              "Eccolo! Ora hai la tua copia locale del progetto, clonata dal repository remoto. Appare molto simile eccetto per qualche modifica nella visualizzazione per far notare la distinzione -- nei successivi livelli vedrai come condividere il lavoro tra questi repository."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Per completare questo livello, semplicemente esegui `git clone` sul repository remoto che abbiamo preparato per te. Il succo dell'apprendimento avverrà nelle prossime lezioni."
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
              "## Git Uzak Depoları",
              "",
              "Uzak depolar aslında o kadar karmaşık değildir. Günümüz bulut bilişim dünyasında, uzak depoların arkasında bir sürü sihir olduğunu düşünmek kolay olabilir, ancak aslında bunlar sadece başka bir bilgisayardaki depo kopyalarınızdır. Genellikle bu başka bilgisayarlarla internet üzerinden iletişim kurabilirsiniz, bu da size değişiklikleri karşılıklı olarak aktarmayı sağlar.",
              "",
              "Bununla birlikte, uzak depoların bir dizi harika özelliği vardır:",
              "",
              "- İlk ve en önemli olarak, uzak depolar mükemmel bir yedekleme işlevi görür! Yerel git depoları, dosyaları önceki bir duruma geri yükleyebilme yeteneğine sahiptir (bildiğiniz gibi), ancak tüm bu bilgiler yerel olarak depolanır. Git deponuzun kopyalarını diğer bilgisayarlarda bulundurmak, tüm yerel verilerinizi kaybetseniz bile kaldığınız yerden devam etmenizi sağlar.",
              "",
              "- Daha da önemlisi, uzak depolar kodlamayı sosyal hale getirir! Projenizin bir kopyası başka bir yerde barındırıldığında, arkadaşlarınız çok kolay bir şekilde projenize katkıda bulunabilir (ya da son değişikliklerinizi çekebilir).",
              "",
              "Uzak depolar etrafındaki etkinlikleri görselleştiren web siteleri kullanmak çok popüler hale geldi (örneğin [GitHub](https://github.com/)), ancak uzak depolar _her zaman_ bu araçların temel altyapısını oluşturur. Bu yüzden onları anlamak önemlidir!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Uzak Depolarla Çalışmaya Başlamak için Komutumuz",
              "",
              "Şu ana kadar, Learn Git Branching yerel depo çalışmalarının (dallama, birleştirme, yeniden tabanlama, vb.) temellerini öğretmeye odaklanmıştı. Ancak şimdi uzak depo çalışmalarını öğrenmek istediğimiz için, bu dersler için ortamı kuracak bir komuta ihtiyacımız var. `git clone` bu komut olacak.",
              "",
              "Gerçek `git clone` gibi, bu ders için bir uzak depo hazırladık ve `git clone` komutunu çalıştırmak onu yerel deponuza indirecek. Bundan sonra, yerel deponuzdaki `o/main`, klonladığınız andaki uzak deponun `main` dalının nerede olduğunu gösterir.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hadi yavaşça başlayalım ve klonlamadan önce bir uzak deponun neye benzediğine bakalım (görselleştirmemizde).",
              ""
            ],
            "afterMarkdowns": [
              "İşte bu! Şimdi uzak depodan klonlanmış kendi yerel kopyanıza sahipsiniz. Görünüşü oldukça benzer, ancak ayırt edici bir fark yaratmak için bazı görsel değişiklikler yapıldı -- sonraki seviyelerde bu depolar arasında çalışmayı nasıl paylaştığımızı göreceksiniz."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Bu seviyeyi bitirmek için, sizin için hazırladığımız uzak depoyu sadece `git clone` komutuyla klonlayın. Gerçek öğrenme sonraki derslerde olacak."
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
              "## Git Remotes",
              "",
              "A távoli repók valójában nem olyan bonyolultak. A mai felhőalapú számítástechnika világában könnyű azt hinni, hogy a git remotes mögött sok varázslat rejlik, de valójában csak a repód másolatai egy másik számítógépen. Általában az interneten keresztül kommunikálhatsz ezzel a másik számítógéppel, ami lehetővé teszi, hogy commitokat küldj és fogadj.",
              "",
              "Ezzel együtt a távoli repóknak számos nagyszerű tulajdonsága van:",
              "",
              "- Mindenekelőtt a remote-ok kiváló biztonsági mentésként szolgálnak! A helyi git repóknak lehetőségük van visszaállítani a fájlokat egy korábbi állapotba (mint tudod), de az összes információ helyileg van tárolva. Azzal, hogy a git repód másolatait más számítógépeken tárolod, elveszítheted az összes helyi adatot, és mégis ott folytathatod, ahol abbahagytad.",
              "",
              "- Ami még fontosabb, a remote-ok szociálissá teszik a kódolást! Most, hogy a projekted egy másolata máshol van tárolva, a barátaid nagyon könnyen hozzájárulhatnak a projektedhez (vagy letölthetik a legújabb változtatásaidat).",
              "",
              "Nagyon népszerűvé vált a távoli repók körüli tevékenységet vizualizáló webhelyek használata (mint a [GitHub](https://github.com/)), de a távoli repók _mindig_ az alapját képezik ezeknek az eszközöknek. Ezért fontos megérteni őket!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## A parancsunk, amivel elkezdünk dolgozni a remote-okkal",
              "",
              "Eddig a Learn Git Branching a _helyi_ repó munkájának alapjaira összpontosított (elágazás, merge, rebase, stb.). Most azonban, hogy a távoli repókkal való munkát szeretnénk megtanulni, szükségünk van egy parancsra ezeknek a leckéknek a környezetének beállításához. A `git clone` lesz ez a parancs.",
              "",
              "Csakúgy, mint a valódi `git clone`, mi már előkészítettünk egy távoli repót ehhez a leckéhez, és a `git clone` futtatása letölti azt a helyi repódba. Innentől kezdve a helyi repódban az `o/main` azt mutatja, hol volt a távoli repó `main` branch-e a klónozás pillanatában.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Kezdjük lassan, és nézzük meg, hogyan néz ki egy távoli repó (a vizualizációnkban), mielőtt klónoznánk.",
              ""
            ],
            "afterMarkdowns": [
              "Tessék! Most már megvan a saját helyi másolatod a projektről, amit a távoli repóból klónoztál. Meglehetősen hasonlóan néz ki, kivéve néhány vizuális változást a különbség egyértelművé tételéhez -- a következő szinteken látni fogod, hogyan osztjuk meg a munkát ezek között a repók között."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "A szint befejezéséhez egyszerűen klónozd a `git clone` paranccsal azt a távoli repót, amit neked készítettünk elő. A valódi tanulás a következő leckékben lesz."
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
              "## Git Remote-ları",
              "",
              "Remote repozitoriyalar əslində o qədər də mürəkkəb deyil. Bulud hesablamalarının hökm sürdüyü bugünkü dünyada git remote-larının arxasında çoxlu sehr olduğunu düşünmək asandır, amma əslində onlar sadəcə repozitoriyanın başqa bir kompüterdəki nüsxələridir. Adətən bu kompüterlə İnternet vasitəsilə əlaqə saxlaya bilirsən ki, bu da commit-ləri qarşılıqlı şəkildə ötürməyə imkan verir.",
              "",
              "Bununla belə, remote repozitoriyaların bir sıra əla xüsusiyyəti var:",
              "",
              "- Hər şeydən əvvəl, remote-lar əla ehtiyat nüsxə rolunu oynayır! Lokal git repozitoriyaları faylları əvvəlki vəziyyətə qaytara bilir (bildiyin kimi), amma bütün bu məlumat lokal olaraq saxlanılır. Git repozitoriyanın nüsxələrini başqa kompüterlərdə saxlamaqla, bütün lokal məlumatlarını itirsən belə, qaldığın yerdən davam edə bilərsən.",
              "",
              "- Daha da vacibi, remote-lar kod yazmağı sosial edir! İndi ki layihənin bir nüsxəsi başqa yerdə saxlanılır, dostların layihənə çox rahat töhfə verə (və ya sənin son dəyişikliklərini çəkə) bilər.",
              "",
              "Remote repozitoriyalar ətrafındakı fəaliyyəti vizuallaşdıran veb saytlardan (məsələn, [GitHub](https://github.com/)) istifadə etmək çox populyarlaşıb, amma remote repozitoriyalar _həmişə_ bu alətlərin təməl dayağı olaraq qalır. Ona görə də onları anlamaq vacibdir!"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Remote-larla işləməyə başlamaq üçün əmrimiz",
              "",
              "İndiyə qədər Learn Git Branching əsasən _lokal_ repozitoriya işinin əsaslarını (branch yaratmaq, merge, rebase və s.) öyrətməyə yönəlmişdi. Ancaq indi remote repozitoriya işini öyrənmək istədiyimiz üçün, həmin dərslər üçün mühiti quracaq bir əmrə ehtiyacımız var. Həmin əmr `git clone` olacaq.",
              "",
              "Əsl `git clone` kimi, biz bu dərs üçün artıq bir remote repozitoriya hazırlamışıq və `git clone` işlətmək onu sənin lokal repozitoriyana endirəcək. Bundan sonra, lokal repozitoriyandakı `o/main` sənin clone etdiyin andaki remote-un `main` filialının harada olduğunu göstərir.",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Gəl yavaş başlayaq və clone etməzdən əvvəl sadəcə bir remote repozitoriyanın necə göründüyünə baxaq (bizim vizuallaşdırmada).",
              ""
            ],
            "afterMarkdowns": [
              "Budur! İndi remote-dan clone edilmiş öz lokal nüsxən var. Görünüşü olduqca oxşardır, sadəcə fərqi aydın göstərmək üçün bəzi vizual dəyişikliklər var -- sonrakı bölümlərdə bu repozitoriyalar arasında işi necə paylaşdığımızı görəcəksən."
            ],
            "command": "git clone",
            "beforeTree": CLONE_START_TREE
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Bu bölümü bitirmək üçün sadəcə sənin üçün hazırladığımız remote repozitoriyanı `git clone` et. Əsl öyrənmə növbəti dərslərdə olacaq."
            ]
          }
        }
      ]
    }
  }
};