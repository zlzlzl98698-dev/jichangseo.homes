const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== '.git' && file !== 'node_modules' && file !== 'cache') {
        results = results.concat(walk(full));
      }
    } else if (file.endsWith('.html') || file.endsWith('.md') || file.endsWith('.ts') || file.endsWith('.htaccess') || file.endsWith('.txt')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('.');

const noindexFiles = [];
const xRobotsTagFiles = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('noindex')) {
    noindexFiles.push(f);
  }
  if (content.includes('X-Robots-Tag')) {
    xRobotsTagFiles.push(f);
  }
}

console.log('=== INDEX CONTROL SCAN ===');
console.log('Files with noindex (total):', noindexFiles.length);
console.log('Files with noindex outside go/:', noindexFiles.filter(f => !f.includes('go\\') && !f.includes('go/') && !f.includes('Preventive_SEO_Audit_Report') && !f.includes('scripts\\')));
console.log('Files with X-Robots-Tag:', xRobotsTagFiles);
