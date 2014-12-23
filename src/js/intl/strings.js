exports.strings = {
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-finished': {
    '__desc__': 'One of the lines in the next level dialog',
    'ja': '最後のレベルをクリアしました！すごい！！',
    'en_US': 'Wow! You finished the last level, great!',
    'de_DE': 'Wow! Du hast den letzten Level gelöst, super!',
    'zh_CN': '我的个天！你完成了最后一关，碉堡了！',
    'zh_TW': '我的天啊！您解開了最後一關，太強了！',
    'es_AR': '¡Ea! Terminaste el último nivel, ¡genial!',
    'pt_BR': 'Uia! Você terminou o último nível, massa!',
    'fr_FR': 'Félicitations, vous avez réussi le dernier niveau !',
    'ru': 'Вау! Вы прошли последний уровень, отлично!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-next': {
    '__desc__': 'One of the lines in the next level dialog',
    'en_US': 'Would you like to move on to *"{nextLevel}"*, the next level?',
    'de_DE': 'Möchtest du mit *"{nextLevel}"* weitermachen, dem nächsten Level?',
    'ja': '次の章 *"{nextLevel}"* へ進みますか？',
    'zh_CN': '要不前进到下一关 *“{nextLevel}”*？',
    'zh_TW': '下一關是*「{nextLevel}」*，您要繼續闖關嗎？',
    'es_AR': '¿Querés seguir con *"{nextLevel}"*, el próximo nivel?',
    'pt_BR': 'Você gostaria de ir para o próximo nível: *"{nextLevel}"*?',
    'fr_FR': 'Voulez-vous passer à *"{nextLevel}"*, le prochain niveau ?',
    'ru': 'Хотите перейти на следующий уровень: *"{nextLevel}"*?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-win': {
    '__desc__': 'One of the lines in the next level dialog',
    'en_US': 'Awesome! You matched or exceeded our solution.',
    'pt_BR': 'Maravilha! Você fez uma solução tão boa quanto ou melhor que a nossa.',
    'de_DE': 'Wahnsinn! Du warst so gut wie unsere Lösung, oder sogar besser.',
    'ja': '素晴らしい！このレベルをクリアしましたね。',
    'zh_CN': '牛鼻啊！你达到或者完爆了我们的答案。',
    'zh_TW': '太強了，您的答案符合我們的預期甚至更好！',
    'es_AR': '¡Fabuloso! Igualaste o superaste nuestra solución.',
    'fr_FR': 'Fabuleux ! Votre solution a égalé ou surpassé notre solution.',
    'ru': 'Отлично! Ваше решение соответсвует или превосходит наше.'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-lose': {
    '__desc__': 'When the user entered more commands than our best, encourage them to do better',
    'en_US': 'See if you can whittle it down to {best} :D',
    'de_DE': 'Schau mal ob du es in {best} Schritten hinbekommst :D',
    'ja': '模範解答の回数={best}回でクリアする方法も考えてみましょう :D',
    'zh_CN': '试试看你能否在 {best} 之内搞定 :D',
    'zh_TW': '試試看您是否能在 {best} 步内搞定 :D',
    'es_AR': 'Fijate si podés bajarlo a usar sólo {best} comandos :D',
    'pt_BR': 'Veja se consegue reduzir para somente {best} :D',
    'fr_FR': 'Voyons si vous pouvez descendre à {best} :D',
    'ru': 'Попробуйте, может вы сможете уложиться в {best} : D'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-prune-tree': {
    '__desc__': 'warning when pruning tree',
    'en_US': 'Warning! Mercurial does aggressive garbage collection and thus needs to prune your tree',
    'zh_CN': '注意！ Mercurial 会进行主动垃圾回收，会导致需要将你的树縮小。',
    'zh_TW': '注意！ Mercurial 會積極地做垃圾收集，而且會因此把你的 tree 給縮小。',
    'es_AR': '¡Cuidado! Mercurial hace garbage collection agresivamente y necesita eliminar tu árbol',
    'pt_BR': 'Cuidado! O Mercurial faz coleção de lixo agressiva e precisa prunar sua árvore',
    'fr_FR': 'Attention, Mercurial supprime de façon agressive et nécessite un prune du repository',
    'de_DE': 'Achtung! Mercurial macht aggressive Garbage Collection und muss daher deinen Baum reduzieren',
    'ru': 'Внимание! Mercurial использует агрессивный сборщик мусора и обрезает ваше дерево'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-a-option': {
    '__desc__': 'warning for when using -A option',
    'en_US': 'The -A option is not needed for this app, just commit away!',
    'zh_TW': '對於這個 app 來說，-A 選項並不是必須的，只需要 commit 就好！',
    'zh_CN': '对本 app 而言，-A 选项并非必须项，直接 commit 就好！',
    'es_AR': 'La opción -A no es necesaria para esta aplicación, simplemente hacé commit',
    'pt_BR': 'A opção -A não é necessária para este aplicativo, simplesmente faça commit',
    'de_DE': 'Die Option -A wird in dieser Anwendung nicht benötigt, committe einfach!',
    'fr_FR': 'L\'option -A n\'est pas nécessaire pour cette application, simplemer commiter',
    'ru': 'Опция -A не требуется для этого приложения, просто сделайте коммит.'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-error-no-status': {
    '__desc__': 'One of the errors for hg',
    'en_US': 'There is no status command for this app, since there is no staging of files. Try hg summary instead',
    'zh_CN': '本 App 没有 status 命令哦，因为根本没有 stage 缓存文件。可以用hg summary代替哦',
    'es_AR': 'No hay un comando status para esta aplicación, dado que no hay archivos que indexar. Probá hg summary, en cambio',
    'pt_BR': 'Não existe um comando status para este aplicativo, já que não há staging de arquivos. Tente hg summary',
    'fr_FR': 'Il n\'y a pas de commande status pour cette application, car il n\'y a pas de fichier stagé. Essayé hg summary à la place.',
    'de_DE': 'Es gibt keinen Befehl status in dieser Anwendung, da es kein Staging von Dateien gibt. Probier stattdessen hg summary',
    'ru': 'Команда status не поддерживается в этом приложении, так как здесь нет файлов. Попробуйте выполнить hg summary'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-error-need-option': {
    '__desc__': 'One of the errors for hg',
    'en_US': 'I need the option {option} for that command!',
    'zh_CN': '我需要该命令使用 {option} 选项呢。',
    'es_AR': '¡Necesito la opción {opcion} para ese comando!',
    'pt_BR': 'Eu preciso da opção {option} para esse comando!',
    'fr_FR': 'J\'ai besoin de l\'option {option} pour cette commande',
    'de_DE': 'Ich benötige die Option {option} für diesen Befehl!',
    'ru': 'Для этой команды требуется опция {option}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hg-error-log-no-follow': {
    '__desc__': 'hg log without -f (--follow)',
    'en_US': 'hg log without -f is currently not supported, use -f',
    'zh_CN': '暂不支持没有-f 选项的 hg log 命令，请补充 -f 选项吧',
    'es_AR': 'hg log sin el parámetro -f no está soportado, usá -f',
    'pt_BR': 'hg log sem -f atualmente não é suportado, use -f',
    'fr_FR': 'hg log sans -f n\'est pas supporté',
    'de_DE': 'hg log ohne -f wird aktuell nicht unterstützt, benutze bitte -f',
    'ru': 'hg log без опции -f в настоящий момент не поддерживается, используйте -f'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-detached': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'Detached head!',
    'de_DE': 'Detached head!',
    'zh_CN': '脑袋搬家（Detached head）了！',
    'zh_TW': '分離 Head！',
    'es_AR': '¡Detached HEAD!',
    'pt_BR': 'Detached HEAD!',
    'fr_FR': 'head détaché !',
    'ru': 'Отделенный HEAD'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-onbranch': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'On branch {branch}',
    'de_DE': 'Auf Branch {branch}',
    'zh_CN': '切换到分支 {branch}',
    'zh_TW': '切換到 branch {branch}',
    'es_AR': 'En la rama {branch}',
    'pt_BR': 'No ramo {branch}',
    'fr_FR': 'Sur la branche {branch}',
    'ru': 'В ветке {branch}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-readytocommit': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'Ready to commit! (as always in this demo)',
    'de_DE': 'Fertig zum committen! (Wie immer in dieser Demo)',
    'zh_CN': '可以提交啦！（这演示里一直可以提交）',
    'zh_TW': '準備 commit！（在這個 demo 裡面可以一直 commit）',
    'es_AR': '¡Listo para commitear! (como siempre en esta demo ;-) )',
    'pt_BR': 'Pronto para commitar! (como sempre neste demo ;-) )',
    'fr_FR': 'Prêt à commit ! (comme toujours dans cette démo)',
    'ru': 'Готово к коммиту! (как и всегда в этом демо)'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-dummy-msg': {
    '__desc__': 'The dummy commit message for all commits. Feel free to put in a ' +
      'shoutout to your school / city / whatever!',
    'en_US': 'Quick commit. Go Bears!',
    'de_DE': 'Schneller Commit. Eff-Zeh!',
    'zh_CN': '快速提交。上啊月熊！',
    'zh_TW': '快速 commit。上啊熊！',
    'es_AR': 'Otro commit más, y van...',
    'pt_BR': 'Commitando.. Vai Timão!',
    'fr_FR': 'Commit rapide. NoMaN Sux!',
    'ru': 'Быстрый коммит. А надо!'
  },
  'git-error-origin-fetch-uptodate': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Already up to date!',
    'de_DE': 'Bereits aktuell!',
    'fr_FR': 'Déjà à jour',
    'es_AR': 'Estás en la versión más reciente',
    'pt_BR': 'Já estamos na versão mais recente!',
    'zh_TW': '已經是最新的了',
    'zh_CN': '已经是最新的了',
    'ru': 'Уже обновлено!'
  },
  'git-error-origin-fetch-no-ff': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Your origin branch is out of sync with the remote branch and fetch cannot be performed',
    'zh_CN': '你的 origin 分支已经失去了与 remote 远端分支的同步，所以无法执行 fetch 命令',
    'de_DE': 'Dein origin Branch ist nicht auf dem Stand des Remote Branch und fetch kann nicht ausgeführt werden',
    'es_AR': 'Tu rama origin está desincronizada con la rama remota, por lo que no se puede hacer el fetch',
    'pt_BR': 'O fetch não pode ser realizado pois o ramo de origem está fora de sincronia com o ramo remoto',
    'fr_FR': 'Votre branche origin n\'est plus synchronisée avec la branche distante et fetch ne peut pas être appliqué. Essayez avec l\'option --force',
    'ru': 'Ваша origin ветка не синхронизирована с удаленной веткой, невозможно выполнить fetch'
  },
  'git-error-origin-push-no-ff': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The remote repository has diverged from your local repository, so uploading your changes is not a simple fast forward (and thus your push was rejected). Please pull down the new changes in the remote repository, incorporate them into this branch, and try again. You can do so with git pull or git pull --rebase',
    'zh_CN': '远端仓库与你的本地仓库产生了分歧，故此上传操作无法通过简单地快进实现（因此你的 push 被拒绝了）。请 pull 下来远端里最新的更改，与本地合并之后再试一次。你可以通过 git pull 或 git pull --rebase 实现。',
    'de_DE': 'Das entfernte Repository weicht von deinem lokalen Repository ab, daher können deine Änderungen nicht mit einem einfachen fast forward hochgeladen werden (und daher ist dein push abgelehnt worden). Bitte pull erst die neuen Änderungen in das lokale Repository, integriere sie in den Branch und versuch es nochmal. Das kannst du mit git pull oder git pull --rebase machen',
    'es_AR': 'El repositorio remoto divergió de tu repositorio local, por lo que subir tus cambios no es un simple fast forward (y por eso se rechazó tu push). Por favor, hacé pull de los nuevos cambios en el repositorio remoto, incorporalos a esta rama y probá de nuevo. Podés hacerlo con git pull o git pull --rebase',
    'pt_BR': 'O repositório remoto divergiu do repositório local, então enviar suas mudanças não é um simples fast forward (e por isso seu push foi rejeitado). Por favor, faça pull das novas mudanças do repositório remoto, incorpore-os a este ramo, e tente novamente. Você pode fazê-lo com git pull ou git pull --rebase',
    'fr_FR': 'Le dépôt distant a divergé de votre référentiel local, donc l\'envoi de vos modifications n\'est pas en simple avance rapide (et donc votre envoi a été rejeté). Veuillez récupérer les nouveaux changements depuis le dépôt distant, les intégrer dans cette branche, et essayez à nouveau. Vous pouvez le faire avec git pull ou git pull --rebase',
    'ru:': 'Удаленный репозиторий разошелся с вашим локальным репозиторием, поэтому выгрузка ваших изменений не может быть в режиме fast forward (и следовательно ваш push будет отклонён). Пожалуйста, удалите изменения в удаленном репозитории которые, объедините их в эту ветку и попробуйте еще раз. Вы можете сделать это с помощью git pull или git pull --rebase'
  },
  'git-error-remote-branch': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'You cannot execute that command on a remote branch',
    'zh_CN': '你不能在远端分支上执行这个命令呀。',
    'de_DE': 'Du kannst diesen Befehl nicht auf einem Remote Branch ausführen',
    'es_AR': 'No podés ejecutar ese comando en una rama remota',
    'pt_BR': 'Você não pode executar esse comando em um ramo remoto',
    'fr_FR': 'Vous ne pouvez exécuter cette commande sur une branche distante',
    'ru': 'Вы не можете выполнить эту команду на удаленной ветке'
  },
  'git-error-origin-required': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'An origin is required for that command',
    'zh_CN': '该命令需要一个 origin',
    'de_DE': 'Für diesen Befehl wird origin benötigt',
    'es_AR': 'Necesitás un origen para ese comando',
    'pt_BR': 'É necessário informar uma origem para esse comando',
    'fr_FR': 'Une origine est requise pour cette commande',
    'ru': 'Origin требуется для этой команды'
  },
  'git-error-origin-exists': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'An origin already exists! You cannot make a new one',
    'zh_CN': 'origin 远端已存在。你不能重复创建',
    'de_DE': 'origin existiert bereits! Du kannst es nicht nochmal anlegen',
    'es_AR': '¡Ya existe el origen! No podés crear uno nuevo',
    'pt_BR': 'A origem já existe! Você não pode criar uma nova',
    'fr_FR': 'Une origine existe déjà ! Vous ne pouvez pas en créer une nouvelle',
    'ru': 'Origin уже существует! Невозможно создать еще один'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-branch': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'You can\'t delete the master branch, the branch you are on, or things that ' +
      'aren\'t branches',
    'de_DE': 'Du kannst nicht den Branch master, den Branch auf dem du gerade arbeitest oder Refs, die keine Branches sind, löschen',
    'zh_CN': '你不能删除主分支（master），或者你当前所在的分支，或者其他连分支也不是的东西。',
    'zh_TW': '你不能刪除 master branch，或者你當前所在的 branch，或者其它連 branch 都不是的東西。',
    'es_AR': 'No podés borrar la rama master, la rama en la que estás, o cosas que no son ramas',
    'pt_BR': 'Você não pode apagar o ramo master, nem o ramo em que você está, nem coisas que não sejam ramos',
    'fr_FR': 'Vous ne pouvez supprimer la branche master, la branche sur laquelle vous êtes, ou ce qui n\'est pas une branche',
    'ru' : 'Невозможно удалить ветку master, ветку на которой вы сейчас и то что не является веткой'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-merge-msg': {
    '__desc__': 'The commit message for a merge commit',
    'en_US': 'Merge {target} into {current}',
    'de_DE': 'Mergen von {target} in {current}',
    'zh_CN': '合并 {target} 到 {current}',
    'zh_TW': '將 {target} 併入 {current}',
    'es_AR': 'Mergear {target} a {current}',
    'pt_BR': 'Merge de {target} em {current}',
    'fr_FR': 'Merge de {target} dans {current}',
    'ru': 'Слияние {target} в {current}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-rebase-none': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'No commits to rebase! Everything is a merge commit or changes already applied',
    'de_DE': 'Keine Commits für Rebase gefunden! Alle Commits sind Merge Commits oder beinhalten nur schon vorhandene Änderungen',
    'zh_CN': '没有需要 rebase 的提交！都是个合并提交，或者已经 rebase 过了。',
    'zh_TW': '沒有需要 rebase 的 commit！每個都是一個 merge commit 或者修改已經被寫入了',
    'es_AR': '¡No hay commits para rebasear! Son todos commits de merge o cambios ya aplicados',
    'pt_BR': 'Não há commits para o rebase! São todos commits de merge ou mudanças já aplicadas',
    'fr_FR': 'Aucune commit à rebaser ! Tout est soit un commit de merge, soit des modifications déjà appliquées',
    'ru': 'Нет коммитов для rebase! Все в коммите слияния или изменения уже применены'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-nothing': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Nothing to do...',
    'de_DE': 'Nichts zu tun ...',
    'zh_CN': '啥鸟事也木有发生...',
    'zh_TW': '沒什麼事情要做...',
    'es_AR': 'Nada para hacer...',
    'pt_BR': 'Nada a ser feito...',
    'fr_FR': 'Rien à effectuer…',
    'ru': 'Нечего выполнять...'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-fastforward': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Fast forwarding...',
    'de_DE': 'Fast forward...',
    'zh_CN': '快速前进...',
    'zh_TW': '快速前進...',
    'es_AR': 'Fast forwardeando...',
    'pt_BR': 'Fast forward...',
    'fr_FR': 'En avance rapide…'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-uptodate': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Branch already up-to-date',
    'de_DE': 'Branch ist bereits aktuell',
    'zh_CN': '分支已经是最新啦',
    'zh_TW': 'branch 已經是最新啦',
    'es_AR': 'Rama actualmente actualizada',
    'pt_BR': 'Ramo já atualizado',
    'fr_FR': 'Branche déjà à jour',
    'ru': 'Ветка уже обновлена'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-exist': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The ref {ref} does not exist or is unknown',
    'de_DE': 'Die Ref {ref} existiert nicht oder ist unbekannt',
    'zh_CN': '索引 {ref} 不存在，或者找不到。',
    'zh_TW': '索引 {ref} 不存在，或者找不到。',
    'es_AR': 'La referencia {ref} no existe o es desconocida',
    'pt_BR': 'A referência {ref} não existe ou é desconhecida',
    'fr_FR': 'La référence {ref} n\'existe pas ou est inconnue',
    'ru': 'Ссылка {ref} не существует или неизвестна'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-relative-ref': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Commit {commit} doesnot have a {match}',
    'de_DE': 'Commit {commit} hat kein {match}',
    'zh_CN': '{commit} 号提交并没有 {match}',
    'zh_TW': 'commit {commit} 並沒有 {match}',
    'es_AR': 'El commit {commit} no tiene un {match}',
    'pt_BR': 'O commit {commit} não tem um {match}',
    'fr_FR': 'Le commit {commit} n\'a pas de correspondance {match}',
    'ru': 'Коммит {commit} не содержит {match}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-detached': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'Warning!! Detached HEAD state',
    'de_DE': 'Achtung! Detached HEAD Zustand',
    'zh_CN': '警告！现在是脑袋搬家（Detached HEAD）状态',
    'zh_TW': '注意喔！現在的狀態是分離 Head',
    'es_AR': '¡Cuidado! Modo de detached HEAD',
    'pt_BR': 'Cuidado! Modo Detached HEAD',
    'fr_FR': 'Attention ! HEAD est détaché'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-add': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'No need to add files in this demo',
    'de_DE': 'In dieser Demo müssen keine Dateien hinzugefügt werden',
    'zh_CN': '此演示中不需要添加文件',
    'zh_TW': '此 demo 中不需要再加入檔案',
    'es_AR': 'No es necesario hacer add a los archivos en esta demo',
    'pt_BR': 'Não é necessário adicionar arquivos neste demo',
    'fr_FR': 'Aucun besoin d\'ajouter des fichiers dans cette démo'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-options': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Those options you specified are incompatible or incorrect',
    'de_DE': 'Die angegebenen Optionen sind inkompatibel oder falsch',
    'zh_CN': '你所指定的参数不兼容或者不准确',
    'zh_TW': '您指定了不相容或錯誤的選項',
    'es_AR': 'Las opciones que especificaste son incompatibles o incorrectas',
    'pt_BR': 'As opções que você especificou são incompatíveis ou incorretas',
    'fr_FR': 'Les options que vous avez spécifiées sont incompatibles ou incorrectes'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-already-exists': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The commit {commit} already exists in your changes set, aborting!',
    'de_DE': 'Der Commit {commit} existiert bereit, Abbruch!',
    'zh_CN': '{commit} 号提交已经存在于你的改动集里，正在中止！',
    'zh_TW': 'commit {commit} 已經在你的修改的集合裡，正在停止！',
    'es_AR': 'El commit {commit} ya existe en tus cambios, ¡abortando!',
    'pt_BR': 'O commit {commit} já existe nas suas mudanças, abortando!',
    'fr_FR': 'Le commit {commit} existe déjà dans votre ensemble de modifications, opération avortée !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-reset-detached': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Can\'t reset in detached head! Use checkout if you want to move',
    'de_DE': 'Kann im Detached Head Zustand kein reset ausführen! Bitte checkout zum Bewegen benutzen',
    'zh_CN': '不能在分离的 HEAD 里重置！用 checkout 吧',
    'zh_TW': '不能在分離 HEAD 的狀態中重來！用 checkout 來移動吧',
    'es_AR': 'No podés hacer reset en el modo detached. Usá checkout si querés moverte',
    'pt_BR': 'Não se pode fazer reset no modo detached. Use checkout se quiser se mover',
    'fr_FR': 'On ne peut pas effectuer un reset quand head est détaché. Utilisez checkout pour déplacer'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-hard': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'The default behavior is a --hard reset, feel free to omit that option!',
    'de_DE': 'Das Standardverhalten in dieser Demo ist --hard, du kannst die Option auch weglassen!',
    'zh_CN': '默认的行为是 --hard 硬重置，尽管省略掉那个选项吧！',
    'zh_TW': '預設的行為是 --hard reset，儘量省略掉那個選項吧！',
    'es_AR': 'El comportamiento default es un --hard reset, sentite libre de omitir esa opción!',
    'pt_BR': 'O comportamento padrão é um reset --hard, fique livre para omitir essa opção!',
    'fr_FR': 'Le comportement par défaut est un --hard reset, soyez libre d\'omettre cette option !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-staging': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'There is no concept of adding / staging files, so that option or ' +
      'command is invalid!',
    'de_DE': 'In dieser Demo gibt es kein Hinzufügen / Vormerken von Dateien, dieser Befehl ist daher ungültig!',
    'zh_CN': '没有添加、缓存文件的必要，所以改选项或者命令是不合法的。',
    'zh_TW': '沒有加入、或者暫存 (staging) 文件的必要，所以改選項或者命令是不合法的。',
    'es_AR': 'No existe el concepto de agregar/indexar cambios, así que esa opción o comando es inválido',
    'pt_BR': 'Não existe o conceito de adicionar/indexar mudanças, de forma que essa opção ou comando é inválida',
    'fr_FR': 'Il n\'y a pas le concept d\'ajouter / mettre en staging, donc cette option ou commande est invalide'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-revert-msg': {
    '__desc__': 'Message for reverting git command',
    'en_US': 'Reverting {oldCommit}: {oldMsg}',
    'de_DE': 'Reverte {oldCommit}: {oldMsg}',
    'zh_CN': '撤销 {oldCommit}：{oldMsg}',
    'zh_TW': '還原 {oldCommit}：{oldMsg}',
    'es_AR': 'Revirtiendo {oldCommit}: {oldMsg}',
    'pt_BR': 'Revertendo {oldCommit}: {oldMsg}',
    'fr_FR': 'Revert {oldCommit}: {oldMsg}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-args-many': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'I expect at most {upper} argument(s) for {what}',
    'de_DE': 'Ich benötige maximal {upper} Argument(e) für {what}',
    'zh_CN': '{what} 期望最多 {upper} 个参数',
    'zh_TW': '{what} 期望最多 {upper} 個參數',
    'es_AR': 'Espero como máximo {upper} parámetros para {what}',
    'pt_BR': 'Espero no máximo {upper} parâmetros para {what}',
    'fr_FR': 'J\'attends au plus {upper} argument(s) pour {what}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-args-few': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'I expect at least {lower} argument(s) for {what}',
    'de_DE': 'Ich benötige mindestens {lower} Argument(e) für {what}',
    'zh_CN': '{what} 期望最少 {lower} 个参数',
    'zh_TW': '{what} 期望最少 {lower} 個參數',
    'es_AR': 'Espero al menos {lower} parámetros para {what}',
    'pt_BR': 'Espero pelo menos {lower} parâmetros para {what}',
    'fr_FR': 'J\'attends au moins {upper} argument(s) pour {what}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-no-general-args': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'That command accepts no general arguments',
    'de_DE': 'Dieser Befehl akzeptiert keine allgemeinen Argumente',
    'zh_CN': '该命令不接收参数',
    'zh_TW': '該指令不接受一般參數',
    'es_AR': 'Ese comando no acepta parámetros comunes',
    'pt_BR': 'Este comando não aceita parâmetros gerais',
    'fr_FR': 'Cette commande n\'accepte aucun argument général'
  },
  ///////////////////////////////////////////////////////////////////////////
  'copy-tree-string': {
    '__desc__': 'The prompt to copy the tree when sharing',
    'en_US': 'Copy the tree string below',
    'de_DE': 'Kopiere die folgende Baum-Zeichenkette',
    'zh_CN': '拷贝下面的树字符串',
    'zh_TW': '複製下方的樹狀字串',
    'es_AR': 'Copiá el código de acá abajo',
    'pt_BR': 'Copie o código abaixo',
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
    'zh_TW': '學習 git 分支',
    'es_AR': 'Aprendé a Branchear en Git',
    'pt_BR': 'Learn Git Branching',
    'fr_FR': 'Apprenez Git Branching'
  },
  ///////////////////////////////////////////////////////////////////////////
  'select-a-level': {
    '__desc__': 'The prompt to select a level on the drop down view',
    'en_US': 'Select a level',
    'de_DE': 'Level auswählen',
    'zh_CN': '选择一关',
    'zh_TW': '選擇其中一關',
    'es_AR': 'Seleccioná un nivel',
    'pt_BR': 'Selecione um nível',
    'fr_FR': 'Choisissez un niveau'
  },
  ///////////////////////////////////////////////////////////////////////////
  'branch-name-short': {
    '__desc__': 'When branch names get too long, we need to truncate them. This is the warning for that',
    'en_US': 'Sorry, we need to keep branch names short for the visuals. Your branch name was truncated to 9 characters, resulting in "{branch}"',
    'de_DE': 'Tut mir leid, aber aus Gründen der Darstellung müssen wir die Branch-Namen kurz halten. Dein Branch-Name wurde auf 9 Zeichen gekürzt und heißt daher jetzt "{branch}"',
    'zh_CN': '抱歉，为了显示的需要，我们需要一个短些的分支名称。您使用的将被截断到9个字符，即"{branch}"',
    'zh_TW': '抱歉，為了顯示的需要，我們需要一個短一點的 branch 名稱。您使用的將會被截斷到剩下9個字元，即"{branch}"',
    'es_AR': 'Perdón, necesitamos mantener los nombres de los branches cortos para visualizarlos. El nombre de tu rama se truncó a 9 caracteres, resultando en "{branch}"',
    'pt_BR': 'Desculpe, precisamos manter os nomes dos ramos curtos para visualizá-los. O nome do seu ramo foi truncado para 9 caracteres, resultando em "{branch}"',
    'fr_FR': 'Désolé, nous devons garder les noms de branches courts pour la visualisation. Votre nom de branche a été tronqué à 9 caractères, devenant "{branch}"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'bad-branch-name': {
    '__desc__': 'When the user enters a branch name thats not ok',
    'en_US': 'That branch name "{branch}" is not allowed!',
    'de_DE': 'Der Branch-Name "{branch}" ist nicht erlaubt!',
    'zh_CN': '不能给分支起这个名字 "{branch}"',
    'zh_TW': '不能给 branch 起這個名字 "{branch}"',
    'es_AR': 'El nombre "{branch}" no está permitido para los branches',
    'pt_BR': 'Um ramo não pode ser chamado de "{branch}"!',
    'fr_FR': 'Ce nom de branche "{branch}" n\'est pas autorisé'
  },
  ///////////////////////////////////////////////////////////////////////////
  'bad-tag-name': {
    '__desc__': 'When the user enters a tag name thats not ok',
    'en_US': 'That tag name "{tag}" is not allowed!',
    'zh_CN': '该标签名 “{tag}” 不被接受。233',
    'es_AR': 'El nombre "{tag}" no está permitido para los tags',
    'pt_BR': 'Uma tag não pode ser chamada de "{tag}"!',
    'de_DE': 'Der Tag-Name "{tag}" ist nicht erlaubt!',
    'fr_FR': 'Le nom de tag "{tag}" n\'est pas autorisé!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'option-not-supported': {
    '__desc__': 'When the user specifies an option that is not supported by our demo',
    'en_US': 'The option "{option}" is not supported!',
    'de_DE': 'Die  Option "{option}" wird nicht unterstützt!',
    'zh_CN': '不支持选项 "{option}"',
    'zh_TW': '不支援的選項 "{option}"',
    'es_AR': 'La opción {option} no está soportada',
    'pt_BR': 'A opção {option} não é suportada',
    'fr_FR': 'L\'option "{option}" n\'est pas supportée'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-usage-command': {
    '__desc__': 'The line that shows how to format a git command',
    'en_US': 'git <command> [<args>]',
    'de_DE': 'git <Befehl> [<Argumente>]',
    'zh_CN': 'git <命令> [<参数>]',
    'zh_TW': 'git <指令> [<參數>]',
    'es_AR': 'git <comando> [<parametros>]',
    'pt_BR': 'git <comando} [<parâmetros>]',
    'fr_FR': 'git <commande> [<arguments>]'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-supported-commands': {
    '__desc__': 'In the git help command, the header above the supported commands',
    'en_US': 'Supported commands:',
    'de_DE': 'Unterstützte Befehle:',
    'zh_CN': '支持的命令有:',
    'zh_TW': '支援的指令有：',
    'es_AR': 'Comandos soportados:',
    'pt_BR': 'Comandos suportados:',
    'fr_FR': 'Commandes supportées'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-usage': {
    '__desc__': 'In the dummy git output, the header before showing all the commands',
    'en_US': 'Usage:',
    'de_DE': 'Benutzung:',
    'zh_CN': '使用:',
    'zh_TW': '用法:',
    'es_AR': 'Uso:',
    'pt_BR': 'Uso:',
    'fr_FR': 'Utilisation :'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-version': {
    '__desc__': 'The git version dummy output, kind of silly. PCOTTLE is my unix name but feel free to put yours instead',
    'en_US': 'Git Version PCOTTLE.1.0',
    'de_DE': 'Git Version PCOTTLE.1.0.jbr',
    'zh_CN': 'Git 版本 PCOTTLE.1.0',
    'zh_TW': 'Git 版本 PCOTTLE.1.0',
    'es_AR': 'Git Versión PCOTTLE.1.0',
    'pt_BR': 'Git versão PCOTTLE.1.0',
    'fr_FR': 'Git version PCOTTLE.1.0'
  },
  ///////////////////////////////////////////////////////////////////////////
  'flip-tree-command': {
    '__desc__': 'when the tree is being flipped',
    'en_US': 'Flipping tree...',
    'zh_CN': '翻转树中...',
    'es_AR': 'Invirtiendo el árbol...',
    'pt_BR': 'Invertendo a árvore...',
    'fr_FR': 'Inversion de l\'arbre...'
  },
  ///////////////////////////////////////////////////////////////////////////
  'refresh-tree-command': {
    '__desc__': 'when the tree is visually refreshed',
    'en_US': 'Refreshing tree...',
    'de_DE': 'Aktualisiere Baum ...',
    'zh_CN': '正在刷新树结构...',
    'zh_TW': '正在更新樹狀結構...',
    'es_AR': 'Refrezcando el árbol...',
    'pt_BR': 'Atualizando a árvore...',
    'fr_FR': 'Actualisation de l\'arbre…'
  },
  ///////////////////////////////////////////////////////////////////////////
  'locale-command': {
    '__desc__': 'when the locale is set to something',
    'en_US': 'Locale set to {locale}',
    'de_DE': 'Locale auf {locale} gesetzt',
    'zh_CN': '语言更改为 {locale}',
    'zh_TW': '語系設為 {locale}',
    'es_AR': 'Localización actualizada a {locale}',
    'pt_BR': 'Língua trocada para {locale}',
    'fr_FR': 'Langue changée à {locale}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'locale-reset-command': {
    '__desc__': 'when the locale is reset',
    'en_US': 'Locale reset to default, which is {locale}',
    'de_DE': 'Locale auf Standard zurückgesetzt, also {locale}',
    'zh_CN': '语言重置为默认的 {locale}',
    'zh_TW': '還原為預設語系 {locale}',
    'es_AR': 'Localización vuelta al default, que es {locale}',
    'pt_BR': 'Língua retornada para a padrão, que é {locale}',
    'fr_FR': 'Langue remise par défaut, qui est {locale}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'show-command': {
    '__desc__': 'command output title from "show"',
    'en_US': 'Please use one of the following commands for more info:',
    'zh_TW': '請使用下列其中一個指令取得更多資訊：',
    'zh_CN': '请使用以下命令以了解更多',
    'de_DE': 'Bitte benutze einen der folgenden Befehle um mehr Informationen zu bekommen:',
    'es_AR': 'Usá alguno de estos comandos para tener más información:',
    'pt_BR': 'Use algum destes comandos para ter mais informações:',
    'fr_FR': 'Merci d\'utiliser une des commandes suivantes pour obtenir plus d\'info'
  },
  ///////////////////////////////////////////////////////////////////////////
  'show-all-commands': {
    '__desc__': 'command output title from "show commands"',
    'en_US': 'Here is a list of all the commmands available:',
    'zh_TW': '這份清單列出所有可用指令：',
    'zh_CN': '该列表列出了所有可用的指令：',
    'de_DE': 'Hier ist eine Liste aller verfügbarer Befehle:',
    'es_AR': 'Esta es una lista de los comandos disponibles:',
    'pt_BR': 'Esta é uma lista dos comandos disponíveis:',
    'fr_FR': 'Ci-dessous est la liste de toutes les commandes disponibles :'
  },
  ///////////////////////////////////////////////////////////////////////////
  'cd-command': {
    '__desc__': 'dummy command output for the command in the key',
    'en_US': 'Directory changed to "/directories/dont/matter/in/this/demo"',
    'de_DE': 'Verzeichnis gewechselt zu "/verzeichnisse/sind/in/dieser/demo/latte"',
    'zh_CN': '目录切换到 "/directories/dont/matter/in/this/demo"',
    'zh_TW': '目錄切換到 "/directories/dont/matter/in/this/demo"',
    'es_AR': 'Directorio cambiado a "/los/directorios/no/importan/en/esta/demo"',
    'pt_BR': 'Diretório mudado para "/diretorios/nao/importam/neste/demo"',
    'fr_FR': 'Répertoire changé à "/directories/dont/matter/in/this/demo" (les répertoires ne servent à rien dans cette démo)'
  },
  ///////////////////////////////////////////////////////////////////////////
  'ls-command': {
    '__desc__': 'Dummy command output for the command in the key',
    'en_US': 'DontWorryAboutFilesInThisDemo.txt',
    'de_DE': 'VergissDateienInDieserDemo.txt',
    'zh_CN': 'DontWorryAboutFilesInThisDemo.txt (译: 在试验里不用担心文件.txt)',
    'zh_TW': 'DontWorryAboutFilesInThisDemo.txt （譯註：在 demo 裡不用擔心檔案）',
    'es_AR': 'NoTePreocupesPorLosArchivosEnEstaDemo.txt',
    'pt_BR': 'NaoSePreocupeComNomesDeArquivoNesteDemo.txt',
    'fr_FR': 'DontWorryAboutFilesInThisDemo.txt (ne vous préoccupez pas des noms de fichier dans cette démo)'
  },
  'mobile-alert': {
    '__desc__': 'When someone comes to the site on a mobile device, they can not input commands so this is a nasty alert to tell them',
    'en_US': 'LGB can\'t receive input on mobile, visit on desktop! it\'s worth it :D',
    'de_DE': 'LGB ist nicht mit mobilen Endgeräten kompatibel, nutz es vom Desktop! Es lohnt sich :D',
    'zh_CN': '无法在移动设备/平板上调出键盘 :( 请试试桌面版 :D',
    'zh_TW': '無法在行動裝置上叫出鍵盤，請改用桌面版！',
    'es_AR': 'LGB no puede recibir comandos en dispositivos móviles. Visitanos desde una desktop, ¡lo vale! :D',
    'pt_BR': 'Provavelmente você não vai conseguir digitar comandos no celular, neste caso tente acessar de um computador',
    'fr_FR': 'Impossible de faire apparaître le clavier sur mobile / tablette :( Essayez de passer sur un ordinateur de bureau :D'
  },
  ///////////////////////////////////////////////////////////////////////////
  'share-tree': {
    '__desc__': 'When you export a tree, we want you to share the tree with friends',
    'en_US': 'Share this tree with friends! They can load it with "import tree"',
    'de_DE': 'Teile diesen git-Baum mit Freunden! Sie können ihn mit "import tree" laden',
    'zh_CN': '与你的好友分享提交树！他们可以用 "import tree" 加载它',
    'zh_TW': '與你的好友分享這棵樹！他們可以用 "import tree" 來載入它',
    'es_AR': '¡Compartí este árbol con amigos! Pueden cargarlo con "import tree"',
    'pt_BR': 'Compartilhe esta árvore com seus amigos! Eles podem carregá-la com "import tree"',
    'fr_FR': 'Partagez cet arbre avec vos amis ! Ils peuvent le charger avec "import tree"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'paste-json': {
    '__desc__': 'When you are importing a level or tree',
    'en_US': 'Paste a JSON blob below!',
    'de_DE': 'Füg einen JSON-Blob unten ein!',
    'zh_CN': '在下边粘贴一个JSON串',
    'zh_TW': '在下方貼上一串 JSON',
    'es_AR': '¡Pegá un blob JSON abajo!',
    'pt_BR': 'Cole o JSON abaixo!',
    'fr_FR': 'Collez un blob JSON ci-dessous !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'solved-map-reset': {
    '__desc__': 'When you reset the solved map to clear your solved history, in case someone else wants to use your browser',
    'en_US': 'Solved map was reset, you are starting from a clean slate!',
    'de_DE': 'Gelöste Karte wurde zurückgesetzt, du fängst mit einem leeren Blatt an!',
    'zh_CN': '解决列表已重置，您现在从零开始了',
    'zh_TW': '過關地圖已經重新設置，您現在從零開始了',
    'es_AR': 'El mapa resuelto fue eliminado, estás arrancando desde un estado limpio',
    'pt_BR': 'Mapa de resolvidos descartado, você está começando com ficha limpa!',
    'fr_FR': 'La carte des niveaux résolus a été effacée, vous repartez de zéro !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-cant-exit': {
    '__desc__': 'When the user tries to exit a level when they are not in one',
    'en_US': 'You are not in a level! You are in a sandbox, start a level with "levels"',
    'de_DE': 'Du bist nicht in einem Level! Du bist im Sandkasten-Modus, starte einen Level mit "levels"',
    'zh_CN': '您没在关卡中！您在沙盒中，要开始关卡请输入 "levels"',
    'zh_TW': '您沒在關卡中！您在沙盒中，要開始關卡請輸入 "levels"',
    'es_AR': '¡No estás en un nivel! Estás en el sandbox, comenzá un nivel usando "levels"',
    'pt_BR': 'Você não está em um nível! Você está no sandbox, comece um nível com "levels"',
    'fr_FR': 'Vous n\'êtes pas dans un niveau ! Vous êtes dans le mode bac à sable, commencez un niveau avec "levels"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-no-id': {
    '__desc__': 'When you say an id but that level doesnt exist',
    'en_US': 'A level for that id "{id}" was not found! Opening up a level selection view',
    'de_DE': 'Konnte keinen Level mit der ID "{id}" finden! Öffne einen Level-Auswahldialog',
    'zh_CN': '没找到id为 "{id}" 的关卡！打开关卡选择框',
    'zh_TW': '找不到 id 為 "{id}" 的關卡！開啟關卡選擇視窗',
    'es_AR': 'No se encontró ningún nivel {id}. Abriendo la vista de selección de niveles...',
    'pt_BR': 'O nível "{id}" não existe! Abrindo uma caixa de seleção de nível',
    'fr_FR': 'Le niveau dont l\'identifiant est {id} n\'a pas été trouvé ! Ouverture de la vue de sélection des niveaux'
  },
  ///////////////////////////////////////////////////////////////////////////
  'undo-stack-empty': {
    '__desc__': 'The undo command can only undo back until the last time the level was reset or the beginning of the level',
    'en_US': 'The undo stack is empty!',
    'de_DE': 'Die Undo-Liste ist leer!',
    'zh_CN': '还没有什么可以撤销',
    'zh_TW': '還沒有什麼可以取消',
    'es_AR': 'No hay comandos que deshacer',
    'pt_BR': 'Você já desfez tudo!',
    'fr_FR': 'La pile d\'annulation est vide !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'already-solved': {
    '__desc__': 'When you play in a level that is already solved',
    'en_US': 'You have already solved this level, try other levels with "levels" or go back to sandbox with "sandbox"',
    'de_DE': 'Du hast diesen Level bereits gelöst, probier einen anderen Level mit "levels" aus oder geh in den Sandkasten-Modus mit "sandbox"',
    'zh_CN': '你已经解决了本关，输入 "levels" 尝试其他关卡，或者输入 "sandbox" 回到沙盒中',
    'zh_TW': '你已經解决了本關，輸入 "levels" 嘗試其他關卡，或者輸入 "sandbox" 回到沙盒中',
    'es_AR': 'Ya resolviste este nivel, probá otros usando "levels" o volvé al sandbox usando "sandbox"',
    'pt_BR': 'Você já resolveu este nível, tente outros com "levels" ou volte ao sandbox com "sandbox"',
    'fr_FR': 'Vous avez déjà résolu ce niveau, essayez d\'autres niveaux avec "levels" ou revenez au bac à sable avec "sandbox"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'command-disabled': {
    '__desc__': 'When you try a command that is disabled',
    'en_US': 'That git command is disabled for this level!',
    'de_DE': 'Dieser git-Befehl ist für diesen Level deaktiviert!',
    'zh_CN': '该命令在本关不允许使用！',
    'zh_TW': '本關禁止使用該 git 指令！',
    'es_AR': '¡Ese comando de git está deshabilitado para este nivel!',
    'pt_BR': 'Achou que seria fácil assim? Desabilitamos esse comando durante este nível, só para dificultar ;-)',
    'fr_FR': 'Cette commande git est désactivée pour ce niveau !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'share-json': {
    '__desc__': 'when you have made the level, prompt to share this',
    'en_US': 'Here is the JSON for this level! Share it with somenoe or send it to me on Github',
    'de_DE': 'Hier ist das JSON für diesen Level! Teil es mit jemandem or schick es mir über Github',
    'zh_CN': '这是一个关卡定义JSON！您可以分享它或者发到我的GitHub上',
    'zh_TW': '這是本關的 JSON！您可以分享給別人，或是送到 Github 上給我',
    'es_AR': 'Este es el JSON de este nivel. Compartilo con quien quieras o mandámelo por Github',
    'pt_BR': 'Aqui está o JSON para este nível! Compartilhe com alguém ou me envie pelo Github',
    'fr_FR': 'Voici le JSON pour ce niveau ! Partagez-le avec quelqu\'un ou envoyez-le moi sur Github'
  },
  ///////////////////////////////////////////////////////////////////////////
  'want-start-dialog': {
    '__desc__': 'prompt to add a start dialog',
    'en_US': 'You have not specified a start dialog, would you like to add one?',
    'de_DE': 'Du hast noch keinen Einführungs-Dialog geschrieben, willst du einen hinzufügen?',
    'zh_CN': '您还没有定义一开始的介绍，是否添加一个？',
    'zh_TW': '尚未指定開始對話視窗，是否立即新增？',
    'es_AR': 'No especificaste un mensaje de inicio, ¿querés agregar uno?',
    'pt_BR': 'Você não especificou uma mensagem de início, quer colocar uma?',
    'fr_FR': 'Vous n\'avez pas spécifié de dialogue de départ, voulez-vous en ajouter un ?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'want-hint': {
    '__desc__': 'prompt to add a hint',
    'en_US': 'You have not specified a hint, would you like to add one?',
    'de_DE': 'Du hast noch keinen Hinweis geschrieben, magst du einen hinzufügen?',
    'zh_CN': '您还没有定义提示，是否添加一个？',
    'zh_TW': '尚未指定提示，是否立即新增？',
    'es_AR': 'No especificaste ninguna pista, ¿querés agregar alguna?',
    'pt_BR': 'Você não especificou uma dica, quer colocar uma?',
    'fr_FR': 'Vous n\'avez pas spécifié d\'indice, voulez-vous en ajouter un ?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'prompt-hint': {
    '__desc__': 'prompt for hint',
    'en_US': 'Enter the hint for this level, or leave this blank if you do not want to include one',
    'de_DE': 'Gib den Hinweis für diesen Level an, oder lass es leer wenn du keinen hinzufügen willst',
    'zh_CN': '请输入关卡提示，或者故意留空',
    'zh_TW': '請輸入關卡提示，或者故意留空',
    'es_AR': 'Ingresá una pista para este nivel, o dejalo en blanco si no querés incluir ninguna',
    'pt_BR': 'Colocque uma dica para este nível, ou deixe em branco se não quiser incluir',
    'fr_FR': 'Entrez l\'indice pour ce niveau, ou laissez-le vide pour ne pas l\'inclure'
  },
  ///////////////////////////////////////////////////////////////////////////
  'prompt-name': {
    '__desc__': 'prompt for level name',
    'en_US': 'Enter the name for the level',
    'de_DE': 'Gib den Namen für diesen Level an',
    'zh_CN': '输入关卡名',
    'zh_TW': '請輸入關卡名稱',
    'es_AR': 'Ingresá el nombre del nivel',
    'pt_BR': 'Coloque o nome do nível',
    'fr_FR': 'Entrez le nom pour ce niveau'
  },
  ///////////////////////////////////////////////////////////////////////////
  'solution-empty': {
    '__desc__': 'If you define a solution without any commands, aka a level that is solved without doing anything',
    'en_US': 'Your solution is empty!! Something is amiss',
    'de_DE': 'Deine Auflösung ist leer! Hier fehlt etwas',
    'zh_CN': '你的解法是空的!! 这应该是出错了',
    'zh_TW': '您的解法是空的！這一定是哪裡出錯了',
    'es_AR': '¡Tu solución está vacía! Algo hay que hacer',
    'pt_BR': 'Sua solução está vazia! O aprendiz deveria ter que fazer alguma coisa',
    'fr_FR': 'Votre solution est vide !! Quelque chose ne tourne pas rond'
  },
  ///////////////////////////////////////////////////////////////////////////
  'define-start-warning': {
    '__desc__': 'When you define the start point again, it overwrites the solution and goal so we add a warning',
    'en_US': 'Defining start point... solution and goal will be overwritten if they were defined earlier',
    'de_DE': 'Lege Start fest ... Auflösung und Ziel werden gelößcht, falls sie schon festgelegt worden waren',
    'zh_CN': '定义开始点... 解决方法和目标会被新的替代',
    'zh_TW': '正在定義起始點...先前定義的解法和目標會被覆蓋掉',
    'es_AR': 'Estableciendo el punto de inicio... La solución y el objetivo serán sobreescritos si ya habían sido definidos',
    'pt_BR': 'Esbelecendo o ponto de início... a solução e o objetivo serão sobrescritos caso já existirem',
    'fr_FR': 'Redéfinition du point de départ… la solution et la cible seront écrasés s\'ils ont déjà été définis'
  },
  ///////////////////////////////////////////////////////////////////////////
  'help-vague-level': {
    '__desc__': 'When you are in a level and you say help, its vague and you need to specify',
    'en_US': 'You are in a level, so multiple forms of help are available. Please select either "help level" to learn more about this lesson, "help general" for using Learn GitBranching, or "objective" to learn about how to solve the level.',
    'de_DE': 'Du befindest dich in einem Level, daher gibt es verschiedene Hilfen. Gib "help level" ein um mehr úber diesen Level zu erfahren, "help general" um zu sehen wie Learn Git Branching bedient wird, oder "objective" um das Ziel dieses Levels zu erfahren.',
    'zh_CN': '您正在关卡中，这里有多种形式的帮助，请选择 "help level" (关卡帮助)或 "help general" (一般帮助)',
    'zh_TW': '您正在進行關卡中，這裡有多種不同型式的幫助，請選擇 "help level" 來了解這個關卡，或者是選擇 "help general" 來學習如何使用 Learn GitBranching，或者是選擇 "objective" 來學習如何解決這個關卡',
    'es_AR': 'Estás en un nivel, por lo que hay varios tipos de ayuda. Por favor elegí entre "help level" para aprender algo más sobre esta lección, "help general" para ayuda sobre el uso de Learn GitBranching, o "objective" para aprender a resolver este nivel.',
    'pt_BR': 'Você está em um nível, então há vários tipos de ajuda. Selecione "help level" para aprender mais sobre esta lição, "help general" para aprender a usar o Learn GitBranching, ou "objective" ver como resolver o nível.',
    'fr_FR': 'Vous êtes dans un niveau, donc plusieurs formes d\'aide sont disponibles. Merci de sélectionner soit "help level" pour en apprendre plus sur cette leçon, "help general" pour l\'utilisation de Learn GitBranching, ou "objective" pour apprendre comment résoudre le niveau'
  },
  ///////////////////////////////////////////////////////////////////////////
  'help-vague-builder': {
    '__desc__': 'When you are in a level builder, the help command is vague so you need to specify what you mean',
    'en_US': 'You are in a level builder, so multiple forms of help are available. Please select either "help general" or "help builder"',
    'de_DE': 'Du befindest dich im Level-Editor, daher gibt es verschiedene Hilfen. Gib bitte "help general" oder "help builder" ein',
    'zh_CN': '您正在进行关卡构建中，这里有多种形式的帮助，请选择 "help general" (一般帮助)或 "help builder" (关卡构建帮助)',
    'zh_TW': '您正在進行關卡構建中，這裡有多種不同型式的幫助，請選擇 "help general" （一般幫助）或 "help builder" （製造關卡的幫助）',
    'es_AR': 'Estás en el constructor de niveles, por lo que hay varios tipos de ayuda. Elegí entre "help general" para ayuda sobre Learn GitBranching y "help builder" para ayuda sobre el constructor de niveles',
    'pt_BR': 'Você está no construtor de nívels, então há vários tipos de ajuda. Selecione "help general" ou "help builder"',
    'fr_FR': 'Vous êtes dans l\'éditeur de niveaux, donc plusieurs formes d\'aide sont disponibles. Merci de sélectionner soit "help general" soit "help builder"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'show-goal-button': {
    '__desc__': 'button label to show goal',
    'en_US': 'Show Goal',
    'zh_TW': '顯示目標',
    'zh_CN': '显示目标',
    'fr_FR': 'Afficher les cibles',
    'pt_BR': 'Mostrar objetivo',
    'es_AR': 'Mostrar objetivo'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-goal-button': {
    '__desc__': 'button label to hide goal',
    'en_US': 'Hide Goal',
    'fr_FR': 'Cacher les cibles',
    'zh_TW': '隱藏目標',
    'zh_CN': '隐藏目标',
    'pt_BR': 'Ocultar objetivo',
    'es_AR': 'Ocultar obetivo'
  },
  ///////////////////////////////////////////////////////////////////////////
  'goal-to-reach': {
    '__desc__': 'title of window that shoes the goal tree to reach',
    'en_US': 'Goal To Reach',
    'de_DE': 'Ziel',
    'zh_CN': '目标',
    'zh_TW': '目標',
    'es_AR': 'Objetivo a cumplir',
    'pt_BR': 'Objetivo a cumprir',
    'fr_FR': 'Cible à atteindre'
  },
  ///////////////////////////////////////////////////////////////////////////
  'goal-only-master': {
    '__desc__': 'the helper message for the window that shows the goal tree when the goal will only be compared using the master branch',
    'en_US': '<span class="fwber">Note:</span> Only the master branch will be checked in this level. The other branches are simply for reference (shown as dashed labels below). As always, you can hide this dialog with "hide goal"',
    'fr_FR': '<span class="fwber">Note:</span> Seulement la branche master peut être check id à ce niveau. Les autres branches sont simplement une référence (Montré avec un tiret). Comme toujours, vous pouvez cacher cette fenêtre avec "Cacher les objectifs"',
    'de_DE': '<span class="fwber">Hinweis:</span> In diesem Level wird nur der Branch master geprüft. Die anderen Branches dienen nur als Vergleichsbasis (als gestrichelte Bezeichner dargestellt). Wie immer kannst du diese Meldung mit "hide goal" ausblenden',
    'es_AR': '<span class="fwber">Nota:</span> Sólo la rama master va a ser chequeada en este nivel. Las otras ramas sólo son para referencia. Como siempre, podés ocultar este mensaje con "hide goal"',
    'pt_BR': '<span class="fwber">Nota:</span> Apenas o ramo master será verificado neste nível. Os outros ramos (dentro das caixas clareadas) são somente para referência. Como sempre, você pode ocultar esta janela com "hide goal"',
    'zh_CN': '<span class="fwber">注意:</span>本关卡中，只检查 master 分支，其他分支只是用作 reference 存在（以虚线标签表示）。照常，你可以用 “hide goal” 来隐藏此窗口。',
    'zh_TW': '在這個關卡中，只有 master branch 會被檢查，別的 branch 只是用來做為 reference （下面用虛線符號表示）。一如往常，你可以利用 "hide goal" 來隱藏這個對話視窗'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-goal': {
    '__desc__': 'the helper message for the window that shows the goal tree',
    'en_US': 'You can hide this window with "hide goal"',
    'de_DE': 'Du kannst diese Meldung mit "hide goal" ausblenden',
    'zh_CN': '你可以通过命令 "hide goal" 关闭这个窗口',
    'zh_TW': '你可以透過 "hide goal" 關閉這個視窗',
    'es_AR': 'Podés ocultar esta ventana con "hide goal"',
    'pt_BR': 'Você pode ocultar esta janela com "hide goal"',
    'fr_FR': 'Vous pouvez masquer cette fenêtre avec "hide goal"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-start': {
    '__desc__': 'The helper message for the window that shows the start tree for a level',
    'en_US': 'You can hide this window with "hide start"',
    'de_DE': 'Du kannst diese Meldung mit "hide start" ausblenden',
    'zh_CN': '你可以通过命令 "hide start" 关闭这个窗口',
    'zh_TW': '你可以透過 "hide start" 關閉這個視窗',
    'es_AR': 'Podés ocultar esta ventana con "hide start"',
    'pt_BR': 'Você pode ocultar esta janela com "hide start"',
    'fr_FR': 'Vous pouvez masquer cette fenêtre avec "hide start"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-builder': {
    '__desc__': 'The name for the environment where you build levels',
    'en_US': 'Level Builder',
    'de_DE': 'Level-Editor',
    'zh_CN': '关卡生成器',
    'zh_TW': '關卡產生器',
    'es_AR': 'Constructor de niveles',
    'pt_BR': 'Construtor de níveis',
    'fr_FR': 'Éditeur de niveaux'
  },
  ///////////////////////////////////////////////////////////////////////////
  'no-start-dialog': {
    '__desc__': 'when the user tries to open a start dialog for a level that does not have one',
    'en_US': 'There is no start dialog to show for this level!',
    'de_DE': 'Es gibt keinen Einführungs-Dialog für diesen Level!',
    'zh_CN': '介绍? 这关真没有!',
    'zh_TW': '這關沒有介紹!',
    'es_AR': '¡No hay mensaje de inicio para este nivel!',
    'pt_BR': 'Não há mensagem de início para este nível!',
    'fr_FR': 'Il n\'y a aucun dialogue de départ à afficher pour ce niveau !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'no-hint': {
    '__desc__': 'when no hint is available for a level',
    'en_US': "Hmm, there doesn't seem to be a hint for this level :-/",
    'de_DE': "Hm, es gibt anscheinend keinen Hinweis für diesen Level :-/",
    'zh_CN': "提示？嗯，这关真没有哎~ :-/",
    'zh_TW': "嗯‧‧‧這關沒有提示 :-/",
    'es_AR': 'Mmm... Pareciera no haber pistas para este nivel :-/',
    'pt_BR': 'Hmm, não existe nenhuma pista para este nível :-/',
    'fr_FR': 'Hum, il ne semble pas y avoir d\'indice pour ce niveau :-/'
  },
  ///////////////////////////////////////////////////////////////////////////
  'error-untranslated-key': {
    '__desc__': 'This error happens when we are trying to translate a specific key and the locale version is mission',
    'en_US': 'The translation for {key} does not exist yet :( Please hop on github and offer up a translation!',
    'de_DE': 'Die Übersetzung für {key} existiert noch nicht :( Falls du eine hast, bitte teil sie mit auf Github mit!',
    'zh_CN': '还没翻译 {key} :( 请在gitHub上贡献你的翻译!',
    'zh_TW': '還沒翻譯 {key} :( 請在gitHub上貢獻你的翻譯!',
    'es_AR': 'Aún no hay traducción para {key} :( ¡Metete en Github y sugerí una! :)',
    'pt_BR': 'Não existe tradução para {key} :( Pule no Github e sugira uma! :)',
    'fr_FR': 'La traduction pour {key} n\'existe pas encore :( Venez sur Github pour en offrir une !'
  },
  ///////////////////////////////////////////////////////////////////////////
  'error-untranslated': {
    '__desc__': 'The general error when we encounter a dialog that is not translated',
    'en_US': 'This dialog or text is not yet translated in your locale :( Hop on github to aid in translation!',
    'de_DE': 'Dieser Dialog oder Text ist noch nicht in deine Sprache übersetzt. :( Schau auf Github vorbei um bei der Übersetzung zu helfen!',
    'zh_CN': '这段对话还没有被翻译成你的语言 :( 欢迎在gitHub上贡献你的翻译!',
    'zh_TW': '這段對話尚未翻成您的語言 :( 歡迎到 github 貢獻翻譯！',
    'es_AR': 'Este mensaje o texto aún no fue traducido a tu idioma :( ¡Metete en Github y ayudanos a traducirlo!',
    'pt_BR': 'Esta mensagem ou texto não foi traduzida para Português :( Ajude-nos a traduzir no Github!',
    'fr_FR': 'Ce message n\'a pas encore été traduit dans votre langue :( Venez sur Github aider à la traduction !'
  }
};
