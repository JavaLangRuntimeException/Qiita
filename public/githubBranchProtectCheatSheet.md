---
title: github ブランチ保護ルール チートシート
tags:
  - git
  - github
private: false
updated_at: '2025-04-20T23:30:04+09:00'
id: 3e9791ea5a58da2f8b50
organization_url_name: null
slide: false
ignorePublish: false
---
みなさん共同開発においてmain(master)ブランチやdevelopブランチなどを保護することの重要性は知っていますか？developブランチにレビューなしに勝手にマージされることを防いだりもできます．
本記事では、リポジトリの安全性と一貫性を高めるために利用できる各種ブランチ保護ルールについて解説する．各ルールには固有の役割があり、単体での利用はもちろん複数のルールを組み合わせることで、より堅牢な開発プロセスを実現することができる．

# 他のチートシート
git/gh コマンド(gitコマンド以外にもgitの概念も書いてあります)

https://qiita.com/JavaLangRuntimeException/items/6b46551f56e0def76eba

lazygit

https://qiita.com/JavaLangRuntimeException/items/42087d09728d5739d73d

Docker コマンド(dockerコマンド以外にもdockerの概念の記事へのリンクもあります)

https://qiita.com/JavaLangRuntimeException/items/21f7c7bf3d143f821697

ステータスコード

https://qiita.com/JavaLangRuntimeException/items/ab1bc7b976ed2dfad91c

TypeScript

https://qiita.com/JavaLangRuntimeException/items/5894391c08e0d8e28389

Go/Gorm

https://qiita.com/JavaLangRuntimeException/items/d388717fc1436bc3ec9d

Ruby・Ruby on Rails

https://qiita.com/JavaLangRuntimeException/items/42d935cf92c212f1c7ec

C#/.NET/Unity

https://qiita.com/JavaLangRuntimeException/items/7849b32bc223d4aa0247

SQL

https://qiita.com/JavaLangRuntimeException/items/f038fbaccdd92fb0308a

Vim

https://qiita.com/JavaLangRuntimeException/items/0c68ab96ea198e0a7294

プルリクエスト・マークダウン記法チートシート

https://qiita.com/JavaLangRuntimeException/items/329eb92a47a07ff4dde8

ファイル操作コマンドチートシート

https://qiita.com/JavaLangRuntimeException/items/16f244606a73f7d106e4

VSCode Github Copilot拡張機能

https://qiita.com/JavaLangRuntimeException/items/be13dc3a346cf6e5ee44

OpenAI Assistants API

https://qiita.com/JavaLangRuntimeException/items/1a1abc01e8d7d05dce93

GitHub API

https://qiita.com/JavaLangRuntimeException/items/ab1bc7b976ed2dfad91c

変数・関数(メソッド)・クラス命名規則

https://qiita.com/JavaLangRuntimeException/items/b93865c448f69bcfca4a

# 他のシリーズ記事
**チートシート**
様々な言語，フレームワーク，ライブラリなど開発技術の使用方法，基本事項，応用事例を網羅し，手引書として記載したシリーズ

https://qiita.com/JavaLangRuntimeException/items/f038fbaccdd92fb0308a

> git/gh，lazygit，docker，vim，typescript，プルリクエスト/マークダウン，ステータスコード，ファイル操作，OpenAI AssistantsAPI，Ruby/Ruby on Rails のチートシートがあります．以下の記事に遷移した後，各種チートシートのリンクがあります.

**TypeScriptで学ぶプログラミングの世界**
プログラミング言語を根本的に理解するシリーズ

https://qiita.com/JavaLangRuntimeException/items/cadf49bb419076819963

**情報処理技術者試験合格への道 [IP・SG・FE・AP]**
情報処理技術者試験に出題されるコンピュータサイエンス用語の紹介や単語集

https://qiita.com/JavaLangRuntimeException/items/991be402099542ccb936

**IAM AWS User クラウドサービスをフル活用しよう！**
AWSのサービスを例にしてバックエンドとインフラ開発の手法を説明するシリーズです．

https://qiita.com/JavaLangRuntimeException/items/371a334f5a6e07035db5

**AWS UserのGCP浮気日記**
GCPの様子をAWSと比較して考えてみるシリーズ

https://qiita.com/JavaLangRuntimeException/items/527d99e774165a763180

**Project Gopher: Unlocking Go’s Secrets**
Go言語や標準ライブラリの深掘り調査レポート

https://qiita.com/JavaLangRuntimeException/items/dc45b412d3fbd2ccb9e8

**Gopher’s Journey: Exploring TCP Protocol**
Goを用いてTCPプロトコルを探求 & 作成するシリーズです．

https://qiita.com/JavaLangRuntimeException/items/38091220106d86651d2b

## Bypass権限
![スクリーンショット 2025-02-25 10.00.42.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/85e681f6-9875-4838-818f-bc25f7eda0fd.png)
ブランチ保護ルールを設定するにあたって，このルールから無視することができる権限，チーム，アプリケーションを指定できる．

## ブランチ保護ルールを指定するブランチの設定
![スクリーンショット 2025-02-25 10.05.08.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/bacd6e71-704c-4bba-865f-177817196ee8.png)

