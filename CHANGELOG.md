## [1.2.2](https://github.com/TangSY/vue-hash-calendar/compare/v1.1.25...v1.2.2) (2020-03-24)


### Bug Fixes

* 修复当多个组件一起使用时，时间无法正常显示的bug ([d36929e](https://github.com/TangSY/vue-hash-calendar/commit/d36929e2a61c133f89ad73138bc2b529c877949d))


### Features

* 添加 lang 属性，用于控制中英文语言 ([787e931](https://github.com/TangSY/vue-hash-calendar/commit/787e931ff486a803e46e149d89893e0788ace671))


## [1.1.25](https://github.com/TangSY/vue-hash-calendar/compare/v1.0.5...v1.1.25) (2020-03-19)


### Bug Fixes

* 修复 MarkDate 无法更新的 bug ([c349575](https://github.com/TangSY/vue-hash-calendar/commit/c349575367c05c8ba874a204c02b6ec24924cff2))
* 修复 默认显示周视图无效的 bug ([df62933](https://github.com/TangSY/vue-hash-calendar/commit/df62933e51292594f484fbaf381665406085d85f))
* 修复个别机型，样式错误的问题 ([cb4f557](https://github.com/TangSY/vue-hash-calendar/commit/cb4f557532aaec6230ec830323ef9c8562e5791a))
* 修复日历宽度不足屏幕100%时，一行无法显示 7 个日期的问题 ([c001ea3](https://github.com/TangSY/vue-hash-calendar/commit/c001ea35e32efecc236445562edc6ca1b42754b5))
* 修复设置默认日期失败的问题 ([c225d09](https://github.com/TangSY/vue-hash-calendar/commit/c225d09e4867cef808bb876c0941324c44fb1f01))

## 1.1.21 (2020-01-15)


### Bug Fixes

* 修复在 IOS 中，touchEnd 失效的问题 ([bfb8302](https://github.com/TangSY/vue-hash-calendar/commit/bfb8302d4a47fc49425356ff82c2caa44f968506))
* 修复引入组件后，全局样式污染的问题 ([918f25b](https://github.com/TangSY/vue-hash-calendar/commit/918f25bb091a66bccd45bf8c8d73649864b03811))

## [1.1.14](https://github.com/TangSY/vue-hash-calendar/compare/v1.0.5...v1.1.14) (2019-11-30)


### Bug Fixes

--


### Features

* 新增 touch 滑动方向监听事件 ([b37a28b](https://github.com/TangSY/vue-hash-calendar/commit/b37a28bfcd047e5b17d21a016e6e411f87bd6165))


## 1.1.11 (2019-11-25)


### Bug Fixes

* 修复 “今天” 按钮与日历更新联动的问题 ([f2561d3](https://github.com/TangSY/vue-hash-calendar/commit/f2561d310be000e0600777f8c6862a2bc738522e))
* 修复IOS滑动失效的问题 ([65ecb60](https://github.com/TangSY/vue-hash-calendar/commit/65ecb60db85308abeef71c96c5461bd3936742ac))
* 修复切换周时，有时选中效果失效的问题 ([afff9fa](https://github.com/TangSY/vue-hash-calendar/commit/afff9fad9d6fad530fe55416b9d2b5e423ef7a85))
* 修复在周视图中，设置了 disabledDate 时 ，并且 scrollChangeDate 设为 false 的时候 滑动仍会改变选中的值 ([4f906f9](https://github.com/TangSY/vue-hash-calendar/commit/4f906f9872e87b5a2951d72c99969c169bebf419))
* 修复日历切换导致高度不对的问题 ([cddef66](https://github.com/TangSY/vue-hash-calendar/commit/cddef6635663184f9d8330485ca90333569896a6))
* 修复点击 今天 无效的BUG ([decfd30](https://github.com/TangSY/vue-hash-calendar/commit/decfd30b724970d1fef8736cf7990478ee118890))
* 禁用日期时，精确到日 ([f4b7111](https://github.com/TangSY/vue-hash-calendar/commit/f4b711120037c219a22747e38c705797c5aa5d2f))
* 默认日期改成当前时间 ([43b6dba](https://github.com/TangSY/vue-hash-calendar/commit/43b6dbafd68979f8f495fa8406090833287a3564))


### Features

* 新增标记按颜色分组的功能 ([43ec197](https://github.com/TangSY/vue-hash-calendar/commit/43ec197937cece8c1680796dc21a8778f0e6b960))
* 增加  在周模式中，左右滑动切换上一周/下一周的功能 ([eb00f4b](https://github.com/TangSY/vue-hash-calendar/commit/eb00f4b3fa8f9a1b73145e8a41bd91ff6e5f35df))
* 增加上下滑动，切换周/月模式 ([a5a65d3](https://github.com/TangSY/vue-hash-calendar/commit/a5a65d361a939c0468c734b19c7e93f2b2498b9a))
* travis自动发布npm包 ([ce7cdb6](https://github.com/TangSY/vue-hash-calendar/commit/ce7cdb61690943963239bff93538b0fc099c5204))
* 修改版本号 ([f96e26a](https://github.com/TangSY/vue-hash-calendar/commit/f96e26a9de90dc9ae9f8c92bc6489233ebdaf8c0))
* 更新npmignore ([59814ef](https://github.com/TangSY/vue-hash-calendar/commit/59814ef2426dff4acfa5c289fbaccbde0f28a72e))
* 更新项目目录结构 ([eff67b9](https://github.com/TangSY/vue-hash-calendar/commit/eff67b9f6efa35b63629636e42b479d330ea2b28))
* 添加切换周动画 ([09af0b2](https://github.com/TangSY/vue-hash-calendar/commit/09af0b28cebeb350c70629e9e8c34880d8ab365d))
* 调试IOS滑动 ([f60f430](https://github.com/TangSY/vue-hash-calendar/commit/f60f430c81b53aff0f5b51843712d10f22b71ad8))
