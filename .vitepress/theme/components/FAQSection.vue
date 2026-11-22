<template>
  <div class="faq-accordion-wrap">
    <div v-for="(item, idx) in faqs" :key="idx" class="faq-item" :class="{ open: openIndexes.includes(idx) }">
      <div class="faq-question" @click="toggle(idx)">
        <span class="q-icon">Q:</span>
        <h4 class="q-title">{{ item.q }}</h4>
        <span class="q-arrow">{{ openIndexes.includes(idx) ? '▲' : '▼' }}</span>
      </div>
      <div v-show="openIndexes.includes(idx)" class="faq-answer">
        <p>{{ item.a }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  faqs: {
    type: Array,
    default: () => []
  }
})

// Open the first one by default
const openIndexes = ref([0])

function toggle(idx) {
  if (openIndexes.value.includes(idx)) {
    openIndexes.value = openIndexes.value.filter(i => i !== idx)
  } else {
    openIndexes.value.push(idx)
  }
}
</script>

<style scoped>
.faq-accordion-wrap {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  overflow: hidden;
  transition: all 0.2s ease;
}

.faq-item.open {
  border-color: #3b82f6;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.08);
}

.faq-question {
  display: flex;
  align-items: center;
  padding: 0.85rem 1.15rem;
  cursor: pointer;
  background: #f8fafc;
  user-select: none;
}

.faq-question:hover {
  background: #f1f5f9;
}

.q-icon {
  font-weight: 800;
  color: #2563eb;
  margin-right: 0.6rem;
  font-size: 1rem;
}

.q-title {
  margin: 0;
  flex: 1;
  font-size: 0.95rem;
  color: #0f172a;
}

.q-arrow {
  color: #94a3b8;
  font-size: 0.75rem;
}

.faq-answer {
  padding: 0.85rem 1.15rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.88rem;
  color: #475569;
  line-height: 1.6;
  background: #ffffff;
}

.faq-answer p {
  margin: 0;
}
</style>
