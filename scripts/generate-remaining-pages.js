import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '..');
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

const remainingPages = [
  // --- airport ---
  {
    path: 'airport/best.md',
    title: '好用的机场标准与指标｜如何从小白到行家看懂节点参数',
    desc: '从延迟抖动、丢包率、解锁能力、客户支持与客户端生态，全景拆解好用机场的核心指标。',
    content: `
# 好用的机场标准与指标

一间“好用”的机场绝非单纯测速数字好看，而是融入日常工作和娱乐时“感觉不到它的存在”。

## 好用机场的五大体验指标

1. **零感延迟（< 50ms）**：日常点击网页与敲击远程 SSH 时无迟滞感。
2. **极低丢包率（< 0.1%）**：长连接（如 Zoom、Google Meet、在线游戏）不中断。
3. **全平台专属或免配置客户端**：如光速云、飞猫云提供的一键登录客户端，降低使用门槛。
4. **全天候客户支持**：工单响应时间小于 1 小时，且有专人跟进线路突发故障。
5. **透明清晰的节点命名**：明确标注节点倍率、落地地区及解锁标签（如 [NF/GPT]）。

[查看 2026 综合排行榜](/airport/rankings) ｜ [光速云综合评测](/reviews/guangsu)
`
  },

  // --- pricing ---
  {
    path: 'pricing/one-cent.md',
    title: '一分机场避坑警示｜免费与极低价背后的安全深渊',
    desc: '深度揭密“一分机场”与各类免费节点的商业变现陷阱：劫持、弹窗与用户隐私泄露。',
    content: `
# 一分机场避坑警示

市场上所谓的“一分机场”或“免费试用节点”，其背后的运营成本绝不可能凭空消失。

## 一分机场的三大盈利套路

1. **中间人攻击与凭据窃取**：非加密或自签证书节点劫持用户 HTTP 明文流量，嗅探账号密码。
2. **流量变现与暗网爬虫**：将用户的客户端设备变为黑产代理出口（Puppet Proxy）。
3. **隐私信息倒卖**：将注册填写的邮箱、密码hash与支付关联数据打包出售。

> [!WARNING]
> 切勿在不可信的免费或一分机场节点上登录个人核心邮箱、银行或涉及公司商业机密的系统！

[了解月付正规机场推荐](/pricing/monthly)
`
  },
  {
    path: 'pricing/monthly.md',
    title: '月付机场精选推荐｜灵活防坑、拒绝被套牢的最佳消费策略',
    desc: '为什么老手一律推荐月付？精选支持灵活按月订阅的高品质专线与性价比机场。',
    content: `
# 月付机场精选推荐

## 为什么老手一律推崇“月付”？

1. **防范跑路风险**：即使机场意外失联，最大损失仅为单月十几二十元。
2. **避免线路质量下滑被套牢**：部分机场开业初期线路飞快，几个月后严重超售，月付用户可随时潇洒更换。
3. **更适合网络敏感期测试**：各家机场在敏感期的抗封锁能力不同，月付让用户拥有主动选择权。

## 精选优质月付机场推荐

- **光速云**：极速版 25元/月（168G IPLC专线），全节点 1 倍率。
- **暮光加速**：20元/月（120G BGP专线），多端同登。
- **二猫云**：20元/月（130G 均衡配置）。
- **大佬云**：5.6元/月（60G 极致低成本）。

[查看光速云套餐详情](/reviews/guangsu) ｜ [品牌价格汇总表](/brands/plans)
`
  },
  {
    path: 'pricing/yearly.md',
    title: '年付机场性价比测算｜什么情况下购买年付才划算？',
    desc: '深度对比年付折扣力度与风险系数，教你如何精确计算年付的真实投资回报率。',
    content: `
# 年付机场性价比测算

## 年付购买的前提条件

只有在满足以下**全部三个条件**时，才建议考虑年付套餐：
1. **服务商运营超过 2 年以上**（如 2020 年成立的光速云、星岛梦）。
2. **经过至少 1-2 个月的月付实测**，确认本地晚高峰连接完全稳定。
3. **年付折扣力度可观**（通常在 7 折至 8 折以下，折合月付极为低廉）。

## 经典年付高性价比范例

- **光速云 · 轻量版**：¥99/年（69GB/月），折合单月仅 **¥8.25/月**，享受 IEPL 原生专线品质。
- **飞猫云 · 学生版**：¥84/年（50GB/月），折合单月仅 **¥7/月**，自带小白免配置客户端。

[查看飞猫云实测评测](/reviews/feimao)
`
  },
  {
    path: 'pricing/budget-guide.md',
    title: '大流量用户预算规划指南｜4K流媒体、外贸与团队办公成本控制',
    desc: '针对每月用量超过 500GB 的大流量用户，提供带宽规划、倍率避坑与定制专线方案。',
    content: `
# 大流量用户预算规划指南

## 常见场景流量消耗速查

- **YouTube / Netflix 4K 播放**：约 7GB - 15GB / 小时。
- **日常办公与网页浏览**：约 30GB - 50GB / 月。
- **TikTok 直播与跨境电商投放**：约 300GB - 800GB / 月。

## 大流量选型建议
1. 警惕“高倍率节点”：注意节点倍率，部分机场的 3x/5x 节点会加速消耗流量。
2. 团队或外贸客户建议直接选用**独享原生 IP 专线**（如光速云定制版），避免公用 IP 相互关联受限。
`
  },

  // --- brands ---
  {
    path: 'brands/plans.md',
    title: '全品牌套餐价格横评矩阵｜32家机场价格与流量一览表',
    desc: '横向对比全网 32 家主流机场的月付价格、起步流量、年付折算单价与网络类型。',
    content: `
# 全品牌套餐价格横评矩阵

以下为 32 家品牌基础套餐的横向基准价格与配置对比表：

| 品牌名称 | 起步月付 | 包含月流量 | 年付折合单月 | 核心线路架构 | 协议支持 | 评测详情 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **光速云** | ¥25 (月付) | 168GB | **¥8.25/月** | IEPL企业专线/IPLC | VLESS/Trojan | [实测评测](/reviews/guangsu) |
| **飞猫云** | ¥25 (月付) | 150GB | **¥7.00/月** | BGP优化/亚太直连 | VLESS/Trojan | [实测评测](/reviews/feimao) |
| **微风网络** | ¥28 (月付) | 180GB | **¥7.00/月** | 全 IPLC 专线 | VLESS/SS | [实测评测](/reviews/weifeng) |
| **大佬云** | **¥5.6 (月付)** | 60GB | - | 公网中转隧道 | Trojan/SS | [实测评测](/reviews/dalaoyun) |
| **暮光加速** | ¥20 (月付) | 120GB | **¥9.00/月** | BGP智能调度 | VLESS/Trojan | [实测评测](/reviews/muguang) |
| **星岛梦** | ¥15 (月付) | 100GB | - | BGP/IEPL专线 | VLESS/Trojan | [实测评测](/reviews/xingdaomeng) |
| **二猫云** | ¥20 (月付) | 130GB | - | BGP优化中转 | VLESS/Trojan | [实测评测](/reviews/ermao) |
| **无忧链接** | **¥6.0 (月付)** | 50GB | - | 智能多线自适应 | 多协议 | [实测评测](/reviews/wuyou) |
| **唯兔云** | ¥18 (月付) | 120GB | - | 三网BGP优化负载 | VLESS/Trojan | [实测评测](/reviews/weitu) |
| **Firefly** | ¥25 (月付) | 150GB | **¥8.00/月** | 全 IPLC 原生出口 | VLESS/Trojan | [实测评测](/reviews/firefly) |

[查看全部 32 家品牌完整数据库](/brands/)
`
  },
  {
    path: 'brands/compare.md',
    title: '主流机场双向综合对比｜光速云 vs 暮光加速 vs 飞猫云 vs 微风',
    desc: '从延迟实测、晚高峰抗堵能力、自研客户端体验、协议支持多维度深度对决。',
    content: `
# 主流机场双向综合对比

## 选型核心对决：四大明星品牌横向 PK

### 1. 光速云 vs 微风网络（高端专线之争）
- **网络线路**：两家均为企业级 IEPL/IPLC 专线，晚高峰丢包率均在 0.1% 以下。
- **差异点**：光速云运营时间更长（2020年至今），且提供全平台自研客户端与永久流量包；微风网络则以极低外服游戏延迟见长。

### 2. 飞猫云 vs 大佬云（平价性价比之争）
- **月费门槛**：大佬云月付 5.6 元极低；飞猫云年付折合 7 元/月。
- **使用体验**：飞猫云提供小白免配置客户端与实测超过 600Mbps 的带宽，稳定性明显优于单纯拼价格的大佬云。

[查看光速云万字评测](/reviews/guangsu) ｜ [查看飞猫云评测](/reviews/feimao)
`
  },
  {
    path: 'brands/alternatives.md',
    title: '主流机场高性价比平替方案矩阵｜节点故障与失联应急储备',
    desc: '针对各大品牌的特点，梳理无缝平替方案，确保在任何单点故障时均能一键切换。',
    content: `
# 主流机场高性价比平替方案矩阵

## 常见平替推荐路径

- **光速云平替** ➔ **微风网络**（同样具备 IPLC 专线）或 **唯兔云**（三网优化负载）。
- **飞猫云平替** ➔ **无忧链接**（自适应格式免折腾）或 **二猫云**。
- **星岛梦平替** ➔ **灵猫网络**（同样提供不限时永久包）。
- **Firefly平替** ➔ **光速云**（原生 IP 与出海 AI 友好支持）。

[查看备用机场配置教程](/airport/backup)
`
  },

  // --- vpn ---
  {
    path: 'vpn/index.md',
    title: 'VPN 与网络加速器知识体系｜底层技术、适用场景与差异对比',
    desc: '全面阐述传统 VPN、商业游戏加速器与现代分流代理机场在协议、路由与抗封锁能力上的本质差异。',
    content: `
# VPN 与网络加速器知识体系

<div class="affiliate-disclosure-banner">
  <span>🛡️ <strong>概念辨析</strong>：很多用户把“机场”、“VPN”和“加速器”混为一谈。理解其底层协议是避免买错工具的关键。</span>
</div>

## 一、三者技术本质对比（Answer-First）

| 工具类型 | 底层协议 | 路由分流能力 | 跨境抗封锁机制 | 核心适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **现代机场 (Proxy)** | VLESS, Shadowsocks, Trojan | 极强（精细到域名与IP规则分流） | 混淆伪装 + IEPL/IPLC 商业专线 | 科学上网、AI工具、流媒体、外贸 |
| **传统商业 VPN** | OpenVPN, WireGuard, IKEv2 | 弱（通常为全局虚拟网卡接管） | 纯高强度加密，无混淆易被 GFW 识别阻断 | 跨国企业内网访问、公共WiFi安全加密 |
| **网游加速器** | 专有 UDP 转发隧道 | 针对指定游戏进程精准分流 | 国内外机房专线转发加速游戏包 | Steam/PlayStation/Xbox 外服联机对战 |

---

## 二、二级专题目录

- 🌐 [全球主流商用 VPN 推荐榜单](/vpn/recommend)
- ⚠️ [免费 VPN 的安全黑洞与风险分析](/vpn/free-risks)
- 📱 [手机与平板端网络加速选型](/vpn/mobile)
- 💻 [PC 电脑端加速环境搭建指南](/vpn/pc)
- 🎮 [外服联机游戏加速器选择技巧](/vpn/gaming)
- ⚖️ [VPN 协议与 Shadowsocks 深度技术对比](/vpn/vs-proxy)
`
  },
  {
    path: 'vpn/recommend.md',
    title: '全球主流商用 VPN 推荐榜单｜ExpressVPN、NordVPN 现状与实测',
    desc: '针对国际知名大厂 VPN 在国内网络环境下的真实可用性进行客观评估。',
    content: `
# 全球主流商用 VPN 推荐榜单

国际知名的大牌商业 VPN（如 ExpressVPN、NordVPN、Surfshark）在欧美具备极高的品牌声誉和隐私保障，但在国内网络环境下表现各异。

## 国际 VPN 在国内现状实测

1. **ExpressVPN**：拥有专有 Lightway 协议，敏感期经常推送紧急版本，但连通率不如国内专线机场稳定。
2. **NordVPN**：提供混淆服务器（Obfuscated Servers），但连接成功率受地域宽带影响极大。
3. **综合选购建议**：若仅用于日常翻墙、刷网页、看 YouTube，**IEPL 专线机场（如光速云）在速度、延迟和稳定性上均远胜国际 VPN**；若身处海外需要防范公共 WiFi 窃听，大牌 VPN 则更具优势。

[查看光速云专线测评](/reviews/guangsu)
`
  },
  {
    path: 'vpn/free-risks.md',
    title: '免费 VPN 的安全黑洞与风险分析｜免费的往往是最昂贵的',
    desc: '深入剖析各类应用商店中免费 VPN 的商业模式：贩卖带宽、注入广告与窃取用户凭证。',
    content: `
# 免费 VPN 的安全黑洞与风险分析

服务器和国际带宽有硬性物理成本。全球没有任何一家公司会无偿提供优质海外带宽。

## 免费 VPN 的暗黑内幕

- **销售用户数据**：将用户的浏览历史与画像出售给广告商或第三方数据经纪商。
- **设备沦为肉鸡**：部分免费 VPN 在后台安装后台驻留程序，将你的家庭宽带变成商业住宅代理池（如 Hola VPN 丑闻）。
- **缺乏基本加密**：很多所谓 VPN 仅实现了基础 SOCKS 转发，根本没有端到端加密保护。
`
  },
  {
    path: 'vpn/vs-proxy.md',
    title: 'VPN 协议与 Shadowsocks 深度技术对比｜为什么机场更适合翻墙？',
    desc: '从 TCP/UDP 封装、协议特征、握手耗时与分流机制，对比 OpenVPN、WireGuard 与 VLESS/SS。',
    content: `
# VPN 协议与 Shadowsocks 深度技术对比

## 协议特征的本质区别

- **OpenVPN / WireGuard**：设计初衷是“企业远程接入与保密通信”。其数据包头部有鲜明的特征，容易被 GFW 深度包检测（DPI）快速识别并阻断握手。
- **Shadowsocks / VLESS Reality**：设计初衷就是“对抗流量审查与混淆伪装”。Reality 协议甚至能够模拟正常 TLS 证书握手（借用大型海外 CDN 站点的公钥），使审查系统无法区分其与普通 HTTPS 流量的区别。
`
  },

  // --- clients (remaining) ---
  {
    path: 'clients/v2rayn.md',
    title: 'v2rayN 电脑端小白入门与多核心配置手册',
    desc: '针对 Windows 经典客户端 v2rayN 的详细图文配置，涵盖 Xray 内核、sing-box 内核与多协议支持。',
    content: `
# v2rayN 电脑端小白入门与多核心配置手册

v2rayN 是 Windows 平台上资历最深、协议支持最全的开源客户端，支持 Xray、V2Ray、Sing-box 等多种内核。

## 一、安装与基础配置

1. 从官方 GitHub 下载 \`v2rayN-with-dependencies.zip\`（内含 .NET 运行库）。
2. 解压到无中文字符的目录，双击运行 \`v2rayN.exe\`。
3. 状态栏右下角找到小蓝 V 图标，右键选择“自动配置系统代理”。

## 二、添加订阅与测试

1. 点击顶部菜单栏 **“订阅分组”** ➔ **“订阅分组设置”**。
2. 点击“添加”，在“可选地址 (url)”输入机场订阅链接，点击确定。
3. 再次点击“订阅分组” ➔ **“更新全部订阅 (不通过代理)”**。
4. 节点列表出现后，按 \`Ctrl+A\` 全选节点，按 \`Ctrl+O\` 测试真实下载速度与延迟。

[Clash Verge Rev 对比选型](/clients/clash-verge-rev)
`
  },
  {
    path: 'clients/sing-box.md',
    title: 'Sing-box 极速新一代通用代理内核上手指南',
    desc: '全面认识现代代理技术新标杆 Sing-box，轻量内存占用、纯净 JSON 架构与多端生态。',
    content: `
# Sing-box 极速新一代通用代理内核上手指南

Sing-box 是近年来由 Nekoray 作者主导开发的新一代代理通用框架，以卓越的性能与极致的内存控制著称。

## Sing-box 的核心亮点

1. **内存占用极小**：相比传统 Clash 内核动辄 200MB+ 内存占用，Sing-box 运行时通常仅消耗 30-50MB。
2. **现代协议全原生支持**：对 VLESS Reality、Hysteria 2、TUIC v5 提供第一方高质量原生驱动。
3. **全平台官方客户端**：拥有 iOS (SFI)、macOS (SFM)、Android (SFA) 官方客户端。
`
  },
  {
    path: 'clients/flclash.md',
    title: 'FlClash 极简跨平台客户端教程｜基于 Flutter 的现代优雅界面',
    desc: '详解支持 Windows、macOS、Android、Linux 的现代开源客户端 FlClash。',
    content: `
# FlClash 极简跨平台客户端教程

FlClash 是基于 Flutter 开发的跨平台客户端，支持 Windows、macOS、Linux 和 Android。界面优雅极简，完美继承 Mihomo 内核的强大能力。

## 核心特色
- 跨平台 UI 一致性：手机和电脑界面操作逻辑几乎一致。
- 零基础友好：没有复杂的嵌套设置菜单，一键导入订阅一键连通。
`
  },
  {
    path: 'clients/hiddify.md',
    title: 'Hiddify 全平台多协议客户端指南｜智能选路与多订阅管理',
    desc: '开源跨平台神器 Hiddify 从安装到配置实战，支持全协议与智能路由选择。',
    content: `
# Hiddify 全平台多协议客户端指南

Hiddify 是一款支持全平台（Windows, macOS, Linux, Android, iOS）的多协议客户端，采用 Sing-box 作为底层驱动。

## 适用场景
- 新手不想折腾复杂的规则配置，喜欢全自动最佳节点选择。
- 拥有一家以上机场订阅，希望合并展示与自动故障切换。
`
  },
  {
    path: 'clients/windows.md',
    title: 'Windows 平台客户端大全｜Verge Rev、v2rayN 与 Nyanpasu 对比',
    desc: '全方位对比 Windows PC 端主流代理工具，给出最适合不同用户画像的推荐。',
    content: `
# Windows 平台客户端大全

## 选型建议

- **日常办公与娱乐主力**：推荐 **Clash Verge Rev**（界面现代，TUN 驱动完善）。
- **多协议重度折腾玩家**：推荐 **v2rayN**（节点参数全面，支持复杂路由规则）。
- **追求极简颜值**：推荐 **FlClash**。
`
  },
  {
    path: 'clients/android.md',
    title: 'Android 安卓平台客户端指南｜v2rayNG、FlClash 与专属客户端',
    desc: '全面覆盖安卓手机与电视盒子的代理应用安装、省电优化与分应用代理技巧。',
    content: `
# Android 安卓平台客户端指南

## 推荐选择

1. **机场官方专属 APK**（如光速云、飞猫云）：适合小白，下载登录即可使用。
2. **FlClash Android**：界面清爽，支持分流策略组。
3. **v2rayNG**：轻量稳定，对系统省电优化兼容极好。
`
  },
  {
    path: 'clients/ios.md',
    title: 'iOS / iPad 苹果客户端选型指南｜Shadowrocket、Stash 与 Quantumult X',
    desc: '对比 iOS 平台四大神器：小火箭、Stash、圈X与 Surge，满足不同层次出海需求。',
    content: `
# iOS / iPad 苹果客户端选型指南

## 四大神器对比一览

- **Shadowrocket ($2.99)**：性价比最高，功能最全，普及率最广。
- **Stash ($3.99)**：Clash 规则在 iOS 上的最佳平替，策略组还原度极高。
- **Quantumult X ($7.99)**：重度规则与脚本重写玩家神器。
- **Surge 5 ($49.99+)**：网络调试与顶级企业级工具。
`
  },
  {
    path: 'clients/macos.md',
    title: 'macOS 苹果电脑配置全指南｜Intel 与 Apple Silicon 适配方案',
    desc: '详解 Mac 平台下代理工具选型，解决 M1/M2/M3/M4 芯片架构匹配与系统权限配置。',
    content: `
# macOS 苹果电脑配置全指南

## 推荐选用 Clash Verge Rev for Mac

- 下载时注意认准 **\`-arm64.dmg\`**（针对 Apple Silicon M系列芯片）以获得原生能效与零转译损耗。
- Intel 老款机型请下载 **\`-x64.dmg\`**。
- 开启 TUN 模式时，需在“系统设置 ➔ 隐私与安全性 ➔ 辅助功能”中授予必要系统扩展权限。
`
  },
  {
    path: 'clients/openwrt.md',
    title: 'OpenWrt 软路由插件实战｜OpenClash、PassWall2 与透明网关配置',
    desc: '让局域网所有设备（电视盒子、游戏机、手机）无需配置即可自动出海的终极方案。',
    content: `
# OpenWrt 软路由插件实战

## 软路由三大主流插件对比

1. **OpenClash**：基于 Mihomo/Clash 内核，分流规则精准，支持 Fake-IP 与 Redir-Host 模式。
2. **PassWall2**：Xray/Sing-box 双核心，多节点负载均衡与分流非常灵活。
3. **Nikki**：轻量级现代配置，适合 OpenWrt 24.10+ 最新稳定版。
`
  },

  // --- ai-streaming (remaining) ---
  {
    path: 'ai-streaming/claude.md',
    title: 'Claude 封号与区域限制破解全攻略｜从干净 IP 到无痕配置',
    desc: '深度解析 Anthropic 严苛的风控机制，如何避免提示 Not available in your area。',
    content: `
# Claude 封号与区域限制破解全攻略

Claude 对节点地理位置与 IP 干净程度的要求堪称行业最高。

## Claude 核心防封守则
1. **绝不使用香港节点**：Anthropic 官方明确不支持中国大陆及港澳地区。
2. **锁定美国或英国本土 IP**：选择具备原生住宅出口的专线节点。
3. **防止 WebRTC 泄漏**：在浏览器安装 WebRTC Control 插件，禁止暴露本地内网真实物理 IP。
`
  },
  {
    path: 'ai-streaming/gemini.md',
    title: 'Google Gemini 节点选择规范｜解决无法使用与登录循环',
    desc: '针对 Google Gemini、Gemini Advanced 的网络环境搭建与账号定位设置。',
    content: `
# Google Gemini 节点选择规范

Google 会交叉比对您的 Google 账号注册地区、当前 IP 的 GeoIP 数据库定位以及本地 DNS 解析。
- **推荐节点**：美国洛杉矶、西雅图优化节点，或台湾原生节点。
- **重要配置**：在本地网卡属性中关闭“Internet 协议版本 6 (TCP/IPv6)”，防止 IPv6 泄露国内归属地。
`
  },
  {
    path: 'ai-streaming/netflix.md',
    title: 'Netflix 全球原创剧与非自制剧解锁技巧｜什么是真正的原生解锁？',
    desc: '区分“仅看自制剧（Netflix Originals）”与“全区解锁”，以及 DNS 解锁与原生 IP 解锁区别。',
    content: `
# Netflix 全球原创剧与非自制剧解锁技巧

## 为什么有些节点只能看 Netflix 自制剧？
如果 Netflix 识别出你的 IP 属于数据中心机房，它会隐藏所有第三方授权剧集（如《绝命毒师》、《生活大爆炸》），仅展示 Netflix 拥有全球版权的自制剧。
- **真正的全区解锁**：需要节点所属 IP 被 Netflix 标记为居民宽带或未被拉黑的商业 IP。
- 在本站评测中，标有“Netflix 全区解锁”的品牌（如光速云、微风网络）均已通过实机多剧集测试验证。
`
  },
  {
    path: 'ai-streaming/youtube.md',
    title: 'YouTube 4K/8K 极速秒开优化指南｜告别转圈与画质降级',
    desc: '深入剖析影响 YouTube 视频加载的 CDN 路由、连接速度（Connection Speed）与缓冲区健康度。',
    content: `
# YouTube 4K/8K 极速秒开优化指南

在 YouTube 视频右键点击 **“详细统计信息（Stats for nerds）”**，可以看到核心指标：
- **Connection Speed**：必须达到 60,000 Kbps 以上方可平稳运行 4K 60FPS。
- **Buffer Health**：健康缓冲区应维持在 15 秒以上。
- **优化方法**：优先选用延迟小于 40ms 的香港或日本专线节点；在浏览器实验选项开启 QUIC 协议。
`
  },
  {
    path: 'ai-streaming/disney.md',
    title: 'Disney+ 与 HBO Max 跨区解锁实测与设置',
    desc: '攻克 Disney+ 蓝屏、报错代码 83 以及 HBO Max 区域限制。',
    content: `
# Disney+ 与 HBO Max 跨区解锁实测与设置

Disney+ 使用严格的证书绑定和设备环境检测。
- 推荐使用新加坡或美国原生专线节点。
- 遇“Error 83”提示时，通常是当前 IP 触发了并发设备风控，更换同机房备用节点即可解决。
`
  },
  {
    path: 'ai-streaming/ip-purity.md',
    title: '住宅 IP 与原生 IP 纯净度检测指南｜常用工具与评分标准',
    desc: '手把手教你使用 IPQS、Scamalytics、IPinfo 检测节点的欺诈分与 ASN 属性。',
    content: `
# 住宅 IP 与原生 IP 纯净度检测指南

## 核心检测工具推荐

1. **Scamalytics (scamalytics.com)**：欺诈分数（Fraud Score）越低越好（0-20 为极度纯净）。
2. **IPinfo.io**：查看节点 ASN 属性，区分是 \`Hosting\`（机房）还是 \`ISP\`（居民宽带）。
3. **Whoer.net**：检查时区、DNS、系统语言的一致性比例（目标 100%）。
`
  },

  // --- network (remaining) ---
  {
    path: 'network/iplc.md',
    title: 'IPLC 跨境专线与物理光缆拓扑深度拆解',
    desc: '从海缆物理路由、入口中转到海外机房，揭开 IPLC 高昂成本与极致稳定性的秘密。',
    content: `
# IPLC 跨境专线与物理光缆拓扑深度拆解

IPLC（International Private Leased Circuit）是真正的跨境物理专线，租用跨国电信运营商的固定光纤通道。

## IPLC 的三大不可替代性
1. **完全脱离公网环境**：物理专线与普通互联网物理隔离。
2. **零抖动**：不会因外部国际光缆突发中断而导致剧烈震荡。
3. **确定性延迟**：上海到东京恒定 26ms，深圳到香港恒定 3-5ms。
`
  },
  {
    path: 'network/bgp.md',
    title: 'BGP 智能中转与多线接入原理解析',
    desc: '详解边界网关协议（BGP）在机场网络架构中的作用，如何实现电信、联通、移动多线智能就近接入。',
    content: `
# BGP 智能中转与多线接入原理解析

BGP（Border Gateway Protocol）是互联网的核心路由协议。
- **单线中转痛点**：若中转机房只有电信线路，移动用户访问就会跨网互联，导致延迟翻倍。
- **BGP 智能调度**：中转机房同时接入三网骨干光纤，无论用户本地是什么宽带，都能以最小跳数接入内网高速通道。
`
  },
  {
    path: 'network/hk-nodes.md',
    title: '香港节点低延迟与带宽特点深度解析',
    desc: '为什么香港节点是国内出海第一选择？CN2 GIA、CMI、HKIX 路由优势与晚高峰带宽特点。',
    content: `
# 香港节点低延迟与带宽特点深度解析

香港是距离中国大陆最近的国际互联网枢纽，也是绝大多数机场的“王牌节点”。
- **延迟极佳**：华南地区延迟普遍在 15-25ms，几乎等同于国内局域网体验。
- **适用场景**：日常网页浏览、远程办公、Google 搜索、YouTube 4K。
- **注意事项**：部分平台（如 Claude、TikTok）不支持香港 IP，需切换日本或美国。
`
  },
  {
    path: 'network/apac-nodes.md',
    title: '日本与新加坡亚太骨干网优势分析',
    desc: '对比东京与新加坡作为亚太枢纽的网络延迟、流媒体版权覆盖与外贸业务适配性。',
    content: `
# 日本与新加坡亚太骨干网优势分析

- **日本节点**：北方地区（北京、山东、东北）延迟更优（40-60ms），动漫、DMM、Netflix 原创剧版权最全。
- **新加坡节点**：东南亚外贸、TikTok 跨境电商直播首选，中文支持友好，对 ChatGPT 解锁稳定性高。
`
  },
  {
    path: 'network/us-nodes.md',
    title: '美国与欧洲骨干节点分析｜大带宽与 AI 生产力核心',
    desc: '美国洛杉矶、圣何塞以及德国法兰克福节点的带宽储备、跨太平洋光缆与全球服务支持。',
    content: `
# 美国与欧洲骨干节点分析

虽然美国节点物理延迟相对较高（140-180ms），但其带宽储备全球第一，且几乎所有 AI 平台（OpenAI, Claude, Midjourney）的原生服务器均部署于此。
- 适合大文件下载、GitHub 代码拉取、AI 深度生产力开发。
`
  },
  {
    path: 'network/multipliers.md',
    title: '倍率机制与偷跑流量防范｜看清节点后面的 0.1x 与 5x 陷阱',
    desc: '揭秘机场节点倍率计算公式，如何审计本地流量使用与账单扣费，防范隐蔽扣费。',
    content: `
# 倍率机制与偷跑流量防范

很多用户发现“明明只用了 10G 流量，套餐却扣了 50G”，原因就在于误连了**高倍率节点**。

## 什么是节点倍率？
- **1.0x 节点**：消耗 1GB 真实流量，扣减 1GB 套餐额度（标准节点）。
- **0.2x 节点**：消耗 1GB 真实流量，仅扣减 0.2GB 套餐额度（适合下载大文件）。
- **3.0x / 5.0x 节点**：专线或昂贵落地节点，消耗 1GB 扣减 3-5GB。
- **防范建议**：在客户端分组中隐藏超高倍率节点，日常优先连接 1.0x 标倍节点。
`
  },

  // --- tutorials (remaining) ---
  {
    path: 'tutorials/clash-rules.md',
    title: 'Clash 分流规则与策略组配置实战｜国内直连、海外加速全掌握',
    desc: '深入剖析 Rule-Providers、GeoIP 与 Domain 分流语法，打造零误伤的智能分流环境。',
    content: `
# Clash 分流规则与策略组配置实战

## 智能分流的三大基本逻辑

1. **DIRECT（直连）**：微信、淘宝、百度、Bilibili 等国内域名与 IP 直连，不消耗机场流量且满速。
2. **PROXY（代理）**：Google、YouTube、Twitter 等海外服务走指定加速节点。
3. **REJECT（拦截）**：自动过滤各类常见广告域名与追踪器。
`
  },
  {
    path: 'tutorials/tun-mode.md',
    title: 'TUN 虚拟网卡模式接管全局流量全攻略',
    desc: '解决命令行终端（CMD/PowerShell）、游戏客户端、UWP 应用不走代理的终极方案。',
    content: `
# TUN 虚拟网卡模式接管全局流量全攻略

普通“系统代理”仅对支持 HTTP 代理设置的浏览器有效，而 Git、终端、游戏和内网程序往往直接忽略系统代理。
- **TUN 虚拟网卡原理**：在操作系统核心创建虚拟网络接口，将所有三层网络数据包接管并注入代理内核。
- 在 Clash Verge Rev 中点击“服务模式”安装驱动，勾选“TUN 模式”即可一键开启。
`
  },
  {
    path: 'tutorials/multi-device.md',
    title: '多设备与局域网代理共享设置｜手机、电视盒子同享电脑节点',
    desc: '利用电脑开启 Allow LAN 局域网共享，让 PS5、Switch、Apple TV 免安装客户端直接加速。',
    content: `
# 多设备与局域网代理共享设置

1. 在电脑端 Clash 中勾选 **“允许局域网（Allow LAN）”**。
2. 查看电脑局域网 IP（如 \`192.168.1.100\`）及混合代理端口（默认 \`7890\`）。
3. 在同一局域网的手机或电视上，打开 WiFi 设置，配置手动代理，填入该 IP 与端口即可。
`
  },
  {
    path: 'tutorials/dns-leak.md',
    title: 'DNS 防泄漏与防污染高级配置｜基于 Fake-IP 与 DoH 架构',
    desc: '彻底根治 DNS 污染、ISP 域名劫持与真实物理位置泄漏的高阶技术指南。',
    content: `
# DNS 防泄漏与防污染高级配置

## 什么是 DNS 泄漏？
当您访问海外网站时，如果向国内运营商 DNS（如 114.114.114.114）查询该网站 IP，国内网络即刻知晓您的访问目标并下发虚假 IP（DNS污染）。
- **终极解决方案**：采用 **Fake-IP 模式** + **加密 DNS (DoH/DoT)**。
- 客户端在本地直接返回虚拟 IP（如 198.18.0.x），将真实域名带到海外专线节点端进行远程解析。
`
  },
  {
    path: 'tutorials/latency-testing.md',
    title: '节点测速与自动选择策略｜TCP Ping vs 真实 URL Test',
    desc: '弄清 TCP 握手延迟与真实 HTTP 下载延迟的区别，配置自动切换健康节点。',
    content: `
# 节点测速与自动选择策略

- **TCP Ping (握手延迟)**：仅测试本地到中转服务器的距离，数字很低但并不代表海外出口速度快。
- **URL Test (真实延迟)**：通过代理向 Google 或 Cloudflare 发送实际 HTTP HEAD 请求，反映端到端真实耗时。
- **自动选路配置**：在策略组中创建 \`url-test\` 类型分组，每 300 秒自动测试一次，自动锁定最快节点。
`
  },

  // --- troubleshooting (remaining) ---
  {
    path: 'troubleshooting/subscription-fail.md',
    title: '订阅链接更新失败与 SSL 报错系统化排查',
    desc: '解决提示 Network Error、SSL Handshake Failed 或返回空节点列表的常见故障。',
    content: `
# 订阅链接更新失败与 SSL 报错系统化排查

## 常见原因与解决步骤

1. **订阅链接被国内宽带阻断**：部分机场订阅域名被当地省份拦截，打开已有代理后再更新订阅，或联系客服获取备用短链接。
2. **本地时间误差**：校准 Windows/Mac 系统时间。
3. **套餐已欠费或流量耗尽**：登录机场官网后台检查套餐状态与到期时间。
`
  },
  {
    path: 'troubleshooting/no-internet.md',
    title: '开启代理后电脑无法上网排查｜网页打不开急救方案',
    desc: '最常见的“连上代理反而断网”故障排除，检查系统代理残留与网卡 DNS。',
    content: `
# 开启代理后电脑无法上网排查

## 核心排查清单

1. **检查节点是否全红**：若节点本身超时，请先切换其他绿色节点。
2. **清除系统代理残留**：在 Windows 设置 ➔ 网络和 Internet ➔ 代理中，确认无残留的废弃 127.0.0.1 端口。
3. **关闭其他杀毒冲突软件**：退出 360、腾讯管家等可能拦截本地回环流量的安全卫士。
`
  },
  {
    path: 'troubleshooting/dns-error.md',
    title: 'DNS 污染与域名解析报错排查指南',
    desc: '解决 DNS_PROBE_FINISHED_NXDOMAIN 或 ERR_NAME_NOT_RESOLVED 错误。',
    content: `
# DNS 污染与域名解析报错排查指南

- 打开命令提示符（CMD），运行 \`ipconfig /flushdns\` 清除本地 DNS 缓存。
- 在网卡 IPv4 设置中将首选 DNS 设为公共优质 DNS（如 \`223.5.5.5\` 或 \`119.29.29.29\`）。
`
  },
  {
    path: 'troubleshooting/client-crash.md',
    title: '客户端闪退与系统防火墙拦截处理',
    desc: '修复 Clash Verge Rev / v2rayN 闪退、缺少 VC++ 运行库与内核退出问题。',
    content: `
# 客户端闪退与系统防火墙拦截处理

- **缺少 Visual C++ 运行库**：安装微软官方 Visual C++ 2015-2022 Redistributable。
- **被 Defender 误杀内核**：在 Windows 安全中心将软件所在文件夹添加至“排除项（Exclusion）”。
`
  },
  {
    path: 'troubleshooting/speed-slow.md',
    title: '晚高峰速度骤降与丢包优化技巧',
    desc: '晚高峰看视频卡顿、掉线的针对性调优方案与备用线路切换技巧。',
    content: `
# 晚高峰速度骤降与丢包优化技巧

- 避开拥挤的热门“香港 01”节点，手动切换到“香港 05”、“台湾 02”或“新加坡”节点。
- 检查本地 WiFi 信号干扰，尽量插网线或连接 5GHz WiFi 频段。
- 开启 TUN 模式以消除系统代理栈的额外系统调度开销。
`
  },
  {
    path: 'troubleshooting/ai-block.md',
    title: 'AI 与流媒体突然提示不可用排查',
    desc: '解决 ChatGPT 提示 1020、Claude 页面崩溃与 Netflix 仅能看自制剧问题。',
    content: `
# AI 与流媒体突然提示不可用排查

- 切换至标有 [GPT] 或 [NF] 的专用原生节点。
- 打开浏览器隐身无痕窗口（Incognito）尝试，排除本地已缓存的 Cookie 风控标记。
- 在客户端分流规则中将相应平台域名强制指定走特定节点。
`
  },

  // --- safety (remaining) ---
  {
    path: 'safety/pitfalls.md',
    title: '低价机场十大常见虚假套路拆解',
    desc: '揭秘假专线、偷跑倍率、虚标带宽、僵尸客服等行业灰色陷阱。',
    content: `
# 低价机场十大常见虚假套路拆解

1. **挂羊头卖狗肉的“假专线”**：将普通公网中转命名为“IEPL专线”。
2. **暗调倍率**：夜间悄悄将节点倍率调为 3x/5x 快速吞噬用户流量。
3. **无限流量圈钱**：宣称“几十元永久无限流量”，几个月后直接关站。
4. **客服机器人伪装**：工单全部为预设模板自动回复，无人跟进真实线路故障。
`
  },
  {
    path: 'safety/refund.md',
    title: '退款维权与争议解决原则｜机场不退款该如何维权？',
    desc: '虚拟网络服务购买后的维权途径、支付宝/微信争议申诉及合理预期。',
    content: `
# 退款维权与争议解决原则

由于网络代理服务的特殊性，行业惯例通常在服务交付后**不支持无理由退款**。
- **最佳避险方案**：在购买前坚持“小额月付先测后买”，确认符合需求再续费。
- **如果发生恶意欺诈**：若刚付款后立即关站，可通过支付渠道发起商户欺诈投诉。
`
  },
  {
    path: 'safety/privacy.md',
    title: '隐私安全与防日志追查规范｜如何保护个人出海隐私？',
    desc: '科学上网过程中的防关联、端到端加密、防指纹追踪与账号隔离规范。',
    content: `
# 隐私安全与防日志追查规范

## 个人隐私安全三大纪律
1. **工作与私人网络隔离**：不混用公司机密业务与个人娱乐节点。
2. **严禁在非加密 HTTP 环境输入密码**：确保所有出海网站均带有 HTTPS 小绿锁。
3. **注册机场使用独立专用邮箱**：避免使用日常包含个人姓名的主邮箱注册。
`
  },
  {
    path: 'safety/status-monitor.md',
    title: '品牌运营长效稳定性监测体系｜32家品牌生命力指数',
    desc: '介绍本站如何通过 7x24 小时节点探针、工单响应速度与社群活跃度监测品牌运营健康度。',
    content: `
# 品牌运营长效稳定性监测体系

本站建立全网自动化监测机器人（MAI-TEST-BOT），持续记录 32 家品牌的运行状态：
- 节点可用性 SLA 跟踪。
- 官网镜像解析状态。
- 优惠活动真实性核验。
`
  }
];

// Write remaining pages
remainingPages.forEach(item => {
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

console.log(`Successfully generated ${remainingPages.length} remaining topic pages!`);
