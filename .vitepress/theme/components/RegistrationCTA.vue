<template>
  <div class="registration-cta-box" :class="{ 'is-featured': isPrimary }">
    <div class="cta-inner">
      <div class="cta-brand-meta">
        <img :src="logo || '/images/logos/光速云主图.png'" :alt="brandName" class="cta-logo" />
        <div class="cta-title-col">
          <div class="tag-row">
            <span v-if="isPrimary" class="badge-recommend">★ 本站首选推荐</span>
            <span class="badge-status">官方正品入口</span>
          </div>
          <h3 class="cta-heading">{{ brandName }} 官方注册与套餐开通</h3>
          <p class="cta-sub">{{ subTitle || '专属高速节点，自研客户端与第三方订阅双向兼容' }}</p>
        </div>
      </div>

      <!-- Coupon section -->
      <div v-if="coupon" class="cta-coupon-strip">
        <span class="coupon-label">🎉 结账专享优惠码:</span>
        <code class="code-text">{{ coupon }}</code>
        <span v-if="couponDiscount" class="discount-pill">{{ couponDiscount }}</span>
        <button class="copy-btn" @click="handleCopy">
          {{ copied ? '已复制 ✓' : '点击复制' }}
        </button>
      </div>

      <!-- Main Action Button -->
      <div class="btn-wrap">
        <a :href="affiliateUrl" target="_blank" rel="nofollow sponsored noopener" class="main-register-btn">
          立即前往 {{ brandName }} 官网注册开通 ➔
        </a>
      </div>

      <!-- Security & Transparency Disclaimer -->
      <div class="disclaimer-strip">
        <div class="disc-item">🔒 <strong>官网直达:</strong> 绕过山寨仿冒镜像，保障个人账号与资产安全</div>
        <div class="disc-item">⚠️ <strong>透明声明:</strong> 本链接包含官方推广标识，注册可能为本站带来维护佣金，不影响最终结算价；建议优先选择月付或小额测试</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  brandName: { type: String, default: '光速云' },
  slug: { type: String, default: 'guangsu' },
  logo: { type: String, default: '/images/logos/光速云主图.png' },
  isPrimary: { type: Boolean, default: false },
  subTitle: { type: String, default: '' },
  coupon: { type: String, default: 'AMM' },
  couponDiscount: { type: String, default: '新人首单优惠券' },
  affiliateUrl: { type: String, default: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y' }
})

const copied = ref(false)

function handleCopy() {
  if (props.coupon) {
    navigator.clipboard.writeText(props.coupon).then(() => {
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
    })
  }
}
</script>

<style scoped>
.registration-cta-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.75rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.registration-cta-box.is-featured {
  border: 2px solid #2563eb;
  background: linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%);
}

.cta-brand-meta {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.cta-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 4px;
}

.cta-title-col {
  flex: 1;
}

.tag-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.badge-recommend {
  background: #2563eb;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.badge-status {
  background: #10b981;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.cta-heading {
  margin: 0.2rem 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.cta-sub {
  margin: 0;
  font-size: 0.85rem;
  color: #64748b;
}

.cta-coupon-strip {
  background: #fffbeb;
  border: 1px dashed #f59e0b;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.coupon-label {
  font-size: 0.85rem;
  color: #92400e;
  font-weight: 600;
}

.code-text {
  background: #fde68a;
  color: #78350f;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.discount-pill {
  font-size: 0.75rem;
  color: #b45309;
}

.copy-btn {
  background: #d97706;
  color: #ffffff;
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.copy-btn:hover {
  background: #b45309;
}

.btn-wrap {
  margin-bottom: 1.25rem;
}

.main-register-btn {
  display: block;
  width: 100%;
  box-sizing: border-box;
  background: #2563eb;
  color: #ffffff !important;
  font-size: 1.05rem;
  font-weight: 700;
  text-align: center;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  text-decoration: none !important;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.25);
  transition: all 0.2s ease;
}

.main-register-btn:hover {
  background: #1d4ed8;
  box-shadow: 0 6px 12px -2px rgba(37, 99, 235, 0.35);
  transform: translateY(-1px);
}

.disclaimer-strip {
  background: #f8fafc;
  border-radius: 6px;
  padding: 0.65rem 0.85rem;
  font-size: 0.75rem;
  color: #64748b;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  line-height: 1.4;
}

.disc-item strong {
  color: #334155;
}
</style>
