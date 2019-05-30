/**
* @Description:    日历组件
* @Author:         TSY 
* @Email:          t@tsy6.com
* @CreateDate:     2019/5/26 22:53
*/
<template>
    <div class="calendar_body" v-show="show">
        <div class="calendar_week">
            <div class="calendar_item" v-for="item in calendarWeek" :key="item">
                <p class="calendar_day">{{ item }}</p>
            </div>
        </div>
        <div class="calendar_group" :style="{'height': calendarGroupHeight}">
            <ul :style="{'webkitTransform': calendarGroupTransform}" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" @touchend="touchEnd">
                <li class="calendar_group_li" v-for="(item, i) in calendarOfMonth" :key="i">
                    <div class="calendar_item" v-for="(date, j) in item" :key="i + j"
                         @click="clickCalendarDay(date)">
                        <p v-if="date.day === 1 && !isNotCurrentMonthDay(date,i)" class="calendar_day calendar_first_today" :class="{'calendar_day_checked': isCheckedDay(date)}">{{ date.month + 1 }}<span>月</span></p>
                        <p v-else class="calendar_day"
                           :class="{'calendar_day_today': isToday(date), 'calendar_day_checked': isCheckedDay(date), 'calendar_day_not': isNotCurrentMonthDay(date,i)}">
                            {{ date.day }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Calendar",
        props: {
            defaultDate: null,
            show: true
        },
        data() {
            return {
                yearOfCurrentShow: new Date().getFullYear(),//当前日历展示的年份
                monthOfCurrentShow: new Date().getMonth(),//当前日历展示的月份
                yearOfToday: new Date().getFullYear(),//今天所在的年份
                monthOfToday: new Date().getMonth(),//今天所在的月份
                dayOfToday: new Date().getDate(),//今天所在的日期
                calendarWeek: ['日', '一', '二', '三', '四', '五', '六'],//日历对应的星期
                calendarOfMonth: [],//月份对应的日历表
                calendarDaysTotalLength: 42,//日历表展示的总天数  6行7列
                calendarIndex: 0,//记录日历当前滑动到的index
                calendarMoveMaxIndex: 0,//记录日历向上滑动的最大index
                calendarMoveMinIndex: 0,//记录日历向下滑动的最大index
                lastMonthYear: null,//上个月的年份
                lastMonth: null,//上个月的月份
                nextMonthYear: null,//下个月的年份
                nextMonth: null,//下个月的月份
                checkedDate: {},//被选中的日期
                startY: 0,//touchstart,Y轴坐标
                startUp: 0,//滑动开始前，日历dom与顶部的偏移量
                endUp: 0,//滑动结束后，日历dom与顶部的偏移量
                calendarHeight: 0,//单个日历DOM高度
                calendarDom: null,//日历容器DOM
            }
        },
        mounted() {

        },
        watch: {
            defaultDate: {
                handler(val) {
                    if (!(val instanceof Date)) {
                        throw new Error(`The calendar component's defaultDate must be date type!`);
                        return
                    }
                    this.$set(this.checkedDate, 'day', val.getDate())
                    this.calculateCalendarOfThreeMonth(val.getFullYear(), val.getMonth());
                }
            },
            checkedDate: {
                handler(val) {
                    this.$emit('confirm', val);
                },
                deep: true
            },
            show: {
                handler(val) {
                    if (val) {
                        this.calculateCalendarOfThreeMonth(this.checkedDate.year, this.checkedDate.month);
                        this.initDom();
                    }
                },
                immediate: true
            }
        },
        computed: {
            calendarGroupTransform() {
                return `translate(0px,-${this.calendarHeight}px)`
            },
            calendarGroupHeight() {
                return `${this.calendarHeight}px`
            }
        },
        methods: {
            initDom() {//初始化日历dom
                this.$nextTick(() => {
                    this.calendarHeight = document.querySelector('.calendar_group_li').clientHeight;
                    this.calendarDom = document.querySelector('.calendar_group ul');
                })
            },
            today() {//今天
                this.calculateCalendarOfThreeMonth();
            },
            //计算当前展示月份的前后月份日历信息 flag  -1:获取上个月日历信息   0:当月信息或者跨月展示日历信息  1:获取下个月日历信息
            calculateCalendarOfThreeMonth(year = new Date().getFullYear(), month = new Date().getMonth(), flag = 0) {
                let day = this.checkedDate.day;
                if (day > 30 || (day > 28 && month === 1)) {
                    this.$set(this.checkedDate, 'day', this.daysOfMonth(year)[month])

                }
                this.$set(this.checkedDate, 'year', year)
                this.$set(this.checkedDate, 'month', month)

                this.lastMonthYear = month === 0 ? year - 1 : year;//上个月的年份
                this.lastMonth = month === 0 ? 11 : month - 1;//上个月的月份
                this.nextMonthYear = month === 11 ? year + 1 : year;//下个月的年份
                this.nextMonth = month === 11 ? 0 : month + 1;//下个月的月份

                let firstMonth = this.calculateCalendarOfMonth(this.lastMonthYear, this.lastMonth);
                let secondMonth = this.calculateCalendarOfMonth(year, month);
                let thirdMonth = this.calculateCalendarOfMonth(this.nextMonthYear, this.nextMonth);

                if (flag === -1) {
                    if (this.calendarOfMonth.length - this.calendarMoveMaxIndex + this.calendarMoveMinIndex === 3) return;
                    this.$nextTick(() => {
                        let up = this.startUp;
                        this.calendarDom.style.webkitTransition = 'transform 0ms';
                        this.calendarDom.style.webkitTransform = 'translate(0px,' + up + 'px)';
                        this.calendarOfMonth.unshift(firstMonth);
                    })
                } else if (flag === 1) {
                    if (this.calendarOfMonth.length - this.calendarMoveMaxIndex + this.calendarMoveMinIndex === 3) return;
                    this.calendarOfMonth.push(thirdMonth);
                } else {
                    this.calendarOfMonth = [];
                    this.calendarOfMonth.push(firstMonth, secondMonth, thirdMonth);
                }
            },
            calculateCalendarOfMonth(year = new Date().getFullYear(), month = new Date().getMonth()) {//计算每个月的日历
                let calendarOfCurrentMonth = [];

                let lastMonthYear = month === 0 ? year - 1 : year;//上个月的年份
                let lastMonth = month === 0 ? 11 : month - 1;//上个月的月份
                let nextMonthYear = month === 11 ? year + 1 : year;//下个月的年份
                let nextMonth = month === 11 ? 0 : month + 1;//下个月的月份

                //如果当月第一天不是星期天，则在前面补齐上个月的日期
                let dayOfWeek = this.getDayOfWeek(year, month);
                if (dayOfWeek > 0) {
                    let lastMonthDays = this.daysOfMonth(year)[lastMonth];//上个月的总天数
                    for (let i = 0; i < dayOfWeek; i++) {
                        calendarOfCurrentMonth.push({
                            year: lastMonthYear,
                            month: lastMonth,
                            day: lastMonthDays - (dayOfWeek - 1 - i)
                        });
                    }
                }

                //当月日期
                for (let i = 0; i < this.daysOfMonth(year)[month]; i++) {
                    calendarOfCurrentMonth.push({
                        year: year,
                        month: month,
                        day: i + 1
                    });
                }

                //在日历后面填充下个月的日期，补齐6行7列
                let fillDays = this.calendarDaysTotalLength - calendarOfCurrentMonth.length;
                for (let i = 0; i < fillDays; i++) {
                    calendarOfCurrentMonth.push({
                        year: nextMonthYear,
                        month: nextMonth,
                        day: i + 1
                    });
                }

                return calendarOfCurrentMonth;
            },
            daysOfMonth(year) {
                return [31, 28 + this.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            },
            isLeap(year) { //判断是否为闰年
                return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
            },
            getDayOfWeek(year = new Date().getFullYear(), month = new Date().getMonth(), day = 1) {//获取月份某一天是星期几
                let dayOfMonth = new Date(year, month, day);    //获取当月的第day天
                let dayOfWeek = dayOfMonth.getDay();   //判断第day天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一)
                return dayOfWeek;
            },
            clickCalendarDay(date) {//点击日历上的日期
                if (!date) return;

                this.$set(this.checkedDate, 'year', date.year)
                this.$set(this.checkedDate, 'month', date.month)
                this.$set(this.checkedDate, 'day', date.day)

                if (date.month === this.lastMonth && date.year === this.lastMonthYear) {
                    this.getLastMonth();
                    let up = this.startUp + this.calendarHeight;
                    this.calendarDom.style.webkitTransition = 'transform 300ms';
                    this.calendarDom.style.webkitTransform = 'translate(0px,' + up + 'px)';
                }
                if (date.month === this.nextMonth && date.year === this.nextMonthYear) {
                    this.getNextMonth();
                    let up = this.startUp - this.calendarHeight;
                    this.calendarDom.style.webkitTransition = 'transform 300ms';
                    this.calendarDom.style.webkitTransform = 'translate(0px,' + up + 'px)';
                }
            },
            isToday(date) {//该日期是否为今天
                return this.yearOfToday === date.year && this.monthOfToday === date.month && this.dayOfToday === date.day;
            },
            isCheckedDay(date) {//该日期是否为选中的日期
                return this.checkedDate.year === date.year && this.checkedDate.month === date.month && this.checkedDate.day === date.day;
            },
            isNotCurrentMonthDay(date, index) {//非本月日期
                let dateOfCurrentShow = this.calendarOfMonth[index][15];//本月中间的日期一定为本月
                return date.year !== dateOfCurrentShow.year || date.month !== dateOfCurrentShow.month
            },
            touchStart(e) {//监听手指开始滑动事件
                this.startY = e.changedTouches[0].pageY;
                let transform = e.currentTarget.style.webkitTransform;
                if (transform) {
                    this.startUp = parseFloat(e.currentTarget.style.webkitTransform.split(' ')[1].split('px')[0]);
                }
            },
            touchMove(e) {//监听手指移动事件
                this.moveEndY = e.changedTouches[0].pageY;
                let Y = this.moveEndY - this.startY;

                e.currentTarget.style.webkitTransform = 'translate(0px,' + (Y + this.startUp) + 'px)';
            },
            touchEnd(e) {//监听touch结束事件
                let transform = e.currentTarget.style.webkitTransform;
                if (transform) {
                    this.endUp = parseFloat(e.currentTarget.style.webkitTransform.split(' ')[1].split('px')[0]);
                }
                let distance = Math.abs(this.endUp - this.startUp),
                    halfWinWith = this.calendarHeight / 2,
                    up = this.startUp;
                if (this.endUp <= this.startUp) {
                    // 向上滑动 未过临界值
                    if (distance <= halfWinWith) {
                        up = this.startUp;
                    } else {
                        up = this.startUp - this.calendarHeight;
                        this.getNextMonth();
                    }
                } else {
                    // 向下滑动 未过临界值
                    if (distance <= halfWinWith) {
                        up = this.startUp;
                    } else {
                        up = this.startUp + this.calendarHeight;
                        this.getLastMonth();
                    }
                }
                e.currentTarget.style.webkitTransition = 'transform 300ms';
                e.currentTarget.style.webkitTransform = 'translate(0px,' + up + 'px)';
            },
            getLastMonth() {//获取上个月日历
                this.calendarIndex--;
                if (this.calendarIndex < this.calendarMoveMinIndex) {
                    this.calendarMoveMinIndex = this.calendarIndex;
                }

                this.yearOfCurrentShow = this.lastMonthYear;
                this.monthOfCurrentShow = this.lastMonth;
                this.calculateCalendarOfThreeMonth(this.yearOfCurrentShow, this.monthOfCurrentShow, -1);
            },
            getNextMonth() {//获取下个月日历
                this.calendarIndex++;
                if (this.calendarIndex > this.calendarMoveMaxIndex) {
                    this.calendarMoveMaxIndex = this.calendarIndex;
                }

                this.yearOfCurrentShow = this.nextMonthYear;
                this.monthOfCurrentShow = this.nextMonth;
                this.calculateCalendarOfThreeMonth(this.yearOfCurrentShow, this.monthOfCurrentShow, 1);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../style/common.styl"

    .calendar_body {
        position relative
        width 100%
        margin-top px2vw(100px)
    }

    .calendar_week {
        position absolute
        width 100%
        left 0
        top 0
        flexAlign()
        background white
        color vice-font-color
        z-index 2
    }

    .calendar_group {
        margin-top px2vw(80px)
        overflow hidden
    }

    .calendar_group_li {
        width 100%
        flexAlign()
        flex-wrap wrap
        background white
    }

    .calendar_item {
        width px2vw(100px)
        margin-left px2vw(5px)
        flexContent()
        flex-direction column
    }

    .calendar_day {
        width px2vw(70px)
        height px2vw(70px)
        border-radius 50%
        fontSize(28px)
        flexContent()
        margin-bottom px2vw(5px)
    }

    .calendar_first_today {
        color main-color
    }

    .calendar_first_today span {
        fontSize(20px)
        margin-top px2vw(3px)
    }

    .calendar_day_today {
        background bg-color
    }

    .calendar_day_not {
        color vice-font-color
    }

    .calendar_day_checked {
        background main-color
        color white
    }
</style>