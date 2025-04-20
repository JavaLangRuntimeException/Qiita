---
title: git stash で作業を一時保存：ブランチ切り替えの際，変更差分が残っていて切り替えができない...なんてことないですか？
tags:
  - Git
  - GitHub
  - GitLab
private: false
updated_at: '2025-04-20T18:36:33+09:00'
id: d70dcfa530deaf519af1
organization_url_name: rits-rcc
slide: false
ignorePublish: false
scheduled_at: null
---
あるブランチで作業していて他のブランチに移動した際にせっかくした作業が消えてしまった（または、ブランチ移動できないというエラーが出る）ことはありませんか？
git stashというコマンドを用いるとそのような作業中の差分を一旦退避できます！

:::note info
**先に結論**
stashした後に変更を破棄してブランチを切り替えてその後stashしたものを適用する．という流れで変更差分が残っていてブランチ切り替えができる．
:::

gitそのものの概念やgitコマンドのチートシートはこちらから

https://qiita.com/JavaLangRuntimeException/items/6b46551f56e0def76eba

:::note info 
**git stashとは**
作業中の変更を一時的に保存し，後で再適用するためのGitコマンドである
:::

git stashは以下のような状況で特に有用である

- 作業中に緊急の修正が必要になった場合
- ブランチを切り替える前に現在の作業を保存したい場合
- プルする前に競合を避けたい場合



# 変更を一時保存する
```bash
git stash push
```
または、メッセージを付けて保存
```bash
git stash push "作業中の変更"
```

:::note warn
このコマンドはgitオブジェクトとして追跡済みの場合(addした場合など)のみstashする
:::

# 追跡外のファイル含めて変更を一時保存
```bash
git stash push -u
```
:::note info
追跡外のファイルを含めてstashする．addしていないファイルもstashしたい場合はこのコマンドを使う
:::

# 保存した変更（stash）の一覧を表示
```bash
git stash list
```

# 最新のstashを適用する
stashを適用とは作業ディレクトリにstash listに一時保存した状態を適用するということ．これをすると，最新のstashはstashリストから削除される
```bash
git stash pop
```

適用した後にコミットすれば作業ツリーに履歴が残る
```bash
git commit -m "コミットメッセージ"
```
:::note info
最新のstashを適用するが、stashリストからは削除しない
```bash
git stash apply
```
特定のstashを適用
```bash
git stash apply stash@{n}
```
ここで、nは`git stash list`で表示されるインデックス番号
:::

# 最新のstashの内容を確認
```bash
git stash show
```
より詳細な差分を見るには
```bash
git stash show -p
```
# 特定のstashを削除
```bash
git stash drop stash@{n}
```
# 全てのstashを削除
```bash
git stash clear
```

# 変更差分が残っている状態でブランチ切り替えをする
1.変更差分をstashする
```bash
git stash push -u
```
2.変更差分を破棄する
```bash
git restore .
```
3.ブランチを作成する
```bash
git switch -c <new-branchname>
```
4.最新のstashを適用
```bash
git stash apply
```


# stashの注意点
- stashはグローバルであり、全てのブランチで共有される
- 複数のstashを管理する場合は、わかりやすい名前を付けることが推奨される
- 長期間stashを放置すると、コンテキストを忘れる可能性があるため注意が必要

git stashを効果的に使用することで、作業の流れを中断することなく、柔軟にタスクを切り替えることができる。
