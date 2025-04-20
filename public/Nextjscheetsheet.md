---
title: Next.jsチートシート[プログラミングしたことがない人むけのHTML/CSS/JSから始めるReact・Next・Vercelの手引]
tags:
  - 'HTML'
  - 'TypeScript'
  - 'JavaScript'
  - 'React'
  - 'Next.js'
private: false
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---
皆さんフロントエンドはなんのフレームワーク・ライブラリで開発していますか？本記事ではこれからフロント開発をしようという方が初めてWeb開発に触れる際に必要な情報を体系的に整理し, スムーズに学習を進めるための指針を示すことを目的とします．
本記事においてはHTML, CSS, JavaScriptを用いた基本的なWebページの作成から, その後TypeScript, React, Next.jsを活用したモダンなWebアプリケーションの構築に至るまでの一連の流れを解説します, 最終成果物としてはVercelにデプロイされた実際に動作するWebアプリケーションが得られる構成となっています．

# 1. はじめに
この記事を進めるためには以下のツールおよび環境の整備が必要である.

## 1.1 コードを書くための環境を構築する
まずソースコードを書くための開発環境をセットアップする．ちなみにWebアプリ開発は**コードエディタ**と**ブラウザ**があればできるので, それらを用意するだけでOK． 具体的には以下のツールをインストールすることで, 開発環境が整う.

### コードエディタ/IDE(統合開発環境)（VSCodeなど)

:::note info
**IDE(Integrated Development Environment 統合開発環境)**とは
プログラミングに必要な機能を統合したソフトウェアである, コードエディタに加えて, デバッガやビルドツールなどが組み込まれているため, 開発効率が向上する.
:::

