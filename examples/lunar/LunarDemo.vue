<template>
  <div class="body">
    <button @click="showCalendarDialog">显示</button>
    <vue-hash-calendar model="dialog" :visible.sync="isShowCalendar">
      <div slot="day" slot-scope="scope">
        <div class="lunar-content">
          <div>{{ scope.date.day }}</div>
          <div class="lunar">{{ showLunar(scope.date) }}</div>
        </div>
      </div>
    </vue-hash-calendar>
  </div>
</template>

<script>
import { lunar } from './lunar'

export default {
  name: 'lunarDemo',
  data() {
    return {
      isShowCalendar: true // 是否显示弹窗
    }
  },
  mounted() {},
  methods: {
    showCalendarDialog() {
      // 显示日历
      this.isShowCalendar = true
    },
    showLunar(date) {
      if (!date || !date.day) return

      const lunarObj = lunar.solar2lunar(date.year, date.month + 1, date.day)

      return lunarObj.festival || lunarObj.lunarFestival || lunarObj.IDayCn
    }
  }
}
</script>

<style lang="stylus" scoped>
.lunar-content {
  display: flex;
  align-items: center;
  flex-direction: column;

  .lunar {
    font-size: 12px;
    transform: scale(0.8);
    width: 10vw;
    text-align: center;
  }
}
</style>