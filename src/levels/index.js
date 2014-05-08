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
    require('./mixed/jugglingCommits2').level,
    require('./mixed/tags').level,
    require('./mixed/describe').level
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
      'de_DE': 'Einführung',
      'ja': 'まずはここから',
      'fr_FR': 'Séquence d\'introduction',
      'es_AR': 'Secuencia introductoria',
      'zh_CN': '基础篇',
      'zh_TW': '基礎篇',
      'ko': '기본 명령어'
    },
    about: {
      'en_US': 'A nicely paced introduction to the majority of git commands',
      'de_DE': 'Eine gut abgestimmte Einführung in die wichtigsten Git-Befehle',
      'ja': 'gitの基本的なコマンド群をほどよいペースで学ぶ',
      'fr_FR': 'Une introduction en douceur à la majorité des commandes git',
      'es_AR': 'Una breve introducción a la mayoría de los comandos de git',
      'zh_CN': '循序渐进介绍git主要命令',
      'zh_TW': '循序漸進地介绍 git 主要命令',
      'ko': '브랜치 관련 주요 git 명령어를 깔끔하게 알려드립니다'
    }
  },
  rampup: {
    displayName: {
      'en_US': 'Ramping Up',
      'de_DE': 'Aufstieg',
      'ja': '次のレベルに進もう',
      'fr_FR': 'Montée en puissance',
      'es_AR': 'Acelerando',
      'zh_CN': '进阶篇',
      'zh_TW': '進階篇'
    },
    about: {
      'en_US': 'The next serving of 100% git awesomes-ness. Hope you\'re hungry',
      'de_DE': 'Eine Portion Git-Wahnsinn zum Thema Navigation',
      'ja': '更にgitの素晴らしさを堪能しよう',
      'fr_FR' : 'Le prochain service git 100% excellence. J\'espère que vous êtes affamés',
      'es_AR': 'La próxima porción de 100% maravillas git. Espero que estés hambriento',
      'zh_CN': '接下来是git的超赞特性。迫不及待了吧！',
      'zh_TW': '接下来是 git 非常厲害的地方！相信你已經迫不及待了吧！'
    }
  },
  remote: {
    tab: 'remote',
    displayName: {
      'en_US': 'Push & Pull -- Git Remotes!',
      'de_DE': 'Push & Pull -- entfernte Repositorys',
      'es_AR': 'Push & Pull -- Git Remotes!',
      'zh_CN': 'Push & Pull -- Git Remotes!',
      'zh_TW': 'Push & Pull -- Git Remotes!'
    },
    about: {
      'en_US': 'Time to share your 1\'s and 0\'s kids; coding just got social',
      'de_DE': 'Zeit Eure 1en und 0en zu teilen; Coding mit sozialer Komponente',
      'es_AR': 'Hora de compartir sus 1\'s y 0\'s, chicos; programar se volvió social!',
      'zh_CN': '是时候分享你的编码了',
      'zh_TW': '是時候分享你的程式碼了'
    }
  },
  remoteAdvanced: {
    tab: 'remote',
    displayName: {
      'en_US': 'To Origin And Beyond -- Advanced Git Remotes!',
      'de_DE': 'Bis zum origin und noch weiter',
      'es_AR': 'Hasta el origin y más allá -- Git Remotes avanzado!',
      'zh_CN': '关于origin 和 其它仓库 -- Git Gemotes 高级命令',
      'zh_TW': '關於 origin 和其它 repo，git remote 的進階指令'
    },
    about: {
      'en_US': 'And you thought being a benevolent dictator would be fun...',
      'es_AR': 'Y pensabas que ser un dictador benévolo sería divertido...',
      'zh_CN': '做一名仁慈的独裁者会很有趣..',
      'zh_TW': '而且你會覺得做一個仁慈的獨裁者會很有趣...',
      'de_DE': 'Git Remotes für Fortgeschrittene'
    }
  },
  move: {
    displayName: {
      'en_US': 'Moving Work Around',
      'de_DE': 'Code Umherschieben',
      'es_AR': 'Moviendo el trabajo por ahí',
      // INTL out of sync :(
      'ja': 'Rebaseをモノにする',
      'fr_FR': 'Maîtrise Rebase, Luke!',
      'zh_CN': '精通Rebase！',
      'zh_TW': '精通 rebase！',
      'ko': '리베이스 완전정복!'
    },
    about: {
      'en_US': 'Get comfortable with modifying the source tree',
      'de_DE': 'Gewöhn dich daran, den Git-Baum zu verändern',
      'es_AR': 'Ponete cómodo con modificar el directorio fuente',
      // INTL out of sync :(
      'ja': '話題のrebaseってどんなものだろう？って人にオススメ',
      'fr_FR': 'Qu\'est-ce que ce rebase dont tout le monde parle ? Découvrez-le !',
      'ko': '그 좋다고들 말하는 rebase에 대해 알아봅시다!',
      'zh_CN': '大家都在说的rebase究竟是神马？看看吧！',
      'zh_TW': '大家都在說的 rebase 到底是什麼阿？來看看吧！'
    }
  },
  mixed: {
    displayName: {
      'en_US': 'A Mixed Bag',
      'de_DE': 'Ein Kessel Buntes',
      'ja': '様々なtips',
      'fr_FR': 'Un assortiment',
      'es_AR': 'Bolsa de gatos',
      'ko': '종합선물세트',
      'zh_CN': '大杂烩？',
      'zh_TW': '活用 git 的指令'
    },
    about: {
      'en_US': 'A mixed bag of Git techniques, tricks, and tips',
      'de_DE': 'Eine bunte Mischung von Techniken, Tipps und Tricks',
      'ja': 'gitを使う上での様々なtipsやテクニックなど',
      'fr_FR': 'Un assortiment de techniques et astuces pour utiliser Git',
      'es_AR': 'Un rejunte de técnicas, trucos y tips sobre Git',
      'ko': 'Git을 다루는 다양한 팁과 테크닉을 다양하게 알아봅니다',
      'zh_CN': 'Git技术，技巧与贴士杂烩',
      'zh_TW': 'git 的技術，招數與技巧'
    }
  },
  advanced: {
    displayName: {
      'en_US': 'Advanced Topics',
      'de_DE': 'Themen für Fortgeschrittene',
      'fr_FR': 'Sujets Avancés',
      'es_AR': 'Temas avanzados',
      'zh_CN': '高级主题',
      'zh_TW': '進階主題'
    },
    about: {
      'en_US': 'For the truly brave!',
      'de_DE': '... die nie ein Mensch zuvor gesehen hat.',
      'fr_FR': 'Pour les plus courageux !',
      'es_AR': '¡Para los verdaderos valientes!',
      'zh_CN': '只为真正的勇士！',
      'zh_TW': '來成為真正的強者吧！'
    }
  }
};

exports.getTabForSequence = function(sequenceName) {
  var info = sequenceInfo[sequenceName];
  return (info.tab) ?
    info.tab :
    'main';
};

