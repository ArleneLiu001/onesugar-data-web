<template>
  <div>
    <header class="main-header">
      <div class="container header-wrap">
        <a class="fl base-link" href="https://www.usoftchina.com" target="_blank"> <img :src="headHomeImg" /><span class="title-text">Arlene个人网站</span> </a>
        <div class="fr">
          <template v-if="!user.logged">
            <span class="item" @click="$store.dispatch('auth/setShowLogin', true)">登录</span>
            <span class="item" @click="register">注册</span>
          </template>
          <!-- <div class="inlineb drop-down" v-else>
            <span class="item item-user">欢迎您，{{ user.userInfo.name }}&nbsp;|&nbsp;{{ user.currentEnterpriseInfo.name }}&nbsp;&nbsp;</span>
            <DownOutlined v-if="user.enterpriseInfo.length" />
            <span class="item" @click="logout">[退出]</span>
            <ul v-if="user.enterpriseInfo.length">
              <li class="menu-item-first">您可切换至以下账户：</li>
              <li v-for="(en, index) in user.enterpriseInfo" @click="switchEn(en)" :title="en.name" :key="index" v-text="en.name"></li>
            </ul>
          </div> -->
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import { toRefs, defineComponent, onMounted, computed, watch } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { appCode, ssoRestUrl } from '@/config'
import { useRouter } from 'vue-router'
import api from '@/api'
import headHomeImg from '@/assets/image/base/logo.jpg'

export default defineComponent({
  name: 'Header',
  components: {
    DownOutlined
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    onMounted(() => {})
    const user = computed(() => {
      return store.state.auth.user
    })
    let cartNumber = 0
    cartNumber = computed(() => {
      return store.state.auth.cartNumber
    })
    watch(
      () => store.state.auth.cartNumber,
      (val) => {
        cartNumber = val
      }
    )
    const base = computed(() => {
      return store.getters
    })
    const accountUrl = computed(() => {
      return store.getters['options/ssoCenterUrl']
    })
    const appConfig = computed(() => store.state.options.appConfig)
    function login() {
      window.location.href = base.value['options/loginUrl'] + `?returnUrl=${encodeURIComponent(window.location.href)}&appId=${appCode}`
    }
    function register() {
      window.location.href = base.value['options/registerUrl'] + `?returnUrl=${encodeURIComponent(window.location.href)}&appId=${appCode}`
    }
    function logout() {
      window.location.href = `${ssoRestUrl}/api/user/logout?targetUrl=${encodeURIComponent(window.location.origin)}`
    }
    function switchEn(en) {
      api.sso.switchEnterprise({ enuu: en.enuu }).then(() => {
        window.location.href = '/'
        store.dispatch('auth/getAuth')
      })
    }

    return {
      headHomeImg,
      appConfig,
      router,
      cartNumber,
      user,
      login,
      base: toRefs(base),
      accountUrl,
      register,
      logout,
      switchEn
    }
  }
})
</script>

<style lang="scss" scoped>
.inlineb {
  display: inline-block;
}
.main-header {
  height: 32px;
  line-height: 32px;
  width: 100%;
  background: #fafafa;
  box-shadow: inset 0px -1px 0px 0px #dedede;
  .header-wrap {
    width: 1200px;
    margin: 0 auto;
    color: #323233;
    .header-logo {
      color: #323233;
      img {
        margin-right: 3px;
        vertical-align: middle;
        margin-top: -5px;
        width: 21px;
      }
    }
    .fr {
      .item {
        color: #323233;
        cursor: pointer;
        margin: 0 6px;
        &.item-user {
          cursor: default;
          margin: 0;
        }
      }
      .drop-down {
        position: relative;
        ul {
          position: absolute;
          display: none;
          top: 100%;
          left: 0;
          width: auto;
          line-height: normal;
          border-top: none;
          max-height: 400px;
          overflow-y: auto;
          background: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          padding: 0 16px;
          z-index: 2000;
          li {
            line-height: 36px;
            max-width: 365px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.65);
            overflow: hidden;
            cursor: pointer;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              color: #5078cb;
            }
          }
        }
        .menu-item-first {
          padding-top: 10px;
          font-size: 16px;
          color: #577ecd;
          font-weight: bold;
        }
        &:hover {
          ul {
            display: block;
          }
        }
      }
    }
    .fl {
      color: #323233;
      img {
        width: 21px;
        height: 19px;
        vertical-align: text-bottom;
        margin-right: 3px;
      }
    }
  }
}
</style>
