const resource = '/users/candidates'

export default ($axios) => ({
  getCandidate() {
      return $axios.get(`${resource}`)
  },
  exportPdf(locale, payload, responseType) {
    return $axios.post(`${resource}/export-cv-pdf/${locale}`, payload, responseType)
  },
  checkCV() {
    return $axios.get(`${resource}/check-cv`)
  }
})
