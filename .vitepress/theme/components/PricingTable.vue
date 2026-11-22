<template>
  <div class="pricing-table-wrap">
    <table class="styled-pricing-table">
      <thead>
        <tr>
          <th>套餐名称</th>
          <th>计费方式</th>
          <th>价格</th>
          <th>流量规格</th>
          <th>说明与适用场景</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, idx) in plans" :key="idx" :class="{ 'highlight-row': p.isPopular }">
          <td class="plan-name">
            <strong>{{ p.name }}</strong>
            <span v-if="p.isPopular" class="popular-tag">🔥 热门推荐</span>
          </td>
          <td>{{ p.period }}</td>
          <td class="price-td">¥{{ p.price }}</td>
          <td>{{ p.bandwidth }}</td>
          <td class="plan-notes">{{ p.notes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  plans: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.pricing-table-wrap {
  overflow-x: auto;
  margin: 1.25rem 0;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.styled-pricing-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.88rem;
  background: #ffffff;
}

.styled-pricing-table th {
  background: #f8fafc;
  color: #334155;
  padding: 0.75rem 1rem;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
}

.styled-pricing-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #475569;
}

.styled-pricing-table tr:hover {
  background: #f8fafc;
}

.highlight-row {
  background: #eff6ff !important;
}

.plan-name {
  color: #0f172a;
}

.popular-tag {
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  color: #2563eb;
  background: #dbeafe;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.price-td {
  color: #dc2626;
  font-weight: 700;
}

.plan-notes {
  font-size: 0.82rem;
  color: #64748b;
}
</style>
