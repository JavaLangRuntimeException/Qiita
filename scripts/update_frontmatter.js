const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

/**
 * 現在の JST タイムスタンプ（YYYY-MM-DDTHH:mm:ss+09:00 形式）を返す関数（※今回使用しません）
 */
function getJSTTimestamp() {
  const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+09:00`;
}

/**
 * scheduled_at の値（YYYY-MM-DD 形式または null）から、
 * 現在の JST 時刻と比較し、
 * ・scheduled_at が未来の日付、または本日で JST 午前9時以前なら true（非公開）
 * ・それ以外なら false（公開） を返す。
 *
 * @param {string|null} scheduledAtValue
 */
function computeDesiredPrivate(scheduledAtValue) {
  const nowJST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const nowYear = nowJST.getFullYear();
  const nowMonth = nowJST.getMonth() + 1;
  const nowDate = nowJST.getDate();
  const nowHour = nowJST.getHours();

  if (!scheduledAtValue) {
    return false;
  }

  const parts = scheduledAtValue.split('-').map(Number);
  if (parts.length !== 3) {
    console.error("Invalid scheduled_at format, expected YYYY-MM-DD. Received:", scheduledAtValue);
    return false;
  }
  const [year, month, day] = parts;

  if (year > nowYear) {
    return true;
  } else if (year < nowYear) {
    return false;
  } else {
    if (month > nowMonth) {
      return true;
    } else if (month < nowMonth) {
      return false;
    } else {
      if (day > nowDate) {
        return true;
      } else if (day < nowDate) {
        return false;
      } else {
        // scheduled_at が本日の場合、JST 午前9時以前なら非公開、9時以降なら公開
        return nowHour < 9;
      }
    }
  }
}

// scheduled_at.json のパス
const scheduledAtFile = path.resolve("scheduled_at.json");
let scheduledAtMapping = {};
if (fs.existsSync(scheduledAtFile)) {
  try {
    scheduledAtMapping = JSON.parse(fs.readFileSync(scheduledAtFile, 'utf8'));
  } catch (error) {
    console.error("Error parsing scheduled_at.json:", error.message);
    process.exit(1);
  }
} else {
  console.error("Error: scheduled_at.json が見つかりません。");
  process.exit(1);
}

/**
 * public 以下（.remote 配下は除外）の全 Markdown ファイルを走査し、
 * ・各ファイルの basename が scheduled_at.json に無ければ追加して null をセット
 * ・Markdown の frontmatter からは created_at と scheduled_at を削除する（scheduled_at は JSON 管理）
 * ・JSON の scheduled_at の値に基づき、private の値を更新する
 * ・最後に更新後の scheduledAtMapping を scheduled_at.json に上書き保存する
 */
function processAllFiles() {
  const files = glob
      .sync("./public/**/*.md")
      .filter(file => !file.includes("public/.remote/"));

  if (files.length === 0) {
    console.log("更新対象の Markdown ファイルはありません。");
    return;
  }

  let anyUpdated = false;

  for (const file of files) {
    const fullPath = path.resolve(file);
    let fileContent = fs.readFileSync(fullPath, 'utf8');
    const parsed = matter(fileContent);
    const data = parsed.data || {};
    const content = parsed.content || "";
    let changed = false;

    // ファイル名（basename）を取得（"public/"は除外された文字列）
    const baseName = path.basename(file);

    // JSON にキーがなければ追加して null をセット
    if (!scheduledAtMapping.hasOwnProperty(baseName)) {
      scheduledAtMapping[baseName] = null;
      console.log(`${file} のキーが scheduled_at.json に存在しなかったため、null を追加`);
    }
    // JSON に記載されている scheduled_at の値を取得
    const scheduledAtValue = scheduledAtMapping[baseName];

    // created_at を削除（もし存在すれば）
    if (data.created_at !== undefined) {
      delete data.created_at;
      console.log(`${file} から created_at を削除`);
      changed = true;
    }

    // scheduled_at は JSON 管理のため、frontmatter から削除する
    if (data.scheduled_at !== undefined) {
      delete data.scheduled_at;
      console.log(`${file} から scheduled_at を削除（JSON 管理）`);
      changed = true;
    }

    // scheduled_at の値（JSON の値）から、private の値を更新する
    const desiredPrivate = computeDesiredPrivate(scheduledAtValue);
    if (data.private !== desiredPrivate) {
      console.log(`${file} の private を ${data.private} から ${desiredPrivate} に更新`);
      data.private = desiredPrivate;
      changed = true;
    }

    if (changed) {
      const newContent = matter.stringify(content, data);
      fs.writeFileSync(fullPath, newContent, 'utf8');
      anyUpdated = true;
    }
  }

  if (anyUpdated) {
    console.log("frontmatter の更新が完了しました。");
  } else {
    console.log("更新すべき frontmatter はありませんでした。");
  }

  // 更新後の scheduledAtMapping を scheduled_at.json に上書き保存する
  fs.writeFileSync(scheduledAtFile, JSON.stringify(scheduledAtMapping, null, 2), 'utf8');
}

processAllFiles();