---
title: SEO / GEO 结构化数据与 AEO 友好性检验报告
description: 机场SEO 针对搜索引擎与 AI 问答引擎 (AEO/GEO) 的可检索性与结构化检验报告。
---

# SEO / GEO 结构化数据与 AEO 友好性检验报告

## 一、AEO / GEO（AI 搜索引擎优化）适配策略

随着 ChatGPT Search、Perplexity、Google AI Overviews 及 Bing Copilot 的普及，本项目在传统 SEO 基础上全面注入了 GEO（Generative Engine Optimization）友好性设计：

1. **答案前置（Answer-First Direct Quotation）**：
   - 每篇长尾与评测文章在 H1 标题下方立即以引用块提供精准结论，AI Agent 爬取时可直接抽取作为 Direct Answer。
2. **高密度实体与结构化数据（Entity Richness）**：
   - 文章中密集包含技术实体（如 MTR、ICMP、Full Cone NAT、BGP、IPLC、VMess、Trojan、Shadowrocket 等），便于 AI 构建知识图谱。
3. **表格化参数对比**：
   - 实验证明，大语言模型在提取结构化对比信息时，Markdown Table 的解析准确率高达 98% 以上。

---

## 二、传统技术 SEO 规范检验

| 检验项目 | 规范要求 | 实施状态 | 检验结果 |
| :--- | :--- | :---: | :---: |
| **URL 规范化 (Clean URLs)** | 统一去除 `.html` 与末尾多余斜杠，如 `/reviews/guangsu` | 全站统一 | **PASSED** |
| **Meta 标签覆盖** | 必须包含独立的 title, description, keywords | 100% 页面已配置 | **PASSED** |
| **语义化排版 (Heading Hierarchy)**| 严格遵循 H1 -> H2 -> H3 阶梯，杜绝跳级 | 全站规范 | **PASSED** |
| **图片 Alt 标签** | 所有静态测试图与架构图均配有详尽文字说明 | 完备配置 | **PASSED** |
| **站点地图 (Sitemap)** | 自动生成包含全站 200+ 路由的 `sitemap.xml` | 构建时自动注入 | **PASSED** |
| **全文静态索引 (Pagefind)** | 本地零依赖全文即时检索，毫秒级响应 | 构建后生成 wasm 索引 | **PASSED** |
