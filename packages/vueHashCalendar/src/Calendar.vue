/**
* @Description:    日历组件
* @Author:         TSY
* @Email:          t@tsy6.com
* @CreateDate:     2019/5/26 22:53
*/
<template>
  <div class="calendar_body"
       :style="{'margin-top': calendarTitleHeight + 'px'}"
       v-show="show">
    <div class="calendar_week"
         ref="weekTitle">
      <div class="calendar_item"
           v-for="item in calendarWeek"
           :key="item">
        <p class="calendar_day">
          <slot name="week"
                :week="item">
            {{ item }}
          </slot>
        </p>
      </div>
    </div>
    <div class="calendar_group"
         :style="{'height': `${calendarGroupHeight}px`}"
         ref="calendar"
         @touchstart="touchStart"
         @touchmove.stop.prevent="touchMove"
         @touchend="touchEnd">
      <ul :style="{'transform': `translate3d(${-translateIndex*100}%, 0, 0)`}">
        <li class="calendar_group_li"
            v-for="(item, i) in calendarOfMonthShow"
            :key="i"
            :style="{transform: `translate3d(${(i-1+translateIndex + (isTouching ? touch.x : 0))*100}%, ${calendarY}px, 0)`,transitionDuration: `${isTouching ? 0 : transitionDuration}s`,}">
          <div class="calendar_item"
               ref="calendarItem"
               v-for="(date, j) in item"
               :class="[formatDisabledDate(date) && (disabledClassName || 'calendar_item_disable')]"
               :key="i + j"
               @click="clickCalendarDay(date)">
            <div class="calendar_day"
                 :style="{'border-color': markDateColor(date, 'circle')}"
                 :class="[isFirstDayOfMonth(date, i) && (firstDayOfMonthClassName || 'calendar_first_today'),
                 isToday(date) && (todayClassName || 'calendar_day_today'),
                 isCheckedDay(date) && (checkedDayClassName || 'calendar_day_checked'),
                 isNotCurrentMonthDay(date,i) && (notCurrentMonthDayClassName || 'calendar_day_not'),
                 markDateColor(date, 'circle') && 'calendar_mark_circle']">
              <slot name="day"
                    :date="date"
                    :extendAttr="{isMarked: !!(markDateColor(date, 'circle') || markDateColor(date, 'dot')),
                    isDisabledDate: formatDisabledDate(date),
                    isToday: isToday(date),
                    isChecked: isCheckedDay(date),
                    isCurrentMonthDay: !isNotCurrentMonthDay(date, i),
                    isFirstDayOfMonth: isFirstDayOfMonth(date, i)}">
                {{ isFirstDayOfMonth(date, i) ? language.MONTH && language.MONTH[date.month] : date.day }}
              </slot>
            </div>
            <div :style="{'background': markDateColor(date, 'dot')}"
                 class="calendar_dot"></div>

          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../utils/util'
import languageUtil from '../language'

