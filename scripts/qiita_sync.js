const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');

const QIITA_TOKEN = process.env.QIITA_TOKEN;
if (!QIITA_TOKEN) {
    console.error("Error: QIITA_TOKEN が設定されていません。");
    process.exit(1);
}

// 公開記事のMarkdownファイルが置かれているディレクトリ (例: ./public)
const directoryPath = path.join(__dirname, '../public');

async function syncFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        const data = parsed.data || {};
        const content = parsed.content || "";

        // APIリクエストに使用するペイロードを作成
        // data.titleはtitle、data.tagsはtagsから取得する
        const payload = {
            body: content,
            private: false,
            tags: data.tags || [],
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
            // 返却された記事情報でフロントマターを更新
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

        // 更新されたフロントマターと本文でファイルを書き換え
        const newContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`更新完了: ${filePath}`);
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(`Error processing ${filePath}:`, error.response.data);
        } else {
            console.error(`Error processing ${filePath}:`, error.message);
        }
    }
}

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (fullPath.endsWith('.md')) {
            await syncFile(fullPath);
        }
    }
}

(async () => {
    try {
        await processDirectory(directoryPath);
        console.log("Qiita 同期処理が完了しました。");
    } catch (ex) {
        console.error("処理中にエラーが発生しました:", ex);
        process.exit(1);
    }
})();
