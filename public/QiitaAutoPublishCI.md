---
title: QiitaCLIとGithubActionsを用いてローカル執筆環境とプルリクエストによる投稿自動化をしてみよう
tags:
  - qiita
  - qiitacli
  - githubactions
  - CI
private: false
updated_at: '2025-04-20T23:26:18+09:00'
id: 12c50c4533cd2a751dca
organization_url_name: null
slide: false
ignorePublish: false
---
みなさんQiita記事はQiitaのWebサイト上で書いていますか？実はQiita記事はローカルで環境構築をすればオフラインでも執筆できます！Qiita記事を作成する際に便利なツールであるQiitaCLIについて紹介します．また，gitでの管理方法や，GithubActionを用いた投稿や更新の自動化方法も記載します．
![スクリーンショット 2025-03-16 9.22.24.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/2544dbf6-f98d-4c29-be27-4f091e3eea29.png)
このようにQiita記事をマークダウンで書いた際のPreview機能が使えたり，ローカルで記事を管理できるので便利です．また，IDEにGitHubCopilotを導入していると記事の執筆がよりスムーズになります．他にもIDEで執筆するので執筆中の記事の文字列検索や自分の他の記事からの各種検索も可能です．
さらにgit管理をすれば記事のバックアップや履歴管理ができるので安心です．

> この記事もローカルで執筆してGitHubActionsを用いて自動投稿しています

今回の完成したディレクトリは以下のGithubを参照してください．

https://github.com/JavaLangRuntimeException/Qiita_AutoPublishCI

# QiitaCLIの導入
初めにQiita記事をローカルで執筆するためのQiitaCLIの導入方法を記載する．

:::note info
**QiitaCLIとは**
QiitaCLIはQiita記事をローカルで執筆するためのツールである．実はgit管理やActionsは不要でQiitaCLIのみで記事の投稿更新や取得が可能である
:::

ここからはnode.jsはインストール済みであること前提で話します．

Qiita記事をインストールするためのディレクトリの作成をする．
```bash
mkdir qiita
cd qiita
```

次にQiitaCLIをインストールする．
```bash
npm install @qiita/qiita-cli --save-dev
```

Qiita記事を執筆するためのディレクトリ構成を作成する．
```bash
npx qiita init
```

現状のQiita記事の取得やPreview機能を使用するためQiitaのアクセストークンを入力する
```bash
npx qiita login
```

現状のQiitaの記事を取得してディレクトリに反映させるには以下のコマンドを実行する．
```bash
npx qiita pull
```

最初に述べたこのPreview機能を使用するには以下のコマンドを実行する
```bash
npx qiita preview
```

以下のように`package.json`を修正するとQiitaCLIを任意のコマンドで使用できる．
```json
{
  "devDependencies": {
    "@qiita/qiita-cli": "^1.6.1"
  },
  "scripts": {
    "push": "qiita publish",
    "preview": "qiita preview",
    "pull": "qiita pull."
  }
}
```
例えば記事の取得なら以下のコマンドを実行する．
```bash
npm run pull
```
Preview機能を使用するなら以下のコマンドを実行する．
```bash
npm run preview
```
ちなみにPreview機能はブラウザで
http://localhost:8888 にアクセスすれば使用できる．

> 私の場合はIDEにブラウザを表示するプラグインを導入しています．

:::note info
QiitaのCredentialをこのディレクトリで使用したい場合は以下のコマンドでログインする
```bash
npx qiita login --credential .
```

そして`package.json`を以下のように書き換えればoK．(scripts名は好きにしていいですよ)
```json
{
  "devDependencies": {
    "@qiita/qiita-cli": "^1.6.1"
  },
  "scripts": {
    "push": "qiita publish --credential .",
    "preview": "qiita preview --credential .",
    "pull": "qiita pull --credential ."
  }
}
```

:::

これでQiita記事を書く準備はできました．
Qiita記事を書くには以下のコマンドで記事を作成できます．
```bash
npx qiita new [記事のファイルのベース名]
```
記事のファイルは`public/`のディレクトリで作成される．

> 記事の作成はコマンドでなくてもPreview上で作成もできます．
> `新規記事作成`を押せばいい．
> ![スクリーンショット 2025-03-16 9.22.24.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/2544dbf6-f98d-4c29-be27-4f091e3eea29.png)

記事が完成したら以下のコマンドまたはPreview上で`記事の公開`を押すことで記事を公開できる．
```bash
npx qiita publish [記事のファイルのベース名]
```

