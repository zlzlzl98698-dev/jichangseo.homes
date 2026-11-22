<template>
  <div class="brand-snapshot" :class="{ 'is-primary': isPrimary }">
    <div v-if="isPrimary" class="primary-flag">🔥 综合推荐第一名</div>

    <div class="snapshot-header">
      <img :src="logo || '/images/logos/galaxy_transparent_square.webp'" :alt="name + ' Logo'" class="brand-logo" />
      <div class="header-info">
        <div class="title-row">
          <h3 class="brand-name">{{ name }}</h3>
          <span class="founded-year">{{ foundedAt ? foundedAt + '年运营' : '老牌稳定' }}</span>
        </div>
        <p class="brand-tagline">{{ tagline }}</p>
      </div>
    </div>

    <div class="specs-grid">
      <div class="spec-cell">
        <span class="spec-label">线路技术</span>
        <span class="spec-val">{{ networkTypes.join(' · ') }}</span>
      </div>
      <div class="spec-cell">
        <span class="spec-label">传输协议</span>
        <span class="spec-val">{{ protocols.join(' / ') }}</span>
      </div>
      <div class="spec-cell">
        <span class="spec-label">节点覆盖</span>
        <span class="spec-val">{{ nodeCount || '50+' }} 核心节点</span>
      </div>
      <div class="spec-cell">
        <span class="spec-label">入门门槛</span>
        <span class="spec-val price">¥{{ minPriceMonthly }} /月起</span>
      </div>
    </div>

    <!-- Coupon Box -->
    <div v-if="coupon" class="coupon-box">
      <div class="coupon-info">
        <span class="coupon-label">专属优惠码:</span>
        <code class="coupon-code">{{ coupon }}</code>
        <span v-if="couponDiscount" class="coupon-discount">({{ couponDiscount }})</span>
      </div>
      <button class="copy-btn" @click="copyCoupon">
        {{ copied ? '已复制 ✓' : '复制券码' }}
      </button>
    </div>

    <!-- Actions & Disclosures -->
    <div class="actions-row">
      <a :href="affiliateUrl" target="_blank" rel="nofollow sponsored noopener" class="cta-button primary-cta">
        前往 {{ name }} 官网注册 ➔
      </a>
      <a :href="'/reviews/' + slug" class="cta-button secondary-cta">
        完整实测评测
      </a>
      <a :href="'/go/' + slug" class="cta-button tertiary-cta">
        套餐配置说明
      </a>
    </div>

    <div class="aff-disclosure">
      <span>* 声明：包含官方推广链接，注册可能产生推广返利，不影响实际购买结算价格。</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: { type: String, default: '光速云' },
  slug: { type: String, default: 'guangsu' },
  tagline: { type: String, default: '企业级 IEPL 专线，VLESS 协议与自研多端支持' },
  foundedAt: { type: String, default: '2020' },
  logo: { type: String, default: '/images/logos/光速云主图.png' },
  isPrimary: { type: Boolean, default: false },
  networkTypes: { type: Array, default: () => ['IEPL 专线', '企业内网'] },
  protocols: { type: Array, default: () => ['VLESS', 'Trojan'] },
  nodeCount: { type: String, default: '70+' },
  minPriceMonthly: { type: [Number, String], default: 8 },
  coupon: { type: String, default: 'AMM' },
  couponDiscount: { type: String, default: '新人专属优惠' },
  affiliateUrl: { type: String, default: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y' }
})

const copied = ref(false)

function copyCoupon() {
  if (props.coupon) {
    navigator.clipboard.writeText(props.coupon).then(() => {
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
    })
  }
}
</script>

<style scoped>
.brand-snapshot {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.brand-snapshot:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

.brand-snapshot.is-primary {
  border: 2px solid #3b82f6;
  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);
}

.primary-flag {
  position: absolute;
  top: -12px;
  right: 1.5rem;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
}

.snapshot-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.brand-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
  background: #ffffff;
  padding: 4px;
}

.header-info {
  flex: 1;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-name {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #0f172a;
}

.founded-year {
  font-size: 0.75rem;
  background: #f1f5f9;
  color: #475569;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.brand-tagline {
  margin: 0.35rem 0 0 0;
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.4;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.75rem;
  background: #f8fafc;
  padding: 0.85rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.spec-cell {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.spec-label {
  font-size: 0.75rem;
  color: #64748b;
}

.spec-val {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e293b;
}

.spec-val.price {
  color: #dc2626;
  font-weight: 700;
}

.coupon-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fffbeb;
  border: 1px dashed #fde68a;
  border-radius: 6px;
  padding: 0.5rem 0.85rem;
  margin-bottom: 1.25rem;
}

.coupon-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #92400e;
}

.coupon-code {
  background: #fef3c7;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 700;
  color: #b45309;
}

.coupon-discount {
  font-size: 0.75rem;
  color: #d97706;
}

.copy-btn {
  background: #d97706;
  color: #ffffff;
  border: none;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.copy-btn:hover {
  background: #b45309;
}

.actions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.cta-button {
  padding: 0.55rem 1rem;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none !important;
  text-align: center;
  transition: all 0.15s ease;
}

.primary-cta {
  background: #2563eb;
  color: #ffffff !important;
  flex: 1 1 180px;
}

.primary-cta:hover {
  background: #1d4ed8;
}

.secondary-cta {
  background: #f1f5f9;
  color: #334155 !important;
  border: 1px solid #cbd5e1;
}

.secondary-cta:hover {
  background: #e2e8f0;
}

.tertiary-cta {
  background: #ffffff;
  color: #64748b !important;
  border: 1px solid #e2e8f0;
}

.tertiary-cta:hover {
  background: #f8fafc;
}

.aff-disclosure {
  font-size: 0.7rem;
  color: #94a3b8;
  line-height: 1.3;
}
</style>
