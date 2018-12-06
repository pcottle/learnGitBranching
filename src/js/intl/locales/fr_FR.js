module.exports = {
  "multiple-parents-name": "Parents multiples",
  "multiple-parents-hint": "Utilisez \"git branch bugWork\" avec un commit pour créer une référence manquante",
  "multiple-parents-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Determine les Parents",
            "",
            "Comme le symbole `~`, le symbole `^` accepte un numéro après lui.",
            "",
            "Au lieu d'entrer le nombre de générations à remonter (ce que `~` fait), le symbole `^` détermine quel parent est à remonter. Attention, un merge commit a deux parents ce qui peut porter à confusion.",
            "",
            "Normalement Git suit le  \"premier\" parent pour un commit/merge, mais avec un numéro suivi de `^` le comportement par défault est modifié.",
            "",
            "Assez de bla bla, passons à l'action",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Nous avons un commit/merge. Si nous faisons checkout `master^` sans le symbole, on obtient le premier parent suivant ce commit. ",
            "",
            "(*Dans notre vue, le premier parent se situe juste au dessus du merge.*)"
          ],
          "afterMarkdowns": [
            "Facile -- C'est ce que nous faisons tout le temps."
          ],
          "command": "git checkout master^",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Nous allons spécifier le deuxième parent à la place."
          ],
          "afterMarkdowns": [
            "Vous voyez ? Nous suivons le second parent."
          ],
          "command": "git checkout master^2",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Les symboles `^` et `~` permettent de se déplacer de façon très efficace :"
          ],
          "afterMarkdowns": [
            "Boum, vitesse du tonnerre !"
          ],
          "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Encore plus fou, ces symboles peuvent être enchainés ! Regardez cela :"
          ],
          "afterMarkdowns": [
            "Le même résultat, mais en une seule commande."
          ],
          "command": "git checkout HEAD~^2~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Un peu de pratique",
            "",
            "Pour réussir le niveau, créez une nouvelle branche à la destination indiquée",
            "",
            "Évidement ce serait plus rapide de spécifier le commit (C6 par exemple), mais faites-le plutôt avec les symboles de déplacement dont nous venons de parler !"
          ]
        }
      }
    ]
  },
  "branching-name": "Gérer les branches avec Git",
  "branching-hint": "Faites une nouvelle branche avec \"git branch [nom]\" positionnez-vous dans celle-ci avec \"git checkout [nom]\"",
  "branching-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branches Git",
            "",
            "Les branches sous Git sont incroyablement légères. Elles sont simplement des références sur un commit spécifique -- rien de plus. C'est pourquoi beaucoup d'enthousiastes répètent en cœur :",
            "",
            "```",
            "des branches le plus tôt possible, et des branches souvent",
            "```",
            "",
            "Parce qu'il n'y a pas de surcoût (stockage/mémoire) associé aux branches, il est facile de diviser son travail en de nombreuses branches plutôt que d'avoir quelques grosses branches.",
            "",
            "Nous verrons comment les branches et les commits interagissent quand nous les utiliserons ensemble. Pour l'instant, souvenez-vous qu'une branche est un moyen d'exprimer \"Je veux inclure le contenu de ce commit et de tous les commits parents.\""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Regardons à quoi ressemblent les branches en pratique.",
            "",
            "Nous allons nous positionner (checkout) dans une nouvelle branche appellée `newImage`"
          ],
          "afterMarkdowns": [
            "Et voilà, c'est tout ! La branche `newImage` se réfère désormais au commit `C1`"
          ],
          "command": "git branch newImage",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Travaillons mainenant dans cette branche. Appuyez sur le bouton ci-dessous."
          ],
          "afterMarkdowns": [
            "Oh non! La branche `master` a bougé mais pas la branche `newImage` ! C'est parce que nous n'étions pas  \"sur\" la nouvelle branche, comme indiqué par l'asterisque (*) sur `master`"
          ],
          "command": "git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Indiquons à git que nous voulons nous positionner sur la branche avec ",
            "",
            "```",
            "git checkout [nom]",
            "```",
            "",
            "Cela nous positionne sur la nouvelle branche avant de faire un commit avec nos modifications"
          ],
          "afterMarkdowns": [
            "C'est parti ! Nos modifications ont été enregistrées sur la nouvelle branche"
          ],
          "command": "git checkout newImage; git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok! Vous êtes fin prêt pour faire des branches. Après la fermeture de cette fenêtre,",
            "faites une nouvelle branche nommée `bugFix` et positionnez-vous sur cette branche"
          ]
        }
      }
    ]
  },
  "commits-name": "Introduction aux commits avec Git",
  "commits-hint": "Il suffit de saisir 'git commit' deux fois pour réussir !",
  "commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Commits Git",
            "Un commit dans un dépôt (repository) git enregistre une image (snapshot) de tous les fichiers du repertoire. Comme un Copier-Coller géant, mais en bien mieux !",
            "",
            "Git fait en sorte que les commits soient aussi légers que possible donc il ne recopie pas tout le répertoire à chaque commit. En fait, git n'enregistre que l'ensemble des changements (\"delta\") depuis la version précédente du dépôt. C'est pour cette raison que la plupart des commits ont un commit parent -- ainsi que nous le verrons plus tard.",
            "",
            "Pour cloner un dépôt, il faut décompresser (\"résoudre\") tous ces deltas. C'est la raison pour laquelle la commande écrit :",
            "",
            "`resolving deltas`",
            "",
            "lorsque l'on clone un dépôt.",
            "",
            "C'est beaucoup à absorber, mais pour l'instant vous pouvez considérer les commits comme des snapshots du projet. Les commits sont très légers et passer de l'un à l'autre est très rapide !"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Voyons à quoi cela ressemble en pratique. Sur la droite, on peut visualiser un (petit) dépôt git. Il y a pour l'instant deux commits -- le premier commit initial, `C0`, et un commit suivant `C1` qui aurait des changements significatifs.",
            "",
            "Appuyez sur le bouton ci-dessous pour faire un nouveau commit"
          ],
          "afterMarkdowns": [
            "C'est parti ! Super. Nous venons de faire des modifications sur le dépôt et de sauvegarder celles-ci dans un commit. Ce commit que nous venons de faire a un parent, `C1`, qui référence le commit sur lequel il est basé."
          ],
          "command": "git commit",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Allez-y et essayez par vous-même ! Après la fermeture de cette fenêtre, faites deux commits pour terminer ce niveau."
          ]
        }
      }
    ]
  },
  "merging-name": "Faire des 'merge' (fusions de branches) avec Git",
  "merging-hint": "Pensez à faire des commits dans l'ordre indiqué (bugFix avant master)",
  "merging-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branches et Merges",
            "",
            "Super ! Nous savons désormais comment faire des commits et des branches. Maintenant nous devons apprendre comment combiner ensemble les contenus de deux branches différentes. Ceci nous permettra de créer une nouvelle branche, développer une nouvelle fonctionnalité sur cette dernière, puis intégrer cette fonctionnalité en combinant le contenu de cette branche de développement à la branche d'origine(master par exemple).",
            "",
            "La première méthode que nous allons voir pour combiner le contenu de deux branches est `git merge`. Faire un 'merge' avec Git crée un commit spécial qui a deux parents. Un commit avec deux parents indique en susbtance \"Je veux inclure le contenu de ce parent et le contenu de cet autre parent, *et* l'ensemble de leurs parents.\"",
            "",
            "C'est plus facile en visualisant, regardons dans la vue suivante"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Ici nous avons deux branches ; chacune a un commit qui lui est propre. Cela signifie qu'aucune des deux branches n'inclut la totalité du \"travail\" qui a été fait dans le dépôt. Arrangeons-cela avec merge.",
            "",
            "Nous allons `merge` («fusionner») la branche `bugFix` dans `master`"
          ],
          "afterMarkdowns": [
            "Youhou ! Vous avez vu ça ? Avant tout, `master` pointe donc maintenant sur un commit qui a deux parents. Si vous remontez l'enchaînement des flèches depuis `master`, vous allez passez par tous les commits jusqu'à la racine. Cela signifie que `master` contient maintenant tout le travail du dépôt.",
            "",
            "Par ailleurs, avez-vous remarqué les nouvelles couleurs des commits ? Pour faciliter l'apprentissage, j'ai inclus une certaine logique dans la coloration. Chaque branche a une unique couleur. Chaque commit est de la couleur de toutes les branches qui le contiennent.",
            "",
            "Ici nous voyons que la couleur de `master` est intégrée à tous les commits, sauf ceux de `bugFix`. Réparons-cela ..."
          ],
          "command": "git merge bugFix",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Faisons un merge  de `master` dans `bugFix`:"
          ],
          "afterMarkdowns": [
            "Puisque `bugFix` était un descendant de `master`, git n'avait aucun travail à effectuer ; il a simplement déplacé `bugFix` au même commit auquel `master` est attaché.",
            "",
            "Maintenant tous les commits sont de la même couleur, ce qui indique que chaque branche contient tout le contenu du dépôt ! Woohoo!"
          ],
          "command": "git checkout bugFix; git merge master",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour accomplir ce niveau, effectuez les opérations suivantes :",
            "",
            "* Faites une nouvelle branche appelée `bugFix`",
            "* Positionnez-vous sur la branche `bugFix` avec `git checkout bugFix`",
            "* Faites un commit",
            "* Retournez sur la branche `master` (commande `git checkout`)",
            "* Faites un nouveau commit",
            "* Fusionnez la branche `bugFix` dans `master` avec `git merge`",
            "",
            "*Rappelez-vous que vous pouvez à tout moment réafficher ces indications avec \"objective\"!*"
          ]
        }
      }
    ]
  },
  "rebasing-name": "Introduction à rebase",
  "rebasing-hint": "Assurez-vous de bien faire votre commit sur bugFix en premier",
  "rebasing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Rebase",
            "",
            "La seconde façon de combiner les contenus de deux branches est *rebase*. Rebase prend un ensemble de commits, les \"recopie\", et les ajoute en bout de chaîne à un autre endroit.",
            "",
            "Bien que cela puisse sembler compliqué, l'avantage de rebase est de permettre d'obtenir une simple séquence linéaire de commits. Les logs/l'historique du dépôt seront bien plus propres si seul rebase est autorisé (plutôt que merge).",
            "",
            "Voyons rebase en action…"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Ici nous avons encore une fois deux branches; notez que nous sommes sur la branche bugFix (cf. l'asterisque)",
            "",
            "Nous voudrions transférer notre travail de la branche 'bugFix' directement sur le travail existant dans 'master'. Ainsi on aurait l'impression que ces deux travaux ont été développés séquentiellement alors qu'en réalité ils ont été réalisés en parallèle.",
            "",
            "Faisons cela avec la commande `git rebase`"
          ],
          "afterMarkdowns": [
            "Super! Désormais, le travail de la branche 'bugFix' est juste en haut de la branche 'master' et nous avons une belle séquence linéaire de commits.",
            "",
            "Notez que le commit C3 existe toujours quelque part (il est en grisé sur l'arbre), et C3' est la  \"copie\" que nous avons créée sur master avec rebase.",
            "",
            "Le seul problème est que master n'a pas été mis à jour, faisons cela maintenant…"
          ],
          "command": "git rebase master",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Nous sommes désormais positionnés sur la branche `master`. Continuons en faisant le rebase sur `bugFix`…",
            "Et voilà ! Puisque `master` était un ascendant de `bugFix`, git a simplement déplacé la référence de la branche `master` en avant dans le temps."
          ],
          "command": "git rebase bugFix",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour accomplir ce niveau, faites les opérations suivantes",
            "",
            "* Positionnez-vous (checkout) sur une nouvelle branche nommée `bugFix`",
            "* Faites un commit",
            "* Retournez sur master et faites un nouveau commit",
            "* Positionnez-vous à nouveau sur bugFix et faites un rebase sur master",
            "",
            "Bonne chance !"
          ]
        }
      }
    ]
  },
  "describe-name": "Git describe",
  "describe-hint": "Faites un commit sur bugFix quand vous êtes pret",
  "describe-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Git describe",
            "",
            "Parce ce que les tags sont de très bonnes références dans le code, git à une commande pour *décrire* (describe) la différence entre le commit et le tag le plus récent. Cette commande s'appelle `git describe` !",
            "",
            "Git describe peut vous aider lorsque vous vous êtes beaucoup déplacé ; cela peut arriver après un git bisect (chercher l'apparition d'un bug) ou lorsque vous revenez de vacances après 3 semaines sur l'ordinateur d'un collègue."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Git describe s'écrit comme suit :",
            "",
            "`git describe <ref>`",
            "",
            "où `<ref>` est un n'importe quelle chose que git peut résoudre en un commit. Si vous ne specifiez pas de ref, `HEAD` est pris par défault.",
            "",
            "Le résultat de la commande ressemble à :",
            "",
            "`<tag>_<numCommits>_g<hash>`",
            "",
            "où `tag` est le tag le plus proche dans l'historique, `numCommits` le nombre de commits avec le tag, et `<hash>` le hash/identifiant du commit décrit."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Regardons un petit exemple. Prenons cet arbre :"
          ],
          "afterMarkdowns": [
            "La commande`git describe master` donne le résultat :",
            "",
            "`v1_2_gC2`",
            "",
            "alors que `git describe side` donne :",
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
            "Ceci résume bien git describe ! Amusez-vous à utiliser cette commande avec d'autres endroits dans ce niveau pour bien comprendre describe.",
            "",
            "Lorsque vous serez prêt, faites simplement un commit pour finir le niveau. Un petit niveau bonus :P"
          ]
        }
      }
    ]
  },
  "grabbing-one-commit-name": "Choisir seulement 1 commit",
  "grabbing-one-commit-hint": "Souvenez-vous, les rebases interactifs ou cherry-pick sont vos amis ici.",
  "grabbing-one-commit-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Les commits empilés localement",
            "",
            "Voici une situation qui arrive souvent : j'ai un bug assez caché à corriger. Pour trouver la source je rajoute des commandes et prints de debug à travers le code.",
            "",
            "Tous ces debug se retrouvent dans une branche particulière. Je trouve le bug et le répare, comme toujours !",
            "",
            "Le seul problème c'est que je ne peux pas faire de merge ou rebase, car tous ces commits de debug seront dans le master. Il doit y avoir une autre façon..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour réussir ce niveau, nous avons besoin de dire à Git quel commit particulier recopier. C'est comme pour le niveau précédent : nous pouvons utiliser les mêmes commandes :",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "C'est un niveau avancé, donc à vous de choisir quelle commande utiliser, mais pour réussir ce niveau, assurez-vous que `master` reçoive le même commit que `bugFix` référence."
          ]
        }
      }
    ]
  },
  "juggling-commits-name": "Jongler avec les Commits",
  "juggling-commits-hint": "La première commande est git rebase -i HEAD~2",
  "juggling-commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Jongler avec les Commits",
            "",
            "Voici une autre situation fréquente. Vous avez certains changements (`newImage`) et un autre groupe de changements (`caption`) qui sont reliés, ils sont donc empilés l'un sur l'autre dans votre dépôt Git (i.e. un après l'autre).",
            "",
            "Là où ça se complique c'est lorsque vous devez faire une petite modification dans un commit antérieur. Dans ce cas, les configurations de  `newImage` devront changer un peu, même si ce commit est loin dans notre historique !!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Nous allons régler le problème en faisant ceci :",
            "",
            "* Nous allons réordonner les commits pour que celui que nous voulions changer soit sur le dessus `git rebase -i`",
            "* Nous allons utiliser `commit --amend` pour faire les petites modifications",
            "* Nous allons réordonner les commits dans l'ordre original avec `git rebase -i`",
            "* Finalement, nous allons déplacer master vers la nouvelle tête de l'arbre (avec la méthode de votre choix)",
            "",
            "Il y a plusieurs façons d'atteindre ce but (cherry-pick semble très tentant), mais nous allons parler de cherry-pick plus tard, pour le moment concentrez-vous sur cette technique.",
            "",
            "Pour terminer, Faites attention au but -- Dû au fait que nous déplaçons les commits 2 fois, ils se retrouvent les deux avec une apostrophe. Une deuxième apostrophe est ajouté sur le commit que nous modifions, ce qui nous donne l'arbre finale ",
            "",
            "Ceci étant dit, je peux comparer le résultat avec la stucture et les différentes apostophes. Tant que votre arbre master a la même structure et apostrophe le niveau sera considéré réussi."
          ]
        }
      }
    ]
  },
  "juggling-commits2-name": "Jongler avec les commits #2",
  "juggling-commits2-hint": "N'oubliez pas de forwarder la branch master dans la nouvelle branch",
  "juggling-commits2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Jongler avec les commits #2",
            "",
            "*Si vous n'avez pas fait le défi Jongler avec les commits #1 (le niveau précédent), vous devriez le faire avant de continuer*",
            "",
            "Comme vu dans le niveau précédent, nous utilisons `rebase -i` pour réordonner les commits. Une fois que le commit à modifier est celui à la tête, nous pouvons facilement faire un --amend et réordonner dans l'ordre voulu.",
            "",
            "La difficulté ici est qu'il y a beaucoup de changements, ce qui peut introduire des conflits de rebase. Essayons avec l'autre méthode `git cherry-pick`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "N'oubliez pas que git cherry-pick va prendre un commit de n'importe où dans l'arbre de git et le mettre devant HEAD (sauf s'il est un ancêtre de HEAD).",
            "",
            "Un petit rappel :"
          ],
          "afterMarkdowns": [
            "Bien ! continuons."
          ],
          "command": "git cherry-pick C2",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Dans ce niveau, nous voulons modifier `C2` sans utiliser `rebase -i`. À vous maintenant de trouver comment ! :D",
            "",
            "Petit rappel, le nombre exact d'apostrophes (') sur le commit n'est pas important. Par exemple, nous donnerons les points à une structure qui colle au résultat mais qui a une apostrophe en trop partout."
          ]
        }
      }
    ]
  },
  "tags-name": "Git Tags",
  "tags-hint": "Vous pouvez faire le checkout sur le commit ou sur le tag !",
  "tags-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Tags",
            "",
            "Comme appris dans les niveaux précédents, les branches sont faciles à manipuler et se réfèrent aux commits qui ont été faits pour compléter le travail fait sur celles-ci. Les branches sont donc constamment en mouvement.",
            "",
            "Dans ce cas, vous vous demandez peut-être s'il y a un moyen d'ajouter une marque *permanente* dans l'historique de votre projet. Pour des commits comme des livraisons majeures ou d'importantes fusions, existe-t-il une façon plus stable qu'une branche de garder l'état d'une branche à un instant précis ?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Vous l'avez deviné ! Git tags offre cette fonctionnalité : les tags marquent à jamais certains commits comme \"milestone\" auxquels vous pouvez vous référez comme à des branches.",
            "",
            "Encore plus important, il sont définitifs. Vous ne pouvez donc pas rajouter de commit dans un tag : les tags sont un peu comme un pointeur définitif dans l'arbre des commits.",
            "",
            "Voyons les tags en pratique."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Essayons de faire un tag sur C1 (qui représente la version 1 de notre prototype)"
          ],
          "afterMarkdowns": [
            "Voila, facile non ? Nous nommons le tag `v1` et il pointe vers le commit `C1`. Si vous ne spécifiez pas le commit, le tag pointera là où se trouve `HEAD`."
          ],
          "command": "git tag v1 C1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour ce niveau, créez simplement les tags visibles dans les objectifs puis faites un checkout sur le tag `v1`. Remarquez comment vous vous retrouvez dans l'état `HEAD` détachée -- c'est parce que vous ne pouvez pas commiter sur le tag `v1`.",
            "",
            "Dans les niveaux suivants vous verrez un cas plus intéressant d'utilisation des tags."
          ]
        }
      }
    ]
  },
  "cherry-pick-name": "Introduction à cherry-pick",
  "cherry-pick-hint": "git cherry-pick suivis par les noms de commits",
  "cherry-pick-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Déplacer votre travail",
            "",
            "Nous avons maintenant pratiqué les bases de git -- commits, branches, et déplacements dans l'arbre des commits. Ces seuls concepts sont suffisants pour utiliser 90% du pouvoir des dépôts git et satisfaire les principaux besoins des développeurs.",
            "",
            "Les 10% restants, cependant, peuvent être assez utiles pour les systèmes assez complexes (ou quand vous vous êtes mis tout seul dans le pétrin). Le prochain concept que nous allons aborder est \"le déplacement de travail\" (moving work around) -- en d'autres termes, c'est une façon pour les développeurs de dire  \"Je veux ce travail ici et cet autre là.\".",
            "",
            "Cela peut sembler compliqué, mais c'est un concept simple."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Cherry-pick",
            "",
            "La première commande de cette série est `git cherry-pick`. Elle a le prototype suivant :",
            "",
            "* `git cherry-pick <Commit1> <Commit2> <...>`",
            "",
            "C'est une manière simple de dire qu'on voudrait copier une série de commits en-dessous de notre emplacement actuel (`HEAD`). Personnellement, j'adore `cherry-pick` parce qu'il y a un petit peu de magie dedans, et parce que c'est facile à comprendre.",
            "",
            "Faisons une démonstration !",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Ici le dépôt que nous avons contient du travail dans la branche `side`, que nous voulons copier dans `master`. Cela pourrait être fait avec un rebase (que nous avons déjà appris), mais voyons comment cherry-pick fonctionne."
          ],
          "afterMarkdowns": [
            "Voilà ! Nous voulions les commits `C2` et `C4` et git les a fait apparaître juste sous nos jambes. Aussi simple que ça !"
          ],
          "command": "git cherry-pick C2 C4",
          "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour finir ce niveau, copiez simplement le travail désigné dans la branche master. Vous pouvez voir les commits que nous souhaitons avoir en regardant dans la fenêtre d'objectif.",
            ""
          ]
        }
      }
    ]
  },
  "detached-head-name": "Détachez votre HEAD",
  "detached-head-hint": "Utiiser le label (identifiant) du commit pour aider !",
  "detached-head-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Se déplacer dans Git",
            "",
            "Avant que nous découvrions quelques-unes des fonctionnalités les plus avancées de Git, il est important de comprendre les différents manières de se déplacer dans l'arbre des commits qui représente votre projet.",
            "",
            "Une fois que ces déplacements seront aisés, votre puissance avec les autres commandes de git sera amplifiée !",
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
            "Premièrement nous avons parlé de \"HEAD\". HEAD est le nom symbolique pour le commit sur lequel nous nous situons actuellement -- plus simplement c'est le commit sur lequel nous travaillons.",
            "",
            "HEAD pointe toujours sur le commit le plus récent dans l'arbre des commits. La plupart des commandes git qui modifient l'arbre des commits vont commencer par modifier HEAD.",
            "",
            "Normalement HEAD pointe sur le nom d'une branche (comme bugFix). Quand vous effectuez un commit, le statut de bugFix est modifié et ce changement est visible par le biais de HEAD."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Voyons cela en action. Ici nous allons indiquer où se situe HEAD avant et après un commit."
          ],
          "afterMarkdowns": [
            "Vous voyez ! HEAD était caché en dessous de la branche `master` tout le long."
          ],
          "command": "git checkout C1; git checkout master; git commit; git checkout C2",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "### Détacher HEAD",
            "",
            "Détacher HEAD signifie simplement que l'on attache HEAD à un commit au lieu d'une branche. Voilà à quoi cela ressemble actuellement :",
            "",
            "HEAD -> master -> C1",
            ""
          ],
          "afterMarkdowns": [
            "Et maintenant c'est",
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
            "Pour terminer ce niveau, détacher HEAD de `bugFix` et attachez-le plutôt au commit.",
            "",
            "Spécifiez le commit par son identifiant (hash). Le hash de chaque commit est affiché dans le rond qui représente le commit."
          ]
        }
      }
    ]
  },
  "interactive-rebase-name": "Introduction à rebase",
  "interactive-rebase-hint": "Vous pouvez utiliser soit les branches, soit les références relatives (HEAD~) pour spéficier la cible à rebaser",
  "interactive-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Interactive Rebase",
            "",
            "Git cherry-pick est pratique quand vous savez exactement quels commits vous voulez (_et_ que vous connaissez leurs identifiants) -- il est difficile de battre la simplicité qu'il procure.",
            "",
            "Mais que faire quand vous ne connaissez pas les identifiants des commits ? Heureusement git a pensé à vous dans pour ce cas-là ! Nous pouvons utiliser un rebase interactif pour cela -- c'est la meilleure façon de reconsidérer une série de commits que vous vous apprêtez à rebaser.",
            "",
            "Allons un peu plus dans les détails ..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Tout rebase interactif signifie utiliser la commande `rebase` avec l'option `-i`.",
            "",
            "Si vous mettez cette option, git va ouvrir une interface graphique pour vous montrer quels commits vont être copiés en dessous de la cible sur laquelle vous rebasez. Elle vous montre aussi les identifiants et commentaires des commits, ce qui est pratique pour s'orienter parmi les commits.",
            "",
            "Pour le \"vrai\" git, l'interface graphique correspond en fait à ouvrir un fichier dans un éditeur de texte comme `vim`. Pour notre exemple, j'ai construit une petite fenêtre de dialogue qui se comporte de la même façon."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Quand le rebase interactif s'ouvre, vous avez la possibilité de faire 3 choses :",
            "",
            "* Vous pouvez réarranger les commits simplement en changeant leur ordre dans l'interface graphique (dans notre fenêtre de dialogue, cela signifie déplacer les objets dedans avec la souris -- drag and drop).",
            "* Vous pouvez omettre certains commits. Cela est désigné par `pick` : cliquer sur `pick` désélectionne/resélectionne le commit.",
            "* Enfin, vous pouvez écraser des commits. Malheureusement notre niveau ne supporte pas cette option, nous allons donc sauter les détails concernant cette possibilité. Pour faire court, cela vous permet de mélanger des commits.",
            "",
            "Super ! Voyons un exemple."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Quand vous activez le bouton, une fenêtre de rebase interactif va s'ouvrir. Reordonnez quelques commits (ou supprimez-en certains) et regardez le résultat !"
          ],
          "afterMarkdowns": [
            "Boum ! Git a copié les commits de la même manière que vous l'aviez spécifié."
          ],
          "command": "git rebase -i HEAD~4 --aboveAll",
          "beforeCommand": "git commit; git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour finir ce niveau, faites un rebase interactif et atteignez l'ordre indiqué dans le fenêtre d'objectif. Souvenez-vous que vous pouvez toujours exécuter les commandes `undo` ou `reset` pour réparer vos erreurs :D"
          ]
        }
      }
    ]
  },
  "relative-refs-name": "Références relatives (^)",
  "relative-refs-hint": "Rappelez-vous de l'opérateur circonflexe (^)",
  "relative-refs-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Références relatives",
            "",
            "Se déplacer dans Git en spécifiant des identifiants de commits (hashes) peut être un peu agaçant. Dans le monde réel vous n'aurez pas une vue sur un joli arbre des commits à côté de votre terminal, ainsi vous aurez à utiliser `git log` pour connaître les identifiants.",
            "",
            "De plus, les identifiants sont plus longs dans le vrai monde de Git qu'ici. Par exemple, l'identifiant du commit introduit au précédent niveau était `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Difficilement mémorisable ...",
            "",
            "Le côté positif est que Git est intelligent avec les identifiants. Vous avez seulement à spécifier les premiers caractères de l'identifiant jusqu'à ce qu'il reconnaisse exactement le commit. Ainsi je peux taper `fed2` au lieu de la longue chaîne ci-dessus."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Comme je l'ai dit, spécifier un commit par son identifiant n'est pas très pratique, c'est pourquoi Git a des références relatives. Elles sont géniales !",
            "",
            "Avec les références relatives vous pouvez commencer par vous placer à un endroit mémorisable (comme la branche `bugFix` ou `HEAD`) et travailler depuis ici.",
            "",
            "Les commits relatifs sont puissants, et on va en introduire deux simples ici :",
            "",
            "* Revenir d'un commit en arrière avec `^`",
            "* Revenir de plusieurs en arrière avec `~<num>`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Regardons l'opérateur circonflexe (^) d'abord. Chaque fois que vous le faites suivre un nom de référence, vous êtes en train de demander à Git de trouver le parent du commit spécifié.",
            "",
            "Ainsi, `master^` est équivalent à \"le premier parent de `master`\".",
            "",
            "`master^^` est le grand-parent (ancêtre de seconde génération) de `master`",
            "",
            "Faisons un checkout du commit avant master."
          ],
          "afterMarkdowns": [
            "Boum ! Fini. Bien plus facile qu'écrire l'identifiant du commit."
          ],
          "command": "git checkout master^",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vous pouvez aussi utiliser `HEAD` comme une référence relative. Utilisons cela plusieurs fois pour remonter l'arbre des commits."
          ],
          "afterMarkdowns": [
            "Facile ! Nous pouvons voyager dans le temps avec `HEAD^`"
          ],
          "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
          "beforeCommand": "git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour compléter ce niveau, faites un checkout du commit parent de `bugFix`. Cela va détacher `HEAD`.",
            "",
            "Vous pouvez spécifier l'identifiant du commit si vous voulez, mais essayez plutôt d'utiliser les références relatives !"
          ]
        }
      }
    ]
  },
  "relative-refs2-name": "Références relatives #2 (~)",
  "relative-refs2-hint": "Vous aurez besoin d'utiliser au moins une référence directe (hash) pour compléter ce niveau.",
  "relative-refs2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### L'opérateur \"~\"",
            "",
            "Disons que vous souhaitez remonter beaucoup de niveaux dans l'arbre des commits. Cela peut être ennuyeux d'utiliser `^` plusieurs fois, ainsi Git a aussi l'opérateur tilde (~).",
            "",
            "",
            "L'opérateur tilde prend optionnellement à sa suite un nombre qui spécifie le nombre de parents que vous souhaitez remonter. Voyons cela en action"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Spécifions le nombre de commits en arrière avec `~`."
          ],
          "afterMarkdowns": [
            "Boum ! Tellement rapide ! Les références relatives sont géniales."
          ],
          "command": "git checkout HEAD~4",
          "beforeCommand": "git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Forcer les branches",
            "",
            "Vous êtes maintenant un expert des références relatives, alors servons-nous en.",
            "",
            "L'une des principales façons dont j'utilise les références relatives est pour réorganiser les branches. Vous pouvez directement réassigner les branches à un commit avec l'option `-f`. Ainsi quelque chose comme :",
            "",
            "`git branch -f master HEAD~3`",
            "",
            "bouge (de force) la branche master à trois parents derrière HEAD."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Voyons l'effet de la précédente commande"
          ],
          "afterMarkdowns": [
            "On y est ! Les références relatives nous donne une méthode concise pour référencer `C1` et le forçage de branche (`-f`) nous donne une méthode rapide pour bouger une branche à cet emplacement."
          ],
          "command": "git branch -f master HEAD~3",
          "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Maintenant que vous avez vu les références relatives et le forçage de branche, utilisons-les pour résoudre le niveau suivant.",
            "",
            "Pour compléter ce niveau, bouger `HEAD`, `master`, et `bugFix` à leurs destinations désignées."
          ]
        }
      }
    ]
  },
  "reversing-changes-name": "Annuler des changements avec Git",
  "reversing-changes-hint": "Notez que `revert` et `reset` n'ont pas les mêmes arguments.",
  "reversing-changes-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Annuler des changements avec Git",
            "",
            "Il y a de nombreuses façons d'annuler des changement avec Git. De même que pour les commits, annuler des changements avec Git est à la fois un aspect bas-niveau (gestion des fichiers et morceaux de fichiers) et un aspect de plus haut niveau (comment les changements sont effectivement annulés). Nous allons nous intéresser à ce dernier point.",
            "",
            "Il y a principalement deux façons d'annuler des changements avec Git : l'une est `git reset` et l'autre est `git revert`. Nous allons maintenant voir chacune de ces façons.",
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
            "`git reset` annule des changements en déplaçant la référence en arrière dans le temps sur un commit plus ancien. En ce sens, on peut considérer cela comme une façon de \"réécrire l'histoire\"; `git reset` fait remonter une branche en arrière comme si le(s) commit(s) n'avait jamais eu lieu.",
            "",
            "Regardons à quoi cela ressemble :"
          ],
          "afterMarkdowns": [
            "Bravo ! Git a simplement déplacé la référence de la branche master en la faisant revenir sur `C1`; désormais notre dépôt est dans le même état que si `C2` n'avait jamais eu lieu"
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
            "Bien que le reset marche parfaitement pour les branches locales sur notre propre machine, cette façon de \"réécrire l'histoire\" ne marche pas avec les banches distantes (remote) que d'autres personnes utilisent.",
            "",
            "Pour pouvoir annuler des changements et *partager* ces annulations avec d'autres, nous devons utiliser `git revert`. Regardons comment cela fonctionne"
          ],
          "afterMarkdowns": [
            "Étrangement, un nouveau commit est apparu en bas sous le commit que nous voulions annuler. C'est parce que ce nouveau commit `C2'` introduit des *modifications* -- celles qui correspondent justement à l'annulation de celles du commit `C2`.",
            "",
            "Avec revert, vous pouvez diffuser (push) vos modifications et les partager avec tout le monde."
          ],
          "command": "git revert HEAD",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour accomplir ce niveau, annulez les deux derniers commits à la fois sur `local` et sur `pushed`.",
            "",
            "Ayez à l'esprit que `pushed` est une branche distante et `local` est une branche locale ; cela devrait vous guider dans le choix de la méthode à employer."
          ]
        }
      }
    ]
  },
  "many-rebases-name": "Rebaser plus de 1000 fois",
  "many-rebases-hint": "Rappelez-vous, la façon la plus efficace peut être de mettre à jour master seulement à la fin ...",
  "many-rebases-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Rebaser plusieurs branches",
            "",
            "Dis-donc, nous avons beaucoup de branches par ici ! Rebasons tout le travail de ces branches dans master.",
            "",
            "Les patrons rendent cela encore plus compliqué -- ils veulent que les commits soient fait de manière séquentielle. Cela signifie donc que dans votre arbre final `C7'` est tout en bas, `C6'` juste au-dessus, et ainsi de suite, tout dans cet ordre.",
            "",
            "Si vous faites une erreur en chemin, n'hésitez pas à utiliser `reset` pour recommencer. Pensez à comparer votre solution à la notre et voyez si vous pouvez le faire en moins de commandes !"
          ]
        }
      }
    ]
  },
  "selective-rebase-name": "Branche spaghetti",
  "selective-rebase-hint": "Faites attention à tout faire dans le bon ordre ! La branche one d'abord, puis la seconde, puis la troisième",
  "selective-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branche spaghetti",
            "",
            "WOAHHHhhh ! Nous avons pas mal d'objectifs dans ce niveau.",
            "",
            "Actuellement nous avons `master` qui se situe quelques commits devant les branches `one` `two` et `three`. Pour une raison quelconque, nous avons besoin de mettre ces trois branches à jour avec les modifications des derniers commits sur master.",
            "",
            "La branche `one` a besoin d'une réorganisation et de la suppression de `C5`. `two` doit simplement être reordonnée, et `three` ne nécessite qu'un commit !",
            "",
            "Nous vous laissons imaginer la solution pour ce niveau ; comparez avec notre solution après-coup avec la commande `show solution`. "
          ]
        }
      }
    ]
  },
  "clone-name": "Introduction à clone",
  "clone-hint": "Simplement git clone !",
  "clone-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Remotes",
            "",
            "Les dépôts distants (remote repositories) ne sont pas si compliqués que ça. Dans l'ère actuelle du cloud computing il est facile de croire qu'il y a un peu de magie derrière les branches distantes, mais elles sont en fait juste des copies de votre dépôt local sur un autre ordinateur. Vous pouvez donc vous connecter à cet ordinateur par Internet, ce qui vous permet de transférer les commits en retard et en avance.",
            "",
            "Cela dit, les branches distantes ont plusieurs propriétés puissantes :",
            "",
            "- Avant toute chose, le dépôt distant sert de sauvegarde ! Le dépôt local de git a la capacité de restaurer des fichiers à un état précédent (comme vous le savez), mais toutes les informations sont stockées localement. En ayant des copies de votre dépôt git sur d'autres ordinateurs, vous pouvez perdre vos données et toujours repartir de là où vous en étiez resté.",
            "",
            "- Plus important encore, les dépôts distants sociabilisent le projet ! Maintenant qu'il est hébergé quelque part ailleurs, vos amis peuvent y contribuer facilement (ou récupérer vos derniers changements).",
            "",
            "Il est devenu courant de visualiser l'activité sur dépôt distant via des sites internet (comme [Github](https://github.com/) ou [Phabricator](http://phabricator.org/)), mais les dépôts distants servent _toujours_ de colonne vertébrale à ce système. C'est donc important de les comprendre !"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Les commandes pour créer des dépôts distants",
            "",
            "Jusqu'à maintenant, Learn Git Branching s'est surtout concentré sur l'apprentissage des bases du travail sur un dépôt _local_ (branch, merge, rebase, etc). Cependant maintenant nous voulons savoir comment travailler sur les dépôts distants, nous avons besoin d'une commande pour l'environnement de ces leçons. `git clone` sera cette commande.",
            "",
            "Techniquement, `git clone` dans le monde réel sera la commande que vous utiliserez pour créer des copies _locales_ des dépôts distants (de github par exemple). Nous utilisons cette commande un peu différemment dans Learn Git Branching car `git clone` crée ici un dépôt distant à partir de votre dépôt local. Il est certain qu'il s'agit donc du sens opposé de la commande originale, mais cela aide à construire la connexion entre le clonage et le travail sur le dépôt distant, travaillons donc avec cela pour l'instant.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Commençons doucement et regardons à quoi ressemble un dépôt distant (dans notre visualisation).",
            ""
          ],
          "afterMarkdowns": [
            "Nous y sommes ! Maintenant nous avons un dépôt distant de notre projet. Cela ressemble fortement à d'habitude, en dehors de quelques changements pour rendre compte des différences -- dans les niveaux suivants vous allez voir comment partager le travail entre ces dépôts."
          ],
          "command": "git clone",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour finir ce niveau, faites simplement un `git clone` du dépôt existant. Le réel apprentissage arrivera dans les prochaines leçons."
          ]
        }
      }
    ]
  },
  "fake-teamwork-name": "Simulation du travail d'équipe",
  "fake-teamwork-hint": "rappelez-vous que vous pouvez spécifier le nombre de commits à simuler",
  "fake-teamwork-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Simuler la collaboration",
            "",
            "C'est là que cela devient compliqué : pour certaines des leçons à venir, nous avons besoin de vous enseigner comment récupérer les changements effectués sur le dépôt distant.",
            "",
            "Cela signifie que nous devons \"prétendre\" que le dépôt distant a été modifié par un collègue / ami / collaborateur, et parfois même sur une branche spécifique ou avec plusieurs commits.",
            "",
            "Pour faire cela, nous introduisons à point nommé la commande `git fakeTeamwork` ! Elle devrait vous paraître assez intuitive, voyons une démo..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Le comportement par défaut de `fakeTeamwork` est tout simplement de faire apparaître un commit sur le master distant :"
          ],
          "afterMarkdowns": [
            "Voilà : le dépôt distant a été mis à jour avec un nouveau commit, et nous n'avons pas encore téléchargé ce commit parce que nous n'avons pas exécuté la commande `git fetch`."
          ],
          "command": "git fakeTeamwork",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vous pouvez aussi spécifier le nombre de commits ou la branche en les ajoutant à la fin de la commande."
          ],
          "afterMarkdowns": [
            "Avec une seule commande, nous avons simulé un collègue ayant pushé 3 commits sur la branche `foo` de notre dépôt distant"
          ],
          "command": "git fakeTeamwork foo 3",
          "beforeCommand": "git branch foo; git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Les niveaux suivants vont devenir assez difficiles, donc nous augmentons un peu la difficulté de cet exercice.",
            "",
            "Vous devrez créer un dépôt distant (avec `git clone`), simuler quelques changements sur ce dépôt, commiter les vôtres, et enfin appliquer les changements distants dans votre dépôt local (pull). C'est presque plusieurs leçons en une !"
          ]
        }
      }
    ]
  },
  "fetch-name": "Git fetch",
  "fetch-hint": "Exécuter juste git fetch",
  "fetch-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Fetch",
            "",
            "Travailler avec les dépôts gits distants se résume en pratique à transférer nos données _depuis_ et _vers_ ces autres dépôts. Du moment que nous pouvons envoyer des commits en avance et en retard, nous pouvons partager tous les types de mises à jour qui sont gérées par git (et donc partager notre travail, de nouveaux fichiers, de nouvelles idées, des lettres d'amour, etc.).",
            "",
            "Dans cette leçon nous allons apprendre comment rapporter (fetch) des données _depuis_ un dépôt distant vers le nôtre : la commande pour cela est astucieusement dénommée `git fetch`.",
            "",
            "Vous allez remarquer qu'au moment où nous mettons à jour notre version du dépôt distant, nos branches _distantes_ vont se mettre à jour pour refléter cette nouvelle représentation. Cela est lié à la leçon précédente sur les branches distantes."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Avant d'aller dans les détails de `git fetch`, voyons-le en action ! Ici nous avons un dépôt distant qui contient deux commits que notre dépôt local n'a pas."
          ],
          "afterMarkdowns": [
            "Voilà ! Les commits `C2` et `C3` ont été téléchargés dans notre dépôt local, et notre branche distante `o/master` a été mise à jour pour refléter cela."
          ],
          "command": "git fetch",
          "beforeCommand": "git clone; git fakeTeamwork 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Ce que fetch fait",
            "",
            "`git fetch` procède en deux étapes principales, ni plus ni moins. Cela :",
            "",
            "* télécharge les commits que le dépôt distant possède mais qui ne sont pas dans le nôtre, puis...",
            "* met à jour nos branches distantes (par exemple, `o/master`).",
            "",
            "`git fetch` prend en fait notre représentation _locale_ du dépôt distant pour la synchroniser avec ce à quoi le dépôt distant ressemble _réellement_ (à ce moment-là).",
            "",
            "Si vous vous rappelez de la précédente leçon, nous avons dit que les branches distantes reflètent l'état du dépôt distant _depuis_ la dernière fois où vous avez parlé à ces branches distantes. `git fetch` est le moyen de parler à ces branches distantes ! La relation entre `git fetch` et les branches distantes devrait vous apparaître clairement maintenant.",
            "",
            "`git fetch` contacte le dépôt distant par Internet (via un protocole comme `http://` ou `git://`).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Ce que fetch ne fait pas",
            "",
            "`git fetch`, cependant, ne change rien à _votre_ état local. Il ne met pas à jour votre branche `master` et ne va pas changer quelque chose aux fichiers qui se trouvent actuellement dans votre répertoire de travail.",
            "",
            "C'est important à comprendre car un nombre important de développeurs pensent qu'exécuter `git fetch` va mettre leur dépôt local dans le même état que le distant. Cela peut télécharger toutes les données nécessaires pour faire cela, mais cela ne change en réalité _rien_ sur vos fichiers locaux. Les prochains niveaux seront justement dédiés aux commandes qui permettent de faire cela :D",
            "",
            "Au bout du compte, vous pouvez vous représenter `git fetch` comme une étape de téléchargement."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour finir ce niveau, exécuter simplement `git fetch` et téléchargez tous les commits !"
          ]
        }
      }
    ]
  },
  "fetch-args-name": "Arguments de fetch",
  "fetch-args-hint": "Faites attention à la façon dont les ids des commits ont été intervertis ! Vous pouvez lire une nouvelle fois les slides avec \"help level\"",
  "fetch-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Les arguments de git fetch",
            "",
            "Nous savons maintenant tout ce qu'il y a à savoir sur les arguments de git push, y compris le paramètre `<place>` et la ponctuation pour refspecs (`<source>:<destination>`). Pouvons-nous utiliser ces connaissances avec `git fetch` également ?",
            "",
            "Bien sûr ! Les arguments de `git fetch` sont en fait *très, très* similaires à ceux de `git push`. Il s'agit des mêmes concepts mais simplement appliqués dans le sens opposé (puisque maintenant vous récupérez des commits plutôt que de les envoyer).",
            "",
            "Voyons ces concepts un par un..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Le paramètre `<place>`",
            "",
            "Si vous spécifiez un emplacement à git fetch, comme dans la commande suivante :",
            "",
            "`git fetch origin foo`",
            "",
            "Git va aller à la branche distante `foo`, récupérer tous les commits qui ne sont pas présents localement, puis les rapatrier dans la branche locale `o/foo`.",
            "",
            "Voyons cela en action (juste pour réviser)."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "En spécifiant un emplacement..."
          ],
          "afterMarkdowns": [
            "Nous téléchargeons uniquement les commits de `foo` et les plaçons dans `o/foo`."
          ],
          "command": "git fetch origin foo",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Vous vous posez peut-être la question : pourquoi git a-t-il fait apparaître ces commits dans la branche distante `o/foo` plutôt que les placer directement dans ma branche locale `foo` ? Je croyais que le paramètre `<place>` était un emplacement qui existait à la fois localement et sur le dépôt distant ?",
            "",
            "En fait git fait une exception dans ce cas parce que vous pourriez avoir du travail en cours dans la branche `foo` que vous ne voulez pas écraser !! Cela provient de ce que nous avions vu dans la leçon précédente sur `git fetch` : cette commande ne met pas à jour vos branches locales, elle télécharge uniquement les commits (pour que vous puissiez les inspecter et/ou les fusionner plus tard).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "\"Bon, mais dans ce cas, que se passe-t-il si je spécifie explicitement la source et la destination avec `<source>:<destination>` ?\"",
            "",
            "Si vous vous sentez assez déterminé pour rapatrier (fetch) des commits *directement* dans votre branche locale, alors oui vous pouvez préciser cela avec la notation refspec. Vous ne pouvez cependant pas rapatrier les commits dans la branche courante.",
            "",
            "Il y a un petit piège cependant : dans ce cas précis `<source>` est l'emplacement sur le dépôt *distant* et `<destination>` l'emplacement sur le dépôt *local* où seront placés ces commits. C'est l'exact opposé de git push, et cela se tient puisque nous transférons des données dans le sens opposée !",
            "",
            "Cela dit, les développeurs utilisent rarement cette syntaxe en pratique. Je l'introduis principalement pour concrétiser le fait que `fetch` et `push` sont très similaires, fonctionnant simplement dans des sens opposées."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Voyons ce délire en action :"
          ],
          "afterMarkdowns": [
            "Wow ! Vous voyez, git a résolu `foo~1` comme un emplacement sur origin et a ensuite téléchargé les commits dans `bar` (qui était une branche locale). Remarquez aussi que `foo` et `o/foo` n'ont pas été mises à jour puisque nous avons spécifié une destination."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Que se passe-t-il si l'emplacement n'existe pas avant que j'exécute la commande ? Voyons cela dans ce dernier slide, en nous mettant dans la situation où `bar` n'existe pas encore."
          ],
          "afterMarkdowns": [
            "Vous voyez, c'est COMME un git push. Git a créé la destination localement avant le fetch, exactement comme avec push il crée au préalable la destination sur le dépôt distant (si elle n'existe pas)."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Pas d'arguments ?",
            "",
            "Si `git fetch` ne reçoit pas d'arguments, cela télécharge simplement tous les commits du dépôt distant au sein de toutes les branches distantes..."
          ],
          "afterMarkdowns": [
            "Assez simple, mais ce n'était pas inutile de voir en action."
          ],
          "command": "git fetch",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, assez parlé ! Pour finir ce niveau, faites simplement un fetch des commits indiqués dans la fenêtre de visualisation de l'objectif. Faites-vous plaisir !",
            "",
            "Vous devrez préciser la source et la destination pour les deux commandes fetch. Faites attention à l'objectif puisque les IDs peuvent avoir été intervertis !"
          ]
        }
      }
    ]
  },
  "fetch-rebase-name": "Historique divergent",
  "fetch-rebase-hint": "regardez l'ordre dans la fenêtre de visualisation d'objectif",
  "fetch-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Travail divergent",
            "",
            "Jusqu'à présent nous avons vu comment rapatrier (`pull`) les commits de nos collaborateurs et comment envoyer les nôtres (`push`). Cela a l'air simple, alors comment certains peuvent trouver le sujet aussi confus ?",
            "",
            "La difficulté arrive quand l'historique du dépôt *diverge*. Avant d'aborder les détails de cette situation, voyons un exemple ...",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Imaginez que vous clonez un dépôt le lundi et commencez à bidouiller une nouvelle fonctionnalité. Le vendredi vous êtes prêt à publier votre fonctionnalité -- mais oh non ! Vos collègues ont écrit une floppée de code durant la semaine, ce qui rend votre fonctionnalité désuète (et obsolète). Ils ont aussi publié sur le dépôt distant partagé, donc maintenant *votre* travail est basé sur une *vieille* version du projet qui n'est plus viable.",
            "",
            "Dans ce cas, la commande `git push` est ambiguë. Si vous exécutez `git push`, git devrait-il remettre le dépôt distant tel qu'il était lundi ? Doit-il essayer d'ajouter votre code sans supprimer le nouveau code ? Ou doit-il totalement ignorer vos changements puisqu'ils ne sont plus à jour ?",
            "",
            "Comme il y a trop d'ambiguïté dans cette situation (où l'historique a divergé), git ne vous autorise pas à faire un `push` de vos changements. Cela vous force en fait à rapatrier chez vous le dernier état du dépôt distant avant de pouvoir partager votre travail."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Assez parlé ! Observons cette situation en action :"
          ],
          "afterMarkdowns": [
            "Vous voyez ? Rien ne s'est produit car la commande a échoué. `git push` a échoué car votre plus récent commit `C3` est basé sur le dépôt distant sur `C1`. Le dépôt distant a depuis été mis à jour avec `C2`, donc git rejette votre push."
          ],
          "command": "git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Comment allez-vous résoudre cette situation ? C'est facile, tout ce que vous avez à faire est de baser votre travail sur la dernière version de la branche distante.",
            "",
            "Il y a plusieurs façons de faire cela, mais la plus directe est de déplacer votre travail avec rebase. Regardons à quoi cela ressemble."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Maintenant si nous rebasons avant de push..."
          ],
          "afterMarkdowns": [
            "Boum ! Nous avons mis à jour notre représentation locale du dépôt avec `git fetch`, rebasé notre travail pour refléter les nouveaux changements, et enfin les avons envoyés avec `git push`."
          ],
          "command": "git fetch; git rebase o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Existe-t-il d'autres façons de mettre à jour notre travail quand le répertoire distant a été mis à jour ? Bien sûr ! Faisons la même chose, mais cette fois avec `merge`.",
            "",
            "Bien que `git merge` ne déplace pas votre travail (et crée à la place un commit de fusion), cette commande est également une façon de dire à git que vous avez incorporé tous les changements du dépôt distant. En effet la branche distante est maintenant une *ancêtre* de votre propre branche, ce qui signifie que vos commits contiennent tous les changements faits sur la branche distante.",
            "",
            "Voyons une démonstration ..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Maintenant si nous mergeons au lieu de rebaser ..."
          ],
          "afterMarkdowns": [
            "Boum ! Nous avons mis à jour notre représentation locale du dépôt distant avec `git fetch`, *fusionné* les nouveaux commits dans notre copie de travail (pour refléter les nouveaux changements du dépôt distant), et les avons ensuite envoyés avec `git push`."
          ],
          "command": "git fetch; git merge o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Impressionnant ! Existe-t-il une façon de faire tout cela sans taper autant de commandes ?",
            "",
            "Bien sûr : vous savez déjà que `git pull` est simplement un raccourci pour un fetch puis un merge. De manière assez pratique, `git pull --rebase` est un raccourci pour un fetch puis un rebase !",
            "",
            "Voyons ce raccourci au travail."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Premièrement avec  `--rebase`..."
          ],
          "afterMarkdowns": [
            "Comme avant ! Juste un peu plus court."
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Et maintenant avec un `pull` normal :"
          ],
          "afterMarkdowns": [
            "A nouveau, c'est exactement la même chose qu'auparavant !"
          ],
          "command": "git pull; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Cette succession de fetch, rebase/merge, et push est assez commune. Dans les leçons suivantes, nous explorerons cette façon de d'enchaîner les commandes dans des conditions plus complexes, mais pour le moment appliquons ce principe de façon classique.",
            "",
            "Pour finir ce niveau, réalisez les étapes suivantes :",
            "",
            "* Clonez votre dépôt",
            "* Simulez un travail d'équipe (1 commit)",
            "* Commitez un peu de votre travail (1 commit)",
            "* Publiez votre travail avec *rebase*"
          ]
        }
      }
    ]
  },
  "merge-many-features-name": "Fusionner avec les branches distantes",
  "merge-many-features-hint": "Respectez l'arbre représentant l'objectif !",
  "merge-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Pourquoi pas merge ?",
            "",
            "Dans le but d'envoyer de nouvelles modifications sur le dépôt distant, la seule étape préliminaire est *d'incorporer* les derniers changements de ce dépôt dans le nôtre. Concrètement, vous pouvez faire un rebase *ou* un merge de la branche distante (c'est à dire de `o/master`).",
            "",
            "Donc si l'on peut faire les deux méthodes, pourquoi les leçons se sont-elles concentrées sur rebase jusqu'à présent ? Pourquoi préfère-t-on souvent éviter `merge` lorsque l'on travaille avec les branches distantes ?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Au sein de la communauté des développeurs, il y a beaucoup de débats à propos des avantages et inconvénients de l'utilisation de merge ou de rebase. Voici les principaux arguments pour et contre rebase:",
            "",
            "Pour :",
            "",
            "* Rebase rend votre arbre de commits très propre puisqu'il ressemble à une ligne droite.",
            "",
            "Contre :",
            "",
            "* Rebase modifie l'historique (apparent) de l'arbre des commits.",
            "",
            "Par exemple, le commit `C1` peut être rebasé *après* `C3`. Cela fait croire que le travail de `C1'` est arrivé après `C3` alors qu'en réalité il était achevé et commité avant.",
            "",
            "Certains développeurs aiment préserver l'historique et préfèrent donc merge. Les autres (comme moi) préfèrent avoir un arbre des commits propre et préfèrent rebase. C'est une question de goût :D"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour ce niveau, essayons de résoudre la même situation qu'au niveau précédent, mais cette fois en utilisant *merge*. Cela peut être un peu périlleux mais cela illustre bien le problème."
          ]
        }
      }
    ]
  },
  "pull-name": "Git pull",
  "pull-hint": "Utilisez facilement git pull !",
  "pull-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Pull",
            "",
            "Maintenant que vous avez vu comment rapatrier des données depuis un dépôt distant avec `git fetch`, mettons à jour notre copie de travail pour refléter ces changements !",
            "",
            "Il existe en fait beaucoup de façons de faire cela -- une fois que vous avez de nouveaux commits disponibles localement, vous pouvez les incorporer dans votre branche de travail comme s'ils étaient des commits normaux d'autres branches. Cela signifie que pourriez simplement exécuter des commandes comme :",
            "",
            "* `git cherry-pick o/master`",
            "* `git rebase o/master`",
            "* `git merge o/master`",
            "* etc., etc.",
            "",
            "En fait, le principe de *rapatrier* (fetch) les branches distantes puis les *fusionner* (merge) est si commun que git a en réalité une commande pour faire les deux à la fois ! Cette commande est `git pull`."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Voyons d'abord un `fetch` puis un `merge` exécutés séquentiellement"
          ],
          "afterMarkdowns": [
            "Boum -- nous avons téléchargé `C3` avec un `fetch` et ensuite nous avons fusionné ce travail dans notre copie avec `git merge o/master`. Maintenant notre branche `master` reflète le nouveau travail du dépôt distant (dans ce cas, nommé `origin`)"
          ],
          "command": "git fetch; git merge o/master",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Que se passerait-il si nous utilisions plutôt `git pull` ?"
          ],
          "afterMarkdowns": [
            "La même chose ! Cela devrait maintenant être clair que `git pull` est surtout un raccourci pour `git fetch` suivi d'un merge de toutes les branches qui viennent d'avoir un fetch."
          ],
          "command": "git pull",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Nous allons explorer les détails de `git pull` plus tard (y compris options et arguments), mais pour ce niveau pratiquons d'abord la technique de base.",
            "",
            "Rappelez-vous : vous pouvez aussi résoudre ce niveau avec `fetch` et `merge`, mais cela vous coûtera une commande supplémentaire :P"
          ]
        }
      }
    ]
  },
  "pull-args-name": "Arguments de pull",
  "pull-args-hint": "Vous pouvez aussi créer une nouvelle branche locale avec les arguments de fetch/pull",
  "pull-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Les arguments de git pull",
            "",
            "Maintenant que vous savez presque *tout* ce qu'il y a à savoir sur les arguments de `git fetch` et `git push`, il n'y a presque plus rien à vous apprendre sur git pull :)",
            "",
            "C'est parce que git pull est en fait *juste* un raccourci pour un fetch suivi d'un merge de tout ce qui vient d'être rapatrié. Vous pouvez vous représenter git pull comme un git fetch avec les *mêmes* arguments, suivi d'un merge qui aura lieu à l'endroit *exact* où ces commits seront arrivés.",
            "",
            "Cela fonctionne même quand vous utilisez des arguments très compliqués. Voyons quelques exemples :"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Voici quelques commandes équivalentes dans git :",
            "",
            "`git pull origin foo` est équivalent à :",
            "",
            "`git fetch origin foo; git merge o/foo`",
            "",
            "Et :",
            "",
            "`git pull origin bar~1:bugFix` est équivalent à :",
            "",
            "`git fetch origin bar~1:bugFix; git merge bugFix`",
            "",
            "Vous voyez ? git pull est au fond un simple un raccourci pour fetch + merge, et tout ce qui lui importe est la destination des commits (l'argument `destination` qu'il utilise durant le fetch).",
            "",
            "Voyons une démonstration :"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Si nous précisons l'emplacement à rapatrier tout se passe comme précédemment, avec fetch, mais en sus nous fusionnons tout ce qui a été rapatrié."
          ],
          "afterMarkdowns": [
            "Vu ? En précisant `master` nous avons téléchargé les commits dans `o/master` comme d'habitude. Puis nous avons fusionné `o/master` avec là où nous sommes, *sans nous soucier* de la branche courante."
          ],
          "command": "git pull origin master",
          "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Cela fonctionne-t-il aussi bien avec une source et une destination ? Et oui ! Voyons cela :"
          ],
          "afterMarkdowns": [
            "Wow, INCROYABLE tout ce que nous avons fait en une commande. Nous avons créé une branche locale nommée `foo`, téléchargé les commits depuis la branche master distante dans `foo`, et ensuite fusionné cette branche dans notre branche actuelle de travail (checkoutée) `bar` !!!"
          ],
          "command": "git pull origin master:foo",
          "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, pour finir ce niveau reproduisez l'état de la fenêtre Objectif. Vous aurez besoin de télécharger quelques commits, de créer des branches et de les fusionner dans d'autres branches, mais cela ne devrait pas utiliser trop de commandes :P"
          ]
        }
      }
    ]
  },
  "push-name": "Git push",
  "push-hint": "Rappelez-vous que vous devez cloner avant de pouvoir faire un push !",
  "push-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Push",
            "",
            "Ok, donc j'ai rapatrié les changements du dépôt distant et je les ai incorporés dans mon travail local. C'est super... mais comment je partage _mon_ travail génial avec tous les autres ?",
            "",
            "En fait, la manière d'envoyer du travail à partager fonctionne à l'opposé du téléchargement de travail partagé. Et quel est l'opposé de `git pull` (tire) ? `git push` (pousse) !",
            "",
            "`git push` est responsable de l'envoi de _vos_ changements vers un dépôt distant et de la mise à jour de ce dépôt pour incorporer vos commits. Une fois `git push` terminé, tous vos amis peuvent télécharger votre travail depuis le dépôt distant.",
            "",
            "Vous pouvez voir `git push` comme une commande qui \"publie\" votre travail. Elle présente quelques subtilités que nous allons voir rapidement, mais commençons par le B.A.-BA...",
            "",
            "*Note : le comportement de `git push` avec aucun argument varie avec l'un des réglages de configuration de git nommé `push.default`. La valeur par défaut de ce réglage dépend de la version de git utilisée, mais nous allons utiliser la valeur `upstream` dans nos leçons. Cela ne change pas grand chose pour ces exercices, mais vérifiez tout de même vos réglages avant de pusher vos propres projets.*"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Nous avons fait ici quelques changements que le dépôt distant n'a pas. Envoyons-les !"
          ],
          "afterMarkdowns": [
            "Et voilà : le dépôt distant a reçu le commit `C2`, la branche `master` a été mise à jour sur `C2`, et votre *propre* représentation de la branche distante (`o/master`) a aussi été mise à jour. Tout est synchronisé !"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour finir ce niveau, partagez simplement deux nouveaux commits avec le dépôt distant. Accrochez-vous, parce que ces leçons vont devenir beaucoup plus difficiles !"
          ]
        }
      }
    ]
  },
  "push-args-name": "Arguments de git push",
  "push-args-hint": "Vous pouvez toujours regarder le dernier slide des dialogues en tapant \"objective\".",
  "push-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Les arguments de push",
            "",
            "Bien ! Maintenant que vous connaissez le suivi des branches, nous pouvons fouiller ce qui se cache derrière le fonctionnement de push, fetch, et pull. Nous allons aborder une commande à la fois, mais elles sont très similaires.",
            "",
            "En premier lieu regardons `git push`. Vous avez appris dans la leçon sur le suivi des branches distantes que git détermine le dépôt distant *et* la branche à envoyer en regardant les propriétés de la branche courante (c'est à dire la branche distante que cette dernière \"suit\" -- track). C'est le comportement rencontré quand aucun argument n'est spécifié, mais git push accepte aussi des arguments de la forme :",
            "",
            "`git push <remote> <place>`",
            "",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Qu'est ce que ce paramètre `<place>` ? Avant de passer à l'explication, voyons d'abord un exemple. La commande suivante :",
            "",
            "`git push origin master`",
            "",
            "peut se traduire en français par :",
            "",
            "*Va dans la branche \"master\" de mon dépôt, récupère tous les commits, et ensuite va dans la branche distante \"master\" sur le dépôt nommé \"origin\". Envoie tous les commits qui lui manquent sur cette branche distante puis préviens-moi quand c'est terminé.*",
            "",
            "En spécifiant `master` comme argument `<place>`, nous avons dit à git *d'où* les commits venaient et où ils *allaient*. C'est en fait \"l'emplacement\" à synchroniser entre les deux dépôts.",
            "",
            "Gardez à l'esprit que nous avons dit à git tout ce dont il a besoin pour opérer (en précisant les deux arguments), il n'a donc absolument pas besoin de savoir quelle est la branche courante !"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Voyons un exemple d'arguments. Notez bien où se trouve `HEAD` dans cet exemple."
          ],
          "afterMarkdowns": [
            "Voilà ! `master` a été mise à jour puisque nous avons spécifié ces arguments."
          ],
          "command": "git checkout C0; git push origin master",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Et si nous n'avions pas mis d'arguments ? Que ce serait-il passé ?"
          ],
          "afterMarkdowns": [
            "La commande échoue (comme vous pouvez le voir), car `HEAD` ne se trouve pas sur une branche configurée pour suivre une branche distante."
          ],
          "command": "git checkout C0; git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, pour ce niveau mettez à jour `foo` et `master` sur le dépôt distant. La difficulté est que `git checkout` est désactivée pour ce niveau !"
          ]
        }
      }
    ]
  },
  "push-args2-name": "Arguments de git push -- toujours plus !",
  "push-args2-hint": "N'oubliez pas que vous pouvez toujours déclarer forfait avec \"show solution\" :P",
  "push-args2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## L'argument `<place>` dans le détail",
            "",
            "Rappelez-vous de notre dernière leçon : quand vous passiez `master` comme argument `<place>` à git push, cela spécifiait à la fois la *source* de provenance des commits et leur *destination*.",
            "",
            "Vous vous demandez peut-être donc : et si nous voulions avoir une source et une destination différentes ? Et si vous voulez envoyez des commits de la branche locale `foo` dans la branche distante `bar` ?",
            "",
            "Malheureusement ce n'est pas possible avec git... Mais non, je plaisante ! Bien sûr que c'est possible :)... git a des tonnes de flexibilité (presque trop).",
            "",
            "Voyons cela au prochain slide..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour spécifier la source et la destination dans `<place>`, on les joint simplement par deux points :",
            "",
            "`git push origin <source>:<destination>`",
            "",
            "On en parle souvent comme d'un \"refspec\". Refspec est juste un nom exotique pour un emplacement que git peut résoudre (comme la branche `foo` ou juste `HEAD~1`)",
            "",
            "Lorsque vous utilisez cette notation permettant de préciser la source et la destination indépendamment, vous pouvez produire des commandes à la fois très sophistiquées et très précises pour travailler avec les dépôts distants. Faisons une démo !"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Rappelez-vous, `source` peut être n'importe quel emplacement que git peut résoudre :"
          ],
          "afterMarkdowns": [
            "Woahou ! C'est une commande très alambiquée mais qui a du sens : git résoud `foo^` en un emplacement, envoie tous les commits qui n'étaient pas encore présents sur le dépôt distant, et met ensuite à jour la branche de destination."
          ],
          "command": "git push origin foo^:master",
          "beforeCommand": "git clone; go -b foo; git commit; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Que se passe-t-il quand la destination du push n'existe pas encore ? Pas de problème ! Donnez simplement un nom de branche et git va créer la branche distante pour vous."
          ],
          "afterMarkdowns": [
            "Cool, c'est habile :D"
          ],
          "command": "git push origin master:newBranch",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour ce niveau, essayez d'atteindre l'état montré dans la fenêtre d'objectif, et souvenez-vous du format :",
            "",
            "`<source>:<destination>`"
          ]
        }
      }
    ]
  },
  "push-many-features-name": "Maître du push !",
  "push-many-features-hint": "Rappelez-vous que vous pouvez toujours utiliser les commandes undo et reset.",
  "push-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Fusionner les feature branches",
            "",
            "Maintenant que vous êtes habitué à fetch, pull et push, mettons ces compétences à profit avec une autre approche de travail.",
            "",
            "Il est commun pour les développeurs de gros projets de faire tout leur travail dans des \"feature branches\" dédiées à une fonctionnalité (en dehors de `master`) et d'intégrer ce travail au reste seulement une fois qu'il est prêt. C'est similaire à la leçon précédente (où les branches secondaires étaient pushées sur le dépôt distant), mais ici nous introduisons une étape supplémentaire.",
            "",
            "Certains développeurs utilisent la méthode \"push puis pull\" uniquement sur la branche `master` : de cette manière `master` reste toujours à jour avec ce qu'il y a sur le dépôt distant (`o/master`).",
            "",
            "Cette approche combine donc deux choses :",
            "",
            "* intégrer le travail présent depuis la feature branch (la fonctionnalité développée) vers `master`, puis",
            "* pusher et puller sur le dépôt distant."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Rappelons-nous rapidement comment mettre à jour `master` et envoyer (push) le travail."
          ],
          "afterMarkdowns": [
            "Nous exécutons ici deux commandes :",
            "",
            "* on rebase notre travail sur de nouveaux commits, puis",
            "* on publie notre travail sur le dépôt distant"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ce niveau est assez conséquent ; voici l'idée générale de la solution :",
            "",
            "* Il y a trois feature branches : `side1` `side2` et `side3`",
            "* Nous voulons envoyer chacune de ces modifications, dans l'ordre, sur le dépôt distant",
            "* Le dépôt distant a été mis à jour entre-temps, donc nous avons aussi besoin d'intégrer ce travail",
            "",
            ":O difficile ! bonne chance, finir ce niveau est une grande étape."
          ]
        }
      }
    ]
  },
  "remote-branches-name": "Les branches distantes",
  "remote-branches-hint": "Prêtez attention à l'ordre -- les commits sur master d'abord !",
  "remote-branches-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Les branches distantes de git",
            "",
            "Maintenant que nous avons vu `git clone` en action, plongeons dans ce qui a changé.",
            "",
            "La première chose que vous avez peut-être remarqué est qu'une nouvelle branche est apparue dans votre dépôt local appelée `o/master`. Ce type de branche est appelée une branche _distante_ ; les branches distantes ont des propriétés spécifiques car elles servent à un but précis.",
            "",
            "Les branches distantes reflètent _l'état_ des dépôts distants (depuis la dernière fois où vous avez parlé avec ceux-ci). Elles vous aident à comprendre les différences entre votre travail et le travail public -- une étape critique à effectuer avant de partager son travail avec les autres.",
            "",
            "Les branches distantes ont une propriété particulière: quand vous vous rendez dessus (checkout), `HEAD` est détaché. Git fait cela car vous ne pouvez pas travailler sur ces branches directement ; vous devez travailler ailleurs et ensuite partager votre travail avec le dépôt distant (après quoi vos branches distantes seront mises à jour)."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Qu'est-ce que `o/`?",
            "",
            "Vous vous demandez peut-être ce qu'est le préfixe `o/` devant ces branches distantes. En pratique, les branches distantes ont aussi une convention de nommage (obligatoire) -- elles sont affichées avec le format :",
            "",
            "* `<nom dépôt distant>/<nom de la branche>`",
            "",
            "Donc, si vous regardez une branche nommée `o/master`, le nom de la branche est `master` et le nom du dépôt distant est `o`.",
            "",
            "La plupart des développeurs nomment leur principal dépôt distant `origin`, pas `o`. C'est si commun que git configure en fait votre dépôt local pour être nommé `origin` quand vous faîtes un `git clone` du dépôt.",
            "",
            "Malheureusement le nom complet `origin` ne rentre pas dans notre interface graphique et nous utilisons donc `o` comme raccourci :( Rappelez-vous juste que quand vous utilisez le vrai git, votre dépôt distant est probablement nommé `origin`!",
            "",
            "Cela fait beaucoup d'un coup, donc voyons cela en action."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Rendons-nous sur une branche et regardons ce qui se passe"
          ],
          "afterMarkdowns": [
            "Comme vous pouvez le voir, git nous a mis dans le mode \"detached\" (cf. `HEAD`) puis n'a pas mis à jour `o/master` quand nous avons ajouté un nouveau commit. C'est parce que `o/master` va se mettre à jour uniquement quand le dépôt distant sera mis à jour."
          ],
          "command": "git checkout o/master; git commit",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Pour finir ce niveau, faîtes un commit en dehors de `master` puis un après vous être rendu dans `o/master`. Cela va nous aider à comprendre la différence de comportement des branches distantes, et le fait qu'elles se mettent à jour uniquement pour refléter l'état du dépôt distant."
          ]
        }
      }
    ]
  },
  "source-nothing-name": "Source de rien du tout",
  "source-nothing-hint": "La commande branch est désactivée pour ce niveau, vous devrez donc utiliser fetch !",
  "source-nothing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Les bizarreries de `<source>`",
            "",
            "Git permet de faire deux choses contre-intuitives avec le paramètre `<source>`. Ces deux astuces viennent du fait que vous pouvez techniquement ne *rien* spécifier comme `source` valide pour git push et git fetch. Autrement dit laisser vide la partie gauche de la refspec (avant le deux-points) :",
            "",
            "* `git push origin :side`",
            "* `git fetch origin :bugFix`",
            "",
            "Voyons ce que cela fait ..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Qu'est-ce que produit l'envoi de \"rien\" sur une branche distante ? Cela la détruit !"
          ],
          "afterMarkdowns": [
            "Ici, nous avons brillamment supprimé  la branche `foo` du dépôt distant en lui envoyant le concept de \"rien\". Cela paraît à peu près logique..."
          ],
          "command": "git push origin :foo",
          "beforeCommand": "git clone; git push origin master:foo"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Ensuite, un fetch de \"rien\" dans un emplacement local crée une nouvelle branche."
          ],
          "afterMarkdowns": [
            "Très étrange, mais peu importe. C'est git !"
          ],
          "command": "git fetch origin :bar",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "L'exercice pour ce niveau est simple : supprimez d'abord une branche distante puis terminez en en créant une nouvelle (locale) avec `git fetch` !"
          ]
        }
      }
    ]
  },
  "tracking-name": "Suivi de branche distante",
  "tracking-hint": "Rappelez-vous qu'il existe deux façons de configurer le suivi de branche distante !",
  "tracking-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Le suivi des branches distantes",
            "",
            "Dans les dernières leçons, git savait que la branche `master` était reliée à `o/master`, et cela a pu vous paraître \"magique\". Il est certain que ces deux branches ont des noms similaires et il peut être logique de croire que la branche locale `master` est liée à la branche distante `master`, mais la relation n'est prouvée que dans deux scénarios :",
            "",
            "* Pendant un pull, les commits sont téléchargés dans `o/master` et ensuite *fusionnés* (merge) dans la branche `master`. La cible impliquée dans cette fusion est déterminée par cette relation.",
            "* Pendant un push, le travail de la branche `master` a été envoyé sur la branche distante `master` (qui est localement représentée par `o/master`). La *destination* du push est déterminée par la relation entre `master` and `o/master`.",
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
            "Pour faire court, cette relation entre `master` et `o/master` est simplement portée par la propriété \"remote tracking\" (suivi distant) des branches. La branche `master` est configurée pour suivre `o/master` : cela signifie qu'il y a une cible de fusion et une destination d'envoi implicites pour la branche `master`.",
            "",
            "Vous vous demandez peut-être comment cette propriété a été configurée pour la branche `master` alors que vous n'avez exécuté aucune commande pour le faire. Eh bien, quand vous clonez un dépôt avec git, cette propriété est configurée automatiquement. ",
            "",
            "Pendant le clonage, git crée une branche distante pour chaque branche du dépôt distant (c'est à dire des branches comme `o/master`). Il crée ensuite une branche locale qui suit la branche actuellement active sur le dépôt distant, qui se trouve être `master` dans la plupart des cas.",
            "",
            "Une fois que git clone est terminé, vous avez seulement une branche locale (comme ça vous n'êtes pas submergé) mais vous pouvez voir toutes les branches distantes (si vous êtes très curieux). C'est le compromis idéal !",
            "",
            "Cela explique aussi pourquoi vous avez peut-être vu la sortie suivante pendant le clonage :",
            "",
            "    local branch \"master\" set to track remote branch \"o/master\""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Puis-je configurer cette relation moi-même ?",
            "",
            "Absolument ! Vous pouvez suivre `o/master` depuis n'importe quelle branche, et si vous le faîtes, cette branche va avoir la même destination de push et cible de merge que pour `master`. Cela signifie que vous pouvez exécuter `git push` sur une branche nommée `totallyNotMaster` mais envoyer tout de même votre travail sur la branche `master` du dépôt distant !",
            "",
            "Il y a deux façons de configurer cette propriété. La première est de créer une nouvelle branche en la branchant immédiatement sur la branche distante, à l'aide de `git checkout -b` :",
            "",
            "`git checkout -b totallyNotMaster o/master`",
            "",
            "Cette commande crée une nouvelle branche nommée `totallyNotMaster` et la configure pour suivre `o/master`."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Assez parlé, faisons une démonstration ! Nous allons nous placer sur une nouvelle branche nommée `foo` et la configurer pour suivre `master` du dépôt distant."
          ],
          "afterMarkdowns": [
            "Comme vous pouvez le voir, nous avons utilisé la cible de fusion déclarée pour `o/master` afin de mettre à jour la branche `foo`. Remarquez que la branche master n'a pas été mise à jour !!"
          ],
          "command": "git checkout -b foo o/master; git pull",
          "beforeCommand": "git clone; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Cela s'applique aussi pour git push :"
          ],
          "afterMarkdowns": [
            "Boum. Nous avons envoyé notre travail sur `master` vers le dépôt distant alors que notre branche avait un nom totalement différent."
          ],
          "command": "git checkout -b foo o/master; git commit; git push",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Méthode n°2",
            "",
            "Une autre façon de configurer le suivi d'une branche est d'utiliser l'option `git branch -u`. La commande est alors :",
            "",
            "`git branch -u o/master foo`",
            "",
            "Ce qui va configurer la branche `foo` (déjà existante) pour suivre `o/master`. Si `foo` est la branche courante, vous pouvez même ne pas la préciser :",
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
            "Voyons cette autre manière de paramètrer le suivi d'une branche distante..."
          ],
          "afterMarkdowns": [
            "C'est la même chose, et c'est juste un peu plus explicite. Cool !"
          ],
          "command": "git branch -u o/master foo; git commit; git push",
          "beforeCommand": "git clone; git checkout -b foo"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok ! Pour ce niveau, envoyons notre travail sur la branche distante `master` en ne se trouvant *pas* sur la branche `master` locale. Je vous laisse chercher comment faire, puisque c'est une leçon de niveau avancé :P"
          ]
        }
      }
    ]
  },
  "sequence-intro-display": "Séquence d'introduction",
  "sequence-intro-about": "Une introduction en douceur à la majorité des commandes git",
  "sequence-rampup-display": "Montée en puissance",
  "sequence-rampup-about": "Le prochain excellent plat de pur git. J'espère que vous êtes affamés",
  "sequence-remote-display": "Push & Pull -- dépôts gits distants !",
  "sequence-remote-about": "C'est le temps de partager vos 1 et vos 0 les enfants, le code vient de devenir social.",
  "sequence-remote-advanced-display": "Vers l'infini et au-delà -- dépôts distants version avancée",
  "sequence-remote-advanced-about": "Et vous pensiez qu'être un dictateur bienfaisant serait amusant...",
  "sequence-move-display": "Déplacer le travail",
  "sequence-move-about": "Soyez alaise de modifier l'arbre Git",
  "sequence-mixed-display": "Un assortiment",
  "sequence-mixed-about": "Un assortiment de techniques et astuces pour utiliser Git",
  "sequence-advanced-display": "Sujets Avancés",
  "sequence-advanced-about": "Pour les plus courageux !",
  "dialogs-confirm": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Êtes-vous sûr de vouloir voir la solution ?",
          "",
          "Je crois en vous ! Vous pouvez le faire"
        ]
      }
    }
  ],
  "dialogs-level-builder": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Bienvenue dans l'éditeur niveaux !",
          "",
          "Voici les étapes principales :",
          "",
          "  * Mettez en place l'environnement initial avec des commandes git",
          "  * Définissez l'arbre de départ avec ```define start```",
          "  * Saisissez la série de commandes git qui composent la solution (optimale)",
          "  * Définissez l'arbre cible avec ```define goal```. Cela définit aussi la solution",
          "  * Optionnellement, définissez un indice avec ```define hint```",
          "  * Changez le nom avec ```define name```",
          "  * Optionellement, definissez un joli dialogue de départ avec ```edit dialog```",
          "  * Entrez la commande ```finish``` pour délivrer votre niveau JSON!"
        ]
      }
    }
  ],
  "dialogs-next-level": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Beau Travail!!",
          "",
          "Vous avez résolu le niveau en *{numCommands}* commande(s); ",
          "notre solution le fait en {best}."
        ]
      }
    }
  ],
  "dialogs-sandbox": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Bienvenue sur Learn Git Branching !",
          "",
          "Cette application a été conçue pour aider les débutants à saisir ",
          "les puissants concepts derrière les branches en travaillant ",
          "avec git. Nous espérons que vous apprécierez cette application et ",
          "que vous apprendrez peut-être quelque chose d'intéressant !",
          "",
          "# Démo !",
          "",
          "Si vous n'avez pas vu la démo, vous pouvez le faire là :",
          "",
          "[https://pcottle.github.io/learnGitBranching/?demo](https://pcottle.github.io/learnGitBranching/?demo)",
          "",
          "Agacé par ce dialogue ? Ajoutez `?NODEMO` à l'URL pour le supprimer, en lien ci-dessous pour votre commodité :",
          "",
          "[https://pcottle.github.io/learnGitBranching/?NODEMO](?NODEMO)"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Commandes Git",
          "",
          "Il existe une large variété de commandes git disponibles dans le mode bac à sable. Sont inclues :",
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
          "## Partager, c'est se soucier !",
          "",
          "Partagez des arbres avec vos amis via `export tree` et `import tree`",
          "",
          "Vous avez une grande leçon à partager ? Essayez de construire un niveau avec `build level` ou essayez le niveau d'un ami avec `import level`",
          "",
          "Pour voir la gamme complète des commandes, tapez `show commands`. Il y a quelques perles telles que `undo` et `reset`",
          "",
          "Mais tout de suite commencez sur les `levels`…"
        ]
      }
    }
  ],
  "finish-dialog-finished": "Félicitations, vous avez réussi le dernier niveau !",
  "finish-dialog-next": "Voulez-vous passer à *\"{nextLevel}\"*, le prochain niveau ?",
  "finish-dialog-win": "Fabuleux ! Votre solution a égalé ou surpassé notre solution.",
  "finish-dialog-lose": "Voyons si vous pouvez descendre à {best} :D",
  "hg-prune-tree": "Attention, Mercurial supprime de façon agressive et nécessite un prune du repository",
  "hg-a-option": "L'option -A n'est pas nécessaire pour cette application, simplemer commiter",
  "hg-error-no-status": "Il n'y a pas de commande status pour cette application, car il n'y a pas de fichier stagé. Essayé hg summary à la place.",
  "hg-error-need-option": "J'ai besoin de l'option {option} pour cette commande",
  "hg-error-log-no-follow": "hg log sans -f n'est pas supporté",
  "git-status-detached": "head détaché !",
  "git-status-onbranch": "Sur la branche {branch}",
  "git-status-readytocommit": "Prêt à commit ! (comme toujours dans cette démo)",
  "git-dummy-msg": "Commit rapide. NoMaN Sux!",
  "git-error-origin-fetch-uptodate": "Déjà à jour",
  "git-error-origin-fetch-no-ff": "Votre branche origin n'est plus synchronisée avec la branche distante et fetch ne peut pas être appliqué. Essayez avec l'option --force",
  "git-error-origin-push-no-ff": "Le dépôt distant a divergé de votre référentiel local, donc l'envoi de vos modifications n'est pas en simple avance rapide (et donc votre envoi a été rejeté). Veuillez récupérer les nouveaux changements depuis le dépôt distant, les intégrer dans cette branche, et essayez à nouveau. Vous pouvez le faire avec git pull ou git pull --rebase",
  "git-error-remote-branch": "Vous ne pouvez exécuter cette commande sur une branche distante",
  "git-error-origin-required": "Une origine est requise pour cette commande",
  "git-error-origin-exists": "Une origine existe déjà ! Vous ne pouvez pas en créer une nouvelle",
  "git-error-branch": "Vous ne pouvez supprimer la branche master, la branche sur laquelle vous êtes, ou ce qui n'est pas une branche",
  "git-merge-msg": "Merge de {target} dans {current}",
  "git-error-rebase-none": "Aucune commit à rebaser ! Tout est soit un commit de merge, soit des modifications déjà appliquées",
  "git-result-nothing": "Rien à effectuer…",
  "git-result-fastforward": "En avance rapide…",
  "git-result-uptodate": "Branche déjà à jour",
  "git-error-exist": "La référence {ref} n'existe pas ou est inconnue",
  "git-error-relative-ref": "Le commit {commit} n'a pas de correspondance {match}",
  "git-warning-detached": "Attention ! HEAD est détaché",
  "git-warning-add": "Aucun besoin d'ajouter des fichiers dans cette démo",
  "git-error-options": "Les options que vous avez spécifiées sont incompatibles ou incorrectes",
  "git-error-already-exists": "Le commit {commit} existe déjà dans votre ensemble de modifications, opération avortée !",
  "git-error-reset-detached": "On ne peut pas effectuer un reset quand head est détaché. Utilisez checkout pour déplacer",
  "git-warning-hard": "Le comportement par défaut est un --hard reset, soyez libre d'omettre cette option !",
  "git-error-staging": "Il n'y a pas le concept d'ajouter / mettre en staging, donc cette option ou commande est invalide",
  "git-revert-msg": "Revert {oldCommit}: {oldMsg}",
  "git-error-args-many": "J'attends au plus {upper} argument(s) pour {what}",
  "git-error-args-few": "J'attends au moins {upper} argument(s) pour {what}",
  "git-error-no-general-args": "Cette commande n'accepte aucun argument général",
  "copy-tree-string": "Copiez la chaîne d'arbre ci-dessous",
  "learn-git-branching": "Apprenez Git Branching",
  "select-a-level": "Choisissez un niveau",
  "branch-name-short": "Désolé, nous devons garder les noms de branches courts pour la visualisation. Votre nom de branche a été tronqué à 9 caractères, devenant \"{branch}\"",
  "bad-branch-name": "Ce nom de branche \"{branch}\" n'est pas autorisé",
  "bad-tag-name": "Le nom de tag \"{tag}\" n'est pas autorisé!",
  "option-not-supported": "L'option \"{option}\" n'est pas supportée",
  "git-usage-command": "git <commande> [<arguments>]",
  "git-supported-commands": "Commandes supportées",
  "git-usage": "Utilisation :",
  "git-version": "Git version PCOTTLE.1.0",
  "flip-tree-command": "Inversion de l'arbre...",
  "refresh-tree-command": "Actualisation de l'arbre…",
  "locale-command": "Langue changée à {locale}",
  "locale-reset-command": "Langue remise par défaut, qui est {locale}",
  "show-command": "Merci d'utiliser une des commandes suivantes pour obtenir plus d'info",
  "show-all-commands": "Ci-dessous est la liste de toutes les commandes disponibles :",
  "cd-command": "Répertoire changé à \"/directories/dont/matter/in/this/demo\" (les répertoires ne servent à rien dans cette démo)",
  "ls-command": "DontWorryAboutFilesInThisDemo.txt (ne vous préoccupez pas des noms de fichier dans cette démo)",
  "mobile-alert": "Impossible de faire apparaître le clavier sur mobile / tablette :( Essayez de passer sur un ordinateur de bureau :D",
  "share-tree": "Partagez cet arbre avec vos amis ! Ils peuvent le charger avec \"import tree\"",
  "paste-json": "Collez un blob JSON ci-dessous !",
  "solved-map-reset": "La carte des niveaux résolus a été effacée, vous repartez de zéro !",
  "level-cant-exit": "Vous n'êtes pas dans un niveau ! Vous êtes dans le mode bac à sable, commencez un niveau avec \"levels\"",
  "level-no-id": "Le niveau dont l'identifiant est {id} n'a pas été trouvé ! Ouverture de la vue de sélection des niveaux",
  "undo-stack-empty": "La pile d'annulation est vide !",
  "already-solved": "Vous avez déjà résolu ce niveau, essayez d'autres niveaux avec \"levels\" ou revenez au bac à sable avec \"sandbox\"",
  "command-disabled": "Cette commande git est désactivée pour ce niveau !",
  "share-json": "Voici le JSON pour ce niveau ! Partagez-le avec quelqu'un ou envoyez-le moi sur Github",
  "want-start-dialog": "Vous n'avez pas spécifié de dialogue de départ, voulez-vous en ajouter un ?",
  "want-hint": "Vous n'avez pas spécifié d'indice, voulez-vous en ajouter un ?",
  "prompt-hint": "Entrez l'indice pour ce niveau, ou laissez-le vide pour ne pas l'inclure",
  "prompt-name": "Entrez le nom pour ce niveau",
  "solution-empty": "Votre solution est vide !! Quelque chose ne tourne pas rond",
  "define-start-warning": "Redéfinition du point de départ… la solution et la cible seront écrasés s'ils ont déjà été définis",
  "help-vague-level": "Vous êtes dans un niveau, donc plusieurs formes d'aide sont disponibles. Merci de sélectionner soit \"help level\" pour en apprendre plus sur cette leçon, \"help general\" pour l'utilisation de Learn GitBranching, ou \"objective\" pour apprendre comment résoudre le niveau",
  "help-vague-builder": "Vous êtes dans l'éditeur de niveaux, donc plusieurs formes d'aide sont disponibles. Merci de sélectionner soit \"help general\" soit \"help builder\"",
  "show-goal-button": "Afficher les cibles",
  "hide-goal-button": "Cacher les cibles",
  "goal-to-reach": "Cible à atteindre",
  "goal-only-master": "<span class=\"fwber\">Note:</span> Dans ce niveau on ne doit faire de git checkout que sur la branche master. Les autres branches représentées ici (entourées d'un cadre en tirets) doivent être utilisées uniquement comme références. Comme toujours, vous pouvez cacher cette fenêtre avec \"Cacher les objectifs\"",
  "hide-goal": "Vous pouvez masquer cette fenêtre avec \"Cacher les cibles\"",
  "hide-start": "Vous pouvez masquer cette fenêtre avec \"hide start\"",
  "level-builder": "Éditeur de niveaux",
  "no-start-dialog": "Il n'y a aucun dialogue de départ à afficher pour ce niveau !",
  "no-hint": "Hum, il ne semble pas y avoir d'indice pour ce niveau :-/",
  "error-untranslated-key": "La traduction pour {key} n'existe pas encore :( Venez sur Github pour en offrir une !",
  "error-untranslated": "Ce message n'a pas encore été traduit dans votre langue :( Venez sur Github aider à la traduction !"
};
