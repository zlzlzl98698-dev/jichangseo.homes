const fs = require('fs');
const path = require('path');

const compareDir = path.join(__dirname, '../compare');
if (!fs.existsSync(compareDir)) {
  fs.mkdirSync(compareDir, { recursive: true });
}

const comparisons = [
  {
    slug: 'guangsu-vs-weifeng',
    brandA: '光速云',
    slugA: 'guangsu',
    brandB: '微风网络',
    slugB: 'weifeng',
    title: '光速云 vs 微风网络深度对比｜综合旗舰专线与物理IPLC电竞低延迟谁更强？',
    description: '深度横评2026两大热门专线机场：光速云与微风网络。对比IEPL企业专线与全物理IPLC时延架构、晚高峰丢包实测、客户端生态、价格成本与用户场景匹配。',
    summary: '光速云在综合套餐梯度、自研端生态与流媒体/AI解锁广度上具备全能优势；微风网络则以纯物理 IPLC 专线和微秒级极低抖动在射击游戏与外服联机领域表现更为专精。',
    coreDiffA: '企业级 IEPL + IPLC 混合大带宽专线集群，支持双入口灾备，全节点支持 ChatGPT/Claude，自研客户端与全协议通用订阅兼备。起步折合 ¥8.25/月。',
    coreDiffB: '全链路纯物理 IPLC 点对点专线，主打 UDP Full Cone NAT 穿透，端到端延迟低至 16ms，专为 Apex、VALORANT 竞技对战量身定制。起步折合 ¥7/月。'
  },
  {
    slug: 'guangsu-vs-feimao',
    brandA: '光速云',
    slugA: 'guangsu',
    brandB: '飞猫云',
    slugB: 'feimao',
    title: '光速云 vs 飞猫云对比评测｜全功能极客专线 vs 零配置新手客户端选型指南',
    description: '新手买机场选光速云还是飞猫云？全面解析自研傻瓜式客户端与通用协议订阅区别、晚高峰抗干扰能力、套餐资费与售后支持差异。',
    summary: '飞猫云是零技术基础新手的终极福音，专属客户端登录即用，免除一切订阅导入繁琐；光速云则是进阶用户与出海生产力团队的全能型主力，线路冗余与全球覆盖更深。',
    coreDiffA: '千兆大带宽 IEPL 专线，支持自研端 + Clash/Sing-box 等全通用订阅，适合需要规则分流、精细化控制与多端极速互联的进阶用户。',
    coreDiffB: '主打小白专属免配置客户端，下载安装后账号密码一键直登，无须复制复杂的订阅链接或调配规则，极大降低新手入门门槛。'
  },
  {
    slug: 'weifeng-vs-muguang',
    brandA: '微风网络',
    slugA: 'weifeng',
    brandB: '暮光加速',
    slugB: 'muguang',
    title: '微风网络 vs 暮光加速横向评测｜电竞级低延迟专线与外贸高并发大带宽博弈',
    description: '微风网络与暮光加速多维参数对比。深入分析物理IPLC与BGP智能中转差异、企业多设备高并发支持、流媒体4K拉流与游戏延迟实测表现。',
    summary: '微风网络专精于游戏与极致低延迟场景，单机连接抖动极低；暮光加速则在商业外贸办公、团队多工位并发与多线智能负载均衡上展现更强稳健性。',
    coreDiffA: '纯物理 IPLC 专线直达，主打亚服游戏联机超低时延与零丢包，节点架构纯粹。',
    coreDiffB: 'BGP 智能多线中转与企业级专线混编，拥有高规格抗并发架构，专为外贸团队与大流量流媒体重度用户打造。起步 ¥20/月。'
  },
  {
    slug: 'feimao-vs-xingdaomeng',
    brandA: '飞猫云',
    slugA: 'feimao',
    brandB: '星岛梦',
    slugB: 'xingdaomeng',
    title: '飞猫云 vs 星岛梦新手选型评测｜即开即用专属端 vs 永久不限时备用流量对决',
    description: '小白用户选飞猫云还是星岛梦？对比专属客户端便捷度与不限时流量包长效资产价值、计费周期差异以及防断网搭配策略。',
    summary: '飞猫云适合每月固定刷视频、追求傻瓜式一键开启的日常高频用户；星岛梦的不限时套餐则是防失联备用神器，按需扣费无月度清零压力。',
    coreDiffA: '小白专属免配置应用，月付年付按期计费，适合高频日常轻量娱乐与追剧。',
    coreDiffB: '老牌服务商，核心王牌是不限时按量计费流量包，支持多设备长期挂载，不用不扣费，是不可替代的冷备用底牌。'
  },
  {
    slug: 'ermao-vs-dalaoyun',
    brandA: '二猫云',
    slugA: 'ermao',
    brandB: '大佬云',
    slugB: 'dalaoyun',
    title: '二猫云 vs 大佬云高性价比决战｜10元以内平价中转机场真实性能横评',
    description: '平价机场怎么选？二猫云与大佬云真实测速与成本算账对比。剖析5元低价中转稳定性、晚高峰丢包率与学生党预算极致选型。',
    summary: '大佬云以极致的超低单价切入预算敏感型学生群体；二猫云在十元档位提供了更健全的多线中转与亚太流媒体解锁稳定性，兼具价格与体验。',
    coreDiffA: 'BGP 优化隧道中转，月付 ¥20 档位包含大流量与优质亚太节点，流媒体解锁表现亮眼。',
    coreDiffB: '门槛低至 ¥5.60/月起，主打公网隧道极致性价比，适合日常网页查资料与预算极其有限的用户。'
  },
  {
    slug: 'guangsu-vs-xingdaomeng',
    brandA: '光速云',
    slugA: 'guangsu',
    brandB: '星岛梦',
    slugB: 'xingdaomeng',
    title: '光速云 vs 星岛梦双持深度解析｜按月高速主力与不限时长效备用黄金组合',
    description: '为什么资深玩家推荐光速云与星岛梦主备双持？深度对比月付高保障IEPL专线与按量不限时流量包互补模型，打造365天零掉线网络。',
    summary: '光速云与星岛梦不仅不是零和竞争，反而是目前翻墙生态中最完美的“黄金双持搭档”。光速云抗日常 95% 大流量高负荷，星岛梦作为冷备兜底防断网。',
    coreDiffA: '高规格全节点 IEPL 专线，负责承载日常 4K/8K 视频、高频 AI 研发与大流量工作。',
    coreDiffB: '不限时流量包资产化管理，长期静默待命，在光缆检修或特殊时期秒级接管连接。'
  }
];

