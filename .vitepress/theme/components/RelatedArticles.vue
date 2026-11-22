<template>
  <div class="related-articles-section">
    <div class="section-heading">
      <span class="icon">🔗</span>
      <h4>相关推荐与延伸阅读</h4>
    </div>
    <div class="related-list">
      <a v-for="item in items" :key="item.link" :href="item.link" class="related-item">
        <span class="arrow">▸</span>
        <span class="title">{{ item.title }}</span>
        <span v-if="item.badge" class="badge">{{ item.badge }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { title: '2026年机场推荐选购指南与避坑指南', link: '/airport/guide-2026', badge: '新手必读' },
      { title: '稳定机场必须满足的六大技术指标', link: '/airport/stable', badge: '技术解析' },
      { title: 'Clash Verge Rev 电脑端全套配置指南', link: '/clients/clash-verge-rev', badge: '热门教程' },
      { title: '节点全红超时排查流程与DNS修复', link: '/troubleshooting/timeout', badge: '故障解决' }
    ]
  }
})
</script>

<style scoped>
.related-articles-section {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  margin: 2rem 0;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.section-heading .icon {
  font-size: 1.1rem;
}

.section-heading h4 {
  margin: 0;
  font-size: 1rem;
  color: #0f172a;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.related-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: #334155;
  text-decoration: none !important;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.related-item:hover {
  background: #ffffff;
  color: #2563eb;
  padding-left: 0.75rem;
}

.related-item .arrow {
  color: #2563eb;
  font-weight: bold;
}

.related-item .title {
  flex: 1;
}

.related-item .badge {
  font-size: 0.7rem;
  background: #e2e8f0;
  color: #475569;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}
</style>
