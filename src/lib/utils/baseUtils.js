import { message } from 'ant-design-vue';
export function getParamValue(name) {
  let value = window.location.search.substring(1).match(new RegExp(name + '=([^&=]*)'))
  return (value && decodeURIComponent(value[1])) || ''
}
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
export function msg(self, type, msg) {
  message[type](msg) 
}

// 获取图形验证码
export async function tencentCaptcha(tencentAppId) {
  return await new Promise(resolve => {
    if (typeof window.TencentCaptcha !== 'function') {
      const URL = 'https://turing.captcha.qcloud.com/TCaptcha.js'
      const scriptHeat = document.createElement('script')
      scriptHeat.type = 'text/javascript'
      scriptHeat.src = URL
      document.body.appendChild(scriptHeat)
      scriptHeat.onload = () => {
        const tencentCaptcha = new window.TencentCaptcha(tencentAppId, captcha => {
          resolve(captcha)
        })
        tencentCaptcha.show()
      }
    } else {
      const tencentCaptcha = new window.TencentCaptcha(tencentAppId, captcha => {
        resolve(captcha)
      })
      tencentCaptcha.show()
    }
  })
}

// 微信二维码
export function WxLoginImg(option) {
  // https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js
  if (typeof window.WxLogin !== 'function') {
    const URL = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
    const scriptHeat = document.createElement('script')
    scriptHeat.type = 'text/javascript'
    scriptHeat.src = URL
    document.body.appendChild(scriptHeat)
    scriptHeat.onload = () => {
      new window.WxLogin(option)
    }
  } else {
    new window.WxLogin(option)
  }
}
