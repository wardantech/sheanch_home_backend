export const state = () => ({
  token: []
})
export const mutations = {
  STORE_TOKEN(state, token) {
    state.token = token
  }
}
export const actions = {
  storeToken({commit}, token) {
    commit('STORE_TOKEN', token)
  }
}
export const getters = {
  getToken(state) {
    return state.token
  }
}
