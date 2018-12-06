module.exports = {
  "multiple-parents-name": "Múltiplos pais",
  "multiple-parents-hint": "Use `git branch bugWork` com um commit alvo para criar a referência que falta",
  "multiple-parents-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Especificando pais",
            "",
            "Assim como o modificador `~`, o modificador `^` também aceita um número opcional depois dele.",
            "",
            "Em vez de especificar o número de gerações a voltar (que é o que o `~` faz), o modificador no `^` especifica qual referência de pai a ser seguida a partir de um commit de merge. Lembre-se que commits de merge possuem múltiplos pais, então o caminho a seguir é ambíguo.",
            "",
            "O Git normalmente subirá o \"primeiro\" pai de um commit de merge, mas especificar um número após o `^` muda esse comportamento padrão.",
            "",
            "Basta de conversa, vejamos o operador em ação.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Aqui temos um commit de merge. Se fizermos checkout em `master^` sem especificar um número, vamos seguir o primeiro pai acima do commit de merge. ",
            "",
            "(*Em nossa visualização, o primeiro pai é aquele diretamente acima do commit de merge.*)"
          ],
          "afterMarkdowns": [
            "Fácil -- isso é aquilo com o que já estamos acostumados."
          ],
          "command": "git checkout master^",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Agora vamos, em vez disso, especificar o segundo pai..."
          ],
          "afterMarkdowns": [
            "Viu? Subimos para o outro pai."
          ],
          "command": "git checkout master^2",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Os modificadores `^` e `~` podem tornar a movimentação ao redor da árvore de commits muito poderosa:"
          ],
          "afterMarkdowns": [
            "Rápido como a luz!"
          ],
          "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Ainda mais louco, esses modificadores podem ser encadeados em conjunto! Veja só:"
          ],
          "afterMarkdowns": [
            "O mesmo movimento que o anterior, mas tudo em um único comando."
          ],
          "command": "git checkout HEAD~^2~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Coloque em prática",
            "",
            "Para completar este nível, crie um novo ramo no destino especificado.",
            "",
            "Obviamente seria mais fácil especificar o commit diretamente (com algo como `C6`), mas em vez disso eu desafio você a usar os modificadores sobre os quais falamos!"
          ]
        }
      }
    ]
  },
  "branching-name": "Ramos no Git",
  "branching-hint": "Crie um novo ramo com \"git branch [nome]\" e mude para ele com \"git checkout [nome]\"",
  "branching-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Ramos no Git",
            "",
            "Ramos no Git também são incrivelmente leves. Eles são simplesmente referências a um commit específico -- e nada mais. É por isso que muitos entusiastas do Git entoam o mantra:",
            "",
            "```",
            "ramifique cedo, ramifique sempre",
            "```",
            "",
            "Devido a não existir sobrecarga de armazenamento / memória associada à criação de ramos, é mais fácil dividir logicamente o seu trabalho do que ter ramos grandes e gordos.",
            "",
            "Quando começarmos a misturar ramos e commits, vamos ver como esses dois recursos combinam bem. Por enquanto, só lembre que um ramo diz essencialmente \"Quero incluir o trabalho deste commit e de todos os seus ancestrais\"."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vejamos como os ramos funcionam na prática.",
            "",
            "Aqui vamos criar um novo ramo chamado `newImage`"
          ],
          "afterMarkdowns": [
            "Veja, é só isso que você tem que fazer para ramificar! O ramo `newImage` agora se refere ao commit `C1`"
          ],
          "command": "git branch newImage",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos tentar colocar algum trabalho neste novo ramo. Clique no botão abaixo"
          ],
          "afterMarkdowns": [
            "Ah não! O ramo `master` se moveu mas o `newImage` não! Isso é porque o novo ramo não era o \"ativo\", e é por isso que o asterisco (*) estava no `master`"
          ],
          "command": "git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos contar ao git que queremos fazer checkout no ramo com:",
            "",
            "```",
            "git checkout [nome]",
            "```",
            "",
            "Isso vai nos situar no ramo antes de commitarmos nossas mudanças"
          ],
          "afterMarkdowns": [
            "Aqui vamos nós! Nossas mudanças foram gravadas no novo ramo"
          ],
          "command": "git checkout newImage; git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok! Vocês estão todos prontos para ramificar. Assim que esta janela fechar,",
            "crie um novo ramo chamado `bugFix` e mude para esse ramo"
          ]
        }
      }
    ]
  },
  "commits-name": "Introdução aos commits no Git",
  "commits-hint": "Simplesmente digite 'git commit' duas vezes para concluir!",
  "commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Commits no Git",
            "Um commit em um repositório git registra uma fotografia (snapshot) de todos os arquivos no seu diretório. É como um _grande_ copy&paste, mas ainda melhor!",
            "",
            "O Git tem por objetivo manter os commits tão leves quanto possível, de forma que ele não copia cegamente o diretório completo toda vez que você commita. Ele pode (quando possível) comprimir um commit como um conjunto de mudanças (ou um _\"delta\"_) entre uma versão do seu repositório e a seguinte.",
            "",
            "O Git também mantém um histórico de quando ocorreu cada commit. É por isso que a maioria dos commits tem ancestrais acima de si -- que indicamos usando setas na nossa visualização. Manter a história é ótimo para todos que trabalham no projeto!",
            "",
            "Há muito para aprender, mas por enquanto pense nos commits como snapshots do seu projeto. Os commits são muito leves, e mudar de um para outro é extremamente rápido!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vejamos o que isso significa na prática. À direita, temos uma visualização de um (pequeno) repositório git. Há dois commits no momento: o commit inicial, `C0`, e um commit que se segue, `C1`, que poderia conter algumas mudanças interessantes.",
            "",
            "Clique no botão abaixo para fazer um novo commit"
          ],
          "afterMarkdowns": [
            "Aí vamos nós! Incrível. Acabamos de fazer mudanças no repositório e as guardamos como um commit. O commit que acabamos de criar tem um pai, `C1`, que referencia em qual commit ele se baseou."
          ],
          "command": "git commit",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Vamos lá, tente você agora! Quando esta janela se fechar, faça dois commits para completar o nível."
          ]
        }
      }
    ]
  },
  "merging-name": "Merge no Git",
  "merging-hint": "Lembre-se de commitar na ordem especificada (bugFix antes de master)",
  "merging-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branches e Merge",
            "",
            "Ótimo! Agora sabemos como commitar e criar ramos. Agora precisamos aprender uma forma de combinar o trabalho de dois ramos diferentes. Isso nos permitirá ramificar, desenvolver um novo recurso, e então combiná-lo de volta.",
            "",
            "O primeiro método para combinar trabalho que vamos examinar é o `git merge`. O merge do Git cria um commit especial que possui dois pais únicos. Um commit com dois pais essencialmente significa \"Quero incluir todo o trabalho deste pai aqui com o daquele outro pai ali, *e* com o do conjunto de todos os seus ancestrais.\"",
            "",
            "É mais fácil com uma visualização, vamos ver logo a seguir"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Aqui nós temos dois ramos; cada um tem um commit que é único. Isso significa que nenhum ramo inclui o conjunto do \"trabalho\" que foi realizado no repositório. Vamos consertar isso com um merge.",
            "",
            "Vamos juntar o ramo `bugFix` no `master`"
          ],
          "afterMarkdowns": [
            "Uau! Viu isso? Antes de tudo, o `master` agora aponta para um commit que possui dois pais. Se você seguir as setas subindo a árvore de commits a partir do `master`, você será capaz de encontrar, ao longo do caminho até a raiz, qualquer um dos commits. Isso significa que o `master` contém todo o trabalho realizado no repositório até o momento.",
            "",
            "Além disso, viu como as cores dos commits mudaram? Para ajudá-lo a aprender, eu incluí uma legenda. Cada ramo tem uma cor única. Cada commit tem a cor resultante da mistura das cores de todos os ramos que o contém.",
            "",
            "Aqui vemos que a cor do ramo `master` está misturada em todos os commits, mas a cor do `bugFix` não está. Vamos corrigir isso..."
          ],
          "command": "git merge bugFix",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos juntar o `master` no `bugFix`:"
          ],
          "afterMarkdowns": [
            "Como o `bugFix` é um ancestral do `master`, o git não teve trabalho nenhum; ele só precisou mover o `bugFix` para o mesmo commit do `master`.",
            "",
            "Agora todos os commits possuem a mesma cor, o que significa que ambos os ramos contém todo o trabalho realizado no repositório! Eba!"
          ],
          "command": "git checkout bugFix; git merge master",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nível, faça o seguinte:",
            "",
            "* Crie um novo ramo chamado `bugFix`",
            "* Faça checkout no ramo `bugFix` com `git checkout bugFix`",
            "* Faça um commit",
            "* Volte ao `master` com `git checkout`",
            "* Faça um novo commit",
            "* Junte o ramo `bugFix` no `master` com `git merge`",
            "",
            "*Lembre-se, você pode sempre mostrar esta mensagem novamente com o comando \"objective\"!*"
          ]
        }
      }
    ]
  },
  "rebasing-name": "Introdução ao rebase",
  "rebasing-hint": "O bugFix precisa ser commitado primeiro",
  "rebasing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Rebase no Git",
            "",
            "A segunda forma de combinar trabalho entre ramos é o *rebase*. O rebase essencialmente pega um conjunto de commits, \"copia\" os mesmos, e os despeja em outro lugar.",
            "",
            "Isso pode parecer confuso, mas a vantagem do rebase é que ele pode ser usado para construir uma sequência mais bonita e linear de commits. O registro de commits (história do repositório) ficará muito mais limpa se for utilizado apenas rebase em vez de merge.",
            "",
            "Vejamo-lo em ação..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Aqui temos dois ramos novamente; note que o ramo bugFix está atualmente ativo (veja o asterisco)",
            "",
            "Queremos mover nosso trabalho do bugFix diretamente dentro do master. Desta forma, vai parecer que esses dois recursos foram desenvolvidos sequencialmente, quando na realidade foram feitos em paralelo.",
            "",
            "Vamos fazê-lo com o comando `git rebase`"
          ],
          "afterMarkdowns": [
            "Incrível! Agora o trabalho do nosso ramo bugFix está logo após o do master, e temos uma linda sequência linear de commits.",
            "",
            "Perceba que o commit C3 ainda existe em algum lugar (ele está clareado na árvore), e que o C3' é a \"cópia\" que rebaseamos no master.",
            "",
            "O único problema é que o master não foi atualizado também, vamos fazê-lo agora..."
          ],
          "command": "git rebase master",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Agora o ramo `master` está ativo. Vamos em frente, fazer rebase no `bugFix`..."
          ],
          "afterMarkdowns": [
            "Aí está! Como o `master` era um ancestral do `bugFix`, o git simplesmente moveu a referência do ramo `master` para frente na história."
          ],
          "command": "git rebase bugFix",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nível, faça o seguinte",
            "",
            "* Faça checkout de um novo branch chamado `bugFix`",
            "* Faça um commit",
            "* Volte ao master e faça um novo commit",
            "* Faça checkout do bugFix novamente e faça rebase no master",
            "",
            "Boa sorte!"
          ]
        }
      }
    ]
  },
  "describe-name": "Git Describe",
  "describe-hint": "Simplesmente commite uma vez em bugFix quando quiser parar de experimentar",
  "describe-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Git Describe",
            "",
            "Devido ao fato de as tags servirem como \"âncoras\" tão boas no código, o Git tem um comando para *descrever* onde você está com relação à \"âncora\" (tag) mais próxima. Esse comando é chamado `git describe`!",
            "",
            "O git describe pode ajudar a recuperar a sua orientação depois de você ter se movido muitos commits para trás ou para frente no histórico; isso pode acontecer depois de você completar um git bisect (uma busca para debug) ou quando se sentar no computador de um colega que acabou de voltar de férias."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "O git describe é chamado da seguinte forma:",
            "",
            "`git describe <ref>`",
            "",
            "Onde `<ref>` é qualquer coisa que o git possa resolver como uma referência a um commit. Se você não especificar o ref, o Git usa simplesmente o commit atual (`HEAD`).",
            "",
            "A saída do comando é mais ou menos assim:",
            "",
            "`<tag>_<numCommits>_g<hash>`",
            "",
            "Onde `tag` é a tag ancestral mais próxima no histórico, `numCommits` é o número de commits de distância da tag, e `<hash>` é o hash do commit sendo descrito."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vejamos um exemplo rápido. Para a árvore abaixo:"
          ],
          "afterMarkdowns": [
            "O comando `git describe master` daria a saída:",
            "",
            "`v1_2_gC2`",
            "",
            "Enquanto `git describe side` daria:",
            "",
            "`v2_1_gC4`"
          ],
          "command": "git tag v2 C3",
          "beforeCommand": "git commit; go -b side HEAD~1; gc; gc; git tag v1 C0"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "É basicamente disso que se trata o git describe! Tente descrever alguns locais da árvore para sentir como o comando se comporta.",
            "",
            "Uma vez que você estiver satisfeito, apenas faça um commit que o nível será finalizado. Essa é de graça :P"
          ]
        }
      }
    ]
  },
  "grabbing-one-commit-name": "Pegando um único commit",
  "grabbing-one-commit-hint": "Lembre-se, o rebase interativo ou o cherry-pick são seus amigos aqui",
  "grabbing-one-commit-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Commits empilhados localmente",
            "",
            "Aqui está uma situação de acontece frequentemente com desenvolvedores: Estou tentando encontrar um bug, mas ele é escorregadio. Para auxiliar meu trabalho de detetive, eu coloco alguns comandos de debug e prints.",
            "",
            "Todos esses comandos de debug e mensagens estão em seus próprios ramos. Finalmente eu encontro o bug, corrijo, e me regozijo!",
            "",
            "O único problema é que agora eu preciso devolver o meu `bugFix` ao ramo `master`. Se eu simplesmente der um fast-forward no `master`, então o `master` terminará contendo todos os comandos de debug, o que é indesejável. Deve existir alguma outra forma..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Precisamos dizer ao git para copiar somente um dos commits. Esta situação é exatamente a mesma dos níveis anteriores a respeito de como mover trabalho -- podemos usar os mesmos comandos:",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`",
            "",
            "Para alcançar o objetivo."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Este é um nível avançado, então vamos deixar para você a decisão de qual comando usar, mas para completar este nível, certifique-se de que o `master` receba o commit referenciado por `bugFix`."
          ]
        }
      }
    ]
  },
  "juggling-commits-name": "Malabarismo com commits",
  "juggling-commits-hint": "O primeiro comando é git rebase -i HEAD~2",
  "juggling-commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Malabarismo com commits",
            "",
            "Aqui está outra situação que acontece com bastante frequência. Você fez algumas mudanças (`newImage`), além de um outro conjunto de mudanças (`caption`) que são relacionadas, de forma que elas estão empilhadas uma após a outra no seu repositório.",
            "",
            "O complicado é que algumas vezes você precisa fazer uma pequena modificação em um commit mais antigo. Neste caso, o pessoal do design quer que modifiquemos um pouco as dimensões da imagem introduzida em `newImage`, apesar de esse commit estar mais para trás no nosso histórico!!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Superaremos essa dificuldade fazendo o seguinte:",
            "",
            "* Reordenaremos os commits de forma que aquele que desejamos esteja no topo, com `git rebase -i`",
            "* Usaremos o comando `git commit --amend` para fazer uma pequena modificação",
            "* Vamos, então, reordenar os commits na mesma ordem que estavam anteriormente com `git rebase -i`",
            "* Finalmente, moveremos o master para essa parte atualizada da árvore para finalizar o nível (usando o método de sua escolha)",
            "",
            "Há muitas formas de alcançar o objetivo final (eu vejo o cherry-pick passando pela sua mente), e veremos mais delas depois, mas por enquanto foquemos nesta técnica.",
            "",
            "Por último, preste atenção no estado do \"objetivo\" aqui -- como nós movemos os commits duas vezes, ambos ficam com um apóstrofo. Um apóstrofo adicional é colocado no commit que sofreu o \"amend\", o que nos dá a forma final da árvore ",
            "",
            "Tendo dito isto, posso avaliar a resposta baseado na estrutura e nas diferenças relativas de número de apóstrofos. Desde que o ramo `master` da sua árvore tenha a mesma estrutura, e o número de apóstrofos seja igual a menos de uma constante, darei a você todos os pontos para esta tarefa"
          ]
        }
      }
    ]
  },
  "juggling-commits2-name": "Malabarismo com commits #2",
  "juggling-commits2-hint": "Não se esqueça de avançar a referência do master para as mudanças efetuadas!",
  "juggling-commits2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Malabarismo com commits #2",
            "",
            "*Caso você não tenha completado o nível anterior (Malabarismo com commits #1), por favor faça-o antes de continuar*",
            "",
            "Como você viu no nível anterior, usamos `rebase -i` para reordenar os commits. Uma vez que o commit que queríamos mudar estava no topo, pudemos facilmente usar o `--amend` e depois reordená-lo de volta para obter nossa ordem preferida.",
            "",
            "O único problema aqui é que há muita reordenação ocorrendo, o que pode introduzir conflitos de rebase. Vamos dar uma olhada em outro método, usando o `git cherry-pick`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Lembre-se que o git cherry-pick copiará um commit de qualquer lugar na árvore sob o HEAD (desde que esse commit não seja um ancestral do HEAD).",
            "",
            "Aqui está uma demonstração para refrescar sua memória:"
          ],
          "afterMarkdowns": [
            "Ótimo! Vamos em frente"
          ],
          "command": "git cherry-pick C2",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Então, neste nível, vamos alcançar o mesmo objetivo de fazer \"amend\" no `C2`, mas evitaremos usar o `rebase -i`. Agora vou deixar com você a tarefa de descobrir como fazer! :D",
            "",
            "Lembre-se, o número exato de apóstrofos (') nos commits não é importante, apenas as diferenças relativas. Por exemplo, darei todos os pontos nesta tarefa se você obtiver o mesmo resultado da árvore da visualização de objetivo com um apóstrofo extra em todos os commits"
          ]
        }
      }
    ]
  },
  "tags-name": "Tags no Git",
  "tags-hint": "Você pode fazer checkout diretamente no commit ou na tag correspondente!",
  "tags-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Tags no Git",
            "",
            "Como você aprendeu nas lições anteriores, ramos são fáceis de mover e geralmente vão se referindo a diferentes commits conforme você vai trabalhando no código. Ramos são facilmente mutáveis, frequentemente temporários, e estão sempre mudando.",
            "",
            "Se este é o caso, você pode estar se perguntando se não existe uma forma de marcar *permanentemente* pontos históricos do projeto. Para coisas como grandes releases ou grandes merges, existe alguma forma de marcar commits com algo mais permanente que um ramo?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Você acertou a aposta, existe sim! As tags do Git foram criadas exatamente para esse caso de uso -- elas marcam de forma (relativamente) permanente certos commits como se fossem \"pedras de kilometragem\" (\"milestones\") em uma estrada, e você pode referenciá-las exatamente como faz com ramos.",
            "",
            "O mais importante, no entanto, é que elas nunca se movem sozinhas quando novos commits são criados. Você pode fazer \"checkout\" em uma tag e então completar trabalho nessa tag -- tags existem como âncoras na árvore de commits que estão atreladas a certos pontos.",
            "",
            "Vejamos como as tags se comportam na prática."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Criemos uma tag em `C1`, que é nosso protótipo da versão 1"
          ],
          "afterMarkdowns": [
            "Aqui! Bem fácil. Nós chamamos a tag de `v1` e referenciamos o commit `C1` explicitamente. Se você chamar o comando sem especificar um commit, o git vai usar seja lá qual commit para o qual o `HEAD` estiver apontando"
          ],
          "command": "git tag v1 C1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar esta tarefa, simplesmente crie as tags mostradas na visualização do objetivo, e então faça checkout em `v1`. Veja que você vai para o estado \"Detached HEAD\" -- isso é devido ao fato de que você não pode commitar diretamente na tag `v1`.",
            "",
            "No próximo nível, examinaremos mais um caso de uso interessante para as tags."
          ]
        }
      }
    ]
  },
  "cherry-pick-name": "Introdução ao cherry-pick",
  "cherry-pick-hint": "git cherry-pick seguido dos nomes dos commits",
  "cherry-pick-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Movendo trabalho por aí",
            "",
            "Por enquanto nós abordamos o básico do Git -- commitar, criar ramos, e mover-se pela árvore. Apenas esses conceitos já são suficientes para utilizar 90% do poder dos repositórios Git, e cobrem as principais necessidades dos desenvolvedores.",
            "",
            "Os 10% restantes, entretanto, podem ser extremamente úteis em fluxos de trabalho complexos (ou quando você estiver em uma enrascada). O próximo conceito que vamos abordar é \"movendo trabalho por aí\" -- em outras palavras, veremos as formas como o desenvolvedor pode dizer \"eu quero este trabalho aqui, e aquele ali\" de formas precisas, eloquentes e flexíveis.",
            "",
            "Isso pode parecer muito, mas os conceitos são simples."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Cherry-pick",
            "",
            "O primeiro comando desta série é o `git cherry-pick`. Ele é chamado da seguinte forma:",
            "",
            "* `git cherry-pick <Commit1> <Commit2> <...>`",
            "",
            "Trata-se de uma forma bastante direta de dizer que você gostaria de copiar uma série de commits abaixo do seu local atual (`HEAD`). Eu pessoalmente amo o  `cherry-pick` porque há muito pouca mágica envolvida e é fácil de entender o funcionamento.",
            "",
            "Vejamos uma demonstração!",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Aqui está um repositório onde temos algum trabalho no ramo `side` que desejamos copiar para o `master`. Isso poderia ser obtido por meio de um rebase (que já aprendemos), mas vamos ver como o cherry-pick se sai."
          ],
          "afterMarkdowns": [
            "É isso! Queríamos os commits `C2` e `C4` e o git os inseriu logo abaixo de nós. Simples assim!"
          ],
          "command": "git cherry-pick C2 C4",
          "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nível, simplesmente copie algum trabalho dos outros três ramos para o master. Você pode ver quais commits queremos copiar na visualização do objetivo.",
            ""
          ]
        }
      }
    ]
  },
  "detached-head-name": "Solte a sua cabeça",
  "detached-head-hint": "Use o identificador (hash) sobre o commit para te ajudar!",
  "detached-head-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Movendo-se no Git",
            "",
            "Antes de seguirmos para algumas funcionalidades mais avançadas do Git, é importante entender as diferentes formas de se mover através da árvore de commits que representa o seu projeto.",
            "",
            "Uma vez que você estiver confortável em se mover ao redor, seus poderes utilizando outros comandos do Git serão amplificados!",
            "",
            "",
            "",
            "",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## HEAD",
            "",
            "Primeiro temos que conversar sobre a \"cabeça\" (\"HEAD\"). HEAD é um nome simbólico para o commit atualmente ativo (que sofreu checkout por último) -- é essencialmente o commit sobre o qual você está trabalhando no momento.",
            "",
            "O HEAD sempre aponta para o commit mais recentemente copiado sobre a árvore de trabalho (arquivos do projeto). A maioria dos comandos do git que realizam mudanças sobre a árvore de trabalho começarão mudando o HEAD.",
            "",
            "Normalmente o HEAD aponta para o nome de um ramo (por exemplo, bugFix). Quando você commita, o status do bugFix é alterado e essa mudança ocorre também sobre o HEAD."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vejamos isto em ação. Aqui vamos mostrar o HEAD antes e depois de um commit."
          ],
          "afterMarkdowns": [
            "Veja! O HEAD estava se escondendo ao lado do nosso `master` esse tempo todo."
          ],
          "command": "git checkout C1; git checkout master; git commit; git checkout C2",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "### Soltando a cabeça",
            "",
            "Soltar o HEAD significa anexá-lo a um commit em vez de anexá-lo a um ramo. Antes do estado solto (\"detached\"), é assim como se parece:",
            "",
            "HEAD -> master -> C1",
            ""
          ],
          "afterMarkdowns": [
            "E agora é",
            "",
            "HEAD -> C1"
          ],
          "command": "git checkout C1",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nível, vamos soltar o HEAD do `bugFix` e em vez disso anexá-lo ao commit.",
            "",
            "Especifique o commit por meio do hash correspondente. O hash de cada commit é mostrado dentro do círculo que representa o commit (a letra C seguida de um número)."
          ]
        }
      }
    ]
  },
  "interactive-rebase-name": "Introdução ao rebase interativo",
  "interactive-rebase-hint": "Você pode usar ou ramos ou referências relativas (HEAD~) para especificar o alvo do rebase",
  "interactive-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Rebase Interativo do Git",
            "",
            "O cherry-pick é ótimo quando você sabe de antemão quais commits você quer (_e_ você sabe os hashes correspondentes) -- é difícil bater a simplicidade que ele oferece.",
            "",
            "Mas e quando você não sabe quais commits você quer? Felizmente o git pode te ajudar nesta situação também! Podemos usar o rebase interativo para isso -- trata-se da melhor forma de rever uma série de commits sobre os quais você está prestes a fazer um rebase.",
            "",
            "Mergulhemos nos detalhes..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "O rebase interativo é simplesmente o comando `rebase` com a opção `-i`.",
            "",
            "Se você incluir essa opção, o git abrirá uma interface para mostrar quais commits estão prestes a serem copiados abaixo do alvo do rebase. Ele também mostra os hashes e as mensagens dos commits, o que é ótimo para ter noção do que é o que.",
            "",
            "No git \"de verdade\", a interface nada mais é que um arquivo aberto em um editor de texto (por exemplo o `vim`). Para os nossos propósitos, eu montei uma pequena janela que se comporta da mesma forma."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Quando a janela de rebase interativo abrir, você pode fazer 3 coisas diferentes:",
            "",
            "* Você pode reordenar os commits simplesmente mudando sua ordem na interface (na nossa janela isso significa arrastar e soltar com o mouse).",
            "* Você pode escolher simplesmente omitir alguns commits. Para isso, clique no botão `pick` -- deixar o `pick` desligado significa que você quer descartar o commit.",
            "* Por fim, você pode \"esmagar\" (fazer squash) nos commits. Infelizmente, nosso tutorial não será capaz de cobrir essa funcionalidade por alguns motivos logísticos, então vamos pular os detalhes disto. Em resumo, no entanto, o squash permite que você combine commits.",
            "",
            "Ótimo! Vejamos um exemplo."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Quando você clicar o botão, uma janela de rebase interativo se abrirá. Reordene alguns commits da forma como você preferir (ou sinta-se livre para desmarcar o `pick` de alguns) e veja o resultado!"
          ],
          "afterMarkdowns": [
            "Boom! O Git copiou alguns commits exatamente da mesma forma que você os especificou na janela"
          ],
          "command": "git rebase -i HEAD~4 --aboveAll",
          "beforeCommand": "git commit; git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para finalizar este nível, faça um rebase interativo e obtenha a ordem mostrada na visualização do objetivo. Lembre-se que você pode usar os comandos `undo` ou `reset` para corrigir erros :D"
          ]
        }
      }
    ]
  },
  "relative-refs-name": "Referências relativas (^)",
  "relative-refs-hint": "Não se esqueça do operador circunflexo (^)",
  "relative-refs-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Referências relativas",
            "",
            "Mover-se pela árvore do Git especificando o hash do commit pode se tornar um pouco entediante. No mundo real, você não terá à sua disposição essa bonita visualização da árvore ao lado do seu terminal, então você terá de usar o comando `git log` para ver os hashes.",
            "",
            "Além disso, os hashes são geralmente muito maiores no mundo real. Por exemplo, o hash do commit que introduziu o nível de exercícios anterior é `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Não é algo exatamente fácil de lembrar.",
            "",
            "O que salva é que o Git é inteligente com os hashes. Ele só exige que você especifique a quantidade de caracteres do hash suficiente para identificar unicamente o commit. Então eu posso digitar apenas `fed2` em vez da grande string acima."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Como eu disse, especificar commits pelo hash não é a sempre o mais conveniente, e é por isso que o Git suporta referências relativas. Elas são fantásticas!",
            "",
            "Com referências relativas, você pode começar a partir de um ponto fácil de lembrar (como o ramo `bugFix` ou o `HEAD`) e referenciar a partir dali.",
            "",
            "Commits relativos são poderosos, mas vamos introduzir apenas dois tipos simples aqui:",
            "",
            "* Mover para cima um commit por vez com `^`",
            "* Mover para cima um número de vezes com `~<num>`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos dar uma olhada no operador circunflexo (^) primeiro. Cada vez que você adicioná-lo a um nome de referência, você está dizendo ao Git para encontrar o pai do commit especificado.",
            "",
            "Então, dizer `master^` é equivalente a \"o primeiro pai do `master`\".",
            "",
            "`master^^` é o avô (ancestral de segunda geração) do `master`",
            "",
            "Vamos fazer checkout do commit logo acima do master"
          ],
          "afterMarkdowns": [
            "Boom! Pronto. Muito mais fácil que digitar o hash do commit"
          ],
          "command": "git checkout master^",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Você também pode usar o `HEAD` como parte de uma referência relativa. Vamos usar isso para nos mover para cima algumas vezes na árvore de commits"
          ],
          "afterMarkdowns": [
            "Fácil! Podemos viajar para trás no tempo com `HEAD^`"
          ],
          "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
          "beforeCommand": "git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar esse nível, faça checkout do commit pai de `bugFix`. Isso soltará o `HEAD`.",
            "",
            "Você pode especificar o hash se quiser, mas tente usar referências relativas em vez disso!"
          ]
        }
      }
    ]
  },
  "relative-refs2-name": "Referências relativas #2 (~)",
  "relative-refs2-hint": "Você precisará usar pelo menos uma referência direta (hash) para completar este nível",
  "relative-refs2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### O operador \"~\"",
            "",
            "Digamos que você queira se mover vários níveis para cima na árvore de commits. Pode ser entediante digitar `^` várias vezes, e por isso o Git possui também o operador til (`~`).",
            "",
            "",
            "Um número pode ser passado (opcionalmente) após o operador til, especificando o número de ancestrais que você deseja subir. Vamos vê-lo em ação"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos especificar um número de commits para trás com `~`."
          ],
          "afterMarkdowns": [
            "Boom! Tão conciso -- referências relativas são incríveis."
          ],
          "command": "git checkout HEAD~4",
          "beforeCommand": "git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Forçando os ramos",
            "",
            "Agora que você é um especialista em referências relativas, vamos *usá-las* de fato para alguma coisa.",
            "",
            "Uma das situações mais comuns na qual eu uso referências relativas é quando quero trocar ramos de lugar. Você pode redefinir diretamente o commit para o qual um ramo aponta com a opção `-f`. Desta forma, o seguinte comando:",
            "",
            "`git branch -f master HEAD~3`",
            "",
            "Move (à força) o ramo master 3 ancestrais acima do HEAD."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vejamos o comando anterior em ação"
          ],
          "afterMarkdowns": [
            "Aqui vamos nós! As referências relativas nos deram uma forma concisa de nos referirmos ao `C1`, e a movimentação de ramos (com `-f`) nos deu uma forma de apontar rapidamente um ramo para esse local"
          ],
          "command": "git branch -f master HEAD~3",
          "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Agora que você viu referências relativas e movimentação de ramos combinadas, vamos usá-las para resolver o próximo nível.",
            "",
            "Para completar este nível, mova o `HEAD` e os ramos `master` e `bugFix` para os destinos mostrados no objetivo."
          ]
        }
      }
    ]
  },
  "reversing-changes-name": "Revertendo mudanças no Git",
  "reversing-changes-hint": "Lembre que revert e reset recebem parâmetros diferentes",
  "reversing-changes-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Revertendo Mudanças no Git",
            "",
            "Existem várias maneiras de reverter mudanças no Git. E assim como o ato de commitar, reverter mudanças no Git também tem um componente de baixo nível (a preparação, ou staging, de arquivos ou trechos de arquivos individuais) e um componente de alto nível (como as mudanças são, de fato, revertidas). Aqui vamos focar neste último ponto.",
            "",
            "Há duas maneiras principais de desfazer mudanças no Git -- uma delas é usando `git reset`, e a outra é usando `git revert`. Vamos olhar cada uma delas na próxima janela",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "## Git Reset",
            "",
            "O comando `git reset` reverte mudanças movendo para trás no tempo (para um commit mais antigo) a referência do ramo. Desta forma, você pode pensar nessa operação como uma \"reescrita do histórico\"; o `git reset` vai mover o ramo para trás como se o commit nunca tivesse existido.",
            "",
            "Vejamos como funciona:"
          ],
          "afterMarkdowns": [
            "Legal! O Git simplesmente moveu a referência do ramo master de volta para `C1`; agora o nosso repositório local está em um estado como se o `C2` nunca tivesse acontecido"
          ],
          "command": "git reset HEAD~1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "## Git Revert",
            "",
            "Embora o reset funcione muito bem em ramos locais no seu próprio computador, o método utilizado de \"reescrever o histórico\" não funciona com ramos remotos que outras pessoas estejam usando.",
            "",
            "Para reverter mudanças e conseguir *compartilhar* essas mudanças com os outros, precisamos usar o `git revert`. Vejamo-lo em ação"
          ],
          "afterMarkdowns": [
            "Estranho, um novo commit surgiu abaixo do commit que queríamos reverter. Isso é porque o novo commit `C2'` introduz *mudanças* -- acontece que as mudanças que ele introduz revertem exatamente aquelas do commit `C2`.",
            "",
            "Com o `revert`, você pode fazer `push` das suas mudanças para compartilhá-las com os outros."
          ],
          "command": "git revert HEAD",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nível, reverta os dois commits mais recentes tanto em `local` como em `pushed`.",
            "",
            "Tenha em mente que `pushed` é um ramo remoto, e `local` é um ramo local -- isso deve ajudá-lo a escolher o método apropriado."
          ]
        }
      }
    ]
  },
  "many-rebases-name": "Fazendo mais de 9000 rebases",
  "many-rebases-hint": "Lembre-se, a forma mais eficiente pode ser atualizar o master por último...",
  "many-rebases-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Fazendo rebase em múltiplos ramos",
            "",
            "Cara, temos um monte de ramos aqui! Vamos fazer um rebase de todo o trabalho contido nesses ramos para o master.",
            "",
            "No entanto, a cúpula da administração está tornando as coisas mais difíceis -- eles querem que os commits estejam todos em ordem sequencial. Isso significa que a nossa árvore final precisa ter o `C7'` por último, `C6'` acima disso, e assim por diante, tudo ordenado.",
            "",
            "Se você fizer besteira, sinta-se livre para usar o comando `reset` para recomeçar do zero. Depois lembre de olhar nossa solução do gabarito para ver se consegue resolver a tarefa usando menos comandos!"
          ]
        }
      }
    ]
  },
  "selective-rebase-name": "Espaguete de ramos",
  "selective-rebase-hint": "Certifique-se de fazer tudo na ordem correta! Crie o ramo `one` primeiro, depois `two`, depois `three`.",
  "selective-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Espaguete de ramos",
            "",
            "Uhuuuuu Nelly! Temos um belo de um objetivo para alcançar neste nível.",
            "",
            "Temos aqui um `master` que está alguns commits atrás dos ramos `one`, `two` e `three`. Seja lá por qual razão, precisamos atualizar esses três outros ramos com versões modificadas dos últimos commits do master.",
            "",
            "O ramo `one` precisa de uma reordenação e da exclusão do `C5`. O `two` precisa apenas de reordenação. O `three` precisa de um único commit!",
            "",
            "Vamos deixar você descobrir como resolver esta tarefa -- mas não deixe de ver a nossa solução depois com o comando `show solution`. "
          ]
        }
      }
    ]
  },
  "clone-name": "Introdução à clonagem",
  "clone-hint": "Basta fazer um git clone!",
  "clone-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Remotos no Git",
            "",
            "Repositórios remotos não são algo muito complicado. Nos dias atuais de computação em nuvem, seria fácil pensar que existiria muita mágica por trás dos remotos do Git, mas não é o caso -- eles são na verdade apenas cópias do seu repositório em outro computador. Você pode geralmente comunicar-se com esse outro computador por meio da Internet, o que permite que você transfira commits de um lado para o outro.",
            "",
            "Tendo dito isto, repositórios remotos tem uma série de propriedades interessantes:",
            "",
            "- Primeiro e antes de tudo, repositórios remotos servem como um ótimo backup! Repositórios Git locais possuem a habilidade de restaurar um arquivo para um estado anterior (como você sabe), mas toda a informação está guardada localmente. Tendo cópias do seu repositório Git em outros computadores, mesmo se você perder todos os seus dados locais, ainda terá como recomeçar do mesmo ponto de onde você tinha parado.",
            "",
            "- Ainda mais importante, repositórios remotos tornam o desenvolvimento uma atividade social! Agora que uma cópia do seu projeto está hospedada em outro lugar, seus amigos podem contribuir para o seu projeto (ou obter as suas últimas alterações) de uma forma bastante simples.",
            "",
            "Está se tornando bastante popular o uso de websites para visualizar a atividade em repositórios (como o [Github](https://github.com/) ou o [Phabricator](http://phabricator.org/)), mas o recurso de repositórios remotos _sempre_ serve como mecanismo base para essas ferramentas. Então é importante entender como ele funciona!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Nosso comando para criar remotos",
            "",
            "Até este ponto, o Learn Git Branching focou em ensinar o básico a respeito de trabalho em repositórios _locais_ (branch, merge, rebase, etc). Entretanto, agora que queremos aprender como repositórios remotos funcionam, precisamos de um comando para configurar o ambiente para essas lições. Esse comando será o `git clone`.",
            "",
            "Tecnicamente, o `git clone` do mundo real é um comando que se usa para criar cópias _locais_  de repositório remotos (do GitHub para o seu computador, por exemplo). Todavia, por motivos logísticos, nós usaremos esse comando de uma forma um pouco diferente no Learn Git Branching -- aqui o `git clone` criará um repositório remoto a partir do repositório local. Certamente, esse comportamento é exatamente o oposto do comando real, mas apesar disso ele ajuda a formar a conexão mental entre a clonagem e a forma como repositórios remotos funcionam, então vamos usá-lo dessa forma mesmo por enquanto.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos começar devagar e apenas olhar como um repositório remoto se parece na nossa visualização.",
            ""
          ],
          "afterMarkdowns": [
            "Aqui está ele! Agora temos um repositório remoto do nosso projeto. Ele é muito parecido exceto por algumas mudanças visuais para tornar a distinção factível -- nas tarefas a seguir veremos como compartilhar trabalho entre esses repositórios."
          ],
          "command": "git clone",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nível, simplesmente chame o comando `git clone`. Você aprenderá algo de verdade somente nas próximas lições."
          ]
        }
      }
    ]
  },
  "fake-teamwork-name": "Simulando trabalho em equipe",
  "fake-teamwork-hint": "Lembre-se que você pode especificar quantos commits quer simular",
  "fake-teamwork-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Simulando colaboração",
            "",
            "Neste ponto, temos uma pequena dificuldade -- para algumas das lições a seguir, precisaremos ensinar como fazer pull de mudanças que foram introduzidas no repositório remoto.",
            "",
            "Isso significa que precisaremos essencialmente \"fingir\" que o repositório remoto foi atualizado por algum de seus colegas / amigos / colaboradores, algumas vezes em um ramo específico ou com um certo número de commits.",
            "",
            "Para esta finalidade, criamos o comando fictício `git fakeTeamwork`! Ele é bastante auto-explicativo, vejamos uma demonstração..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "O comportamento padrão do `fakeTeamwork` é simplesmente fazer aparecer um commit no master"
          ],
          "afterMarkdowns": [
            "Aqui vamos nos -- o repositório remoto foi atualizado com um novo commit, e ainda não baixamos esse commit porque não executamos um `git fetch`."
          ],
          "command": "git fakeTeamwork",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Você também pode especificar o número de commits ou o ramo, anexando-os ao comando"
          ],
          "afterMarkdowns": [
            "Com um único comando, nós simulamos um colega enviando 3 commits para o ramo `foo` do repositório remoto"
          ],
          "command": "git fakeTeamwork foo 3",
          "beforeCommand": "git branch foo; git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Os níveis posteriores serão mais difíceis, então estamos pedindo um pouco mais de você neste nível.",
            "",
            "Vá em frente e crie um repositório remoto (chamando `git clone`), simule algumas mudanças no repositório remoto, commite no repositório local, e então faça um pull das mudanças que haviam sido simuladas. É como se fossem várias lições em uma só!"
          ]
        }
      }
    ]
  },
  "fetch-name": "Git Fetch",
  "fetch-hint": "Simplesmente chame git fetch!",
  "fetch-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Fetch",
            "",
            "Trabalhar com remotos no Git, no final das contas, se resume a transferir dados _de_ e _para_ outros repositórios. Desde que possamos enviar commits para um lado e para o outro, poderemos compartilhar qualquer tipo de atualização que seja gerenciada pelo Git (e portanto compartilhar trabalho, novos arquivos, novas ideias, cartas de amor, etc).",
            "",
            "Nesta lição vamos aprender como baixar dados _de_ um repositório remoto -- o comando para isso é convenientemente chamado de `git fetch`.",
            "",
            "Você perceberá que conforme atualizarmos a representação do repositório remoto, nossos ramos _remotos_ atualizar-se-ão para refletir essa nova representação. Isso tem a ver com o que vimos na lição anterior sobre ramos remotos"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Antes de entrar nos detalhes do `git fetch`, vejamo-no em ação! Aqui temos um repositório remoto que contém dois commits que nosso repositório local não possui."
          ],
          "afterMarkdowns": [
            "Lá vamos nós! Os commits `C2` e `C3` foram baixados para o nosso repositório local, e nosso ramo remoto `o/master` foi atualizado para refletir esse fato."
          ],
          "command": "git fetch",
          "beforeCommand": "git clone; git fakeTeamwork 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### O que o fetch faz",
            "",
            "O `git fetch` realiza dois passos principais, e somente estes dois passos principais. Ele:",
            "",
            "* Baixa os commits que o repositório remoto possui mas que estão faltando no repositório local, e...",
            "* Atualiza a referência para a qual os ramos remotos (por exemplo, `o/master`) estão apontando",
            "",
            "O `git fetch` essencialmente faz com que nossa representação _local_ do repositório remoto fique sincronizada com a forma com que o repositório remoto _de fato_ se parece (naquele momento).",
            "",
            "Se você lembrar da lição anterior, nós dissemos que os ramos remotos refletem o estado dos repositórios remotos _desde a última vez_ na qual você falou com esses repositórios. O `git fetch` é a única forma de falar com esses repositórios remotos! Espero que a conexão entre os ramos remotos e o `git fetch` esteja clara agora.",
            "",
            "O `git fetch` geralmente conversa com o repositório remoto por meio da Internet (usando um protocolo como `http://` ou `git://`).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### O que o fetch NÃO faz",
            "",
            "O `git fetch`, no entanto, não muda nada do estado _local_ do repositório. Ele não atualiza o seu ramo `master` nem muda nada na forma como o seu sistema de arquivos está no momento.",
            "",
            "É importante entender isso, pois muitos desenvolvedores pensam que executar `git fetch` fará com que o trabalho local reflita o estado do repositório remoto. Ele pode até baixar todos os dados necessários para fazê-lo, mas ele _não_ muda de fato nenhum dos arquivos locais. Vamos aprender comandos para fazê-lo nas lições a seguir :D",
            "",
            "No final das contas, você pode pensar no `git fetch` como um passo de download."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para terminar este nível, simplesmente execute `git fetch` e baixe todos os commits!"
          ]
        }
      }
    ]
  },
  "fetch-args-name": "Parâmetros do fetch",
  "fetch-args-hint": "Preste atenção em como os identificadores dos commits podem ter trocado! Você pode ler os slides novamente com \"help level\"",
  "fetch-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Parâmetros do git fetch",
            "",
            "Então acabamos de aprender tudo sobre os parâmetros do git push, inclusive sobre esse parâmetro bacana chamado `<lugar>`, e até mesmo sobre colon refspecs (`<origem>:<destino>`). Será que poderíamos aplicar todo esse conhecimento também ao `git fetch`?",
            "",
            "Você adivinhou! Os parâmetros do `git fetch` são na verdade *muito, muito* similares aos do `git push`. Trata-se do mesmo tipo de conceito, só que aplicado na direção oposta (já que agora é um download em vez de um upload).",
            "",
            "Vamos aos conceitos um por vez..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### O parâmetro `<lugar>`",
            "",
            "Se você passar um lugar ao git fetch, como no seguinte comando:",
            "",
            "`git fetch origin foo`",
            "",
            "O Git vai ao ramo remoto `foo` e pega todos os commits que não estão presentes localmente, jogando-os no ramo local `o/foo`.",
            "",
            "Vejamo-lo em ação (só para refrescar a memória)."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Especificando um lugar..."
          ],
          "afterMarkdowns": [
            "Baixamos só os commits de `foo` e colocamos em `o/foo`"
          ],
          "command": "git fetch origin foo",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Você pode estar se perguntando -- por que o Git colocou os commits no ramo remoto `o/foo` em vez de simplesmente jogá-los no meu ramo local `foo`? Eu pensei que o parâmetro fosse um `<lugar>` que existisse tanto no repositório local como no remoto?",
            "",
            "Bem, o Git tem uma exceção especial neste caso, porque pode ser que exista trabalho seu no ramo local `foo` que você não queira bagunçar!! Esse fato é relacionado com o abordado na lição anterior sobre o `git fetch` -- ele não atualiza ramos locais não-remotos, ele apenas baixa os commits (de forma que você possa inspecioná-los e/ou realizar um merge posteriormente).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "\"Bem, neste caso, o que acontece se eu definir explicitamente tanto a origem como o destino, com `<origem>:<destino>`?\"",
            "",
            "Se você estiver apaixonado o suficiente para baixar commits *diretamente* em um ramo local, então sim, você pode especificar esse comportamento com um colon refspec. Você só não pode baixar commits em um ramo que esteja atualmente em checkout, mas se não estiver, o Git permitirá o fetch.",
            "",
            "Aqui está o único detalhe -- `<origem>` agora é uma referência *remota* e `<destino>` é uma referência *local* de onde colocar esses commits. É exatamente o oposto do git push, e realmente faz sentido, já que estamos transferindo os dados na direção oposta!",
            "",
            "Tendo dito isto, desenvolvedores raramente fazem isso na prática. Estou introduzindo essa informação mais como uma forma de conceitualizar a forma como `fetch` e `push` são tão similares, apenas em direções opostas."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vejamos essa loucura em ação:"
          ],
          "afterMarkdowns": [
            "Wow! Viu, o Git entendeu o `foo~1` como um lugar de origin e baixou os commits para o ramo local `bar`. Veja como `foo` e `o/foo` não foram atualizados, já que especificamos outro destino."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "E se o destino não existir antes de eu executar o comando? Vamos rever o último slide, mas em uma situação na qual o `bar` não existe de antemão."
          ],
          "afterMarkdowns": [
            "Viu? Funciona EXATAMENTE como o git push. O Git criou o destino localmente antes do fetch, da mesma forma como o Git cria o destino (se ele não existir) no repositório remoto durante um push."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Sem parâmetros?",
            "",
            "Se o `git fetch` não receber argumentos, ele simplesmente baixa todos os commits do repositório remoto em todos os ramos remotos..."
          ],
          "afterMarkdowns": [
            "Bastante simples, mas importante de rever ao menos uma vez."
          ],
          "command": "git fetch",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, chega de conversa! Para completar este nível, faça fetch apenas dos commits especificados na visualização do objetivo. Capriche nos comandos!",
            "",
            "Você terá de especificar tanto a origem como o destino em ambos os comandos de fetch. Preste atenção na janela de visualização, já que os identificadores podem trocar!"
          ]
        }
      }
    ]
  },
  "fetch-rebase-name": "Histórico divergente",
  "fetch-rebase-hint": "Preste atenção na ordem da visualização do objetivo",
  "fetch-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Histórico Divergente",
            "",
            "Até o momento vimos como fazer `pull` de commits dos outros e como fazer `push` de nossas próprias mudanças. Parece ser tão simples, como será que as pessoas ficam tão confusas?",
            "",
            "A dificuldade aparece quando o histórico do repositório *diverge*. Antes de discutir os detalhes disso, vejamos um exemplo...",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Imagine que você clonou um repositório na segunda-feira e começou a trabalhar em uma funcionalidade nova. Na sexta-feira você está pronto para publicar a funcionalidade -- mas, ah não! Seus colegas escreveram um bocado de código durante a semana, tornando a sua funcionalidade obsoleta. Eles também publicaram esses commits no repositório remoto que vocês compartilham, então agora o *seu* trabalho é baseado em uma versão *antiga* do projeto, que não é mais relevante.",
            "",
            "Neste caso, o comando `git push` é ambíguo. Se você executar `git push`, será que o Git deveria tratar o repositório remoto como se ele ainda estivesse no estado da segunda-feira? Será que ele deveria tentar adicionar seu código dentro do repositório sem tentar remover o código novo? Ou será que ele deveria simplesmente ignorar suas mudanças totalmente, já que elas estão obsoletas?",
            "",
            "Devido à grande ambiguidade que surge neste tipo de situação (quando a história divergiu), o Git não permite que você faça `push` das suas mudanças. Ele, de fato, força você a incorporar o último estado do repositório remoto antes de conseguir compartilhar o seu trabalho."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Chega de conversa! Vejamos essa situação na prática"
          ],
          "afterMarkdowns": [
            "Viu? Nada aconteceu porque o comando falhou. O `git push` falha porque o commit mais recente (`C3`) é baseado no remoto em `C1`. Como o remoto foi atualizado no meio tempo, o Git rejeita o push"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Como resolver essa situação? É fácil, tudo que você precisa fazer é basear seu trabalho na versão mais recente do ramo remoto.",
            "",
            "Existem algumas maneiras de fazer isso, mas a mais direta é mover o seu trabalho usando rebase. Vamos em frente, ver como isso é feito."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Agora se nós fizermos um rebase antes do push..."
          ],
          "afterMarkdowns": [
            "Boom! Nós atualizamos a representação local do repositório remoto com `git fetch`, fizemos rebase do nosso trabalho para refletir as novas mudanças no repositório remoto, e então enviamos nossas mudanças com `git push`"
          ],
          "command": "git fetch; git rebase o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Será que existem outras formas de compartilhar meu trabalho quando o repositório remoto tiver sido atualizado? Claro! Vamos fazer a mesma tarefa usando `merge` em vez de `rebase`.",
            "",
            "Embora o `git merge` não mova o seu trabalho (em vez disso, ele cria um commit de merge), ele é uma forma de contar ao Git que você incorporou todas as mudanças do repositório remoto. Isso acontece porque o ramo remoto passa a ser um *ancestral* do seu próprio ramo, significando que o seu commit reflete todos os commits contidos no ramo remoto.",
            "",
            "Vejamos uma demonstração..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Agora se fizermos merge em vez de rebase ..."
          ],
          "afterMarkdowns": [
            "Boom! Atualizamos nossa representação local do repositório remoto com `git fetch`, fizemos *merge* do novo trabalho com o nosso (para refletir as novas mudanças no repositório remoto), e então fizemos push deles com `git push`"
          ],
          "command": "git fetch; git merge o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Incrível! Existe alguma forma de fazer isso sem digitar tantos comandos?",
            "",
            "É claro -- você já conhece o `git pull` e ele é simplesmente um atalho para um fetch e um merge. Convenientemente, entretanto, o comando `git pull --rebase` é uma abreviação para um fetch e um rebase!",
            "",
            "Vejamos esses dois comandos em ação."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Primeiro com `--rebase`..."
          ],
          "afterMarkdowns": [
            "Mesma coisa que antes! Porém muito mais curto."
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "E agora com o `pull` normal"
          ],
          "afterMarkdowns": [
            "De novo, exatamente como antes!"
          ],
          "command": "git pull; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Esse fluxo de trabalho de fazer fetch, rebase/merge, e push é bastante comum. Em lições futuras vamos examinar versões mais complicadas desses fluxos de trabalho, mas por enquanto vamos tentar o seguinte.",
            "",
            "Para resolver este nível, faça o seguinte:",
            "",
            "* Clone o repositório",
            "* Simule trabalho de seus colegas (1 commit)",
            "* Faça um commit seu (1 commit)",
            "* Publique seu trabalho usando *rebase*"
          ]
        }
      }
    ]
  },
  "merge-many-features-name": "Merge com remotos",
  "merge-many-features-hint": "Preste atenção na árvore do objetivo!",
  "merge-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Por que não um merge?",
            "",
            "Para enviar novas atualizações ao repositório remoto, tudo que você precisa é *incorporar* as últimas mudanças ali presentes. Isso significa que você pode tanto fazer um rebase *quanto* um merge no ramo remoto (ex. `o/master`).",
            "",
            "Então, se você pode escolher qualquer um desses métodos, por que as lições focaram no rebase até o momento? Por que não demos nenhum amor ao `merge` quando trabalhamos com repositórios remotos?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Há muito debate na comunidade de desenvolvedores sobre as vantagens e desvantagens do merge e do rebase. Aqui estão os prós e contras gerais do rebase:",
            "",
            "Prós:",
            "",
            "* O rebase faz a sua árvore de commits parecer bastante limpa, já que tudo fica em uma linha reta",
            "",
            "Contras:",
            "",
            "* O rebase modifica o histórico *aparente* da sua árvore de commits.",
            "",
            "Por exemplo, o commit `C1` pode aparecer *depois do* `C3` após sofrer rebase. Então, fica parecendo que alguém trabalhou em `C1` apenas depois de `C3` estar completo, quando na realidade o que ocorreu foi o contrário.",
            "",
            "Alguns desenvolvedores adoram preservar o histórico e, portanto, preferem o merge. Outros (como eu) preferem ter uma árvore de commits limpa, obtida usando rebase. Tudo se resume ao gosto pessoal :D"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para este nível, tente resolver o mesmo problema do nível anterior, mas usando *merge* em vez de rebase. A árvore pode ficar um pouco cabeluda, mas isso ilustra bem o nosso ponto."
          ]
        }
      }
    ]
  },
  "pull-name": "Git Pull",
  "pull-hint": "Basta executar git pull!",
  "pull-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Pull",
            "",
            "Agora que vimos como baixar dados de um repositório remoto com `git fetch`, vamos atualizar nosso trabalho para refletir essas mudanças!",
            "",
            "Há, na verdade, muitas formas de fazê-lo -- uma vez que você tenha os novos commits disponíveis localmente, você pode incorporá-los como se eles fossem commits normais em outros ramos. Isso significa que você pode executar comandos como estes a seguir:",
            "",
            "* `git cherry-pick o/master`",
            "* `git rebase o/master`",
            "* `git merge o/master`",
            "* etc., etc.",
            "",
            "O fluxo de trabalho de executar *fetch* para baixar as mudanças remotas e depois fazer um *merge* delas é tão comum que o Git na verdade fornece um comando que faz ambas as coisas de uma vez só! Esse comando é o `git pull`."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos primeiro ver um `fetch` e um `merge` executados sequencialmente"
          ],
          "afterMarkdowns": [
            "Boom -- nós baixamos o `C3` com um `fetch` e então fizemos um merge desse trabalho usando `git merge o/master`. Agora o nosso ramo `master` reflete o trabalho realizado no repositório remoto (neste caso, chamado de `origin`)"
          ],
          "command": "git fetch; git merge o/master",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "O que iria acontecer se, em vez disso, usássemos `git pull`?"
          ],
          "afterMarkdowns": [
            "Exatamente o mesmo! Isso deve tornar bem claro que `git pull` é essencialmente um caminho mais curto para executar um `git fetch` seguido de um merge de seja já qual ramo tiver sido baixado."
          ],
          "command": "git pull",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Vamos explorar os detalhes do `git pull` mais tarde (incluindo opções e parâmetros), mas por enquanto, experimente usá-lo em sua forma mais básica.",
            "",
            "Lembre-se -- você também poderia resolver este nível com um `fetch` e um `merge`, mas isso lhe custaria um comando a mais :P"
          ]
        }
      }
    ]
  },
  "pull-args-name": "Parâmetros do pull",
  "pull-args-hint": "Lembre-se que você pode criar novos ramos locais com parâmetros de fetch/pull",
  "pull-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Parâmetros do git pull",
            "",
            "Agora que você sabe praticamente *tudo* que há para saber sobre parâmetros do `git fetch` e `git push`, não há praticamente nada a se abordar a respeito do  git pull :)",
            "",
            "Isso é porque o git pull no final das contas é *realmente* apenas um atalho para um fetch seguido de um merge em seja lá o que acabou de ser baixado. Você pode pensar nele como rodar o git fetch recebendo os *mesmos* argumentos, seguido de um merge no lugar *onde* esses commits foram parar.",
            "",
            "Isso se aplica mesmo no caso de argumentos loucamente complicados. Vejamos alguns exemplos:"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Aqui estão alguns comandos que são equivalente para o Git:",
            "",
            "`git pull  origin foo` é igual a:",
            "",
            "`git fetch origin foo; git merge o/foo`",
            "",
            "E...",
            "",
            "`git pull  origin bar~1:bugFix` é igual a:",
            "",
            "`git fetch origin bar~1:bugFix; git merge bugFix`",
            "",
            "Viu? O git pull é realmente um atalho para fetch + merge, e tudo com o que o git pull se importa é com onde os commits foram parar (o parâmetro de `destino` que ele descobre durante o fetch).",
            "",
            "Vejamos uma demonstração:"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Se especificarmos o lugar onde fazer o fetch, tudo acontece como antes com o fetch, mas fazemos o merge naquilo que acabou de ser baixado"
          ],
          "afterMarkdowns": [
            "Veja! Especificando `master` nós baixamos commits em `o/master` como sempre. Então fizemos um merge de `o/master` com o lugar onde estamos, *independente* daquilo que está atualmente em checkout."
          ],
          "command": "git pull origin master",
          "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Isso também funciona com origem e destino especificados? Sim, você acertou! Vejamos:"
          ],
          "afterMarkdowns": [
            "Wow, isso é MUITA coisa em um comando só. Nós criamos um novo ramo local chamado `foo`, baixamos commits do master remoto nesse ramo `foo`, e então fizemos um merge dele com o ramo atualmente em checkout, `bar`."
          ],
          "command": "git pull origin master:foo",
          "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, para terminar, obtenha o estado da visualização do objetivo. Você vai precisar baixar alguns commits, criar novos ramos, e fazer merge de ramos em outros ramos, mas não deve precisar de muitos comandos para isso :P"
          ]
        }
      }
    ]
  },
  "push-name": "Git Push",
  "push-hint": "Lembre-se de clonar antes de fazer o push!",
  "push-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Push",
            "",
            "Ok, então vimos como baixar mudanças do repositório remoto e incorporá-las à árvore local. Isso é ótimo e tal... mas como eu faço para compartilhar o _meu_ trabalho sensacional com as outras pessoas?",
            "",
            "Bem, a forma de subir trabalho a ser compartilhado é a oposta daquela de baixar trabalho que foi compartilhado. E qual o oposto de `git pull` (puxar)? É `git push` (empurrar)!",
            "",
            "O `git push` é responsável por subir as _suas_ mudanças para um repositório remoto especificado, e atualizar esse remoto para incorporar seus novos commits. Uma vez que o `git push` se completa, todos os seus amigos podem baixar o seu trabalho do repositório remoto.",
            "",
            "Você pode pensar no `git push` como um comando para \"publicar\" o seu trabalho. Ele tem uma série de nuances que vamos abordar em breve, mas comecemos com passos curtos...",
            "",
            "*Nota -- o comportamento de `git push` sem argumentos varia dependendo da configuração `push.default` do Git. O valor padrão para essa configuração depende da versão do Git que você estiver usando, mas vamos assumir o valor `upstream` nestas lições. Isso não é um grande problema, mas vale a pena verificar suas configurações antes de fazer push nos seus próprios projetos.*"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Aqui temos algumas mudanças que o repositório remoto não contém. Vamos subi-las!"
          ],
          "afterMarkdowns": [
            "Aqui vamos nós -- o repositório remoto recebeu o commit `C2`, o ramo `master` no repositório remoto foi atualizado para apontar para `C2`, e a *nossa* reflexão do remoto (`o/master`) foi atualizada também. Está tudo sincronizado!"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nível, simplesmente compartilhe dois novos commits com o repositório remoto. No entanto, segure-se no seu assento, pois estas lições estão prestes a ficar mais difíceis!"
          ]
        }
      }
    ]
  },
  "push-args-name": "Parâmetros do git push",
  "push-args-hint": "Você sempre pode rever o último slide com o comando \"objective\"",
  "push-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Parâmetros do push",
            "",
            "Ótimo! Agora que você sabe sobre remote tracking de ramos, podemos começar a revelar um pouco do mistério por trás de como o push, o fetch e o pull funcionam. Vamos lidar com um comando por vez, mas os conceitos são bastante similares.",
            "",
            "Primeiro, vamos abordar o `git push`. Você aprendeu na lição sobre remote tracking que o Git descobria o repositório remoto *e* o ramo correspondente onde fazer o push olhando nas propriedades do ramo que está atualmente em checkout (verificando o ramo remoto que ele \"segue\"). Este é o comportamento quando nenhum parâmetro é especificado, mas o git push pode opcionalmente receber parâmetros na seguinte forma:",
            "",
            "`git push <repositório remoto> <lugar>`",
            "",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Você deve estar se perguntando: o que é esse parâmetro `<lugar>`? Vamos discutir as especifidades em breve, mas vejamos primeiro um exemplo. Executar o comando:",
            "",
            "`git push origin master`",
            "",
            "pode ser traduzido para o seguinte em Português:",
            "",
            "*Vá ao ramo chamado \"master\" no meu repositório local, pegue todos os commits, então vá ao ramo \"master\" no repositório remoto chamado \"origin\". Coloque quaisquer commits que estiverem faltando nesse ramo, e então me diga quando estiver pronto.*",
            "",
            "Especificando `master` como parâmetro \"lugar\", dizemos ao Git de onde os commits *vão vir* e para onde os commits *irão*. É essencialmente o \"lugar\" onde sincronizar entre os dois repositórios.",
            "",
            "Tenha em mente que já que contamos ao Git tudo que ele precisa saber (especificando ambos os parâmetros), ele ignora totalmente o checkout atual!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vejamos um exemplo especificando os argumentos. Preste atenção no commit que sofreu checkout neste exemplo."
          ],
          "afterMarkdowns": [
            "Aqui vamos nós! O `master` foi atualizado no repositório remoto, já que especificamos os parâmetros."
          ],
          "command": "git checkout C0; git push origin master",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "E se eu não especificasse parâmetros? O que aconteceria?"
          ],
          "afterMarkdowns": [
            "O comando falha (como você pode ver), já que o `HEAD` não havia sofrido checkout para um ramo com propriedade de remote-tracking definida."
          ],
          "command": "git checkout C0; git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, neste nível vamos atualizar tanto o `foo` como o `master` no repositório remoto. Porém desabilitamos o comando `git checkout` para dificultar um pouco a tarefa!"
          ]
        }
      }
    ]
  },
  "push-args2-name": "Parâmetros do git push -- expandido",
  "push-args2-hint": "Lembre-se que você pode admitir que foi derrotado e digitar \"show solution\" :P",
  "push-args2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Detalhes sobre `<lugar>`",
            "",
            "Lembra que na lição anterior especificamos `master` como o parâmetro lugar para o git push? Lá definimos tanto a *origem* de onde os commits viriam quanto o *destino* para onde os commits foram.",
            "",
            "Você pode estar se perguntando -- e se eu quisesse que a origem e o destino fossem diferentes? E se eu quisesse enviar commits do ramo local `foo` para o ramo remoto `bar`?",
            "",
            "Bem, infelizmente isso é impossível no Git... só brincando! Claro que é possível :)... o Git tem muita flexibilidade (até mais do que deveria).",
            "",
            "Veremos como fazê-lo no próximo slide..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para especificar tanto a origem como o destino do `<lugar>`, simplesmente juntamos os dois usando dois-pontos:",
            "",
            "`git push origin <origem>:<destino>`",
            "",
            "Isso é geralmente chamado de \"colon refspec\" (especificação de referência com dois-pontos). Refspec é só um nome extravagante para um local que o Git consiga entender (como o ramo `foo` ou mesmo `HEAD~1`)",
            "",
            "Uma vez que você está especificando tanto a origem como o destino independentemente, você pode ser bastante preciso nos comandos relacionados a repositórios remotos. Vejamos uma demonstração!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Lembre-se, `origem` é qualquer lugar que o Git possa entender:"
          ],
          "afterMarkdowns": [
            "Uau! Esse comando é bastante viajado, mas ele faz sentido -- o Git entendeu a referência `foo^`, enviou quaisquer commits que não estavam presentes no repositório remoto, e então atualizou o destino."
          ],
          "command": "git push origin foo^:master",
          "beforeCommand": "git clone; go -b foo; git commit; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "E se o destino para o qual você quiser fazer push não existir? Sem problemas! Dê um nome de ramo e o Git criará o ramo no repositório remoto para você."
          ],
          "afterMarkdowns": [
            "Doce, isso é muito bom :D"
          ],
          "command": "git push origin master:newBranch",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para este nível, tente chegar ao estado do objetivo mostrado na visualização, e lembre-se do formato:",
            "",
            "`<origem>:<destino>`"
          ]
        }
      }
    ]
  },
  "push-many-features-name": "Push Master!",
  "push-many-features-hint": "Lembre-se que você sempre pode usar undo ou reset",
  "push-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Merge de ramos de funcionalidades",
            "",
            "Agora que você está confortável com fetch, pull e push, vamos colocar essas habilidades em teste com um novo fluxo de trabalho.",
            "",
            "É comum para desenvolvedores de grande projetos fazer todo o trabalho em ramos de funcionalidades (fora do `master`) e então integrar esse trabalho uma única vez quando ele estiver pronto. Isso é similar à lição anterior (onde ramos laterais eram enviados ao repositório remoto), mas introduzimos mais um passo.",
            "",
            "Alguns desenvolvedores só fazem push e pull quando no ramo `master` -- desta forma o `master` sempre se mantém atualizado com aquilo que está no ramo remoto (`o/master`).",
            "",
            "Então, para este fluxo de trabalho, combinaremos duas coisas:",
            "",
            "* Integrar ramos de funcionalidade no `master`, e",
            "* Realizar push e pull do repositório remoto"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos refrescar a memória sobre como atualizar o `master` e enviar trabalho."
          ],
          "afterMarkdowns": [
            "Nós executamos dois comandos aqui que:",
            "",
            "* Fizeram rebase de nosso trabalho nos novos commits do repositório remoto, e",
            "* Publicaram nosso trabalho no repositório remoto"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Esse nível é um pouco pesado -- aqui está a linha geral de como resolver:",
            "",
            "* Há três ramos de funcionalidades -- `side1`, `side2` e `side3`",
            "* Queremos enviar cada uma dessas funcionalidades, em ordem, para o repositório remoto",
            "* O repositório remoto foi atualizado desde então, então também precisaremos incorporar o trabalho realizado lá",
            "",
            ":O intenso! boa sorte, completar este nível é um grande passo."
          ]
        }
      }
    ]
  },
  "remote-branches-name": "Ramos remotos",
  "remote-branches-hint": "Preste atenção na ordem: commite no master primeiro!",
  "remote-branches-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Ramos Remotos no Git",
            "",
            "Agora que vimos o `git clone` em ação, vamos estudar aquilo que realmente mudou.",
            "",
            "A primeira coisa que você pode ter percebido é que um novo ramo chamado `o/master` aparece no nosso repositório local. Esse tipo de ramo é chamado de ramo _remoto_; ramos remotos possuem propriedades especiais pois eles servem a um propósito único.",
            "",
            "Ramos remotos refletem o _estado_ de repositórios remotos (desde a última vez na qual você falou com eles). Eles ajudam a entender as diferenças entre o trabalho local e o trabalho atualmente público -- um passo crítico a ser dado antes de compartilhar seu trabalho com os outros.",
            "",
            "Ramos remotos possuem a propriedade especial de, ao sofrerem um checkout, colocarem o repositório em modo \"Detached HEAD\". O Git faz isso de propósito, porque você não pode trabalhar nesses ramos diretamente; você é obrigado a trabalhar em outro lugar e só então compartilhar seu trabalho com o remoto (depois disso, os ramos remotos serão atualizados)."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### O que é `o/`?",
            "",
            "Você pode estar se perguntando o que o `o/` no início do nome dos ramos remotos significa. Bem, ramos remotos possuem uma convenção obrigatória de nomes -- eles são mostrados no seguinte formato:",
            "",
            "* `<nome do repositório remoto>/<nome do ramo>`",
            "",
            "Então, se o ramo remoto é chamado `o/master`, o nome do ramo é `master` e o nome do repositório remoto é `o`.",
            "",
            "A maioria dos desenvolvedores na verdade chama o repositório remoto principal de `origin`, e não de `o`. Isso é tão comum que o Git define por padrão o nome `origin` para o repositório remoto quando você usa o comando `git clone` para clonar um repositório.",
            "",
            "Infelizmente o nome completo `origin` não cabe na nossa tela, então usamos `o` como uma abreviação :( Apenas lembre-se que no Git de verdade, o repositório remoto provavelmente será chamado `origin` em vez de `o`!",
            "",
            "É muita informação de uma só vez, então vamos dar uma pausa e ver um pouco de ação."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vamos fazer checkout de um ramo remoto e ver o que acontece"
          ],
          "afterMarkdowns": [
            "Como você pode ver, o Git nos colocou no modo \"Detached HEAD\", e não atualizou o `o/master` quando adicionamos um novo commit. Isso é porque o `o/master` só será atualizado quando o repositório remoto for atualizado."
          ],
          "command": "git checkout o/master; git commit",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nível, commite uma vez em `master`, e outra vez depois de fazer checkout em `o/master`. Isso vai ajudá-lo a sentir como os ramos remotos se comportam de forma diferente, e como eles apenas se atualizam para refletir o estado do repositório remoto."
          ]
        }
      }
    ]
  },
  "source-nothing-name": "Origem vazia",
  "source-nothing-hint": "O comando branch está desabilitado para este nível, então você terá de usar o fetch!",
  "source-nothing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Coisas estranhas do `<origem>`",
            "",
            "O Git abusa do parâmetro `<origem>` de duas formas estranhas. Esses dois abusos vem do fato de que tecnicamente você pode especificar \"nada\" como uma `origem` válida tanto para o git push como para o git fetch. A forma como você especifica \"nada\" é por meio de um argumento vazio:",
            "",
            "* `git push origin :side`",
            "* `git fetch origin :bugFix`",
            "",
            "Vejamos o que esses comandos fazem..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "O que fazer push de \"coisa nenhuma\" para um ramo remoto significa? Deletar o ramo!"
          ],
          "afterMarkdowns": [
            "Aqui, excluímos com sucesso o ramo `foo` do repositório remoto por meio de um push de \"coisa nenhuma\" direcionado a ele. Até que faz sentido..."
          ],
          "command": "git push origin :foo",
          "beforeCommand": "git clone; git push origin master:foo"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Finalmente, fazer um fetch de \"coisa nenhuma\" para uma referência local cria um novo ramo"
          ],
          "afterMarkdowns": [
            "Bastante estranho / bizarro, mas de qualquer forma. É assim que o Git é!"
          ],
          "command": "git fetch origin :bar",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Este é um nível rápido de resolver -- basta remover um ramo remoto com `git push` e criar um novo ramo local com `git fetch` para terminar!"
          ]
        }
      }
    ]
  },
  "tracking-name": "Seguindo remotos",
  "tracking-hint": "Lembre-se que há duas formas de seguir um ramo remoto!",
  "tracking-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Seguindo ramos remotos",
            "",
            "Uma coisa que pode ter parecido \"mágica\" nas lições passadas é que o Git sabia que o ramo `master` estava relacionado com o `o/master`. Certamente esses ramos possuem nomes similares, e tem todo sentido lógico conectar o ramo `master` do lado remoto com o ramo `master` local, mas essa conexão é demonstrada claramente em dois cenários:",
            "",
            "* Durante uma operação de pull, os commits são baixados em `o/master` e então são *mergidos* no ramo `master`. O alvo do merge é determinado a partir dessa conexão.",
            "* Durante uma operação de push, o trabalho do ramo `master` local é enviado para o ramo `master` remoto (que é representado localmente por `o/master`). O *destino* do push é determinado da conexão entre `master` e `o/master`.",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Remote tracking",
            "",
            "Resumindo a história, essa conexão entre `master` e `o/master` é explicada pela propriedade de \"remote tracking\" dos ramos. O ramo `master` é configurado para seguir o ramo `o/master` -- isso significa que existe um alvo implícito de merge e um destino implícito de push para o ramo `master`.",
            "",
            "Você pode estar se perguntando como essa propriedade foi configurada no ramo `master` se você não executou nenhum comando ordenando que isso fosse feito. Bem, quando você clona um repositório com o Git, essa propriedade é configurada para você automaticamente. ",
            "",
            "Durante a clonagem, o Git cria um ramo remoto para cada ramo que existe no repositório remoto (ou seja, ramos como o `o/master`). Ele cria então um ramo local que segue o ramo atualmente ativo no repositório remoto, que geralmente é o `master`.",
            "",
            "Uma vez que a clonagem esteja completa, você terá apenas um único ramo local (para que você não seja sobrecarregado), mas você pode ver todos os ramos diferentes que existem no repositório remoto (caso você esteja curioso). É o melhor dos dois mundos!",
            "",
            "Isso também explica porque você vê a seguinte mensagem quando clona um repositório:",
            "",
            "    local branch \"master\" set to track remote branch \"o/master\""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Posso eu mesmo especificar isso?",
            "",
            "Sim, você pode! Você pode fazer com que qualquer ramo arbitrário siga o `o/master`, e se você fizer isso, esse ramo terá o mesmo destino de push implícito que e o mesmo alvo de merge que o `master`. Isso significa que você pode executar `git push` em um ramo chamado `realmenteNaoSouOMaster` e ainda assim ter seu trabalho enviado ao ramo `master` do repositório remoto!",
            "",
            "Há duas formas de configurar essa propriedade. A primeira consiste em fazer checkout de um novo ramo usando o ramo remoto como especificação de referência. Executar",
            "",
            "`git checkout -b realmenteNaoSouOMaster o/master`",
            "",
            "Cria um novo ramo chamado `realmenteNaoSouOMaster` e o configura para seguir o `o/master`."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Já foi conversa o suficiente, vamos ver uma demonstração! Vamos fazer checkout de um novo ramo chamado `foo` e configurá-lo para seguir o `master` do repositório remoto."
          ],
          "afterMarkdowns": [
            "Como você pode ver, usamos o alvo implícito de merge do `o/master` para atualizar o ramo `foo`. Veja como o master local não sofreu atualização!!"
          ],
          "command": "git checkout -b foo o/master; git pull",
          "beforeCommand": "git clone; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Isso também se aplica ao git push"
          ],
          "afterMarkdowns": [
            "Boom. Nós enviamos nosso trabalho para o ramo remoto `master` ainda que nosso ramo local tivesse um nome completamente diferente"
          ],
          "command": "git checkout -b foo o/master; git commit; git push",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Forma #2",
            "",
            "Outra maneira de configurar remote tracking em um ramo é utilizando `git branch -u`. Executando",
            "",
            "`git branch -u o/master foo`",
            "",
            "configuraremos o ramo local `foo` para seguir o `o/master`. Se `foo` for o que estiver atualmente em checkout, você pode inclusive omiti-lo:",
            "",
            "`git branch -u o/master`",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vejamos outra forma realmente rápida de configurar remote tracking..."
          ],
          "afterMarkdowns": [
            "O mesmo de antes, apenas um comando mais explícito. Doce!"
          ],
          "command": "git branch -u o/master foo; git commit; git push",
          "beforeCommand": "git clone; git checkout -b foo"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok! Para este nível, vamos fazer push no ramo remoto `master` *sem estar* em um checkout do `master` local. Vou deixar você descobrir o resto, já que isto é um curso avançado :P"
          ]
        }
      }
    ]
  },
  "sequence-intro-display": "Sequência introdutória",
  "sequence-intro-about": "Uma breve introdução à maioria dos comandos do git",
  "sequence-rampup-display": "Acelerando",
  "sequence-rampup-about": "A próxima porção de maravilhas do git. Faminto?",
  "sequence-remote-display": "Push & Pull -- repositórios remotos no Git!",
  "sequence-remote-about": "Hora de compartilhar seus 1's e 0's, crianças; programar agora é social!",
  "sequence-remote-advanced-display": "Até a origin e além -- repositórios remotos avançados!",
  "sequence-remote-advanced-about": "E você achava que ser um déspota esclarecido seria mais divertido...",
  "sequence-move-display": "Movendo trabalho por aí",
  "sequence-move-about": "Fique confortável em modificar a árvore de códigos",
  "sequence-mixed-display": "Sortidos",
  "sequence-mixed-about": "Técnicas, truques e dicas sortidas sobre Git",
  "sequence-advanced-display": "Temas avançados",
  "sequence-advanced-about": "Para os verdadeiros valentes!",
  "dialogs-confirm": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Tem certeza que quer ver a solução?",
          "",
          "Vamos lá, acredito que você consegue!"
        ]
      }
    }
  ],
  "dialogs-level-builder": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Bem-vindo ao construtor de níveis!",
          "",
          "Estes são os passos principais:",
          "",
          "  * Prepare o ambiente inicial usando comandos do Git",
          "  * Define a árvore inicial com ```define start```",
          "  * Insira a série de comandos do git que representam a solução ótima",
          "  * Defina a árvore objetivo com ```define goal```. O objetivo também determina a solução",
          "  * Opcionalmente, defina dicas com ```define hint```",
          "  * Dê um nome com ```define name```",
          "  * Opcionalmente, defina uma mensagem inicial com ```edit dialog```",
          "  * Digite o comando ```finish``` para obter seu nível em formato JSON!"
        ]
      }
    }
  ],
  "dialogs-next-level": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Bom trabalho!!",
          "",
          "Você resolveu o nível usando *{numCommands}* comandos; ",
          "nossa melhor solução usa {best}."
        ]
      }
    }
  ],
  "dialogs-sandbox": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Bem-vindo ao Learn Git Branching!",
          "",
          "Este aplicativo foi desenvolvido para ajudar os iniciantes a ",
          "aprender os poderosos conceitos por trás do branching com ",
          "o git. Esperamos que você goste deste aplicativo e talvez ",
          "até aprenda alguma coisa!",
          "",
          "# Demo!",
          "",
          "Se você ainda não viu o demo, veja aqui:",
          "",
          "[https://pcottle.github.io/learnGitBranching/?demo](https://pcottle.github.io/learnGitBranching/?demo)",
          "",
          "Farto desta mensagem? Acrescente `?NODEMO` ao endereço para se livrar dela, como no link abaixo:",
          "",
          "[https://pcottle.github.io/learnGitBranching/?NODEMO](?NODEMO)"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Comandos do git",
          "",
          "Você tem à sua disposição no sandbox uma variedade de comandos do git:",
          "",
          " * commit",
          " * branch",
          " * checkout",
          " * cherry-pick",
          " * reset",
          " * revert",
          " * rebase",
          " * merge"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Compartilhar é se importar!",
          "",
          "Compartilhe árvores com seus amigos usando `export tree` e `import tree`",
          "",
          "Tem uma grande lição para compartilhar? Tente construir um nível com `build level` ou experimente o nível de um amigo com `import level`",
          "",
          "Para ver todos os comandos, use `show commands`. Há algumas jóias como `undo` e `reset`",
          "",
          "Por hora, vamos começar com o `levels`..."
        ]
      }
    }
  ],
  "finish-dialog-finished": "Uia! Você terminou o último nível, massa!",
  "finish-dialog-next": "Você gostaria de ir para o próximo nível: *\"{nextLevel}\"*?",
  "finish-dialog-win": "Maravilha! Você fez uma solução tão boa quanto ou melhor que a nossa.",
  "finish-dialog-lose": "Veja se consegue reduzir para somente {best} :D",
  "hg-prune-tree": "Cuidado! O Mercurial faz coleção de lixo agressiva e precisa prunar sua árvore",
  "hg-a-option": "A opção -A não é necessária para este aplicativo, simplesmente faça commit",
  "hg-error-no-status": "Não existe um comando status para este aplicativo, já que não há staging de arquivos. Tente hg summary",
  "hg-error-need-option": "Eu preciso da opção {option} para esse comando!",
  "hg-error-log-no-follow": "hg log sem -f atualmente não é suportado, use -f",
  "git-status-detached": "Detached HEAD!",
  "git-status-onbranch": "No ramo {branch}",
  "git-status-readytocommit": "Pronto para commitar! (como sempre neste demo ;-) )",
  "git-dummy-msg": "Commitando.. Vai Timão!",
  "git-error-origin-fetch-uptodate": "Já estamos na versão mais recente!",
  "git-error-origin-fetch-no-ff": "O fetch não pode ser realizado pois o ramo de origem está fora de sincronia com o ramo remoto",
  "git-error-origin-push-no-ff": "O repositório remoto divergiu do repositório local, então enviar suas mudanças não é um simples fast forward (e por isso seu push foi rejeitado). Por favor, faça pull das novas mudanças do repositório remoto, incorpore-os a este ramo, e tente novamente. Você pode fazê-lo com git pull ou git pull --rebase",
  "git-error-remote-branch": "Você não pode executar esse comando em um ramo remoto",
  "git-error-origin-required": "É necessário informar uma origem para esse comando",
  "git-error-origin-exists": "A origem já existe! Você não pode criar uma nova",
  "git-error-branch": "Você não pode apagar o ramo master, nem o ramo em que você está, nem coisas que não sejam ramos",
  "git-merge-msg": "Merge de {target} em {current}",
  "git-error-rebase-none": "Não há commits para o rebase! São todos commits de merge ou mudanças já aplicadas",
  "git-result-nothing": "Nada a ser feito...",
  "git-result-fastforward": "Fast forward...",
  "git-result-uptodate": "Ramo já atualizado",
  "git-error-exist": "A referência {ref} não existe ou é desconhecida",
  "git-error-relative-ref": "O commit {commit} não tem um {match}",
  "git-warning-detached": "Cuidado! Modo Detached HEAD",
  "git-warning-add": "Não é necessário adicionar arquivos neste demo",
  "git-error-options": "As opções que você especificou são incompatíveis ou incorretas",
  "git-error-already-exists": "O commit {commit} já existe nas suas mudanças, abortando!",
  "git-error-reset-detached": "Não se pode fazer reset no modo detached. Use checkout se quiser se mover",
  "git-warning-hard": "O comportamento padrão é um reset --hard, fique livre para omitir essa opção!",
  "git-error-staging": "Não existe o conceito de adicionar/indexar mudanças, de forma que essa opção ou comando é inválida",
  "git-revert-msg": "Revertendo {oldCommit}: {oldMsg}",
  "git-error-args-many": "Espero no máximo {upper} parâmetros para {what}",
  "git-error-args-few": "Espero pelo menos {lower} parâmetros para {what}",
  "git-error-no-general-args": "Este comando não aceita parâmetros gerais",
  "copy-tree-string": "Copie o código abaixo",
  "learn-git-branching": "Learn Git Branching",
  "select-a-level": "Selecione um nível",
  "branch-name-short": "Desculpe, precisamos manter os nomes dos ramos curtos para visualizá-los. O nome do seu ramo foi truncado para 9 caracteres, resultando em \"{branch}\"",
  "bad-branch-name": "Um ramo não pode ser chamado de \"{branch}\"!",
  "bad-tag-name": "Uma tag não pode ser chamada de \"{tag}\"!",
  "option-not-supported": "A opção {option} não é suportada",
  "git-usage-command": "git <comando} [<parâmetros>]",
  "git-supported-commands": "Comandos suportados:",
  "git-usage": "Uso:",
  "git-version": "Git versão PCOTTLE.1.0",
  "flip-tree-command": "Invertendo a árvore...",
  "refresh-tree-command": "Atualizando a árvore...",
  "locale-command": "Língua trocada para {locale}",
  "locale-reset-command": "Língua retornada para a padrão, que é {locale}",
  "show-command": "Use algum destes comandos para ter mais informações:",
  "show-all-commands": "Esta é uma lista dos comandos disponíveis:",
  "cd-command": "Diretório mudado para \"/diretorios/nao/importam/neste/demo\"",
  "ls-command": "NaoSePreocupeComNomesDeArquivoNesteDemo.txt",
  "mobile-alert": "Provavelmente você não vai conseguir digitar comandos no celular, neste caso tente acessar de um computador",
  "share-tree": "Compartilhe esta árvore com seus amigos! Eles podem carregá-la com \"import tree\"",
  "paste-json": "Cole o JSON abaixo!",
  "solved-map-reset": "Mapa de resolvidos descartado, você está começando com ficha limpa!",
  "level-cant-exit": "Você não está em um nível! Você está no sandbox, comece um nível com \"levels\"",
  "level-no-id": "O nível \"{id}\" não existe! Abrindo uma caixa de seleção de nível",
  "undo-stack-empty": "Você já desfez tudo!",
  "already-solved": "Você já resolveu este nível, tente outros com \"levels\" ou volte ao sandbox com \"sandbox\"",
  "command-disabled": "Achou que seria fácil assim? Desabilitamos esse comando durante este nível, só para dificultar ;-)",
  "share-json": "Aqui está o JSON para este nível! Compartilhe com alguém ou me envie pelo Github",
  "want-start-dialog": "Você não especificou uma mensagem de início, quer colocar uma?",
  "want-hint": "Você não especificou uma dica, quer colocar uma?",
  "prompt-hint": "Colocque uma dica para este nível, ou deixe em branco se não quiser incluir",
  "prompt-name": "Coloque o nome do nível",
  "solution-empty": "Sua solução está vazia! O aprendiz deveria ter que fazer alguma coisa",
  "define-start-warning": "Esbelecendo o ponto de início... a solução e o objetivo serão sobrescritos caso já existirem",
  "help-vague-level": "Você está em um nível, então há vários tipos de ajuda. Selecione \"help level\" para aprender mais sobre esta lição, \"help general\" para aprender a usar o Learn GitBranching, ou \"objective\" ver como resolver o nível.",
  "help-vague-builder": "Você está no construtor de nívels, então há vários tipos de ajuda. Selecione \"help general\" ou \"help builder\"",
  "show-goal-button": "Mostrar objetivo",
  "hide-goal-button": "Ocultar objetivo",
  "goal-to-reach": "Objetivo a cumprir",
  "goal-only-master": "<span class=\"fwber\">Nota:</span> Apenas o ramo master será verificado neste nível. Os outros ramos (dentro das caixas clareadas) são somente para referência. Como sempre, você pode ocultar esta janela com \"hide goal\"",
  "hide-goal": "Você pode ocultar esta janela com \"hide goal\"",
  "hide-start": "Você pode ocultar esta janela com \"hide start\"",
  "level-builder": "Construtor de níveis",
  "no-start-dialog": "Não há mensagem de início para este nível!",
  "no-hint": "Hmm, não existe nenhuma pista para este nível :-/",
  "error-untranslated-key": "Não existe tradução para {key} :( Pule no Github e sugira uma! :)",
  "error-untranslated": "Esta mensagem ou texto não foi traduzida para Português :( Ajude-nos a traduzir no Github!"
};
