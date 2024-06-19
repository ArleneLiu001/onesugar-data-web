import { post } from './axios'

export default {
  // 获取手机验证码
  loginIn: post('/web/api/login'),
  getUserEnterpriseList: post('/api/login/user/enterpise/list/get'),
  // 登录验证码
  sendLoginSmsCheckCode: post('/api/login/sms/checkcode/send'),
  // 绑定微信
  bindWeChat: post('/api/login/wechat/bind'),
  // 用户登录
  userLogin: post('/api/user/login'),
  // 绑定微信验证码
  sendWxbindSmsCheckCode: post('/api/bind/wechat/checkcode/send')
}
