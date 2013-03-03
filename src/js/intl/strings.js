exports.strings = {
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-finished': {
    '__desc__': 'One of the lines in the next level dialog',
    'fr_FR': 'Wow! Vous avez fini le dernier niveau, bravo !',
    'en_US': 'Wow! You finished the last level, great!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-next': {
    '__desc__': 'One of the lines in the next level dialog',
    'fr_FR': 'Désirez-vous continuer avec *"{nextLevel}"*, le prochain niveau ?',
    'en_US': 'Would you like to move onto *"{nextLevel}"*, the next level?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-win': {
    '__desc__': 'One of the lines in the next level dialog',
    'fr_FR': 'Excellent ! Vous égalez ou dépassez notre solution.',
    'en_US': 'Awesome! You matched or exceeded our solution.'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-lose': {
    '__desc__': 'When the user entered more commands than our best, encourage them to do better',
    'fr_FR': 'Essayez de la raccourcir jusqu\'à {best} étapes :D',
    'en_US': 'See if you can whittle it down to {best} :D'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-detached': {
    '__desc__': 'One of the lines for git status output',
    'fr_FR': 'HEAD détachée !',
    'en_US': 'Detached head!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-onbranch': {
    '__desc__': 'One of the lines for git status output',
    'fr_FR': 'Sur la branche {branch}',
    'en_US': 'On branch {branch}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-readytocommit': {
    '__desc__': 'One of the lines for git status output',
    'fr_FR': 'Prêt pour le commit ! (comme toujours, pour cette démo)',
    'en_US': 'Ready to commit! (as always in this demo)'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-dummy-msg': {
    '__desc__': 'The dummy commit message for all commits. Feel free to put in a ' +
      'shoutout to your school / city / whatever!',
    'fr_FR': 'Commit rapide ! Git c\'est génial :D',
    'en_US': 'Quick commit. Go Bears!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-branch': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'You can\'t delete the master branch, the branch you are on, or things that ' +
      'aren\'t branches'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-merge-msg': {
    '__desc__': 'The commit message for a merge commit',
    'fr_FR': 'Merge de {target} dans {current}',
    'en_US': 'Merge {target} into {current}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-rebase-none': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Pas de commits pour le rebase ! Que des commits de merge, ou les modifications ont déjà été intégrées.',
    'en_US': 'No commits to rebase! Everything is a merge commit or changes already applied'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-nothing': {
    '__desc__': 'The message that explains the result of a git command',
    'fr_FR': 'Rien à faire…',
    'en_US': 'Nothing to do...'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-fastforward': {
    '__desc__': 'The message that explains the result of a git command',
    'fr_FR': 'Avance rapide (Fast forwarding)…',
    'en_US': 'Fast forwarding...'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-uptodate': {
    '__desc__': 'The message that explains the result of a git command',
    'fr_FR': 'La branche est déjà à jour',
    'en_US': 'Branch already up-to-date'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-exist': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The ref {ref} does not exist or is unknown'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-relative-ref': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Le commit {commit} n\'a pas de {match}',
    'en_US': 'Commit {commit} doesnot have a {match}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-detached': {
    '__desc__': 'One of the warning messages for git',
    'fr_FR': 'Alerte !! HEAD est détachée',
    'en_US': 'Warning!! Detached HEAD state'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-add': {
    '__desc__': 'One of the warning messages for git',
    'fr_FR': 'Pas besoin d\'ajouter de fichiers pour cette démo',
    'en_US': 'No need to add files in this demo'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-options': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Ces options que vous avez indiquées sont incompatibles et/ou incorrectes',
    'en_US': 'Those options you specified are incompatible or incorrect'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-already-exists': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Opération interrompue: Ce commit {commit} existe déjà dans votre changes sets !',
    'en_US': 'The commit {commit} already exists in your changes set, aborting!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-reset-detached': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Impossible de faire un reset avec HEAD détachée ! Utilisez checkout si vous voulez faire un déplacement.',
    'en_US': 'Can\'t reset in detached head! Use checkout if you want to move'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-hard': {
    '__desc__': 'One of the warning messages for git',
    'fr_FR': 'Le comportement par défaut correspond à l\'option --hard, celle-ci est donc optionnelle !',
    'en_US': 'The default behavior is a --hard reset, feel free to omit that option!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-staging': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Il n\'y a pas d\'ajouts/ mise en staging de fichiers, donc cette option ou commande est donc invalide !',
    'en_US': 'There is no concept of adding / staging files, so that option or ' +
      'command is invalid!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-revert-msg': {
    '__desc__': 'Message for reverting git command',
    'fr_FR': 'Annulation (revert) de {oldCommit}: {oldMsg}',
    'en_US': 'Reverting {oldCommit}: {oldMsg}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-args-many': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Le maximum d\'arguments pour {what} est {upper}',
    'en_US': 'I expect at most {upper} argument(s) for {what}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-args-few': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Le minimum d\'arguments pour {what} est {lower}',
    'en_US': 'I expect at least {lower} argument(s) for {what}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-no-general-args': {
    '__desc__': 'One of the error messages for git',
    'fr_FR': 'Cette commande n\'accepte pas d\'arguments',
    'en_US': 'That command accepts no general arguments'
  },
  ///////////////////////////////////////////////////////////////////////////
  'copy-tree-string': {
    '__desc__': 'The prompt to copy the tree when sharing',
    'fr_FR': 'Copier la chaîne ci-dessous',
    'en_US': 'Copy the tree string below'
  },
  ///////////////////////////////////////////////////////////////////////////
  'learn-git-branching': {
    '__desc__': 'The title of the app, with spaces',
    'fr_FR': 'Apprenez Git',
    'en_US': 'Learn Git Branching',
    'ko': 'Git 브랜치 배우기'
  },
  ///////////////////////////////////////////////////////////////////////////
  'select-a-level': {
    '__desc__': 'The prompt to select a level on the drop down view',
    'fr_FR': 'Choisissez un niveau',
    'en_US': 'Select a level'
  },
  ///////////////////////////////////////////////////////////////////////////
  'branch-name-short': {
    '__desc__': 'When branch names get too long, we need to truncate them. This is the warning for that',
    'fr_FR': 'Désolé, nous devons garder des noms de branches de petite taille pour la visualisation. Le nom de votre branche a été réduit à 9 caractères : "{branch}"',
    'en_US': 'Sorry, we need to keep branch names short for the visuals. Your branch name was truncated to 9 characters, resulting in "{branch}"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'bad-branch-name': {
    '__desc__': 'When the user enters a branch name thats not ok',
    'fr_FR': 'Ce nom de branche ("{branch}") n\'est pas autorisé !',
    'en_US': 'That branch name "{branch}" is not allowed!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'option-not-supported': {
    '__desc__': 'When the user specifies an option that is not supported by our demo',
    'fr_FR': 'L\'option "{option}" n\'est pas gérée !',
    'en_US': 'The option "{option}" is not supported!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-usage-command': {
    '__desc__': 'The line that shows how to format a git command',
    'fr_FR': 'git <command> [<args>]',
    'en_US': 'git <command> [<args>]'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-supported-commands': {
    '__desc__': 'In the git help command, the header above the supported commands',
    'fr_FR': 'Commanes gérées:',
    'en_US': 'Supported commands:'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-usage': {
    '__desc__': 'In the dummy git output, the header before showing all the commands',
    'fr_FR': 'Usage:',
    'en_US': 'Usage:'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-version': {
    '__desc__': 'The git version dummy output, kind of silly. PCOTTLE is my unix name but feel free to put yours instead',
    'fr_FR': 'Git Version PCOTTLE.1.0',
    'en_US': 'Git Version PCOTTLE.1.0'
  },
  ///////////////////////////////////////////////////////////////////////////
  'refresh-tree-command': {
    '__desc__': 'when the tree is visually refreshed',
    'fr_FR': 'Misejour de l\'arbre…',
    'en_US': 'Refreshing tree...'
  },
  ///////////////////////////////////////////////////////////////////////////
  'locale-command': {
    '__desc__': 'when the locale is set to something',
    'fr_FR': 'Locale est configuré à {locale}',
    'en_US': 'Locale set to {locale}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'locale-reset-command': {
    '__desc__': 'when the locale is reset',
    'fr_FR': 'Locale remise à la valeur par défaut, à savoir {locale}',
    'en_US': 'Locale reset to default, which is {locale}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'cd-command': {
    '__desc__': 'dummy command output for the command in the key',
    'fr_FR': 'Répertoire changé pour "/repertoires/sans/importance/pour/cette/demo"',
    'en_US': 'Directory changed to "/directories/dont/matter/in/this/demo"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'ls-command': {
    '__desc__': 'Dummy command output for the command in the key',
    'fr_FR': 'NeVousOccupezPasDesFichiersPourCetteDemo.txt',
    'en_US': 'DontWorryAboutFilesInThisDemo.txt'
  },
  'mobile-alert': {
    '__desc__': 'When someone comes to the site on a mobile device, they can not input commands so this is a nasty alert to tell them',
    'en_US': 'Impossible d\'utiliser le clavier sur les mobiles / tablettes :( revenez avec un ordinteur ! :D',
    'en_US': 'Can\'t bring up the keyboard on mobile / tablet :( try visiting on desktop! :D'
  },
  ///////////////////////////////////////////////////////////////////////////
  'share-tree': {
    '__desc__': 'When you export a tree, we want you to share the tree with friends',
    'fr_FR': 'Partagez cet arbre avec des amis ! Ils peuvent le charger avec "import tree"',
    'en_US': 'Share this tree with friends! They can load it with "import tree"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'paste-json': {
    '__desc__': 'When you are importing a level or tree',
    'fr_FR': 'Collez un blob JSON ci-dessous !',
    'en_US': 'Paste a JSON blob below!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'solved-map-reset': {
    '__desc__': 'When you reset the solved map to clear your solved history, in case someone else wants to use your browser',
    'fr_FR': 'La carte des solutions a été effacée, vous repartez de zéro !',
    'en_US': 'Solved map was reset, you are starting from a clean slate!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-cant-exit': {
    '__desc__': 'When the user tries to exit a level when they are not in one',
    'fr_FR': 'Vous n\'êtes pas dans un niveau! Vous êtes dans un bac à sable (sandbox), commencez un niveau avec "levels"',
    'en_US': 'You are not in a level! You are in a sandbox, start a level with "levels"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-no-id': {
    '__desc__': 'When you say an id but that level doesnt exist',
    'fr_FR': 'Aucun niveau ayant l\'identifiant "{id}" n\'a été trouvé ! Ouverture d\'une fenêtre de sélection de niveau',
    'en_US': 'A level for that id "{id}" was not found! Opening up a level selection view'
  },
  ///////////////////////////////////////////////////////////////////////////
  'undo-stack-empty': {
    '__desc__': 'The undo command can only undo back until the last time the level was reset or the beginning of the level',
    'fr_FR': 'La pile d\'undo (opérations qu\'il serait possible d\'annuler) est vide !',
    'en_US': 'The undo stack is empty!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'already-solved': {
    '__desc__': 'When you play in a level that is already solved',
    'fr_FR': 'Vous avez déjà résolu ce niveau, essayez d\'autres niveaux avec "levels" ou retournez dans le bac à sable avec "sandbox"',
    'en_US': 'You have alreaady solved this level, try other levels with "levels" or go back to sandbox with "sandbox"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'command-disabled': {
    '__desc__': 'When you try a command that is disabled',
    'fr_FR': 'Cette commande git est désactivée pour ce niveau !',
    'en_US': 'That git command is disabled for this level!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'share-json': {
    '__desc__': 'when you have made the level, prompt to share this',
    'fr_FR': 'Voici le JSON correspondant à ce niveau ! Partagez-le avec quelqu\'un et/ou envoyez le moi sur Github',
    'en_US': 'Here is the JSON for this level! Share it with somenoe or send it to me on Github'
  },
  ///////////////////////////////////////////////////////////////////////////
  'want-start-dialog': {
    '__desc__': 'prompt to add a start dialog',
    'fr_FR': 'Vous n\'avez pas indiqué de message de démarrage, voulez-vous en ajouter un ?',
    'en_US': 'You have not specified a start dialog, would you like to add one?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'want-hint': {
    '__desc__': 'prompt to add a hint',
    'fr_FR': 'Vous n\'avez pas indiqué d\'indice, voulez-vous en ajouter un ?',
    'en_US': 'You have not specified a hint, would you like to add one?'
  },
  ///////////////////////////////////////////////////////////////////////////
  'prompt-hint': {
    '__desc__': 'prompt for hint',
    'fr_FR': 'Saisissez l\'indice pour ce niveau, ou laissez vide si vous ne voulez pas donner d\'indice',
    'en_US': 'Enter the hint for this level, or leave this blank if you do not want to include one'
  },
  ///////////////////////////////////////////////////////////////////////////
  'prompt-name': {
    '__desc__': 'prompt for level name',
    'fr_FR': 'Saisissez le nom du niveau',
    'en_US': 'Enter the name for the level'
  },
  ///////////////////////////////////////////////////////////////////////////
  'solution-empty': {
    '__desc__': 'If you define a solution without any commands, aka a level that is solved without doing anything',
    'fr_FR': 'Votre solution est vide !! Il manque quelque chose',
    'en_US': 'Your solution is empty!! Something is amiss'
  },
  ///////////////////////////////////////////////////////////////////////////
  'define-start-warning': {
    '__desc__': 'When you define the start point again, it overwrites the solution and goal so we add a warning',
    'fr_FR': 'Définition du point de départ... la solution et l\'objectif seront écrasés s\'ils avaient été déjà définis',
    'en_US': 'Defining start point... solution and goal will be overwritten if they were defined earlier'
  },
  ///////////////////////////////////////////////////////////////////////////
  'help-vague-level': {
    '__desc__': 'When you are in a level and you say help, its vague and you need to specify',
    'fr_FR': 'Vous êtes dans un niveau, plusieurs formes d\'aide sont à votre disposition. Choisissez "help level" ou "help general"',
    'en_US': 'You are in a level, so multiple forms of help are available. Please select either "help level" or "help general"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'help-vague-builder': {
    '__desc__': 'When you are in a level builder, the help command is vague so you need to specify what you mean',
    'fr_FR': 'Vous êtes dans l\'outil de construction de niveaux, plusieurs formes d\'aide sont à votre disposition. Choisissez "help builder" ou "help general"',
    'en_US': 'You are in a level builder, so multiple forms of help are available. Please select either "help general" or "help builder"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'goal-to-reach': {
    '__desc__': 'title of window that shoes the goal tree to reach',
    'fr_FR': 'Objectif à atteindre',
    'en_US': 'Goal To Reach'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-goal': {
    '__desc__': 'the helper message for the window that shows the goal tree',
    'fr_FR': 'Vous pouvez dissimuler cette fenêtre avec "hide goal"',
    'en_US': 'You can hide this window with "hide goal"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-start': {
    '__desc__': 'The helper message for the window that shows the start tree for a level',
    'fr_FR': 'Vous pouvez dissimuler cette fenêtre avec "hide start"',
    'en_US': 'You can hide this window with "hide start"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-builder': {
    '__desc__': 'The name for the environment where you build levels',
    'fr_FR': 'Outil de construction de niveaux',
    'en_US': 'Level Builder'
  },
  ///////////////////////////////////////////////////////////////////////////
  'no-start-dialog': {
    '__desc__': 'when the user tries to open a start dialog for a level that does not have one',
    'fr_FR': 'Il n\'y a pas de message de démarrage à montrer pour ce niveau !',
    'en_US': 'There is no start dialog to show for this level!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'no-hint': {
    '__desc__': 'when no hint is available for a level',
    'fr_FR': "Hmm, il semble qu\'il n\'y ait pas d'indice pour ce niveau :-/",
    'en_US': "Hmm, there doesn't seem to be a hint for this level :-/"
  },
  ///////////////////////////////////////////////////////////////////////////
  'error-untranslated-key': {
    '__desc__': 'This error happens when we are trying to translate a specific key and the locale version is mission',
    'fr_FR': 'La traduction pour {key} n\'existe pas encore :( Merci de proposer une traduction sur Githib !',
    'en_US': 'The translation for {key} does not exist yet :( Please hop on github and offer up a translation!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'error-untranslated': {
    '__desc__': 'The general error when we encounter a dialog that is not translated',
    'fr_FR': 'Ce message n\'a pas encore été traduit dans votre langue :( Venez sur Github aider à la traduction !',
    'en_US': 'This dialog or text is not yet translated in your locale :( Hop on github to aid in translation!'
  }
};

