---
title: Clash规则分流引擎实战｜Direct、Proxy、Reject语法与策略组调优指南
description: 深度剖析 Clash / Mihomo 核心分流引擎。详解 DIRECT 直连、PROXY 代理、REJECT 广告拦截三大底层行为、GEOIP 与 Rule-Providers 动态规则集编写以及策略组高可用负载均衡实战。
keywords: Clash规则, Clash分流, 策略组配置, Rule-Providers, DIRECT直连, REJECT广告拦截, Clash教程, Mihomo分流
date: 2026-03-28
author: 机场SEO技术实验室
---

# Clash规则分流引擎实战：Direct、Proxy、Reject语法与策略组调优指南

::: tip 💡 核心结论与速查法则
- **分流三剑客**：`DIRECT`（直连，国内服务不消耗代理流量）、`PROXY`（走代理节点）、`REJECT`（拒绝连接，实现系统级广告与隐私追踪拦截）。
- **终极黄金原则（从精确到模糊）**：Clash 的规则自上而下按序匹配，**一旦命中立即生效并退出匹配**。必须将最具体的子域名（`DOMAIN`）写在最前，广义后缀（`DOMAIN-SUFFIX`）居中，`GEOIP` 靠后，`MATCH`（兜底规则）永远置于最底端。
- **现代化 Rule-Providers 替代老旧硬编码**：切忌在本地 YAML 中硬编码数万行规则。使用现代远程规则集（Rule-Providers），实现国内流媒体、国际 AI、广告黑名单的静默自动增量更新。
- **策略组灵魂**：不要将所有节点一股脑放在一个选择器中。区分【日常主力】、【国际媒体】、【AI 工具】、【兜底直连】，方可发挥顶级机场的极致性能。
:::

<div class="affiliate-disclosure-banner">
  <strong>技术开发规范：</strong> 本文基于 Mihomo（Clash.Meta）开源核心最新语法标准（Premium Spec）编写，经 Clash Verge Rev、Stash 与 ShellCrash 跨平台验证通过。
</div>

---

## 一、Clash 规则引擎底层匹配逻辑

Clash 能够成为翻墙生态的绝对中枢，归功于其优雅的“数据包分流状态机”。当应用程序发起 DNS 查询或 TCP 握手时，Clash 按照预设规则对数据包进行审查与导向。

```
Clash 规则引擎判定执行流程树：
[应用程序发起连接请求] (例如: bilibili.com 或 chatgpt.com)
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ 第一阶段：规则列表逐行遍历（从上至下执行）                 │
├────────────────────────────────────────────────────────┤
│ 1. 匹配 DOMAIN-SUFFIX, bilibili.com ──> 命中 DIRECT！   │ ──> [国内网卡直接发送，不消耗流量]
│ 2. 匹配 DOMAIN-KEYWORD, openai ─────> 命中 PROXY-AI！ │ ──> [路由至美国/日本专用 AI 专线]
│ 3. 匹配 GEOSITE, category-ads-all ──> 命中 REJECT！   │ ──> [本地丢弃数据包，屏蔽广告]
│ 4. 匹配 GEOIP, CN ──────────────────> 命中 DIRECT！   │ ──> [国内 IP 直连]
│ 5. 遍历结束均未命中 ────────────────> 触发 MATCH 兜底 │ ──> [路由至 PROXY 主力策略组]
└────────────────────────────────────────────────────────┘
```

---

## 二、核心匹配类型语法与使用规范

在自定义规则时，最常用的 6 种匹配规则语法如下：

| 规则类型 | 语法示例 | 匹配范畴与逻辑 | 最佳适用场景 |
| :--- | :--- | :--- | :--- |
| **`DOMAIN`** | `DOMAIN,www.google.com,PROXY` | 严格完整匹配该域名，多一个字母都不算 | 特定单个敏感主机或登录入口 |
| **`DOMAIN-SUFFIX`** | `DOMAIN-SUFFIX,apple.com,DIRECT` | 匹配该主域名及其所有子域名（如 `icloud.apple.com`） | 绝大部分大型网站与云服务分流 |
| **`DOMAIN-KEYWORD`** | `DOMAIN-KEYWORD,google,PROXY` | 域名只要包含该字符串即命中 | 品牌衍生服务（谨慎使用防误杀） |
| **`IP-CIDR`** | `IP-CIDR,192.168.0.0/16,DIRECT` | 匹配特定网段的 IPv4 数据包（免走代理） | 局域网设备互通、NAS 与打印机 |
| **`GEOIP`** | `GEOIP,CN,DIRECT` | 根据 MaxMind 数据库判断目标 IP 属于中国大陆 | 绝大多数国内小众网站自动直连 |
| **`MATCH`** | `MATCH,Final-Group` | 规则列表最后一行，未命中前面规则的全部走此组 | 最终兜底防漏网之鱼 |

---

## 三、现代化 Rule-Providers 动态规则集配置模板

现代化配置文件早已摒弃单文件上万行的大杂烩，转而采用模块化的 `rule-providers`。以下为经过实验室长期调优的经典生产环境配置骨架：

