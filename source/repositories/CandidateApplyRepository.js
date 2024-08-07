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
  refuseEducation(candidateApplyId) {
    return $axios.post(`${resource}/${candidateApplyId}/refuse-education`);
  },
  getUserRoadmapList() {
    return $axios.get(`/users/educations/list`);
  },
  getRoadmapDetail(roadmapId) {
    return $axios.get(`/users/educations/detail/` + roadmapId);
  },
  getCurrentEducation() {
    return $axios.get(`/users/educations/current`);
  },
  checkJobEducationExisted() {
    return $axios.get(`/users/educations/check-roadmap`);
  },
  getUserModule(roadmapId, courseId, moduleId) {
    return $axios.get(`/users/educations/${roadmapId}/courses/${courseId}/modules/${moduleId}`);
  },
  watchedModule(roadmapId, courseId, moduleId) {
    return $axios.get(`/users/educations/${roadmapId}/courses/${courseId}/modules/${moduleId}/watched`);
  },
  unlockCourse(roadmapId, courseId, data) {
    return $axios.post(`/users/educations/${roadmapId}/courses/${courseId}/unlock`, data);
  },
  requestMentor(courseId, data) {
    return $axios.post(`/users/educations/courses/${courseId}/request-mentors`, data);
  },
  addMentorRating(body) {
    return $axios.post(`/users/educations/rating-mentor`, body);
  },
	endMentorShift(courseId, shiftId, body) {
    return $axios.put(`/users/educations/courses/${courseId}/end-shifts/${shiftId}`, body);
  },
  getTestById(roadmapId, courseId, testId) {
    return $axios.get(`/users/educations/${roadmapId}/courses/${courseId}/tests/${testId}`);
  },
  getUserAnswerSheet(courseId, testId) {
    return $axios.get(`/users/educations/courses/${courseId}/tests/${testId}/sheets`);
  },
  submitAnswerSheet(roadmapId, courseId, answerSheetId, body) {
    return $axios.put(`/users/educations/${roadmapId}/courses/${courseId}/sheets/${answerSheetId}/submit`, body);
  },
  createAnswerSheet(testId, body) {
    return $axios.post(`/users/educations/tests/${testId}/sheets/create`, body);
  },
  updateAnswerSheetById(answerSheetId, body) {
    return $axios.put(`/users/educations/sheets/${answerSheetId}`, body);
  },
  getAnswerSheetById(answerSheetId) {
    return $axios.put(`/users/educations/sheets/${answerSheetId}`);
  },
  updateModuleLog(body) {
    return $axios.post(`/course/module-log`, body);
  }
})
