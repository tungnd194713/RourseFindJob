const resource = '/users'

export default ($axios) => ({
  postPageViews(data) {
    return $axios.post(`${resource}/pageviews`, data)
  }
})
