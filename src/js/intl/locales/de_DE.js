module.exports = {
  "multiple-parents-name": "Mehrere Vorgänger",
  "multiple-parents-hint": "Nutze `git branch bugWork` mit einem Ziel-Commit um die fehlende Referenz zu erstellen.",
  "multiple-parents-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Vorgänger ansteuern",
            "",
            "Wie der Operator `~` akzeptiert auch der Operator `^` eine optionale Anzahl.",
            "",
            "Anstatt der Anzahl von Schritten, die zurückgegangen werden soll (das ist das, was man bei `~` angibt), bezeichnet die Anzahl nach `^` welchem Vorgänger bei einem Merge-Commit gefolgt werden soll. Du erinnerst dich, dass ein Merge-Commit mehrere Vorgänger hat; es gilt also aus diesen auszuwählen.",
            "",
            "Normalerweise folgt Git dem \"ersten\" Vorgänger des Merge-Commit, aber durch Angabe einer Zahl nach dem `^` lässt sich dieses Verhalten ändern.",
            "",
            "Aber genug gequatscht, schauen wir's uns in Aktion an.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Hier sehen wir einen Merge-Commit. Wenn wir einen Checkout von `master^` ohne Zahl machen, wird Git auf den ersten Vorgänger des Commits zurückgehen. ",
            "",
            "*(In unserer Darstellung befindet sich der erste Vorgänger direkt über dem Merge-Commit.)*"
          ],
          "afterMarkdowns": [
            "Simpel -- so kennen wir das."
          ],
          "command": "git checkout master^",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Jetzt versuchen wir mal stattdessen den zweiten Vorgänger anzugeben ..."
          ],
          "afterMarkdowns": [
            "Gesehen? Wir gehen zu dem anderen Vorgänger zurück."
          ],
          "command": "git checkout master^2",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Die Operatoren `^` und `~` geben uns eine Menge Möglichkeiten für das Navigieren durch den Commit-Baum:"
          ],
          "afterMarkdowns": [
            "Bämm!"
          ],
          "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Noch abgefahrener: die beiden Operatoren können verkettet werden. Aufgepasst:"
          ],
          "afterMarkdowns": [
            "Gleicher Ablauf wie zuvor, nur alles in einem Befehl."
          ],
          "command": "git checkout HEAD~^2~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Setzen wir's um",
            "",
            "Erstelle einen neuen Branch an dem angegebenen Ziel, um diesen Level abzuschließen.",
            "",
            "Es ist natürlich möglich den Commit einfach direkt anzugeben (also mit sowas wie `C6`), aber ich fordere dich heraus stattdessen die relativen Operatoren zu benutzen!"
          ]
        }
      }
    ]
  },
  "branching-name": "Branches in Git",
  "branching-hint": "Lege mit \"git branch <Name>\" einen neuen Branch an und checke ihn mit \"git checkout <Name> aus",
  "branching-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branches in Git",
            "",
            "Branches sind in Git extrem schlank. Sie sind einfach Verweise auf einen bestimmten Commit -- das ist alles. Es ist unter Git-Enthusiasten deshalb gängige Praxis, früh und oft Branches anzulegen.",
            "",
            "Da das Anlegen von Branches keinen Plattenplatz und Speicher verbraucht, liegt es nahe die Arbeit in kleine logische Häppchen aufzuteilen, anstatt mit wenigen großen, monolithischen Branches zu hantieren.",
            "",
            "Wir werden sehen wie Commits und Branches zusammengehören sobald wir anfangen mit beiden zu arbeiten. Bis hierhin merk dir einfach, dass ein Branch im Prinzip bedeutet \"ich möchte die Arbeit, die in diesem Commit und seinen Vorgängern steckt, sichern\"."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir mal, wie Branches in der Praxis aussehen.",
            "",
            "Wir legen einen neuen Branch an und nennen ihn `issue`:"
          ],
          "afterMarkdowns": [
            "Und das war's auch schon, mehr ist es nicht. Der Branch `issue` zeigt nun auf den Commit `C1`."
          ],
          "command": "git branch issue",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Lass uns mal ein wenig auf dem neuen Branch arbeiten. Machen wir einen Commit:"
          ],
          "afterMarkdowns": [
            "Oi! Der Branch `master` hat sich verändert, aber der Branch `issue` nicht. Das liegt daran, dass wir nicht \"auf\" dem neuen Branch waren, weshalb das Sternchen `*` auch hinter `master` steht."
          ],
          "command": "git commit",
          "beforeCommand": "git branch issue"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Sagen wir Git also erst mal auf welchem Branch wir arbeiten wollen, und zwar mit",
            "",
            "```",
            "git checkout <Name>",
            "```",
            "",
            "Das wird uns auf den neuen Branch bringen bevor wir unsere Änderungen committen."
          ],
          "afterMarkdowns": [
            "Und fertig! Unsere Änderungen wurden im neuen Branch gespeichert."
          ],
          "command": "git checkout issue; git commit",
          "beforeCommand": "git branch issue"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Cool! Jetzt bist du soweit, selbst Branches anzulegen. Wenn dieses Fenster geschlossen wurde, leg einen neuen Branch namens `bugFix` an und schalte auf diesen um."
          ]
        }
      }
    ]
  },
  "commits-name": "Einführung in Git Commits",
  "commits-hint": "Gib einfach zweimal 'git commit' ein um den Level abzuschließen",
  "commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Commits",
            "Ein Commit in ein Git-Repository speichert einen Abbildung aller Dateien in deinem Projektverzeichnis. Es ist wie ein riesiges Kopieren und Einfügen, nur besser.",
            "",
            "Allerdings will Git die Commits so schlank wie möglich halten, also kopiert es nicht einfach stur das ganze Verzeichnis jedes Mal wenn du committest. Es kann (wenn möglich) Commits als Menge von Änderungen zusammenpacken, von einer Version des Repositorys zur nächsten.",
            "",
            "Außerdem führt Git ein Protokoll darüber welche Commits wann gemacht wurden, und welcher auf welchen folgt. Deshalb werden die Commits hier mit ihrem Vorgänger über sich gezeigt -- wir verwenden Pfeile zur Darstellung der Beziehung. Dieses Protokoll zu haben ist eine tolle Sache für jeden, der an einem Projekt arbeitet.",
            "",
            "Das war jetzt eine Menge Neues, aber vorerst kannst du dir Commits einfach als Abbildungen des Projekts vorstellen. Commits sind sehr ressourcenschonend, und zwischen ihnen wechseln geht superschnell!"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Mal sehen wie das in der Praxis ist. Rechts sehen wir ein (kleines) Git-Repository. Es gibt akutell zwei Commits -- den initialen, `C0`, und den danach, `C1`, der irgendwelche Änderungen enthält.",
            "",
            "Klick die Schaltfläche unten um einen neuen Commit zu erzeugen:"
          ],
          "afterMarkdowns": [
            "Fertig. Klasse! Wir haben gerade Änderungen gemacht und als Commit im Repository gespeichert. Der Commit, den wir gerade gemacht haben, hat den Vorgänger `C1`; der verweist wiederum auf den Commit, auf dem er basiert: `C0`."
          ],
          "command": "git commit",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Probier das committen gleich mal aus! Mach zwei Commits um den Level abzuschließen."
          ]
        }
      }
    ]
  },
  "merging-name": "Mergen in git",
  "merging-hint": "Denk dran in der angegebenen Reihenfolge zu committen (erst bugFix, dann master)",
  "merging-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branches und Mergen",
            "",
            "Super! Wir wissen jetzt, wie man committet und einen Branch anlegt. Jetzt müssen wir nur noch rauskriegen, wie man die Arbeit, die in verschiedenen Branches steckt, zusammenführen kann. Dann können wir einen neuen Branch erstellen, darin ein neues Feature entwickeln, und das dann in den ursprünglichen Branch integrieren.",
            "",
            "Die einfachste Methode, mit der man Branches zusammenführen kann, ist `git merge`. Das Mergen erzeugt in git einen speziellen Commit, der zwei Vorgänger hat. Ein solcher Commit bedeutet im Prinzip \"ich möchte alle Arbeit von dem Vorgänger hier und dem dort *und* allen ihren jeweiligen Vorgängern miteinander kombinieren\".",
            "",
            "Grafisch dargestellt ist es einfacher zu verstehen, lass es uns mal ansehen"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Hier haben wir zwei Branches; jeder besteht jeweils aus einem eigenen Commit. Das bedeutet, dass keiner der beiden Branches alle Inhalte des gesamten Repositorys kennt. Das werden wir mit einem Merge ändern.",
            "",
            "Wir werden den Branch `bugFix` in `master` integrieren"
          ],
          "afterMarkdowns": [
            "Wow! Hast du das gesehen? Zunächst mal zeigt `master` jetzt auf einen Commit mit zwei Vorgängern. Wenn du den beiden Pfeilen immer weiter folgst, kommst du an jedem Commit im Repository vorbei. Das heißt `master` enthält jetzt alles, was es im Repository gibt.",
            "",
            "Siehst du außerdem wie sich die Farben der Commits verändert haben? Um die Vorgänge zu verdeutlichen hab ich etwas Farbe ins Spiel gebracht. Jeder Branch hat seine eindeutige Farbe. Jeder Merge Commit bekommt als Farbe eine Mischung aus den Farben seiner Vorgänger.",
            "",
            "Wir sehen also, dass die Farbe des Branch `master` in alle Commits gemischt wurde, die von `bugFix` aber nicht. Ändern wir das ..."
          ],
          "command": "git merge bugFix",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Mergen wir `master` in `bugFix`:"
          ],
          "afterMarkdowns": [
            "Da `bugFix` ein Vorgänger von `master` war, musste git hier kaum etwas tun; es verschiebt `bugFix` einfach auf den Commit, auf den auch `master` zeigt.",
            "",
            "Jetzt haben alle Commits dieselbe Farbe, das heißt jeder Branch enthält die Informationen des gesamten Repositorys! Juhu!"
          ],
          "command": "git checkout bugFix; git merge master",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Führe folgendes aus, um diesen Level zu schaffen:",
            "",
            "* Lege einen neuen Branch `bugFix` an",
            "* Checke `bugFix` aus mittels `git checkout bugFix`",
            "* Mach einen Commit",
            "* Geh mit `git checkout` zum `master` zurück",
            "* Mach noch einen Commit",
            "* Merge den Branch `bugFix` in `master` mit `git merge`",
            "",
            "*Denk dran, du kannst diese Meldung mit dem Befehl `objective` so oft anzeigen, wie du willst!*"
          ]
        }
      }
    ]
  },
  "rebasing-name": "Einführung in Rebase",
  "rebasing-hint": "Geh vor dem committen sicher, dass du auf bugFix arbeitest",
  "rebasing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Rebase",
            "",
            "Der zweite Weg um Inhalte aus verschiedenen Branches zu kombinieren ist `git rebase`. Rebasen nimmt im Prinzip eine Menge von Commits, \"kopiert\" sie und packt sie auf etwas anderes drauf.",
            "",
            "Auch wenn das erst mal komisch klingt liegt der Vorteil von Rebase darin, dass man es benutzen kann um hübsch lineare Abfolgen von Commits zu erhalten. Das Commit-Protokoll des Repositorys wird durch Rebase eine ganze Ecke einfacher aussehen, weil Merge Commits vermieden werden.",
            "",
            "Schauen wir's uns mal in Aktion an ..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Hier haben wir wieder zwei Branches; wie du siehst ist `bugFix` aktuell ausgewählt (sieht man am `*`).",
            "",
            "Wir würden jetzt gerne unsere Arbeit aus `bugFix` direkt auf den `master` packen. Das Ergebnis wäre, dass alle aktuellen Änderungen in `master` auch im Branch `bugFix` sind.",
            "",
            "Das machen wir mit dem Befehl `git rebase`:"
          ],
          "afterMarkdowns": [
            "Hammer! Was wir in `bugFix` gemacht haben ist jetzt oben auf `master` draufgepackt und wir haben eine schön lineare Abfolge von Commits bekommen.",
            "",
            "Commit `C3` existiert immer noch irgendwo (deswegen ist er blaß dargestellt) und `C3'` ist die \"Kopie\" die wir auf den `master` gepackt haben.",
            "",
            "Aber `master` ist jetzt nicht aktualisiert worden, lass uns das gerade noch nachholen ..."
          ],
          "command": "git rebase master",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Jetzt sind wir im `master`. Lass uns den mal auf `bugFix` rebasen ..."
          ],
          "afterMarkdowns": [
            "So! Da `master` ein Vorgänger von `bugFix` war konnte Git hier einfach den Bezeichner `master` auf denselben Commit schieben, auf den auch `bugFix` zeigt."
          ],
          "command": "git rebase bugFix",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um dieses Level abzuschließen musst du folgendes tun:",
            "",
            "* Einen neuen Branch namens `bugFix` auschecken",
            "* Einen Commit machen",
            "* Zurück zum `master` wechseln und noch einmal committen",
            "* `bugFix` auschecken und auf den `master` rebasen",
            "",
            "Viel Erfolg!"
          ]
        }
      }
    ]
  },
  "describe-name": "Git Describe",
  "describe-hint": "Committe nur einmal auf bugFix, wenn du soweit bist",
  "describe-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Git Describe",
            "",
            "Weil Tags so super als \"Anker\" im Repository dienen können bietet Git einen Befehl um zu *beschreiben* wo du dich relativ zum nächsten \"Anker\" (also Tag) befindest. Und der heißt `git describe`.",
            "",
            "Er hilft dir dabei, dir einen Überblick zu verschaffen nachdem du viele Commits im Log zurück- oder vorgegangen bist; das kann vorkommen nachdem du ein `git bisect` (eine Fehlersuche) abgeschlossen hast oder wenn du dich an den Rechner eines Kollegen setzt, der gerade aus dem Urlaub gekommen ist."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Der Befehl ist folgendermaßen aufgebaut:",
            "",
            "`git describe <Ref-Name>`",
            "",
            "Dabei ist `<Ref-Name>` jeder beliebige Name, der einem Commit zugeordnet ist (Branch, Tag etc). Wenn du keinen angibst benutzt Git `HEAD`, also den aktuellen Checkout.",
            "",
            "Die Befehlsausgabe sieht so aus:",
            "",
            "`<Tag-Name>_<Anzahl Commits>_g<Hash>`",
            "",
            "`<Tag-Name>` ist dabei der nächstliegende Tag in den Vorgänger-Commits, `<Anzahl Commits>` zeigt an, wieviele Commits dieses Tag entfernt ist und `<Hash>` ist das SHA des Commits, auf den das Tag zeigt."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns das schnell an einem Beispiel an. Für den folgenden Baum:"
          ],
          "afterMarkdowns": [
            "Der Befehl `git describe master` würde folgendes ausgeben:",
            "",
            "`v1_2_gC2`",
            "",
            "Wohingegen `git describe side` dies ausgeben würde:",
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
            "Das ist so ziemlich alles, was es über `git describe` zu wissen gibt. Versuch ein paar Orte in diesem Level damit auszugeben, um ein Gefühl dafür zu bekommen.",
            "",
            "Sobald du fertig bist, mach einfach einen Commit um den Level abzuschließen. Der geht auf's Haus. :P"
          ]
        }
      }
    ]
  },
  "grabbing-one-commit-name": "Einen Commit pflücken",
  "grabbing-one-commit-hint": "Vergiss nicht: hier kommst du mit interaktivem Rebase oder Cherry-Picking weiter",
  "grabbing-one-commit-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Lokale Commit-Haufen",
            "",
            "Folgende Situation habe ich beim Entwickeln des öfteren: ich bin auf der Suche nach einem Bug, aber er ist echt schwer zu finden. Um ihm auf die Spur zu kommen schreibe ich mehrere Debug-Kommandos und print-Befehle in den Code.",
            "",
            "Die committe ich auch immer wieder, je weiter die Suche mich trägt; natürlich in einem lokalen Branch. Schließlich finde ich den Bug, fixe ihn und freue mich!",
            "",
            "Einziges Problem ist, dass ich diesen `bugFix` jetzt zurück in den `master` kriegen muss. Wenn ich einfach den `master` vorspule oder meinen Branch hinein merge, bekäme der `master` auch die ganzen Debug-Befehle, was nicht gewünscht ist. Das muss anders gehen ..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Wir müssten Git sagen können, dass es nur einen Commit herüber kopieren soll. Das ist genauso wie die Level vorhin zum Code-Verschieben. Wir können dieselben Befehle benutzen:",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Da dies ein späterer Level ist überlasse ich es dir zu entscheiden, welchen Befehl du benutzen willst. Aber um da Level zu schaffen musst du irgendwie sicherstellen, dass `master` den Commit bekommt, auf den `bugFix` zeigt."
          ]
        }
      }
    ]
  },
  "juggling-commits-name": "Jonglieren mit Commits",
  "juggling-commits-hint": "Der erste Befehl ist git rebase -i HEAD~2",
  "juggling-commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Jonglieren mit Commits",
            "",
            "Eine weitere häufig vorkommende Situation: du hast einige Änderungen in `newImage` und weitere Änderungen in `caption`. Die Änderungen hängen voneinander ab, das heißt in diesem Fall `caption` ist ein Nachfolger von `newImage`.",
            "",
            "Nun kann es vorkommen, dass du einen früheren Commit verändern willst. In unserem Fall will die Design-Abteilung, dass die Abmessungen in `newImage` leicht verändert werden, obwohl das mitten in unserer History liegt!"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um das zu schaffen gehen wir wie folgt vor:",
            "",
            "* Wir sortieren die Commits mit `git rebase -i` so um, dass der, den wir ändern wollen, ganz oben liegt.",
            "* Wir verändern den Commit mit `git commit --amend`.",
            "* Dann sortieren wir die Commit mit einem erneuten `git rebase -i` wieder in die alte Reihenfolge.",
            "* Schließlich aktualisieren wir den `master` auf das Ende unseres fertigen Baums, um diesen Level abzuschließen.",
            "",
            "Es gibt sehr viele Wege um das Endziel dieses Levels zu erreichen (ich sehe, du schielst auf `cherry-pick`) und wir werden uns später noch andere ansehen. Aber für's erste lass uns diese Methode ausprobieren.",
            "",
            "Beachte den geschilderten Zielzustand. Da wir die Commits zweimal umsortieren bekommen sie jedesmal ein Apostroph hinzugefügt (weil sie jedesmal kopiert werden). Ein weiteres Apostroph entsteht durch den `commit --amend`.",
            "",
            "Zuguterletzt noch eine Bemerkung: ich kann Level nur auf Struktur und Apostroph-Differenz prüfen. So lange wie dein `master` am Ende dieselbe Struktur und Apostroph-Differenz aufweist wie der Ziel-`master`, ist der Level bestanden."
          ]
        }
      }
    ]
  },
  "juggling-commits2-name": "Jonglieren mit Commits Teil 2",
  "juggling-commits2-hint": "Vergiss nicht den master auf die aktuelle Version vorzuspulen",
  "juggling-commits2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Jonglieren mit Commits Teil 2",
            "",
            "Du solltest \"Jonglieren mit Commits\" (den vorherigen Level) bestanden haben, bevor du dich an diesem hier versuchst.",
            "",
            "Wie du im letzten Level gesehen hast haben wir `git rebase -i` genutzt, um die Commits neu anzuordnen. Sobald der Commit, den wir ändern wollte, ganz oben war, konnten wir das auch einfach mit `git commit --amend` tun. Danach haben wir die alte Reihenfolge wiederhergestellt.",
            "",
            "Das einzige Problem ist hier, dass da eine Menge Umsortieren stattfindet, was zu Rebase-Konflikten führen kann. Schauen wir uns also eine Methode mit `git cherry-pick` an."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Wie du dich erinnerst macht `git cherry-pick` eine Kopie des angegebenen Commits und fügt sie an `HEAD` an (es sei denn der Commit ist ein Vorgänger von `HEAD`).",
            "",
            "Hier eine kleine Demo zur Erinnerung:"
          ],
          "afterMarkdowns": [
            "Schick! Und weiter geht's."
          ],
          "command": "git cherry-pick C2",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "In diesem Level geht es also auch um das Ziel den Commit `C2` zu modifizieren, aber ohne `git rebase -i` zu benutzen. Ich überlass es dir herauszufinden, wie das gehen soll. :D",
            "",
            "Nicht vergessen, die genaue Anzahl von Kopien (d.h. Apostrophen) ist nicht ausschlaggebend, nur die Differenz. Der Level ist zum Beispiel auch gelöst, wenn dein fertiger Baum dieselbe Struktur wie der Ziel-Baum hat, aber *überall* ein Apostroph mehr aufweist."
          ]
        }
      }
    ]
  },
  "tags-name": "Git Tags",
  "tags-hint": "Du kannst den Checkout entweder direkt auf den Commit oder das Tag machen.",
  "tags-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Tags",
            "",
            "Wie du aus den vorhergehenden Levels weißt sind Branches einfach durch die Gegend zu schieben und zeigen auf verschiedene Commits, während die Arbeit in ihnen fortschreitet. Ein Branch wird oft verändert, manchmal nur temporär, und ist ständig in Bewegung.",
            "",
            "Da das so ist fragst du dich vielleicht, ob es nicht eine Möglichkeit gibt, eine bestimmte Stelle in deiner Projekt-History *permanent* zu kennzeichnen. Kann man nicht zum Beispiel für große Releases und Meilensteine nicht einen Commit mit etwas festerem kennzeichnen, als mit einem Branch-Namen?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Aber klar! In Git gibt es genau zu diesem Zweck Tags -- sie kennzeichnen einen Commit (ziemlich) permanent als Meilenstein oder ähnliches, und man kann sie ansprechen wie Branch-Namen.",
            "",
            "Noch viel wichtiger, Tags verändern nicht ihre Position wenn man Commits hinzufügt. Du kannst ein Tag nicht in diesem Sinne auschecken und dann Modifikationen darauf committen. Tags sind Anker im Commit-Baum, die bestimmte Stellen anzeigen.",
            "",
            "Lass uns anschauen wie Tags in der Praxis funktionieren."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Lass uns ein Tag bei `C1` anlegen und damit die Version 1 unseres Prototyps markieren."
          ],
          "afterMarkdowns": [
            "Peng! Ziemlich einfach. Wir haben das Tag `v1` genannt und lassen es auf `C1` zeigen. Wenn du den Commit weglässt wird das Tag für den Commit erzeugt, auf den `HEAD` zeigt."
          ],
          "command": "git tag v1 C1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um diesen Level zu schaffen, erstelle einfach die Tags wie sie in der Zielbeschreibung stehen und mach dann einen Checkout auf `v1`. Beachte wie du dabei in den \"Detached HEAD\" Zustand gehst -- das liegt daran, dass du keine Commits direkt auf das `v1` Tag machen kannst.",
            "",
            "Im nächsten Level schauen wir uns dann interessantere Anwendungsfälle für Tags an."
          ]
        }
      }
    ]
  },
  "cherry-pick-name": "Einführung Cherry-picking",
  "cherry-pick-hint": "git cherry-pick gefolgt von Commit-Namen.",
  "cherry-pick-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Inhalte verschieben",
            "",
            "Bis jetzt haben wir uns die Grundlagen von Git angeschaut -- comitten, verzweigen und sich im Commit-Baum bewegen. Nur damit lässt sich schon 90% der Macht von Git-Repositories nutzen und die meisten Anforderungen von Entwicklern erfüllen.",
            "",
            "Die übrigen 10% jedoch können in komplexeren Abläufen sehr hilfreich sein (oder wenn man sich in eine schwierige Lage manövriert hat). Das nächste was wir uns anschauen, ist, Inhalte durch den Commit-Baum zu schieben. Es gibt dem Entwickler die Möglichkeit in präziser, eloquenter Manier zu sagen \"Ich will diese Inhalte hier und diese dort haben\".",
            "",
            "Das klingt vielleicht nach einer Menge, aber es ist sehr einfach."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## git cherry-pick",
            "",
            "Der erste Befehl in dieser Serie ist `git cherry-pick`. Er sieht so aus:",
            "",
            "* `git cherry-pick <Commit1> <Commit2> <...>`",
            "",
            "Er ist eine einfache Möglichkeit um auszudrücken, dass du eine Folge von Commits unter deinen aktuellen Checkout (also `HEAD`) hängen möchtest. Ich persönlich liebe `cherry-pick`, weil es wenig Magic enthält und einfach zu verstehen ist.",
            "",
            "Schauen wir's uns mal an.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Hier haben wir ein Repository mit einigem Zeugs im Branch `side`, das wir in den Branch `master` kopieren wollen. Das könnten wir mit einem Rebase machen (wie bereits gesehen), aber schauen wir mal wie das mit `cherry-pick` geht."
          ],
          "afterMarkdowns": [
            "Das war's! Wir wollten die commits `C2` und `C4` und Git hat die einfach unter unseren aktuellen Checkout kopiert. So einfach ist das."
          ],
          "command": "git cherry-pick C2 C4",
          "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um diesen Level zu schaffen musst du einfach nur einige Commits aus den drei gezeigten Branches in den `master` kopieren. Der Zielbaum zeigt dir, welche.",
            ""
          ]
        }
      }
    ]
  },
  "detached-head-name": "Den Kopf abtrennen",
  "detached-head-hint": "Benutze den Bezeichner (den Hash) des Commits.",
  "detached-head-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Navigation durch Git",
            "",
            "Bevor wir uns einige fortgeschrittene Konzepte in Git ansehen ist es wichtig, verschiedene Wege zum Navigieren durch den Commit-Baum, der das Projekt enthält, zu kennen.",
            "",
            "Sobald du das drauf hast, vergrößern sich deine Möglichkeiten in allen anderen Git-Befehlen.",
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
            "Erst mal müssen wir über `HEAD` reden. `HEAD` ist ein Alias für den Commit, der gerade ausgecheckt ist -- es ist im Prinzip der Commit, an den du deinen nächsten Commit hängst.",
            "",
            "`HEAD` zeigt immer auf den neuesten Commit. Die meisten Git-Befehle, die den Baum verändern, fangen damit an dass sie `HEAD` verschieben.",
            "",
            "Normalerweise zeigt `HEAD` auf einen Branch-Namen (z.B. `bugFix`). Wenn du einen Commit machst, wird `bugFix` auf diesen Commit geschoben, und `HEAD` (da es auf `bugFix` zeigt) automatisch auch."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns das mal in Aktion an. Wir werden hier `HEAD` vor und nach dem Commit anzeigen."
          ],
          "afterMarkdowns": [
            "Siehst du? `HEAD` war die ganze Zeit unter `master` versteckt."
          ],
          "command": "git checkout C1; git checkout master; git commit; git checkout C2",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "### HEAD abkoppeln",
            "",
            "`HEAD` abzukoppeln bedeutet, es direkt an einen bestimmten Commit zu hängen, anstatt an einen Branch. Wir gelangen dadurch in den \"detached HEAD state\". So sieht's vorher aus:",
            "",
            "`HEAD` -> `master` -> `C1`",
            ""
          ],
          "afterMarkdowns": [
            "Und jetzt:",
            "",
            "`HEAD` -> `C1`"
          ],
          "command": "git checkout C1",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um diesen Level abzuschließen, lass uns mal `HEAD` von `bugFix` abkoppeln und an den Commit hängen.",
            "",
            "Gib den Commit mit seinem Hash an. Der Hash jedes Commits steht in dem Kreis, der den Commit darstellt."
          ]
        }
      }
    ]
  },
  "interactive-rebase-name": "Einführung Interactive Rebase",
  "interactive-rebase-hint": "Du kannst entweder Branches oder relative Ref-Angaben (z.B. HEAD~) benutzen, um das Ziel des Rebase anzugeben.",
  "interactive-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Interaktiver Rebase",
            "",
            "Cherry-pick ist großartig wenn du genau weißt, welche Commits du willst (_und_ ihre jeweiligen Hashes kennst) -- es ist dann schwer an Einfachheit zu überbieten.",
            "",
            "Aber wie sieht es aus, wenn du die Commits nicht genau kennst, die du brauchst? Zum Glück bietet Git auch dafür eine Lösung an. Das können wir mit interaktivem Rebase machen -- die beste Art sich eine Serie von Commits in einem Rebase genau anzusehen.",
            "",
            "Schauen wir uns die Details an ..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Interaktives Rebase bedeutet einfach nur, dass man dem `rebase` Befehl die Option `-i` hinzufügt.",
            "",
            "Wenn du das machst, zeigt Git dir jeden einzelnen Commit, der durch den Rebase kopiert werden würde. Es zeigt dir die Hashes und Kommentare, was gut ist um einen Überblick zu bekommen.",
            "",
            "In echtem Git besteht dieser Dialog daraus, die Commits in einem Text-Editor angezeigt zu bekommen. Für unsere Zwecke hab ich ein kleines Dialog-Fenster gebaut, dass sich ähnlich verhält."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Wenn sich der Dialog für den interaktiven Rebase öffnet, kannst du drei Dinge tun:",
            "",
            "* Du kannst die Reihenfolge der Commits durch Ziehen und Ablegen ändern.",
            "* Du kannst Git sagen, einen Commit beim Rebase zu ignorieren -- im Dialog durch die Schaltfläche `pick` dargestellt.",
            "* Außerdem kannst du Commit zusammenfassen (squash). Leider wird das hier nicht unterstützt, aber in echtem Git fasst es Commits zu einem zusammen.",
            "",
            "Super! Schauen wir uns ein Beispiel an."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Wenn du die Schaltfläche anklickst wird sich der Rebase-Dialog öffnen. Veränder die Reihenfolge der Commits oder klick bei einigen auf `pick` und schau dir das Ergebnis an."
          ],
          "afterMarkdowns": [
            "Bämm! Git hat die Commits genau so kopiert, wie du es ausgewählt hast."
          ],
          "command": "git rebase -i HEAD~4 --aboveAll",
          "beforeCommand": "git commit; git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um dieses Level zu schaffen mach einen interaktiven Rebase, um genau die Reihenfolge zu erzeugen die im Ziel-Baum angezeigt wird. Denk daran, dass du jederzeit mit `undo` oder `reset` Fehler rückgängig machen kannst. :D"
          ]
        }
      }
    ]
  },
  "relative-refs-name": "Relative Referenzen (^)",
  "relative-refs-hint": "Denk an den Dach-Operator (^)!",
  "relative-refs-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Relative Referenzen",
            "",
            "Es kann etwas mühselig werden, sich in einem Commit-Baum mittels Angabe der Hashes zu bewegen. Im echten Leben hat man normalerweise keine hübsche Visualisierung des Baumes neben seinem Terminal, also benutzt man `git log` um die Hashes zu sehen.",
            "",
            "Außerdem sind die echten Hashes sehr viel länger und nicht fortlaufend nummeriert. Beispielsweise heißt der Hash, mit dem ich den letzten Level committet habe, in echt `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`. Nicht gerade einprägsam ...",
            "",
            "Zum Glück ist Git intelligent wenn es um die Hashes geht. Du musst nur soviele Zeichen eines Hashes angeben, bis der Hash eindeutig ist. Ich kann also `fed2` eingeben anstatt die komplette Zeichenkette tippen zu müssen."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Wie ich schon sagte: Commits über ihren Hash zu referenzieren ist nicht gerade der bequemste Weg. Weshalb es in Git relative Referenzen gibt. Welche super sind!",
            "",
            "Mit relativen Referenzen kann man bei einem leicht zu merkenden Bezeichner anfangen (zum Beispiel dem Branch-Namen `bugFix` oder der Referenz `HEAD`) und sich von dort vorarbeiten.",
            "",
            "Relative Referenzierung von Commits kann komplex sein, aber wir starten mit zwei einfachen Beispielen:",
            "",
            "* Geh einen Commit zurück mit `^`",
            "* Geh eine bestimmte Anzahl von Commits zurück mit `~<Anzahl>`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns zuerst den Dach-Operator (`^`) an. Jedes mal wenn du ihn hinter einen Referenz-Namen setzt, sagst du Git damit, dass es zum Vorgänger des angegebenen Commits gehen soll.",
            "",
            "Das heißt `master^` ist gleichbedeutend mit \"direkter Vorgänger des Commits, auf den `master` zeigt\".",
            "",
            "`master^^` ist also der Vorgänger des Vorgängers von `master`.",
            "",
            "Wir checken jetzt mal den Commit vor `master` aus:"
          ],
          "afterMarkdowns": [
            "Bämm! Fertig. Einfacher, als den Commit-Hash zu tippen (oder zu kopieren)."
          ],
          "command": "git checkout master^",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Du kannst auch `HEAD` als Basis für relative Referenzen benutzen. Lass uns das ein paar Mal verwenden, um uns im Commit-Baum nach oben zu bewegen."
          ],
          "afterMarkdowns": [
            "Das war einfach. Wir reisen mit `HEAD^` in der Zeit zurück."
          ],
          "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
          "beforeCommand": "git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um dieses Level abzuschließen musst du den direkten Vorgänger von `bugFix` auschecken. Dadurch wirst du `HEAD` von `bugFix` abkoppeln.",
            "",
            "Du kannst natürlich den Hash angeben, aber versuch doch relative Referenzen zu benutzen!"
          ]
        }
      }
    ]
  },
  "relative-refs2-name": "Relative Referenzen #2 (~)",
  "relative-refs2-hint": "Du musst mindestens einen Hash benutzen, um dieses Level zu schaffen",
  "relative-refs2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Der \"~\"-Operator",
            "",
            "Nehmen wir an du willst viele Schritte im Commit-Baum zurückgehen. Dann wird es schnell mühsam immer wieder `^` einzugeben; deswegen gibt es in Git den Tilde-Operator `~`.",
            "",
            "Der Tilde-Operator akzeptiert optional eine Zahl, mit der du angeben kannst, wieviele Vorgänger du zurückgehen willst. Keine Anzahl anzugeben, bewirkt dasselbe wie `~1`."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Geben wir mit `~` an wieviele Commits wir zurückgehen wollen"
          ],
          "afterMarkdowns": [
            "Peng! So einfach -- relative Referenzen sind super."
          ],
          "command": "git checkout HEAD~4",
          "beforeCommand": "git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Erzwungene Branches",
            "",
            "Du bist jetzt Experte in Sachen relative Referenzen, also lass sie uns mal richtig einsetzen.",
            "",
            "Das Verschieben von Branches ist einer der häufigsten Anwendungsfälle dafür. Du kannst einen Branchnamen direkt auf einen bestimmten Commit setzen (_ohne_ ihne vorher ausgecheckt haben zu müssen!) indem du den Parameter `-f` benutzt. So in etwa:",
            "",
            "`git branch -f master HEAD~3`",
            "",
            "Das bewegt (erzwungenermaßen) den `master` auf den Commit drei Vorgänger vor `HEAD`."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns das mal in Aktion an:"
          ],
          "afterMarkdowns": [
            "Das war's schon! Relative Referenzen ermöglichen es uns den Commit `C1` sehr einfach anzugeben und `git branch -f` ermöglicht es uns, den Branch sehr schnell auf diesen Commit zu setzen."
          ],
          "command": "git branch -f master HEAD~3",
          "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Jetzt wo du relative Referenzen und erzwungenes Branching in Kombination gesehen hast können wir damit den nächsten Level bewältigen.",
            "",
            "Bewege `HEAD`, `master` und `bugFix` an die jeweils angegebenen Positionen, um diesen Level abzuschließen."
          ]
        }
      }
    ]
  },
  "reversing-changes-name": "Änderungen in Git rückgängig machen",
  "reversing-changes-hint": "Beachte, dass revert und reset unterschiedliche Argumente benötigen",
  "reversing-changes-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Änderungen in Git rückgängig machen",
            "",
            "Es gibt viele Möglichkeiten, Änderungen in Git zurückzunehmen. Und ebenso wie das Committen hat auch das rückgängig Machen eine Basis-Komponente (Dateien und Inhalte vormerken) und einen übergeordneten Aspekt (wie die Änderungen tatsächlich zurückgenommen werden). Diese Applikation beschäftigt sich wiederum mit den übergeordneten Vorgängen.",
            "",
            "Es gibt grundsätzlich zwei Arten in Git etwas rückgängig zu machen -- einerseits `git reset` und andererseit `git revert`. Wir schauen uns beide mal an.",
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
            "`git reset` nimm Änderungen zurück, indem es eine Branch-Referenz auf einen anderen Commit setzt. Es ist ein bisschen (aber nicht wirklich) wie \"Geschichte umschreiben\"; `git reset` bewegt einen Branch auf einen anderen Commit, als hätte er nie anders ausgesehen.",
            "",
            "Schauen wir, wie das aussieht:"
          ],
          "afterMarkdowns": [
            "Schick! Git hat den `master` einfach auf `C1` gesetzt; unser lokales Repository sieht nun so aus, als hätte `C2` nie stattgefunden."
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
            "Obwohl `git reset` super im lokalen Kontext funktioniert, ist der Ansatz vom \"Umschreiben\" der Commit-Geschichte nicht geeignet für Branches, die auf einem Server liegen und auch von anderen benutzt werden.",
            "",
            "Um Änderungen rückgängig zu machen und das mit anderen zu *teilen* müssen wir `git revert` benutzen. Schauen wir uns das in Aktion an."
          ],
          "afterMarkdowns": [
            "Komisch, es ist ein neuer Commit entstanden. Das liegt daran, dass `C2'` genau die *Änderungen* enthält, die die Änderungen aus `C2` aufheben.",
            "",
            "Durch Reverten kannst du das Zurücknehmen von Änderungen mit anderen teilen."
          ],
          "command": "git revert HEAD",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um diesen Level abzuschließen musst du sowohl auf `local` also auch auf `pushed` jeweils die zwei letzten Commits zurücknehmen.",
            "",
            "Vergiss nicht, dass `pushed` auch auf einem Server liegt und `local` ein rein lokaler Branch ist -- das sollte dir helfen, die richtige Methode zu wählen."
          ]
        }
      }
    ]
  },
  "many-rebases-name": "10000 Rebases unter dem `HEAD`",
  "many-rebases-hint": "Nicht vergessen: die effizienteste Möglichkeit könnte sein, schließlich einfach nur den master zu aktualisieren ...",
  "many-rebases-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Mehrere Branches rebasen",
            "",
            "Wow, wir haben hier ja eine Menge Branches! Lass uns mal die ganze Arbeit, die in diesen Branches steckt, auf den `master` packen, um sie auf Stand zu bringen.",
            "",
            "Die Führungsetage macht die Sache allerdings etwas trickreicher -- die möchten, dass alle Commits in aufsteigender Reihenfolge geordnet sind. Das heißt unser fertiger Baum sollte `C7` ganz unten haben, darüber `C6` und so weiter und so fort.",
            "",
            "Wenn du irgendwo einen Fehler machst, benütze ruhig `reset` um wieder von vorne anzufangen oder `undo` um einen Schritt zurückzugehen. Schau dir die Lösung an und versuch es in weniger Schritten hinzubekommen."
          ]
        }
      }
    ]
  },
  "selective-rebase-name": "Branch-Spaghetti",
  "selective-rebase-hint": "Stelle sicher, dass du alles in der richtigen Reihenfolge machst! Branche erst one, dann two, dann three.",
  "selective-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branch-Spaghetti",
            "",
            "Puh! Wir haben ein ganz schön schweres Ziel für dieses Level.",
            "",
            "Wir haben hier einen `master`, der ein paar Commits weiter ist als die Branche `one`, `two` und `three`. Aus welchem Grund auch immer müssen wir diese drei anderen Branches mit modifizierten Versionen der paar letzten Commits von `master` aktualisieren.",
            "",
            "Branch `one` benötigt eine Umsortierung und `C5` muss gelöscht werden. `two` muss nur umsortiert werden und `three` braucht nur einen Commit!",
            "",
            "Ich lass dich diese Aufgabe selbst lösen -- schau dir hinterher auf jeden Fall die Lösung mit `show solution` an."
          ]
        }
      }
    ]
  },
  "clone-name": "Clone Einführung",
  "clone-hint": "Einfach git clone ausführen!",
  "clone-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Remotes",
            "",
            "Entfernte Repositorys sind nicht weiter kompliziert. In dieser Welt des Cloud Computings könnte man vielleicht glauben, dass hinter entfernten Git-Repositorys eine Menge Magie steckt, aber es sind einfach nur Kopien eines Repositorys auf einem anderen Rechner. Du kannst mit diesem Rechner typischerweise über das Internet kommunizieren, was es dir ermöglicht Commits hin und her zu schicken.",
            "",
            "Nichts desto weniger haben entfernte Repositorys eine Menge toller Eigenschaften:",
            "",
            "- Vor allem: sie sind ein super Backup! Lokale Git-Repositorys können deine Arbeitskopie ein jeden beliebigen früheren Zustand versetzen (wie du ja weißt), aber all diese Informationen liegen eben bei dir lokal. Wenn es Kopien von deinem Repository auf anderen Rechnern gibt, kannst du ruhig all deine Daten verlieren und trotzdem genau da weitermachen, wo du aufgehört hast.",
            "",
            "- Noch wichtiger: Remotes geben dem Entwickeln eine soziale Komponente! Wenn eine Kopie deines Projekts woanders liegt können deine Freunde sehr einfach etwas zu dem Projekt beitragen (oder sich deine neuesten Änderungen holen).",
            "",
            "Websites, die die Aktivitäten um diese entfernten Repositorys darstellen (wie [Github](https://github.com/) oder [Phabricator](http://phabricator.org/)) erfreuen sich zunehmender Beliebtheit, aber entfernte Repositorys sind _immer_ das Rückgrat für diese Werkzeuge. Deshalb ist es wichtig, sie zu verstehen."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Der Befehl um ein Remote zu erstellen",
            "",
            "Bis jetzt hat sich Learn Git Branching darauf konzentriert, die Grundlagen der _lokalen_ Arbeit mit Repositorys zu vermitteln (Branche anlegen, zusammenführen, Rebasen etc). Jetzt wollen wir allerdings lernen mit entfernten Repositorys zu arbeiten und brauchen für die Level eine entsprechende Umgebung. Die schaffen wir mit `git clone`.",
            "",
            "In der Realität ist `git clone` eigentlich der Befehl, mit dem du eine _lokale_ Kopie eines _entfernten_ Repositorys erstellst (das zum Beispiel auf Github liegt). Wir benutzen diesen Befehl in Learn Git Branching allerdings ein wenig anders -- hier macht `git clone` tatsächlich eine Kopie von deinem lokalen Repository auf einem \"entfernten Server\". Klar, das ist eigentlich genau das Gegenteil von dem was der echte Befehl macht, aber es hilft den Zusammenhang zwischen Cloning und der Arbeit mit entfernten Repositorys herzustellen, also machen wir's einfach so.",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Fangen wir langsam an und schauen nur wie ein entferntes Repository in unserer Darstellung aussieht.",
            ""
          ],
          "afterMarkdowns": [
            "Da ist es! Jetzt haben wir ein entferntes Repository unseres Projektes. Es sieht so aus wie das lokale, nur mit ein paar Änderungen in der Darstellung -- in späteren Leveln wirst du sehen, wie man Änderungen zwischen den Repositorys austauschen kann."
          ],
          "command": "git clone",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um diesen Level abzuschließen führ einfach `git clone` auf deinem bestehenden Repository aus. Alles weitere kommt in den nächsten Leveln."
          ]
        }
      }
    ]
  },
  "fake-teamwork-name": "Teamarbeit simulieren",
  "fake-teamwork-hint": "Nicht vergessen, du kannst angeben wieviele Commits simuliert werden sollen.",
  "fake-teamwork-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Zusammenarbeit simulieren",
            "",
            "Hier ist das Problem -- für einige der folgenden Level müssen wir lernen, wie man Änderungen vom entfernten Server holt.",
            "",
            "Das heißt wir müssen im Grunde \"so tun\" also ob der Server von einem Kollegen / Freund / Mitarbeiter aktualisiert worden wäre, manchmal ein bestimmter Branch oder eine bestimmte Anzahl von Commits.",
            "",
            "Um das zu tun führen wir den passend benannten Befehl `git fakeTeamwork` ein! Er ist ziemlich selbsterklärend, schauen wir uns ihn an ..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Das normale Verhalten von `fakeTeamwork` ist es, einen Commit auf den entfernten `master` zu machen."
          ],
          "afterMarkdowns": [
            "Da haben wir's -- der Server ist mit einem neuen Commit aktualisiert worden und wir haben ihn noch nicht lokal, weil wir nicht `git fetch` oder `git pull` ausgeführt haben."
          ],
          "command": "git fakeTeamwork",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Du kannst auch angeben wieviele Commits oder auf welchem Branch sie gemacht werden sollen, indem du das an den Befehl anhängst."
          ],
          "afterMarkdowns": [
            "Mit einem Befehlt haben wir simuliert, dass ein Kollege drei Commits auf den  Branch `foo` gepackt hat."
          ],
          "command": "git fakeTeamwork foo 3",
          "beforeCommand": "git branch foo; git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Die kommenden Level werden recht anspruchsvoll, daher verlangen wir auch in diesem Level schon etwas mehr.",
            "",
            "Leg los und erstelle ein Remote (mit `git clone`), simuliere ein paar Änderungen auf dem Server, committe lokal und dann zieh dir die Änderungen vom Server. Das ist wie mehrere Level in einem!"
          ]
        }
      }
    ]
  },
  "fetch-name": "Git Fetch",
  "fetch-hint": "Einfach git fetch ausführen!",
  "fetch-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Fetch",
            "",
            "In Git mit entfernten Repositorys zu arbeiten lässt sich wirklich auf das Hin- und Zurückübertragen von Daten reduzieren. Solange wir Commits hin und her schicken können, können wir jede Art Update teilen, das von Git getrackt wird (und somit Arbeit, neue Dateien, neue Ideen, Liebesbriefe etc. teilen).",
            "",
            "In diesem Level werden wir lernen, wie man Daten _von_ einem entfernten Repository holt -- der entsprechende Befehl heißt praktischerweise `git fetch`.",
            "",
            "Dir wird auffallen, dass mit der Aktualisierung unserer Darstellung des entfernten Repositorys die _Remote_ Branches auf den neuesten Stand gebracht werden. Das passt zum vorherigen Level über Remote Branches."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Bevor wir uns die Einzelheiten von `git fetch` ansehen wollen wir es mal in Aktion sehen. Wir haben hier ein entferntes Repository, das zwei Commits hat die in unserem lokalen Repository fehlen."
          ],
          "afterMarkdowns": [
            "Das war's! Die Commits `C2` und `C3` wurden zu unserem Repository heruntergeladen und unser Remote Branch `o/master` wurde aktualisiert."
          ],
          "command": "git fetch",
          "beforeCommand": "git clone; git fakeTeamwork 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Was Fetch tut",
            "",
            "`git fetch` führt genau zwei Schritte aus:",
            "",
            "* Es lädt die Commits herunter, die im lokalen Repository fehlen, und ...",
            "* aktualisiert die Remote Branches wo nötig (zum Beispiel, `o/master`).",
            "",
            "`git fetch` synchronisiert im Prinzip unsere _lokale_ Abbildung des entfernten Repositorys mit dem wie das entfernte Repository _tatsächlich_ aussieht (in diesem Moment).",
            "",
            "Wie du dich vielleicht erinnerst, haben wir im letzten Level gesagt, dass die Remote Branches den Zustand der Branches auf dem entfernten Repository darstellen _seit_ du das letzte Mal dieses Repository angesprochen hast. `git fetch` ist die Methode mit der du das Repository ansprichst! Der Zusammenhang zwischen Remote Branches und `git fetch` ist damit hoffentlich klar.",
            "",
            "`git fetch` kommuniziert mit dem entfernten Repository in der Regel über das Internet (über ein Protokoll wie `http://` oder `git://`).",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Was Fetch nicht tut",
            "",
            "`git fetch` ändert allerdings überhaupt nichts an _deinen_ lokalen Branches. Es aktualisiert nicht deinen `master` oder ändert irgendetwas an deinem Checkout.",
            "",
            "Das ist wichtig zu wissen, denn eine Menge Entwickler glauben, wenn sie `git fetch` ausführen würden ihre lokalen Branches auf den Stand des entfernten Repositorys gebracht. Es lädt zwar alle Daten herunter, damit man diese Aktualisierung durchführen kann, aber es ändert _nichts_ an deinen lokalen Branches. Wir werden in späteren Level Befehle genau dafür kennenlernen. :D",
            "",
            "Am Ende des Tages kannst du dir `git fetch` also als den Download-Schritt vorstellen."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um diesen Level zu schaffen musst du einfach nur `git fetch` ausführen, um alle Commits herunterzuladen!"
          ]
        }
      }
    ]
  },
  "fetch-args-name": "Optionen für Fetch",
  "fetch-args-hint": "Beachte wie die Commit IDs getauscht wurden! Du kannst den Einführungsdialog mit \"help level\" erneut anzeigen",
  "fetch-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Fetch Optionen",
            "",
            "Nun haben wir also alles über `git push` Optionen gelernt, diesen coolen `<Ort>`-Parameter, and sogar über mit Doppelpunkt getrennte Ref-Spezifikationen (`<Quelle>:<Ziel>`). Können wir all dieses neu erworbene Wissen auch auf `git fetch` anwenden?",
            "",
            "Jede Wette! Die Optionen für `git fetch` sind wirklicht *sehr, sehr* ähnlich denen von `git push`. Es sind dieselben Verfahren, nur in die andere Richtung angewendet (da man bei `fetch` herunterlädt anstatt hochzuladen).",
            "",
            "Gehen wir die verschiedenen Verfahrensweise mal eine nach der anderen durch ..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Der Parameter `<Ort>`",
            "",
            "Wenn du, wie folgt, einen \"Ort\" bei `git fetch` angibst:",
            "",
            "`git fetch origin foo`",
            "",
            "wird Git zum Branch `foo` auf dem Remote gehen, dort alle Änderungen holen, die es lokal noch nicht gibt, und sie an den lokalen Branch `o/foo` anhängen.",
            "",
            "Schauen wir uns das mal live an (nur zur Wiederholung)"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Durch Angabe eines Ortes ..."
          ],
          "afterMarkdowns": [
            "... laden wir die fehlenden Commits von `foo` und packen sie auf `o/foo` drauf."
          ],
          "command": "git fetch origin foo",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Du wunderst dich vielleicht warum Git diese Commits auf den `o/foo` Branch gepacht hat, anstatt einfach direkt auf den lokalen Branch `foo`? Zeigt der Parameter `<Ort>` nicht einen Ort an, der sowohl lokal als auch entfernt existiert?",
            "",
            "Nun ja, Git geht diesen Schritt weil du auf `foo` ja noch Commits haben könntest, die nicht auf dem Server sind, und da will es nichts durcheinander bringen. Ähnlich wie beim früheren Level zu `git fetch` -- es aktualisiert nicht deine lokalen Arbeits-Branches, es lädt die Commits nur in die `o` (bzw. `origin`) Branches, damit du sie dir in Ruhe anschauen und integrieren kannst.",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Wenn das so ist, was passiert dann wenn ich explizit Quelle und Ziel im Ort angebe?",
            "",
            "Wenn du Commits wirklich per `fetch` *direkt* auf einen lokalen Branch holen willst, dann, ja, kannst du das mit einer Ref-Spezifikation erreichen. Das funktioniert nicht mit deinem gerade ausgecheckten Branch, aber davon abgesehen lässt Git es zu.",
            "",
            "Nur ein Haken -- `<Quelle>` bezeichnet jetzt einen Ort auf dem *entfernten* Server und `<Ziel>` ist ein *lokaler* Ort, wo die Commits hin sollen. Es ist genau umgekehrt wie bei `git push` und das ist logisch, denn wir übertragen die Daten ja auch in die umgekehrte Richtung!",
            "",
            "Davon abgesehen benutzt man das in der Praxis kaum. Ich zeige das vor allem um zu verdeutlichen, wie `fetch` und `push` sehr ähnlich sind, nur in entgegengesetzten Richtungen."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns den Quatsch mal in Aktion an:"
          ],
          "afterMarkdowns": [
            "Wow! Siehst du, git löst `foo~1` als Ort auf dem Server `origin` auf und lädt dessen Commits herunter in `bar` hinein. Beachte wie `foo` und `o/foo` *nicht* aktualisiert wurden, da wir ein Ziel angegeben haben."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git branch bar; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Was ist denn wenn das Ziel nicht existiert, für das ich den Befehl ausführe? Schauen wir uns das letzte Beispiel noch mal an, nur dass `bar` jetzt noch nicht existiert."
          ],
          "afterMarkdowns": [
            "Siehst du, es ist *genau* wie `git push`. Git erstellt das Ziel lokal bevor es den `fetch` ausführt, genauso wie Git erst das Ziel auf dem Remote erstellt, befor es pusht (falls das Ziel nicht existiert)."
          ],
          "command": "git fetch origin foo~1:bar",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo 2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Keine Optionen?",
            "",
            "Wenn bei `git fetch` keine Optionen angegeben werden, lädt es einfach alle Commits vom Remote auf die lokalen Abbildungen aller Remote Branches ..."
          ],
          "afterMarkdowns": [
            "Ziemlich einfach, aber man sollte es mal gesehen haben."
          ],
          "command": "git fetch",
          "beforeCommand": "git branch foo; git clone; git fakeTeamwork foo; git fakeTeamwork master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, genug gelabert! Um den Level zu schaffen musst du nur die im Zielbild angegebenen Commits per `fetch` holen. Sei kreativ mit den Befehlen!",
            "",
            "Du wirst Quelle und Ziel bei beiden `fetch` Befehlen angeben müssen. Schau dir das Zielbild gut an, da die IDs vertauscht sein könnten!"
          ]
        }
      }
    ]
  },
  "fetch-rebase-name": "Abweichende History",
  "fetch-rebase-hint": "Beachte die Reihenfolge in der Zieldarstellung",
  "fetch-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Abweichende Inhalte",
            "",
            "Bisher haben wir gesehen wie man per `pull` Commits von Anderen ins lokale Repository holt und die eigenen Änderungen in ein entferntes `push`t. Ist doch ziemlich einfach, wie kann man da durcheinander kommen?",
            "",
            "Die Schwierigkeiten entstehen, wenn die Historys der beiden Repositorys *divergieren*, also voneinander abweichen. Bevor wir die Einzelheiten besprechen, schauen wir uns ein Beispiel an ...",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Stell dir vor du holst dir Montags ein Repository per `clone` und fängst an, an einem Feature zu arbeiten. Bis Freitag soll es fertig und veröffentlicht sein -- doch, oh je! Deine Kollegen haben eine Menge Code während der Woche geschrieben, der dein Feature hat veralten lassen (und überflüssig gemacht hat). Sie haben diesen Code außerdem zum entfernten Repository gepusht, und dadurch basiert *deine* harte Arbeit jetzt auf einer *alten* Version des Projektes, die nicht länger relevant ist.",
            "",
            "In diesem Fall ist ein `git push` problematisch. Wenn du es ausführst, soll Git das entfernte Repository in den Zustand von Montag zurückversetzen? Soll es versuchen deinen Code auf die aktuelle Version zu packen? Oder soll es deine Änderungen einfach ignorieren, weil sie total veraltet sind?",
            "",
            "Da es in dieser Situation so viele Mehrdeutigkeiten gibt (da die Historys divergent sind) erlaubt Git dir nicht, deine Änderungen einfach zu `push`en. Es zwingt dich, zuerst die neuesten Änderungen vom Server zu holen und in deine zu integrieren bevor du deine Arbeit mit anderen teilen kannst."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Bla bla bla. Schauen wir uns das lieber in Aktion an:"
          ],
          "afterMarkdowns": [
            "Siehst du? Nichts passiert, weil der Befehl fehlschlägt. `git push` schlägt fehl, weil der neueste Commit `C3` auf dem Commit `C1` des Remotes basiert. Der entfernte Server hat mittlerweile jedoch `C2` gepusht bekommen, also lässt Git deinen Push jetzt nicht mehr zu."
          ],
          "command": "git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Wie sollen wir das auflösen? Es ist ganz einfach, du musst deinen Commit nur von der aktuellsten Version des Remotes ableiten.",
            "",
            "Es gibt verschiedene Möglichkeiten wie man das erreichen kann, aber die offensichtlichste ist es, deine Commits per Rebase zu verschieben. Schauen wir mal wie das abläuft:"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Also wenn wir vor dem Push erst mal einen Rebase machen ..."
          ],
          "afterMarkdowns": [
            "Bämm! Wir haben unsere lokale Abbildung des entfernten Repositorys mit `git fetch` auf den neuesten Stand gebracht, unsere Arbeit auf die neueste Version des Remotes drauf gepackt und dann mit `git push` auf den Server geschoben."
          ],
          "command": "git fetch; git rebase o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Gibt es noch weitere Möglichkeiten deine Arbeit zu aktualisieren wenn das entfernte Repository neue Commits bekommen hat? Klar! Schauen wir uns dasselbe an, aber diesmal arbeiten wir mit `merge`.",
            "",
            "Obwohl `git merge` deine Arbeit nicht verschiebt (und stattdessen einen Merge Commit erzeugt) ist es eine Möglichkeit Git dazu zu bringen, alle Änderungen vom Remote in deine Sachen zu integrieren. Denn durch den Merge wird der Remote Branch zu einem *Vorgänger* deines Branches, was bedeutet dass dein Commit alle Commits des entfernten Branches beinhaltet.",
            "",
            "Zur Demonstration ..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Wenn wir nun also mergen anstatt einen Rebase zu machen ..."
          ],
          "afterMarkdowns": [
            "Ok. Wir haben die lokale Abbildung des entfernen Repositorys mit `git fetch` aktualisiert, die neuen Änderungen per *Merge* in deine integriert, und letztere dann mit `git push` auf den Server gebracht."
          ],
          "command": "git fetch; git merge o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Wahnsinn! Kann ich das auch irgendwie machen ohne soviel zu tippen?",
            "",
            "Na klar -- du kennst ja schon `git pull` als Zusammenfassung von `fetch` und `merge`. Praktischerweise bringt man es mit der Option `--rebase` dazu, anstatt des Merge einen Rebase zu machen.",
            "",
            "Gucken wir uns das mal an."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Zunächst `git pull --rebase` ..."
          ],
          "afterMarkdowns": [
            "Genau wie vorher! Nur viel kürzer."
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Und nun das normale `git pull` ..."
          ],
          "afterMarkdowns": [
            "Und wieder, genau wie zuvor!"
          ],
          "command": "git pull; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Dieser Ablauf von `fetch`, `rebase` / `merge` und `push` ist sehr verbreitet. In zukünftigen Leveln werden wir uns kompliziertere Varianten dieses Workflows ansehen, aber jetzt probieren wir erst mal diesen aus.",
            "",
            "Um diesen Level zu lösen, gehe folgende Schritte durch:",
            "",
            "* Clone dein Repository",
            "* Simuliere einen entfernten Commit mit `git fakeTeamwork`",
            "* Erzeuge einen lokalen Commit",
            "* Benutze *Rebase*, um deine Arbeit schließlich pushen zu können"
          ]
        }
      }
    ]
  },
  "merge-many-features-name": "Änderungen vom Remote zusammenführen",
  "merge-many-features-hint": "Beachte den Ziel-Baum!",
  "merge-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Warum nicht Merge?",
            "",
            "Um neue Dinge auf das Remote zu schieben musst du erst alle Änderungen vom Remote holen und bei dir integrieren. Das bedeutet du kannst den entfernten Branch (z.B. `o/master`) entweder Rebasen *oder* Mergen.",
            "",
            "Wenn du also beide Methoden benutzen kannst, warum haben sich die Level bisher auf Rebase konzentriert? Warum mag keiner `merge` wenn es um Remotes geht?",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Es gibt eine Menge Diskussionen unter Entwicklern über die Vor- und Nachteile beim Mergen und Rebasen. Hier ein paar Vor- und Nachteile zum Rebasen:",
            "",
            "Vorteile:",
            "",
            "* Rebasen macht den Commit-Baum sehr übersichtlich, weil alles linear aufeinander aufbaut",
            "",
            "Nachteile:",
            "",
            "* Rebasen verändert die History eines Branches.",
            "",
            "Zum Beispiel kann durch Rebasen Commit `C1` an Commit `C3` *vorbei* bewegt werden, bzw. eine Kopie von `C1`. Es sieht dann so aus als wären die Änderungen in `C1` nach denen in `C3` gemacht worden, obwohl das nicht stimmt.",
            "",
            "Manche Entwickler möchten lieber die History lassen wie sie ist und ziehen daher das Mergen vor. Andere (wie ich) haben lieber einen sauberen Commit-Baum und ziehen Rebase vor. Am Ende ist es eine Geschmacksfrage. :D"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "In diesem Level wollen wir versuchen die Aufgabe vom letzten Level erneut zu lösen, aber diesmal mit einem *Merge*. Das wird vielleicht etwas haariger, stellt aber gut die Implikationen dar."
          ]
        }
      }
    ]
  },
  "pull-name": "Git Pull",
  "pull-hint": "Führe einfach git pull aus.",
  "pull-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Pull",
            "",
            "Jetzt, wo wir wissen wie wir mit `git fetch` Daten von einem entfernten Repository holen können, wollen wir unsere lokalen Daten aktualisieren, damit sie die Änderungen vom Server beinhalten.",
            "",
            "Tatsächlich gibt es eine Menge Wege dies zu erreichen -- sobald du die neuen Commits lokal verfügbar hast, kannst du sie integrieren so als wären es Commits von ganz normalen anderen Branches. Du kannst also:",
            "",
            "* `git cherry-pick o/master`",
            "* `git rebase o/master`",
            "* `git merge o/master`",
            "* usw. usf. ausführen.",
            "",
            "Der Ablauf, die Änderungen vom Server zu holen und dann in die eigene Arbeit zu mergen wird so häufig benötigt, dass Git einen Befehl kennt der beides auf einmal erledigt! Das ist `git pull`."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns erst mal ein `fetch` gefolgt von `merge` an:"
          ],
          "afterMarkdowns": [
            "Bämm -- wir haben `C3` mit `fetch` heruntergeladen und dann in unseren Branch mit `git merge o/master` integriert. Nun bildet unser `master` dieselben Inhalte ab, wie sie auf dem entfernten Server (`origin`) liegen."
          ],
          "command": "git fetch; git merge o/master",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Was passiert wohl, wenn wir stattdessen `git pull` benutzen?"
          ],
          "afterMarkdowns": [
            "Dasselbe in Pink. Das sollte recht deutlich machen, dass `git pull` nur eine Abkürzung für `git fetch` gefolgt von einem Merge des gerade aktualisierten Branches ist."
          ],
          "command": "git pull",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Die Feinheiten von `git pull` werden wir uns später ansehen, für's Erste lass es uns in diesem Level ausprobieren.",
            "",
            "Vergiss nicht -- du kannst diesen Level auch mit `fetch` und `merge` lösen, aber das kostet dich einen Befehl extra. :P"
          ]
        }
      }
    ]
  },
  "pull-args-name": "Optionen für Pull",
  "pull-args-hint": "Du kannst neue lokale Branches mittels fetch / pull erstellen",
  "pull-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Optionen für Git Pull",
            "",
            "Da du jetzt so ziemlich *alles* kennst, was es an Optionen für `git fetch` und `git push` gibt, ist kaum noch etwas zu Optionen für `git pull` zu sagen. :)",
            "",
            "Das liegt daran, dass `git pull` letztendlich *wirklich* nur eine Abkürzuung für `fetch` gefolgt von einem `merge` von was auch immer gerade heruntergeladen wurde, ist. Denk es dir als ein `git fetch` mit denselben Optionen und einem anschließenden Merge.",
            "",
            "Das trifft sogar zu, wenn du völlig abgedrehte Optionen verwendest. Ein paar Beispiele:"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Hier sind einige gleichwertige Befehle in Git:",
            "",
            "`git pull origin foo` ist dasselbe wie:",
            "",
            "`git fetch origin foo; git merge o/foo`",
            "",
            "Und ...",
            "",
            "`git pull origin bar~1:bugFix` ist dasselbe wie:",
            "",
            "`git fetch origin bar~1:bugFix; git merge bugFix`",
            "",
            "Siehst du? `git pull` ist wirklich nur eine Abkürzung von `fetch` + `merge` und es interessiert sich nur dafür wo die Commits hin sollen (die \"Ziel\"-Option, die es beim `fetch` auswertet).",
            "",
            "Schauen wir uns eine Demonstration an:"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Wenn wir den Ort, auf den das `fetch` ausgeführt werden soll, angeben, passiert alles so wie beim `git fetch` aber es wird direkt danach auch ein Merge ausgeführt."
          ],
          "afterMarkdowns": [
            "Siehst du? Da wir `master` angegeben haben sind die Commits in `o/master` heruntergeladen worden. Danach wurde `o/master` gemerged, egal was gerade ausgecheckt war."
          ],
          "command": "git pull origin master",
          "beforeCommand": "git clone; go -b bar; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Funktioniert das auch wenn man Quelle und Ziel angibt? Aber sicher! Das sehen wir hier:"
          ],
          "afterMarkdowns": [
            "Wow, das ist eine Menge in einem einzelnen Befehl. Wir haben lokal einen neuen Branch namens `foo` erstellt, die Commits vom `master` des Servers dorthin heruntergeladen und ihn danach in unseren aktuell ausgecheckten Commit `bar` gemerged."
          ],
          "command": "git pull origin master:foo",
          "beforeCommand": "git clone; git fakeTeamwork; go -b bar; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, um's zu Ende zu bringen versuch das Ziel aus der Zielgrafik zu erreichen. Du wirst einige Commits herunterladen, einige neue Branches anlegen und diese in andere mergen müssen, aber das sollte nicht allzuviele Befehle benötigen. :P"
          ]
        }
      }
    ]
  },
  "push-name": "Git Push",
  "push-hint": "Denk dran, dass du einen Clone brauchst bevor du Pushen kannst!",
  "push-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Push",
            "",
            "Nun hab ich also Änderungen vom entfernten Server geholt und in meine lokale Arbeit integriert. Das ist schön und gut ... aber wie teile ich _meine_ Wahnsinns-Entwicklungen mit allen anderen?",
            "",
            "Naja, das Hochladen von Zeug ist das Gegenteil zum Herunterladen von Zeug. Und was ist das Gegenteil von `git pull`? Genau, `git push`!",
            "",
            "`git push` ist dafür verantwortlich _deine_ Änderungen zu einem bestimmten entfernten Server hochzuladen und dort zu integrieren. Sobald das `git push` durch ist, können alle deine Freunde diese Änderungen zu sich herunterladen.",
            "",
            "Du kannst dir `git push` als einen Befehl zum \"Veröffentlichen\" deiner Arbeit vorstellen. Es gibt da noch ein paar Feinheiten, aber lass uns mal mit kleinen Schritten anfangen."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Hier haben wir ein paar Änderungen, die auf dem Remote noch fehlen. Und hoch damit!"
          ],
          "afterMarkdowns": [
            "Na bitte -- das Remote hat den Commit `C2` bekommen, der `master` auf dem Remote ist entsprechend aktualisiert worden und unsere *eigene* Abbildung des `master` auf dem Remote namens `o/master` wurde auch aktualisiert. Alles im Lot!"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um diesen Level zu schaffen musst du einfach nur zwei neue Commits auf das Remote bringen. Aber stell dich schon mal darauf ein, dass die nächsten Level anspruchsvoller werden!"
          ]
        }
      }
    ]
  },
  "push-args-name": "Optionen für Git Push",
  "push-args-hint": "Du kannst dir die Zielsetzung des Levels immer wieder mit \"objective\" anzeigen lassen",
  "push-args-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Push-Optionen",
            "",
            "Großartig! Da du dich jetzt mit Remote Tracking Branches auskennst können wir anfangen, die Geheimnisse hinter `git push`, `fetch` und `pull` zu ergründen. Wir werden uns einen Befehl nach dem anderen vornehmen, aber die Funktionsweisen sind sich sehr ähnlich.",
            "",
            "Zunächst schauen wir uns `git push` an. Du hast im Level über Remote Tracking schon mitbekommen, dass Git den Remote Server *und* den Branch herausbekommt, indem es sich die Eigenschaften des aktuell ausgecheckten Branches ansieht (in denen das Remote steht, das der Branch \"trackt\"). Das ist das Verhalten bei keiner Angabe weiterer Optionen -- du kannst bei `git push` aber auch folgende setzen:",
            "",
            "`git push <Remote> <Ort>`",
            "",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Was \"Ort\" sein soll fragst du? Das klären wir später genau, schauen wir uns zunächst ein Beispiel an:",
            "",
            "`git push origin master`",
            "",
            "Das bedeutet im Klartext:",
            "",
            "\"Geh zum Branch namens `master` in meinem Repository, nimm all seine Commits, dann geh zum Branch `master` auf dem Remote namens `origin`. Leg da alles Commits ab die fehlen und sag mir wenn du fertig bist.\"",
            "",
            "Dadurch, dass wir `master` als \"Ort\" angegeben haben, weiß Git *woher* die Commits kommen und *wohin* sie sollen. Es ist im Grunde der Name der Orte, die zwischen zwei Repositorys synchronisiert werden soll.",
            "",
            "Dadurch, dass wir Git alles explizit gesagt haben, was es für die Operation wissen muss (durch Angabe von Remote und Ort) ist es vollkommen egal, was gerade ausgecheckt ist."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns noch ein Beispiel an. Beachte was in diesem Fall gerade ausgecheckt ist."
          ],
          "afterMarkdowns": [
            "Da haben wir's! `master` wurde auf dem Remote aktualisiert, weil wir beide Optionen angegeben haben."
          ],
          "command": "git checkout C0; git push origin master",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Was wäre passiert, wenn wir keine Optionen benutzt hätten?"
          ],
          "afterMarkdowns": [
            "Der Befehl schlägt fehlt, da `HEAD` nicht auf einem Branch steht, der ein Remote trackt."
          ],
          "command": "git checkout C0; git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok, in diesem Level lass und sowohl `foo` als auch `master` auf dem Remote aktualisieren. Um's spannender zu machen, ist `git checkout` in diesem Level deaktiviert."
          ]
        }
      }
    ]
  },
  "push-args2-name": "Optionen für Git Push -- noch mehr!",
  "push-args2-hint": "Vergiss nicht dass du aufgeben kannst, indem du \"show solution\" eingibst :P",
  "push-args2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Details zum `<Ort>`-Parameter",
            "",
            "Du erinnerst dich von dem vorherigen Level, dass, als wir `master` als \"Ort\" beim `git push` angegeben haben, daraus sowohl die *Quelle* als auch das *Ziel* für die Operation abgeleitet wurden.",
            "",
            "Daher fragst du dich vielleicht -- was wenn wir möchten, dass Quelle und Ziel anders sind? Was wenn du Commits von einem lokalen Branch `foo` in den Branch `bar` auf einem Server schieben möchtest?",
            "",
            "Tja, leider ist das in Git unmöglich .... ein Scherz! Natürlich ist das möglich. Git besitzt tonnenweise Flexibilität (eher zuviel, als zuwenig).",
            "",
            "Und gleich sehen wir, wie das geht ..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um sowohl Quelle als auch Ziel im `<Ort>`-Parameter anzugeben, gib sie einfach verbunden mit einem Doppelpunkt ein:",
            "",
            "`git push origin <Quelle>:<Ziel>`",
            "",
            "Das wird üblicherweise Refspec (Referenz-Spezifikation) genannt. Refspec ist nur ein anderer Name für einen Ort, mit dem Git etwas anfangen kann (wie mit Branch `foo` oder mit `HEAD~2`)",
            "",
            "Sobald du Quelle und Ziel separat angibt, kannst du flexibel und präzise entfernte Branches ansteuern. Hier eine Demo:"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Vergiss nicht, `Quelle` ist jeder mögliche Ort, mit dem Git etwas anfangen kann:"
          ],
          "afterMarkdowns": [
            "Boah! Das ist ein ziemlich abgefahrener Befehl gewesen, aber er ist sinnvoll -- Git hat `foo^` zu einem Commit aufgelöst, alle Commits die bis zu diesem einschließich noch nicht auf dem Server waren hochgeladen und dann dort das Ziel aktualisiert."
          ],
          "command": "git push origin foo^:master",
          "beforeCommand": "git clone; go -b foo; git commit; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Was wäre wenn das Ziel des `push` gar nicht existiert? Kein Problem! Wenn das Ziel ein Branch-Name ist, wird Git den Branch auf dem Server einfach anlegen."
          ],
          "afterMarkdowns": [
            "Schick, das ist ziemlich praktisch. :D"
          ],
          "command": "git push origin master:newBranch",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um dieses Level zu schaffen versuch den dargestellten Zielzustand zu erreichen und vergiss nicht das Format:",
            "",
            "`<Quelle>:<Ziel>`"
          ]
        }
      }
    ]
  },
  "push-many-features-name": "Push Master!",
  "push-many-features-hint": "Denk dran, du kannst immer undo oder reset benutzen, um deine Befehle zurück zu nehmen.",
  "push-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Einen Feature Branch reintegrieren",
            "",
            "Nun da du mit `fetch`, `pull`, und `push` vertraut bist sollten wir diese Fähigkeiten mit einem neuen Arbeitsablauf auf die Probe stellen.",
            "",
            "Für Entwickler in großen Projekten ist es nicht ungewöhnlich ihre Arbeit in Feature Branches (von `master` abgeleitet) zu erledigen und dann diese Inhalte zu reintegrieren, wenn sie fertig sind. Das ist ähnlich dem vorherigen Level (in dem ein Feature Branch auf den Server geschoben wird), nur mit einem zusätzlichen Schritt.",
            "",
            "Einige Entwickler pushen und pullen nur auf dem `master` -- dadurch ist `master` immer aktuell zu seinem Gegenstück auf dem Server (`o/master`).",
            "",
            "Für diesen Ablauf werden wir also zwei Dinge kombinieren:",
            "",
            "* einen Feature Branch in `master` reintegrieren und",
            "* vom entfernten Server pushen und pullen."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns zur Erinnerung schnell noch mal an wie man den `master` aktualisiert und seine Commits pusht."
          ],
          "afterMarkdowns": [
            "Wir haben hier zwei Befehle ausgeführt, die:",
            "",
            "* unsere Commits auf die neuen Commits vom Server gepackt und",
            "* unsere Commits zum Server gepusht haben."
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Dieser Level ist ziemlich heftig -- hier ist im Groben der Weg:",
            "",
            "* Es gibt drei Feature Branches -- `side1`, `side2` und `side3`.",
            "* Wir möchten jedes dieser Features, in dieser Reihenfolge, auf den Server bringen.",
            "* Der Server hat Commits, die wir noch nicht haben, diese müssen also bei uns integriert werden.",
            "",
            ":O Krass! Viel Erfolg, diesen Level zu schaffen ist ein großer Schritt."
          ]
        }
      }
    ]
  },
  "remote-branches-name": "Branches auf entfernten Servern",
  "remote-branches-hint": "Beachte die Sortierung -- committe zuerst auf dem master!",
  "remote-branches-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Branches auf entfernten Servern",
            "",
            "Nun da du `git clone` in Aktion gesehen hast, lass uns tiefer in die Materie eintauchen.",
            "",
            "Das erste, was dir wahrscheinlich aufgefallen ist, ist dass ein neuer Branch in unserem lokalen Repository aufgetaucht ist, namens `o/master`. Diese Art von Branch nennt sich _Remote_ Branch; er hat besondere Eigenschaften, weil er einem bestimmten Zweck dient.",
            "",
            "Ein Remote Branch bildet den Zustand des entsprechenden Branch in einem entfernten Repository ab (dem Zustand in dem der Branch war, als du das letzte mal das entfernte Repository angesprochen hast). Er hilft dir, den Unterschied zwischen deinem lokalen Branch und dem Gegenstück auf dem Server zu sehen -- eine nötige Information, bevor du deine Arbeit mit anderen teilen kannst.",
            "",
            "Remote Branches besitzen die besondere Eigenschaft dein Repository in den \"Detached `HEAD`\" Zustand zu versetzen, wenn du sie auscheckst. Git macht das absichtlich so, denn du kannst nicht direkt auf Remote Branches arbeiten; du musst auf Kopien von ihnen arbeiten und deine Änderungen von dort auf den entfernten Server schieben (wonach der Remote Branch dann auch bei dir aktualisiert wird)."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Was heißt `o/`?",
            "",
            "Du fragst dich vielleicht was das `o/` am Anfang des Namens des Remote Branch bedeuten soll. Nun, Namen von Remote Branches folgen einer (zwingenden) Konvention -- sie werden mit diesem Format gebildet:",
            "",
            "* `<Name des Remote>/<Name des Branches>`",
            "",
            "Wenn du also einen Remote Branch namens `o/master` hast, ist es eine Abbildung des Branches `master` auf dem Server, der in deinem Repository als `o` bekannt ist.",
            "",
            "Die meisten Entwickler nennen das Haupt-Remote tatsächlich `origin` und nicht `o`. Das ist so verbreitet, dass Git den entfernten Server von dem man ein `git clone` macht tatsächlich als `origin` im Clone speichert.",
            "",
            "Leider passt der ganze Name, `origin`, nicht in unsere Darstellung, deshalb benutzen wir hier kurz `o`. :( Merk dir einfach: wenn du echtes Git benutzt werden die Remotes meistens `origin` heißen!",
            "",
            "So, das war eine Menge zu verdauen, schauen wir uns das in Aktion an."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Checken wir mal einen Remote Branch aus und schauen was passiert"
          ],
          "afterMarkdowns": [
            "Wie du siehst setzt uns Git in den \"Detached `HEAD`\" Modus und aktualisiert dann nach dem Commit nicht den Branch `o/master`. Das liegt daran, dass der Remote Branch nur aktualisiert wird, wenn sich der entsprechende Branch auf dem Remote verändert."
          ],
          "command": "git checkout o/master; git commit",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Um diesen Level zu bewältigen musst du einen Commit in `master` machen und einen nachdem du `o/master` ausgecheckt hast. Das illustriert noch einmal wie sich Branches und Remote Branches unterschiedlich verhalten und dass letztere sich nur verändern, wenn sich ihr Zustand auf dem entfernten Server ändert."
          ]
        }
      }
    ]
  },
  "source-nothing-name": "Die Quelle des Nichts",
  "source-nothing-hint": "Der branch Befehl ist für diesen Level inaktiv, du musst also fetch benutzen",
  "source-nothing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Die Eigentümlichkeiten von `<Quelle>`",
            "",
            "Git \"missbraucht\" den `<Quelle>`-Parameter in zwei Fällen. Diese rühren daher, dass man technisch gesehen \"nichts\" als gültige `<Quelle>` sowohl für `git push` als auch für `git fetch` angeben kann. Das macht man so:",
            "",
            "* `git push origin :side`",
            "* `git fetch origin :bugFix`",
            "",
            "Schauen wir, was das bewirkt ..."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Was passiert, wenn man \"nichts\" auf einen entfernten Branch pusht? Er wird gelöscht!"
          ],
          "afterMarkdowns": [
            "Und schon haben wir `foo` erfolgreich auf dem Remote gelöscht, weil wir \"Leere\" darauf geschoben haben. Ist auf seine Weise irgendwie logisch ..."
          ],
          "command": "git push origin :foo",
          "beforeCommand": "git clone; git push origin master:foo"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Und weiter: indem man \"nichts\" von einem Remote in sein lokales Repository zieht, erstellt man tatsächlich einen neuen Branch."
          ],
          "afterMarkdowns": [
            "Ziemlich abgefahren / bizarr, aber was soll's. Das ist halt Git."
          ],
          "command": "git fetch origin :bar",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Das ist ein kurzer Level -- lösch einfach den Remote Branch und erstelle einen neuen Branch mit `git fetch`, um ihn zu lösen."
          ]
        }
      }
    ]
  },
  "tracking-name": "Remote Tracking",
  "tracking-hint": "Nicht vergessen, es gibt zwei Arten Remote Tracking einzurichten!",
  "tracking-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Remote Tracking Branches",
            "",
            "In den letzten paar Leveln wirkte es womöglich etwas \"magisch\", dass Git automatisch wusste, dass der Branch `master` irgendwie mit `o/master` verwandt ist. Klar, sie haben ähnliche Namen und daher mag es logisch erscheinen sie in Verbindung zu bringen, aber offensichtlich wird es in zwei Szenarien:",
            "",
            "* Beim `pull` werden Commits in `o/master` heruntergeladen und dann per *Merge* in den Branch `master` gebracht. Aus der Verbindung zwischen den beiden Branches leitet sich das Ziel des Merges ab.",
            "* Beim `push` werden Commits vom `master` auf den `master` auf dem Remote Server geschoben (und die Änderung _danach_ in `o/master` abgebildet). Das *Ziel* des Push wird aus der Verbindung zwischen `master` und `o/master` abgeleitet.",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Langer Rede kurzer Sinn, die Verbindung zwischen `master` und `o/master` ist einfach die Eigenschaft des \"Remote Tracking\" dieser Branches. `master` ist so eingestellt, dass er `o/master` trackt -- das heißt es gibt ein implizites Ziel für `pull` und `push` Operationen auf dem `master` Branch.",
            "",
            "Du fragst dich vielleicht wieso diese Eigenschaft auf dem `master` definiert ist, wenn du das doch gar nicht explizit gemacht hast. Naja, beim Clonen eines Repository macht Git das für den `master` automatisch.",
            "",
            "Während des Clonens erstellt Git einen Remote Branch für jeden Branch, den es auf dem Remote Server findet (also Branches wie `o/master`); dann erstellt es für den Branch, auf den auf dem entfernten Server `HEAD` zeigt (meistens `master`) automatisch einen lokalen Branch und stellt ihn so ein, dass er sein Gegenstück auf dem Server trackt. Deswegen hast du beim clonen vielleicht schon mal dies gesehen:",
            "",
            "    local branch \"master\" set to track remote branch \"o/master\""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Kann ich das auch selbst machen?",
            "",
            "Na klar! Du kannst jeden beliebigen Branch so einstellen, dass er `o/master` trackt, und wenn du das tust wird der Branch dieselben impliziten Zielangaben für `push` und `pull` haben wie `master`. Du kannst also `git push` auf dem Branch `absolut_nicht_master` ausführen und deine Commits auf `master` auf dem entfernten Server schieben lassen.",
            "",
            "Es gibt zwei Möglichkeiten diese Eigenschaft zu definieren. Die erste ist, einen neuen lokalen Branch von einem Remote Branch auszuchecken. Wenn man",
            "",
            "    git checkout -b absolut_nicht_master o/master",
            "",
            "eingibt, wir ein neuer lokaler Branch namens `absolut_nicht_master` angelegt, der `o/master` trackt."
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Genug gequatscht, schauen wir uns eine Demonstration an! Wir checken einen neuen Branch `foo` aus, so dass er `master` auf dem Server trackt."
          ],
          "afterMarkdowns": [
            "Wie du siehst benutzen wir der implizite Ziel beim `pull` um `foo` zu aktualisieren. Beachte, dass `master` nicht aktualisiert wird."
          ],
          "command": "git checkout -b foo o/master; git pull",
          "beforeCommand": "git clone; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Das gilt auch für `git push`."
          ],
          "afterMarkdowns": [
            "Bämm. Wir haben unsere Commits auf den `master` auf dem Server geschoben, obwohl unser lokaler Branch völlig anders heißt."
          ],
          "command": "git checkout -b foo o/master; git commit; git push",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Methode 2",
            "",
            "Noch eine Möglichkeit um Remote Tracking auf einem Branch einzustellen, ist einfach `git branch -u` zu benutzen. Wenn man",
            "",
            "    git branch -u o/master foo",
            "",
            "eingibt, wir damit der lokale Branch `foo` so eingestellt, dass er `o/master` trackt. Den Namen des lokalen Branch kannst du auch weglassen, falls du ihn eh aktuell ausgecheckt hast:",
            "",
            "    git branch -u o/master",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "Schauen wir uns auch diese Methode noch an ..."
          ],
          "afterMarkdowns": [
            "Genau wie vorher, nur ein bisschen ausführlicherer Befehl. Schick!"
          ],
          "command": "git branch -u o/master foo; git commit; git push",
          "beforeCommand": "git clone; git checkout -b foo"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Ok. In diesem Level muss du Commits auf den `master` auf dem Server schieben, *ohne* den lokalen `master` ausgecheckt zu haben. Den Rest kannst du selbst herausfinden, schließlich ist das hier für Fortgeschrittene. :P"
          ]
        }
      }
    ]
  },
  "sequence-intro-display": "Einführung",
  "sequence-intro-about": "Eine gut abgestimmte Einführung in die wichtigsten Git-Befehle",
  "sequence-rampup-display": "Aufstieg",
  "sequence-rampup-about": "Eine Portion Git-Wahnsinn zum Thema Navigation",
  "sequence-remote-display": "Push & Pull -- entfernte Repositorys",
  "sequence-remote-about": "Zeit Eure 1en und 0en zu teilen; Coding mit sozialer Komponente",
  "sequence-remote-advanced-display": "Bis zum origin und noch weiter",
  "sequence-remote-advanced-about": "Git Remotes für Fortgeschrittene",
  "sequence-move-display": "Code Umherschieben",
  "sequence-move-about": "Gewöhn dich daran, den Git-Baum zu verändern",
  "sequence-mixed-display": "Ein Kessel Buntes",
  "sequence-mixed-about": "Eine bunte Mischung von Techniken, Tipps und Tricks",
  "sequence-advanced-display": "Themen für Fortgeschrittene",
  "sequence-advanced-about": "... die nie ein Mensch zuvor gesehen hat.",
  "dialogs-confirm": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Bist du sicher, dass du die Auflösung sehen willst?",
          "",
          "Ich glaube an dich! Du schaffst das!"
        ]
      }
    }
  ],
  "dialogs-level-builder": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Willkommen zum Level-Editor!",
          "",
          "So funktioniert's:",
          "",
          "  * Stelle mit Git-Befehlen die Ausganssituation her",
          "  * Leg den Startpunkt mit ```define start``` fest",
          "  * Gib eine Abfolge von Git-Befehlen ein, welche die (optimale) Lösung darstellen",
          "  * Leg den Ziel-Baum mit ```define goal``` fest. Damit markierst du den Endpunkt der Lösung",
          "  * Gib einen Hinweis mittels ```define hint``` an, wenn du willst",
          "  * Änder den Namen mittels ```define name```",
          "  * Wenn du magst, erstelle einen schönene Einführungsdialog mit ```edit dialog```",
          "  * Gib das Kommando ```finish``` ein um deinen Level als JSON auszugeben"
        ]
      }
    }
  ],
  "dialogs-next-level": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Super gemacht",
          "",
          "Du hast den Level in *{numCommands}* Befehl(en) gelöst;",
          "meine Lösung besteht aus {best}."
        ]
      }
    }
  ],
  "dialogs-sandbox": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Willkommen bei Learn Git Branching!",
          "",
          "Der Sinn dieser Anwendung ist, die umfangreichen und komplexen Zusammenhänge der Prozesse, die bei der Arbeit mit Git ablaufen, zu verdeutlichen. Ich hoffe du hast Spaß dabei und lernst vielleicht sogar etwas!",
          "",
          "# Demo!",
          "",
          "Falls du die Demonstration noch nicht gesehen hast, schau sie dir hier an:",
          "",
          "[https://pcottle.github.io/learnGitBranching/?demo](https://pcottle.github.io/learnGitBranching/?demo)",
          "",
          "Genervt von diesem Fenster? Häng `?NODEMO` an die URL um es los zu werden, so wie hier:",
          "",
          "[https://pcottle.github.io/learnGitBranching/?NODEMO](?NODEMO)"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Git-Kommandos",
          "",
          "Dir steht eine große Zahl von Git-Befehlen im Sandkasten-Modus zur Verfügung. Unter anderem",
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
          "## Teilen macht Spaß!",
          "",
          "Teile diese Git-Bäume mit deinen Freunden mittels `export tree` und `import tree`.",
          "",
          "Hast du Wissenswertes zu Git zu vermitteln? Versuch einen Level mit `build level` zu bauen oder probier den Level eines Freundes mit `import level` aus.",
          "",
          "Um alle Kommandos zu sehen, gib `show commands` ein. Darunter gibt's kleine Schätze wie `undo` und `reset`.",
          "",
          "Für's Erste lass uns mit `levels` anfangen ..."
        ]
      }
    }
  ],
  "finish-dialog-finished": "Wow! Du hast den letzten Level gelöst, super!",
  "finish-dialog-next": "Möchtest du mit *\"{nextLevel}\"* weitermachen, dem nächsten Level?",
  "finish-dialog-win": "Wahnsinn! Du warst so gut wie unsere Lösung, oder sogar besser.",
  "finish-dialog-lose": "Schau mal ob du es in {best} Schritten hinbekommst :D",
  "hg-prune-tree": "Achtung! Mercurial macht aggressive Garbage Collection und muss daher deinen Baum reduzieren",
  "hg-a-option": "Die Option -A wird in dieser Anwendung nicht benötigt, committe einfach!",
  "hg-error-no-status": "Es gibt keinen Befehl status in dieser Anwendung, da es kein Staging von Dateien gibt. Probier stattdessen hg summary",
  "hg-error-need-option": "Ich benötige die Option {option} für diesen Befehl!",
  "hg-error-log-no-follow": "hg log ohne -f wird aktuell nicht unterstützt, benutze bitte -f",
  "git-status-detached": "Detached head!",
  "git-status-onbranch": "Auf Branch {branch}",
  "git-status-readytocommit": "Fertig zum committen! (Wie immer in dieser Demo)",
  "git-dummy-msg": "Schneller Commit. Eff-Zeh!",
  "git-error-origin-fetch-uptodate": "Bereits aktuell!",
  "git-error-origin-fetch-no-ff": "Dein origin Branch ist nicht auf dem Stand des Remote Branch und fetch kann nicht ausgeführt werden",
  "git-error-origin-push-no-ff": "Das entfernte Repository weicht von deinem lokalen Repository ab, daher können deine Änderungen nicht mit einem einfachen fast forward hochgeladen werden (und daher ist dein push abgelehnt worden). Bitte pull erst die neuen Änderungen in das lokale Repository, integriere sie in den Branch und versuch es nochmal. Das kannst du mit git pull oder git pull --rebase machen",
  "git-error-remote-branch": "Du kannst diesen Befehl nicht auf einem Remote Branch ausführen",
  "git-error-origin-required": "Für diesen Befehl wird origin benötigt",
  "git-error-origin-exists": "origin existiert bereits! Du kannst es nicht nochmal anlegen",
  "git-error-branch": "Du kannst nicht den Branch master, den Branch auf dem du gerade arbeitest oder Refs, die keine Branches sind, löschen",
  "git-merge-msg": "Mergen von {target} in {current}",
  "git-error-rebase-none": "Keine Commits für Rebase gefunden! Alle Commits sind Merge Commits oder beinhalten nur schon vorhandene Änderungen",
  "git-result-nothing": "Nichts zu tun ...",
  "git-result-fastforward": "Fast forward...",
  "git-result-uptodate": "Branch ist bereits aktuell",
  "git-error-exist": "Die Ref {ref} existiert nicht oder ist unbekannt",
  "git-error-relative-ref": "Commit {commit} hat kein {match}",
  "git-warning-detached": "Achtung! Detached HEAD Zustand",
  "git-warning-add": "In dieser Demo müssen keine Dateien hinzugefügt werden",
  "git-error-options": "Die angegebenen Optionen sind inkompatibel oder falsch",
  "git-error-already-exists": "Der Commit {commit} existiert bereit, Abbruch!",
  "git-error-reset-detached": "Kann im Detached Head Zustand kein reset ausführen! Bitte checkout zum Bewegen benutzen",
  "git-warning-hard": "Das Standardverhalten in dieser Demo ist --hard, du kannst die Option auch weglassen!",
  "git-error-staging": "In dieser Demo gibt es kein Hinzufügen / Vormerken von Dateien, dieser Befehl ist daher ungültig!",
  "git-revert-msg": "Reverte {oldCommit}: {oldMsg}",
  "git-error-args-many": "Ich benötige maximal {upper} Argument(e) für {what}",
  "git-error-args-few": "Ich benötige mindestens {lower} Argument(e) für {what}",
  "git-error-no-general-args": "Dieser Befehl akzeptiert keine allgemeinen Argumente",
  "copy-tree-string": "Kopiere die folgende Baum-Zeichenkette",
  "learn-git-branching": "Learn Git Branching",
  "select-a-level": "Level auswählen",
  "main-levels-tab": "Haupt",
  "remote-levels-tab": "Remote",
  "branch-name-short": "Tut mir leid, aber aus Gründen der Darstellung müssen wir die Branch-Namen kurz halten. Dein Branch-Name wurde auf 9 Zeichen gekürzt und heißt daher jetzt \"{branch}\"",
  "bad-branch-name": "Der Branch-Name \"{branch}\" ist nicht erlaubt!",
  "bad-tag-name": "Der Tag-Name \"{tag}\" ist nicht erlaubt!",
  "option-not-supported": "Die Option \"{option}\" wird nicht unterstützt!",
  "git-usage-command": "git <Befehl> [<Argumente>]",
  "git-supported-commands": "Unterstützte Befehle:",
  "git-usage": "Benutzung:",
  "git-version": "Git Version PCOTTLE.1.0.jbr",
  "refresh-tree-command": "Aktualisiere Baum ...",
  "locale-command": "Locale auf {locale} gesetzt",
  "locale-reset-command": "Locale auf Standard zurückgesetzt, also {locale}",
  "show-command": "Bitte benutze einen der folgenden Befehle um mehr Informationen zu bekommen:",
  "show-all-commands": "Hier ist eine Liste aller verfügbarer Befehle:",
  "cd-command": "Verzeichnis gewechselt zu \"/verzeichnisse/sind/in/dieser/demo/latte\"",
  "ls-command": "VergissDateienInDieserDemo.txt",
  "mobile-alert": "LGB ist nicht mit mobilen Endgeräten kompatibel, nutz es vom Desktop! Es lohnt sich :D",
  "share-tree": "Teile diesen git-Baum mit Freunden! Sie können ihn mit \"import tree\" laden",
  "paste-json": "Füg einen JSON-Blob unten ein!",
  "solved-map-reset": "Gelöste Karte wurde zurückgesetzt, du fängst mit einem leeren Blatt an!",
  "level-cant-exit": "Du bist nicht in einem Level! Du bist im Sandkasten-Modus, starte einen Level mit \"levels\"",
  "level-no-id": "Konnte keinen Level mit der ID \"{id}\" finden! Öffne einen Level-Auswahldialog",
  "undo-stack-empty": "Die Undo-Liste ist leer!",
  "already-solved": "Du hast diesen Level bereits gelöst, probier einen anderen Level mit \"levels\" aus oder geh in den Sandkasten-Modus mit \"sandbox\"",
  "solved-level": "Gelöst!\n:D",
  "command-disabled": "Dieser git-Befehl ist für diesen Level deaktiviert!",
  "share-json": "Hier ist das JSON für diesen Level! Teil es mit jemandem or schick es mir über Github",
  "want-start-dialog": "Du hast noch keinen Einführungs-Dialog geschrieben, willst du einen hinzufügen?",
  "want-hint": "Du hast noch keinen Hinweis geschrieben, magst du einen hinzufügen?",
  "prompt-hint": "Gib den Hinweis für diesen Level an, oder lass es leer wenn du keinen hinzufügen willst",
  "prompt-name": "Gib den Namen für diesen Level an",
  "solution-empty": "Deine Auflösung ist leer! Hier fehlt etwas",
  "define-start-warning": "Lege Start fest ... Auflösung und Ziel werden gelößcht, falls sie schon festgelegt worden waren",
  "help-vague-level": "Du befindest dich in einem Level, daher gibt es verschiedene Hilfen. Gib \"help level\" ein um mehr úber diesen Level zu erfahren, \"help general\" um zu sehen wie Learn Git Branching bedient wird, oder \"objective\" um das Ziel dieses Levels zu erfahren.",
  "help-vague-builder": "Du befindest dich im Level-Editor, daher gibt es verschiedene Hilfen. Gib bitte \"help general\" oder \"help builder\" ein",
  "show-goal-button": "Schauen Ziel",
  "hide-goal-button": "Verstecken Ziel",
  "objective-button": "Ziel",
  "git-demonstration-title": "Git Demonstration",
  "goal-to-reach": "Ziel",
  "goal-only-master": "<span class=\"fwber\">Hinweis:</span> In diesem Level wird nur der Branch master geprüft. Die anderen Branches dienen nur als Vergleichsbasis (als gestrichelte Bezeichner dargestellt). Wie immer kannst du diese Meldung mit \"hide goal\" ausblenden",
  "hide-goal": "Du kannst diese Meldung mit \"hide goal\" ausblenden",
  "hide-start": "Du kannst diese Meldung mit \"hide start\" ausblenden",
  "level-builder": "Level-Editor",
  "no-start-dialog": "Es gibt keinen Einführungs-Dialog für diesen Level!",
  "no-hint": "Hm, es gibt anscheinend keinen Hinweis für diesen Level :-/",
  "error-untranslated-key": "Die Übersetzung für {key} existiert noch nicht :( Falls du eine hast, bitte teil sie mit auf Github mit!",
  "error-untranslated": "Dieser Dialog oder Text ist noch nicht in deine Sprache übersetzt. :( Schau auf Github vorbei um bei der Übersetzung zu helfen!"
};
