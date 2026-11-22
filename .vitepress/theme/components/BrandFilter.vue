<template>
  <div class="brand-filter-system">
    <!-- Filter Bar -->
    <div class="filter-controls">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索品牌名称、别名或协议 (如 光速云 / VLESS / IEPL)..."
          class="filter-input"
        />
        <span v-if="searchQuery" class="clear-search" @click="searchQuery = ''">✕</span>
      </div>

      <div class="filter-tags-row">
        <div class="filter-group">
          <span class="group-label">线路性质:</span>
          <button
            v-for="line in ['全部', 'IEPL专线', 'IPLC专线', 'BGP中转']"
            :key="line"
            :class="['tag-btn', selectedLine === line ? 'active' : '']"
            @click="selectedLine = line"
          >
            {{ line }}
          </button>
        </div>

        <div class="filter-group">
          <span class="group-label">月付预算:</span>
          <button
            v-for="p in ['全部', '10元以内', '10-20元', '20元以上']"
            :key="p"
            :class="['tag-btn', selectedPrice === p ? 'active' : '']"
            @click="selectedPrice = p"
          >
            {{ p }}
          </button>
        </div>

        <div class="filter-group">
          <span class="group-label">特殊需求:</span>
          <button
            :class="['tag-btn', onlyVerified ? 'active' : '']"
            @click="onlyVerified = !onlyVerified"
          >
            ✓ 仅看有实测图 ({{ verifiedCount }})
          </button>
        </div>
      </div>

      <div class="filter-summary">
        共筛选出 <strong>{{ filteredBrands.length }}</strong> 家机场服务商
      </div>
    </div>

    <!-- Brand Cards Grid -->
    <div class="brands-grid">
      <div
        v-for="brand in filteredBrands"
        :key="brand.id"
        class="brand-card"
        :class="{ 'featured-card': brand.isPrimary }"
      >
        <div v-if="brand.isPrimary" class="primary-badge">👑 综合第一主推</div>
        <div class="card-top">
          <img :src="brand.logo" :alt="brand.name" class="card-logo" />
          <div class="card-title-area">
            <div class="card-name-row">
              <h4 class="card-name">{{ brand.name }}</h4>
              <span class="card-rank">#{{ brand.rank }}</span>
            </div>
            <p class="card-tagline">{{ brand.tagline }}</p>
          </div>
        </div>

        <div class="card-specs">
          <div class="spec-row">
            <span class="spec-k">起步价格:</span>
            <span class="spec-v price-highlight">¥{{ brand.minPriceMonthly }} /月起</span>
          </div>
          <div class="spec-row">
            <span class="spec-k">线路架构:</span>
            <span class="spec-v">{{ brand.networkTypes[0] }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-k">核心协议:</span>
            <span class="spec-v">{{ brand.protocols.join(', ') }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-k">测速状态:</span>
            <span :class="['spec-v', brand.benchmarkResults.image ? 'text-green' : 'text-gray']">
              {{ brand.benchmarkResults.image ? '✓ MAI-TEST 实测' : '资料记录' }}
            </span>
          </div>
        </div>

        <!-- Coupon row if exists -->
        <div v-if="brand.coupon" class="card-coupon">
          <span>券码: <code>{{ brand.coupon }}</code></span>
          <span v-if="brand.couponDiscount" class="coupon-sub">({{ brand.couponDiscount }})</span>
        </div>

        <div class="card-actions">
          <a :href="'/go/' + brand.slug" target="_blank" rel="nofollow sponsored noopener" class="btn-primary">
            直达官网 ➔
          </a>
          <a :href="'/reviews/' + brand.slug" class="btn-outline">
            深度评测
          </a>
          <a :href="'/brands/' + brand.slug" class="btn-sub">
            套餐说明
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import brandsData from '../../../data/brands/brands.json'

const brands = ref(brandsData)
const searchQuery = ref('')
const selectedLine = ref('全部')
const selectedPrice = ref('全部')
const onlyVerified = ref(false)

const verifiedCount = computed(() => {
  return brands.value.filter(b => !!b.benchmarkResults.image).length
})

const filteredBrands = computed(() => {
  return brands.value.filter(b => {
    // Search query
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase().trim()
      const matchName = b.name.toLowerCase().includes(q)
      const matchAliases = (b.aliases || []).some(a => a.toLowerCase().includes(q))
      const matchProto = (b.protocols || []).some(p => p.toLowerCase().includes(q))
      const matchNet = (b.networkTypes || []).some(n => n.toLowerCase().includes(q))
      if (!matchName && !matchAliases && !matchProto && !matchNet) return false
    }

    // Line filter
    if (selectedLine.value !== '全部') {
      const hasLine = (b.networkTypes || []).some(n => n.includes(selectedLine.value.replace('专线', '')))
      if (!hasLine) return false
    }

    // Price filter
    if (selectedPrice.value === '10元以内' && b.minPriceMonthly > 10) return false
    if (selectedPrice.value === '10-20元' && (b.minPriceMonthly <= 10 || b.minPriceMonthly > 20)) return false
    if (selectedPrice.value === '20元以上' && b.minPriceMonthly <= 20) return false

    // Verified only
    if (onlyVerified.value && !b.benchmarkResults.image) return false

    return true
  })
})
</script>

<style scoped>
.brand-filter-system {
  margin: 1.5rem 0;
}

.filter-controls {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.search-box {
  position: relative;
  margin-bottom: 1rem;
}

.filter-input {
  width: 100%;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 0.95rem;
  background: #ffffff;
  color: #1e293b;
  outline: none;
  box-sizing: border-box;
}

.filter-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.clear-search {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #94a3b8;
  font-size: 0.85rem;
}

.filter-tags-row {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
}

.filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.group-label {
  font-size: 0.8rem;
  color: #64748b;
  min-width: 65px;
}

.tag-btn {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 0.78rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tag-btn:hover {
  border-color: #94a3b8;
}

.tag-btn.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
}

.filter-summary {
  font-size: 0.82rem;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
  padding-top: 0.65rem;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.brand-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.brand-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  border-color: #cbd5e1;
}

.brand-card.featured-card {
  border: 2px solid #3b82f6;
  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);
}

.primary-badge {
  position: absolute;
  top: -10px;
  right: 15px;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
}

.card-top {
  display: flex;
  gap: 0.85rem;
  align-items: center;
  margin-bottom: 0.85rem;
}

.card-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  padding: 2px;
}

