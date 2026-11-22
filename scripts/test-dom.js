import fs from 'fs';

const html = fs.readFileSync('.vitepress/dist/airport/index.html', 'utf-8');
const idx = html.indexOf('<table');
const sub = html.slice(0, idx);
const matches = sub.match(/class="([^"]+)"/g);
console.log('Classes before table:', matches ? matches.slice(-25) : []);
