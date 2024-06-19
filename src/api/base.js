import {
  baseUrl
} from '../config'
import {
  get,
  post
} from './axios'

export default {
  //查询账户
  getAccount: get(`${baseUrl}/web/account/get`),
  //查询收费等级列表
  listChargeLevel: get(`${baseUrl}/web/charge/level/list`),
  //分页查询月账单列表 
  pagingMonthBill: get(`${baseUrl}/web/charge/month/bill/paging`),
  //分页查询充值记录列表
  pagingRecharge: get(`${baseUrl}/web/recharge/paging`),
  //申请开票 
  applyOpenInvoice: post(`${baseUrl}/web/invoice/open/apply`, true),
  //查询最近一次开票申请信息 
  getLastInvoice: get(`${baseUrl}/web/invoice/last/get`),
  //账户充值 
  rechargeAccount: post(`${baseUrl}/web/account/recharge`, true),
  // 查询微信支付信息 
  getWxPayInfo: get(`${baseUrl}/web/pay/wx/get`),
  // 查询支付宝支付信息 
  getAliPayInfo: get(`${baseUrl}/web/pay/ali/get`),
  // 根据支付号查询支付状态 
  getPayStatus: get(`${baseUrl}/web/pay/status`),
}