// Each level is part of a "sequence;" levels within
// a sequence proceed in the order listed here
exports.levelSequences = {
  intro: [
    require('./intro/commits').level,
    require('./intro/branching').level,
    require('./intro/merging').level,
    require('./intro/rebasing').level
  ],
  rampup: [
    require('./rampup/detachedHead').level,
    require('./rampup/relativeRefs').level,
    require('./rampup/relativeRefs2').level,
    require('./rampup/reversingChanges').level
  ],
  move: [
    require('./rampup/cherryPick').level,
    require('./rampup/interactiveRebase').level
  ],
  mixed: [
    require('./mixed/grabbingOneCommit').level,
    require('./mixed/jugglingCommits').level,
    require('./mixed/jugglingCommits2').level
  ],
  advanced: [
    require('./rebase/manyRebases').level,
    require('./advanced/multipleParents').level,
    require('./rebase/selectiveRebase').level
  ],
  remote: [
    require('./remote/clone').level,
    require('./remote/remoteBranches').level,
    require('./remote/fetch').level,
    require('./remote/pull').level,
    require('./remote/fakeTeamwork').level,
    require('./remote/push').level,
    require('./remote/fetchRebase').level
  ],
  remoteAdvanced: [
    require('./remote/pushManyFeatures').level,
    require('./remote/mergeManyFeatures').level,
    require('./remote/tracking').level,
    require('./remote/pushArgs').level,
    require('./remote/pushArgs2').level,
    require('./remote/fetchArgs').level,
    require('./remote/sourceNothing').level,
    require('./remote/pullArgs').level
  ]
};

// there are also cute names and such for sequences
var sequenceInfo = exports.sequenceInfo = {
  intro: {
    displayName: {
      'en_US': 'Introduction Sequence',
      'ja': 'まずはここから',
      'fr_FR': 'Séquence d\'introduction',
      'zh_CN': '基础篇',
      'ko': '기본 명령어'
    },
    about: {
      'en_US': 'A nicely paced introduction to the majority of git commands',
      'ja': 'gitの基本的なコマンド群をほどよいペースで学ぶ',
      'fr_FR': 'Une introduction en douceur à la majorité des commandes git',
      'zh_CN': '循序渐进介绍git主要命令',
      'ko': '브랜치 관련 주요 git 명령어를 깔끔하게 알려드립니다'
    }
  },
  rampup: {
    displayName: {
      'en_US': 'Ramping Up',
      'ja': '次のレベルに進もう',
      'fr_FR': 'Montée en puissance',
      'zh_CN': '进阶篇'
    },
    about: {
      'en_US': 'The next serving of 100% git awesomes-ness. Hope you\'re hungry',
      'ja': '更にgitの素晴らしさを堪能しよう',
      'fr_FR' : 'Le prochain service git 100% excellence. J\'espère que vous êtes affamés',
      'zh_CN': '接下来是git的超赞特性。迫不及待了吧！'
    }
  },
  remote: {
    tab: 'remote',
    displayName: {
      'en_US': 'Push & Pull -- Git Remotes!'
    },
    about: {
      'en_US': 'Time to share your 1\'s and 0\'s kids; coding just got social'
    }
  },
  remoteAdvanced: {
    tab: 'remote',
    displayName: {
      'en_US': 'To Origin And Beyond -- Advanced Git Remotes!'
    },
    about: {
      'en_US': 'And you thought being a benevolent dictator would be fun...'
    }
  },
  move: {
    displayName: {
      'en_US': 'Moving Work Around',
      // INTL out of sync :(
      'ja': 'Rebaseをモノにする',
      'fr_FR': 'Maîtrise Rebase, Luke!',
      'zh_CN': '精通Rebase！',
      'ko': '리베이스 완전정복!'
    },
    about: {
      'en_US': 'Get comfortable with modifying the source tree',
      // INTL out of sync :(
      'ja': '話題のrebaseってどんなものだろう？って人にオススメ',
      'fr_FR': 'Qu\'est-ce que ce rebase dont tout le monde parle ? Découvrez-le !',
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
      'fr_FR': 'Sujets Avancés',
      'zh_CN': '高级主题'
    },
    about: {
      'en_US': 'For the truly brave!',
      'fr_FR': 'Pour les plus courageux !',
      'zh_CN': '只为真正的勇士！'
    }
  }
};

exports.getTabForSequence = function(sequenceName) {
  var info = sequenceInfo[sequenceName];
  return (info.tab) ?
    info.tab :
    'main';
};