デフォルトブランチを指定したり(**include default branch**)，全てのブランチにしたり(**include all branches**)，パターン一致によってブランチを指定できる(**include by pattern**)．また，保護しないブランチをパターン一致で指定できる(**exclude by pattern**)．

## 各ブランチ保護ルールの説明とユースケース
![スクリーンショット 2025-02-25 9.38.24.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/0b3388ed-c31f-476b-adfd-cff42319c144.png)

### Restrict creations
ブランチの新規作成をbypass権限を持つユーザのみに限定するルールである．これにより、意図しないブランチの作成や不正なブランチの生成を防止することができる．

**ユースケース**:
本番環境に影響を及ぼす主要ブランチが誤って作成されるリスクを回避し、信頼された開発者のみが新規ブランチを作成できる環境を整える場合に有効である．

### Restrict updates
既存ブランチへの更新をbypass権限を持つユーザのみに限定するルールである．これにより、重要なリファレンスに対する不意の変更や悪意ある変更を防止することができる．

**ユースケース**:
プロダクションブランチへの直接コミットを防ぎ、全ての変更が事前にレビューされるワークフローを確保する際に適用される．

### Restrict deletions
ブランチの削除をbypass権限を持つユーザのみに限定する設定である．重要なブランチの誤削除や意図しない破壊行為を未然に防ぐために利用される．

**ユースケース**:
本番ブランチや長期間保守すべきブランチが誤って削除されないように管理するケースにおいて、リポジトリの安定性を維持するために導入される．

### Require linear history
マージコミットを禁止し、コミット履歴をリニア（一方向）に保つルールである．これにより、コミット履歴の追跡が容易になり、デバッグやリバート（元に戻す作業）がスムーズに行える．

**ユースケース**:
複雑なマージコミットが履歴を混乱させる問題を回避し、変更の履歴管理をシンプルに保ちたいプロジェクトで活用される．

### Require deployments to succeed
特定の環境へのデプロイが成功していない場合、ブランチへの更新を許可しないルールである．この仕組みにより、コードが本番に反映される前に十分な検証プロセスを経ることができる．

**ユースケース**:
ステージングやテスト環境でのデプロイ結果が成功しなければ、本番ブランチへの更新をブロックすることで、本番リリースの安全性を確保する場合に利用される．

### Require signed commits
各コミットに対して有効なデジタル署名が行われたことを必須とするルールである．これにより、コミットの真正性や信頼性が保証され、誰が変更を加えたかを明確にすることができる．

**ユースケース**:
セキュリティが厳しく要求されるプロジェクトにおいて、不正な変更が加えられるリスクを低減し、変更履歴の信頼性を担保する目的で採用される．

### Require a pull request before merging
直接のブランチへのコミットを禁止し、すべての変更をプルリクエストを通じて統合するルールである．このプロセスにより、コードレビューを必須化し、チーム全体の品質管理が促進される．

**ユースケース**: 複数のチームメンバーによるレビューを必須として、コードの品質と一貫性を高め、適切な議論が行われた上での統合を実現する場合に利用される．

![スクリーンショット 2025-02-25 9.53.08.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/247affe8-445e-49a6-b4a0-f29798000890.png)

#### Required approvals
プルリクエストがマージされる前に、設定された数の承認済みレビューが必須とされるルールである．この仕組みにより、複数の視点からコードの品質や整合性が確認されることが保証される。

**ユースケース**: 複数のエキスパートのレビューが必要な大規模プロジェクトで、重大な変更が加えられる前に必ず複数の承認を得ることで、コードの品質を確実に保持するために利用される。

:::note info
**Apploveとは？**
プルリクエストの内容に対してレビュワーが承認すること．以下のようにレビュワーはプルリクエストに対して**Approve**をする．
`File changed` → `Review Changes` → `Approve`
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/48c1c59f-5937-44a1-83b4-8fd41aea6a99.png)
:::

#### Dismiss stale pull request approvals when new commits are pushed
新たなレビュー対象となるコミットがプッシュされた際、以前の承認を自動的に無効化するルールである．これにより、最新の変更内容に対して最新のレビューが確実に反映されるように管理される。

**ユースケース**: プルリクエストに対して連続的に修正が加えられる場合に、古い承認が残らず、常に最新の状態でのレビューが行われることを保証するシナリオで有効である。

#### Require review from Code Owners
指定されたコードオーナーが存在するファイルに変更があった場合、そのコードオーナーによる承認が必須となるルールである．これにより、各領域の専門知識を有する担当者がコードの変更を確認し、最終責任を持つことができる。

**ユースケース**: 特定のモジュールや機能に関して、担当者やリードが明確に定められているプロジェクトで、該当部分に対する変更については必ず当該オーナーのレビューを受けるように設定する場合に適用される。

Code Ownersは以下のように`.github/CODEWONERS`に作成することで設定できる．複数人の設定も可能である．@の後にgithubアカウント名を指定する．
```md: .github/CODEWONERS
*       @githubAccountName1 @githubAccountName2 @hogehogeSanDesuYo
```

