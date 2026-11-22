---
title: "Mac 提示“应用已损坏无法打开”解决教程｜一键清除 xattr 绕过 Gatekeeper"
description: "macOS 安装 Clash Verge、Shadowrocket、v2rayN 客户端时弹窗提示“应用已损坏，您应该将它移到废纸篓”怎么办？教你使用 xattr 命令一键绕过 Gatekeeper 隔离属性。"
keywords: "Mac应用已损坏, macOS Gatekeeper, xattr -cr, Mac无法打开Clash, 移到废纸篓"
---

# Mac 提示“应用已损坏无法打开”解决教程：一键清除 xattr 绕过 Gatekeeper

> **核心结论速览（Answer-First）**：  
> 在 macOS 13 (Ventura)、14 (Sonoma) 及最新系统上，安装第三方开源代理软件（如 Clash Verge Rev、Mihomo Party、v2rayU）时，系统常弹窗报错：**“应用已损坏，您应该将它移到废纸篓”**。这并不是软件真的损坏或包含病毒，而是因为开源开发者未向苹果支付每年 99 美元的开发者证书认证费用，触发了系统的 **Gatekeeper 隔离机制（Quarantine Attribute）**。只需打开“终端（Terminal）”，输入命令 `sudo xattr -r -d com.apple.quarantine /Applications/软件名称.app` 即可秒级解除限制。

---

## 一、报错原因深度剖析：什么是 Gatekeeper Quarantine？

当你在 Safari 或 Chrome 下载 `.dmg` 安装包并拖拽到「应用程序」目录时，macOS 会自动为该文件附加一个扩展文件属性：`com.apple.quarantine`。

| 场景 | 系统表现 | 真实原因 | 安全评估 |
| :--- | :--- | :--- | :--- |
| **App Store 下载应用** | 正常直接双击打开 | 苹果官方签名并公证 | 官方背书 |
| **已认证商业开发者** | 首次打开提示“从互联网下载” | 拥有 Apple Developer ID 签名 | 正常放行 |
| **GitHub 开源代理软件** | **强行拦截，提示应用已损坏** | **无签名或自签名被 Gatekeeper 拦截** | **开源可信，但被苹果视为未验证** |

::: warning 避免无脑关闭全局 Gatekeeper
部分教程建议小白运行 `sudo spctl --master-disable` 完全关闭系统安全保护。此举会导致整个系统对恶意流氓软件失去防线。**强烈推荐使用下文针对单款软件精准清除隔离属性的方案**。
:::

---

## 二、秒级解决实操步骤（针对单个软件）

### 步骤 1：打开终端（Terminal）
按下键盘上的 `Command + 空格键` 唤起 Spotlight 聚焦搜索，输入 `Terminal`（或“终端”），回车打开黑底命令行窗口。

### 步骤 2：执行精准去隔离命令
复制以下命令，粘贴至终端窗口（注意末尾有一个空格）：

```bash
sudo xattr -r -d com.apple.quarantine 
```

### 步骤 3：拖入目标应用程序
1. 打开 Finder（访达），进入左侧的「应用程序（Applications）」目录；
2. 找到提示损坏的软件图标（例如 `Clash Verge.app`）；
3. 用鼠标按住该图标，直接拖拽到终端窗口中，终端会自动补全该软件的绝对物理路径；
4. 此时命令看起来类似如下：
   ```bash
   sudo xattr -r -d com.apple.quarantine "/Applications/Clash Verge.app"
   ```
5. 按下回车键，系统会要求输入你的 Mac 开机登录密码（**注意：输入密码时屏幕不会显示任何字符或星号，直接盲打输完回车即可**）。

### 步骤 4：重新启动软件
命令执行完毕无任何报错输出即代表成功。返回「访达」双击软件，此时即可直接无阻碍秒开！

---

## 三、常用代理客户端一键复制命令合集

如果你安装的是以下常见客户端，可以直接复制对应单行命令在终端执行：

```bash
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
```

---

## 四、常见问题（FAQ）

### Q1：提示 "No such xattr: com.apple.quarantine" 是什么意思？
- 说明该软件已经被清除过隔离属性，或者本身并未被标记隔离。如果仍然无法打开，请检查「系统设置 -> 隐私与安全性 -> 安全性」，看底部是否有“仍要打开”按钮。

### Q2：每次软件升级后都需要重新运行命令吗？
- 如果是通过下载新版本 `.dmg` 覆盖安装，macOS 会重新附加隔离属性，需要重新运行一次命令；如果是客户端内部点击“自动检查更新”，通常无需再次运行。

---

## 五、相关推荐与延伸阅读
- [Clash Verge Rev 完整安装配置与内核切换教程](/clients/clash-verge-rev)
- [macOS 平台全代理客户端横向对比与选型指南](/clients/macos)
- [光速云深度评测：自研 macOS 原生免配置客户端](/reviews/guangsu)
