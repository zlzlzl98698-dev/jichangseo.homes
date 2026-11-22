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
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('.vitepress/dist');
let emptyA = 0;
const emptySamples = [];

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  // Match <a> without href or href="" or href="#"
  const regex = /<a(\s+[^>]*)?>/gi;
  let match;
  while ((match = regex.exec(c)) !== null) {
    const tag = match[0];
    if (!tag.includes('href=') || tag.includes('href=""') || tag.includes("href=''") || tag.includes('href="#"') || tag.includes('href="javascript:')) {
      // Ignore VitePress theme internal anchor heading links with href="#..." unless just "#"
      if (tag.includes('href="#"') || !tag.includes('href=')) {
        emptyA++;
        if (emptySamples.length < 5) emptySamples.push({ file: f, tag });
      }
    }
  }
}

console.log('Empty / invalid <a> tags count:', emptyA);
if (emptySamples.length > 0) console.log('Samples:', emptySamples);
