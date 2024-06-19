export const isPrd = Object.is(import.meta.env.VITE_APP_TITLE, 'prd')

export const ssoUrl = import.meta.env.VITE_APP_SSOURL || 'https://account.uuzcc.cn'

export const ssoRestUrl = import.meta.env.VITE_APP_SSORESTURL || 'https://ssorest.uuzcc.cn'

export const baseUrl = import.meta.env.VITE_APP_BASERESTURL || 'https://feerest.uuzcc.cn'

export const fileUrl = import.meta.env.VITE_APP_FILEURL || 'https://filerest.uuzcc.cn'

export const appCode = 'APP_FEE'

export const appid = isPrd ? import.meta.env.VITE_APP_APPID : 'wxaa38f48c629a07ca'

export const tencentAppId = isPrd ? '2070446011' : '2013727706'

export const advUrl = isPrd ? 'https://operationrest.usoftchina.com' : 'https://operationrest.uuzcc.cn'

export const recordEntName = ' 鄂ICP备2020018075号-1'
export const recordNo = '@2021 Arlene | 个人网站 | '