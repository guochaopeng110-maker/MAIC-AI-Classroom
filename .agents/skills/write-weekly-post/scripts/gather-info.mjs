import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../../../');

// 获取当前日期
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const currentDate = `${year}-${month}-${day}`;

let commits = '';
try {
  commits = execSync('git log --since="7 days ago" --oneline', { cwd: rootDir, encoding: 'utf-8' });
} catch (e) {
  commits = '无 (执行 git log 失败或无提交)';
}

let changelog = '';
let latestVersion = '未知';
try {
  const changelogPath = path.join(rootDir, 'CHANGELOG.md');
  if (fs.existsSync(changelogPath)) {
    const text = fs.readFileSync(changelogPath, 'utf-8');
    const match = text.match(/##\s+\[([\d.a-zA-Z-]+)\].*?\n([\s\S]*?)(?=\n##\s+\[|\n---|$)/);
    if (match) {
      latestVersion = match[1];
      changelog = match[2].trim();
    }
  } else {
    changelog = '未找到 CHANGELOG.md';
  }
} catch (e) {
  changelog = `无法读取 CHANGELOG.md: ${e.message}`;
}

const result = {
  date: currentDate,
  latestVersion,
  commits: commits.trim(),
  changelog
};

console.log(JSON.stringify(result, null, 2));