.card-title-area {
  flex: 1;
}

.card-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-name {
  margin: 0;
  font-size: 1.1rem;
  color: #0f172a;
}

.card-rank {
  font-size: 0.75rem;
  color: #94a3b8;
  font-family: monospace;
}

.card-tagline {
  margin: 0.2rem 0 0 0;
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.3;
}

.card-specs {
  background: #f8fafc;
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.8rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
}

.spec-k {
  color: #64748b;
}

.spec-v {
  font-weight: 600;
  color: #1e293b;
}

.price-highlight {
  color: #dc2626;
  font-weight: 700;
}

.text-green {
  color: #10b981;
}

.text-gray {
  color: #94a3b8;
}

.card-coupon {
  font-size: 0.75rem;
  background: #fffbeb;
  border: 1px dashed #fde68a;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  color: #92400e;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-coupon code {
  color: #b45309;
  font-weight: bold;
}

.coupon-sub {
  color: #d97706;
}

.card-actions {
  display: flex;
  gap: 0.4rem;
}

.btn-primary, .btn-outline, .btn-sub {
  font-size: 0.78rem;
  padding: 0.45rem 0.65rem;
  border-radius: 6px;
  text-align: center;
  text-decoration: none !important;
  font-weight: 600;
  transition: all 0.15s ease;
}

.btn-primary {
  flex: 1 1 auto;
  background: #2563eb;
  color: #ffffff !important;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-outline {
  background: #f1f5f9;
  color: #334155 !important;
  border: 1px solid #cbd5e1;
}

.btn-outline:hover {
  background: #e2e8f0;
}

.btn-sub {
  background: #ffffff;
  color: #64748b !important;
  border: 1px solid #e2e8f0;
}

.btn-sub:hover {
  background: #f8fafc;
}
</style>
