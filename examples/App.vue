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
                       format="YY/MM/DD hh:mm"
                       lang="CN"
                       @confirm="dateConfirm"
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
      isShowCalendar: true, // 是否显示弹窗
      isShowTips: false, // 是否显示下载提示
      defaultDatetime: new Date(),
      markDate: [
        '2020/11/24', '2020/11/22',
        { color: 'red', type: 'dot', date: ['0', '2020/02/25', '2020/03/25', '2020/04/01', '2020/05/25', '2020/06/25', '2020/07/25', '2020/08/25', '2020/09/25', '2020/10/25', '2020/11/25', '2020/12/25'] },
        { color: 'blue', type: 'circle', date: ['2020/01/20', '2020/02/20', '2020/03/20', '2020/04/20', '2020/05/20', '2020/06/20', '2020/07/20', '2020/08/20', '2020/09/20', '2020/10/20', '2020/11/20', '2020/12/20'] },
        { color: 'pink', date: ['2020/01/12', '2020/02/12', '2020/03/12', '2020/04/12', '2020/05/12', '2020/06/12', '2020/07/12', '2020/08/12', '2020/09/12', '2020/10/12', '2020/11/12', '2020/12/12'] },
        { color: '#000000', date: ['2020/01/29', '2020/02/29', '2020/03/29', '2020/04/29', '2020/05/29', '2020/06/29', '2020/07/29', '2020/08/29', '2020/09/29', '2020/10/29', '2020/11/29', '2020/12/29'] }
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
    dateClick(date) { // 点击日期时按钮触发
      console.log(date, 'click')
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