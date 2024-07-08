const resource = '/users'

export default ($axios) => ({
  getJobs(data) {
    return $axios.get(`${resource}/jobs/${ data }`)
  },
  getProposedJobs(data) {
    return $axios.post(`${resource}/jobs/proposed`, data)
  },
  getTranslateJobs(data) {
    return $axios.get(`${resource}/jobs/translate/${ data }`)
  },
  postFavoriteJobs(data) {
    return $axios.post(`${resource}/favorite`, data)
  },
  getFavoriteJobs(currentPage) {
    return $axios.get(`${resource}/jobs/list/favorite?page=${currentPage}`)
  },
  deleteFavoriteJobs(data) {
    return $axios.delete(`${resource}/favorite/${ data }`)
  },
  getAppliedJobs(currentPage, data) {
    return $axios.post(`${resource}/jobs/list/applied?page=${currentPage}`, {params: data})
  },
  getHomeJobs() {
    return $axios.get(`/jobs/home`)
  },
  getListJobs(data) {
    return $axios.post(`${resource}/jobs/list?page=${data.currentPage}`, data)
  },
  getJobsFind(data) {
    return $axios.post(`${resource}/jobs/suggest?page=${data.currentPage}`, data)
  },
  favoriteAJob(data) {
    return $axios.post(`${resource}/favorite`, data)
  },
  unfavoriteAJob(favoriteId) {
    return $axios.delete(`${resource}/favorite/${favoriteId}`)
  },
  getJobCount() {
    return $axios.get(`/jobs/count`)
  },
  getJobByProvince(data) {
    return $axios.post(`/jobs/map`, data)
  },

  increaseCountClick(data) {
    return $axios.post(`/users/jobs/increase-count-click`, data)
  },
})
