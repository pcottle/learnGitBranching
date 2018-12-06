module.exports = {
  "multiple-parents-name": "複数の親",
  "multiple-parents-hint": "`git branch bugWork`を対象のコミットと組み合わせて使い、欠如しているリファレンスを作成しましょう",
  "multiple-parents-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 親の指定",
            "",
            "`~`修飾子と同じように、`^`修飾子も後に任意の番号を置くことができます。",
            "",
            "指定した数だけ遡る（これは`~`の場合の機能）のではなく、`^`はマージコミットからどの親を選択するかを指定できます。マージコミットは複数の親で構成されるので、選択する経路が曖昧であることを覚えておいてください。",
            "",
            "Gitは通常、マージコミットから「一つ目」の親、マージされた側のブランチの親を選びます。しかし、`^`で数を指定することでこのデフォルトの動作を変えることができます。",
            "",
            "では、実際の動作を見ていきましょう。",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "ここに、マージコミットがあります。もし、指定無しに`master^`でチェックアウトした場合、私たちは一番目の親に移動することになります。",
            "",
            "(*私たちのツリーでは、一番目の親はマージコミットのちょうど上に位置しています。*)"
          ],
          "afterMarkdowns": [
            "簡単ですね -- これがデフォルトの動作になります。"
          ],
          "command": "git checkout master^",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "それでは代わりに二つ目の親を指定してみます"
          ],
          "afterMarkdowns": [
            "見ましたか？私たちは他の親に移ることができました。"
          ],
          "command": "git checkout master^2",
          "beforeCommand": "git checkout HEAD^; git commit; git checkout master; git merge C2"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`^`修飾子と`~`修飾子は、コミット履歴を辿るのを強力に補助してくれます:"
          ],
          "afterMarkdowns": [
            "超高速ですね！"
          ],
          "command": "git checkout HEAD~; git checkout HEAD^2; git checkout HEAD~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "より素晴らしいことに、これらの修飾子は連鎖させることができます！これを見てください:"
          ],
          "afterMarkdowns": [
            "前と同じ移動ですが、なんと一つのコマンドでできています。"
          ],
          "command": "git checkout HEAD~^2~2",
          "beforeCommand": "git commit; git checkout C0; git commit; git commit; git commit; git checkout master; git merge C5; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 練習課題",
            "",
            "このレベルをクリアするためには、まず新しいブランチを指定したように作成します。",
            "",
            "明らかに直接コミットを指定した方が（`C6`というように）簡単ですが、私は今まで述べたような修飾子を使う方法で挑戦してもらいたいと思います。"
          ]
        }
      }
    ]
  },
  "branching-name": "Gitのブランチ",
  "branching-hint": "ブランチの作成（\"git branch [ブランチ名]\"）と、チェックアウト（\"git checkout [ブランチ名]\"）",
  "branching-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Gitのブランチ",
            "",
            "Gitではコミットだけでなく、ブランチもまた信じられないほど軽量です。ブランチとは単に特定のコミットを指示したポインタにしか過ぎません。Gitの達人が決まってこう言うのは、そのためです：",
            "",
            "```",
            "早めに、かつ頻繁にブランチを切りなさい",
            "```",
            "",
            "どれほど多くのブランチを作ってもストレージやメモリを全然使わないので、ブランチを肥大化させるよりも論理的に分割していく方が簡単なのです。",
            "",
            "ブランチとコミットをあわせて使い始めると、これら2つの機能がどのように連動して機能するかがわかるでしょう。ここではとりあえず、ブランチは基本的には「あるコミットとその親のコミットたちを含めた全てのコミット」のことを呼ぶと覚えておいてください。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "では実際にブランチがどのようなものかを見ていきましょう。",
            "",
            "`newImage`という名前の新しいブランチを切ってみることにします。"
          ],
          "afterMarkdowns": [
            "以上。必要な手順はこれだけです。いま作成された`newImage`ブランチは`C1`コミットを指しています。"
          ],
          "command": "git branch newImage",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "この新しいブランチに何か変更を加えてみましょう。次のボタンを押してください。"
          ],
          "afterMarkdowns": [
            "あらら、`newImage`ではなくて`master`ブランチが移動してしまいました。これは、私たちが`newImage`のブランチ上で作業していなかったためです。どのブランチで作業しているかは、アスタリスク(*)がついてるかどうかで分かります。"
          ],
          "command": "git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "今度は作業したいブランチ名をgitに伝えてみましょう。",
            "",
            "```",
            "git checkout [ブランチ名]",
            "```",
            "",
            "このようにして、コミットする前に新しいブランチへと作業ブランチを移動することができます。"
          ],
          "afterMarkdowns": [
            "できましたね。今度は新しいブランチに対して変更を記録することができました。"
          ],
          "command": "git checkout newImage; git commit",
          "beforeCommand": "git branch newImage"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "はい、これでもうどんなブランチでも切れますね。このウィンドウを閉じて、",
            "`bugFix`という名前のブランチを作成し、そのブランチをチェックアウトしてみましょう。"
          ]
        }
      }
    ]
  },
  "commits-name": "Gitのコミット",
  "commits-hint": "'git commit'コマンドを2回打てば完成!",
  "commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Gitのコミット",
            "コミットによって、ディレクトリ中の全てのファイルのスナップショットを記録します。巨大なコピー＆ペーストのようなものですが、実際にはそれよりずっと良いものです。",
            "",
            "Gitではコミットを可能な限り軽量に保つために、コミット毎にフォルダ全体をコピーしません。実際にはGitは、コミットを直前のバージョンから一つ先のバージョンへの「変更の固まり」あるいは「差分」として記録します。後で出てきますが、ほとんどのコミットが親を持っているのはそういう理由からです。",
            "",
            "リポジトリをcloneする時には、内部動作としてはコミットの差分をたどって全ての変更を取得しています。cloneした時に以下のような表示が出るのは：",
            "",
            "`resolving deltas`（訳：差分を解決中）",
            "",
            "このためです。",
            "",
            "もっと説明したいところですが、しばらくはコミットをスナップショットのようなものだと考えてください。コミットは非常に軽量であり、コミット間の移動も非常に高速です。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "これがどういうことか、動きを見ていきましょう。図には（小さな）gitリポジトリが描かれています。コミットが2つあります -- `C0`という名前の初回のコミットがあり、`C1`という名前の次のコミットが続きます。これは何か意味のある変更かもしれません。",
            "",
            "下のボタンを押下して新しいコミットを作ってみましょう。"
          ],
          "afterMarkdowns": [
            "できました! 良いですね。いまリポジトリに新しい変更が加えられ、1つのコミットとして保存されました。作成したコミットには親がいて、このコミットの出発点となった`C1`を指しています。"
          ],
          "command": "git commit",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "実際に手を動かしてみましょう。このウィンドウを閉じたら、試しに2回コミットをしてみましょう。"
          ]
        }
      }
    ]
  },
  "merging-name": "ブランチとマージ",
  "merging-hint": "指示された順番でコミットすること（masterの前にbugFixで）",
  "merging-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## ブランチとマージ",
            "",
            "いい調子ですね。これまでにコミットとブランチについて学びました。そろそろ2つのブランチを1つにまとめるやり方について見ていきましょう。これができれば新しい機能の開発のために新しいブランチを切って、開発が終わったら変更を元のブランチへ統合することができるようになります。",
            "",
            "はじめに紹介するのは、`git merge`を使ったマージのやり方です。mergeコマンドによって、2つの独立した親を持つ特別なコミットを作ることができます。2つの親を持つコミットが持つ意味とは、「全く別々の場所にいる2つの親（*かつ*、それらの親の祖先全て）が持つ全ての変更を含んでいますよ」ということです。",
            "",
            "見てみた方が早いので、次の画面で確認してみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "それぞれ別のコミットを指している2つのブランチがあります。変更が別々のブランチに分散していて統合されていないケースです。これをマージで1つにまとめてみましょう。",
            "",
            "`bugFix`ブランチを`master`ブランチにマージしてみます。"
          ],
          "afterMarkdowns": [
            "わあ、見ましたか？まず初めに、`master`ブランチが2つのコミットを親に持つ新しいコミットを指してますね。`master`から親をたどっていくと、最も古いコミットにたどり着くまでに全てのコミットを含んでいる様が確認できます。これで、全ての変更を含む`master`が完成しました。",
            "",
            "色がどう変わったかにも注目して下さい。学習を助けるために、ブランチ毎に色をつけています。それぞれのブランチは自分の色を持っていて、どのブランチから派生して出てくるか次第でコミットごとの色が決まります。",
            "",
            "今回のコミットには`master`ブランチの色が使われました。しかし`bugFix`ブランチの色がまだ変わってないようなので、これを変えてみましょう。"
          ],
          "command": "git merge bugFix",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`master`ブランチを`bugFix`ブランチにマージしてみます。"
          ],
          "afterMarkdowns": [
            "`bugFix`ブランチは`master`ブランチの派生元だったので、gitは実際大したことはしていません。`bugFix`ブランチを指していたポインタを`master`が指していたコミットへと移動させただけです。",
            "",
            "これで全てのコミットが同じ色になりました。つまり、リポジトリの中の全ての変更をそれぞれのブランチが持ったことになります。やったね！"
          ],
          "command": "git checkout bugFix; git merge master",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit; git merge bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "以下の作業で理解度の確認をしてみましょう:",
            "",
            "* `bugFix`という名前で新しいブランチを切る",
            "* `git checkout bugFix`コマンドで`bugFix`ブランチに切り替える",
            "* 一回だけコミット",
            "* `git checkout`で`master`へ戻る",
            "* もう1回コミットする",
            "* `git merge`コマンドを使って、`bugFix`ブランチを`master`ブランチへとマージする",
            "",
            "*注：\"objective\"コマンドでこのヘルプにいつでも戻ってこれます*"
          ]
        }
      }
    ]
  },
  "rebasing-name": "Rebaseの解説",
  "rebasing-hint": "初めにbugFixを指した状態でコミットする",
  "rebasing-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Rebase",
            "",
            "ブランチを一つにまとめる方法として前回はマージを紹介しましたが、今回紹介するリベースを使うこともできます。リベースの動作は、マージするコミットのコピーをとって、どこかにストンと落とすというイメージです。",
            "",
            "ピンと来ないかもしれませんが、リベースのメリットは一本の連続したコミットに整形できることです。リベースだけ使っていると、コミットのログや履歴が非常にクリーンな状態に保たれます。",
            "",
            "早速実際にどう動くのかを見てみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "前回と同様の2つのブランチを考えます。仮にいまbugFixブランチをチェックアウトしているとします。（アスタリスクつきのもの）",
            "",
            "bugFixに入ってる作業内容をそのまま直接masterブランチ上の内容に移動したいとします。こうすることで、実際には並行して開発された2つの別々のブランチ上の機能のソースを、あたかも1本のブランチ上で連続して開発されていたかのように見せることができます。",
            "",
            "`git rebase`コマンドでそれをやってみましょう。"
          ],
          "afterMarkdowns": [
            "できました！これでbugFixブランチの作業内容はmasterブランチのすぐ先に移動したので、見た目が一本になってスッキリしました。",
            "",
            "気を付けてほしいのは、C3コミットはどこかに残ってるということ（ツリーの中で半透明にしてあります）、そしてC3'は（C1との接続が切れているC3の）コピーがmasterブランチ上に作られているということです。",
            "",
            "一つ問題が残ってて、masterブランチがまだ最新化されていませんね。ちょっと直してみましょう。。"
          ],
          "command": "git rebase master",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "masterブランチにチェックアウトしてあります。この状態からmasterブランチを`bugFix`へとリベースしてみましょう。"
          ],
          "afterMarkdowns": [
            "できた！`master`は`bugFix`の直前のコミットだったので、gitは単純に`master`ブランチのポインタを前に進めただけでした。"
          ],
          "command": "git rebase bugFix",
          "beforeCommand": "git commit; git checkout -b bugFix C1; git commit; git rebase master; git checkout master"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "以下の作業で理解度の確認をしてみましょう。",
            "",
            "* `bugFix`という名前の新しいブランチをチェックアウトする",
            "* 一回だけコミット",
            "* masterブランチに戻ってもう1回コミット",
            "* bugFixをもう1回チェックアウトして、master上にリベース",
            "",
            "幸運を祈る！"
          ]
        }
      }
    ]
  },
  "describe-name": "Git Describe",
  "describe-hint": "次に進む準備が整ったなら、bugFixに対して一回commitしてください",
  "describe-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### Git Describe",
            "",
            "タグは、ソースリストの優秀な「アンカー（標識）」として作用するので、Gitには最も近く関係のある「アンカー」（タグの別名）を*記述するため*のコマンドがあります。そして、そのコマンドは`git describe`と呼ばれています！",
            "",
            "Gitの`describe`は、あなたが大量のコミットの中を移動するとき、今どこにいるかを知るのを助けてくれます（このような状況は、例えばあなたがデバッグ検索コマンドの一つ`git bisect`を走らせ終わった後や、同僚が休暇から帰ってきて自分の席に座るときに起こります）。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "Gitの`describe`は、以下の形式をとります:",
            "",
            "`git describe <参照>`",
            "",
            "`<参照>`には、Gitが解釈可能なコミットの参照表現（ブランチやタグの指定、コミットハッシュなど）をいれます。もし、何も入力しなかった場合、Gitは現在の位置のコミット（`HEAD`）を使います。",
            "",
            "コマンドの結果は以下のようになります:",
            "",
            "`<タグ>_<コミット数>_g<ハッシュ>`",
            "",
            "`<タグ>`には履歴の一番最新のタグ名が、`<コミット数>`にはそのタグから幾つのコミットがあったか、`<ハッシュ>`はそのコミットのハッシュがそれぞれ入ります。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "軽い例を見てみましょう。この木においての例は以下のようになります:"
          ],
          "afterMarkdowns": [
            "コマンド`git describe master`の結果は以下のようになります:",
            "",
            "`v1_2_gC2`",
            "",
            "さらに`git describe side`の結果は以下のようになります:",
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
            "`describe`によってGitの情報が簡潔に全て記述されます！このレベルでは、このコマンドの感触をつかむため幾つかの場所で`describe`をしてみてください。",
            "",
            "終わったら、最新のコミットに行き一度コミットを行えばこのレベルを終了することができます。この先では、いくつかの挑戦課題を用意しています :P"
          ]
        }
      }
    ]
  },
  "grabbing-one-commit-name": "一つのコミットのみを取得",
  "grabbing-one-commit-hint": "このレベルではインタラクティブモードのrebaseやcherry-pickがクリアのカギです",
  "grabbing-one-commit-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## ローカルに積み上がったコミット",
            "",
            "実際の開発ではこういうケースがよくあります：「バグの原因調査を試みているがバグの再現性がかなり低い。調査の補助のために、いくつかのデバッグ用の命令やprint文を差し込んでいる。」",
            "",
            "これらのデバッグ用のコードはバグ修正用のブランチにコミットされています。そしてついにバグの原因を突き止めて、修正した！やった！",
            "",
            "あとは`bugFix`ブランチを`master`ブランチに統合できればOK。そこで単純に`master`をfast-forwardすればよいかというと、それでは`master`ブランチの中にデバッグ用のコードも混入してしまいます。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "ここでGitの魔法が力を発揮します。解決のためにはいくつかの方法がありますが、最も素直な解決方法は2つあって：",
            "",
            "* `git rebase -i`",
            "* `git cherry-pick`",
            "",
            "インタラクティブモードの（`-i`オプションつきの）rebaseによって、保持したいコミットと破棄したいコミットを選り分けることができます。コミットの順序を変更することも可能です。この方法は、一部の変更をどこかへやってしまいたい時に便利です。",
            "",
            "もう一方のcherry-pickを使うと、持っていきたいコミットを選んで`HEAD`の先にストンと落とすことができます。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "後半の章ですのでどう解決するかをもう自分で考えることができると思います。このレベルをクリアするためには、`bugFix`が持っているコミットを`master`ブランチが受け取る必要がある点には注意してください。"
          ]
        }
      }
    ]
  },
  "juggling-commits-name": "コミットをやりくりする",
  "juggling-commits-hint": "最初に打つコマンドはgit rebase -i HEAD~2",
  "juggling-commits-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## コミットをやりくりする",
            "",
            "開発中に頻繁に起こるケースをもう1つ考えます。ある変更（`newImage`）とまた別の変更（`caption`）があって、それらに依存関係があるとします。この一連の変更が一列に積み重なっているとします。",
            "",
            "ここでトリッキーなのは、以前のコミットに対して微修正をかけなければならないケースがあるということです。今回の教材でも、過去のコミットであるにも関わらず`newImage`ブランチに僅かな修正を加えるような設計の修正が入ったとしましょう。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "この困難な状況を、以下の手順で克服することを考えます：",
            "",
            "* `git rebase -i`を使って順番を変更する。これで、変更をかけたいコミットを一番先頭に持ってくる。",
            "* `commit --amend`コマンドで僅かな変更を行う",
            "* `git rebase -i`コマンドを再度使って、先頭に持ってきていたコミットを元に戻す",
            "* 最後に、レベルクリアのためにmasterブランチを先頭に持ってくる",
            "",
            "クリアのための方法はいくつもありますが（cherry-pickを使うこともできます）、別の回答はまた後程の章で見ることにして、今回は上記の方法でやってみることにしましょう。",
            "",
            "最後に、ゴール時点での状態に気を付けてください。今回2回ほどコミットを動かしますから、コミットへのポインタにはアポストロフィ（'）が追加されます。commit --amendコマンドの実行でできたコミットには更にもう1つのアポストロフィが追加されます。 "
          ]
        }
      }
    ]
  },
  "juggling-commits2-name": "コミットをやりくりする その2",
  "juggling-commits2-hint": "masterのポインタを先に進めることを忘れずに！",
  "juggling-commits2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## コミットをやりくりする その2",
            "",
            "*注：この一つ前のレベル「コミットをやりくりする」をクリアしていない人は、まずそちらの問題をクリアしてきてください！*",
            "",
            "前回見てきたように、コミット順序の変更のために、私たちは`rebase -i`コマンドを利用しました。ツリーの先頭に変更対象のコミットがあれば、--amendオプションを使うことで容易に変更を書きかえて、元の順序に戻すことができます。",
            "",
            "この場合に心配なことが一つだけあって、それは複数回の順序の変更が行われるので、rebaseのコンフリクト（衝突）が起こりうることです。こういうケースへの対策として、`git cherry-pick`を使った別の解決法について考えてみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "git cherry-pickを使うと、ツリーの中から複数のコミットを選んで、HEADの下に新しく作ることができましたね。",
            "",
            "簡単なデモを見てみましょう："
          ],
          "afterMarkdowns": [
            "できました！次へ進みましょう"
          ],
          "command": "git cherry-pick C2",
          "beforeCommand": "git checkout -b bugFix; git commit; git checkout master; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルでは、`C2`をamendすることで前回と同じ目的を達成しましょう。但し`rebase -i`は使わずにクリアしてください。どんな方法で進めるかはあなたにおまかせします！:D"
          ]
        }
      }
    ]
  },
  "tags-name": "Gitのタグ",
  "tags-hint": "コミットを直接チェックアウトできますが、簡単にタグでチェックアウトすることも可能!",
  "tags-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Gitのタグ",
            "",
            "私たちは、前回、ブランチが簡単に移動でき、またしばしば異なる作業の完了しているコミットを参照できることを学びました。ブランチは、簡単に変化させることができ、しばしば一時的で、いつも移動しています。",
            "",
            "そのような場合に、もしプロジェクトの歴史的な点に*恒久的*にマークをつける方法があったならと思うかもしれません。例えば、メジャーリリースや大きなマージを行った時などに、そのコミットにブランチより恒久的な印をつける方法はないのでしょうか？",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "それは存在します！Gitのタグは当にそのような場面で最適です。 -- ブランチのように参照でき、「マイルストーン（標識）」のような確かで（多少）永久的な印をコミットにつけます。",
            "",
            "重要なことは、コミットを新たに作ってもタグは動かないということです。あなたは、タグにチェックアウトしてそのタグで作業を完了させるということはできません -- タグは、コミットツリーの特定の地点を指定する錨のようなものとして機能します。",
            "",
            "では、実際にタグがどのように動作するかを見てみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "私たちのバージョン1の原本となる`C1`にタグを付けてみましょう"
          ],
          "afterMarkdowns": [
            "見てください！とても簡単ですね。私たちは、`v1`という名前のタグを明示的に`C1`コミットに付与しました。もし、コミットを指定しなかった場合、`HEAD`にあるものにタグがつけられることになります。"
          ],
          "command": "git tag v1 C1",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルは、ゴールとして提示されている図のようにタグを作り、`v1`にチェックアウトすることで完了します。そうすると、あなたは`HEAD`分離状態になることに気づくでしょう -- これは、あなたが直接`v1`タグにコミットができないことを意味しています。",
            "",
            "次のレベルでは、タグのより興味深い使い方について学びます。"
          ]
        }
      }
    ]
  },
  "cherry-pick-name": "cherry-pick入門",
  "cherry-pick-hint": "git cherry-pickの後にコミット名を追加",
  "cherry-pick-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## コードの移動",
            "",
            "今まででは、gitの基本をひたすら見てきました -- コミットしたりブランチを派生したり、そしてソースツリーの中の色々な場所に移動することなどです。これらの概念だけで、gitリポジトリの力を90%使いこなすことができ、開発者の主な需要を満たしています。",
            "",
            "しかし最後の10%はより複雑なワークフローやちょっとトラブった時にとても役にたちます。これから取り上げる次の課題は「作業内容の移動」 –- 詳しく言えば、「この作業はここに置き、その作業はそこに置きたい」と言う開発者のために、優しく具体的で正確にその方法をお教えしましょう。",
            "",
            "ちょっと複雑に聞こえるかもしれませんが、概念は簡単です。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Cherry-pick",
            "",
            "このシリーズの一つ目のコマンドは、`git cherry-pick`。このコマンドの使い方は、次の形になります:",
            "",
            "* `git cherry-pick <Commit1> <Commit2> <...>`",
            "",
            "現在の位置(`HEAD`)の下に一連のコミットをコピーしたいという意を単純に表す方法です。分かりにくいところが少ないので、個人的に私がとても好きなコマンドです。",
            "",
            "デモを見ていきましょう!",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "このリポジトリには、現在`side`ブランチから`master`にコピーしたいコードがあります。この前に学んだrebaseコマンドでも実現可能ですが、ここではcherry-pickの動作を見ていきましょう。"
          ],
          "afterMarkdowns": [
            "これだけで終わりです！コミット`C2` と `C4`を取得したかったわけですが、gitが現在の位置の直下に落としてくれました。単純ですね！"
          ],
          "command": "git cherry-pick C2 C4",
          "beforeCommand": "git checkout -b side; git commit; git commit; git commit; git checkout master; git commit;"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルをクリアするには、３つのブランチからmasterにコードをコピーしてください。どのコミットを取得するかについてはゴールのツリーをみてください。",
            ""
          ]
        }
      }
    ]
  },
  "detached-head-name": "HEADの分離",
  "detached-head-hint": "コミットのラベル（hash）を使用",
  "detached-head-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 任意の位置への移動",
            "",
            "Gitの上級機能に進む前に、自分のプロジェクトを表すコミットツリーの中で任意の位置へ移動する様々な方法を知っておく必要があります。",
            "",
            "移動方法が身につけば、他のgitコマンドをよりうまく扱えるようになるでしょう！",
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
            "まずは\"HEAD\"から始めましょう。HEADとは現在チェックアウトされているコミットを指す単語です -- ようするに今作業中のコミットを表します。",
            "",
            "HEADはいつも、作業中のツリーに反映されている最新のコミットを指します。作業ツリーへ変更を加える多くのgitコマンドはまずHEADから処理を始めます。",
            "",
            "HEADは普段、ブランチ名（例えば、bugFixなど）を指します。コミットすれば、bugFixの状態が変更され、その変更がHEADから確認できるようになります。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "実際の動作を見てみましょう。ここでは、コミットの前と後のHEADの状態を確認します。"
          ],
          "afterMarkdowns": [
            "ほら、HEADが元から`master`ブランチの下に隠れていたんですね！"
          ],
          "command": "git checkout C1; git checkout master; git commit; git checkout C2",
          "beforeCommand": ""
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "### HEADの分離",
            "",
            "HEADの分離(detached HEAD)とは単に、ブランチではなく特定のコミットにHEADを紐づけることです。実行前の状態は次のようです:",
            "",
            "HEAD -> master -> C1",
            ""
          ],
          "afterMarkdowns": [
            "そして実行後はこう:",
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
            "このレベルをクリアするには、HEADを`bugFix`から分離し、その代わりに特定のコミットに紐づけましょう。",
            "",
            "このコミットをハッシュで指定します。コミットのハッシュはそのコミットを表す丸に刻まれています。"
          ]
        }
      }
    ]
  },
  "interactive-rebase-name": "インタラクティブrebase入門",
  "interactive-rebase-hint": "リベースする対象の指定には、ブランチ名や相対リファレンス(HEAD~)が使えます",
  "interactive-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git インタラクティブrebase",
            "",
            "どのコミットを操りたいか（そしてそれを指定するハッシュ）がわかる時に`git cherry-pick`はとても便利で、その簡単さはとてもありがたいです。 ",
            "",
            "しかし、どのコミットを操りたいかがわからない時はどうでしょう？ありがたいことに、そんな時にぴったりのコマンドがgitに備わっています。このためにgitのインタラクティブrebaseを使えます。rebaseしたい一連のコミットを一括で見るベストな方法です。",
            "",
            "具体的に見てみましょう..."
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "インタラクティブrebaseとは単に、`rebase`コマンドに`-i`オプションを合わせて使うことです。",
            "",
            "このオプションをつければ、gitがインタフェースを開き、どのコミットがrebase対象の下にコピーされるかを確認できます。それらのコミットのハッシュやメッセージも表示され、rebaseの概要を一眼で見るのに便利です。",
            "",
            "\"ホンモノ\"のgitでは、その「インターフェース」とは`vim`などのテキストエディタの中でファイルが開くだけです。ここでコンセプトを見せるために同じような動作をする小さなダイアログウィンドウを作りました。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "インタラクティブrebaseダイアログが開くと、３つの操作から選べます:",
            "",
            "* UIウィンドウのなかで順番を調整するだけでコミットの順番を変えられます（こちらのダイアログでは、マウスでドラッグアンドドロップで操作します）。",
            "* 特定のコミットを丸ごと除くこともできます。除きたいコミットを指定するには`pick`をオフにします。",
            "* 最後に、コミットを組み合わせられます。技術的に制限があり再現できないのでその詳細な説明を省きますが、短く言いますと、複数のコミットを一つにまとめることができる機能です。",
            "",
            "さて、例を見てみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "ボタンを押せば、インタラクティブrebaseウィンドウが現れます。コミットの順番を変更したり、`pick`を外したりしてみて、その結果を見てみましょう！"
          ],
          "afterMarkdowns": [
            "よっしゃー。gitがUIで指定されたようにコミットをコピーしました！"
          ],
          "command": "git rebase -i HEAD~4 --aboveAll",
          "beforeCommand": "git commit; git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルをクリアするにはインタラクティブrebaseを実行し、ゴールのビジュアライズに表示されている順番を実現しましょう。ミスがあれば`undo`や`reset`で修正できるのをお忘れなく。"
          ]
        }
      }
    ]
  },
  "relative-refs-name": "相対リファレンス (^)",
  "relative-refs-hint": "相対リファレンス(^)を思い出して！",
  "relative-refs-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 相対リファレンス",
            "",
            "コミットのハッシュを利用してgitの中で移動するのも少し疲れる時もあります。現実の世界では、このチュートリアルのようにターミナルの隣に見やすいツリーのビジュアライズがないので、ハッシュを見るには`git log`を使う必要があります。",
            "",
            "その上、実際のハッシュはこちらで見たものよりずっと長いです。例えば、先ほどのレベルの紹介のコミットハッシュは`fed2da64c0efc5293610bdd892f82a58e8cbc5d8`です。少し覚えにくいですね...",
            "",
            "そのため、gitでは手短くコミットを指定する方法があります。ユニークな存在だと確認できるだけのハッシュの字数を入力すれば良いです -- 上記の長い文字列の代わりに`fed2`を入力するだけで済みます。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "先ほど言いましたように、ハッシュでコミットを指定するのがめんどくさくなる時もあるので、gitには相対リファレンスという素晴らしい機能があります。",
            "",
            "相対リファレンスを使うことで、覚えやすい位置（例えば`bugFix`ブランチや`HEAD`）から始め、そのところから相対的な位置を指定できます。",
            "",
            "相対コミットは強力ですが、ここでは二つをご紹介します:",
            "",
            "* 一つずつ上へ移動させる`^`（カレット）",
            "* 複数回上へ移動させる `~<num>`"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "まずはカレット(^)から始めましょう。リファレンス名にカレットを追加すると、指定コミットの親コミットを見つけるようにとgitに命令を出しています。",
            "",
            "なので `master^`と記述すれば、\"`master`の一個上の親\"、という意味になります。",
            "",
            "そして`master^^`とはその親の一つの上のコミット(２代前の親)を指します。",
            "",
            "masterの上のコミットをここで見てみましょう"
          ],
          "afterMarkdowns": [
            "やりました！コミットハッシュを書くよりずっと簡単ですね。"
          ],
          "command": "git checkout master^",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`HEAD`を相対リファレンスとして参照することもできます。 ここで数回そのコマンドを使い、コミットツリーの中で上へと移動しましょう。"
          ],
          "afterMarkdowns": [
            "簡単ですね!`HEAD^`で時間を巻き戻せます。"
          ],
          "command": "git checkout C3; git checkout HEAD^; git checkout HEAD^; git checkout HEAD^",
          "beforeCommand": "git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルをクリアするには、`bugFix`の親コミットをチェックアウトしてください。その操作により`HEAD`が分離されます。",
            "",
            "ハッシュを使用してもいいですが、その代わりに相対リファレンスを試してみましょう！"
          ]
        }
      }
    ]
  },
  "relative-refs2-name": "相対リファレンス　その２ (~)",
  "relative-refs2-hint": "このレベルをクリアするには少なくとも一つの直接リファレンス（hash）を使用する必要があります",
  "relative-refs2-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "###\"~\" 演算子",
            "",
            "コミットツリーの中で複数の段階上へ移動したいとします。毎回毎回`^`と打つのは面倒くさくなるかもしれませんので、gitにはチルダの演算子も備わっています。",
            "",
            "",
            "チルダ演算子のあとには、上へ移動したい親コミットの数を表す数字もオプションでつけられます。実際の動作を見てみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "遡る前のコミット数を`~`で指定しましょう。"
          ],
          "afterMarkdowns": [
            "よっしゃ！効率が良いですね -- 相対リファレンスはなんと便利です。"
          ],
          "command": "git checkout HEAD~4",
          "beforeCommand": "git commit; git commit; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "###ブランチの強制",
            "",
            "今はあなたも相対リファレンスの達人なので、実践的な使い方を覚えましょう。",
            "",
            "相対リファレンスのよくある使い方としてあるのは、ブランチの移動です。`-f`オプションを使ってブランチを直接コミットに関連付けられます。次のようになります",
            "",
            "`git branch -f master HEAD~3`",
            "",
            "masterブランチを（強制的に）HEADより親三代前へと移動します。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "先ほどのコマンドの動作を見てみましょう。"
          ],
          "afterMarkdowns": [
            "できました！相対リファレンスを使うことで、手短く`C1`を指定することができ、`-f`でブランチを強制的にそこへ移動することができました。"
          ],
          "command": "git branch -f master HEAD~3",
          "beforeCommand": "git commit; git commit; git commit; git checkout -b bugFix"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "相対リファレンスとブランチの強制関連付けを見ましたので、いまここでそれらの方法を使ってみましょう。",
            "",
            "このレベルをクリアするには`HEAD`、`master`、`bugFix`をゴールで指定されている目的位置まで移動してください。"
          ]
        }
      }
    ]
  },
  "reversing-changes-name": "変更を元に戻す",
  "reversing-changes-hint": "revertとresetとで引数が異なることに注意。",
  "reversing-changes-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 変更を元に戻す",
            "",
            "Gitでは変更を元に戻す方法がたくさんあります。コミットと同じように、低レベルな動作（ファイル別だったりファイルの中の一部だったり）も高レベルな動作（変更のまとまりのキャンセル）もできます。このアプリケーションでは後者の方法について紹介します。",
            "",
            "基本的な巻き戻しの方法は2つあります -- 一つは`git reset`を使う方法で、もう1つは`git revert`を使う方法です。次のダイアログで一つ一つを見ていきます。",
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
            "`git reset`はブランチのポインタを後方に移動することで変更のキャンセルを実現します。履歴を上書きするような動作だと思うと良いでしょうか。`git reset`はそもそも前のコミットなんかなかったかのように、ブランチのポインタを元に戻してくれます。",
            "",
            "どういう感じか見てみましょう。"
          ],
          "afterMarkdowns": [
            "いいですね！Gitは単純にmasterブランチへのポインタを`C1`へ戻しました。これでこのローカルリポジトリにはまるで`C2`なんて無かったかのように変更をキャンセルできました。"
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
            "自分のマシン上のブランチではさっきの`git reset`でうまくいきましたが、この「履歴を上書きする」手段は、他の人も使っているリモートにあるリポジトリに対しては使うことができません。",
            "",
            "変更を巻き戻して他の人とそれを共有するためには、`git revert`を使う必要があります。今度はこれを見てみましょう。"
          ],
          "afterMarkdowns": [
            "あれ、おかしいな。巻き戻したいと思ってたコミットの下に新しいコミットが出来上がってしまったみたいです。なぜか。これは、この新しい`C2'`コミットは`C2`へ戻すのに必要な内容を確かに変更して巻き戻していたのです。",
            "",
            "こんな風にして、巻き戻した内容を他人と共有するためにはrevertを使います。"
          ],
          "command": "git revert HEAD",
          "beforeCommand": "git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "この章の仕上げに、`local`と`pushed`の両方の直近のコミットを巻き戻してみましょう。",
            "",
            "`pushed`はリモートのブランチで、`local`はローカルであることに注意。正しくコマンドを使い分けましょう。"
          ]
        }
      }
    ]
  },
  "many-rebases-name": "9000回以上のrebase",
  "many-rebases-hint": "最も効率的なやり方はmasterを最後に更新するだけかもしれない・・・",
  "many-rebases-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 複数のブランチをリベースする",
            "",
            "さあ、いくつものブランチが出てきます。このブランチたち全てをmasterブランチにリベースしましょう。",
            "",
            "おエライさん方が今回の仕事を少しトリッキーにしてくれました -- コミットはすべて一列の連続した状態にしてほしいそうです。つまり私たちが作るリポジトリの最終的なツリーの状態は、`C7'`が最後に来て、`C6'`がその一つ上に来て、、と順に積み重なるイメージです。",
            "",
            "試行錯誤してツリーが汚くなってきたら、`reset`コマンドを使ってツリーの状態を初期化してください。模範解答をチェックして、それよりも簡単なコマンドで済ませられるかどうかを考えるのも忘れずに！"
          ]
        }
      }
    ]
  },
  "selective-rebase-name": "ブランチスパゲッティ",
  "selective-rebase-hint": "全て正しい順番で処理すること！oneが最初で、次がtwo、最後にthreeを片付ける。",
  "selective-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## ブランチスパゲッティ",
            "",
            "なんということでしょう。今回のレベルクリアのために、やることがたくさんあります。",
            "",
            "いま`master`が指しているコミットの数個前のコミットに、ブランチ`one`、`two`それから`three`があります。何か事情があって、これらの3つのブランチをmasterが指している最新の状態に更新したいケースを考えます。",
            "",
            "ブランチ`one`に対しては、順序の変更と`C5`の削除が必要です。`two`では順序の変更のみ、`three`に対しては1回だけコミットすればOKです。",
            "",
            "`show solution`コマンドで模範解答を確認できますから、こちらも利用してください。 "
          ]
        }
      }
    ]
  },
  "clone-name": "Clone入門",
  "clone-hint": "単にgit clone!",
  "clone-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Gitリモート",
            "",
            "リモートのリポジトリというのはそんなに複雑なものでもありません。クラウドコンピューティングが普及している現在の世界では、gitリモートの裏には何か不思議な仕組みが動いていると思いやすいのですが、実は別のコンピュータ上に保存されているあなたのリポジトリのコピーにすぎません。通常、インターネットを媒体に使って別のコンピュータと対話し、コミットを交互にやり取りすることができます。",
            "",
            "とはいえ、リモートリポジトリにはいくつかの素晴らしい特徴があります:",
            "",
            "- まず、リモートはバックアップの役割を果たします。ご存知の通り、ローカルのgitリポジトリは以前の状態にファイルを復帰する機能を持っているのですが、その情報はすべてローカルに保存されています。gitリポジトリを別のコンピュータにも保存することで、ローカルのデータがすべて失われたとしても、保存状態からコーディングを続けられます。",
            "",
            "- それよりも大切なこととして、リモートではコードをより一般的に公開できます！プロジェクトのコピーが別の場所に保存されているため、友達などが簡単にそのプロジェクトに参加したり最近の変更をpullしたりできます。",
            "",
            "最近ではリモートリポジトリに関するデータをビジュアル的に表示するウェブサイト([Github](https://github.com/)や[Phabricator](http://phabricator.org/)など)の使用が人気を集めていますが、リモートリポジトリは_そのいずれの_ウェブサイトの裏にも使われています。なので理解する必要があります。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## リモートを作成するコマンド",
            "",
            "今までLearn Git Branchingでは_ローカル_リポジトリの様々な作業（branch, merge, rebaseなど）に焦点を当ててきました。しかし、これからはリモートリポジトリの作業を学びますので、レッスンのために環境をセットアップする必要があります。そのコマンドは`git clone`になります。",
            "",
            "通常、`git clone`はリモートリポジトリ（githubなどから）を_ローカル_にコピーする時に使います。しかしLearn Git Branchingでは少し違ったように使います -- ここでは`git clone`が_ローカルリポジトリ_をリモートにコピーします。本当のコマンドの逆の動作になっているのですが、学んでいくうちにcloneとリモートリポジトリのつながりが見えてくるはずです。なので、今はとりあえず例として使ってみましょう。",
            ""
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "最初の一歩として、ビジュアライズでリモートリポジトリを見てみましょう。",
            ""
          ],
          "afterMarkdowns": [
            "できました! プロジェクトのリモートリポジトリが保存されました。結構似ているのですが、その違いを明らかにするために少しだけビジュアルを工夫しました -- これからのレベルではこれらのリポジトリの間で作業をどう共有するか見ていきます。"
          ],
          "command": "git clone",
          "beforeCommand": ""
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルをクリアするには、`git clone`で既存のリポジトリのクローンを作成します。次のレッスンでより詳細に見ていきます。"
          ]
        }
      }
    ]
  },
  "fake-teamwork-name": "擬似的なチーム作業",
  "fake-teamwork-hint": "擬似的に作成するコミット数を指定できるのをお忘れなく",
  "fake-teamwork-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 連携のシミュレーション",
            "",
            "ここでは少し奇怪なものを取り扱います -- これは次回以降の幾つかのレッスンのためのもので、リモートセクションで変更点の反映方法を教えるのに必要なものです。",
            "",
            "つまり、私たちには時にはリモートの特定のブランチや特定の数のコミットを、同僚/友人/共同開発者の一人が更新した「ふりをする」ことが必要だというわけです。",
            "",
            "これを行うために、私たちは適切に選んだ名前のコマンド`git fakeTeamwork`を導入しました！とても明白でしょう？では、デモを見てみましょう。",
            "",
            "*注：もちろん、本当のgit上にこのようなコマンドは存在しません！変更は、「実在する」同僚や友人が行ってくれるでしょうから！ここではレッスンのために「擬似的に」導入しているにすぎません！*"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`fakeTeamwork`のデフォルトの動作は、単にmasterの上にコミットを乗っけるだけです"
          ],
          "afterMarkdowns": [
            "ではいってみましょう -- リモートには新しいコミットが更新され、それはまだ私たちの手元にはダウンロードされていません。なぜなら、`git fetch`を走らせていませんからね。"
          ],
          "command": "git fakeTeamwork",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "さらに特定の数のコミット、または追加するブランチをコマンドで指定することもできます。"
          ],
          "afterMarkdowns": [
            "一つのコマンドで、チームメイトが3個のコミットをリモートの`foo`ブランチにプッシュするという動作を再現することができました。"
          ],
          "command": "git fakeTeamwork foo 3",
          "beforeCommand": "git branch foo; git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "今後のレベルはどんどん難しくなっていくでしょうから、このレベルでも私たちはあなたに少々多くのことを求めます。",
            "",
            "先に行くには、リモートを作り（`git clone`で）、リモートに幾つかの変更を再現して、自身のリポジトリにコミットし、変更を取り込む必要があります。これは、このリモートのセクションでやった幾つかのレッスンの内容と似ていますね！"
          ]
        }
      }
    ]
  },
  "fetch-name": "Git Fetch",
  "fetch-hint": "単にgit fetchを実行！",
  "fetch-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Fetch",
            "",
            "リモートGitを用いた作業は、本当にただ単なる他のリポジトリ_への_、または他のリポジトリ_からの_データの転送に集約されます。コミットを転送できる限り、Gitで管理されている全ての種類の更新が共有できます（例えば作業や、新しいファイル、新しいアイデア、ラブレターなどです）。",
            "",
            "このレベルでは、リモートリポジトリ_から_データを取ってくる方法を学びます -- このコマンドは`git fetch`と名付けられています。",
            "",
            "リモートリポジトリの情報を私たちが更新するように、_リモート_ブランチも情報を更新することができることが分かるでしょう。これは前のレッスンでのリモートブランチの働きに結びつきます。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`git fetch`の説明に入る前に、その動作を見てみましょう。ここに、ローカルリポジトリにない二個のコミットを含んでいるリモートブランチがあります。"
          ],
          "afterMarkdowns": [
            "やりました！`C2`、`C3`コミットがローカルリポジトリにダウンロードされ、`o/master`リモートブランチに反映されました。"
          ],
          "command": "git fetch",
          "beforeCommand": "git clone; git fakeTeamwork 2"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### fetchとはどのようなものか",
            "",
            "`git fetch`は、主に二つのステップだけで動作します。それは以下のようなものです:",
            "",
            "* リモートにあってローカルリポジトリにないコミットをダウンロードする",
            "* リモートブランチの位置を更新する（例えば、`o/master`）",
            "",
            "`git fetch`は本質的には、_実際_のリモートリポジトリと同じように見えるような形でリモートリポジトリの_ローカル_の情報に同期します（ちょうど今のように）。",
            "",
            "前のレッスンでのことを覚えていると思いますが、リモートブランチはリモートと最後に同期した時点での状態を保持しているという話をしました。`git fetch`はそのリモートと同期する方法なのです！これでリモートブランチと`git fetch`の関係性は明らかになったでしょう？",
            "",
            "`git fetch`は、通常インターネットを通してリモートリポジトリと対話します（`http://`または`git://`プロトコル経由で）。",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### fetchがしてくれないもの",
            "",
            "`git fetch`は、しかしながら、_あなたの_ローカルの状態は変更しません。あなたの`master`ブランチや他のもの、今現在のあなたのファイルシステムが見せているものを更新しないのです。",
            "",
            "これは理解する上で重要なことです。なぜなら、多くの技術者は`git fetch`がリモートの状態をローカルの作業場に反映してくれると思っているからです。必要なデータはダウンロードされるかもしれませんが、ローカルのファイルを実際に変更するというようなことは_してくれない_のです。私たちは、この後のレッスンでもこのようなコマンドを学びます :D",
            "",
            "なので、この1日が終わる頃には、あなたは`git fetch`のダウンロードステップの動作が分かるようになるでしょう。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルを終えるには、単に`git fetch`を実行し、全てのコミットをダウンロードしてください。"
          ]
        }
      }
    ]
  },
  "fetch-args-name": "Fetchの引数",
  "fetch-args-hint": "コミットIDの入れ替わりに注意！スライドを復習するには`help level`を実行",
  "fetch-rebase-name": "履歴の分岐",
  "fetch-rebase-hint": "ゴールのツリーの順番を参考にすること",
  "fetch-rebase-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 分かれた作業",
            "",
            "これまでは、どのようにして`pull`でコミットを取り込み、`push`で自身の変更を反映するかを見てきました。単純なようにみえます。では何故人々は混乱するのでしょうか？",
            "",
            "その難しさは、リポジトリの履歴が*分岐*することに起因します。この詳細について説明する前に、まずは例を見てみましょう。",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "月曜日にリポジトリをクローンし、ある表面の機能をちょっと弄ることを想像してみてください。金曜日までに、あなたはその機能を公開する準備ができる -- しかし、ああなんということでしょう！あなたの同僚達は、あなたの機能が依存していた（そして、廃れた）コードの束をその週の内に書き換えていました。彼らはリモートリポジトリにコミットを共有して公開し、今や*あなたの*作業は*古い*バージョンのもはや適切でないプロジェクトに基づいていることになります。",
            "",
            "この場合、`git push`コマンドは曖昧になってしまいます。あなたが`git push`を走らせたとき、gitはリモートリポジトリは月曜の状態に変更を戻すべきでしょうか？それとも、新しいコードを取り除かないで追加しようとしてみるべきでしょうか？または、あなたの変更が完全に古いものになってしまったため、全て無視するべきなのでしょうか？",
            "",
            "この状況（履歴が分岐をしているとき）ではまったくもって曖昧なので、gitはあなたの変更を`push`することを許可しません。実際には、あなたの作業を共有する前に最新のリモートの状態を取り込むことを強制します。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "話しすぎましたね！この状況での動作をみてみましょう！"
          ],
          "afterMarkdowns": [
            "見ましたか？コマンドが失敗して、何も起こりませんでした。あなたの最近の`C3`コミットはリモートの`C1`コミットに依存しているため、`git push`は失敗しました。リモートには`C2`が更新されているので、gitはあなたのプッシュを拒否します。"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "ではこの状況を解決するにはどうしたらいいでしょう？簡単です、リモートブランチの最新の状態にあなたの作業が基づくようにすればいいのです。",
            "",
            "いくつか方法はありますが、最も簡単なのはあなたの作業をリベースで移動させることです。それがどのようなものか、さあみてみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "今、プッシュをする前に代わりにリベースをしてみましょう。"
          ],
          "afterMarkdowns": [
            "わお！私たちは`git fetch`でローカルのリモートブランチを更新し、私たちの作業をリベースさせてリモートの新しい変更に適用させ、`git push`でそれをプッシュしました。"
          ],
          "command": "git fetch; git rebase o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "リモートリポジトリが更新されたとき、他に自身の作業を更新する方法はあるでしょうか？もちろん、あります！今度は同じことを`merge`を代わりに使ってやってみましょう。",
            "",
            "`git merge`はあなたの作業を移動しませんが（代わりにマージコミットを作ります）、リモートの変更を全て取り込みgitに通知する方法なのです。この通知とは、リモートブランチが今やあなた自身のブランチの*親*を指していることになるため、あなたのリモートブランチの全ての変更を反映しているコミットを指します。",
            "",
            "この状況の例を見てみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "リベースの代わりに今度はマージを用います。"
          ],
          "afterMarkdowns": [
            "わお！私たちは`git fetch`でローカルのリモートブランチを更新し、私たちの作業を*マージ*して（リモートの新しい変更を反映するために）、`git push`でそれをプッシュしました。"
          ],
          "command": "git fetch; git merge o/master; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "素晴らしい！多くのコマンドを打たないでこれを実現する方法はあるでしょうか？",
            "",
            "もちろん -- あなたが既に知っているコマンドです。`git pull`は、`fetch`して`merge`するためのより短い書き方です。さらに便利なことに、`git pull --rebase`は`fetch`して`rebase`することの省略形です！",
            "",
            "コマンドを省略した場合を見てみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "まずは、`--rebase`から"
          ],
          "afterMarkdowns": [
            "前と一緒です！そしてとても短いです。"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "そして通常使う`pull`で試してみましょう"
          ],
          "afterMarkdowns": [
            "ここでも、前と同じです！"
          ],
          "command": "git pull; git push",
          "beforeCommand": "git clone; git fakeTeamwork; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "この取り込み作業の流れ、リベースとマージ、そしてプッシュはとてもよく行います。次回以降のレッスンではより複雑なパターンの作業を学びますが、今は習ったことをとりあえず試してみましょう。",
            "",
            "このレベルをクリアするには、以下のステップを踏みます:",
            "",
            "* あなたのリポジトリをクローン",
            "* 擬似的に幾つかの同僚の変更を真似る（1コミット）",
            "* あなた自身の作業をコミット（1コミット）",
            "* あなたの作業を*リベース*で公開"
          ]
        }
      }
    ]
  },
  "merge-many-features-name": "リモートとのmerge",
  "merge-many-features-hint": "ゴールツリーをよく見てください！",
  "merge-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## なぜマージではいけないのか？",
            "",
            "新しい更新をリモートにプッシュするため、あなたがする必要があるのはリモートからの最近の変更の*組み込み*です。それは、リモートブランチ(例えば、`o/master`)にリベース*か*マージのどちらかをあなたがする必要があるということを意味します。",
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
            "例えば、`C1`コミットは*過去*の`C3`コミットにリベースすることができます。それは、実際には前に完了しているのにもかかわらず、`C1'`の作業がまるで`C3`の後に行われたものであるかのように見えるようになります。",
            "",
            "幾人かの開発者は、履歴をそのまま保持するのが好みで、マージを選択します。その他（例えば私は）きれいなコミットツリーを好むのでリベースを選択します。つまるところ、好みの問題というわけですね :D"
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
  "pull-name": "Git Pull",
  "pull-hint": "単にgit pullを実行！",
  "pull-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Pull",
            "",
            "今や私たちはリモートリポジトリから`git fetch`でデータを取ってくる方法を知っているので、今度は私たちの作業にその変更を反映することを学びましょう！",
            "",
            "実際には多くの方法があり、ローカルに利用可能なリモートの新しいコミットがある場合、あなたはそのコミットを他のブランチの通常のコミットと同じように、自分の作業に組み込むことができます。これは、あなたが次のようなコマンドを実行することで行えます:",
            "",
            "* `git cherry-pick o/master`",
            "* `git rebase o/master`",
            "* `git merge o/master`",
            "* その他",
            "",
            "実は、リモートの変更を取ってきてマージするという作業の流れはとてもよく行われるので、gitは実際にはその二つを同時に行うコマンドを提供しているのです！それは、`git pull`というコマンドです。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "まずは、連続して`fetch`して`merge`する流れの方を見てみましょう。"
          ],
          "afterMarkdowns": [
            "わーお。私たちは`C3`を`fetch`でダウンロードして、`git merge o/master`でこれをマージしました。今や私たちの`master`ブランチに(この場合、`origin`という名前の)リモートの新しい作業内容が反映されています。"
          ],
          "command": "git fetch; git merge o/master",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "では、`git pull`では何が起こるのでしょうか？"
          ],
          "afterMarkdowns": [
            "同じことが起こります！明確に`git pull`は`git fetch`して取ってきたブランチの内容をマージするという流れの短縮系であることが確認できます。"
          ],
          "command": "git pull",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "`git pull`の（オプションや引数を含む）詳細はこの後にやりますが、今、このレベルではただ試してみるだけにしておきましょう。",
            "",
            "覚えておいてください。あなたは実際にはこのレベルを`fetch`と`merge`だけでこのレベルを解決することができますが、余計なコマンドのコストがかかるだけです :P"
          ]
        }
      }
    ]
  },
  "pull-args-name": "Pullの引数",
  "pull-args-hint": "Fetchとpullの引数を利用してローカルで新規ブランチを作成できるのをお忘れなく",
  "push-name": "Git Push",
  "push-hint": "Pushができるようになるには、まずリポジトリをcloneする必要があるのをお忘れなく",
  "push-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Git Push",
            "",
            "さて、私たちは変更をリモートからダウンロードしてきて、ローカルの自分の作業に取り込むことができるようになりました。それは素晴らしいことですが、例えば他の誰かに_自分の_作業を共有する場合はどうすればいいでしょう？",
            "",
            "そうですね、共有する作業をアップロードする方法は作業をダウンロードするものと対照的です。`git pull`の反対はなんでしょう？ `git push`です！",
            "",
            "`git push`は_あなたの_変更をリモートに対話的にアップロードし、リモートにあなたの新しい変更を取り込みます。`git push`が完了すれば、全ての友人たちがあなたの作業をリモートからダウンロードすることができます。",
            "",
            "`git push`は、あなたの作業を「公開する」コマンドと考えることができます。このコマンドは微妙な点をいくつか持っていますが、とりあえずは初歩から始めてみましょう。。。",
            "",
            "*注：引数なしの`git push`の挙動は、`push.default`と呼ばれるgitの設定値によって異なります。この設定のデフォルト値は、使用しているgitのバージョンに依存しますが、私たちのレッスンでは`upstream`という値を使用します。これはあまり大きな問題ではありませんが、あなたのプロジェクトにプッシュする前にあなたのgitの設定を確認する価値はあるでしょう。*"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "ここにリモートにはないいくつかの変更点があります。これをアップロードしてみましょう！"
          ],
          "afterMarkdowns": [
            "さて、いってみましょう -- リモートはコミット`C2`を受け取り、リモート上の`master`ブランチは`C2`の位置に更新され、私たち*自身*のリモートブランチ(`o/master`)も良い具合に更新されました。全てが同期されました！"
          ],
          "command": "git push",
          "beforeCommand": "git clone; git commit"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルを終えるには、単純に二つの新しいコミットをリモートに共有してください。けれども覚悟しておいてください。なぜなら、レッスンは少々難しいことを取り扱っているからです。"
          ]
        }
      }
    ]
  },
  "push-args-name": "Git pushの引数",
  "push-args-hint": "ダイアログの最後のスライドを参照するには\"objective\"を実行",
  "push-args2-name": "Git pushの引数 -- 拡張編!",
  "push-args2-hint": "降参して解説を見るには\"show solution\"を実行できるのをお忘れなく",
  "push-many-features-name": "Push Master!",
  "push-many-features-hint": "undoやresetコマンドをいつでも使用することができるのをお忘れなく",
  "push-many-features-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## 機能別のブランチ（フィーチャーブランチ）をマージする",
            "",
            "今や、あなたは`fetch`、`pull`、`push`を十分に使えるようになったでしょうから、そのスキルを新しい作業の流れで試してみましょう。",
            "",
            "大きなプロジェクトの開発者にとって、フィーチャーブランチ（`master`を除く）上で全ての作業を行い、完成したら一度でその作業を統合するというような流れが一般的です。これは前のレッスンの内容（他のブランチからリモートにプッシュされるような状況のところが）に似ていますが、ここではもう一歩踏み込んで解説しましょう。",
            "",
            "開発者は、`master`ブランチにいるときプッシュとプルしかしません -- `master`は常にリモート(`o/master`）に追従した状態のままにします。",
            "",
            "この作業の流れでは、私たちは二つのことを組み合わせています:",
            "",
            "* `master`にフィーチャーブランチの作業を統合し、",
            "* リモートへの`push`と`pull`を行う"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "`master`の更新と作業の反映の方法を手早く復習しましょう。"
          ],
          "afterMarkdowns": [
            "我々はここで二つのコマンドを動かしました:",
            "",
            "* リモートから新しいコミットを我々の作業にリベースし、",
            "* リモートに我々の作業を公開しました"
          ],
          "command": "git pull --rebase; git push",
          "beforeCommand": "git clone; git commit; git fakeTeamwork"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルはかなり難しいです -- ここに解答の一般的な道のりを示しておきます:",
            "",
            "* 三つのフィーチャーブランチ、`side1`、`side2`、`side3`があります。",
            "* この機能をそれぞれ、この順に、リモートにプッシュしてください。",
            "* リモートが更新されたなら、次はより良く作業を統合する方法を紹介しましょう。",
            "",
            ":O これはきつそうだ！このレベルを完了させることは大きな一歩となります。幸運を祈ります。"
          ]
        }
      }
    ]
  },
  "remote-branches-name": "リモートのブランチ",
  "remote-branches-hint": "順番に注意 -- まずmasterに対してcommitしましょう",
  "remote-branches-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## リモートのブランチ",
            "",
            "あなたは今や`git clone`の動作を知ったことでしょうから、次は実際に詳細を見てみましょう。",
            "",
            "まず、もしかしたらもう気付いているかもしれないですが、私たちのローカルリポジトリにo/masterという名前の新しいブランチが追加されています。このようなブランチは、_リモート_ブランチと呼ばれます。リモートブランチは、その固有の役割を担うために特別なプロパティを持っています。",
            "",
            "リモートブランチは、リモートリポジトリの_状態_を反映します（あなたがそのリモートリポジトリから変更を最後に問い合わせてからの）。",
            "",
            "リモートブランチは、あなたがチェックアウトするとき、`HEAD`が分離された状態になるという特殊な性質を持っています。Gitはこの上での動作を保証しません。なぜこのようになるかというと、リモートブランチ上での直接の作業はできないからなのです。あなたは、別の場所で作業をし、その後でリモートブランチに共有するようにしなければなりません（その後であなたのリモートブランチは更新されます）。"
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### `o/`とは何か?",
            "",
            "あなたは、リモートブランチが`o/`で始まることに驚くかもしれません。そう、リモートブランチには固有の（必要な）命名規則も存在するのです。 -- これは次のようなフォーマットで表示されます:",
            "",
            "* `<リモート名>/<ブランチ名>`",
            "",
            "これに基づいて、`o/master`と名付けられたブランチを見てみると、`master`はブランチの名前、`o`はリモートの名前であることが分かります。",
            "",
            "多くの開発者は、実際にはメインのリモート名として`o`ではなく`origin`を使います。これは一般的には、Gitが`git clone`した時に`origin`という名前をリモートに付与するためです。",
            "",
            "残念ながら、`origin`という長い名前は私たちのUIには合いませんでした。なので、私たちは短い`o`を使っています（覚えておいてもらいたいのは、実際のGitでは、リモートはおそらく`origin`と名付けられるであろうということです！）",
            "",
            "理解すべきことはたくさんあるので、ひとまず全ての動作を見てみましょう。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "リモートブランチをチェックアウトすると何が起こるかを見てみましょう"
          ],
          "afterMarkdowns": [
            "見ていた通り、`o/master`に移ってから新しいコミットをしても`HEAD`が分離状態になり`o/master`は更新されていません。これは、`o/master`がリモートの更新時のみ更新されるからです。"
          ],
          "command": "git checkout o/master; git commit",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "このレベルを終えるには、まずコミットを`master`に一回行い、その後`o/master`にチェックアウトしてからもう一度コミットをします。これは、リモートブランチがどれほど違った動きをするか、そしてリモートブランチがリモートの状態を反映する時しか更新されないことを理解するのに役立つでしょう。"
          ]
        }
      }
    ]
  },
  "source-nothing-name": "無のsource",
  "source-nothing-hint": "このレベルではbranchコマンドが無効になっているのでfetchを使うしかない！",
  "tracking-name": "リモートのトラッキング",
  "tracking-hint": "リモートトラッキングを設定する方法が二つあるのをお忘れなく!",
  "tracking-start-dialog": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### リモートトラッキングブランチ",
            "",
            "もしかしたら直近の幾つかの章で、あることが「魔法」に見えたかもしれません。それは、gitが`master`ブランチは`o/master`に関連していることを知っていたということです。確かにこれらのブランチは似た名前を持っていて、それは、リモートの`master`ブランチとローカルの`master`ブランチを繋ぐ論理的な意味を成すかもしれません。しかし、リモートトラッキングの関係が、次のような2つの手順を明確にしています:",
            "",
            "* プルの実行時は、コミットを`o/master`上にダウンロードし、`master`ブランチにそれを*マージ*します。マージの暗黙のターゲットは、リモートトラッキングの関係によって決められます。",
            "* プッシュの実行時は、`master`ブランチの作業はリモートの`master`ブランチ（ローカルでは`o/master`によって表現されています）にプッシュされます。プッシュ動作の決定は、`master`と`o/master`のリモートトラッキングな関係から決定されます。",
            ""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## リモートトラッキング",
            "",
            "かいつまんでは、`master`と`o/master`の関係は、単にそれぞれのブランチの\"remote traking\"というプロパティによって説召されます。`master`ブランチには`o/master`を追跡しているというように設定されているのです。これは、`master`ブランチのための暗黙のプッシュ先と暗黙の取り込み先が存在することを意味します。",
            "",
            "あなたは特に何も指定せずにコマンドを走らせていたのに、`master`ブランチにこのプロパティが設定されていたことに疑問を持つかもしれません。そう、gitによってリポジトリを複製した時、gitは実はこのプロパティを自動的に設定してくれるのです。",
            "",
            "クローンしている間、gitはリモートブランチをリモートのブランチ全てに対して作ります（例えば、`o/master`のような感じです）。その後、現在アクティブなブランチを追跡するローカルブランチを作成します。多くの場合それは`master`ブランチになります。",
            "",
            "gitのクローンが完了した時、あなたの手にはたった一つだけローカルブランチがあります（なので、閉口しないでも大丈夫です）。しかし、あなたは全てのリモートのブランチ同士の違いを見ることができるのです（もし、あなたがそれについて非常に好奇心旺盛であるときはいつでもね！）。これは、両方の世界にとってベストです！",
            "",
            "これはクローン中に次のようなコマンド出力が表示されることも説明します:",
            "",
            "    local branch \"master\" set to track remote branch \"o/master\""
          ]
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 私は自分でトラッキングを設定できますか？",
            "",
            "はい、できます！あなたは、全てのブランチについて`o/master`との追跡を設定でき、もしそうした時は、同じ暗黙のプッシュ先と取り込み先を`master`として設定します。これは、例えば`tottallyNotMaster`という名前のブランチで`git push`を走らせ、作業をリモートの`master`ブランチにプッシュするといったことができるということを意味しています！",
            "",
            "このプロパティを設定するには2つの方法があります。一つ目は、リモートブランチのリファレンスを使用して新しいブランチをチェックアウトするというものです。例えば次のコマンドを走らせてます",
            "",
            "`git checkout -b totallyNotMaster o/master`",
            "",
            "これは`totallyNotMaster`という名前のブランチを新しく作り、`o/master`への追跡プロパティを設定します。"
          ]
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "説明は十分でしょう、デモを見ていきましょう！`foo`という名前の新しいブランチをチェックアウトし、リモートの`master`への追跡プロパティを設定してみます。"
          ],
          "afterMarkdowns": [
            "私たちは暗黙の取り込み先である`o/master`を使って、`foo`ブランチを更新します。`master`は更新されないことに注意してください！！"
          ],
          "command": "git checkout -b foo o/master; git pull",
          "beforeCommand": "git clone; git fakeTeamwork"
        }
      },
      {
        "type": "GitDemonstrationView",
        "options": {
          "beforeMarkdowns": [
            "これは`git push`にも適用されます"
          ],
          "afterMarkdowns": [
            "わーお。全く違う名前がつけられているブランチですが、リモートの`master`に私たちの作業をプッシュできました。"
          ],
          "command": "git checkout -b foo o/master; git commit; git push",
          "beforeCommand": "git clone"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "### 二番目の方法",
            "",
            "ブランチのリモートトラッキングを設定するもう一つの方法は、単に`git branch -u`オプションを使うというものです。例えば以下のようにです",
            "",
            "`git branch -u o/master foo`",
            "",
            "これは、`foo`ブランチを`o/master`を追跡するように設定します。もし、`foo`が現在チェックアウトしているブランチだった場合、以下のように省略することができます:",
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
            "実際に素早く、もう一つの方法でリモートトラッキングを指定する様子を見てみましょう..."
          ],
          "afterMarkdowns": [
            "前回と一緒で、より明示的なコマンドですね。とてもいい感じです！"
          ],
          "command": "git branch -u o/master foo; git commit; git push",
          "beforeCommand": "git clone; git checkout -b foo"
        }
      },
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "OK！このレベルでは、ローカルで`master`にチェックアウトしていない状態で、リモートの`master`ブランチに作業をプッシュしてみましょう。これは高度な課題ですから、理解するのに少し時間をおく必要があると言っておきます:P"
          ]
        }
      }
    ]
  },
  "sequence-intro-display": "まずはここから",
  "sequence-intro-about": "gitの基本的なコマンド群をほどよいペースで学ぶ",
  "sequence-rampup-display": "次のレベルに進もう",
  "sequence-rampup-about": "更にgitの素晴らしさを堪能しよう",
  "sequence-remote-display": "Push及びPullコマンド -- Gitリモート",
  "sequence-remote-about": "自分のコードをより広く公開しましょう",
  "sequence-remote-advanced-display": "\"origin\"とその先へ -- Gitリモート上級編",
  "sequence-remote-advanced-about": "絶えず上級者の仕事は存在する。。。",
  "sequence-move-display": "コードの移動",
  "sequence-move-about": "話題のrebaseってどんなものだろう？って人にオススメ",
  "sequence-mixed-display": "様々なtips",
  "sequence-mixed-about": "gitを使う上での様々なtipsやテクニックなど",
  "sequence-advanced-display": "上級トピック",
  "sequence-advanced-about": "勇気ある人のみ！",
  "dialogs-confirm": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## どうしても正解がみたいですか?",
          "",
          "頑張れ頑張れできるできる絶対できる頑張れもっとやれるって",
          "",
          "やれる気持ちの問題だ頑張れ頑張れそこだ！",
          "",
          "そこで諦めるな絶対に頑張れ積極的にポジティブに頑張る頑張る",
          "",
          "北京だって頑張ってるんだから！"
        ]
      }
    }
  ],
  "dialogs-level-builder": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Levelエディタへようこそ!",
          "",
          "ここでは、以下の主にステップを踏みます:",
          "",
          "  * Gitコマンドで初期設定をします",
          "  * ```define start```で開始時のコミットツリーを定義します",
          "  * 一連のGitコマンドの（最適な）解答を入力します",
          "  * ```define goal```でゴールのコミットツリーを定義します（ゴールを定義するということは、解答を定義するということでもあります）",
          "  * オプションで```define hint```でヒントを定義します",
          "  * ```define name```で名前を編集します",
          "  * オプションで```edit dialog```で良い感じに開始時のダイアログを定義します",
          "  * ```finish```コマンドを打つことであなたのlevelがJSONで出力されます",
          "",
          "*Note: このダイアログは`help builder`で何回でも表示できます！活用してください！*"
        ]
      }
    }
  ],
  "dialogs-next-level": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## 完成!",
          "",
          "あなたは*{numCommands}*回のコマンドでこの課題をクリアしました; ",
          "模範解答では{best}回です。",
          "",
          "模範解答は、右下の`?`メニューの`Solution`から見ることができます。"
        ]
      }
    }
  ],
  "dialogs-sandbox": [
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## Learn Git Branchingへようこそ",
          "",
          "gitのパワフルなブランチ機能のコンセプトが ",
          "学びやすくなるようにこのアプリケーションを作りました。 ",
          "このアプリケーションを楽しんで使って頂いて、 ",
          "何かを学習して頂けたなら嬉しいです。",
          "",
          "# とりあえず触ってみたい方へ：",
          "",
          "簡単なデモを用意してあるので、もしよければこちらもご覧ください：",
          "",
          "[https://pcottle.github.io/learnGitBranching/?demo](https://pcottle.github.io/learnGitBranching/?demo&locale=ja)",
          "",
          "このダイアログ自体を省略するには、以下のようにURLの末尾にクエリストリング`?NODEMO`を付加してアクセスしてください。",
          "",
          "[https://pcottle.github.io/learnGitBranching/?NODEMO](https://pcottle.github.io/learnGitBranching/?NODEMO&locale=ja)"
        ]
      }
    },
    {
      "type": "ModalAlert",
      "options": {
        "markdowns": [
          "## ここで学べるGitのオペレーション",
          "",
          "ここでは、下記の種類のgitコマンドを学ぶことができます。",
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
          "## 学習した内容を共有できます",
          "",
          "画面左のコマンドプロンプトから`export tree`や`import tree`とタイプすることで、gitのツリー構造を友達に送ることができます",
          "",
          "何か教材になるようなケースはご存知ないでしょうか。`build level`で課題を作成したり、`import level`で他の人の課題に挑戦してみてください。",
          "",
          "何か詰まったことがあったら、右下メニューの?ボタンを押してみてください",
          "",
          "それから、不自然な記号が出てきたときは顔を左方向に傾けてみるといいかもしれません :P（ペロッ）",
          "",
          "それでは教材の選択画面に進んでみることにします。",
          "",
          "（なお、日本語版製作者のフォークサイトは[こちら](https://remore.github.io/learnGitBranching-ja/)になります。）"
        ]
      }
    }
  ],
  "finish-dialog-finished": "最後のレベルをクリアしました！すごい！！",
  "finish-dialog-next": "次の章 *\"{nextLevel}\"* へ進みますか？",
  "finish-dialog-win": "素晴らしい！このレベルをクリアしましたね",
  "finish-dialog-lose": "模範解答の回数={best}回でクリアする方法も考えてみましょう :D",
  "learn-git-branching": "日本語版リポジトリ",
  "show-goal-button": "ゴールを表示",
  "hide-goal-button": "ゴールを隠す",
  "goal-to-reach": "到達目標",
  "goal-only-master": "<span class=\"fwber\">Note:</span> masterブランチだけをこのlevelではチェックします。その他のブランチ（以下では、破線で示されています）に関しては、参照のためにあります。また、いつでもこのウィンドウは\"hide goal\"と打つかクリックで閉じれます",
  "hide-goal": "このウィンドウは\"hide goal\"と打つかクリックで閉じれます",
  "hide-start": "このウィンドウは\"hide start\"かクリックで閉じれます",
  "level-builder": "Levelエディタ",
  "no-start-dialog": "このLevelにはスタートダイアログが存在しません",
  "no-hint": "あらら、このLevelでは、残念ながらヒントが存在しません :-/",
  "error-untranslated-key": "{key}の翻訳がまだ存在しません :( GitHubでの、翻訳の協力をお願いします m(_)m",
  "error-untranslated": "このダイアログ、またはテキストの翻訳がまだ存在しません :( GitHubでの、翻訳の協力をお願いします m(_)m"
};
