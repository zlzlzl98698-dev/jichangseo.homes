<template>
  <div class="benchmark-report">
    <div class="report-header">
      <div class="header-left">
        <span class="report-badge">NETWORK OBSERVATORY</span>
        <h4 class="report-title">🌐 {{ brandName }} 节点性能测速实测报告</h4>
      </div>
      <div class="header-right">
        <span class="test-time">{{ testedAt || '近期实测' }}</span>
        <span :class="['status-pill', isVerified ? 'verified' : 'unverified']">
          {{ isVerified ? '✓ 实测验证' : '⚠️ 厂商宣称' }}
        </span>
      </div>
    </div>

    <div class="report-meta">
      <div class="meta-item">
        <span class="meta-label">测试环境:</span>
        <span class="meta-value">{{ testEnv || 'Clash Verge Rev / MAI-TEST-BOT' }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">数据来源:</span>
        <span class="meta-value">{{ source || 'MAI-TEST-BOT 自动化测速' }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">丢包率:</span>
        <span class="meta-value text-green">{{ packetLoss || '0%' }}</span>
      </div>
    </div>

    <!-- Speed progress list -->
    <div class="nodes-metrics" v-if="nodes && nodes.length > 0">
      <div v-for="(node, idx) in nodes" :key="idx" class="node-row">
        <div class="node-info">
          <span class="node-flag">🟢 {{ node.region }}</span>
          <span class="node-latency">延迟: <strong>{{ node.latency }}</strong></span>
          <span class="node-speed">下载: <strong class="speed-val">{{ node.speed }}</strong></span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: getPercentage(node.speed) }"></div>
        </div>
      </div>
    </div>

    <!-- Summary Box -->
    <div class="report-summary">
      <div class="summary-item">
        <span class="label">平均延迟</span>
        <span class="value">{{ avgLatency || '32ms' }}</span>
      </div>
      <div class="summary-item">
        <span class="label">峰值下载</span>
        <span class="value text-accent">{{ maxSpeed || '500+ Mbps' }}</span>
      </div>
      <div class="summary-item">
        <span class="label">线路性质</span>
        <span class="value">{{ lineType || 'IEPL / IPLC 专线' }}</span>
      </div>
    </div>

    <!-- Image preview if present -->
    <div v-if="image" class="report-image-box">
      <div class="image-label">实测图档证据:</div>
      <a :href="image" target="_blank" rel="noopener" class="image-link">
        <img :src="image" :alt="brandName + ' 测速实测图片'" class="benchmark-img" loading="lazy" />
      </a>
      <p class="image-tip">点击查看 MAI-TEST-BOT 原始全节点测速凭证</p>
    </div>

    <div class="report-watermark">
      <span>[jichangseo.homes · 机场SEO网络实验室]</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  brandName: { type: String, default: '光速云' },
  testedAt: { type: String, default: '2026-10-19' },
  testEnv: { type: String, default: 'MAI-TEST-BOT 2.0.0-dev / 1000M FTTH' },
  source: { type: String, default: 'MAI-TEST-BOT 自动化测试' },
  packetLoss: { type: String, default: '0%' },
  isVerified: { type: Boolean, default: true },
  avgLatency: { type: String, default: '32ms' },
  maxSpeed: { type: String, default: '529 Mbps' },
  lineType: { type: String, default: 'IEPL 企业专线' },
  image: { type: String, default: '' },
  nodes: {
    type: Array,
    default: () => [
      { region: '香港 IEPL 01', latency: '22ms', speed: '529 Mbps' },
      { region: '台湾 专线 01', latency: '41ms', speed: '114 Mbps' },
      { region: '新加坡 IPLC 01', latency: '46ms', speed: '387 Mbps' },
      { region: '日本 东京 01', latency: '57ms', speed: '135 Mbps' },
      { region: '美国 洛杉矶 01', latency: '143ms', speed: '18 Mbps' }
    ]
  }
})

function getPercentage(speedStr) {
  const match = speedStr.match(/(\d+)/)
  if (!match) return '50%'
  const val = parseInt(match[1], 10)
  if (speedStr.includes('MB/s')) {
    return Math.min(100, Math.round((val / 100) * 100)) + '%'
  }
  return Math.min(100, Math.round((val / 600) * 100)) + '%'
}
</script>

<style scoped>
.benchmark-report {
  background: #0f141c;
  color: #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid #1e293b;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.75rem;
  margin-bottom: 0.85rem;
}

.report-badge {
  display: inline-block;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-bottom: 0.25rem;
}

.report-title {
  margin: 0;
  font-size: 1.05rem;
  color: #f8fafc;
  font-family: inherit;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.test-time {
  font-size: 0.8rem;
  color: #94a3b8;
}

.status-pill {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  font-weight: 600;
}

.status-pill.verified {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.status-pill.unverified {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.report-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.meta-value {
  color: #cbd5e1;
  margin-left: 0.25rem;
}

.text-green {
  color: #10b981;
}

.text-accent {
  color: #38bdf8;
  font-weight: bold;
}

.nodes-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.node-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.node-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.speed-val {
  color: #38bdf8;
}

.progress-bar-bg {
  width: 100%;
  height: 6px;
  background: #1e293b;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #38bdf8 100%);
  border-radius: 3px;
}

.report-summary {
  display: flex;
  justify-content: space-around;
  background: #182234;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #23354f;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.summary-item .label {
  font-size: 0.75rem;
  color: #94a3b8;
}

.summary-item .value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #f1f5f9;
}

.report-image-box {
  margin-top: 1rem;
  border-top: 1px dashed #28374d;
  padding-top: 0.75rem;
}

.image-label {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.benchmark-img {
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid #334155;
  transition: transform 0.2s ease;
}

.benchmark-img:hover {
  transform: scale(1.01);
}

.image-tip {
  font-size: 0.7rem;
  color: #64748b;
  margin-top: 0.35rem;
}

.report-watermark {
  text-align: right;
  font-size: 0.7rem;
  color: #475569;
  margin-top: 0.5rem;
}
</style>
