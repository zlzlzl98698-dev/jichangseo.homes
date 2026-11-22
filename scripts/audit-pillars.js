import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

const pillars = [
  { id: '01', name: '机场推荐', path: 'airport/index.md' },
  { id: '02', name: '价格与套餐', path: 'pricing/index.md' },
  { id: '03', name: '机场品牌', path: 'brands/index.md' },
  { id: '04', name: 'VPN 与加速器', path: 'vpn/index.md' },
  { id: '05', name: '客户端软件', path: 'clients/index.md' },
  { id: '06', name: 'AI 与流媒体', path: 'ai-streaming/index.md' },
  { id: '07', name: '线路与节点', path: 'network/index.md' },
  { id: '08', name: '使用教程', path: 'tutorials/index.md' },
  { id: '09', name: '故障排查', path: 'troubleshooting/index.md' },
  { id: '10', name: '风险与替代', path: 'safety/index.md' }
];

console.log('=== 10 大一级专题首页现状审计 ===');

const auditResults = pillars.map(p => {
  const fullPath = path.join(baseDir, p.path);
  const exists = fs.existsSync(fullPath);
  let charCount = 0;
  let chineseCharCount = 0;
  let title = '';
  let desc = '';
  let hasFAQ = false;
  let hasTable = false;

  if (exists) {
    const raw = fs.readFileSync(fullPath, 'utf-8');
    charCount = raw.length;
    // count chinese characters
    const chineseMatches = raw.match(/[\u4e00-\u9fa5]/g);
    chineseCharCount = chineseMatches ? chineseMatches.length : 0;

    const titleMatch = raw.match(/title:\s*(.+)/);
    if (titleMatch) title = titleMatch[1].trim();

    const descMatch = raw.match(/description:\s*(.+)/);
    if (descMatch) desc = descMatch[1].trim();

    hasFAQ = raw.includes('FAQSection') || raw.includes('常见问题');
    hasTable = raw.includes('| --- |') || raw.includes('<table>');
  }

  return {
    id: p.id,
    name: p.name,
    path: p.path,
    exists,
    chineseCharCount,
    title,
    desc,
    hasFAQ,
    hasTable
  };
});

auditResults.forEach(r => {
  console.log(`[${r.id}] ${r.name.padEnd(12)} (${r.path.padEnd(25)}) | 现存汉字数: ${r.chineseCharCount.toString().padStart(5)} | FAQ: ${r.hasFAQ} | 表格: ${r.hasTable}`);
});

const totalChinese = auditResults.reduce((sum, r) => sum + r.chineseCharCount, 0);
console.log(`\n当前 10 大专题首页汉字总数: ${totalChinese} 汉字`);
console.log(`升级目标: 每篇 10,000 - 15,000 汉字，总计约 100,000 - 150,000 汉字`);
