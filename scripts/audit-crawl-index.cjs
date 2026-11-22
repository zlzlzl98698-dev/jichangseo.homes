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

const htmlFiles = walk('.vitepress/dist');
console.log('Total HTML files in dist:', htmlFiles.length);

// 1. Canonical tag audit
let withCanonical = 0;
let withoutCanonical = 0;
const sampleWithout = [];
const sampleCanonical = [];

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (match) {
    withCanonical++;
    if (sampleCanonical.length < 5) sampleCanonical.push({ file: f, href: match[1] });
  } else {
    withoutCanonical++;
    if (sampleWithout.length < 5) sampleWithout.push(f);
  }
}

console.log('Files with canonical tag:', withCanonical);
console.log('Files WITHOUT canonical tag:', withoutCanonical);
console.log('Sample with canonical:', sampleCanonical);
console.log('Sample WITHOUT canonical:', sampleWithout);

// 2. Check external links and rel attributes
let totalExternalLinks = 0;
let externalWithNofollow = 0;
let externalMissingNofollow = [];

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  // Match <a ... href="http..." ...>
  const aMatches = content.matchAll(/<a\s+([^>]*?)href=["'](https?:\/\/[^"']+)["']([^>]*?)>/gi);
  for (const match of aMatches) {
    const fullTag = match[0];
    const url = match[2];
    if (!url.includes('jichangseo.homes') && !url.includes('localhost') && !url.includes('127.0.0.1')) {
      totalExternalLinks++;
      const relMatch = fullTag.match(/rel=["']([^"']+)["']/i);
      if (relMatch && relMatch[1].includes('nofollow')) {
        externalWithNofollow++;
      } else {
        if (externalMissingNofollow.length < 15) {
          externalMissingNofollow.push({ file: f, url, tag: fullTag });
        }
      }
    }
  }
}

console.log('=== EXTERNAL LINKS AUDIT ===');
console.log('Total external links:', totalExternalLinks);
console.log('External with rel="nofollow":', externalWithNofollow);
console.log('External MISSING rel="nofollow":', externalMissingNofollow.length);
if (externalMissingNofollow.length > 0) {
  console.log('Examples of external links missing nofollow:');
  console.log(externalMissingNofollow);
}
