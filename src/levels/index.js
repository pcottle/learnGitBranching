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
      'ja'   : 'まずはここから',
      'fr_FR': 'Séquence d\'introduction',
      'es_AR': 'Secuencia introductoria',
      'pt_BR': 'Sequência introdutória',
      'gl'   : 'Secuencia introductoria',
      'zh_CN': '基础篇',
      'zh_TW': '基礎篇',
      'ko'   : 'git 기본',
      'ru_RU': 'Введение',
      'uk'   : 'Вступ'
    },
    about: {
      'en_US': 'A nicely paced introduction to the majority of git commands',
      'de_DE': 'Eine gut abgestimmte Einführung in die wichtigsten Git-Befehle',
      'ja'   : 'gitの基本的なコマンド群をほどよいペースで学ぶ',
      'fr_FR': 'Une introduction en douceur à la majorité des commandes git',
      'es_AR': 'Una breve introducción a la mayoría de los comandos de git',
      'pt_BR': 'Uma breve introdução à maioria dos comandos do git',
      'gl'   : 'Unha breve introducción á maioría dos comandos de git',
      'zh_CN': '循序渐进地介绍 Git 主要命令',
      'zh_TW': '循序漸進地介紹 git 主要命令',
      'ko'   : 'git의 주요 명령어를 깔끔하게 알려드립니다',
      'ru_RU': 'Хорошо подобранное введение в основные команды git',
      'uk'   : 'Гарно підібране введення в основні команди git'
    }
  },
  rampup: {
    displayName: {
      'en_US': 'Ramping Up',
      'de_DE': 'Aufstieg',
      'ja'   : '次のレベルに進もう',
      'fr_FR': 'Montée en puissance',
      'es_AR': 'Acelerando',
      'pt_BR': 'Acelerando',
      'gl'   : 'Alixeirando',
      'zh_CN': '高级篇',
      'zh_TW': '進階篇',
      'ru_RU': 'Едем дальше',
      'uk'   : 'Їдемо далі',
      'ko'   : '다음 단계로'
    },
    about: {
      'en_US': 'The next serving of 100% git awesomes-ness. Hope you\'re hungry',
      'de_DE': 'Eine Portion Git-Wahnsinn zum Thema Navigation',
      'ja'   : '更にgitの素晴らしさを堪能しよう',
      'fr_FR': 'Le prochain excellent plat de pur git. J\'espère que vous êtes affamés',
      'es_AR': 'La próxima porción de 100% maravillas git. Espero que estés hambriento',
      'pt_BR': 'A próxima porção de maravilhas do git. Faminto?',
      'gl'   : 'A próxima porción das marabillas de git. Agardo que estés esfameado',
      'zh_CN': '要开始介绍 Git 的超棒特性了，快来吧！',
      'zh_TW': '接下來是 git 非常厲害的地方！相信你已經迫不及待了吧！',
      'ru_RU': 'Следующая порция абсолютной git-крутотенюшки. Проголодались?',
      'uk'   : 'Наступна порція абсолютної git-дивини. Сподіваюсь, ви зголодніли',
      'ko'   : 'git은 아주 멋져요. 왜 멋진지 알려드립니다'
    }
  },
  remote: {
    tab: 'remote',
    displayName: {
      'en_US': 'Push & Pull -- Git Remotes!',
      'de_DE': 'Push & Pull -- entfernte Repositorys',
      'ja'   : 'Push及びPullコマンド -- Gitリモート',
      'fr_FR': 'Push & Pull -- dépôts gits distants !',
      'es_AR': 'Push & Pull -- Git Remotes!',
      'pt_BR': 'Push & Pull -- repositórios remotos no Git!',
      'gl'   : 'Push & Pull -- Repositorios remotos no Git!',
      'zh_CN': 'Push & Pull —— Git 远程仓库！',
      'zh_TW': 'Push & Pull -- Git Remotes!',
      'ru_RU': 'Push & Pull - удалённые репозитории в Git!',
      'uk'   : 'Push & Pull -- віддалені репозиторії в Git!',
      'ko'   : 'Push & Pull -- Git 원격 저장소!'
    },
    about: {
      'en_US': 'Time to share your 1\'s and 0\'s kids; coding just got social',
      'fr_FR': 'C\'est le temps de partager vos 1 et vos 0 les enfants, le code vient de devenir social.',
      'ja'   : '自分のコードをより広く公開しましょう',
      'de_DE': 'Zeit Eure 1en und 0en zu teilen; Coding mit sozialer Komponente',
      'es_AR': 'Hora de compartir sus 1\'s y 0\'s, chicos; programar se volvió social!',
      'pt_BR': 'Hora de compartilhar seus 1\'s e 0\'s, crianças; programar agora é social!',
      'gl'   : 'Hora de compartilos seus 1\' e 0\'s, rapaces; programar agora é social!',
      'zh_CN': '是时候分享你的代码了，让编码变得社交化吧',
      'zh_TW': '是時候分享你的程式碼了',
      'ru_RU': 'Настало время поделиться своими единичками и нулями. Время коллективного программирования',
      'uk'   : 'Настав час поділитися своїми нулями та одиничками; соціальне програмування',
      'ko'   : '내 코드를 공개할 때가 되었습니다. 코드를 공개해봅시다!'
    }
  },
  remoteAdvanced: {
    tab: 'remote',
    displayName: {
      'en_US': 'To Origin And Beyond -- Advanced Git Remotes!',
      'de_DE': 'Bis zum origin und noch weiter',
      'ja'   : '"origin"とその先へ -- Gitリモート上級編',
      'fr_FR': 'Vers l\'infini et au-delà -- dépôts distants version avancée',
      'es_AR': 'Hasta el origin y más allá -- Git Remotes avanzado!',
      'pt_BR': 'Até a origin e além -- repositórios remotos avançados!',
      'gl'   : 'Ata á orixe e máis aló -- repositorios remotos avanzados!',
      'zh_CN': '关于 origin 和它的周边 —— Git 远程仓库高级操作',
      'zh_TW': '關於 origin 和其它 repo，git remote 的進階指令',
      'ru_RU': 'Через origin – к звёздам. Продвинутое использование Git Remotes',
      'uk'   : 'Через origin – до зірок. Прогресивне використання Git Remotes',
      'ko'   : '"origin"그 너머로 -- 고급 Git 원격 저장소'
    },
    about: {
      'en_US': 'And you thought being a benevolent dictator would be fun...',
      'fr_FR': 'Et vous pensiez qu\'être un dictateur bienfaisant serait amusant...',
      'ja'   : '絶えず上級者の仕事は存在する。。。',
      'es_AR': 'Y pensabas que ser un dictador benévolo sería divertido...',
      'pt_BR': 'E você achava que ser um déspota esclarecido seria mais divertido...',
      'gl'   : 'E pensabas que ser un dictador benévolo sería divertido...',
      'zh_CN': '做一名仁慈的独裁者一定会很有趣……',
      'zh_TW': '而且你會覺得做一個仁慈的獨裁者會很有趣...',
      'de_DE': 'Git Remotes für Fortgeschrittene',
      'ru_RU': 'Весело было быть всесильным мудрым правителем...',
      'uk'   : 'А ти думав, що бути всесильним диктатором весело...',
      'ko'   : '자비로운 독재자가 되는게 재밌을 줄 알았겠지만...'
    }
  },
  move: {
    displayName: {
      'en_US': 'Moving Work Around',
      'de_DE': 'Code Umherschieben',
      'fr_FR': 'Déplacer le travail',
      'es_AR': 'Moviendo el trabajo por ahí',
      'pt_BR': 'Movendo trabalho por aí',
      'gl'   : 'Movendo o traballo por ahí',
      'ja'   : 'コードの移動',
      'ko'   : '코드 이리저리 옮기기',
      'zh_CN': '移动提交记录',
      'zh_TW': '調整提交順序',
      'ru_RU': 'Перемещаем труды туда-сюда',
      'uk'   : 'Переміщуємо роботу туди-сюди'
    },
    about: {
      'en_US': 'Get comfortable with modifying the source tree',
      'de_DE': 'Gewöhn dich daran, den Git-Baum zu verändern',
      'fr_FR': 'Soyez à l\'aise pour modifier l\'arbre Git',
      'es_AR': 'Ponete cómodo con modificar el directorio fuente',
      'pt_BR': 'Fique confortável em modificar a árvore de códigos',
      'gl'   : 'Ponte cómodo modificando a árbore de git',
      'ko'   : '작업 트리를 수정하는건 식은죽 먹기지요 이제',
      'ja'   : '話題のrebaseってどんなものだろう？って人にオススメ',
      'zh_CN': '自由修改提交树',
      'zh_TW': '自由修改提交樹',
      'ru_RU': 'Не стесняйтесь менять историю',
      'uk'   : 'Не соромимось змінювати історію'
    }
  },
  mixed: {
    displayName: {
      'en_US': 'A Mixed Bag',
      'de_DE': 'Ein Kessel Buntes',
      'ja'   : '様々なtips',
      'fr_FR': 'Un assortiment',
      'es_AR': 'Bolsa de gatos',
      'pt_BR': 'Sortidos',
      'gl'   : 'Todo mesturado',
      'ko'   : '종합선물세트',
      'zh_CN': '杂项',
      'zh_TW': '活用 git 的指令',
      'ru_RU': 'Сборная солянка',
      'uk'   : 'Всяке'
    },
    about: {
      'en_US': 'A mixed bag of Git techniques, tricks, and tips',
      'de_DE': 'Eine bunte Mischung von Techniken, Tipps und Tricks',
      'ja'   : 'gitを使う上での様々なtipsやテクニックなど',
      'fr_FR': 'Un assortiment de techniques et astuces pour utiliser Git',
      'es_AR': 'Un rejunte de técnicas, trucos y tips sobre Git',
      'pt_BR': 'Técnicas, truques e dicas sortidas sobre Git',
      'gl'   : 'Mestura de técnicas, trucos e consellos',
      'ko'   : 'Git을 다루는 다양한 팁과 테크닉을 다양하게 알아봅니다',
      'zh_CN': 'Git 技术、技巧与贴士大集合',
      'zh_TW': 'git 的技術，招數與技巧',
      'ru_RU': 'Ассорти из приёмов работы с Git, хитростей и советов',
      'uk'   : 'Різні прийоми роботи з Git, хитрощі та поради'
    }
  },
  advanced: {
    displayName: {
      'en_US': 'Advanced Topics',
      'de_DE': 'Themen für Fortgeschrittene',
      'ja'   : '上級トピック',
      'fr_FR': 'Sujets avancés',
      'es_AR': 'Temas avanzados',
      'pt_BR': 'Temas avançados',
      'gl'   : 'Temas avanzados',
      'zh_CN': '高级话题',
      'zh_TW': '進階主題',
      'ru_RU': 'Продвинутый уровень',
      'uk'   : 'Досвідчений рівень',
      'ko'   : '고급 문제'
    },
    about: {
      'en_US': 'For the truly brave!',
      'de_DE': '... die nie ein Mensch zuvor gesehen hat.',
      'ja'   : '勇気ある人のみ！',
      'fr_FR': 'Pour les plus courageux !',
      'es_AR': '¡Para los verdaderos valientes!',
      'pt_BR': 'Para os verdadeiros valentes!',
      'gl'   : '¡Para os verdadeiros valerosos!',
      'zh_CN': '只为真正的勇士！',
      'zh_TW': '來成為真正的強者吧！',
      'ru_RU': 'Если ты смелый, ловкий, умелый – потренируйся тут',
      'uk'   : 'Для хоробрих',
      'ko'   : '용기있는 도전자를 위해 준비한 문제입니다'
    }
  }
};

exports.getTabForSequence = function(sequenceName) {
  var info = sequenceInfo[sequenceName];
  return (info.tab) ?
    info.tab :
    'main';
};
