/**
* @Description:    vue-hash-calendar 移动端日期、时间选择插件，日期选择面板以日历形式展示。支持上下滑动切换日期、时间
* @Author:         TSY
* @CreateDate:     2019/05/23 00:08
* @Email:          t@tsy6.com
*/
<template>
    <div class="body">
        <vue-hash-calendar
                ref="picker"
                model="dialog"
                :default-datetime="defaultDatetime"
                :is-show-week-view="false"
                :mark-date="markDate"
                format="YY/MM/DD hh:mm"
                week-start="sunday"
                picker-type="datetime"
                :show-today-button="true"
                @confirm="dateConfirm">
        </vue-hash-calendar>
        <!--github入口-->
        <github></github>
    </div>
</template>

<script>
    import Github from "./Github.vue";

    export default {
        name: "demo",
        components: { Github },
        data() {
            return {
                isShowTips: false,//是否显示下载提示
                defaultDatetime: new Date(),
                markDate: ['2019/09/26', '2019/09/19', '2019/09/09', '2019/09/16', '2019/09/12']
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
