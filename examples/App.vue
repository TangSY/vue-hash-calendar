/**
* @Description:    vue-hash-calendar 移动端日期、时间选择插件，日期选择面板以日历形式展示。支持上下滑动切换日期、时间
* @Author:         TSY
* @CreateDate:     2019/05/23 00:08
* @Email:          t@tsy6.com
*/
<template>
    <div class="body">
        <button @click="showCalendarDialog">显示</button>
        <vue-hash-calendar
                ref="picker"
                model="dialog"
                :scroll-change-date="true"
                :visible.sync="isShowCalendar"
                :default-datetime="defaultDatetime"
                :is-show-week-view="false"
                :mark-date="markDate"
                format="YY/MM/DD hh:mm"
                week-start="sunday"
                picker-type="datetime"
                :show-today-button="true"
                @confirm="dateConfirm"
                @click="dateClick"
                @change="dateChange">
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
                isShowCalendar: true,//是否显示弹窗
                isShowTips: false,//是否显示下载提示
                defaultDatetime: new Date(),
                markDate: [
                    '2019/11/24','2019/11/22',
                    {color: 'red',date: ['0', '2019/02/25', '2019/03/25', '2019/04/25', '2019/05/25', '2019/06/25', '2019/07/25', '2019/08/25', '2019/09/25', '2019/10/25', '2019/11/25', '2019/12/25']},
                    {color: 'blue',date: ['2019/01/20', '2019/02/20', '2019/03/20', '2019/04/20', '2019/05/20', '2019/06/20', '2019/07/20', '2019/08/20', '2019/09/20', '2019/10/20', '2019/11/20', '2019/12/20']},
                    {color: 'pink',date: ['2019/01/12', '2019/02/12', '2019/03/12', '2019/04/12', '2019/05/12', '2019/06/12', '2019/07/12', '2019/08/12', '2019/09/12', '2019/10/12', '2019/11/12', '2019/12/12']},
                    {color: '#000000',date: ['2019/01/29', '2019/02/29', '2019/03/29', '2019/04/29', '2019/05/29', '2019/06/29', '2019/07/29', '2019/08/29', '2019/09/29', '2019/10/29', '2019/11/29', '2019/12/29']}
                ], //对象数组形式的标记日期，可以自定义标记颜色
            }
        },
        mounted() {
//            this.defaultDatetime = new Date('2018-01-01 12:04');
        },
        methods: {
            showCalendarDialog() {// 显示日历
                this.isShowCalendar = true;
            },
            dateChange(date) {// 日期改变触发
                console.log(date,'change');
            },
            dateConfirm(date) {// 点击确认按钮触发
                console.log(date,'confirm');
            },
            dateClick(date) {// 点击日期时按钮触发
                console.log(date,'click');
            }
        }
    }
</script>

<style lang="stylus">
    @import "./style/reset.styl"


</style>
