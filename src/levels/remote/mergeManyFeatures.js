exports.level = {
  "goalTreeString": "{\"branches\":{\"master\":{\"target\":\"C11\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C11\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]},\"side1\":{\"target\":\"C2\",\"id\":\"side1\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side2\":{\"target\":\"C4\",\"id\":\"side2\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side3\":{\"target\":\"C7\",\"id\":\"side3\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"},\"C9\":{\"parents\":[\"C2\",\"C8\"],\"id\":\"C9\"},\"C10\":{\"parents\":[\"C4\",\"C9\"],\"id\":\"C10\"},\"C11\":{\"parents\":[\"C10\",\"C7\"],\"id\":\"C11\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C11\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C9\":{\"parents\":[\"C2\",\"C8\"],\"id\":\"C9\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"},\"C10\":{\"parents\":[\"C4\",\"C9\"],\"id\":\"C10\"},\"C11\":{\"parents\":[\"C10\",\"C7\"],\"id\":\"C11\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git checkout master;git pull;git merge side1;git merge side2;git merge side3;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":\"o/master\",\"localBranchesThatTrackThis\":null},\"o/master\":{\"target\":\"C1\",\"id\":\"o/master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"master\"]},\"side1\":{\"target\":\"C2\",\"id\":\"side1\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side2\":{\"target\":\"C4\",\"id\":\"side2\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side3\":{\"target\":\"C7\",\"id\":\"side3\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"side3\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"master\":{\"target\":\"C8\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Merging with remotes",
    "zh_CN": "和远端合并",
    "zh_TW": "merge with remotes",
    "es_AR": "Mergeando con los remotos",
    "pt_BR": "Merge com remotos",
    "de_DE": "Änderungen vom Remote zusammenführen",
    "ja"   : "リモートとのmerge",
    "fr_FR": "Fusionner avec les branches distantes"
  },
  "hint": {
    "en_US": "Pay attention to the goal tree!",
    "zh_CN": "注意目标树!",
    "zh_TW": "注意最後要完成的目標！",
    "es_AR": "¡Prestá atención al árbol final!",
    "pt_BR": "Preste atenção na árvore do objetivo!",
    "de_DE": "Beachte den Ziel-Baum!",
    "ja"   : "ゴールツリーに注意！",
    "fr_FR": "Respectez l'arbre représentant l'objectif !"
  },
  "compareOnlyMaster": true,
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Why not merge?",
              "",
              "In order to push new updates to the remote, all you need to do is *incorporate* the latest changes from the remote. That means you can either rebase *or* merge in the remote branch (e.g. `o/master`).",
              "",
              "So if you can do either method, why have the lessons focused on rebasing so far? Why is there no love for `merge` when working with remotes?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "There's a lot of debate about the tradeoffs between merging and rebasing in the development community. Here are the general pros / cons of rebasing:",
              "",
              "Pros:",
              "",
              "* Rebasing makes your commit tree look very clean since everything is in a straight line",
              "",
              "Cons:",
              "",
              "* Rebasing modifies the (apparent) history of the commit tree.",
              "",
              "For example, commit `C1` can be rebased *past* `C3`. It then appears that the work for `C1'` came after `C3` when in reality it was completed beforehand.",
              "",
              "Some developers love to preserve history and thus prefer merging. Others (like myself) prefer having a clean commit tree and prefer rebasing. It all comes down to preferences :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "For this level, let's try to solve the previous level but with *merging* instead. It may get a bit hairy but it illustrates the point well."
            ]
          }
        }
      ]
    },
    "fr_FR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Pourquoi pas merge ?",
              "",
              "Dans le but d'envoyer de nouvelles modifications sur le dépôt distant, la seule étape préliminaire est *d'incorporer* les derniers changements de ce dépôt dans le nôtre. Cela signifie qu'après, vous pouvez faire un rebase *ou* merge de la branche distante (e.g. `o/master`).",
              "",
              "Donc si l'on peut faire les deux méthodes, pourquoi les leçons se sont (re)basées (!) sur rebase jusqu'à présent ? Pourquoi n'aime-t-on pas `merge` dans les branches distantes ?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Il y a beaucoup de débats à propos du compromis entre l'utilisation de merge et rebase dans la communauté des développeurs. Voici les principaux arguments pour / contre rebase:",
              "",
              "Pour :",
              "",
              "* Rebase rend votre arbre de commits très propre puisqu'il ressemble à une ligne droite.",
              "",
              "Contre :",
              "",
              "* Rebase modifie l'historique (apparent) de l'arbre des commits.",
              "",
              "Par exemple, le commit `C1` peut être rebasé *après* `C3`. Cela fait croire que le travail de `C1'` est arrivé après `C3` alors qu'en réalité il était complétement avant.",
              "",
              "Certains développeurs aiment préserver l'historique et préfèrent donc merge. Les autres (comme moi) préfèrent avoir un arbre des commits propre et préfèrent rebase. C'est une question de goût :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Pour ce niveau, essayons de résoudre le niveau précédent, mais avec *merge* plutôt. Cela peut être un peu périlleux mais cela illustre bien le problème."
            ]
          }
        }
      ]
    },
    "es_AR": {
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
    "pt_BR": {
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
    "zh_TW": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 為何不要 merge？",
              "",
              "為了要 push 新的 commit 給 remote，你只需要做的是先同步 remote 的更新，那就表示你可以使用 rebase *或者*是 merge remote branch （例如，`o/master`）。",
              "",
              "所以假如你已經學會使用其中一個方式了，那為什麼我們到目前為止還在強調 `rebase`？為什麼當提到 remote 的時候，反而 `merge` 比較沒有受到關注？",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "在程式發展的社群中，關於 `merge` 以及 `rebase` 的孰優孰劣有很多的爭論。這裡我們會提到關於 `rebase` 的優點及缺點：",
              "",
              "優點：",
              "",
              "* `rebase` 使得你的 commit tree 看起來更為簡潔，因為任何的 commit 都在一條直線上面。",
              "",
              "缺點：",
              "",
              "* `rebase` 修改了 commit tree 的歷史紀錄。",
              "",
              "舉例來說，我們可以 rebase commit `C1`，將 `C1` 接在*過去的* `C3` 上面，那麼就可以表現出 `C1` 是出現在 `C3` 的後面。",
              "",
              "有一些程式設計師喜歡保留歷史紀錄，因此他們會比較喜歡 `merge`; 其他人（例如我自己）比較喜歡一個簡潔的 commit tree，因此他們比較喜歡 `rebase`。這些都是擇你所愛。:D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "在這個關卡中，我們面對的是之前關卡的題目，但是我們採用的是 `merge`，這可能會讓你感覺到有點困難，但是確實有講到重點。"
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
   "zh_CN":{
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 为何不merge?",
              "",
              "为了push新变更到远端，你要做的就是合并远端最新变更(使用rebase or merge). ",
              "",
              "所以你可以使用任意一种方法, 但为何本节会聚焦于rebasing 呢？为何会不喜欢用merge 去合并remote 呢？",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "在开发社区，有相当多的关于权衡的讨论。以下是关于rebasing 的优点/缺点： ",
              "",
              "优点:",
              "",
              "* Rebase 使你的提交树变得很干净, 所有的提交成了一条线: ",
              "",
              "缺点:",
              "",
              "* Rebase 修改的提交树的父历史",
              "",
              "比如, 提交C1 可以被修订到跃过C3。这看起来C1 是在C3 之后 (而实际上可能在C3之前) ",
              "",
              "一些开发者喜欢保留提交历史，更偏爱merging。而其它的人而喜欢拥有更干净的提交树，偏爱rebasing。这些都依赖于自己的偏爱.  :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "本节，我们要解决前面的单元问题，但是要用merging。这显得有点那啥了，但这只是为了更好的说明这一点。 "
            ]
          }
        }
      ]
    }
  }
};
