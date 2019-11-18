[![Build Status](https://travis-ci.org/TangSY/vue-hash-calendar.svg?branch=master)](https://travis-ci.org/TangSY/vue-hash-calendar)
[![version](https://img.shields.io/npm/v/vue-hash-calendar.svg)](https://www.npmjs.com/package/vue-hash-calendar)
[![download](https://img.shields.io/npm/dt/vue-hash-calendar.svg)](https://www.npmjs.com/package/vue-hash-calendar)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![author](https://img.shields.io/badge/author-HashTang-orange.svg)](https://www.hxkj.vip)

# 按照惯例，先上效果图

![calendar.gif](https://www.hxkj.vip/demo/calendar/calendar.gif)

# vue-hash-calendar

* 基于 vue 2.X 开发的日历组件
* 支持手势滑动操作·1
* 原生 js 开发，没引入第三方库
* 上下滑动 切换 周/月 模式
>【周模式中】 左右滑动可切换 上一周/下一周
 【月模式中】 左右滑动可切换 上一月/下一月
 
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

* 🎉 觉得好用可以给一个 star 哦~~ 🎉

## github地址：[https://github.com/TangSY/vue-hash-calendar](https://github.com/TangSY/vue-hash-calendar) 

# API

| 属性          | 说明                                                                                                   |  默认  | 是否必传 |
| :------------ | :----------------------------------------------------------------------------------------------------- | :----: | :------: |
| visible      | 控制日历组件的显示或隐藏,需使用 `.sycn` 修饰符                    |   false   |    否    |
| scrollChangeDate      | 控制滑动的时候是否修改选中的日期                    |   true   |    否    |
| model      | 日历组件以哪种形式展示。inline：内联的方式。dialog：弹窗的方式                                                            |   inline   |    否    |
| defaultDatetime| 指定默认时间。数据类型为 Date                                                      |   当前时间   |    否    |
| format       | 确认日期时，回调事件返回的日期格式。如“YY/MM/DD hh:mm” 、“YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分”                                      |  YY/MM/DD hh:mm   |    否    |
| weekStart      | 以星期几作为日历每一周的起始星期。可选['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']            | sunday |    否    |
| pickerType  | 选择器类型 datetime：日期+时间   date：日期   time：时间                                                               | datetime |    否    |
| showTodayButton    | 是否显示返回今日按钮                                                          |   true    |    否    |
| isShowWeekView    | 是否以周视图展示组件                                                          |   false    |    否    |
| markDate | 需要被标记的日期，可按不同颜色分组标记（不分组默认蓝色）。如：[{color: 'red',date: ['2019/02/25']},{color: 'blue',date: ['2019/01/20']},'2019/03/20']                                                      |  []  |    否    |

# 事件

| 事件名称          | 说明                                                                                                   
| :------------ | :-----------------------------------------------------------------------------------------------------             
| change | 日期改变时，触发该事件。（返回的日期格式取决于 format 属性）                                                            
| confirm | 点击确认按钮时，触发该事件，dialog模式中才有该按钮。（返回的日期格式取决于 format 属性）                                                            
| click | 点击日期时，触发该事件。（返回的日期格式取决于 format 属性）                                                            

## Other

* 在 dialog 模式中，如何显示日历组件？注意使用 `.sync` 修饰符
```
<vue-hash-calendar :visible.sync="isShowCalendar"></vue-hash-calendar>

//设置为true
this.isShowCalendar = true;
```

* 如果有其他问题， 或者功能上不兼容的。可以邮件沟通 t@tsy6.com，或者 github 提交 issue。



## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```