現代のWeb開発においてはVisual Studio Codeが広く使用されている. VSCodeの公式サイト (https://code.visualstudio.com/download) から最新版をダウンロードし, インストーラの指示に従ってインストールする, 
インストール後, VSCodeを起動し, 必要な拡張機能をインストールすることで, より快適な開発環境を整えることができる． 例えば, ESLintやPrettierなどの拡張機能を導入することで, コードの品質を保ちながら開発を進めることが可能である.

### ブラウザ（Chromeなど）
Webアプリ開発なので作成したWebアプリを表示するWebブラウザは必須だ．
最新版のGoogle Chromeを使用することが推奨される, Chromeの公式サイト (https://www.google.com/intl/ja_jp/chrome/) からインストールし, 開発者ツールを活用することで, HTML, CSS, JavaScriptの挙動を確認することが可能である.

---
ここからはあったら便利なツールを紹介する．homebrew(linux/mac向け)とGit/Githubとdockerだ．

### HomeBrew(macOS/Linux向け)
macOS（またはLinux）用パッケージマネージャーである．homebrewはソフトウェアパッケージのインストール作業を一元管理するツールである．ソフトウェア開発(Web開発)ではライブラリやパッケージやフレームワーク(他の人が作った便利なツールやお助け機能だと思ってください)と呼ばれるものがあると簡単に作れます．

> もちろんライブラリやパッケージやフレームワークがなくても開発はできますよ...結構(おそらく，多分，十中八苦)しんどいですが...

別にパッケージは個別に管理することもできます...しかし，パッケージのバージョンや他のパッケージとの関係を全て自分で管理するのは大変ですよね？
Homebrewを使うことで，バージョンの依存関係を自動的に管理し，最新の状態に保つことができます．

[HomeBrew](https://brew.sh/ja/)は以下のコマンドをターミナルで実行すれば大丈夫です．
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
:::note info
**ターミナルとは？**
コマンドラインを使ってOSと直接対話するためのアプリケーションです．macOSの場合，デフォルトで提供されている Terminal.app を利用して，各種コマンドの実行，スクリプトの実行やシステム管理などを行うことができます．
そもそもパソコンはこのターミナルのみで動きます．それにGUIと呼ばれる視覚的に操作できる部分が追加されたのです．GUIで操作しているさまざまなことは裏でコマンドが実行されているのにすぎません．
:::
今後このターミナルを使って操作することはいっぱいあるのでターミナルとは仲良くしておきましょう．
Windowsの方は以下ターミナルと呼んでいる部分を**コマンドプロンプト/Windows PowerShell**と読み替えてください．


### Git および GitHubアカウントの作成および設定
Git は， 分散型バージョン管理システム（DVCS：Distributed version control system） の一つであり、ソフトウェア開発におけるソースコードの変更を追跡および管理するために広く使用されている．個人の開発からオープンソースプロジェクト、大規模な商用プロジェクトまで、あらゆる規模のソフトウェア開発で使用されている．また、GitHubやBitbucketなどのホスティングサービスと連携することで、リモートリポジトリの管理やコラボレーションがより便利になる．
:::note info
**バージョン管理システム（VCS: Version Control System)とは**
ファイルやプロジェクトの変更履歴を記録，追跡，および管理するためのソフトウェアツール．
初めて聞く人はソースコードを保存したりバージョンを管理するものだと思ってください．

> まあ噛み砕いて言えば開発時に色々な機能を実装すると思うが，ある機能が実装できて，新しいバージョンにしたいとき，変更をしたバージョンでのソースコードを保存でき，いつでもそのバージョンに戻せたり，他の人と共同作業するときにデータに整合性を保つこと(つまり，保存された履歴や変更内容が改ざんされていないことを保証すること)ができるということ
:::

詳しくはこっちの記事に色々書いてるんで一旦よんでおくといいですよ．

https://qiita.com/JavaLangRuntimeException/items/6b46551f56e0def76eba

Gitは公式サイト (https://git-scm.com/downloads) からダウンロードおよびインストールする． インストール後, ターミナルを開き以下のコマンドを実行してユーザー情報を設定する．
```bash
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメールアドレス"
```
Gitがあればローカル(あなたのパソコン)ではソースコードを管理できますが，それをインターネット上で管理したり，他の人とあなたが書いたソースコードを一緒に管理できないです．そもそもソフトウェアは1人で開発するケースが少ないです．また自分が作成したソースコードを他の人に見てもらう場合もあるのでGitHubを使うことをお勧めします．
GitHubはオンラインでリポジトリを管理するためのサービス． https://github.com/ にアクセスして無料のアカウントを作成し, ローカルのGitリポジトリと連携させることで, コードのバージョン管理および共同作業が効率化されます.

またGithubはターミナルで操作することもできます．HomeBrewをインストールすると以下のコマンドで導入することができます．
```bash
brew install gh
```
その後，githubCLIにログインする
```bash
gh auth login 
```
`GitHub.com`か`GitHub Enterprise Server`かを選択する．個人利用なら`GitHub.com`を選択すれば良い，
```bash
? What account do you want to log into?  [Use arrows to move, type to filter]
> GitHub.com
  GitHub Enterprise Server
```

`HTTPS`か`SSH`を選択する．よくわからない人は`HTTPS`でいいと思います．
```bash
? What is your preferred protocol for Git operations on this host?  [Use arrows to move, type to filter]
> HTTPS
  SSH
```
`Y`と入力してEnter
```bash
? Authenticate Git with your GitHub credentials? (Y/n)
```
`Login with a web browser`で良いと思う．ブラウザでgithubへログインすることになる．
```bash
? How would you like to authenticate GitHub CLI?  [Use arrows to move, type to filter]
> Login with a web browser
  Paste an authentication token
```
その後，以下のように表示されるのでone-time codeを控えておく．

:::note info
0000-0000は英数字で表示され，ユーザ，タイミングによって異なる値である．
:::

```bash
! First copy your one-time code: 0000-0000
Press Enter to open github.com in your browser...
```
web上でone-time codeを入力し，githubにログインすると以下のように表示される．

```bash
✓ Authentication complete.
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as <githubアカウント名>
```

### Node.js および npm の基本設定
Node.jsはJavaScriptの実行環境であり, npmはパッケージ管理ツールである, Node.jsの公式サイト (https://nodejs.org/) からLTS版をダウンロードし, インストールする．インストール後, ターミナルで以下のコマンドを実行して動作確認を行う．
macosやlinuxでは以下のコマンドを実行することでnode.jsとnpmのバージョン管理を行うことができるパッケージである`nodebrew`をインストールすることができる．`nodebrew`はnode.js(npm)のバージョン管理ツール」である．
開発プロダクトによって使用されているnodeのバージョンが違うことはよくあるため、作業ごとにnodeのバージョンを切り替えなければいけないことがあります．
その際に便利なのがこの`nodebrew`で，コマンドで特定のバージョンのインストールや，バージョンの切り替えができるようになります
```bash
brew install nodebrew
```
インストールが完了したら以下のコマンドでセットアップをしよう
```bash
nodebrew setup
```
`nodebrew`のインストールが完了したら以下のコマンドでパスを通す．
```bash
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

:::note warn
使っているシェルが`bash`でない場合は, `~/.zshrc`や`~/.bash_profile`などにパスを通す必要があるので注意してください．
:::

以下のコマンドで最新版のnodeをインストールする．
```bash
nodebrew install latest
```

インストールした最新版のnodeをしようできるようにする
```bash
nodebrew use latest
```

nodeとnpmがインストールができたか以下のコマンドで確認する．バージョンが出力されればOK．エラーならインストールに問題がある．

> `-v`はバージョンを表示するオプションである．他のパッケージやライブラリのコマンドでも`-v`をつけるとバージョンの確認ができる(= インストールできたかが確認できる)

```bash
node -v 
npm -v
```

:::note info
**npmとは？**
Node.jsのパッケージ管理ツールであり, JavaScriptのライブラリやフレームワークを簡単にインストール, アップデート, アンインストールすることができる．npmを使用することで, プロジェクトに必要な依存関係を簡単に管理することができる．
npmはNode.jsと一緒にインストールされるため, Node.jsをインストールすることで自動的にnpmもインストールされる．
:::


これらのコマンドによりバージョン情報が表示されれば, 正常にセットアップが完了している． 今後はnpmを用いて必要なライブラリやフレームワークの導入を行う.(npmでインストールする方法は他の見出しで紹介します)

以上の環境設定が整えば, 本記事の各部で解説する内容を実践する準備が完了する.ここからはどんどん開発していこう．

## 2.1 HTML入門

### 2.1.1 HTMLの歴史と役割

HTMLは、World Wide Webの構造を定義するために生まれたマークアップ言語である。初期から進化を続け、現在では多くのタグが用意され、Web全体の骨格を作成する根幹技術として利用されるである。HTMLによって、文書の意味や構造を正しく表現することが可能となるである。

### 2.1.2 HTML文書の基本構造

HTML文書は、必ずDOCTYPE宣言で始まり、htmlタグで全体を囲む構造を持つである。headタグには文書のメタ情報（文字コード、タイトル、外部リソースのリンクなど）が含まれ、bodyタグは実際にユーザーに表示する内容を記述する部分である。基本的なHTML文書の構造例は以下の通りである：

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>シンプルなHTMLページ</title>
      </head>
      <body>
        <h1>ようこそWebの世界へ</h1>
        <p>これは基本的なHTML文書の例である。</p>
      </body>
    </html>

### 2.1.3 主要なHTMLタグの使い方

HTMLでは、文章の意味に応じてさまざまなタグが用いられるである。
- **見出しタグ (h1〜h6):** 文書やセクションのタイトルを示す。
- **段落タグ (p):** 文章のまとまりを表現する。
- **リンクタグ (a):** 他のウェブページやリソースへ誘導する。
- **画像タグ (img):** Webページに画像を挿入する。
- **リストタグ (ul, ol, li):** 項目の羅列を作成する。
- **引用タグ (blockquote):** 引用文を強調する。

### 2.1.4 フォームとインタラクティブ要素

フォームはユーザーからの入力を受け取るために重要な役割を果たすである。
- **inputタグ:** テキストやパスワード、チェックボックスなど、さまざまな入力フィールドを生成する。
- **textareaタグ:** 複数行のテキスト入力を受け付ける。
- **selectタグ:** ドロップダウンリストを作成する。
- **buttonタグ:** クリック操作をトリガーするボタンを設置する。

簡単なフォームの例は以下の通りである：

    <form action="/submit" method="post">
      <label for="name">名前：</label>
      <input type="text" id="name" name="name">
      <br>
      <label for="comment">コメント：</label>
      <textarea id="comment" name="comment"></textarea>
      <br>
      <button type="submit">送信</button>
    </form>

### 2.1.5 練習課題: 自己紹介ページの作成

まずは、自己紹介ページを作成して、基本的なHTMLタグの使用方法を確認することが推奨されるである。自己紹介ページには、テキスト、画像、リンクなどを組み合わせ、下記のようなシンプルな構成にするとよいである：

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>自己紹介ページ</title>
      </head>
      <body>
        <h1>私の自己紹介</h1>
        <p>ここに簡単な自己紹介文を記述するである。</p>
        <img src="profile.jpg" alt="プロフィール画像">
        <p>詳細は<a href="https://example.com">こちら</a>を参照するである。</p>
      </body>
    </html>

---

## 2.2 CSS入門

### 2.2.1 CSSの基本概念と役割

CSSは、HTMLで作成された文書に対してスタイルやレイアウトを適用するための言語である。背景色、文字色、フォントサイズ、レイアウトなどの視覚的な指定を行い、ユーザーにとって魅力的なページを作るために利用されるである。

### 2.2.2 CSSの基本文法

CSSは、セレクタ、プロパティ、値の組み合わせによってスタイルを定義するである。セレクタは対象となるHTML要素を指定し、プロパティは変更したいスタイル事項、値はその具体的な設定内容を示すである。例えば、段落(p)の文字色とサイズを指定する場合、以下のように記述するである：

    p {
      color: blue;
      font-size: 16px;
    }

### 2.2.3 各種セレクタの使い分け

CSSにはいくつかのセレクタが存在するである。
- **タイプセレクタ:** 要素名をそのまま指定する。
- **クラスセレクタ:** 特定のクラス属性を持つ要素を対象とする。
- **IDセレクタ:** 一意のIDを持つ要素を対象とする。
- **属性セレクタ:** 属性や属性値に基づいて要素を選択する。

正しく使い分けることで、効率的かつ柔軟なスタイルの適用が可能となるである。

### 2.2.4 カスケード、継承、特異性の理解

CSSのルールは、カスケードの原則に基づき、複数のルールが適用される場合に特異性や継承によって最終的なスタイルが決定されるである。たとえば、IDセレクタはクラスセレクタよりも高い特異性を持つため、同一要素に対する競合が発生した場合、IDセレクタのスタイルが優先されるである。

### 2.2.5 ボックスモデルの詳細

ボックスモデルは、各HTML要素が持つ以下の領域から構成されるである：
- **マージン:** 要素の外側の余白
- **ボーダー:** 要素の境界線
- **パディング:** コンテンツとボーダーの間の余白
- **コンテンツ領域:** 実際のテキストや画像が配置される部分

これらの関係を理解することで、正確なレイアウト調整が可能となるである。

### 2.2.6 レスポンシブデザイン入門

現代のWebサイトは、PC、タブレット、スマートフォンなど複数のデバイスに対応する必要があるである。レスポンシブデザインは、メディアクエリを用いることで、画面サイズに応じたスタイルを適用する技術である。  
例えば、画面幅が600px以下の場合に特定のスタイルを適用するCSSは以下のようになるである：

    .container {
      padding: 20px;
      background-color: #f0f0f0;
    }
    @media screen and (max-width: 600px) {
      .container {
        background-color: #e0e0e0;
      }
    }

### 2.2.7 練習課題: レスポンシブ ポートフォリオページの作成

レスポンシブデザインの理解を深めるため、初心者はデバイスに応じてレイアウトが変化するポートフォリオページの作成に挑戦することが推奨されるである。CSSのメディアクエリやボックスモデルの知識を実践的に確認する良い機会となるである。

---

## 2.3 JavaScript入門

### 2.3.1 JavaScriptの概要

JavaScriptは、HTMLやCSSと連携し、Webページに動的な動作やインタラクティブな機能を追加するためのプログラミング言語である。静的な文書に動作を与えることで、ユーザーエクスペリエンスを向上させる役割を果たすである。

### 2.3.2 基本文法とデータ型

JavaScriptでは、変数の宣言に「var」「let」「const」を用いるである。さらに、文字列、数値、真偽値、配列、オブジェクトなど多様なデータ型を扱うことができるである。簡単な例は次のとおりである：

    let name = "太郎";
    const age = 30;
    var isStudent = false;

### 2.3.3 演算子と制御構文

JavaScriptには、算術演算子、比較演算子、論理演算子が定義されており、if文、switch文、forやwhileループといった制御構文を使用して条件分岐や反復処理を行うである。以下はif文を用いた例である：

    let score = 85;
    if (score >= 90) {
      console.log("優秀である");
    } else if (score >= 75) {
      console.log("良好である");
    } else {
      console.log("改善が必要である");
    }

### 2.3.4 関数の定義と利用方法

関数は、特定の処理をまとめ、再利用可能なコードとして定義するために用いられるである。関数の定義には、通常の関数、無名関数、アロー関数といったさまざまな書き方が存在するである。下記はその例である：

    // 通常の関数定義
    function greet(name) {
      return "こんにちは、" + name + "である";
    }
    // アロー関数
    const greetArrow = (name) => {
      return "こんにちは、" + name + "である";
    };

### 2.3.5 DOM操作で動的コンテンツを生成

JavaScriptを使えば、HTMLのDOM (Document Object Model) を操作し、動的にコンテンツを生成または変更することが可能である。これにより、ユーザー操作に応じた画面更新やインタラクティブな機能の実現が可能となるである。以下は、ボタンのクリックによりメッセージが変更される例である：

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>ボタンクリック例</title>
        <script>
          function changeMessage() {
            var element = document.getElementById('message');
            element.textContent = 'ボタンがクリックされたである';
          }
        </script>
      </head>
      <body>
        <h1 id="message">初期メッセージ</h1>
        <button onclick="changeMessage()">クリックしてメッセージを変更</button>
      </body>
    </html>

### 2.3.6 練習課題: ボタンクリックでメッセージ変更するページの作成

JavaScriptの基本を理解するため、初心者はまずボタンクリックで表示が変わるシンプルなWebページを作成することが推奨されるである。実際にコードを書きながら、DOM操作やイベント処理の仕組みを体感することができるである。


