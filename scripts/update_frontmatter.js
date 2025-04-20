const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

/**
 * 現在の JST タイムスタンプ（YYYY-MM-DDTHH:mm:ss+09:00 形式）を返す
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
 * 現在の JST 時刻と scheduled_at の値 (YYYY-MM-DD) を比較し、
 * ・scheduled_at が未来の日付、または本日で JST 午前9時以前なら true（非公開）
 * ・それ以外なら false（公開）
 *
 * @param {string|null} scheduledAtValue - 'YYYY-MM-DD' 形式または null
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

/**
 * public 以下の全 Markdown ファイル（.remote 配下は除外）を走査し、
 * scheduled_at が存在しなければ null をセット、created_at が存在しなければ現在の JST タイムスタンプをセットし、
 * scheduled_at の値から private の値を更新する。
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

    // scheduled_at が未定義なら null をセット
    if (data.scheduled_at === undefined) {
      data.scheduled_at = null;
      console.log(`${file} に scheduled_at が存在しなかったので null をセット`);
      changed = true;
    }

    // created_at が未定義なら、現在の JST タイムスタンプをセット
    if (data.created_at === undefined) {
      data.created_at = getJSTTimestamp();
      console.log(`${file} に created_at が存在しなかったので ${data.created_at} をセット`);
      changed = true;
    }

    // scheduled_at の値から、private の値を更新
    const desiredPrivate = computeDesiredPrivate(data.scheduled_at);
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
}

processAllFiles();