---
title: Macはデフォルトでtreeコマンド使えなかったので導入した(treeコマンドの概要)
tags:
  - Mac
  - CLI
  - コマンド
  - tree
private: false
updated_at: '2025-04-20T23:15:49+09:00'
id: 0fbe72cd6a38add7b83c
organization_url_name: rits-rcc
slide: false
ignorePublish: false
scheduled_at: null
---
macで何気なく`tree`コマンドを入力したらこんなことが返ってきた．
```bash
$ tree
```
```
zsh: command not found: tree
```
ないよって言われてしまった．どうやらデフォルトでは`tree`コマンドは存在しないみたいだ．
Windowsではデフォルトで使えたはずだと思うが...


# そもそもtreeコマンドとは
ディレクトリとその中のファイルをツリー状に表示するコマンドラインツール
こんな感じでディレクトリやファイル構造を出力してくれる
```
.
├── ディレクトリ1
│   ├── ファイル1
│   └── ファイル2
└── ディレクトリ2
    └── ファイル3
```
# どのような時に使うの？
1. **プロジェクトの構造の理解**
新しいプロジェクトに取り組む際や，既存のプロジェクトの構造を迅速に把握する必要がある時に，tree コマンドを使うと，どのようなディレクトリやファイルが存在しているか一目でわかる．

2. **ドキュメント作成**
プロジェクトのドキュメントや報告書を作成する際に，プロジェクトのディレクトリ構造を説明するために，tree コマンドの出力を利用することができる．例えばQiitaを書いたり，社内Wikiを書いたり，プルリクエスト送る際に有効である．

3. **バージョン管理の整理**
バージョン管理システム（例えば Git）を使用している場合，プロジェクトのディレクトリ構造を定期的に確認し，不要なファイルやディレクトリがトラッキングされていないか確認するのに tree コマンドが使える．これにより，リポジトリの整理を助け、誤ってファイルが追加されるのを防げる．

# treeコマンドを使えるようにする
macの場合homebrewがプリインストールされているはずなので以下のコマンドを入力して`tree`をインストールする．
```bash
brew install tree
```
これだけで使えるようになる．



# 実際の使用例
こんなディレクトリ構造だったとしよう
![スクリーンショット 2024-06-15 11.55.23.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/6398b30f-92f4-8c13-fc6e-2114a37824c3.png)
![スクリーンショット 2024-06-15 11.55.15.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/62beb545-d664-d32d-1fd2-a34482a14787.png)


:::note info
Macでは，`.`から始まるディレクトリやファイルは隠しファイルで通常の状態だと見ることができない
`cmd`+`shift`+`.`を同時に押すと表示，非表示ができる
:::




## tree
デフォルトの使い方．これだけでツリー状に出力してくれる．
```
tree
```
```
.
├── README.md
└── project
    ├── file1.txt
    └── src
        └── code.cpp
2 directories, 3 files
```

## tree -C
(対応していれば)ツリー状の出力に対してディレクトリやファイルに色をつけてくれる
```bash
tree -C
```
![スクリーンショット 2024-06-15 19.47.40.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/67a9b9a9-9a89-8c94-a6fc-0bb244d0a9ea.png)




## tree -a 
隠しファイル，隠しディレクトリも含めてツリー状に出力する．
```bash
tree -a
```

```
.
├── .DS_Store
├── .hiddendir
│   ├── .hiddenfile
│   └── file2.txt
├── README.md
└── project
    ├── .hidden.txt
    ├── file1.txt
    └── src
        └── code.cpp
```

## tree -d
ディレクトリのみツリー状に出力する
```bash
tree -d
```

```
.
└── project
    └── src

3 directories
```

## tree -L
ディレクトリの深さを制限してツリー状に出力する
```bash md:L=1の時
tree -L 1
```

```
.
├── README.md
└── project
```
## tree -f
各ファイルとディレクトリのフルパスをツリー状に表示する
```bash
tree -f
```

```
tree -f
.
├── ./README.md
└── ./project
    ├── ./project/file1.txt
    └── ./project/src
        └── ./project/src/code.cpp

3 directories, 3 files
```
# treeコマンドのオプションを組み合わせよう
このオプションを以下のように組み合わせて使えば隠しファイルも含めたすべてのファイルとディレクトリをフルパスで表示させられる．
```bash
tree -a -f
```
```
.
├── ./.DS_Store
├── ./.hiddendir
│   ├── ./.hiddendir/.hiddenfile
│   └── ./.hiddendir/file2.txt
├── ./README.md
└── ./project
    ├── ./project/.hidden.txt
    ├── ./project/file1.txt
    └── ./project/src
        └── ./project/src/code.cpp

4 directories, 7 files
```
このように使用することができる．
