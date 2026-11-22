---
title: "sing-box 通用 JSON 配置从入门到精通教程｜下一代通用代理核心实战"
description: "sing-box 作为当下性能最强劲、内存占用极低的下一代通用代理客户端，如何手把手编写生产级 JSON 配置文件？从 inbounds 入站、outbounds 出站、route 规则引擎到 rule_set 规则集全流程深度拆解。"
keywords: "sing-box教程, sing-box配置, sing-box JSON语法, VLESS Reality配置, sing-box分流, rule_set"
---

# sing-box 通用 JSON 配置从入门到精通教程：下一代通用代理核心实战

> **核心结论速览（Answer-First）**：  
> **sing-box 是由 SagerNet 核心团队打造的下一代开源通用代理网络平台**。与基于 Go-lang 早期架构的 Clash 相比，sing-box 采用了极致模块化的微内核重构，原生支持最新的 **VLESS-Reality、Shadowsocks-2022、Hysteria 2、TUIC v5** 等前沿抗审查协议。在处理万级并发连接时，sing-box 的内存开销比传统 Clash 降低 40% 以上，GC 垃圾回收延迟近乎为零。掌握其配置的核心在于理解其 JSON 文件的四大顶层对象：**`inbounds`（本地监听入站）、`outbounds`（节点与出站策略）、`route`（路由分流规则）以及 `dns`（内置安全域名解析引擎）**。

---

## 一、sing-box 核心工作流与架构思维模型

传统的代理工具往往将 DNS 与路由混杂在一起，而 sing-box 实现了严格的职责解耦：

