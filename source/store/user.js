export const state = () => ({
  reason_apply: '',
  strength: '',
  residence_card_front: null,
  residence_card_backside: null,
  educations_of_candidate: []
})
// educationsOfCandidate
export const mutations = {
  SET_REASON_APPLY(state, reasonApply) {
    state.reason_apply = reasonApply
  },
  SET_STRENGTH(state, strength) {
    state.strength = strength
  },
  SET_RESIDENCE_CARD_FRONT(state, residenceCardFront) {
    state.residence_card_front = residenceCardFront
  },
  SET_RESIDENCE_CARD_BACKSIDE(state, residenceCardBackside) {
    state.residence_card_backside = residenceCardBackside
  },
  SET_EDUCATIONS_OF_CANDIDATE(state, educationsOfCandidate) {
    state.educations_of_candidate = educationsOfCandidate
  },
  PUSH_ITEM_TO_EDUCATIONS_OF_CANDIDATE(state, educationItem) {
    state.educations_of_candidate.push(educationItem)
  },

}

export const actions = {
  setReasonApply({ commit }, reasonApply) {
    commit('SET_REASON_APPLY', reasonApply)
  },
  setStrength({ commit }, strength) {
    commit('SET_STRENGTH', strength)
  },
  setResidenceCardFront({ commit }, residenceCardFront) {
    commit('SET_RESIDENCE_CARD_FRONT', residenceCardFront)
  },
  setResidenceCardBackside({ commit }, residenceCardBackside) {
    commit('SET_RESIDENCE_CARD_BACKSIDE', residenceCardBackside)
  },
  setEducationsOfCandidate({ commit }, educationsOfCandidate) {
    commit('SET_EDUCATIONS_OF_CANDIDATE', educationsOfCandidate)
  },
  pushItemToEducationsOfCandidate({ commit }, educationItem) {
    commit('PUSH_ITEM_TO_EDUCATIONS_OF_CANDIDATE', educationItem)
  },
}

export const getters ={
  getReasonApply(state) {
    return state.reason_apply
  },
  getStrength(state) {
    return state.strength
  },
  getResidenceCardFront(state) {
    return state.residence_card_front
  },
  getResidenceCardBackside(state) {
    return state.residence_card_backside
  },
  getEducationsOfCandidate(state) {
    return state.educations_of_candidate
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
