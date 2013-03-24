exports.strings = {
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-finished': {
    '__desc__': 'One of the lines in the next level dialog',
    'ja': '最後のレベルをクリアしました！すごい！！',
    'en_US': 'Wow! You finished the last level, great!',
    'zh_CN': '我的个天！你完成了最后一关，碉堡了！'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-next': {
    '__desc__': 'One of the lines in the next level dialog',
    'en_US': 'Would you like to move on to *"{nextLevel}"*, the next level?',
    'ja': '次の章 *"{nextLevel}"* へ進みますか？',
    'zh_CN': '要不前进到下一关 *“{nextLevel}”*？'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-win': {
    '__desc__': 'One of the lines in the next level dialog',
    'en_US': 'Awesome! You matched or exceeded our solution.',
    'ja': '素晴らしい！このレベルをクリアしましたね。',
    'zh_CN': '牛鼻啊！你达到或者完爆了我们的答案。'
  },
  ///////////////////////////////////////////////////////////////////////////
  'finish-dialog-lose': {
    '__desc__': 'When the user entered more commands than our best, encourage them to do better',
    'en_US': 'See if you can whittle it down to {best} :D',
    'ja': '模範解答の回数={best}回でクリアする方法も考えてみましょう :D',
    'zh_CN': '试试看你能否在 {best} 之内搞定 :D'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-detached': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'Detached head!',
    'zh_CN': '脑袋搬家（Detached head）了！'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-onbranch': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'On branch {branch}',
    'zh_CN': '切换到分支 {branch}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-status-readytocommit': {
    '__desc__': 'One of the lines for git status output',
    'en_US': 'Ready to commit! (as always in this demo)',
    'zh_CN': '可以提交啦！（这演示里一直可以提交）'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-dummy-msg': {
    '__desc__': 'The dummy commit message for all commits. Feel free to put in a ' +
      'shoutout to your school / city / whatever!',
    'en_US': 'Quick commit. Go Bears!',
    'zh_CN': '快速提交。上啊月熊！'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-branch': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'You can\'t delete the master branch, the branch you are on, or things that ' +
      'aren\'t branches',
    'zh_CN': '你不能删除主分支（master），或者你当前所在的分支，或者其他不是分支也不知道能不能吃的东西。'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-merge-msg': {
    '__desc__': 'The commit message for a merge commit',
    'en_US': 'Merge {target} into {current}',
    'zh_CN': '合并 {target} 到 {current}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-rebase-none': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'No commits to rebase! Everything is a merge commit or changes already applied',
    'zh_CN': '没有需要 rebase 的提交！都是个合并提交，或者已经 rebase 过了。'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-nothing': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Nothing to do...',
    'zh_CN': '没啥鸟事……'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-fastforward': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Fast forwarding...',
    'zh_CN': '快速前进……'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-result-uptodate': {
    '__desc__': 'The message that explains the result of a git command',
    'en_US': 'Branch already up-to-date',
    'zh_CN': '分支已经是最新啦'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-exist': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The ref {ref} does not exist or is unknown',
    'zh_CN': '索引 {ref} 不存在，或者找不到。'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-relative-ref': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Commit {commit} doesnot have a {match}',
    'zh_CN': '提交 {commit} 并没有 {match}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-detached': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'Warning!! Detached HEAD state',
    'zh_CN': '警告！脑袋搬家（Detached HEAD）状态'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-add': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'No need to add files in this demo',
    'zh_CN': '此演示中不需要添加文件'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-options': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Those options you specified are incompatible or incorrect',
    'zh_CN': '你所指定的参数不兼容或者不准确'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-already-exists': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'The commit {commit} already exists in your changes set, aborting!',
    'zh_CN': '提交 {commit} 已经存在于你的改动集里，正在中止！'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-reset-detached': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'Can\'t reset in detached head! Use checkout if you want to move',
    'zh_CN': '不能在分离的 HEAD 里重置！用 checkout 吧'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-warning-hard': {
    '__desc__': 'One of the warning messages for git',
    'en_US': 'The default behavior is a --hard reset, feel free to omit that option!',
    'zh_CN': '默认的行为是 --hard 硬重置，尽管省略掉那个选项吧！'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-staging': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'There is no concept of adding / staging files, so that option or ' +
      'command is invalid!',
    'zh_CN': '没有添加、缓存文件的必要，所以改选项或者命令是不合法的。'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-revert-msg': {
    '__desc__': 'Message for reverting git command',
    'en_US': 'Reverting {oldCommit}: {oldMsg}',
    'zh_CN': '撤销 {oldCommit}：{oldMsg}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-args-many': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'I expect at most {upper} argument(s) for {what}',
    'zh_CN': '{what} 期望最多 {upper} 个参数'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-args-few': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'I expect at least {lower} argument(s) for {what}',
    'zh_CN': '{what} 期望最少 {lower} 个参数'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-error-no-general-args': {
    '__desc__': 'One of the error messages for git',
    'en_US': 'That command accepts no general arguments',
    'zh_CN': '该命令不接收参数'
  },
  ///////////////////////////////////////////////////////////////////////////
  'copy-tree-string': {
    '__desc__': 'The prompt to copy the tree when sharing',
    'en_US': 'Copy the tree string below',
    'zh_CN': '拷贝下面的树字符串'
  },
  ///////////////////////////////////////////////////////////////////////////
  'learn-git-branching': {
    '__desc__': 'The title of the app, with spaces',
    'en_US': 'Learn Git Branching',
    'ja': '日本語版リポジトリ',
    'ko': 'Git 브랜치 배우기',
    'zh_CN': '学习Git分支'
  },
  ///////////////////////////////////////////////////////////////////////////
  'select-a-level': {
    '__desc__': 'The prompt to select a level on the drop down view',
    'en_US': 'Select a level',
    'zh_CN': '选择一关'
  },
  ///////////////////////////////////////////////////////////////////////////
  'branch-name-short': {
    '__desc__': 'When branch names get too long, we need to truncate them. This is the warning for that',
    'en_US': 'Sorry, we need to keep branch names short for the visuals. Your branch name was truncated to 9 characters, resulting in "{branch}"',
    'zh_CN': '抱歉，为了显示的需要，我们需要一个短些的分支名称。您使用的将被截断到9个字符，即"{branch}"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'bad-branch-name': {
    '__desc__': 'When the user enters a branch name thats not ok',
    'en_US': 'That branch name "{branch}" is not allowed!',
    'zh_CN': '不能给分支起这个名字 "{branch}"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'option-not-supported': {
    '__desc__': 'When the user specifies an option that is not supported by our demo',
    'en_US': 'The option "{option}" is not supported!',
    'zh_CN': '不支持选项 "{option}"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-usage-command': {
    '__desc__': 'The line that shows how to format a git command',
    'en_US': 'git <command> [<args>]',
    'zh_CN': 'git <命令> [<参数>]'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-supported-commands': {
    '__desc__': 'In the git help command, the header above the supported commands',
    'en_US': 'Supported commands:',
    'zh_CN': '支持的命令有:'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-usage': {
    '__desc__': 'In the dummy git output, the header before showing all the commands',
    'en_US': 'Usage:',
    'zh_CN': '使用:'
  },
  ///////////////////////////////////////////////////////////////////////////
  'git-version': {
    '__desc__': 'The git version dummy output, kind of silly. PCOTTLE is my unix name but feel free to put yours instead',
    'en_US': 'Git Version PCOTTLE.1.0',
    'zh_CN': 'Git 版本 PCOTTLE.1.0'
  },
  ///////////////////////////////////////////////////////////////////////////
  'refresh-tree-command': {
    '__desc__': 'when the tree is visually refreshed',
    'en_US': 'Refreshing tree...',
    'zh_CN': '正在刷新树结构...'
  },
  ///////////////////////////////////////////////////////////////////////////
  'locale-command': {
    '__desc__': 'when the locale is set to something',
    'en_US': 'Locale set to {locale}',
    'zh_CN': '语言更改为 {locale}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'locale-reset-command': {
    '__desc__': 'when the locale is reset',
    'en_US': 'Locale reset to default, which is {locale}',
    'zh_CN': '语言重置为默认的 {locale}'
  },
  ///////////////////////////////////////////////////////////////////////////
  'show-command': {
    '__desc__': 'command output title from "show"',
    'en_US': 'Please use one of the following commands for more info:'
  },
  ///////////////////////////////////////////////////////////////////////////
  'show-all-commands': {
    '__desc__': 'command output title from "show commands"',
    'en_US': 'Here is a list of all the commmands available:'
  },
  ///////////////////////////////////////////////////////////////////////////
  'cd-command': {
    '__desc__': 'dummy command output for the command in the key',
    'en_US': 'Directory changed to "/directories/dont/matter/in/this/demo"',
    'zh_CN': '目录切换到 "/directories/dont/matter/in/this/demo"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'ls-command': {
    '__desc__': 'Dummy command output for the command in the key',
    'en_US': 'DontWorryAboutFilesInThisDemo.txt',
    'zh_CN': 'DontWorryAboutFilesInThisDemo.txt (译: 在试验里不用担心文件.txt)'
  },
  'mobile-alert': {
    '__desc__': 'When someone comes to the site on a mobile device, they can not input commands so this is a nasty alert to tell them',
    'en_US': 'Can\'t bring up the keyboard on mobile / tablet :( try visiting on desktop! :D',
    'zh_CN': '无法在移动设备/平板上调出键盘 :( 请试试桌面版 :D'
  },
  ///////////////////////////////////////////////////////////////////////////
  'share-tree': {
    '__desc__': 'When you export a tree, we want you to share the tree with friends',
    'en_US': 'Share this tree with friends! They can load it with "import tree"',
    'zh_CN': '与你的好友分享提交树！他们可以用 "import tree" 加载它'
  },
  ///////////////////////////////////////////////////////////////////////////
  'paste-json': {
    '__desc__': 'When you are importing a level or tree',
    'en_US': 'Paste a JSON blob below!',
    'zh_CN': '在下边粘贴一个JSON串'
  },
  ///////////////////////////////////////////////////////////////////////////
  'solved-map-reset': {
    '__desc__': 'When you reset the solved map to clear your solved history, in case someone else wants to use your browser',
    'fr_FR': 'La carte des solutions a été effacée, vous repartez de zéro !',
    'en_US': 'Solved map was reset, you are starting from a clean slate!',
    'zh_CN': '解决列表已重置，您现在从零开始了'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-cant-exit': {
    '__desc__': 'When the user tries to exit a level when they are not in one',
    'en_US': 'You are not in a level! You are in a sandbox, start a level with "levels"',
    'zh_CN': '您没在关卡中！您在沙盒中，要开始关卡请输入 "levels"'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-no-id': {
    '__desc__': 'When you say an id but that level doesnt exist',
    'en_US': 'A level for that id "{id}" was not found! Opening up a level selection view',
    'zh_CN': '没找到id为 "{id}" 的关卡！打开关卡选择框'
  },
  ///////////////////////////////////////////////////////////////////////////
  'undo-stack-empty': {
    '__desc__': 'The undo command can only undo back until the last time the level was reset or the beginning of the level',
    'en_US': 'The undo stack is empty!',
    'zh_CN': '还没有什么可以撤销'
  },
  ///////////////////////////////////////////////////////////////////////////
  'already-solved': {
    '__desc__': 'When you play in a level that is already solved',
    'en_US': 'You have already solved this level, try other levels with "levels" or go back to sandbox with "sandbox"',
    'zh_CN': '你已经解决了本关，输入 "levels" 尝试其他关卡，或者输入 "sandbox" 回到沙盒中'
  },
  ///////////////////////////////////////////////////////////////////////////
  'command-disabled': {
    '__desc__': 'When you try a command that is disabled',
    'en_US': 'That git command is disabled for this level!',
    'zh_CN': '该命令在本关不允许使用！'
  },
  ///////////////////////////////////////////////////////////////////////////
  'share-json': {
    '__desc__': 'when you have made the level, prompt to share this',
    'en_US': 'Here is the JSON for this level! Share it with somenoe or send it to me on Github',
    'zh_CN': '这是一个关卡定义JSON！您可以分享它或者发到我的GitHub上'
  },
  ///////////////////////////////////////////////////////////////////////////
  'want-start-dialog': {
    '__desc__': 'prompt to add a start dialog',
    'en_US': 'You have not specified a start dialog, would you like to add one?',
    'zh_CN': '您还没有定义一开始的介绍，是否添加一个？'
  },
  ///////////////////////////////////////////////////////////////////////////
  'want-hint': {
    '__desc__': 'prompt to add a hint',
    'en_US': 'You have not specified a hint, would you like to add one?',
    'zh_CN': '您还没有定义提示，是否添加一个？'
  },
  ///////////////////////////////////////////////////////////////////////////
  'prompt-hint': {
    '__desc__': 'prompt for hint',
    'en_US': 'Enter the hint for this level, or leave this blank if you do not want to include one',
    'zh_CN': '请输入关卡提示，或者故意留空'
  },
  ///////////////////////////////////////////////////////////////////////////
  'prompt-name': {
    '__desc__': 'prompt for level name',
    'en_US': 'Enter the name for the level',
    'zh_CN': '输入关卡名'
  },
  ///////////////////////////////////////////////////////////////////////////
  'solution-empty': {
    '__desc__': 'If you define a solution without any commands, aka a level that is solved without doing anything',
    'en_US': 'Your solution is empty!! Something is amiss',
    'zh_CN': '你的解法是空的!! 这应该是出错了'
  },
  ///////////////////////////////////////////////////////////////////////////
  'define-start-warning': {
    '__desc__': 'When you define the start point again, it overwrites the solution and goal so we add a warning',
    'en_US': 'Defining start point... solution and goal will be overwritten if they were defined earlier',
    'zh_CN': '定义开始点... 解决方法和目标会被新的替代'
  },
  ///////////////////////////////////////////////////////////////////////////
  'help-vague-level': {
    '__desc__': 'When you are in a level and you say help, its vague and you need to specify',
    'en_US': 'You are in a level, so multiple forms of help are available. Please select either "help level" or "help general"',
    'zh_CN': '您正在关卡中，这里有多种形式的帮助，请选择 "help level" (关卡帮助)或 "help general" (一般帮助)'
  },
  ///////////////////////////////////////////////////////////////////////////
  'help-vague-builder': {
    '__desc__': 'When you are in a level builder, the help command is vague so you need to specify what you mean',
    'en_US': 'You are in a level builder, so multiple forms of help are available. Please select either "help general" or "help builder"',
    'zh_CN': '您正在进行关卡构建中，这里有多种形式的帮助，请选择 "help general" (一般帮助)或 "help builder" (关卡构建帮助)'
  },
  ///////////////////////////////////////////////////////////////////////////
  'goal-to-reach': {
    '__desc__': 'title of window that shoes the goal tree to reach',
    'en_US': 'Goal To Reach',
    'zh_CN': '目标'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-goal': {
    '__desc__': 'the helper message for the window that shows the goal tree',
    'en_US': 'You can hide this window with "hide goal"',
    'zh_CN': '你可以通过命令 "hide goal" 关闭这个窗口'
  },
  ///////////////////////////////////////////////////////////////////////////
  'hide-start': {
    '__desc__': 'The helper message for the window that shows the start tree for a level',
    'en_US': 'You can hide this window with "hide start"',
    'zh_CN': '你可以通过命令 "hide start" 关闭这个窗口'
  },
  ///////////////////////////////////////////////////////////////////////////
  'level-builder': {
    '__desc__': 'The name for the environment where you build levels',
    'en_US': 'Level Builder',
    'zh_CN': '关卡生成器'
  },
  ///////////////////////////////////////////////////////////////////////////
  'no-start-dialog': {
    '__desc__': 'when the user tries to open a start dialog for a level that does not have one',
    'en_US': 'There is no start dialog to show for this level!',
    'zh_CN': '介绍? 这关真没有!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'no-hint': {
    '__desc__': 'when no hint is available for a level',
    'en_US': "Hmm, there doesn't seem to be a hint for this level :-/",
    'zh_CN': "提示？嗯，这关真没有哎~ :-/"
  },
  ///////////////////////////////////////////////////////////////////////////
  'error-untranslated-key': {
    '__desc__': 'This error happens when we are trying to translate a specific key and the locale version is mission',
    'en_US': 'The translation for {key} does not exist yet :( Please hop on github and offer up a translation!',
    'zh_CN': '还没翻译 {key} :( 请在gitHub上贡献你的翻译!'
  },
  ///////////////////////////////////////////////////////////////////////////
  'error-untranslated': {
    '__desc__': 'The general error when we encounter a dialog that is not translated',
    'fr_FR': 'Ce message n\'a pas encore été traduit dans votre langue :( Venez sur Github aider à la traduction !',
    'en_US': 'This dialog or text is not yet translated in your locale :( Hop on github to aid in translation!',
    'zh_CN': '这段对话还没有被翻译成你的语言 :( 欢迎在gitHub上贡献你的翻译!'
  }
};

