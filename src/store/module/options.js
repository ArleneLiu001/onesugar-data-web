import {
  ssoUrl,
  ssoRestUrl,
  appCode
} from '@/config'
import {
  resDeal
} from '@/utils/mixins'
import apis from '@/api'
const state = {
  // 控制全局loading
  showLoading: false,
  // 基础配置信息
  appConfig: {},
}

// getters
const getters = {
  // 账户中心地址
  ssoUrl: () => {
    return ssoUrl
  },
  ssoRestUrl: () => {
    return ssoRestUrl
  },
  // 登录地址
  /* disabled no-unused-vars */
  loginUrl: (state, getters) => {
    return `${getters.ssoUrl}/login.html`
  },
  // 退出地址
  /* disabled no-unused-vars */
  logoutUrl: (state, getters) => {
    return `${getters.ssoUrl}/loginOut.html?baseUrl=${getters.ssoRestUrl}`
  },
  // 注册地址
  registerUrl: (state, getters) => {
    return `${getters.ssoUrl}/companyRegister.html`
  },
  // 账户云中心地址
  ssoCenterUrl: (state, getters) => {
    return `${getters.ssoUrl}/index.html`
  }
}

// mutations
const mutations = {
  SET_SHOW_LOADING(state, isShow) {
    state.showLoading = isShow
  },
  SET_APP_CONFIG(state, data) {
    state.appConfig = data
  },
}
// actions
const actions = {
  // 设置loading状态
  setShowLoading({
    commit
  }, isShow) {
    commit('SET_SHOW_LOADING', isShow)
  },
  setAppConfig({
    commit
  }) {
    apis.adv.getAppConfig({
      code: appCode
    }).then((res) => {
      resDeal(res, (data) => {
        commit('SET_APP_CONFIG', data.appConfig || {})
      }, null, true)
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}