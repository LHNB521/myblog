module.exports = {
  printWidth: 80, // 换行字符串阈值
  tabWidth: 2,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  trailingComma: 'none', // 最后一个对象元素符加逗号
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    }
  ],
  arrowParens: 'always'
};
