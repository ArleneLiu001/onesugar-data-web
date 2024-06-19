/*
 * @str 字符串
 * */
const _getRealLen = function (str) {
    let len = 0
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len += 2
        } else {
            len++
        }
    }
    return len
}

/*
 * @str 字符串
 * @length 需要剪切的字符长度
 * */
const _cutOutString = (str, length) => {
    for (let i = 1; i <= str.length; i++) {
        if (_getRealLen(str.substr(0, i)) > length) {
            str = str.substr(0, i - 1)
            break
        }
    }
    return str
}

/*
 * @str: 传入的字符串
 * @s: 需要判断的字符串
 * */
const _startWith = (str, ...s) => {
    return s.find(it => new RegExp(`^${it}`).test(str))
}

const _endWith = (str, s) => {
    let reg = new RegExp(s + '$')
    return reg.test(str)
}

/*
 *  @str 剪切的字符串
 *  @len 长度设置
 * */
const _filterStringEllipsis = (str, len) => {
    return str ? (_getRealLen(str) > len ? _cutOutString(str, len) + '...' : str) : null
}

// 排除空格的空字符串
const _isEmptyStr = str => {
    return !str || !str.trim()
}

/*
 * @target 需要拷贝的对象
 * */
const _deepCopy = target => {
    if (typeof target !== 'object' || target === null) return target
    // 判断目标类型，来创建返回值
    var newObj = target instanceof Array ? [] : {}
    for (var item in target) {
        // 只复制元素自身的属性，不复制原型链上的
        if (Object.prototype.hasOwnProperty.call(target, item)) {
            newObj[item] = typeof target[item] === 'object' ? _deepCopy(target[item]) : target[item]
        }
    }
    return newObj
}

/*
 * @date 日期，既可以是Date格式，也可是字符串格式
 * @fmt 需要转换的格式，如 'yyyy-MM-dd hh:mm:ss'
 * return 转换后的字符串格式的日期
 * */
const _formatDate = (date, fmt) => {
    if (!date) {
        return null
    }
    // fmt = fmt.replace(/-/g, '/')
    if (typeof date === 'string') {
        date = new Date(Date.parse(date.replace(/-/g, '/')))
    }
    let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return fmt
}

/**
 * return 返回上月第一天与最后一天
 * */
const _getPreDate = time => {
    let year = new Date(time).getFullYear()
    let month = new Date(time).getMonth()
    if (month === 0) {
        month = 12
        year -= 1
    }
    if (month < 10) {
        month = '0' + month
    }
    return {
        firstDate: `${year}-${month}-01`,
        lastDate: `${year}-${month}-${new Date(year, month, 0).getDate()}`
    }
}

/**
 * return 返回下月第一天与最后一天
 * */
const _getNextDate = time => {
    let year = new Date(time).getFullYear()
    let month = new Date(time).getMonth()
    month += 2
    if (month === 13) {
        month = 1
        year += 1
    }
    if (month < 10) {
        month = '0' + month
    }
    return {
        firstDate: `${year}-${month}-01`,
        lastDate: `${year}-${month}-${new Date(year, month, 0).getDate()}`
    }
}

const _getCurrentDateStr = (fmt = 'yyyy-MM-dd') => {
    return _formatDate(new Date(), fmt)
}

// 价格整数和小数分开显示
const _priceSplitShow = (price, className = 'font14') => {
    if (typeof price === 'number') {
        if (price < 1) {
            return `<span class="${className}">${price}</span>`
        } else {
            let priceArr = price.toString().split('.')
            if (priceArr[1]) {
                return `${priceArr[0]}<span class="${className}">.${priceArr[1]}</span>`
            } else {
                return price
            }
        }
    } else {
        return ''
    }
}

// 同时显示币种符号和价格
const _priceTitleShow = (price, currency) => {
    if (typeof price === 'number') {
        if (currency === 'USD' && '$') {
            return `$${price}`
        } else {
            return `￥${price}`
        }
    } else {
        return ''
    }
}
// 主营产品 *空格*分割字符  *、*号连接
const _mainProductShow = str => {
    if (str) {
        return str.split(' ').join('、')
    }
}
// b2b发货单（客户修改数量）空格切割 换行显示
const _brShow = str => {
    if (str) {
        let strs = str.split('：')
        return `${strs[0]}：<br>${strs[1]}`
    }
}
/*
 * 获取某个时间段去除时分秒的时间戳(目前写死八点)
 * @date 默认当天 Date格式
 * @days 指定多少天
 * */
