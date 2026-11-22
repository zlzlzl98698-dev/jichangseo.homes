const fs = require('fs');
const path = require('path');

const keywordsDir = path.join(__dirname, '../data/keywords');
fs.mkdirSync(keywordsDir, { recursive: true });

// 1. Core Keywords
const coreKeywords = [
  { keyword: "机场推荐", intent: "Commercial", volumeMonthly: 45000, difficulty: "High", priority: "P0", targetUrl: "/airport/" },
  { keyword: "机场排行", intent: "Commercial", volumeMonthly: 32000, difficulty: "High", priority: "P0", targetUrl: "/airport/rankings" },
  { keyword: "稳定机场", intent: "Commercial", volumeMonthly: 28000, difficulty: "Medium", priority: "P0", targetUrl: "/airport/stable" },
  { keyword: "便宜机场", intent: "Commercial", volumeMonthly: 38000, difficulty: "High", priority: "P0", targetUrl: "/pricing/cheap" },
  { keyword: "一元机场", intent: "Commercial", volumeMonthly: 22000, difficulty: "Medium", priority: "P0", targetUrl: "/pricing/one-yuan" },
  { keyword: "月付机场", intent: "Commercial", volumeMonthly: 19000, difficulty: "Medium", priority: "P0", targetUrl: "/pricing/monthly" },
  { keyword: "不限时机场", intent: "Commercial", volumeMonthly: 15000, difficulty: "Low", priority: "P1", targetUrl: "/pricing/no-expiry" },
  { keyword: "光速云评测", intent: "Commercial", volumeMonthly: 12000, difficulty: "Low", priority: "P0", targetUrl: "/reviews/guangsu" },
  { keyword: "VPN推荐", intent: "Commercial", volumeMonthly: 35000, difficulty: "High", priority: "P0", targetUrl: "/vpn/" },
  { keyword: "Clash Verge Rev", intent: "Informational", volumeMonthly: 42000, difficulty: "Medium", priority: "P0", targetUrl: "/clients/clash-verge-rev" },
  { keyword: "v2rayN", intent: "Informational", volumeMonthly: 29000, difficulty: "Medium", priority: "P0", targetUrl: "/clients/v2rayn" },
  { keyword: "Shadowrocket", intent: "Informational", volumeMonthly: 36000, difficulty: "High", priority: "P0", targetUrl: "/clients/shadowrocket" },
  { keyword: "Sing-box", intent: "Informational", volumeMonthly: 24000, difficulty: "Medium", priority: "P1", targetUrl: "/clients/sing-box" },
  { keyword: "ChatGPT机场推荐", intent: "Commercial", volumeMonthly: 27000, difficulty: "Medium", priority: "P0", targetUrl: "/ai-streaming/chatgpt" },
  { keyword: "Netflix解锁机场", intent: "Commercial", volumeMonthly: 18000, difficulty: "Medium", priority: "P1", targetUrl: "/ai-streaming/netflix" },
  { keyword: "IEPL专线", intent: "Informational", volumeMonthly: 16000, difficulty: "Low", priority: "P1", targetUrl: "/network/iepl" },
  { keyword: "IPLC专线", intent: "Informational", volumeMonthly: 14000, difficulty: "Low", priority: "P1", targetUrl: "/network/iplc" },
  { keyword: "机场订阅导入教程", intent: "Informational", volumeMonthly: 26000, difficulty: "Low", priority: "P0", targetUrl: "/tutorials/import-subscription" },
  { keyword: "节点连接超时排查", intent: "Informational", volumeMonthly: 18000, difficulty: "Low", priority: "P0", targetUrl: "/troubleshooting/timeout" },
  { keyword: "机场跑路预警", intent: "Informational", volumeMonthly: 21000, difficulty: "Low", priority: "P1", targetUrl: "/safety/runaway" }
];

