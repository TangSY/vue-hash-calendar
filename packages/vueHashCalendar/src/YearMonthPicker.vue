<template>
  <div class="year-body"
       :style="{'top': calendarTitleHeight + 'px'}"
       v-show="type">
    <div 
      class="year-body-item" 
      :style="{'height': itemHeight + 'px'}" 
      v-for="(item, index) in monthArr" 
      :key="index">{{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'YearMonthPicker',
  props: {
    type: String,
    // 操作栏高度
    calendarTitleHeight: {
      type: Number,
      default: 0
    },
    // 日历内容区域高度
    calendarContentHeight: {
      type: Number,
      default: 0
    },
    // 日历选中的日期 {year, month, day}
    calendarDate: null
  },
  data() {
    return {
      monthArr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      yearArr: [],
      yearRangeArr: [],
      yearRange: 10,
      currArr: [],
      selectType: ['single', 'mutiple', 'range'],
      calendarType: ['week', 'date', 'month', 'year', 'yearRange', 'datetime']
    }
  },
  mounted() {
    this.initYear()
    this.initYearRange()
  },
  computed: {
    itemHeight() {
      console.log(this.calendarContentHeight)
      return (this.calendarContentHeight - this.calendarTitleHeight) / 4
    }
  },
  methods: {
    initYear(year) {
      this.yearArr = []
      const currYear = `${year || new Date().getFullYear()}`
      const yearStart = parseInt(currYear.substring(0, 3) + '0')
      for (let i = 0; i <= this.yearRange; i++) {
        this.yearArr.push(yearStart + i)
      }
      this.yearArr.unshift(yearStart - 1)
    },
    initYearRange(year) {
      this.yearRangeArr = []
      const currYear = `${year || new Date().getFullYear()}`
      const yearStart = parseInt(currYear.substring(0, 2) + '00')
      for (let i = 0; i <= this.yearRange; i++) {
        this.yearRangeArr.push({s: yearStart + i * 10, e: yearStart + i * 10 + 9})
      }
      this.yearRangeArr.unshift({s: yearStart - 10, e: yearStart - 1})
    }
  }
}
</script>

<style lang="stylus" scoped>
.year-body {
  display flex;
  align-items center
  flex-wrap wrap
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background: #fff;

  &-item {
    width: 33%;
    display flex
    align-items center
    justify-content center
  }
}
</style>