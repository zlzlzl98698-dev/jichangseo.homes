const fs = require('fs');
const path = require('path');

const brandsDir = path.join(__dirname, '..', 'brands');
const files = fs.readdirSync(brandsDir).filter(f => f.endsWith('.md') && f !== 'index.md' && f !== 'official.md' && f !== 'plans.md' && f !== 'coupons.md' && f !== 'compare.md' && f !== 'alternatives.md');

let replaced = 0;
for (const f of files) {
  const filePath = path.join(brandsDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  const slug = f.replace('.md', '');
  
  // Replace: [xxx 官方注册页面](https://...) with [xxx 官方注册页面](/go/${slug})
  const regex = /\[([^\]]+官方注册页面)\]\(https?:\/\/[^\)]+\)/g;
  if (regex.test(content)) {
    content = content.replace(regex, `[$1](/go/${slug})`);
    fs.writeFileSync(filePath, content, 'utf8');
    replaced++;
  }
}

console.log('Replaced raw external links in brands/*.md:', replaced);
