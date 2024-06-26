exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/main\":{\"target\":\"C2\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C3\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"C0\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git push origin main;git push origin foo",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"foo\":{\"target\":\"C3\",\"id\":\"foo\",\"remoteTrackingBranchID\":\"o/foo\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null},\"o/foo\":{\"target\":\"C1\",\"id\":\"o/foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"C0\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null},\"foo\":{\"target\":\"C1\",\"id\":\"foo\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "disabledMap": {
    "git checkout": true,
    "git switch": true
  },
  "name": {
    "en_US": "Git push arguments",
    "zh_CN": "Git push 的参数",
    "zh_TW": "git push 的參數",
    "es_AR": "Parámetros de git push",
    "es_ES": "Parámetros de git push",
    "pt_BR": "Parâmetros do git push",
    "gl": "Parámetros de git push",
    "de_DE": "Optionen für Git Push",
    "ja": "Git pushの引数",
    "fr_FR": "Arguments de git push",
    "ru_RU": "Аргументы git push",
    "ko": "git push의 인자들",
    "uk": "Аргументи git push",
    "vi": "Tham số git push",
    "sl_SI": "Git push argumenti",
    "pl": "Argumenty git push",
    "it_IT": "Parametri di git push"
  },
  "hint": {
    "en_US": "You can always look at the last slide of the dialog with \"objective\"",
    "zh_CN": "你可以利用“objective”来阅读对话窗口的最后一页",
    "zh_TW": "你可以利用 \"objective\" 來閱讀對話視窗的最後一頁",
    "es_AR": "Siempre podés ver el último mensaje tipeando \"objective\"",
    "es_ES": "Siempre puedes ver el último mensaje escribiendo \"objective\"",
    "pt_BR": "Você sempre pode rever o último slide com o comando \"objective\"",
    "gl": "Ti sempre podes desfacer último mensaxe escribindo \"objective\"",
    "de_DE": "Du kannst dir die Zielsetzung des Levels immer wieder mit \"objective\" anzeigen lassen",
    "ja": "ダイアログの最後のスライドを参照するには\"objective\"を実行",
    "fr_FR": "Vous pouvez toujours regarder le dernier slide des dialogues en tapant \"objective\".",
    "ru_RU": "Вы всегда можете ознакомиться с последним слайдом, воспользовавшись \"objective\".",
    "ko": "대화창의 마지막 슬라이드를 \"objective\"로 다시 볼 수 있습니다.",
    "uk": "Завжди можна подивитися останній слайд діалогу за допомогою \"objective\"",
    "vi": "Bạn có thể sử dụng \"objective\" để đọc trang cuối của cửa sổ hộp thoại",
    "sl_SI": "Vedno lahko pogledaš zadnji dialog z \"objective\".",
    "pl": "Możesz wpisać \"objective\", żeby zobaczyć ostatni slajd z każdego poziomu",
    "it_IT": "Puoi sempre guardare l'ultima slide del dialogo con \"objective\""
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Push arguments",
              "",
              "Great! Now that you know about remote tracking branches we can start to uncover some of the mystery behind how git push, fetch, and pull work. We're going to tackle one command at a time but the concepts between them are very similar.",
              "",
              "First we'll look at `git push`. You learned in the remote tracking lesson that git figured out the remote *and* the branch to push to by looking at the properties of the currently checked out branch (the remote that it \"tracks\"). This is the behavior with no arguments specified, but git push can optionally take arguments in the form of:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "What is a `<place>` parameter you say? We'll dive into the specifics soon, but first an example. Issuing the command:",
              "",
              "`git push origin main`",
              "",
              "translates to this in English:",
              "",
              "*Go to the branch named \"main\" in my repository, grab all the commits, and then go to the branch \"main\" on the remote named \"origin\". Place whatever commits are missing on that branch and then tell me when you're done.*",
              "",
              "By specifying `main` as the \"place\" argument, we told git where the commits will *come from* and where the commits *will go*. It's essentially the \"place\" or \"location\" to synchronize between the two repositories.",
              "",
              "Keep in mind that since we told git everything it needs to know (by specifying both arguments), it totally ignores where we are checked out!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's see an example of specifying the arguments. Note the location where we are checked out in this example."
            ],
            "afterMarkdowns": [
              "There we go! `main` got updated on the remote since we specified those arguments."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "What if we hadn't specified the arguments? What would happen?"
            ],
            "afterMarkdowns": [
              "The command fails (as you can see), since `HEAD` is not checked out on a remote-tracking branch."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, for this level let's update both `foo` and `main` on the remote. The twist is that `git checkout` is disabled for this level!",
              "",
              "*Note: The remote branches are labeled with `o/` prefixes because the full `origin/` label does not fit in our UI. Don't worry ",
              "about this... simply use `origin` as the name of the remote like normal.*"
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
              "## Les arguments de push",
              "",
              "Bien ! Maintenant que vous connaissez le suivi des branches, nous pouvons fouiller ce qui se cache derrière le fonctionnement de push, fetch, et pull. Nous allons aborder une commande à la fois, mais elles sont très similaires.",
              "",
              "En premier lieu regardons `git push`. Vous avez appris dans la leçon sur le suivi des branches distantes que Git détermine le dépôt distant *et* la branche à envoyer en regardant les propriétés de la branche courante (c'est à dire la branche distante que cette dernière \"suit\" -- track). C'est le comportement rencontré quand aucun argument n'est spécifié, mais git push accepte aussi des arguments de la forme :",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Qu'est ce que ce paramètre `<place>` ? Avant de passer à l'explication, voyons d'abord un exemple. La commande suivante :",
              "",
              "`git push origin main`",
              "",
              "peut se traduire en français par :",
              "",
              "*Va dans la branche \"main\" de mon dépôt, récupère tous les commits, et ensuite va dans la branche distante \"main\" sur le dépôt nommé \"origin\". Envoie tous les commits qui lui manquent sur cette branche distante puis préviens-moi quand c'est terminé.*",
              "",
              "En spécifiant `main` comme argument `<place>`, nous avons dit à Git *d'où* les commits venaient et où ils *allaient*. C'est en fait \"l'emplacement\" à synchroniser entre les deux dépôts.",
              "",
              "Gardez à l'esprit que nous avons dit à Git tout ce dont il a besoin pour opérer (en précisant les deux arguments), il n'a donc absolument pas besoin de savoir quelle est la branche courante !"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Voyons un exemple d'arguments. Notez bien où se trouve `HEAD` dans cet exemple."
            ],
            "afterMarkdowns": [
              "Voilà ! `main` a été mise à jour puisque nous avons spécifié ces arguments."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Et si nous n'avions pas mis d'arguments ? Que ce serait-il passé ?"
            ],
            "afterMarkdowns": [
              "La commande échoue (comme vous pouvez le voir), car `HEAD` ne se trouve pas sur une branche configurée pour suivre une branche distante."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, pour ce niveau mettez à jour `foo` et `main` sur le dépôt distant. La difficulté est que `git checkout` est désactivée pour ce niveau !"
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
              "## Parámetros de push",
              "",
              "¡Genial! Ahora que sabés acerca de las ramas que trackean remotos podemos empezar a desvelar algo del misterio detrás de git push, fetch y pull. Vamos a atacar de a un comando a la vez, pero los conceptos entre ellos son muy similares.",
              "",
              "Veamos primero `git push`. Ya aprendiste en la lección sobre ramas remotas que git determinó el remoto *y* la rama a la que pushear mirando las propiedades de la rama actual (el remoto al que \"trackea\"). Este es el comportamiento default para cuando no se especifican parámetros, pero git push toma, opcionalmente, parámetros de la forma:",
              "",
              "`git push <remoto> <lugar>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¿Qué será este parámetro `<lugar>`, te preguntarás? Ya vamos a entrar en detalle, pero primero un ejemplo. Correr el comando:",
              "",
              "`git push origin main`",
              "",
              "se traduce así al español:",
              "",
              "*Andá a la rama llamada \"main\" en mi repositorio, agarrá todos los commits, y después andá a la rama \"main\" del remoto llamado \"origin\". Aplicá ahí todos los commits que falten, y avisame cuando termines.*",
              "",
              "Especificando `main` como el parámetro \"lugar\", le dijimos a git de dónde traer los commits, y a dónde mandarlos. Es, básicamente, el \"lugar\" o \"ubicación\" que sincronizar entre ambos repositorios.",
              "",
              "Tené en cuenta que, como le dijimos a git todo lo que necesitaba saber (especificando ambos parámetros), ¡ignora totalmente dónde estamos parados en este momento¡"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos un ejemplo especificando los parámetros. Notá en dónde estamos parados en este ejemplo."
            ],
            "afterMarkdowns": [
              "¡Ahí está! Se actualizó `main` en el remoto, porque especificamos esos parámetros."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Y si no especificábamos los parámetros? ¿Qué hubiera pasado?"
            ],
            "afterMarkdowns": [
              "El comando falla (como podés ver), porque `HEAD` no está sobre ninguna rama que trackee algún remoto."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok. Para este nivel, actualicemos tanto `foo` como `main` en el remoto. El tema está en que ¡tenemos deshabilitado `git checkout` en este nivel!"
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
              "## Parámetros de push",
              "",
              "¡Genial! Ahora que has aprendido sobre las ramas que trackean remotos podemos empezar a desvelar algo del misterio detrás de git push, fetch y pull. Vamos a atacar un comando cada vez, pero los conceptos entre ellos son muy similares.",
              "",
              "Veamos primero `git push`. Ya aprendiste en la lección sobre ramas remotas que git determinó el remoto *y* la rama a la que pushear mirando las propiedades de la rama actual (el remoto al que \"trackea\"). Este es el comportamiento por defecto para cuando no se especifican parámetros, pero git push toma, opcionalmente, parámetros de la forma:",
              "",
              "`git push <remoto> <lugar>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¿Qué será este parámetro `<lugar>`, te preguntarás? Vamos a entrar en detalle, pero primero un ejemplo. Ejecutar el comando:",
              "",
              "`git push origin main`",
              "",
              "se traduce así al español:",
              "",
              "*Vete a la rama llamada \"main\" en mi repositorio, coge todos los commits, y después vete a la rama \"main\" del remoto llamado \"origin\". Copia ahí todos los commits que falten, y avísame cuando termines.*",
              "",
              "Especificando `main` como el parámetro \"lugar\", le dijimos a git de dónde traer los commits, y a dónde mandarlos. Es, básicamente, el \"lugar\" o \"ubicación\" que sincronizar entre ambos repositorios.",
              "",
              "Ten en cuenta que, como le dijimos a git todo lo que necesitaba saber (especificando ambos parámetros), ¡ignora totalmente dónde estamos parados en este momento¡"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Veamos un ejemplo especificando los parámetros. Date cuenta dónde estamos parados en este ejemplo."
            ],
            "afterMarkdowns": [
              "¡Ahí está! Se actualizó `main` en el remoto, porque especificamos esos parámetros."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿Y si no especificabamos los parámetros? ¿Qué hubiera pasado?"
            ],
            "afterMarkdowns": [
              "El comando falla (como puedes ver), porque `HEAD` no está sobre ninguna rama que apunte a algún remoto."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Perfecto. Para este nivel, actualicemos tanto `foo` como `main` en el remoto. El tema está en que ¡tenemos deshabilitado `git checkout` en este nivel!"
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
              "## Parâmetros do push",
              "",
              "Ótimo! Agora que você sabe sobre remote tracking de ramos, podemos começar a revelar um pouco do mistério por trás de como o push, o fetch e o pull funcionam. Vamos lidar com um comando por vez, mas os conceitos são bastante similares.",
              "",
              "Primeiro, vamos abordar o `git push`. Você aprendeu na lição sobre remote tracking que o Git descobria o repositório remoto *e* o ramo correspondente onde fazer o push olhando nas propriedades do ramo que está atualmente em checkout (verificando o ramo remoto que ele \"segue\"). Este é o comportamento quando nenhum parâmetro é especificado, mas o git push pode opcionalmente receber parâmetros na seguinte forma:",
              "",
              "`git push <repositório remoto> <lugar>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Você deve estar se perguntando: o que é esse parâmetro `<lugar>`? Vamos discutir as especifidades em breve, mas vejamos primeiro um exemplo. Executar o comando:",
              "",
              "`git push origin main`",
              "",
              "pode ser traduzido para o seguinte em Português:",
              "",
              "*Vá ao ramo chamado \"main\" no meu repositório local, pegue todos os commits, então vá ao ramo \"main\" no repositório remoto chamado \"origin\". Coloque quaisquer commits que estiverem faltando nesse ramo, e então me diga quando estiver pronto.*",
              "",
              "Especificando `main` como parâmetro \"lugar\", dizemos ao Git de onde os commits *vão vir* e para onde os commits *irão*. É essencialmente o \"lugar\" onde sincronizar entre os dois repositórios.",
              "",
              "Tenha em mente que já que contamos ao Git tudo que ele precisa saber (especificando ambos os parâmetros), ele ignora totalmente o checkout atual!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vejamos um exemplo especificando os argumentos. Preste atenção no commit que sofreu checkout neste exemplo."
            ],
            "afterMarkdowns": [
              "Aqui vamos nós! O `main` foi atualizado no repositório remoto, já que especificamos os parâmetros."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "E se eu não especificasse parâmetros? O que aconteceria?"
            ],
            "afterMarkdowns": [
              "O comando falha (como você pode ver), já que o `HEAD` não havia sofrido checkout para um ramo com propriedade de remote-tracking definida."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, neste nível vamos atualizar tanto o `foo` como o `main` no repositório remoto. Porém desabilitamos o comando `git checkout` para dificultar um pouco a tarefa!"
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
              "## Parámetros de push",
              "",
              "¡Xenial! Agora que sabes acerca das ramas que seguen remotos, podemos empezas a desvelar algo do misterio detrás do git push, fetch e pull. Imos atacar cun só comando dunha vez, pero os conceptos entre eles son moi semellantes.",
              "",
              "Vexamos primeiro `git push`. Xa aprendiches na lección sobre as ramas remotas que git determina o remoto *e* a rama á que empurrar mirando as propiedades da rama actual (o remoto ó que seguir). Este é o comportamento por defecto para  cando non se especifican parámetros, pero git push toma, opcionalmente, parámetros da forma:",
              "",
              "`git push <remoto> <lugar>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "¿Qué será este parámetro `<lugar>`, fixécheste esa pregunta? Xa imos entrar en detalle, pero primeiro un exemplo. Executa o comando:",
              "",
              "`git push origin main`",
              "",
              "tradúcese así ó galego:",
              "",
              "*Vai á rama chamada \"main\" no meu repositorio, colle tódolos commits, e despois vai á rama \"main\" do remoto chamado \"origin\". Aplica ahí tódolos commits que falten, e avísame cando remates.*",
              "",
              "Indicando `main` como o parámetro \"lugar\", dixémoslle a git ónde traer os commits, e ónde mandalos. É básicamente, o \"lugar\" ou \"ubicación\" que sincroniza entre ámbolos dous repositorios.",
              "",
              "Ten en conta que, como lle dixemos a git todo o que precisaba saber (indicando ambos parámetros), ¡ignora totalmente ónde andabamos neste momento!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vexamos un exemplo especificando os parámetros. Nota ónde ficamos parados neste exemplo."
            ],
            "afterMarkdowns": [
              "¡Ahí o tes! Actualizouse `main` no remoto, porque especificamos eses parámetros."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "¿E se non especificáramos os parámetros? ¿Que ocorrería?"
            ],
            "afterMarkdowns": [
              "O comando falla (como podes ver), xa que `HEAD` non está sobre ningunha rama que siga algún remoto."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok. Para este nivel, actualiza tanto `foo` como `main` no remoto. O tema está en que ¡temos deshabilitado `git checkout` neste nivel!"
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
              "## push 的參數",
              "",
              "太好了！現在你已經明白了 remote tracking，我們可以開始聊 git push、fetch 以及 pull 的一些有趣的地方，我們一次會講解一個指令，但是它們之間的概念是很類似的。",
              "",
              "首先我們來看一下 `git push`，你已經在 remote tracking 的課程中學習到 git 是根據目前 checkout 的 branch 所 track 的 remote branch 來做 push，這是在沒有任何的參數的情況下的預設動作，但是 git push 允許我們可以加上一些參數：",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`<place>` 這個參數表示什麼? 我們等一下會提到細節，但是先來看一個例子，執行以下的指令：",
              "",
              "`git push origin main`",
              "",
              "將這段解釋成中文：",
              "",
              "*先到我的 repo 中的 \"main\" branch，抓下所有的 commit，然後到叫作 \"origin\" 的 remote 的 \"main\" branch，檢查 remote 的 commit 有沒有跟我的 repo 一致，如果沒有，就更新。*",
              "",
              "將 `main` 當作 \"place\" 這個參數，我們告訴 git 這些 commit 是*從哪裡來的*，而且它們要*往哪裡去*。對於要同步兩個 repo， \"place\" 或者是 \"location\" 是非常重要的。",
              "",
              "要記住喔，因為我們告訴 git 它所要知道的（有兩個參數），因此它才不會管你現在所 checkout 的 branch！"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "讓我們來看一個有加上參數的例子，在這個例子中，要特別注意到我們所 checkout 的位置。"
            ],
            "afterMarkdowns": [
              "我說的沒錯吧！因為我們加上了參數，所以在 remote 上的 `main` branch 更新了。"
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "假如我們沒有特別指令參數會發生什麼事情？"
            ],
            "afterMarkdowns": [
              "指令會失敗（就像你看到的），因為 `HEAD` 並沒有指向一個有 track remote branch 的 branch 上面阿。"
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "好的，在這個關卡中，我們要更新在 remote 上的 `foo` 以及 `main` branch，比較遺憾的是 `git checkout` 在這個關卡中是不被允許的喔！"
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
              "## Git Push 的参数",
              "",
              "很好! 既然你知道了远程跟踪分支，我们可以开始揭开 git push、fetch 和 pull 的神秘面纱了。我们会逐个介绍这几个命令，它们在理念上是非常相似的。",
              "",
              "首先来看 `git push`。在远程跟踪课程中，你已经学到了 Git 是通过当前所在分支的属性来确定远程仓库以及要 push 的目的地的。这是未指定参数时的行为，我们可以为 push 指定参数，语法是：",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`<place>` 参数是什么意思呢？我们稍后会深入其中的细节, 先看看例子, 这个命令是:",
              "",
              "`git push origin main`",
              "",
              "把这个命令翻译过来就是：",
              "",
              "*切到本地仓库中的“main”分支，获取所有的提交，再到远程仓库“origin”中找到“main”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。*",
              "",
              "我们通过“place”参数来告诉 Git 提交记录来自于 main, 要推送到远程仓库中的 main。它实际就是要同步的两个仓库的位置。",
              "",
              "需要注意的是，因为我们通过指定参数告诉了 Git 所有它需要的信息, 所以它就忽略了我们所切换分支的属性！"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "我们看看指定参数的例子。注意下我们当前分支的位置。"
            ],
            "afterMarkdowns": [
              "好了! 通过指定参数, 远程仓库中的 `main` 分支得到了更新。"
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "如果不指定参数会发生什么呢?"
            ],
            "afterMarkdowns": [
              "命令失败了（正如你看到的，什么也没有发生）! 因为我们所切换的 HEAD 没有跟踪任何分支。"
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "本关我们要更新远程仓库中的 `foo` 和 `main`, 但是 `git checkout` 被禁用了！",
              "",
              "*注意：远程分支使用 `o/` 开头是因为 `origin/` 对于 UI 来说太长了。不用太在意这个，直接用 `origin` 作为远程仓库的名称就可以了。*",
              ""
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
              "## Push-Optionen",
              "",
              "Großartig! Da du dich jetzt mit Remote Tracking Branches auskennst, können wir anfangen, die Geheimnisse hinter `git push`, `fetch` und `pull` zu ergründen. Wir werden uns einen Befehl nach dem anderen vornehmen, aber die Funktionsweisen sind sich sehr ähnlich.",
              "",
              "Zunächst schauen wir uns `git push` an. Du hast im Level über Remote Tracking schon mitbekommen, dass Git den Remote Server *und* den Branch herausbekommt, indem es sich die Eigenschaften des aktuell ausgecheckten Branches ansieht (in denen das Remote steht, das der Branch \"trackt\"). Das ist das Verhalten bei keiner Angabe weiterer Optionen -- du kannst bei `git push` aber auch folgende setzen:",
              "",
              "`git push <Remote> <Ort>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Was \"Ort\" sein soll, fragst du? Das klären wir später genau, schauen wir uns zunächst ein Beispiel an:",
              "",
              "`git push origin main`",
              "",
              "Das bedeutet im Klartext:",
              "",
              "\"Geh zum Branch namens `main` in meinem Repository, nimm all seine Commits, dann geh zum Branch `main` auf dem Remote namens `origin`. Lege da alle Commits ab, die fehlen und sage mir, wenn du fertig bist.\"",
              "",
              "Da wir `main` als \"Ort\" angegeben haben, weiß Git, *woher* die Commits kommen und *wohin* sie sollen. Es ist im Grunde der Name der Orte, die zwischen zwei Repositorys synchronisiert werden sollen.",
              "",
              "Da wir Git alles explizit gesagt haben, was es für die Operation wissen muss (durch Angabe von Remote und Ort), ist es vollkommen egal, was gerade ausgecheckt ist."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Schauen wir uns noch ein Beispiel an. Beachte, was in diesem Fall gerade ausgecheckt ist."
            ],
            "afterMarkdowns": [
              "Da haben wir's! `main` wurde auf dem Remote aktualisiert, weil wir beide Optionen angegeben haben."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Was wäre passiert, wenn wir keine Optionen benutzt hätten?"
            ],
            "afterMarkdowns": [
              "Der Befehl schlägt fehlt, da `HEAD` nicht auf einem Branch steht, der ein Remote trackt."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, in diesem Level lass uns sowohl `foo` als auch `main` auf dem Remote aktualisieren. Um's spannender zu machen ist `git checkout` in diesem Level deaktiviert."
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
              "## Аргументы команды Push",
              "",
              "Отлично! Теперь, когда вы знаете, как следить за удалёнными ветками, мы можем начать изучение того, что скрыто под занавесом работы команд git push, fetch и pull. Мы будем рассматривать одну команду за другой, однако принципы у них очень схожи.",
              "",
              "Сперва взглянем на `git push`. В уроке, посвящённом слежению за удалённым репозиторием, вы узнали о том, что git находит удалённый репозиторий *и* ветку, в которую необходимо push-ить, благодаря свойствам текущей ветки, на которой мы находимся. Это так называемое поведение без аргументов, однако команда git push может быть также использована и с аргументами. Вид команды в данном случае:",
              "",
              "`git push <удалённый_репозиторий> <целевая_ветка>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Что за такой параметр `<целевая_ветка>`? Мы узнаем об этом через секунду, а пока что рассмотрим пример. Допустим, что мы выполняем такую команду:",
              "",
              "`git push origin main`",
              "",
              "дословный перевод с английского будет таким:",
              "",
              "*Перейди в ветку с именем \"main\" в моём локальном репозитории, возьми все коммиты и затем перейди на ветку \"main\" на удалённом репозитории \"origin.\". На эту удалённую ветку скопируй все отсутствующие коммиты, которые есть у меня, и скажи, когда ты закончишь.*",
              "",
              "Указывая `main` в качестве аргумента \"целевая_ветка\", мы тем самым говорим git-у откуда будут *приходить* и *уходить* наши коммиты. Аргумент \"целевая_ветка\" или \"местонахождение\" - это синхронизация между двумя репозиториями.",
              "",
              "Имейте в виду, что с тех пор, как мы сказали git-у всё, что ему необходимо (указав оба аргумента), ему - git-у - абсолютно всё равно, что вы зачекаутили до этого!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Давайте взглянем на пример, в котором указаны оба этих аргумента. Обратите внимание на местоположение, в котором мы находимся после чекаута."
            ],
            "afterMarkdowns": [
              "Вот так! Мы обновили `main` на удалённом репозитории, принудительно указав аргументы в push."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "А что бы было, если бы мы не указывали эти аргументы, при этом используя тот же алгоритм?"
            ],
            "afterMarkdowns": [
              "Как вы видите, команда не выполнилась, так как `HEAD` потерялся и не находится на удалённо-отслеживаемой ветке."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Хорошо, для выполнения этого уровня давайте обновим обе ветки `foo` и `main` на удалённом репозитории. Фишка в том, что команда `git checkout` не доступна на этом уровне!",
              "",
              "*Замечание: Удалённые ветки помечены как `o/`, а не `origin/`. Дело в том, что полная метка не помещается на экране. Не волнуйтесь ",
              "по этому поводу... просто используйте знакомый нам `origin` для обращения к удалённому репозиторию.*"
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
              "## Git pushの引数",
              "",
              "すばらしい！リモートトラッキングブランチについて理解したので、次は git push、fetch、pull 動作の謎を追っていきましょう。一つずつ見ていきますが、各コマンドのコンセプトは非常に似ています。",
              "",
              "まずは、`git push`からです。リモートトラッキングブランチのレッスンでは、gitは現在チェックアウトされているブランチのプロパティを参照して、pushするリモートとブランチを決めるということを学びました（そのリモートは、ブランチの追跡対象でもあります）。これは git push の引数が指定されていない場合の動作ですが、git push は次の引数も取ることができます。",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`<place>`パラメータとは何でしょうか？説明の前に、まずは例をみてみましょう。",
              "",
              "`git push origin main`",
              "",
              "これを日本語訳すると、次のようになります。",
              "",
              "*リポジトリの \"main\" ブランチに移動し、すべてのコミットを取得してから、リモートの \"origin\" にある \"main\" ブランチへ移動します。存在していないコミットをリモートのリポジトリに反映させて、完了したら私に教えて下さい。*",
              "",
              "\"place\"引数に`main`を指定することで、コミットがどこから来てどこへ行くのかをgitに伝えました。この\"place\"引数は基本的に、２つのリポジトリ間で同期する場所の名前です。",
              "",
              "なお、git に（２つの引数を指定して）必要なことを伝えたので、現在チェックアウトされているブランチを無視することに注意してください。"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "引数を指定した例を見てみましょう。この例ではチェックアウトされている場所に注意してください。"
            ],
            "afterMarkdowns": [
              "やったね！これらの引数を指定していたので、リモートの`main`が更新されました。"
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "引数を指定しなかった場合、何が起こるでしょうか？"
            ],
            "afterMarkdowns": [
              "（ご覧の通り）コマンドは失敗しました。`HEAD`がリモートトラッキング設定のあるブランチにチェックアウトされていないためです。"
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルでは`foo`と`main`の両方をリモートに更新してみましょう。ここでは`git checkout`が無効になっているので注意してください。",
              "",
              "*注：`origin/`ラベルがUIに収まらないため、リモートブランチには`o/`が付いていますが心配しないでください。",
              "これについては... 通常のようにリモートの名前に`origin`を使用してくださいね。*"
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
              "## Push의 인자들",
              "",
              "좋습니다! 여러분은 이제 원격 추적 브랜치도 알고 있기 때문에 이제 git push, fetch, pull이 어떻게 작동하는지에 관한 숨겨져있는 미스테리를 풀어나갈 준비가 되었습니다. 한번에 하나의 명령어를 알아보도록하겠는데 이것들이 가지고있는 컨셉은 아주 비슷해요.",
              "",
              "먼저 `git push`입니다. 여러분은 push를 하면 git이 push를 할 대상으로 원격저장소, 브랜치를 현재 작업중인 브랜치에 설정된 속성(\"추적\" 대상)을 통해 알아낸다는것을 이전 추적 레슨에서 배웠습니다. 이것은 인자를 넣지않고 실행할 때 일어나는것 입니다, 그런데 git push에 다음과 같은 형식으로 선택적으로 인자를 사용할수도 있습니다:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`<place>`인자가 무엇을 의미할것 같나요? 세부사항은 알아보기 전에 예시부터 봅시다. 다음 명령어를 보세요:",
              "",
              "`git push origin main`",
              "",
              "해석해 보면:",
              "",
              "*내 저장소에 있는 \"main\"라는 이름의 브랜치로 가서 모든 커밋들을 수집합니다, 그다음 \"origin\"의 \"main\"브랜치로 가서 이 브랜치에 부족한 커밋들을 채워 넣고 완료 되면 알려줍니다.*",
              "",
              "`main`를 \"place\"인자로 지정해서 우리가 git에게 *어디서부터* 커밋이 오는지, 그리고 *어디로* 커밋이 가야하는지 알려줍니다. 두 저장소간에 동기화 작업을 할 \"장소\"를 지정해 주는것이라고 볼 수 있습니다.",
              "",
              "git이 알아야 할 것은 다 알려줬기 때문에(두 인자를 모두 지정했죠), git은 현재 우리가 체크아웃한 브랜치는 무시하고 명령을 수행합니다."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "인자를 지정해주는 예제를 눈으로 직접 확인해 봅시다. 이 예제에서 우리가 체크아웃한 곳이 어디인지를 주의하며 봅시다."
            ],
            "afterMarkdowns": [
              "됐네요! 지정해준 인자들에 의해 원격 저장소의 `main`가 갱신 되었습니다."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "인자를 지정하지 않으면 어떻게 될까요?"
            ],
            "afterMarkdowns": [
              "명령이 실패하며(보시다시피), `HEAD`가 원격저장소를 추적하는 브랜치에 체크아웃 되있지 않기 때문이죠."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "좋습니다, 이번 레벨에서는 원격저장소의 `foo`, `main`브랜치 모두 갱신해봅시다. 이번 문제는 `git checkout`이 비활성화 되있다는 점이 특징이죠!",
              "",
              "*노트: 원격 브랜치들은 `o/`접두어로 분류되어 있습니다. `origin/`으로 생략없이 표현하면 UI에 안맞아서 이렇게 표현했어요. ",
              "그래서... 원격저장소 이름은 원래처럼 `origin`으로 써주세요.*"
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
              "## Аргумeнти git push",
              "",
              "Чудово! А зараз, коли ти знаєш все про відслідковування віддалених гілок, ми можемо розглянути \"магію\", що відбувається при git push, fetch, і pull. Ми розглянемо лише окремі команди для розуміння загального принципу.",
              "",
              "Спочатку розгляньмо `git push`. З уроку про відслідковування віддалених гілок ми знаємо, що git визначає куди і в *яку* гілку робити push, дивлячись на локальну поточну гілку (і віддалену, за якою вона \"слідкує\"). Це поведінка `push` без аргументів, але git push може приймати необов'язкові аргументи в форматі:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ви спитаєте, що таке аргумент `<place>`? Ми скоро вдамося в детальні пояснення, але спочатку -- приклад. Виконання команди:",
              "",
              "`git push origin main`",
              "",
              "буквально перекладається як:",
              "",
              "*Піди в гілку, що називається \"main\" в моєму репозиторії, візьми всі коміти, піди у віддалений \"main\", що називається \"origin\". Додай ті коміти, яких немає в цій гілці і надрукуй, що саме ти зробив.*",
              "",
              "Вказуючи `main` в якості аргумента \"place\", ми сказали git-у, *звідки* взяти коміти і *куди* їх додати. (\"Place\") - фактично точка синхронізації двох репозиторіїв.",
              "",
              "Пам'ятайте, що оскільки ми надали git-у всю необхідну інформацію (вказавши обидва аргументи), не має значення яка гілка є зараз поточною!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Розгляньмо приклад використання аргументів. Зверніть увагу на поточну гілку в цьому прикладі."
            ],
            "afterMarkdowns": [
              "Ось так! `main` у віддаленому репозиторії оновився, оскільки ми вказали його в аргументах."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "А якщо не вказувати аргументів? Що станеться?"
            ],
            "afterMarkdowns": [
              "Команда поверне помилку (як можна побачити), оскільки локальний `HEAD` не співпадає з відповідною віддаленою гілкою."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Гаразд, на цьому рівні оновімо віддалені гілки `foo` і `main`. Для ускладнення ми заборонимо використовувати `git checkout`!",
              "",
              "*Пам'ятай, віддалені гілки позначені префіксом `o/`, оскільки повний префікс `origin/` не влазить в наш UI. Але не хвилюйся ",
              "про це... ти можеш використовувати `origin` посилаючись на віддалений репозиторій.*"
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
              "## Tham số đẩy",
              "",
              "Tuyệt! Bạn đã biết đến theo dõi từ xa, giờ thì ta có thể tìm hiểu sâu hơn về cách hoạt động của đẩy (`git push`), tìm nạp (`git fetch`) và kéo (`git pull`). Ta sẽ giải quyết từng câu lệnh một nhưng về căn bản chúng khá là giống nhau.",
              "",
              "Trước hết hãy xem qua `git push`. Trong bài học về theo dõi từ xa bạn đã biết rằng Git sử dụng thuộc tính (nhánh từ xa mà nó \"theo dõi\") của nhánh hiện tại để xác định kho và nhánh từ xa để đẩy. Git làm việc này mà không cần tham số chỉ định, nhưng lệnh git push có thể thêm tham số dưới dạng sau:",
              "",
              "`git push <tên kho chứa từ xa> <vị trí>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Tham số `<vị trí>` là gì vậy? Chúng ta sẽ đi sâu vào chi tiết sau, hãy xem ví dụ trước. Câu lệnh:",
              "",
              "`git push origin main`",
              "",
              "được dịch lại là:",
              "",
              "*Chuyển sang nhánh \"main\" trong kho lưu trữ cục bộ, nhận tất cả các commit và tìm nhánh \"main\" trong kho chứa từ xa tên là \"origin\". Thêm tất cả các commit không có trong nhánh đó và báo cho tôi biết khi nào hoàn tất.*",
              "",
              "Bằng cách chỉ định `main` trong tham số \"vị trí\", ta báo với Git nơi mà commit *xuất phát* và nơi chúng *sẽ đến*. Về căn bản nó là \"địa điểm\" để đồng bộ hóa 2 kho chứa.",
              "",
              "Lưu ý rằng ta đã thông báo cho Git tất cả thông tin cần thiết (thông qua chỉ định 2 tham số), nó sẽ không quan tâm nhánh mà ta đang đứng!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Hãy xem xét một ví dụ về việc xác định tham số. Lưu ý vị trí nhánh mà ta đang đứng."
            ],
            "afterMarkdowns": [
              "Được rồi! Bằng cách chỉ định các tham số, nhánh `main` trong kho lưu trữ từ xa đã được cập nhật."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Giả sử ta không chỉ định các tham số thì sao? Điều gì sẽ xảy ra?"
            ],
            "afterMarkdowns": [
              "Lệnh thất bại (như bạn có thể thấy, không có gì xảy ra)! Bởi vì `HEAD` không trỏ đến nhánh nào có theo dõi từ xa."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Được rồi, trong cấp độ này hãy cập nhánh `foo` và `main` trên kho lưu trữ từ xa. Cái khó là ở cấp độ này lệnh `git checkout` đã bị vô hiệu hóa!",
              "",
              "*Chú ý: Các nhánh từ xa được đánh dấu bằng tiền tố `o/` bời vì UI của chúng tôi không chứa được hết `origin/`. Đừng lo ",
              "về vấn đề này... đơn giản cứ dùng `origin` như bình thường thôi.*"
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
              "## Push argumenti",
              "",
              "Super! Sedaj, ko poznaš oddaljeno sledenje branchev lahko začnemo odkrivati skrivnosti za git pushem, fetchem in pullom. Napadli bomo en ukaz za drugim, ampak koncepti za njimi so si podobni.",
              "",
              "Najprej bomo pogledali `git push`. V lekciji o oddaljenem sledenju si spoznal, da je git ugotovil oddaljen repo *in* branch za pushat s tem da je pogledal lastnosti trenutno checkoutanega brancha (oddaljen branch, ki ga  \"sledi\"). To je obnašanje brez argumentov, ampak git push lahko sprejme tudi argumente v sledeči obliki:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Kaj je `<place>` parameter praviš? Kmalu bomo zaplavali v podrobnosti, ampak najprej primer. Izvedba ukaza:",
              "",
              "`git push origin main`",
              "",
              "se v slovenščini prevede v:",
              "",
              "*Pojdi na branch poimenovan \"main\" na mojem repozitoriju, zgrabi vse commite in nato pojdi na branch \"main\" na oddaljenem repotu poimenovanem \"origin\". Postavi vse commite, ki manjkajo na branch in me obvesti, ko končaš.*",
              "",
              "Z določanjem `masterja` kot \"place\" argument, smo povedali gitu iz kje bodo commiti *prišli* in kam bodo commiti *šli*. V bistvu je to \"mesto\" oziroma \"lokacija\" za uskladitev med dvema repozitorijema.",
              "",
              "Imej v mislih, da ker smo gitu povedali vse kar mora vedeti (s podajanjem obeh argumentov), git povsem ignorira mesto, kjer smo checkoutani!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Poglejmo si primer podajanja argumentov. Bodi pozoren na mesto, kjer smo checkoutani v tem primeru."
            ],
            "afterMarkdowns": [
              "Evo ga! `main` je bil posodobljen na oddaljenem repotu, ker smo podali te argumente."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Kaj če ne bi podali argumentov? Kaj bi se zgodilo?"
            ],
            "afterMarkdowns": [
              "Ukaz ne uspe (kot lahko vidiš), ker `HEAD` ni checkoutan na branchu, ki ga oddaljeno sledimo."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, za to stopnjo posodobimo oba `foo` in `main` na oddaljenem repotu. Trik je, da je `git checkout` onemogočen za to stopnjo!",
              "",
              "*Opomba: Oddaljeni branchi so označeni z `o/` predpono, ker celotna `origin/` oznaka ne paše v naš prikaz. Ne skrbi ",
              "glede tega ... preprosto uporabi `origin` kot ime oddaljenega repota kot ponavadi.*"
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
              "## Argumenty push",
              "",
              "Świetnie! Teraz, kiedy wiesz już, jak działa śledzenie zdalnych gałęzi, możemy zacząć zgłębiać tajemnice pracy z git push, fetch i pull. Zmierzymy się z tymi poleceniami po kolei, ale idea działania każdego z nich jest bardzo podobna.",
              "",
              "Najpierw spójrzmy na `git push`. Z lekcji o remote tracking wiesz, że Git określa zdalne repozytorium *oraz* gałąź docelową dzięki właściwościom aktualnie wybranej gałęzi (\"śledzącej\" zdalną). Tak to działa, jeśli nie określisz żadnych argumentów, ale git push może też przyjąć opcjonalnie następujące argumenty:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pytasz, czego dotyczy parametr `<place>`? Zaraz zajmiemy się tym konkretnie, ale najpierw przykład. Polecenie Gita:",
              "",
              "`git push origin main`",
              "",
              "to, mówiąc po ludzku:",
              "",
              "*Przejdź do gałęzi o nazwie \"main\" w moim repozytorium, weź wszystkie commity, a potem idź do gałęzi \"main\" na zdalnym repozytorium, które nazywa się \"origin\". Umieść na tej gałęzi wszystkie commity, których tam jeszcze nie ma, i daj znać, jak skończysz.*",
              "",
              "Wpisując `main` w miejscu argumentu \"place\" (miejsce), powiedzieliśmy Gitowi, *skąd ma wziąć* commity i *gdzie je umieścić*. To w zasadzie właśnie \"miejsce\", czyli \"lokalizacja\" do zsynchronizowania na obu repozytoriach.",
              "",
              "Pamiętaj, że skoro powiedzieliśmy Gitowi wszystko, co musi wiedzieć (podając oba argumenty), będzie kompletnie ignorować, jakie miejsce mamy aktualnie wybrane!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Spójrzmy na przykład określający argumenty. Zwróć uwagę na wybrany commit (checkout)."
            ],
            "afterMarkdowns": [
              "No i proszę! Zaktualizowaliśmy `main` na zdalnym repozytorium, ponieważ określiliśmy argumenty."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "A gdybyśmy nie określili argumentów? Co by się stało?"
            ],
            "afterMarkdowns": [
              "Polecenie (jak widzisz) nie działa, ponieważ `HEAD` nie jest wybrany na gałęzi śledzącej."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Oki, na tym poziomie uaktualnijmy zarówno `foo`, jak i `main` na zdalnym repozytorium. Haczyk polega na tym, że zablokowaliśmy na tym poziomie `git checkout`!",
              "",
              "*Uwaga: Zdalne gałęzie mają przedrostek `o/`, ponieważ pełna nazwa `origin/` nie mieści się w naszym interfejsie. Nie przejmuj się tym... ",
              "po prostu użyj `origin` jako nazwy zdalnego repozytorium.*"
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
              "## Parametri di git push",
              "",
              "Ottimo! Ora che hai presente cos'è il tracciamento remoto dei rami possiamo dare un'occhiata ad alcuni dei misteri dietro al funzionamento di git push, fetch e pull. Affronteremo un comando alla volta ma i concetti tra questi saranno molto simili.",
              "",
              "Come prima cosa daremo un'occhiata a `git push`. Hai imparato nella lezione sul tracciamento remoto che git decide il ramo remoto *e* il ramo su cui caricare i dati osservando le proprietà del ramo su cui stiamo lavorando attualmente (il remoto che sta \"tracciando\"). Questo è il comportamento senza parametri aggiunti, ma git push può prendere dei parametri aggiuntivi nella forma di:",
              "",
              "`git push <remote> <place>`",
              "",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "E cosa indica il parametro `<place>`? Vedremo presto le specifiche, ma prima un esempio. Il comando:",
              "",
              "`git push origin main`",
              "",
              "equivale a questo in italiano:",
              "",
              "*Vai al ramo chiamato \"main\" nel mio repository locale, prendi tutti i commit, poi vai nel ramo \"main\" sul repository remoto chiamato \"origin\". Mettici tutti i commit che mancano e poi dimmi quando hai finito.*",
              "",
              "Specificando `main` come parametro \"place\", abbiamo detto a git da dove tutti i commit *proverranno* e dove i commit *dovranno andare*. Si tratta essenzialmente del \"luogo\" o \"posizione\" da sincronizzare tra i due repository.",
              "",
              "Tieni a mente che poiché abbiamo detto a git tutto ciò che gli serve sapere (specificando entrambi i parametri), non tiene conto del ramo sul quale ci troviamo attualmente!"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Vediamo un esempio dove specifichiamo i parametri. Da notare la posizione su cui ci troviamo attualmente in questo esempio."
            ],
            "afterMarkdowns": [
              "Ecco qui! `main` è stato aggiornato sul repository remoto come specificato dai parametri."
            ],
            "command": "git checkout C0; git push origin main",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "E se non avessimo specificato i parametri? Cosa succederebbe?"
            ],
            "afterMarkdowns": [
              "Il comando fallisce (come puoi vedere), in quanto `HEAD` non si trova su un ramo che traccia il remoto."
            ],
            "command": "git checkout C0; git push",
            "beforeCommand": "git clone; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ok, per questo livello aggiorniamo sia il ramo `foo` che `main` sul remoto. Attenzione perché git checkout è disabilitato per questo livello!",
              "",
              "*Nota: I rami remoti hanno i prefissi `o/` perché `origin/` non si adattava bene alla nostra interfaccia. Non preoccuparti ",
              "... usa pure `origin` come nome del repository remoto come sempre.*"
            ]
          }
        }
      ]
    }
  }
};
