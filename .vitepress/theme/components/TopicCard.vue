<template>
  <div class="topic-cards-grid">
    <a
      v-for="item in topics"
      :key="item.link"
      :href="item.link"
      class="topic-card"
    >
      <div class="card-icon-wrap">{{ item.icon || '📌' }}</div>
      <div class="card-text">
        <h3 class="topic-title">{{ item.title }}</h3>
        <p class="topic-desc">{{ item.description }}</p>
      </div>
      <span class="enter-arrow">➔</span>
    </a>
  </div>
</template>

<script setup>
defineProps({
  topics: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.topic-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.topic-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  text-decoration: none !important;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.topic-card:hover {
  transform: translateY(-2px);
  border-color: #2563eb;
  box-shadow: 0 6px 12px rgba(37, 99, 235, 0.08);
}

.card-icon-wrap {
  font-size: 1.8rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff6ff;
  border-radius: 8px;
  flex-shrink: 0;
}

.card-text {
  flex: 1;
}

.topic-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

.topic-desc {
  margin: 0;
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.4;
}

.enter-arrow {
  color: #94a3b8;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.topic-card:hover .enter-arrow {
  color: #2563eb;
  transform: translateX(4px);
}
</style>