\`\`\`mermaid
flowchart TD
    App[应用程序/浏览器流量] --> In[Inbounds 入站侦听: mixed/tun]
    In --> DnsCheck{是否为域名请求?}
    DnsCheck -->|是| DNS[DNS 引擎: 直连国内 AliDNS / 远程代理 Cloudflare]
    DnsCheck -->|否/解析后| Route[Route 路由引擎: 匹配 rule_set / geosite / geoip]
    Route -->|匹配直连规则| OutDirect[Outbound: direct]
    Route -->|匹配代理规则| OutProxy[Outbound: proxy 节点选择器/容灾]
    Route -->|匹配广告拦截| OutBlock[Outbound: block]
    OutDirect --> Internet[国内互联网]
    OutProxy --> GlobalNet[跨境国际互联网]
\`\`\`

---

## 二、生产级通用 JSON 配置完整模板解析

以下为一个适用于 Windows、macOS 及 Linux 平台的标准全功能生产配置（基于 sing-box 1.9+ / 1.10+ 标准）：

\`\`\`json
{
  "log": {
    "disabled": false,
    "level": "info",
    "timestamp": true
  },
  "dns": {
    "servers": [
      {
        "tag": "dns_direct",
        "address": "https://223.5.5.5/dns-query",
        "detour": "direct"
      },
      {
        "tag": "dns_proxy",
        "address": "https://1.1.1.1/dns-query",
        "detour": "proxy"
      },
      {
        "tag": "dns_block",
        "address": "rcode://success"
      }
    ],
    "rules": [
      {
        "outbound": "any",
        "server": "dns_direct"
      },
      {
        "clash_mode": "Global",
        "server": "dns_proxy"
      },
      {
        "clash_mode": "Direct",
        "server": "dns_direct"
      },
      {
        "rule_set": "geosite-category-ads-all",
        "server": "dns_block"
      },
      {
        "rule_set": "geosite-cn",
        "server": "dns_direct"
      }
    ],
    "final": "dns_proxy",
    "strategy": "prefer_ipv4"
  },
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080,
      "sniff": true,
      "sniff_override_destination": true
    },
    {
      "type": "tun",
      "tag": "tun-in",
      "interface_name": "singbox-tun",
      "inet4_address": "172.19.0.1/30",
      "auto_route": true,
      "strict_route": true,
      "stack": "system",
      "sniff": true
    }
  ],
  "outbounds": [
    {
      "type": "selector",
      "tag": "proxy",
      "outbounds": [
        "auto-fallback",
        "node-guangsu-hk-01",
        "node-guangsu-jp-01",
        "direct"
      ],
      "default": "auto-fallback"
    },
    {
      "type": "urltest",
      "tag": "auto-fallback",
      "outbounds": [
        "node-guangsu-hk-01",
        "node-guangsu-jp-01"
      ],
      "url": "https://www.gstatic.com/generate_204",
      "interval": "3m",
      "tolerance": 50
    },
    {
      "type": "vless",
      "tag": "node-guangsu-hk-01",
      "server": "hk.gsy-node.com",
      "server_port": 443,
      "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "flow": "xtls-rprx-vision",
      "tls": {
        "enabled": true,
        "server_name": "www.apple.com",
        "utls": {
          "enabled": true,
          "fingerprint": "chrome"
        },
        "reality": {
          "enabled": true,
          "public_key": "YOUR_REALITY_PUBLIC_KEY",
          "short_id": "0123456789abcdef"
        }
      }
    },
    {
      "type": "direct",
      "tag": "direct"
    },
    {
      "type": "block",
      "tag": "block"
    },
    {
      "type": "dns",
      "tag": "dns-out"
    }
  ],
  "route": {
    "rule_set": [
      {
        "tag": "geosite-category-ads-all",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-category-ads-all.srs",
        "download_detour": "proxy"
      },
      {
        "tag": "geosite-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-cn.srs",
        "download_detour": "proxy"
      },
      {
        "tag": "geoip-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geoip/rule-set/geoip-cn.srs",
        "download_detour": "proxy"
      }
    ],
    "rules": [
      {
        "protocol": "dns",
        "outbound": "dns-out"
      },
      {
        "rule_set": "geosite-category-ads-all",
        "outbound": "block"
      },
      {
        "rule_set": "geosite-cn",
        "outbound": "direct"
      },
      {
        "rule_set": "geoip-cn",
        "outbound": "direct"
      },
      {
        "ip_is_private": true,
        "outbound": "direct"
      }
    ],
    "final": "proxy",
    "auto_detect_interface": true
  }
}
\`\`\`

---

## 三、四大核心配置模块深度解析

### 1. `inbounds`（入站监听）
- 建议配置两个入站：一个为通用混合端口（`type: mixed`），同时支持 HTTP 代理与 SOCKS5 代理；
- 另一个为虚拟网卡模式（`type: tun`），开启 `strict_route: true` 与 `auto_route: true`，能够将系统全局未遵循代理协议的流量（如 Git、终端、联机游戏）透明截获。

### 2. `dns`（内置域名解析分流）
- sing-box 最大的技术亮点在于支持对 DNS 查询执行精细化分流路由：
- 访问国内网站走阿里 DNS（`223.5.5.5`）以获得 CDN 就近加速；
- 访问境外网站通过 `detour: proxy` 隧道发送给 Cloudflare（`1.1.1.1`）完成防污染解析，从物理底层杜绝 DNS 泄露。

### 3. `outbounds`（出站节点与选择器）
- 支持 `selector`（手动手动选择节点）与 `urltest`（自动延迟探针测速选择）；
- 完美适配 VLESS-Reality 架构，通过借用真实网站（如 `www.apple.com`）的 TLS 握手证书，防 GFW 主动嗅探能力极强。

### 4. `route` 与 `rule_set`（规则集）
- sing-box 摒弃了早期逐条文本匹配的低效方式，采用了高性能的预编译二进制规则集（`.srs` 格式）；
- 内存加载速度提升 10 倍以上，且支持后台自动静默拉取更新。

---

## 四、常见报错与故障修复（FAQ）

### Q1：启动时报错 `missing default outbound in selector`？
- **原因**：在 `selector` 类型的策略组中，没有指定 `default` 默认出站标签，或默认标签不在其 `outbounds` 数组列表中。

### Q2：开启 TUN 模式后电脑无法打开任何网页（DNS 瘫痪）？
- **修复**：检查 `route.rules` 中是否缺少放行 DNS 协议的规则：
  \`\`\`json
  { "protocol": "dns", "outbound": "dns-out" }
  \`\`\`
  若无此规则，DNS 流量会被错误递归重定向回 TUN，造成死循环。

---

## 五、相关推荐与延伸阅读
- [客户端软件生态全览与下载导航](/clients/)
- [光速云深度评测：全协议自研端与 sing-box 原生兼容](/reviews/guangsu)
- [Fake-IP 模式与防 DNS 泄露全流程](/tutorials/fake-ip-dns-anti-leak)
