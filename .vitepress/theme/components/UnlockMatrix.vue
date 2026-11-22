<template>
  <div class="unlock-matrix">
    <div class="matrix-header">
      <div class="header-tag">STREAMING & AI VERIFICATION</div>
      <h4 class="matrix-title">🎬 {{ brandName }} 流媒体与主流 AI 解锁报告</h4>
      <div class="matrix-meta">
        <span>测试节点: {{ testedNode }}</span>
        <span>测试脚本: RegionRestrictionCheck / 生产环境</span>
      </div>
    </div>

    <!-- AI Services Group -->
    <div class="group-title">🤖 人工智能生产力工具</div>
    <div class="grid-container">
      <div class="grid-card" :class="getStatusClass(ai.chatgpt)">
        <div class="card-status-icon">{{ getIcon(ai.chatgpt) }}</div>
        <div class="card-service">ChatGPT</div>
        <div class="card-detail">{{ ai.chatgpt || '原生IP支持' }}</div>
      </div>

      <div class="grid-card" :class="getStatusClass(ai.claude)">
        <div class="card-status-icon">{{ getIcon(ai.claude) }}</div>
        <div class="card-service">Claude</div>
        <div class="card-detail">{{ ai.claude || '免降级支持' }}</div>
      </div>

      <div class="grid-card" :class="getStatusClass(ai.gemini)">
        <div class="card-status-icon">{{ getIcon(ai.gemini) }}</div>
        <div class="card-service">Google Gemini</div>
        <div class="card-detail">{{ ai.gemini || '需指定美英节点' }}</div>
      </div>
    </div>

    <!-- Streaming Services Group -->
    <div class="group-title">📺 海外流媒体与跨境社媒</div>
    <div class="grid-container">
      <div class="grid-card" :class="getStatusClass(streaming.netflix)">
        <div class="card-status-icon">{{ getIcon(streaming.netflix) }}</div>
        <div class="card-service">Netflix (奈飞)</div>
        <div class="card-detail">{{ streaming.netflix || '全区自制与非自制' }}</div>
      </div>

      <div class="grid-card" :class="getStatusClass(streaming.disney)">
        <div class="card-status-icon">{{ getIcon(streaming.disney) }}</div>
        <div class="card-service">Disney+</div>
        <div class="card-detail">{{ streaming.disney || '全区解锁' }}</div>
      </div>

      <div class="grid-card" :class="getStatusClass(streaming.youtube)">
        <div class="card-status-icon">{{ getIcon(streaming.youtube) }}</div>
        <div class="card-service">YouTube</div>
        <div class="card-detail">{{ streaming.youtube || '4K/8K 极速流畅' }}</div>
      </div>

      <div class="grid-card" :class="getStatusClass(streaming.tiktok)">
        <div class="card-status-icon">{{ getIcon(streaming.tiktok) }}</div>
        <div class="card-service">TikTok</div>
        <div class="card-detail">{{ streaming.tiktok || '原生直播/推广支持' }}</div>
      </div>

      <div class="grid-card" :class="getStatusClass(streaming.spotify)">
        <div class="card-status-icon">{{ getIcon(streaming.spotify) }}</div>
        <div class="card-service">Spotify</div>
        <div class="card-detail">{{ streaming.spotify || '全球曲库通畅' }}</div>
      </div>

      <div class="grid-card" :class="getStatusClass(streaming.hbomax)">
        <div class="card-status-icon">{{ getIcon(streaming.hbomax) }}</div>
        <div class="card-service">HBO Max</div>
        <div class="card-detail">{{ streaming.hbomax || '全区完整解锁' }}</div>
      </div>
    </div>

    <div class="matrix-footer">
      <span>💡 注：流媒体及 AI 平台的封锁策略会动态更新。测试结果仅代表当前抽样测试，购买后建议结合本地实际网络多换节点验证。</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  brandName: { type: String, default: '光速云' },
  testedNode: { type: String, default: '香港 IEPL 01 / 日本专线' },
  ai: {
    type: Object,
    default: () => ({
      chatgpt: '支持 / 原生IP',
      claude: '全支持',
      gemini: '需选美英专线'
    })
  },
  streaming: {
    type: Object,
    default: () => ({
      netflix: '全区解锁',
      disney: '全区解锁',
      youtube: '4K/8K极速',
      tiktok: '支持',
      spotify: '全区通畅',
      hbomax: '支持'
    })
  }
})

function getStatusClass(status) {
  if (!status) return 'status-ok'
  const s = String(status).toLowerCase()
  if (s.includes('不') || s.includes('未') || s.includes('受限') || s.includes('封禁') || s.includes('受阻') || s.includes('差')) {
    return 'status-fail'
  }
  if (s.includes('部分') || s.includes('需') || s.includes('视') || s.includes('特定') || s.includes('待测')) {
    return 'status-warn'
  }
  return 'status-ok'
}

function getIcon(status) {
  const cls = getStatusClass(status)
  if (cls === 'status-ok') return '✅'
  if (cls === 'status-warn') return '⚠️'
  return '❌'
}
</script>

<style scoped>
.unlock-matrix {
  background: #0f172a;
  color: #f8fafc;
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid #1e293b;
}

.matrix-header {
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

.header-tag {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #38bdf8;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.matrix-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #ffffff;
}

.matrix-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  font-size: 0.8rem;
  color: #94a3b8;
}

.group-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #93c5fd;
  margin: 0.85rem 0 0.5rem 0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.grid-card {
  background: #1e293b;
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: transform 0.15s ease;
}

.grid-card:hover {
  transform: translateY(-2px);
}

.card-status-icon {
  font-size: 1.1rem;
}

.card-service {
  font-weight: 600;
  font-size: 0.9rem;
  color: #f1f5f9;
}

.card-detail {
  font-size: 0.75rem;
  color: #94a3b8;
}

.grid-card.status-ok {
  border-left: 4px solid #10b981;
}

.grid-card.status-warn {
  border-left: 4px solid #f59e0b;
}

.grid-card.status-fail {
  border-left: 4px solid #ef4444;
}

.matrix-footer {
  border-top: 1px dashed #263346;
  padding-top: 0.6rem;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
}
</style>
