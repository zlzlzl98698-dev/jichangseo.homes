const fs = require('fs');
const path = require('path');

const longtailKeywords = [
  // 01 机场推荐
  { keyword: '机场推荐应该看哪些指标', primaryKeyword: '机场推荐指标', searchIntent: 'Informational', targetUrl: '/airport/recommendation-metrics', parentTopic: '01 机场推荐', priority: 'P1' },
  { keyword: '机场晚高峰测速怎么看', primaryKeyword: '晚高峰测速判断', searchIntent: 'Informational', targetUrl: '/airport/peak-hour-benchmarking', parentTopic: '01 机场推荐', priority: 'P0' },
  { keyword: '新手第一次买机场选月付还是年付', primaryKeyword: '新手买机场付款周期', searchIntent: 'Commercial', targetUrl: '/airport/beginner-billing-cycle', parentTopic: '01 机场推荐', priority: 'P0' },
  { keyword: '自研客户端机场适合新手吗', primaryKeyword: '自研客户端好用吗', searchIntent: 'Commercial', targetUrl: '/airport/custom-client-pros-cons', parentTopic: '01 机场推荐', priority: 'P1' },
  { keyword: '多设备家庭如何选择机场套餐', primaryKeyword: '多设备机场选择', searchIntent: 'Commercial', targetUrl: '/airport/multi-device-airport-plan', parentTopic: '01 机场推荐', priority: 'P1' },
  
  // 02 价格与套餐
  { keyword: '10元左右机场套餐怎么选', primaryKeyword: '10元便宜机场', searchIntent: 'Commercial', targetUrl: '/pricing/10-yuan-plans', parentTopic: '02 价格与套餐', priority: 'P0' },
  { keyword: '一元机场适合长期用吗', primaryKeyword: '一元机场长期使用风险', searchIntent: 'Commercial', targetUrl: '/pricing/one-yuan-long-term-risks', parentTopic: '02 价格与套餐', priority: 'P0' },
  { keyword: '100G流量够看多久视频', primaryKeyword: '100G流量使用时长', searchIntent: 'Informational', targetUrl: '/pricing/100gb-usage-estimation', parentTopic: '02 价格与套餐', priority: 'P1' },
  { keyword: '不限时机场流量包有什么猫腻', primaryKeyword: '不限时机场限制', searchIntent: 'Commercial', targetUrl: '/pricing/no-expiry-hidden-rules', parentTopic: '02 价格与套餐', priority: 'P0' },
  { keyword: '为什么真IPLC不可能有便宜套餐', primaryKeyword: '便宜IPLC骗局', searchIntent: 'Commercial', targetUrl: '/pricing/cheap-iplc-scam', parentTopic: '02 价格与套餐', priority: 'P0' },
  
  // 03 机场品牌
  { keyword: '如何判断机场官网是否真实', primaryKeyword: '判断机场真实官网', searchIntent: 'Informational', targetUrl: '/brands/verify-official-mirror', parentTopic: '03 机场品牌', priority: 'P0' },
  { keyword: '机场品牌运营时间怎么查', primaryKeyword: '核实机场成立时间', searchIntent: 'Informational', targetUrl: '/brands/verify-foundation-year', parentTopic: '03 机场品牌', priority: 'P1' },
  { keyword: '机场优惠码无法使用怎么办', primaryKeyword: '优惠码失效原因', searchIntent: 'Troubleshooting', targetUrl: '/brands/coupon-troubleshooting', parentTopic: '03 机场品牌', priority: 'P1' },
  { keyword: '光速云和微风网络哪个好', primaryKeyword: '光速云对比微风网络', searchIntent: 'Comparison', targetUrl: '/compare/guangsu-vs-weifeng', parentTopic: '03 机场品牌', priority: 'P0' },
  { keyword: '飞猫云和星岛梦哪个适合小白', primaryKeyword: '飞猫云对比星岛梦', searchIntent: 'Comparison', targetUrl: '/compare/feimao-vs-xingdaomeng', parentTopic: '03 机场品牌', priority: 'P0' },

  // 04 VPN与加速器
  { keyword: 'VPN和机场代理有什么区别', primaryKeyword: 'VPN与代理区别', searchIntent: 'Informational', targetUrl: '/vpn/vpn-vs-proxy-deep-dive', parentTopic: '04 VPN与加速器', priority: 'P0' },
  { keyword: '免费VPN有哪些安全风险', primaryKeyword: '免费VPN危害', searchIntent: 'Informational', targetUrl: '/vpn/free-vpn-risks-analysis', parentTopic: '04 VPN与加速器', priority: 'P0' },
  { keyword: '手机翻墙为什么老是自动断开', primaryKeyword: '手机代理后台断开', searchIntent: 'Troubleshooting', targetUrl: '/vpn/mobile-keepalive-optimization', parentTopic: '04 VPN与加速器', priority: 'P0' },
  { keyword: '电脑连不上VPN报7890端口冲突', primaryKeyword: '7890端口冲突解决', searchIntent: 'Troubleshooting', targetUrl: '/vpn/fix-7890-port-conflict', parentTopic: '04 VPN与加速器', priority: 'P0' },
  { keyword: '电竞联机Full Cone NAT穿透优化', primaryKeyword: '游戏NAT穿透优化', searchIntent: 'How-to', targetUrl: '/vpn/full-cone-nat-gaming-guide', parentTopic: '04 VPN与加速器', priority: 'P1' },

  // 05 客户端软件
  { keyword: 'Clash Verge Rev怎么安装配置', primaryKeyword: 'Clash Verge安装教程', searchIntent: 'How-to', targetUrl: '/clients/clash-verge-rev-setup', parentTopic: '05 客户端软件', priority: 'P0' },
  { keyword: 'v2rayN导入订阅教程', primaryKeyword: 'v2rayN导入订阅', searchIntent: 'How-to', targetUrl: '/clients/v2rayn-subscription-import', parentTopic: '05 客户端软件', priority: 'P0' },
  { keyword: '美区Apple ID注册购买小火箭教程', primaryKeyword: '小火箭购买教程', searchIntent: 'How-to', targetUrl: '/clients/us-apple-id-registration', parentTopic: '05 客户端软件', priority: 'P0' },
  { keyword: 'sing-box通用JSON配置语法解析', primaryKeyword: 'sing-box配置教程', searchIntent: 'How-to', targetUrl: '/clients/sing-box-config-guide', parentTopic: '05 客户端软件', priority: 'P1' },
  { keyword: 'Mac提示应用损坏xattr一键清除', primaryKeyword: 'Mac应用损坏解决', searchIntent: 'Troubleshooting', targetUrl: '/clients/macos-gatekeeper-bypass', parentTopic: '05 客户端软件', priority: 'P0' },

  // 06 AI与流媒体
  { keyword: 'ChatGPT报Access Denied 1020怎么办', primaryKeyword: 'ChatGPT 1020解决', searchIntent: 'Troubleshooting', targetUrl: '/ai-streaming/chatgpt-error-1020-fix', parentTopic: '06 AI与流媒体', priority: 'P0' },
  { keyword: 'Claude 3.5防封号与纯净住宅IP选型', primaryKeyword: 'Claude防封号技巧', searchIntent: 'Troubleshooting', targetUrl: '/ai-streaming/claude-anti-ban-strategy', parentTopic: '06 AI与流媒体', priority: 'P0' },
  { keyword: 'Netflix只能看自制剧不能看全区怎么办', primaryKeyword: 'Netflix全区解锁检测', searchIntent: 'Troubleshooting', targetUrl: '/ai-streaming/netflix-unlock-check', parentTopic: '06 AI与流媒体', priority: 'P0' },
  { keyword: 'YouTube画质4K转圈丢帧排查', primaryKeyword: 'YouTube 4K卡顿解决', searchIntent: 'Troubleshooting', targetUrl: '/ai-streaming/youtube-4k-buffering-fix', parentTopic: '06 AI与流媒体', priority: 'P1' },
  { keyword: 'Disney+报Error 83怎么修复', primaryKeyword: 'Disney+ Error 83修复', searchIntent: 'Troubleshooting', targetUrl: '/ai-streaming/disney-error-codes-fix', parentTopic: '06 AI与流媒体', priority: 'P0' },

  // 07 线路与节点
  { keyword: 'IEPL与IPLC专线有什么区别', primaryKeyword: 'IEPL和IPLC区别', searchIntent: 'Informational', targetUrl: '/network/iepl-vs-iplc-comparison', parentTopic: '07 线路与节点', priority: 'P0' },
  { keyword: '使用MTR和BestTrace鉴别假专线', primaryKeyword: '假专线鉴别方法', searchIntent: 'How-to', targetUrl: '/network/fake-line-identification', parentTopic: '07 线路与节点', priority: 'P0' },
  { keyword: '香港节点ChatGPT打不开客户端分流', primaryKeyword: 'ChatGPT绕过香港节点', searchIntent: 'How-to', targetUrl: '/tutorials/chatgpt-bypass-hk-rules', parentTopic: '07 线路与节点', priority: 'P0' },
  { keyword: '节点倍率0.2x与3.0x怎么算账', primaryKeyword: '节点倍率算账', searchIntent: 'Informational', targetUrl: '/network/node-multiplier-accounting', parentTopic: '07 线路与节点', priority: 'P0' },
  { keyword: '美国节点130ms延迟物理极限解析', primaryKeyword: '美国节点延迟极限', searchIntent: 'Informational', targetUrl: '/network/us-latency-physics-limit', parentTopic: '07 线路与节点', priority: 'P1' },

  // 08 使用教程
  { keyword: 'Clash配置自动定时更新订阅', primaryKeyword: 'Clash自动更新配置', searchIntent: 'How-to', targetUrl: '/tutorials/clash-auto-update-cron', parentTopic: '08 使用教程', priority: 'P0' },
  { keyword: 'Clash Fallback策略组高可用配置', primaryKeyword: 'Clash Fallback设置', searchIntent: 'How-to', targetUrl: '/tutorials/clash-fallback-setup', parentTopic: '08 使用教程', priority: 'P0' },
  { keyword: 'Windows开启TUN虚拟网卡开发加速', primaryKeyword: 'Wintun开发环境加速', searchIntent: 'How-to', targetUrl: '/tutorials/wintun-development-setup', parentTopic: '08 使用教程', priority: 'P0' },
  { keyword: 'Fake-IP模式与防DNS泄露全流程', primaryKeyword: 'Fake-IP防DNS泄露', searchIntent: 'How-to', targetUrl: '/tutorials/fake-ip-dns-anti-leak', parentTopic: '08 使用教程', priority: 'P0' },
  { keyword: '同一订阅多设备Allow LAN局域网共享', primaryKeyword: '局域网代理共享设置', searchIntent: 'How-to', targetUrl: '/tutorials/allow-lan-proxy-sharing', parentTopic: '08 使用教程', priority: 'P0' },

  // 09 故障排查
  { keyword: '节点全部超时Timeout黄金五步排查', primaryKeyword: '节点全部超时急救', searchIntent: 'Troubleshooting', targetUrl: '/troubleshooting/timeout-golden-rules', parentTopic: '09 故障排查', priority: 'P0' },
  { keyword: '订阅更新报403 Forbidden怎么办', primaryKeyword: '订阅403修复', searchIntent: 'Troubleshooting', targetUrl: '/troubleshooting/subscription-403-fix', parentTopic: '09 故障排查', priority: 'P0' },
  { keyword: '关掉代理后电脑断网微信能上网页不行', primaryKeyword: '关代理断网修复', searchIntent: 'Troubleshooting', targetUrl: '/troubleshooting/proxy-disable-restore-net', parentTopic: '09 故障排查', priority: 'P0' },
  { keyword: '一键释放7890端口冲突批处理脚本', primaryKeyword: '释放7890端口脚本', searchIntent: 'Troubleshooting', targetUrl: '/troubleshooting/kill-port-conflict-script', parentTopic: '09 故障排查', priority: 'P0' },
  { keyword: '测速几百兆但网页卡顿单线程拥塞排查', primaryKeyword: '测速快网页慢解决', searchIntent: 'Troubleshooting', targetUrl: '/troubleshooting/single-thread-congestion-fix', parentTopic: '09 故障排查', priority: 'P0' },

  // 10 风险与替代
  { keyword: '机场跑路前兆量化指标与历史复盘', primaryKeyword: '机场跑路预警指标', searchIntent: 'Informational', targetUrl: '/safety/airport-runaway-early-warning', parentTopic: '10 风险与替代', priority: 'P0' },
  { keyword: '被机场跑路后微信支付宝投诉撤单教程', primaryKeyword: '机场投诉退款教程', searchIntent: 'How-to', targetUrl: '/safety/payment-chargeback-guide', parentTopic: '10 风险与替代', priority: 'P0' },
  { keyword: '主备双机场高可用冷热备用搭建指南', primaryKeyword: '双机场高可用配置', searchIntent: 'How-to', targetUrl: '/safety/dual-airport-high-availability', parentTopic: '10 风险与替代', priority: 'P0' },
  { keyword: 'TLS 1.3端到端加密站长能看到什么隐私', primaryKeyword: '机场站长能看隐私吗', searchIntent: 'Informational', targetUrl: '/safety/tls-privacy-boundary', parentTopic: '10 风险与替代', priority: 'P0' },
  { keyword: '使用Whois和Telegram历史消息核验机场成立时间', primaryKeyword: '核验机场真实历史', searchIntent: 'How-to', targetUrl: '/safety/verify-airport-history-osint', parentTopic: '10 风险与替代', priority: 'P1' }
];

