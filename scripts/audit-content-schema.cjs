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

const thinPages = [];
const titles = new Map();
const duplicateTitles = [];
const descriptions = new Map();
const duplicateDescriptions = [];
let hasPlaceholderCount = 0;
const placeholderSamples = [];
let jsonLdCount = 0;
let jsonLdMissingCount = 0;

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  
  // 1. Text length (strip HTML tags)
  const bodyMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let text = '';
  if (bodyMatch) {
    text = bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '')
                       .replace(/<style[\s\S]*?<\/style>/gi, '')
                       .replace(/<[^>]+>/g, '')
                       .replace(/\s+/g, ' ')
                       .trim();
  }
  
  // Chinese character count approx
  const charCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length + (text.match(/[a-zA-Z0-9]+/g) || []).length;
  if (charCount < 600 && !f.includes('404.html') && !f.includes('go\\') && !f.includes('go/')) {
    thinPages.push({ file: f, charCount, textSnippet: text.slice(0, 100) });
  }

  // 2. Titles
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    const t = titleMatch[1].trim();
    if (titles.has(t)) {
      titles.get(t).push(f);
    } else {
      titles.set(t, [f]);
    }
  }

  // 3. Descriptions
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (descMatch) {
    const d = descMatch[1].trim();
    if (descriptions.has(d)) {
      descriptions.get(d).push(f);
    } else {
      descriptions.set(d, [f]);
    }
  }

  // 4. Placeholders
  if (content.match(/TODO|TBD|占位|待补充|待完善|Lorem ipsum/i)) {
    hasPlaceholderCount++;
    if (placeholderSamples.length < 5) placeholderSamples.push(f);
  }

  // 5. JSON-LD
  if (content.includes('application/ld+json')) {
    jsonLdCount++;
  } else {
    jsonLdMissingCount++;
  }
}

// Find title dupes
for (const [t, fileList] of titles.entries()) {
  if (fileList.length > 1) {
    duplicateTitles.push({ title: t, count: fileList.length, files: fileList });
  }
}

// Find desc dupes
for (const [d, fileList] of descriptions.entries()) {
  if (fileList.length > 1) {
    duplicateDescriptions.push({ desc: d.slice(0, 60), count: fileList.length, files: fileList });
  }
}

console.log('=== CONTENT & SEO AUDIT STATS ===');
console.log('Total HTML files:', htmlFiles.length);
console.log('Thin pages (< 600 chars, excluding /go/ & 404):', thinPages.length);
if (thinPages.length > 0) console.log('Thin page samples:', thinPages.slice(0, 5));
console.log('Duplicate titles count:', duplicateTitles.length);
if (duplicateTitles.length > 0) console.log('Duplicate title samples:', duplicateTitles.slice(0, 5));
console.log('Duplicate descriptions count:', duplicateDescriptions.length);
if (duplicateDescriptions.length > 0) console.log('Duplicate description samples:', duplicateDescriptions.slice(0, 5));
console.log('Pages with placeholders:', hasPlaceholderCount);
console.log('Pages with JSON-LD:', jsonLdCount);
console.log('Pages without JSON-LD:', jsonLdMissingCount);
