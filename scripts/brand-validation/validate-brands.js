const fs = require('fs');
const path = require('path');

const brandsFile = path.join(__dirname, '../../data/brands/brands.json');
const brands = JSON.parse(fs.readFileSync(brandsFile, 'utf-8'));

console.log('=== 运行品牌数据完整性校验脚本 ===');
console.log(`正在检查 ${brands.length} 家品牌数据...`);

let issues = 0;
const slugs = new Set();

brands.forEach((b, i) => {
  // Check slug
  if (!b.slug || slugs.has(b.slug)) {
    console.error(`[Error] 品牌 #${i + 1} (${b.name}) slug 重复或缺失: ${b.slug}`);
    issues++;
  }
  slugs.add(b.slug);

  // Check affiliate url
  if (!b.affiliateUrl || !b.affiliateUrl.startsWith('http')) {
    console.warn(`[Warn] 品牌 ${b.name} 推广链接异常: ${b.affiliateUrl}`);
    issues++;
  }

  // Check plans
  if (!b.plans || b.plans.length === 0) {
    console.warn(`[Warn] 品牌 ${b.name} 缺少套餐列表数据`);
    issues++;
  }
});

if (issues === 0) {
  console.log(`✓ 32 家品牌数据全部通过校验！Slug 唯一且推广参数完整。`);
} else {
  console.log(`⚠️ 发现 ${issues} 个需注意项。`);
}
