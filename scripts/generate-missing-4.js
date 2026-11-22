import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

const missing = [
  {
    path: 'vpn/mobile.md',
    title: '手机与平板端网络加速选型指南｜iOS 与 Android 最佳实践',
    desc: '全方位梳理 iPhone、iPad 与安卓手机端网络加速配置方案，省电优化与分应用代理技巧。',
    content: `
# 手机与平板端网络加速选型指南

移动端（iOS 与 Android）在出海加速时，核心挑战在于**耗电量控制、后台常驻保活与智能规则分流**。

## 一、iOS / iPad 平台方案
- 首选客户端为 **Shadowrocket（小火箭）** 或 **Stash**。
- 采用 Network Extension 框架，在系统设置中建立本地虚拟 VPN 配置，将海外流量加密分流。
- 建议开启“按需连接（On-Demand）”，进入 WiFi 自动按规则启用代理。

## 二、Android 安卓平台方案
- 推荐使用 **FlClash** 或 **v2rayNG**。
- 支持“分应用代理（Per-App Proxy）”，仅让 Twitter、YouTube、Telegram 走代理，微信与支付宝保持国内直连，节省电量。

[返回 VPN 专题](/vpn/) ｜ [客户端下载](/clients/)
`
  },
  {
    path: 'vpn/pc.md',
    title: 'PC 电脑端加速环境搭建指南｜Windows 与 Mac 桌面端全覆盖',
    desc: '系统级代理与 TUN 模式的区别，解决浏览器畅通但开发工具、Git 与游戏无法出海的问题。',
    content: `
# PC 电脑端加速环境搭建指南

在桌面 PC 端，很多命令行工具（Git, pip, npm）或专业软件不会主动读取系统代理设置。

## 两种主要模式对比

1. **系统代理模式（System Proxy）**：
   - 仅对遵循 Windows/macOS 系统代理的浏览器生效。
   - 优点：轻量无须驱动，开箱即用。
   - 缺点：命令行、SSH、游戏无法走代理。
2. **TUN 虚拟网卡模式（TUN Mode）**：
   - 接管操作系统三层网络数据包，将电脑所有流量统一注入 Mihomo 内核进行分流。
   - 终极解决 Git 克隆卡死、Docker 镜像拉取超时和游戏联机问题。

[Clash Verge Rev TUN 模式实战](/clients/clash-verge-rev)
`
  },
  {
    path: 'vpn/gaming.md',
    title: '外服联机游戏加速器选择技巧｜代理机场能代替游戏加速器吗？',
    desc: '深入对比普通机场代理与专业网游加速器在 UDP 转发、NAT 类型与丢包优化上的区别。',
    content: `
# 外服联机游戏加速器选择技巧

很多玩家好奇：“我已经买了专线机场，还能用来玩 Steam 外服对战或主机联机吗？”

## 机场代理打游戏的核心前提条件

1. **必须是 IPLC/IEPL 专线**：普通公网中转晚高峰抖动大，会导致游戏持续跳 ping 或瞬移。
2. **必须支持 Full Cone NAT (全锥形 NAT)**：保证游戏语音与 P2P 联机（如《使命召唤》、《Apex 英雄》）顺畅握手。
3. **客户端必须开启 TUN 模式或配合 SSTap**：游戏通常走 UDP 协议，普通 HTTP 系统代理无法拦截游戏进程流量。

[微风网络低延迟游戏专线实测](/reviews/weifeng)
`
  },
  {
    path: 'safety/alternatives.md',
    title: '失联与故障平替机场储备库｜关键时刻无缝切换不掉线',
    desc: '如何建立自己的灾备机场梯队，在主用机场遭遇封锁或机房故障时 10 秒内恢复工作。',
    content: `
# 失联与故障平替机场储备库

“鸡蛋不能放在同一个篮子里”。无论是跨境外贸团队还是严肃科研开发，网络失联的隐性成本极高。

## 平替机场储备原则

1. **不同网络骨干**：主力机场如果是广州入口 IEPL，备用机场建议选择上海或北京入口。
2. **不同运营主体**：坚决不买同系或同一上游机房的“姐妹机场”。
3. **搭配不限时永久包**：备用机场建议常备 [光速云 147 永久套餐](/reviews/guangsu) 或 [星岛梦永久包](/reviews/xingdaomeng)，无须月度续费，随时可用。

[查看主力备用双梯配置实战](/airport/backup)
`
  }
];

missing.forEach(item => {
  const p = path.join(baseDir, item.path);
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, `---
title: ${item.title}
description: ${item.desc}
---

${item.content.trim()}
`, 'utf-8');
});

console.log(`Successfully generated the 4 missing pages!`);
