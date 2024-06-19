import { ssoRestUrl } from '../config'
import { get, post } from './axios'
export default {
  // 获取用户信息
  getUserInfo: get(`${ssoRestUrl}/api/current/user/info/get`),
  // 切换用户
  switchEnterprise: post(`${ssoRestUrl}/api/login/enterprise/switch`, true),
  // 退出
  logout: post(`${ssoRestUrl}/api/user/logout`, true),

}