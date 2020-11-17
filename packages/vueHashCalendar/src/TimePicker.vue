/**
* @Description:    时间选择组件
* @Author:         TSY
* @Email:          t@tsy6.com
* @CreateDate:     2019/5/26 22:53
*/
<template>
  <div class="time_body"
       v-show="show">
    <div class="time_group">
      <div class="time_content"
           :id="hashID[index]"
           v-for="(item, index) in timeArray"
           :key="index"
           @touchstart="timeTouchStart"
           @touchmove="timeTouchMove($event, index)"
           @touchend="timeTouchEnd($event, index)">
        <div class="time_item"
             :class="[{'time_item_show': isBeSelectedTime(time, index)}, hashClass, {'time-disabled': formatDisabledDate(time, index)}]"
             v-for="(time, j) in item"
             :key="index + j">{{ time | fillNumber }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPlatform } from '../utils/util'
export default {
  name: 'TimePicker',
  props: {
    defaultTime: null,
    show: false,
    minuteStep: {
      type: Number,
      default: 1
    },
    selectableRange: {
      type: String | Array,
      default: ''
    },
    // 日历选中的时间 {year, month, day}
    calendarDate: null,
    // 禁用的日期
    disabledTime: {
      type: Function,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      hashID: [], // 用于生成随机ID
      hashClass: '', // 用于生成随机class
      timeRange: [], // 时间范围
      timeOptions: {
        minHours: 24,
        minMinutes: 59,
        maxHours: 0,
        maxMinutes: 0
      },
      checkedDate: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes()
      }, // 被选中的日期
      timeHeight: 0, // 单个时间项的高度
      timeArray: [], // 时间选择器数据
      timeStartY: 0, // touchstart,Y轴坐标
      timeStartUp: 0// 滑动开始前，时间控件dom与顶部的偏移量
    }
  },
  created() {
    this.hashID = [`time${parseInt(Math.random() * 1000000)}`, `time${parseInt(Math.random() * 1000000)}`]
    this.hashClass = `time_item_${parseInt(Math.random() * 1000000)}`
  },
  computed: {},
  watch: {
    defaultTime: {
      handler(val) {
        if (!(val instanceof Date)) {
          throw new Error('The calendar component\'s defaultTime must be date type!')
        }
        this.$set(this.checkedDate, 'hours', val.getHours())
        this.$set(this.checkedDate, 'minutes', val.getMinutes())
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
          this.initTimeArray()
        }
      },
      immediate: true
    },
    minuteStep: {
      handler(val) {
        if (val <= 0 || val >= 60) {
          throw new Error(`The minutes-step can't be: ${val}!`)
        }
        if (60 % val !== 0) {
          throw new Error('The minutes-step must be divided by 60!')
        }
      },
      immediate: true
    },
    selectableRange: {
      handler(val) {
        if (!val) return
        this.timeRange = []
        let formatPass = false
        if (typeof val === 'string') {
          formatPass = this.checkTimeRange(val)
        } else if (val instanceof Array) {
          formatPass = val.every(item => this.checkTimeRange(item))
        }
        if (!formatPass) throw new Error('The format of selectableRange is error!')
      },
      immediate: true
    }
  },
  filters: {
    // 小于10，在前面补0
    fillNumber(val) {
      return val > 9 ? val : '0' + val
    }
  },
  methods: {
    // 初始化时间选择器数据
    initTimeArray() {
      let hours = []
      this.timeArray = []
      for (let i = 0; i < 24; i++) {
        hours.push(i)
      }
      let minutes = []
      for (let i = 0; i < 60; i++) {
        if (i % this.minuteStep === 0) {
          minutes.push(i)
        }
      }
      this.timeArray.push(hours, minutes)

      this.$nextTick(() => {
        let checkHours = this.checkedDate.hours
        let checkMinutes = this.checkedDate.minutes

        this.timeHeight = getComputedStyle(document.querySelector(`.${this.hashClass}`)).height || ''
        this.timeHeight = parseFloat(this.timeHeight.split('px')[0])

        let hoursUp = (2 - parseFloat(checkHours)) * this.timeHeight
        let minutesUp = (2 - parseFloat(checkMinutes) / this.minuteStep) * this.timeHeight
        document.querySelector(`#${this.hashID[0]}`).style.webkitTransform = 'translate3d(0px,' + hoursUp + 'px,0px)'
        document.querySelector(`#${this.hashID[1]}`).style.webkitTransform = 'translate3d(0px,' + minutesUp + 'px,0px)'
      })
    },
    formatDisabledDate(time, index) {
      let hours = index === 0 ? time : this.checkedDate.hours
      let minutes = index === 1 ? time : this.checkedDate.minutes
      let dateStr = `${this.calendarDate.year}/${this.calendarDate.month + 1}/${this.calendarDate.day} ${hours}:${minutes}`
      let fDate = new Date(dateStr)

      return this.disabledTime(fDate)
    },
    timeTouchStart(e) {
      e.preventDefault()
      this.timeStartY = e.changedTouches[0].pageY
      let transform = e.currentTarget.style.webkitTransform
      if (transform) {
        this.timeStartUp = parseFloat(transform.split(' ')[1].split('px')[0])
      }
    },
    timeTouchMove(e, index) {
      let moveEndY = e.changedTouches[0].pageY
      let Y = moveEndY - this.timeStartY

      e.currentTarget.style.webkitTransform = 'translate3d(0px,' + (Y + this.timeStartUp) + 'px,0px)'

      if (checkPlatform() === '2') {
        this.timeTouchEnd(e, index)
        return false
      }
    },
    timeTouchEnd(e, index) {
      let transform = e.currentTarget.style.webkitTransform
      let endUp = this.timeStartUp
      if (transform) {
        endUp = parseFloat(e.currentTarget.style.webkitTransform.split(' ')[1].split('px')[0])
      }

      let distance = Math.abs(endUp - this.timeStartUp)
      let upCount = Math.floor(distance / this.timeHeight) || 1
      let halfWinWith = this.timeHeight / 2
      let up = this.timeStartUp

      if (endUp <= this.timeStartUp) {
        // 向上滑动 未过临界值
        if (distance <= halfWinWith) {
          up = this.timeStartUp
        } else {
          up = this.timeStartUp - this.timeHeight * upCount
          if (up < -(this.timeArray[index].length - 3) * this.timeHeight) {
            up = -(this.timeArray[index].length - 3) * this.timeHeight
          }
        }
      } else {
        // 向下滑动 未过临界值
        if (distance <= halfWinWith) {
          up = this.timeStartUp
        } else {
          up = this.timeStartUp + this.timeHeight * upCount
          if (up > this.timeHeight * 2) {
            up = this.timeHeight * 2
          }
        }
      }
      if (index === 0) {
        let hour = 2 - Math.round(parseFloat(up) / parseFloat(this.timeHeight))

        if (this.formatDisabledDate(hour, index)) {
          up = this.timeStartUp
        } else {
          this.$set(this.checkedDate, 'hours', hour)
        }
      } else {
        let minute = 2 - Math.round(parseFloat(up) / parseFloat(this.timeHeight))

        if (this.formatDisabledDate(minute, index)) {
          up = this.timeStartUp
        } else {
          this.$set(this.checkedDate, 'minutes', minute * this.minuteStep)
        }
      }
      e.currentTarget.style.webkitTransition = 'transform 300ms'
      e.currentTarget.style.webkitTransform = 'translate3d(0px,' + up + 'px,0px)'
    },
    isBeSelectedTime(time, index) { // 是否为当前选中的时间
      return (index === 0 && time === this.checkedDate.hours) || (index === 1 && time === this.checkedDate.minutes)
    },
    isDisableTime(time, index) { // 是否禁用当前时间
      for (let i in this.timeRange) {
        for (let j in this.timeRange[i]) {
          if (index === 0) {
            let currentHours = this.timeRange[i][j].split(':')[0]

            if (currentHours > time) {
              this.timeOptions.minHours = currentHours
              return true
            }
          }
        }
      }
      return false
    },
    // 校验时间范围
    checkTimeRange(timeRange) {
      if (!timeRange) return
      let timeArr = timeRange.split('-')
      if (timeArr.length === 0 || timeArr.length > 2) return false
      this.timeRange.push(timeRange)

      return timeArr.every(time => {
        let mhArr = time.split(':')
        if (mhArr.length === 0 || mhArr.length > 2) return false

        // 校验单个时间是否符合规范 00:00 - 24:00
        if (parseInt(mhArr[0]) < 0 || parseInt(mhArr[0]) > 24) return false
        if (parseInt(mhArr[1]) < 0 || parseInt(mhArr[1]) > 59) return false
        if (parseInt(mhArr[0]) === 24 && parseInt(mhArr[1]) > 0) return false
        return true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

.time_body {
  width: 100%;
  margin-top: px2vw(100px);
}
.time_group {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: px2vw(360px);
  margin-top: px2vw(100px);
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
}
.time_content {
  touch-action: none;
  padding: 0 px2vw(40px);
  -webkit-overflow-scrolling: touch;
}
.time_item {
  padding: px2vw(20px) 0;
  color: vice-font-color;
}
.time_item_show {
  color: main-font-color;
}
.time-disabled {
  background-color: #f5f7fa;
  opacity: 1;
  cursor: not-allowed;
  color: #c0c4cc;
}
</style>
