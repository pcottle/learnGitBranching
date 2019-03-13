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
        '关键步骤如下：',
        '',
        '  * 用 Git 命令建立初始环境',
        '  * 用 ```define start``` 命令定义初始提交树',
        '  * 输入一系列 Git 命令作为（最佳）答案',
        '  * 用 ```define goal``` 命令定义目标提交树。定义目标的同时也定义了答案',
        '  * （选做）还可以用 ```define hint``` 命令定义提示',
        '  * 用 ```define name``` 命令设置关卡名称',
        '  * （选做）还可以用 ```edit dialog``` 定义一个漂亮的开始对话框',
        '  * 用 ```finish``` 命令就可以输出你的关卡的JSON数据了！'
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
  'gl': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Benvido ó constructor de niveis!',
        '',
        'Estes son os pasos principais:',
        '',
        '  * Prepara o eido inicial usando comandos de Git',
        '  * Define a árbore inicial con ```define start```',
        '  * Inserta a secuencia de comandos de git que representan a mellor solución',
        '  * Define a árbore obxectivo con ```define goal```. O obxectivo tamén determina a solución',
        '  * Opcionalmente, define axudas con ```define hint```',
        '  * Dalle un nome con ```define name```',
        '  * Opcionalmente, define unha mensaxe inicial con ```edit dialog```',
        '  * Escribe o comando ```finish``` para obter seu nivel en formato JSON!'
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
  }],
  'ja': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Levelエディタへようこそ!',
        '',
        'ここでは、以下の主にステップを踏みます:',
        '',
        '  * Gitコマンドで初期設定をします',
        '  * ```define start```で開始時のコミットツリーを定義します',
        '  * 一連のGitコマンドの（最適な）解答を入力します',
        '  * ```define goal```でゴールのコミットツリーを定義します（ゴールを定義するということは、解答を定義するということでもあります）',
        '  * オプションで```define hint```でヒントを定義します',
        '  * ```define name```で名前を編集します',
        '  * オプションで```edit dialog```で良い感じに開始時のダイアログを定義します',
        '  * ```finish```コマンドを打つことであなたのlevelがJSONで出力されます',
        '',
        '*Note: このダイアログは`help builder`で何回でも表示できます！活用してください！*'
      ]
    }
  }],
  'ru_RU': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Добро пожаловать в конструктор уровней!',
        '',
        'Вот основные шаги:',
        '',
        '  * Настроить стартовое дерево при помощи команд git',
        '  * Обозначить старовое дерево при помощи ```define start```',
        '  * Ввести команды "оптимального" решения уровня',
        '  * Обозначить цель уровня при помощи ```define goal```. Одновременно обозначится решение.',
        '  * По желанию, можно указать подсказку при помощи ```define hint```',
        '  * Указать название уровня при помощи ```define name```',
        '  * По желанию, указать стартовое сообщение при помощи ```edit dialog```',
        '  * Ввести ```finish``` и получить JSON с описанием уровня!'
      ]
    }
  }],
  'uk': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Ласкаво просимо до конструктора рівнів!',
        '',
        'Ось основні кроки:',
        '',
        '  * Налаштувати початкове середовище за допомогою команд git',
        '  * Визначити стартове дерево за допомогою ```define start```',
        '  * Ввести набір команд, що описують (оптимальний) розв’язок',
        '  * Визначити кінцеве дерево за допомогою ```define goal```. Одночасно це визначить розв’язок',
        '  * Додатково можна задати підказку за допомогою ```define hint```',
        '  * Редагувати назву рівня за допомогою ```define name```',
        '  * Додатково можна вказати файний початковий діалог за допомогою ```edit dialog```',
        '  * Ввести команду ```finish``` й отримати JSON з описом рівня!'
      ]
    }
  }],
  'ko': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## 레벨 생성기 입니다. 환영합니다!',
        '',
        'Here are the main steps:',
        '',
        '  * git 명령어로 초기 환경을 만들어주세요',
        '  * 시작 트리를 ```define start```로 정의하세요',
        '  * (최적화된)정답을 만드는 git 명령어들을 입력하세요',
        '  * 골 트리를 ```define goal```로 정의해주세요. 골을 정의하면 정답도 같이 정의됩니다',
        '  * ```define hint```로 원하면 힌트도 정의해줄수 있습니다',
        '  * 문제의 이름을 ```define name```로 수정하세요',
        '  * 시작 글이 필요하다면 ```edit dialog```로 쓸 수 있습니다',
        '  * ```finish```로 여러분의 레벨을 JSON결과로 받을 수 있습니다!'
      ]
    }
  }],
};