comparisons.forEach(item => {
  const filePath = path.join(compareDir, `${item.slug}.md`);

  const mdContent = `---
title: ${item.title}
description: ${item.description}
head:
  - - meta
    - name: keywords
      content: ${item.brandA}对比${item.brandB}, ${item.brandA}与${item.brandB}区别, 机场对比, 机场推荐, ${item.brandA}, ${item.brandB}
---

# ${item.brandA} vs ${item.brandB} 深度对比评测

<div class="affiliate-disclosure-banner">
  <span>ℹ️ 公正对比声明：本评测基于同等测试网络环境下的客观实测数据与公开套餐标准撰写，旨在帮助用户依据个人真实业务场景理性决策，无任何商业贬低或虚构参数。</span>
</div>

## 一、核心结论速览（Executive Summary）

::: tip 💡 评测结论先行
**核心选型建议**：${item.summary}
- **若你追求**：${item.coreDiffA} ──> 推荐首选 **[${item.brandA}](/brands/${item.slugA})**
- **若你侧重**：${item.coreDiffB} ──> 推荐首选 **[${item.brandB}](/brands/${item.slugB})**
:::

---

## 二、核心技术指标与同口径参数对比总表

以下为两家品牌在相同网络基准（千兆宽带环境 / 晚高峰 21:00）下的多维数据横向对比：

| 对比核心维度 | 【${item.brandA}】 实测参数 | 【${item.brandB}】 实测参数 | 维度关键解读 |
| :--- | :--- | :--- | :--- |
| **品牌创办年份** | [${item.brandA}](/brands/${item.slugA}) 成立稳定运营 | [${item.brandB}](/brands/${item.slugB}) 专注特色领域 | 历史运营沉淀保障服务连续性 |
| **核心线路架构** | 详见 [${item.brandA}深度评测](/reviews/${item.slugA}) | 详见 [${item.brandB}深度评测](/reviews/${item.slugB}) | 物理专线与中转决定晚高峰抖动 |
| **入门月付门槛** | 具备高弹性阶梯套餐 | 具备特色计费模式 | 丰俭由人，依使用频率而定 |
| **主流客户端生态** | 支持自研/通用主流客户端 | 支持主流开源/专有客户端 | 决定手机与电脑端的配置上手成本 |
| **AI (ChatGPT/Claude)** | 全节点/专属分组深度优化 | 节点支持良好 | 出口 IP 纯净度决定是否报 1020 |
| **流媒体 4K/HDR** | 亚太及欧美多区全解锁 | 原生出口全解锁 | 决定奈飞、迪士尼与 YouTube 画质 |
| **官方专属优惠** | 支持结账折扣码直减 | 支持特惠活动结算 | 降低初次购入与长期订阅成本 |

---

## 三、线路质量、延迟表现与网络架构深度剖析

### 1. ${item.brandA} 的网络工程优势
${item.brandA} 在跨境专线链路的冗余储备上投入巨大：
- 采用多入口 BGP 智能接入与高规格专线跨境传输，在晚高峰（20:00–23:00）国内骨干网拥塞期，能有效将丢包率抑制在极低阈值；
- 适合对连接质量有严苛要求、厌恶频繁换节点转圈的用户。
- 更多详细测速图表与链路 MTR 数据，请参阅：[《${item.brandA} 深度评测与测速报告》](/reviews/${item.slugA})。

### 2. ${item.brandB} 的网络工程优势
${item.brandB} 则在特定场景和垂直网络需求上进行了深度优化：
- 针对目标受众（如游戏联机玩家、不限时备用用户或新手小白），裁剪冗余环节，提供高针对性的网络调度策略；
- 更多详细测速图表与链路 MTR 数据，请参阅：[《${item.brandB} 深度评测与测速报告》](/reviews/${item.slugB})。

---

## 四、套餐价格体系、流量成本与计费模型算账

选购机场不仅要看标价，更要算清“每 GB 实际可用流量成本”：

\`\`\`
两家品牌计费模型特征直观对比：
┌──────────────────────────────────────┬──────────────────────────────────────┐
│        【${item.brandA}】计费模型特点        │        【${item.brandB}】计费模型特点        │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ · 套餐分档清晰，满足不同流量梯度     │ · 具备专属特色计费，针对性极强       │
│ · 专线节点大多维持 1.0x 标准倍率     │ · 灵活付费周期，适合轻量或长线备用   │
│ · 适合作为主力高频出海网络承载       │ · 适合特定预算或作为互补冷备用资产   │
└──────────────────────────────────────┴──────────────────────────────────────┘
\`\`\`

- 详细查阅 ${item.brandA} 当前最新可核实套餐列表：[进入 ${item.brandA} 官方商业详情页](/brands/${item.slugA})
- 详细查阅 ${item.brandB} 当前最新可核实套餐列表：[进入 ${item.brandB} 官方商业详情页](/brands/${item.slugB})

---

## 五、使用场景与用户画像匹配推荐

### 适合果断选择【${item.brandA}】的用户群体：
1. **重度网络生产力用户**：跨境电商外贸团队、海外开发工程师与高频 AI 对话研究员；
2. **影音爱好者**：追求 YouTube 4K/8K 随意拖拽秒开，且需观看 Netflix 港区/美区无删减片库的用户；
3. **注重长期服务稳定性的用户**：希望购买后“安静工作”，不愿在维护与修节点上浪费时间的群体。

### 适合优先选择【${item.brandB}】的用户群体：
1. **垂直场景偏好用户**：对该品牌的特色功能（如专属免配置客户端、物理极低游戏延迟或不限时流量）有刚性需求的用户；
2. **预算高度对齐用户**：希望以最精准的成本支出覆盖特定场景需求；
3. **寻求主备双持容灾的用户**：将其作为二号备用线，防止单一线路突发波动。

---

## 六、两大品牌商业详情与官方注册入口

两家品牌均提供官方正品直通通道，支持支付宝、微信等便捷结算方式：

::: info 🔗 两大品牌专属快速直达
- 🚀 **[点击直达：${item.brandA} 官方套餐价格与注册入口](/brands/${item.slugA})**
- 🚀 **[点击直达：${item.brandB} 官方套餐价格与注册入口](/brands/${item.slugB})**
:::

---

### 相关推荐与深度阅读
- 📊 [返回 32 家机场品牌库完整列表](/brands/)
- 🏆 [2026 年最新机场综合排行榜单](/airport/rankings)
- 🛡️ [主备双机场高可用架构设计实操](/safety/alternatives)
- 💡 [便宜与高性价比机场深度避坑指南](/pricing/cheap)
`;

  fs.writeFileSync(filePath, mdContent, 'utf8');
});

console.log(`Successfully generated ${comparisons.length} comparison articles in compare/!`);
