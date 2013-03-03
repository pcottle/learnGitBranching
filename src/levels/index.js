// Each level is part of a "sequence;" levels within
// a sequence proceed in the order listed here
exports.levelSequences = {
  intro: [
    require('../../levels/intro/1').level,
    require('../../levels/intro/2').level,
    require('../../levels/intro/3').level,
    require('../../levels/intro/4').level,
    require('../../levels/intro/5').level
  ],
  rebase: [
    require('../../levels/rebase/1').level,
    require('../../levels/rebase/2').level
  ],
  mixed: [
    require('../../levels/mixed/1').level,
    require('../../levels/mixed/2').level,
    require('../../levels/mixed/3').level
  ]
};

// there are also cute names and such for sequences
exports.sequenceInfo = {
  intro: {
    displayName: {
      'en_US': 'Introduction Sequence',
      'zh_CN': '简介序列',
      'ko': '기본 명령어'
    },
    about: {
      'en_US': 'A nicely paced introduction to the majority of git commands',
      'zh_CN': '一个节奏感良好的主流 Git 命令介绍',
      'ko': '브랜치 관련 주요 git 명령어를 깔끔하게 알려드립니다'
    }
  },
  rebase: {
    displayName: {
      'en_US': 'Master the Rebase Luke!',
      'ko': '리베이스 완전정복!',
      'zh_CN': '掌握衍合，兄弟！'
    },
    about: {
      'en_US': 'What is this whole rebase hotness everyone is talking about? Find out!',
      'ko': '그 좋다고들 말하는 rebase에 대해 알아봅시다!',
      'zh_CN': '大家说的火热的衍合都是些神马？看看吧！'
    }
  },
  mixed: {
    displayName: {
      'en_US': 'A Mixed Bag',
      'ko': '종합선물세트',
      'zh_CN': '大杂烩？'
    },
    about: {
      'en_US': 'A mixed bag of Git techniques, tricks, and tips',
      'ko': 'Git을 다루는 다양한 팁과 테크닉을 다양하게 알아봅니다',
      'zh_CN': 'Git技术，技巧与贴士'
    }
  }
};

