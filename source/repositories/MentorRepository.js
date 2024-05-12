const resource = '/mentors'

export default ($axios) => ({
  findMentor(data) {
    return $axios.post(`${resource}/find/`, data)
  },
})
