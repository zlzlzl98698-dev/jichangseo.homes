const fs = require('fs');
const path = require('path');

const articles = [
  {
    path: 'clients/macos-gatekeeper-bypass.md',
    content: `---
title: "Mac 提示“应用已损坏无法打开”解决教程｜一键清除 xattr 绕过 Gatekeeper"
description: "macOS 安装 Clash Verge、Shadowrocket、v2rayN 客户端时弹窗提示“应用已损坏，您应该将它移到废纸篓”怎么办？教你使用 xattr 命令一键绕过 Gatekeeper 隔离属性。"
keywords: "Mac应用已损坏, macOS Gatekeeper, xattr -cr, Mac无法打开Clash, 移到废纸篓"
---

# Mac 提示“应用已损坏无法打开”解决教程：一键清除 xattr 绕过 Gatekeeper

> **核心结论速览（Answer-First）**：  
> 在 macOS 13 (Ventura)、14 (Sonoma) 及最新系统上，安装第三方开源代理软件（如 Clash Verge Rev、Mihomo Party、v2rayU）时，系统常弹窗报错：**“应用已损坏，您应该将它移到废纸篓”**。这并不是软件真的损坏或包含病毒，而是因为开源开发者未向苹果支付每年 99 美元的开发者证书认证费用，触发了系统的 **Gatekeeper 隔离机制（Quarantine Attribute）**。只需打开“终端（Terminal）”，输入命令 \`sudo xattr -r -d com.apple.quarantine /Applications/软件名称.app\` 即可秒级解除限制。

---

## 一、报错原因深度剖析：什么是 Gatekeeper Quarantine？

当你在 Safari 或 Chrome 下载 \`.dmg\` 安装包并拖拽到「应用程序」目录时，macOS 会自动为该文件附加一个扩展文件属性：\`com.apple.quarantine\`。

| 场景 | 系统表现 | 真实原因 | 安全评估 |
| :--- | :--- | :--- | :--- |
| **App Store 下载应用** | 正常直接双击打开 | 苹果官方签名并公证 | 官方背书 |
| **已认证商业开发者** | 首次打开提示“从互联网下载” | 拥有 Apple Developer ID 签名 | 正常放行 |
| **GitHub 开源代理软件** | **强行拦截，提示应用已损坏** | **无签名或自签名被 Gatekeeper 拦截** | **开源可信，但被苹果视为未验证** |

::: warning 避免无脑关闭全局 Gatekeeper
部分教程建议小白运行 \`sudo spctl --master-disable\` 完全关闭系统安全保护。此举会导致整个系统对恶意流氓软件失去防线。**强烈推荐使用下文针对单款软件精准清除隔离属性的方案**。
:::

---

## 二、秒级解决实操步骤（针对单个软件）

### 步骤 1：打开终端（Terminal）
按下键盘上的 \`Command + 空格键\` 唤起 Spotlight 聚焦搜索，输入 \`Terminal\`（或“终端”），回车打开黑底命令行窗口。

### 步骤 2：执行精准去隔离命令
复制以下命令，粘贴至终端窗口（注意末尾有一个空格）：

\`\`\`bash
sudo xattr -r -d com.apple.quarantine 
\`\`\`

### 步骤 3：拖入目标应用程序
1. 打开 Finder（访达），进入左侧的「应用程序（Applications）」目录；
2. 找到提示损坏的软件图标（例如 \`Clash Verge.app\`）；
3. 用鼠标按住该图标，直接拖拽到终端窗口中，终端会自动补全该软件的绝对物理路径；
4. 此时命令看起来类似如下：
   \`\`\`bash
   sudo xattr -r -d com.apple.quarantine "/Applications/Clash Verge.app"
   \`\`\`
5. 按下回车键，系统会要求输入你的 Mac 开机登录密码（**注意：输入密码时屏幕不会显示任何字符或星号，直接盲打输完回车即可**）。

### 步骤 4：重新启动软件
命令执行完毕无任何报错输出即代表成功。返回「访达」双击软件，此时即可直接无阻碍秒开！

---

## 三、常用代理客户端一键复制命令合集

如果你安装的是以下常见客户端，可以直接复制对应单行命令在终端执行：

\`\`\`bash
# 1. Clash Verge Rev
sudo xattr -r -d com.apple.quarantine "/Applications/Clash Verge.app"

# 2. Mihomo Party
sudo xattr -r -d com.apple.quarantine "/Applications/Mihomo Party.app"

# 3. FlClash
sudo xattr -r -d com.apple.quarantine "/Applications/FlClash.app"

# 4. v2rayU
sudo xattr -r -d com.apple.quarantine "/Applications/v2rayU.app"

# 5. sing-box (图形客户端)
sudo xattr -r -d com.apple.quarantine "/Applications/Sing-Box.app"
\`\`\`

---

## 四、常见问题（FAQ）

### Q1：提示 "No such xattr: com.apple.quarantine" 是什么意思？
- 说明该软件已经被清除过隔离属性，或者本身并未被标记隔离。如果仍然无法打开，请检查「系统设置 -> 隐私与安全性 -> 安全性」，看底部是否有“仍要打开”按钮。

### Q2：每次软件升级后都需要重新运行命令吗？
- 如果是通过下载新版本 \`.dmg\` 覆盖安装，macOS 会重新附加隔离属性，需要重新运行一次命令；如果是客户端内部点击“自动检查更新”，通常无需再次运行。

---

## 五、相关推荐与延伸阅读
- [Clash Verge Rev 完整安装配置与内核切换教程](/clients/clash-verge-rev)
- [macOS 平台全代理客户端横向对比与选型指南](/clients/macos)
- [光速云深度评测：自研 macOS 原生免配置客户端](/reviews/guangsu)
`
  },
  {
    path: 'ai-streaming/chatgpt-error-1020-fix.md',
    content: `---
title: "ChatGPT 报 Access Denied 1020 修复指南｜节点纯净度检测与分流解决"
description: "访问 OpenAI 或 ChatGPT 官网时弹窗“Access denied Error code 1020”或“You do not have access to chatgpt.com”怎么办？手把手教你排查机房脏 IP、更换原生节点与修复分流规则。"
keywords: "ChatGPT 1020, Access Denied 1020, OpenAI禁止访问, ChatGPT更换节点, Cloudflare 1020"
---

# ChatGPT 报 Access Denied 1020 修复指南：节点纯净度检测与分流解决

> **核心结论速览（Answer-First）**：  
> 当打开 ChatGPT (chatgpt.com) 提示 **“Access denied Error code 1020”** 或 **“Our systems have detected unusual traffic from your network”** 时，核心原因在于你当前连接的代理节点 IP 被 Cloudflare 或 OpenAI 官方风控防火墙标记为**“黑名单机房数据中心（Data Center IP）”**或**“高风险机器人爬虫聚集段”**。解决方案按优先级为：**① 在客户端切换为原生家庭宽带（ISP/Residential）美国或日本节点；② 严格清除浏览器 chatgpt.com 域名下的全部 Cookie 与 LocalStorage；③ 检查分流规则，确保 OpenAI 所有关联域名未泄漏至香港节点直连。**

---

## 一、为什么会触发 1020 报错？OpenAI 封控机制揭秘

OpenAI 使用了 Cloudflare 企业级 Anti-Bot WAF（Web 应用防火墙），针对访问流量实施严格的信誉分打分机制：

| 评估维度 | 触发 1020 阻断的特征 | 正常放行通过的特征 |
| :--- | :--- | :--- |
| **IP 归属类型** | 便宜机房 VPS (OVH/Hetzner/Linode/AWS) | 住宅宽带 (AT&T/Comcast) 或高信誉商用专线 |
| **IP 并发请求量**| 单个公网 IP 承载几千名用户同时请求 ChatGPT | 单 IP 请求密度低，无异常爆破 |
| **地理位置合规性** | 命中国内、香港、俄罗斯、伊朗等服务未开放区 | 命中美国、日本、新加坡、英国、台湾开放区 |
| **浏览器指纹** | 无痕模式高频清空缓存、无历史 Cookie 沉淀 | 具备正常的正常用户访问行为与稳定指纹 |

---

## 二、三步黄金排查与秒级修复流程

### 步骤 1：一键检测当前出口 IP 的真实欺诈度
在连接代理的情况下，打开纯净度检测大厂网站：
- **IP 纯净度查询**：\`https://scamalytics.com/ip/你的IP\`
- **IP 风险评分标准**：
  - \`Fraud Score 0 - 25\`：极低风险（原生住宅宽带，100% 秒进 ChatGPT）；
  - \`Fraud Score 26 - 60\`：中度风险（偶尔弹出 Cloudflare 5秒盾勾选人机验证）；
  - \`Fraud Score 61 - 100\`：**极高风险（100% 触发 1020 拒绝访问或封号）**。

### 步骤 2：切换为优质专线机场的“原生落地节点”
低端廉价机场（如 1 元机场、公网直连中继）大多租用低成本机房，成千上万用户共享同一个 IP，必然被 OpenAI 列入黑名单。  
请在节点列表中优先寻找标注为 **“原生（ISP）”**、**“OpenAI 专属”** 或 **“US Residential”** 的节点。

### 步骤 3：重置浏览器环境（清除污染指纹）
有时即使切换了干净节点，浏览器中残留的 CF 拦截 Token 依然会持续触发阻断：
1. 在 Chrome/Edge 浏览器地址栏输入：\`chrome://settings/content/all?searchSubdomain=chatgpt.com\`；
2. 搜索并点击删除 **chatgpt.com** 和 **openai.com** 的所有存储数据与 Cookie；
3. 关闭浏览器，重新打开无痕窗口（Incognito）尝试登录。

---

## 三、相关推荐与延伸阅读
- [ChatGPT 精细化分流规则配置：避开香港节点直连](/tutorials/chatgpt-bypass-hk-rules)
- [Claude 3.7 防封号网络节点选型与实操策略](/ai-streaming/claude-anti-ban-strategy)
- [光速云深度评测：全节点原生解锁 OpenAI 与 Claude](/reviews/guangsu)
`
  },
  {
    path: 'ai-streaming/netflix-unlock-check.md',
    content: `---
title: "Netflix 只能看自制剧怎么办？非自制剧全区解锁检测与换节点方案"
description: "Netflix 奈飞登录后只能搜到《怪奇物语》《黑暗荣耀》等自制剧，搜不到《绝命毒师》《哈利波特》等第三方版权剧？深度科普 Netflix 原生 IP 解锁机制与检测方法。"
keywords: "Netflix只能看自制剧, 奈飞全区解锁, 原生IP检测, Netflix自制剧区别, Netflix解锁节点"
---

# Netflix 只能看自制剧怎么办？非自制剧全区解锁检测与换节点方案

> **核心结论速览（Answer-First）**：  
> 如果你在 Netflix（奈飞）上**只能搜索到带有红色“N”标志的官方自制剧**（如《怪奇物语》、《鱿鱼游戏》），而搜索不到《绝命毒师（Breaking Bad）》、《哈利·波特（Harry Potter）》或宫崎骏吉卜力动画，说明你当前使用的节点 IP **被 Netflix 判定为数据中心机房代理（VPN/Proxy Block）**。Netflix 对自制剧拥有全球版权，允许任何 IP 观看；但对第三方购买的版权剧有严格的分区授权，**只对被识别为“当地原生住宅家庭宽带”的 IP 开放**。解决办法只有一种：**切换支持 Netflix 全区解锁（非仅自制剧）的原生优质节点，或使用住宅 IP 中转**。

---

## 一、自制剧 vs 非自制剧：Netflix 版权防护真相

| 影视类型 | 包含作品示例 | 访问 IP 门槛 | 辨别方法 |
| :--- | :--- | :--- | :--- |
| **Netflix 官方自制剧 (Originals)** | 《黑镜》《王国》《纸钞屋》《黑暗荣耀》 | 极低（任何机房 IP 均可看） | 海报左上角带有红色 **“N”** 徽标 |
| **第三方授权版权剧 (Licensed Content)** | 《绝命毒师》《老友记》《行尸走肉》《名侦探柯南》 | **极高（必须为当地原生广播 IP）** | 无“N”标，不同国家片库完全不同 |

::: tip 极速验证技巧
打开 Netflix 搜索框，直接输入 **\`Breaking Bad\`**（绝命毒师）或 **\`The Office\`**。如果搜索结果里第一位不是该剧正片，而是推荐了一堆其他自制剧，说明你的节点**已被降级为“半解锁/仅自制剧”状态**。
:::

---

## 二、常见流媒体解锁检测脚本与工具

机场站长常宣称“全节点解锁 Netflix”，但实际往往只是“自制剧能开”。推荐使用以下客观脚本进行检测：

### 1. 终端命令行一键全区解锁检测（VPS / 软路由）
在 Linux 或 macOS 终端运行经典的开源流媒体检测脚本：
\`\`\`bash
bash <(curl -L -s media.ispvps.com)
\`\`\`
- 输出结果分析：
  - \`Netflix: Yes (Region: US / HK / JP)\` -> **真正全区原生解锁**；
  - \`Netflix: Originals Only\` -> **仅自制剧（假解锁）**；
  - \`Netflix: No\` -> 完全被封锁。

---

## 三、各地区片库特色与节点选型建议

1. **Netflix 香港（HK）**：拥有最丰富的中文字幕影视库，适合绝大多数华语影视爱好者；
2. **Netflix 日本（JP）**：独占大量新番动画、吉卜力工作室全系列动漫；
3. **Netflix 美国（US）**：全网片库数量最庞大，好莱坞大片上映最快，但部分冷门影片缺少官方中文字幕；
4. **Netflix 台湾（TW）**：繁体中文字幕齐全，独占大量台湾本土高口碑剧集与综艺。

---

## 四、相关推荐与延伸阅读
- [AI 与全球流媒体兼容性矩阵评测中心](/ai-streaming/)
- [寰球梯深度评测：主打日/美/韩/台多区流媒体原生解锁](/reviews/huanqiuti)
- [光速云深度评测：企业级专线 4K 秒开无缓冲实测](/reviews/guangsu)
`
  },
  {
    path: 'ai-streaming/disney-error-codes-fix.md',
    content: `---
title: "Disney+ 报 Error 83 / Error 73 报错秒级修复与原生节点选型"
description: "登录 Disney+ 提示“Error 83 (Device compatibility)”或“Error 73 (Location unavailable)”怎么办？全面解析 Disney Plus 严格的设备与地区风控机制。"
keywords: "Disney+ Error 83, Disney+ Error 73, Disney Plus无法播放, 迪士尼报错83, Disney+解锁节点"
---

# Disney+ 报 Error 83 / Error 73 报错秒级修复与原生节点选型

> **核心结论速览（Answer-First）**：  
> Disney+ 是全球对网络环境和设备指纹审查最为严苛的流媒体平台之一。其中：**Error 73 代表“地理位置不可用”**，说明你的代理节点出口 IP 未被列入 Disney+ 运营支持的国家/地区，或者该 IP 已经被列入黑名单；**Error 83 代表“设备指纹/安全认证失败”**，绝大多数情况下并非你的手机或电视硬件损坏，而是代理网络不稳定、IPv6 泄漏或使用了未通过 DRM 认证的客户端。快速修复方案：**关闭客户端 IPv6 协议、开启 Fake-IP 模式并切换为新加坡或美国原生专线节点**。

---

## 一、Disney+ 常见错误代码速查表

| 错误代码 | 官方表面含义 | 技术底层真实原因 | 根治解决方案 |
| :--- | :--- | :--- | :--- |
| **Error 73** | Service unavailable in your region | 节点出口 IP 未支持或被判定为跨区代购 | 切换为新加坡（SG）、美国（US）原生专线 |
| **Error 83** | Device compatibility issue | 节点中途断流、IPv6 路由泄露、DRM 证书失败 | 禁用代理客户端 IPv6、清空 App 缓存 |
| **Error 42** | Connection timeout | 节点至 Disney+ 边缘 CDN 的丢包率过高 | 更换低抖动的 IEPL/IPLC 物理专线 |
| **Error 14** | Password incorrect | 频繁跨国漂移导致账号触发风控冻结 | 固定同一节点登录，避免一小时内换三个国家 |

---

## 二、秒级修复实操指南

### 1. 禁用客户端 IPv6（防止真实位置暴露）
Disney+ 常利用双栈网络，通过未经过代理的直连 IPv6 探针获取用户的真实物理省份：
- **在 Clash Verge Rev 中**：进入「设置」->「DNS 设置」，关闭 \`IPv6\` 开关；
- **在 Shadowrocket 小火箭中**：进入「配置」->「本地 DNS」-> 关闭 \`IPv6 路由\`。

### 2. 电视盒子 (Apple TV / Android TV) 防报 Error 83
- 确保电视系统时间与代理节点的时区一致（例如连接美国节点，必须将系统时区改为美东或美西时间）；
- 开启代理客户端的 **TUN 虚拟网卡模式**，保证电视系统的全部后台系统请求均经由代理转发。

---

## 三、相关推荐与延伸阅读
- [AI 与流媒体解锁综合指南](/ai-streaming/)
- [微图云深度评测：4K/8K 视频流媒体专属大带宽管道](/reviews/weitu)
- [光速云深度评测：全协议多端原生支持 Disney+ 全系列](/reviews/guangsu)
`
  },
  {
    path: 'tutorials/wintun-development-setup.md',
    content: `---
title: "Windows 开启 TUN 虚拟网卡实战｜Git/Docker/WSL2/终端开发全量加速"
description: "在 Windows 下使用 Clash 开启系统代理后，CMD 终端、PowerShell、Git clone、Docker pull、WSL2 依然龟速或报错？手把手教你配置 Wintun 虚拟网卡接管所有流量。"
keywords: "Wintun配置教程, Clash TUN模式, Git加速, WSL2翻墙代理, Docker拉取镜像加速"
---

# Windows 开启 TUN 虚拟网卡实战：Git/Docker/WSL2/终端开发全量加速

> **核心结论速览（Answer-First）**：  
> Windows 系统自带的“系统代理（System Proxy）”仅对遵循 WinINET API 的传统浏览器有效。**CMD、PowerShell、Git、npm、Docker 及 WSL2 子系统完全忽略系统代理设置**，导致开发者即使开了代理也频繁遭遇 \`Failed to connect to github.com\` 或 \`connect: connection refused\`。**根本解决方案是开启代理客户端的 TUN（虚拟网卡）模式**。TUN 会在 Windows 内核中创建一张虚拟以太网卡（基于高吞吐驱动 **Wintun**），在三层网络协议（IP 层）透明捕获所有底层网络数据包，无需为每个开发工具单独配置烦琐的 \`http_proxy\` 环境变量。

---

## 一、传统代理 vs TUN 虚拟网卡模式对比

| 场景需求 | 传统系统代理 (System Proxy) | TUN 虚拟网卡模式 (Wintun) |
| :--- | :--- | :--- |
| **Chrome / Edge 网页浏览** | 完美支持 | 完美支持 |
| **Git Clone / Push** | 需单独设置 \`git config --global http.proxy\` | **开箱即用，自动原生满速加速** |
| **WSL2 (Ubuntu 子系统)** | 需编写脚本获取宿主机 IP 并配置端口转发 | **子系统所有流量完全无感透明代理** |
| **Docker Desktop Pull 镜像** | 需配置 JSON 代理参数，经常失效 | **底层自动透明接管** |
| **在线联机游戏 / UDP 数据包** | **完全不支持** | **全面支持 UDP 与 Full Cone NAT** |

---

## 二、Clash Verge Rev 开启 TUN 模式详细图文流程

### 步骤 1：安装核心服务与虚拟网卡驱动
1. 打开 **Clash Verge Rev** 客户端；
2. 点击左侧菜单栏进入 **「设置（Settings）」**；
3. 找到 **「服务模式（Service Mode）」** 项，点击右侧的 **「安装（Install）」**；
4. 此时 Windows 会弹窗 UAC 管理员权限提示，点击“是”。安装完成后，服务模式右侧的图标会变为绿色打勾状态；
5. 在下方找到 **「TUN 模式（TUN Mode）」**，将其开关向右滑动打开。

### 步骤 2：验证 TUN 虚拟网卡是否成功接管
按键盘 \`Win + X\` 打开菜单，选择并打开 **PowerShell**，运行以下命令：
\`\`\`powershell
Get-NetAdapter | Where-Object { $_.InterfaceDescription -like "*Wintun*" }
\`\`\`
如果命令行打印出名为 \`Meta\`、\`Clash\` 或 \`Wintun Userspace Tunnel\` 且状态为 **Up** 的网卡，说明 TUN 驱动已成功在内核接管网络。

### 步骤 3：实测 Git 与终端免配加速
直接在 PowerShell 中克隆一个 GitHub 大仓库：
\`\`\`bash
git clone https://github.com/torvalds/linux.git --depth=1
\`\`\`
速度将直接从龟速十几 KB/s 飙升至专线物理极限（几百 Mbps）！

---

## 三、常见问题（FAQ）

### Q1：开启 TUN 模式后电脑无法解析域名（DNS 瘫痪）？
- **原因**：这是因为默认的 Fake-IP 模式与本地网络 DNS 发生了冲突。进入「DNS 设置」，将内置 DNS 监听地址设为 \`127.0.0.1:1053\`，并勾选“覆盖操作系统 DNS”即可修复。

### Q2：公司内网 VPN 与 TUN 模式冲突断开怎么办？
- 进入客户端配置，在 TUN 排除路由（Strict Route / Route Exclude）中添加公司内网网段（如 \`10.0.0.0/8\` 或 \`192.168.0.0/16\`）。

---

## 四、相关推荐与延伸阅读
- [Clash Verge Rev 官方正版下载与高级配置教程](/clients/clash-verge-rev)
- [Fake-IP 模式与防 DNS 泄露全流程](/tutorials/fake-ip-dns-anti-leak)
- [光速云深度评测：全平台极客配置与企业专线加速](/reviews/guangsu)
`
  },
  {
    path: 'tutorials/fake-ip-dns-anti-leak.md',
    content: `---
title: "Fake-IP 模式与防 DNS 泄露全流程｜解析代理网络中的 DNS 污染与分流原理"
description: "为什么代理客户端有 Fake-IP 和 Redir-Host 两种 DNS 模式？为什么访问网站会发生 DNS 泄露暴露真实位置？手把手教你配置最安全、抗污染的 Fake-IP 模式。"
keywords: "Fake-IP原理, Redir-Host区别, DNS泄露检测, 防DNS污染, Clash DNS配置"
---

# Fake-IP 模式与防 DNS 泄露全流程：解析代理网络中的 DNS 污染与分流原理

> **核心结论速览（Answer-First）**：  
> 在 Clash 等现代分流核心中，**Fake-IP 模式相比传统的 Redir-Host 模式拥有压倒性优势**。在传统 Redir-Host 模式下，打开一个境外网站前，你的电脑必须先在本地发起 DNS 请求解析出真实境外 IP，这个过程**极易遭受 GFW 的 DNS 抢答投毒（DNS 污染），还会将你正在访问的网站域名直接泄漏给本地运营商（DNS Leak）**。而在 **Fake-IP 模式**下，客户端在本地瞬间返回一个保留私有虚拟 IP（如 \`198.18.0.x\`），建立 TCP 连接时直接将“域名本身”打包送入加密专线，交由境外落地节点代为向谷歌/Cloudflare 发起无污染解析。这样既消除了本地 DNS 查询延迟，又从物理层面杜绝了 DNS 泄露。

---

## 一、Fake-IP 与 Redir-Host 运行机制深度对比

\`\`\`mermaid
flowchart TD
    subgraph RedirHost["传统 Redir-Host 模式（易泄露、高延迟）"]
        A1[电脑发起请求 google.com] --> B1[本地向运营商/公网发 DNS 查询]
        B1 -->|经过 GFW| C1[遭到 DNS 投毒污染 或 本地记录泄露]
        C1 --> D1[解析得到错误 IP 或延迟飙升]
        D1 --> E1[通过代理连接目标]
    end

    subgraph FakeIP["现代化 Fake-IP 模式（零泄露、极速秒开）"]
        A2[电脑发起请求 google.com] --> B2[Clash 内核瞬间返回虚构 IP 198.18.0.12]
        B2 --> C2[浏览器立即与虚构 IP 握手]
        C2 --> D2[内核将真实域名封装进加密专线]
        D2 --> E2[境外落地服务器完成高精度无污染解析]
    end
\`\`\`

---

## 二、如何自测你的网络是否存在 DNS 泄露？

在开启代理的状态下，打开国际知名的 DNS 泄露检测工具：
1. 访问网站：\`https://browserleaks.com/dns\` 或 \`https://ipleak.net\`；
2. 观察页面下方显示的 **DNS Addresses**（DNS 服务器列表）；
3. **合格标准**：
   - 列表中显示的全部是 **Google (8.8.8.8)**、**Cloudflare (1.1.1.1)** 或 **境外机房的 DNS**；
   - **绝对不能出现中国电信（China Telecom）、中国联通（China Unicom）或中国移动（China Mobile）的境内 DNS**！如果出现境内 DNS，说明你访问境外网站的所有域名轨迹全被本地运营商明文记录。

---

## 三、标准 Fake-IP 防泄漏推荐配置（Clash YAML 范例）

在配置文件中，确保 \`dns\` 字段按如下参数设定：

\`\`\`yaml
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "localhost.ptlogin2.qq.com"
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
  nameserver:
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query
  fallback:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query
    - https://doh.opendns.com/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4
\`\`\`

---

## 四、相关推荐与延伸阅读
- [Clash Fallback 自动故障转移配置实战](/tutorials/clash-fallback-setup)
- [网络专线鉴别与真假 IPLC 实测指南](/network/fake-line-identification)
- [光速云深度评测：企业级 DNS 防污染与全自动解析](/reviews/guangsu)
`
  },
  {
    path: 'tutorials/allow-lan-proxy-sharing.md',
    content: `---
title: "一台电脑翻墙全家共享｜Clash Allow LAN 局域网代理给 Switch/PS5/电视教程"
description: "家里有多台设备（PS5、Nintendo Switch、Apple TV、智能电视）无法安装代理软件？教你利用一台运行 Clash 的电脑开启 Allow LAN 局域网共享，实现全屋设备极速跨国联机。"
keywords: "Allow LAN配置, Clash局域网共享, Switch翻墙, PS5加速代理, Apple TV代理设置"
---

# 一台电脑翻墙全家共享：Clash Allow LAN 局域网代理给 Switch/PS5/电视教程

> **核心结论速览（Answer-First）**：  
> 游戏主机（Nintendo Switch、PS5、Xbox）与部分智能电视由于系统封闭，无法直接安装 Clash 等代理客户端。最简便经济的方案是：**利用同一局域网（同一 Wi-Fi）内已经开着代理的电脑（Windows 或 Mac），在客户端中勾选“允许局域网连接（Allow LAN）”，然后在主机或电视的 Wi-Fi 设置中，将“HTTP 代理”指向电脑的局域网内网 IP（如 \`192.168.1.100\`）和代理端口 \`7890\`**。无需额外刷写软路由固件，即可实现主机商店极速秒开与联机抗延迟加速。

---

## 一、网络拓扑示意图

\`\`\`
[ 光猫 / 主路由器 (192.168.1.1) ]
         │
    ┌────┴───────────────────────────┐
    ▼                                ▼
[ 运行 Clash 的电脑 ]         [ Nintendo Switch / PS5 ]
IP: 192.168.1.100              IP: 192.168.1.105
开启 Allow LAN (Port 7890)    设置代理: 192.168.1.100:7890
    │                                │
    └───────(同一 Wi-Fi 局域网通信)─────┘
\`\`\`

---

## 二、三步极速实操教学

### 步骤 1：在电脑客户端开启 Allow LAN
1. 打开电脑上的 **Clash Verge Rev** 或 **Clash for Windows**；
2. 找到 **「允许局域网连接（Allow LAN）」** 开关，将其勾选开启；
3. 查看当前监听端口，默认混合端口通常为 **\`7890\`**。

### 步骤 2：查询电脑在局域网中的真实 IP 地址
- **Windows 用户**：按键盘 \`Win + R\` 输入 \`cmd\`，执行 \`ipconfig\`，找到当前正在联网的无线网卡或以太网卡的 **IPv4 地址**（通常形如 \`192.168.1.xxx\` 或 \`192.168.31.xxx\`）；
- **Mac 用户**：按住 \`Option\` 键点击顶部右上角 Wi-Fi 图标，即可直接看到本机 **IP 地址**。

### 步骤 3：在 Switch / PS5 上填入代理参数
1. **Nintendo Switch 设置**：
   - 进入「系统设置」->「互联网」->「互联网设置」；
   - 点击当前连接的 Wi-Fi 名称，选择「更改设置」；
   - 下滑找到「代理服务器设置」，选择「开启」；
   - **服务器（IP 地址）**：输入刚才查到的电脑 IP（如 \`192.168.1.100\`）；
   - **端口**：输入 **\`7890\`**；
   - 点击保存并重新连接网络。
2. **PlayStation 5 设置**：
   - 进入「设定」->「网络」->「设定」->「设定互联网连接」；
   - 选中当前 Wi-Fi 按手柄 Option 键选择「进阶设定」；
   - 「Proxy 服务器」选「使用」；
   - 填入对应电脑 IP 与端口 \`7890\` 保存。

---

## 三、常见排错（为什么填了代理却连接失败？）

### 1. Windows 防火墙强行拦截（最常见原因 90%）
- **现象**：主机显示 Wi-Fi 连接成功，但“无法连接互联网”。
- **修复**：打开 Windows 控制面板 ->「Windows Defender 防火墙」->「允许应用通过防火墙」，在列表中找到 Clash，勾选允许其通过 **“专用”** 与 **“公用”** 网络通信；或者在测试时临时关闭专用网络防火墙。

### 2. 避免两台设备分别处于主路由和副路由不同网段
- 电脑和主机必须处于同一广播域（例如都在 \`192.168.1.x\` 段下）。如果电脑连了 5G Wi-Fi，主机连了 2.4G 访客 Wi-Fi，且开启了 AP 隔离，两台设备将无法互相通信。

---

## 四、相关推荐与延伸阅读
- [微风网络深度评测：全物理 IPLC 专线电竞极速低延迟](/reviews/weifeng)
- [多设备局域网共享与家庭套餐选购指南](/pricing/budget-guide)
- [光速云深度评测：支持多设备同时并发稳定在线](/reviews/guangsu)
`
  },
  {
    path: 'troubleshooting/single-thread-congestion-fix.md',
    content: `---
title: "测速几百兆但网页卡顿？单线程拥塞与 TCP 调优深度指南"
description: "为什么 Speedtest 能测出 500Mbps 甚至千兆跑满，但实际打开 Google、YouTube 却频繁卡顿转圈？深入剖析多线程测速欺骗性与长肥管道单线程丢包拥塞。"
keywords: "测速快网页慢, 单线程拥塞, BBR拥塞控制, Speedtest虚标, 代理网页卡顿"
---

# 测速几百兆但网页卡顿？单线程拥塞与 TCP 调优深度指南

> **核心结论速览（Answer-First）**：  
> “测速几百兆，打开网页却慢如蜗牛”是很多初级用户常遇到的典型困惑。其根本技术症结在于：**Speedtest、MAI-TEST 等测速工具使用的是“多线程并发并发测速（Multi-connection）”**，能够掩盖严重的丢包抖动；而日常浏览网页、加载 JavaScript 脚本、观看单路 4K 视频流，**完全依赖“单线程吞吐（Single-thread Performance）”**。一旦跨境线路存在 2%–5% 的随机丢包，传统 TCP 拥塞控制算法（如 Cubic）会将拥塞窗口（CWND）瞬间减半降速，导致单线程速度暴跌至不足 10Mbps。解决办法是：**挑选部署了 BBR 拥塞控制算法的线路，或升级为丢包率接近 0% 的纯正 IEPL/IPLC 物理专线**。

---

## 一、多线程测速与单线程真实体验的本质差异

| 评估场景 | 工作原理 | 对丢包的容忍度 | 代表应用 |
| :--- | :--- | :--- | :--- |
| **多线程测速 (Speedtest)** | 同时开启 16-32 个 TCP 管道同时拉取数据 | **极高**（单个管道丢包由其他管道填补） | 压测带宽上限 |
| **单线程下载 (Single-thread)** | 单一 TCP 连接按时序持续传输 | **极度脆弱**（1次丢包触发重传降速） | 网页加载、API 交互、网盘下载 |
| **视频流播放 (YouTube/Netflix)** | 单个或少数几个分片连接拉取视频块 | 中等偏弱（单分片拥塞导致 4K 转圈） | 流媒体高码率视频播放 |

::: danger 警惕部分不良商家的“测速节点优待”
部分小作坊机场为了制造好看的测速截图，会在测速服务器节点配置极高 QoS 优先级，而在日常网页节点上严重超售。这就是为什么看别人的“测速满绿”买回来自己却天天卡顿。
:::

---

## 二、如何科学测试真实的“单线程”表现？

1. **禁用多线程测速**：
   - 打开 \`speedtest.net\`；
   - 点击界面下方的 **Connections（连接方式）**；
   - 将默认的 **Multi** 改选为 **Single**（单连接测速）；
   - 此时测出来的速率才是你真实网页浏览所能调动的峰值速度。
2. **使用真实大文件单线程直链拉取**：
   - 推荐使用 Fast.com（Netflix 部署在 AWS 的单线程流媒体测速），或拉取 GitHub Release 原始包，观察持续下载曲线是否平稳平滑。

---

## 三、根本性调优与改善方案

1. **协议层开启 TCP BBR 拥塞控制**：
   - BBR 是由 Google 开发的基于瓶颈带宽和往返时延的拥塞控制算法。与传统丢失触发算法相比，BBR 在有丢包的高延迟跨洋网络环境下，单线程吞吐提升可达数倍至几十倍。
2. **选择真正低丢包物理专线**：
   - 在本站评测中，**物理 IPLC 线路（如微风网络）**和**自建 IEPL 专线（如光速云）**在晚高峰的单线程速率均能保持在 200Mbps 以上，丢包率严格控制在 0.1% 以内，彻底告别单线程拥塞。

---

## 四、相关推荐与延伸阅读
- [真假专线 MTR 路由跳数鉴别方法](/network/fake-line-identification)
- [网络节点延迟物理极限与丢包剖析](/network/low-latency)
- [微风网络深度评测：电竞级抗丢包与超低抖动实测](/reviews/weifeng)
`
  },
  {
    path: 'safety/airport-runaway-early-warning.md',
    content: `---
title: "机场跑路前兆量化指标与历史复盘｜五大死亡征兆提前避坑"
description: "如何判断你用的机场快要跑路倒闭了？结合近五年数百家机场倒闭历史大数据，提炼出五大核心量化预警指标，教你在跑路前及时止损。"
keywords: "机场跑路前兆, 机场倒闭征兆, 机场跑路避坑, 机场停机维护, 跑路预警"
---

# 机场跑路前兆量化指标与历史复盘：五大死亡征兆提前避坑

> **核心结论速览（Answer-First）**：  
> 机场跑路（Rug Pull）绝非瞬间发生，通常在彻底关站前的 **15 至 45 天** 就会在商业运营、技术维护和客服社群中显露出极其规律的**五大死亡征兆**。最危险的特征为：**① 突然推出“大额骨折年付/永久买断”超低价促销（如原价 ¥200 现打一折卖 ¥30）；② Telegram 官方群突然开启全员永久禁言；③ 节点大面积变红超时超过 48 小时，公告却以“受到境外黑客持续 DDoS 攻击”或“不可抗力维护”为由无限期拖延**。一旦命中其中任意两条，应立即停止充值并迁移备份订阅！

---

## 一、机场跑路前兆量化指标对照表

| 维度 | 正常健康运营状态 | 临近跑路濒死状态（高危） | 危险指数 |
| :--- | :--- | :--- | :---: |
| **优惠活动** | 仅重大节日推出 8.5折 或 9折 促销 | **突然推出 3折、5折、甚至“终身永久套餐”** | ★★★★★ |
| **社群状态** | Telegram 群用户自由交流反馈 | **群内全员禁言，或将发问节点故障的用户直接踢出群** | ★★★★★ |
| **技术维护** | 节点故障在 2-4 小时内快速修复通告 | **全线节点红叉数天，公告反复推诿为上游机房故障** | ★★★★☆ |
| **支付网关** | 支持正规商户聚合支付（支付宝/微信/企业通道） | **频繁更换为个人微信赞赏码、拼多多代充或仅限 USDT** | ★★★★☆ |
| **官网域名** | 域名解析稳定，SSL 证书到期前自动续签 | **主域名因欠费证书过期报红，迟迟不修复** | ★★★☆☆ |

---

## 二、历史经典跑路复盘案例解析

### 典型案例：某知名平价千人机场的“死亡三部曲”
1. **第一阶段（倒闭前 30 天）**：
   - 运营成本由于汇率波动或上游专线涨价难以为继，站长决定套现离场；
   - 突然在官网首页弹出**“6周年特惠，永久无限流量套餐仅需 ¥88”**；
2. **第二阶段（倒闭前 10 天）**：
   - 大量羊毛党涌入导致服务器资源全面雪崩，晚高峰速率跌破 1Mbps，群内质疑声四起；
   - 站长发布公告：“正在紧急迁移全新 IPLC 专线集群，预计维护 72 小时”，随后开启**全员禁言**；
3. **第三阶段（彻底跑路）**：
   - 官网停止解析，TG 群组注销删除，数千名用户的年付费全部化为乌有。

---

## 三、终极自我防灾减灾守则

1. **坚决坚持“月付”或“不限时小额”**：
   - 除非面对光速云这种经过 5 年以上稳定运营验证的老牌龙头，普通中小机场**绝对不要年付**；
2. **建立“主备双机场”冷热容灾模型**：
   - 平时主力使用 1 家高质量月付专线，同时常备 1 个如**星岛梦**这种不限时永久按量计费的低成本副卡，即便主力突发故障也能秒级无感切换。

---

## 四、相关推荐与延伸阅读
- [被机场跑路后微信支付宝投诉撤单全流程](/safety/payment-chargeback-guide)
- [新手第一次买机场选月付还是年付？深度成本分析](/pricing/monthly)
- [星岛梦深度评测：永久不过期不限时计费备用方案](/reviews/xingdaomeng)
`
  },
  {
    path: 'safety/dual-airport-high-availability.md',
    content: `---
title: "主备双机场高可用秒级容灾搭建指南｜主力专线+不限时备用黄金组合"
description: "关键时刻节点掉线怎么办？手把手教你利用 Clash 的 Fallback 自动容灾组，配置“主力高质量专线 + 不限时按量备用卡”的双机场高可用容灾网络架构。"
keywords: "双机场备用, 机场容灾架构, 不限时机场, Clash Fallback双订阅, 节点自动切换"
---

# 主备双机场高可用秒级容灾搭建指南：主力专线+不限时备用黄金组合

> **核心结论速览（Answer-First）**：  
> 无论单个机场的技术宣称有多么强大，**只要是商业网络服务，就 100% 存在遇到突发光缆中断、上游机房断电、敏感封锁期阻断的单点故障风险（Single Point of Failure）**。对于需要远程办公、写代码、查资料的严肃用户，最稳妥的容灾策略是**“主备双机场架构”**：**平时将日常月付的优质专线机场设为 Primary 主力；同时搭配一个不限时永久不过期计费的机场作为 Standby 备用**。利用客户端策略组自动健康检查，当主力连续 3 次探针失败时，网络在 5 秒内自动无缝切换到备用节点，工作流完全不受干扰。

---

## 一、双持架构的经济学测算：为什么不仅不浪费，反而更划算？

很多人以为“买两个机场等于花双倍钱”，实际上通过精妙的套餐搭配，年平均支出几乎与单机场持平：

| 方案 | 主卡构成 | 副卡构成 | 年综合成本 | 容灾可靠性 |
| :--- | :--- | :--- | :---: | :---: |
| **传统单卡方案** | 高端年付专线 ¥300/年 | 无 | ¥300/年 | **极低**（断网时完全瘫痪） |
| **双卡双持黄金组合** | **优质月付专线 (如光速云 ¥8.25/月)** | **永久不限时包 (如星岛梦 ¥30/100G)** | **约 ¥130/年** | **★★★★★（全天候 99.99% 可用）** |

::: tip 备用副卡的核心标准
副卡必须选择 **“无月租、流量永不过期、按量计费”** 的套餐。如果副卡也是按月扣费，那确实浪费；而永久不限时的流量包，即便放半年不用，余额也永远在你的账户上。
:::

---

## 二、Clash 自动化容灾配置实战

在 Clash 配置文件中，通过定义一个高可用策略组实现无感自动漂移：

\`\`\`yaml
proxy-groups:
  # 1. 核心自动容灾组
  - name: 🛡️ 全局高可用容灾
    type: fallback
    url: http://www.gstatic.com/generate_204
    interval: 180      # 每 3 分钟自动探测一次
    proxies:
      - 🚀 主力-光速云-香港IEPL专线
      - 🚀 主力-光速云-日本IPLC专线
      - 🎒 备用-星岛梦-高速隧道01
      - 🎒 备用-星岛梦-高速隧道02

  # 2. 规则路由直接绑定容灾组
rules:
  - MATCH,🛡️ 全局高可用容灾
\`\`\`

---

## 三、相关推荐与延伸阅读
- [光速云 vs 星岛梦：主力专线与不限时备用双持深度横评](/compare/guangsu-vs-xingdaomeng)
- [Clash Fallback 自动故障转移配置实操](/tutorials/clash-fallback-setup)
- [星岛梦深度评测：永久不过期不限时计费备用首选](/reviews/xingdaomeng)
`
  },
  {
    path: 'safety/tls-privacy-boundary.md',
    content: `---
title: "机场站长能看到你的隐私吗？TLS 1.3 端到端加密与审计边界科普"
description: "使用代理或机场时，站长是否能截获你的账号密码、银行卡信息或微信聊天记录？用技术真相拆解 HTTPS/TLS 1.3 的安全边界，教你科学防范中间人攻击。"
keywords: "机场能看浏览记录吗, TLS1.3加密原理, 机场安全性, 代理隐私保护, HTTPS解密"
---

# 机场站长能看到你的隐私吗？TLS 1.3 端到端加密与审计边界科普

> **核心结论速览（Answer-First）**：  
> **结论明确：只要你访问的网站采用了现代标准的 HTTPS (TLS 1.2 / TLS 1.3) 加密，机场站长绝对无法看到你的明文账号、密码、聊天内容或支付信息**。在端到端加密机制下，代理服务器只充当“不可视的数据搬运工”。但是，**站长能够看到你的元数据（Metadata）**——即你访问了哪个域名（如 \`google.com\` 还是 \`github.com\`）、连接发生的时间、以及产生的数据流量大小。如果希望杜绝元数据被窥探，需配合 DoH/DoT 与 ECH（加密客户端问候）技术。

---

## 一、机场站长“看得到”与“看不到”的技术清单

| 维度 | 机场站长能否看到？ | 技术原理说明 |
| :--- | :---: | :--- |
| **你的登录密码 / 信用卡卡号** | ❌ **绝对看不到** | HTTPS 在你手机/电脑与目标网站之间建立了私钥协商通道，全程强加密 |
| **聊天软件的消息文本与私信** | ❌ **绝对看不到** | Telegram、WhatsApp、微信通信内容均经过传输层加密 |
| **你所访问的域名 (SNI)** | ✅ **看得到** | 在 TLS 握手阶段，SNI（Server Name Indication）默认以明文暴露目标网站域名 |
| **你访问的具体文章 URL 路径** | ❌ **绝对看不到** | 域名后面的路径（如 \`/articles/123.html\`）是在加密通道建立后传输的 |
| **你的真实设备名与电脑文件** | ❌ **绝对看不到** | 代理协议运行在应用层，完全无权读取你的操作系统本地存储 |
| **数据流量发生的时间与大小** | ✅ **看得到** | 代理中转节点必须统计你消耗了多少 MB 流量用于计费 |

---

## 二、唯一能被“中间人攻击”窃取密码的极端特例：伪造根证书

在什么情况下机场站长可能篡改或解密你的 HTTPS 通信？  
**答案只有一个：如果你在电脑或手机上手动安装并“完全信任”了该机场提供的自定义 CA 根证书（Root Certificate）！**

::: danger 绝不安装任何第三方客户端要求信任的根证书
正规专业的机场客户端（如 Clash、Shadowrocket、Sing-box）**从来不需要用户安装任何系统根证书**！  
如果某不知名小工具弹窗要求你“安装并信任描述文件 / 根证书”，这属于典型的中间人抓包软件（MITM），必须立即拒绝并彻底卸载。
:::

---

## 三、相关推荐与延伸阅读
- [免费 VPN 背后暗藏的安全隐患与数据倒卖揭秘](/vpn/free-risks)
- [Fake-IP 模式与防 DNS 泄露全流程](/tutorials/fake-ip-dns-anti-leak)
- [可信云深度评测：无日志审计与零追踪隐私专线](/reviews/kexin)
`
  },
  {
    path: 'vpn/full-cone-nat-gaming-guide.md',
    content: `---
title: "电竞联机 Full Cone NAT 穿透优化｜游戏加速与 NAT 模式配置"
description: "Switch 连喷喷/马车联机总是提示“无法连接其他主机”？PS5 / PC 联机显示 NAT 3 (Strict) 怎么优化？手把手教你配置 Full Cone NAT 4 实现秒级无阻碍联机。"
keywords: "Full Cone NAT, 游戏NAT优化, Switch NAT类型, PS5 NAT开放, 电竞专线加速"
---

# 电竞联机 Full Cone NAT 穿透优化：游戏加速与 NAT 模式配置

> **核心结论速览（Answer-First）**：  
> 在绝大多数 P2P 架构的联机联机游戏（如 Nintendo Switch 的《喷射战士》、《马里奥赛车》，或 PC 端的《使命召唤》、《Apex》私网组队）中，**联机失败、无法搜到房间、与好友连不上的核心元凶是你的网络 NAT 类型处于 NAT 3 / Restricted 严格模式**。若想获得最畅快的联机体验，**必须选择支持 Full Cone NAT（全锥型 NAT / NAT 1 / NAT A）的专线网络**。Full Cone 允许外部任意主机直接通过分配的公共端口与你的游戏设备通信，彻底消除组队握手失败。

---

## 一、主机平台 NAT 类型等级对照表

| NAT 等级 | Nintendo Switch | PlayStation / Xbox | 联机能力评估 | 是否需要优化 |
| :---: | :---: | :---: | :--- | :---: |
| **全锥型 (Full Cone)** | **NAT A** | **NAT Type 1 (Open)** | 能够与任何玩家无阻碍直连组队，房主最优选择 | ✅ 终极理想状态 |
| **受限锥型 (Restricted)** | **NAT B** | **NAT Type 2 (Moderate)** | 能够与 NAT 1 和 NAT 2 玩家联机，无法与 NAT 3 联机 | 正常日常可用 |
| **端口受限型 (Port-Restricted)** | **NAT C** | **NAT Type 2** | 组队成功率约 60%，偶发进房掉线 | 建议优化 |
| **对称型 (Symmetric)** | **NAT D / F** | **NAT Type 3 (Strict)** | **几乎无法与其他玩家建立 P2P 隧道，联机报错** | ❌ 必须立即重构 |

---

## 二、如何在 Clash 客户端中开启 Full Cone 支持？

许多专线节点本身支持 Full Cone，但因为客户端配置未开启而降级：

1. **检查节点支持度**：
   - 使用开源工具 \`NatTypeTester.exe\` 测定当前出口节点的 NAT 类型；
2. **在 Clash 配置中强制开启 UDP 全锥穿透**：
   \`\`\`yaml
   # 确保在配置文件头部声明如下参数：
   mode: rule
   log-level: info
   ipv6: false
   udp: true

   dns:
     enable: true
     enhanced-mode: fake-ip
     nameserver:
       - 119.29.29.29
       - 223.5.5.5
   \`\`\`
3. **选择原生游戏专线**：
   - 传统中继节点由于中间存在多层端口转发，极难保持 Full Cone；
   - 强烈推荐使用具备独立物理 IPLC 专线入口的服务商（如微风网络）。

---

## 三、相关推荐与延伸阅读
- [微风网络深度评测：Full Cone NAT 4 原生支持与电竞级低抖动](/reviews/weifeng)
- [闪电鼠深度评测：Steam/Apex/Valorant 亚服游戏专用路由](/reviews/shandianshu)
- [一帆云深度评测：游戏专属线路加速与 UDP 转发实测](/reviews/yifan)
`
  },
  {
    path: 'clients/sing-box-config-guide.md',
    content: `---
title: "sing-box 通用 JSON 配置从入门到精通教程｜下一代通用代理核心实战"
description: "sing-box 作为当下性能最强劲、内存占用极低的下一代通用通用网络工具，如何手把手手写并配置出稳定无污染的 JSON 规则文件？从入站、出站到路由规则全量实战解析。"
keywords: "sing-box教程, sing-box配置, sing-box JSON语法, VLESS Reality配置, sing-box分流"
---

# sing-box 通用 JSON 配置从入门到精通教程：下一代通用代理核心实战

> **核心结论速览（Answer-First）**：  
> **sing-box 是由 SagerNet 团队倾力打造的下一代开源通用代理平台**。相比 Clash，sing-box 采用了纯正的模块化设计，原生原生支持最新的 **VLESS-Reality、Shadowsocks-2022、Hysteria 2、TUIC v5** 等前沿高性能抗封锁协议，同时在相同并发流量下，内存与 CPU 占用比 Clash 降低 40% 以上。配置核心在于理解其 JSON 文件中的四大支柱：**\`inbounds\`（入站侦听）、\`outbounds\`（节点与策略组）、\`route\`（分流规则引擎）与 \`dns\`（内置分流解析）**。

---

## 一、sing-box 架构思维模型

\`\`\`mermaid
flowchart LR
    A[客户端流量] --> B[Inbounds 入站: mixed/tun]
    B --> C[DNS 解析引擎: 境内阿里 / 境外 Google]
    C --> D[Route 路由匹配: geosite / geoip]
    D --> E[Outbounds 节点选择: direct / proxy / block]
    E --> F[互联网目标]
\`\`\`

---

## 二、精简实用生产级 JSON 配置范例

你可以直接参考以下经过工程验证的稳定模板：

\`\`\`json
{
  "log": {
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
      }
    ],
    "rules": [
      {
        "outbound": "any",
        "server": "dns_direct"
      },
      {
        "geosite": "cn",
        "server": "dns_direct"
      }
    ]
  },
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080
    }
  ],
  "outbounds": [
    {
      "type": "selector",
      "tag": "proxy",
      "outbounds": ["节点-光速云香港", "direct"]
    },
    {
      "type": "direct",
      "tag": "direct"
    },
    {
      "type": "block",
      "tag": "block"
    }
  ],
  "route": {
    "rules": [
      {
        "geosite": "category-ads-all",
        "outbound": "block"
      },
      {
        "geosite": "cn",
        "outbound": "direct"
      },
      {
        "geoip": "cn",
        "outbound": "direct"
      }
    ],
    "auto_detect_interface": true
  }
}
\`\`\`

---

## 三、相关推荐与延伸阅读
- [客户端软件生态全览与下载导航](/clients/)
- [光速云深度评测：全面兼容 sing-box 与一键订阅转换](/reviews/guangsu)
- [Fake-IP 模式与防 DNS 泄露全流程](/tutorials/fake-ip-dns-anti-leak)
`
  },
  {
    path: 'ai-streaming/youtube-4k-buffering-fix.md',
    content: `---
title: "YouTube 4K 频繁缓冲转圈丢帧排查指南｜开启 QUIC 与 BBR 优化"
description: "为什么看 YouTube 4K 视频即使测速跑满却依然频繁卡顿缓冲？手把手教你调优 Chrome 浏览器参数、禁用 AV1 硬件解码冲突与选型低延迟原生线路。"
keywords: "YouTube 4K卡顿, YouTube缓冲优化, QUIC协议优化, YouTube转圈解决, 4K测速"
---

# YouTube 4K 频繁缓冲转圈丢帧排查指南：开启 QUIC 与 BBR 优化

> **核心结论速览（Answer-First）**：  
> 观看 YouTube 4K/60fps 视频持续卡顿转圈，在绝大多数情况下并非带宽总值不足，而是因为：**① 你的电脑显卡不支持 AV1 格式硬件硬解码，导致 CPU 满载 100% 丢帧（常被误认为网速卡顿）；② 运营商或中转服务器对 Google 专有的 QUIC (UDP 443) 协议进行了严重的限速 QoS 阻断；③ 节点连接稳定性不足，TCP 窗口频繁收缩。**快速解决方法：**在浏览器中安装 “Not Yet, AV1” 插件强制切换为 VP9/H.264 编码，并在代理客户端中勾选“允许 UDP/QUIC 转发”。**

---

## 一、三秒判定是“网络卡”还是“显卡解码卡”？

在播放卡顿的 YouTube 视频界面上，点击鼠标右键，选择 **「详细统计信息（Stats for nerds）」**：
- **查看 \`Connection Speed\`（连接速度）**：
  - 若低于 **\`25,000 Kbps\`**，说明是**纯网络带宽不足或代理拥塞**；
- **查看 \`Dropped Frames\`（丢帧数）**：
  - 若显示 \`1240 / 3500\`（丢帧数过千），且 CPU 占用极高，说明是**电脑硬件解码跟不上**，与网络带宽完全无关！

---

## 二、三步实操调优指南

### 1. 强制关闭 AV1 编码（老旧电脑与核显救星）
在 Chrome 网上应用店搜索并安装扩展 **“enhanced-h264ify”** 或 **“Not Yet, AV1”**：
- 勾选 **Block AV1**；
- 勾选 **Block VP9**（如果电脑配置非常老旧）；
- 强制让 YouTube 输出成熟易解的 H.264 / AVC 码流，瞬间释放 CPU 压力，实现丝滑 4K 播放。

### 2. 确保代理客户端正常放行 UDP/QUIC 流量
YouTube 与 Google 旗下服务深度依赖自研的基于 UDP 的 QUIC 协议。如果客户端未开启 UDP 转发，连接会回退至高握手开销的 TCP，增加首屏缓冲延迟。

---

## 三、相关推荐与延伸阅读
- [微图云深度评测：4K/8K 视频流媒体专属大管道实测](/reviews/weitu)
- [测速几百兆但网页卡顿单线程拥塞排查](/troubleshooting/single-thread-congestion-fix)
- [光速云深度评测：晚高峰 500M 专线 4K/8K 秒开无缓冲实测](/reviews/guangsu)
`
  },
  {
    path: 'network/us-latency-physics-limit.md',
    content: `---
title: "美国节点为什么不可能低于 120ms？光速物理极限与跨洋海缆路由科普"
description: "为什么宣传“美国节点 30ms 延迟”的全部是虚假营销骗局？从真空光速、玻璃光纤折射率到中美跨太平洋跨洋海底光缆（TPE/NCP）物理距离，揭秘网络延迟的物理硬极限。"
keywords: "美国节点延迟极限, 光速物理延迟, 中美跨洋海缆, 假延迟内网骗局, 网络延迟科普"
---

# 美国节点为什么不可能低于 120ms？光速物理极限与跨洋海缆路由科普

> **核心结论速览（Answer-First）**：  
> **从中国大陆沿海城市直达美国西海岸（如洛杉矶、圣何塞）的真实网络往返延迟（RTT），在物理定律下绝对不可能低于 115 毫秒（ms）！** 如果某个机场客户端的节点测速列表显示其美国节点延迟只有 \`20ms\` 或 \`30ms\`，**这 100% 是只测到了其部署在境内的中转入口服务器（Fake Ping），绝非真实落地延迟**。了解光速在光纤中的传播规律与太平洋海底光缆实际走向，是识破虚假营销、树立客观网络认知的必修课。

---

## 一、硬核物理测算：光在光纤中到底跑多快？

让我们用初中物理公式进行严谨的数学推导：

1. **光在真空中的传播速度**：  
   $$c \approx 300,000 \text{ km/s}$$
2. **光在二氧化硅玻璃光纤中的传播速度**：  
   由于光纤玻璃的折射率约为 $n = 1.468$，光在光纤中的真实传播速度为：  
   $$v = \frac{c}{n} \approx \frac{300,000}{1.468} \approx 204,360 \text{ km/s}$$  
   即**约 20.4 万公里/秒**，大约为每毫秒传播 **204 公里**。
3. **中美海底光缆的真实物理距离**：  
   从中国上海崇明岛海缆登陆站，经由跨太平洋直达海缆（如 NCP、TPE）连接至美国加州圣何塞海缆登陆站，实际光缆铺设距离约为 **11,000 至 13,000 公里**（由于避开海沟和地震带，并非两点直线）。
4. **网络往返延迟 (RTT) 物理极限**：  
   数据包必须“一去一回”经历双程传播：  
   $$\text{双程距离} = 12,000 \text{ km} \times 2 = 24,000 \text{ km}$$  
   $$\text{纯光传输耗时} = \frac{24,000 \text{ km}}{204 \text{ km/ms}} \approx \mathbf{117.6 \text{ ms}}$$

::: important 结论无可争议
即便未来科技再发达、沿途所有中继放大器与路由器处理延迟全部降为 0ms，**仅仅是光信号在海底光纤中打个来回，就需要 117.6 毫秒！** 加上沿途光电转换与陆地骨干网路由，中国大陆至美西的正常优良延迟区间为 **125ms – 150ms**。
:::

---

## 二、全球主流地区物理延迟正常区间对照表

| 目标地区 | 物理光缆路由路径 | 沿海省份正常良好延迟 | 内陆/北方省份正常良好延迟 | 虚标欺诈警戒线 |
| :--- | :--- | :---: | :---: | :---: |
| **中国香港 (HK)** | 陆缆直连 (深圳-香港) | **10 - 25 ms** | 30 - 45 ms | < 5 ms (多为境内内网) |
| **日本 (JP)** | 东海/黄海海缆直连 | **30 - 45 ms** | 45 - 65 ms | < 25 ms |
| **新加坡 (SG)** | 南海海底光缆 | **35 - 55 ms** | 50 - 75 ms | < 30 ms |
| **美国西海岸 (US)** | 跨太平洋 NCP/TPE 海缆 | **125 - 150 ms** | **140 - 175 ms** | **< 110 ms (100% 虚假)** |
| **欧洲地区 (DE/UK)** | 亚欧海缆或陆上丝绸之路陆缆 | **140 - 180 ms** | 160 - 200 ms | < 120 ms |

---

## 三、相关推荐与延伸阅读
- [真假专线 MTR 路由跳数鉴别方法](/network/fake-line-identification)
- [全球互联深度评测：覆盖六大洲边缘节点的冷门跨境访问](/reviews/quanqiu)
- [光速云深度评测：企业级专线极速低延迟实测](/reviews/guangsu)
`
  }
];

let created = 0;
for (const art of articles) {
  const fullPath = path.join(__dirname, '..', art.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, art.content.trim() + '\n', 'utf8');
  console.log('Created article:', art.path);
  created++;
}

console.log('Total articles written:', created);
