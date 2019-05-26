/**
* @Description:    vue-hash-calendar 移动端日期、时间选择插件，日期选择面板以日历形式展示。支持上下滑动切换日期、时间
* @Author:         TSY
* @CreateDate:     2019/05/23 00:08
* @email:          t@tsy6.com
*/
<template>
    <div class="body">
        <datetime-picker ref="picker"></datetime-picker>
    </div>
</template>

<script>

    import DatetimePicker from "./components/DatetimePicker.vue";

    export default {
        name: "demo",
        components: {DatetimePicker},
        data() {
            return {
                isShowTips: false,//是否显示下载提示
            }
        },
        mounted() {
            this.$refs.picker.show();
        },
        methods: {

        }
    }
</script>

<style lang="stylus">
    @import "./style/reset.styl"


</style>
