 import {
   advUrl
 } from '../config'
 import {
   get
 } from './axios'

 export default {
   /**
    *广告
    * */
   // 获取广告位详情
   getAdvertisement: get(`${advUrl}/api/commercial/get`),
   // 获取应用配置详情 
   getAppConfig: get(`${advUrl}/api/app/config/get`)
 }