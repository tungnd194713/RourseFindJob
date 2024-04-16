const resource = '/contacts'

export default ($axios) => ({
  postContact(data) {
    return $axios.post(`${resource}`, data)
  }
})
