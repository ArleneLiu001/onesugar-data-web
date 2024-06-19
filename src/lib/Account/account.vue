<template>
  <div v-show="value">
    <mask-box :theme="theme" :img="option.img" @close="$emit('change')">
      <div class="login">
        <tabs v-model:value="loginType" :theme="theme" :tabList="tabList" @change="changeLoginUi" />
        <div v-show="loginType !== 'bindWxLogin' && wxui === 'fwx'">
          <!-- 密码登录 -->
          <div v-show="loginType === 'passwordLogin'" class="login-bottom">
            <div class="login-item">
              <u-input @keyup="login" required blur-check v-model:value="passwordLoginParam.account" placeholder="手机号" />
            </div>
            <div class="login-item">
              <u-input @keyup="login" required blur-check v-model:value="passwordLoginParam.password" type="password" placeholder="密码" />
            </div>
            <div class="checkbox-five">
              <label :style="{ '--theme': theme }" class="checkbox-wrapper">
                <span class="checkbox">
                  <span class="checkbox-inner" :style="{ borderColor: rememberPwd ? theme : 'rgba(0,0,0,0.25)', background: rememberPwd ? theme : '#fff' }"></span>
                  <input class="checkbox-input" type="checkbox" v-model="rememberPwd" @change.stop="onRememberPwd" />
                </span>
                <span>记住密码</span>
              </label>
            </div>
            <button class="btn" :style="btnSummit" @click="login" @keyup.enter="login">登 录</button>
          </div>
          <!-- 手机登录 -->
          <div v-show="loginType === 'phoneLogin'" class="login-bottom">
            <div class="login-item">
              <u-input required blur-check v-model:value="phoneLoginParam.mobile" placeholder="请输入手机号" @keyup="login" />
            </div>
            <div class="clearfix login-item">
              <u-input @keyup="login" class="fl" required blur-check v-model:value="phoneLoginParam.checkCode" placeholder="验证码" style="width: 167px; margin-right: 16px" />
              <!-- <u-button >获取验证码</u-button> -->
              <button style="width: 102px" class="btn" :style="btnDefault" @click="sendSmsCode('phoneLoginParam')" :class="codeObj.className">{{ codeObj.codeText }}</button>
            </div>
            <button class="btn" :style="btnSummit" @click="login" @keyup.enter="login">登录</button>
          </div>
          <!-- 微信登录 -->
          <div v-show="loginType === 'wxLogin'" class="login-bottom">
            <div id="login_container" class="wxLogin-content" v-if="option.appid"></div>
            <div class="noWxLogin" v-else>
              <img src="./noWx.png" alt="noWx" />
              <p>
                暂时无法使用微信扫码登录
                <br />请选择其他登录方式
              </p>
            </div>
          </div>
        </div>
        <!--绑定微信 -->
        <div v-show="loginType === 'bindWxLogin' && wxui === 'wx'" class="bind-wx">
          <div class="bind-wx-top clearfix">
            <p class="title">绑定已有账号</p>
            <a class="back" @click="wxLoginGoBack">返回</a>
          </div>
          <div class="bind-wx-main">
            <div class="icon">
              <img class="headpic" :src="weChatUserDetailInfo.headimgurl" :alt="weChatUserDetailInfo.nickname" />
              <p class="nick">{{ weChatUserDetailInfo.nickname }}</p>
            </div>
            <div class="mb16 pr lh32">
              <u-input required blur-check v-model:value="bindWxLoginParam.mobile" placeholder="请输入手机号" />
            </div>
            <div class="clearfix mb16 pr lh32">
              <u-input class="fl" required blur-check v-model:value="bindWxLoginParam.checkCode" placeholder="验证码" style="width: 180px; margin-right: 10px" />
              <!-- <u-button >获取验证码</u-button> -->
              <button class="btn" :style="btnDefault" @click="sendSmsCode('bindWxLoginParam')" :class="codeObj.className">{{ codeObj.codeText }}</button>
            </div>
            <button class="btn" :class="btnSummit" @click="bindWeChat">确定绑定已有账号</button>
            <p class="bind-wx-bottom">
              <span>还没有优软账号，直接</span>
              <a class="account" @click="goPage(option.registerUrl)">创建新账号</a>
            </p>
          </div>
        </div>
        <div class="login-for-reg">
          <template v-if="loginType === 'passwordLogin'"> <a @click="goPage(forgetUrl)">忘记密码?</a>&nbsp;|&nbsp; </template>
          <a @click="goPage(option.registerUrl)">免费注册</a>
        </div>
      </div>
    </mask-box>
    <div class="enterprise" v-show="chooseEnterprise">
      <div class="content">
        <div class="title">{{ option.enterpriseTitle || '请选择您要登录的公司：' }}</div>
        <ul class="list">
          <li @click="goLogin(item.enuu)" v-for="(item, index) in enterprise" :key="index" class="item">{{ item.name + (item.enuu === 0 ? '(个人)' : '') }}</li>
        </ul>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</template>