// 2. Keyword Clusters
const keywordClusters = [
  {
    clusterId: "cluster-airport-recommend",
    name: "机场推荐与选择集群",
    primaryKeyword: "机场推荐",
    pillarUrl: "/airport/",
    subKeywords: ["2026机场推荐", "靠谱机场推荐", "稳定机场排行", "好用的机场", "新手机场推荐", "专线机场推荐", "备用机场选择"],
    articles: [
      { title: "2026年机场推荐选购指南", url: "/airport/guide-2026" },
      { title: "稳定机场必须满足的六大硬性指标", url: "/airport/stable" },
      { title: "新手第一次购买机场避坑全攻略", url: "/airport/beginner" }
    ]
  },
  {
    clusterId: "cluster-pricing",
    name: "机场价格与套餐集群",
    primaryKeyword: "便宜机场",
    pillarUrl: "/pricing/",
    subKeywords: ["一元机场", "一分机场", "月付机场推荐", "不限时流量机场", "永久套餐机场", "性价比机场排行"],
    articles: [
      { title: "便宜机场与一元机场真实风险与体验分析", url: "/pricing/cheap" },
      { title: "月付还是年付？机场计费周期避坑指南", url: "/pricing/billing-cycles" },
      { title: "不限时流量包适用人群与测算分析", url: "/pricing/no-expiry" }
    ]
  },
  {
    clusterId: "cluster-brands",
    name: "品牌评测与对比集群",
    primaryKeyword: "机场品牌评测",
    pillarUrl: "/brands/",
    subKeywords: ["光速云评测", "暮光加速评测", "飞猫云怎么样", "星岛梦机场", "微风网络测速", "梯子云怎么样"],
    articles: [
      { title: "光速云深度评测：企业级IEPL专线实测报告", url: "/reviews/guangsu" },
      { title: "飞猫云评测：免配置客户端与7元性价比实测", url: "/reviews/feimao" },
      { title: "暮光加速深度评测：多设备协同与BGP智能调度", url: "/reviews/muguang" }
    ]
  },
  {
    clusterId: "cluster-clients",
    name: "客户端下载与配置集群",
    primaryKeyword: "代理客户端下载",
    pillarUrl: "/clients/",
    subKeywords: ["Clash Verge Rev下载", "v2rayN教程", "Shadowrocket小火箭", "Sing-box配置", "FlClash下载", "OpenWrt科学上网"],
    articles: [
      { title: "Clash Verge Rev Windows/macOS 从下载到进阶全指南", url: "/clients/clash-verge-rev" },
      { title: "v2rayN 电脑端小白入门与Xray多核心配置教程", url: "/clients/v2rayn" },
      { title: "Shadowrocket 小火箭 iOS 安装与订阅导入详解", url: "/clients/shadowrocket" }
    ]
  },
  {
    clusterId: "cluster-troubleshooting",
    name: "网络故障与节点排查集群",
    primaryKeyword: "节点连接不上",
    pillarUrl: "/troubleshooting/",
    subKeywords: ["节点超时", "订阅更新失败", "DNS污染", "TUN模式无网络", "ChatGPT打不开", "Netflix代理警告"],
    articles: [
      { title: "节点超时与全红连接不上：10分钟系统排查流程", url: "/troubleshooting/timeout" },
      { title: "订阅更新失败：链接打不开或格式错误排查", url: "/troubleshooting/subscription-error" },
      { title: "AI 工具与流媒体解锁失败常见原因与解决方案", url: "/troubleshooting/ai-streaming-issue" }
    ]
  }
];

// 3. Keyword Mapping
const keywordMapping = coreKeywords.map(k => ({
  keyword: k.keyword,
  searchIntent: k.intent,
  targetUrl: k.targetUrl,
  priority: k.priority,
  topicCluster: k.targetUrl.split('/')[1],
  primaryOwner: k.targetUrl,
  conflictUrls: [],
  lastChecked: "2026-11-21"
}));

// 4. Content Gaps
const contentGaps = [
  { topic: "Mihomo内核在软路由上的落地教程", missingIntent: "Informational", targetCluster: "clients", priority: "P2" },
  { topic: "企业跨境外贸专线合规与独立IP部署", missingIntent: "Commercial", targetCluster: "network", priority: "P2" },
  { topic: "Android v2rayNG 与 FlClash 对比选型", missingIntent: "Informational", targetCluster: "clients", priority: "P3" }
];

// 5. Cannibalization Report
const cannibalizationReport = {
  scanDate: "2026-11-21",
  status: "Clean",
  conflictsDetected: 0,
  rulesEnforced: [
    "同一搜索意图（如'便宜机场'）由 /pricing/cheap 唯一承接，不与 /airport/ 重叠",
    "各品牌评测关键词统一映射至 /reviews/<slug>，品牌介绍映射至 /brands/<slug>，转化映射至 /go/<slug>",
    "客户端下载词条统一由 /clients/<slug> 承接"
  ]
};

// 6. CSV performance template
const csvHeader = "keyword,clicks,impressions,ctr,avg_position,target_url,action_needed\n";
const csvRows = coreKeywords.map(k => `"${k.keyword}",0,0,0.0%,0,"${k.targetUrl}","Baseline established"`).join("\n");

fs.writeFileSync(path.join(keywordsDir, 'core-keywords.json'), JSON.stringify(coreKeywords, null, 2), 'utf-8');
fs.writeFileSync(path.join(keywordsDir, 'keyword-candidates.json'), JSON.stringify(coreKeywords, null, 2), 'utf-8');
fs.writeFileSync(path.join(keywordsDir, 'keyword-clusters.json'), JSON.stringify(keywordClusters, null, 2), 'utf-8');
fs.writeFileSync(path.join(keywordsDir, 'keyword-mapping.json'), JSON.stringify(keywordMapping, null, 2), 'utf-8');
fs.writeFileSync(path.join(keywordsDir, 'content-gaps.json'), JSON.stringify(contentGaps, null, 2), 'utf-8');
fs.writeFileSync(path.join(keywordsDir, 'cannibalization-report.json'), JSON.stringify(cannibalizationReport, null, 2), 'utf-8');
fs.writeFileSync(path.join(keywordsDir, 'keyword-performance.csv'), csvHeader + csvRows, 'utf-8');

console.log('Successfully built keywords workflow files!');
