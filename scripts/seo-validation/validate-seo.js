const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../..');
console.log('=== 全站 SEO & GEO 规范检查 ===');

let totalMd = 0;
let missingTitle = 0;
let missingDesc = 0;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.vitepress' || f === 'data' || f === 'scripts' || f === 'public') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.md')) {
      totalMd++;
      const txt = fs.readFileSync(full, 'utf-8');
      if (!txt.includes('title:')) missingTitle++;
      if (!txt.includes('description:')) missingDesc++;
    }
  }
}

scanDir(baseDir);

console.log(`总扫描 Markdown 页面数: ${totalMd}`);
console.log(`Title 完整度: ${totalMd - missingTitle} / ${totalMd}`);
console.log(`Description 完整度: ${totalMd - missingDesc} / ${totalMd}`);

if (missingTitle === 0 && missingDesc === 0) {
  console.log('✓ 全站所有页面均包含独立 Title 与 Meta Description，符合 SEO 技术标准！');
} else {
  console.log('⚠️ 存在缺失元数据的页面，请核对。');
}
