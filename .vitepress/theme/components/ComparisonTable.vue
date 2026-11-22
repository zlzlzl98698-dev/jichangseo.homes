<template>
  <div class="comparison-table-wrap">
    <table class="styled-comparison-table">
      <thead>
        <tr>
          <th>品牌</th>
          <th>线路类型</th>
          <th>最低入门</th>
          <th>实测延迟/下载</th>
          <th>AI/流媒体支持</th>
          <th>特有卖点</th>
          <th>快捷入口</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in brands" :key="b.id" :class="{ 'primary-row': b.isPrimary }">
          <td class="brand-col">
            <img :src="b.logo" :alt="b.name" class="mini-logo" />
            <div class="brand-text">
              <strong>{{ b.name }}</strong>
              <span v-if="b.isPrimary" class="p-flag">第一主推</span>
            </div>
          </td>
          <td>{{ (b.networkTypes && b.networkTypes[0]) || '专线架构' }}</td>
          <td class="price-val">¥{{ b.minPriceMonthly || '8' }}/月起</td>
          <td>
            <span v-if="b.benchmarkResults && b.benchmarkResults.image" class="badge-verified">✓ 实测验证</span>
            <span v-else class="badge-claimed">资料记录</span>
            <div class="bench-sub">{{ (b.benchmarkResults && b.benchmarkResults.latency) ? b.benchmarkResults.latency.split('/')[0] : '30ms' }}</div>
          </td>
          <td>
            <div class="support-tags">
              <span>ChatGPT {{ (b.aiSupport && b.aiSupport.chatgpt && b.aiSupport.chatgpt.includes('支持')) ? '✓' : '~' }}</span>
              <span>Netflix {{ (b.streamingSupport && b.streamingSupport.netflix && b.streamingSupport.netflix.includes('解锁')) ? '✓' : '~' }}</span>
            </div>
          </td>
          <td class="strengths-col">{{ (b.strengths && b.strengths[0]) || b.tagline || '专线直达' }}</td>
          <td class="action-col">
            <a :href="b.affiliateUrl" target="_blank" rel="nofollow sponsored noopener" class="table-go-btn">
              官网 ➔
            </a>
            <a :href="'/reviews/' + b.slug" class="table-rev-btn">评测</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  brands: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.comparison-table-wrap {
  overflow-x: auto;
  margin: 1.5rem 0;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.styled-comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;
  background: #ffffff;
}

.styled-comparison-table th {
  background: #f8fafc;
  color: #334155;
  padding: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}

.styled-comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.primary-row {
  background: #eff6ff !important;
}

.brand-col {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mini-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 2px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.p-flag {
  font-size: 0.65rem;
  color: #2563eb;
  font-weight: 600;
}

.price-val {
  color: #dc2626;
  font-weight: 700;
  white-space: nowrap;
}

.badge-verified {
  font-size: 0.7rem;
  background: #dcfce7;
  color: #166534;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-weight: 600;
}

.badge-claimed {
  font-size: 0.7rem;
  background: #f1f5f9;
  color: #64748b;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.bench-sub {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.15rem;
}

.support-tags {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.75rem;
  color: #475569;
}

.strengths-col {
  font-size: 0.78rem;
  color: #64748b;
  max-width: 200px;
}

.action-col {
  white-space: nowrap;
}

.table-go-btn {
  background: #2563eb;
  color: #ffffff !important;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  text-decoration: none !important;
  margin-right: 0.35rem;
}

.table-rev-btn {
  background: #f1f5f9;
  color: #334155 !important;
  border: 1px solid #cbd5e1;
  font-size: 0.75rem;
  padding: 0.25rem 0.45rem;
  border-radius: 4px;
  text-decoration: none !important;
}
</style>
