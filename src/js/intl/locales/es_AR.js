module.exports = {
  "multiple-parents-name": "Múltiples padres",
  "multiple-parents-hint": "Usá `git branch bugWork` sobre algún commit para crear la referencia faltante",
  "multiple-parents-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Especificando los padres",
            "",
            "Como el modificador de `~`, `^` también acepta un número opcional después de él.",
            "",
            "En lugar de especificar cuántas generaciones hacia atrás ir (como `~`), el modificador de `^` especifica por cuál de las referencias padres seguir en un commit de merge. Recordá que un commit de merge tiene múltiples padres, por lo que el camino a seguir es ambiguo.",
            "",
            "Git normalmente sigue el \"primer\" padre de un commit de merge, pero especificando un número junto con `^` cambia este comportamiento predefinido.",
            "",
            "Demasiada charla, veámoslo en acción.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Acá tenemos un commit de merge. Si hacemos checkout de `master^`, sin modificadores, vamos a seguir al primer padre después del commit de merge. ",
            "",
            "(*En nuestras visualizaciones, el primer padre se ubica directamente arriba del commit de merge.*)"
          ],
          "afterMarkdowns": [
            "Fácil -- esto es a lo que estamos acostumbrados."
          ],
          "command": "git checkout master^",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Ahora tratemos de especificar el segundo padre, en cambio..."
          ],
          "afterMarkdowns": [
            "¿Ves? Seguimos al otro padre hacia arriba."
          ],
          "command": "git checkout master^2",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Los modificadores de `^` y `~` son muy poderosos a la hora de movernos en un árbol:"
          ],
          "afterMarkdowns": [
            "¡Rapidísimo!"
          ],
          "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Más loco aún, ¡estos modificadores pueden encadenarse entre sí! Mirá esto:"
          ],
          "afterMarkdowns": [
            "El mismo movimiento que antes, pero todo en uno."
          ],
          "command": "git checkout HEAD~^2~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Ponelo en práctica",
            "",
            "Para completar este nivel, creá una nueva rama en la ubicación indicada.",
            "",
            "Obviamente sería muy fácil especificar el commit directamente (algo como `C6`), pero te reto a usar los modificadores de los que estuvimos hablando, mejor"
          ]
        }
      }
    ]
  },
  "branching-name": "Brancheando en Git",
  "branching-hint": "Hacé una nueva rama con \"git branch [nombre]\" y cambiá a ella con \"git checkout [nombre]\"",
  "branching-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Ramas en Git",
            "",
            "Las ramas (branches) en Git son increíblemente livianas. Son sólo referencias a un commit específico - nada más. Por esto es que tantos entusiastas de Git siguen el mantra:",
            "",
            "```",
            "brancheá temprano, y brancheá seguido",
            "```",
            "",
            "Como no hay consumo extra de alamcenamiento ni memoria al hacer varias ramas, es más fácil dividir lógicamente tu trabajo que tener un par de ramas grandes.",
            "",
            "Cuando empecemos a mezclar ramas y commits, vamos a ver cómo se combinan estas dos herramientas. Por ahora, en cambio, simplemente recordá que una rama escencialmente dice \"Quiero incluir el trabajo de este commit y todos su ancestros\"."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamos cómo se ven las ramas en práctica.",
            "",
            "Acá vamos a crear una rama nueva llamada `newImage`"
          ],
          "afterMarkdowns": [
            "Ahí está, ¡eso es todo lo que hay que hacer para branchear! La rama `newImage` ahora referencia al commit `C1`"
          ],
          "command": "git branch newImage",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Pongamos algo de trabajo en esta nueva rama. Apretá el botón de acá abajo"
          ],
          "afterMarkdowns": [
            "¡Uh, no! ¡La rama `master` avanzó, pero `newImage` no! Eso es porque no estábamos \"en\" la rama nueva, y por eso el asterisco (*) estaba en `master`"
          ],
          "command": "git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Digámosle a git que queremos checkoutear esa rama con",
            "",
            "```",
            "git checkout [name]",
            "```",
            "",
            "Esto va a situarnos en esa rama antes de commitear nuestros cambios"
          ],
          "afterMarkdowns": [
            "¡Ahí estamos! Nuestros cambios se registraron en nuestra nueva rama"
          ],
          "command": "git checkout newImage; git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "¡Ok! Ya estás listo para manejar ramas. Cuando se cierre esta ventana,",
            "creá una nueva rama llamada `bugFix` y cambiate a ella"
          ]
        }
      }
    ]
  },
  "commits-name": "Introducción a los commits de Git",
  "commits-hint": "¡Simplemente tipeá 'git commit' dos veces para terminar!",
  "commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Commits de Git",
            "Un commit en un repositorio git registra un snapshot de todos los archivos en tu directorio. Es como un _gran_ copy&paste, ¡pero incluso mejor!",
            "",
            "Git pretende mantener los commits tan livianos como sea posible, por lo que no copia ciegamente el directorio completo cada vez que commiteás. Puede (cuando es posible) comprimir un commit como un conjunto de cambios (o un _\"delta\"_) entre una versión de tu repositorio y la siguiente.",
            "",
            "Git mantiene, también, un historial de qué commits se hicieron cuándo. Es por eso que la mayoría de los commits tienen commits ancestros arriba suyo -- designamos esto con flechas en nuestra visualización. ¡Mantener el historial es genial para todos los que trabajan en el proyecto!",
            "",
            "Hay un montón en lo que ahondar, pero por ahora podés pensar en los commits como snapshots de tu proyecto. Los commits son muy livianos, y ¡cambiar de uno a otro es terriblemente rápido!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamos cómo se ve esto en la práctica. A la derecha tenemos una visualización de un (pequeño) repositorio git. Hay dos commits ahora: el commit inicial, `C0`, y un commit que lo sigue, `C1`, que podría tener algunos cambios interesantes.",
            "",
            "Dale al botón de abajo para hacer un nuevo commit"
          ],
          "afterMarkdowns": [
            "¡Ahí va! Increíble. Acabamos de hacer cambios al repositorio y los guardamos como un commit. El commit que acabamos de crear tiene un padre, `C1`, que referencia al commit en que se basó este."
          ],
          "command": "git commit",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "¡Dale, intentalo vos ahora! Cuando se cierre esta ventana, hacé dos commits para completar el nivel."
          ]
        }
      }
    ]
  },
  "merging-name": "Mergeando en Git",
  "merging-hint": "Acordate de commitear en el orden especificado (bugFix antes de master)",
  "merging-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Mergeando ramas",
            "",
            "¡Genial! Ya sabemos cómo commitear y cómo crear ramas. Ahora tenemos que aprender algún modo de unificar el trabajo de dos ramas diferentes.  Esto nos va a permitir abrir una nueva rama de desarrollo, implementar alguna nueva funcionalidad, y después unirla de nuevo con el trabajo principal.",
            "",
            "El primer método para combinarlas que vamos a explorar es `git merge`. Mergear en Git crea un commit especial que tiene dos padres diferentes. Un commit con dos padres escencialmente significa \"Quiero incluir todo el trabajo de este padre de acá y este otro padre de acá, *y* del conjunto de todos sus ancestros\"",
            "",
            "Es más simple visualizarlo, veámoslo a continuación"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Acá tenemos dos ramas, y cada una tiene un commit que le es único. Esto significa que ninguna de las ramas incluye \"todo el trabajo\" que hay en nuestro repositorio. Hagamos un merge para solucionar eso.",
            "",
            "Vamos a `merge`ar la rama `bugFix` a `master`"
          ],
          "afterMarkdowns": [
            "¡Wooow! ¿Viste eso? Primero que nada, `master` ahora apunta a un commit que tiene dos padres. Si seguís las flechas por el árbol de commits empezando desde `master` vas a cruzarte con cada commit del repositorio hasta llegar a la raíz. Esto significa que `master` ahora contiene todo el trabajo que hay en el repositorio.",
            "",
            "Además, ¿viste cómo cambiaron los colores de los commits? Para ayudar al aprendizaje, incluí algunas convenciones de colores. Cada rama tiene un color propio. Cada commmit se vuelve del color resultante de mezclar los colores de todas las ramas que lo contienen.",
            "",
            "Así que acá vemos que el color de la rama `master` participa en la mezcla de todos los commits, pero que el de `bugFix` no. Arreglemos eso..."
          ],
          "command": "git merge bugFix",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Mergeemos `master` a `bugFix`:"
          ],
          "afterMarkdowns": [
            "Como `bugFix` era un ancestro de `master`, git no tuvo que hacer ningún trabajo; simplemente movió `bugFix` al mismo commit al que estaba anexado `master`.",
            "",
            "Ahora todos los commits son del mismo color, lo que significa que cada rama contiene todo el trabajo que hay en el repositorio. ¡Wiii!"
          ],
          "command": "git checkout bugFix; git merge master",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, seguí estos pasos:",
            "",
            "* Creá una nueva rama, llamada `bugFix`",
            "* Checkouteá la rama `bugFix` usando `git checkout bugFix`",
            "* Hacé un commit",
            "* Volvé a `master` con `git checkout`",
            "* Hacé otro commit",
            "* Mergeá la rama `bugFix` a `master` usando `git merge`",
            "",
            "*Acordate: siempre podés volver a ver este mensaje tipeando \"objective\"!*"
          ]
        }
      }
    ]
  },
  "rebasing-name": "Introducción a rebase",
  "rebasing-hint": "Asegurate de commitear desde bugFix primero",
  "rebasing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Rebase",
            "",
            "El segundo modo de combinar el trabajo de distintas ramas es el *rebase*. Rebasear escencialmente agarra un conjunto de commits, los \"copia\", y los aplica sobre algún otro lado.",
            "",
            "Aunque esto pueda sonar confuso, la ventaja de rebasear es que puede usarse para conseguir una secuencia de commits lineal, más bonita. El historial / log de commits del repositorio va a estar mucho más claro si sólo usás rebase.",
            "",
            "Veámoslo en acción..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Acá tenemos dos ramas otra vez. Notar que la rama bugFix está actualmente seleccionada (tiene un asterisco)",
            "",
            "Nos gustaría mover nuestro trabajo de bugFix directamente sobre el trabajo de master. De ese modo, parecería que esas dos tareas se desarrollaron secuencialmente, cuando en realidad se hicieron en paralelo.",
            "",
            "Hagámoslo usando el comando `git rebase`"
          ],
          "afterMarkdowns": [
            "¡Genial! Ahora el trabajo de nuestra rama bugFix está justo encima del de master, y tenemos una secuencia lineal de commits.",
            "",
            "Notá que el commit C3 sigue existiendo en algún lado (aparece medio desvanecido en el árbol), y C3' es la \"copia\" que rebaseamos sobre master.",
            "",
            "El único problema es que master todavía no se actualizó, resolvámoslo ahora..."
          ],
          "command": "git rebase master",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Ahora estamos parados sobre la rama `master`. Avancemos y rebaseémosla sobre `bugFix`..."
          ],
          "afterMarkdowns": [
            "¡Ahí está! Como `master` era un ancestro de `bugFix`, git simplemente movió la referencia de `master` hacia adelante en la historia."
          ],
          "command": "git rebase bugFix",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, hacé lo siguiente:",
            "",
            "* Checkouteá una nueva rama llamada `bugFix`",
            "* Commiteá una vez",
            "* Volvé a master y commiteå de nuevo",
            "* Checkoutá bugFix otra vez y rebaseala sobre master",
            "",
            "¡Éxitos!"
          ]
        }
      }
    ]
  },
  "describe-name": "Git Describe",
  "describe-hint": "Simplemente commiteá una vez en bugFix cuando estés listo para seguir",
  "describe-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Git Describe",
            "",
            "Como los tags sirven tanto para marcar \"hitos\" en el código, git tiene un comando para *describir* (_describe_) dónde estás relativo al \"hito\" más cercano (digamos, \"tag\"). Y ese comamndo se llama ¡`git describe`!",
            "",
            "Git describe puede ayudarte a saber dónde estás después de que te hayas movido varios commits hacia adelante o atrás en la historia. Esto puede pasarte después de que termines un git bisect (una búsqueda que te ayuda a debuggear problemas) o cuando te sentás en la computadora de un compañero de trabajo que recién vuelve de unas vacaciones."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Git describe tiene la siguiente forma:",
            "",
            "`git describe <ref>`",
            "",
            "Donde `<ref>` es cualquier cosa que git puede resolver a un commit. Si no especificás ninguna referencia, git simplemente usa el commit en que estás parado ahora (`HEAD`).",
            "",
            "La salida de ese comando se ve así:",
            "",
            "`<tag>_<numCommits>_g<hash>`",
            "",
            "Donde `tag` es el tag más cercano en la historia, `numCommits` dice a cuántos commits de ese tag estás, y `<hash>` es el hash del commit que estás describiendo."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamos un ejemplo breve. Para este árbol de commits:"
          ],
          "afterMarkdowns": [
            "El comando `git describe master` mostraría:",
            "",
            "`v1_2_gC2`",
            "",
            "Mientras que `git describe side` debería mostrar:",
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
            "¡Eso es prácticamente todo lo que hay sobre git describe! Probá describiendo algunas referencias en este nivel para amigarte con el comando.",
            "",
            "Cuando estés listo, hacé un commit para terminar el nivel. Te estamos dando una gratis :P"
          ]
        }
      }
    ]
  },
  "grabbing-one-commit-name": "Tomando un único commit",
  "grabbing-one-commit-hint": "Acordate, el rebase interactivo o cherry-pick son tus amigos acá",
  "grabbing-one-commit-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Commits localmente stackeados",
            "",
            "Esta es una escena que suele pasar cuando uno desarrolla: estoy tratando de encontrar un bug bastante escurridizo. Para ayudar en mi tarea de detective, agrego un par de comandos de debug, y algunas sentencias para imprimir el estado de mi sistema.",
            "",
            "Todas estas cosas de imprimir y debuggear estan en su propia rama. Finalmente encuentro el problema, lo soluciono, ¡y disfruto!",
            "",
            "El único problema es que ahora necesito llevar mi `bugFix` a la rama `master`. Si simplemente fast-forwardeo `master`, entonces `master` va a tener todos mis agregados de debugging, que es indeseado. Tiene que haber otro modo..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Necesitamos decirle a git que sólo copie uno de los commits. Esto es tal como los niveles anteriores de mover commits por ahí -- podemos usar los mismos comandos:",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`",
            "",
            "Para conseguir este resultado."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Este es un nivel más avanzado, así que está en vos decidir cuál de los dos comandos querés usar, pero para completar el nivel asegurate de que `master` recibe el commit que `bugFix` referencia."
          ]
        }
      }
    ]
  },
  "juggling-commits-name": "Haciendo malabares con los commits",
  "juggling-commits-hint": "El primer comando es git rebase -i HEAD~2",
  "juggling-commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Haciendo malabares con los commits",
            "",
            "Estaes otra situación algo común. Tenés algunos cambios (`newImage`) y otro conjunto de cambios (`caption`) que están relacionados, entonces están apilados en tu repositorio uno encima del otro (es decir, uno después del otro).",
            "",
            "El tema es que a veces tenés que hacer una pequeña modificación a un commit previo. En este caso, la gente de diseño requiere que cambiemos ligeramente las dimensiones de `newImage`, ¡incluso aunque ese commit ya esté atrás en nuestra historia!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Superaremos esta dificultad haciendo lo siguiente:",
            "",
            "* Vamos a reordenar los commits para que el que queremos cambiar quede arriba de todo con `git rebase -i`",
            "* Vamos a hacer `commit --amend` para aplicar la ligera modificación",
            "* Después vamos a reordenar los commits a como estaban con `git rebase -i`",
            "* Finalmente, vamos a mover master a esta parte actualizada de nuestor árbol de commits para terminar el nivel (usando el método que prefieras)",
            "",
            "Hay varias maneras de lograr este objetivo en general (ya te veo haciéndole ojitos al cherry-pick), y veremos algunos más después, pero por ahora concentrémonos en esta técnica.",
            "",
            "Por último, prestá atención al estado final acá -- como movemos los commits dos veces, ambos quedan con un apóstrofe. El commit que corregimos tiene un apóstrofe extra, y así nos queda nuestro árbol final",
            "",
            "Habiendo dicho eso, puedo comparar los niveles basándome ahora en la estructura y las diferencias relativas de apóstrofes. Mientras que tu rama `master` tenga la misma estructura y diferencias relativas de apóstrofes, te voy a dar el puntaje completo"
          ]
        }
      }
    ]
  },
  "juggling-commits2-name": "Haciendo malabares con los commits #2",
  "juggling-commits2-hint": "¡No te olvides de avanzar master a los cambios actualizados!",
  "juggling-commits2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Haciendo malabares con los commits #2",
            "",
            "*Si no completaste Haciendo malabares con los commits #1 (el nivel anterior), hacelo antes de continuar*",
            "",
            "Como viste en el último nivel, usamos `rebase -i` para reordenar los commits. Una vez que el commit que queríamos cambiar estaba arriba de todo, pudimos `--amend`earlo fácilmente y reordenarlo a como queríamos.",
            "",
            "El único problema con esto es que hay mucho reordenamiento, que puede generar conflictos al rebasear. Veamos otro método usando `git cherry-pick`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Acordate de que git cherry-pick va a traer un commit de cualquier parte del árbol sobre HEAD (siempre que ese otro commit no sea un ancestro de HEAD).",
            "",
            "Una pequeña demo para refrescar la idea:"
          ],
          "afterMarkdowns": [
            "¡Bien! Sigamos..."
          ],
          "command": "git cherry-pick C2",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Entonces, en este nivel vamos a lograr el mismo objetivo de corregir `C2`, pero sin usar `rebase -i`. Te dejo a vos el darte cuenta cómo :D",
            "",
            "Acordate, la cantidad exacta de apóstrofes (') en el commit no es importante, sólo la diferencia relativa. Por ejemplo, le voy a dar puntaje a un árbol que matchee el objetivo pero cuyos commits tengan todos un apóstrofe extra"
          ]
        }
      }
    ]
  },
  "tags-name": "Tags en git",
  "tags-hint": "Podés checkoutear directamente el commit, ¡o simplemente el tag!",
  "tags-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Tags en git",
            "",
            "Como aprendiste en lecciones anteriores, las ramas pueden moverse fácilmente, y en general van referenciando distintos commits a medida que el trabajo se va completando en ellas. Las ramas cambian fácilmente, suelen ser temporales, y siempre cambiantes.",
            "",
            "Si ese es el caso, te podrías estar preguntando si hay una manera de marcar *permanentemente* puntos en la historia de tu proyecto. Para cosas como releases mayores o grandes merges, ¿hay algún modo de marcar esos commits con algo más permanente que un branch?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "¡Seguro que hay! Los tags de git soportan exactamente este caso de uso -- marcan (bastante) permanentemente determinados commits como \"hitos\" que podés referenciar como a un branch.",
            "",
            "Aún más importante, los tags no avanzan cuando se crean nuevos commits. No podés \"checkoutear\" un tag y completar el trabajo en ese tag - los tags son marcas fijas en el árbol de commits que designan ciertos puntos.",
            "",
            "Veamos cómo se ven los tags en práctica..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Creemos un tag en `C1`, que es nuestro prototipo de la versión 1"
          ],
          "afterMarkdowns": [
            "¡Ahí está! Bastante simple. Nombramos al tag `v1` y referenciamos explícitamente al commit `C1`. Si no especificás el commit, git va a usar al apuntado por `HEAD`"
          ],
          "command": "git tag v1 C1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para este nivel, simplemente creá los tags en la visualización final y después checkouteá `v1`. Notá cómo entrás en el estado detached -- esto es porque no podés commitear directamente sobre el tag `v1`.",
            "",
            "En el próximo nivel vamos a examinar un caso de uso más interesante para los tags."
          ]
        }
      }
    ]
  },
  "cherry-pick-name": "Introducción a cherry-pick",
  "cherry-pick-hint": "git cherry-pick seguido de los nombres de los commits",
  "cherry-pick-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Moviendo el trabajo por ahí",
            "",
            "Hasta ahora cubrimos lo básico de git -- commitear, branchear, y movernos por el árbol de commits. Estos conceptos alcanzan para aprovechar el 90% del poder de los repositorios de git y cubrir las necesidades principales de los desarrolladores.",
            "",
            "El 10% restante, sin embargo, puede ser bastante útil en flujos de trabajo complejos (o cuando te metiste en algún problema complicado). El próximo concepto que vamos a cubrir es el de \"mover el trabajo por ahí\" -- en otras palabras, una forma que tienen los desarrolladores de decir \"Quiero este trabajo allá y este otro allá\" de una manera precisa, elocuente y flexible.",
            "",
            "Puede parecer un montón, pero es un concepto bastante simple."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Cherry-pick",
            "",
            "El primer comando en esta serie se llama `git cherry-pick`. Tiene la siguiente forma:",
            "",
            "* `git cherry-pick <Commit1> <Commit2> <...>`",
            "",
            "Es una manera bastante directa de decir que querés copiar una serie de commits sobre tu ubicación actual (`HEAD`). Personalmente amo `cherry-pick` porque hay muy poca magia involucrada y es bastante simple de entender.",
            "",
            "¡Veamos una demo!",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Acá tenemos un repositorio con algo de trabajo en la rama `side` que queremos copiar a `master`. Podríamos lograrlo con un rebase (y ya aprendimos cómo), pero veamos cómo se comporta cherry-pick."
          ],
          "afterMarkdowns": [
            "¡Eso es todo! Queríamos los commits `C2` y `C4` y git los aplicó justo donde estábamos. ¡Tan simple como eso!"
          ],
          "command": "git cherry-pick C2 C4",
          "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, simplemente copiá algo de trabajo desde otras tres ramas a master. Podés ver qué commits queremos en la visualización del objetivo.",
            ""
          ]
        }
      }
    ]
  },
  "detached-head-name": "Desatacheá tu HEAD",
  "detached-head-hint": "¡Usá la etiqueta (hash) sobre el commit para ayudarte!",
  "detached-head-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Moviéndose por ahí con Git",
            "",
            "Antes de meternos en algunas de las funcionalidades más avanzadas de git, es importante entender las distintas maneras de moverse por el árbol de commits que representa tu proyecto.",
            "",
            "Una vez que estés cómodo moviendote por ahí, tus poderes con los otros comandos de git ¡van a amplificarse!",
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
            "Primero tenemos que hablar de \"HEAD\". HEAD es el nombre simbólico del commit actualmente checkouteado -- es, básicamente, el commit sobre el que estás trabajando.",
            "",
            "HEAD siempre apunta al commit más reciente, reflejado en el árbol de commits. La mayoría de los comandos de git que hacen cambios al árbol de commits empiezan modificando HEAD.",
            "",
            "Normalmente HEAD apunta al nombre de una rama (como bugFix). Cuando commiteás, el estado de bugFix se altera y este cambio es visible a través de HEAD."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamoslo en acción. Acá vamos a ver a HEAD antes y después de un commit."
          ],
          "afterMarkdowns": [
            "¡Ves! HEAD estuvo oculta bajo nuestra rama `master` todo este tiempo."
          ],
          "command": "git checkout C1; git checkout master; git commit; git checkout C2",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "### Detacheando HEAD",
            "",
            "Detachear (_des-adjuntar_) HEAD simplemente significa adjuntarla a un commit en lugar de a un branch. Así es como se ve de antemano:",
            "",
            "HEAD -> master -> C1",
            ""
          ],
          "afterMarkdowns": [
            "Y así queda ahora:",
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
            "Para completar este nivel, detacheemos HEAD de `bugFix` y ataccheemosla al commit, en cambio.",
            "",
            "Especificá este commit por su hash. El hash de cada commit se muestra en el círculo que lo representa."
          ]
        }
      }
    ]
  },
  "interactive-rebase-name": "Introducción al rebase interactivo",
  "interactive-rebase-hint": "podés usar tanto ramas como referencias relativas (HEAD~) para especificar el objetivo del rebase",
  "interactive-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git rebase interactivo",
            "",
            "git cherry-pick es genial cuando sabés cuáles commits querés (_y_ sabés sus hashes) -- es dificil superar la simpleza que provee.",
            "",
            "Pero ¿qué pasa cuando no sabés qué commits querés? Por suerte ¡git te cubre en esta situación, también! Podemos usar el rebase interactivo para esto -- es la mejor manera de revisar una serie de commits que estás por rebasear.",
            "",
            "Entremos en los detalles..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Todo rebase interactivo significa usar el comando `rebase` con la opción `-i`.",
            "",
            "Si incluís esta opción, git abrirá una UI para mostrarte qué commits están a punto de ser copiados sobre el objetivo del rebase. También muestra sus hashes y mensajes, que ayuda mucho para saber qué es cada commit.",
            "",
            "Para el git \"de verdad\", la UI signfica abrir un archivo en un editor de textos como `vim`. Para nuestro propósito, hice una pequeña interfaz que se comporta de ese mismo modo."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Cuando el diálogo de rebase interactivo se abre, tenés la capacidad de hacer 3 cosas:",
            "",
            "* Podés reordenar los commits con solamente cambiar su orden en la UI (en nuestra ventana, eso significa hacer drag & drop con el mouse).",
            "* Podés elegir ignorar completamente algunos commits. Esto se designa con `pick` -- no hacerle `pick` a algún commit significa que querés ignorarlo.",
            "* Finalmente, podés _squashear_ commits. Desafortunadamente, nuestros niveles no soportan esto por cuestiones logísticas, por lo que voy a ahorrarte los detalles. Haciéndola corta, te permite combinar varios commits en uno solo.",
            "",
            "¡Genial! Veamos un ejemplo."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Cuando apretes el botón, va a aparecer una ventana de rebase interactivo. Reordená los commits (sentite libre de ignorar alguno, también) ¡y mirá el resultado!"
          ],
          "afterMarkdowns": [
            "¡Boom! Git copió los commits exactamente de la misma manera que lo especificaste en la UI"
          ],
          "command": "git rebase -i HEAD~4 --aboveAll",
          "beforeCommand": "git commit; git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar el nivel, hacé un rebase interactivo y alcanzá el orden que se muestra en la visualización objetivo. Acordate que siempre podés hacer `undo` y `reset` para arreglar errores :D"
          ]
        }
      }
    ]
  },
  "relative-refs-name": "Referencias relativas (^)",
  "relative-refs-hint": "¡No te olvides del operador ^!",
  "relative-refs-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Referencias relativas",
            "",
            "Moverse por git usando los hashes de los commits puede volverse un tanto tedioso. En el mundo real no vas a tener una visualización de commits tan linda en la terminal, así que vas a tener que usar `git log` para ver los hashes.",
            "",
            "Peor aún, los hashes en general son mucho más largos en el git real, también. Por ejemplo, el hash del commit que introduje en el nivel anterior es `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. No es algo particularmente fácil de nombrar...",
            "",
            "Lo copado es que git es bastante astuto con los hashes. Sólo requiere que especifiques una cantidad de caracteres suficientes para identificar unívocamente al commit. Entonces, yo podría simplemente tipear `fed2` en lugar de esa cadena larga de arriba."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Como ya dije, especificar los commits por su hash no es la manera más conveniente, y por eso git tiene referencias relativas. ¡Son geniales!",
            "",
            "Con las referencias relativas podés arrancar de algún lugar recordable (como la rama `bugFix`, o `HEAD`) y manejarte desde ahí.",
            "",
            "Los commits relativos son poderosos, pero ahora vamos a presentar sólo dos formas simples:",
            "",
            "* Moverse un commit atrás con `^`",
            "* Moverse una cantidad de commits atrás con `~<num>`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamos el operador ^ primero. Cada vez que le agregás eso al nombre de una referencia, le estás diciendo a git que use el padre del commit especificado.",
            "",
            "Entonces, decir `master^` es equivalente a \"el primer padre de `master`\".",
            "",
            "`master^^` es el _abuelo_ (segunda generación de ancestros) de `master`",
            "",
            "Veamos el commit que está antes de master acá"
          ],
          "afterMarkdowns": [
            "¡Boom! Ahí está. Mucho más simple que tipear el hash de ese commit"
          ],
          "command": "git checkout master^",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "También podés referenciar a `HEAD` como una referencia relativa. Usémoslo un par de veces para movernos hacia atrás en nuestro árbol"
          ],
          "afterMarkdowns": [
            "¡Fácil! Podemos volver en el tiempo con `HEAD^`"
          ],
          "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
          "beforeCommand": "git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, checkouteá el padre del commit de `bugFix`. Esto va a detachear a `HEAD`.",
            "",
            "Podés especificar el hash si querés, pero mejor ¡tratá de usar la referencia relativa!"
          ]
        }
      }
    ]
  },
  "relative-refs2-name": "Referencias relativas #2 (~)",
  "relative-refs2-hint": "Vas a necesitar usar al menos una referencia directa (hash) para completar este nivel",
  "relative-refs2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### El operador \"~\"",
            "",
            "Digamos que querés moverte un montón de niveles atrás en tu árbol de commits. Podría ser tedioso tipear `^` muchas veces, por lo que git tiene el operador ~.",
            "",
            "",
            "El operador ~ (opcionalmente) toma una cantidad que especifica la cantidad de padres que querés volver hacia atrás. Veámoslo en acción"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Especifiquemos una cantidad de commits hacia atrás con `~`."
          ],
          "afterMarkdowns": [
            "¡Boom! Bien conciso -- las referencias relativas la rompen."
          ],
          "command": "git checkout HEAD~4",
          "beforeCommand": "git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Forzando los branches",
            "",
            "Ahora que sos un experto en las referencias relativas, *usémoslas* para algo.",
            "",
            "Una de las formas más comunes en que uso las referencias relativas es para mover las ramas. Podés reasignar directamente una rama a un commit usando la opción `-f`. Así que algo como:",
            "",
            "`git branch -f master HEAD~3`",
            "",
            "Mueve (forzadamente) la rama master tres padres atrás de HEAD."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamos ese comando previo en acción"
          ],
          "afterMarkdowns": [
            "¡Ahí vamos! Las referencias relativas nos dieron una manera concisa de referenciar a `C1`, y forzar la rama (`-f`) nos dio una manera rápida de mover la rama a esa ubicación"
          ],
          "command": "git branch -f master HEAD~3",
          "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ahora que viste las referencias relativas y el forzar ramas combinados, usémoslos para resolver el siguiente nivel.",
            "",
            "Para completar este nivel, mové `HEAD`, `master` y `bugFix` a sus destinos finales."
          ]
        }
      }
    ]
  },
  "reversing-changes-name": "Revirtiendo cambios en git",
  "reversing-changes-hint": "Notá que revert y reset toman parámetros distintos",
  "reversing-changes-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Revirtiendo cambios en git",
            "",
            "Hay varias maneras de revertir cambios en git. Y, tal como al commitear, revertir cambios en git tiene tanto un componente de bajo nivel (indexar archivos o fragmentos individualmente) como un componente de alto nivel (cómo son efectivamente revertidos los cambios). Nuestra aplicación se va a concentrar en esto último.",
            "",
            "Hay dos formas principales de deshacer cambios en git -- uno es usando `git reset` y el otro es usando `git revert`. Vamos a ver cada uno de esos a continuación",
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
            "`git reset` revierte los cambios moviendo la referencia de una rama hacia atrás en el tiempo a un commit anterior. En este sentido podés pensarlo como \"reescribir la historia\". `git reset` va a mover la rama hacia atrás, como si el commit nunca se hubiera hecho.",
            "",
            "Veamos cómo es eso:"
          ],
          "afterMarkdowns": [
            "¡Genial! git simplemente movió la referencia de la rama master atrás hacia `C1`. Ahora tu repositorio local está en un estado como si `C2` nunca hubiera ocurrido"
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
            "Mientras que resetear los cambios funciona genial para ramas locales en tu máquina, su método de \"reescribir la historia\" no funciona para ramas remotas que otros están usando.",
            "",
            "Para revertir cambios y *compartir* esa _revertida_ con otros, necesitamos usar `git revert`. Veámoslo en acción"
          ],
          "afterMarkdowns": [
            "Extraño. Hay un nuevo commit aplicado sobre el que queríamos revertir. Eso es porque este nuevo commit `C2'` introduce *cambios* - sólo que esos cambios son exactamente los necesarios para revertir los que introdujo `C2`.",
            "",
            "Cuando usás revert, podés pushear ese cambio para compartirlo con otros."
          ],
          "command": "git revert HEAD",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, revertí los dos commits más recientes, tanto en `local` como en `pushed`.",
            "",
            "Tené en cuenta que `pushed` es una rama remota y `local` es una rama local -- eso debería ayudarte a elegir qué métodos usar."
          ]
        }
      }
    ]
  },
  "many-rebases-name": "Rebaseando más de 9000 veces",
  "many-rebases-hint": "Acordate, la manera más eficiente podría ser actualizar master sólo al final...",
  "many-rebases-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Rebaseando múltiples ramas",
            "",
            "Man, ¡hay un montón de ramas acá! Rebaseemos todo el trabajo de esas ramas sobre master.",
            "",
            "La gente de administración nos está haciendo las cosas un poco complicadas, igual -- quieren que nuestros commits estén todos en orden secuencial. Esto significa que nuestro árbol final tendría que tener `C7` al final, `C6` antes de ese, y así siguiendo, todos en orden.",
            "",
            "Si hacés líos en el camino, sentite libre de usar `reset` para empezar de nuevo. ¡Asegurate de verificar tu solución y ver si podés hacerla en alguna cantidad menor de commandos!"
          ]
        }
      }
    ]
  },
  "selective-rebase-name": "Enslada de branches",
  "selective-rebase-hint": "¡Asegurate de hacer las cosas en el orden correcto! Brancheá `one` primero, después `two`, y después `three`.",
  "selective-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Ensalada de branches",
            "",
            "¡WOAHHHhhh Nelly! Tenemos un _pequeño_ objetivo al que llegar en este nivel.",
            "",
            "Tenemos un `master` que está algunos commits adelante de `one`, `two` y `three`. Por alguna razón, necesitamos actualizar esas tres ramas con versiones modificadas de los últimos commits de master.",
            "",
            "La rama `one` necesita reordenarse, y eliminar `C5`. `two` necesita sólo reordenamiento, y `three` ¡sólo necesita un commit!",
            "",
            "Te vamos a dejar darte cuenta cómo resolver este -- asegurate de mirar la solución, después, usando `show solution`. "
          ]
        }
      }
    ]
  },
  "clone-name": "Introducción a clone",
  "clone-hint": "Simplemente hacé git clone!",
  "clone-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Remotes",
            "",
            "Los repositorios remotos no son _tan_ complicados. En el mundo actual de la computación en la nube es bastante facil pensar que hay un montón de magia detrás de los remotes de git, pero en realidad sólo son copias de tu repositorio en otra computadora. Típicamente vas a hablar con esta otra computadora a través de Internet, lo que permite transferir commits de un lado a otro.",
            "",
            "Habiendo dicho eso, los repositorios remotos tienen un par de propiedades copadas:",
            "",
            "- Primero y principal, los remotos ¡son un genial backup! Los repositorios locales de git tienen la habilidad de restaurar archivos a un estado previo (como ya sabés), pero toda esa información está almacenada localmente. Al tener copias de tu repositorio git en otras computadoras, podés perder todos tus datos locales y aún así retomar de donde habías dejado.",
            "",
            "- Más importante, ¡los remotos sociabilizan la programación! Ahora que hay una copia de tu proyecto hosteada en otro lugar, tus amigos pueden contribuir a tu proyecto (o bajarse los últimos cambios) de un modo muy sencillo.",
            "",
            "Se volvió bastante popular el uso de sitios web que muestran la actividad de los repositorios (como [Github](https://github.com/) or [Phabricator](http://phabricator.org/)), pero esos repositorios remotos _siempre_ sirven como el la base subyacente de esas herramientas. Así que ¡es importante entenderlos!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Nuestro comando para crear remotos",
            "",
            "Hasta este punto, Learn Git Branching se centró en eseñar las bases del trabajo _local_ con repositorios (branchear, mergear, rebasear, etc). Sin embargo, ahora que queremos aprender sobre el trabajo con repositorios remotos, necesitamos un comando para inicializar nuestro entorno para esas lecciones. Ese comando será `git clone`",
            "",
            "Técnicamente, `git clone` en el mundo real es el comando que usarías para crear copias _locales_ de un repositorio remoto (uno de GitHub, por ejemplo). Acá usamos este comando de un modo un tanto distinto, en cambio -- `git clone` va a crear un repositorio remoto a partir del tuyo local. Estamos de acuerdo en que es el significado técnicamente opuesto al del comando real, pero ayuda bastante a entender la conexión entre el clonado y el trabajo en un repositorio remoto, así que vamos a vivir con ello por ahora.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Comencemos despacio y simplemente veamos cómo se ve un repositorio remoto en nuestra visualización.",
            ""
          ],
          "afterMarkdowns": [
            "¡Ahí está! Ahora tenemos un repositorio remoto de nuestro proyecto. Parece bastante similar, salvando algunos cambios visuales para hacer evidente la distinción -- en niveles posteriores vas a ver cómo compartir trabajo entre estos repositorios."
          ],
          "command": "git clone",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, simplemente hacé `git clone` de tu repositorio existente. El verdadero aprendizaje viene en las próximas lecciones."
          ]
        }
      }
    ]
  },
  "fake-teamwork-name": "Simulando el trabajo en equipo",
  "fake-teamwork-hint": "Acordate que podés especificar cuántos commits simular",
  "fake-teamwork-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Simulando la colaboración",
            "",
            "Entonces, hay algo medio tramposo acá -- para algunas de las lecciones siguientes, necesitamos explicarte cómo bajar cambios introducidos en el repositorio remoto.",
            "",
            "Eso significa que escencialmente tenemos que \"hacer de cuenta\" que el repositorio remoto fue actualizado por alguún colega, amigo o colaborador tuyo, incluso a veces en alguna rama específica o una cantidad determinada de commits.",
            "",
            "Para lograr esto, introdujimos el bien llamado comando ¡`git fakeTeamwork`! Es bastante auto-explicativo: simula trabajo de nuestros colegas. Veamos una demo..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "El comportamiento por default de `fakeTeamwork` es simplemente crear un commit en master"
          ],
          "afterMarkdowns": [
            "Ahí está: el remoto se actualizó con un nuevo commit, y todavía no nos bajamos ese commit porque aún no hicimos `git fetch`."
          ],
          "command": "git fakeTeamwork",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "También podés especificar la cantidad de commits o la ramma agregándolos al comando"
          ],
          "afterMarkdowns": [
            "Con un único comando simulamos que un compañero de equipo pusheó tres commits a la rama `foo` de nuestro remoto"
          ],
          "command": "git fakeTeamwork foo 3",
          "beforeCommand": "git branch foo; git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Los niveles siguientes van a ser algo difíciles, así que vamos a exigirte un poco más en este nivel.",
            "",
            "Animate y creá un remoto (con `git clone`), simulá algunos cambios en ese remoto, commiteá en tu repo local, y luego pulleate esos cambios. ¡Es como varias lecciones en una!"
          ]
        }
      }
    ]
  },
  "fetch-name": "git fetch",
  "fetch-hint": "Simplemente ¡hacé git fetch!",
  "fetch-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Fetch",
            "",
            "Trabajar con remotos en git en realidad se reduce a transferir datos _de_ y _hacia_ otros repositorios. Mientras podamos mandar commits de un lado al otro, podemos compartir cualquier tipo de actualización registrada por git (y, por ende, compartir trabajo, archivos nuevos, ideas nuevas, cartas de amor, etc).",
            "",
            "En esta lección aprenderemos cómo traer (hacer `fetch`) datos _desde_ un repositorio remoto - el comando para esto se llama, convenientemente, `git fetch`).",
            "",
            "Vas a notar que a medida que actualicemos nuestra representación de nuestro repositorio remoto, nuestras ramas _remotas_ van a actualizarse para reflejar esa nueva representación. Esto está ligado a la lección anterior sobre ramas remotas"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Antes de entrar en los detalles de `git fetch`, veámoslo en acción. Acá tenemos un repositorio remoto que contiene dos commits que nuestro repositorio local no tiene."
          ],
          "afterMarkdowns": [
            "¡Ahí vamos! Bajamos los commits `C2` y `C3` a nuestro repositorio local, y nuestra rama remota `o/master` fue actualizada para reflejar este cambio."
          ],
          "command": "git fetch",
          "beforeCommand": "git clone; git fakeTeamwork 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### ¿Qué hace fetch?",
            "",
            "`git fetch` hace dos simples pasos, y sólo dos simples pasos:",
            "",
            "* baja los commits que el remoto tiene pero no están en nuestro repositorio local, y...",
            "* actualiza a dónde apuntan nuestras ramas remotas (por ejemplo, `o/master`)",
            "",
            "`git fetch` escencialmente sincroniza nuestra representación _local_ del repositorio remoto con el _verdadero_ estado del repositorio remoto (en este momento).",
            "",
            "Si recordás la lección anterior, dijimos que las ramas remotas reflejan el estado de los repositorios remotos _desde_ la última vez que hablaste con ellos. ¡`git fetch` es la manera en que hablás con esos remotos! Espero que ahora esté clara la conexión entre las ramas remotas y `git fetch`.",
            "",
            "Usualmente, `git fetch` habla con el repositorio a través de internet (usando un protocolo como `http://` o `git://`).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### ¿Qué *no* hace fetch?",
            "",
            "Sin embargo, `git fetch` no modifica en absoluto _tu_ estado local. No va a actualizar tu rama `master` ni va a cambiar nada sobre cómo se ve tu sistema de archivos en este momento.",
            "",
            "Es importante entender esto, porque un montón de desarrolladores piensan que correr `git fetch` hará que su estado local refleje el estado del remoto. `git fetch` puede descargar los datos necesarios para hacerlo, pero *no* cambia ninguno de tus archivos locales. Vamos a aprender otros comandos para hacer eso más adelante :D",
            "",
            "Entonces, después de todo, podés pensar a `git fetch` como un paso de descarga."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, simplemente corré `git fetch` y bajate todos los commits"
          ]
        }
      }
    ]
  },
  "fetch-args-name": "Parámetros de fetch",
  "fetch-args-hint": "¡Prestá atención a cómo podrían haberse invertido los ids de los commits! Podés volver a leer toda la lección usando \"help level\"",
  "fetch-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Parámetros de git fetch",
            "",
            "Entonces, recién aprendimos todo sobre los parámetros de push, este parámetro `<lugar>` copado, e incluso las referencias separadas por dos puntos (`<origen>:<destino>`). ¿Podremos usar todo ese conocimiento para `git fetch`, también?",
            "",
            "¡Dalo por hecho! Los parámetros para `git fetch` son realmente *muy, muy* similares a los de `git push`. Es el mismo tipo de conceptos, pero aplicados en la dirección opuesta (dado que ahora estás bajando commits en lugar de subirlos).",
            "",
            "Veamos los conceptos de a uno a la vez..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### El parámetro `<lugar>`",
            "",
            "Si especificás un lugar con git fetch como en el comando siguiente:",
            "",
            "`git fetch origin foo`",
            "",
            "Git va a ir a la rama `foo` en el remoto, va a traer todos los commits que no estén presentes localmente, y luego los aplicará sobre la rama `o/foo` localmente.",
            "",
            "Veámoslo en acción (refresquemos el concepto)."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Especificando un lugar..."
          ],
          "afterMarkdowns": [
            "Sólo bajamos los commits de `foo` y los ubicamos en `o/foo`"
          ],
          "command": "git fetch origin foo",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Te podrás estar preguntando \"¿Por qué git aplicó esos commits sobre la rama `origin/foo` en lugar de aplicarlos sobre la rama `foo` local? Pensé que el parámetro `<lugar>` era un lugar que existía tanto local como remotamente\"",
            "",
            "Bueno, git hace una excepción especial en este caso, porque vos podrías tener trabajo en la rama `foo` que no quieras mezclar. Esto refiere a la lección anterior sobre `git fetch` - no actualiza tus ramas locales no-remotas, sólo descarga los commits (para que pueadas verlos o mergearlos después).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "\"Bueno, y, en ese caso, ¿qué pasa si explícitamente defino el origen y destino con `<origen>:<destino>`?\"",
            "",
            "Si te sentís lo suficientemente seguro como para traer commits *directamente* a una rama local, entonces, sí, podés especificarlo usando una referencia con dos puntos. No podés traer commits a una rama que tengas checkouteada, pero en cualquier otro caso git te lo va a permitir.",
            "",
            "Este es el único problemita, igual: `<origen>` es ahora un lugar en el *remoto*, y `<destino>` es un lugar *local* en donde poner esos commits. Es exactamente lo opuesto a git push, y eso tiene sentido dado que ¡estamos transfiriendo los datos en la dirección opuesta!",
            "",
            "Habiendo dicho esto, dificilmente alguien use esto en la práctica. Lo estoy presentando principalmente como un modo de conceptualizar que `fetch` y `push` son bastante similares, sólo que en direcciones opuestas."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamos esta locura en acción:"
          ],
          "afterMarkdowns": [
            "¡Wow! Mirá: git resolvió `foo~1` como un lugar en el origin y bajó esos commits a `bar` (que era una rama local). Notá como `foo` y `o/foo` no fueron actualizados, dado que especificamos un destino."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "¿Qué pasa si el destino no existe antes de que corra este comando? Veamos el último ejemplo pero sin que `bar` exista de antemano."
          ],
          "afterMarkdowns": [
            "Mirá: es IGUAL que git push. Git creó el destino localmente antes de hacer el fetch, tal como git creará el destino en el remoto antes de pushear (si no existiera)."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "¿Sin argumentos?",
            "",
            "Si `git fetch` no recibe ningún argumento, simplemente descarga todos los commits del remoto a todas las ramas remotas..."
          ],
          "afterMarkdowns": [
            "Bastante simple, pero vale la pena verlo al menos una vez."
          ],
          "command": "git fetch",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Bueno, demasiada charla. Para completar este nivel, fetcheáte sólo los commits especificados en la visualización del objetivo. ¡Amigate con esos comandos!",
            "",
            "Vas a tener que especificar el origen y el destino para ambos comandos fetch. Prestá atención al objetivo dado que ¡los IDs pueden estar invertidos!"
          ]
        }
      }
    ]
  },
  "fetch-rebase-name": "Historia divergente",
  "fetch-rebase-hint": "Prestá atención al orden del objetivo",
  "fetch-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Trabajo divergente",
            "",
            "Hasta acá vimos cómo pullear commits de otros y cómo pushear los nuestros. Parece bastante simple, así que ¿cómo puede confundirse tanto la gente?",
            "",
            "La dificultad viene cuando la historia de los repositorios *diverge*. Antes de entrar en detalles, veamos un ejemplo...",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Imaginate que clonás un repositorio el lunes y empezás a desarrollar algo. Para el viernes ya estás listo para publicar tu trabajo, pero, ¡oh, oh! Tus colegas también escribieron código durante la semana, haciendo que tu trabajo quede desactualizado (y obsoleto). Además, ellos publicaron esos commits en el repositorio remoto, así que ahora *tu* trabajo está basado en una versión *vieja* del proyecto, que ya no le interesa a nadie.",
            "",
            "En este caso, el comando `git push` es ambiguo. Si corrés `git push`, ¿git debería cambiar el repositorio a como estaba el lunes? ¿Debería tratar de agregar tu código sin eliminar el código nuevo? ¿O debería ignorar completamente tus cambios porque están desactualizados?",
            "",
            "Como hay tanta ambiguedad en esta situación (en que la historia divirgió), git no te permite pushear tus cambios. En cambio, te fuerza a integrar el último estado del repositorio remoto antes de poder compartir tu trabajo."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "¡Demasiada charla, veámoslo en acción!"
          ],
          "afterMarkdowns": [
            "¿Ves? No pasó nada, porque el comando falla. `git push` falla porque `C3`, tu commit más reciente, está basado en el remoto sobre `C1`. El remoto fue actualizado a `C2` desde entonces, por lo que git rechaza tu push"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "¿Cómo resolvés esta situación? Es fácil, todo lo que tenés que hacer es basar tu trabajo en la versión más reciente de la rama remota.",
            "",
            "Hay un par de maneras de hacer esto, pero la más simple es mover tu trabajo haciendo un rebase. Probémoslo a ver cómo se ve."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Ahora, si mejor rebaseamos antes de pushear..."
          ],
          "afterMarkdowns": [
            "¡Boom! Actualizamos nuestra representación local del remoto con `git fetch`, rebaseamos nuestro trabajo para reflejar los nuevos cambios del remoto, y después los pusheamos con `git push`"
          ],
          "command": "git fetch; git rebase o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "¿Hay otra manera de actualizar mi trabajo si actualizaron el repositorio remoto? ¡Claro que sí! Veamos cómo hacer lo mismo pero usando `merge`.",
            "",
            "Por más que `git merge` no mueva tu trabajo (sólo crea un commit de merge), es un modo de decirle a git que integraste todos los cambios del remoto. Esto es porque ahora una rama remota pasó a ser un *ancestro* de tu propia rama, lo que significa que tu commit refleja los cambios de todos los commits de la rama remota.",
            "",
            "Veamos una muestra..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Si en lugar de rebasear hacemos un merge..."
          ],
          "afterMarkdowns": [
            "¡Boom! Actualizamos nuestra representación local del remoto usando `git fetch`, *mergeamos* el nuevo trabajo junto con el nuestro (para reflejar los nuevos cambios en el remoto), y después los pusheamos usando `git push`"
          ],
          "command": "git fetch; git merge o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "¡Asombroso! ¿Hay forma de hacer esto sin tipear tantos comandos?",
            "",
            "¡Claro que sí! Ya sabés que `git pull` es simplemente un atajo para hacer fetch y merge. Convenientemente, ¡`git pull --rebase` es un atajo para hacer fetch y rebase!",
            "",
            "Veamos estos atajos funcionando."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Primero con `--rebase`..."
          ],
          "afterMarkdowns": [
            "¡Igual que antes! Sólo que bastante más corto."
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Y ahora un `pull` común"
          ],
          "afterMarkdowns": [
            "Otra vez, ¡exactamente lo mismo que antes!"
          ],
          "command": "git pull; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Toda esta movida de fetchear, rebasear/mergear y pushear es bastante común. En lecciones futuras vamos a ver formas más complejas de estos flujos de trabajo, pero por ahora probemos esto que vimos.",
            "",
            "Para resolver este nivel, hacé lo siguiente:",
            "",
            "* Cloná tu repositorio",
            "* Simulá algo de trabajo de un colega (1 commit)",
            "* Commiteá algo de trabajo propio (1 commit)",
            "* Publicá tu trabajo *rebaseando*"
          ]
        }
      }
    ]
  },
  "merge-many-features-name": "Mergeando con los remotos",
  "merge-many-features-hint": "¡Prestá atención al árbol final!",
  "merge-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## ¿Por qué no mergear?",
            "",
            "Para pushear tus novedades al remoto, todo lo que tenés que hacer es *integrar* los últimos cambios del remoto con los tuyos. Eso significa que podés hacer tanto rebase como merge con la rama remota (por ejemplo, `o/master`).",
            "",
            "Así que si podés hacer cualquiera de las dos, ¿por qué las lecciones sólo se centraron en rebasear hasta ahora? ¿Por qué no dedicarle algo de amor al `merge` cuando trabajamos con remotos?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Hay mucho debate entre los desarrolladores sobre los pros y contras de mergear vs rebasear. Acá tenemos los pros y contras de rebasear:",
            "",
            "Pros:",
            "",
            "* Rebasear hace que tu árbol de commits se vea bastante limpio, porque todos los commits siguen una única línea",
            "",
            "Contras:",
            "",
            "* Rebasear modifica la historia (aparente) de tu árbol de commits.",
            "",
            "Por ejemplo, el commit `C1` puede rebasearse para que aparezca *después* de `C3`. Entonces, parece que el trabajo de `C1'` se hizo después de `C3`, cuando en realizad se había hecho antes.",
            "",
            "Algunos desarrolladores aman preservar la historia, por lo que prefieren mergear. Otros (como yo) preferimos tener un árbol de commits limpios, y preferimos rebasear. Todo es una cuestión de preferencias :D"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para este nivel, tratemos de resolver el nivel anterior, pero *mergeando*. Puede ponerse un poco oscuro, pero ilustra la idea bastante bien."
          ]
        }
      }
    ]
  },
  "pull-name": "git pull",
  "pull-hint": "Simplemente ¡hacé git pull!",
  "pull-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Pull",
            "",
            "Ahora que vimos cómo traer datos de un repositorio remoto con `git fetch`, ¡actualicemos nuestro trabajo local para reflejar esos cambios!",
            "",
            "Realmente hay varias formas de hacer esto: una vez que tenés los commits disponibles localmente, podés integrarlos como si fueran commits comunes de otras ramas. Esto significa que podrías ejecutar comandos como:",
            "",
            "* `git cherry-pick o/master`",
            "* `git rebase o/master`",
            "* `git merge o/master`",
            "* etc., etc.",
            "",
            "De hecho, el flujo de trabajo de *fetchear* cambios remotos y después *mergearlos* es tan común que git incluye un comando que hace ambas cosas de una: ¡`git pull`!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamos primero un `fetch` y un `merge` ejecutados secuencialmente"
          ],
          "afterMarkdowns": [
            "Boom: descargamos `C3` con un `fetch` y luego lo mergeamos con `git merge o/master`. Ahora nuestra rama `master` refleja el nuevo trabajo del remoto (en este caso, llamado `origin`)"
          ],
          "command": "git fetch; git merge o/master",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "¿Qué pasaría si usáramos `git pull` en cambio?"
          ],
          "afterMarkdowns": [
            "¡Lo mismo! Eso debería dejar bien en claro que `git pull` es básicamente un atajo para hacer `git fetch` seguido por un merge con la rama que sea que hayamos bajado."
          ],
          "command": "git pull",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Exploraremos los detalles de `git pull` después (incluyendo sus opciones y parámetros), pero por ahora probémoslo en este nivel.",
            "",
            "Acordate: podés resolver este comando simplemente con `fetch` y `merge`, pero eso te costaría un comando extra :P"
          ]
        }
      }
    ]
  },
  "pull-args-name": "Parámetros de pull",
  "pull-args-hint": "Acordate de que podés crear nuevas ramas locales usando los parámetros de fetch/pull",
  "pull-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Parámetros de git pull",
            "",
            "Ahora que sabés prácticamente *todo* lo que hay que saber sobre los parámetros de `git fetch` y `git push`, casi que no queda nada para cubrir de git pull :)",
            "",
            "Eso es porque git pull es simplemente un atajo para hacer un fetch seguido de un merge. Podés pensarlo como correr git fetch con los *mismos* parámetros, y después mergear aquello a donde esos commits hayan ido a parar.",
            "",
            "Esto aplica incluso cuando usás parámetros hiper-rebuscados. Veamos algunos ejemplos:"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Estos son algunos comandos equivalentes de git:",
            "",
            "`git pull  origin foo` equivale a:",
            "",
            "`git fetch origin foo; git merge o/foo`",
            "",
            "Y...",
            "",
            "`git pull  origin bar~1:bugFix` equivale a:",
            "",
            "`git fetch origin bar~1:bugFix; git merge bugFix`",
            "",
            "¿Ves? git pull es simplemente un atajo para un fetch + merge, y todo lo que le importa a git pull es dónde terminaron esos commits (el parámetro `destino` que determina durante el fetch).",
            "",
            "Veamos una demostración:"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Si especificamos el lugar del que hacer fetch, todo ocurre como antes, pero sólo mergeamos lo que se fetcheó"
          ],
          "afterMarkdowns": [
            "¡Ves! Especificando `master` bajamos los commits a `o/master` como siempre. Después mergeamos `o/master` a nuestra rama actual, *sin importar* qué había en nuestra copia de trabajo."
          ],
          "command": "git pull origin master",
          "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "¿Esto funciona con origen y destino, también? ¡Más vale! Veámoslo:"
          ],
          "afterMarkdowns": [
            "Wow, eso es un MONTÓN en un único comando. Creamos una nueva rama local llamada `foo`, descargamos los commits del master del remoto a esta rama `foo`, y después mezclamos esa rama a nuestra rama actual `bar`. ¡¡¡Supera los 9000!!!"
          ],
          "command": "git pull origin master:foo",
          "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "OK: para terminar, alcanzá el estado del objetivo. Vas a necesitar descargar algunos commits, crear algunas ramas nuevas, y mergear esas ramas junto con otras, pero no debería llevar demasiados comandos :P"
          ]
        }
      }
    ]
  },
  "push-name": "git push",
  "push-hint": "¡Acordate que tenés que clonar antes de pushear!",
  "push-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git push",
            "",
            "Ok, entonces ya bajé los cambios de un repositorio remoto y los integré en mi trabajo localmente. Esto es genial y todo... pero ¿cómo comparto _mis_ cambios con el resto?",
            "",
            "Bueno, la forma de subir el trabajo compartido es la opuesta a cómo descargar trabajo. Y ¿qué es lo opuesto a `git pull`? ¡`git push`!",
            "",
            "`git push` es el responsable de subir _tus_ cambios a un remoto específico y de actualizar ese remoto para incluir tus nuevos commits. Cuando `git push` termina, todos tus amigos pueden descargar tu trabajo del remoto.",
            "",
            "Podés pensar en `git push` como un comando para \"publicar\" tu trabajo. Tiene un par de sutilezas con las que vamos a meternos pronto, pero empecemos de a poco."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Acá tenemos algunos cambios que nuestro remoto no tiene. ¡Subámoslos!"
          ],
          "afterMarkdowns": [
            "Ahí está: el remoto recibió el commit `C2`, la rama `master` de ese remoto se actualizó para apuntar a `C2`, y nuestro *propio* reflejo del remoto (`o/master`) también fue actualizado. ¡Todo está en sincronía!"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, simplemente compartí dos nuevos commits con el remoto. Igual, no te confíes, ¡ya se van a complicar las lecciones!"
          ]
        }
      }
    ]
  },
  "push-args-name": "Parámetros de git push",
  "push-args-hint": "Siempre podés ver el último mensaje tipeando \"objective\"",
  "push-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Parámetros de push",
            "",
            "¡Genial! Ahora que sabés acerca de las ramas que trackean remotos podemos empezar a develar algo del misterio detrás de git push, fetch y pull. Vamos a atacar de a un comando a la vez, pero los conceptos entre ellos son muy similares.",
            "",
            "Veamos primero `git push`. Ya aprendiste en la lección sobre ramas remotas que git determinó el remoto *y* la rama a la que pushear mirando las propiedades de la rama actual (el remoto al que \"trackea\"). Este es el comportamiento default para cuando no se especifican parámetros, pero git push toma, opcionalmente, parámetros de la forma:",
            "",
            "`git push <remoto> <lugar>`",
            "",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "¿Qué será este parámetro `<lugar>`, te preguntarás? Ya vamos a entrar en detalle, pero primero un ejemplo. Correr el comando:",
            "",
            "`git push origin master`",
            "",
            "se traduce así al español:",
            "",
            "*Andá a la rama llamada \"master\" en mi repositorio, agarrá todos los commits, y después andá a la rama \"master\" del remoto llamado \"origin\". Aplicá ahí todos los commits que falten, y avisame cuando termines.*",
            "",
            "Especificando `master` como el parámetro \"lugar\", le dijimos a git de dónde traer los commits, y a dónde mandarlos. Es, básicamente, el \"lugar\" o \"ubicación\" que sincronizar entre ambos repositorios.",
            "",
            "Tené en cuenta que, como le dijimos a git todo lo que necesitaba saber (especificando ambos parámetros), ¡ignora totalmente dónde estamos parados en este momento¡"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Veamos un ejemplo especificando los parámetros. Notá en dónde estamos parados en este ejemplo."
          ],
          "afterMarkdowns": [
            "¡Ahí está! Se actualizó `master` en el remoto, porque especificamos esos parámetros."
          ],
          "command": "git checkout C0; git push origin master",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "¿Y si no especificabamos los parámetros? ¿Qué hubiera pasado?"
          ],
          "afterMarkdowns": [
            "El comando falla (como podés ver), porque `HEAD` no está sobre ninguna rama que trackee algún remoto."
          ],
          "command": "git checkout C0; git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok. Para este nivel, actualicemos tanto `foo` como `master` en el remoto. El tema está en que ¡tenemos deshabilitado `git checkout` en este nivel!"
          ]
        }
      }
    ]
  },
  "push-args2-name": "¡Más! Parámetros de git push",
  "push-args2-hint": "Recordá que podés admitir tu derrota y tipear \"show solution\" para ver la solución :P",
  "push-args2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Detalles sobre el parámetro `<lugar>`",
            "",
            "Acordate de la lección anterior que cuando especificamos `master` como el parámetro lugar de git push, especificamos tanto el *origen* del que sacar los commits como el *destino* al que enviarlos.",
            "",
            "Podrías estár preguntándote ¿Y si quisieramos que el origen y el destino sean distintos? ¿Si quisieras pushear los commits de la rama local `foo` a la rama `bar` del remote?",
            "",
            "Bueno, lamentablemente eso no se puede hacer en git... ¡Bazinga! Claro que se puede :)... git es extremadísimamente flexible (casi casi que demsiado).",
            "",
            "Veamos cómo hacerlo a continuación..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para especificar tanto el origen como el destino de `<lugar>`, simplemente unilos usando un dos puntos:",
            "",
            "`git push origin <origen>:<destino>`",
            "",
            "Esto se lo suele llamar refspec con dos puntos. Refspec es simplemente un nombre cool para una ubicación que git puede entender (como la rama `foo`, o incluso `HEAD~1`)",
            "",
            "Una vez que especificás tanto el origen como el destino independientemente, podés ponerte bastante cómodo y preciso con los comandos remotos. ¡Veámos una demo!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Recordá: `origen` es cualquier ubicación que git pueda entender:"
          ],
          "afterMarkdowns": [
            "¡Woow! Ese commando es bastante loco, pero tiene sentido: git resolvió `foo^` a una ubicación, subió cualquier commit de ahí que aún no estuviera en el remoto, y luego actualizó el destino."
          ],
          "command": "git push origin foo^:master",
          "beforeCommand": "git clone; go -b foo; git commit; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "¿Y qué hay si el destino que al querés pushear no existe? ¡No hay drama! Simplemente dale un nombre al branch y git se va a encargar de creártelo en el remoto."
          ],
          "afterMarkdowns": [
            "Genial, simplemente fluye :D"
          ],
          "command": "git push origin master:newBranch",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para este nivel, tratá de llegar al objetivo final, y acordate del formato:",
            "",
            "`<origen>:<destino>`"
          ]
        }
      }
    ]
  },
  "push-many-features-name": "¡Push Master!",
  "push-many-features-hint": "Acordate que siempre podés usar los comandos reset y undo",
  "push-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Mergeando feature branches",
            "",
            "Ahora que estás cómodo fetcheando, pulleando y pusheando, pongamos a prueba estas habilidades con un nuevo flujo de trabajo.",
            "",
            "Es bastante común que los desarrolladores en los grandes proyectos trabajen sobre ramas específicas para cada tarea (feature branches) basadas en `master`, y que las integren sólo cuando están listas. Esto es similar a la lección anterior, en que pusheabamos las ramas periféricas al remoto, pero acá tenemos un paso más.",
            "",
            "Algunos desarrolladores sólo pushean y pullean cuando están en `master`: de ese modo, `master` siempre se mantiene actualizado con el remoto (`o/master`).",
            "",
            "Entonces, en este flujo de trabajo combinamos dos cosas:",
            "",
            "* integramos el trabajo de las ramas específicas a `master`, y",
            "* pusheamos y pulleamos del remoto"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Refresquemos un poco cómo actualizar `master` y pushear nuestro trabajo."
          ],
          "afterMarkdowns": [
            "Acá ejecutamos dos comandos que:",
            "",
            "* rebasearon nuestro trabajo sobre los nuevos commits del remoto, y",
            "* publicamos nuestro trabajo en ese remoto"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Este nivel es bastante pesado. Acá tenés algunos lineamientos para resolverlo:",
            "",
            "* Tenemos tres ramas específicas -- `side1` `side2` and `side3`",
            "* Queremos pushear cada una de esas ramas, en orden, al remoto",
            "* El remoto fue actualizado, así que vamos a tener que integrar esos cambios también",
            "",
            ":O ¡Intenso! ¡Éxitos! Completar este nivel representa un gran avance."
          ]
        }
      }
    ]
  },
  "remote-branches-name": "Ramas remotas",
  "remote-branches-hint": "Prestá atención al orden: ¡commiteá sobre master primero!",
  "remote-branches-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Ramas remotas de git",
            "",
            "Ahora que viste `git clone` en acción, ahondemos en lo que realmente cambió.",
            "",
            "Lo primero que habrás notado es que apareció una nueva rama en tu repositorio local llamada `o/master`. A este tipo de ramas se las llama ramas _remotas_. Las ramas remotas tienen propiedades especiales porque sirven un propósito específico.",
            "",
            "Las ramas remotas reflejan el _estado_ de los repositorios remotos (como estaban la última vez que hablaste con ellos). Te ayudan a entender las diferencias entre tu trabajo local y el trabajo que ya está publicado - un paso crítico antes de compartir tu trabajo con los demás.",
            "",
            "Las ramas remotas tienen la propiedad especial de que cuando las checkouteás, pasás al modo detached `HEAD`. Git lo hace a propósito porque no podés trabajar en esas ramas directamente: tenés que trabajar en algún otro lado y después compartir tu trabajo con el remoto (tras lo que tus ramas remotas se actualizarán)."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### ¿Qué es `o/`?",
            "",
            "Podrías estar preguntándote qué significa ese `o/` al principio de las ramas remotas. Bueno, las ramas remotas también tienen una convención de nombres obligatoria -- se las muestra con el formato:",
            "",
            "* `<nombre del remoto>/<nombre de la rama>`",
            "",
            "Entonces, si mirás una rama llamada `o/master`, el nombre de la rama es `master`, y el nombre del remoto es `o`.",
            "",
            "La mayoría de los desarrolladores llaman `origin` a su remoto en lugar de `o`. Esto es tan común que git efectivamente crea tu remoto llamándolo `origin` cuando hacés `git clone` de un repositorio.",
            "",
            "Desafortunadamente el nombre `origin` completo no entra en nuestra UI, así que usamos `o` para abreviar :( Simplemente recordá que cuando uses el git real, tu remoto ¡probablemente se llame `origin`!",
            "",
            "Hay mucho para procesar, así que veámoslo en acción."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Checkouteemos una rama remota a ver qué pasa"
          ],
          "afterMarkdowns": [
            "Como ves, git nos puso en el modo detached `HEAD` y no actualizó `o/master` cuando creamos un nuevo commit. Esto es porque `o/master` sólo va a actualizarse cuando el remoto se actualice."
          ],
          "command": "git checkout o/master; git commit",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Para completar este nivel, commiteá una vez sobre `master` y una después de checkoutear `o/master`. Esto te va a ayudar a caer en cómo las ramas remotas funcionan distinto, y que sólo se actualizan para reflejar el estado del remoto."
          ]
        }
      }
    ]
  },
  "source-nothing-name": "Origen de nada",
  "source-nothing-hint": "El comando branch está deshabilitado para este nivel, así que ¡vas a tener que usar fetch!",
  "source-nothing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Rarezas de `<origen>`",
            "",
            "Git abusa del parámetro `<origen>` de dos extrañas maneras. Estos dos abusos vienen del hecho de que tecnicamente podés especificar \"la nada\" como un `origen` válido tanto para git push como para git fetch. El modo de especificar la nada es a través de un parámetro vacío:",
            "",
            "* `git push origin :side`",
            "* `git fetch origin :bugFix`",
            "",
            "Veamos qué hacen estos..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "¿Qué hace el pushear \"nada\" a una rama remota? ¡La elimina!"
          ],
          "afterMarkdowns": [
            "Ahí está, borramos la rama `foo` exitosamente del remoto pusheándole el concepto de \"nada\". Tiene algo de sentido..."
          ],
          "command": "git push origin :foo",
          "beforeCommand": "git clone; git push origin master:foo"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Finalmente, fetchear \"nada\" a un lugar local en realidad crea una nueva rama"
          ],
          "afterMarkdowns": [
            "Bastante bizarro, pero, meh, da igual. Así es git."
          ],
          "command": "git fetch origin :bar",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Este es un nivel rápido: simplemente borrá una rama remota y creá una nueva usando `git fetch` para completarlo."
          ]
        }
      }
    ]
  },
  "tracking-name": "Trackeando remotos",
  "tracking-hint": "¡Acordate de que hay dos formas de trackear un remoto!",
  "tracking-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Ramas que trackean remotos",
            "",
            "Una de las cosas que pueden haber parecido \"mágicas\" de las últimas lecciones es que git sabía que la rama `master` estaba relacionada con `o/master`. Obviamente, estas ramas tienen nombres parecidos, y podría parecer lógico conectar la rama `master` del remoto con la rama `master` local, pero esta conexión es bien evidente en dos escenarios:",
            "",
            "* Durante una operación de pull, los commits se descargan a `o/master` y después se *mergean* a la rama `master`. El objetivo implícito del merge se determina con esta conexión.",
            "* Durante un push, el trabajo de la rama `master` se sube a la rama `master` del remoto (que estaba representada localmente por `o/master`). El *destino* del push se determina con esta conexión entre `master` y `o/master`.",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Trackeando remotos",
            "",
            "Haciéndola corta, esta conexión entre `master` y `o/master` se explica simplemente por la propiedad de \"trackear (seguir) remotos\" de las ramas. La rama `master` está configurada para trackear `o/master` -- osea, que hay un objetivo implícito para el merge y un destino implícito para de la rama `master`.",
            "",
            "Podrías estar pensando cómo esa propiedad apareció en tu rama `master` si vos no corriste ningún comando para especificarlo. Bueno, cuando clonás un repositorio con git, esta propiedad se asigna por vos automáticamente.",
            "",
            "Durante un clone, git crea una rama remota por cada rama en el remoto (por ejemplo, ramas como `o/master`). Pero después crea una rama local que trackea la rama activa del remote, que suele ser `master`.",
            "",
            "Una vez completado el git clone, sólo tenés una única rama local (para que no te asustes) pero podés ver todas las ramas que del remoto (si fueras tan curioso). ¡Es lo mejor de ambos mundos!",
            "",
            "Esto también explica por qué podrías ver un mensaje como este durante la clonación:",
            "",
            "    local branch \"master\" set to track remote branch \"o/master\"",
            "",
            "    rama local \"master\" establecida para trackear la rama remota \"o/master\""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### ¿Puedo especificarlo yo?",
            "",
            "¡Claro que sí! Podés hacer que cualquier rama que quieras trackee `o/master`, y si lo hicieras, esa rama va a tener el mismo destino implícito de push y objetivo implícito de merge que `master`. Eso signfica que podés correr `git push` en una rama llamada `absolutamenteNoEsMaster` y ¡que tu trabajo se pushee a la rama `master` del remoto!",
            "",
            "Hay dos formas de establecer esta propiedad. La primera es checkoutear una nueva rama usando una rama remota como la referencia especificada. Ejecutar",
            "",
            "`git checkout -b absolutamenteNoEsMaster o/master`",
            "",
            "Crea una nueva rama llamada `absolutamenteNoEsMaster` y la hace trackear a `o/master`."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Suficiente charla, ¡veamos una demo! Vamos a checkoutear una nueva rama llamada `foo` y hacer que trackee a `master` en el remoto."
          ],
          "afterMarkdowns": [
            "Como podés ver, usamos el objetivo implícito de merge `o/master` para actualizar la rama `foo`. ¡Notá cómo `master` no fue actualizada!"
          ],
          "command": "git checkout -b foo o/master; git pull",
          "beforeCommand": "git clone; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Lo mismo aplica para git push"
          ],
          "afterMarkdowns": [
            "Boom. Pusheamos nuestro trabajo a la rama `master` del remoto incluso cuando nuestra rama se llamaba totalmente distinto"
          ],
          "command": "git checkout -b foo o/master; git commit; git push",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Forma número 2",
            "",
            "Otra forma de especificar la rama a trackear es usar la opción `git branch -u`. Ejecutando",
            "",
            "`git branch -u o/master foo`",
            "",
            "establecemos que la rama `foo` trackee a `o/master`. Si encima estás parado en `foo`, incluso podés obviarlo:",
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
            "Veamos rápidamente esta otra forma de especificar la rama a trackear..."
          ],
          "afterMarkdowns": [
            "Lo mismo que antes, sólo que con un comando bastante más explícito. ¡Una belleza!"
          ],
          "command": "git branch -u o/master foo; git commit; git push",
          "beforeCommand": "git clone; git checkout -b foo"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "¡Ok! Para este nivel, pusheá tu trabajo a la rama `master` del remoto *sin* estar parado sobre `master` localmente. Te dejo que te des cuenta del resto solo, que para algo este es el curso avanzado :P"
          ]
        }
      }
    ]
  },
  "sequence-intro-display": "Secuencia introductoria",
  "sequence-intro-about": "Una breve introducción a la mayoría de los comandos de git",
  "sequence-rampup-display": "Acelerando",
  "sequence-rampup-about": "La próxima porción de 100% maravillas git. Espero que estés hambriento",
  "sequence-remote-display": "Push & Pull -- Git Remotes!",
  "sequence-remote-about": "Hora de compartir sus 1's y 0's, chicos; programar se volvió social!",
  "sequence-remote-advanced-display": "Hasta el origin y más allá -- Git Remotes avanzado!",
  "sequence-remote-advanced-about": "Y pensabas que ser un dictador benévolo sería divertido...",
  "sequence-move-display": "Moviendo el trabajo por ahí",
  "sequence-move-about": "Ponete cómodo con modificar el directorio fuente",
  "sequence-mixed-display": "Bolsa de gatos",
  "sequence-mixed-about": "Un rejunte de técnicas, trucos y tips sobre Git",
  "sequence-advanced-display": "Temas avanzados",
  "sequence-advanced-about": "¡Para los verdaderos valientes!",
  "dialogs-confirm": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## ¿Estás seguro de que querés ver la solución?",
          "",
          "¡Creo en vos! ¡Dale que podés!"
        ]
      }
    }
  ],
  "dialogs-level-builder": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## ¡Bienvenido al constructor de niveles!",
          "",
          "Estos son los pasos principales:",
          "",
          "  * Prepará el entorno inicial usando comandos de Git",
          "  * Definí el árbol inicial con ```define start```",
          "  * Ingresá la serie de comandos de git que representan la solución óptima",
          "  * Definí el árbol objetivo con ```define goal```. El objetivo también determina la solución",
          "  * Opcionalmente, definí pistas con ```define hint```",
          "  * Dale un nombre con ```define name```",
          "  * Opcionalmente, definí un mensaje inicial con ```edit dialog```",
          "  * ¡Ingresá el comando ```finish``` para obtener tu nivel en formato JSON!"
        ]
      }
    }
  ],
  "dialogs-next-level": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## ¡Buen trabajo!",
          "",
          "Resolviste el nivel en *{numCommands}* comandos; ",
          "nuestra mejor solución usa {best}."
        ]
      }
    }
  ],
  "dialogs-sandbox": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## ¡Bienvenid@ a Learn Git Branching!",
          "",
          "Esta aplicación está diseñada para ayudar a los principantes ",
          "a manejar los poderosos conceptos que hay detrás del trabajo ",
          "con ramas (branches) en Git. Esperamos que disfrutes la aplicación ",
          "y tal vez incluso ¡que aprendas algo! ",
          "",
          "# ¡Demo!",
          "",
          "Si no viste la demo, mirala en esta dirección:",
          "",
          "[https://pcottle.github.io/learnGitBranching/?demo](https://pcottle.github.io/learnGitBranching/?demo)",
          "",
          "¿Harto de este mensaje? Agregale `?NODEMO` a la URL para dejar de verlo, como en este link:",
          "",
          "[https://pcottle.github.io/learnGitBranching/?NODEMO](?NODEMO)"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Comandos de Git",
          "",
          "Tenés una gran variedad de comandos de git en este sandbox. Estos incluyen: ",
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
          "## ¡Compartí!",
          "",
          "Compartí tus árboles con tus amigos usando `export tree` e `import tree`",
          "",
          "¿Tenés una buena lección que compartir? Probá construyendo un nivel con `build level` o probá el nivel de un amigo con `import level`",
          "",
          "Para ver todos los comandos disponibles, probá `show commands`. Hay algunas joyitas como `undo` y `reset`",
          "",
          "Por ahora, arranquemos con los `levels`..."
        ]
      }
    }
  ],
  "finish-dialog-finished": "¡Ea! Terminaste el último nivel, ¡genial!",
  "finish-dialog-next": "¿Querés seguir con *\"{nextLevel}\"*, el próximo nivel?",
  "finish-dialog-win": "¡Fabuloso! Igualaste o superaste nuestra solución.",
  "finish-dialog-lose": "Fijate si podés bajarlo a usar sólo {best} comandos :D",
  "hg-prune-tree": "¡Cuidado! Mercurial hace garbage collection agresivamente y necesita eliminar tu árbol",
  "hg-a-option": "La opción -A no es necesaria para esta aplicación, simplemente hacé commit",
  "hg-error-no-status": "No hay un comando status para esta aplicación, dado que no hay archivos que indexar. Probá hg summary, en cambio",
  "hg-error-need-option": "¡Necesito la opción {opcion} para ese comando!",
  "hg-error-log-no-follow": "hg log sin el parámetro -f no está soportado, usá -f",
  "git-status-detached": "¡Detached HEAD!",
  "git-status-onbranch": "En la rama {branch}",
  "git-status-readytocommit": "¡Listo para commitear! (como siempre en esta demo ;-) )",
  "git-dummy-msg": "Otro commit más, y van...",
  "git-error-origin-fetch-uptodate": "Estás en la versión más reciente",
  "git-error-origin-fetch-no-ff": "Tu rama origin está desincronizada con la rama remota, por lo que no se puede hacer el fetch",
  "git-error-origin-push-no-ff": "El repositorio remoto divergió de tu repositorio local, por lo que subir tus cambios no es un simple fast forward (y por eso se rechazó tu push). Por favor, hacé pull de los nuevos cambios en el repositorio remoto, incorporalos a esta rama y probá de nuevo. Podés hacerlo con git pull o git pull --rebase",
  "git-error-remote-branch": "No podés ejecutar ese comando en una rama remota",
  "git-error-origin-required": "Necesitás un origen para ese comando",
  "git-error-origin-exists": "¡Ya existe el origen! No podés crear uno nuevo",
  "git-error-branch": "No podés borrar la rama master, la rama en la que estás, o cosas que no son ramas",
  "git-merge-msg": "Mergear {target} a {current}",
  "git-error-rebase-none": "¡No hay commits para rebasear! Son todos commits de merge o cambios ya aplicados",
  "git-result-nothing": "Nada para hacer...",
  "git-result-fastforward": "Fast forwardeando...",
  "git-result-uptodate": "Rama actualmente actualizada",
  "git-error-exist": "La referencia {ref} no existe o es desconocida",
  "git-error-relative-ref": "El commit {commit} no tiene un {match}",
  "git-warning-detached": "¡Cuidado! Modo de detached HEAD",
  "git-warning-add": "No es necesario hacer add a los archivos en esta demo",
  "git-error-options": "No es necesario hacer add a los archivos en esta demo",
  "git-error-already-exists": "El commit {commit} ya existe en tus cambios, ¡abortando!",
  "git-error-reset-detached": "No podés hacer reset en el modo detached. Usá checkout si querés moverte",
  "git-warning-hard": "El comportamiento default es un --hard reset, sentite libre de omitir esa opción!",
  "git-error-staging": "No existe el concepto de agregar/indexar cambios, así que esa opción o comando es inválido",
  "git-revert-msg": "Revirtiendo {oldCommit}: {oldMsg}",
  "git-error-args-many": "Espero como máximo {upper} parámetros para {what}",
  "git-error-args-few": "Espero al menos {lower} parámetros para {what}",
  "git-error-no-general-args": "Ese comando no acepta parámetros comunes",
  "copy-tree-string": "Copiá el código de acá abajo",
  "learn-git-branching": "Aprendé a Branchear en Git",
  "select-a-level": "Seleccioná un nivel",
  "branch-name-short": "Perdón, necesitamos mantener los nombres de los branches cortos para visualizarlos. El nombre de tu rama se truncó a 9 caracteres, resultando en \"{branch}\"",
  "bad-branch-name": "El nombre \"{branch}\" no está permitido para los branches",
  "bad-tag-name": "El nombre \"{tag}\" no está permitido para los tags",
  "option-not-supported": "La opción {option} no está soportada",
  "git-usage-command": "git <comando> [<parametros>]",
  "git-supported-commands": "Comandos soportados:",
  "git-usage": "Uso:",
  "git-version": "Git Versión PCOTTLE.1.0",
  "flip-tree-command": "Invirtiendo el árbol...",
  "refresh-tree-command": "Refrezcando el árbol...",
  "locale-command": "Localización actualizada a {locale}",
  "locale-reset-command": "Localización vuelta al default, que es {locale}",
  "show-command": "Usá alguno de estos comandos para tener más información:",
  "show-all-commands": "Esta es una lista de los comandos disponibles:",
  "cd-command": "Directorio cambiado a \"/los/directorios/no/importan/en/esta/demo\"",
  "ls-command": "NoTePreocupesPorLosArchivosEnEstaDemo.txt",
  "mobile-alert": "LGB no puede recibir comandos en dispositivos móviles. Visitanos desde una desktop, ¡lo vale! :D",
  "share-tree": "¡Compartí este árbol con amigos! Pueden cargarlo con \"import tree\"",
  "paste-json": "¡Pegá un blob JSON abajo!",
  "solved-map-reset": "El mapa resuelto fue eliminado, estás arrancando desde un estado limpio",
  "level-cant-exit": "¡No estás en un nivel! Estás en el sandbox, comenzá un nivel usando \"levels\"",
  "level-no-id": "No se encontró ningún nivel {id}. Abriendo la vista de selección de niveles...",
  "undo-stack-empty": "No hay comandos que deshacer",
  "already-solved": "Ya resolviste este nivel, probá otros usando \"levels\" o volvé al sandbox usando \"sandbox\"",
  "command-disabled": "¡Ese comando de git está deshabilitado para este nivel!",
  "share-json": "Este es el JSON de este nivel. Compartilo con quien quieras o mandámelo por Github",
  "want-start-dialog": "No especificaste un mensaje de inicio, ¿querés agregar uno?",
  "want-hint": "No especificaste ninguna pista, ¿querés agregar alguna?",
  "prompt-hint": "Ingresá una pista para este nivel, o dejalo en blanco si no querés incluir ninguna",
  "prompt-name": "Ingresá el nombre del nivel",
  "solution-empty": "¡Tu solución está vacía! Algo hay que hacer",
  "define-start-warning": "Estableciendo el punto de inicio... La solución y el objetivo serán sobreescritos si ya habían sido definidos",
  "help-vague-level": "Estás en un nivel, por lo que hay varios tipos de ayuda. Por favor elegí entre \"help level\" para aprender algo más sobre esta lección, \"help general\" para ayuda sobre el uso de Learn GitBranching, o \"objective\" para aprender a resolver este nivel.",
  "help-vague-builder": "Estás en el constructor de niveles, por lo que hay varios tipos de ayuda. Elegí entre \"help general\" para ayuda sobre Learn GitBranching y \"help builder\" para ayuda sobre el constructor de niveles",
  "show-goal-button": "Mostrar objetivo",
  "hide-goal-button": "Ocultar objetivo",
  "goal-to-reach": "Objetivo a cumplir",
  "goal-only-master": "<span class=\"fwber\">Nota:</span> Sólo la rama master va a ser chequeada en este nivel. Las otras ramas sólo son para referencia. Como siempre, podés ocultar este mensaje con \"hide goal\"",
  "hide-goal": "Podés ocultar esta ventana con \"hide goal\"",
  "hide-start": "Podés ocultar esta ventana con \"hide start\"",
  "level-builder": "Constructor de niveles",
  "no-start-dialog": "¡No hay mensaje de inicio para este nivel!",
  "no-hint": "Mmm... Pareciera no haber pistas para este nivel :-/",
  "error-untranslated-key": "Aún no hay traducción para {key} :( ¡Metete en Github y sugerí una! :)",
  "error-untranslated": "Este mensaje o texto aún no fue traducido a tu idioma :( ¡Metete en Github y ayudanos a traducirlo!"
};
