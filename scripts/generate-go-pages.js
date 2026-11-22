const fs = require('fs');
const path = require('path');

const brands = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/brands/brands.json'), 'utf-8'));
const goDir = path.join(__dirname, '../go');
if (!fs.existsSync(goDir)) fs.mkdirSync(goDir, { recursive: true });

// 1. go/index.md
const goIndexContent = `---
title: 官方直达与合规商业转介中心
description: 机场SEO官方直达与合规商业转介页面。为用户提供受保护的免翻墙官网镜像通道，并公开透明披露商业合作规则。
---

# 官方直达与合规商业转介中心

<div class="affiliate-disclosure-banner">
  <span>⚖️ <strong>透明披露声明</strong>：本站所有对外商业注册链接均包含合规追踪参数。通过本站链接前往注册并购买，本站可能会从品牌方获得一定比例的推荐佣金，这不会增加您的任何付款金额，甚至因专属优惠码享受更低折扣。所获收益用于支持本站 7x24 小时节点探针、MAI-TEST-BOT 实测机房服务器及知识库持续维护。</span>
</div>

## 32 家品牌官方直达通道

| 品牌名称 | 品牌定位 | 专属优惠码 | 直达入口 |
| :--- | :--- | :--- | :--- |
${brands.map(b => `| **${b.name}** | ${b.tagline} | \`${b.coupon || '无'}\` | [进入官网](/go/${b.slug}) |`).join('\n')}

[返回品牌库完整参数数据库](/brands/)
`;

fs.writeFileSync(path.join(goDir, 'index.md'), goIndexContent, 'utf-8');

// 2. Individual go/[slug].md redirect pages
brands.forEach(b => {
  const content = `---
title: 正在前往 ${b.name} 官方网站...
description: 正在为您安全跳转至 ${b.name}（${b.slug}）官方最新可用镜像站点。
head:
  - - meta
    - http-equiv: refresh
      content: 2;url=${b.affiliateUrl}
---

# 正在安全跳转至 ${b.name} 官方网站...

<div style="text-align: center; padding: 3rem 1rem;">
  <div style="font-size: 2.5rem; margin-bottom: 1rem;">🚀</div>
  <h2>正在为您连接 ${b.name} 最新官方镜像</h2>
  <p style="color: #64748b; max-width: 600px; margin: 1rem auto;">
    系统正在为您建立安全直连隧道。若 2 秒内未自动跳转，请点击下方按钮直接访问：
  </p>
  <div style="margin: 2rem 0;">
    <a href="${b.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener" class="vp-button vp-button-brand" style="display: inline-block; padding: 0.8rem 2.2rem; background: #2563eb; color: #fff; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 1.1rem;">
      立即前往 ${b.name} 官方网站 ➔
    </a>
  </div>
  ${b.coupon ? `
  <div style="background: #eff6ff; border: 1px dashed #3b82f6; display: inline-block; padding: 0.75rem 1.5rem; border-radius: 8px; margin-top: 1rem;">
    <span>结账优惠码：<strong style="color: #2563eb; font-size: 1.2rem; font-family: monospace;">${b.coupon}</strong>（点击复制）</span>
  </div>
  ` : ''}
  <div class="affiliate-disclosure-banner" style="max-width: 650px; margin: 2rem auto; text-align: left;">
    <span>ℹ️ <strong>推广披露</strong>：此链接为 ${b.name} 专属推广链接，包含官方推荐代码。通过此链接购买将为本站带来维护佣金，绝不影响您的购买价格。</span>
  </div>
</div>
`;

  fs.writeFileSync(path.join(goDir, `${b.slug}.md`), content, 'utf-8');
});

console.log(`Successfully generated go/index.md and ${brands.length} brand redirect pages!`);
