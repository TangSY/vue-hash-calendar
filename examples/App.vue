/**
* @Description:    vue-hash-calendar 移动端日期、时间选择插件，日期选择面板以日历形式展示。支持上下滑动切换日期、时间
* @Author:         TSY
* @CreateDate:     2019/05/23 00:08
* @Email:          t@tsy6.com
*/
<template>
  <div class="body">
    <button @click="showCalendarDialog">显示</button>
    <vue-hash-calendar ref="picker"
                       model="dialog"
                       :is-show-arrow="false"
                       :is-show-not-current-month-day="true"
                       :scroll-change-date="true"
                       :visible.sync="isShowCalendar"
                       :default-datetime="defaultDatetime"
                       :is-show-week-view="false"
                       :is-show-action="true"
                       :minute-step="1"
                       :disabled-scroll="false"
                       :mark-date="markDate"
                       mark-type="dotcircle"
                       :disabled-date="disabledDate"
                       week-start="sunday"
                       picker-type="datetime"
                       :show-today-button="true"
                       :disabled-week-view="false"
                       :change-year-fast="true"
                       :theme-color="themeColor"
                       format="YY/MM/DD hh:mm"
                       lang="cn"
                       @calendarTypeChange="calendarTypeChange"
                       @confirm="dateConfirm"
                       @slidechange="slidechange"
                       @click="dateClick"
                       @change="dateChange">
    </vue-hash-calendar>
    <!--github入口-->
    <github></github>
  </div>
</template>

<script>
import Github from './Github.vue'

export default {
  name: 'demo',
  components: { Github },
  data() {
    return {
      themeColor: {}, // 主题颜色
      isShowCalendar: true, // 是否显示弹窗
      isShowTips: false, // 是否显示下载提示
      defaultDatetime: new Date(),
      markDate: [
        ' 2021/11/24', ' 2021/11/22',
        { color: 'red', type: 'dot', date: ['0', ' 2021/02/25', ' 2021/03/25', ' 2021/04/01', ' 2021/05/25', ' 2021/06/25', ' 2021/07/25', ' 2021/08/25', ' 2021/09/25', ' 2021/10/25', ' 2021/11/25', ' 2021/12/25'] },
        { color: 'blue', type: 'circle', date: [' 2021/01/20', ' 2021/02/20', ' 2021/03/20', ' 2021/04/20', ' 2021/05/20', ' 2021/06/20', ' 2021/07/20', ' 2021/08/20', ' 2021/09/20', ' 2021/10/20', ' 2021/11/20', ' 2021/12/20'] },
        { color: 'pink', date: [' 2021/01/12', ' 2021/02/12', ' 2021/03/12', ' 2021/04/12', ' 2021/05/12', ' 2021/06/12', ' 2021/07/12', ' 2021/08/12', ' 2021/09/12', ' 2021/10/12', ' 2021/11/12', ' 2021/12/12'] },
        { color: '#000000', date: [' 2021/01/29', ' 2021/02/29', ' 2021/03/29', ' 2021/04/29', ' 2021/05/29', ' 2021/06/29', ' 2021/07/29', ' 2021/08/29', ' 2021/09/29', ' 2021/10/29', ' 2021/11/29', ' 2021/12/29'] }
      ] // 对象数组形式的标记日期，可以自定义标记颜色
    }
  },
  mounted() {
    // this.defaultDatetime = new Date('2019-06-01 19:04');
  },
  methods: {
    showCalendarDialog() { // 显示日历
      this.isShowCalendar = true
    },
    dateChange(date) { // 日期改变触发
      console.log(date, 'change')
    },
    dateConfirm(date) { // 点击确认按钮触发
      console.log(date, 'confirm')
    },
    slidechange(direction) { // 滑动方向
      console.log(direction, 'direction')
    },
    dateClick(date) { // 点击日期时按钮触发
      console.log(date, 'click')
    },
    calendarTypeChange(type) { // 日历展示类型切换时触发
      console.log(type, 'calendarType')
    },
    disabledDate(date) { // 禁用的日期
      let timestamp = date.getTime()
      let oneDay = 24 * 60 * 60 * 1000

      if (timestamp < new Date().getTime() - oneDay) {
        return true
      }
      return false
    },
    disabledTime(date) { // 禁用的时间
      let hours = date.getHours()
      let minute = date.getMinutes()
      let hoursNow = new Date().getHours()
      let minuteNow = new Date().getMinutes()

      if (hours < hoursNow || (hours === hoursNow && minute < minuteNow)) {
        return true
      }
      return false
    }
  }
}
</script>
<style lang="stylus">
.hhhh {
  background: red;
}
</style>