export default {
  name: 'Calendar',
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
    // 每月第一天的 className
    firstDayOfMonthClassName: {
      type: String,
      default: ''
    },
    // 操作栏高度
    calendarTitleHeight: {
      type: Number,
      default: 0
    },
    // 当天日期的 className
    todayClassName: {
      type: String,
      default: ''
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
    // 滑动的时候，是否触发改变日期
    scrollChangeDate: {
      type: Boolean,
      default: true
    },
    // 禁用周视图
    disabledWeekView: {
      type: Boolean,
      default: false
    },
    defaultDate: {
      type: Date,
      default() {
        return new Date()
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    weekStart: {
      type: String,
      default: 'Sunday'
    },
    // 是否展示非本月日期
    isShowNotCurrentMonthDay: {
      type: Boolean,
      default: true
    },
    // 是否展示周视图
    isShowWeekView: {
      type: Boolean,
      default: false
    },
    // 日期下面的标记
    markDate: {
      type: Array,
      default: () => []
    },
    // 日期标记类型
    markType: {
      type: String,
      default: 'dot'
    },
    // 禁用的日期
    disabledDate: {
      type: Function,
      default: () => {
        return false
      }
    },
    // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
    disabledScroll: {
      type: [Boolean, String],
      default: false
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
      currentChangeIsScroll: false, // 改变当前日期的方式是否为滑动事件
      yearOfCurrentShow: new Date().getFullYear(), // 当前日历展示的年份
      monthOfCurrentShow: new Date().getMonth(), // 当前日历展示的月份
      yearOfToday: new Date().getFullYear(), // 今天所在的年份
      monthOfToday: new Date().getMonth(), // 今天所在的月份
      dayOfToday: new Date().getDate(), // 今天所在的日期
      weekArray: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'], // 星期数组
      calendarWeek: ['日', '一', '二', '三', '四', '五', '六'], // 日历对应的星期
      calendarOfMonth: [], // 月份对应的日历表
      calendarOfMonthShow: [], // 月份对应的日历表
      calendarDaysTotalLength: 42, // 日历表展示的总天数  6行7列
      lastMonthYear: null, // 上个月的年份
      lastMonth: null, // 上个月的月份
      nextMonthYear: null, // 下个月的年份
      nextMonth: null, // 下个月的月份
      checkedDate: {}, // 被选中的日期
      weekStartIndex: 0, // 日历第一天星期名称的index
      translateIndex: 0, // 用于计算上下偏移的距离
      transitionDuration: 0.3, // 动画持续时间
      touch: {
        x: 0,
        y: 0
      }, // 本次touch事件，横向，纵向滑动的距离
      isTouching: false, // 是否正在滑动
      calendarGroupHeight: 0,
      calendarWeekTitleHeight: 0,
      calendarItemHeight: 0,
      touchStartPositionX: null, // 开始滑动x轴的值
      touchStartPositionY: null, // 开始滑动时y轴的值
      calendarY: 0, // 日历相对于Y轴的位置
      selectedDayIndex: 0, // 当前选中的日期，在这一周的第几天
      lastWeek: [], // 上一周的数据
      nextWeek: [], // 下一周的数据
      isLastWeekInCurrentMonth: false, // 上一周的数据是否在本月
      isNextWeekInCurrentMonth: false, // 下一周的数据是否在本月
      markDateColorObj: {}, // 所有被标记的日期所对应的颜色
      markDateTypeObj: {} // 所有被标记的日期所对应的标记类型

    }
  },
  mounted() {
    this.language = languageUtil[this.lang.toUpperCase()]
    this.calendarWeek = this.language.WEEK
    this.weekStartIndex = this.weekArray.indexOf(this.weekStart.toLowerCase())
    this.calendarWeek = [...this.calendarWeek.slice(this.weekStartIndex, this.calendarWeek.length), ...this.calendarWeek.slice(0, this.weekStartIndex)]
  },
  watch: {
    markDate: {
      handler(val) {
        val.forEach((item, index) => {
          if (!item.color) {
            let obj = {}
            obj.color = '#1c71fb'
            if (typeof item === 'string' || typeof item === 'number') {
              item = [item]
            }
            obj.date = item || []
            val[index] = obj
          }
          val[index].type = item.type || this.markType || ''

          val[index].date = this.dateFormat(val[index].date)
        })

        this.markDateColorObj = {}
        this.markDateTypeObj = {}
        val.forEach(item => {
          item.date.forEach(date => {
            this.$set(this.markDateColorObj, date, item.color)
            this.$set(this.markDateTypeObj, date, item.type)
          })
        })
      },
      deep: true,
      immediate: true
    },
    weekStartIndex() {
      this.calculateCalendarOfThreeMonth(this.checkedDate.year, this.checkedDate.month)
    },
    defaultDate: {
      handler(val) {
        if (!(val instanceof Date)) {
          throw new Error('The calendar component\'s defaultDate must be date type!')
        }

        this.$set(this.checkedDate, 'year', val.getFullYear())
        this.$set(this.checkedDate, 'month', val.getMonth())
        this.$set(this.checkedDate, 'day', val.getDate())
        this.calculateCalendarOfThreeMonth(val.getFullYear(), val.getMonth())

        if (this.isShowWeek) {
          this.showWeek()
        }
      },
      immediate: true
    },
    checkedDate: {
      handler(val) {
        this.$emit('change', val)
      },
      deep: true,
      immediate: true
    },
    show: {
      handler(val) {
        if (val) {
          this.calculateCalendarOfThreeMonth(this.checkedDate.year, this.checkedDate.month)
          this.initDom()
        }
      },
      immediate: true
    },
    isShowWeek: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.showWeek()
          })
        } else {
          this.$nextTick(() => {
            this.showMonth()
          })
        }
      },
      immediate: true
    },
    calendarGroupHeight(val) {
      this.$emit('height', val + this.calendarWeekTitleHeight)
    },
    isShowWeekView: {
      handler(val) {
        if (val && this.disabledWeekView) {
          throw new Error('\'isShowWeekView\' and \'disabledWeekView\' can\'t be used at the same time')
        }
      },
      immediate: true
    },
    disabledWeekView: {
      handler(val) {
        if (val && this.isShowWeekView) {
          throw new Error('\'isShowWeekView\' and \'disabledWeekView\' can\'t be used at the same time')
        }
      },
      immediate: true
    }

  },
  computed: {
    // 当前日历是否以星期方式展示
    isShowWeek: {
      get() {
        return this.isShowWeekView
      },
      set(val) {
        this.$emit('update:isShowWeekView', val)
      }
    }
  },
  methods: {
    // 初始化日历dom
    initDom() {
      this.$nextTick(() => {
        this.calendarItemHeight = this.$refs.calendarItem && this.$refs.calendarItem[0].offsetHeight
        this.calendarWeekTitleHeight = this.$refs.weekTitle.offsetHeight

        let calendarItemGroup = this.$refs.calendarItem
        calendarItemGroup.forEach((item) => {
          item.style.height = `${this.calendarItemHeight}px`
        })

        this.showMonth()
        this.calendarGroupHeight = this.calendarItemHeight * 6
      })
    },
    // 今天
    today() {
      this.$set(this.checkedDate, 'day', new Date().getDate())

      this.yearOfCurrentShow = new Date().getFullYear()// 当前日历展示的年份
      this.monthOfCurrentShow = new Date().getMonth()// 当前日历展示的月份

      this.calculateCalendarOfThreeMonth()

      if (this.isShowWeek) {
        setTimeout(() => {
          this.isTouching = true
          this.showWeek()
        }, this.transitionDuration * 1000)
      }
    },
    // 是否为当前月的第一天
    isFirstDayOfMonth(date, i) {
      return date.day === 1 && !this.isNotCurrentMonthDay(date, i)
    },
    // 计算当前展示月份的前后月份日历信息 flag  -1:获取上个月日历信息   0:当月信息或者跨月展示日历信息  1:获取下个月日历信息
    calculateCalendarOfThreeMonth(year = new Date().getFullYear(), month = new Date().getMonth()) {
      this.lastMonthYear = month === 0 ? year - 1 : year// 上个月的年份
      this.lastMonth = month === 0 ? 11 : month - 1// 上个月的月份
      this.nextMonthYear = month === 11 ? year + 1 : year// 下个月的年份
      this.nextMonth = month === 11 ? 0 : month + 1// 下个月的月份

      let firstMonth = this.calculateCalendarOfMonth(this.lastMonthYear, this.lastMonth)
      let secondMonth = this.calculateCalendarOfMonth(year, month)
      let thirdMonth = this.calculateCalendarOfMonth(this.nextMonthYear, this.nextMonth)

      this.calendarOfMonth = []
      this.calendarOfMonth.push(firstMonth, secondMonth, thirdMonth)
      this.calendarOfMonthShow = JSON.parse(JSON.stringify(this.calendarOfMonth))


      if (!this.scrollChangeDate && this.currentChangeIsScroll) {
        this.currentChangeIsScroll = false
        return
      }

      // 改变日期选择的日期
      let tempDate = {}
      let day = this.checkedDate.day
      if (day > 30 || (day > 28 && month === 1)) {
        day = this.daysOfMonth(year)[month]
      }
      tempDate = { day: day, year: year, month: month }

      if (this.formatDisabledDate(tempDate)) return

      // fix: change 事件会触发两次 https://github.com/TangSY/vue-hash-calendar/issues/47
      if (this.isShowWeek) return

      this.$set(this.checkedDate, 'day', tempDate.day)
      this.$set(this.checkedDate, 'year', year)
      this.$set(this.checkedDate, 'month', month)
    },
    // 计算每个月的日历
    calculateCalendarOfMonth(year = new Date().getFullYear(), month = new Date().getMonth()) {
      let calendarOfCurrentMonth = []

      let lastMonthYear = month === 0 ? year - 1 : year// 上个月的年份
      let lastMonth = month === 0 ? 11 : month - 1// 上个月的月份
      let nextMonthYear = month === 11 ? year + 1 : year// 下个月的年份
      let nextMonth = month === 11 ? 0 : month + 1// 下个月的月份

      // 如果当月第一天不是指定的开始星期名称，则在前面补齐上个月的日期
      let dayOfWeek = this.getDayOfWeek(year, month)
      let lastMonthDays = this.daysOfMonth(year)[lastMonth]// 上个月的总天数
      if (dayOfWeek < this.weekStartIndex) {
        dayOfWeek = 7 - this.weekStartIndex + dayOfWeek
      } else {
        dayOfWeek -= this.weekStartIndex
      }
      for (let i = 0; i < dayOfWeek; i++) {
        calendarOfCurrentMonth.push({
          year: lastMonthYear,
          month: lastMonth,
          day: this.isShowNotCurrentMonthDay ? lastMonthDays - (dayOfWeek - 1 - i) : ''
        })
      }

      // 当月日期
      for (let i = 0; i < this.daysOfMonth(year)[month]; i++) {
        calendarOfCurrentMonth.push({
          year: year,
          month: month,
          day: i + 1
        })
      }

      // 在日历后面填充下个月的日期，补齐6行7列
      let fillDays = this.calendarDaysTotalLength - calendarOfCurrentMonth.length
      for (let i = 0; i < fillDays; i++) {
        calendarOfCurrentMonth.push({
          year: nextMonthYear,
          month: nextMonth,
          day: this.isShowNotCurrentMonthDay ? i + 1 : ''
        })
      }

      return calendarOfCurrentMonth
    },
    daysOfMonth(year) {
      return [31, 28 + this.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    },
    // 判断是否为闰年
    isLeap(year) {
      return year % 4 === 0 ? (year % 100 !== 0 ? 1 : (year % 400 === 0 ? 1 : 0)) : 0
    },
    // 获取月份某一天是星期几
    getDayOfWeek(year = new Date().getFullYear(), month = new Date().getMonth(), day = 1) {
      let dayOfMonth = new Date(year, month, day) // 获取当月的第day天
      let dayOfWeek = dayOfMonth.getDay() // 判断第day天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一)
      return dayOfWeek
    },
    // 点击日历上的日期
    clickCalendarDay(date) {
      if (!date || !date.day) return

      if (this.formatDisabledDate(date)) return

      this.$set(this.checkedDate, 'year', date.year)
      this.$set(this.checkedDate, 'month', date.month)
      this.$set(this.checkedDate, 'day', date.day)

      if (date.month === this.lastMonth && date.year === this.lastMonthYear) {
        this.getLastMonth()
      }
      if (date.month === this.nextMonth && date.year === this.nextMonthYear) {
        this.getNextMonth()
      }

      if (this.isShowWeek) {
        this.showWeek()
      }

      this.$emit('click', this.checkedDate)
    },
    // 该日期是否为今天
    isToday(date) {
      return this.yearOfToday === date.year && this.monthOfToday === date.month && this.dayOfToday === date.day
    },
    // 该日期是否为选中的日期
    isCheckedDay(date) {
      if (this.formatDisabledDate(date)) return false

      return this.checkedDate.year === date.year && this.checkedDate.month === date.month && this.checkedDate.day === date.day
    },
    // 非本月日期
    isNotCurrentMonthDay(date, index) {
      let dateOfCurrentShow = this.calendarOfMonth[index][15]// 本月中间的日期一定为本月
      return date.year !== dateOfCurrentShow.year || date.month !== dateOfCurrentShow.month
    },
    // 监听手指开始滑动事件
    touchStart(event) {
      this.$emit('touchstart', event)

      this.touchStartPositionX = event.touches[0].clientX
      this.touchStartPositionY = event.touches[0].clientY
      this.touch = {
        x: 0
      }
      this.isTouching = true
    },
    // 监听手指移动事件
    touchMove(event) {
      this.$emit('touchmove', event)

      let moveX = event.touches[0].clientX - this.touchStartPositionX
      let moveY = event.touches[0].clientY - this.touchStartPositionY
      if (Math.abs(moveX) > Math.abs(moveY)) {
        if (this.isDisabledHorizontalScroll(moveX < 0 ? 'left' : 'right')) return

        this.touch = {
          x: moveX / this.$refs.calendar.offsetWidth,
          y: 0
        }
      } else {
        // 禁用周视图（禁止上下滑动）
        if (this.disabledWeekView) return

        this.touch = {
          x: 0,
          y: moveY / this.$refs.calendar.offsetHeight
        }
      }

      this.setDisabledScrollDirection()
    },
    // 监听touch结束事件
    touchEnd(e) {
      this.$emit('touchend', e)

      this.isTouching = false
      if (Math.abs(this.touch.x) > Math.abs(this.touch.y) && Math.abs(this.touch.x) > 0.2) {
        this.currentChangeIsScroll = true
        if (this.touch.x > 0) {
          this.$emit('slidechange', 'right')

          this.getLastMonth()
          if (this.isShowWeek) {
            setTimeout(() => {
              this.isTouching = true
              this.currentChangeIsScroll = true
              this.getLastWeek()
            }, this.transitionDuration * 1000)
          }
        } else if (this.touch.x < 0) {
          this.$emit('slidechange', 'left')

          this.getNextMonth()
          if (this.isShowWeek) {
            setTimeout(() => {
              this.isTouching = true
              this.currentChangeIsScroll = true
              this.getNextWeek()
            }, this.transitionDuration * 1000)
          }
        }
      }
      if (Math.abs(this.touch.y) > Math.abs(this.touch.x) && Math.abs(this.touch.y * this.$refs.calendar.offsetHeight) > 50) {
        if (this.touch.y > 0 && this.isShowWeek) {
          this.$emit('slidechange', 'down')

          this.showMonth()
        } else if (this.touch.y < 0 && !this.isShowWeek) {
          this.$emit('slidechange', 'up')

          this.showWeek()
        }
      } else {
        this.touch = {
          x: 0,
          y: 0
        }
      }
    },
    // 日历以月份方式展示
    showMonth() {
      this.calendarY = 0
      this.isShowWeek = false
      this.calendarGroupHeight = this.calendarItemHeight * 6

      this.isLastWeekInCurrentMonth = false
      this.isNextWeekInCurrentMonth = false

      this.calculateCalendarOfThreeMonth(this.checkedDate.year, this.checkedDate.month)
    },
    // 日历以星期方式展示
    showWeek(checkedDate = this.checkedDate) {
      let daysArr = []
      this.calendarOfMonth[1].forEach((item) => {
        daysArr.push(item.day)
      })
      let dayIndexOfMonth = daysArr.indexOf(checkedDate.day)
      // 当day为月底的天数时，有可能在daysArr的前面也存在上一个月对应的日期，所以需要取lastIndexOf
      if (checkedDate.day > 15) {
        dayIndexOfMonth = daysArr.lastIndexOf(checkedDate.day)
      }

      // 计算当前日期在第几行
      let indexOfLine = Math.ceil((dayIndexOfMonth + 1) / 7)
      let lastLine = indexOfLine - 1
      this.calendarY = -(this.calendarItemHeight * lastLine)

      this.isShowWeek = true
      this.calendarGroupHeight = this.calendarItemHeight


      let currentWeek = []
      let sliceStart = lastLine * 7
      let sliceEnd = sliceStart + 7
      this.isLastWeekInCurrentMonth = false
      currentWeek = this.calendarOfMonth[1].slice(sliceStart, sliceEnd)
      for (let i in currentWeek) {
        if (currentWeek[i].day === checkedDate.day) {
          this.selectedDayIndex = i
        }
      }

      let firstDayOfCurrentWeek = currentWeek[0]
      let lastDayOfCurrentWeek = currentWeek[6]

      if (firstDayOfCurrentWeek.month !== checkedDate.month || firstDayOfCurrentWeek.day === 1) {
        if (this.calendarOfMonth[0].slice(28, 35)[6].month !== checkedDate.month) {
          this.lastWeek = this.calendarOfMonth[0].slice(28, 35)
        } else {
          this.lastWeek = this.calendarOfMonth[0].slice(21, 28)
        }
      } else {
        this.lastWeek = this.calendarOfMonth[1].slice(sliceStart - 7, sliceEnd - 7)
        if (this.lastWeek[this.selectedDayIndex] && this.lastWeek[this.selectedDayIndex].month === checkedDate.month) {
          this.isLastWeekInCurrentMonth = true
        }
      }

      this.isNextWeekInCurrentMonth = false
      if (lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day && lastDayOfCurrentWeek.month !== checkedDate.month) {
        this.nextWeek = this.calendarOfMonth[2].slice(7, 14)
      } else {
        if (lastDayOfCurrentWeek.day === this.daysOfMonth(lastDayOfCurrentWeek.year)[lastDayOfCurrentWeek.month]) {
          this.nextWeek = this.calendarOfMonth[2].slice(0, 7)
        } else {
          this.nextWeek = this.calendarOfMonth[1].slice(sliceStart + 7, sliceEnd + 7)
          if (this.nextWeek[this.selectedDayIndex].month === checkedDate.month) {
            this.isNextWeekInCurrentMonth = true
          }
        }
      }
      this.calendarOfMonthShow[0].splice(sliceStart, 7, ...this.lastWeek)
      this.calendarOfMonthShow[2].splice(sliceStart, 7, ...this.nextWeek)
    },
    // 显示上一周
    getLastWeek() {
      let checkedDate = this.lastWeek[this.selectedDayIndex]
      this.showWeek(checkedDate)

      if (this.formatDisabledDate(checkedDate)) return

      if (!this.scrollChangeDate && this.currentChangeIsScroll) {
        this.currentChangeIsScroll = false
        return
      }

      this.checkedDate = checkedDate
    },
    // 显示下一周
    getNextWeek() {
      let checkedDate = this.nextWeek[this.selectedDayIndex]
      this.showWeek(checkedDate)

      if (this.formatDisabledDate(checkedDate)) return

      if (!this.scrollChangeDate && this.currentChangeIsScroll) {
        this.currentChangeIsScroll = false
        return
      }

      this.checkedDate = checkedDate
    },
    // 获取上个月日历
    getLastMonth() {
      this.translateIndex += 1

      if (!this.isLastWeekInCurrentMonth) {
        this.yearOfCurrentShow = this.lastMonthYear
        this.monthOfCurrentShow = this.lastMonth
      }
      this.calculateCalendarOfThreeMonth(this.yearOfCurrentShow, this.monthOfCurrentShow)
    },
    // 获取下个月日历
    getNextMonth() {
      this.translateIndex -= 1

      if (!this.isNextWeekInCurrentMonth) {
        this.yearOfCurrentShow = this.nextMonthYear
        this.monthOfCurrentShow = this.nextMonth
      }
      this.calculateCalendarOfThreeMonth(this.yearOfCurrentShow, this.monthOfCurrentShow)
    },
    // 当前日期是否需要标记
    markDateColor(date, type) {
      let dateString = `${date.year}/${this.fillNumber(date.month + 1)}/${this.fillNumber(date.day)}`
      let markDateTypeString = this.markDateTypeObj[dateString] || ''

      if (markDateTypeString.indexOf(type) === -1) return

      return this.markDateColorObj[dateString]
    },
    formatDisabledDate(date) {
      if (!date.day) return

      let fDate = new Date(`${date.year}/${date.month + 1}/${date.day}`)

      return this.disabledDate(fDate) || !this.isDateInRange(fDate)
    },
    // 当前日期是否在两个日期范围之间
    isDateInRange(curr, min = this.minDate, max = this.maxDate) {
      let minDate = min && min.getTime() - 24 * 60 * 60 * 1000
      let maxDate = max && max.getTime()
      let currentDate = curr && curr.getTime()

      if (minDate && maxDate) return currentDate > minDate && currentDate < maxDate
      if (minDate) return currentDate > minDate
      if (maxDate) return currentDate < maxDate

      return true
    },
    // 禁止继续往横向的当前方向滑动 （当设置 minDate 或 maxDate 时生效）
    isDisabledHorizontalScroll(direc) {
      let minDate = this.minDate && this.minDate.getTime() - 24 * 60 * 60 * 1000
      let maxDate = this.maxDate && this.maxDate.getTime()

      if (this.isShowWeek) {
        let lastWeekLastedDay = new Date(`${this.lastWeek[6].year}/${this.lastWeek[6].month + 1}/${this.lastWeek[6].day}`).getTime()
        let nextWeekFirstDay = new Date(`${this.nextWeek[0].year}/${this.nextWeek[0].month + 1}/${this.nextWeek[0].day}`).getTime()
        if (direc === 'left' && maxDate) return nextWeekFirstDay >= maxDate
        if (direc === 'right' && minDate) return lastWeekLastedDay <= minDate
      } else {
        let lastMonthLastedDay = new Date(`${this.lastMonthYear}/${this.lastMonth + 1}/${this.daysOfMonth(this.lastMonthYear)[this.lastMonth]}`).getTime()
        let nextMonthFirstDay = new Date(`${this.nextMonthYear}/${this.nextMonth + 1}/1`).getTime()
        if (direc === 'left' && maxDate) return nextMonthFirstDay >= maxDate
        if (direc === 'right' && minDate) return lastMonthLastedDay <= minDate
      }

      return false
    },
    // 小于10，在前面补0
    fillNumber(val) {
      return val > 9 ? val : '0' + val
    },
    // 日期格式转换
    dateFormat(dateArr) {
      dateArr.forEach((date, index) => {
        dateArr[index] = formatDate(date, 'YY/MM/DD')
      })

      return dateArr
    },
    // 是否可以滑动
    isCanScroll(dire) {
      const scrollObj = {
        up: [true, 'up', 'vertical'],
        down: [true, 'down', 'vertical'],
        left: [true, 'left', 'horizontal'],
        right: [true, 'right', 'horizontal']
      }

      let checkedScrollArr = scrollObj[dire]
      return !checkedScrollArr.some(item => item === this.disabledScroll)
    },
    // 设置禁止滑动的方向
    setDisabledScrollDirection() {
      this.touch.x < 0 && !this.isCanScroll('left') && (this.touch.x = 0)
      this.touch.x > 0 && !this.isCanScroll('right') && (this.touch.x = 0)
      this.touch.y < 0 && !this.isCanScroll('up') && (this.touch.y = 0)
      this.touch.y > 0 && !this.isCanScroll('down') && (this.touch.y = 0)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

.calendar_body {
  position: relative;
  width: 100%;
  margin-top: px2vw(100px);
}
.calendar_week {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  flexAlign();
  background: white;
  color: vice-font-color;
  z-index: 2;
}
.calendar_group {
  position: absolute;
  top: px2vw(70px);
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  transition: height 0.3s;
  -webkit-transition: height 0.3s;
}
.calendar_group ul {
  height: 100%;
}
.calendar_group_li {
  position: absolute;
  top: 0;
  left: px2vw(4px);
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  flexAlign();
  flex-wrap: wrap;
  background: white;
  will-change: transform;
}
.calendar_item {
  width: 14.13333335%;
  flexContent();
  flex-direction: column;
}
.calendar_item_disable {
  background-color: disabled-bg-color;
  opacity: 1;
  cursor: not-allowed;
  color: disabled-font-color;
}
.calendar_day {
  width: px2vw(60px);
  height: px2vw(60px);
  border-radius: 50%;
  fontSize(28px);
  flexContent();
  margin-bottom: px2vw(8px);
}
.calendar_first_today {
  color: main-color;
}
.calendar_first_today span {
  fontSize(20px);
  margin-top: px2vw(3px);
}
.calendar_day_today {
  background: bg-color;
}
.calendar_mark_circle {
  border: 1px solid main-color;
}
.calendar_day_not {
  color: disabled-font-color;
}
.calendar_day_checked {
  background: main-color;
  color: white;
}
.calendar_dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
</style>
