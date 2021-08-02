/**
* @Description:    年月选择组件（年范围/年/月）
* @Author:         TSY
* @Email:          t@tsy6.com
* @CreateDate:     2021/5/26 22:53
*/
<template>
  <div class="year-body"
       :style="{'top': calendarTitleHeight + 'px', 'height': itemHeight * 4 + 'px'}"
       v-show="['year', 'yearRange', 'month'].includes(type)">
    <ScrollContainer :calendarData="yearMonthShow"
                     :disabledScroll="disabledScrollDirec"
                     @touchstart="touchStart"
                     @touchmove="touchMove"
                     @touchend="touchEnd"
                     @slidechange="slideChange">
      <template slot-scope="scope">
        <div class="year-body-item"
             :style="{'height': itemHeight + 'px'}"
             v-for="(item, index) in scope.currArr"
             :key="index"
             :class="[isDisabled(item, index) && (disabledClassName || 'is_disabled')]"
             @click="dateClick(item, index)">
          <p class="year-body-item-content"
             :style="{'width': type === 'yearRange' ? '92px' : '60px'}"
             :class="[isChecked(item, index) && (checkedDayClassName || 'is_checked'),
              isNotCurrent(index) && (notCurrentMonthDayClassName || 'is_not_current')]">
            {{type === 'yearRange' ? `${item.s}-${item.e}` : type === 'month' ? language.MONTH[index] : item}}
          </p>
        </div>
      </template>
    </ScrollContainer>
  </div>
</template>

<script>
import ScrollContainer from '../components/ScrollContainer.vue'
import { isDateInRange } from '../utils/util'
import languageUtil from '../language'

