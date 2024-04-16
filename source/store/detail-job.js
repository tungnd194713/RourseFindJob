export const state = () => ({
  career: null,
  province_id: null
})

export const mutations = {
  SET_CAREER(state, career) {
    state.career = career
  },
  SET_PROVINCE_ID(state, provinceId) {
    state.province_id = provinceId
  },
}

export const actions = {
  setCareer({ commit }, career) {
    commit('SET_CAREER', career)
  },
  setProvinceId({ commit }, provinceId) {
    commit('SET_PROVINCE_ID', provinceId)
  }
}

export const getters = {
  getCareer(state) {
    return state.career
  },
  getProvinceId(state) {
    return state.province_id
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