// Ensure directory exists
if (!fs.existsSync('data/keywords')) {
  fs.mkdirSync('data/keywords', { recursive: true });
}

// 1. Write longtail-master.csv
let csv = 'keyword,primaryKeyword,searchIntent,targetUrl,parentTopic,priority\n';
longtailKeywords.forEach(k => {
  csv += `"${k.keyword}","${k.primaryKeyword}","${k.searchIntent}","${k.targetUrl}","${k.parentTopic}","${k.priority}"\n`;
});
fs.writeFileSync('data/keywords/longtail-master.csv', csv, 'utf8');

// 2. Write article-keyword-map.json
fs.writeFileSync('data/keywords/article-keyword-map.json', JSON.stringify(longtailKeywords, null, 2), 'utf8');

// 3. Write cluster-map.json
const clusters = {};
longtailKeywords.forEach(k => {
  if (!clusters[k.parentTopic]) clusters[k.parentTopic] = [];
  clusters[k.parentTopic].push(k);
});
fs.writeFileSync('data/keywords/cluster-map.json', JSON.stringify(clusters, null, 2), 'utf8');

// 4. Write content-priority.csv
let pCsv = 'priority,targetUrl,articleTitle,primaryKeyword,searchIntent,parentTopic\n';
longtailKeywords.sort((a,b) => a.priority.localeCompare(b.priority)).forEach(k => {
  pCsv += `"${k.priority}","${k.targetUrl}","${k.keyword}","${k.primaryKeyword}","${k.searchIntent}","${k.parentTopic}"\n`;
});
fs.writeFileSync('data/keywords/content-priority.csv', pCsv, 'utf8');

console.log('Successfully generated 4 keyword data files! Total keywords:', longtailKeywords.length);
