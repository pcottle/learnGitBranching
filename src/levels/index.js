// Each level is part of a "sequence;" levels within
// a sequence proceed in the order listed here
exports.levelSequences = {
  intro: [
    require('../../levels/intro/commits').level,
    require('../../levels/intro/branching').level,
    require('../../levels/intro/merging').level,
    require('../../levels/intro/rebasing').level
  ],
  rampup: [
    require('../../levels/rampup/detachedHead').level,
    require('../../levels/rampup/relativeRefs').level,
    require('../../levels/rampup/relativeRefs2').level,
    require('../../levels/rampup/reversingChanges').level
  ],
  rebase: [
    require('../../levels/rebase/manyRebases').level
  ],
  mixed: [
    require('../../levels/mixed/grabbingOneCommit').level,
    require('../../levels/mixed/jugglingCommits').level,
    require('../../levels/mixed/jugglingCommits2').level
  ],
  advanced: [
    require('../../levels/advanced/multipleParents').level,
    require('../../levels/rebase/selectiveRebase').level
  ]
};

// there are also cute names and such for sequences
exports.sequenceInfo = {
  intro: {
    displayName: {
      'en_US': 'Introduction Sequence',
      'ja': 'まずはここから',
      'fr_FR': 'Sequence d\'introduction',
      'zh_CN': '序列简介',
      'ko': '기본 명령어'
    },
    about: {
      'en_US': 'A nicely paced introduction to the majority of git commands',
      'ja': 'gitの基本的なコマンド群をほどよいペースで学ぶ',
      'fr_FR': 'Une introduction en douceur à la majoité des commandes git',
      'zh_CN': '循序渐进介绍git主要命令',
      'ko': '브랜치 관련 주요 git 명령어를 깔끔하게 알려드립니다'
    }
  },
  rampup: {
    displayName: {
      'en_US': 'Ramping Up',
      'ja': '次のレベルに進もう',
      'zh_CN': '进阶篇'
    },
    about: {
      'en_US': 'The next serving of 100% git awesomes-ness. Hope you\'re hungry',
      'ja': '更にgitの素晴らしさを堪能しよう',
      'zh_CN': '接下来是git的超赞特性。迫不及待了吧!'
    }
  },
  rebase: {
    displayName: {
      'en_US': 'Master the Rebase Luke!',
      'ja': 'Rebaseをモノにする',
      'fr_FR': 'Maîtrise Rebase, Luke!',
      'zh_CN': '精通Rebase！',
      'ko': '리베이스 완전정복!'
    },
    about: {
      'en_US': 'What is this whole rebase hotness everyone is talking about? Find out!',
      'ja': '話題のrebaseってどんなものだろう？って人にオススメ',
      'fr_FR': 'Que\'est-ce que c\'est que ce rebase dont tout le monde parle ? Découvrez-le !',
      'ko': '그 좋다고들 말하는 rebase에 대해 알아봅시다!',
      'zh_CN': '大家都在说的rebase究竟是神马？看看吧！'
    }
  },
  mixed: {
    displayName: {
      'en_US': 'A Mixed Bag',
      'ja': '様々なtips',
      'fr_FR': 'Un assortiment',
      'ko': '종합선물세트',
      'zh_CN': '大杂烩？'
    },
    about: {
      'en_US': 'A mixed bag of Git techniques, tricks, and tips',
      'ja': 'gitを使う上での様々なtipsやテクニックなど',
      'fr_FR': 'Un assortiment de techniques et astuces pour utiliser Git',
      'ko': 'Git을 다루는 다양한 팁과 테크닉을 다양하게 알아봅니다',
      'zh_CN': 'Git技术，技巧与贴士杂烩'
    }
  },
  advanced: {
    displayName: {
      'en_US': 'Advanced Topics',
      'zh_CN': '高级主题'
    },
    about: {
      'en_US': 'For the truly brave!',
      'zh_CN': '只为真正的勇士！'
    }
  }
};

