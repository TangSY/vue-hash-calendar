/**
* @Description:    通过 slot 实现将每个月的1号显示为1号，而不是类似【6月】  github issues：https://github.com/TangSY/vue-hash-calendar/issues/23
* @Author:         TSY
* @CreateDate:     2020/06/09 21:08
* @Email:          t@tsy6.com
*/
<template>
  <div class="body">
    <button @click="showCalendarDialog">显示</button>
    <vue-hash-calendar ref="picker"
                       model="dialog"
                       :visible.sync="isShowCalendar"
                       picker-type="date">
      <div slot="day" slot-scope="scope">
        <div v-if="scope.extendAttr.isToday">今</div>
        <div v-else>{{scope.date.day}}</div>
      </div>
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
      defaultDatetime: new Date()
    }
  },
  mounted() {

  },
  methods: {
    showCalendarDialog() { // 显示日历
      this.isShowCalendar = true
    }
  }
}
</script>
<style lang="stylus">
.hhhh
  background red
</style>