#### Require approval of the most recent reviewable push
最も新しいレビュー可能なプッシュに対して、変更を行った本人以外からの承認が必要であるルールである．これにより、最新の修正内容が客観的に評価され、内部バイアスの排除が図られる。

**ユースケース**:
直近の変更がプロジェクト全体に大きな影響を与える場合に、変更者以外の第三者によるチェックを必須とし、見落としや誤判断を防ぐために用いられる。

#### Require conversation resolution before merging
プルリクエスト内の全ての議論やレビューコメントが解決されるまで、マージを許可しないルールである．このポリシーは、未解決の疑問点や問題が残ったままコードが統合されることを防ぐ役割を果たす。

**ユースケース**:
複数の意見交換やディスカッションが必要な複雑な変更内容の場合に、全ての議論が解消されてからマージを行うことで、後のトラブルや認識齟齬を未然に防ぐために有効である。

#### Request pull request review from CopilotPreview
GitHub Copilotが利用可能な場合、プルリクエスト作成時に自動的にCopilotからのコードレビューを依頼する機能である．これにより、AIによる初期的なコード解析のフィードバックが得られ、レビューの補完が図られる。

**ユースケース**:
素早く初期チェックを実施したいプロジェクトや、手動レビューの前段階としてCopilotの意見を取り入れることで、潜在的な問題点の早期発見を目指す場合に適用される。

#### Allowed merge methods Preview
プルリクエストのマージ方法として、マージコミット、スカッシュ（1つのコミットに統合）、リベースなどの組み合わせが許可される設定である．少なくとも一つのマージ方式を有効にする必要があり、チームの運用方針に合わせた柔軟な履歴管理を実現する。

**ユースケース**:
プロジェクトの履歴整理や、各チームメンバーの開発スタイルに応じたマージ戦略を選択する場合に、適切なマージ手法を設定し、コミット履歴の分かりやすさと一貫性を保つために利用される。

### Require status checks to pass
自動テスト、静的解析などのステータスチェックが全て成功した場合にのみ、ブランチ更新を許可するルールである．これにより、テストで不具合が検出されたコードの混入を未然に防ぐことができる．

**ユースケース**:
各コミットがCI/CDパイプラインを経由して検証され、不備のあるコードが本番環境へプッシュされるのを防止するために使用される．

### Block force pushes
強制プッシュを全面的にブロックするルールである．これにより、誤操作や意図しないコミット履歴の改ざんが防がれ、常に正しい履歴が保持される．

**ユースケース**:
コードの変更履歴を厳密に管理する必要があるプロジェクトにおいて、思わぬトラブルや履歴の書き換えを防ぐために採用される．

### Require code scanning results
プッシュされる変更に対し、指定されたコードスキャンツールの結果が一定の基準を満たしていることを必須とするルールである．これにより、事前にコードの脆弱性や不具合を検出し、安全なコードの統合が実現される．

**ユースケース**:
セキュリティ強度が求められるプロジェクトにおいて、自動的なコード解析を通じて潜在的なリスクを排除し、コードベースの健全性を保つために利用される．

## 複数のルールを組み合わせたユースケース
上で説明したブランチ保護ルールを複数組み合わせたユースケースを説明する．

### エンタープライズ環境における安全なデプロイ
- Restrict creations
- Restrict updates
- Restrict deletions

大規模な組織で主要ブランチへの不正な変更を防止するためにブランチ操作を信頼されたユーザに限定する．

- Require a pull request before merging
- Require status checks to pass
- Require deployments to succeed

変更は必ずプルリクエストを通すことでコードレビューを実施する．さらに、マージには自動テストおよびデプロイ検証を強制する．

### オープンソースプロジェクトでの安全な統合フローの確立
- Require a pull request before merging
- Require signed commits

複数の外部コントリビュータが参加するプロジェクトでは、プルリクエスト(指定のブランチへの直接push)を必須とし、すべてのコミットに対して署名付きコミットを要求する．

- Require linear history
- Block force pushes

また、統一された履歴管理を維持し、不正な履歴の改ざんを防ぐためこれらのルールを組み合わせることで、共同作業における透明性とセキュリティを両立することが可能だ．

### 継続的デリバリー(CD)環境での自動検証の徹底
- Require status checks to pass
- Require deployments to succeed

新機能の頻繁なリリースを行う環境では、変更が本番環境に影響する前にテストやデプロイの自動検証を完了させる．

- Require code scanning results
- Require a pull request before merging

さらに、リスクの高いコード混入を防ぎ、必ずレビューを経ることで、安全かつ迅速なリリースを実現する．

### 小規模チームにおけるブランチ操作の厳格な管理
- Restrict creations
- Restrict updates
- Restrict deletions

限られたメンバーでプロジェクトを運営する際、意図しないブランチ作成や更新、削除を防ぐ．

- Block force pushes
- Require a pull request before merging

さらに、誤操作による履歴の混乱を避け、保護対象のブランチへの直接pushを禁止し，プルリクエストとレビューを必須とする．安定したバージョン管理と運用が実現されるユースケースである．

---
このように共同開発においてgithubのブランチ保護ルールを設定することで堅牢性のある開発プロセスを実現できる．
