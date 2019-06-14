/**
* @Description:    vue-hash-calendar 移动端日期、时间选择插件，日期选择面板以日历形式展示。支持上下滑动切换日期、时间
* @Author:         TSY
* @CreateDate:     2019/05/23 00:08
* @Email:          t@tsy6.com
*/
<template>
    <div class="body">
        <datetime-picker
                ref="picker"
                model="dialog"
                :default-datetime="defaultDatetime"
                format="YY/MM/DD hh:mm"
                week-start="sunday"
                @confirm="dateConfirm">
        </datetime-picker>
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
                defaultDatetime: new Date('2018-01-01 12:04')
            }
        },
        mounted() {
//            this.defaultDatetime = new Date('2018-01-01 12:04');
            this.$refs.picker.show();
        },
        methods: {
            dateConfirm(date) {
                console.log(date,'confirm')
            }
        }
    }
</script>

<style lang="stylus">
    @import "./style/reset.styl"


</style>
