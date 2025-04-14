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


