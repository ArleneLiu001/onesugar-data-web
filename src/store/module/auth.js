import apis from '@/api'
export default {
  namespaced: true,
  state: {
    // 登录信息
    user: {
      // 是否获取过登录状态
      getAuthed: false
    },
    // 控制登录弹窗是否显示
    showLogin: false
  },

  mutations: {
    SET_AUTH(state, data) {
      state.user = data
      // 已获取状态
      state.user.getAuthed = true
    },
    SET_SHOW_LOGIN(state, data) {
      state.showLogin = data
    }
  },

  actions: {
    setSeller({
      commit
    }, data) {
      commit('SET_SELLER', data)
    },
    setShowLogin({
      commit
    }, data) {
      commit('SET_SHOW_LOGIN', data)
    },
    // 获取登录信息
    getAuth({
      commit
    }) {
      return apis.sso.getUserInfo().then(res => {
        if (res && res.data.respHeader && res.data.respHeader.code === 0) {
          res.data.logged = res.data.respHeader.code === 0
          commit('SET_AUTH', res.data || {})
          commit('SET_SHOW_LOGIN', false)
        }
      }, () => {
        commit('SET_AUTH', {})
        commit('SET_SHOW_LOGIN', true)
      })
    }
  }
}