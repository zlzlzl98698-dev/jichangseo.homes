import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '机场SEO',
  titleTemplate: ':title | 机场SEO (jichangseo.homes)',
  description: '中文网络工具知识库、机场品牌深度评测中心与服务选择平台。涵盖IEPL/IPLC专线实测、Clash/v2rayN/Shadowrocket教程与AI/流媒体解锁指南。',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://jichangseo.homes',
    transformItems(items) {
      return items.filter(item => !item.url.includes('go/') && !item.url.includes('404'))
    }
  },

  transformHead({ pageData }) {
    let cleanPath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    if (cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1)
    }
    const canonicalUrl = cleanPath ? `https://jichangseo.homes/${cleanPath}` : 'https://jichangseo.homes'
    const pageTitle = pageData.title ? `${pageData.title} | 机场SEO (jichangseo.homes)` : '机场SEO - 中文网络工具知识库与机场品牌深度评测中心'
    const pageDesc = pageData.description || '中文网络工具知识库、机场品牌深度评测中心与服务选择平台。涵盖IEPL/IPLC专线实测、Clash/v2rayN/Shadowrocket教程与AI/流媒体解锁指南。'
    
    const heads: any[] = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: 'https://jichangseo.homes/images/logos/galaxy_transparent_square.webp' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:image', content: 'https://jichangseo.homes/images/logos/galaxy_transparent_square.webp' }]
    ]

    if (pageData.lastUpdated) {
      const isoDate = new Date(pageData.lastUpdated).toISOString()
      heads.push(['meta', { property: 'article:modified_time', content: isoDate }])
    }

    if (cleanPath && !cleanPath.startsWith('go')) {
      const isReview = cleanPath.startsWith('reviews')
      const isPillar = !cleanPath.includes('/') // e.g. 'airport', 'pricing'
      
      const schemaType = isReview ? 'Review' : (isPillar ? 'CollectionPage' : 'TechArticle')
      
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        headline: pageData.title || pageTitle,
        description: pageDesc,
        url: canonicalUrl,
        inLanguage: 'zh-CN',
        author: {
          '@type': 'Organization',
          name: '机场SEO技术评测实验室',
          url: 'https://jichangseo.homes/about'
        },
        publisher: {
          '@type': 'Organization',
          name: '机场SEO',
          url: 'https://jichangseo.homes',
          logo: {
            '@type': 'ImageObject',
            url: 'https://jichangseo.homes/images/logos/galaxy_transparent_square.webp'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      }

      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(articleSchema)
      ])

      // Dynamic BreadcrumbList Schema
      const pathParts = cleanPath.split('/').filter(Boolean)
      const breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: 'https://jichangseo.homes'
        }
      ]
      
      let currentAcc = ''
      pathParts.forEach((part, index) => {
        currentAcc += (index === 0 ? '' : '/') + part
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: index + 2,
          name: index === pathParts.length - 1 ? (pageData.title || part) : part,
          item: `https://jichangseo.homes/${currentAcc}`
        })
      })

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      }

      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(breadcrumbSchema)
      ])
    }

    return heads
  },

  markdown: {
    config: (md) => {
      const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
      md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        const aIndex = tokens[idx].attrIndex('href');
        if (aIndex >= 0) {
          const href = tokens[idx].attrs[aIndex][1];
          if (href && href.startsWith('http') && !href.includes('jichangseo.homes') && !href.includes('localhost')) {
            const relIndex = tokens[idx].attrIndex('rel');
            if (relIndex >= 0) {
              tokens[idx].attrs[relIndex][1] = 'nofollow sponsored noopener';
            } else {
              tokens[idx].attrs.push(['rel', 'nofollow sponsored noopener']);
            }
            const targetIndex = tokens[idx].attrIndex('target');
            if (targetIndex >= 0) {
              tokens[idx].attrs[targetIndex][1] = '_blank';
            } else {
              tokens[idx].attrs.push(['target', '_blank']);
            }
          }
        }
        return defaultRender(tokens, idx, options, env, self);
      };
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/images/logos/galaxy_transparent_square.webp' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'author', content: '机场SEO评测实验室' }],
    ['meta', { property: 'og:site_name', content: '机场SEO' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // 搜索引擎站长平台所有权验证槽位（可直接填入或通过 CI 环境变量注入）
    ...(process.env.GOOGLE_SITE_VERIFICATION ? [['meta', { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION }]] : []),
    ...(process.env.BING_SITE_VERIFICATION ? [['meta', { name: 'msvalidate.01', content: process.env.BING_SITE_VERIFICATION }]] : []),
    ...(process.env.BAIDU_SITE_VERIFICATION ? [['meta', { name: 'baidu-site-verification', content: process.env.BAIDU_SITE_VERIFICATION }]] : []),
    ...(process.env.SHENMA_SITE_VERIFICATION ? [['meta', { name: 'shenma-site-verification', content: process.env.SHENMA_SITE_VERIFICATION }]] : []),
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '机场SEO',
        url: 'https://jichangseo.homes',
        description: '中文网络工具知识库、机场品牌评测中心与服务选择平台',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://jichangseo.homes/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    ],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '机场SEO技术评测实验室',
        url: 'https://jichangseo.homes',
        logo: 'https://jichangseo.homes/images/logos/galaxy_transparent_square.webp',
        description: '中文网络工具知识库、机场品牌深度评测中心与服务选择平台'
      })
    ]
  ],

  themeConfig: {
    siteTitle: '机场SEO',
    logo: '/images/logos/galaxy_transparent_square.webp',

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索评测、客户端与教程...',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 10 Primary Navigations
    nav: [
      {
        text: '机场推荐',
        items: [
          { text: '01 机场推荐总览', link: '/airport/' },
          { text: '机场排行榜', link: '/airport/rankings' },
          { text: '稳定机场评测', link: '/airport/stable' },
          { text: '好用的机场盘点', link: '/airport/best' },
          { text: '新手首选用梯', link: '/airport/beginner' },
          { text: '靠谱专线机场', link: '/airport/iplc' },
          { text: '备用防失联机场', link: '/airport/backup' }
        ]
      },
      {
        text: '价格套餐',
        items: [
          { text: '02 价格与套餐指南', link: '/pricing/' },
          { text: '便宜机场梯子', link: '/pricing/cheap' },
          { text: '一元机场实测', link: '/pricing/one-yuan' },
          { text: '一分机场避坑', link: '/pricing/one-cent' },
          { text: '月付机场精选', link: '/pricing/monthly' },
          { text: '年付性价比分析', link: '/pricing/yearly' },
          { text: '不限时永久流量包', link: '/pricing/no-expiry' },
          { text: '大流量与预算对比', link: '/pricing/budget-guide' }
        ]
      },
      {
        text: '品牌库',
        items: [
          { text: '03 32家品牌数据库', link: '/brands/' },
          { text: '深度独立评测', link: '/reviews/guangsu' },
          { text: '品牌官网导航', link: '/brands/official' },
          { text: '品牌套餐横评', link: '/brands/plans' },
          { text: '优惠码汇总', link: '/brands/coupons' },
          { text: '品牌双向比较', link: '/brands/compare' },
          { text: '品牌替代方案', link: '/brands/alternatives' }
        ]
      },
      {
        text: 'VPN加速器',
        items: [
          { text: '04 VPN 与加速器科普', link: '/vpn/' },
          { text: 'VPN 推荐榜单', link: '/vpn/recommend' },
          { text: '免费 VPN 风险辨析', link: '/vpn/free-risks' },
          { text: '手机与平板 VPN', link: '/vpn/mobile' },
          { text: '电脑端 VPN 软件', link: '/vpn/pc' },
          { text: '外服游戏加速器', link: '/vpn/gaming' },
          { text: '机场与 VPN 差异对比', link: '/vpn/vs-proxy' }
        ]
      },
      {
        text: '客户端',
        items: [
          { text: '05 客户端软件库', link: '/clients/' },
          { text: 'Clash Verge Rev', link: '/clients/clash-verge-rev' },
          { text: 'v2rayN (Windows)', link: '/clients/v2rayn' },
          { text: 'Shadowrocket 小火箭', link: '/clients/shadowrocket' },
          { text: 'Sing-box 新一代内核', link: '/clients/sing-box' },
          { text: 'FlClash 极简跨平台', link: '/clients/flclash' },
          { text: 'Hiddify 全平台', link: '/clients/hiddify' },
          { text: 'Windows 客户端大全', link: '/clients/windows' },
          { text: 'Android 安卓客户端', link: '/clients/android' },
          { text: 'iOS 苹果客户端', link: '/clients/ios' },
          { text: 'macOS 苹果电脑', link: '/clients/macos' },
          { text: 'OpenWrt 软路由', link: '/clients/openwrt' }
        ]
      },
      {
        text: 'AI流媒体',
        items: [
          { text: '06 AI 与流媒体总览', link: '/ai-streaming/' },
          { text: 'ChatGPT 专用机场', link: '/ai-streaming/chatgpt' },
          { text: 'Claude 降级避坑', link: '/ai-streaming/claude' },
          { text: 'Gemini 节点配置', link: '/ai-streaming/gemini' },
          { text: 'Netflix 原创剧解锁', link: '/ai-streaming/netflix' },
          { text: 'YouTube 4K 加速', link: '/ai-streaming/youtube' },
          { text: 'Disney+ 全区支持', link: '/ai-streaming/disney' },
          { text: '原生 IP 纯净度检测', link: '/ai-streaming/ip-purity' }
        ]
      },
      {
        text: '线路节点',
        items: [
          { text: '07 线路与节点知识库', link: '/network/' },
          { text: 'IEPL 内网专线详解', link: '/network/iepl' },
          { text: 'IPLC 跨境专线', link: '/network/iplc' },
          { text: 'BGP 智能中转解析', link: '/network/bgp' },
          { text: '香港节点特点与延迟', link: '/network/hk-nodes' },
          { text: '日本与新加坡节点', link: '/network/apac-nodes' },
          { text: '美国与欧洲节点', link: '/network/us-nodes' },
          { text: '倍率计算与流量陷阱', link: '/network/multipliers' }
        ]
      },
      {
        text: '使用教程',
        items: [
          { text: '08 使用教程入门与进阶', link: '/tutorials/' },
          { text: '机场订阅导入总指南', link: '/tutorials/import-subscription' },
          { text: 'Clash 规则分流实战', link: '/tutorials/clash-rules' },
          { text: 'TUN 虚拟网卡模式', link: '/tutorials/tun-mode' },
          { text: '局域网多设备共享', link: '/tutorials/multi-device' },
          { text: '自定义 DNS 防泄漏', link: '/tutorials/dns-leak' },
          { text: '节点排序与延迟测速', link: '/tutorials/latency-testing' }
        ]
      },
      {
        text: '故障排查',
        items: [
          { text: '09 故障排查急救手册', link: '/troubleshooting/' },
          { text: '节点全红 / 连接超时', link: '/troubleshooting/timeout' },
          { text: '订阅链接更新失败', link: '/troubleshooting/subscription-fail' },
          { text: '打开代理无法上网', link: '/troubleshooting/no-internet' },
          { text: 'DNS 污染与解析失败', link: '/troubleshooting/dns-error' },
          { text: '客户端闪退与权限报错', link: '/troubleshooting/client-crash' },
          { text: '晚高峰速度慢与掉线', link: '/troubleshooting/speed-slow' },
          { text: 'ChatGPT 拒绝访问 1020', link: '/troubleshooting/ai-block' }
        ]
      },
      {
        text: '风险避坑',
        items: [
          { text: '10 风险防范与安全指南', link: '/safety/' },
          { text: '机场跑路前兆与应急', link: '/safety/runaway' },
          { text: '低价机场十大避坑陷阱', link: '/safety/pitfalls' },
          { text: '主流品牌平替方案', link: '/safety/alternatives' },
          { text: '退款维权与争议处理', link: '/safety/refund' },
          { text: '隐私安全与日志记录', link: '/safety/privacy' },
          { text: '品牌运营稳定性监测', link: '/safety/status-monitor' }
        ]
      }
    ],

    // Sidebars for each section
    sidebar: {
      '/airport/': [
        {
          text: '01 机场推荐体系',
          items: [
            { text: '机场推荐总览', link: '/airport/' },
            { text: '2026年机场综合排行榜', link: '/airport/rankings' },
            { text: '高稳定不过期机场甄选', link: '/airport/stable' },
            { text: '好用的机场标准与指标', link: '/airport/best' },
            { text: '新手入门推荐与避坑指南', link: '/airport/beginner' },
            { text: '企业级 IEPL/IPLC 专线机场', link: '/airport/iplc' },
            { text: '主力备用双梯配置方案', link: '/airport/backup' }
          ]
        }
      ],
      '/pricing/': [
        {
          text: '02 价格与套餐体系',
          items: [
            { text: '价格与套餐选择指南', link: '/pricing/' },
            { text: '便宜机场与低价梯子测评', link: '/pricing/cheap' },
            { text: '一元机场真实寿命分析', link: '/pricing/one-yuan' },
            { text: '一分机场避坑警示', link: '/pricing/one-cent' },
            { text: '月付机场防跑路优势', link: '/pricing/monthly' },
            { text: '年付性价比与折扣测算', link: '/pricing/yearly' },
            { text: '不限时永久流量包对比', link: '/pricing/no-expiry' },
            { text: '大流量用户预算规划指南', link: '/pricing/budget-guide' }
          ]
        }
      ],
      '/brands/': [
        {
          text: '03 品牌库与深度评测',
          items: [
            { text: '32 家机场品牌库总览', link: '/brands/' },
            { text: '品牌官网入口合规导航', link: '/brands/official' },
            { text: '全品牌套餐价格横评', link: '/brands/plans' },
            { text: '全网有效优惠码汇编', link: '/brands/coupons' },
            { text: '主流机场双向综合对比', link: '/brands/compare' },
            { text: '高性价比平替方案矩阵', link: '/brands/alternatives' }
          ]
        },
        {
          text: '核心品牌独立评测',
          items: [
            { text: '光速云 (主推旗舰)', link: '/reviews/guangsu' },
            { text: '暮光加速 (BGP专线)', link: '/reviews/muguang' },
            { text: '飞猫云 (专属客户端)', link: '/reviews/feimao' },
            { text: '微风网络 (全IPLC)', link: '/reviews/weifeng' },
            { text: '星岛梦 (老牌不限时)', link: '/reviews/xingdaomeng' },
            { text: '二猫云 (亚太优化)', link: '/reviews/ermao' },
            { text: '无忧链接 (免转换订阅)', link: '/reviews/wuyou' },
            { text: '唯兔云 (三网负载均衡)', link: '/reviews/weitu' },
            { text: 'Firefly (8年老牌原生IP)', link: '/reviews/firefly' },
            { text: '宇宙云 (IEPL+自研端)', link: '/reviews/yuzhou' }
          ]
        }
      ],
      '/reviews/': [
        {
          text: '核心主推品牌深度评测',
          items: [
            { text: '光速云 (深度万字实测)', link: '/reviews/guangsu' },
            { text: '暮光加速深度评测', link: '/reviews/muguang' },
            { text: '飞猫云深度评测', link: '/reviews/feimao' },
            { text: '微风网络深度评测', link: '/reviews/weifeng' },
            { text: '大佬云深度评测', link: '/reviews/dalaoyun' },
            { text: '星岛梦深度评测', link: '/reviews/xingdaomeng' },
            { text: '二猫云深度评测', link: '/reviews/ermao' },
            { text: '无忧链接深度评测', link: '/reviews/wuyou' },
            { text: '唯兔云深度评测', link: '/reviews/weitu' },
            { text: 'Firefly 深度评测', link: '/reviews/firefly' }
          ]
        },
        {
          text: '中位与特色品牌评测',
          items: [
            { text: '宇宙云深度评测', link: '/reviews/yuzhou' },
            { text: 'U1S1 深度评测', link: '/reviews/u1s1' },
            { text: '灵猫网络深度评测', link: '/reviews/lingmao' },
            { text: '极连云深度评测', link: '/reviews/jilian' },
            { text: '光年梯深度评测', link: '/reviews/guangnian' },
            { text: '一翻云深度评测', link: '/reviews/yifan' },
            { text: 'SOGO 云深度评测', link: '/reviews/sogo' },
            { text: '可信云深度评测', link: '/reviews/kexin' },
            { text: '速界深度评测', link: '/reviews/sujie' },
            { text: '闪跃深度评测', link: '/reviews/shanyue' },
            { text: '全球云深度评测', link: '/reviews/quanqiu' },
            { text: '闪电鼠深度评测', link: '/reviews/shandianshu' },
            { text: '云界线深度评测', link: '/reviews/yunjiexian' },
            { text: '榴莲云深度评测', link: '/reviews/liulianyun' },
            { text: '神行加速深度评测', link: '/reviews/shenxing' },
            { text: '环球梯深度评测', link: '/reviews/huanqiuti' },
            { text: '隐形人深度评测', link: '/reviews/yinxingren' },
            { text: '梯子云深度评测', link: '/reviews/tiziyun' },
            { text: '灵动云深度评测', link: '/reviews/lingdong' },
            { text: '浪网深度评测', link: '/reviews/langwang' },
            { text: '边缘节点 EdgeNova', link: '/reviews/edgenova' },
            { text: '快狸深度评测', link: '/reviews/kuaili' }
          ]
        }
      ],
      '/vpn/': [
        {
          text: '04 VPN 与加速器知识体系',
          items: [
            { text: 'VPN 与加速器全方位对比', link: '/vpn/' },
            { text: '全球主流商用 VPN 推荐', link: '/vpn/recommend' },
            { text: '免费 VPN 的安全黑洞与风险', link: '/vpn/free-risks' },
            { text: '手机移动端代理选择指南', link: '/vpn/mobile' },
            { text: 'PC 桌面端加速环境搭建', link: '/vpn/pc' },
            { text: '外服联机游戏加速器选择', link: '/vpn/gaming' },
            { text: 'VPN 协议与 Shadowsocks 对比', link: '/vpn/vs-proxy' }
          ]
        }
      ],
      '/clients/': [
        {
          text: '05 客户端软件库与教程',
          items: [
            { text: '客户端软件大全与选型', link: '/clients/' },
            { text: 'Clash Verge Rev 完整教程', link: '/clients/clash-verge-rev' },
            { text: 'v2rayN 电脑端配置手册', link: '/clients/v2rayn' },
            { text: 'Shadowrocket iOS 小火箭指南', link: '/clients/shadowrocket' },
            { text: 'Sing-box 极速内核上手', link: '/clients/sing-box' },
            { text: 'FlClash 极简跨平台客户端', link: '/clients/flclash' },
            { text: 'Hiddify 多协议客户端', link: '/clients/hiddify' }
          ]
        },
        {
          text: '操作系统平台专区',
          items: [
            { text: 'Windows 平台客户端汇总', link: '/clients/windows' },
            { text: 'Android 安卓平台客户端', link: '/clients/android' },
            { text: 'iOS / iPad 苹果客户端指南', link: '/clients/ios' },
            { text: 'macOS 苹果电脑配置', link: '/clients/macos' },
            { text: 'OpenWrt 软路由插件实战', link: '/clients/openwrt' }
          ]
        }
      ],
      '/ai-streaming/': [
        {
          text: '06 AI 与流媒体解锁专区',
          items: [
            { text: 'AI 与流媒体可用性知识库', link: '/ai-streaming/' },
            { text: 'ChatGPT 专用节点防降级指南', link: '/ai-streaming/chatgpt' },
            { text: 'Claude 封号与区域限制破解', link: '/ai-streaming/claude' },
            { text: 'Google Gemini 节点选择规范', link: '/ai-streaming/gemini' },
            { text: 'Netflix 全球原创剧解锁技巧', link: '/ai-streaming/netflix' },
            { text: 'YouTube 4K/8K 流畅播放优化', link: '/ai-streaming/youtube' },
            { text: 'Disney+ 与 HBO Max 解锁实测', link: '/ai-streaming/disney' },
            { text: '住宅 IP 与原生 IP 纯净度检测', link: '/ai-streaming/ip-purity' }
          ]
        }
      ],
      '/network/': [
        {
          text: '07 线路与网络拓扑知识库',
          items: [
            { text: '专线网络与协议架构总览', link: '/network/' },
            { text: 'IEPL 内网专线技术深度解析', link: '/network/iepl' },
            { text: 'IPLC 跨境专线与物理光缆', link: '/network/iplc' },
            { text: 'BGP 智能中转与多线接入', link: '/network/bgp' },
            { text: '香港节点低延迟与带宽特点', link: '/network/hk-nodes' },
            { text: '日本与新加坡亚太骨干网', link: '/network/apac-nodes' },
            { text: '美国与欧洲骨干节点分析', link: '/network/us-nodes' },
            { text: '倍率机制与偷跑流量防范', link: '/network/multipliers' }
          ]
        }
      ],
      '/tutorials/': [
        {
          text: '08 使用教程与配置实战',
          items: [
            { text: '机场使用教程体系总览', link: '/tutorials/' },
            { text: '一键导入订阅到各大客户端', link: '/tutorials/import-subscription' },
            { text: 'Clash 分流规则与策略组配置', link: '/tutorials/clash-rules' },
            { text: 'TUN 虚拟网卡接管全部流量', link: '/tutorials/tun-mode' },
            { text: '多设备与局域网代理共享', link: '/tutorials/multi-device' },
            { text: 'DNS 防泄漏与防污染高级配置', link: '/tutorials/dns-leak' },
            { text: '节点测速与自动选择策略', link: '/tutorials/latency-testing' }
          ]
        }
      ],
      '/troubleshooting/': [
        {
          text: '09 故障排查急救指南',
          items: [
            { text: '故障排查全流程急救手册', link: '/troubleshooting/' },
            { text: '节点超时 / 测速全红排查', link: '/troubleshooting/timeout' },
            { text: '订阅链接更新失败排查', link: '/troubleshooting/subscription-fail' },
            { text: '连接代理后无法上网排查', link: '/troubleshooting/no-internet' },
            { text: 'DNS 污染与域名解析报错', link: '/troubleshooting/dns-error' },
            { text: '客户端闪退与系统防火墙拦截', link: '/troubleshooting/client-crash' },
            { text: '晚高峰速度骤降与丢包优化', link: '/troubleshooting/speed-slow' },
            { text: 'AI 与流媒体突然提示不可用', link: '/troubleshooting/ai-block' }
          ]
        }
      ],
      '/safety/': [
        {
          text: '10 风险防范与安全指南',
          items: [
            { text: '机场安全合规与风险全景', link: '/safety/' },
            { text: '机场跑路前兆与防坑应急', link: '/safety/runaway' },
            { text: '低价机场十大常见虚假套路', link: '/safety/pitfalls' },
            { text: '失联与故障平替机场库', link: '/safety/alternatives' },
            { text: '退款维权与争议解决原则', link: '/safety/refund' },
            { text: '隐私安全与防日志追查规范', link: '/safety/privacy' },
            { text: '品牌运营长效稳定性监测', link: '/safety/status-monitor' }
          ]
        }
      ]
    },

    footer: {
      message: '机场SEO · 中文网络工具知识库与品牌实测中心 | 本站提供独立客观的技术分析与网络评测',
      copyright: 'Copyright © 2026 jichangseo.homes. All rights reserved. 商业推广遵循披露声明。'
    }
  }
})
