const fs = require('fs');
const path = require('path');

const mapPath = path.join(__dirname, '..', 'data', 'keywords', 'article-keyword-map.json');
let mapData = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, 'utf8')) : [];

const newArticles = [
  {
    url: "/clients/macos-gatekeeper-bypass",
    title: "Mac 提示“应用已损坏无法打开”解决教程",
    primaryKeyword: "Mac应用已损坏",
    intent: "Troubleshooting",
    parentTopic: "05 客户端软件"
  },
  {
    url: "/ai-streaming/chatgpt-error-1020-fix",
    title: "ChatGPT 报 Access Denied 1020 修复指南",
    primaryKeyword: "ChatGPT 1020报错解决",
    intent: "Troubleshooting",
    parentTopic: "06 AI与流媒体"
  },
  {
    url: "/ai-streaming/netflix-unlock-check",
    title: "Netflix 只能看自制剧怎么办？非自制剧全区解锁检测与换节点方案",
    primaryKeyword: "Netflix只能看自制剧",
    intent: "Troubleshooting",
    parentTopic: "06 AI与流媒体"
  },
  {
    url: "/ai-streaming/disney-error-codes-fix",
    title: "Disney+ 报 Error 83 / Error 73 报错秒级修复与原生节点选型",
    primaryKeyword: "Disney+ Error 83修复",
    intent: "Troubleshooting",
    parentTopic: "06 AI与流媒体"
  },
  {
    url: "/tutorials/wintun-development-setup",
    title: "Windows 开启 TUN 虚拟网卡实战：Git/Docker/WSL2/终端开发全量加速",
    primaryKeyword: "Wintun配置教程",
    intent: "How-to",
    parentTopic: "08 使用教程"
  },
  {
    url: "/tutorials/fake-ip-dns-anti-leak",
    title: "Fake-IP 模式与防 DNS 泄露全流程",
    primaryKeyword: "Fake-IP原理与防DNS泄露",
    intent: "Informational",
    parentTopic: "08 使用教程"
  },
  {
    url: "/tutorials/allow-lan-proxy-sharing",
    title: "一台电脑翻墙全家共享：Clash Allow LAN 局域网代理给 Switch/PS5/电视教程",
    primaryKeyword: "Clash局域网共享代理",
    intent: "How-to",
    parentTopic: "08 使用教程"
  },
  {
    url: "/troubleshooting/single-thread-congestion-fix",
    title: "测速几百兆但网页卡顿？单线程拥塞与 TCP 调优深度指南",
    primaryKeyword: "测速快网页慢解决",
    intent: "Troubleshooting",
    parentTopic: "09 故障排查"
  },
  {
    url: "/safety/airport-runaway-early-warning",
    title: "机场跑路前兆量化指标与历史复盘：五大死亡征兆提前避坑",
    primaryKeyword: "机场跑路前兆",
    intent: "Informational",
    parentTopic: "10 风险与替代"
  },
  {
    url: "/safety/dual-airport-high-availability",
    title: "主备双机场高可用秒级容灾搭建指南：主力专线+不限时备用黄金组合",
    primaryKeyword: "双机场高可用容灾",
    intent: "How-to",
    parentTopic: "10 风险与替代"
  },
  {
    url: "/safety/tls-privacy-boundary",
    title: "机场站长能看到你的隐私吗？TLS 1.3 端到端加密与审计边界科普",
    primaryKeyword: "机场站长能看隐私吗",
    intent: "Informational",
    parentTopic: "10 风险与替代"
  },
  {
    url: "/vpn/full-cone-nat-gaming-guide",
    title: "电竞联机 Full Cone NAT 穿透优化：游戏加速与 NAT 模式配置",
    primaryKeyword: "Full Cone NAT游戏优化",
    intent: "How-to",
    parentTopic: "04 VPN与加速器"
  },
  {
    url: "/clients/sing-box-config-guide",
    title: "sing-box 通用 JSON 配置从入门到精通教程：下一代通用代理核心实战",
    primaryKeyword: "sing-box通用JSON配置",
    intent: "How-to",
    parentTopic: "05 客户端软件"
  },
  {
    url: "/ai-streaming/youtube-4k-buffering-fix",
    title: "YouTube 4K 频繁缓冲转圈丢帧排查指南：开启 QUIC 与 BBR 优化",
    primaryKeyword: "YouTube 4K卡顿优化",
    intent: "Troubleshooting",
    parentTopic: "06 AI与流媒体"
  },
  {
    url: "/network/us-latency-physics-limit",
    title: "美国节点为什么不可能低于 120ms？光速物理极限与跨洋海缆路由科普",
    primaryKeyword: "美国节点物理延迟极限",
    intent: "Informational",
    parentTopic: "07 线路与节点"
  }
];

// Append if not exists
for (const art of newArticles) {
  if (!mapData.some(m => m.url === art.url)) {
    mapData.push(art);
  }
}

fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 2), 'utf8');
console.log('Updated article-keyword-map.json with total items:', mapData.length);
