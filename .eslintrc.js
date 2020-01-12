// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
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
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-extra-parens": 0, //不允许出现不必要的圆括号
    "no-new": 0, //不允许new一个实例后不赋值或者不比较
    "no-new-func": 0, //不允许使用new Function


    "no-empty-character-class": 2, //正则表达式中不允许出现空的字符组
    "no-extra-boolean-cast": 2, //不允许出现不必要的布尔值转换
    "no-ex-assign": 2, //在try catch语句中不允许重新分配异常变量
    "no-extra-semi": 2, //不允许出现不必要的分号
    "no-func-assign": 2, //不允许重新分配函数声明
    "space-before-function-paren": [2, {"anonymous": "never", "named": "never"}], // 函数名右边不加空格
    "no-dupe-args": 2, // 函数参数不能重复
    "no-dupe-args": 2, // 函数参数不能重复no-duplicate-case": 2, // switch中的case标签不能重复
    "no-unreachable": 2, // 不能有无法执行的代码
    "no-empty": 2, //不允许出现空的代码块
    "no-undef": 2,//不能有未定义的变量
    "no-var": 1,//禁用var，用let和const代替

    // 代码风格
    "no-else-return": 2, // 如果if语句里面有return,后面不能跟else语句
    "no-multi-spaces": 2, // 不能用多余的空格
    "no-redeclare": [2, {   // 禁止重复声明变量
      "builtinGlobals": true
    }],
    "no-multiple-empty-lines": [1, { "max": 2 }],//空行最多不能超过2行
    "no-multi-str": 2,//字符串不能用\换行




    /*
    https://www.npmjs.com/package/eslint-plugin-promise
    */
    "promise/always-return": 0,
    "promise/no-return-wrap": 0,
    //使用promise 时，强制使用标准参数命名： new Promise(function (resolve, reject) { ... })
    "promise/param-names": "error",
    //promise，强制then、catch 一起出现
    "promise/catch-or-return": 'error',
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
