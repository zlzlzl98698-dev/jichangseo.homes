import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const filesToFix = [
  'vpn/index.md',
  'clients/index.md',
  'ai-streaming/index.md',
  'network/index.md',
  'tutorials/index.md',
  'troubleshooting/index.md',
  'safety/index.md',
  'airport/index.md',
  'pricing/index.md',
  'brands/index.md'
];

for (const relPath of filesToFix) {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix brand review links (strip trailing slash and replace fake brands with real brands from brands.json)
  content = content.replace(/\/reviews\/guangsu\//g, '/reviews/guangsu');
  content = content.replace(/\/reviews\/feiniaoyun\/?/g, '/reviews/feimao');
  content = content.replace(/\[飞鸟云\]/g, '[肥猫云]');
  content = content.replace(/飞鸟云/g, '肥猫云');
  content = content.replace(/\/reviews\/naiyun\/?/g, '/reviews/weifeng');
  content = content.replace(/\[奈云\]/g, '[微风云]');
  content = content.replace(/奈云/g, '微风云');
  content = content.replace(/\/reviews\/jikeyun\/?/g, '/reviews/muguang');
  content = content.replace(/\[极客云\]/g, '[暮光云]');
  content = content.replace(/极客云/g, '暮光云');
  content = content.replace(/\/reviews\/yiyuan\/?/g, '/reviews/ermao');
  content = content.replace(/\[一元机场\]/g, '[二毛机场]');
  content = content.replace(/一元机场/g, '二毛机场');

  // Fix all other review links with trailing slash
  content = content.replace(/\/reviews\/([a-z0-9_-]+)\//g, '/reviews/$1');

  // Fix secondary topic links
  content = content.replace(/\/network\/hong-kong/g, '/network/hk-nodes');
  content = content.replace(/\/tutorials\/clash(?!\w)/g, '/tutorials/clash-rules');
  content = content.replace(/\/tutorials\/subscription/g, '/tutorials/import-subscription');
  content = content.replace(/\/tutorials\/tun/g, '/tutorials/tun-mode');
  content = content.replace(/\/troubleshooting\/subscription/g, '/troubleshooting/subscription-fail');
  content = content.replace(/\/troubleshooting\/network-down/g, '/troubleshooting/no-internet');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Fixed links in ${relPath}`);
}
