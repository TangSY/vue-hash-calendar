// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  "globals": {
    "Vue": true,
    "VueRouter": true,
    "Vuex": true,
    "axios": true,
    "ELEMENT": true,
    "THEME": true,
    "RootApp": true,
    "BMAP_NORMAL_MAP": true,
    "BMAP_HYBRID_MAP": true,
    "BMap": true,
    "BaiduMap": true

  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'promise'
  ],
  // add your custom rules here
  rules: {
    //禁止注册模板中未使用的组件
    "vue/no-unused-components": ["warn", {
      "ignoreWhenBindingPresent": true
    }],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-extra-parens": 0, //不允许出现不必要的圆括号
    "no-new": 0, //不允许new一个实例后不赋值或者不比较
    "no-new-func": 0, //不允许使用new Function
    "eqeqeq": ["off", "always"], //不可采用== 
    "camelcase": "off", //关闭不可采用驼峰
    "no-useless-escape": "warn", //正则表达式转义问题
    "one-var": [0, "always"],
    "prefer-const": 0, // 如果一个变量只有在声明时才被赋值一次，那么应该使用'const'
    "quote-props": 0,
    "bject-curly-spacing": 0,
    "no-prototype-builtins": 0,
    "object-curly-spacing": 0,
    "dot-notation": 0,
    "keyword-spacing": 0,
    "quotes": ["error", "single"],

    "no-empty-character-class": 2, //正则表达式中不允许出现空的字符组
    "no-extra-boolean-cast": 2, //不允许出现不必要的布尔值转换
    "no-ex-assign": 2, //在try catch语句中不允许重新分配异常变量
    "no-extra-semi": 2, //不允许出现不必要的分号
    "no-func-assign": 2, //不允许重新分配函数声明
    "no-dupe-args": 2, // 函数参数不能重复
    "no-dupe-args": 2, // 函数参数不能重复no-duplicate-case": 2, // switch中的case标签不能重复
    "space-before-function-paren": [2, { "anonymous": "never", "named": "never" }],
    "no-unreachable": 2, // 不能有无法执行的代码
    "no-empty": 2, //不允许出现空的代码块
    "no-var": 1, //禁用var，用let和const代替
    "no-new-object": 0,
    "no-unused-vars": 0,
    "vue/no-unused-vars": 0,
    "no-trailing-spaces": 0,
    "eol-last": 0,
    "no-undef": 0,
    // 代码风格
    "no-else-return": 2, // 如果if语句里面有return,后面不能跟else语句
    "no-multi-spaces": 2, // 不能用多余的空格
    "no-redeclare": [2, { // 禁止重复声明变量
      "builtinGlobals": true
    }],
    "no-multiple-empty-lines": [1, {
      "max": 2
    }], //空行最多不能超过2行
    "no-multi-str": 2, //字符串不能用\换行
    'no-useless-escape': 0, //禁用不必要的转义字符;


    /*
    https://www.npmjs.com/package/eslint-plugin-promise
    */
    "promise/always-return": 0,
    "promise/no-return-wrap": 0,
    //使用promise 时，强制使用标准参数命名： new Promise(function (resolve, reject) { ... })
    "promise/param-names": "error",
    //promise，强制then、catch 一起出现
    // "promise/catch-or-return": 1,
    "promise/no-native": 0,
    "promise/no-nesting": "warn",
    "promise/no-promise-in-callback": "warn",
    "promise/no-callback-in-promise": "warn",
    "promise/avoid-new": 0,
    "promise/no-new-statics": 0,
    "promise/no-return-in-finally": 0,
    "promise/valid-params": 0



  }
}
