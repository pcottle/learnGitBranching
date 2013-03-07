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

