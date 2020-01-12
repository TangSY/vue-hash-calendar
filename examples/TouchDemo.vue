/**
* @Description:    滑动事件监听demo
* @Author:         TSY
* @Email:          t@tsy6.com
* @CreateDate:     2019/11/30 13:29
*/
<template>
    <div class="body">
        <vue-hash-calendar
                @touchstart="touchStart"
                @touchmove="touchMove"
                @slidechange="slideChange"
                @touchend="touchEnd">
        </vue-hash-calendar>
        <!--github入口-->
        <github></github>
    </div>
</template>

<script>
import Github from './Github.vue'

export default {
  name: 'TouchDemo',
  components: { Github },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    touchStart(event) { // 监听手指开始滑动事件
      console.log(event, 'start')
    },
    touchMove(event) { // 监听手指开始滑动事件
      console.log(event, 'move')
    },
    touchEnd(event) { // 监听手指开始滑动事件
      console.log(event, 'end')
    },
    slideChange(direction) { // 滑动方向改变
      console.log(direction, 'direction')
    }
  }
}
</script>

<style lang="stylus">
    @import "./style/reset.styl"

</style>
