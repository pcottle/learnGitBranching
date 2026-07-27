exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C3","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2","changedFiles":["app.js"]},"C3":{"parents":["C2"],"id":"C3","changedFiles":["styles.css"]}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}',
  "compareWorkingChanges": true,
  "solutionCommand": "git add app.js;git commit;git add styles.css;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"modified","styles.css":"modified"}}',
  "name": {
    "en_US": "The Staging Area",
    "pt_BR": "A área de staging"
  },
  "hint": {
    "en_US": "Stage a file with `git add <file>`, then snapshot it with `git commit`. Do that twice, once per file.",
    "pt_BR": "Adicione um arquivo ao staging com `git add <arquivo>` e depois tire uma fotografia (snapshot) dele com `git commit`. Faça isso duas vezes, uma para cada arquivo."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## The Staging Area",
              "",
              "So far in this learning experience, we have glossed over the idea of what exactly is involved in actually *making* a commit. You might know that they represent changes to a set of files, but there's actually a bit of process in choosing *which* file changes become *which* commits.",
              "",
              "Git doesn't want to just automatically include all changed files in all commits -- that would be bad! It could include a change you don't want to make permanent, or even something secret like an API key that could leak into GitHub as part of your commit history.",
              "",
              "Thus before a change to a file becomes part of a commit, it has to be specifically selected. Git has three zones for this: your **working directory** (where you edit), the **staging area** (a loading dock for what is in the next commit), and the **repository** (your permanent history).",
              "",
              "You pick *exactly* what rides along in each commit with `git add`. That's how commits stay tidy, and you're never forced to commit everything at once.",
              "",
              "*(For these levels, we will now show which files are part of what commits.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Run `git status` any time to see where things stand. Right now it shows two files you've edited but haven't staged:",
              "",
              "```",
              "Changes not staged for commit:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   styles.css",
              "```",
              "",
              "Stage a single file with `git add app.js`, or grab everything at once with `git add .`. Once a file is staged, `git commit` seals it into a snapshot.",
              "",
              "Got files you never want to commit, like secrets, logs, or build junk? List them in a `.gitignore` file and git will quietly leave them alone."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Your turn! Stage and commit your work **one file at a time**, so each commit stays focused:",
              "",
              "* `git add app.js`, then `git commit`",
              "* `git add styles.css`, then `git commit`",
              "",
              "The filenames beside each goal commit show exactly where each change belongs. Two clean commits and the level is yours."
            ]
          }
        }
      ]
    },
    "pt_BR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## A área de staging",
              "",
              "Até agora nesta jornada de aprendizado, passamos por cima da ideia do que exatamente está envolvido em de fato *fazer* um commit. Você já deve saber que eles representam mudanças em um conjunto de arquivos, mas na verdade existe todo um processo para escolher *quais* mudanças de arquivos viram *quais* commits.",
              "",
              "O Git não quer simplesmente incluir de forma automática todos os arquivos modificados em todos os commits -- isso seria péssimo! Ele poderia incluir uma mudança que você não quer tornar permanente, ou até algo secreto como uma chave de API, que acabaria vazando no GitHub como parte do seu histórico de commits.",
              "",
              "Por isso, antes que a mudança em um arquivo faça parte de um commit, ela precisa ser selecionada especificamente. O Git tem três zonas para isso: o seu **diretório de trabalho** (onde você edita), a **área de staging** (uma área de embarque para o que vai no próximo commit) e o **repositório** (o seu histórico permanente).",
              "",
              "Você escolhe *exatamente* o que embarca em cada commit usando o `git add`. É assim que os commits se mantêm organizados, e você nunca é obrigado a commitar tudo de uma vez.",
              "",
              "*(A partir destes níveis, vamos mostrar quais arquivos fazem parte de quais commits.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Rode `git status` a qualquer momento para ver como as coisas estão. Agora ele mostra dois arquivos que você editou, mas ainda não adicionou ao staging:",
              "",
              "```",
              "Mudanças não adicionadas ao staging:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   styles.css",
              "```",
              "",
              "Adicione um único arquivo ao staging com `git add app.js`, ou pegue tudo de uma vez com `git add .`. Assim que um arquivo está no staging, o `git commit` o sela em uma fotografia (snapshot).",
              "",
              "Tem arquivos que você nunca quer commitar, como segredos, logs ou lixo de build? Liste-os em um arquivo `.gitignore` e o Git vai deixá-los quietinhos de lado."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Sua vez! Adicione ao staging e commite o seu trabalho **um arquivo por vez**, para que cada commit fique focado:",
              "",
              "* `git add app.js` e depois `git commit`",
              "* `git add styles.css` e depois `git commit`",
              "",
              "Os nomes dos arquivos ao lado de cada commit do objetivo mostram exatamente onde cada mudança deve ficar. Dois commits limpos e o nível é seu."
            ]
          }
        }
      ]
    }
  }
};
