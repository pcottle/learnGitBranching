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
  'zh_TW': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 歡迎使用關卡編輯器！',
        '',
        '主要步驟如下：',
        '',
        '  * 使用 git 指令建立初始環境',
        '  * 使用 ```define start``` 指令定義起始樹',
        '  * 輸入一系列 git 命令，編好答案',
        '  * 使用 ```define goal``` 指令定義目標樹。定義目標的同時定義答案',
        '  * 還可以用 ```define hint``` 指令定義一個提示',
        '  * 用 ```define name``` 修改名稱',
        '  * 還可以用 ```edit dialog``` 定義一個漂亮的開始對話視窗',
        '  * 輸入 ```finish``` 即可將您的關卡輸出為 JSON！'
      ]
    }
  }],
  'es_AR': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## ¡Bienvenido al constructor de niveles!',
        '',
        'Estos son los pasos principales:',
        '',
        '  * Prepará el entorno inicial usando comandos de Git',
        '  * Definí el árbol inicial con ```define start```',
        '  * Ingresá la serie de comandos de git que representan la solución óptima',
        '  * Definí el árbol objetivo con ```define goal```. El objetivo también determina la solución',
        '  * Opcionalmente, definí pistas con ```define hint```',
        '  * Dale un nombre con ```define name```',
        '  * Opcionalmente, definí un mensaje inicial con ```edit dialog```',
        '  * ¡Ingresá el comando ```finish``` para obtener tu nivel en formato JSON!'
      ]
    }
  }],
  'pt_BR': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Bem-vindo ao construtor de níveis!',
        '',
        'Estes são os passos principais:',
        '',
        '  * Prepare o ambiente inicial usando comandos do Git',
        '  * Define a árvore inicial com ```define start```',
        '  * Insira a série de comandos do git que representam a solução ótima',
        '  * Defina a árvore objetivo com ```define goal```. O objetivo também determina a solução',
        '  * Opcionalmente, defina dicas com ```define hint```',
        '  * Dê um nome com ```define name```',
        '  * Opcionalmente, defina uma mensagem inicial com ```edit dialog```',
        '  * Digite o comando ```finish``` para obter seu nível em formato JSON!'
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
