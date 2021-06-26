/**
 * @Description:    各种工具类
 * @Author:         TSY
 * @CreateDate:     2018/6/9 13:28
 */

/**
 * 判断安卓与IOS平台
 * @returns {string}
 */
export const checkPlatform = function () {
  if (/android/i.test(navigator.userAgent)) {
    return '1'
  }
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return '2'
  }
}

/**
 * 日期格式化
 * @param time
 * @param format
 * @returns {string}
 */
export let formatDate = function (time, format, lang = 'CN') {
  lang = lang.toUpperCase()
  let language = require('../language').default[lang] || {}
  format = format || `${language.DEFAULT_DATE_FORMAT} ${language.DEFAULT_TIME_FORMAT}`
  let date = time ? new Date(time) : new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 // 月份是从0开始的
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index
  })/// /开个长度为10的数组 格式为 00 01 02 03

  let newTime = format.replace(/YY/g, year)
    .replace(/F/g, hour >= 12 ? 'pm' : 'am')
    .replace(/ss/g, preArr[sec] || sec)
    .replace(/mm/g, preArr[min] || min)
    .replace(/hh/g, (hour > 12 && format.includes('F')) ? hour - 12 : format.includes('F') ? hour : preArr[hour] || hour)
    .replace(/DD/g, preArr[day] || day)
    .replace(/MM/g, lang === 'EN' ? language.MONTH[month - 1] : preArr[month] || month)

  return newTime
}

/**
 * 当前日期是否在两个日期范围之间
 * @param {*} curr 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export const isDateInRange = (curr, min, max) => {
  let minDate = min && min.getTime() - 24 * 60 * 60 * 1000
  let maxDate = max && max.getTime()
  let currentDate = curr && curr.getTime()

  if (minDate && maxDate) return currentDate > minDate && currentDate < maxDate
  if (minDate) return currentDate > minDate
  if (maxDate) return currentDate < maxDate

  return true
}