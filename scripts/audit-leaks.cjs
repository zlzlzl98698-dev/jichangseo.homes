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
      results = results.concat(walk(full));
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.xml') || file.endsWith('.txt')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('.vitepress/dist');
const leakedPaths = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('C:\\Users') || content.includes('C:/Users') || content.includes('Pro User') || content.includes('192.168.') || content.includes('localhost:')) {
    // Check if it's legitimate in tutorial content vs system leak
    const matches = [];
    if (content.includes('Pro User')) matches.push('Pro User (Local Windows Username)');
    if (content.includes('C:\\Users') || content.includes('C:/Users')) matches.push('Local Windows Absolute Path');
    if (content.includes('localhost:4174') || content.includes('localhost:5173')) matches.push('Localhost Dev Server Port');
    if (matches.length > 0) {
      leakedPaths.push({ file: f, matches });
    }
  }
}

console.log('=== INFRASTRUCTURE & PATH LEAKAGE AUDIT ===');
console.log('Total files checked:', files.length);
console.log('Files with potential leaks:', leakedPaths.length);
if (leakedPaths.length > 0) {
  console.log(JSON.stringify(leakedPaths, null, 2));
}
