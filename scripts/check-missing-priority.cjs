const fs = require('fs');
const path = require('path');

const csv = fs.readFileSync('data/keywords/content-priority.csv', 'utf8');
const lines = csv.split('\n').filter(l => l.trim().length > 0).slice(1);

const missing = [];
const existing = [];

for (const line of lines) {
  const parts = line.split(',');
  const pri = parts[0].replace(/"/g, '');
  const url = parts[1].replace(/"/g, '');
  const title = parts[2].replace(/"/g, '');
  
  let relPath = url.replace(/^\//, '') + '.md';
  if (!fs.existsSync(relPath)) {
    if (fs.existsSync(url.replace(/^\//, '') + '/index.md')) {
      existing.push({ pri, url, title, file: url.replace(/^\//, '') + '/index.md' });
    } else {
      missing.push({ pri, url, title, relPath });
    }
  } else {
    existing.push({ pri, url, title, file: relPath });
  }
}

console.log('Total in priority list:', lines.length);
console.log('Existing count:', existing.length);
console.log('Missing count:', missing.length);
console.log('Missing items:');
console.log(JSON.stringify(missing, null, 2));