```yaml
# 机场SEO实验室推荐：模块化高质量分流骨架 (Mihomo/Clash)
proxy-groups:
  # 1. 顶级主控策略组
  - name: 🚀 节点选择
    type: select
    proxies:
      - ♻️ 自动优选
      - 🇭🇰 香港 IEPL 专线
      - 🇯🇵 日本 专线
      - 🇺🇸 美国 原生
      - DIRECT

  # 2. 智能延迟自动选路
  - name: ♻️ 自动优选
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
      - 🇭🇰 香港 IEPL 专线
      - 🇯🇵 日本 专线

  # 3. 专属 AI 分流（严格绕开香港）
  - name: 🤖 人工智能
    type: select
    proxies:
      - 🇺🇸 美国 原生
      - 🇯🇵 日本 专线

# 远程动态规则集引入
rule-providers:
  reject:
    type: http
    behavior: domain
    url: "https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400

  openai:
    type: http
    behavior: classical
    url: "https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt"
    path: ./ruleset/openai.yaml
    interval: 86400

# 严格按序执行的规则列表
rules:
  # 本地局域网强制直连
  - IP-CIDR,127.0.0.0/8,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT
  - IP-CIDR,10.0.0.0/8,DIRECT

  # 拦截广告追踪
  - RULE-SET,reject,REJECT

  # AI 工具指定策略组
  - DOMAIN-SUFFIX,chatgpt.com,🤖 人工智能
  - DOMAIN-SUFFIX,openai.com,🤖 人工智能
  - DOMAIN-SUFFIX,claude.ai,🤖 人工智能
  - DOMAIN-SUFFIX,anthropic.com,🤖 人工智能

  # 国内服务直连
  - GEOIP,CN,DIRECT

  # 兜底全走通用代理
  - MATCH,🚀 节点选择
```

---

## 四、策略组类型选型与防踩坑指南

策略组（Proxy Groups）控制着数据包在多个节点之间的流转行为：

1. **`select`（手动选择）**：
   最稳妥的模式，完全由用户在界面上点击指定节点。适合作为顶级总开关。
2. **`url-test`（自动测速选优）**：
   定期向测试 URL 发送握手请求，自动将流量切换至延迟最低的节点。
   - **避坑提示**：`tolerance`（容差）必须设置为 `50ms` 以上！否则如果两个节点延迟只差 2ms，策略组会频繁来回跳跃切换，导致你的网页登录状态（Cookie/Session）反复掉线失效。
3. **`fallback`（故障回退）**：
   按顺序排列节点。平时始终走第一个节点，只有当第一个节点彻底宕机断连时，才自动无缝顺延到第二个备用节点。**这是最适合外贸与关键业务的高可用架构**。

---

## 五、三级内容拓扑与深度文章规划

```
Clash 规则引擎进阶知识库
├── 核心架构与扩展语法
│   ├── [Mihomo（Clash.Meta）独占高级语法：Sub-Rules 子规则集深度剖析](/tutorials/mihomo-sub-rules)
│   ├── [Geosite 与 GeoIP 数据库本地解析与 GeoX 二进制优化加速](/tutorials/geosite-geox-performance)
│   └── [Process-Name：基于本地进程名字（如微信直连/浏览器代理）的分流配置](/tutorials/process-name-routing)
├── 策略组架构设计
│   ├── [打造零掉线的高可用网络：Fallback 故障漂移策略组实操](/tutorials/clash-fallback-setup)
│   └── [分流防误杀：如何优雅解决知乎、B站被误判为海外代理的问题](/tutorials/unblock-bilibili-rules)
└── 自动化与同步
    └── [使用 GitHub Actions 自动构建专属轻量化 Clash 订阅规则](/tutorials/github-actions-clash-rules)
```

### 规划扩展三级文章清单
1. **《Mihomo Sub-Rules 子规则集深度剖析》**：讲解类似 Surge 的逻辑与或非嵌套分流，URL: `/tutorials/mihomo-sub-rules`，定位：技术专家型，优先级：P2。
2. **《基于本地进程名的分流配置指南》**：实现指定应用绕过代理，URL: `/tutorials/process-name-routing`，定位：实用操作型，优先级：P1。
3. **《打造零掉线高可用：Fallback 策略组实操》**：保障跨境办公不中断的终极配置，URL: `/tutorials/clash-fallback-setup`，定位：商业运维型，优先级：P0。
4. **《分流防误杀：解决国内网站被误走海外的套路》**：针对 CDN 节点判断失误的修复方案，URL: `/tutorials/unblock-bilibili-rules`，定位：日常排障型，优先级：P1。

---

## 六、常见问题深度解答 (FAQ)

<details>
<summary><strong>Q1：为什么我配置了国内直连，但用国内测速网测出来的 IP 还是变成了海外？</strong></summary>
<p>
这绝大多数是因为你的<strong>规则顺序写错了</strong>。如果你把 <code>MATCH,🚀 节点选择</code> 写在了 <code>GEOIP,CN,DIRECT</code> 的前面，那么所有国内流量在还没有匹配到 GEOIP 规则之前，就已经被 MATCH 拦截并送往海外代理了。切记检查你的配置文件，确保直连规则在兜底规则的上方。
</p>
</details>

<details>
<summary><strong>Q2：使用 rule-providers 会导致客户端启动变慢吗？</strong></summary>
<p>
首次拉取规则时需要下载数十 KB 的规则文件，可能会耗费 1–2 秒。但下载完成后，Clash 会在本地硬盘自动建立二进制缓存（如 <code>.ruleset/*.yaml</code>），后续启动均为毫秒级本地直接加载，完全不会影响系统性能与内存占用。
</p>
</details>
