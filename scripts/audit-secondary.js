import fs from 'fs';
import path from 'path';

const dirs = [
  'airport', 'pricing', 'brands', 'vpn', 'clients',
  'ai-streaming', 'network', 'tutorials', 'troubleshooting', 'safety'
];

let totalZh = 0;
let totalFiles = 0;

console.log('=== 全站 10 大目录二级专题现状审计 ===');
for (const d of dirs) {
  if (fs.existsSync(d)) {
    const files = fs.readdirSync(d).filter(f => f.endsWith('.md') && f !== 'index.md');
    console.log(`\n📁 [${d}] (共 ${files.length} 个二级专题文件):`);
    files.forEach(f => {
      const content = fs.readFileSync(path.join(d, f), 'utf-8');
      const zhCount = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
      totalZh += zhCount;
      totalFiles++;
      console.log(`  - ${f.padEnd(28)} : ${zhCount.toString().padStart(5)} 汉字`);
    });
  }
}

console.log(`\n全部二级专题文件总数: ${totalFiles} 个`);
console.log(`当前二级专题汉字总数: ${totalZh} 汉字`);
