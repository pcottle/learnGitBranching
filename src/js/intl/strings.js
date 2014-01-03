exports.strings = {
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-finished': {
    '__desc__': 'One of the lines in the next level dialog',
    'ja': '最後のレベルをクリアしました！すごい！！',
    'en_US': 'Wow! You finished the last level, great!',
    'de_DE': 'Wow! Du hast den letzten Level gelöst, super!',
    'zh_CN': '我的个天！你完成了最后一关，碉堡了！',
    'fr_FR': 'Félicitations, vous avez réussi le dernier niveau !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-next': {
    '__desc__': 'One of the lines in the next level dialog',
    'en_US': 'Would you like to move on to *"{nextLevel}"*, the next level?',
    'de_DE': 'Möchtest du mit *"{nextLevel}"* weitermachen, dem nächsten Level?',
    'ja': '次の章 *"{nextLevel}"* へ進みますか？',
    'zh_CN': '要不前进到下一关 *“{nextLevel}”*？',
    'fr_FR': 'Voulez-vous passer à *"{nextLevel}"*, le prochain niveau ?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-win': {
    '__desc__': 'One of the lines in the next level dialog',
    'en_US': 'Awesome! You matched or exceeded our solution.',
    'de_DE': 'Wahnsinn! Du warst so gut wie unsere Lösung, oder sogar besser.',
    'ja': '素晴らしい！このレベルをクリアしましたね。',
    'zh_CN': '牛鼻啊！你达到或者完爆了我们的答案。',
    'fr_FR': 'Fabuleux ! Votre solution a égalé ou surpassé notre solution.'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-lose': {
    '__desc__': 'When the user entered more commands than our best, encourage them to do better',
    'en_US': 'See if you can whittle it down to {best} :D',
    'de_DE': 'Schau mal ob du es in {best} Schritten hinbekommst :D',
    'ja': '模範解答の回数={best}回でクリアする方法も考えてみましょう :D',
    'zh_CN': '试试看你能否在 {best} 之内搞定 :D',
    'fr_FR': 'Voyons si vous pouvez descendre à {best} :D'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-prune-tree': {
    '__desc__': 'warning when pruning tree',
    'en_US': 'Warning! Mercurial does aggressive garbage collection and thus needs to prune your tree',
    'de_DE': 'Achtung! Mercurial macht aggressive Garbage Collection und muss daher deinen Baum reduzieren'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-a-option': {
    '__desc__': 'warning for when using -A option',
    'en_US': 'The -A option is not needed for this app, just commit away!',
    'de_DE': 'Die Option -A wird in dieser Anwendung nicht benötigt, committe einfach!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-error-no-status': {
    '__desc__': 'One of the errors for hg',
    'en_US': 'There is no status command for this app, since there is no staging of files. Try hg summary instead',
    'de_DE': 'Es gibt keinen Befehl status in dieser Anwendung, da es kein Staging von Dateien gibt. Probier stattdessen hg summary'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-error-need-option': {
    '__desc__': 'One of the errors for hg',
    'en_US': 'I need the option {option} for that command!',
    'de_DE': 'Ich benötige die Option {option} für diesen Befehl!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-error-log-no-follow': {
    '__desc__': 'hg log without -f (--follow)',
    'en_US': 'hg log without -f is currently not supported, use -f',
    'de_DE': 'hg log ohne -f wird aktuell nicht unterstützt, benutze bitte -f'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-detached': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'Detached head!',
    'de_DE': 'Detached head!',
    'zh_CN': '脑袋搬家（Detached head）了！',
    'fr_FR': 'head détaché !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-onbranch': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'On branch {branch}',
    'de_DE': 'Auf Branch {branch}',
    'zh_CN': '切换到分支 {branch}',
    'fr_FR': 'Sur la branche {branch}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-readytocommit': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'Ready to commit! (as always in this demo)',
    'de_DE': 'Fertig zum committen! (Wie immer in dieser Demo)',
    'zh_CN': '可以提交啦！（这演示里一直可以提交）',
    'fr_FR': 'Prêt à commit ! (comme toujours dans cette démo)'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-dummy-msg': {
    '__desc__': 'The dummy commit message for all commits. Feel free to put in a ' +
      'shoutout to your school / city / whatever!',
    'en_US': 'Quick commit. Go Bears!',
    'de_DE': 'Schneller Commit. Eff-Zeh!',
    'zh_CN': '快速提交。上啊月熊！',
    'fr_FR': 'Commit rapide. NoMaN Sux!'
  },
  'git-error-origin-fetch-uptodate': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Already up to date!',
    'de_DE': 'Bereits aktuell!',
    'fr_FR': 'Déjà à jour'
  },
  'git-error-origin-fetch-no-ff': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Your origin branch is out of sync with the remote branch and fetch cannot be performed',
    'de_DE': 'Dein origin Branch ist nicht auf dem Stand des Remote Branch und fetch kann nicht ausgeführt werden',
    'fr_FR': 'Votre branche origin n\'est plus synchronisée avec la branche distante et fetch ne peut pas être appliqué. Essayez avec l\'option --force'
  },
  'git-error-origin-push-no-ff': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The remote repository has diverged from your local repository, so uploading your changes is not a simple fast forward (and thus your push was rejected). Please pull down the new changes in the remote repository, incorporate them into this branch, and try again. You can do so with git pull or git pull --rebase',
    'de_DE': 'Das entfernte Repository weicht von deinem lokalen Repository ab, daher können deine Änderungen nicht mit einem einfachen fast forward hochgeladen werden (und daher ist dein push abgelehnt worden). Bitte pull erst die neuen Änderungen in das lokale Repository, integriere sie in den Branch und versuch es nochmal. Das kannst du mit git pull oder git pull --rebase machen',
    'fr_FR': 'Le dépôt distant a divergé de votre référentiel local, donc l\'envoi de vos modifications n\'est pas en simple avance rapide (et donc votre envoi a été rejeté). Veuillez récupérer les nouveaux changements depuis le dépôt distant, les intégrer dans cette branche, et essayez à nouveau. Vous pouvez le faire avec git pull ou git pull --rebase'
  },
  'git-error-remote-branch': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'You cannot execute that command on a remote branch',
    'de_DE': 'Du kannst diesen Befehl nicht auf einem Remote Branch ausführen',
    'fr_FR': 'Vous ne pouvez exécuter cette commande sur une branche distante'
  },
  'git-error-origin-required': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'An origin is required for that command',
    'de_DE': 'Für diesen Befehl wird origin benötigt',
    'fr_FR': 'Une origine est requise pour cette commande'
  },
  'git-error-origin-exists': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'An origin already exists! You cannot make a new one',
    'de_DE': 'origin existiert bereits! Du kannst es nicht nochmal anlegen',
    'fr_FR': 'Une origine existe déjà ! Vous ne pouvez pas en créer une nouvelle'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-branch': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'You can\'t delete the master branch, the branch you are on, or things that ' +
      'aren\'t branches',
    'de_DE': 'Du kannst nicht den Branch master, den Branch auf dem du gerade arbeitest oder Refs, die keine Branches sind, löschen',
    'zh_CN': '你不能删除主分支（master），或者你当前所在的分支，或者其他不是分支也不知道能不能吃的东西。',
    'fr_FR': 'Vous ne pouvez supprimer la branche master, la branche sur laquelle vous êtes, ou ce qui n\'est pas une branche'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-merge-msg': {
    '__desc__': 'The commit message for a merge commit',
    'en_US': 'Merge {target} into {current}',
    'de_DE': 'Mergen von {target} in {current}',
    'zh_CN': '合并 {target} 到 {current}',
    'fr_FR': 'Merge de {target} dans {current}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-rebase-none': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'No commits to rebase! Everything is a merge commit or changes already applied',
    'de_DE': 'Keine Commits für Rebase gefunden! Alle Commits sind Merge Commits oder beinhalten nur schon vorhandene Änderungen',
    'zh_CN': '没有需要 rebase 的提交！都是个合并提交，或者已经 rebase 过了。',
    'fr_FR': 'Aucune commit à rebaser ! Tout est soit un commit de merge, soit des modifications déjà appliquées'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-nothing': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Nothing to do...',
    'de_DE': 'Nichts zu tun ...',
    'zh_CN': '没啥鸟事……',
    'fr_FR': 'Rien à effectuer…'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-fastforward': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Fast forwarding...',
    'de_DE': 'Fast forward...',
    'zh_CN': '快速前进……',
    'fr_FR': 'En avance rapide…'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-uptodate': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Branch already up-to-date',
    'de_DE': 'Branch ist bereits aktuell',
    'zh_CN': '分支已经是最新啦',
    'fr_FR': 'Branche déjà à jour'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-exist': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The ref {ref} does not exist or is unknown',
    'de_DE': 'Die Ref {ref} existiert nicht oder ist unbekannt',
    'zh_CN': '索引 {ref} 不存在，或者找不到。',
    'fr_FR': 'La référence {ref} n\'existe pas ou est inconnue'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-relative-ref': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Commit {commit} doesnot have a {match}',
    'de_DE': 'Commit {commit} hat kein {match}',
    'zh_CN': '提交 {commit} 并没有 {match}',
    'fr_FR': 'Le commit {commit} n\'a pas de correspondance {match}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-detached': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'Warning!! Detached HEAD state',
    'de_DE': 'Achtung! Detached HEAD Zustand',
    'zh_CN': '警告！脑袋搬家（Detached HEAD）状态',
    'fr_FR': 'Attention ! HEAD est détaché'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-add': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'No need to add files in this demo',
    'de_DE': 'In dieser Demo müssen keine Dateien hinzugefügt werden',
    'zh_CN': '此演示中不需要添加文件',
    'fr_FR': 'Aucun besoin d\'ajouter des fichiers dans cette démo'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-options': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Those options you specified are incompatible or incorrect',
    'de_DE': 'Die angegebenen Optionen sind inkompatibel oder falsch',
    'zh_CN': '你所指定的参数不兼容或者不准确',
    'fr_FR': 'Les options que vous avez spécifiées sont incompatibles ou incorrectes'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-already-exists': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The commit {commit} already exists in your changes set, aborting!',
    'de_DE': 'Der Commit {commit} existiert bereit, Abbruch!',
    'zh_CN': '提交 {commit} 已经存在于你的改动集里，正在中止！',
    'fr_FR': 'Le commit {commit} existe déjà dans votre ensemble de modifications, opération avortée !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-reset-detached': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Can\'t reset in detached head! Use checkout if you want to move',
    'de_DE': 'Kann im Detached Head Zustand kein reset ausführen! Bitte checkout zum Bewegen benutzen',
    'zh_CN': '不能在分离的 HEAD 里重置！用 checkout 吧',
    'fr_FR': 'On ne peut pas effectuer un reset quand head est détaché. Utilisez checkout pour déplacer'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-hard': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'The default behavior is a --hard reset, feel free to omit that option!',
    'de_DE': 'Das Standardverhalten in dieser Demo ist --hard, du kannst die Option auch weglassen!',
    'zh_CN': '默认的行为是 --hard 硬重置，尽管省略掉那个选项吧！',
    'fr_FR': 'Le comportement par défaut est un --hard reset, soyez libre d\'omettre cette option !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-staging': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'There is no concept of adding / staging files, so that option or ' +
      'command is invalid!',
    'de_DE': 'In dieser Demo gibt es kein Hinzufügen / Vormerken von Dateien, dieser Befehl ist daher ungültig!',
    'zh_CN': '没有添加、缓存文件的必要，所以改选项或者命令是不合法的。',
    'fr_FR': 'Il n\'y a pas le concept d\'ajouter / mettre en staging, donc cette option ou commande est invalide'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-revert-msg': {
    '__desc__': 'Message for reverting git command',
    'en_US': 'Reverting {oldCommit}: {oldMsg}',
    'de_DE': 'Reverte {oldCommit}: {oldMsg}',
    'zh_CN': '撤销 {oldCommit}：{oldMsg}',
    'fr_FR': 'Revert {oldCommit}: {oldMsg}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-args-many': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'I expect at most {upper} argument(s) for {what}',
    'de_DE': 'Ich benötige maximal {upper} Argument(e) für {what}',
    'zh_CN': '{what} 期望最多 {upper} 个参数',
    'fr_FR': 'J\'attends au plus {upper} argument(s) pour {what}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-args-few': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'I expect at least {lower} argument(s) for {what}',
    'de_DE': 'Ich benötige mindestens {lower} Argument(e) für {what}',
    'zh_CN': '{what} 期望最少 {lower} 个参数',
    'fr_FR': 'J\'attends au moins {upper} argument(s) pour {what}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-no-general-args': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'That command accepts no general arguments',
    'de_DE': 'Dieser Befehl akzeptiert keine allgemeinen Argumente',
    'zh_CN': '该命令不接收参数',
    'fr_FR': 'Cette commande n\'accepte aucun argument général'
  },
  ///////////////////////////////////////////////////////////////////////////
  'copy-tree-string': {
    '__desc__': 'The prompt to copy the tree when sharing',
    'en_US': 'Copy the tree string below',
    'de_DE': 'Kopiere die folgende Baum-Zeichenkette',
    'zh_CN': '拷贝下面的树字符串',
    'fr_FR': 'Copiez la chaîne d\'arbre ci-dessous'
  },
  ///////////////////////////////////////////////////////////////////////////
  'learn-git-branching': {
    '__desc__': 'The title of the app, with spaces',
    'en_US': 'Learn Git Branching',
    'de_DE': 'Learn Git Branching',
    'ja': '日本語版リポジトリ',
    'ko': 'Git 브랜치 배우기',
    'zh_CN': '学习Git分支',
    'fr_FR': 'Apprenez Git Branching'
  },
  ///////////////////////////////////////////////////////////////////////////
  'select-a-level': {
    '__desc__': 'The prompt to select a level on the drop down view',
    'en_US': 'Select a level',
    'de_DE': 'Level auswählen',
    'zh_CN': '选择一关',
    'fr_FR': 'Choisissez un niveau'
  },
  ///////////////////////////////////////////////////////////////////////////
  'branch-name-short': {
    '__desc__': 'When branch names get too long, we need to truncate them. This is the warning for that',
    'en_US': 'Sorry, we need to keep branch names short for the visuals. Your branch name was truncated to 9 characters, resulting in "{branch}"',
    'de_DE': 'Tut mir leid, aber aus Gründen der Darstellung müssen wir die Branch-Namen kurz halten. Dein Branch-Name wurde auf 9 Zeichen gekürzt und heißt daher jetzt "{branch}"',
    'zh_CN': '抱歉，为了显示的需要，我们需要一个短些的分支名称。您使用的将被截断到9个字符，即"{branch}"',
    'fr_FR': 'Désolé, nous devons garder les noms de branches courts pour la visualisation. Votre nom de branche a été tronqué à 9 caractères, devenant "{branch}"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'bad-branch-name': {
    '__desc__': 'When the user enters a branch name thats not ok',
    'en_US': 'That branch name "{branch}" is not allowed!',
    'de_DE': 'Der Branch-Name "{branch}" ist nicht erlaubt!',
    'zh_CN': '不能给分支起这个名字 "{branch}"',
    'fr_FR': 'Ce nom de branche "{branch}" n\'est pas autorisé'
  },
  ///////////////////////////////////////////////////////////////////////////
  'bad-tag-name': {
    '__desc__': 'When the user enters a tag name thats not ok',
    'en_US': 'That tag name "{tag}" is not allowed!',
    'de_DE': 'Der Tag-Name "{tag}" ist nicht erlaubt!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'option-not-supported': {
    '__desc__': 'When the user specifies an option that is not supported by our demo',
    'en_US': 'The option "{option}" is not supported!',
    'de_DE': 'Die  Option "{option}" wird nicht unterstützt!',
    'zh_CN': '不支持选项 "{option}"',
    'fr_FR': 'L\'option "{option}" n\'est pas supportée'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-usage-command': {
    '__desc__': 'The line that shows how to format a git command',
    'en_US': 'git <command> [<args>]',
    'de_DE': 'git <Befehl> [<Argumente>]',
    'zh_CN': 'git <命令> [<参数>]',
    'fr_FR': 'git <commande> [<arguments>]'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-supported-commands': {
    '__desc__': 'In the git help command, the header above the supported commands',
    'en_US': 'Supported commands:',
    'de_DE': 'Unterstützte Befehle:',
    'zh_CN': '支持的命令有:',
    'fr_FR': 'Commandes supportées'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-usage': {
    '__desc__': 'In the dummy git output, the header before showing all the commands',
    'en_US': 'Usage:',
    'de_DE': 'Benutzung:',
    'zh_CN': '使用:',
    'fr_FR': 'Utilisation :'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-version': {
    '__desc__': 'The git version dummy output, kind of silly. PCOTTLE is my unix name but feel free to put yours instead',
    'en_US': 'Git Version PCOTTLE.1.0',
    'de_DE': 'Git Version PCOTTLE.1.0.jbr',
    'zh_CN': 'Git 版本 PCOTTLE.1.0',
    'fr_FR': 'Git version PCOTTLE.1.0'
  },
  ///////////////////////////////////////////////////////////////////////////
  'flip-tree-command': {
    '__desc__': 'when the tree is being flipped',
    'en_US': 'Flipping tree...'
  },
  ///////////////////////////////////////////////////////////////////////////
  'refresh-tree-command': {
    '__desc__': 'when the tree is visually refreshed',
    'en_US': 'Refreshing tree...',
    'de_DE': 'Aktualisiere Baum ...',
    'zh_CN': '正在刷新树结构...',
    'fr_FR': 'Actualisation de l\'arbre…'
  },
  ///////////////////////////////////////////////////////////////////////////
  'locale-command': {
    '__desc__': 'when the locale is set to something',
    'en_US': 'Locale set to {locale}',
    'de_DE': 'Locale auf {locale} gesetzt',
    'zh_CN': '语言更改为 {locale}',
    'fr_FR': 'Langue changée à {locale}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'locale-reset-command': {
    '__desc__': 'when the locale is reset',
    'en_US': 'Locale reset to default, which is {locale}',
    'de_DE': 'Locale auf Standard zurückgesetzt, also {locale}',
    'zh_CN': '语言重置为默认的 {locale}',
    'fr_FR': 'Langue remise par défaut, qui est {locale}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'show-command': {
    '__desc__': 'command output title from "show"',
    'en_US': 'Please use one of the following commands for more info:',
    'de_DE': 'Bitte benutze einen der folgenden Befehle um mehr Informationen zu bekommen:',
    'fr_FR': 'Merci d\'utiliser une des commandes suivantes pour obtenir plus d\'info'
  },
  ///////////////////////////////////////////////////////////////////////////
  'show-all-commands': {
    '__desc__': 'command output title from "show commands"',
    'en_US': 'Here is a list of all the commmands available:',
    'de_DE': 'Hier ist eine Liste aller verfügbarer Befehle:',
    'fr_FR': 'Ci-dessous est la liste de toutes les commandes disponibles :'
  },
  ///////////////////////////////////////////////////////////////////////////
  'cd-command': {
    '__desc__': 'dummy command output for the command in the key',
    'en_US': 'Directory changed to "/directories/dont/matter/in/this/demo"',
    'de_DE': 'Verzeichnis gewechselt zu "/verzeichnisse/sind/in/dieser/demo/latte"',
    'zh_CN': '目录切换到 "/directories/dont/matter/in/this/demo"',
    'fr_FR': 'Répertoire changé à "/directories/dont/matter/in/this/demo" (les répertoires ne servent à rien dans cette démo)'
  },
  ///////////////////////////////////////////////////////////////////////////
  'ls-command': {
    '__desc__': 'Dummy command output for the command in the key',
    'en_US': 'DontWorryAboutFilesInThisDemo.txt',
    'de_DE': 'VergissDateienInDieserDemo.txt',
    'zh_CN': 'DontWorryAboutFilesInThisDemo.txt (译: 在试验里不用担心文件.txt)',
    'fr_FR': 'DontWorryAboutFilesInThisDemo.txt (ne vous préoccupez pas des noms de fichier dans cette démo)'
  },
  'mobile-alert': {
    '__desc__': 'When someone comes to the site on a mobile device, they can not input commands so this is a nasty alert to tell them',
    'en_US': 'LGB can\'t receive input on mobile, visit on desktop! it\'s worth it :D',
    'de_DE': 'LGB ist nicht mit mobilen Endgeräten kompatibel, nutz es vom Desktop! Es lohnt sich :D',
    'zh_CN': '无法在移动设备/平板上调出键盘 :( 请试试桌面版 :D',
    'fr_FR': 'Impossible de faire apparaître le clavier sur mobile / tablette :( Essayez de passer sur un ordinateur de bureau :D'
  },
  ///////////////////////////////////////////////////////////////////////////
  'share-tree': {
    '__desc__': 'When you export a tree, we want you to share the tree with friends',
    'en_US': 'Share this tree with friends! They can load it with "import tree"',
    'de_DE': 'Teile diesen git-Baum mit Freunden! Sie können ihn mit "import tree" laden',
    'zh_CN': '与你的好友分享提交树！他们可以用 "import tree" 加载它',
    'fr_FR': 'Partagez cet arbre avec vos amis ! Ils peuvent le charger avec "import tree"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'paste-json': {
    '__desc__': 'When you are importing a level or tree',
    'en_US': 'Paste a JSON blob below!',
    'de_DE': 'Füg einen JSON-Blob unten ein!',
    'zh_CN': '在下边粘贴一个JSON串',
    'fr_FR': 'Collez un blob JSON ci-dessous !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'solved-map-reset': {
    '__desc__': 'When you reset the solved map to clear your solved history, in case someone else wants to use your browser',
    'en_US': 'Solved map was reset, you are starting from a clean slate!',
    'de_DE': 'Gelöste Karte wurde zurückgesetzt, du fängst mit einem leeren Blatt an!',
    'zh_CN': '解决列表已重置，您现在从零开始了',
    'fr_FR': 'La carte des niveaux résolus a été effacée, vous repartez de zéro !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-cant-exit': {
    '__desc__': 'When the user tries to exit a level when they are not in one',
    'en_US': 'You are not in a level! You are in a sandbox, start a level with "levels"',
    'de_DE': 'Du bist nicht in einem Level! Du bist im Sandkasten-Modus, starte einen Level mit "levels"',
    'zh_CN': '您没在关卡中！您在沙盒中，要开始关卡请输入 "levels"',
    'fr_FR': 'Vous n\'êtes pas dans un niveau ! Vous êtes dans le mode bac à sable, commencez un niveau avec "levels"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-no-id': {
    '__desc__': 'When you say an id but that level doesnt exist',
    'en_US': 'A level for that id "{id}" was not found! Opening up a level selection view',
    'de_DE': 'Konnte keinen Level mit der ID "{id}" finden! Öffne einen Level-Auswahldialog',
    'zh_CN': '没找到id为 "{id}" 的关卡！打开关卡选择框',
    'fr_FR': 'Le niveau dont l\'identifiant est {id} n\'a pas été trouvé ! Ouverture de la vue de sélection des niveaux'
  },
  ///////////////////////////////////////////////////////////////////////////
  'undo-stack-empty': {
    '__desc__': 'The undo command can only undo back until the last time the level was reset or the beginning of the level',
    'en_US': 'The undo stack is empty!',
    'de_DE': 'Die Undo-Liste ist leer!',
    'zh_CN': '还没有什么可以撤销',
    'fr_FR': 'La pile d\'annulation est vide !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'already-solved': {
    '__desc__': 'When you play in a level that is already solved',
    'en_US': 'You have already solved this level, try other levels with "levels" or go back to sandbox with "sandbox"',
    'de_DE': 'Du hast diesen Level bereits gelöst, probier einen anderen Level mit "levels" aus oder geh in den Sandkasten-Modus mit "sandbox"',
    'zh_CN': '你已经解决了本关，输入 "levels" 尝试其他关卡，或者输入 "sandbox" 回到沙盒中',
    'fr_FR': 'Vous avez déjà résolu ce niveau, essayez d\'autres niveaux avec "levels" ou revenez au bac à sable avec "sandbox"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'command-disabled': {
    '__desc__': 'When you try a command that is disabled',
    'en_US': 'That git command is disabled for this level!',
    'de_DE': 'Dieser git-Befehl ist für diesen Level deaktiviert!',
    'zh_CN': '该命令在本关不允许使用！',
    'fr_FR': 'Cette commande git est désactivée pour ce niveau !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'share-json': {
    '__desc__': 'when you have made the level, prompt to share this',
    'en_US': 'Here is the JSON for this level! Share it with somenoe or send it to me on Github',
    'de_DE': 'Hier ist das JSON für diesen Level! Teil es mit jemandem or schick es mir über Github',
    'zh_CN': '这是一个关卡定义JSON！您可以分享它或者发到我的GitHub上',
    'fr_FR': 'Voici le JSON pour ce niveau ! Partagez-le avec quelqu\'un ou envoyez-le moi sur Github'
  },
  ///////////////////////////////////////////////////////////////////////////
  'want-start-dialog': {
    '__desc__': 'prompt to add a start dialog',
    'en_US': 'You have not specified a start dialog, would you like to add one?',
    'de_DE': 'Du hast noch keinen Einführungs-Dialog geschrieben, willst du einen hinzufügen?',
    'zh_CN': '您还没有定义一开始的介绍，是否添加一个？',
    'fr_FR': 'Vous n\'avez pas spécifié de dialogue de départ, voulez-vous en ajouter un ?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'want-hint': {
    '__desc__': 'prompt to add a hint',
    'en_US': 'You have not specified a hint, would you like to add one?',
    'de_DE': 'Du hast noch keinen Hinweis geschrieben, magst du einen hinzufügen?',
    'zh_CN': '您还没有定义提示，是否添加一个？',
    'fr_FR': 'Vous n\'avez pas spécifié d\'indice, voulez-vous en ajouter un ?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'prompt-hint': {
    '__desc__': 'prompt for hint',
    'en_US': 'Enter the hint for this level, or leave this blank if you do not want to include one',
    'de_DE': 'Gib den Hinweis für diesen Level an, oder lass es leer wenn du keinen hinzufügen willst',
    'zh_CN': '请输入关卡提示，或者故意留空',
    'fr_FR': 'Entrez l\'indice pour ce niveau, ou laissez-le vide pour ne pas l\'inclure'
  },
  ///////////////////////////////////////////////////////////////////////////
  'prompt-name': {
    '__desc__': 'prompt for level name',
    'en_US': 'Enter the name for the level',
    'de_DE': 'Gib den Namen für diesen Level an',
    'zh_CN': '输入关卡名',
    'fr_FR': 'Entrez le nom pour ce niveau'
  },
  ///////////////////////////////////////////////////////////////////////////
  'solution-empty': {
    '__desc__': 'If you define a solution without any commands, aka a level that is solved without doing anything',
    'en_US': 'Your solution is empty!! Something is amiss',
    'de_DE': 'Deine Auflösung ist leer! Hier fehlt etwas',
    'zh_CN': '你的解法是空的!! 这应该是出错了',
    'fr_FR': 'Votre solution est vide !! Quelque chose ne tourne pas rond'
  },
  ///////////////////////////////////////////////////////////////////////////
  'define-start-warning': {
    '__desc__': 'When you define the start point again, it overwrites the solution and goal so we add a warning',
    'en_US': 'Defining start point... solution and goal will be overwritten if they were defined earlier',
    'de_DE': 'Lege Start fest ... Auflösung und Ziel werden gelößcht, falls sie schon festgelegt worden waren',
    'zh_CN': '定义开始点... 解决方法和目标会被新的替代',
    'fr_FR': 'Redéfinition du point de départ… la solution et la cible seront écrasés s\'ils ont déjà été définis'
  },
  ///////////////////////////////////////////////////////////////////////////
  'help-vague-level': {
    '__desc__': 'When you are in a level and you say help, its vague and you need to specify',
    'en_US': 'You are in a level, so multiple forms of help are available. Please select either "help level" to learn more about this lesson, "help general" for using Learn GitBranching, or "objective" to learn about how to solve the level.',
    'de_DE': 'Du befindest dich in einem Level, daher gibt es verschiedene Hilfen. Gib "help level" ein um mehr úber diesen Level zu erfahren, "help general" um zu sehen wie Learn Git Branching bedient wird, oder "objective" um das Ziel dieses Levels zu erfahren.',
    'zh_CN': '您正在关卡中，这里有多种形式的帮助，请选择 "help level" (关卡帮助)或 "help general" (一般帮助)',
    'fr_FR': 'Vous êtes dans un niveau, donc plusieurs formes d\'aide sont disponibles. Merci de sélectionner soit "help level" pour en apprendre plus sur cette leçon, "help general" pour l\'utilisation de Learn GitBranching, ou "objective" pour apprendre comment résoudre le niveau'
  },
  ///////////////////////////////////////////////////////////////////////////
  'help-vague-builder': {
    '__desc__': 'When you are in a level builder, the help command is vague so you need to specify what you mean',
    'en_US': 'You are in a level builder, so multiple forms of help are available. Please select either "help general" or "help builder"',
    'de_DE': 'Du befindest dich im Level-Editor, daher gibt es verschiedene Hilfen. Gib bitte "help general" oder "help builder" ein',
    'zh_CN': '您正在进行关卡构建中，这里有多种形式的帮助，请选择 "help general" (一般帮助)或 "help builder" (关卡构建帮助)',
    'fr_FR': 'Vous êtes dans l\'éditeur de niveaux, donc plusieurs formes d\'aide sont disponibles. Merci de sélectionner soit "help general" soit "help builder"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'goal-to-reach': {
    '__desc__': 'title of window that shoes the goal tree to reach',
    'en_US': 'Goal To Reach',
    'de_DE': 'Ziel',
    'zh_CN': '目标',
    'fr_FR': 'Cible à atteindre'
  },
  ///////////////////////////////////////////////////////////////////////////
  'goal-only-master': {
    '__desc__': 'the helper message for the window that shows the goal tree when the goal will only be compared using the master branch',
    'en_US': '<span class="fwber">Note:</span> Only the master branch will be checked in this level. The other branches are simply for reference (shown as dashed labels below). As always, you can hide this dialog with "hide goal"',
    'de_DE': '<span class="fwber">Hinweis:</span> In diesem Level wird nur der Branch master geprüft. Die anderen Branches dienen nur als Vergleichsbasis (als gestrichelte Bezeichner dargestellt). Wie immer kannst du diese Meldung mit "hide goal" ausblenden'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-goal': {
    '__desc__': 'the helper message for the window that shows the goal tree',
    'en_US': 'You can hide this window with "hide goal"',
    'de_DE': 'Du kannst diese Meldung mit "hide goal" ausblenden',
    'zh_CN': '你可以通过命令 "hide goal" 关闭这个窗口',
    'fr_FR': 'Vous pouvez masquer cette fenêtre avec "hide goal"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-start': {
    '__desc__': 'The helper message for the window that shows the start tree for a level',
    'en_US': 'You can hide this window with "hide start"',
    'de_DE': 'Du kannst diese Meldung mit "hide start" ausblenden',
    'zh_CN': '你可以通过命令 "hide start" 关闭这个窗口',
    'fr_FR': 'Vous pouvez masquer cette fenêtre avec "hide start"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-builder': {
    '__desc__': 'The name for the environment where you build levels',
    'en_US': 'Level Builder',
    'de_DE': 'Level-Editor',
    'zh_CN': '关卡生成器',
    'fr_FR': 'Éditeur de niveaux'
  },
  ///////////////////////////////////////////////////////////////////////////
  'no-start-dialog': {
    '__desc__': 'when the user tries to open a start dialog for a level that does not have one',
    'en_US': 'There is no start dialog to show for this level!',
    'de_DE': 'Es gibt keinen Einführungs-Dialog für diesen Level!',
    'zh_CN': '介绍? 这关真没有!',
    'fr_FR': 'Il n\'y a aucun dialogue de départ à afficher pour ce niveau !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'no-hint': {
    '__desc__': 'when no hint is available for a level',
    'en_US': "Hmm, there doesn't seem to be a hint for this level :-/",
    'de_DE': "Hm, es gibt anscheinend keinen Hinweis für diesen Level :-/",
    'zh_CN': "提示？嗯，这关真没有哎~ :-/",
    'fr_FR': 'Hum, il ne semble pas y avoir d\'indice pour ce niveau :-/'
  },
  ///////////////////////////////////////////////////////////////////////////
  'error-untranslated-key': {
    '__desc__': 'This error happens when we are trying to translate a specific key and the locale version is mission',
    'en_US': 'The translation for {key} does not exist yet :( Please hop on github and offer up a translation!',
    'de_DE': 'Die Übersetzung für {key} existiert noch nicht :( Falls du eine hast, bitte teil sie mit auf Github mit!',
    'zh_CN': '还没翻译 {key} :( 请在gitHub上贡献你的翻译!',
    'fr_FR': 'La traduction pour {key} n\'existe pas encore :( Venez sur Github pour en offrir une !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'error-untranslated': {
    '__desc__': 'The general error when we encounter a dialog that is not translated',
    'en_US': 'This dialog or text is not yet translated in your locale :( Hop on github to aid in translation!',
    'de_DE': 'Dieser Dialog oder Text ist noch nicht in deine Sprache übersetzt. :( Schau auf Github vorbei um bei der Übersetzung zu helfen!',
    'zh_CN': '这段对话还没有被翻译成你的语言 :( 欢迎在gitHub上贡献你的翻译!',
    'fr_FR': 'Ce message n\'a pas encore été traduit dans votre langue :( Venez sur Github aider à la traduction !'
  }
};

