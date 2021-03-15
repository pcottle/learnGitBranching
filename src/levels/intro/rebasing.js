exports.level = {
  goalTreeString:
    "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22master%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22bugFix%22%2C%22id%22%3A%22HEAD%22%7D%7D",
  solutionCommand:
    "git checkout -b bugFix;git commit;git checkout main;git commit;git checkout bugFix;git rebase main",
  name: {
    en_US: "Rebase Introduction",
    de_DE: "Einführung in Rebase",
    ja: "Rebaseの解説",
    es_AR: "Introducción a rebase",
    es_MX: "Introducción a rebase",
    es_ES: "Introducción a rebase",
    pt_BR: "Introdução ao rebase",
    gl: "Introducción a rebase",
    fr_FR: "Introduction à rebase",
    ko: "리베이스(rebase)의 기본",
    zh_CN: "Git Rebase",
    zh_TW: "介紹 rebase",
    ru_RU: "Введение в rebase",
    uk: "Знайомство з rebase",
    vi: "Giới thiệu về rebase",
    sl_SI: "Uvod v Rebase",
    pl: "Wprowadzenie do Rebase",
    it_IT: "Introduzione al rebase (ribasare)",
  },
  hint: {
    en_US: "Make sure you commit from bugFix first",
    de_DE: "Geh vor dem committen sicher, dass du auf bugFix arbeitest",
    ja: "初めにbugFixを指した状態でコミットする",
    fr_FR: "Assurez-vous de bien faire votre commit sur bugFix en premier",
    es_AR: "Asegurate de commitear desde bugFix primero",
    es_MX: "Asegúrate de hacer commit desde bugFix primero",
    es_ES: "Asegúrate de hacer commit desde bugFix primero",
    pt_BR: "O bugFix precisa ser commitado primeiro",
    gl: "Asegurate de facer o commit dende bugFix primeiro",
    ko: "bugFix 브랜치에서 먼저 커밋하세요",
    zh_CN: "先在 bugFix 分支上进行提交",
    zh_TW: "你要先在 bugFix branch 進行 commit",
    ru_RU: "Убедись, что сделал коммит в ветке bugFix",
    uk: "Впевнись, що зробив коміт в гілці bugFix",
    vi: "Hãy chắc chắn rằng bạn commit từ bugFix trước",
    sl_SI: "Prepričaj se, da si najprej commital bugFix.",
    pl: "Upewnij się, że masz commit z bugFix",
    it_IT: "Assicurati di fare prima il commit da bugFix",
  },
  disabledMap: {
    "git revert": true,
  },
  startDialog: {
    en_US: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'The second way of combining work between branches is *rebasing.* Rebasing essentially takes a set of commits, "copies" them, and plops them down somewhere else.',
              "",
              "While this sounds confusing, the advantage of rebasing is that it can be used to make a nice linear sequence of commits. The commit log / history of the repository will be a lot cleaner if only rebasing is allowed.",
              "",
              "Let's see it in action...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Here we have two branches yet again; note that the bugFix branch is currently selected (note the asterisk)",
              "",
              "We would like to move our work from bugFix directly onto the work from main. That way it would look like these two features were developed sequentially, when in reality they were developed in parallel.",
              "",
              "Let's do that with the `git rebase` command.",
            ],
            afterMarkdowns: [
              "Awesome! Now the work from our bugFix branch is right on top of main and we have a nice linear sequence of commits.",
              "",
              'Note that the commit C3 still exists somewhere (it has a faded appearance in the tree), and C3\' is the "copy" that we rebased onto main.',
              "",
              "The only problem is that main hasn't been updated either, let's do that now...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Now we are checked out on the `main` branch. Let's go ahead and rebase onto `bugFix`...",
            ],
            afterMarkdowns: [
              "There! Since `main` was an ancestor of `bugFix`, git simply moved the `main` branch reference forward in history.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "To complete this level, do the following",
              "",
              "* Checkout a new branch named `bugFix`",
              "* Commit once",
              "* Go back to main and commit again",
              "* Check out bugFix again and rebase onto main",
              "",
              "Good luck!",
            ],
          },
        },
      ],
    },
    de_DE: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'Der zweite Weg um Inhalte aus verschiedenen Branches zu kombinieren ist `git rebase`. Rebasen nimmt im Prinzip eine Menge von Commits, "kopiert" sie und packt sie auf etwas anderes drauf.',
              "",
              "Auch wenn das erst mal komisch klingt, liegt der Vorteil von Rebase darin, dass man es benutzen kann um hübsch lineare Abfolgen von Commits zu erhalten. Das Commit-Protokoll des Repositorys wird durch Rebase eine ganze Ecke einfacher aussehen, weil Merge Commits vermieden werden.",
              "",
              "Schauen wir's uns mal in Aktion an ...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Hier haben wir wieder zwei Branches; wie du siehst ist `bugFix` aktuell ausgewählt (sieht man am `*`).",
              "",
              "Wir würden jetzt gerne unsere Arbeit aus `bugFix` direkt auf den `main` packen. Das Ergebnis wäre, dass alle aktuellen Änderungen in `main` auch im Branch `bugFix` sind.",
              "",
              "Das machen wir mit dem Befehl `git rebase`:",
            ],
            afterMarkdowns: [
              "Hammer! Was wir in `bugFix` gemacht haben ist jetzt oben auf `main` draufgepackt und wir haben eine schön lineare Abfolge von Commits bekommen.",
              "",
              'Commit `C3` existiert immer noch irgendwo (deswegen ist er blass dargestellt) und `C3\'` ist die "Kopie" die wir auf den `main` gepackt haben.',
              "",
              "Aber `main` ist jetzt nicht aktualisiert worden, lass uns das gerade noch nachholen ...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Jetzt sind wir im `main`. Lass uns den mal auf `bugFix` rebasen ...",
            ],
            afterMarkdowns: [
              "So! Da `main` ein Vorgänger von `bugFix` war konnte Git hier einfach den Bezeichner `main` auf denselben Commit schieben, auf den auch `bugFix` zeigt.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Um dieses Level abzuschließen musst du folgendes tun:",
              "",
              "* Einen neuen Branch namens `bugFix` auschecken",
              "* Einen Commit machen",
              "* Zurück zum `main` wechseln und noch einmal committen",
              "* `bugFix` auschecken und auf den `main` rebasen",
              "",
              "Viel Erfolg!",
            ],
          },
        },
      ],
    },
    ja: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              "ブランチを一つにまとめる方法として前回はマージを紹介しましたが、今回紹介するリベースを使うこともできます。リベースの動作は、マージするコミットのコピーをとって、どこかにストンと落とすというイメージです。",
              "",
              "ピンと来ないかもしれませんが、リベースのメリットは一本の連続したコミットに整形できることです。リベースだけ使っていると、コミットのログや履歴が非常にクリーンな状態に保たれます。",
              "",
              "早速実際にどう動くのかを見てみましょう。",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "前回と同様の2つのブランチを考えます。仮にいまbugFixブランチをチェックアウトしているとします。（アスタリスクつきのもの）",
              "",
              "bugFixに入ってる作業内容をそのまま直接masterブランチ上の内容に移動したいとします。こうすることで、実際には並行して開発された2つの別々のブランチ上の機能のソースを、あたかも1本のブランチ上で連続して開発されていたかのように見せることができます。",
              "",
              "`git rebase`コマンドでそれをやってみましょう。",
            ],
            afterMarkdowns: [
              "できました！これでbugFixブランチの作業内容はmasterブランチのすぐ先に移動したので、見た目が一本になってスッキリしました。",
              "",
              "気を付けてほしいのは、C3コミットはどこかに残ってるということ（ツリーの中で半透明にしてあります）、そしてC3'は（C1との接続が切れているC3の）コピーがmasterブランチ上に作られているということです。",
              "",
              "一つ問題が残ってて、masterブランチがまだ最新化されていませんね。ちょっと直してみましょう。。",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "masterブランチにチェックアウトしてあります。この状態からmasterブランチを`bugFix`へとリベースしてみましょう。",
            ],
            afterMarkdowns: [
              "できた！`main`は`bugFix`の直前のコミットだったので、gitは単純に`main`ブランチのポインタを前に進めただけでした。",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "以下の作業で理解度の確認をしてみましょう。",
              "",
              "* `bugFix`という名前の新しいブランチをチェックアウトする",
              "* 一回だけコミット",
              "* masterブランチに戻ってもう1回コミット",
              "* bugFixをもう1回チェックアウトして、master上にリベース",
              "",
              "幸運を祈る！",
            ],
          },
        },
      ],
    },
    es_AR: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'El segundo modo de combinar el trabajo de distintas ramas es el *rebase*. Rebasear esencialmente agarra un conjunto de commits, los "copia", y los aplica sobre algún otro lado.',
              "",
              "Aunque esto pueda sonar confuso, la ventaja de rebasear es que puede usarse para conseguir una secuencia de commits lineal, más bonita. El historial / log de commits del repositorio va a estar mucho más claro si sólo usás rebase.",
              "",
              "Veámoslo en acción...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Acá tenemos dos ramas otra vez. Notar que la rama bugFix está actualmente seleccionada (tiene un asterisco)",
              "",
              "Nos gustaría mover nuestro trabajo de bugFix directamente sobre el trabajo de main. De ese modo, parecería que esas dos tareas se desarrollaron secuencialmente, cuando en realidad se hicieron en paralelo.",
              "",
              "Hagámoslo usando el comando `git rebase`.",
            ],
            afterMarkdowns: [
              "¡Genial! Ahora el trabajo de nuestra rama bugFix está justo encima del de main, y tenemos una secuencia lineal de commits.",
              "",
              'Notá que el commit C3 sigue existiendo en algún lado (aparece medio desvanecido en el árbol), y C3\' es la "copia" que rebaseamos sobre main.',
              "",
              "El único problema es que main todavía no se actualizó, resolvámoslo ahora...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Ahora estamos parados sobre la rama `main`. Avancemos y rebaseémosla sobre `bugFix`...",
            ],
            afterMarkdowns: [
              "¡Ahí está! Como `main` era un ancestro de `bugFix`, git simplemente movió la referencia de `main` hacia adelante en la historia.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Para completar este nivel, hacé lo siguiente:",
              "",
              "* Checkouteá una nueva rama llamada `bugFix`",
              "* Commiteá una vez",
              "* Volvé a main y commiteå de nuevo",
              "* Checkoutá bugFix otra vez y rebaseala sobre main",
              "",
              "¡Éxitos!",
            ],
          },
        },
      ],
    },
    es_MX: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'El segundo modo de combinar el trabajo de distintas ramas es el *rebase*. Rebasear esencialmente agarra un conjunto de commits, los "copia", y los aplica sobre algún otro lado.',
              "",
              "Aunque esto pueda sonar confuso, la ventaja de rebasear es que puede usarse para conseguir una secuencia de commits lineal, más bonita. El historial / log de commits del repositorio va a estar mucho más claro si sólo usas rebase.",
              "",
              "Veámoslo en acción...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Acá tenemos dos ramas otra vez. Nota que la rama bugFix está actualmente seleccionada (tiene un asterisco)",
              "",
              "Nos gustaría mover nuestro trabajo de bugFix directamente sobre el trabajo de main. De ese modo, parecería que esas dos tareas se desarrollaron secuencialmente, cuando en realidad se hicieron en paralelo.",
              "",
              "Hagámoslo usando el comando `git rebase`.",
            ],
            afterMarkdowns: [
              "¡Genial! Ahora el trabajo de nuestra rama bugFix está justo encima del de main, y tenemos una secuencia lineal de commits.",
              "",
              'Notá que el commit C3 sigue existiendo en algún lado (aparece medio desvanecido en el árbol), y C3\' es la "copia" que rebaseamos sobre main.',
              "",
              "El único problema es que main todavía no se actualizó, resolvámoslo ahora...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Ahora estamos parados sobre la rama `main`. Avancemos y rebaseémosla sobre `bugFix`...",
            ],
            afterMarkdowns: [
              "¡Ahí está! Como `main` era un ancestro de `bugFix`, git simplemente movió la referencia de `main` hacia adelante en la historia.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Para completar este nivel, haz lo siguiente:",
              "",
              "* Cámbiate a una nueva rama llamada `bugFix`",
              "* Haz un commit de una vez",
              "* Vuelve a main y haz commit de nuevo",
              "* Cámbiate a la rama bugFix otra vez y rebaséala sobre main",
              "",
              "¡Éxitos!",
            ],
          },
        },
      ],
    },
    es_ES: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'El segundo modo de combinar el trabajo de distintas ramas es el *rebase*. Hacer rebase escencialmente selecciona un conjunto de commits, los "copia", y los aplica en algún otro lado.',
              "",
              "Aunque esto pueda sonar confuso, la ventaja de hacer rebase es que puede usarse para conseguir una secuencia de commits lineal, más bonita. El historial / log de commits del repositorio va a estar mucho más claro si sólo usas rebase.",
              "",
              "Veámoslo en acción...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Aquí tenemos dos ramas otra vez. Observa que la rama bugFix está actualmente seleccionada (tiene un asterisco)",
              "",
              "Nos gustaría mover nuestro trabajo de bugFix directamente sobre el trabajo de main. De ese modo, parecería que esas dos tareas se desarrollaron secuencialmente, cuando en realidad se hicieron en paralelo.",
              "",
              "Hagámoslo usando el comando `git rebase`.",
            ],
            afterMarkdowns: [
              "¡Genial! Ahora el trabajo de nuestra rama bugFix está justo encima del de main, y tenemos una secuencia lineal de commits.",
              "",
              'Nota que el commit C3 sigue existiendo en algún lado (aparece medio desvanecido en el árbol), y C3\' es la "copia" que rebaseamos sobre main.',
              "",
              "El único problema es que main todavía no se actualizó, resolvámoslo ahora...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Ahora estamos parados sobre la rama `main`. Avancemos y hagamos rebase sobre `bugFix`...",
            ],
            afterMarkdowns: [
              "¡Ahí está! Como `main` era un ancestro de `bugFix`, git simplemente movió la referencia de `main` hacia adelante en la historia.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Para completar este nivel, haz lo siguiente:",
              "",
              "* Haz checkout de una nueva rama llamada `bugFix`",
              "* Crea un commit",
              "* Vuelve a la rama main y crea otro commit",
              "* Haz checkout en bugFix otra vez y haz rebase sobre main",
              "",
              "¡Misión cumplida!",
            ],
          },
        },
      ],
    },
    pt_BR: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Rebase no Git",
              "",
              'A segunda forma de combinar trabalho entre ramos é o *rebase*. O rebase essencialmente pega um conjunto de commits, "copia" os mesmos, e os despeja em outro lugar.',
              "",
              "Isso pode parecer confuso, mas a vantagem do rebase é que ele pode ser usado para construir uma sequência mais bonita e linear de commits. O registro de commits (história do repositório) ficará muito mais limpa se for utilizado apenas rebase em vez de merge.",
              "",
              "Vejamo-lo em ação...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Aqui temos dois ramos novamente; note que o ramo bugFix está atualmente ativo (veja o asterisco)",
              "",
              "Queremos mover nosso trabalho do bugFix diretamente dentro do main. Desta forma, vai parecer que esses dois recursos foram desenvolvidos sequencialmente, quando na realidade foram feitos em paralelo.",
              "",
              "Vamos fazê-lo com o comando `git rebase`.",
            ],
            afterMarkdowns: [
              "Incrível! Agora o trabalho do nosso ramo bugFix está logo após o do main, e temos uma linda sequência linear de commits.",
              "",
              'Perceba que o commit C3 ainda existe em algum lugar (ele está clareado na árvore), e que o C3\' é a "cópia" que rebaseamos no main.',
              "",
              "O único problema é que o main não foi atualizado também, vamos fazê-lo agora...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Agora o ramo `main` está ativo. Vamos em frente, fazer rebase no `bugFix`...",
            ],
            afterMarkdowns: [
              "Aí está! Como o `main` era um ancestral do `bugFix`, o git simplesmente moveu a referência do ramo `main` para frente na história.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Para completar este nível, faça o seguinte",
              "",
              "* Faça checkout de um novo branch chamado `bugFix`",
              "* Faça um commit",
              "* Volte ao main e faça um novo commit",
              "* Faça checkout do bugFix novamente e faça rebase no main",
              "",
              "Boa sorte!",
            ],
          },
        },
      ],
    },
    gl: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Rebase en Git",
              "",
              'A segunda forma de mesturar traballo entre ramas é o *rebase*. O rebase esencialmente pega un conxunto de commits, "copia" os commits, e os sitúa en outro lugar.',
              "",
              "Esto pode paracer confuso, pero a vantaxe do rebase é que se pode usar para construír unha secuencia  máis bonita e linial de commits. O rexisto de commits do repositorio estará máis limpo se só se permite facer rebases.",
              "",
              "Ímolo ver en acción...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Aquí temos dúas ramas novamente; decátate de que a rama `bugFix` está seleccionada (olla ó asterisco)",
              "",
              "Queremos mover o noso traballo do `bugFix` directamente dentro da rama `main`. Desta forma, vai parecer que eses dous recursos foron editados secuencialmente, cando a realidade é que se fixeron en paralelo.",
              "",
              "Imos lanzar o comando `git rebase`.",
            ],
            afterMarkdowns: [
              "¡Buah chorvo! Agora o traballo da nosa rama `bugFix` está seguida de main, e temos unha fermosa línea de commits.",
              "",
              'Percibe que o commit `C3` aínda existe nalgún lugar (el está borrado na árbore), e que `C3\'` é a "copia" que rebasamos en main.',
              "",
              "O único problema é que a rama main non foi actualizada tamén, ímolo facer agora...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Agora a rama `main` está ativa. Continuamos facendo o rebase na `bugFix`...",
            ],
            afterMarkdowns: [
              "¡Xa está! Como `main` era um ancestro de `bugFix`, git simplemente moveu a referencia da rama `main` máis adiante na historia.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Para completar este nivel, fai o seguinte",
              "",
              "* Fai checkout de un novo branch chamado `bugFix`",
              "* Fai un commit",
              "* Regresa a main e fai un commit novamente",
              "* Móvete á rama bugFix outra vez e fai rebase sobre main",
              "",
              "Boa sorte!",
            ],
          },
        },
      ],
    },
    fr_FR: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'La seconde façon de combiner les contenus de deux branches est *rebase*. Rebase prend un ensemble de commits, les "recopie", et les ajoute en bout de chaîne à un autre endroit.',
              "",
              "Bien que cela puisse sembler compliqué, l'avantage de rebase est de permettre d'obtenir une simple séquence linéaire de commits. Les logs/l'historique du dépôt seront bien plus propres si seul rebase est autorisé (plutôt que merge).",
              "",
              "Voyons rebase en action…",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Ici nous avons encore une fois deux branches; notez que nous sommes sur la branche bugFix (cf. l'astérisque)",
              "",
              "Nous voudrions transférer notre travail de la branche 'bugFix' directement sur le travail existant dans 'main'. Ainsi on aurait l'impression que ces deux travaux ont été développés séquentiellement alors qu'en réalité ils ont été réalisés en parallèle.",
              "",
              "Faisons cela avec la commande `git rebase`.",
            ],
            afterMarkdowns: [
              "Super! Désormais, le travail de la branche 'bugFix' est juste en haut de la branche 'main' et nous avons une belle séquence linéaire de commits.",
              "",
              "Notez que le commit C3 existe toujours quelque part (il est en grisé sur l'arbre), et C3' est la  \"copie\" que nous avons créée sur main avec rebase.",
              "",
              "Le seul problème est que main n'a pas été mis à jour, faisons cela maintenant…",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Nous sommes désormais positionnés sur la branche `main`. Continuons en faisant le rebase sur `bugFix`…",
              "Et voilà ! Puisque `main` était un ascendant de `bugFix`, git a simplement déplacé la référence de la branche `main` en avant dans le temps.",
            ],
            afterMarkdowns: [
              "Voilà vous avez vu comment cela fonctionne",
              "",
              "Continuons et essayons ce niveau !",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Pour accomplir ce niveau, faites les opérations suivantes",
              "",
              "* Positionnez-vous (checkout) sur une nouvelle branche nommée `bugFix`",
              "* Faites un commit",
              "* Retournez sur main et faites un nouveau commit",
              "* Positionnez-vous à nouveau sur bugFix et faites un rebase sur main",
              "",
              "Bonne chance !",
            ],
          },
        },
      ],
    },
    zh_CN: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              "第二种合并分支的方法是 `git rebase`。Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。",
              "",
              "Rebase 的优势就是可以创造更线性的提交历史，这听上去有些难以理解。如果只允许使用 Rebase 的话，代码库的提交历史将会变得异常清晰。",
              "",
              "咱们还是实际操作一下吧……",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "还是准备了两个分支；注意当前所在的分支是 bugFix（星号标识的是当前分支）",
              "",
              "我们想要把 bugFix 分支里的工作直接移到 main 分支上。移动以后会使得两个分支的功能看起来像是按顺序开发，但实际上它们是并行开发的。",
              "",
              "咱们这次用 `git rebase` 实现此目标",
            ],
            command: "git rebase main",
            afterMarkdowns: [
              "怎么样？！现在 bugFix 分支上的工作在 main 的最顶端，同时我们也得到了一个更线性的提交序列。",
              "",
              "注意，提交记录 C3 依然存在（树上那个半透明的节点），而 C3' 是我们 Rebase 到 main 分支上的 C3 的副本。",
              "",
              "现在唯一的问题就是 main 还没有更新，下面咱们就来更新它吧……",
            ],
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "现在我们切换到了 `main` 上。把它 rebase 到 `bugFix` 分支上……",
            ],
            command: "git rebase bugFix",
            afterMarkdowns: [
              "好了！由于 `bugFix` 继承自 `main`，所以 Git 只是简单的把 `main` 分支的引用向前移动了一下而已。",
            ],
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "要完成此关，执行以下操作：",
              "",
              "* 新建并切换到 `bugFix` 分支",
              "* 提交一次",
              "* 切换回 main 分支再提交一次",
              "* 再次切换到 bugFix 分支，rebase 到 main 上",
              "",
              "祝你好运！",
            ],
          },
        },
      ],
    },
    zh_TW: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## git rebase",
              "",
              '*rebasing* 是 merge branch 的第二種方法。rebasing 就是取出一連串的 commit，"複製"它們，然後把它們接在別的地方。',
              "",
              "雖然聽起來難以理解，rebasing 的優點是可以建立更線性的 commit history。假如只允許使用 rebasing 的話，則我們的 repo 中的 commit log 或者是 commit history 會更加簡潔好看。",
              "",
              "讓我們親身體會一下...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "這裡，還是有兩個 branch；注意目前我們所在的 branch 是 bugFix（看那顆星啦）",
              "",
              "我們想要把在 bugfix 所做的修改直接移到 main branch上。使用 rebasing 的話，兩個 branch 看起來像是依序按順序進行修改，實際上它們的修改是平行進行的。",
              "",
              "用 `git rebase` 來實現吧",
            ],
            command: "git rebase main",
            afterMarkdowns: [
              "很厲害吧！現在 bugFix branch 上的工作在 main branch 的最前端，同時我們也得到了一個更加線性的 commit 順序。",
              "",
              '注意，本來的 commit C3 沒有消失（在圖上面呈現陰影），而我們"複製" C3，將它的副本 C3\' 接在 main branch 的後面。',
              "",
              "現在唯一的問題是 main branch 還沒有更新...我們接下來就更新它吧！",
            ],
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "現在，切換到 `main` branch。接下來就把它 rebase 到 `bugFix` 上面吧...",
            ],
            command: "git rebase bugFix",
            afterMarkdowns: [
              "完成！因為 `main` branch 是 `bugFix` 的 parent，所以 git 只是把 `main` branch 往前移動到 `bugFix` 上。",
            ],
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "想完成這一關，執行以下操作：",
              "",
              "* 建立 `bugFix` branch",
              "* commit 一次",
              "* 切換回 main branch 再 commit 一次",
              "* 再次切換到 bugFix branch，接著 rebase bugFix 這個 branch 到 main branch 上",
              "",
              "祝你好運啦！",
            ],
          },
        },
      ],
    },
    ko: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git 리베이스(Rebase)",
              "",
              "브랜치끼리의 작업을 접목하는 두번째 방법은 *리베이스(rebase)*입니다. 리베이스는 기본적으로 커밋들을 모아서 복사한 뒤, 다른 곳에 떨궈 놓는 것입니다.",
              "",
              "조금 어렵게 느껴질 수 있지만, 리베이스를 하면 커밋들의 흐름을 보기 좋게 한 줄로 만들 수 있다는 장점이 있습니다. 리베이스를 쓰면 저장소의 커밋 로그와 이력이 한결 깨끗해집니다.",
              "",
              "어떻게 동작하는지 살펴볼까요...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "여기 또 브랜치 두 개가 있습니다; bugFix브랜치가 현재 선택됐다는 점 눈여겨 보세요 (별표 표시)",
              "",
              "bugFix 브랜치에서의 작업을 main 브랜치 위로 직접 옮겨 놓으려고 합니다. 그렇게 하면, 실제로는 두 기능을 따로따로 개발했지만, 마치 순서대로 개발한 것처럼 보이게 됩니다.",
              "",
              "`git rebase` 명령어로 함께 해보죠.",
            ],
            afterMarkdowns: [
              "오! 이제 `bugFix` 브랜치의 작업 내용이 `main`의 바로 위에 깔끔한 한 줄의 커밋으로 보이게 됐습니다.",
              "",
              "C3 커밋은 어딘가에 아직 남아있고(그림에서 흐려짐), C3'는 `main` 위에 올려 놓은 복사본입니다.",
              "",
              "`main`이 아직 그대로라는 문제가 남아있는데요, 바로 해결해보죠...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "우리는 지금 `main` 브랜치를 선택한 상태입니다. `bugFix` 브랜치쪽으로 리베이스 해보겠습니다...",
            ],
            afterMarkdowns: [
              "보세요! `main`이 `bugFix`의 부모쪽에 있었기 때문에, 단순히 그 브랜치를 더 앞쪽의 커밋을 가리키게 이동하는 것이 전부입니다.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "이하 작업을 하면 이번 레벨을 통과합니다",
              "",
              "* `bugFix`라는 새 브랜치를 만들어 선택하세요",
              "* 커밋 한 번 합니다",
              "* `main` 브랜치로 돌아가서 또 커밋합니다",
              "* `bugFix`를 다시 선택하고 `main`에 리베이스 하세요",
              "",
              "화이팅!",
            ],
          },
        },
      ],
    },
    ru_RU: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              "Второй способ объединения изменений в ветках - это *rebasing*. При ребейзе Git по сути копирует набор коммитов и переносит их в другое место.",
              "",
              "Несмотря на то, что это звучит достаточно непонятно, преимущество `rebase` в том, что c его помощью можно делать чистые и красивые линейные последовательности коммитов. История коммитов будет чище, если вы применяете `rebase`.",
              "",
              "Посмотрим, как это работает...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "У нас здесь снова две ветки. Обрати внимание, что выбрана ветка `bugFix` (отмечена звёздочкой)",
              "",
              "Хочется сдвинуть наши изменения из `bugFix` прямо на вершину ветки `main`. Благодаря этому всё будет выглядеть, как будто эти изменения делались последовательно, хотя на самом деле - параллельно.",
              "",
              "Применим `git rebase`.",
            ],
            afterMarkdowns: [
              "Супер! Теперь изменения из `bugFix` находятся в конце ветки `main` и являют собой линейную последовательность коммитов.",
              "",
              'Обрати внимание, что коммит С3 до сих пор существует где-то, а С3\' - это его "копия" в ветке `main`',
              "",
              "Единственная проблема - ветка `main` не обновлена до последних изменений. Это легко исправить.",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Вот мы выбрали ветку `main`. Вперёд - сделаем rebase на `bugFix`.",
            ],
            afterMarkdowns: [
              "Вуаля! Так как `main` был предком `bugFix`, git просто сдвинул ссылку на `main` вперёд.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Чтобы пройти этот уровень, сделай следующее:",
              "",
              "* Переключись на ветку `bugFix`",
              "* Сделай коммит",
              "* Вернись на `main` и сделай коммит ещё раз",
              "* Переключись на `bugFix` и сделай rebase на `main`",
              "",
              "Удачи!",
            ],
          },
        },
      ],
    },
    uk: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'Інший спосіб комбінування змін з різних бранчів називається *rebase*. Rebase по суті бере кілька комітів , "копіює" їх, й кладе їх в інше місце.',
              "",
              "Це може звучати трохи незрозуміло, але основна перевага rebase в тому, що його використовують щоб створити зручну лінійну послідовність комітів. Коміт лог та історія будуть виглядати набагато чистіша, якщо користуватися лише rebase (а не merge)",
              "",
              "Спробуємо на практиці...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Ми знову маємо дві гілки; зауваж, що наразі вибрана гілка bugFix (вважай зірочку)",
              "",
              "Ми хочемо перемістити наші зміни з гілки bugFix прямо до змін з гілки main. Тоді це буде виглядати наче ці зміни були додані одна за одною, хоча насправді вони були додані одночасно.",
              "",
              "Давайте зробимо це за допомогою команди `git rebase`.",
            ],
            afterMarkdowns: [
              "Добре! Тепер зміни з гілки bugFix знаходяться прямо попереду змін з main й ми отримали зручну лінійну послідовність комітів.",
              "",
              'Вважай що коміт C3 досі десь існує (в дереві він тьмяніший за решту), й C3\' це "копія" яку ми заребейсили в main.',
              "",
              "Є лише одна проблема: гілка main також не була оновлена, давайте зробимо це наступним кроком...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Тепер ми перейшли (checkout) до гілки `main`. Далі робимо rebase на `bugFix`...",
            ],
            afterMarkdowns: [
              "Вуаля! Так як `main` це предок `bugFix`, git просто просунув посилання гілки `main` вперед в історії.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Щоб пройти цей рівень, зроби наступне:",
              "",
              "* Зачекауть (checkout) новий бранч з назвою `bugFix`",
              "* Зроби один коміт",
              "* Повернись на main й зроби ще один коміт",
              "* Зачекауть bugFix знову й заребейсь його на main",
              "",
              "Нехай щастить!",
            ],
          },
        },
      ],
    },
    vi: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'Cách thứ 2 để kết hợp thành của của 2 nhánh là *rebase.* Rebase về căn bản là chọn một loạt các commit, "sao chép" chúng, và ném chúng sang chỗ khác.',
              "",
              "Nghe có vẻ phức tạp, lợi thế của rebase là có thể tạo ra cây lịch sử thẳng tuột. Ljch sử commit nhìn sẽ gọn gàng hơn nhiều.",
              "",
              "Xem nó hoạt động thế nào nào...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Giờ ta lại có 2 nhánh; để ý rằng nhánh bugFix đang được chọn (thấy dấu hoa thị chứ?)",
              "",
              "Ta muốn chuyển bugFix trực tiếp sang main. Theo cách đó thì các chức năng nhìn có vẻ được phát triển tuần tự, trong khi thực tế chúng được phát triển song song.",
              "",
              "Dùng lệnh `git rebase` để thử nào",
            ],
            afterMarkdowns: [
              "Tuyệt vời! Giờ thành quả của nhánh bugFix nằm ngay trên main và ta có các commit nằm thẳng tuột.",
              "",
              'Để ý rằng commit C3 vẫn nằm đâu đó (đã được làm mờ), và commit C3\' là bản "sao chép" mà ta dán lên nhánh main.',
              "",
              "Vấn đề duy nhất bây giờ là nhánh main vẫn chưa được cập nhật, làm luôn cho nóng nào...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Giờ thì ta đã chuyển sang nhánh `main`. Tiếp tục dán nó vào `bugFix` nào...",
            ],
            afterMarkdowns: [
              "Đó! Bởi vì `main` là cha ông của `bugFix`, git đơn giản chuyển tham chiếu của nhánh `main` tiến lên.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Để hoàn thành cấp độ này, làm theo hướng dẫn sau",
              "",
              "* Chuyển sang nhánh mới tên là `bugFix`",
              "* Commit một lần",
              "* Quay về main và commit lần nữa",
              "* Quay trở lại bugFix và rebase sang main",
              "",
              "Chúc may mắn!",
            ],
          },
        },
      ],
    },
    sl_SI: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'Drugi način kombiniranja dela med branchi je *rebasing*. Rebasing vzame listo commitov, jih "skopira", nato pa jih položi nekam drugam.',
              "",
              "To se morda sliši komplicirano, ampak prednost rebeasinga je, da se ga lahko uporabi za lepo linearno zaporedje commitov. Commit log / zgodovina repozitorija bo dosti lepša, če je dovoljeno le rebaseanje.",
              "",
              "Poglejmo to na primeru ...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Tu imamo spet dva brancha; trenutno izbran je branch bugFix (zvezdica).",
              "",
              "Radi bi prestavili naše delo iz bugFix direktno na delo iz masterja. Tako bi izgledalo, kot da sta bili ti dve funkcionalnosti razviti zaporedno, v resnici pa sta bili razviti vzporedno.",
              "",
              "Naredimo sedaj to z `git rebase` ukazom.",
            ],
            afterMarkdowns: [
              "Super! Sedaj je naše delo iz bugFix brancha na vrhu masterja in imamo lepo zaporedje commitov.",
              "",
              'Omenimo, da commit C3 še vedno obstaja nekje (v drevesu je zbledel), in C3\' je v bistvu "kopija", ki smo jo rebaseali na main.',
              "",
              "Edini problem je, da tudi main ni bil posodobljen, naredimo to sedaj ...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Sedaj smo checkoutani na `main` branchu. Pojdimo in rebaseajmo na `bugFix`...",
            ],
            afterMarkdowns: [
              "Tako! Ker je bil `main` prednik `bugFix`, je git enostavno premaknil `main` branch referenco naprej v zgodovini.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Da zaključiš to stopnjo, naredi naslednje:",
              "",
              "* Checkoutaj nov branch poimenovan `bugFix`",
              "* Enkrat commitaj",
              "* Pojdi nazaj na main in commitaj ponovno",
              "* Ponovno checkoutaj bugFix in ga rebaseaj na main",
              "",
              "Srečno!",
            ],
          },
        },
      ],
    },
    pl: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'Drugim sposobem na łączenie naszej pracy między branch-ami jest *rebase*. Rebase zasadniczo pobiera zestaw commit-ów, "kopiuje" je i umieszcza w innym miejscu.',
              "",
              "Chociaż brzmi to zagmatwane, zaletą rebase jest to, że można jej użyć do stworzenia ładnej liniowej sekwencji zatwierdzeń. Rebase sprawi, że historia commit-ów w repozytorium będzie wyglądał na dużo prostszy, ponieważ unika się commit-ów scalających (merge).",
              "",
              "Zobaczmy to w akcji...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Tutaj znowu mamy dwa gałęzie (branch-e); zwróć uwagę, że branch bugFix jest aktualnie wybrany (zwróć uwagę, że ma gwiazdkę)",
              "",
              "Chcielibyśmy przenieść nasze pracę z branch-a bugFix bezpośrednio do branch-a main. W&nbsp;ten sposób wyglądałoby to tak, jakby te dwa zadania były rozwijane sekwencyjnie, podczas gdy w rzeczywistości rozwijano je równolegle.",
              "",
              "Zróbmy to za pomocą polecenia `git rebase`.",
            ],
            afterMarkdowns: [
              "Świetnie! Teraz nasz branch bugFix znajduje się tuż nad main i mamy ładną liniową sekwencję zatwierdzeń tj. commit-ów.",
              "",
              'Zauważ, że commit C3 nadal gdzieś istnieje (ma wyblakły wygląd w drzewie), a commit C3\' jest "kopią", którą nadpisujemy na main.',
              "",
              "Jedynym problemem jest to, że main też nie został zaktualizowany, zróbmy to teraz...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Jesteśmy teraz na branch-u `main`. Przejdźmy dalej i zróbmy połączenie rebase z branch-em `bugFix`...",
            ],
            afterMarkdowns: [
              "Oto jest! Ponieważ `main` był przodkiem `bugFix`, GIT po prostu przesunął odniesienie do branch-a `main` do przodu w historii.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "Aby ukończyć ten poziom, wykonaj następujące czynności:",
              "",
              "* Przejdź do nowego utworzonego branch-u o nazwie `bugFix`",
              "* Zrób commit",
              "* Wróć do branch-a main i zrób kolejny commit",
              "* Przejdź do bugFix oraz połącz za pomocą rebase z main",
              "",
              "Powodzenia, misja zakończona!",
            ],
          },
        },
      ],
    },
    en_US: {
      childViews: [
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "## Git Rebase",
              "",
              'Il secondo modo per unire il lavoro tra rami è il *rebasing* (ribasare). Quando si ribasa vengono presi una serie di commit, vengono "copiati", e incollati da qualche parte.',
              "",
              "Anche se può sembrare inutile, il vantaggio del rebasing è che può essere usato per creare una sequenza lineare di commit. Il log / storia dei commit del repository sarebbe molto più ordinata e comprensibile se solo il rebasing fosse consentito.",
              "",
              "Vediamolo in azione...",
            ],
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Here we have two branches yet again; note that the bugFix branch is currently selected (note the asterisk)",
              "",
              "We would like to move our work from bugFix directly onto the work from main. That way it would look like these two features were developed sequentially, when in reality they were developed in parallel.",
              "",
              "Let's do that with the `git rebase` command.",
            ],
            afterMarkdowns: [
              "Awesome! Now the work from our bugFix branch is right on top of main and we have a nice linear sequence of commits.",
              "",
              'Note that the commit C3 still exists somewhere (it has a faded appearance in the tree), and C3\' is the "copy" that we rebased onto main.',
              "",
              "The only problem is that main hasn't been updated either, let's do that now...",
            ],
            command: "git rebase main",
            beforeCommand: "git commit; git checkout -b bugFix C1; git commit",
          },
        },
        {
          type: "GitDemonstrationView",
          options: {
            beforeMarkdowns: [
              "Now we are checked out on the `main` branch. Let's go ahead and rebase onto `bugFix`...",
            ],
            afterMarkdowns: [
              "There! Since `main` was an ancestor of `bugFix`, git simply moved the `main` branch reference forward in history.",
            ],
            command: "git rebase bugFix",
            beforeCommand:
              "git commit; git checkout -b bugFix C1; git commit; git rebase main; git checkout main",
          },
        },
        {
          type: "ModalAlert",
          options: {
            markdowns: [
              "To complete this level, do the following",
              "",
              "* Checkout a new branch named `bugFix`",
              "* Commit once",
              "* Go back to main and commit again",
              "* Check out bugFix again and rebase onto main",
              "",
              "Good luck!",
            ],
          },
        },
      ],
    },
  },
};
