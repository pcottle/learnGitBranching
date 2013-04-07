exports.dialog = {
  'en_US': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Welcome to LearnGitBranching!',
        '',
        'This application is designed to help beginners grasp ',
        'the powerful concepts behind branching when working ',
        'with git. We hope you enjoy this application and maybe ',
        'even learn something!',
        '',
        '# Demo!',
        '',
        'If you have not seen the demo, please check it out here:',
        '',
        '[http://pcottle.github.io/learnGitBranching/?demo](http://pcottle.github.io/learnGitBranching/?demo)',
        '',
        'Annoyed at this dialog? Append `?NODEMO` to the url to get rid of it, linked below for convenience:',
        '',
        '[http://pcottle.github.io/learnGitBranching/?NODEMO](?NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Git commands',
        '',
        'You have a large variety of git commands available in sandbox mode. These include',
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
        '## Sharing is caring!',
        '',
        'Share trees with your friends via `export tree` and `import tree`',
        '',
        'Have a great lesson to share? Try building a level with `build level` or try out a friend\'s level with `import level`',
        '',
        'To see the full range of commands, try `show commands`. There are some gems like `undo` and `reset`',
        '',
        'For now let\'s get you started on the `levels`...'
      ]
    }
  }],
  'ja': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## LearnGitBranchingへようこそ',
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
        '[http://remore.github.io/learnGitBranching-ja/?demo](http://remore.github.io/learnGitBranching-ja/?demo)',
        '',
        'このダイアログ自体を省略するには、以下のようにURLの末尾にクエリストリング`?NODEMO`を付加してアクセスしてください。',
        '',
        '[http://remore.github.io/learnGitBranching-ja/?NODEMO](http://remore.github.io/learnGitBranching-ja/?NODEMO)'
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
        'それでは教材の選択画面に進んでみることにします。'
      ]
    }
  }],
  'zh_CN': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 欢迎光临 LearnGitBranching!',
        '',
        '本应用旨在帮助初学者领会 git 分支背后的强大概念。',
        '希望你能喜欢这个应用，并学到知识！',
        '',
        '# 演示!',
        '',
        '如果你还没看过演示，请到此查看：',
        '',
        '[http://pcottle.github.io/learnGitBranching/?demo](http://pcottle.github.io/learnGitBranching/?demo)',
        '',
        '厌烦这个对话框？ 在 URL 后头加上 `?NODEMO` 就看不到它了，也可以直接点下边这个链接：',
        '',
        '[http://pcottle.github.io/learnGitBranching/?NODEMO](http://pcottle.github.io/learnGitBranching/?NODEMO)'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Git 命令',
        '',
        '在沙盒模式里，你有好多命令可用。 包括：',
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
        '## 分享即关怀',
        '',
        '使用 `export tree` 和 `import tree` 与朋友分享 Git 树',
        '',
        '有个好课程可以分享？试试用 `build level` 创建一个关卡，或者 `import level` 试试朋友的。',
        '',
        '言归正传，让我们先从 `levels` 开始……'
      ]
    }
  }],
  'ko': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        //'## Welcome to LearnGitBranching!',
        '## Git 브랜치 배우기를 시작합니다!',
        '',
        // 'This application is designed to help beginners grasp ',
        // 'the powerful concepts behind branching when working ',
        // 'with git. We hope you enjoy this application and maybe ',
        // 'even learn something!',
        '이 애플리케이션은 git을 쓸 때 필요한 브랜치에 대한 개념을',
        '탄탄히 잡게끔 도와드리기 위해 만들었습니다. 재밌게 사용해주시기를',
        '바라며, 무언가를 배워가신다면 더 기쁘겠습니다!',
        // '',
        // '# Attention HN!!',
        // '',
        // 'Unfortunately this was submitted before I finished all the help ',
        // 'and tutorial sections, so forgive the scarcity. See the demo here:',
        '',
        '이 애플리케이션은 [Peter Cottle](https://github.io/pcottle)님의 [LearnGitBranching](http://pcottle.github.io/learnGitBranching/)를 번역한 것입니다.',
        '아래 데모를 먼저 보셔도 좋습니다.',
        '',
        '<http://pcottle.github.io/learnGitBranching/?demo&locale=ko>'
      ]
    }
  }, {
    type: 'ModalAlert',
    options: {
      markdowns: [
        // '## Git commands',
        '## Git 명령어',
        '',
        // 'You have a large variety of git commands available in sandbox mode. These include',
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
        // '## Sharing is caring!',
        // '',
        // 'Share trees with your friends via `export tree` and `import tree`',
        // '',
        // 'Have a great lesson to share? Try building a level with `build level` or try out a friend\'s level with `import level`',
        // '',
        // 'For now let\'s get you started on the `levels`...'
        '## 공유해주세요!',
        '',
        '`export tree` 와 `import tree`로 여러분의 친구들에게 트리를 공유해주세요',
        '',
        '훌륭한 학습 자료가 있으신가요? `build level`로 레벨을 만들어 보시거나, 친구의 레벨을 `import level`로 가져와서 실험해보세요',
        '',
        '이제 레슨을 시작해봅시다...'
      ]
    }
  }]
};
