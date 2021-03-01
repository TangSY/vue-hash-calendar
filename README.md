[![Build Status](https://travis-ci.org/TangSY/vue-hash-calendar.svg?branch=master&from=hxkj)](https://travis-ci.org/TangSY/vue-hash-calendar)
[![version](https://img.shields.io/npm/v/vue-hash-calendar.svg?from=hxkj)](https://www.npmjs.com/package/vue-hash-calendar)
[![download](https://img.shields.io/npm/dt/vue-hash-calendar.svg?from=hxkj)](https://www.npmjs.com/package/vue-hash-calendar)
![license](https://img.shields.io/badge/license-MIT-blue.svg?from=hxkj)
[![author](https://img.shields.io/badge/author-HashTang-orange.svg?from=hxkj)](https://www.hxkj.vip)

简体中文 | [English](https://github.com/TangSY/vue-hash-calendar/blob/master/README-en_US.md)

# 按照惯例，先上效果图

![calendar.gif](https://www.hxkj.vip/demo/calendar/calendar.gif?from=hxkj)
![dot.gif](https://www.hxkj.vip/demo/calendar/dot.gif?from=hxkj)
![week.gif](https://www.hxkj.vip/demo/calendar/week.gif?from=hxkj)

# Demo

![demo_qrcode.png](https://www.hxkj.vip/demo/calendar/demo.webp)

或者请用浏览器的手机模式查看：[https://www.hxkj.vip/demo/calendar/](https://www.hxkj.vip/demo/calendar/)

- 🎉 觉得好用可以给一个 star 哦~~ 🎉

## github 地址：[https://github.com/TangSY/vue-hash-calendar](https://github.com/TangSY/vue-hash-calendar)
## 码云 gitee 地址：[https://gitee.com/HashTang/vue-hash-calendar](https://gitee.com/HashTang/vue-hash-calendar)

# vue-hash-calendar

- 基于 vue 2.X 开发的日历组件
- 支持手势滑动操作
- 原生 js 开发，没引入第三方库
- 上下滑动 切换 周/月 模式
  > 【周模式中】 左右滑动可切换 上一周/下一周
  > 【月模式中】 左右滑动可切换 上一月/下一月

# 安装使用说明

[![vue-hash-calendar](https://nodei.co/npm/vue-hash-calendar.png?from=hxkj)](https://npmjs.org/package/vue-hash-calendar)

```
npm i -S vue-hash-calendar

// 在入口文件中（main.js），导入组件库
import vueHashCalendar from 'vue-hash-calendar'
// 引入组件CSS样式
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
// 注册组件库
Vue.use(vueHashCalendar)
```

```
// 在VUE文件中引入组件
 <vue-hash-calendar></vue-hash-calendar>
```

### CDN 方式引入

```
//在 index.html 加入以下两个 CDN 链接：
js CDN：https://cdn.jsdelivr.net/npm/vue-hash-calendar@{version}/lib/vue-hash-calendar.umd.min.js
css CDN: https://cdn.jsdelivr.net/npm/vue-hash-calendar@{version}/lib/vue-hash-calendar.css

//然后在 webpack 配置中，加入以下配置。
externals: {
'vue-hash-calendar': 'VueHashCalendar'
},
```

# API

| 属性                        | 说明                                                                                                                                                                          |      类型       |      默认      | 是否必传 |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------: | :------------: | :------: |
| visible                     | 控制日历组件的显示或隐藏,需使用 `.sync` 修饰符                                                                                                                                |     Boolean     |     false      |    否    |
| scrollChangeDate            | 控制滑动的时候是否修改选中的日期                                                                                                                                              |     Boolean     |      true      |    否    |
| model                       | 日历组件以哪种形式展示。inline：内联的方式。dialog：弹窗的方式                                                                                                                |     String      |     inline     |    否    |
| defaultDatetime             | 指定默认时间。                                                                                                                                                                |      Date       |    当前时间    |    否    |
| minDate                     | 指定日历最小日期范围，设置之后只能在该范围内滑动日历。                                                                                                                        |      Date       |       --       |    否    |
| maxDate                     | 指定日历最大日期范围，设置之后只能在该范围内滑动日历。                                                                                                                        |      Date       |       --       |    否    |
| format                      | 确认日期时，回调事件返回的日期格式。如“YY/MM/DD hh:mm” 、“YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分”、“MM DD,YY at hh:mm F”                                                   |     String      | YY/MM/DD hh:mm |    否    |
| weekStart                   | 以星期几作为日历每一周的起始星期。可选['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']                                                          |     String      |     sunday     |    否    |
| pickerType                  | 选择器类型 datetime：日期+时间 date：日期 time：时间                                                                                                                          |     String      |    datetime    |    否    |
| showTodayButton             | 是否显示返回今日按钮                                                                                                                                                          |     Boolean     |      true      |    否    |
| isShowWeekView              | 是否以周视图展示组件                                                                                                                                                          |     Boolean     |     false      |    否    |
| isShowArrow                 | 是否显示周月切换时的指示箭头（日历下方的小箭头），当 model 等于 inline 时生效                                                                                                 |     Boolean     |     false      |    否    |
| isShowAction                | 是否显示日历组件操作栏（标题栏）                                                                                                                                              |     Boolean     |      true      |    否    |
| isShowNotCurrentMonthDay    | 是否展示日历中的非本月日期（灰色部分日期）                                                                                                                                    |     Boolean     |      true      |    否    |
| disabledWeekView            | 禁用周视图（设置为 true 后，无法上下滑动进行周/月切换）                                                                                                                       |     Boolean     |     false      |    否    |
| disabledDate                | 设置日期的禁用状态，参数为当前日期，要求返回 Boolean （禁用该日期需返回 true）                                                                                                |    Function     |      ---       |    否    |
| disabledTime                | 设置时间的禁用状态，参数为当前日期，要求返回 Boolean （禁用该时间需返回 true）                                                                                                |    Function     |      ---       |    否    |
| disabledScroll              | 设置日历的禁止滑动方向。可选['left', 'right', 'up', 'down', 'horizontal', 'vertical', true, false] 。可取其一控制单个方向，其中 `true` 和 `false` 控制所有方向。              | Boolean, String |     false      |    否    |
| markDate                    | 需要被标记的日期，可按不同颜色不同标记类型分组标记（不分组默认蓝色）。如：[{color: 'red',date: ['2019/02/25']},{color: 'blue',type: 'dot',date: ['2019/01/20']},'2019/03/20'] |      Array      |       []       |    否    |
| markType                    | 标记图案类型 dot：小圆点（日期下方小圆点标记） circle：小圆圈（日期被小圆圈包围） dot+circle：同时使用小圆点与圆圈标记                                                        |     String      |      dot       |    否    |
| minuteStep                  | 间隔时间。（分钟的步长）                                                                                                                                                      |     Number      |       1        |    否    |
| lang                        | 选择的语言版本。可选值:['CN', 'EN']                                                                                                                                           |     String      |       CN       |    否    |
| disabledClassName           | 日期被禁用时的 className。用于修改日期被禁用时的默认样式                                                                                                                      |     String      |      ---       |    否    |
| notCurrentMonthDayClassName | 非当前展示月份日期的 className(例如日历前面几天与后面几天灰色部分)。用于修改非当前展示月份日期的默认样式                                                                      |     String      |      ---       |    否    |
| checkedDayClassName         | 日期被选中时的 className。用于修改日期被选中时的默认样式                                                                                                                      |     String      |      ---       |    否    |
| todayClassName              | 当天日期的 className。用于修改当天日期的默认样式                                                                                                                              |     String      |      ---       |    否    |
| firstDayOfMonthClassName    | 每月第一天的 className。用于修改每月第一天的默认样式                                                                                                                          |     String      |      ---       |    否    |

# 事件

| 事件名称    | 说明                                                                                      | 参数                               |
| :---------- | :---------------------------------------------------------------------------------------- | :--------------------------------- |
| change      | 日期改变时，触发该事件。（返回的日期格式取决于 format 属性）                              | (date: 日期改变时，选中的日期)     |
| confirm     | 点击确认按钮时，触发该事件，dialog 模式中才有该按钮。（返回的日期格式取决于 format 属性） | (date: 点击确认按钮时，选中的日期) |
| click       | 点击日期时，触发该事件。（返回的日期格式取决于 format 属性）                              | (date: 当前点击的日期)             |
| touchstart  | 日历滑动 start 事件，同于原生该事件。                                                     | （event: touch 事件）              |
| touchmove   | 日历滑动 move 事件，同于原生该事件。                                                      | （event: touch 事件）              |
| touchend    | 日历滑动 end 事件，同于原生该事件。                                                       | （event: touch 事件）              |
| slidechange | 日历滑动的方向。返回值：right、left、up、down 。                                          | （direction: 滑动的方向）          |

# 插槽 Slot

| name    | 说明                                                                                                                                                                                                                                                                                                                                                                                      |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| day     | 自定义日期内容。例如可用于添加农历之类的。配合自定义 className 使用，效果更佳！参数为 { date, extendAttr }，其中 extendAttr 参数包含 `isMarked`（该日期是否被标记）、`isDisabledDate`（该日期是否被禁用）、`isToday`（该日期是否为今天）、`isChecked`（该日期是否被选中）、`isCurrentMonthDay`（该日期是否为本月日期）、`isFirstDayOfMonth`（该日期是否为当月第一天），可用于一些特殊需求 |
| week    | 自定义星期内容。例如可用于自定义星期样式等等。参数为 { week }                                                                                                                                                                                                                                                                                                                             |
| arrow   | 自定义周月切换时的指示箭头。参数为 { show }，`show`: 类型为 Boolen，表示当前是否为周视图                                                                                                                                                                                                                                                                                                  |
| today   | 自定义 "今天" 按钮文字内容以及样式                                                                                                                                                                                                                                                                                                                                                        |
| confirm | 自定义 "确定" 按钮文字内容以及样式                                                                                                                                                                                                                                                                                                                                                        |
| action  | 自定义操作栏（标题栏）内容以及样式                                                                                                                                                                                                                                                                                                                                                        |

## 其他版本

react 版本：[https://github.com/TangSY/react-hash-calendar](https://github.com/TangSY/react-hash-calendar)

## Other

- 在 dialog 模式中，如何显示日历组件？注意使用 `.sync` 修饰符

```
<vue-hash-calendar :visible.sync="isShowCalendar"></vue-hash-calendar>

//设置为true
this.isShowCalendar = true;
```

- 想要返回标准的英文格式日期，format 属性应该怎样写？ `MM DD,YY at hh:mm F`

```
<vue-hash-calendar format="MM DD,YY at hh:mm F"></vue-hash-calendar>

```

- 想要返回 12 小时制的日期，format 属性应该怎样写？ 在格式化字符串后面加上大写 `F`

```
<vue-hash-calendar format="YY/MM/DD hh:mm F"></vue-hash-calendar>

```

- day slot 的基本用法

```
https://github.com/TangSY/vue-hash-calendar/blob/dev/examples/FirstDayDemo.vue

```

- 能否通过外部的某个按钮来触发日历的展开和收起

```
可以在外部通过修改 isShowWeekView 的值来控制日历的收起与展开

```

- 如何设置禁用日期？ 可参考源码中 `App.vue` 文件

```
// 例如禁用今日之前的所有日期

/** vue模板文件 **/
<vue-hash-calendar :disabled-date="disabledDate"></vue-hash-calendar>

/** vue methods 中的方法 **/
disabledDate(date) {
    let timestamp = date.getTime();
    if (timestamp > new Date().getTime()) {
        return true
    }

    return false
}
```

- 如何设置禁用日期？ 可参考源码中 `App.vue` 文件

```
// 例如禁用现在之前的时间

/** vue模板文件 **/
<vue-hash-calendar :disabled-time="disabledTime"></vue-hash-calendar>

/** vue methods 中的方法 **/
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

- 如果有其他问题， 或者功能上不兼容的。可以邮件沟通 t@tsy6.com，或者 github 提交 issue。

## 赞助

![pay.jpg](https://www.hxkj.vip/demo/calendar/pay.jpg)
