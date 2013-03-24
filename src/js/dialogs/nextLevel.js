exports.dialog = {
  'en_US': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Great Job!!',
        '',
        'You solved the level in *{numCommands}* command(s); ',
        'our solution uses {best}.'
      ]
    }
  }],
  'ja': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 完成!',
        '',
        'あなたは*{numCommands}*回のコマンドでこの課題をクリアしました; ',
        '模範解答では{best}回です。'
      ]
    }
  }],
  'zh_CN': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 碉堡了！',
        '',
        '你用 *{numCommands}* 条命令搞定了这一关；我们的答案要用 {best}。'
      ]
    }
  }]
};

