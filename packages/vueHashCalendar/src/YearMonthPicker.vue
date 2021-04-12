<template>
  <div class="year_body"
       :style="{'top': calendarTitleHeight + 'px'}"
       v-show="type">
    年选择面板:{{type}}
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
  },
  data() {
    return {
      monthArr: [
        { label: '一月', value: 0 }, { label: '二月', value: 1 }, { label: '三月', value: 2 },
        { label: '四月', value: 3 }, { label: '五月', value: 4 }, { label: '六月', value: 5 },
        { label: '七月', value: 6 }, { label: '八月', value: 7 }, { label: '九月', value: 8 },
        { label: '十月', value: 9 }, { label: '十一月', value: 10 }, { label: '十二月', value: 11 }
      ],
      yearArr: [],
      currArr: []
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.year_body {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background: #fff;
}
</style>