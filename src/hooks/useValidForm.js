export function useValidForm() {
  return async (rule, value) => {
    if (!value && rule.required) {
      return Promise.reject(`${rule.label}不能为空！`)
    }
    if (rule.type === 'number' && !Number.isInteger(value)) {
      return Promise.reject(`${rule.label}必须为数字！`)
    }
    if (rule.reg) {
      const reg = rule.reg.pattern
      if (value && !reg.test(value)) {
        return Promise.reject(rule.reg.msg)
      }
    }
    return Promise.resolve()
  }
}

export function useValidAmount() {
  return async (rule, value) => {
    if (!value && rule.required) {
      return Promise.reject(`请输入充值金额`)
    }
    let reg = /^([1-9]\d*)+(\.\d{0,2})?$/;
    if (value && !reg.test(value)) {
      return Promise.reject('充值金额必须大于0')
    }
    if (value && Number(value) > 1000000) {
      return Promise.reject('充值金额最大不能超过1,000,000.00')
    }
    return Promise.resolve()
  }
}