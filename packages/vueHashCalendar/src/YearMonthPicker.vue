<template>
  <div class="year-body"
       :style="{'top': calendarTitleHeight + 'px'}"
       v-show="type">
    <div 
      class="year-body-item" 
      :style="{'height': itemHeight + 'px'}"
      v-for="(item, index) in currArr" 
      :key="index"
      @click="dateClick(item, index)"
      >
        <p class="year-body-item-content"
           :style="{'width': type === 'yearRange' ? '92px' : '60px'}"
           :class="[isChecked(item, index) && (checkedDayClassName || 'is_checked'),
           isNotCurrent(index) && (notCurrentMonthDayClassName || 'is_not_current'),
           isDisabled(item) && (disabledClassName || 'is_disabled')]">
           {{type === 'yearRange' ? `${item.s}-${item.e}` : item}}
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YearMonthPicker',
  props: {
    // 日期被选中时的 className
    checkedDayClassName: {
      type: String,
      default: ''
    },
    // 不是当前展示月份日期的 className(例如日历前面几天与后面几天灰色部分)
    notCurrentMonthDayClassName: {
      type: String,
      default: ''
    },
    // 日期被禁用时的 className
    disabledClassName: {
      type: String,
      default: ''
    },
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
  watch: {
    type(val) {
      if (val === 'month') {
        this.currArr = this.monthArr
      } else if (val === 'year') {
        this.currArr = this.yearArr
      } else if (val === 'yearRange') {
        this.currArr = this.yearRangeArr
      }
    }
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
    },
    dateClick(date, index) {
      if (this.type === 'month') {
        this.$emit()
      }
      if (this.type === 'year') {
        this.$emit()
      }
      if (this.type === 'yearRange') {
        this.$emit()
      }
    },
    isChecked(date, index) {
      if (this.type === 'month') {
        return index === this.calendarDate.month
      }
      if (this.type === 'year') {
        return date === this.calendarDate.year
      }
      if (this.type === 'yearRange') {
        return date.s <= this.calendarDate.year && date.e >= this.calendarDate.year
      }
    },
    isNotCurrent(index) {
      return (index === 0 || index === 11) && (this.type === 'year' || this.type === 'yearRange')
    },
    isDisabled(date, index) {
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

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

    &-content {
      width: 60px;
      padding 3px 0;
      border-radius 3px
      text-align center

      &.is_checked {
        background: main-color;
        color: white;
      }

      &.is_not_current {
        color: disabled-font-color;
      }

      &.is_disabled {
        background-color: disabled-bg-color;
        opacity: 1;
        cursor: not-allowed;
        color: disabled-font-color;
      }
    }
  }
}
</style>