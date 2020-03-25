[![Build Status](https://travis-ci.org/TangSY/vue-hash-calendar.svg?branch=master)](https://travis-ci.org/TangSY/vue-hash-calendar)
[![version](https://img.shields.io/npm/v/vue-hash-calendar.svg)](https://www.npmjs.com/package/vue-hash-calendar)
[![download](https://img.shields.io/npm/dt/vue-hash-calendar.svg)](https://www.npmjs.com/package/vue-hash-calendar)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![author](https://img.shields.io/badge/author-HashTang-orange.svg)](https://www.hxkj.vip)

# 按照惯例，先上效果图

![calendar.gif](https://www.hxkj.vip/demo/calendar/calendar.gif)
![dot.gif](https://www.hxkj.vip/demo/calendar/dot.gif)
![week.gif](https://www.hxkj.vip/demo/calendar/week.gif)

# vue-hash-calendar

- 基于 vue 2.X 开发的日历组件
- 支持手势滑动操作
- 原生 js 开发，没引入第三方库
- 上下滑动 切换 周/月 模式
  > 【周模式中】 左右滑动可切换 上一周/下一周
  > 【月模式中】 左右滑动可切换 上一月/下一月

# 安装使用说明

```
npm i vue-hash-calendar
```

```
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

# Demo

![demo_qrcode.png](https://www.hxkj.vip/demo/calendar/demo.webp)

或者请用浏览器的手机模式查看：[https://www.hxkj.vip/demo/calendar/](https://www.hxkj.vip/demo/calendar/)

- 🎉 觉得好用可以给一个 star 哦~~ 🎉

## github 地址：[https://github.com/TangSY/vue-hash-calendar](https://github.com/TangSY/vue-hash-calendar)

# API

| 属性             | 说明                                                                                                                                                  |   类型   |      默认      | 是否必传 |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | :------------: | :------: |
| visible          | 控制日历组件的显示或隐藏,需使用 `.sync` 修饰符                                                                                                        | Boolean  |     false      |    否    |
| scrollChangeDate | 控制滑动的时候是否修改选中的日期                                                                                                                      | Boolean  |      true      |    否    |
| model            | 日历组件以哪种形式展示。inline：内联的方式。dialog：弹窗的方式                                                                                        |  String  |     inline     |    否    |
| defaultDatetime  | 指定默认时间。                                                                                                                                        |   Date   |    当前时间    |    否    |
| format           | 确认日期时，回调事件返回的日期格式。如“YY/MM/DD hh:mm” 、“YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分”、“MM DD,YY at hh:mm F”                           |  String  | YY/MM/DD hh:mm |    否    |
| weekStart        | 以星期几作为日历每一周的起始星期。可选['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']                                  |  String  |     sunday     |    否    |
| pickerType       | 选择器类型 datetime：日期+时间 date：日期 time：时间                                                                                                  |  String  |    datetime    |    否    |
| showTodayButton  | 是否显示返回今日按钮                                                                                                                                  | Boolean  |      true      |    否    |
| isShowWeekView   | 是否以周视图展示组件                                                                                                                                  | Boolean  |     false      |    否    |
| disabledWeekView | 禁用周视图（设置为 true 后，无法上下滑动进行周/月切换）                                                                                               | Boolean  |     false      |    否    |
| disabledDate     | 设置日期的禁用状态，参数为当前日期，要求返回 Boolean （禁用该日期需返回 true）                                                                        | Function |      ---       |    否    |
| markDate         | 需要被标记的日期，可按不同颜色分组标记（不分组默认蓝色）。如：[{color: 'red',date: ['2019/02/25']},{color: 'blue',date: ['2019/01/20']},'2019/03/20'] |  Array   |       []       |    否    |
| markType         | 标记图案类型 dot：小圆点（日期下方小圆点标记） circle：小圆圈（日期被小圆圈包围） dot+circle：同时使用小圆点与圆圈标记                                |  String  |      dot       |    否    |
| minuteStep       | 间隔时间。（分钟的步长）                                                                                                                              |  Number  |       1        |    否    |
| lang             | 选择的语言版本。可选值:['CN', 'EN']                                                                                                                   |  String  |       CN       |    否    |

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

## 版本记录

[changelog](https://github.com/TangSY/vue-hash-calendar/blob/travis_build/CHANGELOG.md)

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

- 如何设置禁用日期？ 可参考源码中 `App.vue` 文件

```
// 例如禁用今日之后的所有日期

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

- 如果有其他问题， 或者功能上不兼容的。可以邮件沟通 t@tsy6.com，或者 github 提交 issue。

## 赞助

![pay.jpg](https://www.hxkj.vip/demo/calendar/pay.jpg)
