---
title: git add -i でコマンドラインと対話的にadd操作をしてみよう
tags:
  - Git
  - コマンドライン
  - バージョン管理
private: true
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---
Git を使ったバージョン管理において, ファイルをステージングエリアに追加する際によく使われるのが `git add` コマンドである. 通常, `git add ファイル名` や `git add .` のように使うが, より細かく制御したい場合には対話モード（interactive mode）を使用することができる. それが `git add -i` コマンドである.

変更するファイルが多い場合`git add .`コマンドを使いがちだと思うがこの場合git管理したくないファイルをコミットしてしまったりやくクレデンシャル情報を公開するなど予期せぬ問題が表示してしまうことがあるのであまり使用したくないコマンドである．

`git add -i` を使うと, どのファイルをステージングエリアに追加するか, またその一部だけを選択的に追加するかなどを対話的に決定できる. これにより, 意図しないファイルの変更をコミットから除外したり, 一つのファイル内の特定の変更のみをステージングしたりすることが可能になる.

## 主な機能

`git add -i` を実行すると, 以下のようなメニューが表示される:

```
*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
```

各コマンドの機能は以下のとおりである:

1. **status**: 現在のインデックスの状態を表示する
2. **update**: 変更のあるファイルをステージングエリアに追加する
3. **revert**: ステージングされた変更を元に戻す
4. **add untracked**: 未追跡のファイルをステージングエリアに追加する
5. **patch**: ファイル内の特定の変更（ハンク）のみを選択的に追加する
6. **diff**: HEADとインデックスの差分を表示する
7. **quit**: 対話モードを終了する
8. **help**: ヘルプを表示する

## 実践例

以下では, 実際に `git add -i` を使用する例を見ていこう.

### 未追跡ファイルの追加

まず, リポジトリに未追跡のファイルがある状態から始める:

```bash
❯ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        sample.txt
        sample2.txt

nothing added to commit but untracked files present (use "git add" to track)
```

`git add -i` を実行し, `4: add untracked` を選択すると, 未追跡のファイル一覧が表示される:

```bash
❯ git add -i

*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
What now> 4
           staged     unstaged path
  1: sample.txt
  2: sample2.txt
```

ここで追加したいファイルの番号を入力する. 複数のファイルを選択するには, それぞれの番号を順に入力する:

```bash
Add untracked>> 1
           staged     unstaged path
* 1: sample.txt
  2: sample2.txt
Add untracked>> 2
           staged     unstaged path
* 1: sample.txt
* 2: sample2.txt
Add untracked>>
added 2 paths
```

入力を完了するには, 何も入力せずにEnterキーを押す.

### ステージングされたファイルの確認

ファイルがステージングされたら, `1: status` コマンドで状態を確認できる:

```bash
*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
What now> 1
           staged     unstaged path
  1:        +0/-0      nothing sample.txt
  2:        +0/-0      nothing sample2.txt
```

### ステージングされたファイルの取り消し

ステージングしたファイルを取り消したい場合は, `3: revert` コマンドを使用する:

```bash
What now> 3
           staged     unstaged path
  1:        +0/-0      nothing sample.txt
  2:        +0/-0      nothing sample2.txt
Revert>> 1
           staged     unstaged path
* 1:        +0/-0      nothing sample.txt
  2:        +0/-0      nothing sample2.txt
Revert>> 2
           staged     unstaged path
* 1:        +0/-0      nothing sample.txt
* 2:        +0/-0      nothing sample2.txt
Revert>>
note: sample.txt is untracked now.
note: sample2.txt is untracked now.
reverted 2 paths
```

### update コマンドによる変更ファイルの追加

まず, `update` コマンドを使った例を見てみよう. この例では, `sample.txt` ファイルに以下のような変更を加えたとする:

```
// 元の内容
これは最初のコミットです.

// 変更後の内容
これは最初のコミットです.
これは2回目の変更です.
```

この状態で `git status` を実行すると以下のような出力が得られる:

```bash
❯ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   sample.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

次に `git add -i` を実行し, `2: update` コマンドを選択する:

```bash
❯ git add -i
           staged     unstaged path
  1:    unchanged        +1/-0 sample.txt

*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
What now> 2
           staged     unstaged path
  1:    unchanged        +1/-0 sample.txt
```

この表示は, `sample.txt` に1行の追加(`+1`)があり, 削除(`-0`)がないことを示している. ステージングするファイルの番号を入力する:

```bash
Update>> 1
           staged     unstaged path
