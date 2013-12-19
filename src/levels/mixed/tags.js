exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C3\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\",\"C4\"],\"id\":\"C5\"}},\"tags\":{\"v1\":{\"target\":\"C2\",\"id\":\"v1\",\"type\":\"tag\"},\"v0\":{\"target\":\"C1\",\"id\":\"v0\",\"type\":\"tag\"}},\"HEAD\":{\"target\":\"C2\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git tag v1 side~1;git tag v0 master~2;git checkout v1",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C5\",\"id\":\"master\",\"remoteTrackingBranchID\":null},\"side\":{\"target\":\"C3\",\"id\":\"side\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C2\",\"C4\"],\"id\":\"C5\"}},\"tags\":{},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Git Tags",
    "de_DE": "Git Tags"
  },
  "hint": {
    "en_US": "you can either check out the commit directly or simply checkout the tag!",
    "de_DE": "Du kannst den Checkout entweder direkt auf den Commit oder das Tag machen."
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Tags",
              "",
              "As you have learned from previous lessons, branches are easy to move around and often refer to different commits as work is completed on them. Branches are easily mutated, often temporary, and always changing.",
              "",
              "If that's the case, you may be wondering if there's a way to *permanently* mark historical points in your project's history. For things like major releases and big merges, is there any way to mark these commits with something more permanent than a branch?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "You bet there is! Git tags support this exact use case -- they (somewhat) permanently mark certain commits as \"milestones\" that you can then reference like a branch.",
              "",
              "More importantly though, they never move as more commits are created. You can't \"check out\" a tag and then complete work on that tag -- tags exist as anchors in the commit tree that designate certain spots.",
              "",
              "Let's see what tags look like in practice."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Let's try making a tag at `C1` which is our version 1 prototype"
            ],
            "afterMarkdowns": [
              "There! Quite easy. We named the tag `v1` and referenced the commit `C1` explicitly. If you leave the commit off, git will just use whatever `HEAD` is at"
            ],
            "command": "git tag v1 C1",
            "beforeCommand": "git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "For this level just create the tags in the goal visualization and then check `v1` out. Notice how you go into detached `HEAD` state -- this is because you can't commit directly onto the `v1` tag.",
              "",
              "In the next level we'll examine a more interesting use case for tags."
            ]
          }
        }
      ]
    },
    "de_DE": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Git Tags",
              "",
              "Wie du aus den vorhergehenden Levels weißt sind Branches einfach durch die Gegend zu schieben und zeigen of auf verschiedene Commits, während die Arbeit in ihnen fortschreitet. Ein Branch wird oft verändert, manchmal nur temporär, und ist ständig in Bewegung.",
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
              "Peng! Ziemlich einfach. Wir haben das Tag `v1` genannt und lassen es auf `C1` zeigen. Wenn du den Commit weglässt wir das Tag für den Commit erzeugt, auf den `HEAD` zeigt."
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
    }
  }
};
