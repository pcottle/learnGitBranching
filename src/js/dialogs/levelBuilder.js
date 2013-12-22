exports.dialog = {
  'en_US': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Welcome to the level builder!',
        '',
        'Here are the main steps:',
        '',
        '  * Set up the initial environment with git commands',
        '  * Define the starting tree with ```define start```',
        '  * Enter the series of git commands that compose the (optimal) solution',
        '  * Define the goal tree with ```define goal```. Defining the goal also defines the solution',
        '  * Optionally define a hint with ```define hint```',
        '  * Edit the name with ```define name```',
        '  * Optionally define a nice start dialog with ```edit dialog```',
        '  * Enter the command ```finish``` to output your level JSON!'
      ]
    }
  }],
  'de_DE': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Willkommen zum Level-Editor!',
        '',
        'So funktioniert\'s:',
        '',
        '  * Stelle mit Git-Befehlen die Ausganssituation her',
        '  * Leg den Startpunkt mit ```define start``` fest',
        '  * Gib eine Abfolge von Git-Befehlen ein, welche die (optimale) Lösung darstellen',
        '  * Leg den Ziel-Baum mit ```define goal``` fest. Damit markierst du den Endpunkt der Lösung',
        '  * Gib einen Hinweis mittels ```define hint``` an, wenn du willst',
        '  * Änder den Namen mittels ```define name```',
        '  * Wenn du magst, erstelle einen schönene Einführungsdialog mit ```edit dialog```',
        '  * Gib das Kommando ```finish``` ein um deinen Level als JSON auszugeben'
      ]
    }
  }],
  'zh_CN': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 欢迎使用关卡生成器！',
        '',
        '主要步骤如下：',
        '',
        '  * 使用 git 命令布置好初始环境',
        '  * 使用 ```define start``` 命令定义起始树',
        '  * 输入一系列 git 命令，编好答案',
        '  * 使用 ```define goal``` 命令定义目标树。定义目标的同时定义答案',
        '  * 还可以用 ```define hint``` 命令定义一个提示',
        '  * 用 ```define name``` 修改名称',
        '  * 还可以用 ```edit dialog``` 定义一个漂亮的开始对话框',
        '  * 输入 ```finish``` 就可以输出你的关卡数据（JSON）了！'
      ]
    }
  }],
  'fr_FR': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Bienvenue dans l\'éditeur niveaux !',
        '',
        'Voici les étapes principales :',
        '',
        '  * Mettez en place l\'environnement initial avec des commandes git',
        '  * Définissez l\'arbre de départ avec ```define start```',
        '  * Saisissez la série de commandes git qui composent la solution (optimale)',
        '  * Définissez l\'arbre cible avec ```define goal```. Cela définit aussi la solution',
        '  * Optionnellement, définissez un indice avec ```define hint```',
        '  * Changez le nom avec ```define name```',
        '  * Optionellement, definissez un joli dialogue de départ avec ```edit dialog```',
        '  * Entrez la commande ```finish``` pour délivrer votre niveau JSON!'
      ]
    }
  }]
};
