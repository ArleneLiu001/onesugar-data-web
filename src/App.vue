<template>
  <a-config-provider :locale="locale">
    <!-- <Account v-model:value="showLogin" theme="#F0C400" :option="option" @change="store.dispatch('auth/setShowLogin', false)" /> -->
    <DefaultLayout />
    <Loading v-if="showLoading" />
  </a-config-provider>
</template>

<script>
import { ref, defineComponent, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { DefaultLayout, Loading } from '@/components/main'
import LoginImg from '@/assets/image/login.png'
import { ssoRestUrl, ssoUrl, tencentAppId, appid, appCode } from '@/config'

export default defineComponent({
  components: {
    DefaultLayout,
    Loading
  },
  setup() {
    const locale = ref(zhCN)
    const store = useStore()
    const state = reactive({
      option: {
        img: LoginImg,
        ssoBaseUrl: ssoUrl,
        baseUrl: ssoRestUrl,
        returnUrl: window.location.href,
        tencentAppId: tencentAppId,
        appid: appid,
        registerUrl: store.getters['options/registerUrl'] + `?returnUrl=${encodeURIComponent(window.location.href)}&appId=${appCode}`
      }
    })

    store.dispatch('auth/getAuth')
    store.dispatch('options/setAppConfig')

    return {
      store,
      showLogin: computed(() => store.state.auth.showLogin),
      ...toRefs(state),
      locale,
      showLoading: computed(() => store.state.options.showLoading)
    }
  }
})
</script>