const _getClearDay = (days = 0, date = new Date()) => {
    return new Date(_formatDate(date, 'yyyy-MM-dd')).getTime() - days * 24 * 60 * 60 * 1000
}

/*
 * 获取某个时间段的23:59:59(目前写死0点)
 * @date 默认当天 Date格式
 * */
const _getFullDay = (date = new Date()) => {
    return new Date((typeof date === 'object' ? date.getTime() : date) + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000)
}

// //乘法函数，用来得到精确的乘法结果
const _accMul = (arg1, arg2) => {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', ''))) * (Number(s2.replace('.', ''))) / Math.pow(10, m)
}

//加法函数，用来得到精确的加法结果
const _accAdd = (arg1, arg2) => {
    let r1, r2, m
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
//减法函数，用来得到精确的减法结果
const _subtract = (arg1, arg2) => {
    let r1, r2, m, n
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    n = r1 >= r2 ? r1 : r2
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n))
}

//   处理路由地址
const _getParamValue = (name, url) => {
    url = url || window.location.search
    let value = url.substring(1).match(new RegExp(name + '=([^&=]*)'))
    return (value && decodeURIComponent(value[1])) || ''
}

/**
 * 将数值四舍五入后格式化.
 *
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
const _formatThousands = (num, cent = 2, isThousand = 1) => {
    let sign, cents
    let reg = /(\$|,)/g

    // 检查传入数值为数值类型
    if (isNaN(num) || num === 0) {
        num = '0'
    }

    num = num.toString().replace(reg, '')

    // 获取符号(正/负数)
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * Math.pow(10, cent) + 0.50000000001) // 把指定的小数位先转换成整数.多余的小数位四舍五入
    cents = num % Math.pow(10, cent) // 求出小数位数值
    num = Math.floor(num / Math.pow(10, cent)).toString() // 求出整数位数值
    cents = cents.toString() // 把小数位转换成字符串,以便求小数位长度

    // 补足小数位到指定的位数
    while (cents.length < cent) {
        cents = '0' + cents
    }
    if (isThousand) {
        // 对整数部分进行千分位格式化.
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        }
    }
    return cent > 0 ? (((sign) ? '' : '-') + num + '.' + cents) : (((sign) ? '' : '-') + num)
}

const _currencyFilter = (currency) => {
    return (currency === 'RMB' && '¥') || (currency === 'USD' && '$') || '¥'
}

const _bankCard = (number) => {
    return number.replace(/\s/g, '').replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
}

export default {
    // 获取字符串字符长度
    getRealLen: _getRealLen,
    // 根据字符长度剪切字符
    cutOutString: _cutOutString,
    // 判断字符串开头
    startWith: _startWith,
    // 字符串结尾
    endWith: _endWith,
    // 截取字符长度并补充省略号
    filterStringEllipsis: _filterStringEllipsis,
    isEmptyStr: _isEmptyStr,
    deepCopy: _deepCopy,
    formatDate: _formatDate,
    // 计算上个月的第一天与最后一天的时间
    getPreDate: _getPreDate,
    // 计算下个月的第一天与最后一天的时间
    getNextDate: _getNextDate,
    getCurrentDateStr: _getCurrentDateStr,
    priceSplitShow: _priceSplitShow,
    // 货币符号和价格显示
    priceTitleShow: _priceTitleShow,
    // 主营产品 *空格*分割字符  *、*号连接
    mainProductShow: _mainProductShow,
    // b2b发货单（客户修改数量）空格切割 换行显示
    brShow: _brShow,
    // 获取某个时间段去除时分秒的时间戳
    getClearDay: _getClearDay,
    // 取某个时间段的23:59:59
    getFullDay: _getFullDay,
    subtract: _subtract,
    accAdd: _accAdd,
    getParamValue: _getParamValue,
    currencyFilter: _currencyFilter,
    // 千分位处理
    formatThousands: _formatThousands,
    bankCard: _bankCard,
    accMul: _accMul
}