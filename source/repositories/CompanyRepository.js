const resource = '/users/companies'

export default ($axios) => ({
  getCompanyWithJobs(data) {
    return $axios.get(`${resource}/${ data }`)
  }
})