<script>
import * as Utils from '../utils/baseUtils'
import apis from '../utils/api'
import MaskBox from './mask.vue'
import Tabs from './tabs.vue'
import UInput from './UInput.vue'

export default {
  name: 'Account',
  components: {
    MaskBox,
    Tabs,
    UInput
  },
  emits: ['change', 'update:value'],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default: () => {}
    },
    theme: {
      type: String,
      default: '#3597D5'
    }
  },
  data() {
    return {
      rememberPwd: false,
      tabList: [
        { type: 'passwordLogin', text: '密码登录' },
        { type: 'phoneLogin', text: '短信登录' },
        { type: 'wxLogin', text: '微信登录' }
      ],
      wxui: '',
      chooseEnterprise: false,
      codeObj: {
        style: '',
        codeText: '获取验证码'
      },
      bindWxLoginParam: {
        mobile: '',
        checkCode: '',
        appid: this.option.appid
      },
      canSendCode: true,
      code: Utils.getParamValue('code'),
      returnUrl: Utils.getParamValue('returnUrl'),
      openPartnerUrl: Utils.getParamValue('openPartnerUrl'),
      type: {
        passwordLogin: 151012,
        phoneLogin: 151013,
        wxLogin: 151014,
        // 绑微信login
        bindWxLogin: 151014
      },
      passwordLoginParam: {
        account: '',
        password: ''
      },
      wxLoginParam: {
        code: Utils.getParamValue('code'),
        appid: this.option.appid
      },
      phoneLoginParam: {
        mobile: '',
        checkCode: ''
      },
      loginType: '',
      forMonth: false,
      forgetUrl: '/resetPassword',
      // 企业列表
      enterprise: [],
      // 微信信息
      weChatUserDetailInfo: {},
      interval: 0
    }
  },
  created() {
    if (window.localStorage.getItem('rememberPwd')) {
      this.rememberPwd = true
      this.passwordLoginParam = JSON.parse(window.localStorage.getItem('rememberPwd'))
    }
    // if (this.wxLoginParam.code && this.wxLoginParam.appid) {
    //   // 微信授权后带有code ，立即执行查询接口
    //   let param = {
    //     weChatLoginParam: this.wxLoginParam,
    //     type: this.type['wxLogin']
    //   }
    //   this.loginType = 'wxLogin'
    //   this.realLoginFn(param)
    //   this.wxui = 'wx'
    // } else {
    this.wxui = 'fwx'
    this.loginType = 'passwordLogin'
    // }
  },
  computed: {
    btnDefault() {
      return {
        color: this.theme,
        background: '#fff',
        border: `1px solid ${this.theme}`
      }
    },
    btnSummit() {
      return {
        height: '40px',
        color: '#fff',
        background: this.theme
      }
    }
  },
  methods: {
    onRememberPwd() {
      if (this.rememberPwd) {
        window.localStorage.setItem('rememberPwd', JSON.stringify(this.passwordLoginParam))
      } else {
        window.localStorage.removeItem('rememberPwd')
      }
    },
    wxLoginGoBack() {
      this.loginType = 'wxLogin'
      this.wxui = 'fwx'
      this.getWxLoginImg()
    },
    // 选择账号登录
    goLogin(enuu) {
      let loginParamName = {
        passwordLogin: 'passwordLoginParam',
        phoneLogin: 'smsLoginParam',
        wxLogin: 'weChatLoginParam'
      }
      let param = {
        type: this.type[this.loginType],
        enuu
      }
      if (this.loginType === 'bindWxLogin') {
        param.weChatLoginParam = this.wxLoginParam
      } else {
        param[loginParamName[this.loginType]] = this[this.loginType + 'Param']
      }
      if (this.option.appCode) {
        param.appCode = this.option.appCode
      }
      apis.userLogin(param, this.option.baseUrl).then(
        (response) => {
          if (response.data && response.data.respHeader) {
            if (response.data.respHeader.code === 0) {
              // 成功跳转到页面
              window.location.replace(this.returnUrl || this.option.returnUrl)
            } else {
              Utils.msg(this, 'error', response.data.respHeader.msg)
            }
          } else {
            Utils.msg(this, 'error', '抱歉，登录失败')
          }
        },
        () => {
          Utils.msg(this, 'error', '抱歉，登录失败')
        }
      )
    },
    // 绑定微信
    bindWeChat() {
      // wxCode 微信code
      let param = {
        ...this.bindWxLoginParam,
        wxCode: this.wxLoginParam.code
      }
      this.checkCodebindWeChat(param)
    },
    checkCodebindWeChat(param) {
      if (!param.mobile) {
        Utils.msg(this, 'info', '请输入手机号码')
        return
      }
      if (!param.checkCode) {
        Utils.msg(this, 'info', '请输入手机验证码')
        return
      }
      if (this.option.appCode) {
        param.appCode = this.option.appCode
      }
      apis.bindWeChat(param, this.option.baseUrl).then(
        (response) => {
          if (response.data && response.data.respHeader) {
            if (response.data.respHeader.code === 0) {
              let param = {
                weChatLoginParam: this.wxLoginParam,
                type: this.type[this.loginType]
              }
              this.realLoginFn(param)
            } else {
              Utils.msg(this, 'error', response.data.respHeader.msg)
            }
          } else {
            Utils.msg(this, 'error', '抱歉，绑定失败')
          }
        },
        () => {
          Utils.msg(this, 'error', '抱歉，绑定失败')
        }
      )
    },
    getWxLoginImg() {
      Utils.WxLoginImg({
        self_redirect: false,
        id: 'login_container',
        appid: this.bindWxLoginParam.appid,
        scope: 'snsapi_login',
        redirect_uri: this.getWindowLocation(),
        state: '',
        style: '',
        href: this.option.ssoBaseUrl + '/static/css/wxlogin.css'
      })
    },
    getWindowLocation() {
      return this.option.ssoBaseUrl + '/login.html' + (this.option.returnUrl ? '?returnUrl=' + encodeURIComponent(this.option.returnUrl) : '')
    },
    goPage(url) {
      let isHttpStr = url.indexOf('http://') > -1 || url.indexOf('https://') > -1
      window.open(isHttpStr ? url : this.option.ssoBaseUrl + url)
    },
    // 改变ui
    changeLoginUi() {
      // 选择微信登录 获取二维码
      if (this.loginType === 'wxLogin') {
        if (this.bindWxLoginParam.appid) {
          this.getWxLoginImg()
        }
      }
      // 去除验证码定时
      window.clearInterval(this.interval)
      // 重置获取验证码
      this.codeObj = {
        style: '',
        codeText: '获取验证码'
      }
      this.canSendCode = true
    },
    login() {
      this[this.loginType]()
    },
    realLoginFn(param) {
      if (this.option.appCode) {
        param.appCode = this.option.appCode
      }
      apis.getUserEnterpriseList(param, this.option.baseUrl).then(
        (response) => {
          if (response.data && response.data.respHeader) {
            let data = response.data
            if (data.respHeader.code === 0) {
              if (data.loginStatus === 151015) {
                window.location.replace(this.returnUrl || this.option.returnUrl)
              } else if (data.loginStatus === 151016) {
                this.enterprise = data.enterprise
                this.chooseEnterprise = true
              } else if (data.loginStatus === 151017) {
                this.weChatUserDetailInfo = data.weChatUserDetailInfo || {}
                this.loginType = 'bindWxLogin'
              } else if (data.loginStatus === 151018) {
                if (data.bindMobileInfo) {
                  window.location.replace(`${this.option.ssoBaseUrl}/mobileBinding.html?uu=${data.bindMobileInfo.uu}&returnUrl=${window.location.href}&bindToken=${data.bindMobileInfo.token}`)
                } else {
                  window.location.replace(this.option.returnUrl)
                }
              } else if (data.loginStatus === 151020) {
                window.location.replace(this.openPartnerUrl || this.option.openPartnerUrl)
              }
            } else {
              Utils.msg(this, 'error', data.respHeader.msg)
            }
          } else {
            Utils.msg(this, 'error', '抱歉，登录失败')
          }
        },
        () => {
          Utils.msg(this, 'error', '抱歉，登录失败')
        }
      )
    },
    passwordLogin() {
      let param = {
        passwordLoginParam: this.passwordLoginParam,
        type: this.type[this.loginType]
      }
      if (!param.passwordLoginParam.account) {
        Utils.msg(this, 'info', '请输入账号')
        return
      }
      if (!param.passwordLoginParam.password) {
        Utils.msg(this, 'info', '请输入密码')
        return
      }
      this.onRememberPwd()
      this.realLoginFn(param)
    },
    phoneLogin() {
      let param = {
        smsLoginParam: this.phoneLoginParam,
        type: this.type[this.loginType]
      }
      if (!param.smsLoginParam.mobile) {
        Utils.msg(this, 'info', '请输入正确的手机号码')
        return
      }
      if (!param.smsLoginParam.checkCode) {
        Utils.msg(this, 'info', '请输入手机验证码')
        return
      }
      if (!/^1\d{10}$/.test(param.smsLoginParam.mobile)) {
        Utils.msg(this, 'info', '请输入正确的手机号码')
        return false
      }
      this.realLoginFn(param)
    },
    async sendSmsCode(type) {
      if (!this[type].mobile) {
        Utils.msg(this, 'info', '请输入手机号码')
        return
      }
      if (!this.canSendCode) {
        return
      }
      let captcha = await Utils.tencentCaptcha(this.option.tencentAppId)
      let param = {
        mobile: this[type].mobile,
        randstr: captcha.randstr,
        appid: captcha.appid,
        ticket: captcha.ticket
      }
      if (!param.randstr || !param.ticket) {
        this.canSendCode = true
        return false
      }
      this.canSendCode = false
      let api = type === 'bindWxLoginParam' ? 'sendWxbindSmsCheckCode' : 'sendLoginSmsCheckCode'
      apis[api](param, this.option.baseUrl).then(
        (response) => {
          if (response.data && response.data.respHeader && response.data.respHeader.code === 0) {
            this.codeObj.className = 'bggray'
            this.codeObj.codeText = '重新发送(60s)'
            let i = 60
            let self = this
            this.interval = setInterval(() => {
              i--
              if (i === 0) {
                clearInterval(self.interval)
                this.codeObj = {
                  className: '',
                  codeText: '获取验证码'
                }
                this.canSendCode = true
                return
              }
              this.codeObj.codeText = '重新发送(' + i + 's)'
            }, 1000)
          } else {
            Utils.msg(this, 'error', response.data.respHeader.msg)
            this.canSendCode = true
          }
        },
        () => {
          Utils.msg(this, 'error', '发送验证码失败')
          this.canSendCode = true
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.login-rl {
  width: 100%;
  position: relative;
  .login-container {
    width: 1190px;
    position: relative;
    height: 475px;
    margin: 0 auto;
  }
}
.mb24 {
  margin-bottom: 24px;
}

.checkbox-five {
  position: relative;
  margin-bottom: 16px;
  .checkbox-wrapper {
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    margin-right: 10px;
    font-weight: normal;
    .checkbox {
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
      position: relative;
      line-height: 1;
      margin: 0;
      & + span {
        margin-left: 4px;
      }
      .checkbox-inner {
        display: inline-block;
        width: 16px;
        height: 16px;
        position: relative;
        border: 1px solid #efefef;
        border-radius: 3px;
        &:after {
          content: '';
          display: table;
          position: absolute;
          width: 4px;
          height: 8px;
          top: 2px;
          left: 5px;
          border: 2px solid #fff;
          border-top: 0;
          border-left: 0;
          transform: rotate(45deg) scale(1);
          transition: all 0.2s ease;
        }
      }
      .checkbox-input {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        opacity: 0;
        cursor: pointer;
        margin: 0;
        padding: 0;
      }
    }
  }
}

.enterprise {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: grey;
    height: 100%;
    opacity: 0.5;
  }
  .content {
    position: absolute;
    width: 70%;
    background: #fff;
    z-index: 99999;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 40%;
    margin: 0;
    padding: 0;
    .title {
      height: 40px;
      background: #e0e0e0;
      line-height: 40px;
      text-indent: 12px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #d9d9d9;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .list {
      padding: 0;
      overflow-y: auto;
      text-align: left;
      height: 475px;
      li {
        text-indent: 20px;
        border-bottom: 1px solid #d9d9d9;
        width: 33.33%;
        height: 40px;
        float: left;
        line-height: 40px;
        cursor: pointer;
        overflow: hidden;
        &:hover {
          background: #d9d9d9;
        }
      }
    }
  }
}

.bind-wx {
  height: 382px;
  .bind-wx-top {
    height: 54px;
    line-height: 54px;
    font-size: 14px;
    text-indent: 20px;
    border: 1px solid #dcdcdc;
    .title {
      float: left;
      font-size: 18px;
      color: #666;
    }
  }
  .back {
    float: right;
    font-size: 14px;
    color: #5078cb;
    margin-right: 20px;
  }
  .bind-wx-main {
    padding: 17px 20px 0;
    .icon {
      height: 104px;
      width: 60px;
      text-align: center;
      margin: 0 auto;
      .headpic {
        height: 60px;
        border-radius: 50%;
        width: 60px;
      }
      .nick {
        font-size: 12px;
        margin-top: 9px;
        color: hsla(0, 0%, 40%, 0.65);
      }
    }
    .bind-wx-bottom {
      margin: 33px 0 15px;
      text-align: center;
      font-size: 12px;
      color: hsla(0, 0%, 60%, 0.65);
      .account {
        height: 24px;
        padding: 2px 10px;
        border-radius: 12px;
        border: 1px solid #5078cb;
        font-size: 14px;
        color: #5078cb;
        margin-left: 4px;
      }
    }
  }
}

.login {
  background-color: #fff;
  .btn {
    width: 100%;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    vertical-align: middle;
    line-height: 1.4;
    height: 32px;
    padding: 0;
    outline: none;
    &.bggray {
      background: #bfbfbf !important;
      color: #fff !important;
      border: 0 !important;
    }
  }
}

.login-bottom {
  width: 285px;
  margin: 0 auto;
  padding-top: 30px;
  .login-item {
    position: relative;
    margin-bottom: 24px;
    line-height: 32px;
    &:last-child {
      margin-bottom: 16px;
    }
  }
}

.login-for-reg {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  a {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.45);
  }
}
.wxLogin-content {
  height: 200px;
  overflow: hidden;
}
.noWxLogin {
  text-align: center;
  p {
    line-height: 1.5;
    padding-top: 10px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
