import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:4174/airport/');
  
  const ths = await page.$$eval('table th', els => els.map(el => ({
    text: el.innerText.trim(),
    whiteSpace: window.getComputedStyle(el).whiteSpace,
    width: window.getComputedStyle(el).width,
    height: window.getComputedStyle(el).height,
    display: window.getComputedStyle(el).display
  })));
  
  const table = await page.$eval('table', el => ({
    display: window.getComputedStyle(el).display,
    width: window.getComputedStyle(el).width,
    overflowX: window.getComputedStyle(el).overflowX
  }));
  
  console.log('Table style:', table);
  console.log('THs:', ths);
  
  await browser.close();
}

test().catch(console.error);
