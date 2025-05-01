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
 * Qiita API 経由で,新規投稿または更新を実施する
 */
async function syncFile(filePath) {
  try {
    console.log(`ファイル処理開始: ${filePath}`);

    // ファイルを読み込み、frontmatterとcontentを解析
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    const data = parsed.data || {};
    const content = parsed.content || "";

    // privateの値をログ出力して確認
    console.log(`${filePath} のprivate値: ${data.private}`);

    // タグ情報を Qiita API のフォーマットに変換する
    const formattedTags = (data.tags || []).map(tag =>
      typeof tag === 'string' ? { name: tag, versions: [] } : tag
    );

    // API リクエスト用ペイロード（frontmatter の private をそのまま利用）
    const payload = {
      body: content,
      private: data.private, // trueなら限定公開、falseなら公開
      tags: formattedTags,
      title: data.title || "Untitled"
    };

    console.log(`${filePath} のAPI送信設定: private=${payload.private}`);

    let response;
    if (!data.id) {
      console.log(`新規投稿: ${filePath}`);
      // POST で新規記事作成
      response = await axios.post("https://qiita.com/api/v2/items", payload, {
        headers: {
          "Authorization": `Bearer ${QIITA_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      // 発行された記事情報で frontmatter を更新（id,updated_at）
      data.id = response.data.id;
      data.updated_at = response.data.updated_at;
    } else {
      console.log(`更新 (PATCH): ${filePath} (id: ${data.id})`);
      // PATCH で既存記事の更新
      const url = `https://qiita.com/api/v2/items/${data.id}`;
      response = await axios.patch(url, payload, {
        headers: {
          "Authorization": `Bearer ${QIITA_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      data.updated_at = response.data.updated_at;
    }

    console.log(`Qiita APIレスポンス: ${response.status} - private=${response.data.private}`);

    // Qiitaから返却された情報でファイルを更新（必要に応じて）
    const newContent = matter.stringify(content, data);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`更新完了: ${filePath}`);
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(`Error processing ${filePath}:`, error.response.data);
    } else {
      console.error(`Error processing ${filePath}:`, error.message);
    }
    process.exit(1);
  }
}

/**
 * origin/main との差分で変更があった Markdown ファイルのみを対象にする
 */
async function processChangedFiles() {
  let diffOutput = "";
  try {
    // origin/main との比較で変更があったファイル一覧を取得
    diffOutput = execSync("git diff --name-only origin/main -- ./public").toString();
  } catch (error) {
    console.error("Error fetching changed files:", error.message);
    process.exit(1);
  }
  const changedFiles = diffOutput
      .split('\n')
      .map(line => line.trim())
      .filter(line =>
          line !== "" &&
          line.endsWith('.md')
      );

  if (changedFiles.length === 0) {
    console.log("更新対象の Markdown ファイルはありません。");
    return;
  }

  console.log(`処理対象ファイル: ${changedFiles.length}件`);

  for (const file of changedFiles) {
    // パスが相対パスの場合、スクリプトの実行ディレクトリを考慮して調整
    const fullPath = path.resolve(file);
    if (!fs.existsSync(fullPath)) {
      console.log(`ファイルが存在しません: ${fullPath} はスキップします。`);
      continue;
    }
    await syncFile(fullPath);
  }
}

processChangedFiles()
  .then(() => {
    console.log("Qiita API 同期処理が完了しました。");
  })
  .catch(ex => {
    console.error("処理中にエラーが発生しました:", ex);
    process.exit(1);
  });
