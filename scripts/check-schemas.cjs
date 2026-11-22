const fs = require('fs');

function checkSchema(file) {
  if (!fs.existsSync(file)) return ['FILE_NOT_FOUND'];
  const c = fs.readFileSync(file, 'utf8');
  const matches = c.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  return matches.map(m => {
    const jsonStr = m.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    try {
      const obj = JSON.parse(jsonStr);
      return obj['@type'] || (obj['@graph'] ? obj['@graph'].map(g => g['@type']).join(',') : 'UNKNOWN');
    } catch(e) {
      return 'PARSE_ERROR';
    }
  });
}

console.log('Homepage schema:', checkSchema('.vitepress/dist/index.html'));
console.log('Review guangsu schema:', checkSchema('.vitepress/dist/reviews/guangsu.html'));
console.log('Tutorial chatgpt schema:', checkSchema('.vitepress/dist/tutorials/chatgpt-bypass-hk-rules.html'));
console.log('Compare schema:', checkSchema('.vitepress/dist/compare/guangsu-vs-weifeng.html'));
