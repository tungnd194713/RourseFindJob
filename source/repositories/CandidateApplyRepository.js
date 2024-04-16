const resource = '/users/candidate-applies'

export default ($axios) => ({
  applyAJob(payload) {
    return $axios.post(`${resource}`, payload)
  },
  checkApplied(data) {
    return $axios.post(`${resource}/check`, data)
  }
})
