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
        '[http://pcottle.github.com/learnGitBranching/?demo](http://pcottle.github.com/learnGitBranching/?demo)',
        '',
        'Annoyed at this dialog? Append `?NODEMO` to the url to get rid of it, linked below for convenience:',
        '',
        '[http://pcottle.github.com/learnGitBranching/?NODEMO](http://pcottle.github.com/learnGitBranching/?NODEMO)'
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
        'For now let\'s get you started on the `levels`...'
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
        '이 애플리케이션은 [Peter Cottle](https://github.com/pcottle)님의 [LearnGitBranching](http://pcottle.github.com/learnGitBranching/)를 번역한 것입니다.',
        '아래 데모를 먼저 보셔도 좋습니다.',
        '',
        '<http://pcottle.github.com/learnGitBranching/?demo&locale=ko>'
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
