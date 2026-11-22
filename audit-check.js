const fs = require('fs');
const path = require('path');

const brandFile = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\32家机场品牌清单.txt';
const guangsuFile = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\光速云品牌信息.txt';
const clientsFile = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\第三方代理客户端.txt';
const chartFile = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\机场品牌图表样式.txt';
const matrixFile = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\内容矩阵.txt';

const benchDir = 'C:\\Users\\Pro User\\Desktop\\jichangjiasuqi.cc\\public\\images\\benchmarks';
const logoDir = 'C:\\Users\\Pro User\\Desktop\\jichangjiasuqi.cc\\public\\images\\logos';
const unlockDir = 'C:\\Users\\Pro User\\Desktop\\jichangjiasuqi.cc\\public\\images\\unlocks';

const benchFiles = fs.existsSync(benchDir) ? fs.readdirSync(benchDir) : [];
const logoFiles = fs.existsSync(logoDir) ? fs.readdirSync(logoDir) : [];
const unlockFiles = fs.existsSync(unlockDir) ? fs.readdirSync(unlockDir) : [];

console.log('--- 1. 静态资源统计 ---');
console.log('可用测速实测图片数:', benchFiles.length);
benchFiles.forEach(f => console.log('  [测速图]', f));
console.log('可用 Logo 图标数:', logoFiles.length);
console.log('可用解锁截图数:', unlockFiles.length);

// Parse 32家清单
const content = fs.readFileSync(brandFile, 'utf8');
const lines = content.split('\n');

// 32 brands parsed from previous script
const previousBrands = JSON.parse(fs.readFileSync('C:\\Users\\Pro User\\Desktop\\jichangjiasuqi.cc\\data\\brands\\brands.json', 'utf8'));

console.log('\n--- 2. 品牌数据库统计 ---');
console.log('实际解析品牌总数:', previousBrands.length);

const brandsWithBenchImg = previousBrands.filter(b => b.benchmarkResults && b.benchmarkResults.image);
const brandsMissingBenchImg = previousBrands.filter(b => !b.benchmarkResults || !b.benchmarkResults.image);

console.log('具备实际测速图的品牌 (' + brandsWithBenchImg.length + '家):');
brandsWithBenchImg.forEach(b => console.log('  ✓ ' + b.name + ' (' + b.slug + ') -> ' + b.benchmarkResults.image));

console.log('\n缺少实际测速图的品牌 (' + brandsMissingBenchImg.length + '家):');
brandsMissingBenchImg.forEach(b => console.log('  ✗ ' + b.name + ' (' + b.slug + ') [标注: ' + b.dataStatus + ']'));

// Check 光速云套餐冲突
console.log('\n--- 3. 光速云资料冲突检查 ---');
const gsyInfo = fs.readFileSync(guangsuFile, 'utf8');
console.log('光速云品牌信息.txt 中列出的套餐:');
// 查找斯诺克147、轻量版、极速版、定制版
['致敬斯诺克147永久套餐', '轻量版', '极速版', '定制版', '流光版', '量子版', '无界版'].forEach(p => {
  const inGsy = gsyInfo.includes(p);
  const in32 = content.includes(p);
  console.log(`  套餐 [${p}]: 光速云品牌信息.txt 存在: ${inGsy}, 32家清单 存在: ${in32}`);
});

// Check coupons and affiliate links
console.log('\n--- 4. 推广与优惠码完整度 ---');
let hasAffCount = 0;
let hasCouponCount = 0;
previousBrands.forEach(b => {
  if (b.affiliateUrl) hasAffCount++;
  if (b.coupon) hasCouponCount++;
});
console.log(`推广链接覆盖: ${hasAffCount}/${previousBrands.length}`);
console.log(`优惠码覆盖: ${hasCouponCount}/${previousBrands.length}`);
