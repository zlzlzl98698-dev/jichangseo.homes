<template>
  <div class="articles-list-grid">
    <a
      v-for="art in articles"
      :key="art.link"
      :href="art.link"
      class="article-card"
    >
      <div class="art-meta-row">
        <span class="art-category">{{ art.category || '深度指南' }}</span>
        <span class="art-date">{{ art.date || '2026-11' }}</span>
      </div>
      <h4 class="art-title">{{ art.title }}</h4>
      <p class="art-summary">{{ art.summary }}</p>
      <div class="art-footer">
        <span class="read-more">阅读全文 ➔</span>
      </div>
    </a>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.articles-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0;
}

.article-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none !important;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.article-card:hover {
  transform: translateY(-2px);
  border-color: #3b82f6;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.08);
}

.art-meta-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.art-category {
  background: #f1f5f9;
  color: #2563eb;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-weight: 600;
}

.art-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
}

.art-summary {
  margin: 0 0 1rem 0;
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.5;
  flex: 1;
}

.art-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 0.65rem;
}

.read-more {
  font-size: 0.82rem;
  font-weight: 600;
  color: #2563eb;
}
</style>