* 1:    unchanged        +1/-0 sample.txt
Update>>
updated 1 path
```

入力を終了すると, ファイルがステージングされる. `1: status` コマンドでステージングの状態を確認できる:

```bash
What now> 1
           staged     unstaged path
  1:        +1/-0      nothing sample.txt
```

これにより, ファイル全体の変更がステージングされたことがわかる. `update` コマンドは, ファイル単位で変更をステージングするため, ファイル内の特定の変更だけをステージングすることはできない. そのような細かい制御が必要な場合は, 次に説明する `patch` コマンドを使用する.

### patch コマンドによる選択的な変更の追加

次に, より複雑な例として, `patch` コマンドを使った選択的なステージングを見てみよう. この例では, `sample.txt` ファイルに複数の変更を加えたとする:

```
// 元の内容
これは最初のコミットです.
これは2回目の変更です.

// 変更後の内容
これは最初のコミットです.
これは2回目の変更です.
これは3回目の変更です.
これは別の機能に関する変更です.
```

この例では, 3行目と4行目が別々の機能に関する変更であるとする. 3行目だけをステージングして先にコミットしたい場合, `5: patch` コマンドが役立つ.

`git add -i` を実行し, `5: patch` を選択する:

```bash
❯ git add -i
           staged     unstaged path
  1:    unchanged        +2/-0 sample.txt

*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
What now> 5
           staged     unstaged path
  1:    unchanged        +2/-0 sample.txt
Patch update>> 1
```

ファイル番号を入力すると, 変更箇所（ハンク）が表示され, それぞれについてステージングするかどうかを尋ねられる:

```
diff --git a/sample.txt b/sample.txt
index a5bce3f..25a4f99 100644
--- a/sample.txt
+++ b/sample.txt
@@ -1,2 +1,4 @@
 これは最初のコミットです.
 これは2回目の変更です.
+これは3回目の変更です.
+これは別の機能に関する変更です.
Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]?
```

ここで, ハンク全体をステージングするのではなく, 一部だけをステージングしたい場合は, `e` (edit) を入力する:

```
Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? e
```

すると, エディタが開き, ステージングしたくない行の先頭に `-` を付けることで, その行を除外できる:

```diff
 これは最初のコミットです.
 これは2回目の変更です.
+これは3回目の変更です.
-+これは別の機能に関する変更です.
```

この編集により, 「これは3回目の変更です.」という行だけがステージングされ, 「これは別の機能に関する変更です.」という行はステージングされない. 編集を保存して終了すると, 選択した変更だけがステージングされる:

```
❯ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   sample.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   sample.txt
```

この状態で `git diff --staged` を実行すると, ステージングされた変更だけを確認できる:

```bash
❯ git diff --staged
diff --git a/sample.txt b/sample.txt
index a5bce3f..8b16d9d 100644
--- a/sample.txt
+++ b/sample.txt
@@ -1,2 +1,3 @@
 これは最初のコミットです.
 これは2回目の変更です.
+これは3回目の変更です.
```

そして, `git diff` でステージングされていない変更も確認できる:

```bash
❯ git diff
diff --git a/sample.txt b/sample.txt
index 8b16d9d..25a4f99 100644
--- a/sample.txt
+++ b/sample.txt
@@ -1,3 +1,4 @@
 これは最初のコミットです.
 これは2回目の変更です.
 これは3回目の変更です.
+これは別の機能に関する変更です.
```

このように, `patch` コマンドを使用することで, 1つのファイル内の特定の変更だけを選択的にステージングすることができる. これにより, 関連する変更だけをまとめて論理的なコミットにすることが可能になり, バージョン管理の品質が向上する.

`git add -i` を使用する主なメリットは以下の通りである:

1. **選択的なステージング**: 変更の一部だけをコミットしたい場合に便利である
2. **視覚的な確認**: どのファイルがステージングされるかを視覚的に確認できる
3. **ミスの防止**: 意図しないファイルや変更がコミットされるのを防ぐことができる
4. **効率的なワークフロー**: 複数の関連しない変更を別々のコミットに分けることができる

`git add -i` は, Git の高度な機能の一つであり, より細かく制御されたバージョン管理を実現するためのツールである. 特に大規模なプロジェクトや, 複数の機能に同時に取り組んでいる場合に非常に有用である.

この対話モードを使いこなすことで, より整理されたコミット履歴を維持し, チームでの協業をスムーズにすることができる. 日常的なGit操作の中に `git add -i` を取り入れてみて, より効率的なバージョン管理を実現してみよう.