# gitでの管理
ここからはQiita記事をgitで管理する方法を記載する．gitで管理すると記事のバックアップや履歴管理ができるので安心です．また投稿も自動でできたり，スペルチェックも自動化できたりと執筆環境レベルが格段に上がります．

> gitコマンドやghコマンドが使えることを前提とします．

まず現在のディレクトリをgitリポジトリにする．
```bash
git init
```
GitHub上にリポジトリを作成する．プライベートリポジトリにしたいのならば`--private`にする．(もちろんGithub.com上で操作してもいいですよ)
```bash
gh repo create --public
```
リモートリポジトリをローカルリポジトリに紐づける．
```bash
git remote add origin [Github上に作成したリポジトリのURL(http or ssh)]
```
現在のディレクトリのファイルをステージングする．
```bash
git add .
```
ステージングしたファイルをコミットする．
```bash
git commit -m "initial commit"
```
masterブランチをpushする
```bash
git push origin master
```
これでgit管理ができるようになった．

# GithubActionを用いた投稿や更新の自動化
ここからはGithubActionを用いてQiita記事の投稿や更新を自動化する方法を記載する．git管理のみしても投稿の自動化はできないのでActionsを書く必要がある．

今回は以下の要件でActionsを書く
- featureブランチからmasterブランチにプルリクエストを作成したら差分のファイルのみ記事の公開をする
- 記事の公開が成功したらプルリクエストをマージする
- プルリクエストがOpenの時はfeatureブランチにpushすれ差分のファイルのみ記事の更新をする
- ローカルで作成した記事のidとupdated_atとcreated_atを更新する

> 公式さんが作成したActionsありましたが，カスタマイズしたかったのでQiita APIを叩くスクリプトとActionsを自前で用意しました．

QiitaAPIを叩くスクリプトの作成
```bash
mkdir scripts
cd scripts
touch qiita_sync.js
```
スクリプトの中身(qiita_sync.js)
```js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');
const { execSync } = require('child_process');

const QIITA_TOKEN = process.env.QIITA_TOKEN;
if (!QIITA_TOKEN) {
    console.error("Error: QIITA_TOKEN が設定されていません。");
    process.exit(1);
}

/**
 * ファイルを Qiita API 経由で更新または新規投稿する
 */
async function syncFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        const data = parsed.data || {};
        const content = parsed.content || "";

        // Qiita API では、タグ情報は { name: "...", versions: [] } の形式で送る必要があるので変換する
        const formattedTags = (data.tags || []).map(tag => {
            return (typeof tag === 'string') ? { name: tag, versions: [] } : tag;
        });

        // API リクエスト用のペイロード作成
        const payload = {
            body: content,
            private: false,
            tags: formattedTags,
            title: data.title || "Untitled"
        };

        let response;
        if (!data.id || data.id === null) {
            console.log(`新規投稿: ${filePath}`);
            // POST リクエスト → 新規記事作成
            response = await axios.post("https://qiita.com/api/v2/items", payload, {
                headers: {
                    "Authorization": `Bearer ${QIITA_TOKEN}`,
                    "Content-Type": "application/json"
                }
            });
            // 返却された記事情報でフロントマターを更新（id, created_at, updated_at）
            data.id = response.data.id;
            data.created_at = response.data.created_at;
            data.updated_at = response.data.updated_at;
        } else {
            console.log(`更新 (PATCH): ${filePath} (id: ${data.id})`);
            // PATCH リクエスト → 既存記事の更新
            const url = `https://qiita.com/api/v2/items/${data.id}`;
            response = await axios.patch(url, payload, {
                headers: {
                    "Authorization": `Bearer ${QIITA_TOKEN}`,
                    "Content-Type": "application/json"
                }
            });
            // 更新された情報 (updated_at) を反映
            data.updated_at = response.data.updated_at;
        }

        // 更新後のフロントマターと本文でファイルを書き換え
        const newContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`更新完了: ${filePath}`);
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(`Error processing ${filePath}:`, error.response.data);
        } else {
            console.error(`Error processing ${filePath}:`, error.message);
        }
        // エラーが発生したら強制終了して workflow を失敗させる
        process.exit(1);
    }
}

/**
 * master ブランチとの差分で変更があった ./public 配下の Markdown ファイルのみ対象にする
 */
