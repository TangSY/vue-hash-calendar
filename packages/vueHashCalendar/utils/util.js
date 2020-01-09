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
export let formatDate = function (time, format = 'YY-MM-DD hh:mm:ss') {
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
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec)

  return newTime
}
