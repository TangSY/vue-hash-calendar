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
      monthArr: [],
      yearArr: [],
      yearRange: 10,
      currArr: [],
      selectType: ['single', 'mutiple', 'range'],
      calendarType: ['week', 'date', 'month', 'year', 'yearRange', 'datetime'],
    }
  },
  mounted() {
    this.initYearMonth()
  },
  methods: {
    initYearMonth() {

    }
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