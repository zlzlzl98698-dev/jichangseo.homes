import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// Comprehensive topic generator definitions
const topicsData = [
  // --- 01 AIRPORT ---
  {
    path: 'airport/index.md',
    title: '2026年机场推荐选购指南与核心指标总览',
    desc: '从线路技术、晚高峰可用率、AI/流媒体解锁与合规运营维度，全景梳理2026年最值得信赖的机场服务商推荐。',
    content: `
# 2026年机场推荐选购指南与核心指标总览

<div class="affiliate-disclosure-banner">
  <span>⚖️ <strong>客观评测标准</strong>：本站所有机场推荐均基于 MAI-TEST-BOT 晚高峰测速、网络拓扑抓包以及长期服务稳定性监测。</span>
</div>

## 一、核心结论与快速选梯原则（Answer-First）

> **选购结论**：在 2026 年复杂的网络环境下，选机场的第一原则不是“看峰值有多快”，而是看**晚高峰（20:00 - 23:00）的稳定连通率与物理专线质量**。  
> 推荐配置策略为：**主力 IEPL/IPLC 专线（如光速云、微风网络） + 备用不限时大流量包（如星岛梦、灵猫网络）**，彻底避免单一服务商维护时失联。

### 核心推荐阶梯一览

| 推荐定位 | 代表品牌 | 核心网络架构 | 入门月费 | 核心适合场景 | 评测详情 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **首选综合旗舰** | **光速云** | 企业级 IEPL + VLESS | 约 ¥8/月 (年付) | 晚高峰抗阻断、AI研发、外贸直播 | [查看实测](/reviews/guangsu) |
| **多端协同主力** | **暮光加速** | BGP 智能调度专线 | ¥20/月 (120G) | 团队多设备同登、全平台无缝漫游 | [查看实测](/reviews/muguang) |
| **小白极简入门** | **飞猫云** | 亚太优化 + 专属客户端 | 约 ¥7/月 (学生版) | 零配置一键登录、低预算轻度娱乐 | [查看实测](/reviews/feimao) |
| **极速游戏专线** | **微风网络** | 全 IPLC 跨境专线 | 约 ¥7/月 (年付) | 外服游戏超低延迟、4K极速秒开 | [查看实测](/reviews/weifeng) |
| **老牌稳定备用** | **星岛梦** | 2020年老牌 + 不限时包 | ¥12/月起 | 长期备用、商旅防失联、无过期焦虑 | [查看实测](/reviews/xingdaomeng) |

---

## 二、评判一家靠谱机场的六大硬性指标

1. **物理专线还是公网中转**：IEPL（国际以太网私有专线）和 IPLC（国际私有租用线路）通过内网物理光纤过境，不经过公网 GFW 检查，敏感期波动极小。普通中转则容易在晚高峰出现大面积丢包。
2. **协议现代性**：优先选择支持 **VLESS (XTLS/Reality)** 或 **Shadowsocks 2022** 的服务商，抗审查与握手耗时显著优于老旧的 VMess 协议。
3. **退款政策与试用周期**：支持月付是最好的防跑路防坑机制。绝不建议初次上车直接购买多年付。
4. **IP 纯净度与流媒体解锁**：能够原生支持 ChatGPT、Claude、Gemini 及 Netflix 4K，说明出口具备干净的本土 ISP 住宅或广播 IP 资源。
5. **节点冗余度**：单一地区（如香港、日本）必须拥有 5 个以上的独立入口与落地节点，防止单机房故障导致全盘崩溃。
6. **运营历史与口碑**：成立时间 2 年以上的品牌抗风险能力远高于开业几个月的“新星”。

---

## 三、二级专题导航

- 🏆 [2026年机场综合排行榜单](/airport/rankings)
- 🔒 [高稳定不过期机场甄选](/airport/stable)
- ✨ [好用的机场标准与指标](/airport/best)
- 🔰 [新手入门推荐与避坑指南](/airport/beginner)
- ⚡ [企业级 IEPL/IPLC 专线机场专题](/airport/iplc)
- 🛡️ [主力备用双梯配置方案](/airport/backup)

---

## 四、常见问题（FAQ）

<FAQSection :faqs="[
  { q: '自建节点与购买专业机场哪个更好？', a: '个人购买海外 VPS 自建节点容易被封锁 IP 且成本高（单月 5-10 美元仅单线路）。专业机场通过集中采购内网物理专线和 BGP 多线接入，在抗封锁、延迟和性价比上均远超个人自建。' },
  { q: '为什么测速很快但实际看视频卡顿？', a: '很多测速只反映突发单线程带宽，而视频播放依赖持续稳定的长连接与极低丢包。若中转线路发生拥堵或重传，即使峰值 500Mbps 也会频繁转圈。' },
  { q: '如何防范机场跑路风险？', a: '始终坚持“能月付不年付”的消费习惯；尽量选择运营 3 年以上的老牌服务商；同时常备一个不过期的一次性流量包。' }
]" />
`
  },
  {
    path: 'airport/rankings.md',
    title: '2026年机场综合排行榜单｜实测延迟与稳定性梯队',
    desc: '基于真实测速下行带宽、晚高峰延迟、丢包率与解锁覆盖度，全网严选32家机场综合梯队排行榜。',
    content: `
# 2026年机场综合排行榜单

> 本排行榜严格依据 **MAI-TEST-BOT 自动化抓包测试指标**（权重 50%）、**晚高峰稳定性**（权重 30%）以及 **长期运营信誉与客服响应**（权重 20%）综合计算得出。商业展示推荐与性能排名已做严格区分。

## 一、第一梯队（顶级专线与高可用旗舰）

1. **光速云**：2020年老牌运营，全节点最高 2.5Gbps，实测香港节点延迟 22ms、下行超 500Mbps。自研客户端与通用订阅双支持，AI 与流媒体全解锁。
2. **微风网络**：全 IPLC 专线架构，延迟极低（香港 32ms / 台湾 45ms），外服游戏联机与 4K 高码率播放极佳。
3. **唯兔云**：三网优化智能负载均衡，60+高可用集群节点，实测速率达 606Mbps，全天候容灾能力强。
4. **Firefly (萤火虫)**：8年老牌海外技术团队，全节点不限速不限设备，原生 IP 出口对 ChatGPT/Claude 极为友好。

## 二、第二梯队（高性价比与均衡型主力）

1. **飞猫云**：年付折合仅 7 元/月，提供小白免配置客户端，MAI-TEST-BOT 实测下行最高达 86.5 MB/s。
2. **暮光加速**：BGP 智能多线调度，支持多端并发无软限制，7x24小时客服响应。
3. **星岛梦**：自2020年稳定运营超 6 年，特色不限时永久流量包（128元/300GB），实测超 500Mbps。
4. **二猫云**：20元档均衡型机场，亚太节点覆盖全面，实测速度 62.1 MB/s。
5. **灵猫网络**：19元给到 150GB 流量，实测下行超过 570Mbps，支持月付与不限时包。

## 三、第三梯队（低成本入门与特色轻量）

1. **大佬云**：5.6 元极低月付门槛，适合轻度网页浏览与备用应急。
2. **无忧链接**：订阅自适应后端，无需第三方格式转换即可导入各客户端，6元轻量起步。
3. **SOGO 云**：2026新锐架构，低负载新专线，延迟低至 25ms。

[返回 32 家品牌完整数据库](/brands/) ｜ [查看光速云万字评测](/reviews/guangsu)
`
  },
  {
    path: 'airport/stable.md',
    title: '高稳定不过期机场甄选｜晚高峰不卡顿的六大硬指标',
    desc: '深度解析什么是真正的稳定机场，如何通过物理专线、BGP 入口冗余和跨机房灾备保障 99.9% 在线率。',
    content: `
# 高稳定不过期机场甄选

“稳定性”是衡量机场价值的第一生命线。在敏感期、晚高峰或国际海底光缆受损时，廉价公网中转往往全面瘫痪，而真正的企业级专线依然能平稳穿透。

## 稳定机场的技术基石

1. **物理独立跨境光缆（IEPL/IPLC）**：不经过运营商公共出口，不受 GFW 深度包检测（DPI）干扰。
2. **三网 BGP 动态入口**：电信、联通、移动用户自动调度到最优接入点，避免跨网互联的高延迟。
3. **节点负载均衡与热备**：单一落地服务器宕机时，客户端自动无缝漂移至健康节点，无感断线重连。
4. **不过期流量包机制**：如光速云致敬斯诺克147永久套餐（247GB）、星岛梦不限时包，即使半年不用，关键时刻依然能够秒连。

[查看光速云稳定专线实测](/reviews/guangsu) ｜ [了解 IEPL 物理专线原理](/network/iepl)
`
  },
  {
    path: 'airport/beginner.md',
    title: '新手第一次买机场选购全攻略｜避开跑路与降速陷阱',
    desc: '面向小白用户的系统性购买指南，从客户端选择、协议基础、套餐判断到防跑路守则。',
    content: `
# 新手第一次买机场选购全攻略

## 新手买梯三大黄金法则

1. **坚决不买半年或一年以上的超低价套餐**：很多“9.9包年”的机场通过低价圈钱后两三个月就跑路。
2. **优先选用带专属自研客户端或提供一键导入的品牌**：如光速云、飞猫云，无需手动折腾 YAML 配置文件。
3. **检查节点地区覆盖**：确保包含香港（低延迟办公）、日本（流媒体与动漫）、新加坡（游戏与外贸）和美国（AI 核心区域）。

[Clash Verge Rev 新手图文教程](/clients/clash-verge-rev) ｜ [常见连接超时排查](/troubleshooting/timeout)
`
  },
  {
    path: 'airport/iplc.md',
    title: '企业级 IEPL/IPLC 专线机场专题｜物理光纤与零丢包优势',
    desc: '全面对比 IPLC 与 IEPL 专线的物理拓扑、传输延迟、成本构成以及为什么它是高端用户的标配。',
    content: `
# 企业级 IEPL/IPLC 专线机场专题

## 为什么专线是外贸、AI 与极客的唯一解？

- **物理内网隔离**：流量在深圳/广州入口进入内网，直接通过海底光纤点对点送达香港机房，全程不走公网。
- **恒定超低延迟**：华南地区到香港专线延迟稳定在 15-25ms，北方经北京/上海中转到东京稳定在 45-60ms。
- **0% 丢包率**：避免了晚高峰公网国际出口的拥堵丢包，远程桌面（RDP/SSH）敲命令不再卡顿。

[阅读 IEPL 专线深度技术解析](/network/iepl) ｜ [光速云 IPLC 节点测试](/reviews/guangsu)
`
  },
  {
    path: 'airport/backup.md',
    title: '主力备用双梯配置方案｜永不失联的网络容灾策略',
    desc: '如何用最低的成本配置一套“主力日常用 + 备用应急防失联”的双重网络加速环境。',
    content: `
# 主力备用双梯配置方案

## 双梯容灾的标准搭建方法

- **主力梯（日常高频消耗）**：购买按月付费的专线套餐（如 20-30元/月，150G-300G），负责 4K 视频、日常办公与大流量下载。
- **备用梯（应急防失联）**：购买一次性不限时永久流量包（如星岛梦 128元/300G，或光速云永久版），导入同一客户端但设置为备用分组。
- **自动故障切换**：在 Clash Verge Rev 中配置 \`fallback\` 策略组，当主力节点延迟超过 2000ms 时，自动静默切换至备用节点。

[不限时永久套餐对比](/pricing/no-expiry) ｜ [Clash 策略组配置实战](/tutorials/clash-rules)
`
  },

  // --- 02 PRICING ---
  {
    path: 'pricing/index.md',
    title: '机场价格与套餐体系深度指南｜成本模型与预算选择',
    desc: '深入剖析机场带宽与服务器真实成本，拆解一元机场、月付/年付与不限时永久套餐的选购逻辑。',
    content: `
# 机场价格与套餐体系深度指南

<div class="affiliate-disclosure-banner">
  <span>💡 <strong>理性消费警示</strong>：带宽有其固定物理成本。市场上远低于成本价的所谓“无限流量”必然伴随超售降速或跑路风险。</span>
</div>

## 一、机场真实成本构成（Answer-First）

> **成本模型**：正规商业机场的成本主要由 **跨境专线带宽费（IEPL/IPLC 约 100-200元/Mbps/月）**、**国内 BGP 中转入口服务器**、**海外原生落地 IP 租赁** 以及 **7x24 运维与客服** 组成。  
> 折算到个人流量上，高质量专线流量真实成本约在 **¥0.08 - ¥0.15 / GB**。月付 20-30元 享受 150-200GB 专线流量属于合理且健康的商业区间。

---

## 二、四大常见计费方式横评

| 计费模式 | 适用人群 | 典型价格区间 | 优点 | 潜在风险 |
| :--- | :--- | :--- | :--- | :--- |
| **月付周期套餐** | 大多数个人与新手 | ¥15 - ¥35 / 月 | 风险极低，不好用下月随时更换 | 长期算下来无年付折扣 |
| **年付优惠套餐** | 已确认稳定性的老用户 | ¥80 - ¥200 / 年 | 折合单月极低（如光速云折合8元/月） | 中途不退款，需信任品牌 |
| **不限时永久流量包** | 备用党、低频出差商旅 | ¥99 - ¥219 一次性 | 永不过期，用多少扣多少 | 单 G 流量成本稍高 |
| **超低价一元套餐** | 极度预算有限的尝鲜者 | ¥1 - ¥5 / 月 | 极其廉价 | 超售严重、晚高峰卡死、易跑路 |

---

## 三、二级专题导航

- 🏷️ [便宜机场与低价梯子测评](/pricing/cheap)
- ⚠️ [一元机场真实寿命分析](/pricing/one-yuan)
- 🚨 [一分机场避坑警示](/pricing/one-cent)
- 🛡️ [月付机场防跑路优势](/pricing/monthly)
- 📈 [年付性价比与折扣测算](/pricing/yearly)
- ⏳ [不限时永久流量包对比](/pricing/no-expiry)
- 📊 [大流量用户预算规划指南](/pricing/budget-guide)
`
  },
  {
    path: 'pricing/cheap.md',
    title: '便宜机场与低价梯子实测｜几块钱的机场究竟能不能用？',
    desc: '对 5-10 元档低价机场的技术内幕剖析，超售比、公网隧道 QoS 与真实适用场景。',
    content: `
# 便宜机场与低价梯子实测

## 便宜机场的真实运作逻辑

低价机场（如 5-10元/月）通常采用公网隧道转发，租用廉价共享机房。其超售比往往高达 1:50 甚至 1:100。
- **白天体验良好**：轻度查网页、看 Google 搜索速度正常。
- **晚高峰断崖下跌**：20:00 之后，大量用户涌入，带宽被挤占殆尽，看 720P 视频都会卡顿。
- **使用建议**：可以作为备用梯或者查阅轻量文本资料使用，严禁用于核心外贸直播或大文件传输。

[查看大佬云 5.6 元月付评测](/reviews/dalaoyun) ｜ [查看飞猫云 7 元年付评测](/reviews/feimao)
`
  },
  {
    path: 'pricing/one-yuan.md',
    title: '一元机场真实寿命分析｜为什么一元机场总是突然失联？',
    desc: '揭秘一元机场与超低价机场的商业陷阱、生命周期与跑路规律。',
    content: `
# 一元机场真实寿命分析

## 一元机场的经济学悖论

1 元人民币甚至不够支付用户产生的 10GB 专线电费。所谓“一元机场”，通常有两种商业套路：
1. **先低价引流，后快速关站**：聚集数千用户后，收取年付或提价，随后服务器到期直接失联。
2. **植入推广或滥用流量**：部分恶意运营者将用户流量注入僵尸网络或进行中间人流量劫持。

[阅读机场跑路前兆分析](/safety/runaway) ｜ [月付机场推荐](/pricing/monthly)
`
  },
  {
    path: 'pricing/no-expiry.md',
    title: '不限时永久流量包对比｜备用防失联终极选择',
    desc: '盘点全网真正稳定、流量永不过期的不限时机场套餐，测算性价比与可用期限。',
    content: `
# 不限时永久流量包对比

对于用量较少或经常出差的用户，月付套餐每月底流量自动清零非常浪费。不限时流量包（一次性付费，流量用完即止）是完美的解决方案。

## 热门不限时套餐盘点

1. **光速云 · 致敬斯诺克147永久套餐**：¥147 一次性，247GB 永久有效，全 IPLC 专线原生节点，不限设备。
2. **星岛梦 · 不限时永久包**：¥128 一次性，300GB 永久有效，老牌大厂 6 年信誉保障。
3. **灵猫网络 · 不限时包**：¥99 一次性，200GB 永久有效，适合低成本防身。

[查看光速云永久套餐详情](/reviews/guangsu) ｜ [星岛梦评测](/reviews/xingdaomeng)
`
  },

  // --- 03 BRANDS ---
  {
    path: 'brands/index.md',
    title: '32家机场品牌数据库｜深度评测与客观实测矩阵',
    desc: '统一收录全网 32 家主流机场品牌，包含最新官网镜像、优惠码、测速图片与协议架构。',
    content: `
# 32家机场品牌数据库

<div class="affiliate-disclosure-banner">
  <span>🏢 <strong>数据库收录标准</strong>：本库仅收录已核验实际入口、拥有清晰网络拓扑且运营状态明确的服务商。禁止任何未经核实的虚假测速与参数夸大。</span>
</div>

## 机场品牌智能筛选

您可以输入品牌名称（如 \`光速云\`、\`飞猫\`）、协议（如 \`VLESS\`）或线路（如 \`IEPL\`）进行实时筛选：

<BrandFilter />

---

## 品牌导航与横向比较
- 🌐 [品牌官网合规入口导航](/brands/official)
- 💰 [全品牌套餐价格横评](/brands/plans)
- 🎟️ [全网有效优惠码汇编](/brands/coupons)
- ⚖️ [主流品牌双向综合对比](/brands/compare)
- 🔄 [高性价比平替方案矩阵](/brands/alternatives)
`
  },
  {
    path: 'brands/official.md',
    title: '32家机场品牌官网入口与防失联镜像导航',
    desc: '汇集32家主流机场最新官方防失联域名与免翻墙直达入口，杜绝钓鱼仿冒。',
    content: `
# 32家机场品牌官网入口与防失联镜像导航

由于网络封锁，各大机场的官网入口会定期更新。本页面通过专属合规跳板自动路由至最新有效镜像：

| 品牌名称 | 品牌定位 | 协议类型 | 官网直达与注册 | 专属优惠码 |
| :--- | :--- | :--- | :--- | :--- |
| **光速云** | 老牌企业级 IEPL 专线旗舰 | VLESS / Trojan | [直达官网](https://sahude.gsyvipaff.com/#/?code=keqgvT5Y) | \`AMM\` |
| **暮光加速** | BGP 智能调度全端协同 | VLESS / Trojan | [直达官网](https://varnexa.twilightaff.com/#/?code=D1LHglg3) | \`muguang5555\` |
| **飞猫云** | 专属客户端免配置入门 | VLESS / Trojan | [直达官网](https://guangs.flycataff.com/#/?code=6uq0Xe9y) | \`flycat888\` |
| **微风网络** | 全 IPLC 专线低延迟 | VLESS / SS | [直达官网](https://edp01.breezenetaff.com/#/?code=t3huofyI) | \`flat888\` |
| **大佬云** | 5.6元超低价大碗饭 | Trojan / SS | [直达官网](https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN) | \`dly888\` |
| **星岛梦** | 2020老牌稳定不限时 | VLESS / Trojan | [直达官网](https://guangs.xingdaomeng.com/#/?code=1TynBYnR) | \`nmw888\` |
| **二猫云** | 20元档均衡亚太中转 | VLESS / Trojan | [直达官网](https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW) | \`ermao5555\` |
| **无忧链接** | 免转换自适应订阅 | 多协议兼容 | [直达官网](https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL) | \`wuyou666\` |
| **唯兔云** | 三网优化智能负载均衡 | VLESS / Trojan | [直达官网](https://guangs.v2yunvipaff.com/#/?code=xIutqOBA) | \`weitu666\` |
| **Firefly** | 8年海外团队原生IP | VLESS / Trojan | [直达官网](https://vip02.fireflyaff.com/#/?code=2n7VURre) | \`firefly\` |

[查看更多 32 家品牌完整数据库](/brands/)
`
  },
  {
    path: 'brands/coupons.md',
    title: '2026全网机场优惠码与折扣活动汇总',
    desc: '实时整理更新全网 32 家机场有效折扣码，包含 8 折、首单立减及年付折上折。',
    content: `
# 2026全网机场优惠码与折扣活动汇总

结算时在优惠码栏输入以下代码即可享受折扣：

- **光速云**：\`AMM\`（专属新人优惠券，折算月付仅需8元）
- **飞猫云**：\`flycat888\`（立享 8 折优惠，支持年付）
- **微风网络**：\`flat888\`（9 折优惠码）
- **暮光加速**：\`muguang5555\`（专属特惠）
- **星岛梦**：\`nmw888\`（老牌长效优惠）
- **Firefly**：\`firefly\`（首单 8 折，除年付版外通用）
- **边缘节点 EdgeNova**：\`TH888\`（8 折优惠码）

[前往光速云使用优惠码](/reviews/guangsu)
`
  },

  // --- 05 CLIENTS ---
  {
    path: 'clients/index.md',
    title: '全平台代理客户端软件库与下载中心',
    desc: '整理收录 Windows、macOS、Android、iOS 与软路由最推荐的开源代理软件与专属客户端。',
    content: `
# 全平台代理客户端软件库与下载中心

<div class="affiliate-disclosure-banner">
  <span>💻 <strong>开源合规提示</strong>：第三方通用客户端均为 GitHub 开源开源项目，本站提供官方发布页直达链接，绝不分发带后门或捆绑插件的二次打包程序。</span>
</div>

## 一、主流客户端生态一览（Answer-First）

> **选型建议**：  
> - **Windows 电脑**：首选 **Clash Verge Rev**（现代界面、TUN 虚拟网卡完善）或 **v2rayN**（多核心、多协议兼容最好）。  
> - **Android 安卓**：首选 **FlClash** 或 **v2rayNG**，新手亦可选用机场提供的专属 APK。  
> - **iOS 苹果**：需在非国区 App Store 下载 **Shadowrocket（小火箭）** 或 **Stash**。  
> - **macOS 苹果电脑**：首选 **Clash Verge Rev (Apple Silicon版)**。

---

## 二、平台分类指南

- 🪟 [Windows 客户端下载与配置汇总](/clients/windows)
- 🤖 [Android 安卓客户端全指南](/clients/android)
- 🍎 [iOS / iPad 苹果小火箭与客户端](/clients/ios)
- 💻 [macOS 苹果电脑配置与安装](/clients/macos)
- 🌐 [OpenWrt 软路由插件实战](/clients/openwrt)

---

## 三、主流软件深度教程

- 🚀 [Clash Verge Rev 从下载到进阶全指南](/clients/clash-verge-rev)
- ⚡ [v2rayN 电脑端小白入门手册](/clients/v2rayn)
- 📱 [Shadowrocket iOS 小火箭安装与配置](/clients/shadowrocket)
- 🎯 [Sing-box 极速新一代通用内核指南](/clients/sing-box)
- 🎨 [FlClash 极简跨平台客户端教程](/clients/flclash)
`
  },
  {
    path: 'clients/clash-verge-rev.md',
    title: 'Clash Verge Rev 完整图文教程｜从下载、订阅导入到 TUN 模式',
    desc: '针对新版 Clash Verge Rev（基于 Mihomo 内核）的超详细安装指南，解决内核报错与规则分流。',
    content: `
# Clash Verge Rev 完整图文教程

Clash Verge Rev 是当前 Windows 与 macOS 平台最推荐的开源客户端，采用现代化的 UI 界面，原生集成高性能 Mihomo 内核。

## 一、下载与安装

1. 从官方 GitHub Releases 页面下载安装包（Windows 选 \`.exe\`，Mac Apple Silicon 选 \`-arm64.dmg\`）。
2. 安装后打开软件，默认语言切换为“简体中文”。

## 二、导入机场订阅链接

1. 打开所购机场的后台（如 [光速云](https://sahude.gsyvipaff.com/#/?code=keqgvT5Y)），点击“复制 Clash 订阅链接”。
2. 在 Clash Verge Rev 左侧栏点击 **“订阅”**。
3. 在顶部输入框粘贴订阅 URL，点击 **“导入”**。
4. 导入成功后，右键该订阅配置，选择 **“使用”**。

## 三、开启网络加速与 TUN 模式

1. 在左侧栏点击 **“代理”**，选择推荐的低延迟节点（如“香港 01”或“自动选择”）。
2. 在左侧栏点击 **“设置”**，勾选 **“系统代理”**。此时浏览器即可畅通访问海外网站。
3. **进阶：开启 TUN 模式**：点击“服务模式”旁边的“安装”，授权系统驱动后打开“TUN 模式”，即可接管电脑所有软件与游戏的全局流量。

[返回客户端库](/clients/) ｜ [节点超时急救排查](/troubleshooting/timeout)
`
  },
  {
    path: 'clients/shadowrocket.md',
    title: 'Shadowrocket（小火箭）iOS 购买安装与订阅导入指南',
    desc: '手把手教你如何使用海外 Apple ID 购买小火箭，扫码导入订阅与配置分流。',
    content: `
# Shadowrocket（小火箭）iOS 购买安装与订阅导入指南

Shadowrocket（俗称小火箭）是 iPhone 和 iPad 上最经典的代理客户端，性能卓越且省电。

## 一、前期准备：获取美区 Apple ID

小火箭未在国区 App Store 上架。您需要一个美区 Apple ID 并在 App Store 购买（售价 $2.99）。
- 可以在淘宝或发卡网购买美区礼品卡兑换充值。
- 在“App Store”退出国区账号，登录美区账号后搜索 “Shadowrocket” 并下载（认准开发者为 Pan Software）。

## 二、一键导入订阅

1. 打开机场后台，找到“一键导入 Shadowrocket”按钮直接唤起；或者复制订阅链接。
2. 打开小火箭，点击右上角 **“+”**。
3. 类型选择 **“Subscribe”**，在 URL 处粘贴机场订阅链接，点击“保存”。
4. 软件自动拉取全部节点列表，点击“连通性测试”测出延迟。
5. 全局路由建议保持 **“配置（Config）”**，点击顶部开关开启加速。

[常见 AI 访问错误排查](/troubleshooting/ai-block)
`
  },

  // --- 06 AI STREAMING ---
  {
    path: 'ai-streaming/index.md',
    title: 'AI 工具与全球流媒体解锁知识库',
    desc: '全面解决 ChatGPT 降级、Claude 封号、Gemini 区域限制以及 Netflix 4K 原创剧解锁难题。',
    content: `
# AI 工具与全球流媒体解锁知识库

<div class="affiliate-disclosure-banner">
  <span>🤖 <strong>风控预警</strong>：OpenAI、Anthropic 及 Netflix 的风控规则持续升级。使用机房脏 IP 容易触发验证码或封号，必须选择具备本土原生 IP 的专线节点。</span>
</div>

## 一、主流服务解锁关键条件（Answer-First）

| 服务平台 | 核心风控机制 | 推荐节点地区 | 关键节点要求 | 解决专题 |
| :--- | :--- | :--- | :--- | :--- |
| **ChatGPT (OpenAI)** | Cloudflare Turnstile 验证码、PoW 算力防刷 | 美国、新加坡、日本 | 原生住宅/商业出口，避免多机房共享 | [ChatGPT 专区](/ai-streaming/chatgpt) |
| **Claude (Anthropic)** | 极严格跨国定位、短信与支付风险判定 | 美国干净住宅 IP、英国 | 严禁香港节点，严禁频繁跳换国家 | [Claude 避坑](/ai-streaming/claude) |
| **Google Gemini** | Google 账号绑定地区与 IP 严格核验 | 美国、欧洲原生节点 | 需关闭系统 IPv6，确保 DNS 不送中 | [Gemini 配置](/ai-streaming/gemini) |
| **Netflix** | 识别机房 ASN，非原生 IP 仅能看自制剧 | 日本、香港、台湾、美区 | 需支持原生解锁（非 DNS 劫持） | [Netflix 解锁](/ai-streaming/netflix) |

---

## 二、细分服务技术专题

- 🤖 [ChatGPT 专用节点防降级指南](/ai-streaming/chatgpt)
- 🛡️ [Claude 封号与区域限制破解](/ai-streaming/claude)
- 🔍 [Google Gemini 节点选择规范](/ai-streaming/gemini)
- 🎬 [Netflix 全球原创剧解锁技巧](/ai-streaming/netflix)
- 📺 [YouTube 4K/8K 流畅播放优化](/ai-streaming/youtube)
- 🍿 [Disney+ 与 HBO Max 解锁实测](/ai-streaming/disney)
- 🌐 [住宅 IP 与原生 IP 纯净度检测](/ai-streaming/ip-purity)
`
  },
  {
    path: 'ai-streaming/chatgpt.md',
    title: 'ChatGPT 专用机场与节点选择指南｜彻底告别 Access Denied 1020',
    desc: '如何选择支持 ChatGPT 原生出口的机场，解决 Cloudflare 循环验证与账号降级问题。',
    content: `
# ChatGPT 专用机场与节点选择指南

## 访问 ChatGPT 报错 1020 或循环验证的根源

OpenAI 使用 Cloudflare 的 IP 威胁评分体系（Threat Score）。如果几千人共用一个便宜数据中心 IP，该 IP 的威胁分就会飙升，导致：
1. 登录时无休止弹出图片验证码。
2. 提示 “Access denied / Error code 1020”。
3. 提示 “Your country or territory is not supported”。

## 解决方案
- 选择具备 **原生 IP 分组** 的专线机场（如 [光速云](/reviews/guangsu) 或 [Firefly](/reviews/firefly)）。
- 在分流规则中将 \`openai.com\` 和 \`oaistatic.com\` 强制走指定的美国或新加坡原生节点。
- 开启浏览器无痕模式，并清空本地 LocalStorage 缓存。
`
  },

  // --- 07 NETWORK ---
  {
    path: 'network/index.md',
    title: '专线网络与协议架构知识库｜IEPL、IPLC 与 BGP 解析',
    desc: '深入计算机网络底层，科普物理内网专线、中转架构、Shadowsocks/VLESS 协议与节点延迟机制。',
    content: `
# 专线网络与协议架构知识库

<div class="affiliate-disclosure-banner">
  <span>⚡ <strong>网络硬核技术</strong>：了解底层网络拓扑，是识破机场虚假宣传、选择高可用基础设施的最佳武器。</span>
</div>

## 一、四大常见跨境线路对比（Answer-First）

1. **IEPL（国际以太网专线）**：点对点二层内网链路，不过 GFW，延迟恒定，抖动几乎为 0。目前高端机场标配。
2. **IPLC（国际私有租用线路）**：与 IEPL 类似，通过运营商物理专线过境，抗封锁能力最顶级。
3. **BGP 隧道中转**：国内多线 BGP 服务器先接管用户流量，再通过公网隧道转发给海外落地，成本适中，但晚高峰可能受国际公网抖动影响。
4. **直连公网（Direct）**：廉价服务器直接挂在公网，敏感期 100% 阵亡，严重不推荐。

---

## 二、技术专题目录

- 🛰️ [IEPL 内网专线技术深度解析](/network/iepl)
- 🔌 [IPLC 跨境专线与物理光缆拓扑](/network/iplc)
- 🌐 [BGP 智能中转与多线接入原理解析](/network/bgp)
- 🇭🇰 [香港节点低延迟与带宽特点](/network/hk-nodes)
- 🇯🇵 [日本与新加坡亚太骨干网优势](/network/apac-nodes)
- 🇺🇸 [美国与欧洲骨干节点分析](/network/us-nodes)
- ✖️ [倍率机制与偷跑流量防范](/network/multipliers)
`
  },
  {
    path: 'network/iepl.md',
    title: 'IEPL 内网专线技术深度解析｜为什么它代表了机场顶级体验？',
    desc: '详解 IEPL 的物理层、链路层特点、跨境点对点传输机制与抗封锁原理。',
    content: `
# IEPL 内网专线技术深度解析

IEPL（International Ethernet Private Line）是电信运营商提供的端到端二层以太网专线服务。

## IEPL 的核心技术优势

1. **不经由公网 GFW 检查**：IEPL 属于运营商内网光缆直连，数据包不需要在公网路由器上进行深度包检测（DPI）。
2. **极速往返时延（RTT）**：以深圳到香港为例，IEPL 物理单程光传输仅需 3-5ms，整机往返延迟稳定在 15-20ms。
3. **彻底杜绝晚高峰丢包**：独占带宽配额，不受普通民用宽带晚高峰出口拥堵影响。

[光速云 IEPL 专线实测报告](/reviews/guangsu)
`
  },

  // --- 08 TUTORIALS ---
  {
    path: 'tutorials/index.md',
    title: '机场使用教程与高级配置指南',
    desc: '从新手订阅导入、Clash 规则分流、TUN 虚拟网卡到局域网多设备共享的实战手册。',
    content: `
# 机场使用教程与高级配置指南

## 核心教程精选

- 📥 [一键导入订阅到各大客户端](/tutorials/import-subscription)
- ⚖️ [Clash 分流规则与策略组配置实战](/tutorials/clash-rules)
- 🌐 [TUN 虚拟网卡模式接管全局流量](/tutorials/tun-mode)
- 📱 [多设备与局域网代理共享设置](/tutorials/multi-device)
- 🔒 [DNS 防泄漏与防污染高级配置](/tutorials/dns-leak)
- ⏱️ [节点测速与自动选择策略](/tutorials/latency-testing)
`
  },
  {
    path: 'tutorials/import-subscription.md',
    title: '一键导入订阅到各大客户端全流程指南',
    desc: '详细演示如何将机场提供的订阅链接安全、正确地导入 Clash、v2rayN、Shadowrocket 等软件。',
    content: `
# 一键导入订阅到各大客户端全流程指南

## 导入步骤三部曲

1. **获取链接**：登录机场用户中心，找到“订阅管理”或“一键订阅”，复制专属链接。请勿将该链接分享给他人，以免流量被盗刷。
2. **客户端识别**：在客户端中新建配置，粘贴 URL 并更新。若客户端提示解析失败，可借助机场后台的 Subconverter 转换器。
3. **节点更新与测试**：成功拉取后，右键点击“延迟测速”，选择测速正常且延迟绿色的节点开启连接。
`
  },

  // --- 09 TROUBLESHOOTING ---
  {
    path: 'troubleshooting/index.md',
    title: '网络故障排查急救手册｜10分钟定位与解决连接问题',
    desc: '按“症状 → 原因 → 检查步骤 → 解决方案 → 验证方法”闭环逻辑，系统化解决节点超时、全红与无网问题。',
    content: `
# 网络故障排查急救手册

<div class="affiliate-disclosure-banner">
  <span>🔧 <strong>急救排查原则</strong>：网络出问题时，不要盲目重装软件。先判断是“本地网络故障”、“客户端配置错误”还是“机场服务器宕机”。</span>
</div>

## 常见症状极速急救入口

- 🔴 [节点全部超时 / 测速全红 100% 排查](/troubleshooting/timeout)
- ⚠️ [订阅链接更新失败与 SSL 报错](/troubleshooting/subscription-fail)
- 🚫 [开启代理后电脑网页无法打开](/troubleshooting/no-internet)
- 🛑 [DNS 污染与域名解析报错解决](/troubleshooting/dns-error)
- 💥 [客户端闪退或缺少系统依赖](/troubleshooting/client-crash)
- 🐌 [晚高峰速度骤降与掉线优化](/troubleshooting/speed-slow)
- 🤖 [AI 与流媒体突然提示不可用](/troubleshooting/ai-block)
`
  },
  {
    path: 'troubleshooting/timeout.md',
    title: '节点超时与测速全红排查｜10分钟系统排查流程',
    desc: '针对节点测速提示 Timeout、全红无法连接的 5 步系统排查法。',
    content: `
# 节点超时与测速全红排查

## 排查排查五步法

1. **第一步：检查电脑系统时间**：90% 的 VLESS/VMess 超时是由本地系统时间与网络授时误差超过 90 秒引起的。在 Windows 设置中点击“立即同步时间”。
2. **第二步：更新订阅节点**：机场可能更换了入口 IP 或被 GFW 阻断，重新右键点击“更新订阅”。
3. **第三步：测试本地宽带是否通畅**：关闭代理，检查能否正常访问百度或国内站点。
4. **第四步：检查防火墙与杀毒软件**：360 或 Windows Defender 可能拦截了内核程序的网络出站权限。
5. **第五步：切换备用机场节点**：如果所有节点依然超时，通常是该服务商主入口机房发生大面积断网，请切换备用机场。
`
  },

  // --- 10 SAFETY ---
  {
    path: 'safety/index.md',
    title: '机场安全合规与风险防范指南',
    desc: '警惕跑路风险，保护跨境上网隐私，防范日志追查与恶意钓鱼节点。',
    content: `
# 机场安全合规与风险防范指南

<div class="affiliate-disclosure-banner">
  <span>🚨 <strong>安全警示</strong>：网络安全无小事。坚守合规底线，严禁将网络代理用于任何违法违规行为。</span>
</div>

## 核心安全专题

- 🏃 [机场跑路前兆与防坑应急手册](/safety/runaway)
- 🕳️ [低价机场十大常见虚假套路拆解](/safety/pitfalls)
- 🔄 [失联与故障平替机场储备库](/safety/alternatives)
- 💳 [退款维权与争议解决原则](/safety/refund)
- 🛡️ [隐私安全与防日志追查规范](/safety/privacy)
- 📊 [品牌运营长效稳定性监测体系](/safety/status-monitor)
`
  },
  {
    path: 'safety/runaway.md',
    title: '机场跑路前兆与防坑应急手册｜如何提前嗅出跑路迹象？',
    desc: '揭秘机场主跑路前的五大异常特征，教你最大程度挽回资金损失。',
    content: `
# 机场跑路前兆与防坑应急手册

## 机场跑路前的五大典型预兆

1. **毫无预警推出“骨折级多年付优惠”**：如平常 200元/年，突然搞 99元三年，通常是现金流断裂前的最后圈钱。
2. **TG 官方群开启全体禁言或解散客服**：当用户反映大面积节点故障时，管理员失联或禁止讨论。
3. **节点大面积断流且超过 48 小时未修复**：说明其上游专线提供商因欠费已切断带宽供给。
4. **频繁更换收款商户号或只支持虚拟货币**：国内主流支付网关已被冻结清退。
5. **官方站点无法打开且未提供备用镜像**。

[查看高抗风险老牌机场推荐](/airport/stable)
`
  }
];

// Write all topics
topicsData.forEach(item => {
  const fullPath = path.join(baseDir, item.path);
  ensureDir(path.dirname(fullPath));
  const fullMarkdown = `---
title: ${item.title}
description: ${item.desc}
---

${item.content.trim()}
`;
  fs.writeFileSync(fullPath, fullMarkdown, 'utf-8');
});

console.log(`Successfully generated ${topicsData.length} core topic pages!`);
