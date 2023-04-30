exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C11\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\",\"localBranchesThatTrackThis\":null},\"o/main\":{\"target\":\"C11\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]},\"side1\":{\"target\":\"C2\",\"id\":\"side1\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side2\":{\"target\":\"C4\",\"id\":\"side2\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side3\":{\"target\":\"C7\",\"id\":\"side3\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"},\"C9\":{\"parents\":[\"C2\",\"C8\"],\"id\":\"C9\"},\"C10\":{\"parents\":[\"C4\",\"C9\"],\"id\":\"C10\"},\"C11\":{\"parents\":[\"C10\",\"C7\"],\"id\":\"C11\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C11\",\"id\":\"main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C9\":{\"parents\":[\"C2\",\"C8\"],\"id\":\"C9\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"},\"C10\":{\"parents\":[\"C4\",\"C9\"],\"id\":\"C10\"},\"C11\":{\"parents\":[\"C10\",\"C7\"],\"id\":\"C11\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git checkout main;git pull;git merge side1;git merge side2;git merge side3;git push",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\",\"localBranchesThatTrackThis\":null},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]},\"side1\":{\"target\":\"C2\",\"id\":\"side1\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side2\":{\"target\":\"C4\",\"id\":\"side2\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null},\"side3\":{\"target\":\"C7\",\"id\":\"side3\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C1\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"side3\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C8\",\"id\":\"main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C8\":{\"parents\":[\"C1\"],\"id\":\"C8\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "Merging with remotes",
    "zh_CN": "合并远程仓库",
    "zh_TW": "merge with remotes",
    "es_AR": "Mergeando con los remotos",
    "es_ES": "Haciendo merge con los remotos",
    "pt_BR": "Merge com remotos",
    "gl": "Merge cos repos remotos",
    "de_DE": "Änderungen vom Remote zusammenführen",
    "ja": "リモートとのmerge",
    "fr_FR": "Fusionner avec les branches distantes",
    "ru_RU": "Слияние с удалённым репозиторием",
    "ko": "원격 작업과 merge하기",
    "uk": "Мердж з віддаленим репозиторієм",
    "vi": "Hợp nhất nhánh từ xa",
    "sl_SI": "Merganje z oddaljenim repozitorijem",
    "pl": "Scalanie z remote",
    "it_IT": "Fondere in remoto"
  },
  "hint": {
    "en_US": "Pay attention to the goal tree!",
    "zh_CN": "注意目标树!",
    "zh_TW": "注意最後要完成的目標！",
    "es_AR": "¡Prestá atención al árbol final!",
    "es_ES": "¡Presta atención al árbol final!",
    "pt_BR": "Preste atenção na árvore do objetivo!",
    "gl": "Presta atención á arbore final!",
    "de_DE": "Beachte den Ziel-Baum!",
    "ja": "ゴールツリーをよく見てください！",
    "fr_FR": "Respectez l'arbre représentant l'objectif !",
    "ru_RU": "Внимательно посмотрите на цель уровня!",
    "ko": "goal을 잘 살펴보세요!",
    "uk": "Уважно подивись як має виглядати результат!",
    "vi": "Hãy để ý đến cây mục tiêu!",
    "sl_SI": "Poglej si ciljno drevo!",
    "pl": "Zwróć uwagę, jak wygląda docelowe drzewo!",
    "it_IT": "Fai attenzione all'albero nell'obiettivo"
  },
  "compareOnlyMain": true,
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Why not merge?",
              "",
              "In order to push new updates to the remote, all you need to do is *incorporate* the latest changes from the remote. That means you can either rebase *or* merge in the remote branch (e.g. `o/main`).",
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
              "Dans le but d'envoyer de nouvelles modifications sur le dépôt distant, la seule étape préliminaire est *d'incorporer* les derniers changements de ce dépôt dans le nôtre. Concrètement, vous pouvez faire un rebase *ou* un merge de la branche distante (c'est à dire de `o/main`).",
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
              "Certains développeurs aiment préserver l'historique et préfèrent donc merge. Les autres (comme moi) préfèrent avoir un arbre des commits propre et préfèrent rebase. C'est une question de goûts :D"
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
    "es_AR": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## ¿Por qué no mergear?",
              "",
              "Para pushear tus novedades al remoto, todo lo que tenés que hacer es *integrar* los últimos cambios del remoto con los tuyos. Eso significa que podés hacer tanto rebase como merge con la rama remota (por ejemplo, `o/main`).",
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
              "Por ejemplo, el commit `C1` puede rebasearse para que aparezca *después* de `C3`. Entonces, parece que el trabajo de `C1'` se hizo después de `C3`, cuando en realidad se había hecho antes.",
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
    "es_ES": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## ¿Por qué no hacer merge?",
              "",
              "Para hacer push con tus novedades al remoto, todo lo que tienes que hacer es *integrar* los últimos cambios del remoto con los tuyos. Eso significa que puedes hacer tanto rebase como merge con la rama remota (por ejemplo, `o/main`).",
              "",
              "Así que si puedes hacer cualquiera de las dos, ¿por qué las lecciones sólo se han centrado en rebasear hasta ahora? ¿Por qué no dedicarle algo de amor al `merge` cuando trabajamos con remotos?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Hay mucho debate entre los desarrolladores sobre los pros y contras de mergear vs rebasear. Aquí te mostraré los pros y contras de rebasear:",
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
              "Algunos desarrolladores prefieren preservar la historia, por lo que deciden mergear. Otros (como yo) preferimos tener un árbol de commits limpios, y preferimos rebasear. Todo es una cuestión de preferencias :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para este nivel, tratemos de resolver el nivel anterior, pero *mergeando*. Puede volverse un poco cuesta arriba, pero ilustra la idea bastante bien."
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
              "Para enviar novas atualizações ao repositório remoto, tudo que você precisa é *incorporar* as últimas mudanças ali presentes. Isso significa que você pode tanto fazer um rebase *quanto* um merge no ramo remoto (ex. `o/main`).",
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
    "gl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## ¿Por qué non mesturar?",
              "",
              "Para empurrar as túas novidades ó remoto, todo o que tes que facer é *integrar* os últimos cambios do remoto cos teus. Eso significa que podes facer tanto rebase como merge ca rama remota (por exemplo, `o/main`).",
              "",
              "Así que podes facer calquera das dúas, ¿por qué as leccións só se centraron en rebasar ata agora? ¿Por qué non adicarlle algo de amor ó `merge` cando traballamos con remotos?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Hai moito debate entre os desenvolvedores sobre os pros e contras de mesturar vs rebasar. Aquí temos os pros e os contras de rebasar:",
              "",
              "Pros:",
              "",
              "* Rebasar fai que a túa árbore de commits sexa bastante limpa, xa que tódolos commits seguen unha única línea.",
              "",
              "Contras:",
              "",
              "* Rebasar modifica a historia (aparente) da túa árbore de commits.",
              "",
              "Por exemplo, o commit `C1` pode rebasarse para que apareza *despois* de `C3`. Entón, parece que o traballo de `C1'` fíxose despois de `C3`, inda que na realidade fixérase antes.",
              "",
              "Algúns desenvolvedores  aman preservar a historia, polo que prefiren mesturar. Outros (coma min) preferimos ter unha árbore de commits limpos, e preferimos rebasar. Todo é unha cuestión de preferencias :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Para este nivel, tratemos de resolvelo nivel anterior, pero *mesturando*. Pode poñerse un pouco oscuro, pero ilustra a idea bastante ben."
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
              "為了要 push 新的 commit 給 remote，你只需要做的是先同步 remote 的更新，那就表示你可以使用 rebase *或者*是 merge remote branch （例如，`o/main`）。",
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
              "Um neue Dinge auf das Remote zu schieben musst du erst alle Änderungen vom Remote holen und bei dir integrieren. Das bedeutet du kannst den entfernten Branch (z.B. `o/main`) entweder Rebasen *oder* Mergen.",
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
              "* Rebasen macht den Commit-Baum sehr übersichtlich, weil alles linear aufeinander aufbaut.",
              "",
              "Nachteile:",
              "",
              "* Rebasen verändert die History eines Branches.",
              "",
              "Zum Beispiel kann durch Rebasen Commit `C1` an Commit `C3` *vorbei* bewegt werden, bzw. eine Kopie von `C1`. Es sieht dann so aus als wären die Änderungen in `C1` nach denen in `C3` gemacht worden, obwohl das nicht stimmt.",
              "",
              "Manche Entwickler möchten lieber die Historie lassen, wie sie ist und ziehen daher das Mergen vor. Andere (wie ich) haben lieber einen sauberen Commit-Baum und ziehen Rebase vor. Am Ende ist es eine Geschmacksfrage. :D"
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
    "zh_CN": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 为什么不用 merge 呢?",
              "",
              "为了 push 新变更到远程仓库，你要做的就是**包含**远程仓库中最新变更。意思就是只要你的本地分支包含了远程分支（如 `o/main`）中的最新变更就可以了，至于具体是用 rebase 还是 merge，并没有限制。",
              "",
              "那么既然没有规定限制，为何前面几节都在着重于 rebase 呢？为什么在操作远程分支时不喜欢用 `merge` 呢？",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "在开发社区里，有许多关于 merge 与 rebase 的讨论。以下是关于 rebase 的优缺点：",
              "",
              "优点:",
              "",
              "* Rebase 使你的提交树变得很干净, 所有的提交都在一条线上",
              "",
              "缺点:",
              "",
              "* Rebase 修改了提交树的历史",
              "",
              "比如, 提交 C1 可以被 rebase 到 C3 之后。这看起来 C1 中的工作是在 C3 之后进行的，但实际上是在 C3 之前。",
              "",
              "一些开发人员喜欢保留提交历史，因此更偏爱 merge。而其他人（比如我自己）可能更喜欢干净的提交树，于是偏爱 rebase。仁者见仁，智者见智。 :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "本关，我们还是解决上一关卡中的问题，但是要用 merge 替换 rebase。这显然有点画蛇添足，但这只是为了更好的说明上面的观点。"
            ]
          }
        }
      ]
    },
    "ja": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## なぜマージではいけないのか？",
              "",
              "新しい更新をリモートにプッシュするため、あなたがする必要があるのはリモートからの最近の変更の*組み込み*です。それは、リモートブランチ(例えば、`o/main`)にリベース*か*マージのどちらかをあなたがする必要があるということを意味します。",
              "",
              "もしどっちの方法でも行うことができるなら、なぜこれまでのレッスンでは、リベースに焦点を当ててきたのでしょう？リモートへの作業で、なぜ`merge`を推してこなかったのでしょうか？",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "開発コミュニティで、マージとリベースの間でのトレードオフについては多くの議論がなされています。ここでは一般的なリベースのメリット/デメリットを紹介しましょう:",
              "",
              "メリット:",
              "",
              "* リベースは全てが直線上にあるので、あなたのコミットツリーをとても綺麗にみせます。",
              "",
              "デメリット:",
              "",
              "* リベースは、コミットツリーの（見ため上の）履歴を改変してしまいます。",
              "",
              "例えば、`C1`コミットは`C3`コミットの後ににリベースすることができます。現実とは逆に、`C1'`の作業がまるで`C3`の後に行われたものであるかのように見えるようになります。",
              "",
              "開発者によっては、履歴をそのまま保持するのを好むので、マージを選びます。他の人は（例えば私は）きれいなコミットツリーを好むのでリベースを選びます。つまるところ、好みの問題というわけですね :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "このレベルでは、前回のレベルを*マージ*を代わりに使って解いてみてください。ちょっと難しいかもしれませんが、このレッスンのポイントを把握するのに十分な知見を得られるはずです。"
            ]
          }
        }
      ]
    },
    "ru_RU": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Merge? Нет, нет, спасибо.",
              "",
              "Чтобы закачать (push) новые изменения в удалённый репозиторий, всё, что вам нужно сделать - это *смешать* последние изменения из удалённого репозитория. Это значит, что вы можете выполнить rebase *или* merge на удалённом репозитории (например, `o/main`).",
              "",
              "Если мы можем воспользоваться одним из двух методов, то почему же эти упражнения сфокусированы в основном на rebase? К чему такая нелюбовь к `merge`, когда речь идёт о работе с удалёнными репозиториями?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "В среде разработчиков существует огромное количество дебатов около merging и rebasing. Ниже приведены основные за / против метода rebasing:",
              "",
              "За:",
              "",
              "* Rebasing делает дерево коммитов более чистым и читабельным, потому что всё представляется единой прямой линией.",
              "",
              "Против:",
              "",
              "* Метод rebasing явно изменяет историю коммитов в дереве.",
              "",
              "Например, коммит `C1` может быть перебазирован *после* `C3`. Соответственно, в дереве работа над `C1'` будет отображаться как идущая после `C3`, хотя на самом деле она была выполнена раньше.",
              "",
              "Некоторые разработчики любят сохранять историю и предпочитают слияние (merging). Другие (такие как я) предпочитают иметь чистое дерево коммитов, и пользуются перебазировкой (rebasing). Всё зависит от ваших предпочтений и вкусов :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Чтобы пройти этот уровень, решите предыдущие задачи, но с помощью *слияния (merging)*. Может быть, получится слегка неказисто, однако такое упражнение хорошо отразит суть различий."
            ]
          }
        }
      ]
    },
    "ko": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## 왜 merge하지 않는거죠?",
              "",
              "새로운 작업들을 원격 저장소로 push하기위해서 여러분은 원격 저장소의 최근 변경들을 *합치기*만 하면 됩니다. 이 말은 즉 원격 브랜치로(예:`o/main`) rebase를 할 수도 merge를 할 수도 있다는 것입니다.",
              "",
              "두가지를 다 할 수 있다면, 왜 지금까지 배운 레슨들은 rebase를 하는것에 집중한거죠? 원격 저장소와 작업을 할때는 왜 `merge`에게 관심을 가져주지 않는건가요?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "개발 커뮤니티에서 merge를 하는것과 rebase 사이의 트레이드 오프에 대해 많은 논의가 이루어지고 있습니다. 여기 rebase의 일반적인 장 / 단점을 소개하겠습니다:",
              "",
              "장점:",
              "",
              "* rebase는 여러분의 커밋 트리를 깔끔하게 정리해서 보기가 좋습니다 모든게 한 줄에 있기때문이죠.",
              "",
              "단점:",
              "",
              "* rebase를 하게 되면 커밋 트리의 (보이는)히스토리를 수정합니다.",
              "",
              "예를 들어, 커밋 `C1`는 *과거*의`C3`로 rebase 될 수 있습니다. `C1'`의 작업이 `C3`의 다음에 있는것으로 보이게 되는겁니다. 실제로는 `C1`이 먼저 완료된거인데 말이죠.",
              "",
              "어떤 개발자들은 이력이 보존되는것을 좋아하기 때문에 merge를 선호합니다. 그 이외는(저 처럼) 커밋 트리가 깔끔한것을 선호해서 rebase를 선호합니다. 자기 입맛에 맞추면 되겠습니다 :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "이번 레벨에서는 이전의 레벨을 해결 해봅시다. 대신 이번에는 *merge*를 사용하겠습니다. 조금 복잡할 수 있지만 지금 배운 내용의 포인트를 파악하기 좋을것 입니다."
            ]
          }
        }
      ]
    },
    "uk": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Чому б не змерджити?",
              "",
              "Для того, щоб віддалений сервер прийняв твої зміни, треба *об'єднати* їх з останніми змінами на сервері. Це означає ребейс *або* мердж з віддаленою гілкою (напр. `o/main`).",
              "",
              "Хмм, якщо можна використати один із цих методів, для чого нам додаткові уроки про ребейс? Чому ніхто не любить `merge`, працюючи з віддаленим сервером?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "В спільноті розробників давно ведуться суперечки щодо переваг і недоліків мерджингу і ребейсу. Ось головні з них для ребейсу:",
              "",
              "За:",
              "",
              "* Ребейс дозволяє тримати дерево комітів чистим, оскільки все вибудовується в пряму лінію;",
              "",
              "Проти:",
              "",
              "* Ребейс змінює історію в дереві комітів.",
              "",
              "Наприклад, коміт `C1` можна ребейснути *на* `C3`. Як результат `C1'` буде йти після `C3`, хоча насправді його зробили раніше.",
              "",
              "Деякі розробники люблять зберігати історії і тому вибирають мерджинг. Інші (як і я) воліють мати чисте дерево комітів і віддають перевагу ребейсу. Це питання смаку :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "На цьому рівні спробуймо вирішити попереднє завдання з використанням *мерджу*. Можливо вийде не так охайно, але добре покаже різницю в підходах."
            ]
          }
        }
      ]
    },
    "vi": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Tại sao không hợp nhất?",
              "",
              "Để có thể đẩy cập nhật của bạn lên kho nhánh từ xa, tất cả những gì bạn cần làm là *kết nạp* thay đổi mới nhất từ nhánh từ xa. Nghĩa là bạn có thể dùng rebase *hoặc* merge với nhánh từ xa (ví dụ `o/main`).",
              "",
              "Vậy ta có thể sử dụng một trong 2 cách, thì tại sao đến giờ ta chỉ tập trung vào rebase trong các bài học? Tại sao khi làm việc với nhánh từ xa lại ta lại không thích `hợp nhất` (`merge`)?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Trong cộng đồng phát triển phần mềm có rất nhiều tranh luận về ưu, nhược, khuyết của việc sử dụng tái bố trí (`rebase`) hay hợp nhất (`merge`). Dưới đây là một vài ưu / nhược cơ bản của rebase:",
              "",
              "Ưu điểm:",
              "",
              "* Rebase làm cây commit của bạn trông gọn gàng hơn nhiều vì mọi thứ được xếp theo đường thẳng",
              "",
              "Nhược điểm:",
              "",
              "* Rebase sửa đổi lịch sử của cây commit.",
              "",
              "Ví dụ, commit `C1` có thể bố trí lên *sau* `C3`. Thế là `C1'` biểu hiện như là nó xuất hiện sau `C3` trong khi thực tế nó được hoàn thành trước đó.",
              "",
              "Một số nhà phát triển thích lưu giữ lịch sử nên họ ưa thích merge hơn. Những người khác (như tôi chẳng hạn) thì thiên về rebase hơn vì muốn có cây commit gọn gàng. Rốt cuộc cũng chỉ phụ thuộc vào sở thích cá nhân thôi :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Ở cấp độ này, hãy thử giải bài tập trước đó nhưng dùng *hợp nhất*. Có lẽ bài này hơi thừa nhưng mà nó minh họa quan điểm trên rõ ràng hơn."
            ]
          }
        }
      ]
    },
    "sl_SI": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Zakaj ne merganje?",
              "",
              "Da bi poslal nove spremembe na oddaljen repo, je vse kar moraš narediti, da *vključiš* zadnje spremembe iz oddaljenega repota. To pomeni, da lahko rebaseaš *ali* mergeaš v oddaljeni branch (npr. `o/main`).",
              "",
              "Torej če lahko narediš katero izmed metod, zakaj imeti lekcijo, ki se zaenkrat osredotoča na rebaseanje? Zakaj ni nobene ljubezni do `mergea` pri delanju z oddaljenimi repoti?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Veliko govora je o kompromisih med merganjem in rebasanjem med razvijalci. Tu so splošne prednosti / slabosti rebaseanja:",
              "",
              "Prednosti:",
              "",
              "* Rebasanje naredi tvoje drevo lepo in pregledno, ker je vse v ravni črti",
              "",
              "Slabosti:",
              "",
              "* Rebasanje spremeni (navidezno) zgodovino drevesa commitov.",
              "",
              "Naprimer, commit `C1` je lahko rebasean *mimo* `C3`. Potem izgleda, kot da je delo za `C1'` prišlo za `C3`, čeprav je v resnici bilo končano prej.",
              "",
              "Nekateri razvijalci imajo radi ohranjanje zgodovine in imajo posledično rajši merganje. Drugi (kot jaz) imajo rajši čisto drevo commitov in posledično rebasanje. Na koncu prevlada osebna preferenca. :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Za to stopnjo, poizkusimo rešiti prešnjo stopnjo z *merganjem*. Mogoče bo malo zakomplicirano, vendar bo lepo ponazorilo poanto."
            ]
          }
        }
      ]
    },
    "pl": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Dlaczego nie merge?",
              "",
              "Aby wypchnąć nowe wersje, musisz tylko *nanieść* najnowsze zmiany ze zdalnego repozytorium. A to znaczy, że możesz zrobić albo rebase, *albo* merge gałęzi w zdalnym repozytorium (np. `o/main`).",
              "",
              "Skoro można to zrobić na oba sposoby, to dlaczego lekcje skupiały się do tej pory na przebazowaniu? Dlaczego `merge` nie jest lubianym poleceniem przy pracy na zdalnych repo?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wśród osób zajmujących się programowaniem toczą się spory, co jest lepsze: merge czy rebase. Oto ogólne za i przeciw rebase'owania:",
              "",
              "Za:",
              "",
              "* Przebazowanie sprawi, że twoje drzewo commitów będzie wyglądać bardzo czysto, ponieważ wszystko znajdzie się w jednej linii",
              "",
              "Przeciw:",
              "",
              "* Rebase zmienia (pozornie) historię drzewa commitów.",
              "",
              "Na przykład: commit `C1` można przebazować *za* `C3`. Pozornie będzie to wyglądać tak, jakby praca na `C1'` została wykonana później niż na `C3`, a w rzeczywistości było zupełnie odwrotnie.",
              "",
              "Część osób ceni sobie oryginalną historię i dlatego woli merdżować. Inni (w tym ja) wolą mieć czyste drzewo commitów i dlatego używają rebase. To po prostu kwestia osobistych preferencji :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Na tym poziomie spróbujemy rozwiązać zadanie z poprzedniego, ale tym razem użyjemy *merge*. Może się to wydawać lekko pogmatwane, ale dobrze pokazuje tę metodę."
            ]
          }
        }
      ]
    },
    "it_IT": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Perché non fondere?",
              "",
              "Per riuscire a caricare nuovi aggiornamenti al repository remoto, serve solamente *incorporare* le modifiche più recenti avvenute sul remoto. Ciò significa che puoi ribasare *oppure* fondere le nuove modifiche al ramo remoto (e.g. `o/main`).",
              "",
              "Quindi, se entrambi i metodi sono validi, perché le lezioni si sono concentrate sul ribasare? Perché non c'è amore per il `merge` quando si lavora con i repository remoti?",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "C'è abbastanza dibattito sui compromessi tra il fondere e il ribasare nell'ambiente degli sviluppatori. Qui presentiamo in generale i pro e contro del ribasare:",
              "",
              "Pro:",
              "",
              "* Ribasare rende il tuo albero dei commit più semplice da leggere in quanto tutto rientra in una linea dritta",
              "",
              "Cons:",
              "",
              "* Ribasare modifica lo storico (apparente) dell'albero dei commit.",
              "",
              "Ad esempio, il commit `C1` può essere ribasato *dopo* di `C3`. Apparirà che il lavoro per `C1` è avvenuto dopo `C3` quando in realtà era stato completato in precedenza.",
              "",
              "Alcuni sviluppatori amano preservare lo storico e perciò prediligono la fusione di commit. Altri (come il sottoscritto) preferiscono avere un albero dei commit più pulito, e perciò preferiscono ribasare. È una questione di gusti :D"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Per questo livello, prova a risolvere il livello precedente ma usando il *merge* invece che il *rebase*. L'albero apparirà più \"ingarbugliato\", ma dovrebbe riuscire a rendere bene l'idea."
            ]
          }
        }
      ]
    },
  }
};
