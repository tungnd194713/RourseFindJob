const resource = '/users/candidate-applies'

export default ($axios) => ({
  applyAJob(payload) {
    return $axios.post(`${resource}`, payload)
  },
  checkApplied(data) {
    return $axios.post(`${resource}/check`, data)
  },
  startEducation(candidateApplyId) {
    return $axios.post(`${resource}/${candidateApplyId}/start-education`);
  },
  getCurrentEducation() {
    return $axios.get(`/users/educations/current`);
  },
  getUserModule(courseId, moduleId) {
    return $axios.get(`/users/educations/courses/${courseId}/modules/${moduleId}`);
  },
  watchedModule(courseId, moduleId) {
    return $axios.get(`/users/educations/courses/${courseId}/modules/${moduleId}/watched`);
  },
  unlockCourse(courseId, data) {
    return $axios.post(`/users/educations/courses/${courseId}/unlock`, data);
  },
  requestMentor(courseId, data) {
    return $axios.post(`/users/educations/courses/${courseId}/request-mentors`, data);
  },
  addMentorRating(body) {
    return $axios.post(`/users/educations/rating-mentor`, body);
  },
  getTestById(courseId, testId) {
    return $axios.get(`/users/educations/courses/${courseId}/tests/${testId}`);
  },
  getUserAnswerSheet(courseId, testId) {
    return $axios.get(`/users/educations/courses/${courseId}/tests/${testId}/sheets`);
  },
  submitAnswerSheet(courseId, answerSheetId, body) {
    return $axios.put(`/users/educations/courses/${courseId}/sheets/${answerSheetId}/submit`, body);
  },
  createAnswerSheet(testId, body) {
    return $axios.post(`/users/educations/tests/${testId}/sheets/create`, body);
  },
  updateAnswerSheetById(answerSheetId, body) {
    return $axios.put(`/users/educations/sheets/${answerSheetId}`, body);
  },
  getAnswerSheetById(answerSheetId) {
    return $axios.put(`/users/educations/sheets/${answerSheetId}`);
  }
})
