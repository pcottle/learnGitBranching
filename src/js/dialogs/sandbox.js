const { Branch } = require("../git");

exports.dialog = {
  'en_US': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Welcome to Learn Git Branching',
        '',
        'Interested in learning Git? Well you\'ve come to the right place! ',
        '"Learn Git Branching" is the most visual and interactive way to learn Git ',
        'on the web; you\'ll be challenged with exciting levels, given step-by-step ',
        'demonstrations of powerful features, and maybe even have a bit of fun along the way.',
        '',
        'After this dialog you\'ll see the variety of levels we have to offer. If you\'re a ',
        'beginner, just go ahead and start with the first. If you already know some Git basics, ',
        'try some of our later more challenging levels.',
        '',
        'You can see all the commands available with `show commands` at the terminal.',
        '',
        'PS: Want to go straight to a sandbox next time?',
        'Try out ',
        '[this special link](https://pcottle.github.io/learnGitBranching/?NODEMO)',
        '',
        'PPS: GitHub has started naming the default branch `main` instead of `master` ',
        'to migrate away from biased terminology [(more details available here)](https://github.com/github/renaming). ',
        'In accordance with this industry-wide movement, we have also updated "Learn Git Branching" to ',
        'use `main` instead of `master` in our lessons. This rename should be fairly consistent by ',
        'now but if you notice any errors, feel free to submit a PR (or open an issue).'
      ]
    }
  }],
  'es_AR': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## ¡Te damos la bienvenida a Learn Git Branching!',
        '',
        'Esta aplicación está diseñada para ayudar a los principiantes ',
        'a manejar los poderosos conceptos que hay detrás del trabajo ',
        'con ramas (branches) en Git. Esperamos que disfrutes la aplicación ',
        'y tal vez incluso ¡que aprendas algo! ',
        '',
        '# ¡Demo!',
        '',
        'Si no viste la demo, mirala en esta dirección:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=es_AR&demo](https://pcottle.github.io/learnGitBranching/?locale=es_AR&demo)',
        '',
        '¿Querés dejar de ver este mensaje? Agregale `NODEMO` a la URL para dejar de verlo, como en este link:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=es_AR&NODEMO](https://pcottle.github.io/learnGitBranching/?locale=es_AR&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Comandos de Git',
        '',
        'Tenés una gran variedad de comandos de git en este sandbox. Estos incluyen: ',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## ¡Compartí!',
        '',
        'Compartí tus árboles con tus amigos usando `export tree` e `import tree`',
        '',
        '¿Tenés una buena lección que compartir? Probá construyendo un nivel con `build level` o probá el nivel de un amigo con `import level`',
        '',
        'Para ver todos los comandos disponibles, probá `show commands`. Hay algunas joyitas como `undo` y `reset`',
        '',
        'Por ahora, arranquemos con los `levels`...'
      ]
    }
  }],
  'es_MX': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## ¡Bienvenid@ a Learn Git Branching!',
        '',
        'Esta aplicación está diseñada para ayudar a los principiantes',
        'a manejar los poderosos conceptos que hay detrás del trabajo',
        'con ramas (branches) en Git. Esperamos que disfrutes la aplicación',
        'y tal vez incluso ¡que aprendas algo!',
        '',
        '# ¡Demo!',
        '',
        'Si no viste la demo, mirala en ésta dirección:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=es_MX&demo](https://pcottle.github.io/learnGitBranching/?locale=es_MX&demo)',
        '',
        '¿Harto de este mensaje? Agregale `NODEMO` a la URL para dejar de verlo, como en éste link:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=es_MX&NODEMO](https://pcottle.github.io/learnGitBranching/?locale=es_MX&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Comandos de git',
        '',
        'Tienes una gran variedad de comandos de git en este sandbox. He aquí una lista de los incluidos:',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## ¡Comparte!',
        '',
        'Comparte tus árboles con tus amigos usando `export tree` e `import tree`',
        '',
        '¿Tienes una buena lección que compartir? Prueba construyendo un nivel con `build level` o prueba el nivel de un amigo con `import level`',
        '',
        'Para ver todos los comandos disponibles, prueba `show commands`. Hay algunos muy prácticos como `undo` y `reset`',
        '',
        'Por ahora, arranquemos con los `levels`...'
      ]
    }
  }],
  'es_ES': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## ¡Bienvenid@ a Learn Git Branching!',
        '',
        'Esta aplicación está diseñada para ayudar a los principiantes ',
        'a manejar los poderosos conceptos que hay detrás del trabajo ',
        'con ramas (branches) en Git. Esperamos que disfrutes la aplicación ',
        'y tal vez incluso ¡que aprendas algo! ',
        '',
        '# ¡Demo!',
        '',
        'Si no viste la demo, mírala en esta dirección:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=es_ES&demo](https://pcottle.github.io/learnGitBranching/?locale=es_ES&demo)',
        '',
        '¿Harto de este mensaje? Agrégale `NODEMO` a la URL para dejar de verlo, como en este link:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=es_ES&NODEMO](https://pcottle.github.io/learnGitBranching/?locale=es_ES&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Comandos de Git',
        '',
        'Tienes una gran variedad de comandos de git en este sandbox. Estos incluyen: ',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## ¡Comparte!',
        '',
        'Comparte tus árboles con tus amigos usando `export tree` e `import tree`',
        '',
        '¿Tienes una buena lección que compartir? Prueba construyendo un nivel con `build level` o prueba el nivel de un amigo con `import level`',
        '',
        'Para ver todos los comandos disponibles, escribe `show commands`. Hay algunas joyitas como `undo` y `reset`',
        '',
        'Por ahora, empecemos con los `levels`...'
      ]
    }
  }],
  'pt_BR': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Bem-vindo ao Learn Git Branching!',
        '',
        'Este aplicativo foi desenvolvido para ajudar os iniciantes a ',
        'aprender os poderosos conceitos por trás do branching com ',
        'o git. Esperamos que você goste deste aplicativo e talvez ',
        'até aprenda alguma coisa!',
        '',
        '# Demo!',
        '',
        'Se você ainda não viu o demo, veja aqui:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=pt_BR&demo](https://pcottle.github.io/learnGitBranching/?locale=pt_BR&demo)',
        '',
        'Farto desta mensagem? Acrescente `NODEMO` ao endereço para se livrar dela, como no link abaixo:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=pt_BR&NODEMO](https://pcottle.github.io/learnGitBranching/?locale=pt_BR&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Comandos do git',
        '',
        'Você tem à sua disposição no sandbox uma variedade de comandos do git:',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Compartilhar é se importar!',
        '',
        'Compartilhe árvores com seus amigos usando `export tree` e `import tree`',
        '',
        'Tem uma grande lição para compartilhar? Tente construir um nível com `build level` ou experimente o nível de um amigo com `import level`',
        '',
        'Para ver todos os comandos, use `show commands`. Há algumas jóias como `undo` e `reset`',
        '',
        'Por hora, vamos começar com o `levels`...'
      ]
    }
  }],
  'gl': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Benvido a Learn Git Branching!',
        '',
        'Esta aplicación foi desenvolvida para axudar os iniciados en git a ',
        'aprender os poderosos conceptos que hai por detrás do branching con ',
        ' git. Agardamos que disfrutes desta aplicación, e tal vez, ',
        'ata aprendas algunha cousa!',
        '',
        '# Demostracións!',
        '',
        'Se aínda non viches a demo, olla aquí:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=gl&demo](https://pcottle.github.io/learnGitBranching/?locale=gl&demo)',
        '',
        '¿Farto destas mensaxes? Engade `NODEMO` á dirección para librarte dela, como no link de abaixo:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=gl&NODEMO](https://pcottle.github.io/learnGitBranching/?locale=gl&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Comandos de git',
        '',
        'Tes a túa disposición unha caixa de área con unha variedade de comandos de git:',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Compartir e importar!',
        '',
        'Comparte árbores cos seus amigas con `export tree` e `import tree`',
        '',
        '¿Tes un enlace moi grande para compartir? Intenta construír un nivel con `build level` ou importe o nivel dun amigo con `import level`',
        '',
        'Para ver tódolos comandos, usa `show commands`. Hai algunha xoia como `undo` e `reset`',
        '',
        'Por agora, imos comezar cos `levels`...'
      ]
    }
  }],
  'de_DE': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Willkommen bei Learn Git Branching!',
        '',
        'Der Sinn dieser Anwendung ist, die umfangreichen und komplexen Zusammenhänge der Prozesse, die bei der Arbeit mit Git ablaufen, zu verdeutlichen. Ich hoffe du hast Spaß dabei und lernst vielleicht sogar etwas!',
        '',
        '# Demo!',
        '',
        'Falls du die Demonstration noch nicht gesehen hast, schau sie dir hier an:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=de_DE&demo](https://pcottle.github.io/learnGitBranching/?locale=de_DE&demo)',
        '',
        'Genervt von diesem Fenster? Häng `NODEMO` an die URL um es los zu werden, so wie hier:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=de_DE&NODEMO](https://pcottle.github.io/learnGitBranching/?locale=de_DE&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Git-Kommandos',
        '',
        'Dir steht eine große Zahl von Git-Befehlen im Sandkasten-Modus zur Verfügung. Unter anderem',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Teilen macht Spaß!',
        '',
        'Teile diese Git-Bäume mit deinen Freunden mittels `export tree` und `import tree`.',
        '',
        'Hast du Wissenswertes zu Git zu vermitteln? Versuch einen Level mit `build level` zu bauen oder probier den Level eines Freundes mit `import level` aus.',
        '',
        'Um alle Kommandos zu sehen, gib `show commands` ein. Darunter gibt\'s kleine Schätze wie `undo` und `reset`.',
        '',
        'Für\'s Erste lass uns mit `levels` anfangen ...'
      ]
    }
  }],
  'ja': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Learn Git Branchingへようこそ',
        '',
        'gitのパワフルなブランチ機能のコンセプトが ',
        '学びやすくなるようにこのアプリケーションを作りました。 ',
        'このアプリケーションを楽しんで使って頂いて、 ',
        '何かを学習して頂けたなら嬉しいです。',
        '',
        '# とりあえず触ってみたい方へ：',
        '',
        '簡単なデモを用意してあるので、もしよければこちらもご覧ください：',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=ja&demo](https://pcottle.github.io/learnGitBranching/?demo&locale=ja)',
        '',
        'このダイアログ自体を省略するには、以下のようにURLの末尾にクエリストリング`NODEMO`を付加してアクセスしてください。',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=ja&NODEMO](https://pcottle.github.io/learnGitBranching/?NODEMO&locale=ja)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## ここで学べるGitのオペレーション',
        '',
        'ここでは、下記の種類のgitコマンドを学ぶことができます。',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 学習した内容を共有できます',
        '',
        '画面左のコマンドプロンプトから`export tree`や`import tree`とタイプすることで、gitのツリー構造を友達に送ることができます',
        '',
        '何か教材になるようなケースはご存知ないでしょうか。`build level`で課題を作成したり、`import level`で他の人の課題に挑戦してみてください。',
        '',
        '何か詰まったことがあったら、右下メニューの?ボタンを押してみてください',
        '',
        'それから、不自然な記号が出てきたときは顔を左方向に傾けてみるといいかもしれません :P（ペロッ）',
        '',
        'それでは教材の選択画面に進んでみることにします。',
        '',
        '（なお、日本語版製作者のフォークサイトは[こちら](https://remore.github.io/learnGitBranching-ja/)になります。）'
      ]
    }
  }],
  'zh_CN': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 欢迎光临 Learn Git Branching',
        '',
        '你对 Git 感兴趣吗？那么算是来对地方了！',
        '“Learning Git Branching” 可以说是目前为止最好的教程了，在沙盒里你能执行相应的命令，还能看到每个命令的执行情况；',
        '通过一系列刺激的关卡挑战，逐步深入的学习 Git 的强大功能，在这个过程中你可能还会发现一些有意思的事情。',
        '',
        '关闭这个对话框以后，你会看到我们提供的许多关卡。如果你是初学者，从第一关开始逐个向后挑战就是了。',
        '而如果你已经入门了，可以略过前面，直接挑战后面更有难度的关卡。',
        '',
        '### 演示',
        '',
        '如果你还没看过演示，请[到此](?demo)查看。',
        '',
        'PS：想直接进入沙盒？ 在 URL 后头加上 `NODEMO` 就可以了，试一下[这个链接](https://pcottle.github.io/learnGitBranching/?locale=zh_CN&NODEMO)'
      ]
    }
  }],
  'zh_TW': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 歡迎光臨 Learn Git Branching!',
        '',
        '本應用旨在幫助初學者領會 git 分支背後的強大概念。',
        '希望你能喜歡這個應用，並學到知識！',
        '',
        '# 演示！',
        '',
        '如果你還沒看過演示，請到此查看：',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=zh_TW&demo](https://pcottle.github.io/learnGitBranching/?locale=zh_TW&demo)',
        '',
        '厭煩這個對話視窗嗎？在 URL 後頭加上 `NODEMO` 就看不到它了，也可以直接點下邊這個連結：',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=zh_TW&NODEMO](https://pcottle.github.io/learnGitBranching/?locale=zh_TW&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Git 命令',
        '',
        '在沙盒模式中，你有很多指令可用。包括：',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 分享即關懷',
        '',
        '使用 `export tree` 和 `import tree` 與朋友分享 Git 樹',
        '',
        '有個好課程可以分享？試試用 `build level` 創建一個關卡，或者 `import level` 試試朋友的。',
        '',
        '言歸正傳，讓我們先從 `levels` 開始……'
      ]
    }
  }],
  'ko': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Git 브랜치 배우기에 어서오세요!',
        '',
        'Git을 배우고 싶으신가요? 잘 찾아오셨습니다!',
        '"Learn Git Branching"은 웹에서 Git을 배울 수 있는 가장',
        '시각적이고 인터랙티브한 방법입니다.',
        '',
        '당신은 강력한 기능들에 대한 단계별 데모를 통해 흥미진진한 레벨들에 도전하게 되며,',
        '이 대화상자가 끝나면 저희가 제공하는 다양한 레벨을 볼 수 있습니다.',
        '초보자라면 첫 번째 레벨부터 시작하세요.',
        '이미 Git의 기본 사항을 알고 있다면 더 어려운 레벨에 도전해보세요.',
        '',
        '터미널에서 `show commands`로 사용 가능한 모든 명령어를 볼 수 있습니다.',
        '',
        '[안내1] 데모링크로 바로가기 [이동](https://pcottle.github.io/learnGitBranching/?demo&locale=ko)',
        '',
        '[안내2] GitHub는 편향된 용어에서 벗어나기 위해',
        '기본 브랜치의 이름을 `master` 대신 `main`으로 명명하기 시작했습니다.',
        '이러한 업계 전반의 움직임에 따라, 저희도 `master` 대신 `main`을 사용하도록',
        '`Git 브랜치 배우기` 강의를 업데이트했습니다.',
        '해당 사항이 반영되지 않은 오류가 발견될 시 언제든지 PR을 제출(또는 이슈를 오픈)해 주세요.[참고](https://github.com/github/renaming)',
        '',
        '이 애플리케이션은 [Peter Cottle](https://github.io/pcottle)님의 [LearnGitBranching](https://pcottle.github.io/learnGitBranching/)를 번역한 것입니다.',
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Git 명령어',
        '',
        '연습 모드에서 쓸 수 있는 다양한 git명령어는 다음과 같습니다',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 공유해주세요!',
        '',
        '`export tree` 또는 `import tree` 명령어로 git의 트리 구조를 친구들에게 공유할 수 있습니다.',
        '',
        '훌륭한 학습 자료가 있으신가요? `build level`로 레벨을 만들어 보시거나, 친구의 레벨을 `import level`로 가져와서 도전해보세요',
        '',
        '이제 레슨을 시작해봅시다...'
      ]
    }
  }],
  'fr_FR': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Bienvenue sur Learn Git Branching !',
        '',
        'Cette application a été conçue pour aider les débutants à saisir ',
        'les puissants concepts derrière les branches en travaillant ',
        'avec git. Nous espérons que vous apprécierez cette application et ',
        'que vous apprendrez peut-être quelque chose d\'intéressant !',
        '',
        '# Démo !',
        '',
        'Si vous n\'avez pas vu la démo, vous pouvez le faire là :',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=fr_FR&demo](https://pcottle.github.io/learnGitBranching/?locale=fr_FR&demo)',
        '',
        'Agacé par ce dialogue ? Ajoutez `NODEMO` à l\'URL pour le supprimer, en lien ci-dessous pour votre commodité :',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=fr_FR&NODEMO](https://pcottle.github.io/learnGitBranching/?locale=fr_FR&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Commandes Git',
        '',
        'Il existe une large variété de commandes git disponibles dans le mode bac à sable. Sont incluses :',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Partager, c\'est se soucier !',
        '',
        'Partagez des arbres avec vos amis via `export tree` et `import tree`',
        '',
        'Vous avez une grande leçon à partager ? Essayez de construire un niveau avec `build level` ou essayez le niveau d\'un ami avec `import level`',
        '',
        'Pour voir la gamme complète des commandes, tapez `show commands`. Il y a quelques perles telles que `undo` et `reset`',
        '',
        'Mais tout de suite commencez sur les `levels`…'
      ]
    }
  }],
  'ru_RU': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Добро пожаловать в LearnGitBranching!',
        '',
        'Это приложение создано, чтобы помочь новичкам постичь ',
        'мощные возможности ветвления и работы ',
        'с git. Мы надеемся, что вам понравится эта игра ',
        'и может вы что-то усвоите!',
        '',
        '# Демо!',
        '',
        'Если ты не видел демонстрацию – посмотри её тут:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=ru_RU&demo](https://pcottle.github.io/learnGitBranching/?locale=ru_RU&demo)',
        '',
        'Достало это сообщение? Добавь `NODEMO` к адресу и навсегда забудь о нём, ниже ссылка для удобства:',
        '',
        '[https://pcottle.github.io/learnGitBranching/?locale=ru_RU&NODEMO](?locale=ru_RU&NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Команды Git',
        '',
        'В нашей песочнице можно использовать множество команд:',
        '',
        ' * commit',
        ' * branch',
        ' * checkout',
        ' * cherry-pick',
        ' * reset',
        ' * revert',
        ' * rebase',
        ' * merge'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Бог велел – делись!',
        '',
        'Ты можешь делиться результатами с друзьями при помощи `export tree` и `import tree`',
        '',
        'Хочешь создать классный уровень? Сделай это при помощи `build level` или добавь уровень друга при помощи `import level`',
        '',
        'Команда `show commands` покажет все доступные инструкции. Там есть очень полезные, например `undo` и `reset`',
        '',
        'А пока просто начни игру при помощи `levels`...'
      ]
    }
  }],
  'uk': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Ласкаво просимо до Learn Git Branching',
        '',
        'Хочеш вивчити Git? Тоді ти знайшов те, що шукав!',
        '"Learn Git Branching" \u2014 це найбільш візуальний та інтерактивний спосіб вивчення Git в Інтернеті. ',
        'Ти зможеш проходити захопливі рівні, дивитися ',
        'покрокові інструкції з використання потужних функцій Git, навіть трохи ',
        'розважитись в процесі навчання.',
        '',
        'Після цього діалогу побачиш список доступних рівнів. Якщо ти новачок, ',
        'просто почни з першого рівня. Якщо вже знаєш основи Git, ',
        'спробуй більш складні рівні в кінці.',
        '',
        'P.S. Хочеш перейти одразу до пісочниці наступного разу?',
        'Спробуй ',
        '[це спеціальне посилання.](https://pcottle.github.io/learnGitBranching/?locale=uk&NODEMO)'
      ]
    }
  }],
  'vi': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Chào mừng đến với Học Nhánh Git',
        '',
        'Bạn có hứng thú học Git? Bạn đến đúng nơi rồi đấy! ',
        '"Học Nhánh Git" là cách trực quan và hiệu quả nhất để học Git trên web; ',
        'thông qua một loạt các thử thách cấp độ thú vị, bạn sẽ từng bước tìm hiểu sức mạnh của Git.',
        '',
        'Sau khi hộp thoại này đóng lại, bạn sẽ thấy nhiều cấp độ mà chúng tôi cung cấp. ',
        'Nếu bạn là người mới thì hãy bắt đầu từ bài đầu tiên. Nếu bạn đã có hiểu biết cơ bản về Git, ',
        'hãy thử những bài mang tính thách thức hơn phía sau.',
        '',
        'Bạn có thể dùng lệnh `show commands` để xem tất cả các lệnh được hỗ trợ.',
        '',
        'Ghi chú: Nếu muốn trực tiếp vào hộp cát (sandbox) ở lần sau?',
        'Hãy dùng',
        '[đường link đặc biệt này của chúng tôi](https://pcottle.github.io/learnGitBranching/?locale=vi&NODEMO)',
        '',
        'Tái bút: GitHub đã đổi tên cho nhánh mặc định là `main` thay vì `master` ',
        'nhằm tránh dùng thuật ngữ có xu hướng thiên vị [(xem chi tiết tại đây)](https://github.com/github/renaming). ',
        'Để bắt kịp xu hướng công nghệ này, chúng tôi cũng đã cập nhật "Học Nhánh Git" sử ',
        'dụng `main` thay thế cho `master` trong các bài học. Việc đổi tên được thực hiện khá nhất quán cho đến ',
        'thời điểm hiện tại, nhưng nếu bạn phát hiện bất kỳ lỗi nào, đừng ngần ngại mà gửi một pull request (PR), hoặc tạo một vấn đề (New issue).'
      ]
    }
  }],
  'sl_SI': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Dobrodošel na učenju Git Branchanja',
        '',
        'Bi se rad naučil Git? No, prišel si na pravo mesto! ',
        '"Learn Git Branching" je najbolj vizualen in interaktiven način učenja Git-a ',
        'na spletu; zagrizel boš v zanimive stopnje, po korakih boš spoznaval osupljive ',
        'funkcije in kaj pa veš, morda ti bo celo zabavno. ;)',
        '',
        'Za tem oknom boš videl kopico stopenj, ki so na razpolago. Če si ',
        'začetnik, kar pogumno, začni s prvo. Če pa že poznaš Git osnove, ',
        'se preizkusi v zahtevnejših stopnjah.',
        '',
        'Vidiš lahko vse ukaze, ki so na voljo, z ukazom `show commands` v terminalu.',
        '',
        'PS: Bi šel rad naslednjič naravnost v peskovnik?',
        'Poizkusi s',
        '[to posebno povezavo](https://pcottle.github.io/learnGitBranching/?locale=sl_SI&NODEMO)'
      ]
    }
  }],
  'pl': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Witaj w Learn Git Branching!',
        '',
        'Jesteś zainteresowany nauką Gita? Cóż, trafiłeś we właściwe miejsce!',
        '"Learn Git Branching" jest najbardziej wizualnym i interaktywnym sposobem na naukę gita w sieci.',
        'Czekają na Ciebie ekscytujące poziomy, demonstracje zaawansowanych funkcji krok po kroku. Może nawet będziesz się dobrze bawić.',
        '',
        'Po tym oknie dialogowym zobaczysz różnorodność poziomów, które mamy do zaoferowania.',
        'Jeśli jesteś początkujący, po prostu zacznij od pierwszego poziomu.',
        'Jeśli znasz już podstawy gita, wypróbuj niektóre z naszych późniejszych, bardziej wymagających poziomów.',
        '',
        'Możesz zobaczyć wszystkie komendy wpisując `show commands` w terminalu.',
        '',
        'Chcesz następnym razem przejść prosto do trybu piaskownicy? Kilknij [tutaj](https://pcottle.github.io/learnGitBranching/?locale=pl&NODEMO)',
        '',
        'PS. GitHub zaczął nazywać domyślną gałąź `main` zamiast `master`, aby odejść od tendencyjnej terminologii. [(więcej informacji tutaj)](https://github.com/github/renaming)',,
        'Zgodnie z tym ogólnobranżowym ruchem, zaktualizowaliśmy również "Learn Git Branching", by używać `main` zamiast `master` w naszych zadaniach.',
        'Ta zmiana nazwy powinna być już w miarę spójna, ale jeśli zauważysz jakieś błędy, nie krępuj się dodać pull request (lub zgłosić issue na githubie - prawy górny róg).'
      ]
    }
  }],
  'ta_IN': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Git Branching கற்க வரவேற்கிறோம்',
        '',
        'கிட் கற்க ஆர்வமா? அப்படியானால் நீங்கள் சரியான இடத்திற்கு வந்துவிட்டீர்கள்! ',
        '"Learn Git Branching" Git ஐக் கற்றுக்கொள்வதற்கான வரைபடம் மற்றும் செயல்முறை ',
        'பயிற்சியுடன் கூடிய சிரந்த கருவி; ',
        'உங்களை சோதிக்கும் வகையிலான நிலைகளுடன் மிகுந்த சக்திவாய்ந்த அம்சங்களை ',
        'படிப்படியாகவும், சில சமையம் விளையாட்டாகவும் கற்றுத்தர கூடியது.',
        '',
        'இந்த அறிவிற்ப்புக்கு பிறகு, நாங்கள் வழங்க உள்ள பல்வேறு நிலைகளை நீங்கள் காண்பீர்கள். ',
        'நீங்கள் ஆரம்ம நிலையில் இருந்தால், முதல் கட்டத்தில் இருந்து  தொடங்கவும். ',
        'கிட்டின் சில அடிப்படைகளை நீங்கள் ஏற்கனவே அறிந்திருந்தால், மெலும் உள்ள கடினமான கட்டங்களை முயற்ச்சி செய்யுங்கள்.',
        '',
        'தேவையானால் `show commands` ஐ பயன்படுத்தி அனைத்து கட்டளைகளையும் முனையத்தில் பார்க்கலாம்.',
        '',
        'பின்குறிப்பு: அடுத்தமுறை நேராக sandbox செல்ல வேண்டுமா?',
        'அப்படியானால் பின் வரும் இணைப்பை பயன்பாடித்துக ',
        '[this special link](https://pcottle.github.io/learnGitBranching/?locale=ta_IN&NODEMO)',
        '',
        'பின்குறிப்பு: GitHub (பெரிய அளவில் பயன்பாட்டில் உள்ள இணையதலம்) `main` என்ற கிளையை `master`-க்கு பதில் ',
        'முன்னிருப்பு கிளையாக பயன் படுத்த உள்ளது [more details available here](https://github.com/github/renaming). ',
        'இந்த மாற்றத்தை பின்னோக்கி இணக்கமான வழியில் பொருத்துவதற்காக, `main`-ஐ முதன்மையாக கருதி ',
        'இந்த இரண்டு பெயர்களும் ஒன்றுக்கொன்று மாற்றுப்பெயர்களாகக் கருதப்படும். ',
        'இந்த மாற்றத்தை அனைத்து நிலை உள்ளடக்கங்களிலும் புதுப்பிக்க நாங்கள் சிறந்த முயற்சியை ',
        'மேற்கொண்டோம், ஆயினும் ஏதேனும் விடுபட்டி இருந்தால் PR உருவாக்கி உதவுங்கள்.',
        'ஒருபக்கச்சார்பான சொற்களிலிருந்து விலகிச் செல்ல உதவியதற்கு நன்றி.'
      ]
    }
  }],
  "it_IT": [
    {
      type: "ModalAlert",
      options: {
        markdowns: [
          "## Benvenuto su Learn Git Branching",
          "",
          "Vorresti imparare Git? Bene, sei nel posto giusto! ",
          '"Learn Git Branching" è il modo più chiaro e interattivo per imparare Git ',
          "su internet; sarai messo alla prova tramite livelli stimolanti, con dimostrazioni ",
          "passo a passo sulle sue potenzialità e, perché no, magari ti divertirai lungo questo percorso.",
          "",
          "Dopo questa finestra vedrai una varietà di livelli che abbiamo da offrire. Se sei alle",
          "prime armi procedi e parti dall'inizio. Se hai delle conoscenze base di Git ",
          "prova con gli ultimi livelli più impegnativi.",
          "",
          "Puoi vedere tutti i comandi disponibili digitando `show commands` sul terminale.",
          "",
          "PS: Preferisci andare direttamente al sandbox?",
          "Prova ",
          "[questo link](https://pcottle.github.io/learnGitBranching/?NODEMO?locale=it_IT).",
          "",
          "PPS: GitHub (e il settore in generale) sta modificando il nome del ramo di default in `main` invece che `master` ",
          "(leggi [qui per ulteriori dettagli](https://github.com/github/renaming)). Per adattarci a questo cambiamento ",
          "mantenendo la retrocompatibilità, questi nomi saranno considerati equivalenti. `main` sarà comunque ",
          "il nome predefinito. Ci siamo impegnati per aggiornare tutti i livelli ma ci sarà ",
          "sicuramente qualcosa che potremmo aver dimenticato. Esegui una PR (o segnala un problema) se ne trovi. ",
          "Grazie per l'aiuto!",
        ],
      },
    },
  ],
  'tr_TR': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Learn Git Branching\'e hoşgeldiniz.',
        '',
        'Git öğrenmeye ilgi duyuyor musunuz? O zaman doğru yerdesiniz!',
        '"Learn Git Branching," Git\'i öğrenmenin en görsel ve etkileşimli yoludur.',
        'web üzerinde; sizi heyecan verici seviyelerle zorlayacak, güçlü özelliklerin adım adım gösterimlerini sunacak',
        've belki de eğlenceli vakit geçirmenizi sağlayacaktır.',
        '',
        'Bu iletişim kutusunu geçtikten sonra sunduğumuz çeşitli seviyeleri göreceksiniz. Eğer yeni başlayan biriyseniz, ',
        'sadece ilk seviyeye başlayabilirsiniz. Eğer zaten Git temellerini biliyorsanız, ',
        'daha sonraki daha zorlu seviyeleri deneyebilirsiniz.',
        '',
        'Terminalde `show commands` ile mevcut tüm komutları görebilirsiniz.',
        '',
        'Not: Bir sonraki seferde doğrudan bir deneme ortamına gitmek mi istiyorsunuz\?',
        'Denemek için bu özel bağlantıyı kullanın:  ',
        '[özel bağlantı](https://pcottle.github.io/learnGitBranching/?NODEMO)',
        '',
        'Not: GitHub, önyargılı terimlerden uzaklaşmak için varsayılan Branch ismini `master` yerine `main`  ',
        'olarak adlandırmaya başladı [(daha fazla detay için tıklayın)](https://github.com/github/renaming). ',
        'Biz de sektör genelindeki harekete uygun olarak, "Learn Git Branching" ',
        'derslerimizde de `master` yerine `main` kullanımını güncelledik. Bu adlandırmanın ',
        'şu anda oldukça tutarlı olması gerekiyor, ancak herhangi bir hata fark ederseniz,',
        'lütfen bir PR (veya issue) göndermekten çekinmeyin.'
      ]
    }
  }],
};
