module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {

    /*
          upd：更新某功能（不是 feat, 不是 fix）
          feat：新功能（feature）
          fix：修补bug
          docs：文档（documentation）
          style： 格式（不影响代码运行的变动）
          refactor：重构（即不是新增功能，也不是修改bug的代码变动）
          test：增加测试
          chore：构建过程或辅助工具的变动

          栗子：
          git commit -m 'feat: 增加 xxx 功能'
        */
    'type-enum': [2, 'always', [
      'upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert'
    ]],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
}
