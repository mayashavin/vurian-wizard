import theme from '@nuxt/content-theme-docs'

export default theme({
  head: {
    meta: [
      // { name: 'google-site-verification', content: "VqBuI6LAOEm-RHyKbbLnmhReR-Tk04T9foBKmr9m_LM" }
    ]
  },
  docs: {
    primaryColor: '#F8E479'
  },
  pwa: {
    manifest: {
      name: '@vurian/wizard'
    }
  }
})