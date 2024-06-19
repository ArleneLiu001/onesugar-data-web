import { message } from 'ant-design-vue';
import router from '@/router'

export const resDeal = (res, call, errCall, hideMsg) => {
  if (res) {
    if (res && res.data.respHeader) {
      if (res.data.respHeader.code === 0) {
        call(res.data)
      } else if (res.data.respHeader.code !== -201) {
        errCall && errCall(res.data)
        !hideMsg && resMsg(res.data.respHeader.msg, 'error')
      }
    } else {
      resMsg(res && res.data || '系统错误', 'error')
    }
  }
}
export const errCall = (err, msg) => {
  resMsg(err.response.data || msg || '系统错误', 'error')
  throw err
}
export const resMsg = (info = '成功', type = 'success') => {
  message[type](info)
}

export const toRouter = (url, blank) => {
  if (blank) {
    window.open(url, '_blank')
  } else {
    router.push(url)
  }
}