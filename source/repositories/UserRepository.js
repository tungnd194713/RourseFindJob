const resource = '/users'

export default ($axios) => ({
  getUserOptions() {
    return $axios.get(`${resource}/profile/user-options`)
  },

  getUserProfile() {
    return $axios.get(`${resource}/profile`)
  },

  getUserProfileTranslate(data) {
    return $axios.post(`${resource}/profile/translate`, data)
  },

  changeUserPassword(data) {
    return $axios.post(`${resource}/update-password`, data)
  },

  changeUserEmail(data) {
    return $axios.post(`${resource}/update-email`, data)
  },

  updateProfileImage(payload, header) {
    return $axios.post(`${resource}/update-image`, payload, header)
  },

  updateFileCv(payload, header) {
    return $axios.post(`${resource}/update-file-cv`, payload, header)
  },

  updateInfoBasic(payload) {
    return $axios.post(`${resource}/profile/update-info-basic`, payload)
  },

  updateInfoBasicWithDraft(payload, header) {
    return $axios.post(`${resource}/update-info-basic-with-draft`, payload, header)
  },

  updateInfoAdvanced(payload, header) {
    return $axios.post(`${resource}/profile/update-info-advanced`, payload, header)
  },
})