async function processChangedFiles() {
    let diffOutput = "";
    try {
        // origin/master との比較で変更があったファイル一覧を取得
        diffOutput = execSync("git diff --name-only origin/master -- ./public").toString();
    } catch (error) {
        console.error("Error fetching changed files:", error.message);
        process.exit(1);
    }
    const changedFiles = diffOutput
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== "" && line.endsWith('.md'));

    if (changedFiles.length === 0) {
        console.log("更新対象の Markdown ファイルはありません。");
        return;
    }

    for (const file of changedFiles) {
        // パスが相対パスの場合、スクリプトの実行ディレクトリを考慮して調整
        const fullPath = path.resolve(file);
        await syncFile(fullPath);
    }
}

// 未捕捉例外および Promise の未処理拒否も検知してプロセスを終了する
process.on('uncaughtException', error => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
process.on('unhandledRejection', error => {
    console.error("Unhandled Rejection:", error);
    process.exit(1);
});

(async () => {
    try {
        await processChangedFiles();
        console.log("Qiita 同期処理が完了しました。");
    } catch (ex) {
        console.error("処理中にエラーが発生しました:", ex);
        process.exit(1);
    }
})();
```
このスクリプトは以下の処理を行う．
- ファイルの差分を取得して変更があったファイルのみQiita記事を更新または新規投稿する
- フロントマターのid, created_at, updated_atを更新する

上記のスクリプトを実行するActionsを作成する．Qiitaディレクトリの位置に移動してから以下のコマンドを実行してください．
```bash
mkdir .github
cd .github
mkdir workflows
cd workflows
touch publish.yml
```
```yaml
name: Publish and Sync Qiita Articles

on:
  pull_request:
    branches:
      - master

permissions:
  contents: write

jobs:
  qiita-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          ref: ${{ github.head_ref }}

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.16.0'

      - name: Install dependencies
        run: npm install

      - name: Run Qiita sync script
        env:
          QIITA_TOKEN: ${{ secrets.QIITA_TOKEN }}
        run: node scripts/qiita_sync.js

      - name: Commit and push diff
        env:
          COMMIT_MESSAGE: update by qiita_sync[bot]
        run: |
          git add ./public/*
          if ! git diff --staged --exit-code; then
            git config --global user.name 'github-actions[bot]'
            git config --global user.email '41898282+github-actions[bot]@users.noreply.github.com'
          
            echo "### 現在の差分 (git diff) ###"
            git diff --color || true
            echo "############################"
            echo "以下の変更内容をコミットします："
            git diff --color || true
            git commit -m "${COMMIT_MESSAGE}"
            echo "コミット完了．push を実行します..."
            git push origin HEAD:refs/heads/${{ github.head_ref }}
          else
            echo "更新対象のファイルはありません"
          fi
        shell: bash
```
このワークフローの内容は以下の通りである．
1. プルリクエストがmasterブランチに作成されたときに実行される
2. プルリクエストの差分のファイルのみチェックアウトする
3. Node.jsの環境をセットアップする
4. 依存関係をインストールする
5. Qiita記事の同期スクリプト(node_sync.js)を実行する
6. 差分のファイルをコミットしてプッシュする

フロントマターは以下のようになる．ちょうどこの記事のフロントマターはこの通り．tagsは**1つ以上5つまで**，**titleの入力忘れ**に注意してください．

> tagsはQiitaAPIの仕様でタグの最適化が行われます．
> qiita → Qiita
> qiitacli → QiitaCLI
> githubactions → GitHubActions
> となります．(ローカルでは変わりませんが)

```
title: QiitaCLIとGithubActionsを用いてローカル執筆環境とプルリクエストによる投稿自動化をしてみよう
tags:
  - qiita
  - qiitacli
  - githubactions
  - CI
private: false
updated_at: ''
id: 
organization_url_name: null
slide: false
ignorePublish: false
created_at: ''
```

---
これでQiita記事の執筆環境と記事のgit管理と記事の自動更新機能の作成が完了しました．オフラインでできる環境でQiita記事の執筆の効率化に使ってください．

# 実行方法
1. ローカルでブランチを作成する
2. public/ 以下にmdファイルを追加する
3. 記事を保存(git管理)したければ投稿したい記事をaddし，commit・pushをする
4. 記事が完成したら作成したブランチでPRを作成する(PRを作成すれば投稿されます)
5. PRを作成したブランチに対してpushすれば記事の更新がされます．
   (PR作成後のブランチに一度でもpushしてCIが回った場合は**次回の作業前に必ずpull**をしてください．Actions[bot]がcommitをしているからです)
6. 完全にOKならmasterにマージします．(masterにマージしてもしなくても何か自動で行われるものはありません)

今回の作成したディレクトリは以下のGithubを参照してください．

https://github.com/JavaLangRuntimeException/Qiita_AutoPublishCI
