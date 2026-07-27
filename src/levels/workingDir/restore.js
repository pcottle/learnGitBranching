exports.level = {
  "goalTreeString": '{"branches":{"main":{"target":"C2","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2","changedFiles":["app.js"]}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"secret.env":"modified"}}',
  "compareWorkingChanges": true,
  "solutionCommand": "git restore --staged secret.env;git restore experiment.js;git commit",
  "startTree": '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"workingChanges":{"app.js":"staged","secret.env":"staged","experiment.js":"modified"}}',
  "name": {
    "en_US": "Undoing with git restore",
    "pt_BR": "Desfazendo com git restore"
  },
  "hint": {
    "en_US": "Unstage with `git restore --staged secret.env`, throw away the experiment with `git restore experiment.js`, then `git commit`.",
    "pt_BR": "Tire do staging com `git restore --staged secret.env`, jogue fora o experimento com `git restore experiment.js` e depois faça `git commit`."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Undoing with `git restore`",
              "",
              "Everybody makes a little mess sometimes. You stage a file you didn't mean to, or start an experiment you'd rather throw away. `git restore` is the modern, purpose-built undo button for your working directory and staging area.",
              "",
              "It comes in two flavors:",
              "",
              "* `git restore --staged <file>`: **unstage** a file (move it back out of the staging area, keeping your edits)",
              "* `git restore <file>`: **discard** your edits to a file entirely (careful, this throws the changes away!)",
              "",
              "*(These replace the older `git reset HEAD <file>` and `git checkout -- <file>` tricks. Same idea, much clearer names.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Here's the mess on your desk right now:",
              "",
              "```",
              "Changes to be committed:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   secret.env",
              "```",
              "",
              "```",
              "Changes not staged for commit:",
              "  modified:   experiment.js",
              "```",
              "",
              "You want to commit `app.js`, but `secret.env` got staged early by accident (it should be a commit on top), so lets save that for later. Also the `experiment.js` changes did not work so lets throw that out entirely."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Tidy up, then commit:",
              "",
              "* Unstage the secret: `git restore --staged secret.env`",
              "* Discard the experiment: `git restore experiment.js`",
              "* Commit what's left: `git commit`",
              "",
              "That lands one clean commit, with only the work you meant to keep."
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
              "## Desfazendo com `git restore`",
              "",
              "Todo mundo faz uma pequena bagunça de vez em quando. Você adiciona ao staging um arquivo sem querer, ou começa um experimento que prefere jogar fora. O `git restore` é o botão de desfazer moderno, feito sob medida para o seu diretório de trabalho e para a área de staging.",
              "",
              "Ele vem em dois sabores:",
              "",
              "* `git restore --staged <arquivo>`: **tira do staging** um arquivo (move ele de volta para fora da área de staging, mantendo as suas edições)",
              "* `git restore <arquivo>`: **descarta** completamente as suas edições em um arquivo (cuidado, isso joga as mudanças fora!)",
              "",
              "*(Esses comandos substituem os truques mais antigos `git reset HEAD <arquivo>` e `git checkout -- <arquivo>`. Mesma ideia, com nomes muito mais claros.)*"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Esta é a bagunça que está na sua mesa agora:",
              "",
              "```",
              "Mudanças a serem commitadas:",
              "```",
              "```",
              "  modified:   app.js",
              "```",
              "```",
              "  modified:   secret.env",
              "```",
              "",
              "```",
              "Mudanças não adicionadas ao staging:",
              "  modified:   experiment.js",
              "```",
              "",
              "Você quer commitar o `app.js`, mas o `secret.env` foi parar no staging cedo demais por acidente (ele deveria ser um commit em cima desse), então vamos guardá-lo para depois. Além disso, as mudanças do `experiment.js` não funcionaram, então vamos jogá-las fora por completo."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Arrume a bagunça e depois commite:",
              "",
              "* Tire o segredo do staging: `git restore --staged secret.env`",
              "* Descarte o experimento: `git restore experiment.js`",
              "* Commite o que sobrou: `git commit`",
              "",
              "Isso resulta em um único commit limpo, apenas com o trabalho que você queria manter."
            ]
          }
        }
      ]
    }
  }
};
