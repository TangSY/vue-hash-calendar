/**
* @Description:    日历滑动容器
* @Author:         TSY
* @Email:          t@tsy6.com
* @CreateDate:     2021/6/27 16:53
*/
<template>
    <ul class="calendar_group_ul"
        ref="container"
        :style="{'transform': `translate3d(${-translateIndex*100}%, 0, 0)`}"
        @touchstart="touchStart"
        @touchmove.stop.prevent="touchMove"
        @touchend="touchEnd">
        <li class="calendar_group_li"
            v-for="(item, i) in calendarData"
            :key="i"
            :style="{transform: `translate3d(${(i-1+translateIndex + (isTouching ? touch.x : 0))*100}%, ${calendarY}px, 0)`,transitionDuration: `${isTouching ? 0 : transitionDuration}s`,}">
            <slot :currArr="item"></slot>
        </li>
    </ul>
</template>

<script>
export default {
  props: {
    // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
    disabledScroll: {
      type: [Boolean, String],
      default: false
    },
    // 日历数据
    calendarData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      translateIndex: 0, // 用于计算上下偏移的距离
      transitionDuration: 0.3, // 动画持续时间
      touch: {
        x: 0,
        y: 0
      }, // 本次touch事件，横向，纵向滑动的距离
      isTouching: false, // 是否正在滑动
      touchStartPositionX: null, // 开始滑动x轴的值
      touchStartPositionY: null, // 开始滑动时y轴的值
      calendarY: 0 // 日历相对于Y轴的位置
    }
  },
  methods: {
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
        // if (this.isDisabledHorizontalScroll(moveX < 0 ? 'left' : 'right')) return

        this.touch = {
          x: moveX / this.$refs.container.offsetWidth,
          y: 0
        }
      } else {
        this.touch = {
          x: 0,
          y: moveY / this.$refs.container.offsetHeight
        }
      }

      this.setDisabledScrollDirection()
    },
    // 监听touch结束事件
    touchEnd(e) {
      this.$emit('touchend', e)

      this.isTouching = false
      if (Math.abs(this.touch.x) > Math.abs(this.touch.y) && Math.abs(this.touch.x) > 0.2) {
        // this.currentChangeIsScroll = true
        if (this.touch.x > 0) {
          this.$emit('slidechange', 'right')

          this.translateIndex += 1
          // this.getLastMonth()
          // if (this.isShowWeek) {
          //     setTimeout(() => {
          //     this.isTouching = true
          //     this.currentChangeIsScroll = true
          //     this.getLastWeek()
          //     }, this.transitionDuration * 1000)
          // }
        } else if (this.touch.x < 0) {
          this.$emit('slidechange', 'left')

          this.translateIndex -= 1
          // this.getNextMonth()
          // if (this.isShowWeek) {
          //     setTimeout(() => {
          //     this.isTouching = true
          // this.currentChangeIsScroll = true
          //     this.getNextWeek()
          //     }, this.transitionDuration * 1000)
          // }
        }
      }
      if (Math.abs(this.touch.y) > Math.abs(this.touch.x) && Math.abs(this.touch.y * this.$refs.container.offsetHeight) > 50) {
        if (this.touch.y > 0 && this.isShowWeek) {
          this.$emit('slidechange', 'down')

          // this.showMonth()
        } else if (this.touch.y < 0 && !this.isShowWeek) {
          this.$emit('slidechange', 'up')

          // this.showWeek()
        }
      } else {
        this.touch = {
          x: 0,
          y: 0
        }
      }
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

.calendar_group_ul {
  height: 100%;
  width 100%
  background white
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
</style>