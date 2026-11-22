import DefaultTheme from 'vitepress/theme'
import './custom.css'

import BenchmarkReport from './components/BenchmarkReport.vue'
import BrandFilter from './components/BrandFilter.vue'
import BrandSnapshot from './components/BrandSnapshot.vue'
import ComparisonTable from './components/ComparisonTable.vue'
import FAQSection from './components/FAQSection.vue'
import NetworkTopology from './components/NetworkTopology.vue'
import PricingTable from './components/PricingTable.vue'
import RegistrationCTA from './components/RegistrationCTA.vue'
import UnlockMatrix from './components/UnlockMatrix.vue'
import ArticleCard from './components/ArticleCard.vue'
import TopicCard from './components/TopicCard.vue'
import RelatedArticles from './components/RelatedArticles.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BenchmarkReport', BenchmarkReport)
    app.component('BrandFilter', BrandFilter)
    app.component('BrandSnapshot', BrandSnapshot)
    app.component('ComparisonTable', ComparisonTable)
    app.component('FAQSection', FAQSection)
    app.component('NetworkTopology', NetworkTopology)
    app.component('PricingTable', PricingTable)
    app.component('RegistrationCTA', RegistrationCTA)
    app.component('UnlockMatrix', UnlockMatrix)
    app.component('ArticleCard', ArticleCard)
    app.component('TopicCard', TopicCard)
    app.component('RelatedArticles', RelatedArticles)
  }
}
