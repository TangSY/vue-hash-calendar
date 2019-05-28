/**
* @Description:    日期、时间选择器
* @Author:         TSY
* @CreateDate:     2019/5/17 16:22
* @Email:          t@tsy6.com
*/
<template>
    <div class="calendar" v-show="isShowDatetimePicker" @click="close">
        <div class="calendar_content" @click.stop>
            <div class="calendar_title">
                <div class="calendar_title_date">
                    <span class="calendar_title_date_year" :class="{'calendar_title_date_active': isShowCalendar}"
                          @click="showCalendar">{{ `${checkedDate.year}年${checkedDate.month + 1}月${checkedDate.day}日`}}</span>
                    <span class="calendar_title_date_time" :class="{'calendar_title_date_active': !isShowCalendar}"
                          @click="showTime">{{ `${fillNumber(checkedDate.hours)}:${fillNumber(checkedDate.minutes)}`
                        }}</span>
                </div>
                <div class="calendar_confirm" @click="confirm">确定</div>
            </div>
            <calendar :show="isShowCalendar" :default-date="defaultDatetime" @confirm="dateConfirm"></calendar>
            <time-picker :show="!isShowCalendar" :default-time="defaultDatetime" @confirm="timeConfirm"></time-picker>
        </div>
    </div>
</template>

<script>
    import Calendar from "./Calendar.vue";
    import TimePicker from "./TimePicker.vue";

    export default {
        components: {
            TimePicker,
            Calendar
        },
        name: "DatetimePicker",
        data() {
            return {
                checkedDate: {
                    hours: new Date().getHours(),
                    minutes: new Date().getMinutes()
                },//被选中的日期
                defaultDatetime: new Date(),
                timeDate: {},//时间组件中选中的日期
                isShowDatetimePicker: false,//是否显示日期控件
                isShowCalendar: true,//是否显示日历选择控件
            }
        },
        mounted() {
            this.defaultDatetime = new Date('2018-01-01 12:03');
            this.checkedDate.year = this.defaultDatetime.getFullYear();
            this.checkedDate.month = this.defaultDatetime.getMonth();
            this.checkedDate.day = this.defaultDatetime.getDate();
            this.checkedDate.hours = this.defaultDatetime.getHours();
            this.checkedDate.minutes = this.defaultDatetime.getMinutes();
        },
        watch: {
            timeDate: {
                handler(time) {
                    this.checkedDate.hours = time.hours;
                    this.checkedDate.minutes = time.minutes;
                },
                deep: true
            }
        },
        updated() {
            console.log(this.checkedDate.day, 'update')
        },
        methods: {
            dateConfirm(date) {
//                console.log(date,'date')
                date.hours = this.checkedDate.hours;
                date.minutes = this.checkedDate.minutes;
                this.checkedDate = date;
//                this.$set(this.checkedDate, 'year', date.year)
//                this.$set(this.checkedDate, 'month', date.month)
//                this.$set(this.checkedDate, 'day', date.day)
//                console.log(this.checkedDate.day)
            },
            timeConfirm(date) {
//                console.log(date,'date')
                date.year = this.checkedDate.year;
                date.month = this.checkedDate.month;
                date.day = this.checkedDate.day;
                this.checkedDate = date;
//                this.$set(this.checkedDate, 'hours', date.hours)
//                this.$set(this.checkedDate, 'minutes', date.minutes)
//                this.$set(this.checkedDate, 'day', date.day)
//                console.log(this.checkedDate.day)
            },
            confirm() {//确认选择时间
                this.$emit('confirm', new Date(`${this.checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day} `));
                this.close();
            },
            show() {
                this.isShowDatetimePicker = true;

            },
            close() {
                this.isShowDatetimePicker = false;
            },
            fillNumber(val) {//小于10，在前面补0
                return val > 9 ? val : '0' + val
            },
            showCalendar() {//显示日历控件
                this.isShowCalendar = true;
            },
            showTime() {//显示时间选择控件
                this.isShowCalendar = false;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../style/common.styl"

    .calendar {
        position fixed
        width 100vw
        height 100vh
        top 0
        left 0
        background rgba(0, 0, 0, .6)
        z-index 999
    }

    .calendar_content {
        position absolute
        width 100%
        left 0
        bottom 0
        flexAlign()
        padding-bottom px2vw(26px)
        flex-wrap wrap
        background white
        height px2vw(650px)
        overflow hidden
    }

    .calendar_title {
        position absolute
        width 100%
        left 0
        top 0
        background bg-color
        borderBottom()
        display flex
        align-items center
        justify-content space-between
        z-index 1
    }

    .calendar_title_date {
        color vice-font-color
        background white
        paddingAround()
    }

    .calendar_title_date_active {
        color main-font-color
        font-weight bold
    }

    .calendar_title_date_time {
        margin-left px2vw(20px)
    }

    .calendar_confirm {
        color main-color
        margin-right px2vw(34px)
    }
</style>