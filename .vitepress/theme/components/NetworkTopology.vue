<template>
  <div class="network-topology">
    <div class="topology-header">
      <span class="badge">INFRASTRUCTURE DASHBOARD</span>
      <h4 class="title">🗺️ {{ brandName }} 网络链路架构拓扑</h4>
      <p class="subtitle">{{ lineType || '全程企业级 IEPL / IPLC 专线直连架构' }}</p>
    </div>

    <div class="topology-body">
      <!-- Step 1: User Client -->
      <div class="topo-node">
        <div class="node-icon">💻📱</div>
        <div class="node-title">本地终端设备</div>
        <div class="node-desc">Win / Mac / iOS / Android / 软路由</div>
      </div>

      <!-- Connector 1 -->
      <div class="topo-line">
        <span class="protocol-badge">{{ protocol || 'VLESS / Trojan 加密' }}</span>
        <div class="arrow">➔➔➔</div>
      </div>

      <!-- Step 2: Domestic Ingress -->
      <div class="topo-node highlight-ingress">
        <div class="node-icon">🏢⚡</div>
        <div class="node-title">国内高防入口</div>
        <div class="node-desc">BGP 多线智能接入，隐藏客户端真实出口</div>
      </div>

      <!-- Connector 2 (Dedicated Line) -->
      <div class="topo-line dedicated">
        <span class="special-line-badge">{{ dedicatedCable || '⚡ IEPL / IPLC 内网专线直连 (不经公网GFW)' }}</span>
        <div class="cable-pulse">═════════════►</div>
      </div>

      <!-- Step 3: Overseas Egress -->
      <div class="topo-node highlight-egress">
        <div class="node-icon">🌐🏝️</div>
        <div class="node-title">海外落地核心节点</div>
        <div class="node-desc">{{ egressRegion || '香港 / 日本 / 新加坡 / 美国 原生IP' }}</div>
      </div>

      <!-- Connector 3 -->
      <div class="topo-line">
        <span class="protocol-badge">原生家宽 / 商业机房</span>
        <div class="arrow">➔➔➔</div>
      </div>

      <!-- Step 4: Target Service -->
      <div class="topo-node target">
        <div class="node-icon">🎯✨</div>
        <div class="node-title">目标生产力服务</div>
        <div class="node-desc">ChatGPT · Claude · Netflix · YouTube 4K</div>
      </div>
    </div>

    <div class="topology-footer">
      <div class="feat-item">
        <strong>抗干扰性:</strong> 专线通道全程加密封装，免除晚高峰 QoS 丢包
      </div>
      <div class="feat-item">
        <strong>纯净度:</strong> 独立落地出口轮换池，防止 AI 批量封号与流媒体降级
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  brandName: { type: String, default: '光速云' },
  lineType: { type: String, default: '企业级 IEPL 跨境专线链路' },
  protocol: { type: String, default: 'VLESS + TLS' },
  dedicatedCable: { type: String, default: '⚡ IEPL 物理内网直连（零公网干扰）' },
  egressRegion: { type: String, default: '香港 · 台湾 · 日本 · 新加坡 · 美国' }
})
</script>

<style scoped>
.network-topology {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  color: #e2e8f0;
}

.topology-header {
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

.badge {
  font-size: 0.65rem;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.title {
  margin: 0.35rem 0 0.2rem 0;
  font-size: 1.05rem;
  color: #f8fafc;
}

.subtitle {
  margin: 0;
  font-size: 0.8rem;
  color: #94a3b8;
}

.topology-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.topo-node {
  background: #131c2e;
  border: 1px solid #23354f;
  border-radius: 8px;
  padding: 0.75rem 0.6rem;
  text-align: center;
  flex: 1 1 120px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.node-icon {
  font-size: 1.3rem;
}

.node-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #f1f5f9;
}

.node-desc {
  font-size: 0.68rem;
  color: #94a3b8;
  line-height: 1.3;
}

.highlight-ingress {
  border-color: #0284c7;
  background: #0c233c;
}

.highlight-egress {
  border-color: #059669;
  background: #092a20;
}

.target {
  border-color: #8b5cf6;
  background: #1e1338;
}

.topo-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  gap: 0.2rem;
  font-size: 0.75rem;
}

.protocol-badge {
  font-size: 0.65rem;
  color: #94a3b8;
  background: #1e293b;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.special-line-badge {
  font-size: 0.68rem;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
}

.arrow {
  color: #64748b;
  font-size: 0.75rem;
}

.cable-pulse {
  color: #38bdf8;
  font-weight: bold;
  letter-spacing: -1px;
}

.topology-footer {
  border-top: 1px dashed #23354f;
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: #94a3b8;
}

.topology-footer strong {
  color: #cbd5e1;
}

@media (max-width: 768px) {
  .topology-body {
    flex-direction: column;
    align-items: stretch;
  }
  .topo-line {
    padding: 0.5rem 0;
  }
  .arrow, .cable-pulse {
    transform: rotate(90deg);
  }
}
</style>
