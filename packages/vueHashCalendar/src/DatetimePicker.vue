/**
* @Description:    日期、时间选择器
* @Author:         TSY
* @CreateDate:     2019/5/17 16:22
* @Email:          t@tsy6.com
*/
<template>
    <div class="calendar" :class="{'calendar_inline': model === 'inline'}" v-show="isShowDatetimePicker"
         :style="{'height': `${model === 'inline' ? calendarContentHeight : undefined}px`}" @click="close">
        <div class="calendar_content" :style="{'height': `${calendarContentHeight}px`}" @click.stop>
            <div class="calendar_title" ref="calendarTitle">
                <div class="calendar_title_date">
                    <span v-if="pickerType !== 'time'" class="calendar_title_date_year"
                          :class="{'calendar_title_date_active': isShowCalendar}"
                          @click="showCalendar">{{ `${checkedDate.year}年${checkedDate.month + 1}月${checkedDate.day}日`}}</span>
                    <span v-if="pickerType !== 'date'" class="calendar_title_date_time"
                          :class="{'calendar_title_date_active': !isShowCalendar}"
                          @click="showTime">{{ `${fillNumber(checkedDate.hours)}:${fillNumber(checkedDate.minutes)}`}}</span>
                </div>
                <div v-if="showTodayButton" class="calendar_confirm" @click="today">今天</div>
                <div class="calendar_confirm" v-if="model === 'dialog'" @click="confirm">确定</div>
            </div>
            <calendar ref="calendar" v-if="pickerType !== 'time'" :show="isShowCalendar" :default-date="defaultDatetime"
                      :week-start="weekStart" :scroll-change-date="scrollChangeDate"
                      :is-show-week-view="isShowWeekView" :mark-date="markDate" @height="heightChange"
                      @change="dateChange" @click="dateClick"></calendar>
            <time-picker v-if="pickerType !== 'date'" :show="!isShowCalendar" :default-time="defaultDatetime"
                         @change="timeChange"></time-picker>
        </div>
    </div>
</template>

<script>
    import Calendar from "./Calendar.vue";
    import TimePicker from "./TimePicker.vue";
    import {formatDate} from "../utils/util"

    export default {
        props: {
            visible: {//是否显示日历组件
                type: Boolean,
                default: false
            },
            scrollChangeDate: {// 滑动的时候，是否触发改变日期
                type: Boolean,
                default: true
            },
            pickerType: {//选择器类型 datetime：日期+时间   date：日期   time：时间
                type: String,
                default: 'datetime'
            },
            showTodayButton: {//是否显示返回今日按钮
                type: Boolean,
                default: true
            },
            defaultDatetime: {//默认时间
                type: Date,
                default() {
                    return new Date()
                }
            },
            format: null,//确认选择之后，返回的日期格式
            weekStart: {//设置每周以星期几开始
                type: String,
                default: 'Sunday'
            },
            model: {
                type: String,
                default: 'inline'
            },
            //是否展示周视图
            isShowWeekView: {
                type: Boolean,
                default: false
            },
            //日期下面的标记
            markDate: {
                type: Array,
                default: () => []
            }
        },
        components: {
            TimePicker,
            Calendar
        },
        name: "VueHashCalendar",
        data() {
            return {
                checkedDate: {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth(),
                    day: new Date().getDate(),
                    hours: new Date().getHours(),
                    minutes: new Date().getMinutes()
                },//被选中的日期
                isShowCalendar: false,//是否显示日历选择控件
                calendarContentHeight: 0,//日历组件高度
                calendarTitleHeight: 0,//日历组件标题高度
                firstTimes: true,//第一次触发
            }
        },
        mounted() {
            if (this.model === 'inline') {
                this.isShowDatetimePicker = true;
            }
        },
        watch: {
            defaultDatetime(val) {
                if (!(val instanceof Date)) {
                    throw new Error(`The calendar component's defaultDate must be date type!`);
                    return
                }
            },
            markDate: {
                handler(val) {
                    val.forEach((item, index) => {
                        if (item.color === undefined) {
                            let obj = {};
                            obj.color = '#1c71fb';
                            if (typeof item === 'string' || typeof item === 'number') {
                                item = [item];
                            }
                            obj.date = item || [];
                            val[index] = obj;
                        }

                        val[index].date = this.dateFormat(val[index].date);
                    })

                },
                deep: true,
                immediate: true
            },
            pickerType: {
                handler(val) {
                    if (val === 'time') {
                        this.showTime();
                    }
                },
                immediate: true
            },
            checkedDate: {
                handler() {
                    let date = new Date(`${this.checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day} ${this.checkedDate.hours}:${this.checkedDate.minutes}`);
                    if (this.format) {
                        date = formatDate(date, this.format);
                    }
                    this.$emit('change', date);
                },
                deep: true
            },
            visible: {
                handler(val) {
                    this.isShowCalendar = val;

                    this.$nextTick(() => {
                        this.calendarTitleHeight = this.$refs.calendarTitle.offsetHeight;
                    })
                },
                immediate: true
            }
        },
        computed: {
            isShowDatetimePicker: {//是否显示日期控件
                get() {
                    return this.visible;
                },
                set(val) {
                    this.$emit('update:visible', val);
                }
            }
        },
        methods: {
            today() {
                this.$refs.calendar.today();
            },
            dateChange(date) {
                date.hours = this.checkedDate.hours;
                date.minutes = this.checkedDate.minutes;
                this.checkedDate = date;
            },
            dateClick(date) {
                date.hours = this.checkedDate.hours;
                date.minutes = this.checkedDate.minutes;
                this.checkedDate = date;

                let fDate = new Date(`${this.checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day} ${this.checkedDate.hours}:${this.checkedDate.minutes}`);
                if (this.format) {
                    fDate = formatDate(fDate, this.format);
                }
                this.$emit('click', fDate)
            },
            timeChange(date) {
                date.year = this.checkedDate.year;
                date.month = this.checkedDate.month;
                date.day = this.checkedDate.day;
                this.checkedDate = date;
            },
            confirm() {//确认选择时间
                let date = new Date(`${this.checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day} ${this.checkedDate.hours}:${this.checkedDate.minutes}`);
                if (this.format) {
                    date = formatDate(date, this.format);
                }
                this.$emit('confirm', date);
                if (this.model === 'dialog') {
                    this.close();
                }
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
            },
            heightChange(height) {//高度变化
                if (!this.firstTimes && this.model === 'dialog') return;

                this.calendarContentHeight = height + this.calendarTitleHeight;
                this.firstTimes = false;
            },
            dateFormat(dateArr) {// 日期格式转换
                dateArr.forEach((date, index) => {
                    dateArr[index] = formatDate(date, 'YY/MM/DD')
                });

                return dateArr
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

    .calendar_inline {
        position relative
        width 100%
        height auto
        background none
        height px2vw(710px)
        z-index 1
    }

    .calendar_content {
        position absolute
        width 100%
        left 0
        bottom 0
        display flex
        padding-bottom px2vw(26px)
        flex-wrap wrap
        background white
        height px2vw(710px)
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