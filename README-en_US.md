[![Build Status](https://travis-ci.org/TangSY/vue-hash-calendar.svg?branch=master)](https://travis-ci.org/TangSY/vue-hash-calendar)
[![version](https://img.shields.io/npm/v/vue-hash-calendar.svg)](https://www.npmjs.com/package/vue-hash-calendar)
[![download](https://img.shields.io/npm/dt/vue-hash-calendar.svg)](https://www.npmjs.com/package/vue-hash-calendar)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![author](https://img.shields.io/badge/author-HashTang-orange.svg)](https://www.hxkj.vip)

[简体中文](https://github.com/TangSY/vue-hash-calendar/blob/master/README-zh_CN.md) | English

## Using Effects

![calendar.gif](https://www.hxkj.vip/demo/calendar/calendar.gif)
![dot.gif](https://www.hxkj.vip/demo/calendar/dot.gif)
![week.gif](https://www.hxkj.vip/demo/calendar/week.gif)

The same calendar for React：[https://github.com/TangSY/react-hash-calendar](https://github.com/TangSY/react-hash-calendar)

## vue-hash-calendar

- Calendar component based on Vue 2. X
- Support gesture sliding operation
- Slide up and down to switch weekly / monthly mode

  > [week mode] slide left and right to switch the previous week / next week

  > [month mode] slide left and right to switch the previous month / next month

## Install

[![vue-hash-calendar](https://nodei.co/npm/vue-hash-calendar.png)](https://npmjs.org/package/vue-hash-calendar)

## Usage

```
npm i -S vue-hash-calendar

// entry （main.js）
import vueHashCalendar from 'vue-hash-calendar'
// import CSS styles
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
// use component
Vue.use(vueHashCalendar)
```

```
// using in vue files
 <vue-hash-calendar></vue-hash-calendar>
```

### Import by CDN

```
// add this in index.html
js CDN：https://cdn.jsdelivr.net/npm/vue-hash-calendar@{version}/lib/vue-hash-calendar.umd.min.js
css CDN: https://cdn.jsdelivr.net/npm/vue-hash-calendar@{version}/lib/vue-hash-calendar.css

// add this to webpack config
externals: {
'vue-hash-calendar': 'VueHashCalendar'
},
```

## Demo

![demo_qrcode.png](https://www.hxkj.vip/demo/calendar/demo.webp)

online demo：[https://www.hxkj.vip/demo/calendar/](https://www.hxkj.vip/demo/calendar/)

- 🎉 can you give me a star? 🎉

### github link: [https://github.com/TangSY/vue-hash-calendar](https://github.com/TangSY/vue-hash-calendar)

## API

| name                        | describle                                                                                                                                                                                                                   | type              | default        | reuqire |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- | :------------- | :-----: |
| visible                     | To control the display or hide of calendar components, use the '. Sync' modifier                                                                                                                                            | Boolean           | false          |  false  |
| scrollChangeDate            | Controls whether the selected date is modified when sliding                                                                                                                                                                 | Boolean           | true           |  false  |
| model                       | What form is the calendar component displayed. Inline: the way to inline. Dialog: pop up mode                                                                                                                               | String            | inline         |  false  |
| defaultDatetime             | --                                                                                                                                                                                                                          | Date              | currentDate    |  false  |
| minDate                     | The minimum date range of the calendar. After setting, you can only slide the calendar within this range                                                                                                                    | Date              | --             |  false  |
| maxDate                     | The maximum date range of the calendar. After setting, you can only slide the calendar within this range                                                                                                                    | Date              | --             |  false  |
| format                      | The date format returned by the callback event when confirming the date. eg: "YY / mm / DD HH: mm" , "MM DD,YY at hh:mm F"                                                                                                  | String            | YY/MM/DD hh:mm |  false  |
| weekStart                   | Use the day of the week as the starting week of each week in the calendar. choose: 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'                                                             | String            | sunday         |  false  |
| pickerType                  | Selector Type. choose: 'datetime', 'date', 'time'                                                                                                                                                                           | String            | datetime       |  false  |
| showTodayButton             | --                                                                                                                                                                                                                          | Boolean           | true           |  false  |
| isShowWeekView              | --                                                                                                                                                                                                                          | Boolean           | false          |  false  |
| isShowArrow                 | --                                                                                                                                                                                                                          | Boolean           | false          |  false  |
| isShowAction                | --                                                                                                                                                                                                                          | Boolean           | true           |  false  |
| isShowNotCurrentMonthDay    | --                                                                                                                                                                                                                          | Boolean           | true           |  false  |
| disabledWeekView            | --                                                                                                                                                                                                                          | Boolean           | false          |  false  |
| disabledDate                | Set the disabled status of the date (returned true to disabled)                                                                                                                                                             | (date) => Boolean | ---            |  false  |
| disabledTime                | Set the disabled status of the time (returned true to disabled)                                                                                                                                                             | (date) => Boolean | ---            |  false  |
| disabledScroll              | Set the no sliding direction of the calendar. choose: 'left', 'right', 'up', 'down', 'horizontal', 'vertical', true, false]                                                                                                 | Boolean, String   | false          |  false  |
| markDate                    | he date to be marked can be grouped according to different colors and mark types (no grouped, the default is blue). eg：[{color: 'red',date: ['2019/02/25']},{color: 'blue',type: 'dot',date: ['2019/01/20']},'2019/03/20'] | Array             | []             |  false  |
| markType                    | Mark pattern type. choose: 'dot', 'circle', 'dot+circle'                                                                                                                                                                    | String            | dot            |  false  |
| minuteStep                  | --                                                                                                                                                                                                                          | Number            | 1              |  false  |
| lang                        | Language. choose: 'CN', 'EN'                                                                                                                                                                                                | String            | CN             |  false  |
| disabledClassName           | --                                                                                                                                                                                                                          | String            | ---            |  false  |
| notCurrentMonthDayClassName | --                                                                                                                                                                                                                          | String            | ---            |  false  |
| checkedDayClassName         | --                                                                                                                                                                                                                          | String            | ---            |  false  |
| todayClassName              | --                                                                                                                                                                                                                          | String            | ---            |  false  |
| firstDayOfMonthClassName    | --                                                                                                                                                                                                                          | String            | ---            |  false  |

## Events

| name        | describle                                                                 | params        |
| :---------- | :------------------------------------------------------------------------ | :------------ |
| change      | --                                                                        | { date }      |
| confirm     | --                                                                        | { date }      |
| click       | --                                                                        | { date }      |
| touchstart  | --                                                                        | { event }     |
| touchmove   | --                                                                        | { event }     |
| touchend    | --                                                                        | { event }     |
| slidechange | This event is triggered when the direction of the calendar slide changes. | { direction } |

## Slots

| name    | describle                                      | params                                                                                                       |
| :------ | :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| day     | Customize date content and style               | { date, extendAttr: { isMarked, isDisabledDate, isToday, isChecked, isCurrentMonthDay, isFirstDayOfMonth } } |
| week    | Customize week content and style               | { week }                                                                                                     |
| arrow   | Customize arrow content and style              | { isShow }                                                                                                   |
| today   | Customize today button content and style       | --                                                                                                           |
| confirm | Customize dconfirmate button content and style | --                                                                                                           |
| action  | Customize action content and style             | --                                                                                                           |

### Changelog

[changelog](https://github.com/TangSY/vue-hash-calendar/blob/travis_build/CHANGELOG.md)

### Other

- How to show calendar?

```
<vue-hash-calendar :visible.sync="isShowCalendar"></vue-hash-calendar>

this.isShowCalendar = true;
```

- How to show English formater？ `MM DD,YY at hh:mm F`

```
<vue-hash-calendar format="MM DD,YY at hh:mm F"></vue-hash-calendar>

```

- If you want to return a 12 hour date, how should the format attribute be written? Add `F` after the formatted string

```
<vue-hash-calendar format="YY/MM/DD hh:mm F"></vue-hash-calendar>

```

- day slot example

```
https://github.com/TangSY/vue-hash-calendar/blob/dev/examples/FirstDayDemo.vue

```

- How to disable date?

```
// For example, disable all dates after today

/** vue files template **/
<vue-hash-calendar :disabled-date="disabledDate"></vue-hash-calendar>

/** vue methods  **/
disabledDate(date) {
    let timestamp = date.getTime();
    if (timestamp > new Date().getTime()) {
        return true
    }

    return false
}
```

- How to disable time?

```
// For example, disable all time after now

/** vue files template **/
<vue-hash-calendar :disabled-time="disabledTime"></vue-hash-calendar>

/** vue methods  **/
disabledTime(date) { // 禁用的时间
  let hours = date.getHours()
  let minute = date.getMinutes()
  let hoursNow = new Date().getHours()
  let minuteNow = new Date().getMinutes()

  if (hours < hoursNow || (hours === hoursNow && minute < minuteNow)) {
    return true
  }
  return false
}
```

- If there are other problems or incompatible functions. Can communicate by email 't@tsy6.com', or GitHub submits the issue.

### Sponsor

![pay.jpg](https://www.hxkj.vip/demo/calendar/pay.jpg)
