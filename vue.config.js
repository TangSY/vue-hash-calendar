/**
 * @Description:    自定义配置
 * @Author:         TSY
 * @CreateDate:     2018/6/9 13:28
 */

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  lintOnSave: false,
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }

}
