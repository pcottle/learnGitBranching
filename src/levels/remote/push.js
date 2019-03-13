exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C3\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C3\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git commit;git commit;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\"},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"tags\":{},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"tags\":{},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Git Pushin'",
    "zh_CN": "Git Push",
    "zh_TW": "git push",
    "es_AR": "git push",
    "pt_BR": "Git Push",
    "gl"   : "Git Push",
    "de_DE": "Git Push",
    "ja"   : "Git Push",
    "fr_FR": "Git push",
    "ru_RU": "Git push",
    "uk"   : "Git push",
    "ko"   : "Git push"
  },
  "hint": {
    "en_US": "Remember you have to clone before you can push!",
    "zh_CN": "推送之前需要先克隆",
    "zh_TW": "push 之前你需要先 clone",
    "es_AR": "¡Acordate que tenés que clonar antes de pushear!",
    "pt_BR": "Lembre-se de clonar antes de fazer o push!",
    "de_DE": "Denk dran, dass du einen Clone brauchst bevor du Pushen kannst!",
    "ja"   : "Pushができるようになるには、まずリポジトリをcloneする必要があるのをお忘れなく",
    "fr_FR": "Rappelez-vous que vous devez cloner avant de pouvoir faire un push !",
    "ru_RU": "Помните, что прежде чем push-ить вам нужно склонировать репозиторий!",
    "uk"   : "Пам’ятай, що перед тим як щось push-нути потрібно склонувати репозиторій!",
    "ko"   : "push를 하기전에 clone을 먼저해야 된다는것을 기억하세요!"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Push",
              "",
              "Ok, so I've fetched changes from remote and incorporated them into my work locally. That's great and all... but how do I share _my_ awesome work with everyone else?",
              "",
              "Well, the way to upload shared work is the opposite of downloading shared work. And what's the opposite of `git pull`? `git push`!",
              "",
              "`git push` is responsible for uploading _your_ changes to a specified remote and updating that remote to incorporate your new commits. Once `git push` completes, all your friends can then download  your work from the remote.",
              "",
              "You can think of `git push` as a command to \"publish\" your work. It has a bunch of subtleties that we will get into shortly, but let's start with baby steps...",
              "",
              "*note -- the behavior of `git push` with no arguments varies depending on one of git's settings called `push.default`. The default value for this setting depends on the version of git you're using, but we are going to use the `upstream` value in our lessons. This isn't a huge deal, but it's worth checking your settings before pushing in your own projects.*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here we have some changes that the remote does not have. Let's upload them!"
            ],
            "afterMarkdowns": [
              "There we go -- the remote received commit `C2`, the branch `master` on the remote was updated to point at `C2`, and our *own* reflection of the remote (`o/master`) was updated as well. Everything is in sync!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To finish this level, simply share two new commits with the remote. Strap in though, because these lessons are about to get a lot harder!"
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
              "## Git Push",
              "",
              "Ok, donc j'ai rapatrié les changements du dépôt distant et je les ai incorporés dans mon travail local. C'est super... mais comment je partage _mon_ travail génial avec tous les autres ?",
              "",
              "En fait, la manière d'envoyer du travail à partager fonctionne à l'opposé du téléchargement de travail partagé. Et quel est l'opposé de `git pull` (tire) ? `git push` (pousse) !",
              "",
              "`git push` est responsable de l'envoi de _vos_ changements vers un dépôt distant et de la mise à jour de ce dépôt pour incorporer vos commits. Une fois `git push` terminé, tous vos amis peuvent télécharger votre travail depuis le dépôt distant.",
              "",
              "Vous pouvez voir `git push` comme une commande qui \"publie\" votre travail. Elle présente quelques subtilités que nous allons voir rapidement, mais commençons par le B.A.-BA...",
              "",
              "*Note : le comportement de `git push` avec aucun argument varie avec l'un des réglages de configuration de git nommé `push.default`. La valeur par défaut de ce réglage dépend de la version de git utilisée, mais nous allons utiliser la valeur `upstream` dans nos leçons. Cela ne change pas grand chose pour ces exercices, mais vérifiez tout de même vos réglages avant de pusher vos propres projets.*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Nous avons fait ici quelques changements que le dépôt distant n'a pas. Envoyons-les !"
            ],
            "afterMarkdowns": [
              "Et voilà : le dépôt distant a reçu le commit `C2`, la branche `master` a été mise à jour sur `C2`, et votre *propre* représentation de la branche distante (`o/master`) a aussi été mise à jour. Tout est synchronisé !"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour finir ce niveau, partagez simplement deux nouveaux commits avec le dépôt distant. Accrochez-vous, parce que ces leçons vont devenir beaucoup plus difficiles !"
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
              "## git push",
              "",
              "Ok, entonces ya bajé los cambios de un repositorio remoto y los integré en mi trabajo localmente. Esto es genial y todo... pero ¿cómo comparto _mis_ cambios con el resto?",
              "",
              "Bueno, la forma de subir el trabajo compartido es la opuesta a cómo descargar trabajo. Y ¿qué es lo opuesto a `git pull`? ¡`git push`!",
              "",
              "`git push` es el responsable de subir _tus_ cambios a un remoto específico y de actualizar ese remoto para incluir tus nuevos commits. Cuando `git push` termina, todos tus amigos pueden descargar tu trabajo del remoto.",
              "",
              "Podés pensar en `git push` como un comando para \"publicar\" tu trabajo. Tiene un par de sutilezas con las que vamos a meternos pronto, pero empecemos de a poco."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Acá tenemos algunos cambios que nuestro remoto no tiene. ¡Subámoslos!"
            ],
            "afterMarkdowns": [
              "Ahí está: el remoto recibió el commit `C2`, la rama `master` de ese remoto se actualizó para apuntar a `C2`, y nuestro *propio* reflejo del remoto (`o/master`) también fue actualizado. ¡Todo está en sincronía!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, simplemente compartí dos nuevos commits con el remoto. Igual, no te confíes, ¡ya se van a complicar las lecciones!"
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
              "## Git Push",
              "",
              "Ok, então vimos como baixar mudanças do repositório remoto e incorporá-las à árvore local. Isso é ótimo e tal... mas como eu faço para compartilhar o _meu_ trabalho sensacional com as outras pessoas?",
              "",
              "Bem, a forma de subir trabalho a ser compartilhado é a oposta daquela de baixar trabalho que foi compartilhado. E qual o oposto de `git pull` (puxar)? É `git push` (empurrar)!",
              "",
              "O `git push` é responsável por subir as _suas_ mudanças para um repositório remoto especificado, e atualizar esse remoto para incorporar seus novos commits. Uma vez que o `git push` se completa, todos os seus amigos podem baixar o seu trabalho do repositório remoto.",
              "",
              "Você pode pensar no `git push` como um comando para \"publicar\" o seu trabalho. Ele tem uma série de nuances que vamos abordar em breve, mas comecemos com passos curtos...",
              "",
              "*Nota -- o comportamento de `git push` sem argumentos varia dependendo da configuração `push.default` do Git. O valor padrão para essa configuração depende da versão do Git que você estiver usando, mas vamos assumir o valor `upstream` nestas lições. Isso não é um grande problema, mas vale a pena verificar suas configurações antes de fazer push nos seus próprios projetos.*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aqui temos algumas mudanças que o repositório remoto não contém. Vamos subi-las!"
            ],
            "afterMarkdowns": [
              "Aqui vamos nós -- o repositório remoto recebeu o commit `C2`, o ramo `master` no repositório remoto foi atualizado para apontar para `C2`, e a *nossa* reflexão do remoto (`o/master`) foi atualizada também. Está tudo sincronizado!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nível, simplesmente compartilhe dois novos commits com o repositório remoto. No entanto, segure-se no seu assento, pois estas lições estão prestes a ficar mais difíceis!"
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
              "## Git Push",
              "",
              "Ok, entón xa baixamos os cambios dun repositorio remoto e integrámolos na árbore local. Esto está xenial... pero ¿cómo comparto o _meu_ sensacional traballo cas outras persoas?",
              "",
              "Ben, a forma de subir traballo para ser compartido é a oposta daquela de baixar o traballo que foi compartido. E ¿qué é o oposto a  `git pull` (tirar)? ¡É `git push` (empuxar)!",
              "",
              "`git push` é o responsable de subilos _teus_ cambios para un repositorio remoto especificado, e atualizar ese repositorio remoto para incorporar os seus novos commits. Unha vez que `git push` complétase, todos os teus amigos poderán baixar o teu traballo do repositorio remoto.",
              "",
              "Podes pensar en `git push` como un comando para \"publicar\" o teu traballo. O comando ten unha serie de detalles cos que imos xogar logo, pero comezemos con pasos curtos...",
              "",
              "*Nota -- o comportamento de `git push` sen argumentos varía dependendo da configuración `push.default` de Git. O valor para esa configuración depende da versión de Git que esteas empregando, pero imos asumir o valor `upstream` nestas leccións. Eso non é un gran problema, pero paga a pena verificalas súas configuracións antes de facer push nos teus propios proxectos.*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Aquí temos algúns cambios que o repositorio remoto non contén. ¡Imos subilas!"
            ],
            "afterMarkdowns": [
              "Ahí imos -- o repositorio remoto recibiu o commit `C2`, a rama `master` do repositorio remoto foi actualizado para apuntar para `C2`, e o *noso* reflexo do remoto (`o/master`) foi atualizado tamén. ¡Está todo sincronizado!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para completar este nivel, comparte dous novos commits co repositorio remoto. Igual, non te confíes, ¡xa se  complicará nas seguintes leccións!"
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
              "## Git Push",
              "",
              "ok，現在我已經從 remote 下載了一些更新，並且把它們 merge 到我的 local 上面的 branch，這聽起來實在太讚了...，但是我要如何分享_我_所做的更新給其它人呢？",
              "",
              "喔，其實上傳並且分享更新跟下載更新並且 merge 是相反的兩件事情，那什麼是 `git pull` 的相反呢？ 那就是 `git push`！",
              "",
              "`git push` 負責上傳_你的_ commit 到特定 remote 上面並且做出相對應的更新，只要做完了 `git push`，所有你的朋友都可以從 remote 上面下載你所送出去的 commit。",
              "",
              "你可以把 `git push` 當作是一個\"發佈\"你的工作進度的指令，還有一些我們即將要講到的細節，但是先讓我們從一些簡單的步驟開始。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "這裡我們有了一些 remote 所沒有的 commit。讓我們來上傳它們吧！"
            ],
            "afterMarkdowns": [
              "我說的沒錯吧！remote 收到了 commit `C2`，同時在 remote 上的 `master` branch 也一起更新並且指向 `C2`，同時我們*自己的* `o/master` 也一併更新了！"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成這個關卡，只要上傳兩個新的 commit 給 remote，不要太得意忘形喔！因為這些課程將會愈來愈難！"
            ]
          }
        }
      ]
    },
    "zh_CN":{
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Push",
              "",
              "OK，我们已经学过了如何从远程仓库获取更新并合并到本地的分支当中。这非常棒……但是我如何与大家分享**我的**成果呢？",
              "",
              "嗯，上传自己分享内容与下载他人的分享刚好相反，那与 `git pull` 相反的命令是什么呢？`git push`！",
              "",
              "`git push` 负责将**你的**变更上传到指定的远程仓库，并在远程仓库上合并你的新提交记录。一旦 `git push` 完成, 你的朋友们就可以从这个远程仓库下载你分享的成果了！",
              "",
              "你可以将 `git push` 想象成发布你成果的命令。它有许多应用技巧，稍后我们会了解到，但是咱们还是先从基础的开始吧……",
              "",
              "*注意 —— `git push` 不带任何参数时的行为与 Git 的一个名为 `push.default` 的配置有关。它的默认值取决于你正使用的 Git 的版本，但是在教程中我们使用的是 `upstream`。",
              "这没什么太大的影响，但是在你的项目中进行推送之前，最好检查一下这个配置。*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "这里我们准备了一些远程仓库中没有的提交记录, 咱们开始先上传吧!"
            ],
            "afterMarkdowns": [
              "过去了, 远程仓库接收了 `C2`，远程仓库中的 `master` 分支也被更新到指向 `C2` 了，我们的远程分支 (o/master) 也同样被更新了。所有的分支都同步了！"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "要完成本关，需要向远程仓库分享两个提交记录。拿出十二分精神吧，后面的课程还会更难哦！"
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
              "## Git Push",
              "",
              "Nun hab ich also Änderungen vom entfernten Server geholt und in meine lokale Arbeit integriert. Das ist schön und gut ... aber wie teile ich _meine_ Wahnsinns-Entwicklungen mit allen anderen?",
              "",
              "Naja, das Hochladen von Zeug ist das Gegenteil zum Herunterladen von Zeug. Und was ist das Gegenteil von `git pull`? Genau, `git push`!",
              "",
              "`git push` ist dafür verantwortlich _deine_ Änderungen zu einem bestimmten entfernten Server hochzuladen und dort zu integrieren. Sobald das `git push` durch ist, können alle deine Freunde diese Änderungen zu sich herunterladen.",
              "",
              "Du kannst dir `git push` als einen Befehl zum \"Veröffentlichen\" deiner Arbeit vorstellen. Es gibt da noch ein paar Feinheiten, aber lass uns mal mit kleinen Schritten anfangen."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hier haben wir ein paar Änderungen, die auf dem Remote noch fehlen. Und hoch damit!"
            ],
            "afterMarkdowns": [
              "Na bitte -- das Remote hat den Commit `C2` bekommen, der `master` auf dem Remote ist entsprechend aktualisiert worden und unsere *eigene* Abbildung des `master` auf dem Remote namens `o/master` wurde auch aktualisiert. Alles im Lot!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Um diesen Level zu schaffen musst du einfach nur zwei neue Commits auf das Remote bringen. Aber stell dich schon mal darauf ein, dass die nächsten Level anspruchsvoller werden!"
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
                      "## Git Push",
                      "",
                      "Хорошо, мы скачали изменения с удалённого репозитория и включили их в наши локальные наработки. Всё это замечательно, но как нам поделиться _своими_ наработками и изменениями с другими участниками проекта?",
                      "",
                      "Способ, которым мы воспользуемся, является противоположным тому способу, которым мы пользовались ранее для скачивания наработок (`git pull`). Этот способ - использование команды `git push`!",
                      "",
                      "Команда `git push` отвечает за загрузку _ваших_ изменений в указанный удалённый репозиторий, а также включение ваших коммитов в состав удалённого репозитория. По окончании работы команды `git push` все ваши друзья смогут скачать себе все сделанные вами наработки.",
                      "",
                      "Вы можете рассматривать команду `git push` как \"публикацию\" своей работы. Эта команда скрывает в себе множество тонкостей и нюансов, с которыми мы познакомимся в ближайшее время, а пока что давайте начнём с малого...",
                      "",
                      "*замечание - поведение команды `git push` без аргументов варьируется в зависимости от значения `push.default`, указанной в настройках git-а. Значение по умолчанию зависит от версии git, которую вы используете, однако в наших уроках мы будем использовать значение `upstream`. Лучше всегда проверять эту опцию прежде чем push-ить ваши настоящие проекты.*"
                  ]
              }
          },
          {
              "type": "GitDemonstrationView",
              "options": {
                  "beforeMarkdowns": [
                      "Здесь у нас имеются изменения, которых нет в удалённом репозитории. Давайте же закачаем их туда!"
                  ],
                  "afterMarkdowns": [
                      "Вот так - удалённый репозиторий получил новый коммит `C2`, ветка `master` на удалённом репозитории теперь указывает на `C2`, и наше *собственное* локальное отображение удалённого репозитория (`o/master`) изменилось соответственно. Всё синхронизировалось!"
                  ],
                  "command": "git push",
                  "beforeCommand": "git clone; git commit"
              }
          },
          {
              "type": "ModalAlert",
              "options": {
                  "markdowns": [
                      "Чтобы выполнить задачу этого упражнения, просто поделитесь своими двумя новыми коммитами с удалённым репозиторием. Соберитесь, потому что все последующие уроки будут намного сложнее предыдущих!"
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
              "## Git Push",
              "",
              "さて、私たちは変更をリモートからダウンロードしてきて、ローカルの自分の作業に取り込むことができるようになりました。それは素晴らしいことですが、例えば他の誰かに_自分の_作業を共有する場合はどうすればいいでしょう？",
              "",
              "そうですね、共有する作業をアップロードする方法は作業をダウンロードするものと対照的です。`git pull`の反対はなんでしょう？ `git push`です！",
              "",
              "`git push`は_あなたの_変更をリモートに対話的にアップロードし、リモートにあなたの新しい変更を取り込みます。`git push`が完了すれば、全ての友人たちがあなたの作業をリモートからダウンロードすることができます。",
              "",
              "`git push`は、あなたの作業を「公開する」コマンドと考えることができます。このコマンドは微妙な点をいくつか持っていますが、とりあえずは初歩から始めてみましょう。。。",
              "",
              "*注：引数なしの`git push`の挙動は、`push.default`と呼ばれるgitの設定値によって異なります。この設定のデフォルト値は、使用しているgitのバージョンに依存しますが、私たちのレッスンでは`upstream`という値を使用します。これはあまり大きな問題ではありませんが、あなたのプロジェクトにプッシュする前にあなたのgitの設定を確認する価値はあるでしょう。*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "ここにリモートにはないいくつかの変更点があります。これをアップロードしてみましょう！"
            ],
            "afterMarkdowns": [
              "さて、いってみましょう -- リモートはコミット`C2`を受け取り、リモート上の`master`ブランチは`C2`の位置に更新され、私たち*自身*のリモートブランチ(`o/master`)も良い具合に更新されました。全てが同期されました！"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルを終えるには、単純に二つの新しいコミットをリモートに共有してください。けれども覚悟しておいてください。なぜなら、レッスンは少々難しいことを取り扱っているからです。"
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
              "## Git Push",
              "",
              "Гаразд, я витягнув останні зміни та інтегрував їх до своїх локальних напрацювань. Все добре... але як мені поділится _своїми_ змінами з рештою учасників?",
              "",
              "Отже, надсилання данних є, по-суті, протилежним звантажуванню данних. А який антонім до `git pull` (притягнути)? `git push` (відштовхнути)!",
              "",
              "`git push` використовується для надсилання _локальних_ змін на вказаний віддалений репозиторій; ця команда оновлює віддалений репозиторій, інтегруючи нові коміти. Після виконання `git push` всі твої друзі зможуть звантажити твої напрацювання з віддаленого сховища.",
              "",
              "Ти можеш вважати, що `git push` \"публікує\" твої напрацювання. В цієї команди є кілька особливостей, які ми скоро розглянемо, але почнімо з початку...",
              "",
              "*Зауваження: поведінка `git push` без параметрів різниться в залежності від налаштування git з назвою `push.default`. Значення за замовчуванням цього налаштування залежить від версії твого git, але в наших уроках ми будемо вважати що воно дорівнює `upstream`. Це не вкрай важливо, але буде корисно перевірити це налаштування перед тим як пушити свій проект.*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Ось ми маємо деякі зміни яких нема в віддаленому сховищі. Надішлімо їх!"
            ],
            "afterMarkdowns": [
              "Ось, маєш -- віддалене сховище отримало  `C2`, гілку `master` на ньому було оновлено й тепер вона посилається на `C2`, а наше *власне* відображення віддаленого репо  (`o/master`) було також оновлено. Все синхронізовано!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Щоб пройти цей рівень, просто надішли два коміти у віддалений репозиторій. Але прищібнись, скоро наші уроки стануть значно важчими!"
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
              "## Git Push",
              "",
              "좋아요, 원격 저장소에서의 변화들을 가져오는 방법도 알고 로컬의 내 작업과 합칠줄도 알게되었습니다. 아주 좋아요.. 좋은데 이제 _나의_ 훌륭한 작업을 다른 사람들과 공유하려면 어떻게 해야되는거죠?",
              "",
              "공유된 작업을 내려받는것의 반대는 작업을 업로드해 공유하는것입니다. 그렇다면 `git pull` 당기기의 반대는? `git push` 미는겁니다!",
              "",
              "`git push`는 _여러분의_변경을 정한 원격저장소에 업로드하고 그 원격 저장소가 여러분의 새 커밋들을 합치고 갱신하게 합니다. `git push`가 끝나고 나면, 여러분의 친구들은 원격저장소에서 여러분의 작업을 내려받을수 있게됩니다.",
              "",
              "여러분은 `git push`를 작업을 \"공개\"하는 과정이라고 생각해도 될것입니다. 곧 알아볼 중요한 세부 요소들이 잔뜩 있지만, 일단은 아기 걸음으로 시작해봅시다...",
              "",
              "*노트 -- `git push`를 매개변수 없이 사용하는 디폴트 행동은 `push.default`라 불리는 git의 설정에 따라 결정 됩니다. 이 설정의 기본값은 여러분이 사용하는 git 버전에 따라 다릅니다만, 우리 강의에서는 `upstream`을 값으로 사용합니다. 대단한것은 아니지만, 여러분이 프로젝트를 push하기전에 한번쯤 확인해볼 가치가 있습니다.*"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "여기 원격저장소에는 없는 변경이 있습니다. 이것들을 업로드 해 봅시다!"
            ],
            "afterMarkdowns": [
              "자 됬습니다 -- 원격 저장소가 커밋 `C2`를 받았고, 원격 저장소의 브랜치 `master`가 `C2`라는 지점까지 갱신 되었습니다. 그리고 원격 저장소의 반영인 *우리의* 원격 브랜치 (`o/master`)또한 잘 갱신 되었습니다. 모든게 동기화되어 있습니다!"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이번 레벨을 마치기 위해, 두개의 새 커밋을 원격 저장소에 공유해봅시다. 마음의 준비를 단단히 하세요, 이제부터 강의들이 훨씬 어려워질거니까요!"
            ]
          }
        }
      ]
    }
  }
};
