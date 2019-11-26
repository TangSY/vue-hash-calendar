/**
* @Description:    时间选择组件
* @Author:         TSY 
* @Email:          t@tsy6.com
* @CreateDate:     2019/5/26 22:53
*/
<template>
    <div class="time_body" v-show="show">
        <div class="time_group">
            <div class="time_content" :id="'time' + index" v-for="(item, index) in timeArray" :key="index"
                 @touchstart="timeTouchStart"
                 @touchmove="timeTouchMove($event, index)"
                 @touchend="timeTouchEnd($event, index)">
                <div class="time_item" :class="{'time_item_show': isShowTime(time, index)}"
                     v-for="(time, j) in item" :key="index + j">{{ time | fillNumber }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { checkPlatform } from '../utils/util'
    export default {
        name: "TimePicker",
        props: {
            defaultTime: null,
            show: false
        },
        data() {
            return {
                checkedDate: {
                    hours: new Date().getHours(),
                    minutes: new Date().getMinutes()
                },//被选中的日期
                timeHeight: 0,// 单个时间项的高度
                timeArray: [],//时间选择器数据
                timeStartY: 0,//touchstart,Y轴坐标
                timeStartUp: 0,//滑动开始前，时间控件dom与顶部的偏移量
            }
        },
        mounted() {

        },
        computed: {},
        watch: {
            defaultTime: {
                handler(val) {
                    if (!(val instanceof Date)) {
                        throw new Error(`The calendar component's defaultTime must be date type!`);
                        return
                    }
                    this.$set(this.checkedDate, 'hours', val.getHours())
                    this.$set(this.checkedDate, 'minutes', val.getMinutes())
                },
                immediate: true
            },
            checkedDate: {
                handler(val) {
                    this.$emit('change', val);
                },
                deep: true,
                immediate: true
            },
            show: {
                handler(val) {
                    if (val) {
                        this.initTimeArray();
                    }
                },
                immediate: true
            }
        },
        filters: {
            fillNumber(val) {//小于10，在前面补0
                return val > 9 ? val : '0' + val
            }
        },
        methods: {
            initTimeArray() {//初始化时间选择器数据
                let hours = [];
                this.timeArray = [];
                for (let i = 0; i < 24; i++) {
                    hours.push(i);
                }
                let minutes = [];
                for (let i = 0; i < 60; i++) {
                    minutes.push(i);
                }
                this.timeArray.push(hours, minutes);

                this.$nextTick(() => {
                    let checkHours = this.checkedDate.hours;
                    let checkMinutes = this.checkedDate.minutes;

                    this.timeHeight = getComputedStyle(document.querySelector('.time_item')).height || '';
                    this.timeHeight = parseFloat(this.timeHeight.split('px')[0]);

                    let hoursUp = (2 - parseFloat(checkHours)) * this.timeHeight;
                    let minutesUp = (2 - parseFloat(checkMinutes)) * this.timeHeight;
                    document.querySelector('#time0').style.webkitTransform = 'translate3d(0px,' + hoursUp + 'px,0px)';
                    document.querySelector('#time1').style.webkitTransform = 'translate3d(0px,' + minutesUp + 'px,0px)';
                })
            },
            timeTouchStart(e) {
                e.preventDefault();
                this.timeStartY = e.changedTouches[0].pageY;
                let transform = e.currentTarget.style.webkitTransform;
                if (transform) {
                    this.timeStartUp = parseFloat(transform.split(' ')[1].split('px')[0]);
                }
            },
            timeTouchMove(e, index) {
                let moveEndY = e.changedTouches[0].pageY;
                let Y = moveEndY - this.timeStartY;
                e.currentTarget.style.webkitTransform = 'translate3d(0px,' + (Y + this.timeStartUp) + 'px,0px)';

                if (checkPlatform() === "2") {
                    this.timeTouchEnd(e, index);
                    return false;
                }
            },
            timeTouchEnd(e, index) {
                let transform = e.currentTarget.style.webkitTransform;
                let endUp = this.timeStartUp;
                if (transform) {
                    endUp = parseFloat(e.currentTarget.style.webkitTransform.split(' ')[1].split('px')[0]);
                }

                let distance = Math.abs(endUp - this.timeStartUp),
                    upCount = Math.floor(distance / this.timeHeight) || 1,
                    halfWinWith = this.timeHeight / 2,
                    up = this.timeStartUp;

                if (endUp <= this.timeStartUp) {
                    // 向上滑动 未过临界值
                    if (distance <= halfWinWith) {
                        up = this.timeStartUp;
                    } else {
                        up = this.timeStartUp - this.timeHeight * upCount;
                        if (up < -(this.timeArray[index].length - 3) * this.timeHeight) {
                            up = -(this.timeArray[index].length - 3) * this.timeHeight;
                        }
                    }
                } else {
                    // 向下滑动 未过临界值
                    if (distance <= halfWinWith) {
                        up = this.timeStartUp;
                    } else {
                        up = this.timeStartUp + this.timeHeight * upCount;
                        if (up > this.timeHeight * 2) {
                            up = this.timeHeight * 2;
                        }
                    }
                }
                if (index === 0) {
                    let hour = 2 - Math.round(parseFloat(up) / parseFloat(this.timeHeight));
                    this.$set(this.checkedDate, 'hours', hour)
                } else {
                    let minute = 2 - Math.round(parseFloat(up) / parseFloat(this.timeHeight));
                    this.$set(this.checkedDate, 'minutes', minute)
                }
                e.currentTarget.style.webkitTransition = 'transform 300ms';
                e.currentTarget.style.webkitTransform = 'translate3d(0px,' + up + 'px,0px)';
            },
            isShowTime(time, index) {//是否为当前选中的时间
                return (index === 0 && time === this.checkedDate.hours) || (index === 1 && time === this.checkedDate.minutes)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../style/common.styl"

    .time_body {
        width 100%
        margin-top px2vw(100px)
    }

    .time_group {
        width 100%
        display flex
        align-items flex-start
        justify-content center
        height px2vw(360px)
        margin-top px2vw(100px)
        -webkit-overflow-scrolling touch
        overflow hidden
    }

    .time_content {
        touch-action none
        padding 0 px2vw(40px)
        -webkit-overflow-scrolling touch
    }

    .time_item {
        padding px2vw(20px) 0
        color vice-font-color
    }

    .time_item_show {
        color main-font-color
    }
</style>