export default {
  components: { ScrollContainer },
  name: 'YearMonthPicker',
  props: {
    // 最小可选日期
    minDate: {
      type: Date,
      default: null
    },
    // 最大可选日期
    maxDate: {
      type: Date,
      default: null
    },
    // 禁用的日期
    disabledDate: {
      type: Function,
      default: () => {
        return false
      }
    },
    // 滑动的时候，是否触发改变日期
    scrollChangeDate: {
      type: Boolean,
      default: true
    },
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
    // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
    disabledScroll: {
      type: [Boolean, String],
      default: false
    },
    // 日历选中的日期 {year, month, day}
    calendarDate: {
      type: Object,
      default: () => {
        return {
          year: new Date().getFullYear,
          month: new Date().getMonth,
          day: new Date().getDate
        }
      }
    },
    // 使用的语言包
    lang: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      language: {}, // 使用的语言包
      yearRange: 10,
      disabledScrollDirec: false,
      yearMonthShow: [],
      selectType: ['single', 'mutiple', 'range'],
      calendarType: ['week', 'date', 'month', 'year', 'yearRange', 'datetime']
    }
  },
  mounted() {
    this.language = languageUtil[this.lang.toUpperCase()]
  },
  watch: {
    type(val) {
      this.disabledScrollDirec = this.disabledScroll
      if (val === 'month') {
        this.disabledScrollDirec = true
        this.yearMonthShow = [
          this.language.MONTH,
          this.language.MONTH,
          this.language.MONTH
        ]
      } else if (val === 'year') {
        this.yearMonthShow = this.getThreeYearArr()
      } else if (val === 'yearRange') {
        this.yearMonthShow = this.getThreeYearRangeArr()
      }
    }
  },
  computed: {
    itemHeight() {
      return (this.calendarContentHeight - this.calendarTitleHeight) / 4
    }
  },
  methods: {
    initYear(year) {
      const yearArr = []
      const currYear = `${year || this.calendarDate.year}`
      const yearStart = parseInt(currYear.substring(0, 3) + '0')
      for (let i = 0; i <= this.yearRange; i++) {
        yearArr.push(yearStart + i)
      }
      yearArr.unshift(yearStart - 1)

      return yearArr
    },
    initYearRange(year) {
      const yearRangeArr = []
      const currYear = `${year || this.calendarDate.year}`
      const yearStart = parseInt(currYear.substring(0, 2) + '00')
      for (let i = 0; i <= this.yearRange; i++) {
        yearRangeArr.push({ s: yearStart + i * 10, e: yearStart + i * 10 + 9 })
      }
      yearRangeArr.unshift({ s: yearStart - 10, e: yearStart - 1 })

      return yearRangeArr
    },
    slideChange(direc) {
      if (direc === 'left') {
        this.getNextOpitonData()
      } else if (direc === 'right') {
        this.getLastOptionData()
      }

      this.$emit('slidechange', direc)
    },
    getNextOpitonData() {
      if (this.type === 'year') {
        const year = this.yearMonthShow[2][1]
        this.yearMonthShow = this.getThreeYearArr(year)
      } else if (this.type === 'yearRange') {
        const year = this.yearMonthShow[2][1].s
        this.yearMonthShow = this.getThreeYearRangeArr(year)
      }
    },
    getLastOptionData() {
      if (this.type === 'year') {
        const year = this.yearMonthShow[0][1]
        this.yearMonthShow = this.getThreeYearArr(year)
      } else if (this.type === 'yearRange') {
        const year = this.yearMonthShow[0][1].s
        this.yearMonthShow = this.getThreeYearRangeArr(year)
      }
    },
    getThreeYearArr(year = this.calendarDate.year) {
      year = year + ''
      const yearStartLast = parseInt(parseInt(year.substring(0, 3)) - 1 + '0')
      const yearStartCurr = parseInt(year.substring(0, 3) + '0')
      const yearStartNext = parseInt(parseInt(year.substring(0, 3)) + 1 + '0')

      return [
        this.initYear(yearStartLast),
        this.initYear(yearStartCurr),
        this.initYear(yearStartNext)
      ]
    },
    getThreeYearRangeArr(year = this.calendarDate.year) {
      year = year + ''
      const yearStartLast = parseInt(parseInt(year.substring(0, 2)) - 1 + '00')
      const yearStartCurr = parseInt(year.substring(0, 2) + '00')
      const yearStartNext = parseInt(parseInt(year.substring(0, 2)) + 1 + '00')

      return [
        this.initYearRange(yearStartLast),
        this.initYearRange(yearStartCurr),
        this.initYearRange(yearStartNext)
      ]
    },
    dateClick(date, index) {
      if (!date) return // fix:1月无法选中
      if (this.isDisabled(date, index)) return

      let checkedDate = { ...this.calendarDate, type: this.type }
      if (this.type === 'month') {
        checkedDate = {
          ...checkedDate,
          month: index
        }
      }
      if (this.type === 'year') {
        checkedDate = {
          ...checkedDate,
          year: date
        }
      }
      if (this.type === 'yearRange') {
        const yearArr = this.getRangeYear(date)
        checkedDate = {
          ...checkedDate,
          year: yearArr.includes(checkedDate.year) ? checkedDate.year : date.s
        }
      }

      this.$emit('click', checkedDate)
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
      let fDate = new Date()

      if (this.type === 'month') {
        fDate = new Date(`${this.calendarDate.year}/${parseInt(index) + 1}/${this.calendarDate.day}`)
      } else if (this.type === 'year') {
        fDate = new Date(`${date}/${parseInt(this.calendarDate.month) + 1}/${this.calendarDate.day}`)
      } else if (this.type === 'yearRange') {
        const yearArr = this.getRangeYear(date)
        return yearArr.every(year => {
          fDate = new Date(`${year}/${parseInt(this.calendarDate.month) + 1}/${this.calendarDate.day}`)
          return this.disabledDate(fDate) || !isDateInRange(fDate, this.minDate, this.maxDate)
        })
      }

      return this.disabledDate(fDate) || !isDateInRange(fDate, this.minDate, this.maxDate)
    },
    getRangeYear(date) {
      const yearStart = date.s
      const yearEnd = date.e
      const yearArr = []

      for (let i = yearStart; i <= yearEnd; i++) {
        yearArr.push(i)
      }

      return yearArr
    },
    // 监听手指开始滑动事件
    touchStart(event) {
      this.$emit('touchstart', event)
    },
    // 监听手指开始滑动事件
    touchMove(event) {
      this.$emit('touchmove', event)
    },
    // 监听手指开始滑动事件
    touchEnd(event) {
      this.$emit('touchend', event)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

.year-body {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background: #fff;
  &-item {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.is_disabled {
      disabledBgColor(background-color);
      opacity: 1;
      cursor: not-allowed;
      disabledFontColor(color);
    }
    &-content {
      width: 60px;
      padding: 3px 0;
      border-radius: 3px;
      text-align: center;
      &.is_checked {
        mainColor(background);
        color: white;
      }
      &.is_not_current {
        disabledFontColor(color);
      }
    }
  }
}
</style>